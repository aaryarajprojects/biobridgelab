import React, { useState } from 'react';
import { UserProgress, SavedReport } from '../types';
import { 
  User, Award, BookOpen, BrainCircuit, Activity, Heart, Shield, 
  Terminal, Sparkles, FileText, Calendar, CheckCircle2, Map, Clock, 
  ChevronRight, ArrowUpRight, HelpCircle, Eye, Trash2, Microscope, Compass 
} from 'lucide-react';

interface ResearchJourneyProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onDeleteReport?: (reportId: string) => void;
  onUpdateProfile?: (updates: Partial<UserProgress>) => void;
}

export default function ResearchJourney({ progress, onResetProgress, onDeleteReport, onUpdateProfile }: ResearchJourneyProps) {
  const [investigatorName, setInvestigatorName] = useState<string>(() => {
    return progress.studentName || localStorage.getItem('biobridge_investigator_name') || 'Ayush Kumar';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState<string | null>(null);

  const saveName = (name: string) => {
    setInvestigatorName(name);
    localStorage.setItem('biobridge_investigator_name', name);
    onUpdateProfile?.({ studentName: name });
    setIsEditingName(false);
  };

  // 1. Calculate Level & Progress metrics
  const totalXp = progress.xp;
  let bioLevel: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
  if (totalXp >= 400) {
    bioLevel = 'Advanced';
  } else if (totalXp >= 200) {
    bioLevel = 'Intermediate';
  }

  // Calculate learning progress percentage
  // 5 lessons + 8 challenges + 3 simulations = 16 total activities
  const totalPossibleActivities = 16;
  const completedLessonsCount = progress.completedLessons.length;
  const completedChallengesCount = progress.completedChallenges.length;
  const completedSimsCount = progress.completedSimulations?.length || 0;
  const totalCompletedActivities = completedLessonsCount + completedChallengesCount + completedSimsCount;
  const progressPercentage = Math.round((totalCompletedActivities / totalPossibleActivities) * 100);

  // 2. Define Dynamic Skill Progress based on Completed Activities
  const hasDnaBasics = progress.completedLessons.includes("dna-basics");
  const hasTransTranslation = progress.completedLessons.includes("transcription-translation");
  const hasAlignmentBasics = progress.completedLessons.includes("alignment-basics");
  const hasDatabases = progress.completedLessons.includes("databases");
  const hasSequencingTech = progress.completedLessons.includes("sequencing-tech");
  
  const hasGcCalc = progress.completedChallenges.includes("chal-gc-calc");
  const hasCompStrand = progress.completedChallenges.includes("chal-comp-strand");
  const hasMutId = progress.completedChallenges.includes("chal-mutation-id");
  const hasSeqSimilarity = progress.completedChallenges.includes("chal-seq-similarity");
  const hasFindOrf = progress.completedChallenges.includes("chal-find-orf");
  const hasOrfLen = progress.completedChallenges.includes("chal-orf-len");
  const hasRoleGene = progress.completedChallenges.includes("chal-role-gene");
  const hasCapillaryElect = progress.completedChallenges.includes("chal-capillary-elect");

  const hasSimComp = progress.completedSimulations?.includes("comparison") || false;
  const hasSimMut = progress.completedSimulations?.includes("mutation") || false;
  const hasSimHunt = progress.completedSimulations?.includes("huntington") || false;

  // SKILLS PROGRESS FORMULAS
  // DNA Fundamentals: dna-basics (35%) + transcription-translation (35%) + chal-comp-strand (30%)
  const dnaFundamentalsProgress = (hasDnaBasics ? 35 : 0) + (hasTransTranslation ? 35 : 0) + (hasCompStrand ? 30 : 0);

  // Sequence Analysis: alignment-basics (30%) + sim-comparison (30%) + chal-mutation-id (20%) + chal-seq-similarity (20%)
  const seqAnalysisProgress = (hasAlignmentBasics ? 30 : 0) + (hasSimComp ? 30 : 0) + (hasMutId ? 20 : 0) + (hasSeqSimilarity ? 20 : 0);

  // Genomics Concepts: sequencing-tech (30%) + sim-mutation (30%) + chal-find-orf (20%) + chal-orf-len (10%) + chal-gc-calc (10%)
  const genomicsProgress = (hasSequencingTech ? 30 : 0) + (hasSimMut ? 30 : 0) + (hasFindOrf ? 20 : 0) + (hasOrfLen ? 10 : 0) + (hasGcCalc ? 10 : 0);

  // Research Methods: databases (30%) + sim-huntington (50%) + chal-role-gene (10%) + chal-capillary-elect (10%)
  const researchMethodsProgress = (hasDatabases ? 30 : 0) + (hasSimHunt ? 50 : 0) + (hasRoleGene ? 10 : 0) + (hasCapillaryElect ? 10 : 0);

  const skills = [
    {
      id: "dna-fund",
      name: "DNA Fundamentals",
      percentage: dnaFundamentalsProgress,
      description: "Understanding double helix base pairing, hydrogen bonds, and nucleotide-to-codon translation structures.",
      indicators: [
        { label: "Basic Structure", completed: hasDnaBasics },
        { label: "Transcription Coding", completed: hasTransTranslation },
        { label: "Complementary Strand", completed: hasCompStrand }
      ]
    },
    {
      id: "seq-anal",
      name: "Sequence Analysis",
      percentage: seqAnalysisProgress,
      description: "Evaluating sequence alignment, counting mismatches, and parsing local vs. global base alignment matches.",
      indicators: [
        { label: "Alignment Theory", completed: hasAlignmentBasics },
        { label: "Comparative Runs", completed: hasSimComp },
        { label: "Mutation Identification", completed: hasMutId },
        { label: "Similarity Assessment", completed: hasSeqSimilarity }
      ]
    },
    {
      id: "gen-conc",
      name: "Genomics Concepts",
      percentage: genomicsProgress,
      description: "Calculating sequence GC percentages, identifying gene Open Reading Frames, and mapping code frame shifts.",
      indicators: [
        { label: "Sequencing Tech", completed: hasSequencingTech },
        { label: "ORF Detection", completed: hasFindOrf },
        { label: "GC Content Analysis", completed: hasGcCalc },
        { label: "ORF Length Translation", completed: hasOrfLen },
        { label: "Mutational Explorer", completed: hasSimMut }
      ]
    },
    {
      id: "res-meth",
      name: "Research Methods",
      percentage: researchMethodsProgress,
      description: "Querying molecular repositories (like NCBI), documenting diagnostic conclusions, and designing clinical PCR scans.",
      indicators: [
        { label: "Repository Indexing", completed: hasDatabases },
        { label: "Diagnostic Pipeline", completed: hasSimHunt },
        { label: "Functional Gene Role", completed: hasRoleGene },
        { label: "Capillary Electrophoresis", completed: hasCapillaryElect }
      ]
    }
  ];

  // 3. Completed Activities History List
  const activitiesHistory: { title: string; category: string; date: string; summary: string }[] = [];

  if (hasDnaBasics) {
    activitiesHistory.push({
      title: "Completed Lesson: Introduction to DNA Structure",
      category: "Theory Modules",
      date: "Module Finished",
      summary: "Learned core Watson-Crick base pairing dynamics (A-T, C-G) and backbone structures."
    });
  }
  if (hasTransTranslation) {
    activitiesHistory.push({
      title: "Completed Lesson: Transcription and Translation",
      category: "Theory Modules",
      date: "Module Finished",
      summary: "Studied mRNA transcription, codon translation, and mapped standard peptide synthesis lists."
    });
  }
  if (hasDatabases) {
    activitiesHistory.push({
      title: "Completed Lesson: Biological Repositories",
      category: "Theory Modules",
      date: "Module Finished",
      summary: "Learned FASTA structures and NCBI database query parameters."
    });
  }
  if (hasAlignmentBasics) {
    activitiesHistory.push({
      title: "Completed Lesson: Sequence Alignment Basics",
      category: "Theory Modules",
      date: "Module Finished",
      summary: "Examined local vs. global molecular sequence alignment and substitution matrix scoring."
    });
  }
  if (hasSequencingTech) {
    activitiesHistory.push({
      title: "Completed Lesson: DNA Sequencing Technologies",
      category: "Theory Modules",
      date: "Module Finished",
      summary: "Discovered Sanger Sequencing and modern Next-Generation Sequencing (NGS) methodologies."
    });
  }

  // Challenges
  if (hasGcCalc) {
    activitiesHistory.push({
      title: "Solved Challenge: Analyze the Thermophile Gene",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Calculated 50% GC percentage of the thermophile sequence and explained heat stability."
    });
  }
  if (hasCompStrand) {
    activitiesHistory.push({
      title: "Solved Challenge: Complementary Strand Synthesis",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Synthesized complementary base sequence (TCGATCG) from baseline template strand."
    });
  }
  if (hasMutId) {
    activitiesHistory.push({
      title: "Solved Challenge: Diagnose the Mutation",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Identified single nucleotide polymorphism (SNP) at position 8 (C mutated to G)."
    });
  }
  if (hasSeqSimilarity) {
    activitiesHistory.push({
      title: "Solved Challenge: Sequence Alignment Similarity",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Calculated sequence homology and alignment similarity of 88% between given strands."
    });
  }
  if (hasFindOrf) {
    activitiesHistory.push({
      title: "Solved Challenge: Locate the Start Codon",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Successfully identified a 1-indexed translation start codon (ATG) starting at position 4."
    });
  }
  if (hasOrfLen) {
    activitiesHistory.push({
      title: "Solved Challenge: Open Reading Frame Translation",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Translated codons and determined overall amino acid sequence length prior to stop codon."
    });
  }
  if (hasRoleGene) {
    activitiesHistory.push({
      title: "Solved Challenge: Functional Role of a Gene",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Demonstrated accurate conceptual understanding of genetic coding and functional molecules."
    });
  }
  if (hasCapillaryElect) {
    activitiesHistory.push({
      title: "Solved Challenge: Capillary Electrophoresis Mechanics",
      category: "Validated Olympiads",
      date: "Puzzle Solved",
      summary: "Resolved sieving forces and electrophoretic drag ratios separating nucleotide fragments."
    });
  }

  // Simulations
  if (hasSimComp) {
    activitiesHistory.push({
      title: "Conducted Experiment: DNA Sequence Comparison",
      category: "Clinical Simulations",
      date: "Experiment Logged",
      summary: "Completed sequence similarity calculations and mapped localized point mutations."
    });
  }
  if (hasSimMut) {
    activitiesHistory.push({
      title: "Conducted Experiment: Mutation Explorer",
      category: "Clinical Simulations",
      date: "Experiment Logged",
      summary: "Modeled nucleotide shifts and evaluated the downstream transcription impacts."
    });
  }
  if (hasSimHunt) {
    activitiesHistory.push({
      title: "Conducted Experiment: Huntington's Diagnostics",
      category: "Clinical Simulations",
      date: "Experiment Logged",
      summary: "Performed capillary PCR scanning to isolate trinucleotide CAG repeat lengths in HTT gene locus."
    });
  }

  // 4. Achievement Badges List (Professional Milestones)
  const achievements = [
    {
      id: "explorer",
      title: "🧬 DNA Explorer",
      description: "Successfully mastered basic molecular helix structure and base complementary rules.",
      unlocked: hasDnaBasics,
      condition: "Complete standard Introduction to DNA Structure module."
    },
    {
      id: "novice_researcher",
      title: "🔬 Research Beginner",
      description: "Completed your first active simulation and formulated an official laboratory research summary.",
      unlocked: completedSimsCount > 0,
      condition: "Conduct any virtual research simulation and compile a verified report."
    },
    {
      id: "data_analyst",
      title: "📊 Bioinformatics Analyst",
      description: "Demonstrated advanced diagnostic skill in point mutations and structural alignments.",
      unlocked: hasSimComp || hasMutId,
      condition: "Complete the DNA Sequence Comparison simulation or mutation challenge."
    },
    {
      id: "genomics_veteran",
      title: "🧬 Clinical Diagnostician",
      description: "Successfully isolated trinucleotide repeat pathology and calculated complex clinical penetrance risks.",
      unlocked: hasSimHunt,
      condition: "Complete Huntington's Capillary PCR Diagnostics simulation."
    }
  ];

  // 5. Timeline Nodes (Structured Chronicle)
  const timelineNodes = [
    {
      id: "t1",
      title: "Bioinformatics Journey Initialized",
      desc: "Entered BioBridge Laboratory Facility. Created student research logbook.",
      completed: true,
      icon: Terminal,
      color: "border-slate-300 text-slate-600 bg-slate-50"
    },
    {
      id: "t2",
      title: "Mastered Molecular DNA Basics",
      desc: "Completed introductory lessons on nucleotide pairing and transcription structures.",
      completed: hasDnaBasics && hasTransTranslation,
      icon: BookOpen,
      color: "border-teal-200 text-teal-800 bg-teal-50"
    },
    {
      id: "t3",
      title: "Conducted First Lab Simulation",
      desc: "Run alignment calculations or mutation logs in the virtual laboratory pipeline.",
      completed: completedSimsCount > 0,
      icon: Microscope,
      color: "border-emerald-200 text-emerald-800 bg-emerald-50"
    },
    {
      id: "t4",
      title: "Advanced Bioinformatics Skill Tree",
      desc: "Unlocked clinical analytical techniques and researched real databases.",
      completed: totalXp >= 300,
      icon: BrainCircuit,
      color: "border-sky-200 text-sky-800 bg-sky-50"
    }
  ];

  // Saved reports list
  const savedReports = progress.savedReports || [];

  return (
    <div className="space-y-8 animate-fade-in" id="research-journey-profile">
      
      {/* 1. PROFILE HEADER */}
      <div className="p-6 md:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden" id="journey-profile-header">
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6" id="header-wrapper">
          
          {/* Student/Investigator Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/35 rounded-xl flex items-center justify-center text-teal-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-teal-400 uppercase block">CLINICAL INVESTIGATOR PROFILE</span>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={investigatorName}
                      onChange={(e) => setInvestigatorName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveName(investigatorName);
                      }}
                      className="bg-slate-800 border border-slate-700 text-sm font-extrabold rounded px-2 py-1 text-white focus:outline-none focus:border-teal-500 font-sans"
                      maxLength={30}
                    />
                    <button
                      onClick={() => saveName(investigatorName)}
                      className="px-2 py-1 bg-teal-600 hover:bg-teal-700 text-[10px] font-bold rounded cursor-pointer transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <h2 
                    className="text-lg md:text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2 cursor-pointer group"
                    onClick={() => setIsEditingName(true)}
                    title="Click to edit name"
                  >
                    {investigatorName}
                    <span className="text-[10px] text-slate-500 group-hover:text-teal-400 font-mono font-normal underline transition-colors">(edit)</span>
                  </h2>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1" id="header-meta-row">
              <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/50 px-2.5 py-1 rounded-md">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Level: <strong className="text-white font-bold">{bioLevel}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/50 px-2.5 py-1 rounded-md">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span>Experience: <strong className="text-white font-bold">{totalXp} XP</strong></span>
              </div>
            </div>
          </div>

          {/* Learning Progress Section */}
          <div className="p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl w-full md:w-80 space-y-2 shadow-inner" id="progress-card">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[9px] font-mono">Your Bioinformatics Journey</span>
              <span className="font-mono text-teal-400 font-extrabold">{progressPercentage}% Complete</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-950 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(20,184,166,0.3)]" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>{totalCompletedActivities}/{totalPossibleActivities} tasks logged</span>
              <span>Overall completion metrics</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="journey-layout-grid">
        
        {/* LEFT TWO COLUMNS */}
        <div className="lg:col-span-2 space-y-8" id="left-column-layout">
          
          {/* A. SKILL DEVELOPMENT SECTION */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-6" id="skill-development-section">
            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-teal-600" />
                Bioinformatics Skill Registry
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Your practical expertise updates dynamically as you complete theory runs, solve interactive code challenges, and compile verified simulation reports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="skills-grid">
              {skills.map(skill => (
                <div key={skill.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-4 shadow-3xs hover:border-slate-300 transition-colors">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-extrabold text-slate-800">{skill.name}</h4>
                      <span className="text-[10px] font-mono font-bold bg-slate-200 border border-slate-300 text-slate-700 px-1.5 py-0.5 rounded">
                        {skill.percentage}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal font-medium">
                      {skill.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Progress visual bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${skill.percentage}%` }}></div>
                    </div>

                    {/* Component Sub-indicators */}
                    <div className="flex flex-wrap gap-1.5 pt-1" id={`indicators-${skill.id}`}>
                      {skill.indicators.map((ind, i) => (
                        <span
                          key={i}
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 border ${
                            ind.completed
                              ? 'bg-emerald-50 border-emerald-200/50 text-emerald-800'
                              : 'bg-slate-100 border-slate-200 text-slate-400 select-none'
                          }`}
                        >
                          {ind.completed ? (
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                          )}
                          {ind.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. RESEARCH REPORTS (SAVED SIMULATIONS) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-6" id="research-reports-section">
            <div className="space-y-1.5 border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky-600" />
                  Saved Scientific Research Reports ({savedReports.length})
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mt-0.5">
                  Official laboratory files, hypothesis records, and observations compiled and saved during your research runs.
                </p>
              </div>
            </div>

            {savedReports.length === 0 ? (
              /* PROFESSIONAL EMPTY PROFILE STATE */
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-4" id="empty-reports-panel">
                <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h4 className="text-xs font-bold text-slate-800">No Experiment Reports Logged Yet</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    You can compile and save official findings to your profile when running the molecular simulation programs.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-teal-600 font-bold bg-teal-50 border border-teal-150 rounded-md px-3 py-1 inline-flex items-center gap-1">
                    <Microscope className="w-3.5 h-3.5" />
                    Visit "Research Simulations" to compile your first report
                  </span>
                </div>
              </div>
            ) : (
              /* ACTIVE REPORTS ACCORDION/LIST */
              <div className="space-y-4" id="saved-reports-container">
                {savedReports.map(rep => {
                  const isOpened = activeReportTab === rep.id;
                  return (
                    <div 
                      key={rep.id} 
                      className={`border rounded-xl transition-all ${
                        isOpened 
                          ? 'border-sky-300 bg-sky-50/10 shadow-3xs' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-3xs'
                      }`}
                      id={`report-accordion-${rep.id}`}
                    >
                      {/* Accordion Trigger */}
                      <div 
                        onClick={() => setActiveReportTab(isOpened ? null : rep.id)}
                        className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Microscope className="w-4 h-4 text-teal-600" />
                          </div>
                          <div className="text-left">
                            <span className="text-[9px] font-mono text-slate-400 block font-bold tracking-wider">{rep.timestamp.toUpperCase()} • {rep.id}</span>
                            <h4 className="text-xs font-extrabold text-slate-800 leading-tight">{rep.experimentName}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline-block text-[10px] font-mono text-sky-700 bg-sky-50 border border-sky-150 px-2 py-0.5 rounded">
                            {rep.resultSummary.split('(')[0]}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onDeleteReport) {
                                onDeleteReport(rep.id);
                              }
                            }}
                            className="p-1.5 hover:bg-rose-50 border border-transparent hover:border-rose-150 hover:text-rose-700 text-slate-400 rounded-md cursor-pointer transition-all"
                            title="Delete this report"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Accordion Body */}
                      {isOpened && (
                        <div className="border-t border-slate-200/60 p-5 bg-slate-50/40 text-xs space-y-4 animate-fade-in text-left">
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 bg-white border border-slate-150 rounded-xl p-3.5 shadow-3xs">
                              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Research Question</span>
                              <p className="text-slate-700 font-medium leading-relaxed italic">
                                "{rep.researchQuestion}"
                              </p>
                            </div>

                            <div className="space-y-1 bg-white border border-slate-150 rounded-xl p-3.5 shadow-3xs">
                              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Research Methodology</span>
                              <p className="text-slate-600 leading-relaxed">
                                {rep.method}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-3xs">
                            <div className="space-y-1 border-b border-slate-100 pb-2.5">
                              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Primary Observations</span>
                              <p className="text-slate-700 font-medium leading-relaxed">
                                {rep.observation}
                              </p>
                            </div>

                            <div className="space-y-1.5 pt-1">
                              <span className="text-[9px] font-mono font-bold text-teal-700 uppercase tracking-wide block">Verified Conclusion Notes</span>
                              <blockquote className="text-teal-950 font-bold leading-relaxed border-l-2 border-teal-500 pl-3 italic">
                                {rep.conclusion}
                              </blockquote>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 pt-1">
                            <span>Logged into Student Database</span>
                            <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150/50">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              VERIFIED CREDENTIAL
                            </span>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* C. COMPLETED RESEARCH ACTIVITIES LIST (EXPERIMENT HISTORY) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-5" id="experiment-history-section">
            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-600" />
                Completed Research Activities & History
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                A permanent audit record of all your clinical laboratory attempts, successfully solved genetic puzzles, and completed modules.
              </p>
            </div>

            {activitiesHistory.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs italic font-medium">
                No research activities found. Work through the Learning Path, solve Challenges, or launch simulations to populate this history.
              </div>
            ) : (
              <div className="divide-y divide-slate-150 text-xs" id="history-rows">
                {activitiesHistory.map((item, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 first:pt-0 last:pb-0">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          item.category === 'Theory Modules'
                            ? 'bg-blue-50 border-blue-150 text-blue-800'
                            : item.category === 'Validated Olympiads'
                            ? 'bg-amber-50 border-amber-150 text-amber-800'
                            : 'bg-teal-50 border-teal-150 text-teal-800'
                        }`}>
                          {item.category}
                        </span>
                        <h4 className="font-bold text-slate-800">{item.title}</h4>
                      </div>
                      <p className="text-slate-500 text-[11px] font-medium leading-relaxed pl-1 sm:pl-0">
                        {item.summary}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono font-bold shrink-0 self-start sm:self-center">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <div className="space-y-8" id="right-sidebar-layout">
          
          {/* A. ACHIEVEMENT SYSTEM (PROFESSIONAL MILESTONES) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-4" id="milestones-card">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Scientific Milestones</h3>
              <h4 className="text-sm font-extrabold text-slate-900">Earned Credentials</h4>
            </div>

            <div className="space-y-3" id="milestones-list">
              {achievements.map(ach => (
                <div 
                  key={ach.id} 
                  className={`p-3.5 rounded-xl border flex gap-3 transition-all ${
                    ach.unlocked
                      ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-3xs'
                      : 'border-slate-150 bg-slate-50/25 opacity-40 select-none'
                  }`}
                  id={`milestone-${ach.id}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                    ach.unlocked ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}>
                    {ach.id === 'explorer' && <Award className="w-4.5 h-4.5" />}
                    {ach.id === 'novice_researcher' && <Microscope className="w-4.5 h-4.5" />}
                    {ach.id === 'data_analyst' && <Activity className="w-4.5 h-4.5" />}
                    {ach.id === 'genomics_veteran' && <Shield className="w-4.5 h-4.5" />}
                  </div>
                  <div className="space-y-1 text-left flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-slate-800 leading-none">{ach.title}</h4>
                      {ach.unlocked ? (
                        <span className="text-[8px] bg-emerald-50 text-emerald-800 border border-emerald-150/50 px-1.5 py-0.2 rounded font-mono font-extrabold">VERIFIED</span>
                      ) : (
                        <span className="text-[8px] bg-slate-100 border border-slate-200 text-slate-400 px-1.5 py-0.2 rounded font-mono font-bold">LOCKED</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{ach.description}</p>
                    {!ach.unlocked && (
                      <p className="text-[9px] text-slate-400 font-mono italic">Requires: {ach.condition}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. LEARNING TIMELINE */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-3xs space-y-4" id="timeline-card">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Bioinformatics Path</h3>
              <h4 className="text-sm font-extrabold text-slate-900">Learning Timeline</h4>
            </div>

            <div className="relative pl-6 space-y-6 pt-2 border-l border-slate-150 ml-3" id="timeline-flow">
              {timelineNodes.map((node, i) => {
                const IconComponent = node.icon;
                return (
                  <div key={node.id} className="relative text-left text-xs space-y-1" id={`timeline-node-${node.id}`}>
                    
                    {/* Node Dot Icon */}
                    <div className={`absolute -left-[37px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      node.completed 
                        ? 'border-teal-500 bg-teal-600 text-white shadow-3xs' 
                        : 'border-slate-200 bg-white text-slate-300'
                    }`}>
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>

                    <h4 className={`text-xs font-extrabold leading-none ${node.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                      {node.title}
                    </h4>
                    
                    <p className={`text-[10px] leading-relaxed font-medium ${node.completed ? 'text-slate-500' : 'text-slate-400'}`}>
                      {node.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* C. SYSTEM RESET (UTILITY CARD) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner text-center space-y-4" id="reset-utility-card">
            <div className="space-y-1.5">
              <h4 className="text-xs font-extrabold text-slate-800">Clear Student Registry</h4>
              <p className="text-[11px] text-slate-500 leading-normal font-medium">
                Resetting will clear all accumulated experience points, completed lessons, challenges, and saved simulation research reports.
              </p>
            </div>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset your local research logs and saved reports? This action is irreversible.')) {
                  onResetProgress();
                }
              }}
              className="w-full py-2 bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1"
              id="btn-reset-journey-progress"
            >
              Reset Research Logs
            </button>
          </div>

        </div>

      </div>
      
    </div>
  );
}
