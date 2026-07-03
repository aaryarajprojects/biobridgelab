import React, { useState } from 'react';
import { LESSONS, Lesson, UserProgress } from '../types';
import { CheckCircle2, Lock, ArrowRight, BookOpen, Clock, Play, HelpCircle, AlertCircle, Database, Search } from 'lucide-react';

interface LearningPathProps {
  progress: UserProgress;
  onCompleteLesson: (lessonId: string, xpReward: number) => void;
  onUpdateProfile?: (updates: Partial<UserProgress>) => void;
  onCompleteQuiz?: (lessonId: string, score: number, total: number, correctAnswers: number) => void;
}

export default function LearningPath({ progress, onCompleteLesson, onUpdateProfile, onCompleteQuiz }: LearningPathProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeLessonTab, setActiveLessonTab] = useState<'read' | 'diagram' | 'quiz'>('read');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<1 | 2 | 3 | 4 | 5>(() => {
    return (progress.learningLevel as 1 | 2 | 3 | 4 | 5) || 1;
  });
  
  // Quiz states
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  // Mini activity states
  const [miniActivityAnswer, setMiniActivityAnswer] = useState<string | null>(null);
  const [miniActivitySubmitted, setMiniActivitySubmitted] = useState<boolean>(false);

  // Database simulator state (for Level 2 Database lesson diagram)
  const [dbSearchQuery, setDbSearchQuery] = useState('');
  const [dbSearchResult, setDbSearchResult] = useState<{ name: string; type: string; seq: string; info: string } | null>(null);

  // DNA base structural simulation state (for Level 1 DNA basics diagram)
  const [activeBaseHighlight, setActiveBaseHighlight] = useState<'A' | 'T' | 'C' | 'G' | null>(null);

  // Transcription slider index (for Level 1 Transcription lesson diagram)
  const [transcriptionStep, setTranscriptionStep] = useState(0);

  // Level 1-5 Custom Simulators States
  const [activeRnaType, setActiveRnaType] = useState<string>('mRNA');
  const [proteinStructureTier, setProteinStructureTier] = useState<string>('primary');
  const [primerSequenceInput, setPrimerSequenceInput] = useState<string>('GCTAGC');
  const [illuminaCycle, setIlluminaCycle] = useState<number>(0);
  const [illuminaReadText, setIlluminaReadText] = useState<string>('');
  const [chromatinTags, setChromatinTags] = useState<{ acetylated: boolean; methylated: boolean }>({ acetylated: false, methylated: false });
  const [networkMotifXInput, setNetworkMotifXInput] = useState<number>(0);
  const [syntheticToggleState, setSyntheticToggleState] = useState<'A' | 'B'>('A');

  // New sub-lessons states (Advanced Genomic Sequencing, CRISPR, Proteomics)
  const [readLength, setReadLength] = useState<number>(20000);
  const [readErrorRate, setReadErrorRate] = useState<number>(8); // In percent (1% to 15%)
  const [crisprTargetSeq, setCrisprTargetSeq] = useState<string>('ACTGCCGATGGCTGCATGGCTACGGTACTAGCTGG');
  const [selectedPamIndex, setSelectedPamIndex] = useState<number | null>(null);
  const [selectedPeptide, setSelectedPeptide] = useState<string>('MATH');
  const [selectedMSFragment, setSelectedMSFragment] = useState<number>(2);

  const mockDbSearch = () => {
    const query = dbSearchQuery.toUpperCase().trim();
    if (query.includes('INS') || query.includes('INSULIN')) {
      setDbSearchResult({
        name: "Homo sapiens Insulin (INS) mRNA",
        type: "NCBI GenBank Accession NM_000618",
        seq: "AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGT",
        info: "Organism: Homo sapiens | Exons: 3 | Coding sequence range: 242..574. Encodes preproinsulin, a precursor hormone key to metabolism."
      });
    } else if (query.includes('GFP') || query.includes('FLUORESCENT')) {
      setDbSearchResult({
        name: "Aequorea victoria Green Fluorescent Protein (GFP)",
        type: "UniProt Accession P42212",
        seq: "ATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGT",
        info: "Organism: Aequorea victoria | Mass: 26.9 kDa | Structure: Beta-can barrel. Emits green light under ultraviolet stimulation."
      });
    } else if (query.includes('HBB') || query.includes('HEMOGLOBIN') || query.includes('BETA')) {
      setDbSearchResult({
        name: "Homo sapiens Hemoglobin Subunit Beta (HBB) mRNA",
        type: "NCBI RefSeq NM_000518",
        seq: "ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGA",
        info: "Organism: Homo sapiens | Association: Sickle cell anemia is caused by a single missense SNP (GAG to GTG) in codon 6 of this gene."
      });
    } else {
      setDbSearchResult({
        name: "No matches found in NCBI Mock-GenBank",
        type: "Unknown Entity",
        seq: "",
        info: "Try searching for database identifiers like 'INS', 'GFP', or 'HBB'."
      });
    }
  };

  const handleOpenLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setActiveLessonTab('read');
    setQuizAnswer(null);
    setQuizSubmitted(false);
    setQuizResult(null);
    setMiniActivityAnswer(null);
    setMiniActivitySubmitted(false);
    setDbSearchQuery('');
    setDbSearchResult(null);
    setTranscriptionStep(0);
    setActiveBaseHighlight(null);
    
    // Reset Level 1-5 Custom Simulators States
    setActiveRnaType('mRNA');
    setProteinStructureTier('primary');
    setPrimerSequenceInput('GCTAGC');
    setIlluminaCycle(0);
    setIlluminaReadText('');
    setChromatinTags({ acetylated: false, methylated: false });
    setNetworkMotifXInput(0);
    setSyntheticToggleState('A');
    setReadLength(20000);
    setReadErrorRate(8);
    setCrisprTargetSeq('ACTGCCGATGGCTGCATGGCTACGGTACTAGCTGG');
    setSelectedPamIndex(null);
    setSelectedPeptide('MATH');
    setSelectedMSFragment(2);
  };

  const handleSubmitQuiz = () => {
    if (quizAnswer === null || !selectedLesson) return;
    setQuizSubmitted(true);
    const isCorrect = quizAnswer === selectedLesson.content.quickQuiz.correctIndex;
    setQuizResult(isCorrect);
    
    // Auto-save quiz progress
    onCompleteQuiz?.(selectedLesson.id, isCorrect ? 100 : 0, 100, isCorrect ? 1 : 0);

    if (isCorrect && !progress.completedLessons.includes(selectedLesson.id)) {
      onCompleteLesson(selectedLesson.id, 50); // Give 50 XP
    }
  };

  const filteredLessons = LESSONS.filter(l => l.level === selectedLevelFilter);

  // Level Descriptions
  const levelDescriptions = {
    1: "Foundational genetics concepts: Understand complementary base chemistry, genes, and transcription.",
    2: "Clinical database registries, standard accession formats, and automated Sanger reads.",
    3: "Quantitative sequence alignment metrics, dynamic penalty parameters, and algorithms.",
    4: "Metagenomic tracking, oncology driver mutations, and targeted genetic engineering via CRISPR-Cas9.",
    5: "Systems biology regulatory circuitry: Investigate transcription factor pathways, chromatin epigenetic dynamics, and synthetic logical gene circuits."
  };

  const transcriptionData = [
    { dna: "TAC", rna: "AUG", codon: "Start (Met)", action: "Ribosome binds and initiates translation" },
    { dna: "GCG", rna: "CGC", codon: "Arginine (Arg)", action: "tRNA matches codon and adds basic amino acid" },
    { dna: "ACT", rna: "UGA", codon: "Stop (End)", action: "Release factor binds, ending polypeptide chain" }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="learning-path-screen">
      {!selectedLesson ? (
        <>
          {/* Level Switcher Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="level-switcher-header">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Learning Path</h1>
              <p className="text-slate-500 text-sm max-w-xl">
                Master core molecular biology and bioinformatics theory through step-by-step interactive modules, simulated labs, and practical knowledge checks.
              </p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start" id="level-buttons-row">
              {([1, 2, 3, 4, 5] as const).map(num => {
                const isActive = num === selectedLevelFilter;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      setSelectedLevelFilter(num);
                      onUpdateProfile?.({ learningLevel: num });
                    }}
                    className={`px-3 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-teal-700 border border-slate-200/60 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    id={`btn-level-${num}`}
                  >
                    Level {num}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-teal-50/50 border border-teal-100 mb-6" id="level-info-banner">
            <h2 className="text-[10px] font-bold text-teal-800 tracking-wider uppercase mb-1">Level Focus Area</h2>
            <p className="text-slate-700 text-sm font-medium">{levelDescriptions[selectedLevelFilter]}</p>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="lessons-cards-grid">
            {filteredLessons.map(lesson => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 shadow-xs"
                  id={`lesson-card-${lesson.id}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {lesson.duration}
                      </span>
                      {isCompleted ? (
                        <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Complete (+50 XP)
                        </span>
                      ) : (
                        <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200/40 px-2.5 py-0.5 rounded-full font-semibold">
                          Available
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{lesson.title}</h3>
                    <h4 className="text-xs font-bold text-teal-700 tracking-wide uppercase">{lesson.subtitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{lesson.shortDesc}</p>
                  </div>

                  <button
                    onClick={() => handleOpenLesson(lesson)}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-teal-600 hover:text-white border border-slate-200 font-bold text-slate-700 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer group"
                    id={`btn-study-${lesson.id}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-slate-400 group-hover:text-white transition-colors" />
                    Open Interactive Lesson
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Selected Lesson Reader */
        <div className="space-y-6 animate-fade-in" id="lesson-reader-container">
          {/* Back & Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4" id="lesson-reader-header">
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-slate-600 hover:text-slate-900 flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer"
              id="btn-back-to-path"
            >
              ← Return to Path View
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-teal-50 text-teal-700 border border-teal-100 px-2.5 py-0.5 rounded-full font-mono font-bold">
                Level {selectedLesson.level}
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
                {selectedLesson.duration}
              </span>
            </div>
          </div>

          <div id="lesson-main-titles" className="space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{selectedLesson.title}</h1>
            <p className="text-xs font-bold text-teal-700 tracking-wider uppercase">{selectedLesson.subtitle}</p>
          </div>

          {/* Lesson Sub-Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-1" id="lesson-tabs">
            {(['read', 'diagram', 'quiz'] as const).map(tab => {
              const isActive = activeLessonTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveLessonTab(tab)}
                  className={`px-4 py-2.5 border-b-2 font-bold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'border-teal-600 text-teal-800 bg-teal-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                  id={`tab-${tab}`}
                >
                  {tab === 'read' && '1. Scientific Theory'}
                  {tab === 'diagram' && '2. Simulated Diagram'}
                  {tab === 'quiz' && '3. Quiz Check'}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs" id="lesson-tab-content">
            {activeLessonTab === 'read' && (
              <div className="space-y-6 text-slate-600 max-w-4xl" id="panel-read">
                {selectedLesson.content.learningObjective && (
                  <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-100/60 flex gap-3 text-slate-800">
                    <BookOpen className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wide">Learning Objective</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {selectedLesson.content.learningObjective}
                      </p>
                    </div>
                  </div>
                )}

                {selectedLesson.content.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-sm">{p}</p>
                ))}

                {selectedLesson.content.keyConcepts && selectedLesson.content.keyConcepts.length > 0 && (
                  <div className="mt-8 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Scientific Concepts</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedLesson.content.keyConcepts.map((concept, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex gap-2.5">
                          <span className="font-mono text-xs text-teal-600 font-bold">0{idx + 1}</span>
                          <p className="text-xs text-slate-600 leading-normal">{concept}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLesson.content.miniActivity && (
                  <div className="mt-8 border border-slate-200/80 rounded-xl p-5 bg-teal-50/25 space-y-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Mini Activity: Active Recall Check</h4>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-normal">{selectedLesson.content.miniActivity.prompt}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedLesson.content.miniActivity.options.map((opt, idx) => {
                        const isSelected = miniActivityAnswer === opt;
                        const isCorrect = opt === selectedLesson.content.miniActivity.correctAnswer;
                        return (
                          <button
                            key={idx}
                            disabled={miniActivitySubmitted}
                            onClick={() => setMiniActivityAnswer(opt)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all font-bold cursor-pointer ${
                              isSelected
                                ? miniActivitySubmitted
                                  ? isCorrect
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                    : 'bg-rose-600 border-rose-600 text-white shadow-xs'
                                  : 'bg-teal-600 border-teal-600 text-white shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {!miniActivitySubmitted ? (
                      <button
                        disabled={!miniActivityAnswer}
                        onClick={() => setMiniActivitySubmitted(true)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className="p-3.5 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-600 animate-fade-in space-y-1">
                        {miniActivityAnswer === selectedLesson.content.miniActivity.correctAnswer ? (
                          <span className="text-emerald-700 font-extrabold uppercase text-[10px] tracking-wider block">Correct Response!</span>
                        ) : (
                          <span className="text-rose-700 font-extrabold uppercase text-[10px] tracking-wider block">Review Recommended</span>
                        )}
                        <p className="font-medium text-slate-600">{selectedLesson.content.miniActivity.feedback}</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedLesson.content.summary && (
                  <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lesson Summary</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">{selectedLesson.content.summary}</p>
                  </div>
                )}
                
                <div className="p-4 rounded-lg bg-teal-50/50 border border-teal-100/40 flex gap-3 mt-6 text-slate-850">
                  <BookOpen className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wide">Biological Annotator Guideline</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Always read nucleotide strands from the <strong>5' prime carbon to the 3' prime carbon</strong>. Polymerases move exclusively down this trajectory during transcript synthesis.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveLessonTab('diagram')}
                    className="px-4 py-2 rounded-lg bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    Advance to Simulator
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeLessonTab === 'diagram' && (
              <div className="space-y-6" id="panel-diagram">
                {selectedLesson.content.interactiveExample && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 text-left">
                    <div className="bg-teal-600 text-white rounded-lg p-2 h-fit flex items-center justify-center">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Interactive Simulator</h4>
                      <h3 className="text-sm font-extrabold text-teal-800 tracking-tight mt-0.5">{selectedLesson.content.interactiveExample.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {selectedLesson.content.interactiveExample.description}
                      </p>
                    </div>
                  </div>
                )}
                {/* 1. DNA Structure Base-Pairing Diagram */}
                {selectedLesson.content.diagramType === 'dna_structure' && (
                  <div className="space-y-6 text-center">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900">Complementary Base Pairing Module</h3>
                      <p className="text-xs text-slate-500 max-w-xl mx-auto">
                        Click on any nitrogenous base block to inspect its hydrogen bonds, molecular groupings, and base pairings.
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-8 py-6 bg-slate-50 rounded-xl border border-slate-200 max-w-xl mx-auto p-4">
                      {/* Interactive graphic */}
                      <div className="flex items-center gap-12 font-mono text-base font-bold">
                        {/* Strand 5' -> 3' */}
                        <div className="flex flex-col gap-4">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">5' STRAND</span>
                          {['A', 'C'].map(base => (
                            <button
                              key={base}
                              onClick={() => setActiveBaseHighlight(base as any)}
                              className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                                activeBaseHighlight === base
                                  ? 'bg-teal-600 border-teal-500 text-white scale-105 shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400 shadow-2xs'
                              }`}
                            >
                              {base}
                            </button>
                          ))}
                        </div>

                        {/* Bonds representations */}
                        <div className="flex flex-col gap-10 items-center justify-center">
                          {/* Bond A-T */}
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-[9px] text-slate-400 uppercase font-bold">2 Bonds</span>
                            <div className="flex gap-1 py-1">
                              <span className={`w-2.5 h-1.5 rounded-full transition-colors ${activeBaseHighlight === 'A' || activeBaseHighlight === 'T' ? 'bg-teal-600' : 'bg-slate-200'}`}></span>
                              <span className={`w-2.5 h-1.5 rounded-full transition-colors ${activeBaseHighlight === 'A' || activeBaseHighlight === 'T' ? 'bg-teal-600' : 'bg-slate-200'}`}></span>
                            </div>
                          </div>

                          {/* Bond C-G */}
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-[9px] text-slate-400 uppercase font-bold">3 Bonds</span>
                            <div className="flex gap-1 py-1">
                              <span className={`w-2.5 h-1.5 rounded-full transition-colors ${activeBaseHighlight === 'C' || activeBaseHighlight === 'G' ? 'bg-emerald-600' : 'bg-slate-200'}`}></span>
                              <span className={`w-2.5 h-1.5 rounded-full transition-colors ${activeBaseHighlight === 'C' || activeBaseHighlight === 'G' ? 'bg-emerald-600' : 'bg-slate-200'}`}></span>
                              <span className={`w-2.5 h-1.5 rounded-full transition-colors ${activeBaseHighlight === 'C' || activeBaseHighlight === 'G' ? 'bg-emerald-600' : 'bg-slate-200'}`}></span>
                            </div>
                          </div>
                        </div>

                        {/* Strand 3' -> 5' */}
                        <div className="flex flex-col gap-4">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">3' STRAND</span>
                          {['T', 'G'].map(base => (
                            <button
                              key={base}
                              onClick={() => setActiveBaseHighlight(base as any)}
                              className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                                activeBaseHighlight === base
                                  ? 'bg-emerald-600 border-emerald-500 text-white scale-105 shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400 shadow-2xs'
                              }`}
                            >
                              {base}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Chemical/Interactive output text */}
                      <div className="w-full text-slate-600 border-t border-slate-200 pt-4 text-xs text-left min-h-[50px]">
                        {activeBaseHighlight === 'A' && (
                          <p className="animate-fade-in"><span className="text-teal-700 font-bold">Adenine (A)</span> is a double-ring purine base. It bonds exclusively with Thymine (T) in DNA templates via exactly <strong>two hydrogen bonds</strong>.</p>
                        )}
                        {activeBaseHighlight === 'T' && (
                          <p className="animate-fade-in"><span className="text-emerald-700 font-bold">Thymine (T)</span> is a single-ring pyrimidine base. It bonds with Adenine (A) and is replaced by Uracil (U) in RNA strand transcriptions.</p>
                        )}
                        {activeBaseHighlight === 'C' && (
                          <p className="animate-fade-in"><span className="text-teal-700 font-bold">Cytosine (C)</span> is a single-ring pyrimidine base that matches Guanine (G). They share <strong>three hydrogen bonds</strong>, making GC-rich areas more thermally resilient.</p>
                        )}
                        {activeBaseHighlight === 'G' && (
                          <p className="animate-fade-in"><span className="text-emerald-700 font-bold">Guanine (G)</span> is a double-ring purine base that pairs with Cytosine (C). Highly stabilized GC structures require more energy to denature during PCR.</p>
                        )}
                        {!activeBaseHighlight && (
                          <p className="text-slate-400 italic text-center">Select any base unit above (A, C, T, G) to show its biological annotations.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Transcription Translation Slider */}
                {selectedLesson.content.diagramType === 'transcription' && (
                  <div className="space-y-6 text-center max-w-2xl mx-auto">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900">Interactive Transcription & Codon Engine</h3>
                      <p className="text-xs text-slate-500">
                        Slide the controller below to drive polymerases. Observe template nucleotides transcribe to mRNA, then translate into polypeptides.
                      </p>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-6 text-left">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Polymerase Transcription Slider:</label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          value={transcriptionStep}
                          onChange={(e) => setTranscriptionStep(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                        <div className="flex justify-between font-mono text-[9px] text-slate-400 font-bold uppercase">
                          <span>1. Start Codon</span>
                          <span>2. Elongation</span>
                          <span>3. Stop Codon</span>
                        </div>
                      </div>

                      {/* Display Step */}
                      <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-2xs space-y-4 text-left animate-fade-in">
                        <div className="grid grid-cols-3 gap-4 text-center border-b border-slate-100 pb-3 font-mono">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">DNA TEMPLATE</span>
                            <span className="text-lg font-bold text-slate-800">{transcriptionData[transcriptionStep].dna}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-teal-700 font-bold block uppercase">mRNA TRANSCRIPT</span>
                            <span className="text-lg font-bold text-teal-700">{transcriptionData[transcriptionStep].rna}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-emerald-700 font-bold block uppercase">AMINO ACID</span>
                            <span className="text-lg font-bold text-emerald-700">{transcriptionData[transcriptionStep].codon}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-teal-800 block tracking-wider">Ribosome Output Event</span>
                          <p className="text-xs text-slate-600 font-medium">{transcriptionData[transcriptionStep].action}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Biological Database Simulator */}
                {selectedLesson.content.diagramType === 'databases' && (
                  <div className="space-y-6 text-center max-w-xl mx-auto">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900">Mock NCBI GenBank Accession Query</h3>
                      <p className="text-xs text-slate-500">
                        Query genomic index servers. Input biological codes below to fetch official FASTA nucleotide registries.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-left space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase block tracking-wider">Search GenBank Catalog identifiers (INS, GFP, HBB):</label>
                        <div className="flex gap-2">
                          <div className="relative flex-grow">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                            <input
                              type="text"
                              value={dbSearchQuery}
                              onChange={(e) => setDbSearchQuery(e.target.value)}
                              placeholder="Type 'INS', 'GFP', or 'HBB'..."
                              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-2xs"
                              onKeyDown={(e) => e.key === 'Enter' && mockDbSearch()}
                            />
                          </div>
                          <button
                            onClick={mockDbSearch}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                          >
                            Query DB
                          </button>
                        </div>
                      </div>

                      {/* Mock DB Output */}
                      {dbSearchResult ? (
                        <div className="border border-slate-200 bg-white rounded-lg p-4 font-mono text-xs space-y-3 animate-fade-in shadow-2xs">
                          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                            <div>
                              <div className="text-teal-700 font-bold text-sm">{dbSearchResult.name}</div>
                              <div className="text-slate-400 text-[10px] font-bold uppercase">{dbSearchResult.type}</div>
                            </div>
                            <Database className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                          </div>
                          
                          {dbSearchResult.seq && (
                            <div className="space-y-1">
                              <span className="text-slate-400 block text-[9px] font-bold uppercase">NUCLEOTIDE SEQUENCE (SHORT FASTA):</span>
                              <div className="bg-slate-50 p-2 rounded border border-slate-100 text-slate-600 break-all text-[11px] leading-tight">{dbSearchResult.seq}...</div>
                            </div>
                          )}

                          <div className="text-slate-500 text-[11px] leading-relaxed">{dbSearchResult.info}</div>
                        </div>
                      ) : (
                        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-white">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Ready for queries. Enter gene code.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Custom Interactive Simulators for level 1-5 extra lessons */}
                {selectedLesson.content.interactiveExample?.type === 'rna_explorer' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">RNA Class Structural Anatomy</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {['mRNA', 'tRNA', 'rRNA', 'snRNA', 'miRNA'].map(type => (
                        <button
                          key={type}
                          onClick={() => setActiveRnaType(type)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            activeRnaType === type
                              ? 'bg-teal-600 border-teal-500 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 animate-fade-in">
                      <span className="text-[10px] font-mono font-bold uppercase text-teal-700">Molecular Profile: {activeRnaType}</span>
                      {activeRnaType === 'mRNA' && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Messenger RNA (mRNA)</strong> acts as the transient mobile copy of a gene. It is synthesized by RNA Polymerase II during transcription and carries genetic instructions from the nucleus to ribosomes for translation. It is highly unstable, ensuring precise control over gene expression.
                        </p>
                      )}
                      {activeRnaType === 'tRNA' && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Transfer RNA (tRNA)</strong> features a cloverleaf secondary structure that folds into an L-shaped 3D structure. It holds an amino acid on its 3' acceptor stem and presents a specific three-base <strong>anticodon</strong> that pairs with the matching mRNA codon inside the ribosome.
                        </p>
                      )}
                      {activeRnaType === 'rRNA' && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Ribosomal RNA (rRNA)</strong> comprises up to 80% of total cellular RNA. It complexes with ribosomal proteins to assemble the small and large ribosomal subunits. The 28S rRNA subunit acts as a <strong>ribozyme</strong> that directly catalyzes peptide bond synthesis.
                        </p>
                      )}
                      {activeRnaType === 'snRNA' && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Small Nuclear RNA (snRNA)</strong> resides within the eukaryotic cell nucleus. It complexes with proteins to form small nuclear ribonucleoproteins (snRNPs, or 'snurps'), which assemble into the <strong>spliceosome</strong> to recognize and cut out non-coding introns from pre-mRNA.
                        </p>
                      )}
                      {activeRnaType === 'miRNA' && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>MicroRNA (miRNA)</strong> is a class of tiny (~22 nucleotides) non-coding RNAs. It associates with the RNA-Induced Silencing Complex (RISC) and binds to complementary 3' UTR sequences of target mRNAs, causing mRNA cleavage or translation block to repress protein expression.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'protein_structure' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">Four Tiers of Protein Folding</h3>
                    <div className="grid grid-cols-4 gap-1.5 mb-4">
                      {['primary', 'secondary', 'tertiary', 'quaternary'].map(tier => (
                        <button
                          key={tier}
                          onClick={() => setProteinStructureTier(tier)}
                          className={`py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                            proteinStructureTier === tier
                              ? 'bg-teal-600 border-teal-500 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-355'
                          }`}
                        >
                          {tier.substring(0, 5)}...
                        </button>
                      ))}
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 animate-fade-in">
                      <span className="text-[10px] font-mono font-bold uppercase text-teal-700">Folding Level: {proteinStructureTier} Structure</span>
                      {proteinStructureTier === 'primary' && (
                        <div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-2">
                            The linear sequence of amino acids linked together by strong, covalent peptide bonds. It is written from the N-terminus to the C-terminus.
                          </p>
                          <div className="p-2 bg-white border border-slate-200 rounded font-mono text-[10px] text-center text-slate-500 font-bold">
                            N-term — [Met] — [Val] — [Leu] — [Ala] — [Cys] — [Phe] — C-term
                          </div>
                        </div>
                      )}
                      {proteinStructureTier === 'secondary' && (
                        <div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-2">
                            Localized folding of the polypeptide chain into regular patterns, stabilized by hydrogen bonds between amino and carbonyl groups along the backbone.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                            <div className="p-2 bg-teal-50 text-teal-800 border border-teal-100 rounded">
                              Alpha Helix (Spiral)
                            </div>
                            <div className="p-2 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded">
                              Beta Sheet (Pleats)
                            </div>
                          </div>
                        </div>
                      )}
                      {proteinStructureTier === 'tertiary' && (
                        <div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-2">
                            The full 3D packing of a single polypeptide chain, driven by <strong>hydrophobic collapse</strong> (hiding nonpolar sidechains), ionic salt bridges, hydrogen bonds, and disulfide bridges.
                          </p>
                          <div className="p-2 bg-white border border-slate-200 rounded font-mono text-[10px] text-center text-emerald-700 font-bold">
                            [Polar outer shell] ⇄ [Hydrophobic Core Collapsed]
                          </div>
                        </div>
                      )}
                      {proteinStructureTier === 'quaternary' && (
                        <div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-2">
                            The spatial arrangement of multiple folded polypeptide subunits working together as a single functional multi-protein macromolecule (e.g. Hemoglobin tetramer).
                          </p>
                          <div className="p-2 bg-slate-800 text-white rounded font-mono text-[10px] text-center font-bold">
                            Subunit α1 + Subunit α2 + Subunit β1 + Subunit β2 = Hemoglobin
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'primer_designer' && (
                  <div className="space-y-4 max-w-xl mx-auto text-left">
                    <h3 className="text-sm font-bold text-slate-800 text-center">Thermodynamic Primer Quality Evaluator</h3>
                    <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Enter Forward Primer Sequence (A, T, C, G only):</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={primerSequenceInput}
                            onChange={(e) => setPrimerSequenceInput(e.target.value.toUpperCase().replace(/[^ATCG]/g, ''))}
                            maxLength={30}
                            className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 uppercase focus:outline-none focus:border-teal-500"
                            placeholder="e.g. CCGATGGCTTTA"
                          />
                          <button
                            onClick={() => setPrimerSequenceInput('AGCCCTCCAGGACAGG')}
                            className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-[10px] font-bold text-slate-600 transition-colors"
                          >
                            Load Template
                          </button>
                        </div>
                      </div>

                      {/* Calculations */}
                      {primerSequenceInput.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px] border-t border-slate-200">
                          {(() => {
                            const len = primerSequenceInput.length;
                            const a = (primerSequenceInput.match(/A/g) || []).length;
                            const t = (primerSequenceInput.match(/T/g) || []).length;
                            const c = (primerSequenceInput.match(/C/g) || []).length;
                            const g = (primerSequenceInput.match(/G/g) || []).length;
                            const gcPercent = Math.round(((g + c) / len) * 100) || 0;
                            // Wallace formula
                            const tm = 2 * (a + t) + 4 * (c + g);
                            const hasGcClamp = ['G', 'C'].includes(primerSequenceInput[len - 1]);
                            return (
                              <>
                                <div className="space-y-1">
                                  <div className="text-slate-400">Sequence Length:</div>
                                  <div className="font-bold text-slate-800">{len} bp {len < 18 ? '⚠️ (Short, target: 18-25)' : '✓ (Optimal)'}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-slate-400">Melting Temp (Tm):</div>
                                  <div className="font-bold text-teal-700">{tm}°C {tm < 50 || tm > 65 ? '⚠️ (Target: 55-65°C)' : '✓ (Optimal)'}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-slate-400">GC Percentage:</div>
                                  <div className="font-bold text-slate-800">{gcPercent}% {gcPercent < 40 || gcPercent > 60 ? '⚠️ (Target: 40-60%)' : '✓ (Optimal)'}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-slate-400">3' GC Clamp:</div>
                                  <div className={`font-bold ${hasGcClamp ? 'text-emerald-600' : 'text-amber-600'}`}>
                                    {hasGcClamp ? '✓ Anchored (Ends in G/C)' : '⚠️ Weak (Ends in A/T)'}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      ) : (
                        <div className="text-center py-2 text-xs text-slate-400 italic">Please enter a nucleotide sequence to calculate parameters.</div>
                      )}
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'illumina_sim' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">Illumina Sequencing-by-Synthesis Chamber</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Flow Cell Cluster Active</span>
                        <span className="text-xs bg-slate-800 text-white font-mono px-2 py-0.5 rounded">Cycle: {illuminaCycle} / 4</span>
                      </div>

                      {/* Chemical Visual */}
                      <div className="h-20 flex items-center justify-center rounded-lg bg-slate-950 font-bold border border-slate-800 relative overflow-hidden transition-all duration-300">
                        {illuminaCycle === 0 && <span className="text-slate-500 font-mono text-xs uppercase animate-pulse">Ready to synthesize. Click Step.</span>}
                        {illuminaCycle === 1 && (
                          <div className="text-teal-400 animate-pulse flex flex-col items-center">
                            <span className="w-4 h-4 bg-teal-500 rounded-full mb-1 shadow-[0_0_12px_#2dd4bf]"></span>
                            <span className="font-mono text-xs">CYAN DYE INCORPORATED: [A]</span>
                          </div>
                        )}
                        {illuminaCycle === 2 && (
                          <div className="text-rose-400 animate-pulse flex flex-col items-center">
                            <span className="w-4 h-4 bg-rose-500 rounded-full mb-1 shadow-[0_0_12px_#fb7185]"></span>
                            <span className="font-mono text-xs">MAGENTA DYE INCORPORATED: [T]</span>
                          </div>
                        )}
                        {illuminaCycle === 3 && (
                          <div className="text-emerald-400 animate-pulse flex flex-col items-center">
                            <span className="w-4 h-4 bg-emerald-500 rounded-full mb-1 shadow-[0_0_12px_#34d399]"></span>
                            <span className="font-mono text-xs">GREEN DYE INCORPORATED: [G]</span>
                          </div>
                        )}
                        {illuminaCycle === 4 && (
                          <div className="text-amber-400 animate-pulse flex flex-col items-center">
                            <span className="w-4 h-4 bg-amber-500 rounded-full mb-1 shadow-[0_0_12px_#fbbf24]"></span>
                            <span className="font-mono text-xs">YELLOW DYE INCORPORATED: [C]</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (illuminaCycle < 4) {
                              const next = illuminaCycle + 1;
                              const bases = ['', 'A', 'AT', 'ATG', 'ATGC'];
                              setIlluminaCycle(next);
                              setIlluminaReadText(bases[next]);
                            } else {
                              setIlluminaCycle(0);
                              setIlluminaReadText('');
                            }
                          }}
                          className="flex-grow py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          {illuminaCycle < 4 ? 'Trigger Next Chemical Step ➔' : 'Reset Flow Cell Cycle'}
                        </button>
                      </div>

                      <div className="bg-white border border-slate-200 p-2.5 rounded font-mono text-left space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Digital Chromatogram Log:</span>
                        <div className="text-xs text-slate-800">
                          {illuminaReadText ? (
                            <span className="font-bold tracking-widest text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">{illuminaReadText}</span>
                          ) : (
                            <span className="text-slate-400 italic">No nucleotides cataloged yet...</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'chromatin_sim' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">Epigenetic Chromatin Accessibility Switch</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-left">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Chemical Epigenetic Markers</span>
                        <button
                          onClick={() => setChromatinTags({ acetylated: false, methylated: false })}
                          className="text-[9px] text-teal-700 font-bold hover:underline"
                        >
                          Clear Marks
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setChromatinTags(prev => ({ ...prev, acetylated: !prev.acetylated, methylated: false }))}
                          className={`p-3 rounded-lg border text-xs font-bold text-center cursor-pointer transition-all ${
                            chromatinTags.acetylated
                              ? 'bg-teal-600 border-teal-500 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350'
                          }`}
                        >
                          {chromatinTags.acetylated ? '✓ Histones Acetylated (HAT)' : 'Add Histone Acetylation (+CO-CH3)'}
                        </button>
                        <button
                          onClick={() => setChromatinTags(prev => ({ ...prev, methylated: !prev.methylated, acetylated: false }))}
                          className={`p-3 rounded-lg border text-xs font-bold text-center cursor-pointer transition-all ${
                            chromatinTags.methylated
                              ? 'bg-amber-600 border-amber-500 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350'
                          }`}
                        >
                          {chromatinTags.methylated ? '✓ DNA Methylated (DNMT)' : 'Add CpG DNA Methylation (-CH3)'}
                        </button>
                      </div>

                      {/* Visual representations */}
                      <div className="h-28 bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between transition-all duration-300">
                        {(!chromatinTags.acetylated && !chromatinTags.methylated) && (
                          <div className="h-full flex flex-col justify-center items-center text-center space-y-1">
                            <span className="text-slate-400 font-mono text-[10px] uppercase font-bold">Unmodified Chromatin Ground State</span>
                            <p className="text-[11px] text-slate-500">Add chemical epigenetic markings above to alter access to promoter regions.</p>
                          </div>
                        )}
                        {chromatinTags.acetylated && (
                          <div className="h-full flex flex-col justify-between text-left animate-fade-in">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></span>
                              <span className="text-xs font-bold text-emerald-800">EUCHROMATIN STATE (LOOSE / OPENED)</span>
                            </div>
                            <p className="text-[11px] text-slate-600">
                              Acetylation neutralizes the positive charges on histone proteins. This relaxes the electrostatic attraction, unpacking the nucleosomes. <strong>Promoter access is open! RNA Polymerase can freely bind and transcribe downstream genes.</strong>
                            </p>
                          </div>
                        )}
                        {chromatinTags.methylated && (
                          <div className="h-full flex flex-col justify-between text-left animate-fade-in">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"></span>
                              <span className="text-xs font-bold text-amber-800">HETEROCHROMATIN STATE (PACKED / SILENCED)</span>
                            </div>
                            <p className="text-[11px] text-slate-600">
                              Methylation of Cytosines in CpG dinucleotides recruits corepressor complexes, condensing nucleosomes tightly together. <strong>Promoter elements are locked inside! Transcription factors are barred, silencing gene expression.</strong>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'network_motif_sim' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">Feed-Forward Loop Delay & Noise Filter</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-400 block">Master Regulator X Input Concentration:</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={networkMotifXInput}
                          onChange={(e) => setNetworkMotifXInput(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                        <div className="flex justify-between font-mono text-[9px] text-slate-400 font-bold uppercase">
                          <span>Low (0)</span>
                          <span>Transient Spike (4)</span>
                          <span>Persistent Input (10)</span>
                        </div>
                      </div>

                      {/* Display State simulation */}
                      <div className="grid grid-cols-3 gap-2.5 font-mono text-center text-xs">
                        <div className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5 shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-400 block uppercase">Regulator [X]</span>
                          <div className="h-10 flex items-center justify-center font-bold">
                            {networkMotifXInput > 0 ? (
                              <span className="text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded text-[11px] animate-pulse">ACTIVE ({networkMotifXInput})</span>
                            ) : (
                              <span className="text-slate-400">INACTIVE</span>
                            )}
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5 shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-400 block uppercase">Regulator [Y]</span>
                          <div className="h-10 flex items-center justify-center font-bold">
                            {networkMotifXInput >= 7 ? (
                              <span className="text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded text-[11px] animate-pulse">ACCUMULATED</span>
                            ) : networkMotifXInput > 0 ? (
                              <span className="text-slate-400 italic text-[10px]">Charging...</span>
                            ) : (
                              <span className="text-slate-400">INACTIVE</span>
                            )}
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5 shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-400 block uppercase">Target [Z]</span>
                          <div className="h-10 flex items-center justify-center font-bold">
                            {networkMotifXInput >= 7 ? (
                              <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-[11px] animate-pulse font-extrabold">EXPRESSED</span>
                            ) : (
                              <span className="text-slate-400">BLOCKED</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 p-2.5 rounded text-[11px] leading-relaxed text-slate-600">
                        {networkMotifXInput === 0 && <p className="text-slate-400 italic">Drag the slider above to trigger Master Regulator X inputs.</p>}
                        {networkMotifXInput > 0 && networkMotifXInput < 7 && (
                          <p>
                            ⚠️ <strong>Transient Spike (Noise Filtered):</strong> Regulator X is active, but target Z requires BOTH X and the intermediate regulator Y to be active. Y has not yet accumulated enough concentration to trigger. The cell safely ignores this brief chemical fluctuation!
                          </p>
                        )}
                        {networkMotifXInput >= 7 && (
                          <p>
                            ✓ <strong>Persistent Input (Target Expressed):</strong> X has remained active long enough to fully activate and accumulate intermediate regulator Y. Now both X and Y bind the target AND-gate promoter, successfully triggering expression of <strong>Target Z!</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'circuit_builder' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">Synthetic Genetic Toggle Switch Switchboard</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-left">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Chemical Induction Panel</span>
                        <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">Bistable Memory: Active</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSyntheticToggleState('A')}
                          className={`p-3 rounded-lg border text-xs font-bold text-center cursor-pointer transition-all ${
                            syntheticToggleState === 'A'
                              ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350'
                          }`}
                        >
                          Pulse IPTG (Flip to State A)
                        </button>
                        <button
                          onClick={() => setSyntheticToggleState('B')}
                          className={`p-3 rounded-lg border text-xs font-bold text-center cursor-pointer transition-all ${
                            syntheticToggleState === 'B'
                              ? 'bg-rose-600 border-rose-500 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350'
                          }`}
                        >
                          Pulse aTc (Flip to State B)
                        </button>
                      </div>

                      {/* Display memory state */}
                      <div className="h-28 border border-slate-200 bg-white rounded-lg p-4 flex flex-col justify-between transition-all duration-300">
                        {syntheticToggleState === 'A' ? (
                          <div className="h-full flex flex-col justify-between animate-fade-in">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></span>
                              <span className="text-xs font-bold text-emerald-800">STATE A: GREEN FLUORESCENT (GFP) ACTIVE</span>
                            </div>
                            <p className="text-[11px] text-slate-600">
                              Lactose (IPTG) cleared LacI repression, allowing TetR to be expressed. TetR actively represses state B. <strong>Even if IPTG is washed away, the cell's genetic toggle switch remembers its state and continues glowing green!</strong>
                            </p>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col justify-between animate-fade-in">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></span>
                              <span className="text-xs font-bold text-rose-800">STATE B: RED FLUORESCENT (RFP) ACTIVE</span>
                            </div>
                            <p className="text-[11px] text-slate-600">
                              Anhydrotetracycline (aTc) bound and disabled TetR. This de-repressed the lacI gene, which synthesizes LacI proteins that block state A. <strong>The biological latch has locked into State B, continuously producing red fluorescence!</strong>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'long_read_assembly' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">Long-Read Assembler & Contiguity Estimator</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-slate-400 block">Average Read Length:</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="2000"
                              max="50000"
                              step="2000"
                              value={readLength}
                              onChange={(e) => setReadLength(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                            <span className="text-[10px] font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 whitespace-nowrap">{(readLength / 1000).toFixed(0)} kb</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-slate-400 block">Raw Read Error Rate:</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="1"
                              max="15"
                              value={readErrorRate}
                              onChange={(e) => setReadErrorRate(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                            <span className="text-[10px] font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 whitespace-nowrap">{readErrorRate}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Calculations */}
                      {(() => {
                        const n50 = Math.round((readLength * 20) * (1 - (readErrorRate / 22)));
                        const completeness = Math.min(100, Math.round(99.5 - (readErrorRate * 0.9) + (readLength / 8000)));
                        const gaps = Math.max(0, Math.round(18 - (readLength / 3500) + (readErrorRate * 0.4)));
                        return (
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px] bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs">
                              <div>
                                <span className="text-slate-400 block uppercase mb-0.5">Assembly N50</span>
                                <span className="font-bold text-slate-800 text-xs">{(n50 / 1000).toFixed(1)} Mb</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block uppercase mb-0.5">Genome Rebuilt</span>
                                <span className="font-bold text-teal-700 text-xs">{completeness}%</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block uppercase mb-0.5">Scaffold Gaps</span>
                                <span className={`font-bold text-xs ${gaps === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{gaps} gaps</span>
                              </div>
                            </div>

                            {/* Contig Visualizer */}
                            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200/60">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block">De Novo Chromosome Assembly Alignment Track:</span>
                              <div className="h-10 w-full bg-slate-100 rounded-md p-1.5 flex gap-1 items-center relative overflow-hidden">
                                {readLength < 8000 ? (
                                  // Fragmented, short reads
                                  Array.from({ length: 12 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="h-full bg-amber-500/80 rounded transition-all"
                                      style={{ width: `${Math.max(4, 95 / 12 - (readErrorRate / 5))}%` }}
                                    />
                                  ))
                                ) : readLength < 22000 ? (
                                  // Medium reads
                                  Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="h-full bg-teal-500/80 rounded transition-all"
                                      style={{ width: `${Math.max(10, 95 / 4 - (readErrorRate / 3))}%` }}
                                    />
                                  ))
                                ) : (
                                  // Long reads (high contiguity)
                                  <div className="h-full bg-emerald-600/90 rounded transition-all w-full flex items-center justify-center font-mono text-[9px] text-white font-bold">
                                    ★ SINGLE CONTIGUOUS ULTRA-LONG SCAFFOLD (N50: {(n50 / 1000).toFixed(1)} Mb)
                                  </div>
                                )}
                              </div>
                              <span className="text-[9px] text-slate-400 block">
                                {readLength >= 22000 
                                  ? "✓ Long reads successfully span repetitive genomic sequences, assembling full chromosomes in a single continuous block."
                                  : "⚠️ Short or highly erroneous reads cannot map across repetitive zones, leaving the assembly fragmented into numerous disconnected contigs."}
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'crispr_designer' && (
                  <div className="space-y-4 max-w-xl mx-auto text-left">
                    <h3 className="text-sm font-bold text-slate-800 text-center">SpCas9 sgRNA Programmable Target Search</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Genomic Target Strand Sequence (5' to 3'):</label>
                        <input
                          type="text"
                          value={crisprTargetSeq}
                          onChange={(e) => {
                            setCrisprTargetSeq(e.target.value.toUpperCase().replace(/[^ATCG]/g, ''));
                            setSelectedPamIndex(null);
                          }}
                          maxLength={50}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 uppercase focus:outline-none focus:border-teal-500"
                          placeholder="Type DNA sequence..."
                        />
                      </div>

                      {/* PAM Locator Logic */}
                      {(() => {
                        const pamSites: { index: number; pam: string; guide: string }[] = [];
                        // Scan for PAM site (NGG) starting at index 20 (so we have a 20bp spacer upstream)
                        for (let i = 20; i < crisprTargetSeq.length - 2; i++) {
                          if (crisprTargetSeq.substring(i + 1, i + 3) === 'GG') {
                            pamSites.push({
                              index: i,
                              pam: crisprTargetSeq.substring(i, i + 3),
                              guide: crisprTargetSeq.substring(i - 20, i)
                            });
                          }
                        }

                        return (
                          <div className="space-y-3">
                            {/* Sequence Map Visualizer */}
                            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs flex flex-wrap gap-x-0.5 gap-y-1.5 items-center justify-center select-none">
                              {crisprTargetSeq.split('').map((char, idx) => {
                                let isPam = false;
                                let isGuide = false;

                                if (selectedPamIndex !== null) {
                                  if (idx >= selectedPamIndex && idx < selectedPamIndex + 3) {
                                    isPam = true;
                                  } else if (idx >= selectedPamIndex - 20 && idx < selectedPamIndex) {
                                    isGuide = true;
                                  }
                                }

                                return (
                                  <span
                                    key={idx}
                                    className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold border transition-all ${
                                      isPam
                                        ? 'bg-rose-500 border-rose-600 text-white shadow-[0_0_8px_#f43f5e]'
                                        : isGuide
                                        ? 'bg-teal-500 border-teal-600 text-white shadow-[0_0_8px_#14b8a6]'
                                        : 'bg-slate-50 border-slate-200 text-slate-600'
                                    }`}
                                    title={`Index ${idx}`}
                                  >
                                    {char}
                                  </span>
                                );
                              })}
                            </div>

                            {/* List of guides */}
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">Identified Functional PAM Targets & sgRNA Spacer Pairs:</span>
                              {pamSites.length > 0 ? (
                                <div className="grid grid-cols-1 gap-2 max-h-44 overflow-y-auto pr-1">
                                  {pamSites.map((site) => {
                                    const gCount = (site.guide.match(/G/g) || []).length;
                                    const cCount = (site.guide.match(/C/g) || []).length;
                                    const gcPercent = Math.round(((gCount + cCount) / 20) * 100);
                                    const isSelected = selectedPamIndex === site.index;
                                    return (
                                      <button
                                        key={site.index}
                                        onClick={() => setSelectedPamIndex(site.index)}
                                        className={`w-full p-2 text-left rounded-lg border font-mono text-[10px] flex justify-between items-center transition-all cursor-pointer ${
                                          isSelected
                                            ? 'bg-teal-50 border-teal-400 text-teal-900 shadow-2xs'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                      >
                                        <div className="space-y-0.5">
                                          <div>
                                            <span className="text-slate-400 font-sans font-bold uppercase mr-1">Spacer:</span>
                                            <span className="text-teal-700 font-bold">{site.guide}</span>
                                          </div>
                                          <div>
                                            <span className="text-slate-400 font-sans font-bold uppercase mr-1">PAM (NGG):</span>
                                            <span className="text-rose-600 font-bold">{site.pam}</span>
                                          </div>
                                        </div>
                                        <div className="text-right space-y-0.5 font-sans">
                                          <div className="font-bold text-slate-700">GC: {gcPercent}%</div>
                                          <div className={`font-bold ${gcPercent >= 40 && gcPercent <= 60 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                            {gcPercent >= 40 && gcPercent <= 60 ? '✓ High efficiency' : '⚠️ Suboptimal'}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="p-3 bg-white border border-dashed border-slate-200 rounded-lg text-center text-xs text-slate-400 italic">
                                  No PAM sites (NGG) found with at least 20bp upstream spacer sequence. Extend your sequence above!
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {selectedLesson.content.interactiveExample?.type === 'ms_spectrum_solver' && (
                  <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-slate-800">Tandem MS/MS Collision & Fragmentation Solver</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-left">
                      <div className="flex gap-2 items-center justify-between">
                        <label className="text-[10px] font-bold uppercase text-slate-400 block">Select Peptide Sequence to Ionize:</label>
                        <div className="flex bg-slate-200 p-0.5 rounded-lg border border-slate-300">
                          {['MATH', 'VLAS', 'LCMS'].map(pep => (
                            <button
                              key={pep}
                              onClick={() => {
                                setSelectedPeptide(pep);
                                setSelectedMSFragment(2);
                              }}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-md cursor-pointer transition-all ${
                                selectedPeptide === pep
                                  ? 'bg-white text-teal-800 shadow-2xs'
                                  : 'text-slate-500 hover:text-slate-700'
                              }`}
                            >
                              {pep}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Fragmentation Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                          <span>Collision Gas Smashes Peptide Backbone</span>
                          <span className="text-teal-700 font-mono">Cleave Position: {selectedMSFragment}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max={selectedPeptide.length - 1}
                          value={selectedMSFragment}
                          onChange={(e) => setSelectedMSFragment(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 font-bold uppercase px-1">
                          {selectedPeptide.split('').map((char, i) => (
                            <span key={i}>{char}</span>
                          ))}
                        </div>
                      </div>

                      {/* Chemistry Math and Display */}
                      {(() => {
                        // Monoisotopic masses
                        const masses: Record<string, number> = {
                          M: 131.04,
                          A: 71.04,
                          T: 101.05,
                          H: 137.06,
                          V: 99.07,
                          L: 113.08,
                          S: 87.03,
                          C: 103.01
                        };

                        const leftSeq = selectedPeptide.substring(0, selectedMSFragment);
                        const rightSeq = selectedPeptide.substring(selectedMSFragment);

                        const leftWeightSum = leftSeq.split('').reduce((sum, char) => sum + (masses[char] || 0), 0);
                        const rightWeightSum = rightSeq.split('').reduce((sum, char) => sum + (masses[char] || 0), 0);

                        // b-ion = left sum + 1.01 (proton charge H+)
                        const bIonMass = (leftWeightSum + 1.01).toFixed(2);
                        // y-ion = right sum + 18.02 (water H2O) + 1.01 (H+)
                        const yIonMass = (rightWeightSum + 19.03).toFixed(2);

                        return (
                          <div className="space-y-4">
                            {/* Fragmented pieces representation */}
                            <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center font-mono text-xs">
                              <div className="p-2 bg-blue-50 text-blue-800 border border-blue-100 rounded text-center flex-1">
                                <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">N-Term (b-ion)</div>
                                <div className="font-bold text-sm tracking-widest">{leftSeq}⁺</div>
                                <div className="text-[10px] font-bold mt-1">{bIonMass} m/z</div>
                              </div>
                              <div className="px-3 text-slate-400 font-bold text-lg animate-pulse">⚡</div>
                              <div className="p-2 bg-rose-50 text-rose-800 border border-rose-100 rounded text-center flex-1">
                                <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">C-Term (y-ion)</div>
                                <div className="font-bold text-sm tracking-widest">{rightSeq}⁺</div>
                                <div className="text-[10px] font-bold mt-1">{yIonMass} m/z</div>
                              </div>
                            </div>

                            {/* Simulated MS/MS spectrum */}
                            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg h-32 relative flex flex-col justify-end">
                              <div className="absolute top-2 left-2 text-[8px] font-mono font-bold text-slate-500 uppercase">Tandem MS2 Peak Spectrum View (m/z)</div>
                              
                              <div className="h-20 w-full flex items-end justify-around relative px-4">
                                {/* Gridlines */}
                                <div className="absolute inset-0 border-b border-slate-800 flex flex-col justify-between">
                                  <div className="border-t border-slate-800/40 w-full h-0"></div>
                                  <div className="border-t border-slate-800/40 w-full h-0"></div>
                                  <div className="border-t border-slate-800/40 w-full h-0"></div>
                                </div>

                                {/* b-ion peak */}
                                <div className="flex flex-col items-center z-10 w-8" style={{ height: '80%' }}>
                                  <span className="text-[8px] font-mono text-blue-400 font-bold mb-1">{bIonMass}</span>
                                  <div className="w-1 bg-blue-500 h-full rounded-t shadow-[0_0_8px_#3b82f6]"></div>
                                  <span className="text-[8px] font-mono text-slate-400 font-bold mt-1">b{selectedMSFragment}</span>
                                </div>

                                {/* y-ion peak */}
                                <div className="flex flex-col items-center z-10 w-8" style={{ height: '95%' }}>
                                  <span className="text-[8px] font-mono text-rose-400 font-bold mb-1">{yIonMass}</span>
                                  <div className="w-1 bg-rose-500 h-full rounded-t shadow-[0_0_8px_#f43f5e]"></div>
                                  <span className="text-[8px] font-mono text-slate-400 font-bold mt-1">y{selectedPeptide.length - selectedMSFragment}</span>
                                </div>
                              </div>
                              
                              <div className="border-t border-slate-800 pt-1.5 flex justify-between font-mono text-[8px] text-slate-500 px-1 font-bold">
                                <span>0 m/z</span>
                                <span>250 m/z</span>
                                <span>500 m/z</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Fallback for lessons without specialized diagrams */}
                {!selectedLesson.content.diagramType && !selectedLesson.content.interactiveExample && (
                  <div className="text-center py-8 max-w-md mx-auto space-y-4">
                    <Database className="w-10 h-10 text-teal-600 mx-auto" />
                    <h3 className="text-base font-bold text-slate-900">Sanger Chromatography Trace Matrix</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sanger sequencing employs dideoxynucleoside triphosphates (ddNTPs) to selectively block DNA polymerase elongation, resolving molecules of varying lengths.
                    </p>
                    <div className="p-4 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-left space-y-1">
                      <div className="text-teal-700 font-semibold">G-Channel: [G] - [G] - [ ] - [ ] - [G]</div>
                      <div className="text-amber-700 font-semibold">A-Channel: [ ] - [ ] - [A] - [ ] - [ ]</div>
                      <div className="text-rose-700 font-semibold">T-Channel: [ ] - [ ] - [ ] - [T] - [ ]</div>
                      <div className="text-emerald-700 font-semibold">C-Channel: [ ] - [ ] - [ ] - [ ] - [ ] (End)</div>
                      <div className="text-slate-400 border-t border-slate-200 pt-2 text-[10px] uppercase font-bold">READ CHROMATOGRAM: G-G-A-T-G</div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveLessonTab('quiz')}
                    className="px-4 py-2 rounded-lg bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    Go to Knowledge Quiz
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeLessonTab === 'quiz' && (
              <div className="space-y-6 max-w-2xl mx-auto" id="panel-quiz">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">Conceptual Challenge Check</h3>
                </div>

                <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4" id="quiz-question-box">
                  <p className="text-slate-800 font-bold text-sm md:text-base">
                    {selectedLesson.content.quickQuiz.question}
                  </p>

                  <div className="flex flex-col gap-2.5" id="quiz-options-list">
                    {selectedLesson.content.quickQuiz.options.map((opt, idx) => {
                      const isSelected = quizAnswer === idx;
                      return (
                        <button
                          key={idx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswer(idx)}
                          className={`p-3.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 shadow-2xs'
                          }`}
                          id={`opt-btn-${idx}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      disabled={quizAnswer === null}
                      onClick={handleSubmitQuiz}
                      className="w-full py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 font-bold text-xs transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                      id="btn-submit-quiz"
                    >
                      Verify Selection
                    </button>
                  ) : (
                    <div className="mt-4 border-t border-slate-200 pt-4 space-y-3 animate-fade-in" id="quiz-response-result">
                      {quizResult ? (
                        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/50 text-emerald-800 text-xs font-bold flex gap-2">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                          <div>
                            <span className="font-extrabold uppercase">Correct Response!</span> You have unlocked 50 Experience Points. Progress has been logged in your research profile.
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200/50 text-rose-800 text-xs font-bold flex gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
                          <div>
                            <span className="font-extrabold uppercase">Review Required.</span> Inspect the bioinformatic explanation details and try again.
                          </div>
                        </div>
                      )}

                      <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Scientific Explanation:</span>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {selectedLesson.content.quickQuiz.explanation}
                        </p>
                      </div>

                      {!quizResult && (
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswer(null);
                            setQuizResult(null);
                          }}
                          className="px-3.5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
                        >
                          Retry Check
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
