import React, { useState, useMemo, useEffect } from 'react';
import { ViewMode, CloudCategory, CloudGlossaryTerm, CloudEncyclopediaArticle } from '../types';
import { cloudGlossaryTerms, cloudEncyclopediaArticles, multiCloudMatrix } from '../data/cloudData';

interface CloudEncyclopediaViewProps {
  onNavigate: (view: ViewMode) => void;
  onNavigateToFlashcards: (searchQuery?: string, moduleCode?: string) => void;
  initialTab?: 'glossaire' | 'encyclopedie' | 'matrice';
  initialTermId?: string | null;
  initialArticleId?: string | null;
}

export const CloudEncyclopediaView: React.FC<CloudEncyclopediaViewProps> = ({
  onNavigate,
  onNavigateToFlashcards,
  initialTab = 'encyclopedie',
  initialTermId = null,
  initialArticleId = null,
}) => {
  const [activeTab, setActiveTab] = useState<'glossaire' | 'encyclopedie' | 'matrice'>(initialTab);
  
  // Glossary state
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(initialTermId || 'term-vpc');
  const [copiedCmdId, setCopiedCmdId] = useState<string | null>(null);

  // Encyclopedia state
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    initialArticleId || cloudEncyclopediaArticles[0]?.id || 'art-cloud-hybrid-interconnect'
  );
  const [encycloSearch, setEncycloSearch] = useState<string>('');

  // Matrix state
  const [matrixSearch, setMatrixSearch] = useState<string>('');

  // Sync external initial props when changed
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialTermId) {
      setSelectedTermId(initialTermId);
      setActiveTab('glossaire');
    }
    if (initialArticleId) {
      setSelectedArticleId(initialArticleId);
      setActiveTab('encyclopedie');
    }
  }, [initialTab, initialTermId, initialArticleId]);

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'Toutes les catégories', icon: 'apps' },
    { id: 'Réseau & Interconnexion', label: 'Réseau & Interconnexion', icon: 'hub' },
    { id: 'Compute & Conteneurs', label: 'Compute & Conteneurs', icon: 'memory' },
    { id: 'Stockage & Données', label: 'Stockage & Données', icon: 'database' },
    { id: 'Sécurité, IAM & Conformité', label: 'Sécurité & IAM', icon: 'shield' },
    { id: 'DevOps, CI/CD & IaC', label: 'DevOps & IaC', icon: 'terminal' },
    { id: 'Architecture & FinOps', label: 'Architecture & FinOps', icon: 'payments' },
  ];

  // Alphabet list for jump filter
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filtered glossary terms
  const filteredTerms = useMemo(() => {
    return cloudGlossaryTerms.filter((item) => {
      const q = glossarySearch.toLowerCase();
      const matchSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        (item.acronym && item.acronym.toLowerCase().includes(q)) ||
        item.shortDef.toLowerCase().includes(q) ||
        item.fullExplanation.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchProvider =
        selectedProvider === 'all' ||
        item.providers.some((p) => p.provider.toLowerCase() === selectedProvider.toLowerCase());

      const matchLetter =
        selectedLetter === 'all' ||
        item.term.toUpperCase().startsWith(selectedLetter);

      return matchSearch && matchCategory && matchProvider && matchLetter;
    });
  }, [glossarySearch, selectedCategory, selectedProvider, selectedLetter]);

  // Selected term object
  const activeTerm = useMemo(() => {
    return (
      cloudGlossaryTerms.find((t) => t.id === selectedTermId) ||
      filteredTerms[0] ||
      cloudGlossaryTerms[0]
    );
  }, [selectedTermId, filteredTerms]);

  // Selected article object
  const activeArticle = useMemo(() => {
    return (
      cloudEncyclopediaArticles.find((a) => a.id === selectedArticleId) ||
      cloudEncyclopediaArticles[0]
    );
  }, [selectedArticleId]);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    if (!encycloSearch.trim()) return cloudEncyclopediaArticles;
    const q = encycloSearch.toLowerCase();
    return cloudEncyclopediaArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.overview.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [encycloSearch]);

  // Filtered matrix items
  const filteredMatrix = useMemo(() => {
    if (!matrixSearch.trim()) return multiCloudMatrix;
    const q = matrixSearch.toLowerCase();
    return multiCloudMatrix.filter(
      (m) =>
        m.category.toLowerCase().includes(q) ||
        m.aws.toLowerCase().includes(q) ||
        m.azure.toLowerCase().includes(q) ||
        m.gcp.toLowerCase().includes(q) ||
        m.cncf.toLowerCase().includes(q)
    );
  }, [matrixSearch]);

  // Copy command helper
  const handleCopyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmdId(id);
    setTimeout(() => setCopiedCmdId(null), 2200);
  };

  // Jump to article from term
  const handleJumpToArticle = (artId: string) => {
    setSelectedArticleId(artId);
    setActiveTab('encyclopedie');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump to term from article
  const handleJumpToTerm = (termId: string) => {
    setSelectedTermId(termId);
    setActiveTab('glossaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* 1. Header Banner */}
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-[#334155]/40">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">cloud_sync</span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#00e5ff] uppercase">
              Référence Technique NetOps & Architecture Cloud
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#dfe2ee] tracking-tight">
            Encyclopédie & Glossaire Cloud d'Entreprise
          </h1>
          <p className="text-sm text-[#bac9cc] leading-relaxed">
            Architectures de réseaux hybrides, topologies AWS / Azure / GCP, interconnexions BGP,
            conteneurs Kubernetes, sécurité Zero Trust et{' '}
            <strong className="text-[#a8ffd2]">passerelle directe vers les 900+ Flashcards de révision</strong>.
          </p>
        </div>

        {/* Action button to Flashcards */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateToFlashcards('Direct Connect')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 text-xs font-semibold tracking-wide transition-all shadow-[0_0_12px_rgba(0,229,255,0.15)]"
          >
            <span className="material-symbols-outlined text-base">style</span>
            <span>Flashcards Réseau & Cloud</span>
          </button>
          <button
            onClick={() => onNavigate('parcours-certifications')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#181c24] hover:bg-[#262a33] text-[#bac9cc] hover:text-[#dfe2ee] border border-[#334155]/60 text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-base">layers</span>
            <span>Certifications Associées</span>
          </button>
        </div>
      </section>

      {/* 2. Platform Telemetry Metrics Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-[#849396] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
            Termes du Glossaire
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#00e5ff]">
              {cloudGlossaryTerms.length}
            </span>
            <span className="text-xs text-[#bac9cc]">définitions détaillées</span>
          </div>
        </div>

        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-[#849396] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8ffd2]"></span>
            Dossiers d'Architecture
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#a8ffd2]">
              {cloudEncyclopediaArticles.length}
            </span>
            <span className="text-xs text-[#bac9cc]">avec schémas ASCII</span>
          </div>
        </div>

        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-[#849396] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb74d]"></span>
            Matrice Multi-Cloud
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#ffb74d]">
              {multiCloudMatrix.length}
            </span>
            <span className="text-xs text-[#bac9cc]">services comparés</span>
          </div>
        </div>

        <div className="bg-[#181c24] border border-[#334155]/40 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] font-mono text-[#849396] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            Liaison Flashcards
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#4edea3]">900+</span>
            <span className="text-xs text-[#bac9cc]">cartes interconnectées</span>
          </div>
        </div>
      </section>

      {/* 3. Primary Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#334155]/40 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('encyclopedie')}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'encyclopedie'
              ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
              : 'text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">menu_book</span>
          <span>Dossiers d'Architecture & Topologies</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              activeTab === 'encyclopedie' ? 'bg-[#00363d] text-[#00e5ff]' : 'bg-[#0f131c] text-[#849396]'
            }`}
          >
            {cloudEncyclopediaArticles.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('glossaire')}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'glossaire'
              ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
              : 'text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">dictionary</span>
          <span>Glossaire Technique Indexé (A-Z)</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              activeTab === 'glossaire' ? 'bg-[#00363d] text-[#00e5ff]' : 'bg-[#0f131c] text-[#849396]'
            }`}
          >
            {cloudGlossaryTerms.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('matrice')}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'matrice'
              ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
              : 'text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">compare</span>
          <span>Matrice Multi-Cloud (AWS vs Azure vs GCP)</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              activeTab === 'matrice' ? 'bg-[#00363d] text-[#00e5ff]' : 'bg-[#0f131c] text-[#849396]'
            }`}
          >
            {multiCloudMatrix.length}
          </span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: ENCYCLOPÉDIE DES ARCHITECTURES (DOSSIERS TECHNIQUES APPROFONDIS)
          ========================================================================= */}
      {activeTab === 'encyclopedie' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Articles Selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {/* Search within articles */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-base text-[#849396]">
                search
              </span>
              <input
                type="text"
                placeholder="Filtrer les dossiers techniques..."
                value={encycloSearch}
                onChange={(e) => setEncycloSearch(e.target.value)}
                className="w-full bg-[#181c24] border border-[#334155]/60 rounded-lg pl-9 pr-3 py-2 text-xs text-[#dfe2ee] placeholder-[#849396] focus:border-[#00e5ff] focus:outline-none font-mono"
              />
            </div>

            <div className="flex flex-col gap-2">
              {filteredArticles.map((article) => {
                const isSelected = article.id === selectedArticleId;
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                      setSelectedArticleId(article.id);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col gap-2 relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#181c24] border-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.15)]'
                        : 'bg-[#181c24]/70 border-[#334155]/40 hover:bg-[#181c24] hover:border-[#334155]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00e5ff]"></div>
                    )}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#00e5ff] font-mono font-semibold">{article.badge}</span>
                      <span className="text-[#849396] font-mono">{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-sm text-[#dfe2ee] group-hover:text-[#c3f5ff] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#bac9cc] line-clamp-2 leading-relaxed">
                      {article.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-[#334155]/30 mt-1">
                      <span className="text-[10px] text-[#849396] font-mono">{article.category}</span>
                      <span className="text-[10px] text-[#a8ffd2] font-mono flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">style</span>
                        {article.flashcardCountHint || 15} cartes
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Selected Deep-Dive Article */}
          <div className="lg:col-span-8 flex flex-col gap-6 bg-[#181c24] border border-[#334155]/50 rounded-2xl p-6 sm:p-8">
            {/* Article Header */}
            <div className="flex flex-col gap-3 pb-6 border-b border-[#334155]/40">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-mono font-semibold">
                  {activeArticle.badge}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#262a33] text-[#bac9cc] text-xs font-mono">
                  {activeArticle.readTime} de lecture
                </span>
                <span className="px-2.5 py-1 rounded bg-[#a8ffd2]/10 text-[#a8ffd2] border border-[#a8ffd2]/30 text-xs font-mono">
                  Niveau {activeArticle.level}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0f131c] text-[#849396] text-xs font-mono ml-auto">
                  {activeArticle.category}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#dfe2ee] tracking-tight leading-snug">
                {activeArticle.title}
              </h2>
              <p className="text-sm sm:text-base text-[#a8ffd2] font-mono leading-relaxed">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Quick Action Bar: Flashcard direct link */}
            <div className="bg-[#0f131c] border border-[#00e5ff]/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0">
                  <span className="material-symbols-outlined text-xl">style</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase">
                    Entraînement Actif Lié
                  </span>
                  <span className="text-xs text-[#dfe2ee]">
                    Flashcards associées à ce dossier (~{activeArticle.flashcardCountHint || 15} cartes)
                  </span>
                </div>
              </div>
              <button
                onClick={() => onNavigateToFlashcards(activeArticle.flashcardSearchQuery)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-bold text-xs tracking-wide transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] shrink-0"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                <span>Réviser les Flashcards</span>
              </button>
            </div>

            {/* Overview Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#849396] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#00e5ff]">info</span>
                Contexte Architectural & Enjeux
              </h3>
              <p className="text-sm text-[#dfe2ee] leading-relaxed bg-[#0f131c]/50 p-4 rounded-xl border border-[#334155]/30">
                {activeArticle.overview}
              </p>
            </div>

            {/* ASCII Architecture Topology Box */}
            {activeArticle.diagramAscii && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#849396]">
                  <span className="flex items-center gap-1.5 uppercase text-[#00e5ff]">
                    <span className="material-symbols-outlined text-sm">schema</span>
                    Topologie de Référence Réseau (Diagramme ASCII)
                  </span>
                  <span className="text-[11px] text-[#bac9cc]">Flux de paquets & Routage</span>
                </div>
                <div className="bg-[#0a0e16] border border-[#00e5ff]/30 rounded-xl p-4 overflow-x-auto shadow-inner">
                  <pre className="font-mono text-xs text-[#a8ffd2] leading-relaxed select-text">
                    {activeArticle.diagramAscii}
                  </pre>
                </div>
              </div>
            )}

            {/* Key Takeaways Box */}
            <div className="bg-[#0f131c] border border-[#334155]/60 rounded-xl p-5 flex flex-col gap-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#ffb74d] flex items-center gap-2">
                <span className="material-symbols-outlined text-base">verified</span>
                Points Clés Incontournables pour l'Examen
              </h3>
              <ul className="flex flex-col gap-2">
                {activeArticle.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#dfe2ee] flex items-start gap-2.5">
                    <span className="text-[#00e5ff] font-mono font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep-Dive Article Sections */}
            <div className="flex flex-col gap-6 pt-2">
              {activeArticle.sections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#c3f5ff] tracking-tight flex items-center gap-2 border-b border-[#334155]/30 pb-2">
                    <span className="text-xs font-mono text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded">
                      §{idx + 1}
                    </span>
                    {section.heading}
                  </h3>

                  <div className="text-xs sm:text-sm text-[#bac9cc] leading-relaxed whitespace-pre-line space-y-2">
                    {section.content}
                  </div>

                  {/* Optional Callout Box */}
                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border flex items-start gap-3 mt-1 ${
                        section.callout.type === 'security'
                          ? 'bg-[#ff5252]/10 border-[#ff5252]/40 text-[#ff8a80]'
                          : section.callout.type === 'exam'
                          ? 'bg-[#ffb74d]/10 border-[#ffb74d]/40 text-[#ffe082]'
                          : 'bg-[#00e5ff]/10 border-[#00e5ff]/40 text-[#80d8ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg mt-0.5">
                        {section.callout.type === 'security'
                          ? 'lock'
                          : section.callout.type === 'exam'
                          ? 'quiz'
                          : 'lightbulb'}
                      </span>
                      <p className="text-xs leading-relaxed">{section.callout.text}</p>
                    </div>
                  )}

                  {/* Optional Code Snippet */}
                  {section.codeSnippet && (
                    <div className="bg-[#0a0e16] border border-[#334155]/60 rounded-xl p-4 overflow-x-auto flex flex-col gap-1">
                      {section.codeSnippet.caption && (
                        <span className="text-[11px] font-mono text-[#849396]">
                          # {section.codeSnippet.caption}
                        </span>
                      )}
                      <pre className="font-mono text-xs text-[#00e5ff] select-text">
                        {section.codeSnippet.code}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Multi-Cloud Comparative Matrix for this Topic */}
            {activeArticle.multiCloudComparison && (
              <div className="flex flex-col gap-3 pt-4 border-t border-[#334155]/40">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#00e5ff] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">balance</span>
                  Comparatif Multi-Cloud : AWS vs Azure vs GCP
                </h3>
                <div className="overflow-x-auto border border-[#334155]/50 rounded-xl">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#0f131c] text-[#849396] border-b border-[#334155]/50">
                      <tr>
                        <th className="p-3">Fonctionnalité</th>
                        <th className="p-3 text-[#ff9900]">Amazon Web Services</th>
                        <th className="p-3 text-[#0078d4]">Microsoft Azure</th>
                        <th className="p-3 text-[#4285f4]">Google Cloud Platform</th>
                        <th className="p-3 text-[#a8ffd2]">Standard / CNCF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334155]/30 bg-[#181c24]">
                      {activeArticle.multiCloudComparison.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#262a33]/30">
                          <td className="p-3 font-sans font-semibold text-[#dfe2ee]">
                            {row.feature}
                          </td>
                          <td className="p-3 text-[#bac9cc]">{row.aws}</td>
                          <td className="p-3 text-[#bac9cc]">{row.azure}</td>
                          <td className="p-3 text-[#bac9cc]">{row.gcp}</td>
                          <td className="p-3 text-[#849396]">{row.cncfOrStandard || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Related Glossary Terms Chips */}
            {activeArticle.relatedGlossaryTermIds && activeArticle.relatedGlossaryTermIds.length > 0 && (
              <div className="flex flex-col gap-2 pt-4 border-t border-[#334155]/40">
                <span className="text-xs font-mono text-[#849396] uppercase">
                  Termes du Glossaire Liés à ce Dossier :
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.relatedGlossaryTermIds.map((tid) => {
                    const termObj = cloudGlossaryTerms.find((t) => t.id === tid);
                    if (!termObj) return null;
                    return (
                      <button
                        key={tid}
                        onClick={() => handleJumpToTerm(tid)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f131c] hover:bg-[#262a33] text-xs text-[#00e5ff] border border-[#334155]/50 hover:border-[#00e5ff]/50 transition-all font-mono"
                      >
                        <span className="material-symbols-outlined text-sm">dictionary</span>
                        <span>{termObj.acronym || termObj.term.split('—')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Final Callout to Practice in Flashcards */}
            <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-[#00363d]/80 via-[#0a2027] to-[#181c24] border border-[#00e5ff]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_24px_rgba(0,229,255,0.15)]">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <h4 className="text-base font-bold text-[#c3f5ff] flex items-center justify-center sm:justify-start gap-2">
                  <span className="material-symbols-outlined text-[#00e5ff]">school</span>
                  Ancrer ces Connaissances en Mémoire
                </h4>
                <p className="text-xs text-[#bac9cc] max-w-xl">
                  Testez votre maîtrise de ce dossier avec le système de répétition espacée (SRS) et
                  les flashcards spécialisées NetOps.
                </p>
              </div>
              <button
                onClick={() => onNavigateToFlashcards(activeArticle.flashcardSearchQuery)}
                className="px-6 py-3 rounded-xl bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-bold text-sm tracking-wide transition-all shadow-[0_0_16px_rgba(0,229,255,0.35)] shrink-0 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">style</span>
                <span>Lancer le Deck Flashcards</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: GLOSSAIRE TECHNIQUE INDEXÉ (A-Z & MOTEUR DE RECHERCHE)
          ========================================================================= */}
      {activeTab === 'glossaire' && (
        <div className="flex flex-col gap-6">
          {/* Search & Filter Bar */}
          <div className="bg-[#181c24] border border-[#334155]/50 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
            {/* Row 1: Search input and quick provider selector */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-lg text-[#849396]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Rechercher par terme, acronyme, RFC, CLI ou mot-clé (ex: VPC, BGP, Geneve, IAM)..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full bg-[#0f131c] border border-[#334155]/60 rounded-xl pl-11 pr-10 py-2.5 text-sm text-[#dfe2ee] placeholder-[#849396] focus:border-[#00e5ff] focus:outline-none font-mono"
                />
                {glossarySearch && (
                  <button
                    onClick={() => setGlossarySearch('')}
                    className="absolute right-3 top-3 text-[#849396] hover:text-[#dfe2ee]"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                )}
              </div>

              {/* Provider Quick Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-[#849396] font-mono">Fournisseur :</span>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="bg-[#0f131c] border border-[#334155]/60 rounded-xl px-3 py-2 text-xs font-mono text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
                >
                  <option value="all">Tous les fournisseurs</option>
                  <option value="AWS">Amazon Web Services (AWS)</option>
                  <option value="Azure">Microsoft Azure</option>
                  <option value="GCP">Google Cloud Platform</option>
                  <option value="CNCF">CNCF / Kubernetes</option>
                  <option value="Standard">Standard / RFC</option>
                </select>
              </div>
            </div>

            {/* Row 2: Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#00e5ff] text-[#00363d]'
                        : 'bg-[#0f131c] text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee] border border-[#334155]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Row 3: Alphabet Jump Bar */}
            <div className="flex items-center gap-1 overflow-x-auto pt-1 border-t border-[#334155]/30">
              <button
                onClick={() => setSelectedLetter('all')}
                className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all ${
                  selectedLetter === 'all'
                    ? 'bg-[#00e5ff] text-[#00363d]'
                    : 'text-[#849396] hover:text-[#dfe2ee]'
                }`}
              >
                TOUS
              </button>
              {alphabet.map((letter) => {
                const count = cloudGlossaryTerms.filter((t) =>
                  t.term.toUpperCase().startsWith(letter)
                ).length;
                const isSelected = selectedLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    disabled={count === 0}
                    className={`px-2 py-1 rounded text-xs font-mono font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#00e5ff] text-[#00363d] font-bold'
                        : count > 0
                        ? 'text-[#bac9cc] hover:text-[#00e5ff] hover:bg-[#262a33]'
                        : 'text-[#849396]/30 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terms Count */}
          <div className="flex items-center justify-between text-xs font-mono text-[#849396] px-1">
            <span>
              {filteredTerms.length} terme{filteredTerms.length > 1 ? 's' : ''} trouvé
              {filteredTerms.length > 1 ? 's' : ''}
            </span>
            <span>Trié par ordre alphabétique & pertinence</span>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => {
              const isSelected = term.id === activeTerm?.id;
              return (
                <div
                  key={term.id}
                  id={term.id}
                  className={`bg-[#181c24] border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-[#334155] ${
                    isSelected
                      ? 'border-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.12)]'
                      : 'border-[#334155]/40'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Badges line */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-semibold text-[#00e5ff] bg-[#00e5ff]/10 px-2.5 py-0.5 rounded border border-[#00e5ff]/30">
                        {term.category}
                      </span>
                      {term.rfcOrStandard && (
                        <span className="text-[10px] font-mono text-[#ffb74d] bg-[#ffb74d]/10 px-2 py-0.5 rounded border border-[#ffb74d]/30">
                          {term.rfcOrStandard.split(',')[0]}
                        </span>
                      )}
                    </div>

                    {/* Term title */}
                    <div>
                      <h3 className="text-base font-bold text-[#dfe2ee] tracking-tight flex items-center gap-2">
                        {term.term}
                      </h3>
                    </div>

                    {/* Short Def */}
                    <p className="text-xs text-[#bac9cc] leading-relaxed font-sans">
                      {term.shortDef}
                    </p>

                    {/* Detailed explanation accordion/snippet */}
                    <div className="text-[11px] text-[#849396] leading-relaxed bg-[#0f131c] p-3 rounded-xl border border-[#334155]/30">
                      <p className="line-clamp-3 hover:line-clamp-none transition-all">
                        {term.fullExplanation}
                      </p>
                    </div>

                    {/* Provider mappings */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-[#849396] mr-1">Équivalents :</span>
                      {term.providers.map((p, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0f131c] border border-[#334155]/40 text-[#c3f5ff]"
                        >
                          <strong
                            className={
                              p.provider === 'AWS'
                                ? 'text-[#ff9900]'
                                : p.provider === 'Azure'
                                ? 'text-[#0078d4]'
                                : p.provider === 'GCP'
                                ? 'text-[#4285f4]'
                                : 'text-[#a8ffd2]'
                            }
                          >
                            {p.provider}:
                          </strong>{' '}
                          {p.serviceName}
                        </span>
                      ))}
                    </div>

                    {/* CLI Example with 1-click copy */}
                    {term.cliExample && (
                      <div className="bg-[#0a0e16] border border-[#334155]/50 rounded-lg p-2.5 flex items-center justify-between gap-2">
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-mono text-[#849396]">
                            {term.cliExample.description || 'Commande CLI'}
                          </span>
                          <code className="text-xs font-mono text-[#a8ffd2] truncate">
                            {term.cliExample.command}
                          </code>
                        </div>
                        <button
                          onClick={() => handleCopyCommand(term.cliExample!.command, term.id)}
                          className="p-1.5 rounded hover:bg-[#262a33] text-[#849396] hover:text-[#00e5ff] transition-colors shrink-0"
                          title="Copier la commande"
                        >
                          <span className="material-symbols-outlined text-base">
                            {copiedCmdId === term.id ? 'check' : 'content_copy'}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar: Bridge with Flashcards and Bridge with Encyclopedia */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#334155]/30 mt-2">
                    {/* Bridge to Flashcards */}
                    <button
                      onClick={() =>
                        onNavigateToFlashcards(
                          term.relatedFlashcardKeywords[0] || term.acronym || term.term
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-mono font-semibold transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">style</span>
                      <span>S'entraîner en Flashcard</span>
                    </button>

                    {/* Bridge to Article if available */}
                    {term.relatedArticleId && (
                      <button
                        onClick={() => handleJumpToArticle(term.relatedArticleId!)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#334155]/60 text-[#dfe2ee] text-xs font-mono transition-all"
                      >
                        <span className="material-symbols-outlined text-sm text-[#a8ffd2]">
                          menu_book
                        </span>
                        <span>Dossier Architecture</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: MATRICE COMPARATIVE MULTI-CLOUD (AWS vs AZURE vs GCP vs CNCF)
          ========================================================================= */}
      {activeTab === 'matrice' && (
        <div className="flex flex-col gap-6 bg-[#181c24] border border-[#334155]/50 rounded-2xl p-6 sm:p-8">
          {/* Header of the matrix */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#334155]/40">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-[#dfe2ee] tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00e5ff]">compare_arrows</span>
                Matrice Comparative des Services Multi-Cloud
              </h2>
              <p className="text-xs sm:text-sm text-[#bac9cc]">
                Correspondance directe des services pour concevoir des architectures hybrides,
                passer les examens AWS / Azure / GCP, et relier les concepts aux flashcards.
              </p>
            </div>

            {/* Search Filter */}
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-base text-[#849396]">
                search
              </span>
              <input
                type="text"
                placeholder="Filtrer un service ou un domaine..."
                value={matrixSearch}
                onChange={(e) => setMatrixSearch(e.target.value)}
                className="w-full bg-[#0f131c] border border-[#334155]/60 rounded-xl pl-9 pr-3 py-2 text-xs text-[#dfe2ee] placeholder-[#849396] focus:border-[#00e5ff] focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto border border-[#334155]/50 rounded-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0f131c] text-[#849396] border-b border-[#334155]/60">
                <tr>
                  <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-[#dfe2ee]">
                    Domaine Architectural
                  </th>
                  <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-[#ff9900]">
                    Amazon Web Services
                  </th>
                  <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-[#0078d4]">
                    Microsoft Azure
                  </th>
                  <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-[#4285f4]">
                    Google Cloud Platform
                  </th>
                  <th className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-[#a8ffd2]">
                    CNCF / Open Source
                  </th>
                  <th className="p-3 sm:p-4 text-right text-xs font-bold uppercase tracking-wider text-[#00e5ff]">
                    Action Flashcard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]/30 bg-[#181c24]">
                {filteredMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#262a33]/40 transition-colors">
                    <td className="p-3 sm:p-4 font-sans font-bold text-[#dfe2ee]">
                      {item.category}
                    </td>
                    <td className="p-3 sm:p-4 text-[#c3f5ff]">{item.aws}</td>
                    <td className="p-3 sm:p-4 text-[#c3f5ff]">{item.azure}</td>
                    <td className="p-3 sm:p-4 text-[#c3f5ff]">{item.gcp}</td>
                    <td className="p-3 sm:p-4 text-[#849396]">{item.cncf}</td>
                    <td className="p-3 sm:p-4 text-right">
                      <button
                        onClick={() => onNavigateToFlashcards(item.category.split(' ')[0])}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 text-[11px] font-semibold transition-all"
                        title="Réviser les Flashcards sur ce domaine"
                      >
                        <span className="material-symbols-outlined text-xs">style</span>
                        <span>Quiz</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudEncyclopediaView;
