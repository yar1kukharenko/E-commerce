import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ArrowDownIcon from './ArrowDownIcon';
import React from 'react';

describe('ArrowDownIcon component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<ArrowDownIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute(
      'd',
      'M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z',
    );
  });

  it('passes additional props to Icon component', () => {
    const { container } = render(<ArrowDownIcon className="custom-class" data-testid="icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('data-testid', 'icon');
  });

  it('sets viewBox attribute correctly', () => {
    const { container } = render(<ArrowDownIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });
});
