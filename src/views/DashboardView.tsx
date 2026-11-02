import React from 'react';
import { ViewMode } from '../types';
import { currentUser, dailyDrills, sessionHistory, weaknessRadar } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface DashboardViewProps {
  onNavigate: (view: ViewMode) => void;
  onStartDrill?: (drillTitle: string) => void;
  onOpenSubnetCalc?: () => void;
  onOpenLegalDisclaimer?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onStartDrill,
  onOpenSubnetCalc,
  onOpenLegalDisclaimer,
}) => {
  const { user, userProfile, examResults } = useAuth();

  const studentName = userProfile?.displayName || user?.displayName || 'Alexandre';
  const targetCert = userProfile?.targetExam || 'Cisco CCNP Enterprise 350-401 ENCOR';
  const streak = userProfile?.streakDays ?? 14;
  const precision = userProfile?.precisionGlobal ?? 84.5;

  return (
    <div className="flex flex-col w-full pb-20 lg:pb-12">
      <div className="w-full px-4 sm:px-6 py-6 flex flex-col gap-6">

        {/* BLOC 1 : REPRENDRE MON ACTIVITÉ (Hero Session Anchor) */}
        <section aria-labelledby="section-resume" className="w-full bg-[#181c24] border border-[#334155]/50 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Info */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00daf3]">
                <span className="material-symbols-outlined text-base">resume</span>
                <span className="uppercase tracking-wider font-semibold">Reprendre ma session</span>
                <span className="text-[#3b494c]">·</span>
                <span className="text-[#849396]">Dernière activité il y a 2h</span>
              </div>

              <h1 id="section-resume" className="text-xl sm:text-2xl font-bold text-[#dfe2ee] tracking-tight">
                {targetCert}
              </h1>

              <p className="text-xs sm:text-sm text-[#bac9cc] leading-relaxed">
                Module en cours : <strong className="text-[#dfe2ee]">Routage BGP &amp; Convergence L2 Spanning-Tree</strong>. 
                Vous étiez en train de réviser les règles de sélection de route eBGP/iBGP et les attributs MED / Local-Preference.
              </p>

              <div className="flex items-center gap-3 text-xs text-[#849396] pt-1">
                <span>Avancement global : <strong className="text-[#00e5ff] font-mono tabular-nums">78%</strong></span>
                <span aria-hidden="true">·</span>
                <span>Prochain jalon : <strong className="text-[#dfe2ee]">Examen Blanc #4</strong></span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 justify-center">
              <button
                onClick={() => onNavigate('simulateur-d-examen')}
                className="px-5 py-2.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_14px_rgba(0,229,255,0.3)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                <span>Reprendre l'examen blanc</span>
              </button>

              <button
                onClick={() => onNavigate('flashcards')}
                className="px-4 py-2.5 rounded-lg bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] hover:text-[#00e5ff] border border-[#334155]/60 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">style</span>
                <span>Réviser les fiches du module</span>
              </button>
            </div>
          </div>
        </section>

        {/* BLOC 2 : RÉVISIONS & SRS DU JOUR (Spaced Repetition & Blitz) */}
        <section aria-labelledby="section-revisions" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Due Flashcards SRS */}
          <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-[#00daf3]/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-[#849396] uppercase">Répétition espacée (SRS)</span>
                <h2 id="section-revisions" className="text-base font-semibold text-[#dfe2ee]">Fiches prêtes à revoir</h2>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#00363d]/60 text-[#00e5ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee] font-mono tabular-nums">48</span>
                <span className="text-xs text-[#a8ffd2] font-mono">cartes prioritaires</span>
              </div>
              <p className="text-xs text-[#bac9cc]">
                Sélectionnées par l'algorithme Leitner sur Cisco SCOR, PCNSE et FortiGate.
              </p>
            </div>

            <button
              onClick={() => onNavigate('flashcards')}
              className="w-full py-2 px-3 rounded-lg bg-[#262a33] hover:bg-[#00e5ff] hover:text-[#00363d] text-[#00e5ff] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Lancer la session SRS (5 min)</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: 2-min Chrono Blitz */}
          <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-[#00daf3]/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-[#849396] uppercase">Sprint d'ancrage réflexe</span>
                <h3 className="text-base font-semibold text-[#dfe2ee]">Défi Chrono Blitz</h3>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#3131c0]/20 text-[#c0c1ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">timer</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee] font-mono tabular-nums">120s</span>
                <span className="text-xs text-[#c0c1ff] font-mono">cadence intensive</span>
              </div>
              <p className="text-xs text-[#bac9cc]">
                Répondez à un maximum de questions flash pour muscler la vitesse d'examen.
              </p>
            </div>

            <button
              onClick={() => onNavigate('flashcards')}
              className="w-full py-2 px-3 rounded-lg bg-[#262a33] hover:bg-[#3131c0] hover:text-[#dfe2ee] text-[#c0c1ff] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Démarrer le Blitz</span>
              <span className="material-symbols-outlined text-sm">bolt</span>
            </button>
          </div>

          {/* Card 3: Cloud Encyclopedia & Tech Guides */}
          <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-[#4edea3]/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-[#849396] uppercase">Documentation &amp; Fiches</span>
                <h3 className="text-base font-semibold text-[#dfe2ee]">Encyclopédie Cloud</h3>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#003822]/40 text-[#4edea3] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">cloud_sync</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee] font-mono tabular-nums">46</span>
                <span className="text-xs text-[#4edea3] font-mono">fiches techniques</span>
              </div>
              <p className="text-xs text-[#bac9cc]">
                Topologies Direct Connect, ExpressRoute, VPN IPsec et comparatif multi-cloud.
              </p>
            </div>

            <button
              onClick={() => onNavigate('glossaire-cloud')}
              className="w-full py-2 px-3 rounded-lg bg-[#262a33] hover:bg-[#003822] hover:text-[#4edea3] text-[#4edea3] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Consulter l'Encyclopédie</span>
              <span className="material-symbols-outlined text-sm">menu_book</span>
            </button>
          </div>
        </section>

        {/* BLOC 3 & 4 : OBJECTIFS & PROGRESSION (Main Split View) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Active Certifications & Daily Drills */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Active Certifications Objectives */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00e5ff]">workspace_premium</span>
                  <h2 className="text-lg font-semibold text-[#dfe2ee] tracking-tight">
                    Objectifs &amp; Certifications en cours
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('parcours-certifications')}
                  className="text-xs font-mono text-[#00daf3] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Catalogue complet <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* 1. Cisco CCNP Enterprise ENCOR */}
                <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm hover:border-[#00e5ff]/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#262a33] border border-[#334155]/50 flex items-center justify-center text-[#00e5ff] shrink-0">
                        <span className="material-symbols-outlined text-xl">dns</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base text-[#dfe2ee]">Cisco CCNP Enterprise</h3>
                          <span className="text-[11px] font-mono text-[#00daf3]">350-401 ENCOR</span>
                        </div>
                        <span className="text-xs text-[#bac9cc]">Examen Principal · 6 Domaines couverts</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#00e5ff] font-mono tabular-nums">78%</span>
                        <span className="text-[10px] text-[#849396] block uppercase font-mono">Préparation</span>
                      </div>
                      <button
                        onClick={() => onNavigate('simulateur-d-examen')}
                        className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#00e5ff] hover:text-[#00363d] text-xs font-mono text-[#dfe2ee] transition-colors cursor-pointer"
                      >
                        Tester
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-[#262a33] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#00e5ff] to-[#5be9ad] h-full rounded-full w-[78%]" />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#849396]">
                    <span>480 / 600 questions validées</span>
                    <span>Score moyen : 84.2%</span>
                  </div>
                </div>

                {/* 2. Palo Alto Networks PCNSE */}
                <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm hover:border-[#00e5ff]/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#262a33] border border-[#334155]/50 flex items-center justify-center text-[#c0c1ff] shrink-0">
                        <span className="material-symbols-outlined text-xl">shield</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base text-[#dfe2ee]">Palo Alto Networks PCNSE</h3>
                          <span className="text-[11px] font-mono text-[#c0c1ff]">PAN-OS 11.x</span>
                        </div>
                        <span className="text-xs text-[#bac9cc]">Network Security Engineer · 6 Domaines (600 Flashcards)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">45%</span>
                        <span className="text-[10px] text-[#849396] block uppercase font-mono">Préparation</span>
                      </div>
                      <button
                        onClick={() => onNavigate('simulateur-d-examen')}
                        className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#3131c0] hover:text-[#dfe2ee] text-xs font-mono text-[#dfe2ee] transition-colors cursor-pointer"
                      >
                        Tester
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-[#262a33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3131c0] h-full rounded-full w-[45%]" />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#849396]">
                    <span>210 / 450 questions validées</span>
                    <span>Score moyen : 77.5%</span>
                  </div>
                </div>

                {/* 3. Fortinet FCP FortiGate 7.4 */}
                <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm hover:border-[#00e5ff]/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#262a33] border border-[#334155]/50 flex items-center justify-center text-[#ffb4ab] shrink-0">
                        <span className="material-symbols-outlined text-xl">vpn_lock</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base text-[#dfe2ee]">Fortinet FCP FortiGate 7.4</h3>
                          <span className="text-[11px] font-mono text-[#ffb4ab]">NSE 4 / FCP</span>
                        </div>
                        <span className="text-xs text-[#bac9cc]">FortiOS 7.4 Security &amp; Routing · 100 Flashcards</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">35%</span>
                        <span className="text-[10px] text-[#849396] block uppercase font-mono">Préparation</span>
                      </div>
                      <button
                        onClick={() => onNavigate('flashcards')}
                        className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#ffb4ab] hover:text-[#690005] text-xs font-mono text-[#dfe2ee] transition-colors cursor-pointer"
                      >
                        Fiches
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-[#262a33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#93000a] h-full rounded-full w-[35%]" />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#849396]">
                    <span>100 Flashcards spécialisées FortiOS</span>
                    <span>Score moyen : 72.0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Drills Series */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a8ffd2]">psychology</span>
                  <h2 className="text-lg font-semibold text-[#dfe2ee] tracking-tight">
                    Séries d'entraînement du jour
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#849396]">
                  Cycle 24h actif
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {dailyDrills.map((drill) => (
                  <div
                    key={drill.id}
                    className="group bg-[#181c24] hover:bg-[#1c2028] border border-[#334155]/40 hover:border-[#00e5ff]/40 transition-all rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#262a33] border border-[#334155]/60 flex items-center justify-center text-[#00daf3] shrink-0 mt-0.5 sm:mt-0">
                        <span className="material-symbols-outlined text-lg">
                          {drill.id === 'drill-1' ? 'hub' : drill.id === 'drill-2' ? 'speed' : 'alt_route'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-[#849396] uppercase">{drill.category}</span>
                          <span className="text-[#3b494c]">·</span>
                          <span className="font-mono text-xs text-[#bac9cc]">
                            {drill.questionsCount} questions {drill.timeLimit ? `(${drill.timeLimit})` : ''}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                          {drill.title}
                        </h4>
                        <p className="text-xs text-[#bac9cc] line-clamp-1">{drill.description}</p>
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
                      className="shrink-0 w-full sm:w-auto px-4 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-semibold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <span>Lancer</span>
                      <span className="material-symbols-outlined text-base">play_arrow</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Metrics, Weaknesses & Tooling */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Candidate Readiness Radar Card */}
            <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#334155]/30 pb-3">
                <span className="text-xs font-mono text-[#849396] uppercase">Indicateurs Candidat</span>
                <span className="text-xs font-mono text-[#a8ffd2] font-semibold">NOC READY</span>
              </div>

              {/* 4 Clean Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#12151c] border border-[#334155]/30 flex flex-col">
                  <span className="text-[11px] text-[#849396]">Précision</span>
                  <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">{precision}%</span>
                  <span className="text-[10px] text-[#a8ffd2] mt-0.5">+3.1% cette semaine</span>
                </div>

                <div className="p-3 rounded-lg bg-[#12151c] border border-[#334155]/30 flex flex-col">
                  <span className="text-[11px] text-[#849396]">Temps / Q</span>
                  <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">{currentUser.avgTimePerQuestion}s</span>
                  <span className="text-[10px] text-[#00daf3] mt-0.5">Cible &lt; 65s</span>
                </div>

                <div className="p-3 rounded-lg bg-[#12151c] border border-[#334155]/30 flex flex-col">
                  <span className="text-[11px] text-[#849396]">Labs Validés</span>
                  <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">
                    {currentUser.labsCompleted}/{currentUser.totalLabs}
                  </span>
                  <span className="text-[10px] text-[#849396] mt-0.5">Topologies réelles</span>
                </div>

                <div className="p-3 rounded-lg bg-[#12151c] border border-[#334155]/30 flex flex-col">
                  <span className="text-[11px] text-[#849396]">Streak Étude</span>
                  <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">{streak} j</span>
                  <span className="text-[10px] text-[#a8ffd2] mt-0.5">Régularité active</span>
                </div>
              </div>

              {/* Weakness Radar Summary */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#dfe2ee]">Priorités de révision</span>
                  <button
                    onClick={() => onNavigate('analytiques-de-reussite')}
                    className="text-[#00daf3] hover:underline font-mono text-[11px] cursor-pointer"
                  >
                    Voir radar
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {weaknessRadar.slice(0, 3).map((w, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#bac9cc] truncate">{w.name}</span>
                        <span
                          className={`font-mono font-semibold tabular-nums ${
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
                      <div className="w-full bg-[#262a33] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            w.statusType === 'critical' ? 'bg-[#ffb4ab]' : 'bg-[#00daf3]'
                          }`}
                          style={{ width: `${w.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Tools Box */}
            <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 shadow-lg flex flex-col gap-3">
              <h3 className="font-semibold text-sm text-[#dfe2ee] tracking-tight">
                Boîte à outils d'ingénierie
              </h3>

              <div className="flex flex-col gap-2">
                {onOpenSubnetCalc && (
                  <button
                    onClick={onOpenSubnetCalc}
                    className="w-full text-left p-2.5 rounded-lg bg-[#12151c] hover:bg-[#262a33] border border-[#334155]/30 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-lg text-[#00daf3]">calculate</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                          Calculateur CIDR &amp; VLSM
                        </span>
                        <span className="text-[10px] text-[#849396]">Découpage de sous-réseaux IPv4</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-sm text-[#849396] group-hover:text-[#dfe2ee]">
                      chevron_right
                    </span>
                  </button>
                )}

                <button
                  onClick={() => onNavigate('terminal-lab-virtuel')}
                  className="w-full text-left p-2.5 rounded-lg bg-[#12151c] hover:bg-[#262a33] border border-[#334155]/30 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-lg text-[#5be9ad]">terminal</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                        Terminal Cisco IOS-XE
                      </span>
                      <span className="text-[10px] text-[#849396]">Console interactive avec auto-complétion</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-[#849396] group-hover:text-[#dfe2ee]">
                    chevron_right
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('ateliers-et-labs')}
                  className="w-full text-left p-2.5 rounded-lg bg-[#12151c] hover:bg-[#262a33] border border-[#334155]/30 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-lg text-[#c0c1ff]">science</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                        Ateliers de Dépannage
                      </span>
                      <span className="text-[10px] text-[#849396]">Injection de pannes &amp; diagnostic</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-[#849396] group-hover:text-[#dfe2ee]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            {/* Legal Disclaimer Link */}
            {onOpenLegalDisclaimer && (
              <div className="p-3.5 rounded-xl bg-[#181c24]/60 border border-[#334155]/30 flex flex-col gap-1.5 text-xs">
                <span className="text-[11px] font-mono text-[#849396] uppercase">Transparence &amp; Déontologie</span>
                <p className="text-[11px] text-[#849396] leading-relaxed">
                  NetOps Academy est un outil de révision indépendant, sans affiliation avec Cisco, Palo Alto Networks, Fortinet, CompTIA ou Juniper.
                </p>
                <button
                  onClick={onOpenLegalDisclaimer}
                  className="text-[#00e5ff] hover:underline font-mono text-[11px] text-left pt-1 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">gavel</span>
                  <span>Lire les mentions légales complètes</span>
                </button>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
};
