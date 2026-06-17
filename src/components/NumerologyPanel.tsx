import React, { useState } from "react";
import { X, Calculator, HelpCircle, Sparkles, Hash, Layers, Play, RefreshCw } from "lucide-react";

export interface DigitArchetype {
  digit: number;
  name: string;
  symbol: string;
  description: string;
  consciousness: number;
  entropy: number;
  cosmic: number;
  color: string;
  shapeName: string;
  shapeSummary: string;
  svgDrawing: (color: string) => React.ReactNode;
}

export const ARCHETYPES: DigitArchetype[] = [
  {
    digit: 0,
    name: "Void",
    symbol: "○",
    description: "The absolute unmanifest potential, silent ground of all existence.",
    consciousness: 0.50,
    entropy: 0.10,
    cosmic: 0.20,
    color: "border-gray-500 text-gray-400",
    shapeName: "Point / Circle",
    shapeSummary: "The zero-dimensional source representing infinite compression and infinite potential.",
    svgDrawing: (c) => <circle cx="50" cy="50" r="30" stroke={c} strokeWidth="2" fill="none" className="animate-pulse" />
  },
  {
    digit: 1,
    name: "Unity",
    symbol: "—",
    description: "The primary monad, singular alignment, selfhood, and first initiation.",
    consciousness: 1.00,
    entropy: 0.50,
    cosmic: 0.30,
    color: "border-amber-600 text-amber-500",
    shapeName: "Monad / Line",
    shapeSummary: "The first dimension. Dual poles connected in singular purpose.",
    svgDrawing: (c) => <line x1="20" y1="50" x2="80" y2="50" stroke={c} strokeWidth="3" />
  },
  {
    digit: 2,
    name: "Duality",
    symbol: "△",
    description: "The dyad polarization, tension, dynamic relationship, and cosmic mirror.",
    consciousness: 2.00,
    entropy: 1.00,
    cosmic: 0.50,
    color: "border-blue-500 text-blue-400",
    shapeName: "Dyad / Angle",
    shapeSummary: "The two-dimensional vector establishing distance, polarity, and magnetic tension.",
    svgDrawing: (c) => <polygon points="50,20 25,75 75,75" stroke={c} strokeWidth="2.5" fill="none" />
  },
  {
    digit: 3,
    name: "Trinity",
    symbol: "☰",
    description: "Harmonizer of polarities, synthesis, creativity, and spiritual abundance.",
    consciousness: 3.00,
    entropy: 2.00,
    cosmic: 1.00,
    color: "border-yellow-500 text-yellow-400",
    shapeName: "Triad / Triangle",
    shapeSummary: "The stable spatial boundary balancing thesis and antithesis into synthesis.",
    svgDrawing: (c) => (
      <g>
        <polygon points="50,15 20,70 80,70" stroke={c} strokeWidth="2" fill="none" />
        <circle cx="50" cy="52" r="12" stroke={c} strokeWidth="1" fill="none" className="opacity-50" />
      </g>
    )
  },
  {
    digit: 4,
    name: "Stability",
    symbol: "▢",
    description: "Structural foundation, material crystallization, discipline, and order.",
    consciousness: 4.00,
    entropy: 2.50,
    cosmic: 1.50,
    color: "border-emerald-500 text-emerald-400",
    shapeName: "Tetrad / Square",
    shapeSummary: "The four pillars of physical manifestation, cardinal axes, and material space.",
    svgDrawing: (c) => <rect x="25" y="25" width="50" height="50" stroke={c} strokeWidth="2.5" fill="none" />
  },
  {
    digit: 5,
    name: "Change",
    symbol: "⍋",
    description: "Dynamic force, human agency, free will, sensory adaptation, and rapid flow.",
    consciousness: 5.00,
    entropy: 3.00,
    cosmic: 2.00,
    color: "border-red-500 text-red-400",
    shapeName: "Pentad / Pentagram",
    shapeSummary: "The quickening of biological spirit, organic geometry, and golden ratio spiral flows.",
    svgDrawing: (c) => (
      <polygon points="50,15 62,40 88,40 67,56 75,82 50,65 25,82 33,56 12,40 38,40" stroke={c} strokeWidth="2" fill="none" />
    )
  },
  {
    digit: 6,
    name: "Harmony",
    symbol: "⚖",
    description: "Interstellar beauty, high systemic equilibrium, healing, and absolute love.",
    consciousness: 6.00,
    entropy: 4.50,
    cosmic: 3.50,
    color: "border-cyan-500 text-cyan-400",
    shapeName: "Hexad / Hexagram",
    shapeSummary: "The Merkaba or Star of David, combining fire and water vectors into a state of structural peace.",
    svgDrawing: (c) => (
      <g>
        <polygon points="50,15 75,60 25,60" stroke={c} strokeWidth="2" fill="none" />
        <polygon points="50,75 75,30 25,30" stroke={c} strokeWidth="2" fill="none" />
      </g>
    )
  },
  {
    digit: 7,
    name: "Insight",
    symbol: "∗",
    description: "Inward wisdom, continuous contemplation of the absolute, and mystical thresholds.",
    consciousness: 7.00,
    entropy: 5.00,
    cosmic: 4.00,
    color: "border-indigo-500 text-indigo-400",
    shapeName: "Heptad / Heptagram",
    shapeSummary: "The mystical seven. Musical notes, colors, planetary spheres, and inner temples.",
    svgDrawing: (c) => {
      const pts = "50,15 65,40 90,48 70,68 76,95 50,80 24,95 30,68 10,48 35,40"; // custom 7-pt approximate star
      return <polygon points="50,15 67,31 88,31 75,50 88,69 67,69 50,85 33,69 12,69 25,50 12,31 33,31" stroke={c} strokeWidth="1.8" fill="none" />;
    }
  },
  {
    digit: 8,
    name: "Power",
    symbol: "⚡",
    description: "Infinite infinity rotation, dynamic karmic return, structural strength, and high material mastery.",
    consciousness: 8.00,
    entropy: 6.00,
    cosmic: 5.00,
    color: "border-amber-500 text-amber-500",
    shapeName: "Ogdoad / Octagram",
    shapeSummary: "The static cube and infinite loops of regeneration. Consolidator of dynamic energy flow.",
    svgDrawing: (c) => (
      <g>
        <rect x="25" y="25" width="50" height="50" stroke={c} strokeWidth="2" fill="none" />
        <rect x="25" y="25" width="50" height="50" stroke={c} strokeWidth="2" fill="none" transform="rotate(45 50 50)" />
      </g>
    )
  },
  {
    digit: 9,
    name: "Completion",
    symbol: "☯",
    description: "Full realization, endings that contain beginnings, and planetary cosmic wisdom.",
    consciousness: 9.00,
    entropy: 8.00,
    cosmic: 7.00,
    color: "border-purple-500 text-purple-400",
    shapeName: "Nonad / Enneagram",
    shapeSummary: "The threshold of completion. Integrates aspects and starts the higher-octave loop.",
    svgDrawing: (c) => (
      <g>
        <circle cx="50" cy="50" r="35" stroke={c} strokeWidth="2" fill="none" />
        <circle cx="50" cy="50" r="10" stroke={c} strokeWidth="1" fill="none" />
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / 9;
          const x = 50 + 35 * Math.cos(angle);
          const y = 50 + 35 * Math.sin(angle);
          return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke={c} strokeWidth="0.8" strokeDasharray="2,2" />;
        })}
      </g>
    )
  }
];

