import { ParentProps } from 'solid-js';
import Nav from './Nav';
import styles from '../styles/Layout.module.css';

interface LayoutProps extends ParentProps {
  title?: string;
  description?: string;
}

export default function Layout(props: LayoutProps) {
  return (
    <div class={styles.layout}>
      <Nav />
      <main class={styles.main}>
        <div class={styles.content}>
          {props.title && <h1 class={styles.title}>{props.title}</h1>}
          {props.description && (
            <p class={styles.description}>{props.description}</p>
          )}
          <div class={styles.body}>{props.children}</div>
        </div>
      </main>
    </div>
  );
}
