'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Marquee2026Ticker } from './components/Marquee2026Ticker';
import { HeroSection } from './components/HeroSection';
import { VisionAndAnnouncementsSection } from './components/VisionAndAnnouncementsSection';
import { ViceChancellorMessageSection } from './components/ViceChancellorMessageSection';
import { AboutSection } from './components/AboutSection';
import { ExploreBentoSection } from './components/ExploreBentoSection';
import { CampusEventsSection } from './components/CampusEventsSection';
import { ResearchInnovationSection } from './components/ResearchInnovationSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { AdministrationSection } from './components/AdministrationSection';
import { Footer } from './components/Footer';
import { FacultyPortalPage, type DepartmentSubView, FacultySection } from './components/FacultyPortalPage';
import { EventDetailPage } from './components/EventDetailPage';
import { AdmissionsDetailPage, type AdmissionCategory } from './components/AdmissionsDetailPage';
import { PublishedSiteHeader } from './components/PublishedSiteHeader';
import { PublishedSiteFooter } from './components/PublishedSiteFooter';

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

import { Sparkles, GraduationCap } from 'lucide-react';

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
        const page = (store.pages || []).find((entry: any) => entry.targetPage === targetPage);
        if (page?.data) {
          setPublishedPageData(page.data);
        } else if (requestedPage) {
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
    setCurrentFacultyView(facultyId);
    setCurrentEventView(null);
    setCurrentAdmissionsView(null);
    if (section) {
      setFacultyInitialSection(section as FacultySection);
    } else {
      setFacultyInitialSection('overview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEvent = (eventId: string) => {
    setCurrentEventView(eventId);
    setCurrentFacultyView(null);
    setCurrentAdmissionsView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdmissions = (category: AdmissionCategory) => {
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
    setFacultyInitialSection(undefined);
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

            {/* 6. South Asia's Premier Institution Heritage (1906 - 2026) */}
            <AboutSection onSelectFaculty={handleSelectFaculty} />

            {/* 7. Bento Feature Grid - What will you discover at UAF */}
            <ExploreBentoSection
              onOpenCalculator={() => handleOpenCalculator()}
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onSelectFaculty={handleSelectFaculty}
            />

            {/* 8. Campus Life, High-Tech Laboratories & Experimental Research Farms */}
            <ResearchInnovationSection
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
            />

            {/* 9. Official Campus Events, Conferences & Academic Calendar */}
            <CampusEventsSection
              onOpenCalculator={() => handleOpenCalculator()}
              onSelectEvent={handleSelectEvent}
            />

            {/* 10. Official Admissions 2026-27 Gateway & Degree Programs Matrix */}
            <AdmissionsSection
              onOpenCalculator={() => handleOpenCalculator()}
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
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

        {/* Floating Merit Calculator shortcut */}
        <button
          onClick={() => handleOpenCalculator()}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 bg-white text-black hover:text-[#071b2d] rounded-full shadow-xl hover:scale-105 transition-all duration-300 border border-stone-200 cursor-pointer text-xs font-bold"
        >
          <GraduationCap className="w-4 h-4 text-[#e8a62a]" />
          <span>Merit Calculator</span>
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
