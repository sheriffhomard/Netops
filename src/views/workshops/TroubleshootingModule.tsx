import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { initialTroubleshootings, TroubleshootingChallenge } from '../../data/workshopsData';
import confetti from 'canvas-confetti';

export const TroubleshootingModule: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const [challenges] = useState<TroubleshootingChallenge[]>(initialTroubleshootings);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedLineNum, setSelectedLineNum] = useState<number | null>(null);
  const [isBugFound, setIsBugFound] = useState<boolean>(false);
  const [isPatchApplied, setIsPatchApplied] = useState<boolean>(false);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  const activeChallenge = challenges[currentIndex] || challenges[0];

  const handleLineClick = (lineNum: number, isBug: boolean) => {
    setSelectedLineNum(lineNum);
    if (isBug) {
      setIsBugFound(true);
    } else {
      setIsBugFound(false);
    }
  };

  const handleApplyPatch = () => {
    setIsPatchApplied(true);
    setResolvedIds((prev) => new Set(prev).add(activeChallenge.id));
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.65 },
    });
  };

  const handleNextChallenge = () => {
    setSelectedLineNum(null);
    setIsBugFound(false);
    setIsPatchApplied(false);
    setCurrentIndex((prev) => (prev + 1) % challenges.length);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/40">
              {isEn ? 'TROUBLESHOOTING & FIND THE BUG' : 'TROUBLESHOOTING & FIND THE BUG'}
            </span>
            <span className="text-xs font-mono text-[#849396]">
              {isEn ? 'Configuration diagnostics & Syslog triage' : 'Diagnostic de configuration & Syslog triage'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#dfe2ee]">
            {isEn ? 'Network Troubleshooting Drills' : 'Défis de Dépannage Réseau'}
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50 text-xs font-mono self-start sm:self-auto">
          <span className="material-symbols-outlined text-[#5be9ad] text-base">task_alt</span>
          <span className="text-[#849396]">{isEn ? 'Resolved tickets:' : 'Incidents résolus :'}</span>
          <span className="text-[#a8ffd2] font-bold">
            {resolvedIds.size}/{challenges.length}
          </span>
        </div>
      </div>

      {/* Ticket List Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {challenges.map((item, idx) => {
          const isCurrent = idx === currentIndex;
          const isResolved = resolvedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedLineNum(null);
                setIsBugFound(false);
                setIsPatchApplied(false);
              }}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                isCurrent
                  ? 'bg-[#181c24] border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                  : 'bg-[#181c24]/80 border-[#334155]/40 hover:bg-[#181c24]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3]">
                  TICKET #{idx + 101}
                </span>
                {isResolved ? (
                  <span className="text-[10px] font-mono text-[#5be9ad] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    {isEn ? 'RESOLVED' : 'RÉSOLU'}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#ffb4ab] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span>
                    {isEn ? 'OPEN' : 'OUVERT'}
                  </span>
                )}
              </div>
              <h4 className="text-xs font-semibold text-[#dfe2ee] line-clamp-1">{item.title}</h4>
            </div>
          );
        })}
      </div>

      {/* Main Troubleshooting Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Incident Synopsis & Config Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-[#181c24] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col gap-5">
          {/* Incident Badge */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#ffb4ab] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping" />
                SYMPTÔME RAPPORTÉ PAR LE MONITORING :
              </span>
              <span className="text-xs font-mono text-[#849396]">{activeChallenge.category}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#dfe2ee] bg-[#93000a]/20 border border-[#ffb4ab]/30 p-3.5 rounded-xl font-mono leading-relaxed">
              &quot;{activeChallenge.symptom}&quot;
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-[#849396] uppercase">
              Extrait de configuration IOS ({activeChallenge.configSnippet.hostname}) - Cliquez sur la ligne coupable :
            </span>

            {/* Interactive Code Line Browser */}
            <div className="bg-[#0a0e16] border border-[#334155] rounded-xl p-3 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="text-[11px] text-[#849396] pb-2 mb-2 border-b border-[#334155]/40 select-none">
                # {activeChallenge.configSnippet.hostname}# show running-config
              </div>
              <div className="flex flex-col gap-1">
                {activeChallenge.configSnippet.lines.map((line) => {
                  const isSelected = selectedLineNum === line.lineNum;
                  return (
                    <div
                      key={line.lineNum}
                      onClick={() => handleLineClick(line.lineNum, line.isBug)}
                      className={`flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? line.isBug
                            ? 'bg-[#93000a]/40 border border-[#ffb4ab] text-[#ffb4ab] font-bold shadow-[0_0_10px_rgba(255,180,171,0.3)]'
                            : 'bg-[#262a33] border border-[#849396] text-[#bac9cc]'
                          : 'hover:bg-[#181c24] text-[#dfe2ee]'
                      }`}
                    >
                      <span className="text-[#849396] w-6 text-right select-none text-[11px]">
                        {line.lineNum}
                      </span>
                      <span className="select-none text-[#3b494c]">|</span>
                      <span className="flex-1 whitespace-pre">{line.text}</span>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold shrink-0">
                          {line.isBug ? 'BUG IDENTIFIÉ !' : 'Ligne saine'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#849396]">
            Astuce NOC : Cliquez directement sur la ligne contenant l&apos;erreur de syntaxe ou de logique pour déclencher l&apos;analyse.
          </span>
        </div>

        {/* Right: Diagnosis & Patch Station (5 cols) */}
        <div className="lg:col-span-5 bg-[#181c24] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <h3 className="text-sm font-bold font-mono text-[#dfe2ee] uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e5ff]">build</span>
              Station d&apos;Analyse &amp; Correctif
            </h3>
            <span className="text-xs font-mono text-[#00daf3]">
              {isBugFound ? 'LIGNE DÉTECTÉE' : 'EN ATTENTE'}
            </span>
          </div>

          {!selectedLineNum ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-[#849396] text-xs font-mono gap-3 bg-[#0a0e16] rounded-xl border border-[#334155]/30">
              <span className="material-symbols-outlined text-3xl text-[#3b494c]">
                find_in_page
              </span>
              <p>
                Inspectez le fichier de configuration ci-contre et cliquez sur la ligne contenant
                l&apos;anomalie pour activer les actions de remédiation.
              </p>
            </div>
          ) : !isBugFound ? (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#262a33]/60 border border-[#334155] text-xs font-mono">
              <div className="flex items-center gap-2 text-[#dfe2ee] font-bold">
                <span className="material-symbols-outlined text-[#849396]">info</span>
                <span>Ligne {selectedLineNum} analysée : Aucun bug ici</span>
              </div>
              <p className="text-[#bac9cc]">
                Cette directive de configuration est conforme aux standards RFC. Poursuivez
                l&apos;inspection sur les autres lignes.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              {/* Bug Explanation Card */}
              <div className="p-4 rounded-xl bg-[#0a0e16] border border-[#ffb4ab]/40 flex flex-col gap-2 text-xs font-mono">
                <span className="text-[#ffb4ab] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">verified</span>
                  {isEn ? 'Root Cause Analysis (RCA):' : 'Analyse de cause racine (Root Cause Analysis) :'}
                </span>
                <p className="text-[#dfe2ee] leading-relaxed">{activeChallenge.bugExplanation}</p>
              </div>

              {/* Proposed Command Fix */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-[#849396] uppercase">
                  {isEn ? 'Recommended corrective command:' : 'Commande corrective préconisée :'}
                </span>
                <pre className="bg-[#0a0e16] p-3 rounded-lg border border-[#00daf3]/40 font-mono text-xs text-[#00e5ff] whitespace-pre-wrap">
                  {activeChallenge.correctiveCommand}
                </pre>
              </div>

              {/* Action Button */}
              {!isPatchApplied ? (
                <button
                  onClick={handleApplyPatch}
                  className="w-full py-3 rounded-xl bg-[#00e5ff] hover:brightness-110 text-[#00363d] font-bold font-mono text-xs shadow-[0_0_14px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-base">bolt</span>
                  <span>{isEn ? 'Apply Patch & Simulate Convergence' : 'Appliquer le Correctif & Simuler la Convergence'}</span>
                </button>
              ) : (
                <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="p-4 rounded-xl bg-[#003824]/40 border border-[#5be9ad]/60 text-xs font-mono text-[#a8ffd2] flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <span className="material-symbols-outlined text-base text-[#5be9ad]">
                        check_circle
                      </span>
                      <span>{isEn ? 'Convergence Confirmed! Live Syslog:' : 'Convergence Confirmée ! Syslog Live :'}</span>
                    </div>
                    <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-[#dfe2ee] bg-[#0a0e16] p-2.5 rounded border border-[#334155]/50">
                      {activeChallenge.simulationSuccessLog}
                    </pre>
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-2.5 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] border border-[#334155] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{isEn ? 'Proceed to next incident' : 'Passer à l\'incident suivant'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
