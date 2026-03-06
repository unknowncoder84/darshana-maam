'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Profile } from '@/lib/types/database';

interface AuthContextValue {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// DEMO MODE: Hardcoded users for testing
const DEMO_USERS = [
  {
    id: 'demo-admin-001',
    username: 'admin',
    password: 'admin123',
    role: 'admin' as const,
    email: 'admin@demo.local',
  },
  {
    id: 'demo-user-001',
    username: 'user',
    password: 'user123',
    role: 'user' as const,
    email: 'user@demo.local',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedSession = localStorage.getItem('demo_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        setUser(session.user);
        setProfile(session.profile);
      } catch (error) {
        console.error('Error loading session:', error);
        localStorage.removeItem('demo_session');
      }
    }
    setLoading(false);
  }, []);

  async function signIn(username: string, password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user in demo users
    const demoUser = DEMO_USERS.find(
      u => u.username === username && u.password === password
    );

    if (!demoUser) {
      throw new Error('Invalid username or password');
    }

    // Create user and profile objects
    const userObj = {
      id: demoUser.id,
      email: demoUser.email,
    };

    const profileObj: Profile = {
      id: demoUser.id,
      username: demoUser.username,
      role: demoUser.role,
      created_at: new Date().toISOString(),
    };

    // Store in state
    setUser(userObj);
    setProfile(profileObj);

    // Store in localStorage for persistence
    localStorage.setItem('demo_session', JSON.stringify({
      user: userObj,
      profile: profileObj,
    }));
  }

  async function signOut() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    setUser(null);
    setProfile(null);
    localStorage.removeItem('demo_session');
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
