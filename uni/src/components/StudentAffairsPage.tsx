'use client';

import React, { useState } from 'react';
import { ArrowDownToLine, ChevronDown, Mail, Phone, UserRound } from 'lucide-react';
import { PeopleProfileView, type PersonRecord } from './PeopleProfileView';

type Section = 'overview' | 'objectives' | 'functions' | 'staff' | 'bidding';
const sections: { id: Section; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'functions', label: 'Functions and Components' },
  { id: 'staff', label: 'Administration & Staff' },
];
const staff: { name: string; role: string; expertise: string; ext: string; email: string; phone?: string }[] = [
  { name: 'Dr. Rana Nadeem Abbas', role: 'Director Students Affairs', expertise: 'Agronomy', ext: '4405, 3800', email: 'rnabbas@uaf.edu.pk', phone: '041-9200645' },
  { name: 'Dr. Nazia Ehsan', role: 'Associate Director Students Affairs', expertise: 'Zoology, Wildlife & Fisheries', ext: '3308', email: 'naziaeuaf@gmail.com' },
  { name: 'Dr. Syed Summar Abbas', role: 'Associate Director Students Affairs', expertise: 'Horticultural Sciences', ext: '2958', email: 'summar.naqvi@uaf.edu.pk', phone: '041-9200287' },
  { name: 'Dr. Iftikhar Ahmad', role: 'Associate Director Students Affairs', expertise: 'Horticultural Sciences', ext: '2956', email: 'iahmad@uaf.edu.pk' },
  { name: 'Dr. Abid Ali', role: 'Associate Director Students Affairs', expertise: 'Entomology', ext: '3800', email: 'abid.ali@uaf.edu.pk' },
  { name: 'Dr. Sahar Munir', role: 'Deputy Director Students Affairs', expertise: 'Business Management Sciences', ext: '2815', email: 'sahar.munir@uaf.edu.pk' },
  { name: 'Dr. Faiz Ahmad Joiya', role: 'Deputy Director Students Affairs', expertise: 'Plant Molecular Biology and Biotechnology', ext: '2925', email: 'faizahmad1980@gmail.com' },
  { name: 'Dr. Zaheer Ahmad', role: 'Deputy Director Students Affairs', expertise: 'Plant Breeding and Genetics', ext: '3800', email: 'zahmed758@gmail.com' },
  { name: 'Dr. Muhammad Adnan Iqbal', role: 'Deputy Director Students Affairs', expertise: 'Chemistry', ext: '3800', email: 'adnan.iqbal@uaf.edu.pk' },
  { name: 'Dr. Hassan Zulfiqar', role: 'Deputy Director Students Affairs', expertise: 'Economics / Agricultural Economics', ext: '2828', email: 'hasan.zulfiqar@uaf.edu.pk' },
  { name: 'Rana Dawood Naseer', role: 'Deputy Director Students Affairs', expertise: 'Pharmacy', ext: '3800', email: 'dawoodpharmacologist@gmail.com' },
  { name: 'Dr. Muhammad Ahsan Khan', role: 'Deputy Director Students Affairs', expertise: 'Plant Breeding and Genetics', ext: '2952', email: 'ahsankhanpbg@uaf.edu.pk' },
  { name: 'Dr. Muqadas Aleem', role: 'Deputy Director Students Affairs', expertise: 'Plant Breeding and Genetics', ext: '3800', email: 'muqadas.aleem@uaf.edu.pk' },
  { name: 'Dr. Umair Gull', role: 'Deputy Director Students Affairs', expertise: 'Agronomy (Fodder Production Systems)', ext: '3800', email: 'umairgull@uaf.edu.pk' },
  { name: 'Dr. Asad Manzoor', role: 'Deputy Director Students Affairs', expertise: 'Clinical Medicine and Surgery', ext: '3800', email: 'asad.manzoor@uaf.edu.pk' },
  { name: 'Dr. Arifa Mehreen', role: 'Deputy Director Students Affairs (PARS)', expertise: 'Zoology, Wildlife & Fisheries', ext: '3800', email: 'arifa.mehreen@uaf.edu.pk' },
  { name: 'Mr. Shahid Yaqoob', role: 'Assistant Research Officer', expertise: 'Sociology', ext: '3800', email: 'shahidrsuaf@gmail.com' },
  { name: 'Mr. Naseer Ahmad Tanveer', role: 'Office Assistant', expertise: '', ext: '3800', email: 'naseertanveer51@gmail.com' },
  { name: 'Mr. Muhammad Abaid Ullah', role: 'Office Assistant', expertise: '', ext: '3800', email: 'zabaidz@gmail.com' },
  { name: 'Mian Muhammad Imran', role: 'Daftri', expertise: '', ext: '3800', email: 'mian_imran486@yahoo.com' },
];
const objectives = [
  'Maintain campus discipline and support peace and harmony across the University.',
  'Issue computerized identification cards to students, teachers, and staff.',
  'Provide pick-up and drop-off transport for non-boarder students and employees.',
  'Arrange transport for student study tours to universities and research institutions.',
  'Manage the STC Hall for student functions, welcome and farewell events, class activities, TGM annual functions, and seminars.',
  'Support access to quality food at subsidized rates through campus cafeterias and canteens.',
  'Maintain campus drinking-water coolers for the University community.',
  'Provide grocery, stationery, and other daily essentials through campus stores.',
];
const functions = [
  ['Computerized ID Card Unit', 'Prepares computerized identification cards for students, teachers, and University staff.'],
  ['Student hall and event support', 'Maintains an approximately 100-seat hall with dining area for academic, co-curricular, and social events.'],
  ['Campus shops and cafeterias', 'Arranges shops and cafeterias for food, stationery, and utility items; monitors quality and prices.'],
  ['Transport services', 'Coordinates campus shuttle service, daily transport for non-boarder students, and student study tours.'],
  ['Admission information desk', 'Sets up information desks near the National Bank and Habib Bank branches during admissions to assist prospective undergraduate and postgraduate students.'],
  ['University event assistance', 'Helps University units organize academic, co-curricular, and social events on campus.'],
];
const tenderPdf = 'https://web.uaf.edu.pk/Contents/directorates/student_affairs/Bidding%20docmnt/040220Tender%20Documents-2020.pdf';

