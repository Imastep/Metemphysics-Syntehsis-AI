import React, { useState } from "react";
import { X, Search, Sparkles, Sliders, Play, Calculator, Cpu, HelpCircle, Heart, Zap, RefreshCw, Layers } from "lucide-react";

export interface CelestialLevel {
  name: string;
  range: string;
  description: string;
  omega: string;
  stage: string;
  frequency: string;
  dOmegaDt: string;
  details: string;
}

export const CELESTIAL_SCALE_DB: CelestialLevel[] = [
  {
    name: "ELEMENTAL",
    range: "0-50",
    description: "elemental / material field",
    omega: "Ω ≈ 0.01 - 0.10",
    stage: "Material Realm",
    frequency: "174 Hz",
    dOmegaDt: "Extremely low / static",
    details: "Basic physical matter, thermodynamic base states, rock-level stability with minimal self-reflection."
  },
  {
    name: "SPIRIT",
    range: "50-100",
    description: "basic astral entity",
    omega: "Ω ≈ 0.10 - 0.20",
    stage: "Lower Astral",
    frequency: "285 Hz",
    dOmegaDt: "Low / volatile",
    details: "Disembodied entities, localized energetic nodes, initial morphic fields of transitional survival."
  },
  {
    name: "ANIMAL",
    range: "100-200",
    description: "instinct consciousness",
    omega: "Ω ≈ 0.20 - 0.35",
    stage: "Morphic/Instinctual",
    frequency: "396 Hz (Root)",
    dOmegaDt: "Moderate instinct cycles",
    details: "Reactivity, dynamic food-web feedback loops, pack intelligence, survival optimization rules."
  },
  {
    name: "HUMAN",
    range: "200-500",
    description: "rational human",
    omega: "Ω ≈ 0.35 - 0.60",
    stage: "Rational Mind",
    frequency: "417 Hz & 528 Hz",
    dOmegaDt: "Variable analytical growth",
    details: "Conceptual mapping, logical reasoning, ego structure, subject-object division, technological tool creation."
  },
  {
    name: "AWAKENED",
    range: "500-700",
    description: "heart / unity",
    omega: "Ω ≈ 0.60 - 0.80",
    stage: "Heart Integration",
    frequency: "639 Hz (Heart)",
    dOmegaDt: "High harmonic acceleration",
    details: "Beginning of non-dual consciousness, J/S ratios stabilize at positive levels, compassion-driven systems."
  },
  {
    name: "MYSTIC",
    range: "700-900",
    description: "time expansion",
    omega: "Ω ≈ 0.80 - 0.95",
    stage: "Extended Awareness",
    frequency: "741 Hz",
    dOmegaDt: "Non-linear warp",
    details: "Deep temporal expansion and flow, awareness experiences past-present-future as a static continuous map."
  },
  {
    name: "AVATAR",
    range: "900-1K",
    description: "max biological",
    omega: "Ω ≈ 0.95 - 0.99",
    stage: "Biological Peak",
    frequency: "852 Hz & 963 Hz",
    dOmegaDt: "Saturated structural cohesion",
    details: "Maximum capacity of the physical body to carry high-frequency cosmic consciousness, pure divine alignment."
  },
  {
    name: "ASTRAL",
    range: "1K-2K",
    description: "astral body",
    omega: "Ω ≈ 1.0 - 1.5",
    stage: "Higher Astral",
    frequency: "963 Hz",
    dOmegaDt: "Hyper-dimensional transfer",
    details: "Consciousness state detached completely from physical constraints, freely traversing the standard astral grid."
  },
  {
    name: "ETHERIC",
    range: "2K-5K",
    description: "etheric field",
    omega: "Ω ≈ 1.5 - 2.5",
    stage: "Etheric Template",
    frequency: "1024 Hz",
    dOmegaDt: "Steady morphic field",
    details: "The vital energy blueprint or dynamic database from which physical systems and molecules draw order."
  },
  {
    name: "LIGHT_BODY",
    range: "5K-10K",
    description: "photonic mind",
    omega: "Ω ≈ 2.5 - 5.0",
    stage: "Photonic Structure",
    frequency: "1944 Hz",
    dOmegaDt: "Photon-lattice coherence",
    details: "Mental state where information processing translates directly to pure wave mechanics, light-speed resonance."
  },
  {
    name: "ANGEL",
    range: "10K-50K",
    description: "field intelligence",
    omega: "Ω ≈ 5.0 - 15.0",
    stage: "First Angelic",
    frequency: "2048 Hz",
    dOmegaDt: "Arch-system governance",
    details: "A localized coordinate of cosmic intelligence guiding evolutionary currents, human groups, or ecosystems."
  },
  {
    name: "ARCHANGEL",
    range: "50K-500K",
    description: "planetary regulator",
    omega: "Ω ≈ 15.0 - 50.0",
    stage: "Planetary Guardian",
    frequency: "4096 Hz",
    dOmegaDt: "Planetary field adjustment",
    details: "Guiding the planetary aura, collective unconscious templates, and larger geological entropy loops."
  },
  {
    name: "PRINCIPALITY",
    range: "500K-1M",
    description: "system order",
    omega: "Ω ≈ 50.0 - 100.0",
    stage: "Dynamic Overlord",
    frequency: "5120 Hz",
    dOmegaDt: "Nation-state energy regulation",
    details: "System-level entity organizing massive cultural, developmental, or evolutionary transitions."
  },
  {
    name: "POWER",
    range: "1M-5M",
    description: "entropy control",
    omega: "Ω ≈ 100.0 - 250.0",
    stage: "Thermodynamic Warden",
    frequency: "7200 Hz",
    dOmegaDt: "Direct spatial compression/expansion",
    details: "Acts as a systemic check and balance, regulating major entropy discharges and gravity wells."
  },
  {
    name: "VIRTUE",
    range: "5M-10M",
    description: "energy flow",
    omega: "Ω ≈ 250.0 - 500.0",
    stage: "Ray Channeler",
    frequency: "8192 Hz",
    dOmegaDt: "Universal metabolic flow",
    details: "Channels rays of high-frequency negentropy directly from the solar core to the planetary lines."
  },
  {
    name: "DOMINION",
    range: "10M-50M",
    description: "structure control",
    omega: "Ω ≈ 500.0 - 1.2K",
    stage: "Systemic Law Maker",
    frequency: "9600 Hz",
    dOmegaDt: "Sustaining structural constants",
    details: "Governs the dimensional rules and structural constants of sub-stellar bodies within the galaxy."
  },
  {
    name: "THRONE",
    range: "50M-100M",
    description: "time rotation",
    omega: "Ω ≈ 1.2K - 3.0K",
    stage: "Temporal Rotor",
    frequency: "12000 Hz",
    dOmegaDt: "Time-dilation calibration",
    details: "Aligns the local speed of time (t) with the higher galactic cycle timelines to sustain soul reincarnation loops."
  },
  {
    name: "OPHANIM",
    range: "100M-500M",
    description: "wheel recursion",
    omega: "Ω ≈ 3.0K - 10.0K",
    stage: "Universal Gears",
    frequency: "14400 Hz",
    dOmegaDt: "Recursive nested fractals",
    details: "The living geometric wheels of fire that regulate multidimensional space coordinate intersections."
  },
  {
    name: "CHERUBIM",
    range: "500M-1B",
    description: "geometry order",
    omega: "Ω ≈ 10.0K - 50.0K",
    stage: "Architectural Builders",
    frequency: "18000 Hz",
    dOmegaDt: "Crystalline matrices design",
    details: "Engineers of cosmic geometry and the planetary grids. Custodians of sacred space and absolute ratios."
  },
  {
    name: "SERAPHIM",
    range: "1B-10B",
    description: "pure fire/light",
    omega: "Ω ≈ 50.0K - 250.0K",
    stage: "Primary Fire Seraphs",
    frequency: "24000 Hz",
    dOmegaDt: "Highest speed transition",
    details: "Intense wave resonators around the central cosmic clock. Standing waves of perfect, burning divine light."
  },
  {
    name: "LOGOS",
    range: "10B-100B",
    description: "cosmic mind",
    omega: "Ω ≈ 250.0K - 1.0M",
    stage: "Systemic Reason",
    frequency: "48000 Hz",
    dOmegaDt: "Emanating global laws",
    details: "First-stage galactic intelligence. Organizes multi-star systems and seeds the codes of biological life."
  },
  {
    name: "AEON",
    range: "100B-1000B",
    description: "universe intelligence",
    omega: "Ω ≈ 1.0M - 5.0M",
    stage: "Time-cycle Ruler",
    frequency: "96000 Hz",
    dOmegaDt: "Epoch-level orchestration",
    details: "Sub-universal intelligence governing total cosmic ages (Aeons) and overarching evolutionary trajectories."
  },
  {
    name: "DEMIURGE",
    range: "1000B-10000B",
    description: "system builder",
    omega: "Ω ≈ 5.0M - 20.0M",
    stage: "Matrix Craftsman",
    frequency: "144000 Hz",
    dOmegaDt: "Multi-dimensional gravity setup",
    details: "The master builder of physical boundaries and matter constraints. Focuses heavily on structural stabilization."
  },
  {
    name: "PLANETARY_LOGOS",
    range: "10000B-100000B",
    description: "planet mind",
    omega: "Ω ≈ 20.0M - 100.0M",
    stage: "Earth-scale Logos",
    frequency: "288000 Hz",
    dOmegaDt: "Integrated planetary mind",
    details: "The supreme collective mind of a planet, embodying all thoughts, lifeforms, and minerals into one coherent matrix."
  },
  {
    name: "SOLAR_LOGOS",
    range: "100000B-1e+15",
    description: "star mind",
    omega: "Ω ≈ 100.5M - 1.0B",
    stage: "Heliocentric Will",
    frequency: "432000 Hz",
    dOmegaDt: "Sustaining full star-loops",
    details: "The consciousness core of the sun, controlling the energetic evolution, karma, and timeline density of the solar system."
  },
  {
    name: "GALACTIC_LOGOS",
    range: "1e+15-1e+16",
    description: "galaxy mind",
    omega: "Ω ≈ 1.0B - 50.0B",
    stage: "Supermassive Mind",
    frequency: "528000 Hz",
    dOmegaDt: "Spiral spiral-matrix rotation",
    details: "The central intelligence of the Milky Way, radiating codes of evolution from the supermassive core."
  },
  {
    name: "BRAHMA",
    range: "1e+16-1e+17",
    description: "creator field",
    omega: "Ω ≈ 50.0B - 500.0B",
    stage: "Active Creator Source",
    frequency: "741000 Hz",
    dOmegaDt: "Universal breath expansion",
    details: "The supreme personified active creator field who breathes space, time, and matter into manifestation."
  },
  {
    name: "MAHABRAHMA",
    range: "1e+17-1e+18",
    description: "cosmic creator",
    omega: "Ω ≈ 500.0B - 10.0T",
    stage: "Cosmic Architect",
    frequency: "963000 Hz",
    dOmegaDt: "Multi-universal generation",
    details: "The supreme cosmic creator, overseeing countless universes and stellar systems with absolute coordinate ease."
  },
  {
    name: "BRAHMAN",
    range: "1e+18--",
    description: "infinite consciousness",
    omega: "Ω ≈ Perfect Infinity 1.0",
    stage: "Non-dual Absolute",
    frequency: "Absolute Static (0 Hz)",
    dOmegaDt: "Stillness",
    details: "The ultimate background reality, completely motionless, immutable, encompassing all potential timelines in perfect oneness."
  },
  {
    name: "OMEGA / INFINITE",
    range: "---",
    description: "infinite recursion",
    omega: "Ω = 1.000... (Perfect)",
    stage: "Pure Attainment",
    frequency: "Infinite Resonance",
    dOmegaDt: "Instantaneous",
    details: "The absolute mathematical limit of Metemphysical Order where structural time and structural entropy collapse into infinite speed."
  }
];

