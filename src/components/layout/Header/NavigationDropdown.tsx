import Link from 'next/link';
import {
  SparklesIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { MenuItem } from '@/data/menu';

interface NavigationDropdownProps {
  item: MenuItem;
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ item }) => {
  return (
    <div className="absolute top-full left-0 mt-3 w-[600px] bg-background border border-border rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <div className="p-6">
        {/* 헤더 섹션 */}
        <div className="border-b border-border pb-4 mb-4">
          <h3 className="text-xl font-bold text-text mb-2">{item.name}</h3>
          <p className="text-text-muted text-sm">
            {item.description}
          </p>
        </div>

        {/* 메인 콘텐츠 */}
        <div>
          {/* 핵심 기능 */}
          <div>
            <div className="space-y-2">
              {item.children?.map((subItem) => (
                <Link
                  key={subItem.id}
                  href={subItem.href}
                  className="group flex items-start space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-200">
                    <subItem.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-text group-hover:text-accent transition-colors duration-200">
                      {subItem.name}
                    </div>
                    <div className="text-xs text-text-muted mt-1 leading-relaxed">
                      {subItem.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
