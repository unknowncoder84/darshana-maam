import { ContentFormData, UserFormData } from '@/lib/types/database';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates content form data (news, articles, videos)
 */
export function validateContentForm(
  data: ContentFormData,
  type: 'news' | 'article' | 'video'
): ValidationResult {
  const errors: Record<string, string> = {};

  // Title is required for all content types
  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (data.title.length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }

  // Content validation for news and articles
  if (type === 'news' || type === 'article') {
    if (!data.content || data.content.trim().length === 0) {
      errors.content = 'Content is required';
    }
  }

  // Video URL validation for videos
  if (type === 'video') {
    if (!data.videoUrl || data.videoUrl.trim().length === 0) {
      errors.videoUrl = 'Video URL or file is required';
    } else if (!validateYouTubeUrl(data.videoUrl) && !data.videoUrl.startsWith('http')) {
      errors.videoUrl = 'Invalid video URL format';
    }
  }

  // Slug validation
  if (!data.slug || data.slug.trim().length === 0) {
    errors.slug = 'Slug is required';
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
  }

  // SEO meta validation for articles
  if (type === 'article' && data.seoMeta) {
    if (data.seoMeta.title && data.seoMeta.title.length > 60) {
      errors.seoTitle = 'SEO title should be less than 60 characters';
    }
    if (data.seoMeta.description && data.seoMeta.description.length > 160) {
      errors.seoDescription = 'SEO description should be less than 160 characters';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates user form data
 */
export function validateUserForm(data: UserFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Username validation
  if (!data.username || data.username.trim().length === 0) {
    errors.username = 'Username is required';
  } else if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  } else if (data.username.length > 50) {
    errors.username = 'Username must be less than 50 characters';
  } else if (!/^[a-zA-Z0-9_-]+$/.test(data.username)) {
    errors.username = 'Username can only contain letters, numbers, hyphens, and underscores';
  }

  // Password validation (required for new users)
  if (data.password !== undefined) {
    if (data.password.length === 0) {
      errors.password = 'Password is required for new users';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (data.password.length > 100) {
      errors.password = 'Password must be less than 100 characters';
    }
  }

  // Role validation
  if (!data.role) {
    errors.role = 'Role is required';
  } else if (data.role !== 'admin' && data.role !== 'user') {
    errors.role = 'Role must be either "admin" or "user"';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates YouTube URL format
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function validateYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
  ];

  return patterns.some((pattern) => pattern.test(url));
}

/**
 * Validates file size
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in megabytes
 */
export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Validates file type
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Gets file size error message
 */
export function getFileSizeError(maxSizeMB: number): string {
  return `File size must be less than ${maxSizeMB}MB`;
}

/**
 * Gets file type error message
 */
export function getFileTypeError(allowedTypes: string[]): string {
  const types = allowedTypes.map((type) => type.split('/')[1]).join(', ');
  return `File type must be one of: ${types}`;
}
