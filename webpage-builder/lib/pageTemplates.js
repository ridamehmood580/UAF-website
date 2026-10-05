import { themeElement } from './uafTheme';

// ─────────────────────────────────────────────────────────────────────────────
//  UAF PAGE TEMPLATES
//  Ready-made pages for people who are not web developers. Each template is a
//  list of elements placed on the 1200px-wide canvas. Colors and fonts are NOT
//  stored here — they come from the "look" names (see lib/uafTheme.js).
//
//  Elements marked fixed:true (header + footer) cannot be moved, resized or
//  deleted by page editors; their layout and content remain locked.
//
//  Images live in /public/templates/. To add a template: write a build function
//  below and add one entry to PAGE_TEMPLATES at the bottom.
// ─────────────────────────────────────────────────────────────────────────────

const IMG = {
  logo: '/templates/uaf-logo.jpg',
  facade: '/templates/campus-facade.jpg',
  grounds: '/templates/campus-grounds.jpg'
};

// ── tiny builder helpers ─────────────────────────────────────────────────────
let base = '';
let seq = 0;
const start = () => { base = Date.now().toString(36) + Math.random().toString(36).slice(2, 5); seq = 0; };
const uid = () => `el-${base}-${(seq++).toString(36)}`;
const place = (o, x, y, width, height) => ({ ...o, id: uid(), x, y, width, height });
const fix = list => list.map(el => ({ ...el, fixed: true }));

const box = (look, x, y, w, h) => place({ type: 'container', look, shapeType: 'rectangle', layoutMode: 'vertical', style: {} }, x, y, w, h);
const text = (look, t, x, y, w, h, { align, ...o } = {}) => place({ type: 'text', look, text: t, style: align ? { align } : {}, ...o }, x, y, w, h);
const link = (look, t, x, y, w, url = '#') => place({ type: 'hyperlink', look, text: t, url, showUnderline: false, showExternalIcon: false, style: {} }, x, y, w, 22);
const button = (look, label, x, y, w, h = 46, { iconName = 'ArrowRight' } = {}) => place({ type: 'button', look, label, url: '', iconName, style: {} }, x, y, w, h);
const image = (src, x, y, w, h, o = {}) => place({ type: 'image', src, alt: '', caption: '', shape: 'rounded', objectFit: 'cover', style: {}, ...o, height: h }, x, y, w, h);
const list = (look, title, items, x, y, w, h, bullet = 'check') => place({ type: 'list', look, title, items, bulletStyle: bullet, showBullets: bullet !== 'none', style: {} }, x, y, w, h);
const field = (label, placeholder, inputType, x, y, w, h, o = {}) => place({ type: 'input', label, placeholder, inputType, options: '', style: {}, ...o }, x, y, w, h);
const rule = (look, x, y, w) => place({ type: 'divider', look, style: {} }, x, y, w, 20);
const card = (o, x, y, w, h) => place({ type: 'card', badgeTag: '', buttonLabel: '', imageUrl: '', style: {}, ...o }, x, y, w, h);

// ── shared header (84px) and footer (310px) ──────────────────────────────────
const header = () => fix([
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
  link('light', 'Contact', 898, 31, 70),
  button('gold', 'Portal Login', 1000, 22, 160, 40, { iconName: 'None' })
]);

const footer = y => fix([
  box('navy', 0, y, 1200, 310),
  text('subtitleLight', 'University of Agriculture, Faisalabad', 80, y + 52, 470, 30),
  text('smallLight', "Pakistan's premier agricultural, veterinary, engineering and science university, serving the nation since 1906.", 80, y + 94, 380, 84),
  text('subtitleLight', 'Quick links', 560, y + 52, 200, 30),
  link('light', 'Admissions', 560, y + 96, 200),
  link('light', 'Academic programs', 560, y + 128, 200),
  link('light', 'Research', 560, y + 160, 200),
  link('light', 'Notices', 560, y + 192, 200),
  text('subtitleLight', 'Contact us', 820, y + 52, 300, 30),
  text('smallLight', '+92 41 9200161-70', 820, y + 96, 300, 22),
  text('smallLight', 'info@uaf.edu.pk', 820, y + 124, 300, 22),
  text('smallLight', 'University of Agriculture, Faisalabad 38040, Pakistan', 820, y + 152, 300, 44),
  rule('onDark', 80, y + 246, 1040),
  text('smallLight', '© 2026 University of Agriculture, Faisalabad. All rights reserved.', 80, y + 272, 800, 20)
]);

