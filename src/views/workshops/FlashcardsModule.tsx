import React, { useState } from 'react';
import { initialFlashcards, Flashcard } from '../../data/workshopsData';

interface FlashcardsModuleProps {
  onOpenDedicated?: () => void;
}

export const FlashcardsModule: React.FC<FlashcardsModuleProps> = ({ onOpenDedicated }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('CCNA-D1');
  const [cards, setCards] = useState<Flashcard[]>(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());

  const filterOptions = [
    { id: 'all', label: 'Toutes les cartes', count: cards.length },
    {
      id: 'CCNA-D1',
      label: 'Cisco CCNA-D1 (Fundamentals)',
      count: cards.filter((c) => c.moduleCode === 'CCNA-D1').length,
      isSpecial: true,
    },
    {
      id: 'CCNA-D2',
      label: 'Cisco CCNA-D2 (Network Access)',
      count: cards.filter((c) => c.moduleCode === 'CCNA-D2').length,
      isSpecial: true,
    },
    {
      id: 'CCNA-D3',
      label: 'Cisco CCNA-D3 (IP Connectivity)',
      count: cards.filter((c) => c.moduleCode === 'CCNA-D3').length,
      isSpecial: true,
    },
    {
      id: 'CCNA-D4',
      label: 'Cisco CCNA-D4 (IP Services)',
      count: cards.filter((c) => c.moduleCode === 'CCNA-D4').length,
      isSpecial: true,
    },
    {
      id: 'CCNA-D5',
      label: 'Cisco CCNA-D5 (Security)',
      count: cards.filter((c) => c.moduleCode === 'CCNA-D5').length,
      isSpecial: true,
    },
    {
      id: 'CCNA-D6',
      label: 'Cisco CCNA-D6 (Automation)',
      count: cards.filter((c) => c.moduleCode === 'CCNA-D6').length,
      isSpecial: true,
    },
    {
      id: 'ENCOR-D1',
      label: 'Cisco ENCOR-D1 (Architecture)',
      count: cards.filter((c) => c.moduleCode === 'ENCOR-D1').length,
      isSpecial: true,
    },
    {
      id: 'ENCOR-D2',
      label: 'Cisco ENCOR-D2 (Virtualization & SD-WAN)',
      count: cards.filter((c) => c.moduleCode === 'ENCOR-D2').length,
      isSpecial: true,
    },
    {
      id: 'ENCOR-D3',
      label: 'Cisco ENCOR-D3 (Infrastructure & Wireless)',
      count: cards.filter((c) => c.moduleCode === 'ENCOR-D3').length,
      isSpecial: true,
    },
    {
      id: 'ENCOR-D4',
      label: 'Cisco ENCOR-D4 (Network Assurance)',
      count: cards.filter((c) => c.moduleCode === 'ENCOR-D4').length,
      isSpecial: true,
    },
    {
      id: 'ENCOR-D5',
      label: 'Cisco ENCOR-D5 (Security & AAA)',
      count: cards.filter((c) => c.moduleCode === 'ENCOR-D5').length,
      isSpecial: true,
    },
    {
      id: 'ENCOR-D6',
      label: 'Cisco ENCOR-D6 (Automation & Programmability)',
      count: cards.filter((c) => c.moduleCode === 'ENCOR-D6').length,
      isSpecial: true,
    },
    {
      id: 'ENARSI-D1',
      label: 'Cisco ENARSI-D1 (Advanced Routing)',
      count: cards.filter((c) => c.moduleCode === 'ENARSI-D1').length,
      isSpecial: true,
    },
    {
      id: 'ENARSI-D2',
      label: 'Cisco ENARSI-D2 (VPN Technologies)',
      count: cards.filter((c) => c.moduleCode === 'ENARSI-D2').length,
      isSpecial: true,
    },
    {
      id: 'ENARSI-D3',
      label: 'Cisco ENARSI-D3 (Infrastructure Security)',
      count: cards.filter((c) => c.moduleCode === 'ENARSI-D3').length,
      isSpecial: true,
    },
    {
      id: 'ENARSI-D4',
      label: 'Cisco ENARSI-D4 (Infrastructure Services)',
      count: cards.filter((c) => c.moduleCode === 'ENARSI-D4').length,
      isSpecial: true,
    },
    {
      id: 'SCOR-D1',
      label: 'Cisco SCOR-D1 (Security Concepts & Threats)',
      count: cards.filter((c) => c.moduleCode === 'SCOR-D1').length,
      isSpecial: true,
    },
    {
      id: 'SCOR-D2',
      label: 'Cisco SCOR-D2 (Network Security & Firewalls)',
      count: cards.filter((c) => c.moduleCode === 'SCOR-D2').length,
      isSpecial: true,
    },
    {
      id: 'SCOR-D3',
      label: 'Cisco SCOR-D3 (Securing the Cloud & SaaS)',
      count: cards.filter((c) => c.moduleCode === 'SCOR-D3').length,
      isSpecial: true,
    },
    {
      id: 'OSPF & BGP',
      label: 'OSPF & BGP',
      count: cards.filter((c) => c.category === 'OSPF & BGP').length,
    },
    {
      id: 'VLAN & Commutation',
      label: 'VLAN & Commutation',
      count: cards.filter((c) => c.category === 'VLAN & Commutation').length,
    },
    {
      id: 'Sécurité & Crypto',
      label: 'Sécurité & Crypto',
      count: cards.filter((c) => c.category === 'Sécurité & Crypto').length,
    },
    {
      id: 'Ports & RFC',
      label: 'Ports & RFC',
      count: cards.filter((c) => c.category === 'Ports & RFC').length,
    },
    {
      id: 'Automatisation & Cloud',
      label: 'Automatisation & Cloud',
      count: cards.filter((c) => c.category === 'Automatisation & Cloud').length,
    },
  ];

  const filteredCards = cards.filter((c) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter.startsWith('CCNA-') || selectedFilter.startsWith('ENCOR-') || selectedFilter.startsWith('ENARSI-')) {
      return c.moduleCode === selectedFilter;
    }
    return c.category === selectedFilter;
  });

  const activeCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleRate = (rating: 'review' | 'good' | 'mastered') => {
    if (!activeCard) return;
    if (rating === 'mastered') {
      setMasteredIds((prev) => new Set(prev).add(activeCard.id));
      setReviewIds((prev) => {
        const next = new Set(prev);
        next.delete(activeCard.id);
        return next;
      });
    } else if (rating === 'review') {
      setReviewIds((prev) => new Set(prev).add(activeCard.id));
      setMasteredIds((prev) => {
        const next = new Set(prev);
        next.delete(activeCard.id);
        return next;
      });
    }
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  const handleReset = () => {
    setCards(initialFlashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setMasteredIds(new Set());
    setReviewIds(new Set());
  };

  if (!activeCard) {
    return (
      <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-8 text-center text-[#bac9cc]">
        Aucune flashcard dans cette catégorie.
      </div>
    );
  }

  const isMastered = masteredIds.has(activeCard.id);
  const isReview = reviewIds.has(activeCard.id);

  return (
    <div className="flex flex-col gap-6">
      {/* Category Pills & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#334155]/40">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setSelectedFilter(opt.id);
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedFilter === opt.id
                  ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                  : opt.isSpecial
                  ? 'bg-[#00363d]/50 text-[#00e5ff] hover:bg-[#00363d] border border-[#00e5ff]/40 font-semibold'
                  : 'bg-[#181c24] text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee] border border-[#334155]/40'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  selectedFilter === opt.id
                    ? 'bg-[#00363d] text-[#00e5ff]'
                    : 'bg-[#0a0e16] text-[#849396]'
                }`}
              >
                {opt.count}
              </span>
            </button>
          ))}
        </div>

        {/* Global Stats Counter */}
        <div className="flex items-center gap-3 text-xs font-mono self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a0e16] border border-[#334155]/50">
            <span className="w-2 h-2 rounded-full bg-[#5be9ad]" />
            <span className="text-[#849396]">Maîtrisées :</span>
            <span className="text-[#a8ffd2] font-bold">{masteredIds.size}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a0e16] border border-[#334155]/50">
            <span className="w-2 h-2 rounded-full bg-[#ffb4ab]" />
            <span className="text-[#849396]">À revoir :</span>
            <span className="text-[#ffb4ab] font-bold">{reviewIds.size}</span>
          </div>
          {onOpenDedicated && (
            <button
              onClick={onOpenDedicated}
              className="px-3 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold hover:brightness-110 transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
              title="Ouvrir l'écran dédié plein format avec Chrono-Blitz et créateur de cartes"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              <span>Écran Dédié</span>
            </button>
          )}
          <button
            onClick={handleShuffle}
            title="Mélanger le paquet"
            className="p-1.5 rounded-lg bg-[#262a33] text-[#00daf3] hover:bg-[#31353e] transition-colors"
          >
            <span className="material-symbols-outlined text-base">shuffle</span>
          </button>
          <button
            onClick={handleReset}
            title="Réinitialiser"
            className="p-1.5 rounded-lg bg-[#262a33] text-[#849396] hover:text-[#dfe2ee] hover:bg-[#31353e] transition-colors"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
          </button>
        </div>
      </div>

      {/* Card Progress Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-[#849396]">
        <span>
          CARTE {currentIndex + 1} SUR {filteredCards.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] border border-[#334155]/60">
            {activeCard.difficulty}
          </span>
          {isMastered && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#003824] text-[#5be9ad] border border-[#5be9ad]/40">
              ✓ MAÎTRISÉE
            </span>
          )}
          {isReview && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/40">
              ⚠ À REVOIR
            </span>
          )}
        </div>
      </div>

      <div className="w-full bg-[#0a0e16] h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#00daf3] to-[#00e5ff] h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard Main Flip Arena */}
      <div className="flex flex-col items-center justify-center">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-2xl min-h-[340px] p-8 rounded-2xl border transition-all duration-500 cursor-pointer select-none flex flex-col justify-between shadow-2xl relative group ${
            isFlipped
              ? 'bg-[#1c2433] border-[#00e5ff] shadow-[0_0_24px_rgba(0,229,255,0.2)]'
              : 'bg-[#181c24] border-[#334155] hover:border-[#00e5ff]/60 hover:shadow-[0_0_16px_rgba(0,229,255,0.15)]'
          }`}
        >
          {/* Card Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]/40">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="material-symbols-outlined text-[#00e5ff] text-xl">
                {isFlipped ? 'check_circle' : 'help'}
              </span>
              {activeCard.moduleCode && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/50">
                  {activeCard.moduleCode}
                </span>
              )}
              <span className="text-xs font-mono font-semibold text-[#00daf3] uppercase tracking-wider">
                {isFlipped ? 'RÉPONSE & JUSTIFICATION RFC' : `QUESTION • ${activeCard.category}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {activeCard.rfcRef && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0e16] text-[#a8ffd2] border border-[#334155]/40">
                  {activeCard.rfcRef}
                </span>
              )}
              <span className="text-xs font-mono text-[#849396] group-hover:text-[#00e5ff] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">cached</span>
                <span>{isFlipped ? 'Voir question' : 'Retourner'}</span>
              </span>
            </div>
          </div>

          {/* Card Body Content */}
          <div className="flex-1 flex flex-col justify-center py-6">
            {!isFlipped ? (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#dfe2ee] leading-snug">
                  {activeCard.frontTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                  {activeCard.frontPrompt}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold text-[#00e5ff]">{activeCard.backTitle}</h3>
                <div className="text-sm text-[#dfe2ee] whitespace-pre-line leading-relaxed">
                  {activeCard.backContent}
                </div>
                {activeCard.cliExample && (
                  <div className="bg-[#0a0e16] p-3 rounded-lg border border-[#334155]/60 font-mono text-xs text-[#a8ffd2] whitespace-pre">
                    {activeCard.cliExample}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Bottom Hint / Status */}
          <div className="pt-4 border-t border-[#334155]/40 flex items-center justify-between text-xs font-mono text-[#849396]">
            {!isFlipped ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHint(!showHint);
                  }}
                  className="flex items-center gap-1 text-[#00daf3] hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  <span>{showHint ? 'Masquer l\'indice' : 'Afficher un indice'}</span>
                </button>
                {showHint && (
                  <span className="text-[#a8ffd2] italic animate-in fade-in">
                    {activeCard.hint}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[#849396] text-[11px]">
                Évaluez votre niveau de maîtrise pour ajuster la répétition espacée.
              </span>
            )}
            <span className="text-[10px] text-[#849396]">Cliquez n&apos;importe où pour retourner</span>
          </div>
        </div>

        {/* Rating Controls when Flipped */}
        {isFlipped && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 animate-in slide-in-from-bottom-2 duration-300">
            <button
              onClick={() => handleRate('review')}
              className="px-5 py-2.5 rounded-xl bg-[#93000a]/30 hover:bg-[#93000a]/50 text-[#ffb4ab] border border-[#ffb4ab]/40 text-xs font-mono font-semibold flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-base">replay</span>
              <span>À revoir (Difficile)</span>
            </button>
            <button
              onClick={() => handleRate('good')}
              className="px-5 py-2.5 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] border border-[#334155] text-xs font-mono font-semibold flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-base">done</span>
              <span>Correct (Normal)</span>
            </button>
            <button
              onClick={() => handleRate('mastered')}
              className="px-5 py-2.5 rounded-xl bg-[#003824] hover:bg-[#003824]/80 text-[#5be9ad] border border-[#5be9ad]/50 text-xs font-mono font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Maîtrisé (Facile)</span>
            </button>
          </div>
        )}

        {/* Previous & Next Navigation Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee] border border-[#334155]/50 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Précédente</span>
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-4 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] border border-[#334155] transition-colors"
          >
            {isFlipped ? 'Voir la question' : 'Révéler la réponse'}
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee] border border-[#334155]/50 flex items-center gap-1.5 transition-colors"
          >
            <span>Suivante</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
