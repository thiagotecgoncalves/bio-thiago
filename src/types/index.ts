export type AudienceKey = 'empresas' | 'condominios' | 'residencias';

export interface AudienceProfile {
  label: string;
}

export interface ServiceSubItem {
  name: string;
  desc: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  specs: string;
  defaultImage: string;
  items: ServiceSubItem[];
}

export interface ScopeOption {
  id: string;
  label: string;
  pillar: 'Segurança' | 'Redes' | 'Energia';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  title: string;
  desc: string;
  highlight?: boolean;
}
