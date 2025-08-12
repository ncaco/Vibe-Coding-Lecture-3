import Link from 'next/link';
import Button from '../../ui/Button';
import { AuthUser } from '@/types';

interface HeaderActionsProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  user,
  isAuthenticated,
  onLogout,
  onMobileMenuToggle,
  isMobileMenuOpen
}) => {
  return (
    <>
      {/* Desktop CTA - 오른쪽 배치 */}
      <div className="hidden md:flex items-center space-x-3 ml-auto">
        {isAuthenticated ? (
          <>
            <div className="flex items-center space-x-3">
              {/* 사용자 프로필 이미지 */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-accent/10 border border-border flex items-center justify-center">
                {user?.name ? (
                  <span className="text-accent font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="text-sm"
              >
                로그아웃
              </Button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-accent hover:bg-accent-hover text-white">
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu button - 오른쪽 끝 배치 */}
      <button
        className="md:hidden p-2 text-text-secondary hover:text-text hover:bg-background-secondary rounded-lg transition-colors ml-auto"
        onClick={onMobileMenuToggle}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </>
  );
};
