import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Text from './Text';
import React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

describe('Text component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Text>Default Text</Text>);
    const p = container.querySelector('p');
    expect(p).toBeInTheDocument();
    expect(p).toHaveClass(styles.text);
    expect(p).toHaveClass(styles['text_view-p-14']);
  });

  it('applies custom className', () => {
    const { container } = render(<Text className="custom-class">Text with custom class</Text>);
    const p = container.querySelector('p');
    expect(p).toHaveClass('custom-class');
  });

  it('renders with different tag', () => {
    const { container } = render(<Text tag="h1">Heading Text</Text>);
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveClass(styles.text);
  });

  it('applies view class', () => {
    const { container } = render(<Text view="title">Title Text</Text>);
    const p = container.querySelector('p');
    expect(p).toHaveClass(styles['text_view-title']);
  });

  it('applies weight class', () => {
    const { container } = render(<Text weight="bold">Bold Text</Text>);
    const p = container.querySelector('p');
    expect(p).toHaveClass(styles['text_weight-bold']);
  });

  it('applies color class', () => {
    const { container } = render(<Text color="primary">Primary Text</Text>);
    const p = container.querySelector('p');
    expect(p).toHaveClass(styles['text_color-primary']);
  });

  it('applies maxLines styles', () => {
    const { container } = render(<Text maxLines={3}>Text with max lines</Text>);
    const p = container.querySelector('p');
    const computedStyle = getComputedStyle(p as HTMLParagraphElement);
    expect(computedStyle.overflow).toBe('hidden');
    expect(computedStyle.textOverflow).toBe('ellipsis');
    expect(computedStyle.display).toBe('-webkit-box');
    expect(computedStyle.getPropertyValue('overflow')).toBe('hidden');
    expect(computedStyle.getPropertyValue('text-overflow')).toBe('ellipsis');
    expect(computedStyle.getPropertyValue('display')).toBe('-webkit-box');
    expect(computedStyle.getPropertyValue('-webkit-line-clamp')).toBe('3');
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Text>Child Text</Text>);
    expect(getByText('Child Text')).toBeInTheDocument();
  });
});
