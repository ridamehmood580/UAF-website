import React, { useState } from 'react';
import {
  Laptop,
  BookOpen,
  Home,
  DollarSign,
  Bus,
  Briefcase,
  Activity,
  Trophy,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { STUDENT_RESOURCES } from '../data/uafData';
import { StudentResource } from '../types';

const RESOURCE_CATEGORIES = [
  'All',
  'Academic & LMS',
  'Hostels & Living',
  'Scholarships & Aid',
  'Career & Placement',
  'Health & Sports',
  'Transport & IT'
] as const;

export const StudentResourcesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalResource, setActiveModalResource] = useState<StudentResource | null>(null);
  const [showTransportModal, setShowTransportModal] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-5 h-5 text-emerald-700" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-emerald-700" />;
      case 'Home': return <Home className="w-5 h-5 text-amber-600" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5 text-emerald-700" />;
      case 'Bus': return <Bus className="w-5 h-5 text-amber-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-700" />;
      case 'Activity': return <Activity className="w-5 h-5 text-red-600" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-600" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-700" />;
    }
  };

  const filteredResources = STUDENT_RESOURCES.filter((res) => {
    if (selectedCategory === 'All') return true;
    return res.category === selectedCategory;
  });

  return (
    <section id="resources" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Home className="w-3.5 h-3.5" />
              <span>Campus Life & Student Services</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Comprehensive Student Resources & Support
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Everything you need for seamless academic success, on-campus boarding, daily transport,
              financial aid, clinical healthcare, and high-growth career placements.
            </p>
          </div>

          {/* Quick Transport Schedule Button */}
          <button
            onClick={() => setShowTransportModal(true)}
            className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <Bus className="w-4 h-4 text-amber-700" />
            <span>Bus Routes & Shuttle Schedule</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-200 pb-4">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#005a36] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-stone-50 rounded-2xl border border-stone-200 hover:border-emerald-700/60 p-5 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-3.5">
                {/* Header Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {getIcon(res.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-stone-600 border border-stone-200">
                    {res.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-heading text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                {/* Key Features Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-stone-200/60 text-[11px] text-stone-700">
                  {res.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Location & Helpline */}
                <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate">{res.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>{res.helpline}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-3 border-t border-stone-200/80">
                <button
                  onClick={() => setActiveModalResource(res)}
                  className="w-full py-2 px-3 bg-white hover:bg-[#005a36] text-stone-800 hover:text-white rounded-xl text-xs font-bold border border-stone-200 hover:border-emerald-800 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>{res.quickActionTitle}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Student Welfare & Scholarships Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-extrabold uppercase">
              ★ Financial Aid Desk
            </div>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold">
              Over PKR 450 Million in Annual Scholarships
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              No deserving student is left behind. UAF provides full tuition fee waivers, monthly stipends,
              and hostel subsidies through PEEF, Ehsaas, USAID, and Alumni Endowment Funds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                const fin = STUDENT_RESOURCES.find((r) => r.id === 'res-financial');
                if (fin) setActiveModalResource(fin);
              }}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Apply for Scholarship
            </button>
            <a
              href="#notices"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-xl text-xs sm:text-sm font-semibold text-center transition-colors"
            >
              View Merit Lists
            </a>
          </div>
        </div>
      </div>

      {/* Resource Detail Modal */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  {getIcon(activeModalResource.iconName)}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase">
                    {activeModalResource.category}
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900">
                    {activeModalResource.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalResource(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {activeModalResource.description}
            </p>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2.5 text-xs">
              <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                Features & Services Available:
              </h4>
              <div className="space-y-1.5">
                {activeModalResource.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
              <div>
                <span className="font-bold text-stone-800 block">Location:</span>
                <span>{activeModalResource.location}</span>
              </div>
              <div>
                <span className="font-bold text-stone-800 block">Timings:</span>
                <span>{activeModalResource.timing}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  alert(`Accessing ${activeModalResource.title} Portal. Connecting with UAF Central Server...`);
                  setActiveModalResource(null);
                }}
                className="flex-1 py-2.5 bg-[#005a36] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Portal ({activeModalResource.urlPlaceholder})</span>
              </button>
              <button
                onClick={() => setActiveModalResource(null)}
                className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transport Shuttle Routes Modal */}
      {showTransportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900">
                    UAF Campus Bus Routes & Schedule
                  </h3>
                  <span className="text-xs text-stone-500">Motor Transport Pool (MTP) Official Timings</span>
                </div>
              </div>
              <button
                onClick={() => setShowTransportModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950">
                <strong>Note:</strong> Bus passes are issued per semester from the Transport Office (STC Building).
                Morning arrival at Main Campus is 08:15 AM. Evening departure begins at 04:30 PM & 08:30 PM (Library Shuttle).
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-2.5">Route #</th>
                      <th className="p-2.5">Coverage Sectors</th>
                      <th className="p-2.5">Morning Departure</th>
                      <th className="p-2.5">Buses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-800">Route 1</td>
                      <td className="p-2.5">Madina Town, Susan Road, Kohinoor City, Jail Road</td>
                      <td className="p-2.5">07:15 AM</td>
                      <td className="p-2.5">4 Buses</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-800">Route 2</td>
                      <td className="p-2.5">Ghulam Muhammad Abad, Narwala Road, D-Ground</td>
                      <td className="p-2.5">07:20 AM</td>
                      <td className="p-2.5">3 Buses</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-800">Route 3</td>
                      <td className="p-2.5">Samanabad, Novelty Bridge, Satiana Road, Gate #4</td>
                      <td className="p-2.5">07:10 AM</td>
                      <td className="p-2.5">4 Buses</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-800">Route 4</td>
                      <td className="p-2.5">Jaranwala Intercity Shuttle & Khurrianwala Interchange</td>
                      <td className="p-2.5">06:45 AM</td>
                      <td className="p-2.5">2 Buses</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-800">Route 5</td>
                      <td className="p-2.5">Samundri & Gojra Regional Student Express</td>
                      <td className="p-2.5">06:30 AM</td>
                      <td className="p-2.5">2 Buses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowTransportModal(false)}
                className="py-2 px-5 bg-[#005a36] text-white rounded-xl text-xs font-bold hover:bg-emerald-900 cursor-pointer"
              >
                Close Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
