import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dna } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors">
          <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg">
            <Dna className="h-5 w-5 animate-pulse-ring" />
          </div>
          <span className="font-bold text-base tracking-tight">ProjectDNA <span className="text-blue-500 font-medium text-xs bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-full ml-1">AI</span></span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => handleNavClick('features')} 
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-medium cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')} 
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-medium cursor-pointer"
          >
            How it works
          </button>
          <button 
            onClick={() => handleNavClick('testimonials')} 
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-medium cursor-pointer"
          >
            Testimonials
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <PrimaryButton 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/login')}
          >
            Log In
          </PrimaryButton>
          <PrimaryButton 
            variant="primary" 
            size="sm"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
};
