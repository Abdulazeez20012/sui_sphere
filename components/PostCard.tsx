import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Post } from '../types';
import { GlassCard } from './GlassCard';
import { AnimatedCounter } from './AnimatedCounter';
import { Twitter, Github, MessageCircle, ArrowUp, Share2, MessageSquare } from 'lucide-react';
import { useWalletKit } from '@mysten/wallet-kit';

const RedditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 12.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm2.4 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm3.5-2.1c-.2.2-.5.3-.8.3h-5.9c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8 0-.3.1-.6.3-.8.2-.2.5-.3.8-.3h5.9c.3 0 .6.1.8.3.2.2.3.5.3.8 0 .3-.1.6-.3.8zm-3.5 3.5c-1.7 0-3.1-1.4-3.1-3.1h6.2c0 1.7-1.4 3.1-3.1 3.1zM16.2 8.3c0-.5-.4-.9-.9-.9s-.9.4-.9.9.4.9.9.9.9-.4.9-.9z" />
  </svg>
);

const SOURCE_ICONS = {
  twitter: <Twitter size={20} className="text-[#1DA1F2]" />,
  github: <Github size={20} className="text-text" />,
  reddit: <RedditIcon width={20} height={20} className="text-[#FF4500]" />,
};

interface PostCardProps {
  post: Post;
  layout?: 'grid' | 'list';
}

export const PostCard: React.FC<PostCardProps> = ({ post, layout = 'grid' }) => {
  const isList = layout === 'list';
  const [upvotes, setUpvotes] = useState(post.stats.upvotes);
  const [comments, setComments] = useState(post.stats.comments);
  const { currentAccount } = useWalletKit();

  const handleUpvote = async () => {
    if (!currentAccount) {
      alert('Please connect your wallet to upvote posts');
      return;
    }

    try {
      // Update on-chain using smart contract
      // In a real implementation, you would call the smart contract function here
      
      // Update in backend
      const response = await fetch(`http://localhost:5000/api/posts/${post.id}/upvote`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setUpvotes(data.upvotes);
      }
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const content = (
    <>
      {post.imageUrl && (
        <div className={`overflow-hidden ${isList ? 'w-1/3 min-w-[200px] rounded-l-lg rounded-r-none' : 'mb-4 w-full rounded-lg'}`}>
          <motion.img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover" 
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </div>
      )}
      <div className={`flex flex-col flex-grow ${isList ? 'p-6 w-2/3' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img src={post.avatarUrl} alt={post.author} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-text">{post.author}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">{post.authorHandle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {SOURCE_ICONS[post.source]}
            <p className="text-xs text-gray-400 dark:text-gray-500">{post.timestamp}</p>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="font-heading text-xl font-bold mb-2 text-text">{post.title}</h3>
          <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed mb-4">{post.content}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs rounded bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] font-medium">{tag}</span>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="flex items-center gap-1.5 hover:text-[var(--primary-blue)] transition-colors"
                data-magnetic
                onClick={handleUpvote}
              >
                <ArrowUp size={16} /> <AnimatedCounter value={upvotes} />
              </motion.button>
              <div className="flex items-center gap-1.5"><MessageCircle size={16} /> <AnimatedCounter value={comments} /></div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 hover:text-[var(--primary-blue)] transition-colors" data-magnetic>
              <MessageSquare size={16} /> Comment
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hover:text-[var(--neon-teal)] transition-colors" data-magnetic><Share2 size={16} /></motion.button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <GlassCard 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`flex overflow-hidden ${isList ? 'flex-row' : 'flex-col'} p-0`}
    >
      {content}
    </GlassCard>
  );
};