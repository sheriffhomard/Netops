import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
  onSelectCert?: (certId: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // toggle handled by parent or opened
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickItems = [
    {
      type: 'Certification',
      title: 'Cisco CCNA 200-301',
      desc: 'Implementing and Administering Cisco Solutions (v1.1 Actif)',
      view: 'parcours-certifications' as ViewMode,
    },
    {
      type: 'Certification',
      title: 'CCNP Enterprise 350-401 ENCOR',
      desc: 'Core Routing BGP/OSPF, SDN Catalyst Center, SD-WAN',
      view: 'parcours-certifications' as ViewMode,
    },
    {
      type: 'Lab Virtuel',
      title: 'Lab 08 : Router-on-a-Stick (802.1Q Inter-VLAN)',
      desc: 'Sub-interfaces fa0/0.10, fa0/0.20 & Catalyst Trunk Fa0/24',
      view: 'terminal-lab-virtuel' as ViewMode,
    },
    {
      type: 'Atelier & Lab',
      title: 'Ateliers & Labs : Entraînement Technique Interactif',
      desc: 'Saisie exacte de commandes, Dépannage, Ordonnancement, Appariement et Mini-Labs',
      view: 'ateliers-et-labs' as ViewMode,
    },
    {
      type: 'Flashcards',
      title: 'Flashcards & Mémos (SRS Répétition Espacée)',
      desc: '1900+ Cartes d\'entraînement : Cisco CCNA (D1-D6), ENCOR (D1-D6), ENARSI (D1-D4), SCOR (D1-D3), Palo Alto, CompTIA, Juniper',
      view: 'flashcards' as ViewMode,
    },
    {
      type: 'Certification',
      title: 'Cisco CCNP Security 350-701 SCOR',
      desc: 'Security Concepts, Network Security Firewalls/VPN, Securing Cloud & SaaS (300 Cartes Flashcards)',
      view: 'flashcards' as ViewMode,
    },
    {
      type: 'Cloud',
      title: 'Encyclopédie & Glossaire Cloud d\'Entreprise',
      desc: '46 Termes Clés, Topologies Réseau Hybrides (AWS / Azure / GCP), Schémas ASCII et Matrice Comparative',
      view: 'glossaire-cloud' as ViewMode,
    },
    {
      type: 'Simulateur',
      title: 'Examen Blanc Officiel ENCOR #4',
      desc: '102 Questions chronométrées, télémétrie LSDB Type-5 OSPF',
      view: 'simulateur-d-examen' as ViewMode,
    },
    {
      type: 'RFC & Protocole',
      title: 'RFC 2328 - OSPF Version 2 (Type-5 External LSA)',
      desc: 'Calcul de Forward Address et compatibilité métriques E1/E2',
      view: 'banque-de-questions' as ViewMode,
    },
    {
      type: 'Commande IOS',
      title: 'show ip ospf database external',
      desc: 'Diagnostic des routes externes et de la Forward Address',
      view: 'terminal-lab-virtuel' as ViewMode,
    },
    {
      type: 'Analytique',
      title: 'Radar des Faiblesses & STP Analysis',
      desc: 'Spanning-tree 61%, VXLAN 68%, Routage BGP 92%',
      view: 'analytiques-de-reussite' as ViewMode,
    },
  ];

  const filtered = quickItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-[#0f131c]/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 p-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-[#181c24] border border-[#334155] rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#334155] gap-3 bg-[#1c2028]">
          <span className="material-symbols-outlined text-[#00e5ff] text-xl">search</span>
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher certif (200-301, 350-401), RFC, commande IOS ou lab..."
            className="w-full bg-transparent border-none outline-none font-mono text-sm text-[#dfe2ee] placeholder:text-[#849396] focus:ring-0"
          />
          <kbd className="bg-[#262a33] text-[#849396] px-2 py-0.5 rounded text-xs font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#334155]/30 font-sans">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#849396] font-mono">
              Aucun résultat télémétrique pour &quot;{search}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(item.view);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-[#262a33] transition-colors flex items-center justify-between group"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#31353e] text-[#00daf3]">
                      {item.type}
                    </span>
                    <span className="text-sm font-medium text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs text-[#bac9cc]">{item.desc}</span>
                </div>
                <span className="material-symbols-outlined text-sm text-[#849396] opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#0f131c] border-t border-[#334155]/40 flex items-center justify-between text-[11px] font-mono text-[#849396]">
          <span>NetOps Quick Navigation</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigation</span>
            <span>↵ Sélectionner</span>
            <span>ESC Quitter</span>
          </div>
        </div>
      </div>
    </div>
  );
};
