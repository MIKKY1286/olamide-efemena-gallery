import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrambleText from './ScrambleText';

export default function AutoExplore({ images, onClose }) {
  const [cards, setCards] = useState(images);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto shuffle effect
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        const topCard = next.shift();
        next.push(topCard);
        return next;
      });
    }, 4000); // Slower interval so users have time to see the image
    
    return () => clearInterval(timer);
  }, [autoPlay]);

  // Handle swipe gestures to manually shuffle
  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      // Swipe left or right shuffles the card to the back
      setCards((prev) => {
        const next = [...prev];
        const topCard = next.shift();
        next.push(topCard);
        return next;
      });
      
      // Pause autoplay briefly when user interacts
      setAutoPlay(false);
      setTimeout(() => setAutoPlay(true), 6000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center overflow-hidden fade show bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 to-stone-950">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-amber-500 hover:text-white transition duration-300 bg-stone-900/50 hover:bg-stone-800 p-3 rounded-full backdrop-blur-sm border border-stone-700 hover:border-amber-500 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      {/* Header */}
      <div className="absolute top-12 left-0 w-full z-10 text-center pointer-events-none">
        <span className="font-alex text-amber-500 text-3xl block mb-2 font-semibold tracking-wider">
          The Collection
        </span>
        <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-white tracking-widest uppercase drop-shadow-xl">
          <ScrambleText text="Card Shuffle" />
        </h2>
        <p className="text-stone-300 text-xs md:text-sm uppercase tracking-[0.4em] drop-shadow-md font-light mt-4 animate-pulse">
          Swipe to explore
        </p>
      </div>

      {/* Card Deck Area */}
      <div className="relative w-[85vw] max-w-md aspect-[3/4] mt-16 perspective-1000">
        <AnimatePresence mode="popLayout">
          {cards.map((img, index) => {
            // Only render top 5 cards for a clean stack and good performance
            if (index > 4) return null;
            
            const isTop = index === 0;
            
            return (
              <motion.div
                key={img.src}
                layout
                initial={{ 
                  scale: 0.6, 
                  y: 100,
                  opacity: 0
                }}
                animate={{
                  scale: 1 - index * 0.05,
                  y: index * 25,
                  opacity: 1 - index * 0.15,
                  zIndex: 10 - index
                }}
                exit={{
                  x: -400,
                  y: 50,
                  rotate: -25,
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 1.0, ease: [0.32, 0.72, 0, 1] } // Much slower, elegant swoop away
                }}
                transition={{
                  type: 'spring',
                  stiffness: 90, // Lower stiffness = slower layout movement
                  damping: 20,
                  mass: 1.2
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={isTop ? handleDragEnd : undefined}
                whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                className={`absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[8px] border-white bg-white ${isTop ? 'cursor-grab' : 'pointer-events-none'}`}
                style={{
                  transformOrigin: 'top center'
                }}
              >
                <div className="w-full h-full relative bg-stone-100">
                  <img 
                    src={img.src} 
                    alt="Gallery card" 
                    className="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                  />
                  {/* Subtle inner shadow/glare for realism */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
