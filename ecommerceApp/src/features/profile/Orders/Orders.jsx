// src/features/profile/pages/Orders.jsx
import { useState } from "react";
import styles from "./Orders.module.css";

const MOCK_ORDERS = [
  {
    id: "ORD-2025-001",
    date: "12 Jan 2025",
    status: "Delivered",
    total: 149.99,
    items: [
      {
        title: "Wireless Headphones Pro",
        qty: 1,
        price: 99.99,
        img: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
      },
      {
        title: "Phone Case Ultra",
        qty: 2,
        price: 25.0,
        img: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
      },
    ],
  },
  {
    id: "ORD-2025-002",
    date: "28 Jan 2025",
    status: "In Transit",
    total: 89.5,
    items: [
      {
        title: "Skincare Set Deluxe",
        qty: 1,
        price: 89.5,
        img: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      },
    ],
  },
  {
    id: "ORD-2025-003",
    date: "5 Feb 2025",
    status: "Processing",
    total: 310.0,
    items: [
      {
        title: "Smart Watch Series X",
        qty: 1,
        price: 310.0,
        img: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
      },
    ],
  },
  {
    id: "ORD-2025-004",
    date: "14 Feb 2025",
    status: "Cancelled",
    total: 54.0,
    items: [
      {
        title: "Perfume Gift Set",
        qty: 1,
        price: 54.0,
        img: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
      },
    ],
  },
];

const STATUS_META = {
  Delivered: { color: "#16a34a", bg: "#f0fdf4", icon: "✅" },
  "In Transit": { color: "#2563eb", bg: "#eff6ff", icon: "🚚" },
  Processing: { color: "#d97706", bg: "#fffbeb", icon: "⏳" },
  Cancelled: { color: "#dc2626", bg: "#fef2f2", icon: "❌" },
};

export default function Orders() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>My Orders</h2>
        <span className={styles.count}>{MOCK_ORDERS.length} orders</span>
      </div>

      <div className={styles.list}>
        {MOCK_ORDERS.map((order) => {
          const meta = STATUS_META[order.status];
          const isOpen = expanded === order.id;

          return (
            <div key={order.id} className={styles.card}>
              {/* Header row */}
              <div
                className={styles.cardHeader}
                onClick={() => setExpanded(isOpen ? null : order.id)}
              >
                <div className={styles.headerLeft}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.date}>{order.date}</span>
                </div>
                <div className={styles.headerRight}>
                  <span
                    className={styles.badge}
                    style={{ color: meta.color, background: meta.bg }}
                  >
                    {meta.icon} {order.status}
                  </span>
                  <span className={styles.total}>
                    ${order.total.toFixed(2)}
                  </span>
                  <span className={styles.chevron}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expanded body */}
              {isOpen && (
                <div className={styles.body}>
                  <div className={styles.items}>
                    {order.items.map((item, i) => (
                      <div key={i} className={styles.item}>
                        <img
                          src={item.img}
                          alt={item.title}
                          className={styles.itemImg}
                        />
                        <div className={styles.itemInfo}>
                          <div className={styles.itemTitle}>{item.title}</div>
                          <div className={styles.itemQty}>Qty: {item.qty}</div>
                        </div>
                        <div className={styles.itemPrice}>
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.bodyFooter}>
                    {order.status !== "Cancelled" && (
                      <button className={styles.trackBtn}>
                        📍 Track Order
                      </button>
                    )}
                    {order.status === "Delivered" && (
                      <button className={styles.reviewBtn}>
                        ⭐ Write a Review
                      </button>
                    )}
                    {order.status === "Delivered" && (
                      <button className={styles.reorderBtn}>🔄 Reorder</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
