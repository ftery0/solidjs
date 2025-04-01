import type { Component } from 'solid-js';
import MyComponent from "./study";

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <MyComponent name="Solid" />
    </div>
  );
};

export default App;
