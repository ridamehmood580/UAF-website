'use client';

import React, { useState } from 'react';
import { Mail, Phone, Trophy, UserRound } from 'lucide-react';
import { PeopleProfileView, type PersonRecord } from './PeopleProfileView';

type Section = 'overview' | 'people' | 'achievements';
const sections: { id: Section; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'people', label: 'Our People' },
  { id: 'achievements', label: 'Achievements' },
];
const facilities = [
  ['International handball court and stadium', 'International-level playing venue'],
  ['Cricket academy and stadium', 'National-level stadium and University cricket academy'],
  ['Football and hockey grounds', 'Outdoor fields for team training and matches'],
  ['Gymnasium and indoor games gym', 'Indoor sports and fitness facilities'],
  ['Athletics track', 'Standard athletics track'],
  ['Basketball courts', 'Campus courts, including the stadium near Liaqat Hall'],
  ['Swimming pool', 'Swimming facility for campus sports and training'],
  ['Lawn tennis and squash courts', 'Court sports facilities'],
  ['Snooker academy', 'Indoor cue-sports training'],
  ['Women’s Sports Complex', 'Sports facilities for women students'],
  ['Horse riding and tent pegging stadium', 'Equestrian sports and tent pegging'],
];
const sportsGallery = [
  ['Gymnasium Hall', 1], ['Gym Hall', 2], ['Cricket Stadium', 3], ['Cricket Ground', 4],
  ['Swimming Pool', 5], ['Hockey Ground', 6], ['Football Ground', 7], ['Athletics Track', 8],
  ['International Handball Court', 9], ['Basketball Court', 10],
  ['University Cricket Academy practice pitches', 11], ['Basketball Stadium near Liaqat Hall', 12],
  ['Women’s Gymnasium and Sports Hall', 13], ['Women’s Swimming Pool', 14], ['Women’s Swimming Pool', 15],
].map(([title, imageNumber]) => ({
  title: String(title),
  src: `https://web.uaf.edu.pk/Contents/directorates/sports/Images/${imageNumber}.jpg`,
}));
const staff = [
  { name: 'Dr. Haroon Zaman Khan', role: 'Chairman, Sports Board', phone: '+92 41 9200161', ext: '4020', email: 'haroon.zaman@uaf.edu.pk' },
  { name: 'Mr. Muhammad Atif Shafiq', role: 'Director', phone: '+92 41 9201123', ext: '', email: 'director.sports@uaf.edu.pk' },
  { name: 'Mr. Farooq Iqbal', role: 'Assistant Director', phone: '+92 41 9200161', ext: '', email: 'farooqiqbal@uaf.edu.pk' },
  { name: 'Mr. Humayun Zaheer', role: 'Assistant Director', phone: '+92 41 9200161', ext: '', email: 'humayun.zaheer@uaf.edu.pk' },
  { name: 'Mr. Shahzeb Janjua', role: 'Assistant Director', phone: '+92 41 9200161', ext: '', email: 'shahzeb.janjua@uaf.edu.pk' },
  { name: 'Mr. Wajid Ali', role: 'Assistant Director', phone: '+92 41 9200161', ext: '', email: 'wajidgill78@uaf.edu.pk' },
  { name: 'Mr. Muhammad Atif', role: 'Account Officer', phone: '+92 41 9200161', ext: '', email: 'atif.rana@uaf.edu.pk' },
];
const menSports = ['Athletics', 'Weightlifting', 'Boxing', 'Volleyball', 'Karate', 'Table Tennis', 'Bodybuilding', 'Wrestling', 'Handball', 'Cricket', 'Swimming'];
const womenSports = ['Athletics', 'Basketball', 'Badminton', 'Boxing', 'Karate', 'Table Tennis', 'Weightlifting', 'Hockey', 'Swimming'];
const honours = [
  ['Alishba Kamal', 'National Boxing Champion 2026 · Gold medal · Featherweight'],
  ['Malika Maqsood', 'HEC Intervarsity Women’s Boxing · Bronze medal'],
  ['Talha Masood', 'HEC Intervarsity Men’s Boxing · Bronze medal'],
  ['M. Haseeb Akbar', 'HEC Intervarsity Men’s Wrestling · Bronze medal'],
  ['M. Abdullah Shahid', 'HEC Intervarsity Bodybuilding · Bronze medal'],
];
const activityGroups = [
  { title: 'Hosted HEC Intervarsity events', items: ['Swimming Intervarsity Championships (44th Men and 13th Women), hosted with the Prime Minister Sports Olympiad 2024.', 'Men’s Volleyball Zone I at the UAF Athletics Track, Main Campus.'] },
  { title: 'National and provincial events', items: ['Hosted the semifinals of Rustam-e-Pakistan at the equestrian stadium in May 2025.', 'Facilitated the Prime Minister Youth Program Boxing Talent Hunt for men and women.', 'Facilitated Punjab handball, taekwondo, and Asian-style kabaddi team trials and camps for the National Games.'] },
  { title: 'Campus and community sports', items: ['Conducted sports-based admission trials for undergraduate and postgraduate applicants.', 'Supported departmental sports galas across faculties and departments.', 'Hosted the ICC Women’s World Cup trophy showcase and organized alumni sports at the 60th Alumni Meet.', 'Organized inter-club boxing and women’s inter-school badminton and table tennis events.'] },
];