// A dark photo banner used at the top of several templates.
const banner = (src, h) => [image(src, 0, 84, 1200, h, { shape: 'square', alt: 'UAF campus' }), box('overlay', 0, 84, 1200, h)];

// ── 1. Department / Faculty home page ────────────────────────────────────────
const departmentHome = () => [
  ...header(),
  ...banner(IMG.facade, 480),
  text('labelGold', 'Department of …', 80, 190, 600, 18),
  text('hero', 'Shaping the future of agriculture', 80, 222, 720, 130),
  text('bodyLight', 'Write one or two lines here about what makes your department special.', 80, 370, 600, 56),
  button('gold', 'Explore programs', 80, 456, 200, 48),
  button('outlineLight', 'Contact us', 300, 456, 170, 48, { iconName: 'None' }),

  text('label', 'About the department', 80, 624, 500, 18),
  text('title', 'A century of excellence in agricultural education', 80, 654, 520, 90),
  text('body', 'Describe your department in a few sentences: its history, its strengths and the students it serves. Keep paragraphs short so they are easy to read on a phone. You can replace this text, the photo and the link below.', 80, 764, 500, 110),
  link('default', 'Learn more about the department →', 80, 904, 360),
  image(IMG.grounds, 660, 624, 460, 300, { alt: 'UAF campus' }),

  box('green', 0, 984, 1200, 140),
  ...[['1906', 'Year established'], ['1,950', 'Acre main campus'], ['33,500+', 'Students'], ['9', 'Faculties']].flatMap(([n, l], i) => [
    text('statGold', n, 80 + i * 270, 1012, 230, 52),
    text('bodyLight', l, 80 + i * 270, 1070, 230, 24)
  ]),

  box('light', 0, 1124, 1200, 440),
  text('label', 'Academic programs', 80, 1178, 500, 18),
  text('title', 'Programs we offer', 80, 1208, 600, 44),
  ...[
    ['Undergraduate', 'Four-year BSc (Hons) degrees in agriculture, sciences and technology.'],
    ['Postgraduate', 'MSc and MPhil programs with research supervision from expert faculty.'],
    ['Doctoral', 'PhD programs for scholars who want to lead research and innovation.']
  ].flatMap(([t, d], i) => {
    const x = 80 + i * 355;
    return [
      box('card', x, 1288, 330, 220),
      text('subtitle', t, x + 26, 1316, 278, 34),
      text('body', d, x + 26, 1358, 278, 84),
      link('default', 'View details →', x + 26, 1464, 200)
    ];
  }),

  text('label', 'Latest updates', 80, 1620, 500, 18),
  text('title', 'News & announcements', 80, 1650, 640, 44),
  list('panel', 'Notice board', [
    'Admissions 2026: applications are now open',
    'Mid-term examination schedule published',
    'Seminar on sustainable farming practices',
    'Scholarship applications close this month'
  ], 80, 1724, 620, 330, 'disc'),
  card({ title: 'Featured event', description: 'Write a short description of an upcoming event, seminar or achievement here.', imageUrl: IMG.facade, buttonLabel: 'Read more' }, 740, 1724, 380, 330),

  box('tint', 0, 2110, 1200, 150),
  text('title', 'Have a question? Get in touch.', 80, 2150, 700, 44),
  text('body', 'Our team usually replies within two working days.', 80, 2200, 700, 26),
  button('primary', 'Contact the department', 880, 2166, 240, 48),
  ...footer(2260)
];

