import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Cpu, Chrome } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-surface-border bg-surface/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-deep to-red-deep flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-cinetext-main">CineMind</p>
            <p className="text-xs text-cinetext-muted">Personalized AI Movie Engine</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-cinetext-muted">
          <Link href="/settings" className="hover:text-purple-pastel flex items-center gap-1.5 transition-colors">
            <Shield className="w-3.5 h-3.5" /> Privacy Settings
          </Link>
          <Link href="/settings#extension" className="hover:text-purple-pastel flex items-center gap-1.5 transition-colors">
            <Chrome className="w-3.5 h-3.5" /> Browser Extension
          </Link>
          <Link href="/taste-profile" className="hover:text-purple-pastel flex items-center gap-1.5 transition-colors">
            <Cpu className="w-3.5 h-3.5" /> AI Recommendation Pipeline
          </Link>
        </div>

        <p className="text-xs text-cinetext-dim">
          © {new Date().getFullYear()} CineMind. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
