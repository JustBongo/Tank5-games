import { Game } from '../types';
import { games } from '../data/games';
import { Terminal, Gamepad2, Play, Search, Box } from 'lucide-react';
import { useState } from 'react';

export function Store({ theme, onLaunchGame }: { theme: any, onLaunchGame: (game: Game) => void }) {
  const [query, setQuery] = useState('');
  
  const filtered = games.filter(g => g.title.toLowerCase().includes(query.toLowerCase()));

  // Theme-driven styling
  const accentColor = theme.accentColor || '#10b981'; // default green

  return (
    <div className="flex flex-col h-full w-full bg-[#12141d] text-slate-300 font-sans">
      {/* Top Navbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-[#161925] border-b border-black/50 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
            <Box size={24} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">
            Vault<span style={{ color: accentColor }}>.Store</span>
          </h1>
        </div>

        <div className="relative group max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-white transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search games..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#1e2330] border border-[#2a2f42] text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-white transition-colors placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Featured Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(game => (
            <div key={game.id} className="flex flex-col bg-[#161925] rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#2a2f42] group">
              {/* Fake Cover Art */}
              <div 
                className="h-40 w-full flex items-center justify-center relative overflow-hidden"
                style={{
                   background: `linear-gradient(135deg, ${accentColor}20, #000 80%)`,
                   borderBottom: `2px solid ${accentColor}`
                }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>
                
                <Gamepad2 size={64} className="opacity-50 text-white transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161925] to-transparent opacity-80" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white leading-tight">{game.title}</h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-[#1e2330] text-slate-400 uppercase tracking-wider">{game.category || 'Game'}</span>
                </div>
                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                  {game.description || `Play ${game.title} directly in your browser without any blocks. Secure and optimized.`}
                </p>
                
                <button 
                  onClick={() => onLaunchGame(game)}
                  className="w-full py-3 px-4 rounded font-bold text-white flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: accentColor, boxShadow: `0 4px 15px ${accentColor}40` }}
                >
                  <Play size={18} fill="currentColor" />
                  PLAY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <h3 className="text-xl">No titles found for "{query}"</h3>
            <p className="mt-2">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
