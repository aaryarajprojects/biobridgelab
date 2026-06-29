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
}

export interface DNASeqSample {
  name: string;
  description: string;
  sequence: string;
}

export interface Lesson {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  subtitle: string;
  shortDesc: string;
  duration: string;
  content: {
    title: string;
    paragraphs: string[];
    diagramType?: 'dna_structure' | 'transcription' | 'databases';
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
  {
    id: "dna-basics",
    level: 1,
    title: "Introduction to DNA Structure",
    subtitle: "The Blueprint of Life",
    shortDesc: "Learn how nucleotide bases (A, T, C, G) pair together to form the double helix structure.",
    duration: "5 mins",
    content: {
      title: "Understanding the Double Helix",
      paragraphs: [
        "Deoxyribonucleic Acid (DNA) is the molecule that carries genetic instructions for all living organisms. DNA is made of two strands twisted into a double helix.",
        "Each strand consists of a sugar-phosphate backbone and nitrogenous bases: Adenine (A), Thymine (T), Cytosine (C), and Guanine (G).",
        "Crucially, bases pair up according to strict rules: Adenine (A) always pairs with Thymine (T) via two hydrogen bonds, and Cytosine (C) always pairs with Guanine (G) via three hydrogen bonds. This is called complementary base pairing."
      ],
      diagramType: "dna_structure",
      quickQuiz: {
        question: "Which of the following base pairings is correct according to Watson-Crick pairing rules?",
        options: [
          "Adenine pairs with Cytosine (A-C)",
          "Adenine pairs with Thymine (A-T)",
          "Guanine pairs with Thymine (G-T)",
          "Cytosine pairs with Thymine (C-T)"
        ],
        correctIndex: 1,
        explanation: "Adenine always pairs with Thymine (A-T) via two hydrogen bonds, and Cytosine always pairs with Guanine (C-G) via three hydrogen bonds."
      }
    }
  },
  {
    id: "transcription-translation",
    level: 1,
    title: "Transcription & Translation",
    subtitle: "The Central Dogma",
    shortDesc: "Explore how genetic code translates into functional proteins via mRNA intermediates.",
    duration: "8 mins",
    content: {
      title: "From Gene to Protein",
      paragraphs: [
        "The Central Dogma of molecular biology describes the flow of genetic information: DNA is transcribed into RNA, which is then translated into protein.",
        "In transcription, an enzyme called RNA polymerase reads the template DNA strand and synthesizes a complementary Single-Stranded mRNA. In RNA, Uracil (U) replaces Thymine (T).",
        "During translation, the ribosome reads mRNA in groups of three bases called 'codons'. Each codon specifies a single amino acid. For example, AUG is the universal start codon, specifying Methionine (Met)."
      ],
      diagramType: "transcription",
      quickQuiz: {
        question: "If a DNA template strand has the sequence 3'-TAC-5', what is the transcribed mRNA codon sequence?",
        options: [
          "5'-ATG-3'",
          "5'-AUG-3'",
          "5'-UAG-3'",
          "5'-GUA-3'"
        ],
        correctIndex: 1,
        explanation: "Complementary base pairing of TAC with RNA rules: T pairs with A, A with U (since RNA has Uracil), and C with G. Thus, TAC transcribes into AUG."
      }
    }
  },
  {
    id: "sequencing-tech",
    level: 2,
    title: "DNA Sequencing Technologies",
    subtitle: "Reading the Genome",
    shortDesc: "Discover Sanger Sequencing and modern Next-Generation Sequencing (NGS) methods.",
    duration: "10 mins",
    content: {
      title: "The Evolution of Sequencing",
      paragraphs: [
        "DNA sequencing is the process of determining the exact order of nucleotides in a DNA molecule.",
        "Sanger sequencing (First-Generation) relies on chain-terminating dideoxynucleotides (ddNTPs) and capillary electrophoresis. It is highly accurate and good for single genes but low-throughput.",
        "Next-Generation Sequencing (NGS) parallelizes millions of reactions simultaneously, allowing entire human genomes to be sequenced in hours at a fraction of the cost."
      ],
      quickQuiz: {
        question: "What is the primary advantage of Next-Generation Sequencing (NGS) over Sanger sequencing?",
        options: [
          "It can sequence single molecules with zero errors.",
          "It uses no enzymes or chemical reagents.",
          "It parallelizes millions of sequencing reactions for ultra-high throughput.",
          "It is only useful for bacteria."
        ],
        correctIndex: 2,
        explanation: "NGS uses massive parallelization, allowing millions to billions of short fragments to be sequenced in a single run, revolutionizing genomic throughput and cost."
      }
    }
  },
  {
    id: "databases",
    level: 2,
    title: "Biological Databases",
    subtitle: "The Libraries of Bioinformatics",
    shortDesc: "Navigate GenBank, UniProt, and BLAST to retrieve and study universal sequence data.",
    duration: "7 mins",
    content: {
      title: "Where Biological Data Lives",
      paragraphs: [
        "Bioinformatics exploded because scientists agreed to share their data globally. Key open databases contain millions of sequences, structures, and publications.",
        "NCBI GenBank holds all publicly available nucleotide sequences. UniProt is the primary hub for protein sequence and functional annotation.",
        "BLAST (Basic Local Alignment Search Tool) is a web-based algorithm used to compare an query sequence against these massive database libraries to find homologous matches."
      ],
      diagramType: "databases",
      quickQuiz: {
        question: "Which database would you search if you wanted to find structural annotations and curated functional details of a human protein?",
        options: [
          "NCBI PubMed",
          "UniProt KB",
          "GitHub",
          "Wikipedia"
        ],
        correctIndex: 1,
        explanation: "UniProt KB (Knowledgebase) is the comprehensive resource for protein sequences, annotations, and functional data."
      }
    }
  },
  {
    id: "alignment-basics",
    level: 3,
    title: "Sequence Alignment Concepts",
    subtitle: "Finding Similarity",
    shortDesc: "Master Global (Needleman-Wunsch) and Local (Smith-Waterman) sequence alignment.",
    duration: "12 mins",
    content: {
      title: "Aligning Molecules",
      paragraphs: [
        "Sequence alignment is the arrangement of two or more DNA or protein sequences to identify regions of similarity.",
        "Global alignment attempts to align every residue from end to end of both sequences (ideal for similar length genes).",
        "Local alignment searches for isolated islands of high similarity, ignoring highly divergent flanking regions (ideal for finding functional domains in multi-domain proteins)."
      ],
      quickQuiz: {
        question: "When comparing two distantly related proteins that share only a single small active pocket, which alignment strategy is best?",
        options: [
          "Global Alignment (Needleman-Wunsch)",
          "Local Alignment (Smith-Waterman)",
          "Whole-Genome Assembly",
          "No alignment is possible"
        ],
        correctIndex: 1,
        explanation: "Local alignment is designed specifically to detect small islands of high similarity within longer, unrelated sequences."
      }
    }
  }
];

export const CHALLENGES: Challenge[] = [
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
    explanation: "The DNA sequence 'ATGCGTAC' is 8 bases long. It contains 2 Guanines (G) and 2 Cytosines (C), totaling 4 GC bases. Thus, 4 / 8 = 50% GC content. Higher GC percentage translates to 3 hydrogen bonds per pair, yielding thermal stability.",
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
    explanation: "Under Watson-Crick rules, Adenine (A) matches with Thymine (T) and Cytosine (C) matches with Guanine (G). The exact complement of 'AGCTAGC' is 'TCGATCG'.",
    xpReward: 100
  },
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
    explanation: "At position 8, the wild-type reference strand features a Cytosine (C) nucleotide, whereas the patient strand displays a Guanine (G). This represents a single nucleotide polymorphism (SNP).",
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
    xpReward: 150
  },
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
    explanation: "The first three bases are CCG. Bases 4 to 6 are ATG, which constitutes the start codon (Met), marking the correct 1-indexed position 4 as the start of translation.",
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
    xpReward: 200
  },
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
    explanation: "Since all DNA fragments have uniform mass-to-charge ratios, they feel proportional electrostatic forces. The separation is purely size-based: the gel polymer mesh acts as a physical sieve, causing larger fragments to experience higher friction and slow down, while smaller fragments slip through easily.",
    xpReward: 250
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
