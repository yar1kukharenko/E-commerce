import { observer, useLocalStore } from 'mobx-react-lite';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@components/Card';
import { CategoriesStore } from '@store/CategoriesStore/CategoriesStore';

import styles from './Categories.module.scss';

const CategoriesList = () => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());
  React.useEffect(() => {
    categoriesStore.fetchCategories();
  }, [categoriesStore]);
  const navigate = useNavigate();
  return (
    <div className={styles.categories}>
      {categoriesStore.categories.map((category) => (
        <Card
          key={category.id}
          title={category.name}
          images={category.image}
          onClick={() => navigate(`/?categories=${category.id}`)}
        />
      ))}
    </div>
  );
};

export default observer(CategoriesList);
