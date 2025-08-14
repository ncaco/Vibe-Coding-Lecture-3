'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle, Info, Check, Trash2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
  category: 'email' | 'message' | 'system' | 'app';
}

interface NotificationsProps {
  title?: string;
  notifications?: Notification[];
  compact?: boolean;
  showCategories?: boolean;
  showPriority?: boolean;
  maxItems?: number;
  className?: string;
}

const Notifications: React.FC<NotificationsProps> = ({
  title = '알림',
  notifications = [],
  compact = false,
  showCategories = true,
  showPriority = true,
  maxItems = 10,
  className = ''
}) => {
  const [notifs, setNotifs] = useState<Notification[]>([
    {
      id: 1,
      title: '새 이메일 도착',
      message: '프로젝트 업데이트에 대한 새로운 이메일이 도착했습니다.',
      type: 'info',
      priority: 'medium',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      category: 'email'
    },
    {
      id: 2,
      title: '시스템 경고',
      message: '디스크 공간이 부족합니다. 정리가 필요합니다.',
      type: 'warning',
      priority: 'high',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      category: 'system'
    },
    {
      id: 3,
      title: '메시지 수신',
      message: '팀원으로부터 새로운 메시지가 도착했습니다.',
      type: 'info',
      priority: 'low',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      category: 'message'
    },
    {
      id: 4,
      title: '업데이트 완료',
      message: '애플리케이션이 성공적으로 업데이트되었습니다.',
      type: 'success',
      priority: 'low',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      category: 'app'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      case 'app':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
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

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id: number) => {
    setNotifs(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifs(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifs
    .filter(notif => {
      if (filter === 'unread') return !notif.read;
      if (filter === 'high') return notif.priority === 'high';
      return true;
    })
    .filter(notif => {
      if (categoryFilter === 'all') return true;
      return notif.category === categoryFilter;
    })
    .slice(0, maxItems);

  const unreadCount = notifs.filter(n => !n.read).length;
  const highPriorityCount = notifs.filter(n => n.priority === 'high').length;

  if (compact) {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex items-center justify-center mb-3">
          <Bell className="w-4 h-4 text-accent mr-2" />
          <h3 className="text-sm font-semibold text-text">{title}</h3>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          {filteredNotifications.slice(0, 3).map((notif) => (
            <div
              key={notif.id}
              className={cn("p-2 rounded-lg text-xs", 
                notif.read ? "bg-background-secondary" : "bg-blue-50 border-l-4 border-blue-500"
              )}
            >
              <div className="font-medium text-text truncate">{notif.title}</div>
              <div className="text-text-secondary truncate">{notif.message}</div>
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
          <Bell className="w-5 h-5 text-accent mr-2" />
          <h3 className="text-lg font-semibold text-text">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
          {highPriorityCount > 0 && (
            <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
              {highPriorityCount}
            </span>
          )}
        </div>
      </div>
      
      {/* 필터 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={cn("px-3 py-1 text-xs rounded-lg transition-colors",
            filter === 'all' ? "bg-accent text-white" : "bg-background-secondary hover:bg-background"
          )}
        >
          전체
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={cn("px-3 py-1 text-xs rounded-lg transition-colors",
            filter === 'unread' ? "bg-accent text-white" : "bg-background-secondary hover:bg-background"
          )}
        >
          읽지 않음 ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('high')}
          className={cn("px-3 py-1 text-xs rounded-lg transition-colors",
            filter === 'high' ? "bg-accent text-white" : "bg-background-secondary hover:bg-background"
          )}
        >
          중요 ({highPriorityCount})
        </button>
      </div>
      
      {/* 카테고리 필터 */}
      {showCategories && (
        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'email', 'message', 'system', 'app'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn("px-3 py-1 text-xs rounded-lg transition-colors flex items-center space-x-1",
                categoryFilter === cat ? "bg-accent text-white" : "bg-background-secondary hover:bg-background"
              )}
            >
              {getCategoryIcon(cat)}
              <span>{cat === 'all' ? '전체' : cat === 'email' ? '이메일' : cat === 'message' ? '메시지' : cat === 'system' ? '시스템' : '앱'}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* 알림 목록 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>알림이 없습니다</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={cn("p-3 rounded-lg border-l-4 transition-all",
                getPriorityColor(notif.priority),
                notif.read ? "bg-background-secondary opacity-75" : "bg-background"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getTypeIcon(notif.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={cn("font-medium text-sm", notif.read ? "text-text-secondary" : "text-text")}>
                        {notif.title}
                      </h4>
                      {showPriority && (
                        <span className={cn("px-2 py-1 text-xs rounded-full",
                          notif.priority === 'high' ? "bg-red-100 text-red-700" :
                          notif.priority === 'medium' ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        )}>
                          {notif.priority === 'high' ? '높음' : notif.priority === 'medium' ? '보통' : '낮음'}
                        </span>
                      )}
                    </div>
                    <p className={cn("text-sm mb-2", notif.read ? "text-text-secondary" : "text-text")}>
                      {notif.message}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      {getCategoryIcon(notif.category)}
                      <span>{notif.category === 'email' ? '이메일' : notif.category === 'message' ? '메시지' : notif.category === 'system' ? '시스템' : '앱'}</span>
                      <span>•</span>
                      <span>{formatTime(notif.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="p-1 hover:bg-background-secondary rounded transition-colors"
                      title="읽음 표시"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
