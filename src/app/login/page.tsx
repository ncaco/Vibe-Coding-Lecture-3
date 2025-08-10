'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Form, FormField, FormLabel, FormError, Divider, SocialButton } from '@/components/ui';
import { signIn } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // URL 파라미터에서 메시지 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message === 'signup-success') {
      setSuccessMessage('회원가입이 완료되었습니다! 이메일을 확인하여 계정을 활성화한 후 로그인해주세요.');
    }
  }, []);

  // 이미 로그인된 사용자는 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ general: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        } else {
          setErrors({ general: error.message || '로그인에 실패했습니다. 다시 시도해주세요.' });
        }
        return;
      }

      if (data?.user) {
        console.log('Login successful:', data.user);
        // 로그인 성공 시 메인 페이지로 리다이렉트
        router.push('/');
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ general: '로그인에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
    // TODO: Implement social login
  };

  // 이미 로그인된 사용자는 로딩 화면 표시
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-text-secondary">로그인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-text">Vibe</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-text">
            계정에 로그인
          </h1>
          <p className="mt-2 text-text-secondary">
            계정이 없으신가요?{' '}
            <Link 
              href="/signup" 
              className="text-accent hover:text-accent-hover font-medium transition-colors"
            >
              회원가입하기
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <SocialButton 
            provider="google" 
            onClick={() => handleSocialLogin('google')}
          />
          <SocialButton 
            provider="github" 
            onClick={() => handleSocialLogin('github')}
          />
        </div>

        <Divider text="또는" />

        {/* Login Form */}
        <Form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-error/10 border border-error/20 rounded-xl p-4">
              <p className="text-sm text-error text-center">{errors.general}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-success/10 border border-success/20 rounded-xl p-4">
              <p className="text-sm text-success text-center">{successMessage}</p>
            </div>
          )}

          <FormField>
            <FormLabel htmlFor="email" required>
              이메일 주소
            </FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
            />
          </FormField>

          <FormField>
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="password" required>
                비밀번호
              </FormLabel>
              <Link 
                href="/forgot-password" 
                className="text-sm text-accent hover:text-accent-hover font-medium"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />
          </FormField>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
          
          {/* 이메일 확인 안내 */}
          <div className="text-center">
            <p className="text-sm text-text-muted">
              로그인이 안 되나요?{' '}
              <Link 
                href="/signup" 
                className="text-accent hover:text-accent-hover font-medium transition-colors"
              >
                회원가입
              </Link>
              {' '}또는{' '}
              <button
                type="button"
                onClick={() => {
                  if (formData.email) {
                    // 비밀번호 재설정 이메일 보내기
                    // TODO: 비밀번호 재설정 기능 구현
                    alert('비밀번호 재설정 기능은 준비 중입니다.');
                  } else {
                    setErrors({ email: '비밀번호 재설정을 위해 이메일을 입력해주세요.' });
                  }
                }}
                className="text-accent hover:text-accent-hover font-medium transition-colors"
              >
                비밀번호 재설정
              </button>
            </p>
            <p className="text-xs text-text-muted mt-2">
              회원가입 후 이메일 확인이 필요합니다.
            </p>
          </div>
        </Form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            계정이 없으신가요?{' '}
            <Link 
              href="/signup" 
              className="text-accent hover:text-accent-hover font-medium transition-colors"
            >
              무료로 회원가입하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
