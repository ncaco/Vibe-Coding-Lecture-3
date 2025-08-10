'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  description, 
  error, 
  className, 
  ...props 
}) => {
  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className={cn(
            "w-4 h-4 text-accent bg-background-secondary border border-border rounded",
            "focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
            "hover:border-border-hover transition-colors duration-200",
            error && "border-error focus:ring-error"
          )}
          {...props}
        />
      </div>
      <div className="text-sm">
        {label && (
          <label 
            htmlFor={props.id} 
            className={cn(
              "font-medium text-text cursor-pointer",
              props.disabled && "text-text-secondary cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <p className={cn(
            "text-text-secondary mt-1",
            props.disabled && "text-text-secondary/70"
          )}>
            {description}
          </p>
        )}
        {error && (
          <p className="text-sm text-error mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
