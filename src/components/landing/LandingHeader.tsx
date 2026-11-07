import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSwitcher } from '../LanguageSwitcher';

interface LandingHeaderProps {
  onLaunchApp: () => void;
  onOpenSignIn?: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onLaunchApp }) => {
  const { t } = useTranslation(['landing', 'common']);
  const { isLight, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0e16]/90 backdrop-blur-xl border-b border-[#334155]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <img
            src="/logo.jpg"
            alt="NetOps Academy Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover ring-1 ring-[#00e5ff]/50 group-hover:ring-[#00e5ff] transition-all shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-base sm:text-lg text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors tracking-tight font-sans">
              NetOps <span className="text-[#00e5ff]">Academy</span>
            </span>
            <span className="text-[10px] font-mono text-[#849396] -mt-1 hidden sm:block">
              Network Engineering &amp; NOC Cockpit
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#bac9cc]">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
          >
            {t('landing:nav.home')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
          >
            {t('landing:nav.features')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('learning')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
          >
            {t('landing:nav.learning')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('technologies')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
          >
            {t('landing:nav.technologies')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('audiences')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
          >
            {t('landing:nav.audiences')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
          >
            {t('landing:nav.about')}
          </button>
        </nav>

        {/* Right Actions Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          {/* GitHub link */}
          <a
            href="https://github.com/sheriffhomard/Netops"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#849396] hover:text-[#00e5ff] hover:bg-[#181c24] border border-transparent hover:border-[#334155]/60 transition-all cursor-pointer"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[#ffd700] hover:bg-[#181c24] border border-transparent hover:border-[#334155]/60 transition-all cursor-pointer"
            title={isLight ? 'Mode Sombre NOC' : 'Thème Clair'}
            aria-label="Basculer le thème"
          >
            <span className="material-symbols-outlined text-lg leading-none">
              {isLight ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher variant="compact" />

          {/* Primary CTA to enter App */}
          <button
            type="button"
            onClick={onLaunchApp}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] cursor-pointer tracking-wide"
          >
            <span>{t('landing:nav.launchApp')}</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </button>
        </div>

        {/* Mobile Hamburger Trigger & Quick Launch */}
        <div className="flex sm:hidden items-center gap-2">
          <LanguageSwitcher variant="compact" />
          <button
            type="button"
            onClick={onLaunchApp}
            className="px-2.5 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold text-xs"
          >
            App ↵
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-[#00e5ff] hover:bg-[#181c24] border border-[#334155]/60 cursor-pointer"
            aria-label={t('landing:nav.toggleMenu')}
          >
            <span className="material-symbols-outlined text-xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#070a10] border-b border-[#334155] p-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3 text-sm font-medium text-[#dfe2ee]">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff]"
            >
              {t('landing:nav.home')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff]"
            >
              {t('landing:nav.features')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('learning')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff]"
            >
              {t('landing:nav.learning')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('technologies')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff]"
            >
              {t('landing:nav.technologies')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('audiences')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff]"
            >
              {t('landing:nav.audiences')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff]"
            >
              {t('landing:nav.about')}
            </button>
          </nav>

          <div className="pt-3 border-t border-[#334155]/60 flex items-center justify-between">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs font-mono text-[#ffd700] py-1.5 px-3 rounded-lg bg-[#181c24] border border-[#334155]/40"
            >
              <span className="material-symbols-outlined text-base">
                {isLight ? 'dark_mode' : 'light_mode'}
              </span>
              <span>{isLight ? 'Sombre' : 'Clair'}</span>
            </button>

            <a
              href="https://github.com/sheriffhomard/Netops"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#849396] hover:text-[#00e5ff] py-1.5 px-3 rounded-lg bg-[#181c24] border border-[#334155]/40"
            >
              <span>GitHub</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>

          <button
            type="button"
            onClick={onLaunchApp}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold text-sm shadow-lg shadow-[#00e5ff]/20 cursor-pointer"
          >
            <span>{t('landing:nav.launchApp')}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      )}
    </header>
  );
};
