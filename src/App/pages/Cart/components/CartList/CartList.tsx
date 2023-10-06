import { observer } from 'mobx-react-lite';

import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/Button';
import Text from '@components/Text';
import { CONFIG } from '@config/config';
import rootStore from '@store/RootStore';

import styles from './CartList.module.scss';

const CartList = () => {
  const { cart } = rootStore;
  const placeholderImage = CONFIG.PLACEHOLDERIMAGE;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e.currentTarget as HTMLImageElement;
    image.src = CONFIG.PLACEHOLDERIMAGE;
  };

  return (
    <div className={styles.cartlist}>
      {Array.from(cart.cartItems.entries()).map(([product]) => (
        <div className={styles.product} key={product.id}>
          <div className={styles.leftside}>
            <img
              className={styles.image}
              src={product.image[0] || placeholderImage}
              onError={handleError}
              alt="Product"
            />
            <Text view="p-20" weight="normal">
              <Link className={styles.link} to={`/product/${product.id}`}>
                {product.title}
              </Link>
            </Text>
          </div>
          <div className={styles.rightside}>
            <Text view="p-20" weight="medium">
              {product.formattedPrice}
            </Text>
            <Button className={styles.deleteButton} type="button" onClick={() => cart.removeProduct(product)}>
              <Text view="button">Удалить</Text>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default observer(CartList);
