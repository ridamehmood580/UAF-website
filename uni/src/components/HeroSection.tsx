import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Building2, Calculator, Compass } from 'lucide-react';

// Exact image imports from src/assets/images according to the folder structure
import mainGateSunset from '../assets/images/7c9f8fcd-b428-46b3-bdb7-bc94c961cac9.jpg';
import aerialQuadrangle from '../assets/images/5089a7e8-c073-497e-a07b-5ff64398d871.jpg';
import mainCircularDrive from '../assets/images/46441194-6b77-4bb9-810f-ffdaf6ed53d5.jpg';
import oldBuildingLawn from '../assets/images/d14bbee5-c499-4e7a-a4ef-9c0cfb7d4444.jpg';
import campusWalkway from '../assets/images/d39aec01-ebe2-43a8-8d87-7ca601938428.jpg';
import facadeNoRoad from '../assets/images/uaf_facade_no_road_1790218656510.jpg';
import historicCampus from '../assets/images/uaf_historic_campus_1790213039900.jpg';
import emptyCampus from '../assets/images/uaf_historic_empty_campus_1790217821172.jpg';

export interface HeroSectionProps {
  onOpenCalculator: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onExplorePrograms?: () => void;
}

// Updated High-Resolution UAF Campus Architectural Images for the Hero Slider
// Synchronized with the exact image names present in the folder (src/assets/images)
export const HERO_BG_SLIDES = [
  {
    id: 'main-building-front-lawn',
    image: oldBuildingLawn,
    filename: 'd14bbee5-c499-4e7a-a4ef-9c0cfb7d4444.jpg',
    fallback: '/src/assets/images/d14bbee5-c499-4e7a-a4ef-9c0cfb7d4444.jpg',
    secondaryFallback: '/uaf_main_building_renewed.jpg',
    label: 'Historic UAF Main Academic Building & Front Lawn'
  },
  {
    id: 'aerial-quadrangle',
    image: aerialQuadrangle,
    filename: '5089a7e8-c073-497e-a07b-5ff64398d871.jpg',
    fallback: '/src/assets/images/5089a7e8-c073-497e-a07b-5ff64398d871.jpg',
    secondaryFallback: '/5089a7e8-c073-497e-a07b-5ff64398d871.jpg',
    label: 'Aerial View — Historic 1906 Main Academic Quadrangle'
  },
  {
    id: 'main-circular-drive',
    image: mainCircularDrive,
    filename: '46441194-6b77-4bb9-810f-ffdaf6ed53d5.jpg',
    fallback: '/src/assets/images/46441194-6b77-4bb9-810f-ffdaf6ed53d5.jpg',
    secondaryFallback: '/46441194-6b77-4bb9-810f-ffdaf6ed53d5.jpg',
    label: 'UAF Clock Tower & Heritage Circular Driveway'
  },
  {
    id: 'main-gate-sunset',
    image: mainGateSunset,
    filename: '7c9f8fcd-b428-46b3-bdb7-bc94c961cac9.jpg',
    fallback: '/src/assets/images/7c9f8fcd-b428-46b3-bdb7-bc94c961cac9.jpg',
    secondaryFallback: '/7c9f8fcd-b428-46b3-bdb7-bc94c961cac9.jpg',
    label: 'Iconic UAF Main Heritage Gate at Golden Sunset'
  },
  {
    id: 'campus-walkway',
    image: campusWalkway,
    filename: 'd39aec01-ebe2-43a8-8d87-7ca601938428.jpg',
    fallback: '/src/assets/images/d39aec01-ebe2-43a8-8d87-7ca601938428.jpg',
    secondaryFallback: '/d39aec01-ebe2-43a8-8d87-7ca601938428.jpg',
    label: 'Heritage Botanical Walkway & Clock Tower Pathway'
  },
  {
    id: 'campus',
    image: historicCampus,
    filename: 'uaf_historic_campus_1790213039900.jpg',
    fallback: '/src/assets/images/uaf_historic_campus_1790213039900.jpg',
    secondaryFallback: '/uaf_historic_campus_1790213039900.jpg',
    label: 'Heritage Red-Brick Architecture & Botanical Lawns'
  },
  {
    id: 'grounds',
    image: emptyCampus,
    filename: 'uaf_historic_empty_campus_1790217821172.jpg',
    fallback: '/src/assets/images/uaf_historic_empty_campus_1790217821172.jpg',
    secondaryFallback: '/uaf_historic_empty_campus_1790217821172.jpg',
    label: '1,950-Acre Lush Botanical & Research Campus'
  },
  {
    id: 'facade',
    image: facadeNoRoad,
    filename: 'uaf_facade_no_road_1790218656510.jpg',
    fallback: '/src/assets/images/uaf_facade_no_road_1790218656510.jpg',
    secondaryFallback: '/uaf_facade_no_road_1790218656510.jpg',
    label: 'Main Historic Academic Facade (Est. 1906)'
  }
];

