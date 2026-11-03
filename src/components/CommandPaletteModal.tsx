import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
}

interface PaletteItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  icon: string;
  view: ViewMode;
  badge?: string;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { t, i18n } = useTranslation(['common', 'navigation', 'flashcards', 'exams']);
  const isEn = i18n.language === 'en';
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const catPages = isEn ? 'Pages' : 'Pages';
  const catCerts = isEn ? 'Certifications' : 'Certifications';
  const catTools = isEn ? 'Network Tools' : 'Outils Réseau';
  const catSRS = isEn ? 'Flashcards & SRS' : 'Flashcards & SRS';

  const items: PaletteItem[] = [
    // Navigation / Pages
    {
      id: 'page-dashboard',
      category: catPages,
      title: isEn ? 'Dashboard & NOC' : 'Tableau de bord',
      desc: isEn ? 'Overview, active study sessions, goals and key metrics' : "Vue d'ensemble, activité en cours, objectifs et métriques clés",
      icon: 'dashboard',
      view: 'tableau-de-bord',
    },
    {
      id: 'page-flashcards',
      category: catPages,
      title: isEn ? 'Flashcards & Leitner SRS' : 'Flashcards & Mémos (SRS)',
      desc: isEn ? '2,900+ active recall flashcards with Leitner spaced repetition' : '2 900+ fiches de révision active avec répétition espacée Leitner',
      icon: 'style',
      view: 'flashcards',
      badge: '2900+',
    },
    {
      id: 'page-cloud',
      category: catPages,
      title: isEn ? 'Cloud Encyclopedia & Glossary' : 'Encyclopédie Cloud & Glossaire',
      desc: isEn ? 'Direct Connect / ExpressRoute topologies, ASCII schematics and matrix' : 'Topologies Direct Connect / ExpressRoute, schémas ASCII et comparatif',
      icon: 'cloud_sync',
      view: 'glossaire-cloud',
      badge: 'NEW',
    },
    {
      id: 'page-simulator',
      category: catPages,
      title: isEn ? 'Exam Simulator' : "Simulateur d'Examen",
      desc: isEn ? 'Timed proctored simulation with vendor-grade scoring models' : "Entraînement proctorisé chronométré avec notation conforme au score réel",
      icon: 'check_circle',
      view: 'simulateur-d-examen',
    },
    {
      id: 'page-workshops',
      category: catPages,
      title: isEn ? 'Workshops & Hands-on Labs' : 'Ateliers & Labs Pratiques',
      desc: isEn ? 'Exact IOS CLI syntax input, step sequencing and fault injection' : 'Saisie exacte de commandes IOS, dépannage avec injection de pannes',
      icon: 'science',
      view: 'ateliers-et-labs',
    },
    {
      id: 'page-terminal',
      category: catPages,
      title: isEn ? 'Virtual Terminal & Lab' : 'Terminal & Lab Virtuel',
      desc: isEn ? 'Interactive Cisco IOS-XE terminal with TAB auto-completion' : 'Console Cisco IOS-XE interactive avec auto-complétion TAB',
      icon: 'terminal',
      view: 'terminal-lab-virtuel',
    },
    {
      id: 'page-questions',
      category: catPages,
      title: isEn ? 'Question Bank' : 'Banque de Questions',
      desc: isEn ? 'Detailed MCQ explanations, certification domain filters' : 'QCM commentés, filtres par domaine de certification et explications',
      icon: 'database',
      view: 'banque-de-questions',
    },
    {
      id: 'page-analytics',
      category: catPages,
      title: isEn ? 'Success Analytics' : 'Analytiques de Réussite',
      desc: isEn ? 'Weakness radar chart, historical scores and readiness forecast' : 'Radar des faiblesses, historique des scores et courbe de progression',
      icon: 'monitoring',
      view: 'analytiques-de-reussite',
    },

    // Certifications
    {
      id: 'cert-ccna',
      category: 'Certifications',
      title: 'Cisco CCNA 200-301 v1.1',
      desc: '6 domaines complets : Network Fundamentals, IP Connectivity, Security, Automation',
      icon: 'school',
      view: 'parcours-certifications',
    },
    {
      id: 'cert-encor',
      category: 'Certifications',
      title: 'Cisco CCNP Enterprise 350-401 ENCOR',
      desc: 'Architecture, Virtualisation, Routage avancé BGP/OSPF, Sécurité d\'infrastructure',
      icon: 'school',
      view: 'parcours-certifications',
    },
    {
      id: 'cert-scor',
      category: 'Certifications',
      title: 'Cisco CCNP Security 350-701 SCOR',
      desc: 'Security Concepts, Network Security, Cloud Security, Content Security (600 Flashcards)',
      icon: 'shield',
      view: 'parcours-certifications',
      badge: '600 cartes',
    },
    {
      id: 'cert-pcnse',
      category: 'Certifications',
      title: 'Palo Alto Networks PCNSE (PAN-OS 11.x)',
      desc: 'Plan, Deploy, Configure, Manage, Troubleshoot NGFW & Prisma Access (600 Flashcards)',
      icon: 'security',
      view: 'parcours-certifications',
      badge: '600 cartes',
    },
    {
      id: 'cert-fortinet',
      category: 'Certifications',
      title: 'Fortinet FCP FortiGate 7.4',
      desc: 'FortiOS 7.4, Firewall Policies, SSL Inspection, IPsec VPN, HA Cluster (100 Flashcards)',
      icon: 'vpn_lock',
      view: 'parcours-certifications',
      badge: '100 cartes',
    },
    {
      id: 'cert-comptia-sec',
      category: 'Certifications',
      title: 'CompTIA Security+ SY0-701',
      desc: 'General Security Concepts, Threats & Vulnerabilities, Security Architecture, Operations',
      icon: 'verified_user',
      view: 'parcours-certifications',
    },
    {
      id: 'cert-jncia',
      category: 'Certifications',
      title: 'Juniper Networks JNCIA-Junos (JN0-105)',
      desc: 'Junos OS Fundamentals, User Interfaces, Routing Policy, Firewall Filters',
      icon: 'hub',
      view: 'parcours-certifications',
    },

    // Network Tools
    {
      id: 'tool-cidr',
      category: catTools,
      title: isEn ? 'CIDR / VLSM Calculator' : 'Calculateur CIDR / VLSM',
      desc: isEn ? 'IPv4 subnetting, /24 to /30 masks, network and broadcast addresses' : 'Découpage de sous-réseaux IPv4, masques /24 à /30, adresses réseau et broadcast',
      icon: 'calculate',
      view: 'tableau-de-bord',
    },
    {
      id: 'tool-terminal-bgp',
      category: catTools,
      title: isEn ? 'BGP Multi-homing Lab' : 'Simulation BGP Multi-homing',
      desc: isEn ? 'eBGP sessions validation, AS-Path prepending and Local-Preference attributes' : 'Validation des sessions eBGP, AS-Path prepending et attributs Local-Preference',
      icon: 'terminal',
      view: 'terminal-lab-virtuel',
    },
    {
      id: 'tool-cloud-matrix',
      category: catTools,
      title: isEn ? 'Multi-Cloud Comparative Matrix' : 'Matrice Comparative Multi-Cloud',
      desc: isEn ? 'AWS vs Azure vs Google Cloud vs CNCF networking service equivalence' : 'Correspondance des services réseau AWS vs Azure vs Google Cloud vs CNCF',
      icon: 'compare_arrows',
      view: 'glossaire-cloud',
    },

    // Flashcards & SRS
    {
      id: 'flash-blitz',
      category: catSRS,
      title: isEn ? 'Chrono Blitz Challenge (2 min)' : 'Défi Chrono Blitz (2 minutes)',
      desc: isEn ? 'Timed high-intensity sprint to sharpen reflex memorization' : 'Session intensive chronométrée pour stimuler la mémorisation réflexe',
      icon: 'timer',
      view: 'flashcards',
    },
    {
      id: 'flash-due',
      category: catSRS,
      title: isEn ? 'Today SRS Spaced Reviews' : 'Révisions espacées du jour (SRS)',
      desc: isEn ? 'Priority review cards scheduled by Leitner spacing algorithm' : "Cartes à revoir prioritaires déterminées par l'algorithme d'espacement",
      icon: 'psychology',
      view: 'flashcards',
    },
  ];

  const categories = ['all', catPages, catCerts, catTools, catSRS];

  const filtered = items.filter((item) => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = search.toLowerCase().trim();
    if (!query) return matchCategory;
    const matchText =
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchCategory && matchText;
  });

  // Reset selected index when search or filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search, activeCategory]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          onNavigate(filtered[selectedIndex].view);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0f131c]/80 backdrop-blur-md z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#181c24] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#334155] gap-3 bg-[#1c2028]">
          <span className="material-symbols-outlined text-[#00e5ff] text-xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isEn
                ? 'Search cert (CCNA, PCNSE, FCP), IOS CLI command, lab...'
                : 'Rechercher certif (CCNA, PCNSE, FCP), commande IOS, lab...'
            }
            className="w-full bg-transparent border-none outline-none font-mono text-sm text-[#dfe2ee] placeholder:text-[#849396] focus:ring-0"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="p-1 rounded text-[#849396] hover:text-[#dfe2ee]"
              title={isEn ? 'Clear' : 'Effacer'}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          <kbd className="bg-[#262a33] text-[#849396] px-2 py-0.5 rounded text-xs font-mono shrink-0">
            {isEn ? 'ESC' : 'ÉCHAP'}
          </kbd>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#334155]/40 bg-[#12151c]/60 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#00e5ff] text-[#00363d] font-semibold'
                  : 'text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33]'
              }`}
            >
              {cat === 'all' ? (isEn ? 'All' : 'Tout') : cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-[#334155]/20 font-sans flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#849396] font-mono flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#3b494c]">manage_search</span>
              <span>
                {isEn ? `No results found for "${search}"` : `Aucun résultat trouvé pour "${search}"`}
              </span>
              <span className="text-xs text-[#849396]">
                {isEn
                  ? 'Try keywords like "CCNA", "PCNSE", "BGP" or "Flashcards"'
                  : 'Essayez avec un mot-clé comme "CCNA", "PCNSE", "BGP" ou "Flashcards"'}
              </span>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.view);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[#262a33] border-l-2 border-[#00e5ff]'
                      : 'hover:bg-[#262a33]/60'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-[#00363d] text-[#00e5ff]'
                          : 'bg-[#181c24] text-[#849396]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1c2028] text-[#849396]">
                          {item.category}
                        </span>
                        <span
                          className={`text-sm font-medium transition-colors truncate ${
                            isSelected ? 'text-[#00e5ff]' : 'text-[#dfe2ee]'
                          }`}
                        >
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#00363d] text-[#00e5ff]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#bac9cc] truncate mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`material-symbols-outlined text-sm transition-opacity shrink-0 ml-2 ${
                      isSelected ? 'text-[#00e5ff] opacity-100' : 'text-[#849396] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    arrow_forward
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#0f131c] border-t border-[#334155]/40 flex items-center justify-between text-[11px] font-mono text-[#849396] shrink-0">
          <span className="truncate">
            {isEn ? 'NetOps Command Palette' : 'Palette de commandes NetOps'}
          </span>
          <div className="flex items-center gap-3 shrink-0">
            <span>↑↓ {isEn ? 'Navigate' : 'Déplacer'}</span>
            <span>↵ {isEn ? 'Open' : 'Ouvrir'}</span>
            <span>{isEn ? 'ESC Exit' : 'ÉCHAP Quitter'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
