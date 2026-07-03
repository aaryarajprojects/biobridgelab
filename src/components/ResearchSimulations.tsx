import React, { useState } from 'react';
import { 
  Activity, CheckCircle2, ChevronRight, FileText, FlaskConical, 
  AlertTriangle, ShieldCheck, RefreshCw, Dna, Info, Sparkles, 
  HelpCircle, ArrowRight, Layers, Clipboard, Microscope, 
  Check, Play, ArrowLeft, Printer, Award, ExternalLink,
  Search, BookOpen, Compass, Sliders, Database, Terminal,
  ShieldAlert
} from 'lucide-react';
import { SavedReport, UserProgress } from '../types';

// ============================================================================
// SIMULATION DATA TYPES & CONSTANTS
// ============================================================================

export interface ResearchTopic {
  id: string;
  title: string;
  category: 'Therapeutics' | 'Clinical' | 'Environmental' | 'Evolutionary' | 'Computational';
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  status: 'Active' | 'Trending' | 'Emerging';
  shortDesc: string;
  detailedBackground: string;
  researchQuestion: string;
  suggestedDatabases: string[];
  variables: {
    independent: string[];
    dependent: string[];
  };
}

// ============================================================================
// ACADEMIC GENERATORS & SIMULATION ENGINES FOR DETAILED RESEARCH CHANNELS
// ============================================================================

export interface SimOutput {
  name: string;
  value: number;
  unit: string;
  evaluation: string;
}

export function getTopicAcademicLiterature(topic: ResearchTopic) {
  const intro = `The biological investigation of "${topic.title}" represents an active, high-priority frontier in modern molecular biology and bioinformatics. This research addresses the core biological question: "${topic.researchQuestion}". By integrating in-silico screening, molecular simulations, and cellular assay validations, researchers aim to reveal the biochemical feedback systems, genetic drivers, and thermodynamic factors that define sequence behavior in real biological models.`;

  let biochemicalPathway = '';
  let clinicalRelevance = '';
  let vocab: { term: string; def: string }[] = [];

  if (topic.category === 'Therapeutics') {
    biochemicalPathway = `At the sub-cellular level, therapeutic gene modifications depend on the structural configuration of genomic binding components (e.g., Cas9 nucleases, single-guide RNA spacer motifs, or lipid nanoparticle vectors). Alterations in the structural stability of RNA hairpin stems modify the binding equilibrium constant (K_d), altering the threshold of enzymatic cleavage specificity. Over-stabilizing these hybrid duplexes can impair genomic scanning rates, whereas destabilization facilitates mismatch tolerances, triggering unintended somatic mutations at off-target chromosomal sites.`;
    clinicalRelevance = `The therapeutic transition of molecular gene edits to clinical trials requires limiting off-target mutation frequencies below 1 in 10^5 to comply with clinical guidelines. Utilizing detailed in-silico models to predict and pre-empt off-target binding allows developers to refine guide selections, preserve eukaryotic genomic integrity, and verify that somatic gene corrections do not inadvertently shut down tumor-suppressor genes.`;
    vocab = [
      { term: "Kd (Dissociation Constant)", def: "An equilibrium metric quantifying the strength with which a ligand binds to a target protein; lower values represent tighter, more stable molecular interactions." },
      { term: "Spacer-Target Hybridization", def: "The Watson-Crick pairing of a guide RNA's 20-nucleotide sequence to genomic DNA, where high thermal stability reduces mismatch cleavage errors." },
      { term: "Double-Strand Break (DSB)", def: "A critical form of DNA damage where both strands of the double helix are cleaved, triggering cellular DNA repair pathways (NHEJ or HDR)." },
      { term: "Off-Target Mutational Footprint", def: "Unintended genomic substitutions, insertions, or deletions caused by structural mismatch tolerances of editing enzymes at non-target loci." }
    ];
  } else if (topic.category === 'Clinical') {
    biochemicalPathway = `Clinical genetic diagnostics are governed by the biochemical severity of somatic variations or tandem repeats within coding regions. For instance, point mutations in critical receptor tyrosine kinases (such as EGFR, BRAF, or KRAS) trigger continuous ligand-independent signaling, bypassing normal cell-cycle controls. In expansion disorders, such as Huntington's disease, DNA polymerase slippage during replication drives cumulative CAG repeat tract expansion, creating structurally unstable huntingtin proteins that aggregate and induce progressive cell death.`;
    clinicalRelevance = `Understanding patient-specific sequence variants is essential for personalized medicine and target therapies. For example, lung cancer cohorts with specific Exon 19 deletions respond robustly to small-molecule tyrosine kinase inhibitors (such as Erlotinib), but acquiring secondary mutations (such as T790M) changes the binding pocket configuration, conferring drug resistance. Accurately modeling this resistance helps clinicians design dual-inhibitor regimens.`;
    vocab = [
      { term: "Tyrosine Kinase Cascade", def: "A cellular signaling pathway that regulates division and growth; driver mutations in this system cause uncontrolled, ligand-free cell proliferation." },
      { term: "Capillary Electrophoresis", def: "A high-resolution analytical separation technique used to measure the exact length of PCR-amplified DNA segments (e.g., repeating CAG tracts)." },
      { term: "Somatic Variant Stratification", def: "The process of categorizing patient cohorts based on unique genetic variations to predict drug response and clinical survival outcomes." },
      { term: "Genotype-Phenotype Penetrance", def: "The quantitative likelihood that an individual carrying a specific pathogenic mutation will exhibit the physical signs of the disease." }
    ];
  } else if (topic.category === 'Environmental') {
    biochemicalPathway = `Environmental metagenomics relies on examining total extracted environmental DNA (eDNA) from ecological niches, bypassing the limitations of laboratory culturing. The biological capabilities of soil and marine microbial communities are decoded from conserved enzymatic gene clusters, such as the nitrogen-fixing nitrogenase reductase operon (nifH). By extracting eDNA and utilizing high-throughput barcoded sequencing, researchers can reconstruct community metabolic pathways and k-mer distribution profiles.`;
    clinicalRelevance = `In-depth mapping of soil and marine microbiomes is critical for sustainable agriculture, bio-remediation, and tracking global biochemical cycles. Monitoring changes in the abundance of nitrogen-fixing bacterial communities across seasonal temperature fluctuations helps agronomists optimize organic fertilizer inputs, preserving crop yields while preventing nitrogen runoff and environmental degradation.`;
    vocab = [
      { term: "eDNA (Environmental DNA)", def: "Genomic DNA extracted directly from environmental matrices (such as soil or water) containing the genetic footprints of diverse co-existing organisms." },
      { term: "nifH Metagenomic Marker", def: "A highly conserved gene sequence encoding the nitrogenase iron protein, serving as a diagnostic biomarker for nitrogen-fixing bacteria." },
      { term: "K-mer Assembly Hash", def: "A computational algorithm that splits raw DNA sequencing reads into short substrings of length k to reconstruct draft environmental genomes." },
      { term: "Shannon Species Diversity Index", def: "A mathematical indicator that calculates ecological biodiversity, accounting for both species richness and relative abundance." }
    ];
  } else if (topic.category === 'Evolutionary') {
    biochemicalPathway = `Evolutionary genomics analyzes mutations, genetic drift, and natural selection pressures. By comparing orthologous sequences, researchers track evolutionary divergence. The ratio of non-synonymous mutations (which modify protein structure) to synonymous mutations (which do not alter amino acid charge) represents the selective pressure (dN/dS). A dN/dS ratio greater than 1 indicates positive Darwinian selection, which is common in viral spike proteins adapting to human receptors.`;
    clinicalRelevance = `Tracking viral and bacterial evolution is vital for epidemiology and pandemic preparedness. Using Bayesian molecular clocks to analyze zoonotic sequences lets researchers reconstruct spillover timelines, identify animal hosts, and predict adaptative mutations, enabling proactive development of vaccine candidates and small-molecule therapeutics.`;
    vocab = [
      { term: "dN/dS Mutation Ratio", def: "The ratio of non-synonymous substitutions per site to synonymous substitutions per site, used as an indicator of evolutionary selective pressure." },
      { term: "Zoonotic Viral Spillover", def: "An evolutionary event where a pathogen jumps from an animal host species to establish infection lineages in humans." },
      { term: "Bayesian Molecular Clock", def: "A statistical method that uses mutation accumulation rates over time to date the divergence of evolutionary branches." },
      { term: "Consensus Root Sequence", def: "The mathematically reconstructed ancestral sequence that represents the most likely origin of a group of mutated variants." }
    ];
  } else {
    // Computational
    biochemicalPathway = `Computational biology designs biological state-machines inside cellular hosts. A standard toggle switch, for example, utilizes mutual transcriptional repression (e.g., LacI and TetR), where each protein represses the transcription of the other. The stability of this genetic circuit is governed by transcription rates, translation efficiencies, and protein degradation half-lives, modeled using ordinary differential equations (ODEs).`;
    clinicalRelevance = `Synthetic gene networks are the foundation of smart drug-delivery cells and engineered CAR-T immunotherapies. Programmed E. coli toggle cells can monitor target biomarkers inside the human intestine, transition to a stable 'memory' state when encountering pathological inflammation, and serve as non-invasive diagnostic indicators.`;
    vocab = [
      { term: "Bistable Circuit Topology", def: "A gene regulatory structure that possesses exactly two stable steady states, enabling long-term memory storage inside living cells." },
      { term: "Mutual Transcriptional Repression", def: "A genetic circuit layout where two repressor proteins actively inhibit the promoter driving each other's synthesis." },
      { term: "RBS Translation Strength", def: "The efficiency with which ribosomes bind a specific mRNA sequence, determining translation rates independently of transcription." },
      { term: "Ordinary Differential Equation (ODE)", def: "A mathematical function describing how cellular concentrations change over time based on kinetic rate constants." }
    ];
  }

  return {
    intro,
    biochemicalPathway,
    clinicalRelevance,
    vocab
  };
}

