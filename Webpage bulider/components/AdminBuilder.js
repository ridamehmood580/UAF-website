'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PRIMITIVE_PALETTE, createPrimitiveElement } from '../lib/elementPrimitives';
import PrimitiveRenderer from './PrimitiveRenderer';
import TemplatePicker from './TemplatePicker';
import { buildTemplate } from '../lib/pageTemplates';
import { STYLE_LOCK, LOOKS_BY_TYPE, LOOK_LABEL, themeElement } from '../lib/uafTheme';
import { Eye, FolderOpen, Save, Type, Image as ImageIcon, Shapes, MousePointer2, Undo2, Redo2, Trash2, Copy, Download, Upload, PanelLeftClose, X, Plus, Check, Smartphone, Monitor, AlignLeft, AlignCenter, AlignRight, LayoutTemplate, Lock } from 'lucide-react';

const STORAGE_KEY = 'faculty-page-builder-drafts-v1';
const freshPage = () => ({ draftId: `draft-${Date.now()}-${Math.floor(Math.random() * 10000)}`, meta: { title: 'Untitled faculty page', author: 'Faculty', allowPageScroll: true }, elements: [] });
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function AdminBuilder({ pageData, setPageData, onSwitchToPublic }) {
  const [selectedId, setSelectedId] = useState(null);
  const [draftsOpen, setDraftsOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [saved, setSaved] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [mobile, setMobile] = useState(false);
  const [showMobilePanels, setShowMobilePanels] = useState(false);
  const [toast, setToast] = useState('');
  const [shapePickerOpen, setShapePickerOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [activeCardText, setActiveCardText] = useState(null);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const canvasRef = useRef(null);
  const canvasScrollRef = useRef(null);
  const savedRangeRef = useRef(null);
  const manualZoomRef = useRef(false);
  const fileRef = useRef(null);
  const videoFileRef = useRef(null);
  const pendingUploadRef = useRef(null);
  const pendingVideoRef = useRef(null);
  const designFileRef = useRef(null);
  const dragging = useRef(null);
  const elements = pageData.elements || [];
  const autoPageHeight = Math.max(900, ...elements.map(el => (el.y || 0) + (el.height || 100) + 48));
  const selected = elements.find(item => item.id === selectedId);
  const updateElementRef = useRef(null);
  const dirtyRef = useRef(false);

  useEffect(() => {
    try { setDrafts(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); } catch { setDrafts([]); }
    // A new visit always opens a clean page. Existing work is available from Drafts.
    setPageData(freshPage());
  }, []);

  const saveDraftSnapshot = (snapshot = pageData) => {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const id = snapshot.draftId || `draft-${Date.now()}`;
      const draft = { id, title: snapshot.meta?.title || 'Untitled faculty page', updatedAt: new Date().toISOString(), data: snapshot };
      const next = [draft, ...list.filter(item => item.id !== id)].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setDrafts(next); setSaved(true); dirtyRef.current = false;
      return true;
    } catch { setToast('Could not save this draft. The browser storage may be full.'); return false; }
  };

  useEffect(() => {
    const warnBeforeLeaving = event => {
      if (!dirtyRef.current) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, []);

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2600); return () => clearTimeout(t); }, [toast]);

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

  useEffect(() => {
    const host = canvasScrollRef.current;
    if (!host || manualZoomRef.current) return;
    const fit = () => {
      if (manualZoomRef.current) return;
      const available = host.clientWidth - (mobile ? 28 : 96);
      setZoom(clamp(Math.floor(available / (mobile ? 375 : 1200) * 100), 25, 100));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    return () => observer.disconnect();
  }, [mobile]);

  useEffect(() => {
    const preventBrowserZoom = event => {
      if (!(event.ctrlKey || event.metaKey) || !event.target?.closest?.('.builder-shell')) return;
      event.preventDefault();
      zoomCanvas(event.deltaY < 0 ? 1 : -1);
    };
    window.addEventListener('wheel', preventBrowserZoom, { capture: true, passive: false });
    return () => window.removeEventListener('wheel', preventBrowserZoom, true);
  }, []);

  const commit = (next) => { setHistory(prev => [...prev.slice(-29), pageData]); setFuture([]); setPageData(next); setSaved(false); dirtyRef.current = true; };
  const updateElement = (id, changes) => { if (elements.find(el => el.id === id)?.fixed) return; commit({ ...pageData, elements: elements.map(el => el.id === id ? { ...el, ...changes } : el) }); };
  updateElementRef.current = updateElement;
  const onPrimitiveChange = useCallback((id, key, value) => updateElementRef.current(id, typeof key === 'object' ? key : { [key]: value }), []);
  const updateStyle = (key, value) => selected && updateElement(selectedId, { style: { ...selected.style, [key]: value } });
  const add = (type, at) => {
    const el = createPrimitiveElement(type === 'paragraph' ? 'text' : type);
    if (type === 'paragraph') { el.tag = 'p'; el.fontSize = 16; el.fontWeight = 'normal'; }
    el.x = at?.x ?? 72 + (elements.length % 4) * 28;
    el.y = at?.y ?? 72 + (elements.length % 5) * 30;
    el.width = type === 'text' || type === 'paragraph' ? 380 : type === 'image' || type === 'video' ? 360 : type === 'container' || type === 'card' ? 340 : type === 'button' ? 150 : 250;
    el.height = type === 'text' || type === 'paragraph' ? 84 : type === 'image' ? 220 : type === 'video' ? 220 : type === 'container' ? 180 : type === 'card' ? 260 : type === 'divider' ? 28 : type === 'button' ? 42 : 100;
    commit({ ...pageData, elements: [...elements, el] }); setSelectedId(el.id); setToast(`${type[0].toUpperCase()}${type.slice(1)} added. Drag it to position.`);
  };
  const changePosition = (id, x, y) => { dirtyRef.current = true; setPageData(prev => ({ ...prev, elements: prev.elements.map(el => el.id === id ? { ...el, x, y } : el) })); };
  const onPointerDown = (event, el, resizing = false, handle = 'se') => {
    if (event.button !== 0) return;
    if (el.fixed) return; // fixed template parts (header / footer) cannot be moved or resized
    if (mobile && !resizing) return;
    if (!resizing && event.target.closest('[data-inline-editor], input, textarea, select, button')) return;
    event.preventDefault(); event.stopPropagation(); setSelectedId(el.id);
    const rect = canvasRef.current.getBoundingClientRect();
    dragging.current = { id: el.id, startX: event.clientX, startY: event.clientY, x: el.x || 0, y: el.y || 0, w: el.width || 260, h: el.height || 100, resizing, handle, scale: zoom / 100, rect };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    const d = dragging.current; if (!d) return;
    const dx = (event.clientX - d.startX) / d.scale, dy = (event.clientY - d.startY) / d.scale;
    if (d.resizing) {
      const west = d.handle.includes('w'), north = d.handle.includes('n');
      const width = clamp(d.w + (west ? -dx : dx), 40, 1100), height = clamp(d.h + (north ? -dy : dy), 36, 1200);
      const x = west ? d.x + d.w - width : d.x, y = north ? d.y + d.h - height : d.y;
      setPageData(prev => ({ ...prev, elements: prev.elements.map(el => el.id === d.id ? { ...el, x, y, width, height } : el) }));
    }
    else changePosition(d.id, clamp(d.x + dx, 0, 1080), clamp(d.y + dy, 0, 3000));
  };
  const finishPointer = () => { if (dragging.current) { dragging.current = null; setSaved(false); dirtyRef.current = true; } };
  const deleteSelected = () => { if (!selected || selected.fixed) return; commit({ ...pageData, elements: elements.filter(el => el.id !== selectedId) }); setSelectedId(null); };
  const duplicateSelected = () => { if (!selected || selected.fixed) return; const copy = { ...JSON.parse(JSON.stringify(selected)), id: `el-${Date.now()}`, x: (selected.x || 0) + 24, y: (selected.y || 0) + 24 }; commit({ ...pageData, elements: [...elements, copy] }); setSelectedId(copy.id); };
  const undo = () => { if (!history.length) return; setFuture(v => [pageData, ...v]); setPageData(history.at(-1)); setHistory(v => v.slice(0, -1)); dirtyRef.current = true; setSaved(false); };
  const redo = () => { if (!future.length) return; setHistory(v => [...v, pageData]); setPageData(future[0]); setFuture(v => v.slice(1)); dirtyRef.current = true; setSaved(false); };
  const openDraft = (draft) => { setPageData({ ...draft.data, draftId: draft.id }); setSelectedId(null); setDraftsOpen(false); setToast('Draft opened. You can continue editing.'); };
  const applyTemplate = (id) => {
    const tpl = buildTemplate(id); if (!tpl) return;
    if (dirtyRef.current && window.confirm('Save your unsaved design to Drafts before replacing it with this template? Choose Cancel to discard it and continue.')) saveDraftSnapshot();
    // A new draft id keeps the previous page safe in Drafts.
    const draftId = `draft-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    commit({ ...pageData, draftId, meta: { ...pageData.meta, title: tpl.title, template: tpl.id }, elements: tpl.elements });
    setSelectedId(null); setTemplatesOpen(false); setToast('Template ready. Click any text or image to edit it.');
  };
  const newPage = () => { if (dirtyRef.current) { const shouldSave = window.confirm('Save your unsaved design to Drafts before starting a new page? Choose Cancel to discard it and continue.'); if (shouldSave) saveDraftSnapshot(); } setPageData(freshPage()); setSelectedId(null); dirtyRef.current = false; setSaved(true); };
  const savePage = async () => {
    const name = `${(pageData.meta?.title || 'faculty-page').replace(/[\\/:*?"<>|]+/g, '-').trim() || 'faculty-page'}.json`;
    const blob = new Blob([JSON.stringify(pageData, null, 2)], { type: 'application/json' });
    try {
      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({ suggestedName: name, types: [{ description: 'Page design', accept: { 'application/json': ['.json'] } }] });
        const writable = await handle.createWritable(); await writable.write(blob); await writable.close();
      } else {
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      dirtyRef.current = false; setSaved(true); setToast('Page saved to your computer.');
    } catch (error) { if (error.name !== 'AbortError') setToast('Could not save the page.'); }
  };
  const importPage = (event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const value = JSON.parse(reader.result); if (!Array.isArray(value.elements)) throw new Error(); setPageData(value); setSelectedId(null); dirtyRef.current = false; setSaved(true); setToast('Page opened.'); } catch { setToast('This file is not a valid page design.'); } }; reader.readAsText(file); event.target.value = ''; };
  const chooseImage = (target = null) => { pendingUploadRef.current = target; fileRef.current?.click(); };
  const onImageUpload = (e) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); const target = pendingUploadRef.current; reader.onload = () => { if (target?.type === 'card') updateElement(target.id, { imageUrl: reader.result }); else if (target?.type === 'image') updateElement(target.id, { src: reader.result, alt: file.name }); else { const el = createPrimitiveElement('image'); el.src = reader.result; el.alt = file.name; el.x = 72; el.y = 72; el.width = 360; el.height = 220; commit({ ...pageData, elements: [...elements, el] }); setSelectedId(el.id); } }; reader.readAsDataURL(file); e.target.value = ''; pendingUploadRef.current = null; };
  const chooseVideo = (id = selectedId) => { pendingVideoRef.current = id; videoFileRef.current?.click(); };
  const onVideoUpload = (e) => { const file = e.target.files?.[0]; const id = pendingVideoRef.current; if (!file || !id) return; const reader = new FileReader(); reader.onload = () => updateElement(id, { videoUrl: reader.result, videoName: file.name, isLocalVideo: true }); reader.readAsDataURL(file); e.target.value = ''; pendingVideoRef.current = null; };
  const setVideoUrl = (value, id = selectedId) => {
    let url = value.trim();
    const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/i);
    if (youtube) url = `https://www.youtube.com/embed/${youtube[1]}`;
    updateElement(id, { videoUrl: url, isLocalVideo: false });
  };
  const resetCanvas = () => { if (elements.length && !window.confirm('Clear every element from this canvas?')) return; commit({ ...pageData, elements: [] }); setSelectedId(null); setActiveCardText(null); };
  const formatSelection = (command, value = null) => {
    if (STYLE_LOCK && !['bold', 'italic', 'underline'].includes(command)) return;
    const saved = savedRangeRef.current;
    if (!saved?.node?.isConnected) return;
    saved.node.focus();
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(saved.range);
    document.execCommand(command, false, value);
    savedRangeRef.current = { range: selection.getRangeAt(0).cloneRange(), node: saved.node };
  };
  const formatSelectionStyle = (property, value) => {
    if (STYLE_LOCK) return;
    const saved = savedRangeRef.current;
    if (!saved?.node?.isConnected || saved.range.collapsed) return;
    saved.node.focus();
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(saved.range);
    const range = selection.getRangeAt(0), span = document.createElement('span');
    span.style.setProperty(property, value);
    span.appendChild(range.extractContents());
    range.insertNode(span);
    const nextRange = document.createRange(); nextRange.selectNodeContents(span);
    selection.removeAllRanges(); selection.addRange(nextRange);
    savedRangeRef.current = { range: nextRange.cloneRange(), node: saved.node };
  };
  const zoomCanvas = (direction) => {
    manualZoomRef.current = true;
    setZoom(value => clamp(value + direction * 10, 25, 160));
  };
  const deleteDraft = (event, id) => { event.stopPropagation(); const next = drafts.filter(draft => draft.id !== id); setDrafts(next); try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { setToast('Could not update saved drafts.'); } };
  const palette = PRIMITIVE_PALETTE.flatMap(category => category.items.map(item => ({ ...item, category: category.category })));

  const lookPicker = (() => {
    if (!STYLE_LOCK || !selected || !LOOKS_BY_TYPE[selected.type]) return null;
    const table = LOOKS_BY_TYPE[selected.type];
    const current = themeElement(selected).look;
    const entries = Object.entries(table).filter(([key, value]) => !value.hidden || key === current);
    const groups = [...new Set(entries.map(([, value]) => value.group || ''))];
    const option = ([key, value]) => <option key={key} value={key}>{value.label}</option>;
    return <label>{LOOK_LABEL[selected.type]}<select value={current} onChange={e => updateElement(selectedId, { look: e.target.value })}>
      {groups.map(group => group
        ? <optgroup key={group} label={group}>{entries.filter(([, value]) => value.group === group).map(option)}</optgroup>
        : entries.filter(([, value]) => !value.group).map(option))}
    </select></label>;
  })();
  const lockedStyleCard = selected ? <div className="inspector-card"><div className="section-label">UAF style</div>{lookPicker}
    {selected.type !== 'image' && <div className="align-control"><button onClick={() => updateStyle('align','left')} title="Align left"><AlignLeft size={16}/></button><button onClick={() => updateStyle('align','center')} title="Align center"><AlignCenter size={16}/></button><button onClick={() => updateStyle('align','right')} title="Align right"><AlignRight size={16}/></button></div>}
    <p className="lock-note"><Lock size={13}/><span>Colors, fonts and corners follow the official UAF design, so every page looks the same.</span></p></div> : null;

  return <div className="builder-shell">
    <header className="builder-topbar">
      <img src="/templates/uaf-logo.gif" alt="UAF logo" className="brand-logo" /><div className="brand-copy"><strong>UAF Page studio</strong><span>Faculty website builder</span></div>
      <div className="top-divider" />
      <input className="page-title" value={pageData.meta?.title || ''} onChange={e => { setPageData({ ...pageData, meta: { ...pageData.meta, title: e.target.value } }); setSaved(false); dirtyRef.current = true; }} aria-label="Page title" />
      <span className={`save-status ${saved ? 'is-saved' : ''}`}><i />{saved ? 'Ready to save' : 'Unsaved changes'}</span>
      <div className="top-actions"><button className="button button-light" onClick={() => setTemplatesOpen(true)} title="Choose a ready-made page"><LayoutTemplate size={15}/> Templates</button><button className="button button-quiet" onClick={undo} title="Undo"><Undo2 size={16}/></button><button className="button button-quiet" onClick={redo} title="Redo"><Redo2 size={16}/></button><button className="button button-quiet" onClick={() => setDraftsOpen(true)}><FolderOpen size={16}/> Drafts <span className="draft-count">{drafts.length}</span></button><button className="button button-light" onClick={resetCanvas} title="Remove everything from the canvas"><Trash2 size={15}/> Reset</button><button className="button button-light" onClick={savePage}><Save size={16}/> Save</button><button className="button button-primary" onClick={onSwitchToPublic}><Eye size={16}/> Preview page</button></div>
    </header>
    <div className="builder-workspace">
      <aside className="builder-library">
        <div className="panel-heading"><div><strong>Add to your page</strong><span>Click an item, then drag it</span></div><button className="icon-button" onClick={newPage} title="New page"><Plus size={17}/></button></div>
        <div className="library-scroll">
          <button className="template-launch" onClick={() => setTemplatesOpen(true)}><LayoutTemplate size={20}/><span><b>Page templates</b><small>Start from a ready-made UAF page</small></span><Plus size={15}/></button><div className="quick-add"><button onClick={() => add('text')}><Type size={18}/><span><b>Text</b><small>Heading or paragraph</small></span><Plus size={15}/></button><button onClick={() => add('image')}><ImageIcon size={18}/><span><b>Image</b><small>Choose on canvas</small></span><Plus size={15}/></button><button onClick={() => setShapePickerOpen(true)}><Shapes size={18}/><span><b>Shape</b><small>Choose a shape</small></span><Plus size={15}/></button></div>
          {['Text & Links', 'Cards & Media', 'Forms & Media'].map(category => <section className="library-group" key={category}><h3>{category}</h3><div className="library-items">{palette.filter(item => item.category === category).map(item => <button className="library-item" key={item.type} onClick={() => add(item.type)} title={item.description}><span className="item-icon">{item.type === 'image' ? <ImageIcon size={17}/> : item.type === 'text' || item.type === 'paragraph' ? <Type size={17}/> : <Shapes size={17}/>}</span><span>{item.name.replace(' / ', ' ')}</span><Plus size={14}/></button>)}</div></section>)}
          <button className="upload-tile" onClick={chooseImage}><ImageIcon size={17}/> Upload image from your device</button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onImageUpload}/><input ref={videoFileRef} type="file" accept="video/*" hidden onChange={onVideoUpload}/>
        </div>
        <div className="library-footer"><button onClick={() => designFileRef.current?.click()}><Upload size={15}/> Open a saved design</button><input ref={designFileRef} type="file" accept=".json,application/json" hidden onChange={importPage}/></div>
      </aside>
      <main className="canvas-area">
        <div className="canvas-toolbar"><div className="canvas-label"><MousePointer2 size={15}/><span>Page canvas</span><span className="canvas-size">{mobile ? '375 px · mobile' : '1200 px · desktop'}</span></div><div className="canvas-controls">{mobile && <button onClick={() => setShowMobilePanels(v => !v)} title="Show editing panels">{showMobilePanels ? 'Hide' : 'Edit'}</button>}<button className={!mobile ? 'device-active' : ''} onClick={() => { manualZoomRef.current = false; setMobile(false); }} title="Desktop view"><Monitor size={16}/></button><button className={mobile ? 'device-active' : ''} onClick={() => { manualZoomRef.current = false; setMobile(true); setShowMobilePanels(false); }} title="Mobile view"><Smartphone size={16}/></button><i/><button onClick={() => zoomCanvas(-1)}>−</button><span>{zoom}%</span><button onClick={() => zoomCanvas(1)}>+</button><button onClick={() => { manualZoomRef.current = false; const host = canvasScrollRef.current; if (host) setZoom(clamp(Math.floor((host.clientWidth - (mobile ? 28 : 96)) / (mobile ? 375 : 1200) * 100), 25, 100)); }} title="Fit canvas">Fit</button></div></div>
        <div className="canvas-text-toolbar" onMouseDown={e => e.preventDefault()}><span>{STYLE_LOCK ? 'Bold / italic / underline (select text first)' : 'Format selected text (select text first)'}</span><button title="Bold" onClick={() => formatSelection('bold')}><b>B</b></button><button title="Italic" onClick={() => formatSelection('italic')}><i>I</i></button><button title="Underline" onClick={() => formatSelection('underline')}><u>U</u></button>{!STYLE_LOCK && <><i/>{[12,14,16,18,24,32,40].map(size => <button key={size} title={`Set selected text to ${size}px`} onClick={() => formatSelectionStyle('font-size', `${size}px`)}>{size}</button>)}<i/>{['#111827','#dc2626','#2563eb','#15803d','#9333ea','#d97706'].map(color => <button key={color} title={`Set selected text color ${color}`} onClick={() => formatSelectionStyle('color', color)} style={{ background:color,width:17,height:17,borderRadius:9,padding:0 }} />)}<i/>{['Arial','Verdana','Georgia','Times New Roman','Courier New','Impact'].map(font => <button key={font} title={`Apply ${font}`} style={{ fontFamily:font }} onClick={() => formatSelectionStyle('font-family', font)}>{font}</button>)}</>}</div>
        <div ref={canvasScrollRef} className={`canvas-scroll ${mobile && !showMobilePanels ? 'mobile-preview-only' : ''}`}><div className="canvas-frame" style={{ width: `${(mobile ? 375 : 1200) * zoom / 100}px`, height: `${(mobile ? Math.max(740, elements.reduce((sum, el) => sum + (el.height || 100) + 24, 0) + 40) : (pageData.meta?.allowPageScroll === false ? 900 : autoPageHeight)) * zoom / 100}px` }}><div ref={canvasRef} className={`page-canvas ${mobile ? 'mobile-canvas' : ''}`} style={{ minHeight: mobile ? Math.max(740, elements.reduce((sum, el) => sum + (el.height || 100) + 24, 0) + 40) : (pageData.meta?.allowPageScroll === false ? 900 : autoPageHeight), transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }} onPointerMove={onPointerMove} onPointerUp={finishPointer} onPointerCancel={finishPointer} onClick={() => { setSelectedId(null); setActiveCardText(null); }}>
          {!elements.length && <div className="canvas-empty"><div className="empty-icon"><MousePointer2 size={22}/></div><h2>Your page starts here</h2><p>Choose something from the left to add it. Drag items to move them and use the corner handle to resize.</p><div className="empty-shortcuts"><button onClick={e => { e.stopPropagation(); setTemplatesOpen(true); }}><LayoutTemplate size={16}/> Use a template</button><button onClick={e => { e.stopPropagation(); add('text'); }}><Type size={16}/> Add a heading</button><button onClick={e => { e.stopPropagation(); chooseImage(); }}><ImageIcon size={16}/> Add an image</button></div></div>}
          {elements.map(el => <div key={el.id} data-type={el.type} className={`canvas-item ${el.id === selectedId ? 'selected' : ''}`} style={{ left: el.x || 0, top: el.y || 0, width: el.width || 260, minHeight: el.height || 80, ...(el.fixed ? { cursor: 'default' } : {}) }} onPointerDown={e => onPointerDown(e, el)} onClick={e => { e.stopPropagation(); setSelectedId(el.id); const cardText = e.target.closest('[data-card-text]')?.getAttribute('data-card-text'); setActiveCardText(cardText || null); if (el.type === 'image' && !el.src) chooseImage({ id: el.id, type: 'image' }); }}>
            <div className="canvas-item-content"><PrimitiveRenderer el={el} isEditing onChange={onPrimitiveChange} onRequestImage={id => { const target = elements.find(item => item.id === id); setSelectedId(id); chooseImage({ id, type: target?.type === 'card' ? 'card' : 'image' }); }} onRequestVideo={id => { setSelectedId(id); chooseVideo(id); }}/></div>
            {el.id === selectedId && <><span className="selection-tag">{el.type}</span>{!el.fixed && ['nw','n','ne','e','se','s','sw','w'].map(handle => <button key={handle} className={`resize-handle handle-${handle}`} aria-label={`Resize element ${handle}`} onPointerDown={e => onPointerDown(e, el, true, handle)} onPointerMove={onPointerMove} onPointerUp={finishPointer}/>)}</>}
          </div>)}
        </div></div></div>
        <div className="canvas-footer"><span><span className="footer-dot"/> Unsaved changes stay here until you save</span><button onClick={() => setDraftsOpen(true)}>View drafts <span>→</span></button></div>
      </main>
      <aside className="builder-inspector"><div className="panel-heading"><div><strong>{selected ? 'Edit selection' : 'Page settings'}</strong><span>{selected ? 'Adjust its look and size' : 'Set up your page'}</span></div>{selected && !selected.fixed && <button className="icon-button" onClick={deleteSelected} title="Delete"><Trash2 size={16}/></button>}</div>
        <div className="inspector-scroll">{selected ? <>
          <div className="inspector-card"><div className="section-label">Content</div>
            {selected.type === 'text' && <><label>Text<textarea value={selected.text || ''} onChange={e => updateElement(selectedId, { text: e.target.value, richHtml: '' })}/></label>{!STYLE_LOCK && <><label>Text style<select value={selected.tag || 'h2'} onChange={e => updateElement(selectedId, { tag: e.target.value })}><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="h4">Heading 4</option><option value="p">Paragraph</option></select></label><label>Font family<select value={selected.fontFamily || 'Arial, Helvetica, sans-serif'} onChange={e => updateElement(selectedId, { fontFamily: e.target.value })}>{['Arial, Helvetica, sans-serif','Arial','Helvetica','Verdana','Tahoma','Trebuchet MS','Georgia','Times New Roman','Garamond','Palatino Linotype','Courier New','Consolas','Impact','Comic Sans MS'].map(font => <option key={font} value={font}>{font.split(',')[0]}</option>)}</select></label><label>Font weight<select value={selected.fontWeight || 'normal'} onChange={e => updateElement(selectedId, { fontWeight: e.target.value })}><option value="normal">Regular</option><option value="semibold">Semi-bold</option><option value="bold">Bold</option><option value="black">Black</option></select></label><label>Font size <input type="range" min="12" max="56" value={selected.fontSize || 20} onChange={e => updateElement(selectedId, { fontSize: Number(e.target.value) })}/></label></>}</>}
            {['text','card','button','hyperlink','container'].includes(selected.type) && <div className="rich-toolbar"><div className="section-label">Format selected text</div><div className="rich-actions"><button type="button" title="Bold" onMouseDown={e => e.preventDefault()} onClick={() => formatSelection('bold')}><b>B</b></button><button type="button" title="Italic" onMouseDown={e => e.preventDefault()} onClick={() => formatSelection('italic')}><i>I</i></button><button type="button" title="Underline" onMouseDown={e => e.preventDefault()} onClick={() => formatSelection('underline')}><u>U</u></button>{!STYLE_LOCK && ['#111827','#dc2626','#2563eb','#15803d','#9333ea','#d97706'].map(color => <button type="button" key={color} title={`Text color ${color}`} aria-label={`Text color ${color}`} onMouseDown={e => e.preventDefault()} onClick={() => formatSelection('foreColor', color)} style={{ width:18,height:18,background:color,borderRadius:9 }} />)}</div>{!STYLE_LOCK && <div className="rich-fonts">{['Arial','Verdana','Tahoma','Trebuchet MS','Georgia','Times New Roman','Garamond','Palatino Linotype','Courier New','Consolas','Impact','Comic Sans MS'].map(font => <button type="button" key={font} title={`Apply ${font} to selected text`} onMouseDown={e => e.preventDefault()} onClick={() => formatSelection('fontName', font)}>{font}</button>)}</div>}<small>Select text on the canvas, then choose a format.</small></div>}
            {['button','hyperlink'].includes(selected.type) && <label>{selected.type === 'button' ? 'Button label' : 'Link text'}<input value={selected.label || selected.text || ''} onChange={e => updateElement(selectedId, selected.type === 'button' ? { label: e.target.value, richHtml: '' } : { text: e.target.value, richHtml: '' })}/></label>}
            {['button','hyperlink'].includes(selected.type) && <label>Link address<input value={selected.url || ''} onChange={e => updateElement(selectedId, { url: e.target.value })} placeholder="https://…"/></label>}
            {selected.type === 'image' && <><label>Image address<input value={selected.src || ''} onChange={e => updateElement(selectedId, { src: e.target.value })} placeholder="Paste image URL"/></label><label>Caption<input value={selected.caption || ''} onChange={e => updateElement(selectedId, { caption: e.target.value })}/></label><button className="small-action" onClick={() => chooseImage({ id: selectedId, type: 'image' })}><Upload size={14}/> Upload a different image</button></>}
            {selected.type === 'container' && <><label>Shape<select value={selected.shapeType || 'rectangle'} onChange={e => updateElement(selectedId, { shapeType: e.target.value })}><option value="rectangle">Rectangle</option><option value="rounded">Rounded rectangle</option><option value="circle">Circle</option><option value="pill">Pill</option><option value="triangle">Triangle</option><option value="diamond">Diamond</option></select></label><button className="small-action" onClick={() => updateElement(selectedId, { shapeTextEnabled: !(selected.shapeTextEnabled || selected.shapeText), ...(selected.shapeTextEnabled || selected.shapeText ? { shapeText: '', shapeHtml: '' } : {}) })}>{selected.shapeTextEnabled || selected.shapeText ? 'Remove text from shape' : 'Add text to shape'}</button></>}
            {selected.type === 'card' && <><label>Title<input value={selected.title || ''} onChange={e => updateElement(selectedId, { title: e.target.value, titleHtml: '' })}/></label><label>Description<textarea value={selected.description || ''} onChange={e => updateElement(selectedId, { description: e.target.value, descriptionHtml: '' })}/></label><p className="helper-note">{STYLE_LOCK ? 'Fonts and colors follow the UAF design.' : 'Click the title or description on the card to style that text.'}</p>{!STYLE_LOCK && activeCardText && <><div className="section-label">Selected {activeCardText} style</div><label>Font size<input type="number" min="10" max="72" value={selected.cardTextStyles?.[activeCardText]?.fontSize || (activeCardText === 'title' ? 16 : 12)} onChange={e => updateElement(selectedId, { cardTextStyles: { ...selected.cardTextStyles, [activeCardText]: { ...selected.cardTextStyles?.[activeCardText], fontSize: `${Number(e.target.value)}px` } } })}/></label><label>Font family<select value={selected.cardTextStyles?.[activeCardText]?.fontFamily || 'sans-serif'} onChange={e => updateElement(selectedId, { cardTextStyles: { ...selected.cardTextStyles, [activeCardText]: { ...selected.cardTextStyles?.[activeCardText], fontFamily: e.target.value } } })}><option value="sans-serif">Sans serif</option><option value="serif">Serif</option><option value="monospace">Monospace</option></select></label><label>Font weight<select value={selected.cardTextStyles?.[activeCardText]?.fontWeight || '400'} onChange={e => updateElement(selectedId, { cardTextStyles: { ...selected.cardTextStyles, [activeCardText]: { ...selected.cardTextStyles?.[activeCardText], fontWeight: e.target.value } } })}><option value="400">Regular</option><option value="600">Semi-bold</option><option value="700">Bold</option><option value="900">Black</option></select></label><label>Text color<input type="color" value={selected.cardTextStyles?.[activeCardText]?.color || (activeCardText === 'title' ? '#0f172a' : '#475569')} onChange={e => updateElement(selectedId, { cardTextStyles: { ...selected.cardTextStyles, [activeCardText]: { ...selected.cardTextStyles?.[activeCardText], color: e.target.value } } })}/></label></>}</>}
            {selected.type === 'list' && <><label className="checkbox-label"><input type="checkbox" checked={selected.showBullets !== false} onChange={e => updateElement(selectedId, { showBullets: e.target.checked })}/> Show bullets / numbering</label><label>Bullet style<select value={selected.bulletStyle || 'disc'} onChange={e => updateElement(selectedId, { bulletStyle: e.target.value, showBullets: true })}><option value="disc">Filled circle</option><option value="circle">Hollow circle</option><option value="square">Square</option><option value="decimal">1, 2, 3</option><option value="lower-alpha">a, b, c</option><option value="upper-alpha">A, B, C</option><option value="lower-roman">i, ii, iii</option><option value="upper-roman">I, II, III</option><option value="check">Check marks</option></select></label><label>Checklist items<textarea value={(selected.items || []).join('\n')} placeholder="One item per line" onChange={e => updateElement(selectedId, { items: e.target.value.split('\n') })}/></label></>}
            {selected.type === 'input' && <><label>Field label<input value={selected.label || ''} onChange={e => updateElement(selectedId, { label: e.target.value })}/></label><label>Placeholder<input value={selected.placeholder || ''} onChange={e => updateElement(selectedId, { placeholder: e.target.value })}/></label><label>Field type<select value={selected.inputType || 'text'} onChange={e => updateElement(selectedId, { inputType: e.target.value })}><option value="text">Text</option><option value="email">Email</option><option value="select">Dropdown</option><option value="textarea">Multi-line text</option></select></label>{selected.inputType === 'select' && <label>Dropdown options<input value={selected.options || ''} onChange={e => updateElement(selectedId, { options: e.target.value })}/></label>}</>}
            {selected.type === 'video' && <><label>Video URL<input value={selected.isLocalVideo ? (selected.videoName || 'Video from computer') : (selected.videoUrl || '')} readOnly={!!selected.isLocalVideo} onChange={e => updateElement(selectedId, { videoUrl: e.target.value })} onBlur={e => !selected.isLocalVideo && e.target.value && setVideoUrl(e.target.value)}/></label><button className="small-action" onClick={chooseVideo}><Upload size={14}/> Upload video from computer</button></>}
          </div>
          <div className="inspector-card"><div className="section-label">Size & position{selected.fixed ? ' (fixed)' : ''}</div>{selected.fixed && <p className="helper-note">This part of the template is fixed so every page keeps the same header and footer. You can edit its text.</p>}<fieldset disabled={!!selected.fixed} className="plain-fieldset"><div className="number-grid"><label>Width<input type="number" min="60" value={selected.width || 260} onChange={e => updateElement(selectedId, { width: Number(e.target.value) })}/></label><label>Height<input type="number" min="36" value={selected.height || 100} onChange={e => updateElement(selectedId, { height: Number(e.target.value) })}/></label><label>Left<input type="number" min="0" value={selected.x || 0} onChange={e => updateElement(selectedId, { x: Number(e.target.value) })}/></label><label>Top<input type="number" min="0" value={selected.y || 0} onChange={e => updateElement(selectedId, { y: Number(e.target.value) })}/></label></div></fieldset></div>
          {STYLE_LOCK ? lockedStyleCard : <div className="inspector-card"><div className="section-label">Appearance</div><label>Background color<div className="color-input"><input type="color" value={selected.style?.bgColor?.startsWith('#') ? selected.style.bgColor : '#ffffff'} onChange={e => updateStyle('bgColor', e.target.value)}/><span>{selected.style?.bgColor || 'Transparent'}</span></div></label><label>Text color<div className="color-input"><input type="color" value={selected.style?.textColor || '#1e293b'} onChange={e => updateStyle('textColor', e.target.value)}/><span>{selected.style?.textColor || '#1e293b'}</span></div></label>{['image','card'].includes(selected.type) && <label>Image opacity<input type="range" min="0" max="100" value={selected.type === 'card' ? (selected.imageOpacity ?? 100) : (selected.opacity ?? 100)} onChange={e => updateElement(selectedId, selected.type === 'card' ? { imageOpacity: Number(e.target.value) } : { opacity: Number(e.target.value) })}/></label>}<label>Corner roundness<input type="range" min="0" max="36" value={selected.style?.borderRadius || 0} onChange={e => updateStyle('borderRadius', Number(e.target.value))}/></label>{selected.type !== 'image' && <div className="align-control"><button onClick={() => updateStyle('align','left')} title="Align left"><AlignLeft size={16}/></button><button onClick={() => updateStyle('align','center')} title="Align center"><AlignCenter size={16}/></button><button onClick={() => updateStyle('align','right')} title="Align right"><AlignRight size={16}/></button></div>}</div>}
          {!selected.fixed && <div className="inspector-card"><div className="section-label">Arrange</div><button className="small-action full-action" onClick={duplicateSelected}><Copy size={14}/> Duplicate this item</button></div>}
        </> : <><div className="inspector-card"><div className="section-label">Page details</div><label>Page name<input value={pageData.meta?.title || ''} onChange={e => { setPageData({ ...pageData, meta: { ...pageData.meta, title: e.target.value } }); setSaved(false); dirtyRef.current = true; }}/></label><label>Author / faculty<input value={pageData.meta?.author || ''} onChange={e => setPageData({ ...pageData, meta: { ...pageData.meta, author: e.target.value } })}/></label><label className="checkbox-label"><input type="checkbox" checked={pageData.meta?.allowPageScroll !== false} onChange={e => setPageData({ ...pageData, meta: { ...pageData.meta, allowPageScroll: e.target.checked } })}/> Allow vertical page scroll</label><p className="helper-note">When enabled, the page grows to fit its content and can scroll vertically in Preview.</p><p className="helper-note">Select anything on the canvas to change its text, size and position.{STYLE_LOCK ? ' Colors and fonts follow the UAF design.' : ''}</p></div><div className="inspector-card"><div className="section-label">Helpful tip</div><p className="helper-note">Keep headings clear and use images that represent your faculty. Save your design to Drafts to keep it on this device.</p></div></>}</div>
      </aside>
    </div>
          {shapePickerOpen && <div className="drawer-backdrop" onClick={() => setShapePickerOpen(false)}><section className="draft-drawer" onClick={e => e.stopPropagation()}><div className="drawer-header"><div><strong>Choose a shape</strong><span>Click any shape to add it to the canvas</span></div><button className="icon-button" onClick={() => setShapePickerOpen(false)}><X size={18}/></button></div><div className="shape-gallery">{['rectangle','rounded','circle','ellipse','pill','triangle','rightTriangle','diamond','parallelogram','parallelogramLeft','trapezoid','pentagon','hexagon','octagon','star5','star4','star6','arrow','chevron','cross','heart','cloud','speech','cylinder','wave','brace'].map(shape => { const clips = { triangle:'polygon(50% 0,0 100%,100% 100%)', rightTriangle:'polygon(0 0,0 100%,100% 100%)', diamond:'polygon(50% 0,100% 50%,50% 100%,0 50%)', parallelogram:'polygon(20% 0,100% 0,80% 100%,0 100%)', parallelogramLeft:'polygon(0 0,80% 0,100% 100%,20% 100%)', trapezoid:'polygon(20% 0,80% 0,100% 100%,0 100%)', pentagon:'polygon(50% 0,100% 38%,81% 100%,19% 100%,0 38%)', hexagon:'polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)', octagon:'polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)', star5:'polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 95%,50% 72%,21% 95%,32% 57%,2% 35%,39% 35%)', star4:'polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)', star6:'polygon(50% 0,65% 25%,93% 25%,78% 50%,93% 75%,65% 75%,50% 100%,35% 75%,7% 75%,22% 50%,7% 25%,35% 25%)', arrow:'polygon(0 25%,62% 25%,62% 0,100% 50%,62% 100%,62% 75%,0 75%)', chevron:'polygon(0 0,65% 0,100% 50%,65% 100%,0 100%,35% 50%)', cross:'polygon(35% 0,65% 0,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0 65%,0 35%,35% 35%)', heart:'polygon(50% 95%,8% 55%,0 35%,8% 15%,25% 8%,50% 28%,75% 8%,92% 15%,100% 35%,92% 55%)', cloud:'polygon(20% 80%,10% 70%,10% 55%,20% 45%,30% 45%,35% 25%,50% 15%,68% 25%,72% 42%,88% 42%,98% 55%,95% 72%,85% 80%)', speech:'polygon(0 0,100% 0,100% 75%,60% 75%,45% 100%,45% 75%,0 75%)', wave:'polygon(0 25%,25% 0,50% 25%,75% 0,100% 25%,100% 100%,0 100%)', brace:'polygon(30% 0,70% 0,60% 20%,60% 40%,80% 50%,60% 60%,60% 80%,70% 100%,30% 100%,40% 80%,40% 60%,20% 50%,40% 40%,40% 20%)' }; const round = ['circle','ellipse','pill'].includes(shape); return <button className="shape-option" key={shape} title={shape} onClick={() => { const el = createPrimitiveElement('container'); el.shapeType = shape; el.x = 72 + (elements.length % 4) * 28; el.y = 72 + (elements.length % 5) * 30; el.width = 240; el.height = 150; commit({ ...pageData, elements: [...elements, el] }); setSelectedId(el.id); setShapePickerOpen(false); }}><span className="shape-preview" style={{ clipPath: clips[shape], borderRadius: shape === 'circle' || shape === 'ellipse' ? '50%' : shape === 'pill' ? '999px' : shape === 'cylinder' ? '50% / 14%' : shape === 'rounded' ? 9 : 0, aspectRatio: ['circle','triangle','rightTriangle','diamond','star5','star4','star6','pentagon','hexagon','octagon','heart'].includes(shape) ? '1' : shape === 'ellipse' ? '1.5' : undefined, width: round ? 38 : 48 }} />{shape}</button>})}</div></section></div>}
    {draftsOpen && <div className="drawer-backdrop" onClick={() => setDraftsOpen(false)}><section className="draft-drawer" onClick={e => e.stopPropagation()}><div className="drawer-header"><div><strong>Your drafts</strong><span>Pick up where you left off</span></div><button className="icon-button" onClick={() => setDraftsOpen(false)}><X size={18}/></button></div>{drafts.length ? <div className="draft-list">{drafts.map(draft => <div className="draft-row" key={draft.id}><button className="draft-row-open" onClick={() => openDraft(draft)}><span className="draft-thumb"><b>{draft.data.elements?.length || 0}</b><small>items</small></span><span className="draft-info"><b>{draft.title}</b><small>Edited {new Date(draft.updatedAt).toLocaleString()}</small></span><span className="draft-open">Open →</span></button><button className="icon-button draft-delete" title={`Delete ${draft.title}`} aria-label={`Delete ${draft.title}`} onClick={e => deleteDraft(e, draft.id)}><Trash2 size={15}/></button></div>)}</div> : <div className="draft-empty"><FolderOpen size={28}/><b>No drafts yet</b><span>Save a design to Drafts to find it here.</span></div>}<button className="button button-light drawer-new" onClick={() => saveDraftSnapshot()}><Save size={15}/> Save current page to Drafts</button><button className="button button-primary drawer-new" onClick={newPage}><Plus size={16}/> Start a new page</button></section></div>}
    {templatesOpen && <TemplatePicker hasContent={elements.length > 0} onPick={applyTemplate} onBlank={() => { setTemplatesOpen(false); newPage(); }} onClose={() => setTemplatesOpen(false)} />}
    {toast && <div className="builder-toast"><Check size={15}/>{toast}</div>}
  </div>;
}
