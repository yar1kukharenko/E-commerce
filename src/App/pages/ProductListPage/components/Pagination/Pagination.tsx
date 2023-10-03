import { observer } from 'mobx-react-lite';

import classNames from 'classnames';
import * as React from 'react';

import Button from '@components/Button';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';

import styles from '../../ProductListPage.module.scss';

type PaginationProps = {
  productListStore: ProductListStore;
};

const Pagination: React.FC<PaginationProps> = ({ productListStore }) => (
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
    {productListStore.hasNextPage && (
      <Button
        className={styles.pagination__button}
        onClick={() => productListStore.handlePageChange(productListStore.currentPage + 1)}
      >
        {productListStore.currentPage + 1}
      </Button>
    )}
  </div>
);

export default observer(Pagination);
