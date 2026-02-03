import { createSignal, createMemo, createEffect } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

export default function Memo() {
  // Example 1: Memoized Calculations
  const [count, setCount] = createSignal(0);
  const [renderCount, setRenderCount] = createSignal(0);

  const doubled = createMemo(() => {
    setRenderCount(renderCount() + 1);
    return count() * 2;
  });

  const tripled = createMemo(() => {
    return count() * 3;
  });

  // Example 2: Expensive Calculation
  const [number, setNumber] = createSignal(10);
  const [expensiveRenderCount, setExpensiveRenderCount] = createSignal(0);

  const fibonacci = createMemo(() => {
    setExpensiveRenderCount(expensiveRenderCount() + 1);
    const fib = (n: number): number => (n <= 1 ? n : fib(n - 1) + fib(n - 2));
    return fib(number());
  });

  // Example 3: Derived State
  const [items, setItems] = createSignal([
    { id: 1, name: 'Learn Signals', done: true },
    { id: 2, name: 'Learn Effects', done: false },
    { id: 3, name: 'Learn Stores', done: false },
  ]);

  const completedCount = createMemo(() => {
    return items().filter((item) => item.done).length;
  });

  const totalCount = createMemo(() => {
    return items().length;
  });

  const progress = createMemo(() => {
    return Math.round((completedCount() / totalCount()) * 100);
  });

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Memoized Calculations */}
      <ExampleCard
        title="Memoized Calculations"
        description="Optimize performance by caching computed values"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr 1fr', gap: '1rem' }}>
            <div class="demo">
              <div style={{ 'text-align': 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Count</p>
                <div style={{ 'font-size': '2rem', 'font-weight': 'bold' }}>
                  {count()}
                </div>
              </div>
            </div>
            <div class="demo">
              <div style={{ 'text-align': 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Doubled</p>
                <div style={{ 'font-size': '2rem', 'font-weight': 'bold' }}>
                  {doubled()}
                </div>
              </div>
            </div>
            <div class="demo">
              <div style={{ 'text-align': 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Tripled</p>
                <div style={{ 'font-size': '2rem', 'font-weight': 'bold' }}>
                  {tripled()}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCount(count() - 1)}
              style={{
                'background-color': 'var(--accent-error)',
                color: 'white',
                padding: '0.5rem 1rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              -
            </button>
            <button
              onClick={() => setCount(count() + 1)}
              style={{
                'background-color': 'var(--accent-primary)',
                color: 'white',
                padding: '0.5rem 1rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </div>
          <p style={{ 'font-size': '0.875rem', color: 'var(--text-secondary)' }}>
            Doubled computed {renderCount()} times (memo prevents unnecessary recomputation)
          </p>
          <CodeBlock language="typescript">
{`const [count, setCount] = createSignal(0);

// Memoized computation
const doubled = createMemo(() => {
  console.log('Computing doubled...');
  return count() * 2;
});

// Only recomputes when count changes
<div>{doubled()}</div>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: Expensive Calculation */}
      <ExampleCard
        title="Expensive Calculation"
        description="Cache expensive operations with memo"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem' }}>
                <span style={{ 'font-size': '0.875rem', 'font-weight': '500' }}>
                  Fibonacci Number (n):
                </span>
                <input
                  type="number"
                  value={number()}
                  onInput={(e) => setNumber(Number(e.currentTarget.value))}
                  min="0"
                  max="35"
                  style={{
                    padding: '0.75rem',
                    'border-radius': '0.5rem',
                    border: '1px solid var(--border-color)',
                    'background-color': 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                />
              </label>
            </div>
            <div class="demo">
              <div style={{ 'text-align': 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>fib({number()})</p>
                <div style={{ 'font-size': '1.5rem', 'font-weight': 'bold' }}>
                  {fibonacci()}
                </div>
              </div>
            </div>
          </div>
          <p style={{ 'font-size': '0.875rem', color: 'var(--text-secondary)' }}>
            Computed {expensiveRenderCount()} times
          </p>
          <CodeBlock language="typescript">
{`const fibonacci = createMemo(() => {
  const fib = (n: number): number =>
    n <= 1 ? n : fib(n - 1) + fib(n - 2);
  return fib(number());
});

// Prevents recalculating expensive function`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: Derived State */}
      <ExampleCard
        title="Derived State"
        description="Compute values derived from reactive state"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <div style={{ 'text-align': 'center', width: '100%' }}>
              <p style={{ margin: '0 0 1rem 0', 'font-weight': '500' }}>
                Progress: {progress()}%
              </p>
              <div
                style={{
                  width: '100%',
                  height: '24px',
                  'background-color': 'var(--bg-primary)',
                  'border-radius': '0.5rem',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress()}%`,
                    height: '100%',
                    'background-color': 'var(--accent-success)',
                    transition: 'width 0.3s ease',
                  }}
                ></div>
              </div>
              <p style={{ margin: '1rem 0 0 0', 'font-size': '0.875rem' }}>
                {completedCount()} / {totalCount()} completed
              </p>
            </div>
          </div>
          <ul style={{ 'list-style': 'none', padding: '0', margin: '0' }}>
            {items().map((item) => (
              <li
                style={{
                  padding: '0.75rem',
                  'border-bottom': '1px solid var(--border-color)',
                }}
              >
                <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) => {
                      setItems(
                        items().map((i) =>
                          i.id === item.id ? { ...i, done: e.currentTarget.checked } : i
                        )
                      );
                    }}
                  />
                  <span
                    style={{
                      'text-decoration': item.done ? 'line-through' : 'none',
                      color: item.done ? 'var(--text-secondary)' : 'var(--text-primary)',
                    }}
                  >
                    {item.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <CodeBlock language="typescript">
{`const completedCount = createMemo(() => {
  return items().filter((i) => i.done).length;
});

const progress = createMemo(() => {
  return Math.round((completedCount() / items().length) * 100);
});</`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
