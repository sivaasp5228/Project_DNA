import React from 'react';
import { cn } from '../lib/utils';

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  className?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  description,
  className
}) => {
  // Set stroke color based on rating
  const getStrokeColor = (val: number) => {
    if (val >= 90) return 'text-blue-500';
    if (val >= 75) return 'text-zinc-300';
    return 'text-zinc-500';
  };

  const getScoreGrade = (val: number) => {
    if (val >= 90) return { label: 'Excellent', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
    if (val >= 75) return { label: 'Proficient', color: 'text-zinc-300 bg-zinc-800 border-zinc-700' };
    return { label: 'Needs Focus', color: 'text-zinc-500 bg-zinc-950 border-zinc-900' };
  };

  const grade = getScoreGrade(score);

  return (
    <div className={cn("bg-zinc-900/40 border border-zinc-850 rounded-xl p-5 flex items-start gap-4 transition-all duration-200 hover:border-zinc-800 hover:bg-zinc-900/60", className)}>
      {/* Circular Progress Widget */}
      <div className="relative flex-shrink-0 select-none">
        <svg className="w-14 h-14" viewBox="0 0 36 36">
          <path
            className="text-zinc-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={cn("transition-all duration-500", getStrokeColor(score))}
            strokeDasharray={`${score}, 100`}
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text 
            x="18" 
            y="20.5" 
            className="fill-zinc-100 font-bold text-[9px]" 
            textAnchor="middle"
          >
            {score}
          </text>
        </svg>
      </div>

      {/* Texts */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h4 className="text-xs font-semibold text-zinc-200">{title}</h4>
          <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full border leading-none", grade.color)}>
            {grade.label}
          </span>
        </div>
        <p className="text-[11px] text-zinc-550 leading-normal">{description}</p>
      </div>
    </div>
  );
};
