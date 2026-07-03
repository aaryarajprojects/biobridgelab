import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, Sliders, Dna, Grid, LayoutGrid, Sparkles, 
  Eye, EyeOff, ZoomIn, ZoomOut, Check, Copy, HelpCircle, Info
} from 'lucide-react';

interface SequenceVisualizerProps {
  sequence: string;
  type?: 'dna' | 'rna' | 'protein';
  title?: string;
  id: string;
  highlightedPositions?: number[]; // 1-based indices of bases to highlight
  onBaseClick?: (index: number, base: string) => void;
  showRuler?: boolean;
}

interface BaseStyle {
  name: string;
  standard: string;
  highContrast: string;
  neon: string;
}

const NUCLEOTIDE_STYLES: Record<string, BaseStyle> = {
  'A': {
    name: 'Adenine',
    standard: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/80',
    highContrast: 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-750',
    neon: 'bg-slate-950 text-emerald-400 border-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.35)] hover:border-emerald-400'
  },
  'T': {
    name: 'Thymine',
    standard: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100/80',
    highContrast: 'bg-rose-600 text-white border-rose-700 hover:bg-rose-750',
    neon: 'bg-slate-950 text-rose-400 border-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.35)] hover:border-rose-400'
  },
  'G': {
    name: 'Guanine',
    standard: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/80',
    highContrast: 'bg-amber-600 text-white border-amber-700 hover:bg-amber-750',
    neon: 'bg-slate-950 text-amber-400 border-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.35)] hover:border-amber-400'
  },
  'C': {
    name: 'Cytosine',
    standard: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100/80',
    highContrast: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-750',
    neon: 'bg-slate-950 text-blue-400 border-blue-500/60 shadow-[0_0_8px_rgba(59,130,246,0.35)] hover:border-blue-400'
  },
  'U': {
    name: 'Uracil',
    standard: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100/80',
    highContrast: 'bg-purple-600 text-white border-purple-700 hover:bg-purple-750',
    neon: 'bg-slate-950 text-purple-400 border-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.35)] hover:border-purple-400'
  },
  '-': {
    name: 'Gap (Indel)',
    standard: 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/80',
    highContrast: 'bg-slate-700 text-white border-slate-800 hover:bg-slate-800',
    neon: 'bg-slate-950 text-slate-500 border-slate-800/80 hover:border-slate-700'
  }
};

const COMPLEMENT_MAP: Record<string, string> = {
  'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G', 'U': 'A', '-': '-'
};

