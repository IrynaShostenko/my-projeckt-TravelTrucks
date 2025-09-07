import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <Link to="/catalog">
          <button className={styles.viewNowButton}>View Now</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;