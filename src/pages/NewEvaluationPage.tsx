import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Sparkles, FolderCode, Link2 } from 'lucide-react';
import { useEvaluations } from '../context/EvaluationContext';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { UploadBox } from '../components/UploadBox';
import { PrimaryButton } from '../components/PrimaryButton';
import { toast } from 'sonner';

const evaluationSchema = z.object({
  title: z.string().min(3, { message: 'Project Title must be at least 3 characters.' }),
  problemStatement: z.string().min(20, { message: 'Problem Statement must explain the core pain points (min 20 chars).' }),
  description: z.string().min(50, { message: 'Description must be detailed (min 50 characters).' }),
  techStack: z.string().min(3, { message: 'Define at least one or more technical tools (comma-separated).' }),
  githubUrl: z.string().url({ message: 'Enter a valid URL.' }).optional().or(z.literal('')),
  deploymentUrl: z.string().url({ message: 'Enter a valid URL.' }).optional().or(z.literal(''))
});

type EvaluationFormInput = z.infer<typeof evaluationSchema>;

export const NewEvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const { evaluateProject } = useEvaluations();

  const [readmeFile, setReadmeFile] = useState<File | null>(null);
  const [pptFile, setPptFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EvaluationFormInput>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      title: '',
      problemStatement: '',
      description: '',
      techStack: '',
      githubUrl: '',
      deploymentUrl: ''
    }
  });

  const onSubmit = async (data: EvaluationFormInput) => {
    // Navigate immediately to loading screen
    navigate('/dashboard/loading');
    
    // Trigger mock evaluation in the background (context handles progress)
    try {
      const result = await evaluateProject({
        title: data.title,
        problemStatement: data.problemStatement,
        description: data.description,
        techStack: data.techStack,
        githubUrl: data.githubUrl || undefined,
        deploymentUrl: data.deploymentUrl || undefined,
        readmeFile,
        pptFile
      });
      
      toast.success('Project analysis complete!', {
        description: `Successfully analyzed "${result.title}".`
      });
      
      // Redirect to the newly generated report
      navigate(`/dashboard/report/${result.id}`);
    } catch (err) {
      toast.error('Evaluation failed', {
        description: err instanceof Error ? err.message : 'An error occurred during evaluation.'
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left select-none">
      {/* Header Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-1.5 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Evaluation Config</span>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">Analyze New Project</h2>
        </div>
      </div>

      {/* Main Form container */}
      <div className="bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden">
        {/* Glowing border highlight */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-4xl">
          {/* Section: Project Overview */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-1">
              <FolderCode className="h-4.5 w-4.5 text-blue-500" />
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Project Core Info</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Project Title"
                placeholder="e.g. EcoSphere Carbon Tracker"
                error={errors.title?.message}
                disabled={isSubmitting}
                helperText="Give your project a concise, descriptive title."
                {...register('title')}
              />

              <Input
                label="Tech Stack"
                placeholder="e.g. React, TypeScript, Tailwind CSS, PostgreSQL"
                error={errors.techStack?.message}
                disabled={isSubmitting}
                helperText="Comma-separated list of programming languages, libraries, databases."
                {...register('techStack')}
              />
            </div>

            <Textarea
              label="Problem Statement"
              placeholder="Describe the specific problem or pain point your application addresses..."
              error={errors.problemStatement?.message}
              disabled={isSubmitting}
              rows={3}
              helperText="Minimum 20 characters. Explain who faces this problem and why it matters."
              {...register('problemStatement')}
            />

            <Textarea
              label="Project Description"
              placeholder="Detail your solution, key feature sets, how it works, and database layout boundaries..."
              error={errors.description?.message}
              disabled={isSubmitting}
              rows={4}
              helperText="Minimum 50 characters. Give detail so the evaluator can assess technical quality."
              {...register('description')}
            />
          </div>

          {/* Section: URLs */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-1">
              <Link2 className="h-4.5 w-4.5 text-blue-500" />
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Repository & Links (Optional)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="GitHub URL"
                placeholder="https://github.com/username/project"
                error={errors.githubUrl?.message}
                disabled={isSubmitting}
                {...register('githubUrl')}
              />

              <Input
                label="Deployment URL"
                placeholder="https://project.example.com"
                error={errors.deploymentUrl?.message}
                disabled={isSubmitting}
                {...register('deploymentUrl')}
              />
            </div>
          </div>

          {/* Section: Upload Documents */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-1">
              <Sparkles className="h-4.5 w-4.5 text-blue-500" />
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Project Files (Optional)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UploadBox
                label="Upload README file"
                accept=".md,.txt"
                helperText="Markdown (.md) files up to 2MB"
                onFileSelect={setReadmeFile}
                selectedFile={readmeFile}
              />

              <UploadBox
                label="Upload Presentation deck"
                accept=".pdf,.ppt,.pptx"
                helperText="PDF or PowerPoint files up to 10MB"
                onFileSelect={setPptFile}
                selectedFile={pptFile}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="border-t border-zinc-900 pt-5 flex justify-end gap-3">
            <PrimaryButton
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              disabled={isSubmitting}
            >
              Cancel
            </PrimaryButton>
            
            <PrimaryButton
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              leftIcon={<Sparkles className="h-4.5 w-4.5 animate-pulse" />}
            >
              Run Evaluation
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};
