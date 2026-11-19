import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'published-pages.json');
    let publication: any = { pages: [], chrome: {} };
    try {
      const names = await readdir(path.join(process.cwd(), 'public', 'published-pages'));
      for (const name of names.filter(item => item.endsWith('.json'))) {
        const record = JSON.parse(await readFile(path.join(process.cwd(), 'public', 'published-pages', name), 'utf8'));
        if (record.kind === 'page' && record.entry) publication.pages.push(record.entry);
        if (record.kind === 'chrome' && record.region && record.entry) publication.chrome[record.region] = record.entry;
        if (record.kind === 'page-chrome' && record.target && record.region && record.entry) {
          publication.chrome.pageOverrides ||= {};
          publication.chrome.pageOverrides[record.target] ||= {};
          publication.chrome.pageOverrides[record.target][record.region] = record.entry;
        }
        if (record.kind === 'custom-menu') publication.customMenu = record.options || [];
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      // Read the old combined file so existing publications remain available after upgrading.
      try { publication = JSON.parse(await readFile(filePath, 'utf8')); }
      catch (legacyError) { if ((legacyError as NodeJS.ErrnoException).code !== 'ENOENT') throw legacyError; }
    }

    return NextResponse.json(
      {
        pages: Array.isArray(publication.pages) ? publication.pages : [],
        chrome: publication.chrome || {},
      },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        { pages: [], chrome: {} },
        { headers: { 'Cache-Control': 'no-store, max-age=0' } },
      );
    }

    console.error('Could not read published university pages:', error);
    return NextResponse.json(
      { error: 'Could not load published university pages.' },
      { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  }
}
