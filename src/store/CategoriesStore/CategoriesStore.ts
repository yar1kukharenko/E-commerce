import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { normalizeRawCategories, RawCategoriesAPI, RawCategoriesModel } from '@store/models/Products';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collectionModel';
import { RequestState } from '@store/RootStore/RequestState';
import { Meta } from '@store/RootStore/RequestState/RequestState';
import { devLog } from '@utils/devLog';

type PrivateFields = '_categories';

export class CategoriesStore {
  private _categories: CollectionModel<number, RawCategoriesModel> = getInitialCollectionModel();

  private _requestState = new RequestState();

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _categories: observable.ref,
      fetchCategories: action,
      processFetchCategoriesResult: action,
      getCategoryNameById: action,
      categories: computed,
    });
  }

  get categories(): RawCategoriesModel[] {
    return linearizeCollection(this._categories);
  }

  fetchCategories = async () => {
    if (this._requestState.isLoading) {
      return;
    }
    devLog('fetch cats');
    this._requestState.set(Meta.loading);
    const url = 'https://api.escuelajs.co/api/v1/categories';
    const result = await axios({
      method: 'get',
      url,
    });
    runInAction(() => {
      this.processFetchCategoriesResult(result);
    });
  };

  processFetchCategoriesResult(result: AxiosResponse<RawCategoriesAPI[]>) {
    if (result.status === HttpStatusCode.Ok) {
      try {
        const categories: RawCategoriesModel[] = result.data.map(normalizeRawCategories);
        this._categories = normalizeCollection(categories, (categoryItem) => categoryItem.id);
        this._requestState.set(Meta.success);
      } catch (e) {
        devLog(e);
        this._requestState.set(Meta.error);
      }
    } else {
      this._requestState.set(Meta.error);
    }
  }

  getCategoryNameById(id: number): string {
    const category = this._categories.entities[id];
    return category ? category.name : id.toString();
  }
}
