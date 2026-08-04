import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils';

export const Home: React.FC = () => {
  const currentDate = formatDate(new Date().toISOString(), 'EEEE, MMMM do, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm">
          <span>Today: {currentDate}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-sky-400">
          React 18 + TypeScript Starter
        </h1>

        <p className="text-lg text-slate-400 leading-relaxed">
          Production-ready architecture configured with Vite, Tailwind CSS, React Router v7,
          TanStack Query, Axios, and Framer Motion.
        </p>

        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur shadow-xl hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Vite + React 18</h3>
            <p className="text-sm text-slate-400">
              Lightning-fast HMR development server with strict TypeScript typing enabled.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur shadow-xl hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold mb-4">
              🔄
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">TanStack Query</h3>
            <p className="text-sm text-slate-400">
              Powerful asynchronous state management and server synchronization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur shadow-xl hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold mb-4">
              🎨
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tailwind & Framer</h3>
            <p className="text-sm text-slate-400">
              Utility-first modern styling paired with fluid layout animations.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
