import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const WalkImageCard = ({ img, index, total, scrollYProgress, mouseX, mouseY }) => {
  const slice = 1 / total;
  const start = index * slice * 0.8;
  const end = start + 0.25;
  const fadeOut = end + 0.05;

  const scale = useTransform(scrollYProgress, [start, end], [0.15, 2.6]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end, fadeOut], [0, 1, 1, 0]);

  const xOffset = index % 2 === 0 ? '14%' : '-14%';
  const yOffset = index % 3 === 0 ? '-12%' : '12%';
  const depthMultiplier = (index % 3) + 1;

  const x = useTransform(mouseX, (v) => v * depthMultiplier * 0.5);
  const y = useTransform(mouseY, (v) => v * depthMultiplier * 0.5);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        x,
        y,
        left: `calc(50% + ${xOffset})`,
        top: `calc(50% + ${yOffset})`,
      }}
      className="absolute z-10 w-[190px] sm:w-[250px] md:w-[380px] -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
    >
      <div className="p-2 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-[0_0_40px_rgba(245,158,11,0.1)] group">
        <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl z-20"></div>
        <img
          src={img.src}
          alt={img.alt || 'Memory'}
          loading="lazy"
          decoding="async"
          className="w-full h-[150px] sm:h-[200px] md:h-[280px] rounded-lg object-cover"
        />
      </div>
    </motion.div>
  );
};

const AisleWalk = ({ images = [] }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Use springs for smooth parallax mouse movement on desktop only
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const bgX = useTransform(mouseX, (v) => -v * 0.2);
  const bgY = useTransform(mouseY, (v) => -v * 0.2);
  const fgX = useTransform(mouseX, (v) => v * 2);
  const fgY = useTransform(mouseY, (v) => v * 2);
  const finalScale = useTransform(scrollYProgress, [0.8, 1], [0.5, 1]);
  const finalOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x * 50);
      mouseY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const walkImages = images.slice(5, 12);

  return (
    <section ref={containerRef} className="h-[350vh] md:h-[400vh] relative bg-stone-950 overflow-x-clip">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
        {/* Deep Background with inverse parallax */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black z-0 scale-110"
          style={{ x: bgX, y: bgY }}
        ></motion.div>

        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 text-center w-full px-4">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-cormorant text-amber-500 font-bold uppercase tracking-[0.2em] opacity-80">
            Down the Aisle
          </h2>
          <p className="text-stone-400 font-light mt-2 tracking-[0.25em] sm:tracking-[0.3em] text-xs uppercase animate-pulse">
            Scroll to walk forward
          </p>
        </div>

        {/* Z-Axis Scrolling Images */}
        {walkImages.map((img, index) => (
          <WalkImageCard
            key={img.src || index}
            img={img}
            index={index}
            total={walkImages.length}
            scrollYProgress={scrollYProgress}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}

        {/* Foreground particles (Move fastest) */}
        <motion.div
          className="absolute inset-0 z-40 pointer-events-none"
          style={{ x: fgX, y: fgY }}
        >
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-400/30 rounded-full blur-[2px]"></div>
          <div className="absolute top-3/4 left-3/4 w-8 h-8 bg-amber-500/20 rounded-full blur-[4px]"></div>
          <div className="absolute top-1/2 left-[15%] w-5 h-5 bg-amber-300/30 rounded-full blur-[3px]"></div>
          <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-white/20 rounded-full blur-[1px]"></div>
        </motion.div>

        {/* Final message */}
        <motion.div
          className="absolute z-30 flex flex-col items-center px-4 text-center"
          style={{
            scale: finalScale,
            opacity: finalOpacity,
          }}
        >
          <h1 className="font-alex text-5xl sm:text-6xl md:text-9xl text-amber-500 mb-4 drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            Eternity
          </h1>
          <div className="w-[180px] sm:w-[240px] md:w-[400px] h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AisleWalk;
