import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
  onViewDetails: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onViewDetails }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:shadow-amber-500/10"
    >
      {/* Top Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-950">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Species Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-950/80 border border-amber-400/30 text-amber-300 backdrop-blur-md shadow-lg">
            {character.species}
          </span>
        </div>

        {/* Homeworld Pill */}
        <div className="absolute bottom-3 left-4 z-10">
          <span className="text-xs text-slate-300 font-mono flex items-center space-x-1">
            <svg
              className="w-3.5 h-3.5 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-black text-white font-mono tracking-tight group-hover:text-amber-400 transition-colors">
            {character.name}
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
            <div>
              <span className="block text-slate-500 text-[10px] uppercase">Height</span>
              <span className="text-slate-200 font-semibold">{character.height}</span>
            </div>
            <div>
              <span className="block text-slate-500 text-[10px] uppercase">Mass</span>
              <span className="text-slate-200 font-semibold">{character.mass}</span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(character)}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-800 hover:from-amber-400 hover:to-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 hover:border-amber-400 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 group-hover:shadow-amber-500/20"
        >
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};
