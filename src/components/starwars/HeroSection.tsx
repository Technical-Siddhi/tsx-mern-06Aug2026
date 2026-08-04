import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  totalCharacters?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ totalCharacters = 12 }) => {
  return (
    <section
      className="relative overflow-hidden py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950"
      aria-labelledby="hero-title"
    >
      {/* Background Star Glow Effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 shadow-md backdrop-blur-md"
        >
          <span className="text-amber-400 text-[11px] font-mono font-semibold uppercase tracking-widest">
            Star Wars Holocron Database
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono uppercase"
        >
          Explore the{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            Star Wars Galaxy
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Discover iconic heroes, Sith lords, Mandalorians, and droids across the outer rim
          territories and deep core systems.
        </motion.p>

        {/* Total Characters Counter Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="pt-1 flex items-center justify-center"
        >
          <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 font-mono text-xs shadow-lg flex items-center space-x-2">
            <span className="text-slate-400">Total Characters Index:</span>
            <span className="text-amber-400 font-bold text-xs sm:text-sm px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20">
              {totalCharacters} Records
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
