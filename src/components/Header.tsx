import React, { useState } from 'react';
import { UserProfile } from '../types';
import { useAuth } from '../context/AuthContext';
import { UserProfileModal } from './UserProfileModal';

interface HeaderProps {
  user: UserProfile;
  onOpenSearch: () => void;
  onOpenSubnetCalc?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user: fallbackUser, onOpenSearch, onOpenSubnetCalc }) => {
  const { user: authUser, userProfile, signIn, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Active user data from Firestore or fallback
  const displayName = userProfile?.displayName || authUser?.displayName || fallbackUser.name;
  const avatarUrl = authUser?.photoURL || userProfile?.photoURL || fallbackUser.avatarUrl;
  const roleTitle = userProfile?.role || fallbackUser.role;
  const streakDays = userProfile?.streakDays ?? fallbackUser.streakDays;
  const precision = userProfile?.precisionGlobal ?? fallbackUser.precisionGlobal;
  const targetExam = userProfile?.targetExam || 'ENCOR 350-401';

  const notifications = [
    {
      id: 1,
      title: 'Lab RoAS v3.4 Déployé',
      time: 'Il y a 10m',
      desc: 'Topologie Cisco 2911 & Catalyst 3650 prête pour validation ICMP.',
      unread: true,
    },
    {
      id: 2,
      title: 'Examen Blanc J-18',
      time: 'Il y a 2h',
      desc: 'CCNP 350-401 ENCOR session programmée pour samedi 14h00.',
      unread: true,
    },
    {
      id: 3,
      title: 'Mise à jour Blueprint Cisco',
      time: 'Hier',
      desc: '15% de questions sur les modèles YANG et RESTCONF ajoutées.',
      unread: false,
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-72 right-0 h-16 bg-[#0a0e16]/85 backdrop-blur-xl z-40 flex items-center justify-between px-6 border-b border-[#334155]/30 shadow-[0_1px_8px_rgba(0,0,0,0.4)] select-none">
        {/* Search Input Bar with Ctrl+K */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-3 bg-[#181c24] hover:bg-[#262a33] px-4 py-2 rounded-lg w-full text-[#bac9cc] border border-[#334155]/50 transition-all text-left group"
          >
            <span className="material-symbols-outlined text-lg text-[#849396] group-hover:text-[#00e5ff] transition-colors">
              search
            </span>
            <span className="text-xs sm:text-sm flex-1 truncate text-[#bac9cc]">
              Rechercher certif, RFC, commande IOS...
            </span>
            <kbd className="bg-[#262a33] border border-[#3b494c] px-2 py-0.5 rounded text-[10px] font-mono text-[#00daf3] shadow-sm">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Telemetry Strip & User Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Cloud Firestore Status Badge */}
          <div className="hidden xl:flex items-center gap-2 bg-[#181c24] px-3 py-1.5 rounded-lg border border-[#334155]/30">
            <span className={`w-2 h-2 rounded-full ${authUser ? 'bg-[#5be9ad] animate-pulse shadow-[0_0_8px_rgba(91,233,173,0.8)]' : 'bg-[#eab308]'}`} />
            <span className="font-mono text-xs text-[#a8ffd2] font-semibold">
              {authUser ? 'FIRESTORE: CONNECTÉ' : 'FIRESTORE: LOCAL'}
            </span>
            <span className="font-mono text-xs text-[#3b494c]">|</span>
            <span className="font-mono text-xs text-[#bac9cc]">12ms</span>
          </div>

          {/* Exam Countdown Badge */}
          <div className="hidden md:flex items-center gap-2 bg-[#3131c0]/30 border border-[#c0c1ff]/30 px-3 py-1.5 rounded-lg text-[#c0c1ff]">
            <span className="material-symbols-outlined text-base">timer</span>
            <span className="font-mono text-xs font-medium">{targetExam} : J-18</span>
          </div>

          {/* Subnet Calc Quick Button if provided */}
          {onOpenSubnetCalc && (
            <button
              onClick={onOpenSubnetCalc}
              title="Calculatrice de sous-réseaux IP / CIDR"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-[#00daf3] border border-[#334155]/40 text-xs font-mono transition-all"
            >
              <span className="material-symbols-outlined text-sm">calculate</span>
              <span className="hidden lg:inline">CIDR</span>
            </button>
          )}

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee] transition-all"
              title="Notifications réseau"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ffb4ab] shadow-[0_0_6px_#ffb4ab]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#334155]/50">
                  <span className="text-xs font-semibold text-[#00daf3] uppercase font-mono tracking-wider">
                    Journal Télémétrique
                  </span>
                  <span className="text-[10px] text-[#a8ffd2] font-mono">2 NOUVELLES</span>
                </div>
                <div className="flex flex-col gap-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg text-left transition-colors ${
                        n.unread ? 'bg-[#262a33]/60' : 'bg-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#dfe2ee]">{n.title}</span>
                        <span className="text-[10px] text-[#849396] font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#bac9cc] mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full mt-3 py-1.5 text-center text-xs font-mono text-[#00daf3] hover:underline"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>

          {/* User Auth & Profile Trigger */}
          {!authUser ? (
            /* Google Sign-in button */
            <button
              onClick={() => signIn()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs transition-all shadow-md active:scale-95"
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
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 pl-2 cursor-pointer group"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00e5ff]/50 group-hover:ring-[#00e5ff] transition-all"
                  src={avatarUrl}
                />
                <div className="hidden lg:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors truncate max-w-[120px]">
                      {displayName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a8ffd2] shadow-[0_0_5px_#a8ffd2]"></span>
                  </div>
                  <span className="text-[10px] text-[#bac9cc] font-mono leading-none truncate max-w-[130px]">
                    {roleTitle}
                  </span>
                </div>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
                    <img alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-1 ring-[#00e5ff]" src={avatarUrl} />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[#dfe2ee] truncate">{displayName}</h4>
                      <p className="text-[11px] text-[#00daf3] font-mono truncate">{authUser.email}</p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-[#00363d] text-[9px] text-[#5be9ad] font-mono">
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
                      className="w-full py-1.5 rounded bg-[#262a33] text-xs text-[#00e5ff] hover:bg-[#31353e] transition-colors font-mono flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">settings</span>
                      Gérer mon profil & Sync
                    </button>
                    <button
                      onClick={async () => {
                        setShowProfileMenu(false);
                        await signOut();
                      }}
                      className="w-full py-1.5 rounded bg-[#ffb4ab]/10 text-xs text-[#ffb4ab] hover:bg-[#ffb4ab]/20 transition-colors font-mono flex items-center justify-center gap-1.5"
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
      />
    </>
  );
};

