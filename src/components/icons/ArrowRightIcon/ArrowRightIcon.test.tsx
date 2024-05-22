import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ArrowRightIcon from './ArrowRightIcon';
import React from 'react';

describe('ArrowRightIcon component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<ArrowRightIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute(
      'd',
      'M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994',
    );
    expect(path).toHaveAttribute('stroke', '#AFADB5');
    expect(path).toHaveAttribute('stroke-width', '1.5');
    expect(path).toHaveAttribute('stroke-miterlimit', '10');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('passes additional props to Icon component', () => {
    const { container } = render(<ArrowRightIcon className="custom-class" data-testid="icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('data-testid', 'icon');
  });

  it('sets viewBox attribute correctly', () => {
    const { container } = render(<ArrowRightIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 32 32');
  });
});
