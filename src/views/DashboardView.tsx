import React from 'react';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '../types';
import { currentUser, dailyDrills, sessionHistory, weaknessRadar } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Tooltip } from '../components/Tooltip';

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
  const { t, i18n } = useTranslation(['common', 'dashboard', 'navigation', 'settings']);
  const isEn = i18n.language?.startsWith('en');
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
                <span className="uppercase tracking-wider font-semibold">{t('dashboard:resumeSession.title')}</span>
                <span className="text-[#3b494c]">·</span>
                <span className="text-[#849396]">{t('dashboard:resumeSession.lastActivity')}</span>
              </div>

              <h1 id="section-resume" className="text-xl sm:text-2xl font-bold text-[#dfe2ee] tracking-tight">
                {targetCert}
              </h1>

              <p className="text-xs sm:text-sm text-[#bac9cc] leading-relaxed">
                {t('dashboard:resumeSession.currentModule')} <strong className="text-[#dfe2ee]">{isEn ? 'BGP Routing & L2 Spanning-Tree Convergence' : 'Routage BGP & Convergence L2 Spanning-Tree'}</strong>. 
                {' '}{t('dashboard:resumeSession.moduleDescription')}
              </p>

              <div className="flex items-center gap-3 text-xs text-[#849396] pt-1">
                <span>{t('dashboard:resumeSession.globalProgress')} <strong className="text-[#00e5ff] font-mono tabular-nums">78%</strong></span>
                <span aria-hidden="true">·</span>
                <span>{t('dashboard:resumeSession.nextMilestone')} <strong className="text-[#dfe2ee]">{t('dashboard:resumeSession.nextMilestoneValue')}</strong></span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 justify-center">
              <button
                onClick={() => onNavigate('simulateur-d-examen')}
                className="px-5 py-2.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_14px_rgba(0,229,255,0.3)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                <span>{t('dashboard:resumeSession.resumeExam')}</span>
              </button>

              <button
                onClick={() => onNavigate('flashcards')}
                className="px-4 py-2.5 rounded-lg bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] hover:text-[#00e5ff] border border-[#334155]/60 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">style</span>
                <span>{t('dashboard:resumeSession.reviewCards')}</span>
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
                <span className="text-xs font-mono text-[#849396] uppercase flex items-center gap-1.5">
                  <span>{t('dashboard:srs.title')}</span>
                  <Tooltip content={t('dashboard:srs.tooltip')} />
                </span>
                <h2 id="section-revisions" className="text-base font-semibold text-[#dfe2ee]">{t('dashboard:srs.readyToReview')}</h2>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#00363d]/60 text-[#00e5ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee] font-mono tabular-nums">48</span>
                <span className="text-xs text-[#a8ffd2] font-mono">{t('dashboard:srs.priorityCards')}</span>
              </div>
              <p className="text-xs text-[#bac9cc]">
                {isEn ? 'Selected by Leitner SRS on Cisco SCOR, PCNSE and FortiGate.' : "Sélectionnées par l'algorithme Leitner sur Cisco SCOR, PCNSE et FortiGate."}
              </p>
            </div>

            <button
              onClick={() => onNavigate('flashcards')}
              className="w-full py-2 px-3 rounded-lg bg-[#262a33] hover:bg-[#00e5ff] hover:text-[#00363d] text-[#00e5ff] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t('dashboard:srs.startReview')}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: 2-min Chrono Blitz */}
          <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-[#00daf3]/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-[#849396] uppercase flex items-center gap-1.5">
                  <span>{t('dashboard:srs.blitzTitle')}</span>
                  <Tooltip content={t('dashboard:srs.blitzDesc')} />
                </span>
                <h3 className="text-base font-semibold text-[#dfe2ee]">{t('dashboard:srs.blitzTitle')}</h3>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#3131c0]/20 text-[#c0c1ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">timer</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee] font-mono tabular-nums">120s</span>
                <span className="text-xs text-[#c0c1ff] font-mono">{isEn ? 'intensive pace' : 'cadence intensive'}</span>
              </div>
              <p className="text-xs text-[#bac9cc]">
                {t('dashboard:srs.blitzDesc')}
              </p>
            </div>

            <button
              onClick={() => onNavigate('flashcards')}
              className="w-full py-2 px-3 rounded-lg bg-[#262a33] hover:bg-[#3131c0] hover:text-[#dfe2ee] text-[#c0c1ff] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t('dashboard:srs.startBlitz')}</span>
              <span className="material-symbols-outlined text-sm">bolt</span>
            </button>
          </div>

          {/* Card 3: Cloud Encyclopedia & Tech Guides */}
          <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-[#4edea3]/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono text-[#849396] uppercase flex items-center gap-1.5">
                  <span>{isEn ? 'Docs & Architecture' : 'Documentation & Fiches'}</span>
                  <Tooltip content={t('encyclopedia:subtitle')} />
                </span>
                <h3 className="text-base font-semibold text-[#dfe2ee]">{t('navigation:items.cloud.label')}</h3>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#003822]/40 text-[#4edea3] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">cloud_sync</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#dfe2ee] font-mono tabular-nums">46</span>
                <span className="text-xs text-[#4edea3] font-mono">{isEn ? 'architecture guides' : 'fiches techniques'}</span>
              </div>
              <p className="text-xs text-[#bac9cc]">
                {isEn ? 'Direct Connect, ExpressRoute, IPsec VPN and multi-cloud comparisons.' : 'Topologies Direct Connect, ExpressRoute, VPN IPsec et comparatif multi-cloud.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('glossaire-cloud')}
              className="w-full py-2 px-3 rounded-lg bg-[#262a33] hover:bg-[#003822] hover:text-[#4edea3] text-[#4edea3] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isEn ? 'Explore Encyclopedia' : "Consulter l'Encyclopédie"}</span>
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
                    {isEn ? 'Active Certifications & Goals' : 'Objectifs & Certifications en cours'}
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('parcours-certifications')}
                  className="text-xs font-mono text-[#00daf3] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {isEn ? 'Full Catalog' : 'Catalogue complet'} <span className="material-symbols-outlined text-sm">chevron_right</span>
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
                        <span className="text-xs text-[#bac9cc]">{isEn ? 'Core Exam · 6 Official Domains' : 'Examen Principal · 6 Domaines couverts'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#00e5ff] font-mono tabular-nums">78%</span>
                        <span className="text-[10px] text-[#849396] block uppercase font-mono">{t('navigation:globalReadiness')}</span>
                      </div>
                      <button
                        onClick={() => onNavigate('simulateur-d-examen')}
                        className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#00e5ff] hover:text-[#00363d] text-xs font-mono text-[#dfe2ee] transition-colors cursor-pointer"
                      >
                        {isEn ? 'Test' : 'Tester'}
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-[#262a33] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#00e5ff] to-[#5be9ad] h-full rounded-full w-[78%]" />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#849396]">
                    <span>480 / 600 {t('common:units.questions')}</span>
                    <span>{isEn ? 'Average score: 84.2%' : 'Score moyen : 84.2%'}</span>
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
                        <span className="text-xs text-[#bac9cc]">{isEn ? 'Network Security Engineer · 6 Domains (600 Flashcards)' : 'Network Security Engineer · 6 Domaines (600 Flashcards)'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">45%</span>
                        <span className="text-[10px] text-[#849396] block uppercase font-mono">{t('navigation:globalReadiness')}</span>
                      </div>
                      <button
                        onClick={() => onNavigate('simulateur-d-examen')}
                        className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#3131c0] hover:text-[#dfe2ee] text-xs font-mono text-[#dfe2ee] transition-colors cursor-pointer"
                      >
                        {isEn ? 'Test' : 'Tester'}
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-[#262a33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3131c0] h-full rounded-full w-[45%]" />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#849396]">
                    <span>210 / 450 {t('common:units.questions')}</span>
                    <span>{isEn ? 'Average score: 77.5%' : 'Score moyen : 77.5%'}</span>
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
                        <span className="text-xs text-[#bac9cc]">{isEn ? 'FortiOS 7.4 Security & Routing · 100 Flashcards' : 'FortiOS 7.4 Security & Routing · 100 Flashcards'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#dfe2ee] font-mono tabular-nums">20%</span>
                        <span className="text-[10px] text-[#849396] block uppercase font-mono">{t('navigation:globalReadiness')}</span>
                      </div>
                      <button
                        onClick={() => onNavigate('flashcards')}
                        className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#ffb4ab] hover:text-[#00363d] text-xs font-mono text-[#dfe2ee] transition-colors cursor-pointer"
                      >
                        {isEn ? 'Review' : 'Réviser'}
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-[#262a33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#ffb4ab] h-full rounded-full w-[20%]" />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#849396]">
                    <span>100 / 100 {t('common:units.cards')}</span>
                    <span>{isEn ? 'Deck Ready' : 'Fiches prêtes'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Drills Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a8ffd2]">bolt</span>
                  <h2 className="text-lg font-semibold text-[#dfe2ee] tracking-tight">
                    {t('dashboard:drills.title')}
                  </h2>
                  <Tooltip content={t('dashboard:drills.tooltip')} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dailyDrills.map((drill) => (
                  <div
                    key={drill.id}
                    className="p-4 rounded-xl bg-[#181c24] border border-[#334155]/40 hover:border-[#00daf3]/50 transition-all flex flex-col justify-between gap-3 shadow-sm"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00daf3]">
                          {drill.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#849396] bg-[#0a0e16] px-1.5 py-0.5 rounded border border-[#334155]/40">
                          {drill.timeLimit || '5 min'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm text-[#dfe2ee] leading-snug">
                        {drill.title}
                      </h3>
                      <p className="text-xs text-[#bac9cc] line-clamp-2">
                        {drill.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onStartDrill ? onStartDrill(drill.title) : onNavigate('banque-de-questions')}
                      className="w-full py-1.5 px-3 rounded-lg bg-[#262a33] hover:bg-[#00daf3] hover:text-[#00363d] text-xs font-mono text-[#00daf3] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{t('dashboard:drills.startDrill')}</span>
                      <span className="material-symbols-outlined text-sm">play_arrow</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Weakness Radar & Engineering Tools */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Weakness Radar Box */}
            <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 shadow-lg flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#ffb4ab]">
                    <span className="material-symbols-outlined text-sm">radar</span>
                    <span>{t('dashboard:radar.title')}</span>
                    <Tooltip content={t('dashboard:radar.tooltip')} />
                  </div>
                  <h3 className="text-base font-semibold text-[#dfe2ee]">
                    {isEn ? 'Priority Areas' : 'Domaines prioritaires'}
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('analytiques-de-reussite')}
                  className="text-xs text-[#00e5ff] hover:underline font-mono cursor-pointer"
                >
                  {t('dashboard:radar.viewAll')}
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {weaknessRadar.slice(0, 4).map((w, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#dfe2ee] truncate max-w-[170px]">{w.name}</span>
                      <span
                        className={`font-bold tabular-nums ${
                          w.statusType === 'critical'
                            ? 'text-[#ffb4ab]'
                            : w.statusType === 'medium'
                            ? 'text-[#ffd700]'
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

            {/* Quick Tools Box */}
            <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 shadow-lg flex flex-col gap-3">
              <h3 className="font-semibold text-sm text-[#dfe2ee] tracking-tight">
                {isEn ? 'Network Engineering Toolset' : "Boîte à outils d'ingénierie"}
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
                          {t('navigation:cidrCalc')}
                        </span>
                        <span className="text-[10px] text-[#849396]">IPv4 &amp; VLSM Subnetting</span>
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
                        {t('navigation:items.terminal.label')}
                      </span>
                      <span className="text-[10px] text-[#849396]">{t('navigation:items.terminal.description')}</span>
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
                        {t('navigation:items.labs.label')}
                      </span>
                      <span className="text-[10px] text-[#849396]">{t('navigation:items.labs.description')}</span>
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
                <span className="text-[11px] font-mono text-[#849396] uppercase">{t('navigation:legalNotice')}</span>
                <p className="text-[11px] text-[#849396] leading-relaxed">
                  {t('settings:onboarding.legal.clause1Text')}
                </p>
                <button
                  onClick={onOpenLegalDisclaimer}
                  className="text-[#00e5ff] hover:underline font-mono text-[11px] text-left pt-1 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">gavel</span>
                  <span>{t('settings:system.legalNoticeBtn')}</span>
                </button>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
};
