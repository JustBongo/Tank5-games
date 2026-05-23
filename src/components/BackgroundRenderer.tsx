import React from 'react';
import { BackgroundName, ThemeName } from '../types';
import { motion } from 'motion/react';

interface BackgroundRendererProps {
  bg: BackgroundName;
  theme: any;
}

export function BackgroundRenderer({ bg, theme }: BackgroundRendererProps) {
  if (bg === 'none') {
    return (
      <div className="absolute inset-0" style={{ backgroundColor: theme.bgColor }} />
    );
  }

  if (bg === 'wallpaper') {
    return (
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=2500')" }}>
         <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  if (bg === 'gradient') {
    return (
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top right, ${theme.accentColor}30, ${theme.bgColor} 60%)` }} />
    );
  }

  if (bg === 'matrix') {
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: theme.bgColor }}>
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: `linear-gradient(${theme.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.accentColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            animation: 'scroll-down 20s linear infinite text-green-500' // fallback
          }}
        />
        {/* Simple simulated scanlines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')] opacity-50 pointer-events-none mix-blend-overlay"></div>
      </div>
    );
  }

  if (bg === 'grid') {
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: theme.bgColor, perspective: '1000px' }}>
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] transform origin-bottom rotate-x-[60deg]"
             style={{
               backgroundImage: `linear-gradient(${theme.accentColor} 2px, transparent 2px), linear-gradient(90deg, ${theme.accentColor} 2px, transparent 2px)`,
               backgroundSize: '50px 50px',
               animation: 'grid-move 2s linear infinite',
               boxShadow: `inset 0 0 100px 100px ${theme.bgColor}`,
               opacity: 0.3
             }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/80 pointer-events-none" />
      </div>
    );
  }

  if (bg === 'particles') {
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: theme.bgColor }}>
         {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: theme.accentColor,
                width: Math.random() * 8 + 2 + 'px',
                height: Math.random() * 8 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.3 + 0.1
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
         ))}
      </div>
    );
  }

  return null;
}
