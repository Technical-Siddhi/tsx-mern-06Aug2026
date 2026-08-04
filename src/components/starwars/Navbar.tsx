import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-amber-500/20 shadow-2xl shadow-amber-500/5">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4"
        aria-label="Main Navigation"
      >
        {/* Star Wars Logo & App Name */}
        <Link
          to="/"
          className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1 transition"
          aria-label="Star Wars Archives Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center font-black text-slate-950 text-lg sm:text-xl shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform duration-300">
            SW
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-2xl tracking-wider text-amber-400 uppercase font-mono drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              Star Wars
            </span>
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
              Archives & Character Codex
            </span>
          </div>
        </Link>

        {/* Galaxy Status & Auth Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="hidden md:inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium bg-amber-400/10 border border-amber-400/30 text-amber-300 shadow-inner">
            <span
              className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2"
              aria-hidden="true"
            />
            Galaxy DB Active
          </span>

          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              {/* User Profile Badge */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white">{user?.username || 'admin'}</span>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-red-400 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Logout of Star Wars Archives"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

