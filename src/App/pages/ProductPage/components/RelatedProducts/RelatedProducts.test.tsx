import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { RelatedProducts } from './RelatedProducts';
import { RelatedProductsStore } from '@store/RelatedProductsStore/RelatedProductsStore';
import rootStore from '@store/RootStore';

vi.mock('@store/RelatedProductsStore/RelatedProductsStore', () => {
  return {
    RelatedProductsStore: vi.fn().mockImplementation((category) => {
      return {
        category,
        products: [
          {
            id: '1',
            title: 'Product 1',
            image: 'image1.jpg',
            category: { name: 'Category 1' },
            description: 'Description 1',
            formattedPrice: '$10.00',
          },
          {
            id: '2',
            title: 'Product 2',
            image: 'image2.jpg',
            category: { name: 'Category 2' },
            description: 'Description 2',
            formattedPrice: '$20.00',
          },
        ],
        fetchProducts: vi.fn(),
      };
    }),
  };
});

vi.mock('@store/RootStore', () => ({
  __esModule: true,
  default: {
    cart: {
      idArray: [],
      addProduct: vi.fn(),
    },
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('RelatedProducts component', () => {
  it('renders related products correctly', () => {
    render(
      <MemoryRouter>
        <RelatedProducts category={1} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Related Items')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('adds product to cart correctly', () => {
    render(
      <MemoryRouter>
        <RelatedProducts category={1} />
      </MemoryRouter>,
    );

    const addButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]);
    expect(rootStore.cart.addProduct).toHaveBeenCalledWith({
      id: '1',
      title: 'Product 1',
      image: 'image1.jpg',
      category: { name: 'Category 1' },
      description: 'Description 1',
      formattedPrice: '$10.00',
    });
  });
});