// ── 2. Notice / announcement ─────────────────────────────────────────────────
const notice = () => [
  ...header(),
  box('navy', 0, 84, 1200, 204),
  text('labelGold', 'Official notice', 80, 130, 400, 18),
  text('pageTitleLight', 'Notice title goes here', 80, 158, 1000, 52),
  text('bodyLight', 'A one-line summary of what this notice is about.', 80, 222, 800, 26),

  box('light', 0, 288, 1200, 110),
  ...[['Notice no.', 'UAF/…/2026/000'], ['Date', 'DD Month 2026'], ['Issued by', 'Office of the Registrar']].flatMap(([l, v], i) => [
    text('label', l, 80 + i * 360, 318, 320, 18),
    text('subtitle', v, 80 + i * 360, 342, 320, 30)
  ]),

  text('title', 'Details', 80, 450, 700, 44),
  text('body', 'Write the main message of the notice here. Start with the most important information: who it is for, what they need to do and by when. Short paragraphs are easier to read than one long block of text.', 80, 508, 700, 110),
  text('body', 'Add a second paragraph if you need to explain more, for example how to apply, where to submit documents or who to contact with questions.', 80, 636, 700, 84),
  list('plain', 'Required documents', [
    'Attested copy of CNIC / B-Form',
    'Academic certificates and transcripts',
    'Recent passport-size photographs',
    'Fee payment receipt'
  ], 80, 770, 700, 190),
  list('panel', 'Important dates', [
    'Notice issued: DD Month',
    'Last date to apply: DD Month',
    'Result announced: DD Month'
  ], 830, 508, 290, 220, 'disc'),

  rule('line', 80, 1000, 1040),
  button('primary', 'Download full notice (PDF)', 80, 1040, 290, 48, { iconName: 'Download' }),
  button('outline', 'Back to all notices', 390, 1040, 230, 48, { iconName: 'None' }),
  ...footer(1130)
];

// ── 3. Admissions information ────────────────────────────────────────────────
const admissions = () => [
  ...header(),
  ...banner(IMG.grounds, 330),
  text('labelGold', 'Admissions 2026', 80, 150, 400, 18),
  text('pageTitleLight', 'Apply to the University of Agriculture', 80, 180, 760, 100),
  text('bodyLight', 'Everything you need to know about eligibility, important dates and how to apply.', 80, 292, 640, 56),

  text('label', 'Eligibility', 80, 474, 400, 18),
  text('title', 'Who can apply?', 80, 504, 600, 44),
  list('plain', '', [
    'Intermediate (F.Sc / equivalent) with the minimum marks required',
    'Pakistani nationals and eligible overseas applicants',
    'Valid CNIC or B-Form',
    'Appearance in the university entry test',
    'Documents verified at the time of admission',
    'Fee paid within the announced dates'
  ], 80, 570, 560, 250),
  list('panel', 'Key dates', [
    'Applications open: DD Month 2026',
    'Last date to apply: DD Month 2026',
    'Entry test: DD Month 2026',
    'Merit list: DD Month 2026'
  ], 720, 470, 400, 300, 'disc'),

  box('light', 0, 870, 1200, 380),
  text('label', 'How to apply', 80, 926, 1040, 18, { align: 'center' }),
  text('title', 'Four simple steps', 80, 956, 1040, 44, { align: 'center' }),
  ...[
    ['Register', 'Sign up on the admissions portal.'],
    ['Fill the form', 'Enter your details and upload documents.'],
    ['Pay the fee', 'Submit the application fee online.'],
    ['Sit the test', 'Appear in the entry test on your date.']
  ].flatMap(([t, d], i) => {
    const x = 80 + i * 268;
    return [
      box('card', x, 1032, 236, 170),
      text('stat', String(i + 1), x + 24, 1050, 80, 50),
      text('subtitle', t, x + 24, 1110, 188, 28),
      text('small', d, x + 24, 1146, 188, 44)
    ];
  }),

  box('green', 0, 1250, 1200, 180),
  text('titleLight', 'Ready to begin your journey?', 80, 1302, 640, 44),
  text('bodyLight', 'Applications are open. It only takes a few minutes to start.', 80, 1352, 640, 26),
  button('gold', 'Apply online', 790, 1306, 160, 48),
  button('outlineLight', 'Prospectus', 970, 1306, 150, 48, { iconName: 'Download' }),
  ...footer(1430)
];

