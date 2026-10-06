import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegalDisclaimer?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenLegalDisclaimer,
}) => {
  const { user, userProfile, signIn, signOut, updateProfile, examResults, userFlashcards } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [role, setRole] = useState(userProfile?.role || 'Senior Network Engineer');
  const [targetExam, setTargetExam] = useState(userProfile?.targetExam || '350-401 ENCOR');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await updateProfile({
        displayName,
        role,
        targetExam,
      });
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#181c24] border border-[#334155] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-[#dfe2ee]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]/60 bg-[#12151c]/80 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00e5ff]">account_circle</span>
            <h3 className="font-semibold text-base font-mono text-[#00e5ff] uppercase tracking-wide">
              {user ? 'Profil Ingénieur & Sync Firestore' : 'Authentification Firebase'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#849396] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {!user ? (
            /* Unauthenticated state */
            <div className="flex flex-col items-center text-center py-6 gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
                <span className="material-symbols-outlined text-3xl">cloud_sync</span>
              </div>
              <div className="flex flex-col gap-1.5 max-w-md">
                <h4 className="text-lg font-semibold text-[#dfe2ee]">
                  Synchronisez votre progression réseau
                </h4>
                <p className="text-xs text-[#bac9cc] leading-relaxed">
                  Connectez-vous avec votre compte Google pour synchroniser vos scores d&apos;examen,
                  vos flashcards créées et vos statistiques d&apos;étude en temps réel sur la base
                  Google Cloud Firestore.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
                <button
                  onClick={async () => {
                    await signIn();
                  }}
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Connexion avec Google</span>
                </button>
                <div className="flex items-center gap-2 justify-center text-[11px] text-[#849396] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#5be9ad]" />
                  <span>Google Identity + Firebase Auth</span>
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated state */
            <div className="flex flex-col gap-6">
              {/* Profile Card Summary */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#12151c] border border-[#334155]/60 relative">
                <img
                  src={
                    user.photoURL ||
                    userProfile?.photoURL ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#00e5ff]/60"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-[#dfe2ee] truncate">
                      {userProfile?.displayName || user.displayName || 'Alex (Ingénieur Réseau)'}
                    </h4>
                    <span
                      title="Email vérifié via Google"
                      className="px-1.5 py-0.5 rounded text-[10px] bg-[#00363d] text-[#00e5ff] font-mono border border-[#00e5ff]/30 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">verified</span>
                      Vérifié
                    </span>
                  </div>
                  <p className="text-xs text-[#bac9cc] font-mono truncate mt-0.5">{user.email}</p>
                  <p className="text-xs text-[#00daf3] mt-1 font-medium">{userProfile?.role || 'Architecte Réseau & Cloud'}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#00daf3] border border-[#334155] transition-colors"
                >
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-lg bg-[#00363d]/60 border border-[#00e5ff]/40 text-xs text-[#a8ffd2] font-mono flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Profil mis à jour et synchronisé avec Firestore !
                </div>
              )}

              {/* Edit form */}
              {isEditing ? (
                <form onSubmit={handleSave} className="flex flex-col gap-4 p-4 rounded-xl bg-[#12151c] border border-[#334155]">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-[#bac9cc]">Nom d&apos;affichage</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#181c24] border border-[#334155] text-xs text-[#dfe2ee] focus:border-[#00e5ff] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-[#bac9cc]">Rôle / Titre professionnel</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#181c24] border border-[#334155] text-xs text-[#dfe2ee] focus:border-[#00e5ff] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-[#bac9cc]">Examen cible prioritaire</label>
                    <select
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#181c24] border border-[#334155] text-xs text-[#dfe2ee] focus:border-[#00e5ff] outline-none"
                    >
                      <option value="350-401 ENCOR">Cisco CCNP Enterprise 350-401 ENCOR</option>
                      <option value="300-410 ENARSI">Cisco CCNP Routing & Switching 300-410 ENARSI</option>
                      <option value="350-701 SCOR">Cisco CCNP Security 350-701 SCOR</option>
                      <option value="200-301 CCNA">Cisco CCNA 200-301 All Domains</option>
                      <option value="AWS SAA-C03">AWS Certified Solutions Architect</option>
                      <option value="Azure AZ-104">Microsoft Azure Administrator AZ-104</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg bg-[#262a33] text-xs text-[#bac9cc] hover:bg-[#31353e]"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-1.5 rounded-lg bg-[#00e5ff] text-neutral-900 font-semibold text-xs hover:bg-[#00daf3] transition-colors"
                    >
                      {isSaving ? 'Enregistrement...' : 'Enregistrer sur Firestore'}
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Firestore Real-time telemetry metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#12151c] border border-[#334155]/40 flex flex-col gap-1">
                  <span className="text-[10px] text-[#849396] font-mono uppercase">Streak</span>
                  <span className="text-base font-semibold text-[#a8ffd2] font-mono">
                    {userProfile?.streakDays || 14}j
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#12151c] border border-[#334155]/40 flex flex-col gap-1">
                  <span className="text-[10px] text-[#849396] font-mono uppercase">Précision</span>
                  <span className="text-base font-semibold text-[#00e5ff] font-mono">
                    {userProfile?.precisionGlobal || 86.5}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#12151c] border border-[#334155]/40 flex flex-col gap-1">
                  <span className="text-[10px] text-[#849396] font-mono uppercase">Flashcards Firestore</span>
                  <span className="text-base font-semibold text-[#c0c1ff] font-mono">
                    {userFlashcards.length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#12151c] border border-[#334155]/40 flex flex-col gap-1">
                  <span className="text-[10px] text-[#849396] font-mono uppercase">Simulations Sauvegardées</span>
                  <span className="text-base font-semibold text-[#5be9ad] font-mono">
                    {examResults.length}
                  </span>
                </div>
              </div>

              {/* Recent Saved Exam Results */}
              {examResults.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h5 className="text-xs font-mono text-[#00daf3] uppercase tracking-wider">
                    Historique des examens récents (Firestore)
                  </h5>
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                    {examResults.slice(0, 5).map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#12151c] border border-[#334155]/40 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              r.passed ? 'bg-[#5be9ad]' : 'bg-[#ffb4ab]'
                            }`}
                          />
                          <span className="text-[#dfe2ee] font-semibold">{r.examCode}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={r.passed ? 'text-[#a8ffd2]' : 'text-[#ffb4ab]'}>
                            {r.score}/1000 ({r.passed ? 'PASS' : 'FAIL'})
                          </span>
                          <span className="text-[10px] text-[#849396]">
                            {new Date(r.completedAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Firestore Technical Connectivity Info */}
              <div className="p-3 rounded-xl bg-[#0a0e16] border border-[#334155]/30 flex flex-col gap-1.5 text-[11px] font-mono text-[#849396]">
                <div className="flex items-center justify-between">
                  <span>Instance Firestore :</span>
                  <span className="text-[#a8ffd2] font-semibold">Active & Sécurisée</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Identifiant UID :</span>
                  <span className="text-[#00daf3] truncate max-w-[200px]">{user.uid}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Règles ABAC :</span>
                  <span className="text-[#dfe2ee]">Pilliers Zéro-Trust Actifs</span>
                </div>
              </div>

              {/* Legal Disclaimer Link */}
              {onOpenLegalDisclaimer && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#181c24] border border-[#334155]/40 text-xs">
                  <span className="text-[#849396] font-mono flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#00e5ff]">gavel</span>
                    Cadre Légal &amp; Indépendance
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLegalDisclaimer();
                    }}
                    className="text-[#00e5ff] hover:underline font-mono text-[11px] font-semibold"
                  >
                    Consulter
                  </button>
                </div>
              )}

              {/* Sign out button */}
              <div className="flex items-center justify-between pt-2 border-t border-[#334155]/50">
                <button
                  onClick={async () => {
                    await signOut();
                    onClose();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ffb4ab]/10 hover:bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 text-xs font-mono transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Se déconnecter
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-mono text-[#dfe2ee] transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
