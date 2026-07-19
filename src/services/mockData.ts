import type { Evaluation, EvaluationInput, EvaluationMetrics } from '../types';

export const INITIAL_EVALUATIONS: Evaluation[] = [
  {
    id: 'eval-1',
    title: 'EcoSphere Carbon Tracker',
    problemStatement: 'Tracking and reducing corporate carbon footprints is manually intensive, lacks auditable trails, and fails to offer direct actionable mitigation strategies.',
    description: 'EcoSphere is an enterprise SaaS platform that automates scopes 1, 2, and 3 carbon accounting. By ingesting utility bills, logistics APIs, and ERP data, it calculates real-time greenhouse gas metrics, recommends verified carbon offset portfolios, and drafts compliance-ready ESG reports.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Recharts'],
    githubUrl: 'https://github.com/example/ecosphere-tracker',
    deploymentUrl: 'https://ecosphere.example.com',
    readmeName: 'README.md',
    pptName: 'pitch_deck_v2.pdf',
    score: 88,
    metrics: {
      problemClarity: 92,
      innovation: 85,
      technicalQuality: 88,
      documentation: 90,
      scalability: 82,
      impact: 95,
      presentation: 86,
      industryReadiness: 86,
    },
    strengths: [
      'Comprehensive Scope 1-3 carbon tracking methodology compliant with GHG Protocol.',
      'Smooth data ingestion pipeline utilizing pre-built ERP integrations.',
      'Excellent data visualization dashboard using Recharts, highlighting offset progress.',
      'High impact potential addressing immediate corporate ESG regulatory needs.'
    ],
    weaknesses: [
      'Lack of real-time caching for heavy carbon calculation aggregations.',
      'Under-developed Scope 3 supplier questionnaire portals.',
      'Moderate test coverage (~65%) on carbon conversion math engines.'
    ],
    recommendations: [
      'Implement Redis caching layer for dashboard analytical endpoints.',
      'Introduce end-to-end automated testing for GHG calculation formulas using Vitest.',
      'Expand the vendor API suite to support international logistics suppliers.'
    ],
    createdAt: '2026-07-10T10:30:00.000Z',
    status: 'completed'
  },
  {
    id: 'eval-2',
    title: 'FinFlow AI Predictor',
    problemStatement: 'Personal finance apps only track past spending history and fail to actively predict cash flow constraints or suggest specific behavioral modifications.',
    description: 'FinFlow is an AI-powered personal financial planner that connects securely to user bank accounts, aggregates transactions, and runs local machine learning models to forecast cash balances 30 days out. It warns users before overdrafts occur and suggests customized micro-savings goals.',
    techStack: ['Vite', 'React', 'Python', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'Tailwind v4'],
    githubUrl: 'https://github.com/example/finflow-ai',
    deploymentUrl: 'https://finflow.example.com',
    readmeName: 'README.md',
    score: 93,
    metrics: {
      problemClarity: 95,
      innovation: 96,
      technicalQuality: 92,
      documentation: 88,
      scalability: 90,
      impact: 94,
      presentation: 95,
      industryReadiness: 94,
    },
    strengths: [
      'Highly innovative predictive engine using localized TensorFlow time-series models.',
      'Premium dark mode UI with interactive cash flow forecast charts.',
      'Well-designed and validated API interface using FastAPI and Pydantic.',
      'High relevance and product-market fit targeting young professionals.'
    ],
    weaknesses: [
      'Requires heavy training loads on client-side or server instances.',
      'Missing deep multi-currency support for international banking.',
      'No multi-factor authentication (MFA) set up on the auth paths yet.'
    ],
    recommendations: [
      'Integrate Auth0 or Clerk for production-grade security, including MFA.',
      'Run TensorFlow models inside Web Workers or move prediction tasks to backend queues.',
      'Implement multi-currency conversion APIs (e.g., Fixer.io).'
    ],
    createdAt: '2026-07-15T14:15:00.000Z',
    status: 'completed'
  },
  {
    id: 'eval-3',
    title: 'DocuMind PDF Semantic Search',
    problemStatement: 'Standard PDF text keyword search fails to understand conceptual intent, meaning users spend hours browsing long manuals for specific answers.',
    description: 'DocuMind is a developer tool that indexes technical PDFs, splits text into semantic chunks, and generates vector embeddings. It allows teams to search across their entire documentation libraries using conversational questions, returning precise sections and page citations.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Pinecone', 'OpenAI API'],
    githubUrl: 'https://github.com/example/documind-semantic',
    readmeName: 'README.md',
    pptName: 'architecture_overview.pdf',
    score: 79,
    metrics: {
      problemClarity: 85,
      innovation: 80,
      technicalQuality: 78,
      documentation: 82,
      scalability: 72,
      impact: 78,
      presentation: 80,
      industryReadiness: 77,
    },
    strengths: [
      'Clear definition of problem space and solid implementation of OpenAI embeddings.',
      'Well-written README detailing local setup and environment variables.',
      'Functional drag-and-drop workspace layout for PDF uploads.'
    ],
    weaknesses: [
      'High cost and API overhead under dense indexing requests.',
      'Basic vector database querying without metadata filtering.',
      'Absence of rate limiting on public search endpoints.'
    ],
    recommendations: [
      'Transition to hybrid search (combining BM25 keyword matching with vector search).',
      'Implement indexing batch limits and rate-limiting middleware.',
      'Incorporate semantic caching to save OpenAI credit costs for repeated queries.'
    ],
    createdAt: '2026-07-18T08:45:00.000Z',
    status: 'completed'
  }
];

