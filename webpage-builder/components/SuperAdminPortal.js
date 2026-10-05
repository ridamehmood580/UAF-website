'use client';

import React, { useEffect, useState } from 'react';
import { LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import WorkflowDashboard from './WorkflowDashboard';

export default function SuperAdminPortal() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/superadmin/auth').then(async response => {
      const result = await response.json();
      if (!active) return;
      setAuthenticated(result.authenticated === true);
      if (response.status === 503 || result.configured === false) setError('Superadmin access is not configured. Add the login settings to webpage-builder/.env.local, then restart the builder.');
    }).catch(() => { if (active) setError('Could not connect to the Page Studio login service.'); }).finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  const signIn = async event => {
    event.preventDefault();
    setSubmitting(true); setError('');
    try {
      const response = await fetch('/api/superadmin/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not sign in.');
      setAuthenticated(true); setPassword('');
    } catch (exception) { setError(exception.message || 'Could not sign in.'); }
    finally { setSubmitting(false); }
  };

  const signOut = async () => {
    await fetch('/api/superadmin/auth', { method: 'DELETE' });
    setAuthenticated(false);
    window.location.assign('/superadmin');
  };

  if (checking) return <main className="grid min-h-screen place-items-center bg-slate-100 text-sm text-slate-500">Checking superadmin access…</main>;
  if (authenticated) return <WorkflowDashboard initialRole="superadmin" onLogout={signOut}/>;

  return <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100 via-slate-100 to-slate-200 px-4 py-10 font-sans text-slate-800">
    <section className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="bg-[#092b25] px-7 py-7 text-white"><div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-emerald-400/15 text-emerald-200"><ShieldCheck size={25}/></div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">UAF Page Studio</p><h1 className="mt-1 text-2xl font-bold">Superadmin sign in</h1><p className="mt-2 text-sm text-emerald-100/80">Sign in to review submitted page designs.</p></div>
      <form onSubmit={signIn} className="space-y-5 p-7">
        <label className="block text-sm font-semibold">Username<div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10"><UserRound size={17} className="text-slate-400"/><input autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} required className="min-w-0 flex-1 py-2.5 text-sm outline-none" placeholder="Superadmin username"/></div></label>
        <label className="block text-sm font-semibold">Password<div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10"><LockKeyhole size={17} className="text-slate-400"/><input type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required className="min-w-0 flex-1 py-2.5 text-sm outline-none" placeholder="Enter password"/></div></label>
        {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-800">{error}</p>}
        <button disabled={submitting} className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in to dashboard'}</button>
      </form>
    </section>
  </main>;
}
