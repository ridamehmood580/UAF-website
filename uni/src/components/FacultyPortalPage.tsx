'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Building,
  CheckCircle2,
  Tag,
  Eye,
  ExternalLink,
  Search,
  Sparkles,
  Globe
} from 'lucide-react';
import { Header } from './Header';
import { PublishedSiteHeader } from './PublishedSiteHeader';
import { PublishedDepartmentContent } from './PublishedDepartmentContent';
import { FacultyProfileDetailPage } from './FacultyProfileDetailPage';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & DEFINITIONS (Clean & 100% Self-Contained)
// ─────────────────────────────────────────────────────────────────────────────

export type FacultySection =
  | 'overview'
  | 'dean'
  | 'undergraduate'
  | 'postgraduate'
  | 'internship'
  | 'short-courses'
  | 'portfolio'
  | 'centres'
  | string;

export interface FacultyMeta {
  id: string;
  name: string;
  shortName: string;
  fullName: string;
  tagline: string;
  deanName: string;
  deanTitle: string;
  deanPhone: string;
  deanEmail: string;
  deanOffice: string;
  historyText: string;
  departmentsCount: string;
  institutesCount: string;
  farmsCount: string;
}

export interface StaffMember {
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  researchAreas?: string;
  address?: string;
  email: string;
  secondaryEmail?: string;
  hecApprovedSupervisor?: string;
  phone?: string;
  image?: string;
}

export interface DepartmentDetailData {
  id: FacultySection;
  name: string;
  shortLabel: string;
  overviewTitle: string;
  staffTitle: string;
  buildingImage: string;
  buildingCaption: string;
  paragraphsTop: string[];
  paragraphsWithImage: string[];
  paragraphsBottom: string[];
  societiesOrLabsTitle?: string;
  societiesOrLabs?: string[];
  facultySummaryBadge: string;
  staffList: StaffMember[];
}

export interface DynamicDivisionMeta {
  id: string;
  label: string;
  fullName: string;
  focus: string;
  subDivisions?: DynamicDivisionMeta[];
}

export interface DynamicFacultyMenuConfig {
  undergradDegree?: string;
  undergradSubtitle?: string;
  undergradDuration?: string;
  deanImage: string;
  deanDepartment: string;
  deanBio1: string;
  deanBio2: string;
  departments: DynamicDivisionMeta[];
  institutes?: DynamicDivisionMeta[];
  centres?: DynamicDivisionMeta[];
  hasEducationalPrograms?: boolean;
  hasPortfolio?: boolean;
  hasCentres?: boolean;
  undergradMajors?: string[];
}

export interface PublicationItem {
  id: string;
  srNo: number;
  type: 'journal' | 'conference';
  title: string;
  authors: string;
  journalOrConf: string;
  impactFactor?: string;
  date: string;
  doi: string;
  issnOnline?: string;
  issnPrint?: string;
  url: string;
  department: string;
}

export type DepartmentSubView = 'overview' | 'staff' | 'portfolio';
type SlideDirection = 'left' | 'right' | 'bottom' | 'top';

// ─────────────────────────────────────────────────────────────────────────────
// DATA CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export const FACULTY_PORTRAIT_POOL: string[] = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80'
];

export const MALE_PROFESSOR_NAMES_POOL: string[] = [
  'Prof. Dr. Abdul Khaliq',
  'Prof. Dr. Muhammad Asghar',
  'Prof. Dr. Tariq Aziz',
  'Prof. Dr. Javaid Akhtar',
  'Prof. Dr. Zahir Ahmad Zahir',
  'Prof. Dr. Rana Nadeem Abbas',
  'Prof. Dr. Ashfaq Ahmad Chattha',
  'Prof. Dr. Muhammad Farooq',
  'Dr. Fahd Rasul',
  'Dr. Shakeel Ahmad Anjum',
  'Dr. Imran Khan',
  'Dr. M. Saqib',
  'Dr. Haroon Zaman Khan',
  'Dr. Muhammad Ather Nadeem',
  'Dr. M. Shahid Ibni Zamir',
  'Dr. M. Bilal Chattha'
];

export const FACULTY_DATA_MAP: Record<string, FacultyMeta> = {
  'fac-agri': {
    id: 'fac-agri',
    name: 'Faculty of Agriculture',
    shortName: 'Agriculture',
    fullName: 'Faculty of Agriculture',
    tagline: 'A Legacy of Excellence in Agricultural Education and Research.',
    deanName: 'Prof. Dr. Ghulam Murtaza',
    deanTitle: 'Dean, Faculty of Agriculture',
    deanPhone: '+92 41 9200161-70 Ext: 2900',
    deanEmail: 'dean.agri@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Agriculture, UAF Main Campus',
    historyText:
      'The Faculty of Agriculture is the mother faculty of the University, established as Punjab Agricultural College and Research Institute in 1906. Since then, it has played a pioneering role in developing agricultural human resources and high-yielding crop varieties for Pakistan. It houses seven departments, two prestigious research institutes, and three model experimental farms.',
    departmentsCount: '7 Departments',
    institutesCount: '2 Institutes',
    farmsCount: '3 Research Farms'
  },
  'fac-vet': {
    id: 'fac-vet',
    name: 'Faculty of Veterinary Science',
    shortName: 'Veterinary Science',
    fullName: 'Faculty of Veterinary Science',
    tagline: 'Leading Veterinary Medical Education, Clinical Health & Zoonosis Research.',
    deanName: 'Prof. Dr. Shahid Mahmood',
    deanTitle: 'Dean, Faculty of Veterinary Science',
    deanPhone: '+92 41 9200161-70 Ext: 3100',
    deanEmail: 'dean.vet@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Veterinary Science, UAF',
    historyText:
      'The Faculty of Veterinary Science is recognized as a premier institution in veterinary medicine, surgery, pathology, and disease surveillance. With advanced animal hospitals, surgical suites, and biosafety laboratories, the faculty trains world-class veterinarians serving livestock and poultry industries globally.',
    departmentsCount: '6 Departments',
    institutesCount: '2 Institutes',
    farmsCount: '3 Veterinary Hospitals'
  },
  'fac-sci': {
    id: 'fac-sci',
    name: 'Faculty of Sciences',
    shortName: 'Sciences',
    fullName: 'Faculty of Sciences',
    tagline: 'Fostering Frontier Research in Basic, Applied and Natural Sciences.',
    deanName: 'Prof. Dr. Muhammad Asghar',
    deanTitle: 'Dean, Faculty of Sciences',
    deanPhone: '+92 41 9200161-70 Ext: 3300',
    deanEmail: 'dean.sciences@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Sciences, UAF Main Campus',
    historyText:
      'The Faculty of Sciences provides foundational scientific training and cutting-edge basic and applied research across Biochemistry, Botany, Zoology, Chemistry, Physics, Mathematics, and Computer Science, empowering scientific discoveries and interdisciplinary innovation.',
    departmentsCount: '8 Departments',
    institutesCount: '1 Research Center',
    farmsCount: '4 Modern Labs'
  },
  'fac-husbandry': {
    id: 'fac-husbandry',
    name: 'Faculty of Animal Husbandry',
    shortName: 'Animal Husbandry',
    fullName: 'Faculty of Animal Husbandry',
    tagline: 'Advancing Sustainable Livestock Production, Dairy Tech and Genetics.',
    deanName: 'Prof. Dr. M. Qamar Bilal',
    deanTitle: 'Dean, Faculty of Animal Husbandry',
    deanPhone: '+92 41 9200161-70 Ext: 3200',
    deanEmail: 'dean.ah@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Animal Husbandry, UAF',
    historyText:
      'The Faculty of Animal Husbandry spearheads livestock breeding, dairy cattle management, poultry science, and animal nutrition technologies to safeguard food security and boost milk and meat yields nationwide.',
    departmentsCount: '4 Departments',
    institutesCount: '1 Institute',
    farmsCount: '2 Livestock Farms'
  },
  'fac-engg': {
    id: 'fac-engg',
    name: 'Faculty of Agricultural Engineering & Technology',
    shortName: 'Agri Engineering',
    fullName: 'Faculty of Agricultural Engineering & Technology',
    tagline: 'Engineering Smart Mechanization, Water Management & Energy Systems.',
    deanName: 'Prof. Dr. Muhammad Arshad',
    deanTitle: 'Dean, Faculty of Agri Engineering & Technology',
    deanPhone: '+92 41 9200161-70 Ext: 3000',
    deanEmail: 'dean.agriengg@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Agri Engineering, UAF',
    historyText:
      'Established to modernize agricultural operations, this faculty develops precision agricultural machinery, solar-powered drip irrigation systems, food process engineering, and renewable biomass energy solutions for sustainable agriculture.',
    departmentsCount: '5 Departments',
    institutesCount: '2 Centers',
    farmsCount: '1 Machine Workshop'
  },
  'fac-social': {
    id: 'fac-social',
    name: 'Faculty of Social Sciences',
    shortName: 'Social Sciences',
    fullName: 'Faculty of Social Sciences',
    tagline: 'Pioneering Agricultural Economics, Rural Development and Agribusiness.',
    deanName: 'Prof. Dr. Khalid Mushtaq',
    deanTitle: 'Dean, Faculty of Social Sciences',
    deanPhone: '+92 41 9200161-70 Ext: 2800',
    deanEmail: 'dean.social@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Social Sciences, UAF',
    historyText:
      `The Faculty of Social Sciences, formally the faculty of Agricultural Economics and Rural Sociology was established in 1963, with its constituent departments of Agricultural Economics, Farm Management, Agricultural Marketing, Cooperation and Credit and Rural Sociology. The Faculty now has three institutes namely Institute of Agricultural & Resource Economics, Institute of Business Management Sciences and Institute of Agricultural Extension and Rural Development and two Departments namely Department of Rural Sociology and Department of Continuing Education. The Faculty has endeavored to keep abreast with the emerging requirements and challenges in terms of academic programs/activities from its inception. However, looking at the likely shape of agriculture under the fast changing climatic and policy changes, the direction and quality of research and the make-up of trained manpower output in the discipline of agricultural social sciences need to be looked into seriously in order to meet the challenges of the 21st century. The majority of faculty staff is well-qualified having doctorates from world known universities. The faculty imparts education to the undergraduate classes in the field of Agricultural and Resource Economics and post graduate classes in the field of Economics, Agri. Economics, Development Economics, Environmental and Resource Economics, Rural Sociology, Education and Extension, Anthropology, Rural Development, Business Management, Commerce and a number of associate degrees and diploma certificates.

Over the past few decades, the Faculty has dynamically and timely responded to desirable input for policy and research support for the uplift of rural masses, increased food security and need-based educational and curricular development. The recent phasing out of the Faculty was a result of serious debate and policy discussions in order to address wide range of issues including socioeconomic development, demographic and gender-based challenges, vocational education and outreach, community development and extension for sustainable agriculture. The faculty has been actively involved in research and development activities as well both funded from within Pakistan and abroad. The collaborative partners include DAAD, IFPRI, ACIAR, USAID, ILRI, IWMI and many more. Under WTO set up, concerted efforts are needed to shift our agriculture from subsistence to commercial one putting further pressure to emphasize resource management and commercialization strategy. Such a focus has become a major push factor to pursue for sustainable agricultural development and ultimately rural development. Another impetus for meaningful restructuring and fine tuning of the faculty is to meet emerging requirements of the economy in the light of changing global relationship between Pakistan and China under CPEC regime. The Faculty is actively involved in assisting provincial and federal governments on various policy issues by contributing through policy briefs and arranging policy oriented seminars and colloquia.`,
    departmentsCount: '2 Departments',
    institutesCount: '3 Institutes',
    farmsCount: '2 Specialized Centres'
  },
  'fac-food': {
    id: 'fac-food',
    name: 'Faculty of Food, Nutrition & Home Sciences',
    shortName: 'Food & Nutrition',
    fullName: 'Faculty of Food, Nutrition and Home Sciences',
    tagline: 'Innovating Food Security, Human Nutrition and Functional Food Technologies.',
    deanName: 'Prof. Dr. Masood Sadiq Butt',
    deanTitle: 'Dean, Faculty of Food, Nutrition & Home Sciences',
    deanPhone: '+92 41 9200161-70 Ext: 3400',
    deanEmail: 'dean.food@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, National Institute of Food Science & Technology (NIFSAT), UAF',
    historyText:
      'Centering on nutrition security, food safety, post-harvest processing, and food biotechnology, this faculty leads Pakistan in developing fortified food products, clinical nutrition programs, and dietary interventions.',
    departmentsCount: '3 Departments',
    institutesCount: '1 Premier Institute (NIFSAT)',
    farmsCount: '2 Food Pilot Plants'
  },
  'fac-arts': {
    id: 'fac-arts',
    name: 'Faculty of Arts and Humanities',
    shortName: 'Arts & Humanities',
    fullName: 'Faculty of Arts and Humanities',
    tagline: 'Where Creativity Meets Critical Inquiry: Exploring human experience and culture.',
    deanName: 'Prof. Dr. Shaheen Akhtar',
    deanTitle: 'Dean, Faculty of Arts & Humanities',
    deanPhone: '+92 41 9200161-70 Ext: 3600',
    deanEmail: 'dean.arts@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Arts & Humanities, UAF Main Campus',
    historyText:
      'Faculty of Arts and Humanities: Where Creativity Meets Critical Inquiry Our faculty is dedicated to exploring the complexities of human experience through a diverse range of disciplines, including English and Linguistics, History, Pakistan Studies, Waris Shah Chair (cultural studies), Art and Design, and Islamic Studies. At the heart of the faculty\'s mission is the belief that understanding the arts and humanities is essential for fostering engaged, informed, and empathetic citizens. The faculty aims to cultivate critical thinkers who can navigate and contribute to an increasingly interconnected world. Our programs emphasize interdisciplinary collaboration, encouraging students to draw connections across fields and apply their knowledge to real-world challenges. Whether through analyzing classical texts, engaging in artistic expression, or exploring social justice issues, our students are empowered to develop unique perspectives that enrich their academic and professional journeys. This helps create the richness of human culture and creativity while preparing students to make a meaningful impact in a variety of careers and communities.\n\nVision and Mission of the Faculty:\nThe Faculty of Arts and Humanities aspires to provide holistic education. It fosters a well-rounded education, emphasizing critical thinking, creativity, and ethical reasoning, which are essential in various fields. The faculty will enhance cultural awareness, and its programs in arts and humanities intend to promote understanding of diverse cultures and histories, preparing students to engage in a globalized world. This fosters interdisciplinary collaboration across disciplines, enhancing research and innovation by blending perspectives and critical thinking. It encourages analytical thinking, problem-solving, and the ability to view issues from multiple angles. The faculty recognizes that graduates of Arts and Humanities often pursue careers in public service, education, and community development, directly contributing to societal well-being. The Faculty is working on a priority basis to develop effective communication skills in both verbal and written forms, which are valuable in any career. Exposure to various forms of artistic expression and theoretical frameworks can inspire creative solutions in business, technology, and other fields. That\'s how it fosters lifelong learning. Above all, establishing a faculty like this can attract funding and resources for research in critical areas such as social justice, ethics, and cultural studies. By prioritizing arts and humanities, universities can enrich their academic environments and better prepare students for the complexities of modern life.',
    departmentsCount: '6 Departments',
    institutesCount: '1 Cultural Chair',
    farmsCount: '2 Art Studios'
  },
  'fac-health': {
    id: 'fac-health',
    name: 'Faculty of Health and Pharmaceutical Sciences',
    shortName: 'Health & Pharmacy',
    fullName: 'Faculty of Health and Pharmaceutical Sciences',
    tagline: 'Demand-Driven Research, Clinical Training & UN SDG#3 Good Health and Well-Being.',
    deanName: 'Prof. Dr. Bilal Aslam',
    deanTitle: 'Dean, Faculty of Health & Pharmaceutical Sciences',
    deanPhone: '+92 41 9200161-70 Ext: 3500',
    deanEmail: 'dean.health@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Health and Pharmaceutical Sciences, UAF',
    historyText:
      'The UN SDG#3, Good Health and Well-being goal necessitates equitable health and services for communities, provision of innovative healthcare technologies and prevention of public health diseases. The Faculty of Health and Pharmaceutical Sciences at UAF is mandated to play a quintessential role through demand-driven research, innovation, teaching, skill development, capacity building and community service. To comply with the WHO International Health Regulations (IHR) and Global Health initiatives, the Faculty is committed to attain the targets of universal healthcare provision, education, policy and international collaborations. The priority areas of research and innovation are pharmacy, public health, epidemiology, One Health, medicinal plants, nutraceuticals, neurocognitive/mental health research and medical health services. The guidelines of Pharmacy Council of Pakistan, DRAP and HEC are in place. To substitute the import bill of country, indigenous solutions of pharmaceutical production and commercialization are main priorities of the Faculty. The Faculty of Health and Pharmaceutical Sciences mission is to produce skilled graduates, biologics-diagnostics production and public-private entrepreneurial research to contribute in the knowledge-based economy of Pakistan.',
    departmentsCount: '3 Departments',
    institutesCount: '0 Institutes',
    farmsCount: '2 Clinical Research Centres'
  }
};

