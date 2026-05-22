// src/shared/components/CategoryList/CategoryList.jsx
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductsContext } from "../../../../context/ProductContext";
import styles from "./CategoryList.module.css";

const CAT_META = {
  beauty:          { emoji: "💄", color: "#ff6b9d" },
  fragrances:      { emoji: "🌸", color: "#a855f7" },
  furniture:       { emoji: "🛋️", color: "#f59e0b" },
  groceries:       { emoji: "🥦", color: "#22c55e" },
  smartphones:     { emoji: "📱", color: "#3b82f6" },
  laptops:         { emoji: "💻", color: "#6366f1" },
  "mens-shirts":   { emoji: "👔", color: "#0ea5e9" },
  "womens-bags":   { emoji: "👜", color: "#ec4899" },
  sunglasses:      { emoji: "🕶️", color: "#f97316" },
  watches:         { emoji: "⌚", color: "#78716c" },
};

export default function CategoryList() {
  const { categories } = useContext(ProductsContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const active = searchParams.get("category") || "";

  // Always navigates to Home — works from ANY page
  function go(cat) {
    navigate(cat ? `/?category=${cat}` : "/");
  }

  return (
    <nav className={styles.bar}>
      <button
        className={`${styles.item} ${!active ? styles.active : ""}`}
        onClick={() => go("")}
      >
        <span className={styles.emoji}>🏠</span>
        <span className={styles.label}>All</span>
        {!active && <span className={styles.underline} style={{ background: "#ff6b35" }} />}
      </button>

      {categories.map((cat) => {
        const meta = CAT_META[cat] || { emoji: "📦", color: "#ff6b35" };
        const isActive = active === cat;
        return (
          <button
            key={cat}
            className={`${styles.item} ${isActive ? styles.active : ""}`}
            onClick={() => go(cat)}
          >
            <span className={styles.emoji}>{meta.emoji}</span>
            <span className={styles.label}>{cat.replace(/-/g, " ")}</span>
            {isActive && (
              <span className={styles.underline} style={{ background: meta.color }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// import { useContext, useState, useRef, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { FiMenu } from "react-icons/fi";

// import styles from "./CategoryList.module.css";
// import { ProductsContext } from "../../../../context/ProductContext";
// import Spinner from "../../../../shared/components/Spinner";

// export default function CategoryList() {
//   const { categories, loading } = useContext(ProductsContext);

//   const [isOpen, setIsOpen] = useState(false);

//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedCategory = searchParams.get("category") || "";

//   const wrapperRef = useRef(null);

//   // -----------------------------
//   // CATEGORY SELECT
//   // -----------------------------
//   function handleCategoryClick(category) {
//     setSearchParams({ category });
//     setIsOpen(false);
//   }

//   // -----------------------------
//   // OUTSIDE CLICK CLOSE (useRef FIX)
//   // -----------------------------
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // -----------------------------
//   // LOADING
//   // -----------------------------
//   if (loading) {
//     return <Spinner />;
//   }

//   return (
//     <div className={styles.categoryContainer} ref={wrapperRef}>
//       {/* MENU BUTTON */}
//       <div
//         className={styles.wrapper}
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         <div className={styles.menuSection}>
//           <FiMenu className={styles.menuIcon} />
//           <span>Kateqoriyalar</span>
//           <span className={styles.badge}>Yeni</span>
//         </div>
//       </div>

//       {/* DROPDOWN */}
//       {isOpen && (
//         <div className={styles.dropdown}>
//           {categories.map((category) => (
//             <div
//               key={category}
//               className={`${styles.dropdownItem} ${
//                 selectedCategory === category ? styles.active : ""
//               }`}
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* CATEGORY LIST */}
//       <div className={styles.categoryList}>
//         {categories.map((category) => (
//           <div
//             key={category}
//             className={`${styles.categoryItem} ${
//               selectedCategory === category ? styles.active : ""
//             }`}
//             onClick={() => handleCategoryClick(category)}
//           >
//             {category}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
