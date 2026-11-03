import { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { currentUser } from './data/mockData';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useUpdate } from './context/UpdateContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { UserProfileModal } from './components/UserProfileModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { SubnetCalculatorModal } from './components/SubnetCalculatorModal';
import { OnboardingModal } from './components/OnboardingModal';
import { HamburgerMenuModal } from './components/HamburgerMenuModal';
import { SystemSettingsModal } from './components/SystemSettingsModal';
import { InstallInstructionModal } from './components/InstallAppButton';
import { DashboardView } from './views/DashboardView';
import { CertificationsView } from './views/CertificationsView';
import { ExamSimulatorView } from './views/ExamSimulatorView';
import { LabTerminalView } from './views/LabTerminalView';
import { QuestionBankView } from './views/QuestionBankView';
import { AnalyticsView } from './views/AnalyticsView';
import { WorkshopsView } from './views/WorkshopsView';
import { FlashcardsView } from './views/FlashcardsView';
import { CloudEncyclopediaView } from './views/CloudEncyclopediaView';

export function App() {
  const { user, userProfile } = useAuth();
  const { isLight, toggleTheme } = useTheme();
  const { updateAvailable } = useUpdate();
  const [currentView, setCurrentView] = useState<ViewMode>('tableau-de-bord');
  const [selectedExamCode, setSelectedExamCode] = useState<string>('350-401 ENCOR');
  const [nocMode, setNocMode] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSubnetCalcOpen, setIsSubnetCalcOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [isSystemSettingsOpen, setIsSystemSettingsOpen] = useState<boolean>(false);

  // Desktop sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('netops_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('netops_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Onboarding & Legal Disclaimer acknowledgment state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('netops_legal_disclaimer_accepted_v1') !== 'true';
    } catch {
      return true;
    }
  });
  const [onboardingInitialStep, setOnboardingInitialStep] = useState<number>(1);

  const handleOpenLegalDisclaimer = () => {
    setOnboardingInitialStep(2); // Open directly to Step 2: Mentions Légales
    setIsOnboardingOpen(true);
  };

  // Cross-linking state between Flashcards and Cloud Knowledge base
  const [cloudInitialTab, setCloudInitialTab] = useState<'glossaire' | 'encyclopedie' | 'matrice'>('encyclopedie');
  const [cloudInitialTermId, setCloudInitialTermId] = useState<string | null>(null);
  const [cloudInitialArticleId, setCloudInitialArticleId] = useState<string | null>(null);
  const [flashcardSearchQuery, setFlashcardSearchQuery] = useState<string>('');
  const [flashcardModule, setFlashcardModule] = useState<string>('all');

  // Live session elapsed timer in sidebar
  const [sessionSeconds, setSessionSeconds] = useState<number>(6120); // starts at 1h 42m

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSessionTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    return `${hours}h ${String(mins).padStart(2, '0')}m`;
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectExam = (code: string) => {
    setSelectedExamCode(code);
    setCurrentView('simulateur-d-examen');
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToFlashcards = (searchQuery?: string, moduleCode?: string) => {
    if (searchQuery !== undefined) setFlashcardSearchQuery(searchQuery);
    if (moduleCode !== undefined) setFlashcardModule(moduleCode);
    setCurrentView('flashcards');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCloudTerm = (termId: string) => {
    setCloudInitialTab('glossaire');
    setCloudInitialTermId(termId);
    setCurrentView('glossaire-cloud');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCloudArticle = (articleId: string) => {
    setCloudInitialTab('encyclopedie');
    setCloudInitialArticleId(articleId);
    setCurrentView('glossaire-cloud');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen bg-[#0f131c] text-[#dfe2ee] flex ${
        nocMode ? 'contrast-105' : ''
      }`}
    >
      {/* Mobile Top Header (for < 1024px) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#12151c]/95 backdrop-blur-xl border-b border-[#334155]/60 z-40 flex items-center justify-between px-3">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Hamburger Menu trigger button */}
          <button
            onClick={() => setIsHamburgerOpen(true)}
            className="p-1.5 rounded-lg text-[#00e5ff] hover:bg-[#262a33] transition-colors shrink-0 cursor-pointer"
            title="Menu complet des fonctionnalités par catégorie"
            aria-label="Menu principal"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>

          {currentView !== 'tableau-de-bord' && (
            <button
              onClick={() => handleNavigate('tableau-de-bord')}
              className="p-1 rounded-lg bg-[#181c24] text-[#bac9cc] hover:text-[#00e5ff] hover:bg-[#262a33] border border-[#334155]/40 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Retour au tableau de bord"
              aria-label="Retour au tableau de bord"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
          )}

          <div
            onClick={() => handleNavigate('tableau-de-bord')}
            className="flex items-center gap-2 cursor-pointer truncate"
          >
            <img
              alt="NetOps Logo"
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#00e5ff]/50 shrink-0"
              src="/logo.jpg"
              referrerPolicy="no-referrer"
            />
            <span className="font-semibold text-sm text-[#00e5ff] font-mono truncate">NetOps</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Subnet Calc trigger on mobile */}
          <button
            onClick={() => setIsSubnetCalcOpen(true)}
            className="p-1.5 rounded-lg text-[#00daf3] hover:bg-[#262a33] transition-colors"
            title="Calculateur CIDR"
          >
            <span className="material-symbols-outlined text-xl">calculate</span>
          </button>

          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-[#ffd700] hover:bg-[#262a33] transition-colors"
            title={isLight ? "Basculer en Mode Sombre NOC" : "Basculer en Thème Clair"}
          >
            <span className="material-symbols-outlined text-xl">
              {isLight ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* System Settings & Updates Trigger */}
          <button
            onClick={() => setIsSystemSettingsOpen(true)}
            className="relative p-1.5 rounded-lg text-[#00daf3] hover:bg-[#262a33] transition-colors"
            title="Paramètres Système & Mises à jour"
          >
            <span className="material-symbols-outlined text-xl">settings_suggest</span>
            {updateAvailable && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            )}
          </button>

          {/* Quick search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-lg text-[#00daf3] hover:bg-[#262a33] transition-colors"
            title="Recherche globale (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* User profile avatar */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center ml-0.5 cursor-pointer"
            title="Profil & Connexion"
          >
            <img
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#00e5ff]/50"
              src={user?.photoURL || userProfile?.photoURL || currentUser.avatarUrl}
            />
          </button>
        </div>
      </header>

      {/* Sidebar for Desktop & Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:static lg:z-auto transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/70 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <Sidebar
          currentView={currentView}
          onSelectView={handleNavigate}
          nocMode={nocMode}
          onToggleNocMode={() => setNocMode(!nocMode)}
          sessionTime={formatSessionTime(sessionSeconds)}
          globalReadiness="84.5%"
          onOpenLegalDisclaimer={handleOpenLegalDisclaimer}
          onOpenSystemSettings={() => setIsSystemSettingsOpen(true)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebarCollapse}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Layout Area with responsive left padding for collapsed/expanded sidebar */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 pt-14 lg:pt-16 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header
            user={currentUser}
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenSubnetCalc={() => setIsSubnetCalcOpen(true)}
            onOpenLegalDisclaimer={handleOpenLegalDisclaimer}
            onOpenHamburgerMenu={() => setIsHamburgerOpen(true)}
            onOpenSystemSettings={() => setIsSystemSettingsOpen(true)}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebarCollapse={handleToggleSidebarCollapse}
          />
        </div>

        {/* View Switcher Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col">
          {currentView === 'tableau-de-bord' && (
            <DashboardView
              onNavigate={handleNavigate}
              onStartDrill={() => handleNavigate('simulateur-d-examen')}
              onOpenSubnetCalc={() => setIsSubnetCalcOpen(true)}
              onOpenLegalDisclaimer={handleOpenLegalDisclaimer}
            />
          )}

          {/* Flashcards View: retained in DOM to preserve Leitner session, search queries & card filters */}
          <div className={currentView === 'flashcards' ? 'flex flex-col flex-1 w-full' : 'hidden'}>
            <FlashcardsView
              onNavigate={handleNavigate}
              initialSearchQuery={flashcardSearchQuery}
              initialModule={flashcardModule}
              onOpenCloudTerm={handleOpenCloudTerm}
              onOpenCloudArticle={handleOpenCloudArticle}
            />
          </div>

          {/* Cloud Encyclopedia: retained in DOM to preserve reading position, article history & filters */}
          <div className={currentView === 'glossaire-cloud' ? 'flex flex-col flex-1 w-full' : 'hidden'}>
            <CloudEncyclopediaView
              onNavigate={handleNavigate}
              onNavigateToFlashcards={handleNavigateToFlashcards}
              initialTab={cloudInitialTab}
              initialTermId={cloudInitialTermId}
              initialArticleId={cloudInitialArticleId}
            />
          </div>

          {currentView === 'ateliers-et-labs' && (
            <WorkshopsView onNavigate={handleNavigate} />
          )}

          {currentView === 'parcours-certifications' && (
            <CertificationsView
              onNavigate={handleNavigate}
              onSelectExam={handleSelectExam}
            />
          )}

          {/* Exam Simulator: strictly retained to prevent wiping running timer, answers and scratchpad */}
          <div className={currentView === 'simulateur-d-examen' ? 'flex flex-col flex-1 w-full' : 'hidden'}>
            <ExamSimulatorView
              onNavigate={handleNavigate}
              examCode={selectedExamCode}
            />
          </div>

          {/* Lab Virtual Terminal: strictly retained to prevent wiping active CLI commands, topology & logs */}
          <div className={currentView === 'terminal-lab-virtuel' ? 'flex flex-col flex-1 w-full' : 'hidden'}>
            <LabTerminalView onNavigate={handleNavigate} />
          </div>

          {currentView === 'banque-de-questions' && (
            <QuestionBankView
              onNavigate={handleNavigate}
              onSelectCert={handleSelectExam}
            />
          )}

          {currentView === 'analytiques-de-reussite' && (
            <AnalyticsView onNavigate={handleNavigate} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (for < 1024px) */}
      <MobileBottomNav
        currentView={currentView}
        onSelectView={handleNavigate}
        onToggleMenu={() => setIsHamburgerOpen((prev) => !prev)}
        isMenuOpen={isHamburgerOpen}
      />

      {/* Modals */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <SubnetCalculatorModal
        isOpen={isSubnetCalcOpen}
        onClose={() => setIsSubnetCalcOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenLegalDisclaimer={handleOpenLegalDisclaimer}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        initialStep={onboardingInitialStep}
      />

      <HamburgerMenuModal
        isOpen={isHamburgerOpen}
        onClose={() => setIsHamburgerOpen(false)}
        currentView={currentView}
        onSelectView={handleNavigate}
        onOpenSubnetCalc={() => setIsSubnetCalcOpen(true)}
        onOpenSystemSettings={() => setIsSystemSettingsOpen(true)}
        onOpenLegalDisclaimer={handleOpenLegalDisclaimer}
      />

      <SystemSettingsModal
        isOpen={isSystemSettingsOpen}
        onClose={() => setIsSystemSettingsOpen(false)}
        onOpenLegalDisclaimer={handleOpenLegalDisclaimer}
      />

      <InstallInstructionModal />
    </div>
  );
}

export default App;