export const StudentAffairsPage: React.FC<{ initialSection?: string }> = ({ initialSection }) => {
  const valid = (value?: string): value is Section => ['overview', 'objectives', 'functions', 'staff', 'bidding'].includes(value || '');
  const [active, setActive] = useState<Section>(valid(initialSection) ? initialSection : 'overview');
  const [moreOpen, setMoreOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonRecord | null>(null);
  const select = (id: Section) => {
    setActive(id); setMoreOpen(false);
    const url = new URL(window.location.href);
    if (id === 'overview') url.searchParams.delete('section'); else url.searchParams.set('section', id);
    window.history.replaceState({}, '', url); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (selectedPerson) return <PeopleProfileView person={selectedPerson} onBack={() => setSelectedPerson(null)} />;
  const heading = active === 'functions' ? 'Functions and Components' : active === 'staff' ? 'Administration & Staff' : active === 'bidding' ? 'Bidding Documents' : sections.find((item) => item.id === active)?.label;

  return <main className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fa] font-sans text-stone-900">
    <section className="relative flex min-h-[380px] items-center overflow-hidden border-b border-[#c99738]/40 bg-[#071b2d] text-white sm:min-h-[440px]">
      <div className="absolute inset-0"><img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full scale-105 object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/75 via-[#071b2d]/50 to-[#071b2d]/25"/></div>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8"><div className="max-w-4xl space-y-4"><span className="inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300">University Administration</span><h1 className="font-serif-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">Directorate of <span className="font-medium italic text-[#e8a62a]">Student Affairs</span></h1><p className="max-w-3xl text-base leading-7 text-white">Student support, campus services, student activities, transport, and community wellbeing.</p></div></div>
    </section>
    <div className="relative z-30 -mt-6 flex justify-center px-3 sm:-mt-7"><nav aria-label="Student Affairs sections" className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-[#c99738]/80 bg-[#071b2d] px-2.5 py-1.5 text-xs font-bold text-white shadow-[0_12px_32px_rgba(7,27,45,0.4)] sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-2 sm:text-[13px]">
      {sections.map((item) => <button key={item.id} type="button" onClick={() => select(item.id)} aria-current={active === item.id ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === item.id ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>{item.label}</button>)}
      <div className="relative shrink-0" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}><button type="button" aria-haspopup="menu" aria-expanded={moreOpen} onClick={() => setMoreOpen(!moreOpen)} className={`flex items-center gap-1.5 rounded-full px-3 py-2 transition sm:px-3.5 ${active === 'bidding' || moreOpen ? 'bg-[#163887] ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>More <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`}/></button>{moreOpen && <div role="menu" className="absolute right-0 top-full z-50 w-64 pt-2"><div className="overflow-hidden rounded-2xl border border-[#c99738]/50 bg-[#071b2d] py-2 text-white shadow-2xl"><button type="button" role="menuitem" onClick={() => select('bidding')} className={`block w-full px-4 py-3 text-left text-sm font-semibold hover:bg-[#163887] ${active === 'bidding' ? 'bg-[#163887]' : ''}`}>Bidding Documents</button></div></div>}</div>
    </nav></div>
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">Directorate of Student Affairs</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">{heading}</h2></div>
      {active === 'overview' && <article className="flow-root rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9"><figure className="mb-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm md:float-right md:ml-6 md:w-[360px]"><img src="/uaf_historic_campus.jpg" alt="University of Agriculture, Faisalabad" className="h-56 w-full object-cover"/><figcaption className="border-t border-stone-200 bg-stone-50 p-3 text-xs font-semibold text-stone-700">University of Agriculture, Faisalabad</figcaption></figure><p className="text-base leading-8 text-stone-700">The Directorate of Student Affairs provides academic and administrative support to improve the student experience throughout University life. It maintains liaison between University administration and students, and helps address student needs across academics, co-curricular and social activities, sports, library services, examinations, transportation, health, fees, career planning, and discipline.</p><p className="mt-5 text-base leading-8 text-stone-700">The Directorate also supports peaceful co-existence among students from diverse ethnic, cultural, and religious backgrounds and helps represent the University positively at local, national, and international levels. Its responsibilities include campus discipline and student conduct, identification cards, transport, student event facilities, and essential campus services.</p><p className="mt-5 text-base leading-8 text-stone-700">The Director chairs the Campus Advisory Committee, a statutory body that reviews misconduct and indiscipline cases and recommends appropriate action. The Director also serves as Secretary of the University Discipline Committee, an appellate statutory body.</p><div className="mt-7 grid gap-4 sm:grid-cols-3">{[['Student wellbeing', 'Guidance and liaison across academic, personal, and campus-life concerns'], ['Campus services', 'Identification cards, transport, halls, food outlets, and daily essentials'], ['Community & conduct', 'Student activities, peaceful campus life, and discipline processes']].map(([title, body]) => <article key={title} className="rounded-xl border border-stone-200 border-t-4 border-t-[#c99738] bg-stone-50 p-5"><h3 className="font-bold text-[#163887]">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{body}</p></article>)}</div></article>}
      {active === 'objectives' && <div className="grid gap-4 md:grid-cols-2">{objectives.map((objective, index) => <article key={objective} className="flex gap-4 rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-5 shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf0ff] font-extrabold text-[#163887]">{String(index + 1).padStart(2, '0')}</span><p className="pt-1 text-sm leading-7 text-stone-700">{objective}</p></article>)}</div>}
      {active === 'functions' && <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{functions.map(([title, body], index) => <article key={title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><span className="text-xs font-black uppercase tracking-widest text-[#c99738]">Component {String(index + 1).padStart(2, '0')}</span><h3 className="mt-3 text-lg font-bold text-[#163887]">{title}</h3><p className="mt-3 text-sm leading-7 text-stone-600">{body}</p></article>)}</div>}
      {active === 'staff' && <><div className="mb-6 rounded-2xl border border-stone-200 border-b-4 border-b-[#c9cf9b] bg-white px-6 py-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.12em]">Directorate of Student Affairs</p><h3 className="mt-2 text-2xl font-extrabold text-stone-950">Administration &amp; Staff</h3><p className="mt-1 text-sm text-stone-500">Published staff directory with office extensions and email contacts.</p></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{staff.map((person) => <article key={person.email} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="flex aspect-square items-center justify-center bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 text-slate-400"><UserRound className="h-20 w-20" strokeWidth={1.25}/></div><div className="space-y-2.5 p-4 sm:p-5"><h3 className="text-lg font-extrabold leading-snug text-stone-950">{person.name}</h3><p className="text-sm text-stone-700">{person.role}</p>{person.expertise && <p className="text-sm leading-5 text-stone-500">{person.expertise}</p>}<a href={`tel:+92419200161`} className="flex items-center gap-2 text-sm text-stone-600"><Phone className="h-4 w-4 shrink-0"/>{person.phone ? `${person.phone} · ` : ''}Ext. {person.ext}</a><a href={`mailto:${person.email}`} className="flex items-center gap-2 break-all text-sm text-[#163887] hover:underline"><Mail className="h-4 w-4 shrink-0"/>{person.email}</a><button type="button" onClick={() => setSelectedPerson({ name: person.name, designation: person.role, phone: `${person.phone ? `${person.phone} · ` : ''}Ext. ${person.ext}`, email: person.email, departmentName: 'Directorate of Student Affairs' })} className="mt-2 w-full rounded-lg bg-[#071b2d] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#163887]">View Profile</button></div></article>)}</div></>}
      {active === 'bidding' && <div className="max-w-3xl"><div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-5"><h3 className="font-bold text-amber-950">Archived bidding document</h3><p className="mt-2 text-sm leading-6 text-amber-900">The Directorate’s published archive contains a tender document dated 4 February 2020. It is provided here as a historical record and may no longer be open for bids.</p></div><a href={tenderPdf} target="_blank" rel="noreferrer" className="group flex min-h-36 flex-col justify-between rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm transition hover:border-[#c99738] hover:shadow-md"><span><strong className="block text-lg text-[#163887]">Tender Documents — 2020</strong><span className="mt-2 block text-sm leading-6 text-stone-600">Original bidding document published by the Directorate of Student Affairs.</span></span><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#163887]">Download bidding document <ArrowDownToLine className="h-4 w-4 transition group-hover:translate-y-0.5"/></span></a></div>}
    </section>
  </main>;
};
