import React, { useState, useEffect } from 'react';
import { BackgroundName, ThemeName } from '../types';
import { Shield, ShieldAlert, ExternalLink } from 'lucide-react';

interface SettingsProps {
  currentTheme: ThemeName;
  currentBg: BackgroundName;
  onChangeTheme: (t: ThemeName) => void;
  onChangeBg: (b: BackgroundName) => void;
}

const antiCloseListener = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = 'Leave site? Changes you made may not be saved.';
};

export function Settings({ currentTheme, currentBg, onChangeTheme, onChangeBg }: SettingsProps) {
  const [antiClose, setAntiClose] = useState(() => localStorage.getItem('tank5_anti_close') === 'true');

  const toggleAntiClose = () => {
    const next = !antiClose;
    setAntiClose(next);
    localStorage.setItem('tank5_anti_close', String(next));
    if (next) {
      window.addEventListener('beforeunload', antiCloseListener);
    } else {
      window.removeEventListener('beforeunload', antiCloseListener);
    }
  };

  const handleLaunchCloak = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocker prevented cloaking. Please allow popups to launch About:Blank Cloak.');
      return;
    }
    
    const doc = win.document;
    doc.title = "Google Docs";
    
    // Add fake favicon
    const icon = doc.createElement('link');
    icon.rel = "icon";
    icon.href = "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
    doc.head.appendChild(icon);

    doc.body.style.margin = '0';
    doc.body.style.height = '100vh';
    doc.body.style.overflow = 'hidden';
    
    // Create iframe pointing to current app url
    const iframe = doc.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = window.location.href;
    
    doc.body.appendChild(iframe);
    
    // Redirect current original tab to a safe website
    window.location.replace('https://classroom.google.com');
  };

  return (
    <div className="p-8 h-full bg-black/80 backdrop-blur-md text-white font-sans overflow-y-auto">
      <h2 className="text-3xl font-black mb-8 border-b border-white/10 pb-4">Display Settings</h2>

      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-white/80">System Theme</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <ThemeCard 
            id="windows11" 
            name="Clean Modern" 
            color="#0078d4" 
            active={currentTheme === 'windows11'}
            onClick={() => onChangeTheme('windows11')} 
          />
          <ThemeCard 
            id="light" 
            name="Light Minimal" 
            color="#3b82f6" 
            active={currentTheme === 'light'}
            onClick={() => onChangeTheme('light')} 
          />
          <ThemeCard 
            id="hacker" 
            name="Hacker Green" 
            color="#10b981" 
            active={currentTheme === 'hacker'}
            onClick={() => onChangeTheme('hacker')} 
          />
          <ThemeCard 
            id="cyberpunk" 
            name="Cyberpunk Blue" 
            color="#0ea5e9" 
            active={currentTheme === 'cyberpunk'}
            onClick={() => onChangeTheme('cyberpunk')} 
          />
          <ThemeCard 
            id="retro" 
            name="Retro Amber" 
            color="#f59e0b" 
            active={currentTheme === 'retro'}
            onClick={() => onChangeTheme('retro')} 
          />
          <ThemeCard 
            id="vaporwave" 
            name="Vaporwave" 
            color="#d946ef" 
            active={currentTheme === 'vaporwave'}
            onClick={() => onChangeTheme('vaporwave')} 
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-white/80">Moving Background</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <BgCard 
            id="wallpaper" 
            name="Mountains Wallpaper" 
            active={currentBg === 'wallpaper'}
            onClick={() => onChangeBg('wallpaper')} 
          />
          <BgCard 
            id="gradient" 
            name="Smooth Gradient" 
            active={currentBg === 'gradient'}
            onClick={() => onChangeBg('gradient')} 
          />
          <BgCard 
            id="matrix" 
            name="Digital Rain" 
            active={currentBg === 'matrix'}
            onClick={() => onChangeBg('matrix')} 
          />
          <BgCard 
            id="grid" 
            name="Synthwave Grid" 
            active={currentBg === 'grid'}
            onClick={() => onChangeBg('grid')} 
          />
          <BgCard 
            id="particles" 
            name="Floating Dust" 
            active={currentBg === 'particles'}
            onClick={() => onChangeBg('particles')} 
          />
          <BgCard 
            id="none" 
            name="Solid Color" 
            active={currentBg === 'none'}
            onClick={() => onChangeBg('none')} 
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-black mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
          <ShieldAlert size={32} className="text-red-500" />
          Stealth & Defense
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={24} className={antiClose ? "text-green-500" : "text-white/50"} />
              <h3 className="text-xl font-bold">Anti-Close Prevention</h3>
            </div>
            <p className="text-white/50 text-sm mb-6">
              Blocks teachers and filters from silently closing the tab using standard "Close Tab" extensions. Note: Doesn't prevent manual closing.
            </p>
            <button
              onClick={toggleAntiClose}
              className={`mt-auto px-6 py-3 rounded-lg font-bold transition-all ${
                antiClose 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
              }`}
            >
              {antiClose ? 'Disable Anti-Close' : 'Enable Anti-Close'}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-start">
             <div className="flex items-center gap-3 mb-2">
              <ExternalLink size={24} className="text-blue-500" />
              <h3 className="text-xl font-bold">About:Blank Cloak</h3>
            </div>
            <p className="text-white/50 text-sm mb-6">
              Launches the OS in a hidden About:Blank tab to evade history tracking and URL blacklisting. The current tab will self-destruct into Google Classroom.
            </p>
            <button
              onClick={handleLaunchCloak}
              className="mt-auto px-6 py-3 rounded-lg font-bold bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 transition-all"
            >
              Deploy Cloak Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeCard({ id, name, color, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left flex flex-col gap-3 transition-all
        ${active ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30 bg-transparent'}
      `}
    >
      <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: color }} />
      <span className="font-bold">{name}</span>
    </button>
  );
}

function BgCard({ id, name, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-xl border-2 text-center font-bold transition-all
        ${active ? 'border-white bg-white/10 text-white' : 'border-white/10 hover:border-white/30 bg-transparent text-white/60'}
      `}
    >
      {name}
    </button>
  );
}
