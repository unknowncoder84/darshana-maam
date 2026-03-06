'use client';

import { useEffect, useState } from 'react';
import { Article } from '@/lib/types/database';
import {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
} from '@/app/actions/articles';
import ArticleForm, { ArticleFormData } from '@/components/admin/ArticleForm';

export default function ArticlesManagementPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    const result = await listArticles();
    if (result.success && result.data) {
      setArticles(result.data);
    } else {
      setError(result.error || 'Failed to load articles');
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setShowForm(true);
  };

  const handleEdit = async (id: string) => {
    const result = await getArticleById(id);
    if (result.success && result.data) {
      setEditingArticle(result.data);
      setShowForm(true);
    } else {
      setError(result.error || 'Failed to load article');
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteArticle(id);
    if (result.success) {
      await loadArticles();
    } else {
      setError(result.error || 'Failed to delete article');
    }
  };

  const handleSubmit = async (data: ArticleFormData) => {
    if (editingArticle) {
      const result = await updateArticle(editingArticle.id, data);
      if (result.success) {
        setShowForm(false);
        setEditingArticle(null);
        await loadArticles();
      } else {
        throw new Error(result.error || 'Failed to update article');
      }
    } else {
      const result = await createArticle(data);
      if (result.success) {
        setShowForm(false);
        await loadArticles();
      } else {
        throw new Error(result.error || 'Failed to create article');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingArticle(null);
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <ArticleForm
          initialData={editingArticle || undefined}
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
          Articles Management
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create Article
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
      ) : articles.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400">
            No articles found. Create your first article to get started.
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
                  Tags
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
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        /{article.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {article.tags && article.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{article.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 dark:text-gray-500">
                        No tags
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(article.id)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${article.title}"?`
                          )
                        ) {
                          handleDelete(article.id);
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
