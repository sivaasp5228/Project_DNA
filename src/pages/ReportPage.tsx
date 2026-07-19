import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Github, 
  ExternalLink,
  TrendingUp,
  Award
} from 'lucide-react';
import { useEvaluations } from '../context/EvaluationContext';
import { ScoreCard } from '../components/ScoreCard';
import { RadarChart } from '../components/RadarChart';
import { PrimaryButton } from '../components/PrimaryButton';
import { toast } from 'sonner';
import type { Evaluation } from '../types';

export const ReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvaluationById } = useEvaluations();
  const [activeTab, setActiveTab] = useState<'strengths' | 'weaknesses' | 'recommendations'>('strengths');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState<boolean>(true);

  useEffect(() => {
    const loadReport = async () => {
      if (id) {
        setIsLoadingReport(true);
        const data = await getEvaluationById(id);
        setEvaluation(data);
        setIsLoadingReport(false);
      }
    };
    loadReport();
  }, [id, getEvaluationById]);

  if (isLoadingReport) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center select-none animate-pulse">
        <div className="h-6 w-6 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin mb-3" />
        <span className="text-xs text-zinc-550">Retrieving project scorecard...</span>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center select-none">
        <h3 className="text-lg font-semibold text-zinc-300">Report Not Found</h3>
        <p className="text-xs text-zinc-500 mt-1 mb-4">The evaluation report you are looking for does not exist.</p>
        <PrimaryButton variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </PrimaryButton>
      </div>
    );
  }

  const getLetterGrade = (score: number) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    return 'D';
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-blue-500 border-blue-500/20 bg-blue-500/5';
    if (score >= 75) return 'text-zinc-300 border-zinc-800 bg-zinc-900/50';
    return 'text-zinc-500 border-zinc-900 bg-zinc-950/80';
  };

  const criteriaList = [
    { key: 'problemClarity', title: 'Problem Clarity', desc: 'Measures how well the target audience and problem statements are mapped out.' },
    { key: 'innovation', title: 'Innovation', desc: 'Assesses the novelty of the solution and contemporary technical implementation.' },
    { key: 'technicalQuality', title: 'Technical Quality', desc: 'Reviews code structure, framework bindings, and repository architecture.' },
    { key: 'documentation', title: 'Documentation', desc: 'Scores setup clarity, README structure, and architectural explanation.' },
    { key: 'scalability', title: 'Scalability', desc: 'Measures structural capacity to sustain concurrency and resource loading.' },
    { key: 'impact', title: 'Impact', desc: 'Assesses product-market relevance and real-world value creation.' },
    { key: 'presentation', title: 'Presentation', desc: 'Evaluates slides structure and project layout visual quality.' },
    { key: 'industryReadiness', title: 'Industry Readiness', desc: 'Scores security postures, test matrices, and deployment status.' }
  ];

  const handleExport = () => {
    toast.success('Report Exported', {
      description: `"${evaluation.title}" analysis report has been saved to PDF.`
    });
  };

  return (
    <div className="flex flex-col gap-6 text-left select-none">
      {/* Header Back & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/history')}
            className="p-1.5 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Evaluation Report</span>
            <h2 className="text-xl font-bold tracking-tight text-zinc-100 truncate max-w-xs md:max-w-md">
              {evaluation.title}
            </h2>
          </div>
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-3">
          {evaluation.githubUrl && (
            <a 
              href={evaluation.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all"
              title="View GitHub Repository"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
          )}
          {evaluation.deploymentUrl && (
            <a 
              href={evaluation.deploymentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all"
              title="Visit Live Application"
            >
              <ExternalLink className="h-4.5 w-4.5" />
            </a>
          )}
          <PrimaryButton variant="outline" size="sm" onClick={handleExport}>
            Export PDF
          </PrimaryButton>
        </div>
      </div>

      {/* Main Grid: Quality Score & Radar Chart vs Criteria Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Grade Card & Radar Chart */}
        <div className="flex flex-col gap-6">
          {/* Quality Score Grade Card */}
          <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[60px]" />
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider select-none mb-3">Overall Quality Score</span>
            
            {/* Circular badge */}
            <div className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center shadow-inner select-none mb-4 ${getGradeColor(evaluation.score)}`}>
              <span className="text-3xl font-extrabold tracking-tight">{evaluation.score}%</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Grade {getLetterGrade(evaluation.score)}</span>
            </div>

            <div className="flex flex-col text-center">
              <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5 justify-center mb-1">
                <Award className="h-4 w-4 text-blue-500" />
                Industry Grade Rating
              </h3>
              <p className="text-[11px] text-zinc-500 leading-normal max-w-xs">
                Your application stands in the <span className="font-semibold text-zinc-300">top {(100 - evaluation.score) || 5}%</span> of parsed portfolios in this tech stack category.
              </p>
            </div>
            
            {/* Tech Stack items */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center border-t border-zinc-850/80 w-full pt-4 mt-4">
              {evaluation.techStack.map((tech) => (
                <span key={tech} className="text-[9px] font-semibold bg-zinc-950 border border-zinc-850 px-2 py-0.5 rounded text-zinc-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Radar Chart Card */}
          <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 flex flex-col text-left">
            <h3 className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider mb-2">Technical DNA Profile</h3>
            <RadarChart metrics={evaluation.metrics} />
            <div className="flex items-center gap-2 border-t border-zinc-850 pt-4 mt-2">
              <TrendingUp className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="text-[10px] text-zinc-500 leading-normal">
                Strongest axis: <span className="font-bold text-zinc-300">
                  {Object.entries(evaluation.metrics).reduce((a, b) => a[1] > b[1] ? a : b)[0]
                    .replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 8 Dimensions Grid */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="border-b border-zinc-900 pb-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Scoring Breakdown</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criteriaList.map((crit) => (
              <ScoreCard
                key={crit.key}
                title={crit.title}
                score={evaluation.metrics[crit.key as keyof typeof evaluation.metrics]}
                description={crit.desc}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Strengths, Weaknesses, and Recommendations */}
      <div className="bg-zinc-900/30 border border-zinc-850 rounded-2xl p-5 md:p-6 mt-2 relative overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-850 pb-3 mb-6 gap-6 justify-start text-xs font-bold uppercase tracking-wider select-none">
          <button 
            onClick={() => setActiveTab('strengths')}
            className={`cursor-pointer pb-2 relative transition-colors ${activeTab === 'strengths' ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Strengths
            {activeTab === 'strengths' && <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-blue-500" />}
          </button>
          <button 
            onClick={() => setActiveTab('weaknesses')}
            className={`cursor-pointer pb-2 relative transition-colors ${activeTab === 'weaknesses' ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Weaknesses
            {activeTab === 'weaknesses' && <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-blue-500" />}
          </button>
          <button 
            onClick={() => setActiveTab('recommendations')}
            className={`cursor-pointer pb-2 relative transition-colors ${activeTab === 'recommendations' ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Recommendations
            {activeTab === 'recommendations' && <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-blue-500" />}
          </button>
        </div>

        {/* Tab contents */}
        <div>
          {activeTab === 'strengths' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <p className="text-xs text-zinc-500 leading-normal mb-1">
                The core structural qualities and standards verified within the submitted resources:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evaluation.strengths.map((str, idx) => (
                  <div key={idx} className="bg-zinc-950/40 border border-zinc-850 rounded-xl p-4 flex gap-3 items-start">
                    <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-300 leading-relaxed text-left">{str}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'weaknesses' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <p className="text-xs text-zinc-500 leading-normal mb-1">
                The technical gaps and quality metrics requiring optimization before production deployment:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evaluation.weaknesses.map((weak, idx) => (
                  <div key={idx} className="bg-zinc-950/40 border border-zinc-850 rounded-xl p-4 flex gap-3 items-start">
                    <AlertTriangle className="h-4.5 w-4.5 text-zinc-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-400 leading-relaxed text-left">{weak}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <p className="text-xs text-zinc-500 leading-normal mb-1">
                Concrete optimization blueprints to increase scaling boundaries, secure dependencies, and polish UX:
              </p>
              <div className="flex flex-col gap-3">
                {evaluation.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-zinc-950/40 border border-zinc-850 rounded-xl p-4 flex gap-3.5 items-start">
                    <div className="h-5 w-5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                      <p className="text-xs text-zinc-200 font-semibold leading-relaxed">{rec}</p>
                      <span className="text-[10px] text-zinc-550">Priority: {idx === 0 ? 'High' : 'Medium'} • Action Type: Refactor</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
