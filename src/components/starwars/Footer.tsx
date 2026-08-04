import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 backdrop-blur-md py-10 mt-16 text-slate-400 font-mono text-xs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div
            tabIndex={0}
            aria-label="Star Wars Explorer Logo"
            className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-black text-sm shadow-inner shadow-amber-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <svg
              className="w-5 h-5 text-amber-400 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-slate-100 text-sm tracking-wide block">
              Star Wars Explorer
            </span>
            <span className="block text-[11px] text-amber-400/90 font-medium">
              Created by Siddhi Raj
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end space-y-1">
          <p className="text-slate-300 font-semibold">
            © 2026 Siddhi Raj. All Rights Reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Built with React • TypeScript • Vite • Tailwind CSS • React Query
          </p>
        </div>
      </motion.div>
    </footer>
  );
};
