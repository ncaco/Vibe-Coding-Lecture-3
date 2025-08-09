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
  return supabase.auth.onAuthStateChange(callback)
}
