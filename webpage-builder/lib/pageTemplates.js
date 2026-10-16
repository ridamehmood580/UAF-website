import { themeElement } from './uafTheme';

// ─────────────────────────────────────────────────────────────────────────────
//  UAF PAGE TEMPLATES
//  Ready-made pages for people who are not web developers. Each template is a
//  list of elements placed on the 1200px-wide canvas. Colors and fonts are NOT
//  stored here — they come from the "look" names (see lib/uafTheme.js).
//
//  Department section templates contain only the editable content area. The
//  university supplies its shared department header, hero, tabs, and footer.
//
//  Images live in /public/templates/. To add a template: write a build function
//  below and add one entry to PAGE_TEMPLATES at the bottom.
// ─────────────────────────────────────────────────────────────────────────────

const IMG = {
  logo: '/templates/uaf-logo.jpg',
  facade: '/templates/campus-facade.jpg',
  grounds: '/templates/campus-grounds.jpg'
};
// Keep template links on the same site as the university website. Deployments
// can point this at their public site through NEXT_PUBLIC_UNI_URL.
const SITE_URL = (process.env.NEXT_PUBLIC_UNI_URL || 'https://web.uaf.edu.pk').replace(/\/+$/, '');

// ── tiny builder helpers ─────────────────────────────────────────────────────
let base = '';
let seq = 0;
const start = () => { base = Date.now().toString(36) + Math.random().toString(36).slice(2, 5); seq = 0; };
const uid = () => `el-${base}-${(seq++).toString(36)}`;
const place = (o, x, y, width, height) => ({ ...o, id: uid(), x, y, width, height });

const box = (look, x, y, w, h, extra = {}) => place({ type: 'container', look, shapeType: 'rectangle', layoutMode: 'vertical', style: {}, ...extra }, x, y, w, h);
const text = (look, t, x, y, w, h, { align, ...o } = {}) => place({ type: 'text', look, text: t, style: align ? { align } : {}, ...o }, x, y, w, h);
const link = (look, t, x, y, w, url = SITE_URL, menuItems = []) => place({ type: 'hyperlink', look, text: t, url, menuItems, showUnderline: false, showExternalIcon: false, style: {} }, x, y, w, 22);
const socialLink = (iconName, x, y, url) => place({ type: 'hyperlink', look: 'light', text: '', iconName, url, showUnderline: false, showExternalIcon: false, style: { bgColor: 'rgba(255,255,255,0.10)', borderRadius: 999, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 } }, x, y, 38, 38);
const button = (look, label, x, y, w, h = 46, { iconName = 'ArrowRight', url = '' } = {}) => place({ type: 'button', look, label, url, iconName, style: {} }, x, y, w, h);
const image = (src, x, y, w, h, o = {}) => place({ type: 'image', src, alt: '', caption: '', shape: 'rounded', objectFit: 'cover', style: {}, ...o, height: h }, x, y, w, h);
const list = (look, title, items, x, y, w, h, bullet = 'check') => place({ type: 'list', look, title, items, bulletStyle: bullet, showBullets: bullet !== 'none', style: {} }, x, y, w, h);
const field = (label, placeholder, inputType, x, y, w, h, o = {}) => place({ type: 'input', label, placeholder, inputType, options: '', style: {}, ...o }, x, y, w, h);
const rule = (look, x, y, w, h = 20, tight = false) => place({
  type: 'divider', look,
  style: tight ? { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, marginTop: 0, marginBottom: 0 } : {},
  ...(tight ? { thickness: h } : {})
}, x, y, w, h);
const card = (o, x, y, w, h) => place({ type: 'card', badgeTag: '', buttonLabel: '', imageUrl: '', style: {}, ...o }, x, y, w, h);

// ── shared header (130px) and footer (390px) — exact match of uni/src/components/Header.tsx & Footer.tsx ───
const sectionUrl = section => `${SITE_URL}/#${section}`;
const menuDestinations = {
  'quick-links': [`${SITE_URL}/#admissions`, `${SITE_URL}/#resources`, `${SITE_URL}/`, `${SITE_URL}/#latest-events`],
  about: [`${SITE_URL}/#vision`, `${SITE_URL}/#vc-message`, `${SITE_URL}/#campus`],
  administration: [`${SITE_URL}/#administration`, `${SITE_URL}/#administration`],
  admissions: [`${SITE_URL}/#admissions`, `${SITE_URL}/#admissions`, `${SITE_URL}/#admissions`],
  media: [`${SITE_URL}/#latest-events`, `${SITE_URL}/#notices`, `${SITE_URL}/#latest-events`]
};
const menu = (labels, section) => labels.map((label, index) => ({
  label,
  url: (menuDestinations[section] || [])[index] || sectionUrl('resources')
}));
const groupedMenu = groups => Object.entries(groups).map(([label, children]) => ({
  label,
  url: sectionUrl('programs'),
  children: children.map(child => ({ label: child, url: sectionUrl('programs') }))
}));

