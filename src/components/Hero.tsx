import React from 'react';
import { getAssetPath } from '@/utils/paths';

const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={getAssetPath("/hero.png")}
        alt="NIO ET9 Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/60" />
      
      <div className="absolute top-[20%] left-0 right-0 px-8 text-center animate-pure">
        <h2 className="t-pure-hero mb-3">NioFans · Data Portal</h2>
        <h1 className="text-4xl font-thin tracking-tight text-zinc-900">
          Pure. Human. <br />
          Progressive.
        </h1>
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[9px] uppercase tracking-[0.3em]">Explore</span>
        <div className="w-[1px] h-12 bg-zinc-900" />
      </div>
    </section>
  );
};

export default Hero;
