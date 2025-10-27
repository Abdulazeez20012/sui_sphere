import React from 'react';
import { motion } from 'framer-motion';
import { Award, GitMerge, Compass, Bug } from 'lucide-react';
import type { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
}

// Create a map from icon names to the imported components for robust lookup.
const ICONS: { [key in Badge['iconName']]: React.ElementType } = {
  Award,
  GitMerge,
  Compass,
  Bug,
};

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const Icon = ICONS[badge.iconName];

  return (
    <motion.div 
      className="group relative [perspective:1000px]"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative aspect-square w-full rounded-2xl p-4 bg-glass-bg backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-center transition-transform duration-500 [transform-style:preserve-3d] group-hover:shadow-2xl">
        
        {/* Shimmer Effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 group-hover:left-[100%]"></div>
        </div>
        
        {/* Icon */}
        <motion.div
            className="mb-2 text-[var(--primary-blue)]"
            style={{ transform: 'translateZ(30px)' }}
        >
          {Icon && <Icon size={40} />}
        </motion.div>
        
        {/* Name */}
        <motion.p 
            className="font-bold text-sm text-text"
            style={{ transform: 'translateZ(20px)' }}
        >
            {badge.name}
        </motion.p>
        
        {/* Description on Hover */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs text-gray-300">{badge.description}</p>
        </div>
      </div>
    </motion.div>
  );
};