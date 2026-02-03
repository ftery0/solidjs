import { ParentProps } from 'solid-js';
import styles from '../styles/ErrorMessage.module.css';

interface ErrorMessageProps extends ParentProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div class={styles.container}>
      <div class={styles.content}>
        <div class={styles.icon}>⚠️</div>
        <h3 class={styles.title}>Error</h3>
        <p class={styles.message}>
          {props.message || 'Something went wrong. Please try again.'}
        </p>
        {props.children && <div class={styles.details}>{props.children}</div>}
        {props.onRetry && (
          <button class={styles.retryButton} onClick={props.onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
