'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Badge from './Badge';

export interface ImageCardProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function ImageCard({
  image,
  title,
  description,
  badge,
  badgeVariant = 'default',
  onClick,
  href,
  className,
}: ImageCardProps) {
  const CardWrapper = onClick ? 'button' : href ? 'a' : 'div';

  return (
    <CardWrapper
      className={cn(
        "group relative bg-background-secondary border border-border rounded-2xl overflow-hidden",
        "transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10",
        (onClick || href) && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        className
      )}
      onClick={onClick}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge overlay */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Click indicator */}
      {(onClick || href) && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-full w-8 h-8 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      )}
    </CardWrapper>
  );
}
