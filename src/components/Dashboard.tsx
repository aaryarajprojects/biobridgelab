import React, { useState } from 'react';
import { UserProgress } from '../types';
import { 
  Award, CheckCircle2, Star, BookOpen, BrainCircuit, Activity, 
  Heart, Shield, Terminal, Settings, User, Database, Trash2, 
  Lock, Sliders, RefreshCw, Eye, Sparkles, HelpCircle 
} from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onUpdateProfile?: (updates: Partial<UserProgress>) => void;
}

export default function Dashboard({ progress, onResetProgress, onUpdateProfile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'settings'>('portfolio');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [tempName, setTempName] = useState(progress.studentName || 'Student Researcher');
  const [isSavedNameAlert, setIsSavedNameAlert] = useState(false);

  // Calculate Level based on XP (e.g. 100 XP per level)
  const currentLevel = Math.max(1, Math.floor(progress.xp / 100) + 1);
  const xpInCurrentLevel = progress.xp % 100;
  const xpNeededForNextLevel = 100 - xpInCurrentLevel;

  // Compute a professional bioinformatics title/status based on XP
  let bioTitle = "Helix Pioneer";
  if (progress.xp >= 500) {
    bioTitle = "Principal Bioinformatician";
  } else if (progress.xp >= 300) {
    bioTitle = "Senior Sequence Analyst";
  } else if (progress.xp >= 150) {
    bioTitle = "Genomic Intern";
  }

  // List of all possible skills
  const skillsList = [
    { name: "Complementary Base Pairing", unlocked: progress.completedLessons.includes("dna-basics") },
    { name: "Peptide Translation Coding", unlocked: progress.completedLessons.includes("transcription-translation") },
    { name: "Database Query Indexing", unlocked: progress.completedLessons.includes("databases") },
    { name: "Sequence Identity Alignment", unlocked: progress.completedLessons.includes("alignment-basics") },
    { name: "Triplet Repeat Diagnostics", unlocked: progress.completedChallenges.includes("chal-mutation-id") || progress.completedChallenges.includes("chal-gc-calc") }
  ];

  const unlockedCount = skillsList.filter(s => s.unlocked).length;

  // Badge list
  const badges = [
    { id: "badge-novice", title: "Helix Pioneer", desc: "Completed Level 1 DNA fundamentals", icon: Heart, unlocked: progress.completedLessons.includes("dna-basics") },
    { id: "badge-diagnostician", title: "Variant Sentinel", desc: "Identified a target point mutation", icon: Shield, unlocked: progress.completedChallenges.includes("chal-mutation-id") },
    { id: "badge-expert", title: "NCBI Annotator", desc: "Searched biological open source repositories", icon: BookOpen, unlocked: progress.completedLessons.includes("databases") },
    { id: "badge-aligner", title: "Sequence Sovereign", desc: "Unlocked alignment algorithm concepts", icon: BrainCircuit, unlocked: progress.completedLessons.includes("alignment-basics") }
  ];

  const unlockedBadgesCount = badges.filter(b => b.unlocked).length;

  // Estimate local storage usage size
  const getLocalStorageSize = () => {
    try {
      const dataStr = localStorage.getItem('biobridge_lab_progress_v2') || '';
      const nameStr = localStorage.getItem('biobridge_investigator_name') || '';
      const bytes = (dataStr.length + nameStr.length) * 2; // UTF-16 characters take 2 bytes
      if (bytes === 0) return '0 B';
      if (bytes < 1024) return `${bytes} Bytes`;
      return `${(bytes / 1024).toFixed(2)} KB`;
    } catch (e) {
      return 'Unknown';
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile && tempName.trim()) {
      onUpdateProfile({ studentName: tempName.trim() });
      localStorage.setItem('biobridge_investigator_name', tempName.trim());
      setIsSavedNameAlert(true);
      setTimeout(() => setIsSavedNameAlert(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="dashboard-screen">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="dashboard-header">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Student Research Portfolio</h1>
          <p className="text-slate-500 text-sm max-w-xl">
            Track developed biotech skill trees, inspect your device's locally saved progress registry, and adjust profile configuration.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start shrink-0" id="dashboard-tabs">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-white text-teal-700 shadow-xs border border-slate-200/65'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Portfolio Metrics
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-teal-700 shadow-xs border border-slate-200/65'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Learning Data & Settings
          </button>
        </div>
      </div>

      {activeTab === 'portfolio' ? (
        <>
          {/* Main Stats Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="dashboard-stats-grid">
            {/* XP / Level Tracker */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl flex items-center gap-5 shadow-xs">
              <div className="w-14 h-14 bg-teal-50 text-teal-800 rounded-lg border border-teal-200 flex items-center justify-center text-sm font-extrabold font-mono flex-shrink-0">
                Level {currentLevel}
              </div>
              <div className="space-y-1.5 flex-grow">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">EXP Points</span>
                  <span className="font-bold text-slate-700">{progress.xp} XP Total</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${xpInCurrentLevel}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold font-mono">{xpNeededForNextLevel} XP needed for Level {currentLevel + 1}</p>
              </div>
            </div>

            {/* Lessons Completed */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl flex items-center gap-5 shadow-xs">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200/60 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Lessons Completed</span>
                <span className="text-xl font-bold text-slate-900">{progress.completedLessons.length} Modules</span>
                <span className="text-[10px] text-slate-500 block leading-none font-medium">Unlocked during path runs</span>
              </div>
            </div>

            {/* Challenges Solved */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl flex items-center gap-5 shadow-xs">
              <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-lg border border-amber-200/60 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Challenges Solved</span>
                <span className="text-xl font-bold text-slate-900">{progress.completedChallenges.length} Puzzles</span>
                <span className="text-[10px] text-slate-500 block leading-none font-medium">Olympiad exercises solved</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="dashboard-details-layout">
            {/* Skill Tree Mastered List */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-teal-600" />
                Bioinformatics Skill Tree
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Completed lessons and validated challenge solutions directly unlock structural biotechnology skill trees.
              </p>

              <div className="space-y-2 pt-2" id="skills-unlocked-list">
                {skillsList.map(skill => (
                  <div
                    key={skill.name}
                    className={`p-3 rounded-lg border text-xs flex items-center justify-between font-bold ${
                      skill.unlocked 
                        ? 'bg-emerald-50 border-emerald-200/60 text-emerald-800' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 select-none'
                    }`}
                  >
                    <span>{skill.name}</span>
                    {skill.unlocked ? (
                      <span className="flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-mono font-extrabold uppercase tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        Mastered
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full text-slate-400 font-mono font-bold">
                        Locked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Unlocked Section */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Researcher Credentials ({unlockedBadgesCount}/{badges.length})
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Earn official student researcher badges for outstanding performance in clinical simulations and theory quizzes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" id="badges-grid">
                {badges.map(badge => {
                  const IconComp = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border flex gap-3 transition-all ${
                        badge.unlocked
                          ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-3xs'
                          : 'border-slate-150 bg-slate-50/20 opacity-35 select-none'
                      }`}
                      id={`badge-card-${badge.id}`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                        badge.unlocked ? 'bg-teal-50 text-teal-800 border-teal-200' : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">{badge.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-tight font-medium">{badge.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Academic Transcript & Completed Experiments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="academic-transcript-experiments">
            {/* Completed Modules & Experiments Log */}
            <div className="lg:col-span-1 p-6 rounded-xl bg-white border border-slate-200 space-y-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <BookOpen className="w-4.5 h-4.5 text-teal-600" />
                  Academic Modules Transcript
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">M01: DNA Structure</span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        progress.completedLessons.includes("dna-basics") ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-slate-100 border border-slate-200 text-slate-400"
                      }`}>
                        {progress.completedLessons.includes("dna-basics") ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Double Helix Structure & Base Pairing</p>
                    <p className="text-[10px] text-slate-500 font-medium">Watson-Crick pairings, hydrogen bonds, and thermal stability calculation.</p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">M02: Central Dogma</span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        progress.completedLessons.includes("transcription-translation") ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-slate-100 border border-slate-200 text-slate-400"
                      }`}>
                        {progress.completedLessons.includes("transcription-translation") ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Transcription & Peptide Translation</p>
                    <p className="text-[10px] text-slate-500 font-medium">RNA translation, codon usage matrices, and synthetic peptide strand synthesis.</p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">M03: Data Repositories</span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        progress.completedLessons.includes("databases") ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-slate-100 border border-slate-200 text-slate-400"
                      }`}>
                        {progress.completedLessons.includes("databases") ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">NCBI Database & Accession Querying</p>
                    <p className="text-[10px] text-slate-500 font-medium">Querying public reference fasta genomes and metadata analysis workflows.</p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">M04: Sequence Alignment</span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        progress.completedLessons.includes("alignment-basics") ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-slate-100 border border-slate-200 text-slate-400"
                      }`}>
                        {progress.completedLessons.includes("alignment-basics") ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Needleman-Wunsch Alignment Matrix</p>
                    <p className="text-[10px] text-slate-500 font-medium">Gap penalties, matches, mismatches, and dynamic programming traceback algorithms.</p>
                  </div>
                </div>
              </div>

              {/* Saved Experiments Section */}
              <div className="pt-4 border-t border-slate-150 text-left space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-teal-600" />
                  Completed Lab Experiments ({progress.savedReports?.length || 0})
                </h3>
                {progress.savedReports && progress.savedReports.length > 0 ? (
                  <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                    {progress.savedReports.map((report, idx) => (
                      <div key={idx} className="p-2 border border-slate-100 rounded bg-slate-50 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-700 truncate max-w-[150px]">{report.experimentName}</span>
                        <span className="text-[9px] font-mono font-bold bg-slate-100 border border-slate-250 text-slate-500 px-1.5 py-0.5 rounded">
                          {(report as any).patientId ? `Patient ID: ${(report as any).patientId}` : 'Lab Test'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                    No clinical reports saved yet. Visit the Virtual Bio Lab or Clinical Simulations to analyze sequences and export academic reports.
                  </p>
                )}
              </div>
            </div>

            {/* Certificate of Computational Biology Literacy */}
            <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-slate-200 space-y-6 shadow-xs text-center flex flex-col justify-between" id="academic-certificate-section">
              <div className="space-y-2 text-left">
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-teal-600" />
                  Academic Certification Placeholder
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Upon completing modules and clinical sandboxes, this certificate documents your achievement for academic presentation or secondary school science credentials.
                </p>
              </div>

              {/* Certificate Border Design */}
              <div className="relative p-6 md:p-8 rounded-xl border-4 border-double border-teal-600 bg-slate-50/50 space-y-6 select-none overflow-hidden" id="certificate-canvas">
                {/* Watermark Helix background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
                  <div className="text-teal-900 font-black text-9xl">DNA</div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-extrabold text-teal-700 tracking-widest block uppercase">
                    BioBridge Lab • Student Science Initiative
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight font-serif italic">
                    Certificate of Computational Biology Literacy
                  </h3>
                  <div className="w-24 h-0.5 bg-teal-600 mx-auto my-3"></div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">This is to certify that student researcher</p>
                  <p className="text-base font-extrabold text-teal-850 font-serif border-b border-dashed border-slate-300 max-w-xs mx-auto pb-1 text-center">
                    {progress.studentName}
                  </p>
                </div>

                <p className="text-xs text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                  has successfully performed in-silico gene sequence transcription, computed codon translations, analyzed GC molecular strand density, aligned global sequences, and completed simulated clinical diagnostic analyses on reference genomes.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4 text-left border-t border-slate-200/80">
                  <div className="space-y-1 font-mono text-[9px] text-slate-500">
                    <div><span className="font-bold text-slate-700">EXPERIENCE LEVEL:</span> Level {currentLevel} ({progress.xp} XP)</div>
                    <div><span className="font-bold text-slate-700">MODULES MASTERED:</span> {progress.completedLessons.length} of 4</div>
                  </div>
                  <div className="space-y-1 font-mono text-[9px] text-slate-500 text-right">
                    <div><span className="font-bold text-slate-700">STATUS RANK:</span> {bioTitle}</div>
                    <div><span className="font-bold text-slate-700">VERIFICATION KEY:</span> BBL-{progress.xp}-SECURE</div>
                  </div>
                </div>

                {/* Signatures */}
                <div className="flex justify-between items-end pt-4 max-w-md mx-auto">
                  <div className="text-center font-mono text-[9px] text-slate-400 space-y-1.5">
                    <div className="w-28 border-b border-slate-300 pb-1 font-serif italic text-slate-600 text-center select-none font-bold">
                      BioBridge Lab Core
                    </div>
                    <span>Board of Education Coordinator</span>
                  </div>
                  <div className="text-center font-mono text-[9px] text-slate-400 space-y-1.5">
                    <div className="w-28 border-b border-slate-300 pb-1 font-serif italic text-teal-700 text-center select-none font-extrabold">
                      Verified Sandbox
                    </div>
                    <span>Student-Led Sandbox Registry</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all shadow-3xs"
                >
                  <Activity className="w-3.5 h-3.5" />
                  Print Portfolio Transcript
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-8 animate-fade-in" id="settings-tab-content">
          {/* Grid Layout: Profile Editor & Local Data Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Student Profile Settings */}
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <User className="w-4.5 h-4.5 text-teal-600" />
                Student Profile Settings
              </h2>

              <form onSubmit={handleSaveName} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Researcher Name</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Enter identity name..."
                      className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                  {isSavedNameAlert && (
                    <p className="text-[10px] text-emerald-600 font-bold animate-fade-in">✓ Profile identity saved successfully!</p>
                  )}
                </div>
              </form>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Current Module Level</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {([1, 2, 3, 4, 5] as const).map(num => {
                    const isActive = progress.learningLevel === num;
                    return (
                      <button
                        key={num}
                        onClick={() => onUpdateProfile?.({ learningLevel: num })}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-teal-600 text-white border-teal-600 shadow-2xs' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        L{num}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-400 font-mono leading-relaxed pt-1">
                  Adjusting this changes your persistent starting curriculum level filter.
                </p>
              </div>

              {/* Status Overview Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2">
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Research Certification Rank</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200/60 flex items-center justify-center text-teal-700 font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{bioTitle}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{progress.xp} Total Accumulated XP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Saved Registry Progress Inspector */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4.5 h-4.5 text-teal-600" />
                  Local Registry Inspector ("Learning Data")
                </h2>
                <span className="font-mono text-[10px] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-slate-500 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                  Storage Size: {getLocalStorageSize()}
                </span>
              </div>

              {/* Grid of detailed state counts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-150 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Lessons Done</span>
                  <p className="text-lg font-bold text-slate-800 font-mono mt-0.5">{progress.completedLessons.length}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-150 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Quizzes Run</span>
                  <p className="text-lg font-bold text-slate-800 font-mono mt-0.5">{progress.completedQuizzes?.length || progress.completedLessons.length}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-150 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Solved Puzzles</span>
                  <p className="text-lg font-bold text-slate-800 font-mono mt-0.5">{progress.completedChallenges.length}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-150 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Sim Completions</span>
                  <p className="text-lg font-bold text-slate-800 font-mono mt-0.5">{progress.completedSimulations?.length || 0}</p>
                </div>
              </div>

              {/* Stored Entities Detailed Views */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-600" />
                  Detailed Memory Records
                </h3>

                <div className="border border-slate-200 rounded-lg divide-y divide-slate-150 overflow-hidden text-xs">
                  {/* Row 1: Completed Lesson IDs */}
                  <div className="p-3.5 grid grid-cols-3 gap-2 bg-slate-50/40">
                    <span className="font-bold text-slate-500">Modules Completed</span>
                    <span className="col-span-2 font-mono text-slate-600 font-medium truncate break-all">
                      {progress.completedLessons.length > 0 
                        ? progress.completedLessons.join(', ') 
                        : 'No lessons logged yet'}
                    </span>
                  </div>

                  {/* Row 2: Completed Challenge IDs */}
                  <div className="p-3.5 grid grid-cols-3 gap-2">
                    <span className="font-bold text-slate-500">Olympiad Challenges</span>
                    <span className="col-span-2 font-mono text-slate-600 font-medium truncate break-all">
                      {progress.completedChallenges.length > 0 
                        ? progress.completedChallenges.join(', ') 
                        : 'No challenges solved yet'}
                    </span>
                  </div>

                  {/* Row 3: Saved Lab Reports Count */}
                  <div className="p-3.5 grid grid-cols-3 gap-2 bg-slate-50/40">
                    <span className="font-bold text-slate-500">Saved Experiments</span>
                    <span className="col-span-2 font-mono text-slate-600 font-medium">
                      {progress.savedReports && progress.savedReports.length > 0
                        ? `${progress.savedReports.length} PDF Reports (${progress.savedReports.map(r => r.experimentName).join(', ')})`
                        : 'No lab reports generated yet'}
                    </span>
                  </div>

                  {/* Row 4: Quiz Score Analytics */}
                  <div className="p-3.5 grid grid-cols-3 gap-2">
                    <span className="font-bold text-slate-500">Active Recall Quizzes</span>
                    <span className="col-span-2 font-mono text-slate-600 font-medium">
                      {progress.completedQuizzes && progress.completedQuizzes.length > 0 
                        ? `${progress.completedQuizzes.length} completed (average score: 100%)` 
                        : 'No quizzes verified yet'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Danger Zone: Reset All Stored Progress */}
              <div className="pt-6 border-t border-slate-150 space-y-3">
                <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-left space-y-1">
                    <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide">Danger Zone: Reset Local Storage</h4>
                    <p className="text-[11px] text-slate-500 leading-normal max-w-md font-medium">
                      This removes all completed lessons, badges, saved PDF lab reports, and experience score logs from this device.
                    </p>
                  </div>

                  {!showResetConfirm ? (
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="px-4 py-2 border border-rose-200 hover:border-rose-300 bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold rounded-lg cursor-pointer shadow-3xs transition-all shrink-0"
                    >
                      Reset Local Progress
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 animate-fade-in">
                      <button
                        onClick={() => {
                          onResetProgress();
                          setShowResetConfirm(false);
                          setTempName('Student Researcher');
                        }}
                        className="px-3.5 py-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-lg cursor-pointer shadow-2xs"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Note Block */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-slate-600" id="privacy-notice-block">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4.5 h-4.5 text-teal-600 shrink-0" />
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-700 leading-tight">Privacy Protected Sandbox Workspace</h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  Your learning progress is stored locally on your device. We use browser Local Storage only, meaning zero servers track your study behaviors.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[9px] font-mono font-bold bg-teal-50 border border-teal-200 text-teal-700 px-2 py-0.5 rounded-full uppercase">
              100% Client-Side
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
