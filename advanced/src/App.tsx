import { lazy, Suspense } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Import page components with lazy loading
const Home = lazy(() => import('./pages/Home'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const PostCreate = lazy(() => import('./pages/PostCreate'));
const PostEdit = lazy(() => import('./pages/PostEdit'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Layout>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Route path="/" component={Home} />
          <Route path="/posts/:id" component={PostDetail} />
          <Route path="/posts/new" component={PostCreate} />
          <Route path="/posts/:id/edit" component={PostEdit} />
          <Route path="*" component={NotFound} />
        </Suspense>
      </Router>
    </Layout>
  );
}