export function generateMockEvaluation(input: EvaluationInput): Evaluation {
  const techStackList = input.techStack
    ? input.techStack.split(',').map(s => s.trim()).filter(Boolean)
    : ['React', 'TypeScript', 'Tailwind CSS'];

  // Seed metrics based on form completion completeness and minor randomization
  const baseScore = 65 + Math.floor(Math.random() * 20); // 65 to 85 base
  const readmeBonus = input.readmeFile ? 6 : 0;
  const pptBonus = input.pptFile ? 4 : 0;
  const githubBonus = input.githubUrl ? 3 : 0;
  const deployBonus = input.deploymentUrl ? 2 : 0;

  const totalBonus = readmeBonus + pptBonus + githubBonus + deployBonus;
  
  const clamp = (val: number) => Math.min(100, Math.max(30, val));

  const metrics: EvaluationMetrics = {
    problemClarity: clamp(baseScore + totalBonus + Math.floor(Math.random() * 8) - 2),
    innovation: clamp(baseScore + totalBonus - 5 + Math.floor(Math.random() * 12)),
    technicalQuality: clamp(baseScore + totalBonus + (input.githubUrl ? 5 : 0) + Math.floor(Math.random() * 6)),
    documentation: clamp(baseScore + readmeBonus * 2.5 + Math.floor(Math.random() * 8)),
    scalability: clamp(baseScore + Math.floor(Math.random() * 10) - 4),
    impact: clamp(baseScore + totalBonus - 2 + Math.floor(Math.random() * 10)),
    presentation: clamp(baseScore + pptBonus * 3 + Math.floor(Math.random() * 8)),
    industryReadiness: clamp(baseScore + totalBonus - 3 + Math.floor(Math.random() * 8))
  };

  const scoresArray = Object.values(metrics);
  const averageScore = Math.round(scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length);

  // Core strengths based on tech stack inputs
  const strengths: string[] = [
    `Strong core architecture utilizing ${techStackList[0] || 'modern tech'}.`,
    `Excellent problem description showing deep understanding of market pain points.`,
  ];
  if (techStackList.length > 2) {
    strengths.push(`Cohesive tech stack alignment utilizing ${techStackList.slice(0, 3).join(', ')}.`);
  }
  if (input.githubUrl) {
    strengths.push('Clean open-source posture with public code repository access.');
  }
  if (input.readmeFile) {
    strengths.push('Detailed initial documentation structure provided via README.');
  }

  // Weaknesses
  const weaknesses: string[] = [
    'Missing comprehensive automated test coverage (unit/integration suites).',
    'Performance optimization metrics under heavy client loads are undefined.'
  ];
  if (!input.deploymentUrl) {
    weaknesses.push('No live deployment demonstration available to verify production stability.');
  }
  if (techStackList.includes('React') || techStackList.includes('Vite') || techStackList.includes('Next.js')) {
    weaknesses.push('Absence of bundler size analysis or code-splitting structures.');
  }

  // Recommendations
  const recommendations: string[] = [
    'Add automated tests (e.g. Playwright or Jest) to guarantee core workflow paths.',
    'Build a continuous integration (CI) pipeline on GitHub Actions to automate linting and compilation checks.'
  ];
  if (techStackList.includes('React')) {
    recommendations.push('Leverage React 19 compiler and code-splitting (Suspense/React.lazy) to optimize first-contentful paint.');
  }
  if (!input.deploymentUrl) {
    recommendations.push('Deploy client assets to Vercel, Netlify or Cloudflare Pages for instant performance validation.');
  }
  if (input.description && input.description.length < 150) {
    recommendations.push('Flesh out the system architecture description, detailing database schemas and API boundaries.');
  }

  return {
    id: `eval-${Date.now()}`,
    title: input.title,
    problemStatement: input.problemStatement,
    description: input.description,
    techStack: techStackList,
    githubUrl: input.githubUrl,
    deploymentUrl: input.deploymentUrl,
    readmeName: input.readmeFile ? input.readmeFile.name : undefined,
    pptName: input.pptFile ? input.pptFile.name : undefined,
    score: averageScore,
    metrics,
    strengths,
    weaknesses,
    recommendations,
    createdAt: new Date().toISOString(),
    status: 'completed'
  };
}
