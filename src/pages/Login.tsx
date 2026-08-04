import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('remember_username') || 'admin';
  });
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('remember_me') !== 'false';
  });

  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (rememberMe && username) {
      localStorage.setItem('remember_me', 'true');
      localStorage.setItem('remember_username', username);
    } else if (!rememberMe) {
      localStorage.setItem('remember_me', 'false');
      localStorage.removeItem('remember_username');
    }
  }, [rememberMe, username]);

  const handleUseDemo = useCallback(() => {
    setUsername('admin');
    setPassword('123456');
    setFieldErrors({});
    setAuthError(null);
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 50);
  }, []);

  const validate = useCallback(() => {
    const errors: { username?: string; password?: string } = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [username, password]);

  // Redirect if already authenticated
  if (!loading && isAuthenticated && !isSuccess) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const success = await login(username, password);
      if (success) {
        if (rememberMe) {
          localStorage.setItem('remember_me', 'true');
          localStorage.setItem('remember_username', username);
        } else {
          localStorage.setItem('remember_me', 'false');
          localStorage.removeItem('remember_username');
        }
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      } else {
        setAuthError('Invalid Security Credentials. Please check username & password.');
        setIsSubmitting(false);
      }
    } catch {
      setAuthError('An unexpected authentication error occurred.');
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      if (authError) {
        setAuthError(null);
      }
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setPassword('');
      if (fieldErrors.password) {
        setFieldErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-slate-100 flex items-center justify-center p-3 sm:p-5 lg:p-6 relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      {/* Background Star Particles Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Background Ambient Holocron Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Login Card (Compact 15% reduced height) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="w-[95%] sm:w-[500px] lg:w-[560px] max-w-[560px] bg-slate-900/85 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-2xl relative z-10 space-y-4 sm:space-y-5"
      >
        {/* Section 1: Header */}
        <div className="text-center space-y-2">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950/90 border border-amber-500/40 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
              GALACTIC IMPERIAL TERMINAL
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-mono tracking-tight text-white uppercase pt-0.5">
            Holocron Security Access
          </h1>
          <p className="text-xs font-mono text-slate-400/90 leading-normal max-w-sm mx-auto">
            Enter authorized security clearance credentials to access archive records.
          </p>
        </div>

        {/* Section 2: Demo Account Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.25 }}
          className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs font-mono space-y-2.5 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-300 font-bold uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Demo Account</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Authorized Access
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            Use this account to explore the application.
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Username</span>
              <strong className="text-white text-xs font-mono">admin</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Password</span>
              <strong className="text-white text-xs font-mono">••••••</strong>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            type="button"
            onClick={handleUseDemo}
            disabled={isSubmitting || isSuccess}
            className="w-full py-2 px-3.5 rounded-xl bg-amber-400/20 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-mono text-xs font-bold transition-all duration-200 border border-amber-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>Use Demo Account</span>
          </motion.button>
        </motion.div>

        {/* Section 3: Success Toast */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-xs font-mono text-emerald-300 text-center flex items-center justify-center space-x-2 font-bold shadow-lg shadow-emerald-500/10"
              role="status"
              aria-live="polite"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm">Access Granted</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 4: Auth Error Alert with Shake Animation */}
        <AnimatePresence>
          {authError && !isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, x: [-8, 8, -4, 4, 0] }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-2xl bg-red-500/15 border border-red-500/40 text-xs font-mono text-red-300 text-center flex items-center justify-center space-x-2 shadow-md"
              role="alert"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 5: Form */}
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-4" noValidate>
          {/* Username Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="username-input"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200"
            >
              Username Clearance
            </label>
            <div className="relative">
              <input
                id="username-input"
                type="text"
                autoComplete="username"
                value={username}
                disabled={isSubmitting || isSuccess}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) {
                    setFieldErrors((prev) => ({ ...prev, username: undefined }));
                  }
                }}
                placeholder="e.g. admin"
                aria-invalid={Boolean(fieldErrors.username || authError)}
                aria-describedby={fieldErrors.username ? 'username-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 text-white font-mono text-sm placeholder-slate-600 shadow-inner focus:outline-none transition-all duration-250 border disabled:opacity-50 ${
                  fieldErrors.username || authError
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/50'
                    : 'border-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                }`}
              />
            </div>
            {fieldErrors.username && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                id="username-error"
                className="block text-[11px] font-mono text-red-400 font-medium pt-0.5"
              >
                {fieldErrors.username}
              </motion.span>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="password-input"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200"
            >
              Security Password
            </label>
            <div className="relative">
              <input
                ref={passwordInputRef}
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                disabled={isSubmitting || isSuccess}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                onKeyDown={handlePasswordKeyDown}
                placeholder="••••••••"
                aria-invalid={Boolean(fieldErrors.password || authError)}
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                className={`w-full pl-4 pr-11 py-3 rounded-xl bg-slate-950/90 text-white font-mono text-sm placeholder-slate-600 shadow-inner focus:outline-none transition-all duration-250 border disabled:opacity-50 ${
                  fieldErrors.password || authError
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/50'
                    : 'border-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isSubmitting || isSuccess}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg transition"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={showPassword ? 'eyeoff' : 'eye'}
                    initial={{ opacity: 0, rotate: -25, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 25, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
            {fieldErrors.password && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                id="password-error"
                className="block text-[11px] font-mono text-red-400 font-medium pt-0.5"
              >
                {fieldErrors.password}
              </motion.span>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <label
            htmlFor="remember-me-checkbox"
            className="flex items-center space-x-2.5 pt-0.5 cursor-pointer group select-none"
          >
            <input
              id="remember-me-checkbox"
              type="checkbox"
              checked={rememberMe}
              disabled={isSubmitting || isSuccess}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-0 focus:ring-offset-slate-900 cursor-pointer disabled:opacity-50 transition"
            />
            <span className="text-xs font-mono text-slate-300 group-hover:text-amber-300 transition">
              Remember Me
            </span>
          </label>

          {/* Submit Button */}
          <motion.button
            whileHover={{
              y: isSubmitting || isSuccess ? 0 : -2,
              scale: isSubmitting || isSuccess ? 1 : 1.01,
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.35)',
            }}
            whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
            type="submit"
            aria-label="Initiate Holocron Session"
            disabled={isSubmitting || isSuccess}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-lg shadow-amber-500/25 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center space-x-2.5"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Initiate Holocron Session</span>
            )}
          </motion.button>
        </form>

        {/* Section 6: Subtle Footer */}
        <div className="pt-1 text-center text-[11px] font-mono text-slate-400/60 space-y-0.5 select-none">
          <div>© 2026 Siddhi Raj</div>
          <div>React • TypeScript • Tailwind CSS • React Query</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
