import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';

interface CallToActionSectionProps {
  onOpenCalculator: () => void;
  onOpenAdvisor: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onOpenCalculator,
  onOpenAdvisor
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 bg-[#071b2d] text-white overflow-hidden"
    >
      {/* Clean Subtle Glow (Girls/Students background image removed) */}
      <div className="absolute right-[-120px] bottom-[-120px] w-96 h-96 rounded-full bg-[#0f766e]/30 blur-3xl pointer-events-none" />

      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 transition-all duration-1000 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-20 scale-95'
        }`}
      >
        <div className="inline-flex items-center justify-center gap-3 text-[#e8a62a] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
          <span className="w-8 h-[3px] bg-[#e8a62a] inline-block"></span>
          <span>Your Journey Begins Here</span>
          <span className="w-8 h-[3px] bg-[#e8a62a] inline-block"></span>
        </div>

        <h2 className="font-serif-heading text-lg sm:text-xl lg:text-2xl font-bold text-white leading-snug tracking-tight">
          Ready to grow your future?
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Join Pakistan&apos;s top-ranked agricultural and scientific research university. Applications for Session 2026-27 are now open.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded bg-[#e8a62a] hover:bg-amber-400 text-[#071b2d] font-bold text-sm sm:text-base transition-all hover:-translate-y-1 shadow-xl cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Merit & Apply</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAdvisor}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded border border-white/40 hover:border-white bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-all hover:-translate-y-1 cursor-pointer backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#e8a62a]" />
            <span>Ask UAF Guide</span>
          </button>
        </div>
      </div>
    </section>
  );
};