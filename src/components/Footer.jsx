import React from 'react';
import { Heart } from 'lucide-react';
import ScrambleText from './ScrambleText';

const Footer = () => {
  return (
    <footer className="py-16 text-center bg-stone-900 text-stone-300 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <span className="font-alex text-amber-400 text-4xl block mb-2">
          <ScrambleText text="Thank You" />
        </span>

        <div className="flex items-center justify-center my-4 text-amber-500">
          <Heart size={18} fill="currentColor" />
        </div>

        <p className="font-cormorant text-xl md:text-2xl italic tracking-wide text-stone-200 mb-2">
          "Every picture tells a story. Thank you for celebrating ours."
        </p>

        <p className="text-xs uppercase tracking-widest font-semibold text-stone-500 mt-6">
          Olamide & Efemena • Made with love
        </p>
      </div>

      {/* Decorative Gold Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
    </footer>
  );
};

export default Footer;
