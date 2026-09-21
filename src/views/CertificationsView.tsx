import React, { useState } from 'react';
import { CertificationItem, ViewMode } from '../types';
import { certificationsList } from '../data/mockData';

interface CertificationsViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectExam?: (examCode: string) => void;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({
  onNavigate,
  onSelectExam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCertId, setSelectedCertId] = useState<string>('ccna-200-301');

  // Filter certifications
  const filteredCerts = certificationsList.filter((cert) => {
    const matchSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchVendor = selectedVendor === 'all' || cert.vendor === selectedVendor;
    const matchLevel = selectedLevel === 'all' || cert.level === selectedLevel;

    return matchSearch && matchVendor && matchLevel;
  });

  const selectedCert =
    certificationsList.find((c) => c.id === selectedCertId) ||
    certificationsList.find((c) => c.id === 'ccna-200-301') ||
    certificationsList[0];

  const vendorPills = [
    { id: 'all', label: 'Tous les éditeurs' },
    { id: 'cisco', label: 'Cisco Systems (CCNA, CCNP, CCIE)' },
    { id: 'comptia', label: 'CompTIA (Vendor-Neutral)' },
    { id: 'juniper', label: 'Juniper Networks (Junos)' },
    { id: 'security', label: 'Sécurité Réseau & NGFW' },
    { id: 'cloud', label: 'Réseaux Cloud & Hybrides' },
  ];

  const handleLaunchCert = (cert: CertificationItem) => {
    if (onSelectExam) {
      onSelectExam(cert.code);
    }
    onNavigate('simulateur-d-examen');
  };

  return (
    <div className="flex flex-col w-full px-6 py-6 gap-6">
      {/* 1. Header Banner with Platform Metrics */}
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-[#334155]/40">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">layers</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00daf3]">
              CATALOGUE OFFICIEL &amp; BLUEPRINTS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ee] tracking-tight">
            Catalogue des Certifications Réseau &amp; Cyber
          </h1>
          <p className="text-sm text-[#bac9cc] leading-relaxed">
            Simulations conformes aux Blueprints officiels 2025. Entraînement au format QCM
            proctorisé, scénarios de glisser-déposer et labs pratiques en CLI réelle.
          </p>
        </div>

        <div className="flex items-center gap-4 self-start xl:self-auto bg-[#181c24] border border-[#334155]/50 px-5 py-3 rounded-xl shadow-lg">
          <div className="flex flex-col pr-4 border-r border-[#334155]/50">
            <span className="text-[10px] font-mono uppercase text-[#bac9cc]">Tracks Réseau</span>
            <span className="text-lg font-bold text-[#dfe2ee]">28 Tracks</span>
          </div>
          <div className="flex flex-col pr-4 border-r border-[#334155]/50">
            <span className="text-[10px] font-mono uppercase text-[#bac9cc]">Questions</span>
            <span className="text-lg font-bold text-[#00e5ff]">14 280</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-[#bac9cc]">Conformité</span>
            <span className="text-lg font-bold text-[#a8ffd2]">96.8%</span>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Bar */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#849396] text-xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer par code (ex: 200-301, ENCOR), titre, protocole..."
              className="w-full bg-[#181c24] border border-[#334155]/50 rounded-lg pl-11 pr-4 py-2.5 text-sm text-[#dfe2ee] placeholder:text-[#849396] focus:border-[#00e5ff] focus:outline-none transition-colors"
            />
          </div>

          {/* Level Dropdown */}
          <div className="w-full md:w-64">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-[#181c24] border border-[#334155]/50 rounded-lg px-3 py-2.5 text-sm text-[#dfe2ee] focus:border-[#00e5ff] focus:outline-none"
            >
              <option value="all">Niveau : Tous les niveaux</option>
              <option value="support">Support Technician</option>
              <option value="associate">Associate (CCNA, Network+, JNCIA)</option>
              <option value="professional">Professional (CCNP, PCNSE, FCP)</option>
              <option value="expert">Expert (CCIE, JNCIE, AWS Specialty)</option>
            </select>
          </div>
        </div>

        {/* Vendor Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {vendorPills.map((pill) => {
            const isSelected = selectedVendor === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedVendor(pill.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                    : 'bg-[#181c24] text-[#bac9cc] hover:bg-[#262a33] hover:text-[#dfe2ee] border border-[#334155]/40'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Main Grid: Left Catalog List (8 cols), Right Detailed Drawer (4 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Certifications Cards (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {filteredCerts.length === 0 ? (
            <div className="bg-[#181c24] border border-[#334155] p-12 rounded-xl text-center flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-4xl text-[#849396]">
                search_off
              </span>
              <p className="text-base text-[#dfe2ee] font-medium">
                Aucune certification ne correspond aux filtres sélectionnés
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedVendor('all');
                  setSelectedLevel('all');
                }}
                className="px-4 py-2 bg-[#262a33] text-xs font-mono text-[#00e5ff] rounded-lg hover:bg-[#31353e]"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCerts.map((cert) => {
                const isSelected = selectedCert.id === cert.id;
                return (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCertId(cert.id)}
                    className={`bg-[#181c24]/90 border rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between gap-4 group relative overflow-hidden ${
                      isSelected
                        ? 'border-[#00e5ff] ring-1 ring-[#00e5ff]/30 shadow-[0_0_18px_rgba(0,229,255,0.15)]'
                        : 'border-[#334155]/50 hover:border-[#00daf3]/50 hover:bg-[#181c24]'
                    }`}
                  >
                    {cert.highlight && (
                      <div className="absolute top-0 right-0 bg-[#00e5ff] text-[#00363d] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider">
                        Populaire 2025
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-[#262a33] text-[#00daf3] font-mono text-xs font-semibold border border-[#334155]/60">
                          {cert.code}
                        </span>
                        <span className="text-[10px] uppercase font-mono text-[#bac9cc] px-1.5 py-0.5 rounded bg-[#0f131c]">
                          {cert.level}
                        </span>
                        {cert.isEnrolled && (
                          <span className="text-[10px] uppercase font-mono text-[#a8ffd2] px-1.5 py-0.5 rounded bg-[#a8ffd2]/10 border border-[#a8ffd2]/30">
                            {cert.enrolledProgress === 100 ? 'Certifié' : `${cert.enrolledProgress}% En cours`}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-semibold text-[#dfe2ee] group-hover:text-[#00e5ff] transition-colors leading-snug">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-[#bac9cc] line-clamp-2">{cert.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#334155]/30 text-xs font-mono text-[#bac9cc]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#849396]">
                          schedule
                        </span>
                        {cert.durationMin} min
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#849396]">quiz</span>
                        {cert.itemsCount} items
                      </span>
                      <span className="text-[#00e5ff] flex items-center gap-0.5 font-semibold">
                        Inspecter
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Sticky Detail Drawer (4 Columns) */}
        <div className="lg:col-span-4 sticky top-20 flex flex-col gap-4">
          <div className="bg-[#181c24]/95 backdrop-blur-xl border border-[#334155] rounded-xl p-6 shadow-2xl flex flex-col gap-5">
            {/* Drawer Header */}
            <div className="flex flex-col gap-2 pb-4 border-b border-[#334155]/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#00363d] text-[#00e5ff] font-semibold border border-[#00e5ff]/30">
                  {selectedCert.code}
                </span>
                <span className="text-xs font-mono text-[#a8ffd2]">
                  Blueprint {selectedCert.blueprintVersion}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#dfe2ee] leading-tight mt-1">
                {selectedCert.name}
              </h2>
              <span className="text-xs text-[#bac9cc]">{selectedCert.tagline}</span>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-2 py-1 font-mono text-center">
              <div className="bg-[#0a0e16] p-2.5 rounded-lg border border-[#334155]/40 flex flex-col">
                <span className="text-[10px] text-[#849396] uppercase">Durée</span>
                <span className="text-xs font-bold text-[#dfe2ee]">
                  {selectedCert.durationMin} min
                </span>
              </div>
              <div className="bg-[#0a0e16] p-2.5 rounded-lg border border-[#334155]/40 flex flex-col">
                <span className="text-[10px] text-[#849396] uppercase">Seuil</span>
                <span className="text-xs font-bold text-[#a8ffd2]">
                  {selectedCert.thresholdScore}
                </span>
              </div>
              <div className="bg-[#0a0e16] p-2.5 rounded-lg border border-[#334155]/40 flex flex-col">
                <span className="text-[10px] text-[#849396] uppercase">Items</span>
                <span className="text-xs font-bold text-[#00daf3]">
                  {selectedCert.itemsCount}
                </span>
              </div>
            </div>

            {/* Blueprint Domains Breakdown */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#dfe2ee] uppercase">
                  Domaines Blueprint Officiel
                </span>
                <span className="text-[10px] font-mono text-[#00e5ff]">Pondération</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {selectedCert.domains.map((dom, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#dfe2ee] truncate pr-2">{dom.name}</span>
                      <span className="font-mono text-[#00daf3] shrink-0">{dom.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#0a0e16] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#00e5ff] to-[#5be9ad] h-full rounded-full"
                        style={{ width: `${dom.percentage * 2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness Indicator */}
            {selectedCert.readinessPct !== undefined && (
              <div className="bg-[#0a0e16] p-3.5 rounded-xl border border-[#334155]/40 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono text-[#849396]">
                    Indicateur d&apos;Admissibilité
                  </span>
                  <span className="text-xs font-medium text-[#a8ffd2]">
                    {selectedCert.readinessPct >= 80 ? 'Niveau élevé d\'admission' : 'Préparation recommandée'}
                  </span>
                </div>
                <div className="text-xl font-bold font-mono text-[#00e5ff]">
                  {selectedCert.readinessPct}%
                </div>
              </div>
            )}

            {/* Actions CTA */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => handleLaunchCert(selectedCert)}
                className="w-full py-3 px-4 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_16px_rgba(0,229,255,0.35)] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">play_circle</span>
                <span>Commencer la préparation</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => alert(`Téléchargement du Blueprint officiel ${selectedCert.name} (${selectedCert.blueprintVersion})`)}
                  className="py-2 px-3 rounded-lg bg-[#262a33] text-xs font-mono text-[#bac9cc] hover:text-[#dfe2ee] hover:bg-[#31353e] border border-[#334155] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">description</span>
                  <span>Blueprint PDF</span>
                </button>
                <button
                  onClick={() => onNavigate('simulateur-d-examen')}
                  className="py-2 px-3 rounded-lg bg-[#262a33] text-xs font-mono text-[#00daf3] hover:bg-[#31353e] border border-[#334155] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">quiz</span>
                  <span>Simulateur Blanc</span>
                </button>
              </div>
            </div>

            {/* Diagnostic Kernel Log */}
            <div className="bg-[#0a0e16]/80 p-2 rounded text-[10px] font-mono text-[#849396] border border-[#334155]/30">
              <code>
                [KERNEL] Blueprint checksum match SHA-256 (350-401-v1.2). Exam engine ready.
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
