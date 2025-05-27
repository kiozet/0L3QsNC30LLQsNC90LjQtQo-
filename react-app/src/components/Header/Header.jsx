import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../assets/navlogo.svg'

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext); // Получаем статус авторизации

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logolink}>
            <div className={styles.logo}>
                <Logo className={styles.logoSvg} />
            </div>
            <div className={styles.siteName}>Watercraft Detector</div>
        </Link>
        <nav className={styles.nav}>
          {location.pathname !== '/about' && (
            <Link to="/about" className={`${styles.navButton} ${styles.navLink}`}>
              О нас
            </Link>
          )}
          {location.pathname !== '/guide' && (
            <Link to="/guide" className={`${styles.navButton} ${styles.navLink}`}>
              Инструкция
            </Link>
          )}
          {isAuthenticated ? (
            location.pathname !== '/dashboard' && (
              <Link to="/dashboard" className={`${styles.navButton} ${styles.navLink}`}>
                Личный кабинет
              </Link>
            )
          ) : (
            location.pathname !== '/auth' && (
              <Link to="/auth" className={`${styles.navButton} ${styles.navLink}`}>
                Регистрация
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;