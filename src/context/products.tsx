import { createContext, ReactNode, useState } from 'react';

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  addProductsToCart: (product: Product) => void;
  updateQuantityProduct: (id: number) => void;
  removeQuantityProduct: (id: number) => void;
  clearCart: () => void;
  cart: ProductCart[];
}

interface ProductCart {
  product: Product;
  quantity: number;
}

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
}

export const ProductsContext = createContext({} as ProductsContextData);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [cart, setCart] = useState<ProductCart[]>([]);

  function addProductsToCart(product: Product) {
    const updateCart = [...cart];
    const indexProduct = updateCart.findIndex(item => product.id === item.product.id);

    if (indexProduct >= 0) {
      return;
    } else {
      const newProduct = { product: product, quantity: 1 };
      updateCart.push(newProduct);
    }
    setCart(updateCart);
  }

  function updateQuantityProduct(id: number) {
    const updateProduct = [...cart];
    const indexProduct = updateProduct.findIndex(item => id === item.product.id);

    updateProduct[indexProduct].quantity++;
    setCart(updateProduct);
  }

  function removeQuantityProduct(id: number) {
    const updateProduct = [...cart];
    const indexProduct = updateProduct.findIndex(item => id === item.product.id);

    if (updateProduct[indexProduct].quantity === 1) {
      const newCart = updateProduct.filter(item => item.product.id !== id);
      setCart(newCart);
    } else {
      updateProduct[indexProduct].quantity--;
      setCart(updateProduct);
    }

  }

  function clearCart() {
    setCart([]);
  }

  return (
    <ProductsContext.Provider value={{ addProductsToCart, updateQuantityProduct, removeQuantityProduct, clearCart, cart }}>
      {children}
    </ProductsContext.Provider>
  )
}