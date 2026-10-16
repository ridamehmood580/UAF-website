'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { PrimitiveRenderer } from '../page-builder/PrimitiveRenderer';
import type { PrimitiveElement } from '../page-builder/elementPrimitives';

type DepartmentPageElement = PrimitiveElement & { templateRegion?: string; fixed?: boolean };
type DepartmentPageData = { elements?: DepartmentPageElement[] };

export const PublishedDepartmentContent: React.FC<{ data: DepartmentPageData }> = ({ data }) => {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const elements = useMemo(() => {
    const source = data?.elements || [];
    const bannerImage = source.find((element) =>
      element.type === 'image'
      && (element.x || 0) <= 0
      && (element.width || 0) >= 1000
      && (element.height || 0) >= 250
      && (element.y || 0) <= 150
    );
    const bannerTop = bannerImage?.y || 0;
    const bannerBottom = bannerImage ? bannerTop + (bannerImage.height || 0) : 0;
    const hasBanner = Boolean(bannerImage);
    return source
      .filter((element) => {
        if (['header', 'footer', 'banner'].includes(element.templateRegion || '')) return false;
        const y = element.y || 0;
        const bottom = y + (element.height || 0);
        if (element.fixed && (y < 140 || (hasBanner && y >= bannerBottom))) return false;
        if (hasBanner && y < bannerBottom && bottom > bannerTop) return false;
        return true;
      })
      .map((element) => {
        const y = element.y || 0;
        const offset = hasBanner ? Math.max(0, bannerBottom - 40) : 0;
        return offset && y >= bannerBottom ? { ...element, y: y - offset } : element;
      });
  }, [data]);
  const height = useMemo(() => Math.max(420, ...elements.map(element => (element.y || 0) + (element.height || 100))), [elements]);

  useEffect(() => {
    if (!host) return undefined;
    const resize = () => setScale(Math.min(1, host.clientWidth / 1200));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    return () => observer.disconnect();
  }, [host]);

  return <div ref={setHost} className="w-full overflow-hidden">
    <div style={{ width: 1200 * scale, height: height * scale, marginInline: 'auto' }}>
      <div className="relative origin-top-left bg-white" style={{ width: 1200, height, transform: `scale(${scale})` }}>
        {elements.map((element, layerIndex) => <div key={element.id} style={{ position: 'absolute', left: element.x || 0, top: element.y || 0, width: element.width || 260, height: element.height || 80, zIndex: layerIndex }}><PrimitiveRenderer el={element} preserveStyleColors /></div>)}
      </div>
    </div>
  </div>;
};
