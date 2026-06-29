export interface SavedReport {
  id: string;
  experimentName: string;
  timestamp: string;
  researchQuestion: string;
  method: string;
  observation: string;
  conclusion: string;
  resultSummary: string;
}

export interface UserProgress {
  xp: number;
  completedLessons: string[];
  completedChallenges: string[];
  unlockedSkills: string[];
  simulationStep: number;
  selectedPatientReport: string | null;
  completedSimulations?: string[];
  savedReports?: SavedReport[];
  // Persistent Student Profile & Progress Fields
  studentName?: string;
  learningLevel?: 1 | 2 | 3 | 4;
  researchJourneyStatus?: string;
  completedQuizzes?: string[];
  quizScores?: Record<string, { score: number; total: number; correctAnswers: number }>;
  simulationHistory?: { simId: string; timestamp: string; outcome: string }[];
}

export interface DNASeqSample {
  name: string;
  description: string;
  sequence: string;
}

export interface Lesson {
  id: string;
  level: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  shortDesc: string;
  duration: string;
  content: {
    title: string;
    paragraphs: string[];
    diagramType?: 'dna_structure' | 'transcription' | 'databases' | string;
    learningObjective: string;
    keyConcepts: string[];
    interactiveExample?: {
      title: string;
      description: string;
      type: string;
      details?: string;
    };
    miniActivity?: {
      prompt: string;
      options?: string[];
      correctAnswer?: string;
      feedback: string;
    };
    summary: string;
    quickQuiz: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  };
}

export interface Challenge {
  id: string;
  category: 'DNA Basics' | 'Sequence Analysis' | 'Genetics Concepts' | 'Bioinformatics Applications';
  type: 'text' | 'comparison' | 'choice';
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  description: string;
  instructions: string;
  initialSequence?: string;
  targetSequence?: string;
  question?: string;
  options?: string[];
  correctAnswer: string | number; // Index or text response
  explanation: string;
  scientificReasoning?: string;
  xpReward: number;
}

export const DNA_SAMPLES: DNASeqSample[] = [
  {
    name: "Human Insulin (INS)",
    description: "Partial gene sequence for Human Insulin, crucial for regulating blood glucose levels.",
    sequence: "AGCCCTCCAGGACAGGCTGCATCAGAAGAGGCCATCAAGCAGGTCTGTTCCAAGGGCCTTTGCGTCAGGTGGGCTCAGG"
  },
  {
    name: "Green Fluorescent Protein (GFP)",
    description: "A biomarker gene originally cloned from jellyfish, widely used in cellular imaging.",
    sequence: "ATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCACAAATTT"
  },
  {
    name: "Hemoglobin Subunit Beta (HBB)",
    description: "Beta-globin sequence where mutation causes sickle cell anemia.",
    sequence: "ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGG"
  }
];

