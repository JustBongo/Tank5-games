import React from 'react';
import { motion, useDragControls } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClick: () => void;
  children: React.ReactNode;
  isMaximized: boolean;
  theme: any;
}

export function Window({
  title,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onClick,
  children,
  isMaximized,
  theme
}: WindowProps) {
  const controls = useDragControls();

  return (
    <motion.div
      drag={!isMaximized}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      onMouseDown={onClick}
      className={`absolute flex flex-col border-2 overflow-hidden shadow-2xl
        ${isActive ? 'z-50' : 'z-40 opacity-95'}
        ${isMaximized ? 'inset-0 w-full h-full rounded-none' : 'w-[900px] h-[650px] rounded-lg'}
      `}
      style={{ 
        backgroundColor: theme.windowBg,
        borderColor: isActive ? theme.accentColor : `${theme.accentColor}30`,
        boxShadow: isActive ? `0 0 30px ${theme.accentColor}20` : 'none',
        ...(isMaximized ? { x: 0, y: 0 } : {})
      }}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="flex items-center justify-between px-3 py-2 border-b cursor-move select-none"
        style={{ backgroundColor: `${theme.bgColor}90`, borderColor: `${theme.accentColor}30` }}
        onPointerDown={(e) => controls.start(e)}
      >
        <div className="flex items-center gap-2 font-mono text-sm leading-none pt-1" style={{ color: theme.accentColor }}>
          <span className="font-bold opacity-80">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onMinimize} className="p-1.5 rounded transition-colors hover:bg-white/10" style={{ color: theme.accentColor }}>
            <Minus size={14} />
          </button>
          <button onClick={onMaximize} className="p-1.5 rounded transition-colors hover:bg-white/10" style={{ color: theme.accentColor }}>
            <Square size={12} />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors" style={{ color: theme.accentColor }}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 relative bg-black overflow-hidden pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}
