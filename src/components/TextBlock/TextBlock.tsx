import * as React from 'react';

import Text from '@components/Text';

import styles from './TextBlock.module.scss';

export type TextBlockProps = {
  title: string;
  subtitle: string;
};

const TextBlock: React.FC<TextBlockProps> = ({ title, subtitle }) => (
  <div className={styles.textBlock}>
    <Text view="title" className={styles.title}>
      {title}
    </Text>
    <Text view="p-20" className={styles.subtitle}>
      {subtitle}
    </Text>
  </div>
);

export default TextBlock;
