import React from 'react';
import { ArrowRight, Dna, FlaskConical, Award, BookOpen, Database, Globe } from 'lucide-react';

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
          <span>Virtual Core Facility for Genomics & Computational Biology</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight relative z-10" id="hero-main-title">
          Open-Access Gateway to <span className="text-teal-700 font-black">Genomics Education</span> & Bio-Lab Pipelines
        </h1>
        
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed relative z-10" id="hero-description">
          A highly authentic virtual bioinformatic research sandbox. Translate nucleotide strands, practice Sanger sequence alignments, analyze clinical CAG repeat mutations, and develop real biotechnology skills.
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

      {/* Core Mission & Impact Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-slate-200 pt-16" id="impact-section">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight" id="impact-heading">
            Bridging the Biotech Resource Gap
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
            <p>
              In many academic settings, students struggle to obtain hands-on genetics and molecular biology training. Physical wet labs require specialized high-grade equipment, cold storages, PCR arrays, and hazardous chemical compliance workflows that remain prohibitively expensive.
            </p>
            <p className="border-l-4 border-teal-600 pl-4 bg-teal-50/50 py-3 rounded-r-lg text-teal-900">
              <strong>Our Educational Core:</strong> BioBridge Lab bridges this gap by delivering rigorous, real-time calculations directly to the web browser. Students gain immediate, practical exposure to biological algorithms and clinical diagnostics.
            </p>
            <p>
              By translating complex sequencing workflows and peptide transcription engines into highly intuitive workspaces, we empower students worldwide to conduct virtual genomic analysis completely free.
            </p>
          </div>
        </div>

        {/* Feature Grid / Stat Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="impact-stats-grid">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3" id="stat-lab-access">
            <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">100% Free Open Access</h3>
            <p className="text-xs text-slate-500 leading-relaxed">No logins, fees, or premium limits. Our resources integrate open-source sequence processing paradigms.</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3" id="stat-practical">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <FlaskConical className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">Interactive Classrooms</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Engage directly with DNA transcription calculators, gene aligners, and real-time nucleotide metrics.</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3" id="stat-curriculum">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">Systematic Learning Path</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Step-by-step interactive biology lessons covering transcription, translation, and genetic diagnostics.</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3" id="stat-challenges">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">Rigorous Puzzles</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Validate your knowledge with curated exercises, mutation hunting, and diagnostic reports.</p>
          </div>
        </div>
      </section>

      {/* Platform Overview Dashboard Map */}
      <section className="bg-white border border-slate-200 p-8 rounded-2xl space-y-8 shadow-xs" id="platform-modules-section">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">Standard Research Curriculums</h2>
          <p className="text-slate-500 text-xs">Access real bioinformatic components and simulation tools designed for classroom labs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="module-overview-grid">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-500/40 transition-all cursor-pointer group" onClick={() => setView('learning')} id="module-overview-learning">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span className="text-[10px] bg-teal-50 border border-teal-200 text-teal-700 px-2.5 py-0.5 rounded font-mono font-bold">MODULE 01</span>
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5 group-hover:text-teal-700 transition-colors">Interactive Lessons</h3>
            <p className="text-xs text-slate-500 leading-relaxed">A systematic introduction to genes, base pairing, central dogma transcription, and Sanger sequencing databases.</p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-500/40 transition-all cursor-pointer group" onClick={() => setView('lab')} id="module-overview-lab">
            <div className="flex items-center justify-between mb-4">
              <FlaskConical className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-0.5 rounded font-mono font-bold">MODULE 02</span>
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5 group-hover:text-emerald-700 transition-colors">Virtual Bioinformatics Lab</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Work directly with nucleotide sequence translation, peptide codon maps, GC ratios, and real-time alignment scores.</p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-500/40 transition-all cursor-pointer group" onClick={() => setView('research')} id="module-overview-research">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-5 h-5 text-indigo-600" />
              <span className="text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-0.5 rounded font-mono font-bold">MODULE 03</span>
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5 group-hover:text-indigo-700 transition-colors">Clinical Simulations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Step into a diagnostics lab to analyze patient case files and assess genomic repeat mutations for clinical signs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
