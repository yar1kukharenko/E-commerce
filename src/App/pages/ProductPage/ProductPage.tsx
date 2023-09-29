import { observer } from 'mobx-react-lite';

import * as React from 'react';
import { useParams } from 'react-router-dom';

import Button from '@components/Button';
import Loader from '@components/Loader';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';

import Product from './components';
import styles from './ProductPageStyles.module.scss';

const ProductPage = () => {
  const { id } = useParams();
  const productsStore = React.useMemo(() => new ProductsStore(), [ProductsStore]);
  React.useEffect(() => {
    productsStore.fetchProduct(Number(id));
  }, [id, productsStore]);
  if (productsStore.getRequestState.isLoading) {
    return (
      <div className={styles.wrapper}>
        <Loader className={styles.loader} size="l" />
      </div>
    );
  }
  if (productsStore.currentProduct) {
    const { image, title, description, price } = productsStore.currentProduct;
    return (
      <Product
        image={image}
        title={title}
        description={description}
        price={`${price}$`}
        actionSlotLeft={<Button>Buy Now</Button>}
        actionSlotRight={<Button>Add to Cart</Button>}
      />
    );
  }
  return null;
};

export default observer(ProductPage);
