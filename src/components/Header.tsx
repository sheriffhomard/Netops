import React, { useState } from 'react';
import { UserProfile, ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';
import { UserProfileModal } from './UserProfileModal';
import { Breadcrumbs } from './Breadcrumbs';

interface HeaderProps {
  user: UserProfile;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  onOpenSubnetCalc?: () => void;
  onOpenLegalDisclaimer?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user: fallbackUser,
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenSubnetCalc,
  onOpenLegalDisclaimer,
  isSidebarCollapsed = false,
  onToggleSidebarCollapse,
}) => {
  const { user: authUser, userProfile, signIn, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Active user data from Firestore or fallback
  const displayName = userProfile?.displayName || authUser?.displayName || fallbackUser.name;
  const avatarUrl = authUser?.photoURL || userProfile?.photoURL || fallbackUser.avatarUrl;
  const roleTitle = userProfile?.role || fallbackUser.role;
  const streakDays = userProfile?.streakDays ?? fallbackUser.streakDays;
  const precision = userProfile?.precisionGlobal ?? fallbackUser.precisionGlobal;
  const targetExam = userProfile?.targetExam || 'ENCOR 350-401';

  return (
    <>
      <header
        className={`fixed top-0 right-0 h-16 bg-[#0a0e16]/90 backdrop-blur-xl z-40 flex items-center justify-between px-6 border-b border-[#334155]/30 shadow-[0_1px_8px_rgba(0,0,0,0.4)] select-none transition-all duration-300 ${
          isSidebarCollapsed ? 'left-20' : 'left-72'
        }`}
      >
        {/* Left: Sidebar Collapse Button & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          {onToggleSidebarCollapse && (
            <button
              onClick={onToggleSidebarCollapse}
              className="p-1.5 rounded-lg text-[#849396] hover:text-[#00e5ff] hover:bg-[#181c24] border border-[#334155]/30 transition-colors shrink-0"
              title={isSidebarCollapsed ? "Développer le menu latéral" : "Réduire le menu latéral"}
              aria-label="Basculer le menu latéral"
            >
              <span className="material-symbols-outlined text-base">
                {isSidebarCollapsed ? 'menu' : 'menu_open'}
              </span>
            </button>
          )}

          <div className="min-w-0">
            <Breadcrumbs currentView={currentView} onNavigate={onNavigate} />
          </div>
        </div>

        {/* Center/Right: Quick Search Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2.5 bg-[#181c24] hover:bg-[#262a33] px-3.5 py-1.5 rounded-lg text-[#bac9cc] border border-[#334155]/50 transition-all text-left group cursor-pointer"
            title="Rechercher rapidement une certification, une RFC ou une commande"
          >
            <span className="material-symbols-outlined text-base text-[#849396] group-hover:text-[#00e5ff] transition-colors">
              search
            </span>
            <span className="text-xs text-[#bac9cc] truncate">
              Rechercher...
            </span>
            <kbd className="bg-[#262a33] border border-[#3b494c] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#00daf3] shadow-sm ml-2">
              Ctrl+K
            </kbd>
          </button>

          {/* Subnet Calc Quick Button */}
          {onOpenSubnetCalc && (
            <button
              onClick={onOpenSubnetCalc}
              title="Calculatrice de sous-réseaux IP & VLSM"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-[#00daf3] border border-[#334155]/40 text-xs font-mono transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">calculate</span>
              <span className="hidden xl:inline">Calculateur CIDR</span>
            </button>
          )}

          {/* User Auth & Profile Trigger */}
          {!authUser ? (
            /* Google Sign-in button */
            <button
              onClick={() => signIn()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Connexion Google</span>
            </button>
          ) : (
            /* Authenticated Profile Card */
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-2 cursor-pointer group rounded-lg hover:bg-[#181c24] py-1 pr-2 transition-colors"
                aria-expanded={showProfileMenu}
                aria-haspopup="true"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#00e5ff]/50 group-hover:ring-[#00e5ff] transition-all"
                  src={avatarUrl}
                />
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors truncate max-w-[120px]">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-[#849396] font-mono leading-none truncate max-w-[120px]">
                    {roleTitle}
                  </span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#849396] group-hover:text-[#dfe2ee]">
                  expand_more
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
                    <img alt="Avatar" className="w-11 h-11 rounded-full object-cover ring-1 ring-[#00e5ff]" src={avatarUrl} />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[#dfe2ee] truncate">{displayName}</h4>
                      <p className="text-[11px] text-[#00daf3] font-mono truncate">{authUser.email}</p>
                      <span className="text-[10px] text-[#a8ffd2] font-mono">
                        Firestore Sync Actif
                      </span>
                    </div>
                  </div>
                  <div className="py-2.5 flex flex-col gap-1.5 text-xs text-[#bac9cc] font-mono">
                    <div className="flex justify-between">
                      <span>Streak d&apos;étude :</span>
                      <span className="text-[#a8ffd2]">{streakDays} jours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Précision globale :</span>
                      <span className="text-[#00e5ff]">{precision}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Examen cible :</span>
                      <span className="text-[#c0c1ff]">{targetExam}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-[#334155]/60">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowProfileModal(true);
                      }}
                      className="w-full py-1.5 rounded bg-[#262a33] text-xs text-[#00e5ff] hover:bg-[#31353e] transition-colors font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">settings</span>
                      Gérer mon profil & Sync
                    </button>
                    {onOpenLegalDisclaimer && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onOpenLegalDisclaimer();
                        }}
                        className="w-full py-1.5 rounded bg-[#181c24] text-xs text-[#849396] hover:text-[#00e5ff] hover:bg-[#262a33] transition-colors font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">gavel</span>
                        Mentions Légales &amp; Indépendance
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        setShowProfileMenu(false);
                        await signOut();
                      }}
                      className="w-full py-1.5 rounded bg-[#ffb4ab]/10 text-xs text-[#ffb4ab] hover:bg-[#ffb4ab]/20 transition-colors font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Profile Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onOpenLegalDisclaimer={onOpenLegalDisclaimer}
      />
    </>
  );
};