// ── 4. Event / seminar ───────────────────────────────────────────────────────
const event = () => [
  ...header(),
  ...banner(IMG.facade, 380),
  text('labelGold', 'Seminar · Workshop · Conference', 80, 190, 600, 18),
  text('hero', 'Event title goes here', 80, 222, 800, 70),
  text('bodyLight', 'Hosted by the Department of …', 80, 316, 640, 28),

  box('light', 0, 464, 1200, 130),
  ...[['Date', 'Day, DD Month 2026', 'Start time – end time'], ['Venue', 'Venue name', 'Building, University of Agriculture'], ['Entry', 'Free entry', 'Registration required']].flatMap(([l, v, s], i) => [
    text('label', l, 80 + i * 360, 496, 300, 18),
    text('subtitle', v, 80 + i * 360, 520, 320, 30),
    text('small', s, 80 + i * 360, 556, 320, 20)
  ]),

  text('title', 'About this event', 80, 654, 640, 44),
  text('body', 'Tell visitors what the event is about, who should attend and what they will learn. Mention any guest speakers and the main topics. Keep it short and friendly so people can decide quickly whether to join.', 80, 712, 640, 130),
  text('body', 'Add practical details here, such as parking, dress code or what to bring.', 80, 860, 640, 104),
  list('panel', 'Programme', [
    '09:30  Registration',
    '10:00  Welcome and opening remarks',
    '10:30  Keynote session',
    '12:00  Panel discussion',
    '13:00  Closing and refreshments'
  ], 780, 654, 340, 300, 'none'),

  box('tint', 0, 1010, 1200, 590),
  text('label', 'Registration', 80, 1066, 400, 18),
  text('title', 'Register your interest', 80, 1096, 700, 44),
  field('Full name', 'Your name', 'text', 80, 1170, 500, 76),
  field('Email address', 'name@example.com', 'email', 620, 1170, 500, 76),
  field('Department', '', 'select', 80, 1266, 500, 76, { options: 'Agronomy, Entomology, Horticulture, Soil Science, Other' }),
  field('Phone (optional)', '03XX XXXXXXX', 'text', 620, 1266, 500, 76),
  field('Message (optional)', 'Anything we should know?', 'textarea', 80, 1362, 1040, 130),
  button('primary', 'Submit registration', 80, 1520, 240, 48, { iconName: 'Send' }),
  ...footer(1600)
];

// ── 5. Contact us ────────────────────────────────────────────────────────────
const contact = () => [
  ...header(),
  box('light', 0, 84, 1200, 210),
  text('label', 'Contact us', 80, 132, 400, 18),
  text('pageTitle', "We'd love to hear from you", 80, 160, 800, 52),
  text('body', 'Reach the right office quickly: call, email or send us a message below.', 80, 226, 700, 52),

  ...[
    ['Visit us', 'University of Agriculture,\nFaisalabad 38040, Pakistan'],
    ['Call us', '+92 41 9200161-70\nUniversity switchboard'],
    ['Email us', 'info@uaf.edu.pk\nadmissions@uaf.edu.pk']
  ].flatMap(([t, d], i) => {
    const x = 80 + i * 355;
    return [box('card', x, 330, 330, 170), text('subtitle', t, x + 26, 356, 278, 28), text('body', d, x + 26, 398, 278, 84)];
  }),

  text('label', 'Send a message', 80, 560, 400, 18),
  text('title', 'How can we help?', 80, 590, 600, 44),
  field('Full name', 'Your name', 'text', 80, 656, 600, 76),
  field('Email address', 'name@example.com', 'email', 80, 748, 600, 76),
  field('Subject', '', 'select', 80, 840, 600, 76, { options: 'Admissions, Academics, Research, Events, Other' }),
  field('Message', 'Write your message here', 'textarea', 80, 932, 600, 150),
  button('primary', 'Send message', 80, 1100, 200, 48, { iconName: 'Send' }),
  image(IMG.grounds, 740, 656, 380, 260, { alt: 'UAF campus', caption: 'Main campus, Faisalabad' }),
  list('panel', 'Office hours', ['Monday – Friday: add hours here', 'Saturday: add hours here'], 740, 950, 380, 150, 'none'),
  ...footer(1180)
];