// ─────────────────────────────────────────────────────────────────────────────
//  HEADER  (total canvas height = 130px)
//  ─ y   0–42 : top utility bar  (white bg, 2px gold border all around, 42px)
//  ─ y  42–126: main navy navbar  (navy #163887, 84px, gold bottom border 2px)
//  ─ y 126–130: gold accent rule  (4px)
//
//  Utility bar (mirrors Header.tsx top utility strip):
//    LEFT  (gap-6): LMS · SIS · Faculty and Staff · Alumni · ORIC · Jobs · PKNC · Quick Links▾
//    RIGHT (ml-auto): Complaints/Suggestions  ·  Staff Login
//
//  Navbar (mirrors Header.tsx main nav):
//    [UAF logo circle 56×56 gold ring]  UNIVERSITY OF / AGRICULTURE / FAISALABAD
//    HOME · ABOUT▾ · RTI · ADMINISTRATION▾ · ACADEMICS▾ · ADMISSIONS▾ · MEDIA & PUBLICATIONS▾
//    [🔍 search circle button, far right]
// ─────────────────────────────────────────────────────────────────────────────
const header = () => [

  // ── 1. Utility bar background: white, gold border (matches Header.tsx border-t-2 border-x-2 border-b-2 border-[#ed9d09]) ──
  box('utility', 0, 0, 1200, 42, {
    style: { bgColor: '#ffffff', textColor: '#1e3a7a', borderColor: '#ed9d09', borderWidth: 2, borderRadius: 16 }
  }),

  // ── 2. Utility bar LEFT links (gap-6 ≈ 24px spacing, text-[13px] font-semibold tracking-wide) ──
  link('default', 'LMS',               32,  12,  36, 'https://lms.uaf.edu.pk'),
  link('default', 'SIS',               80,  12,  34, 'https://sis.uaf.edu.pk'),
  link('default', 'Faculty and Staff', 126, 12, 110, `${SITE_URL}/#administration`),
  link('default', 'Alumni',            248, 12,  52, `${SITE_URL}/#campus`),
  link('default', 'ORIC',              312, 12,  42, `${SITE_URL}/#rti`),
  link('default', 'Jobs',              366, 12,  38, `${SITE_URL}/#notices`),
  link('default', 'PKNC',              416, 12,  46, `${SITE_URL}/#campus`),
  link('default', 'Quick Links ▾',     474, 12, 110, `${SITE_URL}/#quick-links`, menu([
    'Undergraduate Merit Calculator', 'Ask UAF Virtual Guide', 'Main UAF Official Portal', 'Campus Events & News'
  ], 'quick-links')),

  // ── 3. Utility bar RIGHT links (ml-auto in real site, right-aligned) ──
  link('default', 'Complaints / Suggestions', 792, 12, 180, `${SITE_URL}/#resources`),
  link('default', '👤  Staff Login',           984, 12, 110, `${SITE_URL}/`),

  // ── 4. Navbar background: navy #163887, 84px, gold bottom border ──
  box('nav', 0, 42, 1200, 84, {
    style: { bgColor: '#163887', textColor: '#ffffff', borderColor: '#ed9d09', borderWidth: 0, borderRadius: 0 }
  }),
  // Gold bottom border of navbar (matches border-b-2 border-[#ed9d09])
  rule('accent', 0, 124, 1200, 2, true),

  // ── 5. UAF Logo badge: circle 56×56 with 2px gold ring (matches w-13/w-14 rounded-full border-2 border-[#ed9d09]) ──
  image(IMG.logo, 32, 52, 56, 56, {
    shape: 'circle', objectFit: 'contain', alt: 'University of Agriculture Faisalabad Emblem',
    badge: true,
    url: `${SITE_URL}/`,
    style: { bgColor: '#ffffff', borderColor: '#ed9d09', borderWidth: 2, borderRadius: 999 }
  }),

  // ── 6. Brand text stack (matches Header.tsx flex flex-col text-white tracking-wider) ──
  //    "UNIVERSITY OF"  — text-[10-11px] font-bold tracking-[0.2em] text-blue-100
  text('brandSmall',  'UNIVERSITY OF',  102, 52, 188, 14),
  //    "AGRICULTURE"    — font-serif-heading font-black text-[22px] tracking-[0.06em] text-white
  text('brand',       'AGRICULTURE',    102, 67, 232, 28),
  //    "FAISALABAD"     — text-[10-11px] font-bold tracking-[0.26em] text-amber-300
  text('brandAccent', 'FAISALABAD',     102, 97, 186, 14),

  // ── 7. Desktop nav items (hidden xl:flex gap-3, uppercase bold 11.5px, text-white) ──
  //    Positions mirror Header.tsx ml-auto justify-end layout on 1200px canvas
  link('light', 'HOME',                  342, 73,  56, `${SITE_URL}/`),
  link('light', 'ABOUT ▾',              408, 73,  76, `${SITE_URL}/#vision`,
    menu(['VISION 2050 & HERITAGE', 'VICE CHANCELLOR MESSAGE', 'CAMPUS LIFE & BOTANICAL GARDENS'], 'about')),
  link('light', 'RTI',                   494, 73,  36, `${SITE_URL}/#rti`),
  link('light', 'ADMINISTRATION ▾',      540, 73, 152, `${SITE_URL}/#administration`,
    menu(['OFFICERS OF THE UNIVERSITY', 'SYNDICATE & STATUTORY BODIES'], 'administration')),
  link('light', 'ACADEMICS ▾',           702, 73, 108, `${SITE_URL}/#programs`,
    groupedMenu({
      'FACULTIES': [
        'FACULTY OF AGRICULTURE', 'FACULTY OF VETERINARY SCIENCE', 'FACULTY OF SCIENCES',
        'FACULTY OF ANIMAL HUSBANDRY', 'FACULTY OF AGRICULTURE ENGINEERING AND TECHNOLOGY',
        'FACULTY OF SOCIAL SCIENCES', 'FACULTY OF FOOD, NUTRITION AND HOME SCIENCES',
        'FACULTY OF ARTS AND HUMANITIES', 'FACULTY OF HEALTH AND PHARMACEUTICAL SCIENCES'
      ],
      'INSTITUTES': [
        'INSTITUTE OF HORTICULTURAL SCIENCES', 'INSTITUTE OF SOIL & ENVIRONMENTAL SCIENCES',
        'INSTITUTE OF ANIMAL & DAIRY SCIENCES', 'INSTITUTE OF BUSINESS MANAGEMENT SCIENCES (IBMS)',
        'INSTITUTE OF MICROBIOLOGY', 'NATIONAL INSTITUTE OF FOOD SCIENCE & TECHNOLOGY (NIFSAT)',
        'INSTITUTE OF AGRICULTURAL EXTENSION & RURAL DEVELOPMENT',
        'INSTITUTE OF PHARMACY, PHYSIOLOGY & PHARMACOLOGY',
        'INSTITUTE OF AGRICULTURAL & RESOURCE ECONOMICS'
      ],
      'CONSTITUENT COLLEGES': [
        'UAF SUB-CAMPUS BUREWALA (VEHARI)', 'UAF SUB-CAMPUS TOBA TEK SINGH',
        'UAF SUB-CAMPUS DEPALPUR (OKARA)', 'UAF COMMUNITY COLLEGE PARS'
      ],
      'U.S.–PAKISTAN CENTER FOR ADVANCED STUDIES': [
        'USPCAS-AFS RESEARCH DIVISIONS', 'CLIMATE WATER BIO-RESOURCES WING',
        'CHILLED CLIMATE RESEARCH PHYTOTRONS', 'POLICY DIALOGUE & OUTREACH SUITE'
      ],
      'COMMUNITY COLLEGE': [
        'DIPLOMA IN AGRICULTURAL SCIENCES (DAS)', 'INTERMEDIATE PRE-AGRICULTURE',
        'LIVESTOCK ASSISTANT DIPLOMA (LAD)', 'FARM MACHINERY SKILL TRAINING'
      ],
      'DIRECTORATE OF CABB': [
        'CENTRE OF AGRICULTURAL BIOCHEMISTRY & BIOTECHNOLOGY',
        'PLANT TISSUE CULTURE & TRANSGENICS LAB',
        'MOLECULAR DIAGNOSTICS & GENOMICS CORE', 'BIO-INFORMATICS & GENE EDITING (CRISPR)'
      ],
      'PROFESSIONAL TRAINING AND SKILL DEVELOPMENT CENTER': [
        'SHORT COURSES IN COMMERCIAL HYDROPONICS', 'MODERN TUNNEL FARMING & GREENHOUSE DESIGN',
        'DAIRY HERD MANAGEMENT & ARTIFICIAL INSEMINATION',
        'AGRI-DRONE PILOT & PRECISION SPRAY CERTIFICATION'
      ],
      'DIRECTORATE OF WATER MANAGEMENT RESEARCH CENTRE': [
        'INDUS BASIN GROUNDWATER MONITORING NETWORK', 'PRECISION DRIP & SPRINKLER TELEMETRY',
        'SOLAR PUMPING & SALINITY RECLAMATION', 'CLIMATE ADAPTIVE IRRIGATION REGIMES'
      ]
    })),
  link('light', 'ADMISSIONS ▾',          820, 73, 118, `${SITE_URL}/#admissions`,
    menu(['UNDERGRADUATE', 'POSTGRADUATE', 'INTERNATIONAL STUDENTS'], 'admissions')),
  link('light', 'MEDIA & PUBLICATIONS ▾', 948, 73, 182, `${SITE_URL}/#latest-events`,
    menu(['PRESS RELEASES & NEWS', 'OFFICIAL NOTICES & CIRCULARS', 'ANNUAL KISSAN MELA ARCHIVE'], 'media')),

  // ── 8. Search control, matching the original round action at the right ──
  place({ type: 'button', label: '', buttonLabel: '', iconName: 'Search', style: {
    bgColor: 'rgba(255,255,255,0.10)', textColor: '#e8a62a', borderColor: 'rgba(255,255,255,0.20)',
    borderWidth: 1, borderRadius: 999, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0
  } }, 1144, 63, 40, 40),

  // ── 9. Gold accent bottom rule (matches border-b-2 border-[#ed9d09]) ──
  rule('accent', 0, 126, 1200, 4, true)
].map(el => ({
  ...el,
  // Nav items at y=73: uppercase bold 11.5px (xl:text-[11.5px] font-bold tracking-wider)
  ...(el.type === 'hyperlink' && el.y === 73 ? { fontSize: 12, fontWeight: 'bold' } : {}),
  // Utility bar links at y=12: 13px semibold (text-[13px] font-semibold tracking-wide)
  ...(el.type === 'hyperlink' && el.y === 12 ? { fontSize: 13, fontWeight: 'bold' } : {}),
  templateRegion: 'header'
}));

