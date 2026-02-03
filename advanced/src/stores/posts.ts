import { createStore } from 'solid-js/store';
import { Post, PaginatedResponse } from '../api/types';

interface PostsState {
  items: Post[];
  currentPost: Post | null;
  pagination: {
    page: number;
    totalPages: number;
    total: number;
  };
  filter: {
    search: string;
    tag: string;
    category: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  currentPost: null,
  pagination: {
    page: 1,
    totalPages: 1,
    total: 0,
  },
  filter: {
    search: '',
    tag: '',
    category: '',
  },
  loading: false,
  error: null,
};

export const [postsStore, setPostsStore] = createStore<PostsState>(initialState);

export const postsActions = {
  setLoading: (loading: boolean) => {
    setPostsStore('loading', loading);
  },

  setError: (error: string | null) => {
    setPostsStore('error', error);
  },

  setPosts: (data: PaginatedResponse<Post>) => {
    setPostsStore('items', data.data);
    setPostsStore('pagination', {
      page: data.page,
      totalPages: data.totalPages,
      total: data.total,
    });
    setPostsStore('error', null);
  },

  setCurrentPost: (post: Post | null) => {
    setPostsStore('currentPost', post);
  },

  setFilter: (filter: Partial<PostsState['filter']>) => {
    setPostsStore('filter', filter);
  },

  resetFilter: () => {
    setPostsStore('filter', {
      search: '',
      tag: '',
      category: '',
    });
  },

  resetState: () => {
    setPostsStore(initialState);
  },
};