export const SportsPage: React.FC<{ initialSection?: string }> = ({ initialSection }) => {
  const valid = (value?: string): value is Section => ['overview', 'people', 'achievements'].includes(value || '');
  const [active, setActive] = useState<Section>(valid(initialSection) ? initialSection : 'overview');
  const [selectedPerson, setSelectedPerson] = useState<PersonRecord | null>(null);
  const select = (id: Section) => {
    setActive(id);
    const url = new URL(window.location.href);
    if (id === 'overview') url.searchParams.delete('section'); else url.searchParams.set('section', id);
    window.history.replaceState({}, '', url); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (selectedPerson) return <PeopleProfileView person={selectedPerson} onBack={() => setSelectedPerson(null)} />;
  const heading = sections.find((item) => item.id === active)?.label || 'Overview';

  return <main className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fa] font-sans text-stone-900">
    <section className="relative flex min-h-[380px] items-center overflow-hidden border-b border-[#c99738]/40 bg-[#071b2d] text-white sm:min-h-[440px]"><div className="absolute inset-0"><img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full scale-105 object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/75 via-[#071b2d]/50 to-[#071b2d]/25"/></div><div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8"><div className="max-w-4xl space-y-4"><span className="inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300">University Administration</span><h1 className="font-serif-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">Directorate of <span className="font-medium italic text-[#e8a62a]">Sports</span></h1><p className="max-w-3xl text-base leading-7 text-white">Supporting student fitness, sportsmanship, participation, and achievement through campus facilities and competitive sport.</p></div></div></section>
    <div className="relative z-30 -mt-6 flex justify-center px-3 sm:-mt-7"><nav aria-label="Directorate of Sports sections" className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-[#c99738]/80 bg-[#071b2d] px-2.5 py-1.5 text-xs font-bold text-white shadow-[0_12px_32px_rgba(7,27,45,0.4)] sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-2 sm:text-[13px]">{sections.map((item) => <button key={item.id} type="button" onClick={() => select(item.id)} aria-current={active === item.id ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${active === item.id ? 'bg-[#163887] shadow-md ring-1 ring-blue-400/50' : 'hover:bg-[#163887]'}`}>{item.label}</button>)}</nav></div>
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">Directorate of Sports</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">{heading}</h2></div>
      {active === 'overview' && <><article className="flow-root rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9"><figure className="mb-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm md:float-right md:ml-6 md:w-[360px]"><img src="/uaf_historic_campus.jpg" alt="University of Agriculture, Faisalabad" className="h-56 w-full object-cover"/><figcaption className="border-t border-stone-200 bg-stone-50 p-3 text-xs font-semibold text-stone-700">University of Agriculture, Faisalabad</figcaption></figure><p className="text-base leading-8 text-stone-700">The Directorate of Sports works to involve students in sport and provide facilities that support participation, discipline, leadership, patience, physical fitness, and sportsmanship. UAF offers a wide range of outdoor and indoor sports facilities and training opportunities for its students.</p><p className="mt-5 text-base leading-8 text-stone-700">The University competes in Higher Education Commission Intervarsity championships for men and women and hosts sports events, admission trials, training camps, and campus sports galas. Its programme supports both competitive athletes and wider student participation.</p></article><div className="mb-4 mt-8 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c99738]">Campus facilities</p><h3 className="mt-1 text-xl font-bold text-[#163887]">Sports facilities at UAF</h3></div><span className="rounded-full bg-[#163887] px-3 py-1.5 text-sm font-bold text-white">11 facilities</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{facilities.map(([name, detail], index) => <article key={name} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0ff] font-extrabold text-[#163887]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-bold text-[#163887]">{name}</h3><p className="mt-1 text-sm leading-6 text-stone-600">{detail}</p></div></div></article>)}</div><div className="mb-4 mt-10"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c99738]">On campus</p><h3 className="mt-1 text-xl font-bold text-[#163887]">Grounds, courts, and sports facilities</h3><p className="mt-2 text-sm text-stone-600">Photographs from the Directorate of Sports facility gallery.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{sportsGallery.map((photo) => <figure key={photo.src} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><img src={photo.src} alt={photo.title} loading="lazy" className="h-60 w-full object-cover"/><figcaption className="border-t border-stone-200 px-4 py-3 text-sm font-semibold text-[#163887]">{photo.title}</figcaption></figure>)}</div></>}
      {active === 'people' && <><div className="mb-6 rounded-2xl border border-stone-200 border-b-4 border-b-[#c9cf9b] bg-white px-6 py-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.12em]">Directorate of Sports</p><h3 className="mt-2 text-2xl font-extrabold text-stone-950">Our People</h3><p className="mt-1 text-sm text-stone-500">Sports Board leadership, Directorate staff, and office contact details.</p></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{staff.map((person) => <article key={person.email} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="flex aspect-square items-center justify-center bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 text-slate-400"><UserRound className="h-20 w-20" strokeWidth={1.25}/></div><div className="space-y-2.5 p-4 sm:p-5"><h3 className="text-lg font-extrabold leading-snug text-stone-950">{person.name}</h3><p className="text-sm text-stone-700">{person.role}</p><a href={`tel:${person.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-stone-600"><Phone className="h-4 w-4 shrink-0"/>{person.phone}{person.ext ? ` · Ext. ${person.ext}` : ''}</a><a href={`mailto:${person.email}`} className="flex items-center gap-2 break-all text-sm text-[#163887] hover:underline"><Mail className="h-4 w-4 shrink-0"/>{person.email}</a><button type="button" onClick={() => setSelectedPerson({ name: person.name, designation: person.role, phone: `${person.phone}${person.ext ? ` · Ext. ${person.ext}` : ''}`, email: person.email, departmentName: 'Directorate of Sports' })} className="mt-2 w-full rounded-lg bg-[#071b2d] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#163887]">View Profile</button></div></article>)}</div><p className="mt-4 text-xs text-stone-500">Working hours: Monday–Friday, 8:00 a.m.–4:00 p.m. · Main line: +92 41 9200161–70</p></>}
      {active === 'achievements' && <><article className="mb-6 rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-8"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><Trophy className="h-6 w-6"/></span><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c99738]">Recent honours</p><h3 className="text-xl font-extrabold text-[#163887]">UAF athletes on the podium</h3></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{honours.map(([name, award]) => <div key={name} className="rounded-xl border border-stone-200 bg-stone-50 p-4"><h4 className="font-bold text-stone-900">{name}</h4><p className="mt-1 text-sm leading-6 text-stone-600">{award}</p></div>)}</div></article><div className="mb-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-bold text-[#163887]">HEC Intervarsity participation · 2024–25</h3><p className="mt-2 text-sm leading-6 text-stone-600">UAF participated in 11 men’s and 9 women’s inter-university championships.</p><div className="mt-5 grid gap-5 md:grid-cols-2"><div className="rounded-xl bg-blue-50 p-5"><h4 className="font-bold text-[#163887]">Men · 11 sports</h4><p className="mt-2 text-sm leading-7 text-stone-700">{menSports.join(' · ')}</p></div><div className="rounded-xl bg-rose-50 p-5"><h4 className="font-bold text-[#163887]">Women · 9 sports</h4><p className="mt-2 text-sm leading-7 text-stone-700">{womenSports.join(' · ')}</p></div></div></div><div className="grid gap-4 md:grid-cols-3">{activityGroups.map((group) => <article key={group.title} className="rounded-2xl border border-stone-200 border-t-4 border-t-[#c99738] bg-white p-5 shadow-sm"><h3 className="font-bold text-[#163887]">{group.title}</h3><ul className="mt-3 space-y-3">{group.items.map((item) => <li key={item} className="text-sm leading-6 text-stone-600">{item}</li>)}</ul></article>)}</div></>}
    </section>
  </main>;
};
