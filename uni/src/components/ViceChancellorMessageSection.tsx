import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface ViceChancellorMessageSectionProps {
  onOpenAppointmentModal: () => void;
  onExploreVision?: () => void;
}

export const ViceChancellorMessageSection: React.FC<ViceChancellorMessageSectionProps> = ({
  onOpenAppointmentModal
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect #2: Slides in from Right-to-Left when scrolling
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
      id="vc-message"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-white border-b border-[#e5eaee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Single VC Photo & Schedule Appointment (Slides Right-to-Left on Scroll + Hover Zoom) */}
          <div
            className={`lg:col-span-5 flex flex-col items-center w-full transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-24'
            }`}
          >
            <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border border-[#e5eaee] group cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85"
                alt="Prof. Dr. Zulfiqar Ali, Vice Chancellor, University of Agriculture Faisalabad"
                className="w-full h-[420px] sm:h-[500px] lg:h-[540px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071b2d]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white transition-transform duration-500 group-hover:translate-x-1">
                <span className="text-[#e8a62a] text-xs font-bold uppercase tracking-wider block">
                  Office of the Vice Chancellor
                </span>
                <h4 className="font-serif-heading text-lg sm:text-xl font-bold">
                  Prof. Dr. Zulfiqar Ali
                </h4>
              </div>
            </div>

            {/* Schedule Appointment trigger under image */}
            <button
              onClick={onOpenAppointmentModal}
              className="mt-4.5 w-full py-3 px-4 text-xs sm:text-[13px] font-semibold text-[#46505a] hover:text-[#0f766e] bg-[#f5f8fa] hover:bg-[#dff5f1] border border-[#e5eaee] hover:border-[#0f766e]/30 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#0f766e]" />
              <span>Schedule a personal appointment with Vice Chancellor</span>
            </button>
          </div>

          {/* Right Column: VC Message Heading & Body (Slides Right-to-Left with Delay on Scroll) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 delay-150 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-28'
            }`}
          >
            {/* Main Top Heading (Increased Size) */}
            <div className="inline-flex items-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block"></span>
              <span>Leadership Address</span>
            </div>

            {/* Sub-Heading Below (Reduced Size) */}
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#071b2d] leading-snug tracking-tight">
              The Message from Vice Chancellor
            </h2>

            {/* Message Body */}
            <div className="text-[#46505a] text-[15px] sm:text-[16px] leading-[1.9] text-justify space-y-4 font-normal">
              <p>
                The University of Agriculture Faisalabad (UAF) traces its legacy back to 1906 as the Punjab Agriculture College and Research Institute, evolving into a university in 1961, with its roots in the early days of canal colonies that played a vital role in ensuring food security in a famine-prone region.
              </p>
              <p>
                With a vision and mission focused on food security, agriculture, rural development, innovation and technology, UAF is quintessentially contributing to advancing teaching and research excellence and a knowledge-based economy. UAF is a hub of excellence, with a diverse array of cultures and innovation beyond disciplines.
              </p>
              
              {isExpanded ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <p>
                    Being in an agricultural country, we are committed to addressing global challenges: food security, climate change, water conservation, sustainable agriculture, economic development and social equality.
                  </p>
                  <p>
                    Through our modernized curricula, cutting-edge laboratory facilities, and extensive outreach across farming communities, UAF continues to produce visionary agricultural scientists, engineers, veterinary doctors, and entrepreneurs. We welcome all aspiring students and international partners to join our vibrant academic community.
                  </p>
                </div>
              ) : (
                <p>
                  Being in an agricultural country, we are committed to addressing global challenges: food security, climate change, water conservation, sustainable agriculture, economic development and social equality...
                </p>
              )}
            </div>

            {/* Action & Signature Row */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#e5eaee]">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-6 py-3 border-1.5 border-[#0f766e] text-[#0f766e] hover:bg-[#0f766e] hover:text-white font-bold text-xs sm:text-[13px] rounded transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs"
              >
                <span>{isExpanded ? 'Read less' : 'Read more'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              <div className="text-right">
                <span className="font-serif-heading font-bold text-[#071b2d] text-base sm:text-lg block">
                  Prof. Dr. Zulfiqar Ali
                </span>
                <span className="text-xs text-[#8b95a1] font-medium">
                  Vice Chancellor, University of Agriculture Faisalabad
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
