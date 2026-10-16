'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { PrimitiveRenderer } from '../page-builder/PrimitiveRenderer';
import type { PrimitiveElement } from '../page-builder/elementPrimitives';

type PublishedFooterData = { elements?: PrimitiveElement[] };

export const PublishedSiteFooter: React.FC<{ data: PublishedFooterData }> = ({ data }) => {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const elements = data?.elements || [];
  const height = useMemo(() => Math.max(1, ...elements.map(element => (element.y || 0) + (element.height || 100))), [elements]);
  const footerBackground = elements.find(element =>
    element.type === 'container' && (element.x || 0) <= 0 && (element.y || 0) <= 0 && (element.width || 0) >= 1000
  )?.style?.bgColor || 'transparent';

  useEffect(() => {
    if (!host) return undefined;
    const resize = () => setScale(Math.min(1, host.clientWidth / 1200));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    return () => observer.disconnect();
  }, [host]);

  return <div ref={setHost} className="w-full overflow-hidden" style={{ backgroundColor: footerBackground }}>
    <div style={{ width: 1200 * scale, height: height * scale, marginInline: 'auto' }}>
      <footer className="relative origin-top-left" style={{ width: 1200, height, transform: `scale(${scale})` }}>
        {elements.map((element, layerIndex) => <div key={element.id} style={{ position: 'absolute', left: element.x || 0, top: element.y || 0, width: element.width || 260, height: element.height || 80, zIndex: layerIndex }}><PrimitiveRenderer el={element} preserveStyleColors /></div>)}
      </footer>
    </div>
  </div>;
};
