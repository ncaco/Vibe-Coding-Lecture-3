'use client';

import React, { useState, useEffect } from 'react';
import { Search, Globe, Star, Clock, ExternalLink, History, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: number;
  title: string;
  url: string;
  description: string;
  type: 'web' | 'news' | 'image' | 'video';
  timestamp: Date;
  bookmarked: boolean;
}

interface WebSearchProps {
  title?: string;
  searchResults?: SearchResult[];
  compact?: boolean;
  showHistory?: boolean;
  showBookmarks?: boolean;
  maxResults?: number;
  className?: string;
}

const WebSearch: React.FC<WebSearchProps> = ({
  title = '웹 검색',
  searchResults = [],
  compact = false,
  showHistory = true,
  showBookmarks = true,
  maxResults = 10,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(['React 개발', 'Next.js 튜토리얼', 'TypeScript 가이드']);
  const [bookmarks, setBookmarks] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'history' | 'bookmarks'>('search');

  const mockSearchResults: SearchResult[] = [
    {
      id: 1,
      title: 'React 공식 문서 - React',
      url: 'https://react.dev',
      description: 'React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 컴포넌트 기반 아키텍처를 통해 재사용 가능한 UI를 만들 수 있습니다.',
      type: 'web',
      timestamp: new Date(),
      bookmarked: false
    },
    {
      id: 2,
      title: 'Next.js - React 프레임워크',
      url: 'https://nextjs.org',
      description: 'Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트 생성 등을 지원합니다.',
      type: 'web',
      timestamp: new Date(),
      bookmarked: true
    },
    {
      id: 3,
      title: 'TypeScript 핸드북',
      url: 'https://typescriptlang.org',
      description: 'TypeScript는 JavaScript의 정적 타입 검사를 추가한 프로그래밍 언어입니다. 대규모 애플리케이션 개발에 적합합니다.',
      type: 'web',
      timestamp: new Date(),
      bookmarked: false
    },
    {
      id: 4,
      title: 'Tailwind CSS - 유틸리티 우선 CSS 프레임워크',
      url: 'https://tailwindcss.com',
      description: 'Tailwind CSS는 유틸리티 클래스를 사용하여 빠르게 UI를 구축할 수 있는 CSS 프레임워크입니다.',
      type: 'web',
      timestamp: new Date(),
      bookmarked: false
    }
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // 검색어를 최근 검색어에 추가
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 9)]);
    }
    
    // 모의 검색 지연
    setTimeout(() => {
      const filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const toggleBookmark = (result: SearchResult) => {
    if (result.bookmarked) {
      setBookmarks(prev => prev.filter(b => b.id !== result.id));
      setResults(prev => prev.map(r => r.id === result.id ? { ...r, bookmarked: false } : r));
    } else {
      setBookmarks(prev => [...prev, { ...result, bookmarked: true }]);
      setResults(prev => prev.map(r => r.id === result.id ? { ...r, bookmarked: true } : r));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'news':
        return <Globe className="w-4 h-4 text-green-500" />;
      case 'image':
        return <Globe className="w-4 h-4 text-purple-500" />;
      case 'video':
        return <Globe className="w-4 h-4 text-red-500" />;
      default:
        return <Globe className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'web': return '웹';
      case 'news': return '뉴스';
      case 'image': return '이미지';
      case 'video': return '비디오';
      default: return type;
    }
  };

  if (compact) {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex items-center justify-center mb-3">
          <Search className="w-4 h-4 text-accent mr-2" />
          <h3 className="text-sm font-semibold text-text">{title}</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어 입력..."
              className="w-full px-3 py-2 pr-10 text-sm bg-background-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-accent transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
        
        {results.length > 0 && (
          <div className="space-y-2">
            {results.slice(0, 2).map((result) => (
              <div key={result.id} className="text-xs">
                <div className="font-medium text-text truncate">{result.title}</div>
                <div className="text-text-secondary truncate">{result.url}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("p-4", className)}>
      <div className="flex items-center justify-center mb-4">
        <Search className="w-5 h-5 text-accent mr-2" />
        <h3 className="text-lg font-semibold text-text">{title}</h3>
      </div>
      
      {/* 검색 폼 */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="웹에서 검색해보세요..."
            className="w-full px-4 py-3 pr-12 text-base bg-background-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
      
      {/* 탭 네비게이션 */}
      <div className="flex border-b border-background-secondary mb-4">
        {[
          { key: 'search', label: '검색', icon: Search },
          { key: 'history', label: '최근 검색', icon: History },
          { key: 'bookmarks', label: '즐겨찾기', icon: Bookmark }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={cn("flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === key 
                ? "text-accent border-b-2 border-accent" 
                : "text-text-secondary hover:text-text"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      
      {/* 검색 탭 */}
      {activeTab === 'search' && (
        <div>
          {isSearching ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
              <p className="text-text-secondary">검색 중...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.slice(0, maxResults).map((result) => (
                <div key={result.id} className="p-3 bg-background-secondary rounded-lg hover:bg-background transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(result.type)}
                      <span className="text-xs text-text-secondary">{getTypeName(result.type)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleBookmark(result)}
                        className={cn("p-1 rounded transition-colors",
                          result.bookmarked 
                            ? "text-yellow-500 hover:bg-yellow-50" 
                            : "text-text-secondary hover:bg-background"
                        )}
                        title={result.bookmarked ? "즐겨찾기 제거" : "즐겨찾기 추가"}
                      >
                        <Star className={cn("w-4 h-4", result.bookmarked && "fill-current")} />
                      </button>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-text-secondary hover:text-accent transition-colors"
                        title="새 탭에서 열기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-text mb-1 hover:text-accent cursor-pointer">
                    {result.title}
                  </h4>
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {result.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <span className="truncate">{result.url}</span>
                    <span>•</span>
                    <span>{result.timestamp.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : query && (
            <div className="text-center py-8 text-text-secondary">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      )}
      
      {/* 최근 검색 탭 */}
      {activeTab === 'history' && showHistory && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-text-secondary mb-3">최근 검색어</div>
          {recentSearches.length > 0 ? (
            recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-background-secondary rounded-lg cursor-pointer transition-colors"
                onClick={() => {
                  setQuery(search);
                  setActiveTab('search');
                  handleSearch(search);
                }}
              >
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm">{search}</span>
                </div>
                <Search className="w-4 h-4 text-text-secondary" />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-text-secondary">
              <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>최근 검색어가 없습니다</p>
            </div>
          )}
        </div>
      )}
      
      {/* 즐겨찾기 탭 */}
      {activeTab === 'bookmarks' && showBookmarks && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-text-secondary mb-3">즐겨찾기된 검색 결과</div>
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="p-2 bg-background-secondary rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(bookmark.type)}
                    <span className="text-xs text-text-secondary">{getTypeName(bookmark.type)}</span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(bookmark)}
                    className="p-1 text-yellow-500 hover:bg-yellow-50 rounded transition-colors"
                    title="즐겨찾기 제거"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </div>
                
                <h4 className="font-medium text-sm text-text mb-1">{bookmark.title}</h4>
                <p className="text-xs text-text-secondary truncate">{bookmark.url}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-text-secondary">
              <Bookmark className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>즐겨찾기된 항목이 없습니다</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebSearch;
