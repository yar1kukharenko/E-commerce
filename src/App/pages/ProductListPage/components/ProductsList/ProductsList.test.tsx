import { render, fireEvent, waitFor } from '@testing-library/react';
import ProductsList from './ProductsList';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';
import rootStore from '@store/RootStore';
import styles from '../../ProductListPage.module.scss';

// Мокирование rootStore
vi.mock('@store/RootStore', () => ({
  __esModule: true,
  default: {
    cart: {
      idArray: [],
      addProduct: vi.fn(),
    },
  },
}));

// Мокирование react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ProductsList component', () => {
  let productListStore: ProductListStore;

  beforeEach(() => {
    productListStore = {
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
      getRequestState: { isLoading: false },
      isError: false,
      isNothingFound: false,
      isEndOfProducts: false,
    } as unknown as ProductListStore;
  });

  it('handles add to cart correctly', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <ProductsList productListStore={productListStore} />
      </MemoryRouter>,
    );

    const addButtons = getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]);
    expect(rootStore.cart.addProduct).toHaveBeenCalledWith(productListStore.products[0]);
  });

  it('shows loader when loading', () => {
    productListStore.getRequestState.isLoading = true;
    const { container } = render(
      <MemoryRouter>
        <ProductsList productListStore={productListStore} />
      </MemoryRouter>,
    );

    expect(container.querySelector(`.${styles.loader_wrapper}`)).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    productListStore.isError = true;
    const { getByText } = render(
      <MemoryRouter>
        <ProductsList productListStore={productListStore} />
      </MemoryRouter>,
    );

    expect(getByText('Произошла ошибка при загрузке продуктов.')).toBeInTheDocument();
  });

  it('shows no results message when nothing is found', () => {
    productListStore.isNothingFound = true;
    const { getByText } = render(
      <MemoryRouter>
        <ProductsList productListStore={productListStore} />
      </MemoryRouter>,
    );

    expect(getByText('Ничего не найдено.')).toBeInTheDocument();
  });

  it('shows end of products message when end is reached', () => {
    productListStore.isEndOfProducts = true;
    const { getByText } = render(
      <MemoryRouter>
        <ProductsList productListStore={productListStore} />
      </MemoryRouter>,
    );

    expect(getByText('Вы достигли конца списка продуктов.')).toBeInTheDocument();
  });
});