export function getTopicLaboratoryProtocol(topic: ResearchTopic) {
  let reagentList: string[] = [];
  let steps: string[] = [];
  let controls: { pos: string; neg: string; method: string } = { pos: '', neg: '', method: '' };
  let bsl = 'BSL-1 (Standard Biological Containment)';

  if (topic.category === 'Therapeutics') {
    reagentList = [
      "Recombinant Purified Cas9 Protein (10 uM stock)",
      "Synthesized custom sgRNA Oligonucleotides (target spacer and stabilizing hairpins)",
      "Duplex Hybridization Buffer (10x concentration)",
      "Lipofectamine 3000 Transfection Reagent Mix",
      "Human HEK293T Cell Culture Substrate",
      "Silica-column Genomic DNA Isolation Kits"
    ];
    steps = [
      "Design sgRNA sequences with varying G-C content and sequence mismatch positions using online design portals.",
      "Thaw human HEK293T target cells and seed onto 96-well culture plates at 70% cell density.",
      "Assemble Cas9 Ribonucleoprotein (RNP) complexes by incubating Cas9 protein with sgRNA at 1:1.2 molar ratio.",
      "Introduce the RNP complexes into the cultured human cells using lipid-nanoparticle transfection.",
      "Harvest and purify genomic DNA 48 hours post-transfection using silica-spin columns.",
      "Perform high-throughput Next-Generation Sequencing (NGS) to profile indels at on-target and predicted off-target genomic loci."
    ];
    controls = {
      pos: "Verified guide RNA targeting a highly accessible housekeeping gene (GAPDH) to confirm transfection efficiency.",
      neg: "Non-targeting scrambled sgRNA mock control to measure background genomic mutation rates.",
      method: "Amplicon Sequencing (Amp-Seq) validated by PCR-based T7 Endonuclease I (T7E1) enzymatic cleavage assays."
    };
    bsl = "BSL-2 (Human Cell Line Safety protocols)";
  } else if (topic.category === 'Clinical') {
    reagentList = [
      "Patient Somatic/Germline DNA templates (purified from tissue biopsies or blood samples)",
      "Custom Forward and Reverse PCR Primers flanking mutation junctions",
      "High-Fidelity Taq DNA Polymerase Master Mix with dNTPs",
      "Sanger Sequencing Capillary Electrophoresis Buffer",
      "Targeted Tyrosine Kinase Inhibitors (Erlotinib/Gefitinib stock solutions)",
      "Annexin V-FITC Apoptosis Detection Staining Solution"
    ];
    steps = [
      "Amplify target genomic regions (e.g., HTT CAG repeats or EGFR exons) using high-fidelity PCR assays.",
      "Cleanse PCR amplicons using magnetic beads to remove unused primers and nucleotide dimers.",
      "Set up cycle sequencing reactions using fluorescent dideoxynucleotides (Sanger termination method).",
      "Resolve DNA fragments and mutations using high-resolution capillary electrophoresis.",
      "Expose patient-derived tumor cell lines to varying concentrations of targeted inhibitors.",
      "Quantify apoptotic cell populations and cell viability rates using fluorescent plate assays or flow cytometry."
    ];
    controls = {
      pos: "DNA control from cell lines with confirmed mutation genotypes (e.g., EGFR T790M positive control).",
      neg: "Certified healthy genomic DNA representing homozygous wild-type alleles.",
      method: "Capillary Electrophoresis sequence trace alignment and Chromatogram Peak Area quantification."
    };
    bsl = "BSL-2 (Clinical Biosafety Level for patient specimens)";
  } else if (topic.category === 'Environmental') {
    reagentList = [
      "Soil cores collected from agricultural field plots (5.0 gram sample)",
      "eDNA Cell Lysis Extraction Buffer (SDS and Proteinase K)",
      "Phenol-Chloroform-Isoamyl Alcohol Purification Mix",
      "Conserved nifH-targeting metabarcoding PCR primers",
      "Illumina MiSeq Reagents & Paired-End Flowcells",
      "Agarose-gel Electrophoresis Molecular Weight standards"
    ];
    steps = [
      "Sieve soil samples to remove plant debris, weigh 1.0 gram, and suspend in enzymatic lysis buffer.",
      "Perform high-speed bead-beating cell disruption to release bacterial genomic DNA from soil matrices.",
      "Purify eDNA using phenol-chloroform extraction, followed by ethanol precipitation to remove humic inhibitors.",
      "Amplify nitrogen-fixing marker genes (nifH) using multiplexed barcoded PCR primers.",
      "Verify PCR product size using agarose-gel electrophoresis, and quantify library yields with fluorometric dyes.",
      "Pool barcoded amplicon libraries in equimolar ratios and load onto an Illumina MiSeq sequencer for paired-end sequencing."
    ];
    controls = {
      pos: "Mock bacterial community containing pre-mixed nitrogen-fixing bacterial species (e.g., Azotobacter chroococcum).",
      neg: "Sterile PCR-grade water processed through the complete extraction, amplification, and sequencing pipeline.",
      method: "Fluorometric quantification (Qubit) and qPCR absolute copy number profiling."
    };
    bsl = "BSL-1 (Standard Soil Microbiology guidelines)";
  } else if (topic.category === 'Evolutionary') {
    reagentList = [
      "Viral-RNA Extraction and Purification Spin Columns",
      "Reverse Transcriptase Enzyme Mix with Random Hexamers",
      "Overlapping multiplex PCR primers spanning spike protein regions",
      "Nextera DNA Flex Library Preparation kits",
      "High-output Illumina NextSeq Sequencing Flowcells",
      "Molecular Biology Grade Ultra-pure Water"
    ];
    steps = [
      "Isolate viral RNA from zoonotic saliva or tissue samples using clinical-grade spin columns.",
      "Perform reverse transcription (RT-PCR) to synthesize stable cDNA templates.",
      "Conduct multiplex tiling PCR to amplify overlapping regions covering the entire spike gene.",
      "Perform enzymatic fragmentation and adapter ligation to prepare barcoded sequencing libraries.",
      "Pool libraries, denature with sodium hydroxide, and load onto the high-throughput sequencing platform.",
      "Perform high-depth sequencing (at least 100x coverage) and export raw FASTQ sequences to alignment pipelines."
    ];
    controls = {
      pos: "Inactivated Reference SARS-CoV-2 spike gene control RNA standard.",
      neg: "Nuclease-free water reverse-transcribed alongside target viral samples.",
      method: "High-accuracy sequence trace depth validation, ensuring at least 100x coverage depth."
    };
    bsl = "BSL-2 or BSL-3 (Depending on target viral pathogen isolation risk)";
  } else {
    // Computational
    reagentList = [
      "E. coli K12 chemically competent host cells",
      "Target plasmids containing synthetic circuits with GFP/RFP reporter genes",
      "IPTG Inducer stock solution (100 mM)",
      "Anhydrotetracycline (aTc) Inducer stock solution (100 ug/mL)",
      "Luria-Bertani (LB) Agar plates containing selection antibiotics",
      "Fluorescence Microplate Reader well plates"
    ];
    steps = [
      "Thaw competent E. coli cells, add 10 ng of synthetic plasmid, and incubate on ice for 30 minutes.",
      "Heat-shock the cells at 42°C for exactly 45 seconds to facilitate plasmid entry, then chill on ice.",
      "Recover transformed bacteria in SOC medium at 37°C for 1 hour under shaking.",
      "Plate cultures onto selective agar plates containing ampicillin and incubate overnight.",
      "Inoculate single colonies into liquid selective media, grow to log phase, and dispense onto microplates.",
      "Add chemical inducers (IPTG or aTc) and measure fluorescent reporter ratios (GFP/RFP) over a 24-hour cycle."
    ];
    controls = {
      pos: "Plasmid-expressing constitutive GFP to verify translation and fluorescence baseline limits.",
      neg: "Untransformed host cells grown in non-selective Luria-Bertani media.",
      method: "Fluorescence spectrophotometry normalized against optical density at 600nm (OD600)."
    };
    bsl = "BSL-1 (Recombinant Non-pathogenic E. coli standard)";
  }

  return {
    reagentList,
    steps,
    controls,
    bsl
  };
}

