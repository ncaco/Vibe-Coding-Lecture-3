'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, getCurrentSession, signOut, onAuthStateChange } from '@/lib/auth';
import type { AuthUser, AuthSession } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 인증 상태 확인 (한 번만 실행)
    const checkAuth = async () => {
      try {
        const [userData, sessionData] = await Promise.all([
          getCurrentUser(),
          getCurrentSession()
        ]);
        
        setUser(userData);
        setSession(sessionData);
      } catch (error) {
        console.error('인증 상태 확인 중 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // 인증 상태 변화 리스너 설정 (한 번만 설정)
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []); // 빈 의존성 배열로 한 번만 실행

  const logout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        console.error('로그아웃 중 오류:', error);
        return { error };
      }
      
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
      return { error };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
