import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  DepartmentDetailData,
  FacultyMeta,
  StaffMember,
  DEPARTMENT_DETAILS_MAP,
  FACULTY_DATA_MAP,
  FACULTY_MENUS_MAP,
  FACULTY_PORTRAIT_POOL,
  MALE_PROFESSOR_NAMES_POOL,
  DynamicDivisionMeta
} from '../data/facultyDefaultData';

const STORAGE_KEY = 'uaf_dynamic_faculty_store_v1';
const EVENT_NAME = 'uaf_faculty_data_changed';

export interface DynamicStoreData {
  departmentDetails: Record<string, DepartmentDetailData>;
  facultyMetaMap: Record<string, FacultyMeta>;
  customDepartments: string[]; // ids of user added departments
  lastUpdated: string;
}

// In-memory cache
let inMemoryStore: DynamicStoreData | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

/**
 * Initializes store from localStorage or default static maps
 */
export function getStoreData(): DynamicStoreData {
  if (inMemoryStore) {
    return inMemoryStore;
  }

  if (typeof window === 'undefined') {
    return {
      departmentDetails: { ...DEPARTMENT_DETAILS_MAP },
      facultyMetaMap: { ...FACULTY_DATA_MAP },
      customDepartments: [],
      lastUpdated: new Date().toISOString()
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.departmentDetails) {
        // Merge with defaults in case new default keys exist
        inMemoryStore = {
          departmentDetails: { ...DEPARTMENT_DETAILS_MAP, ...parsed.departmentDetails },
          facultyMetaMap: { ...FACULTY_DATA_MAP, ...parsed.facultyMetaMap },
          customDepartments: parsed.customDepartments || [],
          lastUpdated: parsed.lastUpdated || new Date().toISOString()
        };
        return inMemoryStore;
      }
    }
  } catch (err) {
    console.error('Failed to load dynamic faculty store from localStorage:', err);
  }

  inMemoryStore = {
    departmentDetails: { ...DEPARTMENT_DETAILS_MAP },
    facultyMetaMap: { ...FACULTY_DATA_MAP },
    customDepartments: [],
    lastUpdated: new Date().toISOString()
  };
  return inMemoryStore;
}

function saveStoreData(data: DynamicStoreData) {
  inMemoryStore = { ...data, lastUpdated: new Date().toISOString() };
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryStore));
    }
  } catch (err) {
    console.error('Failed to save dynamic faculty store to localStorage:', err);
  }
  notifyListeners();
}

/**
 * Resolves or dynamically generates department details
 */
