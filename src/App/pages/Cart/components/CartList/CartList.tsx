import { observer } from 'mobx-react-lite';

import * as React from 'react';

import Button from '@components/Button';
import Text from '@components/Text';
import { CONFIG } from '@config/config';
import { useCartStore } from '@hooks/useCartStore';

import styles from './CartList.module.scss';

const CartList = () => {
  const cartStore = useCartStore();

  const [placeholderImage, setPlaceholderImage] = React.useState(CONFIG.PLACEHOLDERIMAGE);
  return (
    <div className={styles.cartlist}>
      {Array.from(cartStore.items.entries()).map(([product]) => (
        <div className={styles.product} key={product.id}>
          <div className={styles.leftside}>
            <img
              className={styles.image}
              src={product.image[0] || placeholderImage}
              onError={() => setPlaceholderImage(CONFIG.PLACEHOLDERIMAGE)}
              alt="Product"
            />
            <Text view="p-20" weight="normal">
              {product.title}
            </Text>
          </div>
          <div className={styles.rightside}>
            <Text view="p-20" weight="medium">
              {product.price}$
            </Text>
            <Button className={styles.deleteButton} type="button" onClick={() => cartStore.removeProduct(product)}>
              <Text view="button">Удалить</Text>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default observer(CartList);
