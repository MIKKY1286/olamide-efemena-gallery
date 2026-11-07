import { useMemo, useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import ScrambleText from './ScrambleText';

const breakpointColumns = {
  default: 4,
  1536: 5,
  1280: 4,
  1024: 3,
  768: 2,
  0: 1,
};

// Intelligent image reordering to balance column heights
const balanceImages = (images) => {
  if (images.length === 0) return images;

  const estimateAspectRatio = (index) => {
    const patterns = [1.4, 0.65, 1.0, 1.3, 0.7, 0.95, 1.35, 0.68, 1.05, 1.32, 0.72, 0.98];
    return patterns[index % patterns.length];
  };

  const columnHeights = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  const reordered = [];
  const remaining = [...images];

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestColumnIndex = 0;
    let lowestHeight = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const aspectRatio = estimateAspectRatio(images.indexOf(remaining[i]));
      const height = 200 / aspectRatio;

      for (let col = 0; col < 5; col++) {
        const potentialHeight = columnHeights[col] + height;
        if (potentialHeight < lowestHeight) {
          lowestHeight = potentialHeight;
          bestIndex = i;
          bestColumnIndex = col;
        }
      }
    }

    const selectedImage = remaining.splice(bestIndex, 1)[0];
    reordered.push(selectedImage);
    const aspectRatio = estimateAspectRatio(images.indexOf(selectedImage));
    const height = 200 / aspectRatio;
    columnHeights[bestColumnIndex] += height;
  }

  return reordered;
};

const INITIAL_BATCH = 12;
const BATCH_SIZE = 10;

const GalleryGrid = ({ images, onImageClick }) => {
  const balancedImages = useMemo(() => balanceImages(images), [images]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (visibleCount >= balancedImages.length) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(balancedImages.length, prev + BATCH_SIZE));
        }
      },
      { rootMargin: '500px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, balancedImages.length]);

  const visibleImages = useMemo(
    () => balancedImages.slice(0, visibleCount),
    [balancedImages, visibleCount]
  );

  return (
    <section className="py-16 sm:py-24 fade show bg-stone-950 relative border-t border-stone-800 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-alex text-amber-500 text-3xl md:text-4xl block mb-2 font-semibold tracking-wider">
            Captured Fragments
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-bold text-white tracking-widest uppercase">
            <ScrambleText text="The Archive" />
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 text-amber-500">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/50"></div>
            <div className="w-2 h-2 rotate-45 border border-amber-500"></div>
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/50"></div>
          </div>
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="gallery"
          columnClassName="gallery-column"
        >
          {visibleImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              onClick={() => onImageClick(img.src)}
              className="gallery-item group rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(245,158,11,0.15)] cursor-pointer"
            >
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition duration-500 z-10 pointer-events-none"></div>
              <img
                src={img.src}
                alt={img.alt || `Gallery Image ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto transform group-hover:scale-105 transition duration-700"
              />
            </div>
          ))}
        </Masonry>

        {visibleCount < balancedImages.length && (
          <div ref={sentinelRef} className="h-12 w-full" aria-hidden="true" />
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;
