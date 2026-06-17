import React, { useState, useRef } from "react";
import { X, Play, Square, Headphones, Activity, Sparkles, AlertCircle } from "lucide-react";

export default function RefToolsPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"audio" | "planck" | "molar">("audio");
  
  // Audio Synthesizer State
  const [playingFreq, setPlayingFreq] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [vol, setVol] = useState<number>(0.15);

  const playFrequency = (hz: number) => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }

      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(hz, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1); // Smooth attack

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setPlayingFreq(hz);
    } catch (e) {
      console.error("Audio Context initialization failed", e);
    }
  };

  const stopActiveFrequency = () => {
    if (oscRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (gainRef.current) {
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, ctx.currentTime);
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1); // Smooth release
        setTimeout(() => {
          if (oscRef.current) {
            oscRef.current.stop();
            oscRef.current.disconnect();
            oscRef.current = null;
          }
          setPlayingFreq(null);
        }, 120);
      } else {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
        setPlayingFreq(null);
      }
    }
  };

  // Convert states
  const [convertT, setConvertT] = useState("1.0");
  const [selectedConstC, setSelectedConstC] = useState("299792458");
  const parsedT = parseFloat(convertT) || 1.0;
  const parsedC = parseFloat(selectedConstC) || 299792458.0;
  const computedEntropy = parsedC / parsedT;

  // Bio entropy states
  const [substrateMoles, setSubstrateMoles] = useState("1.0");
  const [tempKelvin, setTempKelvin] = useState("298.15");
  const [substrateType, setSubstrateType] = useState("glucose");

  const substrateEntropyBenchmarks: Record<string, { value: number; name: string }> = {
    glucose: { value: 212.1, name: "Crystalline Glucose (Highly Ordered)" },
    water: { value: 69.9, name: "Liquid Water (Moderate Fluidity)" },
    co2: { value: 213.8, name: "Gaseous CO₂ (High Dissipative)" }
  };

  const parsedMoles = parseFloat(substrateMoles) || 1.0;
  const parsedTemp = parseFloat(tempKelvin) || 298.15;
  const molarSUnit = substrateEntropyBenchmarks[substrateType];
  const calculatedTotalSystemS = molarSUnit ? molarSUnit.value * parsedMoles : 0;
  const freeEnergyImpact = calculatedTotalSystemS * parsedTemp / 1000; // in kJ

  return (
    <div className="fixed lg:absolute inset-0 bg-[#040406] text-[#eeeae4] overflow-y-auto z-[200] p-6 border-2 border-orange-500/25 rounded-2xl">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-6">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-orange-500 drop-shadow-[0_0_8px_rgba(255,106,0,0.4)]" />
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wider text-orange-400">TOOLS OF REFERENCE TABLES</h2>
              <p className="text-[10px] text-gray-450 font-mono uppercase">Interactive Calibrators &amp; Wave Sound Generators</p>
            </div>
          </div>
          <button 
            onClick={() => {
              stopActiveFrequency();
              onClose();
            }}
            className="flex items-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded px-3 py-1.5 text-[10px] font-mono text-orange-400 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE TOOLS
          </button>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4">
          {[
            { id: "audio", label: "🔊 Solfeggio sound Synthesizer" },
            { id: "planck", label: "🪐 Unified Spacetime Converter" },
            { id: "molar", label: "🧪 Molecular Entropy Solver" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                stopActiveFrequency();
                setActiveTab(tab.id as any);
              }}
              className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded cursor-pointer transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold shadow-[0_0_8px_rgba(255,95,0,0.1)]"
                  : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN BODY INTERACTIVE CELLS */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          
          {/* TAB 1: AUDIO SYNTHESIZER */}
          {activeTab === "audio" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#e4d9c0] flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-[#c9a84c]" /> Pure Wave Solfeggio Synthesizer Node
                  </h4>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">Real-time Web Audio API signal generator (Click cards to play)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-500">GAIN (VOL):</span>
                  <input
                    type="range"
                    min="0.01"
                    max="0.4"
                    step="0.01"
                    value={vol}
                    onChange={(e) => {
                      const nv = parseFloat(e.target.value);
                      setVol(nv);
                      if (gainRef.current && audioCtxRef.current) {
                        gainRef.current.gain.setValueAtTime(nv, audioCtxRef.current.currentTime);
                      }
                    }}
                    className="w-20 cursor-pointer accent-orange-500"
                  />
                  <span className="text-[10px] font-mono p-1 bg-black border border-white/10 rounded">{Math.round(vol * 100)}%</span>
                </div>
              </div>

              {playingFreq && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 text-center flex items-center justify-center gap-3 animate-pulse">
                  <Activity className="w-4 h-4 text-orange-500 animate-spin" />
                  <span className="font-mono text-xs text-orange-400 font-bold">ACTIVE WAVE EMITTING: {playingFreq} Hz</span>
                  <button
                    onClick={stopActiveFrequency}
                    className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 px-2.5 py-1 text-[8px] font-mono rounded cursor-pointer transition-colors uppercase font-bold text-white"
                  >
                    Mute Signal
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { hz: 174, name: "174 Hz — Pain Release", color: "from-[#222] to-[#111]", border: "hover:border-gray-500/40" },
                  { hz: 285, name: "285 Hz — Deep Repair", color: "from-[#222] to-[#111]", border: "hover:border-gray-500/40" },
                  { hz: 396, name: "396 Hz — Fear Release", color: "from-[#400] to-[#110]", border: "hover:border-red-500/40" },
                  { hz: 417, name: "417 Hz — Undo Obstacles", color: "from-[#320] to-[#110]", border: "hover:border-orange-500/40" },
                  { hz: 528, name: "528 Hz — DNA & Vitality", color: "from-[#330] to-[#110]", border: "hover:border-yellow-500/40" },
                  { hz: 639, name: "639 Hz — Communion / Hearts", color: "from-[#030] to-[#010]", border: "hover:border-green-500/40" },
                  { hz: 741, name: "741 Hz — Inner Truth", color: "from-[#023] to-[#010]", border: "hover:border-blue-500/40" },
                  { hz: 852, name: "852 Hz — Third Eye Vision", color: "from-[#113] to-[#010]", border: "hover:border-indigo-500/40" },
                  { hz: 963, name: "963 Hz — Crown Sovereignty", color: "from-[#303] to-[#111]", border: "hover:border-pink-500/40" }
                ].map((s) => {
                  const isCur = playingFreq === s.hz;
                  return (
                    <div
                      key={s.hz}
                      onClick={() => {
                        if (isCur) stopActiveFrequency();
                        else playFrequency(s.hz);
                      }}
                      className={`p-3 bg-gradient-to-br ${s.color} border ${isCur ? "border-orange-500 shadow-[0_0_15px_rgba(255,95,0,0.25)]" : "border-white/5"} ${s.border} rounded-lg cursor-pointer transition-all hover:bg-orange-950/10 flex flex-col justify-between h-[80px]`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-extrabold text-orange-400">{s.hz} Hz</span>
                        {isCur ? <Square className="w-3 h-3 text-red-500 animate-pulse fill-red-500" /> : <Play className="w-3 h-3 text-[#c9a84c] fill-[#c9a84c]" />}
                      </div>
                      <span className="text-[10px] font-serif text-[#afbbc9] truncate">{s.name}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-gray-500 p-2 border border-white/5 rounded-md flex items-start gap-1.5 bg-[#080808]">
                <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span>SOUND ADVISORY: Solfeggio sound calibrations act directly on the nervous system. Ensure volume levels are comfortable. Best listened to through stereo headphones.</span>
              </div>
            </div>
          )}

          {/* TAB 2: SPACETIME CONVERTER */}
          {activeTab === "planck" && (
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-2">
                <h4 className="font-serif font-bold text-sm text-[#e4d9c0]">Dynamic Spacetime &amp; Entropy Flux Solver</h4>
                <p className="text-[9px] text-gray-500 font-mono">Calibrate S = C / T across physical, cosmic, and unified Planck scales</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3 p-3 bg-white/5 rounded border border-white/5">
                  <span className="text-[10px] font-mono text-orange-400 tracking-wider uppercase block">Input Variables</span>
                  
                  <div>
                    <label className="text-[9px] font-mono text-gray-450 block mb-1">CHOOSE CONSERVED QUANTUM BARRIER (C):</label>
                    <select
                      value={selectedConstC}
                      onChange={(e) => setSelectedConstC(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-2 py-1 font-mono text-[10px] text-white outline-none"
                    >
                      <option value="299792458">C = 299,792,458 m/s (Light speed standard)</option>
                      <option value="1">C = 1.0 (Planck Normalized Units)</option>
                      <option value="528">C = 528 (Vibrational / Solfeggio Tuning)</option>
                      <option value="432">C = 432 (Golden Ratio / Cosmic Tuning)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-gray-450 block mb-1">TEMPORAL REVOLUTION SPAN (T SECONDS):</label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0.0000001"
                      value={convertT}
                      onChange={(e) => setConvertT(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-2 py-1 font-mono text-[10px] text-white outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#c9a84c] tracking-widest uppercase block mb-2">Calculated State Velocity S</span>
                    <div className="text-2xl font-mono text-white font-extrabold tracking-tight">
                      S = {computedEntropy.toLocaleString('en-US', { maximumFractionDigits: 5 })} J/K
                    </div>
                  </div>

                  <div className="mt-3 text-[10px] font-serif text-[#afbbc9] leading-relaxed border-t border-white/5 pt-2">
                    Under the Metemphysics conservation curve, an epoch duration of <strong className="text-white">{parsedT}s</strong> requires a state entropy volume density of <strong className="text-white">{computedEntropy.toFixed(2)}</strong> units to preserve the <strong className="text-white">C = {parsedC}</strong> spatial invariant limit.
                  </div>

                  <button
                    onClick={() => onSendPrompt(`Explain the state of S = C / T at C = ${parsedC} and T = ${parsedT} seconds.`)}
                    className="mt-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-mono text-[9px] rounded uppercase border border-orange-500/30 transition-all cursor-pointer"
                  >
                    Synthesize detailed calibration proof
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CELLULAR MOLAR SOLVER */}
          {activeTab === "molar" && (
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-2">
                <h4 className="font-serif font-bold text-sm text-[#e4d9c0]">Molecular Entropy Transition &amp; Gibbs Solver</h4>
                <p className="text-[9px] text-gray-500 font-mono">Calibrate thermodynamic molecular boundaries using statistical chemistry</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3 p-3 bg-white/5 rounded border border-white/5">
                  <span className="text-[10px] font-mono text-orange-400 tracking-wider uppercase block">Biosphere Parameters</span>
                  
                  <div>
                    <label className="text-[9px] font-mono text-gray-450 block mb-1">SELECT TARGET SUBSTRATE:</label>
                    <select
                      value={substrateType}
                      onChange={(e) => setSubstrateType(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-2 py-1 font-mono text-[10px] text-white outline-none"
                    >
                      <option value="glucose">Crystalline Glucose (212.1 J/mol·K)</option>
                      <option value="water">Liquid Water (69.9 J/mol·K)</option>
                      <option value="co2">Gaseous CO₂ (213.8 J/mol·K)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-gray-450 block mb-1">SUBSTRATE AMOUNT (MOLES n):</label>
                    <input
                      type="number"
                      step="0.05"
                      min="0.1"
                      value={substrateMoles}
                      onChange={(e) => setSubstrateMoles(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-2 py-1 font-mono text-[10px] text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-gray-450 block mb-1">SYSTEM TEMPERATURE (KELVIN K):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1.0"
                      value={tempKelvin}
                      onChange={(e) => setTempKelvin(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-2 py-1 font-mono text-[10px] text-white outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">Total Dispersed Entropy (S)</span>
                      <div className="text-xl font-mono text-white font-extrabold">{calculatedTotalSystemS.toFixed(2)} J/K</div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#c9a84c] uppercase block">Thermal Dissipation (T · S)</span>
                      <div className="text-xl font-mono text-orange-400 font-extrabold">{freeEnergyImpact.toFixed(3)} kJ</div>
                    </div>
                  </div>

                  <p className="text-[10px] font-serif text-[#afbbc9] leading-relaxed mt-3">
                    With <strong className="text-white">{parsedMoles} mol</strong> of <strong>{molarSUnit?.name}</strong> at <strong className="text-white">{parsedTemp} K</strong>, the steady state entropy capacity of the biological configuration stands at <strong className="text-white">{calculatedTotalSystemS.toFixed(1)} J/K</strong>. Thermal dissipation consumes <strong className="text-white">{freeEnergyImpact.toFixed(2)} kJ</strong> of available potential energy.
                  </p>

                  <button
                    onClick={() => onSendPrompt(`Using biological entropy tables, assess the metabolic cost of ${substrateMoles} moles of ${substrateType} at ${tempKelvin} Kelvin, explain the free energy loss T * S.`)}
                    className="mt-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-mono text-[9px] rounded uppercase border border-orange-500/30 transition-all cursor-pointer"
                  >
                    Send metabolic solution to Terminal
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Quick query trigger */}
        <div className="mt-6 flex items-center justify-between p-4 bg-[#0a1020]/20 border border-white/5 rounded-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c9a84c] animate-pulse" />
            <div className="text-left">
              <span className="text-white font-serif font-bold text-xs block">Vibrational Harmony Calibration</span>
              <span className="text-[9px] font-mono text-gray-500">Every sound frequency maps as physical energy that aligns spatial state multi-entropy.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
