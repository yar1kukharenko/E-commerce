import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { normalizeRawCategories, RawCategoriesModel } from 'store/models/Products';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collectionModel';
import { Meta } from 'utils/meta';

type PrivateFields = '_categories' | '_meta';

export class CategoriesStore {
  private _categories: CollectionModel<number, RawCategoriesModel> = getInitialCollectionModel();

  private _meta = Meta.initial;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      fetchCategories: action,
      getCategoryNameById: action,
      categories: computed,
    });
  }

  get categories(): RawCategoriesModel[] {
    return linearizeCollection(this._categories);
  }

  get meta(): Meta {
    return this._meta;
  }

  fetchCategories = async () => {
    runInAction(() => {
      this._meta = Meta.loading;
    });
    try {
      const result = await axios.get('https://api.escuelajs.co/api/v1/categories');
      runInAction(() => {
        if (result.status === 200) {
          const categories: RawCategoriesModel[] = result.data.map(normalizeRawCategories);
          this._categories = normalizeCollection(categories, (categoryItem) => categoryItem.id);
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (e) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  };

  getCategoryNameById(id: number): string {
    const category = this.categories.find((cat) => cat.id === id);
    return category ? category.name : id.toString();
  }
}