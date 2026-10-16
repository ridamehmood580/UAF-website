'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  Sparkles,
  GraduationCap,
  UserCheck,
  ExternalLink,
  LogOut,
  LayoutTemplate,
  Building2,
  Globe2,
  Award,
  ChevronRight
} from 'lucide-react';
import type { AuthUser } from '../page-builder/cmsStore';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAdvisor: () => void;
  onOpenCalculator: () => void;
  onOpenAppointment: () => void;
  onSelectFaculty: (facultyId: string, section?: string) => void;
  onNavigateHome?: () => void;
  onNavigateAdmissions?: (category: 'undergraduate' | 'postgraduate' | 'international') => void;
  activeSection?: string;
  currentUser?: AuthUser | null;
  onOpenAuthModal?: () => void;
  onOpenAdminDashboard?: () => void;
  onOpenDepartmentStudio?: () => void;
  onOpenFacultyManager?: () => void;
  onLogout?: () => void;
}

type AcademicCategory =
  | 'FACULTIES'
  | 'INSTITUTES'
  | 'CONSTITUENT COLLEGES'
  | 'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES'
  | 'COMMUNITY COLLEGE'
  | 'DIRECTORATE OF CABB'
  | 'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER'
  | 'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE';

// Top utility bar: white background with blue text
const TOP_BAR_WHITE = '#ffffff';
const TOP_BAR_TEXT_BLUE = '#1e3a7a';

// Gold accent (top bar border and bottom line)
const GOLD_ACCENT = '#ed9d09';

