import * as React from 'react';

import { ProductListStore } from '@store/ProductListStore/ProductListStore';

export const useFetchData = (productListStore: ProductListStore) => {
  React.useEffect(() => {
    const fetchData = async () => {
      await productListStore.fetchCategories();
      await productListStore.fetchDataAndUpdateState();
    };

    fetchData();
  }, [productListStore]);
};
