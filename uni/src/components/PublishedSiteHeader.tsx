'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Download, Leaf, Search } from 'lucide-react';
import { PrimitiveRenderer } from '../page-builder/PrimitiveRenderer';
import type { PrimitiveElement, PrimitiveMenuItem } from '../page-builder/elementPrimitives';

interface PublishedSiteHeaderProps {
  data: { elements?: PrimitiveElement[]; meta?: { headerTemplateVersion?: number } };
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onOpenCalculator?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateAdmissions?: (category: 'undergraduate' | 'postgraduate' | 'international') => void;
  onSelectFaculty?: (facultyId: string, section?: string) => void;
  onNavigateHome?: () => void;
}

const readY = (element: PrimitiveElement) => element.y || 0;
const readX = (element: PrimitiveElement) => element.x || 0;
const readHeight = (element: PrimitiveElement) => element.height || 0;
const HEADER_LINK_DESTINATIONS: Record<string, string> = {
  LMS: 'https://lms.uaf.edu.pk',
  SIS: 'https://sis.uaf.edu.pk',
  'FACULTY AND STAFF': 'https://web.uaf.edu.pk/FacultyProfile/Directory',
  ALUMNI: 'https://alumni.uaf.edu.pk/',
  ORIC: 'https://oric.uaf.edu.pk/',
  JOBS: 'https://web.uaf.edu.pk/Jobs',
  PKNC: 'https://pkncuaf.com/',
  'QUICK LINKS': '#quick-links',
  'COMPLAINTS / SUGGESTIONS': '#resources',
  'COMPLAINTS/SUGGESTIONS': '#resources',
  'STAFF LOGIN': '#staff-login',
  HOME: '/',
  ABOUT: '#vision',
  'ORGANIZATION CHART': 'https://web.uaf.edu.pk/Contents/downloads/organization_chart.pdf',
  'ACT, STATUES, RULES AND REGULATIONS': '/?page=act-statues-rules',
  'FORMER VICE CHANCELLORS': '/?page=former-vice-chancellors',
  'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE': '/?page=water-management-research-centre',
  'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES': 'https://uspcasafs.uaf.edu.pk/',
  'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER': 'https://web.uaf.edu.pk/FacultyProfile/Department?id=54',
  'DIRECTORATE OF CABB': '/?page=cabb',
  'COMMUNITY COLLEGE': '/?page=community-college',
  'UAF SUB-CAMPUS BUREWALA (VEHARI)': 'https://burewala.uaf.edu.pk/',
  'CONSTITUENT COLLEGE BUREWALA': 'https://burewala.uaf.edu.pk/',
  'UAF SUB-CAMPUS TOBA TEK SINGH': '/?page=toba-tek-singh',
  'CONSTITUENT COLLEGE TOBA TEK SINGH': '/?page=toba-tek-singh',
  'UAF SUB-CAMPUS DEPALPUR (OKARA)': '/?page=depalpur',
  'CONSTITUENT COLLEGE DEPALPUR': '/?page=depalpur',
  RTI: '#rti',
  ADMINISTRATION: '#administration',
  ACADEMICS: '#programs',
  ADMISSIONS: '#admissions',
  'MEDIA & PUBLICATIONS': '#latest-events',
  'ANNUAL REPORTS': 'https://web.uaf.edu.pk/Main/AnnualReport',
  'CAMPUS NEWS': 'https://web.uaf.edu.pk/CampusNews/ViewCampusNews',
  'AGROMENT BULLETIN': 'https://web.uaf.edu.pk/Main/AgrometBuletin',
  'NEWS AND EVENTS': '#latest-events',
  JOURNALS: 'https://web.uaf.edu.pk/Contents/journal/jou_list.html',
  'VISION 2050 & HERITAGE': '#vision',
  'VICE CHANCELLOR MESSAGE': '#vc-message',
  'CAMPUS LIFE & BOTANICAL GARDENS': '#campus',
  'OFFICERS OF THE UNIVERSITY': '#administration',
  'SYNDICATE & STATUTORY BODIES': '#administration',
  'VICE CHANCELLOR OFFICE': 'https://web.uaf.edu.pk/FacultyProfile/Department?id=49',
  'PRO-VICE CHANCELLOR OFFICE': 'https://web.uaf.edu.pk/FacultyProfile/Department?id=47',
  'REGISTRAR OFFICE': 'https://web.uaf.edu.pk/FacultyProfile/Department?id=50',
  'TREASURER OFFICE': 'https://web.uaf.edu.pk/FacultyProfile/Department?id=51',
  'CONTROLLER OF EXAMINATIONS': '/?page=controller-examinations',
  'PUBLIC RELATIONS AND MEDIA': '/?page=public-relations',
  'DIRECTORATE OF PRESS & PUBLICATIONS': '/?page=press-publications',
  'DIRECTORATE OF ITRCDB': '/?page=itrcdb',
  'DIRECTORATE OF GRADUATE STUDIES': '/?page=graduate-studies',
  'DIRECTORATE OF PROCUREMENT AND INVENTORY CONTROL': '/?page=procurement-inventory',
  'DIRECTORATE OF ACADEMICS': 'https://web.uaf.edu.pk/FacultyProfile/Department?id=69',
  'DIRECTORATE OF STUDENT AFFAIRS': '/?page=student-affairs',
  'DIRECTORATE OF EXTERNAL LINKAGES': '/?page=external-linkages',
  'DIRECTORATE OF SPORTS': '/?page=sports',
  'DIRECTORATE OF FARMS': '/?page=farms',
  'DIRECTORATE OF OUTREACH': '/?page=outreach',
  'DIRECTORATE OF FINANCIAL ASSISTANCE AND UNIVERSITY ADVANCEMENT': '/?page=dfaua',
  'DIRECTORATE OF PLANNING AND DEVELOPMENT': '/?page=planning-development',
  'DIRECTORATE OF MONITORING & EVALUATION': '/?page=monitoring-evaluation',
  'ENDOWMENT FUND SECRETARIAT': 'https://efs-uaf.org/',
  'HUMAN RESOURCE': 'https://web.uaf.edu.pk/FacultyProfile/Department?id=44',
  'OFFICE OF RESEARCH, INNOVATION AND COMMERCIALIZATION': 'https://oric.uaf.edu.pk/',
  'BUSINESS INCUBATION CENTER': '/?page=business-incubation',
  'QUALITY ENHANCEMENT CELL': '/?page=quality-enhancement-cell',
  'SENIOR TUTOR OFFICE': '/?page=senior-tutor-office',
  'DIRECTORATE OF PUBLICATIONS': '/?page=press-publications',
  "FOREIGN STUDENTS' ADVISOR": '/?page=foreign-students-advisor',
  'ASK UAF VIRTUAL GUIDE': '#advisor',
  'MAIN UAF OFFICIAL PORTAL': 'https://web.uaf.edu.pk',
  'CAMPUS EVENTS & NEWS': '#latest-events',
  'PRESS RELEASES & NEWS': '#latest-events',
  'OFFICIAL NOTICES & CIRCULARS': '#notices',
  'ANNUAL KISSAN MELA ARCHIVE': '#events'
};
const normalizeHeaderLabel = (label?: string) => String(label || '').replace(/\s*[▾▼]$/, '').trim().toUpperCase();
const FLAT_ACADEMIC_MENU_LABELS = new Set([
  'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES',
  'COMMUNITY COLLEGE',
  'DIRECTORATE OF CABB',
  'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER',
  'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE'
]);
const canonicalHeaderHref = (label?: string, fallback?: string) =>
  HEADER_LINK_DESTINATIONS[normalizeHeaderLabel(label)] || fallback || '#';
