import React, { useEffect, useMemo, useState } from 'react';

interface DesignElement {
  id: string;
  type: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  title?: string;
  description?: string;
  label?: string;
  tag?: string;
  fontSize?: number;
  fontWeight?: string;
  src?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  url?: string;
  imageUrl?: string;
  videoUrl?: string;
  inputType?: string;
  placeholder?: string;
  shapeText?: string;
  shapeTextEnabled?: boolean;
  shapeType?: string;
  style?: Record<string, string | number>;
}

interface PublishedPage { title?: string; data?: { elements?: DesignElement[] }; targetPage: string; }

const plainText = (value: unknown) => typeof value === 'string' ? value : '';

export const PublishedPageRenderer: React.FC<{ publication: PublishedPage }> = ({ publication }) => {
  const [scale, setScale] = useState(1);
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const elements = publication.data?.elements || [];
  const height = useMemo(() => Math.max(480, ...elements.map(element => (element.y || 0) + (element.height || 100) + 48)), [elements]);

  useEffect(() => {
    if (!host) return;
    const resize = () => setScale(Math.min(1, host.clientWidth / 1200));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    return () => observer.disconnect();
  }, [host]);

  const renderElement = (element: DesignElement) => {
    const style = element.style || {};
    const base: React.CSSProperties = {
      width: '100%', minHeight: element.height || 80, boxSizing: 'border-box',
      padding: `${style.paddingTop ?? 12}px ${style.paddingRight ?? 12}px ${style.paddingBottom ?? 12}px ${style.paddingLeft ?? 12}px`,
      color: plainText(style.textColor) || '#0f172a', backgroundColor: plainText(style.bgColor) || 'transparent',
      border: Number(style.borderWidth || 0) ? `${style.borderWidth}px solid ${style.borderColor || 'transparent'}` : undefined,
      borderRadius: style.borderRadius !== undefined ? `${style.borderRadius}px` : 8,
      textAlign: (plainText(style.align) || 'left') as React.CSSProperties['textAlign'],
      boxShadow: style.shadow === 'sm' ? '0 1px 2px #0002' : style.shadow === 'md' ? '0 4px 8px #0002' : style.shadow === 'lg' ? '0 10px 18px #0002' : undefined,
      fontFamily: 'Arial, Helvetica, sans-serif',
    };
    const content = plainText(element.text || element.label || element.title);
    switch (element.type) {
      case 'text': {
        const Tag = (['h1','h2','h3','h4','p'].includes(element.tag || '') ? element.tag : 'p') as keyof React.JSX.IntrinsicElements;
        return <div style={base}><Tag style={{ margin: 0, fontSize: element.fontSize || 16, fontWeight: element.fontWeight === 'bold' ? 700 : element.fontWeight === 'semibold' ? 600 : 400, lineHeight: 1.4, fontFamily: 'Arial, sans-serif' }}>{content}</Tag></div>;
      }
      case 'hyperlink': return <div style={base}><a href={element.url || '#'} target="_blank" rel="noreferrer" className="font-semibold text-emerald-800 underline">{content}</a></div>;
      case 'button': return <div style={{ ...base, padding: 0 }}><a href={element.url || '#'} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 font-bold text-white no-underline" style={{ backgroundColor: plainText(style.bgColor) || '#15803d', color: plainText(style.textColor) || '#fff' }}>{content}</a></div>;
      case 'image': return <figure style={{ ...base, margin: 0 }}><img src={element.src || ''} alt={element.alt || ''} style={{ display: 'block', width: '100%', height: element.height || 220, objectFit: 'cover', borderRadius: Number(style.borderRadius || 0) }} />{element.caption && <figcaption className="mt-1 text-center text-xs text-slate-500">{element.caption}</figcaption>}</figure>;
      case 'card': return <article style={{ ...base, backgroundColor: plainText(style.bgColor) || '#fff', border: '1px solid #e2e8f0', borderRadius: Number(style.borderRadius ?? 12), overflow: 'hidden' }}>{element.imageUrl && <img src={element.imageUrl} alt={element.title || ''} className="mb-3 h-32 w-full object-cover"/>}<h3 className="mb-2 text-base font-bold">{element.title}</h3><p className="text-sm leading-relaxed text-slate-600">{element.description}</p>{element.label && <a href={element.url || '#'} className="mt-3 inline-block rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white">{element.label}</a>}</article>;
      case 'list': return <div style={base}><h3 className="mb-2 font-bold">{element.title}</h3><ul className="list-disc space-y-1 pl-5 text-sm">{(element.items || []).map((item, index) => <li key={`${element.id}-${index}`}>{item}</li>)}</ul></div>;
      case 'container': return <div style={{ ...base, minHeight: element.height || 100, display: 'grid', placeItems: 'center', clipPath: element.shapeType === 'triangle' ? 'polygon(50% 0,0 100%,100% 100%)' : undefined }}>{element.shapeTextEnabled ? element.shapeText : ''}</div>;
      case 'divider': return <hr style={{ ...base, height: 1, minHeight: 1, border: 0, borderTop: `${Number(style.borderWidth || 1)}px solid ${plainText(style.borderColor) || '#cbd5e1'}`, padding: 0 }} />;
      case 'video': return <div style={base}>{element.videoUrl && <video controls src={element.videoUrl} className="w-full"/>}</div>;
      case 'input': return <label style={base} className="block text-sm">{element.label}<input placeholder={element.placeholder} type={element.inputType || 'text'} className="mt-1 block w-full rounded-lg border border-slate-300 p-2"/></label>;
      default: return <div style={base}>{content}</div>;
    }
  };

  return <section aria-label={publication.title || 'Published page design'} className="w-full overflow-hidden bg-white">
    <div ref={setHost} className="mx-auto w-full overflow-hidden" style={{ height: height * scale }}>
      <div className="relative origin-top-left bg-white" style={{ width: 1200, height, transform: `scale(${scale})` }}>
        {elements.map(element => <div key={element.id} style={{ position: 'absolute', left: element.x || 0, top: element.y || 0, width: element.width || 260, minHeight: element.height || 80 }}>{renderElement(element)}</div>)}
      </div>
    </div>
  </section>;
};
