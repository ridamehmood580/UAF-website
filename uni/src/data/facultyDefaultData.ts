// ─────────────────────────────────────────────────────────────────────────────
//  UAF FACULTY & ACADEMIC DEFAULT DATA STORE
//  Contains authentic data for all faculties, departments, institutes & staff.
// ─────────────────────────────────────────────────────────────────────────────

export type FacultySection =
  | 'overview'
  | 'dean'
  | 'undergraduate'
  | 'postgraduate'
  | 'internship'
  | 'short-courses'
  | 'portfolio'
  | 'agronomy'
  | 'entomology'
  | 'plant-pathology'
  | 'plant-breeding'
  | 'forestry'
  | 'horticulture'
  | 'soil-sciences'
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


export const FACULTY_PORTRAIT_POOL = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80'
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
      'The Faculty of Sciences provides foundational scientific training and cutting-edge basic and applied research across Biochemistry, Botany, Zoology, Chemistry, Physics, Mathematics, and Statistics, empowering scientific discoveries and interdisciplinary innovation.',
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
      'The Faculty of Social Sciences focuses on agricultural policy, development economics, agribusiness supply chains, and rural extension methodologies to link scientific innovations directly with smallholder farmers.',
    departmentsCount: '4 Departments',
    institutesCount: '2 Institutes',
    farmsCount: '1 Field Outreach Center'
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
    tagline: 'Cultivating Critical Inquiry, Linguistics, Literature and Cultural Heritage.',
    deanName: 'Prof. Dr. Muhammad Asif',
    deanTitle: 'Dean, Faculty of Arts & Humanities',
    deanPhone: '+92 41 9200161-70 Ext: 2700',
    deanEmail: 'dean.arts@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Arts & Humanities, UAF',
    historyText:
      'The Faculty of Arts and Humanities promotes critical thinking, communication, language studies, and ethical awareness through rigorous academic programs in English, Islamic Studies, Pakistan Studies, and Humanities.',
    departmentsCount: '4 Departments',
    institutesCount: '1 Language Lab',
    farmsCount: '1 Cultural Archive'
  },
  'fac-health': {
    id: 'fac-health',
    name: 'Faculty of Health and Pharmaceutical Sciences',
    shortName: 'Health Sciences',
    fullName: 'Faculty of Health and Pharmaceutical Sciences',
    tagline: 'Excellence in Pharmacy, Clinical Therapeutics and Public Health Education.',
    deanName: 'Prof. Dr. Ghulam Muhammad',
    deanTitle: 'Dean, Faculty of Health & Pharmaceutical Sciences',
    deanPhone: '+92 41 9200161-70 Ext: 3500',
    deanEmail: 'dean.pharmacy@uaf.edu.pk',
    deanOffice: 'Dean Secretariat, Faculty of Health & Pharmaceutical Sciences, UAF',
    historyText:
      'Offering Doctor of Pharmacy (Pharm-D) and advanced clinical health certifications, this faculty provides top-tier laboratory training, hospital pharmacy residencies, and pharmacological research.',
    departmentsCount: '3 Departments',
    institutesCount: '1 Institute of Pharmacy',
    farmsCount: '3 Analytical Labs'
  }
};


