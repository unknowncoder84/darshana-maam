// DEMO MODE: File upload utilities without Supabase dependency

export interface UploadResult {
  url: string;
  path: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  video: 100 * 1024 * 1024, // 100MB
};

// Allowed file types
export const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
};

/**
 * Validates file size
 * @param file - The file to validate
 * @param maxSize - Maximum file size in bytes
 * @returns Validation error or null if valid
 */
export function validateFileSize(file: File, maxSize: number): ValidationError | null {
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return {
      field: 'file',
      message: `File size exceeds the maximum limit of ${maxSizeMB}MB`,
    };
  }
  return null;
}

/**
 * Validates file type
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns Validation error or null if valid
 */
export function validateFileType(file: File, allowedTypes: string[]): ValidationError | null {
  if (!allowedTypes.includes(file.type)) {
    const allowedExtensions = allowedTypes
      .map((type) => type.split('/')[1])
      .join(', ');
    return {
      field: 'file',
      message: `Invalid file type. Allowed types: ${allowedExtensions}`,
    };
  }
  return null;
}

/**
 * Validates a file for upload
 * @param file - The file to validate
 * @param type - The type of file ('image' or 'video')
 * @returns Array of validation errors (empty if valid)
 */
export function validateFile(file: File, type: 'image' | 'video'): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate file size
  const sizeLimit = type === 'image' ? FILE_SIZE_LIMITS.image : FILE_SIZE_LIMITS.video;
  const sizeError = validateFileSize(file, sizeLimit);
  if (sizeError) {
    errors.push(sizeError);
  }

  // Validate file type
  const allowedTypes = type === 'image' ? ALLOWED_FILE_TYPES.image : ALLOWED_FILE_TYPES.video;
  const typeError = validateFileType(file, allowedTypes);
  if (typeError) {
    errors.push(typeError);
  }

  return errors;
}

/**
 * DEMO MODE: Simulates file upload by converting to data URL
 * In production, this would upload to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket ('images' or 'videos')
 * @param folder - The folder within the bucket
 * @returns Upload result with data URL (simulated)
 * @throws Error if validation fails
 */
export async function uploadFile(
  file: File,
  bucket: 'images' | 'videos',
  folder: string
): Promise<UploadResult> {
  // Validate file before upload
  const fileType = bucket === 'images' ? 'image' : 'video';
  const validationErrors = validateFile(file, fileType);
  
  if (validationErrors.length > 0) {
    throw new Error(validationErrors.map((e) => e.message).join('; '));
  }

  // DEMO MODE: Convert file to data URL for preview
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = `${folder}/${fileName}`;
      
      resolve({
        url: dataUrl, // In demo mode, use data URL
        path: filePath,
      });
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * DEMO MODE: Simulates file deletion
 * In production, this would delete from Supabase Storage
 * @param path - The storage path of the file
 * @param bucket - The storage bucket ('images' or 'videos')
 */
export async function deleteFile(
  path: string,
  bucket: 'images' | 'videos'
): Promise<void> {
  // DEMO MODE: No actual deletion needed
  console.log(`Demo: Would delete ${path} from ${bucket}`);
}

/**
 * Extracts the storage path from a public URL
 * @param url - The public URL from Supabase Storage
 * @param bucket - The storage bucket name
 * @returns The storage path or null if invalid URL
 */
export function extractPathFromUrl(
  url: string,
  bucket: 'images' | 'videos'
): string | null {
  try {
    // Handle data URLs in demo mode
    if (url.startsWith('data:')) {
      return null;
    }
    
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/storage/v1/object/public/${bucket}/`);
    return pathParts[1] || null;
  } catch {
    return null;
  }
}
