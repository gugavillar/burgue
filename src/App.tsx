import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { ProductsProvider } from './context/products';

function App() {
  return (
    <ProductsProvider>
      <Header />
      <Main />
      <ToastContainer />
    </ProductsProvider>
  );
}

export default App;
