import axios, { AxiosResponse, HttpStatusCode } from 'axios';
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

  private static areArraysEqual(arr1: any[], arr2: any[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
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
    });
  }

  setProducts(products: CollectionModel<number, ProductModel>) {
    this._products = products;
  }

  clearProducts() {
    this._products = getInitialCollectionModel();
  }

  static buildProductsURL(title?: string, categories: Option[] = [], offset: number = 0, id?: number): string {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (categories.length) params.append('categoryId', categories.map((c) => c.key).join(','));

    params.append('offset', `${offset}`);
    params.append('limit', `${CONFIG.PRODUCTS_PER_PAGE}`);

    return id ? `products/${id}` : `products?${params.toString()}`;
  }

  processMultipleCategoriesResult(rawProducts: RawProductAPI[]) {
    try {
      const products: ProductModel[] = rawProducts.map(normalizeRawProduct);
      this.setProducts(normalizeCollection(products, (product) => product.id));
      this.setHasNextPage(products.length === CONFIG.PRODUCTS_PER_PAGE);
      this._requestState.set(Meta.success);
    } catch (e) {
      devLog(e);
      this._requestState.set(Meta.error);
      this.setProducts(getInitialCollectionModel());
    }
  }

  processFetchProductsResult(result: AxiosResponse<RawProductAPI[]>, isNewSearch: boolean) {
    try {
      const products: ProductModel[] = result.data.map(normalizeRawProduct);
      const newProducts = normalizeCollection(products, (product) => product.id);

      if (isNewSearch) {
        this._products = newProducts;
      } else {
        this._products = {
          ...this._products,
          entities: { ...this._products.entities, ...newProducts.entities },
          order: [...this._products.order, ...newProducts.order],
        };
      }

      this.setHasNextPage(products.length === CONFIG.PRODUCTS_PER_PAGE);
      this._requestState.set(Meta.success);
    } catch (e) {
      devLog(e);
      this._requestState.set(Meta.error);
      this.setProducts(getInitialCollectionModel());
    }
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
          this.processFetchProductsResult(response, isNewSearch);
        });
        this._previousTitle = title;
        this._previousCategories = categories.slice();
      } catch (error) {
        runInAction(() => {
          devLog(error);
          this._requestState.set(Meta.error);
          this.setProducts(getInitialCollectionModel());
        });
      }
      return;
    }

    const requests = categories.map((category) => {
      const url = getApiUrl(ProductsStore.buildProductsURL(title, [category], offset));
      return axios.get<RawProductAPI[]>(url);
    });

    try {
      const responses = await Promise.all(requests);
      runInAction(() => {
        const allProducts = responses.flatMap((response) => response.data);
        this.processMultipleCategoriesResult(allProducts);
      });
    } catch (error) {
      runInAction(() => {
        devLog(error);
        this._requestState.set(Meta.error);
        this.setProducts(getInitialCollectionModel());
      });
    }
  };

  setHasNextPage(hasNextPage: boolean) {
    this._hasNextPage = hasNextPage;
  }

  fetchProduct = async (id: number) => {
    if (this._requestState.isLoading) {
      return;
    }
    this._requestState.set(Meta.loading);
    this._currentProduct = null;
    const url = getApiUrl(ProductsStore.buildProductsURL(undefined, [], undefined, id));
    const result = await axios<RawProductAPI>({
      method: 'get',
      url,
    });
    runInAction(() => {
      this.processFetchProductResult(result);
    });
  };

  processFetchProductResult(result: AxiosResponse<RawProductAPI>) {
    if (result.status === HttpStatusCode.Ok) {
      try {
        this._requestState.set(Meta.success);
        const normalizedProduct = normalizeRawProduct(result.data);
        this._currentProduct = normalizedProduct;

        if (!this._products.order.includes(normalizedProduct.id)) {
          this._products.order.push(normalizedProduct.id);
        }
        this._products.entities[normalizedProduct.id] = normalizedProduct;
      } catch (e) {
        devLog(e);
        this._requestState.set(Meta.error);
        this._currentProduct = null;
      }
    } else {
      this._requestState.set(Meta.error);
    }
  }
}
