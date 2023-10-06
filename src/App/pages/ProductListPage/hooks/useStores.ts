import { useLocalObservable } from 'mobx-react-lite';

import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import { CategoriesStore } from '@store/CategoriesStore/CategoriesStore';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';

export const useStores = () => {
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

  return { productsStore, categoriesStore, productListStore, searchParams, setSearchParams, updateUrl };
};
