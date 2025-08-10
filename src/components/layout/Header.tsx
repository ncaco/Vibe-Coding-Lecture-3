'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();

  // 사용자 이메일에서 첫 2글자 추출
  const getUserInitials = (email: string) => {
    if (!email) return 'U';
    const parts = email.split('@')[0]; // @ 앞부분만 사용
    return parts.slice(0, 2).toUpperCase();
  };

  // 사용자 표시 이름 또는 이니셜 가져오기
  const getUserDisplay = () => {
    if (user?.name) {
      // 이름에서 공백 제거하고 4글자까지만 표시
      const cleanName = user.name.replace(/\s+/g, '');
      return cleanName.slice(0, 4);
    }
    if (user?.email) {
      return getUserInitials(user.email);
    }
    return 'U';
  };

  const navigation = [
    { name: 'Product', href: '/features' },
    { name: 'Resources', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Customers', href: '/customers' },
    { name: 'Now', href: '/now' },
    { name: 'Contact', href: '/contact' },
  ];

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
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-text">Vibe</span>
            </Link>
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
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-text">Vibe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-text transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/components">
              <Button variant="ghost" size="sm">
                Components
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  {/* 사용자 아바타 동그라미 */}
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {getUserDisplay()}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text hover:bg-background-secondary rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-text-secondary hover:text-text transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/components">
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    Components
                  </Button>
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2 border-b border-border">
                      {/* 모바일에서도 사용자 아바타 동그라미 */}
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {getUserDisplay()}
                        </span>
                      </div>
                      <span className="text-sm text-text-secondary">
                        {user?.name || user?.email}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-center"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      로그아웃
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="secondary" size="sm" className="w-full justify-center">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="w-full justify-center">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
