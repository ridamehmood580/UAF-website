'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Marquee2026Ticker } from './components/Marquee2026Ticker';
import { HeroSection } from './components/HeroSection';
import { VisionAndAnnouncementsSection } from './components/VisionAndAnnouncementsSection';
import { ViceChancellorMessageSection } from './components/ViceChancellorMessageSection';
import { ExploreBentoSection } from './components/ExploreBentoSection';
import { CampusEventsSection } from './components/CampusEventsSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { AdministrationSection } from './components/AdministrationSection';
import { Footer } from './components/Footer';
import { FacultyPortalPage, type DepartmentSubView, FacultySection } from './components/FacultyPortalPage';
import { EventDetailPage } from './components/EventDetailPage';
import { AdmissionsDetailPage, type AdmissionCategory } from './components/AdmissionsDetailPage';
import { PublishedSiteHeader } from './components/PublishedSiteHeader';
import { PublishedSiteFooter } from './components/PublishedSiteFooter';
import { ControllerExaminationsPage } from './components/ControllerExaminationsPage';
import { PublicRelationsPage } from './components/PublicRelationsPage';
import { PressPublicationsPage } from './components/PressPublicationsPage';
import { ITRCDBPage } from './components/ITRCDBPage';
import { GraduateStudiesPage } from './components/GraduateStudiesPage';
import { ProcurementInventoryPage } from './components/ProcurementInventoryPage';
import { StudentAffairsPage } from './components/StudentAffairsPage';
import { ExternalLinkagesPage } from './components/ExternalLinkagesPage';
import { SportsPage } from './components/SportsPage';
import { FarmsPage } from './components/FarmsPage';
import { WaterManagementResearchCentrePage } from './components/WaterManagementResearchCentrePage';
import { CABBPage } from './components/CABBPage';
import { CommunityCollegePage } from './components/CommunityCollegePage';
import { TobaTekSinghPage } from './components/TobaTekSinghPage';
import { DepalpurCampusPage } from './components/DepalpurCampusPage';
import { OutreachPage } from './components/OutreachPage';
import { FinancialAssistancePage } from './components/FinancialAssistancePage';
import { PlanningDevelopmentPage } from './components/PlanningDevelopmentPage';
import { MonitoringEvaluationPage } from './components/MonitoringEvaluationPage';
import { BusinessIncubationPage } from './components/BusinessIncubationPage';
import { QualityEnhancementPage } from './components/QualityEnhancementPage';
import { SeniorTutorOfficePage } from './components/SeniorTutorOfficePage';
import { ForeignStudentsAdvisorPage } from './components/ForeignStudentsAdvisorPage';
import { FormerViceChancellorsPage, UniversityStatutesPage } from './components/AboutReferencePages';

// Interactive Modals
import { ScheduleAppointmentModal } from './components/ScheduleAppointmentModal';
import { AdmissionEligibilityCalculatorModal } from './components/AdmissionEligibilityCalculatorModal';
import { UAFVirtualAdvisorModal } from './components/UAFVirtualAdvisorModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { BuilderLoginModal } from './components/BuilderLoginModal';
import { FacultyManagerModal } from './components/FacultyManagerModal';

// CMS & Page Builder Integration
import { AdminBuilder } from './page-builder/AdminBuilder';
import { AdminApprovalDashboard } from './page-builder/AdminApprovalDashboard';
import { PublicUserPanel } from './page-builder/PublicUserPanel';
import { buildTemplate } from './page-builder/pageTemplates';
import {
  getCurrentUser,
  setCurrentUser,
  SUPER_ADMIN_USER,
  type AuthUser
} from './page-builder/cmsStore';

