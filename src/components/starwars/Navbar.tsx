import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchValue = '', onSearchChange }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-amber-500/20 shadow-2xl shadow-amber-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Star Wars Logo / Text */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform duration-300">
            SW
          </div>
          <div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-amber-400 uppercase font-mono drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              Star Wars
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
              Archives & Character Codex
            </span>
          </div>
        </Link>

        {/* Integrated Quick Search Placeholder */}
        <div className="relative flex-1 max-w-xs sm:max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-500/70">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search Luke, Vader, Yoda..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
          />
        </div>

        {/* Action Badge */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-400/10 border border-amber-400/30 text-amber-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2"></span>
            Galaxy DB Active
          </span>
        </div>
      </div>
    </header>
  );
};
