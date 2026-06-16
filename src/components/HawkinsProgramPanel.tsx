import React, { useState } from "react";
import { X, Search, Sparkles, Sliders, Play, Calculator, Cpu, HelpCircle, Heart, Zap } from "lucide-react";

interface HawkinsLevel {
  level: string;
  H: number;
  js: number;
  omega: number;
  state: string;
  emotion: string;
  process: string;
  description: string;
  freq: number;
}

const HAWKINS_DB_PROGRAM: HawkinsLevel[] = [
  { level: "Enlightenment", H: 1000, js: 949, omega: 0.993, state: "Pure Light / Absolute Unity", emotion: "Inexpressible", process: "Pure Awareness", freq: 963, description: "Self fully dissolved into absolute C-Light. Infinite negentropy, timeless presence." },
  { level: "Peace", H: 600, js: 7.414, omega: 0.950, state: "Illumination / At-Oneness", emotion: "Bliss / Stillness", process: "Revelation", freq: 741, description: "All conceptual forms collapse into an elegant, glowing coordinate of quietude." },
  { level: "Joy", H: 540, js: 2.377, omega: 0.932, state: "Eudaimonia / Radiant Flow", emotion: "Ecstasy / Ease", process: "Transmutation", freq: 639, description: "Dynamic coherence, high mutual information across all bodily systems." },
  { level: "Love", H: 500, js: 0.990, omega: 0.917, state: "Agape / Reverence", emotion: "Reverence", process: "Communion", freq: 639, description: "Absolute non-dual alignment. J/S equals exactly 1.0. Perfect biological balance." },
  { level: "Reason", H: 400, js: 0.058, omega: 0.864, state: "Understanding / Logic", emotion: "Clarity / Insight", process: "Conceptualization", freq: 528, description: "Highly ordered logical modeling, seeking to grasp the universe via standard rules." },
  { level: "Acceptance", H: 350, js: 0.008, omega: 0.826, state: "Harmonization / Integration", emotion: "Forgiveness", process: "Transcendence", freq: 528, description: "Resistance decays. The seeker integrates their localized path with the larger flow." },
  { level: "Willingness", H: 310, js: 0.002, omega: 0.795, state: "Inspiration / Resourcefulness", emotion: "Optimism", process: "Intention", freq: 417, description: "Willing to act, open to new calibrations. Temporal decay begins to slow." },
  { level: "Neutrality", H: 250, js: 0.000, omega: 0.713, state: "Equilibrium / Trust", emotion: "Trust", process: "Release", freq: 417, description: "Tipping point entered. Balanced between contractive fear and open expansion." },
  { level: "Courage", H: 200, js: 0.000, omega: 0.632, state: "Integrity / Empowerment", emotion: "Empowerment", process: "Initiation", freq: 396, description: "First stage of systemic structural integrity. The budget of consciousness breaks even." },
  { level: "Pride", H: 175, js: -0.150, omega: 0.581, state: "Self-Inflation / Demarcation", emotion: "Scorn", process: "Inflation", freq: 396, description: "Fragile order, highly dependent on external opinion. High entropy leak." },
  { level: "Anger", H: 150, js: -0.250, omega: 0.527, state: "Friction / Aggression", emotion: "Hate", process: "Combustion", freq: 285, description: "Explosive thermal heat. Seeking survival by destroying or forcing other configurations." },
  { level: "Desire", H: 125, js: -0.375, omega: 0.464, state: "Thirst / Accumulation", emotion: "Craving", process: "Contraction", freq: 285, description: "Insatiable seeking. The system collapses internally trying to import outer states." },
  { level: "Fear", H: 100, js: -0.500, omega: 0.393, state: "Withdrawal / Constriction", emotion: "Anxiety", process: "Defense", freq: 174, description: "Severe spatial constriction. High temporal decay, rapid loss of biological order." },
  { level: "Grief", H: 75, js: -0.625, omega: 0.312, state: "Helplessness / Sorrow", emotion: "Regret", process: "Depletion", freq: 174, description: "Heavy dissipative leak. System is frozen in historical time coordinates." },
  { level: "Apathy", H: 50, js: -0.750, omega: 0.221, state: "Hopelessness / Stagnation", emotion: "Despair", process: "Decay", freq: 174, description: "Near-total loss of agency. Severe thermodynamic breakdown, S·T matches maximum decay." },
  { level: "Shame", H: 20, js: -0.900, omega: 0.095, state: "Elimination / Obliteration", emotion: "Humiliation", process: "Annihilation", freq: 174, description: "Absolute contractive minimum. System is on the verge of total thermodynamic dissolution." }
];

