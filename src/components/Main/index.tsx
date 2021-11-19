import { useContext } from 'react';
import { ProductsContext } from '../../context/products';
import { Card } from '../Card';
import { Cart } from '../Cart';
import style from './styles.module.scss';

export const Main = () => {
  const { products, productsSearch } = useContext(ProductsContext);
  return (
    <main className={style.container}>
      <div className={style.products}>
        {productsSearch.length ? (productsSearch.map(product => (
          <Card key={product.id} item={product} />
        ))
        ) : (
          products.map(product => (
            <Card key={product.id} item={product} />
          ))
        )}
      </div>
      <div className={style.cart}>
        <Cart />
      </div>
    </main>
  );
};

