import React from 'react';
import { Dna, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoadingAnimationProps {
  progress: number;
  stage: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  progress,
  stage
}) => {
  const steps = [
    { threshold: 15, label: 'Repository Architecture Analysis' },
    { threshold: 35, label: 'Problem Space Complexity Mapping' },
    { threshold: 55, label: 'Market Tech Stack Comparison' },
    { threshold: 75, label: 'Documentation Quality Scoring' },
    { threshold: 90, label: 'DNA Metric Aggregation' }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center">
      {/* Central Visual AI Loader */}
      <div className="relative flex items-center justify-center mb-8 select-none">
        {/* Rotating outer ring */}
        <div className="absolute w-36 h-36 border border-zinc-800 rounded-full" />
        <div className="absolute w-36 h-36 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin [animation-duration:1.5s]" />
        
        {/* Pulsing glow ring */}
        <div className="absolute w-28 h-28 bg-blue-500/5 rounded-full border border-blue-500/10 animate-pulse-ring" />
        
        {/* Central DNA Core */}
        <div className="relative p-5 bg-zinc-900 border border-zinc-800 text-blue-500 rounded-2xl shadow-xl">
          <Dna className="h-10 w-10 animate-pulse" />
        </div>
      </div>

      {/* Progress percentage & active stage */}
      <div className="mb-8 text-center w-full">
        <h2 className="text-2xl font-bold text-zinc-100 mb-1.5 tracking-tight">Analyzing Your Project</h2>
        <p className="text-xs text-blue-400 font-semibold tracking-wider uppercase mb-4 animate-pulse leading-none">
          {progress}% Complete
        </p>
        
        {/* Horizontal linear progress bar */}
        <div className="w-full h-1 bg-zinc-900 border border-zinc-850 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-350"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-xs text-zinc-400 font-medium mt-3 italic truncate">
          "{stage}"
        </p>
      </div>

      {/* Checklist of steps */}
      <div className="w-full bg-zinc-900/40 border border-zinc-850 rounded-xl p-5 flex flex-col gap-3 text-left">
        <h4 className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider select-none mb-1">Analysis Checklist</h4>
        
        {steps.map((step) => {
          const isDone = progress >= step.threshold;
          const isActive = progress < step.threshold && progress >= (step.threshold - 20);
          
          return (
            <div 
              key={step.threshold}
              className={cn(
                "flex items-center gap-3 transition-colors duration-300",
                isDone ? "text-zinc-300" : isActive ? "text-blue-400" : "text-zinc-600"
              )}
            >
              {isDone ? (
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              ) : isActive ? (
                <div className="h-4.5 w-4.5 rounded-full border border-blue-500 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-ping" />
                </div>
              ) : (
                <Circle className="h-4.5 w-4.5 text-zinc-800 shrink-0" />
              )}
              <span className="text-xs font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
