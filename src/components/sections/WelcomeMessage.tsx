'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const WelcomeMessage: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // 로딩 중이거나 로그인되지 않은 경우 아무것도 표시하지 않음
  if (loading || !isAuthenticated || !user) {
    return null;
  }

  return (
    <section className="py-8 bg-accent/5 border-b border-accent/10">
      <div className="container-custom">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-3">
            <span>👋</span>
            <span>환영합니다!</span>
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">
            안녕하세요, {user.email}님!
          </h2>
          <p className="text-text-secondary">
            Vibe 디자인 시스템을 사용하여 멋진 프로젝트를 만들어보세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
