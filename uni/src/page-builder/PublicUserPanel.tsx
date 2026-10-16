'use client';

import React, { useState } from 'react';
import { PrimitiveRenderer } from './PrimitiveRenderer';
import { ArrowLeft, Upload, CheckCircle, Globe, Layers, Download } from 'lucide-react';

interface PublicUserPanelProps {
  pageData: {
    meta?: {
      title?: string;
      author?: string;
      allowPageScroll?: boolean;
    };
    elements: any[];
  };
  setPageData: (data: any) => void;
  onSwitchToAdmin: () => void;
  departmentName?: string;
}

export const PublicUserPanel: React.FC<PublicUserPanelProps> = ({
  pageData,
  setPageData,
  onSwitchToAdmin,
  departmentName
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const allowPageScroll = pageData.meta?.allowPageScroll !== false;
  const pageContentHeight = Math.max(
    900,
    ...(pageData.elements || []).map((el: any) => (el.y || 0) + (el.height || 100) + 48)
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoadJsonFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && Array.isArray(parsed.elements)) {
          setPageData(parsed);
          showToast(`Successfully converted "${file.name}" into live page!`);
        } else {
          alert('Invalid design JSON file. Expected object with elements array.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportJson = () => {
    const name = `${(pageData.meta?.title || 'uaf-department-page').replace(/[\\/:*?"<>|]+/g, '-').trim()}.json`;
    const blob = new Blob([JSON.stringify(pageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Downloaded JSON file.');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans select-none">
      {/* Top Banner Toolbar */}
      <div className="bg-[#071b2d] text-white px-6 py-3 flex flex-wrap items-center justify-between border-b-2 border-[#e8a62a]/70 shadow-md sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onSwitchToAdmin}
            className="px-3.5 py-1.5 text-xs font-bold bg-[#163887] hover:bg-[#102a6b] text-white rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio</span>
          </button>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-stone-300 border-l border-white/20 pl-3">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="font-semibold">
              {departmentName ? `${departmentName} • Live View` : 'UAF Department Web View'}
            </span>
            <span className="bg-blue-900/60 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
              Converted Live UI
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleExportJson}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>

          <label className="cursor-pointer px-4 py-1.5 bg-[#e8a62a] hover:bg-amber-400 text-[#071b2d] text-xs font-bold rounded-lg shadow-xs transition flex items-center gap-1.5">
            <Upload className="w-4 h-4" />
            <span>Upload & Convert JSON to UI</span>
            <input type="file" accept=".json" onChange={handleLoadJsonFromFile} className="hidden" />
          </label>
        </div>
      </div>

      {/* Dynamic Converted Webpage UI Rendered from JSON */}
      <div className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6" style={{ overflowY: allowPageScroll ? 'auto' : 'hidden' }}>
        {!pageData.elements || pageData.elements.length === 0 ? (
          <div className="max-w-md mx-auto my-20 p-10 bg-white rounded-2xl shadow-md border border-stone-200 text-center space-y-4">
            <Layers className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-xl font-bold text-stone-800">No JSON Page Design Loaded</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Open a saved JSON file or return to UAF Page Studio to load an official department template.
            </p>
            <button
              type="button"
              onClick={onSwitchToAdmin}
              className="px-5 py-2.5 bg-[#163887] hover:bg-[#102a6b] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              Open UAF Page Studio
            </button>
          </div>
        ) : (
          <div
            className="relative bg-white shadow-md border border-stone-200/90 rounded-b-xl"
            style={{
              width: 1200,
              maxWidth: '100%',
              height: allowPageScroll ? pageContentHeight : 900,
              minHeight: 900,
              margin: '0 auto',
              overflow: allowPageScroll ? 'visible' : 'hidden'
            }}
          >
            {pageData.elements.map((el: any) => (
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
        )}
      </div>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#071b2d] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center space-x-2 z-50 border border-blue-500/50">
          <CheckCircle className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
