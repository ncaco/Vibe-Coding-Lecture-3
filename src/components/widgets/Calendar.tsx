'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description?: string;
  color?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  compact?: boolean;
  showEvents?: boolean;
  showNavigation?: boolean;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  onDateSelect,
  onEventClick,
  compact = false,
  showEvents = true,
  showNavigation = true,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 달력 시작을 월요일로 맞추기 위한 빈 칸들
  const startDayOfWeek = monthStart.getDay();
  const emptyStartDays = Array.from({ length: startDayOfWeek === 0 ? 6 : startDayOfWeek - 1 }, (_, i) => i);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventColor = (event: CalendarEvent) => {
    return event.color || 'bg-accent';
  };

  return (
    <div className={cn("p-4", className)}>
      <div className="flex items-center justify-center mb-4">
        <CalendarIcon className="w-5 h-5 text-accent mr-2" />
        <h3 className="text-lg font-semibold text-text">달력</h3>
      </div>
      
      {showNavigation && (
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold text-text">
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['월', '화', '수', '목', '금', '토', '일'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
            {compact ? day[0] : day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={cn(
                "p-2 text-sm rounded-lg transition-colors relative",
                compact ? "min-h-[2rem]" : "min-h-[2.5rem]",
                isCurrentMonth ? "text-text" : "text-text-secondary",
                isCurrentDay ? "bg-accent text-white" : "hover:bg-background-secondary"
              )}
            >
              <span className="block">{format(day, 'd')}</span>
              
              {showEvents && dayEvents.length > 0 && (
                <div className="flex justify-center mt-1">
                  {dayEvents.slice(0, compact ? 1 : 2).map(event => (
                    <div
                      key={event.id}
                      className={cn(
                        "w-2 h-2 rounded-full",
                        event.color || "bg-blue-500"
                      )}
                      title={event.title}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {showEvents && events.length > 0 && !compact && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-text mb-2">이벤트</h4>
          <div className="space-y-2">
            {events.slice(0, 3).map(event => (
              <div
                key={event.id}
                className="p-2 bg-background-secondary rounded-lg cursor-pointer hover:bg-background-hover transition-colors"
                onClick={() => onEventClick?.(event)}
              >
                <div className="text-sm font-medium text-text">{event.title}</div>
                {event.description && (
                  <div className="text-xs text-text-secondary">{event.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
