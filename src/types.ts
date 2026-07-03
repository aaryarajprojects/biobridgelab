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
  learningLevel?: 1 | 2 | 3 | 4 | 5;
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
  level: 1 | 2 | 3 | 4 | 5;
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
  },
  // ================= LEVEL 1 EXTRA LESSONS =================
  {
    id: "rna-world",
    level: 1,
    title: "The RNA World and RNA Types",
    subtitle: "Beyond Messenger RNA",
    shortDesc: "Explore the ancient origins of life and the diverse functional classes of RNA molecules that govern cellular biology.",
    duration: "12 mins",
    content: {
      title: "The Multitude of RNA Roles & Evolutionary Origins",
      paragraphs: [
        "While DNA serves as the passive, stable hard-drive of genetic information, Ribonucleic Acid (RNA) is a dynamic, multi-talented molecular worker. Structurally, RNA differs from DNA by containing a ribose sugar (possessing a reactive 2'-hydroxyl group) instead of deoxyribose, and using the base Uracil (U) instead of Thymine (T).",
        "The 'RNA World Hypothesis' proposes that early life forms relied entirely on RNA to both store genetic information and catalyze chemical reactions. This dual capability is highlighted by ribozymes—RNA molecules that possess enzymatic activity, such as the ribosomal RNA that catalyzes peptide bond formation.",
        "In modern cells, RNA functions far beyond simple messenger RNA (mRNA). Transfer RNA (tRNA) and ribosomal RNA (rRNA) are the structural and catalytic backbones of translation. Small nuclear RNAs (snRNAs) drive spliceosome assembly. MicroRNAs (miRNAs) and small interfering RNAs (siRNAs) act as post-transcriptional regulators, targeting mRNA transcripts for degradation or translational repression."
      ],
      learningObjective: "Compare the structural differences between DNA and RNA, and distinguish between messenger, ribosomal, transfer, and regulatory RNA classes.",
      keyConcepts: [
        "The reactive 2'-OH group on ribose makes RNA more chemically versatile but less stable than DNA.",
        "Ribozymes prove that nucleic acids can behave as enzymes, supporting the RNA World Hypothesis.",
        "Diverse RNA families (mRNA, tRNA, rRNA, snRNA, miRNA) cooperate to control gene expression and protein synthesis."
      ],
      interactiveExample: {
        title: "RNA Structure & Type Selector",
        description: "Select various RNA categories to inspect their specialized configurations and biological roles.",
        type: "rna_explorer"
      },
      miniActivity: {
        prompt: "Which class of RNA molecules associates with proteins to form the spliceosome complexes that remove introns?",
        options: ["tRNA", "miRNA", "snRNA", "rRNA"],
        correctAnswer: "snRNA",
        feedback: "Correct! Small nuclear RNAs (snRNAs) combine with proteins to form small nuclear ribonucleoproteins (snRNPs), the active components of the spliceosome."
      },
      summary: "RNA is a structurally versatile molecule that acts as both a genetic carrier and a biochemical catalyst. This support for catalytic and informational roles underpins the hypothesis that life originated in an RNA-dominated world.",
      quickQuiz: {
        question: "What is the primary evolutionary and chemical evidence supporting the RNA World Hypothesis?",
        options: [
          "RNA is completely immune to heat denaturation",
          "RNA can act as both an information-carrying template and a biological catalyst (ribozyme)",
          "RNA contains deoxyribose sugars that form triple helices",
          "RNA is only synthesized by modern artificial intelligence systems"
        ],
        correctIndex: 1,
        explanation: "The discovery of ribozymes (like the ribosome) proved that RNA can fold into complex 3D shapes to catalyze biochemical reactions while simultaneously carrying sequence information, solving the 'chicken-and-egg' dilemma of whether proteins or DNA came first."
      }
    }
  },

  // ================= LEVEL 2 EXTRA LESSONS =================
  {
    id: "structural-bioinformatics",
    level: 2,
    title: "Structural Bioinformatics",
    subtitle: "Modeling Protein Folds",
    shortDesc: "Delve into the Protein Data Bank (PDB), secondary structures, and how computer models predict complex 3D protein folds.",
    duration: "15 mins",
    content: {
      title: "Mapping Proteins in Three Dimensions",
      paragraphs: [
        "An amino acid sequence is just a one-dimensional string. To perform its biological duty, a protein must fold into a highly specific three-dimensional conformation. Structural bioinformatics focuses on analyzing, modeling, and predicting these complex molecular geometries.",
        "Protein structure is organized into four distinct tiers. Primary structure is the linear sequence of amino acids. Secondary structure consists of localized, regular folding patterns—principally alpha-helices and beta-pleated sheets—stabilized by hydrogen bonds along the peptide backbone. Tertiary structure is the overall 3D packing of a single polypeptide, driven by hydrophobic collapse, salt bridges, and disulfide bonds. Quaternary structure involves the assembly of multiple polypeptide subunits.",
        "The Protein Data Bank (PDB) is the central global repository for coordinates obtained via X-ray crystallography, NMR, and cryo-EM. Recently, deep learning models like AlphaFold have revolutionized the field by predicting highly accurate 3D structures directly from 1D primary sequences, bypassing years of expensive laboratory testing."
      ],
      learningObjective: "Identify the four levels of protein structural organization and explain how public records coordinate macromolecular visualizations.",
      keyConcepts: [
        "Protein function is strictly determined by its folded 3D physical configuration.",
        "Secondary structures like alpha-helices are stabilized by hydrogen bonding along the peptide backbone.",
        "Deep learning tools utilize evolutionary sequence conservation to predict 3D folds with extreme accuracy."
      ],
      interactiveExample: {
        title: "3D Protein Fold Viewer",
        description: "Interact with alpha helices and beta sheets to learn how secondary elements align into tertiary folds.",
        type: "protein_structure"
      },
      miniActivity: {
        prompt: "What primary thermodynamic force drives the rapid folding of soluble proteins in an aqueous environment?",
        options: ["Covalent backbone cleavage", "Hydrophobic collapse (burial of nonpolar sidechains)", "Magnetic alignment of amino groups", "Active energy pumping by the nucleus"],
        correctAnswer: "Hydrophobic collapse (burial of nonpolar sidechains)",
        feedback: "Correct! Soluble proteins hide their hydrophobic nonpolar sidechains inside their core while exposing polar hydrophilic sidechains to water, minimizing free energy."
      },
      summary: "Proteins fold through complex thermodynamic pathways to achieve stable 3D states. Structural databases index these physical coordinate maps, and AI models have dramatically accelerated our ability to predict them.",
      quickQuiz: {
        question: "Which molecular database acts as the worldwide standard repository for three-dimensional biological macromolecular structures?",
        options: [
          "NCBI PubMed",
          "UniProt Consortium",
          "The Protein Data Bank (PDB)",
          "GenBank Nucleotide Library"
        ],
        correctIndex: 2,
        explanation: "The Protein Data Bank (PDB) specifically stores and archives 3D coordinate files (like .pdb or .cif) for proteins, nucleic acids, and complex assemblies."
      }
    }
  },

  // ================= LEVEL 3 EXTRA LESSONS =================
  {
    id: "primer-design-pcr",
    level: 3,
    title: "PCR and Primer Design",
    subtitle: "Amplifying the Signal",
    shortDesc: "Master the mathematical and thermodynamic rules for designing specific PCR primers to amplify targeted genomic loci.",
    duration: "12 mins",
    content: {
      title: "Principles of Polymerase Chain Reaction & Primer Engineering",
      paragraphs: [
        "The Polymerase Chain Reaction (PCR) is an indispensable molecular biology technique used to amplify a single copy or a few copies of a specific segment of DNA across several orders of magnitude, generating millions of copies.",
        "The reaction cycles through three thermal stages: Denaturation (typically ~95°C) to separate double-stranded DNA; Annealing (~50-65°C) to allow short synthetic DNA oligonucleotides, called primers, to bind complementary target sequences; and Extension (~72°C) where a thermostable DNA polymerase (like Taq polymerase) synthesizes the new strand.",
        "Success in PCR depends on precise primer design. Bioinformaticians apply strict design criteria: primers must be 18-25 nucleotides in length, have a melting temperature (Tm) between 55-65°C, avoid complementary self-binding (preventing 'primer-dimers'), and contain a G-C clamp (at least one G or C at the 3' end) to anchor polymerase binding."
      ],
      learningObjective: "Apply thermodynamic rules to calculate primer melting temperatures and screen for problematic self-complementarity.",
      keyConcepts: [
        "PCR utilizes thermal cycling to exponentially duplicate targeted DNA regions in vitro.",
        "Melting temperature (Tm) can be approximated using the Wallace formula: Tm = 2(A+T) + 4(G+C) for short sequences.",
        "3' self-complementarity must be eliminated to prevent primers from binding to themselves and forming dimers."
      ],
      interactiveExample: {
        title: "Thermodynamic Primer Designer",
        description: "Draft forward and reverse primers and evaluate their melting temperatures, GC-clamps, and self-binding properties.",
        type: "primer_designer"
      },
      miniActivity: {
        prompt: "Using the formula Tm = 2(A+T) + 4(G+C), estimate the melting temperature of the primer 'GCTAGC'.",
        options: ["12°C", "16°C", "20°C", "24°C"],
        correctAnswer: "20°C",
        feedback: "Correct! The 6-mer 'GCTAGC' contains 2 A/T bases and 4 G/C bases. 2(2) + 4(4) = 4 + 16 = 20°C."
      },
      summary: "PCR relies on thermal cycling to copy genes. Designing functional primers requires strict calculation of melting temperatures and avoidance of self-complementarity.",
      quickQuiz: {
        question: "Why is a 'G-C clamp' (presence of G or C bases at the 3' end of a primer) highly desirable in primer design?",
        options: [
          "G-C bases are lighter and make the tube spin faster",
          "G-C pairs are bound by three hydrogen bonds, creating a stronger, more stable anchor for the DNA polymerase at the synthesis starting point",
          "G-C clamps prevent any primers from dissolving in the liquid buffer",
          "G-C clamps trigger the destruction of any template contaminants"
        ],
        correctIndex: 1,
        explanation: "Because G-C pairs share three hydrogen bonds, they bond more tightly than A-T pairs. Placing them at the 3' end (the starting point for synthesis) ensures the primer is securely anchored to the template as elongation begins."
      }
    }
  },

  // ================= LEVEL 4 EXTRA LESSONS =================
  {
    id: "next-gen-sequencing",
    level: 4,
    title: "Next-Generation Sequencing",
    subtitle: "High-Throughput Sequencing",
    shortDesc: "Understand Illumina sequencing-by-synthesis chemistry, sequencing depth, coverage, and the power of single-cell RNA-seq.",
    duration: "15 mins",
    content: {
      title: "Massively Parallel Sequencing Technologies",
      paragraphs: [
        "Sanger sequencing was a breakthrough, but it can only sequence one DNA fragment at a time. Next-Generation Sequencing (NGS) has democratized genomics by enabling the massively parallel sequencing of millions of fragments simultaneously, slashing costs and timelines.",
        "A premier modern method is Illumina's sequencing-by-synthesis. Genomic DNA is fragmented, attached to a flow cell, and amplified into dense clonal clusters via bridge PCR. Fluorescently labeled, reversible-terminator nucleotides are then added. As each base is incorporated, a high-resolution camera captures the emitted light wavelength, recording the sequence letter by letter.",
        "NGS bioinformatics focuses on 'sequencing depth' (how many times a given base is read on average) and 'coverage' (what percentage of the genome is represented). In recent years, Single-Cell RNA-seq (scRNA-seq) has emerged, allowing researchers to measure gene expression inside individual cells, revealing hidden cellular diversity within complex tissues."
      ],
      learningObjective: "Explain the biochemical steps of sequencing-by-synthesis and calculate basic sequencing coverage and depth metrics.",
      keyConcepts: [
        "NGS processes millions of fragments in parallel, producing massive datasets in a single run.",
        "Sequencing-by-synthesis relies on reversible terminators that emit distinct fluorescent wavelengths.",
        "Single-cell transcriptomics separates individual cells to profile gene activity without blending tissue signals."
      ],
      interactiveExample: {
        title: "Illumina Read Simulator",
        description: "Watch fluorescent letters light up as a virtual flow cell reads synthetic cluster fragments.",
        type: "illumina_sim"
      },
      miniActivity: {
        prompt: "If a genome is 10 million base pairs long, and you sequence 100 million total base pairs, what is the theoretical average sequencing depth (X)?",
        options: ["1X", "5X", "10X", "100X"],
        correctAnswer: "10X",
        feedback: "Correct! Total sequenced bases / genome length = 100,000,000 / 10,000,000 = 10X sequencing depth."
      },
      summary: "Next-generation sequencing has made genomics high-throughput and affordable. Its computational analysis relies on aligning fragments to reference maps and managing sequencing depth.",
      quickQuiz: {
        question: "In next-generation sequencing, what does the metric 'Sequencing Depth' (e.g., 30X) represent?",
        options: [
          "The physical depth in micrometers of the glass flow cell",
          "The average number of times each unique nucleotide base in the genome is sequenced by independent reads",
          "The length of time in hours the sequencer machine is run",
          "The percentage of the genome that was successfully captured"
        ],
        correctIndex: 1,
        explanation: "Sequencing depth represents how many times a given genomic position is covered by raw sequenced reads. Higher depth (like 30X or 100X) is crucial for distinguishing true mutations from random sequencing errors."
      }
    }
  },

  // ================= LEVEL 5: SYSTEMS BIOLOGY & EPIGENOMICS =================
  {
    id: "epigenetics-chromatin",
    level: 5,
    title: "Epigenetics & Chromatin",
    subtitle: "The Structural Controls",
    shortDesc: "Investigate how DNA methylation, histone modifications, and nucleosome density control gene expression without changing the DNA sequence.",
    duration: "15 mins",
    content: {
      title: "Epigenetic Regulation and Chromatin Dynamics",
      paragraphs: [
        "The sequence of bases (A, T, C, G) is not the sole determinant of gene expression. Epigenetics refers to heritable changes in gene activity that do not involve alterations to the underlying DNA sequence. This regulation is achieved by altering the physical structure and accessibility of chromatin.",
        "Chromatin is composed of DNA wrapped around core octameric proteins called histones, forming repeating units called nucleosomes. When nucleosomes are packed tightly together (heterochromatin), transcription factors cannot access promoters, and genes are turned off. When nucleosomes are spaced widely apart (euchromatin), the DNA is accessible, and transcription can occur.",
        "Two main biochemical mechanisms govern this accessibility: DNA Methylation and Histone Modification. Methylation of Cytosines in CpG dinucleotides by DNA methyltransferases generally acts to recruit repressor proteins, silencing genes. Conversely, histone tail modifications—such as acetylation of lysine residues by Histone Acetyltransferases (HATs)—neutralize positive charges on the histone proteins, weakening their grip on negatively charged DNA and unpacking chromatin to activate transcription."
      ],
      learningObjective: "Contrast heterochromatin vs euchromatin, explain the impact of DNA methylation, and analyze how histone acetylation alters physical DNA binding.",
      keyConcepts: [
        "Epigenetics controls gene expression by changing physical accessibility to promoter elements.",
        "Histone acetylation neutralizes positive charges, relaxing the chromatin to allow transcription.",
        "CpG methylation is a stable, heritable epigenetic mark that typically silences gene transcription."
      ],
      interactiveExample: {
        title: "Chromatin Unfolding Simulation",
        description: "Add acetyl groups or methyl marks to watch histones bundle or unravel, exposing the promoter site.",
        type: "chromatin_sim"
      },
      miniActivity: {
        prompt: "Which enzyme is responsible for adding acetyl groups to lysine residues on histone tails, promoting chromatin relaxation?",
        options: ["Histone Deacetylase (HDAC)", "DNA Methyltransferase (DNMT)", "Histone Acetyltransferase (HAT)", "RNA Polymerase II"],
        correctAnswer: "Histone Acetyltransferase (HAT)",
        feedback: "Correct! Histone Acetyltransferases (HATs) add acetyl groups to relax chromatin, while Histone Deacetylases (HDACs) remove them to restore compact structures."
      },
      summary: "Epigenetics adds a layer of regulatory switches on top of DNA. Acetylation opens chromatin up to allow transcription, while methylation packs it tightly to silence expression.",
      quickQuiz: {
        question: "How does the acetylation of histone tail lysine residues physically trigger the unpacking of chromatin?",
        options: [
          "It physically cuts the DNA strands to shorten the chromosomes",
          "It neutralizes the positive charge of lysine, reducing the electrostatic attraction between histones and negatively charged DNA",
          "It replaces Thymine bases with Uracil in the histone core",
          "It pumps air into the nuclear membrane to expand chromatin"
        ],
        correctIndex: 1,
        explanation: "DNA is highly negatively charged due to its phosphate backbone, while lysines on histone tails are positively charged. Acetylating the lysine residues neutralizes their positive charge, causing the histones to release their tight grip on the DNA and unspool the chromatin."
      }
    }
  },
  {
    id: "gene-regulatory-networks",
    level: 5,
    title: "Gene Regulatory Networks",
    subtitle: "The Circuitry of Cells",
    shortDesc: "Understand how transcription factors, promoters, feedback loops, and feed-forward motifs cooperate to process inputs inside living systems.",
    duration: "15 mins",
    content: {
      title: "Network Motifs and Systems Biology Modeling",
      paragraphs: [
        "Cells are complex information processors. Rather than individual genes acting in isolation, genes are wired together into complex circuits called Gene Regulatory Networks (GRNs). In these networks, transcription factors (TFs) act as regulatory switches that bind to target promoter regions, activating or repressing transcription.",
        "Systems biology has revealed that GRNs are composed of recurring structural building blocks called network motifs. The simplest is the Feedback Loop. In a negative feedback loop, a protein represses its own production, which stabilizes expression levels and reduces noise. In a positive feedback loop, a protein activates its own production, which can create bistable switches (the cell commits to one of two stable states, crucial for differentiation).",
        "Another prevalent motif is the Feed-Forward Loop (FFL), consisting of three genes: a master regulator X, an intermediate regulator Y, and a target gene Z. FFLs can act as sign-sensitive delay filters (requiring a persistent signal to trigger target expression) or pulse generators, ensuring cells do not waste resources reacting to transient chemical noise."
      ],
      learningObjective: "Deconstruct feed-forward and feedback motifs, and model how these circuits filter cellular noise and establish binary state switches.",
      keyConcepts: [
        "Gene Regulatory Networks coordinate cellular behavior using transcription factor interactions.",
        "Negative feedback stabilizes cellular concentration levels, while positive feedback enables stable switches.",
        "Feed-forward loops filter out brief, transient environmental noise, preventing false trigger activations."
      ],
      interactiveExample: {
        title: "Network Motif Simulator",
        description: "Trigger transcriptional inputs on feed-forward and feedback motifs to observe real-time output curves.",
        type: "network_motif_sim"
      },
      miniActivity: {
        prompt: "Which network motif is characterized by a protein that actively represses its own transcription, serving to stabilize concentrations and suppress biological noise?",
        options: ["Positive Feedback Loop", "Negative Feedback Loop", "Coherent Feed-Forward Loop", "Bistable toggle switch"],
        correctAnswer: "Negative Feedback Loop",
        feedback: "Correct! Negative feedback loop is a widespread stabilizing mechanism in cellular circuits, correcting any excessive increases or decreases."
      },
      summary: "Cells process signals using logical network motifs. Feedback loops stabilize or switch states, while feed-forward motifs act as smart filters to ignore transient environmental noise.",
      quickQuiz: {
        question: "What is the primary biological advantage of a coherent Feed-Forward Loop with an 'AND' gate configuration?",
        options: [
          "It speeds up transcription so fast that the cell burst",
          "It acts as a delay filter that only activates the target gene when the input signal is highly persistent, ignoring transient chemical spikes",
          "It forces the cell to immediately undergo cell division",
          "It permanently disables the ribosome"
        ],
        correctIndex: 1,
        explanation: "In an 'AND'-gate feed-forward loop, both the master regulator X and the intermediate regulator Y must be active to trigger target Z. Since Y takes time to accumulate, a brief, transient signal of X will decay before Y can activate, filtering out biological noise."
      }
    }
  },
  {
    id: "synthetic-biology-circuits",
    level: 5,
    title: "Synthetic Gene Circuits",
    subtitle: "Programming Living Matter",
    shortDesc: "Explore how genetic engineers assemble synthetic toggle switches, repressilators, and logic gates to program living cells like computers.",
    duration: "15 mins",
    content: {
      title: "Engineering Biological Logic Gates and Oscillators",
      paragraphs: [
        "Synthetic Biology is an engineering discipline that applies design principles to biology. Instead of merely analyzing existing networks, synthetic biologists build novel biological pathways from standardized, interchangeable genetic parts, often referred to as BioBricks.",
        "A foundational milestone in synthetic biology was the construction of the genetic Toggle Switch. By wiring two mutually inhibitory transcription factors together, engineers created a bistable circuit. An external chemical pulse flips the switch into State A; a different pulse flips it into State B. The cell remembers its state even after the signal is removed, serving as a biological memory register.",
        "Another classic circuit is the Repressilator—a synthetic genetic clock made of three promoters linked in a cyclic loop of negative feedback. Promoter A represses B, B represses C, and C represses A. This creates stable, periodic oscillations of green fluorescent protein, letting cells keep perfect track of time. Today, these circuits are combined with logical gates (AND, OR, NOT) to engineer smart bacteria that can locate and destroy tumor cells in vivo."
      ],
      learningObjective: "Explain how mutually inhibitory transcription factors construct biological memory, and design genetic logic gates to compute cellular inputs.",
      keyConcepts: [
        "Synthetic biology constructs novel pathways using modular, characterized genetic building blocks.",
        "Mutually inhibitory transcription factor networks form toggle switches, serving as cellular memory.",
        "Genetic logic gates combine chemical inputs to determine whether a target reporter protein is expressed."
      ],
      interactiveExample: {
        title: "Genetic Circuit Builder",
        description: "Assemble biological NOT and AND gates with mutually inhibitory promoters to program a synthetic bacterial sensor.",
        type: "circuit_builder"
      },
      miniActivity: {
        prompt: "How many mutually inhibitory transcription factors are wired together to construct a classic, bistable genetic toggle switch?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: "Two",
        feedback: "Correct! A genetic toggle switch relies on two transcription factors that mutually repress each other, ensuring only one can be active at any given time."
      },
      summary: "Synthetic biology applies engineering principles to design cell logic. Toggle switches store biological memory, while cyclic negative feedback creates precise internal clocks.",
      quickQuiz: {
        question: "What is the 'Repressilator' in synthetic genetic engineering?",
        options: [
          "A large mechanical centrifuge used to squeeze DNA",
          "A synthetic three-gene loop of cyclic negative feedback that produces stable, periodic oscillations of gene expression",
          "An enzyme that permanently halts transcription across the entire genome",
          "A virtual computer virus that targets gene databases"
        ],
        correctIndex: 1,
        explanation: "The Repressilator (constructed in E. coli in 2000) is a famous synthetic gene circuit consisting of three genes in a closed loop, where each gene represses the next. This creates a stable, self-sustaining biological clock that oscillates periodic fluorescent signals."
      }
    }
  },
  {
    id: "advanced-genomic-sequencing",
    level: 4,
    title: "Advanced Genomic Sequencing",
    subtitle: "Long Reads and Epigenetic Direct-Sensing",
    shortDesc: "Compare third-generation sequencing platforms like PacBio SMRT and Oxford Nanopore with short-read platforms.",
    duration: "15 mins",
    content: {
      title: "Third-Generation Sequencing: Long Reads and Direct Sensing",
      paragraphs: [
        "While next-generation sequencing (NGS) revolutionized biology by reading millions of short fragments (150-300bp) in parallel, it struggles with highly repetitive genomic regions, large structural variants, and resolving complex diploid genomes.",
        "To overcome these hurdles, third-generation sequencing technologies—predominantly Pacific Biosciences (PacBio) and Oxford Nanopore Technologies (ONT)—were developed. These platforms generate ultra-long reads, ranging from 10,000 to over a million base pairs in a single continuous molecule.",
        "PacBio utilizes Single-Molecule Real-Time (SMRT) sequencing, observing DNA polymerase activity in zero-mode waveguides (ZMWs) using fluorescent phospholinked nucleotides. Nanopore sequencing, on the other hand, bypasses polymerases and optical detection altogether. It passes a single-stranded DNA molecule through a synthetic protein pore embedded in an electrically resistant membrane. As nucleotides pass through, they block the ionic current in characteristic ways, allowing real-time basecalling directly from electrical disruptions.",
        "Furthermore, because Oxford Nanopore directly measures raw DNA strands, it can directly detect base modifications—such as 5-methylcytosine (5mC)—without requiring chemical bisulfite conversion, preserving precious sample volumes and epigenetic states."
      ],
      learningObjective: "Contrast short-read and long-read sequencing technologies, and explain the physical principles of nanopore electrical current disruption.",
      keyConcepts: [
        "Short-read sequencing is highly accurate but fails to map repetitive regions or large structural insertions.",
        "PacBio SMRT sequencing uses circular consensus sequencing (CCS) to achieve extreme single-molecule accuracy (HiFi reads).",
        "Nanopore devices detect sequence changes by measuring ionic current blockages as DNA threads through a protein pore."
      ],
      interactiveExample: {
        title: "Long-Read Sequencing Assembly Simulator",
        description: "Adjust read length and raw error rates to see how they impact genome assembly completeness and contiguous block (N50) scores.",
        type: "long_read_assembly"
      },
      miniActivity: {
        prompt: "Which sequencing technology detects nucleotides by directly measuring ionic current disruptions through a synthetic membrane pore?",
        options: ["Sanger Sequencing", "Illumina Sequencing-by-Synthesis", "Oxford Nanopore Technologies (ONT)", "PacBio SMRT Sequencing"],
        correctAnswer: "Oxford Nanopore Technologies (ONT)",
        feedback: "Correct! Nanopore devices pass single DNA strands through a membrane pore, monitoring electrical current fluctuations to decode bases."
      },
      summary: "Third-generation sequencing provides long reads that resolve complex structural variations and repetitive regions, bypassing amplification biases and directly detecting epigenetic marks.",
      quickQuiz: {
        question: "What is the primary advantage of Oxford Nanopore and PacBio SMRT long-reads over Illumina short-reads?",
        options: [
          "They are much cheaper per gigabase for small diagnostic test runs",
          "They can span large structural variants, highly repetitive regions, and long transposable elements to assemble highly contiguous chromosomes",
          "They have zero raw sequencing errors right off the instrument",
          "They only require single-stranded RNA templates and cannot read double-stranded DNA"
        ],
        correctIndex: 1,
        explanation: "The primary strength of third-generation long reads is their physical span. Short reads (150bp) cannot bridge repetitive segments (e.g., centromeres or transposons) that are thousands of base pairs long, leaving gaps in draft assemblies. Long reads span these regions completely, resolving complex structural variations."
      }
    }
  },
  {
    id: "crispr-cas9-fundamentals",
    level: 4,
    title: "CRISPR-Cas9 Fundamentals",
    subtitle: "Precision Genome Surgery",
    shortDesc: "Understand the structural biology of the Cas9 endonuclease, the single guide RNA (sgRNA), and PAM recognition rules.",
    duration: "15 mins",
    content: {
      title: "Molecular Mechanisms of CRISPR-Cas9 Target Selection",
      paragraphs: [
        "Adapted from a bacterial adaptive immune system, the CRISPR-Cas9 system has revolutionized biotechnology by enabling programmable, double-stranded DNA cleavage inside living organisms.",
        "The system relies on two core components: the Cas9 endonuclease (the 'molecular scissors') and a single guide RNA (sgRNA). The sgRNA contains a constant scaffold region that binds tightly to Cas9, and a custom 20-nucleotide spacer region that dictates target specificity through base complementarity.",
        "However, Cas9 will not bind or cleave the target DNA based solely on sgRNA complementarity. It must first scan the DNA for a short, conserved sequence motif called the Protospacer Adjacent Motif (PAM). For the widely used SpCas9 from Streptococcus pyogenes, the PAM sequence is 5'-NGG-3' (where N is any nucleotide, followed by two Guanines).",
        "Once Cas9 binds a PAM site, it melts the adjacent double helix, allowing the 20bp spacer of the sgRNA to hybridize with the target strand (forming an 'R-loop'). If base pairing is complementary, Cas9's HNH and RuvC endonuclease domains execute a precise double-stranded break (DSB) exactly 3 base pairs upstream of the PAM. This break is then repaired by the host cell's native mechanisms, either by error-prone Non-Homologous End Joining (NHEJ) which introduces knockouts, or Homology-Directed Repair (HDR) which integrates custom templates."
      ],
      learningObjective: "Identify CRISPR components, explain the necessity of the PAM sequence, and design target guides with minimal off-target risks.",
      keyConcepts: [
        "The sgRNA spacer is a user-customizable 20bp sequence that guides Cas9 to its target.",
        "The PAM sequence (5'-NGG-3' for SpCas9) is an absolute prerequisite for Cas9 DNA binding and melting.",
        "Host repair pathways determine the outcome: NHEJ induces random insertions/deletions, whereas HDR inserts a specific edit template."
      ],
      interactiveExample: {
        title: "CRISPR-Cas9 sgRNA Target Designer",
        description: "Input a candidate genomic sequence to scan for PAM sites (NGG) and isolate functional 20bp guide sequences.",
        type: "crispr_designer"
      },
      miniActivity: {
        prompt: "For the standard SpCas9 enzyme, which sequence acts as the mandatory Protospacer Adjacent Motif (PAM)?",
        options: ["5'-AAAA-3'", "5'-TATA-3'", "5'-NGG-3'", "5'-GATC-3'"],
        correctAnswer: "5'-NGG-3'",
        feedback: "Correct! Streptococcus pyogenes Cas9 (SpCas9) specifically scans for the 5'-NGG-3' PAM motif to initiate DNA binding."
      },
      summary: "CRISPR-Cas9 enables programmable editing. Cas9 identifies target loci via PAM motifs (5'-NGG-3') and hybridizes an sgRNA spacer, causing double-stranded cuts repaired by host machinery.",
      quickQuiz: {
        question: "Why is the Protospacer Adjacent Motif (PAM) sequence necessary for Cas9 function?",
        options: [
          "It physically acts as the template for repairing the DNA break",
          "It binds directly to the ribose backbone of the sgRNA to stabilize the complex",
          "It is the target recognized by the host cell's protein degradation systems",
          "It acts as a physical license plate allowing Cas9 to bind and unwind the DNA helix, preventing Cas9 from cutting its own bacterial CRISPR array"
        ],
        correctIndex: 3,
        explanation: "The PAM sequence acts as a safety switch. Bacteria store viral memory sequences in their own genomes inside the 'CRISPR array'. Since these arrays do not contain a PAM sequence adjacent to the spacers, Cas9 ignores them, avoiding self-destruction. In target viral or mammalian DNA, the presence of PAM allows Cas9 to bind, unwind, and test for guide RNA complementarity."
      }
    }
  },
  {
    id: "proteomics-data-analysis",
    level: 5,
    title: "Proteomics Data Analysis",
    subtitle: "De Novo Peptide Sequencing",
    shortDesc: "Master the analysis of mass spectrometry (MS/MS) spectra, peptide mass fingerprinting, and sequence database searches.",
    duration: "15 mins",
    content: {
      title: "Mass Spectrometry and Computational Proteomics",
      paragraphs: [
        "While genomics reveals what *might* happen in a cell, proteomics—the comprehensive study of all expressed proteins—discloses what is actively occurring. Proteins, however, cannot be easily amplified like DNA, and their structural complexity requires high-resolution analytical tools.",
        "The standard method for large-scale proteomics is liquid chromatography-tandem mass spectrometry (LC-MS/MS) in a 'bottom-up' workflow. Proteins are first extracted and cleaved into short peptides using a sequence-specific protease, typically trypsin (which cuts after Lysine and Arginine).",
        "These peptides are separated by liquid chromatography, vaporized, and ionized. Inside the mass spectrometer (MS1), the intact peptides' mass-to-charge (m/z) ratios are measured. High-intensity peptide peaks are then isolated and smashed with inert gas molecules (collision-induced dissociation). This fragments the peptides predominantly along their amide bonds, producing a series of daughter ions.",
        "The resulting MS/MS (MS2) spectrum reveals the masses of these fragments. Since peptides fragment in a predictable manner—yielding N-terminal b-ions and C-terminal y-ions—the mass difference between adjacent peaks correspond exactly to the molecular weight of individual amino acids, enabling de novo sequence identification or database matching."
      ],
      learningObjective: "Interpret tandem mass spectrometry (MS/MS) spectra, calculate peptide charge states, and identify peptide sequences using fragmentation patterns.",
      keyConcepts: [
        "LC-MS/MS measures mass-to-charge ratios (m/z) of intact peptides and their fragmented daughter ions.",
        "Trypsin cleavage cuts proteins after basic residues (Lys, Arg), creating highly predictable peptide ends.",
        "Differences between adjacent peaks in an MS/MS spectrum indicate the exact molecular weights of sequential amino acids."
      ],
      interactiveExample: {
        title: "Tandem MS/MS Spectrum Solver",
        description: "Select custom peptide fragments and see how breaking amide bonds creates a sequence of b-ion and y-ion peaks.",
        type: "ms_spectrum_solver"
      },
      miniActivity: {
        prompt: "Which protease is most commonly used in bottom-up proteomics to cleave proteins after Lysine (K) and Arginine (R) residues?",
        options: ["Pepsin", "Chymotrypsin", "Trypsin", "Caspase-3"],
        correctAnswer: "Trypsin",
        feedback: "Correct! Trypsin is the workhorse enzyme of proteomics, cleaving specifically after basic amino acids to yield positively charged C-termini."
      },
      summary: "Proteomics identifies proteins via tandem mass spectrometry. Intact peptides are isolated (MS1), fragmented along amide backbones, and the resulting daughter ion mass differences (MS2) reveal the amino acid sequence.",
      quickQuiz: {
        question: "In an MS/MS peptide fragmentation spectrum, how is the sequence of amino acids computationally decoded?",
        options: [
          "By matching the fluorescent light color emitted during laser ablation",
          "By calculating the exact mass differences between adjacent peaks in a b-ion or y-ion series, which correspond to the molecular weights of specific amino acid residues",
          "By measuring the physical speed at which the protein unfolds",
          "By counting the number of carbon atoms using nuclear magnetic resonance"
        ],
        correctIndex: 1,
        explanation: "As peptides fragment during collision, they break at successive amide bonds. This produces a ladder of fragments (like y1, y2, y3). Because each step in the ladder differs by exactly one amino acid residue, the mass difference (in Daltons) between adjacent peaks corresponds directly to the mass of that amino acid (e.g., Alanine is 71.04 Da, Glycine is 57.02 Da)."
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
