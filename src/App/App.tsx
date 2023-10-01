import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit';

import { DropdownStoreProvider } from '../context/DropdownStoreContext';

import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage/ProductPage';

import '@styles/globalStyles.module.scss';

const App = () => {
  useQueryParamsStoreInit();
  return (
    <DropdownStoreProvider>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
        </Route>
      </Routes>
    </DropdownStoreProvider>
  );
};

export default App;
