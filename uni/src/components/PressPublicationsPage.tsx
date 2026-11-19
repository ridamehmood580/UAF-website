'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Users } from 'lucide-react';
import { PeopleProfileView, type PersonRecord } from './PeopleProfileView';

type Section = 'overview' | 'people' | 'oubm-home' | 'annual-report' | 'press-overview';
const official = 'https://web.uaf.edu.pk/Contents/directorates/publications';
const oubmPeople = [
  { name: 'Mr. Muzaffar Hussain Salik', designation: 'Principal Officer / Research Officer', phone: '+92 41 9201820 · Ext. 3444', email: 'po.publications@uaf.edu.pk' },
  { name: 'Mr. Muhammad Asif', designation: 'Artist', phone: '+92 41 9201820 · Ext. 3405', email: 'asifaasi@uaf.edu.pk' },
  { name: 'Mr. Muhammad Ismail', designation: 'Office Assistant', phone: '+92 41 9201820 · Ext. 3405', email: 'muhammad.ismail@uaf.edu.pk' },
  { name: 'Mr. Muhammad Amin', designation: 'Urdu Typist', phone: '+92 41 9201820 · Ext. 3405', email: 'muhammad.amin@uaf.edu.pk' },
  { name: 'Mr. Asif Mehmood', designation: 'Urdu Typist', phone: '+92 41 9201820 · Ext. 3405', email: 'asif.oubm@uaf.edu.pk' },
  { name: 'Mr. Qaisar Mehmood', designation: 'DPL', phone: '+92 41 9201820 · Ext. 3405', email: 'qaiser.dogar@uaf.edu.pk' },
];
const pressPeople = [{ name: 'Mr. Azmat Ali', designation: 'Artist', phone: '+92 41 9201820 · Ext. 3405', email: 'azmat.ali@uaf.edu.pk' }];
const pressResponsibilities = [
  ['Printing and publishing', 'Degrees, books, journals, magazines, newsletters, research reports, conference proceedings, abstract books, course outlines, and training manuals.'],
  ['Design and layout', 'Book covers, pamphlets, brochures, posters, banners, and professional layouts for University publications.'],
  ['Technical assistance', 'Printing and publishing support for University units, including manuscript composition, proofreading, and typesetting.'],
  ['Quality assurance', 'Printing quality, typographical standards, University branding, and Urdu and English language standards.'],
  ['Timely delivery', 'Coordinate production timelines for academic sessions, admissions, seminars, and official notices.'],
  ['Records and archiving', 'Maintain records and copies of printed material for future reference and institutional history.'],
  ['Coordination with OUBM', 'Work with the Office of University Books and Magazines on development, editing, and approval.'],
  ['Outreach and events', 'Support University outreach and event requirements with printed and designed materials.'],
];

