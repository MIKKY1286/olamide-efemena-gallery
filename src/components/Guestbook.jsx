import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send } from 'lucide-react';

const Guestbook = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Launch realistic confetti physics
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#d97706', '#ffffff', '#fbbf24']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#d97706', '#ffffff', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="py-24 bg-stone-950 relative overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-stone-950 to-stone-950"></div>

      <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
        <span className="font-alex text-amber-500 text-3xl md:text-4xl block mb-2">Leave a Memory</span>
        <h2 className="text-3xl md:text-5xl font-cormorant font-bold text-white tracking-widest uppercase mb-8">Guestbook</h2>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in-up">
            <input 
              type="text" 
              required 
              placeholder="Your Name" 
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 transition duration-300"
            />
            <textarea 
              required 
              rows="4"
              placeholder="Your well wishes for the couple..." 
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 transition duration-300 resize-none"
            ></textarea>
            <button 
              type="submit" 
              className="mt-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold uppercase tracking-[0.2em] px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              Send Message
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        ) : (
          <div className="bg-white/5 border border-amber-500/30 rounded-2xl p-10 shadow-[0_0_40px_rgba(245,158,11,0.1)] animate-fade-in-up">
            <h3 className="font-alex text-4xl text-amber-400 mb-4">Thank You!</h3>
            <p className="font-cormorant text-xl text-stone-300 italic">Your beautiful words have been added to our memories.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;
