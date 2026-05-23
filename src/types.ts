export interface AppWindow {
  id: string;
  title: string;
  type: 'terminal' | 'game' | 'store' | 'settings' | 'browser';
  url?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface Game {
  id: string;
  title: string;
  url: string;
  category?: string;
  description?: string;
}

export type ThemeName = 'hacker' | 'cyberpunk' | 'retro' | 'vaporwave' | 'windows11' | 'light';
export type BackgroundName = 'matrix' | 'grid' | 'particles' | 'none' | 'gradient' | 'wallpaper';

