'use client';

import React from 'react';
import { STYLE_LOCK, themeElement, cleanRich, pastePlain, FONT } from '../lib/uafTheme';

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const richMarkup = (markup, plain) => cleanRich(markup) || escapeHtml(plain || '').replace(/\n/g, '<br>');
import { 
  ArrowRight, 
  Download, 
  Send, 
  Check, 
  Phone, 
  Mail, 
  Link as LinkIcon, 
  ExternalLink,
  CheckCircle2,
  Dot,
  GraduationCap,
  Sparkles,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2
} from 'lucide-react';

function PrimitiveRenderer({ 
  el: rawEl, 
  isEditing = false, 
  onSelect = null, 
  isSelected = false,
  onChange = null, // Callback to update element directly from canvas handles
  onRequestImage = null,
  onRequestVideo = null
}) {
  if (!rawEl) return null;
  // With STYLE_LOCK on, colors / fonts / sizes always come from the UAF brand theme.
  const el = themeElement(rawEl);
  const canEditContent = isEditing && !el.fixed;
  const pasteProps = isEditing && STYLE_LOCK ? { onPaste: pastePlain } : {};

  const s = el.style || {};

  // Build inline style object for exact visual control
  const inlineStyle = {
    backgroundColor: s.bgColor || 'transparent',
    color: s.textColor || '#0f172a',
    borderColor: s.borderColor || 'transparent',
    borderWidth: `${s.borderWidth || 0}px`,
    borderStyle: s.borderWidth > 0 ? 'solid' : 'none',
    borderRadius: s.shape === 'circle' ? '9999px' : `${s.borderRadius ?? 8}px`,
    paddingTop: `${s.paddingTop ?? 12}px`,
    paddingBottom: `${s.paddingBottom ?? 12}px`,
    paddingLeft: `${s.paddingLeft ?? CommonPadding(el.type)}px`,
    paddingRight: `${s.paddingRight ?? CommonPadding(el.type)}px`,
    marginTop: `${s.marginTop ?? 0}px`,
    marginBottom: `${s.marginBottom ?? 0}px`,
    textAlign: s.align || 'left',
    ...(STYLE_LOCK ? { fontFamily: FONT.body } : {}),
  };

  // Shadow helper
  let shadowClass = '';
  switch(s.shadow) {
    case 'sm': shadowClass = 'shadow-sm'; break;
    case 'md': shadowClass = 'shadow-md'; break;
    case 'lg': shadowClass = 'shadow-lg'; break;
    case 'xl': shadowClass = 'shadow-xl'; break;
    default: shadowClass = '';
  }

  // Icon picker helper
  const renderIcon = (name) => {
    switch(name) {
      case 'ArrowRight': return <ArrowRight className="w-4 h-4 inline ml-1.5" />;
      case 'Download': return <Download className="w-4 h-4 inline ml-1.5" />;
      case 'Send': return <Send className="w-4 h-4 inline ml-1.5" />;
      case 'Check': return <Check className="w-4 h-4 inline ml-1.5" />;
      case 'Phone': return <Phone className="w-4 h-4 inline ml-1.5" />;
      case 'Mail': return <Mail className="w-4 h-4 inline ml-1.5" />;
      case 'Link': return <LinkIcon className="w-4 h-4 inline ml-1.5" />;
      default: return null;
    }
  };

  // Helper for Canvas updates
  const updateProp = (key, val) => {
    if (onChange) onChange(el.id, key, val);
  };

  const updateStyle = (key, val) => {
    if (onChange) {
      onChange(el.id, 'style', {
        ...(el.style || {}),
        [key]: val
      });
    }
  };
  const updateRich = (htmlKey, textKey, event) => {
    if (onChange) onChange(el.id, { [htmlKey]: cleanRich(event.currentTarget.innerHTML), [textKey]: event.currentTarget.textContent });
  };

  const renderPrimitive = () => {
    switch (el.type) {
      case 'text': {
        const fontPx = `${el.fontSize || 16}px`;
        const fontW = el.fontWeight === 'bold' ? '700' : el.fontWeight === 'semibold' ? '600' : el.fontWeight === 'black' ? '900' : '400';
        const Tag = el.tag || 'p';

        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all`}>
            {
              <Tag 
                style={{ fontSize: fontPx, fontWeight: fontW, lineHeight: el.lineHeight || '1.4', letterSpacing: el.letterSpacing, textTransform: el.textTransform, fontFamily: el.fontFamily || 'Arial, sans-serif' }}
              >
                <span data-inline-editor={canEditContent ? '' : undefined} data-rich-editor={canEditContent ? '' : undefined} data-placeholder={canEditContent && !el.text && !el.richHtml ? 'Click here to add text' : undefined} contentEditable={canEditContent} {...pasteProps} suppressContentEditableWarning role={canEditContent ? 'textbox' : undefined} aria-label={canEditContent ? 'Edit text' : undefined} onBlur={e => canEditContent && updateRich('richHtml', 'text', e)} style={{ display: 'block', minHeight: '1.4em', outline: 'none' }} dangerouslySetInnerHTML={{ __html: richMarkup(el.richHtml, el.text) }} />
              </Tag>
            }
          </div>
        );
      }

      case 'hyperlink': {
        const fontPx = `${el.fontSize || 16}px`;
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all`}>
            <a 
              href={el.url || '#'} 
              target="_blank" 
              rel="noreferrer"
              style={{ fontSize: fontPx, ...(STYLE_LOCK ? { color: s.textColor, fontFamily: FONT.body } : {}) }}
              className={`font-semibold ${STYLE_LOCK ? 'hover:opacity-80' : 'text-agri-600 hover:text-agri-700'} transition inline-flex items-center gap-1 ${el.showUnderline ? 'underline' : ''}`}
              onClick={e => { if (isEditing) e.preventDefault(); }}
            >
              <span data-inline-editor={canEditContent ? '' : undefined} data-rich-editor={canEditContent ? '' : undefined} data-placeholder={canEditContent && !el.text && !el.richHtml ? 'Click to add link text' : undefined} contentEditable={canEditContent} {...pasteProps} suppressContentEditableWarning onBlur={e => canEditContent && updateRich('richHtml', 'text', e)} style={{ outline: 'none' }} dangerouslySetInnerHTML={{ __html: richMarkup(el.richHtml, el.text) }} />
              {el.showExternalIcon && <ExternalLink className="w-3.5 h-3.5 inline" />}
            </a>
          </div>
        );
      }

      case 'list': {
        const items = Array.isArray(el.items) ? el.items : [];
        const listPrefix = (index) => {
          if (el.showBullets === false) return '';
          if (el.bulletStyle === 'check') return '✓ ';
          if (el.bulletStyle === 'decimal') return `${index + 1}. `;
          if (el.bulletStyle === 'lower-alpha') return `${String.fromCharCode(97 + index)}. `;
          if (el.bulletStyle === 'upper-alpha') return `${String.fromCharCode(65 + index)}. `;
          if (el.bulletStyle === 'lower-roman') return `${['i','ii','iii','iv','v','vi','vii','viii','ix','x'][index] || `${index + 1}`}. `;
          if (el.bulletStyle === 'upper-roman') return `${(['i','ii','iii','iv','v','vi','vii','viii','ix','x'][index] || `${index + 1}`).toUpperCase()}. `;
          if (el.bulletStyle === 'square') return '▪ ';
          if (el.bulletStyle === 'circle') return '◦ ';
          if (el.bulletStyle === 'none') return '';
          return '• ';
        };
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-2`}>
            {el.title && <h4 className="font-bold text-sm text-slate-800 mb-2" style={el.titleStyle}>{el.title}</h4>}
            <div data-inline-editor={canEditContent ? '' : undefined} data-placeholder={canEditContent && !items.length ? 'Click here to add checklist items' : undefined} contentEditable={canEditContent} {...pasteProps} suppressContentEditableWarning role={canEditContent ? 'textbox' : undefined} aria-label={canEditContent ? 'Edit checklist' : undefined} onBlur={e => canEditContent && updateProp('items', e.currentTarget.innerText.split('\n').filter(Boolean).map(line => el.showBullets === false ? line : line.replace(/^(✓|▪|◦|•|\d+\.|[a-zA-Z]+\.)\s*/, '')))} style={{ minHeight: '1.5em', outline: 'none', color: '#334155', whiteSpace: 'pre-line', fontSize: 12, lineHeight: 1.8 }}>{items.map((item, index) => `${listPrefix(index)}${item}`).join('\n')}</div>
          </div>
        );
      }

      case 'card': {
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-3`}>
            <button type="button" data-card-image className="h-32 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center" onClick={e => { e.stopPropagation(); onRequestImage?.(el.id); }} style={{ ...(!isEditing && !el.imageUrl ? { display: 'none' } : {}), width:'100%', cursor: 'pointer', color: '#aeb8c2', border: el.imageUrl ? 0 : '1px dashed #cbd5e1' }}>{el.imageUrl ? <img src={el.imageUrl} alt={el.title || ''} className="w-full h-full object-cover" style={{ opacity: (el.imageOpacity ?? 100) / 100 }} /> : isEditing ? 'Click here to add card image' : ''}</button>
            <div className="space-y-1.5">
              {el.badgeTag && (
                <span className="bg-agri-100 text-agri-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                  {el.badgeTag}
                </span>
              )}
              <h3 data-card-text="title" data-inline-editor={canEditContent ? '' : undefined} data-rich-editor={canEditContent ? '' : undefined} data-placeholder={canEditContent && !el.title && !el.titleHtml ? 'Click here to add card title' : undefined} contentEditable={canEditContent} {...pasteProps} suppressContentEditableWarning onBlur={e => canEditContent && updateRich('titleHtml', 'title', e)} className="font-bold text-base text-slate-900 mt-1" style={{ minHeight: canEditContent ? '1.4em' : undefined, outline: 'none', ...(el.titleStyle || {}), ...(el.cardTextStyles?.title || {}) }} dangerouslySetInnerHTML={{ __html: richMarkup(el.titleHtml, el.title) }} />
              <p data-card-text="description" data-inline-editor={canEditContent ? '' : undefined} data-rich-editor={canEditContent ? '' : undefined} data-placeholder={canEditContent && !el.description && !el.descriptionHtml ? 'Click here to add card text' : undefined} contentEditable={canEditContent} {...pasteProps} suppressContentEditableWarning onBlur={e => canEditContent && updateRich('descriptionHtml', 'description', e)} className="text-xs text-slate-600 leading-relaxed" style={{ minHeight: canEditContent ? '1.4em' : undefined, outline: 'none', ...(el.descStyle || {}), ...(el.cardTextStyles?.description || {}) }} dangerouslySetInnerHTML={{ __html: richMarkup(el.descriptionHtml, el.description) }} />
            </div>
            {el.buttonLabel && (
              <button className="w-full py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl shadow transition">
                {el.buttonLabel}
              </button>
            )}
          </div>
        );
      }

      case 'button': {
        return (
          <div style={{ textAlign: s.align || 'left', marginTop: `${s.marginTop || 0}px`, marginBottom: `${s.marginBottom || 0}px`, width: '100%', height: '100%', minHeight: 'inherit', display: 'flex' }}>
            <button 
              aria-disabled={!el.label}
              style={{
                backgroundColor: s.bgColor || '#16a34a',
                color: el.label ? (s.textColor || '#ffffff') : '#d1d5db',
                width: '100%',
                height: `${el.height || 42}px`,
                borderColor: s.borderColor || 'transparent',
                borderWidth: `${s.borderWidth || 0}px`,
                borderStyle: s.borderWidth > 0 ? 'solid' : 'none',
                borderRadius: `${s.borderRadius ?? 10}px`,
                paddingTop: `${s.paddingTop ?? 8}px`,
                paddingBottom: `${s.paddingBottom ?? 8}px`,
                paddingLeft: `${s.paddingLeft ?? 16}px`,
                paddingRight: `${s.paddingRight ?? 16}px`,
                ...(el.fontSize ? { fontSize: `${el.fontSize}px` } : {}),
                ...(el.fontFamily ? { fontFamily: el.fontFamily } : {}),
              }}
              className={`font-bold text-xs ${STYLE_LOCK ? '' : 'shadow-md'} hover:opacity-90 active:scale-95 transition inline-flex items-center justify-center ${shadowClass}`}
            >
            <span data-inline-editor={canEditContent ? '' : undefined} data-rich-editor={canEditContent ? '' : undefined} data-placeholder={canEditContent && !el.label && !el.richHtml ? 'Write text here' : undefined} contentEditable={canEditContent} {...pasteProps} suppressContentEditableWarning onBlur={e => canEditContent && updateRich('richHtml', 'label', e)} style={{ outline: 'none' }} dangerouslySetInnerHTML={{ __html: richMarkup(el.richHtml, el.label) }} />
              {renderIcon(el.iconName)}
            </button>
          </div>
        );
      }

      case 'image': {
        const h = el.height ? `${el.height}px` : '260px';
        const imgRadius = el.shape === 'circle' ? '9999px' : el.shape === 'oval' ? '50%' : `${s.borderRadius ?? 12}px`;

        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-1.5`}>
            <div 
              style={{ height: h, borderRadius: imgRadius }} 
              className="overflow-hidden bg-slate-200 relative group"
            >
              {el.src ? <img 
                src={el.src} 
                alt={el.alt || 'University Image'} 
                style={{ objectFit: el.objectFit || 'cover', opacity: (el.opacity ?? 100) / 100 }}
                className="w-full h-full"
              /> : <button type="button" onClick={e => { e.stopPropagation(); onRequestImage?.(el.id); }} className="w-full h-full flex items-center justify-center text-sm" style={{ color: '#aeb8c2', border: '1px dashed #cbd5e1', background:'transparent', cursor:'pointer' }}>{isEditing ? 'Click here to add image' : ''}</button>}
            </div>
            {el.caption && (
              <p className="text-[11px] text-slate-500 italic text-center font-medium">{el.caption}</p>
            )}
          </div>
        );
      }

      case 'container': {
        const shapeClips = { triangle: 'polygon(50% 0, 0 100%, 100% 100%)', rightTriangle: 'polygon(0 0,0 100%,100% 100%)', diamond: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)', parallelogram: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)', trapezoid: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)', pentagon: 'polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%)', hexagon: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)', octagon: 'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)', star5: 'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 95%, 50% 72%, 21% 95%, 32% 57%, 2% 35%, 39% 35%)', star4: 'polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)', star6: 'polygon(50% 0,65% 25%,93% 25%,78% 50%,93% 75%,65% 75%,50% 100%,35% 75%,7% 75%,22% 50%,7% 25%,35% 25%)', arrow: 'polygon(0 25%, 62% 25%, 62% 0, 100% 50%, 62% 100%, 62% 75%, 0 75%)', chevron: 'polygon(0 0, 65% 0, 100% 50%, 65% 100%, 0 100%, 35% 50%)', cross: 'polygon(35% 0, 65% 0, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%, 0 35%, 35% 35%)', heart: 'polygon(50% 95%, 8% 55%, 0 35%, 8% 15%, 25% 8%, 50% 28%, 75% 8%, 92% 15%, 100% 35%, 92% 55%)', cloud: 'polygon(20% 80%, 10% 70%, 10% 55%, 20% 45%, 30% 45%, 35% 25%, 50% 15%, 68% 25%, 72% 42%, 88% 42%, 98% 55%, 95% 72%, 85% 80%)', speech: 'polygon(0 0,100% 0,100% 75%,60% 75%,45% 100%,45% 75%,0 75%)', wave: 'polygon(0 25%,25% 0,50% 25%,75% 0,100% 25%,100% 100%,0 100%)', brace: 'polygon(30% 0,70% 0,60% 20%,60% 40%,80% 50%,60% 60%,60% 80%,70% 100%,30% 100%,40% 80%,40% 60%,20% 50%,40% 40%,40% 20%)', parallelogramLeft: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)' };
        return (
          <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}><div aria-hidden="true" style={{ ...inlineStyle, position: 'absolute', inset: 0, borderRadius: ['circle','ellipse'].includes(el.shapeType) ? '50%' : el.shapeType === 'pill' ? '999px' : el.shapeType === 'cylinder' ? '50% / 14%' : el.shapeType === 'rounded' ? 18 : inlineStyle.borderRadius, clipPath: shapeClips[el.shapeType], aspectRatio: ['circle','diamond','triangle','rightTriangle','star5','star4','star6','pentagon','hexagon','octagon','heart'].includes(el.shapeType) ? '1' : el.shapeType === 'ellipse' ? '1.5' : undefined }} />{(el.shapeTextEnabled || el.shapeText) && <span data-inline-editor={canEditContent ? '' : undefined} data-rich-editor={canEditContent ? '' : undefined} contentEditable={canEditContent} {...pasteProps} suppressContentEditableWarning onBlur={e => updateRich('shapeHtml', 'shapeText', e)} style={{ position: 'relative', zIndex: 1, minWidth: '1em', outline: 'none', textAlign: 'center', color: s.textColor || '#1e293b' }} dangerouslySetInnerHTML={{ __html: richMarkup(el.shapeHtml, el.shapeText) }} />}</div>
        );
      }

      case 'input': {
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-1`}>
            {el.label && <label className="block text-xs font-bold text-slate-700">{el.label}</label>}
            {el.inputType === 'textarea' ? (
              <textarea 
                rows="3" 
                placeholder={el.placeholder} 
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            ) : el.inputType === 'select' ? (
              <select className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-500">
                {(el.options || 'Option 1, Option 2').split(',').map((opt, i) => (
                  <option key={i}>{opt.trim()}</option>
                ))}
              </select>
            ) : (
              <input 
                type={el.inputType === 'email' ? 'email' : 'text'}
                placeholder={el.placeholder} 
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            )}
          </div>
        );
      }

      case 'video': {
        const h = el.height ? `${el.height}px` : '320px';
        const isPlayableFile = el.isLocalVideo || /\.(mp4|webm|ogg|mov)(?:[?#]|$)/i.test(el.videoUrl || '') || /^data:video\//i.test(el.videoUrl || '');
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all overflow-hidden`}>
            <div style={{ height: h }} className="bg-black rounded-xl overflow-hidden relative">
              {el.videoUrl && isPlayableFile ? <video src={el.videoUrl} controls className="w-full h-full object-contain" /> : el.videoUrl ? <iframe 
                src={el.videoUrl} 
                title={el.title || 'Video'} 
                className="w-full h-full border-0" 
                allowFullScreen 
              /> : <button type="button" onClick={e => { e.stopPropagation(); onRequestVideo?.(el.id); }} className="w-full h-full flex items-center justify-center text-sm" style={{ color: '#d1d5db', cursor: 'pointer', background:'transparent', border:0 }}>{isEditing ? 'Click here to add video' : ''}</button>}
            </div>
          </div>
        );
      }

      case 'divider': {
        return (
          <div style={inlineStyle} className="my-2">
            <hr style={{ borderColor: s.borderColor || '#cbd5e1', borderWidth: `${el.thickness || 2}px`, borderStyle: el.lineStyle || 'solid' }} />
          </div>
        );
      }

      default:
        return <div className="p-3 text-xs border">Generic Element</div>;
    }
  };

  function CommonPadding(t) {
    if (t === 'text' || t === 'divider' || t === 'hyperlink') return 4;
    return 16;
  }

  return (
    <div 
      onClick={isEditing && onSelect ? () => onSelect(el.id) : undefined}
      className={`transition-all relative ${
        isEditing ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500' : ''
      } ${isEditing && isSelected ? 'outline outline-4 outline-agri-600 outline-offset-2 ring-2 ring-agri-500 z-10 shadow-lg' : ''}`}
    >
      {renderPrimitive()}

      {/* DIRECT ON-CANVAS HANDLES (SIZE, SHAPE & POSITION CONTROLS) */}
      {isEditing && isSelected && onChange && !STYLE_LOCK && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="bg-slate-900 text-white p-2 rounded-xl shadow-2xl border border-slate-700 flex flex-wrap items-center gap-3 text-xs mt-2 z-40 select-none animate-fadeIn"
        >
          {/* Direct Size Slider Handle */}
          {(el.type === 'text' || el.type === 'hyperlink') && (
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Size:</span>
              <input 
                type="range" min="12" max="56" step="2"
                value={el.fontSize || 16}
                onChange={(e) => updateProp('fontSize', parseInt(e.target.value))}
                className="w-20 accent-agri-500"
              />
              <span className="text-[10px] font-mono text-agri-400">{el.fontSize || 16}px</span>
            </div>
          )}

          {(el.type === 'image' || el.type === 'video') && (
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Height:</span>
              <input 
                type="range" min="120" max="600" step="20"
                value={el.height || 260}
                onChange={(e) => updateProp('height', parseInt(e.target.value))}
                className="w-24 accent-agri-500"
              />
              <span className="text-[10px] font-mono text-agri-400">{el.height || 260}px</span>
            </div>
          )}

          {/* Direct Shape Handles */}
          <div className="flex items-center space-x-1 border-l border-slate-700 pl-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Shape:</span>
            <button 
              onClick={() => updateStyle('borderRadius', 0)}
              className={`p-1 rounded text-[10px] border ${s.borderRadius === 0 ? 'bg-agri-600 border-agri-500 text-white font-bold' : 'border-slate-700 text-slate-400 hover:text-white'}`}
              title="Square Corners"
            >
              Square
            </button>
            <button 
              onClick={() => updateStyle('borderRadius', 12)}
              className={`p-1 rounded text-[10px] border ${s.borderRadius === 12 ? 'bg-agri-600 border-agri-500 text-white font-bold' : 'border-slate-700 text-slate-400 hover:text-white'}`}
              title="Rounded Corners"
            >
              Rounded
            </button>
            <button 
              onClick={() => updateStyle('borderRadius', 999)}
              className={`p-1 rounded text-[10px] border ${s.borderRadius === 999 ? 'bg-agri-600 border-agri-500 text-white font-bold' : 'border-slate-700 text-slate-400 hover:text-white'}`}
              title="Pill / Circle"
            >
              Pill
            </button>
          </div>

          {/* Direct Alignment Handles */}
          <div className="flex items-center space-x-1 border-l border-slate-700 pl-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Align:</span>
            <button 
              onClick={() => updateStyle('align', 'left')}
              className={`p-1 rounded ${s.align === 'left' ? 'bg-agri-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Align Left"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => updateStyle('align', 'center')}
              className={`p-1 rounded ${s.align === 'center' ? 'bg-agri-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Align Center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => updateStyle('align', 'right')}
              className={`p-1 rounded ${s.align === 'right' ? 'bg-agri-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Align Right"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(PrimitiveRenderer, (previous, next) => previous.el === next.el && previous.isEditing === next.isEditing);
