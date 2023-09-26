import { action, computed, makeObservable, observable } from 'mobx';

export enum Meta {
  initial = 'initial',
  loading = 'loading',
  error = 'error',
  success = 'success',
}

type PrivateFields = '_meta';

export class RequestState {
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _meta: observable,
      isInitial: computed,
      isLoading: computed,
      isError: computed,
      isSuccess: computed,
      set: action.bound,
    });
  }

  get isInitial(): boolean {
    return this._meta === Meta.initial;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  set(state: Meta) {
    this._meta = state;
  }
}
