import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Sparkles,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { CAMPUS_EVENTS } from '../data/uafData';
import { CampusEvent } from '../types';

interface EventDetailPageProps {
  eventId: string;
  onNavigateHome: () => void;
  onSelectEvent?: (id: string) => void;
}

type ExtendedCampusEvent = CampusEvent & {
  details?: string;
  galleryImages?: string[];
  fullOverview?: string;
  highlights?: string[];
};

// Fallback high-resolution related images pool by category
const FALLBACK_RELATED_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80'
];

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventId,
  onNavigateHome
}) => {
  const event = (CAMPUS_EVENTS.find((e) => e.id === eventId) || CAMPUS_EVENTS[0]) as ExtendedCampusEvent;

  // Guarantee a rich set of related images for every event
  const rawImages: string[] = [
    event.image,
    ...(event.galleryImages || [])
  ];

  // If event has fewer than 6 images, augment with relevant high-res photos
  const allImages: string[] = rawImages.length >= 5
    ? rawImages
    : Array.from(new Set([...rawImages, ...FALLBACK_RELATED_IMAGES.slice(0, 6)]));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const openGalleryAtIndex = (index: number) => {
    setActiveImageIndex(index);
    setIsGalleryOpen(true);
  };

  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Keyboard navigation for gallery popup
  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, nextImage, prevImage]);

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#1e293b] pb-20 animate-in fade-in duration-300">
      
      {/* =====================================================
           MAIN CARD (UPPER IMAGE + LOWER DETAILS + ALL RELATED PHOTOS)
      ====================================================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="bg-white rounded-3xl shadow-lg border border-stone-200/90 overflow-hidden transition-all">
          
          {/* ---------------------------------------------------
              1. UPPER SECTION: FEATURED EVENT IMAGE (CLICKABLE)
          --------------------------------------------------- */}
          <div
            onClick={() => openGalleryAtIndex(0)}
            className="group relative w-full h-72 sm:h-96 md:h-[460px] bg-stone-900 cursor-pointer overflow-hidden select-none"
            role="button"
            tabIndex={0}
            aria-label="Click to open event photo gallery"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openGalleryAtIndex(0);
              }
            }}
          >
            {/* Main Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors pointer-events-none" />

            {/* Top Left: Category Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
              <span className="px-3.5 py-1.5 bg-[#e8a62a] text-[#071b2d] text-xs font-black uppercase tracking-wider rounded-lg shadow-md">
                {event.category}
              </span>
            </div>

            {/* Center Hover Affordance */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <div className="bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-full flex items-center gap-2.5 shadow-xl border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Maximize2 className="w-5 h-5 text-[#e8a62a]" />
                <span className="text-sm font-bold tracking-wide">Click to Open Photo Gallery</span>
              </div>
            </div>

            {/* Bottom Floating Bar on Image */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10">
                <Camera className="w-4 h-4 text-[#e8a62a]" />
                <span>Click to Open Photo Gallery</span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------
              2. LOWER SECTION: EVENT DETAILS ON THE SAME CARD
          --------------------------------------------------- */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-[#071b2d] leading-tight">
                {event.title}
              </h1>
            </div>

            {/* Meta Info Badges (Date, Timing, Venue) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-stone-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Date</div>
                  <div className="text-sm font-bold text-stone-800">{event.date}</div>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-stone-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Timing</div>
                  <div className="text-sm font-bold text-stone-800">{event.time}</div>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-stone-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#005a36]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#005a36]" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Venue</div>
                  <div className="text-sm font-bold text-stone-800 line-clamp-1" title={event.venue}>
                    {event.venue}
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Overview */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#071b2d] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#e8a62a]" />
                <span>Event Overview & Description</span>
              </h2>

              <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
                {event.fullOverview || event.description}
              </p>

              {event.details && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium leading-relaxed">
                  {event.details}
                </div>
              )}
            </div>

            {/* Key Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <h3 className="text-base font-bold text-stone-800 flex items-center gap-2">
                  <span>Key Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((highlight: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#005a36] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-stone-700 leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              
              {/* Back to All Events: Green Background, Yellow Border, White Text */}
              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl border-2 border-[#e8a62a] bg-[#005a36] hover:bg-[#004227] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group hover:scale-102"
              >
                <ArrowLeft className="w-4 h-4 text-[#e8a62a] group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Events</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Event'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          ONE-BY-ONE INTERACTIVE GALLERY POPUP MODAL
      ====================================================== */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-stone-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pop-up Header */}
            <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-3 truncate">
                <span className="px-2.5 py-1 bg-[#e8a62a] text-[#071b2d] text-xs font-black uppercase rounded-md tracking-wider">
                  Gallery
                </span>
                <h3 className="text-white text-sm sm:text-base font-bold truncate">
                  {event.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-stone-300 bg-white/10 px-3 py-1 rounded-full">
                  {activeImageIndex + 1} / {allImages.length}
                </span>

                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close gallery (Esc)"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pop-up Image Viewer (One by One) */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[64vh] bg-black flex items-center justify-center p-2 sm:p-4 select-none">
              <img
                src={allImages[activeImageIndex]}
                alt={`${event.title} - photo ${activeImageIndex + 1}`}
                className="max-w-full max-h-[62vh] object-contain rounded-lg shadow-2xl transition-all duration-300"
              />

              {/* Prev Button */}
              <button
                onClick={prevImage}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 hover:bg-[#005a36] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm border border-white/20 shadow-xl hover:scale-108"
                title="Previous photo (Left Arrow)"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 hover:bg-[#005a36] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm border border-white/20 shadow-xl hover:scale-108"
                title="Next photo (Right Arrow)"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Pop-up Thumbnail Strip & Controls */}
            <div className="p-3 sm:p-4 bg-black/70 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-stone-400 px-1">
                <span>Use keyboard ← / → arrows or click any thumbnail below</span>
                <span className="text-[#e8a62a] font-semibold">
                  Photo #{activeImageIndex + 1} of {allImages.length}
                </span>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-stone-700">
                {allImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#e8a62a] ring-2 ring-[#e8a62a]/50 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                    title={`View photo ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
