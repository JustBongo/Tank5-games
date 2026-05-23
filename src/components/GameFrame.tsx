import React, { useState } from 'react';

export function GameFrame({ url, title, theme }: { url: string; title: string, theme: any }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: theme.bgColor }}>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono gap-4" style={{ color: theme.accentColor }}>
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: theme.accentColor, borderTopColor: 'transparent' }} />
          <p className="animate-pulse">MOUNTING {title.toUpperCase()}...</p>
        </div>
      )}
      <iframe 
        src={url} 
        title={title}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full border-none transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        allow="fullscreen; autoplay; encrypted-media; gyroscope; accelerometer; clipboard-write; clipboard-read"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock shrink-to-fit"
      />
    </div>
  );
}
