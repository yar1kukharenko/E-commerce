import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CheckIcon from './CheckIcon';
import React from 'react';

describe('CheckIcon component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', 'M4 11.6129L9.87755 18L20 7');
    expect(path).toHaveAttribute('stroke', 'currentColor');
    expect(path).toHaveAttribute('stroke-width', '2');
  });

  it('passes additional props to Icon component', () => {
    const { container } = render(<CheckIcon className="custom-class" data-testid="icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('data-testid', 'icon');
  });

  it('sets viewBox attribute correctly', () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });
});
