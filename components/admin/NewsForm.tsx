'use client';

import { NewsItem } from '@/lib/types/database';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import RichTextEditor from './RichTextEditor';
import { uploadFile } from '@/lib/utils/upload';

interface NewsFormProps {
  initialData?: NewsItem;
  onSubmit: (data: NewsFormData) => Promise<void>;
  onCancel: () => void;
}

export interface NewsFormData {
  title: string;
  content: string;
  image?: string;
  published: boolean;
}

export default function NewsForm({
  initialData,
  onSubmit,
  onCancel,
}: NewsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState(initialData?.content || '');
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewsFormData>({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      image: initialData?.image || '',
      published: initialData?.published || false,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      const result = await uploadFile(file, 'images', 'news');
      setValue('image', result.url);
      setImagePreview(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmitForm = async (data: NewsFormData) => {
    // Prevent double submission
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        ...data,
        content,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {initialData ? 'Edit News Item' : 'Create News Item'}
      </h2>

      {error && (
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded"
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
            maxLength: {
              value: 200,
              message: 'Title must be less than 200 characters',
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Enter news title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.title.message}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          A URL-friendly slug will be automatically generated from the title
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content <span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          value={content}
          onChange={(value) => {
            setContent(value);
            setValue('content', value);
          }}
          placeholder="Write your news content here..."
        />
        {!content && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Content is required
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Featured Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploadingImage}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
        />
        {uploadingImage && (
          <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
            Uploading image...
          </p>
        )}
        {imagePreview && (
          <div className="mt-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-xs rounded-lg shadow"
            />
          </div>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
        </p>
      </div>

      <div className="flex items-center">
        <input
          id="published"
          type="checkbox"
          {...register('published')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="published"
          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
        >
          Publish immediately (make visible on public website)
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !content}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting
            ? 'Saving...'
            : initialData
              ? 'Update News'
              : 'Create News'}
        </button>
      </div>
    </form>
  );
}