export const PressPublicationsPage: React.FC<{ initialSection?: string; initialDepartment?: string }> = ({ initialSection, initialDepartment }) => {
  const [department, setDepartment] = useState<'oubm' | 'press' | null>(initialDepartment === 'oubm' || initialDepartment === 'press' ? initialDepartment : null);
  const sectionIsValid = (id: string | undefined): id is Section => ['overview', 'people', 'oubm-home', 'annual-report', 'press-overview'].includes(id || '');
  const defaultForDepartment = (dept: 'oubm' | 'press' | null): Section => dept === 'oubm' ? 'oubm-home' : dept === 'press' ? 'press-overview' : 'overview';
  const [active, setActive] = useState<Section>(sectionIsValid(initialSection) ? initialSection : defaultForDepartment(initialDepartment === 'oubm' || initialDepartment === 'press' ? initialDepartment : null));
  const [moreOpen, setMoreOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonRecord | null>(null);
  const currentTitle = active === 'overview' ? 'Overview' : active === 'people' ? 'Faculty & Staff' : active === 'annual-report' ? 'Annual Report' : active === 'press-overview' ? 'Overview' : active === 'oubm-home' ? 'Office of University Books & Magazines' : 'Directorate Home';
  const navigate = (id: Section, dept: 'oubm' | 'press' | null = department) => {
    setDepartment(dept);
    setActive(id);
    const url = new URL(window.location.href);
    if (dept) url.searchParams.set('department', dept); else url.searchParams.delete('department');
    if (id === 'overview' || id === 'oubm-home' || id === 'press-overview') url.searchParams.delete('section');
    else url.searchParams.set('section', id);
    window.history.replaceState({}, '', url);
    setDepartmentsOpen(false);
    setMoreOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const chooseDepartment = (dept: 'oubm' | 'press') => navigate(dept === 'oubm' ? 'oubm-home' : 'press-overview', dept);
  const shownPeople = department === 'oubm' ? oubmPeople : department === 'press' ? pressPeople : [...oubmPeople, ...pressPeople];
  if (selectedPerson) return <PeopleProfileView person={selectedPerson} onBack={() => setSelectedPerson(null)} />;

  return <main className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fa] font-sans text-stone-900">
    <section className="relative flex min-h-[380px] items-center overflow-hidden border-b border-[#c99738]/40 bg-[#071b2d] text-white sm:min-h-[440px]">
      <div className="absolute inset-0"><img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full scale-105 object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/75 via-[#071b2d]/50 to-[#071b2d]/25" /></div>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8"><div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300"><span className="h-2 w-2 rounded-full bg-[#e8a62a]" /> University Administration</div>
        <h1 className="font-serif-heading text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-[42px]">{department === 'oubm' ? <>Office of University <span className="font-medium italic text-[#e8a62a]">Books &amp; Magazines</span></> : department === 'press' ? <>University <span className="font-medium italic text-[#e8a62a]">Press</span></> : <>Directorate of <span className="font-medium italic text-[#e8a62a]">Press &amp; Publications</span></>}</h1>
        <p className="max-w-3xl text-sm font-medium leading-relaxed text-white drop-shadow-md sm:text-base">{department === 'oubm' ? 'University periodicals, books, reports, and educational materials for the community.' : department === 'press' ? 'Printing, publishing, design, and production services for the University.' : 'Planning, producing, and sharing University publications that support academic work, research, and outreach.'}</p>
        {!department && <div className="flex flex-wrap gap-2.5 pt-2 text-xs font-medium text-stone-100"><span className="rounded-lg border border-white/15 bg-black/40 px-3.5 py-2">Office of University Books &amp; Magazines</span><span className="rounded-lg border border-white/15 bg-black/40 px-3.5 py-2">University Press</span></div>}
      </div></div>
    </section>

    <div className="relative z-30 -mt-6 flex justify-center px-3 sm:-mt-7 sm:px-6"><nav aria-label="Directorate of Press and Publications sections" className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-[#c99738]/80 bg-[#071b2d] px-2.5 py-1.5 text-xs font-bold text-white shadow-[0_12px_32px_rgba(7,27,45,0.4)] sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-2 sm:text-[13px]">
      {!department && <>
        <button type="button" onClick={() => navigate('overview', null)} aria-current={active === 'overview' ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === 'overview' ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>Overview</button>
        <button type="button" onClick={() => navigate('people', null)} aria-current={active === 'people' ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === 'people' ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>Faculty &amp; Staff</button>
        <div className="relative shrink-0" onMouseEnter={() => setDepartmentsOpen(true)} onMouseLeave={() => setDepartmentsOpen(false)}>
          <button type="button" aria-haspopup="menu" aria-expanded={departmentsOpen} onClick={() => setDepartmentsOpen((open) => !open)} className={`flex items-center gap-1.5 rounded-full px-3 py-2 transition sm:px-3.5 ${departmentsOpen ? 'bg-[#163887] ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>Departments <ChevronDown className={`h-3.5 w-3.5 transition-transform ${departmentsOpen ? 'rotate-180' : ''}`} /></button>
          {departmentsOpen && <div role="menu" className="absolute left-0 top-full z-50 w-60 pt-2"><div className="overflow-hidden rounded-2xl border border-[#c99738]/50 bg-[#071b2d] py-2 text-white shadow-2xl"><button type="button" role="menuitem" onClick={() => chooseDepartment('oubm')} className="block w-full px-4 py-3 text-left text-sm font-bold transition hover:bg-[#163887]">OUBM</button><button type="button" role="menuitem" onClick={() => chooseDepartment('press')} className="block w-full px-4 py-3 text-left text-sm font-bold transition hover:bg-[#163887]">University Press</button></div></div>}
        </div>
      </>}
      {department === 'oubm' && <>
        <button type="button" onClick={() => navigate('overview', null)} className="shrink-0 rounded-full px-3 py-2 transition hover:bg-[#163887] sm:px-3.5">Directorate Home</button>
        <button type="button" onClick={() => navigate('people', 'oubm')} aria-current={active === 'people' ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === 'people' ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>Faculty &amp; Staff</button>
        <button type="button" onClick={() => navigate('annual-report', 'oubm')} aria-current={active === 'annual-report' ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === 'annual-report' ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>Annual Report</button>
      </>}
      {department === 'press' && <>
        <button type="button" onClick={() => navigate('overview', null)} className="shrink-0 rounded-full px-3 py-2 transition hover:bg-[#163887] sm:px-3.5">Directorate Home</button>
        <button type="button" onClick={() => navigate('press-overview', 'press')} aria-current={active === 'press-overview' ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === 'press-overview' ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>Overview</button>
        <button type="button" onClick={() => navigate('people', 'press')} aria-current={active === 'people' ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === 'people' ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>Faculty &amp; Staff</button>
      </>}
    </nav></div>

    <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">{department === 'oubm' ? 'Office of University Books & Magazines' : department === 'press' ? 'University Press' : 'Directorate of Press & Publications'}</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">{currentTitle}</h2></div>
      {active === 'overview' && <div className="flow-root rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9">
        <figure className="mb-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm md:float-right md:ml-6 md:w-[360px]"><img src="/uaf_historic_campus.jpg" alt="University of Agriculture Faisalabad" className="h-56 w-full object-cover" /><figcaption className="border-t border-stone-200 bg-stone-50 p-3 text-xs font-semibold text-stone-700">University of Agriculture, Faisalabad</figcaption></figure>
        <p className="text-base leading-8 text-stone-700">The Directorate of Press &amp; Publications oversees the planning, production, and dissemination of University publications that promote academic, research, and outreach activities. It functions under the administrative and financial supervision of the Principal Officer, Press &amp; Publications.</p>
        <p className="mt-5 text-base leading-8 text-stone-700">The Directorate consists of two components: the Office of University Books &amp; Magazines (OUBM) and the University Press. Together, they publish periodicals, books, educational materials, institutional reports, newsletters, and campus news, and provide printing, design, and production support across the University.</p>
      </div>}

      {active === 'oubm-home' && <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9"><p className="text-base leading-8 text-stone-700">The Office of University Books and Magazines develops publications for students, researchers, farmers, and the wider public. Its work includes University periodicals, educational and informative materials, and institutional publications.</p><div className="mt-7 grid gap-4 md:grid-cols-3">{[
        ['University periodicals', 'Quarterly Zarai Digest, Kisht-e-Nau student magazine, special thematic editions, and Istara alumni magazine.'],
        ['Educational materials', 'Books, technical manuals, research and departmental reports, pamphlets, brochures, and outreach material.'],
        ['Institutional publications', 'Annual reports, newsletters, and weekly Campus News covering developments across the University.'],
      ].map(([title, body]) => <article key={title} className="rounded-2xl border border-stone-200 border-t-4 border-t-[#c99738] bg-stone-50 p-5"><h3 className="font-bold text-[#163887]">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{body}</p></article>)}</div></div>}

      {active === 'press-overview' && <div><p className="mb-6 text-base leading-8 text-stone-700">The University Press supports the dissemination of knowledge, research, and institutional communication. It works with the OUBM and University departments to take publications from manuscript and design through printing and delivery.</p><div className="grid gap-4 md:grid-cols-2">{pressResponsibilities.map(([title, body], index) => <article key={title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#163887] text-sm font-bold text-white">{index + 1}</span><h3 className="mt-3 font-bold text-[#163887]">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{body}</p></article>)}</div></div>}

      {active === 'annual-report' && <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9"><p className="text-base leading-8 text-stone-700">The Office of University Books &amp; Magazines contributes to the University’s institutional reporting and publications. The latest available UAF Annual Report includes information about OUBM and University publishing activities.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><a href="https://web.uaf.edu.pk/UploadFiles/UAFAnualReport/4381f032-04fb-4a85-9f2d-8e0adc426a54.pdf" target="_blank" rel="noreferrer" className="rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-stone-50 p-5 transition hover:border-[#c99738] hover:shadow-md"><span className="text-xs font-bold uppercase tracking-wider text-[#c99738]">Latest report</span><h3 className="mt-2 text-lg font-bold text-[#163887]">UAF Annual Report 2024–25</h3><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#163887]">Open report <ExternalLink className="h-4 w-4" /></span></a><a href="https://web.uaf.edu.pk/UploadFiles/UAFAnualReport/9ad0bba6-3bb6-4ae7-a7e0-1a19e56e0641.pdf" target="_blank" rel="noreferrer" className="rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:border-[#c99738] hover:shadow-md"><span className="text-xs font-bold uppercase tracking-wider text-[#c99738]">Previous report</span><h3 className="mt-2 text-lg font-bold text-[#163887]">UAF Annual Report 2023–24</h3><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#163887]">Open report <ExternalLink className="h-4 w-4" /></span></a></div></div>}

      {active === 'people' && <div><div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 border-b-4 border-b-[#c9cf9b] bg-white px-6 py-6 shadow-sm"><div><p className="text-xs font-bold uppercase tracking-[0.12em]">{department === 'oubm' ? 'Office of University Books & Magazines' : department === 'press' ? 'University Press' : 'Directorate of Press & Publications'}</p><h3 className="mt-2 text-2xl font-extrabold text-stone-950">Faculty &amp; Staff</h3><p className="mt-1 text-sm text-stone-500">University directory listings.</p></div><span className="text-sm text-stone-500">Directory team and contact information</span></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{shownPeople.map((person) => <article key={person.email} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex aspect-square items-center justify-center bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 text-slate-400"><Users className="h-20 w-20" strokeWidth={1.25} /></div><div className="space-y-2.5 p-4 sm:p-5"><h3 className="text-lg font-extrabold leading-snug text-stone-950">{person.name}</h3><p className="text-sm text-stone-700">{person.designation}</p><p className="text-sm text-stone-600">{person.phone}</p><a href={`mailto:${person.email}`} className="block break-all text-sm text-[#163887] hover:underline">{person.email}</a><button type="button" onClick={() => setSelectedPerson({ name: person.name, designation: person.designation, phone: person.phone, email: person.email, departmentName: department === 'oubm' ? 'Office of University Books & Magazines' : department === 'press' ? 'University Press' : 'Directorate of Press & Publications' })} className="mt-2 w-full rounded-lg bg-[#071b2d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#163887]">View Profile</button></div></article>)}</div><p className="mt-4 text-xs text-stone-500">Staff and contact information for this office.</p></div>}
    </section>
  </main>;
};
