'use client';

import React, { useMemo } from 'react';
import { PrimitiveRenderer } from '../page-builder/PrimitiveRenderer';
import type { PrimitiveElement } from '../page-builder/elementPrimitives';

type PillElement = PrimitiveElement & { templateRegion?: string };

interface PublishedDepartmentPillNavigationProps {
  data: { elements?: PillElement[] };
  onLinkClick?: (url: string) => void;
  onMenuItemClick?: (url: string) => void;
}

export const PublishedDepartmentPillNavigation: React.FC<PublishedDepartmentPillNavigationProps> = ({ data, onLinkClick, onMenuItemClick }) => {
  const elements = useMemo(() => (data?.elements || [])
    .filter((element) => element.type === 'container' || element.templateRegion === 'pills')
    .filter((element) => element.type === 'hyperlink'), [data]);
  const background = data?.elements?.find((element) => element.type === 'container');
  const backgroundStyle = background?.style || {};

  return (
    <div className="relative z-40 -mt-6 flex w-full justify-center overflow-visible px-3 sm:-mt-7 sm:px-6">
      <div
        className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 overflow-visible rounded-full px-3 py-1.5 shadow-[0_12px_32px_rgba(7,27,45,0.4)]"
        style={{
          backgroundColor: backgroundStyle.bgColor || '#071b2d',
          border: `${backgroundStyle.borderWidth ?? 2}px solid ${backgroundStyle.borderColor || '#c99738'}`,
          borderRadius: '9999px',
          boxSizing: 'border-box'
        }}
      >
        {elements.map((element) => (
          <div key={element.id} className="relative w-max shrink-0">
            <PrimitiveRenderer
              el={{
                ...element,
                fontWeight: '700',
                style: {
                  ...element.style,
                  textColor: element.style?.textColor || '#ffffff',
                  ...(element.text?.replace(/\s*[▾▼]$/, '').trim().toUpperCase() === 'MORE' ? { bgColor: 'transparent', borderWidth: 0 } : {})
                }
              }}
              preserveStyleColors
              onPublishedLinkClick={onLinkClick}
              onPublishedMenuItemClick={onMenuItemClick}
            />
            </div>
        ))}
      </div>
    </div>
  );
};
