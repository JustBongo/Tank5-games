/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppWindow, Game, ThemeName, BackgroundName } from './types';
import { Taskbar } from './components/Taskbar';
import { Window } from './components/Window';
import { Terminal } from './components/Terminal';
import { GameFrame } from './components/GameFrame';
import { Store } from './components/Store';
import { Settings } from './components/Settings';
import { BackgroundRenderer } from './components/BackgroundRenderer';
import { Browser } from './components/Browser';
import { Box } from 'lucide-react';

const themes = {
  windows11: {
    accentColor: '#0078d4',
    bgColor: '#f3f3f3',
    windowBg: '#ffffff',
  },
  light: {
    accentColor: '#3b82f6',
    bgColor: '#e2e8f0',
    windowBg: '#ffffff',
  },
  hacker: {
    accentColor: '#10b981', // green-500
    bgColor: '#000803',
    windowBg: '#05100a',
  },
  cyberpunk: {
    accentColor: '#0ea5e9', // sky-500
    bgColor: '#020617', // slate-950
    windowBg: '#0f172a', // slate-900
  },
  retro: {
    accentColor: '#f59e0b', // amber-500
    bgColor: '#170f05',
    windowBg: '#291b07',
  },
  vaporwave: {
    accentColor: '#d946ef', // fuchsia-500
    bgColor: '#1a0b1e',
    windowBg: '#2f1538',
  }
};

export default function App() {
  const [windows, setWindows] = useState<AppWindow[]>([
    {
      id: 'store',
      title: 'TANK5_VAULT_STORE',
      type: 'store',
      isOpen: true,
      isMinimized: false,
      isMaximized: true,
      zIndex: 10,
    }
  ]);
  
  const [activeId, setActiveId] = useState<string>('store');
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('windows11');
  const [currentBg, setCurrentBg] = useState<BackgroundName>('wallpaper');
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const themeConfig = themes[currentTheme];

  const bringToFront = (id: string) => {
    setActiveId(id);
    setStartMenuOpen(false);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 10);
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const openApp = (type: 'terminal' | 'store' | 'settings' | 'browser', title: string) => {
    const existing = windows.find(w => w.id === type);
    if (!existing) {
      setWindows(prev => [...prev, {
        id: type,
        title,
        type,
        isOpen: true,
        isMinimized: false,
        isMaximized: type === 'store' || type === 'browser',
        zIndex: 10
      }]);
      bringToFront(type);
    } else {
      setWindows(prev => prev.map(w => 
        w.id === type ? { ...w, isMinimized: false } : w
      ));
      bringToFront(type);
    }
    setStartMenuOpen(false);
  };

  const toggleStart = () => setStartMenuOpen(!startMenuOpen);

  const handleWindowClick = (id: string) => {
    setStartMenuOpen(false);
    const win = windows.find(w => w.id === id);
    if (!win) return;
    if (win.isMinimized) {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      bringToFront(id);
    } else if (activeId === id) {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    } else {
      bringToFront(id);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };
  
  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const launchGame = (game: Game) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === game.id);
      if (existing) {
        return prev.map(w => w.id === game.id ? { ...w, isMinimized: false } : w);
      }
      return [...prev, {
        id: game.id,
        title: game.title,
        type: 'game',
        url: game.url,
        isOpen: true,
        isMinimized: false,
        isMaximized: true,
        zIndex: 10
      }];
    });
    bringToFront(game.id);
  };

  return (
    <div 
       className="w-full h-screen overflow-hidden flex flex-col relative font-sans select-none"
       style={{ backgroundColor: themeConfig.bgColor, color: themeConfig.accentColor }}
       onClick={() => setStartMenuOpen(false)}
    >
      <BackgroundRenderer bg={currentBg} theme={themeConfig} />
      
      {/* Brand Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none mix-blend-screen overflow-hidden z-0">
        <h1 className="text-[20vw] font-black tracking-tighter" style={{ color: themeConfig.accentColor, textShadow: `0 0 100px ${themeConfig.accentColor}80` }}>TANK5</h1>
      </div>

      <div className="flex-1 relative overflow-hidden p-8 flex items-center justify-center z-10">
        {windows.map(win => {
          if (!win.isOpen || win.isMinimized) return null;
          return (
            <div key={win.id} style={{ zIndex: win.zIndex }} className={win.isMaximized ? 'absolute inset-0 pb-12' : 'absolute'}>
              <Window
                id={win.id}
                title={win.title}
                isActive={activeId === win.id}
                isMaximized={win.isMaximized}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                onClick={() => bringToFront(win.id)}
                theme={themeConfig}
              >
                {win.type === 'terminal' && <Terminal onLaunchGame={launchGame} theme={themeConfig} />}
                {win.type === 'game' && <GameFrame url={win.url!} title={win.title} theme={themeConfig} />}
                {win.type === 'store' && <Store onLaunchGame={launchGame} theme={themeConfig} />}
                {win.type === 'browser' && <Browser theme={themeConfig} />}
                {win.type === 'settings' && (
                  <Settings 
                    currentTheme={currentTheme} 
                    currentBg={currentBg} 
                    onChangeTheme={setCurrentTheme} 
                    onChangeBg={setCurrentBg} 
                  />
                )}
              </Window>
            </div>
          );
        })}
      </div>

      {startMenuOpen && (
        <div 
           className="absolute left-4 bottom-14 w-64 bg-black/90 backdrop-blur-xl border rounded-lg shadow-2xl p-2 z-[10000] flex flex-col gap-1 overflow-hidden" 
           style={{ borderColor: themeConfig.accentColor }}
           onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-4 mb-2 border-b flex items-center gap-3" style={{ borderColor: `${themeConfig.accentColor}30` }}>
            <div className="w-10 h-10 rounded bg-[#111] flex items-center justify-center border" style={{ borderColor: `${themeConfig.accentColor}50` }}>
               <Box size={20} style={{ color: themeConfig.accentColor }} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Tank5 OS</h4>
              <p className="text-xs opacity-70" style={{ color: themeConfig.accentColor }}>Administrator</p>
            </div>
          </div>
          <StartMenuItem icon="Box" label="Vault Store" onClick={() => openApp('store', 'TANK5_VAULT_STORE')} />
          <StartMenuItem icon="Globe" label="Web Proxy" onClick={() => openApp('browser', 'INTERNET_BROWSER')} />
          <StartMenuItem icon="Terminal" label="Terminal" onClick={() => openApp('terminal', 'COMMAND_PROMPT')} />
          <StartMenuItem icon="Settings" label="Settings" onClick={() => openApp('settings', 'SYSTEM_SETTINGS')} />
        </div>
      )}

      <Taskbar 
        windows={windows.map(w => ({ ...w, isActive: activeId === w.id }))} 
        onToggleStart={(e: any) => { e.stopPropagation(); toggleStart(); }} 
        onWindowClick={handleWindowClick} 
        theme={themeConfig}
      />
    </div>
  );
}

function StartMenuItem({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full text-left px-4 py-3 rounded hover:bg-white/10 text-white font-medium flex items-center gap-3 transition-colors">
      <span className="opacity-70">{label}</span>
    </button>
  );
}
