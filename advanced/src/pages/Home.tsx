import { createSignal, For, Show, Suspense } from 'solid-js';
import { usePostsResource } from '../hooks/usePostsResource';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { BLOG_ROUTES } from '../constants/routes';
import styles from '../styles/Home.module.css';
import { A } from '@solidjs/router';

export default function Home() {
  const { posts, page, setPage, search, setSearch, tag, setTag, refetch } =
    usePostsResource({
      initialPage: 1,
      limit: 12,
    });

  const [isSearching, setIsSearching] = createSignal(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleTagFilter = (selectedTag: string) => {
    setTag(selectedTag === tag() ? '' : selectedTag);
    setPage(1);
  };

  const handleNextPage = () => {
    if (posts()?.page && posts()!.page < posts()!.totalPages) {
      setPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (page() > 1) {
      setPage((p) => Math.max(1, p - 1));
    }
  };

  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <h1 class={styles.title}>Blog Posts</h1>
        <p class={styles.description}>
          Explore our collection of blog posts and articles.
        </p>
      </div>

      <div class={styles.controls}>
        <div class={styles.search}>
          <input
            type="text"
            placeholder="Search posts..."
            value={search()}
            onInput={(e) => handleSearch(e.currentTarget.value)}
            class={styles.searchInput}
          />
        </div>
        <A href={BLOG_ROUTES.postCreate} class={styles.createButton}>
          ✍️ New Post
        </A>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <Show
          when={posts()}
          fallback={
            <ErrorMessage
              message="Failed to load posts"
              onRetry={refetch}
            />
          }
        >
          {(postsData) => (
            <div class={styles.content}>
              <Show
                when={postsData().data && postsData().data.length > 0}
                fallback={
                  <div class={styles.empty}>
                    <p>No posts found. Try adjusting your search or filters.</p>
                  </div>
                }
              >
                <div class={styles.grid}>
                  <For each={postsData().data}>
                    {(post) => <PostCard post={post} />}
                  </For>
                </div>

                <div class={styles.pagination}>
                  <button
                    onClick={handlePrevPage}
                    disabled={page() === 1}
                    class={styles.paginationButton}
                  >
                    ← Previous
                  </button>

                  <span class={styles.pageInfo}>
                    Page {postsData().page} of {postsData().totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={
                      postsData().page >= postsData().totalPages
                    }
                    class={styles.paginationButton}
                  >
                    Next →
                  </button>
                </div>
              </Show>
            </div>
          )}
        </Show>
      </Suspense>
    </div>
  );
}
