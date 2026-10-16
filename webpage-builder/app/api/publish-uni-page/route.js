import { NextResponse } from 'next/server';
import { getPublishTarget } from '../../../lib/publishTargets';
import { copyTemplateAssets, historyFile, publishedFiles, readCustomMenu, readJson, writeJson } from '../../../lib/serverStore';

export const runtime = 'nodejs';

const primaryHeaderLayout = {
  'HOME':                    { x: 342,  width: 56  },
  'ABOUT ▾':               { x: 408,  width: 76  },
  'RTI':                     { x: 494,  width: 36  },
  'ADMINISTRATION ▾':       { x: 540,  width: 152 },
  'ACADEMICS ▾':             { x: 702,  width: 108 },
  'ADMISSIONS ▾':            { x: 820,  width: 118 },
  'MEDIA & PUBLICATIONS ▾':  { x: 948,  width: 182 },
  // Legacy fallbacks for pages published before the header update
  'ABOUT ▾':    { x: 408,  width: 76  },
  'MEDIA ▾':    { x: 948,  width: 88  },
  'SEARCH':      { x: 948,  width: 60  },
};

function normalizePublishedPage(pageData) {
  const templateType = pageData?.meta?.templateType || pageData?.meta?.template;
  if (templateType !== 'site-header' && templateType !== 'site-footer') return pageData;

  return {
    ...pageData,
    meta: { ...pageData.meta, templateType, usesSiteChrome: true },
    elements: pageData.elements.map(element => {
      const isUniversityLogo = element.type === 'image' && (
        element.badge || /uaf[-_ ]logo/i.test(`${element.src || ''} ${element.alt || ''}`)
      );
      const isFullWidthHeaderSurface = templateType === 'site-header'
        && ['container', 'divider'].includes(element.type)
        && (Number(element.x) || 0) === 0
        && (Number(element.width) || 0) >= 1200;
      const isPrimaryHeaderLink = templateType === 'site-header'
        && element.type === 'hyperlink'
        && (Number(element.y) || 0) >= 60 && (Number(element.y) || 0) < 115
        && (Number(element.x) || 0) >= 300;
      const primaryLayout = isPrimaryHeaderLink
        ? primaryHeaderLayout[String(element.text || '').trim().toUpperCase()]
        : null;
      const isPortalLoginButton = templateType === 'site-header'
        && element.type === 'button'
        && /portal\s+login/i.test(element.label || '');
      const bleedWidth = 10000;
      return {
        ...element,
        ...(isFullWidthHeaderSurface ? { x: (1200 - bleedWidth) / 2, width: bleedWidth } : {}),
        ...(isPrimaryHeaderLink ? { ...(primaryLayout || {}), fontSize: Math.min(Number(element.fontSize) || 14, 14) } : {}),
        ...(isPortalLoginButton ? { x: 1040, width: 130 } : {}),
        templateRegion: element.templateRegion || templateType.replace('site-', ''),
        ...(isUniversityLogo ? {
          badge: true,
          shape: 'circle',
          objectFit: 'contain',
          style: {
            ...(element.style || {}),
            bgColor: '#ffffff',
            borderColor: '#ed9d09',
            borderWidth: 2,
            borderRadius: 999,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0
          }
        } : {})
      };
    })
  };
}

