import { observer, useLocalObservable } from 'mobx-react-lite';

import classNames from 'classnames';
import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import { CategoriesStore } from '@store/CategoriesStore/CategoriesStore';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';

import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  const productsStore = useLocalObservable(() => new ProductsStore());
  const categoriesStore = useLocalObservable(() => new CategoriesStore());
  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrl = React.useCallback(
    (updatedParams: Record<string, string>) => {
      const currentParams = Array.from(searchParams.entries()).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {},
      );
      setSearchParams({ ...currentParams, ...updatedParams });
    },
    [searchParams, setSearchParams],
  );

  const productListStore = useLocalObservable(() => new ProductListStore(productsStore, categoriesStore, updateUrl));
  React.useEffect(() => {
    const fetchData = async () => {
      await productListStore.fetchCategories();
      await productListStore.fetchDataAndUpdateState();
    };

    fetchData();
  }, [productListStore]);

  const handleSearchInputChange = (newValue: string) => {
    productListStore.setSearchValue(newValue);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <Input
            className={styles.input}
            placeholder="Search product"
            value={productListStore.searchValue}
            onChange={handleSearchInputChange}
          />
          <Button onClick={productListStore.handleSearch} className={styles.search__button}>
            Find Now
          </Button>
        </div>
        <MultiDropdown
          className={styles.dropdown}
          options={productListStore.categories.map((cat) => ({ key: String(cat.id), value: cat.name }))}
          value={productListStore.selectedCategories}
          onChange={(options) => productListStore.handleOnChange(options)}
          getTitle={(values) => {
            if (!Array.isArray(values) || values.length === 0) {
              return 'Filter';
            }
            return values.map(({ value }) => value).join(', ');
          }}
        />
        <div className={styles.product_list}>
          {productListStore.products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card
                title={product.title}
                images={product.image}
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
        {[...Array(productListStore.currentPage).keys()].map((page) => (
          <Button
            key={page}
            onClick={() => productListStore.handlePageChange(page + 1)}
            className={classNames(
              page + 1 === productListStore.currentPage ? styles.active : '',
              styles.pagination__button,
            )}
          >
            {page + 1}
          </Button>
        ))}
        {productsStore.hasNextPage && (
          <Button
            className={styles.pagination__button}
            onClick={() => productListStore.handlePageChange(productListStore.currentPage + 1)}
          >
            {productListStore.currentPage + 1}
          </Button>
        )}
      </div>
    </>
  );
};

export default observer(ProductListPage);
