export type DegreeLevel = 'Undergraduate' | 'Postgraduate' | 'PhD' | 'Diploma & Certificate';

export type EventCategory = 'All' | 'Academic' | 'Cultural' | 'Sports' | 'Research' | 'Workshops' | 'Admissions';

export type NoticeCategory = 'All' | 'Admissions' | 'Examinations' | 'Scholarships' | 'Tenders' | 'General' | 'Jobs & Careers';

export interface AcademicProgram {
  id: string;
  title: string;
  degreeLevel: DegreeLevel;
  facultyId: string;
  facultyName: string;
  duration: string;
  creditHours: number;
  eligibility: string;
  overview: string;
  careerProspects: string[];
  semesterFeePKR: number;
  rating: number;
  reviewsCount: number;
  seats: number;
  shift: 'Morning' | 'Evening' | 'Both';
  tags: string[];
  isPopular?: boolean;
  department: string;
}

export interface Faculty {
  id: string;
  name: string;
  shortCode: string;
  deanName: string;
  departmentsCount: number;
  studentsCount: number;
  description: string;
  image: string;
  iconName: string;
  flagshipResearch: string;
  establishedYear: number;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  organizer: string;
  description: string;
  image: string;
  isFeatured?: boolean;
  rsvpCount: number;
  maxCapacity?: number;
  registrationOpen: boolean;
  badges: string[];
  scheduleHighlights?: string[];
  speaker?: {
    name: string;
    designation: string;
    organization: string;
  };
}

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  date: string;
  referenceNumber: string;
  isNew: boolean;
  isUrgent?: boolean;
  fileSize: string;
  targetAudience: string;
  summary: string;
  attachmentName: string;
}

export interface StudentResource {
  id: string;
  title: string;
  category: 'Academic & LMS' | 'Hostels & Living' | 'Scholarships & Aid' | 'Career & Placement' | 'Health & Sports' | 'Transport & IT';
  iconName: string;
  description: string;
  quickActionTitle: string;
  urlPlaceholder: string;
  features: string[];
  helpline: string;
  timing: string;
  location: string;
}

export interface CampusLandmark {
  id: string;
  name: string;
  category: 'Heritage' | 'Academics' | 'Research Farms' | 'Student Life';
  year: number;
  description: string;
  historicalNote: string;
  image: string;
  stats: string;
}

export interface ResearchHighlight {
  id: string;
  title: string;
  leadScientist: string;
  faculty: string;
  impactMetric: string;
  summary: string;
  tags: string[];
  fundingAgency: string;
  year: number;
}

export interface UniversityStat {
  label: string;
  value: string;
  description: string;
  subtext: string;
  iconName: string;
}

export interface QuickLink {
  title: string;
  url: string;
  category: 'portals' | 'academics' | 'admissions' | 'resources';
  badge?: string;
  iconName: string;
}
