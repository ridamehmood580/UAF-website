import React, { useEffect, useState } from 'react';
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
import { VirtualCampusTourSection } from './components/VirtualCampusTourSection';
import { AdministrationSection } from './components/AdministrationSection';
import { CallToActionSection } from './components/CallToActionSection';
import { Footer } from './components/Footer';
import { FacultyPortalPage, FacultySection } from './components/FacultyPortalPage';
import { EventDetailPage } from './components/EventDetailPage';
import { PublishedPageRenderer } from './components/PublishedPageRenderer';

// Interactive Modals
import { ScheduleAppointmentModal } from './components/ScheduleAppointmentModal';
import { AdmissionEligibilityCalculatorModal } from './components/AdmissionEligibilityCalculatorModal';
import { UAFVirtualAdvisorModal } from './components/UAFVirtualAdvisorModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { AdminLoginModal } from './components/AdminLoginModal';

import { Sparkles, GraduationCap } from 'lucide-react';

export default function App() {
  const [publishedPages, setPublishedPages] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [calculatorProgramId, setCalculatorProgramId] = useState<string | undefined>(undefined);
  const [, setSelectedFacultyFilter] = useState<string | null>(null);
  const [currentFacultyView, setCurrentFacultyView] = useState<string | null>(null);
  const [facultyInitialSection, setFacultyInitialSection] = useState<FacultySection | undefined>(undefined);

  // 1. State for Selected Event Detail View
  const [currentEventView, setCurrentEventView] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadPublishedPages = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}published-pages.json`, { cache: 'no-store' });
        if (!response.ok) return;
        const result = await response.json();
        if (active && Array.isArray(result.pages)) setPublishedPages(result.pages);
      } catch {
        // The default page remains available if the publication file cannot be read.
      }
    };
    const refreshWhenVisible = () => { if (document.visibilityState === 'visible') loadPublishedPages(); };
    loadPublishedPages();
    window.addEventListener('focus', refreshWhenVisible);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    return () => {
      active = false;
      window.removeEventListener('focus', refreshWhenVisible);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, []);

  const publishedFor = (targetPage: string) => publishedPages.find(page => page.targetPage === targetPage);

  const handleOpenCalculator = (programId?: string) => {
    setCalculatorProgramId(programId);
    setIsCalculatorOpen(true);
  };

  const handleSelectFaculty = (facultyId: string, section?: string) => {
    setSelectedFacultyFilter(facultyId);
    setCurrentFacultyView(facultyId);
    setCurrentEventView(null);
    if (section) {
      setFacultyInitialSection(section as FacultySection);
    } else {
      setFacultyInitialSection('overview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Open Event Detail Page when an event is clicked
  const handleSelectEvent = (eventId: string) => {
    setCurrentEventView(eventId);
    setCurrentFacultyView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Return back to Events section on main page
  const handleBackToEvents = () => {
    setCurrentEventView(null);
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
    setFacultyInitialSection(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplorePrograms = () => {
    if (currentFacultyView || currentEventView) {
      setCurrentFacultyView(null);
      setCurrentEventView(null);
    }
    setTimeout(() => {
      const progSec = document.getElementById('explore-uaf') || document.getElementById('about');
      if (progSec) {
        progSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-stone-900 font-sans selection:bg-[#005a36] selection:text-white flex flex-col">
      {/* 1. Main University Header (Shown on Home Page and Event Page; FacultyPortalPage renders Header inside itself) */}
      {!currentFacultyView && (
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onOpenCalculator={() => handleOpenCalculator()}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
          onSelectFaculty={handleSelectFaculty}
          onNavigateHome={handleNavigateHome}
        />
      )}

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* A. If an event is selected, show the clean EventDetailPage */}
        {currentEventView ? (
          publishedFor('event-detail') ? <PublishedPageRenderer publication={publishedFor('event-detail')} /> : <EventDetailPage
            eventId={currentEventView}
            onNavigateHome={handleBackToEvents}
            onSelectEvent={handleSelectEvent}
          />
        ) : currentFacultyView ? (
          /* B. If a faculty is selected, show FacultyPortalPage (Design 2) */
          <FacultyPortalPage
            currentFacultyId={currentFacultyView}
            publishedPages={publishedPages}
            initialSection={facultyInitialSection}
            onNavigateHome={handleNavigateHome}
            onSelectFaculty={(facId) => handleSelectFaculty(facId, 'overview')}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            onOpenCalculator={() => handleOpenCalculator()}
            onOpenAppointment={() => setIsAppointmentOpen(true)}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
          />
        ) : publishedFor('home') ? (
          <PublishedPageRenderer publication={publishedFor('home')} />
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
            {publishedFor('vision') ? <PublishedPageRenderer publication={publishedFor('vision')} /> : <VisionAndAnnouncementsSection
              onOpenCalculator={() => handleOpenCalculator()}
            />}

            {/* 5. Vice Chancellor's Leadership Address & Appointment link */}
            <ViceChancellorMessageSection
              onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
            />

            {/* 6. South Asia's Premier Institution Heritage (1906 - 2026) */}
            {publishedFor('about') ? <PublishedPageRenderer publication={publishedFor('about')} /> : <AboutSection onSelectFaculty={handleSelectFaculty} />}

            {/* 7. Bento Feature Grid - What will you discover at UAF */}
            <ExploreBentoSection
              onOpenCalculator={() => handleOpenCalculator()}
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onSelectFaculty={handleSelectFaculty}
            />

            {/* 8. Latest News, Annual Kissan Mela & Campus Events (Connected with handleSelectEvent) */}
            {publishedFor('events') ? <PublishedPageRenderer publication={publishedFor('events')} /> : <CampusEventsSection
              onOpenCalculator={() => handleOpenCalculator()}
              onSelectEvent={handleSelectEvent}
            />}

            {/* 9. Research, Innovation & ORIC Breakthroughs */}
            {publishedFor('research') ? <PublishedPageRenderer publication={publishedFor('research')} /> : <ResearchInnovationSection
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
            />}

            {/* 10. Admissions 2026-27 Overview & Requirements */}
            {publishedFor('admissions') ? <PublishedPageRenderer publication={publishedFor('admissions')} /> : <AdmissionsSection
              onOpenCalculator={() => handleOpenCalculator()}
              onOpenAdvisor={() => setIsAdvisorOpen(true)}
            />}

           

           
          </>
        )}
      </main>

      {/* 14. Comprehensive University Footer */}
      <Footer
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* =====================================================
          FLOATING QUICK ACCESS WIDGETS
      ====================================================== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Floating AI Virtual Advisor button */}
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#005a36] hover:bg-[#071b2d] text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#e8a62a] cursor-pointer group"
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
          className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 bg-white text-[#005a36] hover:text-[#071b2d] rounded-full shadow-xl hover:scale-105 transition-all duration-300 border border-stone-200 cursor-pointer text-xs font-bold"
        >
          <GraduationCap className="w-4 h-4 text-[#e8a62a]" />
          <span>Merit Calculator</span>
        </button>
      </div>

      {/* =====================================================
          INTERACTIVE MODALS
      ====================================================== */}
      {/* Admin Login Modal (redirects to the separate Page Studio project) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

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
    </div>
  );
}
