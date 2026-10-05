'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, LayoutTemplate, FilePlus } from 'lucide-react';
import PrimitiveRenderer from './PrimitiveRenderer';
import { PAGE_TEMPLATES, buildTemplate } from '../lib/pageTemplates';

// Live, scaled-down preview of a template (the real page, drawn small).
function Thumb({ id }) {
  const hostRef = useRef(null);
  const [scale, setScale] = useState(0.24);
  const elements = useMemo(() => buildTemplate(id)?.elements || [], [id]);
  const pageHeight = Math.max(900, ...elements.map(el => (el.y || 0) + (el.height || 0)));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const fit = () => setScale(host.clientWidth / 1200);
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tpl-thumb" ref={hostRef} aria-hidden="true">
      <div className="tpl-thumb-page" style={{ width: 1200, height: pageHeight, transform: `scale(${scale})` }}>
        {elements.map(el => (
          <div key={el.id} style={{ position: 'absolute', left: el.x || 0, top: el.y || 0, width: el.width || 260, minHeight: el.height || 80 }}>
            <PrimitiveRenderer el={el} isEditing={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TemplatePicker({ hasContent, onPick, onBlank, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="tpl-backdrop" onClick={onClose}>
      <section className="tpl-modal" onClick={e => e.stopPropagation()} role="dialog" aria-label="Page templates">
        <div className="tpl-head">
          <div>
            <strong><LayoutTemplate size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />Choose a page template</strong>
            <span>{hasContent ? 'Choose a department page layout. Save unsaved work before replacing this page.' : 'Choose a department page layout, or start with a blank page.'}</span>
          </div>
          <button className="icon-button" onClick={onClose} title="Close"><X size={18} /></button>
        </div>
        <div className="tpl-body">
          {PAGE_TEMPLATES.map(t => (
            <button className="tpl-card" key={t.id} onClick={() => onPick(t.id)}>
              <Thumb id={t.id} />
              <span className="tpl-info">
                <i>{t.category}</i>
                <b>{t.name}</b>
                <small>{t.description}</small>
              </span>
            </button>
          ))}
          <button className="tpl-card tpl-blank" onClick={onBlank}>
            <span className="tpl-blank-icon"><FilePlus size={26} /></span>
            <span className="tpl-info">
              <b>Empty page</b>
              <small>Start from scratch with nothing on the page.</small>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
