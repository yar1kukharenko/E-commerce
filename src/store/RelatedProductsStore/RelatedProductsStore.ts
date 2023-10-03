import axios, { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getApiUrl } from '@config/api';
import { normalizeRawProduct, ProductModel, RawProductAPI } from '@store/models/Products';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collectionModel';
import { Meta, RequestState } from '@store/RootStore/RequestState/RequestState';
import { devLog } from '@utils/devLog';

type PrivateFields = '_products';

export class RelatedProductsStore {
  private _products: CollectionModel<number, ProductModel> = getInitialCollectionModel();

  private _requestState = new RequestState();

  readonly _category: number;

  constructor(category: number) {
    this._category = category;
    makeObservable<this, PrivateFields>(this, {
      _products: observable.ref,

      products: computed,

      processFetchProductsResult: action,
      fetchProducts: action.bound,
    });
  }

  setProducts(products: CollectionModel<number, ProductModel>) {
    this._products = products;
  }

  get products() {
    return linearizeCollection(this._products);
  }

  static buildProductsURL(category: number): string {
    const limit: string = '3';
    const params = new URLSearchParams();
    if (category) params.append('categoryId', `${category}`);

    params.append('offset', `0`);
    params.append('limit', `${limit}`);

    return `products?${params.toString()}`;
  }

  processFetchProductsResult(result: AxiosResponse<RawProductAPI[]>) {
    try {
      const products: ProductModel[] = result.data.map(normalizeRawProduct);
      this.setProducts(normalizeCollection(products, (product) => product.id));
      this._requestState.set(Meta.success);
    } catch (e) {
      devLog(e);
      this._requestState.set(Meta.error);
      this.setProducts(getInitialCollectionModel());
    }
  }

  fetchProducts = async () => {
    if (this._requestState.isLoading) {
      return;
    }
    this._requestState.set(Meta.loading);
    const url = getApiUrl(RelatedProductsStore.buildProductsURL(this._category));

    try {
      const response = await axios.get<RawProductAPI[]>(url);
      runInAction(() => {
        this.processFetchProductsResult(response);
      });
    } catch (error) {
      runInAction(() => {
        devLog(error);
        this._requestState.set(Meta.error);
        this.setProducts(getInitialCollectionModel());
      });
    }
  };
}
