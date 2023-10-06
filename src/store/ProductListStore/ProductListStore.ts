import { action, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';

import { CategoriesStore } from '@store/CategoriesStore/CategoriesStore';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';
import rootStore from '@store/RootStore';
import { RequestState } from '@store/RootStore/RequestState';

type PrivateFields = '_searchValue' | '_selectedCategories' | '_productsStore' | '_categoriesStore';

export class ProductListStore {
  private _searchValue: string = '';

  private _selectedCategories: Option[] = [];

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

    const { query } = rootStore;

    this._searchParamsReaction = reaction(
      () => query.getParam('categories'),
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
      _productsStore: observable,
      _categoriesStore: observable,

      handleSearch: action,

      handleOnChange: action,
      dispose: action,
      fetchDataAndUpdateState: action,
      parseAndSetCategoriesFromUrl: action,
      parseAndSetSearchValueFromUrl: action,
      setSearchValue: action.bound,
      fetchProducts: action,
      fetchCategories: action,
      setSelectedCategories: action.bound,
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

    await this._productsStore.fetchProducts(searchValue, selectedCategories);
  }

  async fetchDataAndUpdateState() {
    await this.parseAndSetCategoriesFromUrl();
    this.parseAndSetSearchValueFromUrl();
    await this.fetchProducts();
  }

  handleSearch = () => {
    this._productsStore.clearProducts(); // очищаем данные
    this._productsStore.setPreviousTitle(undefined); // сброс предыдущего значения
    this._productsStore.setPreviousCategories([]); // сброс предыдущего значения
    this._productsStore.fetchProducts(this.searchValue, this.selectedCategories);
    this._updateUrl({
      search: this._searchValue,
      categories: this._selectedCategories.map((c) => c.key).join(','),
    });
  };

  handleOnChange(options: Option[]) {
    this._productsStore.clearProducts(); // очищаем данные
    this._productsStore.setPreviousTitle(undefined); // сброс предыдущего значения
    this._productsStore.setPreviousCategories([]); // сброс предыдущего значения
    this.setSelectedCategories(options);
    this._updateUrl({
      search: this._searchValue,
      categories: this._selectedCategories.map((c) => c.key).join(','),
    });
    this._productsStore.fetchProducts(this.searchValue, this.selectedCategories);
  }

  dispose() {
    this._searchParamsReaction();
  }
}
