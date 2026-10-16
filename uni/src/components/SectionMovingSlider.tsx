'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers,
  Play,
  Pause
} from 'lucide-react';

export interface SliderItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  tag?: string;
}

export type SliderVariant =
  | 'marquee-ribbon'
  | 'spotlight-fade'
  | 'accordion-expand'
  | 'coverflow-3d'
  | 'split-deck'
  | 'step-carousel'
  | 'filmstrip-dark'
  | 'parallax-glide';

interface SectionMovingSliderProps {
  items: SliderItem[];
  variant?: SliderVariant;
  direction?: 'left' | 'right';
  entrance?: 'from-left' | 'from-right' | 'from-bottom' | 'tilt-zoom';
  title?: string;
  badge?: string;
  speed?: 'normal' | 'slow' | 'fast';
}

export const SectionMovingSlider: React.FC<SectionMovingSliderProps> = ({
  items,
  variant = 'marquee-ribbon',
  direction = 'left',
  entrance = 'from-bottom',
  title,
  badge
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activePreview, setActivePreview] = useState<SliderItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance timer for interactive slider variants
  useEffect(() => {
    if (isPaused || items.length === 0) return;
    if (variant === 'marquee-ribbon' || variant === 'filmstrip-dark') return;

    const intervalMs =
      variant === 'accordion-expand'
        ? 3400
        : variant === 'spotlight-fade'
        ? 4200
        : 3800;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, items.length, variant]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const getEntranceClass = () => {
    if (!isVisible) {
      switch (entrance) {
        case 'from-left':
          return 'opacity-0 -translate-x-16 scale-95';
        case 'from-right':
          return 'opacity-0 translate-x-16 scale-95';
        case 'tilt-zoom':
          return 'opacity-0 scale-90 -rotate-1';
        case 'from-bottom':
        default:
          return 'opacity-0 translate-y-12 scale-95';
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0';
  };

  const isDarkVariant = variant === 'filmstrip-dark';
  const displayItems = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`mt-10 sm:mt-14 pt-8 border-t ${
        isDarkVariant ? 'border-stone-800' : 'border-[#e5eaee]'
      } transition-all duration-1000 ease-out select-none relative ${getEntranceClass()}`}
    >
      {/* Header Row */}
      {(title || badge) && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-1">
          <div className="flex flex-wrap items-center gap-2.5">
            {badge && (
              <span
                className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDarkVariant
                    ? 'bg-blue-950/90 text-blue-300 border border-blue-700/60'
                    : 'bg-[#1d4e89]/10 text-black border border-[#1d4e89]/20'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#e8a62a]" />
                <span>{badge}</span>
              </span>
            )}
            {title && (
              <h4
                className={`text-xs sm:text-sm font-bold ${
                  isDarkVariant ? 'text-stone-200' : 'text-stone-700'
                }`}
              >
                {title}
              </h4>
            )}
          </div>

          {/* Interactive Controls for Non-Marquee Sliders */}
          {variant !== 'marquee-ribbon' && variant !== 'filmstrip-dark' ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="w-7 h-7 rounded-full border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                title={isPaused ? 'Resume Auto-Slide' : 'Pause Auto-Slide'}
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-[#1d4e89] hover:text-white hover:border-[#1d4e89] text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold text-stone-500 min-w-[38px] text-center">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-[#1d4e89] hover:text-white hover:border-[#1d4e89] text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <span
              className={`text-[11px] hidden sm:inline ${
                isDarkVariant ? 'text-stone-400' : 'text-stone-400'
              }`}
            >
              Hover to pause • Click image to enlarge
            </span>
          )}
        </div>
      )}

      {/* =====================================================================
          VARIANT 1: MARQUEE RIBBON (Smooth Continuous Horizontal Silk Scroll)
      ====================================================================== */}
      {variant === 'marquee-ribbon' && (
        <div className="relative w-full overflow-hidden rounded-2xl py-1">
          <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

          <div
            className={`${
              direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            } gap-4 sm:gap-5`}
          >
            {displayItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setActivePreview(item)}
                className="group relative shrink-0 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#e5eaee] bg-stone-900 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 w-64 sm:w-76 h-44 sm:h-52"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                {item.tag && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#e8a62a] text-[#071b2d] shadow-xs">
                      {item.tag}
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white z-10">
                  <h5 className="font-bold text-xs sm:text-sm leading-snug group-hover:text-[#e8a62a] transition-colors line-clamp-1">
                    {item.title}
                  </h5>
                  {item.subtitle && (
                    <p className="text-[11px] text-stone-300 line-clamp-1 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#e8a62a] shrink-0" />
                      <span>{item.subtitle}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          VARIANT 2: SPOTLIGHT FADE & KEN-BURNS ZOOM SLIDER
      ====================================================================== */}
      {variant === 'spotlight-fade' && items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-[#f8fafc] p-3 sm:p-4 rounded-3xl border border-[#e5eaee] shadow-inner">
          {/* Main Crossfade Stage */}
          <div
            onClick={() => setActivePreview(items[activeIndex])}
            className="lg:col-span-8 relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-900 cursor-pointer group"
          >
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  idx === activeIndex
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-110 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/90 via-[#071b2d]/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#e8a62a] text-[#071b2d] text-xs font-extrabold uppercase tracking-wider shadow-md">
                    {item.tag || 'Featured'}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="font-serif-heading text-lg sm:text-2xl font-bold text-white group-hover:text-[#e8a62a] transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs sm:text-sm text-stone-200 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#e8a62a]" />
                      <span>{item.subtitle}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Vertical Thumbnail Selector Stack */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible">
            {items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-1 min-w-[200px] lg:min-w-0 p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#071b2d] text-white border-[#e8a62a] shadow-md scale-[1.01]'
                      : 'bg-white hover:bg-stone-100 text-stone-800 border-[#e5eaee]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                  />
                  <div className="overflow-hidden">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isSelected ? 'text-[#e8a62a]' : 'text-black'
                      }`}
                    >
                      {item.tag}
                    </span>
                    <h5 className="text-xs font-bold truncate">{item.title}</h5>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          VARIANT 3: ACCORDION EXPANDABLE GALLERY SLIDER
      ====================================================================== */}
      {variant === 'accordion-expand' && items.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2.5 h-[320px] sm:h-[260px] w-full">
          {items.map((item, idx) => {
            const isExpanded = idx === activeIndex;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  if (isExpanded) {
                    setActivePreview(item);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 ease-out ${
                  isExpanded
                    ? 'flex-[3.5] border-[#e8a62a] shadow-xl'
                    : 'flex-1 border-[#e5eaee] opacity-85 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-[#071b2d]/90 via-[#071b2d]/25 to-transparent'
                      : 'bg-[#071b2d]/60'
                  }`}
                />

                {/* Top Number / Tag Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      isExpanded
                        ? 'bg-[#e8a62a] text-[#071b2d]'
                        : 'bg-black/50 text-white backdrop-blur-xs'
                    }`}
                  >
                    {isExpanded ? item.tag : `0${idx + 1}`}
                  </span>
                  {isExpanded && (
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white z-10">
                  <h5
                    className={`font-serif-heading font-bold transition-all ${
                      isExpanded ? 'text-base sm:text-xl' : 'text-xs truncate'
                    }`}
                  >
                    {item.title}
                  </h5>
                  {isExpanded && item.subtitle && (
                    <p className="text-xs text-stone-200 mt-1 flex items-center gap-1.5 animate-in fade-in duration-300">
                      <MapPin className="w-3.5 h-3.5 text-[#e8a62a] shrink-0" />
                      <span>{item.subtitle}</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =====================================================================
          VARIANT 4: 3D CENTER-STAGE COVERFLOW SLIDER
      ====================================================================== */}
      {variant === 'coverflow-3d' && items.length > 0 && (
        <div className="relative py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center [perspective:1200px]">
            {[-1, 0, 1].map((offset) => {
              const itemIndex = (activeIndex + offset + items.length) % items.length;
              const item = items[itemIndex];
              const isCenter = offset === 0;

              return (
                <div
                  key={`${item.id}-${offset}`}
                  onClick={() => {
                    if (isCenter) {
                      setActivePreview(item);
                    } else {
                      setActiveIndex(itemIndex);
                    }
                  }}
                  style={{
                    transform: isCenter
                      ? 'translateZ(30px) rotateY(0deg) scale(1.03)'
                      : offset === -1
                      ? 'translateZ(-20px) rotateY(16deg) scale(0.92)'
                      : 'translateZ(-20px) rotateY(-16deg) scale(0.92)'
                  }}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border ${
                    isCenter
                      ? 'h-60 sm:h-64 z-20 border-[#e8a62a] shadow-2xl ring-2 ring-[#e8a62a]/40'
                      : 'hidden md:block h-52 z-10 border-[#e5eaee] opacity-70 hover:opacity-95 shadow-md'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/90 via-[#071b2d]/25 to-transparent" />
                  {item.tag && (
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          isCenter
                            ? 'bg-[#e8a62a] text-[#071b2d]'
                            : 'bg-black/60 text-white'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h5 className="font-serif-heading font-bold text-sm sm:text-lg leading-snug">
                      {item.title}
                    </h5>
                    {item.subtitle && (
                      <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 bg-[#1d4e89]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          VARIANT 5: 3D STACKED DECK SWAP SLIDER
      ====================================================================== */}
      {variant === 'split-deck' && items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white p-4 sm:p-6 rounded-3xl border border-[#e5eaee] shadow-md">
          {/* Left Narrative Info Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#e8eef9] text-black text-xs font-extrabold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>{items[activeIndex].tag || 'Lab Spotlight'}</span>
            </div>

            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#071b2d] leading-snug">
              {items[activeIndex].title}
            </h3>

            {items[activeIndex].subtitle && (
              <p className="text-xs sm:text-sm text-[#46505a] leading-relaxed">
                {items[activeIndex].subtitle} — Advancing national self-reliance through modern laboratory instrumentation and field trials at UAF.
              </p>
            )}

            {/* Interactive Stepper Pills */}
            <div className="flex items-center gap-2 pt-2">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'bg-[#071b2d] text-[#e8a62a] shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Right 3D Stacked Cards Visual Deck */}
          <div className="lg:col-span-7 relative h-60 sm:h-72 flex items-center justify-center">
            {items.map((item, idx) => {
              const diff = (idx - activeIndex + items.length) % items.length;
              if (diff > 2) return null;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (diff === 0) {
                      setActivePreview(item);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  style={{
                    transform: `translateX(${diff * 22}px) translateY(${diff * -10}px) scale(${
                      1 - diff * 0.06
                    })`,
                    zIndex: 30 - diff * 10,
                    opacity: 1 - diff * 0.22
                  }}
                  className="absolute inset-y-2 left-0 right-8 sm:right-14 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-stone-900 cursor-pointer transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {item.title}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold shrink-0">
                      Click to View
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          VARIANT 6: MULTI-CARD STEPPER CAROUSEL WITH PROGRESS BAR
      ====================================================================== */}
      {variant === 'step-carousel' && items.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((offset) => {
              const idx = (activeIndex + offset) % items.length;
              const item = items[idx];
              const isLead = offset === 0;

              return (
                <div
                  key={`${item.id}-${offset}`}
                  onClick={() => setActivePreview(item)}
                  className={`group relative rounded-2xl overflow-hidden h-52 cursor-pointer transition-all duration-500 border ${
                    isLead
                      ? 'border-[#1d4e89] ring-2 ring-[#1d4e89]/25 shadow-xl -translate-y-1'
                      : 'border-[#e5eaee] shadow-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/90 via-[#071b2d]/25 to-transparent" />
                  {item.tag && (
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isLead
                            ? 'bg-[#e8a62a] text-[#071b2d]'
                            : 'bg-white/20 backdrop-blur-md text-white'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <h5 className="font-bold text-sm leading-snug group-hover:text-[#e8a62a] transition-colors">
                      {item.title}
                    </h5>
                    {item.subtitle && (
                      <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1d4e89] to-[#e8a62a] transition-all duration-500 rounded-full"
              style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* =====================================================================
          VARIANT 7: DARK CINEMA FILMSTRIP SLIDER (For Dark Campus Tour Section)
      ====================================================================== */}
      {variant === 'filmstrip-dark' && (
        <div className="relative w-full overflow-hidden rounded-2xl py-2 bg-stone-950/70 border border-stone-800">
          <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-stone-900 via-stone-900/80 to-transparent pointer-events-none z-10" />

          <div className="animate-marquee-right gap-4 sm:gap-5 px-2">
            {displayItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setActivePreview(item)}
                className="group relative shrink-0 rounded-xl overflow-hidden border border-stone-700/80 hover:border-amber-400 bg-stone-900 cursor-pointer transition-all duration-500 hover:scale-[1.03] w-68 sm:w-80 h-44 sm:h-48 shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/30 to-transparent" />
                {item.tag && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-400 text-stone-950">
                      {item.tag}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <h5 className="font-bold text-xs sm:text-sm group-hover:text-amber-300 transition-colors truncate">
                    {item.title}
                  </h5>
                  {item.subtitle && (
                    <p className="text-[11px] text-stone-300 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          VARIANT 8: PARALLAX DUAL-PANORAMA GLIDE SLIDER (For Administration)
      ====================================================================== */}
      {variant === 'parallax-glide' && items.length > 0 && (
        <div className="space-y-4">
          {/* Interactive Tab Pills */}
          <div className="flex flex-wrap gap-2">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  idx === activeIndex
                    ? 'bg-[#102a43] text-[#e8a62a] shadow-sm'
                    : 'bg-[#f5f8fa] text-[#46505a] hover:bg-stone-200 border border-[#e5eaee]'
                }`}
              >
                {item.tag || item.title}
              </button>
            ))}
          </div>

          {/* Dual Panorama Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[0, 1].map((offset) => {
              const idx = (activeIndex + offset) % items.length;
              const item = items[idx];
              return (
                <div
                  key={`${item.id}-${offset}`}
                  onClick={() => setActivePreview(item)}
                  className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#e5eaee] shadow-md hover:shadow-xl cursor-pointer transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/90 via-[#071b2d]/30 to-transparent" />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-md bg-[#e8a62a] text-[#071b2d] text-[10px] font-extrabold uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="font-serif-heading text-base sm:text-xl font-bold group-hover:text-[#e8a62a] transition-colors">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-xs text-stone-200 mt-1">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Image Preview Modal */}
      {activePreview && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePreview(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-96 w-full">
              <img
                src={activePreview.image}
                alt={activePreview.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

              <button
                onClick={() => setActivePreview(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#163887] transition-colors cursor-pointer border border-white/20"
              >
                ✕
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                {activePreview.tag && (
                  <span className="px-3 py-1 bg-[#e8a62a] text-[#071b2d] text-xs font-black uppercase rounded-md">
                    {activePreview.tag}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-bold font-serif mt-2">
                  {activePreview.title}
                </h3>
                {activePreview.subtitle && (
                  <p className="text-sm text-stone-300 mt-1">
                    {activePreview.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
