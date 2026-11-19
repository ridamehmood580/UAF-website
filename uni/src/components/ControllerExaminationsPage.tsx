'use client';

import React, { useEffect, useState } from 'react';
import { ArrowDownToLine, Award, BookOpen, Building2, ChevronDown, ClipboardList, GraduationCap, Mail, Phone, Tag, UserRound } from 'lucide-react';
import { controllerExaminationsStaffPlaceholders, type ControllerExaminationsStaffProfile } from '../lib/controllerExaminationsStaff';
import { PeopleProfileView, type PersonRecord } from './PeopleProfileView';

type SectionId = 'overview' | 'affiliated' | 'staff' | 'grading' | 'downloads';

const sections: { id: SectionId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'affiliated', label: 'Affiliated Institutes' },
  { id: 'staff', label: 'Administration & Staff' },
  { id: 'grading', label: 'Quality Point Grading System' },
  { id: 'downloads', label: 'Downloads' },
];

const affiliatedInstitutes = [
  { name: 'In-service Agricultural Training Institute, Karor Lal Eisan', address: 'Layyah Bypass Road, adjacent to the Sports Stadium, Karor Lal Eisan, District Layyah, Punjab, Pakistan', phone: '0606-811271' },
  { name: 'Barani Agricultural Training Institute, Dahgal', address: 'Dahgal, opposite Adiala Jail, Rawalpindi, Punjab, Pakistan', phone: '051-5133001 or 051-5572116' },
  { name: 'Pak-German Polytechnic Institute for Agriculture Technology, Chak-5 Faiz', address: 'Dery Wala / Chak-5 Faiz, Bahawalpur Road, Multan, Punjab, Pakistan', phone: '0300-6367015' },
  { name: 'In-service Agricultural Training Institute, Rahim Yar Khan', address: 'Gulmarg Road, opposite Sadiq Town, Rahim Yar Khan, Punjab, Pakistan', phone: '0300-6747080' },
  { name: 'In-service Agricultural Training Institute, Sargodha', address: 'Risala No. 5, Sargodha, Pakistan', phone: '048-3714177' },
  { name: 'Extension Services Management Academy (ESMA), Garhi Dupatta', address: 'Garhi Dupatta, approximately 24 km from Muzaffarabad along the Jhelum River, Azad Kashmir', phone: '058229-62500' },
];

const downloadItems = [
  { title: 'Universal UG-PG-3 v17.4.1 (WS 2015–16)', label: 'Download result preparation software', url: 'https://web.uaf.edu.pk/Contents/downloads/UG-PG-3v17.4.1.xls' },
  { title: 'Presentation Award Soft v15.2', label: 'Download presentation award software', url: 'https://uaf.edu.pk/downloads/2nd_path/PresentationAwardSoft%20v15.2.pdf' },
];

interface Props {
  initialSection?: string;
}

