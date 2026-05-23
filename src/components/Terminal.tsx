import React, { useState } from 'react';
import { games } from '../data/games';
import { Game } from '../types';
import { Terminal as TerminalIcon, Search } from 'lucide-react';

export function Terminal({ onLaunchGame, theme }: { onLaunchGame: (game: Game) => void, theme: any }) {
  const [query, setQuery] = useState('');
  
  const filtered = games.filter(g => g.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="h-full w-full p-6 font-mono flex flex-col gap-4 overflow-y-auto" style={{ color: theme.accentColor, backgroundColor: theme.windowBg }}>
      <div className="flex flex-col gap-1 items-start">
        <h2 className="text-xl font-bold mb-2">TANK5 OS [Version 5.0.2]</h2>
        <p className="opacity-70">(c) Tank5 Corporation. All rights reserved.</p>
        <p className="mt-6 mb-2 opacity-90">Please input search query to locate game executables:</p>
      </div>
      
      <div className="flex items-center gap-3 p-3 flex-shrink-0 border border-transparent transition-colors"
           style={{ backgroundColor: `${theme.accentColor}10`, borderBottom: `1px solid ${theme.accentColor}30` }}>
        <span className="font-bold opacity-80">C:\GAMES&gt;</span>
        <input 
          autoFocus
          className="flex-1 bg-transparent border-none outline-none placeholder-opacity-50"
          style={{ color: theme.accentColor }}
          value={query}
          onChange={e => setQuery(e.target.value)}
          spellCheck={false}
          placeholder="Type to search..."
        />
        <Search className="opacity-80" size={18} />
      </div>

      <div className="grid grid-cols-1 gap-2 mt-4">
        {filtered.map(game => (
          <button
            key={game.id}
            onClick={() => onLaunchGame(game)}
            className="flex items-center gap-4 p-3 border text-left transition-all group"
            style={{ borderColor: `${theme.accentColor}20` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.accentColor}20`;
              e.currentTarget.style.borderColor = theme.accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = `${theme.accentColor}20`;
            }}
          >
           <TerminalIcon size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
           <div>
             <div className="font-bold opacity-90 group-hover:opacity-100">{game.title}</div>
             <div className="text-xs opacity-60 mt-1 uppercase">./start {game.id}.exe</div>
           </div>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-8 opacity-80 animate-pulse">
          &gt; No executables found matching query '{query}'
        </div>
      )}
    </div>
  );
}

