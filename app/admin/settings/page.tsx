'use client';

import { useEffect, useState } from 'react';
import { FirmSettings } from '@/lib/types/database';
import { getSettings, updateSettings } from '@/app/actions/settings';
import SettingsForm, {
  SettingsFormData,
} from '@/components/admin/SettingsForm';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function SettingsManagementPage() {
  const { profile, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<FirmSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    const result = await getSettings();
    if (result.success && result.data) {
      setSettings(result.data);
    } else {
      setError(result.error || 'Failed to load settings');
    }
    setLoading(false);
  };

  const handleSubmit = async (data: SettingsFormData) => {
    const result = await updateSettings(data);
    if (result.success && result.data) {
      setSettings(result.data);
    } else {
      throw new Error(result.error || 'Failed to update settings');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded">
        You must be logged in to access this page.
      </div>
    );
  }

  if (profile.role !== 'admin') {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded">
        You do not have permission to access settings. Admin access required.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage your firm's information and social media links. These settings
          will be displayed on the public website.
        </p>
      </div>

      {error && (
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="max-w-3xl">
        <SettingsForm
          initialData={settings || undefined}
          onSubmit={handleSubmit}
          currentUserRole={profile.role}
        />
      </div>
    </div>
  );
}
