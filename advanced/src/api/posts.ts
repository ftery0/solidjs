import { apiClient } from './client';
import { API_ENDPOINTS } from '../constants/api';
import {
  Post,
  PaginatedResponse,
  CreatePostRequest,
  UpdatePostRequest,
} from './types';

export const postsAPI = {
  /**
   * Get paginated list of posts with optional filtering
   */
  list: (options: {
    page?: number;
    limit?: number;
    search?: string;
    tag?: string;
    category?: string;
    status?: 'draft' | 'published';
  } = {}) => {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page.toString());
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.search) params.append('search', options.search);
    if (options.tag) params.append('tag', options.tag);
    if (options.category) params.append('category', options.category);
    if (options.status) params.append('status', options.status);

    const query = params.toString();
    const endpoint = query ? `${API_ENDPOINTS.posts}?${query}` : API_ENDPOINTS.posts;

    return apiClient.get<PaginatedResponse<Post>>(endpoint);
  },

  /**
   * Get a single post by ID
   */
  getById: (id: number | string) => {
    return apiClient.get<Post>(API_ENDPOINTS.postDetail(id));
  },

  /**
   * Create a new post
   */
  create: (data: CreatePostRequest) => {
    return apiClient.post<Post>(API_ENDPOINTS.postCreate, data);
  },

  /**
   * Update an existing post
   */
  update: (id: number | string, data: UpdatePostRequest) => {
    return apiClient.put<Post>(API_ENDPOINTS.postUpdate(id), data);
  },

  /**
   * Delete a post
   */
  delete: (id: number | string) => {
    return apiClient.delete<{ success: boolean }>(API_ENDPOINTS.postDelete(id));
  },
};
