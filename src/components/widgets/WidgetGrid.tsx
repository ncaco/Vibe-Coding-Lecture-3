'use client';

import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Card } from '@/components/ui';
import { Clock, Calendar, Weather, Chart, Todo } from '@/components/widgets';
import { cn } from '@/lib/utils';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface WidgetItem {
  id: string;
  type: 'clock' | 'calendar' | 'weather' | 'chart' | 'todo';
  variant?: string;
  title?: string;
  props?: Record<string, any>;
}

interface WidgetGridProps {
  className?: string;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ className = '' }) => {
  // 기본 위젯 설정
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: 'clock-1', type: 'clock', variant: 'digital', title: '디지털 시계' },
    { id: 'calendar-1', type: 'calendar', title: '일정 관리' },
    { id: 'weather-1', type: 'weather', title: '현재 날씨' },
    { id: 'chart-1', type: 'chart', variant: 'line', title: '매출 추이' },
    { id: 'todo-1', type: 'todo', title: '할 일 목록' }
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
      { i: 'todo-1', x: 4, y: 4, w: 4, h: 4 }
    ],
    md: [
      { i: 'clock-1', x: 0, y: 0, w: 4, h: 2 },
      { i: 'calendar-1', x: 4, y: 0, w: 5, h: 4 },
      { i: 'weather-1', x: 0, y: 2, w: 4, h: 3 },
      { i: 'chart-1', x: 4, y: 4, w: 5, h: 3 },
      { i: 'todo-1', x: 0, y: 5, w: 4, h: 4 }
    ],
    sm: [
      { i: 'clock-1', x: 0, y: 0, w: 3, h: 2 },
      { i: 'calendar-1', x: 0, y: 2, w: 3, h: 4 },
      { i: 'weather-1', x: 0, y: 6, w: 3, h: 3 },
      { i: 'chart-1', x: 0, y: 9, w: 3, h: 3 },
      { i: 'todo-1', x: 0, y: 12, w: 3, h: 4 }
    ],
    xs: [
      { i: 'clock-1', x: 0, y: 0, w: 2, h: 2 },
      { i: 'calendar-1', x: 0, y: 2, w: 2, h: 4 },
      { i: 'weather-1', x: 0, y: 6, w: 2, h: 3 },
      { i: 'chart-1', x: 0, y: 9, w: 2, h: 3 },
      { i: 'todo-1', x: 0, y: 12, w: 2, h: 4 }
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
        <div className="flex flex-wrap gap-2">
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
                  onClick={() => removeWidget(widget.id)}
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
            <li>• 위젯별 최소 크기: 시계(3×2), 달력(5×4), 날씨(3×3), 차트(4×3), 할 일(4×4)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default WidgetGrid;
