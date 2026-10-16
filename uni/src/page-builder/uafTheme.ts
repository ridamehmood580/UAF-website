// ─────────────────────────────────────────────────────────────────────────────
//  UAF BRAND THEME  —  The single place controlling the UAF Page Studio look.
//  Colors and typography matched exactly to the UAF Official Web Portal.
// ─────────────────────────────────────────────────────────────────────────────

export const STYLE_LOCK = false;

// Authentic UAF university palette
export const UAF = {
  navBar: '#071b2d',   // Top header bar (deep navy)
  navyDark: '#071b2d', // Dark sections, primary headings
  navy: '#102a43',     // Secondary navy
  green: '#163887',    // Primary brand blue (buttons, accents)
  greenHover: '#102a6b',
  teal: '#1d4e89',     // Small labels / eyebrow text
  tealLight: '#e8eef9',// Soft blue background
  gold: '#e8a62a',     // Highlight / call-to-action gold
  goldAccent: '#c99738',
  emerald: '#60a5fa',
  cream: '#f7f5f0',
  light: '#f5f8fa',    // Light grey canvas background
  white: '#ffffff',
  text: '#46505a',     // Body text
  textDark: '#18212b',
  border: '#e5eaee',
  borderDark: 'rgba(255,255,255,0.15)'
};

export const FONT = {
  heading: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
};

const WHITE_SOFT = 'rgba(255,255,255,0.85)';
const WHITE_DIM = 'rgba(255,255,255,0.72)';

// Text looks
export const TEXT_STYLES: Record<string, any> = {
  // Headings
  pageTitle:      { label: 'Page title',      group: 'Headings', tag: 'h1', fontSize: 40, fontWeight: 'bold', font: 'heading', color: UAF.navyDark, lineHeight: 1.2 },
  title:          { label: 'Section title',   group: 'Headings', tag: 'h2', fontSize: 32, fontWeight: 'bold', font: 'heading', color: UAF.navyDark, lineHeight: 1.25 },
  subtitle:       { label: 'Sub-heading',     group: 'Headings', tag: 'h3', fontSize: 20, fontWeight: 'bold', font: 'heading', color: UAF.navy, lineHeight: 1.3 },
  // Body text
  body:           { label: 'Paragraph',       group: 'Body text', tag: 'p',  fontSize: 16, fontWeight: 'normal', font: 'body', color: UAF.text, lineHeight: 1.65 },
  small:          { label: 'Small note',      group: 'Body text', tag: 'p',  fontSize: 13, fontWeight: 'normal', font: 'body', color: UAF.text, lineHeight: 1.6 },
  label:          { label: 'Small label (CAPS)', group: 'Body text', tag: 'p', fontSize: 12, fontWeight: 'bold', font: 'body', color: '#000000', lineHeight: 1.4, letterSpacing: '0.14em', textTransform: 'uppercase' },
  stat:           { label: 'Big number',      group: 'Body text', tag: 'p',  fontSize: 44, fontWeight: 'bold', font: 'heading', color: '#000000', lineHeight: 1.1 },
  // On dark backgrounds
  hero:           { label: 'Hero title',      group: 'On dark background', tag: 'h1', fontSize: 48, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.15 },
  pageTitleLight: { label: 'Page title (light)', group: 'On dark background', tag: 'h1', fontSize: 40, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.2 },
  titleLight:     { label: 'Section title (light)', group: 'On dark background', tag: 'h2', fontSize: 30, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.25 },
  subtitleLight:  { label: 'Sub-heading (light)', group: 'On dark background', tag: 'h3', fontSize: 20, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.3 },
  bodyLight:      { label: 'Paragraph (light)', group: 'On dark background', tag: 'p', fontSize: 15, fontWeight: 'normal', font: 'body', color: WHITE_SOFT, lineHeight: 1.65 },
  smallLight:     { label: 'Small note (light)', group: 'On dark background', tag: 'p', fontSize: 13, fontWeight: 'normal', font: 'body', color: WHITE_DIM, lineHeight: 1.6 },
  labelGold:      { label: 'Gold label (CAPS)', group: 'On dark background', tag: 'p', fontSize: 12, fontWeight: 'bold', font: 'body', color: UAF.gold, lineHeight: 1.4, letterSpacing: '0.14em', textTransform: 'uppercase' },
  statGold:       { label: 'Big number (gold)', group: 'On dark background', tag: 'p', fontSize: 44, fontWeight: 'bold', font: 'heading', color: UAF.gold, lineHeight: 1.1 },
  // Brand Header
  brandSmall:     { hidden: true, label: 'Brand small', tag: 'p', fontSize: 11, fontWeight: 'bold', font: 'body', color: '#e7e5e4', lineHeight: 1.2, letterSpacing: '0.2em', textTransform: 'uppercase' },
  brand:          { hidden: true, label: 'Brand name', tag: 'p', fontSize: 22, fontWeight: 'black', font: 'heading', color: UAF.white, lineHeight: 1.1, letterSpacing: '0.06em', textTransform: 'uppercase' },
  brandAccent:    { hidden: true, label: 'Brand place', tag: 'p', fontSize: 11, fontWeight: 'bold', font: 'body', color: UAF.gold, lineHeight: 1.2, letterSpacing: '0.24em', textTransform: 'uppercase' }
};

