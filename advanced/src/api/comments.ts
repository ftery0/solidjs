import { apiClient } from './client';
import { API_ENDPOINTS } from '../constants/api';
import { Comment, CreateCommentRequest } from './types';

export const commentsAPI = {
  /**
   * Get all comments for a post
   */
  list: (postId: number | string) => {
    return apiClient.get<Comment[]>(API_ENDPOINTS.postComments(postId));
  },

  /**
   * Create a new comment on a post
   */
  create: (postId: number | string, data: CreateCommentRequest) => {
    return apiClient.post<Comment>(
      API_ENDPOINTS.postCommentCreate(postId),
      data
    );
  },

  /**
   * Delete a comment
   */
  delete: (postId: number | string, commentId: number | string) => {
    return apiClient.delete<{ success: boolean }>(
      `/api/posts/${postId}/comments/${commentId}`
    );
  },
};
