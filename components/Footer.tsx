
import React from 'react';
import { Twitter, Github, Waves } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-8 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-2">
           <Waves size={20} className="text-[var(--primary-blue)]" />
           <span className="font-heading font-bold text-lg text-text">SuiSphere</span>
        </div>
        <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} SuiSphere. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-[var(--primary-blue)] transition-colors"><Twitter size={18} /></a>
          <a href="#" className="hover:text-[var(--primary-blue)] transition-colors"><Github size={18} /></a>
        </div>
      </div>
    </footer>
  );
};