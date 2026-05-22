import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { ProductsContext } from "../../../context/ProductContext";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    title,
    brand,
    price,
    discountPercentage = 0,
    rating,
    thumbnail,
  } = product;

  const { favorites, toggleFavorite } = useContext(ProductsContext);

  const isFavorite = favorites.some((item) => item.id === product.id);
  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : price;

  const addToFavorites = (e) => {
    e.stopPropagation();

    toggleFavorite(product);
  };

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Sevimlilərə əlavə et düyməsi */}
      <button className={styles.favoriteBtn} onClick={addToFavorites}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isFavorite ? "red" : "none"}
          stroke={isFavorite ? "red" : "currentColor"}
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
