import { supabase } from '../lib/supabase';
import { groqService } from './groqService';
import type { Evaluation, EvaluationInput, EvaluationMetrics } from '../types';

export const evaluationService = {
  async evaluateProject(input: EvaluationInput, userId: string): Promise<Evaluation> {
    const techStackList = input.techStack
      ? input.techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : ['React', 'TypeScript', 'Tailwind CSS'];

    // 1. Read README text content in-browser using File text resolver
    let readmeText = '';
    if (input.readmeFile) {
      try {
        readmeText = await input.readmeFile.text();
      } catch (err) {
        console.warn('Failed to parse text content of README file.', err);
      }
    }

    const pptMetadata = input.pptFile 
      ? `Uploaded presentation deck named "${input.pptFile.name}" (${(input.pptFile.size / 1024 / 1024).toFixed(2)} MB)`
      : '';

    // 2. Query Groq API
    const groqResponse = await groqService.evaluate(
      input.title,
      input.problemStatement,
      input.description,
      input.techStack,
      input.githubUrl,
      input.deploymentUrl,
      readmeText,
      pptMetadata
    );

    // Ensure the profile row exists in public.users to avoid foreign key violations
    const { data: profileExists, error: profileCheckError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (profileCheckError) throw profileCheckError;

    if (!profileExists) {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email || '';
      const name = session?.user?.user_metadata?.name || email.split('@')[0] || 'Developer';
      
      const { error: profileInsertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          name,
          email,
          avatar: session?.user?.user_metadata?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
          bio: 'ProjectDNA Developer Platform user.'
        });
      
      if (profileInsertError) {
        throw new Error(`Profile synchronization failed: ${profileInsertError.message}`);
      }
    }

    // 3. Write evaluation to public.evaluations table
    const { data: evalData, error: evalError } = await supabase
      .from('evaluations')
      .insert({
        user_id: userId,
        title: input.title,
        problem_statement: input.problemStatement,
        description: input.description,
        tech_stack: techStackList,
        github_url: input.githubUrl || null,
        deployment_url: input.deploymentUrl || null,
        readme_name: input.readmeFile?.name || null,
        ppt_name: input.pptFile?.name || null,
        score: groqResponse.overallScore
      })
      .select()
      .single();

    if (evalError) throw evalError;

    // 4. Map Groq scores (scale 1-10) to UI metrics (scale 1-100)
    // We map 'architecture' to 'impact' to reconcile the 8-dimensions of client with Groq prompts
    const metrics: EvaluationMetrics = {
      problemClarity: Math.min(100, groqResponse.scores.problemClarity * 10),
      innovation: Math.min(100, groqResponse.scores.innovation * 10),
      technicalQuality: Math.min(100, groqResponse.scores.technical * 10),
      documentation: Math.min(100, groqResponse.scores.documentation * 10),
      scalability: Math.min(100, groqResponse.scores.scalability * 10),
      impact: Math.min(100, groqResponse.scores.architecture * 10),
      presentation: Math.min(100, groqResponse.scores.presentation * 10),
      industryReadiness: Math.min(100, groqResponse.scores.industryReadiness * 10)
    };

    // 5. Write report to public.reports table
    const { error: reportError } = await supabase
      .from('reports')
      .insert({
        evaluation_id: evalData.id,
        metrics,
        strengths: groqResponse.strengths,
        weaknesses: groqResponse.weaknesses,
        recommendations: groqResponse.recommendations,
        detailed_analysis: groqResponse.detailedAnalysis
      });

    if (reportError) {
      // Roll back evaluation entry if report insert fails to maintain database consistency
      await supabase.from('evaluations').delete().eq('id', evalData.id);
      throw reportError;
    }

    return {
      id: evalData.id,
      title: evalData.title,
      problemStatement: evalData.problem_statement,
      description: evalData.description,
      techStack: evalData.tech_stack,
      githubUrl: evalData.github_url || undefined,
      deploymentUrl: evalData.deployment_url || undefined,
      readmeName: evalData.readme_name || undefined,
      pptName: evalData.ppt_name || undefined,
      score: evalData.score,
      metrics,
      strengths: groqResponse.strengths,
      weaknesses: groqResponse.weaknesses,
      recommendations: groqResponse.recommendations,
      createdAt: evalData.created_at,
      status: 'completed'
    };
  },

  async deleteEvaluation(id: string): Promise<void> {
    const { error } = await supabase
      .from('evaluations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
