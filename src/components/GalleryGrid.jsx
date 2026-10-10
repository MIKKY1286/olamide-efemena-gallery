import { useMemo } from 'react';
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

  // Image aspect ratio estimation (wedding photography patterns)
  // Estimating based on typical patterns: portrait > 1.2, landscape < 0.8, square 0.9-1.1
  const estimateAspectRatio = (index) => {
    // Pattern to distribute tall, landscape, and square images evenly
    const patterns = [1.4, 0.65, 1.0, 1.3, 0.7, 0.95, 1.35, 0.68, 1.05, 1.32, 0.72, 0.98];
    return patterns[index % patterns.length];
  };

  // Score-based distribution: place images to minimize max column height
  const columnHeights = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  const reordered = [];
  const remaining = [...images];

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestColumnIndex = 0;
    let lowestHeight = Infinity;

    // Find the best image to place in the shortest column
    for (let i = 0; i < remaining.length; i++) {
      const aspectRatio = estimateAspectRatio(images.indexOf(remaining[i]));
      const height = 200 / aspectRatio; // Normalized height calculation

      // Find shortest column that would benefit from this image
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

const GalleryGrid = ({ images, onImageClick }) => {
  const balancedImages = useMemo(() => balanceImages(images), [images]);

  return (
    <section className="py-24 fade show bg-stone-950 relative border-t border-stone-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="font-alex text-amber-500 text-3xl md:text-4xl block mb-2 font-semibold tracking-wider">
            Captured Fragments
          </span>
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-white tracking-widest uppercase">
            <ScrambleText text="The Archive" />
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 text-amber-500">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500/50"></div>
            <div className="w-2 h-2 rotate-45 border border-amber-500"></div>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500/50"></div>
          </div>
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="gallery"
          columnClassName="gallery-column"
        >
          {balancedImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className="gallery-item group rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(245,158,11,0.15)] cursor-pointer"
            >
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition duration-500 z-10"></div>
              <img
                src={img.src}
                alt={img.alt || `Gallery Image ${index + 1}`}
                loading="lazy"
                className="w-full h-auto transform group-hover:scale-105 transition duration-700"
                onClick={() => onImageClick(index)}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default GalleryGrid;
