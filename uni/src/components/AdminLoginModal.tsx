import React, { useState, useEffect } from 'react';
import { X, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Configured in .env (see .env.example). These are read at build time.
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME as string | undefined;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
// URL of the SECOND project (Webpage Builder), which runs separately.
const BUILDER_URL = (import.meta.env.VITE_BUILDER_URL as string | undefined) || 'http://localhost:3001';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setUsername('');
      setPassword('');
      setError('');
      setShowPassword(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      setError('Admin login is not configured. Set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD in .env and restart.');
      return;
    }

    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsSubmitting(true);
      // Hand over to the second project (a separate app on its own address).
      window.location.href = BUILDER_URL;
    } else {
      setError('Incorrect username or password.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Admin login"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#005a36] px-6 py-5 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight">Admin Login</h2>
            <p className="text-xs text-white/80">Sign in to open the Page Studio</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <label className="block">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">Username</span>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-stone-300 px-3 focus-within:border-[#005a36] focus-within:ring-2 focus-within:ring-[#005a36]/20">
              <User className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2.5 text-sm text-stone-900 outline-none bg-transparent"
                placeholder="Enter username"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">Password</span>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-stone-300 px-3 focus-within:border-[#005a36] focus-within:ring-2 focus-within:ring-[#005a36]/20">
              <Lock className="w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2.5 text-sm text-stone-900 outline-none bg-transparent"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#005a36] hover:bg-[#00472b] disabled:opacity-60 text-white font-semibold py-2.5 transition-colors cursor-pointer"
          >
            <span>{isSubmitting ? 'Opening…' : 'Log in'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={`${BUILDER_URL.replace(/\/$/, '')}/superadmin`}
            className="block text-center text-sm font-semibold text-[#005a36] hover:underline"
          >
            Superadmin sign in
          </a>
        </form>
      </div>
    </div>
  );
};
