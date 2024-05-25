import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import BagIcon from './BagIcon';
import React from 'react';
import rootStore from '@store/RootStore';

import styles from './BagIcon.module.scss';
import { RootStoreProvider } from '../../../context/RootStoreContext';
import { runInAction } from 'mobx';

vi.mock('@store/RootStore', () => ({
  __esModule: true,
  default: {
    cart: {
      uniqueProductCount: 0,
    },
  },
}));

describe('BagIcon component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <RootStoreProvider>
        <BagIcon />
      </RootStoreProvider>,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('displays the correct product count when cart has products', () => {
    runInAction(() => {
      // @ts-ignore
      rootStore.cart.uniqueProductCount = 5;
    });
    const { getByText } = render(
      <RootStoreProvider>
        <BagIcon />
      </RootStoreProvider>,
    );
    expect(getByText('5')).toBeInTheDocument();
  });
});
