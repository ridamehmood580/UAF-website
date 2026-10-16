// ─────────────────────────────────────────────────────────────────────────────
//  ELEMENT PRIMITIVES & BLOCK DEFINITIONS FOR UAF PAGE BUILDER
// ─────────────────────────────────────────────────────────────────────────────

export interface PrimitiveMenuItem {
  label: string;
  url?: string;
  children?: PrimitiveMenuItem[];
}

export interface PrimitiveElement {
  id: string;
  type: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fixed?: boolean;
  look?: string;
  tag?: string;
  text?: string;
  richHtml?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
  url?: string;
  menuItems?: PrimitiveMenuItem[];
  label?: string;
  showUnderline?: boolean;
  showExternalIcon?: boolean;
  title?: string;
  titleHtml?: string;
  description?: string;
  descriptionHtml?: string;
  badgeTag?: string;
  buttonLabel?: string;
  imageUrl?: string;
  imageOpacity?: number;
  src?: string;
  alt?: string;
  caption?: string;
  shape?: string;
  badge?: boolean;
  objectFit?: string;
  opacity?: number;
  shapeType?: string;
  shapeTextEnabled?: boolean;
  shapeText?: string;
  shapeHtml?: string;
  items?: string[];
  bulletStyle?: string;
  showBullets?: boolean;
  inputType?: string;
  placeholder?: string;
  options?: string;
  videoUrl?: string;
  videoName?: string;
  isLocalVideo?: boolean;
  thickness?: number;
  lineStyle?: string;
  iconName?: string;
  style?: Record<string, any>;
  cardTextStyles?: Record<string, any>;
  titleStyle?: Record<string, any>;
  descStyle?: Record<string, any>;

  // Dedicated Academic & Publication Table Fields
  tableColumns?: Array<{ key: string; label: string; width?: string }>;
  tableRows?: Array<Record<string, any>>;
  tableTitle?: string;

  // Dedicated Faculty Profile Card Fields
  memberName?: string;
  designation?: string;
  qualification?: string;
  specialization?: string;
  phone?: string;
  email?: string;
  portraitUrl?: string;
  hecApprovedSupervisor?: string;
  photoShape?: 'circle' | 'square' | 'rounded';
  showActionButton?: boolean;
}

export const PRIMITIVE_PALETTE = [
  {
    category: 'Academic & Faculty',
    items: [
      {
        type: 'table',
        name: 'Springer Publications / Data Table',
        icon: 'Table',
        description: 'Clean academic table (Sr. #, Paper Name, Journal Name, Springer Open Link)'
      },
      {
        type: 'faculty-card',
        name: 'Faculty Member Card',
        icon: 'UserCheck',
        description: 'Official faculty card: editable name, designation, phone ext., and email'
      },
      {
        type: 'staff-card',
        name: 'Staff & Technical Officer Card',
        icon: 'Users',
        description: 'Circular photo card for administrative, laboratory, and field technical staff'
      },
      {
        type: 'card',
        name: 'Program / Feature Card',
        icon: 'CreditCard',
        description: 'Card with image, title, description, and link'
      }
    ]
  },
  {
    category: 'Text & Links',
    items: [
      {
        type: 'text',
        name: 'Heading / Title',
        icon: 'Type',
        description: 'Headings, banners & subtitles'
      },
      {
        type: 'hyperlink',
        name: 'Web Link',
        icon: 'Link',
        description: 'Clickable links with arrow or external icon'
      },
      {
        type: 'list',
        name: 'Checklist / Bullet Points',
        icon: 'List',
        description: 'Bulleted or numbered points & criteria'
      },
      {
        type: 'button',
        name: 'Call-to-Action Button',
        icon: 'SquareMousePointer',
        description: 'Clickable action buttons & link pills'
      }
    ]
  },
  {
    category: 'Media & Shapes',
    items: [
      {
        type: 'image',
        name: 'Campus Photo / Image',
        icon: 'Image',
        description: 'Responsive photo with caption & rounded corners'
      },
      {
        type: 'divider',
        name: 'Divider Line / Accent',
        icon: 'Minus',
        description: 'Horizontal separator line or gold accent'
      },
      {
        type: 'container',
        name: 'Geometric Shape / Container',
        icon: 'Shapes',
        description: 'Box, badge, pill or decorative highlight shape'
      },
      {
        type: 'input',
        name: 'Form Field',
        icon: 'TextCursorInput',
        description: 'Text inputs, dropdowns, and textareas'
      }
    ]
  }
];

