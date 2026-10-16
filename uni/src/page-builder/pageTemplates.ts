// ─────────────────────────────────────────────────────────────────────────────
//  UAF ACADEMIC & FACULTY PAGE TEMPLATES
//  Pre-built, standardized templates matching the real UAF Academic Portal,
//  Faculty Directories, Staff Profiles, Springer Publications, Degree Matrices,
//  Internships, and Department Facilities.
// ─────────────────────────────────────────────────────────────────────────────

import { themeElement } from './uafTheme';
import type { PrimitiveElement } from './elementPrimitives';

const IMG = {
  logo: '/uaf_logo.png',
  facade: '/uaf_facade_no_road.jpg',
  grounds: '/uaf_historic_campus.jpg',
  aerial: '/uaf_aerial_quadrangle.jpg',
  mainGate: '/uaf_main_gate_sunset.jpg',
  mainBuilding: '/uaf_main_building_renewed.jpg',
  portraits: [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80'
  ]
};

let base = '';
let seq = 0;
const start = () => {
  base = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  seq = 0;
};
const uid = () => `el-${base}-${(seq++).toString(36)}`;
const place = (o: any, x: number, y: number, width: number, height: number): PrimitiveElement => ({
  ...o,
  id: uid(),
  x,
  y,
  width,
  height
});
const fix = (list: PrimitiveElement[]) => list.map((el) => ({ ...el, fixed: true }));

const box = (look: string, x: number, y: number, w: number, h: number) =>
  place({ type: 'container', look, shapeType: 'rectangle', style: {} }, x, y, w, h);

const text = (look: string, t: string, x: number, y: number, w: number, h: number, opt: any = {}) =>
  place({ type: 'text', look, text: t, style: opt.align ? { align: opt.align } : {}, ...opt }, x, y, w, h);

const link = (look: string, t: string, x: number, y: number, w: number, url = '#') =>
  place({ type: 'hyperlink', look, text: t, url, showUnderline: false, showExternalIcon: false, style: {} }, x, y, w, 22);

const button = (look: string, label: string, x: number, y: number, w: number, h = 44, opt: any = {}) =>
  place({ type: 'button', look, label, url: '', iconName: opt.iconName || 'ArrowRight', style: {} }, x, y, w, h);

const image = (src: string, x: number, y: number, w: number, h: number, opt: any = {}) =>
  place({ type: 'image', src, alt: '', caption: '', shape: 'rounded', objectFit: 'cover', style: {}, ...opt, height: h }, x, y, w, h);

const list = (look: string, title: string, items: string[], x: number, y: number, w: number, h: number, bullet = 'check') =>
  place({ type: 'list', look, title, items, bulletStyle: bullet, showBullets: bullet !== 'none', style: {} }, x, y, w, h);

const field = (label: string, placeholder: string, inputType: string, x: number, y: number, w: number, h: number, opt: any = {}) =>
  place({ type: 'input', label, placeholder, inputType, options: '', style: {}, ...opt }, x, y, w, h);

const rule = (look: string, x: number, y: number, w: number) =>
  place({ type: 'divider', look, style: {} }, x, y, w, 20);

const card = (opt: any, x: number, y: number, w: number, h: number) =>
  place({ type: 'card', badgeTag: '', buttonLabel: '', imageUrl: '', style: {}, ...opt }, x, y, w, h);

const facultyCard = (opt: any, x: number, y: number, w: number, h: number) =>
  place({ type: 'faculty-card', style: {}, ...opt }, x, y, w, h);

const table = (opt: any, x: number, y: number, w: number, h: number) =>
  place({ type: 'table', style: {}, ...opt }, x, y, w, h);

// Standard UAF Header (84px) - locked for branding
const header = () =>
  fix([
    box('nav', 0, 0, 1200, 84),
    image(IMG.logo, 40, 14, 56, 56, { shape: 'circle', objectFit: 'contain', alt: 'UAF logo', badge: true }),
    text('brandSmall', 'University of', 112, 16, 220, 14),
    text('brand', 'Agriculture', 112, 30, 280, 28),
    text('brandAccent', 'Faisalabad', 112, 58, 220, 14),
    link('light', 'Home', 410, 31, 56),
    link('light', 'About', 490, 31, 56),
    link('light', 'Academics', 580, 31, 86),
    link('light', 'Admissions', 686, 31, 96),
    link('light', 'Research', 800, 31, 80),
    link('light', 'Faculty', 898, 31, 70),
    button('gold', 'Portal Login', 1000, 22, 160, 40, { iconName: 'None' })
  ]);

// Standard UAF Footer (310px) - locked for branding
const footer = (y: number) =>
  fix([
    box('navy', 0, y, 1200, 310),
    text('subtitleLight', 'University of Agriculture, Faisalabad', 80, y + 48, 470, 30),
    text('smallLight', "Pakistan's premier agricultural, veterinary, engineering and science university, serving the nation since 1906.", 80, y + 88, 380, 80),
    text('subtitleLight', 'Academic Portals', 560, y + 48, 200, 30),
    link('light', 'Faculty of Agriculture', 560, y + 90, 200),
    link('light', 'Faculty of Sciences', 560, y + 120, 200),
    link('light', 'Faculty Directory', 560, y + 150, 200),
    link('light', 'Postgraduate Research', 560, y + 180, 200),
    text('subtitleLight', 'Dean / Department Office', 820, y + 48, 300, 30),
    text('smallLight', '+92 (41) 9200161-70 Ext. 2900', 820, y + 90, 300, 22),
    text('smallLight', 'dean.agri@uaf.edu.pk', 820, y + 118, 300, 22),
    text('smallLight', 'Dean Secretariat, UAF Main Campus, Faisalabad 38040', 820, y + 146, 300, 44),
    rule('onDark', 80, y + 242, 1040),
    text('smallLight', '© 2026 University of Agriculture, Faisalabad. All rights reserved.', 80, y + 268, 800, 20)
  ]);

