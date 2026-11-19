'use client';

import React from 'react';
import { BookOpen, Download, FileText, Landmark, UserRound } from 'lucide-react';

type Resource = { title: string; href: string; description?: string };
const statutoryResources: { category: string; items: Resource[] }[] = [
  { category: 'University Act and governance', items: [
    { title: 'The University of Agriculture Faisalabad Act, 1973 (amended up to 05 August 2025)', href: 'https://web.uaf.edu.pk/Contents/Status%20about/UAF%20Act%201973%20amended%20upto%20August,%2005.2025.pdf', description: 'The University Act and its amendments, published by UAF Academic Section.' },
    { title: 'UAF Conduct of Business Rules of the Senate, 1976', href: 'https://web.uaf.edu.pk/Contents/Status%20about/UAF%20Conduct%20of%20Bussiness%20rules%20of%20the%20senate,%201976.pdf' },
    { title: 'UAF Conduct of Business Rules of the Syndicate, 1976', href: 'https://web.uaf.edu.pk/Contents/Status%20about/UAF%20Conduct%20of%20Bussiness%20rules%20of%20the%20syndicate,%201976.pdf' },
    { title: 'UAF Conduct of Business Rules of the Academic Council, 1976', href: 'https://web.uaf.edu.pk/Contents/Status%20about/UAF%20Conduct%20of%20Bussiness%20rules%20of%20the%20Academic%20council,%201976.pdf' },
    { title: 'Conduct of Business Rules of Senate, 1976', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Conduct%20of%20Bussiness%20Rules%20of%20Senate%201976.pdf' },
    { title: 'Discipline and Conduct Regulations, 1978', href: 'https://web.uaf.edu.pk/Contents/Status%20about/180219DISCIPLINE%20AND%20CONDUCT%20REGULATIONS%201978.pdf' },
    { title: 'University of Agriculture Faisalabad Act, 1973 (archived copy)', href: 'https://web.uaf.edu.pk/Contents/downloads/miscellaneous/UAF_Act_1973_amended_upto_15082017.pdf' },
  ]},
  { category: 'Service statutes and staff rules', items: [
    { title: 'Revised Basic Pay Scales, Allowances and Pension (BS 1–22), 2016', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Revised%20Basic%20pay%20Scales%20Allowances%20and%20Pension%20BS1-22.pdf' },
    { title: 'Scale 17 and Above Appointment and Conditions of Service Statutes, 1989', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Scale%2017%20and%20above%20appointment%20and%20condition%20of%20service%20.pdf' },
    { title: 'General Conditions of Service Statutes, 1967', href: 'https://web.uaf.edu.pk/Contents/Status%20about/General%20Conditions%20of%20Service.pdf' },
    { title: 'Medical Attendance Statutes, 1968', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Medical%20Attendance.pdf' },
    { title: 'Pension Statutes, 1968', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Pension%20Statutes%201968.pdf' },
    { title: 'Employees BS 1–16 Appointment and Conditions of Service Statutes, 2017', href: 'https://web.uaf.edu.pk/Contents/Status%20about/UAF%20%20Employees%20BS-1%20to%20BS-16%20Appointment%20and%20condition%20of%20service%20statues%202017.pdf' },
    { title: 'Service Structure of Laboratory, Field and Technical Staff, 1997', href: 'https://web.uaf.edu.pk/Contents/Status%20about/UAF%20Service%20Structure%20of%20laboratory%20field%20and%20technical%20staff%201997.pdf' },
    { title: 'Employees Leave Statutes, 1989', href: 'https://web.uaf.edu.pk/Contents/Status%20about/UAF%20Employees%20Leave%20Statutes%201989.pdf' },
    { title: 'Employees Revised Basic Pay Scales and Allowances Statutes, 2008', href: 'https://www.uaf.edu.pk/downloads/UAF%20Employees%20_Revised%20Basic%20Pay%20Scles%20and%20Allowance_%20Statutes%202008.pdf' },
    { title: 'House Allotment Rules, 1973 (BPS 16 and above)', href: 'https://www.uaf.edu.pk/downloads/UAF%20House%20Allotment%20Rules%2016%20%26%20above.pdf' },
    { title: 'House Allotment Rules for Employees BPS 1–15, 1988', href: 'https://www.uaf.edu.pk/downloads/UAF%20House%20Allotment%20Rules%20BPS-1-15.pdf' },
    { title: 'Employees Revised Basic Pay Scales and Allowances Statutes, 2005', href: 'https://www.uaf.edu.pk/downloads/UAF%20Pay%20Scales%20and%20Allowances%20Sstatutes%202005.pdf' },
    { title: 'Employees Revised Basic Pay Scales and Allowances Statutes, 2007', href: 'https://www.uaf.edu.pk/downloads/UAF%20Pay%20Scales%20and%20Allowances%20Statutes%2C%202007.pdf' },
    { title: 'Revised Tenure Track Statutes, 2008', href: 'https://uaf.edu.pk/downloads/miscellaneous/REVISED%20TENURE%20TRACK%20STATUTES-2008.pdf' },
    { title: 'Faculty Conditions of Appointment Rules, 2009', href: 'https://www.uaf.edu.pk/downloads/UAF%20Adjunct%20Faculty%20_Conditions%20of%20Appointment_%20Rules%2C%202009.pdf' },
    { title: 'Award of Meritorious Professors (BPS-22) Statutes', href: 'https://www.uaf.edu.pk/downloads/Meriterious%20Professor%20BPS-22%20Statutes.pdf' },
    { title: 'Proforma for Promotion to BPS-22', href: 'https://www.uaf.edu.pk/downloads/Proforma%20of%20Meritorious%20Professor.pdf' },
  ]},
  { category: 'Policies, regulations and notices', items: [
    { title: 'Awareness Campaign Against the Use of Narcotics', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Awareness%20campaign%20in%20public%20against%20the%20use%20of%20anti%20narcoties.pdf' },
    { title: 'HEC Plagiarism Policy', href: 'https://web.uaf.edu.pk/Contents/Status%20about/HEC%20Plagiarism%20Policy.pdf' },
    { title: 'Amended UAF Procurement Rule, 2014', href: 'https://web.uaf.edu.pk/Contents/Status%20about/AMENDED%20UAF%20PROCUREMENT%20RULE%202014.pdf' },
    { title: 'Notification: Maximum Period of Joining Time on Initial Appointment', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Notofication-Decision%20of%20Syndicate%20regarding%20maximum%20period%20of%20Joining%20time%20on%20iniial%20appointment.pdf' },
    { title: 'HEC Policy Guidelines Against Sexual Harassment in Higher Learning Institutions', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Policy_Guidelines_on_Harassment%202.pdf' },
    { title: 'Policy Guidelines on Harassment', href: 'https://web.uaf.edu.pk/Contents/Status%20about/Policy_Guidelines_on_Harassment.pdf' },
    { title: 'The Protection Against Harassment of Women at the Workplace Act, 2010', href: 'https://web.uaf.edu.pk/Contents/downloads/Protecton%20against%20harassment%20of%20Women%20at%20the%20workplace%20Act2010.pdf' },
    { title: 'Punjab Employees Efficiency, Discipline and Accountability Act, 2006', href: 'https://www.uaf.edu.pk/downloads/miscellaneous/PEEDA_2006.pdf' },
  ]},
];

const formerViceChancellors: { name: string; dates: string; photo?: string; note?: string }[] = [
  { name: 'Dr. Z. A. Hashmi', dates: '01 Nov 1961 – 31 Aug 1969', photo: 'dr_z_a_hashmi.jpg' },
  { name: 'Dr. N. D. Yousaf (T.I.)', dates: '01 Sep 1969 – 20 Oct 1969', photo: 'dr_n_d_yousaf.jpg' },
  { name: 'Dr. Israr-ul-Haq', dates: '21 Oct 1969 – 20 Oct 1975', photo: 'dr_israr_ul_haq.jpg' },
  { name: 'Dr. Amir Muhammad', dates: '29 Oct 1975 – 17 Sep 1978', photo: 'dr_amir_muhammad.jpg' },
  { name: 'Dr. G. R. Chaudhry', dates: '18 Sep 1978 – 25 Sep 1981', photo: 'dr_g_r_chudhari.jpg' },
  { name: 'Mian Mumtaz Ali', dates: '26 Sep 1981 – 13 Jun 1987', photo: 'mian_mumtaz_ali.jpg' },
  { name: 'Dr. Abdur Rehman (T.I.)', dates: '14 Jun 1987 – 13 Jun 1991', photo: 'dr_abdul_rehman.jpg' },
  { name: 'Dr. Muhammad Rafiq Khan', dates: '27 Jun 1991 – 30 Nov 1995', photo: 'dr_m_rafiq_khan.jpg' },
  { name: 'Dr. M. Anwar-ul-Haq', dates: '01 Dec 1995 – 10 Dec 1996', photo: 'dr_m_anwar_ul_haq.jpg' },
  { name: 'Dr. Ahmad Nadeem Sheri', dates: '15 Dec 1996 – 28 Sep 1999', photo: 'dr_ahmad_nadeem_sheri.jpg' },
  { name: 'Dr. Riaz Hussain Qureshi', dates: '11 Dec 1999 – 15 Feb 2004', photo: 'dr_riaz_husain_qureshi.jpg' },
  { name: 'Dr. Bashir Ahmad', dates: '16 Feb 2004 – 27 Feb 2008', photo: 'dr_bashir_ahmad.jpg' },
  { name: 'Prof. Dr. Iqrar Ahmad Khan', dates: '27 Feb 2008 – 23 Jan 2017', note: 'Served two terms; briefly held acting charge in 2017.' },
  { name: 'Prof. Dr. Muhammad Ashraf', dates: '16 Apr 2019 – 2020', note: 'Appointment and tenure were affected by court proceedings.' },
  { name: 'Prof. Dr. Iqrar Ahmad Khan', dates: '20 Oct 2020 – 20 Oct 2024', note: 'Retired from the Vice Chancellor’s office in October 2024.' },
  { name: 'Prof. Dr. Muhammad Sarwar Khan', dates: '20 Oct 2024 – 04 Mar 2025', note: 'Assumed charge of the Vice Chancellor’s office after Dr. Iqrar Ahmad Khan’s retirement.' },
];
const formerVcPhoto = (filename: string) => `https://web.uaf.edu.pk/Contents/former_vc/images/${filename}`;

const PageHero: React.FC<{ title: string; subtitle: string; eyebrow: string }> = ({ title, subtitle, eyebrow }) => (
  <section className="relative flex min-h-[320px] items-center overflow-hidden border-b border-[#c99738]/50 bg-[#071b2d] text-white sm:min-h-[380px]">
    <div className="absolute inset-0"><img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/85 via-[#071b2d]/55 to-[#071b2d]/20"/></div>
    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8"><span className="inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300">{eyebrow}</span><h1 className="mt-5 max-w-4xl font-serif-heading text-4xl font-bold leading-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-white/95 sm:text-lg">{subtitle}</p></div>
  </section>
);

export const UniversityStatutesPage: React.FC = () => <main className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fa] font-sans text-stone-900">
  <PageHero eyebrow="University Governance" title="Act, Statues, Rules and Regulations" subtitle="University legislation, statutes, service rules, policies, and regulations published by UAF." />
  <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-12 sm:px-6 lg:px-8">
    <article className="mb-8 rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-8"><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#163887] text-white"><Landmark className="h-6 w-6"/></span><div><h2 className="text-xl font-bold text-[#163887]">UAF Act and statutory documents</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-stone-600">Browse the documents listed in UAF’s Act, Statutes, Rules and Regulations section. The current consolidated University Act listed there is amended up to 05 August 2025.</p></div></div></article>
    <div className="space-y-8">{statutoryResources.map((group)=><section key={group.category}><h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#163887]"><BookOpen className="h-5 w-5 text-[#c99738]"/>{group.category}</h2><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{group.items.map((resource)=><article key={resource.title} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#163887]"><FileText className="h-5 w-5"/></span><h3 className="pt-1 text-sm font-bold leading-6 text-stone-900">{resource.title}</h3></div>{resource.description&&<p className="mt-3 text-sm leading-6 text-stone-600">{resource.description}</p>}<a href={resource.href} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[#163887] hover:text-[#c99738]"><Download className="h-4 w-4"/>Open document</a></article>)}</div></section>)}</div>
    <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-stone-700">Document links open UAF’s published files. Use the latest amended document when a newer version is listed.</p>
  </section>
</main>;

export const FormerViceChancellorsPage: React.FC = () => <main className="min-h-screen w-full overflow-x-hidden bg-[#f8f9fa] font-sans text-stone-900">
  <PageHero eyebrow="University History" title="Former Vice Chancellors" subtitle="UAF’s historical Vice Chancellor timeline, extended with later verified office holders." />
  <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-12 sm:px-6 lg:px-8"><article className="mb-8 rounded-2xl border border-stone-200 border-l-4 border-l-[#163887] bg-white p-6 shadow-sm sm:p-8"><p className="text-base leading-7 text-stone-700">The University of Agriculture, Faisalabad traces its university history to 1961. The timeline begins with UAF’s published historical list and continues with later office holders confirmed through UAF announcements and contemporaneous reports.</p></article><div className="relative grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{formerViceChancellors.map(({name,dates,photo,note},index)=><article key={`${name}-${dates}`} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="relative">{photo?<img src={formerVcPhoto(photo)} alt={`Portrait of ${name}`} loading="lazy" className="aspect-[4/3] w-full bg-stone-100 object-cover object-top"/>:<div aria-label={`Portrait unavailable for ${name}`} className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-[#071b2d] via-[#163887] to-[#3154a1] text-white"><div className="text-center"><UserRound className="mx-auto h-14 w-14 text-blue-100"/><p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">University Leadership</p></div></div>}<span className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#071b2d]/90 px-3 py-1 text-xs font-bold text-amber-300">{String(index+1).padStart(2,'0')}</span></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#c99738]">Vice Chancellor</p><h2 className="mt-1 text-lg font-bold text-[#163887]">{name}</h2><p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-sm font-semibold text-stone-700">{dates}</p>{note&&<p className="mt-3 text-xs leading-5 text-stone-500">{note}</p>}</div></article>)}</div><p className="mt-6 text-xs leading-5 text-stone-500">Dr. Zulfiqar Ali is not listed as a former Vice Chancellor because UAF’s current directory identifies him as the incumbent.</p></section>
</main>;
