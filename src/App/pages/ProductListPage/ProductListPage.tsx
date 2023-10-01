import { observer } from 'mobx-react-lite';

import * as React from 'react';

import MultiDropdown from '@components/MultiDropdown';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';

import Pagination from './components/Pagination';
import ProductsList from './components/ProductsList';
import Search from './components/Search';
import { useFetchData } from './hooks/useFetchList';
import { useStores } from './hooks/useStores';
import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  const { productListStore } = useStores();
  useFetchData(productListStore);
  const getTitle = (values: Option[]): string => {
    if (!Array.isArray(values) || values.length === 0) {
      return 'Filter';
    }
    return values.map(({ value }) => value).join(', ');
  };

  return (
    <div className={styles.wrapper}>
      <Search productListStore={productListStore} />
      <MultiDropdown
        className={styles.dropdown}
        options={productListStore.categories.map((cat) => ({ key: String(cat.id), value: cat.name }))}
        value={productListStore.selectedCategories}
        onChange={(options) => productListStore.handleOnChange(options)}
        getTitle={getTitle}
      />
      <ProductsList productListStore={productListStore} />
      <Pagination productListStore={productListStore} />
    </div>
  );
};

export default observer(ProductListPage);