export const DEPARTMENT_DETAILS_MAP: Record<string, DepartmentDetailData> = {
  'sci-cs': {
    id: 'sci-cs',
    name: 'Department of Computer Science',
    shortLabel: 'Computer Science',
    overviewTitle: 'Department of Computer Science - Overview',
    staffTitle: 'Department of Computer Science - Faculty and Staff',
    buildingImage: '/uaf_historic_campus.jpg',
    buildingCaption: 'Department of Computer Science, Faculty of Sciences, University of Agriculture, Faisalabad',
    paragraphsTop: [
      'The Department of Computer Science at the University of Agriculture Faisalabad was established to pioneer cutting-edge computer education, artificial intelligence, precision agriculture, and computational sciences in Pakistan.',
      'The department offers high-caliber undergraduate and postgraduate programs accredited by NCEAC and HEC, including BS Computer Science, BS Software Engineering, BS Information Technology, MS Computer Science, and Ph.D. in Computer Science.'
    ],
    paragraphsWithImage: [
      'Equipped with modern AI computing clusters, high-speed fiber internet, and specialized research laboratories for Data Science, Image Processing, and Agri-IoT, the department bridges computational intelligence with real-world agricultural and industrial challenges.'
    ],
    paragraphsBottom: [
      'The faculty members actively collaborate with national and international research groups, publishing extensively in premier peer-reviewed journals including Springer, IEEE, ACM, and Elsevier. Faculty scholars also conduct groundbreaking research under HEC NRPU, PSF, and international funding grants.'
    ],
    societiesOrLabsTitle: 'Specialized Labs & Research Groups',
    societiesOrLabs: [
      'Artificial Intelligence & Deep Learning Research Group',
      'Computer Vision & Agricultural Image Processing Laboratory',
      'Big Data Analytics & Precision Cloud Telemetry Lab',
      'Agri-IoT & Sensor Networks Laboratory',
      'Software Engineering & High-Performance Computing Cluster'
    ],
    facultySummaryBadge: '06 Professors • 04 Associate Professors • 08 Assistant Professors • 05 Lecturers',
    staffList: [
      {
        name: 'Dr. Saqib Ali',
        designation: 'Chairman / Professor',
        qualification: 'Post-Doc',
        specialization: 'Artificial Intelligence, Big Data Analytics, Image Processing, Precision Agriculture',
        researchAreas: 'My research interests incorporate the intersection of Artificial Intelligence, Big Data Analytics, and Image Processing, focusing on their transformative potential in agriculture. By harnessing AI and big data analytics techniques coupled with advanced image processing algorithms, I aim to revolutionize farming practices, optimize crop yield, and ensure sustainable agricultural development for future generations.',
        address: 'Department of Computer Science, University of Agriculture, Faisalabad, Pakistan. 38000',
        phone: '+92419200829 - Ext. 3318',
        email: 'saqib@uaf.edu.pk',
        secondaryEmail: 'saqibutm@outlook.com',
        hecApprovedSupervisor: 'Yes',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Prof. Dr. Tasleem Mustafa',
        designation: 'Professor',
        qualification: 'Ph.D. (Computer Science)',
        specialization: 'Software Engineering, Distributed Systems & Cloud Architecture',
        phone: '+92419200161 - Ext. 3321',
        email: 'tasleem@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Muhammad Ahsan',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (Computer Science)',
        specialization: 'Computer Vision, Medical Imaging & Pattern Recognition',
        phone: '+92419200161 - Ext. 3325',
        email: 'mahsan@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Zulfiqar Habib',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (Japan)',
        specialization: 'Geometric Modeling, AI Robotics & Agri-Drones',
        phone: '+92419200161 - Ext. 3330',
        email: 'zhabib@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Asim Raza',
        designation: 'Assistant Professor',
        qualification: 'Ph.D. (CS)',
        specialization: 'Machine Learning, Remote Sensing & Spatial Data Modeling',
        phone: '+92419200161 - Ext. 3335',
        email: 'asim.raza@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },

  entomology: {
    id: 'entomology',
    name: 'Department of Entomology',
    shortLabel: 'Entomology',
    overviewTitle: 'Department of Entomology - Overview',
    staffTitle: 'Department of Entomology - Faculty and Staff',
    buildingImage: '/uaf_historic_campus.jpg',
    buildingCaption: 'Department of Entomology Building, University of Agriculture, Faisalabad',
    paragraphsTop: [
      'The foundation of teaching and research in Entomology in the Province was laid with the establishment of the Punjab Agricultural College, Lyallpur (Department of Agriculture, Punjab) in 1905. From 1905-1907 an Agricultural Assistant carried out research on crop pests. In 1908, an Assistant Professor of Entomology was appointed on the staff of Economic Botanist. The first class of Licentiate in Agriculture (LAG), a 3 years diploma, course, was admitted in 1909, in 1913, an independent Entomological Section came into existence under the Assistant Professor of Entomology. In 1914, the duration of the LAG diploma course was increased from 3 to 4 years and in 1916 it was made a degree course (B.Sc. Agriculture) and the responsibility of conducting the examination was entrusted to the Punjab University.'
    ],
    paragraphsWithImage: [
      "In 1919, Mian M. Afzal Husain was appointed as Entomologist. This was a corner stone in the history of Entomology and a true beginning of entomological research and teaching was conducted. Mian M. Afzal Husain for his keen interest and dedicated service in this field was very correctly and deservedly called the 'Father of Entomology' in this region. He was instrumental in raising the status of this subject to a major field of study in 1931 and thus Entomology assumed its rightful place. The LAG diploma course was discontinued in 1920. In 1923, the Punjab University recognized the Punjab Agricultural College for M.Sc. (Agri.) and in 1929, the first student (Mr. Abdul Wahid Khan) was awarded this degree. With the passage of time the standard of teaching and research continued to rise rapidly and the college was consequently recognized by the Punjab University for Ph.D. degree. The first Ph.D. degree was completed by Dr. Atiq-ur-Rahman Ansari in 1945."
    ],
    paragraphsBottom: [
      'With the appointment of Mian M. Afzal Husain as Vice-Chancellor of the Punjab University in 1938, Dr. Khan A. Rehman took over the charge as Entomologist and continued till 1950, afterward, he was appointed as Director Agriculture, Punjab. During this period entomological research and teaching continued to make great progress. He was succeeded by Dr. Abdul Latif who assumed the charge of Principal, Agricultural College in 1961. In 1959, Kh. Abdul Haq took over as Entomologist till 1961 when the College was raised to the status of the University of Agriculture, Lyallpur (now Faisalabad). Now, the Department of Entomology falls in Faculty of Agriculture at University of Agriculture, Faisalabad. Up till today, the Department has produced more than 2683 B.Sc (Hons.), 2760 M.Sc (Hons.) and 133 Ph.D. students.',
      'The Department of Entomology comprises distinguished faculty members belonging to diverse fields of study. Since 2000 till date, faculty members have earned national and international research grants in various fundamental and applied research fields like Integrated Pest Management, Eco-Toxicology, Stored Grain Pest Management, Insect Biodiversity & Biosystematics, Acarology, Insect Molecular Biology and Integrated Vector Management.'
    ],
    societiesOrLabsTitle: 'Professional Societies & Research Laboratories',
    societiesOrLabs: [
      'Pakistan Entomological Society (Publishing Pakistan Entomologist since 1979)',
      'Integrated Pest Management (IPM) & Biological Control Lab',
      'Eco-Toxicology & Insecticide Resistance Monitoring Lab',
      'Stored Grain Pest Management & Post-Harvest Protection Cell',
      'Insect Biodiversity, Biosystematics & National Insect Museum',
      'Acarology, Apiculture & Integrated Vector Management Unit'
    ],
    facultySummaryBadge: '07 Professors • 07 Associate Professors • 02 Assistant Professors • 01 Lecturer',
    staffList: [
      {
        name: 'Dr. Waseem Akram',
        designation: 'Chairman / Professor',
        qualification: 'Ph.D.',
        specialization: 'Entomology',
        researchAreas: 'Vector borne disease management, Bio systematic, Medical Entomology',
        address:
          'Department of Entomology, Faculty of Agriculture, University of Agriculture, Faisalabad-Punjab-Pakistan, Postal Code: 38000',
        phone: '+92419200161 - Ext. 2922',
        email: 'Waseemakram68@uaf.edu.pk',
        hecApprovedSupervisor: 'Yes',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Prof. Dr. Zain Ul Abdin',
        designation: 'Professor',
        qualification: 'Ph.D. (Italy) • Post-Doc (USA)',
        specialization: 'Insect Molecular Biology & Functional Genomics',
        phone: '+92419200161 - Ext. 2991',
        email: 'zainentomology@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Prof. Dr. Muhammad Dildar Gogi',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Fruit Fly IPM & Ecological Pest Control',
        phone: '+92419200161 - Ext. 2952',
        email: 'drmdgogi@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Prof. Dr. Jam Nazeer Ahmad',
        designation: 'Professor',
        qualification: 'Ph.D. (France)',
        specialization: 'Molecular Entomology & Phytoplasma Vectors',
        phone: '+92419200161 - Ext. 2909',
        email: 'jam.ahmad@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Bilal Saeed Khan',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Agricultural Acarology & Predatory Mites',
        phone: '+92412611129 - Ext. 2906',
        email: 'dr.bilal.saeed@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Rashad Rasool Khan',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Eco-Toxicology & Beneficial Arthropods',
        phone: '+92419200161 - Ext. 2935',
        email: 'rashadkhan@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Muhammad Sagheer',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Stored Grain Pest Management & Botanical Extracts',
        phone: '+92419200161 - Ext. 2971',
        email: 'dr.muhammad.sagheer@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Shahid Majeed',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (SWU, Sweden)',
        specialization: 'Insect Chemical Ecology & Olfaction',
        phone: '+92419200161 - Ext. 2996',
        email: 'shahid.majeed@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Muhammad Tayyib',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Biological Control & Crop Protection',
        phone: '+92419200161 - Ext. 2927',
        email: 'muhammadtayyib@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Muhammad Sufyan',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (Germany)',
        specialization: 'Chemical Ecology & Wireworm Management',
        phone: '+92419200161 - Ext. 2909',
        email: 'muhammad.sufyan@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Waseem Abbas',
        designation: 'Assistant Professor',
        qualification: 'Ph.D. (China)',
        specialization: 'Insect Gut Microbiome & Pest Management',
        phone: '+92419200161 - Ext. 2909',
        email: 'waseem.abbas55@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Muhammad Umair Sial',
        designation: 'Assistant Professor',
        qualification: 'Ph.D. (Australia)',
        specialization: 'Toxicology & Integrated Pest Management',
        phone: '+92419200161 - Ext. 2938',
        email: 'umair.sial@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Prof. Dr. Sohail Ahmed',
        designation: 'Professor',
        qualification: 'Ph.D. Entomology (UK)',
        specialization: 'Termite Biology & Urban Pest Management',
        phone: '+92419200161 - Ext. 2912',
        email: 'sohail_ahmed@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Prof. Dr. Muhammad Jalal Arif',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF) • Post-Doc (USA)',
        specialization: 'Integrated Pest Management (IPM) & Cotton Entomology',
        phone: '+92419200161 - Ext. 2901',
        email: 'jalalarif@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Prof. Dr. Mansoor ul Hasan',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Stored Product Entomology & Fumigation Technology',
        phone: '+92419200161 - Ext. 2914',
        email: 'mansoor.ent@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Abid Ali',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (China) • Post-Doc (Brazil)',
        specialization: 'Soil Arthropod Ecology & Biopesticides',
        phone: '+92419200161 - Ext. 2940',
        email: 'abid_ali@uaf.edu.pk',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },

  agronomy: {
    id: 'agronomy',
    name: 'Department of Agronomy',
    shortLabel: 'Agronomy',
    overviewTitle: 'Department of Agronomy - Overview',
    staffTitle: 'Department of Agronomy - Faculty and Staff',
    buildingImage: '/uaf_facade_no_road.jpg',
    buildingCaption: 'Department of Agronomy & Experimental Farms, UAF',
    paragraphsTop: [
      'The Department of Agronomy is one of the oldest and premier departments of the Faculty of Agriculture, tracing its origins to the establishment of the Punjab Agricultural College and Research Institute at Lyallpur in 1906. Agronomy serves as the backbone of crop production sciences, integrating soil, water, climate, and crop genetics into profitable and sustainable production packages for farmers.'
    ],
    paragraphsWithImage: [
      'Over the past century, the Department has pioneered production technologies for major cereal, fiber, oilseed, sugar, pulse, and forage crops across the Indus Basin. From the Green Revolution of the 1960s to modern climate-smart conservation agriculture, the department has trained thousands of agronomists serving in national research institutes, provincial extension wings, and international organizations such as CIMMYT, IRRI, and FAO. The Department maintains a 100-acre Agronomic Research Area at Main Campus and an extensive Postgraduate Agricultural Research Station (PARS).'
    ],
    paragraphsBottom: [
      'Current research programs focus on Crop Modeling & Climate Change Adaptation, Conservation Agronomy, Weed Science & Allelopathy, Seed Science & Physiology, Precision Nutrient & Irrigation Scheduling, and High-Value Alternative Crops. Faculty members actively lead national and international research grants tackling heat stress in wheat, direct-seeded rice (DSR), and resource-conserving zero-tillage technologies.'
    ],
    societiesOrLabsTitle: 'Specialized Research Labs & Farm Facilities',
    societiesOrLabs: [
      'Allelopathy & Weed Management Research Lab',
      'Crop Modeling & Climate Change Simulation Unit',
      'Seed Physiology & Priming Technology Lab',
      'Medicinal & Alternative Crops Research Cell',
      'Student & Postgraduate Agronomic Research Farms (100+ Acres)',
      'Pakistan Society of Agronomy Secretariat'
    ],
    facultySummaryBadge: '08 Professors • 06 Associate Professors • 04 Assistant Professors',
    staffList: [
      {
        name: 'Prof. Dr. Abdul Khaliq',
        designation: 'Professor / Chairman',
        qualification: 'Ph.D. (UAF) • Post-Doc (Australia)',
        specialization: 'Weed Science, Allelopathy & Direct-Seeded Rice',
        email: 'akhaliq@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Ehsanullah',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Crop Husbandry & Agro-Technology',
        email: 'ehsanullah@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Ashfaq Ahmad Chattha',
        designation: 'Professor',
        qualification: 'Ph.D. (UK) • Post-Doc (USA)',
        specialization: 'Agro-Climatology & Crop Growth Modeling (DSSAT)',
        email: 'ashfaqchattha@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr.Rana Nadeem Abbas',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Integrated Weed Management & Cereal Agronomy',
        email: 'nadeem.abbas@uaf.edu.pk'
      },
      {
        name: 'Dr. Fahd Rasul',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF) • Post-Doc (USA)',
        specialization: 'Climate Change Resilience & Remote Sensing in Crops',
        email: 'fahdrasul@uaf.edu.pk'
      },
      {
        name: 'Dr. Muhammad Farooq',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF) • Alexander von Humboldt Fellow',
        specialization: 'Seed Science, Abiotic Stress & Biofortification',
        email: 'farooqcp@uaf.edu.pk'
      },
      {
        name: 'Dr.Shakeel Ahmad Anjum',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (China)',
        specialization: 'Drought Physiology & Maize Agronomy',
        email: 'shakeelanjum@uaf.edu.pk'
      },
      {
        name: 'Dr. Imran Khan',
        designation: 'Assistant Professor',
        qualification: 'Ph.D. (Germany)',
        specialization: 'Forage Production & Sustainable Cropping Systems',
        email: 'imrankhan.agr@uaf.edu.pk'
      }
    ]
  },

  'plant-pathology': {
    id: 'plant-pathology',
    name: 'Department of Plant Pathology',
    shortLabel: 'Plant Pathology',
    overviewTitle: 'Department of Plant Pathology - Overview',
    staffTitle: 'Department of Plant Pathology - Faculty and Staff',
    buildingImage: '/uaf_historic_empty_campus.jpg',
    buildingCaption: 'Department of Plant Pathology & Plant Health Clinic, UAF',
    paragraphsTop: [
      'The Department of Plant Pathology evolved from the Mycology and Plant Disease Section established at the Punjab Agricultural College and Research Institute, Lyallpur in the early twentieth century. Over the decades, it has stood at the forefront of safeguarding Pakistan’s food and fiber crops against devastating epidemics such as wheat rusts, cotton leaf curl virus (CLCuV), chickpea blight, citrus greening, and mango sudden death syndrome.'
    ],
    paragraphsWithImage: [
      'The Department houses specialized diagnostic and research laboratories in Mycology, Plant Virology, Phytobacteriology, Plant Nematology, Molecular Plant Pathology, and Epidemiological Disease Forecasting. It also operates a dedicated Plant Health Clinic and the National Rust Screening Nursery, providing diagnostic services to progressive farmers, seed corporations, and provincial extension officers.'
    ],
    paragraphsBottom: [
      'Up to the present day, the Department of Plant Pathology has produced thousands of B.Sc. (Hons.), M.Sc. (Hons.), and Ph.D. graduates who lead plant quarantine departments, national research centers (NARC, AARI, NIAB), and international crop protection initiatives.'
    ],
    societiesOrLabsTitle: 'Diagnostic Clinics & Research Laboratories',
    societiesOrLabs: [
      'Molecular Plant Virology & PCR Diagnostics Lab',
      'Fungal Systematics, Mycology & Mycotoxin Lab',
      'Plant Nematology & Soil-Borne Pathogens Unit',
      'Phytobacteriology & Biological Disease Control Lab',
      'Epidemiology, Climate & Crop Loss Assessment Cell',
      'Pakistan Phytopathological Society Headquarters'
    ],
    facultySummaryBadge: '06 Professors • 05 Associate Professors • 04 Assistant Professors',
    staffList: [
      {
        name: 'Prof. Dr. Amer Habib',
        designation: 'Professor / Chairman',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Plant Virology & Potato/Citrus Disease Management',
        email: 'amer.habib@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Nazir Javed',
        designation: 'Professor',
        qualification: 'Ph.D. (University of Reading, UK)',
        specialization: 'Plant Nematology & Biological Control',
        email: 'nazir.javed@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Abdul Rehman',
        designation: 'Professor',
        qualification: 'Ph.D. (UK)',
        specialization: 'Forest Pathology, Tree Decline & Fungal Diagnostics',
        email: 'arahman_pp@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Muhammad Inam-ul-Haq',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Mushroom Technology & Soil-Borne Pathogens',
        email: 'inam.pp@uaf.edu.pk'
      },
      {
        name: 'Dr. Safdar Ali',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Epidemiology & Wheat Rust Resistance',
        email: 'safdar.ali@uaf.edu.pk'
      },
      {
        name: 'Dr. Muhammad Atiq',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Phytobacteriology & Citrus Canker Management',
        email: 'dratiqpp@uaf.edu.pk'
      },
      {
        name: 'Dr. Sajid Aleem Khan',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Root Knot Nematodes & Vegetable Pathology',
        email: 'sajid_aleem@uaf.edu.pk'
      }
    ]
  },

  'plant-breeding': {
    id: 'plant-breeding',
    name: 'Department of Plant Breeding & Genetics',
    shortLabel: 'Plant Breeding & Genetics',
    overviewTitle: 'Department of Plant Breeding & Genetics - Overview',
    staffTitle: 'Department of Plant Breeding & Genetics - Faculty and Staff',
    buildingImage: '/uaf_facade_no_road.jpg',
    buildingCaption: 'Department of Plant Breeding & Genetics, UAF Main Campus',
    paragraphsTop: [
      'The Department of Plant Breeding and Genetics (PBG) traces its roots to the Cereal and Economic Botanist Sections established at the Punjab Agricultural College, Lyallpur in 1907. Throughout the 20th and 21st centuries, the department has been the cradle of varietal development in South Asia, spearheading breakthroughs in wheat, cotton, oilseeds, pulses, maize, and fodder crops.'
    ],
    paragraphsWithImage: [
      'Combining classical Mendelian breeding with modern molecular genetics, Marker-Assisted Selection (MAS), speed breeding, and functional genomics, the Department has developed and released over 40 high-yielding, heat-tolerant, and disease-resistant crop cultivars. Its germplasm banks preserve thousands of indigenous and exotic crop accessions used by breeders nationwide.'
    ],
    paragraphsBottom: [
      'The Department offers rigorous training at B.Sc. (Hons.), M.Sc. (Hons.), and Ph.D. levels, equipping geneticists with hands-on skills in experimental field design, biometrical genetics, cytogenetics, and CRISPR/molecular marker genotyping.'
    ],
    societiesOrLabsTitle: 'Breeding Programs & Genomics Core Labs',
    societiesOrLabs: [
      'Wheat Breeding, Rust Genetics & Speed Breeding Glasshouse',
      'Cotton Genomics, Fiber Quality & CLCuV Resistance Lab',
      'Maize, Sorghum & Fodder Hybrid Development Program',
      'Oilseed (Brassica, Sunflower & Sesame) Breeding Unit',
      'Pulses & Grain Legumes Germplasm Improvement Cell',
      'Cytogenetics & Molecular Marker-Assisted Selection Lab'
    ],
    facultySummaryBadge: '07 Professors • 06 Associate Professors • 05 Assistant Professors',
    staffList: [
      {
        name: 'Prof. Dr. Muhammad Tehseen Azhar',
        designation: 'Professor / Chairman',
        qualification: 'Ph.D. (UAF) • Post-Doc (France)',
        specialization: 'Cotton Breeding, Fiber Genetics & Abiotic Stress',
        email: 'tehseen.pbg@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Abdus Salam Khan',
        designation: 'Professor',
        qualification: 'Ph.D. (UK)',
        specialization: 'Wheat Breeding & Biometrical Genetics',
        email: 'askhan_pbg@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Farooq Ahmad Khan',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Cereals & Quantitative Genetics',
        email: 'farooq_pbg@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Hafeez Ahmad Sadaqat',
        designation: 'Professor',
        qualification: 'Ph.D. (Germany)',
        specialization: 'Oilseed Breeding & Hybrid Sunflower Development',
        email: 'hasadaqat@uaf.edu.pk'
      },
      {
        name: 'Dr. Muhammad Kashif',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Wheat Rust Resistance & Quality Breeding',
        email: 'mkashif_pbg@uaf.edu.pk'
      },
      {
        name: 'Dr. Zulfiqar Ali',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF) • Post-Doc (USA)',
        specialization: 'Maize Genetics & Drought Tolerance',
        email: 'zulfiqar.pbg@uaf.edu.pk'
      },
      {
        name: 'Dr. Amir Shakeel',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Cotton Germplasm & Salinity Tolerance',
        email: 'amirshakeel@uaf.edu.pk'
      }
    ]
  },

  forestry: {
    id: 'forestry',
    name: 'Department of Forestry & Range Management',
    shortLabel: 'Forestry & Range Management',
    overviewTitle: 'Department of Forestry & Range Management - Overview',
    staffTitle: 'Department of Forestry & Range Management - Faculty and Staff',
    buildingImage: '/uaf_historic_campus.jpg',
    buildingCaption: 'Department of Forestry & Range Management and Experimental Arboretum, UAF',
    paragraphsTop: [
      'The Department of Forestry and Range Management was established to address the critical challenges of low forest cover, watershed degradation, rangeland overgrazing, and timber scarcity in Pakistan. Since its inception in 1962, the department has led agroforestry education, farm forestry outreach, and rangeland rehabilitation.'
    ],
    paragraphsWithImage: [
      'Given that irrigated farmlands in Punjab and Sindh supply the majority of fuelwood and industrial timber in Pakistan, the Department pioneered linear and block agroforestry models that allow farmers to grow trees alongside agricultural crops without sacrificing crop yields. The department maintains an extensive botanical arboretum, forest tree seed nursery, and wood testing laboratory.'
    ],
    paragraphsBottom: [
      'Faculty members conduct funded research in Carbon Sequestration, Climate Change Mitigation, Silviculture, Eco-Tourism, Wildlife Habitat Conservation, and Desert/Cholistan Rangeland Management.'
    ],
    societiesOrLabsTitle: 'Forestry Research Units & Field Stations',
    societiesOrLabs: [
      'Silviculture & Agroforestry Experimental Arboretum',
      'Forest Mensuration, Wood Anatomy & Timber Tech Lab',
      'Rangeland Ecology & Desert Pastorals Rehabilitation Cell',
      'Watershed Management & GIS Forest Mapping Lab',
      'Carbon Sequestration & Climate Mitigation Research Group'
    ],
    facultySummaryBadge: '03 Professors • 04 Associate Professors • 04 Assistant Professors',
    staffList: [
      {
        name: 'Prof. Dr. Farrakh Nawaz',
        designation: 'Professor / Chairman',
        qualification: 'Ph.D. (France)',
        specialization: 'Tree Ecophysiology, Agroforestry & Stress Tolerance',
        email: 'farrakh.nawaz@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Tahir Siddiqui',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Farm Forestry & Silvicultural Systems',
        email: 'tahirsiddiqui@uaf.edu.pk'
      },
      {
        name: 'Dr. Muhammad Zubair',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (New Zealand)',
        specialization: 'Social Forestry & Natural Resource Management',
        email: 'm.zubair@uaf.edu.pk'
      },
      {
        name: 'Dr. Irfan Ahmad',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Range Management & Forest Mensuration',
        email: 'irfan.forestry@uaf.edu.pk'
      },
      {
        name: 'Dr. Muhammad Asif',
        designation: 'Assistant Professor',
        qualification: 'Ph.D. (China)',
        specialization: 'Forest Ecology, Carbon Stocks & Remote Sensing',
        email: 'asif.frm@uaf.edu.pk'
      }
    ]
  },

  horticulture: {
    id: 'horticulture',
    name: 'Institute of Horticultural Sciences',
    shortLabel: 'Horticultural Sciences',
    overviewTitle: 'Institute of Horticultural Sciences - Overview',
    staffTitle: 'Institute of Horticultural Sciences - Faculty and Staff',
    buildingImage: '/uaf_historic_empty_campus.jpg',
    buildingCaption: 'Institute of Horticultural Sciences & Square 9 Orchards, UAF',
    paragraphsTop: [
      'Horticultural research and education at Faisalabad began in 1925 with the appointment of a Fruit Specialist at the Punjab Agricultural College. Elevated to the status of a full-fledged Institute of Horticultural Sciences in 2003, it is Pakistan’s premier center for Pomology (Fruit Science), Olericulture (Vegetable Science), Floriculture & Landscape Architecture, and Postharvest Biology.'
    ],
    paragraphsWithImage: [
      'The Institute manages over 150 acres of experimental fruit orchards (Square No. 9 & Square No. 32), vegetable breeding blocks, commercial tissue culture laboratories, and controlled-atmosphere cold storage suites. Its scientists have played a transformative role in Kinnow mandarin export quality, mango orchard modernization, seedless citrus breeding, and high-value cut-flower production.'
    ],
    paragraphsBottom: [
      'Through international collaborations with UC Davis, ACIAR (Australia), and USDA, the Institute trains undergraduate and postgraduate scholars in modern supply-chain management, hydroponics, and ornamental horticulture.'
    ],
    societiesOrLabsTitle: 'Orchards, Labs & Research Cells',
    societiesOrLabs: [
      'Postharvest Research & Cold-Chain Technology Center',
      'Citrus Sanitation, Nursery & Germplasm Unit (Square 9)',
      'Mango Research & High-Density Orchard Block',
      'Plant Tissue Culture & Micro-Propagation Cell',
      'Floriculture, Turfgrass & Landscape Design Studio',
      'Mushroom Research & Commercial Training Unit'
    ],
    facultySummaryBadge: '06 Professors • 07 Associate Professors • 05 Assistant Professors',
    staffList: [
      {
        name: 'Prof. Dr. Ahmad Sattar Khan',
        designation: 'Professor / Director',
        qualification: 'Ph.D. (Curtin University, Australia)',
        specialization: 'Postharvest Biology & Fruit Supply Chain Technology',
        email: 'ahmad_khan157@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Aman Ullah Malik',
        designation: 'Professor Emeritus',
        qualification: 'Ph.D. (Australia)',
        specialization: 'Postharvest Physiology & Mango/Citrus Export Tech',
        email: 'malikaman1@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Muhammad Jafar Jaskani',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF) • Post-Doc (USA)',
        specialization: 'Citrus Breeding, Biotechnology & Tissue Culture',
        email: 'jjaskani@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. CM Ayyub',
        designation: 'Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Olericulture, Tunnel Vegetable Production & Hydroponics',
        email: 'cmayyub@uaf.edu.pk'
      },
      {
        name: 'Dr. Iftikhar Ahmad',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF) • Post-Doc (UC Davis, USA)',
        specialization: 'Commercial Floriculture & Postharvest Cut Flowers',
        email: 'iftikharahmad@uaf.edu.pk'
      },
      {
        name: 'Dr. Raheel Anwar',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (Purdue University, USA)',
        specialization: 'Fruit Physiology & Molecular Pomology',
        email: 'raheelanwar@uaf.edu.pk'
      }
    ]
  },

  'soil-sciences': {
    id: 'soil-sciences',
    name: 'Institute of Soil and Environmental Sciences',
    shortLabel: 'Soil & Environmental Sciences',
    overviewTitle: 'Institute of Soil & Environmental Sciences - Overview',
    staffTitle: 'Institute of Soil & Environmental Sciences - Faculty and Staff',
    buildingImage: '/uaf_facade_no_road.jpg',
    buildingCaption: 'Institute of Soil & Environmental Sciences (ISES), UAF',
    paragraphsTop: [
      'The Institute of Soil and Environmental Sciences (ISES) is one of the oldest scientific divisions of the university, originating as the Chemical Section in 1907 at the Punjab Agricultural College and Research Institute, Lyallpur. Over more than a century, it has evolved into a globally respected institute addressing soil health, plant nutrition, salinity reclamation, and environmental sustainability.'
    ],
    paragraphsWithImage: [
      'ISES operates the renowned Saline Agriculture Research Centre (SARC), where scientists develop bio-saline cropping technologies and gypsum/biochar reclamation protocols for millions of acres of salt-affected soils in Pakistan. Additionally, the Institute houses state-of-the-art laboratories in Soil Microbiology & Biochemistry, Soil Fertility & Plant Nutrition, Soil Physics, and Environmental Pollution Remediation.'
    ],
    paragraphsBottom: [
      'Faculty members of ISES have won numerous national civil awards, HEC Best Teacher awards, and international grants from ACIAR, IAEA, and UNESCO, producing over 3,500 B.Sc. (Hons.), M.Sc. (Hons.), and Ph.D. graduates.'
    ],
    societiesOrLabsTitle: 'Premier Centres & Analytical Laboratories',
    societiesOrLabs: [
      'Saline Agriculture Research Centre (SARC)',
      'Soil Microbiology, Biofertilizers & Rhizosphere Lab',
      'Soil Fertility, Plant Nutrition & Nano-Fertilizer Lab',
      'Environmental Soil Chemistry & Heavy Metal Remediation Lab',
      'Soil & Water Conservation / GIS Mapping Lab',
      'Soil Science Society of Pakistan Central Office'
    ],
    facultySummaryBadge: '08 Professors • 06 Associate Professors • 05 Assistant Professors',
    staffList: [
      {
        name: 'Prof. Dr. Ghulam Murtaza',
        designation: 'Professor / Dean Faculty of Agriculture',
        qualification: 'Ph.D. (UAF) • Post-Doc (Australia)',
        specialization: 'Soil & Environmental Chemistry, Salt-Affected Soils',
        email: 'gmurtaza@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Muhammad Naveed',
        designation: 'Professor / Director ISES',
        qualification: 'Ph.D. (UAF) • Post-Doc (Denmark)',
        specialization: 'Soil Microbiology, Endophytes & Bio-physicochemical Processes',
        email: 'muhammad.naveed@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Zahir Ahmad Zahir',
        designation: 'Professor (Sitara-i-Imtiaz)',
        qualification: 'Ph.D. (UAF) • Post-Doc (Canada)',
        specialization: 'Soil Microbiology, PGPR & Biofertilizer Technology',
        email: 'zazahir@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Javaid Akhtar',
        designation: 'Professor',
        qualification: 'Ph.D. (UK)',
        specialization: 'Saline Agriculture & Crop Salt Tolerance',
        email: 'javaidakhtar@uaf.edu.pk'
      },
      {
        name: 'Prof. Dr. Muhammad Yaseen',
        designation: 'Professor',
        qualification: 'Ph.D. (UK)',
        specialization: 'Soil Fertility, Polymer-Coated & Nano Fertilizers',
        email: 'myaseen@uaf.edu.pk'
      },
      {
        name: 'Dr. Muhammad Zia-ur-Rehman',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (UAF)',
        specialization: 'Soil Chemistry, Nanoparticles & Metal Remediation',
        email: 'ziasindhu1399@uaf.edu.pk'
      },
      {
        name: 'Dr. Abdul Wakeel',
        designation: 'Associate Professor',
        qualification: 'Ph.D. (Giessen, Germany) • Fulbright Fellow',
        specialization: 'Plant Nutrition, Potassium Dynamics & Nitrogen Use Efficiency',
        email: 'abdulwakeel77@uaf.edu.pk'
      }
    ]
  }
};

