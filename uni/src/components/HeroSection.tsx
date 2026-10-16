'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenCalculator: () => void;
  onOpenSearch: () => void;
  onOpenAdvisor: () => void;
  onExplorePrograms: () => void;
}

// Sirf wahi images jo public folder mein maujood hain (koi duplicate nahi)
const HERO_BG_SLIDES = [
  {
    id: 'main-gate',
    image: '/7c9f8fcd-b428-46b3-bdb7-bc94c961cac9.jpg',
    label: 'Iconic UAF Main Heritage Gate'
  },
  {
    id: 'aerial-campus',
    image: '/5089a7e8-c073-497e-a07b-5ff64398d871.jpg',
    label: 'Aerial View of the Historic Campus'
  },
  {
    id: 'circular-garden',
    image: '/46441194-6b77-4bb9-810f-ffdaf6ed53d5.jpg',
    label: 'Campus Circular Garden & Front Lawn'
  },
  {
    id: 'historic-campus',
    image: '/uaf_historic_campus.jpg',
    label: 'Heritage Red-Brick Architecture'
  },
  {
    id: 'empty-campus',
    image: '/uaf_historic_empty_campus.jpg',
    label: '1,950-Acre Botanical & Research Campus'
  },
  {
    id: 'facade',
    image: '/uaf_facade_no_road.jpg',
    label: 'Main Historic Academic Facade (Est. 1906)'
  }
];

const SLIDE_INTERVAL_MS = 5000;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCalculator
}) => {
  const [activeBgSlide, setActiveBgSlide] = useState(0);

  // Background slider auto-rotation
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setActiveBgSlide((prev) => (prev + 1) % HERO_BG_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(bgTimer);
  }, []);

  return (
    <section
      id="home"
      className="relative bg-[#071b2d] text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-center overflow-hidden w-full max-w-full"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#071b2d]">
        {HERO_BG_SLIDES.map((slide, idx) => {
          const isActive = idx === activeBgSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.label}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(7,27,45,0.48) 0%, rgba(7,27,45,0.26) 46%, rgba(7,27,45,0.08) 100%)'
                }}
              />
            </div>
          );
        })}

        {/* Decorative circle watermark */}
        <div className="absolute right-[-100px] top-[-100px] w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] rounded-full border border-white/10 pointer-events-none z-[2]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-5">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-xs sm:text-sm font-semibold text-white/95 shadow-md">
            <i className="fa-solid fa-leaf text-[#e8a62a] text-sm"></i>
            <span>Knowledge • Innovation • Sustainability</span>
          </div>

          {/* Static Headline (no typewriter) */}
          <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-[40px] font-bold text-white leading-[1.18] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Shaping the Future of{' '}
            <span className="text-[#e8a62a] italic font-medium">Agriculture.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white text-sm sm:text-base leading-relaxed max-w-xl font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            The University of Agriculture Faisalabad is a place where knowledge, research, technology and innovation come together to address the challenges of food, agriculture and a sustainable future.
          </p>

          {/* Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded bg-[#e8a62a] hover:bg-amber-400 text-[#071b2d] font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Explore UAF</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded border border-white/50 hover:border-white bg-transparent hover:bg-white hover:text-[#102a43] text-white font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Discover Admissions</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};