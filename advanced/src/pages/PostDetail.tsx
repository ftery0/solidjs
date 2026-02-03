import { useParams, A } from '@solidjs/router';
import { Show, Suspense, For, createSignal } from 'solid-js';
import { usePostDetail } from '../hooks/usePostDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CommentItem from '../components/CommentItem';
import { commentsAPI } from '../api/comments';
import { BLOG_ROUTES } from '../constants/routes';
import { formatDate } from '../utils/formatting';
import { validateComment } from '../utils/validation';
import styles from '../styles/PostDetail.module.css';

export default function PostDetail() {
  const params = useParams();
  const postId = () => Number(params.id);

  const { post, comments, refetchPost, refetchComments } = usePostDetail(postId);

  const [commentAuthor, setCommentAuthor] = createSignal('');
  const [commentContent, setCommentContent] = createSignal('');
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitError, setSubmitError] = createSignal('');
  const [submitSuccess, setSubmitSuccess] = createSignal(false);

  const handleCommentSubmit = async () => {
    setSubmitError('');
    setSubmitSuccess(false);

    const validation = validateComment({
      content: commentContent(),
      author: commentAuthor(),
    });

    if (!validation.isValid) {
      setSubmitError(validation.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      await commentsAPI.create(postId(), {
        content: commentContent(),
        author: commentAuthor(),
      });

      setCommentAuthor('');
      setCommentContent('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);

      refetchComments();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit comment'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class={styles.container}>
      <Suspense fallback={<LoadingSpinner />}>
        <Show
          when={post()}
          fallback={
            <ErrorMessage
              message="Post not found"
              onRetry={refetchPost}
            />
          }
        >
          {(postData) => (
            <article class={styles.article}>
              <header class={styles.header}>
                <h1 class={styles.title}>{postData().title}</h1>
                <div class={styles.meta}>
                  <span class={styles.author}>{postData().author}</span>
                  <span class={styles.date}>{formatDate(postData().createdAt)}</span>
                  <span class={styles.category}>{postData().category}</span>
                </div>
              </header>

              <div class={styles.content}>
                <div innerHTML={postData().content} class={styles.body} />
              </div>

              <footer class={styles.footer}>
                <div class={styles.tags}>
                  {postData().tags.map((tag) => (
                    <span key={tag} class={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </footer>

              <div class={styles.actions}>
                <A href={BLOG_ROUTES.postEdit(postData().id)} class={styles.editButton}>
                  ✏️ Edit
                </A>
                <A href={BLOG_ROUTES.home} class={styles.backButton}>
                  ← Back to Posts
                </A>
              </div>
            </article>
          )}
        </Show>
      </Suspense>

      <section class={styles.commentsSection}>
        <h2 class={styles.commentsTitle}>Comments</h2>

        <Show when={submitSuccess()}>
          <div class={styles.successMessage}>
            ✓ Comment posted successfully!
          </div>
        </Show>

        <Show when={submitError()}>
          <div class={styles.errorMessage}>{submitError()}</div>
        </Show>

        <div class={styles.commentForm}>
          <h3 class={styles.formTitle}>Leave a Comment</h3>
          <input
            type="text"
            placeholder="Your name"
            value={commentAuthor()}
            onInput={(e) => setCommentAuthor(e.currentTarget.value)}
            disabled={isSubmitting()}
            class={styles.formInput}
          />
          <textarea
            placeholder="Your comment..."
            value={commentContent()}
            onInput={(e) => setCommentContent(e.currentTarget.value)}
            disabled={isSubmitting()}
            class={styles.formTextarea}
          />
          <button
            onClick={handleCommentSubmit}
            disabled={isSubmitting()}
            class={styles.submitButton}
          >
            {isSubmitting() ? 'Posting...' : 'Post Comment'}
          </button>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <Show
            when={comments()}
            fallback={
              <div class={styles.noComments}>No comments yet. Be the first!</div>
            }
          >
            {(commentsData) => (
              <Show
                when={commentsData().length > 0}
                fallback={
                  <div class={styles.noComments}>
                    No comments yet. Be the first!
                  </div>
                }
              >
                <div class={styles.commentsList}>
                  <For each={commentsData()}>
                    {(comment) => (
                      <CommentItem
                        comment={comment}
                        replies={commentsData().filter(
                          (c) => c.parentId === comment.id
                        )}
                      />
                    )}
                  </For>
                </div>
              </Show>
            )}
          </Show>
        </Suspense>
      </section>
    </div>
  );
}
