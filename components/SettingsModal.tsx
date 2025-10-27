import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { ToggleSwitch } from './ToggleSwitch';
import { X, Music } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  isSoundOn: boolean;
  toggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, isSoundOn, toggleSound }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <GlassCard className="p-0">
          <header className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="font-heading text-2xl font-bold">Settings</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10"
              aria-label="Close settings"
              data-magnetic
            >
              <X size={24} />
            </motion.button>
          </header>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Music size={20} className="text-[var(--primary-blue)]" />
                <span className="font-semibold">Ambient Sound</span>
              </div>
              <ToggleSwitch isOn={isSoundOn} onToggle={toggleSound} />
            </div>
            {/* Future settings can be added here */}
            <div className="text-center text-sm text-gray-500 pt-4">
                <p>More customization options coming soon!</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};