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
  UserPlusIcon,
  LightBulbIcon,
  PaintBrushIcon,
  BuildingOfficeIcon,
  AcademicCapIcon
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
    id: 'solutions',
    name: '솔루션',
    href: '/solutions',
    icon: CogIcon,
    description: 'HRUS와 MINT 솔루션으로 비즈니스 효율성을 극대화하세요',
    children: [
      { 
        id: 'hrus', 
        name: '인사예산솔루션 - HRUS', 
        href: '/solutions/hrus', 
        icon: ChartBarIcon, 
        description: '인사 예산 관리 및 분석 솔루션' 
      },
      { 
        id: 'mint', 
        name: '음성상담솔루션 - MINT', 
        href: '/solutions/mint', 
        icon: PhoneIcon, 
        description: '음성 기반 고객 상담 및 분석 솔루션' 
      }
    ]
  },
  {
    id: 'planners',
    name: '기획자',
    href: '/planners',
    icon: LightBulbIcon,
    description: '제품 기획부터 시장 분석까지 체계적인 기획 도구를 제공합니다',
    children: [
      { 
        id: 'product-planning', 
        name: 'Product Planning', 
        href: '/planners/product-planning', 
        icon: LightBulbIcon, 
        description: '제품 기획 및 전략' 
      },
      { 
        id: 'user-research', 
        name: 'User Research', 
        href: '/planners/user-research', 
        icon: UserGroupIcon, 
        description: '사용자 리서치 및 분석' 
      },
      { 
        id: 'requirements-analysis', 
        name: 'Requirements Analysis', 
        href: '/planners/requirements-analysis', 
        icon: DocumentTextIcon, 
        description: '요구사항 분석 및 정의' 
      },
      { 
        id: 'business-model', 
        name: 'Business Model', 
        href: '/planners/business-model', 
        icon: CurrencyDollarIcon, 
        description: '비즈니스 모델 및 전략' 
      },
      { 
        id: 'market-research', 
        name: 'Market Research', 
        href: '/planners/market-research', 
        icon: ChartBarIcon, 
        description: '시장 조사 및 경쟁 분석' 
      }
    ]
  },
  {
    id: 'designers',
    name: '디자이너',
    href: '/designers',
    icon: PaintBrushIcon,
    description: 'UI/UX 디자인부터 사용자 테스트까지 완벽한 디자인 솔루션',
    children: [
      { 
        id: 'ui-ux-design', 
        name: 'UI/UX Design', 
        href: '/designers/ui-ux-design', 
        icon: PaintBrushIcon, 
        description: '사용자 인터페이스 및 경험 디자인' 
      },
      { 
        id: 'design-system', 
        name: 'Design System', 
        href: '/designers/design-system', 
        icon: WrenchScrewdriverIcon, 
        description: '디자인 시스템 및 컴포넌트' 
      },
      { 
        id: 'prototyping', 
        name: 'Prototyping', 
        href: '/designers/prototyping', 
        icon: CodeBracketIcon, 
        description: '프로토타이핑 및 와이어프레임' 
      },
      { 
        id: 'user-testing', 
        name: 'User Testing', 
        href: '/designers/user-testing', 
        icon: UserGroupIcon, 
        description: '사용자 테스트 및 피드백' 
      },
      { 
        id: 'design-resources', 
        name: 'Design Resources', 
        href: '/designers/design-resources', 
        icon: BookOpenIcon, 
        description: '디자인 리소스 및 가이드' 
      }
    ]
  },
  {
    id: 'developers',
    name: '개발자',
    href: '/developers',
    icon: CodeBracketIcon,
    description: '개발에 필요한 모든 도구와 리소스를 한 곳에서 제공합니다',
    children: [
      { 
        id: 'documentation', 
        name: 'Documentation', 
        href: '/developers/documentation', 
        icon: BookOpenIcon, 
        description: '개발자 문서' 
      },
      { 
        id: 'api-reference', 
        name: 'API Reference', 
        href: '/developers/api-reference', 
        icon: CodeBracketIcon, 
        description: 'API 참조 가이드' 
      },
      { 
        id: 'libraries', 
        name: 'Libraries', 
        href: '/developers/libraries', 
        icon: WrenchScrewdriverIcon, 
        description: '라이브러리' 
      },
      { 
        id: 'examples', 
        name: 'Examples', 
        href: '/developers/examples', 
        icon: DocumentTextIcon, 
        description: '코드 예제 및 튜토리얼' 
      },
      { 
        id: 'community', 
        name: 'Community', 
        href: '/developers/community', 
        icon: UserGroupIcon, 
        description: '개발자 커뮤니티' 
      }
    ]
  },
  {
    id: 'company',
    name: '회사',
    href: '/company',
    icon: BuildingOfficeIcon,
    description: 'Vibe Coding의 비전과 미션, 그리고 우리 팀을 소개합니다',
    children: [
      { 
        id: 'about', 
        name: 'About', 
        href: '/company/about', 
        icon: InformationCircleIcon, 
        description: '회사 소개' 
      },
      { 
        id: 'careers', 
        name: 'Careers', 
        href: '/company/careers', 
        icon: UserGroupIcon, 
        description: '채용 정보' 
      },
      { 
        id: 'blog', 
        name: 'Blog', 
        href: '/company/blog', 
        icon: DocumentTextIcon, 
        description: '기술 블로그' 
      },
      { 
        id: 'press', 
        name: 'Press', 
        href: '/company/press', 
        icon: AcademicCapIcon, 
        description: '언론 보도자료' 
      }
    ]
  },
  {
    id: 'resources',
    name: '리소스',
    href: '/resources',
    icon: BookOpenIcon,
    description: '고객 성공 사례부터 교육 자료까지 다양한 리소스를 제공합니다',
    children: [
      { 
        id: 'case-studies', 
        name: 'Case Studies', 
        href: '/resources/case-studies', 
        icon: ChartBarIcon, 
        description: '고객 성공 사례' 
      },
      { 
        id: 'webinars', 
        name: 'Webinars', 
        href: '/resources/webinars', 
        icon: AcademicCapIcon, 
        description: '온라인 세미나' 
      },
      { 
        id: 'events', 
        name: 'Events', 
        href: '/resources/events', 
        icon: UserGroupIcon, 
        description: '이벤트 및 컨퍼런스' 
      },
      { 
        id: 'support', 
        name: 'Support', 
        href: '/resources/support', 
        icon: QuestionMarkCircleIcon, 
        description: '고객 지원' 
      },
      { 
        id: 'status', 
        name: 'Status', 
        href: '/resources/status', 
        icon: CogIcon, 
        description: '서비스 상태' 
      }
    ]
  },
  {
    id: 'contact',
    name: 'CONTACT',
    href: '/contact',
    icon: EnvelopeIcon,
    description: '문의사항이나 제안사항이 있으시면 언제든 연락주세요',
    children: [
      { 
        id: 'general-inquiry', 
        name: '문의하기', 
        href: '/contact/general', 
        icon: EnvelopeIcon, 
        description: '일반 문의' 
      },
      { 
        id: 'technical-support', 
        name: '기술지원', 
        href: '/contact/technical', 
        icon: WrenchScrewdriverIcon, 
        description: '기술 관련 문의' 
      },
      { 
        id: 'partnership', 
        name: '파트너십', 
        href: '/contact/partnership', 
        icon: UserGroupIcon, 
        description: '비즈니스 협력 문의' 
      },
      { 
        id: 'quote-inquiry', 
        name: '견적문의', 
        href: '/contact/quote', 
        icon: CurrencyDollarIcon, 
        description: '솔루션 견적 문의' 
      }
    ]
  },
  {
    id: 'components',
    name: '컴포넌트',
    href: '/components',
    icon: CodeBracketIcon,
    description: '재사용 가능한 UI 컴포넌트로 일관되고 아름다운 디자인을 구현하세요',
    children: [
      { id: 'ui-components', name: 'UI Components', href: '/components', icon: CodeBracketIcon, description: '버튼, 입력 필드, 카드 등 기본 UI 컴포넌트를 확인하세요' },
      { id: 'sections', name: 'Sections', href: '/components/sections', icon: DocumentTextIcon, description: 'Hero, Features, CTA 등 페이지 섹션 컴포넌트를 확인하세요' },
      { id: 'widgets', name: 'Widgets', href: '/components/widgets', icon: WrenchScrewdriverIcon, description: '시계, 달력, 날씨 등 다양한 위젯 컴포넌트를 확인하세요' }
    ]
  }
];

