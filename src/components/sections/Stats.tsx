'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Stat {
  label: string;
  value: string;
}

interface StatsProps {
  stats?: Stat[];
  className?: string;
}

const Stats: React.FC<StatsProps> = ({
  stats = [
    { label: 'Components', value: '20+' },
    { label: 'Design Tokens', value: '50+' },
    { label: 'Animations', value: '10+' },
    { label: 'Variants', value: '100+' }
  ],
  className = ""
}) => {
  return (
    <section className={cn("py-16 bg-background-secondary", className)}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-text mb-2">
                {stat.value}
              </div>
              <div className="text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
