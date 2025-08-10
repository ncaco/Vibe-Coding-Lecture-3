'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

interface FormErrorProps {
  children: React.ReactNode;
  className?: string;
}

interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps> = ({ children, className, ...props }) => {
  return (
    <form className={cn("space-y-6", className)} {...props}>
      {children}
    </form>
  );
};

const FormField: React.FC<FormFieldProps> = ({ children, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
};

const FormLabel: React.FC<FormLabelProps> = ({ children, required, className, ...props }) => {
  return (
    <label 
      className={cn(
        "block text-sm font-medium text-text",
        className
      )} 
      {...props}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
};

const FormError: React.FC<FormErrorProps> = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-error", className)}>
      {children}
    </p>
  );
};

const FormDescription: React.FC<FormDescriptionProps> = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-text-secondary", className)}>
      {children}
    </p>
  );
};

export { Form, FormField, FormLabel, FormError, FormDescription };