const canonicalMenuItems = (items: PrimitiveMenuItem[] = []): PrimitiveMenuItem[] => items
  .filter((item) => !['UNDERGRADUATE MERIT CALCULATOR', 'UAF COMMUNITY COLLEGE PARS'].includes(normalizeHeaderLabel(item.label)))
  .map((item) => {
    const isConstituentColleges = normalizeHeaderLabel(item.label) === 'CONSTITUENT COLLEGES';
    return {
      ...item,
      url: canonicalHeaderHref(item.label, item.url),
      ...(item.children?.length && !FLAT_ACADEMIC_MENU_LABELS.has(normalizeHeaderLabel(item.label)) ? {
        children: isConstituentColleges
          ? item.children.map((child) => ({ label: child.label, url: canonicalHeaderHref(child.label, child.url) }))
          : canonicalMenuItems(item.children)
      } : {})
    };
  });

const ADMINISTRATION_MENU_LABELS = [
  'VICE CHANCELLOR OFFICE',
  'PRO-VICE CHANCELLOR OFFICE',
  'REGISTRAR OFFICE',
  'TREASURER OFFICE',
  'CONTROLLER OF EXAMINATIONS',
  'PUBLIC RELATIONS AND MEDIA',
  'DIRECTORATE OF PRESS & PUBLICATIONS',
  'DIRECTORATE OF ITRCDB',
  'DIRECTORATE OF GRADUATE STUDIES',
  'DIRECTORATE OF PROCUREMENT AND INVENTORY CONTROL',
  'DIRECTORATE OF ACADEMICS',
  'DIRECTORATE OF STUDENT AFFAIRS',
  'DIRECTORATE OF EXTERNAL LINKAGES',
  'DIRECTORATE OF SPORTS',
  'DIRECTORATE OF FARMS',
  'DIRECTORATE OF OUTREACH',
  'DIRECTORATE OF FINANCIAL ASSISTANCE AND UNIVERSITY ADVANCEMENT',
  'DIRECTORATE OF PLANNING AND DEVELOPMENT',
  'DIRECTORATE OF MONITORING & EVALUATION',
  'ENDOWMENT FUND SECRETARIAT',
  'HUMAN RESOURCE',
  'OFFICE OF RESEARCH, INNOVATION AND COMMERCIALIZATION',
  'BUSINESS INCUBATION CENTER',
  'QUALITY ENHANCEMENT CELL',
  'SENIOR TUTOR OFFICE',
  'DIRECTORATE OF PUBLICATIONS',
  "FOREIGN STUDENTS' ADVISOR"
];
const defaultAdministrationMenu = (): PrimitiveMenuItem[] => ADMINISTRATION_MENU_LABELS.map((label) => ({
  label,
  url: canonicalHeaderHref(label)
}));
const defaultAboutMenu = (): PrimitiveMenuItem[] => [
  'Organization Chart',
  'Act, Statues, Rules and Regulations',
  'Former Vice Chancellors'
].map((label) => ({ label, url: canonicalHeaderHref(label) }));
const QUICK_LINK_MENU_ITEMS: PrimitiveMenuItem[] = [
  { label: 'Quick Facts', url: 'https://web.uaf.edu.pk/UploadFiles/Announcements/oric_quick_facts.pdf' },
  { label: 'Library', url: 'https://web.uaf.edu.pk/Library' },
  { label: 'Sustainability Policy', url: 'https://web.uaf.edu.pk/Main/Sustainability_Policy' },
  { label: 'Downloads', url: 'https://web.uaf.edu.pk/Downloads/Downloadables' }
];

