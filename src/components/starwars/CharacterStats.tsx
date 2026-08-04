import React from 'react';
import { SwapiCharacter } from '../../types';
import { formatDate } from '../../utils';

interface CharacterStatsProps {
  character?: SwapiCharacter | null;
  isLoading?: boolean;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({
  character,
  isLoading = false,
}) => {
  if (isLoading || !character) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs animate-pulse">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="h-3 w-16 bg-slate-800 rounded" />
            <div className="h-5 w-20 bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const formatHeightInMeters = (heightCm: string): string => {
    if (!heightCm || heightCm === 'unknown') return 'Unknown';
    const cm = Number(heightCm.replace(/[^0-9.]/g, ''));
    if (isNaN(cm) || cm <= 0) return heightCm;
    const meters = cm / 100;
    return `${meters} m`;
  };

  const formatMassInKg = (massKg: string): string => {
    if (!massKg || massKg === 'unknown') return 'Unknown';
    return massKg.includes('kg') ? massKg : `${massKg} kg`;
  };

  const formattedAddedDate = character.created
    ? formatDate(character.created, 'dd-MM-yyyy')
    : 'Unknown';

  const numberOfFilms = character.films ? character.films.length : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
      <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-400/40 transition">
        <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          Height
        </span>
        <span className="text-slate-100 font-bold text-sm">
          {formatHeightInMeters(character.height)}
        </span>
      </div>

      <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-400/40 transition">
        <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          Mass
        </span>
        <span className="text-slate-100 font-bold text-sm">{formatMassInKg(character.mass)}</span>
      </div>

      <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-400/40 transition">
        <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          Birth Year
        </span>
        <span className="text-slate-100 font-bold text-sm">
          {character.birth_year !== 'unknown' ? character.birth_year : 'Unknown'}
        </span>
      </div>

      <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-400/40 transition">
        <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          Added Date
        </span>
        <span className="text-amber-300 font-bold text-xs sm:text-sm">{formattedAddedDate}</span>
      </div>

      <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-400/40 transition col-span-2 sm:col-span-1">
        <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          Films
        </span>
        <span className="text-slate-100 font-bold text-sm flex items-center space-x-1">
          <span>🎬</span>
          <span>{numberOfFilms} {numberOfFilms === 1 ? 'Film' : 'Films'}</span>
        </span>
      </div>
    </div>
  );
};

export default CharacterStats;
