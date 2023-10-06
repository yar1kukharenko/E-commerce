import { observer } from 'mobx-react-lite';

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Card from '@components/Card';
import Loader from '@components/Loader';
import Text from '@components/Text';
import { ProductListStore } from '@store/ProductListStore/ProductListStore';
import rootStore from '@store/RootStore';

import styles from '../../ProductListPage.module.scss';

type ProductsListProps = {
  productListStore: ProductListStore;
};

const ProductsList: React.FC<ProductsListProps> = ({ productListStore }) => {
  const navigate = useNavigate();
  const { cart } = rootStore;
  const { isLoading } = productListStore.getRequestState;

  return (
    <>
      <div className={styles.product_list}>
        {productListStore.products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            images={product.image}
            captionSlot={product.category.name}
            subtitle={product.description}
            contentSlot={`${product.formattedPrice}`}
            actionSlot={
              <Button
                disabled={cart.idArray.includes(product.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  cart.addProduct(product);
                }}
              >
                {cart.idArray.includes(product.id) ? 'In Cart' : 'Add to Cart'}
              </Button>
            }
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
      <div className={styles.loader_wrapper}> {isLoading && <Loader size="l" />} </div>
      <div className={styles.message}>
        {productListStore.isError && <Text>Произошла ошибка при загрузке продуктов.</Text>}
        {productListStore.isNothingFound && <Text>Ничего не найдено.</Text>}
        {productListStore.isEndOfProducts && !productListStore.isNothingFound && (
          <Text>Вы достигли конца списка продуктов.</Text>
        )}
      </div>
    </>
  );
};

export default observer(ProductsList);
