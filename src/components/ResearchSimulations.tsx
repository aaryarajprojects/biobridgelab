import React, { useState } from 'react';
import { 
  Activity, CheckCircle2, ChevronRight, FileText, FlaskConical, 
  AlertTriangle, ShieldCheck, RefreshCw, Dna, Info, Sparkles, 
  HelpCircle, ArrowRight, Layers, Clipboard, Microscope, 
  Check, Play, ArrowLeft, Printer, Award, ExternalLink
} from 'lucide-react';
import { SavedReport, UserProgress } from '../types';

// ============================================================================
// SIMULATION DATA TYPES & CONSTANTS
// ============================================================================

interface Patient {
  id: string;
  name: string;
  gender: string;
  age: number;
  symptoms: string;
  rawSequence: string;
}

const PATIENTS: Patient[] = [
  {
    id: "PAT-HTT-01",
    name: "Eleanor Vance",
    gender: "Female",
    age: 42,
    symptoms: "Asymptomatic. Paternal grandmother and uncle diagnosed with early-onset chorea and cognitive decline.",
    rawSequence: "ATGGCGACCCTGGAAAAGCTGATGAAGGCCTTCGAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCTCCTCCTACCGCT"
  },
  {
    id: "PAT-HTT-02",
    name: "David Sterling",
    gender: "Male",
    age: 38,
    symptoms: "Experiencing mild involuntary hand tremors, motor instability, and sudden mood swings.",
    rawSequence: "ATGGCGACCCTGGAAAAGCTGATGAAGGCCTTCGAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCTCCTCCTACCGCT"
  },
  {
    id: "PAT-HTT-03",
    name: "Marcus Thorne",
    gender: "Male",
    age: 29,
    symptoms: "Asymptomatic. Mother was diagnosed with Huntington's Disease at age 51. Requesting proactive pre-symptomatic screening.",
    rawSequence: "ATGGCGACCCTGGAAAAGCTGATGAAGGCCTTCGAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCAGCTCCTCCTACCGCT"
  }
];

interface ComparisonSample {
  name: string;
  label: string;
  seqA: string;
  seqB: string;
  description: string;
}

const COMPARISON_SAMPLES: ComparisonSample[] = [
  {
    name: "Primer Target Locus",
    label: "Oligonucleotide Primer Sequence Pairing",
    seqA: "ATGCGTACGA",
    seqB: "ATGCGTTCGA",
    description: "A short primer segment with a single nucleotide difference at position 7. Great for testing basic point mutations."
  },
  {
    name: "Beta-Globin Fragment",
    label: "Human vs. Chimpanzee HBB Segment",
    seqA: "ATGGTGCACCTGACTCCTGAGGAGAAGTCT",
    seqB: "ATGGTGCACCTGACTCCTGAGGAGAAGTCC",
    description: "Highly conserved biological fragment comparing human and chimpanzee hemoglobin beta chain with a synonymous variation at position 30."
  },
  {
    name: "Viral Strain Spike",
    label: "SARS-CoV-2 Spike Locus Divergence",
    seqA: "ATGTTTGTTTTTCTTGTTTTATTGCCACTA",
    seqB: "ATGTTTGTTTTTCTTGTTTTATCGCCACTA",
    description: "Comparing spike protein coding frames to locate single point variations that determine antibody affinity and cell access."
  }
];

interface MutationSample {
  name: string;
  label: string;
  original: string;
  mutated: string;
  mutationType: string;
  description: string;
}

