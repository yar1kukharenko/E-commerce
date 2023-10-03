import { useLocalObservable } from 'mobx-react-lite';

import * as React from 'react';

import { CartStore } from '@store/CartStore/CartStore';

const CartStoreContext = React.createContext<CartStore | null>(null);

type Props = {
  children: React.ReactNode;
};

export const CartStoreProvider: React.FC<Props> = ({ children }) => {
  const cartStore = useLocalObservable(() => new CartStore());
  return <CartStoreContext.Provider value={cartStore}>{children}</CartStoreContext.Provider>;
};

export default CartStoreContext;
