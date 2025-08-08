'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  href?: string;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  description,
  badge,
  badgeVariant = 'primary',
  href,
  className = "",
  imageClassName = "",
  contentClassName = "",
  onClick
}) => {
  const CardContent = (
    <div className={cn(
      "group relative bg-background-secondary border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-lg hover:scale-[1.02]",
      onClick || href ? "cursor-pointer" : "",
      className
    )}>
      {/* Image Container */}
      <div className={cn("relative overflow-hidden", imageClassName)}>
        <div className="aspect-video relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
              badgeVariant === 'primary' && "bg-accent text-white",
              badgeVariant === 'secondary' && "bg-background-tertiary text-text-secondary",
              badgeVariant === 'success' && "bg-green-500/20 text-green-400 border border-green-500/30",
              badgeVariant === 'warning' && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
              badgeVariant === 'error' && "bg-red-500/20 text-red-400 border border-red-500/30",
              badgeVariant === 'default' && "bg-background-secondary text-text border border-border"
            )}>
              {badge}
            </span>
          </div>
        )}

        {/* Hover Action */}
        {(onClick || href) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-accent text-white p-3 rounded-full shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("p-6", contentClassName)}>
        <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {CardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        {CardContent}
      </button>
    );
  }

  return CardContent;
};

export default ImageCard;
