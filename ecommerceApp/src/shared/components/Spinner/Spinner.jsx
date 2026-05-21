import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.center}></div>
      </div>
    </div>
  );
}