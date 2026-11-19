'use client';

import React, { useState } from 'react';
import { Mail, Phone, UserRound } from 'lucide-react';
import { PeopleProfileView, type PersonRecord } from './PeopleProfileView';

type Section = 'overview' | 'director' | 'staff' | 'projects';
const items: { id: Section; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'director', label: 'Director' },
  { id: 'staff', label: 'Administration & Staff' },
  { id: 'projects', label: 'Projects' },
];

const people = [
  { name: 'Mr. Wasi Ahmad', role: 'Principal Officer / Network Administrator', ext: '3333', email: 'wasi@uaf.edu.pk', profile: '49' },
  { name: 'Mr. Kashif Akram', role: 'Director (Digitalization)', ext: '3332', email: 'kashif.akram@uaf.edu.pk', profile: '50' },
  { name: 'Mr. Jawad Ur Rehman', role: 'Web Developer', ext: '3399', email: 'Jawad.Rehman@uaf.edu.pk', profile: '' },
  { name: 'Mr. Muhammad Awais', role: 'Web Developer', ext: '3377', email: 'muhammad.awais@uaf.edu.pk', profile: '51' },
  { name: 'Mr. M. Aamir Hassan', role: 'Web Developer', ext: '3331', email: 'amir.hassan@uaf.edu.pk', profile: '52' },
];

const services = [
  '24-hour internet and managed network services across the main and sub-campuses',
  'Cloud email, official website, online admission, entry test, fee, pension, and student services',
  'Learning Management System, hostel and library systems, attendance, and student cards',
  'Data centre hosting, virtualization, databases, backups, and centralized data management',
  'IP telephony, video conferencing, lecture recording, surveillance, and IT help desk support',
];
const completed = [
  'Optical-fibre campus network and PERN connectivity at sub-campuses',
  'Online admission, entry test, fee, and pension systems',
  'Central biometric attendance and hostel Wi-Fi solutions',
  'Core network switches, firewalls, wireless access, and data-centre services',
  'Digital platforms supporting EFS, PRP, CMS, Graduate Studies, FM, CDC, and USPCAS-AFS',
];
const ongoing = [
  'University ERP and paperless workflows under the ICT programme',
  'Centralized data management and institutional IT policy and procedures',
  'Digitization portal for the Controller of Examinations',
  'IT and library infrastructure for new academic disciplines and campuses',
  'School management system for the main and sub-campuses',
];

