export type DegreeLevel =
  | 'Undergraduate'
  | 'Postgraduate'
  | 'PhD'
  | 'Diploma & Certificate';

export interface Faculty {
  id: string;
  name: string;
  shortCode: string;
  establishedYear: number;
  departmentsCount: number;
  deanName: string;
  description: string;
  iconName: string;
  image: string;
}

export interface AcademicProgram {
  id: string;
  title: string;
  degreeLevel: DegreeLevel;
  facultyId: string;
  facultyName: string;
  department: string;
  duration: string;
  creditHours: number;
  semesterFeePKR: number;
  seats: number;
  shift: 'Morning' | 'Evening' | 'Both';
  eligibility: string;
  overview: string;
  careerProspects: string[];
  tags: string[];
  closingMerit2025?: number;
}

export type NoticeCategory =
  | 'All'
  | 'Admissions'
  | 'Examinations'
  | 'Scholarships'
  | 'Tenders'
  | 'General'
  | 'Jobs & Careers';

export interface Notice {
  id: string;
  title: string;
  referenceNumber: string;
  category: NoticeCategory;
  date: string;
  summary: string;
  targetAudience: string;
  isUrgent?: boolean;
  isNew?: boolean;
  fileSize: string;
  attachmentName: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image: string;
  description: string;
  details?: string;
  registrationOpen?: boolean;
}

export interface StudentResource {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  features: string[];
  location: string;
  helpline: string;
  timing: string;
  quickActionTitle: string;
  urlPlaceholder: string;
}

export interface CampusLandmark {
  id: string;
  name: string;
  category: string;
  year: number;
  stats: string;
  description: string;
  historicalNote: string;
  image: string;
}
