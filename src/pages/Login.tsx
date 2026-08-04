import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to Home
  if (!loading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/', { replace: true });
      } else {
        setError('Invalid Security Credentials. Please check username & password.');
      }
    } catch {
      setError('An unexpected authentication error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambient Holocron Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="w-full max-w-md bg-slate-900/80 border border-amber-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-500/40 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-amber-400">
              Galactic Imperial Terminal
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white uppercase pt-2">
            Holocron Security Access
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Enter authorized security clearance credentials to access archive records.
          </p>
        </div>

        {/* Demo Credentials Hint Badge */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-1">
          <div className="flex items-center justify-between text-amber-300 font-bold uppercase">
            <span>Authorized Test Credentials</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20">Demo Mode</span>
          </div>
          <div className="flex justify-between text-slate-300 pt-1">
            <span>Username: <strong className="text-white">admin</strong></span>
            <span>Password: <strong className="text-white">123456</strong></span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300 text-center flex items-center justify-center space-x-2"
            role="alert"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="username-input"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300"
            >
              Username Clearance
            </label>
            <input
              id="username-input"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password-input"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300"
            >
              Security Password
            </label>
            <input
              id="password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-lg shadow-amber-500/20 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Initiate Holocron Session</span>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 text-center text-[11px] font-mono text-slate-500">
          Encrypted Session • JWT Token Generated locally via Client Storage
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
