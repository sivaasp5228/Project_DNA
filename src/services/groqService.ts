import { Groq } from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const model = import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile';

let groq: Groq | null = null;
if (apiKey) {
  groq = new Groq({ 
    apiKey, 
    dangerouslyAllowBrowser: true // Essential for client-side sandbox execution
  });
}

export interface GroqEvaluationResponse {
  overallScore: number;
  scores: {
    problemClarity: number;
    innovation: number;
    technical: number;
    architecture: number;
    documentation: number;
    scalability: number;
    presentation: number;
    industryReadiness: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  detailedAnalysis: {
    problemClarity: string;
    innovation: string;
    technical: string;
    architecture: string;
    documentation: string;
    scalability: string;
    presentation: string;
    industryReadiness: string;
  };
}

export const groqService = {
  async evaluate(
    title: string,
    problemStatement: string,
    description: string,
    techStack: string,
    githubUrl?: string,
    deploymentUrl?: string,
    readmeText?: string,
    pptSummary?: string
  ): Promise<GroqEvaluationResponse> {
    if (!groq) {
      throw new Error('Groq client is not initialized. Please verify VITE_GROQ_API_KEY is defined in your environment.');
    }

    const systemPrompt = `You are a Senior Software Architect, Hackathon Judge, Engineering Mentor, and Technical Reviewer.
Evaluate the submitted software project materials objectively and critique its quality across 8 key dimensions.

Dimensions to assess:
1. Problem Clarity: Is the target problem clearly mapped and solved?
2. Innovation: Novelty, design differentiation, and modern patterns.
3. Technical Quality: Quality of tech stack choices, robustness of implementation.
4. Architecture: Cohesion, module separation, file structuring design.
5. Documentation: Clarity of setup, README details, APIs reference completeness.
6. Scalability: How does the system handle concurrency, caching, and heavy traffic loads?
7. Presentation: Review the project narrative and pitch quality.
8. Industry Readiness: Security checks, test coverage posture, and live deployment stability.

CRITICAL EVALUATION CONSTRAINTS:
- Evaluate the project SOLELY on the uploaded/provided materials. Do not assume or hallucinate features, structures, or details that are not explicitly documented.
- If no README file content is provided, you MUST score the Documentation dimension as 0 (on a scale of 0-10).
- If no presentation file content/summary is provided, you MUST score the Presentation dimension as 0 (on a scale of 0-10).
- If no GitHub repository URL is provided, you cannot review the codebase. The Technical Quality and Architecture scores MUST be penalised significantly (maximum score of 3 out of 10) because code implementation and structure details cannot be inspected.
- The overallScore should be the average of the 8 dimension scores multiplied by 10 (rounded to the nearest integer).

You MUST respond with a single, valid JSON object containing exactly the schema structure outlined below.
DO NOT wrap the JSON in markdown code blocks (\`\`\`json), do not write any introductory or concluding comments, and do not explain the formatting. Return ONLY raw JSON.

JSON Schema format required:
{
  "overallScore": 88,
  "scores": {
    "problemClarity": 9,
    "innovation": 8,
    "technical": 9,
    "architecture": 9,
    "documentation": 8,
    "scalability": 8,
    "presentation": 9,
    "industryReadiness": 8
  },
  "strengths": [
    "strength description 1",
    "strength description 2"
  ],
  "weaknesses": [
    "weakness description 1",
    "weakness description 2"
  ],
  "recommendations": [
    "concrete recommendation 1",
    "concrete recommendation 2"
  ],
  "detailedAnalysis": {
    "problemClarity": "detailed description of problem clarity assessment",
    "innovation": "detailed description of innovation assessment",
    "technical": "detailed description of technical quality assessment",
    "architecture": "detailed description of architecture assessment",
    "documentation": "detailed description of documentation assessment",
    "scalability": "detailed description of scalability assessment",
    "presentation": "detailed description of presentation assessment",
    "industryReadiness": "detailed description of industry readiness assessment"
  }
}`;

    const userPrompt = `Project Title: ${title}
Problem Statement: ${problemStatement}
Project Description: ${description}
Technical Stack: ${techStack}
GitHub Repository: ${githubUrl || 'Not provided'}
Deployment URL: ${deploymentUrl || 'Not provided'}

${readmeText ? `--- README CONTENT ---\n${readmeText}\n` : ''}
${pptSummary ? `--- PRESENTATION SUMMARY ---\n${pptSummary}\n` : ''}

Evaluate this project DNA and respond in the raw JSON format requested.`;

    const response = await groq.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2 // Lower temp for structural output consistency
    });

    const rawContent = response.choices[0]?.message?.content;
    if (!rawContent) {
      throw new Error('No content returned from Groq API.');
    }

    // Parse output defensively (clearing markdown code fence wrappers if present)
    let cleanJson = rawContent.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.slice(7);
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.slice(3);
    }
    if (cleanJson.endsWith('```')) {
      cleanJson = cleanJson.slice(0, -3);
    }
    cleanJson = cleanJson.trim();

    try {
      const parsed: GroqEvaluationResponse = JSON.parse(cleanJson);
      
      // Perform validation check on structural integrity
      if (
        typeof parsed.overallScore !== 'number' ||
        !parsed.scores ||
        !Array.isArray(parsed.strengths) ||
        !Array.isArray(parsed.weaknesses) ||
        !Array.isArray(parsed.recommendations) ||
        !parsed.detailedAnalysis
      ) {
        throw new Error('Groq returned a JSON response that does not match the expected validation schema.');
      }
      
      return parsed;
    } catch (parseError) {
      console.error('Failed to parse Groq response. Raw response was:', rawContent);
      throw new Error('Invalid JSON structure returned by the AI evaluator.');
    }
  }
};
