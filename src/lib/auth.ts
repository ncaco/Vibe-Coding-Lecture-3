import { createClient } from '@/utils/supabase/client'
import type { AuthUser, AuthSession } from '@/types'

// 회원가입
export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
  const supabase = createClient()
  
  // 1. Supabase Auth로 계정 생성
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${lastName}${firstName}`.trim()
      }
    }
  })
  
  if (error) {
    return { data, error }
  }
  
  // 2. 사용자 프로필 테이블에 이름 정보 저장 (선택사항)
  if (data.user) {
    try {
      const { error: profileError } = await supabase
        .from('TB_MBR')
        .insert({
          ID: data.user.id,
          FIRST_NAME: firstName,
          LAST_NAME: lastName,
          FULL_NAME: `${lastName}${firstName}`.trim(),
          EMAIL: email
        })
      
      if (profileError) {
        console.warn('프로필 저장 실패:', profileError)
        // 프로필 저장 실패해도 회원가입은 성공으로 처리
      }
    } catch (profileError) {
      console.warn('프로필 저장 중 오류:', profileError)
    }
  }
  
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
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.last_name || undefined,
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
