import React, { useState } from 'react';

interface FlashcardData {
  cert: string;
  domain: string;
  question: string;
  optionsHint: string;
  answer: string;
  rfc: string;
  explanation: string;
  cliSyntax: string;
}

const DEMO_CARDS: FlashcardData[] = [
  {
    cert: 'Cisco CCNP ENCOR 350-401',
    domain: 'Routing & OSPF',
    question: 'Quelle est la différence fondamentale entre un LSA Type 3 (Summary LSA) et un LSA Type 5 (AS External LSA) sous OSPF ?',
    optionsHint: 'Cliquez pour afficher la réponse et les références RFC officielles.',
    answer: 'LSA Type 3 : généré par un ABR pour annoncer des réseaux inter-zones (Inter-Area). LSA Type 5 : généré par un ASBR pour redistribuer des routes externes vers tout le domaine OSPF.',
    rfc: 'RFC 2328 Section 4.3 (OSPF Version 2)',
    explanation: 'Le LSA 3 est injecté par les Routeurs de Bordure de Zone (ABR) et flooding limité à la zone concernée. Le LSA 5 inonde toutes les zones régulières (non-stub).',
    cliSyntax: 'Router# show ip ospf database summary\nRouter# show ip ospf database external',
  },
  {
    cert: 'BGP Enterprise Core',
    domain: 'Path Selection Protocol',
    question: 'Quel est l\'ordre exact d\'évaluation des trois premiers attributs de sélection du meilleur chemin BGP (BGP Best Path Algorithm) ?',
    optionsHint: 'Cliquez pour examiner la règle mnémotechnique Weight / Local Pref / Local Originated.',
    answer: '1. Weight (propriétaire Cisco, plus élevé préféré)\n2. Local Preference (standard RFC, plus élevé préféré)\n3. Local Route Origination (network / aggregate > redistribute)',
    rfc: 'RFC 4271 (BGP-4 Specification)',
    explanation: 'Le poids (Weight) n\'est jamais transmis aux voisins BGP. La Local Preference est propagée à l\'ensemble de l\'AS en iBGP pour orienter le trafic sortant.',
    cliSyntax: 'router bgp 65001\n neighbor 10.1.1.2 weight 500\n neighbor 10.1.1.2 route-map SET-LP in',
  },
];

export const InteractiveFlashcardDemo: React.FC = () => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentBox, setCurrentBox] = useState<number>(3);

  const card = DEMO_CARDS[cardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % DEMO_CARDS.length);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0a0e16]/95 border border-[#334155]/60 p-5 sm:p-6 backdrop-blur-xl shadow-2xl font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#334155]/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00e5ff] text-base">style</span>
          <span className="font-mono font-semibold text-[#dfe2ee]">
            Algorithme SRS Leitner (5 Boîtes)
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#849396]">
          <span>Boîte active :</span>
          <span className="px-2 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff] font-bold">
            Boîte {currentBox} / 5 (Rév. dans {currentBox * 2} jours)
          </span>
        </div>
      </div>

      {/* 3D Flashcard Flip Card */}
      <div
        className="relative w-full min-h-[260px] cursor-pointer perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`w-full min-h-[260px] rounded-xl p-5 sm:p-6 transition-all duration-500 border flex flex-col justify-between ${
            isFlipped
              ? 'bg-[#0e1626] border-[#00e5ff]/60 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
              : 'bg-[#0f131c] border-[#334155] hover:border-[#00e5ff]/50'
          }`}
        >
          {/* Card Top Details */}
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#849396] mb-3">
              <span className="font-mono text-[#00e5ff]">{card.cert}</span>
              <span className="font-mono">{card.domain}</span>
            </div>

            {/* Question (Front) or Answer (Back) */}
            {!isFlipped ? (
              <div>
                <span className="text-[11px] font-mono text-[#849396] uppercase tracking-wider block mb-1">
                  Question d'évaluation
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#dfe2ee] leading-relaxed">
                  {card.question}
                </p>
                <p className="mt-4 text-xs text-[#849396] italic">
                  {card.optionsHint}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-mono text-[#10b981] uppercase tracking-wider block mb-1">
                  Réponse Validée &amp; Standard RFC
                </span>
                <pre className="text-xs sm:text-sm font-sans font-medium text-[#c3f5ff] whitespace-pre-wrap leading-relaxed">
                  {card.answer}
                </pre>
                <div className="mt-3 p-2.5 rounded bg-[#070a10] border border-[#334155]/40 text-xs font-mono text-[#bac9cc]">
                  <div className="text-[10px] text-[#849396] uppercase">{card.rfc}</div>
                  <div className="mt-1 text-[#00e5ff]">{card.cliSyntax}</div>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer Action */}
          <div className="pt-4 mt-4 border-t border-[#334155]/30 flex items-center justify-between text-xs text-[#849396]">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="material-symbols-outlined text-sm text-[#00e5ff]">
                {isFlipped ? 'flip' : 'touch_app'}
              </span>
              {isFlipped ? 'Cliquez pour retourner le recto' : 'Cliquer pour révéler le verso'}
            </span>

            <span className="text-[10px] font-mono text-[#00e5ff]">
              Fiche {cardIndex + 1} / {DEMO_CARDS.length}
            </span>
          </div>
        </div>
      </div>

      {/* SRS Feedback Buttons (Leitner Promotion / Demotion) */}
      <div className="mt-4 pt-3 border-t border-[#334155]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-[#849396] text-[11px] mr-1">Répétition Leitner :</span>
          <button
            type="button"
            onClick={() => setCurrentBox(1)}
            className="px-2.5 py-1 rounded bg-[#ef4444]/20 text-[#ef4444] hover:bg-[#ef4444]/30 border border-[#ef4444]/40 font-mono cursor-pointer"
            title="Réinitialiser en Boîte 1"
          >
            À revoir (J+1)
          </button>
          <button
            type="button"
            onClick={() => setCurrentBox((prev) => Math.min(5, prev + 1))}
            className="px-2.5 py-1 rounded bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30 border border-[#10b981]/40 font-mono cursor-pointer"
            title="Promouvoir en boîte supérieure"
          >
            Maîtrisé (J+{Math.min(5, currentBox + 1) * 2})
          </button>
        </div>

        <button
          type="button"
          onClick={handleNextCard}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-[#00e5ff] border border-[#334155]/60 font-mono cursor-pointer"
        >
          <span>Fiche suivante</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
