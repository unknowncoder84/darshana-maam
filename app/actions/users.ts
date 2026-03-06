'use server';

import { revalidatePath } from 'next/cache';
import type { Profile } from '@/lib/types/database';

// DEMO MODE: Simulated user data
const DEMO_USERS: Profile[] = [
  {
    id: 'demo-admin-001',
    username: 'admin',
    role: 'admin',
    created_at: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'demo-user-001',
    username: 'user',
    role: 'user',
    created_at: new Date('2026-01-15').toISOString(),
  },
  {
    id: 'demo-user-002',
    username: 'editor',
    role: 'user',
    created_at: new Date('2026-02-01').toISOString(),
  },
];

export async function createUser(data: {
  username: string;
  password: string;
  role: 'admin' | 'user';
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Validate password
  if (data.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  // Check if username already exists
  if (DEMO_USERS.some(u => u.username === data.username)) {
    throw new Error('Username already exists');
  }

  console.log('Demo: User created', data.username, data.role);
  
  revalidatePath('/admin/users');
  return { success: true, userId: `demo-${Date.now()}` };
}

export async function updateUserRole(userId: string, role: 'admin' | 'user') {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log('Demo: User role updated', userId, role);

  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteUser(userId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Prevent deleting demo admin
  if (userId === 'demo-admin-001') {
    throw new Error('Cannot delete the demo admin user');
  }

  console.log('Demo: User deleted', userId);

  revalidatePath('/admin/users');
  return { success: true };
}

export async function listUsers(): Promise<Profile[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  // Return demo users
  return [...DEMO_USERS];
}
