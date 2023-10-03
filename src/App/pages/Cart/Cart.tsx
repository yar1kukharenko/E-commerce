import { observer } from 'mobx-react-lite';

import * as React from 'react';

import Header from '@components/Header';

import CartList from './components/CartList';

const Cart = () => (
  <>
    <Header />
    <div className="container">
      <CartList />
    </div>
  </>
);

export default observer(Cart);
