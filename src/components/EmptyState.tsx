import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center border border-zinc-850 rounded-xl bg-zinc-950/20 p-10 text-center",
        className
      )}
    >
      <div className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-zinc-200 mb-1">{title}</h3>
      <p className="text-xs text-zinc-500 max-w-xs mb-5 leading-relaxed">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};
