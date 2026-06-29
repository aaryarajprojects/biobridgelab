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
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<1 | 2 | 3 | 4>(() => {
    return (progress.learningLevel as 1 | 2 | 3 | 4) || 1;
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
    4: "Metagenomic tracking, oncology driver mutations, and targeted genetic engineering via CRISPR-Cas9."
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
              {([1, 2, 3, 4] as const).map(num => {
                const isActive = num === selectedLevelFilter;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      setSelectedLevelFilter(num);
                      onUpdateProfile?.({ learningLevel: num });
                    }}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
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

                {/* Fallback for lessons without specialized diagrams */}
                {!selectedLesson.content.diagramType && (
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
