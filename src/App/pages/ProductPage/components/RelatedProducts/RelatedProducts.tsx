import { observer, useLocalObservable } from 'mobx-react-lite';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
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
            actionSlot={<Button>Add to Cart</Button>}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
    </>
  );
};

export default observer(RelatedProducts);