export const LESSONS: Lesson[] = [
  // ================= LEVEL 1: BIOLOGY FOUNDATIONS =================
  {
    id: "intro-mol-bio",
    level: 1,
    title: "Introduction to Molecular Biology",
    subtitle: "The Chemistry of Life",
    shortDesc: "Discover the fundamental building blocks of cells, genetic material, and the universal role of nucleotides.",
    duration: "10 mins",
    content: {
      title: "Molecular Biology Foundations",
      paragraphs: [
        "Molecular biology is the branch of science concerned with the chemical structures and biological processes of cellular molecules, particularly DNA, RNA, and proteins.",
        "Cells are the basic structural and functional units of all living organisms. Within cells, genetic information is stored in nucleic acids. This genetic code serves as an instruction manual for cellular operations, chemical synthesis, and growth.",
        "The master repository of this code is Deoxyribonucleic Acid (DNA). DNA is composed of simpler monomeric subunits called nucleotides. Each individual nucleotide is composed of a nitrogenous base, a five-carbon sugar (deoxyribose), and at least one phosphate group."
      ],
      learningObjective: "Explain how cellular systems utilize genetic material and describe the monomeric components of DNA and RNA.",
      keyConcepts: [
        "Cells carry instructions in polymeric molecules.",
        "Nucleotides are the basic monomeric building blocks of DNA.",
        "Each nucleotide consists of a phosphate, a pentose sugar, and a nitrogenous base (A, T, C, or G)."
      ],
      interactiveExample: {
        title: "Nucleotide Explorer",
        description: "Select nucleotide structural components to learn how they anchor biological chains.",
        type: "nucleotide_explorer"
      },
      miniActivity: {
        prompt: "Identify the nitrogenous base that is exclusive to RNA molecules (replaces Thymine).",
        options: ["Adenine", "Cytosine", "Uracil", "Guanine"],
        correctAnswer: "Uracil",
        feedback: "Correct! Uracil (U) replaces Thymine (T) in RNA, pairing with Adenine."
      },
      summary: "Molecular biology centers on the interactions of DNA, RNA, and protein synthesis. Nucleotides serve as the fundamental unit of heredity, encoding information sequentially.",
      quickQuiz: {
        question: "What are the three chemical groups that constitute an individual nucleotide?",
        options: [
          "Phosphate group, deoxyribose sugar, and a nitrogenous base",
          "Amino acid, glucose sugar, and a lipid chain",
          "Hydroxyl group, ribose sugar, and a peptide binder",
          "Phosphate group, glycerol, and three fatty acids"
        ],
        correctIndex: 0,
        explanation: "Every nucleotide consists of three structural parts: a phosphate group, a pentose sugar (ribose in RNA, deoxyribose in DNA), and a nitrogenous base (A, T, C, G, or U)."
      }
    }
  },
  {
    id: "dna-basics",
    level: 1,
    title: "DNA Structure",
    subtitle: "The Double Helix",
    shortDesc: "Learn how nucleotide bases pair together via hydrogen bonds to form the iconic double helix.",
    duration: "10 mins",
    content: {
      title: "Decoding the Double Helix",
      paragraphs: [
        "The double helix structure of DNA, famously solved by Watson, Crick, Franklin, and Wilkins, consists of two antiparallel polynucleotide strands wrapped around a common axis.",
        "The outer edges of the helix are formed by a repeating sugar-phosphate backbone, linked together by strong, covalent phosphodiester bonds. The nitrogenous bases project inward, forming the 'rungs' of the spiral ladder.",
        "These strands are held together by weak, non-covalent hydrogen bonds between complementary bases: Adenine (A) always pairs with Thymine (T) via two hydrogen bonds, and Cytosine (C) always pairs with Guanine (G) via three hydrogen bonds. This specificity is key to DNA replication."
      ],
      diagramType: "dna_structure",
      learningObjective: "Illustrate the double-stranded geometry of DNA and formulate complementary pairing rules.",
      keyConcepts: [
        "Antiparallel strands run in opposite directions (5' to 3' vs 3' to 5').",
        "Watson-Crick base pairing maintains uniform helical width (purine pairs with pyrimidine).",
        "C-G pairs are held by three hydrogen bonds, making them more stable than A-T pairs."
      ],
      interactiveExample: {
        title: "Hydrogen Bond Simulator",
        description: "Explore the physical difference between A-T (2 bonds) and C-G (3 bonds) base pairs.",
        type: "hydrogen_bonds"
      },
      miniActivity: {
        prompt: "Synthesize the complementary sequence for the 5'-to-3' template 'AAGGC'.",
        options: ["TTCGG", "TTCCG", "CCGGA", "GGCCA"],
        correctAnswer: "TTCCG",
        feedback: "Correct! Under pairing rules, A pairs with T, and G pairs with C, giving 3'-TTCCG-5'."
      },
      summary: "DNA's physical properties are dictated by its double-stranded antiparallel double helix. Hydrogen bonding ensures high fidelity during replication and storage.",
      quickQuiz: {
        question: "Why do regions of DNA rich in Guanine-Cytosine (G-C) content require higher temperatures to denature (separate)?",
        options: [
          "G-C pairs form covalent peptide bonds",
          "G-C pairs are linked by three hydrogen bonds instead of two",
          "G-C base pairs are larger and heavier than A-T pairs",
          "G-C nucleotides lack phosphate groups"
        ],
        correctIndex: 1,
        explanation: "Guanine and Cytosine share three hydrogen bonds, whereas Adenine and Thymine share only two. Breaking three hydrogen bonds requires more thermal energy."
      }
    }
  },
  {
    id: "genes-genome",
    level: 1,
    title: "Genes and Genome",
    subtitle: "Mapping the Blueprint",
    shortDesc: "Understand how genetic information is organized into functional genes, chromosomes, and entire genomes.",
    duration: "12 mins",
    content: {
      title: "Genome Organization and Chromosomes",
      paragraphs: [
        "A gene is a specific sequence of nucleotides along a DNA molecule that serves as the basic physical and functional unit of heredity. Genes contain the direct instructions to synthesize functional proteins or functional non-coding RNA molecules.",
        "In eukaryotic organisms, genes are organized into non-coding regions called introns and coding regions called exons. Eukaryotic genomes undergo splicing to remove introns and join exons prior to translation.",
        "The genome represents the complete set of genetic material in an organism. Human genomes consist of approximately 3 billion base pairs packaged neatly into 23 pairs of chromosomes within the cell nucleus."
      ],
      learningObjective: "Distinguish between genes, coding regions, introns, and the global organization of genomic material.",
      keyConcepts: [
        "Genes are discrete DNA units that encode functional products.",
        "Eukaryotic genes are mosaic, containing both introns and exons.",
        "The genome encompasses all coding and non-coding DNA sequences in an organism."
      ],
      interactiveExample: {
        title: "Gene splicing Visualizer",
        description: "See how introns are removed and exons are assembled during spliceosome processing.",
        type: "splicing"
      },
      miniActivity: {
        prompt: "What is the term for the coding sequences of a eukaryotic gene that are retained in the mature mRNA?",
        options: ["Introns", "Exons", "Promoters", "Telomeres"],
        correctAnswer: "Exons",
        feedback: "Correct! Exons are the expressed, coding regions of the gene."
      },
      summary: "DNA is partitioned into genes which are housed on chromosomes. While prokaryotic genes are contiguous, eukaryotic genes have split structures of exons and introns.",
      quickQuiz: {
        question: "Which region of a eukaryotic gene is transcribed but subsequently removed during mRNA splicing?",
        options: [
          "Exon",
          "Intron",
          "Codon",
          "Ribosome"
        ],
        correctIndex: 1,
        explanation: "Introns are non-coding intervening sequences. They are transcribed into pre-mRNA but spliced out, leaving only the exons to form the mature messenger RNA."
      }
    }
  },
  {
    id: "transcription-translation",
    level: 1,
    title: "Central Dogma",
    subtitle: "From Code to Protein",
    shortDesc: "Master the fundamental biological workflow: DNA is transcribed into RNA, then translated into functional protein.",
    duration: "15 mins",
    content: {
      title: "DNA Transcription and RNA Translation",
      paragraphs: [
        "The Central Dogma of molecular biology states that genetic information flows from DNA to RNA, and finally to proteins. This process is split into two massive stages: transcription and translation.",
        "During transcription, RNA polymerase reads the template strand of DNA in the nucleus to synthesize a single-stranded messenger RNA (mRNA). RNA uses Uracil (U) instead of Thymine (T) to pair with Adenine (A).",
        "During translation, the mRNA transcript is transported to the ribosome. The ribosome reads the mRNA sequence in three-base units called codons. Each codon matches a complementary transfer RNA (tRNA) carrying a specific amino acid. AUG acts as the universal start signal."
      ],
      diagramType: "transcription",
      learningObjective: "Map a DNA template sequence to its transcribed mRNA, and translate that mRNA into an amino acid chain.",
      keyConcepts: [
        "Transcription uses DNA as a template to synthesize single-stranded mRNA.",
        "Translation converts the mRNA nucleotide sequence into an amino acid peptide.",
        "The genetic code is read in three-base groups called codons."
      ],
      interactiveExample: {
        title: "Ribosomal Translation Simulation",
        description: "Translate dynamic codons and watch amino acids fold into peptides.",
        type: "ribosome"
      },
      miniActivity: {
        prompt: "What is the amino acid specified by the universal start codon (AUG)?",
        options: ["Leucine", "Valine", "Methionine", "Alanine"],
        correctAnswer: "Methionine",
        feedback: "Correct! AUG codes for Methionine, initiating translation across nearly all biology."
      },
      summary: "The flow from sequence to structure is governed by the Central Dogma. Transcription creates mobile mRNA copies, and translation reads codons to assemble proteins.",
      quickQuiz: {
        question: "If a DNA template strand contains the sequence 3'-TAC-5', what is the resulting mRNA codon synthesized by RNA polymerase?",
        options: [
          "5'-ATG-3'",
          "5'-AUG-3'",
          "5'-UAC-3'",
          "5'-GUA-3'"
        ],
        correctIndex: 1,
        explanation: "Under complementary RNA base-pairing rules, T pairs with A, A pairs with U (since RNA contains Uracil), and C pairs with G. Thus, TAC transcribes to AUG."
      }
    }
  },

  // ================= LEVEL 2: BIOINFORMATICS FOUNDATIONS =================
  {
    id: "intro-bioinformatics",
    level: 2,
    title: "Introduction to Bioinformatics",
    subtitle: "Computing Life",
    shortDesc: "Discover how computational algorithms and hardware solve complex, high-throughput genetic problems.",
    duration: "10 mins",
    content: {
      title: "The Emergence of Computational Biology",
      paragraphs: [
        "Bioinformatics is an interdisciplinary field that develops and utilizes computational methods, algorithms, and software architectures to store, retrieve, analyze, and interpret massive volumes of biological data.",
        "With the advent of high-throughput DNA sequencing, biological data is accumulating exponentially. Analyzing billions of base pairs to locate a single disease-causing mutation is impossible without computational search structures.",
        "Bioinformaticians apply computer science, statistics, and engineering disciplines to model macromolecular structures, perform genome assemblies, and trace evolutionary history across species."
      ],
      learningObjective: "Deconstruct the necessity of computer science in modern molecular biology and identify core bioinformatic problems.",
      keyConcepts: [
        "Genomics generates scale of data that surpasses manual analysis capabilities.",
        "Algorithms permit rapid querying, filtering, and cross-referencing of millions of genes.",
        "Bioinformatics bridges cellular assays with computational modeling and statistical validations."
      ],
      interactiveExample: {
        title: "Algorithm Complexity Estimator",
        description: "See why human manual sequence search is inefficient compared to binary indexing.",
        type: "complexity"
      },
      miniActivity: {
        prompt: "Which mathematical field is most crucial for calculating the probability that a gene match is not random?",
        options: ["Calculus", "Statistics", "Geometry", "Trigonometry"],
        correctAnswer: "Statistics",
        feedback: "Correct! Biostatistics and probability enable us to calculate E-values in alignment hits."
      },
      summary: "Bioinformatics uses computer science to tame genomic data, letting us store whole genomes and find mutations in seconds.",
      quickQuiz: {
        question: "What is the primary driving force behind the rise of bioinformatics as a necessary scientific discipline?",
        options: [
          "The decline of biological wet-lab testing",
          "The exponential generation of genomic data from high-throughput sequencing",
          "A shift toward purely synthetic artificial organisms",
          "The discovery of non-carbon-based genetic systems"
        ],
        correctIndex: 1,
        explanation: "Next-generation sequencing produces terabytes of raw sequence reads. Computational power and advanced algorithms are the only way to index and interpret this volume of biological information."
      }
    }
  },
  {
    id: "databases",
    level: 2,
    title: "Biological Databases",
    subtitle: "The Registries of Life",
    shortDesc: "Learn how public repositories index molecular sequences, accession identifiers, and reference genomes.",
    duration: "12 mins",
    content: {
      title: "Sequence Repositories and Reference Genomes",
      paragraphs: [
        "To foster global collaboration, biological sequences are cataloged in massive, open-access public databases. These repositories serve as standardized libraries for molecular structures and genes.",
        "Key platforms include NCBI GenBank (nucleotides), UniProt (proteins), and the Protein Data Bank (3D macromolecular structures). Every deposited sequence is given a unique identifier called an accession number.",
        "A critical achievement in genomics is the Reference Genome—a highly curated, digital representative mosaic of an organism's DNA, used as a baseline standard for aligning new clinical reads and discovering sequence mutations."
      ],
      diagramType: "databases",
      learningObjective: "Locate and retrieve sequence documents using database accessions and understand reference genome usage.",
      keyConcepts: [
        "Public servers index global nucleotide and protein records with unique accession tags.",
        "NCBI GenBank represents a primary hub for DNA and transcript records.",
        "Reference genomes serve as standard coordinate maps for identifying natural and clinical variation."
      ],
      interactiveExample: {
        title: "Database Accession Tracker",
        description: "Lookup accession templates like NM_000618 (Insulin) or P42212 (GFP) in our index simulator.",
        type: "accessions"
      },
      miniActivity: {
        prompt: "Which database specializes in curated amino acid structures and protein sequence functions?",
        options: ["NCBI SRA", "UniProt", "RefSeq Genomes", "PubMed"],
        correctAnswer: "UniProt",
        feedback: "Correct! UniProt is the primary universal protein sequence resource."
      },
      summary: "Modern research relies on open data standardizations. Shared repositories index sequences under exact accession numbers, forming a universal baseline for researchers worldwide.",
      quickQuiz: {
        question: "What is a 'Reference Genome' in bioinformatics?",
        options: [
          "The very first DNA sequence ever found in nature",
          "A highly curated digital assembly of genes used as a standard coordinate baseline",
          "A synthetic artificial chromosome containing only human exons",
          "A paper backup of all sequenced proteins"
        ],
        correctIndex: 1,
        explanation: "A reference genome is a master digital consensus map of an organism's species sequence, providing standard coordinate loci to compare and map individual clinical sequences."
      }
    }
  },
  {
    id: "seq-analysis-basics",
    level: 2,
    title: "Sequence Analysis Basics",
    subtitle: "Decoding the Text",
    shortDesc: "Understand fundamental sequence characteristics: sequence length, GC content, and pattern finding.",
    duration: "10 mins",
    content: {
      title: "Analyzing Raw DNA Strings",
      paragraphs: [
        "To computers, DNA is a simple string of letters: A, T, C, and G. Fundamental sequence analysis begins with measuring basic mathematical properties of these text strands.",
        "Sequence length (in base pairs, bp) represents the physical extent of a DNA fragment. GC-content represents the percentage of Guanine and Cytosine bases within the overall strand, indicating thermal stability and active gene density.",
        "Pattern finding involves scanning sequences for specific regulatory signals or biological signatures. This includes locating promoters, restriction enzyme cutting points, or repetitive motifs."
      ],
      learningObjective: "Write programs or calculate sequence length, G-C content ratio, and discover biological motifs.",
      keyConcepts: [
        "DNA sequences are treated computationally as uppercase character strings.",
        "GC percentage directly impacts DNA melting temperature.",
        "Sub-string searching can find exact target sequences and promoter locations."
      ],
      interactiveExample: {
        title: "GC Calculator Engine",
        description: "Input sequences to dynamically calculate total nucleotide counts, GC ratios, and molecular properties.",
        type: "gc_calc"
      },
      miniActivity: {
        prompt: "Calculate the GC percentage of the sequence 'ATGC'.",
        options: ["25%", "50%", "75%", "100%"],
        correctAnswer: "50%",
        feedback: "Correct! 2 of 4 bases are G/C, which yields exactly 50% G-C content."
      },
      summary: "Text processing is the root of bioinformatics. Calculating string lengths, base ratios, and locating target substrings are primary steps before advanced alignments.",
      quickQuiz: {
        question: "If a sequence of 200 base pairs has 120 G-C bases, what is its GC percentage?",
        options: [
          "30%",
          "40%",
          "50%",
          "60%"
        ],
        correctIndex: 3,
        explanation: "GC-content is calculated as (G+C)/Total * 100. Thus, (120/200)*100 = 60% GC-content."
      }
    }
  },
  {
    id: "alignment-basics",
    level: 2,
    title: "Sequence Alignment",
    subtitle: "Measuring Homology",
    shortDesc: "Learn how alignment algorithms match homologous regions, account for gaps, and score biological similarity.",
    duration: "15 mins",
    content: {
      title: "Aligning Biological Sequences",
      paragraphs: [
        "Sequence alignment is the process of arranging two or more genetic sequences to isolate homologous regions. Homology implies shared evolutionary ancestry, indicating structural or functional conservation.",
        "To align sequences, algorithms insert gaps (-) to represent insertions or deletions. Matches increase the alignment score, whereas mismatches and gaps reduce the overall score through penalty parameters.",
        "Global alignment (e.g. Needleman-Wunsch) forces alignment from the beginning to the absolute end of both sequences. Local alignment (e.g. Smith-Waterman) searches for isolated pockets of high similarity, ignoring divergent ends."
      ],
      learningObjective: "Distinguish between matches, mismatches, and gaps, and select the appropriate global or local alignment tool.",
      keyConcepts: [
        "Matches indicate sequence conservation; mismatches indicate evolutionary mutations.",
        "Gaps allow alignment of sequences of different lengths but incur score penalties.",
        "Smith-Waterman (local) is optimal for finding conserved domains inside highly divergent proteins."
      ],
      interactiveExample: {
        title: "Needleman-Wunsch Scorer",
        description: "Experiment with match, mismatch, and gap penalties to see how alignments shift.",
        type: "alignment_scorer"
      },
      miniActivity: {
        prompt: "Which alignment strategy is best for comparing two highly similar genes of nearly identical length?",
        options: ["Global Alignment", "Local Alignment", "Random Search", "Whole genome mapping"],
        correctAnswer: "Global Alignment",
        feedback: "Correct! Global alignment works best for end-to-end comparisons of homologous genes."
      },
      summary: "Alignments trace homology by matching letters, penalizing mismatches, and accommodating gaps. Local alignments isolate conserved motifs, while global alignments assess overall similarity.",
      quickQuiz: {
        question: "In sequence alignment scoring, why are gap penalties typically applied?",
        options: [
          "To force sequences to have identical character lengths",
          "To mathematically penalize the insertion or deletion mutations required to match the sequences",
          "To speed up the visual printout of the software tool",
          "To prevent any match scores from exceeding zero"
        ],
        correctIndex: 1,
        explanation: "Gaps represent insertions or deletions (indels). Since these mutations are relatively rare, alignment algorithms penalize them to find the most biologically plausible alignment."
      }
    }
  },

  // ================= LEVEL 3: COMPUTATIONAL BIOLOGY SKILLS =================
  {
    id: "mutation-analysis",
    level: 3,
    title: "Mutation Analysis",
    subtitle: "Genetic Modifications",
    shortDesc: "Understand different mutational events: substitutions, insertions, and frame-shifting deletions.",
    duration: "12 mins",
    content: {
      title: "The Physics and Effects of DNA Mutations",
      paragraphs: [
        "Mutations are permanent alterations in the nucleotide sequence of DNA. These changes can arise from replication errors, environmental radiation, or mutagenic chemicals.",
        "Substitutions replace one base with another. These are subdivided into transitions (purine-to-purine or pyrimidine-to-pyrimidine) and transversions (purine-to-pyrimidine or vice versa). Substitution effects range from silent, to missense (changing one amino acid), to nonsense (creating a premature stop).",
        "Insertions and deletions (indels) add or remove bases. If the mutation size is not a multiple of three, it causes a 'frameshift mutation', altering the reading frame of all subsequent codons, often resulting in non-functional proteins."
      ],
      learningObjective: "Analyze genomic mutations and predict how single-base substitutions or indels disrupt amino acid synthesis.",
      keyConcepts: [
        "Substitutions can be synonymous (silent) or non-synonymous (missense/nonsense).",
        "Indels that are not multiples of 3 shift the reading frame of translation.",
        "Frameshifts completely rewrite the downstream amino acid chain."
      ],
      interactiveExample: {
        title: "Frameshift Mutation Explorer",
        description: "Insert or delete single base units to watch downstream amino acids recalculate in real-time.",
        type: "mutations"
      },
      miniActivity: {
        prompt: "What is the structural consequence of a nonsense substitution mutation?",
        options: ["No change in amino acid", "A change to a different amino acid", "Creation of a premature stop codon", "Addition of an extra base pair"],
        correctAnswer: "Creation of a premature stop codon",
        feedback: "Correct! Nonsense mutations turn an amino acid codon into a premature stop codon, terminating translation early."
      },
      summary: "Mutations drive genetic diversity but can disrupt health. Substitutions alter single residues, while frameshift indels completely alter translation products.",
      quickQuiz: {
        question: "Why are single nucleotide deletions often more biologically damaging than single nucleotide substitutions?",
        options: [
          "Deletions always destroy the entire cell nucleus",
          "Deletions disrupt the reading frame, altering every downstream codon during translation",
          "Substitutions cannot change any translated amino acids",
          "Deletions prevent DNA from forming double hydrogen bonds"
        ],
        correctIndex: 1,
        explanation: "A single deletion shifts the triplet reading frame (frameshift), changing every codon downstream of the mutation. A substitution only affects a single codon."
      }
    }
  },
  {
    id: "genetic-variation",
    level: 3,
    title: "Genetic Variation",
    subtitle: "Mapping the Differences",
    shortDesc: "Master Single Nucleotide Polymorphisms (SNPs) and structural variations that define genetic diversity.",
    duration: "10 mins",
    content: {
      title: "Understanding SNPs and Diversity",
      paragraphs: [
        "Genetic variation represents the differences in DNA sequences among individuals within a population. These differences explain diverse traits, evolutionary adaptation, and susceptibility to diseases.",
        "The most common form of genetic variation is the Single Nucleotide Polymorphism (SNP). A SNP is a single-base substitution occurring at a specific genomic position in more than 1% of a population.",
        "Structural variations represent larger-scale modifications, including copy number variations (CNVs) where large segments of DNA are duplicated or deleted, directly affecting gene expression levels and dosage."
      ],
      learningObjective: "Classify sequence variants (SNPs, CNVs) and calculate population-level variant allele frequencies.",
      keyConcepts: [
        "SNPs represent single nucleotide differences present across populations.",
        "Most SNPs occur in non-coding regions and are biologically neutral.",
        "CNVs involve large deletions or duplications of genome tracts, impacting gene dosage."
      ],
      interactiveExample: {
        title: "SNP Allele Frequency Tracker",
        description: "Simulate a population sample to evaluate variant allele frequencies (VAF).",
        type: "snp_tracker"
      },
      miniActivity: {
        prompt: "What percentage of the population must carry a single-base variation for it to be classified as a polymorphism (SNP) rather than a rare mutation?",
        options: ["0.01%", "0.1%", "1.0%", "10.0%"],
        correctAnswer: "1.0%",
        feedback: "Correct! An allele must generally be present in at least 1% of a population to be classified as a common polymorphism."
      },
      summary: "Genomes differ slightly between individuals. SNPs represent single base mutations common in populations, whereas CNVs involve larger structural duplications or deletions.",
      quickQuiz: {
        question: "What is a Single Nucleotide Polymorphism (SNP)?",
        options: [
          "A mutation that alters the entire chromosome count of a cell",
          "A single base substitution occurring at a specific position that is common in a population",
          "An artificial nucleotide synthesized in a genetic lab",
          "A viral enzyme used to cut double-stranded DNA"
        ],
        correctIndex: 1,
        explanation: "SNPs are single base positions in the genome where different individuals in a population carry different nucleotides, occurring in at least 1% of the population."
      }
    }
  },
  {
    id: "genome-workflow",
    level: 3,
    title: "Genome Analysis Workflow",
    subtitle: "From Sequencer to Variant",
    shortDesc: "Learn how pipelines process raw sequencer reads into clinical variant files.",
    duration: "15 mins",
    content: {
      title: "The Bioinformatics Analysis Pipeline",
      paragraphs: [
        "Raw data from modern DNA sequencers consists of billions of short, fragmented text lines with quality scores. To make sense of this, scientists run standardized computational workflows.",
        "The workflow begins with Quality Control (using Phred quality scores in FASTQ files). Low-quality reads are trimmed, and the remaining sequences are aligned to a reference genome, producing a Sequence Alignment Map (SAM or BAM file).",
        "Finally, algorithms compare the aligned BAM file against the reference genome to detect mismatches. This process, called Variant Calling, produces a Variant Call Format (VCF) file containing the list of genetic mutations."
      ],
      learningObjective: "Order the stages of a standard genomic pipeline (FASTQ -> BAM -> VCF) and explain Phred quality metrics.",
      keyConcepts: [
        "FASTQ files contain both nucleotide characters and sequence quality scores.",
        "Alignment (producing BAM files) maps fragments to their location on reference chromosomes.",
        "Variant callers identify genomic variations, outputting standard VCF files."
      ],
      interactiveExample: {
        title: "Workflow Order Simulator",
        description: "Drag and order the pipeline files from raw reads to clinical variants.",
        type: "pipeline_flow"
      },
      miniActivity: {
        prompt: "Which file format contains the final cataloged list of single nucleotide variants and insertions/deletions found in a sequenced sample?",
        options: ["FASTQ", "BAM", "VCF", "FASTA"],
        correctAnswer: "VCF",
        feedback: "Correct! VCF (Variant Call Format) is the standard file format for storing gene variations."
      },
      summary: "Genomic workflows process messy, fragmented sequence reads (FASTQ) by aligning them to reference genomes (BAM) to pinpoint variants (VCF).",
      quickQuiz: {
        question: "What is the correct sequential order of files generated in a primary genome analysis pipeline?",
        options: [
          "VCF -> BAM -> FASTQ",
          "FASTQ -> BAM -> VCF",
          "BAM -> VCF -> FASTQ",
          "FASTQ -> VCF -> BAM"
        ],
        correctIndex: 1,
        explanation: "The standard workflow goes from raw reads with quality metrics (FASTQ), to aligned sequence coordinates (BAM), to identified genetic variations (VCF)."
      }
    }
  },
  {
    id: "research-methodology",
    level: 3,
    title: "Research Methodology",
    subtitle: "Scientific Inquiry",
    shortDesc: "Formulate rigorous bioinformatic research questions, testable hypotheses, and unbiased conclusions.",
    duration: "12 mins",
    content: {
      title: "Applying the Scientific Method to Genomics",
      paragraphs: [
        "Bioinformatics is not just about running algorithms; it is an experimental science. Bioinformatic research must follow a structured scientific methodology to prevent false positive associations.",
        "The workflow begins with a research question (e.g. 'Is gene X mutated in colorectal cancer patients?'). This is followed by a testable, falsifiable hypothesis.",
        "To test hypotheses, researchers design workflows using independent validation sets, cross-validation, and rigorous statistical filters to calculate false discovery rates (FDR) before drawing genetic conclusions."
      ],
      learningObjective: "Synthesize genomic hypotheses and establish proper statistical controls to validate biological discoveries.",
      keyConcepts: [
        "Genomic questions must focus on testable biological mechanics.",
        "Hypotheses must specify directionality and be verifiable through sequence data.",
        "Conclusions must include p-values and false discovery rate (FDR) corrections."
      ],
      interactiveExample: {
        title: "Hypothesis Validator",
        description: "Formulate a mock hypothesis and run statistical simulations to calculate p-values.",
        type: "hypothesis"
      },
      miniActivity: {
        prompt: "Why are statistical corrections (like FDR or Bonferroni) necessary when testing thousands of genes at once?",
        options: ["To prevent false positives from random chance", "To speed up the computer run", "To remove all biological data", "To increase the mutation rate"],
        correctAnswer: "To prevent false positives from random chance",
        feedback: "Correct! Testing thousands of genes simultaneously increases the chance of finding false positive matches by random luck."
      },
      summary: "Rigorous research applies the scientific method to data. Using proper p-value thresholds and false discovery rate corrections prevents false associations.",
      quickQuiz: {
        question: "Why must genomic researchers adjust p-value thresholds when analyzing whole-genome gene expression data?",
        options: [
          "To compensate for poor sequencer quality scores",
          "To control for false positives arising from performing thousands of parallel statistical tests",
          "To guarantee that at least one gene is found to be significant",
          "To make the final scientific paper easier to publish"
        ],
        correctIndex: 1,
        explanation: "When conducting thousands of simultaneous statistical comparisons, the likelihood of false positives increases dramatically. Multiple-testing corrections (like FDR or Bonferroni) are essential to maintain statistical integrity."
      }
    }
  },

  // ================= LEVEL 4: ADVANCED EXPLORATION =================
  {
    id: "genomics-apps",
    level: 4,
    title: "Genomics Applications",
    subtitle: "Solving Global Challenges",
    shortDesc: "Explore metagenomics, oncology mutations, and rare-disease tracking using biological databases.",
    duration: "12 mins",
    content: {
      title: "Genomics in Clinical Practice and Ecology",
      paragraphs: [
        "Genomics has transitioned from a theoretical science to a practical tool that reshapes clinical diagnostics, agriculture, and environmental sciences.",
        "In oncology, tumor genomes are sequenced to identify somatic driver mutations (e.g., BRAF V600E), matching patients with targeted small-molecule inhibitors.",
        "In environmental biology, metagenomics allows researchers to sequence DNA extracted directly from environmental soil or water samples, identifying thousands of unculturable microbes simultaneously."
      ],
      learningObjective: "Contrast germline vs somatic mutations and articulate how metagenomics studies environmental microbiomes.",
      keyConcepts: [
        "Somatic mutations occur in specific tissues (like tumors); germline mutations are inherited.",
        "Targeted cancer therapies selectively disable mutated proteins, minimizing healthy cell damage.",
        "Metagenomics bypasses the need to culture microbes in a laboratory."
      ],
      interactiveExample: {
        title: "Tumor Sequence Profiler",
        description: "Analyze tumor vs. healthy blood sequences to pinpoint oncology driver mutations.",
        type: "oncology"
      },
      miniActivity: {
        prompt: "What is the primary characteristic of metagenomic sequencing?",
        options: ["Sequencing only a single organism", "Sequencing DNA from an entire environmental community of mixed organisms", "Sequencing purely synthetic DNA", "Splicing human genes into plants"],
        correctAnswer: "Sequencing DNA from an entire environmental community of mixed organisms",
        feedback: "Correct! Metagenomics samples entire biological communities directly from their natural habitat."
      },
      summary: "Genomics drives precision cancer care by targeting somatic driver mutations, while metagenomics reveals the hidden microbial diversity of our planet.",
      quickQuiz: {
        question: "What is the difference between germline mutations and somatic mutations in medical genomics?",
        options: [
          "Germline mutations are synthetic, whereas somatic mutations are natural",
          "Germline mutations are inherited and present in all cells; somatic mutations are acquired and restricted to specific tissues like tumors",
          "Somatic mutations only occur in plants",
          "Germline mutations are harmless, whereas somatic mutations are always fatal"
        ],
        correctIndex: 1,
        explanation: "Germline mutations are inherited from parents and are present in every cell of the offspring. Somatic mutations are acquired during an individual's lifetime and are only found in the lineage of cells derived from the mutated cell (e.g. in tumors)."
      }
    }
  },
  {
    id: "evolutionary-analysis",
    level: 4,
    title: "Evolutionary Analysis",
    subtitle: "Tracing the Tree of Life",
    shortDesc: "Discover molecular phylogenetics, cladograms, and molecular clocks that outline speciation.",
    duration: "15 mins",
    content: {
      title: "Molecular Phylogenetics and Sequence Evolution",
      paragraphs: [
        "Phylogenetics is the study of evolutionary relationships among biological entities. Molecular phylogenetics uses DNA and protein sequence alignments to reconstruct these historic relationships.",
        "As species diverge, their genomes accumulate independent mutations. By counting these mismatches, algorithms construct phylogenetic trees, mapping how species branched from common ancestors.",
        "The molecular clock hypothesis states that certain genetic regions mutate at a relatively constant rate over millions of years, allowing scientists to estimate the calendar timeline of evolutionary divergence events."
      ],
      learningObjective: "Interpret phylogenetic cladograms and calculate evolutionary divergence timelines from mutation rates.",
      keyConcepts: [
        "Evolutionary distance correlates with the quantity of sequence mismatches.",
        "Phylogenetic trees depict species divergence from common ancestors.",
        "Molecular clocks calibrate sequence differences to chronological geological time."
      ],
      interactiveExample: {
        title: "Cladogram Constructor",
        description: "Align sequences from 4 different species to automatically build a phylogenetic tree.",
        type: "phylogeny"
      },
      miniActivity: {
        prompt: "If Species A and B have 2 mutations between them, and Species A and C have 15 mutations, which species pair shared a more recent common ancestor?",
        options: ["Species A and B", "Species A and C", "Both are equally related", "Cannot be determined"],
        correctAnswer: "Species A and B",
        feedback: "Correct! Fewer mutations indicate a shorter evolutionary divergence time and a more recent common ancestor."
      },
      summary: "Genomic alignments reveal evolutionary histories. Phylogenetic trees map species divergence, and molecular clocks date ancient branching events.",
      quickQuiz: {
        question: "What does a branch node represent in a phylogenetic tree?",
        options: [
          "The extinction point of a species",
          "A common ancestor from which descendant species diverged",
          "The exact location of a single gene inside a chromosome",
          "An artificial mutation added by researchers"
        ],
        correctIndex: 1,
        explanation: "A node on a phylogenetic tree represents a speciation event where a single ancestral lineage split into two or more distinct descendant lineages."
      }
    }
  },
  {
    id: "personalized-med",
    level: 4,
    title: "Personalized Medicine Concepts",
    subtitle: "Precision Therapeutics",
    shortDesc: "Learn how pharmacogenomics tailors drug prescriptions based on a patient's unique genetic variants.",
    duration: "12 mins",
    content: {
      title: "Pharmacogenomics and Precision Medicine",
      paragraphs: [
        "Personalized medicine is an medical model that tailors healthcare treatments to the individual characteristics of each patient, primarily guided by their genomic profile.",
        "Pharmacogenomics is the study of how an individual's genetic makeup affects their response to drugs. Variations in liver enzyme genes (such as the CYP450 family) dictate how rapidly a patient metabolizes medications.",
        "Poor metabolizers may accumulate toxic levels of a standard drug dose, while ultra-rapid metabolizers may process the drug so quickly that it has no therapeutic effect. Genetic screening prior to prescription prevents these adverse reactions."
      ],
      learningObjective: "Analyze how genetic polymorphisms influence drug metabolism pathways and patient dosing protocols.",
      keyConcepts: [
        "Genetic variations in metabolic enzymes directly alter drug processing rates.",
        "Precision medicine matches patients with therapies tailored to their genetic profile.",
        "Pre-prescription screening reduces adverse drug reactions and improves success rates."
      ],
      interactiveExample: {
        title: "Pharmacogenomics Dosing Calculator",
        description: "Test hypothetical patients for CYP2D6 variants to determine correct drug dosages.",
        type: "pharmacogenomics"
      },
      miniActivity: {
        prompt: "If a patient is a 'poor metabolizer' of a certain drug due to a genetic deletion, how should their dosage be adjusted?",
        options: ["Increase the dosage", "Decrease the dosage", "Keep dosage identical", "Discontinue all fluids"],
        correctAnswer: "Decrease the dosage",
        feedback: "Correct! Poor metabolizers break down drugs slowly, so a lower dose is needed to avoid toxic buildup."
      },
      summary: "Genetics dictates drug responses. Pharmacogenomics screens enzyme variants to tailor dosages, ensuring maximum therapeutic benefit with minimum risk.",
      quickQuiz: {
        question: "How do variations in the cytochrome P450 (CYP) gene family primarily impact patient medical care?",
        options: [
          "They alter the structure of red blood cells",
          "They change the rate at which the liver metabolizes and clears drugs from the body",
          "They prevent cells from absorbing glucose",
          "They cause the patient's immune system to attack antibiotics"
        ],
        correctIndex: 1,
        explanation: "The CYP gene family encodes enzymes responsible for metabolizing drugs in the liver. Genetic variations in these genes alter enzyme activity, dictating how fast or slow a patient clears medications."
      }
    }
  },
  {
    id: "future-biotech",
    level: 4,
    title: "Future of Biotechnology",
    subtitle: "Editing the Code",
    shortDesc: "Explore CRISPR-Cas9, genetic engineering, synthetic biology, and ethical research frameworks.",
    duration: "15 mins",
    content: {
      title: "CRISPR-Cas9 and Synthetic Biology",
      paragraphs: [
        "The future of biotechnology lies not just in reading genomes, but in writing and editing them. Leading this revolution is the CRISPR-Cas9 system.",
        "CRISPR-Cas9 acts as a programmable pair of molecular scissors. Guided by a small guide RNA (gRNA), the Cas9 endonuclease locates a specific DNA sequence and introduces a double-stranded break.",
        "Cells repair this break by either disabling the gene or incorporating a custom donor template. Applications range from curing genetic diseases to engineering drought-resistant crops, necessitating strong ethical research guidelines."
      ],
      learningObjective: "Explain the mechanics of CRISPR-Cas9 genome editing and debate the ethics of germline gene modifications.",
      keyConcepts: [
        "CRISPR uses a guide RNA to direct the Cas9 enzyme to a precise genomic locus.",
        "Double-stranded breaks trigger cell repair mechanisms to knock out or edit genes.",
        "Synthetic biology seeks to design and construct entirely new biological pathways."
      ],
      interactiveExample: {
        title: "CRISPR Guide RNA Designer",
        description: "Design a guide RNA to target a disease gene without causing off-target cuts.",
        type: "crispr"
      },
      miniActivity: {
        prompt: "What is the role of the guide RNA (gRNA) in the CRISPR-Cas9 gene editing complex?",
        options: ["To cut the double-stranded DNA", "To repair the broken DNA strand", "To guide the Cas9 enzyme to the precise target DNA sequence", "To synthesize new amino acids"],
        correctAnswer: "To guide the Cas9 enzyme to the precise target DNA sequence",
        feedback: "Correct! The guide RNA uses complementary base pairing to direct Cas9 to the targeted genomic sequence."
      },
      summary: "CRISPR-Cas9 enables precise gene editing via programmable guide RNAs. While promising, these capabilities require rigorous ethical oversight.",
      quickQuiz: {
        question: "Which component of the CRISPR-Cas9 system is responsible for cutting the target DNA strands?",
        options: [
          "The Guide RNA (gRNA)",
          "The Cas9 endonuclease enzyme",
          "The sugar-phosphate backbone",
          "The donor DNA template"
        ],
        correctIndex: 1,
        explanation: "Cas9 is an endonuclease enzyme that acts as molecular scissors, cutting double-stranded DNA at the target site guided by the gRNA sequence."
      }
    }
  }
];

