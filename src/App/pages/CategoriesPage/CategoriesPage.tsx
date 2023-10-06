import * as React from 'react';

import Header from '@components/Header';
import TextBlock from '@components/TextBlock';

import CategoriesList from './components/CategoriesList';

const CategoriesPage = () => (
  <>
    <Header />
    <div className="container">
      <TextBlock title="Categories" subtitle="We present the categories according to the new products in our range." />
      <CategoriesList />
    </div>
  </>
);

export default CategoriesPage;