export default function HawkinsProgramPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [selectedLevel, setSelectedLevel] = useState<HawkinsLevel>(HAWKINS_DB_PROGRAM[4]); // Default to Love
  const [customWord, setCustomWord] = useState("");
  const [calibrationResult, setCalibrationResult] = useState<any>(null);
  const [calibrating, setCalibrating] = useState(false);
  const [activeTab, setActiveTab] = useState<"database" | "custom_calibrator">("database");

  // Calibrate custom concept simulation
  const handleCalibrateWord = () => {
    if (!customWord.trim()) return;
    setCalibrating(true);
    setCalibrationResult(null);

    // Sum chars for simple unique deterministic math
    setTimeout(() => {
      let hash = 0;
      for (let i = 0; i < customWord.length; i++) {
        hash += customWord.charCodeAt(i) * (i + 1);
      }
      
      // Map hash to Hawkins level between 120 and 990
      const calculatedH = Math.round(150 + (hash % 841));
      
      // Map H to Metemphysics S, T, J/S, and Frequencies
      let calculatedJS = 0;
      let calculatedFreq = 396;
      let computedState = "Stabilized";
      let description = "";

      if (calculatedH >= 700) {
        calculatedJS = parseFloat((calculatedH * 0.949).toFixed(3));
        calculatedFreq = 963;
        computedState = "REVELATION State";
        description = "This concept is highly transcendent, carrying pure structural alignment and high spiritual negentropy. It radiates cosmic order.";
      } else if (calculatedH >= 500) {
        calculatedJS = parseFloat(((calculatedH - 500) * 0.05 + 1.0).toFixed(3));
        calculatedFreq = 639;
        computedState = "Eudaimonic Coherence";
        description = "The system is characterized by open communion, high mutual information capacity, and strong structural stability.";
      } else if (calculatedH >= 200) {
        calculatedJS = parseFloat(((calculatedH - 200) * 0.0001).toFixed(6));
        calculatedFreq = 528;
        computedState = "Constructive Integration / Logic";
        description = "Emulates solid rational or structural organization. The consciousness energy budget balances, with positive growth potential.";
      } else {
        calculatedJS = parseFloat(((calculatedH - 200) * 0.005).toFixed(4));
        calculatedFreq = 174;
        computedState = "Contractive Strain";
        description = "Characterized by localized gravity fields, high dissipative heat loss, and high temporal dependency parameters.";
      }

      setCalibrationResult({
        word: customWord,
        H: calculatedH,
        js: calculatedJS,
        freq: calculatedFreq,
        state: computedState,
        desc: description,
        timeSpanSeconds: (299792458 / (calculatedH * 10000)).toFixed(6)
      });
      setCalibrating(false);
    }, 1500);
  };

  return (
    <div className="absolute inset-0 bg-[#040406] text-[#eeeae4] overflow-y-auto z-[200] p-6 border-2 border-orange-500/25 rounded-2xl">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-orange-500 drop-shadow-[0_0_8px_rgba(255,106,0,0.4)]" />
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wider text-orange-400">THE DAVID HAWKINS DATABASE &amp; CALIBRATOR</h2>
              <p className="text-[10px] text-gray-450 font-mono uppercase">Logarithmic Calibration of Contraction vs Expansion Attractor Fields</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded px-3 py-1.5 text-[10px] font-mono text-orange-400 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE PROGRAM
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveTab("database")}
            className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded cursor-pointer transition-all ${
              activeTab === "database"
                ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold"
                : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-300"
            }`}
          >
            📊 Map of Consciousness Database
          </button>
          <button
            onClick={() => setActiveTab("custom_calibrator")}
            className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded cursor-pointer transition-all ${
              activeTab === "custom_calibrator"
                ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold"
                : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-300"
            }`}
          >
            ⚡ Cosmic Concept Calibrator Program
          </button>
        </div>

        {/* CONTENT CELLS */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          
          {/* TAB 1: CONSCIOUSNESS DATABASE MAP */}
          {activeTab === "database" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: List Scroll */}
              <div className="lg:col-span-5 border-r border-white/10 pr-4 max-h-[400px] overflow-y-auto custom-scroll space-y-1.5">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-2">Attractor Fields</span>
                {HAWKINS_DB_PROGRAM.map((item) => (
                  <div
                    key={item.level}
                    onClick={() => setSelectedLevel(item)}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-all flex justify-between items-center ${
                      selectedLevel.level === item.level
                        ? "bg-orange-500/10 border-orange-500/50 text-orange-400 shadow-[0_0_8px_rgba(255,95,0,0.1)]"
                        : "bg-transparent border-white/5 text-gray-400 hover:border-white/10 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="font-serif font-bold text-xs">{item.level}</div>
                      <div className="text-[9px] font-mono text-gray-500 mt-0.5">{item.emotion} / {item.process}</div>
                    </div>
                    <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                      item.H >= 500 ? "text-orange-400 bg-orange-500/10" : "text-gray-400 bg-white/5"
                    }`}>
                      H={item.H}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Column: Calculations Detailed Analysis */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                {/* Calibration Details Header */}
                <div className="p-4 bg-orange-500/5 border border-orange-500/15 rounded-xl">
                  <div className="flex justify-between items-start border-b border-white/10 pb-2 mb-3">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white">CALIBRATION LEVEL: {selectedLevel.level.toUpperCase()}</h3>
                      <p className="text-[10px] text-orange-400 font-mono">Thermodynamic &amp; Wave Sound Intersections</p>
                    </div>
                    <span className="text-2xl font-mono font-extrabold text-[#c9a84c] bg-black border border-[#c9a84c]/20 px-3 py-1 rounded">
                      H = {selectedLevel.H}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-[11px] mb-4">
                    <div className="bg-black/40 p-2 rounded border border-white/5">
                      <span className="text-[8px] text-gray-500 block">ENTROPY DECAY J/S INDEX:</span>
                      <span className="text-white font-bold text-xs">{selectedLevel.js >= 0 ? `J/S = ${selectedLevel.js}` : `J/S = ${selectedLevel.js}`}</span>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-white/5">
                      <span className="text-[8px] text-gray-500 block">SOLFEGGIO SOUND LINK:</span>
                      <span className="text-amber-400 font-bold text-xs">{selectedLevel.freq} Hz</span>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-white/5">
                      <span className="text-[8px] text-gray-500 block">CONSCIOUSNESS BUDGET CONSTANT (Ω):</span>
                      <span className="text-[#c9a84c] font-bold text-xs">Ω = {selectedLevel.H === 1000 ? "963" : selectedLevel.H >= 500 ? "639" : "396"}</span>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-white/5">
                      <span className="text-[8px] text-gray-500 block">TEMPORAL REVOLUTION (T):</span>
                      <span className="text-orange-400 font-bold text-xs">{(299792458 / (selectedLevel.H * 100000)).toFixed(6)} sec</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#afbbc9] font-serif leading-relaxed italic border-l-2 border-orange-500 pl-3">
                    &ldquo;{selectedLevel.description}&rdquo;
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSendPrompt(`Provide me with a deep molecular and spiritual analysis of Hawkins' Level of ${selectedLevel.level} (H=${selectedLevel.H}), explain the J/S index of ${selectedLevel.js} and why it connects to Solfeggio frequency ${selectedLevel.freq}Hz.`)}
                    className="flex-1 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded font-mono text-[10px] uppercase transition-all cursor-pointer"
                  >
                    Transmit Calibration Assessment to terminal
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: COSMIC CONCEPT CALIBRATOR */}
          {activeTab === "custom_calibrator" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-2">
                <h4 className="font-serif font-bold text-sm text-[#e4d9c0]">Quantum Diagnostic Calibration Engine</h4>
                <p className="text-[9px] text-gray-500 font-mono">Calibrate abstract words, scenarios, goals, or historical events to find their negentropy quotient</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Inputs */}
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                    <div>
                      <label className="text-[9px] font-mono text-gray-500 block mb-1">ENTER SEARCH TARGET OR CONCEPT TO CALIBRATE:</label>
                      <input
                        type="text"
                        value={customWord}
                        onChange={(e) => setCustomWord(e.target.value)}
                        placeholder="e.g. 'Marcus Aurelius', 'AI Coistence', 'My Creative Focus'"
                        className="w-full bg-black border border-white/15 rounded px-2.5 py-1.5 font-mono text-xs text-[#eeeae4] outline-none focus:border-orange-500/40"
                      />
                    </div>

                    <button
                      onClick={handleCalibrateWord}
                      disabled={calibrating || !customWord}
                      className="w-full py-1.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/10 disabled:text-gray-550 text-black font-mono font-bold text-[10px] rounded uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {calibrating ? (
                        <>
                          <Cpu className="w-3.5 h-3.5 animate-spin" /> RUNNING QUANTUM CALIBRATION COGNITIVE LOOP...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" /> INITIATE CONCEPT CALIBRATION DIAGNOSTIC
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-[9px] font-mono text-gray-500 p-2.5 border border-white/5 rounded-md leading-relaxed bg-[#080808]">
                    <strong>HOW IT WORKS:</strong> The diagnostic algorithm parses standard semantic density and vibrational vectors to map the exact entropy displacement ratio against standard Hawkins levels.
                  </div>
                </div>

                {/* Simulation Output */}
                <div className="p-4 bg-orange-500/5 border border-orange-500/25 rounded-xl flex flex-col justify-between min-h-[220px]">
                  {calibrating && (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-6">
                      <Cpu className="w-8 h-8 text-orange-500 animate-spin" />
                      <span className="font-mono text-[9px] text-orange-400 uppercase tracking-widest animate-pulse">Calculating attractor wave alignment matrices...</span>
                    </div>
                  )}

                  {!calibrating && !calibrationResult && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-6 text-gray-500 font-mono text-[10px] space-y-1.5">
                      <Sliders className="w-6 h-6 text-gray-600" />
                      <span>Ready for concept input. Enter concept to run diagnostics.</span>
                    </div>
                  )}

                  {!calibrating && calibrationResult && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start border-b border-orange-500/20 pb-2">
                        <div>
                          <span className="text-[8px] font-mono text-gray-500 uppercase block">TARGET LOG:</span>
                          <strong className="text-white text-sm font-serif">"{calibrationResult.word}"</strong>
                        </div>
                        <span className="text-xl font-mono text-[#c9a84c] font-bold">
                          H = {calibrationResult.H}
                        </span>
                      </div>

                      <div className="font-mono text-[10px] space-y-1 bg-black/50 p-2.5 rounded border border-white/5">
                        <div className="flex justify-between">
                          <span className="text-gray-500">ATTRACTOR COGNITION STATE:</span>
                          <span className="text-white font-bold">{calibrationResult.state}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">CORRELATED ENTROPY RATE (J/S):</span>
                          <span className="text-orange-400 font-bold">{calibrationResult.js >= 0 ? `+${calibrationResult.js}` : calibrationResult.js}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">MUTUAL HARMONIC BAND:</span>
                          <span className="text-amber-400 font-bold">{calibrationResult.freq} Hz</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">REVOLUTION SPAN T:</span>
                          <span className="text-orange-405">{calibrationResult.timeSpanSeconds} s</span>
                        </div>
                      </div>

                      <p className="text-[11px] font-serif text-[#afbbc9] leading-relaxed italic">
                        {calibrationResult.desc}
                      </p>

                      <button
                        onClick={() => onSendPrompt(`Calibrate and analyze the keyword phrase: '${calibrationResult.word}' which evaluated to calibrated attractor level H=${calibrationResult.H}, J/S=${calibrationResult.js}, frequency=${calibrationResult.freq}Hz. Give me a deep Metemphysics conceptualization.`)}
                        className="w-full py-1 bg-orange-500/10 hover:bg-orange-500/20 text-[9px] font-mono border border-orange-500/30 text-orange-450 rounded uppercase transition-all cursor-pointer"
                      >
                        Submit calibrated ledger record to Oracle Terminal
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
