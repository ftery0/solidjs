export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published';
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  parentId?: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published';
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {}

export interface CreateCommentRequest {
  content: string;
  author: string;
  parentId?: number | null;
}
