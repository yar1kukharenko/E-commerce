import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getApiUrl } from '@config/api';
import { CONFIG } from '@config/config';
import { normalizeRawProduct, ProductModel, RawProductAPI } from '@store/models/Products';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collectionModel';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';
import { RequestState } from '@store/RootStore/RequestState';
import { Meta } from '@store/RootStore/RequestState/RequestState';
import { devLog } from '@utils/devLog';

type PrivateFields = '_products' | '_currentProduct' | '_hasNextPage';

export class ProductsStore {
  private _products: CollectionModel<number, ProductModel> = getInitialCollectionModel();

  private _currentProduct: ProductModel | null = null;

  private _requestState = new RequestState();

  private _hasNextPage: boolean = true;

  private _previousTitle: string | undefined;

  private _previousCategories: Option[] = [];

  private static areArraysEqual(arr1: Option[], arr2: Option[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  private static getProductsPerPage(): number {
    return CONFIG.PRODUCTS_PER_PAGE;
  }

  private handleError(error: unknown): void {
    devLog(error);
    this._requestState.set(Meta.error);
    this.setProducts(getInitialCollectionModel());
  }

  private handleProductsResult(rawProducts: RawProductAPI[], isNewSearch: boolean) {
    try {
      const products: ProductModel[] = rawProducts.map(normalizeRawProduct);
      const newProducts = normalizeCollection(products, (product) => product.id);

      if (isNewSearch) {
        this.setProducts(newProducts);
      } else {
        this.setProducts({
          ...this._products,
          entities: { ...this._products.entities, ...newProducts.entities },
          order: [...this._products.order, ...newProducts.order],
        });
      }

      this.setHasNextPage(products.length === ProductsStore.getProductsPerPage());
      this._requestState.set(Meta.success);
    } catch (e) {
      this.handleError(e);
    }
  }

  private static buildProductsURL(title?: string, categories: Option[] = [], offset: number = 0, id?: number): string {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (categories.length) params.append('categoryId', categories.map((c) => c.key).join(','));
    params.append('offset', `${offset}`);
    params.append('limit', `${CONFIG.PRODUCTS_PER_PAGE}`);
    return id ? `products/${id}` : `products?${params.toString()}`;
  }

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _products: observable.ref,
      _currentProduct: observable.ref,
      _hasNextPage: observable,
      products: computed,
      currentProduct: computed,
      hasNextPage: computed,
      fetchProducts: action,
      fetchProduct: action,

      processFetchProductResult: action,
      clearProducts: action,
      setPreviousTitle: action,
      setPreviousCategories: action,
      setProducts: action.bound,

      isEmpty: computed,
      isEndOfProducts: computed,
      isNothingFound: computed,
      isError: computed,
    });
  }

  get products(): ProductModel[] {
    return linearizeCollection(this._products);
  }

  setPreviousTitle(previousTitle: string | undefined) {
    this._previousTitle = previousTitle;
  }

  setPreviousCategories(previousCategories: Option[]) {
    this._previousCategories = previousCategories;
  }

  get currentProduct(): ProductModel | null {
    return this._currentProduct;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }

  get getRequestState(): RequestState {
    return this._requestState;
  }

  get isEmpty(): boolean {
    return !this._products.order.length && this._requestState.isInitial;
  }

  get isEndOfProducts(): boolean {
    return !this._hasNextPage && !this.isEmpty && this._requestState.isSuccess;
  }

  get isNothingFound(): boolean {
    return !this._products.order.length && this._requestState.isSuccess;
  }

  get isError(): boolean {
    return this._requestState.isError;
  }

  setProducts(products: CollectionModel<number, ProductModel>) {
    this._products = products;
  }

  clearProducts() {
    this._products = getInitialCollectionModel();
  }

  setHasNextPage(hasNextPage: boolean) {
    this._hasNextPage = hasNextPage;
  }

  fetchProducts = async (title?: string, categories: Option[] = []) => {
    if (this._requestState.isLoading) {
      return;
    }
    const isNewSearch =
      title !== this._previousTitle || !ProductsStore.areArraysEqual(categories, this._previousCategories);
    this._requestState.set(Meta.loading);
    const offset = this.products.length || 0;

    if (categories.length === 0) {
      const url = getApiUrl(ProductsStore.buildProductsURL(title, categories, offset));
      try {
        const response = await axios.get<RawProductAPI[]>(url);
        runInAction(() => {
          this.handleProductsResult(response.data, isNewSearch);
        });
      } catch (error) {
        runInAction(() => {
          this.handleError(error);
        });
      }
      this._previousTitle = title;
      this._previousCategories = categories.slice();
      return;
    }
    this._previousTitle = title;
    this._previousCategories = categories.slice();

    const requests = categories.map((category) => {
      const url = getApiUrl(ProductsStore.buildProductsURL(title, [category], offset));
      return axios.get<RawProductAPI[]>(url);
    });

    try {
      const responses = await Promise.all(requests);
      runInAction(() => {
        const allProducts = responses.flatMap((response) => response.data);
        this.handleProductsResult(allProducts, isNewSearch);
      });
    } catch (error) {
      runInAction(() => {
        this.handleError(error);
      });
    }
  };

  fetchProduct = async (id: number) => {
    if (this._requestState.isLoading) {
      return;
    }
    this._requestState.set(Meta.loading);
    this._currentProduct = null;
    const url = getApiUrl(ProductsStore.buildProductsURL(undefined, [], undefined, id));
    const result = await axios.get<RawProductAPI>(url);
    runInAction(() => {
      this.processFetchProductResult(result);
    });
  };

  processFetchProductResult(result: AxiosResponse<RawProductAPI>) {
    try {
      this._requestState.set(Meta.success);
      const normalizedProduct = normalizeRawProduct(result.data);
      this._currentProduct = normalizedProduct;

      if (!this._products.order.includes(normalizedProduct.id)) {
        this._products.order.push(normalizedProduct.id);
      }
      this._products.entities[normalizedProduct.id] = normalizedProduct;
    } catch (e) {
      this.handleError(e);
    }
  }
}
