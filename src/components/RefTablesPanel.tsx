import React, { useState } from "react";
import { Table, X, Book, Database, RefreshCw, Layers } from "lucide-react";
import { METEM_DB } from "../data/metemDb";

export default function RefTablesPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeSubTab, setActiveSubTab] = useState<"constants" | "thermo" | "solfeggio" | "traditions">("constants");
  const [searchQuery, setSearchQuery] = useState("");

  const constants = [
    { symbol: "C", name: "Speed of Light (Absolute maximum)", value: "299,792,458 m/s", desc: "Absolute conservation speed barrier, limits spatial-temporal multiplicity." },
    { symbol: "k_B", name: "Boltzmann Constant", value: "1.380649 × 10⁻²³ J/K", desc: "Connects macrostate temperature of system directly to microscopic details." },
    { symbol: "ħ", name: "Reduced Planck Constant", value: "1.054571 × 10⁻³⁴ J·s", desc: "Quantum action minimum, defining spatial cell volume boundaries." },
    { symbol: "G", name: "Gravitational Constant", value: "6.67430 × 10⁻¹¹ m³/kg·s²", desc: "Controls black hole Schwarzschild sphere entropy limits." },
    { symbol: "R", name: "Ideal Gas Constant", value: "8.314462 J/mol·K", desc: "Standard scale factor for molar entropy transitions and Gibbs free energy." },
  ];

  const molarEntropies = [
    { compound: "Liquid Water (H₂O)", formula: "H₂O", molarS: "69.9 J/mol·K", phase: "Liquid", desc: "High entropy fluid, vital medium for biosynthetic order." },
    { compound: "Water Vapor", formula: "H₂O (g)", molarS: "188.8 J/mol·K", phase: "Gas", desc: "Highly chaotic state, high dissipative dispersion rate." },
    { compound: "Crystalline Glucose", formula: "C₆H₁₂O₆", molarS: "212.1 J/mol·K", phase: "Solid", desc: "Complex molecular fuel storing life information capacity." },
    { compound: "Carbon Dioxide", formula: "CO₂", molarS: "213.8 J/mol·K", phase: "Gas", desc: "Stable structural byproduct of metabolic respiration." },
    { compound: "Liquid Methanol", formula: "CH₃OH", molarS: "126.8 J/mol·K", phase: "Liquid", desc: "Simple organic solvent of moderate structural flexibility." },
    { compound: "Diamond (Carbon)", formula: "C (diamond)", molarS: "2.4 J/mol·K", phase: "Crystalline", desc: "Perfect order, near-zero entropy at standard boundaries." },
    { compound: "Crystalline Sodium Chloride", formula: "NaCl", molarS: "72.1 J/mol·K", phase: "Solid", desc: "Highly stable mineral grid embodying spatial phase order." },
  ];

  const solfeggioFrequencies = [
    { hz: "174 Hz", name: "Anesthetic Grounding", chakra: "Earth Foundation", ratio: "29:32", tSec: "5.74 ms", valueJS: "J/S = -0.150" },
    { hz: "285 Hz", name: "Cellular Blueprint", chakra: "Tissue Calibration", ratio: "95:128", tSec: "3.51 ms", valueJS: "J/S = -0.050" },
    { hz: "396 Hz", name: "Muladhara (Root)", chakra: "Survival / Grounding", ratio: "33:32", tSec: "2.52 ms", valueJS: "J/S = 0.000" },
    { hz: "417 Hz", name: "Svadhisthana (Sacral)", chakra: "Flow / Creativity", ratio: "139:128", tSec: "2.40 ms", valueJS: "J/S = 9.49e-5" },
    { hz: "528 Hz", name: "Manipura (Solar Plexus)", chakra: "Power / Transformation", ratio: "11:8", tSec: "1.89 ms", valueJS: "J/S = 0.010" },
    { hz: "639 Hz", name: "Anahata (Heart)", chakra: "Heart / Communion", ratio: "5:3", tSec: "1.56 ms", valueJS: "J/S = 1.000" },
    { hz: "741 Hz", name: "Vishuddha (Throat)", chakra: "Truth / Expression", ratio: "247:128", tSec: "1.35 ms", valueJS: "J/S = 7.414" },
    { hz: "852 Hz", name: "Ajna (Third Eye)", chakra: "Vision / Intuition", ratio: "85:64", tSec: "1.17 ms", valueJS: "J/S = 35.353" },
    { hz: "963 Hz", name: "Sahasrara (Crown)", chakra: "Unity / Cosmic Light", ratio: "321:256", tSec: "1.04 ms", valueJS: "J/S = 949.000" },
  ];

  return (
    <div className="absolute inset-0 bg-[#040406] text-[#eeeae4] overflow-y-auto z-[200] p-6 border-2 border-orange-500/25 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-orange-500 drop-shadow-[0_0_8px_rgba(255,106,0,0.4)]" />
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wider text-orange-400">DATABASE REFERENCE LEDGERS</h2>
              <p className="text-[10px] text-gray-550 font-mono uppercase">Full Physical, Chemical, Wave, and Traditional Matrices</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded px-3 py-1.5 text-[10px] font-mono text-orange-400 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE REFERENCE
          </button>
        </div>

        {/* Subnav Toggles */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4">
          {[
            { id: "constants", label: "⚙ Physical Constants" },
            { id: "thermo", label: "🧪 Thermodynamic Molar S" },
            { id: "solfeggio", label: "🔊 Wave Frequencies & J/S" },
            { id: "traditions", label: "📜 24 Ancient Traditions" },
          ].map((subtab) => (
            <button
              key={subtab.id}
              onClick={() => {
                setActiveSubTab(subtab.id as any);
                setSearchQuery("");
              }}
              className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded cursor-pointer transition-all ${
                activeSubTab === subtab.id
                  ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold shadow-[0_0_8px_rgba(255,95,0,0.1)]"
                  : "bg-transparent border-white/10 text-gray-450 hover:border-orange-500/35 hover:text-orange-300"
              }`}
            >
              {subtab.label}
            </button>
          ))}
        </div>

        {/* SEARCH BAR FOR TRADITIONS / THERMO */}
        {(activeSubTab === "traditions" || activeSubTab === "thermo") && (
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference data table records..."
              className="w-full max-w-md bg-black border border-white/10 rounded px-3 py-1.5 font-mono text-[11px] text-[#eeeae4] focus:border-orange-500/40 outline-none"
            />
          </div>
        )}

        {/* CONTENT TABLES */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {activeSubTab === "constants" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-serif font-bold text-sm text-[#e4d9c0]">Fundamental Metemphysical Constants</span>
                <span className="font-mono text-[9px] text-gray-500">SYSTEM DATA UNIT BASIS</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-orange-400">
                      <th className="py-2.5 w-[20%]">CONSTANT SYMBOL</th>
                      <th className="py-2.5 w-[30%]">DETERMINATION NAME</th>
                      <th className="py-2.5 w-[20%]">SI EXACT VALUE</th>
                      <th className="py-2.5">METEMPHYSICAL CORE IMPORT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#dcd7cb]">
                    {constants.map((c, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-bold text-[#c9a84c] text-xs">{c.symbol}</td>
                        <td className="py-3 text-white font-serif italic">{c.name}</td>
                        <td className="py-3 text-orange-400">{c.value}</td>
                        <td className="py-3 text-gray-400 text-[10px] leading-relaxed">{c.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === "thermo" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-serif font-bold text-sm text-[#e4d9c0]">Standard Molar Entropy (S°) Catalog (298.15 K, 1 Bar)</span>
                <span className="font-mono text-[9px] text-gray-500">THERMODYNAMIC VALUE REFERENCE</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-orange-400">
                      <th className="py-2.5">COMPOUND NAME</th>
                      <th className="py-2.5">CHEMICAL FORMULA</th>
                      <th className="py-2.5 text-center">STANDARD ENTROPY (S°)</th>
                      <th className="py-2.5">PHYSICAL PHASE</th>
                      <th className="py-2.5">METABOLIC / MOLECULAR ROLE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#dcd7cb]">
                    {molarEntropies
                      .filter(m => m.compound.toLowerCase().includes(searchQuery.toLowerCase()) || m.formula.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((m, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 text-white font-serif">{m.compound}</td>
                          <td className="py-3 font-bold text-orange-400">{m.formula}</td>
                          <td className="py-3 text-center text-[#c9a84c] font-bold text-xs">{m.molarS}</td>
                          <td className="py-3"><span className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 border border-white/10 text-gray-400 uppercase">{m.phase}</span></td>
                          <td className="py-3 text-gray-400 text-[10px]">{m.desc}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === "solfeggio" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-serif font-bold text-sm text-[#e4d9c0]">Harmonic Sound Calibration Constant Grid</span>
                <span className="font-mono text-[9px] text-gray-500">T &amp; S MATRIX RECONCILIATIONS</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-orange-400">
                      <th className="py-2.5">FREQUENCY</th>
                      <th className="py-2.5">RESONANCE DIRECTION</th>
                      <th className="py-2.5">CHAKRA COUPLING</th>
                      <th className="py-2.5">HARMONIC RATIO</th>
                      <th className="py-2.5 text-center">EPOCH SPAN (T)</th>
                      <th className="py-2.5 text-right">METEMPHYSICS INDEX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#dcd7cb]">
                    {solfeggioFrequencies.map((f, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onSendPrompt(`Analyze Solfeggio frequency ${f.hz} and its corresponding J/S state value of ${f.valueJS}`)}>
                        <td className="py-3 font-extrabold text-orange-500 text-xs">{f.hz}</td>
                        <td className="py-3 text-white font-serif italic">{f.name}</td>
                        <td className="py-3 text-[#c9a84c]">{f.chakra}</td>
                        <td className="py-3 text-gray-400">{f.ratio}</td>
                        <td className="py-3 text-center text-amber-500">{f.tSec}</td>
                        <td className="py-3 text-right font-bold text-orange-400 bg-orange-500/5 px-2">{f.valueJS}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === "traditions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-serif font-bold text-sm text-[#e4d9c0]">All 24 Major Mystical &amp; Developmental Traditions Ledger</span>
                <span className="font-mono text-[9px] text-gray-500">COMPLETE SIDEBAR COMPILATION</span>
              </div>
              <div className="overflow-y-auto max-h-[420px] pr-1 custom-scroll">
                <table className="w-full text-left font-mono text-[10px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-orange-400 uppercase text-[9px] tracking-wider">
                      <th className="py-2 w-[30%]">TRADITION / PATH</th>
                      <th className="py-2 w-[15%]">CATEGORY</th>
                      <th className="py-2 w-[15%]">CALIBRATION (Ω)</th>
                      <th className="py-2">SYNOPTIC METEMPHYSICAL CORE DIRECTIVE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#dcd7cb]">
                    {METEM_DB.religions
                      .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.summary.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((r, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onSendPrompt(`Give me a deep, academic-mystical breakdown of ${r.name}, showing its concepts of ${r.concepts.join(', ')} and how it is governed by ${r.omegaVal}`)}>
                          <td className="py-2.5 font-bold text-white font-serif text-xs">{r.name}</td>
                          <td className="py-2.5"><span className="text-orange-400 border border-orange-500/30 px-1 py-0.5 rounded bg-orange-500/5 text-[8px] uppercase">{r.subcategory}</span></td>
                          <td className="py-2.5 font-extrabold text-[#c9a84c] text-[10px]">{r.omegaVal}</td>
                          <td className="py-2.5 text-gray-450 leading-relaxed italic">{r.summary}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Quick Query Box */}
        <div className="mt-6 flex gap-4 items-center p-4 bg-orange-500/5 border border-orange-500/15 rounded-xl">
          <Book className="w-5 h-5 text-orange-500 animate-pulse hidden sm:block" />
          <div className="flex-1">
            <h4 className="font-serif text-xs font-bold text-white tracking-wide">Need Detailed Analytical Integration?</h4>
            <p className="text-[10px] text-[#afbbc9] font-mono mt-0.5">Click any row in these tables to automatically load that specific equation / ledger entity into the Oracle terminal for dynamic 5D analysis.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
