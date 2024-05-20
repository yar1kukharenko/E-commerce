import { render, fireEvent } from '@testing-library/react';
import Search from './Search';
import React from 'react';
import { vi } from 'vitest';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';
import styles from '../../ProductListPage.module.scss';

describe('Search component', () => {
  let productListStore: ProductListStore;

  beforeEach(() => {
    productListStore = {
      searchValue: '',
      setSearchValue: vi.fn(),
      handleSearch: vi.fn(),
    } as unknown as ProductListStore;
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Search productListStore={productListStore} />);

    const inputElement = getByPlaceholderText('Search product');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = getByText('Find Now');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls setSearchValue on input change', () => {
    const { getByPlaceholderText } = render(<Search productListStore={productListStore} />);

    const inputElement = getByPlaceholderText('Search product');
    fireEvent.change(inputElement, { target: { value: 'New search value' } });

    expect(productListStore.setSearchValue).toHaveBeenCalledWith('New search value');
  });

  it('calls handleSearch on button click', () => {
    const { getByText } = render(<Search productListStore={productListStore} />);

    const buttonElement = getByText('Find Now');
    fireEvent.click(buttonElement);

    expect(productListStore.handleSearch).toHaveBeenCalled();
  });
});
