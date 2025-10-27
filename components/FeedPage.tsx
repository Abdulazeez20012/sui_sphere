import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POSTS } from '../constants';
import { PostCard } from './PostCard';
import { GlassCard } from './GlassCard';
import type { Layout } from '../types';
import { Plus, Filter, LayoutGrid, List, Flame } from 'lucide-react';
// Fix: Import the Button component.
import { Button } from './Button';

export const FeedPage: React.FC = () => {
  const [layout, setLayout] = useState<Layout>('grid');
  const [visiblePosts, setVisiblePosts] = useState(POSTS.slice(0, 6));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(POSTS.length > 6);

  const loadMorePosts = () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      const currentLength = visiblePosts.length;
      const newPosts = POSTS.slice(currentLength, currentLength + 3);
      setVisiblePosts(prevPosts => [...prevPosts, ...newPosts]);
      setIsLoadingMore(false);
      if (currentLength + 3 >= POSTS.length) {
        setHasMore(false);
      }
    }, 1000);
  };

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

  return (
    <div className="container mx-auto px-4 pt-28 md:pt-32">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          className="w-full md:w-1/4 lg:w-1/5 md:sticky md:top-28 self-start flex flex-col gap-6"
        >
          <GlassCard className="p-6">
            <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2"><Filter size={20}/> Filters</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-3 py-2 rounded-md bg-[var(--primary-blue)]/20 text-[var(--primary-blue)] font-semibold" data-magnetic>All Posts</button>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-colors" data-magnetic>Twitter</button>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-colors" data-magnetic>GitHub</button>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-colors" data-magnetic>Reddit</button>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition-colors" data-magnetic>Discussions</button>
            </div>
          </GlassCard>
          <GlassCard className="p-6 animate-pulse-glow border-[var(--primary-blue)]/50">
             <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2"><Flame size={20} className="text-[var(--primary-blue)]" /> Hot Discussions</h2>
             <div className="space-y-3 text-sm">
                <p className="truncate hover:text-[var(--primary-blue)] transition-colors cursor-pointer">Future of DeFi on Sui</p>
                <p className="truncate hover:text-[var(--primary-blue)] transition-colors cursor-pointer">Move Language vs. Solidity</p>
                <p className="truncate hover:text-[var(--primary-blue)] transition-colors cursor-pointer">Most underrated NFT projects?</p>
             </div>
          </GlassCard>
        </motion.aside>

        {/* Main Feed */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2 p-1 rounded-lg bg-white/5 border border-white/10">
              <button onClick={() => setLayout('grid')} className={`p-2 rounded-md transition-colors ${layout === 'grid' ? 'bg-[var(--primary-blue)] text-white' : 'text-gray-400 hover:bg-white/10'}`} data-magnetic><LayoutGrid size={20} /></button>
              <button onClick={() => setLayout('list')} className={`p-2 rounded-md transition-colors ${layout === 'list' ? 'bg-[var(--primary-blue)] text-white' : 'text-gray-400 hover:bg-white/10'}`} data-magnetic><List size={20} /></button>
            </div>
          </div>

          <motion.div
            key={layout}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={layout === 'grid' 
              ? 'columns-1 lg:columns-2 gap-6 space-y-6' 
              : 'flex flex-col gap-6'}
          >
            {visiblePosts.map(post => (
              <motion.div key={post.id} variants={itemVariants} className={layout === 'grid' ? 'break-inside-avoid' : ''}>
                  <PostCard post={post} layout={layout}/>
              </motion.div>
            ))}
          </motion.div>
          
          {hasMore && (
            <div className="text-center mt-10">
              <motion.div
                onViewportEnter={loadMorePosts}
                viewport={{ once: true, amount: 0.8 }}
              >
                <Button onClick={loadMorePosts} disabled={isLoadingMore}>
                  {isLoadingMore ? 'Loading...' : 'Load More'}
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--aqua-gradient-start)] to-[var(--aqua-gradient-end)] text-white flex items-center justify-center shadow-lg transition-shadow duration-300"
        style={{ boxShadow: '0 0 20px var(--aqua-gradient-start)' }}
        data-magnetic
      >
        <Plus size={32} />
      </motion.button>
    </div>
  );
};