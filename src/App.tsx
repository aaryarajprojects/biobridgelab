import React, { useState, useEffect } from 'react';
import { UserProgress, SavedReport } from './types';
import Home from './components/Home';
import LearningPath from './components/LearningPath';
import VirtualLab from './components/VirtualLab';
import ResearchSimulations from './components/ResearchSimulations';
import Challenges from './components/Challenges';
import Dashboard from './components/Dashboard';
import ResearchJourney from './components/ResearchJourney';
import { 
  Dna, BookOpen, FlaskConical, Award, LayoutDashboard, Database, 
  Activity, Menu, X, ArrowUpRight, Compass, Lock, Download, RefreshCw 
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'biobridge_lab_progress_v2';

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  completedLessons: [],
  completedChallenges: [],
  unlockedSkills: [],
  simulationStep: 1,
  selectedPatientReport: null,
  completedSimulations: [],
  savedReports: [],
  studentName: 'Student Researcher',
  learningLevel: 1,
  researchJourneyStatus: 'Beginner',
  completedQuizzes: [],
  quizScores: {},
  simulationHistory: []
};

export default function App() {
  const [view, setView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);

  // PWA Support State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    // Register Service Worker for Offline Caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('[PWA] Service Worker registered scope:', registration.scope);
        
        // Listen for new service worker installation updates
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available; trigger PWA update notification
                setShowUpdateBanner(true);
              }
            });
          }
        });
      }).catch((err) => {
        console.error('[PWA] Service Worker registration failed:', err);
      });
    }

    // Handle BeforeInstallPrompt Event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Check if user previously dismissed the custom banner in localStorage
      const isDismissed = localStorage.getItem('dismissed_biobridge_install_banner') === 'true';
      if (!isDismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track successfully completed installations
    const handleAppInstalled = () => {
      console.log('[PWA] BioBridge Lab successfully installed.');
      setIsStandalone(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] Install choice outcome: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismissInstallBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem('dismissed_biobridge_install_banner', 'true');
  };

  const handleApplyUpdate = () => {
    window.location.reload();
  };

  // Load progress from localStorage on boot
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) {
          // Robust data migration and corruption prevention:
          setProgress({
            xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
            completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
            completedChallenges: Array.isArray(parsed.completedChallenges) ? parsed.completedChallenges : [],
            unlockedSkills: Array.isArray(parsed.unlockedSkills) ? parsed.unlockedSkills : [],
            simulationStep: typeof parsed.simulationStep === 'number' ? parsed.simulationStep : 1,
            selectedPatientReport: parsed.selectedPatientReport || null,
            completedSimulations: Array.isArray(parsed.completedSimulations) ? parsed.completedSimulations : [],
            savedReports: Array.isArray(parsed.savedReports) ? parsed.savedReports : [],
            studentName: typeof parsed.studentName === 'string' ? parsed.studentName : 'Student Researcher',
            learningLevel: [1, 2, 3, 4].includes(parsed.learningLevel) ? parsed.learningLevel : 1,
            researchJourneyStatus: typeof parsed.researchJourneyStatus === 'string' ? parsed.researchJourneyStatus : 'Beginner',
            completedQuizzes: Array.isArray(parsed.completedQuizzes) ? parsed.completedQuizzes : [],
            quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
            simulationHistory: Array.isArray(parsed.simulationHistory) ? parsed.simulationHistory : []
          });
          return;
        }
      } catch (e) {
        console.error('Failed to parse stored user progress, resetting to default', e);
      }
    }
    // Set default initial profile if none exists or if it was corrupted
    saveProgress(INITIAL_PROGRESS);
  }, []);

  // Save progress helper
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error('Browser storage quota exceeded or unavailable', e);
    }
  };

  const handleUpdateProfile = (updates: Partial<UserProgress>) => {
    const updated = {
      ...progress,
      ...updates
    };
    saveProgress(updated);
  };

  const handleCompleteQuiz = (lessonId: string, score: number, total: number, correctAnswers: number) => {
    const completedQuizzes = progress.completedQuizzes || [];
    const updatedQuizzes = completedQuizzes.includes(lessonId) 
      ? completedQuizzes 
      : [...completedQuizzes, lessonId];
      
    const currentScores = progress.quizScores || {};
    const updatedScores = {
      ...currentScores,
      [lessonId]: { score, total, correctAnswers }
    };

    saveProgress({
      ...progress,
      completedQuizzes: updatedQuizzes,
      quizScores: updatedScores
    });
  };

  const handleCompleteLesson = (lessonId: string, xpReward: number) => {
    if (progress.completedLessons.includes(lessonId)) return;
    
    const updatedLessons = [...progress.completedLessons, lessonId];
    const updatedXP = progress.xp + xpReward;

    // Check skill unlocks
    const updatedSkills = [...progress.unlockedSkills];
    if (lessonId === 'dna-basics' && !updatedSkills.includes('Complementary Pairing')) {
      updatedSkills.push('Complementary Pairing');
    }
    if (lessonId === 'transcription-translation' && !updatedSkills.includes('Genetic Translation')) {
      updatedSkills.push('Genetic Translation');
    }

    saveProgress({
      ...progress,
      completedLessons: updatedLessons,
      unlockedSkills: updatedSkills,
      xp: updatedXP
    });
  };

  const handleSolveChallenge = (challengeId: string, xpReward: number) => {
    if (progress.completedChallenges.includes(challengeId)) return;

    const updatedChallenges = [...progress.completedChallenges, challengeId];
    const updatedXP = progress.xp + xpReward;

    saveProgress({
      ...progress,
      completedChallenges: updatedChallenges,
      xp: updatedXP
    });
  };

  const handleResetProgress = () => {
    localStorage.removeItem('biobridge_investigator_name');
    saveProgress(INITIAL_PROGRESS);
  };

  const handleSaveReport = (report: SavedReport) => {
    const currentReports = progress.savedReports || [];
    if (currentReports.some(r => r.id === report.id)) return;
    const updatedReports = [...currentReports, report];
    
    // Grant XP if they haven't saved this simulation before
    let xpReward = 0;
    const currentSims = progress.completedSimulations || [];
    const simId = report.experimentName === "DNA Sequence Comparison" ? "comparison" : 
                  report.experimentName === "Mutation Explorer" ? "mutation" : "huntington";
    
    const isNewSim = !currentSims.includes(simId);
    if (isNewSim) {
      xpReward = 150; // Grant 150 XP for completed experiment simulation!
    }

    const updatedSims = [...currentSims];
    if (!updatedSims.includes(simId)) {
      updatedSims.push(simId);
    }

    // Add to simulation history
    const updatedHistory = progress.simulationHistory || [];
    const newHistory = [
      ...updatedHistory,
      {
        simId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        outcome: `Saved Report: ${report.researchQuestion}`
      }
    ];

    saveProgress({
      ...progress,
      savedReports: updatedReports,
      completedSimulations: updatedSims,
      simulationHistory: newHistory,
      xp: progress.xp + xpReward
    });
  };

  const handleDeleteReport = (reportId: string) => {
    const updatedReports = (progress.savedReports || []).filter(r => r.id !== reportId);
    saveProgress({
      ...progress,
      savedReports: updatedReports
    });
  };

  const handleCompleteSimulation = (simId: string) => {
    const updatedSims = progress.completedSimulations || [];
    if (!updatedSims.includes(simId)) {
      const newSims = [...updatedSims, simId];
      saveProgress({
        ...progress,
        completedSimulations: newSims,
        xp: progress.xp + 50 // some basic completion XP
      });
    }
  };

  const handleNavigate = (targetView: string) => {
    setView(targetView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-teal-100 selection:text-teal-900" id="biobridge-lab-app-root">
      {/* Header / Brand Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between max-w-7xl mx-auto w-full" id="global-header">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="brand-logo-container"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600 group-hover:border-teal-400 transition-all overflow-hidden p-0.5">
            <img 
              src="/biobridge_logo.jpg" 
              alt="BioBridge Logo" 
              className="w-8 h-8 object-contain" 
              id="brand-logo-img"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left leading-none">
            <span className="text-base font-extrabold tracking-tight text-slate-900 block">BioBridge<span className="text-teal-600">Lab</span></span>
            <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Virtual Core Facility</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60" id="desktop-navbar">
          {[
            { id: 'home', label: 'Home', shortLabel: 'Home', icon: Dna },
            { id: 'learning', label: 'Learning Path', shortLabel: 'Learning', icon: BookOpen },
            { id: 'lab', label: 'Virtual Bio Lab', shortLabel: 'Bio Lab', icon: FlaskConical },
            { id: 'research', label: 'Research Simulations', shortLabel: 'Research', icon: Database },
            { id: 'challenges', label: 'Challenges', shortLabel: 'Challenges', icon: Award },
            { id: 'journey', label: 'Research Journey', shortLabel: 'Journey', icon: Compass },
            { id: 'dashboard', label: 'Portfolio', shortLabel: 'Portfolio', icon: LayoutDashboard }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = view === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigate(tab.id)}
                title={tab.label}
                className={`px-2 lg:px-3 py-1.5 rounded-lg font-bold text-[10px] lg:text-xs flex items-center gap-1 lg:gap-1.5 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-white text-teal-700 shadow-sm border border-slate-200/50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                id={`nav-${tab.id}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{tab.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Chrome PWA Install Support Button & Global XP Widget */}
        <div className="flex items-center gap-2">
          {deferredPrompt && (
            <button
              onClick={handleInstallApp}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-teal-50 border border-teal-200 hover:border-teal-300 text-teal-700 hover:text-teal-800 rounded-xl text-[10px] lg:text-xs font-extrabold cursor-pointer transition-all shadow-3xs hover:scale-[1.02] active:scale-[0.98]"
              id="pwa-header-install-btn"
            >
              <Download className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>Install App</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700" id="desktop-xp-widget">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider hidden lg:inline">{progress.studentName || 'Student Researcher'}:</span>
            <span className="font-mono font-bold text-teal-700">{progress.xp} XP</span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
          id="mobile-menu-trigger"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40" 
            onClick={() => setMobileMenuOpen(false)}
            id="mobile-navbar-overlay"
          />
          
          <div 
            className="md:hidden fixed top-[74px] inset-x-4 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 animate-fade-in shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08),0_0_15px_rgba(13,148,136,0.04)] z-50 max-h-[80vh] overflow-y-auto transition-all" 
            id="mobile-navbar"
          >
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs mb-2">
              <span className="font-semibold text-slate-500">{progress.studentName || 'RESEARCHER'} PROGRESS</span>
              <span className="font-bold text-teal-700">{progress.xp} XP Earned</span>
            </div>
            
            <nav className="flex flex-col gap-1.5" id="mobile-nav-links">
              {[
                { id: 'home', label: 'Home', icon: Dna },
                { id: 'learning', label: 'Learning Path', icon: BookOpen },
                { id: 'lab', label: 'Virtual Bio Lab', icon: FlaskConical },
                { id: 'research', label: 'Research Simulations', icon: Database },
                { id: 'challenges', label: 'Challenges', icon: Award },
                { id: 'journey', label: 'Research Journey', icon: Compass },
                { id: 'dashboard', label: 'My Portfolio', icon: LayoutDashboard }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = view === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavigate(tab.id)}
                    className={`w-full p-3 rounded-lg text-left text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-teal-50 text-teal-900 border border-teal-100' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    id={`mobile-nav-${tab.id}`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-900' : 'text-slate-400'}`} />
                    {tab.label}
                  </button>
                );
              })}

              {/* Mobile Install Option */}
              {deferredPrompt && (
                <button
                  onClick={() => {
                    handleInstallApp();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 p-3 rounded-lg text-left text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer bg-teal-600 text-white border border-teal-700 shadow-sm"
                  id="mobile-nav-install"
                >
                  <Download className="w-4 h-4 text-teal-100 animate-pulse" />
                  <span>Install BioBridge Lab</span>
                </button>
              )}
            </nav>
          </div>
        </>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8" id="main-view-workspace">
        {view === 'home' && <Home setView={handleNavigate} />}
        {view === 'learning' && (
          <LearningPath 
            progress={progress} 
            onCompleteLesson={handleCompleteLesson} 
            onUpdateProfile={handleUpdateProfile}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}
        {view === 'lab' && (
          <VirtualLab 
            progress={progress} 
            onSaveReport={handleSaveReport} 
          />
        )}
        {view === 'research' && (
          <ResearchSimulations 
            progress={progress} 
            onSaveReport={handleSaveReport} 
            onCompleteSimulation={handleCompleteSimulation} 
          />
        )}
        {view === 'challenges' && <Challenges progress={progress} onSolveChallenge={handleSolveChallenge} />}
        {view === 'journey' && (
          <ResearchJourney 
            progress={progress} 
            onResetProgress={handleResetProgress} 
            onDeleteReport={handleDeleteReport} 
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {view === 'dashboard' && (
          <Dashboard 
            progress={progress} 
            onResetProgress={handleResetProgress} 
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Scientific Footer */}
      <footer className="border-t border-slate-200/80 bg-slate-100/50 px-4 md:px-8 py-12 text-xs text-slate-500 font-mono mt-16" id="global-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
          <div className="space-y-3 max-w-md">
            <span className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5 font-sans">
              <Dna className="w-4 h-4 text-teal-600" />
              BioBridge Lab
            </span>
            <p className="leading-relaxed text-slate-600 font-sans text-xs">
              BioBridge Lab is an open educational resource. We build interactive sequence processors, biological translation models, and diagnostic pipeline sandboxes to democratize genetics literacy globally.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-700 font-sans block uppercase tracking-wider">Educational Impact Matrix</span>
            <p className="max-w-xs text-slate-600 leading-relaxed font-sans text-xs">
              Foundational laboratory assets can cost schools upwards of $150k annually. BioBridge Lab provides 100% free virtual equivalent pipelines, removing educational access barriers.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-700 font-sans block uppercase tracking-wider flex items-center gap-1">
              Open Repositories
              <ArrowUpRight className="w-3.5 h-3.5 text-teal-600" />
            </span>
            <span className="block text-[10px] text-slate-500">NCBI GenBank Standards</span>
            <span className="block text-[10px] text-slate-500">UniProt Knowledgebase</span>
            <span className="block text-[10px] text-slate-500">NCBI BLAST Services</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-[10px] text-slate-400 font-sans">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            © 2026 BioBridge Lab Foundation. Your learning progress is stored locally on your device.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Security Audits</span>
            <span className="hover:text-slate-600 cursor-pointer">GenBank Rules</span>
            <span className="hover:text-slate-600 cursor-pointer">Education Outreach</span>
          </div>
        </div>
      </footer>

      {/* Floating PWA Install & Update Banner Notifications */}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 max-w-sm space-y-3" id="pwa-banners-container">
        {/* Custom Install Prompt Banner */}
        {showInstallBanner && deferredPrompt && (
          <div 
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xl flex gap-4 animate-fade-in text-left relative"
            id="pwa-custom-install-banner"
          >
            <button 
              onClick={handleDismissInstallBanner}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
              id="pwa-dismiss-banner-btn"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-150 flex items-center justify-center shrink-0 overflow-hidden">
              <img 
                src="/biobridge_logo.jpg" 
                alt="BioBridge Logo" 
                className="w-9 h-9 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2.5">
              <div className="space-y-1 pr-4">
                <h4 className="text-xs font-black text-slate-900 tracking-tight">Install BioBridge Lab</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">
                  Access your virtual bioinformatics learning lab anytime directly from your desktop or home screen with fast offline access.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleInstallApp}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-extrabold rounded-lg cursor-pointer shadow-2xs transition-all"
                  id="pwa-banner-install-btn"
                >
                  Install
                </button>
                <button
                  onClick={handleDismissInstallBanner}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-extrabold rounded-lg cursor-pointer transition-all"
                  id="pwa-banner-later-btn"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Notification Banner */}
        {showUpdateBanner && (
          <div 
            className="p-4 bg-teal-950 border border-teal-800 text-teal-100 rounded-xl shadow-xl flex items-center gap-3 animate-slide-up text-left"
            id="pwa-update-banner"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-900 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-teal-300 animate-spin" />
            </div>
            <div className="flex-grow space-y-0.5">
              <h4 className="text-[11px] font-extrabold tracking-tight">New BioBridge Lab update available</h4>
              <p className="text-[9px] text-teal-300 font-medium">Reload to activate scientific sandbox enhancements.</p>
            </div>
            <button
              onClick={handleApplyUpdate}
              className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-extrabold rounded-lg cursor-pointer shadow-3xs transition-all"
              id="pwa-update-apply-btn"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
