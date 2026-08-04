import React from 'react';
import { motion } from 'framer-motion';

interface SpeciesBadgeProps {
  speciesName?: string | null;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export const SpeciesBadge: React.FC<SpeciesBadgeProps> = ({
  speciesName,
  isLoading = false,
  isError = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-950/80 border border-slate-800 text-slate-400 animate-pulse ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400/60 animate-ping mr-2" />
        <span>Loading Species...</span>
      </div>
    );
  }

  let badgeText = speciesName || 'Human';

  if (isError) {
    badgeText = 'Unknown Species';
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-950/85 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-lg transition duration-300 ${className}`}
      >
        🧬 {badgeText}
      </span>
    </motion.div>
  );
};

export default SpeciesBadge;
