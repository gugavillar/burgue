import { useContext } from "react";
import { ProductsContext } from "../../context/products";
import style from "./styles.module.scss";

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  priceFormatted: string;
  price: number;
}

interface CardProps {
  item: Product;
}

export const Card = ({ item }: CardProps) => {
  const { addProductsToCart } = useContext(ProductsContext);
  return (
    <>
      <section className={style.contentCard}>
        <div className={style.card}>
          <figure>
            <img src={`../../assets/images/${item.image}`} alt={item.name} />
          </figure>
          <div className={style.content}>
            <h2>{item.name}</h2>
            <p>{item.category}</p>
            <span>{item.priceFormatted}</span>
          </div>
          <button onClick={() => addProductsToCart(item)}>Adicionar</button>
        </div>
      </section>
    </>
  );
};