// 모바일 사이드바 메뉴
export const mobileSidebarMenu: MenuSection[] = [
  {
    id: 'main',
    title: '메인 메뉴',
    items: [
      { id: 'home', name: '홈', href: '/', icon: HomeIcon },
      { id: 'solutions', name: '솔루션', href: '/solutions', icon: CogIcon },
      { id: 'planners', name: '기획자', href: '/planners', icon: LightBulbIcon },
      { id: 'designers', name: '디자이너', href: '/designers', icon: PaintBrushIcon },
      { id: 'developers', name: '개발자', href: '/developers', icon: CodeBracketIcon }
    ]
  },
  {
    id: 'company',
    title: '회사 정보',
    items: [
      { id: 'about', name: '회사 소개', href: '/company/about', icon: InformationCircleIcon },
      { id: 'careers', name: '채용 정보', href: '/company/careers', icon: UserGroupIcon },
      { id: 'blog', name: '기술 블로그', href: '/company/blog', icon: DocumentTextIcon },
      { id: 'press', name: '언론 보도', href: '/company/press', icon: AcademicCapIcon }
    ]
  },
  {
    id: 'resources',
    title: '리소스',
    items: [
      { id: 'case-studies', name: '성공 사례', href: '/resources/case-studies', icon: ChartBarIcon },
      { id: 'webinars', name: '온라인 세미나', href: '/resources/webinars', icon: AcademicCapIcon },
      { id: 'events', name: '이벤트', href: '/resources/events', icon: UserGroupIcon },
      { id: 'support', name: '고객 지원', href: '/resources/support', icon: QuestionMarkCircleIcon }
    ]
  },
  {
    id: 'contact',
    title: '문의',
    items: [
      { id: 'general', name: '일반 문의', href: '/contact/general', icon: EnvelopeIcon },
      { id: 'technical', name: '기술지원', href: '/contact/technical', icon: WrenchScrewdriverIcon },
      { id: 'partnership', name: '파트너십', href: '/contact/partnership', icon: UserGroupIcon },
      { id: 'quote', name: '견적문의', href: '/contact/quote', icon: CurrencyDollarIcon }
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
  { id: 'hrus', name: 'HRUS', href: '/solutions/hrus', icon: ChartBarIcon },
  { id: 'mint', name: 'MINT', href: '/solutions/mint', icon: PhoneIcon },
  { id: 'docs', name: '문서', href: '/developers/documentation', icon: DocumentTextIcon },
  { id: 'support', name: '지원', href: '/resources/support', icon: QuestionMarkCircleIcon }
];
