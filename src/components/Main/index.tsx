import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { Card } from '../Card';
import { Cart } from '../Cart';
import style from './styles.module.scss';

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  priceFormatted: string;
  price: number;
}

export const Main = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    api.get('products').then(response => {
      const parsedProduct = response.data.map((product: Product) => {
        return {
          id: product.id,
          image: product.image,
          name: product.name,
          category: product.category,
          price: product.price,
          priceFormatted: new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }).format(product.price)
        }
      });
      setProducts(parsedProduct);
    });
  }, []);

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
  )
}

