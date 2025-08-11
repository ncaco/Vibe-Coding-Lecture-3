'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import {
  ChevronDownIcon,
  ArrowRightIcon,
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
  SparklesIcon
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, loading } = useAuth();

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

  const navigation = [
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

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  // 로딩 중일 때는 기본 헤더만 표시
  if (loading) {
    return (
      <header className={cn(
        "sticky top-0 z-40 transition-all duration-300 border-b",
        "bg-background/95 backdrop-blur-md border-border shadow-lg"
      )}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-text">Vibe</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      "sticky top-0 z-40 transition-all duration-300 border-b",
      "bg-background/95 backdrop-blur-md border-border shadow-lg"
    )}>
      <div className="container-custom">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-text">Vibe</span>
          </Link>

          {/* Desktop Navigation - 왼쪽 배치 */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-text transition-colors duration-200 py-2 px-1"
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDownIcon className="w-3 h-3 ml-1" />}
                </Link>

                {/* 2차 메뉴 */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-3 w-[800px] bg-background border border-border rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-8">
                      {/* 헤더 섹션 */}
                      <div className="border-b border-border pb-6 mb-6">
                        <h3 className="text-2xl font-bold text-text mb-2">{item.name}</h3>
                        <p className="text-text-muted text-sm">
                          {item.name === 'Product' && '강력한 개발 도구와 서비스로 프로젝트를 가속화하세요'}
                          {item.name === 'Portal' && '개발자 포털에서 필요한 모든 리소스를 찾아보세요'}
                          {item.name === 'Resources' && '개발에 필요한 가이드, 문서, 예제를 제공합니다'}
                          {item.name === 'Customers' && 'Vibe를 사용하는 고객들의 성공 사례를 확인하세요'}
                          {item.name === 'Components' && '재사용 가능한 UI 컴포넌트 라이브러리'}
                          {item.name === 'Contact' && '문의사항이나 제안사항이 있으시면 연락주세요'}
                        </p>
                      </div>

                      {/* 메인 콘텐츠 */}
                      <div className="grid grid-cols-3 gap-8">
                        {/* 왼쪽 컬럼 - 주요 기능 */}
                        <div>
                          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center">
                            <SparklesIcon className="w-4 h-4 mr-2" />
                            주요 기능
                          </h4>
                          <div className="space-y-3">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-background-secondary transition-all duration-200"
                              >
                                <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-200">
                                  <subItem.icon className="w-5 h-5 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-text group-hover:text-accent transition-colors duration-200">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs text-text-muted mt-1 leading-relaxed">
                                    {subItem.name === 'Features' && '주요 기능 및 특징을 살펴보고 프로젝트에 적용하세요'}
                                    {subItem.name === 'Integrations' && '다양한 서비스와의 연동으로 워크플로우를 최적화하세요'}
                                    {subItem.name === 'API' && 'RESTful API 및 GraphQL 문서로 빠른 개발을 경험하세요'}
                                    {subItem.name === 'Dashboard' && '프로젝트 관리 대시보드로 효율적인 개발을 진행하세요'}
                                    {subItem.name === 'Templates' && '빠른 시작을 위한 다양한 템플릿으로 개발 시간을 단축하세요'}
                                    {subItem.name === 'Documentation' && '개발자 가이드 및 문서로 모든 기능을 활용하세요'}
                                    {subItem.name === 'About' && 'Vibe에 대한 소개와 비전을 확인하세요'}
                                    {subItem.name === 'Blog' && '최신 소식 및 기술 블로그로 트렌드를 파악하세요'}
                                    {subItem.name === 'Support' && '고객 지원 및 문의로 문제를 해결하세요'}
                                    {subItem.name === 'Case Studies' && '성공 사례 및 사용 예시로 활용 방법을 학습하세요'}
                                    {subItem.name === 'Testimonials' && '고객 후기 및 평가로 신뢰성을 확인하세요'}
                                    {subItem.name === 'Components' && '재사용 가능한 UI 컴포넌트로 일관된 디자인을 구현하세요'}
                                    {subItem.name === 'Contact' && '문의 및 연락처로 필요한 정보를 얻으세요'}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* 중앙 컬럼 - 추가 리소스 */}
                        <div>
                          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center">
                            <BookOpenIcon className="w-4 h-4 mr-2" />
                            추가 리소스
                          </h4>
                          <div className="space-y-4">
                            <Link href="/docs" className="group block p-3 rounded-xl hover:bg-background-secondary transition-all duration-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                  <DocumentTextIcon className="w-4 h-4 text-blue-500" />
                                </div>
                                <div>
                                  <div className="font-medium text-text group-hover:text-blue-500 transition-colors duration-200">개발자 문서</div>
                                  <div className="text-xs text-text-muted">API 참조 및 가이드</div>
                                </div>
                              </div>
                            </Link>

                            <Link href="/examples" className="group block p-3 rounded-xl hover:bg-background-secondary transition-all duration-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                  <CodeBracketIcon className="w-4 h-4 text-green-500" />
                                </div>
                                <div>
                                  <div className="font-medium text-text group-hover:text-green-500 transition-colors duration-200">예제 및 샘플</div>
                                  <div className="text-xs text-text-muted">실용적인 코드 예제</div>
                                </div>
                              </div>
                            </Link>

                            <Link href="/community" className="group block p-3 rounded-xl hover:bg-background-secondary transition-all duration-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                  <UserGroupIcon className="w-4 h-4 text-purple-500" />
                                </div>
                                <div>
                                  <div className="font-medium text-text group-hover:text-purple-500 transition-colors duration-200">커뮤니티</div>
                                  <div className="text-xs text-text-muted">개발자들과 소통</div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* 오른쪽 컬럼 - 고객 후기 및 통계 */}
                        <div>
                          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center">
                            <ChartBarIcon className="w-4 h-4 mr-2" />
                            고객 성과
                          </h4>

                          {/* 고객 후기 */}
                          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 mb-4 border border-accent/20">
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                                <UserGroupIcon className="w-4 h-4 text-accent" />
                              </div>
                              <div className="text-xs text-accent font-medium">성공 사례</div>
                            </div>
                            <div className="text-sm font-semibold text-text mb-2">Vibe로 개발 속도 향상</div>
                            <div className="text-xs text-text-muted leading-relaxed">개발자들이 Vibe를 사용하여 평균 3배 빠른 개발 경험을 하고 있습니다.</div>
                          </div>

                          {/* 통계 */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                                  <ChartBarIcon className="w-3 h-3 text-green-500" />
                                </div>
                                <span className="text-xs text-text-muted">프로젝트 수</span>
                              </div>
                              <span className="text-sm font-semibold text-text">1,000+</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                  <UserGroupIcon className="w-3 h-3 text-blue-500" />
                                </div>
                                <span className="text-xs text-text-muted">활성 사용자</span>
                              </div>
                              <span className="text-sm font-semibold text-text">50K+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

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
                    onClick={handleLogout}
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

          {/* Mobile menu button - 우측 배치 */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text hover:bg-background-secondary rounded-lg transition-colors ml-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-text-secondary hover:text-text transition-colors duration-200 block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>

                  {/* 모바일 2차 메뉴 */}
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-3 px-3 py-2 hover:bg-background-secondary transition-colors duration-150"
                          onClick={() => setIsMobileMenuOpen(false)}
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
                        handleLogout();
                        setIsMobileMenuOpen(false);
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
        )}
      </div>
    </header>
  );
};

export default Header;
