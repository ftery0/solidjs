export const BLOG_ROUTES = {
  home: '/',
  postDetail: (id: string | number) => `/posts/${id}`,
  postCreate: '/posts/new',
  postEdit: (id: string | number) => `/posts/${id}/edit`,
};

export interface NavRouteConfig {
  path: string;
  label: string;
  icon: string;
}

export const NAV_ROUTES: NavRouteConfig[] = [
  {
    path: '/',
    label: 'Posts',
    icon: '📝',
  },
  {
    path: '/posts/new',
    label: 'New Post',
    icon: '✍️',
  },
];