export const CHALLENGES: Challenge[] = [
  // ================= DNA BASICS (5 Challenges) =================
  {
    id: "chal-gc-calc",
    category: "DNA Basics",
    type: "text",
    title: "Analyze the Thermophile Gene",
    difficulty: "Beginner",
    description: "Thermophiles are extreme heat-loving microorganisms. To prevent DNA denaturation at high temperatures, they have evolved highly stable G-C base pairing distributions. Calculate the exact GC percentage of this target gene sequence.",
    instructions: "Count the number of Guanine (G) and Cytosine (C) bases, divide by the total sequence length, and enter the percentage (round to the nearest whole integer, e.g., 50). Do not include the % sign.",
    initialSequence: "ATGCGTAC",
    question: "What is the GC content of the DNA sequence ATGCGTAC?",
    correctAnswer: "50",
    explanation: "The DNA sequence 'ATGCGTAC' is 8 bases long. It contains 2 Guanines (G) and 2 Cytosines (C), totaling 4 GC bases. Thus, 4 / 8 = 50% GC content.",
    scientificReasoning: "Higher GC percentage translates to 3 hydrogen bonds per pair, yielding thermal stability that prevents DNA denaturation at high temperatures.",
    xpReward: 100
  },
  {
    id: "chal-comp-strand",
    category: "DNA Basics",
    type: "text",
    title: "Complementary Strand Synthesis",
    difficulty: "Beginner",
    description: "During DNA transcription and replication, complementary base pairing serves as the primary mechanism for transferring genetic sequences. Determine the matching complementary sequence.",
    instructions: "Enter the complementary 5'-to-3' DNA sequence corresponding to the provided template strand. Use uppercase letters and ensure Watson-Crick pairing rules (A pairs with T, C pairs with G).",
    initialSequence: "AGCTAGC",
    question: "What is the complementary DNA sequence for 'AGCTAGC'?",
    correctAnswer: "TCGATCG",
    explanation: "Under Watson-Crick rules, Adenine (A) matches with Thymine (T) and Cytosine (C) matches with Guanine (G).",
    scientificReasoning: "The double helix is antiparallel. Complementary base-pairing ensures that genetic code is replicated symmetrically and can be transcribed with high fidelity.",
    xpReward: 100
  },
  {
    id: "chal-h-bonds",
    category: "DNA Basics",
    type: "text",
    title: "Hydrogen Bond Estimation",
    difficulty: "Intermediate",
    description: "Calculating the total hydrogen bonds in a sequence helps predict its thermal denaturation threshold and melting temperature in PCR applications.",
    instructions: "Calculate the total number of hydrogen bonds holding the sequence GGACC to its complement. Recall that G-C pairs have 3 bonds and A-T pairs have 2 bonds. Write the number only.",
    initialSequence: "GGACC",
    question: "How many total hydrogen bonds link the sequence 'GGACC' to its complementary strand?",
    correctAnswer: "14",
    explanation: "The sequence 'GGACC' consists of 4 G/C bases (each forming 3 hydrogen bonds) and 1 A base (forming 2 hydrogen bonds). Thus: (4 * 3) + (1 * 2) = 14 hydrogen bonds.",
    scientificReasoning: "Hydrogen bonds are non-covalent, but collectively they stabilize the double helix. The melting temperature (Tm) is directly proportional to the total number of these bonds.",
    xpReward: 150
  },
  {
    id: "chal-purines",
    category: "DNA Basics",
    type: "text",
    title: "Purine Count Challenge",
    difficulty: "Beginner",
    description: "Nitrogenous bases are divided into double-ringed purines (Adenine, Guanine) and single-ringed pyrimidines (Cytosine, Thymine).",
    instructions: "Count the total number of purine bases in the provided sequence. Enter the number only.",
    initialSequence: "AAGCTC",
    question: "How many purines (A and G) are present in the sequence 'AAGCTC'?",
    correctAnswer: "3",
    explanation: "In 'AAGCTC', there are two Adenines (A) and one Guanine (G), giving a total of 3 purines.",
    scientificReasoning: "Watson-Crick base pairing always couples a double-ring purine with a single-ring pyrimidine, maintaining a uniform 2-nanometer width along the entire length of the DNA helix.",
    xpReward: 100
  },
  {
    id: "chal-rna-complement",
    category: "DNA Basics",
    type: "text",
    title: "Transcribing RNA Complement",
    difficulty: "Intermediate",
    description: "RNA polymerase synthesizes a single-stranded RNA complement from a DNA template. Uracil (U) replaces Thymine (T) in all RNA products.",
    instructions: "Write the corresponding RNA sequence transcribed from the DNA template. Use uppercase letters.",
    initialSequence: "Template: 3'-TTAACCGG-5'",
    question: "What is the 5'-to-3' RNA sequence transcribed from the DNA template 3'-TTAACCGG-5'?",
    correctAnswer: "AAUUGGCC",
    explanation: "Applying RNA complementarity: T pairs with A, A pairs with U, C pairs with G, and G pairs with C. The transcribed sequence is AAUUGGCC.",
    scientificReasoning: "RNA has a hydroxyl group on the 2' carbon of its ribose ring, which makes it more chemically reactive and less stable than DNA, suitable for transient messenger functions.",
    xpReward: 120
  },

  // ================= SEQUENCE ANALYSIS (5 Challenges) =================
  {
    id: "chal-mutation-id",
    category: "Sequence Analysis",
    type: "choice",
    title: "Diagnose the Patient Mutation",
    difficulty: "Intermediate",
    description: "Biochemists run alignment programs to pinpoint genetic modifications. Compare this patient's DNA sequence with the baseline healthy reference sequence to identify the exact position of the mutation.",
    instructions: "Analyze the differences base-by-base (1-indexed) to detect the mismatch location and the specific mutation type.",
    initialSequence: "Reference: ATGCGATCGTA \nPatient:   ATGCGATGGTA",
    question: "Which option correctly identifies the 1-indexed mutated base position and type?",
    options: [
      "Position 5: C mutated to T",
      "Position 8: C mutated to G",
      "Position 3: G mutated to A",
      "Position 11: A mutated to T"
    ],
    correctAnswer: 1, // Index 1 is "Position 8: C mutated to G"
    explanation: "At position 8, the wild-type reference strand features a Cytosine (C) nucleotide, whereas the patient strand displays a Guanine (G).",
    scientificReasoning: "This single nucleotide polymorphism (SNP) represents a point mutation. If it falls inside an exon, it may change the encoded amino acid and alter protein folding.",
    xpReward: 150
  },
  {
    id: "chal-seq-similarity",
    category: "Sequence Analysis",
    type: "comparison",
    title: "Sequence Alignment Similarity",
    difficulty: "Intermediate",
    description: "Assess the similarity percentage between two biological sequences. Alignment algorithms compute this ratio to evaluate phylogenetic conservation.",
    instructions: "Determine the percentage of exact matches between Sequence A and Sequence B. Round to the nearest whole percentage. (Formula: matches / total length * 100). Do not write the % sign.",
    initialSequence: "Sequence A: ATGCGTAC \nSequence B: ATGCCTAC",
    question: "What is the alignment similarity percentage between Sequence A and Sequence B?",
    correctAnswer: "88", // 7 matches / 8 bases = 87.5% -> rounds to 88
    explanation: "Comparing Sequence A (ATGCGTAC) and Sequence B (ATGCCTAC) shows 7 matching bases out of 8 total base pairs (a single substitution at position 5: G vs C). 7 / 8 = 87.5%, which rounds to 88% sequence similarity.",
    scientificReasoning: "Sequence similarity above 70-80% for protein-coding genes strongly implies conserved biological function and a shared ancestral origin (homology).",
    xpReward: 150
  },
  {
    id: "chal-consensus",
    category: "Sequence Analysis",
    type: "text",
    title: "Find the Consensus Nucleotide",
    difficulty: "Intermediate",
    description: "Consensus sequences represent the most common residues found at each position in a multiple sequence alignment, often highlighting conserved regulatory motifs.",
    instructions: "Analyze the single-column nucleotides: [A, A, T, A]. Enter the consensus nucleotide (the most frequent character). Use uppercase.",
    initialSequence: "Alignment Column: [A, A, T, A]",
    question: "What is the 1-letter consensus base for the alignment column [A, A, T, A]?",
    correctAnswer: "A",
    explanation: "The letter 'A' occurs 3 times, while 'T' occurs only once. Therefore, 'A' is the consensus base.",
    scientificReasoning: "Consensus analysis filters out evolutionary noise, letting researchers isolate critical DNA promoter patterns (like the TATA box) that are preserved by natural selection.",
    xpReward: 130
  },
  {
    id: "chal-dinucleotide",
    category: "Sequence Analysis",
    type: "text",
    title: "CpG Island Identification",
    difficulty: "Intermediate",
    description: "CpG islands are genomic regions with a high frequency of Cytosine-Guanine (CG) dinucleotides, commonly located near gene promoter transcription start sites.",
    instructions: "Count the total number of 'CG' dinucleotide pairs in the sequence CGACG. Enter the number only.",
    initialSequence: "CGACG",
    question: "How many 'CG' dinucleotide pairs are in the sequence 'CGACG'?",
    correctAnswer: "2",
    explanation: "The CG pairs are found at index 0-1 (CG) and index 3-4 (CG) in the sequence 'CGACG'. Total: 2.",
    scientificReasoning: "CpG dinucleotides are often methylated to silence genes. CpG islands remain unmethylated in active promoters, marking active transcriptional start sites.",
    xpReward: 140
  },
  {
    id: "chal-base-ratio",
    category: "Sequence Analysis",
    type: "text",
    title: "A/T to G/C Ratio",
    difficulty: "Intermediate",
    description: "Calculating base ratios helps characterize different organismal genomes and identify genomic islands imported from other species.",
    instructions: "Find the ratio of (A+T) bases to (G+C) bases in the sequence 'AAATTTCCGG'. Provide the answer as a decimal rounded to one decimal place.",
    initialSequence: "AAATTTCCGG",
    question: "What is the ratio of (A+T) to (G+C) in the sequence 'AAATTTCCGG'?",
    correctAnswer: "1.5",
    explanation: "There are 3 A's and 3 T's (total A+T = 6), and 2 C's and 2 G's (total G+C = 4). The ratio is 6 / 4 = 1.5.",
    scientificReasoning: "Genomic regions with highly aberrant AT/GC ratios compared to the host baseline often indicate lateral gene transfer (pathogenicity islands) or retroviral integration.",
    xpReward: 160
  },

  // ================= GENETICS CONCEPTS (5 Challenges) =================
  {
    id: "chal-find-orf",
    category: "Genetics Concepts",
    type: "choice",
    title: "Locate the Start Codon",
    difficulty: "Expert",
    description: "Gene prediction software scans raw genomic strands to locate Open Reading Frames (ORFs). An ORF must initiate with a universal start codon, signifying the onset of translation.",
    instructions: "Scan the nucleotide string below to locate the 1-indexed beginning position of the universal start codon (ATG).",
    initialSequence: "CCGATGGCTTTA",
    question: "At which base position (1-indexed) does the translation start codon (ATG) begin in CCGATGGCTTTA?",
    options: [
      "Position 1",
      "Position 4",
      "Position 6",
      "Position 9"
    ],
    correctAnswer: 1, // Index 1 is Position 4
    explanation: "The first three bases are CCG. Bases 4 to 6 are ATG, which constitutes the start codon (Met).",
    scientificReasoning: "The start codon (ATG in DNA, AUG in RNA) establishes the correct triplet reading frame. Any upstream or downstream frameshift alters all translation products.",
    xpReward: 200
  },
  {
    id: "chal-orf-len",
    category: "Genetics Concepts",
    type: "text",
    title: "Open Reading Frame Translation",
    difficulty: "Expert",
    description: "The length of an Open Reading Frame dictates the size of the resulting polypeptide chain. Translation begins at the start codon (ATG) and halts when hitting a stop codon (TAA, TAG, TGA).",
    instructions: "Translate the codons sequentially. Count and enter the total number of amino acids in the translated peptide strand (do not include the stop codon in your count).",
    initialSequence: "ATGCGTACTTAG",
    question: "How many amino acids will be successfully translated from the sequence 'ATGCGTACTTAG' before terminating?",
    correctAnswer: "3",
    explanation: "The sequence contains the codons: ATG (Met, 1), CGT (Arg, 2), ACT (Thr, 3), and TAG (Stop codon). Since the stop codon terminates peptide assembly and does not code for any amino acid, exactly 3 amino acids are translated.",
    scientificReasoning: "Ribosomes recognize stop codons via release factors rather than tRNAs, which halts translation and cleaves the newly synthesized polypeptide chain.",
    xpReward: 200
  },
  {
    id: "chal-missense",
    category: "Genetics Concepts",
    type: "choice",
    title: "Identify Sickle Cell Substitution",
    difficulty: "Intermediate",
    description: "A single base change in the beta-globin gene alters the resulting hemoglobin protein structure, causing red blood cells to take on a sickle shape.",
    instructions: "Examine the mutation of codon GAG (Glutamic Acid) to GTG (Valine). Identify the single-letter code of the newly introduced amino acid.",
    initialSequence: "Normal: GAG (E) \nMutant: GTG (V)",
    question: "What is the single-letter IUPAC code of the amino acid coded by the mutated codon 'GTG'?",
    options: ["E", "V", "A", "G"],
    correctAnswer: 1, // Index 1 is V
    explanation: "The mutant codon GTG codes for Valine, represented by the single letter 'V'. The original GAG coded for Glutamic Acid (E).",
    scientificReasoning: "Changing a hydrophilic charged residue (Glutamic Acid) to a hydrophobic residue (Valine) creates a sticky patch on the hemoglobin surface, causing molecules to aggregate under low oxygen.",
    xpReward: 150
  },
  {
    id: "chal-stop-codon",
    category: "Genetics Concepts",
    type: "choice",
    title: "Stop Codon Recognition",
    difficulty: "Beginner",
    description: "Three specific codons signal the ribosome to terminate translation. Identifying these signals is essential for mapping mRNA coding bounds.",
    instructions: "Select the option that does NOT act as a standard stop codon in the universal genetic code.",
    question: "Which of the following is NOT a universal stop codon in DNA coordinates?",
    options: ["TAA", "TAG", "TGA", "TGG"],
    correctAnswer: 3, // Index 3 is TGG
    explanation: "TAA, TAG, and TGA are stop codons. TGG codes for the amino acid Tryptophan (Trp).",
    scientificReasoning: "The stop codons are recognized by protein release factors rather than transfer RNAs. TGG is an active coding codon, specifying the bulky hydrophobic amino acid Tryptophan.",
    xpReward: 100
  },
  {
    id: "chal-exon-ratio",
    category: "Genetics Concepts",
    type: "text",
    title: "Spliced mRNA Length",
    difficulty: "Expert",
    description: "Eukaryotic genes undergo nuclear splicing where non-coding introns are cut out and coding exons are joined to create the final mature messenger RNA.",
    instructions: "Calculate the total length (in base pairs) of the spliced mature mRNA from a gene of 1000 bp with three exons of sizes 150 bp, 200 bp, and 150 bp. Enter the number only.",
    initialSequence: "Gene: 1000bp, Exon 1: 150bp, Exon 2: 200bp, Exon 3: 150bp",
    question: "What is the final mature mRNA length in base pairs after all introns are removed?",
    correctAnswer: "500",
    explanation: "The final mRNA contains only the spliced exons: 150 + 200 + 150 = 500 bp. Introns make up the remaining 500 bp of the raw gene.",
    scientificReasoning: "Splicing allows alternative combinations of exons (alternative splicing), enabling a single eukaryotic gene to encode multiple distinct protein isoforms depending on tissue requirements.",
    xpReward: 250
  },

  // ================= BIOINFORMATICS APPLICATIONS (5 Challenges) =================
  {
    id: "chal-role-gene",
    category: "Bioinformatics Applications",
    type: "choice",
    title: "The Functional Role of a Gene",
    difficulty: "Beginner",
    description: "Examine your underlying comprehension of cellular genetics, DNA transcription, and functional expression pipelines.",
    instructions: "Choose the statement that most precisely describes the biological and molecular function of a gene.",
    question: "What is the primary role of a gene in molecular genetics?",
    options: [
      "To direct the replication of RNA polymerases exclusively",
      "To code for functional proteins or RNA molecules that execute cellular functions",
      "To assemble amino acids directly into peptide chains without any intermediate steps",
      "To act as a passive structural anchor for histone complexes in the cytoplasm"
    ],
    correctAnswer: 1,
    explanation: "A gene is a distinct segment of DNA that encodes instructions for synthesizing either messenger RNA (which is translated into functional proteins) or non-coding RNA molecules.",
    scientificReasoning: "Genes are the fundamental units of inheritance. Their expression is regulated by promoter elements and transcription factors in response to cellular cues.",
    xpReward: 100
  },
  {
    id: "chal-capillary-elect",
    category: "Bioinformatics Applications",
    type: "choice",
    title: "Capillary Electrophoresis Mechanics",
    difficulty: "Expert",
    description: "In capillary PCR diagnostic scanning (such as the assays modeled in the Huntington's disease diagnostics simulation), fragment lengths are quantified with electrophoretic migration.",
    instructions: "Evaluate the physical factors influencing nucleotide migration velocities through polymer gel matrix conduits.",
    question: "Why do smaller DNA fragments migrate faster through the capillary polymer matrix during electrophoresis?",
    options: [
      "They carry a lower electrical negative charge density",
      "They encounter less physical sieving resistance from the gel polymer meshwork",
      "They are selectively pumped by thermal gradients inside the cathode chamber",
      "They form covalent bonds with the glass capillary walls"
    ],
    correctAnswer: 1,
    explanation: "Since all DNA fragments have uniform mass-to-charge ratios, they feel proportional electrostatic forces. The separation is purely size-based.",
    scientificReasoning: "The gel polymer matrix acts as a physical molecular sieve. Smaller fragments navigate the network pores easily, whereas larger fragments experience high friction and are slowed down.",
    xpReward: 250
  },
  {
    id: "chal-blast-evalue",
    category: "Bioinformatics Applications",
    type: "choice",
    title: "BLAST E-Value Interpretation",
    difficulty: "Intermediate",
    description: "The Expect Value (E-value) in BLAST searches represents the number of alignments with equal or better scores expected to occur by random chance in a database search.",
    instructions: "Select the E-value that indicates the most statistically robust homology match.",
    question: "Which of the following E-values indicates the most significant sequence homology?",
    options: ["10.0", "0.05", "1.0", "1e-50"],
    correctAnswer: 3, // Index 3 is 1e-50
    explanation: "An E-value of 1e-50 is extremely close to zero, indicating that the probability of this alignment occurring by random chance is virtually non-existent.",
    scientificReasoning: "E-values decrease exponentially as alignment scores increase. Very low E-values (typically below 1e-4) provide reliable evidence of structural homology and shared evolutionary history.",
    xpReward: 150
  },
  {
    id: "chal-phred-score",
    category: "Bioinformatics Applications",
    type: "text",
    title: "Phred Quality Score Probability",
    difficulty: "Expert",
    description: "Phred quality scores logarithmically link the base-calling error probabilities in raw sequencer reads (FASTQ files).",
    instructions: "A Phred score of Q30 represents 99.9% accuracy. Calculate the probability of an incorrect base call at this position. Format as a decimal.",
    initialSequence: "FASTQ Quality: Q30",
    question: "What is the decimal probability of a base-call error for a Phred score of Q30 (e.g., 0.01)?",
    correctAnswer: "0.001",
    explanation: "A Phred score Q is calculated as Q = -10 * log10(P). For Q30, the error probability P is 10^(-3) which is 0.001 (1 in 1000 chance of error).",
    scientificReasoning: "Phred scores let downstream mappers ignore low-quality sequencing reads, reducing the false discovery rate in variant and clinical disease mutations calling.",
    xpReward: 250
  },
  {
    id: "chal-pharmacogenomics-dose",
    category: "Bioinformatics Applications",
    type: "choice",
    title: "CYP2D6 Polymorphism Risk",
    difficulty: "Intermediate",
    description: "Codeine is a prodrug that is metabolized in the liver into morphine by the enzyme CYP2D6. Genetic polymorphisms can render a patient an 'ultra-rapid metabolizer' or 'poor metabolizer'.",
    instructions: "Determine the safety profile of codeine dosage in ultra-rapid metabolizers.",
    question: "Is an ultra-rapid metabolizer at high risk of morphine toxicity when prescribed a standard dose of codeine?",
    options: ["Yes, due to rapid conversion to active morphine", "No, because they clear the drug too quickly to take effect", "No, they are completely immune to morphine", "Yes, because their liver cannot synthesize enzymes"],
    correctAnswer: 0, // Index 0 is Yes
    explanation: "Yes, ultra-rapid metabolizers convert codeine to morphine extremely rapidly, which can lead to dangerously high levels of morphine and potential respiratory depression.",
    scientificReasoning: "Pharmacogenomics uses genetic screens to spot these metabolic risks, allowing clinicians to choose safer alternative medications or adjust doses based on patient genetic profiles.",
    xpReward: 180
  }
];

