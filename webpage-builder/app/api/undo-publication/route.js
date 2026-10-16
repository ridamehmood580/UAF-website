import { NextResponse } from 'next/server';
import { historyFile, publishedFiles, readJson, writeJson } from '../../../lib/serverStore';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const history = await readJson(historyFile, { entries: [] });
    const entries = Array.isArray(history.entries) ? history.entries : [];
    let historyIndex = entries.length - 1;
    while (historyIndex >= 0 && entries[historyIndex].undoneAt) historyIndex -= 1;
    const latest = entries[historyIndex];
    if (!latest?.publicationType) {
      return NextResponse.json({ error: 'There is no recent publication available to undo.' }, { status: 409 });
    }

    const publication = await readJson(publishedFiles[0], { pages: [], chrome: {} });
    let nextPublication;
    if (latest.publicationType === 'chrome' && ['header', 'footer'].includes(latest.chromeRegion)) {
      if (publication.chrome?.[latest.chromeRegion]?.id !== latest.id) {
        return NextResponse.json({ error: 'The shared header or footer has changed since this publication. Refresh before undoing.' }, { status: 409 });
      }
      const chrome = { ...(publication.chrome || {}) };
      if (latest.previousPublication) chrome[latest.chromeRegion] = latest.previousPublication;
      else delete chrome[latest.chromeRegion];
      nextPublication = { ...publication, chrome };
    } else if (latest.publicationType === 'chrome-page' && ['header', 'footer'].includes(latest.chromeRegion) && latest.targetPage) {
      const current = publication.chrome?.pageOverrides?.[latest.targetPage]?.[latest.chromeRegion];
      if (current?.id !== latest.id) {
        return NextResponse.json({ error: 'This page header or footer has changed since publication. Refresh before undoing.' }, { status: 409 });
      }
      const pageOverrides = { ...(publication.chrome?.pageOverrides || {}) };
      const pageEntry = { ...(pageOverrides[latest.targetPage] || {}) };
      if (latest.previousPublication) pageEntry[latest.chromeRegion] = latest.previousPublication;
      else delete pageEntry[latest.chromeRegion];
      if (Object.keys(pageEntry).length) pageOverrides[latest.targetPage] = pageEntry;
      else delete pageOverrides[latest.targetPage];
      nextPublication = { ...publication, chrome: { ...(publication.chrome || {}), pageOverrides } };
    } else if (latest.publicationType === 'page' && latest.targetPage) {
      const pages = Array.isArray(publication.pages) ? publication.pages : [];
      if (pages.find(page => page.targetPage === latest.targetPage)?.id !== latest.id) {
        return NextResponse.json({ error: 'This page has changed since the publication. Refresh before undoing.' }, { status: 409 });
      }
      const restoredPages = pages.filter(page => page.targetPage !== latest.targetPage);
      if (latest.previousPublication) restoredPages.push(latest.previousPublication);
      nextPublication = { ...publication, pages: restoredPages };
    } else {
      return NextResponse.json({ error: 'This publication cannot be undone.' }, { status: 409 });
    }

    for (const outputFile of publishedFiles) await writeJson(outputFile, nextPublication);
    const nextEntries = entries.slice();
    nextEntries[historyIndex] = { ...latest, undoneAt: new Date().toISOString() };
    await writeJson(historyFile, { entries: nextEntries });
    return NextResponse.json({ success: true, publication: latest, pages: nextPublication.pages || [], chrome: nextPublication.chrome || {}, history: nextEntries });
  } catch (error) {
    console.error('Could not undo the latest publication:', error);
    return NextResponse.json({ error: 'Could not undo the latest publication.' }, { status: 500 });
  }
}
