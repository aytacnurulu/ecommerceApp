import { useContext, useState } from "react";
import { ProductsContext } from "../../../../context/ProductContext";
import styles from "./Cart.module.css";

// ─── Sub-components (ready to extract) ────────────────────────────────────────

function CartEmpty() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>🛒</div>
      <h2 className={styles.emptyTitle}>Your cart is empty</h2>
      <p className={styles.emptyText}>
        Looks like you haven't added anything yet.
      </p>
      <a href="/shop" className={styles.emptyBtn}>
        Start Shopping
      </a>
    </div>
  );
}

function PromoBanner() {
  return (
    <div className={styles.promoBanner}>
      <span className={styles.promoEmoji}>🚀</span>
      <span className={styles.promoText}>
        First order? Use code <strong>HELLO30</strong> for{" "}
        <span className={styles.promoHighlight}>30% OFF</span>
      </span>
      <span className={styles.promoFree}>FREE SHIPPING on orders over $35</span>
    </div>
  );
}

function CouponBox({ coupon, setCoupon, applied, onApply, onRemove, error }) {
  return (
    <div className={styles.couponBox}>
      <div className={styles.couponLabel}>Discount Code</div>
      {applied ? (
        <div className={styles.couponApplied}>
          <span className={styles.couponAppliedTag}>
            {applied}
            <span className={styles.couponPercent}>30% OFF</span>
            <button
              className={styles.couponRemove}
              onClick={onRemove}
              title="Remove coupon"
            >
              ✕
            </button>
          </span>
          <span className={styles.couponCheck}>✓ Applied</span>
        </div>
      ) : (
        <>
          <div className={styles.couponRow}>
            <input
              className={styles.couponInput}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              placeholder="Enter code"
            />
            <button className={styles.couponBtn} onClick={onApply}>
              Apply
            </button>
          </div>
          {error && <div className={styles.couponError}>{error}</div>}
        </>
      )}
    </div>
  );
}

function CartItemCard({ item, onIncrement, onDecrement, onRemove }) {
  const discountedPrice = (
    item.price *
    (1 - (item.discountPercentage || 0) / 100)
  ).toFixed(2);
  const lineTotal = (parseFloat(discountedPrice) * item.quantity).toFixed(2);
  const savedAmount = (
    (item.price - parseFloat(discountedPrice)) *
    item.quantity
  ).toFixed(2);

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemCheck}>
        <span className={styles.checkIcon}>✓</span>
      </div>

      <div className={styles.itemImageWrap}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className={styles.itemImage}
        />
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.itemBrand}>{item.brand || "Brand"}</div>
        <div className={styles.itemTitle}>{item.title}</div>
        <div className={styles.itemMeta}>
          <span className={styles.itemSku}>SKU: {item.sku}</span>
          {item.shippingInformation && (
            <span className={styles.itemShipping}>
              📦 {item.shippingInformation}
            </span>
          )}
        </div>
        {item.discountPercentage > 0 && (
          <div className={styles.itemSaved}>Seller Discount Applied</div>
        )}
      </div>

      <div className={styles.itemRight}>
        <button
          className={styles.itemRemove}
          onClick={() => onRemove(item.id)}
          title="Remove"
        >
          🗑 Remove
        </button>

        <div className={styles.itemPriceBlock}>
          <span className={styles.itemPrice}>${lineTotal}</span>
          {item.discountPercentage > 0 && (
            <>
              <span className={styles.itemOriginal}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {parseFloat(savedAmount) > 0 && (
          <div className={styles.itemSavedAmount}>Saved: ${savedAmount} ▾</div>
        )}

        <div className={styles.qtyCtrl}>
          <button
            className={styles.qtyBtn}
            onClick={() => onDecrement(item.id)}
          >
            −
          </button>
          <span className={styles.qtyVal}>{item.quantity}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => onIncrement(item.id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function CartSummary({ subtotal, delivery, discount, total, onCheckout }) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.summaryTitle}>Cart Summary</h2>

      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Subtotal</span>
        <span className={styles.summaryValue}>${subtotal}</span>
      </div>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Delivery</span>
        <span className={styles.summaryFree}>
          {delivery === 0 ? (
            <span className={styles.freeTag}>FREE</span>
          ) : (
            `$${delivery.toFixed(2)}`
          )}
        </span>
      </div>
      {discount > 0 && (
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total Savings</span>
          <span className={styles.summaryDiscount}>-${discount}</span>
        </div>
      )}

      <div className={styles.summaryDivider} />

      <div className={`${styles.summaryRow} ${styles.summaryTotalRow}`}>
        <span className={styles.summaryTotalLabel}>Total</span>
        <span className={styles.summaryTotal}>${total}</span>
      </div>

      <button className={styles.checkoutBtn} onClick={onCheckout}>
        Confirm Order
      </button>

      <div className={styles.summarySecure}>🔒 Secure checkout</div>
    </div>
  );
}

