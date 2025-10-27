import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

type MotionDivProps = Omit<MotionProps, 'children' | 'className'>;

const GlassCardComponent: React.ForwardRefRenderFunction<HTMLDivElement, GlassCardProps & MotionDivProps> = 
  ({ children, className = '', ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`bg-glass-bg backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const GlassCard = React.forwardRef(GlassCardComponent);