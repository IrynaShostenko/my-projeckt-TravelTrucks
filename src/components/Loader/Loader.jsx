import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderSpinner}></div>
      <p>Завантаження...</p>
    </div>
  );
};

export default Loader;