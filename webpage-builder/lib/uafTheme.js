// ─────────────────────────────────────────────────────────────────────────────
//  UAF BRAND THEME  —  the single place that controls how every page looks.
//
//  • STYLE_LOCK = true  → colors, fonts, font sizes, corner styles and shadows
//    are decided by this file. Page editors can only choose from the approved
//    "looks" below (e.g. "Section title", "Primary button", "Soft green panel").
//  • STYLE_LOCK = false → the old free-style editing comes back (color pickers,
//    font menus, sliders). Use this only for admin / design work.
//
//  To change the university palette or fonts for ALL pages, edit UAF and FONT.
// ─────────────────────────────────────────────────────────────────────────────

// Template chrome is materialized when a template is built. Editable page
// content remains free to use the editor's color and typography controls.
export const STYLE_LOCK = false;

// Colors copied from the main UAF website (src/index.css + components)
export const UAF = {
  navBar: '#111c24',   // top header bar
  navyDark: '#071b2d', // dark sections, main headings
  navy: '#102a43',
  green: '#005a36',    // primary brand green (buttons, accents)
  teal: '#0f766e',     // small labels / eyebrow text
  tealLight: '#dff5f1',
  gold: '#e8a62a',     // highlight / call-to-action
  emerald: '#34d399',
  cream: '#f7f5f0',
  light: '#f5f8fa',
  white: '#ffffff',
  text: '#46505a',     // normal paragraph text
  dark: '#18212b',
  border: '#e5eaee'
};

export const FONT = {
  heading: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
};

const WHITE_SOFT = 'rgba(255,255,255,0.82)';
const WHITE_DIM = 'rgba(255,255,255,0.70)';

// ── Text looks ───────────────────────────────────────────────────────────────
// group: where it shows in the "Text style" menu. hidden: used by templates only.
export const TEXT_STYLES = {
  // Headings (for white / light backgrounds)
  pageTitle:  { label: 'Page title',      group: 'Headings',            tag: 'h1', fontSize: 40, fontWeight: 'bold', font: 'heading', color: UAF.navyDark, lineHeight: 1.2 },
  title:      { label: 'Section title',   group: 'Headings',            tag: 'h2', fontSize: 32, fontWeight: 'bold', font: 'heading', color: UAF.navyDark, lineHeight: 1.25 },
  subtitle:   { label: 'Sub-heading',     group: 'Headings',            tag: 'h3', fontSize: 20, fontWeight: 'bold', font: 'heading', color: UAF.navy, lineHeight: 1.3 },
  // Body
  body:       { label: 'Paragraph',       group: 'Body text',           tag: 'p',  fontSize: 16, fontWeight: 'normal', font: 'body', color: UAF.text, lineHeight: 1.65 },
  small:      { label: 'Small note',      group: 'Body text',           tag: 'p',  fontSize: 13, fontWeight: 'normal', font: 'body', color: UAF.text, lineHeight: 1.6 },
  label:      { label: 'Small label (CAPS)', group: 'Body text',        tag: 'p',  fontSize: 12, fontWeight: 'bold', font: 'body', color: UAF.teal, lineHeight: 1.4, letterSpacing: '0.16em', textTransform: 'uppercase' },
  stat:       { label: 'Big number',      group: 'Body text',           tag: 'p',  fontSize: 44, fontWeight: 'bold', font: 'heading', color: UAF.green, lineHeight: 1.1 },
  // For dark backgrounds (navy, green, photos)
  hero:       { label: 'Hero title',      group: 'On dark background',  tag: 'h1', fontSize: 52, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.15 },
  pageTitleLight: { label: 'Page title',  group: 'On dark background',  tag: 'h1', fontSize: 40, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.2 },
  titleLight: { label: 'Section title',   group: 'On dark background',  tag: 'h2', fontSize: 32, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.25 },
  subtitleLight: { label: 'Sub-heading',  group: 'On dark background',  tag: 'h3', fontSize: 20, fontWeight: 'bold', font: 'heading', color: UAF.white, lineHeight: 1.3 },
  bodyLight:  { label: 'Paragraph',       group: 'On dark background',  tag: 'p',  fontSize: 16, fontWeight: 'normal', font: 'body', color: WHITE_SOFT, lineHeight: 1.65 },
  smallLight: { label: 'Small note',      group: 'On dark background',  tag: 'p',  fontSize: 14, fontWeight: 'normal', font: 'body', color: WHITE_DIM, lineHeight: 1.6 },
  labelGold:  { label: 'Small label (CAPS)', group: 'On dark background', tag: 'p', fontSize: 12, fontWeight: 'bold', font: 'body', color: UAF.gold, lineHeight: 1.4, letterSpacing: '0.16em', textTransform: 'uppercase' },
  statGold:   { label: 'Big number',      group: 'On dark background',  tag: 'p',  fontSize: 44, fontWeight: 'bold', font: 'heading', color: UAF.gold, lineHeight: 1.1 },
  // Header-only looks (used by the template header)
  brandSmall:  { hidden: true, label: 'Brand small',  tag: 'p', fontSize: 11, fontWeight: 'bold', font: 'body', color: '#e7e5e4', lineHeight: 1.2, letterSpacing: '0.2em', textTransform: 'uppercase' },
  brand:       { hidden: true, label: 'Brand name',   tag: 'p', fontSize: 24, fontWeight: 'black', font: 'heading', color: UAF.white, lineHeight: 1.1, letterSpacing: '0.06em', textTransform: 'uppercase' },
  brandAccent: { hidden: true, label: 'Brand place',  tag: 'p', fontSize: 11, fontWeight: 'bold', font: 'body', color: UAF.emerald, lineHeight: 1.2, letterSpacing: '0.26em', textTransform: 'uppercase' }
};

