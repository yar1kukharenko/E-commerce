import classNames from 'classnames';
import * as React from 'react';

import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view = 'p-14', tag: Tag = 'p', color, weight, maxLines, children }) => {
  const maxLinesStyles = maxLines
    ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        '-webkit-box-orient': 'vertical',
      }
    : {};
  return (
    <Tag
      className={classNames(
        styles.text,
        styles[`text_color-${color}`],
        styles[`text_view-${view}`],
        styles[weight ? `text_weight-${weight}` : ''],
        className,
      )}
      style={maxLinesStyles}
    >
      {children}
    </Tag>
  );
};

export default Text;
