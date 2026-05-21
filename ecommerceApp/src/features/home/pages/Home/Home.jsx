import CategoryList from "../../components/CategoryList";
import ProductCard from "../../../../shared/components/ProductCard";
import styles from "./Home.module.css";

import { ProductsContext } from "../../../../context/ProductContext";
import { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  // 🔥 ALL HOOKS FIRST (IMPORTANT)
  const { products, categories, loading } = useContext(ProductsContext);

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  const productList = products || [];

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return productList;

    return productList.filter(
      (product) => product.category === selectedCategory
    );
  }, [productList, selectedCategory]);

  // 🔥 AFTER HOOKS -> conditions

  if (loading) {
    return <div className={styles.homeWrapper}>Loading...</div>;
  }

  return (
    <div className={styles.homeWrapper}>
      <CategoryList />

      <h2 className={styles.sectionTitle}>Sizin İçin Seçtiklerimiz</h2>

      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}