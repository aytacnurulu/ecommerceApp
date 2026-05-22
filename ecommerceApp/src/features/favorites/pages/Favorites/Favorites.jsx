import { useContext } from "react";
import { ProductsContext } from "../../../../context/ProductContext";
import ProductCard from "../../../../shared/components/ProductCard";
import styles from "./Favorites.module.css";

// ─── Sub-components (ready to extract) ────────────────────────────────────────

function FavoritesHeader({ count, onClearAll }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.heartIcon}>♥</div>
        <div>
          <h1 className={styles.title}>My Wishlist</h1>
          <p className={styles.subtitle}>
            {count} {count === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>
      {count > 0 && (
        <button className={styles.clearBtn} onClick={onClearAll}>
          Clear all
        </button>
      )}
    </div>
  );
}

function FavoritesStats({ count, totalValue, avgDiscount }) {
  return (
    <div className={styles.statsRow}>
      <div className={styles.statCard}>
        <span className={styles.statNum}>{count}</span>
        <span className={styles.statLabel}>Saved Items</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statCard}>
        <span className={styles.statNum}>${totalValue}</span>
        <span className={styles.statLabel}>Total Value</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statCard}>
        <span className={styles.statNum}>{avgDiscount}%</span>
        <span className={styles.statLabel}>Avg. Discount</span>
      </div>
    </div>
  );
}

function FavoritesEmpty() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyHeart}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
      <p className={styles.emptyText}>
        Save items you love by tapping the heart icon on any product.
      </p>
      <a href="/shop" className={styles.emptyBtn}>
        Discover Products
      </a>
      <div className={styles.emptyHints}>
        <span className={styles.emptyHint}>💡 Tip: Wishlisted items are saved to your device</span>
      </div>
    </div>
  );
}

function FavoritesToolbar({ sortBy, setSortBy, view, setView }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.sortGroup}>
        <span className={styles.sortLabel}>Sort by</span>
        <select
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Date Added</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="discount">Best Discount</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewBtn} ${view === "grid" ? styles.viewActive : ""}`}
          onClick={() => setView("grid")}
          title="Grid view"
        >
          ⊞
        </button>
        <button
          className={`${styles.viewBtn} ${view === "list" ? styles.viewActive : ""}`}
          onClick={() => setView("list")}
          title="List view"
        >
          ☰
        </button>
      </div>
    </div>
  );
}

function FavoriteListItem({ product, onRemove, onAddToCart, inCart }) {
  const { toggleFavorite } = useContext(ProductsContext);
  const discounted = (
    product.price * (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);
  const saved = (product.price - parseFloat(discounted)).toFixed(2);

  return (
    <div className={styles.listItem}>
      <a href={`/product/${product.id}`} className={styles.listImageWrap}>
        <img src={product.thumbnail} alt={product.title} className={styles.listImage} />
        {product.discountPercentage > 0 && (
          <span className={styles.listBadge}>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </a>
      <div className={styles.listInfo}>
        <div className={styles.listBrand}>{product.brand || "Brand"}</div>
        <a href={`/product/${product.id}`} className={styles.listTitle}>
          {product.title}
        </a>
        <div className={styles.listMeta}>
          <span className={styles.listCategory}>🏷️ {product.category}</span>
          <span className={styles.listRating}>★ {product.rating?.toFixed(1)}</span>
          {product.availabilityStatus === "In Stock" && (
            <span className={styles.listStock}>● In Stock</span>
          )}
        </div>
      </div>
      <div className={styles.listRight}>
        <div className={styles.listPriceBlock}>
          <span className={styles.listPrice}>${discounted}</span>
          {product.discountPercentage > 0 && (
            <>
              <span className={styles.listOriginal}>${product.price.toFixed(2)}</span>
              <span className={styles.listSaved}>Save ${saved}</span>
            </>
          )}
        </div>
        <div className={styles.listActions}>
          <button
            className={`${styles.listCartBtn} ${inCart ? styles.listCartAdded : ""}`}
            onClick={() => onAddToCart(product)}
            disabled={product.availabilityStatus === "Out of Stock"}
          >
            {inCart ? "✓ In Cart" : "🛒 Add to Cart"}
          </button>
          <button
            className={styles.listRemoveBtn}
            onClick={() => onRemove(product)}
            title="Remove from wishlist"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sort helper ──────────────────────────────────────────────────────────────
function sortFavorites(items, sortBy) {
  const sorted = [...items];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "discount":
      return sorted.sort(
        (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)
      );
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default:
      return sorted;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
import { useState } from "react";

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart, cartItems, setFavorites } =
    useContext(ProductsContext);

  const [sortBy, setSortBy] = useState("default");
  const [view, setView] = useState("grid");

  const sorted = sortFavorites(favorites, sortBy);

  const totalValue = favorites
    .reduce(
      (acc, p) => acc + p.price * (1 - (p.discountPercentage || 0) / 100),
      0
    )
    .toFixed(2);

  const avgDiscount =
    favorites.length > 0
      ? Math.round(
          favorites.reduce((acc, p) => acc + (p.discountPercentage || 0), 0) /
            favorites.length
        )
      : 0;

  function handleClearAll() {
    if (window.confirm("Remove all items from your wishlist?")) {
      setFavorites([]);
    }
  }

  function handleRemove(product) {
    toggleFavorite(product);
  }

  function handleAddToCart(product) {
    addToCart(product);
  }

  return (
    <div className={styles.root}>
      <FavoritesHeader
        count={favorites.length}
        onClearAll={handleClearAll}
      />

      {favorites.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <>
          <FavoritesStats
            count={favorites.length}
            totalValue={totalValue}
            avgDiscount={avgDiscount}
          />

          <FavoritesToolbar
            sortBy={sortBy}
            setSortBy={setSortBy}
            view={view}
            setView={setView}
          />

          {view === "grid" ? (
            <div className={styles.grid}>
              {sorted.map((product, i) => (
                <div
                  key={product.id}
                  className={styles.cardWrapper}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.listView}>
              {sorted.map((product, i) => (
                <div
                  key={product.id}
                  className={styles.listItemWrapper}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <FavoriteListItem
                    product={product}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                    inCart={cartItems.some((c) => c.id === product.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}