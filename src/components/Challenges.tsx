import React, { useState } from 'react';
import { CHALLENGES, Challenge, UserProgress } from '../types';
import { 
  Award, CheckCircle2, AlertCircle, Sparkles, HelpCircle, FileText, 
  ChevronRight, Check, Activity, BookOpen, BrainCircuit, ShieldAlert, 
  Compass, ArrowLeft, RefreshCw, BarChart2, CheckCircle
} from 'lucide-react';

interface ChallengesProps {
  progress: UserProgress;
  onSolveChallenge: (challengeId: string, xpReward: number) => void;
}

export default function Challenges({ progress, onSolveChallenge }: ChallengesProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeResult, setChallengeResult] = useState<boolean | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Categories list
  const categories = [
    { name: 'All', icon: Compass, difficulty: 'All Levels' },
    { name: 'DNA Basics', icon: BookOpen, difficulty: 'Beginner' },
    { name: 'Sequence Analysis', icon: Activity, difficulty: 'Intermediate' },
    { name: 'Genetics Concepts', icon: BrainCircuit, difficulty: 'Expert' },
    { name: 'Bioinformatics Applications', icon: Award, difficulty: 'Mixed' }
  ];

  // Calculate dynamic Research Skill Score / Scientific Aptitude Index (SAI)
  const completedLessonsCount = progress.completedLessons.length;
  const completedSimulationsCount = progress.completedSimulations?.length || 0;
  const completedChallengesCount = progress.completedChallenges.length;

  const lessonsScore = completedLessonsCount * 25;
  const simulationsScore = completedSimulationsCount * 100;
  const challengesScore = completedChallengesCount * 50;
  const researchSkillScore = lessonsScore + simulationsScore + challengesScore;

  // Determine Aptitude Level
  let aptitudeTitle = 'Junior Bio-Analyst (Level I)';
  let levelColor = 'text-teal-600 bg-teal-50 border-teal-200';
  if (researchSkillScore >= 500) {
    aptitudeTitle = 'Advanced Genomics Researcher (Level III)';
    levelColor = 'text-rose-600 bg-rose-50 border-rose-200';
  } else if (researchSkillScore >= 250) {
    aptitudeTitle = 'Intermediate Bio-Informatics Specialist (Level II)';
    levelColor = 'text-amber-600 bg-amber-50 border-amber-200';
  }

  // Filter challenges
  const filteredChallenges = activeCategoryFilter === 'All'
    ? CHALLENGES
    : CHALLENGES.filter(c => c.category === activeCategoryFilter);

  const handleOpenChallenge = (chal: Challenge) => {
    setSelectedChallenge(chal);
    setSelectedAnswerIdx(null);
    setTextAnswer('');
    setChallengeSubmitted(false);
    setChallengeResult(null);
    setValidationError(null);
  };

  const handleTextChange = (val: string) => {
    setTextAnswer(val);
    if (validationError) setValidationError(null);
  };

  const handleSubmitResponse = () => {
    if (!selectedChallenge) return;

    // Check empty or invalid answers
    if (selectedChallenge.type === 'choice') {
      if (selectedAnswerIdx === null) {
        setValidationError('Please select a valid option to proceed with evaluation.');
        return;
      }
    } else {
      const sanitized = textAnswer.trim();
      if (!sanitized) {
        setValidationError('Answer field cannot be empty. Please enter your scientific finding.');
        return;
      }
    }

    setValidationError(null);
    setChallengeSubmitted(true);

    let isCorrect = false;

    if (selectedChallenge.type === 'choice') {
      isCorrect = selectedAnswerIdx === selectedChallenge.correctAnswer;
    } else {
      const studentAns = textAnswer.trim().toLowerCase().replace(/%/g, '');
      const correctAns = String(selectedChallenge.correctAnswer).trim().toLowerCase().replace(/%/g, '');
      isCorrect = studentAns === correctAns;
    }

    setChallengeResult(isCorrect);

    if (isCorrect && !progress.completedChallenges.includes(selectedChallenge.id)) {
      onSolveChallenge(selectedChallenge.id, selectedChallenge.xpReward);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="challenges-screen">
      {!selectedChallenge ? (
        <>
          {/* Scientific Header */}
          <div className="border-b border-slate-200 pb-5 space-y-1" id="challenges-header">
            <span className="text-[10px] font-mono font-bold tracking-wider text-teal-600 uppercase">Assessment & Verification Center</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Bio Challenges System</h1>
            <p className="text-slate-500 text-sm max-w-xl font-medium">
              Validate your structural biology, molecular alignment, and clinical diagnostics acumen through computational gene puzzles.
            </p>
          </div>

          {/* DYNAMIC SCORING SYSTEM CARD (Scientific Aptitude Index) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="aptitude-scoring-dashboard">
            {/* Aptitude card */}
            <div className="lg:col-span-1 p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-4 flex flex-col justify-between" id="sai-card">
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold tracking-wider text-teal-400 uppercase block">CREDENTIAL SCORECARD</span>
                <h3 className="text-sm font-bold text-slate-300">Scientific Aptitude Index (SAI)</h3>
                
                <div className="py-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{researchSkillScore}</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">PTS ACCUMULATED</span>
                </div>

                <div className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border inline-block ${levelColor}`}>
                  {aptitudeTitle}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3.5 space-y-2 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Lessons Finished:</span>
                  <span className="text-slate-200 font-bold">{completedLessonsCount} × 25 XP ({lessonsScore} pts)</span>
                </div>
                <div className="flex justify-between">
                  <span>Simulations Logged:</span>
                  <span className="text-slate-200 font-bold">{completedSimulationsCount} × 100 XP ({simulationsScore} pts)</span>
                </div>
                <div className="flex justify-between">
                  <span>Challenges Solved:</span>
                  <span className="text-slate-200 font-bold">{completedChallengesCount} × 50 XP ({challengesScore} pts)</span>
                </div>
              </div>
            </div>

            {/* Category Statistics Radar */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-4" id="category-completion-card">
              <div className="space-y-1 border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-teal-600" />
                  Category Competency Matrices
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Your real-time calibration metrics based on solved curriculum components.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="categories-stats-grid">
                {categories.slice(1).map((cat) => {
                  const catChallenges = CHALLENGES.filter(c => c.category === cat.name);
                  const solvedInCat = catChallenges.filter(c => progress.completedChallenges.includes(c.id)).length;
                  const totalInCat = catChallenges.length;
                  const percent = totalInCat > 0 ? Math.round((solvedInCat / totalInCat) * 100) : 0;
                  const CatIcon = cat.icon;

                  return (
                    <div key={cat.name} className="p-3 border border-slate-150 rounded-xl bg-slate-50/50 space-y-2 flex flex-col justify-between shadow-3xs hover:border-slate-300 transition-colors">
                      <div className="flex justify-between items-start gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-150/40">
                            <CatIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-[11px] font-extrabold text-slate-800 leading-tight">{cat.name}</h5>
                            <span className="text-[9px] font-mono text-slate-400 block font-bold">Level: {cat.difficulty}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-slate-200 border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                          {percent}%
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="w-full bg-slate-200 h-1.5 rounded-full">
                          <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${percent}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
                          <span>{solvedInCat} of {totalInCat} solved</span>
                          <span>{percent === 100 ? 'COMPLETE' : 'CALIBRATING'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CATEGORY SELECTOR TABS */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-1" id="category-filter-tabs">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = activeCategoryFilter === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategoryFilter(cat.name)}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 border-teal-600 text-white shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  id={`filter-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* CHALLENGES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="challenges-grid-display">
            {filteredChallenges.map((chal) => {
              const isSolved = progress.completedChallenges.includes(chal.id);
              return (
                <div
                  key={chal.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-500/50 hover:shadow-xs transition-all flex flex-col justify-between space-y-4 shadow-3xs relative overflow-hidden"
                  id={`challenge-card-${chal.id}`}
                >
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide border ${
                        chal.difficulty === 'Expert' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                        chal.difficulty === 'Intermediate' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                        'bg-teal-50 border-teal-200 text-teal-700'
                      }`}>
                        {chal.difficulty}
                      </span>
                      {isSolved && (
                        <span className="text-[9px] text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-md">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          VERIFIED
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide block">{chal.category}</span>
                      <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">{chal.title}</h3>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-3">{chal.description}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-150/30">
                        +{chal.xpReward} XP
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleOpenChallenge(chal)}
                      className="px-4 py-1.5 bg-slate-50 hover:bg-teal-600 hover:text-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-3xs"
                    >
                      {isSolved ? 'Review Result' : 'Begin Assessment'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Selected Active Challenge Workspace */
        <div className="space-y-6 max-w-3xl mx-auto animate-fade-in" id="challenge-workspace">
          
          {/* Back Trigger */}
          <button
            onClick={() => setSelectedChallenge(null)}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer"
            id="btn-back-to-challenges"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenges Register
          </button>

          {/* Main Challenge Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="challenge-active-frame">
            
            {/* Header metadata row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="text-left space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono font-bold text-teal-600 uppercase tracking-wider">{selectedChallenge.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase tracking-wide border ${
                    selectedChallenge.difficulty === 'Expert' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                    selectedChallenge.difficulty === 'Intermediate' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                    'bg-teal-50 border-teal-200 text-teal-700'
                  }`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">{selectedChallenge.title}</h2>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs bg-teal-50 text-teal-700 border border-teal-150/60 px-3 py-1 rounded-lg font-mono font-bold">
                  Reward: {selectedChallenge.xpReward} XP
                </span>
              </div>
            </div>

            {/* Scientific details */}
            <div className="text-left space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">RESEARCH SCENARIO</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 border border-slate-150 p-4 rounded-xl">
                  {selectedChallenge.description}
                </p>
              </div>

              {/* Sequence Display Box */}
              {selectedChallenge.initialSequence && (
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide block">TARGET SEQUENCE DATASET</h4>
                  <div className="bg-slate-900 text-teal-400 p-4 border border-slate-800 rounded-xl font-mono text-xs break-all leading-relaxed select-all shadow-inner tracking-widest relative">
                    {selectedChallenge.initialSequence}
                    <span className="absolute right-3 bottom-2 text-[8px] text-slate-600 font-bold select-none">CLICK TO SELECT ALL</span>
                  </div>
                </div>
              )}

              {/* Task instructions box */}
              <div className="p-4 bg-teal-50/50 border border-teal-150/50 rounded-xl space-y-1">
                <h5 className="text-xs font-extrabold text-teal-950 flex items-center gap-1">
                  <Compass className="w-4 h-4 text-teal-600" />
                  Analytical Instructions
                </h5>
                <p className="text-[11px] text-teal-900 leading-relaxed font-medium">
                  {selectedChallenge.instructions}
                </p>
              </div>
            </div>

            {/* Challenge Answer Form */}
            <div className="border-t border-slate-100 pt-5 text-left space-y-4" id="answer-form">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                {selectedChallenge.question || "Submit your assessment outcome:"}
              </h4>

              {/* TYPE: CHOICE (Multiple Choice) */}
              {selectedChallenge.type === 'choice' && selectedChallenge.options && (
                <div className="flex flex-col gap-2.5">
                  {selectedChallenge.options.map((opt, idx) => {
                    const isSelected = selectedAnswerIdx === idx;
                    return (
                      <button
                        key={idx}
                        disabled={challengeSubmitted}
                        onClick={() => {
                          setSelectedAnswerIdx(idx);
                          if (validationError) setValidationError(null);
                        }}
                        className={`p-3.5 border rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-2xs'
                            : challengeSubmitted
                            ? 'bg-slate-50/55 border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50/50 shadow-2xs cursor-pointer'
                        }`}
                      >
                        <span className="leading-relaxed">{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TYPE: TEXT & COMPARISON (User Types Answer) */}
              {(selectedChallenge.type === 'text' || selectedChallenge.type === 'comparison') && (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      disabled={challengeSubmitted}
                      value={textAnswer}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder={selectedChallenge.type === 'comparison' ? "e.g., 88" : "Enter your sequence response..."}
                      className="w-full p-3.5 border border-slate-200 rounded-xl text-xs font-mono font-bold bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-2xs"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {selectedChallenge.type === 'comparison' 
                      ? "Enter the raw integer value (e.g. 88), rounding decimals to the nearest percent. Do not write the percentage sign."
                      : "Type carefully in uppercase letters and verify all bases before checking."
                    }
                  </p>
                </div>
              )}

              {/* Validation Feedback Warning */}
              {validationError && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 rounded-lg animate-fade-in">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              {!challengeSubmitted ? (
                <button
                  onClick={handleSubmitResponse}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                  id="btn-evaluate-answer"
                >
                  <FileText className="w-4.5 h-4.5" />
                  Evaluate Diagnostic Answer
                </button>
              ) : (
                /* ASSESSMENT LOGS (Results with deep science content) */
                <div className="border-t border-slate-100 pt-5 space-y-4 animate-fade-in" id="evaluation-result-logs">
                  
                  {/* Results alert banner */}
                  {challengeResult ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs md:text-sm font-bold flex gap-3 shadow-3xs">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                      <div className="space-y-1">
                        <strong className="font-extrabold uppercase text-[11px] font-mono tracking-wide text-emerald-950 block">Assessment Passed • Outcome Confirmed</strong>
                        <p className="text-emerald-900 font-medium leading-relaxed">
                          Your computational alignment model is correct. You have successfully resolved this clinical gene puzzle and earned <strong className="font-extrabold">+{selectedChallenge.xpReward} XP</strong>.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-250 text-rose-800 text-xs md:text-sm font-bold flex gap-3 shadow-3xs">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                      <div className="space-y-1">
                        <strong className="font-extrabold uppercase text-[11px] font-mono tracking-wide text-rose-950 block">Calibration Failed • Mismatch Flagged</strong>
                        <p className="text-rose-900 font-medium leading-relaxed">
                          The entered findings do not match the expected biological control baseline. Please study the molecular concept below and attempt a revised alignment.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Scientific concept breakdown (Always Shown!) */}
                  <div className="p-4 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl space-y-3.5 shadow-md">
                    <div className="border-b border-slate-800 pb-2 flex justify-between items-center text-[9px] font-mono text-slate-400 font-bold">
                      <span>BIOBRIDGE VERIFIED ANSWER CONTROL KEY</span>
                      <span className="text-teal-400">STATUS: REVEALED</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-0.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800/65">
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Correct Outcome</span>
                        <p className="text-teal-300 font-mono font-extrabold break-all pt-0.5">
                          {selectedChallenge.type === 'choice' && selectedChallenge.options
                            ? selectedChallenge.options[Number(selectedChallenge.correctAnswer)]
                            : String(selectedChallenge.correctAnswer).toUpperCase()
                          }
                        </p>
                      </div>
                      
                      <div className="md:col-span-2 space-y-0.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800/65 text-left">
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Scientific Concept & Logic</span>
                        <p className="text-slate-300 font-medium leading-relaxed pt-0.5">
                          {selectedChallenge.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 leading-normal font-medium italic pt-1 border-t border-slate-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>The Scientific Concept: Molecular diagnostics depends on high-precision sequence integrity checking to identify subtle mutations.</span>
                    </div>
                  </div>

                  {/* Footer buttons inside Workspace */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {!challengeResult && (
                      <button
                        onClick={() => {
                          setChallengeSubmitted(false);
                          setSelectedAnswerIdx(null);
                          setTextAnswer('');
                          setChallengeResult(null);
                          setValidationError(null);
                        }}
                        className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer shadow-3xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reset and Recalibrate Model
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedChallenge(null)}
                      className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-3xs transition-all text-center"
                    >
                      Return to Challenges Directory
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
