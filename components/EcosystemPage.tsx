import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../types';

const CATEGORIES = ['All', 'DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Social'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const EcosystemPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="container mx-auto px-4 pt-28 md:pt-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="text-center mb-16"
      >
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight">
          <span className="text-gradient">Sui Ecosystem</span> Directory
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 dark:text-gray-400">
          Discover the vibrant landscape of projects building on Sui.
        </p>
      </motion.div>

      {/* Filter Bar */}
      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
        {CATEGORIES.map(category => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all duration-300 ${
              activeFilter === category
                ? 'bg-[var(--primary-blue)] border-[var(--primary-blue)] text-white'
                : 'bg-transparent border-white/20 text-text hover:border-[var(--primary-blue)] hover:text-[var(--primary-blue)]'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        key={activeFilter}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};