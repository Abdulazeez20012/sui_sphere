import React from 'react';
import { motion } from 'framer-motion';
import type { Recommendation, Post, Project } from '../types';
import { GlassCard } from './GlassCard';
import { ExternalLink } from 'lucide-react';

interface RecommendedCardProps {
  item: Recommendation;
}

// Type guard to check if an item is a Post
function isPost(item: Recommendation): item is Post {
  return (item as Post).source !== undefined;
}

export const RecommendedCard: React.FC<RecommendedCardProps> = ({ item }) => {
  const isPostItem = isPost(item);

  return (
    <GlassCard
      className="group p-0 overflow-hidden h-full flex flex-col"
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {isPostItem && item.imageUrl ? (
        <div className="h-40 w-full overflow-hidden">
          <motion.img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      ) : !isPostItem ? (
        <div className="h-40 w-full flex items-center justify-center bg-background/50">
          <img src={item.logoUrl} alt={`${item.name} logo`} className="w-20 h-20 rounded-full" />
        </div>
      ) : (
        <div className="h-40 w-full flex items-center justify-center bg-background/50">
            <p className="text-sm text-gray-500">No Image</p>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-[var(--primary-blue)] mb-2">
          {isPostItem ? `POST | ${item.source.toUpperCase()}` : `PROJECT | ${item.category.toUpperCase()}`}
        </p>
        <h3 className="font-heading text-lg font-bold mb-2 flex-grow">
          {isPostItem ? item.title : item.name}
        </h3>
        <a href="#" className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-400 group-hover:text-[var(--neon-teal)] transition-colors">
          View Details <ExternalLink size={16} />
        </a>
      </div>
    </GlassCard>
  );
};