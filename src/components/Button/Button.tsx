import classNames from 'classnames';
import * as React from 'react';

import Loader from '@components/Loader';
import Text from '@components/Text';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};
const Button: React.FC<ButtonProps> = ({ className, loading, children, ...props }) => (
  <button
    type="button"
    {...props}
    className={classNames(styles.button, props.disabled && styles.button_disabled, className)}
    disabled={props.disabled || loading}
  >
    {loading && <Loader className={styles.button__loader} size="s" />}
    <Text className={styles.button__text} tag="span" view="button">
      {children}
    </Text>
  </button>
);

export default Button;
