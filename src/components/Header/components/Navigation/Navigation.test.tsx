import { render } from '@testing-library/react';
import Navigation from './Navigation';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import styles from './Navigation.module.scss';

describe('Navigation component', () => {
  it('renders correctly with default props', () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );
    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass(styles.nav);
    expect(navElement).not.toHaveClass(styles.nav_active);

    expect(getByText('Products')).toBeInTheDocument();
    expect(getByText('Categories')).toBeInTheDocument();
    expect(getByText('About us')).toBeInTheDocument();
    expect(getByText('Generate PDF')).toBeInTheDocument();
  });

  it('applies active class when isOpen is true', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation isOpen />
      </MemoryRouter>,
    );
    const navElement = container.querySelector('nav');
    expect(navElement).toHaveClass(styles.nav_active);
  });

  it('contains correct links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );

    expect(getByText('Products').closest('a')).toHaveAttribute('href', '/');
    expect(getByText('Categories').closest('a')).toHaveAttribute('href', '/categories');
    expect(getByText('About us').closest('a')).toHaveAttribute('href', '/aboutus');
    expect(getByText('Generate PDF').closest('a')).toHaveAttribute('href', '/generatepdf');
  });
});
