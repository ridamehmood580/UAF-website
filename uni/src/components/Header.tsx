import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Calendar,
  MessageSquare,
  UserCheck,
  ExternalLink,
  Sprout
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAdvisor: () => void;
  onOpenCalculator: () => void;
  onOpenAppointment: () => void;
  onOpenAdminLogin: () => void;
  onSelectFaculty: (facultyId: string, section?: string) => void;
  onNavigateHome?: () => void;
  activeSection?: string;
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

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAdvisor,
  onOpenCalculator,
  onOpenAppointment,
  onOpenAdminLogin,
  onSelectFaculty,
  onNavigateHome
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [activeAcademicCategory, setActiveAcademicCategory] = useState<AcademicCategory | null>(null);
  const academicsDropdownRef = useRef<HTMLLIElement>(null);

  // Submenu items for each academic category shown in the screenshot & official UAF portal
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
    const handleClose = () => {
      setActiveDropdown(null);
      setQuickLinksOpen(false);
      setActiveAcademicCategory(null);
    };
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  const handleSubmenuItemClick = (facultyId?: string, itemName?: string) => {
    setActiveDropdown(null);
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

  return (
    <header className="sticky top-0 z-50 w-full max-w-full shadow-md select-none font-sans overflow-x-clip">
      {/* =====================================================
          1. TOP UTILITY BAR (Matches screenshot #005a36 with white slash)
      ====================================================== */}
      <div className="w-full bg-[#005a36] text-white text-[13px] border-b border-emerald-900/40">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[42px] flex items-center justify-between gap-4">
          
          {/* Left Utility Links */}
          <div className="hidden lg:flex items-center gap-6 font-semibold tracking-wide">
            <a href="https://lms.uaf.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
              LMS
            </a>
            <a href="https://sis.uaf.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
              SIS
            </a>
            <a href="#administration" className="hover:text-amber-300 transition-colors">
              Faculty and Staff
            </a>
            <a href="#about" className="hover:text-amber-300 transition-colors">
              Alumni
            </a>
            <a href="#rti" className="hover:text-amber-300 transition-colors">
              ORIC
            </a>
            <a href="#notices" className="hover:text-amber-300 transition-colors">
              Jobs
            </a>
            <a href="#about" className="hover:text-amber-300 transition-colors">
              PKNC
            </a>

            {/* Quick Links Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
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
                    className="w-full text-left flex items-center justify-between px-4 py-2.5 hover:bg-[#005a36] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Undergraduate Merit Calculator</span>
                    <span className="text-[10px] bg-amber-200 text-stone-900 px-1.5 py-0.5 rounded font-bold">2026</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickLinksOpen(false);
                      onOpenAdvisor();
                    }}
                    className="w-full text-left flex items-center justify-between px-4 py-2.5 hover:bg-[#005a36] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Ask UAF Virtual Guide</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <a
                    href="https://web.uaf.edu.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#005a36] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <span>Main UAF Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>
                  <a
                    href="#latest-events"
                    onClick={() => setQuickLinksOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#005a36] hover:text-white text-xs font-semibold transition-colors"
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
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Complaints/Suggestions</span>
            </button>

            <div className="hidden lg:block w-[1.5px] h-4 bg-white/40 transform -skew-x-25"></div>

            <button
              type="button"
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-white text-[#005a36] flex items-center justify-center">
                <UserCheck className="w-3 h-3" />
              </div>
              <span className="font-semibold">Staff Login</span>
            </button>
          </div>

        </div>
      </div>

      {/* =====================================================
          2. MAIN NAVBAR WITH ORIGINAL LOGO & MENUS (Matches Pill Bar #071b2d)
      ====================================================== */}
      <nav className="w-full bg-[#071b2d] border-b-2 border-[#c99738]/70 min-h-[82px] flex items-center shadow-lg">
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
            {/* Authentic Circular Crest Badge from user image.png */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#e8a62a] flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src="/uaf_logo.png"
                alt="University of Agriculture Faisalabad Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex flex-col text-white tracking-wider">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-stone-200">
                UNIVERSITY OF
              </span>
              <span className="font-serif-heading font-black text-lg sm:text-[22px] leading-tight tracking-[0.06em] text-white">
                AGRICULTURE
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.26em] uppercase text-emerald-400">
                FAISALABAD
              </span>
            </div>
          </button>

          {/* Desktop Nav Items - Shifted to the right side with no horizontal overflow */}
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

            {/* ABOUT ⌵ */}
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
                <div className="absolute top-full left-0 w-64 bg-white text-stone-900 rounded-md shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <a href="#vision" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    VISION 2050 & HERITAGE
                  </a>
                  <a href="#vc-message" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    VICE CHANCELLOR MESSAGE
                  </a>
                  <a href="#campus" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
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

            {/* ADMINISTRATION ⌵ */}
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
                <div className="absolute top-full left-0 w-72 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <a href="#administration" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    OFFICERS OF THE UNIVERSITY
                  </a>
                  <a href="#administration" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    SYNDICATE & STATUTORY BODIES
                  </a>
                </div>
              )}
            </li>

            {/* =====================================================
                ACADEMICS ⌵ - MULTI-PANEL DROPDOWN WITH TOP OFFSET SUBMENU & NAV HOVER
            ====================================================== */}
            <li className="relative" ref={academicsDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  if (activeDropdown === 'academics') {
                    setActiveDropdown(null);
                    setActiveAcademicCategory(null);
                  } else {
                    setActiveDropdown('academics');
                    setActiveAcademicCategory(null);
                  }
                }}
                className={`hover:text-amber-400 transition-colors py-2 px-1 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'academics' ? 'text-amber-400' : ''
                }`}
              >
                <span>ACADEMICS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Exact Menu Structure matching user specifications */}
              {activeDropdown === 'academics' && (
                <div
                  className="absolute top-[calc(100%+12px)] right-[-100px] z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setActiveAcademicCategory(null)}
                >
                  
                  {/* Little white triangle indicator pointing up at ACADEMICS */}
                  <div className="absolute -top-2 right-[140px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>

                  <div className="flex items-start">
                    
                    {/* LEFT PANEL: Submenu List (e.g., Faculty list or Institute list)
                        Positioned with smooth rounded-2xl radius, ONLY shown when user hovers on a category */}
                    {activeAcademicCategory && (
                      <div className="w-[340px] bg-white p-4 border border-stone-200 flex flex-col justify-start space-y-1 shadow-2xl min-h-[460px] mt-8 rounded-2xl border-r-0 mr-2 animate-in fade-in slide-in-from-right-2 duration-150">
                        <div className="flex flex-col space-y-1 overflow-y-auto max-h-[420px]">
                          {ACADEMIC_SUBMENUS[activeAcademicCategory].map((subItem, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSubmenuItemClick(subItem.facultyId, subItem.name)}
                              className="text-left font-bold text-[12px] sm:text-[12.5px] leading-snug tracking-wider text-[#006857] hover:text-white hover:bg-[#005a36] p-2.5 rounded-xl transition-all uppercase block cursor-pointer border border-transparent hover:border-[#00472a] shadow-xs"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* RIGHT PANEL: Main Categories List (FACULTIES, INSTITUTES, etc.) */}
                    <div className="w-[310px] bg-white py-2 flex flex-col shadow-2xl min-h-[460px] border border-stone-200 rounded-2xl overflow-hidden">
                      
                      {/* Item 1: FACULTIES (Active with dark slate background as shown in image) */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('FACULTIES')}
                        onClick={() => setActiveAcademicCategory('FACULTIES')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'FACULTIES'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>FACULTIES</span>
                        <ChevronLeft className={`w-4 h-4 ${activeAcademicCategory === 'FACULTIES' ? 'text-white' : 'text-[#006857]'}`} />
                      </button>

                      {/* Item 2: INSTITUTES */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('INSTITUTES')}
                        onClick={() => setActiveAcademicCategory('INSTITUTES')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'INSTITUTES'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>INSTITUTES</span>
                        <ChevronLeft className={`w-4 h-4 ${activeAcademicCategory === 'INSTITUTES' ? 'text-white' : 'text-[#006857]'}`} />
                      </button>

                      {/* Item 3: CONSTITUENT COLLEGES */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('CONSTITUENT COLLEGES')}
                        onClick={() => setActiveAcademicCategory('CONSTITUENT COLLEGES')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'CONSTITUENT COLLEGES'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>CONSTITUENT COLLEGES</span>
                        {activeAcademicCategory === 'CONSTITUENT COLLEGES' && <ChevronLeft className="w-4 h-4 text-white" />}
                      </button>

                      {/* Item 4: U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES')}
                        onClick={() => setActiveAcademicCategory('U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES</span>
                        {activeAcademicCategory === 'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES' && <ChevronLeft className="w-4 h-4 text-white" />}
                      </button>

                      {/* Item 5: COMMUNITY COLLEGE */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('COMMUNITY COLLEGE')}
                        onClick={() => setActiveAcademicCategory('COMMUNITY COLLEGE')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'COMMUNITY COLLEGE'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>COMMUNITY COLLEGE</span>
                        {activeAcademicCategory === 'COMMUNITY COLLEGE' && <ChevronLeft className="w-4 h-4 text-white" />}
                      </button>

                      {/* Item 6: DIRECTORATE OF CABB */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('DIRECTORATE OF CABB')}
                        onClick={() => setActiveAcademicCategory('DIRECTORATE OF CABB')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'DIRECTORATE OF CABB'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>DIRECTORATE OF CABB</span>
                        {activeAcademicCategory === 'DIRECTORATE OF CABB' && <ChevronLeft className="w-4 h-4 text-white" />}
                      </button>

                      {/* Item 7: PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER')}
                        onClick={() => setActiveAcademicCategory('PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER</span>
                        {activeAcademicCategory === 'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER' && <ChevronLeft className="w-4 h-4 text-white" />}
                      </button>

                      {/* Item 8: DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE */}
                      <button
                        onMouseEnter={() => setActiveAcademicCategory('DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE')}
                        onClick={() => setActiveAcademicCategory('DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE')}
                        className={`w-full px-5 py-3.5 text-left text-[12.5px] font-bold tracking-wider uppercase flex items-center justify-between transition-colors cursor-pointer ${
                          activeAcademicCategory === 'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE'
                            ? 'bg-[#2b3345] text-white'
                            : 'text-[#006857] hover:bg-[#005a36] hover:text-white'
                        }`}
                      >
                        <span>DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE</span>
                        {activeAcademicCategory === 'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE' && <ChevronLeft className="w-4 h-4 text-white" />}
                      </button>

                    </div>

                  </div>
                </div>
              )}
            </li>

            {/* ADMISSIONS ⌵ */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'admissions' ? null : 'admissions')}
                className={`hover:text-amber-400 transition-colors py-2 px-1 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'admissions' ? 'text-amber-400' : ''
                }`}
              >
                <span>ADMISSIONS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'admissions' && (
                <div className="absolute top-full left-0 w-72 bg-white text-stone-900 rounded-md shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <a href="#admissions" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    UNDERGRADUATE ADMISSIONS 2026-27
                  </a>
                  <a href="#admissions" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    POSTGRADUATE & PHD ADMISSIONS
                  </a>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenCalculator();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-[#005a36] hover:text-white bg-amber-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>MERIT AGGREGATE CALCULATOR</span>
                    <span className="text-[10px] bg-amber-300 text-stone-950 px-2 py-0.5 rounded font-black">2026</span>
                  </button>
                </div>
              )}
            </li>

            {/* MEDIA & PUBLICATIONS ⌵ */}
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
                <div className="absolute top-full right-0 w-64 bg-white text-stone-900 rounded-md shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in duration-150 overflow-hidden">
                  <a href="#latest-events" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    PRESS RELEASES & NEWS
                  </a>
                  <a href="#notices" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
                    OFFICIAL NOTICES & CIRCULARS
                  </a>
                  <a href="#events" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-[#005a36] hover:text-white transition-colors">
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
          3. MOBILE RESPONSIVE DRAWER (Matches Pill Bar #071b2d)
      ====================================================== */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071b2d] text-white border-b-2 border-[#c99738]/70 shadow-2xl max-h-[85vh] overflow-y-auto px-6 py-6 space-y-4">
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
              className="flex-1 py-3 px-3 bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask UAF Guide</span>
            </button>
          </div>

          <div className="divide-y divide-stone-800 text-sm font-bold">
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

            {/* Mobile Academics List */}
            <div className="py-3 space-y-2">
              <span className="text-xs text-amber-400 uppercase tracking-widest block font-black">
                ACADEMICS & FACULTIES
              </span>
              <div className="pl-2 space-y-2 text-xs font-semibold text-stone-300">
                {ACADEMIC_SUBMENUS['FACULTIES'].map((f, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSubmenuItemClick(f.facultyId);
                    }}
                    className="block text-left w-full py-1 hover:text-white"
                  >
                    • {f.name}
                  </button>
                ))}
              </div>
            </div>

            <a href="#admissions" onClick={() => setMobileMenuOpen(false)} className="block py-3 hover:text-amber-400">
              ADMISSIONS 2026-27
            </a>
            <a href="#latest-events" onClick={() => setMobileMenuOpen(false)} className="block py-3 hover:text-amber-400">
              MEDIA & PUBLICATIONS
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
