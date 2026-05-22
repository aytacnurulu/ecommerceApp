// src/features/profile/pages/ProfileLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import styles from "./ProfileLayout.module.css";

export default function ProfileLayout() {
  return (
    <div className={styles.root}>

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.avatar}>
          <div className={styles.avatarCircle}>👤</div>
          <div>
            <div className={styles.userName}>My Account</div>
            <div className={styles.userEmail}>user@email.com</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navSection}>Orders</div>
          <NavLink to="/profile/orders"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`}>
            📦 My Orders
          </NavLink>

          <div className={styles.navSection}>Account</div>
          <NavLink to="/profile/addresses"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`}>
            📍 Addresses
          </NavLink>
          <NavLink to="/profile/settings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`}>
            ⚙️ Settings
          </NavLink>
        </nav>
      </aside>

      {/* ── Page content ── */}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}