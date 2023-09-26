import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';

import { Option } from '@components/MultiDropDown/MultiDropDown';
import { getApiUrl } from '@config/api';
import { CONFIG } from '@config/config';
import { ProductModel } from '@store/models/Products/ProductModel';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collectionModel';
import rootStore from '@store/RootStore';
import { RequestState } from '@store/RootStore/RequestState';
import { Meta } from '@store/RootStore/RequestState/RequestState';
import { devLog } from '@utils/devLog';

import { normalizeRawProduct, RawProductAPI } from '../models/Products';

type PrivateFields = '_products' | '_currentProduct' | '_hasNextPage';

export class ProductsStore {
  private _products: CollectionModel<number, ProductModel> = getInitialCollectionModel();

  private _currentProduct: ProductModel | null = null;

  private requestState = new RequestState();

  private _hasNextPage: boolean = true;

  get products(): ProductModel[] {
    return linearizeCollection(this._products);
  }

  get currentProduct(): ProductModel | null {
    return this._currentProduct;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
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

      setProducts: action.bound,
    });
  }

  setProducts(products: CollectionModel<number, ProductModel>) {
    this._products = products;
  }

  static buildProductsURL(title?: string, categories: Option[] = [], page: number = 1, id?: number): string {
    const params = new URLSearchParams();

    if (title) params.append('title', title);
    if (categories.length) params.append('categoryId', categories.map((c) => c.key).join(','));
    if (page) {
      params.append('offset', `${(page - 1) * CONFIG.PRODUCTS_PER_PAGE}`);
      params.append('limit', `${CONFIG.PRODUCTS_PER_PAGE}`);
    }

    return id ? `products/${id}` : `products?${params.toString()}`;
  }

  fetchProducts = async (title?: string, categories: Option[] = [], page: number = 1) => {
    if (this.requestState.isLoading) {
      return;
    }
    this.requestState.set(Meta.loading);
    const url = getApiUrl(ProductsStore.buildProductsURL(title, categories, page));
    const result = await axios<RawProductAPI[]>({
      method: 'GET',
      url,
    });
    runInAction(() => {
      this.processFetchProductsResult(result);
    });
  };

  processFetchProductsResult(result: AxiosResponse<RawProductAPI[]>) {
    if (result.status === HttpStatusCode.Ok) {
      try {
        const products: ProductModel[] = result.data.map(normalizeRawProduct);
        this.requestState.set(Meta.success);
        this.setProducts(normalizeCollection(products, (productItem) => productItem.id));
        this.setHasNextPage(result.data.length === CONFIG.PRODUCTS_PER_PAGE);
      } catch (e) {
        devLog(e);
        this.requestState.set(Meta.error);
        this.setProducts(getInitialCollectionModel());
      }
    } else {
      this.requestState.set(Meta.error);
    }
  }

  setHasNextPage(hasNextPage: boolean) {
    this._hasNextPage = hasNextPage;
  }

  fetchProduct = async (id: number) => {
    if (this.requestState.isLoading) {
      return;
    }
    this.requestState.set(Meta.loading);
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
        this.requestState.set(Meta.success);
        const normalizedProduct = normalizeRawProduct(result.data);
        this._currentProduct = normalizedProduct;

        if (!this._products.order.includes(normalizedProduct.id)) {
          this._products.order.push(normalizedProduct.id);
        }
        this._products.entities[normalizedProduct.id] = normalizedProduct;
      } catch (e) {
        devLog(e);
        this.requestState.set(Meta.error);
        this._currentProduct = null;
      }
    } else {
      this.requestState.set(Meta.error);
    }
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      devLog('search', search);
    },
  );
}