'use client';

import React, { useState, useEffect } from 'react';
import { Target, Plus, CheckCircle, Circle, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Goal {
  id: number;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'health' | 'learning' | 'finance';
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface GoalsTrackerProps {
  title?: string;
  goals?: Goal[];
  compact?: boolean;
  showCompleted?: boolean;
  showProgress?: boolean;
  maxGoals?: number;
  className?: string;
}

const GoalsTracker: React.FC<GoalsTrackerProps> = ({
  title = '목표 추적',
  goals = [],
  compact = false,
  showCompleted = true,
  showProgress = true,
  maxGoals = 10,
  className = ''
}) => {
  const [goalsList, setGoalsList] = useState<Goal[]>([
    {
      id: 1,
      title: '프로젝트 완성',
      description: '웹 애플리케이션 개발 완료',
      category: 'work',
      target: 100,
      current: 75,
      unit: '%',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'high'
    },
    {
      id: 2,
      title: '독서 목표',
      description: '월 3권 읽기',
      category: 'learning',
      target: 3,
      current: 2,
      unit: '권',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: '운동 목표',
      description: '주 3회 운동하기',
      category: 'health',
      target: 3,
      current: 1,
      unit: '회',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'medium'
    },
    {
      id: 4,
      title: '저축 목표',
      description: '월 50만원 저축',
      category: 'finance',
      target: 500000,
      current: 350000,
      unit: '원',
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'high'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work':
        return <Target className="w-4 h-4 text-blue-500" />;
      case 'personal':
        return <Award className="w-4 h-4 text-purple-500" />;
      case 'health':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'learning':
        return <Award className="w-4 h-4 text-yellow-500" />;
      case 'finance':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      default:
        return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'work': return '업무';
      case 'personal': return '개인';
      case 'health': return '건강';
      case 'learning': return '학습';
      case 'finance': return '재정';
      default: return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getPriorityName = (priority: string) => {
    switch (priority) {
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return priority;
    }
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return '기한 초과';
    if (days === 0) return '오늘';
    if (days === 1) return '내일';
    if (days < 7) return `${days}일 남음`;
    if (days < 30) return `${Math.floor(days / 7)}주 남음`;
    return `${Math.floor(days / 30)}개월 남음`;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const toggleGoalCompletion = (id: number) => {
    setGoalsList(prev => prev.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const updateProgress = (id: number, newProgress: number) => {
    setGoalsList(prev => prev.map(goal => 
      goal.id === id ? { ...goal, current: Math.min(newProgress, goal.target) } : goal
    ));
  };

  const filteredGoals = goalsList
    .filter(goal => {
      if (filter === 'active') return !goal.completed;
      if (filter === 'completed') return goal.completed;
      return true;
    })
    .filter(goal => {
      if (categoryFilter === 'all') return true;
      return goal.category === categoryFilter;
    })
    .slice(0, maxGoals);

  const totalGoals = goalsList.length;
  const completedGoals = goalsList.filter(g => g.completed).length;
  const activeGoals = totalGoals - completedGoals;
  const overallProgress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  if (compact) {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex items-center justify-center mb-3">
          <Target className="w-4 h-4 text-accent mr-2" />
          <h3 className="text-sm font-semibold text-text">{title}</h3>
        </div>
        
        <div className="text-center mb-3">
          <div className="text-2xl font-bold text-text">{completedGoals}/{totalGoals}</div>
          <div className="text-xs text-text-secondary">완료된 목표</div>
        </div>
        
        <div className="space-y-2">
          {filteredGoals.slice(0, 3).map((goal) => (
            <div key={goal.id} className="text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-text truncate">{goal.title}</span>
                <span className="text-text-secondary">{goal.current}/{goal.target}{goal.unit}</span>
              </div>
              <div className="w-full bg-background-secondary rounded-full h-1.5">
                <div 
                  className={cn("h-1.5 rounded-full", getProgressColor((goal.current / goal.target) * 100))}
                  style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="w-5 h-5 text-accent mr-2" />
          <h3 className="text-lg font-semibold text-text">{title}</h3>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* 전체 진행률 */}
      {showProgress && (
        <div className="mb-4 p-3 bg-background-secondary rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text">전체 진행률</span>
            <span className="text-sm text-text-secondary">{overallProgress}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>활성: {activeGoals}</span>
            <span>완료: {completedGoals}</span>
            <span>전체: {totalGoals}</span>
          </div>
        </div>
      )}
      
      {/* 필터 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={cn("px-3 py-1 text-xs rounded-lg transition-colors",
              filter === f ? "bg-accent text-white" : "bg-background-secondary hover:bg-background"
            )}
          >
            {f === 'all' ? '전체' : f === 'active' ? '진행중' : '완료'}
          </button>
        ))}
      </div>
      
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'work', 'personal', 'health', 'learning', 'finance'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn("px-3 py-1 text-xs rounded-lg transition-colors flex items-center space-x-1",
              categoryFilter === cat ? "bg-accent text-white" : "bg-background-secondary hover:bg-background"
            )}
          >
            {getCategoryIcon(cat)}
            <span>{cat === 'all' ? '전체' : getCategoryName(cat)}</span>
          </button>
        ))}
      </div>
      
      {/* 목표 목록 */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredGoals.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>목표가 없습니다</p>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const progress = Math.round((goal.current / goal.target) * 100);
            const isOverdue = new Date() > goal.deadline && !goal.completed;
            
            return (
              <div
                key={goal.id}
                className={cn("p-3 rounded-lg border-l-4 transition-all",
                  getPriorityColor(goal.priority),
                  goal.completed ? "bg-green-50 border-l-green-500" : "bg-background"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => toggleGoalCompletion(goal.id)}
                      className="mt-1"
                    >
                      {goal.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-text-secondary hover:text-accent transition-colors" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={cn("font-medium text-sm", goal.completed && "line-through text-text-secondary")}>
                          {goal.title}
                        </h4>
                        <span className={cn("px-2 py-1 text-xs rounded-full",
                          goal.priority === 'high' ? "bg-red-100 text-red-700" :
                          goal.priority === 'medium' ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        )}>
                          {getPriorityName(goal.priority)}
                        </span>
                      </div>
                      
                      <p className={cn("text-sm mb-2", goal.completed && "text-text-secondary")}>
                        {goal.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(goal.category)}
                          <span>{getCategoryName(goal.category)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span className={cn(isOverdue && "text-red-500 font-medium")}>
                            {formatDeadline(goal.deadline)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 진행률 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>진행률: {progress}%</span>
                    <span>{goal.current}/{goal.target}{goal.unit}</span>
                  </div>
                  <div className="w-full bg-background-secondary rounded-full h-2">
                    <div 
                      className={cn("h-2 rounded-full transition-all duration-300", getProgressColor(progress))}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  {/* 진행률 조절 (완료되지 않은 목표만) */}
                  {!goal.completed && (
                    <input
                      type="range"
                      min="0"
                      max={goal.target}
                      value={goal.current}
                      onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider"
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GoalsTracker;
