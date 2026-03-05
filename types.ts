
export type SlideType = 'intro' | 'stats' | 'points' | 'closing';

export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface PointItem {
  id: string;
  text: string;
  icon?: string;
}

export interface SlideColors {
  primary: string;
  secondary: string;
  bg: string;
  text: string;
}

export interface SlideData {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  logo?: string;
  stats?: StatItem[];
  points?: PointItem[];
  footer?: string;
  customCss?: string;
  colors?: SlideColors; // الألوان المخصصة لهذه الشريحة
}

export interface CarouselProject {
  name: string;
  slides: SlideData[];
}
