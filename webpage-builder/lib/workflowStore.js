import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

const workflowFile = path.resolve(process.cwd(), 'storage', 'page-workflow.json');

export async function readWorkflowItems() {
  try {
    const parsed = JSON.parse(await readFile(workflowFile, 'utf8'));
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function writeWorkflowItems(items) {
  await mkdir(path.dirname(workflowFile), { recursive: true });
  const temporaryFile = `${workflowFile}.tmp`;
  await writeFile(temporaryFile, JSON.stringify({ items }, null, 2), 'utf8');
  await rename(temporaryFile, workflowFile);
}
