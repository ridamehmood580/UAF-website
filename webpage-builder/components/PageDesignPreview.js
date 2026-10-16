'use client';

import React, { useEffect, useMemo, useState } from 'react';
import PrimitiveRenderer from './PrimitiveRenderer';

export default function PageDesignPreview({ page, compact = false, fullPage = false }) {
  const [host, setHost] = useState(null);
  const [scale, setScale] = useState(1);
  const elements = page?.elements || [];
  const height = useMemo(() => Math.max(
    1,
    ...elements.map(element => (element.y || 0) + (element.height || 100))
  ), [elements]);

  useEffect(() => {
    if (!host) return undefined;
    const resize = () => setScale(Math.min(1, host.clientWidth / 1200));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    return () => observer.disconnect();
  }, [host]);

  return <div ref={setHost} className={`overflow-auto bg-slate-100 ${fullPage ? 'h-full w-full p-0' : compact ? 'max-h-72 rounded-lg p-2' : 'max-h-[55vh] rounded-xl border border-slate-200 p-3'}`}>
    <div className="mx-auto overflow-hidden bg-white shadow-sm" style={{ width: 1200 * scale, height: height * scale }}>
      <div className="relative origin-top-left bg-white" style={{ width: 1200, height, transform: `scale(${scale})` }}>
        {elements.map((element, layerIndex) => <div key={element.id} style={{ position: 'absolute', left: element.x || 0, top: element.y || 0, width: element.width || 260, height: element.height || 80, zIndex: layerIndex }}><PrimitiveRenderer el={element} isEditing={false}/></div>)}
      </div>
    </div>
    {!elements.length && <p className="p-8 text-center text-sm text-slate-500">This page has no elements.</p>}
  </div>;
}
