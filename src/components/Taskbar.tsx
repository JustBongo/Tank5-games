import React, { useState, useEffect } from 'react';
import { AppWindow } from '../types';
import { Terminal as TerminalIcon, Gamepad2, Menu, Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, Cpu, Box, Settings as SettingsIcon, Globe } from 'lucide-react';

interface TaskbarProps {
  windows: (AppWindow & { isActive: boolean })[];
  onToggleStart: (e?: any) => void;
  onWindowClick: (id: string) => void;
  theme: any;
}

export function Taskbar({ windows, onToggleStart, onWindowClick, theme }: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState<{ level: number, charging: boolean } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Attempt to get battery status if supported
    let batteryInstance: any;
    
    const updateBattery = (b: any) => {
      setBattery({
        level: Math.round(b.level * 100),
        charging: b.charging
      });
    };

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        batteryInstance = b;
        updateBattery(b);
        b.addEventListener('levelchange', () => updateBattery(b));
        b.addEventListener('chargingchange', () => updateBattery(b));
      }).catch(() => {
        // Fallback simulated battery
        setBattery({ level: 85, charging: false });
      });
    } else {
      // Fallback
      setBattery({ level: 92, charging: false });
    }

    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener('levelchange', updateBattery);
        batteryInstance.removeEventListener('chargingchange', updateBattery);
      }
    };
  }, []);

  const renderBatteryIcon = () => {
    if (!battery) return <Battery size={16} />;
    if (battery.charging) return <BatteryCharging size={16} className="text-yellow-400" />;
    if (battery.level > 80) return <BatteryFull size={16} />;
    if (battery.level > 30) return <BatteryMedium size={16} />;
    return <BatteryLow size={16} className="text-red-500 animate-pulse" />;
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'terminal': return <TerminalIcon size={20} />;
      case 'browser': return <Globe size={20} />;
      case 'store': return <Box size={20} />;
      case 'settings': return <SettingsIcon size={20} />;
      default: return <Gamepad2 size={20} />;
    }
  };

  return (
    <div className="h-12 w-full bg-[#050505]/95 backdrop-blur-xl border-t flex items-center justify-center gap-2 px-4 relative z-[9999]"
         style={{ borderColor: `${theme.accentColor}30`, boxShadow: `0 -5px 20px ${theme.accentColor}10` }}>
      
      <button 
        onClick={onToggleStart}
        className="w-10 h-10 rounded transition-all flex items-center justify-center hover:bg-white/10"
        title="Start Menu"
        style={{ color: theme.accentColor }}
      >
        <Box size={24} className="fill-current opacity-20" />
        <Menu size={22} className="absolute" />
      </button>
      
      <div className="w-px h-6 mx-2" style={{ backgroundColor: `${theme.accentColor}40` }} />

      <div className="flex-1 flex justify-center gap-2 items-center">
        {windows.map(win => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`w-12 h-10 rounded-md flex items-center justify-center transition-all relative group
              ${win.isActive ? 'bg-white/10 border-b-2' : 'hover:bg-white/5 border-b-2 border-transparent'}`}
            style={{ 
              color: win.isActive ? theme.accentColor : '#64748b',
              borderBottomColor: win.isActive ? theme.accentColor : 'transparent'
            }}
            title={win.title}
          >
            {getIconForType(win.type)}
            {win.isOpen && !win.isMinimized && !win.isActive && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
            )}
          </button>
        ))}
      </div>

      <div className="absolute right-4 font-mono text-sm opacity-90 flex items-center gap-4" style={{ color: theme.accentColor }}>
         
         <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-md border border-white/5 cursor-default hover:bg-white/10 transition-colors">
            {battery && (
              <div className="flex items-center gap-1.5" title="Battery Status">
                {renderBatteryIcon()}
                <span className="text-xs font-bold">{battery.level}%</span>
              </div>
            )}
            <div className="w-px h-3 bg-white/20 mx-1" />
            <div className="flex flex-col items-end">
              <span className="leading-none font-bold tracking-tight">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-[10px] leading-tight opacity-70">{time.toLocaleDateString()}</span>
            </div>
         </div>

      </div>
    </div>
  );
}