function RecommendedItem({ product }) {
  const price = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  return (
    <a href={`/product/${product.id}`} className={styles.recCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.recImage}
      />
      <div className={styles.recInfo}>
        <div className={styles.recTitle}>{product.title}</div>
        <div className={styles.recPriceRow}>
          <span className={styles.recPrice}>${price}</span>
          {product.discountPercentage > 0 && (
            <span className={styles.recOriginal}>
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        {product.discountPercentage > 0 && (
          <div className={styles.recSaved}>Seller Discount Applied</div>
        )}
      </div>
      <button className={styles.recAddBtn}>Add to Cart</button>
    </a>
  );
}

// ─── Main Cart Component ───────────────────────────────────────────────────────

const VALID_COUPON = "HELLO30";
const COUPON_DISCOUNT = 0.3;
const FREE_SHIPPING_THRESHOLD = 35;
const SHIPPING_COST = 3.99;

export default function Cart() {
  const { cartItems, setCartItems, products } = useContext(ProductsContext);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function getItemPrice(item) {
    return item.price * (1 - (item.discountPercentage || 0) / 100);
  }

  function increment(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decrement(id) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function applyCode() {
    if (coupon.trim() === VALID_COUPON) {
      setAppliedCoupon(VALID_COUPON);
      setCouponError("");
    } else {
      setCouponError("Invalid code. Try HELLO30");
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCoupon("");
  }

  // ── Totals ───────────────────────────────────────────────────────────────────

  const subtotal = cartItems
    .reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0)
    .toFixed(2);

  const delivery =
    parseFloat(subtotal) >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const couponSavings = appliedCoupon
    ? (parseFloat(subtotal) * COUPON_DISCOUNT).toFixed(2)
    : "0.00";

  const total = (
    parseFloat(subtotal) -
    parseFloat(couponSavings) +
    delivery
  ).toFixed(2);

  const originalSubtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const totalSavings = (
    parseFloat(originalSubtotal) -
    parseFloat(subtotal) +
    parseFloat(couponSavings)
  ).toFixed(2);

  // ── Recommended products (exclude items already in cart) ─────────────────────
  const cartIds = new Set(cartItems.map((i) => i.id));
  const recommended = products
    .filter((p) => !cartIds.has(p.id) && p.discountPercentage > 5)
    .slice(0, 6);

  if (cartItems.length === 0) {
    return (
      <div className={styles.root}>
        <PromoBanner />
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <PromoBanner />

      <div className={styles.layout}>
        {/* ── Left: items + recommendations ── */}
        <div className={styles.leftCol}>
          {/* Seller group header */}
          <div className={styles.sellerHeader}>
            <span className={styles.sellerCheck}>✓</span>
            <span className={styles.sellerName}>My Cart</span>
            <span className={styles.sellerCount}>{cartItems.length} items</span>
            {delivery === 0 && (
              <span className={styles.freeShipPill}>
                🚀 Free Shipping Applied
              </span>
            )}
            {delivery > 0 && (
              <span className={styles.freeShipHint}>
                Add $
                {(FREE_SHIPPING_THRESHOLD - parseFloat(subtotal)).toFixed(2)}{" "}
                more for free shipping
              </span>
            )}
          </div>

          <div className={styles.itemList}>
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Recommended */}
          {recommended.length > 0 && (
            <div className={styles.recommended}>
              <div className={styles.recTitle}>Recommended for You</div>
              <div className={styles.recGrid}>
                {recommended.map((p) => (
                  <RecommendedItem key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: coupon + summary ── */}
        <div className={styles.rightCol}>
          <CouponBox
            coupon={coupon}
            setCoupon={setCoupon}
            applied={appliedCoupon}
            onApply={applyCode}
            onRemove={removeCoupon}
            error={couponError}
          />
          <CartSummary
            subtotal={subtotal}
            delivery={delivery}
            discount={totalSavings}
            total={total}
            onCheckout={() => alert("Proceeding to checkout…")}
          />
        </div>
      </div>
    </div>
  );
}
