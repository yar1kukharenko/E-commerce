import * as React from 'react';

import CartStoreContext from '../context/CartContext';

export const useCartStore = () => {
  const store = React.useContext(CartStoreContext);
  if (!store) {
    throw new Error('useCartStore must be used within a CartStoreProvider');
  }
  return store;
};
