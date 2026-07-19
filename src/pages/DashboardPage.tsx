import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  History, 
  User, 
  BarChart3, 
  Trophy, 
  Activity, 
  Sparkles,
  ArrowRight,
  GitBranch
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEvaluations } from '../context/EvaluationContext';
import { StatCard } from '../components/StatCard';
import { EvaluationCard } from '../components/EvaluationCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { EmptyState } from '../components/EmptyState';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { evaluations } = useEvaluations();
  const navigate = useNavigate();

  const recentEvaluations = evaluations.slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex flex-col gap-6 text-left select-none">
      {/* Welcome Card Banner */}
      {user && (
        <div className="relative bg-zinc-900 border border-zinc-850 rounded-2xl p-6 md:p-8 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[150%] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-xl relative z-10 flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md text-[9px] font-bold uppercase tracking-wider w-fit">
              <Sparkles className="h-3 w-3" />
              <span>Developer Workspace Active</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
              {getGreeting()}, {user.name.split(' ')[0]}
            </h2>
            
            <p className="text-xs text-zinc-400 leading-relaxed mt-1">
              Ready to verify project quality? Add details or upload your assets to generate structural DNA indicators and roadmap recommendations.
            </p>
            
            <div className="mt-4 flex items-center gap-3">
              <PrimaryButton
                variant="primary"
                size="sm"
                onClick={() => navigate('/dashboard/new')}
                leftIcon={<Plus className="h-4 w-4" />}
              >
                New Evaluation
              </PrimaryButton>
              <PrimaryButton
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/history')}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                View History
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* KPI Stats Row */}
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Total Projects"
            value={user.stats.totalEvaluations}
            icon={Activity}
            subtext="Analyzed portfolios"
            trendColor="blue"
          />
          <StatCard
            title="Average Score"
            value={`${user.stats.averageScore}%`}
            icon={BarChart3}
            subtext="Portfolio quality rating"
            trendColor="zinc"
          />
          <StatCard
            title="Highest Score"
            value={`${user.stats.highestScore}%`}
            icon={Trophy}
            subtext="Top product review rating"
            trendColor="green"
          />
        </div>
      )}

      {/* Main Grid: Recent Evaluations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Recent Evaluations Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Recent Evaluations</h3>
            {evaluations.length > 3 && (
              <Link to="/dashboard/history" className="text-xs text-blue-500 hover:text-blue-400 transition-colors font-semibold">
                See all
              </Link>
            )}
          </div>

          {recentEvaluations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentEvaluations.map((item) => (
                <EvaluationCard key={item.id} evaluation={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={GitBranch}
              title="No evaluations found"
              description="Analyze your first codebase project to see quality scorecards."
              action={
                <PrimaryButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/new')}
                >
                  Start First Evaluation
                </PrimaryButton>
              }
            />
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="flex flex-col gap-4">
          <div className="border-b border-zinc-900 pb-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Quick Actions</h3>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-850 rounded-xl p-4 flex flex-col gap-2.5">
            <button
              onClick={() => navigate('/dashboard/new')}
              className="flex items-center gap-3 p-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-left transition-colors cursor-pointer group"
            >
              <div className="p-2 bg-blue-600/10 text-blue-500 border border-blue-500/15 rounded-md group-hover:scale-105 transition-transform">
                <Plus className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-200">Start Evaluation</span>
                <span className="text-[10px] text-zinc-500">Submit files and urls for AI scanning</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/history')}
              className="flex items-center gap-3 p-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-left transition-colors cursor-pointer group"
            >
              <div className="p-2 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-md group-hover:scale-105 transition-transform">
                <History className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-200">Browse History</span>
                <span className="text-[10px] text-zinc-500">Access previous score reports and details</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/profile')}
              className="flex items-center gap-3 p-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-left transition-colors cursor-pointer group"
            >
              <div className="p-2 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-md group-hover:scale-105 transition-transform">
                <User className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-200">Profile Settings</span>
                <span className="text-[10px] text-zinc-500">Edit account variables and view metrics</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
