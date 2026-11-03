import React from 'react';
import { usePWA } from '../context/PWAContext';

interface InstallAppButtonProps {
  className?: string;
  variant?: 'header' | 'sidebar' | 'banner' | 'modal';
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({
  className = '',
  variant = 'header',
}) => {
  const { isInstalled, installApp } = usePWA();

  if (isInstalled) {
    if (variant === 'banner') {
      return (
        <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3]">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>Application installée</span>
        </div>
      );
    }
    return null;
  }

  if (variant === 'sidebar') {
    return (
      <button
        onClick={installApp}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#00363d]/40 hover:bg-[#00363d]/70 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-mono transition-all cursor-pointer ${className}`}
        title="Installer NetOps sur votre écran d'accueil (Mobile ou Ordinateur)"
      >
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base">install_mobile</span>
          <span>Installer l'app</span>
        </span>
        <span className="text-[10px] bg-[#00e5ff]/20 px-1.5 py-0.5 rounded text-[#00e5ff] font-bold">
          PWA
        </span>
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <button
        onClick={installApp}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00daf3] to-[#0091ea] text-[#00363d] font-bold text-xs font-mono shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer ${className}`}
        title="Ajouter à l'écran d'accueil"
      >
        <span className="material-symbols-outlined text-base">download_for_offline</span>
        <span>Installer l'application</span>
      </button>
    );
  }

  // Default Header / Toolbar
  return (
    <button
      onClick={installApp}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#00363d]/40 hover:bg-[#00363d]/70 text-[#00e5ff] border border-[#00e5ff]/40 text-xs font-mono transition-all cursor-pointer shrink-0 ${className}`}
      title="Installer NetOps Academy sur votre appareil"
    >
      <span className="material-symbols-outlined text-sm">install_desktop</span>
      <span className="hidden sm:inline">Installer</span>
    </button>
  );
};

export const InstallInstructionModal: React.FC = () => {
  const { showIOSModal, setShowIOSModal, isIOS } = usePWA();

  if (!showIOSModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#181c24] border border-[#334155] rounded-2xl w-full max-w-md p-6 text-[#dfe2ee] shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#334155]/40 pb-3">
          <div className="flex items-center gap-2 text-[#00e5ff]">
            <span className="material-symbols-outlined text-2xl">install_mobile</span>
            <h3 className="font-bold text-base font-mono">Installer NetOps Academy</h3>
          </div>
          <button
            onClick={() => setShowIOSModal(false)}
            className="p-1 rounded-lg text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <p className="text-xs text-[#bac9cc] leading-relaxed">
          Installez NetOps Academy directement sur l'écran d'accueil de votre téléphone ou sur le bureau de votre ordinateur pour l'utiliser comme une application native rapide et accessible hors-ligne.
        </p>

        {isIOS ? (
          <div className="p-3.5 rounded-xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col gap-2.5 font-mono text-xs">
            <div className="font-bold text-[#00e5ff] flex items-center gap-1.5">
              <span>Sur iPhone / iPad (Safari) :</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-[#dfe2ee]/90 font-sans text-xs">
              <li>
                Appuyez sur le bouton <strong>Partager</strong> en bas de Safari (l'icône avec un carré et une flèche vers le haut).
              </li>
              <li>
                Faites défiler vers le bas et sélectionnez <strong>« Sur l'écran d'accueil »</strong> (icône avec un « + »).
              </li>
              <li>
                Appuyez sur <strong>« Ajouter »</strong> en haut à droite.
              </li>
            </ol>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#0a0e16] border border-[#334155]/50 flex flex-col gap-2.5 font-mono text-xs">
            <div className="font-bold text-[#00e5ff] flex items-center gap-1.5">
              <span>Sur Chrome, Edge ou Android :</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-[#dfe2ee]/90 font-sans text-xs">
              <li>
                Cliquez sur l'icône <strong>Installer l'application</strong> située à droite de la barre d'adresse de votre navigateur.
              </li>
              <li>
                Ou ouvrez le menu du navigateur (les 3 points) et choisissez <strong>« Installer NetOps Academy »</strong>.
              </li>
              <li>
                Confirmez en cliquant sur <strong>« Installer »</strong>.
              </li>
            </ol>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setShowIOSModal(false)}
            className="px-4 py-2 rounded-xl bg-[#00e5ff] text-[#00363d] font-bold text-xs font-mono hover:bg-[#9cf0ff] transition-colors"
          >
            Compris
          </button>
        </div>
      </div>
    </div>
  );
};
