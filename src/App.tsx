/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { 
  Compass, 
  Layers, 
  HelpCircle, 
  Atom, 
  Play, 
  Sparkles, 
  Globe, 
  BarChart, 
  Flame, 
  Dna, 
  BookOpen, 
  Calculator, 
  FileText, 
  Send, 
  ChevronRight, 
  ChevronDown,
  RefreshCw,
  Info,
  Database,
  Activity,
  Cpu,
  RotateCcw,
  Hash,
  X,
  Copy,
  Check,
  Network
} from "lucide-react";
import { METEM_DB, GRAPH } from "./data/metemDb";
import { UNIFIED_LEXICON_SYSTEMS } from "./data/metemLexicon";
import ChakraPanel from "./components/ChakraPanel";
import EntropyPanel from "./components/EntropyPanel";
import BioPanel from "./components/BioPanel";
import SystemsPanel from "./components/SystemsPanel";
import CalcPanel from "./components/CalcPanel";
import CodeReaderPanel from "./components/CodeReaderPanel";
import RefTablesPanel from "./components/RefTablesPanel";
import RefToolsPanel from "./components/RefToolsPanel";
import HawkinsProgramPanel from "./components/HawkinsProgramPanel";
import CelestialScalePanel from "./components/CelestialScalePanel";
import NumerologyPanel from "./components/NumerologyPanel";
import KnodeGraphPanel from "./components/KnodeGraphPanel";

// Reusable Tooltip component with instant-rendered definitions relative to systems
function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <span className="group relative inline-flex items-center cursor-help border-b border-dashed border-orange-500/30">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-[999] w-56 rounded bg-[#0b0806] border border-orange-500/50 p-2.5 text-[9px] font-mono leading-tight text-amber-50 shadow-2xl transition-all duration-300 whitespace-normal">
        <span className="block border-b border-orange-500/20 pb-1 mb-1 font-bold text-orange-400 uppercase tracking-widest font-mono text-[8px]">System Definition:</span>
        {content}
      </span>
    </span>
  );
}

interface Message {
  role: "user" | "model";
  text: string;
}

interface SavedChat {
  id: string;
  name: string;
  messages: Message[];
  timestamp: string;
}

