import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Calendar, Sparkles } from 'lucide-react';

/**
 * Calculates dynamic years together starting from a milestone anniversary date.
 * Example milestone date: November 15th (Month index 6, Day 31).
 * Every November 15th, the year count increments automatically.
 */
function calculateYearsTogether(startDate = new Date(2025, 11, 15)) {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();

  // Anniversary date for current year
  const anniversaryThisYear = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());

  if (now < anniversaryThisYear) {
    years--;
  }

  return Math.max(1, years);
}

const getStatsData = () => [
  { icon: Camera, label: 'Photos', target: 12, suffix: '+' },
  { icon: Heart, label: 'Memories', target: 500, suffix: '+' },
  { icon: Calendar, label: 'Years Together', target: calculateYearsTogether(), suffix: '' },
  { icon: Sparkles, label: 'Beautiful Moments', target: 1000, suffix: '+' },
];

const StatCard = ({ icon: Icon, label, target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let animationFrame;

    const updateCount = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
      } else {
        setCount(Math.floor(start));
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target]);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-800/40 backdrop-blur-md border border-amber-500/10 shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:-translate-y-2 group transition duration-500">
      <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 transition duration-300">
        <Icon size={24} />
      </div>
      <span className="text-4xl md:text-5xl font-cormorant font-bold text-white tracking-tight mb-1 group-hover:text-amber-400 transition duration-300">
        {count}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 mt-1">
        {label}
      </span>
    </div>
  );
};

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const statsData = getStatsData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-stone-900 relative fade">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {statsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
};

export default AnimatedStats;
