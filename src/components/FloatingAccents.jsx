import React from 'react';

const FloatingAccents = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <div className="absolute top-[20%] left-[5%] w-72 h-72 rounded-full bg-amber-600/10 blur-3xl animate-pulse"></div>
      <div className="absolute top-[60%] right-[3%] w-96 h-96 rounded-full bg-amber-800/20 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-[10%] left-[8%] w-80 h-80 rounded-full bg-amber-500/5 blur-3xl animate-pulse delay-700"></div>
    </div>
  );
};

export default FloatingAccents;