const banner = (src: string, h: number) => [
  image(src, 0, 84, 1200, h, { shape: 'square', alt: 'UAF Campus' }),
  box('overlay', 0, 84, 1200, h)
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. ACADEMIC FACULTY OVERVIEW (Mother Faculty - Exactly matches Image 2)
// ─────────────────────────────────────────────────────────────────────────────
const facultyPortalOverview = () => [
  // Main Overview Card with Green Accent: Left Text & Bullets + Right Framed Photo
  box('card', 80, 40, 1040, 370),
  text(
    'body',
    'The Faculty of Animal Husbandry spearheads livestock breeding, dairy cattle management, poultry science, and animal nutrition technologies to safeguard food security and boost milk and meat yields nationwide.',
    110,
    64,
    580,
    64
  ),
  text(
    'body',
    '• Academic Divisions: Comprises 6 Departments (Agronomy, Plant Breeding & Genetics, Soil & Environmental Sciences, Entomology, Plant Pathology, Forestry & Range Management) and 1 Constituent Institute(s) (Institute of Horticultural Sciences).',
    110,
    136,
    580,
    72
  ),
  text(
    'body',
    '• Flagship Degree & Major Options: Offers B.Sc. (Hons.) Agriculture along with M.Sc. (Hons.) / M.Phil. and Ph.D. specializations in Agronomy, Plant Breeding & Genetics, Soil Science, Entomology, Plant Pathology, Horticulture, Forestry, Agricultural Biotechnology etc.',
    110,
    214,
    580,
    72
  ),
  text(
    'body',
    '• Research & Industry Linkages: Supported by HEC-approved Ph.D. supervisors, international collaborative grants, and mandatory hands-on clinical/field internship programs.',
    110,
    292,
    580,
    64
  ),
  // Right side framed building photo with caption and sub-label
  image(IMG.grounds, 720, 64, 375, 230, {
    alt: 'Academic Complex',
    caption: '',
    shape: 'rounded'
  }),
  text('subtitle', 'Animal Husbandry Academic Complex', 720, 305, 375, 24, { align: 'center' }),
  text('small', 'Est. 1906 • University of Agriculture, Faisalabad', 720, 332, 375, 20, { align: 'center' }),

  // 3 Metric Highlight Cards Underneath (Row 2)
  box('card', 80, 435, 330, 95),
  text('label', 'ACADEMIC UNITS', 104, 452, 280, 18),
  text('hero', '4 Departments', 104, 474, 280, 40),

  box('card', 435, 435, 330, 95),
  text('label', 'SPECIALIZED INSTITUTES', 459, 452, 280, 18),
  text('hero', '1 Institute', 459, 474, 280, 40),

  box('card', 790, 435, 330, 95),
  text('label', 'FACILITIES & LABS', 814, 452, 280, 18),
  text('hero', '2 Livestock Farms', 814, 474, 280, 40)
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. FACULTY & STAFF DIRECTORY (4-Cards-per-Row Grid)
// ─────────────────────────────────────────────────────────────────────────────
const facultyDirectory = () => [
  box('card', 80, 40, 1040, 120),
  text('labelGold', 'FACULTY OF AGRICULTURE • DEPARTMENT OF AGRONOMY', 110, 56, 700, 18),
  text('pageTitle', 'Faculty Directory', 110, 80, 900, 40),
  text('body', 'Distinguished academic professors, researchers and HEC approved supervisors. Click any card to edit.', 110, 124, 800, 24),

  // Summary Badge Row
  box('light', 80, 175, 1040, 50),
  text('label', '07 Professors • 07 Associate Professors • 02 Assistant Professors • 01 Lecturer', 104, 190, 990, 20),

  // Row 1 of Faculty Cards (4 per row: width 242px each, gap 24px)
  ...[
    {
      name: 'Prof. Dr. Ehsanullah',
      desig: 'Professor',
      phone: '+92 41 9200161 Ext: 2901',
      email: 'ehsanullah@uaf.edu.pk',
      spec: 'Crop Husbandry, Precision Agro-Technology & Agro-Climatology',
      img: IMG.portraits[0]
    },
    {
      name: 'Prof. Dr. Muhammad Asghar',
      desig: 'Professor',
      phone: '+92 41 9200161 Ext: 2902',
      email: 'asghar@uaf.edu.pk',
      spec: 'Plant Stress Physiology & Sustainable Cereal Systems',
      img: IMG.portraits[1]
    },
    {
      name: 'Dr. Saqib Ali',
      desig: 'Chairman / Professor',
      phone: '+92 41 9200161 Ext: 2903',
      email: 'saqib@uaf.edu.pk',
      spec: 'Artificial Intelligence, Big Data Analytics & Precision Agri-IoT',
      img: IMG.portraits[2]
    },
    {
      name: 'Dr. Waseem Akram',
      desig: 'Professor',
      phone: '+92 41 9200161 Ext: 2904',
      email: 'waseem@uaf.edu.pk',
      spec: 'Vector Borne Disease Management & Biosystematics',
      img: IMG.portraits[3]
    }
  ].flatMap((fac, i) => {
    const x = 80 + i * 268;
    return [
      facultyCard(
        {
          memberName: fac.name,
          designation: fac.desig,
          phone: fac.phone,
          email: fac.email,
          specialization: fac.spec,
          portraitUrl: fac.img
        },
        x,
        240,
        244,
        380
      )
    ];
  }),

  // Row 2 of Faculty Cards
  ...[
    {
      name: 'Dr. Asim Raza',
      desig: 'Associate Professor',
      phone: '+92 41 9200161 Ext: 2905',
      email: 'asim.raza@uaf.edu.pk',
      spec: 'Machine Learning, Remote Sensing & Spatial Data Modeling',
      img: IMG.portraits[4]
    },
    {
      name: 'Dr. Bilal Saeed Khan',
      desig: 'Associate Professor',
      phone: '+92 41 9200161 Ext: 2906',
      email: 'dr.bilal.saeed@uaf.edu.pk',
      spec: 'Agricultural Acarology & Predatory Mite Biological Control',
      img: IMG.portraits[5]
    },
    {
      name: 'Dr. Rashad Rasool Khan',
      desig: 'Assistant Professor',
      phone: '+92 41 9200161 Ext: 2907',
      email: 'rashadkhan@uaf.edu.pk',
      spec: 'Eco-Toxicology & Beneficial Arthropod Biodiversity',
      img: IMG.portraits[6]
    },
    {
      name: 'Dr. Muhammad Dildar Gogi',
      desig: 'Assistant Professor',
      phone: '+92 41 9200161 Ext: 2908',
      email: 'drmdgogi@uaf.edu.pk',
      spec: 'Fruit Fly Integrated Pest Management & Ecological Pest Control',
      img: IMG.portraits[7]
    }
  ].flatMap((fac, i) => {
    const x = 80 + i * 268;
    return [
      facultyCard(
        {
          memberName: fac.name,
          designation: fac.desig,
          phone: fac.phone,
          email: fac.email,
          specialization: fac.spec,
          portraitUrl: fac.img
        },
        x,
        640,
        244,
        380
      )
    ];
  })
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. STAFF & TECHNICAL OFFICERS DIRECTORY (Circular Photos & Fully Editable Cards)
// ─────────────────────────────────────────────────────────────────────────────
const staffDirectory = () => [
  box('card', 80, 40, 1040, 110),
  text('labelGold', 'FACULTY OF AGRICULTURE • ADMINISTRATIVE & TECHNICAL CADRE', 110, 56, 700, 18),
  text('pageTitle', 'Staff & Technical Officers Directory', 110, 80, 900, 36),
  text('body', 'Dedicated administrative, laboratory, and field research officers. Click any card text or photo to edit in-place.', 110, 118, 850, 22),

  // Summary Badge Row
  box('light', 80, 165, 1040, 46),
  text('label', '01 Superintendent • 02 Lab Technologists • 02 Senior Clerks • 03 Research Field Officers', 104, 178, 990, 20),

  // Row 1 of Staff Cards - Circular Photos, Fully In-Place Editable, Zero "See Detail" Buttons
  ...[
    { name: 'Mr. Tariq Mehmood', desig: 'Superintendent', phone: '+92 41 9200161 Ext. 2910', email: 'tariq.admin@uaf.edu.pk', spec: 'Dean Office Administration & Records Room 102', img: IMG.portraits[4] },
    { name: 'Mr. Shahid Iqbal', desig: 'Senior Lab Technologist', phone: '+92 41 9200161 Ext. 2912', email: 'shahid.lab@uaf.edu.pk', spec: 'Crop Physiology & Precision Sensor Lab 3', img: IMG.portraits[5] },
    { name: 'Mr. Muhammad Ramzan', desig: 'Farm Field Assistant', phone: '+92 41 9200161 Ext. 2914', email: 'ramzan.farm@uaf.edu.pk', spec: 'Agronomy Experimental Testbeds & Farms Plot B', img: IMG.portraits[6] },
    { name: 'Mr. Kamran Akram', desig: 'Senior Clerk / IT Assistant', phone: '+92 41 9200161 Ext. 2916', email: 'kamran.it@uaf.edu.pk', spec: 'Student Enrollment, Examinations & LMS Lab', img: IMG.portraits[7] }
  ].flatMap((st, i) => {
    const x = 80 + i * 268;
    return [
      facultyCard(
        {
          memberName: st.name,
          designation: st.desig,
          phone: st.phone,
          email: st.email,
          specialization: st.spec,
          portraitUrl: st.img,
          shape: 'circle',
          photoShape: 'circle'
        },
        x,
        230,
        244,
        380
      )
    ];
  }),

  // Row 2 of Staff Cards - Circular Photos, Fully In-Place Editable
  ...[
    { name: 'Engr. Bilal Ahmad', desig: 'Instrumentation Engineer', phone: '+92 41 9200161 Ext. 2918', email: 'bilal.eng@uaf.edu.pk', spec: 'Spectrophotometry & Chromatography Maintenance', img: IMG.portraits[0] },
    { name: 'Mr. Zafar Abbas', desig: 'Field Research Supervisor', phone: '+92 41 9200161 Ext. 2920', email: 'zafar.field@uaf.edu.pk', spec: 'Weed Herbicide Trials & Seed Multiplication Block', img: IMG.portraits[1] },
    { name: 'Mr. Naveed Akhtar', desig: 'Laboratory Assistant', phone: '+92 41 9200161 Ext. 2922', email: 'naveed.lab@uaf.edu.pk', spec: 'Soil & Plant Tissue Nutrient Analysis Lab', img: IMG.portraits[2] },
    { name: 'Mr. Asif Mehmood', desig: 'Junior Clerk / Dispatcher', phone: '+92 41 9200161 Ext. 2924', email: 'asif.dispatch@uaf.edu.pk', spec: 'Department Diary & Student Inquiries Desk', img: IMG.portraits[3] }
  ].flatMap((st, i) => {
    const x = 80 + i * 268;
    return [
      facultyCard(
        {
          memberName: st.name,
          designation: st.desig,
          phone: st.phone,
          email: st.email,
          specialization: st.spec,
          portraitUrl: st.img,
          shape: 'circle',
          photoShape: 'circle'
        },
        x,
        630,
        244,
        380
      )
    ];
  })
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. FACULTY MEMBER PROFILE & SPRINGER PUBLICATIONS (No See Detail Buttons)
// ─────────────────────────────────────────────────────────────────────────────
const facultyProfilePublications = () => [
  // Left Column: Top Card (Circular Portrait with Green Ring & HEC Badge)
  box('card', 80, 40, 260, 270),
  image(IMG.portraits[5], 110, 60, 200, 200, {
    alt: 'Dr. Haroon Zaman Khan',
    shape: 'circle'
  }),
  button('outline', '🛡️ HEC Approved Supervisor: Yes', 95, 270, 230, 32, { iconName: 'None' }),

  // Left Column: Bottom Card with Green Accent Border (Contact & Address)
  box('card', 80, 330, 260, 255),
  text('small', '✉️ Email: haroon.zaman@uaf.edu.pk', 96, 345, 230, 22),
  text('small', '✉️ Secondary Email: N/A', 96, 375, 230, 22),
  text('small', '📞 Phone: +92419200161 - Ext. 3177', 96, 405, 230, 22),
  text('small', '🛡️ HEC Supervisor: Yes', 96, 435, 230, 22),
  text('small', '📍 Address: Department of Agronomy, Faculty of Animal Husbandry, University of Agriculture, Faisalabad', 96, 465, 230, 68),

  // Right Column: Main Profile Card
  box('card', 360, 40, 760, 500),
  text('hero', 'Dr. Haroon Zaman Khan', 390, 60, 700, 48),
  text('label', 'Chairman / Professor', 390, 114, 700, 26),
  text('small', 'Education: Ph.D. (UAF) • Post-Doc  |  Specialization: Crop Husbandry', 390, 142, 700, 22),
  text('subtitle', 'Biography & Academic Profile', 390, 180, 700, 28),
  text(
    'body',
    'Dr. Haroon Zaman Khan serves as Chairman / Professor in the Department of Agronomy, Faculty of Animal Husbandry, University of Agriculture, Faisalabad (UAF). Holding a Ph.D. (UAF) • Post-Doc degree with specialization in Crop Husbandry, active HEC Approved Supervisor dedicated to undergraduate and postgraduate mentorship, curriculum innovation, and applied research.',
    390,
    212,
    700,
    80
  ),

  // Green Tinted Box: Research Areas
  box('tint', 390, 305, 700, 72),
  text('label', 'RESEARCH AREAS & SUPERVISION FOCUS:', 410, 316, 660, 20),
  text('subtitle', 'Crop Husbandry, Weed Science & Climate Modeling', 410, 338, 660, 28),

  // Two Counter Cards (Clean - "See in Detail" option removed as requested)
  box('card', 390, 395, 335, 125),
  text('label', 'RESEARCH OUTPUT', 410, 410, 295, 18),
  text('title', 'Journals', 410, 432, 295, 28),
  text('hero', '6 Total Journals', 410, 466, 295, 36),

  box('card', 755, 395, 335, 125),
  text('label', 'SCHOLARLY PRESENTATIONS', 775, 410, 295, 18),
  text('title', 'Conferences & Publications', 775, 432, 295, 28),
  text('hero', '4 Total Conferences', 775, 466, 295, 36),

  // Strict Springer Publications Table
  table(
    {
      tableTitle: 'Selected High-Impact Publications (Springer Nature Linkage)',
      tableColumns: [
        { key: 'srNo', label: 'Sr. #', width: '80px' },
        { key: 'title', label: 'Paper Name', width: '48%' },
        { key: 'venue', label: 'Journal Name', width: '32%' },
        { key: 'url', label: 'Link', width: '120px' }
      ],
      tableRows: [
        {
          srNo: '01',
          title: 'Advanced Research on Crop Husbandry & Agro-Technology in Agro-Ecological Zones of Punjab',
          venue: 'Pakistan Journal of Agricultural Sciences (Springer Linkage)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        },
        {
          srNo: '02',
          title: 'Precision Agro-Technology and Nitrogen Dynamics in Semi-Arid Agro-Climatic Zones',
          venue: 'Telecommunication Systems & Agricultural Sensors (Springer Nature)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        },
        {
          srNo: '03',
          title: 'High-Throughput Remote Sensing and AI Crop Canopy Modeling for Cereal Systems',
          venue: 'Computers & Electronics in Agriculture (Springer)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        }
      ]
    },
    80,
    570,
    1040,
    300
  )
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. DEPARTMENT ACADEMIC OVERVIEW (Unified Left Text & Right Image Layout)
// ─────────────────────────────────────────────────────────────────────────────
const departmentOverview = () => [
  // Department Academic Overview: Left Text & Right Image (Zero Overlap, No duplicate nav bar)
  box('card', 80, 40, 1040, 420),
  text('labelGold', 'DEPARTMENT ACADEMIC OVERVIEW • ESTABLISHED 1906', 110, 64, 600, 18),
  text('title', 'Department of Agronomy — Overview', 110, 88, 600, 40),
  text(
    'body',
    'The Department of Agronomy was established with the inception of the Punjab Agricultural College and Research Institute, Lyallpur in 1906. As one of the foundational academic pillars, it has led human resource development and high-yielding crop production packages that catalyzed the Green Revolution in Pakistan.',
    110,
    140,
    600,
    76
  ),
  text(
    'body',
    'With university status in 1961, the department expanded graduate research programs, managing 1,950 acres of experimental testbeds, postgraduate climate simulation chambers, and precision crop laboratories.',
    110,
    224,
    600,
    66
  ),
  text(
    'small',
    'Up till today, the Department has produced over 3,200 B.Sc. (Hons), 2,800 M.Sc. (Hons) and 180 Ph.D. scholars serving in multinational agribusinesses and research institutions.',
    110,
    300,
    600,
    44
  ),
  // Right side framed building photo (compact, zero overlap, option to change image)
  image(IMG.grounds, 735, 64, 360, 270, {
    alt: 'Department Academic Complex',
    caption: 'Department Complex & Research Labs • Click to change photo',
    shape: 'rounded'
  }),

  // Research Laboratories & Professional Societies
  text('label', 'RESEARCH INFRASTRUCTURE', 80, 490, 500, 18),
  text('title', 'Professional Societies & Specialized Laboratories', 80, 518, 700, 40),
  ...[
    ['Pakistan Society of Agronomy', 'Publishing scientific crop research and organizing biennial national agronomy congresses.'],
    ['Precision Agriculture & Drone Lab', 'Multispectral UAV imaging, variable-rate fertilizer applicators, and IoT canopy sensors.'],
    ['Weed Science & Allelopathy Unit', 'Bio-herbicide development, herbicide-resistance monitoring, and integrated weed management.'],
    ['Agro-Climatology & Crop Modeling Cell', 'DSSAT & APSIM simulation models predicting climate change impact on cereal cropping systems.']
  ].flatMap(([t, d], i) => {
    const x = 80 + (i % 2) * 530;
    const y = 578 + Math.floor(i / 2) * 110;
    return [
      box('card', x, y, 510, 96),
      text('subtitle', t, x + 20, y + 16, 470, 24),
      text('small', d, x + 20, y + 44, 470, 40)
    ];
  })
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. DEPARTMENT DETAIL & DEGREE PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────
const departmentDetailPrograms = () => [
  // Department Detail Card with Left Text & Right Image (Zero Overlap, No nav bar)
  box('card', 80, 40, 1040, 360),
  text('labelGold', 'ACADEMIC DEGREE OFFERINGS & SPECIALIZATIONS', 110, 64, 600, 18),
  text('title', 'Department Academic Programs & Laboratories', 110, 88, 620, 38),
  text(
    'body',
    'Offering nationally accredited undergraduate and postgraduate degree programs recognized by the Higher Education Commission (HEC) and NAEAC. Equipped with 6 research laboratories, climate simulation chambers, and 1,950 acres of experimental farms.',
    110,
    134,
    620,
    70
  ),
  text(
    'small',
    'Academic Degrees: B.Sc. (Hons) Agriculture • M.Sc. (Hons) Agronomy • Ph.D. Agronomy',
    110,
    214,
    620,
    24
  ),
  button('primary', 'Apply for Admission', 110, 250, 200, 42),
  button('outline', 'Download Prospectus', 330, 250, 200, 42),
  // Right side image (compact, zero overlap)
  image(IMG.facade, 750, 64, 340, 230, {
    alt: 'Academic Facilities',
    caption: 'Department Research Complex • Option to change photo',
    shape: 'rounded'
  }),

  // Programs Grid
  ...[
    ['B.Sc. (Hons) Agriculture', '4-Year (8 Semesters) comprehensive bachelor degree with major specialization.', '136–144 Cr. Hrs'],
    ['M.Sc. (Hons) Agronomy', '2-Year (4 Semesters) postgraduate research degree with thesis defense.', '40–45 Cr. Hrs'],
    ['Ph.D. in Agronomy', '3 to 5 Years terminal doctoral research degree with international thesis review.', 'Published Springer Papers']
  ].flatMap(([t, d, c], i) => {
    const x = 80 + i * 355;
    return [
      box('card', x, 420, 330, 200),
      text('statGold', c, x + 20, 440, 290, 28),
      text('subtitle', t, x + 20, 475, 290, 28),
      text('small', d, x + 20, 510, 290, 60),
      link('default', 'View Curriculum Matrix →', x + 20, 575, 200)
    ];
  })
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. UNDERGRADUATE DEGREE PROGRAMS (B.Sc. Hons)
// ─────────────────────────────────────────────────────────────────────────────
const undergraduatePrograms = () => [
  box('green', 80, 40, 1040, 170),
  text('labelGold', 'UNDERGRADUATE ACADEMIC STUDIES • 2026-27', 110, 56, 600, 18),
  text('hero', 'B.Sc. (Hons.) Agriculture', 110, 80, 850, 60),
  text('bodyLight', 'Four-Year (8 Semesters) Comprehensive Bachelor of Science Degree Program', 110, 146, 750, 26),

  // Program Key Highlights
  box('light', 80, 230, 1040, 100),
  ...[
    ['Duration', '4 Years (8 Semesters)', '136–144 Credit Hours'],
    ['Eligibility', 'F.Sc. Pre-Medical / Pre-Engg', 'Minimum 60% + Entry Test'],
    ['Accreditation', 'HEC & NAEAC Accredited', 'W-Category Highest Rank']
  ].flatMap(([l, v, s], i) => [
    text('label', l, 110 + i * 340, 246, 300, 18),
    text('subtitle', v, 110 + i * 340, 268, 320, 26),
    text('small', s, 110 + i * 340, 296, 320, 20)
  ]),

  // Program Structure Breakdown
  text('label', 'CURRICULUM ARCHITECTURE', 80, 360, 500, 18),
  text('title', 'Four-Year Academic Journey', 80, 388, 700, 40),
  ...[
    ['Semesters 1 – 4', 'Multidisciplinary Foundation', 'Core courses in Agronomy, Soil Science, Entomology, Plant Pathology, PBG, Horticulture, Economics, and English Communication.'],
    ['Semesters 5 – 6', 'Advanced Subject Specialization', 'In-depth focus on crop physiology, weed management, seed production technology, precision agriculture, and field experimental design.'],
    ['Semesters 7 – 8', 'Internship & Research Project', 'Mandatory 6-month practical field internship with corporate agribusiness partners, progressive farms, followed by capstone thesis project.']
  ].flatMap(([s, t, d], i) => {
    const x = 80 + i * 355;
    return [
      box('card', x, 440, 330, 220),
      text('statGold', s, x + 20, 460, 290, 30),
      text('subtitle', t, x + 20, 500, 290, 28),
      text('small', d, x + 20, 536, 290, 80)
    ];
  }),

  // Course Curriculum Preview Table
  table(
    {
      tableTitle: 'Major Undergraduate Subject Courses (Sample Curriculum)',
      tableColumns: [
        { key: 'srNo', label: 'Course Code', width: '120px' },
        { key: 'title', label: 'Course Title', width: '50%' },
        { key: 'venue', label: 'Credit Hours', width: '22%' },
        { key: 'url', label: 'Syllabus', width: '120px' }
      ],
      tableRows: [
        { srNo: 'AGR-301', title: 'Basic Agriculture & Crop Production Fundamentals', venue: '3 (2-1) Cr. Hrs', url: 'https://web.uaf.edu.pk' },
        { srNo: 'AGR-401', title: 'Field Crop Physiology & Canopy Ecology', venue: '3 (2-1) Cr. Hrs', url: 'https://web.uaf.edu.pk' },
        { srNo: 'AGR-501', title: 'Weed Science & Herbicide Physiology', venue: '3 (2-1) Cr. Hrs', url: 'https://web.uaf.edu.pk' },
        { srNo: 'AGR-601', title: 'Seed Production, Conditioning & Certification Technology', venue: '3 (2-1) Cr. Hrs', url: 'https://web.uaf.edu.pk' },
        { srNo: 'AGR-602', title: 'Precision Agriculture, Sensors & Variable-Rate Technologies', venue: '3 (2-1) Cr. Hrs', url: 'https://web.uaf.edu.pk' }
      ]
    },
    80,
    690,
    1040,
    380
  )
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. POSTGRADUATE & PH.D. DEGREE PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────
const postgraduatePrograms = () => [
  box('navy', 80, 40, 1040, 170),
  text('labelGold', 'POSTGRADUATE & DOCTORAL STUDIES', 110, 56, 600, 18),
  text('hero', 'Postgraduate Research Degrees', 110, 80, 850, 60),
  text('bodyLight', 'Master of Science (M.Sc. Hons / M.Phil.) and Doctor of Philosophy (Ph.D.) Degrees', 110, 146, 750, 26),

  // Two Degree Matrix Cards
  box('card', 80, 230, 505, 330),
  text('statGold', 'M.Sc. (Hons.) / M.Phil.', 104, 254, 450, 36),
  text('subtitle', '2 Years (4 Semesters) • Advanced Research Degree', 104, 296, 450, 26),
  text(
    'body',
    'Rigorous advanced subject-matter courses followed by independent experimental field or laboratory research, public seminar defense, and external thesis evaluation across specialized agricultural disciplines.',
    104,
    330,
    450,
    80
  ),
  list(
    'plain',
    '',
    [
      'Minimum CGPA 2.50 / 4.00 in relevant undergraduate degree',
      'Valid UAF GAT / GRE Entry Test Score',
      'Synopsis defense before Department Supervisory Committee',
      'Publication of thesis research in HEC recognized journal'
    ],
    104,
    415,
    450,
    120,
    'check'
  ),

  box('card', 615, 230, 505, 330),
  text('stat', 'Doctor of Philosophy (Ph.D.)', 639, 254, 450, 36),
  text('subtitle', '3 – 5 Years • Terminal Research Fellowship', 639, 296, 450, 26),
  text(
    'body',
    'High-impact doctoral dissertation evaluated by international experts from technologically advanced nations, requiring comprehensive written and oral examinations and publications in indexed journals.',
    639,
    330,
    450,
    80
  ),
  list(
    'plain',
    '',
    [
      'Minimum CGPA 3.00 / 4.00 in M.Sc. (Hons) / M.Phil. degree',
      'Comprehensive written and oral examination clearance',
      'Dissertation evaluated by two foreign international referees',
      'At least one research publication in Springer / ISI indexed journal'
    ],
    639,
    415,
    450,
    120,
    'check'
  ),

  // Postgraduate Research Areas Table
  table(
    {
      tableTitle: 'Doctoral & Master Research Specializations Available',
      tableColumns: [
        { key: 'srNo', label: 'Sr. #', width: '80px' },
        { key: 'title', label: 'Research Specialization Field', width: '45%' },
        { key: 'venue', label: 'Hosting Laboratory / Farm', width: '35%' },
        { key: 'url', label: 'Supervisors', width: '120px' }
      ],
      tableRows: [
        { srNo: '01', title: 'Crop Husbandry & Precision Agro-Technology', venue: 'UAF Central Agronomy Farm (1,950 Acres)', url: 'https://web.uaf.edu.pk' },
        { srNo: '02', title: 'Molecular Insect Biosystematics & Vector Control', venue: 'National Insect Museum & Bio-Control Lab', url: 'https://web.uaf.edu.pk' },
        { srNo: '03', title: 'Plant Stress Physiology & Climate-Resilient Cereal Yields', venue: 'Controlled Environmental Growth Chambers', url: 'https://web.uaf.edu.pk' },
        { srNo: '04', title: 'Weed Ecology & Allelopathic Bio-Herbicide Formulation', venue: 'Weed Science & HPLC Chromatography Lab', url: 'https://web.uaf.edu.pk' }
      ]
    },
    80,
    590,
    1040,
    360
  )
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. MANDATORY PRACTICAL FIELD INTERNSHIP PROGRAM
// ─────────────────────────────────────────────────────────────────────────────
const internshipProgram = () => [
  box('olive', 80, 40, 1040, 170),
  text('labelGold', 'EXPERIENTIAL LEARNING • FINAL YEAR REQUIREMENT', 110, 56, 600, 18),
  text('hero', 'Mandatory Field Internship Program', 110, 80, 850, 60),
  text('bodyLight', 'Hands-on six-month field immersion with corporate agribusinesses and research institutes.', 110, 146, 750, 26),

  // 3 Key Stats
  box('light', 80, 230, 1040, 100),
  ...[
    ['Duration', '6 Months', 'Full-time field placement'],
    ['Corporate Linkages', '150+ Agribusiness Partners', 'National & Multinational firms'],
    ['Assessment Method', 'Field Log & Viva Defense', 'External industrial evaluation']
  ].flatMap(([l, v, s], i) => [
    text('label', l, 110 + i * 340, 246, 300, 18),
    text('subtitle', v, 110 + i * 340, 268, 320, 26),
    text('small', s, 110 + i * 340, 296, 320, 20)
  ]),

  // Detailed Description
  text('label', 'INTERNSHIP OBJECTIVES & SCOPE', 80, 360, 500, 18),
  text('title', 'Bridging Academic Theory with Real-World Farm Management', 80, 388, 800, 40),
  text(
    'body',
    'The mandatory practical field internship program places senior B.Sc. (Hons) students in progressive agricultural estates, corporate agribusiness corporations, seed breeding facilities, pesticide manufacturers, and provincial agricultural extension wings. This intensive immersion ensures graduates are immediately equipped to solve real-world farm problems and lead modern agricultural enterprises.',
    80,
    440,
    1040,
    70
  ),

  // Corporate Partners List
  box('card', 80, 530, 1040, 200),
  text('subtitle', 'Leading Corporate Internship Placement Partners', 104, 550, 600, 26),
  list(
    'plain',
    '',
    [
      'Engro Fertilizers & Agribusiness Division (Precision Farm Advisory)',
      'Fauji Fertilizer Company (FFC) Farm Services Centers',
      'Syngenta Pakistan (Crop Protection & Seed Conditioning Wings)',
      'FMC United (Pvt) Limited (Biologicals & Eco-Toxicology Fields)',
      'Four Brothers Group (High-Tunnel & Hybrid Seed Testbeds)',
      'Punjab Agricultural Research Board (PARB) Model Research Stations'
    ],
    104,
    585,
    980,
    120,
    'check'
  )
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. VOCATIONAL & FARMER SHORT COURSES
// ─────────────────────────────────────────────────────────────────────────────
const shortCourses = () => [
  box('green', 80, 40, 1040, 170),
  text('labelGold', 'COMMUNITY OUTREACH & VOCATIONAL SKILL DEVELOPMENT', 110, 56, 700, 18),
  text('hero', 'Vocational & Farmer Short Courses', 110, 80, 850, 60),
  text('bodyLight', 'Hands-on practical certificate courses for progressive growers, entrepreneurs, and students.', 110, 146, 750, 26),

  // Course Cards Grid (4 Courses)
  text('label', 'POPULAR TRAINING MODULES', 80, 240, 500, 18),
  text('title', 'Skill Training Certificates Offered', 80, 268, 700, 40),
  ...[
    ['Commercial Hydroponics & Soilless Cultivation', '6 Weeks', 'Nutrient film technique, vertical farming, water aeration, and greenhouse climate controls.', IMG.grounds],
    ['Commercial Apiculture & Bee-Keeping', '4 Weeks', 'Honeybee species biology, queen rearing, seasonal honey extraction, and disease management.', IMG.facade],
    ['High-Tunnel Nursery & Vegetable Production', '8 Weeks', 'Off-season vegetable production in walk-in tunnels, drip fertigation, and nursery hygiene.', IMG.aerial],
    ['Commercial Mushroom Cultivation & Processing', '2 Weeks', 'Oyster, button, and milky mushroom spore preparation, substrate formulation, and dehydration.', IMG.mainBuilding]
  ].flatMap(([t, dur, d, img], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 80 + col * 530;
    const y = 330 + row * 260;
    return [
      box('card', x, y, 510, 240),
      image(img, x + 20, y + 20, 150, 150, { alt: t }),
      text('statGold', dur, x + 190, y + 20, 290, 24),
      text('subtitle', t, x + 190, y + 48, 290, 28),
      text('small', d, x + 190, y + 84, 290, 60),
      button('primary', 'Register for Course', x + 190, y + 155, 180, 38, { iconName: 'Send' })
    ];
  })
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. DEPARTMENT RESEARCH PORTFOLIO & FUNDED GRANTS
// ─────────────────────────────────────────────────────────────────────────────
const researchPortfolio = () => [
  box('navy', 80, 40, 1040, 170),
  text('labelGold', 'OFFICE OF RESEARCH, INNOVATION & COMMERCIALIZATION (ORIC)', 110, 56, 700, 18),
  text('pageTitleLight', 'Department Research Portfolio & Funded Grants', 110, 80, 950, 46),
  text('bodyLight', 'National and international competitive research grants, innovations, and high-impact publications.', 110, 140, 800, 26),

  // Research Projects Table
  table(
    {
      tableTitle: 'Active Funded Competitive Research Grants (NRPU / PARB / International)',
      tableColumns: [
        { key: 'srNo', label: 'Project #', width: '100px' },
        { key: 'title', label: 'Project Title & Objectives', width: '45%' },
        { key: 'venue', label: 'Funding Agency & Budget', width: '32%' },
        { key: 'url', label: 'Details', width: '120px' }
      ],
      tableRows: [
        {
          srNo: 'HEC-9102',
          title: 'Development of Precision Variable-Rate Nitrogen Applicators via UAV Remote Sensing for Wheat Fields',
          venue: 'HEC NRPU Grant (PKR 14.8 Million)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        },
        {
          srNo: 'PARB-821',
          title: 'Climate-Resilient Cotton-Wheat Cropping Systems via Laser Land Leveling & Direct Seeding',
          venue: 'Punjab Agri Research Board (PKR 28.5 Million)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        },
        {
          srNo: 'ACIAR-401',
          title: 'Optimizing Groundwater Use Efficiency in Indus Basin Rice-Wheat Rotations',
          venue: 'Australian Centre for Int. Agri Research (AUD 420,000)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        }
      ]
    },
    80,
    240,
    1040,
    310
  ),

  // Publications Table
  table(
    {
      tableTitle: 'High-Impact Springer Publications Showcase',
      tableColumns: [
        { key: 'srNo', label: 'Sr. #', width: '80px' },
        { key: 'title', label: 'Scholarly Paper Title', width: '48%' },
        { key: 'venue', label: 'Indexed Journal Venue', width: '32%' },
        { key: 'url', label: 'Link', width: '120px' }
      ],
      tableRows: [
        {
          srNo: '01',
          title: 'Advanced Research on Crop Husbandry & Agro-Technology in Agro-Ecological Zones of Punjab',
          venue: 'Pakistan Journal of Agricultural Sciences (Springer Linkage)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        },
        {
          srNo: '02',
          title: 'Precision Agro-Technology and Nitrogen Dynamics in Semi-Arid Agro-Climatic Zones',
          venue: 'Telecommunication Systems & Agricultural Sensors (Springer Nature)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        },
        {
          srNo: '03',
          title: 'High-Throughput Remote Sensing and AI Crop Canopy Modeling for Cereal Systems',
          venue: 'Computers & Electronics in Agriculture (Springer)',
          url: 'https://link.springer.com/article/10.1007/s11235-015-0076-8'
        }
      ]
    },
    80,
    580,
    1040,
    310
  )
];

// ─────────────────────────────────────────────────────────────────────────────
// 10. DEPARTMENT ADMISSIONS & MERIT ELIGIBILITY
// ─────────────────────────────────────────────────────────────────────────────
const departmentAdmissions = () => [
  box('card', 80, 40, 1040, 160),
  text('labelGold', 'OFFICIAL ADMISSIONS 2026-27', 110, 56, 500, 18),
  text('pageTitle', 'Department Admissions & Eligibility Guidelines', 110, 80, 850, 42),
  text('body', 'Complete merit criteria, required entry tests, schedule, and step-by-step application guidance.', 110, 134, 750, 24),

  // Eligibility Checklist & Dates
  text('label', 'QUALIFYING CRITERIA', 80, 230, 400, 18),
  text('title', 'Undergraduate & Postgraduate Admission Rules', 80, 258, 600, 40),
  list(
    'plain',
    '',
    [
      'Minimum 60% marks in F.Sc. Pre-Medical or Pre-Engineering from recognized BISE board',
      'Valid UAF Entry Test score (conducted by University Controller of Examinations)',
      'Domicile of Punjab for open merit; designated quota seats for other provinces & international candidates',
      'Original CNIC / B-Form and attested matriculation and intermediate certificates required'
    ],
    80,
    316,
    580,
    180,
    'check'
  ),
  list(
    'panel',
    'Important Admissions Calendar',
    [
      'Online Registration Opens: July 15, 2026',
      'First Entry Test: August 05, 2026',
      'Second Entry Test: August 20, 2026',
      'First Merit List Display: September 01, 2026',
      'Commencement of Classes: September 15, 2026'
    ],
    700,
    258,
    420,
    240,
    'check'
  ),

  // 4-Step Process
  box('light', 80, 520, 1040, 200),
  text('label', 'APPLICATION PROCESS', 110, 536, 980, 18),
  text('subtitle', 'Four Simple Steps to Apply Online', 110, 558, 980, 26),
  ...[
    ['1. Register Account', 'Create your account on official portal (sis.uaf.edu.pk) using your CNIC.'],
    ['2. Upload Transcripts', 'Upload verified educational documents and choose degree preferences.'],
    ['3. Deposit Challan', 'Print fee voucher and deposit processing fee at any MCB / Allied Bank.'],
    ['4. Sit Entry Test', 'Download your roll number slip and appear at campus examination hall.']
  ].flatMap(([t, d], i) => {
    const x = 110 + i * 245;
    return [
      box('card', x, 600, 230, 100),
      text('statGold', String(i + 1), x + 14, 610, 40, 24),
      text('subtitle', t, x + 14, 638, 200, 20),
      text('small', d, x + 14, 662, 200, 32)
    ];
  })
];

// ─────────────────────────────────────────────────────────────────────────────
// 11. BRANDED BLANK TEMPLATE (Clean Canvas without duplicate header)
// ─────────────────────────────────────────────────────────────────────────────
const brandedBlank = () => [
  box('card', 80, 40, 1040, 150),
  text('labelGold', 'DEPARTMENT CANVAS', 110, 56, 400, 18),
  text('pageTitle', 'New Academic Department Page', 110, 80, 800, 40),
  text(
    'body',
    'Design your departmental web page freely. Use the "Add to your page" palette on the left to place headings, faculty cards, staff directory cards, Springer publication tables, and degree program cards.',
    110,
    128,
    850,
    46
  )
];

export const PAGE_TEMPLATES = [
  {
    id: 'faculty-portal-overview',
    name: 'Academic Faculty Overview',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Academic Faculty Overview',
    description: 'Mother Faculty portal: Left text & right compact photo (no overlap), 4 key statistics, Dean leadership, and departments directory.',
    build: facultyPortalOverview
  },
  {
    id: 'department-overview',
    name: 'Department Academic Overview',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Department Overview',
    description: 'Department overview: Left text (genesis, narrative & research labs), right compact photo with change photo option, zero overlap.',
    build: departmentOverview
  },
  {
    id: 'faculty-directory',
    name: 'Faculty Directory (Professors & Lecturers)',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Faculty Directory',
    description: 'Standard 4-cards-per-row grid of professors and lecturers with portraits, designation, phone ext., and profile buttons.',
    build: facultyDirectory
  },
  {
    id: 'staff-directory',
    name: 'Staff & Technical Officers Directory',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Staff Directory',
    description: 'Department administrative officers, lab superintendents, IT and field technical staff directory cards.',
    build: staffDirectory
  },
  {
    id: 'faculty-profile-publications',
    name: 'Faculty Member Profile & Publications',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Faculty Member Profile',
    description: 'Individual faculty member page: Left bio & HEC status, right portrait with replace image option, 2 counter cards, and Springer publications table.',
    build: facultyProfilePublications
  },
  {
    id: 'department-detail-programs',
    name: 'Department Detail & Degree Programs',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Department Programs & Detail',
    description: 'Department offerings: Left program curriculum details, right lab photo with change photo option, degree cards.',
    build: departmentDetailPrograms
  },
  {
    id: 'undergraduate-programs',
    name: 'Undergraduate Degree Programs (B.Sc. Hons)',
    category: 'Academic & Faculty Pages',
    pageTitle: 'B.Sc. (Hons) Degree Programs',
    description: '4-Year / 8-Semester undergraduate matrix, foundation courses, major disciplines, credit hours, eligibility, and curriculum sample table.',
    build: undergraduatePrograms
  },
  {
    id: 'postgraduate-programs',
    name: 'Postgraduate & Ph.D. Degree Programs',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Postgraduate Research Degrees',
    description: 'M.Sc. (Hons) / M.Phil. (2 Years) & Ph.D. (3-5 Years) programs, comprehensive exams, external international dissertation evaluation, and lab testbeds.',
    build: postgraduatePrograms
  },
  {
    id: 'internship-program',
    name: 'Mandatory Field Internship Program',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Field Internship Program',
    description: 'Experiential learning immersion, 6-Month duration, 150+ corporate agribusiness partners, practical field log, and viva examination.',
    build: internshipProgram
  },
  {
    id: 'short-courses',
    name: 'Vocational & Farmer Short Courses',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Vocational Short Courses',
    description: 'Hydroponics, commercial apiculture, high-tunnel nursery, and mushroom cultivation skill certificates with training schedules.',
    build: shortCourses
  },
  {
    id: 'research-portfolio',
    name: 'Department Research & Funded Grants',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Research Portfolio & Grants',
    description: 'International & HEC NRPU funded research grants, high-tech research laboratories, indexed Springer publications showcase, and ORIC linkages.',
    build: researchPortfolio
  },
  {
    id: 'department-admissions',
    name: 'Department Admissions & Eligibility',
    category: 'Academic & Faculty Pages',
    pageTitle: 'Department Admissions',
    description: 'Admission criteria for departmental degrees, merit formula, important dates calendar, and 4-step online registration process.',
    build: departmentAdmissions
  },
  {
    id: 'branded-blank',
    name: 'Blank Canvas with UAF Header',
    category: 'Custom Pages',
    pageTitle: 'Custom Academic Page',
    description: 'Official UAF header and footer pre-placed. Free space to design any custom layout.',
    build: brandedBlank
  }
];

export function buildTemplate(id: string) {
  const template = PAGE_TEMPLATES.find((t) => t.id === id);
  if (!template) return null;
  start();
  const elements = template.build().map((element: any) => {
    const themed = themeElement(element);
    const { look, ...materialized } = themed;
    return materialized;
  });
  return { id: template.id, title: template.pageTitle, elements };
}
