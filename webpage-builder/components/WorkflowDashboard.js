'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, ChevronRight, Clock3, Eye, FileJson2, Send, ShieldCheck, Upload, X } from 'lucide-react';
import PrimitiveRenderer from './PrimitiveRenderer';

const KEY = 'uaf-page-approval-workflow-v1';
const FACULTY_PAGES = {
  'Faculty of Agriculture': ['fac-agri', [['agronomy', 'Agronomy'], ['entomology', 'Entomology'], ['plant-pathology', 'Plant Pathology'], ['plant-breeding', 'Plant Breeding & Genetics'], ['forestry', 'Forestry & Range Management'], ['horticulture', 'Institute of Horticultural Sciences'], ['soil-sciences', 'Institute of Soil and Environmental Sciences'], ['cabb', 'Centre of Agricultural Biochemistry & Biotechnology']]],
  'Faculty of Veterinary Science': ['fac-vet', [['vet-anatomy', 'Veterinary Anatomy & Histology'], ['vet-pathology', 'Veterinary Pathology'], ['vet-parasitology', 'Veterinary Parasitology'], ['vet-cms', 'Clinical Medicine & Surgery'], ['vet-theriogenology', 'Animal Reproduction & Theriogenology'], ['vet-epidemiology', 'Epidemiology & Public Health'], ['vet-microbiology', 'Institute of Microbiology'], ['vet-physiology', 'Institute of Physiology & Pharmacology']]],
  'Faculty of Sciences': ['fac-sci', [['sci-cs', 'Computer Science'], ['sci-botany', 'Botany'], ['sci-zoology', 'Zoology, Wildlife & Fisheries'], ['sci-chemistry', 'Chemistry'], ['sci-biochemistry', 'Biochemistry'], ['sci-physics', 'Physics'], ['sci-math', 'Mathematics & Statistics'], ['sci-cabb', 'Centre of Agricultural Biochemistry & Biotechnology'], ['sci-hitech', 'Central Hi-Tech Laboratory']]],
  'Faculty of Animal Husbandry': ['fac-husbandry', [['ah-livestock', 'Livestock Management'], ['ah-breeding', 'Animal Breeding & Genetics'], ['ah-nutrition', 'Animal Nutrition'], ['ah-poultry', 'Poultry Science'], ['ah-iads', 'Institute of Animal & Dairy Sciences']]],
  'Faculty of Agriculture Engineering and Technology': ['fac-engg', [['engg-machinery', 'Farm Machinery & Power'], ['engg-irrigation', 'Irrigation & Drainage'], ['engg-structures', 'Structures & Environmental Engineering'], ['engg-food', 'Food, Energy & Process Engineering'], ['engg-fiber', 'Fiber & Textile Technology'], ['engg-wmrc', 'Water Management Research Centre']]],
  'Faculty of Social Sciences': ['fac-social', [['soc-sociology', 'Rural Sociology'], ['soc-iare', 'Institute of Agricultural & Resource Economics'], ['soc-iaeerd', 'Institute of Agricultural Extension & Rural Development'], ['soc-ibms', 'Institute of Business Management Sciences']]],
  'Faculty of Food, Nutrition and Home Sciences': ['fac-food', [['food-hnd', 'Human Nutrition & Dietetics'], ['food-safety', 'Food Safety & Quality Management'], ['food-nifsat', 'National Institute of Food Science & Technology'], ['food-homesci', 'Institute of Home Sciences']]],
  'Faculty of Arts and Humanities': ['fac-arts', [['arts-english', 'English & Linguistics'], ['arts-islamic', 'Islamic Studies'], ['arts-pakstudies', 'Pakistan Studies, History & Anthropology'], ['arts-design', 'Art & Design'], ['arts-languages', 'Chinese & International Languages Center']]],
  'Faculty of Health and Pharmaceutical Sciences': ['fac-health', [['health-pharmacology', 'Pharmacology & Toxicology'], ['health-pharmaceutics', 'Pharmaceutics & Clinical Pharmacy'], ['health-chem', 'Pharmaceutical Chemistry'], ['health-pharmacy', 'Institute of Pharmacy']]],
};
const DEPARTMENT_TARGETS = Object.fromEntries(Object.entries(FACULTY_PAGES).map(([department, [facultyId, units]]) => [department, [
  [`faculty:${facultyId}:overview`, 'Faculty overview'],
  [`faculty:${facultyId}:dean`, "Dean's Secretariat"],
  [`faculty:${facultyId}:undergraduate`, 'Undergraduate programs'],
  [`faculty:${facultyId}:postgraduate`, 'Postgraduate studies'],
  [`faculty:${facultyId}:internship`, 'Internship program'],
  [`faculty:${facultyId}:short-courses`, 'Short courses'],
  [`faculty:${facultyId}:portfolio`, 'Portfolio & research'],
  ...units.flatMap(([unitId, label]) => [
    [`faculty:${facultyId}:unit:${unitId}:overview`, `${label} — Overview`],
    [`faculty:${facultyId}:unit:${unitId}:staff`, `${label} — Faculty & Staff`],
    [`faculty:${facultyId}:unit:${unitId}:portfolio`, `${label} — Research & Publications`],
  ]),
]]));
const DEPARTMENTS = Object.keys(DEPARTMENT_TARGETS);
const INSTITUTE_IDS = new Set(['horticulture', 'soil-sciences', 'vet-microbiology', 'vet-physiology', 'sci-hitech', 'ah-iads', 'soc-iare', 'soc-iaeerd', 'soc-ibms', 'food-nifsat', 'food-homesci', 'health-pharmacy']);
const CENTER_IDS = new Set(['cabb', 'sci-cabb', 'engg-wmrc', 'arts-languages']);
const PAGE_GROUPS = [['faculty', 'Faculty pages'], ['department', 'Departments'], ['institute', 'Institutes'], ['center', 'Centers & laboratories']];
const PAGE_VIEWS = [['overview', 'Overview'], ['staff', 'Faculty & Staff'], ['portfolio', 'Research & Publications']];
const getUnitsForGroup = (department, group) => (FACULTY_PAGES[department]?.[1] || []).filter(([id]) => group === 'institute' ? INSTITUTE_IDS.has(id) : group === 'center' ? CENTER_IDS.has(id) : group === 'department' ? !INSTITUTE_IDS.has(id) && !CENTER_IDS.has(id) : false);
const buildDepartmentTree = department => {
  const [facultyId] = FACULTY_PAGES[department] || [];
  if (!facultyId) return [];
  const facultyPages = (DEPARTMENT_TARGETS[department] || []).filter(([target]) => !target.includes(':unit:'));
  return [
    { id: 'faculty-pages', label: 'Faculty pages', children: facultyPages.map(([target, label]) => ({ id: target, label, target })) },
    ...PAGE_GROUPS.slice(1).map(([group, label]) => ({ id: group, label, children: getUnitsForGroup(department, group).map(([unitId, unitLabel]) => ({ id: unitId, label: unitLabel, children: PAGE_VIEWS.map(([view, viewLabel]) => ({ id: `${unitId}-${view}`, label: viewLabel, target: `faculty:${facultyId}:unit:${unitId}:${view}` })) })) })),
  ];
};
const readItems = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };

