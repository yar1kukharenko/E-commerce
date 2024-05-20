import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Icon from './Icon';
import React from 'react';
import styles from './Icon.module.scss';

describe('Icon component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveClass(styles.icon);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<Icon className={customClass} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(customClass);
  });

  it('sets width and height correctly', () => {
    const { container } = render(<Icon width={48} height={48} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('applies color class correctly', () => {
    const { container } = render(<Icon color="primary" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass(`styles.icon_color_primary`);
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <Icon>
        <path data-testid="child" />
      </Icon>,
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });
});
