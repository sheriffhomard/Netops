import React, { useState } from 'react';
import { ViewMode } from '../types';
import { NAV_CATEGORIES } from '../utils/navigationConfig';
import { useTheme } from '../context/ThemeContext';
import { useUpdate } from '../context/UpdateContext';
import { usePWA } from '../context/PWAContext';

interface HamburgerMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenSubnetCalc: () => void;
  onOpenSystemSettings: () => void;
  onOpenLegalDisclaimer: () => void;
}

export const HamburgerMenuModal: React.FC<HamburgerMenuModalProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
  onOpenSubnetCalc,
  onOpenSystemSettings,
  onOpenLegalDisclaimer,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const { theme, toggleTheme, isLight } = useTheme();
  const { currentVersion, updateAvailable } = useUpdate();
  const { isInstalled, installApp } = usePWA();

  if (!isOpen) return null;

  const handleNavigate = (view: ViewMode) => {
    onSelectView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-start bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="bg-[#121620] border-r border-[#334155] w-full max-w-md sm:max-w-lg h-full flex flex-col text-[#dfe2ee] shadow-2xl animate-in slide-in-from-left duration-200">
        {/* Top Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#334155]/60 bg-[#0a0e16]/90 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="NetOps Logo"
              className="w-8 h-8 rounded-xl object-cover ring-1 ring-[#00e5ff]/50 shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm font-mono text-[#00e5ff] tracking-tight flex items-center gap-2">
                <span>NetOps Academy</span>
                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-[#00363d]/50 border border-[#00e5ff]/30 text-[#00e5ff]">
                  v{currentVersion}
                </span>
              </span>
              <span className="text-[11px] text-[#849396]">
                Navigation Catégorisée & Outils
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
            title="Fermer le menu"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Quick Filter Input */}
        <div className="px-5 py-3 border-b border-[#334155]/40 bg-[#181c24]/50">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[#849396] text-lg absolute left-3 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filtrer les fonctionnalités (ex: Flashcards, BGP, Labs...)"
              className="w-full bg-[#0a0e16] border border-[#334155]/60 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-[#dfe2ee] placeholder-[#849396] focus:outline-none focus:border-[#00e5ff]"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-2.5 text-[#849396] hover:text-[#dfe2ee]"
              >
                <span className="material-symbols-outlined text-base">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Categorized List of Features */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-5">
          {NAV_CATEGORIES.map((cat) => {
            const filteredItems = cat.items.filter((item) => {
              if (!filterQuery) return true;
              const q = filterQuery.toLowerCase();
              return (
                item.label.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.shortLabel.toLowerCase().includes(q)
              );
            });

            if (filteredItems.length === 0) return null;

            return (
              <div key={cat.id} className="flex flex-col gap-2">
                {/* Category Header */}
                <div className="flex items-center gap-2 px-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00daf3]">
                  <span className="material-symbols-outlined text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className="ml-auto text-[10px] text-[#849396] font-normal font-sans">
                    {filteredItems.length} module{filteredItems.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Items Grid/List */}
                <div className="flex flex-col gap-1.5">
                  {filteredItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#00e5ff] text-[#00363d] border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.3)] font-medium'
                            : 'bg-[#181c24] border-[#334155]/50 text-[#dfe2ee] hover:bg-[#262a33] hover:border-[#00e5ff]/50'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#00363d] text-[#00e5ff]'
                              : 'bg-[#0a0e16] text-[#00daf3] border border-[#334155]/60'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {item.icon}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs font-bold font-mono truncate ${
                                isActive ? 'text-[#00363d]' : 'text-[#dfe2ee]'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                                  isActive
                                    ? 'bg-[#00363d] text-[#00e5ff]'
                                    : 'bg-[#00363d]/60 text-[#00e5ff] border border-[#00e5ff]/30'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-[11px] line-clamp-1 mt-0.5 ${
                              isActive ? 'text-[#00363d]/80' : 'text-[#849396]'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* SECTION: OUTILS, SYSTÈME & PARAMÈTRES */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#334155]/50">
            <div className="flex items-center gap-2 px-2 text-xs font-mono font-bold uppercase tracking-wider text-[#c0c1ff]">
              <span className="material-symbols-outlined text-base">build_circle</span>
              <span>Outils & Système</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* CIDR Calc Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSubnetCalc();
                }}
                className="p-2.5 rounded-xl bg-[#181c24] hover:bg-[#262a33] border border-[#334155]/50 text-left flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00363d]/40 text-[#00e5ff] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">calculate</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-[#dfe2ee]">Calculateur CIDR</div>
                  <div className="text-[10px] text-[#849396] truncate">Masques IP & VLSM</div>
                </div>
              </button>

              {/* System Settings Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSystemSettings();
                }}
                className="p-2.5 rounded-xl bg-[#181c24] hover:bg-[#262a33] border border-[#334155]/50 text-left flex items-center gap-2.5 transition-colors cursor-pointer relative"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00363d]/40 text-[#00e5ff] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">settings_suggest</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-[#dfe2ee] flex items-center gap-1">
                    <span>Paramètres Système</span>
                    {updateAvailable && (
                      <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
                    )}
                  </div>
                  <div className="text-[10px] text-[#849396] truncate">Mises à jour & Thèmes</div>
                </div>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-[#181c24] hover:bg-[#262a33] border border-[#334155]/50 text-left flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00363d]/40 text-[#ffd700] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">
                    {isLight ? 'dark_mode' : 'light_mode'}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-[#dfe2ee]">
                    {isLight ? 'Mode Sombre NOC' : 'Thème Clair'}
                  </div>
                  <div className="text-[10px] text-[#849396] truncate">
                    {isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}
                  </div>
                </div>
              </button>

              {/* Install PWA Button */}
              {!isInstalled && (
                <button
                  onClick={() => {
                    onClose();
                    installApp();
                  }}
                  className="p-2.5 rounded-xl bg-[#00363d]/50 hover:bg-[#00363d] border border-[#00e5ff]/50 text-left flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">install_desktop</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono font-bold text-[#00e5ff]">
                      Installer l'application
                    </div>
                    <div className="text-[10px] text-[#849396] truncate">
                      PWA Mobile & Bureau
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Legal disclaimer and Version info */}
        <div className="p-4 border-t border-[#334155]/60 bg-[#0a0e16]/90 flex items-center justify-between text-xs font-mono text-[#849396] shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenLegalDisclaimer();
            }}
            className="flex items-center gap-1.5 hover:text-[#00e5ff] transition-colors cursor-pointer text-[11px]"
          >
            <span className="material-symbols-outlined text-sm text-[#00e5ff]">gavel</span>
            <span>Mentions Légales & Non-affiliation</span>
          </button>

          <span className="text-[10px]">NetOps v{currentVersion}</span>
        </div>
      </div>

      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
