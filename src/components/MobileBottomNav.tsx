import React from 'react';
import { ViewMode } from '../types';

interface MobileBottomNavProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onSelectView,
  onToggleMenu,
  isMenuOpen,
}) => {
  const items: {
    id: ViewMode | 'menu';
    label: string;
    icon: string;
    isMenuToggle?: boolean;
    badge?: string;
  }[] = [
    { id: 'tableau-de-bord', label: 'Accueil', icon: 'dashboard' },
    { id: 'flashcards', label: 'Flashcards', icon: 'style', badge: 'SRS' },
    { id: 'simulateur-d-examen', label: 'Examens', icon: 'check_circle' },
    { id: 'ateliers-et-labs', label: 'Labs', icon: 'science' },
    { id: 'menu', label: 'Menu', icon: isMenuOpen ? 'close' : 'grid_view', isMenuToggle: true },
  ];

  return (
    <nav
      aria-label="Navigation principale mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#12151c]/95 backdrop-blur-xl border-t border-[#334155]/60 z-40 flex items-stretch justify-around px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.5)] select-none pb-[env(safe-area-inset-bottom)]"
    >
      {items.map((item) => {
        const isActive = !item.isMenuToggle && currentView === item.id;
        const isMenuTriggerActive = item.isMenuToggle && isMenuOpen;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.isMenuToggle) {
                onToggleMenu();
              } else {
                onSelectView(item.id as ViewMode);
              }
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative group cursor-pointer ${
              isActive || isMenuTriggerActive
                ? 'text-[#00e5ff]'
                : 'text-[#849396] hover:text-[#dfe2ee]'
            }`}
          >
            {/* Active Top Glow Line */}
            {(isActive || isMenuTriggerActive) && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff]" />
            )}

            <div className="relative">
              <span
                className={`material-symbols-outlined text-xl transition-transform group-active:scale-90 ${
                  isActive || isMenuTriggerActive ? 'text-[#00e5ff]' : 'text-[#849396]'
                }`}
              >
                {item.icon}
              </span>
              {item.badge && !isActive && (
                <span className="absolute -top-1 -right-2 text-[8px] font-mono font-bold px-1 rounded bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/40">
                  {item.badge}
                </span>
              )}
            </div>

            <span className="text-[10px] font-medium tracking-tight mt-0.5 font-sans">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
