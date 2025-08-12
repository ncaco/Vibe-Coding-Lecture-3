import Link from 'next/link';
import {
  SparklesIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { NavigationItem, NavigationSubItem } from '@/components/layout/Header/navigationData';

interface NavigationDropdownProps {
  item: NavigationItem;
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ item }) => {
  return (
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
              {item.submenu?.map((subItem: NavigationSubItem) => (
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
  );
};
