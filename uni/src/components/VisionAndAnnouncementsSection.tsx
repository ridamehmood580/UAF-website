import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';

interface VisionAndAnnouncementsSectionProps {
  onOpenCalculator: () => void;
}

export const VisionAndAnnouncementsSection: React.FC<VisionAndAnnouncementsSectionProps> = ({
  onOpenCalculator
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const ANNOUNCEMENTS_LIST = [
    {
      day: '9',
      month: 'Aug',
      title: 'Undergraduate Result of Second Entry Test held on 02-08-2026',
      subtext: 'Undergraduate Admission 2026-27',
      link: 'https://web.uaf.edu.pk/UploadFiles/Announcements/d0121647-ccc2-44b7-b056-1cd6b7aa3303.pdf',
      isNew: true
    },
    {
      day: '7',
      month: 'Aug',
      title: 'Schedule Of Hafiz-e-Quran Test/Interviews For Undergraduate Admission 2026-27',
      subtext: 'Test will be conducted on 12-08-2026 at 08:00 am at DSA Office',
      link: 'https://web.uaf.edu.pk/UploadFiles/Announcements/14477d17-1db9-4744-ac7c-7e96fc8e24ae.pdf',
      isNew: true
    },
    {
      day: '7',
      month: 'Aug',
      title: 'Schedule For Interview/Test Of Co-Curricular Activities For Undergraduate Admissions 2026-27',
      subtext: 'Interview/Test of Co-curricular activities 2026-27',
      link: 'https://web.uaf.edu.pk/UploadFiles/Announcements/aaea3a73-c5d7-4eba-8932-60b05c644d3f.jpeg',
      isNew: false
    },
    {
      day: '7',
      month: 'Aug',
      title: 'Schedule Of Sports Trials (New Date Will Be Announced Soon)',
      subtext: 'Sports Trials Details & venue guidelines',
      link: '#notices',
      isNew: false
    },
    {
      day: '23',
      month: 'Jul',
      title: 'Postponement of Screening Test for the post of Assistant Professor',
      subtext: 'Notice for applicants of the Assistant Professor screening test',
      link: 'https://web.uaf.edu.pk/UploadFiles/Announcements/85faa25b-e664-4685-b869-ee1fb01b7066.jpeg',
      isNew: false
    },
    {
      day: '9',
      month: 'Jun',
      title: 'Online Application for Admission Undergraduate Session 2026-27',
      subtext: 'Undergraduate Admission 2026-27 portal registration',
      link: 'https://admissions.uaf.edu.pk/',
      isNew: false
    }
  ];

  // Scroll Slide Effect #1: Slides in from Left-to-Right when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="pt-20 sm:pt-28 lg:pt-44 pb-20 sm:pb-28 bg-white border-b border-[#e5eaee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Vision 2050 Text Only (Slides Left-to-Right on Scroll) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-24'
            }`}
          >
            {/* Main Top Heading (Increased Size) */}
            <div className="inline-flex items-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block"></span>
              <span>Vision 2050</span>
            </div>

            {/* Sub-Heading Below (Reduced Size) */}
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#071b2d] leading-snug tracking-tight">
              Rooted in history. Building for 2050.
            </h2>

            {/* Body Text */}
            <div className="space-y-4 text-[#0f766e] text-[15px] sm:text-[16px] leading-[1.85] text-justify font-medium">
              <p>
                Founded in 1906 as the Punjab Agricultural College and Research Institute, Lyallpur, the institution became the West Pakistan Agricultural University in 1961 and has stood as the University of Agriculture, Faisalabad since 1973. Into the 21st century, UAF continues to push the frontiers of knowledge through interdisciplinary teaching, research and outreach that serve agricultural and rural development.
              </p>
              <p className="text-[#46505a] font-normal">
                The Vision 2050 Strategic Framework charts UAF's path toward becoming an internationally recognized research university and a gateway to agricultural knowledge for Pakistan — guiding the university's priorities and planning cycles for the years ahead.
              </p>
            </div>

            {/* Read More Link */}
            <div className="pt-3">
              <a
                href="#about"
                className="inline-flex items-center gap-4 text-[#102a43] hover:text-[#0f766e] font-bold text-sm sm:text-base group transition-colors"
              >
                <span className="w-12 h-12 rounded-full bg-[#0f766e] group-hover:bg-[#102a43] text-white flex items-center justify-center transition-all group-hover:translate-x-1.5 shadow-md">
                  <ArrowRight className="w-5 h-5" />
                </span>
                <span>Read more about Vision 2050</span>
              </a>
            </div>

            {/* 4 Pillars Mini Highlight Badges (Staggered Slide + Hover Lift) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#e5eaee]">
              {[
                { num: '1906', label: '119+ Yrs Legacy', color: 'text-[#102a43]' },
                { num: 'Top 100', label: 'QS Agri Ranking', color: 'text-[#0f766e]' },
                { num: '7+', label: 'Main Faculties', color: 'text-[#e8a62a]' },
                { num: '150+', label: 'Degrees Offered', color: 'text-[#102a43]' }
              ].map((item, idx) => (
                <div
                  key={item.num}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                  className={`bg-[#f7f5f0] p-3 rounded-lg border border-[#ddd6c9] text-center transition-all duration-700 hover:-translate-y-1.5 hover:border-[#0f766e] hover:shadow-md cursor-pointer ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-12'
                  }`}
                >
                  <span className={`font-serif-heading text-xl font-bold ${item.color} block`}>
                    {item.num}
                  </span>
                  <span className="text-[11px] text-[#46505a] font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Announcements Card (Slides Left-to-Right with Delay on Scroll + Hover Slide) */}
          <div
            className={`lg:col-span-5 w-full transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="bg-white border-t-4 border-[#0f766e] rounded-sm shadow-xl p-6 sm:p-7 border-x border-b border-[#e5eaee] flex flex-col max-h-[580px] hover:shadow-2xl transition-shadow duration-500">
              
              <div className="flex items-center justify-between border-b border-[#e5eaee] pb-4 mb-4">
                <h3 className="font-serif-heading text-2xl sm:text-[28px] font-bold text-[#071b2d]">
                  Announcements
                </h3>
                <span className="text-[11px] font-bold text-[#0f766e] bg-[#dff5f1] px-2 py-0.5 rounded">
                  Live Feed 2026
                </span>
              </div>

              {/* Scrollable List */}
              <div className="overflow-y-auto pr-2 space-y-4 divide-y divide-[#e5eaee] max-h-[420px] custom-scrollbar">
                {ANNOUNCEMENTS_LIST.map((item, idx) => (
                  <div
                    key={idx}
                    className="pt-4 first:pt-0 flex gap-4 items-start group transition-transform duration-300 hover:translate-x-2"
                  >
                    {/* Date Block */}
                    <div className="shrink-0 w-12 h-12 bg-[#071b2d] text-white rounded flex flex-col items-center justify-center leading-none group-hover:bg-[#0f766e] transition-colors shadow-xs">
                      <strong className="text-base font-bold">{item.day}</strong>
                      <span className="text-[10px] uppercase font-semibold mt-0.5">{item.month}</span>
                    </div>

                    {/* Announcement Content */}
                    <div className="flex-1 space-y-1">
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="font-bold text-sm text-[#18212b] group-hover:text-[#0f766e] transition-colors line-clamp-2 leading-snug flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{item.title}</span>
                        {item.link.startsWith('http') && <ExternalLink className="w-3 h-3 text-stone-400 shrink-0 inline" />}
                      </a>
                      <p className="text-xs text-[#8b95a1] line-clamp-1">
                        {item.subtext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fast Action Footer */}
              <div className="pt-4 mt-4 border-t border-[#e5eaee] flex items-center justify-between">
                <button
                  onClick={onOpenCalculator}
                  className="text-xs font-bold text-[#0f766e] hover:text-[#071b2d] flex items-center gap-1 cursor-pointer"
                >
                  <span>Admission Merit Calculator 2026</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#latest-events"
                  className="text-xs font-bold text-[#46505a] hover:text-[#0f766e]"
                >
                  View All Notices →
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
