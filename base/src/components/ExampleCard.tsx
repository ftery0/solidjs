import { ParentProps } from 'solid-js';
import styles from '../styles/ExampleCard.module.css';

interface ExampleCardProps extends ParentProps {
  title: string;
  description?: string;
}

export default function ExampleCard(props: ExampleCardProps) {
  return (
    <div class={styles.card}>
      <div class={styles.header}>
        <h3 class={styles.title}>{props.title}</h3>
      </div>
      {props.description && (
        <p class={styles.description}>{props.description}</p>
      )}
      <div class={styles.content}>{props.children}</div>
    </div>
  );
}
