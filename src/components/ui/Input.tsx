'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    size = 'md', 
    icon, 
    iconPosition = 'left',
    error,
    label,
    disabled,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-4 text-base',
    };

    const iconSizeClasses = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
    };

    const baseClasses = cn(
      "w-full border border-border rounded-lg",
      "bg-background text-text placeholder:text-text-secondary",
      "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
      "transition-colors duration-200",
      sizeClasses[size],
      disabled && "opacity-50 cursor-not-allowed",
      error && "border-red-500 focus:ring-red-500",
      icon && iconPosition === 'left' && 'pl-10',
      icon && iconPosition === 'right' && 'pr-10',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div
              className={cn(
                "absolute top-0 flex items-center justify-center w-10 text-text-secondary pointer-events-none",
                iconSizeClasses[size],
                iconPosition === 'left' ? 'left-0' : 'right-0'
              )}
            >
              {icon}
            </div>
          )}
          <input
            type={type}
            className={baseClasses}
            ref={ref}
            disabled={disabled}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
