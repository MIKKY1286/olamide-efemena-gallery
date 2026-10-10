import { useRef } from "react";

const Lightbox = ({ isOpen, currentSrc, onClose, onNext, onPrev }) => {
  const startXRef = useRef(0);

  if (!isOpen) return null;

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startXRef.current - endX;
    if (diff > 60) {
      onNext();
    } else if (diff < -60) {
      onPrev();
    }
  };

  return (
    <div
      class="lightbox"
      id="lightbox"
      style={{ display: "flex" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        class="absolute top-6 right-6 text-white text-4xl font-light hover:text-amber-500 focus:outline-none transition duration-200"
      >
        &times;
      </button>
      <img id="lightboxImg" src={currentSrc} alt="Lightbox Image" />
      <div class="flex gap-8 mt-6">
        <button
          onClick={onPrev}
          class="px-6 py-2 rounded-full border border-white/30 text-white text-xs font-semibold uppercase hover:bg-white hover:text-stone-900 transition duration-300"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          class="px-6 py-2 rounded-full border border-white/30 text-white text-xs font-semibold uppercase hover:bg-white hover:text-stone-900 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
