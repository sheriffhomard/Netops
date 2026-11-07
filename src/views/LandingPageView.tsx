import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '../components/landing/LandingHeader';
import { InteractiveTopologyGraphic } from '../components/landing/InteractiveTopologyGraphic';
import { InteractiveTerminalPreview } from '../components/landing/InteractiveTerminalPreview';
import { InteractiveFlashcardDemo } from '../components/landing/InteractiveFlashcardDemo';
import { InteractiveSubnetWidget } from '../components/landing/InteractiveSubnetWidget';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { usePWA } from '../context/PWAContext';

interface LandingPageViewProps {
  onLaunchApp: () => void;
  onOpenSignIn?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onLaunchApp,
}) => {
  const { t, i18n } = useTranslation(['landing', 'common']);
  const isEn = i18n.language?.startsWith('en');
  const { isInstallable, installApp } = usePWA();
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'terminal' | 'flashcards' | 'subnet'>('terminal');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-[#dfe2ee] font-sans selection:bg-[#00daf3]/20 selection:text-[#c3f5ff] flex flex-col">
      {/* SECTION 1: HEADER & NAVIGATION */}
      <LandingHeader onLaunchApp={onLaunchApp} />

      <main className="flex-1 w-full">
        {/* SECTION 2: HERO SECTION */}
        <section
          id="hero"
          className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-[#334155]/40"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-tr from-[#00e5ff]/10 via-[#3b82f6]/10 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              {/* Quiet Text Kicker (Anti-slop Zero-Pill) */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#00e5ff] uppercase tracking-widest mb-4">
                <span>Learn</span>
                <span className="text-[#849396]" aria-hidden="true">·</span>
                <span>Practice</span>
                <span className="text-[#849396]" aria-hidden="true">·</span>
                <span>Master</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#dfe2ee] leading-[1.15]">
                {t('landing:hero.title')}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-sm sm:text-lg text-[#bac9cc] leading-relaxed max-w-2xl mx-auto">
                {t('landing:hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onLaunchApp}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-semibold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.55)] flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{t('landing:hero.ctaDiscover')}</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('features')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#121620] hover:bg-[#181c24] text-[#dfe2ee] hover:text-[#00e5ff] border border-[#334155]/60 hover:border-[#00e5ff]/50 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('landing:hero.ctaFeatures')}</span>
                  <span className="material-symbols-outlined text-base">expand_more</span>
                </button>
              </div>

              {/* Unboxed Metadata Strip (Zero-Pill discipline) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-mono text-[#849396]">
                <span className="text-[#00e5ff]">2 900+</span> <span>fiches de révision</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#00e5ff]">102</span> <span>questions certifiantes</span>
                <span aria-hidden="true">·</span>
                <span>Terminal Cisco IOS-XE</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#10b981]">100% PWA &amp; Hors-ligne</span>
              </div>
            </div>

            {/* Main Interactive NOC Topology Showcase */}
            <div className="mt-6 max-w-5xl mx-auto">
              <InteractiveTopologyGraphic />
            </div>
          </div>
        </section>

        {/* SECTION 3: PRÉSENTATION DE NETOPS ACADEMY */}
        <section
          id="about"
          className="py-16 sm:py-24 border-b border-[#334155]/40 bg-[#0a0e16]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block mb-2">
                Approche Intégrée
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe2ee]">
                {t('landing:presentation.title')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                {t('landing:presentation.subtitle')}
              </p>
            </div>

            {/* 6 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Theory */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">menu_book</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                    {t('landing:presentation.pillars.theory.title')}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:presentation.pillars.theory.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  RFCs &amp; Blueprints constructeurs
                </div>
              </div>

              {/* 2. Memory (SRS) */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                    {t('landing:presentation.pillars.memory.title')}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:presentation.pillars.memory.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  Algorithme Leitner (5 boîtes)
                </div>
              </div>

              {/* 3. Evaluation */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">assignment_turned_in</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                    {t('landing:presentation.pillars.evaluation.title')}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:presentation.pillars.evaluation.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  Barème certifiant 825/1000
                </div>
              </div>

              {/* 4. Practice */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">terminal</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                    {t('landing:presentation.pillars.practice.title')}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:presentation.pillars.practice.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  Console Cisco IOS-XE simulée
                </div>
              </div>

              {/* 5. Cloud Exploration */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">cloud_sync</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                    {t('landing:presentation.pillars.exploration.title')}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:presentation.pillars.exploration.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  AWS · Azure · Google Cloud
                </div>
              </div>

              {/* 6. Progress Tracking */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">query_stats</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                    {t('landing:presentation.pillars.progress.title')}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:presentation.pillars.progress.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  Radar d'endurance &amp; Streaks
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FONCTIONNALITÉS PRINCIPALES (GRILLE + INTERACTIVE SHOWCASE) */}
        <section
          id="features"
          className="py-16 sm:py-24 border-b border-[#334155]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block mb-2">
                Écosystème Technique
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe2ee]">
                {t('landing:features.heading')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                {t('landing:features.subheading')}
              </p>
            </div>

            {/* 6 Core Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {/* Card 1: NOC Dashboard */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#849396]">
                    <span>01 / Supervision</span>
                    <span className="text-[#00e5ff]">{t('landing:features.items.noc.badge')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#dfe2ee] mb-2">
                    {t('landing:features.items.noc.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:features.items.noc.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-xs font-mono text-[#bac9cc] flex items-center justify-between">
                  <span>Indicateurs de readiness</span>
                  <span className="text-[#10b981]">SLA 99.98%</span>
                </div>
              </div>

              {/* Card 2: Smart Flashcards */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#849396]">
                    <span>02 / Mémorisation</span>
                    <span className="text-[#00e5ff]">{t('landing:features.items.flashcards.badge')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#dfe2ee] mb-2">
                    {t('landing:features.items.flashcards.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:features.items.flashcards.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-xs font-mono text-[#bac9cc] flex items-center justify-between">
                  <span>Cartes 3D &amp; TTS Audio</span>
                  <span className="text-[#00e5ff]">5 Boîtes Leitner</span>
                </div>
              </div>

              {/* Card 3: Exams & Quizzes */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#849396]">
                    <span>03 / Évaluation</span>
                    <span className="text-[#00e5ff]">{t('landing:features.items.exams.badge')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#dfe2ee] mb-2">
                    {t('landing:features.items.exams.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:features.items.exams.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-xs font-mono text-[#bac9cc] flex items-center justify-between">
                  <span>102 questions proctorisées</span>
                  <span className="text-[#00e5ff]">Seuil 825/1000</span>
                </div>
              </div>

              {/* Card 4: Network Labs */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#849396]">
                    <span>04 / Pratique</span>
                    <span className="text-[#00e5ff]">{t('landing:features.items.labs.badge')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#dfe2ee] mb-2">
                    {t('landing:features.items.labs.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:features.items.labs.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-xs font-mono text-[#bac9cc] flex items-center justify-between">
                  <span>Scénarios d'ingénierie</span>
                  <span className="text-[#00e5ff]">Trunk &amp; OSPF</span>
                </div>
              </div>

              {/* Card 5: Cisco IOS-XE Terminal */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#849396]">
                    <span>05 / Console</span>
                    <span className="text-[#00e5ff]">{t('landing:features.items.terminal.badge')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#dfe2ee] mb-2">
                    {t('landing:features.items.terminal.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:features.items.terminal.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-xs font-mono text-[#bac9cc] flex items-center justify-between">
                  <span>Arborescence des modes CLI</span>
                  <span className="text-[#00e5ff]">Complétion TAB</span>
                </div>
              </div>

              {/* Card 6: Technical Encyclopedia */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 hover:border-[#00e5ff]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#849396]">
                    <span>06 / Référence</span>
                    <span className="text-[#00e5ff]">{t('landing:features.items.encyclopedia.badge')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#dfe2ee] mb-2">
                    {t('landing:features.items.encyclopedia.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:features.items.encyclopedia.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-xs font-mono text-[#bac9cc] flex items-center justify-between">
                  <span>Architectures multi-cloud</span>
                  <span className="text-[#00e5ff]">Topologies &amp; Peering</span>
                </div>
              </div>
            </div>

            {/* Interactive Sandbox Selector (Test the tools right from landing page) */}
            <div className="mt-12 bg-[#0a0e16] rounded-2xl border border-[#334155]/60 p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[#334155]/40">
                <div>
                  <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block">
                    Bac à Sable Interactif
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#dfe2ee] mt-1">
                    Essayez directement les outils de NetOps Academy
                  </h3>
                </div>

                {/* Segmented Tab Controls (Anti-slop compliant) */}
                <div className="flex items-center p-1 bg-[#121620] rounded-xl border border-[#334155]/60">
                  <button
                    type="button"
                    onClick={() => setActiveInteractiveTab('terminal')}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                      activeInteractiveTab === 'terminal'
                        ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-sm'
                        : 'text-[#849396] hover:text-[#dfe2ee]'
                    }`}
                  >
                    Terminal IOS-XE
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInteractiveTab('flashcards')}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                      activeInteractiveTab === 'flashcards'
                        ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-sm'
                        : 'text-[#849396] hover:text-[#dfe2ee]'
                    }`}
                  >
                    Fiches SRS 3D
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInteractiveTab('subnet')}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                      activeInteractiveTab === 'subnet'
                        ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-sm'
                        : 'text-[#849396] hover:text-[#dfe2ee]'
                    }`}
                  >
                    Calculateur CIDR
                  </button>
                </div>
              </div>

              {/* Tab Display */}
              <div>
                {activeInteractiveTab === 'terminal' && <InteractiveTerminalPreview />}
                {activeInteractiveTab === 'flashcards' && <InteractiveFlashcardDemo />}
                {activeInteractiveTab === 'subnet' && <InteractiveSubnetWidget />}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: UNE APPROCHE PÉDAGOGIQUE COMPLÈTE */}
        <section
          id="learning"
          className="py-16 sm:py-24 border-b border-[#334155]/40 bg-[#0a0e16]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block mb-2">
                Méthodologie Éprouvée
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe2ee]">
                {t('landing:learning.heading')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                {t('landing:learning.subheading')}
              </p>
            </div>

            {/* Stepper (Horizontal on desktop, vertical on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-mono font-bold text-[#00e5ff] block mb-2">
                    01
                  </span>
                  <span className="text-xs font-mono text-[#849396] uppercase tracking-wider block mb-1">
                    {t('landing:learning.steps.step1.name')}
                  </span>
                  <h3 className="text-base font-bold text-[#dfe2ee] mb-2">
                    {t('landing:learning.steps.step1.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:learning.steps.step1.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  RFCs &amp; Blueprints
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-mono font-bold text-[#00e5ff] block mb-2">
                    02
                  </span>
                  <span className="text-xs font-mono text-[#849396] uppercase tracking-wider block mb-1">
                    {t('landing:learning.steps.step2.name')}
                  </span>
                  <h3 className="text-base font-bold text-[#dfe2ee] mb-2">
                    {t('landing:learning.steps.step2.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:learning.steps.step2.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  Ateliers &amp; Terminal
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-mono font-bold text-[#00e5ff] block mb-2">
                    03
                  </span>
                  <span className="text-xs font-mono text-[#849396] uppercase tracking-wider block mb-1">
                    {t('landing:learning.steps.step3.name')}
                  </span>
                  <h3 className="text-base font-bold text-[#dfe2ee] mb-2">
                    {t('landing:learning.steps.step3.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:learning.steps.step3.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  Examens 825/1000
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-mono font-bold text-[#00e5ff] block mb-2">
                    04
                  </span>
                  <span className="text-xs font-mono text-[#849396] uppercase tracking-wider block mb-1">
                    {t('landing:learning.steps.step4.name')}
                  </span>
                  <h3 className="text-base font-bold text-[#dfe2ee] mb-2">
                    {t('landing:learning.steps.step4.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:learning.steps.step4.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  Répétition espacée SRS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TECHNOLOGIES ET DOMAINES COUVERTS */}
        <section
          id="technologies"
          className="py-16 sm:py-24 border-b border-[#334155]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block mb-2">
                Curriculum Réel
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe2ee]">
                {t('landing:technologies.heading')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                {t('landing:technologies.subheading')}
              </p>
            </div>

            {/* 6 Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fundamentals */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50">
                <h3 className="text-sm font-semibold font-mono text-[#00e5ff] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">lan</span>
                  <span>{t('landing:technologies.categories.fundamentals.title')}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {((t('landing:technologies.categories.fundamentals.tags', { returnObjects: true }) as string[]) || []).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[#bac9cc] bg-[#121620] px-2.5 py-1 rounded border border-[#334155]/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Switching */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50">
                <h3 className="text-sm font-semibold font-mono text-[#00e5ff] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">alt_route</span>
                  <span>{t('landing:technologies.categories.switching.title')}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {((t('landing:technologies.categories.switching.tags', { returnObjects: true }) as string[]) || []).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[#bac9cc] bg-[#121620] px-2.5 py-1 rounded border border-[#334155]/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Routing */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50">
                <h3 className="text-sm font-semibold font-mono text-[#00e5ff] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">hub</span>
                  <span>{t('landing:technologies.categories.routing.title')}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {((t('landing:technologies.categories.routing.tags', { returnObjects: true }) as string[]) || []).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[#bac9cc] bg-[#121620] px-2.5 py-1 rounded border border-[#334155]/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50">
                <h3 className="text-sm font-semibold font-mono text-[#00e5ff] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">security</span>
                  <span>{t('landing:technologies.categories.security.title')}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {((t('landing:technologies.categories.security.tags', { returnObjects: true }) as string[]) || []).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[#bac9cc] bg-[#121620] px-2.5 py-1 rounded border border-[#334155]/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloud */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50">
                <h3 className="text-sm font-semibold font-mono text-[#00e5ff] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">cloud_done</span>
                  <span>{t('landing:technologies.categories.cloud.title')}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {((t('landing:technologies.categories.cloud.tags', { returnObjects: true }) as string[]) || []).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[#bac9cc] bg-[#121620] px-2.5 py-1 rounded border border-[#334155]/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Operations */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50">
                <h3 className="text-sm font-semibold font-mono text-[#00e5ff] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">build</span>
                  <span>{t('landing:technologies.categories.operations.title')}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {((t('landing:technologies.categories.operations.tags', { returnObjects: true }) as string[]) || []).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[#bac9cc] bg-[#121620] px-2.5 py-1 rounded border border-[#334155]/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: UNE PLATEFORME BILINGUE */}
        <section
          id="bilingual"
          className="py-16 sm:py-24 border-b border-[#334155]/40 bg-[#0a0e16]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-3xl bg-[#0a0e16] border border-[#334155]/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block mb-2">
                  {t('landing:bilingual.subheading')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#dfe2ee]">
                  {t('landing:bilingual.heading')}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#dfe2ee] leading-relaxed">
                  {t('landing:bilingual.desc')}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-[#849396] leading-relaxed">
                  {t('landing:bilingual.detail')}
                </p>

                {/* In-place Language Switcher Interactive Demonstration */}
                <div className="mt-8 pt-6 border-t border-[#334155]/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#bac9cc]">
                    <span>{t('landing:bilingual.currentLanguage')}</span>
                    <span className="font-bold text-[#00e5ff] text-sm">
                      {isEn ? 'English (EN)' : 'Français (FR)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => i18n.changeLanguage(isEn ? 'fr' : 'en')}
                      className="px-4 py-2 rounded-xl bg-[#181c24] hover:bg-[#262a33] text-[#00e5ff] border border-[#00e5ff]/40 font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base">translate</span>
                      <span>{isEn ? t('landing:bilingual.toggleActionFr') : t('landing:bilingual.toggleAction')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: EXPÉRIENCE MULTI-APPAREILS & PWA */}
        <section
          id="devices"
          className="py-16 sm:py-24 border-b border-[#334155]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block mb-2">
                Mobilité &amp; Accessibilité
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe2ee]">
                {t('landing:devices.heading')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                {t('landing:devices.subheading')}
              </p>
            </div>

            {/* 3 Devices Presentation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40">
                    <span className="material-symbols-outlined text-xl">desktop_windows</span>
                  </div>
                  <h3 className="text-base font-bold text-[#dfe2ee] mb-2">
                    {t('landing:devices.desktop.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:devices.desktop.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  1920px &amp; 1440px multi-colonnes
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40">
                    <span className="material-symbols-outlined text-xl">tablet_mac</span>
                  </div>
                  <h3 className="text-base font-bold text-[#dfe2ee] mb-2">
                    {t('landing:devices.tablet.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:devices.tablet.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  1024px &amp; 768px tactile fluide
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-4 border border-[#334155]/40">
                    <span className="material-symbols-outlined text-xl">smartphone</span>
                  </div>
                  <h3 className="text-base font-bold text-[#dfe2ee] mb-2">
                    {t('landing:devices.mobile.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#849396] leading-relaxed">
                    {t('landing:devices.mobile.desc')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#334155]/30 text-[11px] font-mono text-[#00e5ff]">
                  390px &amp; 360px barre au pouce
                </div>
              </div>
            </div>

            {/* PWA Integration Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1422] border border-[#00e5ff]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                  <span className="text-xs font-mono text-[#00e5ff] uppercase font-bold tracking-wider">
                    {t('landing:devices.pwaBadge')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#dfe2ee]">
                  {t('landing:devices.pwaTitle')}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#849396] leading-relaxed">
                  {t('landing:devices.pwaDesc')}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                {isInstallable ? (
                  <button
                    type="button"
                    onClick={installApp}
                    className="px-5 py-2.5 rounded-xl bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-bold text-xs font-mono transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>{t('landing:devices.installBtn')}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onLaunchApp}
                    className="px-5 py-2.5 rounded-xl bg-[#181c24] hover:bg-[#262a33] text-[#00e5ff] border border-[#334155] font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>PWA Validée · Accéder</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: POUR QUI ? */}
        <section
          id="audiences"
          className="py-16 sm:py-24 border-b border-[#334155]/40 bg-[#0a0e16]/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider block mb-2">
                Publics Cibles
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe2ee]">
                {t('landing:audiences.heading')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#bac9cc] leading-relaxed">
                {t('landing:audiences.subheading')}
              </p>
            </div>

            {/* 4 Roles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-lg">school</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#dfe2ee] mb-1.5">
                    {t('landing:audiences.roles.students.title')}
                  </h3>
                  <p className="text-xs text-[#849396] leading-relaxed">
                    {t('landing:audiences.roles.students.desc')}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-lg">engineering</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#dfe2ee] mb-1.5">
                    {t('landing:audiences.roles.technicians.title')}
                  </h3>
                  <p className="text-xs text-[#849396] leading-relaxed">
                    {t('landing:audiences.roles.technicians.desc')}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-lg">dns</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#dfe2ee] mb-1.5">
                    {t('landing:audiences.roles.engineers.title')}
                  </h3>
                  <p className="text-xs text-[#849396] leading-relaxed">
                    {t('landing:audiences.roles.engineers.desc')}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#181c24] text-[#00e5ff] flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-lg">verified</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#dfe2ee] mb-1.5">
                    {t('landing:audiences.roles.candidates.title')}
                  </h3>
                  <p className="text-xs text-[#849396] leading-relaxed">
                    {t('landing:audiences.roles.candidates.desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer strip */}
            <div className="max-w-3xl mx-auto p-4 rounded-xl bg-[#0e1422] border border-[#334155]/60 text-center text-xs text-[#849396] leading-relaxed">
              {t('landing:audiences.disclaimer')}
            </div>
          </div>
        </section>

        {/* SECTION 10: CALL TO ACTION FINAL */}
        <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#0a0e16] to-[#070a10]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#dfe2ee] leading-tight">
              {t('landing:cta.heading')}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#bac9cc] leading-relaxed max-w-2xl mx-auto">
              {t('landing:cta.subheading')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onLaunchApp}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-bold text-sm transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.65)] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{t('landing:cta.launchBtn')}</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <a
                href="https://github.com/sheriffhomard/Netops"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#121620] hover:bg-[#181c24] text-[#dfe2ee] hover:text-[#00e5ff] border border-[#334155]/60 hover:border-[#00e5ff]/50 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>{t('landing:cta.githubBtn')}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 11: FOOTER */}
      <footer className="border-t border-[#334155]/60 bg-[#05080e] py-12 text-xs text-[#849396] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand Col */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/logo.jpg"
                  alt="NetOps Academy Logo"
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#00e5ff]/50"
                />
                <span className="font-semibold text-base text-[#dfe2ee]">
                  NetOps <span className="text-[#00e5ff]">Academy</span>
                </span>
              </div>
              <p className="text-xs text-[#849396] max-w-md leading-relaxed">
                {t('landing:footer.tagline')}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <LanguageSwitcher variant="compact" />
                <span className="text-[11px] font-mono text-[#849396]">v2.6.0-PROD</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#dfe2ee] font-mono mb-3">
                {t('landing:footer.navigation')}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('hero')}
                    className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                  >
                    {t('landing:nav.home')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('features')}
                    className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                  >
                    {t('landing:nav.features')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('learning')}
                    className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                  >
                    {t('landing:nav.learning')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('technologies')}
                    className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                  >
                    {t('landing:nav.technologies')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onLaunchApp}
                    className="text-[#00e5ff] hover:underline font-semibold cursor-pointer"
                  >
                    {t('landing:nav.launchApp')} →
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources / GitHub */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#dfe2ee] font-mono mb-3">
                {t('landing:footer.resources')}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="https://github.com/sheriffhomard/Netops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00e5ff] transition-colors inline-flex items-center gap-1"
                  >
                    <span>GitHub Repository</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('devices')}
                    className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                  >
                    PWA &amp; Hors-ligne
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-[#00e5ff] transition-colors cursor-pointer"
                  >
                    {t('landing:footer.backToTop')} ↑
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Notice Strip */}
          <div className="pt-6 border-t border-[#334155]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#849396] leading-relaxed">
            <p className="max-w-3xl">
              {t('landing:footer.disclaimerText')}
            </p>
            <p className="shrink-0 font-mono">
              © {new Date().getFullYear()} NetOps Academy. {t('landing:footer.allRightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
