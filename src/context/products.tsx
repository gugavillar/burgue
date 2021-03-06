import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../api/api';
interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  addProductsToCart: (product: Product) => void;
  updateQuantityProduct: (id: number) => void;
  removeQuantityProduct: (id: number) => void;
  searchProducts: (search: string) => void;
  clearCart: () => void;
  cart: ProductCart[];
  products: Product[];
  productsSearch: Product[];
  result: string;
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
  tags: string[];
}

export const ProductsContext = createContext({} as ProductsContextData);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [cart, setCart] = useState<ProductCart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsSearch, setProductsSearch] = useState<Product[]>([]);
  const [result, setResult] = useState('');
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
          }).format(product.price),
          tags: product.tags
        };
      });
      setProducts(parsedProduct);
      setProductsSearch(parsedProduct);
    });
  }, []);

  function addProductsToCart(product: Product) {
    const updateCart = [...cart];
    const indexProduct = updateCart.findIndex(item => product.id === item.product.id);

    if (indexProduct >= 0) {
      return;
    } else {
      const newProduct = { product: product, quantity: 1 };
      toast.success(`${product.name} adicionado ao carrinho`);
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
      toast.success(`${updateProduct[indexProduct].product.name} removido do carrinho`);
    } else {
      updateProduct[indexProduct].quantity--;
      setCart(updateProduct);
    }
  }

  function searchProducts(search: string) {
    const newProducts = products.filter(product => product.tags.includes(search));
    if (search.trim() === '') {
      setResult('');
      setProductsSearch([]);
      setProducts(products);
    } else if (newProducts.length) {
      setResult(search);
      setProductsSearch(newProducts);
    }
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <ProductsContext.Provider value={{ addProductsToCart, updateQuantityProduct, removeQuantityProduct, clearCart, searchProducts, cart, products, productsSearch, result }}>
      {children}
    </ProductsContext.Provider>
  );
};