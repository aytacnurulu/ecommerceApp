import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import styles from "./CategoryList.module.css";

export default function CategoryList() {
  const [showMenu, setShowMenu] = useState(false);

  const categories = [
    "Qadın",
    "Kişi",
    "Ana & Uşaq",
    "Ev & Yaşayış",
    "Supermarket",
    "Kosmetika",
    "Ayaqqabı & Çanta",
    "Elektronika",
    "Oyuncaqlar",
    "Çox Satılanlar",
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* Sol Menu */}
        <div
          className={styles.menuSection}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className={styles.menuButton}>
            <FiMenu />
            <span>Kateqoriyalar</span>
          </div>

          {showMenu && (
            <div className={styles.dropdown}>
              {categories.map((item, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Horizontal Categories */}
        <div className={styles.categoryNav}>
          {categories.map((item, index) => (
            <div
              key={index}
              className={styles.categoryItem}
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}