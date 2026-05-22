import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiX, FiTrendingUp, FiClock, FiGrid } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductContext";
import styles from "./LiveSearchBar.module.css";

const TRENDING = ["beauty", "smartphones", "sneakers", "fragrances", "laptops"];
const RECENT_KEY = "recentSearches";

function getRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}
function saveRecent(term) {
  const prev = getRecent().filter((t) => t !== term);
  localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...prev].slice(0, 5)));
}

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark key={i} className={styles.mark}>
        {p}
      </mark>
    ) : (
      p
    ),
  );
}

function Stars({ rating }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={
            s <= Math.round(rating) ? styles.starFilled : styles.starEmpty
          }
        >
          ★
        </span>
      ))}
      <span className={styles.ratingNum}>{rating.toFixed(1)}</span>
    </div>
  );
}

export default function LiveSearchBar() {
  const { products } = useContext(ProductsContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const debounce = useRef(null);

  const doSearch = useCallback(
    (q) => {
      const t = q.trim().toLowerCase();
      if (!t) {
        setResults([]);
        return;
      }
      const filtered = products.filter(
        (p) =>
          p.title.toLowerCase().includes(t) ||
          (p.brand || "").toLowerCase().includes(t) ||
          p.category?.toLowerCase().includes(t) ||
          p.description?.toLowerCase().includes(t),
      );
      setResults(filtered);
    },
    [products],
  );

  useEffect(() => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => doSearch(query), 80);
    return () => clearTimeout(debounce.current);
  }, [query, doSearch]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFocus = () => {
    setFocused(true);
    setIsOpen(true);
  };
  const handleBlurWrapper = () => setFocused(false);

  const handleSelect = (product) => {
    saveRecent(product.title);
    navigate(`/product/${product.id}`);
    setIsOpen(false);
    setQuery("");
  };

  const handleViewAll = () => {
    if (!query.trim()) return;
    saveRecent(query.trim());
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
  };

  const handlePill = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) handleViewAll();
    if (e.key === "Escape") setIsOpen(false);
  };

  const recent = getRecent();
  const showIdle = isOpen && !query.trim();
  const showResults = isOpen && query.trim();
  const trimmedQuery = query.trim();

  return (
    <div className={styles.wrapper} ref={wrapperRef} onBlur={handleBlurWrapper}>
      {/* Search field */}
      <div className={`${styles.field} ${focused ? styles.fieldFocused : ""}`}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search products, brands or categories…"
          className={styles.input}
          autoComplete="off"
        />
        {query && (
          <button
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear"
          >
            <FiX size={16} />
          </button>
        )}
        <button
          className={styles.searchBtn}
          onClick={handleViewAll}
          aria-label="Search"
        >
          <FiSearch size={18} />
        </button>
      </div>

      {/* Dropdown */}
      {(showIdle || showResults) && (
        <div className={styles.dropdown}>
          {/* IDLE STATE */}
          {showIdle && (
            <>
              <div className={styles.sectionLabel}>Trending</div>
              <div className={styles.pillRow}>
                {TRENDING.map((t) => (
                  <button
                    key={t}
                    className={styles.pill}
                    onClick={() => handlePill(t)}
                  >
                    <FiTrendingUp size={11} /> {t}
                  </button>
                ))}
              </div>
              {recent.length > 0 && (
                <>
                  <div className={styles.sectionLabel}>Recent</div>
                  <div className={styles.pillRow}>
                    {recent.map((r) => (
                      <button
                        key={r}
                        className={styles.pill}
                        onClick={() => handlePill(r)}
                      >
                        <FiClock size={11} /> {r}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* RESULTS STATE */}
          {showResults && (
            <>
              {results.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>🔍</span>
                  <p>
                    No results for <strong>"{trimmedQuery}"</strong>
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.dropdownHeader}>
                    <span className={styles.resultLabel}>
                      <strong>{results.length}</strong> results for "
                      {trimmedQuery}"
                    </span>
                    <button
                      className={styles.viewAllLink}
                      onClick={handleViewAll}
                    >
                      View all →
                    </button>
                  </div>

                  <div className={styles.grid}>
                    {results.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        className={styles.card}
                        onClick={() => handleSelect(product)}
                      >
                        <img
                          className={styles.thumb}
                          src={product.thumbnail}
                          alt={product.title}
                          loading="lazy"
                        />
                        <div className={styles.info}>
                          {product.brand && (
                            <div className={styles.brand}>
                              {highlight(product.brand, trimmedQuery)}
                            </div>
                          )}
                          <div className={styles.title}>
                            {highlight(product.title, trimmedQuery)}
                          </div>
                          <div className={styles.meta}>
                            <span className={styles.price}>
                              {product.price.toFixed(2)} ₼
                            </span>
                            <span className={styles.catBadge}>
                              {product.category}
                            </span>
                          </div>
                          <Stars rating={product.rating} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {results.length > 6 && (
                    <div className={styles.footer}>
                      <button
                        className={styles.footerBtn}
                        onClick={handleViewAll}
                      >
                        <FiGrid size={14} />
                        View all {results.length} results
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
