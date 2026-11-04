import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initialOrderingExercises, OrderingExercise } from '../../data/workshopsData';
import confetti from 'canvas-confetti';

interface StepItem {
  id: string;
  label: string;
  details: string;
  correctIndex: number;
}

export const TimelineOrderingModule: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const [exercises] = useState<OrderingExercise[]>(initialOrderingExercises);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentSteps, setCurrentSteps] = useState<StepItem[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isAllCorrect, setIsAllCorrect] = useState<boolean>(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const activeExercise = exercises[currentIndex] || exercises[0];

  // Shuffle steps when switching exercises
  useEffect(() => {
    shuffleSteps(activeExercise);
    setIsVerified(false);
    setIsAllCorrect(false);
  }, [currentIndex, activeExercise]);

  const shuffleSteps = (exercise: OrderingExercise) => {
    // Fisher-Yates shuffle that ensures it doesn't start in already sorted order
    const shuffled = [...exercise.steps].sort(() => Math.random() - 0.5);
    setCurrentSteps(shuffled);
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setIsVerified(false);
    const updated = [...currentSteps];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setCurrentSteps(updated);
  };

  const moveDown = (index: number) => {
    if (index >= currentSteps.length - 1) return;
    setIsVerified(false);
    const updated = [...currentSteps];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setCurrentSteps(updated);
  };

  const verifyOrder = () => {
    setIsVerified(true);
    const allRight = currentSteps.every((step, idx) => step.correctIndex === idx);
    setIsAllCorrect(allRight);
    if (allRight) {
      setCompletedIds((prev) => new Set(prev).add(activeExercise.id));
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % exercises.length);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Module Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3131c0]/20 text-[#c0c1ff] border border-[#c0c1ff]/30">
              {isEn ? 'CHRONOLOGY & LOGICAL TIMELINE' : 'CHRONOLOGIE & TIMELINE LOGIQUE'}
            </span>
            <span className="text-xs font-mono text-[#849396]">
              {isEn ? 'Protocol workflows & Boot sequences' : 'Processus protocolaires & Boot sequence'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#dfe2ee]">
            {isEn ? 'Sequential Ordering Exercises' : 'Exercices d\'Ordonnancement'}
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50 text-xs font-mono self-start sm:self-auto">
          <span className="material-symbols-outlined text-[#5be9ad] text-base">verified</span>
          <span className="text-[#849396]">{isEn ? 'Validated workflows:' : 'Processus validés :'}</span>
          <span className="text-[#a8ffd2] font-bold">
            {completedIds.size}/{exercises.length}
          </span>
        </div>
      </div>

      {/* Exercise Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {exercises.map((ex, idx) => {
          const isCurrent = idx === currentIndex;
          const isDone = completedIds.has(ex.id);
          return (
            <button
              key={ex.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isCurrent
                  ? 'bg-[#181c24] border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                  : 'bg-[#181c24]/80 border-[#334155]/40 hover:bg-[#181c24]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3]">
                  {ex.category}
                </span>
                {isDone && (
                  <span className="text-[10px] font-mono text-[#5be9ad] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">done_all</span>
                    100%
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-[#dfe2ee] line-clamp-1">{ex.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Sequencing Workspace */}
      <div className="bg-[#181c24] border border-[#334155] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#dfe2ee]">{activeExercise.title}</h3>
          <p className="text-sm text-[#bac9cc] leading-relaxed bg-[#0a0e16] p-4 rounded-xl border border-[#334155]/40">
            {activeExercise.context}
          </p>
        </div>

        {/* Re-orderable List */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#849396] px-2">
            <span>ORDRE CHRONOLOGIQUE PROPOSÉ</span>
            <span>RÉAJUSTEMENT DES POSITIONS</span>
          </div>

          {currentSteps.map((step, idx) => {
            const isCorrectPosition = isVerified && step.correctIndex === idx;
            const isWrongPosition = isVerified && step.correctIndex !== idx;

            return (
              <div
                key={step.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  isCorrectPosition
                    ? 'bg-[#003824]/30 border-[#5be9ad]/60 text-[#a8ffd2]'
                    : isWrongPosition
                    ? 'bg-[#93000a]/20 border-[#ffb4ab]/50 text-[#ffb4ab]'
                    : 'bg-[#0a0e16] border-[#334155]/60 hover:border-[#334155] text-[#dfe2ee]'
                }`}
              >
                {/* Step Index Badge & Text */}
                <div className="flex items-start sm:items-center gap-3 flex-1">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isCorrectPosition
                        ? 'bg-[#5be9ad] text-[#003824]'
                        : isWrongPosition
                        ? 'bg-[#ffb4ab] text-[#93000a]'
                        : 'bg-[#262a33] text-[#00daf3]'
                    }`}
                  >
                    #{idx + 1}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{step.label}</span>
                    <span className="text-xs text-[#849396]">{step.details}</span>
                  </div>
                </div>

                {/* Status Indicator & Reorder Controls */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {isVerified && (
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded font-bold mr-2 ${
                        isCorrectPosition ? 'text-[#5be9ad]' : 'text-[#ffb4ab]'
                      }`}
                    >
                      {isCorrectPosition
                        ? (isEn ? '✓ Exact position' : '✓ Position exacte')
                        : (isEn ? `✗ Expected at #${step.correctIndex + 1}` : `✗ Attendu en #${step.correctIndex + 1}`)}
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      title={isEn ? "Move up one position" : "Monter d'une position"}
                      className="p-1.5 rounded-lg bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] disabled:opacity-30 disabled:hover:bg-[#262a33] transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">arrow_upward</span>
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === currentSteps.length - 1}
                      title={isEn ? "Move down one position" : "Descendre d'une position"}
                      className="p-1.5 rounded-lg bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] disabled:opacity-30 disabled:hover:bg-[#262a33] transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">arrow_downward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Summary Banner */}
        {isVerified && (
          <div
            className={`p-4 rounded-xl border flex flex-col gap-2 font-mono text-xs animate-in fade-in duration-200 ${
              isAllCorrect
                ? 'bg-[#003824]/30 border-[#5be9ad]/60 text-[#a8ffd2]'
                : 'bg-[#93000a]/20 border-[#ffb4ab]/50 text-[#ffb4ab]'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <span className="material-symbols-outlined text-base">
                {isAllCorrect ? 'verified' : 'sync_problem'}
              </span>
              <span>
                {isAllCorrect
                  ? (isEn ? 'Sequence 100% correctly ordered!' : 'Séquence ordonnée à 100% avec succès !')
                  : (isEn ? 'Some steps are not in the correct chronological order.' : 'Certaines étapes ne sont pas à la bonne place chronologique.')}
              </span>
            </div>
            <p className="text-[#dfe2ee] leading-relaxed">{activeExercise.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#334155]/40">
          <button
            onClick={() => shuffleSteps(activeExercise)}
            className="px-3.5 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee] border border-[#334155] flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">shuffle</span>
            <span>{isEn ? 'Shuffle steps' : 'Mélanger les étapes'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={verifyOrder}
              className="px-5 py-2.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold font-mono text-xs hover:brightness-110 shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-base">rule</span>
              <span>{isEn ? 'Verify sequence' : 'Vérifier la séquence'}</span>
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] border border-[#334155] flex items-center gap-1.5 transition-colors"
            >
              <span>{isEn ? 'Next exercise' : 'Exercice suivant'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
