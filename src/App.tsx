import { Header } from './components/Header';
import { Main } from './components/Main';
import { ProductsProvider } from './context/products';

function App() {
  return (
    <ProductsProvider>
      <Header />
      <Main />
    </ProductsProvider>
  );
}

export default App;
