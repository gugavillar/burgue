import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1>Burguer</h1>
        <div>
          <input type="text" placeholder="Digitar pesquisa" />
          <button>Pesquisar</button>
        </div>
      </div>
    </header>
  );
};