// Main navbar uses the navy blue from the university crest
const NAV_BLUE = '#163887';

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAdvisor,
  onOpenCalculator,
  onOpenAppointment,
  onSelectFaculty,
  onNavigateHome,
  onNavigateAdmissions,
  currentUser,
  onOpenAuthModal,
  onOpenAdminDashboard,
  onOpenDepartmentStudio,
  onOpenFacultyManager,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownOpenSource, setDropdownOpenSource] = useState<'hover' | 'click' | null>(null);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [activeAcademicCategory, setActiveAcademicCategory] = useState<AcademicCategory | null>(null);
  const academicsDropdownRef = useRef<HTMLLIElement>(null);
  const admissionsDropdownRef = useRef<HTMLLIElement>(null);

  const ACADEMIC_SUBMENUS: Record<AcademicCategory, { name: string; facultyId?: string }[]> = {
    'FACULTIES': [
      { name: 'FACULTY OF AGRICULTURE', facultyId: 'fac-agri' },
      { name: 'FACULTY OF VETERINARY SCIENCE', facultyId: 'fac-vet' },
      { name: 'FACULTY OF SCIENCES', facultyId: 'fac-sci' },
      { name: 'FACULTY OF ANIMAL HUSBANDRY', facultyId: 'fac-husbandry' },
      { name: 'FACULTY OF AGRICULTURE ENGINEERING AND TECHNOLOGY', facultyId: 'fac-engg' },
      { name: 'FACULTY OF SOCIAL SCIENCES', facultyId: 'fac-social' },
      { name: 'FACULTY OF FOOD, NUTRITION AND HOME SCIENCES', facultyId: 'fac-food' },
      { name: 'FACULTY OF ARTS AND HUMANITIES', facultyId: 'fac-arts' },
      { name: 'FACULTY OF HEALTH AND PHARMACEUTICAL SCIENCES', facultyId: 'fac-health' }
    ],
    'INSTITUTES': [
      { name: 'INSTITUTE OF HORTICULTURAL SCIENCES', facultyId: 'fac-agri' },
      { name: 'INSTITUTE OF SOIL & ENVIRONMENTAL SCIENCES', facultyId: 'fac-agri' },
      { name: 'INSTITUTE OF ANIMAL & DAIRY SCIENCES', facultyId: 'fac-husbandry' },
      { name: 'INSTITUTE OF BUSINESS MANAGEMENT SCIENCES (IBMS)', facultyId: 'fac-social' },
      { name: 'INSTITUTE OF MICROBIOLOGY', facultyId: 'fac-vet' },
      { name: 'NATIONAL INSTITUTE OF FOOD SCIENCE & TECHNOLOGY (NIFSAT)', facultyId: 'fac-food' },
      { name: 'INSTITUTE OF AGRICULTURAL EXTENSION & RURAL DEVELOPMENT', facultyId: 'fac-social' },
      { name: 'INSTITUTE OF PHARMACY, PHYSIOLOGY & PHARMACOLOGY', facultyId: 'fac-health' },
      { name: 'INSTITUTE OF AGRICULTURAL & RESOURCE ECONOMICS', facultyId: 'fac-social' }
    ],
    'CONSTITUENT COLLEGES': [
      { name: 'UAF SUB-CAMPUS BUREWALA (VEHARI)', facultyId: 'fac-agri' },
      { name: 'UAF SUB-CAMPUS TOBA TEK SINGH', facultyId: 'fac-agri' },
      { name: 'UAF SUB-CAMPUS DEPALPUR (OKARA)', facultyId: 'fac-agri' },
      { name: 'UAF COMMUNITY COLLEGE PARS', facultyId: 'fac-agri' }
    ],
    'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES': [
      { name: 'USPCAS-AFS RESEARCH DIVISIONS', facultyId: 'fac-agri' },
      { name: 'CLIMATE WATER BIO-RESOURCES WING', facultyId: 'fac-engg' },
      { name: 'CHILLED CLIMATE RESEARCH PHYTOTRONS', facultyId: 'fac-agri' },
      { name: 'POLICY DIALOGUE & OUTREACH SUITE', facultyId: 'fac-social' }
    ],
    'COMMUNITY COLLEGE': [
      { name: 'DIPLOMA IN AGRICULTURAL SCIENCES (DAS)', facultyId: 'fac-agri' },
      { name: 'INTERMEDIATE PRE-AGRICULTURE', facultyId: 'fac-agri' },
      { name: 'LIVESTOCK ASSISTANT DIPLOMA (LAD)', facultyId: 'fac-husbandry' },
      { name: 'FARM MACHINERY SKILL TRAINING', facultyId: 'fac-engg' }
    ],
    'DIRECTORATE OF CABB': [
      { name: 'CENTRE OF AGRICULTURAL BIOCHEMISTRY & BIOTECHNOLOGY', facultyId: 'fac-sci' },
      { name: 'PLANT TISSUE CULTURE & TRANSGENICS LAB', facultyId: 'fac-sci' },
      { name: 'MOLECULAR DIAGNOSTICS & GENOMICS CORE', facultyId: 'fac-sci' },
      { name: 'BIO-INFORMATICS & GENE EDITING (CRISPR)', facultyId: 'fac-sci' }
    ],
    'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER': [
      { name: 'SHORT COURSES IN COMMERCIAL HYDROPONICS', facultyId: 'fac-agri' },
      { name: 'MODERN TUNNEL FARMING & GREENHOUSE DESIGN', facultyId: 'fac-agri' },
      { name: 'DAIRY HERD MANAGEMENT & ARTIFICIAL INSEMINATION', facultyId: 'fac-husbandry' },
      { name: 'AGRI-DRONE PILOT & PRECISION SPRAY CERTIFICATION', facultyId: 'fac-engg' }
    ],
    'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE': [
      { name: 'INDUS BASIN GROUNDWATER MONITORING NETWORK', facultyId: 'fac-engg' },
      { name: 'PRECISION DRIP & SPRINKLER TELEMETRY', facultyId: 'fac-engg' },
      { name: 'SOLAR PUMPING & SALINITY RECLAMATION', facultyId: 'fac-engg' },
      { name: 'CLIMATE ADAPTIVE IRRIGATION REGIMES', facultyId: 'fac-engg' }
    ]
  };

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        (academicsDropdownRef.current && target && academicsDropdownRef.current.contains(target)) ||
        (admissionsDropdownRef.current && target && admissionsDropdownRef.current.contains(target))
      ) {
        return;
      }
      setActiveDropdown(null);
      setDropdownOpenSource(null);
      setQuickLinksOpen(false);
      setActiveAcademicCategory(null);
    };
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  const handleAcademicsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeDropdown === 'academics' && dropdownOpenSource === 'click') {
      setActiveDropdown(null);
      setDropdownOpenSource(null);
      setActiveAcademicCategory(null);
    } else {
      setActiveDropdown('academics');
      setDropdownOpenSource('click');
      setActiveAcademicCategory(null);
    }
  };

  const handleAcademicsMouseEnter = () => {
    if (dropdownOpenSource !== 'click') {
      setActiveDropdown('academics');
      setDropdownOpenSource('hover');
    }
  };

  const handleAcademicsMouseLeave = () => {
    if (dropdownOpenSource === 'hover') {
      setActiveDropdown(null);
      setDropdownOpenSource(null);
      setActiveAcademicCategory(null);
    }
  };

  const handleAdmissionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeDropdown === 'admissions' && dropdownOpenSource === 'click') {
      setActiveDropdown(null);
      setDropdownOpenSource(null);
    } else {
      setActiveDropdown('admissions');
      setDropdownOpenSource('click');
    }
  };

  const handleAdmissionsMouseEnter = () => {
    if (dropdownOpenSource !== 'click') {
      setActiveDropdown('admissions');
      setDropdownOpenSource('hover');
    }
  };

  const handleAdmissionsMouseLeave = () => {
    if (dropdownOpenSource === 'hover') {
      setActiveDropdown(null);
      setDropdownOpenSource(null);
    }
  };

  const handleSubmenuItemClick = (facultyId?: string, itemName?: string) => {
    setActiveDropdown(null);
    setDropdownOpenSource(null);
    setActiveAcademicCategory(null);
    if (onSelectFaculty) {
      if (itemName?.includes('HORTICULTURAL')) {
        onSelectFaculty('fac-agri', 'horticulture');
      } else if (itemName?.includes('SOIL')) {
        onSelectFaculty('fac-agri', 'soil-sciences');
      } else if (itemName?.includes('ANIMAL & DAIRY')) {
        onSelectFaculty('fac-husbandry', 'ah-iads');
      } else if (itemName?.includes('BUSINESS MANAGEMENT')) {
        onSelectFaculty('fac-social', 'soc-ibms');
      } else if (itemName?.includes('MICROBIOLOGY')) {
        onSelectFaculty('fac-vet', 'vet-microbiology');
      } else if (itemName?.includes('NIFSAT') || itemName?.includes('FOOD SCIENCE')) {
        onSelectFaculty('fac-food', 'food-nifsat');
      } else if (itemName?.includes('EXTENSION')) {
        onSelectFaculty('fac-social', 'soc-iaeerd');
      } else if (itemName?.includes('PHARMACY')) {
        onSelectFaculty('fac-health', 'health-pharmacy');
      } else if (itemName?.includes('RESOURCE ECONOMICS')) {
        onSelectFaculty('fac-social', 'soc-iare');
      } else if (itemName?.includes('BIOCHEMISTRY & BIOTECHNOLOGY')) {
        onSelectFaculty('fac-agri', 'cabb');
      } else if (facultyId) {
        onSelectFaculty(facultyId, 'overview');
      } else {
        onSelectFaculty('fac-agri', 'overview');
      }
    }
  };

  const handleAdmissionItemClick = (cat: 'undergraduate' | 'postgraduate' | 'international') => {
    setActiveDropdown(null);
    setDropdownOpenSource(null);
    if (onNavigateAdmissions) {
      onNavigateAdmissions(cat);
    } else {
      const el = document.getElementById('admissions');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full select-none font-sans bg-white">

      {/* =====================================================
          1. TOP UTILITY BAR (Full width, white, rounded top, gold border)
      ====================================================== */}
      <div
        className="w-full text-[13px] rounded-t-2xl border-t-2 border-x-2 border-b-2"
        style={{ backgroundColor: TOP_BAR_WHITE, color: TOP_BAR_TEXT_BLUE, borderColor: GOLD_ACCENT }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[42px] flex items-center justify-between gap-4">

          {/* Left Utility Links */}
          <div className="hidden lg:flex items-center gap-6 font-semibold tracking-wide">
            <a href="https://lms.uaf.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563eb] hover:underline transition-colors">
              LMS
            </a>
            <a href="https://sis.uaf.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563eb] hover:underline transition-colors">
              SIS
            </a>
            <a href="#administration" className="hover:text-[#2563eb] hover:underline transition-colors">
              Faculty and Staff
            </a>
            <a href="#about" className="hover:text-[#2563eb] hover:underline transition-colors">
              Alumni
            </a>
            <a href="#rti" className="hover:text-[#2563eb] hover:underline transition-colors">
              ORIC
            </a>
            <a href="#notices" className="hover:text-[#2563eb] hover:underline transition-colors">
              Jobs
            </a>
            <a href="#about" className="hover:text-[#2563eb] hover:underline transition-colors">
              PKNC
            </a>

            {/* Quick Links Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="inline-flex items-center gap-1.5 hover:text-[#2563eb] hover:underline transition-colors cursor-pointer"
              >
                <span>Quick Links</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${quickLinksOpen ? 'rotate-180' : ''}`} />
              </button>

              {quickLinksOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white text-stone-800 rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <button
                    onClick={() => {
                      setQuickLinksOpen(false);
                      onOpenCalculator();
                    }}
                    className="w-full text-left flex items-center justify-between px-4 py-2.5 hover:bg-[#163887] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Undergraduate Merit Calculator</span>
                    <span className="text-[10px] bg-amber-200 text-stone-900 px-1.5 py-0.5 rounded font-bold">2026</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickLinksOpen(false);
                      onOpenAdvisor();
                    }}
                    className="w-full text-left flex items-center justify-between px-4 py-2.5 hover:bg-[#163887] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Ask UAF Virtual Guide</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <a
                    href="https://web.uaf.edu.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#163887] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <span>Main UAF Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>
                  <a
                    href="#latest-events"
                    onClick={() => setQuickLinksOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#163887] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <span>Campus Events & News</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Utility Section */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-[13px] ml-auto font-medium">
            <button
              onClick={onOpenAdvisor}
              className="inline-flex items-center gap-1.5 hover:text-[#2563eb] hover:underline transition-colors cursor-pointer"
            >
              <span>Complaints/Suggestions</span>
            </button>

            <div className="hidden lg:block w-[1.5px] h-4 bg-[#1e3a7a]/30 transform -skew-x-25"></div>

            <button
              type="button"
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-1.5 hover:text-[#2563eb] hover:underline transition-colors cursor-pointer"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: TOP_BAR_TEXT_BLUE, color: TOP_BAR_WHITE }}
              >
                <UserCheck className="w-3 h-3" />
              </div>
              <span className="font-semibold">Staff Login</span>
            </button>
          </div>

        </div>
      </div>

      {/* =====================================================
          2. MAIN NAVBAR (Full width, blue from crest, no gap above)
      ====================================================== */}
      <nav
        className="w-full min-h-[82px] flex items-center shadow-lg border-b-2 border-[#ed9d09]"
        style={{ backgroundColor: NAV_BLUE }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">

          {/* Official UAF Crest + Typography */}
          <button
            type="button"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 group shrink-0 py-2 cursor-pointer text-left"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#ed9d09] flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src="/uaf_logo.jpg"
                alt="University of Agriculture Faisalabad Emblem"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col text-white tracking-wider">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-blue-100">
                UNIVERSITY OF
              </span>
              <span className="font-serif-heading font-black text-lg sm:text-[22px] leading-tight tracking-[0.06em] text-white">
                AGRICULTURE
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.26em] uppercase text-amber-300">
                FAISALABAD
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <ul
            className="hidden xl:flex items-center justify-end ml-auto gap-2.5 xl:gap-3 2xl:gap-5 text-[11px] xl:text-[11.5px] 2xl:text-[13px] font-bold text-white uppercase tracking-wider shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <li>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateHome) onNavigateHome();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors py-2 px-1 block cursor-pointer"
              >
                HOME
              </button>
            </li>

            {/* ABOUT */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                className={`hover:text-amber-400 transition-colors py-2 px-1 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'about' ? 'text-amber-400' : ''
                }`}
              >
                <span>ABOUT</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-md shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <a href="#vision" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    VISION 2050 & HERITAGE
                  </a>
                  <a href="#vc-message" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    VICE CHANCELLOR MESSAGE
                  </a>
                  <a href="#campus" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    CAMPUS LIFE & BOTANICAL GARDENS
                  </a>
                </div>
              )}
            </li>

            <li>
              <a href="#rti" className="hover:text-amber-400 transition-colors py-2 px-1 block">
                RTI
              </a>
            </li>

            {/* ADMINISTRATION */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'admin' ? null : 'admin')}
                className={`hover:text-amber-400 transition-colors py-2 px-1 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'admin' ? 'text-amber-400' : ''
                }`}
              >
                <span>ADMINISTRATION</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'admin' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <a href="#administration" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    OFFICERS OF THE UNIVERSITY
                  </a>
                  <a href="#administration" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    SYNDICATE & STATUTORY BODIES
                  </a>
                </div>
              )}
            </li>

            {/* ACADEMICS - MULTI-PANEL DROPDOWN */}
            <li
              className="relative"
              ref={academicsDropdownRef}
              onMouseEnter={handleAcademicsMouseEnter}
              onMouseLeave={handleAcademicsMouseLeave}
            >
              <button
                type="button"
                onClick={handleAcademicsClick}
                className={`hover:text-amber-400 transition-colors py-2 px-1 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'academics' ? 'text-amber-400' : ''
                }`}
              >
                <span>ACADEMICS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'academics' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'academics' && (
                <div
                  className="absolute top-[calc(100%+12px)] right-[-60px] z-50 flex items-start gap-3.5 animate-in fade-in duration-150"
                  onClick={(e) => e.stopPropagation()}
                  onMouseLeave={() => setActiveAcademicCategory(null)}
                >
                  {/* LEFT PANEL: Submenu list (opens slightly lower with mt-7, independent separated card) */}
                  {activeAcademicCategory && (
                    <div className="relative w-[340px] mt-7 bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-3.5 animate-in fade-in slide-in-from-right-2 duration-150">
                      {/* Invisible hover bridge across the gap so mouse movement never breaks */}
                      <div className="absolute top-0 bottom-0 -right-4 w-4 pointer-events-auto" />

                      <div className="flex flex-col space-y-1 overflow-y-auto max-h-[440px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {ACADEMIC_SUBMENUS[activeAcademicCategory].map((subItem, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSubmenuItemClick(subItem.facultyId, subItem.name)}
                            className="group w-full text-left font-bold text-[12px] sm:text-[12.5px] leading-snug tracking-wider px-3.5 py-2.5 rounded-lg transition-all uppercase cursor-pointer text-[#1e3a7a] hover:!bg-[#163887] hover:!text-white active:!bg-[#163887] active:!text-white focus:!bg-[#163887] focus:!text-white flex items-center justify-between"
                          >
                            <span className="group-hover:!text-white group-active:!text-white group-focus:!text-white transition-colors">
                              {subItem.name}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a] opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity shrink-0 ml-1.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RIGHT PANEL: Main academic categories (independent separated card) */}
                  <div className="relative">
                    {/* Arrow pointer matching admissions popup */}
                    <div className="absolute -top-2 right-[90px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white drop-shadow-sm" />

                    <div className="w-[315px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 py-2.5 overflow-hidden">
                      {(
                        [
                          'FACULTIES',
                          'INSTITUTES',
                          'CONSTITUENT COLLEGES',
                          'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES',
                          'COMMUNITY COLLEGE',
                          'DIRECTORATE OF CABB',
                          'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER',
                          'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE'
                        ] as AcademicCategory[]
                      ).map((category) => {
                        const isActive = activeAcademicCategory === category;
                        return (
                          <button
                            key={category}
                            onMouseEnter={() => setActiveAcademicCategory(category)}
                            onClick={() => setActiveAcademicCategory(category)}
                            className={`group w-full px-5 py-3 text-left text-[12px] sm:text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                              isActive
                                ? '!bg-[#163887] !text-white'
                                : 'text-[#1e3a7a] hover:!bg-[#163887] hover:!text-white active:!bg-[#163887] active:!text-white'
                            }`}
                          >
                            <span className={`${isActive ? '!text-white' : 'group-hover:!text-white group-active:!text-white'} transition-colors`}>
                              {category}
                            </span>
                            <ChevronLeft
                              className={`w-4 h-4 transition-colors shrink-0 ml-2 ${
                                isActive ? 'text-[#e8a62a]' : 'text-[#1e3a7a] group-hover:text-[#e8a62a]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* =====================================================
                ADMISSIONS
                Clicking or hovering opens clean white pop-up with arrow pointer
                Options: UNDERGRADUATE, POSTGRADUATE, INTERNATIONAL STUDENTS
                Hover style matches faculty pop up (green background + gold accent)
            ====================================================== */}
            <li
              className="relative"
              ref={admissionsDropdownRef}
              onMouseEnter={handleAdmissionsMouseEnter}
              onMouseLeave={handleAdmissionsMouseLeave}
            >
              <button
                type="button"
                onClick={handleAdmissionsClick}
                className={`hover:text-amber-400 transition-colors py-2 px-1 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'admissions' ? 'text-amber-400' : ''
                }`}
              >
                <span>ADMISSIONS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'admissions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'admissions' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Invisible hover bridge across gap to avoid mouse flicker */}
                  <div className="absolute top-0 left-0 right-0 h-3 pointer-events-auto" />

                  {/* Arrow Pointer matching Image 1 */}
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white mx-auto drop-shadow-sm" />

                  {/* White Card matching Image 1 with Faculty Pop-up style hover */}
                  <div className="w-60 sm:w-64 bg-white rounded-xl shadow-2xl border border-stone-200/90 p-3 space-y-1.5 text-left">
                    
                    {/* Item 1: UNDERGRADUATE */}
                    <button
                      type="button"
                      onClick={() => handleAdmissionItemClick('undergraduate')}
                      className="group w-full text-left font-bold text-xs sm:text-[13px] tracking-wider bg-white hover:!bg-[#163887] active:!bg-[#163887] focus:!bg-[#163887] px-3.5 py-2.5 rounded-lg uppercase transition-all duration-150 flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-[#163887] group-hover:!text-white group-active:!text-white group-focus:!text-white font-extrabold transition-colors">
                        UNDERGRADUATE
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a] opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity shrink-0" />
                    </button>

                    {/* Item 2: POSTGRADUATE */}
                    <button
                      type="button"
                      onClick={() => handleAdmissionItemClick('postgraduate')}
                      className="group w-full text-left font-bold text-xs sm:text-[13px] tracking-wider bg-white hover:!bg-[#163887] active:!bg-[#163887] focus:!bg-[#163887] px-3.5 py-2.5 rounded-lg uppercase transition-all duration-150 flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-[#163887] group-hover:!text-white group-active:!text-white group-focus:!text-white font-extrabold transition-colors">
                        POSTGRADUATE
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a] opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity shrink-0" />
                    </button>

                    {/* Item 3: INTERNATIONAL STUDENTS */}
                    <button
                      type="button"
                      onClick={() => handleAdmissionItemClick('international')}
                      className="group w-full text-left font-bold text-xs sm:text-[13px] tracking-wider bg-white hover:!bg-[#163887] active:!bg-[#163887] focus:!bg-[#163887] px-3.5 py-2.5 rounded-lg uppercase transition-all duration-150 flex items-center justify-between cursor-pointer leading-snug"
                    >
                      <span className="text-[#163887] group-hover:!text-white group-active:!text-white group-focus:!text-white font-extrabold transition-colors">
                        INTERNATIONAL STUDENTS
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a] opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity shrink-0" />
                    </button>

                  </div>
                </div>
              )}
            </li>

            {/* MEDIA & PUBLICATIONS */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'media' ? null : 'media')}
                className={`hover:text-amber-400 transition-colors py-2 px-1 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'media' ? 'text-amber-400' : ''
                }`}
              >
                <span>MEDIA & PUBLICATIONS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'media' && (
                <div className="absolute top-full right-0 w-64 bg-white rounded-md shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <a href="#latest-events" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    PRESS RELEASES & NEWS
                  </a>
                  <a href="#notices" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    OFFICIAL NOTICES & CIRCULARS
                  </a>
                  <a href="#events" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-[#1e3a7a] hover:bg-[#2a4d96] hover:text-white transition-colors">
                    ANNUAL KISSAN MELA ARCHIVE
                  </a>
                </div>
              )}
            </li>
          </ul>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              title="Search Portal"
              aria-label="Search UAF"
            >
              <Search className="w-4 h-4 text-amber-300" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-white text-2xl cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* =====================================================
          3. MOBILE RESPONSIVE DRAWER (Full width, blue)
      ====================================================== */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden text-white border-b-2 border-[#ed9d09] shadow-2xl max-h-[85vh] overflow-y-auto px-6 py-6 space-y-4"
          style={{ backgroundColor: NAV_BLUE }}
        >
          <div className="flex gap-2">
            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-3 px-3 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Merit Calculator</span>
            </button>
            <button
              onClick={() => {
                onOpenAdvisor();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-3 px-3 bg-[#163887] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask UAF Guide</span>
            </button>
          </div>

          <div className="divide-y divide-[#172e62] text-sm font-bold">
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block py-3 hover:text-amber-400 text-left w-full cursor-pointer"
            >
              HOME
            </button>
            <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="block py-3 hover:text-amber-400">
              ABOUT UAF (VISION 2050)
            </a>
            <a href="#rti" onClick={() => setMobileMenuOpen(false)} className="block py-3 hover:text-amber-400">
              RTI & ORIC
            </a>

            <div className="py-3 space-y-2">
              <span className="text-xs text-amber-400 uppercase tracking-widest block font-black">
                ACADEMICS & FACULTIES
              </span>
              <div className="pl-2 space-y-2 text-xs font-semibold text-blue-100">
                {ACADEMIC_SUBMENUS['FACULTIES'].map((f, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSubmenuItemClick(f.facultyId, f.name);
                    }}
                    className="block text-left w-full py-1 hover:text-white"
                  >
                    • {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Admissions section */}
            <div className="py-3 space-y-2">
              <span className="text-xs text-amber-400 uppercase tracking-widest block font-black">
                ADMISSIONS 2026-27
              </span>
              <div className="pl-2 space-y-2 text-xs font-semibold text-blue-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAdmissionItemClick('undergraduate');
                  }}
                  className="block text-left w-full py-1 hover:text-white"
                >
                  • UNDERGRADUATE ADMISSIONS
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAdmissionItemClick('postgraduate');
                  }}
                  className="block text-left w-full py-1 hover:text-white"
                >
                  • POSTGRADUATE & PH.D.
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAdmissionItemClick('international');
                  }}
                  className="block text-left w-full py-1 hover:text-white"
                >
                  • INTERNATIONAL STUDENTS
                </button>
              </div>
            </div>

            <a href="#latest-events" onClick={() => setMobileMenuOpen(false)} className="block py-3 hover:text-amber-400">
              MEDIA & PUBLICATIONS
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
