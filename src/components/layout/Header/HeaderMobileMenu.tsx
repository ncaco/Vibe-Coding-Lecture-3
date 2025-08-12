import Link from 'next/link';
import Button from '../../ui/Button';
import { AuthUser } from '@/types';
import { mobileSidebarMenu, getUserMenu } from '@/data/menu';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
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
      <nav className="flex flex-col space-y-6">
        {/* 메뉴 섹션들 */}
        {mobileSidebarMenu.map((section) => (
          <div key={section.id}>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-4">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-background-secondary transition-colors duration-150"
                  onClick={onClose}
                >
                  <item.icon className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary flex-1">
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* 사용자 메뉴 */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-4">
            사용자
          </h3>
          
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3 px-4 py-2 border-b border-border mb-3">
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
              
              <div className="space-y-1">
                {getUserMenu(true).map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-background-secondary transition-colors duration-150"
                    onClick={item.id === 'logout' ? () => { onLogout(); onClose(); } : onClose}
                  >
                    <item.icon className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-secondary">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-2 px-4">
              {getUserMenu(false).map((item) => (
                <Link key={item.id} href={item.href}>
                  <Button 
                    variant={item.id === 'signup' ? 'primary' : 'secondary'} 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={onClose}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