import { Sparkles } from 'lucide-react';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isFacultyManagerOpen, setIsFacultyManagerOpen] = useState(false);
  const [calculatorProgramId, setCalculatorProgramId] = useState<string | undefined>(undefined);
  const [, setSelectedFacultyFilter] = useState<string | null>(null);
  const [currentFacultyView, setCurrentFacultyView] = useState<string | null>(null);
  const [facultyInitialSection, setFacultyInitialSection] = useState<FacultySection | undefined>(undefined);
  const [facultyInitialSubView, setFacultyInitialSubView] = useState<DepartmentSubView | undefined>(undefined);

  // State for Selected Event Detail View
  const [currentEventView, setCurrentEventView] = useState<string | null>(null);

  // State for Selected Admissions Detail View
  const [currentAdmissionsView, setCurrentAdmissionsView] = useState<AdmissionCategory | null>(null);

  // Authentication & CMS Workflow State
  const [currentUser, setCurrentUserState] = useState<AuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentCmsView, setCurrentCmsView] = useState<'admin_dashboard' | 'page_studio' | 'public_preview' | null>(null);
  const [publishedPageData, setPublishedPageData] = useState<any>(null);
  const [publishedPageLoading, setPublishedPageLoading] = useState(true);
  const [publishedPageNotFound, setPublishedPageNotFound] = useState(false);
  const [publishedPageTarget, setPublishedPageTarget] = useState('home');
  const [publishedPageIndex, setPublishedPageIndex] = useState<Record<string, any>>({});
  const [publishedSiteHeader, setPublishedSiteHeader] = useState<any>(null);
  const [publishedSiteFooter, setPublishedSiteFooter] = useState<any>(null);
  const [publishedPillNavigationIndex, setPublishedPillNavigationIndex] = useState<Record<string, any>>({});

  // Initial template data for Page Studio
  const [studioPageData, setStudioPageData] = useState<any>(() => {
    const defaultTpl = buildTemplate('faculty-directory') || buildTemplate('department-overview');
    return defaultTpl || { meta: { title: 'Faculty & Staff Directory' }, elements: [] };
  });

  useEffect(() => {
    const saved = getCurrentUser();
    if (saved) {
      setCurrentUserState(saved);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadPublishedContent = async () => {
      try {
        const response = await fetch('/api/published-pages', { cache: 'no-store' });
        if (!response.ok) throw new Error('Could not load published pages');
        const store = await response.json();
        if (cancelled) return;

        const requestedPage = new URLSearchParams(window.location.search).get('page');
        const targetPage = requestedPage || 'home';
        setPublishedPageTarget(targetPage);
        setPublishedPageIndex(Object.fromEntries(
          (Array.isArray(store.pages) ? store.pages : [])
            .filter((entry: any) => entry?.targetPage && entry?.data)
            .map((entry: any) => [entry.targetPage, entry.data])
        ));
        setPublishedSiteHeader(store.chrome?.pageOverrides?.[targetPage]?.header?.data || store.chrome?.header?.data || null);
        setPublishedSiteFooter(store.chrome?.pageOverrides?.[targetPage]?.footer?.data || store.chrome?.footer?.data || null);
        setPublishedPillNavigationIndex(Object.fromEntries(
          Object.entries(store.chrome?.pageOverrides || {})
            .filter(([, override]: [string, any]) => override?.pillNavigation?.data)
            .map(([target, override]: [string, any]) => [target, override.pillNavigation.data])
        ));
        const page = (store.pages || []).find((entry: any) => entry.targetPage === targetPage);
        const pagePillNavigation = store.chrome?.pageOverrides?.[targetPage]?.pillNavigation?.data;
        if (page?.data) {
          setPublishedPageData(page.data);
        } else if (requestedPage && targetPage.startsWith('faculty:')) {
          const targetParts = targetPage.split(':');
          setCurrentFacultyView(targetParts[1] || 'fac-agri');
          setFacultyInitialSection((targetParts[2] === 'unit' ? targetParts[3] : targetParts[2] || 'overview') as FacultySection);
          setFacultyInitialSubView((targetParts[2] === 'unit' ? targetParts[4] : undefined) as DepartmentSubView | undefined);
        } else if (requestedPage && targetPage !== 'controller-examinations' && targetPage !== 'public-relations' && targetPage !== 'public-relations-sops' && targetPage !== 'press-publications' && targetPage !== 'itrcdb' && targetPage !== 'graduate-studies' && targetPage !== 'procurement-inventory' && targetPage !== 'student-affairs' && targetPage !== 'external-linkages' && targetPage !== 'sports' && targetPage !== 'farms' && targetPage !== 'water-management-research-centre' && targetPage !== 'cabb' && targetPage !== 'community-college' && targetPage !== 'toba-tek-singh' && targetPage !== 'depalpur' && targetPage !== 'outreach' && targetPage !== 'dfaua' && targetPage !== 'planning-development' && targetPage !== 'monitoring-evaluation' && targetPage !== 'business-incubation' && targetPage !== 'quality-enhancement-cell' && targetPage !== 'senior-tutor-office' && targetPage !== 'foreign-students-advisor' && targetPage !== 'act-statues-rules' && targetPage !== 'former-vice-chancellors' && !pagePillNavigation) {
          setPublishedPageNotFound(true);
        }
      } catch (error) {
        console.error('Could not load published university pages:', error);
      } finally {
        if (!cancelled) setPublishedPageLoading(false);
      }
    };

    loadPublishedContent();
    return () => { cancelled = true; };
  }, []);

  const handleOpenCalculator = (programId?: string) => {
    setCalculatorProgramId(programId);
    setIsCalculatorOpen(true);
  };

  const handleSelectFaculty = (facultyId: string, section?: string) => {
    setSelectedFacultyFilter(facultyId);
    setPublishedPageTarget('home');
    setPublishedPageData(null);
    setPublishedPageNotFound(false);
    setCurrentFacultyView(facultyId);
    setCurrentEventView(null);
    setCurrentAdmissionsView(null);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('page', `faculty:${facultyId}:${section || 'overview'}`);
    nextUrl.hash = '';
    window.history.replaceState(null, '', nextUrl.toString());
    if (section) {
      setFacultyInitialSection(section as FacultySection);
    } else {
      setFacultyInitialSection('overview');
    }
    setFacultyInitialSubView('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEvent = (eventId: string) => {
    setPublishedPageTarget('home');
    setPublishedPageData(null);
    setPublishedPageNotFound(false);
    setCurrentEventView(eventId);
    setCurrentFacultyView(null);
    setCurrentAdmissionsView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdmissions = (category: AdmissionCategory) => {
    setPublishedPageTarget('home');
    setPublishedPageData(null);
    setPublishedPageNotFound(false);
    setCurrentAdmissionsView(category);
    setCurrentFacultyView(null);
    setCurrentEventView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToEvents = () => {
    setCurrentEventView(null);
    setCurrentAdmissionsView(null);
    setTimeout(() => {
      const eventsSection =
        document.getElementById('events') ||
        document.getElementById('campus-events') ||
        document.getElementById('latest-events');
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigateHome = () => {
    setCurrentFacultyView(null);
    setCurrentEventView(null);
    setCurrentAdmissionsView(null);
    setCurrentCmsView(null);
    setPublishedPageData(null);
    setPublishedPageNotFound(false);
    setPublishedPageTarget('home');
    setFacultyInitialSection(undefined);
    setFacultyInitialSubView(undefined);
    const homeUrl = new URL(window.location.href);
    homeUrl.searchParams.delete('page');
    homeUrl.hash = '';
    window.history.pushState({}, '', `${homeUrl.pathname}${homeUrl.search}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplorePrograms = () => {
    if (currentFacultyView || currentEventView || currentAdmissionsView) {
      setCurrentFacultyView(null);
      setCurrentEventView(null);
      setCurrentAdmissionsView(null);
    }
    setTimeout(() => {
      const progSec = document.getElementById('explore-uaf') || document.getElementById('about');
      if (progSec) {
        progSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentUserState(null);
    setCurrentCmsView(null);
  };

  // ========================================================
  // VIEW: SUPER ADMIN REVIEW & APPROVAL DASHBOARD
  // ========================================================
  if (currentCmsView === 'admin_dashboard' && currentUser) {
    return (
      <AdminApprovalDashboard
        currentUser={currentUser}
        onOpenStudio={(initialData) => {
          if (initialData) setStudioPageData(initialData);
          setCurrentCmsView('page_studio');
        }}
        onExitDashboard={() => setCurrentCmsView(null)}
      />
    );
  }

  // ========================================================
  // VIEW: UAF DEPARTMENT PAGE STUDIO (VISUAL BUILDER)
  // ========================================================
  if (currentCmsView === 'page_studio') {
    return (
      <AdminBuilder
        pageData={studioPageData}
        setPageData={setStudioPageData}
        onSwitchToPublic={() => setCurrentCmsView('public_preview')}
        onExitStudio={() => setCurrentCmsView(currentUser?.role === 'super_admin' ? 'admin_dashboard' : null)}
        currentUser={currentUser || SUPER_ADMIN_USER}
      />
    );
  }

  // ========================================================
  // VIEW: PUBLIC CONVERTED UI VIEWER (JSON to Real UI)
  // ========================================================
  if (currentCmsView === 'public_preview') {
    return (
      <PublicUserPanel
        pageData={studioPageData}
        setPageData={setStudioPageData}
        onSwitchToAdmin={() => setCurrentCmsView('page_studio')}
        departmentName={currentUser?.departmentName}
      />
    );
  }

  if (publishedPageLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-stone-700">Loading university website…</div>;
  }

  if (publishedPageNotFound) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-stone-700">This published page could not be found.</div>;
  }

  if (publishedPageTarget === 'controller-examinations') {
    return <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {publishedSiteHeader ? <PublishedSiteHeader
        data={publishedSiteHeader}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenCalculator={() => handleOpenCalculator()}
        onNavigateHome={handleNavigateHome}
        onSelectFaculty={handleSelectFaculty}
        onNavigateAdmissions={handleNavigateAdmissions}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      /> : <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onSelectFaculty={handleSelectFaculty}
        onNavigateHome={handleNavigateHome}
        onNavigateAdmissions={handleNavigateAdmissions}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAdminDashboard={() => setCurrentCmsView('admin_dashboard')}
        onOpenDepartmentStudio={() => setCurrentCmsView('page_studio')}
        onOpenFacultyManager={() => setIsFacultyManagerOpen(true)}
      />}
      <ControllerExaminationsPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
      {publishedSiteFooter ? <PublishedSiteFooter data={publishedSiteFooter} /> : <Footer
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />}
      <BuilderLoginModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ScheduleAppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
      <AdmissionEligibilityCalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} onOpenAdvisor={() => setIsAdvisorOpen(true)} initialProgramId={calculatorProgramId} />
      <UAFVirtualAdvisorModal isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} onOpenCalculator={() => handleOpenCalculator()} onOpenAppointment={() => setIsAppointmentOpen(true)} />
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectProgram={(programId) => handleOpenCalculator(programId)} />
      <FacultyManagerModal isOpen={isFacultyManagerOpen} onClose={() => setIsFacultyManagerOpen(false)} />
    </div>;
  }

  if (publishedPageTarget === 'public-relations' || publishedPageTarget === 'public-relations-sops' || publishedPageTarget === 'press-publications' || publishedPageTarget === 'itrcdb' || publishedPageTarget === 'graduate-studies' || publishedPageTarget === 'procurement-inventory' || publishedPageTarget === 'student-affairs' || publishedPageTarget === 'external-linkages' || publishedPageTarget === 'sports' || publishedPageTarget === 'farms' || publishedPageTarget === 'water-management-research-centre' || publishedPageTarget === 'cabb' || publishedPageTarget === 'community-college' || publishedPageTarget === 'toba-tek-singh' || publishedPageTarget === 'depalpur' || publishedPageTarget === 'outreach' || publishedPageTarget === 'dfaua' || publishedPageTarget === 'planning-development' || publishedPageTarget === 'monitoring-evaluation' || publishedPageTarget === 'business-incubation' || publishedPageTarget === 'quality-enhancement-cell' || publishedPageTarget === 'senior-tutor-office' || publishedPageTarget === 'foreign-students-advisor' || publishedPageTarget === 'act-statues-rules' || publishedPageTarget === 'former-vice-chancellors') {
    return <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {publishedSiteHeader ? <PublishedSiteHeader
        data={publishedSiteHeader}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenCalculator={() => handleOpenCalculator()}
        onNavigateHome={handleNavigateHome}
        onSelectFaculty={handleSelectFaculty}
        onNavigateAdmissions={handleNavigateAdmissions}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      /> : <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onSelectFaculty={handleSelectFaculty}
        onNavigateHome={handleNavigateHome}
        onNavigateAdmissions={handleNavigateAdmissions}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAdminDashboard={() => setCurrentCmsView('admin_dashboard')}
        onOpenDepartmentStudio={() => setCurrentCmsView('page_studio')}
        onOpenFacultyManager={() => setIsFacultyManagerOpen(true)}
      />}
      {publishedPageTarget === 'act-statues-rules'
        ? <UniversityStatutesPage />
        : publishedPageTarget === 'former-vice-chancellors'
        ? <FormerViceChancellorsPage />
        : publishedPageTarget === 'foreign-students-advisor'
        ? <ForeignStudentsAdvisorPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'senior-tutor-office'
        ? <SeniorTutorOfficePage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'quality-enhancement-cell'
        ? <QualityEnhancementPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'business-incubation'
        ? <BusinessIncubationPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'monitoring-evaluation'
        ? <MonitoringEvaluationPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'planning-development'
        ? <PlanningDevelopmentPage />
        : publishedPageTarget === 'dfaua'
        ? <FinancialAssistancePage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'outreach'
        ? <OutreachPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'toba-tek-singh'
        ? <TobaTekSinghPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'depalpur'
        ? <DepalpurCampusPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'community-college'
        ? <CommunityCollegePage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'cabb'
        ? <CABBPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'water-management-research-centre'
        ? <WaterManagementResearchCentrePage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'farms'
        ? <FarmsPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'sports'
        ? <SportsPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'external-linkages'
        ? <ExternalLinkagesPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'student-affairs'
        ? <StudentAffairsPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'procurement-inventory'
        ? <ProcurementInventoryPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'graduate-studies'
        ? <GraduateStudiesPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'itrcdb'
        ? <ITRCDBPage initialSection={new URLSearchParams(window.location.search).get('section') || undefined} />
        : publishedPageTarget === 'press-publications'
        ? <PressPublicationsPage
          initialSection={new URLSearchParams(window.location.search).get('section') || undefined}
          initialDepartment={new URLSearchParams(window.location.search).get('department') || undefined}
        />
        : <PublicRelationsPage initialSection={publishedPageTarget === 'public-relations-sops' ? 'sops' : new URLSearchParams(window.location.search).get('section') || undefined} />}
      {publishedSiteFooter ? <PublishedSiteFooter data={publishedSiteFooter} /> : <Footer
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />}
      <BuilderLoginModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ScheduleAppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
      <AdmissionEligibilityCalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} onOpenAdvisor={() => setIsAdvisorOpen(true)} initialProgramId={calculatorProgramId} />
      <UAFVirtualAdvisorModal isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} onOpenCalculator={() => handleOpenCalculator()} onOpenAppointment={() => setIsAppointmentOpen(true)} />
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectProgram={(programId) => handleOpenCalculator(programId)} />
      <FacultyManagerModal isOpen={isFacultyManagerOpen} onClose={() => setIsFacultyManagerOpen(false)} />
    </div>;
  }

  if (publishedPageData && publishedPageTarget.startsWith('faculty:')) {
    const targetParts = publishedPageTarget.split(':');
    const facultyId = targetParts[1] || 'fac-agri';
    const targetSection = targetParts[2] === 'unit' ? targetParts[3] : targetParts[2];
    const targetSubView = targetParts[2] === 'unit' ? targetParts[4] : undefined;
    const initialSection = (targetSection || publishedPageData.meta?.departmentSection || 'overview') as FacultySection;
    return <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <FacultyPortalPage
        currentFacultyId={facultyId}
        initialSection={initialSection}
        initialDepartmentSubView={targetSubView as DepartmentSubView}
        onNavigateHome={handleNavigateHome}
        onSelectFaculty={(id) => handleSelectFaculty(id, 'overview')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onNavigateAdmissions={handleNavigateAdmissions}
        publishedSiteHeader={publishedSiteHeader}
        publishedPageContent={publishedPageData}
        publishedPages={publishedPageIndex}
        publishedPillNavigationIndex={publishedPillNavigationIndex}
      />
      {publishedSiteFooter ? <PublishedSiteFooter data={publishedSiteFooter} /> : <Footer
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />}
      <BuilderLoginModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>;
  }

  if (publishedPageData) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-white">
        {publishedSiteHeader && <PublishedSiteHeader data={publishedSiteHeader} onOpenAuthModal={() => setIsAuthModalOpen(true)} />}
        <PublicUserPanel pageData={publishedPageData} setPageData={() => {}} onSwitchToAdmin={() => {}} />
        {publishedSiteFooter && <PublishedSiteFooter data={publishedSiteFooter} />}
        <BuilderLoginModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

  // ========================================================
  // MAIN UAF WEBSITE VIEW
  // ========================================================
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-stone-900 font-sans selection:bg-[#163887] selection:text-white flex flex-col">
      {/* 1. Main University Header with CMS Portal Buttons & Auth */}
      {!currentFacultyView && (publishedSiteHeader ? <PublishedSiteHeader
        data={publishedSiteHeader}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenCalculator={() => handleOpenCalculator()}
        onNavigateHome={handleNavigateHome}
        onSelectFaculty={handleSelectFaculty}
        onNavigateAdmissions={handleNavigateAdmissions}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      /> : (
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onOpenCalculator={() => handleOpenCalculator()}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
          onSelectFaculty={handleSelectFaculty}
          onNavigateHome={handleNavigateHome}
          onNavigateAdmissions={handleNavigateAdmissions}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenAdminDashboard={() => setCurrentCmsView('admin_dashboard')}
          onOpenDepartmentStudio={() => setCurrentCmsView('page_studio')}
          onOpenFacultyManager={() => setIsFacultyManagerOpen(true)}
          onLogout={handleLogout}
        />
      ))}

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* A. If Admissions Detail View is selected, show AdmissionsDetailPage */}
        {currentAdmissionsView ? (
          <AdmissionsDetailPage
            key={currentAdmissionsView}
            initialCategory={currentAdmissionsView}
            onBack={handleNavigateHome}
            onOpenCalculator={() => handleOpenCalculator()}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
          />
        ) : currentEventView ? (
          /* B. If an event is selected, show the clean EventDetailPage */
          <EventDetailPage
            eventId={currentEventView}
            onNavigateHome={handleBackToEvents}
            onSelectEvent={handleSelectEvent}
          />
        ) : currentFacultyView ? (
          /* B. If a faculty is selected, show FacultyPortalPage (Design 2) */
          <FacultyPortalPage
            currentFacultyId={currentFacultyView}
            initialSection={facultyInitialSection}
            initialDepartmentSubView={facultyInitialSubView}
            onNavigateHome={handleNavigateHome}
            onSelectFaculty={(facId) => handleSelectFaculty(facId, 'overview')}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            onOpenCalculator={() => handleOpenCalculator()}
            onOpenAppointment={() => setIsAppointmentOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onNavigateAdmissions={handleNavigateAdmissions}
            publishedSiteHeader={publishedSiteHeader}
            publishedPages={publishedPageIndex}
            publishedPillNavigationIndex={publishedPillNavigationIndex}
          />
        ) : (
          /* C. Otherwise show Comprehensive Main University Landing Experience */
          <>
            {/* 2. Hero Section with renewed UAF architectural slider & quick action cards */}
            <HeroSection
              onOpenCalculator={() => handleOpenCalculator()}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
              onExplorePrograms={handleExplorePrograms}
            />

            {/* 3. Breaking News & 2026 Admissions Marquee Ticker (Placed right after Hero Section) */}
            <Marquee2026Ticker onOpenCalculator={() => handleOpenCalculator()} />

            {/* 4. Vision 2050 & Official Live Announcements Feed */}
            <VisionAndAnnouncementsSection
              onOpenCalculator={() => handleOpenCalculator()}
            />

            {/* 5. Vice Chancellor's Leadership Address & Appointment link */}
            <ViceChancellorMessageSection
              onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
            />

            {/* 7. Bento Feature Grid - What will you discover at UAF */}
            <ExploreBentoSection
              onOpenCalculator={() => handleOpenCalculator()}
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onSelectFaculty={handleSelectFaculty}
            />

            {/* 9. Official Campus Events, Conferences & Academic Calendar */}
            <CampusEventsSection
              onOpenCalculator={() => handleOpenCalculator()}
              onSelectEvent={handleSelectEvent}
            />

            {/* 10. Official Admissions 2026-27 Gateway & Degree Programs Matrix */}
            <AdmissionsSection
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
              onNavigateAdmissions={handleNavigateAdmissions}
            />

            {/* 11. University Administration, Leadership & Syndicates */}
            <AdministrationSection
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
            />
          </>
        )}
      </main>

      {/* 12. Comprehensive University Footer */}
      {publishedSiteFooter ? <PublishedSiteFooter data={publishedSiteFooter} /> : <Footer
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />}

      {/* =====================================================
          FLOATING QUICK ACCESS WIDGETS
      ====================================================== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Floating AI Virtual Advisor button */}
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#163887] hover:bg-[#071b2d] text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#e8a62a] cursor-pointer group"
          aria-label="Ask UAF Guide"
        >
          <Sparkles className="w-5 h-5 text-[#e8a62a] group-hover:rotate-12 transition-transform animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-bold tracking-wide">
            Ask UAF Guide
          </span>
        </button>

      </div>

      {/* =====================================================
          INTERACTIVE MODALS
      ====================================================== */}
      {/* 1. VC Appointment Booking Modal */}
      <ScheduleAppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      {/* 2. Merit Aggregate Calculator Modal (Official 30:30:40 Formula) */}
      <AdmissionEligibilityCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        initialProgramId={calculatorProgramId}
      />

      {/* 3. UAF Virtual Advisor Chatbot */}
      <UAFVirtualAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* 4. Global Quick Search (⌘K / Ctrl+K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProgram={(progId) => handleOpenCalculator(progId)}
      />

      {/* 5. Portal Authentication Modal (Sign In with ridaparveen116@gmail.com) */}
      <BuilderLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* 6. Dynamic Faculty & Department Manager Modal (Accessible across site) */}
      <FacultyManagerModal
        isOpen={isFacultyManagerOpen}
        onClose={() => setIsFacultyManagerOpen(false)}
      />
    </div>
  );
}
