'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, ExternalLink, Globe, RefreshCw, RotateCcw, Undo2 } from 'lucide-react';
import { getPublishTarget } from '../lib/publishTargets';
import PageDesignPreview from './PageDesignPreview';

export default function PublishedPagesDashboard({ onBack, onReloadDesign }) {
  const [pages, setPages] = useState([]);
  const [history, setHistory] = useState([]);
  const [customMenu, setCustomMenu] = useState([]);
  const [chrome, setChrome] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [undoing, setUndoing] = useState(false);
  const [restoringId, setRestoringId] = useState('');
  const [notice, setNotice] = useState('');

  const refresh = async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/publish-uni-page', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not load published pages.');
      setPages(Array.isArray(result.pages) ? result.pages : []);
      setHistory(Array.isArray(result.history) ? result.history : []);
      setCustomMenu(Array.isArray(result.customMenu) ? result.customMenu : []);
      setChrome(result.chrome || {});
    } catch (exception) { setError(exception.message || 'Could not load published pages.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  const latestPublication = [...history].reverse().find(entry => !entry.undoneAt);
  const undoLatestPublication = async () => {
    setUndoing(true); setNotice(''); setError('');
    try {
      const response = await fetch('/api/undo-publication', { method: 'POST' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not undo the publication.');
      setNotice(`Restored the version that was published before “${result.publication?.title || 'this item'}”.`);
      await refresh();
    } catch (exception) { setError(exception.message || 'Could not undo the publication.'); }
    finally { setUndoing(false); }
  };

  const restorePublication = async entry => {
    if (!entry?.data?.elements?.length || !entry.publicationType) return;
    setRestoringId(entry.id); setNotice(''); setError('');
    try {
      const response = await fetch('/api/publish-uni-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageData: entry.data, targetPage: entry.targetPage }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not restore this version.');
      setNotice(`Restored “${entry.title || 'Untitled page'}” as the current published version.`);
      await refresh();
    } catch (exception) { setError(exception.message || 'Could not restore this version.'); }
    finally { setRestoringId(''); }
  };

  const isCurrentVersion = entry => entry.publicationType === 'chrome'
    ? chrome[entry.chromeRegion]?.id === entry.id
    : pages.find(page => page.targetPage === entry.targetPage)?.id === entry.id;

  const siteUrl = process.env.NEXT_PUBLIC_UNI_URL || 'http://localhost:3000';
  return <main className="min-h-screen bg-slate-100 px-4 py-8 font-sans text-slate-800 sm:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><button onClick={onBack} className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-800"><ArrowLeft size={16}/> Back to Page Studio</button><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">UAF Page Studio · Admin</p><h1 className="mt-1 text-2xl font-bold">Published pages</h1><p className="mt-1 text-sm text-slate-500">See what is live on the university website and when each page was published.</p></div>
        <button onClick={refresh} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-60"><RefreshCw size={15}/> Refresh</button>
      </div>
      {error && <p role="alert" className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
      {notice && <p role="status" className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">{notice}</p>}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2"><Globe size={18} className="text-blue-700"/><h2 className="text-lg font-bold">Header and footer templates</h2></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {['header', 'footer'].map(region => {
            const entry = chrome[region];
            return <article key={region} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2"><h3 className="font-bold capitalize">{region}</h3>{entry?.data?.elements?.length > 0 && <button type="button" onClick={() => onReloadDesign?.(entry.data)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"><RotateCcw size={14}/>Reload design</button>}</div>
              <p className="mt-1 text-xs text-slate-500">{entry?.publishedAt ? `Updated ${new Date(entry.publishedAt).toLocaleString()}` : 'Using the university site default'}</p>
              {entry?.data && <div className="mt-3"><PageDesignPreview page={entry.data} compact/></div>}
            </article>;
          })}
        </div>
      </section>
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2"><Globe size={18} className="text-emerald-700"/><h2 className="text-lg font-bold">Currently published</h2><span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500">{pages.length}</span></div>
        {loading ? <p className="rounded-xl bg-white p-5 text-sm text-slate-500">Loading published pages…</p> : pages.length ? <div className="space-y-4">{[...pages].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).map(page => <article key={page.targetPage} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold">{page.title || 'Untitled page'}</h3><p className="mt-1 text-sm text-slate-500">{getPublishTarget(page.targetPage, customMenu)?.label || page.targetPage}</p><p className="mt-1 text-xs text-slate-400">Published {page.publishedAt ? new Date(page.publishedAt).toLocaleString() : 'date unavailable'}</p></div><div className="flex gap-2">{page.data?.elements?.length > 0 && <button type="button" onClick={() => onReloadDesign?.(page.data)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"><RotateCcw size={14}/>Reload design</button>}<a href={siteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Open website <ExternalLink size={13}/></a></div></div>
          <PageDesignPreview page={page.data} compact/>
        </article>)}</div> : !error && <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500"><CheckCircle2 className="mx-auto mb-2 text-slate-300"/>No pages have been published yet.</div>}
      </section>
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Clock3 size={18} className="text-slate-500"/><h2 className="text-lg font-bold">Publication history</h2><span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500">{history.length}</span></div>{latestPublication?.publicationType && <button type="button" onClick={undoLatestPublication} disabled={undoing} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"><Undo2 size={15}/>{undoing ? 'Undoing…' : 'Undo latest publication'}</button>}</div>
        {history.length ? <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">{[...history].reverse().map((entry, index) => <div key={`${entry.id}-${entry.publishedAt}-${index}`} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-0"><div><p className="text-sm font-semibold">{entry.title || 'Untitled page'}{entry.undoneAt && <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-500">Undone</span>}</p><p className="text-xs text-slate-500">{entry.publicationType === 'chrome' ? `Site-wide ${entry.chromeRegion}` : getPublishTarget(entry.targetPage, customMenu)?.label || entry.targetPage}</p><time className="text-xs text-slate-500">{entry.publishedAt ? new Date(entry.publishedAt).toLocaleString() : 'Date unavailable'}</time></div><div className="flex flex-wrap gap-2">{entry.publicationType && isCurrentVersion(entry) && <span className="self-center rounded bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase text-emerald-800">Live</span>}{entry.publicationType && !isCurrentVersion(entry) && <button type="button" onClick={() => restorePublication(entry)} disabled={Boolean(restoringId) || !entry.data?.elements?.length} className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 disabled:cursor-wait disabled:opacity-50" title="Restore this page, header, or footer as the current published version"><Undo2 size={14}/>{restoringId === entry.id ? 'Restoring…' : 'Restore this version'}</button>}<button type="button" onClick={() => onReloadDesign?.(entry.data)} disabled={!entry.data?.elements?.length} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" title="Load this published version back into the page editor"><RotateCcw size={14}/>Reload design</button></div></div>)}</div> : <p className="rounded-xl bg-white p-5 text-sm text-slate-500">No publication history yet.</p>}
      </section>
    </div>
  </main>;
}
