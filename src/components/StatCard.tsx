import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  trendColor?: 'green' | 'blue' | 'zinc';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtext,
  trendColor = 'zinc',
  className
}) => {
  const colorClasses = {
    green: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    zinc: 'text-zinc-400 bg-zinc-900 border-zinc-800'
  };

  return (
    <div className={cn("bg-zinc-900/50 border border-zinc-850 hover:border-zinc-800 rounded-xl p-5 flex items-center justify-between gap-4 transition-all duration-200", className)}>
      <div className="flex flex-col text-left">
        <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider select-none mb-1">{title}</span>
        <span className="text-xl font-bold text-zinc-100 tracking-tight">{value}</span>
        {subtext && (
          <span className="text-[10px] text-zinc-500 font-medium mt-1 select-none leading-none">
            {subtext}
          </span>
        )}
      </div>

      <div className={cn("p-3 rounded-lg border", colorClasses[trendColor])}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
};