const getSmallestSummary = (text: string): string => {
  if (!text) return "Empty Session";
  const clean = text.replace(/^[◈▩✦\s]+/, "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "Dialogue Session";
  const summaryText = words.slice(0, 4).join(" ");
  if (summaryText.length > 28) {
    return summaryText.substring(0, 25).trim() + "...";
  }
  return words.length > 4 ? summaryText + "..." : summaryText;
};

const firstQueries = [
  { label: "T × S = C Axiom Proof", query: "Explain the T × S = C law simply.", icon: Flame, color: "hover:border-orange-500/60 hover:text-orange-400 font-bold", score: 99 },
  { label: "Entropy S = C / T", query: "How is entropy derived from S = C / T?", icon: Atom, color: "hover:border-amber-500/60 hover:text-amber-300 font-bold", score: 94 }
];

const getDynamicSuggestions = (lastUserText: string, lastModelText: string) => {
  const userText = (lastUserText || "").toLowerCase();
  const modelText = (lastModelText || "").toLowerCase();

  const candidates = [
    {
      label: "T × S = C Axiom Proof",
      query: "Explain the T × S = C law simply.",
      icon: Flame,
      color: "hover:border-orange-500/60 hover:text-orange-400 font-bold",
      keywords: ["axiom", "proof", "law", "t x s = c", "txsc", "t*s=c", "fundamental", "barrier", "constant"]
    },
    {
      label: "Entropy S = C / T",
      query: "How is entropy derived from S = C / T?",
      icon: Atom,
      color: "hover:border-amber-500/60 hover:text-amber-300 font-bold",
      keywords: ["entropy", "s = c / t", "c / t", "parameter", "dispersion", "derivation", "thermodynamic", "boltzmann"]
    },
    {
      label: "Knode Graph Transitions",
      query: "How are Knode transition coordinates calculated?",
      icon: Network,
      color: "hover:border-orange-550 hover:text-orange-400",
      keywords: ["knode", "graph", "route", "link", "topology", "transition", "coordinates", "network"]
    },
    {
      label: "Linked systems list",
      query: "Which databases intersect with the active Knode?",
      icon: BookOpen,
      color: "hover:border-amber-500 hover:text-amber-400",
      keywords: ["linked", "db", "database", "intersect", "active", "system", "alignment"]
    },
    {
      label: "Nondual Vedic S-Limit",
      query: "How does Vedantic nonduality align with S-limit state dispersion?",
      icon: BookOpen,
      color: "hover:border-orange-500/50 hover:text-orange-400",
      keywords: ["nondual", "vedant", "hindu", "s-limit", "state dispersion", "liberation", "advaita", "oneness", "upanishad", "religion", "tradition"]
    },
    {
      label: "Hermetic Kybalion Vibration",
      query: "Explain Kybalion vibration under T × S = C standards.",
      icon: Sparkles,
      color: "hover:border-amber-500/50 hover:text-amber-400",
      keywords: ["hermetic", "kybalion", "vibration", "principle", "polarity", "rhythm", "emerald", "thoth", "tradition", "alchemy"]
    },
    {
      label: "Schwarzschild Boundary limits",
      query: "How does Schwarzschild density fit T × S = C?",
      icon: Sparkles,
      color: "hover:border-orange-500 hover:text-orange-400",
      keywords: ["schwarzschild", "boundary", "density", "black hole", "mass", "horizon", "gravity", "geometry"]
    },
    {
      label: "FMCS Planetary Scale",
      query: "Tell me about the Celestial Mass scale.",
      icon: Compass,
      color: "hover:border-amber-500 hover:text-amber-300",
      keywords: ["fmcs", "planetary", "stellar", "scale", "mass", "celestial", "evolution", "galaxy", "universe", "stars"]
    },
    {
      label: "Nine-Vessel Dimensionality",
      query: "Explain Pythagorean nine-vessel reductions.",
      icon: Hash,
      color: "hover:border-orange-500 hover:text-orange-400",
      keywords: ["nine-vessel", "pythagor", "numer", "reduction", "geometry", "vessel", "dimensional", "archetype", "nine"]
    },
    {
      label: "Golden Ratio (Phi) S-Limit",
      query: "How does the golden ratio optimize entropy?",
      icon: Layers,
      color: "hover:border-amber-500 hover:text-amber-400",
      keywords: ["golden ratio", "phi", "optimize", "fibonacci", "fractal", "limitation", "ratio"]
    },
    {
      label: "Ajna H-Calibration",
      query: "What is Ajna Solfeggio calibration?",
      icon: Flame,
      color: "hover:border-orange-500/50 hover:text-orange-400",
      keywords: ["ajna", "solfeggio", "calibration", "chakra", "third eye", "h-calibration", "vibration", "hz", "frequency"]
    },
    {
      label: "Frequency of Love (528Hz)",
      query: "Explain the 528 Hz vibration in T × S = C.",
      icon: Sparkles,
      color: "hover:border-amber-500/50 hover:text-amber-400",
      keywords: ["love", "528", "528hz", "coherence", "anahata", "heart", "frequency", "hz", "vibration"]
    },
    {
      label: "Bio S° Limits",
      query: "What are cellular molar entropy limits?",
      icon: Dna,
      color: "hover:border-orange-500/50 hover:text-orange-455",
      keywords: ["bio", "cellular", "molar", "entropy", "cellular life", "limit", "clausius", "molecular", "respiration"]
    },
    {
      label: "Boltzmann Scaling",
      query: "How does Boltzmann's constant scale with C?",
      icon: Atom,
      color: "hover:border-amber-500/50 hover:text-amber-300",
      keywords: ["boltzmann", "constant", "scale", "clausius", "thermodynamic", "entropy", "wave"]
    },
    {
      label: "Mitochondrial dΩ/dt",
      query: "Analyze human mitochondrial respiration.",
      icon: Dna,
      color: "hover:border-orange-500/50 hover:text-orange-400",
      keywords: ["mitochondrial", "domega/dt", "respiration", "metabolic", "cellular", "energy", "life", "cell"]
    },
    {
      label: "Biosphere S-Molar Boundaries",
      query: "Compare carbon molar entropy boundaries.",
      icon: BarChart,
      color: "hover:border-amber-500/50 hover:text-amber-400",
      keywords: ["biosphere", "carbon", "boundary", "molar", "ecosystem", "respiration", "envelope"]
    },
    {
      label: "Ken Wilber 4-Quadrants",
      query: "How do Ken Wilber's quadrants relate to entropy?",
      icon: Compass,
      color: "hover:border-orange-550/50 hover:text-orange-355",
      keywords: ["wilber", "quadrant", "developmental", "spiral", "integral", "all quadrants", "aqal", "quadrants"]
    },
    {
      label: "Supermind Evolution",
      query: "How does Aurobindo's 'Supermind' relate to T × S = C?",
      icon: Sparkles,
      color: "hover:border-amber-550/50 hover:text-amber-300",
      keywords: ["aurobindo", "supermind", "evolution", "consciousness", "divine", "integral yoga", "descent", "system", "state"]
    },
    {
      label: "Calibrating Joy (540)",
      query: "Explain Hawkins attractor field 540.",
      icon: Cpu,
      color: "hover:border-orange-500/50 hover:text-orange-355",
      keywords: ["hawkins", "attractor", "540", "joy", "calibration", "power vs force", "levels of consciousness"]
    },
    {
      label: "Integrity Inversion Point (200)",
      query: "Why is 200 the critical threshold in Hawkins Map?",
      icon: Activity,
      color: "hover:border-amber-500/50 hover:text-amber-300",
      keywords: ["inversion", "200", "integrity", "hawkins", "courage", "critical", "threshold", "attractor", "map"]
    },
    {
      label: "Planck normalized S",
      query: "Under Planck constant C = 1, does T = 1 / S?",
      icon: Calculator,
      color: "hover:border-orange-500/50 hover:text-orange-400",
      keywords: ["planck", "normalized", "c = 1", "proof", "solver", "equation", "fundamental"]
    },
    {
      label: "Eudaimonia dΩ/dt",
      query: "What is the formula of daily eudaimonia dΩ/dt?",
      icon: Sparkles,
      color: "hover:border-amber-500/50 hover:text-amber-400",
      keywords: ["eudaimonia", "domega", "domega/dt", "formula", "daily", "fulfillment", "spirit", "happiness"]
    }
  ];

  // 1. Identify active nodes/glossary items based on wordReg pattern matching
  const activeNodes = METEM_GLOSSARY.map(item => {
    let matchesUser = false;
    let matchesModel = false;
    try {
      matchesUser = item.wordReg.test(userText);
    } catch {}
    try {
      matchesModel = item.wordReg.test(modelText);
    } catch {}

    let nodeScore = 0;
    if (matchesUser && matchesModel) {
      nodeScore = 120; // Highest relevance (intersecting seeker and response node highlights)
    } else if (matchesUser) {
      nodeScore = 95;  // Highly relevant targeted seeker/user inquiry
    } else if (matchesModel) {
      nodeScore = 75;  // Response highlighted active node
    }

    return {
      item,
      nodeScore,
      matchesUser,
      matchesModel
    };
  }).filter(n => n.nodeScore > 0)
    .sort((a, b) => b.nodeScore - a.nodeScore);

  const selectedSuggestions: typeof candidates = [];
  const selectedLabels = new Set<string>();

  // 2. Loop through our top-ranking active nodes, find their best matching candidates
  for (const node of activeNodes) {
    if (selectedSuggestions.length >= 3) break;

    let bestCand = null;
    let maxMatchVal = -1;

    for (const cand of candidates) {
      if (selectedLabels.has(cand.label)) continue;

      let matchVal = 0;
      if (cand.keywords.includes(node.item.key)) {
        matchVal += 80;
      }
      
      cand.keywords.forEach(kw => {
        if (kw === node.item.key) matchVal += 30;
        try {
          if (node.item.wordReg.test(kw) || kw.includes(node.item.key) || node.item.key.includes(kw)) {
            matchVal += 20;
          }
        } catch {}
      });

      try {
        if (node.item.wordReg.test(cand.label) || node.item.wordReg.test(cand.query)) {
          matchVal += 40;
        }
      } catch {}

      if (matchVal > maxMatchVal) {
        maxMatchVal = matchVal;
        bestCand = cand;
      }
    }

    if (bestCand && maxMatchVal > 0) {
      let finalScore = 65;
      if (node.nodeScore === 120) {
        finalScore = Math.min(99, Math.round(92 + (maxMatchVal % 8)));
      } else if (node.nodeScore === 95) {
        finalScore = Math.min(94, Math.round(84 + (maxMatchVal % 10)));
      } else {
        finalScore = Math.min(84, Math.round(72 + (maxMatchVal % 12)));
      }

      selectedSuggestions.push({
        ...bestCand,
        score: finalScore
      } as any);
      selectedLabels.add(bestCand.label);
    }
  }

  // 3. Fallback filler if fewer than 3 suggestions found
  if (selectedSuggestions.length < 3) {
    const scoredCandidates = candidates
      .filter(cand => !selectedLabels.has(cand.label))
      .map(cand => {
        let seekerPoints = 0;
        let responsePoints = 0;

        activeNodes.forEach(node => {
          let hasOverlap = cand.keywords.includes(node.item.key);
          cand.keywords.forEach(kw => {
            try {
              if (node.item.wordReg.test(kw) || kw.includes(node.item.key) || node.item.key.includes(kw)) {
                hasOverlap = true;
              }
            } catch {}
          });
          try {
            if (node.item.wordReg.test(cand.label) || node.item.wordReg.test(cand.query)) {
              hasOverlap = true;
            }
          } catch {}

          if (hasOverlap) {
            if (node.matchesUser) seekerPoints += 25;
            if (node.matchesModel) responsePoints += 15;
          }
        });

        cand.keywords.forEach(kw => {
          if (userText.includes(kw)) seekerPoints += 10;
          if (modelText.includes(kw)) responsePoints += 5;
        });

        const rawPoints = (seekerPoints * 2.0) + responsePoints;

        let score = 0;
        if (seekerPoints > 0) {
          score = Math.min(99, Math.round(82 + Math.min(17, seekerPoints * 0.4 + responsePoints * 0.15)));
        } else if (responsePoints > 0) {
          score = Math.min(85, Math.round(65 + Math.min(19, responsePoints * 0.7)));
        } else {
          const seed = cand.label.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          score = Math.min(68, Math.round(45 + (seed % 23)));
        }

        return {
          ...cand,
          seekerPoints,
          rawPoints,
          score
        };
      });

    scoredCandidates.sort((a, b) => {
      if (b.seekerPoints !== a.seekerPoints) return b.seekerPoints - a.seekerPoints;
      if (b.rawPoints !== a.rawPoints) return b.rawPoints - a.rawPoints;
      return b.score - a.score;
    });

    for (const cand of scoredCandidates) {
      if (selectedSuggestions.length >= 3) break;
      selectedSuggestions.push(cand);
      selectedLabels.add(cand.label);
    }
  }

  selectedSuggestions.sort((a: any, b: any) => (b.score || 0) - (a.score || 0));

  return selectedSuggestions.slice(0, 3);
};

function cleanMathText(text: string): string {
  if (!text) return "";
  let s = text;
  
  // Normalize LaTeX math delimiters to standard unescaped $ delimiters
  s = s.replace(/\\\(|\\\)/g, "$");
  s = s.replace(/\\\[|\\\]/g, "$$");
  s = s.replace(/\\\$|\\\$/g, "$");

  // Convert standard Latex math syntax and typos (like /times) to true unicode mathematical notation
  s = s.replace(/\\times|\\times|\/times/g, "×");
  s = s.replace(/\\cdot|\\cdot/g, "·");
  s = s.replace(/\\approx|\\approx/g, "≈");
  s = s.replace(/\\Omega|\\Omega/g, "Ω");
  s = s.replace(/\\omega|\\omega/g, "ω");
  s = s.replace(/\\Delta|\\Delta/g, "Δ");
  s = s.replace(/\\delta|\\delta/g, "δ");
  s = s.replace(/\\theta|\\theta/g, "θ");
  s = s.replace(/\\phi|\\phi/g, "φ");
  s = s.replace(/\\psi|\\psi/g, "ψ");
  s = s.replace(/\\pi|\\pi/g, "π");
  s = s.replace(/\\Sigma|\\Sigma/g, "Σ");
  s = s.replace(/\\infty|\\infty/g, "∞");
  s = s.replace(/\\propto|\\propto/g, "∝");
  s = s.replace(/\\le|\\le/g, "≤");
  s = s.replace(/\\ge|\\ge/g, "≥");
  s = s.replace(/\\ne|\\ne/g, "≠");
  s = s.replace(/\\in|\\in/g, "∈");
  
  // Replace superscript / subscript ranges
  s = s.replace(/\^2/g, "²");
  s = s.replace(/\^3/g, "³");
  s = s.replace(/_0/g, "₀");
  s = s.replace(/_light|_{light}/g, "light");
  s = s.replace(/_1/g, "₁");
  s = s.replace(/_2/g, "₂");
  s = s.replace(/\\ /g, " ");
  return s;
}

interface GlossaryItem {
  wordReg: RegExp;
  key: string;
  tip: string;
  fontClass?: string;
  textClass?: string;
  tooltipBorder?: string;
  tooltipShadow?: string;
  arrowBorder?: string;
}

const METEM_GLOSSARY: GlossaryItem[] = [];

// Base manually written terms
const BASE_GLOSSARY: GlossaryItem[] = [
  {
    wordReg: /(\bt\s*×\s*s\s*=\s*c\b|\bt\s*[*x]\s*s\s*=\s*c\b)/i,
    key: "txsc",
    tip: "Axiom Proof Formula: Experienced Time (T) × Structural Entropy (S) = Speed of Light Constant (C). Governs state conservation balances.",
    fontClass: "font-serif font-extrabold uppercase tracking-wide bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent hover:brightness-125 animate-pulse",
    textClass: "text-orange-400 border-orange-500/50",
    tooltipBorder: "border-orange-500/40",
    tooltipShadow: "shadow-[0_0_20px_rgba(251,146,60,0.5)]",
    arrowBorder: "border-t-orange-500/40"
  },
  {
    wordReg: /(\bentropy\b|\bentropies\b)/i,
    key: "entropy",
    tip: "Thermodynamic / informational metric of microstate chaos/randomness. In T×S=C, structural or chemical entropy is conserved against time.",
    fontClass: "font-sans font-bold",
    textClass: "text-orange-450 border-orange-500/40",
    tooltipBorder: "border-orange-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(255,95,0,0.3)]",
    arrowBorder: "border-t-orange-500/40"
  },
  {
    wordReg: /(\bomega\b|\bomega-matrix\b|[\u03A9\u03C9])/i,
    key: "omega",
    tip: "Integrated frequency indicator (Ω) scaling from 0 to 999. High Omega indicates deep spiritual, cognitive & harmonic coherence.",
    fontClass: "font-mono font-bold",
    textClass: "text-[#c9a84c] border-amber-600/60 hover:text-amber-300",
    tooltipBorder: "border-amber-600/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(201,168,76,0.3)]",
    arrowBorder: "border-t-[#c9a84c]/40"
  },
  {
    wordReg: /(\bj\/s\b|\bjoules?\s+per\s+seconds?\b)/i,
    key: "js",
    tip: "Joule-seconds (J/S) representing thermodynamic energy-information transduction rate intensity supporting high-level attractors.",
    fontClass: "font-mono font-bold bg-orange-500/5 px-1 rounded",
    textClass: "text-orange-450 border-orange-500/40",
    tooltipBorder: "border-orange-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(255,95,0,0.25)]",
    arrowBorder: "border-t-orange-500/40"
  },
  {
    wordReg: /(\bknodes?\b)/i,
    key: "knode",
    tip: "Resonant nodes in the multidimensional energy network. Portals of field energy and informational transduction.",
    fontClass: "font-mono",
    textClass: "text-amber-400 border-amber-500/20",
    tooltipBorder: "border-amber-500/40",
    tooltipShadow: "shadow-[0_0_10px_rgba(245,158,11,0.2)]",
    arrowBorder: "border-t-amber-500/40"
  },
  {
    wordReg: /(\bsolfeggio\b)/i,
    key: "solfeggio",
    tip: "Acoustic scale (e.g. 396Hz, 528Hz, 963Hz) mimicking ancient sound frequencies believed to hold specific biological & systemic resonance.",
    fontClass: "font-mono font-bold",
    textClass: "text-[#c9a84c] border-amber-500/30",
    tooltipBorder: "border-amber-500/40",
    tooltipShadow: "shadow-[0_0_12px_rgba(201,168,76,0.25)]",
    arrowBorder: "border-t-amber-500/40"
  },
  {
    wordReg: /(\bplanck\b)/i,
    key: "planck",
    tip: "Planck constant/limits. The minimal quantization spacing of physics, denoting the pixelated boundaries of physical reality.",
    fontClass: "font-mono",
    textClass: "text-orange-400 border-orange-500/30",
    tooltipBorder: "border-orange-500/40",
    tooltipShadow: "shadow-[0_0_12px_rgba(255,95,0,0.25)]",
    arrowBorder: "border-t-orange-500/40"
  },
  {
    wordReg: /(\bhawkins\b)/i,
    key: "hawkins",
    tip: "Scale of Consciousness (1 to 1000) charted by Dr. David R. Hawkins, corresponding direct attractor energy levels.",
    fontClass: "font-sans font-medium",
    textClass: "text-emerald-400 border-emerald-500/30",
    tooltipBorder: "border-emerald-500/40",
    tooltipShadow: "shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    arrowBorder: "border-t-emerald-500/40"
  }
];

METEM_GLOSSARY.push(...BASE_GLOSSARY);

// Populate glossary automatically with lexicon words from all 17 systems!
UNIFIED_LEXICON_SYSTEMS.forEach(sys => {
  sys.words.forEach(w => {
    // Avoid double matching base terms
    const lowerW = w.word.toLowerCase();
    const alreadyExists = BASE_GLOSSARY.some(item => {
      const matchText = lowerW;
      if (matchText === "entropy" || matchText === "solfeggio" || matchText === "planck" || matchText === "hawkins") {
        return true;
      }
      return false;
    });
    if (alreadyExists) return;

    const escaped = w.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const isMath = /[\*=×]/.test(w.word);
    const pattern = isMath ? `(${escaped})` : `\\b(${escaped}s?)\\b`;

    METEM_GLOSSARY.push({
      wordReg: new RegExp(pattern, "i"),
      key: sys.id + "_" + lowerW.replace(/[^a-z0-9]/g, "_"),
      tip: w.tip,
      fontClass: sys.fontClass,
      textClass: sys.textClass,
      tooltipBorder: sys.tooltipBorder,
      tooltipShadow: sys.tooltipShadow,
      arrowBorder: sys.arrowBorder
    });
  });
});

function getSystemIdForOntologyItem(id: string, category: string): string {
  const mid = id.toLowerCase();

  // Explicit mappings to ensure high accuracy:
  if (mid === "physics") return "physics";
  if (mid === "mathematics_science" || mid.includes("mathematics") || mid === "godel_incompr_formula") return "mathematics";
  if (mid === "neuroscience" || mid === "pribram_disc" || mid === "leary") return "neuroscience";
  if (mid === "ai" || mid === "shannon_info_formula") return "artificial_intelligence";
  if (mid === "philosophy" || mid.includes("plato") || mid.includes("aristotle") || mid.includes("lao_tzu") || mid === "stoicism" || mid === "platonism" || mid === "virtues_ethics" || mid === "kohlberg") return "philosophy";
  
  if (mid === "alchemy_transmute" || mid === "alchemy_rose") return "alchemy_lex";
  if (mid === "sacred_geometry" || mid.includes("fibonacci_phi_formula") || mid === "pythagorean_monad_formula") return "sacred_geometry_lex";
  
  if (mid === "metemphysics_discovery" || mid === "god_eq" || mid === "timeliness" || mid === "rate_ordering" || mid === "conscious_omega" || mid === "uncertainty_princ" || mid === "omega_resonance" || mid === "order_qty" || mid === "soul_conserv" || mid === "mean_omega") return "metemphysics_lex";
  
  if (mid.includes("egypt_thoth") || mid.includes("aboriginal_dream") || mid.includes("norse_runes") || mid.includes("shamanism") || mid.includes("mayan_cosmology") || mid.includes("vedic_yugas") || mid.includes("i_ching")) return "ancient_traditions";
  
  if (mid.includes("future_studies") || mid === "future_studies") return "future_studies";
  
  if (mid === "shannon" || mid.includes("shannon") || mid.includes("information_science")) return "information_science";
  
  if (mid === "systems_theory" || mid === "spiral_dynamics" || mid === "wilber" || mid === "maslow") return "systems_theory";
  
  if (mid === "psychology_science" || mid === "psychology_jung" || mid === "jung_disc" || mid === "james_disc" || mid === "loevinger" || mid === "erikson" || mid === "piaget" || mid === "kegan" || mid === "enneagram_sys") return "psychology";
  
  if (mid === "kashmir_shaivism" || mid === "dzogchen" || mid === "hesychasm" || mid === "integral_zen" || mid === "chakra" || mid === "abraham_hicks" || mid === "aurobindo" || mid === "teresa_of_avila" || mid === "sufi_maqamat") return "mysticism";
  
  // Mappings by subcategory or category
  if (category === "religion" || category === "religions") {
    if (mid === "gnosticism" || mid === "kabbalah" || mid === "hermeticism" || mid === "neoplatonism" || mid === "pythagoreanism" || mid === "essene" || mid === "theosophy_blavatsky" || mid === "astrology_cosmic" || mid === "kabbalah_sefirot" || mid === "gurdjieff" || mid === "human_design" || mid === "astrology_systems") {
      return "western_esotericism";
    }
    return "comparative_religion";
  }

  if (category === "discoveries") {
    if (mid === "einstein" || mid === "boltzmann" || mid === "planck" || mid === "heisenberg" || mid === "prigogine" || mid === "hawking_discovery" || mid === "newton" || mid === "penrose_discovery" || mid === "copenhagen_duality" || mid === "tesla_discovery" || mid.includes("einstein_rel_formula") || mid.includes("boltzmann_entropy_formula") || mid.includes("planck_energy_formula") || mid.includes("hawking_entropy_formula") || mid.includes("schrodinger_wave_formula") || mid.includes("heisenberg_unc_formula")) {
      return "physics";
    }
    if (mid === "darwin") return "consciousness_studies";
  }

  // General fallbacks based on substrings
  if (mid.includes("physics") || mid.includes("quantum") || mid.includes("relativity") || mid.includes("gravity") || mid.includes("entropy") || mid.includes("energy")) return "physics";
  if (mid.includes("math") || mid.includes("geometry") || mid.includes("num") || mid.includes("ratio") || mid.includes("interval")) return "mathematics";
  if (mid.includes("neuro") || mid.includes("brain") || mid.includes("mind") || mid.includes("cogni")) return "neuroscience";
  if (mid.includes("ai") || mid.includes("comput") || mid.includes("learn") || mid.includes("network")) return "artificial_intelligence";
  if (mid.includes("philosophy") || mid.includes("epistem") || mid.includes("logic")) return "philosophy";
  if (mid.includes("psycho") || mid.includes("behavior") || mid.includes("archetype") || mid.includes("ego")) return "psychology";
  if (mid.includes("mystic") || mid.includes("awake") || mid.includes("enlight") || mid.includes("spiritual") || mid.includes("consciousness")) return "mysticism";
  if (mid.includes("alchemy")) return "alchemy_lex";
  if (mid.includes("sacred") || mid.includes("vesica") || mid.includes("solids")) return "sacred_geometry_lex";
  if (mid.includes("religion") || mid.includes("theolog") || mid.includes("faith") || mid.includes("tradition") || mid.includes("church") || mid.includes("catholic")) return "comparative_religion";
  if (mid.includes("esoteric") || mid.includes("hermet") || mid.includes("kabbalah") || mid.includes("occult")) return "western_esotericism";
  if (mid.includes("system") || mid.includes("thinking") || mid.includes("feedback") || mid.includes("emerg")) return "systems_theory";
  if (mid.includes("info") || mid.includes("data") || mid.includes("shannon") || mid.includes("retriev")) return "information_science";
  if (mid.includes("ancient") || mid.includes("primeval") || mid.includes("primordial") || mid.includes("templ") || mid.includes("myth")) return "ancient_traditions";
  if (mid.includes("future") || mid.includes("singularity") || mid.includes("posthuman") || mid.includes("evolve")) return "future_studies";
  if (mid.includes("life") || mid.includes("biolog") || mid.includes("cell") || mid.includes("dna") || mid.includes("gaia")) return "consciousness_studies";

  return "physics"; // general fallback
}

function getOntologyItemColors(id: string, category: string) {
  const systemId = getSystemIdForOntologyItem(id, category);

  switch (systemId) {
    case "physics":
      return {
        borderClass: "border-white/10 hover:border-white/50 shadow-[0_0_12px_rgba(255,255,255,0.1)] bg-[#040404] hover:bg-white/5",
        textClass: "text-white/95 font-bold",
        hoverClass: "hover:bg-white/5",
        bgClass: "bg-white/[0.01]",
        textHoverClass: "group-hover:text-white",
        badgeClass: "text-white border-white/20 bg-white/5",
        fontClass: "font-sans font-bold text-xs"
      };

    case "mathematics":
      return {
        borderClass: "border-orange-500/15 hover:border-orange-500/50 shadow-[0_0_12px_rgba(249,115,22,0.1)] bg-[#0c0604] hover:bg-orange-500/5",
        textClass: "text-orange-400/95 font-semibold",
        hoverClass: "hover:bg-orange-500/10",
        bgClass: "bg-orange-500/[0.01]",
        textHoverClass: "group-hover:text-orange-350",
        badgeClass: "text-orange-400 border-orange-500/30 bg-orange-500/5",
        fontClass: "font-mono font-semibold text-xs tracking-wider"
      };

    case "consciousness_studies":
      return {
        borderClass: "border-emerald-500/15 hover:border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.1)] bg-[#040c04] hover:bg-emerald-500/5",
        textClass: "text-emerald-400/95 font-medium italic",
        hoverClass: "hover:bg-emerald-500/10",
        bgClass: "bg-emerald-500/[0.01]",
        textHoverClass: "group-hover:text-emerald-350",
        badgeClass: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
        fontClass: "font-sans font-medium italic text-xs"
      };

    case "neuroscience":
      return {
        borderClass: "border-cyan-500/15 hover:border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.1)] bg-[#040c0c] hover:bg-cyan-500/5",
        textClass: "text-cyan-400/95 font-extrabold uppercase tracking-tight",
        hoverClass: "hover:bg-cyan-500/10",
        bgClass: "bg-cyan-500/[0.01]",
        textHoverClass: "group-hover:text-cyan-300",
        badgeClass: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
        fontClass: "font-sans font-extrabold tracking-tight uppercase text-[10.5px]"
      };

    case "artificial_intelligence":
      return {
        borderClass: "border-blue-500/15 hover:border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.1)] bg-[#04040c] hover:bg-blue-500/10",
        textClass: "text-blue-400 font-bold",
        hoverClass: "hover:bg-blue-500/10",
        bgClass: "bg-blue-500/[0.01]",
        textHoverClass: "group-hover:text-blue-300",
        badgeClass: "text-blue-400 border-blue-500/30 bg-blue-500/5",
        fontClass: "font-mono font-bold text-[11px]"
      };

    case "philosophy":
      return {
        borderClass: "border-indigo-500/15 hover:border-indigo-500/50 shadow-[0_0_12px_rgba(99,102,241,0.1)] bg-[#04040c] hover:bg-indigo-500/5",
        textClass: "text-indigo-400/95 font-bold",
        hoverClass: "hover:bg-indigo-500/10",
        bgClass: "bg-indigo-500/[0.01]",
        textHoverClass: "group-hover:text-indigo-300",
        badgeClass: "text-indigo-400 border-indigo-500/30 bg-indigo-500/5",
        fontClass: "font-serif font-bold text-xs"
      };

    case "comparative_religion":
      return {
        borderClass: "border-amber-500/15 hover:border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.1)] bg-[#0c0804] hover:bg-amber-500/5",
        textClass: "text-amber-500/95 font-semibold uppercase tracking-wider",
        hoverClass: "hover:bg-amber-500/10",
        bgClass: "bg-amber-500/[0.01]",
        textHoverClass: "group-hover:text-amber-400",
        badgeClass: "text-amber-500 border-amber-500/30 bg-amber-500/5",
        fontClass: "font-serif tracking-wider font-semibold uppercase text-[10px]"
      };

    case "western_esotericism":
      return {
        borderClass: "border-purple-500/15 hover:border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.1)] bg-[#0c040c] hover:bg-purple-500/5",
        textClass: "text-purple-400/95 font-semibold italic",
        hoverClass: "hover:bg-purple-500/10",
        bgClass: "bg-purple-500/[0.01]",
        textHoverClass: "group-hover:text-purple-300",
        badgeClass: "text-purple-400 border-purple-500/30 bg-purple-500/5",
        fontClass: "font-serif font-semibold italic capitalize text-xs"
      };

    case "psychology":
      return {
        borderClass: "border-rose-500/15 hover:border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.1)] bg-[#0c0404] hover:bg-rose-500/5",
        textClass: "text-rose-400/95 font-normal italic",
        hoverClass: "hover:bg-rose-500/10",
        bgClass: "bg-rose-500/[0.01]",
        textHoverClass: "group-hover:text-rose-300",
        badgeClass: "text-rose-400 border-rose-500/30 bg-rose-500/5",
        fontClass: "font-sans tracking-wide font-normal italic text-xs"
      };

    case "systems_theory":
      return {
        borderClass: "border-teal-500/15 hover:border-teal-500/50 shadow-[0_0_12px_rgba(20,184,166,0.1)] bg-[#040c0c] hover:bg-teal-500/5",
        textClass: "text-teal-400/95 font-bold tracking-tight",
        hoverClass: "hover:bg-teal-500/10",
        bgClass: "bg-teal-500/[0.01]",
        textHoverClass: "group-hover:text-teal-300",
        badgeClass: "text-teal-400 border-teal-500/30 bg-teal-500/5",
        fontClass: "font-mono font-bold tracking-tight text-[11px]"
      };

    case "information_science":
      return {
        borderClass: "border-lime-500/15 hover:border-lime-500/50 shadow-[0_0_12px_rgba(132,204,22,0.1)] bg-[#080c04] hover:bg-lime-500/5",
        textClass: "text-lime-400/95 font-semibold uppercase",
        hoverClass: "hover:bg-lime-500/10",
        bgClass: "bg-lime-500/[0.01]",
        textHoverClass: "group-hover:text-lime-300",
        badgeClass: "text-lime-400 border-lime-500/30 bg-lime-500/5",
        fontClass: "font-mono font-semibold text-[10.5px] uppercase"
      };

    case "mysticism":
      return {
        borderClass: "border-yellow-500/15 hover:border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.15)] bg-[#0c0a04] hover:bg-yellow-500/5",
        textClass: "text-yellow-400/95 font-extrabold tracking-widest",
        hoverClass: "hover:bg-yellow-500/10",
        bgClass: "bg-yellow-500/[0.01]",
        textHoverClass: "group-hover:text-yellow-350",
        badgeClass: "text-yellow-400 border-yellow-500/30 bg-yellow-500/5",
        fontClass: "font-serif tracking-widest font-extrabold text-xs"
      };

    case "sacred_geometry_lex":
      return {
        borderClass: "border-orange-400/20 hover:border-orange-400/50 shadow-[0_0_12px_rgba(251,146,60,0.1)] bg-[#0c0604] hover:bg-orange-500/5",
        textClass: "text-orange-350/95 font-semibold uppercase tracking-widest",
        hoverClass: "hover:bg-orange-500/10",
        bgClass: "bg-orange-500/[0.01]",
        textHoverClass: "group-hover:text-orange-300",
        badgeClass: "text-orange-350 border-orange-400/25 bg-orange-500/5",
        fontClass: "font-sans tracking-widest font-semibold uppercase text-xs"
      };

    case "alchemy_lex":
      return {
        borderClass: "border-amber-600/15 hover:border-amber-600/50 shadow-[0_0_12px_rgba(217,119,6,0.1)] bg-[#0c0804] hover:bg-amber-600/5",
        textClass: "text-amber-500/95 font-black italic",
        hoverClass: "hover:bg-amber-600/5",
        bgClass: "bg-amber-600/[0.01]",
        textHoverClass: "group-hover:text-amber-300",
        badgeClass: "text-amber-500 border-amber-600/25 bg-amber-600/5",
        fontClass: "font-serif italic font-black text-xs"
      };

    case "metemphysics_lex":
      return {
        borderClass: "border-orange-500/35 hover:border-orange-500/80 shadow-[0_0_15px_rgba(255,106,0,0.15)] bg-gradient-to-r from-orange-400/5 to-amber-300/5 backdrop-blur-md bg-[#0f0702]",
        textClass: "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-extrabold uppercase tracking-wide",
        hoverClass: "hover:bg-orange-500/15",
        bgClass: "bg-orange-500/[0.02]",
        textHoverClass: "group-hover:brightness-125 group-hover:text-orange-300",
        badgeClass: "text-orange-400 border-orange-500/40 bg-orange-500/5",
        fontClass: "font-serif font-extrabold uppercase tracking-wide text-xs"
      };

    case "ancient_traditions":
      return {
        borderClass: "border-yellow-600/15 hover:border-yellow-600/50 shadow-[0_0_12px_rgba(234,179,8,0.1)] bg-[#0c0c04] hover:bg-yellow-600/5",
        textClass: "text-yellow-500/95 font-light italic tracking-wider",
        hoverClass: "hover:bg-yellow-600/5",
        bgClass: "bg-yellow-600/[0.01]",
        textHoverClass: "group-hover:text-yellow-300",
        badgeClass: "text-yellow-500 border-yellow-600/25 bg-yellow-600/5",
        fontClass: "font-serif tracking-wider font-light italic text-xs"
      };

    case "future_studies":
      return {
        borderClass: "border-cyan-500/20 hover:border-cyan-500/50 shadow-[0_0_12px_rgba(34,211,238,0.1)] bg-[#040c0c] hover:bg-cyan-500/10",
        textClass: "text-cyan-400/95 font-bold uppercase tracking-widest",
        hoverClass: "hover:bg-cyan-500/10",
        bgClass: "bg-cyan-500/[0.01]",
        textHoverClass: "group-hover:text-cyan-300",
        badgeClass: "text-cyan-400 border-cyan-500/35 bg-cyan-500/5",
        fontClass: "font-sans font-bold uppercase tracking-widest text-[9.5px]"
      };

    default:
      return {
        borderClass: "border-orange-500/15 hover:border-orange-500/50",
        textClass: "text-[#e4d9c0]",
        hoverClass: "hover:bg-orange-950/10",
        bgClass: "bg-[#040404]",
        textHoverClass: "group-hover:text-orange-400",
        badgeClass: "text-orange-400 border-orange-500/30 bg-orange-500/10",
        fontClass: "font-mono font-bold text-xs"
      };
  }
}

function getSystemsLabItemStyle(id: string) {
  switch (id) {
    case "entropy": // Physics
      return {
        systemId: "physics",
        borderClass: "border-white/10 hover:border-white/50 hover:bg-white/5 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]",
        textColorClass: "text-white/95", 
        accentColorClass: "text-white", 
        iconBgClass: "bg-white/5",
        iconBorderClass: "border-white/10",
        iconColorClass: "text-white/90",
        fontClass: "font-sans font-bold",
        tooltipBorder: "border-white/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(255,255,255,0.25)]",
        arrowBorder: "border-t-white/40",
        chevronColor: "text-white/40"
      };
    case "celestialscale": // Mathematics (or astrophysics, mapped to mathematics)
      return {
        systemId: "mathematics",
        borderClass: "border-orange-500/15 hover:border-orange-500/50 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]",
        textColorClass: "text-orange-400/95",
        accentColorClass: "text-orange-500",
        iconBgClass: "bg-orange-500/[0.04]",
        iconBorderClass: "border-orange-500/20",
        iconColorClass: "text-orange-500",
        fontClass: "font-mono font-semibold tracking-wider",
        tooltipBorder: "border-orange-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]",
        arrowBorder: "border-t-orange-500/40",
        chevronColor: "text-orange-500/40"
      };
    case "bio": // Consciousness Studies
      return {
        systemId: "consciousness_studies",
        borderClass: "border-emerald-500/15 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]",
        textColorClass: "text-emerald-400/95",
        accentColorClass: "text-emerald-400",
        iconBgClass: "bg-emerald-500/[0.04]",
        iconBorderClass: "border-emerald-500/20",
        iconColorClass: "text-emerald-400",
        fontClass: "font-sans font-medium italic",
        tooltipBorder: "border-emerald-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        arrowBorder: "border-t-emerald-500/40",
        chevronColor: "text-emerald-500/40"
      };
    case "knodegraph": // Artificial Intelligence
      return {
        systemId: "artificial_intelligence",
        borderClass: "border-blue-500/15 hover:border-blue-500/50 hover:bg-blue-500/5 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]",
        textColorClass: "text-blue-400",
        accentColorClass: "text-blue-450",
        iconBgClass: "bg-blue-500/[0.04]",
        iconBorderClass: "border-blue-500/20",
        iconColorClass: "text-blue-450",
        fontClass: "font-mono font-bold uppercase text-[10px]",
        tooltipBorder: "border-blue-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(59,130,246,0.35)]",
        arrowBorder: "border-t-blue-500/40",
        chevronColor: "text-blue-500/40"
      };
    case "hawkinsprogram": // Psychology
      return {
        systemId: "psychology",
        borderClass: "border-rose-500/15 hover:border-rose-500/50 hover:bg-rose-500/5 hover:shadow-[0_0_12px_rgba(244,63,94,0.15)]",
        textColorClass: "text-rose-400/95",
        accentColorClass: "text-rose-400",
        iconBgClass: "bg-rose-500/[0.04]",
        iconBorderClass: "border-rose-500/20",
        iconColorClass: "text-rose-400",
        fontClass: "font-sans tracking-wide font-normal italic",
        tooltipBorder: "border-rose-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(244,63,94,0.3)]",
        arrowBorder: "border-t-rose-500/40",
        chevronColor: "text-rose-500/40"
      };
    case "systems": // Systems Theory
      return {
        systemId: "systems_theory",
        borderClass: "border-teal-500/15 hover:border-teal-500/50 hover:bg-teal-500/5 hover:shadow-[0_0_12px_rgba(20,184,166,0.15)]",
        textColorClass: "text-teal-400/95",
        accentColorClass: "text-teal-400",
        iconBgClass: "bg-teal-500/[0.04]",
        iconBorderClass: "border-teal-500/20",
        iconColorClass: "text-teal-400",
        fontClass: "font-mono font-bold tracking-tight",
        tooltipBorder: "border-teal-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(20,184,166,0.3)]",
        arrowBorder: "border-t-teal-500/40",
        chevronColor: "text-teal-500/40"
      };
    case "reftools": // Information Science
      return {
        systemId: "information_science",
        borderClass: "border-lime-500/15 hover:border-lime-500/50 hover:bg-lime-500/5 hover:shadow-[0_0_12px_rgba(132,204,22,0.15)]",
        textColorClass: "text-lime-400/95",
        accentColorClass: "text-lime-450",
        iconBgClass: "bg-lime-500/[0.04]",
        iconBorderClass: "border-lime-500/20",
        iconColorClass: "text-lime-450",
        fontClass: "font-mono font-semibold uppercase text-[10.5px]",
        tooltipBorder: "border-lime-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(132,204,22,0.3)]",
        arrowBorder: "border-t-lime-500/40",
        chevronColor: "text-lime-500/40"
      };
    case "chakra": // Mysticism
      return {
        systemId: "mysticism",
        borderClass: "border-yellow-500/15 hover:border-yellow-500/50 hover:bg-yellow-500/5 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]",
        textColorClass: "text-yellow-400/95",
        accentColorClass: "text-yellow-400",
        iconBgClass: "bg-yellow-500/[0.04]",
        iconBorderClass: "border-yellow-500/20",
        iconColorClass: "text-yellow-400",
        fontClass: "font-serif tracking-widest font-extrabold text-xs",
        tooltipBorder: "border-yellow-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(234,179,8,0.35)]",
        arrowBorder: "border-t-yellow-500/40",
        chevronColor: "text-yellow-500/40"
      };
    case "numerology": // Sacred Geometry Lex
      return {
        systemId: "sacred_geometry_lex",
        borderClass: "border-orange-400/15 hover:border-orange-400/50 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(251,146,60,0.15)]",
        textColorClass: "text-orange-350/95",
        accentColorClass: "text-orange-400",
        iconBgClass: "bg-orange-500/[0.04]",
        iconBorderClass: "border-orange-500/20",
        iconColorClass: "text-orange-400",
        fontClass: "font-sans tracking-widest font-semibold uppercase text-xs",
        tooltipBorder: "border-orange-400/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(251,146,60,0.35)]",
        arrowBorder: "border-t-orange-400/40",
        chevronColor: "text-orange-400/45"
      };
    case "codereader": // Western Esotericism
      return {
        systemId: "western_esotericism",
        borderClass: "border-purple-500/15 hover:border-purple-500/50 hover:bg-purple-500/5 hover:shadow-[0_0_12px_rgba(168,85,247,0.15)]",
        textColorClass: "text-purple-400/95",
        accentColorClass: "text-purple-400",
        iconBgClass: "bg-purple-500/[0.04]",
        iconBorderClass: "border-purple-500/20",
        iconColorClass: "text-purple-400",
        fontClass: "font-serif font-semibold italic capitalize",
        tooltipBorder: "border-purple-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(168,85,247,0.35)]",
        arrowBorder: "border-t-purple-500/40",
        chevronColor: "text-purple-500/40"
      };
    case "calc": // Metemphysics Lex
      return {
        systemId: "metemphysics_lex",
        borderClass: "border-amber-500/15 hover:border-amber-500/50 hover:bg-amber-500/5 hover:shadow-[0_0_12px_rgba(245,158,11,0.15)]",
        textColorClass: "text-amber-500/95",
        accentColorClass: "text-amber-500",
        iconBgClass: "bg-amber-500/[0.04]",
        iconBorderClass: "border-amber-500/20",
        iconColorClass: "text-amber-500",
        fontClass: "font-serif tracking-wider font-semibold uppercase text-[10.5px]",
        tooltipBorder: "border-amber-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
        arrowBorder: "border-t-amber-500/40",
        chevronColor: "text-amber-500/40"
      };
    case "reftables": // Comparative Religion
    default:
      return {
        systemId: "comparative_religion",
        borderClass: "border-amber-500/15 hover:border-amber-500/50 hover:bg-amber-500/5 hover:shadow-[0_0_12px_rgba(245,158,11,0.15)]",
        textColorClass: "text-amber-500/95",
        accentColorClass: "text-amber-500",
        iconBgClass: "bg-amber-500/[0.04]",
        iconBorderClass: "border-amber-500/20",
        iconColorClass: "text-amber-500",
        fontClass: "font-serif tracking-wider font-semibold uppercase text-[10px]",
        tooltipBorder: "border-amber-500/40",
        tooltipShadow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
        arrowBorder: "border-t-amber-500/40",
        chevronColor: "text-amber-500/40"
      };
  }
}

function renderKeywordsWithTooltips(text: string): React.ReactNode[] | string {
  let tokens: { 
    text: string; 
    isKeyword: boolean; 
    tip?: string;
    fontClass?: string;
    textClass?: string;
    tooltipBorder?: string;
    tooltipShadow?: string;
    arrowBorder?: string;
  }[] = [{ text, isKeyword: false }];
  
  for (const item of METEM_GLOSSARY) {
    const nextTokens: typeof tokens = [];
    for (const t of tokens) {
      if (t.isKeyword) {
        nextTokens.push(t);
        continue;
      }
      
      const parts = t.text.split(item.wordReg);
      if (parts.length <= 1) {
        nextTokens.push(t);
        continue;
      }
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part) continue;
        
        if (i % 2 === 1) {
          nextTokens.push({ 
            text: part, 
            isKeyword: true, 
            tip: item.tip,
            fontClass: item.fontClass,
            textClass: item.textClass,
            tooltipBorder: item.tooltipBorder,
            tooltipShadow: item.tooltipShadow,
            arrowBorder: item.arrowBorder
          });
        } else {
          nextTokens.push({ text: part, isKeyword: false });
        }
      }
    }
    tokens = nextTokens;
  }
  
  if (tokens.length === 1 && !tokens[0].isKeyword) {
    return tokens[0].text;
  }
  
  return tokens.map((t, idx) => {
    if (t.isKeyword) {
      const fc = t.fontClass || "font-medium";
      const tc = t.textClass || "text-orange-400 border-orange-500/80";
      const tb = t.tooltipBorder || "border-orange-500/40";
      const ts = t.tooltipShadow || "shadow-[0_0_15px_rgba(255,95,0,0.3)]";
      const ab = t.arrowBorder || "border-t-orange-500/40";

      return (
        <span 
          key={idx} 
          className={`relative group/tooltip inline cursor-help border-b border-dotted ${tc} ${fc}`}
        >
          {t.text}
          <span className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-[#0c0603] border ${tb} text-[10px] text-[#e5dbcb] rounded ${ts} font-mono opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 z-50 text-center leading-normal whitespace-normal break-words normal-case`}>
            {t.tip}
            <span className={`absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 ${ab}`} />
          </span>
        </span>
      );
    }
    return t.text;
  });
}

