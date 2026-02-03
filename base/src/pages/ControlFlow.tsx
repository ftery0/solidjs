import { createSignal } from 'solid-js';
import { Show, For, Switch, Match } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

export default function ControlFlow() {
  // Example 1: Show Component
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  // Example 2: For Loop
  const [todoItems, setTodoItems] = createSignal([
    { id: 1, text: 'Learn Signals' },
    { id: 2, text: 'Learn Effects' },
    { id: 3, text: 'Build a project' },
  ]);
  const [newTodo, setNewTodo] = createSignal('');

  const addTodo = () => {
    if (newTodo().trim()) {
      setTodoItems([
        ...todoItems(),
        { id: Date.now(), text: newTodo() },
      ]);
      setNewTodo('');
    }
  };

  // Example 3: Switch Component
  const [tab, setTab] = createSignal<'home' | 'about' | 'contact'>('home');

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Show Component */}
      <ExampleCard
        title="Show - Conditional Rendering"
        description="Display content based on conditions"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div class="demo">
            <Show
              when={isLoggedIn()}
              fallback={<p style={{ margin: '0', 'text-align': 'center' }}>Not logged in</p>}
            >
              <div style={{ 'text-align': 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0', 'font-weight': '500' }}>
                  Welcome back! 👋
                </p>
                <p style={{ margin: '0', 'font-size': '0.875rem' }}>
                  You are logged in to the system
                </p>
              </div>
            </Show>
          </div>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn())}
            style={{
              'background-color': isLoggedIn()
                ? 'var(--accent-error)'
                : 'var(--accent-primary)',
              color: 'white',
              padding: '0.5rem 1rem',
              'border-radius': '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isLoggedIn() ? 'Logout' : 'Login'}
          </button>
          <CodeBlock language="typescript">
{`const [isLoggedIn, setIsLoggedIn] = createSignal(false);

<Show
  when={isLoggedIn()}
  fallback={<p>Not logged in</p>}
>
  <p>Welcome back!</p>
</Show>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: For Loop */}
      <ExampleCard
        title="For - List Rendering"
        description="Render lists efficiently with For component"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo()}
              onInput={(e) => setNewTodo(e.currentTarget.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addTodo();
              }}
              style={{
                flex: '1',
                padding: '0.75rem',
                'border-radius': '0.5rem',
                border: '1px solid var(--border-color)',
                'background-color': 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              onClick={addTodo}
              style={{
                'background-color': 'var(--accent-primary)',
                color: 'white',
                padding: '0.5rem 1rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
          <div
            style={{
              'background-color': 'var(--bg-primary)',
              'border-radius': '0.5rem',
              overflow: 'hidden',
            }}
          >
            <Show
              when={todoItems().length > 0}
              fallback={
                <div
                  style={{
                    padding: '2rem',
                    'text-align': 'center',
                    color: 'var(--text-secondary)',
                  }}
                >
                  No todos yet
                </div>
              }
            >
              <ul style={{ 'list-style': 'none', padding: '0', margin: '0' }}>
                <For each={todoItems()}>
                  {(item) => (
                    <li
                      style={{
                        padding: '1rem',
                        'border-bottom': '1px solid var(--border-color)',
                      }}
                    >
                      <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
                        <span>{item.text}</span>
                        <button
                          onClick={() => {
                            setTodoItems(
                              todoItems().filter((t) => t.id !== item.id)
                            );
                          }}
                          style={{
                            'background-color': 'var(--accent-error)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            'border-radius': '0.375rem',
                            border: 'none',
                            cursor: 'pointer',
                            'font-size': '0.75rem',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </For>
              </ul>
            </Show>
          </div>
          <CodeBlock language="typescript">
{`<For each={todos()}>
  {(todo) => (
    <div key={todo.id}>
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </div>
  )}
</For>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: Switch/Match */}
      <ExampleCard
        title="Switch/Match - Multi-branch Rendering"
        description="Render different content based on multiple conditions"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setTab('home')}
              style={{
                'background-color': tab() === 'home'
                  ? 'var(--accent-primary)'
                  : 'var(--border-color)',
                color: tab() === 'home' ? 'white' : 'var(--text-primary)',
                padding: '0.5rem 1rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Home
            </button>
            <button
              onClick={() => setTab('about')}
              style={{
                'background-color': tab() === 'about'
                  ? 'var(--accent-primary)'
                  : 'var(--border-color)',
                color: tab() === 'about' ? 'white' : 'var(--text-primary)',
                padding: '0.5rem 1rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              About
            </button>
            <button
              onClick={() => setTab('contact')}
              style={{
                'background-color': tab() === 'contact'
                  ? 'var(--accent-primary)'
                  : 'var(--border-color)',
                color: tab() === 'contact' ? 'white' : 'var(--text-primary)',
                padding: '0.5rem 1rem',
                'border-radius': '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Contact
            </button>
          </div>
          <div class="demo">
            <Switch>
              <Match when={tab() === 'home'}>
                <div style={{ 'text-align': 'center' }}>
                  <p style={{ 'font-size': '1.25rem', 'font-weight': '600', margin: '0' }}>
                    🏠 Home
                  </p>
                  <p style={{ 'font-size': '0.875rem', margin: '0.5rem 0 0 0' }}>
                    Welcome to the home page
                  </p>
                </div>
              </Match>
              <Match when={tab() === 'about'}>
                <div style={{ 'text-align': 'center' }}>
                  <p style={{ 'font-size': '1.25rem', 'font-weight': '600', margin: '0' }}>
                    ℹ️ About
                  </p>
                  <p style={{ 'font-size': '0.875rem', margin: '0.5rem 0 0 0' }}>
                    Learn more about Solid.js fundamentals
                  </p>
                </div>
              </Match>
              <Match when={tab() === 'contact'}>
                <div style={{ 'text-align': 'center' }}>
                  <p style={{ 'font-size': '1.25rem', 'font-weight': '600', margin: '0' }}>
                    📧 Contact
                  </p>
                  <p style={{ 'font-size': '0.875rem', margin: '0.5rem 0 0 0' }}>
                    Get in touch with us
                  </p>
                </div>
              </Match>
            </Switch>
          </div>
          <CodeBlock language="typescript">
{`const [tab, setTab] = createSignal('home');

<Switch>
  <Match when={tab() === 'home'}>
    <div>Home content</div>
  </Match>
  <Match when={tab() === 'about'}>
    <div>About content</div>
  </Match>
</Switch>`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
