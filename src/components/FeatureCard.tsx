import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-850 hover:border-zinc-800 rounded-xl p-6 transition-all duration-300 group hover:bg-zinc-900/80">
      <div className="p-2.5 bg-blue-600/10 border border-blue-500/15 text-blue-500 rounded-lg w-fit mb-4 group-hover:scale-105 transition-transform">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-200 mb-2">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
    </div>
  );
};
