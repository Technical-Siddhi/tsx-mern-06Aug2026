import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 8 }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      aria-label="Loading characters..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden p-4 space-y-4 animate-pulse shadow-xl flex flex-col justify-between"
        >
          {/* Skeleton Image Placeholder */}
          <div className="w-full h-60 bg-slate-800/80 rounded-2xl relative">
            <div className="absolute top-3.5 right-3.5 w-16 h-6 bg-slate-700/60 rounded-full" />
            <div className="absolute bottom-3 left-3.5 w-24 h-6 bg-slate-700/60 rounded-lg" />
          </div>

          {/* Skeleton Content Section */}
          <div className="space-y-4 flex-1">
            <div className="h-6 bg-slate-800 rounded-lg w-3/4" />
            <div className="h-10 bg-slate-950/60 rounded-xl border border-slate-800/50" />
          </div>

          {/* Skeleton Action Button */}
          <div className="h-10 bg-slate-800/80 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
};
