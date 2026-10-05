'use client';

import React, { useState } from 'react';
import { Download, FolderSave, X, CheckCircle, FileCode, HardDrive } from 'lucide-react';

export default function SaveModal({ isOpen, onClose, pageData, onSaveSuccess }) {
  const [fileName, setFileName] = useState('university-webpage');
  const [savePathHint, setSavePathHint] = useState('Downloads / PC Documents');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveJson = async () => {
    const cleanName = fileName.trim() ? fileName.trim() : 'university-webpage';
    const jsonString = JSON.stringify(pageData, null, 2);

    // Try modern File System Access API if available
    if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: `${cleanName}.json`,
          types: [{
            description: 'JSON Page Design File',
            accept: { 'application/json': ['.json'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(jsonString);
        await writable.close();
        setIsSaved(true);
        setTimeout(() => {
          setIsSaved(false);
          onClose();
          if (onSaveSuccess) onSaveSuccess(handle.name);
        }, 1500);
        return;
      } catch (err) {
        // Fallback to standard blob download if user cancels or browser blocks API
        if (err.name === 'AbortError') return;
      }
    }

    // Standard Download Fallback
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
      if (onSaveSuccess) onSaveSuccess(`${cleanName}.json`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden transform transition-all">
        {/* Modal Header */}
        <div className="bg-agri-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-agri-400" />
            <h3 className="font-bold text-base">Save Webpage Design File</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 bg-slate-50">
          {isSaved ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-slate-800">Design Saved Successfully!</h4>
              <p className="text-xs text-slate-500">
                Saved as <span className="font-bold text-slate-700">{fileName}.json</span> on your PC. You can now load this file in the User Panel anytime!
              </p>
            </div>
          ) : (
            <>
              <div className="bg-agri-50 border border-agri-200 text-agri-800 p-3 rounded-xl text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-agri-900">
                  <FileCode className="w-4 h-4 text-agri-600" /> Save as JSON Design File
                </p>
                <p className="text-agri-700">
                  Enter a file name below. When saved, the file can be opened in the User Panel to display the webpage UI.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Design File Name:
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="e.g. uaf-admissions-2026" 
                      className="flex-1 text-xs border border-slate-300 rounded-l-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-agri-500"
                    />
                    <span className="bg-slate-200 text-slate-600 text-xs px-3 py-2.5 rounded-r-lg font-mono font-semibold border border-l-0 border-slate-300">
                      .json
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Save Destination / Path:
                  </label>
                  <input 
                    type="text" 
                    value={savePathHint}
                    onChange={(e) => setSavePathHint(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-agri-500"
                    placeholder="Your PC Downloads or Documents folder"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Your browser will prompt you to choose the exact folder location on your PC.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isSaved && (
          <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-end space-x-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveJson} 
              className="px-5 py-2 text-xs font-semibold bg-agri-600 hover:bg-agri-700 text-white rounded-lg shadow transition flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Save File to PC (.json)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
