import React, { useEffect, useRef, useState } from 'react';
import { Building2, Calendar, ArrowRight } from 'lucide-react';

interface AdministrationSectionProps {
  onOpenAppointment: () => void;
  onOpenAdvisor: () => void;
}

export const AdministrationSection: React.FC<AdministrationSectionProps> = ({
  onOpenAppointment,
  onOpenAdvisor
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Slide Effect (Right-to-Left & Left-to-Right as user scrolls down)
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

  const OFFICES = [
    {
      title: 'Office of the Registrar',
      head: 'Dr. Muhammad Tariq',
      desc: 'University statutory bodies, Syndicate, Senate & academic records.'
    },
    {
      title: 'Controller of Examinations',
      head: 'Prof. Dr. Tahir Zahoor',
      desc: 'Degree verification, semester transcripts, and convocation awards.'
    },
    {
      title: 'Office of the Treasurer',
      head: 'Mr. Umar Saeed',
      desc: 'Financial management, HEC grants, and student fee facilitation.'
    },
    {
      title: 'Directorate of Student Affairs',
      head: 'Prof. Dr. Nadeem Abbas',
      desc: 'Co-curricular societies, student welfare, and campus discipline.'
    }
  ];

  return (
    <section
      id="administration"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-white border-b border-[#e5eaee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Administration Story (Slides Left-to-Right on Scroll) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-24'
            }`}
          >
            {/* Main Top Heading (Increased Size) */}
            <div className="inline-flex items-center gap-3 text-[#0f766e] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[1.8px] uppercase leading-tight">
              <span className="w-10 h-[3.5px] bg-[#e8a62a] inline-block shrink-0"></span>
              <span>Administration & Governance</span>
            </div>

            {/* Sub-Heading Below (Reduced Size) */}
            <h2 className="font-serif-heading text-base sm:text-lg lg:text-xl font-bold text-[#071b2d] leading-snug tracking-tight">
              Leadership with vision.
            </h2>

            {/* Description */}
            <p className="text-[#46505a] text-base sm:text-lg leading-relaxed">
              Guided by seasoned academic leadership, the UAF administration ensures transparency, academic excellence, and progressive governance across all statutory bodies including Syndicate, Senate, and Academic Council.
            </p>

            {/* Governance Offices Grid with Staggered Slide + Hover Lift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              {OFFICES.map((office, idx) => (
                <div
                  key={idx}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                  className={`p-4 bg-[#f5f8fa] rounded-xl border border-[#e5eaee] hover:border-[#0f766e]/50 hover:bg-white hover:shadow-lg transition-all duration-500 space-y-1 hover:-translate-y-1.5 hover:translate-x-1 cursor-pointer ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                >
                  <h4 className="font-serif-heading font-bold text-base text-[#18212b]">
                    {office.title}
                  </h4>
                  <span className="text-xs text-[#0f766e] font-bold block">
                    {office.head}
                  </span>
                  <p className="text-xs text-[#46505a] leading-relaxed">
                    {office.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Appointment CTA */}
            <div className="pt-4">
              <button
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-[#102a43] hover:bg-[#071b2d] text-white font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#e8a62a]" />
                <span>Book Appointment with VC Secretariat</span>
              </button>
            </div>
          </div>

          {/* Right Column: Navy Highlight Card (Slides Right-to-Left on Scroll) */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-24'
            }`}
          >
            <div className="bg-[#102a43] text-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden space-y-6 transition-transform duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center text-2xl shadow-lg">
                <Building2 className="w-7 h-7" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-[#e8a62a] uppercase tracking-widest">
                  Institutional Governance
                </span>
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                  Building a stronger future.
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  The University of Agriculture Faisalabad is dedicated to ensuring equal opportunities, academic freedom, and high-impact institutional innovation for future generations.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10 text-xs sm:text-[13px] text-white/90">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span>Right to Information (RTI) Desk</span>
                  <span className="text-[#e8a62a] font-bold">Active</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span>Anti-Harassment & Grievance Cell</span>
                  <span className="text-[#e8a62a] font-bold">24/7 Portal</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Quality Enhancement Cell (QEC)</span>
                  <span className="text-[#e8a62a] font-bold">HEC W-Category</span>
                </div>
              </div>

              <button
                onClick={onOpenAdvisor}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded border border-white/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Ask Admin Inquiries</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e8a62a]" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
