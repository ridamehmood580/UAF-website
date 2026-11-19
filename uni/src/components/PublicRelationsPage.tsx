'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, ExternalLink, Mail, Phone, Tag, UserRound, Video } from 'lucide-react';
import { publicRelationsPeoplePlaceholders, type PublicRelationsPerson } from '../lib/publicRelationsPeople';
import { PeopleProfileView, type PersonRecord } from './PeopleProfileView';

type SectionId = 'overview' | 'people' | 'coverage' | 'sops';
const sections: { id: SectionId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'people', label: 'Our People' },
  { id: 'coverage', label: 'Media Coverage' },
  { id: 'sops', label: 'SOPs for Coverage' },
];
const coverageForm = 'https://docs.google.com/forms/d/e/1FAIpQLSd-jCR-CL1gRcgTfVe0ju0X2T7NIk3PU5Gg3qKaO0Dr1sQ4Jw/viewform';
const coverageSops = 'https://web.uaf.edu.pk/Contents/pr/pr_event_sop.html';

export const PublicRelationsPage: React.FC<{ initialSection?: string }> = ({ initialSection }) => {
  const [activeSection, setActiveSection] = useState<SectionId>(sections.some((item) => item.id === initialSection) ? initialSection as SectionId : 'overview');
  const [coverageMenuOpen, setCoverageMenuOpen] = useState(false);
  const [people, setPeople] = useState<PublicRelationsPerson[]>(publicRelationsPeoplePlaceholders);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonRecord | null>(null);

  useEffect(() => {
    if (activeSection !== 'people') return;
    let cancelled = false;
    setLoading(true);
    fetch('/api/public-relations/people', { cache: 'no-store' }).then((response) => {
      if (!response.ok) throw new Error('Could not fetch people');
      return response.json();
    }).then((result) => { if (!cancelled && Array.isArray(result.profiles)) setPeople(result.profiles); })
      .catch(() => { if (!cancelled) setPeople(publicRelationsPeoplePlaceholders); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [activeSection]);

  if (selectedPerson) return <PeopleProfileView person={selectedPerson} onBack={() => setSelectedPerson(null)} />;

  const selectSection = (id: SectionId) => {
    setActiveSection(id);
    const nextUrl = new URL(window.location.href);
    if (id !== 'sops' && nextUrl.searchParams.get('page') === 'public-relations-sops') {
      nextUrl.searchParams.set('page', 'public-relations');
    }
    nextUrl.searchParams.set('section', id);
    window.history.replaceState({}, '', nextUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const section = sections.find((item) => item.id === activeSection)!;
  return <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f9fa] font-sans text-stone-900">
    <section className="relative flex min-h-[380px] items-center overflow-hidden border-b border-[#c99738]/40 bg-[#071b2d] text-white sm:min-h-[440px]">
      <div className="absolute inset-0"><img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full scale-105 object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/70 via-[#071b2d]/45 to-[#071b2d]/20" /></div>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-4"><div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300"><span className="h-2 w-2 rounded-full bg-[#e8a62a]" /> University Administration</div>
          <h1 className="font-serif-heading text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-[42px]">Public Relations <span className="font-medium italic text-[#e8a62a]">&amp; Media</span></h1>
          <p className="max-w-3xl text-sm font-medium leading-relaxed text-white drop-shadow-md sm:text-base">Public Relations services and UAF FM 100.4.</p>
        </div>
      </div>
    </section>

    <div className="relative z-30 -mt-6 flex justify-center px-3 sm:-mt-7 sm:px-6"><nav aria-label="Public Relations and Media sections" className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-[#c99738]/80 bg-[#071b2d] px-2.5 py-1.5 text-xs font-bold text-white shadow-[0_12px_32px_rgba(7,27,45,0.4)] sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-2 sm:text-[13px]">
      {sections.slice(0, 2).map((item) => <button key={item.id} type="button" onClick={() => selectSection(item.id)} aria-current={activeSection === item.id ? 'page' : undefined} className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${activeSection === item.id ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50' : 'text-white hover:bg-[#163887]'}`}>{item.label}</button>)}
      <div className="relative shrink-0" onMouseEnter={() => setCoverageMenuOpen(true)} onMouseLeave={() => setCoverageMenuOpen(false)}>
        <button type="button" aria-haspopup="menu" aria-expanded={coverageMenuOpen} onClick={() => setCoverageMenuOpen((open) => !open)} className={`flex items-center gap-1.5 rounded-full px-3 py-2 transition sm:px-3.5 ${activeSection === 'coverage' || activeSection === 'sops' || coverageMenuOpen ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50' : 'text-white hover:bg-[#163887]'}`}>
          Media Coverage <ChevronDown className={`h-3.5 w-3.5 transition-transform ${coverageMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        {coverageMenuOpen && <div role="menu" className="absolute left-0 top-full z-50 w-60 pt-2">
          <div className="overflow-hidden rounded-2xl border border-[#c99738]/50 bg-white py-2 text-[#163887] shadow-2xl">
            <a role="menuitem" href="/?page=public-relations-sops" className="block px-4 py-3 text-sm font-bold transition hover:bg-[#f3f6fb]">SOPs for Coverage <ArrowUpRight className="ml-2 inline h-3.5 w-3.5" /></a>
            <a role="menuitem" href={coverageForm} target="_blank" rel="noreferrer" className="block px-4 py-3 text-sm font-bold transition hover:bg-[#f3f6fb]">Coverage Request Form <ExternalLink className="ml-2 inline h-3.5 w-3.5" /></a>
          </div>
        </div>}
      </div>
    </nav></div>

    <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      {activeSection === 'overview' && <div className="flow-root rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9">
        <figure className="mb-6 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm md:float-right md:ml-6 md:w-[360px]"><img src="/uaf_historic_campus.jpg" alt="Historic campus of the University of Agriculture Faisalabad" className="h-56 w-full object-cover" /><figcaption className="border-t border-stone-200 bg-stone-50 p-3 text-xs font-semibold text-stone-700">University of Agriculture, Faisalabad · Public Relations &amp; Media</figcaption></figure>
        <p className="text-base leading-8 text-stone-700">The department consists of two components: Public Relations (PR) and UAF FM 100.4. Public Relations projects the institution and highlights the achievements of its scientists, scholars, and students through print, electronic, and social media. It issues handouts and pictorial and video publicity about University functions and ceremonies.</p>
        <p className="mt-5 text-base leading-8 text-stone-700">The department provides information about University infrastructure and disciplines, admission schedules, and other requested information. It arranges media coverage of University events, supports visiting media, and facilitates interviews, documentaries, and talk shows with students, researchers, and scientists.</p>
        <h2 className="mt-7 text-xl font-bold text-[#163887]">UAF FM 100.4</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The University radio station plans, produces, and broadcasts informative, educational, and awareness-oriented programmes for the University community and the public. Its content includes research findings, agricultural technologies, public service messages, interviews, and announcements, with outreach for farmers and rural communities.</p>
        <p className="mt-4 text-base leading-8 text-stone-700">The station also airs live shows and special segments with faculty experts, alumni, and guests. It serves as a communication link between the University and its stakeholders, particularly farming and rural communities.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Awareness Campaigns</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The department launches media campaigns to raise public awareness about important issues and modern developments, particularly in agriculture, food security, rural development, and public health. Media are invited to highlight relevant campaigns and issues.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Citizen Portals and Right to Information</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The office handles Prime Minister and Chief Minister Citizen Portal matters as the Vice Chancellor’s focal person and dashboard handler. Complaints are referred to the concerned office and followed through for resolution under applicable rules and within the required timeframe. The department also coordinates responses to information requests under the Punjab Transparency and Right to Information Act, 2013.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Protocol Duties</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The department manages protocol for high-level delegations and dignitaries, including receiving guests and facilitating their visits to University departments and facilities.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Newsletter</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The University Newsletter highlights the activities of students, researchers, and departments and is distributed to universities, agriculture and livestock sector departments, and print and electronic media offices.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Audio-Visual Lab and Documentaries</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The department’s audio-visual lab produces documentaries about campus activities, research, academic and co-curricular work, and funded projects. Documentaries also explain technologies developed by UAF scientists and their practical use for farming communities.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Event Management</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The department organizes events addressing agricultural, economic, and social issues, and looks after seminars, conferences, and special lectures.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Admission Guidelines and Advertisements</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">The department develops admission documentaries to help prospective undergraduate and postgraduate students understand the admission process. It also coordinates University advertisements with the Directorate General Public Relations (DGPR), including admissions, jobs, auctions, tenders, and other official notices, and operates the DGPR online portal.</p>

        <h2 className="mt-8 text-xl font-bold text-[#163887]">Campus News</h2>
        <p className="mt-3 text-base leading-8 text-stone-700">Campus News is published weekly by IPPS to highlight important departmental news and campus activities, including PhD thesis and synopsis defenses, tenders, auctions, and University advertisements. It also provides information of interest to teaching staff and students.</p>
      </div>}

      {activeSection === 'people' && <div><div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 border-b-4 border-b-[#c9cf9b] bg-white px-6 py-6 shadow-sm sm:px-7"><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"><span className="h-2.5 w-2.5 rounded-full bg-[#163887]" /> Public Relations &amp; Media</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">People — Public Relations &amp; Media</h2><p className="mt-1.5 text-sm text-stone-500">{people.length} {people.every((person) => person.placeholder) ? 'staff profile placeholders' : 'staff members'} · University of Agriculture, Faisalabad</p></div><button type="button" onClick={() => selectSection('overview')} className="rounded-lg bg-stone-100 px-4 py-3 text-sm font-bold text-stone-700 hover:bg-stone-200">View Office Overview</button></div>
        {loading && <p className="mb-4 text-sm text-stone-500" aria-live="polite">Loading staff profiles…</p>}<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{people.map((person) => <article key={person.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="aspect-square overflow-hidden bg-stone-100">{person.photoUrl ? <img src={person.photoUrl} alt={person.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 text-slate-400"><UserRound className="h-20 w-20" strokeWidth={1.25} /><span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">Profile photo placeholder</span></div>}</div><div className="space-y-2.5 p-4 sm:p-5"><h3 className="text-lg font-extrabold leading-snug">{person.name}</h3><p className="flex items-start gap-2 text-sm text-stone-700"><Tag className="mt-0.5 h-4 w-4 shrink-0 text-[#315aa4]" />{person.designation}</p><p className="flex items-start gap-2 text-sm text-stone-600"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#315aa4]" />{person.phone}</p><p className="flex min-w-0 items-start gap-2 break-all text-sm text-stone-600"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#315aa4]" />{person.email}</p><button type="button" onClick={() => setSelectedPerson({ name: person.name, designation: person.designation, phone: person.phone, email: person.email, photoUrl: person.photoUrl, departmentName: 'Public Relations & Media' })} className="mt-2 w-full rounded-lg bg-[#071b2d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#163887]">View Profile</button></div></article>)}</div></div>}

      {activeSection !== 'overview' && activeSection !== 'people' && <div className="mx-auto max-w-5xl"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">Public Relations &amp; Media</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">{section.label}</h2></div>
        {activeSection === 'coverage' && <div className="grid gap-4 md:grid-cols-2"><a href="/?page=public-relations-sops" className="flex min-h-48 flex-col justify-between rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm transition hover:border-[#c99738] hover:shadow-md"><span className="flex items-center gap-3"><span className="rounded-xl bg-[#163887] p-3 text-white"><Video className="h-6 w-6" /></span><span><strong className="block text-lg text-[#163887]">SOPs for Coverage</strong><span className="mt-1 block text-sm text-stone-600">Read the event coverage procedures.</span></span></span><span className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-[#163887] px-4 py-2.5 text-sm font-bold text-white">View SOPs <ArrowUpRight className="h-4 w-4" /></span></a><a href={coverageForm} target="_blank" rel="noreferrer" className="flex min-h-48 flex-col justify-between rounded-2xl border border-stone-200 border-l-4 border-l-[#c99738] bg-white p-6 shadow-sm transition hover:border-[#163887] hover:shadow-md"><span className="flex items-center gap-3"><span className="rounded-xl bg-[#c99738] p-3 text-white"><ArrowUpRight className="h-6 w-6" /></span><span><strong className="block text-lg text-[#163887]">Coverage Request Form</strong><span className="mt-1 block text-sm text-stone-600">Send event information to request media coverage.</span></span></span><span className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-[#163887] px-4 py-2.5 text-sm font-bold text-white">Open Request Form <ArrowUpRight className="h-4 w-4" /></span></a></div>}
        {activeSection === 'sops' && <div className="rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9"><p className="text-base leading-8 text-stone-700">The Public Relations Department supports activities that promote the University’s positive image and visibility. These procedures help the department plan coverage, coordinate resources, and publicize University events smoothly.</p><h3 className="mt-7 text-lg font-bold text-[#163887]">Coverage procedures</h3><ol className="mt-4 space-y-3">{[
          'Only programmes officially approved and notified by the competent authority will be considered for coverage.',
          'Inform the Public Relations Department at least one working day before the event for planning, coordination, and resource allocation.',
          'For events held outside Faisalabad, provide at least two working days’ notice so travel and logistics can be arranged.',
          'Provide complete event details: date, time, venue, chief guest(s), focal person(s), agenda, and contact numbers.',
          'Share banners, posters, brochures, and other promotional material in advance to check alignment with University branding guidelines.',
          'Ensure the event organizers or focal persons are available at the venue to guide and assist the PR team.',
          'Provide a one-page explanation of the programme theme, its benefits, and its significance.',
          'Notify the PR team immediately if the schedule or venue changes.'
        ].map((item, index) => <li key={item} className="flex gap-4 rounded-xl bg-[#f3f6fb] p-4 text-sm leading-6 text-stone-700"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#163887] text-xs font-bold text-white">{index + 1}</span><span>{item}</span></li>)}</ol><a href={coverageForm} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#163887] px-5 py-3 font-bold text-white transition hover:bg-[#102c6a]">Go to Coverage Request Form <ArrowUpRight className="h-4 w-4" /></a></div>}
      </div>}
    </section>
  </main>;
};

