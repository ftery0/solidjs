import { A } from '@solidjs/router';
import { Post } from '../api/types';
import { formatDate } from '../utils/formatting';
import { BLOG_ROUTES } from '../constants/routes';
import styles from '../styles/PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export default function PostCard(props: PostCardProps) {
  const excerpt = () =>
    props.post.excerpt ||
    props.post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...';

  return (
    <article class={styles.card}>
      <div class={styles.header}>
        <h3 class={styles.title}>
          <A href={BLOG_ROUTES.postDetail(props.post.id)}>
            {props.post.title}
          </A>
        </h3>
        <div class={styles.meta}>
          <span class={styles.date}>{formatDate(props.post.createdAt)}</span>
          <span class={styles.author}>{props.post.author}</span>
        </div>
      </div>

      <p class={styles.excerpt}>{excerpt()}</p>

      <div class={styles.footer}>
        <div class={styles.tags}>
          {props.post.tags.map((tag) => (
            <span key={tag} class={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
        <div class={styles.category}>{props.post.category}</div>
      </div>

      <A href={BLOG_ROUTES.postDetail(props.post.id)} class={styles.readMore}>
        Read More →
      </A>
    </article>
  );
}
