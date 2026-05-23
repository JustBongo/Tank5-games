import React, { useState } from 'react';
import { Search, RotateCw, Home, Globe } from 'lucide-react';

export function Browser({ theme }: { theme: any }) {
  const defaultUrl = 'http://134.119.221.137'; // the proxy requested
  const [url, setUrl] = useState(defaultUrl);
  const [inputUrl, setInputUrl] = useState(defaultUrl);
  const [key, setKey] = useState(0); // for reloading iframe

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      finalUrl = 'http://' + inputUrl;
    }
    setUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] overflow-hidden font-sans">
      {/* Browser Toolbar UI */}
      <div className="flex items-center gap-2 p-2 bg-[#e8eaed] border-b border-gray-300">
        <button 
          onClick={() => setKey(k => k + 1)} 
          className="p-1.5 hover:bg-gray-300 rounded-full text-gray-700 transition-colors"
          title="Reload"
        >
          <RotateCw size={18} />
        </button>
        <button 
          onClick={() => { setUrl(defaultUrl); setInputUrl(defaultUrl); }} 
          className="p-1.5 hover:bg-gray-300 rounded-full text-gray-700 transition-colors"
          title="Home Proxy"
        >
          <Home size={18} />
        </button>
        <form onSubmit={go} className="flex-1 flex items-center bg-white rounded-full px-4 py-1.5 border border-transparent shadow-sm focus-within:border-blue-500 focus-within:shadow-md transition-all">
          <Globe size={16} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Type URL to browse via proxy..."
          />
        </form>
      </div>
      
      {/* Webview Content */}
      <div className="flex-1 bg-white relative">
        <iframe 
          key={key}
          src={url} 
          className="absolute inset-0 w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
          title="Web Proxy"
        />
      </div>
    </div>
  );
}