export const PublishedSiteHeader: React.FC<PublishedSiteHeaderProps> = ({
  data,
  onOpenSearch,
  onOpenAdvisor,
  onOpenAuthModal,
  onNavigateAdmissions,
  onSelectFaculty,
  onNavigateHome
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [openSubmenuLabel, setOpenSubmenuLabel] = useState<string | null>(null);
  const elements = data?.elements || [];
  const backgroundElements = elements.filter((element) => element.type === 'container');
  const utilityBackground = backgroundElements.find((element) => readY(element) < 42) || backgroundElements[0];
  const navbarBackground = backgroundElements.find((element) => readY(element) >= 42) || backgroundElements[1];
  const utilityHeight = readHeight(utilityBackground || {} as PrimitiveElement) || 42;
  const navbarHeight = readHeight(navbarBackground || {} as PrimitiveElement) || 84;
  const navbarStart = readY(navbarBackground || {} as PrimitiveElement) || utilityHeight;
  const utilityItems = elements.filter((element) => element.type !== 'container' && readY(element) < utilityHeight);
  const utilityLeft = utilityItems.filter((element) => readX(element) < 700).sort((a, b) => readX(a) - readX(b));
  const utilityRight = utilityItems.filter((element) => readX(element) >= 700).sort((a, b) => readX(a) - readX(b));
  const navbarItems = elements.filter((element) =>
    element.type !== 'container' && element.type !== 'divider' && readY(element) >= navbarStart && readY(element) < navbarStart + navbarHeight
  );
  const brandItems = navbarItems.filter((element) => readX(element) < 342).sort((a, b) => readY(a) - readY(b) || readX(a) - readX(b));
  const logo = brandItems.find((element) => element.type === 'image');
  const brandText = brandItems.filter((element) => element.type === 'text');
  const primaryItems = navbarItems.filter((element) => readX(element) >= 342).sort((a, b) => readX(a) - readX(b));
  const accent = elements.find((element) => element.type === 'divider' && readY(element) >= navbarStart + navbarHeight - 4);
  const headerTemplateVersion = data?.meta?.headerTemplateVersion || 1;
  const legacyHeader = headerTemplateVersion < 2;
  const hasSearchControl = primaryItems.some((element) => element.type === 'button' && element.iconName === 'Search');
  useEffect(() => {
    if (!openMenuId) return;
    const closeMenu = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenMenuId(null);
        setOpenSubmenuLabel(null);
      }
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [openMenuId]);

  const followInternalAnchor = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return false;
    event.preventDefault();
    const targetId = decodeURIComponent(href.slice(1));
    window.history.pushState({}, '', `${window.location.pathname}${window.location.search}${href}`);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  };

  const renderMenuItems = (items: PrimitiveMenuItem[], element: PrimitiveElement, nested = false) => {
    const isQuickLinks = normalizeHeaderLabel(element.text) === 'QUICK LINKS';
    const isAdministration = normalizeHeaderLabel(element.text) === 'ADMINISTRATION';
    const quickLinkIcon = (label: string) => {
      if (label === 'Sustainability Policy') return <Leaf className="h-5 w-5" />;
      if (label === 'Downloads') return <Download className="h-5 w-5" />;
      return <BookOpen className="h-5 w-5" />;
    };
    return (
    <div
      className={`absolute ${nested ? 'right-full mr-2 top-0' : 'left-0 top-full mt-2'} z-[100] ${isQuickLinks ? 'w-[min(16rem,calc(100vw-2rem))] rounded-xl p-1.5' : 'min-w-64 max-w-[22rem] rounded-xl py-2'} ${isAdministration && !nested ? 'max-h-[70vh] overflow-y-auto overscroll-contain' : 'overflow-visible'} border border-stone-200 bg-white text-[#1e3a7a] shadow-2xl`}
      onClick={(event) => event.stopPropagation()}
    >
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const showSubmenuArrow = hasChildren;
        const itemHref = canonicalHeaderHref(item.label, item.url);
        const itemContent = isQuickLinks ? <>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00664f] text-white shadow-sm">
            {quickLinkIcon(item.label)}
          </span>
          <span className="flex-1 text-sm font-medium text-stone-900">{item.label}</span>
        </> : <>
          <span>{item.label}</span>
          {showSubmenuArrow && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#e8a62a]" />}
        </>;
        const commonClass = isQuickLinks
          ? 'flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-stone-50'
          : 'flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-xs font-bold transition-colors hover:bg-[#163887] hover:text-white';

        if (hasChildren) {
          return (
            <div key={item.label} className="relative" onMouseEnter={() => setOpenSubmenuLabel(item.label)}>
              <button
                type="button"
                className={commonClass}
                aria-expanded={openSubmenuLabel === item.label}
                onClick={() => setOpenSubmenuLabel(openSubmenuLabel === item.label ? null : item.label)}
              >
                {itemContent}
              </button>
              {openSubmenuLabel === item.label && renderMenuItems(item.children || [], element, true)}
            </div>
          );
        }

        const label = item.label.toLowerCase();
        const facultyId = label.includes('veterinary') ? 'fac-vet'
          : label.includes('arts and humanities') ? 'fac-arts'
          : label.includes('social sciences') ? 'fac-social'
          : label.includes('food, nutrition') ? 'fac-food'
          : label.includes('health and pharmaceutical') ? 'fac-health'
          : label.includes('animal husbandry') ? 'fac-husbandry'
          : label.includes('engineering') ? 'fac-engg'
          : label.includes('sciences') ? 'fac-sci'
          : label.includes('agriculture') ? 'fac-agri' : null;

        const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
          if (label === 'home' && onNavigateHome) {
            event.preventDefault();
            onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (label.includes('virtual guide') && onOpenAdvisor) {
            event.preventDefault();
            onOpenAdvisor();
          } else if (element.text?.toLowerCase().includes('admissions') && onNavigateAdmissions) {
            const category = label.includes('postgraduate') ? 'postgraduate'
              : label.includes('international') ? 'international' : 'undergraduate';
            event.preventDefault();
            onNavigateAdmissions(category);
          } else if (facultyId && onSelectFaculty) {
            event.preventDefault();
            onSelectFaculty(facultyId);
          } else {
            followInternalAnchor(itemHref, event);
          }
          setOpenMenuId(null);
          setOpenSubmenuLabel(null);
        };

        return (
          <a
            key={item.label}
            href={itemHref}
            target={itemHref.startsWith('http') ? '_blank' : undefined}
            rel={itemHref.startsWith('http') ? 'noreferrer' : undefined}
            className={commonClass}
            onClick={handleItemClick}
          >
            {itemContent}
          </a>
        );
      })}
    </div>
    );
  };

  const renderFlowItem = (element: PrimitiveElement, section: 'utility' | 'navbar') => {
    const menuItems = element.menuItems || [];
    const isMenu = element.type === 'hyperlink' && menuItems.length > 0;
    // Old published headers store absolute URLs to the former home-page anchors.
    // Resolve their labels against the same destinations as Header.tsx instead.
    const renderedElement = {
      ...element,
      url: headerTemplateVersion >= 4 && section === 'utility'
        ? (element.url || canonicalHeaderHref(element.text))
        : canonicalHeaderHref(element.text, element.url),
      ...(menuItems.length ? {
        menuItems: normalizeHeaderLabel(element.text) === 'ABOUT'
          ? defaultAboutMenu()
          : normalizeHeaderLabel(element.text) === 'ADMINISTRATION' && headerTemplateVersion < 3
          ? defaultAdministrationMenu()
          : normalizeHeaderLabel(element.text) === 'QUICK LINKS' && headerTemplateVersion < 4
            ? QUICK_LINK_MENU_ITEMS
            : canonicalMenuItems(menuItems)
      } : {})
    };
    const isSearch = element.type === 'button' && element.iconName === 'Search';
    const isStaffLogin = element.text?.toLowerCase().includes('staff login');
    const isComplaints = element.text?.toLowerCase().includes('complaints');
    const active = openMenuId === element.id;

    if (isSearch) {
      const style = element.style || {};
      return (
        <button
          key={element.id}
          type="button"
          aria-label="Search UAF"
          onClick={onOpenSearch}
          className="inline-flex shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{
            width: element.width || 40,
            height: element.height || 40,
            border: `${style.borderWidth ?? 1}px solid ${style.borderColor || 'rgba(255,255,255,0.20)'}`,
            borderRadius: style.borderRadius === 999 ? '9999px' : `${style.borderRadius ?? 999}px`,
            backgroundColor: style.bgColor || 'rgba(255,255,255,0.10)',
            color: style.textColor || '#e8a62a'
          }}
        >
          <Search className="h-4 w-4" />
          {element.label && <span className="ml-1">{element.label}</span>}
        </button>
      );
    }

    return (
      <div
        key={element.id}
        className={`relative flex ${section === 'navbar' ? 'h-full items-center' : 'items-center'} ${active ? 'z-[90]' : ''}`}
        style={{ width: 'max-content', minHeight: section === 'navbar' ? navbarHeight : utilityHeight }}
      >
        <PrimitiveRenderer
          el={isMenu ? { ...renderedElement, text: renderedElement.text?.replace(/\s*[▾▼]$/, '') } : renderedElement}
          preserveStyleColors
          onHyperlinkClick={(clickedElement, event) => {
            if (normalizeHeaderLabel(clickedElement.text) === 'HOME') {
              event.preventDefault();
              onNavigateHome?.();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setOpenSubmenuLabel(null);
              setOpenMenuId(null);
              return;
            }
            if (isMenu) {
              event.preventDefault();
              setOpenSubmenuLabel(null);
              setOpenMenuId(active ? null : clickedElement.id);
              return;
            }
            if (isStaffLogin && onOpenAuthModal) {
              event.preventDefault();
              onOpenAuthModal();
            } else if (isComplaints && onOpenAdvisor) {
              event.preventDefault();
              onOpenAdvisor();
            } else {
              followInternalAnchor(canonicalHeaderHref(clickedElement.text, clickedElement.url), event);
            }
          }}
        />
        {isMenu && <ChevronDown aria-hidden="true" className="ml-1 h-3.5 w-3.5 shrink-0" />}
        {active && renderMenuItems(menuItems, element)}
      </div>
    );
  };

  const utilityStyle = utilityBackground?.style || {};
  const navbarStyle = navbarBackground?.style || {};
  const accentStyle = accent?.style || {};
  const accentHeight = accent ? Math.min(readHeight(accent), 4) : 2;
  return (
    <header ref={containerRef} className="sticky top-0 z-50 w-full overflow-visible font-sans">
      <div
        className="w-full border-solid"
        style={{
          height: utilityHeight,
          backgroundColor: utilityStyle.bgColor || '#ffffff',
          color: utilityStyle.textColor || '#1e3a7a',
          borderColor: utilityStyle.borderColor || '#ed9d09',
          borderWidth: utilityStyle.borderWidth ?? 2,
          borderTopWidth: 0,
          borderRadius: 0,
          boxSizing: 'border-box'
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="hidden h-full items-center font-semibold tracking-wide lg:flex" style={{ gap: 24 }}>
            {utilityLeft.map((element) => renderFlowItem(element, 'utility'))}
          </div>
          <div className="ml-auto flex h-full items-center gap-4 text-xs font-medium sm:gap-6 sm:text-[13px]">
            {utilityRight.map((element) => renderFlowItem(element, 'utility'))}
          </div>
        </div>
      </div>

      <div
        className="w-full"
        style={{
          height: navbarHeight,
          backgroundColor: navbarStyle.bgColor || '#163887',
          color: navbarStyle.textColor || '#ffffff',
          borderBottom: `${accentHeight}px solid ${accentStyle.borderColor || '#ed9d09'}`,
          boxSizing: 'border-box'
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
          <div className="flex h-full shrink-0 items-center" style={{ gap: 14 }}>
            {logo && (
              <div key={logo.id} className="flex h-14 w-14 shrink-0 items-center justify-center">
                <PrimitiveRenderer el={logo} preserveStyleColors />
              </div>
            )}
            {brandText.length > 0 && (
              <div className="flex flex-col justify-center" style={{ lineHeight: 1 }}>
                {brandText.map((element) => <div key={element.id} className="flex items-center" style={{ height: element.height || 'auto' }}><PrimitiveRenderer el={element} preserveStyleColors /></div>)}
              </div>
            )}
          </div>
          <nav aria-label="University navigation" className="ml-auto flex h-full min-w-0 items-center" style={{ gap: 'clamp(10px, 1.05vw, 20px)' }}>
            {primaryItems.map((element) => renderFlowItem(element, 'navbar'))}
            {legacyHeader && !hasSearchControl && (
              <button
                type="button"
                aria-label="Search UAF"
                onClick={onOpenSearch}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#e8a62a] transition-colors hover:bg-white/20"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
