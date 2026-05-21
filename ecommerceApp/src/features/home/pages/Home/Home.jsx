import CategoryList from "../../components/CategoryList";
import ProductCard from "../../../../shared/components/ProductCard";
import styles from "./Home.module.css";
import { ProductsContext } from "../../../../context/ProductContext";
import { useContext } from "react";

export default function Home() {
  const { products } = useContext(ProductsContext) || {}; // Əgər context boşdursa, crash olmasın

  // products yüklənənə qədər loading göstərmək və ya boş massiv mənimsətmək üçün:
  const productList = products || [];

  return (
    <div className={styles.homeWrapper}>
      <CategoryList />

      <h2 className={styles.sectionTitle}>Sizin İçin Seçtiklerimiz</h2>

      <div className={styles.productGrid}>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