// Sentences for the Typewriter Effect (No backspace deletion — directly starts next sentence)
const TYPING_SENTENCES = [
  { prefix: 'Shaping the Future of ', highlight: 'Agriculture.' },
  { prefix: 'Pioneering Sustainable ', highlight: 'Food Security.' },
  { prefix: 'Advancing Smart ', highlight: 'Agri-Innovation.' },
  { prefix: 'A Century of Academic ', highlight: 'Excellence.' }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCalculator,
  onOpenSearch,
  onOpenAdvisor,
  onExplorePrograms
}) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [activeBgSlide, setActiveBgSlide] = useState(0);

  const currentSentence = TYPING_SENTENCES[sentenceIndex];
  const totalLength = currentSentence.prefix.length + currentSentence.highlight.length;

  // Typewriter Effect (Types sentence, pauses, then starts next sentence directly)
  useEffect(() => {
    const typingSpeed = 70;
    const pauseAfterComplete = 2000;

    let timer: ReturnType<typeof setTimeout>;

    if (charIndex < totalLength) {
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setSentenceIndex((prev) => (prev + 1) % TYPING_SENTENCES.length);
        setCharIndex(0);
      }, pauseAfterComplete);
    }

    return () => clearTimeout(timer);
  }, [charIndex, totalLength]);

  // Smooth Auto-Rotating Hero Image Slider (Clean automatic rotation with no UI dots or arrows)
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setActiveBgSlide((prev) => (prev + 1) % HERO_BG_SLIDES.length);
    }, 4200);
    return () => clearInterval(bgTimer);
  }, []);

  const visiblePrefix = currentSentence.prefix.slice(
    0,
    Math.min(charIndex, currentSentence.prefix.length)
  );
  const visibleHighlight =
    charIndex > currentSentence.prefix.length
      ? currentSentence.highlight.slice(0, charIndex - currentSentence.prefix.length)
      : '';

  const activeSlide = HERO_BG_SLIDES[activeBgSlide];

  return (
    <section
      id="home"
      className="relative bg-[#071b2d] text-white min-h-[620px] sm:min-h-[680px] lg:min-h-[740px] flex flex-col justify-between overflow-hidden w-full max-w-full"
    >
      {/* Renewed UAF Campus Background Image Slider with Instant Load & Smooth Crossfade */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(7,27,45,0.88) 0%, rgba(7,27,45,0.72) 46%, rgba(7,27,45,0.30) 100%), url(${oldBuildingLawn})`
        }}
      >
        {HERO_BG_SLIDES.map((slide, idx) => {
          const isActive = idx === activeBgSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.label}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + slide.fallback) {
                    target.src = slide.fallback;
                  } else if (slide.secondaryFallback && target.src !== window.location.origin + slide.secondaryFallback) {
                    target.src = slide.secondaryFallback;
                  }
                }}
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(7,27,45,0.88) 0%, rgba(7,27,45,0.70) 50%, rgba(7,27,45,0.25) 100%)'
                }}
              />
            </div>
          );
        })}

        {/* Subtle Geometric Circle Watermark clipped cleanly inside overflow-hidden */}
        <div className="absolute right-[-100px] top-[-100px] w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] rounded-full border border-white/10 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-14 sm:pt-20 pb-10 lg:pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-5">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold text-white/95 shadow-sm">
            <i className="fa-solid fa-leaf text-[#e8a62a] text-sm"></i>
            <span>Knowledge • Innovation • Sustainability</span>
          </div>

          {/* Headline with Compact Size & Keyboard Typewriter Effect */}
          <div className="min-h-[64px] sm:min-h-[80px] lg:min-h-[92px] flex items-center">
            <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-[40px] font-bold text-white leading-[1.18] tracking-tight">
              <span>{visiblePrefix}</span>
              <span className="text-[#e8a62a] italic font-serif-heading font-medium">
                {visibleHighlight}
              </span>
              <span
                className="inline-block w-[3px] h-[0.85em] bg-[#e8a62a] ml-1.5 align-middle animate-pulse"
                aria-hidden="true"
              />
            </h1>
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
            The University of Agriculture Faisalabad is a place where knowledge, research, technology and innovation come together to address the challenges of food, agriculture and a sustainable future.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#architecture"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#e8a62a] hover:bg-amber-400 text-[#071b2d] font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Explore UAF Heritage</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCalculator}
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/50 hover:border-white bg-white/5 hover:bg-white hover:text-[#071b2d] text-white font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
            >
              <Calculator className="w-4 h-4 text-[#e8a62a]" />
              <span>Discover Admissions</span>
            </button>

            
          </div>

          {/* Live Campus Slide Indicator */}
          <div className="pt-4 flex items-center gap-3 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/30 backdrop-blur-sm border border-white/10 font-mono text-[11px] text-amber-300">
              <Building2 className="w-3 h-3" />
              <span>Slide {activeBgSlide + 1} of {HERO_BG_SLIDES.length}</span>
            </span>
            <span className="truncate max-w-xs sm:max-w-md font-medium text-white/90">
              {activeSlide.label}
            </span>
          </div>

        </div>
      </div>

      
        
    </section>
  );
};
