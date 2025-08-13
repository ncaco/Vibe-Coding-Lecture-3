'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

const CTA: React.FC<CTAProps> = ({
  title = "Ready to get started?",
  description = "Join thousands of developers building better products with our design system.",
  primaryAction = {
    label: "Start Building",
    href: "/components"
  },
  secondaryAction = {
    label: "Contact Sales",
    href: "/contact"
  },
  className = ""
}) => {
  return (
    <section className={cn("section-padding bg-background-secondary", className)}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-text mb-6">
            {title}
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryAction.href}>
              <Button size="sm">
                {primaryAction.label}
              </Button>
            </Link>
            <Link href={secondaryAction.href}>
              <Button variant="outline" size="sm">
                {secondaryAction.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
