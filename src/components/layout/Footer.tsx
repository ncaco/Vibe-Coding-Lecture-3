import React from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/data/menu';
import { footerData } from '@/data/footer';

const Footer: React.FC = () => {
  // 푸터에 표시할 메뉴 항목들 (mainNavigation 전체)
  const footerMenuItems = mainNavigation;

  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left side - Logo and description */}
            <div className="lg:col-span-4">
              <Link href={footerData.logo.href} className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-xl font-bold text-text">{footerData.logo.text}</span>
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
                {footerData.description}
              </p>
            </div>

            {/* Right side - Navigation links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {footerMenuItems.map((section) => {
                  if (!section) return null;
                  
                  return (
                    <div key={section.id} className="space-y-3">
                      <h3 className="text-text font-semibold text-sm uppercase tracking-wider">
                        {section.children && section.children.length > 0 ? (
                          // 자식 메뉴가 있는 경우: 제목만 표시
                          section.name
                        ) : (
                          // 자식 메뉴가 없는 경우: 제목에 링크 추가
                          <Link
                            href={section.href}
                            className="hover:text-accent transition-colors duration-200"
                          >
                            {section.name}
                          </Link>
                        )}
                      </h3>
                      <ul className="space-y-2">
                        {section.children && section.children.length > 0 ? (
                          // 자식 메뉴가 있는 경우
                          section.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                className="text-text-secondary hover:text-text transition-colors duration-200 text-sm block py-1"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))
                        ) : (
                          // 자식 메뉴가 없는 경우 (단일 링크) - h3에 이미 링크가 있으므로 제거
                          null
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-text-secondary text-sm text-center sm:text-left">
                {footerData.copyright}
              </p>
              <div className="flex items-center space-x-6">
                {footerData.bottomLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="text-text-secondary hover:text-text transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
