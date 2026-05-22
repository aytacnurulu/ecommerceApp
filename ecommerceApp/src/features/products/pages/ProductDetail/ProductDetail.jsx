import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../../../context/ProductContext";
import "./ProductDetail.css";

function StarRating({ rating, size = 16 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  return (
    <div className="pd-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`pd-star${i <= full ? " filled" : i === full + 1 && hasHalf ? " half" : ""}`}
          style={{ fontSize: size }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function getStatusInfo(status) {
  if (!status || status === "In Stock")
    return { cls: "in-stock", label: "In Stock", icon: "✓" };
  if (status === "Low Stock")
    return { cls: "low-stock", label: "Low Stock", icon: "!" };
  return { cls: "out-of-stock", label: "Out of Stock", icon: "✕" };
}

export default function ProductDetail() {
  const { id } = useParams();
  const { products, favorites, toggleFavorite, cartItems, addToCart } =
    useContext(ProductsContext);

  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const [showToast, setShowToast] = useState(false);
  const product = products.find((p) => p.id === parseInt(id));
  const isFavorite = favorites.some((item) => item.id === product?.id);
  const inCart = cartItems.some((item) => item.id === product?.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };
  const handleAddToCart = () => {
    if (isOOS) return;
    addToCart(product);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };
  if (!product) {
    return (
      <div className="pd-root" style={{ textAlign: "center", paddingTop: 80 }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h2 style={{ fontFamily: "'Sora',sans-serif", marginTop: 16 }}>
          Product not found
        </h2>
      </div>
    );
  }

  const allImages = product.images?.length
    ? product.images
    : [product.thumbnail];
  const discountedPrice = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);
  const statusInfo = getStatusInfo(product.availabilityStatus);
  const isOOS = product.availabilityStatus === "Out of Stock";

  const infoCards = [
    {
      icon: "🚚",
      title: "Shipping",
      val: product.shippingInformation || "Standard shipping",
    },
    {
      icon: "↩️",
      title: "Return",
      val: product.returnPolicy || "Check policy",
    },
    {
      icon: "🛡️",
      title: "Warranty",
      val: product.warrantyInformation || "N/A",
    },
    {
      icon: "📦",
      title: "Min. Order",
      val: `${product.minimumOrderQuantity || 1} units`,
    },
  ];

  return (
    <>
      <div className="pd-root">
        {/* Breadcrumb */}
        <div className="pd-breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <a href="/shop">Shop</a>
          <span>›</span>
          <a
            href={`/shop?category=${product.category}`}
            style={{ textTransform: "capitalize" }}
          >
            {product.category}
          </a>
          <span>›</span>
          <span className="current">{product.title}</span>
        </div>

        {/* Promo Banner */}
        <div className="pd-promo-banner">
          <div className="pd-promo-text">
            First order? Use code <strong> HELLO30</strong>
          </div>
          <div className="pd-promo-badge">30% OFF</div>
          <div className="pd-promo-free">
            🚀 FREE SHIPPING
            <br />
            <span style={{ fontWeight: 400, fontSize: 11 }}>
              on orders over $35
            </span>
          </div>
        </div>

        {/* Main Layout */}
        <div className="pd-layout">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-main-image-wrap">
              <img src={allImages[imgIdx]} alt={product.title} />
              {allImages.length > 1 && (
                <>
                  <button
                    className="pd-img-nav prev"
                    onClick={() =>
                      setImgIdx(
                        (i) => (i - 1 + allImages.length) % allImages.length,
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className="pd-img-nav next"
                    onClick={() => setImgIdx((i) => (i + 1) % allImages.length)}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="pd-thumbnails">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-thumb${i === imgIdx ? " active" : ""}`}
                    onClick={() => setImgIdx(i)}
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-category-badge">🏷️ {product.category}</div>

            <h1 className="pd-title">{product.title}</h1>
            <div className="pd-brand-line">
              by <strong>{product.brand || "Unknown Brand"}</strong> · SKU:{" "}
              {product.sku}
            </div>

            {/* Rating */}
            <div className="pd-rating-row">
              <span className="pd-rating-score">
                {product.rating?.toFixed(1)}
              </span>
              <StarRating rating={product.rating || 0} />
              <span className="pd-dot">·</span>
              <span className="pd-rating-count">
                {product.reviews?.length || 0} Reviews
              </span>
              <span className="pd-dot">·</span>
              <span className="pd-rating-count">{product.stock} in stock</span>
            </div>

            {/* Status */}
            <div className="pd-status-row">
              <span className={`pd-status-badge ${statusInfo.cls}`}>
                <span className="pd-status-dot" />
                {statusInfo.label}
              </span>
              {product.tags?.includes("beauty") && (
                <span className="pd-fav-pill">♥ Trending</span>
              )}
            </div>

            {/* Price */}
            <div className="pd-price-block">
              <div className="pd-price-label">🌍 Special Price</div>
              <div className="pd-price-row">
                <span className="pd-price-current">${discountedPrice}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="pd-price-original">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="pd-discount-chip">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Qty */}
            <div className="pd-qty-row">
              <span className="pd-qty-label">Quantity</span>
              <div className="pd-qty-ctrl">
                <button
                  className="pd-qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="pd-qty-val">{qty}</span>
                <button
                  className="pd-qty-btn"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: 12, color: "#bbb" }}>
                Min. {product.minimumOrderQuantity || 1}
              </span>
            </div>

            {/* CTAs */}
            <div className="pd-cta-row">
              <button
                className={`pd-btn-cart${inCart ? " added" : ""}`}
                onClick={handleAddToCart}
                disabled={isOOS}
              >
                {inCart
                  ? "✓ In Cart"
                  : isOOS
                    ? "Out of Stock"
                    : "🛒 Add to Cart"}
              </button>
              <button
                className={`pd-btn-wishlist${isFavorite ? " active" : ""}`}
                onClick={handleFavorite}
                title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Info Cards */}
            <div className="pd-info-cards">
              {infoCards.map((c, i) => (
                <div className="pd-info-card" key={i}>
                  <span className="pd-info-card-icon">{c.icon}</span>
                  <div>
                    <div className="pd-info-card-title">{c.title}</div>
                    <div className="pd-info-card-val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="pd-desc-section">
              <h3>About this product</h3>
              <p className="pd-desc-text">{product.description}</p>
              {product.tags?.length > 0 && (
                <div className="pd-tags">
                  {product.tags.map((t) => (
                    <span key={t} className="pd-tag">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews?.length > 0 && (
          <div className="pd-reviews">
            <div className="pd-reviews-header">
              Customer Reviews
              <span className="pd-reviews-count">{product.reviews.length}</span>
            </div>
            <div className="pd-reviews-grid">
              {product.reviews.map((r, i) => (
                <div className="pd-review-card" key={i}>
                  <div className="pd-review-top">
                    <div>
                      <div className="pd-reviewer-name">{r.reviewerName}</div>
                      <div className="pd-review-date">
                        {new Date(r.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="pd-review-rating">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          style={{ color: s <= r.rating ? "#f5a623" : "#ddd" }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="pd-review-comment">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      <div className={`pd-toast${showToast ? " show" : ""}`}>
        ✓ Added to cart successfully!
      </div>
    </>
  );
}
