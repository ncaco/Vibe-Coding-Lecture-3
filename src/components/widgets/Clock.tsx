'use client';

import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ClockProps {
  variant?: 'digital' | 'analog';
  showSeconds?: boolean;
  showDate?: boolean;
  timezone?: string;
  compact?: boolean;
  className?: string;
}

const Clock: React.FC<ClockProps> = ({
  variant = 'digital',
  showSeconds = true,
  showDate = true,
  timezone = 'local',
  compact = false,
  className = ''
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const { hours, minutes, seconds } = formatTime(time);

  if (variant === 'digital') {
    return (
      <div className={cn("flex flex-col items-center justify-center p-4", className)}>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <ClockIcon className="w-6 h-6 text-accent mr-2" />
            <h3 className="text-lg font-semibold text-text">시계</h3>
          </div>
          
          {compact ? (
            // Compact 모드: 시간만 표시
            <div className="text-3xl font-bold text-text mb-2">
              {hours}:{minutes}
            </div>
          ) : (
            // 일반 모드: 시간과 날짜 표시
            <>
              <div className="text-4xl font-bold text-text mb-2">
                {hours}:{minutes}
                {showSeconds && <span className="text-2xl text-text-secondary">:{seconds}</span>}
              </div>
              {showDate && (
                <div className="text-sm text-text-secondary mb-2">
                  {formatDate(time)}
                </div>
              )}
              <div className="text-xs text-text-secondary">
                {timezone === 'local' ? '로컬 시간' : timezone}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 아날로그 시계
  const angle = (time.getSeconds() / 60) * 360;
  
  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)}>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <ClockIcon className="w-6 h-6 text-accent mr-2" />
          <h3 className="text-lg font-semibold text-text">시계</h3>
        </div>
        
        <div className="relative w-24 h-24 mx-auto mb-4">
          {/* 시계 외곽 */}
          <div className="absolute inset-0 rounded-full border-4 border-text-secondary"></div>
          
          {/* 시계 숫자들 */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => {
            const angle = (index * 30) - 90;
            const x = Math.cos(angle * Math.PI / 180) * 35 + 48;
            const y = Math.sin(angle * Math.PI / 180) * 35 + 48;
            
            return (
              <div
                key={num}
                className="absolute text-sm font-medium text-text"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {num}
              </div>
            );
          })}
          
          {/* 초침 */}
          <div
            className="absolute w-1 h-8 bg-accent origin-bottom"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -100%) rotate(${angle}deg)`
            }}
          ></div>
        </div>
        
        {!compact && showDate && (
          <div className="text-sm text-text-secondary mb-2">
            {formatDate(time)}
          </div>
        )}
        
        {!compact && (
          <div className="text-xs text-text-secondary">
            {timezone === 'local' ? '로컬 시간' : timezone}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clock;
