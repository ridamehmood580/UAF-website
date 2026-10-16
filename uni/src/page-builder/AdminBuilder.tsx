'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PRIMITIVE_PALETTE, createPrimitiveElement, type PrimitiveElement } from './elementPrimitives';
import { PrimitiveRenderer } from './PrimitiveRenderer';
import { TemplatePicker } from './TemplatePicker';
import { buildTemplate } from './pageTemplates';
import { STYLE_LOCK, LOOKS_BY_TYPE, LOOK_LABEL, themeElement } from './uafTheme';
import { submitDepartmentProposal, getChangeRequests, type AuthUser, type ChangeRequest } from './cmsStore';
import {
  Eye,
  FolderOpen,
  Save,
  Type,
  Image as ImageIcon,
  Shapes,
  MousePointer2,
  Undo2,
  Redo2,
  Trash2,
  Copy,
  Download,
  Upload,
  X,
  Plus,
  Check,
  Smartphone,
  Monitor,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LayoutTemplate,
  Lock,
  Send,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

const STORAGE_KEY = 'uaf-faculty-page-builder-drafts-v2';
const freshPage = () => ({
  draftId: `draft-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  meta: { title: 'Untitled Department Page', author: 'Faculty Editor', allowPageScroll: true },
  elements: [] as PrimitiveElement[]
});
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

interface AdminBuilderProps {
  pageData: {
    draftId?: string;
    meta?: {
      title?: string;
      author?: string;
      allowPageScroll?: boolean;
      template?: string;
    };
    elements: PrimitiveElement[];
  };
  setPageData: React.Dispatch<React.SetStateAction<any>>;
  onSwitchToPublic: () => void;
  onExitStudio: () => void;
  currentUser: AuthUser;
}

export const AdminBuilder: React.FC<AdminBuilderProps> = ({
  pageData,
  setPageData,
  onSwitchToPublic,
  onExitStudio,
  currentUser
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftsOpen, setDraftsOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [saved, setSaved] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [mobile, setMobile] = useState(false);
  const [toast, setToast] = useState('');
  const [shapePickerOpen, setShapePickerOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('');
  const [activeCardText, setActiveCardText] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [future, setFuture] = useState<any[]>([]);
  const [departmentNotification, setDepartmentNotification] = useState<ChangeRequest | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<any>(null);
  const manualZoomRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);
  const pendingUploadRef = useRef<any>(null);
  const pendingVideoRef = useRef<any>(null);
  const designFileRef = useRef<HTMLInputElement>(null);
  const dragging = useRef<any>(null);
  const updateElementRef = useRef<any>(null);
  const dirtyRef = useRef(false);

  const elements = pageData.elements || [];
  const autoPageHeight = Math.max(900, ...elements.map((el) => (el.y || 0) + (el.height || 100) + 48));
  const selected = elements.find((item) => item.id === selectedId);

  // Check if department user has a notification (approved or rejected with feedback)
  useEffect(() => {
    if (currentUser.role === 'department_editor') {
      const all = getChangeRequests();
      const userLast = all.find((r) => r.submittedBy === currentUser.email);
      if (userLast && userLast.status === 'rejected') {
        setDepartmentNotification(userLast);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      setDrafts(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    } catch {
      setDrafts([]);
    }
  }, []);

  const saveDraftSnapshot = (snapshot = pageData) => {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const id = snapshot.draftId || `draft-${Date.now()}`;
      const draft = {
        id,
        title: snapshot.meta?.title || 'Untitled Department Page',
        updatedAt: new Date().toISOString(),
        data: snapshot
      };
      const next = [draft, ...list.filter((item: any) => item.id !== id)].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setDrafts(next);
      setSaved(true);
      dirtyRef.current = false;
      return true;
    } catch {
      setToast('Could not save draft. Local storage may be full.');
      return false;
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const rememberSelection = () => {
      const selection = window.getSelection();
      if (!selection?.rangeCount || selection.isCollapsed || !selection.toString().trim()) return;
      const node = selection.anchorNode?.parentElement?.closest?.('[data-rich-editor]');
      const range = selection.getRangeAt(0);
      if (node && node.contains(range.commonAncestorContainer)) {
        savedRangeRef.current = { range: range.cloneRange(), node };
      }
    };
    document.addEventListener('selectionchange', rememberSelection);
    return () => document.removeEventListener('selectionchange', rememberSelection);
  }, []);

  // Responsive zoom
  useEffect(() => {
    const host = canvasScrollRef.current;
    if (!host || manualZoomRef.current) return;
    const fit = () => {
      if (manualZoomRef.current) return;
      const available = host.clientWidth - (mobile ? 28 : 96);
      setZoom(clamp(Math.floor((available / (mobile ? 375 : 1200)) * 100), 25, 100));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    return () => observer.disconnect();
  }, [mobile]);

  const commit = (next: any) => {
    setHistory((prev) => [...prev.slice(-29), pageData]);
    setFuture([]);
    setPageData(next);
    setSaved(false);
    dirtyRef.current = true;
  };

  const updateElement = (id: string, changes: any) => {
    if (elements.find((el) => el.id === id)?.fixed) return;
    commit({
      ...pageData,
      elements: elements.map((el) => (el.id === id ? { ...el, ...changes } : el))
    });
  };
  updateElementRef.current = updateElement;

  const onPrimitiveChange = useCallback((id: string, key: string | Record<string, any>, value?: any) => {
    updateElementRef.current(id, typeof key === 'object' ? key : { [key]: value });
  }, []);

  const updateStyle = (key: string, value: any) =>
    selected && updateElement(selected.id, { style: { ...selected.style, [key]: value } });

  const add = (type: string, at?: { x: number; y: number }) => {
    const el = createPrimitiveElement(type === 'paragraph' ? 'text' : type);
    if (type === 'paragraph') {
      el.tag = 'p';
      el.fontSize = 16;
      el.fontWeight = 'normal';
    }
    el.x = at?.x ?? 72 + (elements.length % 4) * 28;
    el.y = at?.y ?? 72 + (elements.length % 5) * 30;
    el.width =
      type === 'text' || type === 'paragraph'
        ? 380
        : type === 'image' || type === 'video'
        ? 360
        : type === 'container' || type === 'card'
        ? 340
        : type === 'faculty-card' || type === 'staff-card'
        ? 244
        : type === 'button'
        ? 180
        : 250;
    el.height =
      type === 'text' || type === 'paragraph'
        ? 84
        : type === 'image'
        ? 220
        : type === 'video'
        ? 220
        : type === 'container'
        ? 180
        : type === 'card'
        ? 260
        : type === 'faculty-card' || type === 'staff-card'
        ? 380
        : type === 'divider'
        ? 28
        : type === 'button'
        ? 44
        : 100;
    commit({ ...pageData, elements: [...elements, el] });
    setSelectedId(el.id);
    setToast(`${type[0].toUpperCase()}${type.slice(1)} added to canvas.`);
  };

  const changePosition = (id: string, x: number, y: number) => {
    dirtyRef.current = true;
    setPageData((prev: any) => ({
      ...prev,
      elements: prev.elements.map((el: any) => (el.id === id ? { ...el, x, y } : el))
    }));
  };

  const onPointerDown = (event: React.PointerEvent, el: PrimitiveElement, resizing = false, handle = 'se') => {
    if (event.button !== 0) return;
    if (el.fixed) return;
    if (mobile && !resizing) return;
    if (!resizing && (event.target as HTMLElement).closest('[data-inline-editor], input, textarea, select, button'))
      return;
    event.preventDefault();
    event.stopPropagation();
    setSelectedId(el.id);
    const rect = canvasRef.current?.getBoundingClientRect();
    dragging.current = {
      id: el.id,
      startX: event.clientX,
      startY: event.clientY,
      x: el.x || 0,
      y: el.y || 0,
      w: el.width || 260,
      h: el.height || 100,
      resizing,
      handle,
      scale: zoom / 100,
      rect
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const d = dragging.current;
    if (!d) return;
    const dx = (event.clientX - d.startX) / d.scale;
    const dy = (event.clientY - d.startY) / d.scale;
    if (d.resizing) {
      const west = d.handle.includes('w');
      const north = d.handle.includes('n');
      const width = clamp(d.w + (west ? -dx : dx), 40, 1100);
      const height = clamp(d.h + (north ? -dy : dy), 36, 1200);
      const x = west ? d.x + d.w - width : d.x;
      const y = north ? d.y + d.h - height : d.y;
      setPageData((prev: any) => ({
        ...prev,
        elements: prev.elements.map((el: any) => (el.id === d.id ? { ...el, x, y, width, height } : el))
      }));
    } else {
      changePosition(d.id, clamp(d.x + dx, 0, 1080), clamp(d.y + dy, 0, 3000));
    }
  };

  const finishPointer = () => {
    if (dragging.current) {
      dragging.current = null;
      setSaved(false);
      dirtyRef.current = true;
    }
  };

  const deleteSelected = () => {
    if (!selected || selected.fixed) return;
    commit({ ...pageData, elements: elements.filter((el) => el.id !== selectedId) });
    setSelectedId(null);
  };

  const duplicateSelected = () => {
    if (!selected || selected.fixed) return;
    const copy = {
      ...JSON.parse(JSON.stringify(selected)),
      id: `el-${Date.now()}`,
      x: (selected.x || 0) + 24,
      y: (selected.y || 0) + 24
    };
    commit({ ...pageData, elements: [...elements, copy] });
    setSelectedId(copy.id);
  };

  const undo = () => {
    if (!history.length) return;
    setFuture((v) => [pageData, ...v]);
    setPageData(history[history.length - 1]);
    setHistory((v) => v.slice(0, -1));
    dirtyRef.current = true;
    setSaved(false);
  };

  const redo = () => {
    if (!future.length) return;
    setHistory((v) => [...v, pageData]);
    setPageData(future[0]);
    setFuture((v) => v.slice(1));
    dirtyRef.current = true;
    setSaved(false);
  };

  const applyTemplate = (id: string) => {
    const tpl = buildTemplate(id);
    if (!tpl) return;
    const draftId = `draft-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    commit({
      ...pageData,
      draftId,
      meta: { ...pageData.meta, title: tpl.title, template: tpl.id },
      elements: tpl.elements
    });
    setSelectedId(null);
    setTemplatesOpen(false);
    setToast('Template loaded. Click any text or image to edit it.');
  };

  const newPage = () => {
    if (dirtyRef.current && window.confirm('Save current design to Drafts before starting a new page?')) {
      saveDraftSnapshot();
    }
    setPageData(freshPage());
    setSelectedId(null);
    dirtyRef.current = false;
    setSaved(true);
  };

  // Submit to Admin (Department Editor workflow)
  const handleSubmitToAdmin = () => {
    const title = proposalTitle.trim() || pageData.meta?.title || 'Department Page Update';
    submitDepartmentProposal(
      currentUser.departmentId || 'general-dept',
      currentUser.departmentName || 'Academic Department',
      title,
      currentUser.email,
      currentUser.name,
      pageData,
      pageData.meta?.template
    );
    setSubmitModalOpen(false);
    setToast('Proposal submitted to Admin (ridaparveen116@gmail.com) for review!');
  };

  // Save to computer JSON file
  const savePage = async () => {
    const name = `${(pageData.meta?.title || 'uaf-department-page').replace(/[\\/:*?"<>|]+/g, '-').trim()}.json`;
    const blob = new Blob([JSON.stringify(pageData, null, 2)], { type: 'application/json' });
    try {
      if ((window as any).showSaveFilePicker) {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: name,
          types: [{ description: 'UAF Page Design JSON', accept: { 'application/json': ['.json'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      dirtyRef.current = false;
      setSaved(true);
      setToast('Design saved to computer.');
    } catch (e: any) {
      if (e.name !== 'AbortError') setToast('Could not save design.');
    }
  };

  const importPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const value = JSON.parse(reader.result as string);
        if (!Array.isArray(value.elements)) throw new Error();
        setPageData(value);
        setSelectedId(null);
        dirtyRef.current = false;
        setSaved(true);
        setToast('Page design imported.');
      } catch {
        setToast('Invalid UAF page JSON file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const chooseImage = (target: any = null) => {
    pendingUploadRef.current = target;
    fileRef.current?.click();
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    const target = pendingUploadRef.current;
    reader.onload = () => {
      if (target?.type === 'card') {
        updateElement(target.id, { imageUrl: reader.result });
      } else if (target?.type === 'image') {
        updateElement(target.id, { src: reader.result, alt: file.name });
      } else {
        const el = createPrimitiveElement('image');
        el.src = reader.result as string;
        el.alt = file.name;
        el.x = 72;
        el.y = 72;
        el.width = 360;
        el.height = 220;
        commit({ ...pageData, elements: [...elements, el] });
        setSelectedId(el.id);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    pendingUploadRef.current = null;
  };

  const formatSelection = (command: string, value: any = null) => {
    const saved = savedRangeRef.current;
    if (!saved?.node?.isConnected) return;
    saved.node.focus();
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(saved.range);
      document.execCommand(command, false, value);
      savedRangeRef.current = { range: selection.getRangeAt(0).cloneRange(), node: saved.node };
    }
  };

  const zoomCanvas = (direction: number) => {
    manualZoomRef.current = true;
    setZoom((value) => clamp(value + direction * 10, 25, 160));
  };

  const palette = PRIMITIVE_PALETTE.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  return (
    <div className="h-screen min-h-[640px] flex flex-col bg-[#f4f7f9] text-[#18212b] font-sans select-none overflow-hidden">
      
      {/* 1. TOP BUILDER TOOLBAR */}
      <header className="h-16 flex items-center gap-3 px-4 sm:px-6 bg-[#071b2d] text-white border-b-2 border-[#e8a62a] shrink-0 z-30">
        <button
          type="button"
          onClick={onExitStudio}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          title="Exit Studio"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <img
          src="/uaf_logo.png"
          alt="UAF Logo"
          className="w-8 h-8 rounded-full bg-white p-0.5 border border-[#e8a62a]"
        />

        <div className="flex flex-col min-w-0 pr-2">
          <strong className="text-xs sm:text-sm font-extrabold text-white truncate">
            UAF Page Studio
          </strong>
          <span className="text-[10px] text-stone-300 truncate">
            {currentUser.role === 'super_admin' ? 'Super Admin Mode' : currentUser.departmentName}
          </span>
        </div>

        <div className="h-6 border-l border-white/20 mx-1 hidden sm:block" />

        <input
          className="text-xs sm:text-sm font-bold text-white bg-transparent border border-transparent hover:border-white/20 focus:border-[#e8a62a] rounded px-2 py-1 outline-none w-48 sm:w-64"
          value={pageData.meta?.title || ''}
          onChange={(e) => {
            setPageData({ ...pageData, meta: { ...pageData.meta, title: e.target.value } });
            setSaved(false);
            dirtyRef.current = true;
          }}
          placeholder="Page Title..."
        />

        <span className="hidden md:flex items-center gap-1.5 text-[11px] text-stone-300">
          <span className={`w-2 h-2 rounded-full ${saved ? 'bg-blue-400' : 'bg-amber-400 animate-pulse'}`} />
          <span>{saved ? 'Saved' : 'Unsaved'}</span>
        </span>

        {/* Action Buttons */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-[#e8a62a] hover:bg-amber-400 text-[#071b2d] font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
            onClick={() => setTemplatesOpen(true)}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          <button
            type="button"
            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition cursor-pointer"
            onClick={undo}
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition cursor-pointer"
            onClick={redo}
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition cursor-pointer hidden md:flex items-center gap-1"
            onClick={() => setDraftsOpen(true)}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Drafts ({drafts.length})</span>
          </button>

          <button
            type="button"
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition flex items-center gap-1 cursor-pointer"
            onClick={savePage}
            title="Save JSON file to PC"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save JSON</span>
          </button>

          {/* Department users submit to Admin; Super Admin publishes */}
          {currentUser.role === 'department_editor' ? (
            <button
              type="button"
              className="px-3.5 py-1.5 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              onClick={() => {
                setProposalTitle(pageData.meta?.title || '');
                setSubmitModalOpen(true);
              }}
            >
              <Send className="w-3.5 h-3.5 text-[#e8a62a]" />
              <span>Submit to Admin</span>
            </button>
          ) : (
            <button
              type="button"
              className="px-3.5 py-1.5 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              onClick={onSwitchToPublic}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live UI</span>
            </button>
          )}
        </div>
      </header>

      {/* DEPARTMENT REJECTION NOTIFICATION BANNER (if any) */}
      {departmentNotification && (
        <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 flex items-center justify-between text-xs text-rose-900 shrink-0">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Admin Feedback on "{departmentNotification.title}":</strong> {departmentNotification.feedback}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDepartmentNotification(null)}
            className="text-xs font-bold text-rose-700 hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. WORKSPACE (LIBRARY + CANVAS + INSPECTOR) */}
      <div className="flex flex-1 min-h-0">
        
        {/* LEFT PALETTE LIBRARY */}
        <aside className="w-60 bg-white border-r border-stone-200 flex flex-col shrink-0">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div>
              <strong className="text-xs font-bold text-[#071b2d]">Add Elements</strong>
              <p className="text-[10px] text-stone-500">Click to add to canvas</p>
            </div>
            <button
              type="button"
              className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-stone-200 cursor-pointer"
              onClick={newPage}
              title="New Clean Canvas"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            
            {/* Quick Templates Button */}
            <button
              type="button"
              onClick={() => setTemplatesOpen(true)}
              className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-[#163887] text-white hover:bg-[#102a6b] transition text-left cursor-pointer shadow-xs"
            >
              <LayoutTemplate className="w-5 h-5 text-[#e8a62a]" />
              <div>
                <b className="block text-xs">Official Templates</b>
                <small className="text-[10px] text-blue-100">Load department layout</small>
              </div>
            </button>

            {/* Quick Add Trio */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => add('text')}
                className="p-2 bg-stone-50 hover:bg-blue-50 text-stone-700 border border-stone-200 rounded-lg text-center cursor-pointer flex flex-col items-center gap-1"
              >
                <Type className="w-4 h-4 text-black" />
                <span className="text-[10px] font-bold">Text</span>
              </button>

              <button
                type="button"
                onClick={() => chooseImage()}
                className="p-2 bg-stone-50 hover:bg-blue-50 text-stone-700 border border-stone-200 rounded-lg text-center cursor-pointer flex flex-col items-center gap-1"
              >
                <ImageIcon className="w-4 h-4 text-black" />
                <span className="text-[10px] font-bold">Image</span>
              </button>

              <button
                type="button"
                onClick={() => setShapePickerOpen(true)}
                className="p-2 bg-stone-50 hover:bg-blue-50 text-stone-700 border border-stone-200 rounded-lg text-center cursor-pointer flex flex-col items-center gap-1"
              >
                <Shapes className="w-4 h-4 text-black" />
                <span className="text-[10px] font-bold">Shape</span>
              </button>
            </div>

            {/* Palette Groups */}
            {['Text & Links', 'Cards & Media', 'Forms & Media'].map((category) => (
              <div key={category} className="space-y-1.5 pt-1">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                  {category}
                </h4>
                <div className="space-y-1">
                  {palette
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => add(item.type)}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-stone-700 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200 transition text-left cursor-pointer"
                        title={item.description}
                      >
                        <span>{item.name}</span>
                        <Plus className="w-3.5 h-3.5 text-stone-400" />
                      </button>
                    ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => chooseImage()}
              className="w-full py-2.5 px-3 border border-dashed border-stone-300 hover:border-[#163887] text-stone-600 hover:text-blue-700 bg-stone-50 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Upload Photo from Device</span>
            </button>

            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onImageUpload} />
            <input ref={videoFileRef} type="file" accept="video/*" hidden />
          </div>

          <div className="p-3 border-t border-stone-200 bg-stone-50">
            <button
              type="button"
              onClick={() => designFileRef.current?.click()}
              className="w-full py-2 px-3 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON Design</span>
            </button>
            <input ref={designFileRef} type="file" accept=".json" hidden onChange={importPage} />
          </div>
        </aside>

        {/* MIDDLE CANVAS AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#eef2f5]">
          
          {/* Canvas Sub-Toolbar */}
          <div className="h-10 bg-white border-b border-stone-200 px-4 flex items-center justify-between shrink-0 text-xs">
            <div className="flex items-center gap-3 text-stone-600 font-semibold">
              <MousePointer2 className="w-3.5 h-3.5 text-black" />
              <span>Canvas Workspace:</span>
              <span className="text-stone-400 font-normal">
                {mobile ? '375px • Mobile Preview' : '1200px • Desktop Grid'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobile(false)}
                className={`p-1.5 rounded cursor-pointer ${
                  !mobile ? 'bg-[#163887] text-white' : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Desktop View (1200px)"
              >
                <Monitor className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setMobile(true)}
                className={`p-1.5 rounded cursor-pointer ${
                  mobile ? 'bg-[#163887] text-white' : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>

              <span className="h-4 border-l border-stone-300 mx-1" />

              <button
                type="button"
                onClick={() => zoomCanvas(-1)}
                className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold"
              >
                −
              </button>
              <span className="font-mono text-stone-600 min-w-10 text-center">{zoom}%</span>
              <button
                type="button"
                onClick={() => zoomCanvas(1)}
                className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Text formatting bar */}
          <div className="h-9 bg-stone-50 border-b border-stone-200 px-4 flex items-center gap-2 text-xs text-stone-600 shrink-0">
            <span className="text-[11px] font-bold text-stone-500">Quick Format:</span>
            <button
              type="button"
              onClick={() => formatSelection('bold')}
              className="px-2 py-0.5 bg-white border border-stone-200 rounded hover:bg-stone-100 font-bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => formatSelection('italic')}
              className="px-2 py-0.5 bg-white border border-stone-200 rounded hover:bg-stone-100 italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => formatSelection('underline')}
              className="px-2 py-0.5 bg-white border border-stone-200 rounded hover:bg-stone-100 underline"
            >
              U
            </button>
          </div>

          {/* Scrollable Canvas Container */}
          <div
            ref={canvasScrollRef}
            className="flex-1 overflow-auto p-6 sm:p-10 flex justify-center bg-[#eef2f5]"
          >
            <div
              style={{
                width: `${(mobile ? 375 : 1200) * (zoom / 100)}px`,
                height: `${autoPageHeight * (zoom / 100)}px`
              }}
            >
              <div
                ref={canvasRef}
                className="relative bg-white shadow-xl border border-stone-300 rounded-b-xl origin-top-left"
                style={{
                  width: mobile ? 375 : 1200,
                  minHeight: autoPageHeight,
                  transform: `scale(${zoom / 100})`
                }}
                onPointerMove={onPointerMove}
                onPointerUp={finishPointer}
                onPointerCancel={finishPointer}
                onClick={() => {
                  setSelectedId(null);
                  setActiveCardText(null);
                }}
              >
                {!elements.length ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center text-stone-400">
                    <MousePointer2 className="w-12 h-12 text-black mb-3" />
                    <h3 className="text-base font-bold text-stone-700">Canvas is Ready</h3>
                    <p className="text-xs text-stone-500 max-w-sm mt-1">
                      Choose an official UAF template from the top bar or drag elements from the left.
                    </p>
                    <button
                      type="button"
                      onClick={() => setTemplatesOpen(true)}
                      className="mt-4 px-4 py-2 bg-[#163887] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      Browse Department Templates
                    </button>
                  </div>
                ) : (
                  elements.map((el) => (
                    <div
                      key={el.id}
                      className={`canvas-item ${el.id === selectedId ? 'selected ring-2 ring-[#163887]' : ''}`}
                      style={
                        mobile
                          ? { position: 'relative', margin: 12, width: 'calc(100% - 24px)' }
                          : {
                              position: 'absolute',
                              left: el.x || 0,
                              top: el.y || 0,
                              width: el.width || 260,
                              minHeight: el.height || 80,
                              cursor: el.fixed ? 'default' : 'move'
                            }
                      }
                      onPointerDown={(e) => onPointerDown(e, el)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(el.id);
                        if (el.type === 'image' && !el.src) {
                          chooseImage({ id: el.id, type: 'image' });
                        }
                      }}
                    >
                      <div className="w-full h-full">
                        <PrimitiveRenderer
                          el={el}
                          isEditing={true}
                          onChange={onPrimitiveChange}
                          onRequestImage={(id) => {
                            setSelectedId(id);
                            chooseImage({ id, type: 'image' });
                          }}
                        />
                      </div>

                      {el.id === selectedId && (
                        <>
                          <span className="absolute -top-5 left-0 px-2 py-0.5 bg-[#163887] text-white text-[9px] font-bold rounded-t uppercase">
                            {el.type}
                          </span>

                          {!el.fixed && !mobile && (
                            <button
                              type="button"
                              className="absolute -right-2 -bottom-2 w-4 h-4 bg-white border-2 border-[#163887] rounded cursor-nwse-resize"
                              onPointerDown={(e) => onPointerDown(e, el, true, 'se')}
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </main>

        {/* RIGHT INSPECTOR */}
        <aside className="w-68 bg-white border-l border-stone-200 flex flex-col shrink-0">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div>
              <strong className="text-xs font-bold text-[#071b2d]">
                {selected ? 'Element Inspector' : 'Page Settings'}
              </strong>
              <p className="text-[10px] text-stone-500">
                {selected ? selected.type : 'University layout'}
              </p>
            </div>
            {selected && !selected.fixed && (
              <button
                type="button"
                className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                onClick={deleteSelected}
                title="Delete Element"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {selected ? (
              <>
                {/* Content Editor */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Content Settings
                  </span>

                  {selected.type === 'text' && (
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Text Content:
                      </label>
                      <textarea
                        rows={3}
                        value={selected.text || ''}
                        onChange={(e) => updateElement(selected.id, { text: e.target.value })}
                        className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  )}

                  {['button', 'hyperlink'].includes(selected.type) && (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Button / Link Label:
                        </label>
                        <input
                          type="text"
                          value={selected.label || selected.text || ''}
                          onChange={(e) =>
                            updateElement(
                              selected.id,
                              selected.type === 'button'
                                ? { label: e.target.value }
                                : { text: e.target.value }
                            )
                          }
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Destination URL:
                        </label>
                        <input
                          type="text"
                          value={selected.url || ''}
                          onChange={(e) => updateElement(selected.id, { url: e.target.value })}
                          placeholder="https://..."
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {selected.type === 'card' && (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Card Title:
                        </label>
                        <input
                          type="text"
                          value={selected.title || ''}
                          onChange={(e) => updateElement(selected.id, { title: e.target.value })}
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Description:
                        </label>
                        <textarea
                          rows={3}
                          value={selected.description || ''}
                          onChange={(e) =>
                            updateElement(selected.id, { description: e.target.value })
                          }
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Size & Position */}
                <div className="space-y-2 pt-3 border-t border-stone-200">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Dimensions (px)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-stone-500">Width</label>
                      <input
                        type="number"
                        value={selected.width || 260}
                        onChange={(e) => updateElement(selected.id, { width: Number(e.target.value) })}
                        className="w-full p-1.5 border border-stone-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-500">Height</label>
                      <input
                        type="number"
                        value={selected.height || 100}
                        onChange={(e) => updateElement(selected.id, { height: Number(e.target.value) })}
                        className="w-full p-1.5 border border-stone-300 rounded text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Duplicate */}
                {!selected.fixed && (
                  <div className="pt-3 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={duplicateSelected}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate Element</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Page Details
                </span>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Page Name:
                  </label>
                  <input
                    type="text"
                    value={pageData.meta?.title || ''}
                    onChange={(e) => {
                      setPageData({ ...pageData, meta: { ...pageData.meta, title: e.target.value } });
                      setSaved(false);
                      dirtyRef.current = true;
                    }}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Department / Author:
                  </label>
                  <input
                    type="text"
                    value={pageData.meta?.author || ''}
                    onChange={(e) =>
                      setPageData({ ...pageData, meta: { ...pageData.meta, author: e.target.value } })
                    }
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-black space-y-1">
                  <strong>UAF Standardization:</strong>
                  <p className="text-[11px] text-black leading-relaxed">
                    Templates keep the official header, fonts, and colors consistent across all departments.
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

      </div>

      {/* 3. DRAFTS DRAWER */}
      {draftsOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#071b2d]/60 backdrop-blur-xs flex justify-end"
          onClick={() => setDraftsOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <strong className="text-sm font-bold text-[#071b2d]">Saved Drafts</strong>
                <p className="text-xs text-stone-500">Stored locally in your browser</p>
              </div>
              <button
                type="button"
                onClick={() => setDraftsOpen(false)}
                className="p-1 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {drafts.length === 0 ? (
                <p className="text-xs text-stone-400 text-center py-10">No saved drafts yet.</p>
              ) : (
                drafts.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-2 hover:bg-blue-50/40 transition"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setPageData({ ...d.data, draftId: d.id });
                        setSelectedId(null);
                        setDraftsOpen(false);
                        setToast('Draft loaded.');
                      }}
                      className="text-left flex-1 min-w-0 cursor-pointer"
                    >
                      <b className="block text-xs text-[#071b2d] truncate">{d.title}</b>
                      <small className="text-[10px] text-stone-500">
                        {new Date(d.updatedAt).toLocaleDateString()} • {d.data.elements?.length || 0} items
                      </small>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const next = drafts.filter((item) => item.id !== d.id);
                        setDrafts(next);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                saveDraftSnapshot();
                setToast('Current page saved to Drafts.');
              }}
              className="w-full py-2.5 bg-[#163887] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#102a6b] transition cursor-pointer"
            >
              Save Current Page to Drafts
            </button>
          </div>
        </div>
      )}

      {/* 4. SUBMIT TO ADMIN PROPOSAL MODAL */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b2d]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-black" />
                <h3 className="text-base font-bold text-[#071b2d]">Submit Changes to Admin</h3>
              </div>
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Your page design will be converted to a JSON proposal and sent to Super Admin (
              <strong>ridaparveen116@gmail.com</strong>) for review and live publishing.
            </p>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Proposal Title / Description:
              </label>
              <input
                type="text"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                placeholder="e.g. Autumn 2026 Department Curriculum Update"
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#163887]"
              />
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1.5 text-stone-600">
              <div className="flex justify-between items-center">
                <span>Department:</span>
                <strong className="text-black font-bold">
                  {currentUser.departmentName || 'Department of Agronomy'}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Submitter Account:</span>
                <strong>{currentUser.email}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>JSON Payload:</span>
                <strong>{elements.length} UI elements generated</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={savePage}
                className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                title="Download JSON file to local computer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save JSON to Disk</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitToAdmin}
                  className="px-5 py-2 text-xs font-bold bg-[#163887] hover:bg-[#102a6b] text-white rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Proposal to Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TEMPLATES PICKER MODAL */}
      {templatesOpen && (
        <TemplatePicker
          hasContent={elements.length > 0}
          onPick={applyTemplate}
          onBlank={() => {
            setTemplatesOpen(false);
            newPage();
          }}
          onClose={() => setTemplatesOpen(false)}
        />
      )}

      {/* 6. TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#071b2d] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center space-x-2 border border-blue-500/50">
          <Check className="w-4 h-4 text-blue-400" />
          <span>{toast}</span>
        </div>
      )}

    </div>
  );
};
