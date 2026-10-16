'use client';

import React from 'react';
import { STYLE_LOCK, themeElement, cleanRich, pastePlain, FONT } from './uafTheme';
import { PrimitiveElement } from './elementPrimitives';
import {
  ArrowRight,
  Download,
  Send,
  Check,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Link as LinkIcon,
  ExternalLink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Tag,
  Plus,
  Trash2,
  Search
} from 'lucide-react';

const escapeHtml = (value: any) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char)
  );

const richMarkup = (markup?: string, plain?: string) =>
  cleanRich(markup || '') || escapeHtml(plain || '').replace(/\n/g, '<br>');

interface PrimitiveRendererProps {
  el: PrimitiveElement;
  isEditing?: boolean;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  onChange?: (id: string, key: string | Record<string, any>, value?: any) => void;
  onRequestImage?: (id: string) => void;
  onRequestVideo?: (id: string) => void;
  onHyperlinkClick?: (el: PrimitiveElement, event: React.MouseEvent<HTMLAnchorElement>) => void;
  preserveStyleColors?: boolean;
}

export const PrimitiveRenderer: React.FC<PrimitiveRendererProps> = ({
  el: rawEl,
  isEditing = false,
  onSelect,
  isSelected = false,
  onChange,
  onRequestImage,
  onRequestVideo,
  onHyperlinkClick,
  preserveStyleColors = false
}) => {
  if (!rawEl) return null;
  const el = themeElement(rawEl);
  const canEditContent = isEditing && !el.fixed;
  const pasteProps = isEditing && STYLE_LOCK ? { onPaste: pastePlain } : {};

  const s = el.style || {};

  function commonPadding(t?: string) {
    if (t === 'text' || t === 'divider' || t === 'hyperlink') return 4;
    return 16;
  }

  const inlineStyle: React.CSSProperties = {
    backgroundColor: s.bgColor || 'transparent',
    color: s.textColor || '#18212b',
    borderColor: s.borderColor || 'transparent',
    borderWidth: `${s.borderWidth || 0}px`,
    borderStyle: s.borderWidth > 0 ? 'solid' : 'none',
    borderRadius: s.shape === 'circle' ? '9999px' : `${s.borderRadius ?? 8}px`,
    paddingTop: `${s.paddingTop ?? 12}px`,
    paddingBottom: `${s.paddingBottom ?? 12}px`,
    paddingLeft: `${s.paddingLeft ?? commonPadding(el.type)}px`,
    paddingRight: `${s.paddingRight ?? commonPadding(el.type)}px`,
    marginTop: `${s.marginTop ?? 0}px`,
    marginBottom: `${s.marginBottom ?? 0}px`,
    textAlign: s.align || 'left',
    ...(STYLE_LOCK ? { fontFamily: FONT.body } : {})
  };

  let shadowClass = '';
  switch (s.shadow) {
    case 'sm':
      shadowClass = 'shadow-xs';
      break;
    case 'md':
      shadowClass = 'shadow-md';
      break;
    case 'lg':
      shadowClass = 'shadow-lg';
      break;
    case 'xl':
      shadowClass = 'shadow-xl';
      break;
    default:
      shadowClass = '';
  }

  const renderIcon = (name?: string) => {
    switch (name) {
      case 'ArrowRight':
        return <ArrowRight className="w-4 h-4 inline ml-1.5" />;
      case 'Download':
        return <Download className="w-4 h-4 inline ml-1.5" />;
      case 'Send':
        return <Send className="w-4 h-4 inline ml-1.5" />;
      case 'Check':
        return <Check className="w-4 h-4 inline ml-1.5" />;
      case 'Phone':
        return <Phone className="w-4 h-4 inline ml-1.5" />;
      case 'Mail':
        return <Mail className="w-4 h-4 inline ml-1.5" />;
      case 'Link':
        return <LinkIcon className="w-4 h-4 inline ml-1.5" />;
      case 'Search':
        return <Search className="w-4 h-4 inline ml-1.5 text-[#e8a62a]" />;
      default:
        return null;
    }
  };

  const socialIconClass: Record<string, string> = {
    Facebook: 'fa-brands fa-facebook-f',
    Instagram: 'fa-brands fa-instagram',
    LinkedIn: 'fa-brands fa-linkedin-in',
    YouTube: 'fa-brands fa-youtube'
  };
  const renderLinkIcon = (name?: string) => {
    if (!name) return null;
    if (socialIconClass[name]) return <i className={socialIconClass[name]} aria-hidden="true" />;
    const iconClass = 'w-4 h-4 shrink-0';
    switch (name) {
      case 'ChevronRight': return <ChevronRight className={`${iconClass} text-blue-200`} aria-hidden="true" />;
      case 'MapPin': return <MapPin className={`${iconClass} text-[#e8a62a]`} aria-hidden="true" />;
      case 'Phone': return <Phone className={`${iconClass} text-blue-200`} aria-hidden="true" />;
      case 'Mail': return <Mail className={`${iconClass} text-blue-200`} aria-hidden="true" />;
      default: return null;
    }
  };

  const updateProp = (key: string, val: any) => {
    if (onChange) onChange(el.id, key, val);
  };

  const updateStyle = (key: string, val: any) => {
    if (onChange) {
      onChange(el.id, 'style', {
        ...(el.style || {}),
        [key]: val
      });
    }
  };

  const updateRich = (htmlKey: string, textKey: string, event: React.FocusEvent<HTMLElement>) => {
    if (onChange) {
      onChange(el.id, {
        [htmlKey]: cleanRich(event.currentTarget.innerHTML),
        [textKey]: event.currentTarget.textContent
      });
    }
  };

  const renderPrimitive = () => {
    switch (el.type) {
      case 'text': {
        const fontPx = `${el.fontSize || 16}px`;
        const fontW =
          el.fontWeight === 'bold'
            ? '700'
            : el.fontWeight === 'semibold'
            ? '600'
            : el.fontWeight === 'black'
            ? '900'
            : '400';
        const Tag: any = el.tag || 'p';

        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all`}>
            <Tag
              style={{
                fontSize: fontPx,
                fontWeight: fontW,
                lineHeight: el.lineHeight || '1.4',
                letterSpacing: el.letterSpacing,
                textTransform: el.textTransform as any,
                fontFamily: el.fontFamily || 'inherit'
              }}
            >
              <span
                data-inline-editor={canEditContent ? '' : undefined}
                data-rich-editor={canEditContent ? '' : undefined}
                data-placeholder={canEditContent && !el.text && !el.richHtml ? 'Click to edit text' : undefined}
                contentEditable={canEditContent}
                {...pasteProps}
                suppressContentEditableWarning
                role={canEditContent ? 'textbox' : undefined}
                onBlur={(e: React.FocusEvent<HTMLElement>) => canEditContent && updateRich('richHtml', 'text', e)}
                style={{ display: 'block', minHeight: '1.4em', outline: 'none' }}
                dangerouslySetInnerHTML={{ __html: richMarkup(el.richHtml, el.text) }}
              />
            </Tag>
          </div>
        );
      }

      case 'hyperlink': {
        const fontPx = `${el.fontSize || 16}px`;
        const isSocialLink = !!socialIconClass[el.iconName || ''];
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all`}>
            <a
              href={el.url || '#'}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: fontPx,
                ...(STYLE_LOCK || preserveStyleColors ? { color: s.textColor, ...(STYLE_LOCK ? { fontFamily: FONT.body } : {}) } : {})
              }}
              className={`${el.fontWeight ? (el.fontWeight >= 600 ? 'font-semibold' : 'font-normal') : 'font-semibold'} ${preserveStyleColors ? '' : 'text-black'} hover:text-blue-700 transition ${isSocialLink ? 'w-full h-full flex items-center justify-center text-white text-sm' : 'inline-flex items-center gap-1.5'} ${
                el.showUnderline ? 'underline' : ''
              }`}
              onClick={(e) => {
                if (onHyperlinkClick) onHyperlinkClick(el, e);
                else if (isEditing) e.preventDefault();
              }}
            >
              {renderLinkIcon(el.iconName)}
              <span
                data-inline-editor={canEditContent ? '' : undefined}
                data-rich-editor={canEditContent ? '' : undefined}
                data-placeholder={canEditContent && !el.text && !el.richHtml ? 'Click to add link' : undefined}
                contentEditable={canEditContent}
                {...pasteProps}
                suppressContentEditableWarning
                onBlur={(e) => canEditContent && updateRich('richHtml', 'text', e)}
                style={{ outline: 'none' }}
                dangerouslySetInnerHTML={{ __html: richMarkup(el.richHtml, el.text) }}
              />
              {el.showExternalIcon && <ExternalLink className="w-3.5 h-3.5 inline ml-0.5" />}
            </a>
          </div>
        );
      }

      case 'list': {
        const items = Array.isArray(el.items) ? el.items : [];
        const listPrefix = (index: number) => {
          if (el.showBullets === false) return '';
          if (el.bulletStyle === 'check') return '✓ ';
          if (el.bulletStyle === 'decimal') return `${index + 1}. `;
          if (el.bulletStyle === 'lower-alpha') return `${String.fromCharCode(97 + index)}. `;
          if (el.bulletStyle === 'upper-alpha') return `${String.fromCharCode(65 + index)}. `;
          if (el.bulletStyle === 'square') return '▪ ';
          if (el.bulletStyle === 'circle') return '◦ ';
          if (el.bulletStyle === 'none') return '';
          return '• ';
        };
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-2`}>
            {el.title && (
              <h4 className="font-bold text-sm text-[#071b2d] mb-2" style={el.titleStyle}>
                {el.title}
              </h4>
            )}
            <div
              data-inline-editor={canEditContent ? '' : undefined}
              data-placeholder={canEditContent && !items.length ? 'Click to add checklist items' : undefined}
              contentEditable={canEditContent}
              {...pasteProps}
              suppressContentEditableWarning
              role={canEditContent ? 'textbox' : undefined}
              onBlur={(e) =>
                canEditContent &&
                updateProp(
                  'items',
                  e.currentTarget.innerText
                    .split('\n')
                    .filter(Boolean)
                    .map((line) =>
                      el.showBullets === false ? line : line.replace(/^(✓|▪|◦|•|\d+\.|[a-zA-Z]+\.)\s*/, '')
                    )
                )
              }
              style={{
                minHeight: '1.5em',
                outline: 'none',
                color: '#334155',
                whiteSpace: 'pre-line',
                fontSize: 13,
                lineHeight: 1.8
              }}
            >
              {items.map((item: string, index: number) => `${listPrefix(index)}${item}`).join('\n')}
            </div>
          </div>
        );
      }

      case 'table': {
        const columns = el.tableColumns || [
          { key: 'srNo', label: 'Sr. #', width: '80px' },
          { key: 'title', label: 'Paper Name', width: '48%' },
          { key: 'venue', label: 'Journal Name', width: '32%' },
          { key: 'url', label: 'Link', width: '120px' }
        ];
        const rows = Array.isArray(el.tableRows) ? el.tableRows : [];

        const handleCellEdit = (rowIndex: number, colKey: string, value: string) => {
          if (!canEditContent) return;
          const updated = rows.map((r: Record<string, any>, i: number) => (i === rowIndex ? { ...r, [colKey]: value } : r));
          updateProp('tableRows', updated);
        };

        const handleAddRow = () => {
          if (!canEditContent) return;
          const newSrNo = String(rows.length + 1).padStart(2, '0');
          const newRow = {
            srNo: newSrNo,
            title: 'New Scholarly Research Paper Title',
            venue: 'Pakistan Journal of Agricultural Sciences (Springer)',
            url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
          };
          updateProp('tableRows', [...rows, newRow]);
        };

        const handleDeleteRow = (rowIndex: number) => {
          if (!canEditContent) return;
          const updated = rows.filter((_: Record<string, any>, i: number) => i !== rowIndex);
          updateProp('tableRows', updated);
        };

        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-3 w-full`}>
            {el.tableTitle && (
              <h4 className="font-bold text-base sm:text-lg text-[#071b2d] flex items-center justify-between pb-1">
                <span>{el.tableTitle}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-black border border-blue-200">
                  {rows.length} Total Papers
                </span>
              </h4>
            )}
            <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#071b2d] text-white border-b border-stone-200">
                    {columns.map((col: { key: string; label: string; width?: string }, idx: number) => (
                      <th
                        key={idx}
                        style={{ width: col.width }}
                        className={`py-3.5 px-4 font-bold tracking-wide uppercase text-[11px] ${
                          col.key === 'srNo' ? 'text-center' : ''
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                    {canEditContent && <th className="py-3.5 px-3 text-right text-[11px] w-12">Action</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {rows.map((row: Record<string, any>, rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-amber-50/20 transition-colors">
                      {columns.map((col: { key: string; label: string; width?: string }, cIdx: number) => {
                        if (col.key === 'url') {
                          return (
                            <td key={cIdx} className="py-3.5 px-4">
                              <a
                                href={row.url || '#'}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => {
                                  if (isEditing) e.preventDefault();
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b8860b] hover:bg-[#996f08] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                              >
                                <span>Open Link</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          );
                        }
                        if (col.key === 'srNo') {
                          return (
                            <td
                              key={cIdx}
                              className="py-3.5 px-4 font-bold text-stone-700 text-center"
                              contentEditable={canEditContent}
                              suppressContentEditableWarning
                              onBlur={(e) => handleCellEdit(rIdx, col.key, e.currentTarget.innerText)}
                            >
                              {row[col.key] || String(rIdx + 1).padStart(2, '0')}
                            </td>
                          );
                        }
                        return (
                          <td
                            key={cIdx}
                            className={`py-3.5 px-4 leading-relaxed ${
                              col.key === 'title' ? 'font-bold text-black' : 'text-stone-600'
                            }`}
                            contentEditable={canEditContent}
                            suppressContentEditableWarning
                            onBlur={(e) => handleCellEdit(rIdx, col.key, e.currentTarget.innerText)}
                          >
                            {row[col.key] || ''}
                          </td>
                        );
                      })}
                      {canEditContent && (
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(rIdx)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete Row"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {canEditContent && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-black font-bold text-xs border border-blue-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Publication Row</span>
                </button>
              </div>
            )}
          </div>
        );
      }

      case 'faculty-card': {
        const isCircle = el.shape === 'circle' || el.photoShape === 'circle';

        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-3 bg-white flex flex-col justify-between`}>
            {/* Portrait Image (Circle or Rounded) */}
            {isCircle ? (
              <div className="flex flex-col items-center justify-center pt-2 pb-1 relative">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#163887] shadow-sm bg-stone-100 group">
                  <img
                    src={el.portraitUrl || '/uaf_main_building_renewed.jpg'}
                    alt={el.memberName || 'Profile'}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.src = '/uaf_main_building_renewed.jpg';
                    }}
                  />
                  {canEditContent && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestImage?.(el.id);
                      }}
                      className="absolute inset-0 bg-black/60 hover:bg-black/80 text-white text-[11px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      Change Photo
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-52 sm:h-56 bg-stone-100 rounded-xl overflow-hidden p-1 bg-stone-50 border border-stone-200 group">
                <img
                  src={el.portraitUrl || '/uaf_main_building_renewed.jpg'}
                  alt={el.memberName || 'Profile'}
                  className="w-full h-full object-cover object-top rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/uaf_main_building_renewed.jpg';
                  }}
                />
                {canEditContent && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestImage?.(el.id);
                    }}
                    className="absolute bottom-3 right-3 px-2 py-1 bg-black/75 hover:bg-black text-white text-[10px] font-bold rounded shadow-sm"
                  >
                    Change Photo
                  </button>
                )}
              </div>
            )}

            {/* Faculty & Staff Details - Fully In-Place Editable */}
            <div className={`space-y-2 pt-1 flex-1 ${isCircle ? 'text-center' : ''}`}>
              <h4
                contentEditable={canEditContent}
                suppressContentEditableWarning
                onBlur={(e) => canEditContent && updateProp('memberName', e.currentTarget.innerText)}
                className="font-bold text-base sm:text-[17px] text-black leading-snug outline-none cursor-text"
              >
                {el.memberName || 'Staff Member Name'}
              </h4>

              <div className={`space-y-1.5 text-xs text-stone-600 pt-1 ${isCircle ? 'flex flex-col items-center' : ''}`}>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#3b5998] shrink-0" />
                  <span
                    contentEditable={canEditContent}
                    suppressContentEditableWarning
                    onBlur={(e) => canEditContent && updateProp('designation', e.currentTarget.innerText)}
                    className="font-semibold text-stone-700 outline-none cursor-text"
                  >
                    {el.designation || 'Staff Designation'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#3b5998] shrink-0" />
                  <span
                    contentEditable={canEditContent}
                    suppressContentEditableWarning
                    onBlur={(e) => canEditContent && updateProp('phone', e.currentTarget.innerText)}
                    className="outline-none cursor-text"
                  >
                    {el.phone || '+92 41 9200161 - Ext. 2900'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 max-w-full">
                  <Mail className="w-3.5 h-3.5 text-[#3b5998] shrink-0" />
                  <span
                    contentEditable={canEditContent}
                    suppressContentEditableWarning
                    onBlur={(e) => canEditContent && updateProp('email', e.currentTarget.innerText)}
                    className="text-stone-700 hover:text-blue-700 hover:underline truncate outline-none cursor-text"
                  >
                    {el.email || 'staff@uaf.edu.pk'}
                  </span>
                </div>
              </div>

              {(el.specialization || canEditContent) && (
                <p
                  contentEditable={canEditContent}
                  suppressContentEditableWarning
                  onBlur={(e) => canEditContent && updateProp('specialization', e.currentTarget.innerText)}
                  className="text-xs text-stone-500 pt-1.5 line-clamp-2 leading-relaxed border-t border-stone-100 outline-none cursor-text"
                >
                  {el.specialization || (canEditContent ? 'Click to add office or department info' : '')}
                </p>
              )}
            </div>

            {/* Optional action button - only shown if explicitly configured, default clean with NO see detail button */}
            {el.buttonLabel && el.showActionButton ? (
              <button
                type="button"
                className="w-full py-2 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                {el.buttonLabel}
              </button>
            ) : null}
          </div>
        );
      }

      case 'card': {
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-3`}>
            <button
              type="button"
              data-card-image
              className="h-32 rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center w-full cursor-pointer border border-stone-200"
              onClick={(e) => {
                e.stopPropagation();
                onRequestImage?.(el.id);
              }}
            >
              {el.imageUrl ? (
                <img
                  src={el.imageUrl}
                  alt={el.title || ''}
                  className="w-full h-full object-cover"
                  style={{ opacity: (el.imageOpacity ?? 100) / 100 }}
                  onError={(e) => {
                    e.currentTarget.src = '/uaf_historic_campus.jpg';
                  }}
                />
              ) : (
                <span className="text-xs text-stone-400 font-semibold">
                  {isEditing ? 'Click here to add card photo' : ''}
                </span>
              )}
            </button>
            <div className="space-y-1.5">
              {el.badgeTag && (
                <span className="bg-blue-50 text-black border border-blue-200 font-bold text-[10px] px-2.5 py-0.5 rounded-full inline-block">
                  {el.badgeTag}
                </span>
              )}
              <h3
                data-card-text="title"
                data-inline-editor={canEditContent ? '' : undefined}
                data-rich-editor={canEditContent ? '' : undefined}
                data-placeholder={canEditContent && !el.title && !el.titleHtml ? 'Click to add card title' : undefined}
                contentEditable={canEditContent}
                {...pasteProps}
                suppressContentEditableWarning
                onBlur={(e) => canEditContent && updateRich('titleHtml', 'title', e)}
                className="font-bold text-base text-[#071b2d] mt-1"
                style={{
                  minHeight: canEditContent ? '1.4em' : undefined,
                  outline: 'none',
                  ...(el.titleStyle || {}),
                  ...(el.cardTextStyles?.title || {})
                }}
                dangerouslySetInnerHTML={{ __html: richMarkup(el.titleHtml, el.title) }}
              />
              <p
                data-card-text="description"
                data-inline-editor={canEditContent ? '' : undefined}
                data-rich-editor={canEditContent ? '' : undefined}
                data-placeholder={
                  canEditContent && !el.description && !el.descriptionHtml ? 'Click to add card text' : undefined
                }
                contentEditable={canEditContent}
                {...pasteProps}
                suppressContentEditableWarning
                onBlur={(e) => canEditContent && updateRich('descriptionHtml', 'description', e)}
                className="text-xs text-stone-600 leading-relaxed"
                style={{
                  minHeight: canEditContent ? '1.4em' : undefined,
                  outline: 'none',
                  ...(el.descStyle || {}),
                  ...(el.cardTextStyles?.description || {})
                }}
                dangerouslySetInnerHTML={{ __html: richMarkup(el.descriptionHtml, el.description) }}
              />
            </div>
            {el.buttonLabel && (
              <button
                type="button"
                className="w-full py-2 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                {el.buttonLabel}
              </button>
            )}
          </div>
        );
      }

      case 'button': {
        return (
          <div
            style={{
              textAlign: (s.align as any) || 'left',
              marginTop: `${s.marginTop || 0}px`,
              marginBottom: `${s.marginBottom || 0}px`,
              width: '100%',
              height: '100%',
              minHeight: 'inherit',
              display: 'flex'
            }}
          >
            <button
              type="button"
              style={{
                backgroundColor: s.bgColor || '#163887',
                color: el.label ? s.textColor || '#ffffff' : '#d1d5db',
                width: '100%',
                height: `${el.height || 42}px`,
                borderColor: s.borderColor || 'transparent',
                borderWidth: `${s.borderWidth || 0}px`,
                borderStyle: s.borderWidth > 0 ? 'solid' : 'none',
                borderRadius: `${s.borderRadius ?? 8}px`,
                paddingTop: `${s.paddingTop ?? 8}px`,
                paddingBottom: `${s.paddingBottom ?? 8}px`,
                paddingLeft: `${s.paddingLeft ?? 16}px`,
                paddingRight: `${s.paddingRight ?? 16}px`,
                ...(el.fontSize ? { fontSize: `${el.fontSize}px` } : {}),
                ...(el.fontFamily ? { fontFamily: el.fontFamily } : {})
              }}
              className={`font-bold text-xs shadow-xs hover:opacity-95 active:scale-98 transition inline-flex items-center justify-center cursor-pointer ${shadowClass}`}
            >
              <span
                data-inline-editor={canEditContent ? '' : undefined}
                data-rich-editor={canEditContent ? '' : undefined}
                data-placeholder={canEditContent && !el.label && !el.richHtml ? 'Write button label' : undefined}
                contentEditable={canEditContent}
                {...pasteProps}
                suppressContentEditableWarning
                onBlur={(e) => canEditContent && updateRich('richHtml', 'label', e)}
                style={{ outline: 'none' }}
                dangerouslySetInnerHTML={{ __html: richMarkup(el.richHtml, el.label) }}
              />
              {renderIcon(el.iconName)}
            </button>
          </div>
        );
      }

      case 'image': {
        const h = el.height ? `${el.height}px` : '260px';
        const imgRadius =
          el.shape === 'circle' ? '9999px' : el.shape === 'oval' ? '50%' : `${s.borderRadius ?? 12}px`;

        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-1.5`}>
            <div style={{ height: h, borderRadius: imgRadius }} className="overflow-hidden bg-stone-100 relative group">
              {el.src ? (
                <img
                  src={el.src}
                  alt={el.alt || 'UAF Image'}
                  style={{ objectFit: (el.objectFit as any) || 'cover', opacity: (el.opacity ?? 100) / 100 }}
                  className="w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = '/uaf_main_building_renewed.jpg';
                  }}
                />
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestImage?.(el.id);
                  }}
                  className="w-full h-full flex items-center justify-center text-sm text-stone-400 border border-dashed border-stone-300 bg-transparent cursor-pointer"
                >
                  {isEditing ? 'Click here to upload/change image' : ''}
                </button>
              )}
            </div>
            {el.caption && (
              <p className="text-[11px] text-stone-500 italic text-center font-medium">{el.caption}</p>
            )}
          </div>
        );
      }

      case 'container': {
        const shapeClips: Record<string, string> = {
          triangle: 'polygon(50% 0, 0 100%, 100% 100%)',
          rightTriangle: 'polygon(0 0,0 100%,100% 100%)',
          diamond: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          parallelogram: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)',
          trapezoid: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
          pentagon: 'polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%)',
          hexagon: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)',
          octagon: 'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)',
          star5:
            'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 95%, 50% 72%, 21% 95%, 32% 57%, 2% 35%, 39% 35%)',
          star4: 'polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)',
          arrow: 'polygon(0 25%, 62% 25%, 62% 0, 100% 50%, 62% 100%, 62% 75%, 0 75%)',
          chevron: 'polygon(0 0, 65% 0, 100% 50%, 65% 100%, 0 100%, 35% 50%)',
          cross:
            'polygon(35% 0, 65% 0, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%, 0 35%, 35% 35%)',
          heart:
            'polygon(50% 95%, 8% 55%, 0 35%, 8% 15%, 25% 8%, 50% 28%, 75% 8%, 92% 15%, 100% 35%, 92% 55%)',
          cloud:
            'polygon(20% 80%, 10% 70%, 10% 55%, 20% 45%, 30% 45%, 35% 25%, 50% 15%, 68% 25%, 72% 42%, 88% 42%, 98% 55%, 95% 72%, 85% 80%)'
        };

        const shapeType = el.shapeType || 'rectangle';
        const isRound = ['circle', 'ellipse'].includes(shapeType);

        return (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8
            }}
          >
            <div
              aria-hidden="true"
              style={{
                ...inlineStyle,
                position: 'absolute',
                inset: 0,
                borderRadius: isRound
                  ? '50%'
                  : shapeType === 'pill'
                  ? '9999px'
                  : shapeType === 'rounded'
                  ? 18
                  : inlineStyle.borderRadius,
                clipPath: shapeClips[shapeType],
                aspectRatio: ['circle', 'diamond', 'triangle', 'star5', 'heart'].includes(shapeType) ? '1' : undefined
              }}
            />
            {(el.shapeTextEnabled || el.shapeText) && (
              <span
                data-inline-editor={canEditContent ? '' : undefined}
                data-rich-editor={canEditContent ? '' : undefined}
                contentEditable={canEditContent}
                {...pasteProps}
                suppressContentEditableWarning
                onBlur={(e) => updateRich('shapeHtml', 'shapeText', e)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  minWidth: '1em',
                  outline: 'none',
                  textAlign: 'center',
                  color: s.textColor || '#18212b'
                }}
                dangerouslySetInnerHTML={{ __html: richMarkup(el.shapeHtml, el.shapeText) }}
              />
            )}
          </div>
        );
      }

      case 'input': {
        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all space-y-1`}>
            {el.label && <label className="block text-xs font-bold text-stone-700">{el.label}</label>}
            {el.inputType === 'textarea' ? (
              <textarea
                rows={3}
                placeholder={el.placeholder}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163887]"
                readOnly={isEditing}
              />
            ) : el.inputType === 'select' ? (
              <select
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163887]"
                disabled={isEditing}
              >
                {(el.options || 'Option 1, Option 2').split(',').map((opt: string, i: number) => (
                  <option key={i}>{opt.trim()}</option>
                ))}
              </select>
            ) : (
              <input
                type={el.inputType === 'email' ? 'email' : 'text'}
                placeholder={el.placeholder}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#163887]"
                readOnly={isEditing}
              />
            )}
          </div>
        );
      }

      case 'video': {
        const h = el.height ? `${el.height}px` : '300px';
        const isPlayableFile =
          el.isLocalVideo ||
          /\.(mp4|webm|ogg|mov)(?:[?#]|$)/i.test(el.videoUrl || '') ||
          /^data:video\//i.test(el.videoUrl || '');

        return (
          <div style={inlineStyle} className={`${shadowClass} transition-all overflow-hidden`}>
            <div style={{ height: h }} className="bg-black rounded-xl overflow-hidden relative">
              {el.videoUrl && isPlayableFile ? (
                <video src={el.videoUrl} controls className="w-full h-full object-contain" />
              ) : el.videoUrl ? (
                <iframe
                  src={el.videoUrl}
                  title={el.title || 'Video Player'}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestVideo?.(el.id);
                  }}
                  className="w-full h-full flex items-center justify-center text-sm text-stone-400 cursor-pointer bg-transparent border-0"
                >
                  {isEditing ? 'Click here to embed video or upload file' : ''}
                </button>
              )}
            </div>
          </div>
        );
      }

      case 'divider': {
        return (
          <div style={inlineStyle} className="my-2">
            <hr
              style={{
                borderColor: s.borderColor || '#e5eaee',
                borderWidth: `${el.thickness || 1}px`,
                borderStyle: (el.lineStyle as any) || 'solid'
              }}
            />
          </div>
        );
      }

      default:
        return <div className="p-3 text-xs border border-stone-200">Component</div>;
    }
  };

  return (
    <div
      onClick={isEditing && onSelect ? () => onSelect(el.id) : undefined}
      className={`transition-all relative ${
        isEditing ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500' : ''
      } ${
        isEditing && isSelected ? 'outline outline-3 outline-[#163887] outline-offset-2 z-10 shadow-md' : ''
      }`}
    >
      {renderPrimitive()}

      {/* Direct on-canvas quick handles when selected */}
      {isEditing && isSelected && onChange && !STYLE_LOCK && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#071b2d] text-white p-2 rounded-xl shadow-xl border border-white/20 flex flex-wrap items-center gap-3 text-xs mt-2 z-40 select-none animate-fadeIn"
        >
          {(el.type === 'text' || el.type === 'hyperlink') && (
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-300">Size:</span>
              <input
                type="range"
                min="12"
                max="56"
                step="2"
                value={el.fontSize || 16}
                onChange={(e) => updateProp('fontSize', parseInt(e.target.value))}
                className="w-16 accent-[#e8a62a]"
              />
              <span className="text-[10px] font-mono text-[#e8a62a]">{el.fontSize || 16}px</span>
            </div>
          )}

          {(el.type === 'image' || el.type === 'video') && (
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-300">Height:</span>
              <input
                type="range"
                min="120"
                max="600"
                step="20"
                value={el.height || 260}
                onChange={(e) => updateProp('height', parseInt(e.target.value))}
                className="w-20 accent-[#e8a62a]"
              />
              <span className="text-[10px] font-mono text-[#e8a62a]">{el.height || 260}px</span>
            </div>
          )}

          <div className="flex items-center space-x-1 border-l border-white/20 pl-2">
            <span className="text-[10px] uppercase font-bold text-stone-300">Align:</span>
            <button
              type="button"
              onClick={() => updateStyle('align', 'left')}
              className={`p-1 rounded ${s.align === 'left' ? 'bg-[#163887] text-white' : 'text-stone-300 hover:text-white'}`}
              title="Align Left"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => updateStyle('align', 'center')}
              className={`p-1 rounded ${s.align === 'center' ? 'bg-[#163887] text-white' : 'text-stone-300 hover:text-white'}`}
              title="Align Center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => updateStyle('align', 'right')}
              className={`p-1 rounded ${s.align === 'right' ? 'bg-[#163887] text-white' : 'text-stone-300 hover:text-white'}`}
              title="Align Right"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimitiveRenderer;