const MUTATION_SAMPLES: MutationSample[] = [
  {
    name: "Sickle Cell Variant",
    label: "Beta-Globin Codon 6 Substitution (A → T)",
    original: "ATGGTGCACCTGACTCCTGAGGAGAAG",
    mutated: "ATGGTGCACCTGACTCCTGTGGAGAAG",
    mutationType: "Missense Point Substitution",
    description: "A single nucleotide change (A to T) at position 20 changes the codon GAG (Glutamic Acid) to GTG (Valine), altering protein shape."
  },
  {
    name: "Cystic Fibrosis Insertion",
    label: "CFTR Regulator Frameshift (+1 T)",
    original: "ATGGTGCACCTGACTCCTGAGGAGAAG",
    mutated: "ATGGTGCACCTGACTCCTTGAGGAGAAG",
    mutationType: "Frameshift Insertion",
    description: "Inserting a single Thymine base at position 19 shifts the downstream reading frame completely, producing entirely different codons."
  },
  {
    name: "In-Frame CFTR Codon Del",
    label: "CFTR Channel deletion (-3 GAA)",
    original: "ATGGTGCACCTGACTCCTGAGGAGAAG",
    mutated: "ATGGTGCACCTGACTCCTGGAGAAG",
    mutationType: "In-Frame Codon Deletion",
    description: "Deleting three consecutive bases (GAA) removes exactly one amino acid codon (Glutamate) without disrupting downstream reading frames."
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface ResearchSimulationsProps {
  progress?: UserProgress;
  onSaveReport?: (report: SavedReport) => void;
  onCompleteSimulation?: (simId: string) => void;
}

export default function ResearchSimulations({ progress, onSaveReport, onCompleteSimulation }: ResearchSimulationsProps) {
  // Navigation / Dashboard State
  // If activeProjectId is null, we show the Research Projects selection dashboard
  const [activeProjectId, setActiveProjectId] = useState<'comparison' | 'mutation' | 'huntington' | null>(null);
  const [reportSaved, setReportSaved] = useState<Record<string, boolean>>({});

  const handleSaveSimulationReport = (simId: string, customReport: SavedReport) => {
    if (onSaveReport) {
      onSaveReport(customReport);
    }
    if (onCompleteSimulation) {
      onCompleteSimulation(simId);
    }
    setReportSaved(prev => ({ ...prev, [simId]: true }));
  };

  // ==========================================================================
  // SIMULATION 1: DNA COMPARISON STATES
  // ==========================================================================
  const [compSeqA, setCompSeqA] = useState('ATGCGTACGA');
  const [compSeqB, setCompSeqB] = useState('ATGCGTTCGA');
  const [compStep, setCompStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [compError, setCompError] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [compResult, setCompResult] = useState<{
    length: number;
    matchingCount: number;
    mismatchCount: number;
    similarity: number;
    differences: { pos: number; from: string; to: string }[];
  } | null>(null);

  // ==========================================================================
  // SIMULATION 2: MUTATION EXPLORER STATES
  // ==========================================================================
  const [mutOriginal, setMutOriginal] = useState('ATGGTGCACCTGACTCCTGAGGAGAAG');
  const [mutMutated, setMutMutated] = useState('ATGGTGCACCTGACTCCTGTGGAGAAG');
  const [mutStep, setMutStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [mutError, setMutError] = useState('');
  const [isMutAnalyzing, setIsMutAnalyzing] = useState(false);
  const [mutResult, setMutResult] = useState<{
    origLen: number;
    mutLen: number;
    isSameLength: boolean;
    differences: { pos: number; from: string; to: string }[];
    mutationType: string;
    mutationDesc: string;
  } | null>(null);

  // ==========================================================================
  // SIMULATION 3: HUNTINGTON'S DIAGNOSTIC STATES
  // ==========================================================================
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [huntStep, setHuntStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    cagCount: number;
    clinicalStatus: 'Normal' | 'Premutation' | 'Affected';
    riskDescription: string;
  } | null>(null);
  const [clinicalConclusion, setClinicalConclusion] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // ==========================================================================
  // PRINT/EXPORT REPORT SIMULATOR
  // ==========================================================================
  const [printSuccess, setPrintSuccess] = useState(false);
  const triggerPrintSim = () => {
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 3000);
  };

  // ==========================================================================
  // ACTIONS & LOGIC FOR SIMULATION 1: COMPARISON
  // ==========================================================================
  
  const handleLoadCompSample = (sample: ComparisonSample) => {
    setCompSeqA(sample.seqA);
    setCompSeqB(sample.seqB);
    setCompError('');
    setCompStep(2); // Jump to Biological Data view to inspect and analyze
  };

  const executeComparison = () => {
    setCompError('');
    setIsComparing(true);

    // Process/Clean sequence inputs (ignore spaces, line breaks, convert to uppercase)
    const cleanedA = compSeqA.toUpperCase().replace(/[\s\r\n]+/g, '');
    const cleanedB = compSeqB.toUpperCase().replace(/[\s\r\n]+/g, '');

    // Error Checks
    if (!cleanedA || !cleanedB) {
      setCompError('Sequence inputs cannot be empty. Please load or write DNA strings.');
      setIsComparing(false);
      return;
    }

    if (/[^ATGC]/.test(cleanedA) || /[^ATGC]/.test(cleanedB)) {
      setCompError('Invalid genetic bases. Sequences must contain only nucleobases Adenine (A), Thymine (T), Guanine (G), and Cytosine (C).');
      setIsComparing(false);
      return;
    }

    if (cleanedA.length !== cleanedB.length) {
      setCompError(`Different sequence lengths detected (Sample A is ${cleanedA.length} bp, Sample B is ${cleanedB.length} bp). Point-by-point similarity comparison requires sequences of equal lengths.`);
      setIsComparing(false);
      return;
    }

    // Run Comparison Simulation
    setTimeout(() => {
      const len = cleanedA.length;
      let matches = 0;
      const diffs: { pos: number; from: string; to: string }[] = [];

      for (let i = 0; i < len; i++) {
        if (cleanedA[i] === cleanedB[i]) {
          matches++;
        } else {
          diffs.push({
            pos: i + 1,
            from: cleanedA[i],
            to: cleanedB[i]
          });
        }
      }

      const similarityPct = (matches / len) * 100;

      setCompResult({
        length: len,
        matchingCount: matches,
        mismatchCount: diffs.length,
        similarity: parseFloat(similarityPct.toFixed(1)),
        differences: diffs
      });

      setIsComparing(false);
      setCompStep(3); // Go to Step 3: Analysis result
    }, 800);
  };

  // ==========================================================================
  // ACTIONS & LOGIC FOR SIMULATION 2: MUTATION EXPLORER
  // ==========================================================================

  const handleLoadMutSample = (sample: MutationSample) => {
    setMutOriginal(sample.original);
    setMutMutated(sample.mutated);
    setMutError('');
    setMutStep(2); // Jump to biological data
  };

  const executeMutationAnalysis = () => {
    setMutError('');
    setIsMutAnalyzing(true);

    const cleanedOrig = mutOriginal.toUpperCase().replace(/[\s\r\n]+/g, '');
    const cleanedMut = mutMutated.toUpperCase().replace(/[\s\r\n]+/g, '');

    if (!cleanedOrig || !cleanedMut) {
      setMutError('Sequence inputs cannot be empty. Please specify both the reference and test sequences.');
      setIsMutAnalyzing(false);
      return;
    }

    if (/[^ATGC]/.test(cleanedOrig) || /[^ATGC]/.test(cleanedMut)) {
      setMutError('Invalid genetic bases. Please utilize only characters A, T, G, and C.');
      setIsMutAnalyzing(false);
      return;
    }

    setTimeout(() => {
      const origL = cleanedOrig.length;
      const mutL = cleanedMut.length;
      const isSame = origL === mutL;

      const diffs: { pos: number; from: string; to: string }[] = [];
      const maxLen = Math.max(origL, mutL);

      for (let i = 0; i < maxLen; i++) {
        const charOrig = cleanedOrig[i] || '-';
        const charMut = cleanedMut[i] || '-';
        if (charOrig !== charMut) {
          diffs.push({
            pos: i + 1,
            from: charOrig,
            to: charMut
          });
        }
      }

      // Diagnose mutation type
      let type = "Base Variation";
      let desc = "A change has been recorded in the genetic nucleobase structure.";

      if (isSame) {
        if (diffs.length === 0) {
          type = "Homologous Genome";
          desc = "No sequence modifications detected. Both strings share 100% molecular homology.";
        } else if (diffs.length === 1) {
          type = "Single Nucleotide Polymorphism (Substitution)";
          desc = `Point substitution at position ${diffs[0].pos} (Base ${diffs[0].from} replaced by ${diffs[0].to}). Depending on translation, this represents a missense or silent mutation.`;
        } else {
          type = "Multiple Point Substitutions";
          desc = `Detected ${diffs.length} distinct point substitutions across equal-length strands. This indicates localized genetic divergence.`;
        }
      } else {
        if (mutL > origL) {
          type = `Frameshift Insertion (+${mutL - origL} bp)`;
          desc = `An insertion of ${mutL - origL} nucleotide base(s) has occurred. Adding base pairs disrupts the downstream triplet codon reading frame during ribosome translation.`;
        } else {
          type = `Frameshift Deletion (-${origOrigLen() - mutL} bp)`; // helper below
          const diffLen = origL - mutL;
          if (diffLen === 3) {
            type = "In-Frame Codon Deletion (-3 bp)";
            desc = "Exactly one codon (3 bases) has been deleted. The reading frame downstream remains intact, but a single amino acid is absent from the produced protein.";
          } else {
            type = `Frameshift Deletion (-${diffLen} bp)`;
            desc = `A deletion of ${diffLen} nucleotide base(s) has occurred. This shifts the codon reading frames, altering downstream amino acid assemblies.`;
          }
        }
      }

      function origOrigLen() { return origL; }

      setMutResult({
        origLen: origL,
        mutLen: mutL,
        isSameLength: isSame,
        differences: diffs,
        mutationType: type,
        mutationDesc: desc
      });

      setIsMutAnalyzing(false);
      setMutStep(3); // Proceed to analysis
    }, 800);
  };

  // ==========================================================================
  // ACTIONS & LOGIC FOR SIMULATION 3: HUNTINGTON'S DIAGNOSTICS
  // ==========================================================================

  const resetHuntSimulation = () => {
    setActivePatient(null);
    setHuntStep(1);
    setIsScanning(false);
    setScanResult(null);
    setClinicalConclusion('');
    setReportSubmitted(false);
  };

  const selectPatient = (patient: Patient) => {
    setActivePatient(patient);
    setHuntStep(2); // Go to Step 2: Biological Data
    setIsScanning(false);
    setScanResult(null);
    setClinicalConclusion('');
    setReportSubmitted(false);
  };

  const runCagScan = () => {
    if (!activePatient) return;
    setIsScanning(true);
    setScanResult(null);

    // Simulate PCR capillarization scan delay
    setTimeout(() => {
      const seq = activePatient.rawSequence.toUpperCase();
      const cagRegex = /(CAG)+/g;
      let maxRepeats = 0;
      let match;
      
      while ((match = cagRegex.exec(seq)) !== null) {
        const count = match[0].length / 3;
        if (count > maxRepeats) {
          maxRepeats = count;
        }
      }

      let status: 'Normal' | 'Premutation' | 'Affected' = 'Normal';
      let desc = '';

      if (maxRepeats <= 35) {
        status = 'Normal';
        desc = 'Within normal physiological range. Low risk of developing disease. Unlikely to transmit expanded pathological alleles to progeny.';
      } else if (maxRepeats >= 36 && maxRepeats <= 39) {
        status = 'Premutation';
        desc = 'Reduced penetrance. The patient may or may not develop full symptoms in their lifetime. Alleles are moderately unstable and prone to expanding in subsequent generations.';
      } else {
        status = 'Affected';
        desc = 'Full penetrance. High certainty of clinical Huntington’s pathology. Transmits via autosomal dominant inheritance with a 50% likelihood per offspring.';
      }

      setScanResult({
        cagCount: maxRepeats,
        clinicalStatus: status,
        riskDescription: desc
      });
      setIsScanning(false);
      setHuntStep(3); // Go to Step 3: Analysis
    }, 1200);
  };

  const submitPathologyReport = () => {
    if (!scanResult) return;
    setReportSubmitted(true);
    setHuntStep(5); // Go straight to Step 5: Clinical Conclusion Card
  };

  return (
    <div className="space-y-8 animate-fade-in" id="research-simulation-page">
      
      {/* ======================================================================
          LANDING SCREEN: RESEARCH PROJECTS HUB
          ====================================================================== */}
      {activeProjectId === null ? (
        <div className="space-y-8" id="research-landing-dashboard">
          {/* Dashboard Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="simulations-hub-header">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                <Microscope className="w-8 h-8 text-teal-600" />
                Virtual Research Simulations
              </h1>
              <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                Experience how molecular biologists and laboratory geneticists analyze actual DNA data, map mutations, form hypotheses, and document official diagnostic conclusions.
              </p>
            </div>
          </div>

          {/* Project Roster Grid */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Available Lab Investigations</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="research-projects-grid">
              
              {/* Card Project 01 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 transition-all flex flex-col justify-between space-y-6 shadow-3xs group duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded font-mono font-bold text-slate-500">PROJECT 01</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">Beginner</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <Dna className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">DNA Sequence Comparison</h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Compare two independent DNA sequences to locate nucleotide matches and differences. Calculate sequence similarity rates and map specific point mutation polymorphisms.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveProjectId('comparison');
                    setCompStep(1);
                  }}
                  className="w-full py-2.5 bg-slate-50 border border-slate-200 hover:bg-teal-600 hover:border-teal-600 hover:text-white font-bold text-slate-700 text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-3xs"
                  id="btn-start-proj-1"
                >
                  <Play className="w-3.5 h-3.5" />
                  Start Experiment
                </button>
              </div>

              {/* Card Project 02 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 transition-all flex flex-col justify-between space-y-6 shadow-3xs group duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded font-mono font-bold text-slate-500">PROJECT 02</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">Beginner</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">Mutation Explorer</h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Study how molecular mutations mutate gene templates. Input and test substitutions, insertions, or deletions to examine translation shift mechanisms.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveProjectId('mutation');
                    setMutStep(1);
                  }}
                  className="w-full py-2.5 bg-slate-50 border border-slate-200 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white font-bold text-slate-700 text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-3xs"
                  id="btn-start-proj-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  Start Experiment
                </button>
              </div>

              {/* Card Project 03 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-500 transition-all flex flex-col justify-between space-y-6 shadow-3xs group duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded font-mono font-bold text-slate-500">PROJECT 03</span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-100 px-2 py-0.5 rounded-full font-bold">Intermediate</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                      <Activity className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">Huntington's Triplet Diagnostics</h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Perform pre-symptomatic clinical screenings on DNA strands. Run PCR scanning to isolate pathogenic trinucleotide (CAG) repeat expansions in the HTT gene.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveProjectId('huntington');
                    setHuntStep(1);
                  }}
                  className="w-full py-2.5 bg-slate-50 border border-slate-200 hover:bg-sky-600 hover:border-sky-600 hover:text-white font-bold text-slate-700 text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-3xs"
                  id="btn-start-proj-3"
                >
                  <Play className="w-3.5 h-3.5" />
                  Start Experiment
                </button>
              </div>

            </div>
          </div>

          {/* Research Best Practices Infographic */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-600" />
              Virtual Scientific Workflow Code of Conduct
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Academic research follows standard stages. To achieve complete validation, you must systematically complete all 5 research steps in order: (1) Review the Research Question, (2) Verify the raw Biological Data, (3) Execute sequence Analysis, (4) Map and document scientific Observations, and (5) Draft professional conclusions.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6" id="active-simulation-workspace">
          
          {/* active project header bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveProjectId(null)}
              className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-3xs transition-all"
              id="btn-back-to-hub"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Projects Hub
            </button>

            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Currently Conducting</span>
              <span className="text-sm font-extrabold text-slate-800">
                {activeProjectId === 'comparison' && 'DNA Sequence Comparison'}
                {activeProjectId === 'mutation' && 'Mutation Explorer'}
                {activeProjectId === 'huntington' && "Huntington's Triplet Diagnostics"}
              </span>
            </div>
          </div>

          {/* ==================================================================
              SIMULATION 1 ACTIVE: SEQUENCE SIMILARITY COMPARISON
              ================================================================== */}
          {activeProjectId === 'comparison' && (
            <div className="space-y-6" id="sim-comparison">
              
              {/* Stepper Header */}
              <div className="grid grid-cols-5 gap-2 text-center" id="comp-stepper-5">
                {[
                  { num: 1, label: "1. Research Question" },
                  { num: 2, label: "2. Biological Data" },
                  { num: 3, label: "3. Analysis" },
                  { num: 4, label: "4. Observation" },
                  { num: 5, label: "5. Conclusion" }
                ].map(s => (
                  <button
                    key={s.num}
                    onClick={() => {
                      if (s.num <= compStep || (compResult && s.num <= 5)) {
                        setCompStep(s.num as 1 | 2 | 3 | 4 | 5);
                      }
                    }}
                    className={`py-2 px-1 rounded-lg border text-[10px] md:text-xs font-bold transition-all ${
                      compStep === s.num
                        ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                        : (compResult || s.num < compStep)
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                        : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed select-none'
                    }`}
                    id={`comp-step-tab-${s.num}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* STEP 1: RESEARCH QUESTION */}
              {compStep === 1 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="comp-step-1">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 1: Scientific Question & Hypothesis</h3>
                      <p className="text-xs text-slate-500">Define the core scientific premise of sequence similarity.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">Research Premise</span>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">
                        "How similar are two DNA sequences, and where do their base differences originate?"
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        By aligning nucleotide strands side-by-side, researchers can identify point mutations and calculate evolutionary proximity between distinct genomic lines.
                      </p>
                    </div>

                    <div className="p-4 bg-teal-50/40 border border-teal-200/50 rounded-xl space-y-2 text-xs">
                      <h4 className="font-bold text-teal-950 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        Student Investigator Mission Goals:
                      </h4>
                      <ul className="text-slate-600 space-y-2 pl-4 list-disc font-medium">
                        <li>Examine biological datasets representing primers, beta-globin, or viruses.</li>
                        <li>Learn how to evaluate complementary nucleotide pairings.</li>
                        <li>Analyze sequence alignments and compile a validated Result Report Card.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setCompStep(2)}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Proceed to Biological Data
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: BIOLOGICAL DATA */}
              {compStep === 2 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="comp-step-2">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <Clipboard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 2: Biological Data Inspection</h3>
                      <p className="text-xs text-slate-500">Load preset sequence references or paste target sequences.</p>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                      Load Reference Case Studies:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {COMPARISON_SAMPLES.map(sample => (
                        <button
                          key={sample.name}
                          onClick={() => handleLoadCompSample(sample)}
                          className="p-3 border rounded-xl bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-left space-y-1.5 transition-all cursor-pointer shadow-3xs text-xs"
                        >
                          <span className="text-[10px] bg-teal-50 border border-teal-200 text-teal-800 px-2 py-0.5 rounded-full font-bold font-mono">
                            {sample.name}
                          </span>
                          <p className="text-[11px] text-slate-700 font-bold leading-tight">{sample.label}</p>
                          <p className="text-[10px] text-slate-400 font-medium leading-normal">{sample.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="comp-in-a" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                        <span>Sample A Sequence:</span>
                        <span className="font-mono text-slate-400">{compSeqA.replace(/[\s\r\n]+/g, '').length} bp</span>
                      </label>
                      <textarea
                        id="comp-in-a"
                        value={compSeqA}
                        onChange={(e) => {
                          setCompSeqA(e.target.value);
                          setCompError('');
                        }}
                        placeholder="ATGCGTACGA"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-28 leading-relaxed shadow-3xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="comp-in-b" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                        <span>Sample B Sequence:</span>
                        <span className="font-mono text-slate-400">{compSeqB.replace(/[\s\r\n]+/g, '').length} bp</span>
                      </label>
                      <textarea
                        id="comp-in-b"
                        value={compSeqB}
                        onChange={(e) => {
                          setCompSeqB(e.target.value);
                          setCompError('');
                        }}
                        placeholder="ATGCGTTCGA"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-28 leading-relaxed shadow-3xs"
                      />
                    </div>
                  </div>

                  {compError && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2" id="comp-error-p2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{compError}</div>
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setCompStep(1)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Hypothesis
                    </button>

                    <button
                      onClick={executeComparison}
                      disabled={isComparing}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      {isComparing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Aligning Sequence Matrices...
                        </>
                      ) : (
                        <>
                          <Activity className="w-4 h-4" />
                          Initialize Alignment Algorithm
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ANALYSIS */}
              {compStep === 3 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="comp-step-3">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 3: Comparative Analysis Output</h3>
                      <p className="text-xs text-slate-500">Quantitative metrics computed by the alignment processor.</p>
                    </div>
                  </div>

                  {compResult ? (
                    <div className="space-y-6">
                      {/* Metric widgets */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="comp-metrics-summary">
                        <div className="p-4 bg-teal-50/40 border border-teal-150 rounded-xl space-y-1">
                          <span className="text-[10px] text-teal-800 font-mono font-bold uppercase tracking-wider block">Sequence Similarity</span>
                          <span className="text-3xl font-black text-teal-900">{compResult.similarity}%</span>
                          <span className="text-[10px] text-teal-600 font-medium block">Total base matches / sequence length</span>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Matching Positions</span>
                          <span className="text-2xl font-black text-slate-800">{compResult.matchingCount} / {compResult.length} bp</span>
                          <span className="text-[10px] text-slate-500 font-medium block">Conserved base positions</span>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Mutated Positions</span>
                          <span className="text-2xl font-black text-rose-700">{compResult.mismatchCount} bp</span>
                          <span className="text-[10px] text-slate-500 font-medium block">Single nucleotide polymorphs</span>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                        <h4 className="font-bold text-slate-800">Biomedical Analysis Status:</h4>
                        <p className="text-slate-600">
                          The sequence pair comparison successfully validated. There is a total molecular alignment of {compResult.length} nucleobases. A similarity rate of <strong className="text-teal-700 font-bold">{compResult.similarity}%</strong> is calculated.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 italic text-xs">
                      No analysis computed. Please return to biological data and initialize comparative algorithms.
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setCompStep(2)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Biological Data
                    </button>

                    <button
                      onClick={() => setCompStep(4)}
                      disabled={!compResult}
                      className="px-5 py-2.5 bg-teal-600 disabled:opacity-45 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Proceed to Observation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: OBSERVATION */}
              {compStep === 4 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="comp-step-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 4: Microscopic Alignment Mapping</h3>
                      <p className="text-xs text-slate-500">Visual mapping of complementary nucleobase connections.</p>
                    </div>
                  </div>

                  {compResult ? (
                    <div className="space-y-6">
                      {/* Grid connect block */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Genomic Map Visualizer</span>
                        
                        <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl border border-slate-900 font-mono overflow-x-auto shadow-inner space-y-4">
                          {/* Sample A */}
                          <div className="flex items-center gap-4">
                            <span className="w-20 text-[10px] text-slate-400 font-bold uppercase shrink-0">Sample A:</span>
                            <div className="flex gap-1.5">
                              {compSeqA.toUpperCase().replace(/[\s\r\n]+/g, '').split('').map((char, idx) => {
                                const isMatch = compSeqA.toUpperCase().replace(/[\s\r\n]+/g, '')[idx] === compSeqB.toUpperCase().replace(/[\s\r\n]+/g, '')[idx];
                                return (
                                  <span
                                    key={idx}
                                    className={`w-7 h-8 flex items-center justify-center rounded text-xs font-bold ${
                                      isMatch ? 'bg-slate-900 text-teal-400 border border-slate-800' : 'bg-rose-950 text-rose-300 border border-rose-600'
                                    }`}
                                  >
                                    {char}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Link Indicators */}
                          <div className="flex items-center gap-4">
                            <span className="w-20 shrink-0"></span>
                            <div className="flex gap-1.5">
                              {compSeqA.toUpperCase().replace(/[\s\r\n]+/g, '').split('').map((_, idx) => {
                                const isMatch = compSeqA.toUpperCase().replace(/[\s\r\n]+/g, '')[idx] === compSeqB.toUpperCase().replace(/[\s\r\n]+/g, '')[idx];
                                return (
                                  <span
                                    key={idx}
                                    className={`w-7 text-center text-xs font-bold ${
                                      isMatch ? 'text-teal-500' : 'text-rose-500'
                                    }`}
                                  >
                                    {isMatch ? '•' : 'x'}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sample B */}
                          <div className="flex items-center gap-4">
                            <span className="w-20 text-[10px] text-slate-400 font-bold uppercase shrink-0">Sample B:</span>
                            <div className="flex gap-1.5">
                              {compSeqB.toUpperCase().replace(/[\s\r\n]+/g, '').split('').map((char, idx) => {
                                const isMatch = compSeqA.toUpperCase().replace(/[\s\r\n]+/g, '')[idx] === compSeqB.toUpperCase().replace(/[\s\r\n]+/g, '')[idx];
                                return (
                                  <span
                                    key={idx}
                                    className={`w-7 h-8 flex items-center justify-center rounded text-xs font-bold ${
                                      isMatch ? 'bg-slate-900 text-teal-400 border border-slate-800' : 'bg-rose-950 text-rose-300 border border-rose-600 font-extrabold scale-105'
                                    }`}
                                  >
                                    {char}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ledger of point errors */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">Mismatch Ledger:</span>
                        {compResult.differences.length > 0 ? (
                          <div className="border border-slate-250 rounded-xl overflow-hidden shadow-3xs">
                            <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500">
                                <tr>
                                  <th className="p-3">Sequence Position</th>
                                  <th className="p-3">Sample A</th>
                                  <th className="p-3">Sample B</th>
                                  <th className="p-3">Structural Classification</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {compResult.differences.map(diff => (
                                  <tr key={diff.pos} className="hover:bg-slate-50/50">
                                    <td className="p-3 font-mono font-bold text-teal-700">Position {diff.pos}</td>
                                    <td className="p-3 font-mono text-slate-600">{diff.from}</td>
                                    <td className="p-3 font-mono text-rose-600">{diff.to}</td>
                                    <td className="p-3 text-slate-400 italic">Point Base Substitution (Mismatched Pair)</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-bold">
                            Homologous genomic architecture. 0 mutation points detected.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 italic text-xs">No metrics calculated.</div>
                  )}

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setCompStep(3)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Analysis
                    </button>

                    <button
                      onClick={() => setCompStep(5)}
                      disabled={!compResult}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Compile Conclusion Report
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: CONCLUSION & RESULT REPORT CARD */}
              {compStep === 5 && compResult && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="comp-step-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 5: Verified Project Conclusion</h3>
                      <p className="text-xs text-slate-500">Official verified molecular diagnostic report generated from laboratory runs.</p>
                    </div>
                  </div>

                  {/* PRESTIGE PRINTABLE REPORT CARD */}
                  <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-5 shadow-inner" id="printable-report-card-1">
                    {/* Report Header decoration */}
                    <div className="flex justify-between items-center border-b border-slate-250 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-teal-700 font-extrabold block">BIOBRIDGE LABS CORE FACILITY</span>
                        <h4 className="text-sm font-extrabold text-slate-800">GENOMIC ALIGNMENT SUMMARY REPORT</h4>
                      </div>
                      <span className="text-[9px] bg-slate-200 border border-slate-300 text-slate-600 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        LOG-ID: {Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">EXPERIMENT MODULE</span>
                          <span className="font-bold text-slate-800">DNA Sequence Comparison</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">EXPERIMENT OBJECTIVE</span>
                          <span className="text-slate-600 leading-tight block">Quantify structural similarity and pinpoint nucleotide divergences between candidate template strands.</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">DATASETS ANALYZED</span>
                          <span className="font-mono text-slate-600 block leading-tight">
                            Sample A: {compSeqA.toUpperCase().replace(/[\s\r\n]+/g, '').substring(0, 20)}... ({compResult.length} bp)<br />
                            Sample B: {compSeqB.toUpperCase().replace(/[\s\r\n]+/g, '').substring(0, 20)}... ({compResult.length} bp)
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">PRIMARY RESULTS RECORD</span>
                          <span className="text-slate-800 block">
                            <strong className="text-teal-700 font-bold">{compResult.similarity}% Base Homology</strong> • {compResult.matchingCount} matches • {compResult.mismatchCount} point alterations.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Scientific Conclusion statement - EXACT MATCH REQUEST */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">RESEARCHER CONCLUSION NOTE</span>
                      <blockquote className="text-xs font-bold text-teal-800 italic border-l-2 border-teal-500 pl-3.5 leading-relaxed">
                        "The sequences show small genetic differences that may represent variation."
                      </blockquote>
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono pt-2">
                      <span>VERIFIED: SYSTEM AUTO-VALIDATION</span>
                      <span>DATE: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* SAVE REPORT TO RESEARCH JOURNEY */}
                  <div className="p-5 bg-teal-50/55 border border-teal-150 rounded-2xl space-y-4 shadow-3xs" id="comp-save-journey-card">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
                      <h4 className="text-xs font-bold text-teal-950 uppercase tracking-wide">Save to Research Journey</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Log this completed experiment to your scientific profile. This records your bioinformatics research findings, updates your skill progress, and unlocks milestones.
                    </p>
                    <button
                      onClick={() => {
                        const report: SavedReport = {
                          id: `REP-COMP-${Date.now()}`,
                          experimentName: "DNA Sequence Comparison",
                          timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                          researchQuestion: "How similar are two DNA sequences?",
                          method: "Complementary point-by-point molecular sequence alignment algorithm.",
                          observation: `${compResult.mismatchCount} nucleotide base difference(s) found out of ${compResult.length} bp.`,
                          conclusion: "The aligned sequences show localized genetic differences that represent point mutations.",
                          resultSummary: `${compResult.similarity}% sequence similarity (${compResult.matchingCount} matches, ${compResult.mismatchCount} mismatches).`
                        };
                        handleSaveSimulationReport('comparison', report);
                      }}
                      disabled={reportSaved['comparison']}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-3xs flex items-center justify-center gap-1.5 cursor-pointer ${
                        reportSaved['comparison']
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-not-allowed'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                      id="btn-save-comp-report"
                    >
                      {reportSaved['comparison'] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Experiment Report Saved to Journey!
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          Verify & Save to Research Journey
                        </>
                      )}
                    </button>
                  </div>

                  {/* Print feedback alerts */}
                  {printSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-fade-in">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Diagnostic report downloaded as clinical PDF. (Simulated)
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
                    <button
                      onClick={triggerPrintSim}
                      className="px-4 py-2.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-3xs transition-all w-full sm:w-auto"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Laboratory Report
                    </button>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setCompStep(1);
                          setCompResult(null);
                        }}
                        className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer w-full sm:w-auto"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
                        Restart Run
                      </button>

                      <button
                        onClick={() => {
                          setActiveProjectId(null);
                          setCompStep(1);
                          setCompResult(null);
                        }}
                        className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-3xs w-full sm:w-auto"
                      >
                        Complete & Return to Hub
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ==================================================================
              SIMULATION 2 ACTIVE: MUTATION EXPLORER
              ================================================================== */}
          {activeProjectId === 'mutation' && (
            <div className="space-y-6" id="sim-mutation">
              
              {/* Stepper Header */}
              <div className="grid grid-cols-5 gap-2 text-center" id="mut-stepper-5">
                {[
                  { num: 1, label: "1. Research Question" },
                  { num: 2, label: "2. Biological Data" },
                  { num: 3, label: "3. Analysis" },
                  { num: 4, label: "4. Observation" },
                  { num: 5, label: "5. Conclusion" }
                ].map(s => (
                  <button
                    key={s.num}
                    onClick={() => {
                      if (s.num <= mutStep || (mutResult && s.num <= 5)) {
                        setMutStep(s.num as 1 | 2 | 3 | 4 | 5);
                      }
                    }}
                    className={`py-2 px-1 rounded-lg border text-[10px] md:text-xs font-bold transition-all ${
                      mutStep === s.num
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : (mutResult || s.num < mutStep)
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                        : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed select-none'
                    }`}
                    id={`mut-step-tab-${s.num}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* STEP 1: RESEARCH QUESTION */}
              {mutStep === 1 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="mut-step-1">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <HelpCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 1: Mutation Dynamics Question</h3>
                      <p className="text-xs text-slate-500">Formulate hypotheses surrounding molecular changes.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">Hypothesis Framework</span>
                      <p className="text-sm font-bold text-slate-800 leading-snug">
                        "What happens when DNA undergoes replication errors or chemical damage? How do single codon mutations shift downstream translation?"
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        Mutations can occur naturally as replication errors or due to UV radiation. Alterations are grouped into substitutions (replacing bases), insertions (adding bases), or deletions (removing bases), shifting ribosome frames downstream.
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-50/40 border border-emerald-250 rounded-xl space-y-2 text-xs">
                      <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Student Investigator Mission Goals:
                      </h4>
                      <ul className="text-slate-600 space-y-2 pl-4 list-disc font-medium">
                        <li>Load and examine real physiological sickle-cell or cystic fibrosis analogues.</li>
                        <li>Learn to identify frame shifts vs silent mutations.</li>
                        <li>Observe nucleotide gaps and compile a clinical mutation report.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setMutStep(2)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Proceed to Biological Data
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: BIOLOGICAL DATA */}
              {mutStep === 2 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="mut-step-2">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Clipboard className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 2: Biological Data Assembly</h3>
                      <p className="text-xs text-slate-500">Select mutation models or input custom templates.</p>
                    </div>
                  </div>

                  {/* Preset Cases */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                      Load Genetic Mutation Case Studies:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {MUTATION_SAMPLES.map(sample => (
                        <button
                          key={sample.name}
                          onClick={() => handleLoadMutSample(sample)}
                          className="p-3 border rounded-xl bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-left space-y-1.5 transition-all cursor-pointer shadow-3xs text-xs"
                        >
                          <span className="text-[10px] bg-emerald-50 border border-emerald-250 text-emerald-800 px-2 py-0.5 rounded-full font-bold font-mono">
                            {sample.mutationType}
                          </span>
                          <p className="text-[11px] text-slate-700 font-bold leading-tight">{sample.label}</p>
                          <p className="text-[10px] text-slate-400 font-medium leading-normal">{sample.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Forms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="mut-in-orig" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                        <span>Original DNA Sequence:</span>
                        <span className="font-mono text-slate-400">{mutOriginal.replace(/[\s\r\n]+/g, '').length} bp</span>
                      </label>
                      <textarea
                        id="mut-in-orig"
                        value={mutOriginal}
                        onChange={(e) => {
                          setMutOriginal(e.target.value);
                          setMutError('');
                        }}
                        placeholder="ATGGTGCACCTGACTCCTGAGGAGAAG"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 h-28 leading-relaxed shadow-3xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mut-in-mut" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                        <span>Mutated DNA Sequence:</span>
                        <span className="font-mono text-slate-400">{mutMutated.replace(/[\s\r\n]+/g, '').length} bp</span>
                      </label>
                      <textarea
                        id="mut-in-mut"
                        value={mutMutated}
                        onChange={(e) => {
                          setMutMutated(e.target.value);
                          setMutError('');
                        }}
                        placeholder="ATGGTGCACCTGACTCCTGTGGAGAAG"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 h-28 leading-relaxed shadow-3xs"
                      />
                    </div>
                  </div>

                  {mutError && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2" id="mut-error-p2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{mutError}</div>
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setMutStep(1)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Hypothesis
                    </button>

                    <button
                      onClick={executeMutationAnalysis}
                      disabled={isMutAnalyzing}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      {isMutAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Mapping Mutation Coordinates...
                        </>
                      ) : (
                        <>
                          <Activity className="w-4 h-4" />
                          Analyze Mutation
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ANALYSIS */}
              {mutStep === 3 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="mut-step-3">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 3: Mutation Metrics Analysis</h3>
                      <p className="text-xs text-slate-500">Structural metrics computed on the mutation coordinates.</p>
                    </div>
                  </div>

                  {mutResult ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="mut-metrics-summary">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Sequence Length Shift</span>
                          <div className="flex gap-4 items-baseline mt-1">
                            <span className="text-xl font-bold text-slate-700">{mutResult.origLen} bp</span>
                            <span className="text-xs text-slate-400">vs</span>
                            <span className="text-xl font-bold text-emerald-700">{mutResult.mutLen} bp</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block leading-tight">
                            {mutResult.isSameLength ? "Length is stable (Point Substitution)" : "Frameshift Mutation (Indel / Deletion)"}
                          </span>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Mutated Base Alterations</span>
                          <span className="text-xl font-black text-amber-600 block mt-1">
                            {mutResult.differences.length > 0 ? `${mutResult.differences.length} nucleobase(s) modified` : "0 alterations detected"}
                          </span>
                          <span className="text-[10px] text-slate-500 block leading-tight">
                            {mutResult.mutationType}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl flex gap-3 text-amber-900 text-xs">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-bold text-amber-950">Bioinformatics Mutational Note:</span>
                          <p className="text-amber-900 leading-relaxed font-medium">{mutResult.mutationDesc}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 italic text-xs">No analysis computed.</div>
                  )}

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setMutStep(2)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Biological Data
                    </button>

                    <button
                      onClick={() => setMutStep(4)}
                      disabled={!mutResult}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Proceed to Observation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: OBSERVATION */}
              {mutStep === 4 && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="mut-step-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Microscope className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 4: Mutational Matrix Visualizer</h3>
                      <p className="text-xs text-slate-500">Visualizing structural nucleobase deletions, insertions, or mutations.</p>
                    </div>
                  </div>

                  {mutResult ? (
                    <div className="space-y-6">
                      {/* Grid connect */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Mutation Alignment Map</span>
                        
                        <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl border border-slate-900 font-mono overflow-x-auto shadow-inner space-y-4">
                          {/* Original row */}
                          <div className="flex items-center gap-4">
                            <span className="w-20 text-[10px] text-slate-400 font-bold uppercase shrink-0">Original:</span>
                            <div className="flex gap-1.5">
                              {mutOriginal.toUpperCase().replace(/[\s\r\n]+/g, '').split('').map((char, idx) => {
                                const isMutated = mutOriginal.toUpperCase().replace(/[\s\r\n]+/g, '')[idx] !== mutMutated.toUpperCase().replace(/[\s\r\n]+/g, '')[idx];
                                return (
                                  <span
                                    key={idx}
                                    className={`w-7 h-8 flex items-center justify-center rounded text-xs font-bold ${
                                      isMutated ? 'bg-amber-950 text-amber-300 border border-amber-600' : 'bg-slate-900 text-slate-400'
                                    }`}
                                  >
                                    {char}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Mutated Row */}
                          <div className="flex items-center gap-4">
                            <span className="w-20 text-[10px] text-slate-400 font-bold uppercase shrink-0">Mutated:</span>
                            <div className="flex gap-1.5">
                              {mutMutated.toUpperCase().replace(/[\s\r\n]+/g, '').split('').map((char, idx) => {
                                const isMutated = mutOriginal.toUpperCase().replace(/[\s\r\n]+/g, '')[idx] !== mutMutated.toUpperCase().replace(/[\s\r\n]+/g, '')[idx];
                                return (
                                  <span
                                    key={idx}
                                    className={`w-7 h-8 flex items-center justify-center rounded text-xs font-bold ${
                                      isMutated ? 'bg-amber-500 text-slate-950 border border-amber-400 scale-105 font-black' : 'bg-slate-900 text-slate-400'
                                    }`}
                                  >
                                    {char}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detail list */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Altered Position Ledger</span>
                        {mutResult.differences.length > 0 ? (
                          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-3xs">
                            <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
                              <thead className="bg-slate-50 font-bold text-slate-500">
                                <tr>
                                  <th className="p-3">Nucleotide Coordinate</th>
                                  <th className="p-3">Reference (Original)</th>
                                  <th className="p-3">Daughter (Mutated)</th>
                                  <th className="p-3">Molecular Verdict</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {mutResult.differences.map(diff => (
                                  <tr key={diff.pos} className="hover:bg-slate-50/50">
                                    <td className="p-3 font-mono font-bold text-emerald-700">Position {diff.pos}</td>
                                    <td className="p-3 font-mono text-slate-500">{diff.from}</td>
                                    <td className="p-3 font-mono text-amber-600 font-bold">{diff.to}</td>
                                    <td className="p-3 text-slate-400 italic">
                                      {diff.from === '-' ? 'Insertion Mutation' : diff.to === '-' ? 'Deletion Mutation' : 'Substitution Mutation'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-bold">
                            No base changes recorded.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 italic text-xs">No metrics calculated.</div>
                  )}

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setMutStep(3)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Analysis
                    </button>

                    <button
                      onClick={() => setMutStep(5)}
                      disabled={!mutResult}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Compile Mutation Report
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: CONCLUSION & RESULT REPORT CARD */}
              {mutStep === 5 && mutResult && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="mut-step-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 5: Verified Mutation Conclusion</h3>
                      <p className="text-xs text-slate-500">Official verified molecular diagnostic report generated from mutational runs.</p>
                    </div>
                  </div>

                  {/* PRESTIGE PRINTABLE REPORT CARD */}
                  <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-5 shadow-inner" id="printable-report-card-2">
                    <div className="flex justify-between items-center border-b border-slate-250 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-700 font-extrabold block">BIOBRIDGE LABS CORE FACILITY</span>
                        <h4 className="text-sm font-extrabold text-slate-800">MOLECULAR MUTATION EXON REPORT</h4>
                      </div>
                      <span className="text-[9px] bg-slate-200 border border-slate-300 text-slate-600 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        LOG-ID: {Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">EXPERIMENT MODULE</span>
                          <span className="font-bold text-slate-800">Mutation Explorer</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">EXPERIMENT OBJECTIVE</span>
                          <span className="text-slate-600 leading-tight block">Isolate genetic mismatches and classify single point substitutions, insertions, or deletions.</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">DATASETS ANALYZED</span>
                          <span className="font-mono text-slate-600 block leading-tight">
                            Original Strand: {mutOriginal.toUpperCase().substring(0, 20)}... ({mutResult.origLen} bp)<br />
                            Mutated Strand: {mutMutated.toUpperCase().substring(0, 20)}... ({mutResult.mutLen} bp)
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">PRIMARY RESULTS RECORD</span>
                          <span className="text-slate-800 block">
                            <strong className="text-emerald-700 font-bold">{mutResult.mutationType}</strong> • {mutResult.differences.length} base alteration(s) identified.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Scientific Conclusion statement - EXACT MATCH REQUEST */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">RESEARCHER CONCLUSION NOTE</span>
                      <blockquote className="text-xs font-bold text-emerald-800 italic border-l-2 border-emerald-500 pl-3.5 leading-relaxed">
                        "A mutation is a change in the DNA sequence. Researchers study these changes to understand biological variation."
                      </blockquote>
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono pt-2">
                      <span>VERIFIED: SYSTEM AUTO-VALIDATION</span>
                      <span>DATE: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* SAVE REPORT TO RESEARCH JOURNEY */}
                  <div className="p-5 bg-emerald-50/50 border border-emerald-150 rounded-2xl space-y-4 shadow-3xs" id="mut-save-journey-card">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                      <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">Save to Research Journey</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Log this completed experiment to your scientific profile. This records your bioinformatics research findings, updates your skill progress, and unlocks milestones.
                    </p>
                    <button
                      onClick={() => {
                        const report: SavedReport = {
                          id: `REP-MUT-${Date.now()}`,
                          experimentName: "Mutation Explorer",
                          timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                          researchQuestion: "How do mutations alter DNA sequences and translate proteins?",
                          method: "Triplet reading frame analysis under point substitution, insertion, and deletion models.",
                          observation: `Identified mutation type: "${mutResult.mutationType}" with ${mutResult.differences.length} base alteration(s).`,
                          conclusion: "A mutation is a change in the DNA sequence. Researchers study these changes to understand biological variation.",
                          resultSummary: `Classified as ${mutResult.mutationType} with ${mutResult.differences.length} mismatches.`
                        };
                        handleSaveSimulationReport('mutation', report);
                      }}
                      disabled={reportSaved['mutation']}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-3xs flex items-center justify-center gap-1.5 cursor-pointer ${
                        reportSaved['mutation']
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-not-allowed'
                          : 'bg-emerald-605 hover:bg-emerald-700 bg-emerald-600 text-white'
                      }`}
                      id="btn-save-mut-report"
                    >
                      {reportSaved['mutation'] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Experiment Report Saved to Journey!
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          Verify & Save to Research Journey
                        </>
                      )}
                    </button>
                  </div>

                  {/* Print feedback alerts */}
                  {printSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-fade-in">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Mutation analysis report downloaded successfully. (Simulated)
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
                    <button
                      onClick={triggerPrintSim}
                      className="px-4 py-2.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-3xs transition-all w-full sm:w-auto"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Mutation Report
                    </button>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setMutStep(1);
                          setMutResult(null);
                        }}
                        className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer w-full sm:w-auto"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                        Restart Run
                      </button>

                      <button
                        onClick={() => {
                          setActiveProjectId(null);
                          setMutStep(1);
                          setMutResult(null);
                        }}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-3xs w-full sm:w-auto"
                      >
                        Complete & Return to Hub
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ==================================================================
              SIMULATION 3 ACTIVE: CLINICAL DIAGNOSTICS FOR HUNTINGTON'S
              ================================================================== */}
          {activeProjectId === 'huntington' && (
            <div className="space-y-6" id="sim-huntington">
              
              {/* Stepper Header */}
              <div className="grid grid-cols-5 gap-2 text-center" id="hunt-stepper-5">
                {[
                  { num: 1, label: "1. Research Question" },
                  { num: 2, label: "2. Biological Data" },
                  { num: 3, label: "3. Analysis" },
                  { num: 4, label: "4. Observation" },
                  { num: 5, label: "5. Conclusion" }
                ].map(s => (
                  <button
                    key={s.num}
                    onClick={() => {
                      if (activePatient && s.num <= huntStep) {
                        setHuntStep(s.num as 1 | 2 | 3 | 4 | 5);
                      }
                    }}
                    className={`py-2 px-1 rounded-lg border text-[10px] md:text-xs font-bold transition-all ${
                      huntStep === s.num
                        ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                        : (activePatient && s.num < huntStep)
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                        : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed select-none'
                    }`}
                    id={`hunt-step-tab-${s.num}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* STEP 1: RESEARCH QUESTION & PATIENT ROSTER */}
              {huntStep === 1 && (
                <div className="space-y-6" id="hunt-step-1">
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-3xs">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                        <HelpCircle className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Step 1: Clinical Triplet Expansion Hypothesis</h3>
                        <p className="text-xs text-slate-500">Formulating the diagnostic model of trinucleotide disease screening.</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      The HTT gene codes for the huntingtin protein. Pathological replication drives unstable expansions of consecutive <strong>CAG</strong> triplet codons (encoding Glutamine). Expanded huntingtin folds abnormally, destroying neural networks.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl font-mono text-[11px] shadow-3xs">
                      <div>
                        <span className="text-emerald-700 font-bold">10 - 35 CAG Repeats</span>
                        <span className="block text-slate-400 text-[10px]">Normal range. No pathological disease risk.</span>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-amber-700 font-bold">36 - 39 CAG Repeats</span>
                        <span className="block text-slate-400 text-[10px]">Reduced penetrance. Unstable borderline risk.</span>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-rose-700 font-bold">40+ CAG Repeats</span>
                        <span className="block text-slate-400 text-[10px]">Full penetrance. High disease risk (Autosomal Dominant).</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Awaiting Patient Referrals</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="hunt-patients-list">
                      {PATIENTS.map(p => (
                        <div
                          key={p.id}
                          className="p-5 bg-white border border-slate-200 hover:border-sky-500 rounded-xl transition-all flex flex-col justify-between space-y-4 shadow-3xs"
                        >
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between font-mono text-[10px] text-slate-400">
                              <span className="font-bold text-slate-500">{p.id}</span>
                              <span>{p.gender}, {p.age}y</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                            <p className="text-slate-500 italic leading-relaxed">"{p.symptoms}"</p>
                          </div>

                          <button
                            onClick={() => selectPatient(p)}
                            className="w-full py-2 bg-slate-50 hover:bg-sky-600 hover:text-white border border-slate-200 hover:border-sky-600 font-bold text-slate-700 text-xs rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-3xs"
                          >
                            Acquire Genomic File
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: BIOLOGICAL DATA */}
              {huntStep === 2 && activePatient && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="hunt-step-2">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                      <Clipboard className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 2: Subject DNA Retrieval</h3>
                      <p className="text-xs text-slate-500">Examine patient FASTA data acquired from clinical registry.</p>
                    </div>
                  </div>

                  {/* Patient mini file card */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Patient Name</span>
                      <strong className="text-slate-800 font-bold text-sm">{activePatient.name}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Subject Registry Key</span>
                      <span className="font-mono text-slate-600 font-bold block">{activePatient.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Referral Description</span>
                      <span className="text-slate-500 italic block">"{activePatient.symptoms}"</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Raw Exon-1 Genomic FASTA Fragment</span>
                    <div className="bg-slate-950 text-slate-300 p-4 rounded-xl border border-slate-900 font-mono text-[10px] break-all leading-relaxed shadow-inner max-h-32 overflow-y-auto">
                      &gt;{activePatient.id}_HTT_exon1_partial_seq<br />
                      {activePatient.rawSequence}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                    <button
                      onClick={() => setHuntStep(1)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Change Referral
                    </button>

                    <button
                      onClick={runCagScan}
                      disabled={isScanning}
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Amplifying PCR Capillaries...
                        </>
                      ) : (
                        <>
                          <Activity className="w-4 h-4" />
                          Execute CAG Triplet Scan
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ANALYSIS */}
              {huntStep === 3 && activePatient && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="hunt-step-3">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                      <Activity className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 3: Clinical Diagnostic Scan Findings</h3>
                      <p className="text-xs text-slate-500">Quantitative assessment of triplet expansions in patient HTT.</p>
                    </div>
                  </div>

                  {scanResult ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="hunt-metrics-summary">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase">MAXIMUM CAG REPEATS IDENTIFIED</span>
                          <span className={`text-3xl font-black ${
                            scanResult.clinicalStatus === 'Affected' ? 'text-rose-600' :
                            scanResult.clinicalStatus === 'Premutation' ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {scanResult.cagCount} CAG Triplets
                          </span>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase">DIAGNOSTIC STATUS CATEGORY</span>
                          <span className={`text-xl font-black uppercase block mt-1 ${
                            scanResult.clinicalStatus === 'Affected' ? 'text-rose-600' :
                            scanResult.clinicalStatus === 'Premutation' ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {scanResult.clinicalStatus}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 text-slate-600 shadow-3xs text-xs">
                        <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          scanResult.clinicalStatus === 'Affected' ? 'text-rose-500' :
                          scanResult.clinicalStatus === 'Premutation' ? 'text-amber-500' : 'text-emerald-500'
                        }`} />
                        <div className="space-y-1 text-xs">
                          <span className="font-bold text-slate-850">Clinical Molecular Note:</span>
                          <p className="text-slate-600 leading-relaxed font-medium">{scanResult.riskDescription}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 italic text-xs">No diagnostic scan executed.</div>
                  )}

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setHuntStep(2)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Bio-Data
                    </button>

                    <button
                      onClick={() => setHuntStep(4)}
                      disabled={!scanResult}
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Proceed to Clinical Observation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: OBSERVATION & REVIEWS */}
              {huntStep === 4 && activePatient && scanResult && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="hunt-step-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                      <Microscope className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 4: Clinical Codon Observation</h3>
                      <p className="text-xs text-slate-500">Inspect the nucleotide expansion maps and record counseling recommendations.</p>
                    </div>
                  </div>

                  {/* Threshold meter visualization */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">HTT Allele Codon Spectrum</span>
                    <div className="h-6 bg-slate-100 rounded-full border border-slate-200 overflow-hidden relative flex shadow-inner">
                      <div className="h-full bg-emerald-500 w-[50%] flex items-center justify-center text-[10px] text-white font-bold">Normal (10-35)</div>
                      <div className="h-full bg-amber-500 w-[20%] border-l border-white flex items-center justify-center text-[10px] text-white font-bold">Border (36-39)</div>
                      <div className="h-full bg-rose-500 w-[30%] border-l border-white flex items-center justify-center text-[10px] text-white font-bold">Affected (40+)</div>

                      {/* Current Patient marker */}
                      <div 
                        className="absolute h-8 w-1.5 bg-slate-950 border border-white -top-1"
                        style={{
                          left: `${Math.min(96, Math.max(10, (scanResult.cagCount / 60) * 100))}%`
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-950 text-white font-mono text-[9px] px-1 rounded whitespace-nowrap font-bold">
                          {activePatient.name} ({scanResult.cagCount} CAG)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Counselor recommendations */}
                  <div className="space-y-3 pt-2">
                    <label htmlFor="clinical-textbox" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-sky-600" />
                      Clinical Diagnosis & Genetic Counseling Notes:
                    </label>
                    <textarea
                      id="clinical-textbox"
                      value={clinicalConclusion}
                      onChange={(e) => setClinicalConclusion(e.target.value)}
                      placeholder="Input clinical observation notes here (e.g. Eleanor has reduced penetrance allele with border instabilty; recommending proactive psychiatric followups)..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 h-28 shadow-3xs"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex justify-between">
                    <button
                      onClick={() => setHuntStep(3)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ← Back to Analysis Findings
                    </button>

                    <button
                      onClick={submitPathologyReport}
                      disabled={!clinicalConclusion.trim()}
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-45 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      Submit Diagnostic Report
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: CONCLUSION & CLINICAL RESULT REPORT CARD */}
              {huntStep === 5 && activePatient && scanResult && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-3xs" id="hunt-step-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Step 5: Verified Clinical Report Submission</h3>
                      <p className="text-xs text-slate-500">Official verified molecular diagnostic report generated from laboratory runs.</p>
                    </div>
                  </div>

                  {/* PRESTIGE CLINICAL REPORT CARD */}
                  <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-5 shadow-inner" id="printable-report-card-3">
                    <div className="flex justify-between items-center border-b border-slate-250 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-sky-700 font-extrabold block">BIOBRIDGE MOLECULAR CLINICS INC</span>
                        <h4 className="text-sm font-extrabold text-slate-800">TRINUCLEOTIDE REPEAT SCAN VERIFICATION FILE</h4>
                      </div>
                      <span className="text-[9px] bg-slate-200 border border-slate-300 text-slate-600 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        LOG-ID: {Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">EXPERIMENT MODULE</span>
                          <span className="font-bold text-slate-800">Huntington's Triplet Diagnostics</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">EXPERIMENT OBJECTIVE</span>
                          <span className="text-slate-600 leading-tight block">Screen and quantify CAG triplet repeats in HTT gene locus to assess autosomal dominant Huntington's risk.</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">DATASETS ANALYZED</span>
                          <span className="font-mono text-slate-600 block leading-tight">
                            Patient Key: {activePatient.id} ({activePatient.gender}, {activePatient.age}y)<br />
                            Genomic Sequence: HTT Gene Segment ({activePatient.rawSequence.length} bp)
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">PRIMARY RESULTS RECORD</span>
                          <span className="text-slate-800 block">
                            <strong className="text-sky-700 font-bold">{scanResult.cagCount} CAG repeats detected</strong> • Diagnostic evaluation: {scanResult.clinicalStatus}.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Scientific Conclusion statement */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">COUNSELOR CLINICAL NOTE</span>
                      <blockquote className="text-xs font-bold text-slate-800 italic border-l-2 border-sky-500 pl-3.5 leading-relaxed">
                        "{clinicalConclusion}"
                      </blockquote>
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono pt-2">
                      <span>VERIFIED: SYSTEM AUTO-VALIDATION</span>
                      <span>DATE: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* SAVE REPORT TO RESEARCH JOURNEY */}
                  <div className="p-5 bg-sky-50/50 border border-sky-150 rounded-2xl space-y-4 shadow-3xs" id="hunt-save-journey-card">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
                      <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wide">Save to Research Journey</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Log this completed clinical PCR scan and counselor notes to your scientific profile. This updates your genomics and research skill metrics.
                    </p>
                    <button
                      onClick={() => {
                        const report: SavedReport = {
                          id: `REP-HUNT-${Date.now()}`,
                          experimentName: "Huntington's Triplet Diagnostics",
                          timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                          researchQuestion: "Do pathological trinucleotide (CAG) repeat expansions exist in the patient HTT gene locus?",
                          method: "PCR capillary electrophoresis scanning to measure CAG repeats.",
                          observation: `Isolated ${scanResult.cagCount} CAG repeats in the HTT segment of patient ${activePatient.name}. Diagnostic classification is "${scanResult.clinicalStatus}".`,
                          conclusion: `Autosomal dominant genetic assessment completed. Counselor note: "${clinicalConclusion}"`,
                          resultSummary: `${scanResult.cagCount} CAG repeats found (${scanResult.clinicalStatus}) for patient ${activePatient.name}.`
                        };
                        handleSaveSimulationReport('huntington', report);
                      }}
                      disabled={reportSaved['huntington']}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-3xs flex items-center justify-center gap-1.5 cursor-pointer ${
                        reportSaved['huntington']
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-not-allowed'
                          : 'bg-sky-600 hover:bg-sky-700 text-white'
                      }`}
                      id="btn-save-hunt-report"
                    >
                      {reportSaved['huntington'] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Experiment Report Saved to Journey!
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          Verify & Save to Research Journey
                        </>
                      )}
                    </button>
                  </div>

                  {/* Print feedback alert */}
                  {printSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-fade-in">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Clinical diagnostics file downloaded successfully. (Simulated)
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
                    <button
                      onClick={triggerPrintSim}
                      className="px-4 py-2.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-3xs transition-all w-full sm:w-auto"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Diagnostics File
                    </button>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={resetHuntSimulation}
                        className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer w-full sm:w-auto"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                        Next Referral Case
                      </button>

                      <button
                        onClick={() => {
                          setActiveProjectId(null);
                          resetHuntSimulation();
                        }}
                        className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-3xs w-full sm:w-auto"
                      >
                        Complete & Return to Hub
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
