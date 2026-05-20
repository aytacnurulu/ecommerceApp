import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import styles from "./Header.module.css";

export default function Header() {
  const favoriteCount = 2;
  const cartCount = 3;

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        
        {/* Logo */}
        <div className={styles.logo}>
          Trendyol
        </div>

        {/* Search */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Məhsul, kateqoriya və ya brend axtar"
            className={styles.searchInput}
          />

          <FiSearch className={styles.searchIcon} />
        </div>

        {/* Right Side */}
        <div className={styles.actions}>
          
          <div className={styles.actionButton}>
            <FiUser />
            <span>Hesabım</span>
          </div>

          <div className={styles.actionButton}>
            <FiHeart />
            <span>Sevimlilərim</span>

            {favoriteCount > 0 && (
              <span className={styles.badge}>
                {favoriteCount}
              </span>
            )}
          </div>

          <div className={styles.actionButton}>
            <FiShoppingCart />
            <span>Səbətim</span>

            {cartCount > 0 && (
              <span className={styles.badge}>
                {cartCount}
              </span>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}