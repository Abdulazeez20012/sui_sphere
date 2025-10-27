import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div
      className={`flex items-center w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-[var(--primary-blue)] justify-end' : 'bg-white/10 justify-start'}`}
      onClick={onToggle}
      data-is-on={isOn}
      data-magnetic
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-md"
        layout
        transition={spring}
      />
    </div>
  );
};