import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit';

import { DropdownStoreProvider } from '../context/DropdownStoreContext';

import AboutUsPage from './pages/AboutUsPage';
import CategoriesPage from './pages/CategoriesPage';
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
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
      </Routes>
    </DropdownStoreProvider>
  );
};

export default App;
