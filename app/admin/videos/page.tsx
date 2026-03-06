'use client';

import { useEffect, useState } from 'react';
import { Video } from '@/lib/types/database';
import {
  listVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideoById,
} from '@/app/actions/videos';
import VideoForm, { VideoFormData } from '@/components/admin/VideoForm';
import { validateYouTubeUrl } from '@/lib/utils/validation';

export default function VideosManagementPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    setError(null);
    const result = await listVideos();
    if (result.success && result.data) {
      setVideos(result.data);
    } else {
      setError(result.error || 'Failed to load videos');
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setEditingVideo(null);
    setShowForm(true);
  };

  const handleEdit = async (id: string) => {
    const result = await getVideoById(id);
    if (result.success && result.data) {
      setEditingVideo(result.data);
      setShowForm(true);
    } else {
      setError(result.error || 'Failed to load video');
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteVideo(id);
    if (result.success) {
      await loadVideos();
    } else {
      setError(result.error || 'Failed to delete video');
    }
  };

  const handleSubmit = async (data: VideoFormData) => {
    if (editingVideo) {
      const result = await updateVideo({ ...data, id: editingVideo.id });
      if (result.success) {
        setShowForm(false);
        setEditingVideo(null);
        await loadVideos();
      } else {
        throw new Error(result.error || 'Failed to update video');
      }
    } else {
      const result = await createVideo(data);
      if (result.success) {
        setShowForm(false);
        await loadVideos();
      } else {
        throw new Error(result.error || 'Failed to create video');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingVideo(null);
  };

  const getVideoSource = (url: string) => {
    return validateYouTubeUrl(url) ? 'YouTube' : 'Uploaded';
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <VideoForm
          initialData={editingVideo || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Videos Management
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create Video
        </button>
      </div>

      {error && (
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded"
          role="alert"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400">
            No videos found. Create your first video to get started.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Source
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Created
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {videos.map((video) => (
                <tr
                  key={video.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt=""
                          className="h-10 w-16 rounded object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {video.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          /{video.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {getVideoSource(video.video_url)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        video.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {video.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(video.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(video.id)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${video.title}"?`
                          )
                        ) {
                          handleDelete(video.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
