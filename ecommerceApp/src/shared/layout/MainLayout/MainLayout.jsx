// src/shared/layout/MainLayout/MainLayout.jsx
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import CategoryList from "../../../features/home/components/CategoryList";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  return (
    <div className={styles.layoutWrapper}>

      {/* ① Fixed header */}
      <Header />

      {/* ② Sticky category bar — always visible on every page.
             Clicking any item navigates to Home with ?category=  */}
      <CategoryList />

      {/* ③ Route content */}
      <main className={styles.mainContent}>
        {children}
      </main>

      <Footer />
    </div>
  );
}