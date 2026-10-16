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
  ...FACULTIES.flatMap(([department, facultyId, units]) => [
    ...['overview', 'dean', 'undergraduate', 'postgraduate', 'internship', 'short-courses', 'portfolio'].map(section => ({
      value: `faculty:${facultyId}:${section}`,
      label: `${department} — ${labelOf(section)}`,
      department,
    })),
    ...units.flatMap(unit => ['overview', 'staff', 'portfolio'].map(view => ({
      value: `faculty:${facultyId}:unit:${unit}:${view}`,
      label: `${department} — ${labelOf(unit)} — ${labelOf(view)}`,
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
    label: unit ? `${faculty.name} — ${unit.label} — ${option.name}` : `${faculty.name} — ${option.name}`,
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
