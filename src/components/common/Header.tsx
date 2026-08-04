import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
            V
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            React TS App
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-sky-400 ${
              isActive('/') ? 'text-sky-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/login"
            className={`text-sm font-medium transition-colors hover:text-sky-400 ${
              isActive('/login') ? 'text-sky-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};
