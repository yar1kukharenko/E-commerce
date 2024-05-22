import { render, fireEvent } from '@testing-library/react';
import CartList from './CartList';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CONFIG } from '@config/config';
import rootStore from '@store/RootStore';
import { vi } from 'vitest';

vi.mock('@store/RootStore', () => ({
  __esModule: true,
  default: {
    cart: {
      cartItems: new Map([
        [{ id: '1', title: 'Product 1', image: ['image1.jpg'], formattedPrice: '$10.00' }, 1],
        [{ id: '2', title: 'Product 2', image: [], formattedPrice: '$20.00' }, 1],
      ]),
      removeProduct: vi.fn(),
    },
  },
}));

describe('CartList component', () => {
  it('renders correctly with products', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <CartList />
      </MemoryRouter>,
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('$10.00')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('$20.00')).toBeInTheDocument();

    const images = getAllByAltText('Product');
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).toHaveAttribute('src', CONFIG.PLACEHOLDERIMAGE);
  });

  it('handles image error and sets placeholder image', () => {
    const { getAllByAltText } = render(
      <MemoryRouter>
        <CartList />
      </MemoryRouter>,
    );

    const images = getAllByAltText('Product');
    fireEvent.error(images[0]);
    expect(images[0]).toHaveAttribute('src', CONFIG.PLACEHOLDERIMAGE);
  });

  it('calls removeProduct when delete button is clicked', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <CartList />
      </MemoryRouter>,
    );

    const deleteButtons = getAllByText('Удалить');
    fireEvent.click(deleteButtons[0]);
    expect(rootStore.cart.removeProduct).toHaveBeenCalledTimes(1);
    expect(rootStore.cart.removeProduct).toHaveBeenCalledWith({
      id: '1',
      title: 'Product 1',
      image: ['image1.jpg'],
      formattedPrice: '$10.00',
    });
  });
});
