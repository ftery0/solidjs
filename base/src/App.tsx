import { Router, Route } from '@solidjs/router';
import Layout from './components/Layout';
import { ROUTES } from './constants/routes';

// Page imports
import Home from './pages/Home';
import Signals from './pages/Signals';
import Memo from './pages/Memo';
import Effects from './pages/Effects';
import ControlFlow from './pages/ControlFlow';
import Events from './pages/Events';
import Props from './pages/Props';
import Stores from './pages/Stores';
import Styling from './pages/Styling';

const pages: Record<string, any> = {
  '/': Home,
  '/signals': Signals,
  '/memo': Memo,
  '/effects': Effects,
  '/control-flow': ControlFlow,
  '/events': Events,
  '/props': Props,
  '/stores': Stores,
  '/styling': Styling,
};

export default function App() {
  return (
    <Router>
      {ROUTES.map((route) => {
        const Component = pages[route.path];
        return (
          <Route
            path={route.path}
            component={() => (
              <Layout title={route.title} description={route.description}>
                <Component />
              </Layout>
            )}
          />
        );
      })}
    </Router>
  );
}
