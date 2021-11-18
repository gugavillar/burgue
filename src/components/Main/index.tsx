import { useContext } from 'react';
import { ProductsContext } from '../../context/products';
import { Card } from '../Card';
import { Cart } from '../Cart';
import style from './styles.module.scss';

export const Main = () => {
  const { products } = useContext(ProductsContext);
  return (
    <main className={style.container}>
      <div className={style.products}>
        {products.map(product => (
          <Card key={product.id} item={product} />
        ))}
      </div>
      <div className={style.cart}>
        <Cart />
      </div>
    </main>
  );
};

