import React from 'react';
import { ViewMode } from '../types';
import { currentUser, dailyDrills, sessionHistory, weaknessRadar } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface DashboardViewProps {
  onNavigate: (view: ViewMode) => void;
  onStartDrill?: (drillTitle: string) => void;
  onOpenSubnetCalc?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onStartDrill,
  onOpenSubnetCalc,
}) => {
  const { user, userProfile, examResults } = useAuth();

  const studentName = userProfile?.displayName || user?.displayName || 'Alex';
  const targetCert = userProfile?.targetExam || 'CCNP Enterprise (350-401 ENCOR)';
  const streak = userProfile?.streakDays ?? 14;
  const precision = userProfile?.precisionGlobal ?? 84.5;

  return (
    <div className="flex flex-col w-full">
      {/* Subtle ambient glow container */}
      <div className="relative w-full overflow-hidden px-6 py-6 flex flex-col gap-6">
        {/* Ambient Luminous Glow Orbs */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 right-10 w-80 h-80 bg-[#3131c0]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* 1. Top Banner / Mission Control Hero Metric Strip */}
        <section className="w-full bg-[#181c24]/90 backdrop-blur-xl border border-[#334155]/40 rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col xl:flex-row items-stretch justify-between gap-6">
          {/* Decorative scanning line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-80" />

          {/* Left side: Identity & Mission Focus */}
          <div className="flex flex-col justify-between max-w-2xl">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#262a33] text-[#a8ffd2] text-[11px] font-mono border border-[#334155]/50">
                  <span className="w-2 h-2 rounded-full bg-[#5be9ad] animate-ping" />
                  SESSION NOC ACTIVE
                </span>
                <span className="font-mono text-xs text-[#bac9cc]">
                  HOST: <span className="text-[#00daf3]">noc-workstation-07</span>
                </span>
                <span className="text-[#3b494c]">•</span>
                <span className="text-[11px] text-[#5be9ad] tracking-widest uppercase font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5be9ad] animate-pulse" />
                  FIRESTORE SYNC ACTIVE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ee] mt-1 tracking-tight">
                Station de contrôle {studentName} <span className="text-[#849396] font-normal">|</span>{' '}
                <span className="text-[#00e5ff]">{targetCert}</span>
              </h1>
              <p className="text-sm text-[#bac9cc] max-w-xl leading-relaxed">
                Niveau de préparation optimal atteint sur le routage sous-jacent. Focus recommandé
                aujourd&apos;hui : convergence L2 et isolation Spanning-Tree.
              </p>
            </div>

            {/* Sub-metrics badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 mt-2">
              <div className="flex items-center gap-3 bg-[#1c2028] border border-[#334155]/40 px-4 py-2 rounded-lg">
                <span className="material-symbols-outlined text-[#00e5ff] text-2xl">
                  local_fire_department
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#bac9cc] uppercase font-mono">
                    STREAK &amp; CADENCE
                  </span>
                  <span className="font-mono text-xs text-[#dfe2ee] font-semibold">
                    {streak} jours consécutifs • Précision {precision}%
                  </span>
                </div>
              </div>
              <div
                onClick={() => onNavigate('simulateur-d-examen')}
                className="flex items-center gap-3 bg-[#3131c0]/20 border border-[#c0c1ff]/30 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#3131c0]/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[#c0c1ff] text-2xl">
                  event_available
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#c0c1ff] uppercase font-mono">
                    PROCHAIN EXAMEN BLANC
                  </span>
                  <span className="font-mono text-xs text-[#dfe2ee]">
                    CCNP ENCOR Mock #4 dans 3j{' '}
                    <span className="text-[#c0c1ff]">(Sam 14h00)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Radial Readiness Meter */}
          <div className="flex items-center gap-6 bg-[#0a0e16]/70 border border-[#334155]/40 p-4 rounded-xl justify-center xl:justify-end self-center xl:self-auto w-full xl:w-auto shadow-inner">
            {/* SVG Radial Gauge */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  className="text-[#31353e]"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="9"
                />
                <circle
                  className="text-[#00e5ff]"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="currentColor"
                  strokeDasharray="314.159"
                  strokeDashoffset="69.1"
                  strokeLinecap="round"
                  strokeWidth="9"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-[#dfe2ee]">78%</span>
                <span className="text-[10px] font-mono text-[#9cf0ff] uppercase tracking-wider">
                  Prêt
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 min-w-[170px]">
              <span className="text-[10px] text-[#bac9cc] uppercase font-mono tracking-wider">
                STATUS CANDIDAT
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
                <span className="text-sm font-semibold text-[#a8ffd2]">En bonne voie</span>
              </div>
              <span className="text-xs text-[#bac9cc] mt-1">Seuil recommandé : 85%</span>
              <div className="w-full bg-[#262a33] h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-[#00e5ff] h-full rounded-full w-[78%]" />
              </div>
              <span className="font-mono text-[11px] text-[#bac9cc] pt-1">
                +4.2% depuis 7 jours
              </span>
            </div>
          </div>
        </section>

        {/* 2. Quick Stats Grid (4 Cards) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Precision */}
          <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-[#00daf3]/50 transition-all">
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono text-[#bac9cc] uppercase">
                Précision globale
              </span>
              <div className="p-2 rounded bg-[#1c2028] text-[#00e5ff]">
                <span className="material-symbols-outlined text-lg">target</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee]">{currentUser.precisionGlobal}%</span>
                <span className="font-mono text-xs text-[#a8ffd2] flex items-center">
                  <span className="material-symbols-outlined text-xs">arrow_upward</span>+3.1%
                </span>
              </div>
              <span className="text-xs text-[#bac9cc] mt-1">
                Mesuré sur les 250 derniers items
              </span>
            </div>
            <div className="mt-3 w-full bg-[#31353e] h-1 rounded-full overflow-hidden">
              <div className="bg-[#5be9ad] h-full w-[82.4%]" />
            </div>
          </div>

          {/* Card 2: Speed / question */}
          <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-[#00daf3]/50 transition-all">
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono text-[#bac9cc] uppercase">
                Temps moyen / question
              </span>
              <div className="p-2 rounded bg-[#1c2028] text-[#c0c1ff]">
                <span className="material-symbols-outlined text-lg">timer</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee]">{currentUser.avgTimePerQuestion}s</span>
                <span className="font-mono text-xs text-[#bac9cc]">Cible &lt; 65s</span>
              </div>
              <span className="text-xs text-[#a8ffd2] mt-1 font-medium">
                Cadence optimale (+11s marge)
              </span>
            </div>
            <div className="mt-3 w-full bg-[#31353e] h-1 rounded-full overflow-hidden">
              <div className="bg-[#00e5ff] h-full w-[65%]" />
            </div>
          </div>

          {/* Card 3: Labs CLI */}
          <div
            onClick={() => onNavigate('terminal-lab-virtuel')}
            className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-[#00daf3]/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono text-[#bac9cc] uppercase">
                Labs CLI validés
              </span>
              <div className="p-2 rounded bg-[#1c2028] text-[#a8ffd2] group-hover:text-[#00e5ff] transition-colors">
                <span className="material-symbols-outlined text-lg">terminal</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee]">
                  {currentUser.labsCompleted}{' '}
                  <span className="text-lg font-normal text-[#bac9cc]">/ {currentUser.totalLabs}</span>
                </span>
                <span className="font-mono text-xs text-[#00daf3]">76%</span>
              </div>
              <span className="text-xs text-[#bac9cc] mt-1">
                12 topologies Cisco &amp; Palo restant
              </span>
            </div>
            <div className="mt-3 w-full bg-[#31353e] h-1 rounded-full overflow-hidden">
              <div className="bg-[#5be9ad] h-full w-[76%]" />
            </div>
          </div>

          {/* Card 4: Subnetting Blitz */}
          <div
            onClick={onOpenSubnetCalc}
            className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-[#00daf3]/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono text-[#bac9cc] uppercase">
                VLSM Subnet Speed
              </span>
              <div className="p-2 rounded bg-[#1c2028] text-[#00daf3] group-hover:text-[#00e5ff] transition-colors">
                <span className="material-symbols-outlined text-lg">bolt</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee]">{currentUser.vlsmSpeedSeconds}s</span>
                <span className="font-mono text-xs text-[#bac9cc]">/ calcul</span>
              </div>
              <span className="text-xs text-[#4edea3] mt-1 font-mono">
                Précision VLSM: 98.8%
              </span>
            </div>
            <div className="mt-3 w-full bg-[#31353e] h-1 rounded-full overflow-hidden">
              <div className="bg-[#00e5ff] h-full w-[90%]" />
            </div>
          </div>
        </section>

        {/* 3. Main Split Content (8 Cols Left, 4 Cols Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Quick Access Banners: Flashcards, Cloud Encyclopedia & Workshops */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Flashcards Dedicated Screen */}
              <div
                onClick={() => onNavigate('flashcards')}
                className="bg-gradient-to-br from-[#181c24] via-[#16232e] to-[#181c24] border border-[#00e5ff]/50 rounded-xl p-4 shadow-xl hover:border-[#00e5ff] transition-all cursor-pointer group flex flex-col justify-between gap-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00363d] border border-[#00e5ff]/50 flex items-center justify-center text-[#00e5ff] shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                    <span className="material-symbols-outlined text-xl">style</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00e5ff] text-[#00363d] font-bold">
                        ÉCRAN DÉDIÉ
                      </span>
                      <span className="text-[11px] font-mono text-[#a8ffd2]">
                        1900+ Cartes • SRS
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                      Flashcards Certifications
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#bac9cc] line-clamp-2">
                  Mode 3D flip, 100 fiches/domaine SCOR (D1-D3), ENARSI (D1-D4), ENCOR (D1-D6), CCNA (D1-D6), PCNSE, CompTIA, JNCIA, chrono-blitz et liaison dynamique avec le Cloud.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#334155]/30 text-xs font-mono text-[#00e5ff] font-bold">
                  <span>Lancer les Flashcards</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Cloud Encyclopedia & Glossary */}
              <div
                onClick={() => onNavigate('glossaire-cloud')}
                className="bg-gradient-to-br from-[#181c24] via-[#102a33] to-[#181c24] border border-[#00e5ff]/60 rounded-xl p-4 shadow-xl hover:border-[#4edea3] transition-all cursor-pointer group flex flex-col justify-between gap-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#003822] border border-[#4edea3]/50 flex items-center justify-center text-[#4edea3] shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(78,222,163,0.3)]">
                    <span className="material-symbols-outlined text-xl">cloud_sync</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#4edea3] text-[#003822] font-bold">
                        NOUVEAU
                      </span>
                      <span className="text-[11px] font-mono text-[#a8ffd2]">
                        46 Termes • 7 Guides
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#dfe2ee] group-hover:text-[#4edea3] transition-colors">
                      Encyclopédie &amp; Glossaire Cloud
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#bac9cc] line-clamp-2">
                  Topologies hybrides (Direct Connect, ExpressRoute, Cloud Interconnect), schémas ASCII, passerelles VPN IPsec et matrice comparative multi-cloud.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#334155]/30 text-xs font-mono text-[#4edea3] font-bold">
                  <span>Explorer le Cloud</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Workshops & Labs */}
              <div
                onClick={() => onNavigate('ateliers-et-labs')}
                className="bg-gradient-to-br from-[#181c24] via-[#1c2433] to-[#181c24] border border-[#334155]/60 rounded-xl p-4 shadow-xl hover:border-[#00daf3] transition-all cursor-pointer group flex flex-col justify-between gap-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1f2937] border border-[#334155] flex items-center justify-center text-[#00daf3] shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">science</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262a33] text-[#bac9cc] font-semibold">
                        LABS
                      </span>
                      <span className="text-[11px] font-mono text-[#9cf0ff]">
                        6 Ateliers Pratiques
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#dfe2ee] group-hover:text-[#00daf3] transition-colors">
                      Ateliers &amp; Labs Pratiques
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#bac9cc] line-clamp-2">
                  Saisie exacte de commandes (sans QCM), dépannage avec injection de bugs, ordonnancement &amp; mini-labs guidés.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#334155]/30 text-xs font-mono text-[#00daf3] font-bold">
                  <span>Accéder aux ateliers</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>

            {/* Daily Drills */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00e5ff]">psychology</span>
                  <h2 className="text-lg font-semibold text-[#dfe2ee] tracking-tight">
                    Séries du jour (Daily Drills)
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#bac9cc]">
                  RÉINITIALISATION DANS 07:18:40
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {dailyDrills.map((drill) => (
                  <div
                    key={drill.id}
                    className="group bg-[#181c24]/80 hover:bg-[#181c24] border border-[#334155]/40 hover:border-[#00e5ff]/40 transition-all rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#262a33] border border-[#334155]/60 flex items-center justify-center text-[#00daf3] shrink-0 mt-0.5 sm:mt-0">
                        <span className="material-symbols-outlined text-xl">
                          {drill.id === 'drill-1'
                            ? 'hub'
                            : drill.id === 'drill-2'
                            ? 'speed'
                            : 'alt_route'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#3131c0]/30 text-[#c0c1ff] text-[10px] font-mono uppercase">
                            {drill.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${drill.levelBadge}`}>
                            {drill.level}
                          </span>
                          <span className="font-mono text-xs text-[#bac9cc]">
                            {drill.questionsCount} questions {drill.timeLimit ? `• ${drill.timeLimit}` : ''}
                          </span>
                        </div>
                        <h3 className="text-base font-medium text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                          {drill.title}
                        </h3>
                        <p className="text-xs text-[#bac9cc]">{drill.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (onStartDrill) {
                          onStartDrill(drill.title);
                        } else {
                          onNavigate('simulateur-d-examen');
                        }
                      }}
                      className="shrink-0 w-full sm:w-auto px-5 py-2 rounded-lg bg-[#00e5ff] text-[#00363d] font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center justify-center gap-1.5"
                    >
                      <span>Démarrer</span>
                      <span className="material-symbols-outlined text-lg">play_arrow</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Certifications Progress */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c0c1ff]">workspace_premium</span>
                  <h2 className="text-lg font-semibold text-[#dfe2ee] tracking-tight">
                    Mes Certifications actives &amp; Progression
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('parcours-certifications')}
                  className="text-xs font-mono text-[#00daf3] hover:underline flex items-center gap-1"
                >
                  Gérer les parcours <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* CCNP Enterprise */}
                <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 shadow-md flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#262a33] border border-[#334155] flex items-center justify-center text-[#9cf0ff]">
                        <span className="material-symbols-outlined text-2xl">dns</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#dfe2ee] text-base">
                            Cisco CCNP Enterprise
                          </span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] border border-[#334155]/50">
                            350-401 ENCOR
                          </span>
                        </div>
                        <span className="text-xs text-[#bac9cc]">
                          Examen Principal • Prévu : Mars 2025
                        </span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-bold text-[#00e5ff]">78%</span>
                      <span className="text-[10px] text-[#bac9cc] uppercase block font-mono">
                        Complété
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-xs text-[#bac9cc]">
                      <span>
                        Questions résolues : <strong className="text-[#dfe2ee]">480 / 600</strong>
                      </span>
                      <span>
                        Score moyen : <strong className="text-[#a8ffd2]">84.2%</strong>
                      </span>
                    </div>
                    <div className="w-full bg-[#262a33] h-2.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className="bg-gradient-to-r from-[#00e5ff] to-[#5be9ad] h-full rounded-full transition-all duration-500"
                        style={{ width: '78%' }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[#849396] pt-1">
                      <span>FONDAMENTAUX</span>
                      <span>ROUTAGE AVANCÉ</span>
                      <span>AUTOMATISATION NETCONF/REST</span>
                    </div>
                  </div>
                </div>

                {/* Palo Alto PCNSE */}
                <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 shadow-md flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#262a33] border border-[#334155] flex items-center justify-center text-[#c0c1ff]">
                        <span className="material-symbols-outlined text-2xl">shield</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#dfe2ee] text-base">
                            Palo Alto Networks PCNSE
                          </span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#c0c1ff] border border-[#334155]/50">
                            PAN-OS 11.x
                          </span>
                        </div>
                        <span className="text-xs text-[#bac9cc]">
                          Network Security Engineer • Candidature en cours
                        </span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-bold text-[#dfe2ee]">45%</span>
                      <span className="text-[10px] text-[#bac9cc] uppercase block font-mono">
                        Complété
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-xs text-[#bac9cc]">
                      <span>
                        Questions résolues : <strong className="text-[#dfe2ee]">210 / 450</strong>
                      </span>
                      <span>
                        Score moyen : <strong className="text-[#00e5ff]">77.5%</strong>
                      </span>
                    </div>
                    <div className="w-full bg-[#262a33] h-2.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className="bg-[#3131c0] h-full rounded-full"
                        style={{ width: '45%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* CompTIA Security+ Certified */}
                <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#5be9ad]/10 border border-[#5be9ad]/30 flex items-center justify-center text-[#5be9ad]">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#dfe2ee] text-base">
                          CompTIA Security+
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#bac9cc]">
                          SY0-701
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#a8ffd2]/20 text-[#a8ffd2] text-[10px] font-mono">
                          <span className="material-symbols-outlined text-xs">check</span> CERTIFIÉ
                        </span>
                      </div>
                      <span className="text-xs text-[#bac9cc]">
                        Examen officiel validé avec succès • Score: 840/900
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Certificat officiel CompTIA Security+ SY0-701 téléchargé.')}
                    className="px-4 py-2 rounded-lg bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] text-xs font-mono transition-all flex items-center gap-2 self-start sm:self-center border border-[#334155]"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>Insigne &amp; Certificat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* 1. Radar des Faiblesses */}
            <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#ffb4ab]">
                  <span className="material-symbols-outlined">troubleshoot</span>
                  <h3 className="font-semibold text-[#dfe2ee] text-base">Radar des Faiblesses</h3>
                </div>
                <span className="text-[10px] font-mono text-[#bac9cc]">PRIORITÉS IA</span>
              </div>

              <div className="flex flex-col gap-4">
                {weaknessRadar.map((w, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#dfe2ee] font-medium">{w.name}</span>
                      <span
                        className={`font-mono font-semibold ${
                          w.statusType === 'critical'
                            ? 'text-[#ffb4ab]'
                            : w.statusType === 'medium'
                            ? 'text-[#00daf3]'
                            : 'text-[#a8ffd2]'
                        }`}
                      >
                        {w.score}%
                      </span>
                    </div>
                    <div className="w-full bg-[#262a33] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          w.statusType === 'critical'
                            ? 'bg-[#ffb4ab]'
                            : w.statusType === 'medium'
                            ? 'bg-[#00daf3]'
                            : 'bg-[#5be9ad]'
                        }`}
                        style={{ width: `${w.score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={`uppercase font-mono ${
                          w.statusType === 'critical' ? 'text-[#ffb4ab]' : 'text-[#bac9cc]'
                        }`}
                      >
                        {w.statusLabel}
                      </span>
                      {w.actionText && (
                        <button
                          onClick={() => onNavigate('simulateur-d-examen')}
                          className="font-mono text-[#00e5ff] hover:underline"
                        >
                          {w.actionText}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Historique des Sessions */}
            <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#00e5ff]">
                  <span className="material-symbols-outlined">history</span>
                  <h3 className="font-semibold text-[#dfe2ee] text-base">Historique des Sessions</h3>
                </div>
                <button
                  onClick={() => onNavigate('analytiques-de-reussite')}
                  className="text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee]"
                >
                  Journal complet
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] font-mono text-[#bac9cc] bg-[#262a33]/50 border-b border-[#334155]/40">
                      <th className="py-2 px-3">DATE</th>
                      <th className="py-2 px-3">SIMULATION</th>
                      <th className="py-2 px-3 text-right">SCORE</th>
                      <th className="py-2 px-3 text-center">STATUT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#334155]/20">
                    {examResults.length > 0 ? (
                      examResults.slice(0, 5).map((r) => (
                        <tr key={r.id} className="hover:bg-[#262a33]/40 transition-colors">
                          <td className="py-2 px-3 font-mono text-[#bac9cc]">
                            {new Date(r.completedAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="py-2 px-3 text-[#dfe2ee] font-medium">
                            <span className="flex items-center gap-1.5">
                              {r.examCode}
                              <span className="text-[9px] px-1 rounded bg-[#00363d] text-[#00daf3] font-mono">
                                Cloud
                              </span>
                            </span>
                          </td>
                          <td
                            className={`py-2 px-3 font-mono text-right font-bold ${
                              r.passed ? 'text-[#a8ffd2]' : 'text-[#ffb4ab]'
                            }`}
                          >
                            {Math.round((r.score / (r.maxScore || 1000)) * 100)}%
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                r.passed
                                  ? 'bg-[#a8ffd2]/20 text-[#a8ffd2]'
                                  : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                              }`}
                            >
                              {r.passed ? 'PASS' : 'FAIL'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      sessionHistory.map((s) => (
                        <tr key={s.id} className="hover:bg-[#262a33]/40 transition-colors">
                          <td className="py-2 px-3 font-mono text-[#bac9cc]">{s.date}</td>
                          <td className="py-2 px-3 text-[#dfe2ee] font-medium">{s.simulation}</td>
                          <td
                            className={`py-2 px-3 font-mono text-right font-bold ${
                              s.status === 'PASS' ? 'text-[#a8ffd2]' : 'text-[#ffb4ab]'
                            }`}
                          >
                            {s.score}%
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                s.status === 'PASS'
                                  ? 'bg-[#a8ffd2]/20 text-[#a8ffd2]'
                                  : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Terminal Virtuel Immédiat Sandbox */}
            <div className="relative bg-gradient-to-br from-[#181c24] to-[#0a0e16] border border-[#334155]/50 rounded-xl p-5 shadow-2xl flex flex-col gap-4 overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#31353e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5be9ad]" />
                  <span className="text-xs font-mono text-[#bac9cc] pl-2">
                    cisco-ios-xe# sandbox
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#a8ffd2] uppercase border border-[#334155]/40">
                  VIRL2 / EVE-NG
                </span>
              </div>

              {/* Terminal Code Mockup */}
              <div className="bg-[#0a0e16] border border-[#334155]/40 p-3 rounded-lg font-mono text-xs text-[#dfe2ee] flex flex-col gap-1.5">
                <div className="text-[#bac9cc]">
                  R1# <span className="text-[#00e5ff]">show ip bgp summary</span>
                </div>
                <div className="text-[#4edea3]">
                  BGP router identifier 10.0.0.1, local AS 65001
                </div>
                <div className="text-[#bac9cc]">
                  Neighbor: 10.0.0.2 State:{' '}
                  <span className="text-[#a8ffd2] font-semibold">Established</span>
                </div>
                <div className="text-[#00daf3] flex items-center gap-1">
                  <span>R1(config)#</span>
                  <span className="w-2 h-3.5 bg-[#00e5ff] animate-pulse inline-block" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm text-[#dfe2ee]">
                  Terminal Virtuel Immédiat
                </span>
                <p className="text-xs text-[#bac9cc]">
                  Lancez une instance dynamique IOS-XE / Junos en mémoire flash locale (temps de boot: 4.8s).
                </p>
              </div>

              <button
                onClick={() => onNavigate('terminal-lab-virtuel')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#262a33] hover:bg-[#00e5ff] hover:text-[#00363d] text-[#00e5ff] font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-[#334155] shadow-lg group-hover:shadow-[0_0_15px_rgba(0,229,255,0.25)]"
              >
                <span className="material-symbols-outlined text-lg">terminal</span>
                <span>Ouvrir la Console Sandbox</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Telemetry System Footer Stamp */}
        <footer className="mt-2 py-3 px-4 bg-[#0a0e16]/60 border border-[#334155]/30 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2 text-[#bac9cc] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5be9ad]" />
            <span>MOTEUR SYNC: CLOUD LAB CLUSTER [PAR-01] CONNECTÉ</span>
          </div>
          <div className="flex items-center gap-4">
            <span>LATENCE: 14ms</span>
            <span>MEM: 38% ALLOUÉ</span>
            <span className="text-[#00daf3]">NETOPS CONSOLE READY</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
