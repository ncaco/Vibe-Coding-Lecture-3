// 애플리케이션 정보
export const APP_CONFIG = {
  name: 'Vibe',
  description: 'Plan and build products with modern design system',
  version: '1.0.0',
  author: 'Vibe Team',
  url: 'https://vibe-coding-lecture-3.vercel.app',
} as const;

// API 설정
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retries: 3,
} as const;

// 페이지네이션 설정
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
} as const;

// 파일 업로드 설정
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxFiles: 10,
} as const;

// 검색 설정
export const SEARCH = {
  minQueryLength: 2,
  maxResults: 50,
  debounceDelay: 300,
} as const;

// 테마 설정
export const THEME = {
  default: 'dark' as const,
  storageKey: 'vibe-theme',
} as const;

// 로컬 스토리지 키들
export const STORAGE_KEYS = {
  theme: 'vibe-theme',
  user: 'vibe-user',
  settings: 'vibe-settings',
  recentSearches: 'vibe-recent-searches',
} as const;

// 에러 메시지들
export const ERROR_MESSAGES = {
  network: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  unauthorized: '로그인이 필요합니다.',
  forbidden: '접근 권한이 없습니다.',
  notFound: '요청한 리소스를 찾을 수 없습니다.',
  serverError: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  validation: '입력값을 확인해주세요.',
  fileUpload: '파일 업로드에 실패했습니다.',
} as const;

// 성공 메시지들
export const SUCCESS_MESSAGES = {
  saved: '저장되었습니다.',
  deleted: '삭제되었습니다.',
  updated: '업데이트되었습니다.',
  created: '생성되었습니다.',
  uploaded: '업로드되었습니다.',
} as const;

// 날짜 포맷
export const DATE_FORMATS = {
  short: 'YYYY-MM-DD',
  long: 'YYYY년 MM월 DD일',
  time: 'HH:mm',
  datetime: 'YYYY-MM-DD HH:mm',
} as const;

// 브레이크포인트
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// 애니메이션 지속시간
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;
