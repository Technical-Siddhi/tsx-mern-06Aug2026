import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '../../types';
import { useCharacterDetails, usePlanetDetails, useSpeciesDetails } from '../../hooks';
import { SpeciesBadge } from './SpeciesBadge';
import { PlanetCard } from './PlanetCard';
import { CharacterStats } from './CharacterStats';

interface CharacterModalProps {
  character?: Character | null;
  characterId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  characterId,
  isOpen,
  onClose,
}) => {
  const activeId = characterId || character?.id || null;

  // React Query Data Hooks with required cache keys:
  // ['character', id], ['planet', url], ['species', url]
  const {
    data: characterData,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    error: characterError,
    refetch: refetchCharacter,
  } = useCharacterDetails(activeId);

  const homeworldUrl = characterData?.homeworld || null;
  const {
    data: planetData,
    isLoading: isPlanetLoading,
    isError: isPlanetError,
  } = usePlanetDetails(homeworldUrl);

  const speciesUrl =
    characterData?.species && characterData.species.length > 0 ? characterData.species[0] : null;
  const {
    data: speciesData,
    isLoading: isSpeciesLoading,
    isError: isSpeciesError,
  } = useSpeciesDetails(speciesUrl);

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

  if (!isOpen) return null;

  const characterName = characterData?.name || character?.name || 'Character Details';
  const characterImage =
    character?.image ||
    `https://picsum.photos/seed/${encodeURIComponent(characterName.replace(/\s+/g, ''))}/600/800`;

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
            className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 backdrop-blur-2xl text-slate-100 flex flex-col max-h-[90vh]"
          >
            {/* Sticky Header with Close Button */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Holocron Record #{activeId || 'Archive'}
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
              {isCharacterError ? (
                /* Character Fetch Retry Error State */
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-2xl">
                    ⚠️
                  </div>
                  <h3 className="text-lg font-mono font-bold text-white">
                    Galactic Archive Retrieval Failed
                  </h3>
                  <p className="text-xs font-mono text-slate-400 max-w-md mx-auto">
                    {characterError?.message ||
                      'Unable to load character profile from SWAPI hyperdrive link.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => refetchCharacter()}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shadow-md"
                  >
                    Retry Loading Profile
                  </button>
                </div>
              ) : (
                <>
                  {/* Modal Hero Header with Image */}
                  <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
                    {isCharacterLoading ? (
                      <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center">
                        <span className="text-xs font-mono text-slate-500">
                          Retrieving Holocron Visuals...
                        </span>
                      </div>
                    ) : (
                      <>
                        <img
                          src={characterImage}
                          alt={characterName}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                      </>
                    )}

                    <div className="absolute bottom-5 left-6 right-6 z-10 space-y-2">
                      {/* Reusable SpeciesBadge Component */}
                      <SpeciesBadge
                        speciesName={speciesData?.name}
                        isLoading={isCharacterLoading || isSpeciesLoading}
                        isError={isSpeciesError}
                      />

                      <h2
                        id="modal-character-name"
                        className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight"
                      >
                        {isCharacterLoading ? (
                          <span className="inline-block h-8 w-60 bg-slate-800 rounded animate-pulse" />
                        ) : (
                          characterName
                        )}
                      </h2>
                    </div>
                  </div>

                  {/* Modal Details Grid */}
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Reusable CharacterStats Component */}
                    <div>
                      <h3 className="text-xs font-mono font-bold uppercase text-amber-400 mb-3 tracking-wider flex items-center space-x-1.5">
                        <span>📊</span>
                        <span>Physical & Temporal Demographics</span>
                      </h3>
                      <CharacterStats
                        character={characterData}
                        isLoading={isCharacterLoading}
                      />
                    </div>

                    {/* Reusable PlanetCard Component */}
                    <div>
                      <h3 className="text-xs font-mono font-bold uppercase text-amber-400 mb-3 tracking-wider flex items-center space-x-1.5">
                        <span>🌍</span>
                        <span>Homeworld Profile</span>
                      </h3>
                      <PlanetCard
                        planet={planetData}
                        isLoading={isCharacterLoading || isPlanetLoading}
                        isError={isPlanetError}
                      />
                    </div>
                  </div>
                </>
              )}
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

export default CharacterModal;
