import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-16 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            SW
          </div>
          <div>
            <span className="font-bold text-slate-200">Star Wars Holocron Codex</span>
            <span className="block text-[10px] text-slate-500">
              May the Force be with you. Always.
            </span>
          </div>
        </div>

        <p>
          &copy; {new Date().getFullYear()} Galactic Archives. Built with React 18, TypeScript &
          Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};
