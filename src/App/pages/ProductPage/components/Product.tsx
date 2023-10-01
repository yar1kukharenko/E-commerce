import classNames from 'classnames';
import * as React from 'react';

import Text from '@components/Text';

import styles from './Product.module.scss';

export type ProductProps = {
  className?: string;
  image: string[] | null;
  title: React.ReactNode;
  description?: React.ReactNode;
  price: React.ReactNode;
  actionSlotLeft?: React.ReactNode;
  actionSlotRight?: React.ReactNode;
};
const Product: React.FC<ProductProps> = ({
  className,
  description,
  price,
  actionSlotLeft,
  actionSlotRight,
  image,
  title,
}: ProductProps) => {
  const placeholderImage = 'src/assets/images/image_not_found.png';
  const displayedImage = image && image[0] ? image[0] : placeholderImage;
  return (
    <div className={classNames(styles.product_page, className)}>
      <div className={styles.product_page__image}>
        <img className={styles.product_page__image_src} src={displayedImage} alt="Product" />
      </div>
      <div className={styles.product_page__body}>
        <div className={styles.product_page__top}>
          <Text className={styles.product_page__top_title} maxLines={2} tag="h2" view="title" color="primary">
            {title}
          </Text>
          {description && (
            <Text className={styles.product_page__top_description} view="p-20" color="secondary">
              {description}
            </Text>
          )}
        </div>
        <div className={styles.product_page__bottom}>
          <Text className={styles.product_page__bottom_price} view="title">
            {price}
          </Text>
          <div className={styles.product_page__bottom_action}>
            {actionSlotLeft}
            {actionSlotRight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