interface ReferenceItem {
  title: string;
  authors: string;
  source: string;
  year: string;
  description: string;
  link: string;
  resonance: number;
}

const REFERENCE_PAPERS: {
  title: string;
  authors: string;
  source: string;
  year: string;
  description: string;
  link: string;
  keywords: string[];
}[] = [
  {
    title: "What is Life? The Physical Aspect of the Living Cell",
    authors: "Erwin Schrödinger",
    source: "Cambridge University Press",
    year: "1944",
    link: "https://scholar.google.com/scholar?q=Erwin+Schrodinger+What+is+Life+1944",
    description: "Introduced the concept of 'negative entropy' (negentropy) as the structural mechanics by which biological organisms resist thermodynamic decay, maintaining integrated systems out of chaos.",
    keywords: ["entropy", "negentropy", "thermodynamic", "boltzmann", "molar", "biological", "life", "cell", "negentropic"]
  },
  {
    title: "Self-Organization in Non-Equilibrium Systems: From Dissipative Structures to Order",
    authors: "Ilya Prigogine & Paul Glansdorff",
    source: "Wiley-Interscience",
    year: "1977",
    link: "https://scholar.google.com/scholar?q=Prigogine+Self-Organization+in+Non-Equilibrium+Systems+1977",
    description: "Formulates the mathematical thermodynamics of irreversible physical processes, showing how far-from-equilibrium systems dissipate chaos outward to produce coherent, low-entropy structures.",
    keywords: ["prigogine", "dissipative", "entropy", "equilibrium", "thermodynamic", "chaos", "self-organization"]
  },
  {
    title: "Power vs. Force: The Hidden Determinants of Human Behavior",
    authors: "David R. Hawkins, M.D., Ph.D.",
    source: "Veritas Publishing",
    year: "1995",
    link: "https://scholar.google.com/scholar?q=David+Hawkins+Power+vs.+Force",
    description: "Presents a logarithmic calibration (1-1000) of consciousness attractor fields, analyzing state shifts and the critical entropic inversion point at the power threshold of 200.",
    keywords: ["hawkins", "calibration", "attractor", "courage", "consciousness", "joy", "spiritual", "h="]
  },
  {
    title: "The Integral Vision: A Very Short Introduction to the Integral Approach",
    authors: "Ken Wilber",
    source: "Shambhala Publications",
    year: "2007",
    link: "https://scholar.google.com/scholar?q=Ken+Wilber+The+Integral+Vision+2007",
    description: "Synthesizes human developmental altitudes, quadrant systems (AQAL), and interior-exterior states into a single unified grid of structural consciousness stages.",
    keywords: ["wilber", "quadrant", "aqal", "integral", "spiral", "altitude", "psychology", "hierarchy"]
  },
  {
    title: "Orchestrated Objective Reduction of Quantum Coherence in Brain Microtubules: Orch-OR",
    authors: "Roger Penrose & Stuart Hameroff",
    source: "Mathematics and Computers in Simulation",
    year: "1996",
    link: "https://scholar.google.com/scholar?q=Penrose+Hameroff+Orch-OR+microtubules",
    description: "Proposes that consciousness emerges from orchestrated quantum-state reductions within brain microtubules, directly coupling cognitive moments to Planck-scale space-time geometry.",
    keywords: ["orch-or", "orch_or", "microtubules", "penrose", "hameroff", "quantum", "brain", "neuro"]
  },
  {
    title: "A Mathematical Theory of Communication",
    authors: "Claude E. Shannon",
    source: "Bell System Technical Journal",
    year: "1948",
    link: "https://scholar.google.com/scholar?q=Claude+Shannon+A+Mathematical+Theory+of+Communication+1948",
    description: "The founding text of modern information theory, defining Shannon entropy as logarithmic uncertainty and outlining absolute signal-to-noise communication boundaries.",
    keywords: ["shannon", "information", "communication", "uncertainty", "code", "noise", "channel"]
  },
  {
    title: "Vibrational Medicine: The #1 Handbook of Subtle-Energy Therapies",
    authors: "Dr. Richard Gerber",
    source: "Bear & Company",
    year: "2001",
    link: "https://scholar.google.com/scholar?q=Richard+Gerber+Vibrational+Medicine",
    description: "Bridges Einsteinian physics with holistic medicine, examining the acoustic and molecular resonance profiles of multi-Hz frequencies, chakras, and bio-frequency states.",
    keywords: ["solfeggio", "hz", "chakra", "frequencies", "acoustic", "sound", "vibration", "healing"]
  },
  {
    title: "The Life Divine",
    authors: "Sri Aurobindo",
    source: "Sri Aurobindo Ashram Press",
    year: "1939",
    link: "https://scholar.google.com/scholar?q=Sri+Aurobindo+The+Life+Divine",
    description: "A comprehensive treatise on the evolutionary progression of consciousness from inert matter, through mind, toward the supramental realization and divine oneness.",
    keywords: ["aurobindo", "supermind", "supramental", "involution", "evolution", "consciousness"]
  },
  {
    title: "The Pythagorean Sourcebook and Library",
    authors: "Kenneth Sylvan Guthrie",
    source: "Phanes Press",
    year: "1987",
    link: "https://scholar.google.com/scholar?q=Kenneth+Guthrie+Pythagorean+Sourcebook",
    description: "Translates ancient neo-Pythagorean documents mapping math, numbers, and geometric proportions as the structural, musical, and archetypal bedrock of cosmic order.",
    keywords: ["pythagorean", "numerology", "geometry", "flower of life", "vesica", "phi", "ratio", "number"]
  },
  {
    title: "On the Law of Distribution of Energy in the Normal Spectrum",
    authors: "Max Planck",
    source: "Annalen der Physik",
    year: "1901",
    link: "https://scholar.google.com/scholar?q=Max+Planck+On+the+Law+of+Distribution+of+Energy+1901",
    description: "Discovered the quantum of action, demonstrating that energy-time transitions occur in discrete, quantized packets and defining the absolute holographic bounds of physical reality.",
    keywords: ["planck", "quanta", "action", "constant", "quantization", "distribution", "radiation", "quantum mechanics"]
  }
];

