import { useContext, useEffect, useState } from "react";
import { MdAddCircle, MdOutlineCancel, MdRemoveCircle } from 'react-icons/md';
import { ProductsContext } from "../../context/products";
import style from "./styles.module.scss";

export const Cart = () => {
  const { cart, clearCart, updateQuantityProduct, removeQuantityProduct } = useContext(ProductsContext);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, elem) => {
        return acc + elem.product.price * elem.quantity;
      }, 0)
    );
  }, [cart]);

  return (
    <aside className={style.cart}>
      <header>
        <h3>Carrinho de Compras</h3>
      </header>
      <div className={style.content}>
        {!cart.length ? (
          <div className={style.empty}>
            <h3>Sua sacola está vazia</h3>
            <p>Adicione itens</p>
          </div>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.product.id}>
                  <div className={style.item}>
                    <figure>
                      <img
                        src={`../../assets/images/${item.product.image}`}
                        alt={item.product.name}
                      />
                    </figure>
                    <div className={style.itemDetail}>
                      <h2>{item.product.name}</h2>
                      <p>{item.product.category}</p>
                      <p className={style.price}>
                        {item.product.priceFormatted}
                      </p>
                    </div>
                    <div className={style.quantity}>
                      {item.quantity === 1 ? (
                        <MdOutlineCancel className={style.cancel} size={24} onClick={() => removeQuantityProduct(item.product.id)} />
                      ) : (
                        <MdRemoveCircle className={style.cancel} size={24} onClick={() => removeQuantityProduct(item.product.id)} />
                      )}
                      <p>{item.quantity}</p>
                      <MdAddCircle size={24} onClick={() => updateQuantityProduct(item.product.id)} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <hr />
            <div className={style.total}>
              <p>Total</p>
              <p>
                {new Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </p>
            </div>
            <button onClick={clearCart}>Limpar carrinho</button>
          </>
        )}
      </div>
    </aside>
  );
};
