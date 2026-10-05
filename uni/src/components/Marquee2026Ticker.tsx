import React, { useState } from 'react';
import {
  Bell,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

interface Marquee2026TickerProps {
  onOpenCalculator?: () => void;
}

export const MARQUEE_ITEMS_2026 = [
  {
    id: 'm1',
    badge: 'Admissions 2026-27',
    text: 'Undergraduate Result of Second Entry Test held on 02-08-2026 is officially declared online.',
    link: '#notices',
    isHot: true,
    date: '09-Aug-2026'
  },
  {
    id: 'm2',
    badge: 'Hafiz-e-Quran Test',
    text: 'Schedule of Hafiz-e-Quran Test & Interviews for Fall 2026 Admissions at DSA Office.',
    link: '#notices',
    isHot: false,
    date: '07-Aug-2026'
  },
  {
    id: 'm3',
    badge: 'Sports & Co-Curricular',
    text: 'Schedule for Interviews & Trials for Co-Curricular & Sports Quota Admissions Session 2026-27.',
    link: '#notices',
    isHot: false,
    date: '07-Aug-2026'
  },
  {
    id: 'm4',
    badge: 'Vice Chancellor Message',
    text: 'Prof. Dr. Zulfiqar Ali highlights UAF Vision 2050 for National Food Security & Agritech.',
    link: '#vc-message',
    isHot: true,
    date: '14-Aug-2026'
  },
  {
    id: 'm5',
    badge: 'Annual Kissan Mela 2026',
    text: 'Grand 3-Day National Agri-Expo & Farmers Festival scheduled at UAF Main Campus.',
    link: '#latest-events',
    isHot: false,
    date: '2026 Edition'
  },
  {
    id: 'm6',
    badge: 'QS World Ranking 2026',
    text: 'UAF ranked #1 in Agriculture & Forestry in Pakistan and top 100 globally.',
    link: '#about',
    isHot: true,
    date: 'QS 2026'
  }
];

export const Marquee2026Ticker: React.FC<Marquee2026TickerProps> = ({ onOpenCalculator }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full max-w-full bg-[#071b2d] border-y-2 border-[#c99738]/70 text-stone-200 text-xs py-2.5 px-3 relative overflow-hidden shadow-md select-none">
      <div className="w-full max-w-[1400px] min-w-0 mx-auto flex items-center justify-between gap-3">
        {/* Left Sticky Label with Gold Accent Border */}
        <div className="flex items-center gap-2 shrink-0 z-10 bg-[#071b2d] pr-3 py-0.5 border-r-2 border-[#c99738]/60">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8a62a] text-[#071b2d] font-bold text-[11px] tracking-wide shadow-xs animate-pulse">
            <Bell className="w-3.5 h-3.5" />
            <span>2026 ALERTS</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-300">
            Session 2026-27 Updates
          </span>
        </div>

        {/* Scrolling Ticker Stream with Guaranteed No-Overflow */}
        <div className="flex-1 min-w-0 overflow-hidden relative">
          <div
            className={`inline-flex items-center gap-8 whitespace-nowrap animate-ticker ${
              isPaused ? 'style-paused' : ''
            }`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {[...MARQUEE_ITEMS_2026, ...MARQUEE_ITEMS_2026].map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={item.link}
                className="inline-flex items-center gap-2 hover:text-[#e8a62a] transition-colors group cursor-pointer"
              >
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                    item.isHot
                      ? 'bg-rose-900/70 text-rose-200 border border-rose-700/60'
                      : 'bg-[#0f766e]/70 text-emerald-200 border border-emerald-600/50'
                  }`}
                >
                  {item.badge}
                </span>

                <span className="text-xs text-stone-200 font-medium group-hover:underline">
                  {item.text}
                </span>

                <span className="text-[10px] text-stone-400 font-mono">
                  [{item.date}]
                </span>

                <span className="text-stone-600 font-bold ml-2">•</span>
              </a>
            ))}
          </div>
        </div>

        {/* Controls with Gold Accent Border */}
        <div className="flex items-center gap-2 shrink-0 z-10 bg-[#071b2d] pl-3 py-0.5 border-l-2 border-[#c99738]/60">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-100 hover:bg-[#102a43] transition-colors cursor-pointer"
            title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
            aria-label={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#e8a62a]" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-[#e8a62a] hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Merit Portal</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