export function getDepartment(
  sectionId: string,
  facultyInfo?: FacultyMeta
): DepartmentDetailData | undefined {
  const store = getStoreData();

  // 1. If explicitly in store (either custom edited or default)
  if (store.departmentDetails[sectionId]) {
    return store.departmentDetails[sectionId];
  }

  // 2. Otherwise search across FACULTY_MENUS_MAP and generate fallback
  let matchedDivision: DynamicDivisionMeta | undefined;
  let matchedFacultyKey = 'fac-agri';

  for (const facKey of Object.keys(FACULTY_MENUS_MAP)) {
    const cfg = FACULTY_MENUS_MAP[facKey];
    matchedDivision =
      cfg.departments.find((d) => d.id === sectionId) ||
      cfg.institutes.find((i) => i.id === sectionId);
    if (matchedDivision) {
      matchedFacultyKey = facKey;
      break;
    }
  }

  if (!matchedDivision) return undefined;

  const resolvedFaculty =
    facultyInfo || store.facultyMetaMap[matchedFacultyKey] || FACULTY_DATA_MAP['fac-agri'];

  const seed = sectionId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const focusParts = matchedDivision.focus.split(',').map((s) => s.trim());

  const dynamicStaffList: StaffMember[] = Array.from({ length: 8 }).map((_, idx) => {
    const name = MALE_PROFESSOR_NAMES_POOL[(seed + idx) % MALE_PROFESSOR_NAMES_POOL.length];
    const designation =
      idx === 0
        ? 'Chairman / Professor'
        : idx < 3
        ? 'Professor'
        : idx < 6
        ? 'Associate Professor'
        : 'Assistant Professor';
    const qual = idx % 2 === 0 ? 'Ph.D. (UAF) • Post-Doc' : 'Ph.D.';
    const spec = focusParts[idx % focusParts.length] || matchedDivision!.label;
    const emailPrefix = name
      .toLowerCase()
      .replace(/prof\.|dr\./g, '')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .join('.');

    return {
      name,
      designation,
      qualification: qual,
      specialization: spec,
      researchAreas: matchedDivision!.focus,
      address: `${matchedDivision!.fullName}, ${resolvedFaculty.fullName}, University of Agriculture, Faisalabad-Punjab-Pakistan, Postal Code: 38000`,
      phone: `+92419200161 - Ext. ${3101 + ((seed + idx) % 400)}`,
      email: `${emailPrefix}@uaf.edu.pk`,
      hecApprovedSupervisor: 'Yes',
      image: FACULTY_PORTRAIT_POOL[(seed + idx) % FACULTY_PORTRAIT_POOL.length]
    };
  });

  return {
    id: sectionId,
    name: matchedDivision.fullName,
    shortLabel: matchedDivision.label,
    overviewTitle: `${matchedDivision.fullName} - Overview`,
    staffTitle: `${matchedDivision.fullName} - Faculty and Staff`,
    buildingImage: '/uaf_historic_campus.jpg',
    buildingCaption: `${matchedDivision.fullName}, ${resolvedFaculty.fullName}, University of Agriculture, Faisalabad`,
    paragraphsTop: [
      `The ${matchedDivision.fullName} is a premier academic and research division within the ${resolvedFaculty.fullName} at the University of Agriculture, Faisalabad. Established to advance higher education and scientific discovery, the department plays a pivotal role in training undergraduate, M.Phil./M.Sc. (Hons.), and Ph.D. scholars equipped with modern theoretical and laboratory competencies.`
    ],
    paragraphsWithImage: [
      `Specializing in ${matchedDivision.focus}, the ${matchedDivision.fullName} maintains state-of-the-art analytical laboratories, dedicated experimental stations, and collaborative linkages with national and international research organizations. Faculty members actively lead research projects funded by HEC, PSF, PARB, and global partner universities.`
    ],
    paragraphsBottom: [
      `Graduates of the ${matchedDivision.fullName} serve across leading public-sector research institutes, universities, multinational industries, and regulatory bodies in Pakistan and abroad. Through continuous curriculum modernization and industry-driven internships, the department upholds the century-old academic legacy of UAF.`
    ],
    societiesOrLabsTitle: 'Specialized Research Laboratories & Academic Units',
    societiesOrLabs: [
      `${focusParts[0] || matchedDivision.label} Research & Diagnostics Lab`,
      `${focusParts[1] || 'Advanced Molecular'} & Analytical Instrumentation Unit`,
      `${focusParts[2] || 'Postgraduate'} Experimental & Field Research Cell`,
      `HEC Accredited Postgraduate Supervision & Seminar Library`
    ],
    facultySummaryBadge: 'Distinguished HEC-Approved Faculty & Researchers',
    staffList: dynamicStaffList
  };
}

/**
 * Returns a list of all available departments across all faculties for UI selectors
 */
export function getAllDepartmentsList(): {
  id: string;
  name: string;
  facultyId: string;
  facultyName: string;
  staffCount: number;
}[] {
  const store = getStoreData();
  const list: {
    id: string;
    name: string;
    facultyId: string;
    facultyName: string;
    staffCount: number;
  }[] = [];

  // 1. Gather all divisions from FACULTY_MENUS_MAP
  for (const facKey of Object.keys(FACULTY_MENUS_MAP)) {
    const cfg = FACULTY_MENUS_MAP[facKey];
    const facName = store.facultyMetaMap[facKey]?.shortName || facKey;

    cfg.departments.forEach((dept) => {
      const detail = getDepartment(dept.id);
      list.push({
        id: dept.id,
        name: dept.fullName,
        facultyId: facKey,
        facultyName: facName,
        staffCount: detail?.staffList.length || 0
      });
    });

    cfg.institutes.forEach((inst) => {
      const detail = getDepartment(inst.id);
      list.push({
        id: inst.id,
        name: inst.fullName,
        facultyId: facKey,
        facultyName: facName,
        staffCount: detail?.staffList.length || 0
      });
    });
  }

  // 2. Add any other departments in store that weren't in menus
  Object.keys(store.departmentDetails).forEach((deptId) => {
    if (!list.some((item) => item.id === deptId)) {
      const d = store.departmentDetails[deptId];
      list.push({
        id: deptId,
        name: d.name,
        facultyId: 'fac-agri',
        facultyName: 'Custom Department',
        staffCount: d.staffList.length
      });
    }
  });

  return list;
}

/**
 * Add a new Faculty Member dynamically to any department
 */
