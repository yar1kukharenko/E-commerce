import { observer } from 'mobx-react-lite';

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import { useCartStore } from '@hooks/useCartStore';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';

import styles from '../../ProductListPage.module.scss';

type ProductsListProps = {
  productListStore: ProductListStore;
};

const ProductsList: React.FC<ProductsListProps> = ({ productListStore }) => {
  const navigate = useNavigate();
  const cartStore = useCartStore();
  const idArray = Array.from(cartStore.items.entries()).map((item) => item[0].id);
  return (
    <div className={styles.product_list}>
      {productListStore.products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          images={product.image}
          captionSlot={product.category.name}
          subtitle={product.description}
          contentSlot={`${product.price}$`}
          actionSlot={
            <Button
              disabled={idArray.includes(product.id)}
              onClick={(e) => {
                e.stopPropagation();
                cartStore.addProduct(product);
              }}
            >
              Add to Cart
            </Button>
          }
          onClick={() => navigate(`/product/${product.id}`)}
        />
      ))}
    </div>
  );
};

export default observer(ProductsList);
