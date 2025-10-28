import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Tag } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAccount) return;

    setIsSubmitting(true);
    try {
      // Create post on-chain using smart contract
      const txb = new TransactionBlock();
      
      // In a real implementation, you would call the smart contract function here
      // For now, we'll just simulate the transaction
      /*
      txb.moveCall({
        target: '0x...::post::create_post',
        arguments: [
          txb.pure(title),
          txb.pure(content),
          txb.pure(Date.now()),
        ],
      });
      */
      
      // Simulate transaction for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create post in backend
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'discussion',
          author: currentAccount.address,
          authorAddress: currentAccount.address,
          authorHandle: `${currentAccount.address.substring(0, 6)}...${currentAccount.address.substring(currentAccount.address.length - 4)}`,
          avatarUrl: 'https://picsum.photos/seed/user/48/48',
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          stats: {
            upvotes: 0,
            comments: 0,
            shares: 0
          },
          imageUrl: imageUrl || undefined
        }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        setTags('');
        setImageUrl('');
        onPostCreated();
        onClose();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <GlassCard className="p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl font-bold">Create New Post</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-[var(--primary-blue)] focus:outline-none transition-all duration-300"
                      placeholder="Enter a title for your post"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-[var(--primary-blue)] focus:outline-none transition-all duration-300"
                      placeholder="Share your thoughts..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <Tag size={16} /> Tags
                      </label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-[var(--primary-blue)] focus:outline-none transition-all duration-300"
                        placeholder="Sui, Move, Web3 (comma separated)"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <Image size={16} /> Image URL (Optional)
                      </label>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-[var(--primary-blue)] focus:outline-none transition-all duration-300"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Post'}
                    </Button>
                  </div>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};