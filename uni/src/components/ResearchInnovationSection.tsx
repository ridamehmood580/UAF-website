import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Sprout,
  Droplets,
  Sun,
  Brain
} from 'lucide-react';

interface ResearchInnovationSectionProps {
  onOpenAdvisor: () => void;
}

export const ResearchInnovationSection: React.FC<ResearchInnovationSectionProps> = ({
  onOpenAdvisor
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect (Right-to-Left as user scrolls down)
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

  const RESEARCH_AREAS = [
    {
      id: 'smart-agri',
      icon: <Sprout className="w-7 h-7" />,
      title: 'Smart Agriculture',
      description:
        'Precision farming, drone spraying technology, smart fertilizer telemetry, and AI-driven crop monitoring for superior harvest yields.',
      stat: '60+ Crop Cultivars'
    },
    {
      id: 'water-env',
      icon: <Droplets className="w-7 h-7" />,
      title: 'Water & Environment',
      description:
        'Advanced solar drip-irrigation networks, groundwater telemetry in Indus Basin, wastewater treatment, and soil conservation.',
      stat: '40% Water Savings'
    },
    {
      id: 'climate',
      icon: <Sun className="w-7 h-7" />,
      title: 'Climate Resilience',
      description:
        'Developing drought-tolerant hybrid wheat varieties, heat-resistant cotton, and carbon-neutral farming practices for smallholders.',
      stat: 'Tolerates 42°C'
    },
    {
      id: 'ai-innovation',
      icon: <Brain className="w-7 h-7" />,
      title: 'AI & Innovation',
      description:
        'Machine learning algorithms for early pest detection, satellite GIS remote sensing, Agri-fintech incubation, and automated supply chains.',
      stat: '65+ Tech Startups'
    }
  ];

  return (
    <section
      id="rti"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#f5f8fa] border-b border-[#e5eaee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Slides Right-to-Left on Scroll) */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-24'
          }`}
        >
          <div className="space-y-2">
            {/* Main Top Heading (Increased Size) */}
            <div className="inline-flex items-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block"></span>
              <span>Research & Innovation</span>
            </div>

            {/* Sub-Heading Below (Reduced Size) */}
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#071b2d] tracking-tight">
              Exploring the future.
            </h2>
          </div>

          <p className="text-[#46505a] text-sm sm:text-base max-w-md md:text-right">
            Leading breakthrough research in smart agriculture, water management, climate resilience and artificial intelligence.
          </p>
        </div>

        {/* 4-Column Research Cards (Staggered Right-to-Left Slide on Scroll + Hover Slide) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_AREAS.map((item, idx) => (
            <div
              key={item.id}
              onClick={onOpenAdvisor}
              style={{ transitionDelay: `${idx * 130}ms` }}
              className={`bg-white p-7 rounded-2xl border border-[#e5eaee] shadow-sm hover:shadow-2xl hover:border-[#0f766e]/50 transition-all duration-700 ease-out flex flex-col justify-between group cursor-pointer hover:-translate-y-2.5 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#dff5f1] text-[#0f766e] group-hover:bg-[#0f766e] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-105">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#0f766e] bg-[#f5f8fa] px-2.5 py-1 rounded-full border border-[#e5eaee]">
                    {item.stat}
                  </span>
                </div>

                <h3 className="font-serif-heading font-bold text-xl text-[#18212b] group-hover:text-[#0f766e] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#46505a] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-[#e5eaee] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0f766e] group-hover:text-[#071b2d] flex items-center gap-1.5">
                  <span>Explore Research</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#e8a62a] group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ORIC Technology Highlights Banner (Slides Below-to-Up on Scroll) */}
        <div
          className={`transition-all duration-1000 delay-300 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="mt-12 bg-gradient-to-r from-[#071b2d] via-[#102a43] to-[#0f766e] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10 transition-transform duration-300 hover:-translate-y-1">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-bold text-[#e8a62a] uppercase tracking-widest">
                Office of Research, Innovation & Commercialization (ORIC)
              </span>
              <h4 className="font-serif-heading text-xl sm:text-2xl font-bold">
                1,800+ High Impact Research Publications Annually
              </h4>
              <p className="text-white/80 text-xs sm:text-sm max-w-xl">
                Collaborating with FAO, CIMMYT, USDA, and international research consortiums to ensure global food security.
              </p>
            </div>

            <button
              onClick={onOpenAdvisor}
              className="shrink-0 px-6 py-3 bg-[#e8a62a] hover:bg-amber-400 text-[#071b2d] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Inquire with ORIC Desk
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
