import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenAdvisor: () => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalculator,
  onOpenAdvisor,
  onOpenAppointment
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071b2d] text-white/80 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Col 1: University Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#102a43] text-[#e8a62a] flex items-center justify-center text-2xl border-2 border-white/20 shadow-md">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <div>
                <h3 className="font-serif-heading font-bold text-white text-lg leading-tight">
                  University of Agriculture
                </h3>
                <span className="text-[#0f766e] text-[10px] tracking-[2px] font-bold uppercase block">
                  Faisalabad, Pakistan
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed max-w-sm">
              Founded in 1906, UAF is Pakistan's premier institution for agricultural education, research, and innovation, addressing global challenges in food security and sustainable development.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0f766e] text-white flex items-center justify-center transition-colors text-sm shadow-xs"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0f766e] text-white flex items-center justify-center transition-colors text-sm shadow-xs"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0f766e] text-white flex items-center justify-center transition-colors text-sm shadow-xs"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0f766e] text-white flex items-center justify-center transition-colors text-sm shadow-xs"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Explore UAF (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-heading font-bold text-white text-base">
              Explore UAF
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#vision" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Vision 2050 & Heritage</span>
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Faculties & Programs</span>
                </a>
              </li>
              <li>
                <a href="#rti" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Research & Innovation</span>
                </a>
              </li>
              <li>
                <a href="#campus" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Campus Life & Green Spaces</span>
                </a>
              </li>
              <li>
                <a href="#administration" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>University Administration</span>
                </a>
              </li>
              <li>
                <a href="#latest-events" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Latest News & Events</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Tools (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-heading font-bold text-white text-base">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <button onClick={onOpenCalculator} className="hover:text-[#e8a62a] transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-[#e8a62a]" />
                  <span className="font-bold text-white">Merit Calculator</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdvisor} className="hover:text-[#e8a62a] transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Ask UAF Guide</span>
                </button>
              </li>
              <li>
                <a href="https://lms.uaf.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>AgriLearn LMS</span>
                </a>
              </li>
              <li>
                <a href="https://sis.uaf.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>SIS Student Portal</span>
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-[#e8a62a] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Careers & Tenders</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenAppointment} className="hover:text-[#e8a62a] transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-[#0f766e]" />
                  <span>Meet VC Secretariat</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-heading font-bold text-white text-base">
              Contact UAF
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e8a62a] shrink-0 mt-0.5" />
                <span>University of Agriculture, Jail Road, Faisalabad, 38000, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0f766e] shrink-0" />
                <span>+92 41 9200161-70</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0f766e] shrink-0" />
                <span>info@uaf.edu.pk / admissions@uaf.edu.pk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 University of Agriculture, Faisalabad. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#vision" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#vision" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#vision" className="hover:text-white transition-colors">Accessibility</a>
            
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0f766e] text-white flex items-center justify-center transition-colors ml-2 cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
