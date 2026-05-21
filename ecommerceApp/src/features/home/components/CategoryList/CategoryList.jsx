import { useState, useContext, useEffect } from "react";
import styles from "./CategoryList.module.css";
import axios from "axios";
import { FiMenu } from "react-icons/fi";
import { ProductsContext } from "../../../../context/ProductContext";
import Spinner from "../../../../shared/components/Spinner";

export default function CategoryList() {
  const {
    products,
    setProducts,
    loading: productLoading,
    setLoading,
  } = useContext(ProductsContext);

  const [activeCategory, setActiveCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get("https://dummyjson.com/products");

        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  if (productLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.wrapper}>
        <div className={styles.menuSection} onClick={() => setIsOpen(!isOpen)}>
          {console.log(isOpen)}
          <FiMenu className={styles.menuIcon} />

          <span>Kateqoriyalar</span>

          <span className={styles.badge}>Yeni</span>
        </div>

        {isOpen && (
          <div className={styles.dropdown}>
            {categories.map((category) => (
              <div
                key={category}
                className={styles.dropdownItem}
                onClick={() => {
                  setActiveCategory(category);
                  setIsOpen(false);
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.categoryList}>
        {categories.map((category) => (
          <div
            key={category}
            className={`${styles.categoryItem}
            ${activeCategory === category ? styles.active : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
