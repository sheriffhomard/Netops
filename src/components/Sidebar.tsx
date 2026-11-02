import React from 'react';
import { ViewMode } from '../types';
import { NAV_CATEGORIES } from '../utils/navigationConfig';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  nocMode: boolean;
  onToggleNocMode: () => void;
  sessionTime?: string;
  globalReadiness?: string;
  onOpenLegalDisclaimer?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  nocMode,
  onToggleNocMode,
  sessionTime = '1h 42m',
  globalReadiness = '84.5%',
  onOpenLegalDisclaimer,
  isCollapsed = false,
  onToggleCollapse,
  onCloseMobile,
}) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[#181c24]/95 backdrop-blur-xl z-50 flex flex-col justify-between border-r border-[#334155]/40 shadow-[0_1px_16px_rgba(0,0,0,0.6)] select-none transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className="flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none flex-1">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#334155]/30 group shrink-0">
          <div
            onClick={() => onSelectView('tableau-de-bord')}
            className={`flex items-center gap-3 cursor-pointer transition-all ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
            title="NetOps Academy - Tableau de bord"
          >
            <img
              alt="NetOps Academy Logo"
              className="h-9 w-9 rounded-xl object-cover ring-1 ring-[#00e5ff]/50 shadow-[0_0_12px_rgba(0,229,255,0.35)] shrink-0 group-hover:scale-105 transition-transform"
              src="/src/assets/images/netops_logo_1790514169496.jpg"
              referrerPolicy="no-referrer"
            />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-[#c3f5ff] tracking-tight leading-tight group-hover:text-[#00e5ff] transition-colors truncate">
                  NetOps Academy
                </span>
                <span className="text-[10px] tracking-wider text-[#00daf3] uppercase font-mono truncate">
                  Enterprise NOC
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={`hidden lg:flex p-1.5 rounded-lg text-[#849396] hover:text-[#00e5ff] hover:bg-[#262a33] transition-colors ${
                isCollapsed ? 'hidden' : ''
              }`}
              title="Replier la barre latérale"
              aria-label="Replier la barre latérale"
            >
              <span className="material-symbols-outlined text-base">first_page</span>
            </button>
          )}

          {/* Mobile close button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33]"
              title="Fermer le menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* Collapsed expansion button */}
        {isCollapsed && onToggleCollapse && (
          <div className="hidden lg:flex justify-center py-2 border-b border-[#334155]/20">
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-[#849396] hover:text-[#00e5ff] hover:bg-[#262a33] transition-colors"
              title="Développer la barre latérale"
              aria-label="Développer la barre latérale"
            >
              <span className="material-symbols-outlined text-base">last_page</span>
            </button>
          </div>
        )}

        {/* Categorized Navigation Menu */}
        <nav className="flex flex-col gap-4 px-3 py-4">
          {NAV_CATEGORIES.map((category) => (
            <div key={category.id} className="flex flex-col gap-1">
              {/* Category Header Label (only when expanded) */}
              {!isCollapsed ? (
                <div className="px-3 pt-1 pb-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#849396]">
                  <span>{category.label}</span>
                </div>
              ) : (
                <div className="h-px bg-[#334155]/40 my-1 mx-2" />
              )}

              {/* Items in category */}
              {category.items.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    title={isCollapsed ? `${item.label} — ${item.description}` : item.description}
                    className={`flex items-center rounded-lg transition-all text-left group relative cursor-pointer ${
                      isCollapsed
                        ? 'justify-center p-2.5'
                        : 'justify-between px-3.5 py-2'
                    } ${
                      isActive
                        ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_14px_rgba(0,229,255,0.35)]'
                        : 'text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 shrink-0 ${
                          isActive
                            ? 'text-[#00363d]'
                            : 'text-[#849396] group-hover:text-[#00e5ff]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <span className="text-xs truncate">{item.label}</span>
                      )}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          isActive
                            ? 'bg-[#00363d] text-[#00e5ff]'
                            : 'bg-[#00363d]/60 text-[#00e5ff] border border-[#00e5ff]/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Small active badge for collapsed mode */}
                    {isCollapsed && isActive && (
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00363d]" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Info & NOC Switch */}
      <div className="p-3 flex flex-col gap-2 border-t border-[#334155]/30 bg-[#0f131c]/60 shrink-0">
        {!isCollapsed && (
          <div className="bg-[#0a0e16]/80 rounded-lg p-2.5 flex flex-col gap-1.5 border border-[#334155]/40 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#bac9cc]">
              <span className="text-[10px] uppercase font-sans tracking-wider">Session</span>
              <span className="text-[#a8ffd2] font-semibold">{sessionTime}</span>
            </div>
            <div className="flex items-center justify-between text-[#bac9cc]">
              <span className="text-[10px] uppercase font-sans tracking-wider">Readiness</span>
              <span className="text-[#00e5ff] font-semibold">{globalReadiness}</span>
            </div>
          </div>
        )}

        {/* NOC Toggle */}
        <div
          onClick={onToggleNocMode}
          className={`flex items-center rounded cursor-pointer hover:bg-[#262a33]/60 transition-colors py-1.5 ${
            isCollapsed ? 'justify-center' : 'justify-between px-2'
          }`}
          title="Basculer le mode contraste élevé NOC"
        >
          <span
            className={`text-[11px] font-mono text-[#bac9cc] flex items-center gap-1.5 uppercase ${
              isCollapsed ? 'hidden' : ''
            }`}
          >
            <span className="material-symbols-outlined text-sm text-[#00daf3]">tune</span>
            Mode NOC
          </span>
          <div
            className={`w-7 h-3.5 rounded-full flex items-center p-0.5 transition-colors ${
              nocMode ? 'bg-[#00363d]' : 'bg-[#31353e]'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 transform ${
                nocMode
                  ? 'translate-x-3.5 bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]'
                  : 'translate-x-0 bg-[#849396]'
              }`}
            />
          </div>
        </div>

        {/* Mentions Légales & Indépendance Button */}
        {onOpenLegalDisclaimer && (
          <button
            onClick={onOpenLegalDisclaimer}
            className={`flex items-center rounded text-[11px] font-mono text-[#849396] hover:text-[#00e5ff] hover:bg-[#262a33]/40 transition-colors border-t border-[#334155]/20 pt-2 cursor-pointer ${
              isCollapsed ? 'justify-center p-2' : 'justify-between px-2 py-1'
            }`}
            title="Consulter les mentions légales et l'avertissement d'indépendance (Cisco, Palo Alto, Fortinet...)"
          >
            <span className="flex items-center gap-1.5 truncate">
              <span className="material-symbols-outlined text-sm text-[#00e5ff]">gavel</span>
              {!isCollapsed && <span className="truncate">Mentions Légales</span>}
            </span>
            {!isCollapsed && (
              <span className="material-symbols-outlined text-xs shrink-0">open_in_new</span>
            )}
          </button>
        )}
      </div>
    </aside>
  );
};
