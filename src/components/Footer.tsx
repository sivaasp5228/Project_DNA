import React from 'react';
import { Link } from 'react-router-dom';
import { Dna, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & description */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors">
              <div className="p-1 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg">
                <Dna className="h-4.5 w-4.5" />
              </div>
              <span className="font-bold text-sm tracking-tight">ProjectDNA AI</span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Analyze your project DNA. Elevate product quality, optimize codebases, and demonstrate industry readiness with automated AI evaluations.
            </p>
            <div className="flex items-center gap-3.5 mt-2">
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Product</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#features" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">How it works</a></li>
              <li><a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-600">
            © {new Date().getFullYear()} ProjectDNA AI. All rights reserved.
          </span>
          <span className="text-xs text-zinc-650">
            Designed for premium engineering teams.
          </span>
        </div>
      </div>
    </footer>
  );
};
