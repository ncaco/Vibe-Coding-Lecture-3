'use client';

import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Trash2, Plus, ListTodo } from 'lucide-react';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TodoProps {
  title?: string;
  maxItems?: number;
  compact?: boolean;
  showProgress?: boolean;
  showFilters?: boolean;
  className?: string;
}

const Todo: React.FC<TodoProps> = ({
  title = '할 일 목록',
  maxItems = 10,
  compact = false,
  showProgress = true,
  showFilters = true,
  className = ''
}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 로컬 스토리지에서 할 일 목록 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem('widget-todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })));
      } catch (error) {
        console.error('할 일 목록을 불러올 수 없습니다:', error);
      }
    }
  }, []);

  // 로컬 스토리지에 할 일 목록 저장
  useEffect(() => {
    localStorage.setItem('widget-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim() || todos.length >= maxItems) return;

    const todo: TodoItem = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date(),
      priority: 'medium'
    };

    setTodos(prev => [todo, ...prev]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updatePriority = (id: string, priority: TodoItem['priority']) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-text-secondary';
    }
  };

  const getPriorityLabel = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'high':
        return '높음';
      case 'medium':
        return '보통';
      case 'low':
        return '낮음';
      default:
        return '보통';
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ListTodo className="w-5 h-5 text-accent mr-2" />
          <h3 className="text-lg font-semibold text-text">{title}</h3>
        </div>
        
        {showProgress && (
          <div className="text-sm text-text-secondary">
            {completedCount}/{totalCount} 완료
          </div>
        )}
      </div>

      {/* 새 할 일 추가 */}
      <div className="flex space-x-2 mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새 할 일을 입력하세요..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1"
        />
        <Button 
          onClick={addTodo}
          disabled={!newTodo.trim() || todos.length >= maxItems}
          size="sm"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* 필터 버튼 */}
      {showFilters && (
        <div className="flex space-x-2 mb-4">
          {(['all', 'active', 'completed'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType === 'all' && '전체'}
              {filterType === 'active' && '진행중'}
              {filterType === 'completed' && '완료'}
            </Button>
          ))}
        </div>
      )}

      {/* 할 일 목록 */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredTodos.length === 0 ? (
          <div className="text-center text-text-secondary py-8">
            {filter === 'all' ? '할 일이 없습니다.' : 
             filter === 'active' ? '진행중인 할 일이 없습니다.' : 
             '완료된 할 일이 없습니다.'}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200",
                "hover:bg-background-secondary",
                todo.completed && "opacity-60 bg-background-secondary"
              )}
            >
              {/* 완료 체크박스 */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0"
              >
                {todo.completed ? (
                  <CheckSquare className="w-5 h-5 text-accent" />
                ) : (
                  <Square className="w-5 h-5 text-text-secondary hover:text-accent transition-colors" />
                )}
              </button>

              {/* 할 일 텍스트 */}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-sm",
                  todo.completed && "line-through text-text-secondary"
                )}>
                  {todo.text}
                </div>
                <div className="text-xs text-text-muted mt-1">
                  {todo.createdAt.toLocaleDateString('ko-KR')}
                </div>
              </div>

              {/* 우선순위 */}
              <select
                value={todo.priority}
                onChange={(e) => updatePriority(todo.id, e.target.value as TodoItem['priority'])}
                className={cn(
                  "text-xs px-2 py-1 rounded border bg-background-secondary",
                  getPriorityColor(todo.priority)
                )}
              >
                <option value="low">낮음</option>
                <option value="medium">보통</option>
                <option value="high">높음</option>
              </select>

              {/* 삭제 버튼 */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="flex-shrink-0 p-1 text-text-muted hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 통계 */}
      {showProgress && todos.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-medium text-text">{totalCount}</div>
              <div className="text-text-secondary">전체</div>
            </div>
            <div>
              <div className="font-medium text-text">{completedCount}</div>
              <div className="text-text-secondary">완료</div>
            </div>
            <div>
              <div className="font-medium text-text">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </div>
              <div className="text-text-secondary">진행률</div>
            </div>
          </div>
        </div>
      )}

      {/* 최대 개수 경고 */}
      {todos.length >= maxItems && (
        <div className="mt-3 text-xs text-yellow-600 bg-yellow-50 p-2 rounded text-center">
          최대 {maxItems}개의 할 일만 저장할 수 있습니다.
        </div>
      )}
    </Card>
  );
};

export default Todo;
