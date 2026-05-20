import CategoryList from "../../components/CategoryList";
import ProductCard from "../../../../shared/components/ProductCard";
import styles from "./Home.module.css";

export default function Home() {
  // Hələlik context qurulana qədər ekranda çoxlu kart görmək üçün müvəqqəti 8 elementlik siyahı
  const mockProducts = Array(8).fill(null);

  return (
    <div className={styles.homeWrapper}>
      <CategoryList />

      {/* Slayder hissəsini növbəti addımda dolduracağıq, birbaşa məhsullara keçirik */}
      <h2 className={styles.sectionTitle}>Sizin İçin Seçtiklerimiz</h2>

      {/* Strukturuna tam uyğun Responsive Grid */}
      <div className={styles.productGrid}>
        {mockProducts.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
