import { createSignal, createEffect } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

export default function Effects() {
  // Example 1: Console Logging
  const [counter, setCounter] = createSignal(0);
  const [logs, setLogs] = createSignal<string[]>([]);

  createEffect(() => {
    const newLog = `[${new Date().toLocaleTimeString()}] Counter changed to ${counter()}`;
    setLogs([...logs(), newLog]);
    console.log(newLog);
  });

  // Example 2: LocalStorage Synchronization
  const [savedName, setSavedName] = createSignal('');

  createEffect(() => {
    localStorage.setItem('solidLearnName', savedName());
  });

  createEffect(() => {
    const stored = localStorage.getItem('solidLearnName');
    if (stored) setSavedName(stored);
  });

  // Example 3: API Simulation
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal<string[]>([]);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    if (!query()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      // Simulate API call
      const mockResults = [
        `${query()} result 1`,
        `${query()} result 2`,
        `${query()} result 3`,
      ];
      setResults(mockResults);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  });

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Console Logging */}
      <ExampleCard
        title="Console Logging"
        description="Use effects to log state changes (check browser console)"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <div style={{ 'text-align': 'center' }}>
              <div style={{ 'font-size': '2rem', 'font-weight': 'bold' }}>
                {counter()}
              </div>
              <p style={{ 'font-size': '0.875rem', 'margin-top': '0.5rem' }}>
                Check the browser console
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCounter(counter() - 1)}
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
              onClick={() => setCounter(counter() + 1)}
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
          <div
            style={{
              'background-color': 'var(--bg-primary)',
              'border-radius': '0.5rem',
              padding: '1rem',
              'max-height': '200px',
              'overflow-y': 'auto',
            }}
          >
            <div style={{ 'font-size': '0.75rem', 'font-family': 'var(--font-code)' }}>
              {logs().length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', margin: '0' }}>
                  Logs will appear here...
                </p>
              ) : (
                logs().map((log) => (
                  <div style={{ color: 'var(--accent-success)', margin: '0.25rem 0' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
          <CodeBlock language="typescript">
{`const [counter, setCounter] = createSignal(0);

createEffect(() => {
  console.log('Counter changed to', counter());
  // Runs whenever counter changes
});`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: LocalStorage Synchronization */}
      <ExampleCard
        title="LocalStorage Synchronization"
        description="Persist state to browser storage"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Enter your name..."
            value={savedName()}
            onInput={(e) => setSavedName(e.currentTarget.value)}
            style={{
              padding: '0.75rem',
              'border-radius': '0.5rem',
              border: '1px solid var(--border-color)',
              'background-color': 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          />
          <div class="demo">
            <div style={{ 'text-align': 'center' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>Saved value:</p>
              <code style={{ 'font-size': '1.25rem' }}>
                {savedName() || '(empty)'}
              </code>
              <p style={{ 'font-size': '0.875rem', margin: '0.5rem 0 0 0' }}>
                Saved to localStorage as 'solidLearnName'
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('solidLearnName');
              setSavedName('');
            }}
            style={{
              'background-color': 'var(--accent-error)',
              color: 'white',
              padding: '0.5rem 1rem',
              'border-radius': '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Clear Storage
          </button>
          <CodeBlock language="typescript">
{`const [savedName, setSavedName] = createSignal('');

// Save to localStorage
createEffect(() => {
  localStorage.setItem('name', savedName());
});

// Load from localStorage
createEffect(() => {
  const stored = localStorage.getItem('name');
  if (stored) setSavedName(stored);
});`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: API Simulation */}
      <ExampleCard
        title="Async Operations"
        description="Fetch data based on reactive state"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Search..."
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
            style={{
              padding: '0.75rem',
              'border-radius': '0.5rem',
              border: '1px solid var(--border-color)',
              'background-color': 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          />
          <div class="demo">
            {loading() ? (
              <div style={{ 'text-align': 'center' }}>
                <p>Loading...</p>
              </div>
            ) : results().length === 0 ? (
              <div style={{ 'text-align': 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {query() ? 'No results' : 'Enter a search term'}
                </p>
              </div>
            ) : (
              <ul style={{ 'list-style': 'none', padding: '0', margin: '0' }}>
                {results().map((result) => (
                  <li
                    style={{
                      padding: '0.75rem',
                      'border-bottom': '1px solid var(--border-color)',
                    }}
                  >
                    {result}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CodeBlock language="typescript">
{`const [query, setQuery] = createSignal('');
const [results, setResults] = createSignal([]);

createEffect(() => {
  if (!query()) {
    setResults([]);
    return;
  }

  // Fetch data when query changes
  fetchResults(query()).then(setResults);
});`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
