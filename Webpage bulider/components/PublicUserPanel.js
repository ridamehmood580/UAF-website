'use client';

import React, { useState } from 'react';
import PrimitiveRenderer from './PrimitiveRenderer';
import { ArrowLeft, Upload, CheckCircle, Globe, Layers } from 'lucide-react';

export default function PublicUserPanel({ pageData, setPageData, onSwitchToAdmin }) {
  const [toastMessage, setToastMessage] = useState(null);
  const allowPageScroll = pageData.meta?.allowPageScroll !== false;
  const pageContentHeight = Math.max(900, ...(pageData.elements || []).map(el => (el.y || 0) + (el.height || 100) + 48));

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoadJsonFromFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && Array.isArray(parsed.elements)) {
          setPageData(parsed);
          showToast(`Successfully rendered "${file.name}" into UI design!`);
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

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col font-sans">
      {/* Top Banner Toolbar for Public User Panel */}
      <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onSwitchToAdmin}
            className="px-3.5 py-1.5 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-lg shadow transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to UAF Page Studio</span>
          </button>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-300 border-l border-slate-700 pl-3">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Public Website View</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">Live Converted UI</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <label className="cursor-pointer px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5">
            <Upload className="w-4 h-4" />
            <span>Open & Convert JSON to UI</span>
            <input type="file" accept=".json" onChange={handleLoadJsonFromFile} className="hidden" />
          </label>
        </div>
      </div>

      {/* Dynamic Converted Webpage UI Rendered from JSON */}
      <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto p-6" style={{ overflowY: allowPageScroll ? 'auto' : 'hidden' }}>
        {!pageData.elements || pageData.elements.length === 0 ? (
          <div className="max-w-md mx-auto my-20 p-12 bg-white rounded-2xl shadow-xl border border-slate-200 text-center space-y-4">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">No JSON Page Design Loaded</h3>
            <p className="text-xs text-slate-500">
              Open a saved JSON file or return to UAF Page Studio to design your page layout.
            </p>
            <button 
              onClick={onSwitchToAdmin}
              className="px-5 py-2.5 bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold rounded-xl shadow transition"
            >
              Go to UAF Page Studio
            </button>
          </div>
        ) : (
          <div className="relative bg-white shadow-sm" style={{ width: 1200, maxWidth: '100%', height: allowPageScroll ? pageContentHeight : 900, minHeight: 900, margin: '0 auto', overflow: allowPageScroll ? 'visible' : 'hidden' }}>
            {pageData.elements.map(el => (
              <div key={el.id} style={{ position: 'absolute', left: el.x || 0, top: el.y || 0, width: el.width || 260, minHeight: el.height || 80 }}>
                <PrimitiveRenderer el={el} isEditing={false} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center space-x-2 z-50 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
