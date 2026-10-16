'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, Eye, Plus, Search, Trash2, Undo2, Upload, X } from 'lucide-react';
import { FACULTY_TREE, buildPublishTargets, getPublishTarget } from '../lib/publishTargets';
import PageDesignPreview from './PageDesignPreview';

export default function WorkflowDashboard({ pageData, onBack }) {
  const [targetPage, setTargetPage] = useState('');
  const [publicationScope, setPublicationScope] = useState('all');
  const [notice, setNotice] = useState('');
  const [publishedPageUrl, setPublishedPageUrl] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [undoAvailable, setUndoAvailable] = useState(false);
  const [undoing, setUndoing] = useState(false);
  const [targetSearch, setTargetSearch] = useState('');
  const [customMenu, setCustomMenu] = useState([]);
  const [addingKey, setAddingKey] = useState('');
  const [newName, setNewName] = useState('');
  const [addError, setAddError] = useState('');
  const publishTargets = useMemo(() => buildPublishTargets(customMenu), [customMenu]);
  useEffect(() => {
    fetch('/api/custom-menu', { cache: 'no-store' }).then(r => r.json()).then(r => setCustomMenu(Array.isArray(r.options) ? r.options : [])).catch(() => {});
  }, []);
  const startAdding = key => { setAddingKey(key); setNewName(''); setAddError(''); };
  const addOption = async (facultyId, unitId) => {
    setAddError('');
    try {
      const response = await fetch('/api/custom-menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ facultyId, unitId, name: newName }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not add the option.');
      setCustomMenu(result.options); setTargetPage(result.option.value); setAddingKey(''); setNewName('');
      setNotice(`New option “${result.option.name}” added to the menu and selected. Design its content, then publish.`);
    } catch (error) { setAddError(error.message); }
  };
  const removeOption = async value => {
    if (!window.confirm('Remove this menu option? Any page published to it will no longer appear in the menu.')) return;
    const response = await fetch(`/api/custom-menu?value=${encodeURIComponent(value)}`, { method: 'DELETE' });
    const result = await response.json();
    if (response.ok) { setCustomMenu(result.options); if (targetPage === value) setTargetPage(''); } else setNotice(result.error || 'Could not remove the option.');
  };
  const title = pageData?.meta?.title || 'Untitled page';
  const chromeType = pageData?.meta?.templateType;
  const isGlobalChrome = chromeType === 'site-header' || chromeType === 'site-footer';
  const isPageScopedChrome = isGlobalChrome && publicationScope === 'page';
  const jsonText = useMemo(() => JSON.stringify(pageData || {}, null, 2), [pageData]);
  const mainTargets = publishTargets.filter(target => target.department === 'Main website');
  const faculties = useMemo(() => {
    const grouped = new Map();
    for (const target of publishTargets.filter(item => item.department !== 'Main website')) {
      const parts = target.label.split(' — ');
      const faculty = parts.shift();
      if (!grouped.has(faculty)) grouped.set(faculty, new Map());
      const path = parts.length > 1 ? parts.slice(0, -1).join(' — ') : '';
      const item = { ...target, label: parts.at(-1) || target.label };
      if (!grouped.get(faculty).has(path)) grouped.get(faculty).set(path, []);
      grouped.get(faculty).get(path).push(item);
    }
    return [...grouped].map(([name, branches]) => ({ name, branches: [...branches].map(([path, targets]) => ({ path, targets })) }));
  }, [publishTargets]);
  const optionRow = target => <div key={target.value} className="flex items-center gap-1 rounded-md hover:bg-emerald-50"><label className="flex flex-1 cursor-pointer items-center gap-2 px-2 py-1.5"><input type="radio" name="publish-target" checked={targetPage === target.value} onChange={() => setTargetPage(target.value)} />{target.label}{target.custom && <span className="rounded bg-emerald-100 px-1.5 text-[10px] font-bold uppercase text-emerald-800">New</span>}</label>{target.custom && <button type="button" title="Remove option" onClick={() => removeOption(target.value)} className="p-1.5 text-slate-400 hover:text-rose-600"><Trash2 size={14}/></button>}</div>;
  const addControl = (facultyId, unitId) => {
    const key = `${facultyId}|${unitId || ''}`;
    return addingKey === key
      ? <div className="px-2 py-1.5"><div className="flex gap-2"><input autoFocus value={newName} onChange={event => setNewName(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') addOption(facultyId, unitId); if (event.key === 'Escape') setAddingKey(''); }} placeholder="New option name, e.g. Research Groups" className="min-w-0 flex-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-emerald-700"/><button type="button" onClick={() => addOption(facultyId, unitId)} className="rounded-md bg-emerald-800 px-3 text-xs font-bold text-white">Add</button><button type="button" onClick={() => setAddingKey('')} className="p-1 text-slate-400"><X size={16}/></button></div>{addError && <p className="mt-1 text-xs text-rose-600">{addError}</p>}</div>
      : <button type="button" onClick={() => startAdding(key)} className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold text-emerald-800 hover:underline"><Plus size={13}/> Add new option</button>;
  };
  const matches = label => label.toLowerCase().includes(targetSearch.trim().toLowerCase());
  const downloadJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${(title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'page-design')}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const publish = async () => {
    const target = getPublishTarget(targetPage, customMenu);
    if (!pageData?.elements?.length) { setNotice('Add content to the page before publishing.'); return; }
    if ((!isGlobalChrome || isPageScopedChrome) && !target) { setNotice('Choose where this page should appear on the university website.'); return; }
    setPublishing(true); setNotice('');
    try {
      const response = await fetch('/api/publish-uni-page', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageData, targetPage: isGlobalChrome && !isPageScopedChrome ? undefined : targetPage, chromeScope: isPageScopedChrome ? 'page' : 'all', department: isGlobalChrome && !isPageScopedChrome ? 'Site-wide' : target.department }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not publish this page.');
      setUndoAvailable(Boolean(result.history?.at(-1)?.publicationType));
      if (isGlobalChrome && !isPageScopedChrome) {
        setPublishedPageUrl('');
        setNotice(`The site-wide ${chromeType === 'site-header' ? 'header' : 'footer'} has been updated across all pages.`);
      } else {
        const localSite = ['localhost', '127.0.0.1'].includes(window.location.hostname);
        const siteBase = process.env.NEXT_PUBLIC_UNI_URL || (localSite ? `${window.location.protocol}//${window.location.hostname}:3000` : 'https://web.uaf.edu.pk');
        setPublishedPageUrl(new URL(`/?page=${encodeURIComponent(targetPage)}`, siteBase).toString());
        setNotice(isGlobalChrome
          ? `The ${chromeType === 'site-header' ? 'header' : 'footer'} is now published only on ${target.label}.`
          : `“${title}” is now published to ${target.label}.`);
      }
    } catch (error) {
      setNotice(error.message || 'Could not publish this page.');
    } finally { setPublishing(false); }
  };

  const undoPublication = async () => {
    setUndoing(true);
    try {
      const response = await fetch('/api/undo-publication', { method: 'POST' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not undo the publication.');
      setUndoAvailable(false);
      setNotice(`Undid the publication of “${result.publication?.title || 'the page'}”. The previous published version has been restored.`);
    } catch (error) {
      setNotice(error.message || 'Could not undo the publication.');
    } finally { setUndoing(false); }
  };

  return <main className="min-h-screen bg-slate-100 px-4 py-8 font-sans text-slate-800 sm:px-8">
    <div className="mx-auto max-w-5xl">
      <button onClick={onBack} className="mb-5 flex items-center gap-2 text-sm font-semibold text-emerald-800"><ArrowLeft size={16}/> Back to Page Studio</button>
      <header className="mb-6"><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">UAF Page Studio · Admin</p><h1 className="mt-1 text-2xl font-bold">Review and publish</h1><p className="mt-1 text-sm text-slate-500">{isGlobalChrome ? 'Choose whether this shared component should appear on all pages or one selected page.' : 'Check your design, choose its destination, then publish it to the university website.'}</p></header>

      <section className="mb-8 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><div className="flex items-center gap-2 font-bold"><Eye size={17} className="text-emerald-700"/> Design preview</div><p className="mt-1 text-sm text-slate-500">{title} · {pageData?.elements?.length || 0} elements</p></div>
          <button type="button" onClick={downloadJson} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Download size={15}/> Save JSON</button>
        </div>
        <div className="mt-4"><PageDesignPreview page={pageData}/></div>
        {isGlobalChrome && <fieldset className="mt-5 rounded-xl border border-slate-200 p-3"><legend className="px-1 text-xs font-bold text-slate-600">Apply this {chromeType === 'site-header' ? 'header' : 'footer'} to</legend><div className="flex flex-wrap gap-x-6 gap-y-2 text-sm"><label className="flex cursor-pointer items-center gap-2"><input type="radio" name="chrome-scope" checked={publicationScope === 'all'} onChange={() => { setPublicationScope('all'); setTargetPage(''); }}/>All pages</label><label className="flex cursor-pointer items-center gap-2"><input type="radio" name="chrome-scope" checked={publicationScope === 'page'} onChange={() => setPublicationScope('page')}/>One page</label></div></fieldset>}
        {(!isGlobalChrome || isPageScopedChrome) && <div className="mt-5">
          <label className="block text-xs font-bold text-slate-600">Website page</label>
          <div className="relative mt-1.5"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={targetSearch} onChange={event => setTargetSearch(event.target.value)} placeholder="Search pages or faculties…" className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-700"/></div>
          {targetPage && <p className="mt-2 text-sm text-emerald-800">Selected: <strong>{getPublishTarget(targetPage, customMenu)?.label}</strong></p>}
          <div className="mt-2 max-h-72 overflow-auto rounded-xl border border-slate-200 bg-white p-2 text-sm">
            {mainTargets.some(target => matches(target.label)) && <details open className="rounded-lg"><summary className="cursor-pointer px-2 py-2 font-bold text-slate-800">Main website</summary><div className="ml-4 border-l border-slate-200 pl-3">{mainTargets.filter(target => matches(target.label)).map(target => <label key={target.value} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-emerald-50"><input type="radio" name="publish-target" checked={targetPage === target.value} onChange={() => setTargetPage(target.value)} />{target.label.replace('Main website — ', '')}</label>)}</div></details>}
            {faculties.map(faculty => {
              const tree = FACULTY_TREE.find(item => item.name === faculty.name);
              const searching = Boolean(targetSearch.trim());
              const visibleBranches = faculty.branches.map(branch => ({ ...branch, targets: branch.targets.filter(target => matches(`${faculty.name} ${branch.path} ${target.label}`)) })).filter(branch => branch.targets.length);
              if (!visibleBranches.length && !matches(faculty.name)) return null;
              return <details key={faculty.name} open={searching} className="rounded-lg"><summary className="cursor-pointer px-2 py-2 font-bold text-slate-800">{faculty.name}</summary><div className="ml-4 border-l border-slate-200 pl-3">{visibleBranches.map(branch => branch.path ? <details key={branch.path} open={searching}><summary className="cursor-pointer px-2 py-1.5 font-semibold text-slate-700">{branch.path}</summary><div className="ml-3 border-l border-slate-100 pl-2">{branch.targets.map(optionRow)}{!searching && tree && addControl(tree.id, tree.units.find(unit => unit.label === branch.path)?.id)}</div></details> : <div key="faculty-level">{branch.targets.map(optionRow)}{!searching && tree && addControl(tree.id, null)}</div>)}</div></details>;
            })}
            {!mainTargets.some(target => matches(target.label)) && !faculties.some(faculty => faculty.branches.some(branch => branch.targets.some(target => matches(`${faculty.name} ${branch.path} ${target.label}`))) || matches(faculty.name)) && <p className="px-3 py-5 text-center text-slate-500">No matching pages.</p>}
          </div>
        </div>}
        <button onClick={publish} disabled={publishing || ((!isGlobalChrome || isPageScopedChrome) && !targetPage) || !pageData?.elements?.length} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"><Upload size={16}/>{publishing ? 'Publishing…' : isGlobalChrome && !isPageScopedChrome ? 'Publish across all pages' : isPageScopedChrome ? 'Publish to selected page' : 'Publish to university website'}</button>
        {undoAvailable && <button type="button" onClick={undoPublication} disabled={undoing} className="ml-2 mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"><Undo2 size={16}/>{undoing ? 'Undoing…' : 'Undo publication'}</button>}
        {notice && <div role="status" className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"><p>{notice}</p>{publishedPageUrl && <a href={publishedPageUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block font-semibold text-emerald-800 underline">Open this page on the main website</a>}</div>}
        <details className="mt-5 rounded-xl border border-slate-200 bg-slate-50"><summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700">View page JSON</summary><pre className="max-h-96 overflow-auto border-t border-slate-200 p-4 text-xs leading-relaxed text-slate-700">{jsonText}</pre></details>
      </section>

    </div>
  </main>;
}
