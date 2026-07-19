import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvaluations } from '../context/EvaluationContext';
import { LoadingAnimation } from '../components/LoadingAnimation';

export const LoadingPage: React.FC = () => {
  const { evaluationProgress, evaluationStage, isEvaluating } = useEvaluations();
  const navigate = useNavigate();

  // If loading completes but the page was refreshed or loaded directly:
  useEffect(() => {
    if (!isEvaluating && evaluationProgress === 0) {
      navigate('/dashboard');
    }
  }, [isEvaluating, evaluationProgress, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center select-none">
      <div className="w-full py-12">
        <LoadingAnimation 
          progress={evaluationProgress} 
          stage={evaluationStage} 
        />
      </div>
    </div>
  );
};