// ─────────────────────────────────────────────────────────────────────────────
//  FOOTER  (total canvas height = 390px)
//  Mirrors uni/src/components/Footer.tsx exactly.
//
//  Dark navy bg (#071b2d), pt-16 pb-8 layout:
//  Col 1 (lg:col-span-4): UAF logo · "University of Agriculture" · "Faisalabad, Pakistan"
//                          · Founded text · Social icons (FB · IG · LI · YT)
//  Col 2 (lg:col-span-3): "Explore UAF" heading · 6 anchor links
//  Col 3 (lg:col-span-2): "Quick Portals" heading · 6 action links
//  Col 4 (lg:col-span-3): "Contact UAF" heading · address · phone · email
//  Bottom bar (border-t border-white/10): © copyright · Privacy · Terms · Accessibility · ↑
// ─────────────────────────────────────────────────────────────────────────────
const footer = y => {
  const H = 400; // footer height (pt-16=64 + grid≈268 + border+bottom=68)
  const elements = [
    // ── Dark navy background ────────────────────────────────────────────────
    box('navy', 0, y, 1200, H, { style: { bgColor: '#071b2d', textColor: '#ffffff', borderRadius: 0 } }),

    // ── Col 1: University Brand & Mission (x=56, width≈300) ────────────────
    // Logo (w-12 h-12 = 48px, rounded-full, border border-white/20)
    image(IMG.logo, 56, y + 60, 48, 48, {
      shape: 'circle', objectFit: 'contain', alt: 'University of Agriculture Faisalabad Logo',
      style: { bgColor: '#ffffff', borderColor: 'rgba(255,255,255,0.20)', borderWidth: 1, borderRadius: 999 }
    }),
    // "University of Agriculture" — font-serif-heading font-bold text-white text-lg
    text('subtitleLight', 'University of Agriculture', 116, y + 62, 270, 24, { fontSize: 18 }),
    // "Faisalabad, Pakistan" — text-[10px] tracking-[2px] font-bold uppercase text-blue-200
    text('smallLight',    'Faisalabad, Pakistan',       116, y + 88, 240, 16, { fontSize: 10, letterSpacing: '2px', fontWeight: 'bold' }),
    // Founded description — text-xs/[13px] text-white/70 max-w-sm leading-relaxed
    text('smallLight', "Founded in 1906, UAF is Pakistan's premier institution for agricultural education, research, and innovation, addressing global challenges in food security and sustainable development.",
      56, y + 132, 300, 88),
    // Social icon links (w-9 h-9 = 36×36 rounded-full bg-white/10, gap-2.5)
    socialLink('Facebook',  56,  y + 218, 'https://facebook.com'),
    socialLink('Instagram', 100, y + 218, 'https://instagram.com'),
    socialLink('LinkedIn',  144, y + 218, 'https://linkedin.com'),
    socialLink('YouTube',   188, y + 218, 'https://youtube.com'),

    // ── Col 2: Explore UAF (x=360, width≈200) ─────────────────────────────
    // "Explore UAF" — font-serif-heading font-bold text-white text-base
    text('subtitleLight', 'Explore UAF', 406, y + 60, 195, 22, { fontSize: 16 }),
    // 6 explore links (text-xs/[13px], hover:text-[#e8a62a], gap-2, ChevronRight icon)
    ...[
      ['Vision 2050 & Heritage',     `${SITE_URL}/#vision`],
      ['Faculties & Programs',        `${SITE_URL}/#programs`],
      ['Research & Innovation',       `${SITE_URL}/#rti`],
      ['Campus Life & Green Spaces',  `${SITE_URL}/#campus`],
      ['University Administration',   `${SITE_URL}/#administration`],
      ['Latest News & Events',        `${SITE_URL}/#latest-events`]
    ].map(([label, url], i) => ({ ...link('light', label, 406, y + 96 + i * 25, 202, url), iconName: 'ChevronRight' })),

    // ── Col 3: Quick Portals (x=582, width≈185) ───────────────────────────
    // "Quick Portals" — font-serif-heading font-bold text-white text-base
    text('subtitleLight', 'Quick Portals', 727, y + 60, 188, 22, { fontSize: 16 }),
    // 6 portal links (text-xs/[13px])
    ...[
      ['Merit Calculator',    `${SITE_URL}/#merit-calculator`],
      ['Ask UAF Guide',       `${SITE_URL}/#advisor`],
      ['AgriLearn LMS',       'https://lms.uaf.edu.pk'],
      ['SIS Student Portal',  'https://sis.uaf.edu.pk'],
      ['Careers & Tenders',   `${SITE_URL}/#notices`],
      ['Meet VC Secretariat', `${SITE_URL}/#appointment`]
    ].map(([label, url], i) => ({ ...link('light', label, 727, y + 96 + i * 25, 188, url), iconName: 'ChevronRight' })),

    // ── Col 4: Contact UAF (x=820, width≈310) ─────────────────────────────
    // "Contact UAF" — font-serif-heading font-bold text-white text-base
    text('subtitleLight', 'Contact UAF', 940, y + 60, 256, 22, { fontSize: 16 }),
    // Address (MapPin icon, text-xs text-white/70)
    ({ ...link('light', 'University of Agriculture, Jail Road, Faisalabad, 38000, Punjab, Pakistan', 940, y + 96, 250, `${SITE_URL}/#contact`), iconName: 'MapPin', fontSize: 13 }),
    // Phone (Phone icon, text-xs text-white/70)
    ({ ...link('light', '+92 41 9200161-70', 940, y + 148, 250, 'tel:+924192001610'), iconName: 'Phone', fontSize: 13 }),
    // Email (Mail icon, text-xs text-white/70)
    ({ ...link('light', 'info@uaf.edu.pk / admissions@uaf.edu.pk', 940, y + 176, 250, 'mailto:info@uaf.edu.pk'), iconName: 'Mail', fontSize: 13 }),

    // ── Bottom legal & copyright bar (border-t border-white/10, pt-8) ──────
    rule('onDark', 56, y + H - 80, 1088, 1, true),
    // © copyright (text-xs text-white/50)
    text('smallLight', '© 2026 University of Agriculture, Faisalabad. All rights reserved.', 56, y + H - 50, 490, 18, { fontSize: 12 }),
    // Legal links (hover:text-white)
    link('light', 'Privacy Policy',  892, y + H - 50, 112, `${SITE_URL}/#privacy`),
    link('light', 'Terms of Use',    988, y + H - 50, 102, `${SITE_URL}/#terms`),
    link('light', 'Accessibility',  1074, y + H - 50, 104, `${SITE_URL}/#accessibility`),
    // Back to top button (w-8 h-8 rounded-full bg-white/10, ml-2)
    place(
      { type: 'container', look: 'nav', shapeType: 'circle', layoutMode: 'vertical',
        style: { bgColor: 'rgba(255,255,255,0.10)', textColor: '#ffffff', borderColor: 'transparent', borderWidth: 0, borderRadius: 999 } },
      1164, y + H - 62, 32, 32
    ),
    text('smallLight', '↑', 1164, y + H - 52, 32, 18)
  ];
  return elements.map(el => ({ ...el, templateRegion: 'footer' }));
};

