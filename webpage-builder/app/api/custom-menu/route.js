import { NextResponse } from 'next/server';
import { FACULTY_TREE } from '../../../lib/publishTargets';
import { readCustomMenu, saveCustomMenu } from '../../../lib/serverStore';

export const runtime = 'nodejs';

const slugify = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export async function GET() {
  try { return NextResponse.json({ options: await readCustomMenu() }); }
  catch (error) {
    console.error('Could not read custom menu:', error);
    return NextResponse.json({ error: 'Could not read custom menu options.' }, { status: 500 });
  }
}

// Add a new option under a faculty (unitId empty) or under a department.
export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Request must contain valid JSON.' }, { status: 400 }); }

  const name = String(body?.name || '').trim().replace(/\s+/g, ' ');
  const faculty = FACULTY_TREE.find(item => item.id === body?.facultyId);
  const unitId = body?.unitId || null;
  if (!faculty) return NextResponse.json({ error: 'Choose a valid faculty.' }, { status: 400 });
  if (unitId && !faculty.units.some(unit => unit.id === unitId)) return NextResponse.json({ error: 'Choose a valid department.' }, { status: 400 });
  if (name.length < 2 || name.length > 60) return NextResponse.json({ error: 'Option name must be 2–60 characters.' }, { status: 400 });
  const slug = slugify(name);
  if (!slug) return NextResponse.json({ error: 'Option name must contain letters or numbers.' }, { status: 400 });

  try {
    const options = await readCustomMenu();
    const value = unitId ? `faculty:${faculty.id}:unit:${unitId}:custom-${slug}` : `faculty:${faculty.id}:custom-${slug}`;
    if (options.some(option => option.value === value)) return NextResponse.json({ error: 'This option already exists here.' }, { status: 409 });
    const option = { value, name, facultyId: faculty.id, unitId, createdAt: new Date().toISOString() };
    const next = [...options, option];
    await saveCustomMenu(next);
    return NextResponse.json({ success: true, option, options: next });
  } catch (error) {
    console.error('Could not save custom menu option:', error);
    return NextResponse.json({ error: 'Could not save the new option.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const value = new URL(request.url).searchParams.get('value');
  try {
    const options = await readCustomMenu();
    const next = options.filter(option => option.value !== value);
    if (next.length === options.length) return NextResponse.json({ error: 'Option not found.' }, { status: 404 });
    await saveCustomMenu(next);
    return NextResponse.json({ success: true, options: next });
  } catch (error) {
    console.error('Could not delete custom menu option:', error);
    return NextResponse.json({ error: 'Could not remove the option.' }, { status: 500 });
  }
}