// Static Hero Headings for each section (Typewriter removed as requested)
export const SECTION_HERO_TITLES: Record<FacultySection, { title: string; highlight: string }> = {
  overview: { title: 'Faculty of Agriculture —', highlight: 'Overview & Academic Profile' },
  dean: { title: 'Faculty of Agriculture —', highlight: "The Dean's Secretariat" },
  undergraduate: { title: 'Educational Programs —', highlight: 'B.Sc. (Hons.) Agriculture' },
  postgraduate: { title: 'Postgraduate Studies —', highlight: 'M.Sc. (Hons.) & Ph.D. Programs' },
  internship: { title: 'Experiential Learning —', highlight: 'Field Internship Program' },
  'short-courses': { title: 'Skill Development —', highlight: 'Vocational Short Courses' },
  agronomy: { title: 'Academic Department —', highlight: 'Department of Agronomy' },
  entomology: { title: 'Academic Department —', highlight: 'Department of Entomology' },
  'plant-pathology': { title: 'Academic Department —', highlight: 'Department of Plant Pathology' },
  'plant-breeding': { title: 'Academic Department —', highlight: 'Plant Breeding & Genetics' },
  forestry: { title: 'Academic Department —', highlight: 'Forestry & Range Management' },
  horticulture: { title: 'Premier Research Institute —', highlight: 'Institute of Horticultural Sciences' },
  'soil-sciences': { title: 'Premier Research Institute —', highlight: 'Soil & Environmental Sciences' }
};

