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
  WrenchScrewdriverIcon,
  HomeIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  children?: MenuItem[];
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

// 메인 네비게이션 메뉴
export const mainNavigation: MenuItem[] = [
  {
    id: 'product',
    name: 'Product',
    href: '/features',
    icon: CogIcon,
    description: '혁신적인 개발 도구로 프로젝트를 가속화하고 품질을 향상시키세요',
    children: [
      { id: 'features', name: 'Features', href: '/features', icon: ChartBarIcon, description: '최신 기술을 활용한 강력한 기능으로 개발 효율성을 극대화하세요' },
      { id: 'integrations', name: 'Integrations', href: '/integrations', icon: WrenchScrewdriverIcon, description: '다양한 서비스와의 원활한 연동으로 워크플로우를 최적화하세요' },
      { id: 'api', name: 'API', href: '/api', icon: CodeBracketIcon, description: 'RESTful API 및 GraphQL을 통해 빠르고 안정적인 개발을 경험하세요' }
    ]
  },
  {
    id: 'portal',
    name: 'Portal',
    href: '/portal',
    icon: DocumentTextIcon,
    description: '개발자 포털에서 필요한 모든 리소스와 도구를 한 곳에서 찾아보세요',
    children: [
      { id: 'dashboard', name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, description: '직관적인 대시보드로 프로젝트 현황을 한눈에 파악하고 관리하세요' },
      { id: 'templates', name: 'Templates', href: '/templates', icon: DocumentTextIcon, description: '검증된 템플릿으로 개발 시간을 단축하고 일관된 품질을 보장하세요' },
      { id: 'documentation', name: 'Documentation', href: '/docs', icon: BookOpenIcon, description: '체계적이고 상세한 문서로 모든 기능을 효과적으로 활용하세요' }
    ]
  },
  {
    id: 'resources',
    name: 'Resources',
    href: '/about',
    icon: BookOpenIcon,
    description: '개발에 필요한 가이드, 문서, 예제를 체계적으로 제공합니다',
    children: [
      { id: 'about', name: 'About', href: '/about', icon: UserGroupIcon, description: 'Vibe의 비전과 미션, 그리고 우리가 추구하는 가치를 확인하세요' },
      { id: 'blog', name: 'Blog', href: '/blog', icon: DocumentTextIcon, description: '최신 기술 트렌드와 개발 인사이트를 담은 전문적인 콘텐츠를 만나보세요' },
      { id: 'support', name: 'Support', href: '/support', icon: QuestionMarkCircleIcon, description: '전문적인 고객 지원팀이 언제든 도움을 드립니다' }
    ]
  },
  {
    id: 'pricing',
    name: 'Pricing',
    href: '/pricing',
    icon: CurrencyDollarIcon,
    description: '합리적인 가격으로 최고의 개발 도구를 경험하세요'
  },
  {
    id: 'customers',
    name: 'Customers',
    href: '/customers',
    icon: UserGroupIcon,
    description: 'Vibe를 사용하는 고객들의 실제 성공 사례와 경험을 확인하세요',
    children: [
      { id: 'case-studies', name: 'Case Studies', href: '/case-studies', icon: ChartBarIcon, description: '실제 프로젝트에서의 성공 사례와 구체적인 활용 방법을 학습하세요' },
      { id: 'testimonials', name: 'Testimonials', href: '/testimonials', icon: UserGroupIcon, description: '고객들의 생생한 후기와 평가로 Vibe의 가치를 확인하세요' }
    ]
  },
  {
    id: 'now',
    name: 'Now',
    href: '/now',
    icon: ChartBarIcon,
    description: 'Vibe의 최신 소식과 업데이트를 확인하세요'
  },
  {
    id: 'components',
    name: 'Components',
    href: '/components',
    icon: CodeBracketIcon,
    description: '재사용 가능한 UI 컴포넌트로 일관되고 아름다운 디자인을 구현하세요'
  },
  {
    id: 'contact',
    name: 'Contact',
    href: '/contact',
    icon: PhoneIcon,
    description: '문의사항이나 제안사항이 있으시면 언제든 연락주세요'
  }
];

// 모바일 사이드바 메뉴
export const mobileSidebarMenu: MenuSection[] = [
  {
    id: 'main',
    title: '메인 메뉴',
    items: [
      { id: 'home', name: '홈', href: '/', icon: HomeIcon },
      { id: 'components', name: 'Components', href: '/components', icon: CodeBracketIcon, badge: 'New' }
    ]
  },
  {
    id: 'navigation',
    title: '네비게이션',
    items: mainNavigation.filter(item => !item.children || item.children.length === 0)
  },
  {
    id: 'resources',
    title: '리소스',
    items: [
      { id: 'docs', name: '개발자 문서', href: '/docs', icon: DocumentTextIcon },
      { id: 'examples', name: '예제 및 샘플', href: '/examples', icon: CodeBracketIcon },
      { id: 'community', name: '커뮤니티', href: '/community', icon: UserGroupIcon },
      { id: 'tutorials', name: '튜토리얼', href: '/tutorials', icon: BookOpenIcon }
    ]
  },
  {
    id: 'company',
    title: '회사 정보',
    items: [
      { id: 'about', name: '회사 소개', href: '/about', icon: InformationCircleIcon },
      { id: 'contact', name: '연락처', href: '/contact', icon: EnvelopeIcon }
    ]
  }
];

// 사용자 메뉴 (인증 상태에 따라)
export const getUserMenu = (isAuthenticated: boolean): MenuItem[] => {
  if (isAuthenticated) {
    return [
      { id: 'profile', name: '프로필', href: '/profile', icon: UserIcon },
      { id: 'settings', name: '설정', href: '/settings', icon: Cog6ToothIcon },
      { id: 'logout', name: '로그아웃', href: '#', icon: ArrowRightOnRectangleIcon }
    ];
  }
  
  return [
    { id: 'login', name: '로그인', href: '/login', icon: UserIcon },
    { id: 'signup', name: '회원가입', href: '/signup', icon: UserPlusIcon }
  ];
};

// 빠른 링크 메뉴
export const quickLinks: MenuItem[] = [
  { id: 'docs', name: '문서', href: '/docs', icon: DocumentTextIcon },
  { id: 'examples', name: '예제', href: '/examples', icon: CodeBracketIcon },
  { id: 'community', name: '커뮤니티', href: '/community', icon: UserGroupIcon },
  { id: 'support', name: '지원', href: '/support', icon: QuestionMarkCircleIcon }
];

// 푸터 메뉴
export const footerMenu: MenuSection[] = [
  {
    id: 'product',
    title: '제품',
    items: [
      { id: 'features', name: '기능', href: '/features', icon: CogIcon },
      { id: 'pricing', name: '가격', href: '/pricing', icon: CurrencyDollarIcon },
      { id: 'integrations', name: '연동', href: '/integrations', icon: WrenchScrewdriverIcon }
    ]
  },
  {
    id: 'company',
    title: '회사',
    items: [
      { id: 'about', name: '소개', href: '/about', icon: InformationCircleIcon },
      { id: 'blog', name: '블로그', href: '/blog', icon: DocumentTextIcon },
      { id: 'careers', name: '채용', href: '/careers', icon: UserGroupIcon }
    ]
  },
  {
    id: 'support',
    title: '지원',
    items: [
      { id: 'help', name: '도움말', href: '/help', icon: QuestionMarkCircleIcon },
      { id: 'contact', name: '연락처', href: '/contact', icon: EnvelopeIcon },
      { id: 'status', name: '상태', href: '/status', icon: ChartBarIcon }
    ]
  }
];