export function addFacultyMember(deptId: string, member: StaffMember): void {
  const store = getStoreData();
  const existingDept = getDepartment(deptId);
  if (!existingDept) return;

  const updatedStaffList = [member, ...existingDept.staffList];
  const updatedDept: DepartmentDetailData = {
    ...existingDept,
    staffList: updatedStaffList
  };

  saveStoreData({
    ...store,
    departmentDetails: {
      ...store.departmentDetails,
      [deptId]: updatedDept
    }
  });
}

/**
 * Update an existing faculty member by index
 */
export function updateFacultyMember(
  deptId: string,
  memberIndex: number,
  updatedMember: StaffMember
): void {
  const store = getStoreData();
  const existingDept = getDepartment(deptId);
  if (!existingDept || !existingDept.staffList[memberIndex]) return;

  const updatedStaffList = [...existingDept.staffList];
  updatedStaffList[memberIndex] = updatedMember;

  const updatedDept: DepartmentDetailData = {
    ...existingDept,
    staffList: updatedStaffList
  };

  saveStoreData({
    ...store,
    departmentDetails: {
      ...store.departmentDetails,
      [deptId]: updatedDept
    }
  });
}

/**
 * Delete a faculty member from a department
 */
export function deleteFacultyMember(deptId: string, memberIndex: number): void {
  const store = getStoreData();
  const existingDept = getDepartment(deptId);
  if (!existingDept || !existingDept.staffList[memberIndex]) return;

  const updatedStaffList = existingDept.staffList.filter((_, idx) => idx !== memberIndex);

  const updatedDept: DepartmentDetailData = {
    ...existingDept,
    staffList: updatedStaffList
  };

  saveStoreData({
    ...store,
    departmentDetails: {
      ...store.departmentDetails,
      [deptId]: updatedDept
    }
  });
}

/**
 * Update Department details (overview paragraphs, research labs, title)
 */
export function updateDepartment(
  deptId: string,
  partial: Partial<DepartmentDetailData>
): void {
  const store = getStoreData();
  const existingDept = getDepartment(deptId);
  if (!existingDept) return;

  const updatedDept: DepartmentDetailData = {
    ...existingDept,
    ...partial
  };

  saveStoreData({
    ...store,
    departmentDetails: {
      ...store.departmentDetails,
      [deptId]: updatedDept
    }
  });
}

/**
 * Reset all faculty data back to defaults
 */
export function resetFacultyDataToDefaults(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  inMemoryStore = {
    departmentDetails: { ...DEPARTMENT_DETAILS_MAP },
    facultyMetaMap: { ...FACULTY_DATA_MAP },
    customDepartments: [],
    lastUpdated: new Date().toISOString()
  };
  notifyListeners();
}

/**
 * Check if the user has custom modifications stored in localStorage
 */
export function hasCustomModifications(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(STORAGE_KEY);
}

/**
 * Export all faculty data as JSON file download
 */
export function exportFacultyDataJSON(): void {
  const store = getStoreData();
  const jsonStr = JSON.stringify(store, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `uaf_faculty_data_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import faculty data from JSON string
 */
export function importFacultyDataJSON(jsonStr: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, message: 'Invalid JSON format.' };
    }
    if (!parsed.departmentDetails && !parsed.staffList) {
      return {
        success: false,
        message: 'JSON file must contain "departmentDetails" or valid faculty records.'
      };
    }

    const current = getStoreData();
    const newStore: DynamicStoreData = {
      departmentDetails: { ...current.departmentDetails, ...(parsed.departmentDetails || {}) },
      facultyMetaMap: { ...current.facultyMetaMap, ...(parsed.facultyMetaMap || {}) },
      customDepartments: parsed.customDepartments || current.customDepartments,
      lastUpdated: new Date().toISOString()
    };

    saveStoreData(newStore);
    return { success: true, message: 'Faculty data imported successfully!' };
  } catch (err: any) {
    return { success: false, message: `Parse error: ${err.message}` };
  }
}

/**
 * React Hook for reactive updates in any component
 */
export function useFacultyStore() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setVersion((v) => v + 1);
    };

    listeners.add(handleUpdate);
    window.addEventListener(EVENT_NAME, handleUpdate);

    return () => {
      listeners.delete(handleUpdate);
      window.removeEventListener(EVENT_NAME, handleUpdate);
    };
  }, []);

  const store = getStoreData();

  return {
    store,
    getDepartment,
    getAllDepartmentsList,
    addFacultyMember,
    updateFacultyMember,
    deleteFacultyMember,
    updateDepartment,
    resetToDefaults: resetFacultyDataToDefaults,
    hasCustomModifications: hasCustomModifications(),
    exportJSON: exportFacultyDataJSON,
    importJSON: importFacultyDataJSON
  };
}
