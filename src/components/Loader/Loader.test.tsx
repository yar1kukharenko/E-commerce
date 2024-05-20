import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from './Loader';
import React from 'react';
import styles from './Loader.module.scss';
import classNames from 'classnames';

describe('Loader component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Loader />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(styles.loader);
    expect(svg).toHaveClass(styles['loader-size-m']);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<Loader className={customClass} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(customClass);
  });

  it('renders correctly with size "s"', () => {
    const { container } = render(<Loader size="s" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(styles['loader-size-s']);
  });

  it('renders correctly with size "m"', () => {
    const { container } = render(<Loader size="m" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(styles['loader-size-m']);
  });

  it('renders correctly with size "l"', () => {
    const { container } = render(<Loader size="l" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(styles['loader-size-l']);
  });
});
