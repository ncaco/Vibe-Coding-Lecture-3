'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Form, FormField, FormLabel, FormError, FormDescription, Divider, SocialButton, Checkbox } from '@/components/ui';

export default function SignupPage() {
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
    
    try {
      // TODO: Implement actual signup logic
      console.log('Signup attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login or show success message
      console.log('Signup successful');
      
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
              <FormLabel htmlFor="firstName" required>
                이름
              </FormLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="홍"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                required
              />
            </FormField>

            <FormField>
              <FormLabel htmlFor="lastName" required>
                성
              </FormLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="길동"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
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
