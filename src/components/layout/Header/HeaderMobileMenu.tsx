import Link from 'next/link';
import Button from '../../ui/Button';
import { User } from '@/types';
import { navigation, NavigationItem, NavigationSubItem } from '@/components/layout/Header/navigationData';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  isOpen,
  onClose,
  user,
  isAuthenticated,
  onLogout
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 border-t border-border">
      <nav className="flex flex-col space-y-3">
        {navigation.map((item: NavigationItem) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className="text-sm font-medium text-text-secondary hover:text-text transition-colors duration-200 block py-2"
              onClick={onClose}
            >
              {item.name}
            </Link>

            {/* 모바일 2차 메뉴 */}
            {item.submenu && (
              <div className="ml-4 mt-2 space-y-2">
                {item.submenu.map((subItem: NavigationSubItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="flex items-center space-x-3 px-3 py-2 hover:bg-background-secondary transition-colors duration-150"
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
                  onLogout();
                  onClose();
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
  );
};
