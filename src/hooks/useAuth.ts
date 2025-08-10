import { useState, useEffect } from 'react';
import { getCurrentUser, getCurrentSession, signOut, onAuthStateChange } from '@/lib/auth';
import type { AuthUser, AuthSession } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 인증 상태 확인
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

    // 인증 상태 변화 리스너 설정
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
  }, []);

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

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    logout
  };
}
