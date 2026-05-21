import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.badge}>
          <span>404</span>
        </div>
        <h1 className={styles.title}>Oops! The deal is gone.</h1>
        <p className={styles.description}>
          This page has wandered off the shelf. Head back to the store and
          discover your next favorite item.
        </p>
        <Link to="/" className={styles.button}>
          Back to shopping
        </Link>
      </div>

      <div className={styles.background}>
        <span className={styles.glow} />
        <span className={styles.glow} />
        <span className={styles.glow} />
      </div>
    </main>
  );
}
