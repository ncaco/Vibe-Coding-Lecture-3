import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { NavigationDropdown } from '@/components/layout/Header/NavigationDropdown';
import { navigation, NavigationItem } from '@/components/layout/Header/navigationData';

export const HeaderNavigation: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {navigation.map((item: NavigationItem) => (
        <div key={item.name} className="relative group">
          <Link
            href={item.href}
            className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-text transition-colors duration-200 py-2 px-1"
          >
            <span>{item.name}</span>
            {item.submenu && <ChevronDownIcon className="w-3 h-3 ml-1" />}
          </Link>

          {/* 2차 메뉴 */}
          {item.submenu && <NavigationDropdown item={item} />}
        </div>
      ))}
    </nav>
  );
};
