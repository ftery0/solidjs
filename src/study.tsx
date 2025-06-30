import { createSignal } from "solid-js";

export default function Study() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount(count() + 1);
  };

  return (
    <div>
      <h1>Study Page</h1>
      <p>This is where we'll learn SolidJS!</p>
      <div>
        <span>Count: {count()}</span>
        <button onClick={increment}>Increment</button>
      </div>
    </div>
  );
}