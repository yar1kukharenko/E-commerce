import { observer } from 'mobx-react-lite';

import * as React from 'react';
import { useParams } from 'react-router-dom';

import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Header from '@components/Header';
import Loader from '@components/Loader';
import { useCartStore } from '@hooks/useCartStore';
import { ProductsStore } from '@store/ProductsStore/ProductsStore';

import Product from './components/Product';
import RelatedProducts from './components/RelatedProducts';
import styles from './ProductPageStyles.module.scss';

const ProductPage = () => {
  const cartStore = useCartStore();
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

  const addToCart = () => {
    if (productsStore.currentProduct) {
      cartStore.addProduct(productsStore.currentProduct);
    }
  };
  const idArray = Array.from(cartStore.items.entries()).map((item) => item[0].id);
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
            actionSlotRight={
              <Button disabled={idArray.includes(productsStore.currentProduct.id)} onClick={addToCart}>
                Add to Cart
              </Button>
            }
          />
          <RelatedProducts category={category.id} />
        </div>
      </>
    );
  }
  return null;
};

export default observer(ProductPage);
