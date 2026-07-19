import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { evaluationService } from '../services/evaluationService';
import { reportService } from '../services/reportService';
import { useAuth } from './AuthContext';
import type { Evaluation, EvaluationInput } from '../types';

interface EvaluationContextType {
  evaluations: Evaluation[];
  activeEvaluation: Evaluation | null;
  isEvaluating: boolean;
  evaluationProgress: number;
  evaluationStage: string;
  evaluateProject: (input: EvaluationInput) => Promise<Evaluation>;
  getEvaluationById: (id: string) => Promise<Evaluation | null>;
  deleteEvaluation: (id: string) => Promise<void>;
  setActiveEvaluation: (evaluation: Evaluation | null) => void;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const EvaluationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [activeEvaluation, setActiveEvaluation] = useState<Evaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationProgress, setEvaluationProgress] = useState<number>(0);
  const [evaluationStage, setEvaluationStage] = useState<string>('');
  
  const { refreshProfile } = useAuth();

  const fetchHistory = async (userId: string) => {
    try {
      const history = await reportService.getEvaluationsHistory(userId);
      setEvaluations(history);
    } catch (err) {
      console.error('Failed to load evaluations history:', err);
    }
  };

  useEffect(() => {
    // 1. Initial check of history
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchHistory(session.user.id);
      }
    });

    // 2. Refresh lists on auth session transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchHistory(session.user.id);
      } else {
        setEvaluations([]);
        setActiveEvaluation(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getEvaluationById = async (id: string): Promise<Evaluation | null> => {
    const existing = evaluations.find(e => e.id === id);
    if (existing) return existing;
    
    try {
      return await reportService.getEvaluationById(id);
    } catch (err) {
      console.error('Failed to load evaluation details by ID:', err);
      return null;
    }
  };

  const deleteEvaluation = async (id: string) => {
    try {
      await evaluationService.deleteEvaluation(id);
      setEvaluations((prev) => prev.filter((e) => e.id !== id));
      if (activeEvaluation?.id === id) {
        setActiveEvaluation(null);
      }
      await refreshProfile();
    } catch (err) {
      console.error('Failed to remove evaluation entry:', err);
      throw err;
    }
  };

  const evaluateProject = async (input: EvaluationInput): Promise<Evaluation> => {
    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.user) {
      throw new Error('You must be authenticated to perform project evaluations.');
    }

    setIsEvaluating(true);
    setEvaluationProgress(0);
    setEvaluationStage('Reading project parameters...');

    const stages = [
      { progress: 15, text: 'Parsing repository codebase structure...' },
      { progress: 35, text: 'Analyzing problem statement complexity...' },
      { progress: 55, text: 'Cross-referencing tech stack with market trends...' },
      { progress: 75, text: 'Checking README and presentation uploads...' },
      { progress: 90, text: 'Compiling project DNA scorecards...' }
    ];

    try {
      // 1. Kick off the evaluation query to Groq & database in background
      const evalPromise = evaluationService.evaluateProject(input, session.user.id);

      // 2. Step through visual loading percentages sequentially to match checklist
      for (const stage of stages) {
        const stepTime = 600 + Math.random() * 400;
        await new Promise((resolve) => setTimeout(resolve, stepTime));
        setEvaluationProgress(stage.progress);
        setEvaluationStage(stage.text);
      }

      // 3. Await final result completion
      const finalResult = await evalPromise;

      // 4. Conclude final stage parameters
      setEvaluationProgress(100);
      setEvaluationStage('Generating report...');
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 5. Append result, update user statistics and state
      setEvaluations((prev) => [finalResult, ...prev]);
      setActiveEvaluation(finalResult);
      await refreshProfile();

      return finalResult;
    } catch (err) {
      console.error('AI evaluation execution encountered an error:', err);
      throw err;
    } finally {
      setIsEvaluating(false);
      setEvaluationProgress(0);
      setEvaluationStage('');
    }
  };

  return (
    <EvaluationContext.Provider
      value={{
        evaluations,
        activeEvaluation,
        isEvaluating,
        evaluationProgress,
        evaluationStage,
        evaluateProject,
        getEvaluationById,
        deleteEvaluation,
        setActiveEvaluation
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluations = () => {
  const context = useContext(EvaluationContext);
  if (context === undefined) {
    throw new Error('useEvaluations must be used within an EvaluationProvider');
  }
  return context;
};
export type { Evaluation };
