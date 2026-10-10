import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Heart } from 'lucide-react';

const PageCover = forwardRef((props, ref) => {
  return (
    <div className="page page-cover bg-stone-900 border-r border-stone-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative overflow-hidden" ref={ref} data-density="hard">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-overlay"></div>
      <div className="h-full w-full flex flex-col items-center justify-center p-8 relative z-10 border-8 border-stone-800 m-2 rounded-sm" style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }}>
        {props.children}
      </div>
    </div>
  );
});

const Page = forwardRef((props, ref) => {
  return (
    <div className="page bg-[#fdfaf5] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] border-r border-stone-300 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent"></div>
      <div className="h-full w-full p-6 flex flex-col justify-center gap-6">
        {props.children}
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-cormorant text-stone-400">{props.number}</div>
    </div>
  );
});

const Scrapbook = ({ images = [] }) => {
  // Chunk images into arrays of 2 for each page
  const pages = [];
  for (let i = 0; i < images.length; i += 2) {
    pages.push(images.slice(i, i + 2));
  }

  // Ensure even number of pages for flipbook (excluding covers)
  if (pages.length % 2 !== 0) {
    pages.push([]);
  }

  return (
    <section className="py-24 bg-stone-950 relative overflow-hidden fade show flex flex-col items-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
        <span className="font-alex text-amber-500 text-3xl md:text-4xl block mb-2 font-semibold tracking-wider">
          Interactive Memories
        </span>
        <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-white tracking-widest uppercase mb-4">
          The Scrapbook
        </h2>
        <p className="text-stone-400 font-light text-sm tracking-widest uppercase">Click and drag pages to flip</p>
      </div>

      <div className="relative z-10 max-w-5xl w-full flex justify-center px-4">
        <HTMLFlipBook 
          width={450} 
          height={600} 
          size="stretch"
          minWidth={315}
          maxWidth={500}
          minHeight={400}
          maxHeight={650}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-2xl drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] mx-auto"
        >
          {/* Cover */}
          <PageCover>
            <h1 className="font-alex text-6xl md:text-8xl mb-6 text-amber-500 drop-shadow-md text-center">O & E</h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6"></div>
            <p className="font-cormorant text-2xl md:text-3xl uppercase tracking-[0.3em] text-amber-400/80 text-center">Our Story</p>
            <p className="font-cormorant text-sm uppercase tracking-[0.2em] text-amber-600/60 mt-auto">Volume I</p>
          </PageCover>

          {/* Dynamic Pages with Images */}
          {pages.map((pageImages, idx) => (
            <Page key={idx} number={idx + 1}>
              {pageImages.map((img, imgIdx) => {
                const rotation = (idx + imgIdx) % 2 === 0 ? 'rotate-[3deg]' : 'rotate-[-3deg]';
                const hasTape = imgIdx === 0;
                
                return (
                  <div key={imgIdx} className={`p-2 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] mx-auto relative flex justify-center group ${rotation}`}>
                    {hasTape && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#e3dac9] opacity-70 shadow-sm rotate-[12deg] z-20"></div>}
                    <img src={img.src} alt={img.alt || "Memory"} className="max-w-[100%] h-auto max-h-[220px] object-contain shadow-sm" loading="lazy" />
                  </div>
                );
              })}
              {pageImages.length === 0 && (
                 <div className="h-full flex items-center justify-center opacity-30">
                    <Heart className="w-12 h-12 text-stone-400" />
                 </div>
              )}
            </Page>
          ))}

          {/* Back Cover */}
          <PageCover>
            <div className="h-full flex flex-col justify-center items-center">
              <Heart className="text-amber-600/40 w-16 h-16 mb-4" />
              <p className="font-cormorant text-stone-500 uppercase tracking-[0.3em] text-sm">To be continued...</p>
            </div>
          </PageCover>
        </HTMLFlipBook>
      </div>
    </section>
  );
};

export default Scrapbook;
