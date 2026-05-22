// src/features/profile/pages/Settings.jsx
import { useState } from "react";
import styles from "./Settings.module.css";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "user@email.com",
    phone: "+994 50 123 45 67",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    priceDrops: true,
    newsletter: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [saved, setSaved] = useState(false);

  function handleProfileSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggle(key) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.pageTitle}>Settings</h2>

      {/* ── Personal info ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>👤 Personal Information</h3>
        <div className={styles.formGrid}>
          {[
            ["First Name", "firstName"],
            ["Last Name", "lastName"],
            ["Email", "email"],
            ["Phone", "phone"],
          ].map(([label, key]) => (
            <div key={key} className={styles.formGroup}>
              <label className={styles.label}>{label}</label>
              <input
                className={styles.input}
                value={profile[key]}
                onChange={(e) =>
                  setProfile({ ...profile, [key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>
        <button className={styles.saveBtn} onClick={handleProfileSave}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </section>

      {/* ── Notifications ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🔔 Notification Preferences</h3>
        <div className={styles.toggleList}>
          {[
            [
              "orderUpdates",
              "Order Updates",
              "Get notified about your order status",
            ],
            ["promotions", "Promotions", "Flash sales and exclusive deals"],
            [
              "priceDrops",
              "Price Drops",
              "When a wishlisted item drops in price",
            ],
            ["newsletter", "Newsletter", "Weekly picks and new arrivals"],
          ].map(([key, label, sub]) => (
            <div key={key} className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>{label}</div>
                <div className={styles.toggleSub}>{sub}</div>
              </div>
              <button
                className={`${styles.toggle} ${notifications[key] ? styles.toggleOn : ""}`}
                onClick={() => toggle(key)}
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Change password ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🔒 Change Password</h3>
        <div className={styles.formGrid}>
          {[
            ["Current Password", "current"],
            ["New Password", "next"],
            ["Confirm Password", "confirm"],
          ].map(([label, key]) => (
            <div key={key} className={styles.formGroup}>
              <label className={styles.label}>{label}</label>
              <input
                type="password"
                className={styles.input}
                value={passwords[key]}
                placeholder="••••••••"
                onChange={(e) =>
                  setPasswords({ ...passwords, [key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>
        <button className={styles.saveBtn}>Update Password</button>
      </section>

      {/* ── Danger zone ── */}
      <section className={`${styles.section} ${styles.danger}`}>
        <h3 className={styles.sectionTitle}>⚠️ Danger Zone</h3>
        <p className={styles.dangerText}>
          Deleting your account is permanent and cannot be undone.
        </p>
        <button className={styles.deleteBtn}>Delete My Account</button>
      </section>
    </div>
  );
}
