import { useState, useEffect } from "react";
import ScrollProgressBar from "./components/ScrollProgressBar";
import FloatingAccents from "./components/FloatingAccents";
import HeroSection from "./components/HeroSection";
import AnimatedStats from "./components/AnimatedStats";
import JourneyTimeline from "./components/JourneyTimeline";
import SectionDivider from "./components/SectionDivider";
// import SocialFeed from "./components/SocialFeed";
import GalleryGrid from "./components/GalleryGrid";
import Lightbox from "./components/Lightbox";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Scrapbook from "./components/Scrapbook";
import AutoExplore from "./components/AutoExplore";
import AisleWalk from "./components/AisleWalk";
import CustomCursor from "./components/CustomCursor";
import { useScrollReveal } from "./hooks/useScrollReveal";

const config = {
  weddingDate: "November 15, 2025",
  instagramHandle: "olamide_efemena",
  lightwidgetId: "",
  socialPhotos: [
    { src: "/images/img-7.webp", likes: 84, comments: 6 },
    { src: "/images/img-8.webp", likes: 112, comments: 14 },
    { src: "/images/img-9.webp", likes: 95, comments: 8 },
    { src: "/images/img-10.webp", likes: 130, comments: 11 },
    { src: "/images/img-11.webp", likes: 78, comments: 5 },
    { src: "/images/img-12.webp", likes: 105, comments: 9 },
  ],
};

const galleryImages = [

  { src: "/images/img-5.webp", alt: "Gallery Image 5" },
  { src: "/images/img-6.webp", alt: "Gallery Image 6" },
  { src: "/images/img-7.webp", alt: "Gallery Image 7" },
  { src: "/images/img-8.webp", alt: "Gallery Image 8" },
  { src: "/images/img-9.webp", alt: "Gallery Image 9" },
  { src: "/images/img-10.webp", alt: "Gallery Image 10" },
  { src: "/images/img-11.webp", alt: "Gallery Image 11" },
  { src: "/images/img-12.webp", alt: "Gallery Image 12" },
  { src: "/images/img-13.webp", alt: "Gallery Image 13" },
  { src: "/images/img-14.webp", alt: "Gallery Image 14" },
  { src: "/images/img-15.webp", alt: "Gallery Image 15" },
  { src: "/images/img-16.webp", alt: "Gallery Image 16" },
  { src: "/images/img-17.webp", alt: "Gallery Image 17" },
  { src: "/images/img-18.webp", alt: "Gallery Image 18" },
  { src: "/images/img-30.jpg", alt: "Gallery Image 30" },
  { src: "/images/img-19.webp", alt: "Gallery Image 19" },
  { src: "/images/img-20.jpg", alt: "Gallery Image 20" },
  { src: "/images/img-21.jpg", alt: "Gallery Image 21" },
  { src: "/images/img-22.jpg", alt: "Gallery Image 22" },
  { src: "/images/img-23.jpg", alt: "Gallery Image 23" },
  { src: "/images/img-24.jpg", alt: "Gallery Image 24" },
  { src: "/images/img-31.jpg", alt: "Gallery Image 31" },
  { src: "/images/img-25.jpg", alt: "Gallery Image 25" },
  { src: "/images/img-26.jpg", alt: "Gallery Image 26" },
  { src: "/images/img-27.jpg", alt: "Gallery Image 27" },
  { src: "/images/img-28.jpg", alt: "Gallery Image 28" },
  { src: "/images/img-29.jpg", alt: "Gallery Image 29" },
  { src: "/images/img-1.webp", alt: "Gallery Image 1" },
  { src: "/images/img-2.webp", alt: "Gallery Image 2" },
  { src: "/images/img-3.webp", alt: "Gallery Image 3" },
  { src: "/images/img-4.webp", alt: "Gallery Image 4" },
  { src: "/images/img-32.jpg", alt: "Gallery Image 32" },
];

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function calculateSubtitle() {
  const start = new Date(config.weddingDate);
  const now = new Date();

  let diffYears = now.getFullYear() - start.getFullYear();
  let anniversaryThisYear = new Date(
    now.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );

  let nextAnniversaryNum;
  if (now < anniversaryThisYear) {
    nextAnniversaryNum = diffYears;
  } else {
    nextAnniversaryNum = diffYears + 1;
  }

  return `Moments Celebrating Our ${getOrdinal(nextAnniversaryNum)} Year & Beyond`;
}

function App() {
  const [subtitle] = useState(calculateSubtitle);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeImageSrc, setActiveImageSrc] = useState("");
  const [slideshow, setSlideshow] = useState(false);
  const [isAutoExploreOpen, setIsAutoExploreOpen] = useState(false);

  // Initialize IntersectionObserver scroll reveal
  useScrollReveal(".fade");

  // Sync body scroll with lightbox open status
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [lightboxOpen]);

  // Slideshow interval timer
  useEffect(() => {
    let slideInterval;
    if (slideshow) {
      slideInterval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const nextIndex = (prev + 1) % galleryImages.length;
          setActiveImageSrc(galleryImages[nextIndex].src);
          return nextIndex;
        });
      }, 3000);
    } else {
      clearInterval(slideInterval);
    }
    return () => clearInterval(slideInterval);
  }, [slideshow]);

  const handleOpenLightbox = (indexOrSrc) => {
    if (typeof indexOrSrc === "number") {
      setCurrentImageIndex(indexOrSrc);
      setActiveImageSrc(galleryImages[indexOrSrc].src);
    } else {
      const foundIdx = galleryImages.findIndex((img) => img.src === indexOrSrc);
      if (foundIdx !== -1) {
        setCurrentImageIndex(foundIdx);
      }
      setActiveImageSrc(indexOrSrc);
    }
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    if (slideshow) {
      setSlideshow(false);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIdx);
    setActiveImageSrc(galleryImages[nextIdx].src);
  };

  const handlePrev = () => {
    const prevIdx =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(prevIdx);
    setActiveImageSrc(galleryImages[prevIdx].src);
  };

  const handleToggleSlideshow = () => {
    const nextState = !slideshow;
    setSlideshow(nextState);
    if (nextState) {
      if (!lightboxOpen) {
        handleOpenLightbox(currentImageIndex);
      }
    }
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      <FloatingAccents />

      <HeroSection
        subtitle={subtitle}
        slideshow={slideshow}
        onToggleSlideshow={handleToggleSlideshow}
        onOpenAutoExplore={() => setIsAutoExploreOpen(true)}
      />

      <AnimatedStats />

      <SectionDivider variant="sparkles" />

      <AisleWalk images={galleryImages} />
      
      <SectionDivider variant="heart" />

      <Scrapbook images={galleryImages} />

      {/* <SectionDivider variant="heart" />

      <SocialFeed
        config={config}
        onOpenLightbox={(src) => handleOpenLightbox(src)}
      /> */}

      <SectionDivider variant="sparkles" />

      <GalleryGrid
        images={galleryImages}
        onImageClick={(idx) => handleOpenLightbox(idx)}
      />

      <Footer />

      <Lightbox
        isOpen={lightboxOpen}
        currentSrc={activeImageSrc}
        onClose={handleCloseLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <MusicPlayer />

      <BackToTop />

      {isAutoExploreOpen && (
        <AutoExplore
          images={galleryImages}
          onClose={() => setIsAutoExploreOpen(false)}
        />
      )}
    </>
  );
}

export default App;