export const ITRCDBPage: React.FC<{ initialSection?: string }> = ({ initialSection }) => {
  const [active, setActive] = useState<Section>(items.some(x => x.id === initialSection) ? initialSection as Section : 'overview');
  const [selectedPerson, setSelectedPerson] = useState<PersonRecord | null>(null);
  const select = (id: Section) => {
    setActive(id);
    const url = new URL(window.location.href);
    if (id === 'overview') url.searchParams.delete('section'); else url.searchParams.set('section', id);
    window.history.replaceState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const listCards = (heading: string, data: string[]) => <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"><h3 className="text-xl font-bold text-[#163887]">{heading}</h3><ul className="mt-5 grid gap-3 md:grid-cols-2">{data.map(x => <li key={x} className="rounded-xl border border-stone-100 border-l-4 border-l-[#c99738] bg-stone-50 p-4 text-sm leading-6 text-stone-700">{x}</li>)}</ul></section>;

  if (selectedPerson) return <PeopleProfileView person={selectedPerson} onBack={() => setSelectedPerson(null)} />;

  return <main className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fa] font-sans text-stone-900">
    <section className="relative flex min-h-[380px] items-center overflow-hidden border-b border-[#c99738]/40 bg-[#071b2d] text-white sm:min-h-[440px]">
      <div className="absolute inset-0"><img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full scale-105 object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/75 via-[#071b2d]/50 to-[#071b2d]/25"/></div>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8"><div className="max-w-4xl space-y-4"><span className="inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300">University Administration</span><h1 className="font-serif-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">Directorate of <span className="font-medium italic text-[#e8a62a]">ITRCDB</span></h1><p className="max-w-3xl text-base leading-7 text-white">Information Technology Resource Center and Database supports digital services, networks, systems, and data across the University.</p></div></div>
    </section>
    <div className="relative z-30 -mt-6 flex justify-center px-3 sm:-mt-7"><nav aria-label="ITRCDB sections" className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-[#c99738]/80 bg-[#071b2d] px-2.5 py-1.5 text-xs font-bold text-white shadow-[0_12px_32px_rgba(7,27,45,0.4)] sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-2 sm:text-[13px]">{items.map(item => <button key={item.id} type="button" onClick={() => select(item.id)} aria-current={active === item.id ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === item.id ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>{item.label}</button>)}</nav></div>
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">IT Resource Center &amp; Database</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">{items.find(x => x.id === active)?.label}</h2></div>
      {active === 'overview' && <article className="flow-root rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9"><figure className="mb-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm md:float-right md:ml-6 md:w-[360px]"><img src="/uaf_historic_campus.jpg" alt="University of Agriculture, Faisalabad" className="h-56 w-full object-cover"/><figcaption className="border-t border-stone-200 bg-stone-50 p-3 text-xs font-semibold text-stone-700">University of Agriculture, Faisalabad</figcaption></figure><p className="text-base leading-8 text-stone-700">The Information Technology Resource Center and Database (ITRCDB) was established in December 2010. University IT services had previously been managed within the Computer Science department. The Directorate now serves as the central technology hub for the University.</p><p className="mt-5 text-base leading-8 text-stone-700">ITRCDB develops web-based applications and campus solutions, operates the University data centre, and provides internet and IT services for staff, faculty, and students across the main and sub-campuses.</p><div className="mt-6 grid gap-4 sm:grid-cols-3">{[['Application development','University-wide web systems and digital services'],['Campus solutions','Integrated platforms for academic and administrative work'],['Network & data centre','Connectivity, hosting, databases, and infrastructure']].map(([title, body])=><div key={title} className="rounded-xl border border-stone-200 border-t-4 border-t-[#c99738] bg-stone-50 p-5"><h3 className="font-bold text-[#163887]">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{body}</p></div>)}</div></article>}
      {active === 'director' && <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9"><h3 className="text-xl font-bold text-[#163887]">Director's Office</h3><p className="mt-4 text-base leading-8 text-stone-700">ITRCDB works to provide a competitive, technology-rich environment for teaching, research, and administration. Its responsibilities include reliable connectivity, digital services, IT support, and secure University data and infrastructure.</p><p className="mt-4 text-base leading-8 text-stone-700">The Directorate supports approximately 45,000 users across the main and sub-campuses, with services designed to operate around the clock. Current strategic work includes enterprise systems, centralized data management, and digitization of University processes.</p><h4 className="mt-6 font-bold text-[#163887]">Core services</h4><ul className="mt-3 space-y-2">{services.map(s=><li key={s} className="rounded-lg bg-stone-50 p-3 text-sm leading-6 text-stone-700">{s}</li>)}</ul></article><aside className="h-fit rounded-2xl border border-stone-200 border-t-4 border-t-[#c99738] bg-white p-6 shadow-sm"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#163887]/10 text-[#163887]"><UserRound className="h-10 w-10"/></div><p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#c99738]">Incharge IT, ITRCDB</p><h3 className="mt-1 text-xl font-extrabold">Mr. Wasi Ahmad</h3><a className="mt-4 flex items-center gap-2 text-sm text-stone-700" href="tel:+92419200161"><Phone className="h-4 w-4 text-[#163887]"/>+92 41 9200161 · Ext. 3333</a><a className="mt-3 flex items-center gap-2 break-all text-sm text-[#163887] hover:underline" href="mailto:wasi@uaf.edu.pk"><Mail className="h-4 w-4 shrink-0"/>wasi@uaf.edu.pk</a><button type="button" onClick={() => setSelectedPerson({ name: 'Mr. Wasi Ahmad', designation: 'Principal Officer / Network Administrator', phone: '+92 41 9200161 · Ext. 3333', email: 'wasi@uaf.edu.pk', departmentName: 'IT Resource Center & Database' })} className="mt-5 w-full rounded-lg bg-[#071b2d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#163887]">View Profile</button></aside></div>}
      {active === 'staff' && <><div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 border-b-4 border-b-[#c9cf9b] bg-white px-6 py-6 shadow-sm"><div><p className="text-xs font-bold uppercase tracking-[0.12em]">ITRCDB</p><h3 className="mt-2 text-2xl font-extrabold text-stone-950">Administration &amp; Staff</h3><p className="mt-1 text-sm text-stone-500">University directory listings.</p></div><span className="text-sm text-stone-500">Directory team and contact information</span></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{people.map(p=><article key={p.email} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="flex aspect-square items-center justify-center bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 text-slate-400"><UserRound className="h-20 w-20" strokeWidth={1.25}/></div><div className="space-y-2.5 p-4 sm:p-5"><h3 className="text-lg font-extrabold leading-snug text-stone-950">{p.name}</h3><p className="text-sm text-stone-700">{p.role}</p><p className="text-sm text-stone-600">+92 41 9200161 · Ext. {p.ext}</p><a href={`mailto:${p.email}`} className="block break-all text-sm text-[#163887] hover:underline">{p.email}</a><button type="button" onClick={() => setSelectedPerson({ name: p.name, designation: p.role, phone: `+92 41 9200161 · Ext. ${p.ext}`, email: p.email, departmentName: 'IT Resource Center & Database' })} className="mt-2 w-full rounded-lg bg-[#071b2d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#163887]">View Profile</button></div></article>)}</div></>}
      {active === 'projects' && <div className="grid gap-5 lg:grid-cols-2">{listCards('Services provided', services)}{listCards('Successfully completed projects', completed)}<div className="lg:col-span-2">{listCards('Ongoing strategic projects', ongoing)}</div></div>}
    </section>
  </main>;
};
