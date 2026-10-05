'use client';

import React from 'react';
import { 
  GraduationCap, 
  Quote, 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  Calendar, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Tractor,
  Microscope,
  Send
} from 'lucide-react';

export default function BlockRenderer({ block, isEditing = false, onSelect = null, isSelected = false }) {
  if (!block) return null;

  let themeClasses = '';
  switch(block.themeColor) {
    case 'green':
      themeClasses = 'bg-agri-900 text-white';
      break;
    case 'light':
      themeClasses = 'bg-slate-100 text-slate-800';
      break;
    case 'dark':
      themeClasses = 'bg-slate-900 text-slate-100';
      break;
    default:
      themeClasses = 'bg-white text-slate-800 border-b border-slate-100';
  }

  const renderContent = () => {
    switch (block.type) {
      case 'navbar':
        return (
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-agri-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                🌾
              </div>
              <div>
                <h1 className="font-extrabold text-lg tracking-wide leading-tight">{block.title}</h1>
                <p className="text-xs opacity-75">{block.subTitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
              <span className="hover:text-agri-500 cursor-pointer transition">{block.link1}</span>
              <span className="hover:text-agri-500 cursor-pointer transition">{block.link2}</span>
              <span className="hover:text-agri-500 cursor-pointer transition">{block.link3}</span>
              <span className="hover:text-agri-500 cursor-pointer transition">{block.link4}</span>
              <span className="hover:text-agri-500 cursor-pointer transition">{block.link5}</span>
            </div>
            <button className="px-5 py-2 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-lg shadow transition">
              {block.buttonText}
            </button>
          </nav>
        );

      case 'hero':
        return (
          <div className="relative overflow-hidden py-20 px-6">
            {block.bgImage && (
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${block.bgImage})` }}
              />
            )}
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
              <span className="inline-block bg-agri-500/90 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                Official University Web Portal
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {block.title}
              </h1>
              <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
                {block.subtitle}
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button className="px-6 py-3 bg-agri-600 hover:bg-agri-500 text-white text-xs font-bold rounded-xl shadow-lg transition">
                  {block.primaryButtonText}
                </button>
                <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs font-bold rounded-xl backdrop-blur-sm transition">
                  {block.secondaryButtonText}
                </button>
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="max-w-6xl mx-auto py-16 px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">{block.sectionHeading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-12 h-12 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center text-xl font-bold">
                  <Tractor className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">{block.card1Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{block.card1Desc}</p>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-12 h-12 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center text-xl font-bold">
                  <Microscope className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">{block.card2Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{block.card2Desc}</p>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-12 h-12 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center text-xl font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">{block.card3Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{block.card3Desc}</p>
              </div>
            </div>
          </div>
        );

      case 'programs':
        return (
          <div className="max-w-6xl mx-auto py-16 px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">{block.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <span className="bg-agri-100 text-agri-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">{block.p1Tag}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{block.p1Title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{block.p1Desc}</p>
                </div>
                <button className="w-full py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl transition">View Curriculum</button>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">{block.p2Tag}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{block.p2Title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{block.p2Desc}</p>
                </div>
                <button className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition">View Curriculum</button>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">{block.p3Tag}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{block.p3Title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{block.p3Desc}</p>
                </div>
                <button className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition">View Curriculum</button>
              </div>
            </div>
          </div>
        );

      case 'vc_message':
        return (
          <div className="max-w-4xl mx-auto py-14 px-6">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white/10 p-6 rounded-2xl border border-white/20">
              {block.photoUrl && (
                <img 
                  src={block.photoUrl} 
                  alt={block.authorName} 
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-agri-400 shrink-0" 
                />
              )}
              <div className="space-y-2">
                <Quote className="w-8 h-8 text-agri-400 opacity-60" />
                <p className="text-base md:text-lg italic font-serif leading-relaxed">"{block.quoteText}"</p>
                <div>
                  <h4 className="font-bold text-sm">{block.authorName}</h4>
                  <p className="text-xs opacity-75">{block.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notices':
        return (
          <div className="max-w-4xl mx-auto py-14 px-6">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-agri-600" /> {block.title}</span>
              <span className="text-xs text-agri-700 cursor-pointer hover:underline">View All &rarr;</span>
            </h2>
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center space-x-4 shadow-sm">
                <div className="bg-agri-700 text-white font-bold text-xs p-2.5 rounded-lg text-center w-16 shrink-0">
                  {block.n1Date}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-800">{block.n1Title}</h4>
                </div>
                <button className="text-xs font-semibold text-agri-600 hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center space-x-4 shadow-sm">
                <div className="bg-agri-700 text-white font-bold text-xs p-2.5 rounded-lg text-center w-16 shrink-0">
                  {block.n2Date}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-800">{block.n2Title}</h4>
                </div>
                <button className="text-xs font-semibold text-agri-600 hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center space-x-4 shadow-sm">
                <div className="bg-agri-700 text-white font-bold text-xs p-2.5 rounded-lg text-center w-16 shrink-0">
                  {block.n3Date}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-800">{block.n3Title}</h4>
                </div>
                <button className="text-xs font-semibold text-agri-600 hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="max-w-6xl mx-auto py-16 px-6">
            <h2 className="text-2xl font-bold text-center mb-8">{block.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-md bg-slate-100">
                <img src={block.img1} alt="Gallery" className="w-full h-48 object-cover" />
                <div className="p-3 bg-white border-t border-slate-200 font-bold text-xs text-slate-800">{block.cap1}</div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md bg-slate-100">
                <img src={block.img2} alt="Gallery" className="w-full h-48 object-cover" />
                <div className="p-3 bg-white border-t border-slate-200 font-bold text-xs text-slate-800">{block.cap2}</div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md bg-slate-100">
                <img src={block.img3} alt="Gallery" className="w-full h-48 object-cover" />
                <div className="p-3 bg-white border-t border-slate-200 font-bold text-xs text-slate-800">{block.cap3}</div>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="max-w-6xl mx-auto py-16 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-agri-400">{block.num1}</div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{block.label1}</div>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-agri-400">{block.num2}</div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{block.label2}</div>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-agri-400">{block.num3}</div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{block.label3}</div>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-agri-400">{block.num4}</div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{block.label4}</div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-2xl mx-auto py-16 px-6">
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-slate-800 text-center">{block.title}</h2>
              <p className="text-xs text-slate-500 text-center">{block.subtitle}</p>
              <div className="space-y-3">
                <input type="text" placeholder="Your Name" className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg" readOnly />
                <input type="email" placeholder="Your Email Address" className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg" readOnly />
                <textarea rows="3" placeholder="Message details..." className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg" readOnly />
                <button className="w-full py-3 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <footer className="max-w-7xl mx-auto py-12 px-6 text-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-extrabold text-sm text-agri-400">{block.universityName}</h3>
                <p className="opacity-75"><MapPin className="w-3.5 h-3.5 inline mr-1" /> {block.address}</p>
              </div>
              <div className="space-y-1 opacity-80">
                <p><Phone className="w-3.5 h-3.5 inline mr-1" /> {block.phone}</p>
                <p><Mail className="w-3.5 h-3.5 inline mr-1" /> {block.email}</p>
              </div>
              <div className="text-right">
                <span className="bg-agri-800 text-agri-200 text-[10px] font-bold px-3 py-1 rounded-full border border-agri-600">
                  HEC Recognized W4 Grade
                </span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 text-center opacity-60">
              {block.copyright}
            </div>
          </footer>
        );

      default:
        return <div className="p-4 text-center text-xs">Component Block</div>;
    }
  };

  return (
    <div 
      onClick={isEditing && onSelect ? () => onSelect(block.id) : undefined}
      className={`transition-all ${themeClasses} ${
        isEditing ? 'cursor-pointer hover:ring-2 hover:ring-agri-500 relative' : ''
      } ${isEditing && isSelected ? 'ring-4 ring-agri-600 ring-offset-2 z-10 shadow-xl' : ''}`}
    >
      {renderContent()}
    </div>
  );
}
