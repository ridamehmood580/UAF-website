'use client';

import { useState } from 'react';
import { LockKeyhole, UserRound } from 'lucide-react';

export default function BuilderLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result.error || 'The username or password is incorrect.');
        setLoading(false);
        return;
      }
      window.location.replace('/');
    } catch {
      setError('Could not sign in. Please try again.');
      setLoading(false);
    }
  }

  return <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans text-slate-800">
    <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
      <div><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">UAF Page Studio</p><h1 className="mt-1 text-xl font-bold">Staff sign in</h1><p className="mt-1 text-sm text-slate-500">Enter your Page Builder credentials to continue.</p></div>
      <label className="block text-sm font-semibold">Username<span className="relative mt-1 block"><UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input required autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"/></span></label>
      <label className="block text-sm font-semibold">Password<span className="relative mt-1 block"><LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input required type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"/></span></label>
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800">{error}</p>}
      <button disabled={loading} className="w-full rounded-lg bg-[#163887] py-3 text-sm font-bold text-white hover:bg-[#102a6b] disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </main>;
}
