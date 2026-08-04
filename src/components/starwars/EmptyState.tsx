import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  onResetFilters: () => void;
  title?: string;
  subtitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  title = 'No characters found',
  subtitle = 'Try changing your search or filters',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="text-center py-16 px-6 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md max-w-2xl mx-auto space-y-5"
      role="region"
      aria-label="No characters found message"
    >
      {/* Friendly Star Wars Holocron Illustration Placeholder */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center rounded-3xl bg-amber-400/10 border border-amber-400/30 text-amber-400 shadow-inner">
        <svg
          className="w-10 h-10 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
        </span>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-black font-mono text-white tracking-tight">{title}</h3>
        <p className="text-sm font-mono text-slate-400">{subtitle}</p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onResetFilters}
          className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shadow-lg shadow-amber-400/10"
        >
          Reset Filters
        </button>
      </div>
    </motion.div>
  );
};

export default EmptyState;
