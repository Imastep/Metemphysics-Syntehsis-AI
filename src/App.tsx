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
  RefreshCw,
  Info,
  Database,
  Activity,
  Cpu,
  RotateCcw,
  Hash
} from "lucide-react";
import { METEM_DB, GRAPH } from "./data/metemDb";
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
  { label: "T × S = C Axiom Proof", query: "What is the absolute proof and physical significance of the fundamental Metemphysics law T × S = C?", icon: Flame, color: "hover:border-orange-500/60 hover:text-orange-400 font-bold" },
  { label: "Entropy S = C / T", query: "How is calculated molar entropy derived using S = C / T under standard and cosmic light parameters?", icon: Atom, color: "hover:border-amber-500/60 hover:text-amber-300 font-bold" }
];

const getDynamicSuggestions = (lastModelText: string) => {
  const text = lastModelText.toLowerCase();
  
  if (text.includes("chakra") || text.includes("solfeggio") || text.includes("hz") || text.includes("vibration") || text.includes("anahata")) {
    return [
      { label: "Ajna H-Calibration", query: "Explain the Solfeggio calibration for Ajna and the H-calibration parameter.", icon: Flame, color: "hover:border-orange-500/50 hover:text-orange-400" },
      { label: "Frequency of Love (528Hz)", query: "Detail the high-coherence H-value of 528 Hz vibration under T × S = C.", icon: Sparkles, color: "hover:border-amber-500/50 hover:text-amber-400" }
    ];
  }
  if (text.includes("entropy") || text.includes("molar") || text.includes("thermodynamic") || text.includes("boltzmann")) {
    return [
      { label: "Bio S° Limits", query: "What are the molecular molar entropy limits in cellular life?", icon: Dna, color: "hover:border-orange-500/50 hover:text-orange-355" },
      { label: "Boltzmann Scaling", query: "How does the Boltzmann constant scale under the cosmic wave C constant?", icon: Atom, color: "hover:border-amber-500/50 hover:text-amber-300" }
    ];
  }
  if (text.includes("bio") || text.includes("metabolic") || text.includes("life") || text.includes("ecosystem") || text.includes("cellular")) {
    return [
      { label: "Mitochondrial dΩ/dt", query: "Analyze the dΩ/dt throughput within human mitochondrial respiration.", icon: Dna, color: "hover:border-orange-500/50 hover:text-orange-400" },
      { label: "Biosphere S-Molar Boundaries", query: "Compare the carbon-based molar entropy of biosystem boundaries.", icon: BarChart, color: "hover:border-amber-500/50 hover:text-amber-400" }
    ];
  }
  if (text.includes("system") || text.includes("aurobindo") || text.includes("wilber") || text.includes("developmental")) {
    return [
      { label: "Ken Wilber 4-Quadrants", query: "Map Ken Wilber's Quadrants to thermodynamic state entropy.", icon: Compass, color: "hover:border-orange-550/50 hover:text-orange-350" },
      { label: "Supermind Evolution", query: "How does Sri Aurobindo's 'Supermind' relate to thermodynamic state limits?", icon: Sparkles, color: "hover:border-amber-550/50 hover:text-amber-300" }
    ];
  }
  if (text.includes("hawkins") || text.includes("attractor") || text.includes("calibrat")) {
    return [
      { label: "Calibrating Joy (540)", query: "Analyze the thermodynamic characteristics of Hawkins Logarithmic field 540.", icon: Cpu, color: "hover:border-orange-500/50 hover:text-orange-350" },
      { label: "Integrity Inversion Point (200)", query: "Why is the critical threshold of 200 in Hawkins Map the absolute entropy inversion point?", icon: Activity, color: "hover:border-amber-500/50 hover:text-amber-300" }
    ];
  }
  if (text.includes("calc") || text.includes("solver") || text.includes("equation") || text.includes("c_light")) {
    return [
      { label: "Planck normalized S", query: "Under Planck normalized constant C = 1, prove that T = 1 / S.", icon: Calculator, color: "hover:border-orange-500/50 hover:text-orange-400" },
      { label: "Eudaimonia dΩ/dt", query: "Describe the specific physical formula of dynamic daily eudaimonia dΩ/dt.", icon: Sparkles, color: "hover:border-amber-500/50 hover:text-amber-400" }
    ];
  }

  return [
    { label: "Eudaimonia dΩ/dt Limit", query: "How does dΩ/dt impact daily eudaimonia?", icon: Atom, color: "hover:border-orange-500/50 hover:text-orange-450" },
    { label: "Physical-Consciousness Dual", query: "State the mathematical and thermodynamic proof connecting time duration T and state entropy S under T × S = C.", icon: Activity, color: "hover:border-amber-500/50 hover:text-amber-400" }
  ];
};

