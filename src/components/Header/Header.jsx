import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import LogoIcon from '../icons/LogoIcon.jsx';


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/"><LogoIcon /></Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/catalog" className={styles.link}>Catalog</Link>
      </nav>
    </header>
  );
};

export default Header;