import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '../types';
import { currentUser, sessionHistory } from '../data/mockData';

interface AnalyticsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation(['common', 'dashboard']);
  const isEn = i18n.language?.startsWith('en');
  const [exportNotice, setExportNotice] = useState(false);

  const domainsMastery = [
    {
      name: isEn ? 'IP Connectivity (OSPFv3 & BGP)' : 'Connectivité IP (OSPFv3 & BGP)',
      score: 92,
      status: isEn ? 'Mastered' : 'Maîtrisé',
      color: '#5be9ad',
    },
    {
      name: isEn ? 'Security & IPsec / TrustSec' : 'Sécurité & IPsec / TrustSec',
      score: 89,
      status: isEn ? 'Strong' : 'Solide',
      color: '#5be9ad',
    },
    {
      name: isEn ? 'Network Assurance (NetFlow & Syslog)' : 'Assurance Réseau (NetFlow & Syslog)',
      score: 84,
      status: isEn ? 'Optimal' : 'Optimal',
      color: '#00e5ff',
    },
    {
      name: isEn ? 'Automation (Python & RESTCONF)' : 'Automatisation (Python & RESTCONF)',
      score: 79,
      status: isEn ? 'In progress' : 'En progression',
      color: '#00daf3',
    },
    {
      name: isEn ? 'Virtualization (VXLAN & LISP)' : 'Virtualisation (VXLAN & LISP)',
      score: 68,
      status: isEn ? 'To reinforce' : 'À consolider',
      color: '#c0c1ff',
    },
    {
      name: isEn ? 'Spanning-Tree (STP / MSTP / LoopGuard)' : 'Spanning-Tree (STP / MSTP / LoopGuard)',
      score: 61,
      status: isEn ? 'Critical' : 'Critique',
      color: '#ffb4ab',
    },
  ];

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-6 pb-20 lg:pb-8 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">monitoring</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00daf3]">
              {t('dashboard:analytics.engine')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ee]">
            {t('dashboard:analytics.title')}
          </h1>
          <p className="text-sm text-[#bac9cc]">
            {t('dashboard:analytics.subtitle')}
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2.5 rounded-xl bg-[#262a33] text-xs font-mono text-[#00daf3] hover:bg-[#31353e] border border-[#334155] flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>{t('dashboard:analytics.exportPdf')}</span>
        </button>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-[#00363d]/80 border border-[#00e5ff]/50 text-xs font-mono text-[#a8ffd2] flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-base text-[#00e5ff]">verified</span>
          <span>{t('dashboard:analytics.exported')}</span>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">
            {t('dashboard:analytics.globalReadiness')}
          </span>
          <span className="text-3xl font-bold text-[#00e5ff]">78%</span>
          <span className="text-xs text-[#a8ffd2]">
            {t('dashboard:analytics.last7Days')}
          </span>
        </div>
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">
            {t('dashboard:analytics.avgAccuracy')}
          </span>
          <span className="text-3xl font-bold text-[#a8ffd2]">
            {new Intl.NumberFormat(isEn ? 'en-US' : 'fr-FR', { minimumFractionDigits: 1 }).format(currentUser.precisionGlobal)}%
          </span>
          <span className="text-xs text-[#849396]">
            {t('dashboard:analytics.officialThreshold')}
          </span>
        </div>
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">
            {t('dashboard:analytics.avgSpeed')}
          </span>
          <span className="text-3xl font-bold text-[#c0c1ff]">
            {currentUser.avgTimePerQuestion}s
          </span>
          <span className="text-xs text-[#a8ffd2]">
            {t('dashboard:analytics.speedMargin')}
          </span>
        </div>
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">
            {t('dashboard:analytics.labConvergence')}
          </span>
          <span className="text-3xl font-bold text-[#dfe2ee]">
            {currentUser.labsCompleted}/{currentUser.totalLabs}
          </span>
          <span className="text-xs text-[#00daf3]">
            {t('dashboard:analytics.topologiesSuccess')}
          </span>
        </div>
      </div>

      {/* Domains Mastery Breakdown & Historical Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Domain Mastery Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-[#181c24] border border-[#334155] rounded-xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <h3 className="font-semibold text-base text-[#dfe2ee] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e5ff]">pie_chart</span>
              {t('dashboard:analytics.blueprintMastery')}
            </h3>
            <span className="text-xs font-mono text-[#849396]">
              {t('dashboard:analytics.weighting100')}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {domainsMastery.map((dom, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 font-sans">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe2ee] font-medium">{dom.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#bac9cc]">{dom.status}</span>
                    <span className="font-mono font-bold text-[#dfe2ee]">{dom.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#0a0e16] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${dom.score}%`,
                      backgroundColor: dom.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 bg-[#0a0e16] p-4 rounded-xl border border-[#334155]/50 flex items-center justify-between text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-[#dfe2ee]">
                {t('dashboard:analytics.actionPlanTitle')}
              </span>
              <span className="text-[#bac9cc]">
                {t('dashboard:analytics.actionPlanText')}
              </span>
            </div>
            <button
              onClick={() => onNavigate('simulateur-d-examen')}
              className="px-3.5 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold font-mono shrink-0 hover:brightness-110 ml-3 cursor-pointer"
            >
              {t('dashboard:analytics.start')}
            </button>
          </div>
        </div>

        {/* Right: Simulation History & Trend (5 cols) */}
        <div className="lg:col-span-5 bg-[#181c24] border border-[#334155] rounded-xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <h3 className="font-semibold text-base text-[#dfe2ee] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff]">history_edu</span>
              {t('dashboard:analytics.recentMocks')}
            </h3>
            <span className="text-xs font-mono text-[#00daf3]">
              {t('dashboard:analytics.history30d')}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {sessionHistory.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-lg bg-[#0a0e16] border border-[#334155]/40 flex items-center justify-between text-xs"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-[#dfe2ee]">{s.simulation}</span>
                  <span className="text-[10px] font-mono text-[#849396]">{s.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#dfe2ee]">{s.score}%</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      s.status === 'PASS'
                        ? 'bg-[#a8ffd2]/20 text-[#a8ffd2]'
                        : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0a0e16] p-4 rounded-xl border border-[#334155]/50 flex flex-col gap-2 text-xs font-mono text-[#bac9cc]">
            <span className="text-[10px] text-[#00daf3] uppercase font-bold">
              {t('dashboard:analytics.mentorTip')}
            </span>
            <p className="leading-relaxed text-[#dfe2ee]">
              {t('dashboard:analytics.mentorText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

