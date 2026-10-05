import { NextResponse } from 'next/server';
import { hasSuperadminSession } from '../../../lib/superadminSession';
import { readWorkflowItems, writeWorkflowItems } from '../../../lib/workflowStore';

export const runtime = 'nodejs';

export async function GET() {
  try { return NextResponse.json({ items: await readWorkflowItems() }); }
  catch (error) {
    console.error('Could not read page workflow:', error);
    return NextResponse.json({ error: 'Could not read submitted designs.' }, { status: 500 });
  }
}

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Request must contain valid JSON.' }, { status: 400 }); }

  try {
    const items = await readWorkflowItems();
    if (body?.action === 'submit') {
      const { id, title, author, data, createdAt } = body.item || {};
      if (!id || !Array.isArray(data?.elements) || !data.elements.length) return NextResponse.json({ error: 'This page design has no content to submit.' }, { status: 400 });
      const existing = items.find(item => item.id === id);
      if (existing) return NextResponse.json({ item: existing });
      const item = { id, title: title || 'Untitled page', author: author || 'Designer', data, status: 'pending', createdAt: createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
      await writeWorkflowItems([item, ...items]);
      return NextResponse.json({ item }, { status: 201 });
    }

    if (body?.action === 'review') {
      if (!hasSuperadminSession(request)) return NextResponse.json({ error: 'Sign in as superadmin to review designs.' }, { status: 401 });
      if (!['approved', 'rejected'].includes(body.status)) return NextResponse.json({ error: 'Choose accept or reject.' }, { status: 400 });
      const item = items.find(entry => entry.id === body.id);
      if (!item) return NextResponse.json({ error: 'This submission could not be found.' }, { status: 404 });
      if (item.status !== 'pending') return NextResponse.json({ error: 'This design has already been reviewed.' }, { status: 409 });
      const updated = { ...item, status: body.status, feedback: String(body.feedback || ''), reviewedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await writeWorkflowItems(items.map(entry => entry.id === body.id ? updated : entry));
      return NextResponse.json({ item: updated });
    }

    return NextResponse.json({ error: 'Unknown workflow action.' }, { status: 400 });
  } catch (error) {
    console.error('Could not update page workflow:', error);
    return NextResponse.json({ error: 'Could not save the page workflow.' }, { status: 500 });
  }
}
