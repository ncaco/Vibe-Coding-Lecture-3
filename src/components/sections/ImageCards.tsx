'use client';

import React from 'react';
import { ImageCard } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Project {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  badge: string;
  badgeVariant: 'success' | 'primary' | 'warning';
  href: string;
}

interface ImageCardsProps {
  title?: string;
  description?: string;
  projects?: Project[];
  className?: string;
}

const ImageCards: React.FC<ImageCardsProps> = ({
  title = "Featured Projects",
  description = "Explore our latest projects and see how our design system comes to life.",
  projects = [
    {
      image: {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        alt: "Dashboard Design"
      },
      title: "Modern Dashboard",
      description: "A sleek and intuitive dashboard design with real-time analytics and customizable widgets.",
      badge: "New",
      badgeVariant: "success",
      href: "/projects/dashboard"
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        alt: "Mobile App"
      },
      title: "Mobile App Design",
      description: "Responsive mobile application with smooth animations and native-like experience.",
      badge: "Popular",
      badgeVariant: "primary",
      href: "/projects/mobile-app"
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        alt: "Web Application"
      },
      title: "Web Application",
      description: "Full-stack web application with modern architecture and scalable design.",
      badge: "Featured",
      badgeVariant: "warning",
      href: "/projects/web-app"
    }
  ],
  className = ""
}) => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-8 lg:px-12">
          {projects.map((project, index) => (
            <ImageCard
              key={index}
              image={project.image}
              title={project.title}
              description={project.description}
              badge={project.badge}
              badgeVariant={project.badgeVariant}
              href={project.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCards;
