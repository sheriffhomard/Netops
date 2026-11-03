import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  variant?: 'header' | 'menu' | 'settings' | 'compact';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { i18n, t } = useTranslation(['common']);
  const currentLang = (i18n.language?.substring(0, 2) === 'en' ? 'en' : 'fr') as 'fr' | 'en';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelectLanguage = (lang: 'fr' | 'en') => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  // 1. Settings Variant (large interactive option cards)
  if (variant === 'settings') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
        <button
          type="button"
          onClick={() => handleSelectLanguage('fr')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            currentLang === 'fr'
              ? 'bg-[#00363d]/50 border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)]'
              : 'bg-[#0a0e16] border-[#334155]/60 hover:border-[#334155]'
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-[#181c24] flex items-center justify-center text-xl shrink-0 border border-[#334155]/40 shadow-inner">
            🇫🇷
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-[#dfe2ee]">Français</span>
              {currentLang === 'fr' && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#00e5ff]/20 text-[#00e5ff] font-bold">
                  Actif
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#849396] leading-tight">
              Langue par défaut · Vocabulaire technique et certifications
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleSelectLanguage('en')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            currentLang === 'en'
              ? 'bg-[#00363d]/50 border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)]'
              : 'bg-[#0a0e16] border-[#334155]/60 hover:border-[#334155]'
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-[#181c24] flex items-center justify-center text-xl shrink-0 border border-[#334155]/40 shadow-inner">
            🇬🇧
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-[#dfe2ee]">English</span>
              {currentLang === 'en' && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#00e5ff]/20 text-[#00e5ff] font-bold">
                  Active
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#849396] leading-tight">
              International standard · English exam simulations & drills
            </span>
          </div>
        </button>
      </div>
    );
  }

  // 2. Menu Variant (inline toggle pills)
  if (variant === 'menu') {
    return (
      <div className={`flex items-center p-1 bg-[#0a0e16] border border-[#334155]/60 rounded-xl ${className}`}>
        <button
          type="button"
          onClick={() => handleSelectLanguage('fr')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
            currentLang === 'fr'
              ? 'bg-[#00e5ff] text-[#00363d] shadow-sm'
              : 'text-[#849396] hover:text-[#dfe2ee]'
          }`}
          title="Passer en Français"
        >
          <span>🇫🇷</span>
          <span>FR</span>
        </button>
        <button
          type="button"
          onClick={() => handleSelectLanguage('en')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
            currentLang === 'en'
              ? 'bg-[#00e5ff] text-[#00363d] shadow-sm'
              : 'text-[#849396] hover:text-[#dfe2ee]'
          }`}
          title="Switch to English"
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>
      </div>
    );
  }

  // 3. Compact Toggle (simple one-click flip)
  if (variant === 'compact') {
    const nextLang = currentLang === 'fr' ? 'en' : 'fr';
    return (
      <button
        type="button"
        onClick={() => handleSelectLanguage(nextLang)}
        className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-[#00e5ff] border border-[#334155]/40 text-xs font-mono transition-all cursor-pointer ${className}`}
        title={currentLang === 'fr' ? 'Switch to English' : 'Passer en Français'}
        aria-label="Toggle language"
      >
        <span>{currentLang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}</span>
      </button>
    );
  }

  // 4. Default Header Dropdown
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-[#dfe2ee] hover:text-[#00e5ff] border border-[#334155]/40 text-xs font-mono transition-all cursor-pointer shrink-0"
        title={t('common:language.switchPrompt')}
        aria-label={t('common:language.select')}
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none">{currentLang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
        <span className="font-semibold text-xs tracking-wider">{currentLang.toUpperCase()}</span>
        <span className="material-symbols-outlined text-xs text-[#849396] transition-transform duration-150">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 select-none">
          <div className="px-2.5 py-1 text-[10px] font-mono text-[#849396] uppercase tracking-wider border-b border-[#334155]/40 mb-1">
            {t('common:language.select')}
          </div>

          <button
            type="button"
            onClick={() => handleSelectLanguage('fr')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              currentLang === 'fr'
                ? 'bg-[#00363d]/60 text-[#00e5ff] font-bold border border-[#00e5ff]/30'
                : 'text-[#dfe2ee] hover:bg-[#262a33] hover:text-[#00e5ff]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🇫🇷</span>
              <span>Français</span>
            </div>
            {currentLang === 'fr' && (
              <span className="material-symbols-outlined text-sm text-[#00e5ff]">check</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSelectLanguage('en')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              currentLang === 'en'
                ? 'bg-[#00363d]/60 text-[#00e5ff] font-bold border border-[#00e5ff]/30'
                : 'text-[#dfe2ee] hover:bg-[#262a33] hover:text-[#00e5ff]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🇬🇧</span>
              <span>English</span>
            </div>
            {currentLang === 'en' && (
              <span className="material-symbols-outlined text-sm text-[#00e5ff]">check</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