const LEGACY_TAG_LOOK: Record<string, string> = {
  h1: 'pageTitle',
  h2: 'title',
  h3: 'subtitle',
  h4: 'subtitle',
  p: 'body',
  badge: 'label'
};

// Panel and Container looks
export const SURFACES: Record<string, any> = {
  white:   { label: 'White', bg: UAF.white, text: UAF.textDark },
  light:   { label: 'Light grey', bg: UAF.light, text: UAF.textDark },
  cream:   { label: 'Cream', bg: UAF.cream, text: UAF.textDark },
  tint:    { label: 'Soft blue', bg: UAF.tealLight, text: UAF.textDark },
  green:   { label: 'UAF Blue', bg: UAF.green, text: UAF.white },
  navy:    { label: 'Deep Navy', bg: UAF.navyDark, text: UAF.white },
  gold:    { label: 'Gold Accent', bg: UAF.gold, text: UAF.navyDark },
  overlay: { label: 'Dark photo overlay', bg: 'rgba(7,27,45,0.76)', text: UAF.white },
  card:    { label: 'White card with border', bg: UAF.white, text: UAF.textDark, border: UAF.border, radius: 12, shadow: 'sm' },
  nav:     { hidden: true, label: 'Header bar', bg: UAF.navBar, text: UAF.white }
};

// Buttons
export const BUTTONS: Record<string, any> = {
  primary:      { label: 'Primary (UAF Blue)', bg: UAF.green, text: UAF.white },
  gold:         { label: 'Highlight (Gold)', bg: UAF.gold, text: UAF.navyDark },
  outline:      { label: 'Outline (Blue)', bg: 'transparent', text: '#000000', border: UAF.green },
  outlineLight: { label: 'Outline (White on Dark)', bg: 'transparent', text: UAF.white, border: UAF.white },
  dark:         { label: 'Deep Navy', bg: UAF.navyDark, text: UAF.white }
};

export const LISTS: Record<string, any> = {
  plain: { label: 'Plain list' },
  panel: { label: 'Panel with border' }
};

export const DIVIDERS: Record<string, any> = {
  line:   { label: 'Thin line', color: UAF.border, thickness: 1 },
  accent: { label: 'Gold accent bar', color: UAF.gold, thickness: 3 },
  onDark: { hidden: true, label: 'Line on dark', color: 'rgba(255,255,255,0.18)', thickness: 1 }
};

export const LINKS: Record<string, any> = {
  default: { label: 'Blue link', color: '#000000' },
  light:   { label: 'White link', color: UAF.white },
  gold:    { label: 'Gold link',  color: UAF.gold }
};

export const LOOKS_BY_TYPE: Record<string, any> = {
  text: TEXT_STYLES,
  container: SURFACES,
  button: BUTTONS,
  list: LISTS,
  divider: DIVIDERS,
  hyperlink: LINKS
};

export const LOOK_LABEL: Record<string, string> = {
  text: 'Text style',
  container: 'Background style',
  button: 'Button style',
  list: 'List style',
  divider: 'Line style',
  hyperlink: 'Link style'
};

const pick = (table: Record<string, any>, key: string, fallback: string) => (table[key] ? key : fallback);
const noPad = { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };

const cache = new WeakMap();

