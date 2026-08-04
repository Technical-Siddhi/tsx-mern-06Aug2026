import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-md mx-auto text-center py-24 px-4"
    >
      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-600 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-slate-400 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold border border-slate-700 transition"
      >
        &larr; Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
