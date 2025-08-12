import React from 'react';
import {
  CogIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  ChartBarIcon,
  CodeBracketIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

export interface NavigationSubItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: NavigationSubItem[];
}

export const navigation: NavigationItem[] = [
  {
    name: 'Product',
    href: '/features',
    icon: CogIcon,
    submenu: [
      { name: 'Features', href: '/features', icon: ChartBarIcon },
      { name: 'Integrations', href: '/integrations', icon: WrenchScrewdriverIcon },
      { name: 'API', href: '/api', icon: CodeBracketIcon }
    ]
  },
  {
    name: 'Portal',
    href: '/portal',
    icon: DocumentTextIcon,
    submenu: [
      { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
      { name: 'Templates', href: '/templates', icon: DocumentTextIcon },
      { name: 'Documentation', href: '/docs', icon: BookOpenIcon }
    ]
  },
  {
    name: 'Resources',
    href: '/about',
    icon: BookOpenIcon,
    submenu: [
      { name: 'About', href: '/about', icon: UserGroupIcon },
      { name: 'Blog', href: '/blog', icon: DocumentTextIcon },
      { name: 'Support', href: '/support', icon: QuestionMarkCircleIcon }
    ]
  },
  {
    name: 'Pricing',
    href: '/pricing',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: UserGroupIcon,
    submenu: [
      { name: 'Case Studies', href: '/case-studies', icon: ChartBarIcon },
      { name: 'Testimonials', href: '/testimonials', icon: UserGroupIcon }
    ]
  },
  {
    name: 'Now',
    href: '/now',
    icon: ChartBarIcon
  },
  {
    name: 'Components',
    href: '/components',
    icon: CodeBracketIcon
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: PhoneIcon
  }
];
