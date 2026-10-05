import React, { useEffect, useRef, useState } from 'react';
import { Landmark } from 'lucide-react';

interface AboutSectionProps {
  onSelectFaculty?: (facultyId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect #3: Slides in from Below-to-Up when scrolling
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
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#f7f5f0] border-b border-[#e5eaee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Left Story & Right Stats Grid (Slides Below-to-Up on Scroll) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heritage Text (Slides Below-to-Up on Scroll) */}
          <div
            className={`lg:col-span-6 space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
            }`}
          >
            {/* Main Top Heading (Increased Size) */}
            <div className="inline-flex items-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[1.8px] uppercase leading-tight">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block shrink-0"></span>
              <span>Established 1906 · Faisalabad, Pakistan</span>
            </div>

            {/* Sub-Heading Below (Reduced Size) */}
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#071b2d] leading-snug tracking-tight">
              South Asia&apos;s Premier Agricultural Research University
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-4 text-[#46505a] text-[15px] sm:text-base leading-[1.8]">
              <p>
                With roots tracing back to the Punjab Agricultural College and Research Institute (1906), the University of Agriculture, Faisalabad stands as a cornerstone of higher education and scientific research in Pakistan — shaping agricultural policy, food security and rural prosperity for over a century.
              </p>
              <p>
                Recognized globally among the <strong className="text-[#18212b]">Top 100 universities in Agriculture & Forestry</strong>, UAF integrates historic British colonial heritage architecture with modern genomics, climate-smart agronomy, and artificial intelligence research centers.
              </p>
            </div>

            {/* Quick Heritage Callout */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-[#ddd6c9] shadow-2xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <Landmark className="w-5 h-5 text-[#0f766e]" />
                <span className="text-xs sm:text-sm font-bold text-[#102a43]">
                  HEC Top Ranked Agricultural Institution
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Key Numbers Grid (Slides Below-to-Up with Stagger + Hover Lift) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Stat 1 */}
            <div
              style={{ transitionDelay: '100ms' }}
              className={`bg-white p-8 rounded-xl border border-[#ddd6c9] shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:border-[#0f766e] cursor-pointer space-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <span className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#0f766e] block">
                1906
              </span>
              <span className="text-sm font-bold text-[#18212b] block">
                Year Founded
              </span>
              <p className="text-xs text-[#8b95a1] leading-relaxed">
                Over 119 years of continuous academic and scientific excellence in the Indus Basin.
              </p>
            </div>

            {/* Stat 2 */}
            <div
              style={{ transitionDelay: '220ms' }}
              className={`bg-white p-8 rounded-xl border border-[#ddd6c9] shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:border-[#0f766e] cursor-pointer space-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <span className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#102a43] block">
                Top 100
              </span>
              <span className="text-sm font-bold text-[#18212b] block">
                Global QS Agri Rank
              </span>
              <p className="text-xs text-[#8b95a1] leading-relaxed">
                #1 in Pakistan and among the world’s leading universities for Agriculture & Forestry.
              </p>
            </div>

            {/* Stat 3 */}
            <div
              style={{ transitionDelay: '340ms' }}
              className={`bg-white p-8 rounded-xl border border-[#ddd6c9] shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:border-[#0f766e] cursor-pointer space-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <span className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#e8a62a] block">
                1,950
              </span>
              <span className="text-sm font-bold text-[#18212b] block">
                Acres Main Campus
              </span>
              <p className="text-xs text-[#8b95a1] leading-relaxed">
                Lush botanical gardens, experimental farms, historic halls & 4 regional sub-campuses.
              </p>
            </div>

            {/* Stat 4 */}
            <div
              style={{ transitionDelay: '460ms' }}
              className={`bg-white p-8 rounded-xl border border-[#ddd6c9] shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:border-[#0f766e] cursor-pointer space-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <span className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#0f766e] block">
                33.5K
              </span>
              <span className="text-sm font-bold text-[#18212b] block">
                Enrolled Scholars
              </span>
              <p className="text-xs text-[#8b95a1] leading-relaxed">
                Supported by 950+ PhD faculty members and 150,000+ global alumni worldwide.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
