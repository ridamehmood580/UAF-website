import React, { useState, useEffect, useRef } from 'react';
import {
  Landmark,
  Compass,
  Sparkles,
  Info
} from 'lucide-react';
import { CAMPUS_LANDMARKS } from '../data/uafData';

export const VirtualCampusTourSection: React.FC = () => {
  const [selectedLandmark, setSelectedLandmark] = useState(CAMPUS_LANDMARKS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect (Left-to-Right & Right-to-Left as user scrolls down)
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
      id="landmarks"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-stone-900 text-white overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-radial from-emerald-950/40 via-transparent to-stone-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Slides Below-to-Up on Scroll) */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 space-y-2.5 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Main Top Heading (Increased Size) */}
          <div className="inline-flex items-center justify-center gap-3 text-emerald-300 text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-[2px]">
            <Compass className="w-7 h-7 text-amber-400 shrink-0" />
            <span>Virtual Campus Experience</span>
          </div>

          {/* Sub-Heading Below (Reduced Size) */}
          <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight">
            Discover UAF’s Iconic 1,950-Acre Historic Campus
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm">
            A harmonious blend of British colonial heritage architecture, cutting-edge agronomy laboratories,
            sprawling botanical reserves, and modern student hubs.
          </p>
        </div>

        {/* Interactive Tour Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Preview (Slides Left-to-Right on Scroll) */}
          <div
            className={`lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl border border-stone-700 bg-stone-950 aspect-video sm:aspect-16/10 group transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-24'
            }`}
          >
            <img
              src={selectedLandmark.image}
              alt={selectedLandmark.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

            {/* Floating Landmark Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" />
                <span>{selectedLandmark.category}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-900/80 backdrop-blur-md text-emerald-200 text-xs font-semibold border border-emerald-700/50">
                Built {selectedLandmark.year}
              </span>
            </div>

            {/* Bottom Floating Stats */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-white">
                  {selectedLandmark.name}
                </h3>
                <p className="text-xs text-amber-300 font-medium mt-0.5">
                  {selectedLandmark.stats}
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-300 bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>360° Heritage Landmark</span>
              </span>
            </div>
          </div>

          {/* Details & Interactive Landmark Switcher (Slides Right-to-Left on Scroll) */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-1000 delay-150 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-24'
            }`}
          >
            <div className="space-y-3">
              <h3 className="font-serif-heading text-2xl font-bold text-white">
                {selectedLandmark.name}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                {selectedLandmark.description}
              </p>
            </div>

            {/* Historical Fact Note */}
            <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/60 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold uppercase tracking-wide text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>Historical & Archival Fact</span>
              </div>
              <p className="text-stone-200 leading-relaxed">
                {selectedLandmark.historicalNote}
              </p>
            </div>

            {/* Interactive Thumbnail Switcher with Hover Slide */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Select Campus Location to Explore:
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {CAMPUS_LANDMARKS.map((lm) => (
                  <button
                    key={lm.id}
                    onClick={() => setSelectedLandmark(lm)}
                    className={`p-3 rounded-xl text-left transition-all duration-300 border flex items-start gap-2.5 cursor-pointer hover:translate-x-1.5 ${
                      selectedLandmark.id === lm.id
                        ? 'bg-emerald-900/50 border-amber-400/80 text-white shadow-md'
                        : 'bg-stone-800/60 hover:bg-stone-800 border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{lm.name}</h4>
                      <span className="text-[10px] text-stone-400">{lm.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
