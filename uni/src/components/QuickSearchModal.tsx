import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  GraduationCap,
  Calendar,
  FileText,
  Home,
  ArrowRight
} from 'lucide-react';
import {
  ACADEMIC_PROGRAMS,
  CAMPUS_EVENTS,
  OFFICIAL_NOTICES,
  STUDENT_RESOURCES
} from '../data/uafData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: (progId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProgram
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        programs: ACADEMIC_PROGRAMS.slice(0, 3),
        events: CAMPUS_EVENTS.slice(0, 2),
        notices: OFFICIAL_NOTICES.slice(0, 2),
        resources: STUDENT_RESOURCES.slice(0, 2)
      };
    }

    const q = query.toLowerCase();
    return {
      programs: ACADEMIC_PROGRAMS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.facultyName.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      ),
      events: CAMPUS_EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q)
      ),
      notices: OFFICIAL_NOTICES.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.referenceNumber.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      ),
      resources: STUDENT_RESOURCES.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      )
    };
  }, [query]);

  if (!isOpen) return null;

  const hasResults =
    searchResults.programs.length > 0 ||
    searchResults.events.length > 0 ||
    searchResults.notices.length > 0 ||
    searchResults.resources.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search degrees, events, circulars, hostels, LMS, or faculty..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-stone-400 hover:text-stone-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-stone-200 text-stone-600 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
          {!hasResults ? (
            <div className="text-center py-10 space-y-2 text-stone-500">
              <Search className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="font-semibold text-stone-700">No results found for "{query}"</p>
              <p className="text-xs">Try searching for Agriculture, DVM, CS, Scholarship, or Hostel.</p>
            </div>
          ) : (
            <>
              {/* Programs */}
              {searchResults.programs.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Academic Programs ({searchResults.programs.length})</span>
                  </span>
                  <div className="space-y-1">
                    {searchResults.programs.map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => {
                          onClose();
                          onSelectProgram(prog.id);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 text-stone-800 flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="font-bold text-stone-900 group-hover:text-emerald-800">
                            {prog.title}
                          </p>
                          <span className="text-[11px] text-stone-500">
                            {prog.facultyName} • {prog.degreeLevel} • {prog.duration}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {searchResults.events.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-amber-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Campus Events & Conferences ({searchResults.events.length})</span>
                  </span>
                  <div className="space-y-1">
                    {searchResults.events.map((evt) => (
                      <a
                        key={evt.id}
                        href="#latest-events"
                        onClick={onClose}
                        className="block p-2.5 rounded-xl hover:bg-amber-50/70 text-stone-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">{evt.title}</span>
                          <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-600 font-semibold">
                            {evt.date}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {evt.venue} • {evt.category}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Notices */}
              {searchResults.notices.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Official Circulars & Date Sheets ({searchResults.notices.length})</span>
                  </span>
                  <div className="space-y-1">
                    {searchResults.notices.map((not) => (
                      <a
                        key={not.id}
                        href="#notices"
                        onClick={onClose}
                        className="block p-2.5 rounded-xl hover:bg-stone-100 text-stone-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 truncate max-w-[80%]">
                            {not.title}
                          </span>
                          <span className="text-[10px] text-stone-400">{not.date}</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-mono">
                          Ref: {not.referenceNumber}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Resources */}
              {searchResults.resources.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5" />
                    <span>Student Services & Portals ({searchResults.resources.length})</span>
                  </span>
                  <div className="space-y-1">
                    {searchResults.resources.map((res) => (
                      <a
                        key={res.id}
                        href="#resources"
                        onClick={onClose}
                        className="block p-2.5 rounded-xl hover:bg-stone-100 text-stone-800 transition-colors"
                      >
                        <span className="font-bold text-stone-900">{res.title}</span>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                          {res.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-[11px] text-stone-500 flex justify-between items-center">
          <span>University of Agriculture, Faisalabad Central Index</span>
          <span>Tip: Press <strong>Esc</strong> to close</span>
        </div>
      </div>
    </div>
  );
};
