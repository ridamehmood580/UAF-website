// Default schema and presets for non-technical University Admin Page Builder

export const AVAILABLE_BLOCK_TYPES = [
  {
    type: 'navbar',
    name: 'Header Navigation',
    category: 'Header',
    icon: 'Compass',
    description: 'Top menu bar with logo, links & login button'
  },
  {
    type: 'hero',
    name: 'Main Hero Banner',
    category: 'Banners',
    icon: 'LayoutTemplate',
    description: 'Large welcome header with photo background & action buttons'
  },
  {
    type: 'vc_message',
    name: 'Vice Chancellor Message',
    category: 'Notices',
    icon: 'Quote',
    description: 'Official welcome statement from VC with photo'
  },
  {
    type: 'programs',
    name: 'Degree Programs Cards',
    category: 'Academic',
    icon: 'GraduationCap',
    description: 'Grid showcasing Undergrad & Postgrad degree programs'
  },
  {
    type: 'features',
    name: 'Campus Highlights',
    category: 'Academic',
    icon: 'Sparkles',
    description: '3-column highlights (Experimental Farms, Research, Faculty)'
  },
  {
    type: 'notices',
    name: 'Notice Board & Alerts',
    category: 'Notices',
    icon: 'Bell',
    description: 'Latest exam news, admission circulars & schedules'
  },
  {
    type: 'gallery',
    name: 'Campus Photo Gallery',
    category: 'Media',
    icon: 'Image',
    description: 'Photo cards showcasing campus library, labs & fields'
  },
  {
    type: 'stats',
    name: 'University Statistics',
    category: 'Media',
    icon: 'TrendingUp',
    description: 'Numbers (15,000+ Students, 1,500 Acres, 450+ PhD Faculty)'
  },
  {
    type: 'contact',
    name: 'Contact & Inquiry Form',
    category: 'Forms',
    icon: 'Mail',
    description: 'Inquiry box for student & parent admission queries'
  },
  {
    type: 'footer',
    name: 'University Footer',
    category: 'Footer',
    icon: 'Footprints',
    description: 'Footer with accreditation info, address & links'
  }
];

export const INITIAL_UNIVERSITY_PAGE_DATA = {
  meta: {
    pageTitle: "University of Agriculture - Official Web Portal",
    lastUpdated: "2026-09-29",
    designedBy: "University Admin Directorate"
  },
  blocks: [
    {
      id: "block-1",
      type: "navbar",
      title: "University of Agriculture",
      subTitle: "Faisalabad • Center of Excellence",
      link1: "Home",
      link2: "Admissions 2026",
      link3: "Faculties",
      link4: "Research",
      link5: "Contact",
      buttonText: "Portal Login",
      themeColor: "green"
    },
    {
      id: "block-2",
      type: "hero",
      title: "Fostering Innovation in Agritech & Food Security",
      subtitle: "Join South Asia's premier agricultural research institution with over 1,500 acres of experimental farms.",
      primaryButtonText: "Explore Admissions",
      secondaryButtonText: "View Research Papers",
      bgImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      themeColor: "green"
    },
    {
      id: "block-3",
      type: "features",
      sectionHeading: "Why Study at UAF?",
      card1Title: "1,500+ Acres Test Farms",
      card1Desc: "State-of-the-art agricultural testbeds, greenhouses, and livestock clinics.",
      card2Title: "Global PhD Faculty",
      card2Desc: "Learn directly from leading agronomists, biotechnologists, and economists.",
      card3Title: "94% Placement Rate",
      card3Desc: "Direct career pathways into multinational agritech firms and civil services.",
      themeColor: "light"
    },
    {
      id: "block-4",
      type: "programs",
      heading: "Academic Programs Offered",
      p1Title: "B.Sc. (Hons) Agronomy",
      p1Tag: "4 Years Undergrad",
      p1Desc: "Master modern crop production, soil fertility management, and precision farming.",
      p2Title: "Doctor of Veterinary Medicine (DVM)",
      p2Tag: "5 Years Clinical",
      p2Desc: "Comprehensive veterinary surgery, livestock health, and animal clinics.",
      p3Title: "M.Sc. Agri-Biotechnology",
      p3Tag: "2 Years Postgrad",
      p3Desc: "Genetic engineering, drought-resistant crop breeding, and tissue culture.",
      themeColor: "white"
    },
    {
      id: "block-5",
      type: "vc_message",
      authorName: "Prof. Dr. Muhammad Iqbal",
      authorRole: "Vice Chancellor, UAF",
      quoteText: "Our mission is to empower young minds with agricultural science to achieve food sovereignty and environmental sustainability.",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      themeColor: "green"
    },
    {
      id: "block-6",
      type: "notices",
      title: "Latest News & Department Notices",
      n1Date: "OCT 12",
      n1Title: "Autumn 2026 Registration & Merit List Announcement",
      n2Date: "OCT 18",
      n2Title: "International Wheat & Climate Resilience Symposium",
      n3Date: "OCT 25",
      n3Title: "HEC Need-Based Scholarship Form Distribution",
      themeColor: "light"
    },
    {
      id: "block-7",
      type: "footer",
      universityName: "University of Agriculture, Faisalabad",
      address: "University Road, Faisalabad, Pakistan",
      phone: "+92 (41) 9200161",
      email: "info@uaf.edu.pk",
      copyright: "© 2026 Directorate of IT & Web Admin. All rights reserved.",
      themeColor: "dark"
    }
  ]
};

