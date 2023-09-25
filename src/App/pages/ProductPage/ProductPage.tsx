import { observer, useLocalObservable } from 'mobx-react-lite';

import * as React from 'react';
import { useParams } from 'react-router-dom';

import Button from 'components/Button';

import { ProductsStore } from '../../../store/ProductsStore/ProductsStore';

import Product from './components';

const ProductPage = () => {
  const { id } = useParams();
  const productsStore = useLocalObservable(() => new ProductsStore());

  React.useEffect(() => {
    productsStore.fetchProduct(Number(id));
  }, [id, productsStore]);

  if (!productsStore.currentProduct) {
    return <p>Loading...</p>;
  }

  const { images, title, description, price } = productsStore.currentProduct;
  return (
    <Product
      image={images[0]}
      title={title}
      description={description}
      price={`${price}$`}
      actionSlotLeft={<Button>Buy Now</Button>}
      actionSlotRight={<Button>Add to Cart</Button>}
    />
  );
}

export default observer(ProductPage);
