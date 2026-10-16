'use client';

import React, { FormEvent, useState } from 'react';
import { Lock, UserRound, X, ArrowRight } from 'lucide-react';

interface BuilderLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getBuilderUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_PAGE_BUILDER_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, '');
  if (typeof window === 'undefined') return 'http://localhost:3001';
  return `${window.location.protocol}//${window.location.hostname}:3001`;
}

export const BuilderLoginModal: React.FC<BuilderLoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const builderUrl = getBuilderUrl();

    try {
      const response = await fetch(`${builderUrl}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result.error || 'The username or password is incorrect.');
        setLoading(false);
        return;
      }
      window.location.assign(builderUrl);
    } catch {
      setError(`Could not reach the Page Builder at ${builderUrl}. Make sure it is running.`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071b2d]/65 p-4 backdrop-blur-sm" onClick={onClose}>
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="builder-login-title">
        <div className="relative border-b-2 border-[#e8a62a] bg-[#071b2d] p-6 text-white">
          <button type="button" onClick={onClose} aria-label="Close login" className="absolute right-5 top-5 rounded-lg p-1 text-stone-300 transition hover:bg-white/10 hover:text-white"><X className="h-5 w-5"/></button>
          <div className="flex items-center gap-3">
            <img src="/uaf_logo.png" alt="UAF" className="h-11 w-11 rounded-full border-2 border-[#e8a62a] bg-white p-0.5"/>
            <div><h2 id="builder-login-title" className="text-lg font-extrabold">Staff Login</h2><p className="text-xs font-semibold text-[#e8a62a]">Sign in to the webpage builder</p></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <label className="block text-xs font-bold text-stone-700">Username
            <span className="relative mt-1 block"><UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"/><input autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-9 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#163887]"/></span>
          </label>
          <label className="block text-xs font-bold text-stone-700">Password
            <span className="relative mt-1 block"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"/><input type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-9 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#163887]"/></span>
          </label>
          {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">{error}</p>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#163887] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#102a6b] disabled:cursor-wait disabled:opacity-60">
            <span>{loading ? 'Signing in…' : 'Sign in to Page Builder'}</span><ArrowRight className="h-4 w-4"/>
          </button>
        </form>
      </section>
    </div>
  );
};
