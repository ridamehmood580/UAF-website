// ─────────────────────────────────────────────────────────────────────────────
//  UAF CMS STORE: ROLES, AUTH, & APPROVAL WORKFLOW ENGINE
//  Handles department JSON proposals, Super Admin reviews, and live publish.
// ─────────────────────────────────────────────────────────────────────────────

import { buildTemplate } from './pageTemplates';

export interface AuthUser {
  email: string;
  name: string;
  role: 'super_admin' | 'department_editor';
  departmentId?: string;
  departmentName?: string;
}

export interface ChangeRequest {
  id: string;
  departmentId: string;
  departmentName: string;
  title: string;
  templateId?: string;
  submittedBy: string;
  submittedByName: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  pageData: {
    meta?: {
      title?: string;
      author?: string;
      allowPageScroll?: boolean;
      template?: string;
    };
    elements: any[];
  };
}

const AUTH_STORAGE_KEY = 'uaf-cms-auth-user';
const REQUESTS_STORAGE_KEY = 'uaf-cms-change-requests-v1';
const PUBLISHED_PAGES_KEY = 'uaf-cms-published-pages-v1';

// Default Super Admin: ridaparveen116@gmail.com
export const SUPER_ADMIN_USER: AuthUser = {
  email: 'ridaparveen116@gmail.com',
  name: 'Rida Parveen',
  role: 'super_admin'
};

export const DEMO_DEPARTMENTS: Array<{ id: string; name: string; email: string }> = [
  { id: 'agronomy', name: 'Department of Agronomy', email: 'agronomy.editor@uaf.edu.pk' },
  { id: 'cs', name: 'Department of Computer Science', email: 'cs.editor@uaf.edu.pk' },
  { id: 'entomology', name: 'Department of Entomology', email: 'entomology.editor@uaf.edu.pk' },
  { id: 'soil-science', name: 'Institute of Soil & Environmental Sciences', email: 'soil.editor@uaf.edu.pk' },
  { id: 'food-science', name: 'National Institute of Food Science & Tech', email: 'nifsat.editor@uaf.edu.pk' }
];

// Seed initial realistic proposals for the admin review dashboard
function seedInitialRequests(): ChangeRequest[] {
  const agrTemplate = buildTemplate('faculty-directory');
  const csTemplate = buildTemplate('undergraduate-programs');
  const entTemplate = buildTemplate('department-overview');

  return [
    {
      id: 'req-agr-101',
      departmentId: 'agronomy',
      departmentName: 'Department of Agronomy',
      title: 'Autumn 2026 Faculty & Staff Directory (Updated Profiles)',
      templateId: 'faculty-directory',
      submittedBy: 'agronomy.editor@uaf.edu.pk',
      submittedByName: 'Agronomy Content Editor',
      submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'pending',
      pageData: agrTemplate || { meta: { title: 'Agronomy Faculty Directory' }, elements: [] }
    },
    {
      id: 'req-cs-202',
      departmentId: 'cs',
      departmentName: 'Department of Computer Science',
      title: 'B.Sc. (Hons) Degree Curriculum & Lab Matrix 2026',
      templateId: 'undergraduate-programs',
      submittedBy: 'cs.editor@uaf.edu.pk',
      submittedByName: 'CS Department Coordinator',
      submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      status: 'pending',
      pageData: csTemplate || { meta: { title: 'CS Undergraduate Programs' }, elements: [] }
    },
    {
      id: 'req-ent-303',
      departmentId: 'entomology',
      departmentName: 'Department of Entomology',
      title: 'Department Academic Overview & Research Facilities',
      templateId: 'department-overview',
      submittedBy: 'entomology.editor@uaf.edu.pk',
      submittedByName: 'Entomology Office',
      submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      status: 'approved',
      reviewedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      reviewedBy: 'ridaparveen116@gmail.com',
      pageData: entTemplate || { meta: { title: 'Entomology Overview' }, elements: [] }
    }
  ];
}

// Auth Helpers
export function getCurrentUser(): AuthUser | null {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function setCurrentUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    console.error(e);
  }
}

// Change Requests / Proposals Management
export function getChangeRequests(): ChangeRequest[] {
  try {
    const data = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    const initial = seedInitialRequests();
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  } catch (e) {
    return seedInitialRequests();
  }
}

export function saveChangeRequests(list: ChangeRequest[]) {
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

// Department submits new change request JSON to Admin
export function submitDepartmentProposal(
  departmentId: string,
  departmentName: string,
  title: string,
  submittedBy: string,
  submittedByName: string,
  pageData: any,
  templateId?: string
): ChangeRequest {
  const requests = getChangeRequests();
  const newReq: ChangeRequest = {
    id: `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    departmentId,
    departmentName,
    title: title || 'Department Web Page Update',
    templateId,
    submittedBy,
    submittedByName,
    submittedAt: new Date().toISOString(),
    status: 'pending',
    pageData
  };
  const updated = [newReq, ...requests];
  saveChangeRequests(updated);
  return newReq;
}

// Super Admin accepts and applies proposal -> deploys to live site
export function approveProposal(requestId: string, adminEmail = 'ridaparveen116@gmail.com'): boolean {
  const requests = getChangeRequests();
  const target = requests.find((r) => r.id === requestId);
  if (!target) return false;

  target.status = 'approved';
  target.reviewedAt = new Date().toISOString();
  target.reviewedBy = adminEmail;
  target.feedback = undefined;

  saveChangeRequests([...requests]);

  // Persist to live published pages repository
  publishDepartmentPage(target.departmentId, target.pageData);
  return true;
}

// Super Admin rejects proposal and enters feedback note for department user
export function rejectProposal(
  requestId: string,
  reason: string,
  adminEmail = 'ridaparveen116@gmail.com'
): boolean {
  const requests = getChangeRequests();
  const target = requests.find((r) => r.id === requestId);
  if (!target) return false;

  target.status = 'rejected';
  target.reviewedAt = new Date().toISOString();
  target.reviewedBy = adminEmail;
  target.feedback = reason;

  saveChangeRequests([...requests]);
  return true;
}

// Published pages management
export function getPublishedDepartmentPages(): Record<string, any> {
  try {
    const data = localStorage.getItem(PUBLISHED_PAGES_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return {};
}

export function publishDepartmentPage(departmentId: string, pageData: any) {
  try {
    const current = getPublishedDepartmentPages();
    current[departmentId] = {
      publishedAt: new Date().toISOString(),
      pageData
    };
    localStorage.setItem(PUBLISHED_PAGES_KEY, JSON.stringify(current));
  } catch (e) {
    console.error(e);
  }
}

export function getPublishedDepartmentPage(departmentId: string): any | null {
  const all = getPublishedDepartmentPages();
  return all[departmentId] ? all[departmentId].pageData : null;
}
