import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'relative group overflow-hidden px-6 py-3 rounded-lg font-bold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:ring-offset-2 focus:ring-offset-background';
  
  const variantClasses = {
    primary: 'bg-transparent border-2 border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white',
    secondary: 'bg-white/10 border-2 border-white/20 text-text hover:bg-white/20',
  };

  return (
    <motion.button
      data-magnetic
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Shimmer effect */}
      <div className="absolute inset-0 z-0 h-full w-full transform-gpu scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </motion.button>
  );
};