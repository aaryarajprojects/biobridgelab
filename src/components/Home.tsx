import React from 'react';
import { 
  ArrowRight, Dna, FlaskConical, Award, BookOpen, Database, Globe, 
  Info, ShieldAlert, Milestone, Beaker
} from 'lucide-react';

// Impact Dashboard Stats - editable from one place
const IMPACT_METRICS = {
  lessonsCount: "20+ Interactive Modules",
  simulationsCount: "10+ Research-Style Simulations",
  challengesCount: "50+ Practical Challenges",
  skillsCount: "15+ Bioinformatics Skills"
};

interface HomeProps {
  setView: (view: string) => void;
}

export default function Home({ setView }: HomeProps) {
  return (
    <div className="space-y-16 py-4 animate-fade-in" id="home-page-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 md:p-14 text-center space-y-6 shadow-sm" id="hero-section">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs md:text-sm font-semibold tracking-wide relative z-10">
          <Dna className="w-4 h-4 text-teal-600" id="hero-dna-badge-icon" />
          <span>Student-Led Biotech Education Initiative & Sandbox</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight relative z-10" id="hero-main-title">
          Open-Access Gateway to <span className="text-teal-700 font-black">Genomics Education</span> & Bio-Lab Pipelines
        </h1>
        
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed relative z-10" id="hero-description">
          A rigorous, student-led biotechnology simulation environment. Translate nucleotide sequences, evaluate GC ratios, trace point mutations, and master core bioinformatics algorithms completely free.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 relative z-10" id="hero-cta-group">
          <button
            onClick={() => setView('learning')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-xs group cursor-pointer text-xs"
            id="cta-start-learning"
          >
            Start Learning Path
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => setView('lab')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer text-xs"
            id="cta-enter-lab"
          >
            <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
            Enter Virtual Bio Lab
          </button>
        </div>
      </section>

      {/* 1. Why BioBridge Lab Section */}
      <section className="border-t border-slate-200 pt-16 space-y-8" id="why-biobridge-section">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Our Mission & Identity</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why BioBridge Lab?
          </h2>
          <p className="text-sm text-slate-500 leading-normal font-medium">
            Understanding the gap in modern science training and our student-built approach to democratizing biotechnology education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="why-cards-grid">
          {/* Problem */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 space-y-4 shadow-3xs flex flex-col justify-between transition-all" id="why-problem-card">
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 text-rose-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">The Problem</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Many aspiring students interested in molecular biology and computational biology face steep barriers. Wet-lab setups require extremely expensive machinery, hazardous waste permissions, and physical reagents that schools often cannot afford, resulting in:
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pl-4 list-disc font-medium">
                <li>Zero practical exposure to sequence processing</li>
                <li>Lack of realistic, research-style learning</li>
                <li>Strict gatekeeping of high-tier biotech tools</li>
              </ul>
            </div>
            <div className="pt-2 text-[10px] font-mono text-rose-600 font-bold uppercase tracking-wider">
              Resource Gatekeeping
            </div>
          </div>

          {/* Solution */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 space-y-4 shadow-3xs flex flex-col justify-between transition-all" id="why-solution-card">
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 text-teal-600">
                <Beaker className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">The Solution</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                BioBridge Lab addresses this critical gap by delivering an interactive, 100% free virtual sandbox. Our student-built system simulates genomic analysis environments entirely in the browser, allowing anyone to practice:
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pl-4 list-disc font-medium">
                <li>Essential molecular biology concepts</li>
                <li>Professional bioinformatics workflows</li>
                <li>Practical gene sequence analysis skills</li>
              </ul>
            </div>
            <div className="pt-2 text-[10px] font-mono text-teal-600 font-bold uppercase tracking-wider">
              Accessible Sandbox
            </div>
          </div>

          {/* Impact */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 space-y-4 shadow-3xs flex flex-col justify-between transition-all" id="why-impact-card">
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">The Impact</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                By bypassing physical cost constraints, we empower students to build foundational computational biology skills early on. This prepares the next generation of researchers for physical wet-labs or academic research roles by ensuring:
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pl-4 list-disc font-medium">
                <li>Immediate, practical algorithmic literacy</li>
                <li>A complete, shareable academic transcript</li>
                <li>Equal access to scientific education pathways</li>
              </ul>
            </div>
            <div className="pt-2 text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-wider">
              Democratizing Literacy
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Dashboard Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 space-y-8 relative overflow-hidden" id="learning-impact-dashboard">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest font-mono">Real-Time Indicators</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Learning Impact Dashboard
            </h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
              BioBridge Lab translates standard biotechnology educational matrices into quantifiable, high-fidelity browser exercises. Our dashboard metrics demonstrate active educational scope:
            </p>
          </div>

          {/* Core metrics grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full lg:w-auto shrink-0 animate-fade-in" id="impact-metrics-container">
            <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl space-y-1 text-center min-w-[140px] sm:min-w-[180px]">
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block font-mono">Academic Content</span>
              <div className="text-lg sm:text-2xl font-black text-white">{IMPACT_METRICS.lessonsCount}</div>
              <span className="text-[10px] text-slate-400 font-medium block">Lessons & Concepts</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl space-y-1 text-center min-w-[140px] sm:min-w-[180px]">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block font-mono">Lab Experience</span>
              <div className="text-lg sm:text-2xl font-black text-white">{IMPACT_METRICS.simulationsCount}</div>
              <span className="text-[10px] text-slate-400 font-medium block">Interactive Sandboxes</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl space-y-1 text-center min-w-[140px] sm:min-w-[180px]">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block font-mono">Olympiad Puzzles</span>
              <div className="text-lg sm:text-2xl font-black text-white">{IMPACT_METRICS.challengesCount}</div>
              <span className="text-[10px] text-slate-400 font-medium block">Practical Solvers</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl space-y-1 text-center min-w-[140px] sm:min-w-[180px]">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block font-mono">Competencies</span>
              <div className="text-lg sm:text-2xl font-black text-white">{IMPACT_METRICS.skillsCount}</div>
              <span className="text-[10px] text-slate-400 font-medium block">Skills Developed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Project Journey Section */}
      <section className="space-y-10 border-t border-slate-200 pt-16" id="project-journey-section">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">History & Development</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Building BioBridge Lab
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            The narrative of a student-built educational model, tracing our roadmap from identifying initial classroom gaps to deploying full genomic sandboxes.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-0" id="journey-timeline">
          {/* Vertical line helper on desktop */}
          <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2"></div>
          {/* Vertical line helper on mobile */}
          <div className="sm:hidden absolute left-3 top-4 bottom-4 w-0.5 bg-slate-200"></div>

          {/* Timeline Node 1 */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-start pb-10" id="journey-node-1">
            <div className="hidden sm:block text-right pr-6 pt-1">
              <span className="inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                Phase 1: Conceptualization
              </span>
            </div>
            
            {/* Dot indicator */}
            <div className="absolute left-[-15px] sm:left-1/2 top-2 w-7 h-7 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center -translate-x-0 sm:-translate-x-1/2 z-10 shadow-xs">
              <span className="text-teal-600 font-mono text-[10px] font-bold">1</span>
            </div>

            <div className="pl-4 sm:pl-6 space-y-2 text-left">
              <span className="sm:hidden inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase mb-1">
                Phase 1: Conceptualization
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-950">Identifying the Learning Gap</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Our initiative originated within student discussion groups noting the sharp divide in biotechnology access. While computer science programs had open code repositories, biology programs required highly guarded physical tools. We set out to map raw genetic databases into free interactive web modules.
              </p>
            </div>
          </div>

          {/* Timeline Node 2 */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-start pb-10" id="journey-node-2">
            {/* Desktop Left aligned */}
            <div className="sm:order-2 hidden sm:block pl-6 pt-1 text-left">
              <span className="inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                Phase 2: Framework Core
              </span>
            </div>

            {/* Dot indicator */}
            <div className="absolute left-[-15px] sm:left-1/2 top-2 w-7 h-7 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center -translate-x-0 sm:-translate-x-1/2 z-10 shadow-xs">
              <span className="text-teal-600 font-mono text-[10px] font-bold">2</span>
            </div>

            <div className="sm:text-right pr-0 sm:pr-6 pl-4 sm:pl-0 space-y-2 text-left sm:text-right">
              <span className="sm:hidden inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase mb-1">
                Phase 2: Framework Core
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-950">Designing Virtual Learning Tools</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                We engineered the core client-side sequence analysis and translation models. By mapping the full IUPAC single-letter codon tables, we built an instantaneous transcription-translation engine capable of converting any DNA sequence string into its corresponding mRNA transcripts and peptide chains directly in the user's viewport.
              </p>
            </div>
          </div>

          {/* Timeline Node 3 */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-start pb-10" id="journey-node-3">
            <div className="hidden sm:block text-right pr-6 pt-1">
              <span className="inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                Phase 3: Real Scenarios
              </span>
            </div>
            
            {/* Dot indicator */}
            <div className="absolute left-[-15px] sm:left-1/2 top-2 w-7 h-7 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center -translate-x-0 sm:-translate-x-1/2 z-10 shadow-xs">
              <span className="text-teal-600 font-mono text-[10px] font-bold">3</span>
            </div>

            <div className="pl-4 sm:pl-6 space-y-2 text-left">
              <span className="sm:hidden inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase mb-1">
                Phase 3: Real Scenarios
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-950">Creating Bioinformatics Simulations</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                To move beyond simple calculators, we structured authentic clinical cases. We curated verified references for CAG trinucleotide repeat variations in Huntington's disease, enabling students to perform sequence alignments and diagnostic analyses inside simulated patient profiles.
              </p>
            </div>
          </div>

          {/* Timeline Node 4 */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-start" id="journey-node-4">
            {/* Desktop Left aligned */}
            <div className="sm:order-2 hidden sm:block pl-6 pt-1 text-left">
              <span className="inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                Phase 4: Open Reach
              </span>
            </div>

            {/* Dot indicator */}
            <div className="absolute left-[-15px] sm:left-1/2 top-2 w-7 h-7 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center -translate-x-0 sm:-translate-x-1/2 z-10 shadow-xs">
              <span className="text-teal-600 font-mono text-[10px] font-bold">4</span>
            </div>

            <div className="sm:text-right pr-0 sm:pr-6 pl-4 sm:pl-0 space-y-2 text-left sm:text-right">
              <span className="sm:hidden inline-block bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase mb-1">
                Phase 4: Open Reach
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-950">Expanding Accessible Science Education</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                We deployed BioBridge Lab as an open-access global resource. We continue to introduce comprehensive curricula, active recall quizzes, and performance-based student portfolios designed to be easily presented in academic classes and independent study paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Future Roadmap Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-xs text-left" id="future-roadmap-section">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg">
            <Milestone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Future Research & Development</h2>
            <p className="text-xs text-slate-500 font-medium">A credible, phased expansion roadmap to introduce additional complexity and educational pathways.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="roadmap-grid">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2.5 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-full uppercase">
                Phase 1
              </span>
              <h3 className="text-xs font-bold text-slate-900">Advanced Bioinformatics Modules</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Integrating additional genomic sequence manipulation modules including reverse complement string parsers and basic fasta file schema viewers.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2.5 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-mono font-bold text-teal-700 bg-teal-50 border border-teal-150 px-2 py-0.5 rounded-full uppercase">
                Phase 2
              </span>
              <h3 className="text-xs font-bold text-slate-900">Advanced Genome Analysis</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Introducing interactive concepts for chromosome mapping coordinate spaces, Phred sequence quality score histograms, and genome variant indexing.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2.5 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-150 px-2 py-0.5 rounded-full uppercase">
                Phase 3
              </span>
              <h3 className="text-xs font-bold text-slate-900">Community Learning Features</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Developing structured academic exercise packets and curriculum guidelines designed for secondary educators and independent study circles.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2.5 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-full uppercase">
                Phase 4
              </span>
              <h3 className="text-xs font-bold text-slate-900">Collaboration Opportunities</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Partnering with open-source science groups to align virtual tool structures with real standard reference genomes and academic workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Standard Research Curriculums Section (Existing module map) */}
      <section className="bg-white border border-slate-200 p-8 rounded-2xl space-y-8 shadow-xs animate-fade-in" id="platform-modules-section">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Curriculum Index</span>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">Standard Research Curriculums</h2>
          <p className="text-slate-500 text-xs font-medium">Access real bioinformatic components and simulation tools designed for classroom labs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="module-overview-grid">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-500/40 transition-all cursor-pointer group" onClick={() => setView('learning')} id="module-overview-learning">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span className="text-[10px] bg-teal-50 border border-teal-200 text-teal-700 px-2.5 py-0.5 rounded font-mono font-bold">MODULE 01</span>
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5 group-hover:text-teal-700 transition-colors text-left">Interactive Lessons</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium text-left">A systematic introduction to genes, base pairing, central dogma transcription, and Sanger sequencing databases.</p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-500/40 transition-all cursor-pointer group" onClick={() => setView('lab')} id="module-overview-lab">
            <div className="flex items-center justify-between mb-4">
              <FlaskConical className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-0.5 rounded font-mono font-bold">MODULE 02</span>
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5 group-hover:text-emerald-700 transition-colors text-left">Virtual Bioinformatics Lab</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium text-left">Work directly with nucleotide sequence translation, peptide codon maps, GC ratios, and real-time alignment scores.</p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-500/40 transition-all cursor-pointer group" onClick={() => setView('research')} id="module-overview-research">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-5 h-5 text-indigo-600" />
              <span className="text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-0.5 rounded font-mono font-bold">MODULE 03</span>
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5 group-hover:text-indigo-700 transition-colors text-left">Clinical Simulations</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium text-left">Step into a diagnostics lab to analyze patient case files and assess genomic repeat mutations for clinical signs.</p>
          </div>
        </div>
      </section>

      {/* 6. Scientific Credibility ("Scientific Foundation") */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4" id="scientific-foundation-section">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="p-2.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-2 text-left flex-grow">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Scientific Foundation & Educational Bounds</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              BioBridge Lab is a simulated biotechnology educational environment. The interactive sandboxes utilize standard, peer-reviewed computational biology and molecular biology models, illustrating basic molecular biochemistry concepts including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-white border border-slate-150 rounded-lg text-left shadow-3xs">
                <span className="text-[10px] font-bold text-teal-700 block mb-0.5">• DNA Sequence Analysis</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Base distribution, complementary strand synthesis, GC ratios, and thermal pairing values.</p>
              </div>
              <div className="p-3 bg-white border border-slate-150 rounded-lg text-left shadow-3xs">
                <span className="text-[10px] font-bold text-indigo-700 block mb-0.5">• Genome Concepts</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Eukaryotic splicing, introns vs exons, and public repository accession conventions.</p>
              </div>
              <div className="p-3 bg-white border border-slate-150 rounded-lg text-left shadow-3xs">
                <span className="text-[10px] font-bold text-amber-700 block mb-0.5">• Molecular Biology</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Central Dogma transcription of mRNA sequences and ribosome translation of amino acids.</p>
              </div>
              <div className="p-3 bg-white border border-slate-150 rounded-lg text-left shadow-3xs">
                <span className="text-[10px] font-bold text-emerald-700 block mb-0.5">• Computational Basics</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Needleman-Wunsch scoring metrics, gap alignment penalties, and point mutation filters.</p>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-3 mt-3 flex items-start gap-2 text-[10px] text-slate-450 leading-relaxed font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Academic Limitation Notice:</strong> This software is designed exclusively for high school, undergraduate, and independent science education. It is <strong>NOT</strong> designed for, nor does it claim suitability for, clinical diagnostic use, medical decisions, or live patient genome analysis. All clinical patient records in simulations represent purely synthetic academic learning models.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
