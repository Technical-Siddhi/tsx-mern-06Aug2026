import React from 'react';
import { FilterOptions } from '../../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onResetFilters: () => void;
  speciesList?: string[];
  homeworldList?: string[];
  filmsList?: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  speciesList = ['Human', 'Wookiee', "Yoda's Species", 'Togruta', 'Droid', 'Human / Sith'],
  homeworldList = [
    'Tatooine',
    'Alderaan',
    'Dagobah',
    'Corellia',
    'Kashyyyk',
    'Stewjon',
    'Naboo',
    'Mandalore',
  ],
  filmsList = [
    'A New Hope',
    'The Empire Strikes Back',
    'Return of the Jedi',
    'Revenge of the Sith',
    'The Phantom Menace',
    'The Mandalorian',
  ],
}) => {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center gap-3 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-xl"
      aria-label="Holocron Filter Options"
    >
      {/* Dropdown: Species */}
      <div className="flex-1 min-w-[140px]">
        <label htmlFor="species-filter" className="sr-only">
          Filter by Species
        </label>
        <select
          id="species-filter"
          value={filters.species}
          onChange={(e) => onFilterChange('species', e.target.value)}
          aria-label="Filter by Species"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-mono transition"
        >
          <option value="">All Species</option>
          {speciesList.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown: Homeworld */}
      <div className="flex-1 min-w-[140px]">
        <label htmlFor="homeworld-filter" className="sr-only">
          Filter by Homeworld
        </label>
        <select
          id="homeworld-filter"
          value={filters.homeworld}
          onChange={(e) => onFilterChange('homeworld', e.target.value)}
          aria-label="Filter by Homeworld"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-mono transition"
        >
          <option value="">All Homeworlds</option>
          {homeworldList.map((world) => (
            <option key={world} value={world}>
              {world}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown: Films */}
      <div className="flex-1 min-w-[140px]">
        <label htmlFor="film-filter" className="sr-only">
          Filter by Film
        </label>
        <select
          id="film-filter"
          value={filters.film}
          onChange={(e) => onFilterChange('film', e.target.value)}
          aria-label="Filter by Film Title"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-mono transition"
        >
          <option value="">All Films</option>
          {filmsList.map((film) => (
            <option key={film} value={film}>
              {film}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters Button */}
      <button
        type="button"
        onClick={onResetFilters}
        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700 font-mono text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap"
      >
        Reset Filters
      </button>
    </div>
  );
};