// Old pages (made before the lock) have no "look" — pick one from their tag.
const LEGACY_TAG_LOOK = { h1: 'pageTitle', h2: 'title', h3: 'subtitle', h4: 'subtitle', p: 'body', badge: 'label' };

// ── Background / panel looks (the "container" shape) ────────────────────────
export const SURFACES = {
  white:   { label: 'White',               bg: UAF.white, text: UAF.dark },
  light:   { label: 'Light grey',          bg: UAF.light, text: UAF.dark },
  cream:   { label: 'Cream',               bg: UAF.cream, text: UAF.dark },
  tint:    { label: 'Soft green',          bg: UAF.tealLight, text: UAF.dark },
  green:   { label: 'UAF green',           bg: UAF.green, text: UAF.white },
  navy:    { label: 'Dark navy',           bg: UAF.navyDark, text: UAF.white },
  gold:    { label: 'Gold',                bg: UAF.gold, text: UAF.navyDark },
  overlay: { label: 'Dark photo overlay',  bg: 'rgba(7,27,45,0.74)', text: UAF.white },
  card:    { label: 'White card',          bg: UAF.white, text: UAF.dark, border: UAF.border, radius: 10, shadow: 'sm' },
  nav:     { hidden: true, label: 'Header bar', bg: UAF.navBar, text: UAF.white }
};

// ── Button looks ─────────────────────────────────────────────────────────────
export const BUTTONS = {
  primary:      { label: 'Primary (green)',          bg: UAF.green, text: UAF.white },
  gold:         { label: 'Highlight (gold)',         bg: UAF.gold, text: UAF.navyDark },
  outline:      { label: 'Outline (green)',          bg: 'transparent', text: UAF.green, border: UAF.green },
  outlineLight: { label: 'Outline (for dark areas)', bg: 'transparent', text: UAF.white, border: UAF.white },
  dark:         { label: 'Dark navy',                bg: UAF.navy, text: UAF.white }
};

export const LISTS = {
  plain: { label: 'Plain list' },
  panel: { label: 'Panel with border' }
};

export const DIVIDERS = {
  line:   { label: 'Thin line',        color: UAF.border, thickness: 1 },
  accent: { label: 'Gold accent bar',  color: UAF.gold, thickness: 3 },
  onDark: { hidden: true, label: 'Line on dark', color: 'rgba(255,255,255,0.18)', thickness: 1 }
};

export const LINKS = {
  default: { label: 'Green link', color: UAF.green },
  light:   { label: 'White link', color: UAF.white },
  gold:    { label: 'Gold link',  color: UAF.gold }
};

// Which look-menu belongs to which element type (used by the inspector)
export const LOOKS_BY_TYPE = {
  text: TEXT_STYLES, container: SURFACES, button: BUTTONS, list: LISTS, divider: DIVIDERS, hyperlink: LINKS
};
export const LOOK_LABEL = {
  text: 'Text style', container: 'Background style', button: 'Button style', list: 'List style', divider: 'Line style', hyperlink: 'Link style'
};

const pick = (table, key, fallback) => (table[key] ? key : fallback);

const noPad = { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };

