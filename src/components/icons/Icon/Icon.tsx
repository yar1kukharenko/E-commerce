import classNames from 'classnames';
import * as React from 'react';

import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};
const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = 24,
  height = 24,
  ...props
}) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    width={width}
    height={height}
    {...props}
    className={classNames(styles.icon, color && `styles.icon_color_${color}`, className)}
  >
    {children}
  </svg>
);

export default Icon;
