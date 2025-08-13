'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Form, FormField, FormLabel, FormError, FormDescription, Divider, SocialButton, Checkbox } from '@/components/ui';
import { signUp, signIn } from '@/lib/auth';
import { useAuth } from '@/context/AuthProvider';

export default function SignupPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 이미 로그인된 사용자는 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) {
      newErrors.firstName = '이름을 입력해주세요.';
    }

    if (!formData.lastName) {
      newErrors.lastName = '성을 입력해주세요.';
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '이용약관에 동의해주세요.';
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
      // Supabase 회원가입 실행 - 이름 정보 포함
      const { data, error } = await signUp(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName
      );
      
      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: '이미 등록된 이메일입니다.' });
        } else if (error.message.includes('password')) {
          setErrors({ password: '비밀번호가 너무 약합니다.' });
        } else {
          setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
        }
        return;
      }
      
      // 회원가입 성공 후 이메일 확인 안내
      if (data?.user) {
        console.log('Signup successful:', data);
        setIsSuccess(true);
        
        // 이메일 확인 후 수동 로그인 필요
        router.push('/login?message=signup-success');
      }
      
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Social signup with ${provider}`);
    // TODO: Implement social signup
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

  // 회원가입 성공 화면
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-text">회원가입 완료!</h1>
          <p className="text-text-secondary">
            계정이 성공적으로 생성되었습니다. 이메일을 확인하여 계정을 활성화해주세요.
          </p>
          
          <p className="text-sm text-text-muted mt-2">
            이메일 확인 후 로그인 페이지에서 로그인할 수 있습니다.
          </p>
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
            계정 만들기
          </h1>
          <p className="mt-2 text-text-secondary">
            이미 계정이 있으신가요?{' '}
            <Link 
              href="/login" 
              className="text-accent hover:text-accent-hover font-medium transition-colors"
            >
              로그인하기
            </Link>
          </p>
        </div>

        {/* Social Signup */}
        <div className="space-y-3">
          <SocialButton 
            provider="google" 
            onClick={() => handleSocialSignup('google')}
          />
          <SocialButton 
            provider="github" 
            onClick={() => handleSocialSignup('github')}
          />
        </div>

        <Divider text="또는" />

        {/* Signup Form */}
        <Form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-error/10 border border-error/20 rounded-xl p-4">
              <p className="text-sm text-error text-center">{errors.general}</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <FormField>
              <FormLabel htmlFor="lastName" required>
                성
              </FormLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="홍"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                required
              />
            </FormField>

            <FormField>
              <FormLabel htmlFor="firstName" required>
                이름
              </FormLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="길동"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                required
              />
            </FormField>
          </div>

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
            <FormLabel htmlFor="password" required>
              비밀번호
            </FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />
            <FormDescription>
              최소 8자 이상, 대문자, 소문자, 숫자를 포함해야 합니다.
            </FormDescription>
          </FormField>

          <FormField>
            <FormLabel htmlFor="confirmPassword" required>
              비밀번호 확인
            </FormLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
            />
          </FormField>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <Checkbox
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              label="이용약관 및 개인정보처리방침에 동의합니다."
              description="계정을 만들면 Vibe의 이용약관 및 개인정보처리방침에 동의하게 됩니다."
              error={errors.agreeToTerms}
            />

            <Checkbox
              id="agreeToMarketing"
              name="agreeToMarketing"
              checked={formData.agreeToMarketing}
              onChange={handleInputChange}
              label="마케팅 이메일을 받고 싶습니다. (선택사항)"
              description="새로운 기능, 업데이트 및 특별 혜택에 대한 정보를 받을 수 있습니다."
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? '계정 만들는 중...' : '계정 만들기'}
          </Button>
          
          {/* 이메일 확인 프로세스 안내 */}
          <div className="bg-info/10 border border-info/20 rounded-xl p-4">
            <h4 className="text-sm font-medium text-info mb-2">회원가입 후 진행 과정</h4>
            <ol className="text-xs text-info space-y-1 list-decimal list-inside">
              <li>입력한 이메일로 확인 링크가 전송됩니다</li>
              <li>이메일의 확인 링크를 클릭하여 계정을 활성화합니다</li>
              <li>계정 활성화 후 로그인 페이지에서 로그인할 수 있습니다</li>
            </ol>
          </div>
        </Form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            이미 계정이 있으신가요?{' '}
            <Link 
              href="/login" 
              className="text-accent hover:text-accent-hover font-medium transition-colors"
            >
              로그인하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
