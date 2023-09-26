import { action, makeObservable, observable } from 'mobx';
import qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};

  private _search: string = '';

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(key: string): qs.ParsedQs[string] {
    return this._params[key];
  }

  setSearch(search: string) {
    const sanitizedSearch = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== sanitizedSearch) {
      this._search = sanitizedSearch;
      this._params = qs.parse(sanitizedSearch);
    }
  }
}
