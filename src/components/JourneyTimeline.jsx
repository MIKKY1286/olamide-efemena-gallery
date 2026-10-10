import React from 'react';
import { Heart, MapPin } from 'lucide-react';

const timelineSteps = [
  { 
    title: 'First Meeting', 
    date: 'Summer 2018',
    description: 'Where our story began. A chance encounter that changed everything.',
    image: '/images/img-1.webp',
    align: 'left'
  },
  { 
    title: 'The Engagement', 
    date: 'December 2023',
    description: 'The promise of forever under the starlight.',
    image: '/images/img-2.webp',
    align: 'right'
  },
  { 
    title: 'Traditional Wedding', 
    date: 'November 14, 2025',
    description: 'Honoring rich heritage, culture, and our families.',
    image: '/images/img-5.webp',
    align: 'left'
  },
  { 
    title: 'White Wedding', 
    date: 'November 15, 2025',
    description: 'Exchanging vows before God and our loved ones.',
    image: '/images/img-7.webp',
    align: 'right'
  },
  { 
    title: 'Forever Starts Now', 
    date: 'Today & Always',
    description: 'Building a beautiful life together, step by step.',
    image: '/images/img-12.webp',
    align: 'left'
  },
];

const JourneyTimeline = () => {
  return (
    <section className="py-24 px-4 bg-stone-900 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 mb-20 fade">
        <span className="font-alex text-amber-500 text-4xl block mb-2 font-semibold tracking-wider">
          The Journey
        </span>
        <h2 className="text-4xl md:text-6xl font-cormorant font-bold text-white mb-6 tracking-wide">
          Our Exploration
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6 text-amber-500">
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400"></div>
          <MapPin size={20} fill="currentColor" className="text-amber-500 animate-pulse" />
          <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>
        <p className="text-stone-400 font-light max-w-lg mx-auto">
          Every great adventure starts with a single step. Follow our path as we explore life's greatest moments together.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Central Winding Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-600 -translate-x-1/2 opacity-30 rounded-full"></div>
        
        <div className="flex flex-col gap-24 md:gap-40 relative pt-10 pb-20">
          {timelineSteps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center justify-between w-full fade ${
                step.align === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-5/12 mb-8 md:mb-0 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-300 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition duration-500"></div>
                </div>
              </div>

              {/* Center Node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-stone-900 border-4 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)] items-center justify-center z-20 group">
                <Heart size={20} className="text-amber-500 fill-amber-500 group-hover:scale-125 transition duration-300" />
              </div>

              {/* Content Side */}
              <div className={`w-full md:w-5/12 text-center ${step.align === 'left' ? 'md:text-right' : 'md:text-left'} group`}>
                <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold text-sm tracking-widest mb-4">
                  {step.date}
                </div>
                <h3 className="font-cormorant font-bold text-3xl md:text-4xl text-white mb-4 group-hover:text-amber-400 transition duration-300">
                  {step.title}
                </h3>
                <p className="text-stone-400 font-light text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
