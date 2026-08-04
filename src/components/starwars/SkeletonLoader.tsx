import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden p-4 space-y-4 animate-pulse shadow-xl"
        >
          {/* Skeleton Image */}
          <div className="w-full h-56 bg-slate-800/80 rounded-2xl"></div>

          {/* Skeleton Text */}
          <div className="space-y-2">
            <div className="h-5 bg-slate-800 rounded-lg w-3/4"></div>
            <div className="h-3 bg-slate-800/60 rounded-lg w-1/2"></div>
          </div>

          {/* Skeleton Details Box */}
          <div className="h-12 bg-slate-950/60 rounded-xl border border-slate-800/50"></div>

          {/* Skeleton Button */}
          <div className="h-10 bg-slate-800/80 rounded-2xl w-full"></div>
        </div>
      ))}
    </div>
  );
};
