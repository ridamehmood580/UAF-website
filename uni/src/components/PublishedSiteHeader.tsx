'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { PrimitiveRenderer } from '../page-builder/PrimitiveRenderer';
import type { PrimitiveElement, PrimitiveMenuItem } from '../page-builder/elementPrimitives';

interface PublishedSiteHeaderProps {
  data: { elements?: PrimitiveElement[]; meta?: { headerTemplateVersion?: number } };
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onOpenCalculator?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateAdmissions?: (category: 'undergraduate' | 'postgraduate' | 'international') => void;
  onSelectFaculty?: (facultyId: string, section?: string) => void;
  onNavigateHome?: () => void;
}

const readY = (element: PrimitiveElement) => element.y || 0;
const readX = (element: PrimitiveElement) => element.x || 0;
const readHeight = (element: PrimitiveElement) => element.height || 0;

export const PublishedSiteHeader: React.FC<PublishedSiteHeaderProps> = ({
  data,
  onOpenSearch,
  onOpenAdvisor,
  onOpenCalculator,
  onOpenAuthModal,
  onNavigateAdmissions,
  onSelectFaculty,
  onNavigateHome
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [openSubmenuLabel, setOpenSubmenuLabel] = useState<string | null>(null);
  const elements = data?.elements || [];
  const backgroundElements = elements.filter((element) => element.type === 'container');
  const utilityBackground = backgroundElements.find((element) => readY(element) < 42) || backgroundElements[0];
  const navbarBackground = backgroundElements.find((element) => readY(element) >= 42) || backgroundElements[1];
  const utilityHeight = readHeight(utilityBackground || {} as PrimitiveElement) || 42;
  const navbarHeight = readHeight(navbarBackground || {} as PrimitiveElement) || 84;
  const navbarStart = readY(navbarBackground || {} as PrimitiveElement) || utilityHeight;
  const utilityItems = elements.filter((element) => element.type !== 'container' && readY(element) < utilityHeight);
  const utilityLeft = utilityItems.filter((element) => readX(element) < 700).sort((a, b) => readX(a) - readX(b));
  const utilityRight = utilityItems.filter((element) => readX(element) >= 700).sort((a, b) => readX(a) - readX(b));
  const navbarItems = elements.filter((element) =>
    element.type !== 'container' && element.type !== 'divider' && readY(element) >= navbarStart && readY(element) < navbarStart + navbarHeight
  );
  const brandItems = navbarItems.filter((element) => readX(element) < 342).sort((a, b) => readY(a) - readY(b) || readX(a) - readX(b));
  const logo = brandItems.find((element) => element.type === 'image');
  const brandText = brandItems.filter((element) => element.type === 'text');
  const primaryItems = navbarItems.filter((element) => readX(element) >= 342).sort((a, b) => readX(a) - readX(b));
  const accent = elements.find((element) => element.type === 'divider' && readY(element) >= navbarStart + navbarHeight - 4);
  const legacyHeader = data?.meta?.headerTemplateVersion !== 2;
  const hasSearchControl = primaryItems.some((element) => element.type === 'button' && element.iconName === 'Search');
  useEffect(() => {
    if (!openMenuId) return;
    const closeMenu = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenMenuId(null);
        setOpenSubmenuLabel(null);
      }
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [openMenuId]);

  const renderMenuItems = (items: PrimitiveMenuItem[], element: PrimitiveElement, nested = false) => (
    <div
      className={`absolute ${nested ? 'right-full mr-2 top-0' : 'left-0 top-full mt-2'} z-[100] min-w-64 max-w-[22rem] overflow-visible rounded-xl border border-stone-200 bg-white py-2 text-[#1e3a7a] shadow-2xl`}
      onClick={(event) => event.stopPropagation()}
    >
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const itemContent = <>
          <span>{item.label}</span>
          {hasChildren && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#e8a62a]" />}
        </>;
        const commonClass = 'flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-xs font-bold transition-colors hover:bg-[#163887] hover:text-white';

        if (hasChildren) {
          return (
            <div key={item.label} className="relative" onMouseEnter={() => setOpenSubmenuLabel(item.label)}>
              <button
                type="button"
                className={commonClass}
                aria-expanded={openSubmenuLabel === item.label}
                onClick={() => setOpenSubmenuLabel(openSubmenuLabel === item.label ? null : item.label)}
              >
                {itemContent}
              </button>
              {openSubmenuLabel === item.label && renderMenuItems(item.children || [], element, true)}
            </div>
          );
        }

        const label = item.label.toLowerCase();
        const facultyId = label.includes('veterinary') ? 'fac-vet'
          : label.includes('social sciences') ? 'fac-social'
          : label.includes('food, nutrition') ? 'fac-food'
          : label.includes('health and pharmaceutical') ? 'fac-health'
          : label.includes('animal husbandry') ? 'fac-husbandry'
          : label.includes('engineering') ? 'fac-engg'
          : label.includes('sciences') ? 'fac-sci'
          : label.includes('agriculture') ? 'fac-agri' : null;

        const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
          if (label === 'home' && onNavigateHome) {
            event.preventDefault();
            onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (label.includes('merit calculator') && onOpenCalculator) {
            event.preventDefault();
            onOpenCalculator();
          } else if ((label.includes('virtual guide') || label.includes('advisor')) && onOpenAdvisor) {
            event.preventDefault();
            onOpenAdvisor();
          } else if (element.text?.toLowerCase().includes('admissions') && onNavigateAdmissions) {
            const category = label.includes('postgraduate') ? 'postgraduate'
              : label.includes('international') ? 'international' : 'undergraduate';
            event.preventDefault();
            onNavigateAdmissions(category);
          } else if (facultyId && onSelectFaculty) {
            event.preventDefault();
            onSelectFaculty(facultyId);
          }
          setOpenMenuId(null);
          setOpenSubmenuLabel(null);
        };

        return (
          <a
            key={item.label}
            href={item.url || '#'}
            target={item.url?.startsWith('http') ? '_blank' : undefined}
            rel={item.url?.startsWith('http') ? 'noreferrer' : undefined}
            className={commonClass}
            onClick={handleItemClick}
          >
            {itemContent}
          </a>
        );
      })}
    </div>
  );

  const renderFlowItem = (element: PrimitiveElement, section: 'utility' | 'navbar') => {
    const menuItems = element.menuItems || [];
    const isMenu = element.type === 'hyperlink' && menuItems.length > 0;
    const isSearch = element.type === 'button' && element.iconName === 'Search';
    const isStaffLogin = element.text?.toLowerCase().includes('staff login');
    const isComplaints = element.text?.toLowerCase().includes('complaints');
    const active = openMenuId === element.id;

    if (isSearch) {
      const style = element.style || {};
      return (
        <button
          key={element.id}
          type="button"
          aria-label="Search UAF"
          onClick={onOpenSearch}
          className="inline-flex shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{
            width: element.width || 40,
            height: element.height || 40,
            border: `${style.borderWidth ?? 1}px solid ${style.borderColor || 'rgba(255,255,255,0.20)'}`,
            borderRadius: style.borderRadius === 999 ? '9999px' : `${style.borderRadius ?? 999}px`,
            backgroundColor: style.bgColor || 'rgba(255,255,255,0.10)',
            color: style.textColor || '#e8a62a'
          }}
        >
          <Search className="h-4 w-4" />
          {element.label && <span className="ml-1">{element.label}</span>}
        </button>
      );
    }

    return (
      <div
        key={element.id}
        className={`relative flex ${section === 'navbar' ? 'h-full items-center' : 'items-center'} ${active ? 'z-[90]' : ''}`}
        style={{ width: 'max-content', minHeight: section === 'navbar' ? navbarHeight : utilityHeight }}
      >
        <PrimitiveRenderer
          el={isMenu ? { ...element, text: element.text?.replace(/\s*[▾▼]$/, '') } : element}
          preserveStyleColors
          onHyperlinkClick={(clickedElement, event) => {
            if (isMenu) {
              event.preventDefault();
              setOpenSubmenuLabel(null);
              setOpenMenuId(active ? null : clickedElement.id);
              return;
            }
            if (isStaffLogin && onOpenAuthModal) {
              event.preventDefault();
              onOpenAuthModal();
            } else if (isComplaints && onOpenAdvisor) {
              event.preventDefault();
              onOpenAdvisor();
            }
          }}
        />
        {isMenu && <ChevronDown aria-hidden="true" className="ml-1 h-3.5 w-3.5 shrink-0" />}
        {active && renderMenuItems(menuItems, element)}
      </div>
    );
  };

  const utilityStyle = utilityBackground?.style || {};
  const navbarStyle = navbarBackground?.style || {};
  const accentStyle = accent?.style || {};
  const accentHeight = accent ? Math.min(readHeight(accent), 4) : 2;
  const utilityRadius = legacyHeader && Number(utilityStyle.borderRadius) === 0
    ? 16
    : utilityStyle.borderRadius == null ? 16 : Number(utilityStyle.borderRadius);

  return (
    <header ref={containerRef} className="sticky top-0 z-50 w-full overflow-visible font-sans">
      <div
        className="w-full border-solid"
        style={{
          height: utilityHeight,
          backgroundColor: utilityStyle.bgColor || '#ffffff',
          color: utilityStyle.textColor || '#1e3a7a',
          borderColor: utilityStyle.borderColor || '#ed9d09',
          borderWidth: utilityStyle.borderWidth ?? 2,
          borderRadius: `${utilityRadius}px ${utilityRadius}px 0 0`,
          boxSizing: 'border-box'
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="hidden h-full items-center font-semibold tracking-wide lg:flex" style={{ gap: 24 }}>
            {utilityLeft.map((element) => renderFlowItem(element, 'utility'))}
          </div>
          <div className="ml-auto flex h-full items-center gap-4 text-xs font-medium sm:gap-6 sm:text-[13px]">
            {utilityRight.map((element) => renderFlowItem(element, 'utility'))}
          </div>
        </div>
      </div>

      <div
        className="w-full"
        style={{
          height: navbarHeight,
          backgroundColor: navbarStyle.bgColor || '#163887',
          color: navbarStyle.textColor || '#ffffff',
          borderBottom: `${accentHeight}px solid ${accentStyle.borderColor || '#ed9d09'}`,
          boxSizing: 'border-box'
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
          <div className="flex h-full shrink-0 items-center" style={{ gap: 14 }}>
            {logo && (
              <div key={logo.id} className="flex h-14 w-14 shrink-0 items-center justify-center">
                <PrimitiveRenderer el={logo} preserveStyleColors />
              </div>
            )}
            {brandText.length > 0 && (
              <div className="flex flex-col justify-center" style={{ lineHeight: 1 }}>
                {brandText.map((element) => <div key={element.id} className="flex items-center" style={{ height: element.height || 'auto' }}><PrimitiveRenderer el={element} preserveStyleColors /></div>)}
              </div>
            )}
          </div>
          <nav aria-label="University navigation" className="ml-auto flex h-full min-w-0 items-center" style={{ gap: 'clamp(10px, 1.05vw, 20px)' }}>
            {primaryItems.map((element) => renderFlowItem(element, 'navbar'))}
            {legacyHeader && !hasSearchControl && (
              <button
                type="button"
                aria-label="Search UAF"
                onClick={onOpenSearch}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#e8a62a] transition-colors hover:bg-white/20"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
