// UI 컴포넌트 타입들
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 버튼 타입들
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// 배지 타입들
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

// 입력 필드 타입들
export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

// 카드 타입들
export type CardPadding = 'sm' | 'md' | 'lg' | 'xl';

// 모달 타입들
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

// API 응답 타입들
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션 타입들
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 사용자 타입들
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// 테마 타입들
export type Theme = 'light' | 'dark' | 'system';

// 네비게이션 타입들
export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

// Supabase 관련 타입들
export interface Database {
  public: {
    Tables: {
      instruments: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
      // 여기에 추가 데이터베이스 테이블 타입들을 추가할 수 있습니다
      [key: string]: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
    Views: {
      [key: string]: {
        Row: any;
      };
    };
    Functions: {
      [key: string]: any;
    };
    Enums: {
      [key: string]: string;
    };
  };
}

// 인증 관련 타입들
export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  email_confirmed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: AuthUser;
}