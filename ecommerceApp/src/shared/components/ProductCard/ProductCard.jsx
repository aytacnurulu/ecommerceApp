import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const {
    title,
    brand,
    price,
    discountPercentage = 0,
    rating,
    thumbnail,
  } = product;

  // Əgər API-dən gələn price son qiymətdirsə və discountPercentage varsa,
  // köhnə qiyməti (üstündən xətt çəkilmiş) hesablaya bilərik:
  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : price;

  return (
    <div className={styles.card}>
      {/* Sevimlilərə əlavə et düyməsi */}
      <button className={styles.favoriteBtn}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      {/* Məhsul Şəkli */}
      <div className={styles.imageContainer}>
        <img src={thumbnail} alt={title} className={styles.image} />
      </div>

      {/* Məhsul Məlumatları */}
      <div className={styles.details}>
        <h3 className={styles.title}>
          {brand && <span className={styles.brand}>{brand} </span>}
          {title}
        </h3>

        {/* Reytinq hissəsi */}
        <div className={styles.ratingRow}>
          <span className={styles.ratingScore}>{rating}</span>
          <div className={styles.stars}>
            {/* 5 ulduz simulyasiyası */}
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= Math.round(rating)
                    ? styles.starFilled
                    : styles.starEmpty
                }
              >
                ★
              </span>
            ))}
          </div>
          <span className={styles.reviewCount}>(26) 📷</span>
        </div>

        <div className={styles.extraTag}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.tagIcon}
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          əlavə endirim
        </div>

        {/* Qiymət hissəsi */}
        <div className={styles.priceContainer}>
          {discountPercentage > 0 && (
            <div className={styles.discountBadge}>
              -{Math.round(discountPercentage)}%
            </div>
          )}
          <div className={styles.currentPrice}>{price} ₼</div>
          {discountPercentage > 0 && (
            <div className={styles.originalPrice}>{originalPrice} ₼</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