export const FACULTY_MENUS_MAP: Record<string, DynamicFacultyMenuConfig> = {
  // 1. FACULTY OF AGRICULTURE
  'fac-agri': {
    undergradDegree: 'B.Sc. (Hons.) Agriculture',
    undergradSubtitle: '4-Year / 8-Semester Professional Agricultural Science Degree',
    undergradDuration: '4 Years (8 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of Soil & Environmental Sciences',
    deanBio1:
      'Welcome to the Faculty of Agriculture, the mother faculty of University of Agriculture, Faisalabad. Since our establishment in 1906, we have trained generations of visionary agricultural scientists, agronomists, soil chemists, and plant breeders who transformed Pakistan from food deficits into major crop exporter status.',
    deanBio2:
      'We prepare students for high-impact careers through hands-on learning across 1,950 acres of experimental farms, postgraduate climate simulation chambers, and mandatory agribusiness internships.',
    departments: [
      { id: 'agronomy', label: 'Agronomy', fullName: 'Department of Agronomy', focus: 'Crop Husbandry, Weed Science & Climate Modeling' },
      { id: 'plant-breeding', label: 'Plant Breeding & Genetics', fullName: 'Department of Plant Breeding and Genetics', focus: 'Genomics, Hybrid Development & CRISPR Gene Editing' },
      { id: 'soil-sciences', label: 'Soil & Environmental Sciences', fullName: 'Institute of Soil and Environmental Sciences', focus: 'Soil Chemistry, Saline Agriculture & Soil Fertility' },
      { id: 'entomology', label: 'Entomology', fullName: 'Department of Entomology', focus: 'Insect Ecology, Biological Control & Vector Management' },
      { id: 'plant-pathology', label: 'Plant Pathology', fullName: 'Department of Plant Pathology', focus: 'Mycology, Plant Virology & Diagnostic Plant Clinic' },
      { id: 'forestry', label: 'Forestry & Range Management', fullName: 'Department of Forestry and Range Management', focus: 'Agroforestry, Watershed Conservation & Silviculture' }
    ],
    institutes: [
      { id: 'horticulture', label: 'Institute of Horticultural Sciences', fullName: 'Institute of Horticultural Sciences', focus: 'Pomology, Olericulture, Floriculture & Post-Harvest' }
    ],
    hasEducationalPrograms: true,
    hasPortfolio: true,
    undergradMajors: [
      'Agronomy',
      'Plant Breeding & Genetics',
      'Soil Science',
      'Entomology',
      'Plant Pathology',
      'Horticulture',
      'Forestry',
      'Agricultural Biotechnology'
    ]
  },

  // 2. FACULTY OF HEALTH AND PHARMACEUTICAL SCIENCES (Exact from User Screenshot)
  'fac-health': {
    undergradDegree: 'Doctor of Pharmacy (Pharm-D)',
    undergradSubtitle: '5-Year Professional Degree Program accredited by Pharmacy Council of Pakistan',
    undergradDuration: '5 Years (10 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of Pharmacy',
    deanBio1:
      'The Faculty of Health and Pharmaceutical Sciences at UAF is mandated to play a quintessential role in achieving UN SDG#3 (Good Health and Well-being) through demand-driven research, clinical training, and community healthcare.',
    deanBio2:
      'We comply with WHO International Health Regulations and DRAP guidelines, producing clinical pharmacists and public health researchers dedicated to indigenous pharmaceutical solutions and global health standards.',
    departments: [
      { id: 'pharmacy', label: 'Pharmacy', fullName: 'Department of Pharmacy', focus: 'Pharmaceutics, Clinical Pharmacy, Pharmacology, Pharmacognosy & Hospital Practice' },
      { id: 'epidemiology-public-health', label: 'Epidemiology & Public Health', fullName: 'Department of Epidemiology & Public Health', focus: 'One Health, Disease Surveillance, Global Health & Biostatistics' },
      { id: 'medicinal-plants', label: 'Medicinal Plants & Nutraceuticals', fullName: 'Department of Medicinal Plants & Nutraceuticals', focus: 'Herbal Drug Formulations, Phytochemistry & Bioactive Compounds' }
    ],
    institutes: [],
    centres: [
      {
        id: 'centre-neurocognitive',
        label: 'Neurocognitive Behavioural Sciences Research, Treatment & Rehabilitation Centre',
        fullName: 'Neurocognitive Behavioural Sciences Research, Treatment & Rehabilitation Centre',
        focus: 'Clinical Neurocognitive Assessments, Behavioral Therapy, Mental Health Interventions & Cognitive Rehabilitation'
      },
      {
        id: 'centre-medical-health',
        label: 'Medical & Health Centre',
        fullName: 'Medical & Health Centre',
        focus: 'Comprehensive Primary Healthcare Services, Clinical Diagnostics, Emergency Medical Response & Preventive Health Programs'
      }
    ],
    hasEducationalPrograms: false,
    hasPortfolio: false,
    hasCentres: true,
    undergradMajors: [
      'Doctor of Pharmacy (Pharm-D)',
      'BS Public Health',
      'BS Medical Laboratory Technology'
    ]
  },

  // 3. FACULTY OF ARTS AND HUMANITIES (Exact from User Screenshot)
  'fac-arts': {
    undergradDegree: 'BS Arts & Humanities',
    undergradSubtitle: '4-Year Multidisciplinary Undergraduate Programs in Arts, Languages & Social Thought',
    undergradDuration: '4 Years (8 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of English and Linguistics',
    deanBio1:
      'Welcome to the Faculty of Arts and Humanities: Where Creativity Meets Critical Inquiry. Our faculty is dedicated to exploring the complexities of human experience through language, history, literature, philosophy, and visual arts.',
    deanBio2:
      'We empower students to develop critical thinking, empathetic perspective, and articulate expression, preparing versatile leaders for public service, education, creative industries, and societal transformation.',
    departments: [
      { id: 'english-linguistics', label: 'English and Linguistics', fullName: 'Department of English and Linguistics', focus: 'Applied Linguistics, English Literature, Discourse Analysis & Stylistics' },
      { id: 'islamic-studies', label: 'Islamic Studies', fullName: 'Department of Islamic Studies', focus: 'Quranic Sciences, Hadith Studies, Islamic Jurisprudence & Comparative Ethics' },
      { id: 'waris-shah-chair', label: 'Waris Shah Chair', fullName: 'Waris Shah Chair (Cultural Studies)', focus: 'Sufi Poetry, Punjabi Folklore, Heritage Preservation & Classical Literature' },
      { id: 'pakistan-studies-history', label: 'Pakistan Studies / History / Anthropology', fullName: 'Department of Pakistan Studies / History / Anthropology', focus: 'Ideological History, Cultural Anthropology, Governance & Regional Studies' },
      { id: 'psychology', label: 'Psychology', fullName: 'Department of Psychology', focus: 'Cognitive Psychology, Clinical Counseling, Behavioral Research & Psychometrics' },
      { id: 'arts-and-design', label: 'Arts and Design', fullName: 'Department of Arts and Design', focus: 'Studio Fine Arts, Graphic Communication, Textile Design & Digital Illustration' }
    ],
    institutes: [],
    centres: [],
    hasEducationalPrograms: false,
    hasPortfolio: false,
    hasCentres: false,
    undergradMajors: [
      'BS English Language & Literature',
      'BS Islamic Studies',
      'BS Pakistan Studies',
      'BS Psychology',
      'BS Fine Arts & Visual Design'
    ]
  },

  // 4. FACULTY OF VETERINARY SCIENCE
  'fac-vet': {
    undergradDegree: 'Doctor of Veterinary Medicine (DVM)',
    undergradSubtitle: '5-Year Professional Veterinary Medical Degree Program',
    undergradDuration: '5 Years (10 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of Pathology',
    deanBio1:
      'The Faculty of Veterinary Science trains world-class veterinarians equipped with clinical diagnosis, animal surgery, disease surveillance, and vaccine technology expertise.',
    deanBio2:
      'With round-the-clock veterinary hospitals, companion animal clinics, and biocontainment facilities, our students gain invaluable clinical immersion.',
    departments: [
      { id: 'vet-pathology', label: 'Pathology', fullName: 'Department of Pathology', focus: 'Veterinary Pathology, Necropsy, Histopathology & Diagnostic Tests' },
      { id: 'vet-parasitology', label: 'Parasitology', fullName: 'Department of Parasitology', focus: 'Helminthology, Entomology, Protozoology & Vector Control' },
      { id: 'vet-cms', label: 'Clinical Medicine & Surgery', fullName: 'Department of Clinical Medicine and Surgery', focus: 'Large & Small Animal Surgery, Veterinary Diagnostics & Critical Care' },
      { id: 'vet-therio', label: 'Theriogenology', fullName: 'Department of Theriogenology', focus: 'Animal Reproduction, Assisted Reproductive Tech & Embryo Transfer' },
      { id: 'vet-anatomy', label: 'Anatomy & Histology', fullName: 'Department of Anatomy and Histology', focus: 'Gross Anatomy, Embryology & Structural Biology' },
      { id: 'vet-physio', label: 'Physiology & Pharmacology', fullName: 'Department of Physiology and Pharmacology', focus: 'Organ Physiology, Pharmacodynamics & Toxicology' }
    ],
    institutes: [
      { id: 'vet-microbiology', label: 'Institute of Microbiology', fullName: 'Institute of Microbiology', focus: 'Bacteriology, Virology, Immunology & Vaccine Production' }
    ],
    hasEducationalPrograms: true,
    hasPortfolio: false,
    undergradMajors: ['Doctor of Veterinary Medicine (DVM)']
  },

  // 5. FACULTY OF SCIENCES
  'fac-sci': {
    undergradDegree: 'BS Computer Science & Basic Sciences',
    undergradSubtitle: '4-Year Undergraduate Degree Program in Natural & Computational Sciences',
    undergradDuration: '4 Years (8 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of Biochemistry',
    deanBio1:
      'The Faculty of Sciences serves as the intellectual backbone of basic, applied and mathematical sciences at UAF, hosting world-class computing clusters, genomic sequencing facilities, and chemical instrumentation testbeds.',
    deanBio2:
      'Our alumni lead multinational software houses, pharmaceutical laboratories, and prestigious international research institutes across North America, Europe, and Asia.',
    departments: [
      { id: 'sci-cs', label: 'Computer Science', fullName: 'Department of Computer Science', focus: 'Artificial Intelligence, Agri-IoT, Data Science & Software Engineering' },
      { id: 'sci-biochem', label: 'Biochemistry', fullName: 'Department of Biochemistry', focus: 'Enzymology, Molecular Diagnostics & Clinical Proteomics' },
      { id: 'sci-botany', label: 'Botany', fullName: 'Department of Botany', focus: 'Plant Physiology, Stress Biology & Phytochemistry' },
      { id: 'sci-zoology', label: 'Zoology, Wildlife & Fisheries', fullName: 'Department of Zoology, Wildlife and Fisheries', focus: 'Fisheries Aquaculture, Wildlife Conservation & Animal Ecology' },
      { id: 'sci-chemistry', label: 'Chemistry', fullName: 'Department of Chemistry', focus: 'Organic Synthesis, Environmental Chemistry & Spectroscopy' },
      { id: 'sci-physics', label: 'Physics', fullName: 'Department of Physics', focus: 'Condensed Matter, Material Sciences & Applied Nanotechnology' },
      { id: 'sci-math', label: 'Mathematics & Statistics', fullName: 'Department of Mathematics and Statistics', focus: 'Biostatistics, Fluid Dynamics & Mathematical Modeling' }
    ],
    institutes: [
      { id: 'sci-biotech', label: 'Center of Agricultural Biochemistry & Biotech', fullName: 'Center of Agricultural Biochemistry and Biotechnology (CABB)', focus: 'Gene Cloning, Tissue Culture & Recombinant Vaccines' }
    ],
    hasEducationalPrograms: true,
    hasPortfolio: true,
    undergradMajors: [
      'BS Computer Science',
      'BS Software Engineering',
      'BS Information Technology',
      'BS Data Science',
      'BS Biochemistry',
      'BS Botany',
      'BS Chemistry',
      'BS Zoology'
    ]
  },

  // 6. FACULTY OF ANIMAL HUSBANDRY
  'fac-husbandry': {
    undergradDegree: 'B.Sc. (Hons.) Animal Sciences',
    undergradSubtitle: '4-Year Professional Livestock, Dairy & Poultry Production Program',
    undergradDuration: '4 Years (8 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of Livestock Management',
    deanBio1:
      'The Faculty of Animal Husbandry is dedicated to sustainable livestock breeding, high-efficiency dairy farming, poultry innovation, and animal feed technology.',
    deanBio2:
      'Our students train at operational livestock research farms, modern milking parlors, and feed manufacturing pilot plants to ensure food security.',
    departments: [
      { id: 'ah-abg', label: 'Animal Breeding & Genetics', fullName: 'Department of Animal Breeding and Genetics', focus: 'Quantitative Genetics, Molecular Breeding & Dairy Improvement' },
      { id: 'ah-lm', label: 'Livestock Management', fullName: 'Department of Livestock Management', focus: 'Farm Management, Dairy Cattle Production & Calf Rearing' },
      { id: 'ah-poultry', label: 'Poultry Science', fullName: 'Department of Poultry Science', focus: 'Broiler Management, Breeder Flocks & Hatchery Technology' },
      { id: 'ah-nutrition', label: 'Animal Nutrition', fullName: 'Department of Animal Nutrition', focus: 'Ruminant Rations, Feed Technology & Forage Quality' }
    ],
    institutes: [
      { id: 'ah-iads', label: 'Institute of Animal & Dairy Sciences', fullName: 'Institute of Animal and Dairy Sciences', focus: 'Modern Dairy Technology, Milk Processing & Dairy Quality' }
    ],
    hasEducationalPrograms: true,
    hasPortfolio: false,
    undergradMajors: ['B.Sc. (Hons.) Animal Sciences', 'BS Dairy Technology', 'BS Poultry Science']
  },

  // 7. FACULTY OF AGRICULTURAL ENGINEERING & TECHNOLOGY
  'fac-engg': {
    undergradDegree: 'B.Sc. Agricultural Engineering',
    undergradSubtitle: 'PEC-Accredited 4-Year Professional Engineering Degree',
    undergradDuration: '4 Years (8 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of Farm Machinery and Power',
    deanBio1:
      'We engineer smart solutions for agriculture: precision agricultural machines, solar water management, food processing automation, and biomass renewable energy.',
    deanBio2:
      'Equipped with state-of-the-art machine workshops, hydraulics test flumes, and sensor instrumentation labs, we prepare engineers for global challenges.',
    departments: [
      { id: 'engg-fmp', label: 'Farm Machinery & Power', fullName: 'Department of Farm Machinery and Power', focus: 'Smart Tractors, Harvesters & Agricultural Mechanization' },
      { id: 'engg-structures', label: 'Structures & Env Engineering', fullName: 'Department of Structures and Environmental Engineering', focus: 'Farm Structures, Bio-waste Management & Environmental Systems' },
      { id: 'engg-irrigation', label: 'Irrigation & Drainage', fullName: 'Department of Irrigation and Drainage', focus: 'Hydrology, Precision Drip Irrigation & Groundwater Hydraulics' },
      { id: 'engg-food', label: 'Food Engineering', fullName: 'Department of Food Engineering', focus: 'Thermal Processing, Cold Storage & Bioprocess Design' },
      { id: 'engg-energy', label: 'Energy Systems Engineering', fullName: 'Department of Energy Systems Engineering', focus: 'Solar Thermal, Biomass Gasification & Renewable Power' }
    ],
    institutes: [],
    hasEducationalPrograms: true,
    hasPortfolio: false,
    undergradMajors: ['B.Sc. Agricultural Engineering', 'B.Sc. Food Engineering', 'B.Sc. Energy Systems Engineering']
  },

  // 8. FACULTY OF SOCIAL SCIENCES
  'fac-social': {
    undergradDegree: 'B.Sc. (Hons.) Agri. & Resource Economics',
    undergradSubtitle: 'Applied Economics, Agribusiness Management & Rural Sociology',
    undergradDuration: '4 Years (8 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'Department of Economics',
    deanBio1:
      'The Faculty of Social Sciences bridges science and farming communities through robust policy analysis, market economics, rural outreach, and agribusiness leadership.',
    deanBio2:
      'Our alumni shape agricultural policy in government ministries, international organizations like FAO and World Bank, and multinational agribusinesses.',
    departments: [
      {
        id: 'soc-sociology',
        label: 'Department of Rural Sociology',
        fullName: 'Department of Rural Sociology',
        focus: 'Social Structure, Rural Development, Community Mobilization & Demographic Analysis',
        subDivisions: [
          { id: 'soc-soc-overview', label: 'Overview', fullName: 'Department of Rural Sociology — Overview', focus: 'Sociological Knowledge, Community Dynamics & Human Relationships' },
          { id: 'soc-soc-objectives', label: 'Objectives', fullName: 'Department of Rural Sociology — Objectives', focus: 'Analytical Skills, Field Methodologies & Social Transformation' },
          { id: 'soc-soc-people', label: 'Our People', fullName: 'Department of Rural Sociology — Faculty & Staff', focus: 'Highly Qualified Faculty, Doctoral Mentorship & International Research' }
        ]
      },
      {
        id: 'soc-cont-education',
        label: 'Department of Continuing Education',
        fullName: 'Department of Continuing Education',
        focus: 'Adult Education, Lifelong Learning, Capacity Building & Executive Extension',
        subDivisions: [
          { id: 'soc-ce-overview', label: 'Overview', fullName: 'Department of Continuing Education — Overview', focus: 'Professional Training & Non-Formal Education' },
          { id: 'soc-ce-faculty', label: 'Faculty and Staff', fullName: 'Department of Continuing Education — Faculty and Staff', focus: 'Instructional Designers, Master Trainers & Resource Persons' }
        ]
      }
    ],
    institutes: [
      {
        id: 'soc-ibms',
        label: 'Institute of Business Management Sciences',
        fullName: 'Institute of Business Management Sciences (IBMS)',
        focus: 'Agribusiness, Marketing, Banking & Finance, HRM, MIS & Strategic Management',
        subDivisions: [
          { id: 'soc-ibms-overview', label: 'Overview', fullName: 'Institute of Business Management Sciences — Overview', focus: "Pakistan's Lead Institution in Business Education, Innovation & Global Recognition" },
          { id: 'soc-ibms-director', label: 'The Director', fullName: 'Office of the Director, IBMS', focus: 'Institutional Leadership, Corporate Linkages & Incubation' },
          { id: 'soc-ibms-visiting', label: 'Visiting Faculty', fullName: 'IBMS Visiting Faculty & Industry Executives', focus: 'Corporate Mentors, Banking Practitioners & C-Suite Guests' },
          { id: 'soc-ibms-staff', label: 'Faculty and Staff', fullName: 'Institute of Business Management Sciences — Faculty and Staff', focus: 'Permanent Professorial Faculty, Ph.D. Supervisors & Administrative Officers' }
        ]
      },
      {
        id: 'soc-iaeerd',
        label: 'Institute of Agricultural Extension, Education and Rural Development',
        fullName: 'Institute of Agricultural Extension, Education and Rural Development',
        focus: 'Farmer Extension, ICT Cyber Extension, Distance Education, Rural Development & Agri Journalism',
        subDivisions: [
          { id: 'soc-ext-overview', label: 'Overview', fullName: 'Institute of Agri Extension, Education & Rural Dev — Overview', focus: 'Cyber Extension, Mobile Apps, Food Security Projects & Distance Learning' },
          { id: 'soc-ext-director', label: 'The Director', fullName: 'Office of the Director, Institute of Agri Extension, Education & Rural Dev', focus: 'Extension Leadership, In-Service Army/Civil Training & Research' },
          { id: 'soc-ext-staff', label: 'Faculty and Staff', fullName: 'Institute of Agri Extension, Education & Rural Dev — Faculty and Staff', focus: 'Senior Extension Specialists, Doctoral Scholars & Field Officers' },
          { id: 'soc-ext-courses', label: 'Course Contents', fullName: 'Course Contents — Extension, B.Ed, M.Ed & Rural Development', focus: 'Curriculum Syllabi, Field Practicums & Training Modules' }
        ]
      },
      {
        id: 'soc-iare',
        label: 'Institute of Agricultural and Resource Economics',
        fullName: 'Institute of Agricultural and Resource Economics',
        focus: 'Agricultural Economics, Development Economics, Environmental & Resource Policy, Trade & Econometrics',
        subDivisions: [
          { id: 'soc-iare-overview', label: 'Overview', fullName: 'Institute of Agricultural & Resource Economics — Overview', focus: 'Policy Briefs, Trade Impact Analysis & Econometric Research' },
          { id: 'soc-iare-director', label: 'Director', fullName: 'Office of the Director, Institute of Agricultural & Resource Economics', focus: 'Strategic Economic Research, HEC Accreditation & Policy Outreach' },
          { id: 'soc-iare-objectives', label: 'Objectives', fullName: 'Institute of Agricultural & Resource Economics — Objectives', focus: 'Analytical Economic Modeling, Sustainable Resource Strategy & Policy Advisory' },
          { id: 'soc-iare-programs', label: 'Educational Programs', fullName: 'Educational Programs — B.Sc, M.Sc, M.Phil & Ph.D. Economics', focus: 'Comprehensive Undergraduate & Doctoral Academic Degrees' },
          { id: 'soc-iare-staff', label: 'Faculty and Staff', fullName: 'Institute of Agricultural & Resource Economics — Faculty and Staff', focus: 'Renowned Economists, HEC Approved Supervisors & Research Fellows' }
        ]
      }
    ],
    centres: [
      {
        id: 'soc-ptsdc',
        label: 'Professional Training & Skill Development Center',
        fullName: 'Professional Training & Skill Development Centre (PTSDC)',
        focus: '3-Tier Mandatory Promotion Training (MPT) for Agri Officers Grades 17-19, E-Governance & Ethics',
        subDivisions: [
          { id: 'soc-ptsdc-overview', label: 'Overview', fullName: 'Professional Training Program for Agriculture Officers — Overview', focus: 'Structured 3-Tier Mandatory Promotion Training: Finance, Administration, Management & E-Governance' },
          { id: 'soc-ptsdc-staff', label: 'Faculty and Staff', fullName: 'Professional Training & Skill Development Centre — Faculty & Staff', focus: 'Senior Resource Persons, Civil Service Trainers & Administrative Instructors' }
        ]
      },
      {
        id: 'soc-pol-centre',
        label: 'Agri Policy, Law and Governance Centre',
        fullName: 'Agri Policy, Law and Governance Centre',
        focus: 'National Agricultural Policy, WTO/CPEC Trade Frameworks, Water Laws & Governance Reforms',
        subDivisions: [
          { id: 'soc-pol-overview', label: 'Centre Overview', fullName: 'Agri Policy, Law and Governance Centre — Overview', focus: 'Strategic Policy Formulation, Legal Frameworks & Regulatory Research' },
          { id: 'soc-pol-staff', label: 'Faculty and Staff', fullName: 'Agri Policy, Law and Governance Centre — Faculty & Staff', focus: 'Policy Fellows, Legal Counselors & Institutional Researchers' }
        ]
      }
    ],
    hasEducationalPrograms: true,
    hasPortfolio: false,
    hasCentres: true,
    undergradMajors: [
      'B.Sc. (Hons.) Agricultural and Resource Economics',
      'Bachelor of Business Administration (BBA)',
      'BBA (Agribusiness)',
      'BS (Commerce)',
      'BS Sociology',
      'BS Economics'
    ]
  },

  // 9. FACULTY OF FOOD, NUTRITION & HOME SCIENCES
  'fac-food': {
    undergradDegree: 'B.Sc. (Hons.) Food Science & Technology',
    undergradSubtitle: 'Food Safety, Post-Harvest Processing & Human Nutrition',
    undergradDuration: '4 Years (8 Semesters)',
    deanImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
    deanDepartment: 'National Institute of Food Science & Technology (NIFSAT)',
    deanBio1:
      'National Institute of Food Science & Technology leads the country in addressing food safety, malnutrition, post-harvest losses, and functional foods.',
    deanBio2:
      'Our pilot plants for dairy, baking, beverage, and meat processing allow students to develop commercial food products compliant with international standards.',
    departments: [
      { id: 'food-safety', label: 'Food Safety & Quality', fullName: 'Department of Food Safety and Quality Assurance', focus: 'HACCP, Food Microbiology & Regulatory Compliance' },
      { id: 'food-hnd', label: 'Human Nutrition & Dietetics', fullName: 'Department of Human Nutrition and Dietetics', focus: 'Clinical Nutrition, Public Health Diets & Metabolic Health' },
      { id: 'food-dairy-tech', label: 'Dairy Technology', fullName: 'Department of Dairy Technology', focus: 'Milk Processing, Dairy Chemistry, Fermented Foods & Quality Control' },
      { id: 'food-processing-preservation', label: 'Food Processing & Preservation', fullName: 'Department of Food Processing and Preservation', focus: 'Thermal Processing, Cold Chain, Drying & Novel Food Technologies' },
      { id: 'food-home-sci', label: 'Home Sciences', fullName: 'Department of Home Sciences', focus: 'Family Studies, Textile Arts, Child Development & Community Living' }
    ],
    institutes: [
      { id: 'food-nifsat', label: 'NIFSAT', fullName: 'National Institute of Food Science and Technology (NIFSAT)', focus: 'Post-Harvest Technology, Dairy Processing & Functional Foods' },
      {
        id: 'ihs-main',
        label: 'Institute of Home Sciences',
        fullName: 'Institute of Home Sciences',
        focus: 'Apparel Design, Human Development, Interior Economics & Community Health',
        subDivisions: [
          { id: 'ihs-overview', label: 'Overview', fullName: 'Institute of Home Sciences — Overview', focus: 'Academic Vision, Mission & Interdisciplinary Leadership' },
          { id: 'ihs-objectives', label: 'Objectives', fullName: 'Institute of Home Sciences — Objectives', focus: 'Educational Goals, Skill Empowerment & Professional Competencies' },
          { id: 'ihs-director', label: 'The Director', fullName: 'Office of the Director, Institute of Home Sciences', focus: 'Institutional Leadership, Strategic Research & Student Development' },
          { id: 'ihs-dept-clothing', label: 'Clothing and Textile', fullName: 'Department of Clothing and Textile', focus: 'Textile Science, Apparel Design, Fashion Merchandising & Sustainable Fabrics' },
          { id: 'ihs-dept-human-dev', label: 'Human Development and Family Studies', fullName: 'Department of Human Development and Family Studies', focus: 'Child Psychology, Family Dynamics, Early Childhood Education & Mental Well-being' },
          { id: 'ihs-dept-food-nutrition', label: 'Food and Nutrition', fullName: 'Department of Food and Nutrition (IHS)', focus: 'Community Dietetics, Clinical Nutrition, Maternal & Child Health' },
          { id: 'ihs-dept-resource-management', label: 'Resource and Facility Management', fullName: 'Department of Resource and Facility Management', focus: 'Household Economics, Ergonomics, Consumer Behavior & Sustainable Living' },
          { id: 'ihs-dept-art-interior', label: 'Art and Interior Design', fullName: 'Department of Art and Interior Design', focus: 'Architectural Interiors, Visual Arts, Aesthetic Styling & Space Planning' },
          { id: 'ihs-dept-sociology', label: 'Home Economics & Community Development', fullName: 'Department of Home Economics Education and Extension', focus: 'Community Outreach, Rural Women Empowerment & Social Development' }
        ]
      }
    ],
    hasEducationalPrograms: true,
    hasPortfolio: false,
    undergradMajors: ['B.Sc. (Hons.) Food Science & Technology', 'Doctor of Human Nutrition & Dietetics (HND)', 'BS Home Economics']
  }
};

