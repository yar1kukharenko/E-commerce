import classNames from 'classnames';
import React from 'react';

import styles from '@components/MultiDropdown/MultiDropdown.module.scss';
import Text from '@components/Text';

export type OptionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  key: string;
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
};
const OptionItem: React.FC<OptionProps> = ({ key, className, children, onClick }) => (
  <button onClick={onClick} type="button" key={key} className={classNames(styles.dropdown__option, className)}>
    <Text view="p-16">{children}</Text>
  </button>
);

export default OptionItem;
