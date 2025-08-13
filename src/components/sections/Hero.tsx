'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  badge?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Plan and build your product with modern design system",
  subtitle = "Vibe Coding Lecture 3",
  description = "Meet the system for modern software development. Streamline your design process with purpose-built components and Linear-inspired aesthetics.",
  primaryAction = {
    label: "Explore Components",
    href: "/components"
  },
  secondaryAction = {
    label: "View Documentation",
    href: "/docs"
  },
  badge = "🚀 New Release",
  className = ""
}) => {
  return (
    <section className={cn("section-padding relative overflow-hidden", className)}>
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-background-secondary/5" />
      
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-background-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-0">
          {/* Badge */}
          <Badge variant="primary" className="mb-6 animate-fade-in-up">
            {badge}
          </Badge>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-6 leading-tight animate-fade-in-up animate-delay-100 px-2">
            {title.split(' ').map((word, index) => (
              <span key={index}>
                {word}
                {index < title.split(' ').length - 1 && ' '}
              </span>
            ))}
            <span className="heading-gradient"> modern design system</span>
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-base sm:text-lg md:text-xl text-text-secondary mb-4 animate-fade-in-up animate-delay-200 px-2">
              {subtitle}
            </h2>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-text-secondary mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-300 px-2">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
            <Link href={primaryAction.href}>
              <Button size="sm" className="hover-lift">
                {primaryAction.label}
              </Button>
            </Link>
            <Link href={secondaryAction.href}>
              <Button variant="secondary" size="sm" className="hover-lift">
                {secondaryAction.label}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 animate-fade-in-up animate-delay-500 px-2">
            {[
              { label: 'Components', value: '20+' },
              { label: 'Design Tokens', value: '50+' },
              { label: 'Animations', value: '10+' },
              { label: 'Variants', value: '100+' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
