import React from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  title: string;
  description?: string;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  title,
  description,
  className = ""
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background-secondary/10 to-background" />
      
      {/* 상단 구분선 */}
      <div className="relative border-t border-border/50">
        {/* 좌우 긴 구분선 */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-border/30 via-border to-border/30" />
        {/* 중앙 장식 요소 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
      </div>
      
      {/* 컨텐츠 */}
      <div className="relative container-custom py-6">
        <div className="text-center">
          {/* 제목 */}
          <h2 className="text-xl font-bold text-text mb-2 bg-gradient-to-r from-text via-accent to-text bg-clip-text text-transparent">
            {title}
          </h2>
          
          {/* 설명 */}
          {description && (
            <div className="relative">
              <p className="text-text-secondary text-sm max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* 하단 구분선 */}
      <div className="relative border-b border-border/50">
        {/* 좌우 긴 구분선 */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-border/30 via-border to-border/30" />
        {/* 중앙 장식 요소 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
      </div>
    </div>
  );
};

export default SectionDivider;
