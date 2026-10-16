import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'published-pages.json');
    const contents = await readFile(filePath, 'utf8');
    const publication = JSON.parse(contents);

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