// The templates include their own editable campus hero area.
// Banner starts at y=130 to clear the full header (42px utility + 84px nav + 4px accent rule)
const banner = (src, height) => [
  image(src, 0, 130, 1200, height, { shape: 'square', alt: 'UAF campus' }),
  box('overlay', 0, 130, 1200, height)
];

// Department section templates mirror the content layouts in
// uni/src/components/FacultyPortalPage.tsx. Shared header, faculty hero/banner,
// pill navigation and footer are injected by the university site, so these
// templates start at the main-content area only. Images are editable slots.
const sectionHeading = (eyebrow, title, y = 40) => [
  text('label', eyebrow.toUpperCase(), 56, y, 1088, 20),
  text('title', title, 56, y + 26, 1088, 44),
  rule('line', 56, y + 76, 1088, 1, true)
];

const departmentHome = () => [
  box('card', 40, 40, 1120, 510),
  box('nav', 40, 40, 4, 510),
  text('label', 'ACADEMIC OVERVIEW • DEPARTMENT NAME', 68, 64, 690, 20),
  text('subtitle', 'Department overview title', 68, 92, 690, 42),
  image('/templates/campus-facade.jpg', 790, 68, 336, 248, { alt: 'Department building or academic facility', shape: 'rounded' }),
  box('light', 790, 316, 336, 56),
  text('subtitle', 'Department building caption', 806, 324, 304, 22),
  text('small', 'University of Agriculture, Faisalabad', 806, 346, 304, 18),
  text('body', 'Introduce the department, its academic history, mission, and areas of excellence. This text follows the same flowing, left-text and right-image layout used on the live department overview.', 68, 154, 690, 92),
  text('body', 'Add the department’s programs, research strengths, practical facilities, and contribution to the university. Continue the description below the image area as it does on the university page.', 68, 256, 1058, 72),
  rule('line', 68, 390, 1060, 1, true),
  text('subtitle', 'Specialized Research Laboratories & Units', 68, 412, 1060, 28),
  ...[
    ['Research Laboratory', 68], ['Academic Unit', 426], ['Research Facility', 784]
  ].flatMap(([label, x]) => [box('light', x, 456, 338, 62), text('body', label, x + 16, 474, 306, 28)]),
  ...[
    ['Academic Units', '7 Departments'], ['Specialized Institutes', '2 Institutes'], ['Facilities & Labs', '3 Research Farms']
  ].flatMap(([label, value], i) => {
    const x = 40 + i * 380;
    return [box('card', x, 570, 360, 98), text('label', label.toUpperCase(), x + 22, 588, 316, 18), text('subtitle', value, x + 22, 612, 316, 36)];
  })
];

const departmentDean = () => [
  box('card', 40, 40, 1120, 470),
  ...sectionHeading('Faculty leadership • faculty name', 'Dean’s Secretariat & Official Message', 64),
  image('/templates/campus-facade.jpg', 72, 166, 270, 280, { alt: 'Dean portrait — replace with a dean photograph', shape: 'rounded' }),
  text('subtitle', 'Dean name', 72, 454, 270, 28, { align: 'center' }),
  text('body', 'Designation and department', 72, 484, 270, 24, { align: 'center' }),
  text('subtitle', 'Message from the Dean', 382, 166, 730, 34),
  box('light', 382, 208, 730, 170),
  text('body', 'Write the dean’s message, welcome, vision, and priorities for the faculty. Keep the message in this highlighted panel to match the university’s dean page.', 406, 232, 682, 116),
  ...[
    ['Email address', 382], ['Phone number', 752]
  ].flatMap(([value, x]) => [box('light', x, 404, 350, 54), text('body', value, x + 18, 420, 314, 24)]),
  text('small', 'Faculty / department', 72, 510, 270, 18)
];

