import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import styles from './Header.module.scss';

describe('Header component', () => {
  it('renders correctly', () => {
    const { container, getByAltText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const headerElement = container.querySelector(`.${styles.header}`);
    expect(headerElement).toBeInTheDocument();

    const logoElement = getByAltText('Short Logo');
    expect(logoElement).toBeInTheDocument();

    const bagIcon = container.querySelector('a[href="/basket"]');
    expect(bagIcon).toBeInTheDocument();

    const menuIcon = container.querySelector(`.${styles.menuIcon}`);
    expect(menuIcon).toBeInTheDocument();
  });

  it('contains correct links', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logoLink = container.querySelector('a[href="/"]');
    expect(logoLink).toBeInTheDocument();

    const bagIconLink = container.querySelector('a[href="/basket"]');
    expect(bagIconLink).toBeInTheDocument();
  });
});
