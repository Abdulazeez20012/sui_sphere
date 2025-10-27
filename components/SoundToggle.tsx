import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  isSoundOn: boolean;
  onToggle: () => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ isSoundOn, onToggle }) => {
  const iconVariants = {
    initial: { y: -20, opacity: 0, scale: 0.5 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: 20, opacity: 0, scale: 0.5 },
  };

  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
      aria-label="Toggle ambient sound"
      data-magnetic
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSoundOn ? (
          <motion.div
            key="sound-on"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Volume2 size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="sound-off"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <VolumeX size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};