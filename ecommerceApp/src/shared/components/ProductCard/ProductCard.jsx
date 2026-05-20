import { FiHeart } from 'react-icons/fi';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  // Səhifə qırılmasın deyə default dummy data təyin edirik
  const item = product || {
    brand: "Trendyol Collection",
    title: "Oversize Örme Antrasit Bisiklet Yaka Tişört %100 Pamuklu Premium",
    price: 279.99,
    oldPrice: 429.99,
    image: "https://picsum.photos/id/24/300/400"
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageSection}>
        <img src={item.image} alt={item.title} />
        <button className={styles.favButton}>
          <FiHeart size={18} />
        </button>
      </div>

      <div className={styles.infoSection}>
        <div>
          <span className={styles.brand}>{item.brand}</span>{' '}
          <span className={styles.title}>{item.title}</span>
        </div>
        
        <div className={styles.priceContainer}>
          {item.oldPrice && <span className={styles.oldPrice}>{item.oldPrice} TL</span>}
          <span className={styles.currentPrice}>{item.price} TL</span>
        </div>
      </div>

      <button className={styles.addButton}>Sepete Ekle</button>
    </div>
  );
}