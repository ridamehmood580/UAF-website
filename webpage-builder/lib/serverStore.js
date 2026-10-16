import { copyFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const publishedFiles = [
  path.resolve(process.cwd(), '..', 'uni', 'public', 'published-pages.json'),
  path.resolve(process.cwd(), '..', 'uni', 'dist', 'published-pages.json'),
];
export const customMenuFiles = [
  path.resolve(process.cwd(), '..', 'uni', 'public', 'custom-menu.json'),
  path.resolve(process.cwd(), '..', 'uni', 'dist', 'custom-menu.json'),
];
export const historyFile = path.resolve(process.cwd(), 'storage', 'publication-history.json');
export const customMenuStore = path.resolve(process.cwd(), 'storage', 'custom-menu.json');
const templateAssetNames = ['campus-facade.jpg', 'campus-grounds.jpg', 'uaf-logo.jpg', 'uaf-logo.gif'];

export async function copyTemplateAssets() {
  const sourceDirectory = path.resolve(process.cwd(), 'public', 'templates');
  const destinations = [
    path.resolve(process.cwd(), '..', 'uni', 'public', 'templates'),
    path.resolve(process.cwd(), '..', 'uni', 'dist', 'templates'),
  ];
  for (const destination of destinations) {
    await mkdir(destination, { recursive: true });
    for (const asset of templateAssetNames) {
      await copyFile(path.join(sourceDirectory, asset), path.join(destination, asset));
    }
  }
}

export async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return fallback; throw error; }
}

export async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporaryFile = `${file}.tmp`;
  await writeFile(temporaryFile, JSON.stringify(value, null, 2), 'utf8');
  await rename(temporaryFile, file);
}

export async function readCustomMenu() {
  const data = await readJson(customMenuStore, { options: [] });
  return Array.isArray(data.options) ? data.options : [];
}

// Saves the option list for the builder AND for the university site, and
// embeds it in published-pages.json so the site can build its menus from it.
export async function saveCustomMenu(options) {
  await writeJson(customMenuStore, { options });
  for (const file of customMenuFiles) await writeJson(file, { options });
  for (const file of publishedFiles) {
    const publication = await readJson(file, { pages: [] });
    await writeJson(file, { ...publication, customMenu: options });
  }
}
