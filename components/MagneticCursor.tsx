import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const cursorScale = useSpring(1, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const target = e.target as HTMLElement;
      
      const magEl = target.closest<HTMLElement>('[data-magnetic]');
      
      if (magEl) {
        const { left, top, width, height } = magEl.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        
        cursorX.set(centerX + distanceX * 0.2); // Move slightly with the mouse
        cursorY.set(centerY + distanceY * 0.2);
        cursorScale.set(1.5);
      } else {
        cursorX.set(clientX);
        cursorY.set(clientY);
        cursorScale.set(1);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY, cursorScale]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-[var(--primary-blue)]/30 border-2 border-[var(--primary-blue)] pointer-events-none z-[9999] hidden md:block"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: '-50%',
        y: '-50%',
        scale: cursorScale,
      }}
    />
  );
};