export default function SequenceVisualizer({
  sequence,
  type = 'dna',
  title,
  id,
  highlightedPositions = [],
  onBaseClick,
  showRuler = true
}: SequenceVisualizerProps) {
  // Sanitize input sequence (uppercase, remove whitespaces/newlines)
  const sanitizedSeq = useMemo(() => {
    return sequence.toUpperCase().replace(/[\s\r\n]+/g, '');
  }, [sequence]);

  // States
  const [theme, setTheme] = useState<'standard' | 'highContrast' | 'neon'>('standard');
  const [groupSize, setGroupSize] = useState<3 | 10 | 0>(0); // 3 (codons), 10 (decamers), 0 (continuous)
  const [zoomLevel, setZoomLevel] = useState<'sm' | 'md' | 'lg'>('md');
  const [showComplement, setShowComplement] = useState<boolean>(false);
  const [searchPattern, setSearchPattern] = useState<string>('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Frequency analysis
  const baseCounts = useMemo(() => {
    const counts: Record<string, number> = { A: 0, T: 0, G: 0, C: 0, U: 0, other: 0 };
    for (const char of sanitizedSeq) {
      if (char in counts) {
        counts[char]++;
      } else {
        counts.other++;
      }
    }
    return counts;
  }, [sanitizedSeq]);

  const basePercentages = useMemo(() => {
    const total = sanitizedSeq.length || 1;
    return {
      A: ((baseCounts.A / total) * 100).toFixed(1),
      T: ((baseCounts.T / total) * 100).toFixed(1),
      G: ((baseCounts.G / total) * 100).toFixed(1),
      C: ((baseCounts.C / total) * 100).toFixed(1),
      U: ((baseCounts.U / total) * 100).toFixed(1),
      other: ((baseCounts.other / total) * 100).toFixed(1)
    };
  }, [baseCounts, sanitizedSeq.length]);

  // Handle Copy
  const handleCopySequence = () => {
    navigator.clipboard.writeText(sanitizedSeq).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Find occurrences of search pattern
  const searchMatchIndices = useMemo(() => {
    if (!searchPattern || searchPattern.trim().length < 2) return [];
    const pattern = searchPattern.toUpperCase().trim();
    const indices: number[] = [];
    let idx = sanitizedSeq.indexOf(pattern);
    while (idx !== -1) {
      for (let i = 0; i < pattern.length; i++) {
        indices.push(idx + i + 1); // Store 1-based indices
      }
      idx = sanitizedSeq.indexOf(pattern, idx + 1);
    }
    return indices;
  }, [sanitizedSeq, searchPattern]);

  // Combine highlights from props and search
  const activeHighlights = useMemo(() => {
    const set = new Set<number>();
    highlightedPositions.forEach(pos => set.add(pos));
    searchMatchIndices.forEach(pos => set.add(pos));
    return set;
  }, [highlightedPositions, searchMatchIndices]);

  // Size styling classes
  const sizeClasses = {
    sm: {
      block: 'w-5 h-6 text-[9px] border',
      container: 'gap-0.5 p-1.5'
    },
    md: {
      block: 'w-7 h-8 text-[11px] border',
      container: 'gap-1 p-3'
    },
    lg: {
      block: 'w-9 h-10 text-[13px] border-1.5',
      container: 'gap-1.5 p-4'
    }
  };

  const selectedSize = sizeClasses[zoomLevel];

  // Helper to determine component theme styling
  const getThemeContainerClass = () => {
    switch (theme) {
      case 'highContrast':
        return 'bg-slate-900 border-slate-950 text-white';
      case 'neon':
        return 'bg-slate-950 border-emerald-950/40 text-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.4)]';
      case 'standard':
      default:
        return 'bg-white border-slate-200 text-slate-800 shadow-3xs';
    }
  };

  // Helper to format or structure bases with group spacings
  const renderBases = () => {
    const elements: React.ReactNode[] = [];
    const len = sanitizedSeq.length;

    for (let i = 0; i < len; i++) {
      const base = sanitizedSeq[i];
      const pos = i + 1; // 1-based index
      const isHighlighted = activeHighlights.has(pos);
      const isSearchHit = searchMatchIndices.includes(pos);
      const isHovered = hoveredIndex === pos;

      // Base Styling
      const baseStyle = NUCLEOTIDE_STYLES[base] || {
        name: 'Amino Acid / Other',
        standard: 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200',
        highContrast: 'bg-slate-600 text-white border-slate-700',
        neon: 'bg-slate-950 text-slate-400 border-slate-800 shadow-[0_0_6px_rgba(148,163,184,0.15)] hover:border-slate-500'
      };

      const styleClass = baseStyle[theme];

      // Outline highlight styles
      let highlightOutline = '';
      if (isSearchHit) {
        highlightOutline = 'ring-2 ring-yellow-400 ring-offset-1 dark:ring-yellow-500 scale-105 z-10 shadow-md';
      } else if (isHighlighted) {
        highlightOutline = 'ring-2 ring-teal-500 ring-offset-1 scale-105 z-10 shadow-sm';
      }

      const blockEl = (
        <div key={`col-${pos}`} className="flex flex-col items-center">
          {/* Base blocks container */}
          <div className="relative">
            <button
              id={`${id}-base-btn-${pos}`}
              type="button"
              onMouseEnter={() => setHoveredIndex(pos)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onBaseClick?.(pos, base)}
              className={`font-mono font-black rounded-lg flex items-center justify-center transition-all cursor-pointer uppercase ${selectedSize.block} ${styleClass} ${highlightOutline} ${
                isHovered ? 'scale-110 z-20 shadow-md border-teal-500' : ''
              }`}
            >
              {base}
            </button>

            {/* Position popup on hover */}
            {isHovered && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow z-50 whitespace-nowrap font-mono">
                {baseStyle.name} #{pos}
              </div>
            )}
          </div>

          {/* Optional complement block under */}
          {showComplement && (
            <div className="mt-1 flex flex-col items-center">
              <div className="w-px h-1.5 bg-slate-400/50" />
              <div
                className={`font-mono font-bold rounded-lg flex items-center justify-center transition-all uppercase ${selectedSize.block} ${
                  NUCLEOTIDE_STYLES[COMPLEMENT_MAP[base] || '-']?.[theme] || 'bg-slate-200'
                } opacity-80`}
              >
                {COMPLEMENT_MAP[base] || '-'}
              </div>
            </div>
          )}

          {/* Ruler tick mark */}
          {showRuler && (pos === 1 || pos % 10 === 0 || pos === len) && (
            <div className="mt-1 flex flex-col items-center font-mono text-[8px] font-extrabold text-slate-400">
              <div className="w-0.5 h-1 bg-slate-300" />
              <span className="mt-0.5">{pos}</span>
            </div>
          )}
        </div>
      );

      elements.push(blockEl);

      // Add group dividers
      const nextPos = pos;
      if (groupSize > 0 && nextPos < len && nextPos % groupSize === 0) {
        elements.push(
          <div 
            key={`divider-${pos}`} 
            className={`self-stretch flex items-center justify-center font-mono opacity-25 font-bold ${
              groupSize === 3 ? 'mx-0.5 text-slate-400' : 'mx-1.5 text-slate-500'
            }`}
          >
            {groupSize === 3 ? '•' : '||'}
          </div>
        );
      }
    }

    return elements;
  };

  return (
    <div 
      className={`border rounded-2xl p-4 md:p-5 space-y-4 transition-all duration-300 ${getThemeContainerClass()}`} 
      id={id}
      data-testid="sequence-visualizer-container"
    >
      {/* Visualizer Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/40 pb-3">
        <div className="space-y-1">
          {title && (
            <h4 className="text-xs font-black uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
              <Dna className="w-4 h-4 animate-pulse" />
              {title}
            </h4>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full uppercase">
              {type === 'dna' ? 'Double-Helix Template' : type === 'rna' ? 'mRNA Transcript' : 'Polypeptide Chain'}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold">
              Length: {sanitizedSeq.length} bp
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom Level Selector */}
          <div className="flex items-center bg-slate-100/80 rounded-lg p-0.5 border border-slate-200">
            <button
              id={`${id}-zoom-sm-btn`}
              type="button"
              onClick={() => setZoomLevel('sm')}
              className={`p-1 rounded cursor-pointer ${zoomLevel === 'sm' ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-400 hover:text-slate-600'}`}
              title="Small view size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              id={`${id}-zoom-md-btn`}
              type="button"
              onClick={() => setZoomLevel('md')}
              className={`p-1 rounded cursor-pointer ${zoomLevel === 'md' ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-400 hover:text-slate-600'}`}
              title="Medium view size"
            >
              <span className="text-[10px] px-0.5 font-bold font-mono">1x</span>
            </button>
            <button
              id={`${id}-zoom-lg-btn`}
              type="button"
              onClick={() => setZoomLevel('lg')}
              className={`p-1 rounded cursor-pointer ${zoomLevel === 'lg' ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-400 hover:text-slate-600'}`}
              title="Large view size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grouping Spacing Selector */}
          <div className="flex items-center bg-slate-100/80 rounded-lg p-0.5 border border-slate-200">
            <button
              id={`${id}-group-none-btn`}
              type="button"
              onClick={() => setGroupSize(0)}
              className={`px-2 py-1 text-[9px] font-bold rounded cursor-pointer ${groupSize === 0 ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-700'}`}
              title="Continuous flow"
            >
              Stream
            </button>
            {type !== 'protein' && (
              <button
                id={`${id}-group-codon-btn`}
                type="button"
                onClick={() => setGroupSize(3)}
                className={`px-2 py-1 text-[9px] font-bold rounded cursor-pointer ${groupSize === 3 ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-700'}`}
                title="Group into triplet codons"
              >
                Codons
              </button>
            )}
            <button
              id={`${id}-group-decamer-btn`}
              type="button"
              onClick={() => setGroupSize(10)}
              className={`px-2 py-1 text-[9px] font-bold rounded cursor-pointer ${groupSize === 10 ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-700'}`}
              title="Group into decamers (sets of 10)"
            >
              Sets of 10
            </button>
          </div>

          {/* Visual Theme Selector */}
          <select
            id={`${id}-theme-select`}
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-extrabold px-2.5 py-1 focus:outline-none cursor-pointer transition-all text-slate-700"
          >
            <option value="standard">🎨 Standard Classic</option>
            <option value="highContrast">🎨 High-Contrast Light</option>
            <option value="neon">🎨 Neon Dark mode</option>
          </select>

          {/* Copy Sequence button */}
          <button
            id={`${id}-copy-seq-btn`}
            type="button"
            onClick={handleCopySequence}
            className="p-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer transition-all shadow-3xs"
            title="Copy clean sequence"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Visualizer Body containing Dynamic Render Grid */}
      <div className="space-y-4">
        {/* Alignment & Complementary strand toggle bar */}
        {type !== 'protein' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 p-2 border border-slate-200/55 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Info className="w-3.5 h-3.5 text-teal-600" />
              <span>Hover over nucleotides to locate coordinates and chemical classifications.</span>
            </div>
            
            <button
              id={`${id}-toggle-complement-btn`}
              type="button"
              onClick={() => setShowComplement(!showComplement)}
              className={`px-3 py-1 text-[10px] font-extrabold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs ${
                showComplement 
                  ? 'bg-teal-50 text-teal-800 border-teal-300' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {showComplement ? <Eye className="w-3.5 h-3.5 text-teal-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              <span>{showComplement ? 'Hide Anti-Parallel Strand' : 'Show Complementary Strand'}</span>
            </button>
          </div>
        )}

        {/* Base Search Pattern Field */}
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </span>
          <input
            id={`${id}-search-input`}
            type="text"
            value={searchPattern}
            onChange={(e) => setSearchPattern(e.target.value.toUpperCase().replace(/[^ATGCU-]/g, ''))}
            placeholder="Search pattern inside sequence (e.g., ATG)..."
            className="w-full pl-9 pr-8 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] placeholder-slate-400 text-slate-800 font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white focus:border-teal-500 transition-all shadow-3xs"
          />
          {searchPattern && (
            <button
              id={`${id}-clear-search-btn`}
              type="button"
              onClick={() => setSearchPattern('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* DNA Base Array Container Scroll Box */}
        <div 
          className="w-full overflow-x-auto p-1.5 rounded-xl bg-slate-100/50 border border-slate-200/40 select-none shadow-inner"
          id={`${id}-sequence-scroll-container`}
        >
          <div className={`flex flex-wrap items-end ${selectedSize.container}`}>
            {renderBases()}
          </div>
        </div>
      </div>

      {/* Frequency analysis and visual legend details */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-3 border-t border-slate-200/40">
        {[
          { key: 'A', name: 'Adenine (A)', color: 'bg-emerald-500', count: baseCounts.A, percent: basePercentages.A },
          type === 'rna' 
            ? { key: 'U', name: 'Uracil (U)', color: 'bg-purple-500', count: baseCounts.U, percent: basePercentages.U }
            : { key: 'T', name: 'Thymine (T)', color: 'bg-rose-500', count: baseCounts.T, percent: basePercentages.T },
          { key: 'G', name: 'Guanine (G)', color: 'bg-amber-500', count: baseCounts.G, percent: basePercentages.G },
          { key: 'C', name: 'Cytosine (C)', color: 'bg-blue-500', count: baseCounts.C, percent: basePercentages.C }
        ].map(legend => (
          <div 
            key={legend.key} 
            className="bg-slate-50/50 p-2 rounded-xl border border-slate-150 flex items-center justify-between text-[10px] shadow-3xs hover:border-slate-250 transition-all"
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded ${legend.color}`} />
              <span className="font-bold text-slate-700">{legend.key}</span>
            </div>
            <div className="font-mono text-right">
              <span className="font-black text-slate-800 block leading-none">{legend.count}</span>
              <span className="text-[8px] text-slate-400 block mt-0.5">{legend.percent}%</span>
            </div>
          </div>
        ))}

        {/* GC Ratio calculation */}
        {type !== 'protein' && (
          <div className="col-span-2 md:col-span-1 bg-teal-50/40 border border-teal-150 rounded-xl p-2 flex flex-col justify-center text-[10px] shadow-3xs">
            <span className="text-teal-900 font-bold leading-none block">GC Content Ratio:</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-[11px] font-black text-teal-800">
                {(((baseCounts.G + baseCounts.C) / (sanitizedSeq.length || 1)) * 100).toFixed(1)}%
              </span>
              <span className="text-[8px] text-slate-400 font-bold font-mono">
                {baseCounts.G + baseCounts.C} bp
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
