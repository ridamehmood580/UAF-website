'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, LayoutTemplate, FilePlus, Search, GraduationCap } from 'lucide-react';
import { PrimitiveRenderer } from './PrimitiveRenderer';
import { PAGE_TEMPLATES, buildTemplate } from './pageTemplates';

interface ThumbProps {
  id: string;
}

const Thumb: React.FC<ThumbProps> = ({ id }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.24);
  const elements = useMemo(() => buildTemplate(id)?.elements || [], [id]);
  const pageHeight = Math.max(900, ...elements.map((el: any) => (el.y || 0) + (el.height || 0)));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const fit = () => setScale(host.clientWidth / 1200);
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-[170px] overflow-hidden bg-white border-b border-stone-200 pointer-events-none" ref={hostRef} aria-hidden="true">
      <div
        className="absolute left-0 top-0 origin-top-left bg-white"
        style={{ width: 1200, height: pageHeight, transform: `scale(${scale})` }}
      >
        {elements.map((el: any) => (
          <div
            key={el.id}
            style={{
              position: 'absolute',
              left: el.x || 0,
              top: el.y || 0,
              width: el.width || 260,
              minHeight: el.height || 80
            }}
          >
            <PrimitiveRenderer el={el} isEditing={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface TemplatePickerProps {
  hasContent: boolean;
  onPick: (id: string) => void;
  onBlank: () => void;
  onClose: () => void;
}

export const TemplatePicker: React.FC<TemplatePickerProps> = ({
  hasContent,
  onPick,
  onBlank,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const templatesList = Array.isArray(PAGE_TEMPLATES) ? PAGE_TEMPLATES : [];

  const categories = useMemo(() => {
    const set = new Set<string>();
    templatesList.forEach((t) => set.add(t.category));
    return ['all', ...Array.from(set)];
  }, [templatesList]);

  const filteredTemplates = useMemo(() => {
    return templatesList.filter((t) => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        t.name?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory, templatesList]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#071b2d]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <section
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Department & Academic Page Templates"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-stone-200 bg-[#071b2d] text-white shrink-0">
          <div>
            <strong className="flex items-center gap-2 text-base sm:text-lg font-bold text-white">
              <GraduationCap className="w-5 h-5 text-[#e8a62a]" />
              Official UAF Academic & Faculty Page Templates
            </strong>
            <span className="text-xs text-stone-300">
              {hasContent
                ? 'Select a standardized academic page layout. (Your current draft will be replaced)'
                : 'Select an authentic university layout to customize, edit in JSON, and publish.'}
            </span>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            onClick={onClose}
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="px-6 py-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#163887] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                {cat === 'all' ? 'All Templates' : cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search faculty, programs, journals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163887]"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-stone-50 flex-1">
          {filteredTemplates.map((t) => (
            <button
              type="button"
              className="flex flex-col text-left bg-white border border-stone-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#163887] hover:shadow-lg transition-all group min-h-[270px] h-auto"
              key={t.id}
              onClick={() => onPick(t.id)}
              aria-label={`Use ${t.name || t.id} template`}
            >
              <span className="block flex-none px-4 pt-3 text-[15px] font-extrabold leading-snug text-[#102a43]">
                {t.name || t.id}
              </span>
              <Thumb id={t.id} />
              <div className="p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-black uppercase tracking-wider">
                  {t.category}
                </span>
                <p className="text-xs text-stone-500 leading-snug line-clamp-2">
                  {t.description}
                </p>
                <div className="pt-2 mt-auto flex items-center justify-between border-t border-stone-100">
                  <span className="text-[11px] font-semibold text-[#b8860b] group-hover:underline">
                    Load & Customize Template →
                  </span>
                </div>
              </div>
            </button>
          ))}

          <button
            type="button"
            className="flex flex-col items-center justify-center text-center p-6 bg-white border-2 border-dashed border-stone-300 rounded-xl hover:border-[#163887] hover:bg-blue-50/20 transition-all cursor-pointer min-h-[240px] group"
            onClick={onBlank}
          >
            <div className="w-14 h-14 rounded-full bg-stone-100 group-hover:bg-blue-100 text-black flex items-center justify-center mb-3 transition-colors">
              <FilePlus className="w-7 h-7" />
            </div>
            <b className="text-sm font-bold text-[#071b2d]">Blank Custom Canvas</b>
            <p className="text-xs text-stone-500 mt-1 max-w-[200px]">
              Start with a completely blank workspace with pre-placed UAF header and footer.
            </p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default TemplatePicker;
