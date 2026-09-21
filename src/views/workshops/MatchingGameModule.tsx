import React, { useState, useEffect } from 'react';
import { matchingCategories, MatchingCategory, MatchingPair } from '../../data/workshopsData';
import confetti from 'canvas-confetti';

export const MatchingGameModule: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState<string>('cat-ad');
  const [leftItems, setLeftItems] = useState<{ id: string; text: string }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: string; text: string }[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [attempts, setAttempts] = useState<number>(0);
  const [mismatchPair, setMismatchPair] = useState<{ leftId: string; rightId: string } | null>(
    null
  );
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);

  const activeCategory: MatchingCategory =
    matchingCategories.find((c) => c.id === selectedCatId) || matchingCategories[0];

  // Initialize or reset game on category switch
  useEffect(() => {
    initGame(activeCategory);
  }, [selectedCatId, activeCategory]);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive && matchedIds.size < activeCategory.pairs.length) {
      interval = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, matchedIds.size, activeCategory.pairs.length]);

  const initGame = (cat: MatchingCategory) => {
    const lefts = cat.pairs.map((p) => ({ id: p.id, text: p.left }));
    // Shuffle right items randomly
    const rights = [...cat.pairs]
      .map((p) => ({ id: p.id, text: p.right }))
      .sort(() => Math.random() - 0.5);

    setLeftItems(lefts);
    setRightItems(rights);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds(new Set());
    setAttempts(0);
    setMismatchPair(null);
    setTimerSeconds(0);
    setIsGameActive(true);
  };

  const handleSelectLeft = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedLeft(id);
    setMismatchPair(null);

    // If right was already chosen, check pair
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedRight(id);
    setMismatchPair(null);

    // If left was already chosen, check pair
    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (lId: string, rId: string) => {
    setAttempts((prev) => prev + 1);

    if (lId === rId) {
      // Correct match!
      const newMatched = new Set(matchedIds).add(lId);
      setMatchedIds(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if all are matched
      if (newMatched.size === activeCategory.pairs.length) {
        setIsGameActive(false);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      // Mismatch
      setMismatchPair({ leftId: lId, rightId: rId });
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setMismatchPair(null);
      }, 700);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const accuracy =
    attempts > 0 ? Math.round((matchedIds.size / attempts) * 100) : 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/30">
              JEU D&apos;APPARIEMENT INTERACTIF
            </span>
            <span className="text-xs font-mono text-[#849396]">
              Agilité mentale &amp; réflexes protocolaires
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#dfe2ee]">
            Ateliers d&apos;Appariement &amp; Cartes Jumelées
          </h2>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xs font-mono self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50">
            <span className="material-symbols-outlined text-[#00e5ff] text-base">timer</span>
            <span className="text-[#849396]">Chrono :</span>
            <span className="text-[#00e5ff] font-bold">{formatTime(timerSeconds)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50">
            <span className="material-symbols-outlined text-[#5be9ad] text-base">check</span>
            <span className="text-[#849396]">Score :</span>
            <span className="text-[#a8ffd2] font-bold">
              {matchedIds.size}/{activeCategory.pairs.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/50">
            <span className="text-[#849396]">Précision :</span>
            <span className="text-[#dfe2ee] font-bold">{accuracy}%</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {matchingCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatId(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCatId === cat.id
                ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'bg-[#181c24] text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee] border border-[#334155]/40'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Arena Description */}
      <div className="flex items-center justify-between bg-[#0a0e16] p-4 rounded-xl border border-[#334155]/40 text-xs font-mono">
        <span className="text-[#bac9cc]">{activeCategory.description}</span>
        <button
          onClick={() => initGame(activeCategory)}
          className="text-[#00daf3] hover:underline flex items-center gap-1 ml-3 shrink-0"
        >
          <span className="material-symbols-outlined text-sm">restart_alt</span>
          <span>Recommencer</span>
        </button>
      </div>

      {/* Win State Card */}
      {matchedIds.size === activeCategory.pairs.length && (
        <div className="p-6 rounded-2xl bg-[#003824]/40 border border-[#5be9ad] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5be9ad] text-[#003824] flex items-center justify-center font-bold text-2xl shrink-0">
              🏆
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-base text-[#a8ffd2]">
                Félicitations ! Toutes les paires sont complétées !
              </h3>
              <p className="text-xs font-mono text-[#bac9cc]">
                Temps total : {formatTime(timerSeconds)} • Précision : {accuracy}% en {attempts} tentatives.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const currentIdx = matchingCategories.findIndex((c) => c.id === selectedCatId);
              const nextCat = matchingCategories[(currentIdx + 1) % matchingCategories.length];
              setSelectedCatId(nextCat.id);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#5be9ad] hover:brightness-110 text-[#003824] font-bold font-mono text-xs shadow-lg transition-all"
          >
            Catégorie suivante
          </button>
        </div>
      )}

      {/* Dual Column Matching Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column (Items/Concepts) */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-mono text-[#849396] uppercase px-1 pb-1 flex items-center justify-between">
            <span>COLONNE A : CONCEPTS / PROTOCOLES</span>
            <span>CLIQUEZ POUR SÉLECTIONNER</span>
          </div>

          {leftItems.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeft === item.id;
            const isMismatch = mismatchPair?.leftId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSelectLeft(item.id)}
                className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all select-none flex items-center justify-between ${
                  isMatched
                    ? 'bg-[#003824]/30 border-[#5be9ad]/60 text-[#5be9ad] cursor-default opacity-80'
                    : isMismatch
                    ? 'bg-[#93000a]/40 border-[#ffb4ab] text-[#ffb4ab] animate-shake'
                    : isSelected
                    ? 'bg-[#00363d] border-[#00e5ff] text-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.3)] scale-[1.01]'
                    : 'bg-[#181c24] border-[#334155]/60 text-[#dfe2ee] hover:bg-[#262a33] hover:border-[#00e5ff]/50'
                }`}
              >
                <span>{item.text}</span>
                <span className="material-symbols-outlined text-base">
                  {isMatched ? 'check_circle' : isSelected ? 'arrow_forward' : 'radio_button_unchecked'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column (Values / Ports / ADs) */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-mono text-[#849396] uppercase px-1 pb-1 flex items-center justify-between">
            <span>COLONNE B : VALEURS / DÉFINITIONS</span>
            <span>CORRESPONDANCE CIBLE</span>
          </div>

          {rightItems.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedRight === item.id;
            const isMismatch = mismatchPair?.rightId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSelectRight(item.id)}
                className={`p-4 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all select-none flex items-center justify-between ${
                  isMatched
                    ? 'bg-[#003824]/30 border-[#5be9ad]/60 text-[#5be9ad] cursor-default opacity-80'
                    : isMismatch
                    ? 'bg-[#93000a]/40 border-[#ffb4ab] text-[#ffb4ab] animate-shake'
                    : isSelected
                    ? 'bg-[#00363d] border-[#00e5ff] text-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.3)] scale-[1.01]'
                    : 'bg-[#181c24] border-[#334155]/60 text-[#dfe2ee] hover:bg-[#262a33] hover:border-[#00e5ff]/50'
                }`}
              >
                <span>{item.text}</span>
                <span className="material-symbols-outlined text-base">
                  {isMatched ? 'check_circle' : isSelected ? 'arrow_back' : 'radio_button_unchecked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
