import React from 'react';
import { ViewMode } from '../types';
import { currentUser, sessionHistory } from '../data/mockData';

interface AnalyticsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const domainsMastery = [
    { name: 'Connectivité IP (OSPFv3 & BGP)', score: 92, status: 'Maîtrisé', color: '#5be9ad' },
    { name: 'Sécurité & IPsec / TrustSec', score: 89, status: 'Solide', color: '#5be9ad' },
    { name: 'Assurance Réseau (NetFlow & Syslog)', score: 84, status: 'Optimal', color: '#00e5ff' },
    { name: 'Automatisation (Python & RESTCONF)', score: 79, status: 'En progression', color: '#00daf3' },
    { name: 'Virtualisation (VXLAN & LISP)', score: 68, status: 'À consolider', color: '#c0c1ff' },
    { name: 'Spanning-Tree (STP / MSTP / LoopGuard)', score: 61, status: 'Critique', color: '#ffb4ab' },
  ];

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-6 pb-20 lg:pb-8 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">monitoring</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00daf3]">
              TELEMETRY &amp; AI READINESS ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ee]">
            Analytiques de Réussite &amp; Diagnostic
          </h1>
          <p className="text-sm text-[#bac9cc]">
            Projection statistique basée sur 1 420 questions répondues et 38 topologies CLI validées.
          </p>
        </div>

        <button
          onClick={() => alert('Rapport télémétrique complet exporté au format PDF.')}
          className="px-4 py-2.5 rounded-xl bg-[#262a33] text-xs font-mono text-[#00daf3] hover:bg-[#31353e] border border-[#334155] flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Exporter le Rapport Télémétrique</span>
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">Readiness Global ENCOR</span>
          <span className="text-3xl font-bold text-[#00e5ff]">78%</span>
          <span className="text-xs text-[#a8ffd2]">+4.2% ces 7 derniers jours</span>
        </div>
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">Précision Moyenne</span>
          <span className="text-3xl font-bold text-[#a8ffd2]">{currentUser.precisionGlobal}%</span>
          <span className="text-xs text-[#849396]">Seuil officiel: 82.5%</span>
        </div>
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">Vitesse Moyenne</span>
          <span className="text-3xl font-bold text-[#c0c1ff]">{currentUser.avgTimePerQuestion}s</span>
          <span className="text-xs text-[#a8ffd2]">+11s de marge par question</span>
        </div>
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-5 flex flex-col gap-2">
          <span className="text-xs text-[#849396] uppercase">Convergence Labs</span>
          <span className="text-3xl font-bold text-[#dfe2ee]">
            {currentUser.labsCompleted}/{currentUser.totalLabs}
          </span>
          <span className="text-xs text-[#00daf3]">76% des topologies réussies</span>
        </div>
      </div>

      {/* Domains Mastery Breakdown & Historical Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Domain Mastery Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-[#181c24] border border-[#334155] rounded-xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <h3 className="font-semibold text-base text-[#dfe2ee] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e5ff]">pie_chart</span>
              Maîtrise par Domaine Blueprint ENCOR
            </h3>
            <span className="text-xs font-mono text-[#849396]">PONDÉRATION 100%</span>
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
              <span className="font-semibold text-[#dfe2ee]">Plan d&apos;action préconisé</span>
              <span className="text-[#bac9cc]">
                2 séries de drills sur Spanning-Tree et VXLAN sont recommandées avant l&apos;examen blanc.
              </span>
            </div>
            <button
              onClick={() => onNavigate('simulateur-d-examen')}
              className="px-3.5 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold font-mono shrink-0 hover:brightness-110 ml-3"
            >
              Lancer
            </button>
          </div>
        </div>

        {/* Right: Simulation History & Trend (5 cols) */}
        <div className="lg:col-span-5 bg-[#181c24] border border-[#334155] rounded-xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <h3 className="font-semibold text-base text-[#dfe2ee] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c0c1ff]">history_edu</span>
              Derniers Examens Blancs
            </h3>
            <span className="text-xs font-mono text-[#00daf3]">HISTORIQUE 30J</span>
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
              CONSEIL MENTOR NETOPS IA
            </span>
            <p className="leading-relaxed text-[#dfe2ee]">
              Vous gagnez en moyenne +1.8% par session d&apos;examen blanc de 102 questions. En maintenant ce rythme,
              votre probabilité de succès à l&apos;examen CCNP ENCOR dépasse 94% à J-18.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
