import { observer, useLocalObservable } from 'mobx-react-lite';

import classNames from 'classnames';
import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import MultiDropDown from '@components/MultiDropDown';
import { Option } from '@components/MultiDropDown/MultiDropDown';
import { CategoriesStore } from '@store/CategoriesStore/CategoriesStore';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';

import { usePaginationLogic, useSearchLogic } from './hooks';
import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  const productsStore = useLocalObservable(() => new ProductsStore());
  const categoriesStore = useLocalObservable(() => new CategoriesStore());
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = React.useState<Option[]>([]);

  const updateSearchParams = React.useCallback(
    (updatedParams: Record<string, string>) => {
      const currentParams = Array.from(searchParams.entries()).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {},
      );
      setSearchParams({ ...currentParams, ...updatedParams });
    },
    [searchParams, setSearchParams],
  );

  React.useEffect(() => {
    const loadCategories = async () => {
      await categoriesStore.fetchCategories();
      const categoriesString = searchParams.get('categories') || '';
      const loadedCategories = categoriesString
        .split(',')
        .filter((cat) => cat)
        .map((catId) => ({
          key: catId,
          value: categoriesStore.getCategoryNameById(parseInt(catId, 10)),
        }));

      setSelectedCategories(loadedCategories);
    };

    loadCategories();
  }, [categoriesStore, searchParams]);
  const {
    searchValue,
    handleInputChange,
    handleSearch: applySearch,
  } = useSearchLogic(searchParams.get('search') || '');
  const { currentPage, handlePageChange: navigateToPage } = usePaginationLogic(
    parseInt((searchParams.get('page') as string) || '1', 10),
  );
  React.useEffect(() => {
    const currentSearchValue = (searchParams.get('search') as string) || '';

    if (currentSearchValue) {
      handleInputChange(currentSearchValue);
      productsStore.fetchProducts(currentSearchValue, selectedCategories, currentPage);
    } else {
      productsStore.fetchProducts(undefined, selectedCategories, currentPage);
    }
  }, [productsStore, searchParams, selectedCategories]);

  const handleSearch = () => {
    applySearch((value: string) => {
      setSearchParams({ search: value });
      navigateToPage(1, (page) => {
        productsStore.fetchProducts(searchValue, selectedCategories, page);
      });

      productsStore.fetchProducts(value, selectedCategories, 1);
    });
  };

  const handlePageChange = (newPage: number) => {
    navigateToPage(newPage, (page) => {
      updateSearchParams({ page: String(page) });
      productsStore.fetchProducts(searchValue, selectedCategories, page);
    });
  };

  const handleOnChange = (options: Option[]) => {
    setSelectedCategories(options);
    updateSearchParams({ categories: options.map((o) => o.key).join(',') });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <Input
            className={styles.input}
            placeholder="Search product"
            value={searchValue}
            onChange={handleInputChange}
          />
          <Button onClick={handleSearch} className={styles.search__button}>
            Find Now
          </Button>
        </div>
        <MultiDropDown
          className={styles.dropdown}
          options={categoriesStore.categories.map((cat) => ({ key: String(cat.id), value: cat.name }))}
          value={selectedCategories}
          onChange={handleOnChange}
          getTitle={(values) => {
            if (!Array.isArray(values) || values.length === 0) {
              return 'Filter';
            }
            return values.map(({ value }) => value).join(', ');
          }}
        />
        <div className={styles.product_list}>
          {productsStore.products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card
                title={product.title}
                image={product.images[0]}
                captionSlot={product.category.name}
                subtitle={product.description}
                contentSlot={`${product.price}$`}
                actionSlot={<Button>Add to Cart</Button>}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.pagination}>
        {[...Array(currentPage).keys()].map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={classNames(page + 1 === currentPage ? styles.active : '', styles.pagination__button)}
          >
            {page + 1}
          </Button>
        ))}
        {productsStore.hasNextPage && (
          <Button className={styles.pagination__button} onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </Button>
        )}
      </div>
    </>
  );
};

export default observer(ProductListPage);
