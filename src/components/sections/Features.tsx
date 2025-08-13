'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  title?: string;
  description?: string;
  features?: Feature[];
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({
  title = "Made for modern product teams",
  description = "Vibe is shaped by the practices and principles that distinguish world-class product teams from the rest: relentless focus, fast execution, and a commitment to quality.",
  features = [
    {
      title: 'Modern Design System',
      description: 'Built with Linear-inspired design principles for consistency and beauty.',
      icon: '🎨'
    },
    {
      title: 'Reusable Components',
      description: 'Comprehensive component library with TypeScript support.',
      icon: '🧩'
    },
    {
      title: 'Responsive Layout',
      description: 'Mobile-first design that works on all devices.',
      icon: '📱'
    },
    {
      title: 'Performance Optimized',
      description: 'Fast loading times with Next.js 14 and optimized assets.',
      icon: '⚡'
    }
  ],
  className = ""
}) => {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">
            {title}
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 sm:px-8 lg:px-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-text mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
