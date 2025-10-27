import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const BackgroundOrbs: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const x1 = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const y1 = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const x2 = useTransform(mouseX, [0, window.innerWidth], [30, -30]);
  const y2 = useTransform(mouseY, [0, window.innerHeight], [30, -30]);
  const x3 = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const y3 = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <motion.div
        className="absolute top-[-10%] left-[10%] h-[300px] w-[300px] rounded-full bg-[var(--primary-blue)]/20 blur-3xl filter animate-orb-float"
        style={{ x: x1, y: y1, animationDelay: '0s' }}
      />
      <motion.div
        className="absolute top-[20%] right-[-5%] h-[400px] w-[400px] rounded-full bg-[var(--aqua-gradient-end)]/20 blur-3xl filter animate-orb-float"
        style={{ x: x2, y: y2, animationDelay: '5s' }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[30%] h-[250px] w-[250px] rounded-full bg-[var(--neon-teal)]/10 blur-3xl filter animate-orb-float"
        style={{ x: x3, y: y3, animationDelay: '10s' }}
      />
    </div>
  );
};