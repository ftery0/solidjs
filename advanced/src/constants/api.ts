export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  posts: '/api/posts',
  postDetail: (id: number | string) => `/api/posts/${id}`,
  postCreate: '/api/posts',
  postUpdate: (id: number | string) => `/api/posts/${id}`,
  postDelete: (id: number | string) => `/api/posts/${id}`,
  postComments: (id: number | string) => `/api/posts/${id}/comments`,
  postCommentCreate: (id: number | string) => `/api/posts/${id}/comments`,
};

export const API_TIMEOUT = 30000; // 30 seconds
