import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, AlertCircle, RefreshCw, Activity, Copy, 
  CheckCircle2, HelpCircle, Download, BookOpen, Search, 
  GitCompare, Layers, Info, Sparkles, FileText, Check, ArrowRight,
  ClipboardList, X, History, Database, Dna, Bookmark
} from 'lucide-react';
import { SavedReport, UserProgress } from '../types';
import SequenceVisualizer from './SequenceVisualizer';

// ============================================================================
// CODON MAP & REFERENCE DATA
// ============================================================================
const CODON_TABLE: Record<string, { name: string; symbol: string; abbrev: string }> = {
  'TTT': { name: 'Phenylalanine', symbol: 'F', abbrev: 'Phe' },
  'TTC': { name: 'Phenylalanine', symbol: 'F', abbrev: 'Phe' },
  'TTA': { name: 'Leucine', symbol: 'L', abbrev: 'Leu' },
  'TTG': { name: 'Leucine', symbol: 'L', abbrev: 'Leu' },
  'CTT': { name: 'Leucine', symbol: 'L', abbrev: 'Leu' },
  'CTC': { name: 'Leucine', symbol: 'L', abbrev: 'Leu' },
  'CTA': { name: 'Leucine', symbol: 'L', abbrev: 'Leu' },
  'CTG': { name: 'Leucine', symbol: 'L', abbrev: 'Leu' },
  'ATT': { name: 'Isoleucine', symbol: 'I', abbrev: 'Ile' },
  'ATC': { name: 'Isoleucine', symbol: 'I', abbrev: 'Ile' },
  'ATA': { name: 'Isoleucine', symbol: 'I', abbrev: 'Ile' },
  'ATG': { name: 'Methionine (Start)', symbol: 'M', abbrev: 'Met (Start)' },
  'GTT': { name: 'Valine', symbol: 'V', abbrev: 'Val' },
  'GTC': { name: 'Valine', symbol: 'V', abbrev: 'Val' },
  'GTA': { name: 'Valine', symbol: 'V', abbrev: 'Val' },
  'GTG': { name: 'Valine', symbol: 'V', abbrev: 'Val' },
  'TCT': { name: 'Serine', symbol: 'S', abbrev: 'Ser' },
  'TCC': { name: 'Serine', symbol: 'S', abbrev: 'Ser' },
  'TCA': { name: 'Serine', symbol: 'S', abbrev: 'Ser' },
  'TCG': { name: 'Serine', symbol: 'S', abbrev: 'Ser' },
  'CCT': { name: 'Proline', symbol: 'P', abbrev: 'Pro' },
  'CCC': { name: 'Proline', symbol: 'P', abbrev: 'Pro' },
  'CCA': { name: 'Proline', symbol: 'P', abbrev: 'Pro' },
  'CCG': { name: 'Proline', symbol: 'P', abbrev: 'Pro' },
  'ACT': { name: 'Threonine', symbol: 'T', abbrev: 'Thr' },
  'ACC': { name: 'Threonine', symbol: 'T', abbrev: 'Thr' },
  'ACA': { name: 'Threonine', symbol: 'T', abbrev: 'Thr' },
  'ACG': { name: 'Threonine', symbol: 'T', abbrev: 'Thr' },
  'GCT': { name: 'Alanine', symbol: 'A', abbrev: 'Ala' },
  'GCC': { name: 'Alanine', symbol: 'A', abbrev: 'Ala' },
  'GCA': { name: 'Alanine', symbol: 'A', abbrev: 'Ala' },
  'GCG': { name: 'Alanine', symbol: 'A', abbrev: 'Ala' },
  'TAT': { name: 'Tyrosine', symbol: 'Y', abbrev: 'Tyr' },
  'TAC': { name: 'Tyrosine', symbol: 'Y', abbrev: 'Tyr' },
  'TAA': { name: 'Stop Codon', symbol: '*', abbrev: 'STOP' },
  'TAG': { name: 'Stop Codon', symbol: '*', abbrev: 'STOP' },
  'CAT': { name: 'Histidine', symbol: 'H', abbrev: 'His' },
  'CAC': { name: 'Histidine', symbol: 'H', abbrev: 'His' },
  'CAA': { name: 'Glutamine', symbol: 'Q', abbrev: 'Gln' },
  'CAG': { name: 'Glutamine', symbol: 'Q', abbrev: 'Gln' },
  'AAT': { name: 'Asparagine', symbol: 'N', abbrev: 'Asn' },
  'AAC': { name: 'Asparagine', symbol: 'N', abbrev: 'Asn' },
  'AAG': { name: 'Lysine', symbol: 'K', abbrev: 'Lys' },
  'AAA': { name: 'Lysine', symbol: 'K', abbrev: 'Lys' },
  'GAT': { name: 'Aspartic Acid', symbol: 'D', abbrev: 'Asp' },
  'GAC': { name: 'Aspartic Acid', symbol: 'D', abbrev: 'Asp' },
  'GAA': { name: 'Glutamic Acid', symbol: 'E', abbrev: 'Glu' },
  'GAG': { name: 'Glutamic Acid', symbol: 'E', abbrev: 'Glu' },
  'TGT': { name: 'Cysteine', symbol: 'C', abbrev: 'Cys' },
  'TGC': { name: 'Cysteine', symbol: 'C', abbrev: 'Cys' },
  'TGA': { name: 'Stop Codon', symbol: '*', abbrev: 'STOP' },
  'TGG': { name: 'Tryptophan', symbol: 'W', abbrev: 'Trp' },
  'CGT': { name: 'Arginine', symbol: 'R', abbrev: 'Arg' },
  'CGC': { name: 'Arginine', symbol: 'R', abbrev: 'Arg' },
  'CGA': { name: 'Arginine', symbol: 'R', abbrev: 'Arg' },
  'CGG': { name: 'Arginine', symbol: 'R', abbrev: 'Arg' },
  'AGT': { name: 'Serine', symbol: 'S', abbrev: 'Ser' },
  'AGC': { name: 'Serine', symbol: 'S', abbrev: 'Ser' },
  'AGA': { name: 'Arginine', symbol: 'R', abbrev: 'Arg' },
  'AGG': { name: 'Arginine', symbol: 'R', abbrev: 'Arg' },
  'GGT': { name: 'Glycine', symbol: 'G', abbrev: 'Gly' },
  'GGC': { name: 'Glycine', symbol: 'G', abbrev: 'Gly' },
  'GGA': { name: 'Glycine', symbol: 'G', abbrev: 'Gly' },
  'GGG': { name: 'Glycine', symbol: 'G', abbrev: 'Gly' }
};

interface ReferenceSample {
  id: string;
  category: 'Human' | 'Plant' | 'Bacterial';
  name: string;
  label: string;
  description: string;
  sequence: string;
  learningObjective: string;
}

const REFERENCE_LIBRARY: ReferenceSample[] = [
  {
    id: 'sample-human-ins',
    category: 'Human',
    name: 'Human Insulin Gene (Fragment)',
    label: 'INS Hormone Segment',
    description: 'Partial coding sequence of the human insulin (INS) gene on chromosome 11, critical for cellular glucose regulation.',
    sequence: 'AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG',
    learningObjective: 'Analyze nucleotide frequencies and trace how translation translates insulin codons into functional therapeutic proteins.'
  },
  {
    id: 'sample-plant-rbcl',
    category: 'Plant',
    name: 'Arabidopsis thaliana rbcL Gene (Fragment)',
    label: 'RuBisCO Photoenzyme Segment',
    description: 'Chloroplast gene sequence representing the large subunit of RuBisCO, the primary carbon-fixation enzyme on Earth.',
    sequence: 'ATGTCACCACAAACAGAGACTAAAGCAAGTGTTGGATTCAAAGCTGGTGTTAAAGAGTACAAATTGACTTATTATACTCCTGAATACGAAACCAAGGATACTGATATCTTGGCAGCATTCCGA',
    learningObjective: 'Examine GC-content distribution and study plant-specific codons responsible for light-harvesting enzymes.'
  },
  {
    id: 'sample-bact-rrd',
    category: 'Bacterial',
    name: 'Escherichia coli 16S rRNA Segment',
    label: 'Bacterial Classification Locus',
    description: 'A conserved genetic locus from the 16S ribosomal RNA subunit, universally used by bioinformaticians for microbial species identification.',
    sequence: 'AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGAACGGTAACAGGAAGAAGCTTGCTTCTTTGCTGACGAGTGGCGGACGGGTGAGTAATGTCTGGGAA',
    learningObjective: 'Analyze structural non-coding RNA sequence compositions where high GC density provides thermodynamic ribosomal stability.'
  }
];

interface DatasetPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  seq?: string;
  seqA?: string;
  seqB?: string;
  seqOriginal?: string;
  seqModified?: string;
}

const ANALYZER_PRESETS: DatasetPreset[] = [
  {
    id: 'analyzer-human-ins',
    name: 'Human Insulin Gene (Fragment)',
    category: 'Human',
    description: 'INS gene segment (GC-rich, highly stable, therapeutic hormone focus).',
    seq: 'AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG'
  },
  {
    id: 'analyzer-human-hbb',
    name: 'Human Hemoglobin Beta (HBB)',
    category: 'Human',
    description: 'HBB gene normal segment coding for oxygen-binding beta-globin protein.',
    seq: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGG'
  },
  {
    id: 'analyzer-bact-16s',
    name: 'E. coli 16S rRNA Segment',
    category: 'Bacterial',
    description: 'Conserved microbial ribosome identification segment with balanced nucleotide frequency.',
    seq: 'AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGAACGGTAACAGGAAGAAGCTTGCTTCTTTGCTGACGAGTGGCGGACGGGTGAGTAATGTCTGGGAA'
  },
  {
    id: 'analyzer-plant-rbcl',
    name: 'Arabidopsis thaliana rbcL Gene',
    category: 'Plant',
    description: 'Chloroplast gene of the RuBisCO carbon-fixation enzyme (AT-rich).',
    seq: 'ATGTCACCACAAACAGAGACTAAAGCAAGTGTTGGATTCAAAGCTGGTGTTAAAGAGTACAAATTGACTTATTATACTCCTGAATACGAAACCAAGGATACTGATATCTTGGCAGCATTCCGA'
  },
  {
    id: 'analyzer-viral-spike',
    name: 'SARS-CoV-2 Spike Glycoprotein RBD',
    category: 'Viral',
    description: 'Part of the S-gene encoding the receptor binding domain of the virus.',
    seq: 'ATGTTTGTTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCT'
  }
];

const COMPARATOR_PRESETS: DatasetPreset[] = [
  {
    id: 'comp-hbb-homology',
    name: 'Hemoglobin Beta: Human vs. Chimpanzee',
    category: 'Conserved Homology',
    description: 'Aligns the beta-globin gene between human and chimp, demonstrating 100% sequence identity in this conserved region.',
    seqA: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTG',
    seqB: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTG'
  },
  {
    id: 'comp-ins-human-pig',
    name: 'Insulin (INS): Human vs. Pig',
    category: 'Inter-species Divergence',
    description: 'Compares human and swine insulin gene segments, showing evolutionary variations despite identical biological function.',
    seqA: 'AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG',
    seqB: 'GCTCTCTACCTGGTGTGCGGGGAGCGTGGCTTCTTCTACACACCCAAGGCCCGTCGGGAGGCAGAGGACCTGCAGGTG'
  },
  {
    id: 'comp-bact-eco-sal',
    name: '16S rRNA: E. coli vs. Salmonella',
    category: 'Bacterial Identification',
    description: 'Compares standard ribosomal identifier sequences, highlighting minor single-nucleotide polymorphisms (SNPs).',
    seqA: 'AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGAAC',
    seqB: 'AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGACG'
  }
];

const MUTATION_PRESETS: DatasetPreset[] = [
  {
    id: 'mut-sickle-cell',
    name: 'Hemoglobin (HBB): Sickle Cell Disease',
    category: 'Missense Mutation',
    description: 'Demonstrates the classic A to T point mutation at codon 6 (GAG to GTG), changing Glutamic Acid (E) to Valine (V) and altering red blood cell shape.',
    seqOriginal: 'ATGGTGCACCTGACTCCTGAGGAGAAG',
    seqModified: 'ATGGTGCACCTGACTCCTGTGGAGAAG'
  },
  {
    id: 'mut-nonsense-stop',
    name: 'Beta-Globin: Premature Stop Codon',
    category: 'Nonsense Mutation',
    description: 'Demonstrates a point substitution that introduces a STOP codon (GAG to TAG), truncating the synthesized beta-globin protein prematurely.',
    seqOriginal: 'ATGGTGCACCTGACTCCTGAGGAGAAG',
    seqModified: 'ATGGTGCACCTGACTCCTTAGGAGAAG'
  },
  {
    id: 'mut-lacz-frameshift',
    name: 'LacZ Gene: Deletion Frameshift',
    category: 'Frameshift Mutation',
    description: 'A single thymine base deletion that corrupts the entire downstream ribosomal reading frame, resulting in an entirely non-functional enzyme.',
    seqOriginal: 'ATGACCATGATTACGGATTCACTGGCC',
    seqModified: 'ATGACCATGATACGGATTCACTGGCC'
  }
];

const TRANSLATOR_PRESETS: DatasetPreset[] = [
  {
    id: 'trans-hgh',
    name: 'Human Growth Hormone (Fragment)',
    category: 'Human Hormone',
    description: 'A partial coding sequence with a clear START codon (ATG) and STOP codon (TAA) to demonstrate complete peptide synthesis.',
    seq: 'ATGGCTACAGGCTCCCGGACGTCCCTGCTCCTGGCTTTTGGCCTGCTCTGCCTGCCCTGGCTTCAAGAGGGCAGTGCCTAA'
  },
  {
    id: 'trans-yeast-cyc',
    name: 'Yeast Cytochrome C (CYC1) segment',
    category: 'Yeast Respiration',
    description: 'Conserved energy transfer enzyme sequence, useful for examining standard codon redundancy.',
    seq: 'ATGGGTGTTCCCGCTGGTAAGGAAGGTGTTGGTGCTAAGAAGGGTGCTAACGCTAAGAAGGGTGCTGACGCTAAGAAGTAA'
  },
  {
    id: 'trans-poly-alanine',
    name: 'Synthetic Poly-Alanine Code',
    category: 'Synthetic Peptide',
    description: 'Demonstrates standard triplet codon repetition translating into a clean alanine polypeptide chain.',
    seq: 'ATGGCTGCCGCCGCCGCCGCCGCCGCCGCCGCCTAA'
  }
];

interface DetailedSampleMeta {
  id: string;
  name: string;
  category: 'Human' | 'Plant' | 'Bacterial' | 'Viral' | 'Clinical' | 'Comparative';
  origin: string;
  length: string;
  function: string;
  scientificContext: string;
  features: string[];
  suggestedTool: 'analyzer' | 'comparator' | 'mutation' | 'translator' | 'all';
  sequenceA: string;
  sequenceB?: string;
}