/**
 * Returns the element as it must be DRAWN. With STYLE_LOCK on, whatever colors /
 * fonts / sizes are stored in the saved file are ignored and replaced by the
 * brand look — so nobody can break the design, even by editing the JSON file.
 * Content (text, images, links) and layout (x, y, width, height) are untouched.
 */
const cache = new WeakMap();
export function themeElement(el) {
  if (!el || (!STYLE_LOCK && !el.look)) return el;
  if (cache.has(el)) return cache.get(el);
  const keepLayout = { align: el.style?.align, marginTop: el.style?.marginTop, marginBottom: el.style?.marginBottom };
  let out = el;

  switch (el.type) {
    case 'text': {
      const look = pick(TEXT_STYLES, el.look, LEGACY_TAG_LOOK[el.tag] || 'body');
      const L = TEXT_STYLES[look];
      out = {
        ...el, look, tag: L.tag, fontSize: L.fontSize, fontWeight: L.fontWeight, fontFamily: FONT[L.font],
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
        style: { ...keepLayout, bgColor: B.bg, textColor: B.text, borderColor: B.border || 'transparent', borderWidth: B.border ? 2 : 0, borderRadius: 6, shadow: 'none', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16 }
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
        ...el, cardTextStyles: undefined,
        titleStyle: { fontFamily: FONT.heading, fontSize: 18, fontWeight: 700, color: UAF.navy, lineHeight: 1.3 },
        descStyle: { fontFamily: FONT.body, fontSize: 14, color: UAF.text, lineHeight: 1.6 },
        style: { ...keepLayout, bgColor: UAF.white, textColor: UAF.dark, borderColor: UAF.border, borderWidth: 1, borderRadius: 10, shadow: 'sm', paddingTop: 16, paddingBottom: 20, paddingLeft: 16, paddingRight: 16 }
      };
      break;
    case 'list': {
      const look = pick(LISTS, el.look, 'panel');
      const panel = look === 'panel';
      out = {
        ...el, look, fontFamily: FONT.body, titleStyle: { fontFamily: FONT.heading, fontSize: 17, color: UAF.navy },
        style: { ...keepLayout, bgColor: panel ? UAF.white : 'transparent', textColor: UAF.text, borderColor: panel ? UAF.border : 'transparent', borderWidth: panel ? 1 : 0, borderRadius: panel ? 10 : 0, shadow: 'none', paddingTop: panel ? 20 : 0, paddingBottom: panel ? 20 : 0, paddingLeft: panel ? 22 : 0, paddingRight: panel ? 22 : 0 }
      };
      break;
    }
    case 'image': {
      const circle = el.shape === 'circle';
      const ring = !!el.badge; // round logo badge with a gold ring
      out = {
        ...el, opacity: 100, ...(ring ? { height: Math.max(20, (el.height || 56) - 8), shape: 'circle' } : {}),
        style: { ...keepLayout, bgColor: ring ? UAF.white : UAF.light, textColor: UAF.dark, borderColor: ring ? UAF.gold : 'transparent', borderWidth: ring ? 2 : 0, borderRadius: circle || ring ? 999 : el.shape === 'square' ? 0 : 8, shadow: 'none', paddingTop: ring ? 2 : 0, paddingBottom: ring ? 2 : 0, paddingLeft: ring ? 2 : 0, paddingRight: ring ? 2 : 0 }
      };
      break;
    }
    case 'input':
      out = {
        ...el,
        style: { ...keepLayout, bgColor: 'transparent', textColor: UAF.dark, borderColor: 'transparent', borderWidth: 0, borderRadius: 0, shadow: 'none', paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }
      };
      break;
    case 'video':
      out = { ...el, style: { ...keepLayout, bgColor: '#000000', textColor: UAF.white, borderRadius: 8, shadow: 'none', ...noPad } };
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

/**
 * Removes pasted / injected colors, fonts and sizes from rich text so only
 * bold, italic, underline, links and line-breaks survive.
 */
export function cleanRich(html) {
  if (!STYLE_LOCK || !html) return html;
  return String(html)
    .replace(/<(script|style|iframe|object|embed)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?font\b[^>]*>/gi, '')
    .replace(/\s(?:style|color|face|size|class|bgcolor)=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
}

// Paste as plain text so Word / web styles never come along.
export function pastePlain(event) {
  event.preventDefault();
  const text = event.clipboardData?.getData('text/plain') || '';
  if (typeof document !== 'undefined') document.execCommand('insertText', false, text);
}