// ── 6. Faculty profile ───────────────────────────────────────────────────────
const facultyProfile = () => [
  ...header(),
  image('', 80, 140, 280, 340, { alt: 'Profile photo' }),
  text('label', 'Professor', 410, 146, 500, 18),
  text('pageTitle', 'Dr. Full Name', 410, 174, 700, 52),
  text('subtitle', 'Department of …', 410, 238, 700, 30),
  text('body', 'Write a short biography here: your academic background, your main areas of work and the courses you teach. Two or three sentences are enough. Keep it simple and in the third person.', 410, 284, 710, 110),
  link('default', 'name@uaf.edu.pk', 410, 410, 300, 'mailto:'),
  text('small', 'Office: Building / Room number', 410, 438, 400, 20),
  button('primary', 'Download CV', 410, 462, 180, 44, { iconName: 'Download' }),
  button('outline', 'Google Scholar', 610, 462, 180, 44, { iconName: 'None' }),

  rule('line', 80, 540, 1040),
  text('title', 'Research interests', 80, 580, 500, 44),
  list('plain', '', ['Research area one', 'Research area two', 'Research area three', 'Research area four'], 80, 640, 500, 200, 'disc'),
  text('title', 'Education', 640, 580, 480, 44),
  list('panel', '', ['PhD, University name, Year', 'MSc, University name, Year', 'BSc, University name, Year'], 640, 640, 480, 200, 'disc'),

  box('light', 0, 900, 1200, 380),
  text('title', 'Selected publications', 80, 946, 700, 44),
  list('plain', '', [
    'Author, A. (2026). Title of the first publication. Journal name, volume(issue), pages.',
    'Author, A. (2025). Title of the second publication. Journal name, volume(issue), pages.',
    'Author, A. (2024). Title of the third publication. Journal name, volume(issue), pages.'
  ], 80, 1006, 1040, 230, 'decimal'),
  ...footer(1280)
];

// ── 7. Blank page with the UAF header and footer ─────────────────────────────
const brandedBlank = () => [
  ...header(),
  text('pageTitle', 'Page title', 80, 140, 800, 52),
  text('body', 'Start writing here. Use the "Add to your page" menu on the left to add text, images, buttons, lists and forms. The UAF header and footer are already in place.', 80, 208, 700, 80),
  ...footer(560)
];

export const PAGE_TEMPLATES = [
  { id: 'department-home', name: 'Department overview', category: 'Department pages', pageTitle: 'Department overview', description: 'Photo banner, about section, key numbers, program cards, news and contact strip.', build: departmentHome },
  { id: 'admissions', name: 'Admissions information', category: 'Department pages', pageTitle: 'Admissions information', description: 'Eligibility list, key dates, four application steps and an apply button.', build: admissions },
  { id: 'notice', name: 'Notice / announcement', category: 'Department pages', pageTitle: 'Notice', description: 'Official notice with reference details, required documents and a PDF download.', build: notice },
  { id: 'event', name: 'Event / seminar', category: 'Department pages', pageTitle: 'Event page', description: 'Event banner, date and venue, programme schedule and a registration form.', build: event },
  { id: 'faculty-profile', name: 'Faculty profile', category: 'Department pages', pageTitle: 'Faculty profile', description: 'Photo, biography, contact links, research interests and publications.', build: facultyProfile },
  { id: 'contact', name: 'Contact us', category: 'Department pages', pageTitle: 'Contact us', description: 'Address, phone and email cards with a message form and office hours.', build: contact },
  { id: 'branded-blank', name: 'Blank page with UAF header', category: 'Start simple', pageTitle: 'New page', description: 'Only the official header and footer. Add your own content in between.', build: brandedBlank }
];

/** Creates a fresh copy (new element ids) of a template. */
export function buildTemplate(id) {
  const template = PAGE_TEMPLATES.find(t => t.id === id);
  if (!template) return null;
  start();
  const elements = template.build().map(element => {
    const themed = themeElement(element);
    const { look, ...materialized } = themed;
    return materialized;
  });
  return { id: template.id, title: template.pageTitle, elements };
}
