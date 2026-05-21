import { useContext, useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

import styles from "./CategoryList.module.css";
import { ProductsContext } from "../../../../context/ProductContext";
import Spinner from "../../../../shared/components/Spinner";

export default function CategoryList() {
  const { categories, loading } = useContext(ProductsContext);

  const [isOpen, setIsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  const wrapperRef = useRef(null);

  // -----------------------------
  // CATEGORY SELECT
  // -----------------------------
  function handleCategoryClick(category) {
    setSearchParams({ category });
    setIsOpen(false);
  }

  // -----------------------------
  // OUTSIDE CLICK CLOSE (useRef FIX)
  // -----------------------------
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // -----------------------------
  // LOADING
  // -----------------------------
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.categoryContainer} ref={wrapperRef}>
      {/* MENU BUTTON */}
      <div
        className={styles.wrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.menuSection}>
          <FiMenu className={styles.menuIcon} />
          <span>Kateqoriyalar</span>
          <span className={styles.badge}>Yeni</span>
        </div>
      </div>

      {/* DROPDOWN */}
      {isOpen && (
        <div className={styles.dropdown}>
          {categories.map((category) => (
            <div
              key={category}
              className={`${styles.dropdownItem} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY LIST */}
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <div
            key={category}
            className={`${styles.categoryItem} ${
              selectedCategory === category ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
