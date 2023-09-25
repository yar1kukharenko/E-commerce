import * as React from 'react';
import { Route, Routes } from 'react-router-dom'; // import ProductListPage from './pages/ProductListPage';

import { useQueryParamsStoreInit } from '../store/RootStore/hooks/useQueryParamsStoreInit';

import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage/ProductPage';

const App = () => {
  useQueryParamsStoreInit();
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/product">
        <Route path=":id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
