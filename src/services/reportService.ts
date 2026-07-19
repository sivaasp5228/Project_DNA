import { supabase } from '../lib/supabase';
import type { Evaluation } from '../types';

export const reportService = {
  async getEvaluationsHistory(userId: string): Promise<Evaluation[]> {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*, reports(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map((evalItem: any) => {
      const report = Array.isArray(evalItem.reports)
        ? (evalItem.reports[0] || {})
        : (evalItem.reports || {});
      return {
        id: evalItem.id,
        title: evalItem.title,
        problemStatement: evalItem.problem_statement,
        description: evalItem.description,
        techStack: evalItem.tech_stack,
        githubUrl: evalItem.github_url || undefined,
        deploymentUrl: evalItem.deployment_url || undefined,
        readmeName: evalItem.readme_name || undefined,
        pptName: evalItem.ppt_name || undefined,
        score: evalItem.score,
        metrics: report.metrics || {
          problemClarity: 0,
          innovation: 0,
          technicalQuality: 0,
          documentation: 0,
          scalability: 0,
          impact: 0,
          presentation: 0,
          industryReadiness: 0
        },
        strengths: report.strengths || [],
        weaknesses: report.weaknesses || [],
        recommendations: report.recommendations || [],
        createdAt: evalItem.created_at,
        status: 'completed'
      };
    });
  },

  async getEvaluationById(id: string): Promise<Evaluation | null> {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*, reports(*)')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const report = Array.isArray(data.reports)
      ? (data.reports[0] || {})
      : (data.reports || {});
    return {
      id: data.id,
      title: data.title,
      problemStatement: data.problem_statement,
      description: data.description,
      techStack: data.tech_stack,
      githubUrl: data.github_url || undefined,
      deploymentUrl: data.deployment_url || undefined,
      readmeName: data.readme_name || undefined,
      pptName: data.ppt_name || undefined,
      score: data.score,
      metrics: report.metrics || {
        problemClarity: 0,
        innovation: 0,
        technicalQuality: 0,
        documentation: 0,
        scalability: 0,
        impact: 0,
        presentation: 0,
        industryReadiness: 0
      },
      strengths: report.strengths || [],
      weaknesses: report.weaknesses || [],
      recommendations: report.recommendations || [],
      createdAt: data.created_at,
      status: 'completed'
    };
  }
};
