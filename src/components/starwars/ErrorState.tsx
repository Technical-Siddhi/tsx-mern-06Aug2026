import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Hyperdrive navigation failure. Unable to retrieve character holocron records.',
  onRetry,
}) => {
  return (
    <div
      className="max-w-md mx-auto my-12 p-8 text-center bg-slate-900/80 border border-red-500/30 rounded-3xl shadow-2xl backdrop-blur-xl space-y-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shadow-lg">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold font-mono text-white">Transmission Interrupt</h3>
      <p className="text-sm text-slate-300 leading-relaxed">{message}</p>

      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-red-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Re-establish Connection
          </button>
        </div>
      )}
    </div>
  );
};