const DETAILED_SAMPLE_METADATA: DetailedSampleMeta[] = [
  {
    id: 'ins-human',
    name: 'Human Insulin Gene Fragment (INS)',
    category: 'Human',
    origin: 'Homo sapiens — Chromosome 11p15.5',
    length: '78 bp',
    function: 'Codes for preproinsulin, the precursor molecule of insulin. Insulin is the primary peptide hormone responsible for cellular glucose uptake, lipid synthesis, and maintaining glucose homeostasis in the bloodstream.',
    scientificContext: 'Pancreatic beta cells synthesize and process this peptide. Mutations in the INS gene lead to neonatal diabetes, diabetic ketoacidosis, or hyperproinsulinemia. In bioinformatics, it serves as a high-GC model for peptide hormone translation.',
    features: ['High GC Content (64%)', 'Thermodynamically Stable Locus', 'Peptide Hormone Expression'],
    suggestedTool: 'translator',
    sequenceA: 'AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG'
  },
  {
    id: 'hbb-normal',
    name: 'Human Hemoglobin Beta (HBB) — Normal',
    category: 'Human',
    origin: 'Homo sapiens — Chromosome 11p15.4',
    length: '93 bp',
    function: 'Encodes the beta-globin polypeptide subunit of Hemoglobin A, the tetrameric metalloprotein inside red blood cells responsible for oxygen transport from pulmonary alveoli to respiration-active peripheral tissues.',
    scientificContext: 'Normal adult hemoglobin consists of two alpha and two beta chains. Studying this baseline is essential for understanding clinical hematology, red blood cell mechanics, and oxygen-dissociation curves.',
    features: ['Adult Hemoglobin Subunit', 'Standard Codon Distribution', 'Oxygen Carrier Template'],
    suggestedTool: 'analyzer',
    sequenceA: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGG'
  },
  {
    id: 'rbcl-plant',
    name: 'Arabidopsis thaliana rbcL Gene Fragment',
    category: 'Plant',
    origin: 'Arabidopsis thaliana — Chloroplast Genome (Plastid)',
    length: '122 bp',
    function: 'Codes for the large subunit of ribulose-1,5-bisphosphate carboxylase/oxygenase (RuBisCO), the catalyst that captures atmospheric CO2 and incorporates it into organic molecules during photosynthesis.',
    scientificContext: 'RuBisCO is widely regarded as the most abundant enzyme on Earth. The chloroplast-encoded rbcL gene is highly conserved across plant lineages and is used extensively in botanical phylogenetics, plant evolutionary tracking, and chloroplast transformation research.',
    features: ['AT-Rich Plastid DNA', 'Photosynthetic Enzyme Model', 'Phylogenetic Classification Locus'],
    suggestedTool: 'analyzer',
    sequenceA: 'ATGTCACCACAAACAGAGACTAAAGCAAGTGTTGGATTCAAAGCTGGTGTTAAAGAGTACAAATTGACTTATTATACTCCTGAATACGAAACCAAGGATACTGATATCTTGGCAGCATTCCGA'
  },
  {
    id: '16s-bact',
    name: 'E. coli 16S Ribosomal RNA Segment',
    category: 'Bacterial',
    origin: 'Escherichia coli — 16S Ribosomal Operon',
    length: '120 bp',
    function: 'A critical structural component of the 30S small ribosomal subunit in prokaryotic organisms, playing a fundamental role in scaffold binding and aligning the mRNA transcript during translation initiation.',
    scientificContext: 'Because ribosomal RNA is evolutionary ancient and highly constrained, the 16S rRNA gene contains slow-evolving conserved zones and rapid-evolving hypervariable zones. It acts as the standard "barcode" for clinical and ecological microbiome sequencing.',
    features: ['Ribosomal Non-Coding RNA Locus', 'Prokaryotic Taxonomic Marker', 'Secondary Structure Stability'],
    suggestedTool: 'analyzer',
    sequenceA: 'AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGAACGGTAACAGGAAGAAGCTTGCTTCTTTGCTGACGAGTGGCGGACGGGTGAGTAATGTCTGGGAA'
  },
  {
    id: 'sars-spike',
    name: 'SARS-CoV-2 Spike Protein Receptor Binding Domain',
    category: 'Viral',
    origin: 'SARS-CoV-2 — S-Gene RBD Region',
    length: '93 bp',
    function: 'Codes for the specific outer domain of the viral spike glycoprotein that physically engages with host human Angiotensin-Converting Enzyme 2 (ACE2) receptors to initiate viral envelope fusion and host cell invasion.',
    scientificContext: 'This genomic segment is under immense evolutionary pressure, and mutations here directly alter transmissibility and vaccine resistance. It represents a model for structural virology, molecular diagnostics, and immunological antibody target design.',
    features: ['Rapidly Mutating Target', 'Zoonotic Infection Key', 'Viral Entry Glycoprotein'],
    suggestedTool: 'analyzer',
    sequenceA: 'ATGTTTGTTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCT'
  },
  {
    id: 'hbb-chimp-homology',
    name: 'Hemoglobin Beta: Human vs. Chimpanzee',
    category: 'Comparative',
    origin: 'Homo sapiens vs. Pan troglodytes',
    length: '73 bp',
    function: 'Examines evolutionary divergence and nucleotide identity. Shows the sequence alignment of the conserved oxygen-carrying beta-chain coding region between humans and chimpanzees.',
    scientificContext: 'Demonstrates 100% nucleotide sequence identity in this specific active site fragment, proving the close evolutionary proximity of primates and the absolute selective pressure to maintain oxygen transport protein structures.',
    features: ['100% Sequence Identity', 'Conserved Active Site', 'Primate Lineage Reference'],
    suggestedTool: 'comparator',
    sequenceA: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTG',
    sequenceB: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTG'
  },
  {
    id: 'ins-human-swine',
    name: 'Insulin Gene: Human vs. Pig',
    category: 'Comparative',
    origin: 'Homo sapiens vs. Sus scrofa',
    length: '78 bp / 77 bp',
    function: 'Compares insulin gene templates between humans and swine. Pigs synthesize an insulin protein that differs by only a single amino acid from humans, which served as the primary source of pharmaceutical insulin for decades.',
    scientificContext: 'Highlights "codon wobble" or degeneracy, where mammalian genes exhibit substantial silent nucleotide differences in their DNA templates while maintaining extremely similar amino acid translation products.',
    features: ['Inter-species Divergence', 'Industrial Therapeutic Source', 'Codon Degeneracy Example'],
    suggestedTool: 'comparator',
    sequenceA: 'AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG',
    sequenceB: 'GCTCTCTACCTGGTGTGCGGGGAGCGTGGCTTCTTCTACACACCCAAGGCCCGTCGGGAGGCAGAGGACCTGCAGGTG'
  },
  {
    id: 'rrna-eco-sal',
    name: '16S Ribosomal RNA: E. coli vs. Salmonella',
    category: 'Comparative',
    origin: 'Escherichia coli vs. Salmonella enterica',
    length: '60 bp',
    function: 'Compares highly conserved ribosomal RNA fragments between two closely related enteric Gram-negative bacilli to demonstrate precise microbial species identification.',
    scientificContext: 'Demonstrates how single-nucleotide polymorphisms (SNPs) in structural RNA are leveraged to distinguish clinical foodborne pathogens (Salmonella) from common, benign gut flora (E. coli).',
    features: ['Single-Nucleotide Polymorphisms (SNPs)', 'Enteric Pathogen Differentiation', 'Conserved Sequence Comparison'],
    suggestedTool: 'comparator',
    sequenceA: 'AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGGCCTAACACATGCAAGTCGAAC',
    sequenceB: 'AGAGTTTGATCCTGGCTCAGATTGAACGCTGGCGGCAGTCGACG'
  },
  {
    id: 'sickle-cell-mut',
    name: 'Hemoglobin Beta: Sickle Cell Mutation',
    category: 'Clinical',
    origin: 'Clinical Variant — Human HBB Codon 6 Missense',
    length: '27 bp',
    function: 'An infamous point mutation leading to Sickle Cell Anemia. A single nucleotide transversion from Adenine (A) to Thymine (T) alters a crucial codon in the beta-globin polypeptide.',
    scientificContext: 'This missense mutation alters the sixth codon from GAG (Glutamic Acid) to GTG (Valine). Glutamic Acid is highly polar, while Valine is hydrophobic. When deoxygenated, the abnormal hemoglobin polymerizes into rigid fibers, distorting red cells into "sickles" that clog microcapillaries.',
    features: ['Missense Point Mutation', 'Glutamic Acid to Valine (E6V)', 'Vaso-occlusive Clinical Impact'],
    suggestedTool: 'mutation',
    sequenceA: 'ATGGTGCACCTGACTCCTGAGGAGAAG',
    sequenceB: 'ATGGTGCACCTGACTCCTGTGGAGAAG'
  },
  {
    id: 'thalassemia-nonsense',
    name: 'Beta-Thalassemia Premature Stop Codon',
    category: 'Clinical',
    origin: 'Clinical Variant — Human HBB Nonsense Variant',
    length: '27 bp',
    function: 'A severe nonsense mutation where a single nucleotide transition converts a normal amino-acid codon into a premature stop codon, terminating protein synthesis.',
    scientificContext: 'The mutation changes codon 8 from GAG (Glutamic Acid) to TAG (amber Stop Codon). During protein synthesis, the ribosome falls off early, producing a truncated, totally non-functional beta-globin peptide. This causes Beta-Thalassemia Major.',
    features: ['Nonsense Translation Arrest', 'Premature Termination Codon', 'Beta-Thalassemia Model'],
    suggestedTool: 'mutation',
    sequenceA: 'ATGGTGCACCTGACTCCTGAGGAGAAG',
    sequenceB: 'ATGGTGCACCTGACTCCTTAGGAGAAG'
  },
  {
    id: 'lacz-frameshift-mut',
    name: 'Beta-Galactosidase (LacZ) Single-Base Deletion',
    category: 'Clinical',
    origin: 'Escherichia coli — lacZ Operon Deletion',
    length: '27 bp / 26 bp',
    function: 'A single-nucleotide deletion frameshift mutation inside the lactose-hydrolyzing lacZ gene, illustrating absolute loss of protein structure and function.',
    scientificContext: 'Deleting a single Thymine base shifts the triplet reading frame downstream. Consequently, every subsequent codon is read incorrectly, leading to a scrambled polypeptide chain that typically terminates in a random premature stop codon.',
    features: ['Frameshift Mutation', 'Single Nucleotide Deletion', 'Total Translation Inactivation'],
    suggestedTool: 'mutation',
    sequenceA: 'ATGACCATGATTACGGATTCACTGGCC',
    sequenceB: 'ATGACCATGATACGGATTCACTGGCC'
  },
  {
    id: 'hgh-fragment',
    name: 'Human Growth Hormone Segment (HGH)',
    category: 'Human',
    origin: 'Homo sapiens — Chromosome 17q23.3',
    length: '81 bp',
    function: 'A coding fragment of Somatotropin (Human Growth Hormone), synthesized and secreted by somatotropic cells of the anterior pituitary gland to stimulate cell division and regeneration.',
    scientificContext: 'Useful for showing an explicit reading frame starting with a Methionine Start codon (ATG) and ending with an ochre Stop codon (TAA), making it the perfect teaching dataset for full genetic translation.',
    features: ['Pituitary Somatotropin Gene', 'Perfect Reading Frame Template', 'Start-Stop Codon Visualization'],
    suggestedTool: 'translator',
    sequenceA: 'ATGGCTACAGGCTCCCGGACGTCCCTGCTCCTGGCTTTTGGCCTGCTCTGCCTGCCCTGGCTTCAAGAGGGCAGTGCCTAA'
  }
];

export interface PastRun {
  id: string;
  timestamp: string;
  tool: 'analyzer' | 'comparator' | 'mutation' | 'translator';
  toolName: string;
  sequenceA: string;
  sequenceB?: string;
  summary: string;
  details: string;
}

interface VirtualLabProps {
  progress?: UserProgress;
  onSaveReport?: (report: SavedReport) => void;
}