export async function GET() {
  try {
    const publication = await readJson(publishedFiles[0], { pages: [] });
    const history = await readJson(historyFile, { entries: [] });
    return NextResponse.json({ customMenu: await readCustomMenu(), pages: Array.isArray(publication.pages) ? publication.pages : [], chrome: publication.chrome || {}, history: Array.isArray(history.entries) ? history.entries : [] });
  } catch (error) {
    console.error('Could not read publication dashboard data:', error);
    return NextResponse.json({ error: 'Could not read the university site publication data.' }, { status: 500 });
  }
}

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Request must contain valid JSON.' }, { status: 400 }); }

  const pageData = normalizePublishedPage(body?.pageData);
  const chromeType = pageData?.meta?.templateType || pageData?.meta?.template;
  const chromeRegion = chromeType === 'site-header' ? 'header'
    : chromeType === 'site-footer' ? 'footer' : null;
  const pageScopedChrome = Boolean(chromeRegion && body?.chromeScope === 'page');
  const customMenu = await readCustomMenu();
  const target = chromeRegion && !pageScopedChrome ? null : getPublishTarget(body?.targetPage, customMenu);
  if ((!chromeRegion || pageScopedChrome) && !target) return NextResponse.json({ error: 'Choose a valid page on the university website.' }, { status: 400 });
  if (!Array.isArray(pageData?.elements) || !pageData.elements.length) return NextResponse.json({ error: 'Add content to the page before publishing.' }, { status: 400 });

  try {
    await copyTemplateAssets();
    const publishedAt = new Date().toISOString();
    const publication = await readJson(publishedFiles[0], { pages: [] });
    const previousHistory = await readJson(historyFile, { entries: [] });
    const historyEntries = Array.isArray(previousHistory.entries) ? previousHistory.entries : [];
    if (chromeRegion) {
      const previousPublication = pageScopedChrome
        ? publication.chrome?.pageOverrides?.[target.value]?.[chromeRegion] || null
        : publication.chrome?.[chromeRegion] || null;
      const entry = {
        id: `site-${chromeRegion}-${pageScopedChrome ? `${target.value}-` : ''}${Date.now()}`,
        title: String(pageData.meta?.title || `University ${chromeRegion}`),
        author: String(pageData.meta?.author || 'Admin'),
        data: pageData,
        publishedAt,
        ...(pageScopedChrome ? { targetPage: target.value, department: target.department } : {}),
      };
      const nextPublication = {
        ...publication,
        pages: Array.isArray(publication.pages) ? publication.pages : [],
        customMenu,
        chrome: pageScopedChrome
          ? {
              ...(publication.chrome || {}),
              pageOverrides: {
                ...(publication.chrome?.pageOverrides || {}),
                [target.value]: { ...(publication.chrome?.pageOverrides?.[target.value] || {}), [chromeRegion]: entry },
              },
            }
          : { ...(publication.chrome || {}), [chromeRegion]: entry },
      };
      for (const outputFile of publishedFiles) await writeJson(outputFile, nextPublication);
      const historyEntry = { ...entry, publicationType: pageScopedChrome ? 'chrome-page' : 'chrome', chromeRegion, previousPublication };
      const nextHistory = { entries: [...historyEntries, historyEntry].slice(-500) };
      await writeJson(historyFile, nextHistory);
      return NextResponse.json({ success: true, chromeRegion, publication: entry, pages: nextPublication.pages, chrome: nextPublication.chrome, history: nextHistory.entries });
    }
    const previousPublication = (publication.pages || []).find(page => page.targetPage === target.value) || null;
    const entry = {
      id: `publication-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: String(pageData.meta?.title || 'Untitled page'),
      author: String(pageData.meta?.author || 'Admin'),
      department: target.department,
      targetPage: target.value,
      data: pageData,
      publishedAt,
    };
    const pages = Array.isArray(publication.pages) ? publication.pages : [];
    const nextPages = [...pages.filter(page => page.targetPage !== target.value), entry];
    const nextPublication = { ...publication, pages: nextPages, customMenu };
    for (const outputFile of publishedFiles) await writeJson(outputFile, nextPublication);

    const historyEntry = { ...entry, publicationType: 'page', previousPublication };
    const nextHistory = { entries: [...historyEntries, historyEntry].slice(-500) };
    await writeJson(historyFile, nextHistory);
    return NextResponse.json({ success: true, publication: entry, pages: nextPages, history: nextHistory.entries });
  } catch (error) {
    console.error('Could not publish page into uni project:', error);
    return NextResponse.json({ error: 'Could not publish to the uni project. Check that the university project folders are writable.' }, { status: 500 });
  }
}