export default function WorkflowDashboard({ pageData, onBack, initialRole = 'designer', onLogout }) {
  const role = initialRole;
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [notice, setNotice] = useState('');
  const [reviewTab, setReviewTab] = useState('pending');
  const [search, setSearch] = useState('');
  const [departmentById, setDepartmentById] = useState({});
  const [expandedTreeById, setExpandedTreeById] = useState({});
  const [targetById, setTargetById] = useState({});

  const saveItems = next => { setItems(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { setNotice('Could not cache workflow data in this browser.'); } };
  const latest = useMemo(() => [...items].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)), [items]);
  const refreshItems = async (migrateLocal = false) => {
    try {
      let response = await fetch('/api/page-workflow', { cache: 'no-store' });
      let result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not load submissions.');
      if (migrateLocal) {
        const serverIds = new Set((result.items || []).map(item => item.id));
        const oldPendingItems = readItems().filter(item => item.status === 'pending' && !serverIds.has(item.id));
        for (const item of oldPendingItems) {
          await fetch('/api/page-workflow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'submit', item }) });
        }
        if (oldPendingItems.length) {
          response = await fetch('/api/page-workflow', { cache: 'no-store' });
          result = await response.json();
        }
      }
      if (response.ok && Array.isArray(result.items)) saveItems(result.items);
    } catch (error) {
      setNotice(error.message || 'Could not connect to the shared page review queue.');
    }
  };
  useEffect(() => {
    refreshItems(true);
    const refresh = () => refreshItems(false);
    window.addEventListener('storage', refresh);
    window.addEventListener('uaf-approval-updated', refresh);
    window.addEventListener('focus', refresh);
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('uaf-approval-updated', refresh); window.removeEventListener('focus', refresh); };
  }, []);
  const submit = async () => {
    if (!pageData?.elements?.length) { setNotice('Add page content before submitting it for review.'); return; }
    const item = { id: `${pageData.draftId || 'page'}-${Date.now()}`, title: pageData.meta?.title || 'Untitled page', author: pageData.meta?.author || 'Designer', data: JSON.parse(JSON.stringify(pageData)), createdAt: new Date().toISOString() };
    try {
      const response = await fetch('/api/page-workflow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'submit', item }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not submit this design.');
      const next = [result.item, ...items.filter(existing => existing.id !== result.item.id)];
      saveItems(next); setNotice('Design submitted to the superadmin review queue.');
    } catch (error) { setNotice(error.message || 'Could not submit this design.'); }
  };
  const review = async (item, status) => {
    try {
      const response = await fetch('/api/page-workflow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'review', id: item.id, status, feedback: feedback[item.id] || '' }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not review this design.');
      const next = items.map(entry => entry.id === item.id ? result.item : entry);
      saveItems(next); window.dispatchEvent(new Event('uaf-approval-updated'));
      setNotice(status === 'approved' ? 'Design accepted and sent to the admin profile.' : 'Design rejected and returned with your review note.');
    } catch (error) { setNotice(error.message || 'Could not review this design.'); }
  };
  const publish = async item => {
    const department = departmentById[item.id] || '';
    const targetPage = targetById[item.id] || '';
    if (!department || !targetPage) { setNotice('Choose a department and one of its pages before publishing.'); return; }
    try {
      const response = await fetch('/api/publish-uni-page', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, department, targetPage }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not publish this page.');
      saveItems(items.map(entry => entry.id === item.id ? result.item : entry));
      window.dispatchEvent(new Event('uaf-approval-updated'));
      setNotice(`Published “${item.title}” to ${department}.`);
    } catch (error) { setNotice(error.message || 'Could not publish this page.'); }
  };
  const visible = role === 'designer' ? latest : latest.filter(item => item.status === 'pending');

  if (role === 'superadmin') {
    const matchingItems = latest.filter(item => {
      const inTab = reviewTab === 'all' || item.status === reviewTab;
      const term = search.trim().toLowerCase();
      return inTab && (!term || `${item.title} ${item.author} ${item.department || ''} ${item.targetPage || ''}`.toLowerCase().includes(term));
    });
    const count = status => items.filter(item => item.status === status).length;
    return <main className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-[#092b25] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/20 text-emerald-200"><ShieldCheck size={23}/></div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">UAF Page Studio</p><h1 className="text-2xl font-bold">Superadmin dashboard</h1></div></div>
          <div className="flex items-center gap-3"><span className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-emerald-100">Signed in as Superadmin</span><button onClick={onLogout} className="rounded-lg border border-white/25 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10">Sign out</button></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-bold">Design approvals</h2><p className="mt-1 text-sm text-slate-500">Review submitted pages and decide which designs can move to the admin team.</p></div><span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">{count('pending')} awaiting review</span></div>
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStat label="Awaiting review" value={count('pending')} tone="amber" icon={<Clock3 size={18}/>} />
          <DashboardStat label="Accepted" value={count('approved')} tone="green" icon={<Check size={18}/>} />
          <DashboardStat label="Rejected" value={count('rejected')} tone="rose" icon={<X size={18}/>} />
          <DashboardStat label="Published" value={count('published')} tone="blue" icon={<Upload size={18}/>} />
        </div>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div><h3 className="font-bold">Submitted designs</h3><p className="mt-1 text-xs text-slate-500">Open a preview to inspect the page before you make a decision.</p></div>
            <label className="relative block"><span className="sr-only">Search submitted designs</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search designs or authors" className="w-64 max-w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700" /></label>
          </div>
          <div className="flex flex-wrap gap-2 border-b border-slate-100 px-5 py-3">{[['pending','Needs review'],['approved','Accepted'],['rejected','Rejected'],['all','All designs']].map(([value,label]) => <button key={value} onClick={() => setReviewTab(value)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${reviewTab === value ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{label}{value !== 'all' && <span className="ml-1.5 opacity-75">{count(value)}</span>}</button>)}</div>
          <div className="space-y-4 p-4 sm:p-5">{matchingItems.length ? matchingItems.map(item => <article key={item.id} className="rounded-xl border border-slate-200 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><h4 className="text-lg font-bold">{item.title}</h4><p className="mt-1 text-sm text-slate-500">Submitted by {item.author} · {new Date(item.createdAt).toLocaleString()}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === 'pending' ? 'bg-amber-100 text-amber-800' : item.status === 'rejected' ? 'bg-rose-100 text-rose-800' : item.status === 'published' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>{item.status}</span></div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-1.5"><FileJson2 size={15}/>{item.data?.elements?.length || 0} elements</span><span>Last updated {new Date(item.updatedAt).toLocaleString()}</span></div>
            <PageDesignPreview page={item.data}/>
            <JsonDesignPreview page={item.data}/>
            {item.feedback && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700"><b>Review note:</b> {item.feedback}</p>}
            {item.status === 'pending' && <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_auto_auto]"><label className="text-xs font-semibold text-slate-700">Note for designer<textarea value={feedback[item.id] ?? ''} onChange={event => setFeedback({ ...feedback, [item.id]: event.target.value })} rows={2} className="mt-1 block w-full rounded-lg border border-slate-300 p-2 text-sm font-normal outline-none focus:border-emerald-700" placeholder="Optional feedback or reason for rejection"/></label><button onClick={() => review(item, 'approved')} className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-bold text-white hover:bg-emerald-800"><Check size={16}/> Accept design</button><button onClick={() => review(item, 'rejected')} className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-rose-700 px-4 text-sm font-bold text-white hover:bg-rose-800"><X size={16}/> Reject</button></div>}
          </article>) : <div className="rounded-xl border border-dashed border-slate-300 px-6 py-16 text-center"><div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400"><FileJson2 size={22}/></div><h4 className="font-bold">{reviewTab === 'pending' ? 'No designs awaiting review' : 'No matching designs'}</h4><p className="mt-1 text-sm text-slate-500">{search ? 'Try another search term.' : 'Submitted designs will appear here.'}</p></div>}</div>
        </section>
        <p className="mt-5 text-xs text-slate-500">Design submissions are saved in this browser and available here at the same Page Studio address.</p>
      </div>
    </main>;
  }

  return <main className="min-h-screen bg-slate-100 px-4 py-8 font-sans text-slate-800 sm:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><button onClick={onBack} className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-800"><ArrowLeft size={16}/> Back to Page Studio</button><h1 className="text-2xl font-bold">Page design workflow</h1><p className="mt-1 text-sm text-slate-500">Submit designs for superadmin review and track their decisions.</p></div>
        {role !== 'superadmin' && <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-600">Designer submissions</span>}
      </div>
      <div className="mb-6 flex flex-wrap gap-2"><div className="rounded-full bg-emerald-800 px-3 py-1.5 text-xs font-bold text-white">1. Designer submission</div><div className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500">2. Superadmin review</div><div className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500">3. Admin publish on this page</div></div>
      {role === 'designer' && <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"><div><div className="flex items-center gap-2 font-bold"><Send size={17} className="text-emerald-700"/> Submit current design</div><p className="mt-1 text-sm text-slate-500">{pageData.meta?.title || 'Untitled page'} · {pageData.elements?.length || 0} elements</p></div><button onClick={submit} className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">Send to superadmin</button></section>}
      <section className="space-y-3">{visible.length ? visible.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-bold">{item.title}</h2><p className="mt-1 text-xs text-slate-500">By {item.author} · {new Date(item.createdAt).toLocaleString()}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === 'pending' ? 'bg-amber-100 text-amber-800' : item.status === 'rejected' ? 'bg-rose-100 text-rose-800' : item.status === 'published' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>{item.status}</span></div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500"><FileJson2 size={15}/>{item.data?.elements?.length || 0} elements · JSON design</div>
        <PageDesignPreview page={item.data} />
        {item.feedback && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">Review note: {item.feedback}</p>}
        {role === 'designer' && item.status === 'approved' && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <div className="mb-3"><h3 className="text-sm font-bold text-emerald-950">Accepted — ready for admin publishing</h3><p className="mt-1 text-xs text-slate-600">Follow the site hierarchy to choose exactly which department page to update.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <label className="text-xs font-bold text-slate-600">1. Faculty<select value={departmentById[item.id] || ''} onChange={event => { const next = event.target.value; setDepartmentById({ ...departmentById, [item.id]: next }); setPageGroupById({ ...pageGroupById, [item.id]: '' }); setUnitById({ ...unitById, [item.id]: '' }); setPageViewById({ ...pageViewById, [item.id]: '' }); setTargetById({ ...targetById, [item.id]: '' }); }} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal"><option value="">Choose faculty</option>{DEPARTMENTS.map(value => <option key={value}>{value}</option>)}</select></label>
            <label className="text-xs font-bold text-slate-600">2. Page group<select value={pageGroupById[item.id] || ''} onChange={event => { setPageGroupById({ ...pageGroupById, [item.id]: event.target.value }); setUnitById({ ...unitById, [item.id]: '' }); setPageViewById({ ...pageViewById, [item.id]: '' }); setTargetById({ ...targetById, [item.id]: '' }); }} disabled={!departmentById[item.id]} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal disabled:bg-slate-100"><option value="">{departmentById[item.id] ? 'Choose page group' : 'Choose faculty first'}</option>{PAGE_GROUPS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="text-xs font-bold text-slate-600">3. {pageGroupById[item.id] === 'faculty' ? 'Faculty page' : 'Department / unit'}<select value={pageGroupById[item.id] === 'faculty' ? targetById[item.id] || '' : unitById[item.id] || ''} onChange={event => { const value = event.target.value; if (pageGroupById[item.id] === 'faculty') setTargetById({ ...targetById, [item.id]: value }); else { setUnitById({ ...unitById, [item.id]: value }); setPageViewById({ ...pageViewById, [item.id]: '' }); setTargetById({ ...targetById, [item.id]: '' }); } }} disabled={!pageGroupById[item.id]} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal disabled:bg-slate-100"><option value="">{!pageGroupById[item.id] ? 'Choose page group first' : pageGroupById[item.id] === 'faculty' ? 'Choose faculty page' : 'Choose department or unit'}</option>{pageGroupById[item.id] === 'faculty' ? (DEPARTMENT_TARGETS[departmentById[item.id]] || []).filter(([id]) => !id.includes(':unit:')).map(([id, label]) => <option key={id} value={id}>{label}</option>) : getUnitsForGroup(departmentById[item.id], pageGroupById[item.id]).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
            {pageGroupById[item.id] !== 'faculty' && <label className="text-xs font-bold text-slate-600">4. Page view<select value={pageViewById[item.id] || ''} onChange={event => { const view = event.target.value; setPageViewById({ ...pageViewById, [item.id]: view }); const [facultyId] = FACULTY_PAGES[departmentById[item.id]] || []; const unitId = unitById[item.id]; setTargetById({ ...targetById, [item.id]: view && unitId ? `faculty:${facultyId}:unit:${unitId}:${view}` : '' }); }} disabled={!unitById[item.id]} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal disabled:bg-slate-100"><option value="">{unitById[item.id] ? 'Choose page view' : 'Choose a department or unit first'}</option>{PAGE_VIEWS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
          </div>
          <button onClick={() => publish(item)} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800"><Upload size={16}/> Publish to uni site</button>
        </div>}
        {role === 'superadmin' && <div className="mt-4 flex flex-wrap items-end gap-3"><label className="min-w-56 flex-1 text-xs font-semibold">Review note<textarea value={feedback[item.id] ?? item.feedback ?? ''} onChange={e => setFeedback({ ...feedback, [item.id]: e.target.value })} rows={2} className="mt-1 block w-full rounded-lg border border-slate-300 p-2 text-sm font-normal" placeholder="Optional feedback for the designer"/></label><button onClick={() => review(item, 'approved')} className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white"><Check size={16}/> Accept</button><button onClick={() => review(item, 'rejected')} className="flex items-center gap-2 rounded-lg bg-rose-700 px-4 py-2.5 text-sm font-bold text-white"><X size={16}/> Reject</button></div>}
        {item.status === 'published' && <p className="mt-3 text-sm font-semibold text-blue-800">Target: {item.department} / {item.targetPage}</p>}
      </article>) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-sm text-slate-500"><Clock3 className="mx-auto mb-3 text-slate-300"/>{role === 'superadmin' ? 'No designs are waiting for review.' : 'Your submitted designs will appear here.'}</div>}</section>
      {notice && <div role="status" className="fixed bottom-5 right-5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl">{notice}<button className="ml-4 text-slate-300" onClick={() => setNotice('')} aria-label="Dismiss">×</button></div>}
    </div>
  </main>;
}

function DashboardStat({ label, value, tone, icon }) {
  const styles = { amber: 'bg-amber-50 text-amber-800', green: 'bg-emerald-50 text-emerald-800', rose: 'bg-rose-50 text-rose-800', blue: 'bg-blue-50 text-blue-800' };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-500">{label}</span><span className={`grid h-9 w-9 place-items-center rounded-xl ${styles[tone]}`}>{icon}</span></div><p className="mt-3 text-3xl font-bold text-slate-900">{value}</p></div>;
}

export function PageDesignPreview({ page }) {
  const [scale, setScale] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [container, setContainer] = useState(null);
  const elements = page?.elements || [];
  const contentHeight = Math.max(420, ...elements.map(element => (element.y || 0) + (element.height || 100) + 32));

  useEffect(() => {
    if (!container) return;
    const updateScale = () => setScale(Math.min(1, container.clientWidth / 1200));
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, [container]);

  return <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
    <button type="button" onClick={() => setExpanded(open => !open)} aria-expanded={expanded} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold text-emerald-900 hover:bg-emerald-50">
      <Eye size={16}/>{expanded ? 'Hide design preview' : 'Preview submitted design'}<span className="ml-auto text-xs font-medium text-slate-500">{page?.meta?.title || 'Untitled page'}</span>
    </button>
    {expanded && <div ref={setContainer} className="max-h-[70vh] overflow-auto border-t border-slate-200 p-3">
      <div className="mx-auto overflow-hidden bg-white shadow-sm" style={{ width: '100%', maxWidth: 1200, height: contentHeight * scale }}>
        <div className="relative origin-top-left bg-white" style={{ width: 1200, height: contentHeight, transform: `scale(${scale})` }}>
          {elements.map(element => <div key={element.id} style={{ position: 'absolute', left: element.x || 0, top: element.y || 0, width: element.width || 260, minHeight: element.height || 80 }}>
            <PrimitiveRenderer el={element} isEditing={false}/>
          </div>)}
        </div>
      </div>
      {!elements.length && <p className="p-8 text-center text-sm text-slate-500">This design has no page elements.</p>}
    </div>}
  </section>;
}

function JsonDesignPreview({ page }) {
  const [expanded, setExpanded] = useState(false);
  return <section className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
    <button type="button" onClick={() => setExpanded(open => !open)} aria-expanded={expanded} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50">
      <FileJson2 size={16} className="text-emerald-800"/>{expanded ? 'Hide JSON page data' : 'View page as JSON'}<span className="ml-auto text-xs font-medium text-slate-500">{page?.elements?.length || 0} elements</span>
    </button>
    {expanded && <pre className="max-h-[28rem] overflow-auto border-t border-slate-200 bg-slate-950 p-4 text-xs leading-5 text-emerald-100" tabIndex={0}><code>{JSON.stringify(page ?? {}, null, 2)}</code></pre>}
  </section>;
}