export default function VirtualLab({ progress, onSaveReport }: VirtualLabProps) {
  // Tabs for the "Research Toolkit"
  const [activeTab, setActiveTab] = useState<'analyzer' | 'comparator' | 'mutation' | 'translator' | 'ncbi'>('analyzer');
  
  // Dashboard & Past Runs States
  const [isDashboardExpanded, setIsDashboardExpanded] = useState<boolean>(false);
  const [dashboardSearch, setDashboardSearch] = useState<string>('');
  const [dashboardCategory, setDashboardCategory] = useState<string>('All');
  const [pastRuns, setPastRuns] = useState<PastRun[]>([
    {
      id: 'RUN-48192',
      timestamp: '2026-06-29 10:42:15',
      tool: 'analyzer',
      toolName: 'DNA Analyzer',
      sequenceA: 'AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG',
      summary: 'Length: 78 bp | GC: 64.1% | AT: 35.9%',
      details: 'A: 13, T: 15, G: 25, C: 25. Complement and reverse strands successfully modeled.'
    },
    {
      id: 'RUN-91023',
      timestamp: '2026-06-29 10:55:04',
      tool: 'mutation',
      toolName: 'Mutation Explorer',
      sequenceA: 'ATGGTGCACCTGACTCCTGAGGAGAAG',
      sequenceB: 'ATGGTGCACCTGACTCCTGTGGAGAAG',
      summary: 'Type: Missense Substitution | Severity: Moderate',
      details: 'Substitution at codon 6: GAG → GTG changes Glutamic Acid (E) to Valine (V). Common sickle cell indicator.'
    },
    {
      id: 'RUN-31849',
      timestamp: '2026-06-29 11:02:40',
      tool: 'translator',
      toolName: 'Translation Explorer',
      sequenceA: 'ATGGCTACAGGCTCCCGGACGTCCCTGCTCCTGGCTTTTGGCCTGCTCTGCCTGCCCTGGCTTCAAGAGGGCAGTGCCTAA',
      summary: 'Codons: 27 | Peptide: M-A-T-G-S-R-T-S-L-L-L-A-F-G-L-L-C-L-P-W-L-Q-E-G-S-A-STOP',
      details: 'Transcribed mRNA and successfully synthesized polypeptide chain with matching initiator and terminator codes.'
    }
  ]);

  // Notification States
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState<boolean>(false);
  const [librarySearchQuery, setLibrarySearchQuery] = useState<string>('');
  const [selectedLibraryCategory, setSelectedLibraryCategory] = useState<string>('All');

  // 1. Tool 1: DNA Analyzer States
  const [analyzerSeq, setAnalyzerSeq] = useState<string>('AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG');
  const [analyzerError, setAnalyzerError] = useState<string>('');
  const [analyzerResult, setAnalyzerResult] = useState<any>(null);

  // 2. Tool 2: Sequence Comparator States
  const [compSeqA, setCompSeqA] = useState<string>('ATGGTGCACCTGACTCCTGAGGAGAAGTCT');
  const [compSeqB, setCompSeqB] = useState<string>('ATGGTGCACCTGACTCCTGAGGAGAAGTCC');
  const [compError, setCompError] = useState<string>('');
  const [compResult, setCompResult] = useState<any>(null);
  const [comparatorInspectorStrand, setComparatorInspectorStrand] = useState<'A' | 'B'>('A');

  // 3. Tool 3: Mutation Explorer States
  const [mutOriginal, setMutOriginal] = useState<string>('ATGGTGCACCTGACTCCTGAGGAGAAG');
  const [mutModified, setMutModified] = useState<string>('ATGGTGCACCTGACTCCTGTGGAGAAG');
  const [mutError, setMutError] = useState<string>('');
  const [mutResult, setMutResult] = useState<any>(null);
  const [mutationInspectorStrand, setMutationInspectorStrand] = useState<'Original' | 'Mutated'>('Original');

  // 4. Tool 4: Translation Explorer States
  const [transSeq, setTransSeq] = useState<string>('ATGTCACCACAAACAGAGACTAAAGCA');
  const [transError, setTransError] = useState<string>('');
  const [transResult, setTransResult] = useState<any>(null);

  // 5. Tool 5: NCBI Database Search & Fetch States
  const [ncbiDb, setNcbiDb] = useState<'nucleotide' | 'pubmed' | 'protein'>('nucleotide');
  const [ncbiSearchQuery, setNcbiSearchQuery] = useState<string>('insulin human');
  const [ncbiSearchResults, setNcbiSearchResults] = useState<any[]>([]);
  const [ncbiIsSearching, setNcbiIsSearching] = useState<boolean>(false);
  const [ncbiIsFetching, setNcbiIsFetching] = useState<boolean>(false);
  const [ncbiError, setNcbiError] = useState<string | null>(null);
  const [ncbiFetchedSeq, setNcbiFetchedSeq] = useState<string | null>(null);
  const [ncbiFetchedMeta, setNcbiFetchedMeta] = useState<any | null>(null);
  const [ncbiSelectedArticle, setNcbiSelectedArticle] = useState<any | null>(null);
  const [ncbiTrimSequence, setNcbiTrimSequence] = useState<boolean>(true);

  // Clear states when toggling database types
  useEffect(() => {
    setNcbiSearchResults([]);
    setNcbiFetchedSeq(null);
    setNcbiFetchedMeta(null);
    setNcbiSelectedArticle(null);
    setNcbiError(null);
    if (ncbiDb === 'nucleotide') {
      setNcbiSearchQuery('insulin human');
    } else if (ncbiDb === 'protein') {
      setNcbiSearchQuery('insulin human');
    } else {
      setNcbiSearchQuery('CRISPR gene therapy human');
    }
  }, [ncbiDb]);

  // NCBI search logic
  const handleNcbiSearch = async () => {
    if (!ncbiSearchQuery.trim()) {
      setNcbiError(`Please enter a search query (e.g., "${ncbiDb === 'nucleotide' ? 'insulin human' : ncbiDb === 'protein' ? 'insulin human' : 'CRISPR genome editing'}").`);
      return;
    }
    setNcbiIsSearching(true);
    setNcbiError(null);
    setNcbiSearchResults([]);
    setNcbiFetchedSeq(null);
    setNcbiFetchedMeta(null);
    setNcbiSelectedArticle(null);

    try {
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${ncbiDb}&term=${encodeURIComponent(ncbiSearchQuery.trim())}&retmax=8&retmode=json`;
      const searchRes = await fetch(searchUrl);
      if (!searchRes.ok) throw new Error(`Failed to query the NCBI ${ncbiDb === 'nucleotide' ? 'Nucleotide' : ncbiDb === 'protein' ? 'Protein' : 'PubMed'} search database.`);
      
      const searchJson = await searchRes.json();
      const idList = searchJson.esearchresult?.idlist;
      
      if (!idList || idList.length === 0) {
        setNcbiError(`No records matched your search query in the NCBI ${ncbiDb === 'nucleotide' ? 'Nucleotide' : ncbiDb === 'protein' ? 'Protein' : 'PubMed'} database.`);
        setNcbiIsSearching(false);
        return;
      }

      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=${ncbiDb}&id=${idList.join(',')}&retmode=json`;
      const summaryRes = await fetch(summaryUrl);
      if (!summaryRes.ok) throw new Error('Failed to retrieve summary details from NCBI.');
      
      const summaryJson = await summaryRes.json();
      const resultsMap = summaryJson.result;
      
      if (!resultsMap || !resultsMap.uids) {
        setNcbiError('Could not process summary data from NCBI.');
        setNcbiIsSearching(false);
        return;
      }

      const formattedResults = resultsMap.uids.map((uid: string) => {
        const item = resultsMap[uid];
        if (ncbiDb === 'pubmed') {
          // Map PubMed item properties
          const authorNames = item.authors && Array.isArray(item.authors) 
            ? item.authors.map((author: any) => author.name).join(', ') 
            : 'Unknown Authors';
          return {
            uid,
            dbType: 'pubmed',
            title: item.title || 'Untitled Publication',
            authors: authorNames,
            journal: item.source || 'PubMed Article',
            pubDate: item.pubdate || 'N/A',
            volume: item.volume || '',
            issue: item.issue || '',
            pages: item.pages || '',
            doi: item.articleids?.find((id: any) => id.idtype === 'doi')?.value || '',
            pmid: uid,
          };
        } else {
          // Map Nucleotide or Protein item properties
          return {
            uid,
            dbType: ncbiDb, // 'nucleotide' or 'protein'
            accession: item.caption || uid,
            title: item.title || 'Untitled Sequence Record',
            length: item.slen ? parseInt(item.slen) : 0,
            organism: item.organism || 'Unknown Organism',
            extra: item.extra || '',
          };
        }
      });

      setNcbiSearchResults(formattedResults);
    } catch (err: any) {
      console.error(err);
      setNcbiError(err.message || 'An error occurred during the NCBI search. Please try again.');
    } finally {
      setNcbiIsSearching(false);
    }
  };

  // NCBI fetch sequence logic
  const handleNcbiFetchSequence = async (id: string, accession: string, title: string, length: number) => {
    setNcbiIsFetching(true);
    setNcbiError(null);
    setNcbiFetchedSeq(null);
    setNcbiFetchedMeta(null);

    try {
      const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=${ncbiDb}&id=${id}&rettype=fasta&retmode=text`;
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error(`Failed to fetch sequence for accession ${accession}.`);
      
      const text = await res.text();
      if (!text || text.trim() === '') {
        throw new Error('NCBI returned an empty sequence.');
      }

      // Parse FASTA
      const lines = text.split('\n');
      const sequenceLines = lines.filter(line => !line.trim().startsWith('>'));
      const rawSeq = sequenceLines.join('').toUpperCase();
      // Sanitize sequence (convert U to T just in case, clean non-DNA characters)
      const sanitized = ncbiDb === 'nucleotide'
        ? rawSeq.replace(/U/g, 'T').replace(/[^ATGC]/g, '')
        : rawSeq.replace(/[^A-Z]/g, ''); // For protein, allow all capital amino acids A-Z

      if (!sanitized) {
        throw new Error(ncbiDb === 'nucleotide'
          ? 'The retrieved sequence did not contain any valid DNA nucleobases (A, T, G, C).'
          : 'The retrieved sequence did not contain any valid amino acids (A-Z).'
        );
      }

      setNcbiFetchedSeq(sanitized);
      setNcbiFetchedMeta({
        id,
        accession,
        title,
        length,
        originalFasta: text
      });
    } catch (err: any) {
      console.error(err);
      setNcbiError(err.message || `An error occurred while fetching the ${ncbiDb === 'nucleotide' ? 'nucleotide' : 'protein'} sequence.`);
    } finally {
      setNcbiIsFetching(false);
    }
  };

  // Dispatch fetched sequence to analysis tools
  const handleSendNcbiToTool = (tool: string, targetKey?: string) => {
    if (!ncbiFetchedSeq) return;

    let targetSeq = ncbiFetchedSeq;
    if (ncbiTrimSequence && ncbiFetchedSeq.length > 150) {
      targetSeq = ncbiFetchedSeq.substring(0, 150);
    }

    if (tool === 'analyzer') {
      setAnalyzerSeq(targetSeq);
      setAnalyzerResult(null);
      setActiveTab('analyzer');
    } else if (tool === 'comparator') {
      if (targetKey === 'seqA') {
        setCompSeqA(targetSeq);
      } else {
        setCompSeqB(targetSeq);
      }
      setCompResult(null);
      setActiveTab('comparator');
    } else if (tool === 'mutation') {
      if (targetKey === 'original') {
        setMutOriginal(targetSeq);
      } else {
        setMutModified(targetSeq);
      }
      setMutResult(null);
      setActiveTab('mutation');
    } else if (tool === 'translator') {
      setTransSeq(targetSeq);
      setTransResult(null);
      setActiveTab('translator');
    }
  };

  // Report Generator Interactive Modal State
  const [activeReport, setActiveReport] = useState<SavedReport | null>(null);

  // Clear states when tab switches
  useEffect(() => {
    setAnalyzerError('');
    setCompError('');
    setMutError('');
    setTransError('');
    setNcbiError(null);
  }, [activeTab]);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  // Helper: validate DNA sequence characters
  const cleanAndValidateDNA = (input: string, errorSetter: (err: string) => void): string | null => {
    errorSetter('');
    if (!input || input.trim() === '') {
      errorSetter('Sequence cannot be empty. Please enter some DNA nucleobases.');
      return null;
    }
    let cleaned = input.toUpperCase().replace(/[\s\r\n]+/g, '');
    if (/[^ATGC]/.test(cleaned)) {
      errorSetter('Invalid genetic bases. Sequences must contain only nucleobases Adenine (A), Thymine (T), Guanine (G), and Cytosine (C).');
      return null;
    }
    if (cleaned.length < 3) {
      errorSetter('Sequence is too short. Please enter at least 3 nucleotides for analysis.');
      return null;
    }
    return cleaned;
  };

  // Sandbox helper: generate random DNA nucleotides of specified length
  const generateRandomDNA = (length: number = 60): string => {
    const bases = ['A', 'T', 'G', 'C'];
    let result = '';
    for (let i = 0; i < length; i++) {
      result += bases[Math.floor(Math.random() * bases.length)];
    }
    return result;
  };

  // Sandbox helper: introduce a random single-point substitution mutation in a sequence
  const injectRandomMutation = (seq: string): string => {
    if (seq.length < 3) return seq;
    const bases = ['A', 'T', 'G', 'C'];
    const idx = Math.floor(Math.random() * seq.length);
    const originalBase = seq[idx];
    const filteredBases = bases.filter(b => b !== originalBase);
    const newBase = filteredBases[Math.floor(Math.random() * filteredBases.length)];
    return seq.substring(0, idx) + newBase + seq.substring(idx + 1);
  };

  // Sandbox helper: generate sequence with guaranteed Open Reading Frame (Start to Stop)
  const generatePerfectORF = (codonCount: number = 9): string => {
    const bases = ['A', 'T', 'G', 'C'];
    let result = 'ATG'; // Start codon
    const stopCodons = ['TAA', 'TAG', 'TGA'];
    for (let i = 0; i < codonCount - 2; i++) {
      let codon = '';
      do {
        codon = bases[Math.floor(Math.random() * 4)] + bases[Math.floor(Math.random() * 4)] + bases[Math.floor(Math.random() * 4)];
      } while (stopCodons.includes(codon)); // avoid premature STOP
      result += codon;
    }
    result += stopCodons[Math.floor(Math.random() * stopCodons.length)]; // Stop codon
    return result;
  };

  // ============================================================================
  // LOGIC: DNA ANALYZER
  // ============================================================================
  const executeAnalyzer = (overrideSeq?: string) => {
    const seq = overrideSeq !== undefined ? overrideSeq : analyzerSeq;
    if (overrideSeq !== undefined) {
      setAnalyzerSeq(overrideSeq);
    }
    const cleaned = cleanAndValidateDNA(seq, setAnalyzerError);
    if (!cleaned) return;

    const len = cleaned.length;
    const countA = (cleaned.match(/A/g) || []).length;
    const countT = (cleaned.match(/T/g) || []).length;
    const countG = (cleaned.match(/G/g) || []).length;
    const countC = (cleaned.match(/C/g) || []).length;

    const gcPercent = parseFloat((((countG + countC) / len) * 100).toFixed(2));
    const atPercent = parseFloat((((countA + countT) / len) * 100).toFixed(2));

    const complementMap: Record<string, string> = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    const complement = cleaned.split('').map(char => complementMap[char] || char).join('');
    const reverseComplement = complement.split('').reverse().join('');

    const resultObj = {
      sequence: cleaned,
      length: len,
      counts: { A: countA, T: countT, G: countG, C: countC },
      frequencies: {
        A: parseFloat(((countA / len) * 100).toFixed(1)),
        T: parseFloat(((countT / len) * 100).toFixed(1)),
        G: parseFloat(((countG / len) * 100).toFixed(1)),
        C: parseFloat(((countC / len) * 100).toFixed(1))
      },
      gcPercent,
      atPercent,
      complement,
      reverseComplement
    };

    setAnalyzerResult(resultObj);

    // Track in Past Runs
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const runId = `RUN-${Math.floor(Math.random() * 90000) + 10000}`;
    const newRun: PastRun = {
      id: runId,
      timestamp,
      tool: 'analyzer',
      toolName: 'DNA Analyzer',
      sequenceA: cleaned,
      summary: `Length: ${len} bp | GC: ${gcPercent}% | AT: ${atPercent}%`,
      details: `A: ${countA}, T: ${countT}, G: ${countG}, C: ${countC}. Complement sequence generated.`
    };
    setPastRuns(prev => [newRun, ...prev]);
  };

  // ============================================================================
  // LOGIC: SEQUENCE COMPARATOR
  // ============================================================================
  const executeComparator = (overrideA?: string, overrideB?: string) => {
    const seqA = overrideA !== undefined ? overrideA : compSeqA;
    const seqB = overrideB !== undefined ? overrideB : compSeqB;
    if (overrideA !== undefined) setCompSeqA(overrideA);
    if (overrideB !== undefined) setCompSeqB(overrideB);
    const cleanedA = cleanAndValidateDNA(seqA, setCompError);
    if (!cleanedA) return;
    const cleanedB = cleanAndValidateDNA(seqB, setCompError);
    if (!cleanedB) return;

    // Pad if lengths are different to simulate clinical gaps, or alert
    const maxLen = Math.max(cleanedA.length, cleanedB.length);
    let paddedA = cleanedA;
    let paddedB = cleanedB;

    if (cleanedA.length !== cleanedB.length) {
      // Pad sequences with gap indicator '-' for visual alignment
      paddedA = cleanedA.padEnd(maxLen, '-');
      paddedB = cleanedB.padEnd(maxLen, '-');
    }

    let matches = 0;
    let mismatches = 0;
    let gaps = 0;
    const diffs: { pos: number; charA: string; charB: string }[] = [];

    for (let i = 0; i < maxLen; i++) {
      const a = paddedA[i];
      const b = paddedB[i];
      if (a === '-' || b === '-') {
        gaps++;
        diffs.push({ pos: i + 1, charA: a, charB: b });
      } else if (a === b) {
        matches++;
      } else {
        mismatches++;
        diffs.push({ pos: i + 1, charA: a, charB: b });
      }
    }

    const similarity = parseFloat(((matches / maxLen) * 100).toFixed(2));

    const resultObj = {
      seqA: cleanedA,
      seqB: cleanedB,
      paddedA,
      paddedB,
      length: maxLen,
      matches,
      mismatches,
      gaps,
      similarity,
      differences: diffs
    };

    setCompResult(resultObj);

    // Track in Past Runs
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const runId = `RUN-${Math.floor(Math.random() * 90000) + 10000}`;
    const newRun: PastRun = {
      id: runId,
      timestamp,
      tool: 'comparator',
      toolName: 'Sequence Comparator',
      sequenceA: cleanedA,
      sequenceB: cleanedB,
      summary: `Similarity: ${similarity}% | Matches: ${matches} | Mismatches: ${mismatches}`,
      details: `Aligned length: ${maxLen} bp with ${gaps} gaps found.`
    };
    setPastRuns(prev => [newRun, ...prev]);
  };

  // ============================================================================
  // LOGIC: MUTATION EXPLORER
  // ============================================================================
  const translateSeq = (dna: string): string => {
    let protein = '';
    for (let i = 0; i < dna.length - 2; i += 3) {
      const codon = dna.substring(i, i + 3);
      const aa = CODON_TABLE[codon];
      if (aa) {
        if (aa.symbol === '*') {
          protein += 'STOP';
          break;
        }
        protein += aa.symbol;
      } else {
        protein += '?';
      }
    }
    return protein || 'No complete codons';
  };

  const executeMutationExplorer = (overrideOrig?: string, overrideMut?: string) => {
    const origSeq = overrideOrig !== undefined ? overrideOrig : mutOriginal;
    const mutSeq = overrideMut !== undefined ? overrideMut : mutModified;
    if (overrideOrig !== undefined) setMutOriginal(overrideOrig);
    if (overrideMut !== undefined) setMutModified(overrideMut);
    const orig = cleanAndValidateDNA(origSeq, setMutError);
    if (!orig) return;
    const mut = cleanAndValidateDNA(mutSeq, setMutError);
    if (!mut) return;

    const origLen = orig.length;
    const mutLen = mut.length;
    const isSameLen = origLen === mutLen;

    const origProt = translateSeq(orig);
    const mutProt = translateSeq(mut);

    let mutationType = 'Indel / Frameshift';
    let severity = 'Neutral';
    let explanation = '';
    const diffList: { pos: number; from: string; to: string }[] = [];

    if (isSameLen) {
      // Find point mismatches
      for (let i = 0; i < origLen; i++) {
        if (orig[i] !== mut[i]) {
          diffList.push({ pos: i + 1, from: orig[i], to: mut[i] });
        }
      }

      if (diffList.length === 0) {
        mutationType = 'Homologous Sequence (No Mutation)';
        severity = 'None';
        explanation = 'The analyzed strands are perfectly identical. No biological mutation was located.';
      } else if (diffList.length === 1) {
        // Point mutation: missense, nonsense, silent
        if (origProt === mutProt) {
          mutationType = 'Synonymous (Silent) Substitution';
          severity = 'Low (No Effect)';
          explanation = `A single nucleotide substitution occurred at position ${diffList[0].pos} (${diffList[0].from} → ${diffList[0].to}). Because of codon redundancy, the translated amino acid remains identical (${origProt}). This mutation has no effect on the final protein structure.`;
        } else if (mutProt.includes('STOP') && !origProt.includes('STOP')) {
          mutationType = 'Nonsense Substitution';
          severity = 'High (Severe truncation)';
          explanation = `A single nucleotide substitution at position ${diffList[0].pos} (${diffList[0].from} → ${diffList[0].to}) introduced a premature STOP codon. The translated protein is cut short, which generally eliminates its biological function entirely.`;
        } else {
          mutationType = 'Missense Substitution';
          severity = 'Moderate';
          explanation = `A single nucleotide substitution occurred at position ${diffList[0].pos} (${diffList[0].from} → ${diffList[0].to}). This alters the codon and changes one amino acid in the resulting peptide chain (${origProt} → ${mutProt}). This can moderately or severely affect protein folding and cellular activity.`;
        }
      } else {
        mutationType = 'Multiple Point Substitutions';
        severity = 'Variable';
        explanation = `Detected ${diffList.length} distinct point nucleotide differences. This indicates localized genetic divergence, potentially altering multiple amino acid sites in the final translated protein.`;
      }
    } else {
      const lenDiff = Math.abs(origLen - mutLen);
      if (mutLen > origLen) {
        mutationType = `Frameshift Insertion (+${lenDiff} bp)`;
        severity = 'High';
        explanation = `An insertion of ${lenDiff} nucleotide bases shifts the downstream triplet reading frame completely. This rewritten frame translates into an entirely different, non-functional amino acid sequence downstream from the insertion.`;
      } else {
        if (lenDiff % 3 === 0) {
          mutationType = `In-Frame Codon Deletion (-${lenDiff} bp)`;
          severity = 'Moderate';
          explanation = `Exactly ${lenDiff / 3} codon(s) (3-base sets) were deleted. The overall downstream triplet reading frame remains intact, but specific amino acids will be missing from the final translated protein product.`;
        } else {
          mutationType = `Frameshift Deletion (-${lenDiff} bp)`;
          severity = 'High';
          explanation = `A deletion of ${lenDiff} base pairs occurred. Since this is not a multiple of 3, it causes a severe frameshift mutation, changing all subsequent codons and drastically altering the resulting protein product.`;
        }
      }
    }

    const resultObj = {
      orig,
      mut,
      origLen,
      mutLen,
      origProt,
      mutProt,
      mutationType,
      severity,
      explanation,
      differences: diffList
    };

    setMutResult(resultObj);

    // Track in Past Runs
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const runId = `RUN-${Math.floor(Math.random() * 90000) + 10000}`;
    const newRun: PastRun = {
      id: runId,
      timestamp,
      tool: 'mutation',
      toolName: 'Mutation Explorer',
      sequenceA: orig,
      sequenceB: mut,
      summary: `Type: ${mutationType} | Severity: ${severity}`,
      details: `Original peptide: [${origProt}] | Mutated: [${mutProt}]. ${explanation}`
    };
    setPastRuns(prev => [newRun, ...prev]);
  };

  // ============================================================================
  // LOGIC: TRANSLATION EXPLORER
  // ============================================================================
  const executeTranslator = (overrideSeq?: string) => {
    const seq = overrideSeq !== undefined ? overrideSeq : transSeq;
    if (overrideSeq !== undefined) setTransSeq(overrideSeq);
    const cleaned = cleanAndValidateDNA(seq, setTransError);
    if (!cleaned) return;

    // Group sequence into codons (triplets)
    const codons: { dna: string; rna: string; aa: { name: string; symbol: string; abbrev: string } | null }[] = [];
    
    // Transcription: replace T with U for RNA
    const rnaSeq = cleaned.replace(/T/g, 'U');

    for (let i = 0; i < cleaned.length; i += 3) {
      const dnaCodon = cleaned.substring(i, i + 3);
      if (dnaCodon.length === 3) {
        const rnaCodon = rnaSeq.substring(i, i + 3);
        const aa = CODON_TABLE[dnaCodon] || null;
        codons.push({ dna: dnaCodon, rna: rnaCodon, aa });
      }
    }

    const proteinPeptide = codons.map(c => c.aa ? c.aa.symbol : '?').join('-');

    const resultObj = {
      sequence: cleaned,
      rnaSeq,
      codons,
      proteinPeptide,
      codonCount: codons.length
    };

    setTransResult(resultObj);

    // Track in Past Runs
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const runId = `RUN-${Math.floor(Math.random() * 90000) + 10000}`;
    const newRun: PastRun = {
      id: runId,
      timestamp,
      tool: 'translator',
      toolName: 'Translation Explorer',
      sequenceA: cleaned,
      summary: `Codons: ${codons.length} triplets | Protein length: ${proteinPeptide.split('-').length} aa`,
      details: `Polypeptide chain: ${proteinPeptide}. mRNA transcript: ${rnaSeq}`
    };
    setPastRuns(prev => [newRun, ...prev]);
  };

  // Load a reference sample from library
  const handleLoadSample = (sample: ReferenceSample) => {
    if (activeTab === 'analyzer') {
      setAnalyzerSeq(sample.sequence);
      setTimeout(() => executeAnalyzer(sample.sequence), 10);
    } else if (activeTab === 'comparator') {
      setCompSeqA(sample.sequence);
      // Create a slight variant for B
      const variant = sample.sequence.substring(0, sample.sequence.length - 1) + 
        (sample.sequence.endsWith('G') ? 'C' : 'G');
      setCompSeqB(variant);
      setTimeout(() => executeComparator(sample.sequence, variant), 10);
    } else if (activeTab === 'mutation') {
      const orig = sample.sequence.substring(0, 30);
      // Create a point mutation
      const mutated = sample.sequence.substring(0, 19) + 'T' + sample.sequence.substring(20, 30);
      setMutOriginal(orig);
      setMutModified(mutated);
      setTimeout(() => executeMutationExplorer(orig, mutated), 10);
    } else if (activeTab === 'translator') {
      const trans = sample.sequence.substring(0, 27);
      setTransSeq(trans);
      setTimeout(() => executeTranslator(trans), 10);
    }
  };

  // Load a past computational run back into the workspace and trigger calculation
  const loadPastRun = (run: PastRun) => {
    setActiveTab(run.tool);
    if (run.tool === 'analyzer') {
      setAnalyzerSeq(run.sequenceA);
      setTimeout(() => {
        const cleaned = run.sequenceA;
        const len = cleaned.length;
        const countA = (cleaned.match(/A/g) || []).length;
        const countT = (cleaned.match(/T/g) || []).length;
        const countG = (cleaned.match(/G/g) || []).length;
        const countC = (cleaned.match(/C/g) || []).length;
        const gcPercent = parseFloat((((countG + countC) / len) * 100).toFixed(2));
        const atPercent = parseFloat((((countA + countT) / len) * 100).toFixed(2));
        const complementMap: Record<string, string> = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
        const complement = cleaned.split('').map(char => complementMap[char] || char).join('');
        const reverseComplement = complement.split('').reverse().join('');
        setAnalyzerResult({
          sequence: cleaned,
          length: len,
          counts: { A: countA, T: countT, G: countG, C: countC },
          frequencies: {
            A: parseFloat(((countA / len) * 100).toFixed(1)),
            T: parseFloat(((countT / len) * 100).toFixed(1)),
            G: parseFloat(((countG / len) * 100).toFixed(1)),
            C: parseFloat(((countC / len) * 100).toFixed(1))
          },
          gcPercent,
          atPercent,
          complement,
          reverseComplement
        });
      }, 50);
    } else if (run.tool === 'comparator' && run.sequenceB) {
      setCompSeqA(run.sequenceA);
      setCompSeqB(run.sequenceB);
      setTimeout(() => {
        const cleanedA = run.sequenceA;
        const cleanedB = run.sequenceB!;
        const maxLen = Math.max(cleanedA.length, cleanedB.length);
        const paddedA = cleanedA.padEnd(maxLen, '-');
        const paddedB = cleanedB.padEnd(maxLen, '-');
        let matches = 0;
        let mismatches = 0;
        let gaps = 0;
        const diffs = [];
        for (let i = 0; i < maxLen; i++) {
          const a = paddedA[i];
          const b = paddedB[i];
          if (a === '-' || b === '-') {
            gaps++;
            diffs.push({ pos: i + 1, charA: a, charB: b });
          } else if (a === b) {
            matches++;
          } else {
            mismatches++;
            diffs.push({ pos: i + 1, charA: a, charB: b });
          }
        }
        const similarity = parseFloat(((matches / maxLen) * 100).toFixed(2));
        setCompResult({
          seqA: cleanedA,
          seqB: cleanedB,
          paddedA,
          paddedB,
          length: maxLen,
          matches,
          mismatches,
          gaps,
          similarity,
          differences: diffs
        });
      }, 50);
    } else if (run.tool === 'mutation' && run.sequenceB) {
      setMutOriginal(run.sequenceA);
      setMutModified(run.sequenceB);
      setTimeout(() => {
        const orig = run.sequenceA;
        const mut = run.sequenceB!;
        const origLen = orig.length;
        const mutLen = mut.length;
        const isSameLen = origLen === mutLen;
        const origProt = translateSeq(orig);
        const mutProt = translateSeq(mut);
        let mutationType = 'Indel / Frameshift';
        let severity = 'Neutral';
        let explanation = '';
        const diffList = [];
        if (isSameLen) {
          for (let i = 0; i < origLen; i++) {
            if (orig[i] !== mut[i]) {
              diffList.push({ pos: i + 1, from: orig[i], to: mut[i] });
            }
          }
          if (diffList.length === 0) {
            mutationType = 'Homologous Sequence (No Mutation)';
            severity = 'None';
            explanation = 'The analyzed strands are perfectly identical. No biological mutation was located.';
          } else if (diffList.length === 1) {
            if (origProt === mutProt) {
              mutationType = 'Synonymous (Silent) Substitution';
              severity = 'Low (No Effect)';
              explanation = `A single nucleotide substitution occurred at position ${diffList[0].pos} (${diffList[0].from} → ${diffList[0].to}). Because of codon redundancy, the translated amino acid remains identical (${origProt}).`;
            } else if (mutProt.includes('STOP') && !origProt.includes('STOP')) {
              mutationType = 'Nonsense Substitution';
              severity = 'High (Severe truncation)';
              explanation = `A premature STOP codon was introduced at position ${diffList[0].pos}.`;
            } else {
              mutationType = 'Missense Substitution';
              severity = 'Moderate';
              explanation = `A single nucleotide substitution at position ${diffList[0].pos} altered the codon (${origProt} → ${mutProt}).`;
            }
          } else {
            mutationType = 'Multiple Point Substitutions';
            severity = 'Variable';
            explanation = `Detected ${diffList.length} distinct point nucleotide differences.`;
          }
        } else {
          const lenDiff = Math.abs(origLen - mutLen);
          if (mutLen > origLen) {
            mutationType = `Frameshift Insertion (+${lenDiff} bp)`;
            severity = 'High';
            explanation = `An insertion of ${lenDiff} base pairs shifts the reading frame.`;
          } else {
            if (lenDiff % 3 === 0) {
              mutationType = `In-Frame Codon Deletion (-${lenDiff} bp)`;
              severity = 'Moderate';
              explanation = `Exactly ${lenDiff / 3} codon(s) were deleted.`;
            } else {
              mutationType = `Frameshift Deletion (-${lenDiff} bp)`;
              severity = 'High';
              explanation = `A deletion of ${lenDiff} base pairs occurred.`;
            }
          }
        }
        setMutResult({
          orig,
          mut,
          origLen,
          mutLen,
          origProt,
          mutProt,
          mutationType,
          severity,
          explanation,
          differences: diffList
        });
      }, 50);
    } else if (run.tool === 'translator') {
      setTransSeq(run.sequenceA);
      setTimeout(() => {
        const cleaned = run.sequenceA;
        const codons = [];
        const rnaSeq = cleaned.replace(/T/g, 'U');
        for (let i = 0; i < cleaned.length; i += 3) {
          const dnaCodon = cleaned.substring(i, i + 3);
          if (dnaCodon.length === 3) {
            const rnaCodon = rnaSeq.substring(i, i + 3);
            const aa = CODON_TABLE[dnaCodon] || null;
            codons.push({ dna: dnaCodon, rna: rnaCodon, aa });
          }
        }
        const proteinPeptide = codons.map(c => c.aa ? c.aa.symbol : '?').join('-');
        setTransResult({
          sequence: cleaned,
          rnaSeq,
          codons,
          proteinPeptide,
          codonCount: codons.length
        });
      }, 50);
    }
  };

  // Load a detailed reference sample from the Dashboard directory
  const handleLoadDashboardSample = (sample: DetailedSampleMeta) => {
    const targetTool = sample.suggestedTool === 'all' ? 'analyzer' : sample.suggestedTool;
    setActiveTab(targetTool);
    if (targetTool === 'analyzer') {
      setAnalyzerSeq(sample.sequenceA);
      setTimeout(() => executeAnalyzer(sample.sequenceA), 10);
    } else if (targetTool === 'comparator' && sample.sequenceB) {
      setCompSeqA(sample.sequenceA);
      setCompSeqB(sample.sequenceB);
      setTimeout(() => executeComparator(sample.sequenceA, sample.sequenceB), 10);
    } else if (targetTool === 'mutation' && sample.sequenceB) {
      setMutOriginal(sample.sequenceA);
      setMutModified(sample.sequenceB);
      setTimeout(() => executeMutationExplorer(sample.sequenceA, sample.sequenceB), 10);
    } else if (targetTool === 'translator') {
      setTransSeq(sample.sequenceA);
      setTimeout(() => executeTranslator(sample.sequenceA), 10);
    }
  };

  // ============================================================================
  // REPORT VIEWER GENERATOR
  // ============================================================================
  const handleGenerateReport = () => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const reportId = `LAB-${Math.floor(Math.random() * 900000) + 100000}`;

    let experimentName = '';
    let method = '';
    let resultSummary = '';
    let observation = '';
    let conclusion = '';
    let inputSequence = '';

    if (activeTab === 'analyzer' && analyzerResult) {
      experimentName = 'DNA Sequence Composition & Compositional Analysis';
      inputSequence = analyzerResult.sequence;
      method = 'Computational analysis of base frequencies, GC content, and antiparallel reverse complement modeling.';
      resultSummary = `Length: ${analyzerResult.length} bp | GC Content: ${analyzerResult.gcPercent}% | AT Content: ${analyzerResult.atPercent}%`;
      observation = `Nucleotide breakdown: Adenine: ${analyzerResult.counts.A} (${analyzerResult.frequencies.A}%), Thymine: ${analyzerResult.counts.T} (${analyzerResult.frequencies.T}%), Guanine: ${analyzerResult.counts.G} (${analyzerResult.frequencies.G}%), Cytosine: ${analyzerResult.counts.C} (${analyzerResult.frequencies.C}%). Complement strand generated successfully: ${analyzerResult.complement}.`;
      conclusion = `The analysis indicates a ${analyzerResult.gcPercent > 50 ? 'G-C rich' : 'A-T rich'} genomic sequence fragment. In professional biological workflows, this sequence exhibits a melting temperature compatible with stable standard laboratory PCR amplification.`;
    } 
    else if (activeTab === 'comparator' && compResult) {
      experimentName = 'DNA Sequence Alignment & Similarity Comparison';
      inputSequence = `Sample A: ${compResult.seqA} | Sample B: ${compResult.seqB}`;
      method = 'Point-by-point genetic alignment algorithm evaluating similarity and sequence mismatches.';
      resultSummary = `Aligned Length: ${compResult.length} bp | Matches: ${compResult.matches} | Similarity: ${compResult.similarity}%`;
      observation = `Discovered ${compResult.mismatches} point variations and ${compResult.gaps} gaps during side-by-side alignment. Points of variation: ${compResult.differences.map((d: any) => `Pos ${d.pos} (${d.charA} vs ${d.charB})`).join(', ')}`;
      conclusion = `The sequence comparison calculated a similarity index of ${compResult.similarity}%. This identifies high structural homology, suggesting shared genetic origin with localized polymorphisms typical of healthy genetic diversity.`;
    } 
    else if (activeTab === 'mutation' && mutResult) {
      experimentName = 'Genomic Mutation Explorer & Peptide Analysis';
      inputSequence = `Original: ${mutResult.orig} | Mutated: ${mutResult.mut}`;
      method = 'Triplet-reading-frame analysis of substitution and indels with corresponding amino acid translation mapping.';
      resultSummary = `Type: ${mutResult.mutationType} | Severity: ${mutResult.severity}`;
      observation = `Original peptide product: [${mutResult.origProt}] | Mutated peptide product: [${mutResult.mutProt}]. Structural effect identified: ${mutResult.explanation}`;
      conclusion = `Calculated a ${mutResult.severity.toLowerCase()} severity genomic change. Point variations in triplet codes can completely restructure chemical folding pathways of synthesized biological proteins.`;
    } 
    else if (activeTab === 'translator' && transResult) {
      experimentName = 'Codon Translation & Ribosomal Process Simulation';
      inputSequence = transResult.sequence;
      method = 'Standard ribosomal translation utilizing codon mapping. Transcription to messenger RNA (mRNA) followed by peptide synthesis.';
      resultSummary = `Codons Analyzed: ${transResult.codonCount} triplets | Synthesized Protein: ${transResult.proteinPeptide}`;
      observation = `Transcribed mRNA sequence: [${transResult.rnaSeq}]. Assembled ${transResult.codonCount} amino acid residues, including starting initiator codes.`;
      conclusion = `The molecular translation successfully assembled the peptide chain [${transResult.proteinPeptide}]. This highlights the biological mechanism of the central dogma, demonstrating translation from single-letter nucleotide codes to complex protein products.`;
    }
    else if (activeTab === 'ncbi') {
      if (ncbiDb === 'nucleotide') {
        if (!ncbiFetchedSeq || !ncbiFetchedMeta) {
          setNcbiError('Please fetch a nucleotide sequence before generating a report.');
          return;
        }
        experimentName = 'NCBI Nucleotide Reference Sequence Annotation';
        inputSequence = ncbiFetchedSeq.substring(0, 100) + (ncbiFetchedSeq.length > 100 ? '...' : '');
        method = 'Querying live NCBI Entrez Nucleotide databases, streaming public FASTA formats, and sanitizing raw genomic code.';
        resultSummary = `Accession: ${ncbiFetchedMeta.accession} | Title: ${ncbiFetchedMeta.title} | Length: ${ncbiFetchedSeq.length} bp`;
        observation = `Successfully retrieved public reference accession ${ncbiFetchedMeta.accession} from NCBI. Verified sequence length: ${ncbiFetchedMeta.length} bp. Filtered and sanitized sequence content contains ${ncbiFetchedSeq.length} clean ATGC nucleobases.`;
        conclusion = `The biological reference for ${ncbiFetchedMeta.title} was loaded into the workstation. Retrieving verified reference templates directly from NCBI ensures research integrity during subsequent comparative mutations and translation models.`;
      } else {
        if (!ncbiSelectedArticle) {
          setNcbiError('Please select a literature article before generating a report.');
          return;
        }
        experimentName = 'NCBI PubMed Literature Citation & Synthesis';
        inputSequence = `PMID: ${ncbiSelectedArticle.pmid} | Title: ${ncbiSelectedArticle.title}`;
        method = 'Retrieving metadata records from the NCBI Entrez PubMed database to contextualize genomic sequences with current publications.';
        resultSummary = `PMID: ${ncbiSelectedArticle.pmid} | Source: ${ncbiSelectedArticle.journal} (${ncbiSelectedArticle.pubDate})`;
        observation = `Extracted scientific publication "${ncbiSelectedArticle.title}" by authors: ${ncbiSelectedArticle.authors}. Verified PMID reference index: ${ncbiSelectedArticle.pmid}. Digital Object Identifier (DOI): ${ncbiSelectedArticle.doi || 'Not Available'}.`;
        conclusion = `Reviewing peer-reviewed biological literature provides critical peer context for bioinformatics. This literature reference supports genomic investigations regarding molecular gene function and associated phenotypes.`;
      }
    }
    else {
      return; // No results computed yet
    }

    const report: SavedReport = {
      id: reportId,
      experimentName,
      timestamp,
      researchQuestion: `Characterize the molecular structure, composition, and biological traits of the target genomic sequence.`,
      method,
      observation,
      conclusion,
      resultSummary
    };

    setActiveReport(report);
  };

  const handleSaveToPortfolio = () => {
    if (!activeReport) return;
    if (onSaveReport) {
      onSaveReport(activeReport);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const downloadReportFile = () => {
    if (!activeReport) return;
    const text = `================================================================
                    BIOBRIDGE LAB DIAGNOSTICS
                   GENOMIC RESEARCH REPORT CARD
================================================================
Report ID  : ${activeReport.id}
Date       : ${activeReport.timestamp} UTC
Experiment : ${activeReport.experimentName}
----------------------------------------------------------------

[RESEARCH OBJECTIVE]
${activeReport.researchQuestion}

[EXPERIMENTAL METHOD]
${activeReport.method}

[QUANTITATIVE RESULTS]
${activeReport.resultSummary}

[OBSERVATION LOGS]
${activeReport.observation}

[SCIENTIFIC INTERPRETATION & CONCLUSION]
${activeReport.conclusion}

================================================================
           BIOBRIDGE VIRTUAL BIOINFORMATICS WORKSTATION
================================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `biobridge_lab_report_${activeReport.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="virtual-lab-container" data-dna-lab-id="virtual-dna-lab-container">
      
      {/* 1. Header Section */}
      <div className="border-b border-slate-200 pb-5 space-y-2" id="lab-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <FlaskConical className="w-8 h-8 text-teal-600" />
              Virtual Bioinformatics & DNA Lab
            </h1>
            <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              Analyze nucleotide sequences, align homologous genes, inspect mutations, and explore mRNA protein translation through our research workstation.
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 self-start md:self-center bg-teal-50 border border-teal-200 text-teal-800 text-xs px-3 py-1.5 rounded-lg font-mono font-bold uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
            Bioinformatics Suite
          </div>
        </div>
      </div>

       {/* 2. Sample Data Library Section (Pre-built reference datasets) */}
      <div className="bg-slate-50/40 border border-slate-200/50 rounded-xl p-3 md:p-4 shadow-none flex flex-col md:flex-row md:items-center justify-between gap-3" id="sample-data-library">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-bold text-slate-700">Quick-Load Reference:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {REFERENCE_LIBRARY.map(sample => {
              let badgeColor = 'bg-blue-50/60 text-blue-850 hover:bg-blue-100 border-blue-150';
              if (sample.category === 'Plant') {
                badgeColor = 'bg-emerald-50/60 text-emerald-850 hover:bg-emerald-100 border-emerald-150';
              } else if (sample.category === 'Bacterial') {
                badgeColor = 'bg-amber-50/60 text-amber-850 hover:bg-amber-100 border-amber-150';
              }
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleLoadSample(sample)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer shadow-3xs flex items-center gap-1 ${badgeColor}`}
                  title={sample.description}
                >
                  <RefreshCw className="w-2.5 h-2.5 opacity-60" />
                  <span>{sample.label}</span>
                  <span className="text-[9px] opacity-60">({sample.sequence.length}bp)</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsLibraryModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-3xs shrink-0 self-start md:self-auto"
          id="open-sample-library-context-btn"
        >
          <Info className="w-3.5 h-3.5" />
          <span>View All Samples & Details</span>
        </button>
      </div>

      {/* 2.5 Toggleable Lab Data & History Dashboard */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 shadow-3xs" id="all-data-dashboard-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-100">
              <Database className="w-5 h-5 text-teal-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 flex items-center gap-2">
                Experiment Records & Reference Dashboard
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Access a toggleable view of all active analysis sessions, history logs, and historical clinical sequence samples.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDashboardExpanded(!isDashboardExpanded)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border self-start sm:self-center shrink-0 ${
              isDashboardExpanded 
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm hover:bg-slate-850' 
                : 'bg-teal-600 hover:bg-teal-700 text-white border-teal-650 shadow-3xs hover:shadow-2xs'
            }`}
            id="toggle-data-dashboard-btn"
          >
            <History className="w-4 h-4" />
            <span>{isDashboardExpanded ? 'Hide Data Dashboard' : 'Open All-Data Dashboard'}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isDashboardExpanded ? 'bg-teal-650 text-white' : 'bg-white text-teal-700'}`}>
              {pastRuns.length} Runs
            </span>
          </button>
        </div>

        {/* Dashboard Content Panel */}
        {isDashboardExpanded && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100 animate-scale-up" id="dashboard-expanded-view">
            
            {/* Column A: Past Computational Runs Log */}
            <div className="lg:col-span-5 bg-slate-50/50 border border-slate-200/60 rounded-xl p-4.5 space-y-4 flex flex-col justify-between" id="past-runs-column">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-200/65 pb-2">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-800">Past Computational Runs ({pastRuns.length})</span>
                  </div>
                  {pastRuns.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setPastRuns([])}
                      className="text-[10px] text-rose-600 hover:text-rose-800 font-bold hover:underline transition-all cursor-pointer"
                    >
                      Clear Log
                    </button>
                  )}
                </div>

                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1" id="past-runs-list">
                  {pastRuns.length === 0 ? (
                    <div className="text-center py-10 space-y-2 bg-white rounded-lg border border-slate-150 p-4">
                      <HelpCircle className="w-8 h-8 text-slate-350 mx-auto" />
                      <div>
                        <p className="text-xs font-bold text-slate-700">No session logs recorded</p>
                        <p className="text-[10px] text-slate-450">Execute any tool below to automatically store local session results.</p>
                      </div>
                    </div>
                  ) : (
                    pastRuns.map((run, idx) => {
                      let toolColor = 'bg-teal-50 border-teal-200 text-teal-850';
                      if (run.tool === 'comparator') toolColor = 'bg-indigo-50 border-indigo-200 text-indigo-850';
                      else if (run.tool === 'mutation') toolColor = 'bg-rose-50 border-rose-200 text-rose-850';
                      else if (run.tool === 'translator') toolColor = 'bg-amber-50 border-amber-200 text-amber-850';

                      return (
                        <div 
                          key={run.id || idx}
                          className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-3 space-y-2.5 shadow-3xs transition-all relative group"
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border font-mono ${toolColor}`}>
                                {run.toolName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono font-bold">
                                {run.id}
                              </span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-medium font-mono">
                              {run.timestamp.split(' ')[1] || run.timestamp}
                            </span>
                          </div>

                          <div className="space-y-1 text-xs">
                            <div className="font-bold text-slate-850 tracking-tight">{run.summary}</div>
                            <div className="text-[10px] font-mono bg-slate-50 p-1.5 rounded text-slate-500 max-h-16 overflow-y-auto break-all border border-slate-100">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Input Strand:</span>
                              {run.sequenceA.length > 40 ? `${run.sequenceA.substring(0, 38)}...` : run.sequenceA}
                              {run.sequenceB && (
                                <>
                                  <span className="text-[9px] uppercase font-bold text-slate-400 block mt-1.5 mb-0.5">Strand B:</span>
                                  {run.sequenceB.length > 40 ? `${run.sequenceB.substring(0, 38)}...` : run.sequenceB}
                                </>
                              )}
                            </div>
                            <p className="text-[10.5px] leading-relaxed text-slate-600 font-medium">{run.details}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => loadPastRun(run)}
                            className="w-full py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300 text-slate-700 border border-slate-200 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <RefreshCw className="w-2.5 h-2.5 text-slate-400 group-hover:text-teal-650" />
                            Load Run into Workspace
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {pastRuns.length > 0 && (
                <div className="bg-white border border-slate-150 rounded-lg p-2.5 text-[10px] text-slate-500 leading-normal font-medium mt-3">
                  <span className="font-bold text-slate-700 font-mono uppercase text-[9px] block mb-0.5">• Quick-Rerun:</span>
                  Clicking "Load Run" restores the sequences directly and switches to the correct workspace tab instantly.
                </div>
              )}
            </div>

            {/* Column B: Historical Experiment Samples Directory */}
            <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200/60 rounded-xl p-4.5 space-y-4 flex flex-col" id="historical-directory-column">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/65 pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-800">Historical Genomic Templates & Clinical Variants</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 border border-teal-150 rounded-full">
                  {DETAILED_SAMPLE_METADATA.length} Reference Materials
                </span>
              </div>

              {/* Dashboard search filters */}
              <div className="space-y-2.5">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    value={dashboardSearch}
                    onChange={(e) => setDashboardSearch(e.target.value)}
                    placeholder="Search templates by origin, codons, function, features..."
                    className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 shadow-3xs"
                  />
                </div>

                <div className="flex flex-wrap gap-1 pb-1">
                  {['All', 'Human', 'Plant', 'Bacterial', 'Viral', 'Clinical', 'Comparative'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setDashboardCategory(cat)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer whitespace-nowrap border ${
                        dashboardCategory === cat
                          ? 'bg-teal-600 text-white border-teal-650 shadow-3xs'
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matched templates directory list */}
              <div className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1 flex-1" id="dashboard-samples-list">
                {(() => {
                  const filtered = DETAILED_SAMPLE_METADATA.filter(sample => {
                    const matchesCategory = dashboardCategory === 'All' || sample.category === dashboardCategory;
                    const query = dashboardSearch.toLowerCase().trim();
                    const matchesSearch = !query ||
                      sample.name.toLowerCase().includes(query) ||
                      sample.origin.toLowerCase().includes(query) ||
                      sample.function.toLowerCase().includes(query) ||
                      sample.scientificContext.toLowerCase().includes(query) ||
                      sample.features.some(f => f.toLowerCase().includes(query));
                    return matchesCategory && matchesSearch;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-10 bg-white rounded-lg border border-slate-150 p-4">
                        <p className="text-xs font-bold text-slate-700">No matching genomic templates found</p>
                        <p className="text-[10px] text-slate-450">Try removing keywords or changing category filters.</p>
                      </div>
                    );
                  }

                  return filtered.map(sample => {
                    let badgeStyle = 'bg-blue-50 text-blue-800 border-blue-150/50';
                    if (sample.category === 'Plant') badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-150/50';
                    else if (sample.category === 'Bacterial') badgeStyle = 'bg-amber-50 text-amber-800 border-amber-150/50';
                    else if (sample.category === 'Viral') badgeStyle = 'bg-purple-50 text-purple-800 border-purple-150/50';
                    else if (sample.category === 'Clinical') badgeStyle = 'bg-rose-50 text-rose-800 border-rose-150/50';
                    else if (sample.category === 'Comparative') badgeStyle = 'bg-slate-100 text-slate-850 border-slate-300/50';

                    return (
                      <div 
                        key={sample.id}
                        className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 hover:border-teal-200 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border font-mono ${badgeStyle}`}>
                              {sample.category}
                            </span>
                            <span className="text-[9.5px] text-slate-400 font-bold font-mono">
                              Length: {sample.length}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-[12px] font-extrabold text-slate-900">{sample.name}</h4>
                            <p className="text-[10px] text-slate-450 font-mono font-bold leading-none">{sample.origin}</p>
                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed line-clamp-2 mt-1">{sample.function}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-slate-50 pt-2.5">
                          <div className="flex flex-wrap gap-1">
                            {sample.features.slice(0, 1).map((f, i) => (
                              <span key={i} className="text-[8.5px] font-bold text-slate-400 bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded">
                                {f}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleLoadDashboardSample(sample)}
                            className="px-2.5 py-1 bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-200 hover:border-teal-600 rounded-md text-[10.5px] font-bold text-teal-800 transition-all cursor-pointer flex items-center gap-1 shrink-0 shadow-3xs"
                          >
                            <span>Load & Go to Tool</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 3. Bioinformatics Toolbox (Research Toolkit Tabs) */}
      <div className="bg-white border-2 border-teal-600 rounded-2xl shadow-[0_15px_45px_-10px_rgba(13,148,136,0.14)] overflow-hidden ring-1 ring-teal-600/10" id="research-toolkit-suite">
        
        {/* Tab Header Selector */}
        <div className="bg-slate-50/80 border-b border-slate-200 p-2 flex flex-wrap gap-1 md:gap-1.5" id="toolkit-tab-header">
          {[
            { id: 'analyzer', label: 'DNA Analyzer', icon: Search, desc: 'Calculates base counts, frequencies, and GC/AT content.' },
            { id: 'comparator', label: 'Sequence Comparator', icon: GitCompare, desc: 'Aligns and compares two sequences side-by-side.' },
            { id: 'mutation', label: 'Mutation Explorer', icon: Layers, desc: 'Analyzes substitutions, deletions, and reading frames.' },
            { id: 'translator', label: 'Translation Explorer', icon: Activity, desc: 'Converts DNA to RNA and amino acid peptide chains.' },
            { id: 'ncbi', label: 'NCBI Database Search', icon: Database, desc: 'Query NCBI Nucleotide database, fetch live FASTA sequences, and analyze them.' }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                title={tab.desc}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-600 text-white shadow-sm font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                id={`toolkit-tab-btn-${tab.id}`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Contents */}
        <div className="p-6 md:p-8" id="toolkit-active-workspace">

          {/* TOOL 1: DNA ANALYZER */}
          {activeTab === 'analyzer' && (
            <div className="space-y-6" id="tool-analyzer-panel">
              {/* Pre-use Explanation */}
              <div className="p-4 bg-teal-50/40 border border-teal-150 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] bg-teal-100 border border-teal-200 text-teal-800 font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider block w-max">
                  Tool Explanation
                </span>
                <h4 className="font-extrabold text-teal-950">How the DNA Analyzer Works</h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The DNA Analyzer parses a genetic string, outputs quantitative base counts, and calculates its <strong>GC content ratio</strong>. Guanine-Cytosine pairings are held by three hydrogen bonds, meaning GC-rich regions exhibit high thermal stability and reside predominantly in gene-dense portions of chromosomes. The tool also designs the corresponding <strong>complementary DNA</strong> and <strong>reverse complement</strong> strands.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Input Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <label htmlFor="analyzer-seq-area" className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                        Sequence to Analyze (DNA):
                      </label>
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) return;
                          const preset = ANALYZER_PRESETS.find(p => p.id === val);
                          if (preset && preset.seq) {
                            setAnalyzerSeq(preset.seq);
                            setAnalyzerResult(null);
                          }
                        }}
                        className="bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-teal-300 rounded-lg text-[11px] font-bold px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-3xs transition-all max-w-full"
                      >
                        <option value="">🧪 Load Sample Preset</option>
                        {ANALYZER_PRESETS.map(preset => (
                          <option key={preset.id} value={preset.id}>
                            [{preset.category}] {preset.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      id="analyzer-seq-area"
                      value={analyzerSeq}
                      onChange={(e) => setAnalyzerSeq(e.target.value)}
                      placeholder="Enter DNA sequence (A, T, G, C)"
                      className="w-full bg-slate-50/40 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-36 leading-relaxed shadow-3xs"
                    />
                    <p className="text-[10px] text-slate-400 font-medium">
                      Note: Lowercase is converted automatically, and spaces/newlines are ignored.
                    </p>
                    <div className="flex gap-1.5 mt-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const rand = generateRandomDNA(75);
                          setAnalyzerSeq(rand);
                          executeAnalyzer(rand);
                        }}
                        className="flex-1 py-1.5 px-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 hover:border-teal-300 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1"
                        id="sandbox-random-dna-btn"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                        Generate & Run Random DNA (75bp)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAnalyzerSeq('');
                          setAnalyzerResult(null);
                          setAnalyzerError('');
                        }}
                        className="py-1.5 px-2.5 bg-slate-150 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs"
                        id="sandbox-clear-dna-btn"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {analyzerError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{analyzerError}</div>
                    </div>
                  )}

                  <button
                    onClick={() => executeAnalyzer()}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-3xs"
                  >
                    <Activity className="w-4 h-4" />
                    Analyze Composition
                  </button>
                </div>

                {/* Output Panel */}
                <div className="lg:col-span-7">
                  {analyzerResult ? (
                    <div className="space-y-5 animate-fade-in" id="analyzer-result-box">
                      
                      {/* Metric Widgets */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Sequence Length</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-slate-800">{analyzerResult.length}</span>
                            <span className="text-[10px] font-mono text-slate-400">bp</span>
                          </div>
                        </div>

                        <div className="p-3.5 bg-emerald-50/30 border border-emerald-100 rounded-xl space-y-1">
                          <span className="text-[9px] text-emerald-800 font-mono font-bold uppercase block tracking-wider">GC Content</span>
                          <span className="text-xl font-black text-emerald-600">{analyzerResult.gcPercent}%</span>
                        </div>

                        <div className="p-3.5 bg-blue-50/30 border border-blue-100 rounded-xl space-y-1">
                          <span className="text-[9px] text-blue-800 font-mono font-bold uppercase block tracking-wider">AT Content</span>
                          <span className="text-xl font-black text-blue-600">{analyzerResult.atPercent}%</span>
                        </div>
                      </div>

                      {/* Base Frequency Table */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider text-[10px] font-mono">Base Frequency & Distribution</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { base: 'Adenine (A)', count: analyzerResult.counts.A, freq: analyzerResult.frequencies.A, color: 'border-blue-200 bg-blue-500' },
                            { base: 'Thymine (T)', count: analyzerResult.counts.T, freq: analyzerResult.frequencies.T, color: 'border-sky-200 bg-sky-500' },
                            { base: 'Guanine (G)', count: analyzerResult.counts.G, freq: analyzerResult.frequencies.G, color: 'border-emerald-200 bg-emerald-500' },
                            { base: 'Cytosine (C)', count: analyzerResult.counts.C, freq: analyzerResult.frequencies.C, color: 'border-teal-200 bg-teal-500' }
                          ].map(item => (
                            <div key={item.base} className="bg-white border border-slate-150 p-2.5 rounded-lg text-center space-y-1">
                              <span className="text-[10px] font-bold text-slate-500 block">{item.base}</span>
                              <span className="text-sm font-black text-slate-800 block">{item.count}</span>
                              <span className="text-[10px] font-mono font-bold text-slate-400 block">{item.freq}%</span>
                              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                <div className={`${item.color} h-full`} style={{ width: `${item.freq}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic Interactive Sequence Visualizer */}
                      <SequenceVisualizer 
                        sequence={analyzerResult.sequence} 
                        type="dna" 
                        title="Interactive Nucleotide Map" 
                        id="analyzer-sequence-visualizer" 
                      />

                      {/* Antiparallel Strands */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5 text-xs">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Original Template (5' → 3'):</span>
                          <div className="bg-white p-2 border border-slate-150 rounded-md font-mono text-slate-700 break-all">{analyzerResult.sequence}</div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Complementary Strand (3' ← 5'):</span>
                          <div className="bg-white p-2 border border-slate-150 rounded-md font-mono text-slate-700 break-all">{analyzerResult.complement}</div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-mono font-bold text-teal-700 block uppercase">Reverse Complement (5' → 3'):</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(analyzerResult.reverseComplement, 'revcomp')}
                              className="text-[10px] font-bold font-mono text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedText === 'revcomp' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              Copy
                            </button>
                          </div>
                          <div className="bg-teal-50/40 p-2.5 border border-teal-150 rounded-md font-mono text-teal-900 font-bold break-all">{analyzerResult.reverseComplement}</div>
                        </div>

                        <div className="p-2.5 bg-slate-100 rounded-lg text-[10px] text-slate-500 font-medium">
                          <span className="font-bold text-slate-600 block uppercase tracking-wide text-[9px] mb-0.5">Biological Use:</span>
                          Reverse complementation matches sequence coordinates to the complimentary standard double-helix strand in its proper 5' to 3' replication orientation. This is vital for designing DNA PCR primers and matching genomic sequencing reads.
                        </div>
                      </div>

                      {/* Report generation button */}
                      <div className="flex justify-end">
                        <button
                          onClick={handleGenerateReport}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-3xs"
                        >
                          <FileText className="w-4 h-4" />
                          Generate Research Report
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2 h-full min-h-[250px]">
                      <FlaskConical className="w-10 h-10 text-slate-300 animate-pulse" />
                      <h4 className="text-sm font-bold text-slate-800">No Analysis Calculated</h4>
                      <p className="text-xs text-slate-400 max-w-xs font-medium">Specify your DNA sequence and click Analyze to view composition percentages and complementarity.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 2: SEQUENCE COMPARATOR */}
          {activeTab === 'comparator' && (
            <div className="space-y-6" id="tool-comparator-panel">
              {/* Pre-use Explanation */}
              <div className="p-4 bg-teal-50/40 border border-teal-150 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] bg-teal-100 border border-teal-200 text-teal-800 font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider block w-max">
                  Tool Explanation
                </span>
                <h4 className="font-extrabold text-teal-950">How the Sequence Comparator Works</h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The Sequence Comparator maps two DNA strands side-by-side. If the sequences exhibit unequal lengths, the comparison automatically pads them with gap characters (<code>-</code>) representing indel deletion points. Point-by-point alignments help identify conserved genetic homology and isolate mutation sites.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Input Panel */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Preset Selector */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 shadow-3xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Compare Presets:</span>
                      <span className="text-[9px] text-teal-600 font-bold font-mono">Conserved Pairs</span>
                    </div>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        const preset = COMPARATOR_PRESETS.find(p => p.id === val);
                        if (preset && preset.seqA && preset.seqB) {
                          setCompSeqA(preset.seqA);
                          setCompSeqB(preset.seqB);
                          setCompResult(null);
                        }
                      }}
                      className="w-full bg-white text-slate-700 border border-slate-200 hover:border-teal-300 rounded-lg text-xs font-bold px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-3xs transition-all"
                    >
                      <option value="">🧪 Load Homology Preset...</option>
                      {COMPARATOR_PRESETS.map(preset => (
                        <option key={preset.id} value={preset.id}>
                          [{preset.category}] {preset.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="comp-seq-a" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                      <span>Sequence A:</span>
                      <span className="font-mono text-slate-400 text-[10px]">{compSeqA.length} bp</span>
                    </label>
                    <textarea
                      id="comp-seq-a"
                      value={compSeqA}
                      onChange={(e) => setCompSeqA(e.target.value)}
                      placeholder="Enter Sequence A"
                      className="w-full bg-slate-50/40 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-24 leading-relaxed shadow-3xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="comp-seq-b" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                      <span>Sequence B:</span>
                      <span className="font-mono text-slate-400 text-[10px]">{compSeqB.length} bp</span>
                    </label>
                    <textarea
                      id="comp-seq-b"
                      value={compSeqB}
                      onChange={(e) => setCompSeqB(e.target.value)}
                      placeholder="Enter Sequence B"
                      className="w-full bg-slate-50/40 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-24 leading-relaxed shadow-3xs"
                    />
                  </div>

                  <div className="flex gap-1.5 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const baseSeq = generateRandomDNA(45);
                        let mutSeq = baseSeq;
                        for (let i = 0; i < 4; i++) {
                          mutSeq = injectRandomMutation(mutSeq);
                        }
                        setCompSeqA(baseSeq);
                        setCompSeqB(mutSeq);
                        setTimeout(() => executeComparator(baseSeq, mutSeq), 10);
                      }}
                      className="flex-1 py-1.5 px-2 bg-teal-50 hover:bg-teal-100 text-teal-850 border border-teal-200 hover:border-teal-300 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1"
                      id="sandbox-random-compare-btn"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                      Generate Homologous Pair (45bp)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCompSeqA('');
                        setCompSeqB('');
                        setCompResult(null);
                        setCompError('');
                      }}
                      className="py-1.5 px-2.5 bg-slate-150 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs"
                      id="sandbox-clear-compare-btn"
                    >
                      Clear
                    </button>
                  </div>

                  {compError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{compError}</div>
                    </div>
                  )}

                  <button
                    onClick={() => executeComparator()}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-3xs"
                  >
                    <GitCompare className="w-4 h-4" />
                    Compare DNA Sequences
                  </button>
                </div>

                {/* Output Panel */}
                <div className="lg:col-span-7">
                  {compResult ? (
                    <div className="space-y-5 animate-fade-in" id="comp-result-box">
                      
                      {/* Comparison Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Similarity</span>
                          <span className="text-lg font-black text-teal-600">{compResult.similarity}%</span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Matches</span>
                          <span className="text-lg font-black text-slate-800">{compResult.matches} bp</span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Mismatches</span>
                          <span className="text-lg font-black text-rose-600">{compResult.mismatches} bp</span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Gaps / Indels</span>
                          <span className="text-lg font-black text-slate-500">{compResult.gaps} bp</span>
                        </div>
                      </div>

                      {/* Interactive Strand Inspector */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider text-[10px] font-mono">Interactive Strand Inspector</span>
                          <div className="flex bg-slate-200/60 rounded-lg p-0.5 border border-slate-200 w-max shadow-3xs">
                            <button 
                              type="button"
                              onClick={() => setComparatorInspectorStrand('A')} 
                              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                comparatorInspectorStrand === 'A' ? 'bg-teal-600 text-white shadow-3xs' : 'text-slate-600 hover:text-slate-800'
                              }`}
                            >
                              Strand A
                            </button>
                            <button 
                              type="button"
                              onClick={() => setComparatorInspectorStrand('B')} 
                              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                comparatorInspectorStrand === 'B' ? 'bg-teal-600 text-white shadow-3xs' : 'text-slate-600 hover:text-slate-800'
                              }`}
                            >
                              Strand B
                            </button>
                          </div>
                        </div>
                        <SequenceVisualizer 
                          sequence={comparatorInspectorStrand === 'A' ? compResult.seqA : compResult.seqB} 
                          type="dna" 
                          title={`Strand ${comparatorInspectorStrand} Analysis`} 
                          id={`comparator-strand-${comparatorInspectorStrand}-visualizer`} 
                        />
                      </div>

                      {/* Visual Alignment Map */}
                      <div className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-900 space-y-3 font-mono text-xs overflow-x-auto shadow-inner">
                        <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider mb-1">Visual Base Alignment Map:</span>
                        
                        <div className="space-y-2.5 pb-2">
                          {/* Strand A */}
                          <div className="flex items-center gap-3">
                            <span className="w-16 text-[9px] text-slate-400 font-bold uppercase tracking-wider">Strand A:</span>
                            <div className="flex gap-1">
                              {compResult.paddedA.split('').map((char: string, idx: number) => (
                                <span 
                                  key={idx} 
                                  className={`w-6 h-7 flex items-center justify-center rounded font-bold ${
                                    char === '-' ? 'bg-slate-800 text-slate-500' :
                                    compResult.paddedA[idx] === compResult.paddedB[idx] ? 'bg-slate-900 text-teal-400' : 'bg-rose-950 text-rose-300'
                                  }`}
                                >
                                  {char}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Matching Bar */}
                          <div className="flex items-center gap-3">
                            <span className="w-16 shrink-0"></span>
                            <div className="flex gap-1">
                              {compResult.paddedA.split('').map((_char: string, idx: number) => {
                                const isMatch = compResult.paddedA[idx] === compResult.paddedB[idx] && compResult.paddedA[idx] !== '-';
                                return (
                                  <span key={idx} className="w-6 text-center text-xs font-bold text-slate-600">
                                    {isMatch ? '|' : '·'}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Strand B */}
                          <div className="flex items-center gap-3">
                            <span className="w-16 text-[9px] text-slate-400 font-bold uppercase tracking-wider">Strand B:</span>
                            <div className="flex gap-1">
                              {compResult.paddedB.split('').map((char: string, idx: number) => (
                                <span 
                                  key={idx} 
                                  className={`w-6 h-7 flex items-center justify-center rounded font-bold ${
                                    char === '-' ? 'bg-slate-800 text-slate-500' :
                                    compResult.paddedA[idx] === compResult.paddedB[idx] ? 'bg-slate-900 text-teal-400' : 'bg-rose-950 text-rose-300'
                                  }`}
                                >
                                  {char}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 text-[10px] text-slate-400 pt-2 border-t border-slate-900">
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-slate-900 border border-teal-950 inline-block" />
                            <span className="text-teal-400 font-bold">Match</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-rose-950 border border-rose-900 inline-block" />
                            <span className="text-rose-300 font-bold">Mismatch</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded bg-slate-800 inline-block" />
                            <span>Gap / Indel</span>
                          </div>
                        </div>
                      </div>

                      {/* Variation Loci Table */}
                      {compResult.differences.length > 0 ? (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">List of Divergence Loci:</span>
                          <div className="max-h-36 overflow-y-auto space-y-1.5 pr-2">
                            {compResult.differences.map((diff: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-slate-150 rounded-lg">
                                <span className="font-mono text-slate-500">Coordinate position: <strong>{diff.pos}</strong></span>
                                <span className="font-mono font-bold text-slate-700">
                                  {diff.charA === '-' ? 'Gap in A' : `Base ${diff.charA}`} 
                                  <span className="mx-2 text-slate-400">→</span> 
                                  {diff.charB === '-' ? 'Gap in B' : `Base ${diff.charB}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                          Perfect homology! No single nucleotide differences or gaps located.
                        </div>
                      )}

                      {/* Report generation button */}
                      <div className="flex justify-end">
                        <button
                          onClick={handleGenerateReport}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-3xs"
                        >
                          <FileText className="w-4 h-4" />
                          Generate Research Report
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2 h-full min-h-[250px]">
                      <GitCompare className="w-10 h-10 text-slate-300 animate-pulse" />
                      <h4 className="text-sm font-bold text-slate-800">No Comparison Computed</h4>
                      <p className="text-xs text-slate-400 max-w-xs font-medium">Input or load two DNA sequence strings and click Compare to evaluate alignment homology.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 3: MUTATION EXPLORER */}
          {activeTab === 'mutation' && (
            <div className="space-y-6" id="tool-mutation-panel">
              {/* Pre-use Explanation */}
              <div className="p-4 bg-teal-50/40 border border-teal-150 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] bg-teal-100 border border-teal-200 text-teal-800 font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider block w-max">
                  Tool Explanation
                </span>
                <h4 className="font-extrabold text-teal-950">How the Mutation Explorer Works</h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The Mutation Explorer maps point substitutions or insertions/deletions (indels) against a baseline gene. The tool also translates both nucleotide strings into <strong>peptide amino acid arrays</strong>, diagnosing whether a point change is a <em>Silent</em> mutation (no amino acid shift), <em>Missense</em> mutation (one residue shift), or <em>Nonsense</em> mutation (premature STOP truncation).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Input Panel */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Preset Selector */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 shadow-3xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mutation Presets:</span>
                      <span className="text-[9px] text-teal-600 font-bold font-mono">Clinical Scenarios</span>
                    </div>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        const preset = MUTATION_PRESETS.find(p => p.id === val);
                        if (preset && preset.seqOriginal && preset.seqModified) {
                          setMutOriginal(preset.seqOriginal);
                          setMutModified(preset.seqModified);
                          setMutResult(null);
                        }
                      }}
                      className="w-full bg-white text-slate-700 border border-slate-200 hover:border-teal-300 rounded-lg text-xs font-bold px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-3xs transition-all"
                    >
                      <option value="">🧪 Load Mutation Preset...</option>
                      {MUTATION_PRESETS.map(preset => (
                        <option key={preset.id} value={preset.id}>
                          [{preset.category}] {preset.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="mut-orig" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                      <span>Baseline Gene Template (Reference):</span>
                      <span className="font-mono text-slate-400 text-[10px]">{mutOriginal.length} bp</span>
                    </label>
                    <textarea
                      id="mut-orig"
                      value={mutOriginal}
                      onChange={(e) => setMutOriginal(e.target.value)}
                      placeholder="Enter original baseline DNA"
                      className="w-full bg-slate-50/40 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-24 leading-relaxed shadow-3xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="mut-mod" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                      <span>Test / Mutated DNA Strand:</span>
                      <span className="font-mono text-slate-400 text-[10px]">{mutModified.length} bp</span>
                    </label>
                    <textarea
                      id="mut-mod"
                      value={mutModified}
                      onChange={(e) => setMutModified(e.target.value)}
                      placeholder="Enter mutated DNA"
                      className="w-full bg-slate-50/40 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-24 leading-relaxed shadow-3xs"
                    />
                  </div>

                  <div className="flex gap-1.5 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const orig = generateRandomDNA(30);
                        const modified = injectRandomMutation(orig);
                        setMutOriginal(orig);
                        setMutModified(modified);
                        setTimeout(() => executeMutationExplorer(orig, modified), 10);
                      }}
                      className="flex-1 py-1.5 px-2 bg-teal-50 hover:bg-teal-100 text-teal-850 border border-teal-200 hover:border-teal-300 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1"
                      id="sandbox-random-mutation-btn"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                      Generate & Mutate Strand (30bp)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMutOriginal('');
                        setMutModified('');
                        setMutResult(null);
                        setMutError('');
                      }}
                      className="py-1.5 px-2.5 bg-slate-150 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs"
                      id="sandbox-clear-mutation-btn"
                    >
                      Clear
                    </button>
                  </div>

                  {mutError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{mutError}</div>
                    </div>
                  )}

                  <button
                    onClick={() => executeMutationExplorer()}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-3xs"
                  >
                    <Layers className="w-4 h-4" />
                    Inspect Mutational Changes
                  </button>
                </div>

                {/* Output Panel */}
                <div className="lg:col-span-7">
                  {mutResult ? (
                    <div className="space-y-5 animate-fade-in" id="mut-result-box">
                      
                      {/* Diagnostic Headers */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Mutational Diagnostic Type</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-black font-mono uppercase ${
                            mutResult.severity === 'High' ? 'bg-rose-100 text-rose-800' :
                            mutResult.severity === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                          }`}>
                            Severity: {mutResult.severity}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900">{mutResult.mutationType}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{mutResult.explanation}</p>
                      </div>

                      {/* Interactive DNA Strand Inspector */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider text-[10px] font-mono">Interactive Sequence Inspector</span>
                          <div className="flex bg-slate-200/60 rounded-lg p-0.5 border border-slate-200 w-max shadow-3xs">
                            <button 
                              type="button"
                              onClick={() => setMutationInspectorStrand('Original')} 
                              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                mutationInspectorStrand === 'Original' ? 'bg-teal-600 text-white shadow-3xs' : 'text-slate-600 hover:text-slate-800'
                              }`}
                            >
                              Baseline (Reference)
                            </button>
                            <button 
                              type="button"
                              onClick={() => setMutationInspectorStrand('Mutated')} 
                              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                mutationInspectorStrand === 'Mutated' ? 'bg-teal-600 text-white shadow-3xs' : 'text-slate-600 hover:text-slate-800'
                              }`}
                            >
                              Mutated (Test)
                            </button>
                          </div>
                        </div>
                        <SequenceVisualizer 
                          sequence={mutationInspectorStrand === 'Original' ? mutResult.orig : mutResult.mut} 
                          type="dna" 
                          title={`${mutationInspectorStrand} DNA Template`} 
                          id={`mutation-strand-${mutationInspectorStrand}-visualizer`} 
                        />
                      </div>

                      {/* Peptide Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Baseline Peptide String:</span>
                          <div className="bg-white p-2 border border-slate-150 rounded font-mono text-xs font-bold text-slate-700 break-all">
                            {mutResult.origProt}
                          </div>
                        </div>

                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Mutated Peptide String:</span>
                          <div className="bg-white p-2 border border-slate-150 rounded font-mono text-xs font-bold text-rose-800 break-all">
                            {mutResult.mutProt}
                          </div>
                        </div>
                      </div>

                      {/* Detailed mismatch points */}
                      {mutResult.differences.length > 0 && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Point Variations Located:</span>
                          <div className="max-h-28 overflow-y-auto space-y-1.5 pr-2">
                            {mutResult.differences.map((diff: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-slate-150 rounded-lg">
                                <span className="font-mono text-slate-500">Base coordinate position: <strong>{diff.pos}</strong></span>
                                <span className="font-mono font-bold text-slate-800">
                                  Base {diff.from} <span className="mx-1 text-slate-400">→</span> Base {diff.to}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Report generation button */}
                      <div className="flex justify-end">
                        <button
                          onClick={handleGenerateReport}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-3xs"
                        >
                          <FileText className="w-4 h-4" />
                          Generate Research Report
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2 h-full min-h-[250px]">
                      <Layers className="w-10 h-10 text-slate-300 animate-pulse" />
                      <h4 className="text-sm font-bold text-slate-800">No Mutational Scan Computed</h4>
                      <p className="text-xs text-slate-400 max-w-xs font-medium">Input baseline gene references on the left and click Scan to trace exact phenotypic changes in translated peptides.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 4: TRANSLATION EXPLORER */}
          {activeTab === 'translator' && (
            <div className="space-y-6" id="tool-translator-panel">
              {/* Pre-use Explanation */}
              <div className="p-4 bg-teal-50/40 border border-teal-150 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] bg-teal-100 border border-teal-200 text-teal-800 font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider block w-max">
                  Tool Explanation
                </span>
                <h4 className="font-extrabold text-teal-950">How the Translation Explorer Works</h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The Translation Explorer simulates standard transcription and translation models. Transcription converts DNA into a mobile <strong>messenger RNA (mRNA)</strong> transcript, swapping Thymine (T) for Uracil (U). Ribosomes then parse the transcript in 3-character <strong>triplet codons</strong>, binding complementary tRNA molecules carrying specific <strong>amino acid residues</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Input Panel */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Preset Selector */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 shadow-3xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Translation Presets:</span>
                      <span className="text-[9px] text-teal-600 font-bold font-mono">Peptide Expression</span>
                    </div>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        const preset = TRANSLATOR_PRESETS.find(p => p.id === val);
                        if (preset && preset.seq) {
                          setTransSeq(preset.seq);
                          setTransResult(null);
                        }
                      }}
                      className="w-full bg-white text-slate-700 border border-slate-200 hover:border-teal-300 rounded-lg text-xs font-bold px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-3xs transition-all"
                    >
                      <option value="">🧪 Load Translation Preset...</option>
                      {TRANSLATOR_PRESETS.map(preset => (
                        <option key={preset.id} value={preset.id}>
                          [{preset.category}] {preset.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="translator-seq" className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                      <span>DNA Sequence Template:</span>
                      <span className="font-mono text-slate-400 text-[10px]">{transSeq.length} bp</span>
                    </label>
                    <textarea
                      id="translator-seq"
                      value={transSeq}
                      onChange={(e) => setTransSeq(e.target.value)}
                      placeholder="Enter DNA (e.g. ATG...)"
                      className="w-full bg-slate-50/40 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 h-36 leading-relaxed shadow-3xs"
                    />
                  </div>

                  <div className="flex gap-1.5 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const orf = generatePerfectORF(10);
                        setTransSeq(orf);
                        setTimeout(() => executeTranslator(orf), 10);
                      }}
                      className="flex-1 py-1.5 px-2 bg-teal-50 hover:bg-teal-100 text-teal-850 border border-teal-200 hover:border-teal-300 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1"
                      id="sandbox-random-translate-btn"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                      Generate ORF Chain (30bp)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTransSeq('');
                        setTransResult(null);
                        setTransError('');
                      }}
                      className="py-1.5 px-2.5 bg-slate-150 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-3xs"
                      id="sandbox-clear-translate-btn"
                    >
                      Clear
                    </button>
                  </div>

                  {transError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{transError}</div>
                    </div>
                  )}

                  <button
                    onClick={() => executeTranslator()}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-3xs"
                  >
                    <Activity className="w-4 h-4" />
                    Translate DNA Sequence
                  </button>
                </div>

                {/* Output Panel */}
                <div className="lg:col-span-7">
                  {transResult ? (
                    <div className="space-y-6 animate-fade-in" id="trans-result-box">
                      
                      {/* Transcription mRNA transcript banner */}
                      <SequenceVisualizer 
                        sequence={transResult.rnaSeq} 
                        type="rna" 
                        title="Transcribed mRNA Copy" 
                        id="translator-mrna-sequence-visualizer" 
                      />

                      {/* Ribosome Translation Chain */}
                      <div className="space-y-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Assembled Ribosomal Codon Chain:</span>
                        
                        <div className="flex flex-wrap gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl" id="codon-pods-grid">
                          {transResult.codons.map((codon: any, idx: number) => (
                            <div 
                              key={idx} 
                              className="bg-white border border-slate-200 rounded-xl p-3 text-center space-y-1.5 flex-1 min-w-[100px] max-w-[140px] hover:border-teal-500 hover:shadow-3xs transition-all cursor-help group"
                              title={`${codon.aa ? codon.aa.name : 'Unknown Amino Acid'} - Codon: ${codon.dna}`}
                            >
                              <div className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                                CODON {idx + 1}
                              </div>
                              <div className="font-mono text-xs text-slate-600 flex justify-center gap-1.5">
                                <span className="font-bold">DNA: {codon.dna}</span>
                              </div>
                              <div className="font-mono text-xs text-teal-700 flex justify-center gap-1.5">
                                <span className="font-extrabold">RNA: {codon.rna}</span>
                              </div>
                              <div className="py-1 bg-teal-50/50 border border-teal-100 rounded-lg">
                                <span className="font-mono font-black text-xs text-teal-900 block">
                                  {codon.aa ? codon.aa.abbrev : '?'}
                                </span>
                              </div>
                              <div className="text-[9px] text-slate-500 font-medium truncate">
                                {codon.aa ? codon.aa.name : 'Unknown'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assembled peptide string */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block tracking-wider">Completed Peptide Primary Structure:</span>
                        <div className="bg-white p-2.5 border border-slate-150 rounded font-mono text-xs font-black text-slate-800 break-all leading-normal flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block animate-pulse shrink-0" />
                          {transResult.proteinPeptide}
                        </div>
                      </div>

                      {/* Report generation button */}
                      <div className="flex justify-end">
                        <button
                          onClick={handleGenerateReport}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-3xs"
                        >
                          <FileText className="w-4 h-4" />
                          Generate Research Report
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2 h-full min-h-[250px]">
                      <Activity className="w-10 h-10 text-slate-300 animate-pulse" />
                      <h4 className="text-sm font-bold text-slate-800">No Peptide Translated</h4>
                      <p className="text-xs text-slate-400 max-w-xs font-medium">Input baseline templates on the left and click Translate to explore central dogma ribosomal transcription and peptide assemblies.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 5: NCBI DATABASE SEARCH & FETCH */}
          {activeTab === 'ncbi' && (
            <div className="space-y-6 animate-fade-in" id="tool-ncbi-panel">
              {/* Pre-use Explanation */}
              <div className="p-4 bg-teal-50/40 border border-teal-150 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] bg-teal-100 border border-teal-200 text-teal-800 font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider block w-max">
                  Live NCBI Database Integration
                </span>
                <h4 className="font-extrabold text-teal-950">NCBI Entrez Query Engine</h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Query the official National Center for Biotechnology Information (NCBI) database in real time. Search for genomic nucleotide sequence records or peer-reviewed scientific literature (PubMed) to context-ground your gene annotations, molecular hypotheses, and classroom lab reports.
                </p>
              </div>

              {/* Database Mode Switcher Toggle */}
              <div className="flex flex-wrap gap-1 bg-slate-100/80 p-1 rounded-xl w-max border border-slate-200 shadow-3xs" id="ncbi-db-selector">
                <button
                  type="button"
                  onClick={() => setNcbiDb('nucleotide')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    ncbiDb === 'nucleotide'
                      ? 'bg-white border border-slate-200 text-teal-800 shadow-3xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Dna className="w-3.5 h-3.5 text-teal-600" />
                  <span>Sequences (DNA)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNcbiDb('protein')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    ncbiDb === 'protein'
                      ? 'bg-white border border-slate-200 text-teal-800 shadow-3xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  <span>Proteins</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNcbiDb('pubmed')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    ncbiDb === 'pubmed'
                      ? 'bg-white border border-slate-200 text-teal-800 shadow-3xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Literature</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Search Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5 shadow-3xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                      {ncbiDb === 'nucleotide' ? 'Search Nucleotide Database:' : ncbiDb === 'protein' ? 'Search Protein Database:' : 'Search PubMed Bibliography:'}
                    </span>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={ncbiSearchQuery}
                          onChange={(e) => setNcbiSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleNcbiSearch();
                          }}
                          placeholder={ncbiDb === 'nucleotide' ? 'e.g., "human insulin" or "HBB"' : ncbiDb === 'protein' ? 'e.g., "insulin human" or "myoglobin"' : 'e.g., "CRISPR gene therapy human"'}
                          className="w-full bg-white text-slate-800 border border-slate-200 hover:border-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-bold pl-8 pr-2 py-2 focus:outline-none transition-all shadow-3xs"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      </div>
                      <button
                        onClick={handleNcbiSearch}
                        disabled={ncbiIsSearching}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-3xs cursor-pointer transition-all shrink-0"
                      >
                        {ncbiIsSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                        {ncbiIsSearching ? 'Searching...' : 'Search'}
                      </button>
                    </div>

                    {/* Quick presets list */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Quick suggestions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {ncbiDb === 'nucleotide' ? (
                          [
                            { term: 'HBB human', label: 'Human HBB' },
                            { term: 'insulin human', label: 'Human Insulin' },
                            { term: 'SARS-CoV-2 spike', label: 'SARS-CoV-2 Spike' },
                            { term: 'TP53 human', label: 'Human TP53' },
                            { term: 'myoglobin human', label: 'Human Myoglobin' }
                          ].map((item) => (
                            <button
                              key={item.term}
                              type="button"
                              onClick={() => setNcbiSearchQuery(item.term)}
                              className="text-[10px] bg-white border border-slate-200 hover:border-teal-400 text-slate-600 hover:text-teal-700 font-bold px-2 py-1 rounded-md transition-all cursor-pointer shadow-3xs"
                            >
                              {item.label}
                            </button>
                          ))
                        ) : ncbiDb === 'protein' ? (
                          [
                            { term: 'insulin human', label: 'Human Insulin' },
                            { term: 'hemoglobin human', label: 'Human Hemoglobin' },
                            { term: 'myoglobin human', label: 'Human Myoglobin' },
                            { term: 'albumin human', label: 'Human Albumin' },
                            { term: 'collagen human', label: 'Human Collagen' }
                          ].map((item) => (
                            <button
                              key={item.term}
                              type="button"
                              onClick={() => setNcbiSearchQuery(item.term)}
                              className="text-[10px] bg-white border border-slate-200 hover:border-teal-400 text-slate-600 hover:text-teal-700 font-bold px-2 py-1 rounded-md transition-all cursor-pointer shadow-3xs"
                            >
                              {item.label}
                            </button>
                          ))
                        ) : (
                          [
                            { term: 'CRISPR gene therapy human', label: 'CRISPR Therapy' },
                            { term: 'sickle cell mutation HBB', label: 'Sickle Cell' },
                            { term: 'insulin recombinant DNA history', label: 'Recombinant Insulin' },
                            { term: 'SARS-CoV-2 vaccine genome', label: 'mRNA Vaccines' },
                            { term: 'TP53 oncogene tumor suppressor', label: 'TP53 Suppressor' }
                          ].map((item) => (
                            <button
                              key={item.term}
                              type="button"
                              onClick={() => setNcbiSearchQuery(item.term)}
                              className="text-[10px] bg-white border border-slate-200 hover:border-teal-400 text-slate-600 hover:text-teal-700 font-bold px-2 py-1 rounded-md transition-all cursor-pointer shadow-3xs"
                            >
                              {item.label}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {ncbiError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>{ncbiError}</div>
                    </div>
                  )}

                  {/* Search Results List */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block flex justify-between">
                      <span>Query Results:</span>
                      {ncbiSearchResults.length > 0 && <span className="font-mono text-[10px] text-slate-400">{ncbiSearchResults.length} found</span>}
                    </span>

                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {ncbiIsSearching ? (
                        <div className="py-12 flex flex-col items-center justify-center space-y-2 bg-slate-50 border border-slate-200 rounded-xl">
                          <RefreshCw className="w-8 h-8 text-teal-500 animate-spin" />
                          <p className="text-xs text-slate-400 font-mono font-bold animate-pulse uppercase tracking-wider">Querying NCBI database...</p>
                        </div>
                      ) : ncbiSearchResults.length > 0 ? (
                        ncbiSearchResults.map((record) => {
                          if (record.dbType === 'pubmed') {
                            const isSelected = ncbiSelectedArticle?.pmid === record.pmid;
                            return (
                              <div
                                key={record.uid}
                                onClick={() => setNcbiSelectedArticle(record)}
                                className={`p-3 bg-white border rounded-xl space-y-1.5 text-left transition-all shadow-3xs hover:shadow-2xs cursor-pointer ${
                                  isSelected ? 'border-teal-500 ring-1 ring-teal-500/20 bg-teal-50/5' : 'border-slate-200 hover:border-teal-300'
                                }`}
                              >
                                <div className="flex justify-between items-start gap-1">
                                  <span className="text-[9px] bg-teal-50 text-teal-700 border border-teal-150 font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    PMID: {record.pmid}
                                  </span>
                                  <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">
                                    {record.pubDate}
                                  </span>
                                </div>
                                <h5 className="text-xs font-extrabold text-slate-800 line-clamp-2 leading-relaxed">
                                  {record.title}
                                </h5>
                                <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium pt-1">
                                  <span className="truncate max-w-[65%] font-mono font-bold text-slate-400">
                                    {record.authors}
                                  </span>
                                  <span className="font-bold text-teal-600 flex items-center gap-0.5 shrink-0 text-[10px]">
                                    Review Details <ArrowRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            );
                          } else {
                            const isSelected = ncbiFetchedMeta?.id === record.uid;
                            return (
                              <div
                                key={record.uid}
                                className={`p-3 bg-white border rounded-xl space-y-2 transition-all shadow-3xs hover:shadow-2xs ${
                                  isSelected ? 'border-teal-500 ring-1 ring-teal-500/20' : 'border-slate-200'
                                }`}
                              >
                                <div className="flex justify-between items-start gap-1">
                                  <div className="space-y-0.5 max-w-[70%]">
                                    <span className="text-[10px] bg-slate-100 text-slate-600 font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-slate-200 inline-block">
                                      {record.accession}
                                    </span>
                                    <span className="text-[9px] text-emerald-700 font-mono font-bold ml-1.5 uppercase inline-block">
                                      {record.organism}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono font-bold text-slate-500 shrink-0">
                                    {record.length} {record.dbType === 'protein' ? 'aa' : 'bp'}
                                  </span>
                                </div>
                                <h5 className="text-xs font-extrabold text-slate-800 line-clamp-2 leading-relaxed">
                                  {record.title}
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => handleNcbiFetchSequence(record.uid, record.accession, record.title, record.length)}
                                  disabled={ncbiIsFetching}
                                  className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                    isSelected 
                                      ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100' 
                                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                  }`}
                                >
                                  {ncbiIsFetching && isSelected ? (
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Download className="w-3.5 h-3.5" />
                                  )}
                                  {isSelected ? 'Refetch FASTA' : 'Fetch Sequence'}
                                </button>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-6 text-center space-y-1 text-xs text-slate-400 font-medium">
                          <Database className="w-8 h-8 text-slate-300 mx-auto" />
                          <p>
                            {ncbiDb === 'nucleotide' 
                              ? "Enter search keywords and click 'Search' to fetch biological entries from NCBI Nucleotide." 
                              : ncbiDb === 'protein'
                              ? "Enter search keywords and click 'Search' to fetch protein entries from NCBI Protein."
                              : "Enter bibliography topics and click 'Search' to query papers and review citations."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Output Panel / Viewer Column */}
                <div className="lg:col-span-7">
                  {ncbiDb === 'pubmed' ? (
                    ncbiSelectedArticle ? (
                      <div className="space-y-5 animate-fade-in text-xs text-slate-700">
                        {/* Article Header Card */}
                        <div className="p-4 bg-teal-50/20 border border-teal-150 rounded-xl space-y-2.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-mono font-bold text-teal-800 uppercase tracking-wide">NCBI PubMed Reference:</span>
                            <span className="text-[10px] bg-teal-100 text-teal-800 font-mono font-bold px-2 py-0.5 rounded border border-teal-200">
                              PMID {ncbiSelectedArticle.pmid}
                            </span>
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-relaxed">
                            {ncbiSelectedArticle.title}
                          </h4>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Authors & Affiliations:</span>
                            <p className="font-bold text-slate-600">{ncbiSelectedArticle.authors}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-500 font-mono pt-1.5 border-t border-slate-100">
                            <div>Journal: <strong className="text-slate-700">{ncbiSelectedArticle.journal}</strong></div>
                            <div>Published: <strong className="text-slate-700">{ncbiSelectedArticle.pubDate}</strong></div>
                            {ncbiSelectedArticle.doi && (
                              <div className="col-span-2 truncate">DOI: <strong className="text-slate-700">{ncbiSelectedArticle.doi}</strong></div>
                            )}
                          </div>
                        </div>

                        {/* Citation Generator Panel */}
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 shadow-3xs">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-700 block uppercase tracking-wider font-mono">Academic Citation Formats</span>
                            <span className="text-[10px] text-slate-400 font-medium">Ready for Lab Bibliographies</span>
                          </div>
                          
                          <div className="space-y-2.5">
                            {/* APA */}
                            <div className="space-y-1 bg-white p-2.5 border border-slate-150 rounded-lg">
                              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
                                <span>APA FORMAT</span>
                                <button
                                  onClick={() => handleCopy(
                                    `${ncbiSelectedArticle.authors}. (${ncbiSelectedArticle.pubDate.split(' ')[0] || 'N/A'}). ${ncbiSelectedArticle.title}. ${ncbiSelectedArticle.journal}${ncbiSelectedArticle.volume ? `, ${ncbiSelectedArticle.volume}` : ''}${ncbiSelectedArticle.pages ? `, ${ncbiSelectedArticle.pages}` : ''}. PMID: ${ncbiSelectedArticle.pmid}.`,
                                    'apa-cite'
                                  )}
                                  className="text-teal-600 hover:text-teal-700 font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  {copiedText === 'apa-cite' ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                              <p className="font-mono text-[10.5px] text-slate-600 leading-normal font-medium">
                                {ncbiSelectedArticle.authors}. ({ncbiSelectedArticle.pubDate.split(' ')[0] || 'N/A'}). {ncbiSelectedArticle.title}. <i>{ncbiSelectedArticle.journal}</i>{ncbiSelectedArticle.volume ? `, ${ncbiSelectedArticle.volume}` : ''}{ncbiSelectedArticle.pages ? `, ${ncbiSelectedArticle.pages}` : ''}. PMID: {ncbiSelectedArticle.pmid}.
                              </p>
                            </div>

                            {/* AMA */}
                            <div className="space-y-1 bg-white p-2.5 border border-slate-150 rounded-lg">
                              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
                                <span>AMA FORMAT</span>
                                <button
                                  onClick={() => handleCopy(
                                    `${ncbiSelectedArticle.authors}. ${ncbiSelectedArticle.title}. ${ncbiSelectedArticle.journal}. ${ncbiSelectedArticle.pubDate};${ncbiSelectedArticle.volume || ''}:${ncbiSelectedArticle.pages || ''}. PMID: ${ncbiSelectedArticle.pmid}.`,
                                    'ama-cite'
                                  )}
                                  className="text-teal-600 hover:text-teal-700 font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  {copiedText === 'ama-cite' ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                              <p className="font-mono text-[10.5px] text-slate-600 leading-normal font-medium">
                                {ncbiSelectedArticle.authors}. {ncbiSelectedArticle.title}. <i>{ncbiSelectedArticle.journal}</i>. {ncbiSelectedArticle.pubDate};{ncbiSelectedArticle.volume || ''}:{ncbiSelectedArticle.pages || ''}. PMID: {ncbiSelectedArticle.pmid}.
                              </p>
                            </div>

                            {/* MLA */}
                            <div className="space-y-1 bg-white p-2.5 border border-slate-150 rounded-lg">
                              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
                                <span>MLA FORMAT (9th ed.)</span>
                                <button
                                  onClick={() => handleCopy(
                                    `${ncbiSelectedArticle.authors}. "${ncbiSelectedArticle.title}." ${ncbiSelectedArticle.journal}, vol. ${ncbiSelectedArticle.volume || 'N/A'}, ${ncbiSelectedArticle.pubDate.split(' ')[0] || 'N/A'}, pp. ${ncbiSelectedArticle.pages || 'N/A'}. PMID: ${ncbiSelectedArticle.pmid}.`,
                                    'mla-cite'
                                  )}
                                  className="text-teal-600 hover:text-teal-700 font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  {copiedText === 'mla-cite' ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                              <p className="font-mono text-[10.5px] text-slate-600 leading-normal font-medium">
                                {ncbiSelectedArticle.authors}. "{ncbiSelectedArticle.title}." <i>{ncbiSelectedArticle.journal}</i>, vol. {ncbiSelectedArticle.volume || 'N/A'}, {ncbiSelectedArticle.pubDate.split(' ')[0] || 'N/A'}, pp. {ncbiSelectedArticle.pages || 'N/A'}. PMID: {ncbiSelectedArticle.pmid}.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Literature Synopsis / Educational Digest */}
                        <div className="p-4 bg-teal-50/10 border border-slate-200 rounded-xl space-y-3">
                          <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider font-mono block">Bioinformatics Literature Synopsis</span>
                          
                          <div className="space-y-2 leading-relaxed">
                            <h5 className="font-extrabold text-slate-800">1. Molecular Significance</h5>
                            <p className="text-slate-600 text-[11px] font-medium">
                              This publication investigates genomic profiles related to {ncbiSelectedArticle.title.toLowerCase().includes('insulin') ? 'metabolic signaling, islet secretion, and genetic peptide expression' : ncbiSelectedArticle.title.toLowerCase().includes('crispr') ? 'gene correction, single-guide RNA specificity, and molecular endonuclease editing vectors' : 'specific eukaryotic gene structures, disease mutations, and therapeutic targeting pathways'}.
                            </p>
                            
                            <h5 className="font-extrabold text-slate-800">2. virtual Classroom Application</h5>
                            <p className="text-slate-600 text-[11px] font-medium">
                              Students can use the citation and associated metadata from this study to defend claims in their lab report cards. Aligning wet-lab hypotheses with peer-reviewed data helps bridge structural bioinformatics (sequence composition, alignment homology) with phenotypic medical outcomes.
                            </p>
                          </div>
                        </div>

                        {/* Direct Export to Report */}
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={handleGenerateReport}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-3xs cursor-pointer transition-all"
                          >
                            <FileText className="w-4 h-4" />
                            Generate Literature Report Card
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-2 h-full min-h-[350px]">
                        <BookOpen className="w-10 h-10 text-slate-300 animate-pulse" />
                        <h4 className="text-sm font-bold text-slate-800">No PubMed Article Selected</h4>
                        <p className="text-xs text-slate-400 max-w-xs font-medium">Search for peer-reviewed bibliography items on the left, then click on a result card to review citations and academic digest briefs.</p>
                      </div>
                    )
                  ) : (
                    /* NUCLEOTIDE OR PROTEIN VIEW */
                    ncbiIsFetching ? (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center space-y-3 h-full min-h-[300px]">
                        <RefreshCw className="w-10 h-10 text-teal-500 animate-spin" />
                        <h4 className="text-sm font-bold text-slate-800 animate-pulse">Downloading {ncbiDb === 'protein' ? 'Protein' : 'Genomic'} Sequence...</h4>
                        <p className="text-xs text-slate-400 font-medium max-w-xs text-center">Fetching biological reference and parsing FASTA data streams directly from NCBI.</p>
                      </div>
                    ) : ncbiFetchedSeq && ncbiFetchedMeta ? (
                      <div className="space-y-5 animate-fade-in">
                        {/* Fetched Record Metadata */}
                        <div className="p-4 bg-teal-50/20 border border-teal-150 rounded-xl space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono font-bold text-teal-800 uppercase tracking-wide text-[9px]">Fetched Record Details:</span>
                            <span className="text-[10px] bg-teal-100 text-teal-800 font-mono font-bold px-2 py-0.5 rounded border border-teal-200">
                              {ncbiFetchedMeta.accession}
                            </span>
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-relaxed">
                            {ncbiFetchedMeta.title}
                          </h4>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-mono">
                            <span>Original Size: <strong>{ncbiFetchedMeta.length} {ncbiDb === 'protein' ? 'aa' : 'bp'}</strong></span>
                            <span>Clean {ncbiDb === 'protein' ? 'Amino Acids' : 'DNA Bases'}: <strong>{ncbiFetchedSeq.length} {ncbiDb === 'protein' ? 'aa' : 'bp'}</strong></span>
                          </div>
                        </div>

                        {/* Performance / Trim options */}
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <label className="flex items-start gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={ncbiTrimSequence}
                              onChange={(e) => setNcbiTrimSequence(e.target.checked)}
                              className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <div className="space-y-0.5 text-xs text-slate-700">
                              <span className="font-bold block">Limit fetched sequence length to first 150 {ncbiDb === 'protein' ? 'aa' : 'bp'}</span>
                              <span className="text-[11px] text-slate-400 font-medium block leading-relaxed">
                                Recommended. Truncating sequence data to 150 {ncbiDb === 'protein' ? 'aa' : 'bp'} prevents browser rendering bottlenecks inside complex visual analysis grids, while leaving calculations robust.
                              </span>
                            </div>
                          </label>
                        </div>

                        {/* Interactive Sequence Visualizer */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                            Interactive {ncbiDb === 'protein' ? 'Protein' : 'DNA Nucleotide'} Sequence Viewer:
                          </span>
                          <SequenceVisualizer 
                            sequence={ncbiTrimSequence && ncbiFetchedSeq.length > 150 
                              ? ncbiFetchedSeq.substring(0, 150) 
                              : ncbiFetchedSeq
                            } 
                            type={ncbiDb === 'protein' ? 'protein' : 'dna'} 
                            title={`Fetched ${ncbiDb === 'protein' ? 'Protein' : 'Nucleotide'} Record`} 
                            id="ncbi-fetched-sequence-visualizer" 
                          />
                        </div>

                        {/* Dispatcher Actions */}
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 shadow-3xs">
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider text-[10px] font-mono">Workspace Dispatch Hub</span>
                            <span className="text-[11px] text-slate-400 font-medium block leading-normal">
                              {ncbiDb === 'protein'
                                ? "Note: This is an amino acid protein sequence. Virtual Lab analysis tools are DNA-specific. Copy the protein FASTA directly or search for its corresponding nucleotide gene record to use analysis tools."
                                : "Instantly route this fetched nucleotide template directly into any of the Virtual Lab's clinical tools:"
                              }
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleSendNcbiToTool('analyzer')}
                              className="p-2.5 bg-white border border-slate-200 hover:border-teal-505 hover:bg-teal-50/20 text-slate-700 hover:text-teal-800 rounded-lg text-left text-xs font-bold transition-all cursor-pointer shadow-3xs flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                              <span>Dispatch to <strong>DNA Analyzer</strong></span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSendNcbiToTool('translator')}
                              className="p-2.5 bg-white border border-slate-200 hover:border-teal-505 hover:bg-teal-50/20 text-slate-700 hover:text-teal-800 rounded-lg text-left text-xs font-bold transition-all cursor-pointer shadow-3xs flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                              <span>Dispatch to <strong>Translation Explorer</strong></span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSendNcbiToTool('comparator', 'seqA')}
                              className="p-2.5 bg-white border border-slate-200 hover:border-teal-505 hover:bg-teal-50/20 text-slate-700 hover:text-teal-800 rounded-lg text-left text-xs font-bold transition-all cursor-pointer shadow-3xs flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                              <span>Set as <strong>Comparator: Strand A</strong></span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSendNcbiToTool('comparator', 'seqB')}
                              className="p-2.5 bg-white border border-slate-200 hover:border-teal-505 hover:bg-teal-50/20 text-slate-700 hover:text-teal-800 rounded-lg text-left text-xs font-bold transition-all cursor-pointer shadow-3xs flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                              <span>Set as <strong>Comparator: Strand B</strong></span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSendNcbiToTool('mutation', 'original')}
                              className="p-2.5 bg-white border border-slate-200 hover:border-teal-505 hover:bg-teal-50/20 text-slate-700 hover:text-teal-800 rounded-lg text-left text-xs font-bold transition-all cursor-pointer shadow-3xs flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                              <span>Set as <strong>Mutation: Reference</strong></span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSendNcbiToTool('mutation', 'modified')}
                              className="p-2.5 bg-white border border-slate-200 hover:border-teal-505 hover:bg-teal-50/20 text-slate-700 hover:text-teal-800 rounded-lg text-left text-xs font-bold transition-all cursor-pointer shadow-3xs flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                              <span>Set as <strong>Mutation: Test DNA</strong></span>
                            </button>
                          </div>
                        </div>

                        {/* Report Export Button */}
                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={handleGenerateReport}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-3xs cursor-pointer transition-all"
                          >
                            <FileText className="w-4 h-4" />
                            Generate Sequence Report Card
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-2 h-full min-h-[300px]">
                        <Database className="w-10 h-10 text-slate-300 animate-pulse" />
                        <h4 className="text-sm font-bold text-slate-800">No NCBI Sequence Loaded</h4>
                        <p className="text-xs text-slate-400 max-w-xs font-medium">Search for entries on the left, then click 'Fetch Sequence' to download and sanitize DNA nucleobases.</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. Structured Research Report Viewer Overlay/Modal */}
      {activeReport && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4" id="report-modal-overlay">
          <div 
            className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-fade-in" 
            id="report-modal-card"
          >
            {/* Modal Header */}
            <div className="border-b border-slate-200 p-5 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-teal-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Virtual Lab Research Report</h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono">ID: {activeReport.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveReport(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-1 rounded hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Modal Body (Scrollable report content) */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed font-medium">
              
              <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-100 pb-2">
                <span>Date generated: <strong>{activeReport.timestamp} UTC</strong></span>
                <span className="text-teal-700 font-bold">VERIFIED GENOMICS RECORD</span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Experiment Title:</span>
                <h4 className="text-sm font-extrabold text-slate-900">{activeReport.experimentName}</h4>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Theoretical Objective:</span>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600 italic">
                  "{activeReport.researchQuestion}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Experimental Method:</span>
                <p className="text-slate-600">{activeReport.method}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Quantitative Results summary:</span>
                <p className="bg-teal-50/30 p-2.5 border border-teal-150 rounded-lg text-teal-950 font-bold font-mono">
                  {activeReport.resultSummary}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Observation Logs:</span>
                <p className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono break-all text-slate-600 leading-normal">
                  {activeReport.observation}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Scientific Interpretation & Conclusion:</span>
                <p className="text-slate-600 leading-relaxed">{activeReport.conclusion}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-400 leading-normal">
                <strong>Disclaimer Statement:</strong> This bioinformatics tool is optimized purely for beginner-level genetic instruction. Computational results represent simulated properties and are not suitable for clinical research, medical diagnostics, or biological therapeutic decisions.
              </div>

            </div>

            {/* Modal Footer actions */}
            <div className="border-t border-slate-200 p-4 bg-slate-50 rounded-b-2xl flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={downloadReportFile}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-350 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-3xs"
              >
                <Download className="w-4 h-4" />
                Download Report (.txt)
              </button>

              <div className="flex gap-2">
                {onSaveReport && (
                  <button
                    type="button"
                    onClick={handleSaveToPortfolio}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-3xs"
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        Saved to Portfolio!
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Save to Portfolio (+150 XP)
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveReport(null)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-3xs"
                >
                  Close Viewer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Sample Library & Biological Context Modal */}
      {isLibraryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in animate-duration-200" id="sample-library-modal-overlay">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up" id="sample-library-modal-container">
            
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-850">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="text-sm md:text-base font-extrabold tracking-tight">Genomic Reference Library & Biological Context</h3>
                  <p className="text-[10px] md:text-[11px] text-slate-400 font-medium">Learn the clinical origin, genomic lengths, and cellular roles of biological templates.</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => {
                  setIsLibraryModalOpen(false);
                  setLibrarySearchQuery('');
                  setSelectedLibraryCategory('All');
                }}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Close Reference Library"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    value={librarySearchQuery}
                    onChange={(e) => setLibrarySearchQuery(e.target.value)}
                    placeholder="Search name, function, origin, codons..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 shadow-3xs"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                  {['All', 'Human', 'Plant', 'Bacterial', 'Viral', 'Clinical', 'Comparative'].map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedLibraryCategory(category)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap border ${
                        selectedLibraryCategory === category
                          ? 'bg-teal-650 text-white border-teal-650 shadow-3xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {(() => {
                const filtered = DETAILED_SAMPLE_METADATA.filter(sample => {
                  const matchesCategory = selectedLibraryCategory === 'All' || sample.category === selectedLibraryCategory;
                  const query = librarySearchQuery.toLowerCase().trim();
                  const matchesSearch = !query || 
                    sample.name.toLowerCase().includes(query) ||
                    sample.origin.toLowerCase().includes(query) ||
                    sample.function.toLowerCase().includes(query) ||
                    sample.scientificContext.toLowerCase().includes(query) ||
                    sample.features.some(f => f.toLowerCase().includes(query));
                  return matchesCategory && matchesSearch;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-12 space-y-3 bg-white rounded-xl border border-slate-200 p-8">
                      <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800">No matching datasets found</p>
                        <p className="text-xs text-slate-500">Try adjusting your keywords or switching filters to "All".</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 gap-4" id="modal-sample-grid">
                    {filtered.map(sample => {
                      // Styling based on categories
                      let badgeStyle = 'bg-blue-50 text-blue-800 border-blue-200/50';
                      if (sample.category === 'Plant') badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
                      else if (sample.category === 'Bacterial') badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200/50';
                      else if (sample.category === 'Viral') badgeStyle = 'bg-purple-50 text-purple-800 border-purple-200/50';
                      else if (sample.category === 'Clinical') badgeStyle = 'bg-rose-50 text-rose-800 border-rose-200/50';
                      else if (sample.category === 'Comparative') badgeStyle = 'bg-slate-100 text-slate-850 border-slate-300/50';

                      return (
                        <div 
                          key={sample.id} 
                          className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs hover:border-teal-200 transition-all space-y-4"
                          id={`modal-sample-${sample.id}`}
                        >
                          {/* Card Title Bar */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[9px] font-bold font-mono px-2 py-0.5 border rounded-full ${badgeStyle}`}>
                                  {sample.category}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold font-mono">
                                  Length: {sample.length}
                                </span>
                              </div>
                              <h4 className="text-sm font-extrabold text-slate-900">{sample.name}</h4>
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200 self-start">
                              {sample.origin}
                            </span>
                          </div>

                          {/* Biological Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1.5">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono block">Primary Biological Function:</span>
                              <p className="text-slate-650 font-medium leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">{sample.function}</p>
                            </div>
                            <div className="space-y-1.5">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono block">Bioinformatics Context:</span>
                              <p className="text-slate-650 font-medium leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">{sample.scientificContext}</p>
                            </div>
                          </div>

                          {/* Sequence Preview Box */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">Nucleotide Sequence Material:</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(sample.sequenceA, sample.id)}
                                className="text-[10px] text-teal-600 hover:text-teal-800 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                {copiedText === sample.id ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy DNA</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="p-3 bg-slate-950 text-emerald-400 rounded-lg font-mono text-[11px] break-all leading-normal border border-slate-800 shadow-inner">
                              {sample.sequenceB ? (
                                <div className="space-y-1.5">
                                  <div>
                                    <span className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Sequence A (Template):</span>
                                    <span>{sample.sequenceA}</span>
                                  </div>
                                  <div className="border-t border-slate-800 pt-1.5">
                                    <span className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Sequence B / Modified:</span>
                                    <span>{sample.sequenceB}</span>
                                  </div>
                                </div>
                              ) : (
                                <span>{sample.sequenceA}</span>
                              )}
                            </div>
                          </div>

                          {/* Quick features & load tools */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                            <div className="flex flex-wrap gap-1">
                              {sample.features.map((f, i) => (
                                <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-md">
                                  • {f}
                                </span>
                              ))}
                            </div>

                            {/* Load buttons */}
                            <div className="flex flex-wrap gap-1.5">
                              {/* Option 1: DNA Analyzer */}
                              <button
                                type="button"
                                onClick={() => {
                                  setAnalyzerSeq(sample.sequenceA);
                                  setAnalyzerResult(null);
                                  setActiveTab('analyzer');
                                  setIsLibraryModalOpen(false);
                                }}
                                className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-850 hover:text-teal-900 border border-teal-200 hover:border-teal-300 rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-3xs"
                              >
                                Analyze DNA
                              </button>

                              {/* Option 2: Translation */}
                              <button
                                type="button"
                                onClick={() => {
                                  setTransSeq(sample.sequenceA);
                                  setTransResult(null);
                                  setActiveTab('translator');
                                  setIsLibraryModalOpen(false);
                                }}
                                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-850 hover:text-indigo-900 border border-indigo-200 hover:border-indigo-300 rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-3xs"
                              >
                                Translate Peptide
                              </button>

                              {/* Option 3: Alignment / Mutation (only if sequenceB is available) */}
                              {sample.sequenceB && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCompSeqA(sample.sequenceA);
                                      setCompSeqB(sample.sequenceB!);
                                      setCompResult(null);
                                      setActiveTab('comparator');
                                      setIsLibraryModalOpen(false);
                                    }}
                                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-850 hover:text-amber-900 border border-amber-200 hover:border-amber-300 rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-3xs"
                                  >
                                    Align Pair
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setMutOriginal(sample.sequenceA);
                                      setMutModified(sample.sequenceB!);
                                      setMutResult(null);
                                      setActiveTab('mutation');
                                      setIsLibraryModalOpen(false);
                                    }}
                                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-850 hover:text-rose-900 border border-rose-200 hover:border-rose-300 rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-3xs"
                                  >
                                    Inspect Mutation
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-bold font-mono">
                Total available datasets: {DETAILED_SAMPLE_METADATA.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLibraryModalOpen(false);
                  setLibrarySearchQuery('');
                  setSelectedLibraryCategory('All');
                }}
                className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs"
              >
                Close Library
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
