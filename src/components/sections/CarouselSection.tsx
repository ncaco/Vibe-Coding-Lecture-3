'use client';

import React from 'react';
import { Carousel } from '@/components/ui';
import { cn } from '@/lib/utils';

interface CarouselSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title = "Interactive Carousel",
  description = "Experience our smooth carousel component with auto-play, navigation, and keyboard controls.",
  className = ""
}) => {
  const carouselItems = [
    <div key="1" className="h-96 bg-gradient-to-br from-accent/20 to-background-secondary rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-2xl font-bold text-text mb-2">Design System</h3>
        <p className="text-text-secondary">Modern and consistent design components</p>
      </div>
    </div>,
    <div key="2" className="h-96 bg-gradient-to-br from-green-500/20 to-background-secondary rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">⚡</div>
        <h3 className="text-2xl font-bold text-text mb-2">Performance</h3>
        <p className="text-text-secondary">Optimized for speed and efficiency</p>
      </div>
    </div>,
    <div key="3" className="h-96 bg-gradient-to-br from-purple-500/20 to-background-secondary rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold text-text mb-2">Innovation</h3>
        <p className="text-text-secondary">Cutting-edge development practices</p>
      </div>
    </div>
  ];

  return (
    <section className={cn("section-padding bg-background-secondary", className)}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">
            {title}
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <Carousel
          items={carouselItems}
          autoPlay={true}
          interval={4000}
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12"
        />
      </div>
    </section>
  );
};

export default CarouselSection;