function cleanMathText(text: string): string {
  if (!text) return "";
  let s = text;
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

const METEM_GLOSSARY: { wordReg: RegExp; key: string; hoverStyle?: string; tip: string }[] = [
  {
    wordReg: /(\bt\s*×\s*s\s*=\s*c\b|\bt\s*[*x]\s*s\s*=\s*c\b)/i,
    key: "txsc",
    tip: "Axiom Proof Formula: Experienced Time (T) × Structural Entropy (S) = Speed of Light Constant (C). Governs state conservation balances."
  },
  {
    wordReg: /(\bentropy\b|\bentropies\b)/i,
    key: "entropy",
    tip: "Thermodynamic / informational metric of microstate chaos/randomness. In T×S=C, structural or chemical entropy is conserved against time."
  },
  {
    wordReg: /(\bomega\b|\bomega-matrix\b|[\u03A9\u03C9])/i,
    key: "omega",
    tip: "Integrated frequency indicator (Ω) scaling from 0 to 999. High Omega indicates deep spiritual, cognitive & harmonic coherence."
  },
  {
    wordReg: /(\bj\/s\b|\bjoules?\s+per\s+seconds?\b)/i,
    key: "js",
    tip: "Joule-seconds (J/S) representing thermodynamic energy-information transduction rate intensity supporting high-level attractors."
  },
  {
    wordReg: /(\bknodes?\b)/i,
    key: "knode",
    tip: "Resonant nodes in the multidimensional energy network. Portals of field energy and informational transduction."
  },
  {
    wordReg: /(\bsolfeggio\b)/i,
    key: "solfeggio",
    tip: "Acoustic scale (e.g. 396Hz, 528Hz, 963Hz) mimicking ancient sound frequencies believed to hold specific biological & systemic resonance."
  },
  {
    wordReg: /(\bplanck\b)/i,
    key: "planck",
    tip: "Planck constant/limits. The minimal quantization spacing of physics, denoting the pixelated boundaries of physical reality."
  },
  {
    wordReg: /(\bhawkins\b)/i,
    key: "hawkins",
    tip: "Scale of Consciousness (1 to 1000) charted by Dr. David R. Hawkins, corresponding direct attractor energy levels."
  },
];

function renderKeywordsWithTooltips(text: string): React.ReactNode[] | string {
  let tokens: { text: string; isKeyword: boolean; tip?: string }[] = [{ text, isKeyword: false }];
  
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
          nextTokens.push({ text: part, isKeyword: true, tip: item.tip });
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
      return (
        <span 
          key={idx} 
          className="relative group/tooltip inline cursor-help border-b border-dotted border-orange-500/80 text-orange-400 font-medium"
        >
          {t.text}
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-[#0c0603] border border-orange-500/40 text-[10px] text-[#e5dbcb] rounded shadow-[0_0_15px_rgba(255,95,0,0.3)] font-mono opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 z-50 text-center leading-normal whitespace-normal break-words normal-case">
            {t.tip}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-orange-500/40" />
          </span>
        </span>
      );
    }
    return t.text;
  });
}