export const CODON_TABLE: Record<string, string> = {
  "ATT": "I", "ATC": "I", "ATA": "I",
  "CTT": "L", "CTC": "L", "CTA": "L", "CTG": "L", "TTA": "L", "TTG": "L",
  "GTT": "V", "GTC": "V", "GTA": "V", "GTG": "V",
  "TTT": "F", "TTC": "F",
  "ATG": "M", // Start
  "TGT": "C", "TGC": "C",
  "GCT": "A", "GCC": "A", "GCA": "A", "GCG": "A",
  "GGT": "G", "GGC": "G", "GGA": "G", "GGG": "G",
  "CCT": "P", "CCC": "P", "CCA": "P", "CCG": "P",
  "ACT": "T", "ACC": "T", "ACA": "T", "ACG": "T",
  "TCT": "S", "TCC": "S", "TCA": "S", "TCG": "S", "AGT": "S", "AGC": "S",
  "TAT": "Y", "TAC": "Y",
  "TGG": "W",
  "CAA": "Q", "CAG": "Q",
  "AAT": "N", "AAC": "N",
  "CAT": "H", "CAC": "H",
  "GAA": "E", "GAG": "E",
  "GAT": "D", "GAC": "D",
  "AAA": "K", "AAG": "K",
  "CGT": "R", "CGC": "R", "CGA": "R", "CGG": "R", "AGA": "R", "AGG": "R",
  "TAA": "Stop", "TAG": "Stop", "TGA": "Stop"
};
