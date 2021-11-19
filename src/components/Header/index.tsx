import { useContext, useState } from 'react';
import { ProductsContext } from '../../context/products';
import styles from './styles.module.scss';

export const Header = () => {
  const { searchProducts } = useContext(ProductsContext);
  const [search, setSearch] = useState('');
  function handleSearchProducts(search: string) {
    if (search.trim() === '') {
      searchProducts(search);
    }
  }
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1>Burgue</h1>
        <div>
          <input type="text" placeholder="Digitar pesquisa" value={search} onChange={event => setSearch(event.target.value)} onKeyUp={event => handleSearchProducts(search)} />
          <button onClick={() => searchProducts(search)}>Pesquisar</button>
        </div>
      </div>
    </header>
  );
};