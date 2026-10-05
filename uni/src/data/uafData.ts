import {
  Faculty,
  AcademicProgram,
  Notice,
  CampusEvent,
  StudentResource,
  CampusLandmark
} from '../types';

export const FACULTIES: Faculty[] = [
  {
    id: 'fac-agri',
    name: 'Faculty of Agriculture',
    shortCode: 'FOA',
    establishedYear: 1906,
    departmentsCount: 9,
    deanName: 'Prof. Dr. Muhammad Sarwar (Tamgha-e-Imtiaz)',
    description:
      'The foundational faculty of UAF pioneering research in high-yield agronomy, plant breeding & genetics, soil sciences, entomology, and horticulture.',
    iconName: 'Sprout',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-vet',
    name: 'Faculty of Veterinary Science',
    shortCode: 'FVS',
    establishedYear: 1962,
    departmentsCount: 7,
    deanName: 'Prof. Dr. Farzana Rizvi',
    description:
      'Home to the Doctor of Veterinary Medicine (DVM) program with 24/7 outdoor clinical hospital, clinical pathology, animal surgery, and epidemiology labs.',
    iconName: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-sci',
    name: 'Faculty of Sciences',
    shortCode: 'FOS',
    establishedYear: 1964,
    departmentsCount: 8,
    deanName: 'Prof. Dr. Asghar Ali',
    description:
      'Comprising Computer Science, Software Engineering, Biotechnology, Biochemistry, Physics, Chemistry, Mathematics, and Statistics.',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-husbandry',
    name: 'Faculty of Animal Husbandry',
    shortCode: 'FAH',
    establishedYear: 1961,
    departmentsCount: 5,
    deanName: 'Prof. Dr. Muhammad Riaz',
    description:
      'Advancing livestock production, dairy technology, poultry science, animal nutrition, and sustainable breeding for smallholder empowerment.',
    iconName: 'Trees',
    image: '/uaf_aerial_quadrangle.jpg'
  },
  {
    id: 'fac-engg',
    name: 'Faculty of Agriculture Engineering and Technology',
    shortCode: 'FAET',
    establishedYear: 1961,
    departmentsCount: 5,
    deanName: 'Prof. Dr. Muhammad Arshad',
    description:
      'PEC-accredited programs in Farm Machinery, Smart Solar Irrigation Systems, Food Engineering, Energy Systems, and Environmental Engineering.',
    iconName: 'Settings',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-social',
    name: 'Faculty of Social Sciences',
    shortCode: 'FSS',
    establishedYear: 1963,
    departmentsCount: 6,
    deanName: 'Prof. Dr. Khalid Mushtaq',
    description:
      'Leading policy insights in Agricultural Economics, Rural Sociology, Agricultural Extension, Agribusiness Management, and Developmental Studies.',
    iconName: 'Users',
    image: '/uaf_main_gate_sunset.jpg'
  },
  {
    id: 'fac-food',
    name: 'Faculty of Food, Nutrition and Home Sciences',
    shortCode: 'FFNHS',
    establishedYear: 2012,
    departmentsCount: 4,
    deanName: 'Prof. Dr. Masood Sadiq Butt',
    description:
      'Pioneering clinical human nutrition, dietetics, industrial food processing, food safety management, and community health biofortification.',
    iconName: 'Apple',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-arts',
    name: 'Faculty of Arts and Humanities',
    shortCode: 'FAH-Arts',
    establishedYear: 2021,
    departmentsCount: 4,
    deanName: 'Prof. Dr. Shaheen Akhtar',
    description:
      'Dedicated to English Linguistics, Islamic Studies, Pakistan Studies, and Media Communication.',
    iconName: 'Book',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-health',
    name: 'Faculty of Health and Pharmaceutical Sciences',
    shortCode: 'FHPS',
    establishedYear: 2022,
    departmentsCount: 3,
    deanName: 'Prof. Dr. Bilal Aslam',
    description:
      'Providing high-caliber clinical training in Doctor of Pharmacy (Pharm.D), Physical Therapy (DPT), and Medical Laboratory Technology (MLT).',
    iconName: 'Pill',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  }
];

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'prog-bsc-agri',
    title: 'B.Sc. (Hons.) Agriculture',
    degreeLevel: 'Undergraduate',
    facultyId: 'fac-agri',
    facultyName: 'Faculty of Agriculture',
    department: 'Agronomy / Plant Breeding / Soil Science / Horticulture',
    duration: '4 Years (8 Semesters)',
    creditHours: 136,
    semesterFeePKR: 44500,
    seats: 950,
    shift: 'Both',
    eligibility: 'Minimum 50% marks in F.Sc. Pre-Medical / Pre-Engineering or Intermediate (Pre-Agriculture) + UAF Entry Test',
    overview: 'Pakistan’s top degree program producing agricultural scientists, research officers, and agribusiness managers.',
    careerProspects: ['Agriculture Officer (BS-17)', 'Research Scientist (NARC/PARC)', 'Seed & Fertilizer Technical Specialist', 'Agritech Entrepreneur'],
    tags: ['Agriculture', 'Agronomy', 'Breeding', 'Soil Science', 'Horticulture'],
    closingMerit2025: 68.2
  },
  {
    id: 'prog-dvm',
    title: 'Doctor of Veterinary Medicine (DVM)',
    degreeLevel: 'Undergraduate',
    facultyId: 'fac-vet',
    facultyName: 'Faculty of Veterinary Science',
    department: 'Clinical Medicine & Surgery / Pathology / Microbiology',
    duration: '5 Years (10 Semesters)',
    creditHours: 178,
    semesterFeePKR: 54000,
    seats: 320,
    shift: 'Morning',
    eligibility: 'Minimum 60% marks in F.Sc. Pre-Medical + UAF Entry Test clearance',
    overview: 'Flagship PVMC-accredited clinical veterinary medicine program with round-the-clock teaching hospital rotations.',
    careerProspects: ['Veterinary Officer (BS-17)', 'Companion Animal Surgeon', 'Livestock Farm Consultant', 'Pharmaceutical Regulatory Officer'],
    tags: ['DVM', 'Veterinary', 'Clinical Medicine', 'Animal Surgery'],
    closingMerit2025: 84.5
  },
  {
    id: 'prog-bs-cs',
    title: 'BS Computer Science',
    degreeLevel: 'Undergraduate',
    facultyId: 'fac-sci',
    facultyName: 'Faculty of Sciences',
    department: 'Department of Computer Science',
    duration: '4 Years (8 Semesters)',
    creditHours: 134,
    semesterFeePKR: 51000,
    seats: 250,
    shift: 'Both',
    eligibility: 'Minimum 50% marks in Intermediate (F.Sc Pre-Eng, ICS, Pre-Medical with additional Math) + Entry Test',
    overview: 'NCEAC accredited software curriculum featuring Artificial Intelligence, Agri-IoT, Data Science, and Cloud Engineering.',
    careerProspects: ['Full-Stack Software Engineer', 'AI / ML Specialist', 'Data Analyst', 'Agri-Tech Solutions Architect'],
    tags: ['Computer Science', 'Software', 'AI', 'Data Science'],
    closingMerit2025: 78.4
  },
  {
    id: 'prog-bs-biotech',
    title: 'BS Biotechnology',
    degreeLevel: 'Undergraduate',
    facultyId: 'fac-sci',
    facultyName: 'Faculty of Sciences',
    department: 'Centre of Agricultural Biochemistry & Biotechnology (CABB)',
    duration: '4 Years (8 Semesters)',
    creditHours: 132,
    semesterFeePKR: 47500,
    seats: 120,
    shift: 'Morning',
    eligibility: 'Minimum 50% marks in F.Sc. Pre-Medical + UAF Entry Test',
    overview: 'Focuses on CRISPR gene editing, tissue culture, molecular diagnostics, vaccine bio-processing, and transgenics.',
    careerProspects: ['Biotech Research Scientist', 'Genomics Analyst', 'Pharmaceutical Quality Manager', 'Forensic Analyst'],
    tags: ['Biotechnology', 'Genomics', 'CABB', 'Molecular Biology'],
    closingMerit2025: 74.8
  },
  {
    id: 'prog-bsc-agri-engg',
    title: 'B.Sc. Agricultural Engineering',
    degreeLevel: 'Undergraduate',
    facultyId: 'fac-engg',
    facultyName: 'Faculty of Agriculture Engineering and Technology',
    department: 'Farm Machinery and Power / Irrigation & Drainage',
    duration: '4 Years (8 Semesters)',
    creditHours: 140,
    semesterFeePKR: 52000,
    seats: 110,
    shift: 'Morning',
    eligibility: 'Minimum 60% in F.Sc. Pre-Engineering + ECAT / UAF Engineering Entry Test (PEC Accredited)',
    overview: 'Covers tractor automation, precision laser land leveling, solar micro-irrigation, and post-harvest technology.',
    careerProspects: ['Agricultural Engineer (BS-17)', 'Irrigation Systems Designer', 'Farm Mechanization Officer', 'Renewable Energy Specialist'],
    tags: ['Engineering', 'PEC', 'Irrigation', 'Machinery'],
    closingMerit2025: 71.0
  },
  {
    id: 'prog-bs-food-tech',
    title: 'BS (Hons.) Food Science and Technology',
    degreeLevel: 'Undergraduate',
    facultyId: 'fac-food',
    facultyName: 'Faculty of Food, Nutrition and Home Sciences',
    department: 'National Institute of Food Science & Technology (NIFSAT)',
    duration: '4 Years (8 Semesters)',
    creditHours: 138,
    semesterFeePKR: 49500,
    seats: 180,
    shift: 'Both',
    eligibility: 'Minimum 50% in F.Sc. Pre-Medical / Pre-Engineering + UAF Entry Test',
    overview: 'Comprehensive training in industrial food preservation, HACCP audits, dairy processing, and food safety standards.',
    careerProspects: ['Food Quality Assurance Executive', 'Product Formulation Scientist', 'Punjab Food Authority Inspector', 'FMCG Plant Manager'],
    tags: ['Food Technology', 'Nutrition', 'NIFSAT', 'Food Safety'],
    closingMerit2025: 73.2
  },
  {
    id: 'prog-bba-agri',
    title: 'BBA (Hons.) Agribusiness',
    degreeLevel: 'Undergraduate',
    facultyId: 'fac-social',
    facultyName: 'Faculty of Social Sciences',
    department: 'Institute of Business Management Sciences (IBMS)',
    duration: '4 Years (8 Semesters)',
    creditHours: 130,
    semesterFeePKR: 48000,
    seats: 120,
    shift: 'Both',
    eligibility: 'Minimum 45% in Intermediate (FA, F.Sc, I.Com, ICS) + UAF Entry Test',
    overview: 'Combines corporate financial management, marketing, supply chain, and agricultural export economics.',
    careerProspects: ['Agribusiness Manager', 'Supply Chain Analyst', 'Commercial Banking Agri-Loan Officer', 'Export Executive'],
    tags: ['BBA', 'Agribusiness', 'IBMS', 'Management'],
    closingMerit2025: 64.5
  },
  {
    id: 'prog-msc-agri-agro',
    title: 'M.Sc. (Hons.) Agronomy',
    degreeLevel: 'Postgraduate',
    facultyId: 'fac-agri',
    facultyName: 'Faculty of Agriculture',
    department: 'Department of Agronomy',
    duration: '2 Years (4 Semesters)',
    creditHours: 36,
    semesterFeePKR: 38000,
    seats: 80,
    shift: 'Morning',
    eligibility: 'B.Sc. (Hons.) Agriculture with minimum CGPA 2.50/4.00 + UAF Graduate Test',
    overview: 'Advanced research in weed ecology, crop water modeling, precision agro-techniques, and stress physiology.',
    careerProspects: ['Senior Agronomist', 'HEC University Lecturer', 'Agricultural Research Officer', 'International NGO Advisor'],
    tags: ['Agronomy', 'Master', 'Research', 'Postgraduate']
  },
  {
    id: 'prog-phd-biotech',
    title: 'Ph.D. Biotechnology',
    degreeLevel: 'PhD',
    facultyId: 'fac-sci',
    facultyName: 'Faculty of Sciences',
    department: 'Centre of Agricultural Biochemistry & Biotechnology (CABB)',
    duration: '3 - 5 Years',
    creditHours: 48,
    semesterFeePKR: 42000,
    seats: 30,
    shift: 'Morning',
    eligibility: 'M.Phil / M.Sc. (Hons.) with minimum CGPA 3.00/4.00 + Subject GRE / GAT Subject 60%',
    overview: 'Doctoral research covering genetic transformation, synthetic biology, and bioprocess optimization.',
    careerProspects: ['Principal Scientific Officer', 'Tenured Professor', 'Post-Doctoral Fellow', 'Chief Scientist'],
    tags: ['PhD', 'Biotechnology', 'Doctorate', 'CABB']
  }
];

