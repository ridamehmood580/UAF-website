import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';

interface AdmissionsSectionProps {
  onOpenCalculator: () => void;
  onOpenAdvisor: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  onOpenCalculator,
  onOpenAdvisor
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect (Below-to-Up as user scrolls down)
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
      id="admissions"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-white border-b border-[#e5eaee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Admissions Content & Actions (Slides Below-to-Up on Scroll) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-24'
            }`}
          >
            {/* Main Top Heading (Increased Size) */}
            <div className="inline-flex items-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block"></span>
              <span>Admissions 2026-27</span>
            </div>

            {/* Sub-Heading Below (Reduced Size) */}
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#071b2d] leading-snug tracking-tight">
              Your future starts with a single step.
            </h2>

            {/* Description */}
            <p className="text-[#46505a] text-sm sm:text-base leading-relaxed">
              Whether you are beginning your undergraduate studies or pursuing advanced research, UAF offers world-class education and resources to help you succeed.
            </p>

            {/* Key Advantages with Hover Slide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-[#18212b]">
              {[
                '100% Merit-Based Transparent System',
                'PKR 450M+ Annual Scholarships',
                'PVMC, PEC, NCEAC & HEC Accredited',
                '22 On-Campus Residential Hostels'
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#f5f8fa] transition-all duration-300 hover:translate-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0f766e] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded bg-[#0f766e] hover:bg-[#102a43] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wider transition-all hover:-translate-y-1 shadow-md active:scale-95 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#e8a62a]" />
                <span>Undergraduate Merit Calculator</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded border border-[#0f766e] hover:bg-[#dff5f1] text-[#0f766e] font-bold text-xs sm:text-[13px] uppercase tracking-wider transition-all hover:-translate-y-1 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Postgraduate & PhD</span>
              </button>
            </div>

            {/* Helper text */}
            <div className="pt-2">
              <button
                onClick={onOpenAdvisor}
                className="text-xs text-[#0f766e] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer group"
              >
                <span>Need admission counseling or fee details? Ask the UAF Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Single Campus Image Card (Slides Below-to-Up with Delay + Hover Lift) */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-24'
            }`}
          >
            <div className="relative group transition-transform duration-500 hover:-translate-y-2">
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#0f766e]/15 to-[#e8a62a]/15 rounded-2xl -z-10" />
              <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src="/uaf_facade_no_road.jpg"
                  alt="Admissions at UAF"
                  className="w-full h-[380px] sm:h-[430px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#e5eaee] shadow-lg flex items-center gap-3.5 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="w-11 h-11 rounded-full bg-[#102a43] text-[#e8a62a] flex items-center justify-center text-lg shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-heading font-bold text-sm text-[#102a43]">
                    UAF Main Historic Campus
                  </h4>
                  <p className="text-[11px] text-[#46505a]">
                    Over 33,500 students building the future of national agriculture.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
