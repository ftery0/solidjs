import styles from '../styles/LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div class={styles.container}>
      <div class={styles.spinner}>
        <div class={styles.ring}></div>
        <div class={styles.ring}></div>
        <div class={styles.ring}></div>
        <div class={styles.ring}></div>
      </div>
      <p class={styles.text}>Loading...</p>
    </div>
  );
}
