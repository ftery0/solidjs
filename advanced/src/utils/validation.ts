export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate post creation form
 */
export function validatePost(data: {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (data.title.length > 200) {
    errors.push({ field: 'title', message: 'Title must be less than 200 characters' });
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push({ field: 'content', message: 'Content is required' });
  } else if (data.content.length < 10) {
    errors.push({ field: 'content', message: 'Content must be at least 10 characters' });
  }

  if (!data.author || data.author.trim().length === 0) {
    errors.push({ field: 'author', message: 'Author is required' });
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push({ field: 'category', message: 'Category is required' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate comment creation
 */
export function validateComment(data: {
  content?: string;
  author?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.content || data.content.trim().length === 0) {
    errors.push({ field: 'content', message: 'Comment cannot be empty' });
  } else if (data.content.length > 1000) {
    errors.push({ field: 'content', message: 'Comment must be less than 1000 characters' });
  }

  if (!data.author || data.author.trim().length === 0) {
    errors.push({ field: 'author', message: 'Author is required' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const re =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
