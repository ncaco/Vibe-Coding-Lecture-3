import Link from 'next/link';
import Button from '../../ui/Button';
import { ProfileDropdown } from './ProfileDropdown';
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
          <ProfileDropdown 
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
          />
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
      <div className="md:hidden flex items-center space-x-2 ml-auto">
        {/* 모바일 프로필 */}
        {isAuthenticated && (
          <ProfileDropdown 
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
          />
        )}
        
        <button
          className="p-2 text-text-secondary hover:text-text hover:bg-background-secondary rounded-lg transition-colors"
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
      </div>
    </>
  );
};
