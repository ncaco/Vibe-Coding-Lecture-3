'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart3, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  color?: string;
}

interface StatsProps {
  title?: string;
  data?: StatItem[];
  compact?: boolean;
  showTrends?: boolean;
  showIcons?: boolean;
  className?: string;
}

const Stats: React.FC<StatsProps> = ({
  title = '통계',
  data = [],
  compact = false,
  showTrends = true,
  showIcons = true,
  className = ''
}) => {
  const [stats, setStats] = useState<StatItem[]>([
    {
      label: '방문자',
      value: 1247,
      change: 12.5,
      changeType: 'increase',
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'text-blue-500'
    },
    {
      label: '매출',
      value: 45600,
      change: -2.3,
      changeType: 'decrease',
      icon: <Target className="w-4 h-4" />,
      color: 'text-green-500'
    },
    {
      label: '전환율',
      value: 3.2,
      change: 0.8,
      changeType: 'increase',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-purple-500'
    },
    {
      label: '성과',
      value: 89,
      change: 0,
      changeType: 'neutral',
      icon: <Zap className="w-4 h-4" />,
      color: 'text-yellow-500'
    }
  ]);

  const formatValue = (value: number, label: string) => {
    if (label === '매출') return `₩${value.toLocaleString()}`;
    if (label === '전환율' || label === '성과') return `${value}%`;
    return value.toLocaleString();
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (compact) {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex items-center justify-center mb-3">
          <BarChart3 className="w-4 h-4 text-accent mr-2" />
          <h3 className="text-sm font-semibold text-text">{title}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {stats.slice(0, 4).map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-text">
                {formatValue(stat.value, stat.label)}
              </div>
              <div className="text-xs text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4", className)}>
      <div className="flex items-center justify-center mb-4">
        <BarChart3 className="w-5 h-5 text-accent mr-2" />
        <h3 className="text-lg font-semibold text-text">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              {showIcons && (
                <div className={cn("p-2 rounded-lg bg-background", stat.color)}>
                  {stat.icon}
                </div>
              )}
              <div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
                <div className="text-lg font-semibold text-text">
                  {formatValue(stat.value, stat.label)}
                </div>
              </div>
            </div>
            
            {showTrends && (
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {getChangeIcon(stat.changeType)}
                  <span className={cn("text-sm font-medium", getChangeColor(stat.changeType))}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