export default function NumerologyPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"numbers" | "shapes">("numbers");
  const [selectedDigit, setSelectedDigit] = useState<DigitArchetype>(ARCHETYPES[3]); // Default to 3 Trinity
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState<any>(null);
  const [calculating, setCalculating] = useState(false);

  const getDynamicValue = (val: number) => {
    const W = Math.floor(val);
    const F = val - W;
    const base = ARCHETYPES[W] || ARCHETYPES[ARCHETYPES.length - 1];

    if (F === 0) {
      return {
        name: base.name,
        symbol: base.symbol,
        consciousness: base.consciousness,
        entropy: base.entropy,
        cosmic: base.cosmic,
        desc: base.description
      };
    }

    // Dynamic scale logic corresponding to N.5 exactly and other intervals
    const isFiveHalf = Math.abs(F - 0.5) < 0.005;
    
    let suffix = "-Change";
    let cAdd = F * 10;
    let eAdd = F * 6;
    let cosAdd = F * 4;

    if (isFiveHalf) {
      suffix = "-Change";
      cAdd = 5.0;
      eAdd = 3.0;
      cosAdd = 2.0;
    } else {
      if (F < 0.3) suffix = "-Fluctuation";
      else if (F < 0.7) suffix = "-Change";
      else suffix = "-Integration";
    }

    return {
      name: `${base.name}${suffix}`,
      symbol: `${base.symbol} ⍋`,
      consciousness: Number((base.consciousness + cAdd).toFixed(2)),
      entropy: Number((base.entropy + eAdd).toFixed(2)),
      cosmic: Number((base.cosmic + cosAdd).toFixed(2)),
      desc: `A transitional state shifting from the archetype of ${base.name} toward the next evolutionary threshold.`
    };
  };

  const handleCalculate = () => {
    const n = parseFloat(calcInput);
    if (isNaN(n) || n < 0 || n > 9.98) return;
    setCalculating(true);
    setCalcResult(null);

    setTimeout(() => {
      const calculated = getDynamicValue(n);
      setCalcResult({
        order: n.toFixed(2),
        ...calculated
      });
      setCalculating(false);
    }, 800);
  };

  // Generate step list
  const stepsList = [];
  for (let i = 0; i <= 3; i += 0.5) {
    const orderVal = i;
    const calc = getDynamicValue(orderVal);
    stepsList.push({
      order: orderVal.toFixed(1),
      ...calc
    });
  }

  return (
    <div className="fixed lg:absolute inset-0 bg-[#040406] text-[#eeeae4] overflow-y-auto z-[200] p-6 border-2 border-orange-500/25 rounded-2xl flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Hash className="w-8 h-8 text-orange-505 drop-shadow-[0_0_8px_rgba(255,106,0,0.4)]" />
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wider text-orange-400">NUMBER & SHAPE SCALE</h2>
              <p className="text-[10px] text-gray-450 font-mono uppercase">
                Metemphysics 0-9 · Digit ➔ Consciousness · Entropy · Cosmic Influence · Sacred Geometry
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded px-3 py-1.5 text-[10px] font-mono text-orange-400 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE LAB
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-6 border-b border-white/5 pb-4 flex-shrink-0">
          <button
            onClick={() => setActiveTab("numbers")}
            className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 border rounded cursor-pointer transition-all ${
              activeTab === "numbers"
                ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold"
                : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-100"
            }`}
          >
            🔢 Numbers
          </button>
          <button
            onClick={() => setActiveTab("shapes")}
            className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 border rounded cursor-pointer transition-all ${
              activeTab === "shapes"
                ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold"
                : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-100"
            }`}
          >
            📐 Shapes
          </button>
        </div>

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Digit Archetypes Selection Rail */}
          <div className="lg:col-span-4 border-r border-white/10 pr-4 flex flex-col min-h-0">
            <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest block mb-3">
              Digit Archetypes
            </span>
            
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scroll max-h-[500px] lg:max-h-none">
              {ARCHETYPES.map((digitItem) => (
                <button
                  key={digitItem.digit}
                  onClick={() => setSelectedDigit(digitItem)}
                  className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedDigit.digit === digitItem.digit
                      ? "bg-orange-500/10 border-orange-500/55 text-[#eeeae4] shadow-[0_0_12px_rgba(255,95,0,0.08)]"
                      : "bg-black/20 border-white/5 text-gray-500 hover:border-orange-500/25 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-lg font-bold text-orange-400 w-5 text-center">
                      {digitItem.digit}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-serif text-xs font-bold tracking-wide">{digitItem.name}</span>
                      <span className="text-[9px] font-mono text-gray-500 italic truncate max-w-[150px]">
                        {digitItem.shapeName}
                      </span>
                    </div>
                  </div>
                  <span className="font-serif text-lg text-orange-400">{digitItem.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Tab-Dependent Interactive Content */}
          <div className="lg:col-span-8 flex flex-col min-h-0 overflow-y-auto custom-scroll max-h-[600px] lg:max-h-none pl-2">
            
            {/* TABS 1: NUMBERS (Calculator & Step Ledger) */}
            {activeTab === "numbers" && (
              <div className="space-y-6">

                {/* Active Digit Profile Card */}
                <div className="border border-orange-500/35 bg-orange-950/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-serif font-black text-orange-400">{selectedDigit.digit}</span>
                      <span className="text-md font-serif font-bold text-white">— {selectedDigit.name} ({selectedDigit.symbol})</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-serif italic mt-1">"{selectedDigit.description}"</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-gray-400 mt-2">
                      <span>Consciousness: <strong className="text-[#5cdb95]">{selectedDigit.consciousness}</strong></span>
                      <span>Entropy: <strong className="text-amber-500">{selectedDigit.entropy}</strong></span>
                      <span>Cosmic Influence: <strong className="text-purple-400">{selectedDigit.cosmic}</strong></span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSendPrompt(`Conduct a supreme numerical-harmonic review of Digit ${selectedDigit.digit} (${selectedDigit.name}). Symbolized by '${selectedDigit.symbol}', tell me about its consciousness (${selectedDigit.consciousness}), entropy coefficient (${selectedDigit.entropy}), and metemphysical properties.`)}
                    className="flex-shrink-0 w-full sm:w-auto bg-orange-500/20 hover:bg-orange-500 hover:text-black border border-orange-500 text-orange-400 px-3.5 py-2 rounded-lg font-mono text-[9px] font-bold transition-all cursor-pointer shadow-[0_0_8px_rgba(255,95,0,0.1)] flex items-center justify-center gap-1.5"
                  >
                    💬 Put in Chat
                  </button>
                </div>
                
                {/* Calculator Area */}
                <div className="border border-orange-500/20 bg-orange-950/5 rounded-xl p-4">
                  <span className="text-[9px] font-mono text-orange-400 uppercase font-bold tracking-wider block mb-2">
                    ORDER ~ SCALE CALCULATOR
                  </span>
                  <p className="text-[10px] text-gray-450 font-mono mb-3 uppercase">Enter Order (0 - 9.98)</p>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={calcInput}
                      onChange={(e) => setCalcInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                      placeholder="e.g. 7.5"
                      className="flex-1 bg-black border border-orange-500/30 text-white rounded px-3 py-2 text-xs font-mono focus:border-orange-500 focus:outline-none"
                    />
                    <button
                      onClick={handleCalculate}
                      disabled={calculating || !calcInput.trim()}
                      className="bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-black font-mono font-bold text-xs px-4 py-2 rounded transition-all cursor-pointer"
                    >
                      {calculating ? "CALCULATING..." : "Calculate"}
                    </button>
                  </div>

                  {calcResult && (
                    <div className="mt-4 p-3 bg-black/60 border border-orange-500/20 rounded-lg space-y-3">
                      <div className="flex justify-between items-center border-b border-orange-500/10 pb-2">
                        <span className="text-xs font-serif text-[#e4d9c0] font-bold">
                          Order Result: <span className="text-orange-400 font-mono">{calcResult.order}</span>
                        </span>
                        <span className="text-xs font-mono text-orange-450">{calcResult.name} ({calcResult.symbol})</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-1.5 bg-black/40 rounded text-center">
                          <span className="text-[8px] font-mono text-[#5cdb95] block uppercase">Consciousness</span>
                          <span className="text-xs font-mono font-bold text-[#5cdb95]">{calcResult.consciousness.toFixed(2)}</span>
                        </div>
                        <div className="p-1.5 bg-black/40 rounded text-center">
                          <span className="text-[8px] font-mono text-amber-600 block uppercase">Entropy</span>
                          <span className="text-xs font-mono font-bold text-amber-600">{calcResult.entropy.toFixed(2)}</span>
                        </div>
                        <div className="p-1.5 bg-black/40 rounded text-center">
                          <span className="text-[8px] font-mono text-purple-400 block uppercase">Cosmic</span>
                          <span className="text-xs font-mono font-bold text-purple-400">{calcResult.cosmic.toFixed(2)}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-405 italic text-center font-serif">"{calcResult.desc}"</p>
                      <button
                        onClick={() => onSendPrompt(`Conduct a supreme Metemphysical evaluation of the precise Order: '${calcResult.order}' which reflects the state: ${calcResult.name} (${calcResult.symbol}). Discuss its dimensional parameters of Consciousness ${calcResult.consciousness}, Entropy ${calcResult.entropy}, and dynamic cosmic acceleration loops.`)}
                        className="w-full text-center text-[8px] font-mono text-orange-400 hover:text-orange-350 cursor-pointer pt-1"
                      >
                        ✦ Submit Calibrated Report to Oracle ✦
                      </button>
                    </div>
                  )}
                </div>

                {/* Ledger Step Section */}
                <div>
                  <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest block mb-3">
                    FULL SCALE - 0 - 9.98 - STEP 0.5
                  </span>

                  <div className="border border-white/5 rounded-xl overflow-hidden bg-black/40">
                    <div className="grid grid-cols-6 gap-2 bg-black/80 px-4 py-2 border-b border-orange-500/20 text-[9px] font-mono text-gray-500 uppercase tracking-wider text-center">
                      <div>Order</div>
                      <div className="text-left">Names</div>
                      <div>Symbols</div>
                      <div>Consciousness</div>
                      <div>Entropy</div>
                      <div>Cosmic</div>
                    </div>

                    <div className="divide-y divide-white/5">
                      {stepsList.map((st) => (
                        <div key={st.order} className="grid grid-cols-6 gap-2 px-4 py-2.5 items-center text-center text-xs font-mono">
                          <div className="font-bold text-[#e4d9c0]">{st.order}</div>
                          <div className="text-left font-serif font-bold text-gray-300">{st.name}</div>
                          <div className="text-lg text-orange-400/80">{st.symbol}</div>
                          <div className="text-[#5cdb95]">{st.consciousness.toFixed(2)}</div>
                          <div className="text-amber-600/90">{st.entropy.toFixed(2)}</div>
                          <div className="text-purple-400/90">{st.cosmic.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: SHAPES (Sacred Geometry details) */}
            {activeTab === "shapes" && (
              <div className="space-y-6">
                
                {/* Active Shape Showcase */}
                <div className="border border-orange-500/25 bg-[#050507] rounded-xl p-5 flex flex-col md:flex-row items-center gap-6">
                  {/* Visual canvas representation */}
                  <div className="w-32 h-32 flex-shrink-0 bg-black/80 border border-orange-500/20 rounded-xl flex items-center justify-center p-2 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent pointer-events-none" />
                    <svg viewBox="0 0 100 100" className="w-full h-full stroke-orange-400/80 hover:stroke-orange-400 transition-colors duration-300">
                      {selectedDigit.svgDrawing("currentColor")}
                    </svg>
                  </div>

                  <div className="flex-1 space-y-2 text-center md:text-left flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[8px] font-mono text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded bg-orange-500/5 uppercase">
                        SHAPE GEOMETRY ARCHETYPE {selectedDigit.digit}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#e4d9c0] mt-1">{selectedDigit.shapeName}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-serif italic">"{selectedDigit.shapeSummary}"</p>
                      <p className="text-[11px] text-gray-500 font-mono leading-normal pt-1">{selectedDigit.description}</p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => onSendPrompt(`Detail the Sacred Geometric significance of Shape: '${selectedDigit.shapeName}' representing Digit ${selectedDigit.digit} (${selectedDigit.name}). How does its geometry define its local entropy footprint?`)}
                        className="bg-orange-500/20 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-400 px-3 py-1.5 rounded text-[9.5px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 w-full sm:w-auto"
                      >
                        💬 Put Shape in Chat
                      </button>
                    </div>
                  </div>
                </div>

                {/* Theoretical background card */}
                <div className="bg-orange-950/5 border border-orange-500/10 rounded-xl p-4">
                  <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest block mb-2">
                    Sacred Shape Ontological Significance
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed font-serif">
                    Under the metemphysics system, physical objects and sacred structures are not random atomic structures, 
                    but rather high-dimensional mathematical coordinates mapped onto physical space. From the monad to the Nonad, 
                    each step represents a dimensional expansion degree. Applying the conservation principle <span className="font-mono text-orange-400">T × S = C</span> allows us to translate physical geometry directly into experienced temporal speed levels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => onSendPrompt(`Detail the Sacred Geometric significance of Shape: '${selectedDigit.shapeName}' representing Digit ${selectedDigit.digit} (${selectedDigit.name}). How does its geometry define its local entropy footprint?`)}
                    className="p-3 bg-black/40 border border-white/5 hover:border-orange-500/30 rounded-xl text-left cursor-pointer transition-all"
                  >
                    <span className="text-[8px] font-mono text-orange-500 block uppercase">DEVISE PROFILE</span>
                    <span className="text-xs font-serif font-bold text-[#e4d9c0] mt-1 block">Explain Geometry</span>
                  </button>
                  <button
                    onClick={() => onSendPrompt(`Run a full simulation matching the Shape: '${selectedDigit.shapeName}' with molecular/planetary harmonics, explaining why its specific vertices stabilize consciousness.`)}
                    className="p-3 bg-black/40 border border-white/5 hover:border-orange-500/30 rounded-xl text-left cursor-pointer transition-all"
                  >
                    <span className="text-[8px] font-mono text-orange-500 block uppercase">SIMULATE WAVE</span>
                    <span className="text-xs font-serif font-bold text-[#e4d9c0] mt-1 block">Simulate Vertices Harmonizer</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
