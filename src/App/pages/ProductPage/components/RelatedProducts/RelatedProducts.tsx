import { observer, useLocalObservable } from 'mobx-react-lite';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
import { RelatedProductsStore } from '@store/RelatedProductsStore/RelatedProductsStore';
import rootStore from '@store/RootStore';

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
  const { cart } = rootStore;

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
            contentSlot={`${product.formattedPrice}`}
            actionSlot={
              <Button
                disabled={cart.idArray.includes(product.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  cart.addProduct(product);
                }}
              >
                {cart.idArray.includes(product.id) ? 'In Cart' : 'Add to Cart'}
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