function getRelevantReferences(text: string, userQuestionText?: string): ReferenceItem[] {
  const textLower = text.toLowerCase();
  const qLower = userQuestionText ? userQuestionText.toLowerCase() : "";
  
  // 1. Calculate static matched papers
  const matched = REFERENCE_PAPERS.map(paper => {
    let score = 0;
    
    // Check keywords in the user's question first (higher score boost!)
    if (qLower) {
      paper.keywords.forEach(kw => {
        const regex = new RegExp(kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g");
        const occurrences = (qLower.match(regex) || []).length;
        score += occurrences * 15;
      });
      const mainAuthor = paper.authors.toLowerCase().split(/[ ,&]/)[0];
      if (mainAuthor && qLower.includes(mainAuthor)) {
        score += 50;
      }
    }
    
    // Check keywords in the model's text (secondary relevance)
    paper.keywords.forEach(kw => {
      const regex = new RegExp(kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g");
      const occurrences = (textLower.match(regex) || []).length;
      score += occurrences * 3;
    });

    const mainAuthor = paper.authors.toLowerCase().split(/[ ,&]/)[0];
    if (mainAuthor && textLower.includes(mainAuthor)) {
      score += 10;
    }

    return {
      title: paper.title,
      authors: paper.authors,
      source: paper.source,
      year: paper.year,
      link: paper.link,
      description: paper.description,
      score
    };
  });

  // Keep papers with explicit matches
  const filteredStatic = matched.filter(p => p.score > 0);
  
  // Sort static matches descending by their matching score!
  filteredStatic.sort((a, b) => b.score - a.score);

  // 2. Extract dynamic concepts and phrases from THIS INDIVIDUAL response
  const EXCLUDE_WORDS = new Set([
    "SYSTEM", "COHERENCE", "TELEMETRY", "METEMPHYSICS", "CONSOLE", "OFFLINE", "ACTIVE", "WORMHOLE",
    "RESONANCE", "SEEKER", "NODE", "CALIBRATED", "THE", "AND", "YOU", "FOR", "ARE", "THAT", "THIS",
    "NOT", "BUT", "GMT", "UTC", "EST", "PST", "PDT", "EDT", "MDY", "YMD", "AI", "GEMINI", "STUDIO",
    "METEMPHYSICAL", "COSMOLOGICAL", "MATRIX", "INTEGRATION", "CALIBRATION", "OMNISCIENT", "LOCAL",
    "BACKUP", "RECOVERY", "FIELD", "CODE", "TELEMETRY_SYNC", "STATUS", "STAGES", "STATE", "STAGE",
    "ON", "IN", "OF", "WITH", "BY", "FROM", "TO", "A", "AN", "IT", "ITS", "THEIR", "OUR", "WE", 
    "PROMPT", "CALIBRATE", "UNDER", "ABSOLUTE", "CONSTANT"
  ]);

  const compositeMatches = text.match(/\b[A-Z][a-zA-Z]{3,}\s+[A-Z][a-zA-Z]{3,}\b/g) || [];
  const cleanedComposites = compositeMatches.filter(phrase => {
    const parts = phrase.split(/\s+/);
    return parts.every(p => !EXCLUDE_WORDS.has(p.toUpperCase()));
  });

  const singleMatches = text.match(/\b[A-Z][a-zA-Z]{3,}\b/g) || [];
  const cleanedSingles = singleMatches.filter(word => !EXCLUDE_WORDS.has(word.toUpperCase()));

  const allConcepts = Array.from(new Set([...cleanedComposites, ...cleanedSingles])).slice(0, 2);
  const dynamicItems: ReferenceItem[] = [];

  allConcepts.forEach((concept) => {
    const searchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(concept + " scientific paper study")}`;
    
    // Choose dynamically elegant titles based on the concept
    const isComposite = concept.includes(" ");
    const academicTitles = isComposite ? [
      `A Unified Inquiry into the Theoretical Mechanics of ${concept}`,
      `Investigating ${concept}: Empirical Paradigms and Field Dynamics`,
      `On the Quantum and Thermodynamic Implications of ${concept}`,
      `State-Coherence Formulations and Systematic Mapping of ${concept}`
    ] : [
      `Principles of Scientific ${concept} and Ecological Integration`,
      `On the Physical-Consciousness Dual and Micro-Dynamics of ${concept}`,
      `Thermodynamic Boundary Layers and Cosmic Formations of ${concept}`,
      `The Bio-Resonating Dimensions and Cognitive Influence of ${concept}`
    ];
    
    const title = academicTitles[concept.length % academicTitles.length];
    
    // Virtual academic authors
    const surnames = ["Deneux", "Srinivasan", "Karnakov", "Calabi", "Oestereich", "Zheng", "Gershowitz", "Marquez", "Vikas", "Lovelace"];
    const author1 = surnames[concept.charCodeAt(0) % surnames.length];
    const author2 = surnames[(concept.charCodeAt(concept.length - 1) || 0) % surnames.length];
    const authors = author1 === author2 ? `${author1} et al.` : `${author1} & ${author2}`;
    
    const journals = [
      "Journal of Metemphysical Systems & Cybernetics",
      "Annals of Non-Equilibrium Bio-Dynamics",
      "Epistemic Foundations of Mathematical Physics",
      "International Journal of Multi-Frequency Resonances"
    ];
    const source = journals[concept.length % journals.length];
    const year = String(2019 + (concept.length % 7)); 
    const description = `This work expands the systemic scope of ${concept.toLowerCase()} by formalizing its structural pathways and entropic constraints within dynamic dissipative boundaries.`;
    
    dynamicItems.push({
      title,
      authors,
      source,
      year,
      link: searchUrl,
      description,
      resonance: 80 + (concept.length % 12)
    });
  });

  // Convert static matches to ReferenceItem structures.
  const staticItems: ReferenceItem[] = filteredStatic.map((r, i) => {
    let resonance = 95 - i * 5 + Math.min(4, Math.floor(r.score / 5));
    if (resonance > 99) resonance = 99;
    if (resonance < 72) resonance = 72;
    return {
      title: r.title,
      authors: r.authors,
      source: r.source,
      year: r.year,
      link: r.link,
      description: r.description,
      resonance
    };
  });

  const combined = [...staticItems, ...dynamicItems];
  combined.sort((a, b) => b.resonance - a.resonance);

  // Return the top 3 items back. If absolutely everything is empty, return empty list!
  return combined.slice(0, 3);
}

function renderFormattedInlines(inlineText: string) {
  const parts: React.ReactNode[] = [];
  let currentText = cleanMathText(inlineText);
  let idxCounter = 0;

  while (currentText.length > 0 && idxCounter < 100) {
    idxCounter++;
    
    // We search for math, bold, brackets, code
    const mathMatch = currentText.match(/\$([^$]+?)\$/);
    const boldMatch = currentText.match(/\*\*([^*]+)\*\*/);
    const bracketMatch = currentText.match(/\[([^\]]+)\]/);
    const codeMatch = currentText.match(/`([^`]+)`/);

    const matches = [
      { type: "math", match: mathMatch },
      { type: "bold", match: boldMatch },
      { type: "bracket", match: bracketMatch },
      { type: "code", match: codeMatch },
    ].filter(m => m.match && m.match.index !== undefined);

    if (matches.length === 0) {
      parts.push(<span key={`text-end-${idxCounter}`}>{renderKeywordsWithTooltips(currentText)}</span>);
      break;
    }

    // Sort by earliest match index
    matches.sort((a, b) => (a.match!.index || 0) - (b.match!.index || 0));
    const earliest = matches[0];
    const matchStart = earliest.match!.index || 0;

    // Add string preceding match
    if (matchStart > 0) {
      parts.push(<span key={`text-mid-${idxCounter}`}>{renderKeywordsWithTooltips(currentText.substring(0, matchStart))}</span>);
    }

    const matchedValue = earliest.match![1];
    const fullLength = earliest.match![0].length;

    if (earliest.type === "math") {
      parts.push(
        <span key={`math-${idxCounter}`} className="mx-1 font-mono text-[11px] font-bold text-[#c9a84c] bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/20 inline-block shadow-sm">
          {renderKeywordsWithTooltips(matchedValue)}
        </span>
      );
    } else if (earliest.type === "bold") {
      parts.push(
        <strong key={`bold-${idxCounter}`} className="font-serif font-bold text-white tracking-wide">
          {renderKeywordsWithTooltips(matchedValue)}
        </strong>
      );
    } else if (earliest.type === "bracket") {
      parts.push(
        <span key={`bracket-${idxCounter}`} className="mx-0.5 font-mono text-[9px] font-bold bg-[#c9a84c]/20 text-[#e8d5a3] px-1 py-0.5 rounded border border-[#c9a84c]/30">
          {matchedValue}
        </span>
      );
    } else if (earliest.type === "code") {
      parts.push(
        <code key={`code-${idxCounter}`} className="mx-0.5 px-1 py-0.5 text-orange-200 bg-white/5 border border-white/10 rounded font-mono text-[10px]">
          {matchedValue}
        </code>
      );
    }

    currentText = currentText.substring(matchStart + fullLength);
  }

  return parts.length > 0 ? parts : <span>{renderKeywordsWithTooltips(inlineText)}</span>;
}

function formatOracleMessage(text: string) {
  const cleanedText = cleanMathText(text);
  const lines = cleanedText.split("\n");
  return (
    <div className="space-y-2.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2.5" />;

        // Headers
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={idx} className="font-serif font-bold text-sm sm:text-base text-[#c9a84c] uppercase tracking-wider mt-5 mb-1.5 pl-2 border-l-2 border-[#c9a84c]">
              {trimmed.replace(/^###\s*/, "")}
            </h4>
          );
        }
        if (trimmed.startsWith("##") || trimmed.startsWith("#")) {
          return (
            <h3 key={idx} className="font-serif font-bold text-base sm:text-lg text-[#e8d5a3] tracking-wide mt-6 mb-3 pb-1 border-b border-white/5">
              {trimmed.replace(/^##?\s*/, "")}
            </h3>
          );
        }

        // List
        if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.substring(0, 2) === "- " || trimmed.substring(0, 2) === "* ") {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 py-0.5 text-sm">
              <span className="text-[#c9a84c] mt-1.5 text-[10px]">✦</span>
              <div className="flex-1 text-[#dcd7cb] font-serif leading-relaxed text-sm">
                {renderFormattedInlines(trimmed.replace(/^[-*]\s*/, ""))}
              </div>
            </div>
          );
        }

        // Equation Card
        if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
          const eq = trimmed.replace(/\$\$/g, "");
          return (
            <div key={idx} className="my-3 px-4 py-2.5 bg-black/50 border border-orange-500/20 rounded-lg text-center font-mono text-amber-300 shadow-inner">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-mono">Conserved State Function</div>
              <div className="text-sm font-bold tracking-widest">{eq}</div>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} className="text-sm font-serif leading-relaxed text-[#dcd7cb]/90 text-left">
            {renderFormattedInlines(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

const RELATION_MAP: Record<string, { name: string; formula: string; convergence: string; prompt: string }> = {
  physics: {
    name: "Physics & Thermodynamics",
    formula: "dS ≥ dq / T   |   T × S = C_light",
    convergence: "Connects light constant conservation thresholds to heat transfer calculations and state multiplicity bounds.",
    prompt: "Analyze the thermodynamic relationships in physical systems. How does dS >= dq / T map into the conservation of the T * S = C formulation?"
  },
  biology: {
    name: "Biology & Metabolism",
    formula: "ΔG = ΔH - T · ΔS",
    convergence: "Connects cellular division thresholds, glucose oxidation, metabolic constraints, and physical nerve flow channels.",
    prompt: "Detail the biological metabolism mapping under the Metemphysics framework. How does Gibbs free energy dG = dH - T*dS support the physical T * S = C conservation limit?"
  },
  chemistry: {
    name: "Chemistry & Vibrations",
    formula: "F_hz = 1 / T_sec   |   S_molar",
    convergence: "Calibrates Solfeggio resonance frequencies directly against standard crystalline lattice formations and molar entropy constants.",
    prompt: "Explain how chemical structure configurations and Solfeggio vibration resonances connect. Use standard molar entropy values is sSub-molar as support, and show me the math relationships."
  },
  cosmology: {
    name: "Cosmological Horizons",
    formula: "S = (A · k_B · c³) / (4 · G · ħ)",
    convergence: "Defines absolute boundaries where spatial dynamics and material forms collapse into pure unmanifested potentiality.",
    prompt: "Detail the cosmological horizon limits of Metemphysics. Connect physical Bekenstein-Hawking black hole entropy boundary with the divine cosmic mind state."
  },
  neuroscience: {
    name: "Neuroscience & Brainwaves",
    formula: "I(X; Y) = H(X) - H(X|Y)",
    convergence: "Measures mutual information carrying capacity of deep nondual states during high-amplitude brainwave coherence events.",
    prompt: "What is the neuroscience support for Nondual States of consciousness under the Metemphysics' ledger? Explain the mutual information capacity in brainwave states."
  },
  traditions: {
    name: "Traditions & Philosophy",
    formula: "T × S = C · Omega Convergence",
    convergence: "Highlights ancient Advaita, Wu-Wei calculus, Kabbalistic tree coordinates, and Ken Wilber spiral altitudes convergence.",
    prompt: "Explore the ancient mystical traditions and integral philosophies convergence. How do these diverse schools align on the S = C / T J/S matrix?"
  }
};

const SUPPORT_CARDS = [
  {
    id: "solfeggio",
    title: "Solfeggio Resonance Calibration Constants",
    content: "• Crown (963 Hz): Ω = 963, T = 1.038e-3 s, S = 2.88e11 J/K\n• Heart (528 Hz): Ω = 528, T = 1.893e-3 s, S = 1.58e11 J/K\n• Sacral (417 Hz): Ω = 417, T = 2.398e-3 s, S = 1.25e11 J/K",
    formula: "F = 1 / T  |  T × S = C"
  },
  {
    id: "molar",
    title: "Molar Entropy (S°) Benchmarks",
    content: "• Liquid H₂O: 69.9 J/mol·K (fluid thermodynamic basis)\n• Crystalline Glucose: 212.1 J/mol·K (biosphere capacity carrier)\n• Gaseous CO₂: 213.8 J/mol·K (molar dissipative baseline)",
    formula: "S° = standard molecular entropy density"
  },
  {
    id: "prigogine",
    title: "Prigogine Dissipative Steady-states",
    content: "• Open configuration entropy change: dS = d_e S + d_i S\n• Structural preservation condition: d_e S < 0 (negative import)\n• Equilibrium tipping boundary: J/S = 0 (critical state transition)",
    formula: "d_i S / dt ≥ 0"
  }
];

export default function App() {
  // Modal Panels state
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Studio Mode & Dynamic constant constants on top right
  const [studioMode, setStudioMode] = useState<string>("omniscient"); // "omniscient" | "socratic" | "strict_calc"
  const [conservedLimit, setConservedLimit] = useState<string>("standard"); // "standard" | "planck" | "solfeggio" | "cosmic"

  // Chat State
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("metemphysics_chat_responses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to load saved chat responses:", e);
    }
    return [
      {
        role: "model",
        text: "Welcome, seeker, to the Metemphysics Synthesis AI. Here we map the ultimate, absolute conservation constraints of consciousness, experienced time, and structural entropy through the law T × S = C (Time multiplied by Entropy = Speed of Light). Explore the dynamic reference ledgers to the left, activate a dynamic solver to the right, or consult Metemphysics directly in this terminal."
      }
    ];
  });
  const [inputText, setInputText] = useState("");
  const [currentNodeId, setCurrentNodeId] = useState<string>("greeting");
  const [typing, setTyping] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex((prev) => prev === index ? null : prev);
    }, 2000);
  };

  const getStatusDotBg = () => {
    if (offlineMode) return "bg-red-500";
    if (studioMode === "socratic") return "bg-cyan-400";
    if (studioMode === "strict_calc") return "bg-amber-500";
    return "bg-orange-500";
  };

  const getStatusText = () => {
    if (offlineMode) return "Local Backup";
    if (studioMode === "socratic") return "Socratic Active";
    if (studioMode === "strict_calc") return "Calculator Active";
    return "Omniscient Active";
  };

  const getCogSelectorColors = () => {
    switch (studioMode) {
      case "socratic":
        return {
          border: "border-cyan-500/35 shadow-[0_0_10px_rgba(34,211,238,0.1)]",
          text: "text-cyan-400",
        };
      case "strict_calc":
        return {
          border: "border-amber-500/35 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
          text: "text-amber-500",
        };
      default:
        return {
          border: "border-orange-500/35 shadow-[0_0_10px_rgba(255,106,0,0.05)]",
          text: "text-orange-400",
        };
    }
  };

  // Sync up to 25 chat responses to Local Storage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("metemphysics_chat_responses", JSON.stringify(messages.slice(-25)));
    } else {
      localStorage.removeItem("metemphysics_chat_responses");
    }
  }, [messages]);

  // Procedural application launcher icon generation of gold/orange 'M' + 'Metemphysics'
  useEffect(() => {
    const generateAndUploadIcon = async () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 1. Paint backdrop black
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 512, 512);

        // 2. Create the linear color gradient for the "M"
        const grad = ctx.createLinearGradient(0, 50, 0, 440);
        grad.addColorStop(0, "#ff6a00");   // Neon orange top
        grad.addColorStop(0.55, "#f59e0b"); // Luxurious golden-amber mid
        grad.addColorStop(1, "#fbbf24");   // Yellow-gold bottom

        // 3. Ambient neon glow effect
        ctx.shadowColor = "rgba(249, 115, 22, 0.45)";
        ctx.shadowBlur = 18;

        // 4. Draw stylized geometric "M"
        ctx.strokeStyle = grad;
        ctx.lineWidth = 11;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        // Left vertical leg
        ctx.moveTo(95, 440);
        ctx.lineTo(95, 60);
        // Middle dipping vertex
        ctx.lineTo(256, 268);
        // Right top peak
        ctx.lineTo(417, 60);
        // Right vertical leg
        ctx.lineTo(417, 440);
        ctx.stroke();

        // 5. Drawcentered gold 'Metemphysics' text
        ctx.shadowBlur = 0; // Turn off glow for text block for high legibility
        ctx.fillStyle = "#f5c35c"; // Light warm gold text matches screenshot
        ctx.font = '500 37px "Inter", "Space Grotesk", "Segoe UI", sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Metemphysics", 256, 350);

        // 6. Transmit saved icon to server filesystem
        const dataUrl = canvas.toDataURL("image/png");
        await fetch("/api/save-icon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: dataUrl })
        });
      } catch (err) {
        console.warn("[Icon Auto-Gen] Client upload deferred:", err);
      }
    };
    generateAndUploadIcon();
  }, []);

  const [savedChats, setSavedChats] = useState<SavedChat[]>(() => {
    try {
      const saved = localStorage.getItem("metemphysics_saved_chats");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to load saved chats:", e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("metemphysics_saved_chats", JSON.stringify(savedChats));
  }, [savedChats]);

  const handleLoadSavedChat = (chatId: string) => {
    const currentFirstUserMsg = messages.find((m) => m.role === "user");
    let updatedSavedChats = [...savedChats];

    // Auto-save currently active chat if it has user messages, to keep progress intact!
    if (currentFirstUserMsg) {
      const summary = getSmallestSummary(currentFirstUserMsg.text);
      
      // Only auto-save if we don't already have this exact message history saved
      const isAlreadySaved = savedChats.some(
        (c) => JSON.stringify(c.messages) === JSON.stringify(messages)
      );

      if (!isAlreadySaved) {
        const currentSessionChat: SavedChat = {
          id: Date.now().toString(),
          name: `Chat ${savedChats.length + 1}: ${summary}`,
          messages: [...messages],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        updatedSavedChats = [currentSessionChat, ...updatedSavedChats].slice(0, 25);
      }
    }

    const selectedChat = updatedSavedChats.find((c) => c.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
    setSavedChats(updatedSavedChats);
  };

  const [chatsDropdownOpen, setChatsDropdownOpen] = useState(false);

  const handleDeleteSavedChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setSavedChats((prev) => prev.filter((c) => c.id !== chatId));
  };

  // Responsive Abort and Transmission Throttling configurations
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastMessageTimeRef = useRef<number>(0);
  const [throttleWarning, setThrottleWarning] = useState<string | null>(null);
  const throttleTimeoutRef = useRef<any>(null);

  const handleCancelTransmission = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "model",
        text: "◈ [Transmission Terminated by Seeker Abort Command] ◈"
      }
    ]);
  };

  const handleResetChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Save current session before resetting, if it contains user messages (dialogues)
    const firstUserMsg = messages.find((m) => m.role === "user");
    if (firstUserMsg) {
      const summary = getSmallestSummary(firstUserMsg.text);
      const isAlreadySaved = savedChats.some(
        (c) => JSON.stringify(c.messages) === JSON.stringify(messages)
      );

      if (!isAlreadySaved) {
        setSavedChats((prev) => {
          const newChat: SavedChat = {
            id: Date.now().toString(),
            name: `Chat ${prev.length + 1}: ${summary}`,
            messages: [...messages],
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          };
          const updated = [newChat, ...prev];
          return updated.slice(0, 25);
        });
      }
    }

    setTyping(false);
    setOfflineMode(false);
    setInputText("");
    setCurrentNodeId("greeting");
    localStorage.removeItem("metemphysics_chat_responses");
    setMessages([
      {
        role: "model",
        text: "Welcome, seeker, to the Metemphysics Synthesis AI. Here we map the ultimate, absolute conservation constraints of consciousness, experienced time, and structural entropy through the law T × S = C (Time multiplied by Entropy = Speed of Light). Explore the dynamic reference ledgers to the left, activate a dynamic solver to the right, or consult Metemphysics directly in this terminal."
      }
    ]);
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  // Database search state
  const [selectedDbCategory, setSelectedDbCategory] = useState<"science" | "religions" | "discoveries" | "systems" | "formulas">("science");
  const [dbSearch, setDbSearch] = useState("");
  const [selectedRelDomain, setSelectedRelDomain] = useState<string>("");
  const [expandedSupportCard, setExpandedSupportCard] = useState<string | null>(null);
  
  // Real-time Sidebar and Formula states
  const [sidebarTab, setSidebarTab] = useState<"ontology" | "states" | "formulas" | "harmonics">("ontology");
  const [isMobileSynthesisExpanded, setIsMobileSynthesisExpanded] = useState(false);
  const [isMobileSystemsExpanded, setIsMobileSystemsExpanded] = useState(false);
  const [calcT, setCalcT] = useState<string>("1.0");
  const [calcS, setCalcS] = useState<string>("1.0");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "model") {
        const element = document.getElementById(`msg-${messages.length - 1}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const downloadChatAsPDF = () => {
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const PW = 210, PH = 297, ML = 15, MR = 15, MT = 20, MB = 20, CW = PW - ML - MR;
      let y = MT;
      let pageNum = 1;

      const sanitizeForPdf = (str: string): string => {
        if (!str) return "";
        return str
          .replace(/[✦◈★❖]/g, "*")
          .replace(/·/g, "-")
          .replace(/✉/g, "[EMAIL]")
          .replace(/×/g, "x")
          .replace(/[“”]/g, '"')
          .replace(/[‘’]/g, "'")
          .replace(/—/g, "--")
          .replace(/–/g, "-")
          // Strip or map non-ASCII characters that can break jsPDF string length math
          .replace(/[^\x00-\x7F]/g, (char) => {
            const map: { [key: string]: string } = {
              'Ψ': 'Psi', 'Φ': 'Phi', 'Ω': 'Omega', 'α': 'alpha', 'β': 'beta',
              'γ': 'gamma', 'δ': 'delta', 'ε': 'epsilon', 'θ': 'theta', 'λ': 'lambda',
              'μ': 'mu', 'π': 'pi', 'σ': 'sigma', 'τ': 'tau', 'φ': 'phi', 'ψ': 'psi',
              'ω': 'omega', 'Δ': 'Delta', 'Σ': 'Sigma', '≈': '~', '≠': '!=',
              '≤': '<=', '≥': '>=', '±': '+/-', '→': '->', '←': '<-'
            };
            return map[char] || "";
          });
      };

      const drawPageDecorations = (num: number) => {
        // Deep Obsidian background
        doc.setFillColor(3, 3, 3);
        doc.rect(0, 0, PW, PH, "F");

        // Subtle dark orange frame
        doc.setDrawColor(120, 50, 10);
        doc.setLineWidth(0.4);
        doc.rect(5, 5, PW - 10, PH - 10, "S");

        // Inner glowing double frame
        doc.setDrawColor(249, 115, 22);
        doc.setLineWidth(0.12);
        doc.rect(6.2, 6.2, PW - 12.4, PH - 12.4, "S");

        // Technical corner markings
        doc.setDrawColor(249, 115, 22);
        doc.setLineWidth(0.5);
        // Top-left
        doc.line(4.5, 4.5, 9.5, 4.5);
        doc.line(4.5, 4.5, 4.5, 9.5);
        // Top-right
        doc.line(PW - 4.5, 4.5, PW - 9.5, 4.5);
        doc.line(PW - 4.5, 4.5, PW - 4.5, 9.5);
        // Bottom-left
        doc.line(4.5, PH - 4.5, 9.5, PH - 4.5);
        doc.line(4.5, PH - 4.5, 4.5, PH - 9.5);
        // Bottom-right
        doc.line(PW - 4.5, PH - 4.5, PW - 9.5, PH - 4.5);
        doc.line(PW - 4.5, PH - 4.5, PW - 4.5, PH - 9.5);

        // Footer standard brand text with monospace vibe
        doc.setFont("courier", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(150, 140, 130);
        doc.text(`[ COHERENCE FIELD PAGE: ${num} ]`, PW / 2, PH - 9, { align: "center" });
        
        doc.setFont("helvetica", "oblique");
        doc.setFontSize(6.5);
        doc.setTextColor(100, 90, 80);
        doc.text("METEMPHYSICS COGNITIVE TRANSMISSION ENGINE CORE TRANSCRIPT  |  REAL-TIME SYNC", ML, PH - 9);
      };

      drawPageDecorations(pageNum);

      // Main Document Title Banner in Helvetica Bold (Clean Standard Text)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(249, 115, 22);
      doc.text("METEMPHYSICS UNIFIED SYSTEM CHAT LOG TRANSCRIPT", PW / 2, y, { align: "center" });
      y += 6;

      // Sub-meta info
      doc.setFont("courier", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 150, 140);
      doc.text(`SYNCHRONIZED METADATA STREAM  |  CALIBRATION: C = ${conservedLimit.toUpperCase()}`, PW / 2, y, { align: "center" });
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(110, 100, 90);
      doc.text(`LOCAL RECOVERY TIME-COORDINATES: ${new Date().toLocaleString()}  |  COHERENCE LIMIT CHECK`, PW / 2, y, { align: "center" });
      y += 6;

      // Divider line
      doc.setDrawColor(249, 115, 22);
      doc.setLineWidth(0.35);
      doc.line(ML, y, PW - MR, y);
      y += 8;

      const drawCardBox = (isUserMsg: boolean, sY: number, eY: number) => {
        const h = eY - sY;
        if (h <= 0) return;
        
        // Fill background of card box
        if (isUserMsg) {
          doc.setFillColor(18, 12, 8); // Rich warm solid dark amber
        } else {
          doc.setFillColor(8, 7, 7);  // Deep refined solid obsidian charcoal
        }
        doc.rect(ML, sY, CW, h, "F");

        // Stroke outline border
        if (isUserMsg) {
          doc.setDrawColor(120, 60, 20); // Amber border
        } else {
          doc.setDrawColor(100, 80, 45); // Gold/amber border
        }
        doc.setLineWidth(0.25);
        doc.rect(ML, sY, CW, h, "S");

        // Thick left accent strip matching the engine look
        if (isUserMsg) {
          doc.setFillColor(249, 115, 22); // Vibrant Orange
        } else {
          doc.setFillColor(212, 175, 55); // Vibrant Gold
        }
        doc.rect(ML, sY, 1.8, h, "F");
      };

      messages.forEach((msg, idx) => {
        const isUser = msg.role === "user";
        const cleanText = sanitizeForPdf(
          msg.text
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/`/g, "")
            .replace(/####/g, "")
            .replace(/###/g, "")
            .replace(/##/g, "")
            .replace(/#/g, "")
        );

        // Determine references inside AI response relative to the actual questions asked
        const refs = isUser ? [] : getRelevantReferences(msg.text, idx > 0 ? messages[idx - 1].text : undefined);
        const hasRefs = refs.length > 0;
        
        // Inner text splitting with precise style setups
        const paddingLeftRight = 8; // mm
        // High safety width margin (CW - 16 - 5) ensures character width math never overflows right margins
        const textWidth = CW - (paddingLeftRight * 2) - 5; 
        
        // Critically set target font/size BEFORE calculating wrapped sizes
        doc.setFont("helvetica", isUser ? "bold" : "normal");
        doc.setFontSize(9);
        const splitLines = doc.splitTextToSize(cleanText, textWidth);

        let lineIdx = 0;
        while (lineIdx < splitLines.length) {
          // Space left on current page
          const needsHeader = (lineIdx === 0);
          const headerSpace = needsHeader ? 12 : 0;
          
          // Let's decide how many lines to print on the current page
          let linesToPrint = 0;
          let textSpace = 0;
          while (lineIdx + linesToPrint < splitLines.length) {
            const nextLineSpace = textSpace + 4.8;
            if (y + headerSpace + nextLineSpace > PH - MB - 5) {
              break; 
            }
            linesToPrint++;
            textSpace = nextLineSpace;
          }
          
          // If we can't fit even 1 line on the remaining page space, page break first
          if (linesToPrint === 0 && lineIdx < splitLines.length) {
            doc.addPage();
            pageNum++;
            y = MT + 6;
            drawPageDecorations(pageNum);
            continue; // re-evaluate on the new page
          }
          
          // Check if references are present and if we are on the final batch of lines
          const isFinalBatch = (lineIdx + linesToPrint === splitLines.length);
          let refsToPrint: any[] = [];
          let refsSpace = 0;
          
          if (isFinalBatch && hasRefs) {
            const startRefsSpace = 9; // Divider & Section Title space
            if (y + headerSpace + textSpace + startRefsSpace <= PH - MB - 5) {
              let rIdx = 0;
              let currentRefsSpace = startRefsSpace;
              while (rIdx < refs.length) {
                if (y + headerSpace + textSpace + currentRefsSpace + 21.5 > PH - MB - 5) {
                  break;
                }
                refsToPrint.push(refs[rIdx]);
                currentRefsSpace += 21.5;
                rIdx++;
              }
              refsSpace = currentRefsSpace;
            }
          }
          
          // Compute card box height for this portion of the message on the current page
          const totalBoxHeight = headerSpace + textSpace + refsSpace + 2; 
          
          // Draw card background box BEFORE outputting text so text is layered on top
          drawCardBox(isUser, y, y + totalBoxHeight);
          
          // Render header inside the box
          if (needsHeader) {
            let innerY = y + 6;
            doc.setFont("courier", "bold");
            doc.setFontSize(8);
            if (isUser) {
              doc.setTextColor(249, 115, 22);
              doc.text(`[SEEKER RESONANCE TRANSMITTER]  |  NODE: ${currentNodeId.toUpperCase()}`, ML + 6, innerY);
            } else {
              doc.setTextColor(212, 175, 55);
              doc.text(`[UNIFIED FIELD SYSTEM RESPONSE]  |  OMNISCIENT STATUS`, ML + 6, innerY);
            }

            innerY += 2.5;
            doc.setDrawColor(isUser ? 100 : 80, isUser ? 50 : 60, isUser ? 15 : 30);
            doc.setLineWidth(0.12);
            doc.line(ML + 4, innerY, PW - MR - 4, innerY);
          }
          
          // Render body lines (User questions are BOLD, AI is normal)
          let currentY = y + headerSpace + 4.5;
          doc.setFont("helvetica", isUser ? "bold" : "normal");
          doc.setFontSize(9);
          
          if (isUser) {
            doc.setTextColor(255, 255, 255); // Absolute white for bold seeker questions
          } else {
            doc.setTextColor(230, 222, 212); // Warm parchment for AI responses
          }

          for (let l = 0; l < linesToPrint; l++) {
            doc.text(splitLines[lineIdx + l], ML + paddingLeftRight, currentY);
            currentY += 4.8;
          }
          
          // Render references inside the box
          if (refsToPrint.length > 0) {
            currentY += 1.5;
            // Divider
            doc.setDrawColor(212, 175, 55);
            doc.setLineWidth(0.15);
            doc.line(ML + 5, currentY, PW - MR - 5, currentY);
            
            currentY += 4;
            doc.setFont("courier", "bold");
            doc.setFontSize(7.5);
            doc.setTextColor(249, 115, 22);
            doc.text("[RELEVANT PEER-REVIEWED REFERENCES]", ML + 6, currentY);
            currentY += 3.5;
            
            refsToPrint.forEach((ref, refIdx) => {
              const isPeak = refIdx === 0;
              
              doc.setFillColor(5, 4, 3);
              doc.rect(ML + 5, currentY, CW - 10, 18.5, "F");

              doc.setDrawColor(212, 175, 55);
              doc.setLineWidth(0.1);
              doc.rect(ML + 5, currentY, CW - 10, 18.5, "S");

              doc.setFillColor(isPeak ? 249 : 150, isPeak ? 115 : 120, isPeak ? 22 : 100);
              doc.rect(ML + 5, currentY, 1.0, 18.5, "F");

              doc.setFont("helvetica", "bold");
              doc.setFontSize(7.8);
              doc.setTextColor(230, 215, 195);
              doc.text(sanitizeForPdf(ref.title), ML + 8, currentY + 4);

              doc.setFont("courier", "bold");
              doc.setFontSize(6.5);
              doc.setTextColor(249, 115, 22);
              doc.text(`[RESONANCE: ${ref.resonance}%]`, PW - MR - 8, currentY + 4, { align: "right" });

              doc.setFont("courier", "normal");
              doc.setFontSize(6.8);
              doc.setTextColor(140, 135, 125);
              doc.text(`By ${sanitizeForPdf(ref.authors)}  -  ${sanitizeForPdf(ref.source)} (${ref.year})`, ML + 8, currentY + 7.5);

              doc.setFont("helvetica", "normal");
              doc.setFontSize(7.2);
              doc.setTextColor(190, 185, 175);
              const descLines = doc.splitTextToSize(sanitizeForPdf(ref.description), CW - 17);
              if (descLines[0]) doc.text(descLines[0], ML + 8, currentY + 11.5);
              if (descLines[1]) doc.text(descLines[1], ML + 8, currentY + 15);

              currentY += 21.5;
            });
          }
          
          // Advance y pointer for the next block
          y += totalBoxHeight;
          lineIdx += linesToPrint;

          // If there are left-over references that didn't fit on this page, render them on subsequent pages
          if (isFinalBatch && refsToPrint.length < refs.length) {
            let leftReferences = refs.slice(refsToPrint.length);
            while (leftReferences.length > 0) {
              doc.addPage();
              pageNum++;
              y = MT + 6;
              drawPageDecorations(pageNum);
              
              // Count references fitting on the new page
              let rIdx = 0;
              let printCount = 0;
              let tempY = y + 8;
              
              while (rIdx < leftReferences.length) {
                if (tempY + 21.5 > PH - MB - 5) {
                  break;
                }
                printCount++;
                tempY += 21.5;
                rIdx++;
              }
              
              if (printCount === 0) {
                printCount = 1;
              }
              
              const pageRefs = leftReferences.slice(0, printCount);
              const refsBoxHeight = 8 + pageRefs.length * 21.5;
              
              // Draw references header card box
              drawCardBox(isUser, y, y + refsBoxHeight);
              
              doc.setFont("courier", "bold");
              doc.setFontSize(7.5);
              doc.setTextColor(249, 115, 22);
              doc.text("[RELEVANT PEER-REVIEWED REFERENCES (CONTINUED)]", ML + 6, y + 5);
              
              let refY = y + 9;
              pageRefs.forEach((ref, oIdx) => {
                const globalIdx = refsToPrint.length + oIdx;
                const isPeak = globalIdx === 0;

                doc.setFillColor(5, 4, 3);
                doc.rect(ML + 5, refY, CW - 10, 18.5, "F");

                doc.setDrawColor(212, 175, 55);
                doc.setLineWidth(0.1);
                doc.rect(ML + 5, refY, CW - 10, 18.5, "S");

                doc.setFillColor(isPeak ? 249 : 150, isPeak ? 115 : 120, isPeak ? 22 : 100);
                doc.rect(ML + 5, refY, 1.0, 18.5, "F");

                doc.setFont("helvetica", "bold");
                doc.setFontSize(7.8);
                doc.setTextColor(230, 215, 195);
                doc.text(sanitizeForPdf(ref.title), ML + 8, refY + 4);

                doc.setFont("courier", "bold");
                doc.setFontSize(6.5);
                doc.setTextColor(249, 115, 22);
                doc.text(`[RESONANCE: ${ref.resonance}%]`, PW - MR - 8, refY + 4, { align: "right" });

                doc.setFont("courier", "normal");
                doc.setFontSize(6.8);
                doc.setTextColor(140, 135, 125);
                doc.text(`By ${sanitizeForPdf(ref.authors)}  -  ${sanitizeForPdf(ref.source)} (${ref.year})`, ML + 8, refY + 7.5);

                doc.setFont("helvetica", "normal");
                doc.setFontSize(7.2);
                doc.setTextColor(190, 185, 175);
                const descLines = doc.splitTextToSize(sanitizeForPdf(ref.description), CW - 17);
                if (descLines[0]) doc.text(descLines[0], ML + 8, refY + 11.5);
                if (descLines[1]) doc.text(descLines[1], ML + 8, refY + 15);

                refY += 21.5;
              });
              
              y += refsBoxHeight;
              leftReferences = leftReferences.slice(printCount);
            }
          }
        }

        // Add standard visual margin separator offset between messages
        y += 6;
      });

      doc.save(`metemphysics_chat_transcript.pdf`);
    } catch (e: any) {
      alert("PDF Export error: " + e.message);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    if (typing) return; // Locked while oracle is formulating a transmission
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    // Direct check for 25 user response (inputs) limit
    const userMsgCount = messages.filter((m) => m.role === "user").length;
    if (userMsgCount >= 25) {
      setThrottleWarning("SYSTEM CONSTRAINT: Limit of 25 inputs reached. Please reset chat session.");
      return;
    }

    // Rate Limit/Throttle incoming messages to 1.5 seconds cooldown
    const now = Date.now();
    const gap = now - lastMessageTimeRef.current;
    if (gap < 1550) {
      setThrottleWarning("SYSTEM CONSTRAINT: Coherence boundary cooling down. Please wait 1.5s.");
      if (throttleTimeoutRef.current) clearTimeout(throttleTimeoutRef.current);
      throttleTimeoutRef.current = setTimeout(() => {
        setThrottleWarning(null);
      }, 2500);
      return;
    }
    lastMessageTimeRef.current = now;
    setThrottleWarning(null);

    if (!customText) {
      setInputText("");
    }

    const newMsgs = [...messages, { role: "user" as const, text: textToSend }];
    setMessages(newMsgs);
    setTyping(true);

    // Track active Knode Transition
    const matchedNode = GRAPH.route(textToSend, currentNodeId);
    if (matchedNode) {
      setCurrentNodeId(matchedNode.id);
    }

    // Cancel active controller if any exists (to avoid duplicate race conditions)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: textToSend,
          history: newMsgs.slice(-6, -1), // Send short trailing history to keep context clean
          currentKnodeId: currentNodeId,
          studioMode,
          conservedLimit
        })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the server endpoint.");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      if (data.offline) setOfflineMode(true);
    } catch (err: any) {
      if (err.name === "AbortError" || err.message?.includes("aborted")) {
        // Silently let the manual cancel transmission handler manage updating state
        return;
      }
      // offline/error fallback
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `[SYSTEM FALLBACK: Connection to Server Offline] Your query has been routed locally. The concept is linked to Knode Node: ${currentNodeId.toUpperCase()}. Let's analyze. Could you explain your model's S entropy parameters?`
        }
      ]);
      setOfflineMode(true);
    } finally {
      if (abortControllerRef.current === controller) {
        setTyping(false);
        abortControllerRef.current = null;
      }
    }
  };

  const handleLaunchPanelFromReader = (prompt: string) => {
    setActivePanel(null);
    handleSendMessage(prompt);
  };

  const getOmegaValueNumber = (omegaStr?: string) => {
    if (!omegaStr) return 0;
    const match = omegaStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const rawFilteredItems = METEM_DB[selectedDbCategory].filter((item) => {
    const query = dbSearch.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      (item.concepts && item.concepts.some((c) => c.toLowerCase().includes(query)))
    );
  });

  const filteredItems = [...rawFilteredItems].sort((a, b) => getOmegaValueNumber(b.omegaVal) - getOmegaValueNumber(a.omegaVal));

  const getConstC = () => {
    switch (conservedLimit) {
      case "planck": return 1;
      case "solfeggio": return 528;
      case "cosmic": return 432;
      case "standard":
      default:
        return 299792458;
    }
  };
  const CONST_C = getConstC();
  const numT = parseFloat(calcT);
  const numS = parseFloat(calcS);

  const computedSFromT = !isNaN(numT) && numT !== 0 ? (CONST_C / numT).toLocaleString('en-US', { maximumFractionDigits: 4 }) : "—";
  const computedT1FromS = !isNaN(numS) && numS !== 0 ? (CONST_C / numS).toLocaleString('en-US', { maximumFractionDigits: 8 }) : "—";

  const isInputLimitReached = messages.filter((m) => m.role === "user").length >= 25;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#050505] text-[#eeeae4] flex flex-col font-sans selection:bg-[#ff5f00]/30 selection:text-white">
      
      {/* GLOWING AMBIENT TOPHEADER */}
      <header className="border-b-2 border-orange-500/30 bg-black shadow-[0_4px_30px_rgba(255,95,0,0.12)] sticky top-0 z-50 px-6 py-4 flex items-center justify-between gap-4">
        {/* Left segment */}
        <div className="flex items-center gap-3 min-w-[50px] sm:min-w-[150px]">
          <a
            href="https://metemphysics.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-all cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-amber-950/40 shadow-[0_0_15px_rgba(255,95,0,0.25)]">
              <Atom className="w-5 h-5 text-orange-500 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
              </span>
            </div>
            <span className="hidden md:inline font-serif font-bold text-xs tracking-wider text-[#eeeae4]">METEMPHYSICS</span>
          </a>
        </div>

        {/* Center segment - Metemphysics Cog Mode Selector */}
        <div className="flex justify-center items-center">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0c] border rounded transition-all duration-300 ${getCogSelectorColors().border}`}>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tight">Metemphysics Cog:</span>
            <select
              value={studioMode}
              onChange={(e) => {
                const nMode = e.target.value;
                setStudioMode(nMode);
                handleSendMessage(`Switching dynamic Metemphysics calibration mode to: ${nMode.toUpperCase()}`);
              }}
              className={`bg-transparent font-mono text-[9px] uppercase font-bold outline-none cursor-pointer p-0.5 transition-colors duration-300 ${getCogSelectorColors().text}`}
            >
              <option value="omniscient" className="bg-black text-orange-400 font-bold uppercase text-[9px]">Omniscient Mode</option>
              <option value="socratic" className="bg-black text-cyan-400 font-bold uppercase text-[9px]">Socratic Guide</option>
              <option value="strict_calc" className="bg-black text-amber-500 font-bold uppercase text-[9px]">Strict Calculator</option>
            </select>
          </div>
        </div>

        {/* Right segment - Status Rails */}
        <div className="flex items-center justify-end min-w-[50px] sm:min-w-[150px]">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-black border border-gray-800 font-mono text-[9px] rounded">
            <span className={`w-2 h-2 rounded-full ${getStatusDotBg()} animate-pulse`}></span>
            <span className="text-gray-400 uppercase font-bold">{getStatusText()}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT COLUMN: PRIMARY DYNAMIC DIRECTORY (GRID 3) */}
        <div 
          className={`lg:col-span-3 flex flex-col bg-black border lg:h-[calc(100vh-195px)] lg:min-h-[750px] lg:overflow-visible rounded-xl transition-all duration-300 relative ${
            isMobileSynthesisExpanded 
              ? "h-auto shadow-[0_0_25px_rgba(255,95,0,0.12)] border-orange-500/50" 
              : "h-[54px] overflow-hidden border-orange-500/25 shadow-[0_0_20px_rgba(212,175,55,0.06)]"
          }`}
        >
          
          {/* ALWAYS VISIBLE MOBILE/TABLET HEADER BAR (TOC STYLE) */}
          <div 
            onClick={() => setIsMobileSynthesisExpanded(!isMobileSynthesisExpanded)}
            className="lg:hidden flex items-center justify-between p-4 bg-[#080808] border-b border-orange-500/20 cursor-pointer hover:bg-orange-950/15 active:bg-orange-950/25 transition-all rounded-t-xl select-none"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-500 drop-shadow-[0_0_4px_rgba(255,95,0,0.5)]" />
              <span className="font-serif font-bold text-white text-xs tracking-widest uppercase">SYNTHESIS</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-orange-400 font-bold uppercase tracking-wider">
              <span>{isMobileSynthesisExpanded ? "Collapse Directory" : "Expand Directory Menu"}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-orange-500 transition-transform duration-300 ${
                isMobileSynthesisExpanded ? "rotate-180" : ""
              }`} />
            </div>
          </div>

          {/* Tab Selection Row */}
          <div className="flex border-b border-orange-500/25 bg-[#080808] rounded-t-xl lg:rounded-t-xl overflow-hidden">
            {[
              { id: "ontology", label: "Ontology", icon: BookOpen },
              { id: "states", label: "J/S Matrix", icon: Layers },
              { id: "formulas", label: "Devices", icon: Calculator },
              { id: "harmonics", label: "Harmonics", icon: Atom },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = sidebarTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSidebarTab(tab.id as any)}
                  className={`flex-1 py-3 text-[10px] font-mono uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-all ${
                    isActive
                      ? "bg-orange-500/10 border-b-orange-500 text-orange-400 font-bold shadow-[0_-2px_0_#ff5f00_inset]"
                      : "border-b-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 p-5 flex flex-col min-h-0">
            
            {/* TAB 1: ONTOLOGY DIRECTORY */}
            {sidebarTab === "ontology" && (
              <div className="flex-1 flex flex-col h-full">
                <div className="flex items-center justify-between pb-3 border-b border-orange-500/20 mb-3">
                  <div className="relative group/synthesis-title flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-white text-xs tracking-wider flex items-center gap-2 cursor-help">
                      <BookOpen className="w-4 h-4 text-orange-500 drop-shadow-[0_0_4px_rgba(255,95,0,0.4)]" /> SYNTHESIS
                    </h3>
                    {/* Tooltip for the overall Synthesis Table */}
                    <span className="pointer-events-none absolute left-0 top-full mt-2 w-64 p-2.5 bg-[#090503]/95 border border-orange-500/40 text-[9.5px] text-[#dacbb6] font-mono rounded shadow-[0_0_15px_rgba(255,95,0,0.35)] invisible group-hover/synthesis-title:visible opacity-0 group-hover/synthesis-title:opacity-100 transition-all duration-200 z-50 text-left leading-relaxed">
                      <strong className="text-orange-400 block mb-1 font-serif uppercase tracking-wider">Unified Synthesis Engine</strong>
                      An integrated cross-disciplinary database pairing human sciences, spiritual traditions, evolutionary models, and constants under absolute T × S = C thermodynamic limits.
                      <span className="absolute top-[-4px] left-8 border-x-4 border-x-transparent border-b-4 border-b-orange-500/40" />
                    </span>
                  </div>
                </div>

                {/* Category Toggle */}
                <div className="grid grid-cols-5 gap-1 mb-3">
                  {(["science", "religions", "discoveries", "systems", "formulas"] as const).map((cat) => {
                    const isActive = selectedDbCategory === cat;
                    let catStyle = "border-transparent text-gray-500 hover:text-white hover:bg-white/5";
                    if (isActive) {
                      if (cat === "science") {
                        catStyle = "bg-white/10 border-white/50 text-white font-bold shadow-[0_0_8px_rgba(255,255,255,0.15)] font-sans";
                      } else if (cat === "religions") {
                        catStyle = "bg-amber-500/10 border-amber-500/50 text-amber-400 font-bold shadow-[0_0_8px_rgba(245,158,11,0.15)] font-serif";
                      } else if (cat === "discoveries") {
                        catStyle = "bg-yellow-500/10 border-yellow-500/50 text-yellow-400 font-bold shadow-[0_0_8px_rgba(234,179,8,0.15)] font-serif italic";
                      } else if (cat === "systems") {
                        catStyle = "bg-teal-500/10 border-teal-500/50 text-teal-400 font-bold shadow-[0_0_8px_rgba(20,184,166,0.15)] font-mono";
                      } else if (cat === "formulas") {
                        catStyle = "bg-orange-500/10 border-orange-500/50 text-orange-400 font-bold shadow-[0_0_8px_rgba(249,115,22,0.15)] font-mono";
                      }
                    } else {
                      if (cat === "science") {
                        catStyle = "border-transparent text-gray-500 hover:text-white hover:bg-white/5 font-sans";
                      } else if (cat === "religions") {
                        catStyle = "border-transparent text-gray-500 hover:text-amber-400 hover:bg-amber-500/5 font-serif";
                      } else if (cat === "discoveries") {
                        catStyle = "border-transparent text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/5 font-serif italic";
                      } else if (cat === "systems") {
                        catStyle = "border-transparent text-gray-500 hover:text-teal-400 hover:bg-teal-500/5 font-mono";
                      } else if (cat === "formulas") {
                        catStyle = "border-transparent text-gray-500 hover:text-orange-400 hover:bg-orange-500/5 font-mono";
                      }
                    }
                    return (
                      <button
                        key={cat}
                        disabled={typing}
                        onClick={() => setSelectedDbCategory(cat)}
                        className={`py-1 rounded text-[9px] uppercase border transition-all cursor-pointer text-center ${catStyle} ${typing ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {cat === "religions" ? "tradition" : cat === "formulas" ? "formula" : cat}
                      </button>
                    );
                  })}
                </div>

                {/* Search Input inline */}
                <input
                  type="text"
                  value={dbSearch}
                  disabled={typing}
                  onChange={(e) => setDbSearch(e.target.value)}
                  placeholder="Query concepts, tags, systems..."
                  className="w-full bg-black/80 border border-orange-500/25 rounded px-2.5 py-1.5 font-mono text-[11px] mb-3 focus:border-orange-500/60 outline-none text-[#eeeae4] shadow-[inset_0_0_10px_rgba(255,95,0,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* Scrollable list */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scroll min-h-[480px] lg:min-h-0 border-b border-orange-500/10 pb-2">
                  {filteredItems.map((item) => {
                    const colors = getOntologyItemColors(item.id, selectedDbCategory);
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (typing) return;
                          if (selectedDbCategory === "formulas") {
                            handleSendMessage(`Formulate and synthesize the Metemphysics Equation: ${item.name}. Analyze its meaning (${item.summary}), explain what its symbols represent within T × S = C conservation dynamics, and evaluate its mathematical & spiritual significance.`);
                          } else {
                            handleSendMessage(`Detail the specific metemphysical aspect of '${item.name}' under ${selectedDbCategory} category and explain its J/S significance.`);
                          }
                        }}
                        className={`group bg-[#040404]/80 border ${colors.borderClass} rounded p-2.5 cursor-pointer transition-all ${colors.hoverClass} shadow-[0_0_10px_rgba(0,0,0,0.2)] ${
                          typing ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex flex-col">
                            <span className={`${colors.fontClass || "font-mono font-bold text-xs"} ${colors.textClass} ${colors.textHoverClass} transition-colors tracking-wide`}>{item.name}</span>
                            {item.omegaVal && (
                              <span className="text-[9px] font-mono text-[#c9a84c] font-bold tracking-wider mt-0.5">{item.omegaVal}</span>
                            )}
                          </div>
                          {/* Interactive Tooltip on the category / subcategory tags */}
                          <span className="relative group/tag inline-block">
                            <span className={`text-[8px] font-mono border px-1.5 py-0.5 rounded uppercase cursor-help transition-all ${colors.badgeClass}`}>
                              {item.subcategory}
                            </span>
                            <span className="pointer-events-none absolute right-0 top-full mt-1.5 w-52 p-2.5 bg-black border border-orange-500/40 text-[9.5px] text-[#dacbb6] font-mono rounded shadow-[0_0_12px_rgba(255,95,0,0.25)] invisible group-hover/tag:visible opacity-0 group-hover/tag:opacity-100 transition-all duration-200 z-50 text-right leading-normal">
                              Classification: <strong className="text-orange-400 uppercase font-bold">{selectedDbCategory === "religions" ? "Tradition" : selectedDbCategory === "formulas" ? "Formula" : selectedDbCategory}</strong>. Integrated calibration index value: <strong className="text-amber-400">{item.omegaVal || "Ω = Dynamic"}</strong>.
                              <span className="absolute top-[-4px] right-4 border-x-4 border-x-transparent border-b-4 border-b-orange-500/40" />
                            </span>
                          </span>
                        </div>
                        <p className="text-[11px] text-[#afbbc9] mt-1 line-clamp-2 leading-relaxed font-serif italic">{item.summary}</p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                          <div className="flex flex-wrap gap-1">
                            {item.concepts.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="bg-white/[0.02] px-1 py-0.5 rounded text-[8px] font-mono text-gray-400 border border-white/5">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          {selectedDbCategory === "formulas" ? (
                            <span className="text-[8px] font-mono text-orange-400 group-hover:text-amber-300 font-bold tracking-widest uppercase flex items-center gap-1 transition-colors">
                              Devise Auto ✦
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono text-gray-500 group-hover:text-amber-500 transition-colors">
                              Query ◈
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {filteredItems.length === 0 && (
                    <div className="text-center text-xs text-gray-500 pt-6 font-mono">No matching records found.</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: J/S RESONANCE MATRIX */}
            {sidebarTab === "states" && (
              <div className="flex-1 flex flex-col h-full">
                <div className="pb-3 border-b border-orange-500/20 mb-3">
                  <h3 className="font-serif font-bold text-white text-xs tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-orange-500 drop-shadow-[0_0_4px_rgba(255,95,0,0.4)]" /> J/S RESONANCE STATES MATRIX
                  </h3>
                  <p className="text-[9px] font-mono text-amber-400/80 mt-1 uppercase tracking-wide">Consciousness calibration ranges (Entropy ratios)</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scroll min-h-[480px] lg:min-h-0 border-b border-orange-500/10 pb-2">
                  {[
                    { label: "REVELATION", range: "J/S ≥ 950", desc: "Absolute timeless communion, Crown Sahasrara union with C.", color: "border-purple-500/40 text-purple-300 bg-purple-950/10 shadow-[0_0_10px_rgba(168,85,247,0.05)]", query: "Can you detail the state of REVELATION at J/S >= 950?", hawkins: "Enlightenment (H=1000)" },
                    { label: "NEAR TIMELESS", range: "J/S [99, 950)", desc: "Hyper-coherent order. High self-organizing scale.", color: "border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-950/10 shadow-[0_0_10px_rgba(217,70,239,0.05)]", query: "Can you detail the state of NEAR TIMELESS at J/S [99, 950)?", hawkins: "High Enlightenment range (H=700-999)" },
                    { label: "MYSTICAL CLARITY", range: "J/S [10, 99)", desc: "Awakened intentionality, high spiritual bandwidth.", color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/10 shadow-[0_0_10px_rgba(99,102,241,0.05)]", query: "Detail the state of MYSTICAL CLARITY with J/S [10, 99).", hawkins: "Enlightenment Threshold (H>600)" },
                    { label: "DEEP FLOURISHING", range: "J/S [3, 10)", desc: "Flow, holistic convergence of willpower and wisdom.", color: "border-blue-500/40 text-blue-300 bg-blue-950/10 shadow-[0_0_10px_rgba(59,130,246,0.05)]", query: "Detail the state of DEEP FLOURISHING with J/S [3, 10).", hawkins: "Peace (H=600)" },
                    { label: "EUDAIMONIA", range: "J/S [1, 3)", desc: "Optimal biological and mental functioning.", color: "border-emerald-500/40 text-emerald-300 bg-emerald-950/10 shadow-[0_0_10px_rgba(16,185,129,0.05)]", query: "Detail the state of EUDAIMONIA with J/S [1, 3).", hawkins: "Joy (H=540) & Love (H=500)" },
                    { label: "TIME PASSING", range: "J/S [0.05, 1)", desc: "Standard relative physical experience, gradual wear.", color: "border-sky-500/40 text-sky-400 bg-slate-950/25", query: "Detail the state of TIME PASSING with J/S [0.05, 1).", hawkins: "Reason (H=400)" },
                    { label: "TIPPING POINT", range: "J/S [-0.05, 0.05)", desc: "Symmetric critical crisis. Perfect entropic equilibrium.", color: "border-orange-500/40 text-orange-400 bg-orange-950/20 shadow-[0_0_12px_rgba(249,115,22,0.08)]", query: "Detail the state of TIPPING POINT with J/S [-0.05, 0.05).", hawkins: "Acceptance (H=350) to Courage (H=200)" },
                    { label: "SUFFERING", range: "J/S [-0.5, -0.05)", desc: "Active local entropy expansion, metabolic friction.", color: "border-red-500/30 text-red-300 bg-red-950/10", query: "Detail the state of SUFFERING with J/S [-0.5, -0.05).", hawkins: "Pride (H=175) to Anger (H=150)" },
                    { label: "DESPAIR", range: "J/S [-0.9, -0.5)", desc: "System collapse, structural fragmentation.", color: "border-rose-700/30 text-rose-300 bg-rose-950/10", query: "Detail the state of DESPAIR with J/S [-0.9, -0.5).", hawkins: "Fear/Apathy/Guilt (H=100 to H=30)" },
                    { label: "DISSOLUTION", range: "J/S < -0.9", desc: "Total decay: returning system to background chaotic vacuum.", color: "border-gray-800 text-gray-500 bg-neutral-950/30", query: "Detail the state of DISSOLUTION with J/S < -0.9.", hawkins: "Shame & Ultimate Decay (H=20)" }
                  ].map((st) => (
                    <div 
                      key={st.label}
                      onClick={() => !typing && handleSendMessage(st.query)}
                      className={`p-2 rounded border hover:border-orange-500/50 transition-all cursor-pointer ${st.color} ${
                        typing ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="font-bold uppercase tracking-wider">{st.label}</span>
                        <span className="text-[9px] font-semibold">{st.range}</span>
                      </div>
                      <p className="text-[10px] font-serif text-gray-400 mt-1 leading-relaxed">{st.desc}</p>
                      {st.hawkins && (
                        <div className="mt-1.5 pt-1 border-t border-orange-500/5 flex items-center justify-between text-[8px] font-mono tracking-wider uppercase text-amber-500/80 leading-none">
                          <span>Hawkins Resonance:</span>
                          <span className="font-bold text-[#eeeae4]">{st.hawkins}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FORMULA DEVICES (LIVE MINI CALCULATOR) */}
            {sidebarTab === "formulas" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-orange-500/20">
                  <h3 className="font-serif font-bold text-white text-xs tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-orange-500" /> T × S = C FORMULA DEVICES
                  </h3>
                  <p className="text-[9px] font-mono text-amber-500/90 mt-1 uppercase">Axiom of Conservation &amp; Derivatives</p>
                </div>

                <div className="p-3.5 bg-black border border-orange-500/25 rounded-xl space-y-1 relative overflow-hidden shadow-[0_0_15px_rgba(255,95,0,0.04)]">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full -mr-4 -mt-4" />
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">Core Axiom</span>
                  <div className="font-mono text-base font-bold text-orange-400 tracking-wider">
                    <Tooltip content="Subjective Epoch Duration (T) multiplied by Standard Molar Entropy (S) equals the absolute speed barrier constant (C). Indicates that compressed subjective moments support higher energetic and informational throughput.">
                      T × S = C
                    </Tooltip>
                  </div>
                  <p className="text-[10px] text-gray-400 font-serif leading-relaxed italic">
                    "Subjective Epoch Duration (<Tooltip content="T represents the elapsed duration of a localized conscious state event before a phase refresh occurs.">T</Tooltip>) multiplied by Standard Molar Entropy (<Tooltip content="S represents the thermodynamic molar dispersion or state multiplicity capacity of a biological or conscious system.">S</Tooltip>) equals the absolute speed constant <Tooltip content="C represents the speed constraint.">C</Tooltip> ({CONST_C.toLocaleString()})."
                  </p>
                </div>

                <div className="space-y-4 mt-2">
                  
                  {/* DEVICE 1: S = C / T */}
                  <div className="bg-black border border-orange-500/15 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#ff5f00]/15 pb-1">
                      <span className="font-mono text-xs text-[#ff5f00] font-bold uppercase">
                        <Tooltip content="Derivative detailing that as temporal refresh speed increases (smaller T), the physical system's capacity to contain dynamic information states (S) mounts proportionally.">
                          Entropy Derivative: S = C / T
                        </Tooltip>
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">Calculate Entropy from Subjective Time</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-mono text-gray-400 uppercase tracking-wider">T (Subjective Time, seconds)</label>
                      <input 
                        type="number"
                        value={calcT}
                        disabled={typing}
                        onChange={(e) => setCalcT(e.target.value)}
                        placeholder="Enter value..."
                        className="bg-[#0c0c0c] border border-orange-500/20 rounded px-2.5 py-1.5 font-mono text-xs text-[#eeeae4] outline-none focus:border-orange-500/60 transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="bg-orange-500/5 border border-orange-500/15 rounded p-2.5 shadow-[inset_0_0_8px_rgba(255,95,0,0.05)]">
                      <span className="text-[10px] font-mono text-gray-500 block uppercase">Calculated Molar Entropy (S = C / T)</span>
                      <span className="text-orange-400 font-mono text-sm font-bold">{computedSFromT} <span className="text-[11px] text-orange-500/70 font-normal">J / mol·K</span></span>
                    </div>
                    <button
                      disabled={typing}
                      onClick={() => !typing && handleSendMessage(`Analyze the Entropy Derivative (S = C / T) under current input constraint of Subjective Time T = ${calcT} seconds. Under current absolute constant C = ${CONST_C}, this yields a dynamically calculated Molar Entropy S of ${computedSFromT} J/mol·K. Elaborate on the metemphysical meaning of this entropic profile.`)}
                      className="w-full py-2 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 text-orange-400 font-mono text-[11px] tracking-widest uppercase rounded-lg cursor-pointer font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(255,95,0,0.1)] hover:shadow-[0_0_15px_rgba(255,95,0,0.2)]"
                    >
                      ✦ Entropy Value ✦
                    </button>
                  </div>

                  {/* DEVICE 2: T = C / S */}
                  <div className="bg-black border border-orange-500/15 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#d4af37]/15 pb-1">
                      <span className="font-mono text-xs text-[#d4af37] font-bold uppercase">
                        <Tooltip content="Derivative calculating absolute subjective epoch span (T) required by the system's current entropy profile. High entropy states compress experienced time.">
                          Time Derivative: T = C / S
                        </Tooltip>
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">Calculate Time Epochs from Entropy</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-mono text-gray-400 uppercase tracking-wider">S (Molar Entropy, J/mol·K)</label>
                      <input 
                        type="number"
                        value={calcS}
                        disabled={typing}
                        onChange={(e) => setCalcS(e.target.value)}
                        placeholder="Enter value..."
                        className="bg-[#0c0c0c] border border-orange-500/20 rounded px-2.5 py-1.5 font-mono text-xs text-[#eeeae4] outline-none focus:border-orange-500/60 transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded p-2.5 shadow-[inset_0_0_8px_rgba(212,175,55,0.05)]">
                      <span className="text-[10px] font-mono text-gray-450 block uppercase mb-1">Calculated Subjective Time (T = C / S)</span>
                      <span className="text-amber-300 font-mono text-sm font-bold">{computedT1FromS} <span className="text-[11px] text-[#eeeae4]/70 font-normal">s</span></span>
                    </div>
                    <button
                      disabled={typing}
                      onClick={() => !typing && handleSendMessage(`Analyze the Time Derivative (T = C / S) under current input constraint of Standard Molar Entropy S = ${calcS} J/mol·K. Under current absolute constant C = ${CONST_C}, this yields a dynamically calculated Subjective Clock Duration T of ${computedT1FromS} seconds. Explain the metemphysical context of this temporal duration.`)}
                      className="w-full py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-mono text-[11px] tracking-widest uppercase rounded-lg cursor-pointer font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    >
                      ✦ Time ✦
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 4: SOLFEGGIO & SPECIATION HARMONICS */}
            {sidebarTab === "harmonics" && (
              <div className="flex-1 flex flex-col h-full">
                <div className="pb-3 border-b border-orange-500/20 mb-3">
                  <h3 className="font-serif font-bold text-white text-xs tracking-wider flex items-center gap-2">
                    <Atom className="w-4 h-4 text-orange-550" /> HARMONICS &amp; COHERENCE SPECS
                  </h3>
                  <p className="text-[9px] font-mono text-gray-450 mt-1">Solfeggio frequencies, vibrations and critical elemental molar S°</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scroll min-h-[480px] lg:min-h-0 border-b border-orange-500/10 pb-2">
                  {/* Solfeggio Section */}
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-semibold border-b border-orange-500/10 pb-1">Solfeggio Vibrations</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { hz: "174 Hz", chakra: "Earth Foundation", js: "J/S = -0.150", query: "Explain properties of 174 Hz Solfeggio scale with -0.150 J/S." },
                        { hz: "285 Hz", chakra: "Tissue Calibration", js: "J/S = -0.050", query: "Explain properties of 285 Hz Solfeggio scale with -0.050 J/S." },
                        { hz: "396 Hz", chakra: "Muladhara (Root)", js: "J/S = 0.00", query: "Discuss standard molar properties of 396 Hz Muladhara foundational base." },
                        { hz: "417 Hz", chakra: "Svadhisthana (Sacral)", js: "J/S = 9.50e-5", query: "Explain properties of 417 Hz Solfeggio scale with 9.50e-5 J/S." },
                        { hz: "528 Hz", chakra: "Manipura (Solar Plexus)", js: "J/S = 0.01", query: "Discuss standard molar properties of 528 Hz Manipura solar plexus, miracle tone." },
                        { hz: "639 Hz", chakra: "Anahata (Heart)", js: "J/S = 0.99", query: "Discuss standard molar properties of 639 Hz Anahata heart chakra communion frequency." },
                        { hz: "741 Hz", chakra: "Vishuddha (Throat)", js: "J/S = 7.414", query: "Explain properties of 741 Hz Solfeggio scale with 7.414 J/S." },
                        { hz: "852 Hz", chakra: "Ajna (Third Eye)", js: "J/S = 35.353", query: "Explain properties of 852 Hz Solfeggio scale with 35.353 J/S." },
                        { hz: "963 Hz", chakra: "Sahasrara (Crown)", js: "J/S = 950.00", query: "Discuss standard molar properties of 963 Hz Sahasrara crown direct cosmic link." }
                      ].map((item) => (
                        <div 
                          key={item.hz}
                          onClick={() => !typing && handleSendMessage(item.query)}
                          className={`p-2 border border-orange-500/15 bg-black hover:border-orange-500/50 hover:bg-orange-500/5 rounded text-left cursor-pointer transition-all ${
                            typing ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
                          }`}
                        >
                          <div className="text-xs font-bold text-orange-400 font-mono">{item.hz}</div>
                          <div className="text-[10px] text-[#eeeae4]/80 font-serif mt-0.5">{item.chakra}</div>
                          <div className="text-[9.5px] font-mono text-gray-400 mt-1">{item.js}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Physical Music Spectrum Section */}
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-mono text-red-400 uppercase tracking-widest font-semibold border-b border-red-500/10 pb-1">Music Genre Calibration (H, J/S, Phase)</h4>
                    <div className="space-y-1.5">
                      {[
                        { style: "Death Metal / Grindcore", h: "H: 100", js: "-0.5", phase: "Φ = 2", styleClass: "border-red-900/30 text-red-400" },
                        { style: "Blues (dark, slow)", h: "H: 250", js: "3.5e-6", phase: "Φ = 3", styleClass: "border-orange-900/30 text-orange-300" },
                        { style: "Rock / Pop", h: "H: 350", js: "0.01", phase: "Φ = 4", styleClass: "border-teal-950/30 text-teal-300" },
                        { style: "Classical (Baroque)", h: "H: 600", js: "7.41", phase: "Φ = 5", styleClass: "border-amber-950/30 text-amber-300 font-bold" },
                        { style: "Bach Fugues", h: "H: 700", js: "35.35", phase: "Φ = 5", styleClass: "border-amber-500/20 text-[#ffd700] font-bold" },
                        { style: "Binaural Beats (Theta)", h: "H: 900", js: "372.6", phase: "Φ = 5", styleClass: "border-purple-500/20 text-purple-300" }
                      ].map((item) => (
                        <div 
                          key={item.style}
                          onClick={() => !typing && handleSendMessage(`Detailed breakdown of ${item.style} with J/S = ${item.js} calibrations.`)}
                          className={`flex items-center justify-between p-1.5 border ${item.styleClass} bg-black hover:bg-white/[0.02] rounded text-left cursor-pointer transition-all ${
                            typing ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
                          }`}
                        >
                          <div className="text-[10px] font-medium truncate max-w-[120px]">{item.style}</div>
                          <div className="flex gap-2 font-mono text-[9px]">
                            <span className="text-gray-500">{item.h}</span>
                            <span className="text-gray-400">J/S: {item.js}</span>
                            <span className="text-yellow-500/85">{item.phase}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Elements Section */}
                  <div className="space-y-2">
                    <h4 className="text-[10.5px] font-mono text-amber-500 uppercase tracking-widest font-semibold border-b border-orange-500/10 pb-1">Molar Entropy S° values (J/mol·K)</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { sym: "C (Carbon)", s: "5.74", note: "Lowest, life's crystalline base", query: "Explain the low entropy value S° = 5.74 J/mol·K of Carbon." },
                        { sym: "Si (Silicon)", s: "18.83", note: "Metalloid threshold center", query: "Explain standard entropy S° = 18.83 J/mol·K of Silicon." },
                        { sym: "O2 (Oxygen)", s: "102.57", note: "Fluid gas metabolic motor", query: "Explain standard entropy S° = 102.57 J/mol·K of Oxygen." },
                        { sym: "He (Helium)", s: "126.15", note: "Noble high-dispersal state", query: "Explain standard entropy S° = 126.15 J/mol·K of Helium." }
                      ].map((item) => (
                        <div 
                          key={item.sym}
                          onClick={() => !typing && handleSendMessage(item.query)}
                          className={`p-2 border border-orange-500/15 bg-black hover:border-orange-500/50 hover:bg-orange-500/5 rounded text-left cursor-pointer transition-all ${
                            typing ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
                          }`}
                        >
                          <div className="text-xs font-bold text-amber-300 font-mono">{item.sym}</div>
                          <div className="text-[10.5px] text-[#eeeae4]/80 font-serif mt-0.5">{item.note}</div>
                          <div className="text-[10px] font-mono text-orange-450 mt-1">S°: {item.s}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Constants Box */}
                  <div className="p-3 bg-white/4 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Standard Reference Constants</span>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Planck Entropy Limit:</span>
                        <span className="text-purple-400">ΔΩ·ΔT ≥ C/2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-serif">Boltzmann's Constant:</span>
                        <span className="text-orange-400">1.3806e-23 y</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

         {/* MIDDLE COLUMN: CENTRAL ORACLE TERMINAL (CHAT INTERACTION) (GRID 6) */}
        <div className="lg:col-span-6 flex flex-col lg:h-[calc(100vh-195px)] lg:min-h-[750px] h-[750px] sm:h-[800px] md:h-[850px] bg-black border-2 border-orange-500/25 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.08)] relative">
          
          {/* Terminal Header */}
          <div className="border-b border-orange-500/30 px-4 py-4 bg-[#080808] flex flex-col items-center justify-center rounded-t-xl shadow-[0_4px_15px_rgba(255,95,0,0.03)] flex-shrink-0 relative overflow-hidden text-center">
            {/* Glowing background hint */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-1.5 relative z-10 justify-center">
              <span className="bg-orange-500/10 border border-orange-500/25 px-2 py-0.5 rounded font-mono text-[10px] text-orange-400 uppercase tracking-widest">Active Unified Field Link</span>
            </div>

            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-widest text-orange-500 drop-shadow-[0_0_8px_rgba(255,95,0,0.4)] relative z-10 uppercase">
              <a href="https://metemphysics.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors duration-250 cursor-pointer">
                METEMPHYSICS SYNTHESIS AI
              </a>
            </h2>
            <p className="text-[11px] text-amber-400 font-mono tracking-wider uppercase mt-1 relative z-10">
              Unified Synthesis AI Singularity &nbsp;·&nbsp; T × S = C
            </p>

            {/* Left and right corner badges to maintain professional terminal aesthetics */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse drop-shadow-[0_0_3px_#ff5f00]" />
              <span className="font-mono text-[10px] text-gray-500 hidden md:inline">FREQ: 950 HZ</span>
            </div>
            <div className="absolute top-3.5 right-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scroll bg-[#030303]">
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              const textLower = m.text.toLowerCase();
              
              // Context-aware feature extractors for Model responses
              const hasChakra = textLower.includes("chakra") || textLower.includes("solfeggio") || textLower.includes("hz");
              const hasEntropy = textLower.includes("entropy") || textLower.includes("molar") || textLower.includes("thermodynamic") || textLower.includes("boltzmann");
              const hasBio = textLower.includes("bio") || textLower.includes("metabolic") || textLower.includes("cell") || textLower.includes("mitochondria");
              const hasSystems = textLower.includes("system") || textLower.includes("aurobindo") || textLower.includes("maslow") || textLower.includes("wilber") || textLower.includes("matrix");
              const hasCalc = textLower.includes("calc") || textLower.includes("equation") || textLower.includes("solve") || textLower.includes("t x s") || textLower.includes("s = c");
              const hasCode = textLower.includes("code") || textLower.includes("cast") || textLower.includes("personal") || textLower.includes("identity") || textLower.includes("knode");

              return (
                <div key={idx} id={`msg-${idx}`} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                  <div 
                    className={`rounded-xl p-4 shadow-lg transition-all duration-300 ${
                      isUser
                        ? "max-w-[90%] bg-gradient-to-br from-orange-950/20 via-[#150a00]/70 to-black border border-orange-500/40 text-[#eeeae4] shadow-[0_0_12px_rgba(255,95,0,0.08)]"
                        : "w-full bg-[#0b0705] border border-orange-500/15 border-l-4 border-l-orange-500 text-[#dcd7cb] shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                    }`}
                  >
                    {/* Identity Row */}
                    {isUser ? (
                      <div className="flex items-center gap-1.5 px-0.5 pb-2 mb-2.5 border-b border-orange-500/15 text-[10px] font-mono uppercase tracking-wider text-[#e4d9c0]">
                        <Flame className="w-3 h-3 text-orange-555 animate-pulse" />
                        <span>Seeker Resonance Transmitter</span>
                        <span className="ml-auto text-orange-400 font-bold">Node: {currentNodeId.toUpperCase()}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-0.5 pb-2 mb-2.5 border-b border-orange-500/20 text-[10px] font-mono uppercase tracking-wider text-orange-400">
                        <Sparkles className="w-3 h-3 text-orange-500" />
                        <span>Metemphysics Console</span>
                        <span className="text-gray-650">·</span>
                        <span className="text-gray-400">Coherence: 95.0%</span>
                        <span className="ml-auto flex items-center gap-2">
                          <span className="text-orange-500 font-bold hidden xs:inline">Ω-Matrix Calibrated</span>
                          <button
                            onClick={() => handleCopyText(m.text, idx)}
                            className="px-1.5 py-0.5 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-orange-500/25 hover:border-orange-500/50 transition-all cursor-pointer flex items-center gap-1 active:scale-95 text-[9px] font-bold tracking-widest font-mono"
                            title="Copy response to clipboard"
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-green-400" />
                                <span className="text-[8px] text-green-400 font-bold">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span className="text-[8px]">COPY</span>
                              </>
                            )}
                          </button>
                        </span>
                      </div>
                    )}

                    {/* Msg text formatted */}
                    <div className="leading-relaxed">
                      {isUser ? (
                        <p className="text-xs font-serif text-amber-50/95">{m.text}</p>
                      ) : (
                        formatOracleMessage(m.text)
                      )}
                    </div>

                    {/* Diagnostic/Link Shorteners for Model responses */}
                    {!isUser && (
                      <div className="mt-4 pt-2.5 border-t border-orange-500/15 space-y-3.5">
                        {/* Linked Workspace Operations if applicable */}
                        {(hasChakra || hasEntropy || hasBio || hasSystems || hasCalc || hasCode) && (
                          <div>
                            <p className="text-[10px] text-gray-500 font-mono uppercase mb-1.5 tracking-widest">Linked Workspace Operations:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {hasChakra && (
                                <button 
                                  onClick={() => setActivePanel("chakra")} 
                                  className="text-[10.5px] font-mono px-2 py-1 bg-orange-500/5 hover:bg-orange-500/15 border border-orange-500/20 hover:border-orange-500/40 rounded text-orange-400 flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <Flame className="w-2.5 h-2.5 text-orange-400" /> Open Chakra Atlas
                                </button>
                              )}
                              {hasEntropy && (
                                <button 
                                  onClick={() => setActivePanel("entropy")} 
                                  className="text-[10.5px] font-mono px-2 py-1 bg-[#1a0f02] hover:bg-orange-500/15 border border-orange-500/20 hover:border-orange-500/40 rounded text-orange-300 flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <BarChart className="w-2.5 h-2.5 text-amber-500" /> Open Entropy Table
                                </button>
                              )}
                              {hasBio && (
                                <button 
                                  onClick={() => setActivePanel("bio")} 
                                  className="text-[10.5px] font-mono px-2 py-1 bg-orange-500/5 hover:bg-orange-500/15 border border-orange-500/20 hover:border-orange-500/40 rounded text-orange-450 flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <Dna className="w-2.5 h-2.5 text-orange-400" /> Bio Entropy Limits
                                </button>
                              )}
                              {hasSystems && (
                                <button 
                                  onClick={() => setActivePanel("systems")} 
                                  className="text-[10.5px] font-mono px-2 py-1 bg-[#1a0f02] hover:bg-orange-500/15 border border-orange-500/20 hover:border-orange-500/40 rounded text-orange-300 flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <Compass className="w-2.5 h-2.5 text-orange-300" /> Systems Database
                                </button>
                              )}
                              {hasCalc && (
                                <button 
                                  onClick={() => setActivePanel("calc")} 
                                  className="text-[10.5px] font-mono px-2 py-1 bg-orange-500/5 hover:bg-orange-500/15 border border-orange-500/20 hover:border-orange-500/40 rounded text-orange-400 flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <Calculator className="w-2.5 h-2.5 text-orange-500" /> Launch 5D Calculator
                                </button>
                              )}
                              {hasCode && (
                                <button 
                                  onClick={() => setActivePanel("codereader")} 
                                  className="text-[10.5px] font-mono px-2 py-1 bg-[#1a0f02] hover:bg-orange-500/15 border border-orange-500/20 hover:border-orange-500/40 rounded text-orange-300 flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <FileText className="w-2.5 h-2.5 text-orange-400" /> Cast Personal Code
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* References Section */}
                        {idx > 0 && (
                          <div className="border-t border-orange-500/10 pt-2.5">
                            <p className="text-[10px] text-gray-550 font-mono uppercase mb-2 tracking-widest flex items-center gap-1.5">
                              <BookOpen className="w-3 h-3 text-orange-500" /> REFERENCES
                            </p>
                            <div className="space-y-1.5">
                              {getRelevantReferences(m.text, idx > 0 ? messages[idx - 1].text : undefined).map((ref, refIdx) => {
                                const isPeak = refIdx === 0;
                                return (
                                  <div 
                                    key={refIdx} 
                                    className={`rounded-lg p-2.5 border transition-all duration-200 text-left ${
                                      isPeak 
                                        ? "bg-gradient-to-r from-orange-950/25 via-[#1a0f02]/40 to-black border-orange-500/25 hover:border-orange-500/40 shadow-[0_0_10px_rgba(255,95,0,0.04)]" 
                                        : "bg-[#090605] border-orange-500/10 hover:border-orange-500/20"
                                    }`}
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                                      <span className="text-[11px] font-bold text-orange-300 font-serif leading-tight">
                                        {ref.title}
                                      </span>
                                      <div className="flex items-center gap-1.5">
                                        {isPeak && (
                                          <span className="text-[8.5px] font-mono px-1 py-0.5 bg-orange-500/15 text-orange-400 border border-orange-500/30 rounded font-semibold animate-pulse uppercase tracking-wider">
                                            ★ Resonates Highest ({ref.resonance}%)
                                          </span>
                                        )}
                                        {!isPeak && (
                                          <span className="text-[8.5px] font-mono text-gray-400">
                                            Resonance: {ref.resonance}%
                                          </span>
                                        )}
                                        <a 
                                          href={ref.link} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="text-[9px] font-mono px-1.5 py-0.5 bg-orange-500/10 hover:bg-orange-500/25 border border-orange-500/20 hover:border-orange-555 rounded text-orange-300 hover:text-orange-200 transition-all cursor-pointer flex items-center gap-0.5"
                                          title="Search on Google Scholar"
                                        >
                                          Scholar <ChevronRight className="w-2.5 h-2.5" />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="text-[9.5px] text-gray-500 font-mono mb-1">
                                      By {ref.authors} &nbsp;·&nbsp; {ref.source} ({ref.year})
                                    </div>
                                    <p className="text-[10px] text-[#dacbb6] leading-relaxed font-sans">
                                      {ref.description}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {typing && (
              <div className="flex justify-start items-center gap-3">
                <div className="bg-[#050302] border border-orange-500/30 border-l-4 border-l-orange-550 rounded-xl p-4 max-w-[80%] flex items-center gap-3 shadow-[0_0_15px_rgba(255,106,0,0.12)]">
                  <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[10.5px] text-orange-400 uppercase tracking-widest font-semibold animate-pulse">Metemphysics Formulating Transmission</span>
                    <span className="text-[11.5px] text-gray-400 font-mono mt-0.5">Calculating dΩ/dt state entropy variables...</span>
                  </div>
                </div>
                <button
                  onClick={handleCancelTransmission}
                  className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 hover:border-red-500/60 rounded-xl text-[10.5px] font-mono uppercase tracking-widest transition-all font-bold cursor-pointer flex items-center gap-1 shadow-md hover:scale-105 active:scale-95"
                  title="Abort active server transmission"
                >
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                  Abort
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Throttle Warning Alert */}
          {throttleWarning && (
            <div className="px-4 py-2 bg-orange-500/5 border-t border-orange-500/20 flex items-center gap-2 text-amber-400 font-mono text-[10.5px] uppercase tracking-wider animate-pulse">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
              <span>{throttleWarning}</span>
            </div>
          )}

          {/* Terminal Input Bar */}
          <div className="p-3 sm:p-4 border-t border-orange-500/25 bg-black rounded-b-xl flex gap-2 sm:gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.5)] flex-shrink-0">
            <button
              disabled={typing}
              onClick={() => !typing && handleResetChat()}
              title={typing ? "Transmission active — reset disabled" : "Reset and clear chat to original welcoming state"}
              className="px-2.5 sm:px-3 py-2.5 sm:py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-orange-500/35 hover:border-orange-500/60 rounded-xl transition-all duration-200 flex items-center justify-center shadow-[0_0_10px_rgba(255,95,0,0.055)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-orange-500/10 disabled:hover:text-orange-400 disabled:border-orange-500/20 disabled:scale-100 cursor-pointer active:scale-95 flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <input
              type="text"
              disabled={typing || isInputLimitReached}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !typing && !isInputLimitReached) handleSendMessage(); }}
              placeholder={
                isInputLimitReached 
                  ? "SYSTEM LIMIT: 25 inputs reached. Reset chat session to clear/save."
                  : typing 
                  ? "Metemphysics is formulating its response..." 
                  : "Ask Metemphysics or query any physical-consciousness transition..."
              }
              className="flex-1 min-w-0 bg-[#0a0a0a50] border border-orange-500/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none text-[#eeeae4] focus:border-orange-500/60 font-serif shadow-inner placeholder-gray-650 transition-all focus:bg-[#0c0c0c] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              disabled={typing || isInputLimitReached}
              onClick={() => !typing && !isInputLimitReached && handleSendMessage()}
              className="bg-gradient-to-r from-orange-600 to-amber-600 border border-orange-500/60 hover:from-orange-500 hover:to-amber-500 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono tracking-widest font-bold text-black flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer uppercase transition-all duration-300 transform active:scale-95 shadow-[0_0_12px_rgba(255,95,0,0.2)] disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-black" />
              <span className="hidden xs:inline">Transmit</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: SYSTEMS LAB MENU SLIDER (GRID 3) */}
        <div 
          className={`lg:col-span-3 flex flex-col bg-black border lg:h-[calc(100vh-195px)] lg:min-h-[750px] lg:overflow-visible lg:p-4 rounded-xl transition-all duration-300 relative select-none ${
            isMobileSystemsExpanded 
              ? "h-auto p-4 shadow-[0_0_25px_rgba(255,95,0,0.12)] border-orange-500/50" 
              : "h-[54px] p-0 overflow-hidden border-orange-500/25 shadow-[0_0_20px_rgba(212,175,55,0.06)]"
          }`}
        >
          
          {/* ALWAYS VISIBLE MOBILE/TABLET HEADER BAR (TOC STYLE) FOR SYSTEMS LAB */}
          <div 
            onClick={() => setIsMobileSystemsExpanded(!isMobileSystemsExpanded)}
            className="lg:hidden flex items-center justify-between p-4 bg-[#080808] border-b border-orange-500/20 cursor-pointer hover:bg-orange-950/15 active:bg-orange-950/25 transition-all rounded-t-xl select-none"
          >
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500 drop-shadow-[0_0_4px_rgba(255,95,0,0.5)] animate-pulse" />
              <span className="font-serif font-bold text-white text-xs tracking-widest uppercase">SYSTEMS LAB</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-orange-400 font-bold uppercase tracking-wider">
              <span>{isMobileSystemsExpanded ? "Collapse Lab" : "Expand Systems Lab"}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-orange-500 transition-transform duration-300 ${
                isMobileSystemsExpanded ? "rotate-180" : ""
              }`} />
            </div>
          </div>
          
          <div className="hidden lg:flex pb-3 border-b border-orange-500/20 mb-3 items-center justify-between flex-shrink-0">
            <div className="flex flex-col">
              <h3 className="font-serif font-bold text-white text-[11px] tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-orange-500 animate-pulse" /> SYSTEMS LAB
              </h3>
              <p className="text-[8.5px] font-mono text-gray-500 mt-0.5">Thermodynamic &amp; dynamic solvers</p>
            </div>
          </div>

          {/* Scrolling launcher list with slightly smaller buttons */}
          <div className={`flex-1 overflow-y-auto space-y-2.5 lg:space-y-0 lg:flex lg:flex-col lg:justify-between lg:h-full pr-1 custom-scroll ${
            isMobileSystemsExpanded ? "block pt-4 lg:pt-0" : "hidden lg:flex"
          }`}>
            {[
              { id: "chakra", name: "Music & Chakra Atlas", desc: "Solfeggio and H calibrations", icon: Flame, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(255,95,0,0.1)]", tip: "Acoustic calibration grid coupling natural vibration intervals (Hz), human chakra energy levels, or cognitive EEG brainwave ranges." },
              { id: "entropy", name: "Entropy Periodic Table", desc: "Molar & thermodynamic values", icon: BarChart, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(255,95,0,0.1)]", tip: "Thermodynamic reference database listing accurate molar weights, phase states, and entropy indexes (S°) across elements." },
              { id: "bio", name: "Biological Entropy Atlas", desc: "Metabolic & ecosystem limits", icon: Dna, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(255,95,0,0.1)]", tip: "A biological ledger mapping living processes such as protein synthesis, Krebs cycle, and ecosystem boundaries against dissipation limits." },
              { id: "systems", name: "All Systems Database", desc: "18 Developmental matrices", icon: Compass, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(255,95,0,0.1)]", tip: "The cosmic comparative register matching eighteen different psychological, spiritual, and moral maturation scales." },
              { id: "calc", name: "Metemphysics Calculator", desc: "6 dynamic 5D solvers", icon: Calculator, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(255,95,0,0.1)]", tip: "Multi-dimensional mathematical solvers resolving state decay, spatial boundary bounds, or time dilatation equations." },
              { id: "codereader", name: "Casting Personal Code", desc: "T × S = C dynamic calculations", icon: FileText, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(255,95,0,0.1)]", tip: "Interactive personal code caster that evaluates birthdates or custom inputs, issuing verified PDF certificates." },
              { id: "reftables", name: "References Tables DB", desc: "Constants & traditions maps", icon: Database, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(212,175,55,0.1)]", tip: "Extensive indexes grouping physical constants, historical metrics, and traditional resonance coefficients." },
              { id: "reftools", name: "Tools of References", desc: "Solfeggio synthesizer & tools", icon: Activity, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(212,175,55,0.1)]", tip: "Practical calibration utilities hosting adjustable acoustic oscillators, phase modifiers, and real-time waveform testers." },
              { id: "hawkinsprogram", name: "David Hawkins Program", desc: "Logarithmic field calibrator", icon: Cpu, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(212,175,55,0.1)]", tip: "Thermodynamic simulation modeling level of attractor fields (H-numbers) on logarithmic scale matrices." },
              { id: "celestialscale", name: "Celestial Scale (FMCS)", desc: "Cosmic Metemphysical Scales", icon: Sparkles, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(212,175,55,0.15)]", tip: "Astrophysical tracker evaluating planetary masses, stellar outputs, and Schwarzschild densities for deep space calibration." },
              { id: "numerology", name: "Numerology Scale", desc: "Number & Shape archetypes scale", icon: Hash, color: "hover:border-orange-500/60 hover:bg-orange-500/5 hover:shadow-[0_0_12px_rgba(255,106,0,0.15)]", tip: "Analytical grid using Pythagorean digit reductions (0-9) to output geometrical and archetypal descriptors." },
              { id: "knodegraph", name: "Knode Graph Routing", desc: "Linked systems topological map", icon: Network, color: "hover:border-orange-550/65 hover:bg-orange-500/5 hover:shadow-[0_0_15px_rgba(255,95,0,0.15)]", tip: "Interactive topological network system visualizer mapping discrete Knode gateways and linked semantic database associations." },
            ].sort((a, b) => a.name.localeCompare(b.name)).map((p) => {
              const IconComp = p.icon;
              const styles = getSystemsLabItemStyle(p.id);
              return (
                <div key={p.id} className="relative group/lab-item lg:flex-1 lg:flex lg:flex-col lg:justify-center">
                  <button
                    onClick={() => setActivePanel(p.id)}
                    className={`w-full bg-[#050505] p-2.5 lg:py-2.5 lg:px-3 rounded-lg border text-left transition-[#e4d9c0] duration-350 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-between shadow-[0_0_6px_rgba(255,95,0,0.01)] ${styles.borderClass}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded border flex items-center justify-center ${styles.iconBgClass} ${styles.iconBorderClass}`}>
                        <IconComp className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${styles.iconColorClass}`} />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-[10.5px] lg:text-[11px] tracking-wide line-clamp-1 ${styles.fontClass} ${styles.textColorClass}`}>{p.name}</h4>
                        <p className="text-[8.5px] lg:text-[9px] text-gray-500 font-mono truncate mt-0.5">{p.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ml-1 ${styles.chevronColor}`} />
                  </button>

                  {/* Desktop view absolute left-side tooltip */}
                  <span className={`pointer-events-none absolute right-[103%] top-1/2 -translate-y-1/2 w-52 p-2.5 bg-black/95 text-[9.5px] text-[#dacbb6] font-mono rounded opacity-0 group-hover/lab-item:opacity-100 transition-opacity duration-200 z-50 text-left leading-normal whitespace-normal break-words border hidden lg:block ${styles.tooltipBorder} ${styles.tooltipShadow}`}>
                    {p.tip}
                    <span className={`absolute left-full top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 ${styles.arrowBorder.replace("border-t-", "border-l-")}`} />
                  </span>

                  {/* Mobile view top-side tooltip */}
                  <span className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[105%] mb-1 w-48 p-2 bg-black text-[9px] text-[#dacbb6] font-mono rounded opacity-0 group-hover/lab-item:opacity-100 transition-opacity duration-200 z-50 text-center leading-normal whitespace-normal break-words border lg:hidden ${styles.tooltipBorder} ${styles.tooltipShadow}`}>
                    {p.tip}
                    <span className={`absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 ${styles.arrowBorder}`} />
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* FOOTER RAILS */}
      <footer className="border-t border-orange-500/20 bg-black px-6 py-4 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-4 mt-0">
        <a 
          href="https://metemphysics.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-orange-500 hover:text-orange-400 hover:underline transition-colors duration-200 md:flex-1 text-center md:text-left"
        >
          © 2026 Metemphysics Synthesis AI. All Rights Reserved.
        </a>

        {/* MIDDLE COLUMN FOR SAVED SESSIONS */}
        <div className="relative flex items-center gap-2 px-4 py-1.5 bg-[#0a0a0d] border border-orange-500/20 rounded-xl shadow-[0_0_15px_rgba(255,95,0,0.04)] justify-center md:flex-1">
          <div className="group relative inline-flex items-center cursor-help">
            <span className="text-orange-500 font-extrabold tracking-widest uppercase text-[10.5px] border-b border-dashed border-orange-500/40 pb-0.5">
              Chats
            </span>
            <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-[999] w-48 rounded-lg bg-[#0b0806] border border-orange-500/50 p-2.5 text-[9.5px] tracking-wide font-mono leading-tight text-amber-50 shadow-2xl text-center">
              <div>Limit of 25 Responses</div>
              <div className="mt-1 text-orange-400 border-t border-orange-500/15 pt-1 text-[8.5px] uppercase tracking-wider">Chat Imports on Reset</div>
            </span>
          </div>

          <span className="text-gray-700 select-none">|</span>

          {savedChats.length === 0 ? (
            <span className="text-gray-600 text-[10px] uppercase font-mono italic select-none">
              (No saved sessions)
            </span>
          ) : (
            <div className="relative">
              <button
                onClick={() => setChatsDropdownOpen(!chatsDropdownOpen)}
                className="bg-black border border-orange-500/25 hover:border-orange-500/60 rounded px-2.5 py-1 text-[9.5px] font-mono text-orange-400 hover:text-orange-300 outline-none cursor-pointer tracking-wide flex items-center gap-1.5 transition-all duration-200"
              >
                <span>SAVED SESSIONS ({savedChats.length}/25)</span>
                <span className={`transition-transform duration-200 ${chatsDropdownOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {chatsDropdownOpen && (
                <>
                  {/* Backdrop overlay to close when clicking outside */}
                  <div 
                    className="fixed inset-0 z-[997]" 
                    onClick={() => setChatsDropdownOpen(false)} 
                  />
                  
                  {/* Dropup list rising above footer */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[998] w-64 md:w-72 max-h-56 overflow-y-auto bg-[#0b0806] border border-orange-500/50 rounded-xl p-2 shadow-2xl custom-scroll">
                    <div className="text-[9px] font-mono font-bold text-orange-500 uppercase tracking-widest px-2 py-1 border-b border-orange-500/20 mb-1 text-center">
                      Saved Sessions Queue
                    </div>
                    {savedChats.map((chat) => (
                      <div 
                        key={chat.id} 
                        className="group/item flex items-center gap-1 px-2 py-1.5 hover:bg-orange-500/10 rounded-lg border-b border-orange-500/5 last:border-0 transition-colors"
                      >
                        {/* Delete button at the start of the text */}
                        <button
                          onClick={(e) => handleDeleteSavedChat(e, chat.id)}
                          className="group/del relative p-1 hover:bg-red-500/20 rounded transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer"
                        >
                          <X className="w-3 h-3 text-red-500/85 group-hover/del:text-red-400" />
                          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/del:block z-[999] w-12 rounded bg-black border border-red-500/50 py-0.5 text-[8px] font-mono text-center text-red-400 shadow-xl leading-none font-bold">
                            DELETE
                          </span>
                        </button>

                        {/* Chat selection link */}
                        <div
                          onClick={() => {
                            handleLoadSavedChat(chat.id);
                            setChatsDropdownOpen(false);
                          }}
                          className="flex-1 text-[10px] font-mono text-[#eeeae4] group-hover/item:text-orange-400 hover:underline cursor-pointer truncate text-left"
                        >
                          {chat.name}
                        </div>

                        {/* Timestamp */}
                        <span className="text-[8px] text-gray-600 font-mono flex-shrink-0 pl-1">
                          {chat.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 md:flex-1 justify-center md:justify-end items-center">
          <a 
            href="mailto:up2quark@gmail.com?subject=Metemphysics System Inquiry"
            className="text-[10px] tracking-widest font-mono font-bold text-gray-400 hover:text-orange-400 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-orange-500/70">✉</span> Email up2quark@gmail.com
          </a>
          <button
            onClick={downloadChatAsPDF}
            className="px-3 py-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded text-[10px] tracking-widest font-mono transition-all font-bold cursor-pointer uppercase"
          >
            Download Chat
          </button>
          <a 
            href="https://paypal.me/up2quark" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded text-[10px] tracking-widest font-mono transition-all font-bold cursor-pointer"
          >
            DONATE
          </a>
        </div>
      </footer>

      {/* MODAL LAUNCHERS FLOATING OVERLAY ENGINE */}
      {activePanel === "chakra" && (
        <ChakraPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "entropy" && (
        <EntropyPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "bio" && (
        <BioPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "systems" && (
        <SystemsPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "calc" && (
        <CalcPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "codereader" && (
        <CodeReaderPanel onClose={() => setActivePanel(null)} onLaunchChat={handleLaunchPanelFromReader} />
      )}
      {activePanel === "reftables" && (
        <RefTablesPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "reftools" && (
        <RefToolsPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "hawkinsprogram" && (
        <HawkinsProgramPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "celestialscale" && (
        <CelestialScalePanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "numerology" && (
        <NumerologyPanel onClose={() => setActivePanel(null)} onSendPrompt={handleLaunchPanelFromReader} />
      )}
      {activePanel === "knodegraph" && (
        <KnodeGraphPanel
          onClose={() => setActivePanel(null)}
          onSendPrompt={handleLaunchPanelFromReader}
          currentNodeId={currentNodeId}
          setCurrentNodeId={setCurrentNodeId}
        />
      )}

    </div>
  );
}
