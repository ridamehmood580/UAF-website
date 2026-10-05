import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  GraduationCap,
  Clock,
  Coins,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
  Info
} from 'lucide-react';
import { ACADEMIC_PROGRAMS, FACULTIES } from '../data/uafData';
import { AcademicProgram, DegreeLevel } from '../types';

interface AcademicProgramsSectionProps {
  onOpenCalculator: (programId?: string) => void;
  selectedFacultyFilter: string | null;
  onClearFacultyFilter: () => void;
}

const DEGREE_LEVELS: ('All' | DegreeLevel)[] = [
  'All',
  'Undergraduate',
  'Postgraduate',
  'PhD',
  'Diploma & Certificate'
];

export const AcademicProgramsSection: React.FC<AcademicProgramsSectionProps> = ({
  onOpenCalculator,
  selectedFacultyFilter,
  onClearFacultyFilter
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | DegreeLevel>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShift, setSelectedShift] = useState<'All' | 'Morning' | 'Evening'>('All');
  const [activeModalProgram, setActiveModalProgram] = useState<AcademicProgram | null>(null);

  const filteredPrograms = useMemo(() => {
    return ACADEMIC_PROGRAMS.filter((prog) => {
      // Level filter
      if (selectedLevel !== 'All' && prog.degreeLevel !== selectedLevel) {
        return false;
      }
      // Faculty filter from parent props
      if (selectedFacultyFilter && prog.facultyId !== selectedFacultyFilter) {
        return false;
      }
      // Shift filter
      if (selectedShift !== 'All') {
        if (selectedShift === 'Morning' && prog.shift !== 'Morning' && prog.shift !== 'Both') return false;
        if (selectedShift === 'Evening' && prog.shift !== 'Evening' && prog.shift !== 'Both') return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = prog.title.toLowerCase().includes(query);
        const matchesFaculty = prog.facultyName.toLowerCase().includes(query);
        const matchesDept = prog.department.toLowerCase().includes(query);
        const matchesTags = prog.tags.some((t) => t.toLowerCase().includes(query));
        const matchesOverview = prog.overview.toLowerCase().includes(query);
        if (!matchesTitle && !matchesFaculty && !matchesDept && !matchesTags && !matchesOverview) {
          return false;
        }
      }
      return true;
    });
  }, [selectedLevel, selectedFacultyFilter, selectedShift, searchQuery]);

  const activeFacultyName = selectedFacultyFilter
    ? FACULTIES.find((f) => f.id === selectedFacultyFilter)?.name
    : null;

  return (
    <section id="programs" className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Faculties & Degree Finder</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Explore 150+ Future-Ready Academic Programs
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            From world-renowned agricultural sciences and clinical veterinary medicine to computer science,
            biotechnology, and food technology.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 mb-8 space-y-4">
          {/* Top Row: Search Input & Shift */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by degree title, department, or keyword (e.g. Agriculture, DVM, CS, Data Science)..."
                className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <span className="text-xs font-semibold text-stone-500">Shift:</span>
              <div className="flex bg-stone-100 rounded-lg p-1 border border-stone-200 text-xs font-medium">
                {(['All', 'Morning', 'Evening'] as const).map((shift) => (
                  <button
                    key={shift}
                    onClick={() => setSelectedShift(shift)}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      selectedShift === shift
                        ? 'bg-emerald-800 text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {shift}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Degree Level Tabs & Active Faculty Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
            <div className="flex flex-wrap gap-1.5">
              {DEGREE_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedLevel === level
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {selectedFacultyFilter && (
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 px-3 py-1 rounded-lg text-xs border border-amber-200 font-medium">
                <span>Faculty: <strong>{activeFacultyName}</strong></span>
                <button
                  onClick={onClearFacultyFilter}
                  className="hover:text-red-700 font-bold ml-1 text-stone-500 cursor-pointer"
                  title="Clear faculty filter"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500 px-1">
          <span>Showing <strong>{filteredPrograms.length}</strong> academic programs</span>
          <button
            onClick={() => onOpenCalculator()}
            className="text-emerald-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Open Aggregate Merit & Fee Calculator</span>
          </button>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">No programs match your search</h3>
            <p className="text-stone-500 text-xs max-w-md mx-auto">
              Try adjusting your search keywords or switching to 'All' degree levels to explore more options.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('All');
                setSelectedShift('All');
                onClearFacultyFilter();
              }}
              className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-700/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Card Header: Level & Shift Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {prog.degreeLevel}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      <span>Shift: {prog.shift}</span>
                    </div>
                  </div>

                  {/* Title & Department */}
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-1">
                      {prog.facultyName}
                    </p>
                  </div>

                  {/* Program Overview */}
                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                    {prog.overview}
                  </p>

                  {/* Meta Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{prog.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>PKR {prog.semesterFeePKR.toLocaleString()} / sem</span>
                    </div>
                  </div>

                  {/* Eligibility Snippet */}
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-[11px] text-stone-600 space-y-1">
                    <span className="font-semibold text-stone-800 block">Eligibility Criteria:</span>
                    <p className="line-clamp-2">{prog.eligibility}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {prog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalProgram(prog)}
                    className="text-xs font-bold text-stone-700 hover:text-emerald-800 py-1.5 px-3 rounded-lg hover:bg-stone-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-stone-500" />
                    <span>Details & Careers</span>
                  </button>

                  <button
                    onClick={() => onOpenCalculator(prog.id)}
                    className="py-2 px-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <span>Check Merit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Program Details Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-2">
                  {activeModalProgram.degreeLevel} • {activeModalProgram.facultyName}
                </span>
                <h3 className="font-serif-heading text-2xl font-bold text-stone-900">
                  {activeModalProgram.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Department: {activeModalProgram.department}
                </p>
              </div>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-center">
              <div>
                <span className="text-[11px] text-stone-500 block">Duration</span>
                <span className="text-xs font-bold text-stone-800">{activeModalProgram.duration}</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">Credit Hours</span>
                <span className="text-xs font-bold text-stone-800">{activeModalProgram.creditHours} CH</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">Est. Semester Fee</span>
                <span className="text-xs font-bold text-emerald-800">PKR {activeModalProgram.semesterFeePKR.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">Available Seats</span>
                <span className="text-xs font-bold text-stone-800">{activeModalProgram.seats} Seats</span>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Program Overview & Scope
              </h4>
              <p className="text-stone-700 text-sm leading-relaxed">
                {activeModalProgram.overview}
              </p>
            </div>

            {/* Eligibility */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Eligibility & Admission Requirements
              </h4>
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
                {activeModalProgram.eligibility}
              </div>
            </div>

            {/* Career Prospects */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Career Pathways & Industry Placement
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeModalProgram.careerProspects.map((career, i) => (
                  <div key={i} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  const progId = activeModalProgram.id;
                  setActiveModalProgram(null);
                  onOpenCalculator(progId);
                }}
                className="flex-1 py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Calculate My Merit for this Degree</span>
              </button>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="py-3 px-5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
