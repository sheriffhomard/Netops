import { ViewMode } from '../types';

export interface NavItemConfig {
  id: ViewMode;
  label: string;
  shortLabel: string;
  icon: string;
  badge?: string;
  description: string;
  category: 'accueil' | 'apprendre' | 'reviser' | 'pratique' | 'evaluer';
  translationKey: string;
}

export interface NavCategoryConfig {
  id: 'accueil' | 'apprendre' | 'reviser' | 'pratique' | 'evaluer';
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
    translationKey: 'dashboard',
  },

  // Apprendre
  {
    id: 'parcours-certifications',
    label: 'Parcours & Certifications',
    shortLabel: 'Certifications',
    icon: 'layers',
    description: 'Catalogue complet Cisco, Palo Alto, Fortinet, CompTIA, Juniper',
    category: 'apprendre',
    translationKey: 'certifications',
  },
  {
    id: 'glossaire-cloud',
    label: 'Encyclopédie Cloud',
    shortLabel: 'Cloud',
    icon: 'cloud_sync',
    badge: 'NEW',
    description: 'Topologies hybrides, schémas ASCII et matrice multi-cloud',
    category: 'apprendre',
    translationKey: 'cloud',
  },

  // Réviser
  {
    id: 'flashcards',
    label: 'Flashcards & Mémos',
    shortLabel: 'Flashcards',
    icon: 'style',
    badge: 'SRS',
    description: '2 900+ fiches de révision, mode répétition espacée et Blitz',
    category: 'reviser',
    translationKey: 'flashcards',
  },
  {
    id: 'banque-de-questions',
    label: 'Banque de Questions',
    shortLabel: 'Questions',
    icon: 'database',
    description: 'QCM commentés, filtres par domaine et explications détaillées',
    category: 'reviser',
    translationKey: 'questions',
  },

  // Pratiquer (Ingénierie Réseau & Ateliers)
  {
    id: 'ateliers-et-labs',
    label: 'Ateliers & Labs',
    shortLabel: 'Ateliers',
    icon: 'science',
    description: 'Saisie exacte de commandes, ordonnancement et dépannage',
    category: 'pratique',
    translationKey: 'labs',
  },
  {
    id: 'terminal-lab-virtuel',
    label: 'Terminal & Lab Virtuel',
    shortLabel: 'Terminal',
    icon: 'terminal',
    description: 'Console CLI Cisco IOS-XE interactive avec auto-complétion',
    category: 'pratique',
    translationKey: 'terminal',
  },

  // Évaluer & Mesurer
  {
    id: 'simulateur-d-examen',
    label: 'Simulateur d\'Examen',
    shortLabel: 'Examens',
    icon: 'check_circle',
    description: 'Conditions réelles proctorisées avec chronomètre et notation',
    category: 'evaluer',
    translationKey: 'simulator',
  },
  {
    id: 'analytiques-de-reussite',
    label: 'Analytiques de Réussite',
    shortLabel: 'Analytiques',
    icon: 'monitoring',
    description: 'Radar des faiblesses, historique des scores et prédiction d\'examen',
    category: 'evaluer',
    translationKey: 'analytics',
  },
];

export const NAV_CATEGORIES: NavCategoryConfig[] = [
  {
    id: 'accueil',
    label: 'Accueil',
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
    label: 'Réviser',
    icon: 'psychology',
    items: NAV_ITEMS.filter((i) => i.category === 'reviser'),
  },
  {
    id: 'pratique',
    label: 'Pratiquer (Ingénierie)',
    icon: 'build',
    items: NAV_ITEMS.filter((i) => i.category === 'pratique'),
  },
  {
    id: 'evaluer',
    label: 'Évaluer & Mesurer',
    icon: 'verified',
    items: NAV_ITEMS.filter((i) => i.category === 'evaluer'),
  },
];

/**
 * Returns localized nav items using the active translation function
 */
export function getLocalizedNavItems(t?: (key: string) => string): NavItemConfig[] {
  if (!t) return NAV_ITEMS;
  return NAV_ITEMS.map((item) => ({
    ...item,
    label: t(`navigation:items.${item.translationKey}.label`),
    shortLabel: t(`navigation:items.${item.translationKey}.shortLabel`),
    description: t(`navigation:items.${item.translationKey}.description`),
  }));
}

/**
 * Returns localized nav categories using the active translation function
 */
export function getLocalizedNavCategories(t?: (key: string) => string): NavCategoryConfig[] {
  const items = getLocalizedNavItems(t);
  const categoryIds: Array<'accueil' | 'apprendre' | 'reviser' | 'pratique' | 'evaluer'> = [
    'accueil',
    'apprendre',
    'reviser',
    'pratique',
    'evaluer',
  ];

  return categoryIds.map((catId) => {
    const base = NAV_CATEGORIES.find((c) => c.id === catId)!;
    return {
      ...base,
      label: t ? t(`navigation:categories.${catId}`) : base.label,
      items: items.filter((i) => i.category === catId),
    };
  });
}

export interface BreadcrumbSegment {
  label: string;
  view?: ViewMode;
  isActive?: boolean;
}

export function getBreadcrumbTrail(
  view: ViewMode,
  subTitle?: string,
  t?: (key: string) => string
): BreadcrumbSegment[] {
  const items = getLocalizedNavItems(t);
  const categories = getLocalizedNavCategories(t);

  const homeLabel = t ? t('navigation:breadcrumbs.home') : 'Accueil';
  const item = items.find((i) => i.id === view);

  if (!item) {
    return [{ label: homeLabel, view: 'tableau-de-bord' }];
  }

  if (view === 'tableau-de-bord') {
    return [{ label: item.label, isActive: true }];
  }

  const category = categories.find((c) => c.id === item.category);
  const categoryLabel = category?.label || (t ? t('navigation:breadcrumbs.section') : 'Section');

  const segments: BreadcrumbSegment[] = [
    { label: homeLabel, view: 'tableau-de-bord' },
    { label: categoryLabel },
    { label: item.label, view: item.id, isActive: !subTitle },
  ];

  if (subTitle) {
    segments.push({ label: subTitle, isActive: true });
  }

  return segments;
}