export const OFFICIAL_NOTICES: Notice[] = [
  {
    id: 'not-ug-test2',
    title: 'Undergraduate Result of Second Entry Test held on 02-08-2026 Announced',
    referenceNumber: 'UAF/Admn/2026/902',
    category: 'Admissions',
    date: '09-Aug-2026',
    summary: 'The Directorate of Admissions has released the official result sheet for the 2nd Entry Test. Candidates can enter their Roll Number to download result cards.',
    targetAudience: 'Undergraduate Applicants 2026-27',
    isUrgent: true,
    isNew: true,
    fileSize: '1.4 MB',
    attachmentName: 'Undergraduate_Test_2_Gazette_2026.pdf'
  },
  {
    id: 'not-hafiz-sched',
    title: 'Schedule of Hafiz-e-Quran Test / Oral Evaluation for Fall Admissions 2026-27',
    referenceNumber: 'UAF/DSA/2026/411',
    category: 'Admissions',
    date: '07-Aug-2026',
    summary: 'Hafiz-e-Quran candidates claiming 20 extra marks are notified to appear before the scrutiny committee on 12-08-2026 at 08:00 AM at the Directorate of Student Affairs.',
    targetAudience: 'Hafiz-e-Quran Candidates',
    isUrgent: true,
    isNew: true,
    fileSize: '820 KB',
    attachmentName: 'Hafiz_e_Quran_Schedule_Fall2026.pdf'
  },
  {
    id: 'not-sports-interviews',
    title: 'Interview / Trials Schedule for Co-Curricular & Sports Quota Admissions 2026-27',
    referenceNumber: 'UAF/Sports/2026/184',
    category: 'Admissions',
    date: '07-Aug-2026',
    summary: 'Physical trials and certificate verification for candidates applying on Sports / Extra-Curricular seats will commence on 14-08-2026 at UAF Sports Complex.',
    targetAudience: 'Sports Quota Applicants',
    isUrgent: false,
    isNew: false,
    fileSize: '650 KB',
    attachmentName: 'Sports_Quota_Interview_Schedule.pdf'
  },
  {
    id: 'not-peef-scholarships',
    title: 'Punjab Educational Endowment Fund (PEEF) Master Level Scholarship Slots 2026',
    referenceNumber: 'UAF/DFA/2026/755',
    category: 'Scholarships',
    date: '04-Aug-2026',
    summary: 'Applications are invited from brilliant and deserving students of M.Sc. / MS / M.Phil programs for PEEF full tuition waivers and monthly stipends.',
    targetAudience: 'Postgraduate Scholars',
    isUrgent: false,
    isNew: true,
    fileSize: '1.1 MB',
    attachmentName: 'PEEF_Scholarship_Notice_2026.pdf'
  },
  {
    id: 'not-hostel-allotment',
    title: 'Hostel Accommodation Allotment Circular for Newly Admitted Freshmen 2026',
    referenceNumber: 'UAF/HW/2026/309',
    category: 'General',
    date: '01-Aug-2026',
    summary: 'The Hall Warden Office has opened the online portal for male and female hostel room requests. Freshmen can submit application along with admission fee receipt.',
    targetAudience: 'Fresh Students (Male & Female)',
    isUrgent: false,
    isNew: false,
    fileSize: '950 KB',
    attachmentName: 'Hostel_Room_Allotment_Guide.pdf'
  },
  {
    id: 'not-tender-drone',
    title: 'Tender Notice: Procurement of High-Precision Agricultural Drone Spraying Systems',
    referenceNumber: 'UAF/P&D/T-14/2026',
    category: 'Tenders',
    date: '28-Jul-2026',
    summary: 'Sealed bids are invited under PPRA rules from authorized equipment vendors for precision agriculture research labs under HEC project funding.',
    targetAudience: 'Suppliers & Vendors',
    isUrgent: false,
    isNew: false,
    fileSize: '2.1 MB',
    attachmentName: 'Drone_Procurement_Bidding_Docs.pdf'
  }
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'evt-kissan-mela',
    title: 'Annual Kissan Mela & National Agri-Expo 2026',
    date: '18 - 20 Oct 2026',
    time: '09:00 AM - 06:00 PM PST',
    venue: 'Exhibition Grounds & Clock Tower Lawns, UAF Main Campus',
    category: 'Expo & Farmers Gathering',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: 'Pakistan’s largest agricultural festival uniting 100,000+ farmers, seed breeders, livestock judges, machinery manufacturers, and policymakers.',
    details: 'Features high-milk yield buffalo competitions, exotic horse tent-pegging, drone flight demonstrations, hybrid seed stalls, and direct farmer-scientist interactive clinics.',
    registrationOpen: true,
    entryFee: 'Free for All Farmers, Students & General Public',
    targetAudience: 'Farmers, Agronomists, Agri-Industry, Livestock Breeders & Students',
    coordinatorName: 'Prof. Dr. Muhammad Naveed (Director Student Affairs & Farm Directorate)',
    coordinatorContact: '+92 41 9200161 Ext. 3102 | kissanmela@uaf.edu.pk',
    fullOverview: 'The Annual Kissan Mela at the University of Agriculture Faisalabad is the premier agricultural celebration in South Asia, honoring the hard work of Pakistani farmers while introducing cutting-edge agricultural technologies. Over three action-packed days, the historic campus transforms into a vibrant hub of agricultural innovation, livestock beauty pageants, industrial machinery showcases, seed testing pavilions, and traditional folk festivities. Farmers from Sindh, Punjab, Balochistan, and Khyber Pakhtunkhwa converge to receive on-the-spot soil and water testing, consult leading entomologists, and witness live drone and autonomous tractor demonstrations designed to combat climate change challenges.',
    highlights: [
      'Over 250 commercial agri-tech and seed enterprise display stalls',
      'National Champion Sahiwal Cow & Nili-Ravi Buffalo Livestock Competition with cash awards',
      'Live Agricultural Drone Spraying & Variable Rate Fertilizer Tech arena',
      'Free mobile Soil & Water Testing labs by Department of Soil Science',
      'Traditional Horse Tent-Pegging (Nezabazi) tournament on the main sports ground',
      'Farmer-Scientist direct advisory sessions with simultaneous Urdu & Punjabi translation'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80'
    ],
    schedule: [
      {
        time: 'Day 1: 09:00 AM',
        activity: 'Grand Inauguration Ceremony & Chief Guest Welcome Address',
        speakerOrLead: 'Federal Minister for National Food Security & Research',
        location: 'Senate Hall Auditorium'
      },
      {
        time: 'Day 1: 11:30 AM',
        activity: 'Inauguration of Agri-Tech Pavilion & Heavy Machinery Display',
        speakerOrLead: 'Vice Chancellor Prof. Dr. Zulfiqar Ali',
        location: 'Exhibition Ground Main Stage'
      },
      {
        time: 'Day 1: 02:30 PM',
        activity: 'Live Drone Precision Spraying & Farm Robotics Demonstration',
        speakerOrLead: 'Faculty of Agricultural Engineering & Tech',
        location: 'Agronomy Research Farm No. 9'
      },
      {
        time: 'Day 2: 10:00 AM',
        activity: 'Purebred Sahiwal & Nili-Ravi Livestock Milk & Beauty Judging',
        speakerOrLead: 'Faculty of Animal Husbandry Panel of Judges',
        location: 'Livestock Demonstration Arena'
      },
      {
        time: 'Day 2: 02:00 PM',
        activity: 'National Horse Tent-Pegging (Nezabazi) Championship',
        speakerOrLead: 'UAF Equestrian Club & Punjab Tent-Pegging Federation',
        location: 'Main University Stadium'
      },
      {
        time: 'Day 3: 03:00 PM',
        activity: 'Closing Ceremony, Cash Awards for Progressive Farmers & Trophy Distribution',
        speakerOrLead: 'Provincial Minister for Agriculture, Punjab',
        location: 'Clock Tower Main Stage'
      }
    ],
    speakers: [
      {
        name: 'Prof. Dr. Zulfiqar Ali',
        designation: 'Vice Chancellor & Chief Patron',
        organization: 'University of Agriculture Faisalabad',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Dr. Tariq Mahmood',
        designation: 'Director General Agri-Extension',
        organization: 'Government of the Punjab',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Prof. Dr. Farooq Ahmad',
        designation: 'Dean, Faculty of Animal Husbandry',
        organization: 'UAF Livestock Science Institute',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'evt-indep-day',
    title: 'Independence Day Commemoration & Flag Hoisting Ceremony',
    date: '14 Aug 2026',
    time: '08:30 AM - 01:00 PM PST',
    venue: 'Senate Hall Lawns & Clock Tower, UAF Main Campus',
    category: 'National Event',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: 'The University of Agriculture Faisalabad celebrates the 78th Independence Day with ceremonial parade, faculty address, and tree plantation.',
    details: 'Led by Vice Chancellor Prof. Dr. Zulfiqar Ali. Awards for best green research initiative will be distributed.',
    registrationOpen: false,
    entryFee: 'Open to All Students, Faculty, Families & Alumni',
    targetAudience: 'University Community, Alumni & Faisalabad Citizens',
    coordinatorName: 'Senior Proctor Office & Registrar Secretariat',
    coordinatorContact: '+92 41 9200161 Ext. 2101 | registrar@uaf.edu.pk',
    fullOverview: 'Independence Day at UAF is a grand time-honored tradition that pays homage to the visionary founding fathers who recognized agriculture as the economic backbone of Pakistan. The morning begins with national anthems ringing across the heritage Clock Tower Lawns, followed by the guard of honor presented by university scouts and cadets. Following the solemn flag hoisting ceremony, the university launches its seasonal "Clean & Green Pakistan" monsoon tree plantation drive, planting thousands of saplings across campus grounds and student residential colleges.',
    highlights: [
      'Ceremonial Flag Hoisting with UAF Cadet Corps Guard of Honour',
      'Historic 1906 Clock Tower illumination and floral decorations',
      'Monsoon Tree Plantation Drive: 10,000 indigenous saplings distribution',
      'National songs and debate competition by UAF Debating & Literary Society',
      'Vice Chancellor Excellence Medals for Outstanding Researchers & Staff',
      'Traditional sweets and breakfast reception at University Social Center'
    ],
    galleryImages: [
      '/uaf_main_building_renewed.jpg',
      '/uaf_main_gate_sunset.jpg',
      '/uaf_aerial_quadrangle.jpg',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
    ],
    schedule: [
      {
        time: '08:30 AM',
        activity: 'Assembly of Faculty, Staff, Students & Dignitaries',
        speakerOrLead: 'Directorate of Student Affairs',
        location: 'Senate Hall Lawn'
      },
      {
        time: '09:00 AM',
        activity: 'Official National Flag Hoisting Ceremony & Guard of Honour',
        speakerOrLead: 'Vice Chancellor & Senior Proctor',
        location: 'Clock Tower Lawn Flag Post'
      },
      {
        time: '09:45 AM',
        activity: 'Keynote Address on "Agricultural Sovereignty & Nation Building"',
        speakerOrLead: 'Prof. Dr. Zulfiqar Ali',
        location: 'Senate Hall Main Auditorium'
      },
      {
        time: '11:00 AM',
        activity: 'Commencement of 10,000 Trees Monsoon Plantation Campaign',
        speakerOrLead: 'Forestry & Range Management Department',
        location: 'Botanical Garden Perimeter'
      },
      {
        time: '12:15 PM',
        activity: 'Awarding VC Merit Badges & Special Independence Reception',
        speakerOrLead: 'Registrar & Deans Council',
        location: 'Executive Dining Hall'
      }
    ],
    speakers: [
      {
        name: 'Prof. Dr. Zulfiqar Ali',
        designation: 'Vice Chancellor',
        organization: 'University of Agriculture Faisalabad',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Dr. Shahbaz Ahmad',
        designation: 'Senior Proctor & Dean',
        organization: 'UAF Proctorial Board',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'evt-climate-summit',
    title: 'International Conference on Climate-Resilient Agriculture (ICCRA)',
    date: '12 - 14 Nov 2026',
    time: '09:30 AM - 05:00 PM PST',
    venue: 'Center for Advanced Studies in Agriculture (CAS-AFS), UAF',
    category: 'International Scientific Summit',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    description: 'Global researchers from FAO, CIMMYT, USDA, and ICARDA discussing Indus Basin water telemetry and drought-tolerant cereal genetics.',
    details: 'Keynote speakers from Australia, USA, Netherlands, and China. Peer-reviewed papers will be published in Scopus-indexed conference proceedings.',
    registrationOpen: true,
    entryFee: 'PKR 3,000 for Scholars / Complimentary for Keynote Delegates',
    targetAudience: 'Postgraduate Scholars, Scientists, Environmentalists & Water Policy Planners',
    coordinatorName: 'Prof. Dr. Sultan Habib (Director CAS-AFS)',
    coordinatorContact: '+92 41 9200161 Ext. 4050 | iccra2026@uaf.edu.pk',
    fullOverview: 'The International Conference on Climate-Resilient Agriculture (ICCRA 2026) convenes leading international scientists, climate modelers, soil conservationists, and government policymakers to tackle the existential challenges facing food production systems in developing nations. Hosted at the state-of-the-art US-Pakistan Center for Advanced Studies in Agriculture (CAS-AFS), this 3-day symposium features peer-reviewed research presentations, technical breakout workshops on gene-editing for salinity tolerance, and cross-border research declarations for the sustainable stewardship of the Indus River basin.',
    highlights: [
      'Over 140 scientific research papers selected for Scopus-indexed conference special issue',
      'Plenary keynote addresses by delegates from FAO Rome, CIMMYT Mexico, and Wageningen University',
      'Launch of Indus Basin Real-time Soil Moisture & Satellite Telemetry Dashboard',
      'Special Graduate Young Researcher Poster Showcase with travel grants for top 10 presenters',
      'Policy Roundtable: Formulating the National Climate Adaptation Agricultural Charter 2026-2035'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    schedule: [
      {
        time: 'Day 1: 09:30 AM',
        activity: 'Inaugural Plenary Session: Planetary Climate Shocks & Food Security',
        speakerOrLead: 'Dr. Elena Rostova (FAO Senior Climate Advisor)',
        location: 'CAS-AFS Main Auditorium'
      },
      {
        time: 'Day 1: 02:00 PM',
        activity: 'Technical Session A: Molecular Breeding for Extreme Heat & Drought',
        speakerOrLead: 'Dr. Kevin Zhao (International Rice Research Institute)',
        location: 'Auditorium Hall 2'
      },
      {
        time: 'Day 2: 10:00 AM',
        activity: 'Technical Session B: Precision Water Telemetry & Canal Automation',
        speakerOrLead: 'Prof. Dr. Irfan Arshad (Dean Agri-Engineering)',
        location: 'Smart Water Lab Seminar Room'
      },
      {
        time: 'Day 2: 02:30 PM',
        activity: 'Young Researchers Poster Presentation & Innovation Pitching',
        speakerOrLead: 'ORIC Research Evaluation Committee',
        location: 'Exhibition Atrium'
      },
      {
        time: 'Day 3: 11:00 AM',
        activity: 'Adoption of "Faisalabad Declaration on Climate-Smart Agriculture"',
        speakerOrLead: 'Joint International Steering Committee',
        location: 'Main Conference Hall'
      }
    ],
    speakers: [
      {
        name: 'Dr. Elena Rostova',
        designation: 'Senior Climate Resilience Advisor',
        organization: 'Food and Agriculture Organization (FAO), Rome',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Prof. Dr. Hans Van Der Berg',
        designation: 'Chair of Agro-Ecology',
        organization: 'Wageningen University, Netherlands',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Dr. Kevin Zhao',
        designation: 'Principal Geneticist',
        organization: 'International Rice Research Institute (IRRI)',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'evt-flower-show',
    title: 'UAF Spring Chrysanthemum & Autumn Flora Exhibition',
    date: '02 - 05 Dec 2026',
    time: '10:00 AM - 08:00 PM PST',
    venue: 'Botanical Gardens & Institute of Horticultural Sciences, UAF',
    category: 'Horticulture Showcase',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    description: 'Over 120 varieties of blooming flowers, bonsai exhibits, landscaping competitions, and eco-friendly nursery stalls.',
    details: 'Open for families, school excursions, and flower enthusiasts. Awards given for commercial and residential floral displays.',
    registrationOpen: true,
    entryFee: 'Free Family Entry / Nominal Entry for Competition Exhibits',
    targetAudience: 'Families, Florists, Landscape Architects, Botanists & Nature Lovers',
    coordinatorName: 'Prof. Dr. Atif Riaz (Director Institute of Horticultural Sciences)',
    coordinatorContact: '+92 41 9200161 Ext. 2930 | horticulture@uaf.edu.pk',
    fullOverview: 'The Annual Chrysanthemum (Gul-e-Dawoodi) and Flora Exhibition is Faisalabad’s most colorful autumn tradition, welcoming tens of thousands of visitors to the sprawling botanical gardens of UAF. Cultivated painstakingly by horticulturists, students, and master gardeners over several months, the exhibition features rare cultivars with giant blooms, cascading floral cascades, miniature Japanese bonsai specimens, and modern rooftop garden landscaping setups. City institutions, private nurseries, schools, and amateur gardeners compete in 35 different floral categories for coveted university trophies.',
    highlights: [
      'Exhibition of 120+ rare and indigenous Chrysanthemum (Gul-e-Dawoodi) cultivars',
      'Japanese Bonsai master art display with specimens over 40 years old',
      'Landscape architecture models & climate-friendly urban terrace gardening setups',
      'Fresh floral arrangement competitions for college and university student societies',
      'Eco-friendly nursery stalls offering certified disease-free seedlings and organic potting soil',
      'Evening illuminated fairy-light walking path across the botanical garden rose beds'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586521995568-39abaa0c2311?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80'
    ],
    schedule: [
      {
        time: 'Day 1: 10:00 AM',
        activity: 'Inaugural Ribbon Cutting & Botanical Garden Tour',
        speakerOrLead: 'Vice Chancellor & Patron UAF Horticultural Society',
        location: 'Botanical Garden Main Pavilion'
      },
      {
        time: 'Day 1: 03:00 PM',
        activity: 'Floral Artistry & Flower Arrangement Contest',
        speakerOrLead: 'Jury Panel of Master Florists',
        location: 'Floriculture Glasshouse'
      },
      {
        time: 'Day 2: 11:00 AM',
        activity: 'Workshop: "Growing Organic Bonsai & Urban Herb Gardens"',
        speakerOrLead: 'Dr. Atif Riaz & Expert Nurserymen',
        location: 'Horticulture Seminar Hall'
      },
      {
        time: 'Day 3: 02:00 PM',
        activity: 'School & College Nature Drawing & Photography Contest',
        speakerOrLead: 'UAF Art Club & Student Affairs',
        location: 'Central Lawn Pergola'
      },
      {
        time: 'Day 4: 04:30 PM',
        activity: 'Grand Awards Gala & Trophy Distribution for Best Blooms',
        speakerOrLead: 'Chief Secretary Punjab & Vice Chancellor',
        location: 'Botanical Amphitheatre'
      }
    ],
    speakers: [
      {
        name: 'Prof. Dr. Atif Riaz',
        designation: 'Director Institute of Horticultural Sciences',
        organization: 'UAF Horticulture Institute',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Dr. Iftikhar Ahmad',
        designation: 'Associate Professor of Floriculture',
        organization: 'Pakistan Horticultural Society',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const STUDENT_RESOURCES: StudentResource[] = [
  {
    id: 'res-lms',
    title: 'AgriLearn LMS & Digital Library',
    category: 'Academic & LMS',
    description: 'Access lecture notes, submit assignments, view recorded lectures, and consult 400,000+ online research journals via HEC PERN.',
    iconName: 'Laptop',
    features: ['Single-Sign-On with Roll No', 'HEC National Digital Library access', 'Turnitin Plagiarism Check', 'Moodle mobile companion'],
    location: 'IT Center / Online 24/7',
    helpline: '+92 41 9200161 (Ext 2204)',
    timing: '24/7 Portal Access',
    quickActionTitle: 'Launch LMS Portal',
    urlPlaceholder: 'lms.uaf.edu.pk'
  },
  {
    id: 'res-hostels',
    title: 'Hall Warden Office (22 Resident Hostels)',
    category: 'Hostels & Living',
    description: 'On-campus boarding for over 18,000 male and female students with subsidized mess, fiber optic internet, and round-the-clock security.',
    iconName: 'Home',
    features: ['Sir Syed Hall, Fatima Hall, Qasim Hall, Ayesha Hall', 'CCTV monitored perimeters', 'Gymnasium and common rooms', 'Pure RO water filtration plants'],
    location: 'Near University Mosque, Main Campus',
    helpline: '+92 41 9200161 (Ext 2401)',
    timing: 'Mon - Fri (08:00 AM - 04:00 PM)',
    quickActionTitle: 'Apply for Hostel Room',
    urlPlaceholder: 'warden.uaf.edu.pk'
  },
  {
    id: 'res-financial',
    title: 'Directorate of Financial Aid & Scholarships',
    category: 'Scholarships & Aid',
    description: 'Administering PKR 450 Million+ annually through PEEF, Ehsaas, HEC Need-Based, USAID, and UAF Alumni Endowment Funds.',
    iconName: 'DollarSign',
    features: ['100% Tuition Fee Waivers', 'Monthly maintenance stipends', 'Emergency medical grants', 'Work-study employment on campus'],
    location: 'Student Teacher Center (STC), 1st Floor',
    helpline: '+92 41 9200161 (Ext 3605)',
    timing: 'Mon - Fri (08:30 AM - 03:30 PM)',
    quickActionTitle: 'Check Scholarship Eligibility',
    urlPlaceholder: 'dfa.uaf.edu.pk'
  },
  {
    id: 'res-transport',
    title: 'Motor Transport Pool (MTP) & Shuttle',
    category: 'Transport & IT',
    description: 'A dedicated fleet of 65 university buses linking every major neighborhood of Faisalabad, Jaranwala, Samundri, and Toba Tek Singh with UAF.',
    iconName: 'Bus',
    features: ['Daily pick-and-drop on 24 regional routes', 'Subsidized semester transport pass', 'Late-night library shuttle', 'Emergency student ambulance'],
    location: 'Transport Office near Gate #4',
    helpline: '+92 41 9200161 (Ext 2109)',
    timing: 'Mon - Fri (07:00 AM - 07:00 PM)',
    quickActionTitle: 'View Bus Routes & Timings',
    urlPlaceholder: 'transport.uaf.edu.pk'
  },
  {
    id: 'res-career',
    title: 'Career Development Centre (CDC & DICE)',
    category: 'Career & Placement',
    description: 'Bridging scholars with corporate agribusinesses, multinational FMCGs, banking sectors, and international research universities.',
    iconName: 'Briefcase',
    features: ['Annual Mega Job Fair with 120+ companies', 'Resume polishing and mock interviews', 'Paid summer internships', 'Incubation space for startups'],
    location: 'Old Senate Hall Wing, Ground Floor',
    helpline: '+92 41 9200161 (Ext 3201)',
    timing: 'Mon - Fri (09:00 AM - 04:00 PM)',
    quickActionTitle: 'Browse Job Openings',
    urlPlaceholder: 'cdc.uaf.edu.pk'
  },
  {
    id: 'res-health',
    title: 'University Health Centre & Hospital',
    category: 'Health & Sports',
    description: 'Free healthcare, medical officers, emergency ward, digital diagnostic radiology, laboratory tests, and free pharmacy for enrolled students.',
    iconName: 'Activity',
    features: ['Male & female specialized physicians', 'Emergency cardiac & trauma unit', 'Full blood and biochemical analyzer', '24/7 dedicated rescue ambulance'],
    location: 'Opposite Jinnah Auditorium',
    helpline: '+92 41 9200161 (Ext 2300)',
    timing: '24/7 Emergency & OPD',
    quickActionTitle: 'Book Doctor Consultation',
    urlPlaceholder: 'health.uaf.edu.pk'
  }
];

export const CAMPUS_LANDMARKS: CampusLandmark[] = [
  {
    id: 'lm-clock-tower',
    name: 'Historic UAF Clock Tower & Main Building',
    category: 'Colonial Heritage Architecture',
    year: 1906,
    stats: '119 Years Old • Neo-Gothic & Edwardian Red Brick',
    description: 'The monumental heart of UAF. Laid in 1906 under Sir Louis Dane, this majestic clock tower symbolises South Asia’s modern agricultural renaissance.',
    historicalNote: 'The tower houses the historic Syndicate Hall, the Vice Chancellor Secretariat, and the antique University Bell cast in Glasgow.',
    image: '/uaf_main_building_renewed.jpg'
  },
  {
    id: 'lm-library',
    name: 'Main Central Library & HEC Digital Resource',
    category: 'Academic Knowledge Hub',
    year: 1961,
    stats: '350,000+ Books • 400 Seater Silent Reading Halls',
    description: 'One of Pakistan’s largest academic agricultural repositories, preserving manuscripts from 1890 alongside modern automated RFID self-checkout desks.',
    historicalNote: 'Houses rare botanical specimens and British canal colonization maps of the Punjab Rechna Doab.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'lm-cas-afs',
    name: 'U.S.–Pakistan Center for Advanced Studies (USPCAS-AFS)',
    category: 'State-of-the-Art Research Center',
    year: 2014,
    stats: 'PKR 3.5B Collaborative Project • Solar Drip Labs',
    description: 'A world-class scientific hub built in partnership with USAID and UC Davis, dedicated to high-precision agronomy, genomics, and climate policy.',
    historicalNote: 'Features cutting-edge phytotron chambers that simulate extreme drought and heat conditions to breed climate-smart crops.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'lm-botanical',
    name: 'UAF Botanical Garden & Agronomy Research Farms',
    category: 'Green Reserve & Flora Sanctuary',
    year: 1928,
    stats: '1,950+ Total Campus Acres • 2,400 Plant Species',
    description: 'Expansive lush green orchards, experimental wheat and cotton plots, high-tech polyhouse tunnels, and towering heritage banyan trees.',
    historicalNote: 'The research fields have birthed over 60 commercial crop varieties responsible for billions in national agricultural yield.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80'
  }
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'How is the admission merit calculated for Undergraduate programs at UAF?',
    a: 'Merit is calculated based on: Matriculation (30% weightage) + Intermediate (30% weightage) + UAF Entry Test (40% weightage). Hafiz-e-Quran candidates receive 20 additional marks added to their Intermediate score upon passing the test.'
  },
  {
    q: 'What is the minimum eligibility criteria for Doctor of Veterinary Medicine (DVM)?',
    a: 'Applicants must possess minimum 60% marks in F.Sc. Pre-Medical and clear the UAF Undergraduate Entry Test. Admission is strictly merit-based.'
  },
  {
    q: 'Are hostel facilities guaranteed for newly admitted students?',
    a: 'UAF has 22 resident halls for male and female students. Freshmen from outside Faisalabad district are given priority in hostel allotment on submission of admission confirmation.'
  },
  {
    q: 'What scholarship programs are available at UAF?',
    a: 'UAF provides PEEF Scholarships, HEC Need-Based Scholarships, Ehsaas Undergraduate Scheme, USAID Merit Scholarships, and Alumni Endowment fee waivers covering 100% tuition and monthly stipends.'
  }
];