export function createNewBlock(type) {
  const id = `block-${Date.now()}`;
  switch(type) {
    case 'navbar':
      return {
        id, type: 'navbar',
        title: 'University of Agriculture',
        subTitle: 'Admin Portal',
        link1: 'Home', link2: 'Admissions', link3: 'Faculties', link4: 'Research', link5: 'Contact',
        buttonText: 'Student Login', themeColor: 'green'
      };
    case 'hero':
      return {
        id, type: 'hero',
        title: 'Shaping the Future of Agriculture',
        subtitle: 'World-class education in crop science, biotechnology, and agricultural economics.',
        primaryButtonText: 'Apply Now', secondaryButtonText: 'Learn More',
        bgImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
        themeColor: 'green'
      };
    case 'vc_message':
      return {
        id, type: 'vc_message',
        authorName: 'Prof. Dr. Muhammad Iqbal', authorRole: 'Vice Chancellor',
        quoteText: 'We prepare innovators to lead the global agricultural revolution.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        themeColor: 'green'
      };
    case 'programs':
      return {
        id, type: 'programs',
        heading: 'Offered Degree Programs',
        p1Title: 'B.Sc. Agronomy', p1Tag: '4 Years', p1Desc: 'Crop science and precision farming.',
        p2Title: 'DVM Veterinary', p2Tag: '5 Years', p2Desc: 'Animal healthcare and clinics.',
        p3Title: 'M.Sc. Biotechnology', p3Tag: '2 Years', p3Desc: 'Genetic seed research.',
        themeColor: 'white'
      };
    case 'features':
      return {
        id, type: 'features',
        sectionHeading: 'Key Highlights',
        card1Title: 'High-Tech Labs', card1Desc: 'Biotech and soil testing equipment.',
        card2Title: '1,500 Acre Farm', card2Desc: 'Hands-on practical crop field experience.',
        card3Title: 'Career Support', card3Desc: 'High employment in government and corporate.',
        themeColor: 'light'
      };
    case 'notices':
      return {
        id, type: 'notices',
        title: 'Important Announcements',
        n1Date: 'SEP 30', n1Title: 'Admissions Deadline Extended',
        n2Date: 'OCT 05', n2Title: 'Entry Test Schedule Released',
        n3Date: 'OCT 10', n3Title: 'Scholarship Application Form',
        themeColor: 'light'
      };
    case 'gallery':
      return {
        id, type: 'gallery',
        heading: 'Campus Life Photo Gallery',
        img1: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80', cap1: 'Drone Farming Testbed',
        img2: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80', cap2: 'Greenhouse Hydroponics',
        img3: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80', cap3: 'Main Administration Block',
        themeColor: 'white'
      };
    case 'stats':
      return {
        id, type: 'stats',
        num1: '15,000+', label1: 'Students Enrolled',
        num2: '1,500', label2: 'Acres Farm Ground',
        num3: '450+', label3: 'PhD Faculty Members',
        num4: '94%', label4: 'Graduate Placement',
        themeColor: 'green'
      };
    case 'contact':
      return {
        id, type: 'contact',
        title: 'Contact Administration',
        subtitle: 'Send your questions directly to our admission helpdesk.',
        themeColor: 'white'
      };
    case 'footer':
      return {
        id, type: 'footer',
        universityName: 'University of Agriculture, Faisalabad',
        address: 'University Road, Faisalabad, Pakistan',
        phone: '+92 (41) 9200161', email: 'info@uaf.edu.pk',
        copyright: '© 2026 Directorate of IT & Web Admin.',
        themeColor: 'dark'
      };
    default:
      return { id, type: 'hero', title: 'New Webpage Section', themeColor: 'white' };
  }
}
