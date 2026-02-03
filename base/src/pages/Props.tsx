import { createSignal, ParentProps } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

// Reusable Button Component
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: any;
}

function Button(props: ButtonProps & ParentProps) {
  const getBackgroundColor = () => {
    switch (props.variant) {
      case 'secondary':
        return 'var(--border-color)';
      case 'danger':
        return 'var(--accent-error)';
      case 'primary':
      default:
        return 'var(--accent-primary)';
    }
  };

  const getPadding = () => {
    switch (props.size) {
      case 'sm':
        return '0.25rem 0.75rem';
      case 'lg':
        return '1rem 1.5rem';
      case 'md':
      default:
        return '0.5rem 1rem';
    }
  };

  return (
    <button
      onClick={props.onClick}
      style={{
        'background-color': getBackgroundColor(),
        color:
          props.variant === 'secondary'
            ? 'var(--text-primary)'
            : 'white',
        padding: getPadding(),
        'border-radius': '0.5rem',
        border: 'none',
        cursor: 'pointer',
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
      {props.children}
    </button>
  );
}

// Card Component
interface CardProps extends ParentProps {
  title: string;
}

function Card(props: CardProps) {
  return (
    <div
      style={{
        'background-color': 'var(--bg-secondary)',
        'border-radius': '0.5rem',
        padding: '1rem',
        'border': '1px solid var(--border-color)',
      }}
    >
      <h4
        style={{
          margin: '0 0 0.5rem 0',
          'font-size': '1rem',
          'font-weight': '600',
        }}
      >
        {props.title}
      </h4>
      <div style={{ 'font-size': '0.875rem' }}>{props.children}</div>
    </div>
  );
}

export default function Props() {
  // Example 1: Button Variants
  const [buttonClicks, setButtonClicks] = createSignal(0);

  // Example 2: Card Component
  const [cards, setCards] = createSignal([
    { id: 1, title: 'Welcome', content: 'Solid.js makes building components easy' },
    { id: 2, title: 'Reactive', content: 'Signals provide fine-grained reactivity' },
    { id: 3, title: 'Performant', content: 'Compiles to minimal JavaScript' },
  ]);

  // Example 3: Props Composition
  const [count, setCount] = createSignal(0);

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Button Component */}
      <ExampleCard
        title="Button Component with Variants"
        description="Reusable component with configurable props"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '0.5rem' }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setButtonClicks(buttonClicks() + 1)}
              >
                Primary (sm)
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setButtonClicks(buttonClicks() + 1)}
              >
                Primary (md)
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setButtonClicks(buttonClicks() + 1)}
              >
                Primary (lg)
              </Button>
              <Button
                variant="secondary"
                onClick={() => setButtonClicks(buttonClicks() + 1)}
              >
                Secondary
              </Button>
              <Button
                variant="danger"
                onClick={() => setButtonClicks(buttonClicks() + 1)}
              >
                Danger
              </Button>
            </div>
            <p style={{ margin: '1rem 0 0 0', 'font-size': '0.875rem', 'text-align': 'center' }}>
              Total clicks: {buttonClicks()}
            </p>
          </div>
          <CodeBlock language="typescript">
{`interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: any;
}

function Button(props: ButtonProps) {
  return (
    <button
      style={{
        backgroundColor: props.variant === 'danger'
          ? 'red' : 'blue',
        padding: props.size === 'lg'
          ? '1rem' : '0.5rem',
      }}
    >
      {props.children}
    </button>
  );
}`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: Card Component */}
      <ExampleCard
        title="Card Component"
        description="Component that accepts children as props"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'grid',
              'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {cards().map((card) => (
              <Card title={card.title}>{card.content}</Card>
            ))}
          </div>
          <CodeBlock language="typescript">
{`function Card(props: ParentProps & { title: string }) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>{props.children}</div>
    </div>
  );
}

// Usage
<Card title="Welcome">
  Hello, Solid.js!
</Card>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: Props Composition */}
      <ExampleCard
        title="Props Composition"
        description="Compose components using props for flexibility"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <div style={{ 'text-align': 'center' }}>
              <div style={{ 'font-size': '2rem', 'font-weight': 'bold' }}>
                {count()}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                variant="primary"
                onClick={() => setCount(count() + 1)}
              >
                Increment
              </Button>
              <Button
                variant="secondary"
                onClick={() => setCount(0)}
              >
                Reset
              </Button>
              <Button
                variant="danger"
                onClick={() => setCount(count() - 1)}
              >
                Decrement
              </Button>
            </div>
            <p style={{ 'font-size': '0.875rem', margin: '0', color: 'var(--text-secondary)' }}>
              Try different button variants with various click handlers
            </p>
          </div>
          <CodeBlock language="typescript">
{`function Counter(props: { onIncrement: () => void }) {
  return (
    <button onClick={props.onIncrement}>
      Increment
    </button>
  );
}

// Props provide flexibility and reusability`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 4: Props Spreading */}
      <ExampleCard
        title="Props Best Practices"
        description="Tips for working with props effectively"
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
                ✓ Make props optional with default values
              </li>
              <li style={{ 'padding': '0.5rem', 'border-bottom': '1px solid var(--border-color)' }}>
                ✓ Use TypeScript for type safety
              </li>
              <li style={{ 'padding': '0.5rem', 'border-bottom': '1px solid var(--border-color)' }}>
                ✓ Pass event handlers as callback props
              </li>
              <li style={{ 'padding': '0.5rem' }}>
                ✓ Use children prop for flexible content
              </li>
            </ul>
          </div>
          <CodeBlock language="typescript">
{`// Good: Clear, typed props
interface MyComponentProps {
  title: string;
  onSubmit?: () => void;
  size?: 'sm' | 'md' | 'lg';
  children: any;
}

// Avoid: Using 'any' or unclear prop names
function MyComponent(props: any) {
  // ...
}`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
