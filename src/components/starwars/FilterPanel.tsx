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
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-amber-400 flex items-center space-x-2">
          <svg
            className="w-4 h-4 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span>Holocron Filters</span>
        </h3>

        <button
          onClick={onResetFilters}
          className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700 transition"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dropdown: Species */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
            Species
          </label>
          <select
            value={filters.species}
            onChange={(e) => onFilterChange('species', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition"
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
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
            Homeworld
          </label>
          <select
            value={filters.homeworld}
            onChange={(e) => onFilterChange('homeworld', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition"
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
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
            Film Title
          </label>
          <select
            value={filters.film}
            onChange={(e) => onFilterChange('film', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition"
          >
            <option value="">All Films</option>
            {filmsList.map((film) => (
              <option key={film} value={film}>
                {film}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