export function runVirtualSimulation(
  topic: ResearchTopic,
  independentVar: string,
  inputValue: number, // 0 to 100
  secondaryFactor: number // 0 to 100
): SimOutput[] {
  const outputs: SimOutput[] = [];
  const depNames = topic.variables.dependent;

  if (topic.id === "topic-1") {
    if (independentVar === "sgRNA Hairpin G-C Content") {
      const offTargetVal = Math.max(0.5, 42 - (inputValue * 0.42) - (secondaryFactor * 0.12));
      const onTargetVal = Math.max(5, inputValue < 72 ? (35 + (inputValue * 0.55) + (secondaryFactor * 0.12)) : (75 - (inputValue - 72) * 2.2));
      const toxicity = Math.max(2, (secondaryFactor * 0.7) + (inputValue * 0.1));
      
      outputs.push({ name: depNames[0], value: parseFloat(offTargetVal.toFixed(2)), unit: "% Cleavage Ratio", evaluation: offTargetVal > 15 ? "High Hazard (Mismatch Cleavage)" : "Safe / Clinical Grade" });
      outputs.push({ name: depNames[1], value: parseFloat(toxicity.toFixed(2)), unit: "Hazard Index (0-100)", evaluation: toxicity > 60 ? "Critical Toxicity Detected" : "Low Toxicity / Tolerable" });
      outputs.push({ name: depNames[2], value: parseFloat(onTargetVal.toFixed(2)), unit: "% Edit Yield", evaluation: onTargetVal > 70 ? "Excellent On-Target Editing" : "Insufficient Editing Yield" });
    } else if (independentVar === "Cas9 Concentration") {
      const offTargetVal = Math.min(95, 4 + (inputValue * 0.88) - (secondaryFactor * 0.08));
      const onTargetVal = Math.min(98, 8 + (inputValue * 0.94));
      const toxicity = Math.min(100, 1 + (inputValue * 0.92) + (secondaryFactor * 0.12));
      
      outputs.push({ name: depNames[0], value: parseFloat(offTargetVal.toFixed(2)), unit: "% Cleavage Ratio", evaluation: offTargetVal > 25 ? "Significant Cleavage Error" : "Acceptable Threshold" });
      outputs.push({ name: depNames[1], value: parseFloat(toxicity.toFixed(2)), unit: "Hazard Index (0-100)", evaluation: toxicity > 50 ? "High Cellular Stress" : "Minimal Cell Senescence" });
      outputs.push({ name: depNames[2], value: parseFloat(onTargetVal.toFixed(2)), unit: "% Edit Yield", evaluation: onTargetVal > 75 ? "Optimal On-Target Editing" : "Poor/Insufficient Editing" });
    } else {
      const offTargetVal = Math.max(0.1, 78 - (inputValue * 11.5) + (secondaryFactor * 0.15));
      const onTargetVal = Math.max(10, 82 - (inputValue * 2.2));
      const toxicity = Math.max(1, 38 - (inputValue * 3.5));
      
      outputs.push({ name: depNames[0], value: parseFloat(offTargetVal.toFixed(2)), unit: "% Cleavage Ratio", evaluation: offTargetVal > 20 ? "High Cleavage Error" : "Target Highly Specific" });
      outputs.push({ name: depNames[1], value: parseFloat(toxicity.toFixed(2)), unit: "Hazard Index (0-100)", evaluation: toxicity > 30 ? "Moderate Stress" : "Healthy" });
      outputs.push({ name: depNames[2], value: parseFloat(onTargetVal.toFixed(2)), unit: "% Edit Yield", evaluation: onTargetVal > 60 ? "Normal Editing Yield" : "Cleavage Inhibited" });
    }
  } else if (topic.id === "topic-2") {
    if (independentVar === "Inhibitor Dosage (nM)") {
      const isResistant = secondaryFactor > 50;
      const factor = isResistant ? 5.2 : 1.0;
      
      const phosphoVal = Math.max(2, 98 - (inputValue * 0.96 / factor));
      const apoptosisVal = Math.min(95, 3 + (inputValue * 0.94 / factor));
      const tumorVal = Math.max(0.1, 10 - (inputValue * 0.10 / factor));
      
      outputs.push({ name: depNames[0], value: parseFloat(phosphoVal.toFixed(2)), unit: "% Phosphorylation", evaluation: phosphoVal > 40 ? "Kinase Active (Cancer Survives)" : "Kinase Inhibited (Success)" });
      outputs.push({ name: depNames[1], value: parseFloat(apoptosisVal.toFixed(2)), unit: "% Apoptotic Cells", evaluation: apoptosisVal > 50 ? "Massive Tumor Cell Death" : "Tumor Resists Apoptosis" });
      outputs.push({ name: depNames[2], value: parseFloat(tumorVal.toFixed(2)), unit: "cm³ Tumor Volume", evaluation: tumorVal > 5 ? "Rapid Proliferation" : "Tumor Regression" });
    } else {
      const baseDose = secondaryFactor * 0.8;
      const phosphoVal = Math.max(4, 92 - (inputValue * 0.35) - (baseDose * 0.45));
      const apoptosisVal = Math.min(92, 4 + (inputValue * 0.42) + (baseDose * 0.38));
      const tumorVal = Math.max(0.2, 9.5 - (inputValue * 0.09) - (baseDose * 0.04));
      
      outputs.push({ name: depNames[0], value: parseFloat(phosphoVal.toFixed(2)), unit: "% Phosphorylation", evaluation: phosphoVal > 50 ? "Active Proliferation" : "Suppressed Proliferation" });
      outputs.push({ name: depNames[1], value: parseFloat(apoptosisVal.toFixed(2)), unit: "% Apoptotic Cells", evaluation: apoptosisVal > 40 ? "Significant Apoptosis" : "Poor Response" });
      outputs.push({ name: depNames[2], value: parseFloat(tumorVal.toFixed(2)), unit: "cm³ Tumor Volume", evaluation: tumorVal > 6 ? "Expanding" : "Contained" });
    }
  } else if (topic.id === "topic-4") {
    if (independentVar === "Initial CAG Repeat Count") {
      const repeats = Math.floor(30 + (inputValue * 0.9));
      const expansion = Math.max(1, (repeats - 35) * 1.4 + (secondaryFactor * 0.08));
      const aggregation = Math.min(98, Math.max(2, (repeats - 37) * 2.1));
      const viability = Math.max(3, 98 - (repeats - 35) * 1.15);
      
      outputs.push({ name: depNames[0], value: parseFloat(expansion.toFixed(2)), unit: "% Somatic Expansion Rate", evaluation: repeats > 38 ? "Pathogenic Expansions Active" : "Stable Repeat Length" });
      outputs.push({ name: depNames[1], value: parseFloat(aggregation.toFixed(2)), unit: "% Aggregate Volume", evaluation: repeats > 39 ? "Intracellular Fibril Aggregates" : "Monomeric / Soluble HTT" });
      outputs.push({ name: depNames[2], value: parseFloat(viability.toFixed(2)), unit: "% Neuronal Viability", evaluation: viability < 60 ? "Severe Neurodegeneration" : "Healthy Neuronal Viability" });
    } else {
      const expansion = Math.max(0.1, 32 - (inputValue * 0.28) - (secondaryFactor * 0.08));
      const aggregation = Math.max(4, 72 - (inputValue * 0.45));
      const viability = Math.min(98, 48 + (inputValue * 0.38) + (secondaryFactor * 0.12));
      
      outputs.push({ name: depNames[0], value: parseFloat(expansion.toFixed(2)), unit: "% Somatic Expansion Rate", evaluation: "Stabilized / Contraction Locus" });
      outputs.push({ name: depNames[1], value: parseFloat(aggregation.toFixed(2)), unit: "% Aggregate Volume", evaluation: "Reduced Insoluble Fibrils" });
      outputs.push({ name: depNames[2], value: parseFloat(viability.toFixed(2)), unit: "% Neuronal Viability", evaluation: "Protected Lines" });
    }
  } else if (topic.id === "topic-6") {
    const isIPTG = independentVar === "IPTG Inducer Concentration (uM)";
    const retentionVal = isIPTG ? Math.min(72, 2 + (inputValue * 0.68)) : Math.min(72, 4 + (inputValue * 0.48));
    const fluorVal = isIPTG ? Math.min(25, 0.1 + (inputValue * 0.24)) : Math.min(25, 1 + (inputValue * 0.14));
    const sensitivity = Math.max(0.1, 8.2 - (inputValue * 0.07));
    
    outputs.push({ name: depNames[0], value: parseFloat(retentionVal.toFixed(2)), unit: "Hours State Stability", evaluation: retentionVal > 24 ? "Bistable Circuit Memory Retained" : "Transient State Leakage" });
    outputs.push({ name: depNames[1], value: parseFloat(fluorVal.toFixed(2)), unit: "GFP/RFP Ratio", evaluation: fluorVal > 10 ? "GFP High-State Activator" : "RFP Default State Activator" });
    outputs.push({ name: depNames[2], value: parseFloat(sensitivity.toFixed(2)), unit: "uM Inducer Threshold", evaluation: "Optimal Toggle Sensitivity" });
  } else {
    // General non-linear responsive simulation model for other topics
    const baseValue = inputValue;
    const cofactorValue = secondaryFactor;
    
    const val1 = Math.max(0, parseFloat((Math.sin(baseValue / 12) * 22 + 48 + cofactorValue * 0.22).toFixed(2)));
    const val2 = Math.min(100, Math.max(0, parseFloat((100 - baseValue * 0.75 + cofactorValue * 0.35).toFixed(2))));
    const val3 = Math.max(0, parseFloat((baseValue * 0.88 + cofactorValue * 0.12).toFixed(2)));
    
    outputs.push({
      name: depNames[0] || "Target Expression Yield",
      value: val1,
      unit: topic.category === 'Environmental' ? "Biomass Score" : topic.category === 'Clinical' ? "pg/mL Plasma" : "% Conversion Rate",
      evaluation: val1 > 60 ? "Active / Significant Signal" : "Low / Latent Pathway Activity"
    });
    
    outputs.push({
      name: depNames[1] || "Cell/Ecological Stability",
      value: val2,
      unit: topic.category === 'Clinical' ? "Percent (%)" : "Biodiversity Index (H')",
      evaluation: val2 > 70 ? "Stable / Normal Vitality" : "Stressed / Compromised System"
    });
    
    outputs.push({
      name: depNames[2] || "Amplification Yield",
      value: val3,
      unit: "RFU Detection Units",
      evaluation: val3 > 50 ? "Clear Analytical Target Peaks" : "Trace Levels / Noise Limit"
    });
  }

  return outputs;
}

