'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit3, Trash2, Save, X, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

interface QuickNotesProps {
  className?: string;
  title?: string;
  compact?: boolean;
  showCategories?: boolean;
  showSearch?: boolean;
  maxNotes?: number;
}

const categories = ['업무', '개인', '아이디어', '할일', '기타'];

export default function QuickNotes({ 
  className, 
  title = "빠른 메모", 
  compact = false,
  showCategories = true,
  showSearch = true,
  maxNotes = 10
}: QuickNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newNote, setNewNote] = useState({ title: '', content: '', category: '업무' });

  // 로컬 스토리지에서 메모 불러오기
  useEffect(() => {
    const savedNotes = localStorage.getItem('quickNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      })));
    }
  }, []);

  // 메모 저장
  const saveNotes = (newNotes: Note[]) => {
    localStorage.setItem('quickNotes', JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  // 새 메모 추가
  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false
    };

    const updatedNotes = [note, ...notes];
    saveNotes(updatedNotes);
    setNewNote({ title: '', content: '', category: '업무' });
    setIsAdding(false);
  };

  // 메모 수정
  const updateNote = () => {
    if (!editingNote) return;
    
    const updatedNotes = notes.map(note => 
      note.id === editingNote.id 
        ? { ...editingNote, updatedAt: new Date() }
        : note
    );
    
    saveNotes(updatedNotes);
    setEditingNote(null);
  };

  // 메모 삭제
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  // 메모 고정/해제
  const togglePin = (id: string) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    saveNotes(updatedNotes);
  };

  // 필터링된 메모
  const filteredNotes = notes
    .filter(note => 
      (selectedCategory === 'all' || note.category === selectedCategory) &&
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, maxNotes);

  const displayNotes = compact ? filteredNotes.slice(0, 3) : filteredNotes;

  return (
    <div className={cn("h-full flex flex-col bg-background border border-border rounded-lg", className)}>
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-text">{title}</h3>
          <span className="text-xs text-text-secondary bg-background-secondary px-2 py-1 rounded">
            {notes.length}
          </span>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
          title="새 메모 추가"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 검색 및 필터 */}
      {showSearch && (
        <div className="p-4 border-b border-border space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="메모 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-background-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          
          {showCategories && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  "px-3 py-1 text-xs rounded-full transition-colors",
                  selectedCategory === 'all'
                    ? "bg-accent text-white"
                    : "bg-background-tertiary text-text-secondary hover:bg-accent/10"
                )}
              >
                전체
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full transition-colors",
                    selectedCategory === category
                      ? "bg-accent text-white"
                      : "bg-background-tertiary text-text-secondary hover:bg-accent/10"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 새 메모 추가 폼 */}
      {isAdding && (
        <div className="p-4 border-b border-border bg-background-secondary">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="제목"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <textarea
              placeholder="메모 내용..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
            <div className="flex items-center justify-between">
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                className="px-3 py-1 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1 text-sm text-text-secondary hover:text-text transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={addNote}
                  className="px-3 py-1 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 메모 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {displayNotes.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>메모가 없습니다</p>
            <p className="text-sm">새 메모를 추가해보세요</p>
          </div>
        ) : (
          displayNotes.map(note => (
            <div
              key={note.id}
              className={cn(
                "p-3 border border-border rounded-lg transition-all hover:shadow-sm",
                note.isPinned && "border-accent/50 bg-accent/5",
                editingNote?.id === note.id && "ring-2 ring-accent"
              )}
            >
              {editingNote?.id === note.id ? (
                // 수정 모드
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    className="w-full px-2 py-1 text-sm bg-background border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                    rows={3}
                    className="w-full px-2 py-1 text-sm bg-background border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <select
                      value={editingNote.category}
                      onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value })}
                      className="px-2 py-1 text-xs bg-background border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingNote(null)}
                        className="px-2 py-1 text-xs text-text-secondary hover:text-text transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={updateNote}
                        className="px-2 py-1 text-xs bg-accent text-white rounded hover:bg-accent/90 transition-colors"
                      >
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // 보기 모드
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {note.isPinned && (
                          <span className="text-accent text-xs">📌</span>
                        )}
                        <h4 className="font-medium text-text text-sm line-clamp-1">
                          {note.title}
                        </h4>
                      </div>
                      <p className="text-text-secondary text-xs line-clamp-2">
                        {note.content}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => togglePin(note.id)}
                        className={cn(
                          "p-1 rounded transition-colors",
                          note.isPinned 
                            ? "text-accent hover:bg-accent/10" 
                            : "text-text-secondary hover:bg-background-tertiary"
                        )}
                        title={note.isPinned ? "고정 해제" : "고정"}
                      >
                        📌
                      </button>
                      <button
                        onClick={() => setEditingNote(note)}
                        className="p-1 text-text-secondary hover:bg-background-tertiary rounded transition-colors"
                        title="수정"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span className="bg-background-secondary px-2 py-1 rounded">
                      {note.category}
                    </span>
                    <span>
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
