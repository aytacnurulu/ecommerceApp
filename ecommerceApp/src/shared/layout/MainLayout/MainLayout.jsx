// import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  return (
    <div className={styles.layoutWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* <Outlet /> */}
        {children}
      </main>

      <Footer />
    </div>
  );
}
