// Figma / Android Studio Primitive UI Elements Library for University Page Designer

export const PRIMITIVE_PALETTE = [
  {
    category: 'Text & Links',
    items: [
      {
        type: 'text',
        name: 'Text / Heading',
        icon: 'Type',
        description: 'Headings, paragraphs, titles & subtitles'
      },
      {
        type: 'paragraph',
        name: 'Paragraph',
        icon: 'AlignLeft',
        description: 'Add a paragraph of text'
      },
      {
        type: 'hyperlink',
        name: 'Hyperlink',
        icon: 'Link',
        description: 'Clickable web links with underline & icon options'
      },
      {
        type: 'list',
        name: 'Checklist',
        icon: 'List',
        description: 'Bulleted or checkmark list of requirements & points'
      },
      {
        type: 'button',
        name: 'Action Button',
        icon: 'SquareMousePointer',
        description: 'Clickable action buttons & link pills'
      }
    ]
  },
  {
    category: 'Cards & Media',
    items: [
      {
        type: 'card',
        name: 'Feature Card',
        icon: 'CreditCard',
        description: 'Card with its own image, title, description, and button'
      },
      {
        type: 'divider',
        name: 'Divider Line / Spacer',
        icon: 'Minus',
        description: 'Horizontal separator line or vertical spacing'
      }
    ]
  },
  {
    category: 'Forms & Media',
    items: [
      {
        type: 'input',
        name: 'Input Field / Form',
        icon: 'TextCursorInput',
        description: 'Text inputs, dropdowns, and textareas'
      },
      {
        type: 'video',
        name: 'Video Frame',
        icon: 'Video',
        description: 'Embedded video player frame'
      }
    ]
  }
];

