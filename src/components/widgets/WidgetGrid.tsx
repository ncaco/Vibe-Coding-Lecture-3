'use client';

import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';
import Clock from './Clock';
import Calendar from './Calendar';
import Weather from './Weather';
import Chart from './Chart';
import Todo from './Todo';
import Stats from './Stats';
import MusicPlayer from './MusicPlayer';
import Notifications from './Notifications';
import GoalsTracker from './GoalsTracker';
import WebSearch from './WebSearch';
import QuickNotes from './QuickNotes';
import SystemMonitor from './SystemMonitor';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// 위젯 타입 정의
type WidgetType = 'clock' | 'calendar' | 'weather' | 'chart' | 'todo' | 'stats' | 'music' | 'notifications' | 'goals' | 'search' | 'notes' | 'system';

interface WidgetItem {
  id: string;
  type: WidgetType;
  title: string;
  variant?: string;
  chartType?: string;
}

interface WidgetGridProps {
  className?: string;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ className = '' }) => {
  // 기본 위젯 설정
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: 'clock-1', type: 'clock', title: '디지털 시계' },
    { id: 'calendar-1', type: 'calendar', title: '일정 관리' },
    { id: 'weather-1', type: 'weather', title: '현재 날씨' },
    { id: 'chart-1', type: 'chart', variant: 'line', title: '매출 추이' },
    { id: 'todo-1', type: 'todo', title: '할 일 목록' },
    { id: 'stats-1', type: 'stats', title: '업무 통계' },
    { id: 'music-1', type: 'music', title: '음악 플레이어' },
    { id: 'notifications-1', type: 'notifications', title: '알림 센터' },
    { id: 'goals-1', type: 'goals', title: '목표 관리' },
    { id: 'search-1', type: 'search', title: '웹 검색' },
    { id: 'notes-1', type: 'notes', title: '빠른 메모' },
    { id: 'system-1', type: 'system', title: '시스템 모니터' }
  ]);

  // 위젯별 최소 크기 설정
  const getWidgetSize = (type: WidgetItem['type']) => {
    switch (type) {
      case 'clock':
        return { w: 3, h: 2 }; // 시계: 3×2 (가로 3칸, 세로 2칸) - 시간과 날짜가 잘 보이도록
      case 'calendar':
        return { w: 5, h: 4 }; // 달력: 5×4 (가로 5칸, 세로 4칸) - 월간 달력이 제대로 표시되도록
      case 'weather':
        return { w: 3, h: 3 }; // 날씨: 3×3 (가로 3칸, 세로 3칸) - 상세 정보가 잘 보이도록
      case 'chart':
        return { w: 4, h: 3 }; // 차트: 4×3 (가로 4칸, 세로 3칸) - 차트와 범례가 잘 보이도록
      case 'todo':
        return { w: 4, h: 4 }; // 할 일: 4×4 (가로 4칸, 세로 4칸) - 입력 필드와 목록이 잘 보이도록
      case 'stats':
        return { w: 4, h: 3 }; // 통계: 4×3 (가로 4칸, 세로 3칸) - 통계 정보가 잘 보이도록
      case 'music':
        return { w: 4, h: 4 }; // 음악: 4×4 (가로 4칸, 세로 4칸) - 플레이어와 플레이리스트가 잘 보이도록
      case 'notifications':
        return { w: 4, h: 4 }; // 알림: 4×4 (가로 4칸, 세로 4칸) - 알림 목록과 필터가 잘 보이도록
      case 'goals':
        return { w: 5, h: 4 }; // 목표: 5×4 (가로 5칸, 세로 4칸) - 목표 목록과 진행률이 잘 보이도록
      case 'search':
        return { w: 4, h: 3 }; // 검색: 4×3 (가로 4칸, 세로 3칸) - 검색 폼과 결과가 잘 보이도록
      case 'notes':
        return { w: 4, h: 4 }; // 메모: 4×4 (가로 4칸, 세로 4칸) - 메모 작성과 목록이 잘 보이도록
      case 'system':
        return { w: 4, h: 4 }; // 시스템: 4×4 (가로 4칸, 세로 4칸) - 시스템 정보와 차트가 잘 보이도록
      default:
        return { w: 3, h: 2 };
    }
  };

  // 레이아웃 상태 (위젯 위치 및 크기)
  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'clock-1', x: 0, y: 0, w: 3, h: 2 },
      { i: 'calendar-1', x: 3, y: 0, w: 5, h: 4 },
      { i: 'weather-1', x: 8, y: 0, w: 3, h: 3 },
      { i: 'chart-1', x: 0, y: 2, w: 4, h: 3 },
      { i: 'todo-1', x: 4, y: 2, w: 4, h: 4 },
      { i: 'stats-1', x: 0, y: 6, w: 4, h: 3 },
      { i: 'music-1', x: 4, y: 6, w: 4, h: 4 },
      { i: 'notifications-1', x: 0, y: 9, w: 4, h: 4 },
      { i: 'goals-1', x: 4, y: 10, w: 5, h: 4 },
      { i: 'search-1', x: 0, y: 13, w: 4, h: 3 },
      { i: 'notes-1', x: 4, y: 14, w: 4, h: 4 },
      { i: 'system-1', x: 0, y: 18, w: 4, h: 4 }
    ],
    md: [
      { i: 'clock-1', x: 0, y: 0, w: 4, h: 2 },
      { i: 'calendar-1', x: 4, y: 0, w: 5, h: 4 },
      { i: 'weather-1', x: 0, y: 2, w: 4, h: 3 },
      { i: 'chart-1', x: 4, y: 2, w: 5, h: 3 },
      { i: 'todo-1', x: 0, y: 5, w: 4, h: 4 },
      { i: 'stats-1', x: 4, y: 5, w: 5, h: 3 },
      { i: 'music-1', x: 0, y: 9, w: 4, h: 4 },
      { i: 'notifications-1', x: 4, y: 9, w: 5, h: 4 },
      { i: 'goals-1', x: 0, y: 13, w: 5, h: 4 },
      { i: 'search-1', x: 5, y: 13, w: 4, h: 3 },
      { i: 'notes-1', x: 0, y: 17, w: 4, h: 4 },
      { i: 'system-1', x: 4, y: 17, w: 5, h: 4 }
    ],
    sm: [
      { i: 'clock-1', x: 0, y: 0, w: 3, h: 2 },
      { i: 'calendar-1', x: 0, y: 2, w: 3, h: 4 },
      { i: 'weather-1', x: 0, y: 6, w: 3, h: 3 },
      { i: 'chart-1', x: 0, y: 9, w: 3, h: 3 },
      { i: 'todo-1', x: 0, y: 12, w: 3, h: 4 },
      { i: 'stats-1', x: 0, y: 16, w: 3, h: 3 },
      { i: 'music-1', x: 0, y: 19, w: 3, h: 4 },
      { i: 'notifications-1', x: 0, y: 23, w: 3, h: 4 },
      { i: 'goals-1', x: 0, y: 27, w: 3, h: 4 },
      { i: 'search-1', x: 0, y: 31, w: 3, h: 3 },
      { i: 'notes-1', x: 0, y: 34, w: 3, h: 4 },
      { i: 'system-1', x: 0, y: 38, w: 3, h: 4 }
    ],
    xs: [
      { i: 'clock-1', x: 0, y: 0, w: 2, h: 2 },
      { i: 'calendar-1', x: 0, y: 2, w: 2, h: 4 },
      { i: 'weather-1', x: 0, y: 6, w: 2, h: 3 },
      { i: 'chart-1', x: 0, y: 9, w: 2, h: 3 },
      { i: 'todo-1', x: 0, y: 12, w: 2, h: 4 },
      { i: 'stats-1', x: 0, y: 16, w: 2, h: 3 },
      { i: 'music-1', x: 0, y: 19, w: 2, h: 4 },
      { i: 'notifications-1', x: 0, y: 23, w: 2, h: 4 },
      { i: 'goals-1', x: 0, y: 27, w: 2, h: 4 },
      { i: 'search-1', x: 0, y: 31, w: 2, h: 3 },
      { i: 'notes-1', x: 0, y: 34, w: 2, h: 4 },
      { i: 'system-1', x: 0, y: 38, w: 2, h: 4 }
    ]
  });

  // 레이아웃 변경 핸들러
  const onLayoutChange = useCallback((currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  }, []);

  // 위젯 렌더링 함수
  const renderWidget = (widget: WidgetItem, layout?: any) => {
    const commonProps = {
      className: 'h-full',
      title: widget.title
    };

    // 위젯 크기에 따른 렌더링 모드 결정
    const isCompact = layout && (layout.w <= 2 || layout.h <= 2);
    const isMedium = layout && (layout.w <= 3 || layout.h <= 3);
    const isLarge = layout && (layout.w >= 4 && layout.h >= 3);

    switch (widget.type) {
      case 'clock':
        return (
          <Clock
            {...commonProps}
            variant={isCompact ? 'digital' : 'analog'}
            showSeconds={!isCompact}
            showDate={!isCompact}
            compact={isCompact}
          />
        );
      case 'calendar':
        return (
          <Calendar
            {...commonProps}
            compact={isCompact}
            showEvents={!isCompact}
            showNavigation={!isCompact}
            events={isLarge ? [
              {
                id: '1',
                date: new Date(),
                title: '팀 미팅',
                description: '주간 진행상황 공유',
                color: 'bg-blue-500'
              },
              {
                id: '2',
                date: new Date(Date.now() + 24 * 60 * 60 * 1000),
                title: '프로젝트 마감',
                description: '최종 검토 및 제출',
                color: 'bg-red-500'
              },
              {
                id: '3',
                date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                title: '클라이언트 미팅',
                description: '요구사항 검토',
                color: 'bg-green-500'
              }
            ] : []}
          />
        );
      case 'weather':
        return (
          <Weather
            {...commonProps}
            city="서울"
            unit="celsius"
            compact={isCompact}
            showDetails={isLarge}
            showForecast={isLarge}
          />
        );
      case 'chart':
        return (
          <Chart
            {...commonProps}
            type={widget.variant as 'line' | 'bar' | 'pie' | 'area'}
            height={isCompact ? 120 : isMedium ? 180 : 250}
            compact={isCompact}
            showLegend={!isCompact}
            showGrid={!isCompact}
          />
        );
      case 'todo':
        return (
          <Todo
            {...commonProps}
            maxItems={isCompact ? 3 : isMedium ? 5 : 10}
            compact={isCompact}
            showProgress={!isCompact}
            showFilters={!isCompact}
          />
        );
      case 'stats':
        return <Stats {...commonProps} />;
      case 'music':
        return <MusicPlayer {...commonProps} />;
      case 'notifications':
        return <Notifications {...commonProps} />;
      case 'goals':
        return <GoalsTracker {...commonProps} />;
      case 'search':
        return <WebSearch {...commonProps} />;
      case 'notes':
        return <QuickNotes {...commonProps} />;
      case 'system':
        return <SystemMonitor {...commonProps} />;
      default:
        return <div>알 수 없는 위젯</div>;
    }
  };

  // 위젯 추가 함수
  const addWidget = (type: WidgetItem['type'], variant?: string) => {
    const newId = `${type}-${Date.now()}`;
    const newWidget: WidgetItem = {
      id: newId,
      type,
      variant,
      title: `${type} 위젯`
    };

    // 위젯 타입에 따른 크기 설정
    const { w, h } = getWidgetSize(type);
    const newLayout = {
      i: newId,
      x: 0,
      y: 0,
      w,
      h
    };

    setWidgets(prev => [...prev, newWidget]);
    setLayouts(prev => ({
      lg: [...prev.lg, newLayout],
      md: [...prev.md, newLayout],
      sm: [...prev.sm, newLayout],
      xs: [...prev.xs, newLayout]
    }));
  };

  // 위젯 제거 함수
  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
    setLayouts(prev => ({
      lg: prev.lg.filter(layout => layout.i !== widgetId),
      md: prev.md.filter(layout => layout.i !== widgetId),
      sm: prev.sm.filter(layout => layout.i !== widgetId),
      xs: prev.xs.filter(layout => layout.i !== widgetId)
    }));
  };

  return (
    <div className={cn("w-full", className)}>
      {/* 위젯 추가 컨트롤 */}
      <Card className="mb-6 p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => addWidget('clock', 'digital')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 시계 위젯 (3×2)
            </button>
            <button
              onClick={() => addWidget('calendar')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 달력 위젯 (5×4)
            </button>
            <button
              onClick={() => addWidget('weather')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 날씨 위젯 (3×3)
            </button>
            <button
              onClick={() => addWidget('chart', 'line')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 차트 위젯 (4×3)
            </button>
            <button
              onClick={() => addWidget('todo')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 할 일 위젯 (4×4)
            </button>
            <button
              onClick={() => addWidget('stats')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 통계 위젯 (4×3)
            </button>
            <button
              onClick={() => addWidget('music')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 음악 위젯 (4×4)
            </button>
            <button
              onClick={() => addWidget('notifications')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 알림 위젯 (4×4)
            </button>
            <button
              onClick={() => addWidget('goals')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 목표 위젯 (5×4)
            </button>
            <button
              onClick={() => addWidget('search')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 검색 위젯 (4×3)
            </button>
            <button
              onClick={() => addWidget('notes')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 빠른 메모 위젯 (4×4)
            </button>
            <button
              onClick={() => addWidget('system')}
              className="px-3 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
            >
              + 시스템 모니터 위젯 (4×4)
            </button>
          </div>
      </Card>

      {/* 위젯 그리드 */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 8, md: 9, sm: 3, xs: 2, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        containerPadding={[16, 16]}
        useCSSTransforms={true}
        preventCollision={false}
        compactType="vertical"
      >
        {widgets.map((widget) => {
          const layout = layouts.lg.find(l => l.i === widget.id);
          return (
            <div key={widget.id} className="widget-container">
              <div className="widget-header">
                <span className="widget-title">{widget.title}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeWidget(widget.id);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="widget-remove-btn"
                  title="위젯 제거"
                >
                  ×
                </button>
              </div>
              <div className="widget-content">
                {renderWidget(widget, layout)}
              </div>
            </div>
          );
        })}
      </ResponsiveGridLayout>

      {/* 사용법 안내 */}
      <Card className="mt-6 p-4">
        <div className="text-sm text-text-secondary">
          <p className="mb-2">💡 사용법:</p>
          <ul className="space-y-1 text-xs">
            <li>• 위젯을 드래그하여 위치를 변경할 수 있습니다</li>
            <li>• 위젯의 모서리를 드래그하여 크기를 조정할 수 있습니다</li>
            <li>• 위의 버튼을 클릭하여 새로운 위젯을 추가할 수 있습니다</li>
            <li>• 각 위젯의 × 버튼을 클릭하여 제거할 수 있습니다</li>
            <li>• 위젯별 최소 크기: 시계(3×2), 달력(5×4), 날씨(3×3), 차트(4×3), 할 일(4×4), 통계(4×3), 음악(4×4), 알림(4×4), 목표(5×4), 검색(4×3), 메모(4×4), 시스템(4×4)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default WidgetGrid;
