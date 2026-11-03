import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdate } from '../context/UpdateContext';
import { useTheme } from '../context/ThemeContext';
import { usePWA } from '../context/PWAContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SystemSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegalDisclaimer?: () => void;
}

export const SystemSettingsModal: React.FC<SystemSettingsModalProps> = ({
  isOpen,
  onClose,
  onOpenLegalDisclaimer,
}) => {
  const { t } = useTranslation(['common', 'settings']);
  const {
    currentVersion,
    releaseDate,
    lastCheckedDate,
    isChecking,
    isUpdating,
    updateAvailable,
    autoUpdateEnabled,
    lastUpdateMessage,
    checkForUpdates,
    forceUpdate,
    toggleAutoUpdate,
    clearUpdateNotice,
  } = useUpdate();

  const { theme, setTheme, isLight } = useTheme();
  const { isInstalled, installApp } = usePWA();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="bg-[#121620] border border-[#334155] rounded-2xl w-full max-w-xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-[#dfe2ee]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#334155]/60 bg-[#0a0e16]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
              <span className="material-symbols-outlined text-lg">settings_suggest</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base font-mono text-[#00e5ff] tracking-wide flex items-center gap-2">
                <span>{t('settings:system.title')}</span>
                <span className="text-[10px] text-[#4edea3] font-normal px-2 py-0.5 rounded bg-[#003824]/60 border border-[#4edea3]/30">
                  NOC v{currentVersion}
                </span>
              </h3>
              <p className="text-[11px] text-[#849396]">
                {t('settings:system.subtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
            title={t('common:actions.close')}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-xs sm:text-sm">
          {/* Update Status Feedback Banner if present */}
          {lastUpdateMessage && (
            <div className="p-3 rounded-xl bg-[#00363d]/40 border border-[#00e5ff]/40 flex items-center justify-between gap-3 text-xs text-[#00e5ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">info</span>
                <span>{lastUpdateMessage}</span>
              </div>
              <button
                onClick={clearUpdateNotice}
                className="text-[#849396] hover:text-[#00e5ff] p-1"
                title={t('common:actions.close')}
              >
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
            </div>
          )}

          {/* SECTION 1: SYSTEM VERSION & UPDATES */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#181c24] border border-[#334155]/60">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-[#00e5ff] flex items-center gap-2">
                <span className="material-symbols-outlined text-base">update</span>
                <span>{t('settings:system.versionInfo')}</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0e16] border border-[#334155]/40 text-[#4edea3] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                {updateAvailable ? t('settings:system.updateAvailable') : t('settings:system.upToDate')}
              </span>
            </div>

            {/* Information Grid: Release Date & Last Checked */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Release Date */}
              <div className="p-3 rounded-lg bg-[#0a0e16]/80 border border-[#334155]/40 flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#849396] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">calendar_month</span>
                  <span>{t('settings:system.releaseDate')}</span>
                </span>
                <span className="text-sm font-bold font-mono text-[#dfe2ee]">
                  {releaseDate}
                </span>
                <span className="text-[10px] text-[#849396]">
                  {t('settings:system.currentVersion')} : v{currentVersion}
                </span>
              </div>

              {/* Last Checked Date */}
              <div className="p-3 rounded-lg bg-[#0a0e16]/80 border border-[#334155]/40 flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#849396] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">history</span>
                  <span>{t('settings:system.lastChecked')}</span>
                </span>
                <span className="text-xs font-bold font-mono text-[#4edea3] truncate">
                  {lastCheckedDate}
                </span>
                <span className="text-[10px] text-[#849396]">
                  {t('settings:system.autoUpdateDesc')}
                </span>
              </div>
            </div>

            {/* Action Buttons: Check for updates & Force update */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                onClick={() => checkForUpdates(true)}
                disabled={isChecking || isUpdating}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#00363d]/60 hover:bg-[#00363d] text-[#00e5ff] border border-[#00e5ff]/50 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <span
                  className={`material-symbols-outlined text-base ${
                    isChecking ? 'animate-spin' : ''
                  }`}
                >
                  sync
                </span>
                <span>
                  {isChecking ? t('settings:system.checking') : t('settings:system.btnCheckUpdates')}
                </span>
              </button>

              <button
                onClick={forceUpdate}
                disabled={isChecking || isUpdating}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#1c2028] hover:bg-[#262a33] text-[#ffb4ab] border border-[#ffb4ab]/40 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                title={t('settings:system.btnForceUpdate')}
              >
                <span
                  className={`material-symbols-outlined text-base ${
                    isUpdating ? 'animate-spin' : ''
                  }`}
                >
                  restart_alt
                </span>
                <span>
                  {isUpdating ? t('settings:system.updating') : t('settings:system.btnForceUpdate')}
                </span>
              </button>
            </div>

            {/* Automatic Background Updates Toggle */}
            <div className="pt-3 border-t border-[#334155]/40 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-xs text-[#dfe2ee] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#00daf3]">auto_mode</span>
                  <span>{t('settings:system.autoUpdateLabel')}</span>
                </span>
                <span className="text-[11px] text-[#849396]">
                  {t('settings:system.autoUpdateDesc')}
                </span>
              </div>

              <button
                onClick={toggleAutoUpdate}
                className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors cursor-pointer shrink-0 ${
                  autoUpdateEnabled ? 'bg-[#00e5ff]' : 'bg-[#31353e]'
                }`}
                aria-label={t('settings:system.autoUpdateLabel')}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#00363d] shadow transition-transform ${
                    autoUpdateEnabled ? 'translate-x-5' : 'translate-x-0 bg-[#849396]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* SECTION 2: LANGUAGE SELECTION (BILINGUAL FR / EN) */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#181c24] border border-[#334155]/60">
            <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-[#00e5ff] flex items-center gap-2">
              <span className="material-symbols-outlined text-base">translate</span>
              <span>{t('settings:system.language')}</span>
            </h4>
            <p className="text-[11px] text-[#849396]">
              {t('settings:system.languageDesc')}
            </p>

            <LanguageSwitcher variant="settings" />
          </div>

          {/* SECTION 3: APPARENCE & THÈMES (DARK / LIGHT) */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#181c24] border border-[#334155]/60">
            <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-[#00e5ff] flex items-center gap-2">
              <span className="material-symbols-outlined text-base">palette</span>
              <span>{t('settings:system.appearance')}</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {/* Dark Theme Option */}
              <button
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl border flex flex-col gap-2 transition-all text-left cursor-pointer ${
                  !isLight
                    ? 'bg-[#00363d]/40 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'bg-[#0a0e16]/60 border-[#334155]/40 text-[#849396] hover:bg-[#262a33]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-lg">dark_mode</span>
                  {!isLight && (
                    <span className="material-symbols-outlined text-sm text-[#00e5ff]">
                      check_circle
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs font-mono">{t('settings:system.themeDark')}</div>
                  <div className="text-[10px] text-[#849396] mt-0.5">
                    {t('settings:system.themeDarkDesc')}
                  </div>
                </div>
              </button>

              {/* Light Theme Option */}
              <button
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl border flex flex-col gap-2 transition-all text-left cursor-pointer ${
                  isLight
                    ? 'bg-[#00363d]/40 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'bg-[#0a0e16]/60 border-[#334155]/40 text-[#849396] hover:bg-[#262a33]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-lg">light_mode</span>
                  {isLight && (
                    <span className="material-symbols-outlined text-sm text-[#00e5ff]">
                      check_circle
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs font-mono">{t('settings:system.themeLight')}</div>
                  <div className="text-[10px] text-[#849396] mt-0.5">
                    {t('settings:system.themeLightDesc')}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 4: INSTALLATION & APPLICATION (PWA) */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#181c24] border border-[#334155]/60">
            <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-[#00e5ff] flex items-center gap-2">
              <span className="material-symbols-outlined text-base">download_for_offline</span>
              <span>{t('common:pwa.install')} (PWA)</span>
            </h4>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5 pr-3">
                <span className="font-semibold text-xs text-[#dfe2ee]">
                  {t('common:pwa.installTooltip')}
                </span>
                <span className="text-[11px] text-[#849396]">
                  {isInstalled
                    ? t('common:pwa.installed')
                    : t('common:pwa.installTooltip')}
                </span>
              </div>

              {!isInstalled ? (
                <button
                  onClick={installApp}
                  className="px-3.5 py-2 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold text-xs font-mono hover:bg-[#9cf0ff] transition-all shrink-0 cursor-pointer shadow-md"
                >
                  {t('common:actions.start')}
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#4edea3]">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>{t('common:pwa.installed')}</span>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 5: CADRE LÉGAL & INDÉPENDANCE */}
          {onOpenLegalDisclaimer && (
            <div className="p-4 rounded-xl bg-[#0a0e16]/80 border border-[#334155]/50 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-xs text-[#dfe2ee] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#00e5ff]">gavel</span>
                  <span>{t('navigation:legalNotice')}</span>
                </span>
                <span className="text-[11px] text-[#849396]">
                  {t('settings:system.legalNoticeBtn')}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenLegalDisclaimer();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#bac9cc] hover:text-[#00e5ff] border border-[#334155]/50 text-xs font-mono transition-colors cursor-pointer shrink-0"
              >
                {t('common:actions.open')}
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#334155]/60 bg-[#0a0e16]/90 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#849396]">
            NetOps Academy Architecture NOC Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] font-mono text-xs transition-colors cursor-pointer"
          >
            {t('common:actions.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
