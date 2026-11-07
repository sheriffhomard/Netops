import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '../types';
import { bankQuestionsFr, bankQuestionsEn } from '../data/mockData';

interface QuestionBankViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCert?: (code: string) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation(['common', 'exams', 'navigation']);
  const isEn = i18n.language?.startsWith('en');
  const [search, setSearch] = useState('');
  const [selectedCert, setSelectedCert] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const bankQuestions = isEn ? bankQuestionsEn : bankQuestionsFr;

  const filtered = bankQuestions.filter((q) => {
    const matchSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.statement.toLowerCase().includes(search.toLowerCase()) ||
      q.domain.toLowerCase().includes(search.toLowerCase());
    const matchCert = selectedCert === 'all' || q.cert.includes(selectedCert);
    const matchDomain = selectedDomain === 'all' || q.domain === selectedDomain;
    return matchSearch && matchCert && matchDomain;
  });

  const activeQ = bankQuestions.find((q) => q.id === activeQuestionId) || bankQuestions[0];

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-6 pb-20 lg:pb-8 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#334155]/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">database</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00daf3]">
              {isEn ? 'ITEM BANK & EXPLANATIONS' : 'ITEM BANK & FLASHCARDS'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ee]">
            {isEn ? 'Network & Cyber Question Bank' : 'Banque de Questions Réseau & Cybersécurité'}
          </h1>
          <p className="text-sm text-[#bac9cc]">
            {isEn
              ? 'Explore 14,280 questions indexed by RFC, vendor and official blueprints with in-depth technical justifications.'
              : 'Explorez 14 280 questions indexées par RFC, vendor et blueprint officiel avec explications détaillées.'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('simulateur-d-examen')}
          className="px-5 py-2.5 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold text-sm hover:brightness-110 shadow-lg flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          <span>{isEn ? 'Launch Mock Exam' : 'Lancer un Mock Exam'}</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#849396] text-xl">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isEn
                ? 'Search a question, RFC keyword, protocol (OSPF, BGP, VLAN)...'
                : 'Rechercher une question, mot-clé RFC, protocole (OSPF, BGP, VLAN)...'
            }
            className="w-full bg-[#181c24] border border-[#334155]/50 rounded-lg pl-11 pr-4 py-2 text-sm text-[#dfe2ee] placeholder:text-[#849396] focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <select
          value={selectedCert}
          onChange={(e) => setSelectedCert(e.target.value)}
          className="w-full sm:w-56 bg-[#181c24] border border-[#334155]/50 rounded-lg px-3 py-2 text-sm text-[#dfe2ee] focus:outline-none"
        >
          <option value="all">{isEn ? 'All Certifications' : 'Toutes les certifications'}</option>
          <option value="ENCOR">Cisco CCNP ENCOR</option>
          <option value="CCNA">Cisco CCNA 200-301</option>
          <option value="PCNSE">Palo Alto PCNSE</option>
          <option value="Security+">CompTIA Security+</option>
        </select>
      </div>

      {/* Split List & Question Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Questions List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filtered.map((q) => {
            const isActive = q.id === activeQ.id;
            return (
              <div
                key={q.id}
                onClick={() => {
                  setActiveQuestionId(q.id);
                  setShowAnswer(false);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                  isActive
                    ? 'bg-[#181c24] border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'bg-[#181c24]/80 border-[#334155]/40 hover:bg-[#181c24]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3]">
                    {q.cert}
                  </span>
                  <span className="text-[10px] font-mono text-[#849396]">{q.rfc}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#dfe2ee]">{q.title}</h4>
                <p className="text-xs text-[#bac9cc] line-clamp-2">{q.statement}</p>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Question Inspector / Explanation (7 cols) */}
        <div className="lg:col-span-7 bg-[#181c24] border border-[#334155] rounded-xl p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#334155]/40">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#00363d] text-[#00e5ff] text-xs font-mono font-bold">
                {activeQ.cert}
              </span>
              <span className="text-xs font-mono text-[#bac9cc]">{activeQ.domain}</span>
            </div>
            <span className="text-xs font-mono text-[#a8ffd2]">{activeQ.rfc}</span>
          </div>

          <h3 className="text-lg font-bold text-[#dfe2ee]">{activeQ.title}</h3>
          <p className="text-sm text-[#dfe2ee] leading-relaxed">{activeQ.statement}</p>

          {activeQ.codeSnippet && (
            <div className="bg-[#0a0e16] p-3 rounded-lg border border-[#334155]/50 font-mono text-xs text-[#a8ffd2] whitespace-pre-wrap">
              {activeQ.codeSnippet}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-[#849396] uppercase">
              {isEn ? 'Multiple Choice Options:' : 'Options au choix :'}
            </span>
            {activeQ.options.map((opt, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[#0a0e16] border border-[#334155]/40 text-xs text-[#dfe2ee]"
              >
                {opt}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#334155]/40 flex flex-col gap-3">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="py-2.5 px-4 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] transition-colors self-start flex items-center gap-2 border border-[#334155] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                {showAnswer ? 'visibility_off' : 'lightbulb'}
              </span>
              <span>
                {showAnswer
                  ? (isEn ? 'Hide Answer' : 'Masquer la réponse')
                  : (isEn ? 'Reveal Answer & RFC Justification' : 'Révéler la réponse & justification RFC')}
              </span>
            </button>

            {showAnswer && (
              <div className="bg-[#0a0e16] p-4 rounded-xl border border-[#00daf3]/40 flex flex-col gap-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-[#a8ffd2] font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>{isEn ? 'Correct Answer:' : 'Réponse correcte :'} {activeQ.correctAnswer}</span>
                </div>
                <p className="text-xs text-[#dfe2ee] leading-relaxed">{activeQ.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

