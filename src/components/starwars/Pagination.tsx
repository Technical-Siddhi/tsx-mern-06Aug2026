import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center space-x-2 py-8"
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-slate-800 hover:enabled:text-amber-400 hover:enabled:border-slate-700 transition shadow-lg flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1.5 font-mono text-xs">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            aria-label={`Page ${page}`}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold transition flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              currentPage === page
                ? 'bg-amber-400 text-slate-950 border border-amber-300 shadow-lg shadow-amber-400/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-slate-800 hover:enabled:text-amber-400 hover:enabled:border-slate-700 transition shadow-lg flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <span className="hidden sm:inline">Next</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};
