import { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { currentUser } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { SubnetCalculatorModal } from './components/SubnetCalculatorModal';
import { DashboardView } from './views/DashboardView';
import { CertificationsView } from './views/CertificationsView';
import { ExamSimulatorView } from './views/ExamSimulatorView';
import { LabTerminalView } from './views/LabTerminalView';
import { QuestionBankView } from './views/QuestionBankView';
import { AnalyticsView } from './views/AnalyticsView';
import { WorkshopsView } from './views/WorkshopsView';
import { FlashcardsView } from './views/FlashcardsView';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('tableau-de-bord');
  const [selectedExamCode, setSelectedExamCode] = useState<string>('350-401 ENCOR');
  const [nocMode, setNocMode] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSubnetCalcOpen, setIsSubnetCalcOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  return (
    <div
      className={`min-h-screen bg-[#0f131c] text-[#dfe2ee] flex ${
        nocMode ? 'contrast-105' : ''
      }`}
    >
      {/* Mobile Top Header (for < 1024px) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#181c24] border-b border-[#334155] z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#bac9cc] hover:bg-[#262a33]"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <span className="font-semibold text-sm text-[#00e5ff] font-mono">NetOps Academy</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-lg text-[#00daf3] hover:bg-[#262a33]"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <img
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover"
            src={currentUser.avatarUrl}
          />
        </div>
      </div>

      {/* Sidebar for Desktop & Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:static lg:z-auto transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 lg:hidden"
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
        />
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 pt-14 lg:pt-16">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header
            user={currentUser}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenSubnetCalc={() => setIsSubnetCalcOpen(true)}
          />
        </div>

        {/* View Switcher */}
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col">
          {currentView === 'tableau-de-bord' && (
            <DashboardView
              onNavigate={handleNavigate}
              onStartDrill={() => handleNavigate('simulateur-d-examen')}
              onOpenSubnetCalc={() => setIsSubnetCalcOpen(true)}
            />
          )}

          {currentView === 'flashcards' && (
            <FlashcardsView onNavigate={handleNavigate} />
          )}

          {currentView === 'ateliers-et-labs' && (
            <WorkshopsView onNavigate={handleNavigate} />
          )}

          {currentView === 'parcours-certifications' && (
            <CertificationsView
              onNavigate={handleNavigate}
              onSelectExam={handleSelectExam}
            />
          )}

          {currentView === 'simulateur-d-examen' && (
            <ExamSimulatorView
              onNavigate={handleNavigate}
              examCode={selectedExamCode}
            />
          )}

          {currentView === 'terminal-lab-virtuel' && (
            <LabTerminalView onNavigate={handleNavigate} />
          )}

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
    </div>
  );
}

export default App;