export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: "topic-1",
    title: "CRISPR-Cas9 Off-Target Mitigation",
    category: "Therapeutics",
    difficulty: "Expert",
    status: "Trending",
    shortDesc: "Computational modeling of guide RNA mismatch tolerance to prevent unwanted genome alterations during gene editing.",
    detailedBackground: "CRISPR-Cas9 gene editing relies on a 20-nucleotide single guide RNA (sgRNA) to target specific genomic sequences. However, mismatch tolerance can cause off-target cleavage, potentially disrupting tumor suppressors or activating oncogenes. Researchers are developing deep neural networks and high-throughput sequencing assays to predict and eliminate these risks.",
    researchQuestion: "How does altering sgRNA secondary structure stability impact off-target cleavage rates in human cells?",
    suggestedDatabases: ["NCBI PubMed", "CRISPR-Cas9 Target Database", "UniProt Cas9 Structure"],
    variables: {
      independent: ["sgRNA Hairpin G-C Content", "Cas9 Concentration", "PAM Distal Mismatch Count"],
      dependent: ["Off-Target Cleavage Ratio", "In-Vivo Toxicity Score", "On-Target Edit Efficiency"]
    }
  },
  {
    id: "topic-2",
    title: "Oncogene Addiction & Driver Mutations",
    category: "Clinical",
    difficulty: "Intermediate",
    status: "Active",
    shortDesc: "Identifying non-synonymous mutations in genes like TP53 and EGFR to design patient-specific small-molecule tyrosine kinase inhibitors.",
    detailedBackground: "Oncogene addiction describes the phenomenon where tumor cells depend on a single mutated gene for survival. Identifying these somatic driver mutations (as opposed to harmless passenger mutations) allows clinicians to prescribe targeted therapies like Erlotinib for EGFR mutant lung cancers.",
    researchQuestion: "What is the correlation between specific EGFR exon 19 deletion lengths and patient resistance to first-generation kinase inhibitors?",
    suggestedDatabases: ["NCBI ClinVar", "COSMIC (Catalogue of Somatic Mutations)", "PDB (Protein Data Bank)"],
    variables: {
      independent: ["Exon 19 Deletion Length (bp)", "Inhibitor Dosage (nM)", "EGFR Codon T790M Mutation State"],
      dependent: ["Kinase Phosphorylation Level", "Apoptotic Cell Percentage", "Tumor Volume Reduction"]
    }
  },
  {
    id: "topic-3",
    title: "Metagenomic Soil Microbiome Mapping",
    category: "Environmental",
    difficulty: "Intermediate",
    status: "Active",
    shortDesc: "High-throughput environmental DNA (eDNA) sequencing to discover unculturable nitrogen-fixing microbes in agricultural soil.",
    detailedBackground: "Traditional microbiology relies on culturing microbes on agar plates, which misses over 99% of environmental bacteria. Metagenomic sequencing bypasses this by extracting total eDNA directly from soil, using shotgun sequencing and k-mer assembly to reconstruct the metabolic pathways of nitrogen-fixing bacterial communities.",
    researchQuestion: "How do seasonal temperature fluctuations alter the abundance of nitrogen-fixing (nifH) gene sequences in organic cropland soil?",
    suggestedDatabases: ["NCBI SRA (Sequence Read Archive)", "MG-RAST Metagenomics Portal", "RefSeq Microbes"],
    variables: {
      independent: ["Soil Nitrogen Supplement Level", "Soil Ambient Temperature (°C)", "Tillage Frequency"],
      dependent: ["nifH Gene Abundance Index", "Microbial Biodiversity Score (Shannon Index)", "Nitrogenase Expression Rate"]
    }
  },
  {
    id: "topic-4",
    title: "Trinucleotide Repeat Expansion Dynamics",
    category: "Clinical",
    difficulty: "Expert",
    status: "Trending",
    shortDesc: "Investigating the molecular stability of CAG tandem repeats in the HTT gene and their correlation with neurodegenerative onset.",
    detailedBackground: "Tandem repeat diseases are characterized by unstable repeats that expand during gametogenesis. In Huntington's Disease, exceeding 36 repeats in the huntingtin gene causes protein aggregation and neural toxicity. Researchers are analyzing repeat stability mechanisms to develop small-molecule contraction agents.",
    researchQuestion: "Does the length of flanking flanking-sequence G-C content stabilize CAG repeat tracts during cell division?",
    suggestedDatabases: ["NCBI Gene", "PubMed Literature", "OMIM (Online Mendelian Inheritance in Man)"],
    variables: {
      independent: ["Initial CAG Repeat Count", "Flanking sequence G-C Percentage", "Mismatch Repair Gene (MSH2) Expression Level"],
      dependent: ["Somatic Expansion Rate", "Huntingtin Protein Aggregation Level", "Cell Viability Rate"]
    }
  },
  {
    id: "topic-5",
    title: "Epigenetic Chromatin Remodeling in Aging",
    category: "Evolutionary",
    difficulty: "Expert",
    status: "Emerging",
    shortDesc: "Quantitative assessment of CpG island methylation levels and histone acetylation drift in eukaryotic cell senescence.",
    detailedBackground: "Aging is increasingly understood as an epigenetic phenomenon. DNA methyltransferases and histone acetyltransferases modify chromatin structure to regulate gene accessibility without altering the raw sequence. Tracking CpG methylation 'clocks' allows researchers to calculate biological age vs. chronological age.",
    researchQuestion: "How does moderate caloric restriction alter the rate of CpG island methylation drift in mammalian somatic lineages?",
    suggestedDatabases: ["NCBI Epigenomics", "GEO (Gene Expression Omnibus)", "Ensembl Epigenomes"],
    variables: {
      independent: ["Caloric Intake Restriction Level", "Age of Somatic Tissue (Months)", "SIRT1 Deacetylase Activity"],
      dependent: ["CpG Methylation Divergence Score", "Histone H3K9 Acetylation Abundance", "Senescence-Associated Beta-Galactosidase Level"]
    }
  },
  {
    id: "topic-6",
    title: "Synthetic Toggle Switches in E. coli",
    category: "Computational",
    difficulty: "Expert",
    status: "Trending",
    shortDesc: "Designing artificial gene circuits containing mutual inhibitory promoters to construct biological memory cells.",
    detailedBackground: "Synthetic biology applies engineering principles to cellular networks. A genetic toggle switch consists of two promoters that mutually repress each other. Transiently inducing one promoter flips the system into a stable state that persists even after the inducer is removed, acting as a biological memory unit.",
    researchQuestion: "How does the ribosome binding site (RBS) translation rate affect the stability of synthetic bistable toggle states?",
    suggestedDatabases: ["Registry of Standard Biological Parts", "NCBI Nucleotide", "Synthetic Biology Database"],
    variables: {
      independent: ["Ribosome Binding Site Translation Rate", "IPTG Inducer Concentration (uM)", "Repressor Protein Half-life"],
      dependent: ["Bistable Retention Time (Hours)", "Fluorescence Intensity Ratio (GFP/RFP)", "Switching Threshold Sensitivity"]
    }
  },
  {
    id: "topic-7",
    title: "Phylogenetic Tracking of Zoonotic Viruses",
    category: "Evolutionary",
    difficulty: "Intermediate",
    status: "Active",
    shortDesc: "Reconstructing viral mutation timelines and molecular clocks using multiple sequence alignments of spike protein variants.",
    detailedBackground: "Zoonotic spillover events occur when viruses transfer from animals to humans. By comparing spike gene sequences across bat, pangolin, and human isolates, evolutionary biologists use maximum likelihood cladograms and molecular clocks to determine the ancestral split timelines and pinpoint host-adaptation mutations.",
    researchQuestion: "What is the estimated chronological divergence date of zoonotic coronavirus strains based on synonymous mutation rates?",
    suggestedDatabases: ["NCBI Virus", "GISAID Influenza and Coronavirus Database", "Nextstrain Viral Tracker"],
    variables: {
      independent: ["Spike Gene Synonymous Mutation Rate", "Host Species Range", "Geographical Isolation Distance (km)"],
      dependent: ["Estimated Divergence Date (Years)", "Cladogram Bootstrap Confidence Level", "Host-Cell Receptor (ACE2) Affinity Index"]
    }
  },
  {
    id: "topic-8",
    title: "Pharmacogenomics of CYP450 Enzymes",
    category: "Clinical",
    difficulty: "Intermediate",
    status: "Active",
    shortDesc: "Evaluating how single nucleotide polymorphisms in the liver CYP2D6 gene dictate drug safety and metabolic profiles.",
    detailedBackground: "The Cytochrome P450 super-family of enzymes metabolizes over 70% of clinical medications. SNPs in the CYP2D6 gene can make patients poor, intermediate, extensive, or ultra-rapid drug metabolizers. This genetic variation determines drug safety and efficacy, especially for medications like codeine or beta-blockers.",
    researchQuestion: "How do CYP2D6 *4 splice-site mutations affect the plasma clearance rate of critical beta-blocker drugs?",
    suggestedDatabases: ["PharmGKB (Pharmacogenomics Knowledgebase)", "NCBI ClinVar", "RefSeq Proteins"],
    variables: {
      independent: ["CYP2D6 *4 Allele Copy Number (0, 1, or 2)", "Initial Beta-Blocker Drug Dose (mg)", "Patient Body Mass Index"],
      dependent: ["Drug Plasma Clearance Half-Life (Hours)", "CYP2D6 Enzyme Activity Index", "Adverse Drug Reaction Rate (%)"]
    }
  },
  {
    id: "topic-9",
    title: "Sanger Sequencing Chromatogram Resolution",
    category: "Computational",
    difficulty: "Beginner",
    status: "Active",
    shortDesc: "Signal processing of capillary electrophoresis fluorescent peaks to reduce automated base-calling error rates.",
    detailedBackground: "Sanger sequencing uses dye-terminator nucleotides (ddNTPs) to generate fragments terminated at every base. These are sorted by size through capillary gel tubes, where a laser reads fluorescence peaks. Resolving overlapping peaks and signal noise is crucial for accurate base calls, particularly at the ends of long reads.",
    researchQuestion: "Can noise-filtering algorithms decrease the base-call error rate at sequence positions beyond 800 base pairs?",
    suggestedDatabases: ["NCBI Trace Archive", "PubMed Bibliography", "Sanger Sequence Standards"],
    variables: {
      independent: ["Capillary Voltage Gradient", "Dye-Terminator Peak Overlap Coefficient", "Base-calling Algorithm Noise Threshold"],
      dependent: ["Phred Quality Score (Q)", "Base-calling Error Probability", "Maximum Readable Sequence Length (bp)"]
    }
  },
  {
    id: "topic-10",
    title: "Retrotransposon Mobilization in Neurogenesis",
    category: "Evolutionary",
    difficulty: "Expert",
    status: "Emerging",
    shortDesc: "Tracking active LINE-1 retrotransposition insertion sites in somatic mammalian neural progenitor cells.",
    detailedBackground: "Retrotransposons are mobile genetic elements that copy and paste themselves into new genomic locations via an RNA intermediate. While historically dismissed as 'junk DNA', recent studies show active LINE-1 retrotransposon mobilization in human neural lineages, contributing to cellular mosaicism and potentially impacting brain function.",
    researchQuestion: "Do elevated cellular stress levels trigger LINE-1 transposition events in cultured neural stem cells?",
    suggestedDatabases: ["NCBI Repbase", "L1Base (Retrotransposon Database)", "PubMed Articles"],
    variables: {
      independent: ["Somatic Oxidative Stress Level", "LINE-1 Promoter Methylation Level", "Reverse Transcriptase Inhibitor Concentration"],
      dependent: ["Somatic LINE-1 Insertion Frequency", "Neural Differentiation Rate", "Genomic Instability Index"]
    }
  },
  {
    id: "topic-11",
    title: "Chloroplast Gene (rbcL) Botanical Phylogeny",
    category: "Environmental",
    difficulty: "Beginner",
    status: "Active",
    shortDesc: "Analyzing ribulose-1,5-bisphosphate carboxylase large subunit (rbcL) alignments to establish taxonomic tree networks.",
    detailedBackground: "The rbcL gene, located in the chloroplast genome of plants, encodes the large subunit of RuBisCO. Because chloroplasts are maternally inherited and rbcL has a highly conserved sequence with moderate mutation rates, it serves as the primary molecular barcode for classifying plant species and reconstructing evolutionary history.",
    researchQuestion: "What is the phylogenetic resolution of rbcL gene alignments when separating closely related angiosperm genera?",
    suggestedDatabases: ["NCBI Nucleotide (rbcL)", "Angiosperm Phylogeny Website", "UniProt Rubisco Database"],
    variables: {
      independent: ["rbcL Aligned Sequence Length (bp)", "Taxonomic Group Depth (Family vs. Genus)", "Sequence Alignment Algorithm (ClustalW vs. MUSCLE)"],
      dependent: ["Taxonomic Clade Bootstrap Value", "Sequence Alignment Score", "Phylogenetic Tree Topology Stability"]
    }
  },
  {
    id: "topic-12",
    title: "Mitochondrial Haplogroup Clustering",
    category: "Evolutionary",
    difficulty: "Beginner",
    status: "Active",
    shortDesc: "Tracing matrilineal ancestry and human migration vectors via single nucleotide variations in mitochondrial DNA.",
    detailedBackground: "Mitochondrial DNA (mtDNA) is inherited strictly from the mother and has a high mutation rate compared to nuclear DNA. By classifying variations in the hypervariable regions (HVR1 and HVR2), population geneticists group humans into distinct haplogroups, mapping ancient migration out of Africa.",
    researchQuestion: "How do mutations in the mtDNA control region hypervariable loop define human haplogroup boundaries?",
    suggestedDatabases: ["NCBI PopSet", "Phylotree mtDNA Tree", "Mitomap Database"],
    variables: {
      independent: ["mtDNA HVR1 Mutation Count", "Population Sample Geographic Coordinates", "Ancestral Generation Distance"],
      dependent: ["Haplogroup Clustering Confidence", "Nucleotide Diversity Index", "Maternal Coalescence Age (Years)"]
    }
  },
  {
    id: "topic-13",
    title: "Endogenous Retroviruses in Disease",
    category: "Clinical",
    difficulty: "Expert",
    status: "Emerging",
    shortDesc: "Quantifying transcriptional activation of ancient retroviral sequence remnants in autoimmune disease pathogenesis.",
    detailedBackground: "Nearly 8% of the human genome is composed of Endogenous Retroviruses (HERVs) - remnants of ancient retroviral infections integrated into our ancestors' germlines millions of years ago. While mostly silenced, some HERV envelopes are transcribed during environmental stress, potentially triggering autoimmune inflammatory cascades.",
    researchQuestion: "Does viral infection with Epstein-Barr Virus (EBV) transactivate silent HERV-W loci in glial cells?",
    suggestedDatabases: ["NCBI RefSeq Retroelements", "Ensembl Human Genome", "PubMed Reference Registry"],
    variables: {
      independent: ["Epstein-Barr Virus Load", "HERV-W Promoter Demethylation Index", "Interferon-Beta Therapy Dose"],
      dependent: ["HERV-W Envelope Protein Expression Rate", "Inflammatory Cytokine (IL-6) Concentration", "Demyelination Rate (In Vitro)"]
    }
  },
  {
    id: "topic-14",
    title: "Proteomics Mass Spectrometry Deconvolution",
    category: "Computational",
    difficulty: "Expert",
    status: "Active",
    shortDesc: "Developing algorithms to match raw mass-to-charge peptide ratios against amino acid peptide standards.",
    detailedBackground: "While genomics measures transcripts, proteins perform cellular tasks. In liquid chromatography tandem mass spectrometry (LC-MS/MS), proteins are digested into peptides, ionized, and filtered by mass-to-charge ratios (m/z). Deconvolution algorithms match these spectra against reference databases to reconstruct the cell's active proteome.",
    researchQuestion: "Which peak-intensity deconvolution algorithm minimizes false peptide identification rates in complex tumor lysates?",
    suggestedDatabases: ["PRIDE Proteomics Identification Database", "UniProt Protein Database", "PeptideAtlas Reference Standards"],
    variables: {
      independent: ["Mass Spectrometry Scan Resolving Power", "Peptide False Discovery Rate (FDR) Threshold", "Deconvolution Algorithm Type"],
      dependent: ["Identified Unique Peptide Count", "Spectrum-to-Peptide Match Score (Sequest)", "Quantitative Proteome Coverage (%)"]
    }
  },
  {
    id: "topic-15",
    title: "Targeted Base Editing Technology",
    category: "Therapeutics",
    difficulty: "Expert",
    status: "Trending",
    shortDesc: "Engineering cytidine or adenine deaminases fused to dCas9 to achieve high-fidelity transitions without DNA cleavage.",
    detailedBackground: "Standard CRISPR-Cas9 cuts both DNA strands, which can lead to insertions or deletions (indels) through error-prone repair pathways. Base Editors solve this by fusing a catalytically inactive Cas9 (dCas9) with a deaminase enzyme. This allows the direct chemical conversion of single base pairs (C to T or A to G) without cutting the DNA backbone.",
    researchQuestion: "How does the linker amino acid chain length impact the genomic editing window of Cytidine Base Editors?",
    suggestedDatabases: ["NCBI ClinVar", "PDB Structural Records", "PubMed BioEngineering Library"],
    variables: {
      independent: ["Base Editor Linker Amino Acid Length", "Target Cytosine Position from PAM", "Target Locus Chromatin Openness"],
      dependent: ["Single-Base Edit Conversion Rate (%)", "Indel Formation Frequency (%)", "Off-Target Deamination Rate"]
    }
  },
  {
    id: "topic-16",
    title: "mRNA Vaccine Stability Optimization",
    category: "Therapeutics",
    difficulty: "Intermediate",
    status: "Trending",
    shortDesc: "Substituting synonymous codons to enhance mRNA secondary structure, half-life, and translational output.",
    detailedBackground: "Synthetic mRNA molecules are highly unstable in the cytoplasm and can trigger unwanted innate immune responses. By leveraging codon redundancy, researchers substitute synonymous codons to increase the mRNA's secondary structure stability (such as G-C double-stranded locks) and enhance translational speed, leading to safer, more effective vaccines.",
    researchQuestion: "Does replacing A/U-rich codons with synonymous G/C-rich codons extend the cellular half-life of synthetic spike mRNA transcripts?",
    suggestedDatabases: ["NCBI Nucleotide", "UniProt Protein Sequences", "RefSeq Transcripts"],
    variables: {
      independent: ["mRNA Transcript G-C Content Percentage", "Pseudouridine Substitution Ratio", "Poly(A) Tail Length (bp)"],
      dependent: ["mRNA Transcript Half-Life (Hours)", "Antigen Translation Yield (ng/mL)", "T-Cell Activation Coefficient"]
    }
  },
  {
    id: "topic-17",
    title: "Fluorescent Protein Mutational Tuning",
    category: "Environmental",
    difficulty: "Beginner",
    status: "Active",
    shortDesc: "Altering key amino acids in GFP to design blue, yellow, and cyan variants for multi-target imaging.",
    detailedBackground: "The wild-type Green Fluorescent Protein (GFP) from the jellyfish Aequorea victoria has a natural green emission. By introducing specific missense mutations in the central chromophore region (such as S65T, Y66H, or T203Y), protein engineers alter the molecular orbital gaps, tuning the protein to emit blue (BFP), cyan (CFP), or yellow (YFP) light.",
    researchQuestion: "How does the substitution of tyrosine at residue 66 with histidine shift the fluorescence excitation wavelength of GFP?",
    suggestedDatabases: ["Protein Data Bank (PDB)", "UniProt GFP Entry", "NCBI Structure"],
    variables: {
      independent: ["Amino Acid Mutation at Residue 66", "Assay pH Level", "Excitation Laser Intensity"],
      dependent: ["Fluorescence Emission Peak (nm)", "Protein Quantum Yield", "Thermal Denaturation Point (°C)"]
    }
  },
  {
    id: "topic-18",
    title: "T-Cell Receptor Repertoire Sequencing",
    category: "Clinical",
    difficulty: "Expert",
    status: "Emerging",
    shortDesc: "Profiling V(D)J recombination sequence diversity in cancer patients to evaluate tumor response to immunotherapy.",
    detailedBackground: "Our adaptive immune system recognizes pathogen and tumor antigens using highly diverse T-Cell Receptors (TCRs). This diversity is generated through V(D)J genomic recombination. High-throughput sequencing of the TCR beta chain allows clinicians to track clonal expansion, measuring how the immune system responds to checkpoint inhibitors.",
    researchQuestion: "Can TCR clonal expansion velocity predict early patient response to anti-PD-1 checkpoint immunotherapy?",
    suggestedDatabases: ["NCBI SRA Immunogenomics", "IMGT/LIGM-DB Adaptive Immunity", "PubMed Oncology Papers"],
    variables: {
      independent: ["Anti-PD-1 Immunotherapy Cycles", "Baseline Tumor Mutational Burden", "TCR Clone CDR3 Sequence Diversity Index"],
      dependent: ["Clonal Expansion Rate (TCR Clones/Week)", "Circulating Tumor DNA (ctDNA) Count", "Patient Progression-Free Survival (Months)"]
    }
  },
  {
    id: "topic-19",
    title: "CRISPR-Cas Spacer Acquisition Dynamics",
    category: "Environmental",
    difficulty: "Intermediate",
    status: "Active",
    shortDesc: "Analyzing how host bacteria extract and integrate phage-derived proto-spacers into active CRISPR arrays.",
    detailedBackground: "The CRISPR-Cas system serves as an adaptive immune system for prokaryotes. Upon phage infection, Cas1-Cas2 protein complexes capture short fragments of foreign viral DNA (proto-spacers) and integrate them as 'spacers' into the bacterial CRISPR array. This creates a permanent genetic memory that guides future defense sweeps.",
    researchQuestion: "Does the mutation of the Cas1 integration domain prevent spacer insertion at the leader-proximal locus?",
    suggestedDatabases: ["CRISPRCasdb (CRISPR Repository)", "NCBI GenBank Microbes", "RefSeq Phage Genomes"],
    variables: {
      independent: ["Cas1 Integration Domain Mutation State", "Phage DNA Titer (PFU/mL)", "CRISPR Leader Sequence Length (bp)"],
      dependent: ["Spacer Acquisition Efficiency (%)", "Phage Survival Rate (Lysis Cleavage)", "CRISPR Array Transcription Level"]
    }
  },
  {
    id: "topic-20",
    title: "Small RNA Silencing Pathways",
    category: "Therapeutics",
    difficulty: "Intermediate",
    status: "Active",
    shortDesc: "Mapping microRNA-mRNA complementary binding interactions that downregulate oncogenic proteins.",
    detailedBackground: "MicroRNAs (miRNAs) are short, non-coding RNA molecules (21-25 nt) that regulate gene expression. Fused to the RNA-induced silencing complex (RISC), they bind to complementary sequences on target mRNAs, leading to mRNA degradation or translational repression. Restoring tumor-suppressing miRNAs is an active area of genetic therapeutics.",
    researchQuestion: "How does the complementarity rate in the microRNA seed region (bases 2-8) influence target gene silencing efficiency?",
    suggestedDatabases: ["miRBase (microRNA Database)", "TargetScan Prediction Portal", "NCBI GEO Expression"],
    variables: {
      independent: ["miRNA Seed Region Match Rate (mismatch count)", "Target mRNA 3'-UTR Secondary Fold Energy", "RISC Complex Concentration"],
      dependent: ["Target Protein Translation Yield", "Target mRNA Degradation Rate", "Reporter Assay Luciferase Activity"]
    }
  },
  {
    id: "topic-21",
    title: "Telomere Length Attrition in Senescence",
    category: "Clinical",
    difficulty: "Beginner",
    status: "Active",
    shortDesc: "Tracking hexanucleotide repeat (TTAGGG) counts in blood cells to calculate cellular aging and disease vulnerability.",
    detailedBackground: "Telomeres are protective nucleoprotein caps at the ends of linear eukaryotic chromosomes, composed of TTAGGG tandem repeats. Due to the end-replication problem, telomeres shorten with every cell division. When telomeres reach a critically short length, they trigger a DNA damage response, forcing the cell into senescence.",
    researchQuestion: "What is the relationship between persistent environmental stress and the rate of somatic telomere length attrition?",
    suggestedDatabases: ["NCBI SRA Telomere Profiling", "Telomerase Reference Standards", "PubMed Medicine Journals"],
    variables: {
      independent: ["Cortisol Concentration (ug/dL)", "Cell Division Cycle Number", "Telomerase (TERT) Expression Rate"],
      dependent: ["Mean Telomere Repeat Length (kb)", "DNA Damage Response (p53 Activation) Level", "Somatic Cell Lifespan (Population Doublings)"]
    }
  },
  {
    id: "topic-22",
    title: "De Novo Genome Assembly Algorithms",
    category: "Computational",
    difficulty: "Expert",
    status: "Emerging",
    shortDesc: "Utilizing overlapping k-mer algorithms to reconstruct novel bacterial genomes from short sequencer reads.",
    detailedBackground: "When a new species is sequenced, researchers lack a reference genome for alignment. De novo assembly algorithms solve this by breaking short, overlapping sequencing reads into sub-strings of length k (k-mers). These k-mers are mapped as nodes in a directed De Bruijn graph, where overlapping edges are traversed to reconstruct the original continuous chromosomes.",
    researchQuestion: "How does altering the k-mer length (k) affect the connectivity and resolution of De Bruijn genome assembly graphs?",
    suggestedDatabases: ["NCBI Genome SRA", "Assembly Standards Registry", "GitHub Bioinformatics Codebases"],
    variables: {
      independent: ["k-mer Length Parameter (k)", "Sequencing Depth Coverage (e.g., 30x vs 100x)", "Sequencing Base Error Rate"],
      dependent: ["Assembly Contig N50 Score", "De Bruijn Graph Branch Node Density", "Unassembled Sequence Gaps Count"]
    }
  }
];

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

  // Research Topics Database States
  const [topicSearch, setTopicSearch] = useState('');
  const [topicCategory, setTopicCategory] = useState<'All' | 'Therapeutics' | 'Clinical' | 'Environmental' | 'Evolutionary' | 'Computational'>('All');
  const [selectedTopic, setSelectedTopic] = useState<ResearchTopic | null>(null);
  const [hypothesisInd, setHypothesisInd] = useState('');
  const [hypothesisDep, setHypothesisDep] = useState('');
  const [hypothesisRationale, setHypothesisRationale] = useState('');
  const [hypothesisLog, setHypothesisLog] = useState<string[]>([]);
  const [hypothesisSuccess, setHypothesisSuccess] = useState<string | null>(null);

  // Expanded Multi-Page & Experiment System States
  const [topicModalTab, setTopicModalTab] = useState<'literature' | 'protocol' | 'experiment'>('literature');
  const [expIndValue, setExpIndValue] = useState<number>(50);
  const [expCoFactor, setExpCoFactor] = useState<number>(37);
  const [expRunning, setExpRunning] = useState<boolean>(false);
  const [expProgress, setExpProgress] = useState<number>(0);
  const [expConsole, setExpConsole] = useState<string[]>([]);
  const [expResults, setExpResults] = useState<SimOutput[] | null>(null);
  const [expSaveSuccess, setExpSaveSuccess] = useState<boolean>(false);

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

  // Research Topics Helper Computations
  const filteredTopics = RESEARCH_TOPICS.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(topicSearch.toLowerCase()) ||
                          topic.shortDesc.toLowerCase().includes(topicSearch.toLowerCase()) ||
                          topic.detailedBackground.toLowerCase().includes(topicSearch.toLowerCase());
    const matchesCategory = topicCategory === 'All' || topic.category === topicCategory;
    return matchesSearch && matchesCategory;
  });

  const handleValidateHypothesis = () => {
    if (!selectedTopic) return;
    if (!hypothesisInd || !hypothesisDep) {
      setHypothesisSuccess("Error: Please select both independent and dependent variables.");
      return;
    }
    if (hypothesisRationale.trim().length < 15) {
      setHypothesisSuccess("Error: Please provide a detailed scientific rationale (minimum 15 characters).");
      return;
    }

    if (!hypothesisLog.includes(selectedTopic.id)) {
      setHypothesisLog(prev => [...prev, selectedTopic.id]);
    }
    setHypothesisSuccess("Success: Your hypothesis has been validated and logged to your research profile! (+15 XP virtual credit)");
  };

  const handleDownloadBrief = () => {
    if (!selectedTopic) return;
    const dateStr = new Date().toLocaleDateString();
    const content = `========================================================================
BIOBRIDGE ADVANCED GENOMICS RESEARCH LAB - ABSTRACT BRIEF
========================================================================
DATE: ${dateStr}
INVESTIGATOR: Student Researcher
RESEARCH FIELD: ${selectedTopic.category}
TOPIC: ${selectedTopic.title}
DIFFICULTY LEVEL: ${selectedTopic.difficulty}

PRIMARY RESEARCH QUESTION:
"${selectedTopic.researchQuestion}"

FORMULATED SCIENTIFIC HYPOTHESIS:
"If we manipulate [${hypothesisInd || 'UNSPECIFIED INDEPENDENT VARIABLE'}], 
then we will observe a measurable alteration in [${hypothesisDep || 'UNSPECIFIED DEPENDENT VARIABLE'}]."

SCIENTIFIC RATIONALE:
${hypothesisRationale.trim() || 'No biochemical or genomic rationale was provided in this draft.'}

ACADEMIC RESEARCH BACKGROUND:
${selectedTopic.detailedBackground}

RECOMMENDED SEARCH METADATA (NCBI REGISTRIES):
${selectedTopic.suggestedDatabases.map(db => `  - ${db}`).join('\\n')}

========================================================================
END OF ABSTRACT BRIEF
========================================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `BioBridge_Research_${selectedTopic.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectTopic = (topic: ResearchTopic) => {
    setSelectedTopic(topic);
    setHypothesisInd(topic.variables.independent[0] || '');
    setHypothesisDep(topic.variables.dependent[0] || '');
    setHypothesisRationale('');
    setHypothesisSuccess(null);
    setTopicModalTab('literature');
    setExpIndValue(50);
    setExpCoFactor(37);
    setExpProgress(0);
    setExpRunning(false);
    setExpResults(null);
    setExpConsole([]);
    setExpSaveSuccess(false);
  };

  const handleRunVirtualExperiment = () => {
    if (!selectedTopic) return;
    setExpRunning(true);
    setExpProgress(0);
    setExpResults(null);
    setExpSaveSuccess(false);
    
    const indVar = hypothesisInd || selectedTopic.variables.independent[0];
    const depVar = hypothesisDep || selectedTopic.variables.dependent[0];

    const logs: string[] = [
      `[SYS-INIT]: Powering genomic hybridization sensors and thermocycling arrays...`,
      `[SYS-READY]: Reagents loaded. Ready to run virtual trial for: "${selectedTopic.title}".`
    ];
    setExpConsole(logs);

    let progressLocal = 0;
    const interval = setInterval(() => {
      progressLocal += 4;
      if (progressLocal > 100) progressLocal = 100;
      setExpProgress(progressLocal);

      if (progressLocal === 20) {
        setExpConsole(prev => [...prev, `[REAGENT-ASSAY]: Injecting independent variable: [${indVar}] set to level: ${expIndValue}%`]);
      } else if (progressLocal === 40) {
        setExpConsole(prev => [...prev, `[COFACTOR-ASSAY]: Regulating secondary reaction factor to baseline level: ${expCoFactor}%`]);
      } else if (progressLocal === 60) {
        setExpConsole(prev => [...prev, `[HYBRIDIZATION]: Thermal sequence pairing initiated... Analyzing primer binding kinetics.`]);
      } else if (progressLocal === 80) {
        setExpConsole(prev => [...prev, `[GENOMIC-SCAN]: Extracting diagnostic signal traces. Reading fluorescent output index...`]);
      } else if (progressLocal === 96) {
        setExpConsole(prev => [...prev, `[COMPILING]: Running predictive structural calculations for: [${depVar}]...`]);
      } else if (progressLocal >= 100) {
        clearInterval(interval);
        setExpRunning(false);
        const results = runVirtualSimulation(selectedTopic, indVar, expIndValue, expCoFactor);
        setExpResults(results);
        setExpConsole(prev => [...prev, `[SUCCESS]: Multi-variable assay completed. Quantified metrics resolved successfully. Saved in central RAM.`]);
      }
    }, 20);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="research-simulation-page">
      
      {/* ======================================================================
          LANDING SCREEN: RESEARCH PROJECTS HUB
          ====================================================================== */}
      {activeProjectId === null ? (
        <>
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

          {/* Advanced Genomics & Bioinformatics Research Topics Database */}
          <div className="space-y-6 pt-8 border-t border-slate-200" id="advanced-research-topics-section">
            <div className="space-y-1">
              <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Bioinformatics & Genomics Research Topics</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Explore over 20 advanced research topics across genomics, therapeutics, ecology, and computational algorithms. Select a topic to formulate a scientific hypothesis, examine variables, and download customized thesis briefs.
              </p>
            </div>

            {/* Filter and Search Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search input */}
              <div className="md:col-span-4 relative">
                <input
                  type="text"
                  placeholder="Search topics or keywords..."
                  value={topicSearch}
                  onChange={(e) => setTopicSearch(e.target.value)}
                  className="w-full bg-white text-slate-800 border border-slate-200 hover:border-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-bold pl-8 pr-3 py-2.5 focus:outline-none transition-all shadow-3xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
              </div>

              {/* Category buttons */}
              <div className="md:col-span-8 flex flex-wrap gap-1.5 items-center">
                {(['All', 'Therapeutics', 'Clinical', 'Environmental', 'Evolutionary', 'Computational'] as const).map((cat) => {
                  const count = cat === 'All' 
                    ? RESEARCH_TOPICS.length 
                    : RESEARCH_TOPICS.filter(t => t.category === cat).length;
                  const isSel = topicCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTopicCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                        isSel 
                          ? 'bg-teal-600 text-white border-teal-600 shadow-3xs' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSel ? 'bg-teal-700 text-teal-100' : 'bg-slate-100 text-slate-500'
                      }`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid of 22 Topics */}
            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="research-topics-grid">
                {filteredTopics.map((topic) => {
                  const isLogged = hypothesisLog.includes(topic.id);
                  return (
                    <div 
                      key={topic.id}
                      className={`p-5 rounded-xl border bg-white flex flex-col justify-between space-y-4 shadow-3xs hover:shadow-2xs transition-all duration-300 ${
                        isLogged ? 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/5' : 'border-slate-200 hover:border-teal-500'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                            topic.category === 'Therapeutics' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            topic.category === 'Clinical' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                            topic.category === 'Environmental' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            topic.category === 'Evolutionary' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                            'bg-sky-50 text-sky-700 border-sky-100'
                          }`}>
                            {topic.category}
                          </span>
                          
                          <div className="flex items-center gap-1">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                              topic.difficulty === 'Beginner' ? 'bg-teal-50 text-teal-800' :
                              topic.difficulty === 'Intermediate' ? 'bg-sky-50 text-sky-800' :
                              'bg-indigo-50 text-indigo-800'
                            }`}>
                              {topic.difficulty}
                            </span>
                            {isLogged && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 animate-fade-in shadow-4xs">
                                <Check className="w-3 h-3 stroke-[3]" /> Logged
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-sm font-extrabold text-slate-800 line-clamp-1 group-hover:text-teal-700 transition-colors">
                          {topic.title}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {topic.shortDesc}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectTopic(topic)}
                        className={`w-full py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                          isLogged 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100' 
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-teal-600 hover:text-white hover:border-teal-600'
                        }`}
                      >
                        <Compass className="w-3.5 h-3.5" />
                        Explore Research Brief
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-8 text-center space-y-2 text-xs text-slate-400 font-medium">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <p>No research topics found matching your query or filter parameters.</p>
                <button
                  type="button"
                  onClick={() => { setTopicSearch(''); setTopicCategory('All'); }}
                  className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-[10px] hover:bg-slate-50 font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
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

        {/* RESEARCH TOPIC DETAIL MODAL OVERLAY */}
        {selectedTopic && (() => {
          const lit = getTopicAcademicLiterature(selectedTopic);
          const prot = getTopicLaboratoryProtocol(selectedTopic);
          const isLogged = hypothesisLog.includes(selectedTopic.id);
          
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in" id="topic-detail-modal">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col focus:outline-none animate-scale-in" id="topic-detail-card">
                
                {/* Header Banner */}
                <div className={`p-5 border-b border-slate-100 flex flex-col relative shrink-0 ${
                  selectedTopic.category === 'Therapeutics' ? 'bg-purple-50/20' :
                  selectedTopic.category === 'Clinical' ? 'bg-rose-50/20' :
                  selectedTopic.category === 'Environmental' ? 'bg-emerald-50/20' :
                  selectedTopic.category === 'Evolutionary' ? 'bg-amber-50/20' :
                  'bg-sky-50/20'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 max-w-[85%]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                          selectedTopic.category === 'Therapeutics' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          selectedTopic.category === 'Clinical' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          selectedTopic.category === 'Environmental' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          selectedTopic.category === 'Evolutionary' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-sky-50 text-sky-700 border-sky-200'
                        }`}>
                          {selectedTopic.category} Field Study
                        </span>
                        <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                          {selectedTopic.difficulty} Level
                        </span>
                        {isLogged && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5 animate-fade-in shadow-3xs">
                            <Check className="w-3 h-3 stroke-[3]" /> Hypothesis Logged
                          </span>
                        )}
                        {expResults && (
                          <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5 animate-fade-in shadow-3xs">
                            <Activity className="w-3 h-3" /> Assay Simulated
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black text-slate-900 leading-snug pt-1">
                        {selectedTopic.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedTopic(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-150 rounded-full cursor-pointer transition-all shrink-0"
                      aria-label="Close"
                    >
                      <span className="text-xl font-bold font-mono">×</span>
                    </button>
                  </div>

                  {/* TABS SELECTOR PANEL */}
                  <div className="flex border-b border-slate-200 mt-4 gap-1">
                    <button
                      type="button"
                      onClick={() => setTopicModalTab('literature')}
                      className={`px-4 py-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                        topicModalTab === 'literature' 
                          ? 'border-teal-600 text-teal-700 font-extrabold bg-slate-50/50' 
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      1. Literature Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setTopicModalTab('protocol')}
                      className={`px-4 py-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                        topicModalTab === 'protocol' 
                          ? 'border-teal-600 text-teal-700 font-extrabold bg-slate-50/50' 
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      2. Protocols & Methodology
                    </button>
                    <button
                      type="button"
                      onClick={() => setTopicModalTab('experiment')}
                      className={`px-4 py-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                        topicModalTab === 'experiment' 
                          ? 'border-teal-600 text-teal-700 font-extrabold bg-slate-50/50' 
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                      3. Interactive Experiment
                    </button>
                  </div>
                </div>

                {/* Content Container (Scrollable) */}
                <div className="p-6 space-y-6 text-xs text-slate-600 leading-relaxed overflow-y-auto flex-1">
                  
                  {/* ==========================================================
                      TAB 1: LITERATURE REVIEW & DETAILED ACADEMIC PAPER
                      ========================================================== */}
                  {topicModalTab === 'literature' && (
                    <div className="space-y-6 animate-fade-in">
                      
                      {/* Literature Section 1 */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Academic Intro & Hypothesis Space</span>
                        <div className="p-4 bg-slate-50 border-l-4 border-teal-500 rounded-r-xl font-medium leading-relaxed text-slate-700 shadow-3xs text-[11.5px]">
                          {lit.intro}
                        </div>
                      </div>

                      {/* Literature Section 2 */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Biochemical Cascade & Signaling Pathway</span>
                        <div className="p-4 bg-white border border-slate-200 rounded-xl leading-relaxed text-slate-600 shadow-3xs space-y-2">
                          <p className="font-medium text-[11px] text-slate-700">
                            {lit.biochemicalPathway}
                          </p>
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-teal-700 font-bold">
                            <Dna className="w-4 h-4 shrink-0" />
                            <span>System configuration verified using 3D structural models from PDB data files.</span>
                          </div>
                        </div>
                      </div>

                      {/* Literature Section 3 */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Clinical & Translational Relevance</span>
                        <p className="p-4 bg-teal-50/10 border border-teal-100 text-slate-700 rounded-xl font-medium leading-relaxed text-[11px]">
                          {lit.clinicalRelevance}
                        </p>
                      </div>

                      {/* Literature Section 4: Key Vocabulary Glossary */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Key Academic Terminology</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {lit.vocab.map((v, i) => (
                            <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                              <h5 className="font-extrabold text-slate-800 text-[11px] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                {v.term}
                              </h5>
                              <p className="text-[10.5px] text-slate-500 leading-normal font-medium">
                                {v.def}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Registries */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Primary NCBI & Reference Registries</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedTopic.suggestedDatabases.map((db, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 font-mono font-bold px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1 text-[10px]">
                              <Database className="w-3.5 h-3.5 text-slate-500" /> {db}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ==========================================================
                      TAB 2: LABORATORY METHODOLOGY & PROTOCOLS
                      ========================================================== */}
                  {topicModalTab === 'protocol' && (
                    <div className="space-y-6 animate-fade-in">
                      
                      {/* BSL Banner */}
                      <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <h4 className="font-extrabold text-xs">Required Safety Standard: {prot.bsl}</h4>
                          <p className="text-[10.5px] text-amber-700 font-medium">
                            All research actions must be conducted under full laboratory containment, utilizing autoclaves, biological hoods, and standard aseptic isolation procedures.
                          </p>
                        </div>
                      </div>

                      {/* Reagents list */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Required Chemical Reagents & Molecular Buffers</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {prot.reagentList.map((r, i) => (
                            <div key={i} className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg flex items-center gap-2 text-slate-700 font-medium">
                              <FlaskConical className="w-4 h-4 text-teal-600 shrink-0" />
                              <span className="text-[10.5px]">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Methodology Workflow Steps */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Experimental Assay Timeline & Execution</span>
                        <div className="space-y-2.5 border-l-2 border-slate-100 pl-4 ml-2">
                          {prot.steps.map((s, i) => (
                            <div key={i} className="relative space-y-1">
                              <span className="absolute -left-7.5 top-0 w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center font-mono font-bold text-[9px] border-2 border-white">
                                {i + 1}
                              </span>
                              <h5 className="font-extrabold text-slate-800 text-[11px] pt-0.5">
                                Step {i + 1}: Assay Phase
                              </h5>
                              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                {s}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quality Controls */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Biological Calibration & Quality Controls</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3 bg-emerald-50/30 border border-emerald-100 rounded-xl space-y-1">
                            <h6 className="font-extrabold text-[10.5px] text-emerald-800 uppercase tracking-wider">Positive Control</h6>
                            <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{prot.controls.pos}</p>
                          </div>
                          <div className="p-3 bg-rose-50/30 border border-rose-100 rounded-xl space-y-1">
                            <h6 className="font-extrabold text-[10.5px] text-rose-800 uppercase tracking-wider">Negative Control</h6>
                            <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{prot.controls.neg}</p>
                          </div>
                          <div className="p-3 bg-teal-50/30 border border-teal-100 rounded-xl space-y-1">
                            <h6 className="font-extrabold text-[10.5px] text-teal-800 uppercase tracking-wider">Verification Assay</h6>
                            <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{prot.controls.method}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ==========================================================
                      TAB 3: INTERACTIVE LAB SIMULATION ENGINE
                      ========================================================== */}
                  {topicModalTab === 'experiment' && (
                    <div className="space-y-6 animate-fade-in">
                      
                      {/* Step A: Hypothesis Builder */}
                      <div className="p-5 border border-teal-150 bg-teal-50/10 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                            <Sparkles className="w-4 h-4 text-teal-600 animate-spin" style={{ animationDuration: '6s' }} />
                            A. Formulate Scientific Hypothesis
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-normal font-medium">
                            Set your experimental variables and outline your rationale to authorize lab instrument calibration.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Independent Variable (Manipulated):</label>
                            <select
                              value={hypothesisInd}
                              onChange={(e) => setHypothesisInd(e.target.value)}
                              className="w-full bg-white text-slate-800 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-bold px-3 py-2 focus:outline-none shadow-3xs"
                            >
                              {selectedTopic.variables.independent.map((v, i) => (
                                <option key={i} value={v}>{v}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Dependent Variable (Observed):</label>
                            <select
                              value={hypothesisDep}
                              onChange={(e) => setHypothesisDep(e.target.value)}
                              className="w-full bg-white text-slate-800 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-bold px-3 py-2 focus:outline-none shadow-3xs"
                            >
                              {selectedTopic.variables.dependent.map((v, i) => (
                                <option key={i} value={v}>{v}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Scientific Justification & Rationale:</label>
                          <textarea
                            rows={2}
                            value={hypothesisRationale}
                            onChange={(e) => setHypothesisRationale(e.target.value)}
                            placeholder="State the molecular or mechanical reaction backing your hypothesis (minimum 15 characters)..."
                            className="w-full bg-white text-slate-800 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-medium p-3 focus:outline-none shadow-3xs leading-relaxed"
                          />
                        </div>

                        {hypothesisSuccess && (
                          <div className={`p-3 rounded-xl text-xs font-bold flex items-start gap-2 ${
                            hypothesisSuccess.startsWith('Error') 
                              ? 'bg-rose-50 border border-rose-150 text-rose-800' 
                              : 'bg-emerald-50 border border-emerald-150 text-emerald-800'
                          }`}>
                            {hypothesisSuccess.startsWith('Error') ? (
                              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                            <div className="text-[10.5px]">{hypothesisSuccess}</div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleValidateHypothesis}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[11px] rounded-lg cursor-pointer transition-all shadow-3xs flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            Validate & Log Hypothesis
                          </button>
                          
                          <button
                            type="button"
                            onClick={handleDownloadBrief}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-[11px] rounded-lg cursor-pointer transition-all flex items-center gap-1"
                          >
                            <FileText className="w-4 h-4" />
                            Export Text Brief
                          </button>
                        </div>
                      </div>

                      {/* Step B: Lab Instrument Calibration & Execution */}
                      <div className="p-5 border border-slate-200 bg-slate-50 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                            <Sliders className="w-4 h-4 text-slate-600" />
                            B. Virtual Calibration Controls
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-normal font-medium">
                            Set physical factors to observe the quantitative effects in-silico.
                          </p>
                        </div>

                        {!isLogged ? (
                          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-800 font-bold text-[11px] space-y-1">
                            <ShieldAlert className="w-6 h-6 text-amber-600 mx-auto" />
                            <p>Hypothesis Authorization Required</p>
                            <p className="text-[10px] text-amber-600 font-medium">Please construct, validate, and log your hypothesis first to unlock the clinical simulator controls.</p>
                          </div>
                        ) : (
                          <div className="space-y-5">
                            
                            {/* Sliders Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              {/* Independent factor level slider */}
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                                    Independent Concentration:
                                  </label>
                                  <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                                    {expIndValue}%
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min="5"
                                  max="100"
                                  value={expIndValue}
                                  onChange={(e) => setExpIndValue(parseInt(e.target.value))}
                                  disabled={expRunning}
                                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 disabled:opacity-50"
                                />
                                <span className="text-[10px] text-slate-400 block font-medium leading-snug">
                                  Calibrates the chemical dosage or mutation length introduced into the assay.
                                </span>
                              </div>

                              {/* Secondary Co-factor Level Slider */}
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                                    Reaction Temperature / Co-factor:
                                  </label>
                                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                    {expCoFactor}°C / Level
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min="10"
                                  max="75"
                                  value={expCoFactor}
                                  disabled={expRunning}
                                  onChange={(e) => setExpCoFactor(parseInt(e.target.value))}
                                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600 disabled:opacity-50"
                                />
                                <span className="text-[10px] text-slate-400 block font-medium leading-snug">
                                  Regulates background heat stability or supplementary enzyme buffer levels.
                                </span>
                              </div>
                            </div>

                            {/* Run Assay Button */}
                            <button
                              type="button"
                              onClick={handleRunVirtualExperiment}
                              disabled={expRunning}
                              className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                                expRunning 
                                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                                  : 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-lg'
                              }`}
                            >
                              <FlaskConical className="w-4 h-4 text-teal-200 animate-pulse" />
                              {expRunning ? 'Running Virtual Assay Trial...' : 'Run Simulated Lab Trial'}
                            </button>

                            {/* Console output display during run */}
                            {expRunning && (
                              <div className="space-y-2 animate-fade-in">
                                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono font-bold">
                                  <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5 text-emerald-600" /> VIRTUAL CONSOLE STATUS</span>
                                  <span>{expProgress}%</span>
                                </div>
                                
                                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-teal-600 h-full transition-all duration-100" style={{ width: `${expProgress}%` }}></div>
                                </div>

                                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-emerald-400 text-[10px] h-28 overflow-y-auto space-y-1.5 select-all leading-normal">
                                  {expConsole.map((line, idx) => (
                                    <div key={idx} className="flex gap-1.5">
                                      <span className="text-slate-500">❯</span>
                                      <span>{line}</span>
                                    </div>
                                  ))}
                                  <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-pulse ml-0.5"></span>
                                </div>
                              </div>
                            )}

                            {/* Simulation complete - results display */}
                            {expResults && !expRunning && (
                              <div className="space-y-4 animate-scale-in">
                                <div className="border-t border-slate-200 pt-4">
                                  <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Activity className="w-4 h-4 text-emerald-600" />
                                    Quantified Dependent Variable Signals
                                  </h5>
                                  
                                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                    <table className="w-full text-left text-[11px]">
                                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                                        <tr>
                                          <th className="px-4 py-2">Observed Variable</th>
                                          <th className="px-4 py-2">Quantified Value</th>
                                          <th className="px-4 py-2">Clinical Quality status</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-100 font-medium">
                                        {expResults.map((out, idx) => (
                                          <tr key={idx} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-2.5 text-slate-800 font-bold">{out.name}</td>
                                            <td className="px-4 py-2.5 font-mono text-teal-700 font-extrabold bg-teal-50/20">{out.value} {out.unit}</td>
                                            <td className="px-4 py-2.5">
                                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                                out.evaluation.includes('Safe') || out.evaluation.includes('Optimal') || out.evaluation.includes('Stable') || out.evaluation.includes('Healthy') || out.evaluation.includes('Protected') || out.evaluation.includes('Success')
                                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                  : 'bg-rose-50 text-rose-700 border border-rose-100'
                                              }`}>
                                                {out.evaluation}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* Save report status feedback */}
                                {expSaveSuccess ? (
                                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 font-bold text-xs space-y-1 animate-scale-in">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                                    <p>Assay Report Successfully Published!</p>
                                    <p className="text-[10px] text-emerald-600 font-medium leading-relaxed">
                                      The study has been synchronized to your Central Portfolio. Open your Dashboard view to verify your unlocked badges and XP progression!
                                    </p>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const customReport: SavedReport = {
                                        id: `report-${Date.now()}`,
                                        experimentName: selectedTopic.title,
                                        timestamp: new Date().toLocaleDateString(),
                                        researchQuestion: selectedTopic.researchQuestion,
                                        method: `Manipulated factor [${hypothesisInd}] to calibration ${expIndValue}%. Secondary reaction control adjusted to ${expCoFactor} units. Scientific Rationale: "${hypothesisRationale}"`,
                                        observation: `In-silico simulation results: ${expResults.map(o => `${o.name} measured ${o.value} ${o.unit} (${o.evaluation})`).join(', ')}.`,
                                        conclusion: `The simulated assay was executed successfully inside the BioBridge testing framework. Our findings support the formulated thesis: modifying ${hypothesisInd} drives a corresponding non-linear shift in target somatic and chemical pathways.`,
                                        resultSummary: `Assay completed under ${prot.bsl} guidelines. Metrics compiled with high statistical confidence.`
                                      };
                                      handleSaveSimulationReport(selectedTopic.id, customReport);
                                      setExpSaveSuccess(true);
                                    }}
                                    className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-[11px] rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md"
                                  >
                                    <Award className="w-4 h-4 text-amber-400" />
                                    Publish Results & Save Study Report to Portfolio (+150 XP)
                                  </button>
                                )}

                              </div>
                            )}

                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between gap-3 shrink-0 rounded-b-2xl">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium font-mono">
                    <Microscope className="w-3.5 h-3.5 text-teal-600" />
                    <span>BioBridge Laboratory Engine v2.4</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedTopic(null)}
                    className="px-5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold cursor-pointer shadow-3xs transition-all"
                  >
                    Close Brief
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
        </>
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