const departmentEducational = () => [
  ...sectionHeading('Educational programs', 'Undergraduate & Postgraduate Programs'),
  box('card', 40, 142, 1120, 166),
  image('/templates/campus-grounds.jpg', 64, 162, 210, 126, { alt: 'Teaching, campus, or field-learning photo', shape: 'rounded' }),
  text('body', 'Describe the degree programs, academic pathways, semester structure, and practical learning opportunities offered by this faculty.', 300, 166, 820, 72),
  text('subtitle', 'Undergraduate degree name', 300, 246, 820, 28),
  ...['Major / program 1', 'Major / program 2', 'Major / program 3', 'Major / program 4'].flatMap((label, i) => {
    const x = 40 + i * 285;
    return [box('light', x, 332, 265, 66), text('body', label, x + 16, 350, 233, 30)];
  }),
  ...[
    ['Advanced Research', 'M.Sc. (Hons.) & Ph.D. Programs', 'Describe postgraduate study and supervised research opportunities.'],
    ['Experiential Learning', 'Mandatory Field Internship', 'Explain placements, field practice, and professional supervision.'],
    ['Community Training', 'Vocational Short Courses', 'List short courses, practical skills, and intended learners.']
  ].flatMap(([eyebrow, title, body], i) => {
    const x = 40 + i * 380;
    return [box('card', x, 422, 360, 190), text('label', eyebrow.toUpperCase(), x + 22, 444, 316, 18), text('subtitle', title, x + 22, 472, 316, 52), text('body', body, x + 22, 532, 316, 62)];
  })
];

const departmentDepartments = () => [
  ...sectionHeading('Academic divisions • faculty name', 'Departments & Academic Units'),
  text('body', 'Introduce the departments and units within this faculty. Each card follows the university’s clean academic-unit layout and leaves a replaceable image area.', 56, 132, 1088, 56),
  ...[
    ['Department of Agronomy', 'Department focus, academic programs, research, and services.'],
    ['Department of Plant Breeding & Genetics', 'Department focus, academic programs, research, and services.'],
    ['Department of Soil & Environmental Sciences', 'Department focus, academic programs, research, and services.'],
    ['Department of Entomology', 'Department focus, academic programs, research, and services.'],
    ['Department of Plant Pathology', 'Department focus, academic programs, research, and services.'],
    ['Department of Forestry & Range Management', 'Department focus, academic programs, research, and services.']
  ].flatMap(([title, body], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 40 + col * 380;
    const y = 208 + row * 250;
    return [
      box('card', x, y, 360, 222),
      box('nav', x, y, 4, 222),
      image('/templates/campus-facade.jpg', x + 16, y + 16, 328, 100, { alt: 'Department photo', shape: 'rounded' }),
      text('subtitle', title, x + 18, y + 128, 324, 34),
      text('body', body, x + 18, y + 166, 324, 46)
    ];
  })
];

const departmentInstitutes = () => [
  ...sectionHeading('Specialized institutes • faculty name', 'Institutes & Centres'),
  text('body', 'Present constituent institutes, specialized centres, and their areas of work using the faculty’s two-column academic feature cards.', 56, 132, 1088, 56),
  ...[
    ['Institute of Horticultural Sciences', 'Research, teaching, facilities, and academic opportunities offered by the institute.'],
    ['Specialized Research Centre', 'Research focus, facilities, community outreach, and collaborations.'],
    ['Constituent Institute', 'Describe its programs, teams, and work across the university.'],
    ['Centre for Advanced Studies', 'Describe its areas of work, facilities, and academic opportunities.']
  ].flatMap(([title, body], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 40 + col * 570;
    const y = 206 + row * 240;
    return [
      box('card', x, y, 550, 210),
      box('nav', x, y, 4, 210),
      image('/templates/campus-grounds.jpg', x + 18, y + 18, 170, 126, { alt: 'Institute or centre photo', shape: 'rounded' }),
      text('label', 'SPECIALIZED INSTITUTE', x + 208, y + 22, 320, 20),
      text('subtitle', title, x + 208, y + 52, 320, 52),
      text('body', body, x + 208, y + 110, 320, 78)
    ];
  })
];

const departmentPortfolio = () => [
  box('card', 40, 40, 1120, 212),
  text('label', 'RESEARCH & SCHOLARLY PORTFOLIO', 64, 62, 740, 22),
  text('title', 'Scholarly Research, Journals & Publications', 64, 92, 1040, 42),
  text('body', 'Summarize research strengths, indexed publications, projects, and collaborations. Keep the introduction in the same compact summary panel used on the university portfolio page.', 64, 146, 1040, 56),
  rule('line', 64, 212, 1072, 1, true),
  box('card', 40, 272, 1120, 84),
  ...['Journal Articles', 'Conferences', 'Faculty Directory'].flatMap((tab, i) => {
    const x = 64 + i * 214;
    return [box(i === 0 ? 'nav' : 'light', x, 292, 196, 44), text(i === 0 ? 'bodyLight' : 'body', tab, x + 16, 304, 164, 24)];
  }),
  text('label', 'DISCIPLINE / DEPARTMENT', 64, 378, 740, 18),
  text('small', 'Search articles, authors, journals, and DOI', 64, 406, 740, 22),
  ...[
    ['Department of …', 'Publication or research output title', 'Authors • Journal / conference • Year • DOI'],
    ['Department of …', 'Publication or research output title', 'Authors • Journal / conference • Year • DOI'],
    ['Department of …', 'Publication or research output title', 'Authors • Journal / conference • Year • DOI']
  ].flatMap(([dept, title, body], i) => {
    const y = 448 + i * 118;
    return [
      box('card', 40, y, 1120, 100),
      text('label', dept.toUpperCase(), 62, y + 16, 320, 18),
      text('subtitle', title, 62, y + 40, 1020, 26),
      text('small', body, 62, y + 70, 1020, 20)
    ];
  })
];

