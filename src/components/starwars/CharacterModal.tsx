import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '../../types';
import { formatDate } from '../../utils';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
  // ESC Key & Body Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!character) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-character-name"
        >
          {/* Backdrop Blur Overlay & Click Outside Handler */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 backdrop-blur-2xl text-slate-100 flex flex-col max-h-[90vh]"
          >
            {/* Sticky Header with Close Button */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Holocron Record File #{character.id}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-400 flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Close character details modal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto custom-scrollbar flex-1">
              {/* Modal Hero Header with Image */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-950">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute bottom-5 left-6 right-6 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/20 border border-amber-400/40 text-amber-300 mb-2">
                    {character.species}
                  </span>
                  <h2
                    id="modal-character-name"
                    className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight"
                  >
                    {character.name}
                  </h2>
                </div>
              </div>

              {/* Modal Details Grid */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Physical Demographics */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-amber-400 mb-3 tracking-wider">
                    Physical & Temporal Demographics
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase">Height</span>
                      <span className="text-slate-100 font-bold text-sm">{character.height}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase">Mass</span>
                      <span className="text-slate-100 font-bold text-sm">{character.mass}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase">Birth Year</span>
                      <span className="text-slate-100 font-bold text-sm">
                        {character.birthYear}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="block text-slate-500 text-[10px] uppercase">
                        Created Date
                      </span>
                      <span className="text-slate-100 font-bold text-sm">
                        {formatDate(character.createdAt, 'MMM yyyy')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Homeworld Details */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-amber-400 mb-3 tracking-wider">
                    Homeworld Profile
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Homeworld Name:</span>
                      <span className="text-amber-300 font-bold">{character.homeworld}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Terrain:</span>
                      <span className="text-slate-200">{character.terrain}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Climate:</span>
                      <span className="text-slate-200">{character.climate}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Residents:</span>
                      <span className="text-slate-200">{character.residents}</span>
                    </div>
                  </div>
                </div>

                {/* Featured Films */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-amber-400 mb-3 tracking-wider">
                    Filmography Appearances
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {character.films.map((film) => (
                      <span
                        key={film}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                      >
                        🎬 {film}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Close Holocron
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
