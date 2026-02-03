export interface RouteConfig {
  path: string;
  label: string;
  title: string;
  description: string;
  icon: string;
}

export const ROUTES: RouteConfig[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Solid.js Fundamentals',
    description: 'Learn Solid.js basics with interactive examples',
    icon: '🏠',
  },
  {
    path: '/signals',
    label: 'Signals',
    title: 'Signals - Reactive State',
    description: 'Master createSignal() and reactive state management',
    icon: '⚡',
  },
  {
    path: '/memo',
    label: 'Memo',
    title: 'Memo - Computed Values',
    description: 'Learn createMemo() for optimized calculations',
    icon: '🧮',
  },
  {
    path: '/effects',
    label: 'Effects',
    title: 'Effects - Side Effects',
    description: 'Understand createEffect() and side effects',
    icon: '🔄',
  },
  {
    path: '/control-flow',
    label: 'Control Flow',
    title: 'Control Flow - Conditional Rendering',
    description: 'Use Show, For, and Switch components',
    icon: '🎛️',
  },
  {
    path: '/events',
    label: 'Events',
    title: 'Events - Event Handling',
    description: 'Handle user interactions and events',
    icon: '🖱️',
  },
  {
    path: '/props',
    label: 'Props',
    title: 'Props - Component Communication',
    description: 'Pass data between components using props',
    icon: '📦',
  },
  {
    path: '/stores',
    label: 'Stores',
    title: 'Stores - Complex State',
    description: 'Manage complex state with createStore()',
    icon: '🏪',
  },
  {
    path: '/styling',
    label: 'Styling',
    title: 'Styling - Dynamic Styles',
    description: 'Dynamic CSS and styling techniques',
    icon: '🎨',
  },
];

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return ROUTES.find((route) => route.path === path);
};
