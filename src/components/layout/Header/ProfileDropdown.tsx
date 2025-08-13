"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { AuthUser } from '@/types';

interface ProfileDropdownProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  isAuthenticated,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // hydration 문제 해결을 위한 마운트 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 사용자 이니셜 가져오기
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // 테마 변경 함수
  const handleThemeChange = (newTheme: 'system' | 'dark' | 'light') => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  // 현재 활성 테마 확인 (system일 때 실제 테마)
  const getActiveTheme = () => {
    if (theme === 'system') {
      return resolvedTheme || 'light';
    }
    return theme;
  };

  if (!isAuthenticated || !mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 프로필 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-background-secondary transition-colors duration-200"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-accent/10 border border-border flex items-center justify-center">
          {user?.name ? (
            <span className="text-accent font-semibold text-sm">
              {getUserInitials()}
            </span>
          ) : (
            <UserIcon className="w-5 h-5 text-accent" />
          )}
        </div>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-xl shadow-2xl z-50">
          <div className="p-4">
            {/* 사용자 정보 */}
            <div className="border-b border-border pb-3 mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-accent/10 border border-border flex items-center justify-center">
                  {user?.name ? (
                    <span className="text-accent font-semibold text-base">
                      {getUserInitials()}
                    </span>
                  ) : (
                    <UserIcon className="w-6 h-6 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-text text-sm">
                    {user?.name || '사용자'}
                  </div>
                  <div className="text-xs text-text-muted truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* 메뉴 항목들 */}
            <div className="space-y-1">
              <Link
                href="/profile"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <UserIcon className="w-4 h-4 text-text-muted" />
                <span className="text-sm text-text-secondary">프로필</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <Cog6ToothIcon className="w-4 h-4 text-text-muted" />
                <span className="text-sm text-text-secondary">설정</span>
              </Link>
            </div>

            {/* 구분선 */}
            <div className="border-t border-border my-3"></div>

            {/* 테마 설정 */}
            <div className="mb-3">
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">
                테마
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-colors duration-200 w-full text-left ${
                    theme === 'system' ? 'bg-background-secondary' : ''
                  }`}
                >
                  <ComputerDesktopIcon className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">System</span>
                  {theme === 'system' && (
                    <div className="w-2 h-2 bg-accent rounded-full ml-auto"></div>
                  )}
                </button>

                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-colors duration-200 w-full text-left ${
                    theme === 'dark' ? 'bg-background-secondary' : ''
                  }`}
                >
                  <MoonIcon className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">Dark</span>
                  {theme === 'dark' && (
                    <div className="w-2 h-2 bg-accent rounded-full ml-auto"></div>
                  )}
                </button>

                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-colors duration-200 w-full text-left ${
                    theme === 'light' ? 'bg-background-secondary' : ''
                  }`}
                >
                  <SunIcon className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">Light</span>
                  {theme === 'light' && (
                    <div className="w-2 h-2 bg-accent rounded-full ml-auto"></div>
                  )}
                </button>
              </div>
            </div>

            {/* 구분선 */}
            <div className="border-t border-border my-3"></div>

            {/* 로그아웃 */}
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-colors duration-200 w-full text-left"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 text-text-muted" />
              <span className="text-sm text-text-secondary">로그아웃</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
