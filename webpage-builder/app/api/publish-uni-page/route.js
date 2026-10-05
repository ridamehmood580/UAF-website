import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { readWorkflowItems, writeWorkflowItems } from '../../../lib/workflowStore';

export const runtime = 'nodejs';

const DEPARTMENT_FACULTIES = {
  'Faculty of Agriculture': ['fac-agri', ['agronomy', 'entomology', 'plant-pathology', 'plant-breeding', 'forestry', 'horticulture', 'soil-sciences', 'cabb']],
  'Faculty of Veterinary Science': ['fac-vet', ['vet-anatomy', 'vet-pathology', 'vet-parasitology', 'vet-cms', 'vet-theriogenology', 'vet-epidemiology', 'vet-microbiology', 'vet-physiology']],
  'Faculty of Sciences': ['fac-sci', ['sci-cs', 'sci-botany', 'sci-zoology', 'sci-chemistry', 'sci-biochemistry', 'sci-physics', 'sci-math', 'sci-cabb', 'sci-hitech']],
  'Faculty of Animal Husbandry': ['fac-husbandry', ['ah-livestock', 'ah-breeding', 'ah-nutrition', 'ah-poultry', 'ah-iads']],
  'Faculty of Agriculture Engineering and Technology': ['fac-engg', ['engg-machinery', 'engg-irrigation', 'engg-structures', 'engg-food', 'engg-fiber', 'engg-wmrc']],
  'Faculty of Social Sciences': ['fac-social', ['soc-sociology', 'soc-iare', 'soc-iaeerd', 'soc-ibms']],
  'Faculty of Food, Nutrition and Home Sciences': ['fac-food', ['food-hnd', 'food-safety', 'food-nifsat', 'food-homesci']],
  'Faculty of Arts and Humanities': ['fac-arts', ['arts-english', 'arts-islamic', 'arts-pakstudies', 'arts-design', 'arts-languages']],
  'Faculty of Health and Pharmaceutical Sciences': ['fac-health', ['health-pharmacology', 'health-pharmaceutics', 'health-chem', 'health-pharmacy']],
};
function isDepartmentTargetValid(department, targetPage) {
  const config = DEPARTMENT_FACULTIES[department];
  if (!config || typeof targetPage !== 'string') return false;
  const [facultyId, units] = config;
  const [prefix, targetFaculty, section, targetUnit, subview] = targetPage.split(':');
  if (prefix !== 'faculty' || targetFaculty !== facultyId) return false;
  if (['overview', 'dean', 'undergraduate', 'postgraduate', 'internship', 'short-courses', 'portfolio'].includes(section)) return targetPage === `faculty:${facultyId}:${section}`;
  return section === 'unit' && units.includes(targetUnit) && ['overview', 'staff', 'portfolio'].includes(subview) && targetPage === `faculty:${facultyId}:unit:${targetUnit}:${subview}`;
}
const publishedFiles = [
  path.resolve(process.cwd(), '..', 'uni', 'public', 'published-pages.json'),
  path.resolve(process.cwd(), '..', 'uni', 'dist', 'published-pages.json'),
];

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Request must contain valid JSON.' }, { status: 400 }); }

  const { id, department, targetPage } = body || {};
  if (!id || !isDepartmentTargetValid(department, targetPage)) {
    return NextResponse.json({ error: 'Select a page that belongs to the chosen department.' }, { status: 400 });
  }

  try {
    const workflowItems = await readWorkflowItems();
    const approvedItem = workflowItems.find(item => item.id === id);
    if (!approvedItem || approvedItem.status !== 'approved') return NextResponse.json({ error: 'Only a design accepted by the superadmin can be published.' }, { status: 409 });
    const [publishedFile] = publishedFiles;
    await mkdir(path.dirname(publishedFile), { recursive: true });
    let publication = { pages: [] };
    try { publication = JSON.parse(await readFile(publishedFile, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    const pages = Array.isArray(publication.pages) ? publication.pages : [];
    const publishedAt = new Date().toISOString();
    const entry = { id, title: approvedItem.title, department, targetPage, data: approvedItem.data, publishedAt };
    const next = { pages: [...pages.filter(page => page.targetPage !== targetPage), entry] };
    for (const outputFile of publishedFiles) {
      await mkdir(path.dirname(outputFile), { recursive: true });
      const temporaryFile = `${outputFile}.tmp`;
      await writeFile(temporaryFile, JSON.stringify(next, null, 2), 'utf8');
      await rename(temporaryFile, outputFile);
    }
    const updatedItem = { ...approvedItem, status: 'published', department, targetPage, publishedAt, updatedAt: publishedAt };
    await writeWorkflowItems(workflowItems.map(item => item.id === id ? updatedItem : item));
    return NextResponse.json({ success: true, publication: entry, item: updatedItem });
  } catch (error) {
    console.error('Could not publish page into uni project:', error);
    return NextResponse.json({ error: 'Could not write the published page into the uni project. Confirm both project folders are writable.' }, { status: 500 });
  }
}
