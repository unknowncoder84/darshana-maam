'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import UserManagementTable from '@/components/admin/UserManagementTable';
import UserForm from '@/components/admin/UserForm';
import { listUsers, createUser, updateUserRole, deleteUser } from '@/app/actions/users';
import type { Profile, UserFormData } from '@/lib/types/database';

export default function UsersPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only admins can access this page
    if (profile && profile.role !== 'admin') {
      router.push('/admin/dashboard');
      return;
    }
    
    if (profile) {
      loadUsers();
    }
  }, [profile, router]);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
      setShowForm(true);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteUser(userId);
      await loadUsers();
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to delete user'}`);
    }
  };

  const handleSubmitUser = async (data: UserFormData) => {
    try {
      if (editingUser) {
        // Update user role only
        await updateUserRole(editingUser.id, data.role);
      } else {
        // Create new user
        if (!data.password) {
          alert('Password is required for new users');
          return;
        }
        await createUser({
          username: data.username,
          password: data.password,
          role: data.role,
        });
      }

      setShowForm(false);
      setEditingUser(null);
      await loadUsers();
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to save user'}`);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (profile?.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            User Management
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Create and manage system users with role-based access control
          </p>
        </div>
        {!showForm && (
          <button
            onClick={handleCreateUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 4v16m8-8H4" />
            </svg>
            Create User
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {showForm ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {editingUser ? 'Edit User' : 'Create New User'}
          </h2>
          <UserForm
            initialData={editingUser || undefined}
            onSubmit={handleSubmitUser}
            onCancel={handleCancelForm}
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <UserManagementTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            currentUserRole="admin"
          />
        </div>
      )}
    </div>
  );
}
