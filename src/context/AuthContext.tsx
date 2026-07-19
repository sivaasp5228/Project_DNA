import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (name: string, bio: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async (userId: string, email?: string) => {
    try {
      const profile = await authService.getUserProfile(userId);
      if (profile) {
        setUser(profile);
      } else {
        // Fallback user profile in case profile triggers lag slightly
        setUser({
          name: email ? email.split('@')[0] : 'Developer',
          email: email || '',
          joinedAt: new Date().toISOString(),
          stats: {
            totalEvaluations: 0,
            averageScore: 0,
            highestScore: 0
          }
        });
      }
    } catch (err) {
      console.error('Failed to resolve user profile details:', err);
    }
  };

  useEffect(() => {
    // 1. Resolve current session status on boot
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    // 2. Subscribe to auth session modifications
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsLoading(true);
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    const session = (await supabase.auth.getSession()).data.session;
    if (session?.user) {
      await fetchProfile(session.user.id, session.user.email);
    }
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await authService.signIn(email, password || '');
      return true;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const signup = async (name: string, email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await authService.signUp(name, email, password || '');
      return true;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (name: string, bio: string) => {
    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.user) throw new Error('Unauthenticated');
    
    await authService.updateUserProfile(session.user.id, name, bio);
    // Refresh user state
    await fetchProfile(session.user.id, session.user.email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
