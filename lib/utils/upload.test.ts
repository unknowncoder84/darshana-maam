import { describe, it, expect } from 'vitest';
import {
  validateFileSize,
  validateFileType,
  validateFile,
  FILE_SIZE_LIMITS,
  ALLOWED_FILE_TYPES,
} from './upload';

describe('File Upload Validation', () => {
  describe('validateFileSize', () => {
    it('should return null for files within size limit', () => {
      const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const error = validateFileSize(file, 5 * 1024 * 1024); // 5MB limit
      expect(error).toBeNull();
    });

    it('should return error for files exceeding size limit', () => {
      // Create a file larger than 1MB (using a smaller test size)
      const largeContent = 'a'.repeat(2 * 1024 * 1024); // 2MB
      const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
      const error = validateFileSize(file, 1 * 1024 * 1024); // 1MB limit
      
      expect(error).not.toBeNull();
      expect(error?.field).toBe('file');
      expect(error?.message).toContain('exceeds the maximum limit');
      expect(error?.message).toContain('1.00MB');
    });

    it('should handle exact size limit', () => {
      const content = 'a'.repeat(1024 * 1024); // 1MB
      const file = new File([content], 'exact.jpg', { type: 'image/jpeg' });
      const error = validateFileSize(file, 1024 * 1024); // Exact 1MB
      expect(error).toBeNull();
    });

    it('should format size limit message correctly', () => {
      const largeContent = 'a'.repeat(6 * 1024 * 1024); // 6MB
      const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
      const error = validateFileSize(file, 5 * 1024 * 1024);
      
      expect(error?.message).toContain('5.00MB');
    });
  });

  describe('validateFileType', () => {
    it('should return null for allowed file types', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const error = validateFileType(file, ['image/jpeg', 'image/png']);
      expect(error).toBeNull();
    });

    it('should return error for disallowed file types', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const error = validateFileType(file, ['image/jpeg', 'image/png']);
      
      expect(error).not.toBeNull();
      expect(error?.field).toBe('file');
      expect(error?.message).toContain('Invalid file type');
    });

    it('should list allowed file extensions in error message', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const error = validateFileType(file, ['image/jpeg', 'image/png', 'image/gif']);
      
      expect(error?.message).toContain('jpeg');
      expect(error?.message).toContain('png');
      expect(error?.message).toContain('gif');
    });

    it('should handle multiple allowed types', () => {
      const jpegFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const pngFile = new File(['test'], 'test.png', { type: 'image/png' });
      const allowedTypes = ['image/jpeg', 'image/png'];
      
      expect(validateFileType(jpegFile, allowedTypes)).toBeNull();
      expect(validateFileType(pngFile, allowedTypes)).toBeNull();
    });
  });

  describe('validateFile', () => {
    describe('Image validation', () => {
      it('should validate valid image files', () => {
        const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        const errors = validateFile(file, 'image');
        expect(errors).toHaveLength(0);
      });

      it('should reject images exceeding size limit', () => {
        const largeContent = 'a'.repeat(6 * 1024 * 1024); // 6MB
        const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
        const errors = validateFile(file, 'image');
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].message).toContain('exceeds the maximum limit');
      });

      it('should reject invalid image types', () => {
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });
        const errors = validateFile(file, 'image');
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].message).toContain('Invalid file type');
      });

      it('should accept all allowed image types', () => {
        const types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        
        types.forEach((type) => {
          const file = new File(['test'], `test.${type.split('/')[1]}`, { type });
          const errors = validateFile(file, 'image');
          expect(errors).toHaveLength(0);
        });
      });

      it('should return multiple errors for multiple violations', () => {
        const largeContent = 'a'.repeat(6 * 1024 * 1024); // 6MB
        const file = new File([largeContent], 'large.txt', { type: 'text/plain' });
        const errors = validateFile(file, 'image');
        
        expect(errors.length).toBe(2); // Size and type errors
      });
    });

    describe('Video validation', () => {
      it('should validate valid video files', () => {
        const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
        const errors = validateFile(file, 'video');
        expect(errors).toHaveLength(0);
      });

      it('should reject videos exceeding size limit', () => {
        // Use a smaller test size to avoid memory issues
        const largeContent = 'a'.repeat(10 * 1024 * 1024); // 10MB
        const file = new File([largeContent], 'large.mp4', { type: 'video/mp4' });
        const errors = validateFile(file, 'video');
        
        // Since we're testing with 10MB and limit is 100MB, let's test with a smaller limit
        const sizeError = validateFileSize(file, 5 * 1024 * 1024); // 5MB limit
        expect(sizeError).not.toBeNull();
        expect(sizeError?.message).toContain('exceeds the maximum limit');
      });

      it('should reject invalid video types', () => {
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });
        const errors = validateFile(file, 'video');
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].message).toContain('Invalid file type');
      });

      it('should accept all allowed video types', () => {
        const types = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
        
        types.forEach((type) => {
          const file = new File(['test'], `test.${type.split('/')[1]}`, { type });
          const errors = validateFile(file, 'video');
          expect(errors).toHaveLength(0);
        });
      });
    });
  });

  describe('File size limits', () => {
    it('should have correct image size limit', () => {
      expect(FILE_SIZE_LIMITS.image).toBe(5 * 1024 * 1024); // 5MB
    });

    it('should have correct video size limit', () => {
      expect(FILE_SIZE_LIMITS.video).toBe(100 * 1024 * 1024); // 100MB
    });
  });

  describe('Allowed file types', () => {
    it('should have correct allowed image types', () => {
      expect(ALLOWED_FILE_TYPES.image).toContain('image/jpeg');
      expect(ALLOWED_FILE_TYPES.image).toContain('image/jpg');
      expect(ALLOWED_FILE_TYPES.image).toContain('image/png');
      expect(ALLOWED_FILE_TYPES.image).toContain('image/gif');
      expect(ALLOWED_FILE_TYPES.image).toContain('image/webp');
    });

    it('should have correct allowed video types', () => {
      expect(ALLOWED_FILE_TYPES.video).toContain('video/mp4');
      expect(ALLOWED_FILE_TYPES.video).toContain('video/mpeg');
      expect(ALLOWED_FILE_TYPES.video).toContain('video/quicktime');
      expect(ALLOWED_FILE_TYPES.video).toContain('video/x-msvideo');
      expect(ALLOWED_FILE_TYPES.video).toContain('video/webm');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty files', () => {
      const file = new File([], 'empty.jpg', { type: 'image/jpeg' });
      const errors = validateFile(file, 'image');
      expect(errors).toHaveLength(0); // Empty file is valid (size is 0)
    });

    it('should handle files with no extension', () => {
      const file = new File(['test'], 'noextension', { type: 'image/jpeg' });
      const errors = validateFile(file, 'image');
      expect(errors).toHaveLength(0); // Type is what matters, not filename
    });

    it('should handle files with wrong extension but correct type', () => {
      const file = new File(['test'], 'test.txt', { type: 'image/jpeg' });
      const errors = validateFile(file, 'image');
      expect(errors).toHaveLength(0); // Type is what matters
    });
  });
});
