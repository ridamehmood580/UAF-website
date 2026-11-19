'use client';

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
                src="/vice-chancellor-zulfiqar-ali.png"
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
              className="mt-4.5 w-full py-3 px-4 text-xs sm:text-[13px] font-semibold text-[#46505a] hover:text-blue-700 bg-[#f5f8fa] hover:bg-[#e8eef9] border border-[#e5eaee] hover:border-[#1d4e89]/30 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs"
            >
              <Calendar className="w-4 h-4 text-black" />
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
            <div className="inline-flex items-center gap-3 text-[#1e3a7a] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[2px] uppercase">
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
                The University of Agriculture Faisalabad (UAF), Pakistan traces its legacy and history back to 1906 as The Punjab Agriculture College and Research Institute, evolving into university in 1961, with its roots in the early days of canal colonies that played a vital role in ensuring food security in a famine-prone region. It is a prestigious place, where I completed my higher education and started my career. I deeply admire the excellence, diversity, innovation and the bold visions of this university.
              </p>
              <p>
                With a vision and mission focused on food security, agriculture, rural development, innovation, and technology, the UAF is quintessentially contributing to advancing teaching and research excellence, and a knowledge-based economy. The UAF is a hub of excellence, with a diverse array of cultures and innovation beyond disciplines.
              </p>
              
              {isExpanded ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <p>
                    Being in an agricultural country, we are committed to addressing global challenges: food security, climate change, water conservation, sustainable agriculture, economic development and social equality. Due to the evolution in the global landscape, our major focus is on agricultural productivity, climate-resilient cutting-edge technologies leading to agrifood systems transformation and playing our role in shaping a sustainable economy.
                  </p>
                  <p>
                    We are eager to bridge the gap between academia, research, industry and practice that truly translates to the real-world solutions that equally benefit farmers, industry, and society.
                  </p>
                  <p>
                    Over the decades, we have evolved into a globally recognized center of excellence that is committed to bringing scientific breakthroughs. The UAF is not only an institution that reflects ambitious, career-oriented youth, but it is the place where it empowers minds with advanced knowledge, critical thinking, learning, and generates entrepreneurs across all diverse disciplines.
                  </p>
                  <p>
                    Its framework is designed to meet sustainable global standards through entrepreneurial initiatives fostering start-ups and spin-offs to evolve into venture capitalists (VCs). UAF prioritizes learning, discovery, skill development, demand-driven and solution-oriented research (products, varieties, goods and services) to support community and rural development. Additionally, it actively contributes to public policy, intervention, advocacy for rural farming community, agrarian reforms, and leadership.
                  </p>
                  <p>
                    The UAF stewardship commemorates and mandates self-reliance through commissioned research, industry-academia-government partnerships, commercialization hubs, technological, and economic development. The UAF flagship in agriculture, animal health and production, mechanization, food sciences, health and allied sciences creates impact through skilled youth, enhanced crop productivity, and policy interventions.
                  </p>
                  <p>
                    Aligned with UN SDGs ̶ particularly Zero Hunger, Good Health &amp; Wellbeing, Climate Action, Partnerships, and Gender Mainstreaming ̶ the UAF is committed to comply nationally determined contributions (NDCs). Recognized as an enterprise and STZA, the university aims to attract VCs and companies for commercial ecosystems such as a technology park.
                  </p>
                  <p>
                    In light of paradigm transformation of global expectations from universities, the UAF expands its global outreach through international centers such as CAS-AFS, D-8 Food Security Center, PKNC, and Confucius institute. The UAF is a learner-centered institution inspired by a vibrant campus life to pursue and enjoy knowledge, ethics, creativity, discovery, and public service.
                  </p>
                  <p>
                    I am eager to strengthen UAF’s legacy by integrating advanced technology, enhancing academia and industry linkages under the umbrella of research-driven solutions, teamwork and faculty leadership.
                  </p>
                  <p>
                    I enthusiastically welcome students, faculty, staff, community, stakeholders, public-private entities, investors, entrepreneurs, global partners and policy makers to join hands with UAF to achieve greater agenda of education, food security, community service, equity, well-being and in achieving the vital goals of zero hunger. I believe in a respectable diversity where each scholar has an equal chance and access to knowledge, the system and opportunities.
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
                className="inline-flex items-center gap-2 px-6 py-3 border-1.5 border-[#1d4e89] text-black hover:bg-[#1d4e89] hover:text-white font-bold text-xs sm:text-[13px] rounded transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs"
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