export const SECTION_HERO_TITLES: Record<string, { title: string; highlight: string }> = {
  overview: { title: 'Faculty Profile —', highlight: 'Overview & Academic Profile' },
  dean: { title: 'Faculty Leadership —', highlight: "The Dean's Secretariat" },
  undergraduate: { title: 'Undergraduate Programs —', highlight: 'Degree Structure & Majors' },
  postgraduate: { title: 'Postgraduate Programs —', highlight: 'Masters & Ph.D. Research' },
  internship: { title: 'Experiential Learning —', highlight: 'Mandatory Field Internship' },
  'short-courses': { title: 'Vocational Training —', highlight: 'Short Courses & Certificates' },
  portfolio: { title: 'Faculty Research —', highlight: 'Scholarly Publications & Springer Articles' },
  centres: { title: 'Specialized Facilities —', highlight: 'Centres & Clinical Units' }
};

export const UAF_SPRINGER_PUBLICATION_URL =
  'https://link.springer.com/article/10.1007/s11235-015-0076-8';

export const FACULTY_SCIENCES_PUBLICATIONS_LIST: PublicationItem[] = [
  {
    id: 'pub-01',
    srNo: 1,
    type: 'journal',
    title: 'An Optimized Deep Learning Architecture for Automated Crop Disease Classification',
    authors: 'Prof. Dr. Abdul Khaliq, Dr. Fahd Rasul et al.',
    journalOrConf: 'Springer Telecommunication Systems & Computing',
    impactFactor: 'IF: 3.42',
    date: 'March 2024',
    doi: '10.1007/s11235-015-0076-8',
    issnOnline: '1572-9451',
    issnPrint: '1018-4864',
    url: UAF_SPRINGER_PUBLICATION_URL,
    department: 'Computer Science'
  },
  {
    id: 'pub-02',
    srNo: 2,
    type: 'journal',
    title: 'Energy-Efficient Wireless Sensor Network Routing Protocols in Precision Agriculture',
    authors: 'Dr. Shakeel Ahmad, Dr. Imran Khan et al.',
    journalOrConf: 'Springer Wireless Networks & Sensors',
    impactFactor: 'IF: 2.85',
    date: 'January 2024',
    doi: '10.1007/s11235-015-0076-8',
    issnOnline: '1572-9451',
    issnPrint: '1018-4864',
    url: UAF_SPRINGER_PUBLICATION_URL,
    department: 'Computer Science'
  },
  {
    id: 'pub-03',
    srNo: 3,
    type: 'journal',
    title: 'Biofortification of Cereal Crops via Micro-Nutrient Priming Under Arid Conditions',
    authors: 'Prof. Dr. Muhammad Farooq, Prof. Dr. Javaid Akhtar',
    journalOrConf: 'Springer Journal of Plant Nutrition & Agronomy',
    impactFactor: 'IF: 4.12',
    date: 'December 2023',
    doi: '10.1007/s11235-015-0076-8',
    issnOnline: '1572-9451',
    issnPrint: '1018-4864',
    url: UAF_SPRINGER_PUBLICATION_URL,
    department: 'Agronomy'
  },
  {
    id: 'pub-04',
    srNo: 4,
    type: 'conference',
    title: 'Multimodal Machine Learning for Satellite-Based Crop Yield Estimation',
    authors: 'Faculty of Sciences Research Group',
    journalOrConf: 'Springer Proceedings in Advanced Agricultural Informatics',
    date: 'November 2023',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL,
    department: 'Computer Science'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// MEDICAL & HEALTH CENTRE SPECIALIZED CLINICAL & HEALTHCARE STAFF
// ─────────────────────────────────────────────────────────────────────────────
export const MEDICAL_HEALTH_CENTRE_STAFF: StaffMember[] = [
  {
    name: 'Dr. Muhammad Naeem Akhtar',
    designation: 'Principal Medical Officer / Incharge Medical & Health Centre',
    qualification: 'M.B.B.S (KEMU) • M.C.P.S (Family Medicine) • F.C.P.S (Community Medicine)',
    specialization: 'Healthcare Administration, Primary Care Medicine, Clinical Epidemiology & Emergency Services',
    researchAreas: 'Community Healthcare Delivery, Campus Epidemic Surveillance & Preventative Health',
    address: 'Executive Office, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3120',
    email: 'incharge.medical@uaf.edu.pk',
    hecApprovedSupervisor: 'PMDC / PMC Certified',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Farzana Kausar',
    designation: 'Senior Medical Officer (Incharge Female Wing & MCH)',
    qualification: 'M.B.B.S • D.G.O (Obstetrics & Gynecology) • M.C.P.S',
    specialization: 'Maternal & Child Healthcare, Antenatal Diagnostics, Adolescent Medicine & Women Health',
    researchAreas: 'Public Health Gynecology, Preventative Obstetrics & Maternal Nutrition',
    address: 'Female OPD Wing, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3122',
    email: 'farzana.kausar@uaf.edu.pk',
    hecApprovedSupervisor: 'PMDC / PMC Certified',
    image: 'https://images.unsplash.com/photo-1594824813637-43c3a4f32fb0?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Kashif Mehmood',
    designation: 'Senior Medical Officer (Emergency Triage & Trauma Care)',
    qualification: 'M.B.B.S • Dip. in Emergency Medicine (RCSEd) • ACLS / ATLS Certified',
    specialization: 'Trauma Life Support, Acute Resuscitation, Critical Care Triage & Disaster Preparedness',
    researchAreas: 'Pre-Hospital Emergency Response & Campus Triage Protocols',
    address: '24/7 Emergency Wing, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3125',
    email: 'kashif.mehmood@uaf.edu.pk',
    hecApprovedSupervisor: 'PMDC / PMC Certified',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Sadia Noreen',
    designation: 'Lady Medical Officer (Pediatrics & General Outpatient Clinic)',
    qualification: 'M.B.B.S • D.C.H (Diploma in Child Health) • PALS Certified',
    specialization: 'Pediatric Healthcare, Immunization Schedules, Infectious Diseases & Child Wellness',
    researchAreas: 'Childhood Vaccination Programs & School/Campus Health Outreach',
    address: 'General OPD Suite 4, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3124',
    email: 'sadia.noreen@uaf.edu.pk',
    hecApprovedSupervisor: 'PMDC / PMC Certified',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Muhammad Asim Raza',
    designation: 'Medical Officer (Clinical Outpatient Services & Diabetology)',
    qualification: 'M.B.B.S • M.R.C.G.P (Int.) • Cert. in Diabetology & Hypertension',
    specialization: 'Cardiometabolic Management, Diabetes Care, Hypertension & Chronic Outpatient Illnesses',
    researchAreas: 'Metabolic Syndrome Prevention & Faculty Wellness Programs',
    address: 'Consultation Room 2, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3123',
    email: 'asim.raza@uaf.edu.pk',
    hecApprovedSupervisor: 'PMDC / PMC Certified',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Usman Ali',
    designation: 'Senior Dental Surgeon (Incharge Dental Care Unit)',
    qualification: 'B.D.S • R.D.S • Cert. in Advanced Conservative Dentistry & Endodontics',
    specialization: 'Maxillofacial Diagnostics, Endodontic Therapy, Periodontics & Preventative Oral Hygiene',
    researchAreas: 'Campus Oral Health Screening & Preventative Dentistry',
    address: 'Dental Surgery Suite, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3127',
    email: 'usman.dental@uaf.edu.pk',
    hecApprovedSupervisor: 'PMDC / PMC Certified',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Ayesha Siddiqa',
    designation: 'Radiologist & Ultrasonologist (Diagnostic Imaging Suite)',
    qualification: 'M.B.B.S • D.M.R.D (Diagnostic Radiology) • Cert. Musculoskeletal Ultrasound',
    specialization: 'High-Resolution Abdominal Ultrasonography, Doppler Sonography & Diagnostic Imaging',
    researchAreas: 'Non-Invasive Diagnostic Sonography in Primary Care',
    address: 'Ultrasound & Radiology Unit, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3126',
    email: 'ayesha.radiology@uaf.edu.pk',
    hecApprovedSupervisor: 'PMDC / PMC Certified',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Muhammad Imran Khan',
    designation: 'Chief Pharmacist / Incharge Central Medical Pharmacy',
    qualification: 'Pharm-D (UAF) • M.Phil (Pharmacy Practice) • R.Ph',
    specialization: 'Hospital Drug Formulary Management, Pharmacovigilance, Cold Chain & Rational Drug Use',
    researchAreas: 'Clinical Drug Safety, DRAP Compliance & Antibiotic Stewardship',
    address: 'Hospital Central Pharmacy, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3128',
    email: 'imran.pharmacist@uaf.edu.pk',
    hecApprovedSupervisor: 'Pharmacy Council Certified',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Tariq Javed',
    designation: 'Senior Clinical Pathologist / Diagnostic Laboratory Incharge',
    qualification: 'M.Sc • M.Phil (Medical Laboratory Technology) • Ph.D. Clinical Microbiology',
    specialization: 'Clinical Biochemistry, Automated Hematology, Immunoassays & Molecular Diagnostics',
    researchAreas: 'Laboratory Quality Assurance & Rapid Diagnostic Assays',
    address: 'Pathology & Diagnostic Lab, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3129',
    email: 'tariq.pathology@uaf.edu.pk',
    hecApprovedSupervisor: 'HEC Approved Supervisor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ms. Shamim Akhtar',
    designation: 'Nursing Superintendent / Incharge Nursing & Triage Staff',
    qualification: 'B.Sc. Nursing • Post-RN • PNC Registered • Cert. Critical Care Nursing',
    specialization: 'Triage Patient Assessment, Inpatient Ward Management, Sterilization & Emergency Nursing',
    researchAreas: 'Hospital Infection Control Protocols & Emergency Nursing Practice',
    address: 'Nursing Station, Medical & Health Centre, University of Agriculture, Faisalabad',
    phone: '+92419200161 - Ext. 3130',
    email: 'nursing.superintendent@uaf.edu.pk',
    hecApprovedSupervisor: 'Pakistan Nursing Council (PNC)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  }
];

// Helper to resolve departments
export function getDepartment(
  sectionId: string,
  facultyInfo?: FacultyMeta
): DepartmentDetailData | undefined {
  let matchedDivision: DynamicDivisionMeta | undefined;
  let matchedFacultyKey = 'fac-agri';

  for (const facKey of Object.keys(FACULTY_MENUS_MAP)) {
    const cfg = FACULTY_MENUS_MAP[facKey];
    matchedDivision =
      cfg.departments.find((d) => d.id === sectionId) ||
      cfg.institutes?.find((i) => i.id === sectionId) ||
      cfg.centres?.find((c) => c.id === sectionId);
    
    if (!matchedDivision && cfg.departments) {
      for (const d of cfg.departments) {
        if (d.subDivisions) {
          const subMatch = d.subDivisions.find((s) => s.id === sectionId);
          if (subMatch) {
            matchedDivision = subMatch;
            break;
          }
        }
      }
    }
    if (!matchedDivision && cfg.institutes) {
      for (const inst of cfg.institutes) {
        if (inst.subDivisions) {
          const subMatch = inst.subDivisions.find((s) => s.id === sectionId);
          if (subMatch) {
            matchedDivision = subMatch;
            break;
          }
        }
      }
    }
    if (!matchedDivision && cfg.centres) {
      for (const c of cfg.centres) {
        if (c.subDivisions) {
          const subMatch = c.subDivisions.find((s) => s.id === sectionId);
          if (subMatch) {
            matchedDivision = subMatch;
            break;
          }
        }
      }
    }
    if (matchedDivision) {
      matchedFacultyKey = facKey;
      break;
    }
  }

  if (!matchedDivision) {
    matchedDivision = {
      id: sectionId,
      label: sectionId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      fullName: `Department of ${sectionId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
      focus: 'Academic Research, Modern Instruction & Extension'
    };
  }

  const resolvedFaculty =
    facultyInfo || FACULTY_DATA_MAP[matchedFacultyKey] || FACULTY_DATA_MAP['fac-agri'];

  const seed = sectionId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const focusParts = matchedDivision.focus.split(',').map((s) => s.trim());

  const defaultStaffList: StaffMember[] = Array.from({ length: 8 }).map((_, idx) => {
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
      address: `${matchedDivision!.fullName}, ${resolvedFaculty.fullName}, University of Agriculture, Faisalabad`,
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
    overviewTitle: `${matchedDivision.fullName} — Academic Overview`,
    staffTitle: `${matchedDivision.fullName} — Faculty and Staff`,
    buildingImage: '/uaf_historic_campus.jpg',
    buildingCaption: `${matchedDivision.fullName}, ${resolvedFaculty.fullName}, UAF`,
    paragraphsTop: sectionId === 'ihs-overview' || sectionId === 'ihs-main'
      ? [
          'The Institute of Home Sciences (IHS) under the Faculty of Food, Nutrition and Home Sciences at the University of Agriculture, Faisalabad is a premier center of higher learning dedicated to empowering individuals, families, and communities through modern applied sciences, creative design, and socioeconomic development.'
        ]
      : sectionId === 'ihs-objectives'
      ? [
          'The primary objectives of the Institute of Home Sciences are to equip students with professional knowledge and entrepreneurial skills in textiles, human development, family economics, and interior design. Through rigorous academic coursework, community outreach programs, and industrial linkages, the Institute fosters female leadership and sustainable livelihoods.'
        ]
      : sectionId === 'ihs-director'
      ? [
          "The Director's Secretariat provides visionary academic and administrative leadership to the Institute of Home Sciences, guiding research initiatives, curricula modernizations, and state-of-the-art laboratory enhancements across all constituent departments."
        ]
      : sectionId === "soc-ibms-overview" || sectionId === "soc-ibms"
      ? [
          "Vision: To be Pakistan's lead institution in business education and research in the changing environment with global recognition. Mission: IBMS aims to produce efficient and responsible business leaders and researchers equipped with modern professional skills through participatory learning, entrepreneurship, and international linkages."
        ]
      : sectionId === "soc-ext-overview" || sectionId === "soc-iaeerd"
      ? [
          "Institute of Agri. Extension, Education and Rural Development was upgraded in 2012 by merging the Departments of Agricultural Extension, Agricultural Education and Agricultural Information Center. The Department of Agricultural Extension was established in 1962, offering undergraduate and postgraduate degree programs in Agricultural Extension, ADE, B.Ed, and doctoral research."
        ]
      : sectionId === "soc-iare-overview" || sectionId === "soc-iare"
      ? [
          "Institute of Agricultural and Resource Economics was established in mid-2012 by merging three departments: Agricultural Economics, Development Economics and Environmental and Resource Economics. The Institute offers degrees from B.Sc. (Hons) up to PhD in Economics and Resource Economics."
        ]
      : sectionId === "soc-ptsdc-overview" || sectionId === "soc-ptsdc"
      ? [
          "The University of Agriculture, Faisalabad through its Professional Training and Skill Development Centre (PTSDC) offers a structured 3-tier Mandatory Promotion Training (MPT) framework designed for Agriculture Officers at Grades 17, 18, and 19 covering Finance, Administration, Management, and E-Governance."
        ]
      : sectionId === "soc-soc-overview" || sectionId === "soc-sociology"
      ? [
          "Department of Rural Sociology at the University has been an integral part of the academic landscape since its inception. Sociology is the scientific study of human relationships and consequences, equipping students with research skills in community dynamics and social forces."
        ]
      : sectionId === 'centre-neurocognitive'
      ? [
          'The Neurocognitive Behavioural Sciences Research, Treatment & Rehabilitation Centre is a premier clinical research and therapeutic facility under the Faculty of Health and Pharmaceutical Sciences at UAF. Mandated to address urgent mental health challenges, neurodevelopmental disorders, and behavioral science frontiers, the centre bridges clinical neurosciences with cutting-edge psychological rehabilitation.'
        ]
      : sectionId === 'centre-medical-health'
      ? [
          'The Medical & Health Centre serves as the primary medical and healthcare hub of the University of Agriculture, Faisalabad, functioning under the clinical oversight of the Faculty of Health and Pharmaceutical Sciences. Providing 24/7 emergency medical assistance, outpatient consultations, and preventative health screenings, it ensures high-quality medical services for students, faculty, and the campus community.'
        ]
      : [
          `The ${matchedDivision.fullName} is an academic and research pillar of the ${resolvedFaculty.fullName} at the University of Agriculture, Faisalabad. Dedicated to high-impact learning and scientific innovation, the department trains undergraduate, postgraduate, and doctoral scholars equipped with modern theoretical, computational, and experimental competencies.`
        ],
    paragraphsWithImage: sectionId === 'centre-neurocognitive'
      ? [
          'Equipped with computerized cognitive assessment suites, EEG neurofeedback stations, and dedicated clinical counseling suites, the centre provides specialized treatment for neurocognitive impairments, stress-related disorders, autism spectrum, and behavioral issues. It actively collaborates with international neurological associations and WHO mental health initiatives.'
        ]
      : sectionId === 'centre-medical-health'
      ? [
          'The centre is equipped with digital pathology labs, radiology/ultrasound units, minor surgical suites, an emergency triage ward, and an automated pharmacy dispensing essential DRAP-approved medicines. Specialized medical officers and clinical pharmacists deliver evidence-based clinical consultations.'
        ]
      : [
          `Specializing in ${matchedDivision.focus}, the department operates modern analytical laboratories, experimental testbeds, and collaborative networks with leading national bodies (HEC, PARB, PSF) and international universities. Faculty members actively drive peer-reviewed research grants tackling modern scientific and agricultural challenges.`
        ],
    paragraphsBottom: sectionId === 'centre-neurocognitive'
      ? [
          "In addition to postgraduate training and multidisciplinary research, the centre provides compassionate community clinical services, rehabilitation therapy, and awareness campaigns, significantly advancing Pakistan's psychiatric and behavioral healthcare landscape."
        ]
      : sectionId === 'centre-medical-health'
      ? [
          'Committed to UN SDG#3, the Medical & Health Centre also spearheads campus-wide immunization drives, epidemic surveillance, blood donation camps, and lifestyle disease prevention seminars for the university and neighboring community.'
        ]
      : [
          `Graduates of the department serve across major industries, research institutes, government agencies, and academia worldwide. Through continuous curriculum enhancements and practical industry internships, the department upholds UAF's century-old academic legacy of scientific excellence.`
        ],
    societiesOrLabsTitle: sectionId.startsWith('centre-') ? 'Specialized Clinical Units & Diagnostic Facilities' : 'Specialized Laboratories & Professional Units',
    societiesOrLabs: sectionId === 'centre-neurocognitive'
      ? [
          'Neurocognitive Diagnostic & EEG Brain Mapping Unit',
          'Clinical Child & Adolescent Behavioral Therapy Suite',
          'Addiction Counseling & Cognitive Rehabilitation Cell',
          'Neuro-Psychological Assessment & Biofeedback Lab'
        ]
      : sectionId === 'centre-medical-health'
      ? [
          '24/7 Emergency Triage & Trauma Care Wing',
          'Automated Clinical Biochemistry & Hematology Diagnostic Lab',
          'Ultrasonography, ECG & Digital X-Ray Imaging Suite',
          'Vaccination, Maternal & Public Health Preventive Clinic'
        ]
      : [
          `${focusParts[0] || matchedDivision.label} Research & Diagnostics Lab`,
          `${focusParts[1] || 'Advanced Molecular'} & Analytical Instrumentation Unit`,
          `${focusParts[2] || 'Postgraduate'} Experimental & Field Research Cell`,
          `HEC Accredited Supervision & Seminar Library`
        ],
    facultySummaryBadge:
      sectionId === 'centre-medical-health'
        ? 'Qualified Medical Officers, Specialists & Healthcare Team'
        : sectionId === 'centre-neurocognitive'
        ? 'Clinical Specialist Appointments Under Process'
        : 'Distinguished HEC-Approved Faculty & Researchers',
    staffList:
      sectionId === 'centre-medical-health'
        ? MEDICAL_HEALTH_CENTRE_STAFF
        : sectionId === 'centre-neurocognitive'
        ? []
        : defaultStaffList
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED SLIDE ROW COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const AnimatedSlideRow: React.FC<{
  direction: SlideDirection;
  delayMs?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ direction, delayMs = 0, className = '', children }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    direction === 'left'
      ? '-translate-x-20 opacity-0'
      : direction === 'right'
      ? 'translate-x-20 opacity-0'
      : direction === 'bottom'
      ? 'translate-y-16 opacity-0'
      : '-translate-y-16 opacity-0';

  return (
    <div
      ref={rowRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'translate-x-0 translate-y-0 opacity-100' : hiddenTransform
      } ${className}`}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4-CARDS-PER-ROW FACULTY STAFF GRID (No Edit Buttons)
// ─────────────────────────────────────────────────────────────────────────────

const FacultyStaffRowsGrid: React.FC<{
  staffList: StaffMember[];
  onSelectMember: (member: StaffMember, portraitUrl: string, phoneNum: string) => void;
}> = ({ staffList, onSelectMember }) => {
  const rows: StaffMember[][] = [];
  for (let i = 0; i < staffList.length; i += 4) {
    rows.push(staffList.slice(i, i + 4));
  }

  const directions: SlideDirection[] = ['left', 'right', 'bottom', 'top'];

  return (
    <div className="space-y-8 overflow-hidden py-2">
      {rows.map((rowMembers, rowIndex) => {
        const dir = directions[rowIndex % directions.length];
        return (
          <AnimatedSlideRow
            key={rowIndex}
            direction={dir}
            delayMs={rowIndex * 100}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {rowMembers.map((member, cardIdx) => {
              const globalIdx = rowIndex * 4 + cardIdx;
              const portraitUrl =
                member.image || FACULTY_PORTRAIT_POOL[globalIdx % FACULTY_PORTRAIT_POOL.length];
              const phoneNum = member.phone || `+92419200161 - Ext. ${2901 + globalIdx}`;

              return (
                <div
                  key={member.name + cardIdx}
                  onClick={() => onSelectMember(member, portraitUrl, phoneNum)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectMember(member, portraitUrl, phoneNum);
                    }
                  }}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-[#163887]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col min-h-[440px] group cursor-pointer"
                >
                  <div className="relative w-full h-72 sm:h-76 bg-stone-100 overflow-hidden p-2.5 pb-0">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-stone-200 relative">
                      <img
                        src={portraitUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102a6b]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                        <span className="inline-flex items-center gap-1.5 bg-white/95 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          <Eye className="w-3.5 h-3.5 text-[#c99738]" />
                          <span>View Profile</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-3 flex-1 flex flex-col justify-between space-y-2.5 bg-white text-left">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-base text-black group-hover:text-[#071b2d] transition-colors leading-snug">
                        {member.name}
                      </h4>

                      <div className="space-y-1 text-xs sm:text-[13px] text-stone-600">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-[#3b5998] shrink-0" />
                          <span className="font-medium text-stone-700">{member.designation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#3b5998] shrink-0" />
                          <span>{phoneNum}</span>
                        </div>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <Mail className="w-3.5 h-3.5 text-[#3b5998] shrink-0" />
                          <a href={`mailto:${member.email}`} className="text-stone-700 hover:text-blue-700 hover:underline truncate">
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {member.specialization && (
                      <div className="pt-2 border-t border-stone-100">
                        <p className="text-[11.5px] text-stone-500 line-clamp-2 leading-relaxed">
                          {member.specialization}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </AnimatedSlideRow>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO & PUBLICATIONS SECTION
// ─────────────────────────────────────────────────────────────────────────────

export const FacultySciencesPortfolioSection: React.FC<{
  facultyInfo: FacultyMeta;
  onSelectMember: (member: StaffMember, portraitUrl: string, phoneNum: string) => void;
}> = ({ onSelectMember }) => {
  const [activeTab, setActiveTab] = useState<'journals' | 'conferences' | 'faculty'>('journals');
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filteredItems = FACULTY_SCIENCES_PUBLICATIONS_LIST.filter((item) => {
    if (activeTab === 'journals' && item.type !== 'journal') return false;
    if (activeTab === 'conferences' && item.type !== 'conference') return false;
    if (deptFilter !== 'All' && !item.department.toLowerCase().includes(deptFilter.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.authors.toLowerCase().includes(q) ||
        item.journalOrConf.toLowerCase().includes(q) ||
        item.doi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const csFacultyMembers = getDepartment('sci-cs')?.staffList || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <AnimatedSlideRow direction="top" className="bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-stone-200 border-l-4 border-l-[#163887] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-black border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#c99738]" />
            <span>Research & Scholarly Portfolio</span>
          </div>
          <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            HEC & Springer Indexed
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
          Scholarly Research, <span className="text-black">Journals & Publications</span>
        </h2>
        <p className="text-stone-600 text-sm sm:base leading-relaxed">
          Faculty members drive high-impact peer-reviewed research across Artificial Intelligence, Agronomy, Genomics, and Agricultural IoT. All indexed articles link directly to Springer repository.
        </p>

        <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-[#c99738] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900">Direct Springer Publications Link: </span>
              <a href={UAF_SPRINGER_PUBLICATION_URL} target="_blank" rel="noopener noreferrer" className="text-black hover:underline font-semibold break-all">
                {UAF_SPRINGER_PUBLICATION_URL}
              </a>
            </div>
          </div>
          <a
            href={UAF_SPRINGER_PUBLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs shrink-0 shadow-xs transition-colors"
          >
            <span>Open Springer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </AnimatedSlideRow>

      <div className="bg-white rounded-xl p-4 shadow-xs border border-stone-200 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('journals')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'journals' ? 'bg-[#163887] text-white shadow-xs' : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              Journal Articles
            </button>
            <button
              onClick={() => setActiveTab('conferences')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'conferences' ? 'bg-[#163887] text-white shadow-xs' : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              Conferences
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'faculty' ? 'bg-[#163887] text-white shadow-xs' : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              Faculty Directory
            </button>
          </div>

          {activeTab !== 'faculty' && (
            <div className="flex items-center gap-2.5">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-700"
              >
                <option value="All">All Disciplines</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Agronomy">Agronomy</option>
              </select>

              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163887]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {activeTab !== 'faculty' ? (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs hover:border-[#163887]/40 transition-all space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-black font-mono text-[11px] font-bold border border-blue-200">
                  {item.department}
                </span>
                <span className="text-xs text-stone-400 font-medium">{item.date}</span>
              </div>
              <h4 className="text-base font-bold text-stone-900 leading-snug">{item.title}</h4>
              <p className="text-xs sm:text-sm text-stone-600">
                {item.authors} • <span className="text-black font-semibold">{item.journalOrConf}</span>
              </p>
              <div className="pt-2 flex items-center justify-between gap-2 text-xs text-stone-500 border-t border-stone-100">
                <span><strong>DOI:</strong> {item.doi}</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-black hover:underline font-bold">
                  <span>View Paper</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <FacultyStaffRowsGrid staffList={csFacultyMembers} onSelectMember={onSelectMember} />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN FACULTY PORTAL PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface FacultyPortalPageProps {
  currentFacultyId: string;
  onNavigateHome: () => void;
  onSelectFaculty: (facultyId: string) => void;
  initialSection?: FacultySection;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onOpenCalculator?: () => void;
  onOpenAppointment?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateAdmissions?: (category: 'undergraduate' | 'postgraduate' | 'international') => void;
  publishedSiteHeader?: { elements?: any[] } | null;
  publishedPageContent?: { elements?: any[] } | null;
  publishedPages?: Record<string, { elements?: any[] }>;
  initialDepartmentSubView?: DepartmentSubView;
}

export const FacultyPortalPage: React.FC<FacultyPortalPageProps> = ({
  currentFacultyId = 'fac-agri',
  onNavigateHome,
  onSelectFaculty,
  initialSection = 'overview',
  onOpenSearch = () => {},
  onOpenAdvisor = () => {},
  onOpenCalculator = () => {},
  onOpenAppointment = () => {},
  onOpenAuthModal = () => {},
  onNavigateAdmissions,
  publishedSiteHeader = null,
  publishedPageContent = null,
  publishedPages = {},
  initialDepartmentSubView = 'overview'
}) => {
  const [activeSection, setActiveSection] = useState<FacultySection>(initialSection);
  const [departmentSubView, setDepartmentSubView] = useState<DepartmentSubView>(initialDepartmentSubView);
  const [openDropdown, setOpenDropdown] = useState<'education' | 'departments' | 'institutes' | 'centres' | null>(null);
  const [hoveredDeptItem, setHoveredDeptItem] = useState<FacultySection | null>(null);
  const [hoveredCentreItem, setHoveredCentreItem] = useState<FacultySection | null>(null);
  const [hoveredInstItem, setHoveredInstItem] = useState<FacultySection | null>(null);
  const [hoveredInstSubItem, setHoveredInstSubItem] = useState<FacultySection | null>(null);
  const [hoveredDeptSubItem, setHoveredDeptSubItem] = useState<FacultySection | null>(null);
  const [hoveredCentreSubItem, setHoveredCentreSubItem] = useState<FacultySection | null>(null);

  const [selectedStaffProfile, setSelectedStaffProfile] = useState<{
    member: StaffMember;
    portraitUrl: string;
    phoneNum: string;
  } | null>(null);

  useEffect(() => {
    setActiveSection(initialSection);
    setDepartmentSubView(initialDepartmentSubView);
    setOpenDropdown(null);
    setHoveredDeptItem(null);
    setHoveredCentreItem(null);
    setHoveredInstItem(null);
    setHoveredInstSubItem(null);
    setHoveredDeptSubItem(null);
    setHoveredCentreSubItem(null);
    setSelectedStaffProfile(null);
  }, [currentFacultyId, initialSection, initialDepartmentSubView]);

  const facultyInfo = FACULTY_DATA_MAP[currentFacultyId] || FACULTY_DATA_MAP['fac-agri'];
  const currentFacultyConfig = FACULTY_MENUS_MAP[currentFacultyId] || FACULTY_MENUS_MAP['fac-agri'];
  const activeDepartmentsList = currentFacultyConfig.departments || [];
  const activeInstitutesList = currentFacultyConfig.institutes || [];
  const activeCentresList = currentFacultyConfig.centres || [];
  const hasEducationalPrograms = currentFacultyConfig.hasEducationalPrograms !== false;
  const hasPortfolio = currentFacultyConfig.hasPortfolio === true;
  const hasCentres = currentFacultyConfig.hasCentres === true || activeCentresList.length > 0;

  // Main sections that are NOT specific department/institute subpages
  const MAIN_FACULTY_SECTIONS = [
    'overview',
    'dean',
    'undergraduate',
    'postgraduate',
    'internship',
    'short-courses',
    'portfolio',
    'centres'
  ];
  const isDepartmentSection = !MAIN_FACULTY_SECTIONS.includes(activeSection);

  const activePublishedTarget = isDepartmentSection
    ? `faculty:${currentFacultyId}:unit:${activeSection}:${departmentSubView}`
    : `faculty:${currentFacultyId}:${activeSection}`;
  const activePublishedPageContent = publishedPages[activePublishedTarget]
    || (activeSection === initialSection ? publishedPageContent : null);
  const showPublishedPageContent = Boolean(activePublishedPageContent && !selectedStaffProfile);

  // Department data resolved only when a department is actually selected
  const activeDeptData = isDepartmentSection ? getDepartment(activeSection, facultyInfo) : undefined;

  const handleSelectSection = (section: FacultySection, subView: DepartmentSubView = 'overview') => {
    setActiveSection(section);
    setDepartmentSubView(subView);
    setSelectedStaffProfile(null);
    setOpenDropdown(null);
    setHoveredDeptItem(null);
    setHoveredCentreItem(null);
    setHoveredInstItem(null);
    setHoveredInstSubItem(null);
    setHoveredDeptSubItem(null);
    setHoveredCentreSubItem(null);
  };

  const heroTitleObj = isDepartmentSection && activeDeptData
    ? {
        title: `${facultyInfo.shortName} • ${activeDeptData.name} —`,
        highlight: departmentSubView === 'staff'
          ? (activeDeptData.id === 'centre-medical-health' ? 'Medical Officers & Healthcare Staff' : 'Faculty and Staff')
          : activeDeptData.shortLabel
      }
    : activeSection === 'overview'
    ? {
        title: `${facultyInfo.fullName} —`,
        highlight: 'Overview'
      }
    : activeSection === 'dean'
    ? {
        title: `${facultyInfo.fullName} —`,
        highlight: "The Dean's Secretariat"
      }
    : activeSection === 'centres'
    ? {
        title: `${facultyInfo.fullName} —`,
        highlight: 'Centres & Specialized Units'
      }
    : activeSection === 'undergraduate'
    ? {
        title: 'Undergraduate Programs —',
        highlight: currentFacultyConfig.undergradDegree || 'Degree Structure'
      }
    : activeSection === 'portfolio'
    ? {
        title: `${facultyInfo.fullName} —`,
        highlight: 'Research & Publications Portfolio'
      }
    : SECTION_HERO_TITLES[activeSection] || {
        title: `${facultyInfo.fullName} —`,
        highlight: 'Overview'
      };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f9fa] text-stone-900 font-sans flex flex-col">
      
      {/* 0. Main University Navbar */}
      {publishedSiteHeader ? <PublishedSiteHeader
        data={publishedSiteHeader}
        onOpenSearch={onOpenSearch}
        onOpenAdvisor={onOpenAdvisor}
        onOpenCalculator={onOpenCalculator}
        onOpenAuthModal={onOpenAuthModal}
        onNavigateAdmissions={onNavigateAdmissions}
        onSelectFaculty={(facId, section) => {
          onSelectFaculty(facId);
          if (section) handleSelectSection(section as FacultySection, 'overview');
        }}
        onNavigateHome={onNavigateHome}
      /> : <Header
        onOpenSearch={onOpenSearch}
        onOpenAdvisor={onOpenAdvisor}
        onOpenCalculator={onOpenCalculator}
        onOpenAppointment={onOpenAppointment}
        onSelectFaculty={(facId, section) => {
          onSelectFaculty(facId);
          if (section) {
            handleSelectSection(section as FacultySection, 'overview');
          }
        }}
        onNavigateHome={onNavigateHome}
      />}

      {/* 1. FULL-WIDTH BACKGROUND HERO SECTION (Image as Full Background, Dynamic Text on top) */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] flex items-center bg-[#071b2d] border-b border-[#c99738]/40 overflow-hidden text-white select-none">
        
        {/* Fullscreen Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              isDepartmentSection && activeDeptData?.buildingImage
                ? activeDeptData.buildingImage
                : '/uaf_facade_no_road.jpg'
            }
            alt="UAF Main Campus"
            className="w-full h-full object-cover object-center scale-105 transition-all duration-700"
          />
          {/* Natural light-dark gradient overlay for bright daylight campus view and clear readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/55 via-[#071b2d]/35 to-[#071b2d]/15" />
        </div>

        {/* Foreground Content: Text dynamically updates when switching department/section */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-left">
          <div className="max-w-3xl space-y-3.5 sm:space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#e8a62a] animate-pulse" />
              <span>
                {isDepartmentSection && activeDeptData
                  ? `${facultyInfo.shortName} • ${activeDeptData.name}`
                  : facultyInfo.fullName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.2] font-serif-heading drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              <span>{heroTitleObj.title} </span>
              <span className="text-[#e8a62a] italic font-medium">{heroTitleObj.highlight}</span>
            </h1>

            <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {isDepartmentSection && activeDeptData
                ? `Academic excellence, laboratory instruction, and high-impact scientific research under ${activeDeptData.name}.`
                : facultyInfo.tagline}
            </p>

            {/* Quick Meta Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 text-stone-200 font-medium">
                <Building className="w-3.5 h-3.5 text-[#e8a62a]" />
                <span>{facultyInfo.departmentsCount}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 text-stone-200 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-[#e8a62a]" />
                <span>{facultyInfo.institutesCount}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 text-stone-200 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-[#e8a62a]" />
                <span>{facultyInfo.farmsCount}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FLOATING COMPACT PILL NAVIGATION BAR (Size fitted dynamically to menus, Home removed) */}
      <div className="relative z-40 -mt-6 sm:-mt-7 flex justify-center px-3 sm:px-6">
        <div className="inline-flex bg-[#071b2d] text-white rounded-2xl sm:rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-[0_12px_32px_rgba(7,27,45,0.4)] border-2 border-[#c99738]/80 max-w-full">
          <nav className="flex items-center justify-center flex-wrap gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-[13px] font-bold">
            
            {/* Faculty Overview */}
            <button
              type="button"
              onClick={() => handleSelectSection('overview')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeSection === 'overview' && !selectedStaffProfile
                  ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50'
                  : 'text-white hover:bg-[#163887]'
              }`}
            >
              Overview
            </button>

            {/* The Dean */}
            <button
              type="button"
              onClick={() => handleSelectSection('dean')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeSection === 'dean' && !selectedStaffProfile
                  ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50'
                  : 'text-white hover:bg-[#163887]'
              }`}
            >
              The Dean
            </button>

            {/* Educational Department Dropdown (Shown ONLY if hasEducationalPrograms is true) */}
            {hasEducationalPrograms && (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('education')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'education' ? null : 'education')}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    ['undergraduate', 'postgraduate', 'internship', 'short-courses'].includes(activeSection) ||
                    openDropdown === 'education'
                      ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50'
                      : 'text-white hover:bg-[#163887]'
                  }`}
                >
                  <span>Educational Department</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'education' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'education' && (
                  <div className="absolute left-0 top-full pt-2 w-56 z-50">
                    <div className="bg-[#071b2d] text-white rounded-2xl shadow-2xl border border-[#c99738]/50 py-2 overflow-hidden">
                      {[
                        { id: 'undergraduate', label: 'Undergraduate' },
                        { id: 'postgraduate', label: 'Postgraduate' },
                        { id: 'internship', label: 'Internship' },
                        { id: 'short-courses', label: 'Short Courses' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectSection(item.id as FacultySection)}
                          className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13.5px] font-bold transition-colors flex items-center justify-between cursor-pointer ${
                            activeSection === item.id ? 'bg-[#163887] text-white' : 'text-white/90 hover:bg-[#163887]'
                          }`}
                        >
                          <span>{item.label}</span>
                          {activeSection === item.id && <span className="w-2 h-2 rounded-full bg-[#e8a62a]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Departments Dropdown (Only if departments exist) */}
            {activeDepartmentsList && activeDepartmentsList.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("departments")}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setHoveredDeptItem(null);
                  setHoveredDeptSubItem(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "departments" ? null : "departments")}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    activeDepartmentsList.some((d) => d.id === activeSection || d.subDivisions?.some((s) => s.id === activeSection)) || openDropdown === "departments"
                      ? "bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50"
                      : "text-white hover:bg-[#163887]"
                  }`}
                >
                  <span>Departments</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "departments" ? "rotate-180" : ""}`} />
                </button>

                {openDropdown === "departments" && (
                  <div className="absolute left-0 top-full pt-2 w-72 sm:w-80 z-50">
                    <div className="bg-[#071b2d] text-white rounded-2xl shadow-2xl border border-[#c99738]/50 py-2">
                      {activeDepartmentsList.map((dept) => {
                        const isHovered = hoveredDeptItem === dept.id;
                        const isCurrentDept = activeSection === dept.id || dept.subDivisions?.some((s) => s.id === activeSection);
                        const hasSubItems = Boolean(dept.subDivisions && dept.subDivisions.length > 0);

                        return (
                          <div
                            key={dept.id}
                            className="relative"
                            onMouseEnter={() => setHoveredDeptItem(dept.id)}
                          >
                            <button
                              type="button"
                              onClick={() => handleSelectSection(dept.id, "overview")}
                              className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13.5px] font-bold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                                isCurrentDept || isHovered ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                              }`}
                            >
                              <span className="leading-snug">{dept.label}</span>
                              <ChevronRight className="w-4 h-4 text-[#e8a62a] shrink-0" />
                            </button>

                            {isHovered && (
                              <div className="sm:absolute sm:top-0 sm:right-full sm:pr-1.5 w-full sm:w-64 z-50">
                                <div className="bg-[#071b2d] text-white rounded-xl shadow-2xl border border-[#c99738]/60 py-2 overflow-visible max-h-[85vh] overflow-y-auto">
                                  {hasSubItems ? (
                                    <div className="space-y-0.5">
                                      <div className="px-3.5 py-1.5 mb-1 text-[11px] font-extrabold uppercase tracking-wider text-[#e8a62a] border-b border-white/10 flex items-center justify-between">
                                        <span>{dept.label}</span>
                                        <span className="text-[10px] text-white/60 lowercase font-normal">sub-menu</span>
                                      </div>
                                      {dept.subDivisions!.map((sub) => {
                                        const isCurrentSub = activeSection === sub.id;
                                        return (
                                          <button
                                            key={sub.id}
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleSelectSection(sub.id, "overview");
                                            }}
                                            className={`w-full text-left px-3.5 py-2 text-xs sm:text-[12.5px] font-bold flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                                              isCurrentSub ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                                            }`}
                                          >
                                            <span className="leading-snug">{sub.label}</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a] shrink-0" />
                                          </button>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectSection(dept.id, "overview");
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold flex items-center justify-between cursor-pointer ${
                                          isCurrentDept && departmentSubView === "overview" ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                                        }`}
                                      >
                                        <span>Department Overview</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a]" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectSection(dept.id, "staff");
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold flex items-center justify-between cursor-pointer border-t border-white/10 ${
                                          isCurrentDept && departmentSubView === "staff" ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                                        }`}
                                      >
                                        <span>Faculty and Staff</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a]" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Centres Dropdown / Tab (Shown for Health or any faculty with Centres) */}
            {hasCentres && (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("centres")}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setHoveredDeptItem(null);
                  setHoveredCentreItem(null);
                  setHoveredCentreSubItem(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(openDropdown === "centres" ? null : "centres");
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    activeSection === "centres" || activeCentresList.some((c) => c.id === activeSection || c.subDivisions?.some((s) => s.id === activeSection)) || openDropdown === "centres"
                      ? "bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50"
                      : "text-white hover:bg-[#163887]"
                  }`}
                >
                  <span>Centres</span>
                  {activeCentresList.length > 0 && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "centres" ? "rotate-180" : ""}`} />
                  )}
                </button>

                {openDropdown === "centres" && activeCentresList.length > 0 && (
                  <div className="absolute left-0 sm:left-auto sm:right-0 top-full pt-2 w-80 sm:w-96 z-50">
                    <div className="bg-[#071b2d] text-white rounded-2xl shadow-2xl border border-[#c99738]/50 py-2">
                      {activeCentresList.map((centre) => {
                        const isHovered = hoveredCentreItem === centre.id;
                        const isCurrentCentre = activeSection === centre.id || centre.subDivisions?.some((s) => s.id === activeSection);
                        const hasSubItems = Boolean(centre.subDivisions && centre.subDivisions.length > 0);

                        return (
                          <div
                            key={centre.id}
                            className="relative"
                            onMouseEnter={() => setHoveredCentreItem(centre.id)}
                          >
                            <button
                              type="button"
                              onClick={() => handleSelectSection(centre.id, "overview")}
                              className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                                isCurrentCentre || isHovered ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                              }`}
                            >
                              <span className="leading-snug">{centre.label}</span>
                              {hasSubItems && <ChevronRight className="w-4 h-4 text-[#e8a62a] shrink-0" />}
                            </button>

                            {/* Flyout Submenu only when centre has actual subDivisions */}
                            {isHovered && hasSubItems && (
                              <div className="sm:absolute sm:top-0 sm:right-full sm:pr-1.5 w-full sm:w-64 z-50">
                                <div className="bg-[#071b2d] text-white rounded-xl shadow-2xl border border-[#c99738]/60 py-2 overflow-visible max-h-[85vh] overflow-y-auto">
                                  <div className="space-y-0.5">
                                    <div className="px-3.5 py-1.5 mb-1 text-[11px] font-extrabold uppercase tracking-wider text-[#e8a62a] border-b border-white/10 flex items-center justify-between">
                                      <span>{centre.label}</span>
                                      <span className="text-[10px] text-white/60 lowercase font-normal">sub-menu</span>
                                    </div>
                                    {centre.subDivisions!.map((sub) => {
                                      const isCurrentSub = activeSection === sub.id;
                                      return (
                                        <button
                                          key={sub.id}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectSection(sub.id, "overview");
                                          }}
                                          className={`w-full text-left px-3.5 py-2 text-xs sm:text-[12.5px] font-bold flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                                            isCurrentSub ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                                          }`}
                                        >
                                          <span className="leading-snug">{sub.label}</span>
                                          <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a] shrink-0" />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Institutes Dropdown (Shown ONLY if activeInstitutesList has items) */}
            {activeInstitutesList && activeInstitutesList.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("institutes")}
                onMouseLeave={() => {
                  setOpenDropdown(null);
                  setHoveredDeptItem(null);
                  setHoveredInstItem(null);
                  setHoveredInstSubItem(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "institutes" ? null : "institutes")}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    activeInstitutesList.some((i) => i.id === activeSection || i.subDivisions?.some((s) => s.id === activeSection)) || openDropdown === "institutes"
                      ? "bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50"
                      : "text-white hover:bg-[#163887]"
                  }`}
                >
                  <span>Institutes</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "institutes" ? "rotate-180" : ""}`} />
                </button>

                {openDropdown === "institutes" && (
                  <div className="absolute right-0 top-full pt-2 w-72 sm:w-80 z-50">
                    <div className="bg-[#071b2d] text-white rounded-2xl shadow-2xl border border-[#c99738]/50 py-2">
                      {activeInstitutesList.map((inst) => {
                        const isHovered = hoveredInstItem === inst.id;
                        const isCurrentInst = activeSection === inst.id || inst.subDivisions?.some((s) => s.id === activeSection);
                        const hasSubItems = Boolean(inst.subDivisions && inst.subDivisions.length > 0);

                        return (
                          <div
                            key={inst.id}
                            className="relative"
                            onMouseEnter={() => setHoveredInstItem(inst.id)}
                          >
                            <button
                              type="button"
                              onClick={() => handleSelectSection(inst.id, "overview")}
                              className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                                isCurrentInst || isHovered ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                              }`}
                            >
                              <span className="leading-snug">{inst.label}</span>
                              <ChevronRight className="w-4 h-4 text-[#e8a62a] shrink-0" />
                            </button>

                            {/* Flyout Submenu for Institute (e.g. Institute of Home Sciences popup) */}
                            {isHovered && (
                              <div className="sm:absolute sm:top-0 sm:right-full sm:pr-1.5 w-full sm:w-80 z-50">
                                <div className="bg-[#071b2d] text-white rounded-xl shadow-2xl border border-[#c99738]/60 py-2 overflow-visible max-h-[85vh] overflow-y-auto">
                                  {hasSubItems ? (
                                    <div className="space-y-0.5">
                                      {/* Header banner inside popup */}
                                      <div className="px-3.5 py-1.5 mb-1 text-[11px] font-extrabold uppercase tracking-wider text-[#e8a62a] border-b border-white/10 flex items-center justify-between">
                                        <span>{inst.label}</span>
                                        <span className="text-[10px] text-white/60 lowercase font-normal">sub-menu</span>
                                      </div>

                                      {inst.subDivisions!.map((sub) => {
                                        const isCurrentSub = activeSection === sub.id;
                                        const isSubHovered = hoveredInstSubItem === sub.id;
                                        const isIhsDept = sub.id.startsWith("ihs-dept-");

                                        return (
                                          <div
                                            key={sub.id}
                                            className="relative"
                                            onMouseEnter={() => setHoveredInstSubItem(sub.id)}
                                          >
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectSection(sub.id, "overview");
                                              }}
                                              className={`w-full text-left px-3.5 py-2 text-xs sm:text-[12.5px] font-bold flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                                                isCurrentSub || isSubHovered ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                                              }`}
                                            >
                                              <span className="leading-snug">{sub.label}</span>
                                              <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a] shrink-0" />
                                            </button>

                                            {/* Further Pop-up Flyout for IHS Departments (Overview & Faculty and Staff) */}
                                            {isSubHovered && isIhsDept && (
                                              <div className="sm:absolute sm:top-0 sm:right-full sm:pr-1.5 w-full sm:w-52 z-50">
                                                <div className="bg-[#071b2d] text-white rounded-xl shadow-2xl border border-[#c99738]/70 py-1.5 overflow-hidden">
                                                  <button
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleSelectSection(sub.id, "overview");
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold flex items-center justify-between cursor-pointer ${
                                                      isCurrentSub && departmentSubView === "overview"
                                                        ? "bg-[#163887] text-white"
                                                        : "text-white/90 hover:bg-[#163887]"
                                                    }`}
                                                  >
                                                    <span>Department Overview</span>
                                                    <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a]" />
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleSelectSection(sub.id, "staff");
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold flex items-center justify-between cursor-pointer border-t border-white/10 ${
                                                      isCurrentSub && departmentSubView === "staff"
                                                        ? "bg-[#163887] text-white"
                                                        : "text-white/90 hover:bg-[#163887]"
                                                    }`}
                                                  >
                                                    <span>Faculty and Staff</span>
                                                    <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a]" />
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    /* Standard Institute sub-navigation (Overview & Faculty and Staff) */
                                    <div>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectSection(inst.id, "overview");
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold flex items-center justify-between cursor-pointer ${
                                          isCurrentInst && departmentSubView === "overview" ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                                        }`}
                                      >
                                        <span>Institute Overview</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a]" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectSection(inst.id, "staff");
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-[13px] font-bold flex items-center justify-between cursor-pointer border-t border-white/10 ${
                                          isCurrentInst && departmentSubView === "staff" ? "bg-[#163887] text-white" : "text-white/90 hover:bg-[#163887]"
                                        }`}
                                      >
                                        <span>Faculty and Staff</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-[#e8a62a]" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Portfolio & Research (Shown ONLY if hasPortfolio is true) */}
            {hasPortfolio && (
              <button
                type="button"
                onClick={() => handleSelectSection('portfolio')}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  activeSection === 'portfolio' && !selectedStaffProfile
                    ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50'
                    : 'text-white hover:bg-[#163887]'
                }`}
              >
                <span>Portfolio & Research</span>
              </button>
            )}

          </nav>
        </div>
      </div>

      {/* 3. Main Content Views */}
      {showPublishedPageContent ? (
        <main className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <PublishedDepartmentContent data={activePublishedPageContent} />
        </main>
      ) : selectedStaffProfile ? (
        <FacultyProfileDetailPage
          member={selectedStaffProfile.member}
          portraitUrl={selectedStaffProfile.portraitUrl}
          phoneNum={selectedStaffProfile.phoneNum}
          departmentName={activeDeptData ? activeDeptData.name : 'Department of Agronomy'}
          departmentShortLabel={activeDeptData ? activeDeptData.shortLabel : 'Agronomy'}
          facultyName={facultyInfo.fullName}
          departmentMembers={activeDeptData?.staffList || []}
          onSelectAnotherMember={(m, pUrl, pPhone) => {
            setSelectedStaffProfile({ member: m, portraitUrl: pUrl, phoneNum: pPhone });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBack={() => {
            setSelectedStaffProfile(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <main className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* =====================================================
              VIEW 1: FACULTY OVERVIEW (TEXT LEFT, COMPACT IMAGE RIGHT, STATS PRESERVED)
              NOTE: Department Overview is NOT rendered here!
          ====================================================== */}
          {activeSection === 'overview' && (
            <div className="space-y-6 overflow-hidden">
              <AnimatedSlideRow direction="top" className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#163887]"></span>
                  <span className="text-xs font-bold text-black uppercase tracking-widest">
                    Academic Excellence • {facultyInfo.name}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Overview & <span className="text-black">Academic Profile</span>
                </h2>
              </AnimatedSlideRow>

              {/* Overview Card: Left Side Text (lg:col-span-8), Right Side Compact Image (lg:col-span-4) */}
              <AnimatedSlideRow
                direction="left"
                delayMs={100}
                className="bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-stone-200 border-l-4 border-l-[#163887]"
              >
                <div className="flow-root">
                  {/* Compact Building Image Floated Right on md/lg: long text flows naturally underneath and occupies the right/marking side */}
                  <div className="w-full md:w-[320px] lg:w-[360px] md:float-right md:ml-6 mb-5 lg:mb-6">
                    <div className="relative rounded-xl overflow-hidden shadow-xs border border-stone-200 bg-stone-100 group">
                      <img
                        src="/uaf_facade_no_road.jpg"
                        alt={facultyInfo.fullName}
                        className="w-full h-auto max-h-[260px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-3 bg-stone-50 border-t border-stone-200 text-left">
                        <span className="text-xs font-semibold text-stone-800 block">
                          {facultyInfo.shortName} Academic Complex
                        </span>
                        <span className="text-[11px] text-stone-500 block mt-0.5">
                          Est. 1906 • University of Agriculture, Faisalabad
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flowing Text: starts beside image, then continues below image across entire width */}
                  <div className="space-y-4 text-left">
                    {currentFacultyId === 'fac-agri' ? (
                      <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                        The Faculty of Agriculture is the largest faculty in the University in terms of infrastructure and student enrollment. Academically, it offers a four-year B.Sc. (Hons.) Agri. Sciences degree where students complete common coursework during their first four semesters before selecting a major prior to their fifth semester. Practical training and high-tech research are facilitated through dedicated facilities, including Departmental Farms, the Postgraduate Agricultural Research Station (PARS), the Saline Agriculture Research Cell (SARC), and the Plant Health Clinic. To further strengthen hands-on learning, an internship programme has been integrated into the updated scheme of studies, supported by highly qualified teaching staff recognized by HEC to supervise Ph.D. candidates. Over time, the faculty has trained more than 11,000 undergraduate and 6,000 postgraduate students.
                      </p>
                    ) : currentFacultyId === 'fac-health' ? (
                      <div className="space-y-4 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-black border border-blue-200 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                          UN SDG#3: Good Health & Well-Being Target
                        </div>
                        <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                          The UN SDG#3, Good Health and Well-being goal necessitates equitable health and services for communities, provision of innovative healthcare technologies and prevention of public health diseases. The Faculty of Health and Pharmaceutical Sciences at UAF is mandated to play a quintessential role through demand-driven research, innovation, teaching, skill development, capacity building and community service.
                        </p>
                        <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                          To comply with the WHO International Health Regulations (IHR) and Global Health initiatives, the Faculty is committed to attain the targets of universal healthcare provision, education, policy and international collaborations. The priority areas of research and innovation are pharmacy, public health, epidemiology, One Health, medicinal plants, nutraceuticals, neurocognitive/mental health research and medical health services.
                        </p>
                        <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                          The guidelines of Pharmacy Council of Pakistan, DRAP and HEC are in place. To substitute the import bill of country, indigenous solutions of pharmaceutical production and commercialization are main priorities of the Faculty. The Faculty of Health and Pharmaceutical Sciences mission is to produce skilled graduates, biologics-diagnostics production and public-private entrepreneurial research to contribute in the knowledge-based economy of Pakistan.
                        </p>
                      </div>
                    ) : currentFacultyId === 'fac-arts' ? (
                      <div className="space-y-4 text-left">
                        <div className="bg-amber-50/70 border-l-4 border-amber-600 p-3.5 rounded-r-lg">
                          <h3 className="text-base font-bold text-stone-900 mb-1">
                            Faculty of Arts and Humanities: Where Creativity Meets Critical Inquiry
                          </h3>
                          <p className="text-stone-700 text-sm leading-relaxed">
                            Our faculty is dedicated to exploring the complexities of human experience through a diverse range of disciplines, including English and Linguistics, History, Pakistan Studies, Waris Shah Chair (cultural studies), Art and Design, and Islamic Studies. At the heart of the faculty&apos;s mission is the belief that understanding the arts and humanities is essential for fostering engaged, informed, and empathetic citizens.
                          </p>
                        </div>
                        <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                          The faculty aims to cultivate critical thinkers who can navigate and contribute to an increasingly interconnected world. Our programs emphasize interdisciplinary collaboration, encouraging students to draw connections across fields and apply their knowledge to real-world challenges. Whether through analyzing classical texts, engaging in artistic expression, or exploring social justice issues, our students are empowered to develop unique perspectives that enrich their academic and professional journeys. This helps create the richness of human culture and creativity while preparing students to make a meaningful impact in a variety of careers and communities.
                        </p>
                        <div className="pt-3 border-t border-stone-200 space-y-2.5">
                          <h4 className="text-sm font-bold text-black uppercase tracking-wider">
                            Vision and Mission of the Faculty
                          </h4>
                          <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                            The Faculty of Arts and Humanities aspires to provide holistic education. It fosters a well-rounded education, emphasizing critical thinking, creativity, and ethical reasoning, which are essential in various fields. The faculty will enhance cultural awareness, and its programs in arts and humanities intend to promote understanding of diverse cultures and histories, preparing students to engage in a globalized world.
                          </p>
                          <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                            This fosters interdisciplinary collaboration across disciplines, enhancing research and innovation by blending perspectives and critical thinking. It encourages analytical thinking, problem-solving, and the ability to view issues from multiple angles. The faculty recognizes that graduates of Arts and Humanities often pursue careers in public service, education, and community development, directly contributing to societal well-being.
                          </p>
                          <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                            The Faculty is working on a priority basis to develop effective communication skills in both verbal and written forms, which are valuable in any career. Exposure to various forms of artistic expression and theoretical frameworks can inspire creative solutions in business, technology, and other fields. That&apos;s how it fosters lifelong learning. Above all, establishing a faculty like this can attract funding and resources for research in critical areas such as social justice, ethics, and cultural studies. By prioritizing arts and humanities, universities can enrich their academic environments and better prepare students for the complexities of modern life.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left whitespace-pre-line">
                        {facultyInfo.historyText}
                      </p>
                    )}

                    <ul className="space-y-2.5 text-stone-700 text-[13.5px] sm:text-[14px] leading-relaxed pt-2 border-t border-stone-100">
                      <li className="flex items-start gap-2.5">
                        <span className="text-black font-bold text-base leading-none mt-0.5 shrink-0">•</span>
                        <div>
                          <strong className="text-stone-900 font-bold">Academic Divisions:</strong>{' '}
                          Comprises {activeDepartmentsList.length} Departments ({activeDepartmentsList.map((d) => d.label).join(', ')})
                          {activeInstitutesList.length > 0 && ` and ${activeInstitutesList.length} Constituent Institute(s) (${activeInstitutesList.map((i) => i.label).join(', ')})`}
                          {activeCentresList.length > 0 && ` and ${activeCentresList.length} Specialized Research Centre(s)`}.
                        </div>
                      </li>

                      {currentFacultyConfig.undergradDegree && (
                        <li className="flex items-start gap-2.5">
                          <span className="text-black font-bold text-base leading-none mt-0.5 shrink-0">•</span>
                          <div>
                            <strong className="text-stone-900 font-bold">Degree & Programs:</strong>{' '}
                            Offers <strong>{currentFacultyConfig.undergradDegree}</strong>
                            {currentFacultyConfig.undergradMajors && currentFacultyConfig.undergradMajors.length > 0 && (
                              <span> with specializations in {currentFacultyConfig.undergradMajors.slice(0, 6).join(', ')}</span>
                            )}.
                          </div>
                        </li>
                      )}

                      <li className="flex items-start gap-2.5">
                        <span className="text-black font-bold text-base leading-none mt-0.5 shrink-0">•</span>
                        <div>
                          <strong className="text-stone-900 font-bold">Accreditation & Standards:</strong>{' '}
                          Recognized by HEC Pakistan, relevant professional accreditation councils, and international research consortiums.
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </AnimatedSlideRow>

              {/* The 3 Stat Cards preserved right below Overview */}
              <AnimatedSlideRow
                direction="bottom"
                delayMs={180}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1"
              >
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-black flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Academic Units</span>
                    <span className="text-xl font-bold text-stone-900">{facultyInfo.departmentsCount}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-black flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Specialized Institutes</span>
                    <span className="text-xl font-bold text-stone-900">{facultyInfo.institutesCount}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-black flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Facilities & Labs</span>
                    <span className="text-xl font-bold text-stone-900">{facultyInfo.farmsCount}</span>
                  </div>
                </div>
              </AnimatedSlideRow>
            </div>
          )}

          {/* =====================================================
              VIEW 2: THE DEAN
          ====================================================== */}
          {activeSection === 'dean' && (
            <div className="bg-white rounded-2xl shadow-xs border border-stone-200 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 overflow-hidden text-left">
              <AnimatedSlideRow direction="top">
                <span className="text-xs font-bold text-black uppercase tracking-widest block mb-1">
                  Faculty Leadership • {facultyInfo.name}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">
                  Dean&apos;s Secretariat & <span className="text-black">Official Message</span>
                </h2>
              </AnimatedSlideRow>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10 items-start">
                <AnimatedSlideRow
                  direction="left"
                  delayMs={100}
                  className="w-full md:w-64 lg:w-72 xl:w-80 shrink-0 flex flex-col items-center"
                >
                  <div className="w-52 h-64 sm:w-60 sm:h-76 md:w-64 md:h-80 lg:w-72 lg:h-[350px] xl:w-80 xl:h-[380px] bg-stone-100 border-2 border-[#163887]/25 rounded-2xl overflow-hidden shadow-md relative group transition-all">
                    <img
                      src={currentFacultyConfig.deanImage}
                      alt={`${facultyInfo.deanName} - ${facultyInfo.deanTitle}`}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center mt-3.5 space-y-0.5">
                    <h3 className="font-bold text-stone-900 text-base sm:text-lg">{facultyInfo.deanName}</h3>
                    <p className="text-xs sm:text-sm text-black font-semibold">{facultyInfo.deanTitle}</p>
                    <p className="text-[11px] sm:text-xs text-stone-500 font-medium">{currentFacultyConfig.deanDepartment}</p>
                  </div>
                </AnimatedSlideRow>

                <AnimatedSlideRow direction="right" delayMs={180} className="flex-1 space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <h3 className="text-xl font-bold text-stone-900">Message from the Dean</h3>
                    <span className="text-[11px] font-bold text-black bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      Faculty Executive
                    </span>
                  </div>

                  <div className="border-l-4 border-[#163887] pl-5 py-3.5 bg-stone-50/80 rounded-r-xl space-y-3">
                    <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">{currentFacultyConfig.deanBio1}</p>
                    <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">{currentFacultyConfig.deanBio2}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                    <div className="flex items-center gap-2.5 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                      <Mail className="w-4 h-4 text-black" />
                      <a href={`mailto:${facultyInfo.deanEmail}`} className="hover:text-blue-700 hover:underline">
                        {facultyInfo.deanEmail}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                      <Phone className="w-4 h-4 text-black" />
                      <span>{facultyInfo.deanPhone}</span>
                    </div>
                  </div>
                </AnimatedSlideRow>
              </div>
            </div>
          )}

          {/* =====================================================
              VIEW 3: UNDERGRADUATE
          ====================================================== */}
          {activeSection === 'undergraduate' && (
            <div className="space-y-6 overflow-hidden text-left">
              <AnimatedSlideRow direction="top" className="space-y-1 border-b border-stone-200 pb-2">
                <span className="text-xs font-bold text-black uppercase tracking-widest">Educational Programs</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">{currentFacultyConfig.undergradDegree}</h2>
              </AnimatedSlideRow>

              <div className="bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-stone-200 border-l-4 border-l-[#163887] space-y-4">
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {facultyInfo.fullName} offers four-year degree programs under the semester system. Admissions are opened annually on merit basis, integrating rigorous coursework with practical field immersion.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                  {(currentFacultyConfig.undergradMajors || []).map((m, i) => (
                    <div key={i} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              VIEW 4: POSTGRADUATE
          ====================================================== */}
          {activeSection === 'postgraduate' && (
            <div className="space-y-6 overflow-hidden text-left">
              <AnimatedSlideRow direction="top" className="space-y-1 border-b border-stone-200 pb-2">
                <span className="text-xs font-bold text-black uppercase tracking-widest">Advanced Research</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">M.Sc. (Hons.) & Ph.D. Programs</h2>
              </AnimatedSlideRow>

              <div className="bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-stone-200 border-l-4 border-l-[#163887] space-y-4">
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Postgraduate degree programs provide advanced coursework followed by supervised dissertation research evaluated by international reviewers from technologically advanced countries.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================
              VIEW 5: INTERNSHIP
          ====================================================== */}
          {activeSection === 'internship' && (
            <div className="space-y-6 overflow-hidden text-left">
              <AnimatedSlideRow direction="top" className="space-y-1 border-b border-stone-200 pb-2">
                <span className="text-xs font-bold text-black uppercase tracking-widest">Experiential Learning</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Mandatory Field Internship</h2>
              </AnimatedSlideRow>

              <div className="bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-stone-200 border-l-4 border-l-[#163887]">
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Final semester students spend 6 months in progressive commercial enterprises, seed corporations, and experimental research stations to apply their knowledge under professional supervision.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================
              VIEW 6: SHORT COURSES
          ====================================================== */}
          {activeSection === 'short-courses' && (
            <div className="space-y-6 overflow-hidden text-left">
              <AnimatedSlideRow direction="top" className="space-y-1 border-b border-stone-200 pb-2">
                <span className="text-xs font-bold text-black uppercase tracking-widest">Community Training</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Vocational Short Courses</h2>
              </AnimatedSlideRow>

              <div className="bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-stone-200 border-l-4 border-l-[#163887]">
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Short courses in tunnel farming, mushroom cultivation, apiculture, and precision irrigation empower farmers and entrepreneurs with practical technical skills.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================
              VIEW 7: PORTFOLIO & PUBLICATIONS
          ====================================================== */}
          {activeSection === 'portfolio' && (
            <FacultySciencesPortfolioSection
              facultyInfo={facultyInfo}
              onSelectMember={(member, portraitUrl, phoneNum) => {
                setSelectedStaffProfile({ member, portraitUrl, phoneNum });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* =====================================================
              VIEW 8: CENTRES & CLINICAL UNITS (e.g., for Health Sciences)
          ====================================================== */}
          {activeSection === 'centres' && (
            <div className="space-y-6 overflow-hidden text-left">
              <AnimatedSlideRow direction="top" className="space-y-1 border-b border-stone-200 pb-2">
                <span className="text-xs font-bold text-black uppercase tracking-widest">
                  Specialized Facilities • {facultyInfo.name}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Centres & <span className="text-black">Specialized Units</span>
                </h2>
              </AnimatedSlideRow>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(activeCentresList.length > 0
                  ? activeCentresList
                  : [
                      {
                        id: 'centre-drug-dev',
                        label: 'Centre for Advanced Drug Research',
                        fullName: 'Centre for Advanced Drug Research and Development',
                        focus: 'Preclinical Trials, Formulation Science & Drug Quality Control'
                      },
                      {
                        id: 'centre-biologics',
                        label: 'Centre for Biologics & Diagnostics',
                        fullName: 'Centre for Biologics & Diagnostics Production',
                        focus: 'Biologics, Diagnostic Assays & Public Health Diagnostics'
                      }
                    ]
                ).map((centre) => (
                  <div
                    key={centre.id}
                    className="bg-white rounded-xl p-6 shadow-xs border border-stone-200 border-l-4 border-l-[#163887] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-black text-xs font-bold border border-blue-200">
                        Specialized Centre
                      </span>
                      <Building className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900">{centre.fullName}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Focused on {centre.focus}. Operates advanced instrumentation, research testbeds, and collaborative outreach for community healthcare and indigenous pharmaceutical production.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                      <span>{facultyInfo.fullName}</span>
                      <button
                        type="button"
                        onClick={() => handleSelectSection(centre.id as FacultySection, 'overview')}
                        className="text-black font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Explore Centre</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================
              DEPARTMENT VIEWS (SHOWN ONLY WHEN A SPECIFIC DEPARTMENT IS CLICKED)
          ====================================================== */}
          {isDepartmentSection && activeDeptData && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* SUB-VIEW A: DEPARTMENT / CENTRE OVERVIEW (TEXT LEFT, COMPACT IMAGE RIGHT, ZERO OVERLAP, NO EDIT BUTTONS) */}
              {departmentSubView === 'overview' ? (
                <AnimatedSlideRow
                  direction="left"
                  className="bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-stone-200 border-l-4 border-l-[#163887] space-y-6 overflow-hidden"
                >
                  <div className="flow-root">
                    {/* Compact Framed Image Floated Right on md/lg: long text flows underneath and occupies the right/marking side */}
                    <div className="w-full md:w-[320px] lg:w-[360px] md:float-right md:ml-6 mb-5 lg:mb-6">
                      <div className="relative rounded-xl overflow-hidden shadow-xs border border-stone-200 bg-stone-100 group">
                        <img
                          src={activeDeptData.buildingImage || '/uaf_historic_campus.jpg'}
                          alt={activeDeptData.buildingCaption}
                          className="w-full h-auto max-h-[260px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="p-3 bg-stone-50 border-t border-stone-200 text-left">
                          <p className="text-xs font-semibold text-stone-800 leading-snug">
                            {activeDeptData.buildingCaption || `${activeDeptData.name} Academic Complex`}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            University of Agriculture, Faisalabad
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Continuous flowing text: starts left of image, continues below image across full width */}
                    <div className="space-y-3.5 text-stone-700 text-sm sm:text-[15px] leading-relaxed text-left">
                      <div className="space-y-1.5 pb-2 border-b border-stone-200">
                        <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#163887]"></span>
                          Academic Overview • {activeDeptData.shortLabel}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                          {activeDeptData.overviewTitle}
                        </h3>
                      </div>

                      {activeDeptData.paragraphsTop.map((para, i) => (
                        <p key={`top-${i}`}>{para}</p>
                      ))}
                      {activeDeptData.paragraphsWithImage.map((para, i) => (
                        <p key={`mid-${i}`}>{para}</p>
                      ))}
                      {activeDeptData.paragraphsBottom.map((para, i) => (
                        <p key={`bot-${i}`}>{para}</p>
                      ))}
                    </div>

                  </div>

                  {/* Research Laboratories & Societies at bottom of card */}
                  {activeDeptData.societiesOrLabs && activeDeptData.societiesOrLabs.length > 0 && (
                    <div className="pt-5 border-t border-stone-200 space-y-3 text-left">
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#163887]"></span>
                        {activeDeptData.societiesOrLabsTitle || 'Specialized Research Laboratories & Units'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {activeDeptData.societiesOrLabs.map((soc, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                            <span>{soc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </AnimatedSlideRow>
              ) : departmentSubView === 'staff' ? (
                /* SUB-VIEW B: STAFF LIST (4 CARDS PER ROW, NO EDIT BUTTONS) */
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-5 shadow-xs border border-stone-200 border-b-4 border-b-[#c5cba3] text-left">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#163887]" />
                          <span className="text-xs font-bold text-black uppercase tracking-wider">
                            {activeDeptData.facultySummaryBadge || 'Faculty & Healthcare Team'}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                          {activeDeptData.id === 'centre-medical-health'
                            ? 'Medical & Health Centre — Doctors, Medical Officers & Healthcare Team'
                            : `Faculty Profiles — ${activeDeptData.name}`}
                        </h3>
                        <p className="text-xs text-stone-500 mt-1">
                          {activeDeptData.staffList.length > 0
                            ? `${activeDeptData.staffList.length} Active ${activeDeptData.id === 'centre-medical-health' ? 'Medical Officers & Healthcare Specialists' : 'Faculty Members'} • University of Agriculture, Faisalabad`
                            : 'Staff Empanelment & Specialist Appointments in Progress'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectSection(activeDeptData.id, 'overview')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-[#163887] hover:text-white text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Building className="w-3.5 h-3.5" />
                        <span>View Overview & Facilities</span>
                      </button>
                    </div>
                  </div>

                  {activeDeptData.staffList.length > 0 ? (
                    <FacultyStaffRowsGrid
                      staffList={activeDeptData.staffList}
                      onSelectMember={(member, portraitUrl, phoneNum) => {
                        setSelectedStaffProfile({ member, portraitUrl, phoneNum });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  ) : (
                    /* Clean Notice When Staff is Under Appointment / Nothing Added Yet */
                    <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 text-center max-w-2xl mx-auto shadow-sm space-y-4">
                      <div className="w-16 h-16 rounded-full bg-blue-50 text-black flex items-center justify-center mx-auto border border-blue-200">
                        <GraduationCap className="w-8 h-8 text-black" />
                      </div>
                      <h4 className="text-xl font-bold text-stone-900">
                        Faculty & Clinical Specialist Appointments Under Process
                      </h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        The appointment and clinical empanelment of specialized faculty, neuro-psychologists, and therapists for the <strong>{activeDeptData.name}</strong> is currently being finalized under the Faculty of Health and Pharmaceutical Sciences, UAF.
                      </p>
                      <div className="pt-2 flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleSelectSection(activeDeptData.id, 'overview')}
                          className="px-5 py-2.5 rounded-lg bg-[#163887] hover:bg-[#102a6b] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
                        >
                          View Centre Overview & Clinical Units
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <FacultySciencesPortfolioSection
                  facultyInfo={facultyInfo}
                  onSelectMember={(member, portraitUrl, phoneNum) => {
                    setSelectedStaffProfile({ member, portraitUrl, phoneNum });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

            </div>
          )}

        </main>
      )}

    </div>
  );
};
