import { observer } from 'mobx-react-lite';

import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';

import styles from '../../ProductListPage.module.scss';

type ProductsListProps = {
  productListStore: ProductListStore;
};

const ProductsList: React.FC<ProductsListProps> = ({ productListStore }) => (
  <div className={styles.product_list}>
    {productListStore.products.map((product) => (
      <Link className={styles.link} to={`/product/${product.id}`} key={product.id}>
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
);

export default observer(ProductsList);
