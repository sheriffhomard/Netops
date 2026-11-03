import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

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
  const { t } = useTranslation(['common', 'settings']);
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
    { num: 1, title: t('settings:onboarding.steps.welcome'), icon: 'school' },
    { num: 2, title: t('settings:onboarding.steps.legal'), icon: 'gavel' },
    { num: 3, title: t('settings:onboarding.steps.target'), icon: 'flag' },
    { num: 4, title: t('settings:onboarding.steps.validation'), icon: 'verified_user' },
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
                  {t('settings:onboarding.badge')}
                </span>
              </h3>
              <p className="text-[11px] text-[#849396]">
                {t('settings:onboarding.stepOf', { step, title: stepsList[step - 1].title })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="menu" className="w-24 hidden sm:flex" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
              title={t('common:actions.close')}
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="grid grid-cols-4 border-b border-[#334155]/30 bg-[#0f131c]">
          {stepsList.map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`py-2.5 px-2 flex items-center justify-center gap-1.5 text-xs font-mono transition-all border-b-2 cursor-pointer ${
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
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#00e5ff]/50 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-bold text-sm text-[#dfe2ee]">
                    {t('settings:onboarding.welcome.heading')}
                  </h4>
                  <p className="text-xs text-[#849396]">
                    {t('settings:onboarding.welcome.intro')}
                  </p>
                </div>
              </div>

              {/* Three Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#181c24]/80 border border-[#334155]/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#00e5ff] font-semibold text-xs font-mono">
                    <span className="material-symbols-outlined text-base">style</span>
                    <span>2 900+ Flashcards SRS</span>
                  </div>
                  <p className="text-xs text-[#849396]">
                    {t('settings:onboarding.welcome.featureCards')}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181c24]/80 border border-[#334155]/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#ffd700] font-semibold text-xs font-mono">
                    <span className="material-symbols-outlined text-base">terminal</span>
                    <span>Ateliers &amp; CLI</span>
                  </div>
                  <p className="text-xs text-[#849396]">
                    {t('settings:onboarding.welcome.featureTerminal')}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181c24]/80 border border-[#334155]/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#c0c1ff] font-semibold text-xs font-mono">
                    <span className="material-symbols-outlined text-base">cloud_sync</span>
                    <span>Cloud Matrix</span>
                  </div>
                  <p className="text-xs text-[#849396]">
                    {t('settings:onboarding.welcome.featureCloud')}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#00363d]/30 border border-[#00e5ff]/30 text-xs text-[#00e5ff] flex items-start gap-2">
                <span className="material-symbols-outlined text-base shrink-0 mt-0.5">info</span>
                <span>
                  {t('settings:onboarding.welcome.disclaimerNotice')}
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
                    {t('settings:onboarding.legal.bannerTitle')}
                  </h4>
                  <p className="text-xs text-[#dfe2ee]/90 leading-relaxed">
                    {t('settings:onboarding.legal.bannerText')}
                  </p>
                </div>
              </div>

              {/* Legal Clauses Container */}
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#181c24] border border-[#334155]/60 text-xs text-[#dfe2ee]/90 overflow-y-auto max-h-64 font-sans space-y-2">
                <div>
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    {t('settings:onboarding.legal.clause1Title')}
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    {t('settings:onboarding.legal.clause1Text')}
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-[#849396] mt-1 space-y-0.5 pl-1">
                    <li><strong className="text-[#dfe2ee]">Cisco Systems, Inc.</strong> (Cisco CCNA, CCNP Enterprise, CCNP Security, CCIE, CCST)</li>
                    <li><strong className="text-[#dfe2ee]">Palo Alto Networks, Inc.</strong> (PCNSE, PAN-OS, Prisma Access/SD-WAN)</li>
                    <li><strong className="text-[#dfe2ee]">Fortinet, Inc.</strong> (Fortinet FCP, NSE, FortiGate, FortiOS)</li>
                    <li><strong className="text-[#dfe2ee]">CompTIA</strong> (Security+, Network+)</li>
                    <li><strong className="text-[#dfe2ee]">Juniper Networks, Inc.</strong> (JNCIA-Junos, JNCIS, JNCIP, JNCIE)</li>
                    <li><strong className="text-[#dfe2ee]">Amazon Web Services (AWS)</strong> &amp; <strong className="text-[#dfe2ee]">Microsoft Azure</strong></li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-[#334155]/40">
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    {t('settings:onboarding.legal.clause2Title')}
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    {t('settings:onboarding.legal.clause2Text')}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#334155]/40">
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    {t('settings:onboarding.legal.clause3Title')}
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    {t('settings:onboarding.legal.clause3Text')}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#334155]/40">
                  <h5 className="font-bold text-[#ffb4ab] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
                    {t('settings:onboarding.legal.clause4Title')}
                  </h5>
                  <p className="text-[#dfe2ee] text-[11px] leading-relaxed bg-[#ffb4ab]/10 p-3 rounded-lg border border-[#ffb4ab]/30">
                    {t('settings:onboarding.legal.clause4Text')}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#334155]/40">
                  <h5 className="font-bold text-[#00e5ff] font-mono text-[11px] uppercase flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    {t('settings:onboarding.legal.clause5Title')}
                  </h5>
                  <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                    {t('settings:onboarding.legal.clause5Text')}
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
                  {t('settings:onboarding.target.selectCert')}
                </h4>
                <p className="text-xs text-[#849396] mt-0.5">
                  {t('settings:onboarding.target.title')}
                </p>
              </div>

              {/* Cert Choice Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: '350-401 ENCOR', name: 'Cisco CCNP ENCOR', vendor: 'Cisco Systems', desc: 'BGP, OSPF, SD-Access, SD-WAN & Automation' },
                  { id: '350-701 SCOR', name: 'Cisco CCNP Security SCOR', vendor: 'Cisco Systems', desc: 'SAFE, FTD/FMC, VPN, ISE & Secure Endpoint' },
                  { id: '200-301 CCNA', name: 'Cisco CCNA 200-301', vendor: 'Cisco Systems', desc: 'Network Fundamentals, Switching & Routing' },
                  { id: 'PCNSE', name: 'Palo Alto PCNSE (PAN-OS)', vendor: 'Palo Alto Networks', desc: 'SP3, App-ID, GlobalProtect & Panorama' },
                  { id: 'FCP-FORTIGATE', name: 'Fortinet FCP FortiGate 7.4', vendor: 'Fortinet', desc: 'SD-WAN, UTM Profiles, IPsec & HA' },
                  { id: 'SY0-701', name: 'CompTIA Security+ SY0-701', vendor: 'CompTIA', desc: 'Threats, Cryptography & Security Operations' },
                ].map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => setTargetCert(cert.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
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
                  {t('settings:onboarding.target.selectMode')} :
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'flashcards', label: t('settings:onboarding.target.modeMixed'), icon: 'style' },
                    { id: 'simulator', label: t('settings:onboarding.target.modeExam'), icon: 'timer' },
                    { id: 'mixte', label: t('settings:onboarding.target.modeLabs'), icon: 'all_inclusive' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setTrainingMode(m.id)}
                      className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        trainingMode === m.id
                          ? 'bg-[#00e5ff] text-[#00363d] font-bold border-[#00e5ff]'
                          : 'bg-[#181c24] text-[#bac9cc] border-[#334155]/40 hover:bg-[#262a33]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{m.icon}</span>
                      <span className="truncate">{m.label}</span>
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
                    {t('settings:onboarding.validation.readyTitle')}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#0f131c]/60 border border-[#334155]/30">
                    <span className="text-[#849396] block text-[10px] uppercase">
                      {t('settings:onboarding.steps.target')}
                    </span>
                    <span className="text-[#dfe2ee] font-bold">{targetCert}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0f131c]/60 border border-[#334155]/30">
                    <span className="text-[#849396] block text-[10px] uppercase">
                      {t('settings:onboarding.target.selectMode')}
                    </span>
                    <span className="text-[#4edea3] font-bold capitalize">{trainingMode}</span>
                  </div>
                </div>
              </div>

              {/* Mandatory Checkbox */}
              <div className="flex flex-col gap-2.5">
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#181c24] border border-[#334155] cursor-pointer hover:border-[#00e5ff]/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasAcknowledged}
                    onChange={(e) => setHasAcknowledged(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#00e5ff] bg-[#0f131c] border-[#334155] focus:ring-0 focus:outline-none cursor-pointer"
                  />
                  <span className="text-xs text-[#dfe2ee] leading-relaxed">
                    <strong>{t('settings:onboarding.legal.clause1Title')} :</strong> {t('settings:onboarding.legal.checkbox')}
                  </span>
                </label>

                <div className="p-3 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 flex items-start gap-2.5 text-xs text-[#dfe2ee]">
                  <span className="material-symbols-outlined text-base text-[#ffb4ab] shrink-0 mt-0.5">verified_user</span>
                  <span>
                    <strong>{t('settings:onboarding.legal.clause4Title')} :</strong> {t('settings:onboarding.legal.clause4Text')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-5 sm:px-6 py-4 border-t border-[#334155]/50 bg-[#0a0e16]/80 backdrop-blur-md flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[#181c24] hover:bg-[#262a33] text-[#bac9cc] border border-[#334155]/50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>{t('common:actions.previous')}</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <button
                onClick={() => setStep((prev) => prev + 1)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-[#00e5ff] hover:bg-[#33ebff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{step === 1 ? t('settings:system.legalNoticeBtn') : t('common:actions.next')}</span>
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
                <span>{t('settings:onboarding.validation.startBtn')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
