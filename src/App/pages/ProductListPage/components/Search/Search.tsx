import { observer } from 'mobx-react-lite';

import * as React from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';

import styles from '../../ProductListPage.module.scss';

type SearchProps = {
  productListStore: ProductListStore;
};

const Search: React.FC<SearchProps> = ({ productListStore }) => {
  const handleSearchInputChange = (newValue: string) => {
    productListStore.setSearchValue(newValue);
  };
  return (
    <div className={styles.search}>
      <Input
        id="search"
        className={styles.input}
        placeholder="Search product"
        value={productListStore.searchValue}
        onChange={handleSearchInputChange}
      />
      <Button onClick={productListStore.handleSearch} className={styles.search__button}>
        Find Now
      </Button>
    </div>
  );
};

export default observer(Search);
