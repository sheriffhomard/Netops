import React, { useState } from 'react';
import { guidedMiniLabs, GuidedMiniLab, MiniLabStep } from '../../data/workshopsData';
import confetti from 'canvas-confetti';

export const GuidedMiniLabModule: React.FC = () => {
  const [labs] = useState<GuidedMiniLab[]>(guidedMiniLabs);
  const [currentLabIndex, setCurrentLabIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [cliInput, setCliInput] = useState<string>('');
  const [stepLogs, setStepLogs] = useState<string[]>([]);
  const [stepStatus, setStepStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState<boolean>(false);
  const [copiedLog, setCopiedLog] = useState<boolean>(false);

  const activeLab = labs[currentLabIndex] || labs[0];
  const activeStep: MiniLabStep = activeLab.steps[currentStepIndex] || activeLab.steps[0];

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = cliInput.trim();
    if (!raw) return;

    // Verify regex against step
    const isValid = activeStep.acceptedRegex.test(raw);

    if (isValid) {
      setStepStatus('success');
      setErrorMessage('');
      setStepLogs((prev) => [...prev, `${activeStep.devicePrompt} ${raw}`, activeStep.verificationOutput]);
      setCompletedSteps((prev) => new Set(prev).add(activeStep.stepNumber));
      setCliInput('');
      setShowHint(false);

      if (currentStepIndex === activeLab.steps.length - 1) {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 },
        });
      }
    } else {
      setStepStatus('error');
      setErrorMessage(
        `Commande non reconnue pour cet objectif. Tapez : "${activeStep.suggestedCommand}" ou consultez l'indice.`
      );
    }
  };

  const handleAutoFill = () => {
    setCliInput(activeStep.suggestedCommand);
  };

  const handleNextStep = () => {
    if (currentStepIndex < activeLab.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setStepStatus('idle');
      setErrorMessage('');
      setShowHint(false);
      setCliInput('');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setStepStatus('idle');
      setErrorMessage('');
      setShowHint(false);
      setCliInput('');
    }
  };

  const handleSwitchLab = (index: number) => {
    setCurrentLabIndex(index);
    setCurrentStepIndex(0);
    setStepLogs([]);
    setStepStatus('idle');
    setErrorMessage('');
    setCompletedSteps(new Set());
    setShowHint(false);
    setCliInput('');
  };

  const handleCopyTranscript = () => {
    const fullLog = stepLogs.join('\n');
    navigator.clipboard.writeText(fullLog);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const progressPercent = Math.round(
    (completedSteps.size / activeLab.steps.length) * 100
  );

  const isLabFinished = completedSteps.size === activeLab.steps.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Lab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#003824] text-[#5be9ad] border border-[#5be9ad]/40">
              MINI-LABS PAS À PAS
            </span>
            <span className="text-xs font-mono text-[#849396]">
              Scénarios guidés &amp; validation incrémentale
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#dfe2ee]">
            Scénarios Pratiques Guidés
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50 text-xs font-mono self-start sm:self-auto">
          <span className="material-symbols-outlined text-[#00e5ff] text-base">engineering</span>
          <span className="text-[#849396]">Progression lab :</span>
          <span className="text-[#00e5ff] font-bold">{progressPercent}%</span>
        </div>
      </div>

      {/* Lab Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {labs.map((lab, idx) => {
          const isSelected = idx === currentLabIndex;
          return (
            <div
              key={lab.id}
              onClick={() => handleSwitchLab(idx)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? 'bg-[#181c24] border-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.2)]'
                  : 'bg-[#181c24]/80 border-[#334155]/40 hover:bg-[#181c24]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] border border-[#334155]/60">
                  {lab.level} • {lab.durationEst}
                </span>
                <span className="text-xs font-mono text-[#849396] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">checklist</span>
                  {lab.steps.length} Étapes
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#dfe2ee]">{lab.title}</h3>
              <p className="text-xs text-[#bac9cc] line-clamp-2">{lab.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Progress Stepper Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#849396]">
          <span>
            ÉTAPE {activeStep.stepNumber} SUR {activeLab.steps.length} : {activeStep.title}
          </span>
          <span>{progressPercent}% TERMINÉ</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {activeLab.steps.map((step, sIdx) => {
            const isDone = completedSteps.has(step.stepNumber);
            const isCurrent = sIdx === currentStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  setCurrentStepIndex(sIdx);
                  setStepStatus('idle');
                  setErrorMessage('');
                  setShowHint(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  isDone
                    ? 'bg-[#5be9ad]'
                    : isCurrent
                    ? 'bg-[#00e5ff]'
                    : 'bg-[#262a33]'
                }`}
                title={`Étape ${step.stepNumber}: ${step.title}`}
              />
            );
          })}
        </div>
      </div>

      {/* Lab Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step Guidance & Objectives (6 cols) */}
        <div className="lg:col-span-6 bg-[#181c24] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col gap-5">
          {/* Mission Objective Card */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-[#00daf3] uppercase tracking-wider font-semibold">
              CONTEXTE &amp; OBJECTIF GLOBAL :
            </span>
            <p className="text-xs sm:text-sm text-[#bac9cc] bg-[#0a0e16] p-3.5 rounded-xl border border-[#334155]/40 leading-relaxed">
              {activeLab.objective}
            </p>
          </div>

          {/* Current Step Focus */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#262a33]/60 border border-[#334155]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#00e5ff] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                INSTRUCTION POUR L&apos;ÉTAPE #{activeStep.stepNumber}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0e16] text-[#849396]">
                {activeStep.devicePrompt}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#dfe2ee]">
              {activeStep.instruction}
            </h4>
            <span className="text-xs font-mono text-[#849396]">{activeStep.context}</span>
          </div>

          {/* Assistance Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] border border-[#334155] flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                <span>{showHint ? 'Masquer' : 'Indice'}</span>
              </button>
              <button
                onClick={handleAutoFill}
                className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee] border border-[#334155] flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                <span>Pré-remplir</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="px-3 py-1.5 rounded-lg bg-[#262a33] text-xs font-mono text-[#bac9cc] disabled:opacity-40 transition-colors"
              >
                Précédent
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStepIndex >= activeLab.steps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#00363d] text-xs font-mono text-[#00e5ff] border border-[#00e5ff]/40 disabled:opacity-40 transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>

          {showHint && (
            <div className="p-3.5 rounded-xl bg-[#0a0e16] border border-[#00daf3]/40 text-xs font-mono text-[#00daf3] animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <span className="material-symbols-outlined text-sm">info</span>
                <span>Indice opérationnel :</span>
              </div>
              <p className="text-[#dfe2ee]">{activeStep.hint}</p>
            </div>
          )}
        </div>

        {/* Right: Embedded Interactive Console (6 cols) */}
        <div className="lg:col-span-6 bg-[#181c24] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="text-xs font-mono text-[#849396] ml-2">Console IOS Live</span>
            </div>

            {stepLogs.length > 0 && (
              <button
                onClick={handleCopyTranscript}
                className="text-[11px] font-mono text-[#00daf3] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">content_copy</span>
                <span>{copiedLog ? 'Copié !' : 'Copier transcript'}</span>
              </button>
            )}
          </div>

          {/* Console Display Screen */}
          <div className="bg-[#0a0e16] rounded-xl p-4 min-h-[220px] max-h-[300px] overflow-y-auto border border-[#334155]/60 font-mono text-xs flex flex-col gap-2 shadow-inner">
            <div className="text-[#849396] select-none text-[11px]">
              Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4
            </div>
            <div className="text-[#849396] select-none text-[11px] pb-2 border-b border-[#334155]/30">
              * Connecté sur console série locale (Speed 9600 8-N-1).
            </div>

            {stepLogs.map((log, idx) => (
              <pre
                key={idx}
                className="whitespace-pre-wrap leading-relaxed text-[#a8ffd2] font-mono text-xs"
              >
                {log}
              </pre>
            ))}

            {stepStatus === 'error' && (
              <div className="text-[#ffb4ab] bg-[#93000a]/20 p-2 rounded border border-[#ffb4ab]/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* CLI Form Input */}
          <form onSubmit={handleCommandSubmit} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-[#0a0e16] border border-[#334155] focus-within:border-[#00e5ff] rounded-xl px-3 py-2.5">
              <span className="font-mono text-xs text-[#00e5ff] font-bold select-none shrink-0">
                {activeStep.devicePrompt}
              </span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="Tapez la commande et appuyez sur Entrée..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#dfe2ee] placeholder:text-[#849396]/50 focus:ring-0"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-[#00e5ff] text-[#00363d] font-mono font-bold text-xs hover:brightness-110 shrink-0 transition-all"
              >
                Exécuter
              </button>
            </div>
          </form>

          {/* Completion Card if all steps finished */}
          {isLabFinished && (
            <div className="p-4 rounded-xl bg-[#003824]/40 border border-[#5be9ad] flex items-center justify-between gap-3 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#5be9ad]">
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold font-mono text-[#a8ffd2]">
                    Mini-Lab entièrement validé !
                  </span>
                  <span className="text-[11px] font-mono text-[#bac9cc]">
                    Toutes les règles de durcissement sont appliquées.
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  const nextIdx = (currentLabIndex + 1) % labs.length;
                  handleSwitchLab(nextIdx);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#5be9ad] text-[#003824] font-mono font-bold text-xs hover:brightness-110"
              >
                Lab suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
