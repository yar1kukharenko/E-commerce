import { observer, useLocalObservable } from 'mobx-react-lite';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
import { useCartStore } from '@hooks/useCartStore';
import { RelatedProductsStore } from '@store/RelatedProductsStore/RelatedProductsStore';

import styles from './RelatedProducts.module.scss';

export type RelatedProductsProps = {
  category: number;
};
export const RelatedProducts: React.FC<RelatedProductsProps> = ({ category }) => {
  const relatedProducts = useLocalObservable(() => new RelatedProductsStore(category));
  React.useEffect(() => {
    relatedProducts.fetchProducts();
  }, [relatedProducts]);

  const navigate = useNavigate();
  const cartStore = useCartStore();

  const idArray = Array.from(cartStore.items.entries()).map((item) => item[0].id);

  return (
    <>
      <Text className={styles.title} view="title">
        Related Items
      </Text>
      <div className={styles.relatedProducts}>
        {relatedProducts.products.map((product) => (
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
    </>
  );
};

export default observer(RelatedProducts);