export function createPrimitiveElement(type) {
  const id = `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const commonStyle = {
    bgColor: '#ffffff',
    textColor: '#1e293b',
    borderColor: '#cbd5e1',
    borderWidth: 0,
    borderRadius: 12, // px
    shadow: 'none', // none, sm, md, lg, xl
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    marginBottom: 0,
    width: 'full', // full, auto, 1/2, 1/3, 2/3
    align: 'left' // left, center, right
  };

  switch (type) {
    case 'text':
      return {
        id,
        type: 'text',
        text: '',
        tag: 'h2', // h1, h2, h3, h4, p, badge
        fontSize: 24, // px
        fontWeight: 'bold', // normal, medium, semibold, bold, black
        fontFamily: 'sans', // sans, serif, mono
        style: {
          ...commonStyle,
          bgColor: 'transparent',
          textColor: '#0f172a',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    case 'hyperlink':
      return {
        id,
        type: 'hyperlink',
        text: '',
        url: '',
        showUnderline: true,
        showExternalIcon: true,
        fontSize: 16,
        style: {
          ...commonStyle,
          bgColor: 'transparent',
          textColor: '#16a34a',
          paddingTop: CommonPadding('hyperlink'),
          paddingBottom: CommonPadding('hyperlink'),
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    case 'list':
      return {
        id,
        type: 'list',
        title: '',
        bulletStyle: 'disc',
        showBullets: true,
        items: [],
        style: {
          ...commonStyle,
          bgColor: '#f8fafc',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 12,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 20,
          paddingRight: 20
        }
      };

    case 'card':
      return {
        id,
        type: 'card',
        title: '',
        badgeTag: '',
        description: '',
        buttonLabel: '',
        imageUrl: '',
        style: {
          ...commonStyle,
          bgColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 16,
          shadow: 'md',
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20
        }
      };

    case 'button':
      return {
        id,
        type: 'button',
        label: '',
        url: '',
        variant: 'solid', // solid, outline, soft
        iconName: 'ArrowRight', // ArrowRight, Download, Send, Check, Phone, Mail, Link, None
        style: {
          ...commonStyle,
          bgColor: '#16a34a',
          textColor: '#ffffff',
          borderColor: '#15803d',
          borderWidth: 0,
          borderRadius: 10,
          shadow: 'sm',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 24,
          paddingRight: 24,
          align: 'left'
        }
      };

    case 'image':
      return {
        id,
        type: 'image',
        src: '',
        alt: '',
        caption: '',
        shape: 'rounded', // square, rounded, circle, oval
        height: 260, // px
        objectFit: 'cover', // cover, contain, fill
        style: {
          ...commonStyle,
          bgColor: '#f1f5f9',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          borderRadius: 16,
          shadow: 'md'
        }
      };

    case 'container':
      return {
        id,
        type: 'container',
        title: '',
        shapeType: 'rectangle',
        shapeTextEnabled: false,
        shapeText: '',
        layoutMode: 'vertical', // vertical, horizontal, grid2, grid3
        style: {
          ...commonStyle,
          bgColor: '#f8fafc',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 16,
          shadow: 'sm',
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 24
        }
      };

    case 'input':
      return {
        id,
        type: 'input',
        label: '',
        placeholder: '',
        inputType: 'text', // text, email, select, textarea
        options: 'Option 1, Option 2, Option 3',
        style: {
          ...commonStyle,
          bgColor: '#ffffff',
          textColor: '#0f172a',
          borderColor: '#cbd5e1',
          borderWidth: 1,
          borderRadius: 8,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 12,
          paddingRight: 12
        }
      };

    case 'video':
      return {
        id,
        type: 'video',
        videoUrl: '',
        title: '',
        height: 320,
        style: {
          ...commonStyle,
          bgColor: '#000000',
          borderRadius: 16,
          shadow: 'lg',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    case 'divider':
      return {
        id,
        type: 'divider',
        thickness: 2, // px
        lineStyle: 'solid', // solid, dashed, dotted
        style: {
          ...commonStyle,
          bgColor: 'transparent',
          borderColor: '#cbd5e1',
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    default:
      return {
        id,
        type: 'text',
        text: 'Default Element',
        style: commonStyle
      };
  }
}

function CommonPadding(t) {
  if (t === 'text' || t === 'divider' || t === 'hyperlink') return 4;
  return 16;
}

export const DEFAULT_PAGE_TEMPLATES = {
  homepage: {
    meta: { title: "University Homepage Design", author: "Admin" },
    elements: [
      {
        id: "el-nav",
        type: "container",
        layoutMode: "horizontal",
        style: { bgColor: "#14532d", textColor: "#ffffff", paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24, borderRadius: 0 }
      },
      {
        id: "el-nav-title",
        type: "text",
        text: "🌾 University of Agriculture",
        tag: "h2",
        fontSize: 20,
        fontWeight: "bold",
        style: { bgColor: "transparent", textColor: "#ffffff", paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }
      },
      {
        id: "el-hero",
        type: "container",
        layoutMode: "vertical",
        style: { bgColor: "#f0fdf4", borderColor: "#bbf7d0", borderWidth: 1, paddingTop: 40, paddingBottom: 40, paddingLeft: 32, paddingRight: 32, borderRadius: 20, marginTop: 16 }
      },
      {
        id: "el-hero-title",
        type: "text",
        text: "Welcome to South Asia's Leading Agritech Campus",
        tag: "h1",
        fontSize: 32,
        fontWeight: "bold",
        style: { bgColor: "transparent", textColor: "#14532d", paddingTop: 0, paddingBottom: 8, paddingLeft: 0, paddingRight: 0 }
      },
      {
        id: "el-hero-desc",
        type: "text",
        text: "Empowering agricultural research, biotechnology, and sustainable crop cultivation across 1,500 acres of high-tech testbeds.",
        tag: "p",
        fontSize: 16,
        fontWeight: "normal",
        style: { bgColor: "transparent", textColor: "#334155", paddingTop: 0, paddingBottom: 16, paddingLeft: 0, paddingRight: 0 }
      },
      {
        id: "el-hero-btn",
        type: "button",
        label: "Explore Degree Programs 2026",
        iconName: "ArrowRight",
        style: { bgColor: "#16a34a", textColor: "#ffffff", borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24 }
      },
      {
        id: "el-list-req",
        type: "list",
        title: "Key Admission Highlights & Requirements",
        bulletStyle: "check",
        items: [
          "Minimum 60% marks in F.Sc. Pre-Medical or Pre-Engineering",
          "High-tech 1,500 acre research farms and veterinary clinical hospital",
          "Over 94% placement rate in agricultural industry & public sector"
        ],
        style: { bgColor: "#ffffff", borderColor: "#cbd5e1", borderWidth: 1, borderRadius: 16, paddingTop: 20, paddingBottom: 20, paddingLeft: 24, paddingRight: 24, marginTop: 16 }
      }
    ]
  },
  blank: {
    meta: { title: "Blank Canvas Design", author: "Admin" },
    elements: []
  }
};
