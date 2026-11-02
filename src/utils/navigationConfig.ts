import { ViewMode } from '../types';

export interface NavItemConfig {
  id: ViewMode;
  label: string;
  shortLabel: string;
  icon: string;
  badge?: string;
  description: string;
  category: 'accueil' | 'apprendre' | 'reviser' | 'pratique' | 'progression';
}

export interface NavCategoryConfig {
  id: 'accueil' | 'apprendre' | 'reviser' | 'pratique' | 'progression';
  label: string;
  icon: string;
  items: NavItemConfig[];
}

export const NAV_ITEMS: NavItemConfig[] = [
  // Accueil
  {
    id: 'tableau-de-bord',
    label: 'Tableau de bord',
    shortLabel: 'Accueil',
    icon: 'dashboard',
    description: 'Vue d\'ensemble, activité en cours et métriques clés',
    category: 'accueil',
  },

  // Apprendre
  {
    id: 'parcours-certifications',
    label: 'Parcours & Certifications',
    shortLabel: 'Certifications',
    icon: 'layers',
    description: 'Catalogue complet Cisco, Palo Alto, Fortinet, CompTIA, Juniper',
    category: 'apprendre',
  },
  {
    id: 'glossaire-cloud',
    label: 'Encyclopédie Cloud',
    shortLabel: 'Cloud',
    icon: 'cloud_sync',
    badge: 'NEW',
    description: 'Topologies hybrides, schémas ASCII et matrice multi-cloud',
    category: 'apprendre',
  },

  // Réviser & Mémoriser
  {
    id: 'flashcards',
    label: 'Flashcards & Mémos',
    shortLabel: 'Flashcards',
    icon: 'style',
    badge: 'SRS',
    description: '2 900+ fiches de révision, mode répétition espacée et Blitz',
    category: 'reviser',
  },
  {
    id: 'banque-de-questions',
    label: 'Banque de Questions',
    shortLabel: 'Questions',
    icon: 'database',
    description: 'QCM commentés, filtres par domaine et explications détaillées',
    category: 'reviser',
  },

  // Pratique & Évaluation
  {
    id: 'simulateur-d-examen',
    label: 'Simulateur d\'Examen',
    shortLabel: 'Examens',
    icon: 'check_circle',
    description: 'Conditions réelles proctorisées avec chronomètre et notation',
    category: 'pratique',
  },
  {
    id: 'ateliers-et-labs',
    label: 'Ateliers & Labs',
    shortLabel: 'Ateliers',
    icon: 'science',
    description: 'Saisie exacte de commandes, ordonnancement et dépannage',
    category: 'pratique',
  },
  {
    id: 'terminal-lab-virtuel',
    label: 'Terminal & Lab Virtuel',
    shortLabel: 'Terminal',
    icon: 'terminal',
    description: 'Console CLI Cisco IOS-XE interactive avec auto-complétion',
    category: 'pratique',
  },

  // Progression
  {
    id: 'analytiques-de-reussite',
    label: 'Analytiques de Réussite',
    shortLabel: 'Analytiques',
    icon: 'monitoring',
    description: 'Radar des faiblesses, historique des scores et prédiction d\'examen',
    category: 'progression',
  },
];

export const NAV_CATEGORIES: NavCategoryConfig[] = [
  {
    id: 'accueil',
    label: 'Vue Générale',
    icon: 'home',
    items: NAV_ITEMS.filter((i) => i.category === 'accueil'),
  },
  {
    id: 'apprendre',
    label: 'Apprendre',
    icon: 'school',
    items: NAV_ITEMS.filter((i) => i.category === 'apprendre'),
  },
  {
    id: 'reviser',
    label: 'Réviser & Mémoriser',
    icon: 'psychology',
    items: NAV_ITEMS.filter((i) => i.category === 'reviser'),
  },
  {
    id: 'pratique',
    label: 'Pratique & Évaluation',
    icon: 'build',
    items: NAV_ITEMS.filter((i) => i.category === 'pratique'),
  },
  {
    id: 'progression',
    label: 'Performance',
    icon: 'trending_up',
    items: NAV_ITEMS.filter((i) => i.category === 'progression'),
  },
];

export interface BreadcrumbSegment {
  label: string;
  view?: ViewMode;
  isActive?: boolean;
}

export function getBreadcrumbTrail(view: ViewMode, subTitle?: string): BreadcrumbSegment[] {
  const item = NAV_ITEMS.find((i) => i.id === view);
  if (!item) {
    return [{ label: 'Accueil', view: 'tableau-de-bord' }];
  }

  if (view === 'tableau-de-bord') {
    return [{ label: 'Tableau de bord', isActive: true }];
  }

  const category = NAV_CATEGORIES.find((c) => c.id === item.category);
  const segments: BreadcrumbSegment[] = [
    { label: 'Accueil', view: 'tableau-de-bord' },
    { label: category?.label || 'Section' },
    { label: item.label, view: item.id, isActive: !subTitle },
  ];

  if (subTitle) {
    segments.push({ label: subTitle, isActive: true });
  }

  return segments;
}
