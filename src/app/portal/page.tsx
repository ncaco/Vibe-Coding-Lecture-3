'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';

export default function PortalPage() {
  const features = [
    {
      title: 'Database',
      description: 'PostgreSQL 기반의 강력한 데이터베이스 시스템',
      icon: '🗄️',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      title: 'Authentication',
      description: '사용자 인증 및 권한 관리 시스템',
      icon: '🔐',
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      title: 'Real-time',
      description: '실시간 데이터 동기화 및 업데이트',
      icon: '⚡',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      title: 'Storage',
      description: '파일 저장 및 관리 시스템',
      icon: '📁',
      color: 'from-orange-500/20 to-orange-600/20'
    },
    {
      title: 'Edge Functions',
      description: '서버리스 함수 실행 환경',
      icon: '🚀',
      color: 'from-red-500/20 to-red-600/20'
    },
    {
      title: 'API',
      description: 'RESTful API 및 GraphQL 지원',
      icon: '🔌',
      color: 'from-indigo-500/20 to-indigo-600/20'
    }
  ];

  const stats = [
    { label: 'Projects', value: '1000+' },
    { label: 'Users', value: '50K+' },
    { label: 'API Calls', value: '1M+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  const testimonials = [
    {
      content: "Vibe 포탈은 정말 놀라운 개발 경험을 제공합니다. 설정이 간단하고 문서화가 잘 되어 있어 빠르게 프로젝트를 시작할 수 있었습니다.",
      author: "@dev_kim",
      platform: "Twitter"
    },
    {
      content: "PostgreSQL의 강력함과 개발자 친화적인 인터페이스를 모두 갖춘 최고의 백엔드 서비스입니다.",
      author: "@coder_lee",
      platform: "GitHub"
    },
    {
      content: "몇 시간 만에 아이디어를 실제 기능으로 구현할 수 있었습니다. 정말 놀랍습니다!",
      author: "@startup_park",
      platform: "Discord"
    }
  ];

  const templates = [
    {
      title: "Next.js Starter",
      description: "Next.js App Router와 Supabase를 사용한 인증 템플릿",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      badge: "Popular"
    },
    {
      title: "React Native App",
      description: "모바일 앱 개발을 위한 React Native 템플릿",
      tech: ["React Native", "Expo", "Supabase"],
      badge: "New"
    },
    {
      title: "Full-stack SaaS",
      description: "구독 기반 SaaS 애플리케이션 템플릿",
      tech: ["Next.js", "Stripe", "Supabase"],
      badge: "Featured"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-6">
              🚀 새로운 포탈 플랫폼
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-text mb-6 leading-tight">
              Build in a weekend,
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                Scale to millions
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary mb-8 leading-relaxed">
              Vibe는 PostgreSQL 기반의 개발 플랫폼입니다. 데이터베이스, 인증, 실시간 기능, 
              스토리지, Edge Functions를 포함한 완전한 백엔드 솔루션을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4">
                  프로젝트 시작하기
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  데모 요청하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-secondary/50 to-background-tertiary/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-text mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              모든 프로젝트에 완전한 백엔드
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              하나 또는 모든 기능을 사용하세요. 최고의 제품들이 하나의 플랫폼으로 통합되어 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:scale-105 transition-transform duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Support */}
      <section className="py-20 bg-background-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              모든 프레임워크와 함께 사용
            </h2>
            <p className="text-xl text-text-secondary">
              선호하는 프레임워크로 개발을 시작하세요
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Flutter'].map((framework) => (
              <div key={framework} className="text-center group">
                <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/10 transition-colors duration-300">
                  <span className="text-2xl font-bold text-text">{framework}</span>
                </div>
                <p className="text-text-secondary font-medium">{framework}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              커뮤니티의 목소리
            </h2>
            <p className="text-xl text-text-secondary">
              개발자들이 Vibe 포탈에 대해 어떻게 생각하는지 들어보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center p-8">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-accent font-medium">{testimonial.author}</span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-muted">{testimonial.platform}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              몇 초 만에 개발 시작
            </h2>
            <p className="text-xl text-text-secondary">
              우리와 커뮤니티가 만든 템플릿으로 다음 프로젝트를 시작하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-text">{template.title}</h3>
                  <Badge variant="primary">{template.badge}</Badge>
                </div>
                <p className="text-text-secondary mb-4">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  템플릿 보기
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/templates">
              <Button variant="outline" size="lg">
                모든 템플릿 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              대시보드를 떠나지 않고 앱 관리
            </h2>
            <p className="text-xl text-text-secondary">
              생산성을 유지하고 앱을 효율적으로 관리하세요
            </p>
          </div>
          
          <div className="bg-background-secondary rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">테이블 에디터</h3>
                <p className="text-text-secondary text-sm">
                  스프레드시트처럼 쉬운 데이터 관리
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">SQL 에디터</h3>
                <p className="text-text-secondary text-sm">
                  강력한 SQL 쿼리 실행 및 관리
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">RLS 정책</h3>
                <p className="text-text-secondary text-sm">
                  행 수준 보안 정책 설정
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-text mb-6">
              준비되었나요?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              수천 명의 개발자들과 함께 더 나은 제품을 만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4">
                  무료로 시작하기
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  영업팀 문의
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
