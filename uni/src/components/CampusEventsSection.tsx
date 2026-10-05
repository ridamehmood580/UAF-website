import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock
} from 'lucide-react';
import { CAMPUS_EVENTS } from '../data/uafData';
import { CampusEvent } from '../types';

interface CampusEventsSectionProps {
  onOpenCalculator: () => void;
  onSelectEvent?: (eventId: string) => void;
}

export const CampusEventsSection: React.FC<CampusEventsSectionProps> = ({
  onSelectEvent
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect (Left-to-Right as user scrolls down)
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

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = 370;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleDownloadICS = (evt: CampusEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//University of Agriculture Faisalabad//Event Calendar//EN
BEGIN:VEVENT
SUMMARY:${evt.title}
DESCRIPTION:${evt.description}
LOCATION:${evt.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCardClick = (eventId: string) => {
    if (onSelectEvent) {
      onSelectEvent(eventId);
    }
  };

  return (
    <section
      id="latest-events"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#f5f8fa] border-b border-[#e5eaee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Slides Left-to-Right on Scroll) */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-24'
          }`}
        >
          <div className="space-y-2">
            {/* Main Top Heading (Increased Size) */}
            <div className="inline-flex items-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block" />
              <span>Life & Celebrations at UAF</span>
            </div>

            {/* Sub-Heading Below (Reduced Size) */}
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#18212b]">
              Campus Happenings & Annual Expos
            </h2>

            <p className="text-xs sm:text-sm text-[#46505a] max-w-2xl">
              Join Pakistan&apos;s most vibrant agricultural celebrations, scientific symposia, and cultural galas organized at the historic Faisalabad campus.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scrollSlider('left')}
              className="w-11 h-11 rounded-full border border-[#cbd5e1] hover:border-[#0f766e] hover:bg-[#0f766e] hover:text-white text-stone-700 bg-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="w-11 h-11 rounded-full border border-[#cbd5e1] hover:border-[#0f766e] hover:bg-[#0f766e] hover:text-white text-stone-700 bg-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Event Cards Slider (Staggered Left-to-Right Scroll Entrance + Hover Slide) */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
        >
          {CAMPUS_EVENTS.map((evt, idx) => (
            <div
              key={evt.id}
              onClick={() => handleCardClick(evt.id)}
              style={{ transitionDelay: `${idx * 120}ms` }}
              className={`min-w-[300px] sm:min-w-[340px] max-w-[350px] snap-start bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-[#e5eaee] hover:border-[#0f766e]/40 transition-all duration-700 ease-out flex flex-col group shrink-0 cursor-pointer hover:-translate-y-2.5 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
              }`}
            >
              {/* Event Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#dff5f1] text-[#0f766e] text-[11px] font-bold tracking-wide uppercase rounded-md shadow-xs">
                  {evt.category}
                </span>
              </div>

              {/* Event Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#8b95a1] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#0f766e]" />
                    <span>{evt.date}</span>
                  </div>

                  <h3 className="font-serif-heading font-bold text-lg text-[#18212b] group-hover:text-[#0f766e] transition-colors leading-snug line-clamp-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#46505a] line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e5eaee] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(evt.id);
                    }}
                    className="text-xs font-bold text-[#0f766e] hover:text-[#102a43] flex items-center gap-1.5 cursor-pointer group-hover:translate-x-1.5 transition-transform"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#e8a62a]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadICS(evt);
                    }}
                    className="p-1.5 text-stone-400 hover:text-[#0f766e] transition-colors cursor-pointer"
                    title="Add to Calendar"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
