// src/shared/components/Header/Header.jsx
import { useContext } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductContext";
import styles from "./Header.module.css";

export default function Header() {
  const { favorites, cartItems } = useContext(ProductsContext);
  const navigate = useNavigate();

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        {/* Logo — clicking always goes to Home */}
        <div className={styles.logo} onClick={() => navigate("/")}>
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

        {/* Actions */}
        <div className={styles.actions}>
          <div
            className={styles.actionButton}
            onClick={() => navigate("/profile")}
          >
            <FiUser />
            <span>Account</span>
          </div>

          <div
            className={styles.actionButton}
            onClick={() => navigate("/favorites")}
          >
            <FiHeart />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </div>

          <div
            className={styles.actionButton}
            onClick={() => navigate("/cart")}
          >
            <FiShoppingCart />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className={styles.badge}>{cartItems.length}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// import {
//   FiSearch,
//   FiHeart,
//   FiShoppingCart,
//   FiUser,
// } from "react-icons/fi";
// import styles from "./Header.module.css";
// import {useNavigate} from "react-router-dom";
// export default function Header() {
//   const favoriteCount = 2;
//   const cartCount = 3;
//   const navigate = useNavigate();

//   return (
//     <header className={styles.headerWrapper}>
//       <div className={styles.headerContainer}>

//         {/* Logo */}
//         <div className={styles.logo}>
//           Trendyol
//         </div>

//         {/* Search */}
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             placeholder="Məhsul, kateqoriya və ya brend axtar"
//             className={styles.searchInput}
//           />

//           <FiSearch className={styles.searchIcon} />
//         </div>

//         {/* Right Side */}
//         <div className={styles.actions}>

//           <div className={styles.actionButton} onClick={() => navigate("/profile")}>
//             <FiUser />
//             <span>Account</span>
//           </div>

//           <div className={styles.actionButton} onClick={() => navigate("/favorites")}>
//             <FiHeart />
//             <span>Favorites</span>

//             {favoriteCount > 0 && (
//               <span className={styles.badge}>
//                 {favoriteCount}
//               </span>
//             )}
//           </div>

//           <div className={styles.actionButton} onClick={() => navigate("/cart")}>
//             <FiShoppingCart />
//             <span>Cart</span>

//             {cartCount > 0 && (
//               <span className={styles.badge}>
//                 {cartCount}
//               </span>
//             )}
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// }
