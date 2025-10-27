import React, { useState, useRef } from 'react';
import type { TrendingItem } from '../types';
import { MoveRight } from 'lucide-react';

interface TrendingCardProps {
  item: TrendingItem;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ item }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [bgTranslate, setBgTranslate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation for the card itself
    const rotateY = 15 * ((mouseX / width) - 0.5);
    const rotateX = -15 * ((mouseY / height) - 0.5);
    setRotate({ x: rotateX, y: rotateY });

    // Calculate translation for the background image to create parallax
    const bgTranslateX = 10 * ((mouseX / width) - 0.5);
    const bgTranslateY = 10 * ((mouseY / height) - 0.5);
    setBgTranslate({ x: bgTranslateX, y: bgTranslateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setBgTranslate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="relative group w-[300px] min-w-[300px] h-[400px] [perspective:1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-magnetic
    >
      <div
        className="relative w-full h-full rounded-2xl shadow-lg transition-transform duration-300 ease-out [transform-style:preserve-3d] overflow-hidden"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            transform: `scale(1.1) translateX(${bgTranslate.x}px) translateY(${bgTranslate.y}px)`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Border Glow on Hover */}
        <div 
            className="absolute inset-0 rounded-2xl border-2 border-white/10 transition-all duration-300 group-hover:border-[var(--primary-blue)]"
            style={{ boxShadow: '0 0 25px -5px var(--primary-blue)' }}
        ></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white [transform:translateZ(40px)]">
            <p className="text-sm font-bold text-[var(--primary-blue)] mb-2">{item.type}</p>
            <h3 className="font-heading text-2xl font-bold mb-3 text-white">{item.title}</h3>
            <div className="flex items-center justify-between text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform-gpu -translate-y-2 group-hover:translate-y-0">
                <span>From {item.source}</span>
                <MoveRight size={20} />
            </div>
        </div>
      </div>
    </div>
  );
};