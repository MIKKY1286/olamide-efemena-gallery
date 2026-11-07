import React, { forwardRef, useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Heart } from 'lucide-react';

const PageCover = forwardRef((props, ref) => {
  return (
    <div
      className="page page-cover bg-stone-900 border-r border-stone-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative overflow-hidden"
      ref={ref}
      data-density="hard"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] opacity-50 pointer-events-none"></div>
      <div
        className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 relative z-10 border-4 sm:border-8 border-stone-800 m-2 rounded-sm"
        style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }}
      >
        {props.children}
      </div>
    </div>
  );
});

const Page = forwardRef((props, ref) => {
  return (
    <div
      className="page bg-[#fdfaf5] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] border-r border-stone-300 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent"></div>
      <div className="h-full w-full p-4 sm:p-6 flex flex-col justify-center gap-4 sm:gap-6">
        {props.children}
      </div>
      <div className="absolute bottom-3 right-4 text-xs font-cormorant text-stone-400">
        {props.number}
      </div>
    </div>
  );
});

const Scrapbook = ({ images = [] }) => {
  const sectionRef = useRef(null);
  const [shouldMountBook, setShouldMountBook] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMountBook(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-stone-950 relative overflow-hidden fade show flex flex-col items-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center mb-10 sm:mb-16 px-4 relative z-10">
        <span className="font-alex text-amber-500 text-3xl md:text-4xl block mb-2 font-semibold tracking-wider">
          Interactive Memories
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-bold text-white tracking-widest uppercase mb-4">
          The Scrapbook
        </h2>
        <p className="text-stone-400 font-light text-xs sm:text-sm tracking-widest uppercase">
          Click and drag pages to flip
        </p>
      </div>

      <div className="relative z-10 max-w-5xl w-full flex justify-center px-3 sm:px-4 overflow-hidden">
        {shouldMountBook ? (
          <HTMLFlipBook
            width={450}
            height={600}
            size="stretch"
            minWidth={260}
            maxWidth={500}
            minHeight={360}
            maxHeight={650}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e) => setCurrentPage(e.data)}
            className="shadow-2xl drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] mx-auto"
          >
            {/* Cover */}
            <PageCover>
              <h1 className="font-alex text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6 text-amber-500 drop-shadow-md text-center">
                O &amp; E
              </h1>
              <div className="h-[2px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-4 sm:mb-6"></div>
              <p className="font-cormorant text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-400/80 text-center">
                Our Story
              </p>
              <p className="font-cormorant text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-600/60 mt-auto">
                Volume I
              </p>
            </PageCover>

            {/* Dynamic Pages with Images */}
            {pages.map((pageImages, idx) => {
              // Page index in flipbook is idx + 1 (since cover is 0).
              // Load images for pages near the current spread so we don't fetch all 32 images at once.
              const isNearCurrentPage = Math.abs(idx + 1 - currentPage) <= 4;

              return (
                <Page key={idx} number={idx + 1}>
                  {pageImages.map((img, imgIdx) => {
                    const rotation =
                      (idx + imgIdx) % 2 === 0 ? 'rotate-[2deg]' : 'rotate-[-2deg]';
                    const hasTape = imgIdx === 0;

                    return (
                      <div
                        key={imgIdx}
                        className={`p-2 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] mx-auto relative flex justify-center group ${rotation}`}
                      >
                        {hasTape && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#e3dac9] opacity-70 shadow-sm rotate-[12deg] z-20"></div>
                        )}
                        {isNearCurrentPage ? (
                          <img
                            src={img.src}
                            alt={img.alt || 'Memory'}
                            className="max-w-full h-auto max-h-[170px] sm:max-h-[210px] object-contain shadow-sm"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-[180px] h-[140px] sm:h-[180px] bg-stone-100" />
                        )}
                      </div>
                    );
                  })}
                  {pageImages.length === 0 && (
                    <div className="h-full flex items-center justify-center opacity-30">
                      <Heart className="w-12 h-12 text-stone-400" />
                    </div>
                  )}
                </Page>
              );
            })}

            {/* Back Cover */}
            <PageCover>
              <div className="h-full flex flex-col justify-center items-center">
                <Heart className="text-amber-600/40 w-16 h-16 mb-4" />
                <p className="font-cormorant text-stone-500 uppercase tracking-[0.3em] text-sm text-center">
                  To be continued...
                </p>
              </div>
            </PageCover>
          </HTMLFlipBook>
        ) : (
          <div className="w-full max-w-[450px] h-[420px] sm:h-[550px] rounded-lg bg-stone-900/60 border border-stone-800 flex items-center justify-center">
            <span className="font-cormorant text-amber-500/70 tracking-widest uppercase text-sm">
              Loading Scrapbook...
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Scrapbook;
