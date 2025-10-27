import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';
import { GlassCard } from './GlassCard';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <GlassCard 
      className="group p-6 flex flex-col items-center text-center h-full hover:border-[var(--primary-blue)]/50"
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div 
        className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white/10 flex items-center justify-center bg-background"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
      >
        <img src={project.logoUrl} alt={`${project.name} logo`} className="w-full h-full object-cover" />
      </motion.div>
      <h3 className="font-heading text-xl font-bold mb-1 text-text">{project.name}</h3>
      <p className="text-sm font-semibold text-[var(--primary-blue)] mb-4">{project.category}</p>
      
      <div className="relative w-full flex-grow flex items-center">
        <p className="text-gray-400 dark:text-gray-500 transition-opacity duration-300 group-hover:opacity-0">
          {project.description.substring(0, 60)}...
        </p>
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-gray-300 dark:text-gray-400 text-sm">{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-[var(--neon-teal)] hover:underline" data-magnetic>
            Visit <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </GlassCard>
  );
};