export const ControllerExaminationsPage: React.FC<Props> = ({ initialSection }) => {
  const [activeSection, setActiveSection] = useState<SectionId>(
    sections.some((section) => section.id === initialSection) ? initialSection as SectionId : 'overview'
  );
  const [moreOpen, setMoreOpen] = useState(false);
  const [staffProfiles, setStaffProfiles] = useState<ControllerExaminationsStaffProfile[]>(controllerExaminationsStaffPlaceholders);
  const [staffProfilesLoading, setStaffProfilesLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonRecord | null>(null);

  useEffect(() => {
    if (activeSection !== 'staff') return;
    let cancelled = false;
    setStaffProfilesLoading(true);
    fetch('/api/controller-examinations/staff', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Could not fetch staff profiles');
        return response.json();
      })
      .then((result) => {
        if (!cancelled && Array.isArray(result.profiles)) setStaffProfiles(result.profiles);
      })
      .catch(() => {
        if (!cancelled) setStaffProfiles(controllerExaminationsStaffPlaceholders);
      })
      .finally(() => {
        if (!cancelled) setStaffProfilesLoading(false);
      });
    return () => { cancelled = true; };
  }, [activeSection]);

  if (selectedPerson) return <PeopleProfileView person={selectedPerson} onBack={() => setSelectedPerson(null)} />;

  const selectSection = (id: SectionId) => {
    setActiveSection(id);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('section', id);
    window.history.replaceState({}, '', nextUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f9fa] text-stone-900 font-sans">
      <section className="relative flex min-h-[380px] w-full items-center overflow-hidden border-b border-[#c99738]/40 bg-[#071b2d] text-white sm:min-h-[440px]">
        <div className="absolute inset-0">
          <img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full scale-105 object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/65 via-[#071b2d]/40 to-[#071b2d]/20" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-10 text-left sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#e8a62a]" /> University Administration
            </div>
            <h1 className="font-serif-heading text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-4xl lg:text-[42px]">
              Office of the Controller of <span className="font-medium italic text-[#e8a62a]">Examinations</span>
            </h1>
            <p className="max-w-3xl text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] sm:text-base">
              Examination results, academic records, degree services, affiliated institutes, and the University Convocation.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2 text-xs font-medium text-stone-200">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3.5 py-2"><ClipboardList className="h-3.5 w-3.5 text-[#e8a62a]" /> Results & records</span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3.5 py-2"><Building2 className="h-3.5 w-3.5 text-[#e8a62a]" /> 6 affiliated institutes</span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3.5 py-2"><GraduationCap className="h-3.5 w-3.5 text-[#e8a62a]" /> Undergraduate & postgraduate</span>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-30 -mt-6 flex justify-center px-3 sm:-mt-7 sm:px-6">
        <nav aria-label="Controller of Examinations sections" className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-[#c99738]/80 bg-[#071b2d] px-2.5 py-1.5 text-xs font-bold text-white shadow-[0_12px_32px_rgba(7,27,45,0.4)] sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-2 sm:text-[13px]">
          {sections.slice(0, 4).map((section) => (
            <button key={section.id} type="button" onClick={() => selectSection(section.id)} aria-current={activeSection === section.id ? 'page' : undefined}
              className={`shrink-0 rounded-full px-3 py-2 transition sm:px-3.5 ${activeSection === section.id ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50' : 'text-white hover:bg-[#163887]'}`}>
              {section.label}
            </button>
          ))}
          <div className="relative shrink-0" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button type="button" aria-haspopup="menu" aria-expanded={moreOpen} onClick={() => setMoreOpen((open) => !open)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 transition sm:px-3.5 ${activeSection === 'downloads' || moreOpen ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50' : 'text-white hover:bg-[#163887]'}`}>
              More <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && <div role="menu" className="absolute right-0 top-full z-50 w-64 pt-2">
              <div className="overflow-hidden rounded-2xl border border-[#c99738]/50 bg-[#071b2d] py-2 text-white shadow-2xl">
                {sections.slice(4).map((section) => <button key={section.id} type="button" role="menuitem" onClick={() => { selectSection(section.id); setMoreOpen(false); }} className={`w-full px-4 py-3 text-left text-sm font-bold transition hover:bg-[#163887] ${activeSection === section.id ? 'bg-[#163887]' : ''}`}>{section.label}</button>)}
              </div>
            </div>}
          </div>
        </nav>
      </div>

      <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        {activeSection === 'overview' && <div className="flow-root rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-6 w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm md:float-right md:ml-6 md:w-[320px] lg:w-[360px]">
            <img src="/uaf_historic_campus.jpg" alt="Historic campus of the University of Agriculture Faisalabad" className="h-56 w-full object-cover object-center transition-transform duration-500 hover:scale-105" />
            <div className="border-t border-stone-200 bg-stone-50 p-3"><span className="block text-xs font-semibold text-stone-800">University of Agriculture, Faisalabad</span><span className="mt-0.5 block text-[11px] text-stone-500">Office of the Controller of Examinations</span></div>
          </div>
          <p className="text-base leading-8 text-stone-700">The University of Agriculture, Faisalabad, has a long-standing tradition of excellence in the fields of Agriculture and Life Sciences. The Office of the Controller of Examinations is an integral part of the University administration and is committed to upholding this tradition while continuously striving for improvement to meet future challenges.</p>
          <p className="mt-5 text-base leading-8 text-stone-700">The primary responsibilities of the Office include compiling and notifying examination results submitted by faculty members and examiners, and issuing degrees, certificates, and diplomas to successful candidates upon fulfillment of all requirements prescribed in the University statutes and regulations. The Office also undertakes the verification of degrees, certificates, and diplomas for employers, institutions, and applicants.</p>
          <p className="mt-5 text-base leading-8 text-stone-700">The Office of the Controller of Examinations comprises three major sections. At the culmination of each academic year, the Office plays a pivotal role in organizing and conducting the University Convocation. This includes verification of graduates’ eligibility, preparation of degree records, coordination with academic and administrative units, and issuance of degrees and awards to successful graduates.</p>
          <p className="mt-5 text-base leading-8 text-stone-700">The Convocation is held annually for the conferment of degrees and the award of Gold, Silver, and Bronze Medals in recognition of outstanding academic achievement.</p>
          <h2 className="mt-8 flex items-center gap-2 text-xl font-bold text-[#163887]"><Award className="h-5 w-5 text-[#c99738]" /> Major examination sections</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {['Postgraduate: MS/M.Phil./M.Sc. (Hons.)/MBA/Ph.D. programs', 'Undergraduate: BS/B.Sc./B.Sc. (Hons.)/DVM programs', 'Affiliated Programs: DAS, LAD, PAD, MAT, and GSSQM'].map((item, index) => <li key={item} className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm font-semibold leading-6 text-stone-700"><span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#163887] text-xs text-white">{index + 1}</span>{item}</li>)}
          </ol>
          <div className="mt-8 rounded-xl bg-[#f3f6fb] p-5 sm:p-6">
            <h2 className="text-lg font-bold text-[#163887]">Office contact</h2>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-stone-700 sm:grid-cols-2">
              <p><strong>Address:</strong> Controller of Examinations, University of Agriculture, Faisalabad – 38040, Pakistan</p>
              <p><strong>Phone:</strong> +92-41-9200161-70 Ext. 2300, 2301</p>
              <p><strong>Additional phone:</strong> +92-41-9200191, +92-41-9200722</p>
              <p><strong>Email:</strong> <a className="font-semibold text-[#163887] hover:underline" href="mailto:controller.examinations@uaf.edu.pk">controller.examinations@uaf.edu.pk</a></p>
              <p><strong>Fax:</strong> +92-41-9200722</p>
            </div>
          </div>
        </div>}

        {activeSection === 'affiliated' && <div>
          <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">Controller of Examinations</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">Affiliated Institutes</h2><p className="mt-2 text-sm text-stone-600">Agricultural Training Institutes and their addresses.</p></div>
          <div className="grid gap-4 md:grid-cols-2">{affiliatedInstitutes.map((institute, index) => <article key={institute.name} className="rounded-2xl border border-stone-200 border-t-4 border-t-[#c99738] bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#163887] text-sm font-bold text-white">{index + 1}</span><div><h3 className="font-bold leading-6 text-[#163887]">{institute.name}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{institute.address}</p><p className="mt-3 text-sm font-semibold text-stone-700">Contact: <a href={`tel:${institute.phone.replace(/[^+\d]/g, '')}`} className="text-[#163887] hover:underline">{institute.phone}</a></p></div></div></article>)}</div>
        </div>}

        {activeSection === 'staff' && <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 border-b-4 border-b-[#c9cf9b] bg-white px-6 py-6 shadow-sm sm:px-7">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-stone-900"><span className="h-2.5 w-2.5 rounded-full bg-[#163887]" /> Office Administration &amp; Staff</p>
              <h2 className="mt-2 text-2xl font-extrabold text-stone-950 sm:text-3xl">Staff Profiles — Controller of Examinations</h2>
              <p className="mt-1.5 text-sm text-stone-500">{staffProfiles.length} {staffProfiles.every((profile) => profile.placeholder) ? 'staff profile placeholders' : 'active staff members'} · University of Agriculture, Faisalabad</p>
            </div>
            <button type="button" onClick={() => selectSection('overview')} className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-4 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-200"><Building2 className="h-4 w-4" /> View Overview &amp; Facilities</button>
          </div>
          {staffProfilesLoading && <p className="mb-4 text-sm text-stone-500" aria-live="polite">Loading staff profiles…</p>}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {staffProfiles.map((profile) => <article key={profile.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-square overflow-hidden bg-stone-100">
                {profile.photoUrl ? <img src={profile.photoUrl} alt={profile.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 text-slate-400"><UserRound className="h-20 w-20" strokeWidth={1.25} /><span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">Profile photo placeholder</span></div>}
              </div>
              <div className="space-y-2.5 p-4 sm:p-5">
                <h3 className="text-lg font-extrabold leading-snug text-stone-950">{profile.name}</h3>
                <p className="flex items-start gap-2 text-sm text-stone-700"><Tag className="mt-0.5 h-4 w-4 shrink-0 text-[#315aa4]" />{profile.designation}</p>
                <p className="flex items-start gap-2 text-sm text-stone-600"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#315aa4]" />{profile.phone}</p>
                <p className="flex min-w-0 items-start gap-2 break-all text-sm text-stone-600"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#315aa4]" />{profile.email}</p>
                <button type="button" onClick={() => setSelectedPerson({ name: profile.name, designation: profile.designation, phone: profile.phone, email: profile.email, photoUrl: profile.photoUrl, departmentName: 'Office of the Controller of Examinations' })} className="mt-2 w-full rounded-lg bg-[#071b2d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#163887]">View Profile</button>
              </div>
            </article>)}
          </div>
        </div>}

        {activeSection === 'grading' && <div className="mx-auto max-w-5xl">
          <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">Academic Records</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">Quality Point Grading System</h2></div>
          <div className="rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-9"><p className="text-base leading-7 text-stone-700">GPA and CGPA are calculated from the total quality points and credit hours.</p><div className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-2xl bg-[#f3f6fb] p-6"><div className="flex items-center gap-2 font-bold text-[#163887]"><BookOpen className="h-5 w-5 text-[#c99738]" /> Grade Point Average (GPA)</div><p className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-stone-700">Sum of total quality points per semester ÷ Sum of total credit hours per semester</p></article><article className="rounded-2xl bg-[#f3f6fb] p-6"><div className="flex items-center gap-2 font-bold text-[#163887]"><Award className="h-5 w-5 text-[#c99738]" /> Cumulative GPA (CGPA)</div><p className="mt-4 rounded-lg bg-white p-4 text-sm leading-7 text-stone-700">Sum of total quality points from 1st to end semester ÷ Sum of total credit hours from 1st to end semester</p></article></div></div>
        </div>}

        {activeSection === 'downloads' && <div className="mx-auto max-w-5xl">
          <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99738]">Resources</p><h2 className="mt-2 text-2xl font-bold text-[#163887] sm:text-3xl">Downloads</h2></div>
          <div className="grid gap-4 md:grid-cols-2">{downloadItems.map((item) => <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#c99738] hover:shadow-md sm:p-6"><span className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#163887] text-white"><ArrowDownToLine className="h-5 w-5" /></span><span><strong className="block text-[#163887]">{item.title}</strong><span className="mt-1 block text-sm text-stone-600">{item.label}</span></span></span><ArrowDownToLine className="h-5 w-5 shrink-0 text-[#c99738] transition group-hover:translate-y-1" /></a>)}</div>
        </div>}
      </section>
    </main>
  );
};