export function createPrimitiveElement(type: string): PrimitiveElement {
  const id = `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const commonStyle = {
    bgColor: '#ffffff',
    textColor: '#18212b',
    borderColor: '#e5eaee',
    borderWidth: 0,
    borderRadius: 12,
    shadow: 'none',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    marginBottom: 0,
    align: 'left'
  };

  switch (type) {
    case 'table':
      return {
        id,
        type: 'table',
        tableTitle: 'Selected High-Impact Publications (Springer Indexed)',
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
        ],
        style: {
          ...commonStyle,
          bgColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 12,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    case 'faculty-card':
      return {
        id,
        type: 'faculty-card',
        memberName: 'Prof. Dr. Ehsanullah',
        designation: 'Professor',
        phone: '+92 41 9200161 Ext: 2901',
        email: 'ehsanullah@uaf.edu.pk',
        specialization: 'Crop Husbandry & Precision Agro-Technology',
        portraitUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        hecApprovedSupervisor: 'Yes',
        style: {
          ...commonStyle,
          bgColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 16,
          shadow: 'md',
          paddingTop: 12,
          paddingBottom: 16,
          paddingLeft: 14,
          paddingRight: 14
        }
      };

    case 'staff-card':
      return {
        id,
        type: 'faculty-card',
        shape: 'circle',
        photoShape: 'circle',
        memberName: 'Mr. Tariq Mehmood',
        designation: 'Superintendent',
        phone: '+92 41 9200161 Ext. 2910',
        email: 'tariq.admin@uaf.edu.pk',
        specialization: 'Dean Office Administration & Records Room 102',
        portraitUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        style: {
          ...commonStyle,
          bgColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 16,
          shadow: 'md',
          paddingTop: 16,
          paddingBottom: 20,
          paddingLeft: 16,
          paddingRight: 16
        }
      };

    case 'text':
      return {
        id,
        type: 'text',
        text: 'New Section Heading',
        tag: 'h2',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'sans',
        style: {
          ...commonStyle,
          bgColor: 'transparent',
          textColor: '#071b2d',
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    case 'hyperlink':
      return {
        id,
        type: 'hyperlink',
        text: 'Learn more about this department →',
        url: 'https://web.uaf.edu.pk',
        showUnderline: false,
        showExternalIcon: true,
        fontSize: 15,
        style: {
          ...commonStyle,
          bgColor: 'transparent',
          textColor: '#000000',
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    case 'list':
      return {
        id,
        type: 'list',
        title: 'Key Academic Highlights & Requirements',
        bulletStyle: 'check',
        showBullets: true,
        items: [
          'Accredited by Higher Education Commission (HEC W-Category)',
          '1,950-acre main research farm with modern experimental testbeds',
          'Over 94% job placement rate in national and multinational agritech'
        ],
        style: {
          ...commonStyle,
          bgColor: '#ffffff',
          borderColor: '#e5eaee',
          borderWidth: 1,
          borderRadius: 12,
          paddingTop: 18,
          paddingBottom: 18,
          paddingLeft: 22,
          paddingRight: 22
        }
      };

    case 'card':
      return {
        id,
        type: 'card',
        title: 'Degree Program / Academic Highlight',
        badgeTag: 'Undergraduate',
        description: 'Write a concise overview of the curriculum, faculty strengths, and laboratory capabilities.',
        buttonLabel: 'View Details',
        imageUrl: '/uaf_aerial_quadrangle.jpg',
        style: {
          ...commonStyle,
          bgColor: '#ffffff',
          borderColor: '#e5eaee',
          borderWidth: 1,
          borderRadius: 14,
          shadow: 'sm',
          paddingTop: 18,
          paddingBottom: 22,
          paddingLeft: 18,
          paddingRight: 18
        }
      };

    case 'button':
      return {
        id,
        type: 'button',
        label: 'Explore Programs',
        url: '#',
        fontSize: 14,
        iconName: 'ArrowRight',
        style: {
          ...commonStyle,
          bgColor: '#163887',
          textColor: '#ffffff',
          borderRadius: 8,
          align: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }
      };

    case 'image':
      return {
        id,
        type: 'image',
        src: '/uaf_main_building_renewed.jpg',
        alt: 'UAF Campus Image',
        caption: 'Historic Academic Campus (Est. 1906)',
        shape: 'rounded',
        height: 280,
        style: {
          ...commonStyle,
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
        thickness: 1,
        lineStyle: 'solid',
        style: {
          ...commonStyle,
          borderColor: '#e5eaee',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 0,
          paddingRight: 0
        }
      };

    case 'input':
      return {
        id,
        type: 'input',
        label: 'Your Full Name',
        placeholder: 'Enter your full name...',
        inputType: 'text',
        style: {
          ...commonStyle,
          paddingTop: 8,
          paddingBottom: 8
        }
      };

    case 'container':
      return {
        id,
        type: 'container',
        shapeType: 'rectangle',
        shapeTextEnabled: false,
        style: {
          ...commonStyle,
          bgColor: '#f8fafc',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 12
        }
      };

    default:
      return {
        id,
        type: 'text',
        text: 'New Element',
        style: commonStyle
      };
  }
}
