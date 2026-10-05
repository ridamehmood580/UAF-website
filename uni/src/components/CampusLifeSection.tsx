import React from 'react';
import { Users, Trophy, Trees } from 'lucide-react';

interface CampusLifeSectionProps {
  onOpenAdvisor: () => void;
}

export const CampusLifeSection: React.FC<CampusLifeSectionProps> = ({
  onOpenAdvisor
}) => {
  return (
    <section id="campus" className="py-20 sm:py-28 bg-[#f5f8fa] border-b border-[#e5eaee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center justify-center gap-2 text-[#0f766e] text-xs sm:text-[13px] font-bold tracking-[1.8px] uppercase">
            <span className="w-6 h-[2px] bg-[#e8a62a] inline-block"></span>
            <span>Beyond Academics</span>
            <span className="w-6 h-[2px] bg-[#e8a62a] inline-block"></span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#071b2d] tracking-tight">
            Life at UAF is more than a degree.
          </h2>

          <p className="text-[#46505a] text-sm sm:text-base">
            Discover student societies, sports championships, hostel life, and our 1,950+ acre lush green botanical landscape.
          </p>
        </div>

        {/* Visual Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visual: Student Community */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] rounded-xl overflow-hidden shadow-lg border border-[#e5eaee] group flex flex-col justify-end p-8 text-white">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.3) 60%, rgba(7,27,45,0.05) 100%), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading font-bold text-2xl lg:text-3xl text-white">
                Student Community & Societies
              </h3>
              <p className="text-white/80 text-xs sm:text-sm max-w-lg leading-relaxed">
                Join over 40 active student clubs — from the Agrarian Society and Debating Club to Robotics, Dramatic Guild, and Young Women Leaders.
              </p>
            </div>
          </div>

          {/* Right Stacked Visuals */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            
            {/* Visual 1: Events & Activities */}
            <div className="relative min-h-[220px] rounded-xl overflow-hidden shadow-lg border border-[#e5eaee] group flex flex-col justify-end p-6 text-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.3) 60%, transparent 100%), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80')`
                }}
              />
              <div className="relative z-10 space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center shadow-md">
                  <Trophy className="w-4 h-4" />
                </div>
                <h3 className="font-serif-heading font-bold text-xl text-white">
                  Events & Sports Gala
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Tent-pegging championships, Olympic swimming pool, and the National Kissan Mela.
                </p>
              </div>
            </div>

            {/* Visual 2: Green Campus */}
            <div className="relative min-h-[220px] rounded-xl overflow-hidden shadow-lg border border-[#e5eaee] group flex flex-col justify-end p-6 text-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(7,27,45,0.92) 0%, rgba(7,27,45,0.3) 60%, transparent 100%), url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80')`
                }}
              />
              <div className="relative z-10 space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#0f766e] text-white flex items-center justify-center shadow-md">
                  <Trees className="w-4 h-4" />
                </div>
                <h3 className="font-serif-heading font-bold text-xl text-white">
                  Our Green Campus & Flora
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Botanical gardens with 2,400+ plant species and shaded tree-lined avenues across 1,950+ acres.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
