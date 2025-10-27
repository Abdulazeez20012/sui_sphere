import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Waves } from 'lucide-react';

interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ 
        opacity: 1, 
        scale: 1,
        transition: { duration: 1, ease: 'easeOut' }
      });
      await controls.start({
        opacity: 0,
        transition: { duration: 0.5, delay: 0.5 }
      });
      onFinished();
    };
    sequence();
  }, [controls, onFinished]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        className="flex items-center space-x-4"
      >
        <Waves size={48} className="text-[var(--primary-blue)]" />
        <span className="font-heading font-bold text-5xl text-text">SuiSphere</span>
      </motion.div>
    </div>
  );
};