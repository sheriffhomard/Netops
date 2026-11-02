import React, { useState } from 'react';
import { ViewMode } from '../types';
import { initialFlashcards } from '../data/workshopsData';
import { FlashcardsModule } from './workshops/FlashcardsModule';
import { ExactTypingModule } from './workshops/ExactTypingModule';
import { TroubleshootingModule } from './workshops/TroubleshootingModule';
import { TimelineOrderingModule } from './workshops/TimelineOrderingModule';
import { MatchingGameModule } from './workshops/MatchingGameModule';
import { GuidedMiniLabModule } from './workshops/GuidedMiniLabModule';

export type WorkshopTab =
  | 'flashcards'
  | 'exact-typing'
  | 'troubleshooting'
  | 'ordering'
  | 'matching'
  | 'mini-labs';

interface WorkshopsViewProps {
  onNavigate?: (view: ViewMode) => void;
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<WorkshopTab>('flashcards');

  const tabs: {
    id: WorkshopTab;
    label: string;
    sublabel: string;
    icon: string;
    badgeCount?: string;
  }[] = [
    {
      id: 'flashcards',
      label: 'Flashcards',
      sublabel: 'Cartes Mémo & Répétition Espacée',
      icon: 'style',
      badgeCount: `${initialFlashcards.length} Cartes`,
    },
    {
      id: 'exact-typing',
      label: 'Saisie Exacte',
      sublabel: 'CLI Sans QCM & Tolérance Syntaxique',
      icon: 'terminal',
      badgeCount: '5 Défis',
    },
    {
      id: 'troubleshooting',
      label: 'Défis de Dépannage',
      sublabel: 'Find the Bug & Diagnostic Syslog',
      icon: 'troubleshoot',
      badgeCount: '4 Incidents',
    },
    {
      id: 'ordering',
      label: 'Ordonnancement',
      sublabel: 'Timeline, DORA & Boot Order',
      icon: 'reorder',
      badgeCount: '4 Séquences',
    },
    {
      id: 'matching',
      label: 'Appariement',
      sublabel: 'Matching Games & Associations',
      icon: 'join_inner',
      badgeCount: '4 Jeux',
    },
    {
      id: 'mini-labs',
      label: 'Scénarios Guidés',
      sublabel: 'Mini-Labs Pas à Pas en Console',
      icon: 'assignment_turned_in',
      badgeCount: '2 Labs',
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 lg:pb-8 px-4 sm:px-6 py-6">
      {/* Top Banner Header */}
      <div className="bg-[#181c24] border border-[#334155]/60 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/40 font-bold">
              ATELIERS &amp; LABS INTERACTIFS
            </span>
            <span className="text-xs font-mono text-[#849396]">
              Entraînement Pratique Haute Intensité
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#dfe2ee]">
            Centre d&apos;Ateliers Réseau &amp; Labs Pratiques
          </h1>
          <p className="text-sm text-[#bac9cc] max-w-3xl leading-relaxed">
            Consolidez vos compétences d&apos;ingénieur réseau avec 6 formats d&apos;apprentissage
            interactifs : révision de protocoles par flashcards, ancrage réflexe en saisie exacte de
            commandes, analyse de bugs de configuration, ordonnancement logique de processus,
            jeux d&apos;appariement et scénarios guidés en console IOS.
          </p>
        </div>

        {/* Global Quick KPI Chips */}
        <div className="flex flex-row md:flex-col gap-2 self-start md:self-auto shrink-0 relative z-10 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/60">
            <span className="w-2 h-2 rounded-full bg-[#5be9ad]" />
            <span className="text-[#849396]">Mode Simulation :</span>
            <span className="text-[#a8ffd2] font-bold">Actif (RFC/IOS)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0e16] border border-[#334155]/60">
            <span className="material-symbols-outlined text-sm text-[#00e5ff]">school</span>
            <span className="text-[#849396]">Modules disponibles :</span>
            <span className="text-[#00e5ff] font-bold">6 Ateliers</span>
          </div>
        </div>
      </div>

      {/* Modern Segmented Tab Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 select-none relative group ${
                isActive
                  ? 'bg-[#181c24] border-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.25)]'
                  : 'bg-[#181c24]/80 border-[#334155]/50 hover:bg-[#181c24] hover:border-[#334155]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`material-symbols-outlined text-xl transition-colors ${
                    isActive ? 'text-[#00e5ff]' : 'text-[#849396] group-hover:text-[#00daf3]'
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.badgeCount && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#00363d] text-[#00e5ff] font-bold'
                        : 'bg-[#0a0e16] text-[#849396]'
                    }`}
                  >
                    {tab.badgeCount}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <span
                  className={`text-xs font-bold leading-snug transition-colors ${
                    isActive ? 'text-[#00e5ff]' : 'text-[#dfe2ee]'
                  }`}
                >
                  {tab.label}
                </span>
                <span className="text-[10px] text-[#849396] line-clamp-1 leading-normal">
                  {tab.sublabel}
                </span>
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00e5ff] rounded-t-full shadow-[0_0_8px_#00e5ff]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display Area */}
      <div className="min-h-[500px]">
        {activeTab === 'flashcards' && (
          <FlashcardsModule onOpenDedicated={() => onNavigate?.('flashcards')} />
        )}
        {activeTab === 'exact-typing' && <ExactTypingModule />}
        {activeTab === 'troubleshooting' && <TroubleshootingModule />}
        {activeTab === 'ordering' && <TimelineOrderingModule />}
        {activeTab === 'matching' && <MatchingGameModule />}
        {activeTab === 'mini-labs' && <GuidedMiniLabModule />}
      </div>
    </div>
  );
};
