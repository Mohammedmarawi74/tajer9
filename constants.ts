
export const COLORS = {
  primary: '#1e4d40',
  secondary: '#27ae60',
  accent: '#c2a378',
  dark: '#0a111a',
  surface: '#1f2937',
  text: '#1a1a1a',
};

export const THEMES = [
  { name: 'كحلي المستثمر', primary: '#0f172a', secondary: '#0ea5e9', bg: '#f8fafc', text: '#1e293b' },
  { name: 'الأحمر الصيني', primary: '#991b1b', secondary: '#f59e0b', bg: '#fffbeb', text: '#450a0a' },
  { name: 'سيان الابتكار', primary: '#0d9488', secondary: '#22d3ee', bg: '#f0fdfa', text: '#134e4a' },
  { name: 'فوشيا التحليل', primary: '#be185d', secondary: '#f472b6', bg: '#fdf2f8', text: '#500724' },
  { name: 'برتقالي الحركة', primary: '#c2410c', secondary: '#fb923c', bg: '#fff7ed', text: '#431407' },
  { name: 'لايم النمو', primary: '#4d7c0f', secondary: '#a3e635', bg: '#f7fee7', text: '#1a2e05' },
  { name: 'بنفسجي العمق', primary: '#6d28d9', secondary: '#a78bfa', bg: '#f5f3ff', text: '#1e1b4b' },
  { name: 'الوضع الداكن', primary: '#10b981', secondary: '#f43f5e', bg: '#020617', text: '#f8fafc' },
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
    subtitle: 'منصة المتسثمر الاقتصادية',
    description: 'تهدف المبادرة إلى تحسين جودة الحياة وحماية الأجيال القادمة من خلال زراعة 10 مليارات شجرة وتقليل الانبعاثات الكربونية.',
    heroImage: 'https://images.unsplash.com/photo-1589407633215-460d36746401?q=80&w=800',
    footer: 'المملكة العربية السعودية - رؤية 2030',
    colors: THEMES[0]
  }
];
