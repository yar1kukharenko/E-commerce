import { observer } from 'mobx-react-lite';

import * as React from 'react';
import { useParams } from 'react-router-dom';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Header from '@components/Header';
import Loader from '@components/Loader';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';

import Product from './components/Product';
import RelatedProducts from './components/RelatedProducts';
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
    const { image, title, description, price, category } = productsStore.currentProduct;
    return (
      <>
        <Header />
        <div className="container">
          <BackButton />
          <Product
            image={image}
            title={title}
            description={description}
            price={`${price}$`}
            actionSlotLeft={<Button>Buy Now</Button>}
            actionSlotRight={<Button>Add to Cart</Button>}
          />
          <RelatedProducts category={category.id} />
        </div>
      </>
    );
  }
  return null;
};

export default observer(ProductPage);
