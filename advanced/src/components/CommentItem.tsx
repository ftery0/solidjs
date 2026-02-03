import { For, Show } from 'solid-js';
import { Comment } from '../api/types';
import { formatDate } from '../utils/formatting';
import styles from '../styles/CommentItem.module.css';

interface CommentItemProps {
  comment: Comment;
  replies?: Comment[];
  onDelete?: (id: number) => void;
}

export default function CommentItem(props: CommentItemProps) {
  const isReply = () => props.comment.parentId != null;

  return (
    <div class={styles.commentContainer} classList={{ [styles.reply]: isReply() }}>
      <article class={styles.comment}>
        <div class={styles.header}>
          <div class={styles.author}>{props.comment.author}</div>
          <time class={styles.date} dateTime={props.comment.createdAt}>
            {formatDate(props.comment.createdAt)}
          </time>
          <Show when={props.onDelete}>
            <button
              class={styles.deleteButton}
              onClick={() => props.onDelete?.(props.comment.id)}
              title="Delete comment"
            >
              ✕
            </button>
          </Show>
        </div>
        <p class={styles.content}>{props.comment.content}</p>
      </article>

      <Show when={props.replies && props.replies!.length > 0}>
        <div class={styles.replies}>
          <For each={props.replies}>
            {(reply) => <CommentItem comment={reply} />}
          </For>
        </div>
      </Show>
    </div>
  );
}
