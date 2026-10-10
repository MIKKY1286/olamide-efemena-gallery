import { useState } from "react";
import { Music, X } from "lucide-react";

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Collapsed State (Button) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-4 py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:bg-white/10 hover:border-amber-500/30 hover:scale-105 transition duration-300 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all">
            <Music size={14} className="text-white animate-pulse" />
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-xs font-semibold text-white tracking-widest uppercase mb-0.5">Soundtrack</span>
            <span className="text-[9px] text-stone-400 font-light tracking-[0.2em] uppercase">Play our playlist</span>
          </div>
        </button>
      )}

      {/* Expanded State (Spotify Widget) */}
      {isOpen && (
        <div className="bg-stone-900 border border-white/10 p-2 rounded-2xl shadow-2xl relative w-[280px] sm:w-[350px] transition-all duration-300 ease-out origin-bottom-left scale-100 opacity-100">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute -top-3 -right-3 w-7 h-7 bg-stone-800 border border-stone-600 rounded-full flex items-center justify-center text-stone-300 hover:text-amber-500 hover:border-amber-500 hover:bg-stone-900 shadow-md transition duration-200 z-10"
            title="Close Player"
          >
            <X size={14} />
          </button>
          
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/48BFG9XDaqexjK3w6jT0LH?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
