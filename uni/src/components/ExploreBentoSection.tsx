import React, { useEffect, useRef, useState } from 'react';
import {
  GraduationCap,
  UserPlus,
  FlaskConical,
  Trees,
  Building2,
  ArrowRight
} from 'lucide-react';

interface ExploreBentoSectionProps {
  onOpenCalculator: () => void;
  onOpenAppointment: () => void;
  onSelectFaculty: (facultyId: string) => void;
}

export const ExploreBentoSection: React.FC<ExploreBentoSectionProps> = ({
  onOpenCalculator,
  onSelectFaculty
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect #4: Multi-Side Slide-In on Scroll + Interactive Hover Slide Effects
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
      id="explore-uaf"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-white border-b border-[#e5eaee] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Heading */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
          }`}
        >
          {/* Main Top Heading (Increased Size) */}
          <div className="inline-flex items-center justify-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
            <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block"></span>
            <span>Explore Your Future</span>
            <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block"></span>
          </div>

          {/* Sub-Heading Below (Reduced Size) */}
          <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#071b2d] tracking-tight">
            What will you discover at UAF?
          </h2>

          <p className="text-[#46505a] text-xs sm:text-sm">
            Explore the people, programs, and opportunities that make UAF exceptional.
          </p>
        </div>

        {/* Clean Modern Bento Grid with Multi-Directional Scroll Slide + Hover Slide Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] lg:auto-rows-[270px]">
          
          {/* Card 1: Academics (Tall - 2 rows) — Slides Left-to-Right on Scroll + Hover Lift */}
          <div
            onClick={() => onSelectFaculty('fac-agri')}
            className={`md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-1000 ease-out hover:-translate-y-2 group border border-[#e5eaee] hover:border-[#e8a62a] cursor-pointer flex flex-col justify-end text-white ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-24'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.4) 60%, rgba(7,27,45,0.1) 100%), url('/uaf_historic_campus.jpg')`
              }}
            />
            <div className="relative z-10 p-8 space-y-3 transition-transform duration-500 group-hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading font-bold text-2xl lg:text-3xl text-white">
                Academics & Faculties
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Explore premier faculties and specialized institutes across Agriculture, Veterinary, Engineering, and Food Sciences.
              </p>
              <div className="pt-2 inline-flex items-center gap-2 text-xs font-bold text-[#e8a62a] group-hover:translate-x-2 transition-transform">
                <span>Explore Academic Faculties</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Admissions — Slides Top-to-Down on Scroll + Hover Slide */}
          <div
            onClick={onOpenCalculator}
            className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-1000 delay-150 ease-out hover:-translate-y-2 group border border-[#e5eaee] hover:border-[#e8a62a] cursor-pointer flex flex-col justify-end text-white ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-20'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.3) 60%, rgba(7,27,45,0.1) 100%), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=700&q=80')`
              }}
            />
            <div className="relative z-10 p-7 space-y-2 transition-transform duration-500 group-hover:-translate-y-1.5">
              <div className="w-10 h-10 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <UserPlus className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading font-bold text-xl lg:text-2xl text-white">
                Admissions 2026
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                Calculate merit score, check criteria and begin your admission application.
              </p>
            </div>
          </div>

          {/* Card 3: Research & Innovation — Slides Right-to-Left on Scroll + Hover Slide */}
          <div
            onClick={() => {
              const el = document.getElementById('rti');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-1000 delay-200 ease-out hover:-translate-y-2 group border border-[#e5eaee] hover:border-[#e8a62a] cursor-pointer flex flex-col justify-end text-white ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-24'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.3) 60%, rgba(7,27,45,0.1) 100%), url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=80')`
              }}
            />
            <div className="relative z-10 p-7 space-y-2 transition-transform duration-500 group-hover:-translate-y-1.5">
              <div className="w-10 h-10 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading font-bold text-xl lg:text-2xl text-white">
                Research & Innovation
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                Conducting high-impact research in smart seeds, climate, and hydroponics.
              </p>
            </div>
          </div>

          {/* Card 4: Campus Life — Slides Below-to-Up on Scroll + Hover Slide */}
          <div
            onClick={() => {
              const el = document.getElementById('landmarks');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-1000 delay-300 ease-out hover:-translate-y-2 group border border-[#e5eaee] hover:border-[#e8a62a] cursor-pointer flex flex-col justify-end text-white ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-24'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.3) 60%, rgba(7,27,45,0.1) 100%), url('/uaf_facade_no_road.jpg')`
              }}
            />
            <div className="relative z-10 p-7 space-y-2 transition-transform duration-500 group-hover:-translate-y-1.5">
              <div className="w-10 h-10 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading font-bold text-xl lg:text-2xl text-white">
                Historic Campus
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                Experience the 1,950-acre heritage campus, botanical reserves, and iconic Clock Tower.
              </p>
            </div>
          </div>

          {/* Card 5: Administration — Slides Right-to-Left on Scroll + Hover Slide */}
          <div
            onClick={() => {
              const el = document.getElementById('administration');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-1000 delay-400 ease-out hover:-translate-y-2 group border border-[#e5eaee] hover:border-[#e8a62a] cursor-pointer flex flex-col justify-end text-white ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-24'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.3) 60%, rgba(7,27,45,0.1) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80')`
              }}
            />
            <div className="relative z-10 p-7 space-y-2 transition-transform duration-500 group-hover:-translate-y-1.5">
              <div className="w-10 h-10 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading font-bold text-xl lg:text-2xl text-white">
                Administration
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                Dedicated leadership and governance driving institutional excellence.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
