'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { HeaderLogo } from '@/components/layout/Header/HeaderLogo';
import { HeaderNavigation } from '@/components/layout/Header/HeaderNavigation';
import { HeaderActions } from '@/components/layout/Header/HeaderActions';
import { HeaderMobileMenu } from '@/components/layout/Header/HeaderMobileMenu';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  // 로딩 중일 때는 기본 헤더만 표시
  if (loading) {
    return (
      <header className={cn(
        "sticky top-0 z-40 transition-all duration-300 border-b",
        "bg-background/95 backdrop-blur-md border-border shadow-lg"
      )}>
        <div className="container-custom px-4">
          <div className="flex items-center justify-between h-16">
            <HeaderLogo />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      "sticky top-0 z-40 transition-all duration-300 border-b",
      "bg-background/95 backdrop-blur-md border-border shadow-lg"
    )}>
      <div className="container-custom px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <HeaderLogo className="mr-8" />

          {/* Desktop Navigation - 왼쪽 배치 */}
          <HeaderNavigation />

          {/* Desktop CTA - 오른쪽 배치 */}
          <HeaderActions 
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>

        {/* Mobile Navigation */}
        <HeaderMobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          user={user}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </header>
  );
};

export default Header;
