import React from 'react';

const HeroSection = ({ subtitle, slideshow, onToggleSlideshow, onOpenAutoExplore }) => {
  return (
    <section className="hero min-h-[75vh] flex flex-col items-center justify-center text-white text-center px-4 relative overflow-hidden bg-stone-950">
      {/* Background Image with Ken Burns Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/img-5.webp" 
          alt="Hero Background" 
          className="w-full h-full object-cover object-[50%_35%] animate-ken-burns opacity-60 mix-blend-overlay"
        />
      </div>

      {/* Background cinematic overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-stone-950/80 to-stone-950 z-0 pointer-events-none"></div>

      {/* Subtle Moving Background Light Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-amber-700/15 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="fade show z-10 max-w-4xl mt-12 pointer-events-none relative">
        <span className="font-alex text-amber-500 text-4xl md:text-5xl block mb-4 animate-fade-in-down drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          The Adventure Begins
        </span>
        <h1 className="text-6xl md:text-8xl font-cormorant font-bold mb-6 tracking-widest animate-fade-in-up drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          OUR STORY
        </h1>
        <p
          id="gallerySubtitle"
          className="font-light tracking-[0.2em] text-sm md:text-lg text-stone-300 opacity-90 animate-fade-in-up uppercase"
        >
          {subtitle}
        </p>

        <div className="mt-12 flex gap-6 justify-center animate-fade-in-up pointer-events-auto">
          {/* <a
            href="../index.html"
            className="group relative px-8 py-3 rounded-full font-semibold uppercase tracking-widest text-xs border border-stone-600 hover:border-amber-500 text-stone-300 hover:text-amber-400 transition duration-500 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition duration-500"></div>
            <span className="relative z-10">Home</span>
          </a> */}
          <button
            onClick={onOpenAutoExplore}
            id="slideshowBtn"
            className="btn-primary px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            Auto Explore
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
