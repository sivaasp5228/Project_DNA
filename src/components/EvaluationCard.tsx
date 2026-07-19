import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trash2, ArrowRight, Dna } from 'lucide-react';
import type { Evaluation } from '../types';
import { cn } from '../lib/utils';
import { useEvaluations } from '../context/EvaluationContext';
import { toast } from 'sonner';

interface EvaluationCardProps {
  evaluation: Evaluation;
  className?: string;
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({
  evaluation,
  className
}) => {
  const navigate = useNavigate();
  const { deleteEvaluation } = useEvaluations();

  const handleCardClick = () => {
    navigate(`/dashboard/report/${evaluation.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteEvaluation(evaluation.id);
      toast.success('Evaluation deleted', {
        description: `"${evaluation.title}" has been removed.`
      });
    } catch (err) {
      toast.error('Deletion failed', {
        description: 'An error occurred while removing the evaluation.'
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (score >= 75) return 'text-zinc-200 bg-zinc-800 border-zinc-700';
    return 'text-zinc-500 bg-zinc-950 border-zinc-900';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      onClick={handleCardClick}
      className={cn(
        "bg-zinc-900/40 border border-zinc-850 hover:border-zinc-800 rounded-xl p-5 flex flex-col justify-between gap-4 cursor-pointer hover:bg-zinc-900/60 transition-all duration-200 group text-left",
        className
      )}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg shrink-0">
              <Dna className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors truncate">
              {evaluation.title}
            </h4>
          </div>
          
          <div className={cn("text-[10px] font-bold px-2 py-0.5 border rounded-full shrink-0 select-none", getScoreColor(evaluation.score))}>
            {evaluation.score}%
          </div>
        </div>

        {/* Short Statement */}
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
          {evaluation.problemStatement || evaluation.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex items-center gap-1.5 flex-wrap overflow-hidden mb-1">
          {evaluation.techStack.slice(0, 4).map((tech) => (
            <span 
              key={tech} 
              className="text-[9px] font-semibold bg-zinc-950 border border-zinc-850 text-zinc-400 px-1.5 py-0.5 rounded-md select-none"
            >
              {tech}
            </span>
          ))}
          {evaluation.techStack.length > 4 && (
            <span className="text-[9px] font-bold text-zinc-500 px-1 py-0.5">
              +{evaluation.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-zinc-900/60 pt-3 flex items-center justify-between text-[11px] text-zinc-550 select-none">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-zinc-500" />
          <span>{formatDate(evaluation.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 rounded-md transition-colors"
            title="Delete Evaluation"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          
          <span className="inline-flex items-center gap-1 font-semibold text-blue-500 hover:text-blue-400 transition-colors">
            View Report
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
