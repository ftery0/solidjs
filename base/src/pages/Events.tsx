import { createSignal } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

export default function Events() {
  // Example 1: Click Events
  const [clickCount, setClickCount] = createSignal(0);
  const [lastClick, setLastClick] = createSignal('');

  const handleClick = () => {
    setClickCount(clickCount() + 1);
    setLastClick(new Date().toLocaleTimeString());
  };

  // Example 2: Form Events
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = createSignal(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  // Example 3: Keyboard Events
  const [searchQuery, setSearchQuery] = createSignal('');
  const [keyPresses, setKeyPresses] = createSignal<string[]>([]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (keyPresses().length > 9) {
      setKeyPresses(keyPresses().slice(1));
    }
    setKeyPresses([...keyPresses(), e.key]);
  };

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Click Events */}
      <ExampleCard
        title="Click Events"
        description="Handle button clicks and click events"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '1rem' }}>
            <div class="demo">
              <div style={{ 'text-align': 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Total Clicks</p>
                <div style={{ 'font-size': '2rem', 'font-weight': 'bold' }}>
                  {clickCount()}
                </div>
              </div>
            </div>
            <div class="demo">
              <div style={{ 'text-align': 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0', 'font-size': '0.875rem' }}>
                  Last Click
                </p>
                <code style={{ 'font-size': '0.875rem' }}>
                  {lastClick() || 'Not clicked yet'}
                </code>
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            style={{
              'background-color': 'var(--accent-primary)',
              color: 'white',
              padding: '1rem',
              'border-radius': '0.5rem',
              border: 'none',
              cursor: 'pointer',
              'font-size': '1rem',
              'font-weight': '500',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
            }}
          >
            Click Me!
          </button>
          <CodeBlock language="typescript">
{`const [count, setCount] = createSignal(0);

const handleClick = () => {
  setCount(count() + 1);
};

<button onClick={handleClick}>
  Clicks: {count()}
</button>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: Form Events */}
      <ExampleCard
        title="Form Events"
        description="Handle form submission and input changes"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', 'margin-bottom': '0.5rem', 'font-weight': '500' }}>
                Name
              </label>
              <input
                type="text"
                value={formData().name}
                onInput={(e) =>
                  setFormData({ ...formData(), name: e.currentTarget.value })
                }
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  'border-radius': '0.5rem',
                  border: '1px solid var(--border-color)',
                  'background-color': 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  'box-sizing': 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', 'margin-bottom': '0.5rem', 'font-weight': '500' }}>
                Email
              </label>
              <input
                type="email"
                value={formData().email}
                onInput={(e) =>
                  setFormData({ ...formData(), email: e.currentTarget.value })
                }
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  'border-radius': '0.5rem',
                  border: '1px solid var(--border-color)',
                  'background-color': 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  'box-sizing': 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', 'margin-bottom': '0.5rem', 'font-weight': '500' }}>
                Message
              </label>
              <textarea
                value={formData().message}
                onInput={(e) =>
                  setFormData({ ...formData(), message: e.currentTarget.value })
                }
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  'border-radius': '0.5rem',
                  border: '1px solid var(--border-color)',
                  'background-color': 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  'box-sizing': 'border-box',
                  'min-height': '100px',
                  'font-family': 'var(--font-ui)',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                'background-color': 'var(--accent-primary)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
                'font-weight': '500',
              }}
            >
              Submit
            </button>
          </form>
          {submitted() && (
            <div
              style={{
                'background-color': 'var(--accent-success)',
                color: 'white',
                padding: '1rem',
                'border-radius': '0.5rem',
                'text-align': 'center',
              }}
            >
              Form submitted successfully! ✓
            </div>
          )}
          <CodeBlock language="typescript">
{`const [form, setForm] = createSignal({ name: '', email: '' });

const handleSubmit = (e: Event) => {
  e.preventDefault();
  // Process form data
};

<form onSubmit={handleSubmit}>
  <input
    value={form().name}
    onInput={(e) => setForm({
      ...form(),
      name: e.currentTarget.value
    })}
  />
</form>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: Keyboard Events */}
      <ExampleCard
        title="Keyboard Events"
        description="Capture and respond to keyboard input"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Start typing..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
            style={{
              padding: '0.75rem',
              'border-radius': '0.5rem',
              border: '1px solid var(--border-color)',
              'background-color': 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          />
          <div class="demo">
            <div style={{ 'text-align': 'center', 'flex-direction': 'column' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>Last 10 keys pressed:</p>
              <div
                style={{
                  display: 'flex',
                  gap: '0.25rem',
                  'flex-wrap': 'wrap',
                  'justify-content': 'center',
                }}
              >
                {keyPresses().length === 0 ? (
                  <span style={{ color: 'var(--text-secondary)' }}>None yet</span>
                ) : (
                  keyPresses().map((key) => (
                    <code
                      style={{
                        'background-color': 'var(--accent-secondary)',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        'border-radius': '0.25rem',
                        'font-size': '0.875rem',
                      }}
                    >
                      {key === ' ' ? '␣' : key}
                    </code>
                  ))
                )}
              </div>
            </div>
          </div>
          <CodeBlock language="typescript">
{`const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    // Handle enter key
    search();
  }
  // Process other keys
};

<input onKeyPress={handleKeyPress} />`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