function renderFormattedInlines(inlineText: string) {
  const parts: React.ReactNode[] = [];
  let currentText = cleanMathText(inlineText);
  let idxCounter = 0;

  while (currentText.length > 0 && idxCounter < 100) {
    idxCounter++;
    
    // We search for math, bold, brackets, code
    const mathMatch = currentText.match(/\$([^$]+)\$/);
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
          {matchedValue}
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
    prompt: "What is the neuroscience support for Nondual States of consciousness under the Oracle's ledger? Explain the mutual information capacity in brainwave states."
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
        text: "Welcome, seeker, to the Metemphysics Synthesis AI. Here we map the ultimate, absolute conservation constraints of consciousness, experienced time, and structural entropy through the law T × S = C (Time multiplied by Entropy = Speed of Light). Explore the dynamic reference ledgers to the left, activate a dynamic solver to the right, or consult the Oracle directly in this terminal."
      }
    ];
  });
  const [inputText, setInputText] = useState("");
  const [currentNodeId, setCurrentNodeId] = useState<string>("greeting");
  const [typing, setTyping] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  // Sync up to 25 chat responses to Local Storage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("metemphysics_chat_responses", JSON.stringify(messages.slice(-25)));
    } else {
      localStorage.removeItem("metemphysics_chat_responses");
    }
  }, [messages]);

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
        text: "Welcome, seeker, to the Metemphysics Synthesis AI. Here we map the ultimate, absolute conservation constraints of consciousness, experienced time, and structural entropy through the law T × S = C (Time multiplied by Entropy = Speed of Light). Explore the dynamic reference ledgers to the left, activate a dynamic solver to the right, or consult the Oracle directly in this terminal."
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
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
      const PW = 215.9, PH = 279.4, ML = 18, MR = 18, MT = 18, MB = 18, CW = PW - ML - MR;
      let y = MT;

      const drawPageDecorations = (pageNum: number) => {
        // Deep Obsidian background
        doc.setFillColor(5, 5, 5);
        doc.rect(0, 0, PW, PH, "F");

        // Orange light border
        doc.setDrawColor(249, 115, 22);
        doc.setLineWidth(0.35);
        doc.rect(5, 5, PW - 10, PH - 10, "S");

        // Footer standard brand text
        doc.setFont("Times", "Italic");
        doc.setFontSize(8);
        doc.setTextColor(160, 150, 140);
        doc.text(`Page ${pageNum}  |  Metemphysics Unified Interface Chat Transcript  |  All Rights Conserved`, PW / 2, PH - 8, { align: "center" });
      };

      let pageNum = 1;
      drawPageDecorations(pageNum);

      // Title
      doc.setFont("Times", "BoldItalic");
      doc.setFontSize(16);
      doc.setTextColor(249, 115, 22);
      doc.text("✦ Metemphysics Chat Log Transcript ✦", PW / 2, y, { align: "center" });
      y += 10;

      doc.setFont("Times", "Roman");
      doc.setFontSize(9);
      doc.setTextColor(150, 145, 135);
      doc.text(`Generated: ${new Date().toLocaleString()}  |  Active Calibration constraints: C = ${conservedLimit.toUpperCase()}`, ML, y);
      y += 5;
      
      doc.setDrawColor(249, 115, 22);
      doc.setLineWidth(0.2);
      doc.line(ML, y, PW - MR, y);
      y += 8;

      messages.forEach((msg) => {
        // Safe check for vertical space for message header
        if (y > PH - MB - 20) {
          doc.addPage();
          pageNum++;
          y = MT;
          drawPageDecorations(pageNum);
        }

        // Header
        doc.setFont("Times", "Bold");
        doc.setFontSize(10.5);
        if (msg.role === "user") {
          doc.setTextColor(255, 255, 255);
          doc.text(`✦ SEEKER (User):`, ML, y);
        } else {
          doc.setTextColor(201, 168, 108); // Goldish text
          doc.text(`◈ UNIFIED FIELD (Oracle):`, ML, y);
        }
        y += 5.5;

        // Content
        doc.setFont("Times", "Roman");
        doc.setFontSize(9.5);
        doc.setTextColor(230, 225, 215);

        // Sanitize out markdown tags for a clean elegant printout
        const cleanText = msg.text
          .replace(/\*\*/g, "") // Bold
          .replace(/\*/g, "")  // Italic
          .replace(/`/g, "")   // Inline Code
          .replace(/####/g, "")
          .replace(/###/g, "")
          .replace(/##/g, "")
          .replace(/#/g, "");

        const splitLines = doc.splitTextToSize(cleanText, CW);
        
        splitLines.forEach((line: string) => {
          if (y > PH - MB - 10) {
            doc.addPage();
            pageNum++;
            y = MT;
            drawPageDecorations(pageNum);
          }
          doc.text(line, ML, y);
          y += 5;
        });

        y += 5.5; // spacing between messages
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
    <div className="min-h-screen bg-[#050505] text-[#eeeae4] flex flex-col font-sans selection:bg-[#ff5f00]/30 selection:text-white">
      
      {/* GLOWING AMBIENT TOPHEADER */}
      <header className="border-b-2 border-orange-500/30 bg-black shadow-[0_4px_30px_rgba(255,95,0,0.12)] sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-amber-950/40 shadow-[0_0_15px_rgba(255,95,0,0.25)]">
            <Atom className="w-5 h-5 text-orange-500 animate-spin-slow" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
            </span>
          </div>
        </div>

        {/* Dynamic State Rails & Settings Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0c] border border-orange-500/35 rounded shadow-[0_0_10px_rgba(255,106,0,0.05)]">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tight">Oracle Cog:</span>
            <select
              value={studioMode}
              onChange={(e) => {
                const nMode = e.target.value;
                setStudioMode(nMode);
                handleSendMessage(`Switching dynamic Oracle calibration mode to: ${nMode.toUpperCase()}`);
              }}
              className="bg-transparent text-orange-400 font-mono text-[9px] uppercase font-bold outline-none cursor-pointer p-0.5"
            >
              <option value="omniscient" className="bg-black text-orange-400">Omniscient Mode</option>
              <option value="socratic" className="bg-black text-orange-400">Socratic Guide</option>
              <option value="strict_calc" className="bg-black text-orange-400">Strict Calculator</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-black border border-gray-800 font-mono text-[9px] rounded">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-gray-400 uppercase font-bold">{offlineMode ? "Local Backup" : "Omniscient Active"}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-none p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT COLUMN: PRIMARY DYNAMIC DIRECTORY (GRID 3) */}
        <div className="lg:col-span-3 flex flex-col lg:h-[calc(100vh-195px)] lg:min-h-[750px] h-auto bg-black border border-orange-500/25 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.06)] relative">
          
          {/* Tab Selection Row */}
          <div className="flex border-b border-orange-500/25 bg-[#080808] rounded-t-xl overflow-hidden">
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
          <div className="flex-1 p-5 overflow-y-auto flex flex-col custom-scroll">
            
            {/* TAB 1: ONTOLOGY DIRECTORY */}
            {sidebarTab === "ontology" && (
              <div className="flex-1 flex flex-col h-full">
                <div className="flex items-center justify-between pb-3 border-b border-orange-500/20 mb-3">
                  <div className="relative group/synthesis-title flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-white text-xs tracking-wider flex items-center gap-2 cursor-help">
                      <BookOpen className="w-4 h-4 text-orange-500 drop-shadow-[0_0_4px_rgba(255,95,0,0.4)]" /> SYNTHESIS
                    </h3>
                    {/* Tooltip for the overall Synthesis Table */}
                    <span className="pointer-events-none absolute left-0 top-full mt-2 w-64 p-2.5 bg-[#090503]/95 border border-orange-500/40 text-[9.5px] text-[#dacbb6] font-mono rounded shadow-[0_0_15px_rgba(255,95,0,0.35)] opacity-0 group-hover/synthesis-title:opacity-100 transition-opacity duration-200 z-50 text-left leading-relaxed">
                      <strong className="text-orange-400 block mb-1 font-serif uppercase tracking-wider">Unified Synthesis Engine</strong>
                      An integrated cross-disciplinary database pairing human sciences, spiritual traditions, evolutionary models, and constants under absolute T × S = C thermodynamic limits.
                      <span className="absolute top-[-4px] left-8 border-x-4 border-x-transparent border-b-4 border-b-orange-500/40" />
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-orange-500 uppercase tracking-widest bg-orange-500/10 px-1 py-0.5 rounded border border-orange-500/20">METEM_DB v14.0</span>
                </div>

                {/* Category Toggle */}
                <div className="grid grid-cols-5 gap-1 mb-3">
                  {(["science", "religions", "discoveries", "systems", "formulas"] as const).map((cat) => (
                    <button
                      key={cat}
                      disabled={typing}
                      onClick={() => setSelectedDbCategory(cat)}
                      className={`py-1 rounded text-[9px] font-mono uppercase border transition-all cursor-pointer text-center ${
                        selectedDbCategory === cat
                           ? "bg-orange-500/15 border-orange-500/60 text-orange-400 font-bold shadow-[0_0_8px_rgba(255,106,0,0.15)]"
                           : "border-transparent text-gray-500 hover:text-[#eeeae4] hover:bg-white/5"
                      } ${typing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {cat === "religions" ? "tradition" : cat === "formulas" ? "formula" : cat}
                    </button>
                  ))}
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
                  {filteredItems.map((item) => (
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
                      className={`group bg-[#040404] border border-orange-500/15 hover:border-orange-500/50 rounded p-2.5 cursor-pointer transition-all hover:bg-orange-950/10 shadow-[0_0_10px_rgba(255,95,0,0.02)] hover:shadow-[0_0_15px_rgba(212,175,55,0.06)] ${
                        typing ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-xs text-[#e4d9c0] group-hover:text-orange-400 transition-colors tracking-wide">{item.name}</span>
                          {item.omegaVal && (
                            <span className="text-[9px] font-mono text-[#c9a84c] font-bold tracking-wider mt-0.5">{item.omegaVal}</span>
                          )}
                        </div>
                        {/* Interactive Tooltip on the category / subcategory tags */}
                        <span className="relative group/tag inline-block">
                          <span className="text-[8px] font-mono text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded bg-orange-500/5 uppercase cursor-help hover:bg-orange-500/10 transition-colors">
                            {item.subcategory}
                          </span>
                          <span className="pointer-events-none absolute right-0 bottom-full mb-1.5 w-52 p-2.5 bg-black border border-orange-500/40 text-[9.5px] text-[#dacbb6] font-mono rounded shadow-[0_0_12px_rgba(255,95,0,0.25)] opacity-0 group-hover/tag:opacity-100 transition-opacity duration-200 z-50 text-right leading-normal">
                            Classification: <strong className="text-orange-400 uppercase font-bold">{selectedDbCategory === "religions" ? "Tradition" : selectedDbCategory === "formulas" ? "Formula" : selectedDbCategory}</strong>. Integrated calibration index value: <strong className="text-amber-400">{item.omegaVal || "Ω = Dynamic"}</strong>.
                            <span className="absolute bottom-[-4px] right-4 border-x-4 border-x-transparent border-t-4 border-t-orange-500/40" />
                          </span>
                        </span>
                      </div>
                      <p className="text-[11px] text-[#afbbc9] mt-1 line-clamp-2 leading-relaxed font-serif italic">{item.summary}</p>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-orange-500/5">
                        <div className="flex flex-wrap gap-1">
                          {item.concepts.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="bg-orange-950/10 px-1 py-0.5 rounded text-[8px] font-mono text-amber-500/70 border border-orange-500/5">
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
                  ))}
                  {filteredItems.length === 0 && (
                    <div className="text-center text-xs text-gray-500 pt-6 font-mono">No matching records found.</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: J/S RESONANCE MATRIX */}
            {sidebarTab === "states" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-orange-500/20">
                  <h3 className="font-serif font-bold text-white text-xs tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-orange-500 drop-shadow-[0_0_4px_rgba(255,95,0,0.4)]" /> J/S RESONANCE STATES MATRIX
                  </h3>
                  <p className="text-[9px] font-mono text-amber-400/80 mt-1 uppercase tracking-wide">Consciousness calibration ranges (Entropy ratios)</p>
                </div>

                <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 custom-scroll">
                  {[
                    { label: "REVELATION", range: "J/S ≥ 949", desc: "Absolute timeless communion, Crown Sahasrara union with C.", color: "border-purple-500/40 text-purple-300 bg-purple-950/10 shadow-[0_0_10px_rgba(168,85,247,0.05)]", query: "Can you detail the state of REVELATION at J/S >= 949?", hawkins: "Enlightenment (H=1000)" },
                    { label: "NEAR TIMELESS", range: "J/S [99, 949)", desc: "Hyper-coherent order. High self-organizing scale.", color: "border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-950/10 shadow-[0_0_10px_rgba(217,70,239,0.05)]", query: "Can you detail the state of NEAR TIMELESS at J/S [99, 949)?", hawkins: "High Enlightenment range (H=700-999)" },
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
              <div className="space-y-4">
                <div className="pb-3 border-b border-orange-500/20">
                  <h3 className="font-serif font-bold text-white text-xs tracking-wider flex items-center gap-2">
                    <Atom className="w-4 h-4 text-orange-550" /> HARMONICS &amp; COHERENCE SPECS
                  </h3>
                  <p className="text-[9px] font-mono text-gray-450 mt-1">Solfeggio frequencies, vibrations and critical elemental molar S°</p>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 custom-scroll">
                  {/* Solfeggio Section */}
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-semibold border-b border-orange-500/10 pb-1">Solfeggio Vibrations</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { hz: "174 Hz", chakra: "Earth Foundation", js: "J/S = -0.150", query: "Explain properties of 174 Hz Solfeggio scale with -0.150 J/S." },
                        { hz: "285 Hz", chakra: "Tissue Calibration", js: "J/S = -0.050", query: "Explain properties of 285 Hz Solfeggio scale with -0.050 J/S." },
                        { hz: "396 Hz", chakra: "Muladhara (Root)", js: "J/S = 0.00", query: "Discuss standard molar properties of 396 Hz Muladhara foundational base." },
                        { hz: "417 Hz", chakra: "Svadhisthana (Sacral)", js: "J/S = 9.49e-5", query: "Explain properties of 417 Hz Solfeggio scale with 9.49e-5 J/S." },
                        { hz: "528 Hz", chakra: "Manipura (Solar Plexus)", js: "J/S = 0.01", query: "Discuss standard molar properties of 528 Hz Manipura solar plexus, miracle tone." },
                        { hz: "639 Hz", chakra: "Anahata (Heart)", js: "J/S = 0.99", query: "Discuss standard molar properties of 639 Hz Anahata heart chakra communion frequency." },
                        { hz: "741 Hz", chakra: "Vishuddha (Throat)", js: "J/S = 7.414", query: "Explain properties of 741 Hz Solfeggio scale with 7.414 J/S." },
                        { hz: "852 Hz", chakra: "Ajna (Third Eye)", js: "J/S = 35.353", query: "Explain properties of 852 Hz Solfeggio scale with 35.353 J/S." },
                        { hz: "963 Hz", chakra: "Sahasrara (Crown)", js: "J/S = 949.00", query: "Discuss standard molar properties of 963 Hz Sahasrara crown direct cosmic link." }
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
        <div className="lg:col-span-6 flex flex-col lg:h-[calc(100vh-195px)] lg:min-h-[750px] h-[550px] bg-black border-2 border-orange-500/25 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.08)] relative">
          
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
              <span className="font-mono text-[10px] text-gray-500 hidden md:inline">FREQ: 949 HZ</span>
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
                    className={`max-w-[90%] rounded-xl p-4 shadow-lg transition-all duration-300 ${
                      isUser
                        ? "bg-gradient-to-br from-orange-950/20 via-[#150a00]/70 to-black border border-orange-500/40 text-[#eeeae4] shadow-[0_0_12px_rgba(255,95,0,0.08)]"
                        : "bg-[#0b0705] border border-orange-500/15 border-l-4 border-l-orange-500 text-[#dcd7cb] shadow-[0_0_15px_rgba(212,175,55,0.05)]"
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
                        <span>Metemphysics Oracle Console</span>
                        <span className="text-gray-600">·</span>
                        <span className="text-gray-400">Coherence: 94.9%</span>
                        <span className="ml-auto text-orange-500 font-bold">Ω-Matrix Calibrated</span>
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
                    {!isUser && (hasChakra || hasEntropy || hasBio || hasSystems || hasCalc || hasCode) && (
                      <div className="mt-4 pt-2.5 border-t border-orange-500/15">
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
                  </div>
                </div>
              );
            })}
            {typing && (
              <div className="flex justify-start items-center gap-3">
                <div className="bg-[#050302] border border-orange-500/30 border-l-4 border-l-orange-550 rounded-xl p-4 max-w-[80%] flex items-center gap-3 shadow-[0_0_15px_rgba(255,106,0,0.12)]">
                  <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[10.5px] text-orange-400 uppercase tracking-widest font-semibold animate-pulse">Oracle Formulating Transmission</span>
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

          {/* Unique Suggestion Panel with Icons & Categorized Query Triggers */}
          <div className="px-4 py-2.5 border-t border-orange-500/20 bg-[#060606] flex flex-wrap gap-1.5 items-center flex-shrink-0">
            <span className="text-[11px] font-mono text-orange-450 uppercase tracking-widest mr-2 select-none border-r border-[#ff5f00]/15 pr-2 hidden md:inline">Suggested Queries:</span>
            {(() => {
              const lastModelMsg = [...messages].reverse().find((m) => m.role === "model");
              const dynamicSuggestions = lastModelMsg ? getDynamicSuggestions(lastModelMsg.text) : [];
              return [...firstQueries, ...dynamicSuggestions];
            })().map((chip) => {
              const Icon = chip.icon;
              return (
                <button
                  key={chip.label}
                  disabled={typing}
                  onClick={() => !typing && handleSendMessage(chip.query)}
                  className={`px-2.5 py-1 bg-black text-[10.5px] font-mono rounded-lg cursor-pointer transition-all border border-orange-500/15 flex items-center gap-1.5 ${chip.color} ${
                    typing ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                  }`}
                >
                  <Icon className="w-3 h-3 text-orange-500" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Terminal Input Bar */}
          <div className="p-4 border-t border-orange-500/25 bg-black rounded-b-xl flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.5)] flex-shrink-0">
            <button
              disabled={typing}
              onClick={() => !typing && handleResetChat()}
              title={typing ? "Transmission active — reset disabled" : "Reset and clear chat to original welcoming state"}
              className="px-3 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-orange-500/35 hover:border-orange-500/60 rounded-xl transition-all duration-200 flex items-center justify-center shadow-[0_0_10px_rgba(255,95,0,0.055)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-orange-500/10 disabled:hover:text-orange-400 disabled:border-orange-500/20 disabled:scale-100 cursor-pointer active:scale-95"
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
                  ? "The Oracle is formulating its response..." 
                  : "Ask the Oracle or query any physical-consciousness transition..."
              }
              className="flex-1 bg-[#0a0a0a50] border border-orange-500/20 rounded-xl px-4 py-3 text-sm outline-none text-[#eeeae4] focus:border-orange-500/60 font-serif shadow-inner placeholder-gray-650 transition-all focus:bg-[#0c0c0c] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              disabled={typing || isInputLimitReached}
              onClick={() => !typing && !isInputLimitReached && handleSendMessage()}
              className="bg-gradient-to-r from-orange-600 to-amber-600 border border-orange-500/60 hover:from-orange-500 hover:to-amber-500 rounded-xl px-5 py-3 text-sm font-mono tracking-widest font-bold text-black flex items-center gap-2 cursor-pointer uppercase transition-all duration-300 transform active:scale-95 shadow-[0_0_12px_rgba(255,95,0,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5 text-black" /> Transmit
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: SYSTEMS LAB MENU SLIDER (GRID 3) */}
        <div className="lg:col-span-3 flex flex-col lg:h-[calc(100vh-195px)] lg:min-h-[750px] h-auto bg-black border border-orange-500/25 rounded-xl p-4 shadow-[0_0_20px_rgba(212,175,55,0.06)] relative select-none">
          
          <div className="pb-3 border-b border-orange-500/20 mb-3 flex items-center justify-between flex-shrink-0">
            <div className="flex flex-col">
              <h3 className="font-serif font-bold text-white text-[11px] tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-orange-500 animate-pulse" /> SYSTEMS LAB
              </h3>
              <p className="text-[8.5px] font-mono text-gray-500 mt-0.5">Thermodynamic &amp; dynamic solvers</p>
            </div>
            <span className="text-[7.5px] font-mono text-amber-500 uppercase tracking-widest bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">DB PRO</span>
          </div>

          {/* Scrolling launcher list with slightly smaller buttons */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scroll">
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
            ].sort((a, b) => a.name.localeCompare(b.name)).map((p) => {
              const IconComp = p.icon;
              return (
                <div key={p.id} className="relative group/lab-item">
                  <button
                    onClick={() => setActivePanel(p.id)}
                    className={`w-full bg-[#050505] p-2 rounded-lg border border-orange-500/15 text-left transition-[#e4d9c0] duration-350 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-between shadow-[0_0_6px_rgba(255,95,0,0.01)] ${p.color}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex-shrink-0 w-7 h-7 rounded bg-orange-950/15 border border-orange-500/20 flex items-center justify-center">
                        <IconComp className="w-3.5 h-3.5 text-orange-450" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-[10.5px] text-white tracking-wide line-clamp-1">{p.name}</h4>
                        <p className="text-[8.5px] text-gray-500 font-mono truncate mt-0.5">{p.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 ml-1" />
                  </button>

                  {/* Desktop view absolute left-side tooltip */}
                  <span className="pointer-events-none absolute right-[103%] top-1/2 -translate-y-1/2 w-52 p-2.5 bg-black/95 border border-orange-500/40 text-[9.5px] text-[#dacbb6] font-mono rounded shadow-[0_0_15px_rgba(255,95,0,0.3)] opacity-0 group-hover/lab-item:opacity-100 transition-opacity duration-200 z-50 text-left leading-normal whitespace-normal break-words hidden lg:block">
                    {p.tip}
                    <span className="absolute left-full top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-orange-500/40" />
                  </span>

                  {/* Mobile view top-side tooltip */}
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[105%] mb-1 w-48 p-2 bg-black border border-orange-500/45 text-[9px] text-[#dacbb6] font-mono rounded shadow-[0_0_12px_rgba(255,95,0,0.25)] opacity-0 group-hover/lab-item:opacity-100 transition-opacity duration-200 z-50 text-center leading-normal whitespace-normal break-words lg:hidden">
                    {p.tip}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-orange-500/45" />
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* FOOTER RAILS */}
      <footer className="border-t border-orange-500/20 bg-black px-6 py-4 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-4 mt-8">
        <a 
          href="https://metemphysics.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-orange-500 hover:text-orange-400 hover:underline transition-colors duration-200 md:flex-1 text-center md:text-left"
        >
          © 2026 Metemphysics Integrative Framework. All Rights Conserved.
        </a>

        {/* MIDDLE COLUMN FOR SAVED SESSIONS */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0a0a0d] border border-orange-500/20 rounded-xl shadow-[0_0_15px_rgba(255,95,0,0.04)] justify-center md:flex-1">
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
            <select
              onChange={(e) => {
                const selectedId = e.target.value;
                if (selectedId) handleLoadSavedChat(selectedId);
              }}
              value=""
              className="bg-black border border-orange-500/25 hover:border-orange-500/60 rounded px-2 py-0.5 text-[9.5px] font-mono text-orange-450 outline-none cursor-pointer tracking-wide max-w-[160px] sm:max-w-[240px] truncate"
            >
              <option value="" disabled className="text-gray-500 bg-black">-- SAVED SESSIONS ({savedChats.length}/25) --</option>
              {savedChats.map((chat) => (
                <option key={chat.id} value={chat.id} className="bg-black text-gray-300">
                  {chat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-4 md:flex-1 justify-center md:justify-end">
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

    </div>
  );
}
