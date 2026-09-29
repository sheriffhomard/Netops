import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  nocMode: boolean;
  onToggleNocMode: () => void;
  sessionTime?: string;
  globalReadiness?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  nocMode,
  onToggleNocMode,
  sessionTime = '1h 42m',
  globalReadiness = '84.5%',
}) => {
  const navItems: { id: ViewMode; label: string; icon: string; badge?: string }[] = [
    { id: 'tableau-de-bord', label: 'Tableau de bord', icon: 'dashboard' },
    { id: 'flashcards', label: 'Flashcards & Mémos', icon: 'style', badge: 'SRS' },
    { id: 'glossaire-cloud', label: 'Encyclopédie Cloud', icon: 'cloud_sync', badge: 'NEW' },
    { id: 'ateliers-et-labs', label: 'Ateliers & Labs', icon: 'science' },
    { id: 'parcours-certifications', label: 'Parcours & Certifications', icon: 'layers' },
    { id: 'simulateur-d-examen', label: "Simulateur d'Examen", icon: 'check_circle' },
    { id: 'terminal-lab-virtuel', label: 'Terminal & Lab Virtuel', icon: 'terminal' },
    { id: 'banque-de-questions', label: 'Banque de Questions', icon: 'database' },
    { id: 'analytiques-de-reussite', label: 'Analytiques de Réussite', icon: 'monitoring' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#181c24]/95 backdrop-blur-xl z-50 flex flex-col justify-between border-r border-[#334155]/40 shadow-[0_1px_12px_rgba(0,0,0,0.5)] select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div
          onClick={() => onSelectView('tableau-de-bord')}
          className="h-16 flex items-center gap-3 px-5 cursor-pointer hover:opacity-95 transition-all border-b border-[#334155]/30 group"
        >
          <img
            alt="NetOps Academy Logo"
            className="h-9 w-9 rounded-xl object-cover ring-1 ring-[#00e5ff]/50 shadow-[0_0_12px_rgba(0,229,255,0.35)] group-hover:scale-105 transition-transform"
            src="/src/assets/images/netops_logo_1790514169496.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-[#c3f5ff] tracking-tight leading-tight group-hover:text-[#00e5ff] transition-colors">
              NetOps Academy
            </span>
            <span className="text-[10px] tracking-wider text-[#00daf3] uppercase font-mono">
              Enterprise NOC Engine
            </span>
          </div>
        </div>


        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 px-3 mt-4">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all text-left group ${
                  isActive
                    ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_14px_rgba(0,229,255,0.35)]'
                    : 'text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#00363d]' : 'text-[#849396] group-hover:text-[#00e5ff]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#00363d] text-[#00e5ff]'
                        : 'bg-[#00363d]/60 text-[#00e5ff] border border-[#00e5ff]/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & NOC Switch */}
      <div className="p-4 flex flex-col gap-3 border-t border-[#334155]/30 bg-[#0f131c]/50">
        <div className="bg-[#0a0e16]/80 rounded-lg p-3 flex flex-col gap-2 border border-[#334155]/40 font-mono text-xs">
          <div className="flex items-center justify-between text-[#bac9cc]">
            <span className="text-[10px] uppercase font-sans tracking-wider">Session en cours</span>
            <span className="text-[#a8ffd2] font-semibold">{sessionTime}</span>
          </div>
          <div className="flex items-center justify-between text-[#bac9cc]">
            <span className="text-[10px] uppercase font-sans tracking-wider">Readiness Global</span>
            <span className="text-[#00e5ff] font-semibold">{globalReadiness}</span>
          </div>
          <div className="flex items-center justify-between text-[#bac9cc]">
            <span className="text-[10px] uppercase font-sans tracking-wider">Packet Engine</span>
            <span className="text-[#4edea3] text-[11px]">v3.4 Active</span>
          </div>
        </div>

        {/* NOC Toggle */}
        <div
          onClick={onToggleNocMode}
          className="flex items-center justify-between px-2 py-1.5 rounded cursor-pointer hover:bg-[#262a33]/40 transition-colors"
        >
          <span className="text-[11px] font-mono text-[#bac9cc] flex items-center gap-1.5 uppercase">
            <span className="material-symbols-outlined text-sm text-[#00daf3]">tune</span>
            Mode NOC Console
          </span>
          <div
            className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${
              nocMode ? 'bg-[#00363d]' : 'bg-[#31353e]'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-200 transform ${
                nocMode ? 'translate-x-4 bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]' : 'translate-x-0 bg-[#849396]'
              }`}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
