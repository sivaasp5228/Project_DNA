export interface User {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinedAt: string;
  stats: {
    totalEvaluations: number;
    averageScore: number;
    highestScore: number;
  };
}

export interface EvaluationMetrics {
  problemClarity: number; // 0-100
  innovation: number; // 0-100
  technicalQuality: number; // 0-100
  documentation: number; // 0-100
  scalability: number; // 0-100
  impact: number; // 0-100
  presentation: number; // 0-100
  industryReadiness: number; // 0-100
}

export interface Evaluation {
  id: string;
  title: string;
  problemStatement: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  deploymentUrl?: string;
  readmeName?: string;
  pptName?: string;
  score: number; // Overall calculated score (average of metrics)
  metrics: EvaluationMetrics;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  createdAt: string;
  status: 'completed' | 'analyzing' | 'failed';
}

export interface EvaluationInput {
  title: string;
  problemStatement: string;
  description: string;
  techStack: string; // Comma separated in input
  githubUrl?: string;
  deploymentUrl?: string;
  readmeFile?: File | null;
  pptFile?: File | null;
}
