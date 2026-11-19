import { NextResponse } from 'next/server';
import { getPublicRelationsPeople } from '@/lib/publicRelationsPeople';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profiles = await getPublicRelationsPeople();
    return NextResponse.json({ profiles }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    console.error('Could not load Public Relations staff:', error);
    return NextResponse.json({ error: 'Could not load staff profiles.' }, { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0' } });
  }
}
