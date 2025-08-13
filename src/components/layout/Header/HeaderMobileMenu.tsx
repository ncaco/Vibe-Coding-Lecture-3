"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AuthUser } from '@/types';
import { mainNavigation } from '@/data/menu';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  isOpen,
  onClose,
  user,
  isAuthenticated
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  // 메뉴 토글 함수
  const toggleMenu = (menuId: string) => {
    const newExpandedMenus = new Set(expandedMenus);
    if (newExpandedMenus.has(menuId)) {
      newExpandedMenus.delete(menuId);
    } else {
      newExpandedMenus.add(menuId);
    }
    setExpandedMenus(newExpandedMenus);
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden py-4 border-t border-border">
      <nav className="flex flex-col space-y-2">
        {/* 메인 네비게이션 메뉴 */}
        {mainNavigation.map((item) => (
          <div key={item.id} className="border-b border-border/20">
            {item.children ? (
              // 2차 뎁스가 있는 메뉴
              <div>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="flex items-center justify-between w-full px-4 py-3 hover:bg-background-secondary transition-colors duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4 text-text-muted" />
                    <span className="text-sm font-medium text-text-secondary">
                      {item.name}
                    </span>
                  </div>
                  {expandedMenus.has(item.id) ? (
                    <ChevronDownIcon className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                
                {/* 2차 뎁스 */}
                {expandedMenus.has(item.id) && (
                  <div className="bg-background-secondary/50">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className="flex items-center space-x-3 px-8 py-2 hover:bg-background-secondary transition-colors duration-150"
                        onClick={onClose}
                      >
                        <subItem.icon className="w-4 h-4 text-text-muted" />
                        <span className="text-sm text-text-secondary">
                          {subItem.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // 2차 뎁스가 없는 메뉴
              <Link
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-background-secondary transition-colors duration-150"
                onClick={onClose}
              >
                <item.icon className="w-4 h-4 text-text-muted" />
                <span className="text-sm font-medium text-text-secondary">
                  {item.name}
                </span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
