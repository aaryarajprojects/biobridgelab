import React from 'react';
import { UserProgress } from '../types';
import { Award, CheckCircle2, Star, BookOpen, BrainCircuit, Activity, Heart, Shield, Terminal } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export default function Dashboard({ progress, onResetProgress }: DashboardProps) {
  // Calculate Level based on XP (e.g. 100 XP per level)
  const currentLevel = Math.max(1, Math.floor(progress.xp / 100) + 1);
  const xpInCurrentLevel = progress.xp % 100;
  const xpNeededForNextLevel = 100 - xpInCurrentLevel;

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

  return (
    <div className="space-y-8 animate-fade-in" id="dashboard-screen">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="dashboard-header">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Student Research Portfolio</h1>
          <p className="text-slate-500 text-sm max-w-xl">
            Track your developed bioinformatics skill trees, unlocked credentials, and experience points as you advance through biology sandbox tasks.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to reset your local research logs? This action is irreversible.')) {
              onResetProgress();
            }
          }}
          className="text-slate-400 hover:text-rose-700 text-xs font-bold self-start border border-slate-200 hover:border-rose-200 p-2 rounded bg-white transition-all cursor-pointer shadow-3xs hover:bg-rose-50/50"
        >
          Reset Portfolio Logs
        </button>
      </div>

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
    </div>
  );
}
