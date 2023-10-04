import { action, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';

import { CategoriesStore } from '@store/CategoriesStore/CategoriesStore';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';
import rootStore from '@store/RootStore';
import { RequestState } from '@store/RootStore/RequestState';

type PrivateFields = '_searchValue' | '_selectedCategories' | '_currentPage' | '_productsStore' | '_categoriesStore';

export class ProductListStore {
  private _searchValue: string = '';

  private _selectedCategories: Option[] = [];

  private _currentPage: number = 1;

  private _productsStore: ProductsStore;

  private _categoriesStore: CategoriesStore;

  readonly _searchParamsReaction: IReactionDisposer;

  private readonly _updateUrl: (params: Record<string, string>) => void;

  constructor(
    productsStore: ProductsStore,
    categoriesStore: CategoriesStore,
    updateUrl: (params: Record<string, string>) => void,
  ) {
    this._productsStore = productsStore;
    this._categoriesStore = categoriesStore;

    this._updateUrl = updateUrl;

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
      _categoriesStore: observable,

      handleSearch: action,
      handlePageChange: action,
      handleOnChange: action,
      dispose: action,
      fetchDataAndUpdateState: action,
      parseAndSetCategoriesFromUrl: action,
      parseAndSetSearchValueFromUrl: action,
      setSearchValue: action.bound,
      fetchProducts: action,
      fetchCategories: action,
      setSelectedCategories: action.bound,
      setCurrentPage: action.bound,
    });
  }

  get hasNextPage() {
    return this._productsStore.hasNextPage;
  }

  get categories() {
    return this._categoriesStore.categories;
  }

  get products() {
    return this._productsStore.products;
  }

  get selectedCategories() {
    return this._selectedCategories;
  }

  setSelectedCategories(categories: Option[]) {
    this._selectedCategories = categories;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  get getRequestState(): RequestState {
    return this._productsStore.getRequestState;
  }

  setSearchValue(value: string) {
    this._searchValue = value;
  }

  setCurrentPage(page: number) {
    this._currentPage = page;
  }

  get currentPage() {
    return this._currentPage;
  }

  async fetchCategories() {
    await this._categoriesStore.fetchCategories();
  }

  async parseAndSetCategoriesFromUrl() {
    const categoriesParam = rootStore.query.getParam('categories');

    if (typeof categoriesParam === 'string') {
      this._selectedCategories = categoriesParam
        .split(',')
        .filter((cat) => cat)
        .map((catId) => ({
          key: catId,
          value: this._categoriesStore.getCategoryNameById(parseInt(catId, 10)),
        }));
    } else {
      this._selectedCategories = [];
    }
  }

  parseAndSetSearchValueFromUrl() {
    this.setSearchValue(String(rootStore.query.getParam('search') || ''));
  }

  async fetchProducts() {
    const { searchValue } = this;
    const { selectedCategories } = this;
    const page = Number(rootStore.query.getParam('page') || 1);

    await this._productsStore.fetchProducts(searchValue, selectedCategories, page);
  }

  async fetchDataAndUpdateState() {
    await this.parseAndSetCategoriesFromUrl();
    this.parseAndSetSearchValueFromUrl();
    await this.fetchProducts();
  }

  handleSearch = () => {
    this._productsStore.fetchProducts(this.searchValue, this.selectedCategories, 1);
    this._updateUrl({
      search: this._searchValue,
      categories: this._selectedCategories.map((c) => c.key).join(','),
      page: String(this._currentPage),
    });
    this.setCurrentPage(1);
  };

  handlePageChange(newPage: number) {
    this._productsStore.fetchProducts(this.searchValue, this.selectedCategories, newPage);
    this._updateUrl({
      search: this._searchValue,
      categories: this._selectedCategories.map((c) => c.key).join(','),
      page: String(newPage),
    });
    this.setCurrentPage(newPage);
  }

  handleOnChange(options: Option[]) {
    this.setSelectedCategories(options);
    this._updateUrl({
      search: this._searchValue,
      categories: this._selectedCategories.map((c) => c.key).join(','),
      page: String(this._currentPage),
    });
    this._productsStore.fetchProducts(this.searchValue, this.selectedCategories, 1);
  }

  dispose() {
    this._searchParamsReaction();
  }
}
