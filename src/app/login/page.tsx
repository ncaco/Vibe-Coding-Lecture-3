'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Form, FormField, FormLabel, FormError, Divider, SocialButton } from '@/components/ui';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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
    
    try {
      // TODO: Implement actual login logic
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard or show success message
      console.log('Login successful');
      
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
