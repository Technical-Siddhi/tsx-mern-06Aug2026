import React from 'react';
import { SwapiPlanet } from '../../types';

interface PlanetCardProps {
  planet?: SwapiPlanet | null;
  isLoading?: boolean;
  isError?: boolean;
}

export const PlanetCard: React.FC<PlanetCardProps> = ({
  planet,
  isLoading = false,
  isError = false,
}) => {
  if (isLoading) {
    return (
      <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 font-mono text-xs animate-pulse">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-500">Homeworld Name:</span>
          <div className="h-4 w-28 bg-slate-800 rounded" />
        </div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-500">Terrain:</span>
          <div className="h-4 w-32 bg-slate-800 rounded" />
        </div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-500">Climate:</span>
          <div className="h-4 w-24 bg-slate-800 rounded" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-500">Residents:</span>
          <div className="h-4 w-20 bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !planet) {
    return (
      <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5 font-mono text-xs text-slate-400">
        <div className="flex justify-between border-b border-slate-800/80 pb-2">
          <span className="text-slate-500">Homeworld Name:</span>
          <span className="text-amber-400/80 font-bold">Unknown Planet</span>
        </div>
        <div className="flex justify-between border-b border-slate-800/80 pb-2">
          <span className="text-slate-500">Terrain:</span>
          <span className="text-slate-400">Unknown</span>
        </div>
        <div className="flex justify-between border-b border-slate-800/80 pb-2">
          <span className="text-slate-500">Climate:</span>
          <span className="text-slate-400">Unknown</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-slate-500">Residents:</span>
          <span className="text-slate-400">Unknown</span>
        </div>
      </div>
    );
  }

  const formatPopulation = (pop: string) => {
    if (!pop || pop === 'unknown') return 'Unknown';
    const num = Number(pop);
    return isNaN(num) ? pop : num.toLocaleString();
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 font-mono text-xs shadow-inner">
      <div className="flex justify-between border-b border-slate-800/80 pb-2">
        <span className="text-slate-400">Homeworld Name:</span>
        <span className="text-amber-300 font-bold flex items-center space-x-1">
          <span>🪐</span>
          <span>{planet.name}</span>
        </span>
      </div>
      <div className="flex justify-between border-b border-slate-800/80 pb-2">
        <span className="text-slate-400">Terrain:</span>
        <span className="text-slate-200 text-right capitalize">{planet.terrain}</span>
      </div>
      <div className="flex justify-between border-b border-slate-800/80 pb-2">
        <span className="text-slate-400">Climate:</span>
        <span className="text-slate-200 text-right capitalize">{planet.climate}</span>
      </div>
      <div className="flex justify-between pt-1">
        <span className="text-slate-400">Residents:</span>
        <span className="text-slate-200 font-semibold">{formatPopulation(planet.population)}</span>
      </div>
    </div>
  );
};

export default PlanetCard;
