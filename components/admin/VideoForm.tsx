'use client';

import { Video } from '@/lib/types/database';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { uploadFile } from '@/lib/utils/upload';
import { validateYouTubeUrl } from '@/lib/utils/validation';

interface VideoFormProps {
  initialData?: Video;
  onSubmit: (data: VideoFormData) => Promise<void>;
  onCancel: () => void;
}

export interface VideoFormData {
  title: string;
  description?: string;
  video_url: string;
  thumbnail?: string;
  published: boolean;
}

export default function VideoForm({
  initialData,
  onSubmit,
  onCancel,
}: VideoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [videoSource, setVideoSource] = useState<'youtube' | 'upload'>(
    initialData?.video_url && validateYouTubeUrl(initialData.video_url)
      ? 'youtube'
      : 'upload'
  );
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnail || null
  );
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      video_url: initialData?.video_url || '',
      thumbnail: initialData?.thumbnail || '',
      published: initialData?.published || false,
    },
  });

  const videoUrl = watch('video_url');

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please upload a video file');
      return;
    }

    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      setError('Video size must be less than 100MB');
      return;
    }

    setUploadingVideo(true);
    setError(null);

    try {
      const result = await uploadFile(file, 'videos', 'videos');
      setValue('video_url', result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload video');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Thumbnail size must be less than 5MB');
      return;
    }

    setUploadingThumbnail(true);
    setError(null);

    try {
      const result = await uploadFile(file, 'images', 'thumbnails');
      setValue('thumbnail', result.url);
      setThumbnailPreview(result.url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to upload thumbnail'
      );
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const onSubmitForm = async (data: VideoFormData) => {
    // Prevent double submission
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    // Validate YouTube URL if that's the source
    if (videoSource === 'youtube' && !validateYouTubeUrl(data.video_url)) {
      setError('Please enter a valid YouTube URL');
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }

    try {
      await onSubmit(data);
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
        {initialData ? 'Edit Video' : 'Create Video'}
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
          placeholder="Enter video title"
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
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Enter video description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Video Source <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="youtube"
              checked={videoSource === 'youtube'}
              onChange={(e) => setVideoSource(e.target.value as 'youtube')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              YouTube URL
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="upload"
              checked={videoSource === 'upload'}
              onChange={(e) => setVideoSource(e.target.value as 'upload')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Upload Video File
            </span>
          </label>
        </div>

        {videoSource === 'youtube' ? (
          <div>
            <input
              id="video_url"
              type="url"
              {...register('video_url', {
                required: 'Video URL is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Supported formats: youtube.com/watch?v=..., youtu.be/...,
              youtube.com/embed/...
            </p>
            {videoUrl && validateYouTubeUrl(videoUrl) && (
              <div className="mt-3">
                <iframe
                  width="100%"
                  height="315"
                  src={videoUrl.replace('watch?v=', 'embed/')}
                  title="YouTube video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              id="video_file"
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              disabled={uploadingVideo}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
            />
            {uploadingVideo && (
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                Uploading video...
              </p>
            )}
            {videoUrl && !validateYouTubeUrl(videoUrl) && (
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                Video uploaded successfully
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Maximum file size: 100MB. Supported formats: MP4, WebM, OGG
            </p>
          </div>
        )}
        {errors.video_url && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.video_url.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Thumbnail Image
        </label>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleThumbnailUpload}
          disabled={uploadingThumbnail}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
        />
        {uploadingThumbnail && (
          <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
            Uploading thumbnail...
          </p>
        )}
        {thumbnailPreview && (
          <div className="mt-3">
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
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
          disabled={isSubmitting || !videoUrl}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting
            ? 'Saving...'
            : initialData
              ? 'Update Video'
              : 'Create Video'}
        </button>
      </div>
    </form>
  );
}
