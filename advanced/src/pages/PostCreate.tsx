import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { postsAPI } from '../api/posts';
import { CreatePostRequest } from '../api/types';
import { validatePost } from '../utils/validation';
import styles from '../styles/PostForm.module.css';

export default function PostCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = createSignal('');
  const [content, setContent] = createSignal('');
  const [author, setAuthor] = createSignal('');
  const [category, setCategory] = createSignal('');
  const [tags, setTags] = createSignal('');
  const [status, setStatus] = createSignal<'draft' | 'published'>('published');

  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal('');
  const [fieldErrors, setFieldErrors] = createSignal<Record<string, string>>({});

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const validation = validatePost({
      title: title(),
      content: content(),
      author: author(),
      category: category(),
      tags: tags()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });

    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach((err) => {
        errors[err.field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const postData: CreatePostRequest = {
        title: title(),
        content: content(),
        author: author(),
        category: category(),
        tags: tags()
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        status: status(),
      };

      const result = await postsAPI.create(postData);
      navigate(`/posts/${result.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create post. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class={styles.container}>
      <h1 class={styles.title}>Create New Post</h1>

      <form onSubmit={handleSubmit} class={styles.form}>
        {error() && <div class={styles.errorAlert}>{error()}</div>}

        <div class={styles.formGroup}>
          <label htmlFor="title" class={styles.label}>
            Title *
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter post title"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
            disabled={isSubmitting()}
            class={styles.input}
          />
          {fieldErrors().title && (
            <span class={styles.fieldError}>{fieldErrors().title}</span>
          )}
        </div>

        <div class={styles.formGroup}>
          <label htmlFor="author" class={styles.label}>
            Author *
          </label>
          <input
            id="author"
            type="text"
            placeholder="Your name"
            value={author()}
            onInput={(e) => setAuthor(e.currentTarget.value)}
            disabled={isSubmitting()}
            class={styles.input}
          />
          {fieldErrors().author && (
            <span class={styles.fieldError}>{fieldErrors().author}</span>
          )}
        </div>

        <div class={styles.row}>
          <div class={styles.formGroup}>
            <label htmlFor="category" class={styles.label}>
              Category *
            </label>
            <input
              id="category"
              type="text"
              placeholder="e.g., Technology, Travel"
              value={category()}
              onInput={(e) => setCategory(e.currentTarget.value)}
              disabled={isSubmitting()}
              class={styles.input}
            />
            {fieldErrors().category && (
              <span class={styles.fieldError}>{fieldErrors().category}</span>
            )}
          </div>

          <div class={styles.formGroup}>
            <label htmlFor="tags" class={styles.label}>
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              placeholder="tag1, tag2, tag3"
              value={tags()}
              onInput={(e) => setTags(e.currentTarget.value)}
              disabled={isSubmitting()}
              class={styles.input}
            />
          </div>
        </div>

        <div class={styles.formGroup}>
          <label htmlFor="status" class={styles.label}>
            Status
          </label>
          <select
            id="status"
            value={status()}
            onChange={(e) => setStatus(e.currentTarget.value as 'draft' | 'published')}
            disabled={isSubmitting()}
            class={styles.select}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div class={styles.formGroup}>
          <label htmlFor="content" class={styles.label}>
            Content *
          </label>
          <textarea
            id="content"
            placeholder="Write your post content here..."
            value={content()}
            onInput={(e) => setContent(e.currentTarget.value)}
            disabled={isSubmitting()}
            class={styles.textarea}
          />
          {fieldErrors().content && (
            <span class={styles.fieldError}>{fieldErrors().content}</span>
          )}
          <small class={styles.hint}>
            Markdown formatting is supported
          </small>
        </div>

        <div class={styles.actions}>
          <button
            type="submit"
            disabled={isSubmitting()}
            class={styles.submitButton}
          >
            {isSubmitting() ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            class={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
