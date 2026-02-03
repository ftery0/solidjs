import { createResource, Accessor } from 'solid-js';
import { postsAPI } from '../api/posts';
import { commentsAPI } from '../api/comments';
import { Post, Comment } from '../api/types';

export function usePostDetail(postId: Accessor<number | string>) {
  const [post, { mutate: mutatePost, refetch: refetchPost }] = createResource(
    postId,
    async (id) => {
      return await postsAPI.getById(id);
    }
  );

  const [comments, { mutate: mutateComments, refetch: refetchComments }] =
    createResource(postId, async (id) => {
      return await commentsAPI.list(id);
    });

  return {
    post: post as Accessor<Post | undefined>,
    comments: comments as Accessor<Comment[] | undefined>,
    mutatePost,
    refetchPost,
    mutateComments,
    refetchComments,
    isLoadingPost: () => post.loading,
    isLoadingComments: () => comments.loading,
    isErrorPost: () => post.error,
    isErrorComments: () => comments.error,
  };
}
