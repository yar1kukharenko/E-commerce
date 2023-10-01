import * as React from 'react';

import Text from '@components/Text';

import styles from '../../ProductListPage.module.scss';

const TextBlock = () => (
  <div className={styles.textBlock}>
    <Text view="title" className={styles.title}>
      Products
    </Text>
    <Text view="p-20" className={styles.subtitle}>
      We display products based on the latest products we have, if you want to see our old products please enter the
      name of the item
    </Text>
  </div>
);

export default TextBlock;
