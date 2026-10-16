'use client';

import React, { useState, useEffect } from 'react';
import {
  getChangeRequests,
  approveProposal,
  rejectProposal,
  getPublishedDepartmentPages,
  type ChangeRequest,
  type AuthUser
} from './cmsStore';
import { PrimitiveRenderer } from './PrimitiveRenderer';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  ArrowLeft,
  Clock,
  Building2,
  FileCode,
  LayoutTemplate,
  MessageSquare,
  Sparkles,
  Smartphone,
  Monitor,
  Check,
  AlertTriangle
} from 'lucide-react';

interface AdminApprovalDashboardProps {
  currentUser: AuthUser;
  onOpenStudio: (initialData?: any) => void;
  onExitDashboard: () => void;
}

export const AdminApprovalDashboard: React.FC<AdminApprovalDashboardProps> = ({
  currentUser,
  onOpenStudio,
  onExitDashboard
}) => {
  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [publishedPages, setPublishedPages] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'published'>('pending');
  const [previewRequest, setPreviewRequest] = useState<ChangeRequest | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewTab, setPreviewTab] = useState<'visual' | 'json'>('visual');
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    setRequests(getChangeRequests());
    setPublishedPages(getPublishedDepartmentPages());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Actions
  const handleApprove = (requestId: string) => {
    const success = approveProposal(requestId, currentUser.email);
    if (success) {
      loadData();
      if (previewRequest?.id === requestId) {
        setPreviewRequest(null);
      }
      showToast('Changes accepted! The department page is now published live on the website.');
    }
  };

  const handleOpenRejectModal = (requestId: string) => {
    setRejectingRequestId(requestId);
    setRejectionReason('');
  };

  const handleConfirmReject = () => {
    if (!rejectingRequestId) return;
    if (!rejectionReason.trim()) {
      alert('Please enter a feedback reason so the department user knows what to fix.');
      return;
    }
    const success = rejectProposal(rejectingRequestId, rejectionReason.trim(), currentUser.email);
    if (success) {
      loadData();
      if (previewRequest?.id === rejectingRequestId) {
        setPreviewRequest(null);
      }
      setRejectingRequestId(null);
      setRejectionReason('');
      showToast('Proposal rejected. The department editor has been notified with your feedback.');
    }
  };

  const handleUploadCustomJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && Array.isArray(parsed.elements)) {
          // Open preview modal for this custom uploaded file
          const customRequest: ChangeRequest = {
            id: `upload-${Date.now()}`,
            departmentId: 'custom-upload',
            departmentName: parsed.meta?.title || 'Uploaded JSON Design',
            title: `Custom Upload: ${file.name}`,
            submittedBy: currentUser.email,
            submittedByName: 'Direct File Upload',
            submittedAt: new Date().toISOString(),
            status: 'pending',
            pageData: parsed
          };
          setPreviewRequest(customRequest);
          showToast(`Loaded ${file.name} for inspection.`);
        } else {
          alert('Invalid design JSON. Expected an object with an "elements" array.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadJson = (req: ChangeRequest) => {
    const name = `${req.departmentId}-${(req.title || 'page').replace(/[\\/:*?"<>|]+/g, '-')}.json`;
    const blob = new Blob([JSON.stringify(req.pageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Downloaded JSON proposal file.');
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const approvedRequests = requests.filter((r) => r.status === 'approved');
  const rejectedRequests = requests.filter((r) => r.status === 'rejected');

  const displayedRequests =
    activeTab === 'pending'
      ? pendingRequests
      : activeTab === 'all'
      ? requests
      : requests.filter((r) => r.status === 'approved');

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-[#18212b] font-sans select-none flex flex-col">
      {/* 1. TOP HEADER BAR */}
      <header className="bg-[#071b2d] text-white border-b-2 border-[#e8a62a]/70 px-4 sm:px-8 py-3.5 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExitDashboard}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <img
              src="/uaf_logo.png"
              alt="UAF"
              className="w-9 h-9 rounded-full bg-white p-0.5 border border-[#e8a62a]"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight">
                  UAF Central Admin Review & Approval Portal
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-stone-300">
                Logged in as: <strong>{currentUser.email}</strong> ({currentUser.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-[#e8a62a]" />
              <span>Inspect JSON File</span>
              <input type="file" accept=".json" onChange={handleUploadCustomJson} className="hidden" />
            </label>

            <button
              type="button"
              onClick={() => onOpenStudio()}
              className="px-4 py-2 bg-[#163887] hover:bg-[#102a6b] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Launch Page Studio</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN BODY */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-6">
        
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Pending Approval
              </span>
              <div className="text-3xl font-black text-[#071b2d] mt-1">
                {pendingRequests.length}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Department JSON files awaiting preview & approval
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-black uppercase tracking-wider">
                Approved & Live
              </span>
              <div className="text-3xl font-black text-[#071b2d] mt-1">
                {approvedRequests.length}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Active department templates deployed to website
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-black flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Revisions / Rejected
              </span>
              <div className="text-3xl font-black text-[#071b2d] mt-1">
                {rejectedRequests.length}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Returned to department with feedback notes
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* TABS & ACTIONS */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'pending'
                    ? 'bg-[#071b2d] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>Pending Reviews</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === 'pending' ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-700'
                }`}>
                  {pendingRequests.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-[#071b2d] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>All Proposals</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {requests.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('published')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'published'
                    ? 'bg-[#163887] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>Live Published Pages</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === 'published' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {approvedRequests.length}
                </span>
              </button>
            </div>

            <div className="text-xs text-stone-500 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>All changes require approval by ridaparveen116@gmail.com</span>
            </div>
          </div>

          {/* REQUESTS LIST */}
          {displayedRequests.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-black mx-auto" />
              <h3 className="text-base font-bold text-stone-800">
                {activeTab === 'pending' ? 'No Pending Proposals!' : 'No Proposals Found'}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                All department submissions have been reviewed and processed.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {displayedRequests.map((req) => (
                <div
                  key={req.id}
                  className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-stone-50/70 p-3 rounded-xl transition"
                >
                  {/* Left: Info */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-xs text-black bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        {req.departmentName}
                      </span>

                      {req.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/70 border border-amber-300 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Pending Review
                        </span>
                      )}

                      {req.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black bg-blue-100/70 border border-blue-300 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3 text-black" />
                          Published Live
                        </span>
                      )}

                      {req.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100/70 border border-rose-300 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Changes Requested
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-[#071b2d]">
                      {req.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                      <span>
                        Submitted by: <strong>{req.submittedByName}</strong> ({req.submittedBy})
                      </span>
                      <span>•</span>
                      <span>
                        Date: {new Date(req.submittedAt).toLocaleDateString()} at{' '}
                        {new Date(req.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>•</span>
                      <span>{req.pageData.elements?.length || 0} UI elements in JSON</span>
                    </div>

                    {req.feedback && (
                      <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 mt-2 space-y-0.5">
                        <strong className="flex items-center gap-1 text-rose-700">
                          <MessageSquare className="w-3.5 h-3.5" /> Rejection Feedback:
                        </strong>
                        <p>{req.feedback}</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPreviewRequest(req)}
                      className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-[#071b2d] font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-black" />
                      <span>Preview in Real UI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadJson(req)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl transition cursor-pointer"
                      title="Download JSON File"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {req.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleApprove(req.id)}
                          className="px-4 py-2 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept & Apply</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenRejectModal(req.id)}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}

                    {req.status === 'approved' && (
                      <button
                        type="button"
                        onClick={() => onOpenStudio(req.pageData)}
                        className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        Edit in Studio
                      </button>
                    )}

                    {req.status === 'rejected' && (
                      <button
                        type="button"
                        onClick={() => onOpenStudio(req.pageData)}
                        className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
                      >
                        <FileCode className="w-3.5 h-3.5 text-amber-700" />
                        <span>Revise in Studio</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </main>

      {/* ========================================================
          3. LIVE VISUAL PREVIEW MODAL (CONVERTS JSON TO REAL UI)
      ========================================================= */}
      {previewRequest && (
        <div className="fixed inset-0 z-50 bg-[#071b2d]/70 backdrop-blur-xs flex flex-col">
          
          {/* Preview Modal Header */}
          <div className="bg-[#071b2d] text-white px-6 py-3.5 flex flex-wrap items-center justify-between border-b-2 border-[#e8a62a] shadow-lg shrink-0">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPreviewRequest(null)}
                className="px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Close Preview</span>
              </button>

              <div className="hidden sm:block border-l border-white/20 pl-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Previewing: {previewRequest.title}</span>
                  <span className="text-[10px] font-bold text-[#e8a62a] bg-white/10 px-2 py-0.5 rounded-full">
                    {previewRequest.departmentName}
                  </span>
                </h3>
                <p className="text-[11px] text-stone-300">
                  Real-time converted UI from submitted JSON • Submitter: {previewRequest.submittedBy}
                </p>
              </div>
            </div>

            {/* View Mode & Actions */}
            <div className="flex items-center space-x-3">
              {/* Tab Selector: Visual vs JSON */}
              <div className="flex items-center bg-white/10 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewTab('visual')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    previewTab === 'visual' ? 'bg-[#163887] text-white shadow-xs' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Visual UI
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('json')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    previewTab === 'json' ? 'bg-[#163887] text-white shadow-xs' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Inspect JSON</span>
                </button>
              </div>

              {previewTab === 'visual' && (
                <div className="flex items-center bg-white/10 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('desktop')}
                    className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      previewMode === 'desktop' ? 'bg-[#163887] text-white' : 'text-stone-300 hover:text-white'
                    }`}
                    title="Desktop 1200px"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      previewMode === 'mobile' ? 'bg-[#163887] text-white' : 'text-stone-300 hover:text-white'
                    }`}
                    title="Mobile 375px"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              )}

              {previewRequest.status === 'pending' && (
                <>
                  <button
                    type="button"
                    onClick={() => handleApprove(previewRequest.id)}
                    className="px-4 py-2 bg-[#163887] hover:bg-[#102a6b] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept & Apply to Website</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenRejectModal(previewRequest.id)}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject with Feedback</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Preview Canvas or JSON Inspection */}
          <div className="flex-1 overflow-auto bg-stone-200 p-4 sm:p-8 flex justify-center">
            {previewTab === 'json' ? (
              <div className="bg-[#0b1b2b] text-blue-400 p-6 rounded-2xl max-w-4xl w-full font-mono text-xs shadow-2xl overflow-auto border border-stone-700 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <span className="text-stone-400 text-xs">
                    Submitted JSON Representation ({previewRequest.pageData.elements?.length || 0} Elements)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(previewRequest.pageData, null, 2));
                      showToast('Copied JSON data to clipboard!');
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                  >
                    Copy JSON
                  </button>
                </div>
                <pre className="text-stone-200 whitespace-pre leading-relaxed select-text">
                  {JSON.stringify(previewRequest.pageData, null, 2)}
                </pre>
              </div>
            ) : (
              <div
                className="bg-white shadow-2xl rounded-xl overflow-hidden relative transition-all"
                style={{
                  width: previewMode === 'desktop' ? 1200 : 375,
                  minHeight: 900,
                  height: 'fit-content'
                }}
              >
                {previewRequest.pageData.elements.map((el: any) => (
                  <div
                    key={el.id}
                    style={
                      previewMode === 'desktop'
                        ? {
                            position: 'absolute',
                            left: el.x || 0,
                            top: el.y || 0,
                            width: el.width || 260,
                            minHeight: el.height || 80
                          }
                        : {
                            position: 'relative',
                            margin: 12,
                            width: 'calc(100% - 24px)'
                          }
                    }
                  >
                    <PrimitiveRenderer el={el} isEditing={false} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================
          4. REJECT FEEDBACK MODAL
      ========================================================= */}
      {rejectingRequestId && (
        <div className="fixed inset-0 z-60 bg-[#071b2d]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-stone-900">
                Reject Proposal & Request Changes
              </h3>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Please enter feedback explaining why this proposal was rejected. The department editor will be notified so they can make the necessary changes and resubmit.
            </p>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Reason / Feedback Note:
              </label>
              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Please update the faculty list and ensure the HEC project number is mentioned..."
                className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectingRequestId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-xs cursor-pointer"
              >
                Confirm Rejection & Notify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#071b2d] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center space-x-2 border border-blue-500/50">
          <CheckCircle className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
