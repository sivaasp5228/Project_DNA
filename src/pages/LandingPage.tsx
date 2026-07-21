import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Cpu, 
  FileText, 
  LineChart, 
  Sparkles, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { FeatureCard } from '../components/FeatureCard';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Cpu,
      title: 'AI Codebase Evaluation',
      description: 'Ingests project structure, READMEs, and key configurations to audit technical quality and scalability.'
    },
    {
      icon: LineChart,
      title: 'Multi-Metric Scorecard',
      description: 'Get granular metrics for Problem Clarity, Innovation, Technical Quality, Documentation, and 4 other criteria.'
    },
    {
      icon: FileText,
      title: 'Documentation Reviewer',
      description: 'Parses project documentation to assess structural clarity, setup ease, and developer onboarding friction.'
    },
    {
      icon: Sparkles,
      title: 'Innovation Auditing',
      description: 'Evaluates your product pitch and solution architecture against contemporary market and technology trends.'
    },
    {
      icon: ShieldCheck,
      title: 'Production Readiness',
      description: 'Scores the database structure, routing paths, test coverage, and deployment posture for go-live compatibility.'
    },
    {
      icon: Zap,
      title: 'Instant Actionable Advice',
      description: 'Receive custom, concrete recommendations to refactor code blocks, secure dependencies, and improve UX.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Submit Project Info',
      description: 'Input your project description, tech stack, and upload your README file and presentation deck.'
    },
    {
      step: '02',
      title: 'AI DNA Extraction',
      description: 'Our system runs automated static review checks, mapping documentation structure and database boundaries.'
    },
    {
      step: '03',
      title: 'Access Analytics Reports',
      description: 'Review your interactive radar charts, detailed scorecards, and a roadmap of weaknesses and fixes.'
    }
  ];

  const testimonials = [
    {
      quote: 'ProjectDNA AI saved our team hours of code review. The recommendations on our Next.js caching layers were spot-on.',
      name: 'Sarah Connor',
      role: 'CTO, EcoSync',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80'
    },
    {
      quote: 'We uploaded our README and pitch deck, and within 30 seconds we had an in-depth scorecard highlighting our scaling bottlenecks.',
      name: 'Marcus Vance',
      role: 'Lead Architect, Finflow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80'
    },
    {
      quote: 'Crucial tool for hackathons and software evaluations. The radar chart visualizes structural quality instantly.',
      name: 'Elena Rostova',
      role: 'Founder, DevLabs',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&h=128&q=80'
    }
  ];

  return (
    <div className="relative select-none overflow-x-hidden">
      {/* Background Mesh Gradients - Subtle & Sleek */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] bg-blue-600/3 rounded-full blur-[100px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full mb-6">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Project Evaluator for Students</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-100 tracking-tight max-w-3xl leading-[1.1] mb-6">
            Understand Your Project's <span className="text-blue-500">Technical DNA</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Submit your codebase parameters, documentation, and decks. Receive premium dashboard audits, interactive scorecards, and roadmap recommendations in seconds.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <PrimaryButton 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/signup')}
              rightIcon={<ArrowRight className="h-4.5 w-4.5" />}
            >
              Get Started Free
            </PrimaryButton>
            <PrimaryButton 
              variant="outline" 
              size="lg"
              onClick={handleLearnMore}
            >
              Learn More
            </PrimaryButton>
          </div>

          {/* Graphic Showcase Container (Floating Mockup) */}
          <div className="w-full bg-zinc-900 border border-zinc-850 rounded-2xl p-4 shadow-2xl relative group overflow-hidden max-w-4xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4 select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <div className="text-[10px] text-zinc-550 font-medium">projectdna-evaluation-report.pdf</div>
              <div className="w-8" />
            </div>

            {/* Mock Dashboard Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Left Mock Radar Column */}
              <div className="bg-zinc-950/50 border border-zinc-850 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Interactive Radar Metric</span>
                <div className="h-40 bg-zinc-900/60 border border-dashed border-zinc-850 rounded-lg flex items-center justify-center my-3 text-[10px] text-zinc-600">
                  [ Radar Data Graph Grid ]
                </div>
                <div className="flex justify-between items-center text-[10px] text-zinc-400">
                  <span>Overall Quality:</span>
                  <span className="font-bold text-blue-500">90%</span>
                </div>
              </div>

              {/* Right Mock Scorecard Column */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <div className="bg-zinc-950/50 border border-zinc-850 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-zinc-200">Technical Quality</span>
                    <span className="text-[10px] font-bold text-blue-500">90/100</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-blue-500" />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">Code architecture shows scalable dependency bindings and type-safety practices.</p>
                </div>

                <div className="bg-zinc-950/50 border border-zinc-850 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-zinc-200">Documentation Metrics</span>
                    <span className="text-[10px] font-bold text-zinc-400">70/100</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-[78%] bg-zinc-400" />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">README is rich but is missing detailed API endpoint structures and schema examples.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 border-b border-zinc-950 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight mb-4">Enterprise Grade Analysis</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Every system is audited across 8 core dimensions to compile a thorough evaluation profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard 
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 border-b border-zinc-950 bg-zinc-950/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight mb-4">How ProjectDNA Works</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Our automated system analyzes your inputs in 3 clean stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, idx) => (
              <div key={idx} className="flex flex-col text-left gap-4 relative group">
                <div className="text-4xl font-extrabold text-blue-500/10 group-hover:text-blue-500/20 transition-colors leading-none font-mono">
                  {item.step}
                </div>
                <h3 className="text-sm font-semibold text-zinc-200">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
                
                {idx < 2 && (
                  <div className="hidden md:block absolute top-4 left-[90%] w-[30%] h-[1px] bg-dashed border-t border-zinc-850" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 border-b border-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight mb-4">Trusted by Leading Developers</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              See what engineers are saying about ProjectDNA AI evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-6 text-left flex flex-col justify-between">
                <p className="text-xs text-zinc-400 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full border border-zinc-800" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-zinc-300">{t.name}</span>
                    <span className="text-[10px] text-zinc-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent to-blue-500/2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight mb-4">Ready to Extract Your Project DNA?</h2>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed mb-8">
            Create an account in under a minute. Submit your project requirements and let our automated AI system compile your development scorecards today.
          </p>
          <PrimaryButton 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/signup')}
          >
            Create Your Account
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
};
