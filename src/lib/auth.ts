import { createClient } from '@/utils/supabase/client'
import type { AuthUser, AuthSession } from '@/types'

// 회원가입
export const signUp = async (email: string, password: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  return { data, error }
}

// 로그인
export const signIn = async (email: string, password: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  // 더 구체적인 오류 메시지 제공
  if (error) {
    let enhancedError = { ...error };
    
    if (error.message.includes('Invalid login credentials')) {
      enhancedError.message = '이메일 또는 비밀번호가 올바르지 않습니다. 이메일을 확인했는지 확인해주세요.';
    } else if (error.message.includes('Email not confirmed')) {
      enhancedError.message = '이메일을 확인해주세요. 회원가입 후 이메일의 확인 링크를 클릭하여 계정을 활성화해주세요.';
    }
    
    return { data, error: enhancedError };
  }
  
  return { data, error }
}

// 로그아웃
export const signOut = async () => {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

// 현재 사용자 정보 가져오기
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user as AuthUser | null
}

// 현재 세션 정보 가져오기
export const getCurrentSession = async (): Promise<AuthSession | null> => {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session as AuthSession | null
}

// 비밀번호 재설정 이메일 보내기
export const resetPassword = async (email: string) => {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  return { error }
}

// 인증 상태 변화 리스너
export const onAuthStateChange = (callback: (event: string, session: AuthSession | null) => void) => {
  const supabase = createClient()
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.user.email && session.user.id && session.user.created_at && session.user.updated_at) {
      const authSession: AuthSession = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
        token_type: session.token_type,
        user: {
          id: session.user.id,
          email: session.user.email,
          email_confirmed_at: session.user.email_confirmed_at || undefined,
          created_at: session.user.created_at,
          updated_at: session.user.updated_at
        }
      }
      callback(event, authSession)
    } else {
      callback(event, null)
    }
  })
}
