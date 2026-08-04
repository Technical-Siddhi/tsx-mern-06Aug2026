import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} React 18 + TypeScript + Vite. All rights reserved.</p>
        <p className="flex items-center space-x-2">
          <span>Built with Tailwind CSS & Framer Motion</span>
        </p>
      </div>
    </footer>
  );
};
