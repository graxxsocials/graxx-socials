import { LucideIcon } from 'lucide-react';

export type ThemeColor = 'cyan' | 'blue' | 'purple';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  icon: LucideIcon;
  category: 'core' | 'other';
  theme: ThemeColor;
}

export interface NavLink {
  label: string;
  path: string;
}

export enum PageRoutes {
  HOME = '/',
  SERVICES = '/services',
  CONTACT = '/contact',
}