// ── 2. Notice / announcement ─────────────────────────────────────────────────
const notice = () => [
  ...header(),
  box('navy', 0, 130, 1200, 204),
  text('labelGold', 'Official notice', 80, 176, 400, 18),
  text('pageTitleLight', 'Notice title goes here', 80, 204, 1000, 52),
  text('bodyLight', 'A one-line summary of what this notice is about.', 80, 268, 800, 26),

  box('light', 0, 334, 1200, 110),
  ...[['Notice no.', 'UAF/…/2026/000'], ['Date', 'DD Month 2026'], ['Issued by', 'Office of the Registrar']].flatMap(([l, v], i) => [
    text('label', l, 80 + i * 360, 364, 320, 18),
    text('subtitle', v, 80 + i * 360, 388, 320, 30)
  ]),

  text('title', 'Details', 80, 496, 700, 44),
  text('body', 'Write the main message of the notice here. Start with the most important information: who it is for, what they need to do and by when. Short paragraphs are easier to read than one long block of text.', 80, 554, 700, 110),
  text('body', 'Add a second paragraph if you need to explain more, for example how to apply, where to submit documents or who to contact with questions.', 80, 682, 700, 84),
  list('plain', 'Required documents', [
    'Attested copy of CNIC / B-Form',
    'Academic certificates and transcripts',
    'Recent passport-size photographs',
    'Fee payment receipt'
  ], 80, 816, 700, 190),
  list('panel', 'Important dates', [
    'Notice issued: DD Month',
    'Last date to apply: DD Month',
    'Result announced: DD Month'
  ], 830, 554, 290, 220, 'disc'),

  rule('line', 80, 1046, 1040),
  button('primary', 'Download full notice (PDF)', 80, 1086, 290, 48, { iconName: 'Download' }),
  button('outline', 'Back to all notices', 390, 1086, 230, 48, { iconName: 'None' }),
  ...footer(1176)
];

// ── 3. Admissions information ────────────────────────────────────────────────
const admissions = () => [
  ...header(),
  ...banner(IMG.grounds, 330),
  text('labelGold', 'Admissions 2026', 80, 196, 400, 18),
  text('pageTitleLight', 'Apply to the University of Agriculture', 80, 226, 760, 100),
  text('bodyLight', 'Everything you need to know about eligibility, important dates and how to apply.', 80, 338, 640, 56),

  text('label', 'Eligibility', 80, 520, 400, 18),
  text('title', 'Who can apply?', 80, 550, 600, 44),
  list('plain', '', [
    'Intermediate (F.Sc / equivalent) with the minimum marks required',
    'Pakistani nationals and eligible overseas applicants',
    'Valid CNIC or B-Form',
    'Appearance in the university entry test',
    'Documents verified at the time of admission',
    'Fee paid within the announced dates'
  ], 80, 616, 560, 250),
  list('panel', 'Key dates', [
    'Applications open: DD Month 2026',
    'Last date to apply: DD Month 2026',
    'Entry test: DD Month 2026',
    'Merit list: DD Month 2026'
  ], 720, 516, 400, 300, 'disc'),

  box('light', 0, 916, 1200, 380),
  text('label', 'How to apply', 80, 972, 1040, 18, { align: 'center' }),
  text('title', 'Four simple steps', 80, 1002, 1040, 44, { align: 'center' }),
  ...[
    ['Register', 'Sign up on the admissions portal.'],
    ['Fill the form', 'Enter your details and upload documents.'],
    ['Pay the fee', 'Submit the application fee online.'],
    ['Sit the test', 'Appear in the entry test on your date.']
  ].flatMap(([t, d], i) => {
    const x = 80 + i * 268;
    return [
      box('card', x, 1078, 236, 170),
      text('stat', String(i + 1), x + 24, 1096, 80, 50),
      text('subtitle', t, x + 24, 1156, 188, 28),
      text('small', d, x + 24, 1192, 188, 44)
    ];
  }),

  box('green', 0, 1296, 1200, 180),
  text('titleLight', 'Ready to begin your journey?', 80, 1348, 640, 44),
  text('bodyLight', 'Applications are open. It only takes a few minutes to start.', 80, 1398, 640, 26),
  button('gold', 'Apply online', 790, 1352, 160, 48),
  button('outlineLight', 'Prospectus', 970, 1352, 150, 48, { iconName: 'Download' }),
  ...footer(1476)
];

// ── 4. Event / seminar ───────────────────────────────────────────────────────
const event = () => [
  ...header(),
  ...banner(IMG.facade, 380),
  text('labelGold', 'Seminar · Workshop · Conference', 80, 236, 600, 18),
  text('hero', 'Event title goes here', 80, 268, 800, 70),
  text('bodyLight', 'Hosted by the Department of …', 80, 362, 640, 28),

  box('light', 0, 510, 1200, 130),
  ...[['Date', 'Day, DD Month 2026', 'Start time – end time'], ['Venue', 'Venue name', 'Building, University of Agriculture'], ['Entry', 'Free entry', 'Registration required']].flatMap(([l, v, s], i) => [
    text('label', l, 80 + i * 360, 542, 300, 18),
    text('subtitle', v, 80 + i * 360, 566, 320, 30),
    text('small', s, 80 + i * 360, 602, 320, 20)
  ]),

  text('title', 'About this event', 80, 700, 640, 44),
  text('body', 'Tell visitors what the event is about, who should attend and what they will learn. Mention any guest speakers and the main topics. Keep it short and friendly so people can decide quickly whether to join.', 80, 758, 640, 130),
  text('body', 'Add practical details here, such as parking, dress code or what to bring.', 80, 906, 640, 104),
  list('panel', 'Programme', [
    '09:30  Registration',
    '10:00  Welcome and opening remarks',
    '10:30  Keynote session',
    '12:00  Panel discussion',
    '13:00  Closing and refreshments'
  ], 780, 700, 340, 300, 'none'),

  box('tint', 0, 1056, 1200, 590),
  text('label', 'Registration', 80, 1112, 400, 18),
  text('title', 'Register your interest', 80, 1142, 700, 44),
  field('Full name', 'Your name', 'text', 80, 1216, 500, 76),
  field('Email address', 'name@example.com', 'email', 620, 1216, 500, 76),
  field('Department', '', 'select', 80, 1312, 500, 76, { options: 'Agronomy, Entomology, Horticulture, Soil Science, Other' }),
  field('Phone (optional)', '03XX XXXXXXX', 'text', 620, 1312, 500, 76),
  field('Message (optional)', 'Anything we should know?', 'textarea', 80, 1408, 1040, 130),
  button('primary', 'Submit registration', 80, 1566, 240, 48, { iconName: 'Send' }),
  ...footer(1646)
];

