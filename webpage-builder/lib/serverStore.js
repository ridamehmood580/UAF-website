import { copyFile, mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const publishedFiles = [
  path.resolve(process.cwd(), '..', 'uni', 'public', 'published-pages.json'),
  path.resolve(process.cwd(), '..', 'uni', 'dist', 'published-pages.json'),
];
export const publicationDirectories = [
  path.resolve(process.cwd(), '..', 'uni', 'public', 'published-pages'),
  path.resolve(process.cwd(), '..', 'uni', 'dist', 'published-pages'),
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

const safeName = value => Buffer.from(String(value)).toString('base64url');

export async function readPublication() {
  const legacy = await readJson(publishedFiles[0], { pages: [], chrome: {} });
  const publication = { ...legacy, pages: [], chrome: {} };
  try {
    const files = (await readdir(publicationDirectories[0])).filter(name => name.endsWith('.json'));
    if (!files.length) return { ...legacy, pages: legacy.pages || [], chrome: legacy.chrome || {} };
    for (const name of files) {
      const record = await readJson(path.join(publicationDirectories[0], name), null);
      if (!record) continue;
      if (record.kind === 'page' && record.entry) publication.pages.push(record.entry);
      if (record.kind === 'chrome' && record.region && record.entry) publication.chrome[record.region] = record.entry;
      if (record.kind === 'page-chrome' && record.target && record.region && record.entry) {
        publication.chrome.pageOverrides ||= {};
        publication.chrome.pageOverrides[record.target] ||= {};
        publication.chrome.pageOverrides[record.target][record.region] = record.entry;
      }
      if (record.kind === 'custom-menu') publication.customMenu = record.options || [];
    }
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  return publication;
}

export async function writePublication(publication) {
  for (const directory of publicationDirectories) {
    await mkdir(directory, { recursive: true });
    for (const name of await readdir(directory)) {
      if (/^(page-|chrome-|page-chrome-).+\.json$/.test(name) || name === 'custom-menu.json') {
        await unlink(path.join(directory, name));
      }
    }
    for (const entry of publication.pages || []) {
      await writeJson(path.join(directory, `page-${safeName(entry.targetPage)}.json`), { kind: 'page', entry });
    }
    for (const [region, entry] of Object.entries(publication.chrome || {})) {
      if (region === 'pageOverrides' || !entry) continue;
      await writeJson(path.join(directory, `chrome-${region}.json`), { kind: 'chrome', region, entry });
    }
    for (const [target, regions] of Object.entries(publication.chrome?.pageOverrides || {})) {
      for (const [region, entry] of Object.entries(regions || {})) {
        await writeJson(path.join(directory, `page-chrome-${safeName(`${target}:${region}`)}.json`), { kind: 'page-chrome', target, region, entry });
      }
    }
    await writeJson(path.join(directory, 'custom-menu.json'), { kind: 'custom-menu', options: publication.customMenu || [] });
  }
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
  const publication = await readPublication();
  await writePublication({ ...publication, customMenu: options });
}
