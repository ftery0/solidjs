import { A } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { NAV_ROUTES } from '../constants/routes';
import ThemeToggle from './ThemeToggle';
import styles from '../styles/Nav.module.css';

export default function Nav() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <nav class={styles.nav} classList={{ [styles.open]: isOpen() }}>
      <div class={styles.container}>
        <div class={styles.header}>
          <A href="/" class={styles.logo} onClick={() => setIsOpen(false)}>
            <span class={styles.logoEmoji}>📖</span>
            <span class={styles.logoText}>Blog</span>
          </A>
          <div class={styles.actions}>
            <ThemeToggle />
            <button
              class={styles.hamburger}
              onClick={() => setIsOpen(!isOpen())}
              aria-label="Toggle navigation"
              aria-expanded={isOpen()}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <ul class={styles.menu}>
          {NAV_ROUTES.map((route) => (
            <li key={route.path}>
              <A
                href={route.path}
                class={styles.link}
                onClick={() => setIsOpen(false)}
              >
                <span class={styles.icon}>{route.icon}</span>
                <span class={styles.label}>{route.label}</span>
              </A>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