// ── 5. Contact us ────────────────────────────────────────────────────────────
const contact = () => [
  ...header(),
  box('light', 0, 130, 1200, 210),
  text('label', 'Contact us', 80, 178, 400, 18),
  text('pageTitle', "We'd love to hear from you", 80, 206, 800, 52),
  text('body', 'Reach the right office quickly: call, email or send us a message below.', 80, 272, 700, 52),

  ...[
    ['Visit us', 'University of Agriculture,\nFaisalabad 38040, Pakistan'],
    ['Call us', '+92 41 9200161-70\nUniversity switchboard'],
    ['Email us', 'info@uaf.edu.pk\nadmissions@uaf.edu.pk']
  ].flatMap(([t, d], i) => {
    const x = 80 + i * 355;
    return [box('card', x, 376, 330, 170), text('subtitle', t, x + 26, 402, 278, 28), text('body', d, x + 26, 444, 278, 84)];
  }),

  text('label', 'Send a message', 80, 606, 400, 18),
  text('title', 'How can we help?', 80, 636, 600, 44),
  field('Full name', 'Your name', 'text', 80, 702, 600, 76),
  field('Email address', 'name@example.com', 'email', 80, 794, 600, 76),
  field('Subject', '', 'select', 80, 886, 600, 76, { options: 'Admissions, Academics, Research, Events, Other' }),
  field('Message', 'Write your message here', 'textarea', 80, 978, 600, 150),
  button('primary', 'Send message', 80, 1146, 200, 48, { iconName: 'Send' }),
  image(IMG.grounds, 740, 702, 380, 260, { alt: 'UAF campus', caption: 'Main campus, Faisalabad' }),
  list('panel', 'Office hours', ['Monday – Friday: add hours here', 'Saturday: add hours here'], 740, 996, 380, 150, 'none'),
  ...footer(1226)
];

// ── 6. Faculty profile ───────────────────────────────────────────────────────
const facultyProfile = () => [
  ...header(),
  image('', 80, 186, 280, 340, { alt: 'Profile photo' }),
  text('label', 'Professor', 410, 192, 500, 18),
  text('pageTitle', 'Dr. Full Name', 410, 220, 700, 52),
  text('subtitle', 'Department of …', 410, 284, 700, 30),
  text('body', 'Write a short biography here: your academic background, your main areas of work and the courses you teach. Two or three sentences are enough. Keep it simple and in the third person.', 410, 330, 710, 110),
  link('default', 'name@uaf.edu.pk', 410, 456, 300, 'mailto:'),
  text('small', 'Office: Building / Room number', 410, 484, 400, 20),
  button('primary', 'Download CV', 410, 508, 180, 44, { iconName: 'Download' }),
  button('outline', 'Google Scholar', 610, 508, 180, 44, { iconName: 'None' }),

  rule('line', 80, 586, 1040),
  text('title', 'Research interests', 80, 626, 500, 44),
  list('plain', '', ['Research area one', 'Research area two', 'Research area three', 'Research area four'], 80, 686, 500, 200, 'disc'),
  text('title', 'Education', 640, 626, 480, 44),
  list('panel', '', ['PhD, University name, Year', 'MSc, University name, Year', 'BSc, University name, Year'], 640, 686, 480, 200, 'disc'),

  box('light', 0, 946, 1200, 380),
  text('title', 'Selected publications', 80, 992, 700, 44),
  list('plain', '', [
    'Author, A. (2026). Title of the first publication. Journal name, volume(issue), pages.',
    'Author, A. (2025). Title of the second publication. Journal name, volume(issue), pages.',
    'Author, A. (2024). Title of the third publication. Journal name, volume(issue), pages.'
  ], 80, 1052, 1040, 230, 'decimal'),
  ...footer(1326)
];

// ── 7. Blank page with the UAF header and footer ─────────────────────────────
const brandedBlank = () => [
  ...header(),
  text('pageTitle', 'Page title', 80, 186, 800, 52),
  text('body', 'Start writing here. Use the "Add to your page" menu on the left to add text, images, buttons, lists and forms. The UAF header and footer are already in place.', 80, 254, 700, 80),
  ...footer(606)
];

// ── 8. Faculty overview (card layout of the university faculty page) ────────
// White profile card with a thin blue left edge (paragraph, divider, three
// bullets with bold labels, campus photo with caption), then three key-figure
// cards. Every part is editable text or an image.
// Note: the builder gives every element a minimum width of 80px, so the blue
// edge is an 80px blue block placed BEHIND the card; only its left 4px shows.
const textHeight = (str, width, fontSize = 16, lineHeight = 1.65) =>
  Math.round(Math.ceil((str.length * fontSize * 0.52) / width) * fontSize * lineHeight + 8);
