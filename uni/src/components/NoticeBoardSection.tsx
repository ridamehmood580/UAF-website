import React, { useState, useMemo } from 'react';
import {
  Bell,
  Download,
  Search,
  AlertCircle,
  Calendar,
  CheckCircle2,
  X,
  Eye
} from 'lucide-react';
import { OFFICIAL_NOTICES } from '../data/uafData';
import { Notice, NoticeCategory } from '../types';

const NOTICE_CATEGORIES: NoticeCategory[] = [
  'All',
  'Admissions',
  'Examinations',
  'Scholarships',
  'Tenders',
  'General',
  'Jobs & Careers'
];

export const NoticeBoardSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewNotice, setPreviewNotice] = useState<Notice | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredNotices = useMemo(() => {
    return OFFICIAL_NOTICES.filter((n) => {
      if (selectedCategory !== 'All' && n.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = n.title.toLowerCase().includes(query);
        const matchesRef = n.referenceNumber.toLowerCase().includes(query);
        const matchesSummary = n.summary.toLowerCase().includes(query);
        const matchesAudience = n.targetAudience.toLowerCase().includes(query);
        if (!matchesTitle && !matchesRef && !matchesSummary && !matchesAudience) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleDownloadNotice = (notice: Notice) => {
    const content = `UNIVERSITY OF AGRICULTURE, FAISALABAD
OFFICIAL NOTIFICATION / CIRCULAR
------------------------------------------------------------
Reference No: ${notice.referenceNumber}
Date of Issuance: ${notice.date}
Category: ${notice.category}
Target Audience: ${notice.targetAudience}

Subject: ${notice.title}

SUMMARY & DETAILS:
${notice.summary}

------------------------------------------------------------
Issued by Authority:
Registrar / Controller of Examinations
University of Agriculture, Faisalabad (UAF)
Official Web Portal: https://web.uaf.edu.pk
Helpline: +92 41 9200161`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', notice.attachmentName.replace('.pdf', '.txt'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(notice.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="notices" className="py-16 sm:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Bell className="w-3.5 h-3.5 text-red-600" />
            <span>Official Notifications & Circulars</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            UAF Central Notice Board & Circulars
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Stay updated with verified circulars from the Registrar, Controller of Examinations,
            Directorate of Financial Aid, and Procurement Division.
          </p>
        </div>

        {/* Toolbar & Filter Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices by keyword, date, or reference number (e.g. Admissions, Date Sheet, PEEF)..."
                className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
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

            <div className="text-xs text-stone-500 shrink-0 font-medium">
              Showing <strong>{filteredNotices.length}</strong> official circulars
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
            {NOTICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-3.5">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                notice.isUrgent
                  ? 'border-amber-400/80 bg-gradient-to-r from-amber-50/40 via-white to-white'
                  : 'border-stone-200 hover:border-emerald-700/50'
              }`}
            >
              {/* Notice Metadata & Content */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                    {notice.category}
                  </span>

                  {notice.isUrgent && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 animate-pulse">
                      <AlertCircle className="w-3 h-3" />
                      URGENT NOTICE
                    </span>
                  )}

                  {notice.isNew && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      NEW
                    </span>
                  )}

                  <span className="text-[11px] text-stone-400 font-mono">
                    Ref: {notice.referenceNumber}
                  </span>
                </div>

                <h3
                  onClick={() => setPreviewNotice(notice)}
                  className="font-serif-heading text-base sm:text-lg font-bold text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors leading-snug"
                >
                  {notice.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {notice.summary}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>Issued: {notice.date}</span>
                  </span>
                  <span>•</span>
                  <span>Target: <strong>{notice.targetAudience}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                <button
                  onClick={() => setPreviewNotice(notice)}
                  className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownloadNotice(notice)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    downloadSuccess === notice.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#005a36] hover:bg-emerald-900 text-white'
                  }`}
                >
                  {downloadSuccess === notice.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Circular</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Quick Links Footer */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs space-y-1">
            <span className="font-bold text-stone-900 block">Controller of Examinations</span>
            <p className="text-stone-500">Date sheets, result gazettes, and degree verifications.</p>
            <a href="#notices" className="text-emerald-800 font-semibold hover:underline inline-block pt-1">
              View Exam Notifications →
            </a>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs space-y-1">
            <span className="font-bold text-stone-900 block">Registrar Secretariat</span>
            <p className="text-stone-500">Academic calendars, holiday circulars, and statutes.</p>
            <a href="#notices" className="text-emerald-800 font-semibold hover:underline inline-block pt-1">
              View Registrar Notices →
            </a>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs space-y-1">
            <span className="font-bold text-stone-900 block">Treasurer Office & Fee Portal</span>
            <p className="text-stone-500">Fee challan generators, installment rules, and refund forms.</p>
            <a href="#notices" className="text-emerald-800 font-semibold hover:underline inline-block pt-1">
              View Fee Instructions →
            </a>
          </div>
        </div>
      </div>

      {/* Notice Preview Modal */}
      {previewNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Official UAF Circular Preview
                </span>
                <h3 className="font-serif-heading text-lg font-bold text-stone-900 mt-1">
                  {previewNotice.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewNotice(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-stone-200 pb-2 text-stone-600">
                <span>Ref: {previewNotice.referenceNumber}</span>
                <span>Date: {previewNotice.date}</span>
              </div>
              <div className="text-stone-800 font-sans text-xs leading-relaxed">
                <strong>Subject:</strong> {previewNotice.title}
              </div>
              <div className="text-stone-700 font-sans text-xs leading-relaxed">
                <strong>Summary & Directives:</strong>
                <p className="mt-1 text-stone-600">{previewNotice.summary}</p>
              </div>
              <div className="text-stone-500 font-sans text-[11px] pt-2 border-t border-stone-200">
                Targeted Audience: {previewNotice.targetAudience}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => handleDownloadNotice(previewNotice)}
                className="flex-1 py-2.5 bg-[#005a36] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Copy ({previewNotice.fileSize})</span>
              </button>
              <button
                onClick={() => setPreviewNotice(null)}
                className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
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
