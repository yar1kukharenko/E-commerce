import { observer } from 'mobx-react-lite';

import classNames from 'classnames';
import * as React from 'react';

import Header from '@components/Header';
import MultiDropdown from '@components/MultiDropdown';
import TextBlock from '@components/TextBlock';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';

import ProductsList from './components/ProductsList';
import Search from './components/Search';
import { useFetchData } from './hooks/useFetchList';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
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

  useInfiniteScroll(() => {
    productListStore.fetchDataAndUpdateState();
  }, productListStore.hasNextPage);

  return (
    <>
      <Header />
      <div className={classNames('container', styles.wrapper)}>
        <TextBlock
          title="Products"
          subtitle={
            'We display products based on the latest products we have, if you want\n' +
            'to see our old products please enter the name of the item'
          }
        />
        <Search productListStore={productListStore} />
        <MultiDropdown
          className={styles.dropdown}
          options={productListStore.categories.map((cat) => ({ key: String(cat.id), value: cat.name }))}
          value={productListStore.selectedCategories}
          onChange={(options) => productListStore.handleOnChange(options)}
          getTitle={getTitle}
        />
        <ProductsList productListStore={productListStore} />
      </div>
    </>
  );
};

export default observer(ProductListPage);
