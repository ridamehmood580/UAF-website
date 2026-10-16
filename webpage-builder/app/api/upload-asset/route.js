import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const uploadDirectories = [
  path.resolve(process.cwd(), '..', 'uni', 'public', 'uploads'),
  path.resolve(process.cwd(), '..', 'uni', 'dist', 'uploads'),
  path.resolve(process.cwd(), 'public', 'uploads'),
];
const MAX_UPLOAD_SIZE = 100 * 1024 * 1024;
const allowedTypes = new Map([
  ['image/jpeg', '.jpg'], ['image/png', '.png'], ['image/gif', '.gif'],
  ['image/webp', '.webp'], ['image/svg+xml', '.svg'], ['image/avif', '.avif'],
  ['video/mp4', '.mp4'], ['video/webm', '.webm'], ['video/ogg', '.ogv'],
]);

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json({ error: 'Choose an image or video file to upload.' }, { status: 400 });
    }
    const extension = allowedTypes.get(file.type);
    if (!extension) return NextResponse.json({ error: 'This image or video format is not supported.' }, { status: 415 });
    if (file.size <= 0 || file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json({ error: 'Files must be smaller than 100 MB.' }, { status: 413 });
    }

    await Promise.all(uploadDirectories.map(directory => mkdir(directory, { recursive: true })));
    const filename = `${randomUUID()}${extension}`;
    const contents = new Uint8Array(await file.arrayBuffer());
    await Promise.all(uploadDirectories.map(directory => writeFile(path.join(directory, filename), contents, { flag: 'wx' })));
    return NextResponse.json({ url: `/uploads/${filename}`, name: file.name });
  } catch (error) {
    console.error('Could not save uploaded site asset:', error);
    return NextResponse.json({ error: 'Could not save this file to the university site.' }, { status: 500 });
  }
}
