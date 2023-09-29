import { action, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';

import { CategoriesStore } from '@store/CategoriesStore/CategoriesStore';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';
import rootStore from '@store/RootStore';

type PrivateFields = '_searchValue' | '_selectedCategories' | '_currentPage' | '_productsStore';

export class ProductListStore {
  private _searchValue: string = '';

  private _selectedCategories: Option[] = [];

  private _currentPage: number = 1;

  private _productsStore: ProductsStore;

  private _categoriesStore: CategoriesStore;

  private _searchParamsReaction: IReactionDisposer;

  constructor(productsStore: ProductsStore, categoriesStore: CategoriesStore) {
    this._productsStore = productsStore;
    this._categoriesStore = categoriesStore;
    this._searchParamsReaction = reaction(
      () => rootStore.query.getParam('categories'),
      (categoriesString) => {
        if (typeof categoriesString === 'string') {
          this._selectedCategories = categoriesString
            .split(',')
            .filter((cat) => cat)
            .map((catId) => ({
              key: catId,
              value: this._categoriesStore.getCategoryNameById(parseInt(catId, 10)),
            }));
        } else {
          this._selectedCategories = [];
        }
      },
    );
    makeObservable<this, PrivateFields>(this, {
      _searchValue: observable,
      _selectedCategories: observable,
      _currentPage: observable,
      _productsStore: observable,

      handleSearch: action,
      handlePageChange: action,
      handleOnChange: action,
      dispose: action,
    });
  }

  set searchValue(value: string) {
    this._searchValue = value;
  }

  set selectedCategories(categories: Option[]) {
    this._selectedCategories = categories;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  handleSearch() {
    this._productsStore.fetchProducts(this._searchValue, this._selectedCategories, 1);
    this.currentPage = 1;
  }

  handlePageChange(newPage: number) {
    this._productsStore.fetchProducts(this.searchValue, this.selectedCategories, newPage);
    this.currentPage = newPage;
  }

  handleOnChange(options: Option[]) {
    this.selectedCategories = options;
  }

  dispose() {
    this._searchParamsReaction();
  }
}
