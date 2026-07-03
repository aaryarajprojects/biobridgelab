import React, { useState } from 'react';
import { 
  Activity, CheckCircle2, ChevronRight, FileText, FlaskConical, 
  AlertTriangle, ShieldCheck, RefreshCw, Dna, Info, Sparkles, 
  HelpCircle, ArrowRight, Layers, Clipboard, Microscope, 
  Check, Play, ArrowLeft, Printer, Award, ExternalLink,
  Search, BookOpen, Compass
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
                        onClick={() => {
                          setSelectedTopic(topic);
                          setHypothesisInd('');
                          setHypothesisDep('');
                          setHypothesisRationale('');
                          setHypothesisSuccess(null);
                        }}
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
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in" id="topic-detail-modal">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col focus:outline-none animate-scale-in" id="topic-detail-card">
              
              {/* Header Banner */}
              <div className={`p-6 border-b border-slate-100 flex items-start justify-between relative ${
                selectedTopic.category === 'Therapeutics' ? 'bg-purple-50/20' :
                selectedTopic.category === 'Clinical' ? 'bg-rose-50/20' :
                selectedTopic.category === 'Environmental' ? 'bg-emerald-50/20' :
                selectedTopic.category === 'Evolutionary' ? 'bg-amber-50/20' :
                'bg-sky-50/20'
              }`}>
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
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {selectedTopic.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer transition-all shrink-0"
                  aria-label="Close"
                >
                  <span className="text-xl font-bold font-mono">×</span>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 text-xs text-slate-600 leading-relaxed overflow-y-auto">
                {/* Detailed Background */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">1. Research Area & Background</span>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium leading-relaxed text-slate-700">
                    {selectedTopic.detailedBackground}
                  </div>
                </div>

                {/* Databases and References */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">2. Primary Target Question</span>
                    <div className="p-3 bg-teal-50/20 border border-teal-100 text-teal-800 rounded-xl font-bold flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>"{selectedTopic.researchQuestion}"</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">3. Suggested Reference Registries</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedTopic.suggestedDatabases.map((db, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 font-mono font-bold px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1 text-[10px]">
                          <Dna className="w-3 h-3 text-slate-500" /> {db}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Hypothesis Builder */}
                <div className="p-5 border border-teal-150 bg-teal-50/10 rounded-2xl space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      Interactive Hypothesis Formulator
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-normal font-medium">
                      Configure the experimental variables to generate your biological research thesis draft.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Independent Variable Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Independent Variable (Manipulated):</label>
                      <select
                        value={hypothesisInd}
                        onChange={(e) => setHypothesisInd(e.target.value)}
                        className="w-full bg-white text-slate-800 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-bold px-3 py-2 focus:outline-none transition-all shadow-3xs"
                      >
                        <option value="">-- Choose Variable --</option>
                        {selectedTopic.variables.independent.map((v, i) => (
                          <option key={i} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>

                    {/* Dependent Variable Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Dependent Variable (Observed):</label>
                      <select
                        value={hypothesisDep}
                        onChange={(e) => setHypothesisDep(e.target.value)}
                        className="w-full bg-white text-slate-800 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-bold px-3 py-2 focus:outline-none transition-all shadow-3xs"
                      >
                        <option value="">-- Choose Variable --</option>
                        {selectedTopic.variables.dependent.map((v, i) => (
                          <option key={i} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Scientific Rationale input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Scientific Rationale (Predictive Justification):</label>
                    <textarea
                      rows={3}
                      value={hypothesisRationale}
                      onChange={(e) => setHypothesisRationale(e.target.value)}
                      placeholder="Explain the biological or biochemical mechanism driving your hypothesis (e.g., 'Increasing Cas9 concentration will escalate off-target cleavage...')"
                      className="w-full bg-white text-slate-800 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg text-xs font-bold p-3 focus:outline-none transition-all shadow-3xs leading-relaxed"
                    />
                  </div>

                  {/* Feedback & Actions */}
                  {hypothesisSuccess && (
                    <div className={`p-3.5 rounded-xl text-xs font-bold flex items-start gap-2 ${
                      hypothesisSuccess.startsWith('Error') 
                        ? 'bg-rose-50 border border-rose-150 text-rose-800' 
                        : 'bg-emerald-50 border border-emerald-150 text-emerald-800'
                    }`}>
                      {hypothesisSuccess.startsWith('Error') ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      <div>{hypothesisSuccess}</div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleValidateHypothesis}
                      className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs transition-all animate-pulse"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Validate & Log Hypothesis
                    </button>

                    {hypothesisSuccess?.startsWith('Success') && (
                      <button
                        type="button"
                        onClick={handleDownloadBrief}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs transition-all animate-fade-in"
                      >
                        <FileText className="w-4 h-4" />
                        Export Brief
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer close */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
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
        )}
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
