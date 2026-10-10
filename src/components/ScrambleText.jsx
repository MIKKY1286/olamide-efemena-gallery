import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

const ScrambleText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (inView) {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(() => 
          text.split('').map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (text[index] === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
      
      return () => clearInterval(interval);
    } else {
      // Show scrambled initial state before inView
      setDisplayText(text.replace(/[a-zA-Z]/g, () => chars[Math.floor(Math.random() * chars.length)]));
    }
  }, [inView, text]);

  return (
    <motion.span ref={ref} className={className}>
      {displayText}
    </motion.span>
  );
};

export default ScrambleText;
