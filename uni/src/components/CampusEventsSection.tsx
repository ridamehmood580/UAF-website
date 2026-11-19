'use client';

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Clock, ExternalLink } from 'lucide-react';

interface CampusEventsSectionProps {
  onOpenCalculator: () => void;
  onSelectEvent?: (eventId: string) => void;
}

const LATEST_NEWS = [
  {
    id: 'news-2221',
    title: 'Confucius Institute at UAF receives Outstanding Achievement Award',
    date: '18 Nov 2026',
    category: 'International Achievement',
    image: '/uaf_historic_campus.jpg',
    description: 'The China International Education Foundation recognized CI-UAF for its locally managed Chinese language education, cultural exchange, and academic collaboration model.',
    link: 'https://web.uaf.edu.pk/News/NewsDetail/2221'
  },
  {
    id: 'news-2222',
    title: 'UAF and Kazakhstan university sign five-year cooperation agreement',
    date: '18 Nov 2026',
    category: 'Global Partnership',
    image: '/uaf-kazakhstan-partnership.png',
    description: 'UAF and Saken Seifullin Kazakh Agrotechnical Research University agreed to collaborate in agricultural sciences, information technology, and academic exchange.',
    link: 'https://web.uaf.edu.pk/News/NewsDetail/2222'
  },
  {
    id: 'news-2219',
    title: 'UAF to hold its 29th Convocation on November 25',
    date: '17 Nov 2026',
    category: 'University Events',
    image: '/5089a7e8-c073-497e-a07b-5ff64398d871.jpg',
    description: 'The university will confer degrees on 2024 graduates, followed by the 61st Alumni Reunion from November 26 to 27, 2026.',
    link: 'https://web.uaf.edu.pk/News/NewsDetail/2219'
  },
  {
    id: 'news-2220',
    title: 'UAF secures six positions at PINTECH 2026',
    date: '16 Nov 2026',
    category: 'Innovation',
    image: '/7c9f8fcd-b428-46b3-bdb7-bc94c961cac9.jpg',
    description: 'UAF projects earned six positions in innovation categories at the Punjab Higher Education Commission’s PINTECH 2026 Expo.',
    link: 'https://web.uaf.edu.pk/News/NewsDetail/2220'
  }
];

export const CampusEventsSection: React.FC<CampusEventsSectionProps> = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: direction === 'left' ? -370 : 370, behavior: 'smooth' });
  };

  return (
    <section id="latest-events" className="py-20 sm:py-28 bg-[#f5f8fa] border-b border-[#e5eaee] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-3 text-[#1e3a7a] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block" />
              <span>Latest News and Events</span>
            </div>
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#18212b]">Stories and announcements from UAF</h2>
            <p className="text-xs sm:text-sm text-[#46505a] max-w-2xl">Recent news published on the official University of Agriculture Faisalabad website.</p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button onClick={() => scrollSlider('left')} aria-label="Scroll left" className="w-11 h-11 rounded-full border border-[#cbd5e1] hover:border-[#1d4e89] hover:bg-[#1d4e89] hover:text-white text-stone-700 bg-white flex items-center justify-center transition-all cursor-pointer shadow-xs"><ArrowLeft className="w-5 h-5" /></button>
            <button onClick={() => scrollSlider('right')} aria-label="Scroll right" className="w-11 h-11 rounded-full border border-[#cbd5e1] hover:border-[#1d4e89] hover:bg-[#1d4e89] hover:text-white text-stone-700 bg-white flex items-center justify-center transition-all cursor-pointer shadow-xs"><ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div ref={sliderRef} className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none">
          {LATEST_NEWS.map((item) => (
            <article key={item.id} className="min-w-[300px] sm:min-w-[340px] max-w-[350px] snap-start bg-white rounded-2xl overflow-hidden shadow-md border border-[#e5eaee] hover:border-[#1d4e89]/40 transition-all flex flex-col shrink-0 hover:-translate-y-2.5">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-1">
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img src={item.image} alt="University of Agriculture Faisalabad campus" className="w-full h-full object-cover" />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#e8eef9] text-black text-[11px] font-bold tracking-wide uppercase rounded-md shadow-xs">{item.category}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#8b95a1] font-semibold"><Clock className="w-3.5 h-3.5 text-black" /><span>{item.date}</span></div>
                    <h3 className="font-serif-heading font-bold text-lg text-[#18212b] leading-snug line-clamp-2">{item.title}</h3>
                    <p className="text-xs sm:text-[13px] text-[#46505a] line-clamp-3 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#e5eaee] flex items-center justify-between text-xs font-bold text-black">
                    <span>Read on UAF</span><ExternalLink className="w-4 h-4 text-[#e8a62a]" />
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
