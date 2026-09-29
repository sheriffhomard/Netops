import React, { useState, useEffect } from 'react';
import { ExamQuestion, ViewMode } from '../types';
import { generateFullExamQuestions } from '../data/mockData';
import { SubnetCalculatorModal } from '../components/SubnetCalculatorModal';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

interface ExamSimulatorViewProps {
  onNavigate: (view: ViewMode) => void;
  examCode?: string;
}

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({
  onNavigate,
  examCode = '350-401 ENCOR',
}) => {
  const { user, saveExamResult } = useAuth();
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => generateFullExamQuestions());

  const [currentIndex, setCurrentIndex] = useState<number>(33); // Index 33 corresponds to Question 34
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({
    34: 'A',
  });
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({
    7: true,
    19: true,
    28: true,
  });
  const [scratchpadText, setScratchpadText] = useState<string>(
    '# Brouillon & Masques CIDR\n10.250.0.0/16 -> 255.255.0.0\nForward Address: 172.16.10.5 (Check route in RIB R2)\nFA non-nulle -> doit être intra/inter-area!'
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showSubnetCalc, setShowSubnetCalc] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [hasSavedToFirestore, setHasSavedToFirestore] = useState<boolean>(false);

  // Timer: 1h 24m 11s = 5051 seconds
  const [secondsLeft, setSecondsLeft] = useState<number>(5051);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused || isExamCompleted) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isExamCompleted]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.number]: key,
    }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.number]: !prev[currentQ.number],
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPct = Math.round((answeredCount / questions.length) * 100);

  const handleSubmitExam = () => {
    // Calculate final score
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.number] === q.correctAnswer) {
        correct++;
      }
    });
    // Add realistic scaling to 1000
    const scaledScore = Math.round((correct / questions.length) * 1000);
    setFinalScore(scaledScore);
    setIsExamCompleted(true);
    setShowSubmitModal(false);

    if (user) {
      saveExamResult({
        examCode,
        score: scaledScore,
        maxScore: 1000,
        passingScore: 825,
        passed: scaledScore >= 825,
        durationSeconds: 7200 - secondsLeft,
        totalQuestions: questions.length,
        correctAnswers: correct,
      })
        .then(() => setHasSavedToFirestore(true))
        .catch((err) => console.error('Failed to save exam result to Firestore:', err));
    }

    if (scaledScore >= 825) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0f131c]">
      {/* 1. Top Status Bar */}
      <header className="sticky top-0 z-30 bg-[#181c24]/95 backdrop-blur-md border-b border-[#334155]/50 px-6 py-3 flex flex-wrap items-center justify-between gap-4 select-none">
        {/* Left: Proctor Mode & Title */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00363d] text-[#00e5ff] text-xs font-mono font-semibold border border-[#00e5ff]/30">
            <span className="material-symbols-outlined text-sm">security</span>
            PROCTOR OFFICIEL
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#dfe2ee] truncate">
              Cisco CCNP Enterprise {examCode} (Test #4)
            </span>
            <span className="text-[11px] text-[#bac9cc] font-mono">
              Simulation d&apos;examen officiel • Environnement sous surveillance
            </span>
          </div>
        </div>

        {/* Right: Timer & Tools */}
        <div className="flex items-center gap-3">
          {/* Live Timer Countdown */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm font-bold transition-colors ${
              secondsLeft < 600
                ? 'bg-[#93000a]/40 text-[#ffb4ab] border-[#ffb4ab]'
                : 'bg-[#0a0e16] text-[#c0c1ff] border-[#334155]'
            }`}
          >
            <span className="material-symbols-outlined text-base">timer</span>
            <span>{formatTimer(secondsLeft)}</span>
          </div>

          <button
            onClick={() => setShowSubnetCalc(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] text-xs font-mono border border-[#334155] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">calculate</span>
            <span>Calculateur VLSM</span>
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg bg-[#262a33] text-[#bac9cc] hover:text-[#dfe2ee] hover:bg-[#31353e] border border-[#334155] transition-colors"
            title={isPaused ? 'Reprendre le test' : 'Mettre en pause'}
          >
            <span className="material-symbols-outlined text-lg">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
          </button>

          <button
            onClick={() => alert('Guide officiel du simulateur : Répondez aux questions, naviguez via la palette de droite et soumettez à la fin du temps imparti.')}
            className="p-1.5 rounded-lg bg-[#262a33] text-[#bac9cc] hover:text-[#dfe2ee] hover:bg-[#31353e] border border-[#334155] transition-colors"
            title="Aide & Directives"
          >
            <span className="material-symbols-outlined text-lg">help</span>
          </button>
        </div>
      </header>

      {/* 2. Progress Indicator Bar */}
      <div className="bg-[#1c2028] border-b border-[#334155]/30 px-6 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-[#dfe2ee] font-semibold">
            Question {currentQ.number} / {questions.length}
          </span>
          <span className="text-[#3b494c]">|</span>
          <span className="text-[#00daf3]">
            {answeredCount} répondues ({progressPct}%)
          </span>
        </div>
        <div className="w-48 sm:w-72 bg-[#0a0e16] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#00e5ff] to-[#5be9ad] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Exam Result Overlay if completed */}
      {isExamCompleted ? (
        <div className="p-8 max-w-3xl mx-auto flex flex-col items-center text-center gap-6 my-10 bg-[#181c24] border border-[#334155] rounded-2xl shadow-2xl">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              finalScore >= 825 ? 'bg-[#5be9ad]/20 text-[#5be9ad]' : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
            }`}
          >
            <span className="material-symbols-outlined text-4xl">
              {finalScore >= 825 ? 'verified' : 'cancel'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00daf3]">
              RÉSULTAT OFFICIEL DU TEST SIMULÉ
            </span>
            <h2 className="text-3xl font-bold text-[#dfe2ee]">
              {finalScore >= 825 ? 'FÉLICITATIONS ! EXAMEN RÉUSSI' : 'EXAMEN NON VALIDÉ'}
            </h2>
            <p className="text-sm text-[#bac9cc] max-w-lg">
              {finalScore >= 825
                ? 'Votre niveau d\'assimilation sur les technologies Cisco Enterprise Core est suffisant pour le passage de l\'examen officiel 350-401 ENCOR.'
                : 'Le seuil de validation est fixé à 825/1000 points. Nous vous recommandons de réviser les domaines critiques avant votre prochaine tentative.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full max-w-md bg-[#0a0e16] p-4 rounded-xl border border-[#334155]">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#849396]">VOTRE SCORE</span>
              <span
                className={`text-2xl font-bold font-mono ${
                  finalScore >= 825 ? 'text-[#a8ffd2]' : 'text-[#ffb4ab]'
                }`}
              >
                {finalScore}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#849396]">SEUIL REQUIS</span>
              <span className="text-2xl font-bold font-mono text-[#dfe2ee]">825</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#849396]">STATUT</span>
              <span
                className={`text-2xl font-bold font-mono ${
                  finalScore >= 825 ? 'text-[#5be9ad]' : 'text-[#ffb4ab]'
                }`}
              >
                {finalScore >= 825 ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>

          {hasSavedToFirestore ? (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00363d]/70 border border-[#00e5ff]/40 text-xs font-mono text-[#a8ffd2]">
              <span className="material-symbols-outlined text-base text-[#00e5ff]">cloud_done</span>
              <span>Résultat officiel synchronisé avec votre base Google Firestore</span>
            </div>
          ) : !user ? (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#262a33]/60 border border-[#334155] text-xs font-mono text-[#bac9cc]">
              <span className="material-symbols-outlined text-base text-[#eab308]">cloud_off</span>
              <span>Connectez-vous avec Google pour enregistrer ce résultat en base</span>
            </div>
          ) : null}

          <div className="flex gap-4">

            <button
              onClick={() => setIsExamCompleted(false)}
              className="px-6 py-2.5 rounded-lg bg-[#262a33] text-[#dfe2ee] font-mono text-sm hover:bg-[#31353e] border border-[#334155]"
            >
              Revoir les réponses
            </button>
            <button
              onClick={() => onNavigate('tableau-de-bord')}
              className="px-6 py-2.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold text-sm hover:brightness-110 shadow-lg"
            >
              Retour au Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* 3. Main Split View: Left Question Arena (8 cols), Right Palette (4 cols) */
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 p-6 gap-6 items-start">
          {/* LEFT: Question Arena (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-5">
            {/* Domain category header & flag toggle */}
            <div className="flex items-center justify-between bg-[#181c24] border border-[#334155]/40 px-4 py-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                <span className="text-xs font-mono text-[#00daf3] font-semibold uppercase">
                  {currentQ.domainTitle}
                </span>
              </div>
              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                  flaggedQuestions[currentQ.number]
                    ? 'bg-[#3131c0]/40 text-[#c0c1ff] border-[#c0c1ff]'
                    : 'bg-[#262a33] text-[#bac9cc] border-[#334155] hover:text-[#dfe2ee]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {flaggedQuestions[currentQ.number] ? 'bookmark' : 'bookmark_border'}
                </span>
                <span>
                  {flaggedQuestions[currentQ.number] ? 'Marqué pour révision' : 'Marquer pour révision'}
                </span>
              </button>
            </div>

            {/* Question Text Box */}
            <div className="bg-[#181c24]/90 border border-[#334155]/40 rounded-xl p-6 shadow-xl flex flex-col gap-4">
              <p className="text-base text-[#dfe2ee] leading-relaxed font-sans font-medium">
                {currentQ.statement}
              </p>

              {/* Cisco CLI Output Terminal Display (if question has CLI) */}
              {currentQ.cliSnippet && (
                <div className="bg-[#0a0e16] border border-[#334155] rounded-lg overflow-hidden shadow-inner font-mono text-xs">
                  <div className="bg-[#1c2028] px-3 py-1.5 border-b border-[#334155]/60 flex items-center justify-between text-[#849396]">
                    <span className="flex items-center gap-1.5 text-[#bac9cc]">
                      <span className="material-symbols-outlined text-sm text-[#00e5ff]">terminal</span>
                      {currentQ.cliSnippet.hostname} ({currentQ.cliSnippet.osVersion})
                    </span>
                    <button
                      onClick={() => alert('Sortie CLI copiée dans le presse-papiers')}
                      className="hover:text-[#dfe2ee] transition-colors text-[10px]"
                    >
                      Copier
                    </button>
                  </div>
                  <div className="p-4 text-[#a8ffd2] overflow-x-auto whitespace-pre leading-relaxed">
                    <span className="text-[#00e5ff] font-bold">
                      {currentQ.cliSnippet.hostname} {currentQ.cliSnippet.command}
                    </span>
                    {'\n'}
                    {currentQ.cliSnippet.output}
                  </div>
                </div>
              )}

              {/* Exhibit Réseau SVG Visual Topo (for Question 34) */}
              {currentQ.hasExhibit && (
                <div className="bg-[#0a0e16] border border-[#334155] rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#334155]/40">
                    <span className="text-xs font-mono text-[#00daf3] flex items-center gap-1.5 uppercase font-semibold">
                      <span className="material-symbols-outlined text-sm">account_tree</span>
                      Topologie d&apos;Interconnexion &amp; Adresses de Transfert (Exhibit A)
                    </span>
                    <span className="text-[10px] font-mono text-[#849396]">LSDB SYNC: OSPF PROCESS 1</span>
                  </div>

                  {/* SVG Network Schematic */}
                  <div className="w-full h-56 bg-[#0f131c] rounded-lg relative overflow-hidden border border-[#334155]/30 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 650 220">
                      {/* Area Backgrounds */}
                      <rect x="20" y="20" width="220" height="180" rx="10" fill="#181c24" stroke="#334155" strokeDasharray="4 4" />
                      <text x="35" y="45" fill="#849396" fontSize="12" fontFamily="JetBrains Mono">Area 10 (Campagne)</text>

                      <rect x="280" y="20" width="350" height="180" rx="10" fill="#181c24" stroke="#00e5ff" strokeDasharray="4 4" strokeOpacity="0.4" />
                      <text x="295" y="45" fill="#00e5ff" fontSize="12" fontFamily="JetBrains Mono">Area 0 (Backbone)</text>

                      {/* Connection Lines */}
                      <line x1="120" y1="110" x2="350" y2="110" stroke="#849396" strokeWidth="2" />
                      <line x1="350" y1="110" x2="550" y2="80" stroke="#00e5ff" strokeWidth="2" />
                      <line x1="550" y1="80" x2="550" y2="160" stroke="#5be9ad" strokeWidth="2" strokeDasharray="3 3" />

                      {/* Node R2 */}
                      <g transform="translate(120, 110)">
                        <circle r="22" fill="#262a33" stroke="#00daf3" strokeWidth="2" />
                        <text textAnchor="middle" y="4" fill="#dfe2ee" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">R2</text>
                        <text textAnchor="middle" y="34" fill="#bac9cc" fontSize="9" fontFamily="JetBrains Mono">RID: 10.0.0.2</text>
                      </g>

                      {/* Node ABR-3 */}
                      <g transform="translate(350, 110)">
                        <circle r="22" fill="#262a33" stroke="#c0c1ff" strokeWidth="2" />
                        <text textAnchor="middle" y="4" fill="#dfe2ee" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">ABR-3</text>
                        <text textAnchor="middle" y="34" fill="#bac9cc" fontSize="9" fontFamily="JetBrains Mono">RID: 10.0.0.3</text>
                      </g>

                      {/* Node ASBR */}
                      <g transform="translate(550, 80)">
                        <circle r="22" fill="#262a33" stroke="#5be9ad" strokeWidth="2" />
                        <text textAnchor="middle" y="4" fill="#dfe2ee" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">ASBR</text>
                        <text textAnchor="middle" y="34" fill="#a8ffd2" fontSize="9" fontFamily="JetBrains Mono">192.168.1.1</text>
                      </g>

                      {/* Forward Address Cloud / Subnet */}
                      <g transform="translate(550, 160)">
                        <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#00363d" stroke="#00e5ff" strokeWidth="1" />
                        <text textAnchor="middle" y="4" fill="#00e5ff" fontSize="9" fontFamily="JetBrains Mono">FA: 172.16.10.5</text>
                        <text textAnchor="middle" y="24" fill="#ffb4ab" fontSize="8" fontFamily="JetBrains Mono">External: 10.250.0.0/16</text>
                      </g>

                      {/* Link Badges */}
                      <rect x="210" y="98" width="50" height="18" rx="4" fill="#0a0e16" stroke="#334155" />
                      <text x="235" y="110" textAnchor="middle" fill="#849396" fontSize="9" fontFamily="JetBrains Mono">Gig0/1</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* Question Query Target */}
              <div className="pt-2 font-semibold text-base text-[#c3f5ff] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00e5ff] text-xl">help_outline</span>
                <span>{currentQ.questionQuery}</span>
              </div>

              {/* Multiple Choice Options List */}
              <div className="flex flex-col gap-3 mt-1">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQ.number] === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 select-none ${
                        isSelected
                          ? 'bg-[#00363d]/40 border-[#00e5ff] ring-1 ring-[#00e5ff]/50 shadow-[0_0_12px_rgba(0,229,255,0.15)]'
                          : 'bg-[#1c2028] border-[#334155]/40 hover:border-[#849396] hover:bg-[#262a33]'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#00e5ff] text-[#00363d]'
                            : 'bg-[#262a33] text-[#bac9cc] border border-[#334155]'
                        }`}
                      >
                        {opt.key}
                      </div>
                      <p
                        className={`text-sm leading-snug ${
                          isSelected ? 'text-[#c3f5ff] font-medium' : 'text-[#dfe2ee]'
                        }`}
                      >
                        {opt.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Explanation Toggle & Viewer */}
              <div className="pt-3 border-t border-[#334155]/30 flex flex-col gap-3">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="self-start flex items-center gap-1.5 text-xs font-mono text-[#00daf3] hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">
                    {showExplanation ? 'visibility_off' : 'lightbulb'}
                  </span>
                  <span>
                    {showExplanation
                      ? 'Masquer l\'analyse technique'
                      : 'Afficher l\'explication technique & RFC (Mode Entraînement)'}
                  </span>
                </button>

                {showExplanation && (
                  <div className="bg-[#0a0e16] border border-[#334155] rounded-xl p-4 font-sans text-xs text-[#bac9cc] flex flex-col gap-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-[#a8ffd2] font-mono font-semibold">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      <span>Bonne réponse : Option {currentQ.correctAnswer}</span>
                    </div>
                    <p className="leading-relaxed text-[#dfe2ee]">{currentQ.explanation}</p>
                    <div className="pt-2 text-[10px] font-mono text-[#849396] border-t border-[#334155]/30">
                      RÉFÉRENCE OFFICIELLE : RFC 2328 OSPFv2 Section 16.4 / Cisco Live BRKRST-2337
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* RIGHT: Palette & Scratchpad (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-5 sticky top-20">
            {/* Questions Palette Card */}
            <div className="bg-[#181c24]/95 border border-[#334155] rounded-xl p-5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
                <h3 className="font-semibold text-sm text-[#dfe2ee] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00e5ff] text-lg">grid_view</span>
                  Palette des Questions (102)
                </h3>
                <span className="text-xs font-mono text-[#00daf3]">
                  {answeredCount} / 102
                </span>
              </div>

              {/* Palette Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#bac9cc]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#5be9ad]" />
                  <span>Répondu</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#00e5ff] ring-1 ring-[#00e5ff]" />
                  <span>En cours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#c0c1ff]" />
                  <span>Pour révision</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#262a33]" />
                  <span>Non répondu</span>
                </div>
              </div>

              {/* 102 Questions Scrollable Grid */}
              <div className="max-h-56 overflow-y-auto grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-1.5 p-1 bg-[#0a0e16] rounded-lg border border-[#334155]/40">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = selectedAnswers[q.number] !== undefined;
                  const isFlagged = flaggedQuestions[q.number];

                  let btnStyle = 'bg-[#262a33] text-[#bac9cc] hover:bg-[#31353e]';
                  if (isCurrent) {
                    btnStyle =
                      'bg-[#00e5ff] text-[#00363d] font-bold ring-2 ring-[#00e5ff] shadow-[0_0_8px_#00e5ff]';
                  } else if (isFlagged) {
                    btnStyle = 'bg-[#3131c0] text-[#c0c1ff] font-semibold';
                  } else if (isAnswered) {
                    btnStyle = 'bg-[#006645] text-[#a8ffd2]';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowExplanation(false);
                      }}
                      className={`h-7 rounded text-[11px] font-mono flex items-center justify-center transition-all ${btnStyle}`}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>

              {/* Cadence Telemetry */}
              <div className="bg-[#0a0e16] p-3 rounded-lg border border-[#334155]/30 flex flex-col gap-1 text-[11px] font-mono">
                <div className="flex justify-between text-[#bac9cc]">
                  <span>Cadence moyenne :</span>
                  <span className="text-[#a8ffd2]">~1m 15s / question</span>
                </div>
                <div className="flex justify-between text-[#bac9cc]">
                  <span>Statut de soumission :</span>
                  <span className="text-[#00daf3]">{answeredCount}/102 sauvegardées</span>
                </div>
              </div>
            </div>

            {/* Live Scratchpad / Brouillon */}
            <div className="bg-[#181c24]/95 border border-[#334155] rounded-xl p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#dfe2ee]">
                  <span className="material-symbols-outlined text-sm text-[#c0c1ff]">edit_note</span>
                  <span>Brouillon &amp; Masques CIDR</span>
                </div>
                <button
                  onClick={() => setScratchpadText('')}
                  className="text-[10px] font-mono text-[#849396] hover:text-[#ffb4ab]"
                >
                  Effacer
                </button>
              </div>
              <textarea
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                rows={5}
                placeholder="Zone de calcul rapide de sous-réseaux, tables de routage, notes..."
                className="w-full bg-[#0a0e16] border border-[#334155]/50 rounded-lg p-3 text-xs font-mono text-[#00daf3] focus:border-[#00e5ff] focus:outline-none resize-none"
              />
            </div>
          </aside>
        </div>
      )}

      {/* 4. Bottom Action Bar */}
      <footer className="sticky bottom-0 z-30 bg-[#181c24]/95 backdrop-blur-md border-t border-[#334155]/50 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setShowExplanation(false);
            }
          }}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#262a33] disabled:opacity-40 text-xs font-mono text-[#dfe2ee] hover:bg-[#31353e] transition-colors flex items-center justify-center gap-2 border border-[#334155]"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Question Précédente</span>
        </button>

        <div className="text-[11px] font-mono text-[#849396] text-center hidden md:block">
          Sauvegardé automatiquement à l&apos;instant • Local Storage Sync
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#93000a]/40 hover:bg-[#93000a]/70 text-[#ffb4ab] border border-[#ffb4ab]/40 text-xs font-mono transition-all"
          >
            Terminer &amp; Soumettre
          </button>

          <button
            onClick={() => {
              if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setShowExplanation(false);
              }
            }}
            disabled={currentIndex === questions.length - 1}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold text-xs font-mono hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2"
          >
            <span>Question Suivante</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </footer>

      {/* Subnet Calculator Modal */}
      <SubnetCalculatorModal
        isOpen={showSubnetCalc}
        onClose={() => setShowSubnetCalc(false)}
      />

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-[#0f131c]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#181c24] border border-[#334155] rounded-xl p-6 max-w-md w-full flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center gap-3 text-[#ffb4ab]">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h3 className="font-bold text-lg text-[#dfe2ee]">Confirmer la soumission</h3>
            </div>
            <p className="text-sm text-[#bac9cc]">
              Vous avez répondu à <strong className="text-[#00e5ff]">{answeredCount}</strong> questions sur{' '}
              <strong className="text-[#dfe2ee]">102</strong> ({questions.length - answeredCount} non répondues).
              Êtes-vous sûr de vouloir clore définitivement cette simulation d&apos;examen ?
            </p>
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg bg-[#262a33] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee]"
              >
                Poursuivre le test
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-lg bg-[#ffb4ab] text-[#690005] font-bold text-xs font-mono hover:brightness-110 shadow-lg"
              >
                Clore et Calculer le Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
