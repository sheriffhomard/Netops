import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// French namespaces
import frCommon from './locales/fr/common.json';
import frNavigation from './locales/fr/navigation.json';
import frDashboard from './locales/fr/dashboard.json';
import frFlashcards from './locales/fr/flashcards.json';
import frExams from './locales/fr/exams.json';
import frLabs from './locales/fr/labs.json';
import frTerminal from './locales/fr/terminal.json';
import frEncyclopedia from './locales/fr/encyclopedia.json';
import frSettings from './locales/fr/settings.json';
import frErrors from './locales/fr/errors.json';

// English namespaces
import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enDashboard from './locales/en/dashboard.json';
import enFlashcards from './locales/en/flashcards.json';
import enExams from './locales/en/exams.json';
import enLabs from './locales/en/labs.json';
import enTerminal from './locales/en/terminal.json';
import enEncyclopedia from './locales/en/encyclopedia.json';
import enSettings from './locales/en/settings.json';
import enErrors from './locales/en/errors.json';

export const defaultNS = 'common';

export const resources = {
  fr: {
    common: frCommon,
    navigation: frNavigation,
    dashboard: frDashboard,
    flashcards: frFlashcards,
    exams: frExams,
    labs: frLabs,
    terminal: frTerminal,
    encyclopedia: frEncyclopedia,
    settings: frSettings,
    errors: frErrors,
  },
  en: {
    common: enCommon,
    navigation: enNavigation,
    dashboard: enDashboard,
    flashcards: enFlashcards,
    exams: enExams,
    labs: enLabs,
    terminal: enTerminal,
    encyclopedia: enEncyclopedia,
    settings: enSettings,
    errors: enErrors,
  },
} as const;

// Get saved language or fallback to 'fr'
const getInitialLanguage = (): 'fr' | 'en' => {
  try {
    const saved = localStorage.getItem('netops_lang');
    if (saved === 'en' || saved === 'fr') {
      return saved;
    }
  } catch {
    // ignore
  }
  return 'fr';
};

const initialLang = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'fr',
    defaultNS,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Sync language changes with localStorage and document html lang attribute
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('netops_lang', lng);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lng;
    }
  } catch {
    // ignore
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang;
}

export default i18n;
