import React, { useState } from 'react';
import { FlaskConical, AlertCircle, RefreshCw, Activity, Copy, CheckCircle2, HelpCircle } from 'lucide-react';

interface AnalysisResult {
  length: number;
  counts: {
    A: number;
    T: number;
    G: number;
    C: number;
  };
  gcPercent: number;
  atPercent: number;
  complement: string;
  reverseComplement: string;
}

export default function VirtualLab() {
  const [sequenceInput, setSequenceInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [sampleLabel, setSampleLabel] = useState<string>('');
  
  const [analyzedSequence, setAnalyzedSequence] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Sample data helper
  const handleLoadSample = (sequence: string, label: string) => {
    setSequenceInput(sequence);
    setSampleLabel(label);
    setErrorMsg('');
    // Note: User can click "Analyze Sequence" to run calculations as requested
  };

  // Main analysis logic
  const handleAnalyze = () => {
    setErrorMsg('');

    // Error Safety: Check empty input
    if (!sequenceInput || sequenceInput.trim() === '') {
      setErrorMsg('DNA sequence cannot be empty. Please enter or load a sequence.');
      return;
    }

    // Input rules: Accept only A, T, G, C.
    // Convert lowercase letters to uppercase
    let cleaned = sequenceInput.toUpperCase();
    
    // Ignore spaces and line breaks
    cleaned = cleaned.replace(/[\s\r\n]+/g, '');

    // Error Safety: Reject numbers, symbols, and invalid characters
    if (/[^ATGC]/.test(cleaned)) {
      setErrorMsg('Invalid DNA sequence. Please use only A, T, G, and C characters.');
      return;
    }

    // Error Safety: Check very short sequence
    if (cleaned.length < 3) {
      setErrorMsg('The sequence is too short for analysis. Please enter at least 3 nucleotides.');
      return;
    }

    // Calculate DNA Analysis properties
    const totalLength = cleaned.length;
    const countA = (cleaned.match(/A/g) || []).length;
    const countT = (cleaned.match(/T/g) || []).length;
    const countG = (cleaned.match(/G/g) || []).length;
    const countC = (cleaned.match(/C/g) || []).length;

    // Formulas: (G + C) / Total Length * 100
    const gcPercent = ((countG + countC) / totalLength) * 100;
    // Formulas: (A + T) / Total Length * 100
    const atPercent = ((countA + countT) / totalLength) * 100;

    // Reverse Complement Tool Logic
    // Replace: A -> T, T -> A, G -> C, C -> G
    const complementMap: Record<string, string> = {
      'A': 'T',
      'T': 'A',
      'G': 'C',
      'C': 'G'
    };
    const complement = cleaned.split('').map(char => complementMap[char] || char).join('');
    // Then reverse the sequence
    const reverseComplement = complement.split('').reverse().join('');

    setAnalyzedSequence(cleaned);
    setAnalysis({
      length: totalLength,
      counts: {
        A: countA,
        T: countT,
        G: countG,
        C: countC
      },
      gcPercent: parseFloat(gcPercent.toFixed(2)),
      atPercent: parseFloat(atPercent.toFixed(2)),
      complement,
      reverseComplement
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="space-y-8 animate-fade-in" id="virtual-dna-lab-container">
      {/* 1. Header Section */}
      <div className="border-b border-slate-200 pb-6 space-y-2" id="lab-header">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FlaskConical className="w-7 h-7 md:w-8 h-8 text-teal-600" />
            Virtual DNA Analysis Lab
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl">
            Explore DNA sequences and learn the fundamentals of bioinformatics through interactive analysis.
          </p>
        </div>
        <p className="text-slate-400 text-xs font-medium max-w-xl">
          Students can practice basic sequence analysis without needing physical laboratory equipment.
        </p>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="lab-workspace-grid">
        {/* Left Side: Sequence Input & Sample Loader */}
        <div className="lg:col-span-5 space-y-6" id="input-and-samples-panel">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-xs">
            {/* Header for Module */}
            <div className="space-y-1">
              <span className="text-[10px] bg-teal-50 border border-teal-200/50 text-teal-700 px-2.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase block w-max">
                DNA Input Module
              </span>
              <h2 className="text-base font-bold text-slate-900">Genomic Sequence Entry</h2>
            </div>

            {/* 6. Sample Data System */}
            <div className="space-y-2" id="sample-data-system">
              <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase block">
                Load Reference DNA Sample:
              </span>
              <div className="flex flex-col sm:flex-row gap-2" id="sample-buttons-wrapper">
                <button
                  type="button"
                  onClick={() => handleLoadSample("AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG", "Human Insulin (INS) Gene Fragment")}
                  className="flex-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-lg text-[11px] font-bold text-slate-700 transition-all cursor-pointer shadow-3xs flex items-center gap-1.5 justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                  Human DNA Example
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample("ATGTCACCACAAACAGAGACTAAAGCAAGTGTTGGATTCAAAGCTGGTGTTAAAGAGTACAAATTGACTTATTATACTCCTGAATACGAAACCAAGGATACTGATATCTTGGCAGCATTCCGA", "Arabidopsis thaliana rbcL Gene Segment")}
                  className="flex-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-lg text-[11px] font-bold text-slate-700 transition-all cursor-pointer shadow-3xs flex items-center gap-1.5 justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  Plant DNA Example
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample("AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGAACGGTAACAGGAAGAAGCTTGCTTCTTTGCTGACGAGTGGCGGACGGGTGAGTAATGTCTGGGAA", "Escherichia coli 16S rRNA Segment")}
                  className="flex-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-lg text-[11px] font-bold text-slate-700 transition-all cursor-pointer shadow-3xs flex items-center gap-1.5 justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                  Bacterial DNA Example
                </button>
              </div>
              {sampleLabel && (
                <p className="text-[10px] text-slate-500 font-medium italic pl-1 animate-fade-in">
                  Loaded sample: {sampleLabel}
                </p>
              )}
            </div>

            {/* 2. DNA Sequence Input Form */}
            <div className="space-y-2">
              <label htmlFor="dna-sequence-input-area" className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                Raw Nucleotide Sequence:
              </label>
              <textarea
                id="dna-sequence-input-area"
                value={sequenceInput}
                onChange={(e) => {
                  setSequenceInput(e.target.value);
                  setSampleLabel(''); // Clear sample tag if edited manually
                }}
                placeholder="ATGCGTACGTA"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 font-mono text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-40 leading-relaxed shadow-3xs"
              />
              <p className="text-[10px] text-slate-400 font-medium leading-normal pl-0.5">
                Note: Standard inputs accept <strong className="text-slate-500">A, T, G, C</strong> bases. Spaces, tabs, and line breaks are automatically ignored, and lowercase letters are converted.
              </p>
            </div>

            {/* Educational error messaging */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2 animate-fade-in" id="input-validation-error">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="leading-tight">{errorMsg}</div>
              </div>
            )}

            {/* Submit Action */}
            <button
              onClick={handleAnalyze}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 shadow-2xs active:scale-[0.98]"
              id="btn-analyze-sequence"
            >
              <Activity className="w-4 h-4" />
              Analyze Sequence
            </button>
          </div>
        </div>

        {/* Right Side: Analysis Report Dashboard */}
        <div className="lg:col-span-7 space-y-6" id="analysis-report-panel">
          {analysis ? (
            <div className="space-y-6 animate-fade-in" id="lab-analysis-results">
              
              {/* 4. Results Dashboard */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-xs">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-teal-600 font-mono font-bold uppercase tracking-wider block">Diagnostics Completed</span>
                    <h2 className="text-base font-bold text-slate-900">Molecular Metrics Dashboard</h2>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
                    VERIFIED REPORT
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="metric-cards-grid">
                  {/* Card A: Sequence Length */}
                  <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl flex flex-col justify-between shadow-3xs" id="card-seq-length">
                    <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">Sequence Length</span>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{analysis.length}</span>
                      <span className="text-xs font-mono font-bold text-slate-400">bp</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">Total nucleotide bases analyzed.</span>
                  </div>

                  {/* Card B: GC Content */}
                  <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl flex flex-col justify-between shadow-3xs" id="card-gc-content">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">GC Content</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-150 px-1.5 py-0.5 rounded font-mono font-black uppercase">
                        {analysis.gcPercent > 60 ? "High GC" : analysis.gcPercent < 40 ? "Low GC" : "Moderate"}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <span className="text-2xl font-black text-emerald-600">{analysis.gcPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${analysis.gcPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Card C: AT Content */}
                  <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl flex flex-col justify-between shadow-3xs" id="card-at-content">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">AT Content</span>
                      <span className="text-[9px] bg-sky-50 text-sky-800 border border-sky-150 px-1.5 py-0.5 rounded font-mono font-black uppercase">
                        {analysis.atPercent > 60 ? "High AT" : analysis.atPercent < 40 ? "Low AT" : "Moderate"}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <span className="text-2xl font-black text-sky-600">{analysis.atPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full transition-all duration-300" style={{ width: `${analysis.atPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Card D: Nucleotide Distribution */}
                  <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl space-y-2.5 shadow-3xs" id="card-nucleotide-distribution">
                    <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">Nucleotide Distribution</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between p-1.5 bg-white border border-slate-150 rounded-lg">
                        <span className="font-mono font-black text-slate-700">Adenine (A)</span>
                        <span className="font-mono font-bold text-slate-900">{analysis.counts.A}</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 bg-white border border-slate-150 rounded-lg">
                        <span className="font-mono font-black text-slate-700">Thymine (T)</span>
                        <span className="font-mono font-bold text-slate-900">{analysis.counts.T}</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 bg-white border border-slate-150 rounded-lg">
                        <span className="font-mono font-black text-slate-700">Guanine (G)</span>
                        <span className="font-mono font-bold text-slate-900">{analysis.counts.G}</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 bg-white border border-slate-150 rounded-lg">
                        <span className="font-mono font-black text-slate-700">Cytosine (C)</span>
                        <span className="font-mono font-bold text-slate-900">{analysis.counts.C}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Reverse Complement Tool Section */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs" id="reverse-complement-tool">
                <div className="border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">Reverse Complement Tool</h3>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Original Input */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                      Input Sequence (5' to 3'):
                    </span>
                    <div className="bg-slate-50/50 p-2.5 rounded-lg font-mono text-slate-600 break-all border border-slate-200 shadow-inner">
                      {analyzedSequence}
                    </div>
                  </div>

                  {/* Complement */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                      Complement Sequence (3' to 5'):
                    </span>
                    <div className="bg-slate-50/50 p-2.5 rounded-lg font-mono text-slate-600 break-all border border-slate-200 shadow-inner">
                      {analysis.complement}
                    </div>
                  </div>

                  {/* Reverse Complement */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-teal-600 font-black block uppercase tracking-wider">
                        Reverse Complement (5' to 3'):
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(analysis.reverseComplement)}
                        className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 border border-teal-200 transition-all cursor-pointer shadow-3xs"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-teal-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy Strand
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-teal-50/40 p-3 rounded-lg font-mono text-teal-950 font-bold break-all border border-teal-100 shadow-inner text-sm">
                      {analysis.reverseComplement}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong>Scientific workflow note:</strong> Reverse complement is commonly used in DNA sequence analysis workflows. It represents the synthesized double-stranded DNA sequence in its standard 5' to 3' replication orientation.
                </p>
              </div>

              {/* 7. Educational Explanation Layer */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs" id="educational-explanation-layer">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <HelpCircle className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">What does this mean?</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-emerald-800 block">GC Content</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Higher GC content can indicate differences in DNA composition. Guanine (G) and Cytosine (C) pair with three hydrogen bonds, which are stronger and more stable than the two hydrogen bonds of Adenine (A) and Thymine (T). Higher GC content makes a DNA strand more resistant to heat denaturation.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-slate-800 block">Sequence Length</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Shows number of nucleotide bases analyzed. In physical research, sequence lengths are calculated in base pairs (bp). Different genomic structures require exact fragment sizing, such as sizing PCR primers or identifying structural open reading frames.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Standby State */
            <div className="p-8 bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[350px] animate-fade-in" id="empty-state-card">
              <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <FlaskConical className="w-8 h-8 text-teal-600" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="text-base font-bold text-slate-900">Awaiting Sequence Analysis</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Load one of the predefined samples or paste your own DNA sequence strand on the left, then click <strong>Analyze Sequence</strong> to run molecular diagnostics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
