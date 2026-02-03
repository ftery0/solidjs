import { A } from '@solidjs/router';
import { ROUTES } from '../constants/routes';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div class={styles.grid}>
      {ROUTES.filter((route) => route.path !== '/').map((route) => (
        <A href={route.path} class={styles.card}>
          <div class={styles.icon}>{route.icon}</div>
          <h3 class={styles.title}>{route.label}</h3>
          <p class={styles.description}>{route.description}</p>
          <div class={styles.cta}>Learn More →</div>
        </A>
      ))}
    </div>
  );
}
