import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const SectionDivider = ({ variant = 'heart' }) => {
  return (
    <div className="py-8 flex items-center justify-center gap-4 max-w-xl mx-auto px-4 fade">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 opacity-60"></div>
      <div className="text-amber-500/80 p-1.5 rounded-full bg-amber-500/5">
        {variant === 'heart' ? (
          <Heart size={16} fill="currentColor" />
        ) : (
          <Sparkles size={16} />
        )}
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 opacity-60"></div>
    </div>
  );
};

export default SectionDivider;
