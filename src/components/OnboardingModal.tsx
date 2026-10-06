import React, { useState } from 'react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  initialStep = 1,
}) => {
  const [step, setStep] = useState<number>(initialStep);
  const [hasAcknowledged, setHasAcknowledged] = useState<boolean>(false);
  const [targetCert, setTargetCert] = useState<string>('350-401 ENCOR');
  const [trainingMode, setTrainingMode] = useState<string>('mixte');

  if (!isOpen) return null;

  const handleComplete = () => {
    try {
      localStorage.setItem('netops_legal_disclaimer_accepted_v1', 'true');
      localStorage.setItem('netops_user_target_cert', targetCert);
    } catch {
      // Ignore localStorage errors
    }
    onClose();
  };

  const stepsList = [
    { num: 1, title: 'Bienvenue', icon: 'school' },
    { num: 2, title: 'Mentions Légales & Indépendance', icon: 'gavel' },
    { num: 3, title: 'Objectif d\'Étude', icon: 'flag' },
    { num: 4, title: 'Validation', icon: 'verified_user' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="bg-[#121620] border border-[#334155] rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-[#dfe2ee]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#334155]/60 bg-[#0a0e16]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
              <span className="material-symbols-outlined text-lg">
                {step === 2 ? 'gavel' : 'shield'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base font-mono text-[#00e5ff] tracking-wide flex items-center gap-2">
                <span>NetOps Academy</span>
                <span className="text-[10px] text-[#849396] font-normal px-2 py-0.5 rounded bg-[#181c24] border border-[#334155]/40">
                  Onboarding & Cadre Légal
                </span>
              </h3>
              <p className="text-[11px] text-[#849396]">
                Étape {step} sur 4 — {stepsList[step - 1].title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
            title="Fermer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="grid grid-cols-4 border-b border-[#334155]/30 bg-[#0f131c]">
          {stepsList.map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`py-2.5 px-2 flex items-center justify-center gap-1.5 text-xs font-mono transition-all border-b-2 ${
                step === s.num
                  ? 'border-[#00e5ff] text-[#00e5ff] bg-[#00363d]/20 font-bold'
                  : step > s.num
                  ? 'border-[#4edea3] text-[#4edea3] bg-transparent'
                  : 'border-transparent text-[#849396] hover:text-[#dfe2ee]'
              }`}
            >
              <span className="material-symbols-outlined text-sm hidden sm:inline">
                {step > s.num ? 'check_circle' : s.icon}
              </span>
              <span className="text-[11px] truncate">
                {s.num}. {s.title.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-xs sm:text-sm text-[#bac9cc] leading-relaxed">
          {/* STEP 1: PRESENTATION & MISSION */}
          {step === 1 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#181c24] border border-[#334155]/50">
                <img
                  src="/src/assets/images/netops_logo_1790514169496.jpg"
                  alt="NetOps Logo"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#00e5ff]/40 shrink-0"
                />
                <div>
                  <h4 className="text-base font-bold text-[#dfe2ee]">
                    Plateforme d'Entraînement Réseau & Cybersécurité
                  </h4>
                  <p className="text-xs text-[#849396]">
                    Conçue par et pour les ingénieurs réseaux, administrateurs systèmes et spécialistes sécurité.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-[#181c24]/80 border border-[#334155]/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#00e5ff] font-semibold text-xs font-mono">
                    <span className="material-symbols-outlined text-base">timer</span>
                    <span>Simulateur d'Examen</span>
                  </div>
                  <p className="text-xs text-[#849396]">
                    Conditions d'examen réelles avec chronomètre, affichage split-screen, télémétrie CLI IOS-XE / PAN-OS / FortiOS et calcul de score pondéré.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181c24]/80 border border-[#334155]/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#4edea3] font-semibold text-xs font-mono">
                    <span className="material-symbols-outlined text-base">style</span>
                    <span>2 900+ Flashcards SRS</span>
                  </div>
                  <p className="text-xs text-[#849396]">
                    Système de répétition espacée (Leitner 5 boîtes), mode Focus 3D, chronomètre Blitz 2 min pour ancrer les RFCs, ports et syntaxes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181c24]/80 border border-[#334155]/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#ffd700] font-semibold text-xs font-mono">
                    <span className="material-symbols-outlined text-base">terminal</span>
                    <span>Ateliers & Terminal CLI</span>
                  </div>
                  <p className="text-xs text-[#849396]">
                    Drills de saisie exacte sans indices, simulateur interactif pour pratiquer les commandes réelles sans équipement matériel lourd.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181c24]/80 border border-[#334155]/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#c0c1ff] font-semibold text-xs font-mono">
                    <span className="material-symbols-outlined text-base">cloud_sync</span>
                    <span>Encyclopédie & Matrice Cloud</span>
                  </div>
                  <p className="text-xs text-[#849396]">
                    Dictionnaire de 50+ concepts clés et matrice d'équivalence comparative AWS vs Azure vs GCP vs On-Premises.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#00363d]/30 border border-[#00e5ff]/30 text-xs text-[#00e5ff] flex items-start gap-2">
                <span className="material-symbols-outlined text-base shrink-0 mt-0.5">info</span>
                <span>
                  Avant d'accéder à la plateforme, veuillez prendre connaissance des mentions légales relatives à l'indépendance de ce service vis-à-vis des éditeurs officiels.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: MENTIONS LÉGALES & AVERTISSEMENT D'INDÉPENDANCE (DISCLAIMER) */}
          {step === 2 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 flex items-start gap-3 text-[#ffb4ab]">
                <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">gavel</span>
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono">
                    Avertissement Légal & Absence d'Affiliation Officielle
                  </h4>
                  <p className="text-xs text-[#dfe2ee]/90 leading-relaxed">
                    NetOps Academy est une initiative éducative <strong>strictement indépendante</strong>.
                    Veuillez lire attentivement les clauses de non-affiliation et de propriété intellectuelle ci-dessous.
                  </p>
                </div>
              </div>

              {/* Legal Clauses Container */}
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#181c24] border border-[#334155]/60 text-xs text-[#dfe2ee]/90 overflow-y-auto max-h-64 font-sans space-y-2">
                <div>
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    1. Absence totale d'affiliation et de partenariat commercial
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    NetOps Academy et ses auteurs <strong>ne sont affiliés, associés, approuvés, sponsorisés, agréés, ni officiellement liés d'aucune manière</strong> avec les sociétés et organismes émetteurs des certifications professionnelles référencées sur cette plateforme, incluant notamment :
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-[#849396] mt-1 space-y-0.5 pl-1">
                    <li><strong className="text-[#dfe2ee]">Cisco Systems, Inc.</strong> (Cisco CCNA, CCNP Enterprise, CCNP Security, CCIE, CCST)</li>
                    <li><strong className="text-[#dfe2ee]">Palo Alto Networks, Inc.</strong> (PCNSE, PAN-OS, Prisma Access/SD-WAN)</li>
                    <li><strong className="text-[#dfe2ee]">Fortinet, Inc.</strong> (Fortinet FCP, NSE, FortiGate, FortiOS)</li>
                    <li><strong className="text-[#dfe2ee]">CompTIA (Computing Technology Industry Association)</strong> (Security+, Network+)</li>
                    <li><strong className="text-[#dfe2ee]">Juniper Networks, Inc.</strong> (JNCIA-Junos, JNCIS, JNCIP, JNCIE)</li>
                    <li><strong className="text-[#dfe2ee]">Amazon Web Services, Inc. (AWS)</strong> & <strong className="text-[#dfe2ee]">Microsoft Corporation (Azure)</strong></li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-[#334155]/40">
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    2. Marques déposées et propriété intellectuelle (Fair Use)
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    Tous les noms d'examens (ex: 200-301 CCNA, 350-401 ENCOR, 350-701 SCOR, PCNSE, SY0-701, JN0-104), acronymes, marques commerciales, logos et dénominations de constructeurs cités sont la <strong>propriété exclusive de leurs détenteurs respectifs</strong>.
                    Leur mention sur NetOps Academy relève exclusivement de la désignation descriptive des programmes d'entraînement et de la citation pédagogique loyalement admise (<em>Nominative Fair Use</em>).
                  </p>
                </div>

                <div className="pt-2 border-t border-[#334155]/40">
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    3. Contenu original et respect des chartes éthiques (Anti-Dump Policy)
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    NetOps Academy <strong>ne publie, ne commercialise et n'utilise aucun « Brain Dump »</strong> ni question issue de fuites d'examens officiels. Toutes les questions, scénarios d'ateliers, fiches flashcards et schémas sont des créations originales rédigées par des ingénieurs réseau certifiés, fondées strictement sur les standards publics RFC de l'IETF et les guides d'architecture publics des constructeurs.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#334155]/40">
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    4. Limitation de responsabilité
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    La réussite aux simulations ou la mémorisation des fiches sur cette plateforme ne constitue en aucun cas une garantie de réussite aux examens réels des éditeurs et ne confère aucun diplôme officiel. L'utilisateur est seul responsable de sa préparation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: OBJECTIF & PERSONNALISATION */}
          {step === 3 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-150">
              <div>
                <h4 className="text-sm font-bold text-[#dfe2ee] font-mono uppercase tracking-wide">
                  Sélectionnez votre objectif principal de révision
                </h4>
                <p className="text-xs text-[#849396] mt-0.5">
                  Ce choix configure votre compteur d'examen et priorise les flashcards recommandées.
                </p>
              </div>

              {/* Cert Choice Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: '350-401 ENCOR', name: 'Cisco CCNP ENCOR', vendor: 'Cisco Systems', desc: 'Routage BGP, OSPF, SD-Access, SD-WAN & Automatisation' },
                  { id: '350-701 SCOR', name: 'Cisco CCNP Security SCOR', vendor: 'Cisco Systems', desc: 'Sécurité réseau, FTD, VPN, EDR Secure Endpoint & ISE' },
                  { id: '200-301 CCNA', name: 'Cisco CCNA 200-301', vendor: 'Cisco Systems', desc: 'Fondations switching, routage IP, services et sécurité' },
                  { id: 'PCNSE', name: 'Palo Alto PCNSE (PAN-OS)', vendor: 'Palo Alto Networks', desc: 'Architecture SP3, App-ID, GlobalProtect, Panorama' },
                  { id: 'FCP-FORTIGATE', name: 'Fortinet FCP FortiGate 7.4', vendor: 'Fortinet', desc: 'SD-WAN, profils UTM, IPsec, ZTNA & Haute Disponibilité HA' },
                  { id: 'SY0-701', name: 'CompTIA Security+ SY0-701', vendor: 'CompTIA', desc: 'Cybersécurité générale, gouvernance, cryptographie et menaces' },
                ].map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => setTargetCert(cert.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      targetCert === cert.id
                        ? 'bg-[#00363d]/50 border-[#00e5ff] text-[#dfe2ee] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                        : 'bg-[#181c24] border-[#334155]/40 text-[#bac9cc] hover:bg-[#262a33]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#00e5ff]">{cert.name}</span>
                      <span className="text-[10px] text-[#849396] font-mono">{cert.vendor}</span>
                    </div>
                    <p className="text-[11px] text-[#849396] line-clamp-1">{cert.desc}</p>
                  </button>
                ))}
              </div>

              {/* Training style choice */}
              <div className="pt-2">
                <label className="text-xs font-mono text-[#849396] uppercase block mb-1.5">
                  Format d'entraînement préféré :
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'flashcards', label: 'Flashcards Leitner', icon: 'style' },
                    { id: 'simulator', label: 'Examens Blancs', icon: 'timer' },
                    { id: 'mixte', label: 'Mixte (Recommandé)', icon: 'all_inclusive' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setTrainingMode(m.id)}
                      className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                        trainingMode === m.id
                          ? 'bg-[#00e5ff] text-[#00363d] font-bold border-[#00e5ff]'
                          : 'bg-[#181c24] text-[#bac9cc] border-[#334155]/40 hover:bg-[#262a33]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{m.icon}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ACKNOWLEDGMENT & COMPLETION */}
          {step === 4 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-[#00363d]/30 border border-[#00e5ff]/40 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#00e5ff]">
                  <span className="material-symbols-outlined text-xl">fact_check</span>
                  <h4 className="font-bold text-sm font-mono uppercase">
                    Récapitulatif de votre profil d'étude
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#0f131c]/60 border border-[#334155]/30">
                    <span className="text-[#849396] block text-[10px] uppercase">Objectif ciblé</span>
                    <span className="text-[#dfe2ee] font-bold">{targetCert}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0f131c]/60 border border-[#334155]/30">
                    <span className="text-[#849396] block text-[10px] uppercase">Mode de travail</span>
                    <span className="text-[#4edea3] font-bold capitalize">{trainingMode}</span>
                  </div>
                </div>
              </div>

              {/* Mandatory Checkbox */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#181c24] border border-[#334155] cursor-pointer hover:border-[#00e5ff]/60 transition-colors">
                <input
                  type="checkbox"
                  checked={hasAcknowledged}
                  onChange={(e) => setHasAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#00e5ff] bg-[#0f131c] border-[#334155] focus:ring-0 focus:outline-none cursor-pointer"
                />
                <span className="text-xs text-[#dfe2ee] leading-relaxed">
                  <strong>Engagement & Décharge légale :</strong> Je confirme avoir lu et compris les mentions d'indépendance. Je reconnais que NetOps Academy est un outil éducatif autonome sans lien officiel, parrainage ni affiliation avec Cisco Systems, Palo Alto Networks, Fortinet, CompTIA, Juniper ou tout autre constructeur cité.
                </span>
              </label>

              <div className="text-[11px] text-[#849396] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#4edea3]">verified</span>
                <span>Ces mentions restent consultables à tout moment depuis le menu latéral de l'application.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-5 sm:px-6 py-4 border-t border-[#334155]/50 bg-[#0a0e16]/80 backdrop-blur-md flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[#181c24] hover:bg-[#262a33] text-[#bac9cc] border border-[#334155]/50 flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Précédent</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <button
                onClick={() => setStep((prev) => prev + 1)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-[#00e5ff] hover:bg-[#33ebff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center gap-1.5 transition-all"
              >
                <span>{step === 1 ? 'Lire les mentions légales' : 'Continuer'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!hasAcknowledged}
                className={`px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  hasAcknowledged
                    ? 'bg-[#4edea3] hover:bg-[#68e5b2] text-[#003822] shadow-[0_0_15px_rgba(78,222,163,0.4)] cursor-pointer'
                    : 'bg-[#1e293b] text-[#64748b] border border-[#334155]/40 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span>Accéder à NetOps Academy</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
