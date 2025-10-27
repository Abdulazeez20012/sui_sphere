import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottiePlayerProps {
  animationData: any;
  className?: string;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({ animationData, className }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const anim = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
      return () => anim.destroy();
    }
  }, [animationData]);

  return <div ref={container} className={className} />;
};
