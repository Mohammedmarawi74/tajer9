
// Al-Tajer Digital Brand Colors
export const COLORS = {
  // Primary Brand Colors
  primary: '#2563EB',      // Electric Blue - Primary accent
  secondary: '#10B981',    // Emerald Green - Success/Secondary
  accent: '#F59E0B',       // Amber - Highlights
  
  // Neutral Colors
  dark: '#0F172A',         // Charcoal Black - Headlines
  surface: '#F8FAFC',      // Light Gray - Background alternative
  text: '#4B5563',         // Dark Gray - Body text
  white: '#FFFFFF',        // Pure White
  
  // Tag & Highlight Colors
  mint: '#D1FAE5',         // Mint Green - Tags
  purple: '#E9D5FF',       // Soft Purple - Tags
  orange: '#FED7AA',       // Soft Orange - Alerts
};

// Al-Tajer Digital Modern Themes
export const THEMES = [
  { 
    name: 'الأزرق الكهربائي', 
    primary: '#2563EB',     // Electric Blue
    secondary: '#10B981',   // Emerald
    accent: '#3B82F6',      // Bright Blue
    bg: '#FFFFFF',          // White
    text: '#0F172A'         // Charcoal
  },
  { 
    name: 'الفضي الفاخر', 
    primary: '#1E293B',     // Slate
    secondary: '#64748B',   // Gray
    accent: '#94A3B8',      // Light Gray
    bg: '#F8FAFC',          // Light Gray
    text: '#0F172A'         // Charcoal
  },
  { 
    name: 'الأخضر النمو', 
    primary: '#059669',     // Emerald
    secondary: '#10B981',   // Green
    accent: '#34D399',      // Mint
    bg: '#F0FDF4',          // Light Green
    text: '#064E3B'         // Dark Green
  },
  { 
    name: 'البنفسجي الإبداعي', 
    primary: '#7C3AED',     // Violet
    secondary: '#A78BFA',   // Light Purple
    accent: '#C4B5FD',      // Soft Purple
    bg: '#F5F3FF',          // Light Purple
    text: '#4C1D95'         // Dark Purple
  },
  { 
    name: 'البرتقالي الحيوي', 
    primary: '#EA580C',     // Orange
    secondary: '#FB923C',   // Light Orange
    accent: '#FDBA74',      // Soft Orange
    bg: '#FFF7ED',          // Light Orange
    text: '#7C2D12'         // Dark Orange
  },
  { 
    name: 'الوردي العصري', 
    primary: '#DB2777',     // Pink
    secondary: '#F472B6',   // Light Pink
    accent: '#FBCFE8',      // Soft Pink
    bg: '#FDF2F8',          // Light Pink
    text: '#831843'         // Dark Pink
  },
  { 
    name: 'الأزرق السماوي', 
    primary: '#0284C7',     // Sky Blue
    secondary: '#38BDF8',   // Light Sky
    accent: '#BAE6FD',      // Soft Sky
    bg: '#F0F9FF',          // Light Sky
    text: '#0C4A6E'         // Dark Sky
  },
  { 
    name: 'الوضع الداكن', 
    primary: '#10B981',     // Emerald
    secondary: '#3B82F6',   // Blue
    accent: '#8B5CF6',      // Violet
    bg: '#0F172A',          // Charcoal
    text: '#F8FAFC'         // White
  },
];

export const DEFAULT_PROJECT_NAME = "مشروع رؤية إبداعية";

export const LOGO_PRESETS = [
  {
    id: 'none',
    name: 'بدون شعار',
    url: ''
  },
  {
    id: 'logo-1',
    name: 'الشعار 1',
    url: '/public/logo-1.png'
  },
  {
    id: 'logo-2',
    name: 'الشعار 2',
    url: '/public/logo-2.png'
  },
  {
    id: 'logo-3',
    name: 'الشعار 3',
    url: '/public/logo-3.png'
  },
  {
    id: 'logo-4',
    name: 'الشعار 4',
    url: '/public/logo-4.png'
  }
];

export const DEFAULT_SLIDES: any[] = [
  {
    id: '1',
    type: 'intro',
    title: 'مبادرة السعودية الخضراء',
    subtitle: 'منصة التاجر الرقمية',
    description: 'تهدف المبادرة إلى تحسين جودة الحياة وحماية الأجيال القادمة من خلال زراعة 10 مليارات شجرة وتقليل الانبعاثات الكربونية.',
    heroImage: 'https://images.unsplash.com/photo-1589407633215-460d36746401?q=80&w=800',
    footer: 'المملكة العربية السعودية - رؤية 2030',
    colors: THEMES[0]
  }
];
