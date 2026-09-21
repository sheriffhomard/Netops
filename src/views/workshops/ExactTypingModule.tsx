import React, { useState } from 'react';
import { initialExactChallenges, ExactTypingChallenge } from '../../data/workshopsData';
import confetti from 'canvas-confetti';

export const ExactTypingModule: React.FC = () => {
  const [challenges] = useState<ExactTypingChallenge[]>(initialExactChallenges);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputCommand, setInputCommand] = useState<string>('');
  const [evalResult, setEvalResult] = useState<{
    status: 'idle' | 'success' | 'abbr_success' | 'error';
    message: string;
    details?: string;
  }>({ status: 'idle', message: '' });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [validatedCount, setValidatedCount] = useState<number>(0);

  const activeChallenge = challenges[currentIndex] || challenges[0];

  const verifySyntax = (input: string) => {
    const raw = input.trim();
    if (!raw) {
      setEvalResult({
        status: 'error',
        message: 'Veuillez saisir une commande IOS valide.',
      });
      return;
    }

    // Normalized string with single spaces
    const normalized = raw.replace(/\s+/g, ' ').toLowerCase();
    const canonicalLower = activeChallenge.canonicalCommand.toLowerCase().replace(/\s+/g, ' ');

    // 1. Exact canonical match
    if (normalized === canonicalLower) {
      setEvalResult({
        status: 'success',
        message: '✓ Syntaxe Canonique Validée à 100% !',
        details: `Commande exacte exécutée sur ${activeChallenge.devicePrompt}`,
      });
      handleSuccess();
      return;
    }

    // 2. Tolerant matching via accepted regex patterns (standard Cisco abbreviations)
    const isPatternMatched = activeChallenge.acceptedPatterns.some((pattern) =>
      pattern.test(raw)
    );

    if (isPatternMatched) {
      setEvalResult({
        status: 'abbr_success',
        message: '✓ Commande Acceptée (Abréviation IOS Reconnue)',
        details: `Forme canonique recommandée : "${activeChallenge.canonicalCommand}"`,
      });
      handleSuccess();
      return;
    }

    // 3. Syntax error with domain-specific assistance
    let hintMessage = 'Erreur de syntaxe Cisco IOS.';
    if (activeChallenge.id === 'drill-1' && !raw.includes('allowed')) {
      hintMessage = 'Attention : N\'oubliez pas le mot-clé "allowed" (ex: switchport trunk allowed vlan...).';
    } else if (activeChallenge.id === 'drill-2' && raw.includes('255.255.255.0')) {
      hintMessage = 'Attention : OSPF exige un masque inversé (Wildcard mask 0.0.0.255) et non le masque de sous-réseau !';
    } else if (activeChallenge.id === 'drill-3' && !raw.includes('0.0.0.0 0.0.0.0')) {
      hintMessage = 'Une route par défaut s\'écrit avec le préfixe et masque universels : 0.0.0.0 0.0.0.0.';
    } else if (activeChallenge.id === 'drill-4' && !raw.includes('maximum') && !raw.includes('max')) {
      hintMessage = 'Précisez le mot-clé "maximum" ou "max" suivi de la valeur numérique.';
    }

    setEvalResult({
      status: 'error',
      message: hintMessage,
      details: 'Vérifiez la concordance des mots-clés, des espaces et des identifiants.',
    });
    setStreak(0);
  };

  const handleSuccess = () => {
    setStreak((prev) => prev + 1);
    setValidatedCount((prev) => prev + 1);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handleNextChallenge = () => {
    setInputCommand('');
    setEvalResult({ status: 'idle', message: '' });
    setShowHint(false);
    setShowSolution(false);
    setCurrentIndex((prev) => (prev + 1) % challenges.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifySyntax(inputCommand);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header telemetry and challenge selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/30">
              AUCUN QCM • SAISIE MANUELLE EXACTE
            </span>
            <span className="text-xs font-mono text-[#849396]">
              Tolérance intelligente syntaxique IOS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#dfe2ee]">
            Module Saisie Exacte de Ligne de Commande
          </h2>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50">
            <span className="material-symbols-outlined text-[#00e5ff] text-base">
              local_fire_department
            </span>
            <span className="text-[#849396]">Série active :</span>
            <span className="text-[#00e5ff] font-bold">{streak} d&apos;affilée</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50">
            <span className="material-symbols-outlined text-[#5be9ad] text-base">verified</span>
            <span className="text-[#849396]">Réussis :</span>
            <span className="text-[#a8ffd2] font-bold">
              {validatedCount}/{challenges.length}
            </span>
          </div>
        </div>
      </div>

      {/* Challenge Navigator Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {challenges.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              setCurrentIndex(idx);
              setInputCommand('');
              setEvalResult({ status: 'idle', message: '' });
              setShowHint(false);
              setShowSolution(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
              currentIndex === idx
                ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'bg-[#181c24] text-[#bac9cc] hover:bg-[#262a33] border border-[#334155]/40'
            }`}
          >
            <span>Défi #{idx + 1}</span>
            <span className="text-[10px] opacity-75">({c.domain.split(' ')[0]})</span>
          </button>
        ))}
      </div>

      {/* Challenge Card Container */}
      <div className="bg-[#181c24] border border-[#334155] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
        {/* Challenge Specs */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#262a33] text-[#00daf3] border border-[#334155]/60">
              {activeChallenge.domain}
            </span>
            <span className="text-xs font-mono text-[#849396]">{activeChallenge.rfcOrDoc}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#dfe2ee]">
            {activeChallenge.title}
          </h3>
          <p className="text-sm text-[#bac9cc] leading-relaxed bg-[#0a0e16] p-4 rounded-xl border border-[#334155]/40">
            {activeChallenge.taskDescription}
          </p>
        </div>

        {/* Authentic Cisco Terminal Prompt Box */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-[#849396] uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5be9ad]" />
            Invite de commande active (CLI Simulation) :
          </label>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-[#0a0e16] border border-[#334155] focus-within:border-[#00e5ff] focus-within:ring-1 focus-within:ring-[#00e5ff] rounded-xl px-4 py-3 shadow-inner transition-all"
          >
            <span className="font-mono text-sm text-[#00e5ff] font-bold shrink-0 select-none">
              {activeChallenge.devicePrompt}
            </span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="Saisissez la commande IOS exacte (ou abréviation reconnue)..."
              autoFocus
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-[#a8ffd2] placeholder:text-[#849396]/60 focus:ring-0"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold text-xs font-mono hover:brightness-110 shadow-sm shrink-0 transition-all"
            >
              Vérifier (Entrée)
            </button>
          </form>
        </div>

        {/* Real-time Syntax Feedback Area */}
        {evalResult.status !== 'idle' && (
          <div
            className={`p-4 rounded-xl border flex flex-col gap-1.5 animate-in fade-in duration-200 ${
              evalResult.status === 'success'
                ? 'bg-[#003824]/30 border-[#5be9ad]/60 text-[#a8ffd2]'
                : evalResult.status === 'abbr_success'
                ? 'bg-[#00363d]/40 border-[#00e5ff]/60 text-[#c3f5ff]'
                : 'bg-[#93000a]/20 border-[#ffb4ab]/50 text-[#ffb4ab]'
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-sm font-bold">
              <span className="material-symbols-outlined text-lg">
                {evalResult.status === 'error' ? 'error' : 'verified'}
              </span>
              <span>{evalResult.message}</span>
            </div>
            {evalResult.details && (
              <p className="text-xs font-mono text-[#bac9cc] pl-6">{evalResult.details}</p>
            )}
          </div>
        )}

        {/* Actions, Hints and Canon Solution */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#334155]/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] border border-[#334155] flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              <span>{showHint ? 'Masquer l\'indice' : 'Indice syntaxique'}</span>
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-3 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee] border border-[#334155] flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>{showSolution ? 'Masquer la solution' : 'Solution canonique'}</span>
            </button>
          </div>

          <button
            onClick={handleNextChallenge}
            className="px-4 py-2 rounded-lg bg-[#00363d] hover:bg-[#00363d]/80 text-[#00e5ff] text-xs font-mono font-semibold border border-[#00e5ff]/40 flex items-center gap-1.5 transition-all self-end"
          >
            <span>Défi suivant</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Hint Accordion */}
        {showHint && (
          <div className="bg-[#0a0e16] p-4 rounded-xl border border-[#00daf3]/40 text-xs font-mono text-[#00daf3] flex items-start gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-base shrink-0">info</span>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Indice de commande :</span>
              <p className="text-[#dfe2ee]">{activeChallenge.hint}</p>
            </div>
          </div>
        )}

        {/* Solution Accordion */}
        {showSolution && (
          <div className="bg-[#0a0e16] p-4 rounded-xl border border-[#5be9ad]/40 text-xs font-mono text-[#a8ffd2] flex items-start gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-base shrink-0">check_circle</span>
            <div className="flex flex-col gap-1.5">
              <span className="font-bold">Syntaxe officielle attendue (Cisco Reference) :</span>
              <code className="bg-[#181c24] px-3 py-1.5 rounded border border-[#334155] text-sm text-[#00e5ff]">
                {activeChallenge.canonicalCommand}
              </code>
              <p className="text-[#bac9cc] text-[11px] mt-1">{activeChallenge.syntaxNotes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
