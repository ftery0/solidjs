import { createEffect, createSignal } from 'solid-js';
import styles from '../styles/ThemeToggle.module.css';

export default function ThemeToggle() {
  const [isDark, setIsDark] = createSignal(false);

  createEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = saved ? saved === 'dark' : prefersDark;
    setIsDark(isDarkMode);
    applyTheme(isDarkMode);
  });

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newDark = !isDark();
    setIsDark(newDark);
    applyTheme(newDark);
  };

  return (
    <button
      class={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark() ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark() ? 'Light mode' : 'Dark mode'}
    >
      {isDark() ? '☀️' : '🌙'}
    </button>
  );
}
