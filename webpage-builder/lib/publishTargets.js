const FACULTIES = [
  ['Faculty of Agriculture', 'fac-agri', ['agronomy', 'entomology', 'plant-pathology', 'plant-breeding', 'forestry', 'horticulture', 'soil-sciences', 'cabb']],
  ['Faculty of Veterinary Science', 'fac-vet', ['vet-anatomy', 'vet-pathology', 'vet-parasitology', 'vet-cms', 'vet-theriogenology', 'vet-epidemiology', 'vet-microbiology', 'vet-physiology']],
  ['Faculty of Sciences', 'fac-sci', ['sci-cs', 'sci-botany', 'sci-zoology', 'sci-chemistry', 'sci-biochemistry', 'sci-physics', 'sci-math', 'sci-cabb', 'sci-hitech']],
  ['Faculty of Animal Husbandry', 'fac-husbandry', ['ah-livestock', 'ah-breeding', 'ah-nutrition', 'ah-poultry', 'ah-iads']],
  ['Faculty of Agriculture Engineering and Technology', 'fac-engg', ['engg-machinery', 'engg-irrigation', 'engg-structures', 'engg-food', 'engg-fiber', 'engg-wmrc']],
  ['Faculty of Social Sciences', 'fac-social', ['soc-sociology', 'soc-iare', 'soc-iaeerd', 'soc-ibms']],
  ['Faculty of Food, Nutrition and Home Sciences', 'fac-food', ['food-hnd', 'food-safety', 'food-nifsat', 'food-homesci']],
  ['Faculty of Arts and Humanities', 'fac-arts', ['arts-english', 'arts-islamic', 'arts-pakstudies', 'arts-design', 'arts-languages']],
  ['Faculty of Health and Pharmaceutical Sciences', 'fac-health', ['health-pharmacology', 'health-pharmaceutics', 'health-chem', 'health-pharmacy']],
];

const labelOf = id => id.replaceAll('-', ' ');

// Faculty -> departments tree, used by the "Add new option" menus.
export const FACULTY_TREE = FACULTIES.map(([name, id, units]) => ({
  id, name, units: units.map(unit => ({ id: unit, label: labelOf(unit) })),
}));

const BASE_TARGETS = [
  { value: 'home', label: 'Main website — Home', department: 'Main website' },
  { value: 'vision', label: 'Main website — Vision & announcements', department: 'Main website' },
  { value: 'about', label: 'Main website — About', department: 'Main website' },
  { value: 'events', label: 'Main website — Events', department: 'Main website' },
  { value: 'research', label: 'Main website — Research', department: 'Main website' },
  { value: 'admissions', label: 'Main website — Admissions', department: 'Main website' },
  { value: 'event-detail', label: 'Main website — Event detail', department: 'Main website' },
  ...[
    ['Institutes', [
      'Institute of Horticultural Sciences', 'Institute of Soil & Environmental Sciences', 'Institute of Animal & Dairy Sciences', 'Institute of Business Management Sciences (IBMS)', 'Institute of Microbiology', 'National Institute of Food Science & Technology (NIFSAT)', 'Institute of Agricultural Extension & Rural Development', 'Institute of Pharmacy, Physiology & Pharmacology', 'Institute of Agricultural & Resource Economics',
    ], ['Overview', 'Faculty and Staff', 'Programs', 'Research & Portfolio']],
    ['Constituent colleges', ['UAF Sub-Campus Burewala (Vehari)', 'UAF Sub-Campus Toba Tek Singh', 'UAF Sub-Campus Depalpur (Okara)'], ['Overview', 'Programs', 'Faculty and Staff', 'Campus Life']],
    ['Centers & Directorates', ['U.S.–Pakistan Center for Advanced Studies', 'Community College', 'Directorate of CABB', 'Professional Training and Skill Development Center', 'Directorate of Water Management Research Centre'], ['Overview', 'Programs and Services', 'Faculty and Staff', 'Research & Projects']],
    ['Academics', ['Programs', 'Undergraduate', 'Postgraduate', 'International Students', 'Academic Calendar', 'Examinations', 'Admissions'], ['Overview', 'Details', 'Downloads']],
    ['About', ['Vision & Heritage', 'Vice Chancellor Message', 'Organization Chart', 'Act, Statues, Rules and Regulations', 'Former Vice Chancellors', 'Administration', 'Officers of the University', 'Syndicate & Statutory Bodies'], ['Overview', 'Details', 'Downloads']],
    ['Standalone pages', ['Controller of Examinations', 'Public Relations and Media', 'Directorate of Press & Publications', 'Directorate of ITRCDB', 'Directorate of Graduate Studies', 'Directorate of Procurement and Inventory Control', 'Directorate of Academics', 'Directorate of Student Affairs', 'Directorate of External Linkages', 'Directorate of Sports', 'Directorate of Farms', 'Directorate of Outreach', 'Directorate of Financial Assistance and University Advancement', 'Directorate of Planning and Development', 'Directorate of Monitoring & Evaluation', 'Business Incubation Center', 'Quality Enhancement Cell', 'Senior Tutor Office', "Foreign Students' Advisor"], ['Overview', 'Responsibilities & Services', 'Faculty and Staff', 'Resources & Downloads']],
  ].flatMap(([category, pages, sections]) => pages.flatMap(name => sections.map(section => ({
    value: `site:${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}:${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}:${section.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    label: `${category} — ${name} — ${section}`,
    department: category,
  })))),
  ...FACULTIES.flatMap(([department, facultyId, units]) => [
    ...['overview', 'dean', 'undergraduate', 'postgraduate', 'internship', 'short-courses', 'portfolio'].map(section => ({
      value: `faculty:${facultyId}:${section}`,
      label: `Faculties — ${department} — ${labelOf(section)}`,
      department,
    })),
    ...units.flatMap(unit => ['overview', 'staff', 'portfolio'].map(view => ({
      value: `faculty:${facultyId}:unit:${unit}:${view}`,
      label: `Faculties — ${department} — ${labelOf(unit)} — ${labelOf(view)}`,
      department,
    }))),
  ]),
];

export const PUBLISH_TARGETS = BASE_TARGETS;

// Options added by admins (stored by /api/custom-menu). Each looks like
// { value, name, facultyId, unitId | null, createdAt }.
export function customOptionToTarget(option) {
  const faculty = FACULTY_TREE.find(item => item.id === option.facultyId);
  if (!faculty) return null;
  const unit = option.unitId ? faculty.units.find(item => item.id === option.unitId) : null;
  if (option.unitId && !unit) return null;
  return {
    value: option.value,
    label: unit ? `Faculties — ${faculty.name} — ${unit.label} — ${option.name}` : `Faculties — ${faculty.name} — ${option.name}`,
    department: faculty.name,
    custom: true,
  };
}

export const buildPublishTargets = (customOptions = []) => [
  ...BASE_TARGETS,
  ...customOptions.map(customOptionToTarget).filter(Boolean),
];

export const getPublishTarget = (value, customOptions = []) =>
  buildPublishTargets(customOptions).find(target => target.value === value);
