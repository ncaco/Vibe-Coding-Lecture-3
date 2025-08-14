'use client';

import React, { useState } from 'react';
import { Clock, Calendar, Weather, Chart, Todo, WidgetGrid } from '@/components/widgets';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function WidgetsPage() {
  const [viewMode, setViewMode] = useState<'demo' | 'grid'>('demo');
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(['clock', 'calendar', 'weather']);

  const widgetConfigs = {
    clock: {
      name: '시계',
      description: '디지털 및 아날로그 시계 위젯',
      variants: ['digital', 'analog']
    },
    calendar: {
      name: '달력',
      description: '월별 달력 및 이벤트 관리 위젯',
      variants: ['default']
    },
    weather: {
      name: '날씨',
      description: '현재 날씨 정보 및 예보 위젯',
      variants: ['default']
    },
    chart: {
      name: '차트',
      description: '다양한 유형의 데이터 시각화 차트',
      variants: ['line', 'bar', 'pie', 'area']
    },
    todo: {
      name: '할 일 목록',
      description: '할 일 관리 및 우선순위 설정 위젯',
      variants: ['default']
    }
  };

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const renderClockWidgets = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Clock variant="digital" showSeconds={true} showDate={true} />
      <Clock variant="analog" showSeconds={true} showDate={true} />
    </div>
  );

  const renderChartWidgets = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Chart type="line" title="매출 추이" height={250} />
      <Chart type="bar" title="월별 성과" height={250} />
      <Chart type="pie" title="카테고리별 분포" height={250} />
      <Chart type="area" title="사용자 증가율" height={250} />
    </div>
  );

  const renderCalendarWidget = () => (
    <Calendar 
      events={[
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
        }
      ]}
    />
  );

  const renderWeatherWidget = () => (
    <Weather city="서울" unit="celsius" />
  );

  const renderTodoWidget = () => (
    <Todo title="개인 할 일" maxItems={15} />
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-16">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-text mb-4">위젯 컴포넌트</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            대시보드와 애플리케이션에 바로 사용할 수 있는 다양한 위젯 컴포넌트들을 확인해보세요.
            각 위젯은 독립적으로 작동하며 필요에 따라 커스터마이징할 수 있습니다.
          </p>
          <div className="mt-6">
            <Badge variant="primary" size="lg">🎯 5+ 위젯 컴포넌트</Badge>
          </div>
        </div>

        {/* 뷰 모드 선택 */}
        <Card className="mb-8 p-4">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setViewMode('demo')}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all duration-200",
                viewMode === 'demo'
                  ? "bg-accent text-white shadow-lg"
                  : "bg-background-secondary text-text-secondary hover:bg-background-tertiary"
              )}
            >
              📱 데모 모드
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all duration-200",
                viewMode === 'grid'
                  ? "bg-accent text-white shadow-lg"
                  : "bg-background-secondary text-text-secondary hover:bg-background-tertiary"
              )}
            >
              🎯 바탕화면 모드
            </button>
          </div>
        </Card>

        {/* 데모 모드일 때만 위젯 선택 컨트롤 표시 */}
        {viewMode === 'demo' && (
          <Card className="mb-12 p-6">
            <h2 className="text-2xl font-bold text-text mb-6">위젯 선택</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(widgetConfigs).map(([id, config]) => (
                <button
                  key={id}
                  onClick={() => toggleWidget(id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                    "hover:border-accent/50 hover:bg-background-secondary",
                    selectedWidgets.includes(id) 
                      ? "border-accent bg-accent/5" 
                      : "border-border bg-background-secondary"
                  )}
                >
                  <div className="font-medium text-text mb-1">{config.name}</div>
                  <div className="text-xs text-text-secondary">{config.description}</div>
                  <div className="mt-2">
                    <Badge 
                      variant={selectedWidgets.includes(id) ? 'primary' : 'secondary'} 
                      size="sm"
                    >
                      {selectedWidgets.includes(id) ? '선택됨' : '선택'}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* 뷰 모드에 따른 콘텐츠 */}
        {viewMode === 'demo' ? (
          /* 데모 모드 - 기존 위젯 데모 */
          <div className="space-y-16">
            {/* 시계 위젯 */}
            {selectedWidgets.includes('clock') && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text mb-4">시계 위젯</h2>
                  <p className="text-text-secondary">
                    실시간으로 업데이트되는 디지털 및 아날로그 시계 위젯입니다.
                    초 표시, 날짜 표시, 타임존 설정 등을 커스터마이징할 수 있습니다.
                  </p>
                </div>
                {renderClockWidgets()}
              </section>
            )}

            {/* 달력 위젯 */}
            {selectedWidgets.includes('calendar') && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text mb-4">달력 위젯</h2>
                  <p className="text-text-secondary">
                    월별 달력을 표시하고 이벤트를 관리할 수 있는 위젯입니다.
                    날짜 선택, 이벤트 추가, 월간 네비게이션 기능을 제공합니다.
                  </p>
                </div>
                <div className="max-w-4xl mx-auto">
                  {renderCalendarWidget()}
                </div>
              </section>
            )}

            {/* 날씨 위젯 */}
            {selectedWidgets.includes('weather') && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text mb-4">날씨 위젯</h2>
                  <p className="text-text-secondary">
                    현재 날씨 정보와 상세 기상 데이터를 표시하는 위젯입니다.
                    온도, 습도, 바람, 자외선 지수 등 다양한 정보를 제공합니다.
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  {renderWeatherWidget()}
                </div>
              </section>
            )}

            {/* 차트 위젯 */}
            {selectedWidgets.includes('chart') && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text mb-4">차트 위젯</h2>
                  <p className="text-text-secondary">
                    Recharts 라이브러리를 사용한 다양한 유형의 데이터 시각화 차트입니다.
                    선 그래프, 막대 그래프, 원형 차트, 영역 차트를 지원합니다.
                  </p>
                </div>
                {renderChartWidgets()}
              </section>
            )}

            {/* 할 일 목록 위젯 */}
            {selectedWidgets.includes('todo') && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text mb-4">할 일 목록 위젯</h2>
                  <p className="text-text-secondary">
                    할 일을 추가, 완료, 삭제할 수 있는 관리 위젯입니다.
                    우선순위 설정, 필터링, 로컬 스토리지 저장 기능을 제공합니다.
                  </p>
                </div>
                <div className="max-w-2xl mx-auto">
                  {renderTodoWidget()}
                </div>
              </section>
            )}
          </div>
        ) : (
          /* 바탕화면 모드 - 드래그 앤 드롭 그리드 */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text mb-4">바탕화면 위젯</h2>
              <p className="text-text-secondary">
                모바일 바탕화면처럼 위젯을 자유롭게 배치하고 크기를 조정할 수 있습니다.
                드래그 앤 드롭으로 위치를 변경하고, 모서리를 드래그하여 크기를 조정하세요.
              </p>
            </div>
            <WidgetGrid />
          </div>
        )}

        {/* 사용법 가이드 */}
        <section className="mt-20">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-text mb-6">사용법 가이드</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-text mb-4">기본 사용법</h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-mono">1</span>
                    <span>위젯 컴포넌트를 import합니다</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-mono">2</span>
                    <span>필요한 props를 설정합니다</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-mono">3</span>
                    <span>컴포넌트를 렌더링합니다</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text mb-4">커스터마이징</h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-mono">•</span>
                    <span>테마 색상 및 스타일 조정</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-mono">•</span>
                    <span>데이터 소스 연결 (API, 데이터베이스)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-mono">•</span>
                    <span>이벤트 핸들러 및 콜백 함수 추가</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
