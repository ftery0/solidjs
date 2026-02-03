import { createSignal } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

export default function Signals() {
  // Example 1: Basic Counter
  const [counter, setCounter] = createSignal(0);

  // Example 2: Input Synchronization
  const [input, setInput] = createSignal('');

  // Example 3: Multiple Signals
  const [firstName, setFirstName] = createSignal('');
  const [lastName, setLastName] = createSignal('');
  const fullName = () => `${firstName()} ${lastName()}`.trim();

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Basic Counter */}
      <ExampleCard
        title="Basic Counter"
        description="The simplest reactive state with createSignal()"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <div style={{ 'font-size': '2rem', 'font-weight': 'bold' }}>
              {counter()}
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
              onClick={() => setCounter(0)}
              style={{
                'background-color': 'var(--border-color)',
                color: 'var(--text-primary)',
                padding: '0.5rem 1rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reset
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
          <CodeBlock language="typescript">
{`const [counter, setCounter] = createSignal(0);

// Accessing the signal
console.log(counter()); // 0

// Updating the signal
setCounter(1);
setCounter(counter() + 1);`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: Input Synchronization */}
      <ExampleCard
        title="Input Synchronization"
        description="Sync input value with a signal in real-time"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Type something..."
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
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
              <p style={{ margin: '0 0 0.5rem 0' }}>You typed:</p>
              <code style={{ 'font-size': '1.25rem' }}>{input() || '(empty)'}</code>
              <p style={{ margin: '0.5rem 0 0 0', 'font-size': '0.875rem' }}>
                Length: {input().length}
              </p>
            </div>
          </div>
          <CodeBlock language="typescript">
{`const [input, setInput] = createSignal('');

// In JSX
<input
  value={input()}
  onInput={(e) => setInput(e.currentTarget.value)}
/>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: Multiple Signals */}
      <ExampleCard
        title="Multiple Signals"
        description="Combine multiple signals for reactive values"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              placeholder="First name"
              value={firstName()}
              onInput={(e) => setFirstName(e.currentTarget.value)}
              style={{
                padding: '0.75rem',
                'border-radius': '0.5rem',
                border: '1px solid var(--border-color)',
                'background-color': 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName()}
              onInput={(e) => setLastName(e.currentTarget.value)}
              style={{
                padding: '0.75rem',
                'border-radius': '0.5rem',
                border: '1px solid var(--border-color)',
                'background-color': 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div class="demo">
            <div style={{ 'text-align': 'center' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>Full name:</p>
              <code style={{ 'font-size': '1.25rem' }}>
                {fullName() || '(enter names)'}
              </code>
            </div>
          </div>
          <CodeBlock language="typescript">
{`const [firstName, setFirstName] = createSignal('');
const [lastName, setLastName] = createSignal('');

// Combine signals
const fullName = () => \`\${firstName()} \${lastName()}\`.trim();

// Use in JSX
<div>{fullName()}</div>`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
