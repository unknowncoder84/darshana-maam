'use client';

import { Article, SEOMeta } from '@/lib/types/database';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import RichTextEditor from './RichTextEditor';

interface ArticleFormProps {
  initialData?: Article;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  onCancel: () => void;
}

export interface ArticleFormData {
  title: string;
  content: string;
  image?: string;
  video_url?: string;
  pdf_url?: string;
  tags?: string[];
  seo_meta?: SEOMeta;
  published: boolean;
}

export default function ArticleForm({
  initialData,
  onSubmit,
  onCancel,
}: ArticleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState(initialData?.content || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || '');
  const [pdfUrl, setPdfUrl] = useState(initialData?.pdf_url || '');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormData>({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      tags: initialData?.tags || [],
      seo_meta: initialData?.seo_meta || {
        title: '',
        description: '',
        keywords: [],
      },
      published: initialData?.published || false,
    },
  });

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmitForm = async (data: ArticleFormData) => {
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
        tags,
        image: imageUrl,
        video_url: videoUrl,
        pdf_url: pdfUrl,
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
        {initialData ? 'Edit Article' : 'Create Article'}
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
          placeholder="Enter article title"
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
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Featured Image URL
        </label>
        <input
          id="image"
          type="url"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImagePreview(e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="https://example.com/image.jpg or https://images.unsplash.com/..."
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Enter the URL of the article's featured image (e.g., from Unsplash, Pexels, or your own hosting)
        </p>
        {imagePreview && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
            <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setImagePreview('')}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="video_url"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Video URL (Optional)
        </label>
        <input
          id="video_url"
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="https://youtube.com/watch?v=... or https://example.com/video.mp4"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Add a YouTube URL or direct video link to embed in the article
        </p>
      </div>

      <div>
        <label
          htmlFor="pdf_url"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          PDF Document URL (Optional)
        </label>
        <input
          id="pdf_url"
          type="url"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="https://example.com/document.pdf"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Add a PDF document URL to display in the article
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
          placeholder="Write your article content here..."
        />
        {!content && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Content is required
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter a tag and press Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Add
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100"
                  aria-label={`Remove tag ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          SEO Metadata (Optional)
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="seo_title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              SEO Title
            </label>
            <input
              id="seo_title"
              type="text"
              {...register('seo_meta.title')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Custom title for search engines"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If left blank, the article title will be used
            </p>
          </div>

          <div>
            <label
              htmlFor="seo_description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              SEO Description
            </label>
            <textarea
              id="seo_description"
              {...register('seo_meta.description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Brief description for search engines (150-160 characters)"
            />
          </div>

          <div>
            <label
              htmlFor="seo_keywords"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              SEO Keywords
            </label>
            <input
              id="seo_keywords"
              type="text"
              {...register('seo_meta.keywords')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Comma-separated keywords"
            />
          </div>
        </div>
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
              ? 'Update Article'
              : 'Create Article'}
        </button>
      </div>
    </form>
  );
}
