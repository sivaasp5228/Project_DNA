import React from 'react';
import { cn } from '../lib/utils';

interface ProgressCardProps {
  title: string;
  value: number;
  label?: string;
  className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  label,
  className
}) => {
  const getProgressColor = (val: number) => {
    if (val >= 90) return 'bg-blue-500';
    if (val >= 75) return 'bg-zinc-400';
    return 'bg-zinc-650';
  };

  return (
    <div className={cn("flex flex-col gap-1.5 text-left w-full", className)}>
      <div className="flex items-center justify-between text-xs font-semibold select-none">
        <span className="text-zinc-300">{title}</span>
        <span className="text-zinc-400">{label || `${value}%`}</span>
      </div>
      
      {/* Track */}
      <div className="w-full h-1.5 bg-zinc-850 rounded-full overflow-hidden">
        {/* Fill */}
        <div 
          className={cn("h-full rounded-full transition-all duration-500", getProgressColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
