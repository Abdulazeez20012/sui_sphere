import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { PostCard } from './PostCard';
import { BadgeCard } from './BadgeCard';
import { RecommendedCard } from './RecommendedCard';
import { Copy, Droplets } from 'lucide-react';
// Wallet integration
import { useWalletKit } from '@mysten/wallet-kit';

type ProfileTab = 'posts' | 'saved' | 'badges';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { currentAccount } = useWalletKit();

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentAccount) return;
      
      try {
        // Fetch user profile
        const profileResponse = await fetch(`http://localhost:5001/api/user/${currentAccount.address}`);
        const profileData = await profileResponse.json();
        setUserProfile(profileData);
        
        // Fetch user posts
        const postsResponse = await fetch(`http://localhost:5001/api/posts`);
        const postsData = await postsResponse.json();
        setUserPosts(postsData.posts.filter((p: any) => p.authorAddress === currentAccount.address));
        
        // Fetch saved posts
        setSavedPosts(postsData.posts.filter((p: any) => profileData.savedPostIds?.includes(p._id)));
        
        // Fetch recommendations
        setRecommendations(postsData.posts.slice(0, 4));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [currentAccount]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        );
      case 'saved':
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        );
      case 'badges':
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {userProfile?.badges?.map((badge: any) => (
              <motion.div key={badge.id} variants={itemVariants}>
                <BadgeCard badge={badge} />
              </motion.div>
            ))}
          </motion.div>
        );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tab: ProfileTab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`relative px-4 py-2 text-sm font-bold transition-colors ${
        activeTab === tab ? 'text-text' : 'text-gray-400 hover:text-text'
      }`}
    >
      {label}
      {activeTab === tab && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary-blue)] rounded-full"
          layoutId="active-tab-indicator"
        />
      )}
    </button>
  );

  if (!currentAccount) {
    return (
      <div className="container mx-auto px-4 pt-28 md:pt-32">
        <GlassCard className="p-8 text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="mb-6">Please connect your Sui wallet to view your profile.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-28 md:pt-32">
      {/* Profile Header */}
      <GlassCard className="p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
        <motion.img 
            src={userProfile?.avatarUrl || 'https://picsum.photos/seed/user_profile/128/128'} 
            alt="User Avatar" 
            className="w-32 h-32 rounded-full border-4 border-[var(--primary-blue)] shadow-lg"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
        />
        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="font-heading text-3xl font-bold">
              {userProfile?.address?.substring(0, 6)}...{userProfile?.address?.substring(userProfile?.address?.length - 4)}
            </h1>
            <button className="text-gray-400 hover:text-[var(--primary-blue)]"><Copy size={18} /></button>
          </div>
          <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-lg text-[var(--neon-teal)] font-semibold">
            <Droplets size={20} />
            <span>{userProfile?.suiBalance?.toLocaleString() || 0} SUI</span>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="mb-8 border-b border-white/10 flex justify-center md:justify-start">
        <TabButton tab="posts" label={`Posts (${userPosts.length})`} />
        <TabButton tab="saved" label={`Saved (${savedPosts.length})`} />
        <TabButton tab="badges" label={`Badges (${userProfile?.badges?.length || 0})`} />
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>

      {/* "You might also like" Section */}
      <motion.section 
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
      >
          <motion.h2 
              className="font-heading text-3xl font-bold mb-8 text-center md:text-left"
              variants={itemVariants}
          >
              You might also like
          </motion.h2>
          <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
          >
              {recommendations.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                      <RecommendedCard item={item} />
                  </motion.div>
              ))}
          </motion.div>
      </motion.section>
    </div>
  );
};