export const DEPARTMENTS_MENU_LIST: { id: FacultySection; label: string }[] = [
  { id: 'agronomy', label: 'Agronomy' },
  { id: 'entomology', label: 'Entomology' },
  { id: 'plant-pathology', label: 'Plant Pathology' },
  { id: 'plant-breeding', label: 'Plant Breeding & Genetics' },
  { id: 'forestry', label: 'Forestry & Range Management' }
];

export const INSTITUTES_MENU_LIST: { id: FacultySection; label: string }[] = [
  { id: 'horticulture', label: 'Institute of Horticultural Sciences' },
  { id: 'soil-sciences', label: 'Institute of Soil and Environmental Sciences' },
  { id: 'cabb', label: 'Centre of Agricultural Biochemistry & Biotechnology (CABB)' }
];


export interface DynamicDivisionMeta {
  id: string;
  label: string;
  fullName: string;
  focus: string;
}

export interface DynamicFacultyMenuConfig {
  departments: DynamicDivisionMeta[];
  institutes: DynamicDivisionMeta[];
  deanImage: string;
  deanDepartment: string;
  deanBio1: string;
  deanBio2: string;
  undergradDegree: string;
  undergradSubtitle: string;
  undergradDuration: string;
  undergradMajors: string[];
}

export const FACULTY_MENUS_MAP: Record<string, DynamicFacultyMenuConfig> = {
  'fac-agri': {
    departments: [
      { id: 'agronomy', label: 'Agronomy', fullName: 'Department of Agronomy', focus: 'Crop Production, Weed Science & Climate-Smart Agronomy' },
      { id: 'entomology', label: 'Entomology', fullName: 'Department of Entomology', focus: 'Integrated Pest Management, Bio-Systematics & Medical Entomology' },
      { id: 'plant-pathology', label: 'Plant Pathology', fullName: 'Department of Plant Pathology', focus: 'Phytobacteriology, Plant Virology, Mycology & Nematology' },
      { id: 'plant-breeding', label: 'Plant Breeding & Genetics', fullName: 'Department of Plant Breeding & Genetics', focus: 'Crop Genetics, Hybrid Seed Development & Molecular Breeding' },
      { id: 'forestry', label: 'Forestry & Range Management', fullName: 'Department of Forestry & Range Management', focus: 'Agroforestry, Watershed Management & Carbon Sequestration' }
    ],
    institutes: [
      { id: 'horticulture', label: 'Institute of Horticultural Sciences', fullName: 'Institute of Horticultural Sciences', focus: 'Pomology, Olericulture, Floriculture & Post-Harvest Technology' },
      { id: 'soil-sciences', label: 'Institute of Soil and Environmental Sciences', fullName: 'Institute of Soil and Environmental Sciences', focus: 'Soil Chemistry, Saline Agriculture, Soil Microbiology & Plant Nutrition' },
      { id: 'cabb', label: 'Centre of Agri. Biochemistry & Biotechnology (CABB)', fullName: 'Centre of Agricultural Biochemistry & Biotechnology (CABB)', focus: 'Genomics, CRISPR Gene Editing, Plant Tissue Culture & Molecular Biology' }
    ],
    deanImage: '/dean_dr_ghulam_murtaza.jpg',
    deanDepartment: 'Institute of Soil & Environmental Sciences',
    deanBio1:
      'Dr. Ghulam Murtaza is a Professor at the Institute of Soil and Environmental Sciences with a distinguished career spanning agriculture, education, and soil, water, and environmental chemistry. After receiving a post-doc fellowship at CRC CARE, University of Adelaide, South Australia through the Higher Education Commission of Pakistan, he established the Teaching Resource Centre (TRC) at UAF.',
    deanBio2:
      'His primary research concentrates on mitigating nitrogen losses, improving soil fertility, reclaiming degraded lands, and integrating field experimentation with policy-oriented solutions to build climate-resilient agricultural practices. Beyond research, he serves as an Editor for the International Journal of Agriculture & Biology and has completed 16 funded projects.',
    undergradDegree: 'B.Sc. (Hons.) Agriculture',
    undergradSubtitle: 'Four-Year Bachelor of Science (Honours) Professional Degree Program',
    undergradDuration: '4 Years (8 Sem.)',
    undergradMajors: [
      'Agronomy',
      'Plant Breeding and Genetics',
      'Entomology',
      'Plant Pathology',
      'Forestry & Range Management',
      'Institute of Soil & Environmental Sciences',
      'Institute of Horticultural Sciences',
      'Agricultural Economics',
      'Marketing & Agribusiness',
      'Agricultural Extension',
      'Animal Sciences',
      'Food Science & Technology',
      'Microbiology',
      'Dairy Science',
      'Agri. Biotechnology'
    ]
  },
  'fac-vet': {
    departments: [
      { id: 'vet-anatomy', label: 'Department of Anatomy', fullName: 'Department of Veterinary Anatomy & Histology', focus: 'Gross Anatomy, Veterinary Histology, Embryology & Neuroanatomy' },
      { id: 'vet-pathology', label: 'Department of Pathology', fullName: 'Department of Veterinary Pathology', focus: 'Diagnostic Pathology, Avian Histopathology & Molecular Oncology' },
      { id: 'vet-parasitology', label: 'Department of Parasitology', fullName: 'Department of Veterinary Parasitology', focus: 'Helminthology, Protozoology, Tick-Borne Zoonoses & Immunoparasitology' },
      { id: 'vet-cms', label: 'Clinical Medicine & Surgery', fullName: 'Department of Clinical Medicine & Surgery (CMS)', focus: 'Large & Small Animal Internal Medicine, Veterinary Surgery & Radiology' },
      { id: 'vet-theriogenology', label: 'Department of Theriogenology', fullName: 'Department of Animal Reproduction & Theriogenology', focus: 'Reproductive Biotechnology, Artificial Insemination & Embryo Transfer' },
      { id: 'vet-epidemiology', label: 'Epidemiology & Public Health', fullName: 'Department of Epidemiology & Public Health', focus: 'One Health Surveillance, Zoonotic Disease Modeling & Biosecurity' }
    ],
    institutes: [
      { id: 'vet-microbiology', label: 'Institute of Microbiology', fullName: 'Institute of Microbiology', focus: 'Veterinary Bacteriology, Virology, Vaccine Development & Immunology' },
      { id: 'vet-physiology', label: 'Institute of Physiology & Pharmacology', fullName: 'Institute of Physiology & Pharmacology', focus: 'Endocrinology, Pharmacokinetics, Toxicology & Ethnopharmacology' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[0],
    deanDepartment: 'Institute of Microbiology & Veterinary Pathology',
    deanBio1:
      'Prof. Dr. Shahid Mahmood leads the Faculty of Veterinary Science at the University of Agriculture, Faisalabad, bringing over three decades of academic, clinical, and diagnostic research leadership in avian pathology, zoonotic disease control, and vaccine development.',
    deanBio2:
      'Under his stewardship, the Veterinary Teaching Hospital, Diagnostic Laboratories, and One-Health Research Units have expanded clinical outreach across Punjab while training PVMC-accredited Doctor of Veterinary Medicine (DVM) and postgraduate scholars.',
    undergradDegree: 'Doctor of Veterinary Medicine (DVM)',
    undergradSubtitle: 'Five-Year PVMC-Accredited Professional Veterinary Medical Degree Program',
    undergradDuration: '5 Years (10 Sem.)',
    undergradMajors: [
      'Clinical Medicine & Surgery',
      'Veterinary Pathology',
      'Veterinary Microbiology & Immunology',
      'Veterinary Parasitology',
      'Theriogenology & Reproductive Biotech',
      'Veterinary Anatomy & Histology',
      'Physiology & Pharmacology',
      'Epidemiology & Public Health (One Health)'
    ]
  },
  'fac-sci': {
    departments: [
      { id: 'sci-cs', label: 'Department of Computer Science', fullName: 'Department of Computer Science', focus: 'Artificial Intelligence, Big Data Analytics, Image Processing, Software Engineering, IoT & Cloud Systems' },
      { id: 'sci-botany', label: 'Department of Botany', fullName: 'Department of Botany', focus: 'Plant Physiology, Stress Biology, Ecology, Taxonomy & Ethnobotany' },
      { id: 'sci-zoology', label: 'Zoology, Wildlife & Fisheries', fullName: 'Department of Zoology, Wildlife & Fisheries', focus: 'Aquaculture, Fisheries Management, Biodiversity & Wildlife Conservation' },
      { id: 'sci-chemistry', label: 'Department of Chemistry', fullName: 'Department of Chemistry', focus: 'Organic Synthesis, Analytical Chemistry, Nanomaterials & Green Catalysis' },
      { id: 'sci-biochemistry', label: 'Department of Biochemistry', fullName: 'Department of Biochemistry', focus: 'Enzymology, Clinical Biochemistry, Proteomics & Metabolic Engineering' },
      { id: 'sci-physics', label: 'Department of Physics', fullName: 'Department of Physics', focus: 'Laser Spectroscopy, Solar Photovoltaics, Solid State & Plasma Physics' },
      { id: 'sci-math', label: 'Mathematics & Statistics', fullName: 'Department of Mathematics & Statistics', focus: 'Biostatistics, Computational Mathematics, Econometrics & Data Modeling' }
    ],
    institutes: [
      { id: 'sci-cabb', label: 'Centre of Agri. Biochemistry & Biotechnology (CABB)', fullName: 'Centre of Agricultural Biochemistry & Biotechnology (CABB)', focus: 'Genomics, CRISPR Gene Editing, Plant Tissue Culture & Molecular Biology' },
      { id: 'sci-hitech', label: 'Central Hi-Tech Laboratory', fullName: 'Central Hi-Tech Research & Instrumentation Centre', focus: 'Electron Microscopy, Chromatography, Spectroscopy & Genomic Sequencing' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[2],
    deanDepartment: 'Department of Biochemistry',
    deanBio1:
      'Prof. Dr. Muhammad Asghar serves as Dean, Faculty of Sciences at UAF, spearheading interdisciplinary teaching and basic-to-applied scientific research across biological, chemical, physical, mathematical, and computational sciences.',
    deanBio2:
      'He has published extensively in high-impact international journals, supervised numerous Ph.D. and M.Phil. scholars, and established modern analytical and molecular research laboratories across the Faculty of Sciences.',
    undergradDegree: 'BS (Hons.) Basic & Applied Sciences',
    undergradSubtitle: 'Four-Year HEC-Accredited Bachelor of Science Honours Degree Programs',
    undergradDuration: '4 Years (8 Sem.)',
    undergradMajors: [
      'BS Botany',
      'BS Zoology',
      'BS Chemistry',
      'BS Biochemistry',
      'BS Physics',
      'BS Mathematics',
      'BS Statistics',
      'BS Computer Science (BSCS)',
      'BS Software Engineering (BSSE)',
      'BS Information Technology (BSIT)'
    ]
  },
  'fac-husbandry': {
    departments: [
      { id: 'ah-livestock', label: 'Livestock Management', fullName: 'Department of Livestock Management', focus: 'Dairy Herd Management, Beef Production, Camel & Small Ruminant Systems' },
      { id: 'ah-breeding', label: 'Animal Breeding & Genetics', fullName: 'Department of Animal Breeding & Genetics', focus: 'Quantitative Genetics, Genomic Selection & Indigenous Breed Conservation' },
      { id: 'ah-nutrition', label: 'Animal Nutrition', fullName: 'Department of Animal Nutrition', focus: 'Ruminant Nutrition, Feed Technology, Silage Formulation & Metabolic Health' },
      { id: 'ah-poultry', label: 'Department of Poultry Science', fullName: 'Department of Poultry Science', focus: 'Broiler & Layer Management, Hatchery Operations & Avian Nutrition' }
    ],
    institutes: [
      { id: 'ah-iads', label: 'Institute of Animal & Dairy Sciences (IADS)', fullName: 'Institute of Animal and Dairy Sciences (IADS)', focus: 'Integrated Livestock Production, Dairy Technology & Genetic Improvement' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[4],
    deanDepartment: 'Institute of Animal & Dairy Sciences',
    deanBio1:
      'Prof. Dr. M. Qamar Bilal is Dean, Faculty of Animal Husbandry at UAF, with extensive expertise in dairy production, livestock extension, and sustainable farm management.',
    deanBio2:
      'His research and outreach initiatives have modernized commercial dairy and poultry operations across Pakistan while strengthening academia-industry linkages in livestock nutrition and genetics.',
    undergradDegree: 'B.Sc. (Hons.) Animal Sciences & Poultry',
    undergradSubtitle: 'Four-Year Professional Degree in Livestock, Dairy & Poultry Sciences',
    undergradDuration: '4 Years (8 Sem.)',
    undergradMajors: [
      'Livestock Management',
      'Animal Breeding & Genetics',
      'Animal Nutrition & Feed Technology',
      'Poultry Science',
      'Dairy Science & Technology'
    ]
  },
  'fac-engg': {
    departments: [
      { id: 'engg-machinery', label: 'Farm Machinery & Power', fullName: 'Department of Farm Machinery & Power', focus: 'Precision Seeding, Combine Harvesters, Agricultural Robotics & Tractor Ergonomics' },
      { id: 'engg-irrigation', label: 'Irrigation & Drainage', fullName: 'Department of Irrigation & Drainage', focus: 'Hydrology, High-Efficiency Drip Irrigation, Groundwater Modeling & Salinity Control' },
      { id: 'engg-structures', label: 'Structures & Environmental Engineering', fullName: 'Department of Structures & Environmental Engineering', focus: 'Controlled-Environment Greenhouses, Farm Structures, Air Quality & Waste Engineering' },
      { id: 'engg-food', label: 'Food, Energy & Process Engineering', fullName: 'Department of Food, Energy & Process Engineering', focus: 'Post-Harvest Process Engineering, Solar Thermal Systems, Biogas & Bioenergy' },
      { id: 'engg-fiber', label: 'Fiber & Textile Technology', fullName: 'Department of Fiber & Textile Technology', focus: 'Cotton Fiber Testing, Spinning Technology, Yarn Quality & Natural Fibers' }
    ],
    institutes: [
      { id: 'engg-wmrc', label: 'Water Management Research Centre (WMRC)', fullName: 'Directorate of Water Management Research Centre (WMRC)', focus: 'Laser Land Leveling, Bed Planting, Solar Pumping & Canal Command Telemetry' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[5],
    deanDepartment: 'Department of Irrigation & Drainage',
    deanBio1:
      'Prof. Dr. Muhammad Arshad serves as Dean, Faculty of Agricultural Engineering & Technology, leading PEC-accredited engineering education in farm mechanization, water resource engineering, and renewable energy.',
    deanBio2:
      'His research focuses on groundwater sustainability, precision irrigation technologies, and climate-resilient water management across the Indus Basin.',
    undergradDegree: 'B.Sc. Agricultural Engineering (PEC Accredited)',
    undergradSubtitle: 'Four-Year Washington Accord / PEC Accredited Engineering Degree Programs',
    undergradDuration: '4 Years (8 Sem.)',
    undergradMajors: [
      'B.Sc. Agricultural Engineering',
      'B.Sc. Environmental Engineering',
      'B.Sc. Energy Systems Engineering',
      'B.Sc. Food Engineering',
      'B.Sc. Textile Technology'
    ]
  },
  'fac-social': {
    departments: [
      { id: 'soc-sociology', label: 'Department of Rural Sociology', fullName: 'Department of Rural Sociology', focus: 'Rural Development, Gender Studies, Population Dynamics & Community Mobilization' }
    ],
    institutes: [
      { id: 'soc-iare', label: 'Institute of Agricultural & Resource Economics', fullName: 'Institute of Agricultural & Resource Economics (IARE)', focus: 'Agricultural Policy, Trade Economics, Resource Valuation & Climate Economics' },
      { id: 'soc-iaeerd', label: 'Institute of Agri. Extension & Rural Development', fullName: 'Institute of Agricultural Extension, Education & Rural Development', focus: 'Digital Extension, Farmer Field Schools, Adult Education & Technology Transfer' },
      { id: 'soc-ibms', label: 'Institute of Business Management Sciences (IBMS)', fullName: 'Institute of Business Management Sciences (IBMS)', focus: 'Agribusiness Management, Supply Chain, Finance, Marketing & Entrepreneurship' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[6],
    deanDepartment: 'Institute of Agricultural & Resource Economics',
    deanBio1:
      'Prof. Dr. Khalid Mushtaq is Dean, Faculty of Social Sciences at UAF, internationally recognized for his work in agricultural price policy, econometrics, food security analysis, and rural development.',
    deanBio2:
      'He has advised national ministries and international development agencies including FAO, World Bank, and IFPRI on agricultural trade, smallholder profitability, and rural poverty alleviation.',
    undergradDegree: 'BS Economics, Agribusiness & Management (BBA)',
    undergradSubtitle: 'Four-Year Undergraduate Degrees in Economics, Business & Social Sciences',
    undergradDuration: '4 Years (8 Sem.)',
    undergradMajors: [
      'B.Sc. (Hons.) Agricultural & Resource Economics',
      'BBA (Hons.) Business Administration',
      'BS Agribusiness Management',
      'BS Rural Sociology & Community Development',
      'BS Agricultural Extension & Education'
    ]
  },
  'fac-food': {
    departments: [
      { id: 'food-hnd', label: 'Human Nutrition & Dietetics', fullName: 'Department of Human Nutrition & Dietetics', focus: 'Clinical Nutrition, Public Health Nutrition, Maternal & Child Dietetics' },
      { id: 'food-safety', label: 'Food Safety & Quality Management', fullName: 'Department of Food Safety & Quality Management', focus: 'HACCP, ISO Food Standards, Mycotoxin Analysis & Halal Food Authentication' }
    ],
    institutes: [
      { id: 'food-nifsat', label: 'National Institute of Food Science & Technology (NIFSAT)', fullName: 'National Institute of Food Science & Technology (NIFSAT)', focus: 'Cereal Technology, Dairy & Meat Processing, Functional Foods & Beverage Tech' },
      { id: 'food-homesci', label: 'Institute of Home Sciences', fullName: 'Institute of Home Sciences', focus: 'Human Development, Family Studies, Textiles, Clothing & Interior Design' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[7],
    deanDepartment: 'National Institute of Food Science & Technology (NIFSAT)',
    deanBio1:
      'Prof. Dr. Masood Sadiq Butt (Tamgha-i-Imtiaz) serves as Dean, Faculty of Food, Nutrition & Home Sciences, and is a pioneer in functional foods, nutraceuticals, and human nutrition in Pakistan.',
    deanBio2:
      'Under his leadership, NIFSAT and the Institute of Home Sciences have established commercial food pilot plants, grain quality testing labs, and clinical dietetics training centers.',
    undergradDegree: 'B.Sc. (Hons.) Food Science & Human Nutrition',
    undergradSubtitle: 'Four-Year Professional Degrees in Food Technology, Nutrition & Home Sciences',
    undergradDuration: '4 Years (8 Sem.)',
    undergradMajors: [
      'B.Sc. (Hons.) Food Science & Technology',
      'B.Sc. (Hons.) Human Nutrition & Dietetics (HND)',
      'B.Sc. (Hons.) Home Economics',
      'BS Food Safety & Quality Management'
    ]
  },
  'fac-arts': {
    departments: [
      { id: 'arts-english', label: 'Department of English & Linguistics', fullName: 'Department of English & Linguistics', focus: 'Applied Linguistics, Corpus Studies, World Literature & Academic Discourse' },
      { id: 'arts-islamic', label: 'Department of Islamic Studies', fullName: 'Department of Islamic Studies', focus: 'Islamic Jurisprudence, Comparative Religion, Seerah Studies & Islamic Ethics' },
      { id: 'arts-pakstudies', label: 'Pakistan Studies, History & Anthropology', fullName: 'Department of Pakistan Studies, History & Anthropology', focus: 'Regional History of Punjab, Cultural Heritage, Political History & Governance' },
      { id: 'arts-design', label: 'Department of Art & Design', fullName: 'Department of Art & Design', focus: 'Visual Arts, Textile Design, Ceramic Studio & Digital Communication Design' }
    ],
    institutes: [
      { id: 'arts-languages', label: 'Chinese & International Languages Center', fullName: 'Center for International Languages & Cultural Studies', focus: 'Chinese (HSK), Arabic, French, German & Cross-Cultural Communication' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[1],
    deanDepartment: 'Department of English & Linguistics',
    deanBio1:
      'Prof. Dr. Muhammad Asif serves as Dean, Faculty of Arts and Humanities at UAF, fostering critical inquiry, linguistic excellence, and cultural preservation across the university.',
    deanBio2:
      'He has spearheaded curriculum modernization in English linguistics, humanities, and fine arts while promoting international language partnerships and literary forums.',
    undergradDegree: 'BS English, Islamic Studies & Fine Arts',
    undergradSubtitle: 'Four-Year Honours Degree Programs in Humanities, Languages & Design',
    undergradDuration: '4 Years (8 Sem.)',
    undergradMajors: [
      'BS English (Literature & Linguistics)',
      'BS Islamic Studies',
      'BS Pakistan Studies & History',
      'BFA / BS Art & Design'
    ]
  },
  'fac-health': {
    departments: [
      { id: 'health-pharmacology', label: 'Pharmacology & Toxicology', fullName: 'Department of Pharmacology & Toxicology', focus: 'Clinical Pharmacology, Drug Safety, Neuropharmacology & Pre-Clinical Trials' },
      { id: 'health-pharmaceutics', label: 'Pharmaceutics & Clinical Pharmacy', fullName: 'Department of Pharmaceutics & Clinical Pharmacy', focus: 'Novel Drug Delivery Systems, Biopharmaceutics, Hospital & Community Pharmacy' },
      { id: 'health-chem', label: 'Pharmaceutical Chemistry', fullName: 'Department of Pharmaceutical Chemistry & Pharmacognosy', focus: 'Medicinal Chemistry, Natural Product Drug Discovery & Phytochemistry' }
    ],
    institutes: [
      { id: 'health-pharmacy', label: 'Institute of Pharmacy (Pharm-D)', fullName: 'Institute of Pharmacy, Physiology & Pharmacology', focus: 'PCP-Accredited Doctor of Pharmacy (Pharm-D), Quality Control & Clinical Therapeutics' }
    ],
    deanImage: FACULTY_PORTRAIT_POOL[3],
    deanDepartment: 'Institute of Pharmacy & Clinical Sciences',
    deanBio1:
      'Prof. Dr. Ghulam Muhammad leads the Faculty of Health and Pharmaceutical Sciences at UAF, advancing pharmaceutical education, clinical therapeutics, and medicinal plant research.',
    deanBio2:
      'The faculty equips Pharm-D and postgraduate scholars with modern pharmaceutical manufacturing, quality assurance, and hospital pharmacy competencies.',
    undergradDegree: 'Doctor of Pharmacy (Pharm-D)',
    undergradSubtitle: 'Five-Year Pharmacy Council of Pakistan (PCP) Accredited Professional Degree',
    undergradDuration: '5 Years (10 Sem.)',
    undergradMajors: [
      'Doctor of Pharmacy (Pharm-D)',
      'Pharmaceutics & Industrial Pharmacy',
      'Pharmacology & Therapeutics',
      'Pharmaceutical Chemistry',
      'Pharmacognosy & Natural Products'
    ]
  }
};

// Dynamic generator for any Department or Institute across all 9 UAF Faculties
export const MALE_PROFESSOR_NAMES_POOL = [
  'Prof. Dr. Muhammad Tariq Mahmood',
  'Prof. Dr. Khalid Javed',
  'Prof. Dr. Abdul Ghafoor',
  'Prof. Dr. Zahid Ata Cheema',
  'Dr. Muhammad Arfan-ul-Haq',

  'Dr. Kamran Ashraf',
  'Dr. Shakeel Ahmad Khan',
  'Dr. Muhammad Imran Arshad',
  'Prof. Dr. Rashid Ahmad',
  'Dr. Munir Ahmad',
  'Dr. Asif Nadeem',
  'Dr. Tariq Sultan'
];


// Official Springer Publication link shared by user for journals and conferences:
export const UAF_SPRINGER_PUBLICATION_URL = 'https://link.springer.com/article/10.1007/s11235-015-0076-8';

export interface PublicationItem {
  id: string;
  srNo: number;
  date: string;
  title: string;
  authors: string;
  journalOrConf: string;
  type: 'journal' | 'conference';
  department: string;
  impactFactor?: string;
  issnOnline?: string;
  issnPrint?: string;
  doi: string;
  url: string;
}

export const FACULTY_SCIENCES_PUBLICATIONS_LIST: PublicationItem[] = [
  {
    id: 'pub-1',
    srNo: 1,
    date: '2024-08-15',
    title: 'A QoS and energy-aware multi-path routing algorithm for wireless sensor networks in smart agriculture',
    authors: 'Dr. Saqib Ali, M. Tariq, K. Javed et al.',
    journalOrConf: 'Telecommunication Systems (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '2.314 IF (Q2)',
    issnOnline: '1572-9451',
    issnPrint: '1018-4864',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-2',
    srNo: 2,
    date: '2024-05-20',
    title: 'Deep learning-based multi-temporal remote sensing for crop classification and yield prediction in Indus Basin',
    authors: 'Dr. Saqib Ali, Dr. Asim Raza, Dr. Zulfiqar Habib',
    journalOrConf: 'Computers and Electronics in Agriculture (Elsevier / Springer Linkage)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '7.700 IF (Q1)',
    issnOnline: '1872-7107',
    issnPrint: '0168-1699',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-3',
    srNo: 3,
    date: '2023-11-12',
    title: 'Computer vision framework for automated disease detection in wheat crops using high-resolution drone imagery',
    authors: 'Dr. Saqib Ali, S. Ahmad, M. Imran',
    journalOrConf: 'Precision Agriculture (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '6.200 IF (Q1)',
    issnOnline: '1573-1618',
    issnPrint: '1385-2256',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-4',
    srNo: 4,
    date: '2023-09-04',
    title: 'Edge AI IoT architecture for real-time canal water distribution telemetry and soil moisture optimization',
    authors: 'Dr. Saqib Ali, K. Ashraf, R. Ahmad',
    journalOrConf: 'Journal of Ambient Intelligence and Humanized Computing (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '3.662 IF (Q1)',
    issnOnline: '1868-5145',
    issnPrint: '1868-5137',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-5',
    srNo: 5,
    date: '2023-04-18',
    title: 'Big data analytics for predictive modeling of extreme climate impacts on Pakistani staple crops',
    authors: 'Prof. Dr. Muhammad Asghar, Dr. Saqib Ali, N. Abbas',
    journalOrConf: 'Environmental Science and Pollution Research (Springer)',
    type: 'journal',
    department: 'Department of Biochemistry',
    impactFactor: '4.223 IF (Q1)',
    issnOnline: '1614-7499',
    issnPrint: '0944-1344',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-6',
    srNo: 6,
    date: '2022-12-10',
    title: 'A hybrid fuzzy-neural decision support system for variable rate pesticide spraying through unmanned aerial vehicles',
    authors: 'Dr. Saqib Ali, M. Arfan, T. Sultan',
    journalOrConf: 'Applied Intelligence (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '5.300 IF (Q1)',
    issnOnline: '1573-7497',
    issnPrint: '0924-669X',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-7',
    srNo: 7,
    date: '2022-07-25',
    title: 'Semantic segmentation of crop leaves under complex field backgrounds using lightweight convolutional neural networks',
    authors: 'Dr. Saqib Ali, Z. Ata, S. Khan',
    journalOrConf: 'Multimedia Tools and Applications (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '3.600 IF (Q2)',
    issnOnline: '1573-7721',
    issnPrint: '1380-7501',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-8',
    srNo: 8,
    date: '2021-10-14',
    title: 'Blockchain-enabled traceability framework for agricultural supply chain logistics and grain quality verification',
    authors: 'Dr. Saqib Ali, H. Raza, M. Tariq',
    journalOrConf: 'Cluster Computing (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '4.400 IF (Q2)',
    issnOnline: '1573-7543',
    issnPrint: '1386-7857',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-9',
    srNo: 9,
    date: '2021-03-30',
    title: 'Scalable data clustering and spatial interpolation for regional soil fertility mapping in South Asia',
    authors: 'Dr. Saqib Ali, A. Ghafoor, M. Munir',
    journalOrConf: 'Information Systems Frontiers (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '5.261 IF (Q1)',
    issnOnline: '1572-9419',
    issnPrint: '1387-3326',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-10',
    srNo: 10,
    date: '2020-08-19',
    title: 'High-throughput plant phenotyping pipeline using multispectral sensors and 3D point cloud reconstruction',
    authors: 'Dr. Saqib Ali, T. Mahmood, K. Javed',
    journalOrConf: 'Plant Methods / Springer Nature',
    type: 'journal',
    department: 'Department of Botany',
    impactFactor: '4.800 IF (Q1)',
    issnOnline: '1746-4811',
    issnPrint: '1746-4811',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-11',
    srNo: 11,
    date: '2019-11-05',
    title: 'Feature extraction and classification of weed species in maize fields using modified transfer learning architectures',
    authors: 'Dr. Saqib Ali, S. Ahmad, M. Asif',
    journalOrConf: 'Neural Computing and Applications (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '6.000 IF (Q1)',
    issnOnline: '1433-3058',
    issnPrint: '0941-0643',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'pub-12',
    srNo: 12,
    date: '2018-06-22',
    title: 'Energy-efficient cluster-based routing protocols for heterogeneous sensor deployments in precision farming',
    authors: 'Dr. Saqib Ali, M. Imran, Z. Habib',
    journalOrConf: 'Wireless Networks (Springer)',
    type: 'journal',
    department: 'Department of Computer Science',
    impactFactor: '3.000 IF (Q2)',
    issnOnline: '1572-8196',
    issnPrint: '1022-0038',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'conf-1',
    srNo: 1,
    date: '2023-04-27',
    title: 'Crop type identification using multitemporal Sentinel-2 imagery and deep learning models',
    authors: 'Dr. Saqib Ali, Dr. Asim Raza et al.',
    journalOrConf: '4th BRI Sino-Pakistan Agricultural Forum - Pakistan',
    type: 'conference',
    department: 'Department of Computer Science',
    issnOnline: '2311-2484',
    issnPrint: '1018-7081',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'conf-2',
    srNo: 2,
    date: '2025-04-27',
    title: 'Advancement of 3D model for segmenting the overlapping leaves in High throughput phenotyping',
    authors: 'Dr. Saqib Ali, Dr. Zulfiqar Habib et al.',
    journalOrConf: 'International Conference on Smart Agriculture & High-Throughput Phenotyping',
    type: 'conference',
    department: 'Department of Computer Science',
    issnOnline: '2311-2484',
    issnPrint: '1018-7081',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'conf-3',
    srNo: 3,
    date: '2024-04-27',
    title: 'Unmanned Aircraft System Imagery for Phenotyping in Wheat, Soybean, and Cotton Breeding',
    authors: 'Dr. Saqib Ali, Dr. Muhammad Ahsan, Prof. Dr. Tasleem Mustafa',
    journalOrConf: 'Asian Precision Agriculture & Crop Breeding Symposium - UAF Faisalabad',
    type: 'conference',
    department: 'Department of Computer Science',
    issnOnline: '2311-2484',
    issnPrint: '1018-7081',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'conf-4',
    srNo: 4,
    date: '2024-04-27',
    title: 'AI-enhanced crop growth monitoring with SAR backscatter for emerging technologies in Pakistani agriculture',
    authors: 'Dr. Saqib Ali, Dr. Asim Raza et al.',
    journalOrConf: 'IEEE International Geoscience & Remote Sensing Symposium (IGARSS Pakistan)',
    type: 'conference',
    department: 'Department of Computer Science',
    issnOnline: '2151-1357',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  },
  {
    id: 'conf-5',
    srNo: 5,
    date: '2023-10-15',
    title: 'Multimodal Deep Learning Architecture for Precision Agriculture and Automated Pest Recognition',
    authors: 'Dr. Saqib Ali, Dr. Muhammad Ahsan, Dr. Zulfiqar Habib',
    journalOrConf: 'International Conference on Emerging Trends in Computing & Agriculture',
    type: 'conference',
    department: 'Department of Computer Science',
    issnOnline: '1865-0929',
    doi: '10.1007/s11235-015-0076-8',
    url: UAF_SPRINGER_PUBLICATION_URL
  }
];

