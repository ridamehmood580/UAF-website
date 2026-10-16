'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  FileText,
  Download,
  FolderOpen,
  BookOpen,
  HelpCircle,
  X,
  Printer,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';

export type AdmissionCategory = string;

export type AdmissionsTab = 'overview' | 'schemes' | 'question_bank';

interface AdmissionsDetailPageProps {
  initialCategory?: string;
  onBack: () => void;
  onOpenCalculator: () => void;
  onOpenAdvisor: () => void;
}

interface AdmissionNotice {
  id: string;
  title: string;
  date: string;
  badge: string;
  badgeColor?: string;
  isImportant?: boolean;
  actionLabel?: string;
  details: string;
  downloadFilename?: string;
  subItems?: { name: string; url?: string; date?: string; quota?: string }[];
}

interface MeritCandidate {
  sr: number;
  rollNo: string;
  name: string;
  fatherName: string;
  program: string;
  aggregate: string;
  status: string;
}

interface QuestionBankItem {
  id: string;
  subject: string;
  faculty: string;
  degree: string;
  questionCount: string;
  sampleQuestions: { q: string; options: string[]; answer: string }[];
}

export const AdmissionsDetailPage: React.FC<AdmissionsDetailPageProps> = ({
  initialCategory = 'undergraduate',
  onBack,
  onOpenCalculator,
  onOpenAdvisor
}) => {
  // Category can be undergraduate or postgraduate
  const [currentCategory, setCurrentCategory] = useState<'undergraduate' | 'postgraduate'>(
    initialCategory === 'postgraduate' ? 'postgraduate' : 'undergraduate'
  );

  const isPostgraduate = currentCategory === 'postgraduate';

  // Active Tab state
  const [activeTab, setActiveTab] = useState<AdmissionsTab>('overview');
  const [selectedNotice, setSelectedNotice] = useState<AdmissionNotice | null>(null);
  const [showMeritModal, setShowMeritModal] = useState(false);
  const [meritSearch, setMeritSearch] = useState('');
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [selectedQuestionBank, setSelectedQuestionBank] = useState<QuestionBankItem | null>(null);
  const [qbSearch, setQbSearch] = useState('');

  // 17 Official Notices for Undergraduate (Image 1)
  const UNDERGRAD_NOTICES: AdmissionNotice[] = useMemo(() => [
    {
      id: 'adm-01',
      title: 'Undergraduate Merit Lists 2026-2027',
      date: 'Fall / Winter Session 2026-27',
      badge: 'Official Merit List',
      badgeColor: 'bg-blue-600',
      isImportant: true,
      actionLabel: 'View Merit Lists',
      downloadFilename: 'UAF_Undergraduate_Merit_Lists_2026_27.pdf',
      details: 'First, Second, Third and Final Merit Lists for all 4-year and 5-year B.Sc. (Hons.), BS Computer Science, Pharm-D, DVM and Engineering programs at UAF Main Campus and Sub-Campuses Burewala, Toba Tek Singh and Depalpur (Okara). Candidates must deposit dues and verify original credentials before the stipulated deadline.',
      subItems: [
        { name: '1st Merit List (Morning Programs) — Faculty of Agriculture & Sciences', date: '08-08-2026' },
        { name: '1st Merit List (Morning Programs) — Engineering, DVM & Pharm-D', date: '08-08-2026' },
        { name: '2nd Merit List (Morning & Evening Regular/Self-Finance)', date: '15-08-2026' },
        { name: '3rd Merit List & Quota Seats (Sports, Co-curricular, Overseas)', date: '22-08-2026' },
        { name: 'Consolidated Merit Gazette for Sub-Campuses', date: '25-08-2026' }
      ]
    },
    {
      id: 'adm-02',
      title: 'Undergraduate Merit Fee Vouchers for Admission 2026-2027',
      date: 'Payment Window: Active',
      badge: 'Fee Challan',
      badgeColor: 'bg-amber-600',
      isImportant: true,
      actionLabel: 'Download Fee Voucher',
      downloadFilename: 'UAF_Bank_Fee_Challan_Voucher_2026.pdf',
      details: 'All merit-selected candidates are directed to print their customized 4-copy Fee Voucher (Student, Bank, University, and Department copies) payable at any online branch of MCB Bank, Allied Bank Limited, or National Bank of Pakistan across Pakistan.',
      subItems: [
        { name: 'Undergraduate Morning Regular Fee Voucher (Semester 1)', date: 'PKR 44,800' },
        { name: 'Undergraduate Evening Self-Supporting Fee Voucher (Semester 1)', date: 'PKR 78,500' },
        { name: 'Hostel Allotment & Security Deposit Challan', date: 'PKR 18,200' },
        { name: 'Online Bank Verification & Receipt Upload Guide', date: 'Mandatory' }
      ]
    },
    {
      id: 'adm-03',
      title: 'Online Application for Admission',
      date: 'Admissions 2026-27',
      badge: 'Portal Open',
      badgeColor: 'bg-blue-600',
      isImportant: true,
      actionLabel: 'Apply Online',
      details: 'Candidate Registration and Document Submission Portal for Undergraduate Degree Programs. Please ensure that secondary school certificate (SSC) and intermediate pre-medical/pre-engineering or ICS roll numbers and verified marks sheets are ready before initiating submission.',
      subItems: [
        { name: 'Candidate Sign-Up & CNIC/B-Form Verification', url: '#' },
        { name: 'Preference Selection of Degree Programs (Up to 10 choices)', url: '#' },
        { name: 'Scanned Document Upload (Photo, Marks Sheet, Domicile)', url: '#' },
        { name: 'Generate PKR 1,500 Application Processing Voucher', url: '#' }
      ]
    },
    {
      id: 'adm-04',
      title: 'Result of three remaining Candidates (1st Entry Test) 05-07-2026',
      date: '05-07-2026',
      badge: 'Special Gazette',
      actionLabel: 'View Notification',
      downloadFilename: 'Result_3_Remaining_Candidates_05072026.pdf',
      details: 'Official notification regarding the rectified and compiled entry test scores for three candidates whose response sheets required manual optical mark re-verification by the Controller of Examinations, UAF.'
    },
    {
      id: 'adm-05',
      title: 'Result of Extended_Test2_V1(1) 9 Anomalies Cases',
      date: 'July 2026',
      badge: 'Anomaly Redressal',
      actionLabel: 'View Redressal List',
      downloadFilename: 'Extended_Test2_V1_9_Anomalies_Cases.pdf',
      details: 'Resolution and score declaration of 9 disputed optical barcode and roll number anomaly cases in the second session of the Undergraduate General Entry Test 2026.'
    },
    {
      id: 'adm-06',
      title: 'Undergraduate Result of Second Entry Test held on 02-08-2026',
      date: '02-08-2026',
      badge: '2nd Entry Test',
      badgeColor: 'bg-blue-700',
      isImportant: true,
      actionLabel: 'Download Full Gazette',
      downloadFilename: 'Undergraduate_Result_Second_Entry_Test_02082026.pdf',
      details: 'Complete Gazette and Score Cards of the 2nd Phase Undergraduate Admission Entry Test held simultaneously across 14 regional centers in Punjab, KP, Sindh, and Islamabad.',
      subItems: [
        { name: 'Test Center 01 — UAF Main Campus Faisalabad (Boys & Girls Gymnasia)', quota: 'Score Gazette' },
        { name: 'Test Center 02 — Rawalpindi / Islamabad Model College Center', quota: 'Score Gazette' },
        { name: 'Test Center 03 — Lahore Govt. College of Science Center', quota: 'Score Gazette' },
        { name: 'Test Center 04 — Multan, Vehari, Gujranwala & Sargodha Centers', quota: 'Score Gazette' }
      ]
    },
    {
      id: 'adm-07',
      title: 'Undergraduate Result of First Entry Test held on 05-07-2026',
      date: '05-07-2026',
      badge: '1st Entry Test',
      badgeColor: 'bg-blue-700',
      actionLabel: 'Download Result Card',
      downloadFilename: 'Undergraduate_Result_First_Entry_Test_05072026.pdf',
      details: 'Official results and percentile rankings for over 22,000 applicants who appeared in the First Undergraduate Entry Test on July 5, 2026.'
    },
    {
      id: 'adm-08',
      title: 'Instructions for Candidates of 2nd Entry Test',
      date: 'Test Guidelines',
      badge: 'Candidate Guidelines',
      actionLabel: 'Download PDF',
      downloadFilename: 'Instructions_Candidates_2nd_Entry_Test_2026.pdf',
      details: 'Mandatory guidelines regarding reporting time, transparent clipboards, black/blue ballpoint pens, ban on mobile/programmable devices, and original CNIC/B-Form verification.'
    },
    {
      id: 'adm-09',
      title: 'Dates of Sports/Co-Curricular Trials (2026-2027)',
      date: 'August 2026',
      badge: 'Quota Trials',
      badgeColor: 'bg-amber-600',
      actionLabel: 'View Schedule',
      downloadFilename: 'Sports_CoCurricular_Trials_Schedule_2026.pdf',
      details: 'Complete schedule of physical trials and auditions for sports and co-curricular quota applicants at UAF Sports Complex and Gymnasium.'
    },
    {
      id: 'adm-10',
      title: 'Schedule of Entry Test 2026-2027',
      date: 'Admissions 2026-27',
      badge: 'Test Calendar',
      actionLabel: 'Download Schedule',
      downloadFilename: 'Schedule_Entry_Test_2026_27.pdf',
      details: 'Key milestones, registration closure dates, roll number slip downloads, and test timings for Undergraduate Entry Tests.'
    },
    {
      id: 'adm-11',
      title: 'Admission Notice for Diploma in Agricultural Sciences (DAS) and LAD',
      date: 'Academic Year 2026-27',
      badge: 'Diplomas',
      actionLabel: 'Download Prospectus',
      downloadFilename: 'DAS_LAD_Diploma_Admission_Notice_2026.pdf',
      details: 'Admissions for 3-Year Diploma in Agricultural Sciences (DAS) and 2-Year Livestock Assistant Diploma (LAD) at Community College PARS, Jhang Road.'
    },
    {
      id: 'adm-12',
      title: 'Check List for Physical Document Verification',
      date: 'Mandatory Verification',
      badge: 'Verification',
      actionLabel: 'View Document List',
      downloadFilename: 'Document_Verification_Checklist_2026.pdf',
      details: 'Comprehensive list of mandatory original documents (Matric, Inter result card, CNIC/B-Form, Domicile, Medical fitness certificate) required at Dean offices.'
    },
    {
      id: 'adm-13',
      title: 'Undergraduate Admission Guideline 2026-2027',
      date: 'Full Prospectus',
      badge: 'Official Guide',
      badgeColor: 'bg-[#163887]',
      isImportant: true,
      actionLabel: 'Download Prospectus',
      downloadFilename: 'Undergraduate_Admission_Guideline_2026_27.pdf',
      details: 'Comprehensive official guidebook describing faculty departments, semester credit requirements, grading policies, hostel facilities, and scholarship schemes.'
    },
    {
      id: 'adm-14',
      title: '1 st MERIT LIST OF B.ED. MORNING PROGRAM (Main Campus)',
      date: 'Main Campus',
      badge: 'Morning Merit',
      badgeColor: 'bg-blue-600',
      actionLabel: 'Download List',
      downloadFilename: '1st_Merit_List_BEd_Morning_Main_Campus_2026.pdf',
      details: 'Official first merit selection list for B.Ed (1.5 Year and 2.5 Year Morning Programs) offered at the Faculty of Social Sciences, Main Campus Faisalabad.'
    },
    {
      id: 'adm-15',
      title: '1 st MERIT LIST OF B.ED. EVENING PROGRAM (Main Campus)',
      date: 'Main Campus',
      badge: 'Evening Merit',
      actionLabel: 'Download List',
      downloadFilename: '1st_Merit_List_BEd_Evening_Main_Campus_2026.pdf',
      details: 'Official first merit list for evening self-supporting candidates admitted into the Bachelor of Education (B.Ed.) program at Main Campus.'
    },
    {
      id: 'adm-16',
      title: '1 st MERIT LIST OF B.ED. WEEKEND PROGRAM (Main Campus)',
      date: 'Main Campus',
      badge: 'Weekend Merit',
      actionLabel: 'Download List',
      downloadFilename: '1st_Merit_List_BEd_Weekend_Main_Campus_2026.pdf',
      details: 'Official first merit selection list for in-service teachers and working professionals enrolled in the B.Ed Weekend Program (Main Campus).'
    },
    {
      id: 'adm-17',
      title: '1 st MERIT LIST OF B.ED. WEEKEND PROGRAM (PARS Campus)',
      date: 'PARS Campus Jhang Road',
      badge: 'PARS Campus',
      actionLabel: 'Download List',
      downloadFilename: '1st_Merit_List_BEd_Weekend_PARS_Campus_2026.pdf',
      details: 'Official first merit list for B.Ed Weekend program candidates selected for the Post Graduate Agriculture Research Station (PARS) Campus on Jhang Road, Faisalabad.'
    }
  ], []);

  // 5 Official Notices for Postgraduate (Image 2)
  const POSTGRAD_NOTICES: AdmissionNotice[] = useMemo(() => [
    {
      id: 'post-01',
      title: 'Apply Online',
      date: 'Spring Session 2025-26',
      badge: 'Portal Open',
      badgeColor: 'bg-blue-600',
      isImportant: true,
      actionLabel: 'Apply Online',
      details: 'Online portal for submission of applications for Postgraduate M.Sc. (Hons.), M.Phil, MS, and Ph.D. degree admissions at UAF.'
    },
    {
      id: 'post-02',
      title: 'Online Application Procedure for Postgraduate GAT/GRE (Subject) Test',
      date: 'Spring 2025-26',
      badge: 'Test Procedure',
      badgeColor: 'bg-blue-600',
      actionLabel: 'View Procedure',
      downloadFilename: 'Postgraduate_GAT_GRE_Procedure.pdf',
      details: 'Step-by-step guideline for candidate registration, test roll number slips, and syllabus outline for UAF Subject GAT/GRE tests.'
    },
    {
      id: 'post-03',
      title: 'Guidelines for Registration/Appearing in GAT/GRE (Subject) Test',
      date: 'Mandatory Guidelines',
      badge: 'Guidelines',
      actionLabel: 'View Guidelines',
      downloadFilename: 'GAT_GRE_Registration_Guidelines.pdf',
      details: 'Instructions regarding test centers, calculator policies, original CNIC verification, and passing percentage thresholds (50% for Masters, 60% for Ph.D.).'
    },
    {
      id: 'post-04',
      title: 'Fee Structure for Postgraduate Degree Programs (Winter Semester 2025-26)',
      date: 'Winter Semester 2025-26',
      badge: 'Fee Schedule',
      badgeColor: 'bg-amber-600',
      actionLabel: 'Download Fee Structure',
      downloadFilename: 'Postgraduate_Fee_Structure_2025_26.pdf',
      details: 'Comprehensive fee schedule including tuition fee, laboratory dues, examination charges, library funds, and hostel security.'
    },
    {
      id: 'post-05',
      title: 'Details/Advertisement of Postgraduate Admissions for Spring 2025-26',
      date: 'Official Newspaper Release',
      badge: 'Advertisement',
      badgeColor: 'bg-[#163887]',
      isImportant: true,
      actionLabel: 'Download Advertisement',
      downloadFilename: 'Postgraduate_Advertisement_Spring_2025_26.pdf',
      details: 'Official newspaper advertisement detailing faculty departments offering M.Sc. (Hons.), M.Phil, and Ph.D. programs with eligibility criteria.'
    }
  ], []);

  // Exact Numbered List of Undergraduate Degree Programs (Image 1 from user)
  const UNDERGRAD_DEGREE_PROGRAMS: string[] = useMemo(() => [
    'B.Sc. Agricultural Engineering',
    'Doctor of Veterinary Medicine',
    'B.Sc. (Hons.) Home Economics',
    'B.Sc. (Hons.) Human Nutrition and Dietetics',
    'B.Sc. Food Engineering',
    'B.Sc. Textile Engineering Technology',
    'B.Sc. Energy Systems Engineering',
    'B.Sc. Environmental Engineering',
    'Doctor of Pharmacy (Pharm-D)',
    'Bachelor of Business Administration (BBA)',
    'BS (Bio-Informatics)',
    'BS (Biostatistics)',
    'BS (Computer Science)',
    'BS (Information Technology)',
    'BS (Software Engineering)',
    'BBA (Agribusiness)',
    'B.Sc. (Hons.) Poultry Sciences',
    'B.Sc. (Hons.) Agricultural and Resource Economics',
    'B.Sc. (Hons) Agriculture (First Four Semesters)',
    'B.Sc. (Hons.) Agriculture (Agronomy)',
    'B.Sc. (Hons.) Agriculture (Plant Breeding and Genetics)',
    'B.Sc. (Hons.) Agriculture (Soil & Environmental Sciences)',
    'B.Sc. (Hons.) Agriculture (Horticulture)',
    'B.Sc. (Hons.) Agriculture (Plant Pathology)',
    'B.Sc. (Hons.) Agriculture (Entomology)',
    'BS Biochemistry',
    'BS Botany',
    'BS Chemistry',
    'BS Zoology',
    'BS Physics',
    'BS Mathematics',
    'BS English',
    'BS Sociology',
    'Doctor of Physical Therapy (DPT)',
    'B.Sc. (Hons.) Dairy Science'
  ], []);

  // Postgraduate Degree Programs (Image 2)
  const POSTGRAD_DEGREE_PROGRAMS: string[] = useMemo(() => [
    'M.Sc. (Hons.) Agronomy',
    'M.Sc. (Hons.) Plant Breeding & Genetics',
    'M.Sc. (Hons.) Soil Science',
    'M.Sc. (Hons.) Horticulture',
    'M.Sc. (Hons.) Entomology',
    'M.Sc. (Hons.) Plant Pathology',
    'M.Sc. (Hons.) Food Technology',
    'M.Sc. (Hons.) Agricultural Economics',
    'MS Computer Science',
    'MS Software Engineering',
    'M.Phil Biochemistry',
    'M.Phil Botany',
    'M.Phil Chemistry',
    'M.Phil Zoology',
    'M.Phil Physics',
    'Ph.D. Agronomy',
    'Ph.D. Plant Breeding & Genetics',
    'Ph.D. Soil Science',
    'Ph.D. Food Technology',
    'Ph.D. Computer Science',
    'Ph.D. Veterinary Medicine'
  ], []);

  // Postgraduate Question Bank Items (Official Helping Material for UAF GAT/GRE Test)
  const POSTGRAD_QUESTION_BANK: QuestionBankItem[] = useMemo(() => [
    {
      id: 'qb-01',
      subject: 'Plant Breeding & Genetics (PBG)',
      faculty: 'Faculty of Agriculture',
      degree: 'M.Sc. (Hons.) / Ph.D.',
      questionCount: '120 MCQs with Answer Key',
      sampleQuestions: [
        { q: 'In Mendelian dihybrid inheritance, the phenotypic ratio in F2 generation is:', options: ['9:3:3:1', '3:1', '1:2:1', '15:1'], answer: '9:3:3:1' },
        { q: 'The term heterosis was coined by:', options: ['G.H. Shull', 'Mendel', 'Bateson', 'Morgan'], answer: 'G.H. Shull' },
        { q: 'Which breeding method is most suitable for self-pollinated crops?', options: ['Pedigree Method', 'Recurrent Selection', 'Mass Selection with testing', 'Clonal Selection'], answer: 'Pedigree Method' }
      ]
    },
    {
      id: 'qb-02',
      subject: 'Computer Science & Software Engineering',
      faculty: 'Faculty of Sciences',
      degree: 'MS / Ph.D. CS',
      questionCount: '110 MCQs (Algorithms, OS, DBMS)',
      sampleQuestions: [
        { q: 'What is the worst-case time complexity of QuickSort?', options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'], answer: 'O(n^2)' },
        { q: 'Which scheduling algorithm is non-preemptive by definition?', options: ['First-Come First-Served (FCFS)', 'Round Robin', 'Shortest Remaining Time First', 'Priority (Preemptive)'], answer: 'First-Come First-Served (FCFS)' },
        { q: 'In relational databases, which normal form eliminates transitive dependency?', options: ['3NF', '1NF', '2NF', 'BCNF'], answer: '3NF' }
      ]
    },
    {
      id: 'qb-03',
      subject: 'Agronomy (Field Crops & Weed Science)',
      faculty: 'Faculty of Agriculture',
      degree: 'M.Sc. (Hons.) / Ph.D.',
      questionCount: '100 MCQs with Solutions',
      sampleQuestions: [
        { q: 'The optimum temperature for wheat seed germination is:', options: ['20 - 25°C', '10 - 15°C', '30 - 35°C', '5 - 10°C'], answer: '20 - 25°C' },
        { q: 'Trianthema portulacastrum (Itsit) is an example of:', options: ['Broadleaf summer weed', 'Narrow leaf winter weed', 'Aquatic weed', 'Parasitic weed'], answer: 'Broadleaf summer weed' }
      ]
    },
    {
      id: 'qb-04',
      subject: 'Chemistry (Organic, Inorganic, Physical)',
      faculty: 'Faculty of Sciences',
      degree: 'M.Phil / Ph.D. Chemistry',
      questionCount: '130 MCQs with Detailed Explanations',
      sampleQuestions: [
        { q: 'Which of the following compounds exhibits optical isomerism?', options: ['2-chlorobutane', '1-chlorobutane', '2-chloropropane', '1-chloroethane'], answer: '2-chlorobutane' },
        { q: 'The conjugate base of HSO4- is:', options: ['SO4(2-)', 'H2SO4', 'H3O+', 'H2S'], answer: 'SO4(2-)' }
      ]
    },
    {
      id: 'qb-05',
      subject: 'Economics & Agri. Economics',
      faculty: 'Faculty of Social Sciences',
      degree: 'M.Sc. (Hons.) / Ph.D.',
      questionCount: '90 MCQs (Micro, Macro, Econometrics)',
      sampleQuestions: [
        { q: 'If demand is perfectly inelastic, the elasticity coefficient is:', options: ['0', '1', 'Infinity', '-1'], answer: '0' },
        { q: 'The law of diminishing marginal returns operates in the:', options: ['Short run', 'Long run', 'Market period', 'Secular period'], answer: 'Short run' }
      ]
    },
    {
      id: 'qb-06',
      subject: 'Food Technology & Human Nutrition',
      faculty: 'Faculty of Food & Nutrition',
      degree: 'M.Sc. (Hons.) / Ph.D.',
      questionCount: '105 MCQs with Explanations',
      sampleQuestions: [
        { q: 'Pasteurization of milk primarily targets which pathogen?', options: ['Coxiella burnetii', 'E. coli', 'Salmonella', 'Staphylococcus aureus'], answer: 'Coxiella burnetii' },
        { q: 'Water activity (aw) required for bacterial growth is typically greater than:', options: ['0.90', '0.70', '0.60', '0.50'], answer: '0.90' }
      ]
    },
    {
      id: 'qb-07',
      subject: 'Zoology & Entomology',
      faculty: 'Faculty of Sciences',
      degree: 'M.Phil / Ph.D.',
      questionCount: '100 MCQs with Keys',
      sampleQuestions: [
        { q: 'The respiratory organ in adult insects is:', options: ['Tracheal system', 'Book lungs', 'Gills', 'Skin'], answer: 'Tracheal system' },
        { q: 'Hemimetabolous metamorphosis includes which stage?', options: ['Nymph', 'Pupa', 'Caterpillar', 'Maggot'], answer: 'Nymph' }
      ]
    },
    {
      id: 'qb-08',
      subject: 'Botany & Plant Physiology',
      faculty: 'Faculty of Sciences',
      degree: 'M.Phil / Ph.D. Botany',
      questionCount: '95 MCQs with Keys',
      sampleQuestions: [
        { q: 'The primary CO2 acceptor in C4 photosynthesis is:', options: ['Phosphoenolpyruvate (PEP)', 'RuBP', 'PGA', 'Malate'], answer: 'Phosphoenolpyruvate (PEP)' },
        { q: 'Which plant hormone is commonly known as the stress hormone?', options: ['Abscisic Acid (ABA)', 'Auxin', 'Gibberellin', 'Cytokinin'], answer: 'Abscisic Acid (ABA)' }
      ]
    }
  ], []);

  // Simple Candidates for Merit List View
  const MERIT_CANDIDATES: MeritCandidate[] = useMemo(() => [
    { sr: 1, rollNo: 'AG-10291', name: 'Muhammad Ahmad', fatherName: 'Tariq Mehmood', program: 'B.Sc. (Hons.) Agriculture', aggregate: '89.45%', status: 'Selected (Morning)' },
    { sr: 2, rollNo: 'CS-40219', name: 'Zainab Fatima', fatherName: 'Abdul Rehman', program: 'BS Computer Science', aggregate: '88.90%', status: 'Selected (Morning)' },
    { sr: 3, rollNo: 'DVM-0012', name: 'Usman Ghani', fatherName: 'Liaqat Ali', program: 'Doctor of Veterinary Medicine (DVM)', aggregate: '91.20%', status: 'Selected (Morning)' },
    { sr: 4, rollNo: 'PH-0045', name: 'Khadija Bibi', fatherName: 'Muhammad Aslam', program: 'Doctor of Pharmacy (Pharm-D)', aggregate: '90.75%', status: 'Selected (Morning)' },
    { sr: 5, rollNo: 'AG-10344', name: 'Hamza Bilal', fatherName: 'Muhammad Bilal', program: 'B.Sc. (Hons.) Agriculture', aggregate: '87.82%', status: 'Selected (Morning)' },
    { sr: 6, rollNo: 'CS-40388', name: 'Ayesha Noor', fatherName: 'Khurram Shahzad', program: 'BS Software Engineering', aggregate: '87.15%', status: 'Selected (Morning)' },
    { sr: 7, rollNo: 'EN-0089', name: 'Saad Farooq', fatherName: 'Farooq Ahmad', program: 'B.Sc. Agricultural Engineering', aggregate: '88.30%', status: 'Selected (Morning)' },
    { sr: 8, rollNo: 'FS-0112', name: 'Maryam Khalid', fatherName: 'Khalid Hussain', program: 'B.Sc. (Hons.) Food Science & Tech', aggregate: '87.90%', status: 'Selected (Morning)' },
    { sr: 9, rollNo: 'BT-20194', name: 'Ali Hassan', fatherName: 'Ghulam Mustafa', program: 'BS Biotechnology', aggregate: '86.70%', status: 'Selected (Morning)' },
    { sr: 10, rollNo: 'BW-5012', name: 'Waleed Akram', fatherName: 'Muhammad Akram', program: 'B.Sc. (Hons.) Agriculture (Burewala)', aggregate: '84.20%', status: 'Selected' }
  ], []);

  const filteredCandidates = useMemo(() => {
    if (!meritSearch.trim()) return MERIT_CANDIDATES;
    const q = meritSearch.toLowerCase();
    return MERIT_CANDIDATES.filter(
      c => c.name.toLowerCase().includes(q) || c.rollNo.toLowerCase().includes(q) || c.program.toLowerCase().includes(q)
    );
  }, [MERIT_CANDIDATES, meritSearch]);

  const filteredQuestionBank = useMemo(() => {
    if (!qbSearch.trim()) return POSTGRAD_QUESTION_BANK;
    const q = qbSearch.toLowerCase();
    return POSTGRAD_QUESTION_BANK.filter(
      item => item.subject.toLowerCase().includes(q) || item.faculty.toLowerCase().includes(q) || item.degree.toLowerCase().includes(q)
    );
  }, [POSTGRAD_QUESTION_BANK, qbSearch]);

  const handleLinkClick = (notice: AdmissionNotice) => {
    if (notice.id === 'adm-01') {
      setShowMeritModal(true);
    } else {
      setSelectedNotice(notice);
    }
  };

  const currentNotices = isPostgraduate ? POSTGRAD_NOTICES : UNDERGRAD_NOTICES;
  const currentDegrees = isPostgraduate ? POSTGRAD_DEGREE_PROGRAMS : UNDERGRAD_DEGREE_PROGRAMS;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-stone-800 font-sans">

      {/* =====================================================
          1. TOP HISTORIC CAMPUS BUILDING HERO BANNER
          User Requests:
          - "top img ku light kru dark shade nai krna" (Bright daylight natural image)
          - "img ky last pr ju rouded colr add nai krna" (No colored/rounded bottom border)
          - "img ki hight thoreesee kam krdu" (Balanced height 210px–240px)
          - "just mid m left to right under graduate likha hu jesy faculty waly pages pr huta tha"
          - "hero img ky upr sy back to home ka option remove krdu sesion b remove kru"
      ====================================================== */}
      <section className="relative w-full overflow-hidden h-[260px] sm:h-[295px] md:h-[325px] lg:h-[345px] flex items-center">
        {/* Background Image: Bright, daylight, historic campus facade */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/uaf_historic_campus.jpg"
            alt="University of Agriculture Faisalabad Historic Campus"
            className="w-full h-full object-cover object-center brightness-105 contrast-100"
          />
          {/* Harmonious light-dark gradient shade for text clarity and bright daylight feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b2d]/60 via-[#071b2d]/38 to-[#071b2d]/15" />
        </div>

        {/* Foreground Content: Clean, in the middle, left to right like faculty pages */}
        <div className="relative z-10 max-w-[1300px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl space-y-2 sm:space-y-2.5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#e8a62a] animate-pulse" />
              <span>DIRECTORATE OF ADMISSIONS • UAF</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.18] font-serif-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              <span>{isPostgraduate ? 'Postgraduate ' : 'Undergraduate '}</span>
              <span className="text-[#e8a62a] italic font-medium">
                {isPostgraduate ? 'Admissions Spring 2025–26' : 'Admissions 2026–2027'}
              </span>
            </h1>

            <p className="text-white/95 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              {isPostgraduate
                ? 'Official admission portal for M.Sc. (Hons.), M.Phil, MS, and Ph.D. degree programs, entry test guidelines, and question bank.'
                : 'Official gateway for undergraduate 4-year and 5-year degree programs, merit selections, and entry test gazettes.'}
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          2. FLOATING PILL BAR
          User Request:
          - "see in postgraduate show the menu on pillo bar that in img"
          - "pillobar ki width small hi krdu according to the text plz do this"
          - (w-fit shrink-to-fit according to text, no artificial min-width)
      ====================================================== */}
      <div className="relative z-40 -mt-5 sm:-mt-6 flex justify-center px-4">
        <div className="inline-flex items-center bg-[#071b2d] text-white rounded-full p-1 sm:p-1.5 shadow-[0_12px_32px_rgba(7,27,45,0.4)] border-2 border-[#c99738]/80 w-fit max-w-full">
          <nav className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-[13px] font-bold">
            
            {/* 1. Overview Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-3.5 sm:px-5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50'
                  : 'text-white hover:bg-[#163887]'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#e8a62a]" />
              <span>Overview</span>
            </button>

            {/* 2. Scheme of Studies / Degree Programs Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('schemes')}
              className={`py-2 px-3.5 sm:px-5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                activeTab === 'schemes'
                  ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50'
                  : 'text-white hover:bg-[#163887]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#e8a62a]" />
              <span>{isPostgraduate ? 'Degree Programs' : 'Scheme of Studies'}</span>
            </button>

            {/* 3. Question Bank Tab (Specifically for Postgraduate as shown in UAF admissions image) */}
            {isPostgraduate && (
              <button
                type="button"
                onClick={() => setActiveTab('question_bank')}
                className={`py-2 px-3.5 sm:px-5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  activeTab === 'question_bank'
                    ? 'bg-[#163887] text-white shadow-md ring-1 ring-blue-400/50'
                    : 'text-white hover:bg-[#163887]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#e8a62a]" />
                <span>Question Bank</span>
              </button>
            )}

          </nav>
        </div>
      </div>

      {/* =====================================================
          3. MAIN CONTENT CONTAINER
          (No sidebar bars, matches screenshots with heading & blue line)
      ====================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-sm text-left space-y-5">
            
            {/* Heading matching Image 1 or Image 2 */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-stone-900 tracking-tight">
                  {isPostgraduate ? 'Postgraduate Admission Spring 2025-26' : 'Undergraduate Admissions 2026-27'}
                </h2>
                
                {/* Subtle Category indicator / quick toggle if user wants to peek */}
                <button
                  type="button"
                  onClick={() => {
                    const next = isPostgraduate ? 'undergraduate' : 'postgraduate';
                    setCurrentCategory(next);
                    setActiveTab('overview');
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-blue-700 font-semibold px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <span>Switch to {isPostgraduate ? 'Undergraduate' : 'Postgraduate'}</span>
                </button>
              </div>

              {/* Solid blue bar line matching screenshots */}
              <div className="w-full h-1 bg-[#163887] mt-2.5 mb-5" />
            </div>

            {/* Links list */}
            <ul className="space-y-3 text-xs sm:text-[14px] leading-relaxed">
              {currentNotices.map((notice) => (
                <li key={notice.id} className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={() => handleLinkClick(notice)}
                    className="text-left text-[#163887] hover:text-blue-700 hover:underline font-medium transition-colors cursor-pointer"
                  >
                    {notice.title}
                  </button>
                </li>
              ))}
            </ul>

          </div>
        )}

        {/* TAB 2: SCHEME OF STUDIES / DEGREE PROGRAMS (Exact numbered list) */}
        {activeTab === 'schemes' && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-sm text-left space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-stone-900 tracking-tight">
                {isPostgraduate ? 'Postgraduate Degree Programs' : 'Undergraduate Degree Programs'}
              </h2>
              {/* Solid blue bar line matching Image 1 */}
              <div className="w-full h-1 bg-[#163887] mt-2.5 mb-5" />
            </div>

            {/* Exact Numbered List from Image 1 */}
            <ol className="space-y-2.5 text-xs sm:text-[14px] leading-relaxed pl-1">
              {currentDegrees.map((degree, idx) => (
                <li key={idx} className="flex items-baseline gap-2">
                  <span className="font-semibold text-stone-700 select-none min-w-[24px]">
                    {idx + 1}.
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedDegree(degree)}
                    className="text-left text-[#163887] hover:text-blue-700 hover:underline font-medium transition-colors cursor-pointer"
                  >
                    {degree}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* TAB 3: QUESTION BANK (Postgraduate Only - Official UAF Helping Material) */}
        {activeTab === 'question_bank' && isPostgraduate && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-sm text-left space-y-5">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-stone-900 tracking-tight">
                    Question Bank for Postgraduate Admission Entry Test
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Official helping material, sample test papers, and MCQ banks for UAF GAT/GRE (Subject) test preparation.
                  </p>
                </div>
                
                {/* Search in Question Bank */}
                <div className="relative w-full sm:w-64 shrink-0">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={qbSearch}
                    onChange={(e) => setQbSearch(e.target.value)}
                    placeholder="Search subject or faculty..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#163887] bg-white"
                  />
                </div>
              </div>

              {/* Solid blue bar line matching Image 1 & 2 */}
              <div className="w-full h-1 bg-[#163887] mt-2.5 mb-5" />
            </div>

            {/* Question Bank Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestionBank.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-stone-200 hover:border-[#163887] bg-stone-50 hover:bg-white transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-black bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {item.faculty}
                      </span>
                      <span className="text-stone-500 font-mono text-[11px]">{item.degree}</span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                      {item.subject}
                    </h4>

                    <p className="text-xs text-stone-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>{item.questionCount}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-stone-200/80">
                    <button
                      type="button"
                      onClick={() => setSelectedQuestionBank(item)}
                      className="flex-1 py-1.5 px-3 bg-[#163887] hover:bg-[#10275e] text-white text-xs font-bold rounded transition-colors cursor-pointer text-center"
                    >
                      View Sample MCQs
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const content = `UNIVERSITY OF AGRICULTURE FAISALABAD\nPostgraduate Admission Test - Question Bank\nSubject: ${item.subject}\nFaculty: ${item.faculty}\nDegree: ${item.degree}\n\nSAMPLE QUESTIONS:\n` +
                          item.sampleQuestions.map((q, i) => `${i + 1}. ${q.q}\n${q.options.map((opt, oi) => `   [${String.fromCharCode(65 + oi)}] ${opt}`).join('\n')}\nCorrect Answer: ${q.answer}\n`).join('\n');
                        const file = new Blob([content], { type: 'text/plain' });
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(file);
                        a.download = `UAF_Postgraduate_QuestionBank_${item.id}.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="py-1.5 px-3 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* =====================================================
          4. QUESTION BANK PREVIEW MODAL
      ====================================================== */}
      {selectedQuestionBank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-300 overflow-hidden max-h-[90vh] flex flex-col text-left">
            <div className="bg-[#071b2d] text-white p-5 flex items-center justify-between border-b-2 border-[#ed9d09]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#ed9d09]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    Postgraduate Question Bank Sample
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {selectedQuestionBank.subject}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuestionBank(null)}
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs flex items-center justify-between">
                <span>Faculty: <strong>{selectedQuestionBank.faculty}</strong></span>
                <span>Degree: <strong>{selectedQuestionBank.degree}</strong></span>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-stone-900 text-sm">Sample Subject MCQs:</h4>
                {selectedQuestionBank.sampleQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                    <p className="font-semibold text-stone-900">
                      Q{qIdx + 1}: {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2 rounded border ${
                            opt === q.answer
                              ? 'bg-blue-50 border-blue-300 text-black font-bold'
                              : 'bg-white border-stone-200 text-stone-700'
                          }`}
                        >
                          <span className="font-mono mr-1.5">[{String.fromCharCode(65 + oIdx)}]</span>
                          <span>{opt}</span>
                          {opt === q.answer && <span className="ml-1 text-black font-bold">✓ (Key)</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">Controller of Examinations, UAF</span>
              <button
                type="button"
                onClick={() => setSelectedQuestionBank(null)}
                className="px-4 py-1.5 bg-[#163887] hover:bg-[#10275e] text-white font-bold text-xs rounded transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          5. DEGREE PROGRAM / SCHEME OF STUDIES DETAIL MODAL
      ====================================================== */}
      {selectedDegree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-300 overflow-hidden max-h-[90vh] flex flex-col text-left">
            <div className="bg-[#071b2d] text-white p-5 flex items-center justify-between border-b-2 border-[#ed9d09]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#ed9d09]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    Scheme of Studies & Syllabus
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {selectedDegree}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDegree(null)}
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs flex items-center justify-between">
                <span>Duration: <strong>{selectedDegree.includes('Ph.D') ? '3-5 Years (Research & Thesis)' : selectedDegree.includes('MS') || selectedDegree.includes('M.Sc') || selectedDegree.includes('M.Phil') ? '2 Years (4 Semesters)' : selectedDegree.includes('Doctor') || selectedDegree.includes('DVM') || selectedDegree.includes('Pharm') ? '5 Years (10 Semesters)' : '4 Years (8 Semesters)'}</strong></span>
                <span>Minimum Credit Hours: <strong>{selectedDegree.includes('Ph.D') ? '18 Coursework + Thesis' : selectedDegree.includes('MS') || selectedDegree.includes('M.Phil') ? '30 Credit Hrs' : '136–168'}</strong></span>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1.5">Curriculum & Course Roadmap</h4>
                <p>
                  Comprehensive academic curriculum designed as per Higher Education Commission (HEC) and respective professional accreditation council (PEC, PVMC, PCP, NAEAC) guidelines.
                </p>
              </div>

              <div className="border border-stone-200 rounded-lg divide-y divide-stone-100 text-xs">
                <div className="p-3 bg-stone-50 font-bold text-[#163887]">Core Semester Modules</div>
                <div className="p-2.5 flex justify-between"><span>Semester 1: Foundation & Advanced Theoretical Courses</span><span className="text-stone-500">12 Credit Hrs</span></div>
                <div className="p-2.5 flex justify-between"><span>Semester 2: Major Discipline Specialization & Seminars</span><span className="text-stone-500">12 Credit Hrs</span></div>
                <div className="p-2.5 flex justify-between"><span>Semester 3 - 4: Research Thesis, Lab Experimentation & Defense</span><span className="text-stone-500">6–12 Credit Hrs</span></div>
              </div>
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">Directorate of Graduate Studies, UAF</span>
              <button
                type="button"
                onClick={() => setSelectedDegree(null)}
                className="px-4 py-1.5 bg-[#163887] hover:bg-[#10275e] text-white font-bold text-xs rounded transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          6. SIMPLE CANDIDATE MERIT LIST MODAL
      ====================================================== */}
      {showMeritModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-300 overflow-hidden max-h-[90vh] flex flex-col text-left">
            <div className="bg-[#071b2d] text-white p-5 flex items-center justify-between border-b-2 border-[#ed9d09]">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                  UNIVERSITY OF AGRICULTURE FAISALABAD
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight mt-0.5">
                  Undergraduate Merit Lists 2026–2027
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMeritModal(false)}
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-600 font-medium">
                Last date to deposit dues: <strong>14-08-2026</strong>
              </span>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={meritSearch}
                  onChange={(e) => setMeritSearch(e.target.value)}
                  placeholder="Search name, roll no, degree..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#163887] bg-white"
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#163887] text-white font-bold">
                  <tr>
                    <th className="p-2.5">Sr.</th>
                    <th className="p-2.5">Roll No.</th>
                    <th className="p-2.5">Candidate Name</th>
                    <th className="p-2.5">Father Name</th>
                    <th className="p-2.5">Program</th>
                    <th className="p-2.5 text-right">Aggregate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCandidates.map((c) => (
                    <tr key={c.sr} className="hover:bg-stone-50">
                      <td className="p-2.5 font-semibold text-stone-500">{c.sr}</td>
                      <td className="p-2.5 font-mono font-bold text-[#163887]">{c.rollNo}</td>
                      <td className="p-2.5 font-bold text-stone-900">{c.name}</td>
                      <td className="p-2.5 text-stone-600">{c.fatherName}</td>
                      <td className="p-2.5 text-stone-800">{c.program}</td>
                      <td className="p-2.5 font-bold text-black text-right">{c.aggregate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print List</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = `UAF UNDERGRADUATE MERIT LIST 2026-2027\n\n` +
                      filteredCandidates.map(c => `${c.sr}. [${c.rollNo}] ${c.name} s/d/o ${c.fatherName} - ${c.program} - ${c.aggregate}`).join('\n');
                    const file = new Blob([text], { type: 'text/plain' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(file);
                    a.download = 'UAF_Merit_List_2026.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="px-4 py-1.5 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowMeritModal(false)}
                  className="px-4 py-1.5 bg-[#163887] hover:bg-[#10275e] text-white font-bold text-xs rounded transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          7. GENERAL NOTICE DETAIL MODAL
      ====================================================== */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-300 overflow-hidden max-h-[90vh] flex flex-col text-left">
            <div className="bg-[#071b2d] text-white p-5 flex items-center justify-between border-b-2 border-[#ed9d09]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#ed9d09]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    UAF Official Notification
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {selectedNotice.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-left text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="flex items-center gap-3 pb-2 border-b border-stone-200 text-xs">
                <span className={`px-2 py-0.5 rounded text-white font-bold text-[11px] ${selectedNotice.badgeColor || 'bg-stone-700'}`}>
                  {selectedNotice.badge}
                </span>
                <span className="text-stone-500">{selectedNotice.date}</span>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">Official Summary & Guidelines</h4>
                <p>{selectedNotice.details}</p>
              </div>

              {selectedNotice.subItems && selectedNotice.subItems.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Constituent Schedules / Items
                  </h4>
                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                    {selectedNotice.subItems.map((sub, sIdx) => (
                      <div key={sIdx} className="p-2.5 bg-stone-50 flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-800">{sub.name}</span>
                        <span className="text-black font-bold">{sub.date || sub.quota || 'Active'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded transition-colors cursor-pointer"
              >
                Merit Calculator
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = `UAF OFFICIAL NOTICE\n${selectedNotice.title}\nDate: ${selectedNotice.date}\n\n${selectedNotice.details}`;
                    const file = new Blob([text], { type: 'text/plain' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(file);
                    a.download = selectedNotice.downloadFilename || 'UAF_Notice.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="px-4 py-1.5 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-1.5 bg-[#163887] hover:bg-[#10275e] text-white font-bold text-xs rounded transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
