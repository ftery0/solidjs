import { A } from '@solidjs/router';
import styles from '../styles/NotFound.module.css';

export default function NotFound() {
  return (
    <div class={styles.container}>
      <div class={styles.content}>
        <div class={styles.errorCode}>404</div>
        <h1 class={styles.title}>Page Not Found</h1>
        <p class={styles.description}>
          Sorry, the page you're looking for doesn't exist.
        </p>
        <A href="/" class={styles.backLink}>
          ← Back to Posts
        </A>
      </div>
    </div>
  );
}
