import { useContext, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsContext } from "../../../../context/ProductContext";
// import CategoryList from "../../components/CategoryList";
import ProductCard from "../../../../shared/components/ProductCard";
import styles from "./Home.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// HeroBanner
// ─────────────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    tag: "🔥 Flash Sale",
    title: "Up to 50% OFF",
    sub: "on Beauty & Skincare",
    cta: "Shop Now",
    href: "/?category=beauty",
    accent: "#ff6b35",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 60%, #1a1a2e 100%)",
    decoration: "💄",
  },
  {
    tag: "✨ New Arrivals",
    title: "Fresh Drops Daily",
    sub: "Fragrances & Grooming",
    cta: "Explore",
    href: "/?category=fragrances",
    accent: "#f7931e",
    bg: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    decoration: "🌸",
  },
  {
    tag: "📱 Tech Deals",
    title: "Gadgets & More",
    sub: "Smartphones, Laptops & Accessories",
    cta: "View Deals",
    href: "/?category=smartphones",
    accent: "#00d2ff",
    bg: "linear-gradient(135deg, #0a0a1a 0%, #1a2a4a 60%, #0a0a1a 100%)",
    decoration: "⚡",
  },
];

function HeroBanner() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  function goTo(i) {
    if (i === idx) return;
    setAnimating(true);
    setTimeout(() => {
      setIdx(i);
      setAnimating(false);
    }, 260);
  }

  useEffect(() => {
    const t = setInterval(() => {
      goTo((idx + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(t);
  }, [idx]);

  const slide = SLIDES[idx];

  return (
    <div className={styles.hero} style={{ background: slide.bg }}>
      <div
        className={`${styles.heroContent} ${animating ? styles.heroOut : styles.heroIn}`}
      >
        <span className={styles.heroTag} style={{ color: slide.accent }}>
          {slide.tag}
        </span>
        <h1 className={styles.heroTitle}>{slide.title}</h1>
        <p className={styles.heroSub}>{slide.sub}</p>
        <a
          href={slide.href}
          className={styles.heroCta}
          style={{ background: slide.accent }}
        >
          {slide.cta} →
        </a>
      </div>
      <div className={styles.heroDecoration}>{slide.decoration}</div>
      <div className={styles.heroDots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.heroDot} ${i === idx ? styles.heroDotActive : ""}`}
            style={i === idx ? { background: slide.accent } : {}}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PromoStrip
// ─────────────────────────────────────────────────────────────────────────────
const PERKS = [
  { icon: "🚀", label: "Free Shipping", sub: "on orders over $35" },
  { icon: "↩️", label: "Easy Returns", sub: "30-day return policy" },
  { icon: "🔒", label: "Secure Pay", sub: "SSL encrypted checkout" },
  { icon: "🎁", label: "Gift Wrap", sub: "available at checkout" },
];

function PromoStrip() {
  return (
    <div className={styles.promoStrip}>
      {PERKS.map((p) => (
        <div className={styles.perkItem} key={p.label}>
          <span className={styles.perkIcon}>{p.icon}</span>
          <div>
            <div className={styles.perkLabel}>{p.label}</div>
            <div className={styles.perkSub}>{p.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FlashDealsSection
// ─────────────────────────────────────────────────────────────────────────────
function FlashDealsSection({ products }) {
  const deals = useMemo(
    () =>
      [...products]
        .filter((p) => p.discountPercentage >= 15)
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 6),
    [products],
  );

  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 42, s: 17 });

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) {
          h = 0;
          m = 0;
          s = 0;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  if (!deals.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadLeft}>
          <span className={styles.sectionIcon}>⚡</span>
          <h2 className={styles.sectionTitle}>Flash Deals</h2>
        </div>
        <div className={styles.countdown}>
          <span className={styles.countdownLabel}>Ends in</span>
          <span className={styles.countdownBlock}>{pad(timeLeft.h)}</span>
          <span className={styles.countdownColon}>:</span>
          <span className={styles.countdownBlock}>{pad(timeLeft.m)}</span>
          <span className={styles.countdownColon}>:</span>
          <span className={styles.countdownBlock}>{pad(timeLeft.s)}</span>
        </div>
      </div>
      <div className={styles.dealsGrid}>
        {deals.map((p, i) => (
          <div
            key={p.id}
            className={styles.dealCard}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <ProductCard product={p} />
            <div className={styles.dealFlame}>
              🔥 -{Math.round(p.discountPercentage)}%
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CategoryHighlights
// ─────────────────────────────────────────────────────────────────────────────
const CAT_META = {
  beauty: { emoji: "💄", color: "#ff6b9d", bg: "#fff0f6" },
  fragrances: { emoji: "🌸", color: "#a855f7", bg: "#faf0fe" },
  furniture: { emoji: "🛋️", color: "#f59e0b", bg: "#fffbeb" },
  groceries: { emoji: "🥦", color: "#22c55e", bg: "#f0fdf4" },
  smartphones: { emoji: "📱", color: "#3b82f6", bg: "#eff6ff" },
  laptops: { emoji: "💻", color: "#6366f1", bg: "#eef2ff" },
  "mens-shirts": { emoji: "👔", color: "#0ea5e9", bg: "#f0f9ff" },
  "womens-bags": { emoji: "👜", color: "#ec4899", bg: "#fdf2f8" },
  sunglasses: { emoji: "🕶️", color: "#f97316", bg: "#fff7ed" },
  watches: { emoji: "⌚", color: "#78716c", bg: "#fafaf9" },
};

function CategoryHighlights({ categories, products }) {
  const stats = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      const catProducts = products.filter((p) => p.category === cat);
      map[cat] = {
        count: catProducts.length,
        minPrice: Math.min(...catProducts.map((p) => p.price)).toFixed(0),
      };
    });
    return map;
  }, [categories, products]);

  const display = categories.slice(0, 8);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadLeft}>
          <span className={styles.sectionIcon}>🏷️</span>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
        </div>
        <a href="/shop" className={styles.sectionLink}>
          View all →
        </a>
      </div>
      <div className={styles.catGrid}>
        {display.map((cat, i) => {
          const meta = CAT_META[cat] || {
            emoji: "📦",
            color: "#ff6b35",
            bg: "#fff4ec",
          };
          const info = stats[cat] || {};
          return (
            <a
              key={cat}
              href={`/?category=${cat}`}
              className={styles.catCard}
              style={{
                "--cat-color": meta.color,
                "--cat-bg": meta.bg,
                animationDelay: `${i * 50}ms`,
              }}
            >
              <div className={styles.catEmoji}>{meta.emoji}</div>
              <div className={styles.catName}>{cat.replace(/-/g, " ")}</div>
              <div className={styles.catMeta}>
                {info.count} items · from ${info.minPrice}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TopRatedSection
// ─────────────────────────────────────────────────────────────────────────────
function TopRatedSection({ products }) {
  const topRated = useMemo(
    () =>
      [...products]
        .filter((p) => p.rating >= 4.5)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5),
    [products],
  );

  if (!topRated.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadLeft}>
          <span className={styles.sectionIcon}>⭐</span>
          <h2 className={styles.sectionTitle}>Top Rated</h2>
        </div>
      </div>
      <div className={styles.topRatedList}>
        {topRated.map((p, i) => {
          const price = (
            p.price *
            (1 - (p.discountPercentage || 0) / 100)
          ).toFixed(2);
          return (
            <a
              key={p.id}
              href={`/product/${p.id}`}
              className={styles.topRatedItem}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={styles.topRatedRank}>#{i + 1}</div>
              <img
                src={p.thumbnail}
                alt={p.title}
                className={styles.topRatedImg}
              />
              <div className={styles.topRatedInfo}>
                <div className={styles.topRatedTitle}>{p.title}</div>
                <div className={styles.topRatedStars}>
                  {"★".repeat(Math.round(p.rating))}
                  {"☆".repeat(5 - Math.round(p.rating))}
                  <span className={styles.topRatedScore}>
                    {p.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className={styles.topRatedPrice}>${price}</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BannerCards
// ─────────────────────────────────────────────────────────────────────────────
function BannerCards() {
  return (
    <div className={styles.bannerCards}>
      <a
        href="/?category=beauty"
        className={`${styles.bannerCard} ${styles.bannerCardA}`}
      >
        <div className={styles.bannerCardContent}>
          <span className={styles.bannerCardTag}>Beauty Picks</span>
          <h3 className={styles.bannerCardTitle}>
            Glow Up
            <br />
            Collection
          </h3>
          <span className={styles.bannerCardCta}>Shop →</span>
        </div>
        <div className={styles.bannerCardDeco}>💄</div>
      </a>
      <a
        href="/?category=smartphones"
        className={`${styles.bannerCard} ${styles.bannerCardB}`}
      >
        <div className={styles.bannerCardContent}>
          <span className={styles.bannerCardTag}>Tech Zone</span>
          <h3 className={styles.bannerCardTitle}>
            Latest
            <br />
            Gadgets
          </h3>
          <span className={styles.bannerCardCta}>Explore →</span>
        </div>
        <div className={styles.bannerCardDeco}>📱</div>
      </a>
      <a
        href="/?category=fragrances"
        className={`${styles.bannerCard} ${styles.bannerCardC}`}
      >
        <div className={styles.bannerCardContent}>
          <span className={styles.bannerCardTag}>New Season</span>
          <h3 className={styles.bannerCardTitle}>
            Signature
            <br />
            Scents
          </h3>
          <span className={styles.bannerCardCta}>Discover →</span>
        </div>
        <div className={styles.bannerCardDeco}>🌸</div>
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CategoryList — always visible horizontal strip at the top of every page
// ─────────────────────────────────────────────────────────────────────────────
// function CategoryList({ categories }) {
//   const [searchParams] = useSearchParams();
//   const active = searchParams.get("category") || "";

//   return (
//     <nav className={styles.categoryList}>
//       <a
//         href="/"
//         className={`${styles.categoryListItem} ${!active ? styles.categoryListItemActive : ""}`}
//       >
//         <span className={styles.categoryListEmoji}>🏠</span>
//         <span className={styles.categoryListLabel}>All</span>
//       </a>
//       {categories.map((cat) => {
//         const meta = CAT_META[cat] || { emoji: "📦", color: "#ff6b35" };
//         const isActive = active === cat;
//         return (
//           <a
//             key={cat}
//             href={`/?category=${cat}`}
//             className={`${styles.categoryListItem} ${isActive ? styles.categoryListItemActive : ""}`}
//             style={isActive ? { "--active-color": meta.color } : {}}
//           >
//             <span className={styles.categoryListEmoji}>{meta.emoji}</span>
//             <span className={styles.categoryListLabel}>
//               {cat.replace(/-/g, " ")}
//             </span>
//           </a>
//         );
//       })}
//     </nav>
//   );
// }

// ─────────────────────────────────────────────────────────────────────────────
// ProductsSection  (main filtered grid — full width, no sidebar)
// ─────────────────────────────────────────────────────────────────────────────
function ProductsSection({ products, selectedCategory }) {
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "discount":
        return list.sort(
          (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0),
        );
      case "rating":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return list;
    }
  }, [products, sortBy]);

  const paginated = sorted.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < sorted.length;

  const activeMeta = selectedCategory
    ? CAT_META[selectedCategory] || { emoji: "📦", color: "#ff6b35" }
    : null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadLeft}>
          {activeMeta ? (
            <>
              <span className={styles.sectionIcon}>{activeMeta.emoji}</span>
              <h2
                className={styles.sectionTitle}
                style={{ color: activeMeta.color }}
              >
                {selectedCategory.replace(/-/g, " ")}
              </h2>
            </>
          ) : (
            <>
              <span className={styles.sectionIcon}>✨</span>
              <h2 className={styles.sectionTitle}>For You</h2>
            </>
          )}
          <span className={styles.productCount}>{sorted.length} items</span>
        </div>
        <div className={styles.sortGroup}>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="discount">Best Discount</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <p className={styles.noResultsText}>
            No products found in this category.
          </p>
          <a href="/" className={styles.noResultsBtn}>
            Browse all products
          </a>
        </div>
      ) : (
        <>
          <div className={styles.productGrid}>
            {paginated.map((product, i) => (
              <div
                key={product.id}
                className={styles.productCardWrapper}
                style={{ animationDelay: `${(i % PER_PAGE) * 40}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => setPage((p) => p + 1)}
              >
                Load More · {sorted.length - paginated.length} remaining
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LoadingSkeleton
// ─────────────────────────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className={styles.homeWrapper}>
      <div
        className={styles.skeletonStrip}
        style={{ height: 56, marginBottom: 16 }}
      />
      <div className={styles.skeletonHero} />
      <div className={styles.skeletonStrip} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={styles.skeletonCard}
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home  (main export)
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const { products, categories, loading } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  const productList = products || [];

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return productList;
    return productList.filter((p) => p.category === selectedCategory);
  }, [productList, selectedCategory]);

  if (loading) return <LoadingSkeleton />;

  const isFiltered = Boolean(selectedCategory);

  return (
    <div className={styles.homeWrapper}>
      {/* ── Category list: always visible on every page ── */}
      {/* <CategoryList categories={categories} /> */}

      {/* ── Home-only sections ── */}
      {!isFiltered && <HeroBanner />}
      {!isFiltered && <PromoStrip />}
      {!isFiltered && <FlashDealsSection products={productList} />}
      {!isFiltered && <BannerCards />}
      {!isFiltered && (
        <CategoryHighlights categories={categories} products={productList} />
      )}

      {/* ── Product grid — full width, no sidebar ── */}
      <ProductsSection
        products={filteredProducts}
        selectedCategory={selectedCategory}
      />

      {!isFiltered && <TopRatedSection products={productList} />}
    </div>
  );
}