export function themeElement(el: any) {
  if (!el || (!STYLE_LOCK && !el.look)) return el;
  if (cache.has(el)) return cache.get(el);
  const keepLayout = { align: el.style?.align, marginTop: el.style?.marginTop, marginBottom: el.style?.marginBottom };
  let out = el;

  switch (el.type) {
    case 'text': {
      const look = pick(TEXT_STYLES, el.look, LEGACY_TAG_LOOK[el.tag] || 'body');
      const L = TEXT_STYLES[look];
      out = {
        ...el, look, tag: L.tag, fontSize: L.fontSize, fontWeight: L.fontWeight, fontFamily: FONT[L.font as keyof typeof FONT],
        lineHeight: L.lineHeight, letterSpacing: L.letterSpacing, textTransform: L.textTransform,
        style: { ...keepLayout, bgColor: 'transparent', textColor: L.color, borderWidth: 0, borderRadius: 0, shadow: 'none', ...noPad }
      };
      break;
    }
    case 'hyperlink': {
      const look = pick(LINKS, el.look, 'default');
      out = {
        ...el, look, fontSize: 15,
        style: { ...keepLayout, bgColor: 'transparent', textColor: LINKS[look].color, borderWidth: 0, borderRadius: 0, shadow: 'none', ...noPad }
      };
      break;
    }
    case 'button': {
      const look = pick(BUTTONS, el.look, 'primary');
      const B = BUTTONS[look];
      out = {
        ...el, look, fontSize: 14, fontFamily: FONT.body,
        style: { ...keepLayout, bgColor: B.bg, textColor: B.text, borderColor: B.border || 'transparent', borderWidth: B.border ? 2 : 0, borderRadius: 8, shadow: 'sm', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }
      };
      break;
    }
    case 'container': {
      const look = pick(SURFACES, el.look, 'card');
      const S = SURFACES[look];
      out = {
        ...el, look,
        style: { ...keepLayout, bgColor: S.bg, textColor: S.text, borderColor: S.border || 'transparent', borderWidth: S.border ? 1 : 0, borderRadius: S.radius || 0, shadow: S.shadow || 'none', ...noPad }
      };
      break;
    }
    case 'card':
      out = {
        ...el,
        titleStyle: { fontFamily: FONT.heading, fontSize: 18, fontWeight: 700, color: UAF.navyDark, lineHeight: 1.3 },
        descStyle: { fontFamily: FONT.body, fontSize: 14, color: UAF.text, lineHeight: 1.6 },
        style: { ...keepLayout, bgColor: UAF.white, textColor: UAF.textDark, borderColor: UAF.border, borderWidth: 1, borderRadius: 14, shadow: 'sm', paddingTop: 18, paddingBottom: 22, paddingLeft: 18, paddingRight: 18 }
      };
      break;
    case 'list': {
      const look = pick(LISTS, el.look, 'panel');
      const panel = look === 'panel';
      out = {
        ...el, look, fontFamily: FONT.body, titleStyle: { fontFamily: FONT.heading, fontSize: 17, color: UAF.navyDark },
        style: { ...keepLayout, bgColor: panel ? UAF.white : 'transparent', textColor: UAF.text, borderColor: panel ? UAF.border : 'transparent', borderWidth: panel ? 1 : 0, borderRadius: panel ? 12 : 0, shadow: 'none', paddingTop: panel ? 20 : 0, paddingBottom: panel ? 20 : 0, paddingLeft: panel ? 22 : 0, paddingRight: panel ? 22 : 0 }
      };
      break;
    }
    case 'image': {
      const circle = el.shape === 'circle';
      const ring = !!el.badge;
      out = {
        ...el, opacity: 100, ...(ring ? { height: Math.max(20, (el.height || 56) - 8), shape: 'circle' } : {}),
        style: { ...keepLayout, bgColor: ring ? UAF.white : UAF.light, textColor: UAF.textDark, borderColor: ring ? UAF.gold : 'transparent', borderWidth: ring ? 2 : 0, borderRadius: circle || ring ? 9999 : el.shape === 'square' ? 0 : 12, shadow: 'none', paddingTop: ring ? 2 : 0, paddingBottom: ring ? 2 : 0, paddingLeft: ring ? 2 : 0, paddingRight: ring ? 2 : 0 }
      };
      break;
    }
    case 'input':
      out = {
        ...el,
        style: { ...keepLayout, bgColor: 'transparent', textColor: UAF.textDark, borderColor: 'transparent', borderWidth: 0, borderRadius: 0, shadow: 'none', paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }
      };
      break;
    case 'video':
      out = { ...el, style: { ...keepLayout, bgColor: '#000000', textColor: UAF.white, borderRadius: 12, shadow: 'none', ...noPad } };
      break;
    case 'divider': {
      const look = pick(DIVIDERS, el.look, 'line');
      const D = DIVIDERS[look];
      out = {
        ...el, look, thickness: D.thickness, lineStyle: 'solid',
        style: { ...keepLayout, bgColor: 'transparent', borderColor: D.color, borderWidth: 0, borderRadius: 0, shadow: 'none', paddingTop: 8, paddingBottom: 8, paddingLeft: 0, paddingRight: 0 }
      };
      break;
    }
    default:
      break;
  }
  cache.set(el, out);
  return out;
}

export function cleanRich(html: string): string {
  if (!html) return '';
  return String(html)
    .replace(/<(script|style|iframe|object|embed)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?font\b[^>]*>/gi, '')
    .replace(/\s(?:style|color|face|size|class|bgcolor)=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
}

export function pastePlain(event: React.ClipboardEvent) {
  event.preventDefault();
  const text = event.clipboardData?.getData('text/plain') || '';
  if (typeof document !== 'undefined') {
    document.execCommand('insertText', false, text);
  }
}
