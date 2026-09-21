import React, { useState } from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenSearch: () => void;
  onOpenSubnetCalc?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenSearch, onOpenSubnetCalc }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
        {/* Core Mesh Status */}
        <div className="hidden xl:flex items-center gap-2 bg-[#181c24] px-3 py-1.5 rounded-lg border border-[#334155]/30">
          <span className="w-2 h-2 rounded-full bg-[#5be9ad] animate-pulse shadow-[0_0_8px_rgba(91,233,173,0.8)]"></span>
          <span className="font-mono text-xs text-[#a8ffd2] font-semibold">CORE MESH: ONLINE</span>
          <span className="font-mono text-xs text-[#3b494c]">|</span>
          <span className="font-mono text-xs text-[#bac9cc]">12ms</span>
        </div>

        {/* Exam Countdown Badge */}
        <div className="hidden md:flex items-center gap-2 bg-[#3131c0]/30 border border-[#c0c1ff]/30 px-3 py-1.5 rounded-lg text-[#c0c1ff]">
          <span className="material-symbols-outlined text-base">timer</span>
          <span className="font-mono text-xs font-medium">ENCOR 350-401 : J-18</span>
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

        {/* Profile Card */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 cursor-pointer group"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#00e5ff]/50 group-hover:ring-[#00e5ff] transition-all"
              src={user.avatarUrl}
            />
            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                  {user.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#a8ffd2] shadow-[0_0_5px_#a8ffd2]"></span>
              </div>
              <span className="text-[10px] text-[#bac9cc] font-mono leading-none">
                {user.role}
              </span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
                <img alt="Avatar" className="w-12 h-12 rounded-full object-cover" src={user.avatarUrl} />
                <div>
                  <h4 className="text-sm font-semibold text-[#dfe2ee]">{user.name}</h4>
                  <p className="text-xs text-[#00e5ff] font-mono">{user.role}</p>
                </div>
              </div>
              <div className="py-2.5 flex flex-col gap-1.5 text-xs text-[#bac9cc] font-mono">
                <div className="flex justify-between">
                  <span>Streak d'étude :</span>
                  <span className="text-[#a8ffd2]">{user.streakDays} jours</span>
                </div>
                <div className="flex justify-between">
                  <span>Précision globale :</span>
                  <span className="text-[#00e5ff]">{user.precisionGlobal}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Labs validés :</span>
                  <span className="text-[#a8ffd2]">{user.labsCompleted}/{user.totalLabs}</span>
                </div>
              </div>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full mt-2 py-1.5 rounded bg-[#262a33] text-xs text-[#dfe2ee] hover:bg-[#31353e] transition-colors font-mono"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
