import axios from 'axios';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';

import { Option } from '@components/MultiDropDown/MultiDropDown';
import { getApiUrl } from '@config/api';
import { Meta } from '@config/meta';
import { ProductModel } from '@store/models/Products/ProductModel';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collectionModel';
import rootStore from '@store/RootStore';

import { normalizeRawProduct } from '../models/Products';

type PrivateFields = '_products' | '_currentProduct' | '_meta' | '_hasNextPage';

export class ProductsStore {
  private _products: CollectionModel<number, ProductModel> = getInitialCollectionModel();

  private _currentProduct: ProductModel | null = null;

  private _meta: Meta = Meta.initial;

  private _hasNextPage: boolean = true;

  get products(): ProductModel[] {
    return linearizeCollection(this._products);
  }

  get currentProduct(): ProductModel | null {
    return this._currentProduct;
  }

  get meta(): Meta {
    return this._meta;
  }

  get hasNextPage(): boolean {
    return this._hasNextPage;
  }

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _products: observable.ref,
      _currentProduct: observable.ref,
      _meta: observable,
      _hasNextPage: observable,

      products: computed,
      currentProduct: computed,
      meta: computed,
      hasNextPage: computed,

      fetchProducts: action,
      fetchProduct: action,
    });
  }

  fetchProducts = async (title?: string, categories: Option[] = [], page: number = 1) => {
    runInAction(() => {
      this._meta = Meta.loading;
      this._products = getInitialCollectionModel();
    });
    const titleUrl = title ? `title=${title}` : '';
    const categoriesUrl = categories?.length ? `&categoryId=${categories.map((c) => c.key).join(',')}` : '';
    console.log(categoriesUrl);
    const result = await axios({
      method: 'GET',
      url: getApiUrl(`products?${titleUrl}&${categoriesUrl}&offset=${(page - 1) * 9}&limit=9`),
    });
    runInAction(() => {
      if (result.status === 200) {
        try {
          const products: ProductModel[] = result.data.map(normalizeRawProduct);

          this._meta = Meta.success;
          this._products = normalizeCollection(products, (productItem) => productItem.id);
          this._hasNextPage = result.data.length === 9;
        } catch (e) {
          console.log(e);
          this._meta = Meta.error;
          this._products = getInitialCollectionModel();
        }
      } else {
        this._meta = Meta.error;
      }
    });
  };

  fetchProduct = async (id: number) => {
    this._meta = Meta.loading;
    this._currentProduct = null;

    const result = await axios({
      method: 'get',
      url: getApiUrl(`products/${id}`),
    });
    runInAction(() => {
      if (result.status === 200) {
        try {
          this._meta = Meta.success;
          const normalizedProduct = normalizeRawProduct(result.data);
          this._currentProduct = normalizedProduct;
          if (!this._products.order.includes(normalizedProduct.id)) {
            this._products.order.push(normalizedProduct.id);
          }
          this._products.entities[normalizedProduct.id] = normalizedProduct;
        } catch (e) {
          console.log(e);
          this._currentProduct = null;
          this._meta = Meta.error;
        }
      } else {
        this._meta = Meta.error;
      }
    });
  };

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      console.log('search', search);
    },
  );
}