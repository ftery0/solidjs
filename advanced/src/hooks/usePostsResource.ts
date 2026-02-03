import { createResource, createSignal, Accessor } from 'solid-js';
import { postsAPI } from '../api/posts';
import { PaginatedResponse, Post } from '../api/types';

export interface UsePostsResourceOptions {
  initialPage?: number;
  limit?: number;
  initialSearch?: string;
  initialTag?: string;
  initialCategory?: string;
}

export function usePostsResource(options: UsePostsResourceOptions = {}) {
  const {
    initialPage = 1,
    limit = 10,
    initialSearch = '',
    initialTag = '',
    initialCategory = '',
  } = options;

  const [page, setPage] = createSignal(initialPage);
  const [search, setSearch] = createSignal(initialSearch);
  const [tag, setTag] = createSignal(initialTag);
  const [category, setCategory] = createSignal(initialCategory);

  const [posts, { mutate, refetch }] = createResource(
    () => ({
      page: page(),
      search: search(),
      tag: tag(),
      category: category(),
    }),
    async (source) => {
      return await postsAPI.list({
        page: source.page,
        limit,
        search: source.search,
        tag: source.tag,
        category: source.category,
        status: 'published',
      });
    }
  );

  return {
    posts: posts as Accessor<PaginatedResponse<Post> | undefined>,
    page,
    setPage,
    search,
    setSearch,
    tag,
    setTag,
    category,
    setCategory,
    refetch,
    mutate,
    isLoading: () => posts.loading,
    isError: () => posts.error,
  };
}
