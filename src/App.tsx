import React, { useState, useEffect } from 'react';
import { UserProgress, SavedReport } from './types';
import Home from './components/Home';
import LearningPath from './components/LearningPath';
import VirtualLab from './components/VirtualLab';
import ResearchSimulations from './components/ResearchSimulations';
import Challenges from './components/Challenges';
import Dashboard from './components/Dashboard';
import ResearchJourney from './components/ResearchJourney';
import { Dna, BookOpen, FlaskConical, Award, LayoutDashboard, Database, Activity, Menu, X, ArrowUpRight, Compass } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'biobridge_lab_progress_v2';

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  completedLessons: [],
  completedChallenges: [],
  unlockedSkills: [],
  simulationStep: 1,
  selectedPatientReport: null,
  completedSimulations: [],
  savedReports: []
};

export default function App() {
  const [view, setView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);

  // Load progress from localStorage on boot
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored user progress', e);
      }
    }
  }, []);

  // Save progress helper
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
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

    saveProgress({
      ...progress,
      savedReports: updatedReports,
      completedSimulations: updatedSims,
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
          <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600 group-hover:border-teal-400 transition-all">
            <Dna className="w-5 h-5 text-teal-600" id="brand-helix-icon" />
          </div>
          <div className="text-left leading-none">
            <span className="text-base font-extrabold tracking-tight text-slate-900 block">BioBridge<span className="text-teal-600">Lab</span></span>
            <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Virtual Core Facility</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60" id="desktop-navbar">
          {[
            { id: 'home', label: 'Home', icon: Dna },
            { id: 'learning', label: 'Learning Path', icon: BookOpen },
            { id: 'lab', label: 'Virtual Bio Lab', icon: FlaskConical },
            { id: 'research', label: 'Research Simulations', icon: Database },
            { id: 'challenges', label: 'Challenges', icon: Award },
            { id: 'journey', label: 'Research Journey', icon: Compass },
            { id: 'dashboard', label: 'Portfolio', icon: LayoutDashboard }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = view === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigate(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-white text-teal-700 shadow-sm border border-slate-200/50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                id={`nav-${tab.id}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Global XP Widget */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700" id="desktop-xp-widget">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Student:</span>
          <span className="font-mono font-bold text-teal-700">{progress.xp} XP</span>
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
        <div className="md:hidden border-b border-slate-200 bg-white p-4 space-y-3 animate-fade-in shadow-sm" id="mobile-navbar">
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs mb-2">
            <span className="font-semibold text-slate-500">STUDENT PROGRESS</span>
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
          </nav>
        </div>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8" id="main-view-workspace">
        {view === 'home' && <Home setView={handleNavigate} />}
        {view === 'learning' && <LearningPath progress={progress} onCompleteLesson={handleCompleteLesson} />}
        {view === 'lab' && <VirtualLab />}
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
          />
        )}
        {view === 'dashboard' && <Dashboard progress={progress} onResetProgress={handleResetProgress} />}
      </main>

      {/* Scientific Footer */}
      <footer className="border-t border-slate-200/80 bg-slate-100/50 px-4 md:px-8 py-12 text-xs text-slate-500 font-mono mt-16" id="global-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
          <div className="space-y-3 max-w-md">
            <span className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5 font-sans">
              <Dna className="w-4 h-4 text-teal-600" />
              BioBridge Lab
            </span>
            <p className="leading-relaxed text-slate-600">
              BioBridge Lab is an open educational resource. We build interactive sequence processors, biological translation models, and diagnostic pipeline sandboxes to democratize genetics literacy globally.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-700 font-sans block uppercase tracking-wider">Educational Impact Matrix</span>
            <p className="max-w-xs text-slate-600 leading-relaxed">
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

        <div className="max-w-7xl mx-auto border-t border-slate-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-[10px] text-slate-400">
          <span>© 2026 BioBridge Lab Foundation. All rights reserved. Distributed under Apache-2.0 License.</span>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Security Audits</span>
            <span className="hover:text-slate-600 cursor-pointer">GenBank Rules</span>
            <span className="hover:text-slate-600 cursor-pointer">Education Outreach</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
