import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES, TRENDING_ITEMS } from '../constants';
import { Button } from './Button';
import { GlassCard } from './GlassCard';
import { TrendingCard } from './TrendingCard';
import { ArrowDown, Layers, MessageSquare, Zap } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

const ICONS: { [key: string]: React.ElementType } = {
  Layers,
  MessageSquare,
  Zap,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Discover. Discuss. Build.
          </motion.h1>
          <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gradient block mt-2 md:mt-4">
            Everything Sui, All in One Sphere.
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-8 max-w-2xl text-lg md:text-xl text-gray-300 dark:text-gray-400">
            The next-generation Web3 discussion and aggregation hub. Explore the entire Sui ecosystem from one futuristic portal.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Button onClick={onExplore} variant="primary" style={{boxShadow: '0 0 20px var(--primary-blue)'}}>
              Explore Sphere
            </Button>
            <Button variant="secondary">Connect Wallet (zkLogin)</Button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.5, duration: 1 } }} className="absolute bottom-10 animate-bounce">
          <ArrowDown className="text-white/50" size={24} />
        </motion.div>
      </section>

      {/* Why SuiSphere Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 py-20 md:py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.iconName];
            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <GlassCard className="p-8 text-center flex flex-col items-center h-full hover:border-[var(--primary-blue)]/50" whileHover={{ y: -8 }}>
                  <div className="mb-6 bg-[var(--primary-blue)]/10 p-4 rounded-full">
                    <Icon className="text-[var(--primary-blue)]" size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 text-text">{feature.title}</h3>
                  <p className="text-gray-400 dark:text-gray-500">{feature.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Trending Section */}
      <section className="py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
           <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold">
                  <span className="text-gradient">Trending</span> Now
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400 dark:text-gray-500">
                  Dive into the most active discussions, popular projects, and influential developers across the Sui ecosystem.
              </p>
          </div>
        </motion.div>
        
        <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
                {[...TRENDING_ITEMS, ...TRENDING_ITEMS].map((item, index) => (
                    <div key={`${item.id}-${index}`} className="shrink-0 mx-4">
                        <TrendingCard item={item} />
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};