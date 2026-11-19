'use client';

import React from 'react';
import { FacultyProfileDetailPage } from './FacultyProfileDetailPage';
import type { StaffMember } from './FacultyPortalPage';

export interface PersonRecord {
  name: string; designation: string; phone?: string; email?: string; photoUrl?: string | null;
  qualification?: string; specialization?: string; departmentName: string; facultyName?: string;
}

export const PeopleProfileView: React.FC<{ person: PersonRecord; onBack: () => void }> = ({ person, onBack }) => {
  const member: StaffMember = {
    name: person.name, designation: person.designation,
    qualification: person.qualification || 'Not provided',
    specialization: person.specialization || person.designation,
    email: person.email || 'Not provided', phone: person.phone || 'Not provided',
    image: person.photoUrl || undefined, hecApprovedSupervisor: 'Not provided',
    address: `${person.departmentName}, University of Agriculture, Faisalabad, Pakistan`,
  };
  return <>
    <section className="relative flex min-h-[380px] w-full items-center overflow-hidden border-b border-[#c99738]/40 bg-[#071b2d] text-white sm:min-h-[440px]">
      <div className="absolute inset-0"><img src="/uaf_facade_no_road.jpg" alt="University of Agriculture Faisalabad campus" className="h-full w-full scale-105 object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/55 via-[#071b2d]/35 to-[#071b2d]/15"/></div>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-10 text-left sm:px-6 sm:py-14 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-sm backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-[#e8a62a]"/>{person.departmentName}</div>
          <h1 className="font-serif-heading text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-[42px]">Faculty &amp; Staff <span className="font-medium italic text-[#e8a62a]">Profile</span></h1>
          <p className="max-w-2xl text-sm font-medium leading-relaxed text-white drop-shadow-md sm:text-base">{person.designation} · University of Agriculture, Faisalabad</p>
        </div>
      </div>
    </section>
    <FacultyProfileDetailPage member={member} portraitUrl={person.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'} phoneNum={person.phone || 'Not provided'} departmentName={person.departmentName} departmentShortLabel={person.departmentName} facultyName={person.facultyName || 'University Administration'} showBackBtn onBack={onBack} showJournalsAndArticles={false}/>
  </>;
};