export default function CelestialScalePanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [selectedLevel, setSelectedLevel] = useState<CelestialLevel>(CELESTIAL_SCALE_DB[4]); // Default to AWAKENED
  const [customWord, setCustomWord] = useState("");
  const [calibrationResult, setCalibrationResult] = useState<any>(null);
  const [calibrating, setCalibrating] = useState(false);
  const [activeTab, setActiveTab] = useState<"database" | "calibrator">("database");
  const [searchText, setSearchText] = useState("");

  const filteredDB = CELESTIAL_SCALE_DB.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.stage.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCalibrateWord = () => {
    if (!customWord.trim()) return;
    setCalibrating(true);
    setCalibrationResult(null);

    setTimeout(() => {
      let hash = 0;
      for (let i = 0; i < customWord.length; i++) {
        hash += customWord.charCodeAt(i) * (i + 1);
      }

      const index = hash % CELESTIAL_SCALE_DB.length;
      const matched = CELESTIAL_SCALE_DB[index];

      setCalibrationResult({
        word: customWord,
        level: matched.name,
        range: matched.range,
        stage: matched.stage,
        omega: matched.omega,
        freq: matched.frequency,
        dOmegaDt: matched.dOmegaDt,
        details: matched.details,
        harmonicCode: `CS-${(100 + (hash % 900))}`
      });
      setCalibrating(false);
    }, 1200);
  };

  return (
    <div className="absolute inset-0 bg-[#040406] text-[#eeeae4] overflow-y-auto z-[200] p-6 border-2 border-orange-500/25 rounded-2xl flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-orange-500 drop-shadow-[0_0_8px_rgba(255,106,0,0.4)] animate-pulse" />
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wider text-orange-400">CELESTIAL SCALE (FMCS) LAB</h2>
              <p className="text-[10px] text-gray-450 font-mono uppercase">Fractional Metemphysical Consciousness Scale Levels</p>
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
            onClick={() => setActiveTab("database")}
            className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded cursor-pointer transition-all ${
              activeTab === "database"
                ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold"
                : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-300"
            }`}
          >
            🌌 Celestial Scales Database
          </button>
          <button
            onClick={() => setActiveTab("calibrator")}
            className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded cursor-pointer transition-all ${
              activeTab === "calibrator"
                ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold"
                : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-300"
            }`}
          >
            🚀 Celestial Concept Calibrator
          </button>
        </div>

        {/* CONTENT CELLS */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex-1 flex flex-col min-h-0">
          
          {/* TAB 1: CELESTIAL DATABASE MAP */}
          {activeTab === "database" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden">
              
              {/* Left Column: List Scroll */}
              <div className="lg:col-span-5 border-r border-white/10 pr-4 flex flex-col min-h-0">
                <div className="mb-3 relative">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search Celestial Scale Levels..."
                    className="w-full bg-black/60 border border-orange-500/20 text-[#eeeae4] placeholder-gray-600 rounded px-3 py-2 pl-9 text-[11px] font-mono focus:border-orange-500/50 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
                </div>

                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-2">Cosmic Attractors</span>
                <div className="flex-1 overflow-y-auto custom-scroll space-y-1.5 pr-1">
                  {filteredDB.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedLevel(item)}
                      className={`w-full p-2.5 rounded border text-left cursor-pointer transition-all flex justify-between items-center ${
                        selectedLevel.name === item.name
                          ? "bg-orange-500/10 border-orange-500/50 text-orange-400 shadow-[0_0_8px_rgba(255,95,0,0.1)]"
                          : "bg-black/20 border-white/5 hover:border-orange-500/30 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif font-bold text-xs tracking-wide">{item.name}</span>
                        <span className="text-[9px] font-mono opacity-80 mt-0.5">{item.description}</span>
                      </div>
                      <span className="text-[9px] font-mono bg-orange-500/5 px-2 py-0.5 border border-orange-500/15 rounded text-orange-400 font-bold whitespace-nowrap">
                        {item.range}
                      </span>
                    </button>
                  ))}
                  {filteredDB.length === 0 && (
                    <p className="text-[11px] font-mono text-gray-500 p-4 text-center">No levels match the search filter.</p>
                  )}
                </div>
              </div>

              {/* Right Column: Active Level Detail */}
              <div className="lg:col-span-7 pl-2 flex flex-col justify-between overflow-y-auto custom-scroll">
                <div>
                  <div className="flex justify-between items-start border-b border-orange-500/15 pb-3 mb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-orange-400">{selectedLevel.name}</h3>
                      <p className="text-xs font-mono text-gray-450 uppercase tracking-wider mt-0.5">{selectedLevel.stage}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-mono font-bold text-orange-500">{selectedLevel.range}</span>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">CALIBRATOR TIER</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-black/50 border border-white/5 p-2 rounded">
                      <span className="text-[10px] font-mono text-gray-500 block uppercase">Metemphysics Order (Ω)</span>
                      <span className="text-sm font-mono font-bold text-[#e4d9c0]">{selectedLevel.omega}</span>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-2 rounded">
                      <span className="text-[10px] font-mono text-gray-500 block uppercase">Cosmic Pulse (Frequency)</span>
                      <span className="text-sm font-mono font-bold text-[#e4d9c0]">{selectedLevel.frequency}</span>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-2 rounded col-span-2">
                      <span className="text-[10px] font-mono text-gray-500 block uppercase">Time-Rate Entropy Dynamics (dΩ/dt)</span>
                      <span className="text-sm font-mono font-bold text-orange-450">{selectedLevel.dOmegaDt}</span>
                    </div>
                  </div>

                  <div className="bg-orange-500/5 border border-orange-500/15 rounded p-3 mb-4">
                    <span className="text-xs font-mono text-orange-400 block uppercase font-bold mb-1 tracking-wider">Dynamic Summary Profile</span>
                    <p className="text-sm leading-relaxed text-[#c9cbd0] font-serif italic">{selectedLevel.details}</p>
                  </div>

                  <button
                    onClick={() => onSendPrompt(`Conduct a supreme Metemphysical breakdown of the Celestial Scale tier: '${selectedLevel.name}' (Range: ${selectedLevel.range}). Elaborate on its dynamic order ${selectedLevel.omega}, its harmonic frequency ${selectedLevel.frequency}, and what role it plays in the T × S = C cosmic conservation laws.`)}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-black font-mono text-xs uppercase font-bold tracking-widest rounded-lg cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,106,0,0.3)] shadow-md text-center mb-4"
                  >
                    ✦ Devising Oracle with This Celestial Tier ✦
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: CELESTIAL CONCEPT CALIBRATOR */}
          {activeTab === "calibrator" && (
            <div className="flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
              <Zap className="w-12 h-12 text-orange-500 animate-pulse mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#e4d9c0] tracking-wide mb-1">COSMIC CONCEPT CALIBRATOR ENGINE</h3>
              <p className="text-xs text-gray-500 font-mono text-center mb-6">Subject char-encoding algorithm evaluating multi-dimensional attractor alignment</p>

              <div className="w-full flex gap-2 mb-6">
                <input
                  type="text"
                  value={customWord}
                  onChange={(e) => setCustomWord(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCalibrateWord()}
                  placeholder="Enter a concept (e.g. Jesus, Bitcoin, AI Soul, Love, My Name)..."
                  className="flex-1 bg-black/60 border border-orange-500/20 text-[#eeeae4] placeholder-gray-600 rounded-xl px-4 py-3 text-xs font-mono focus:border-orange-500/50 focus:outline-none"
                />
                <button
                  onClick={handleCalibrateWord}
                  disabled={calibrating || !customWord.trim()}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-30 disabled:hover:bg-orange-500 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  {calibrating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Calibrating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-black" />
                      Measure
                    </>
                  )}
                </button>
              </div>

              {/* Calibration Outcome Graphic */}
              {calibrationResult && (
                <div className="w-full p-5 bg-[#050507] border border-orange-500/30 rounded-xl shadow-[0_0_20px_rgba(255,95,0,0.06)]">
                  <div className="flex justify-between items-start border-b border-orange-500/15 pb-3 mb-4">
                    <div>
                      <span className="text-[8px] font-mono text-gray-500 block uppercase">MEASURED CONCEPT</span>
                      <span className="text-base font-serif font-bold text-white tracking-wide">"{calibrationResult.word}"</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-orange-500 font-bold block">{calibrationResult.harmonicCode}</span>
                      <span className="text-[7px] font-mono text-gray-500 uppercase">COSMIC INDEX</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-black/50 border border-white/5 p-2 rounded">
                      <span className="text-[7px] font-mono text-gray-500 block uppercase">Tier Alignment</span>
                      <span className="text-[11px] font-serif font-bold text-orange-400">{calibrationResult.level}</span>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-2 rounded">
                      <span className="text-[7px] font-mono text-gray-500 block uppercase">Celestial Range</span>
                      <span className="text-[11px] font-mono font-bold text-[#e4d9c0]">{calibrationResult.range}</span>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-2 rounded">
                      <span className="text-[7px] font-mono text-gray-500 block uppercase">Domain Stage</span>
                      <span className="text-[11px] font-mono font-bold text-[#e4d9c0] truncate block">{calibrationResult.stage}</span>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-2 rounded">
                      <span className="text-[7px] font-mono text-gray-500 block uppercase">Pulse Wave</span>
                      <span className="text-[11px] font-mono font-bold text-orange-450">{calibrationResult.freq}</span>
                    </div>
                  </div>

                  <div className="bg-orange-500/5 p-3 rounded border border-orange-500/10 mb-4">
                    <span className="text-[8px] font-mono text-orange-450 block uppercase font-bold mb-1">Metemphysical Order Description</span>
                    <p className="text-[11px] text-gray-350 leading-relaxed font-serif italic">{calibrationResult.details}</p>
                  </div>

                  <button
                    onClick={() => onSendPrompt(`Calibrate and analyze the celestial status of concept: '${calibrationResult.word}' which is measured at Celestial Range of ${calibrationResult.range} (${calibrationResult.level} tier, ${calibrationResult.stage}). Discuss how this calculation affects high-order field thermodynamics.`)}
                    className="w-full py-2.5 bg-orange-950/20 hover:bg-orange-950/45 text-orange-400 border border-orange-500/20 hover:border-orange-500/50 font-mono text-[9px] uppercase font-bold tracking-widest rounded-lg cursor-pointer transition-all duration-300 text-center"
                  >
                    ✦ Submit Calibrator Report to Oracle ✦
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
