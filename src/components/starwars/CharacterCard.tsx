import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
  onViewDetails: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onViewDetails }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onViewDetails(character);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => onViewDetails(character)}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      aria-label={`View details for ${character.name}, ${character.species} from ${character.homeworld}`}
      className="group relative bg-slate-900/70 border border-slate-800/80 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between cursor-pointer transition-colors duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      {/* Top Image Section */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-950">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Species Badge with subtle hover animation */}
        <motion.div whileHover={{ scale: 1.05 }} className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-950/85 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-lg group-hover:border-amber-400 group-hover:bg-amber-400/20 transition duration-300">
            {character.species}
          </span>
        </motion.div>

        {/* Homeworld Pill */}
        <div className="absolute bottom-3 left-3.5 z-10">
          <span className="text-xs text-slate-300 font-mono flex items-center space-x-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-sm">
            <svg
              className="w-3.5 h-3.5 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{character.homeworld}</span>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-black text-white font-mono tracking-tight group-hover:text-amber-400 transition-colors">
            {character.name}
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
            <div>
              <span className="block text-slate-500 text-[9px] uppercase">Height</span>
              <span className="text-slate-200 font-semibold">{character.height}</span>
            </div>
            <div>
              <span className="block text-slate-500 text-[9px] uppercase">Mass</span>
              <span className="text-slate-200 font-semibold">{character.mass}</span>
            </div>
          </div>
        </div>

        {/* View Details Visual Cue Button */}
        <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-800 group-hover:from-amber-400 group-hover:to-amber-500 text-amber-300 group-hover:text-slate-950 border border-amber-500/30 group-hover:border-amber-400 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2">
          <span>View Details</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