const richText = (look, html, x, y, w, h, plain) => text(look, plain ?? html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'), x, y, w, h, { richHtml: html });

const facultyOverview = () => {
  const Y = 242;                 // top of the profile card (content starts below 130px header + ~60px for label+title)
  const L = 116, TW = 700;       // text column
  const IX = 846, IW = 250;      // photo column
  const paragraph = 'The Faculty of Agriculture is the largest faculty in the University in terms of infrastructure and student enrollment. Academically, it offers a four-year B.Sc. (Hons.) Agri. Sciences degree where students complete common coursework during their first four semesters before selecting a major prior to their fifth semester. Practical training and high-tech research are facilitated through dedicated facilities, including Departmental Farms, the Postgraduate Agricultural Research Station (PARS), the Saline Agriculture Research Cell (SARC), and the Plant Health Clinic. To further strengthen hands-on learning, an internship programme has been integrated into the updated scheme of studies, supported by highly qualified teaching staff recognized by HEC to supervise Ph.D. candidates. Over time, the faculty has trained more than 11,000 undergraduate and 6,000 postgraduate students.';
  const bullets = [
    '<strong>Academic Divisions:</strong> Comprises 6 Departments (Agronomy, Plant Breeding &amp; Genetics, Soil &amp; Environmental Sciences, Entomology, Plant Pathology, Forestry &amp; Range Management) and 1 Constituent Institute(s) (Institute of Horticultural Sciences).',
    '<strong>Degree &amp; Programs:</strong> Offers <strong>B.Sc. (Hons.) Agriculture</strong> with specializations in Agronomy, Plant Breeding &amp; Genetics, Soil Science, Entomology, Plant Pathology, Horticulture.',
    '<strong>Accreditation &amp; Standards:</strong> Recognized by HEC Pakistan, relevant professional accreditation councils, and international research consortiums.'
  ];

  let y = Y + 28;
  const paraH = textHeight(paragraph, TW);
  const paraEl = text('body', paragraph, L, y, TW, paraH);
  y += paraH + 14;
  const ruleEl = rule('line', L, y, TW);
  y += 28;
  // Each bullet is one text block with a hanging indent (blue dot + text).
  const dot = '<span style="display:inline-block;width:18px;text-indent:0;color:#163887;font-weight:700">•</span>';
  const bulletEls = bullets.map(html => {
    const plain = html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
    const h = textHeight(plain, TW - 18);
    const el = richText('body', `<span style="display:block;padding-left:18px;text-indent:-18px">${dot}${html}</span>`, L, y, TW, h, '• ' + plain);
    y += h + 10;
    return el;
  });
  const cardH = Math.max(y, Y + 28 + 140 + 84) + 18 - Y;

  const SY = Y + cardH + 28;       // top of the key-figure cards
  const stat = (i, icon, label, value) => {
    const x = 80 + i * 355;
    return [
      box('card', x, SY, 330, 112),
      place({ type: 'container', look: 'tint', shapeType: 'rounded', layoutMode: 'vertical', style: {} }, x + 16, SY + 16, 80, 80),
      text('subtitle', icon, x + 16, SY + 42, 80, 30, { align: 'center' }),
      text('label', label, x + 108, SY + 30, 210, 18),
      text('subtitle', value, x + 108, SY + 54, 210, 30)
    ];
  };

  return [
    text('label', 'Academic excellence • Faculty of Agriculture', 80, 146, 700, 18),
    text('title', 'Overview & academic profile', 80, 174, 1040, 44),

    // Blue edge sits behind the card; the card starts 4px to the right of it.
    place({ type: 'container', look: 'green', shapeType: 'rounded', layoutMode: 'vertical', style: {} }, 80, Y, 80, cardH),
    box('card', 84, Y, 1036, cardH),
    paraEl, ruleEl, ...bulletEls,

    image(IMG.facade, IX, Y + 28, IW, 140, { alt: 'Agriculture Academic Complex' }),
    box('light', IX, Y + 28 + 140, IW, 84),
    richText('small', '<strong>Agriculture Academic Complex</strong>', IX + 14, Y + 28 + 140 + 12, IW - 28, 20),
    text('small', 'Est. 1906 • University of Agriculture, Faisalabad', IX + 14, Y + 28 + 140 + 38, IW - 28, 36),

    ...stat(0, '🏢', 'Academic units', '7 Departments'),
    ...stat(1, '📖', 'Specialized institutes', '2 Institutes'),
    ...stat(2, '🎓', 'Facilities & labs', '3 Research Farms')
  ];
};

export const PAGE_TEMPLATES = [
  { id: 'site-header', name: 'Header', category: 'Header', pageTitle: 'University header', description: 'Edit the shared university header. Publishing it updates the header across every page.', build: header },
  { id: 'site-footer', name: 'Footer', category: 'Footer', pageTitle: 'University footer', description: 'Edit the shared university footer. Publishing it updates the footer across every page.', build: () => footer(0) },
  { id: 'department-home', name: 'Overview', category: 'Department pages', pageTitle: 'Department overview', departmentSection: 'overview', description: 'Editable academic overview content. The department hero, tabs, header, and footer are supplied by the university site.', build: departmentHome },
  { id: 'department-dean', name: 'The Dean', category: 'Department pages', pageTitle: 'The Dean', departmentSection: 'dean', description: 'Content area for the dean’s message and leadership profile.', build: departmentDean },
  { id: 'department-educational', name: 'Educational Department', category: 'Department pages', pageTitle: 'Educational Department', departmentSection: 'educational-department', description: 'Content area for academic departments, subjects, and programs.', build: departmentEducational },
  { id: 'department-departments', name: 'Departments', category: 'Department pages', pageTitle: 'Departments', departmentSection: 'departments', description: 'Content area for the faculty’s departments and academic units.', build: departmentDepartments },
  { id: 'department-institutes', name: 'Institutes', category: 'Department pages', pageTitle: 'Institutes', departmentSection: 'institutes', description: 'Content area for institutes, centres, and their areas of work.', build: departmentInstitutes },
  { id: 'department-portfolio', name: 'Portfolio & Research', category: 'Department pages', pageTitle: 'Portfolio & Research', departmentSection: 'portfolio-research', description: 'Content area for research projects, publications, facilities, and partnerships.', build: departmentPortfolio },
  { id: 'admissions', name: 'Admissions information', category: 'University pages', pageTitle: 'Admissions information', description: 'Eligibility list, key dates, four application steps and an apply button.', build: admissions },
  { id: 'notice', name: 'Notice / announcement', category: 'University pages', pageTitle: 'Notice', description: 'Official notice with reference details, required documents and a PDF download.', build: notice },
  { id: 'event', name: 'Event / seminar', category: 'University pages', pageTitle: 'Event page', description: 'Event banner, date and venue, programme schedule and a registration form.', build: event },
  { id: 'faculty-profile', name: 'Faculty profile', category: 'University pages', pageTitle: 'Faculty profile', description: 'Photo, biography, contact links, research interests and publications.', build: facultyProfile },
  { id: 'contact', name: 'Contact us', category: 'University pages', pageTitle: 'Contact us', description: 'Address, phone and email cards with a message form and office hours.', build: contact },
  { id: 'branded-blank', name: 'Blank page', category: 'Start simple', pageTitle: 'New page', description: 'Start with editable page content. The shared site header and footer are added automatically.', build: brandedBlank },
  { id: 'faculty-overview', name: 'Faculty overview', category: 'Faculty pages', pageTitle: 'Faculty overview', description: 'Profile card with paragraph, bold-label bullets, campus photo and three key-figure cards.', build: facultyOverview }
];

/** Creates a fresh copy (new element ids) of a template. */
export function buildTemplate(id) {
  const template = PAGE_TEMPLATES.find(t => t.id === id);
  if (!template) return null;
  start();
  const isGlobalChrome = id === 'site-header' || id === 'site-footer';
  const elements = template.build().filter(element => isGlobalChrome || !element.templateRegion).map(element => {
    const themed = themeElement(element);
    const { look, ...materialized } = themed;
    if (id === 'site-footer') {
      if (materialized.type === 'text' && ['University of Agriculture', 'Explore UAF', 'Quick Portals', 'Contact UAF'].includes(materialized.text)) {
        materialized.fontSize = materialized.text === 'University of Agriculture' ? 18 : 16;
      } else if (materialized.type === 'text' && materialized.text?.startsWith('Founded in 1906')) {
        materialized.fontSize = 13;
      } else if (materialized.type === 'hyperlink') {
        materialized.fontSize = materialized.text?.startsWith('Privacy Policy') || materialized.text?.startsWith('Terms of Use') || materialized.text?.startsWith('Accessibility') ? 12 : 13;
        materialized.fontWeight = materialized.text === 'Merit Calculator' ? 700 : 400;
      }
    }
    return materialized;
  });
  return {
    id: template.id,
    title: template.pageTitle,
    meta: isGlobalChrome
      ? { templateType: id === 'site-header' ? 'site-header' : 'site-footer', ...(id === 'site-header' ? { headerTemplateVersion: 2 } : {}) }
      : { usesSiteChrome: true, ...(template.departmentSection ? { departmentSection: template.departmentSection } : {}) },
    elements
  };
}
