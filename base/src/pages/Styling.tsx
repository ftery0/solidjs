import { createSignal, createMemo } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

export default function Styling() {
  // Example 1: Conditional Classes
  const [isActive, setIsActive] = createSignal(false);
  const [size, setSize] = createSignal<'sm' | 'md' | 'lg'>('md');

  const buttonClass = createMemo(() => {
    return `button ${isActive() ? 'active' : ''} ${size()}`;
  });

  // Example 2: Inline Styles
  const [bgColor, setBgColor] = createSignal('#3B82F6');
  const [textSize, setTextSize] = createSignal(16);

  const textStyle = createMemo(() => ({
    fontSize: `${textSize()}px`,
    color: bgColor(),
    fontWeight: '600',
  }));

  // Example 3: CSS Variables
  const [primaryColor, setPrimaryColor] = createSignal('#3B82F6');
  const [borderWidth, setBorderWidth] = createSignal(2);

  const containerStyle = createMemo(() => ({
    '--custom-primary': primaryColor(),
    '--custom-border': `${borderWidth()}px`,
  } as any));

  // Example 4: Dynamic Styling
  const [progress, setProgress] = createSignal(0);

  const progressBarStyle = createMemo(() => ({
    width: `${progress()}%`,
    'background-color': progress() < 33
      ? '#EF4444'
      : progress() < 66
      ? '#F59E0B'
      : '#10B981',
  }));

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Conditional Classes */}
      <ExampleCard
        title="Conditional Styling"
        description="Apply styles based on reactive state"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <style>{`
              .button {
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                border: 2px solid var(--border-color);
                background-color: var(--bg-secondary);
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
              }
              .button.active {
                background-color: var(--accent-primary);
                color: white;
                border-color: var(--accent-primary);
                transform: scale(1.05);
              }
              .button.sm {
                padding: 0.25rem 0.75rem;
                font-size: 0.875rem;
              }
              .button.md {
                padding: 0.5rem 1rem;
                font-size: 1rem;
              }
              .button.lg {
                padding: 0.75rem 1.5rem;
                font-size: 1.125rem;
              }
            `}</style>
            <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '0.5rem' }}>
              <button
                class={buttonClass()}
                onClick={() => setIsActive(!isActive())}
              >
                Toggle Active
              </button>
            </div>
            <p style={{ 'font-size': '0.875rem', margin: '0.75rem 0 0 0', 'text-align': 'center' }}>
              State: {isActive() ? 'Active' : 'Inactive'} | Size: {size()}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                onClick={() => setSize(s)}
                style={{
                  'background-color': size() === s
                    ? 'var(--accent-primary)'
                    : 'var(--border-color)',
                  color: size() === s ? 'white' : 'var(--text-primary)',
                  padding: '0.5rem 1rem',
                  'border-radius': '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  'font-size': '0.875rem',
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <CodeBlock language="typescript">
{`const [isActive, setIsActive] = createSignal(false);

// Method 1: classList object
<button classList={{ active: isActive() }}>
  Click me
</button>

// Method 2: Ternary
<button class={isActive() ? 'active' : ''}>
  Click me
</button>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: Inline Styles */}
      <ExampleCard
        title="Inline Styles"
        description="Apply styles dynamically with inline style objects"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <div style={textStyle()}>
              Dynamic Text Styling
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              'grid-template-columns': '1fr 1fr',
              gap: '1rem',
            }}
          >
            <div>
              <label style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem' }}>
                <span style={{ 'font-size': '0.875rem', 'font-weight': '500' }}>
                  Text Size: {textSize()}px
                </span>
                <input
                  type="range"
                  min="12"
                  max="32"
                  value={textSize()}
                  onInput={(e) => setTextSize(Number(e.currentTarget.value))}
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <div>
              <label style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem' }}>
                <span style={{ 'font-size': '0.875rem', 'font-weight': '500' }}>
                  Color
                </span>
                <input
                  type="color"
                  value={bgColor()}
                  onInput={(e) => setBgColor(e.currentTarget.value)}
                  style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                />
              </label>
            </div>
          </div>
          <CodeBlock language="typescript">
{`const textStyle = createMemo(() => ({
  fontSize: \`\${textSize()}px\`,
  color: bgColor(),
  fontWeight: '600',
}));

<div style={textStyle()}>
  Dynamic Text
</div>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: CSS Variables */}
      <ExampleCard
        title="CSS Variables"
        description="Use CSS custom properties with dynamic values"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <style>{`
            .custom-box {
              background-color: var(--custom-primary, var(--bg-secondary));
              border: var(--custom-border, 2px) solid var(--custom-primary, var(--border-color));
              border-radius: 0.5rem;
              padding: 1.5rem;
              text-align: center;
              color: white;
              font-weight: 600;
            }
          `}</style>
          <div
            class="custom-box"
            style={containerStyle()}
          >
            Custom Styled Box
          </div>
          <div
            style={{
              display: 'grid',
              'grid-template-columns': '1fr 1fr',
              gap: '1rem',
            }}
          >
            <div>
              <label style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem' }}>
                <span style={{ 'font-size': '0.875rem', 'font-weight': '500' }}>
                  Primary Color
                </span>
                <input
                  type="color"
                  value={primaryColor()}
                  onInput={(e) => setPrimaryColor(e.currentTarget.value)}
                  style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                />
              </label>
            </div>
            <div>
              <label style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem' }}>
                <span style={{ 'font-size': '0.875rem', 'font-weight': '500' }}>
                  Border: {borderWidth()}px
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={borderWidth()}
                  onInput={(e) => setBorderWidth(Number(e.currentTarget.value))}
                  style={{ width: '100%' }}
                />
              </label>
            </div>
          </div>
          <CodeBlock language="typescript">
{`const containerStyle = () => ({
  '--custom-primary': primaryColor(),
  '--custom-border': \`\${borderWidth()}px\`,
} as any);

// CSS
.box {
  border: var(--custom-border) solid var(--custom-primary);
}

<div style={containerStyle()} class="box" />`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 4: Dynamic Styling with Computed Values */}
      <ExampleCard
        title="Computed Dynamic Styles"
        description="Calculate styles based on reactive values"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo" style={{ 'flex-direction': 'column' }}>
            <div
              style={{
                width: '100%',
                height: '32px',
                'background-color': 'var(--bg-primary)',
                'border-radius': '0.5rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                  ...progressBarStyle(),
                }}
              />
            </div>
            <p style={{ 'margin-top': '0.5rem', 'text-align': 'center', margin: '0.5rem 0 0 0' }}>
              Progress: {progress()}%
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
            {[0, 25, 50, 75, 100].map((value) => (
              <button
                onClick={() => setProgress(value)}
                style={{
                  'background-color':
                    progress() === value
                      ? 'var(--accent-primary)'
                      : 'var(--border-color)',
                  color:
                    progress() === value
                      ? 'white'
                      : 'var(--text-primary)',
                  padding: '0.5rem 1rem',
                  'border-radius': '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  'font-size': '0.875rem',
                }}
              >
                {value}%
              </button>
            ))}
          </div>
          <CodeBlock language="typescript">
{`const progressBarStyle = createMemo(() => ({
  width: \`\${progress()}%\`,
  backgroundColor: progress() < 50 ? 'red' : 'green',
}));

<div style={progressBarStyle()} />`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 5: Styling Tips */}
      <ExampleCard
        title="Styling Best Practices"
        description="Tips for effective styling in Solid.js"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div
            style={{
              'background-color': 'var(--bg-primary)',
              'border-radius': '0.5rem',
              padding: '1rem',
            }}
          >
            <ul style={{ 'list-style': 'none', padding: '0', margin: '0' }}>
              <li style={{ 'padding': '0.5rem', 'border-bottom': '1px solid var(--border-color)' }}>
                ✓ Use classList for multiple classes
              </li>
              <li style={{ 'padding': '0.5rem', 'border-bottom': '1px solid var(--border-color)' }}>
                ✓ Prefer CSS variables for theming
              </li>
              <li style={{ 'padding': '0.5rem', 'border-bottom': '1px solid var(--border-color)' }}>
                ✓ Use createMemo for complex style objects
              </li>
              <li style={{ 'padding': '0.5rem', 'border-bottom': '1px solid var(--border-color)' }}>
                ✓ CSS Modules for component scoping
              </li>
              <li style={{ 'padding': '0.5rem' }}>
                ✓ Keep inline styles simple and dynamic
              </li>
            </ul>
          </div>
          <CodeBlock language="typescript">
{`// Good: Use classList for conditional classes
<button classList={{ active: isActive() }} />

// Good: Use createMemo for expensive calculations
const styles = createMemo(() => ({ /* ... */ }));

// Avoid: Inline object literals in every render
<div style={{ color: color() }} />`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
