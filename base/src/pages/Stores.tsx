import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { For, Show } from 'solid-js';
import ExampleCard from '../components/ExampleCard';
import CodeBlock from '../components/CodeBlock';

export default function Stores() {
  // Example 1: Simple Store
  const [user, setUser] = createStore({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
  });

  const [editingUser, setEditingUser] = createSignal(false);
  const [tempName, setTempName] = createSignal(user.name);
  const [tempEmail, setTempEmail] = createSignal(user.email);

  const saveUser = () => {
    setUser('name', tempName());
    setUser('email', tempEmail());
    setEditingUser(false);
  };

  // Example 2: Todo Store
  const [todos, setTodos] = createStore<
    Array<{ id: number; text: string; completed: boolean }>
  >([
    { id: 1, text: 'Learn Solid.js', completed: true },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Read the docs', completed: false },
  ]);

  const [newTodoText, setNewTodoText] = createSignal('');

  const addTodo = () => {
    if (newTodoText().trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          text: newTodoText(),
          completed: false,
        },
      ]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      (todo) => todo.id === id,
      'completed',
      (completed) => !completed
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((todos) => todos.filter((t) => t.id !== id));
  };

  const completedCount = () => todos.filter((t) => t.completed).length;

  // Example 3: Nested Store (User Profile)
  const [profile, setProfile] = createStore({
    personal: {
      name: 'Jane Smith',
      age: 28,
    },
    contact: {
      phone: '+1-555-0123',
      address: '123 Main St',
    },
    settings: {
      notifications: true,
      theme: 'light' as 'light' | 'dark',
    },
  });

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
      {/* Example 1: Simple Store */}
      <ExampleCard
        title="User Profile Store"
        description="Manage complex object state with createStore"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          {editingUser() ? (
            <>
              <div style={{ display: 'flex', 'flex-direction': 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', 'margin-bottom': '0.25rem', 'font-size': '0.875rem' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={tempName()}
                    onInput={(e) => setTempName(e.currentTarget.value)}
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
                  <label style={{ display: 'block', 'margin-bottom': '0.25rem', 'font-size': '0.875rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={tempEmail()}
                    onInput={(e) => setTempEmail(e.currentTarget.value)}
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
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={saveUser}
                  style={{
                    'background-color': 'var(--accent-success)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    'border-radius': '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingUser(false)}
                  style={{
                    'background-color': 'var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '0.5rem 1rem',
                    'border-radius': '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div class="demo">
                <div style={{ 'text-align': 'center' }}>
                  <p style={{ margin: '0 0 0.25rem 0', 'font-size': '0.875rem' }}>
                    {user.role}
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0', 'font-weight': '600' }}>
                    {user.name}
                  </p>
                  <p style={{ margin: '0', 'font-size': '0.875rem' }}>
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(true)}
                style={{
                  'background-color': 'var(--accent-primary)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  'border-radius': '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>
            </>
          )}
          <CodeBlock language="typescript">
{`const [user, setUser] = createStore({
  name: 'John',
  email: 'john@example.com',
});

// Update individual properties
setUser('name', 'Jane');

// In JSX
<div>{user.name}</div>`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 2: Todo List with Store */}
      <ExampleCard
        title="Todo List Store"
        description="Complete CRUD operations with createStore"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Add a new todo..."
              value={newTodoText()}
              onInput={(e) => setNewTodoText(e.currentTarget.value)}
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
          <div class="demo">
            <div style={{ width: '100%', 'text-align': 'center' }}>
              <p style={{ margin: '0', 'font-weight': '500' }}>
                {completedCount()} / {todos.length} completed
              </p>
            </div>
          </div>
          <ul style={{ 'list-style': 'none', padding: '0', margin: '0' }}>
            <For each={todos}>
              {(todo) => (
                <li
                  style={{
                    padding: '0.75rem',
                    'border-bottom': '1px solid var(--border-color)',
                    display: 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                  }}
                >
                  <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer', flex: '1' }}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span
                      style={{
                        'text-decoration': todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                      }}
                    >
                      {todo.text}
                    </span>
                  </label>
                  <button
                    onClick={() => deleteTodo(todo.id)}
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
                </li>
              )}
            </For>
          </ul>
          <CodeBlock language="typescript">
{`const [todos, setTodos] = createStore([
  { id: 1, text: 'Learn Solid', completed: false },
]);

// Add todo
setTodos(todos => [...todos, newTodo]);

// Toggle completion
setTodos(
  todo => todo.id === id,
  'completed',
  completed => !completed
);`}
          </CodeBlock>
        </div>
      </ExampleCard>

      {/* Example 3: Nested Store */}
      <ExampleCard
        title="Nested Store Structure"
        description="Manage nested object state efficiently"
      >
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'grid',
              'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div
              style={{
                'background-color': 'var(--bg-primary)',
                'border-radius': '0.5rem',
                padding: '1rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', 'font-size': '0.875rem', 'font-weight': '600' }}>
                Personal
              </h4>
              <p style={{ margin: '0.25rem 0', 'font-size': '0.875rem' }}>
                <strong>Name:</strong> {profile.personal.name}
              </p>
              <p style={{ margin: '0.25rem 0', 'font-size': '0.875rem' }}>
                <strong>Age:</strong> {profile.personal.age}
              </p>
            </div>
            <div
              style={{
                'background-color': 'var(--bg-primary)',
                'border-radius': '0.5rem',
                padding: '1rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', 'font-size': '0.875rem', 'font-weight': '600' }}>
                Contact
              </h4>
              <p style={{ margin: '0.25rem 0', 'font-size': '0.875rem' }}>
                <strong>Phone:</strong> {profile.contact.phone}
              </p>
              <p style={{ margin: '0.25rem 0', 'font-size': '0.875rem' }}>
                <strong>Address:</strong> {profile.contact.address}
              </p>
            </div>
            <div
              style={{
                'background-color': 'var(--bg-primary)',
                'border-radius': '0.5rem',
                padding: '1rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', 'font-size': '0.875rem', 'font-weight': '600' }}>
                Settings
              </h4>
              <p style={{ margin: '0.25rem 0', 'font-size': '0.875rem' }}>
                <strong>Notifications:</strong> {profile.settings.notifications ? 'On' : 'Off'}
              </p>
              <p style={{ margin: '0.25rem 0', 'font-size': '0.875rem' }}>
                <strong>Theme:</strong> {profile.settings.theme}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setProfile('settings', 'theme', (t) => (t === 'light' ? 'dark' : 'light'));
            }}
            style={{
              'background-color': 'var(--accent-secondary)',
              color: 'white',
              padding: '0.5rem 1rem',
              'border-radius': '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Toggle Theme ({profile.settings.theme})
          </button>
          <CodeBlock language="typescript">
{`const [profile, setProfile] = createStore({
  personal: { name: 'Jane', age: 28 },
  contact: { phone: '123', address: '...' },
  settings: { theme: 'light' },
});

// Update nested properties
setProfile('settings', 'theme', 'dark');

// Or use function for computed update
setProfile('personal', 'age', age => age + 1);`}
          </CodeBlock>
        </div>
      </ExampleCard>
    </div>
  );
}
