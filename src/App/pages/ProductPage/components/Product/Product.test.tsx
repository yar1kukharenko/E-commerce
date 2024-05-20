import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';
import { CONFIG } from '@config/config';

describe('Product component', () => {
  const defaultProps = {
    title: 'Test Product',
    image: ['test-image.jpg'],
    description: 'Test Description',
    price: '$100',
    actionSlotLeft: <button>Left Action</button>,
    actionSlotRight: <button>Right Action</button>,
  };

  it('renders correctly with given props', () => {
    render(<Product {...defaultProps} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Left Action')).toBeInTheDocument();
    expect(screen.getByText('Right Action')).toBeInTheDocument();
    expect(screen.getByAltText('Product')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('renders placeholder image when image src is null', () => {
    render(<Product {...defaultProps} image={null} />);

    expect(screen.getByAltText('Product')).toHaveAttribute('src', CONFIG.PLACEHOLDERIMAGE);
  });

  it('renders placeholder image on image error', () => {
    render(<Product {...defaultProps} />);

    const image = screen.getByAltText('Product');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', CONFIG.PLACEHOLDERIMAGE);
  });
});
