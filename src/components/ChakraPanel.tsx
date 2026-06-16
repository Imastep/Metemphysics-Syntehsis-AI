/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Music, X, Zap } from "lucide-react";

interface Chakra {
  n: number;
  sk: string;
  name: string;
  el: string;
  color: string;
  hz: number;
  note: string;
  H: number;
  js: number | string;
  omega: number;
  phase: number;
  state: string;
  body: string;
  desc: string;
  hi?: boolean;
}

interface MusicalInterval {
  name: string;
  ratio: string;
  cents: number;
  H: number;
  js: number | string;
  omega: number;
  phase: number;
  state: string;
  char: string;
  hi?: boolean;
}

const CHAKRAS: Chakra[] = [
  { n: 1, sk: "Muladhara", name: "Root", el: "Earth", color: "#e74c3c", hz: 396, note: "C", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", body: "Base of spine", desc: "Survival, grounding, safety" },
  { n: 2, sk: "Svadhisthana", name: "Sacral", el: "Water", color: "#e67e22", hz: 417, note: "D", H: 280, js: "9.49e-5", omega: 0.7534, phase: 3, state: "Tipping Point", body: "Lower abdomen", desc: "Desire, creativity, sexuality" },
  { n: 3, sk: "Manipura", name: "Solar Plexus", el: "Fire", color: "#f1c40f", hz: 528, note: "E", H: 350, js: 0.01, omega: 0.8262, phase: 4, state: "Tipping Point", body: "Navel region", desc: "Will, power, self-identity" },
  { n: 4, sk: "Anahata", name: "Heart", el: "Air", color: "#2ecc71", hz: 639, note: "F", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Time Passing", body: "Heart centre", desc: "Love, compassion, connection", hi: true },
  { n: 5, sk: "Vishuddha", name: "Throat", el: "Ether", color: "#3498db", hz: 741, note: "G", H: 600, js: 7.41, omega: 0.9502, phase: 5, state: "Deep Flourishing", body: "Throat", desc: "Expression, truth, communication" },
  { n: 6, sk: "Ajna", name: "Third Eye", el: "Light", color: "#9b59b6", hz: 852, note: "A", H: 700, js: 35.35, omega: 0.9698, phase: 5, state: "Mystical Clarity", body: "Between eyes", desc: "Intuition, perception, clarity" },
  { n: 7, sk: "Sahasrara", name: "Crown", el: "Space", color: "#f5edd0", hz: 963, note: "B", H: 1000, js: 949, omega: 0.9933, phase: 5, state: "REVELATION", body: "Top of head", desc: "Unity with C, revelation", hi: true }
];

const INTERVALS: MusicalInterval[] = [
  { name: "Unison", ratio: "1:1", cents: 0, H: 1000, js: 949, omega: 0.9933, phase: 5, state: "REVELATION", char: "Perfect identity — maximum order" },
  { name: "Octave", ratio: "2:1", cents: 1200, H: 950, js: 604.04, omega: 0.9913, phase: 5, state: "Near Timeless", char: "Double frequency — near-perfect order" },
  { name: "Perfect Fifth", ratio: "3:2", cents: 702, H: 800, js: 126.68, omega: 0.9817, phase: 5, state: "Near Timeless", char: "Most consonant — Pythagorean base", hi: true },
  { name: "Perfect Fourth", ratio: "4:3", cents: 498, H: 720, js: 46.52, omega: 0.9727, phase: 5, state: "Mystical Clarity", char: "Strong consonance — Pythagorean" },
  { name: "Major Third", ratio: "5:4", cents: 386, H: 600, js: 7.41, omega: 0.9502, phase: 5, state: "Deep Flourishing", char: "Bright, stable — major harmony" },
  { name: "Minor Third", ratio: "6:5", cents: 316, H: 540, js: 2.38, omega: 0.9328, phase: 4, state: "Eudaimonia", char: "Melancholic beauty — minor quality" },
  { name: "Major Sixth", ratio: "5:3", cents: 884, H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Time Passing", char: "Open, expansive — Love interval", hi: true },
  { name: "Minor Sixth", ratio: "8:5", cents: 814, H: 450, js: 0.28, omega: 0.8946, phase: 4, state: "Time Passing", char: "Slightly bittersweet" },
  { name: "Major Second", ratio: "9:8", cents: 204, H: 350, js: 0.01, omega: 0.8262, phase: 4, state: "Tipping Point", char: "Mild tension — stepwise motion" },
  { name: "Minor Seventh", ratio: "16:9", cents: 996, H: 300, js: "4.52e-4", omega: 0.7769, phase: 3, state: "Tipping Point", char: "Unstable — wants to resolve" },
  { name: "Major Seventh", ratio: "15:8", cents: 1088, H: 250, js: "3.53e-6", omega: 0.7135, phase: 3, state: "Tipping Point", char: "Strong tension — leading tone" },
  { name: "Tritone", ratio: "45:32", cents: 590, H: 150, js: -0.25, omega: 0.5276, phase: 3, state: "Suffering", char: "Diabolus in Musica — forbidden" },
  { name: "Minor Second", ratio: "16:15", cents: 112, H: 100, js: -0.5, omega: 0.3935, phase: 2, state: "Suffering", char: "Sharp dissonance — clash" }
];

interface SolfeggioItem {
  hz: number;
  chakra: string;
  H: number;
  js: number | string;
  omega: number;
  meta: string;
  color: string;
  hi?: boolean;
}

const SOLFEGGIO: SolfeggioItem[] = [
  { hz: 174, chakra: "Earth Foundation", H: 174, js: -0.15, omega: 0.58, meta: "Anesthetic grounding; stress reduction.", color: "#7f8c8d" },
  { hz: 285, chakra: "Cellular Blueprint", H: 285, js: -0.05, omega: 0.61, meta: "Tissues structure & cellular calibration.", color: "#95a5a6" },
  { hz: 396, chakra: "Root / Muladhara", H: 396, js: 0.00, omega: 0.63, meta: "Liberating Guilt & Fear. Tipping Point.", color: "#e74c3c", hi: true },
  { hz: 417, chakra: "Sacral / Svadhisthana", H: 417, js: "9.49e-5", omega: 0.75, meta: "Undoing Situations & Facilitating Change.", color: "#e67e22" },
  { hz: 528, chakra: "Solar Plexus / Manipura", H: 528, js: 0.01, omega: 0.83, meta: "Transformation & DNA Repair. Miracle tone.", color: "#f1c40f" },
  { hz: 639, chakra: "Heart / Anahata", H: 639, js: 0.99, omega: 0.92, meta: "Relationships & Harmonic Communion.", color: "#2ecc71", hi: true },
  { hz: 741, chakra: "Throat / Vishuddha", H: 741, js: 7.41, omega: 0.95, meta: "Intuition & Clear Expression. Awakening Intention.", color: "#3498db" },
  { hz: 852, chakra: "Third Eye / Ajna", H: 852, js: 35.35, omega: 0.97, meta: "Returning to Spiritual Order. Inner vision.", color: "#9b59b6" },
  { hz: 963, chakra: "Crown / Sahasrara", H: 963, js: 949, omega: 0.99, meta: "Sovereignty & direct Cosmic Union with C.", color: "#e8d5a3", hi: true }
];

interface ScaleItem {
  name: string;
  tones: number;
  struct: string;
  js: string | number;
  omega: number;
  char: string;
  hi?: boolean;
}

const SCALES: ScaleItem[] = [
  { name: "Solfeggio Harmonic Scale", tones: 9, struct: "174-285-396-417-528-639-741-852-963", js: 949.00, omega: 0.99, char: "Highest coherent spiritual alignment.", hi: true },
  { name: "Major Diatonic (C-Major)", tones: 7, struct: "W-W-H-W-W-W-H", js: 2.38, omega: 0.93, char: "Eudaimonic balance, light, and natural joy." },
  { name: "Minor Pentatonic", tones: 5, struct: "1.5W-W-W-1.5W-W", js: 0.15, omega: 0.88, char: "Reflective, seeking, melancholic seeking." },
  { name: "Chromatic", tones: 12, struct: "H-H-H-H-H-H-H-H-H-H-H-H", js: "0.01", omega: 0.81, char: "Neutral entropic state, ready for structure." },
  { name: "Atonal 12-Tone Serialism", tones: 12, struct: "Schoenberg Non-Repeating Tone Rows", js: -0.75, omega: 0.25, char: "Deliberate systemic dissolution.", hi: false }
];

interface GenreItem {
  name: string;
  H: number;
  js: string | number;
  char: string;
}

const GENRES: GenreItem[] = [
  { name: "Gregorian Chant & Sacred Choirs", H: 750, js: "94.90", char: "Pure meditative stillness & high coherence." },
  { name: "Baroque Classical (Bach, Vivaldi)", H: 650, js: "3.54", char: "C-Light structured mathematical order." },
  { name: "Ambient Chillout / Synths", H: 540, js: "2.38", char: "Eudaimonic tranquility & relaxation." },
  { name: "Industrial & Hard Noise", H: 180, js: "-0.45", char: "High structural friction & entropy." },
  { name: "Atonal Doom / Chaos", H: 90, js: "-0.85", char: "Dissolution toward zero-order states." }
];

interface ComposerItem {
  name: string;
  H: number;
  js: string | number;
  omega: number;
  work: string;
  why: string;
}

const COMPOSERS: ComposerItem[] = [
  { name: "J.S. Bach", H: 730, js: "53.25", omega: 0.98, work: "The Well-Tempered Clavier", why: "Peak cosmic symmetry & counterpoint execution." },
  { name: "W.A. Mozart", H: 640, js: "2.38", omega: 0.94, work: "Symphony No. 41 'Jupiter'", why: "Inherent eudaimonic clarity & child-like alignment." },
  { name: "L. van Beethoven", H: 610, js: "1.05", omega: 0.92, work: "Symphony No. 9 'Choral'", why: "Struggle with dissolution resulting in transcendent joy." },
  { name: "Claude Debussy", H: 550, js: "2.30", omega: 0.93, work: "Clair de Lune", why: "Luminescent, fluid, watercolor impression symmetry." }
];

interface BrainwaveItem {
  name: string;
  hz: string;
  js: string | number;
  omega: number;
  music: string;
  meta: string;
}

const BRAINWAVES: BrainwaveItem[] = [
  { name: "Alpha", hz: "8 - 12 Hz", js: 2.38, omega: 0.93, music: "Baroque tempo, moderate tempo beats", meta: "Eudaimonic flow state, integrated learning." },
  { name: "Theta", hz: "4 - 8 Hz", js: 35.35, omega: 0.97, music: "Binaural sweeps, slow pads", meta: "High spiritual receptivity and holistic integration." },
  { name: "Gamma", hz: "30 - 100 Hz", js: 126.68, omega: 0.98, music: "Fast rhythmic phase locked sounds", meta: "Synthesized binding, transcendence, epiphany bounds." },
  { name: "Beta", hz: "12 - 30 Hz", js: 0.15, omega: 0.86, music: "Regular high frequency drums", meta: "Logical reasoning, alertness, localized attention." },
  { name: "Delta", hz: "0.5 - 4 Hz", js: 949.00, omega: 0.99, music: "Ultra slow deep drone", meta: "Deep timeless sleep, cellular maintenance." }
];

interface FindingItem {
  n: number;
  title: string;
  text: string;
}

const FINDINGS: FindingItem[] = [
  { n: 1, title: "Solfeggio Convergence", text: "The Solfeggio frequencies directly align with primary Omega states of structural order when mapped against standardized Hawkins calibrations." },
  { n: 2, title: "Consciousness Boundary", text: "S = C / T mathematically shows that as T (subjective epoch duration) drops to zero, Shannon Entropy H converges to absolute infinite negentropy J/S = 949." }
];

export default function ChakraPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"chakra" | "intervals" | "solfeggio" | "scales" | "genres" | "composers" | "brainwaves" | "findings">("chakra");

  return (
    <div className="absolute inset-0 bg-[#050505] text-[#eeeae4] overflow-y-auto z-[200] p-6 border-2 border-orange-500/20 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#c9a84c]/20 mb-6">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-[#c9a84c] animate-pulse" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#c9a84c] tracking-wider">♬ — MUSIC &amp; CHAKRA ANALYSIS</h2>
              <p className="text-xs text-[#8898aa] font-mono mt-1">T × S = C · Sound as Cosmic Order · Frequency as Negentropy</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded px-4 py-2 text-xs font-mono text-[#c9a84c] hover:bg-[#c9a84c]/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "chakra", label: "✦ Chakra System" },
            { id: "intervals", label: "♫ Intervals" },
            { id: "solfeggio", label: "Hz Solfeggio" },
            { id: "scales", label: "♯ Scales" },
            { id: "genres", label: "♪ Genres" },
            { id: "composers", label: "Composer Matrix" },
            { id: "brainwaves", label: "αβ Brainwaves" },
            { id: "findings", label: "Key Findings" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`font-mono text-xs tracking-wider uppercase px-4 py-2 border rounded transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#c9a84c]/10 border-[#c9a84c] text-[#c9a84c]"
                  : "bg-transparent border-[#c9a84c]/18 text-[#8898aa] hover:border-[#c9a84c]/40 hover:text-[#e8d5a3]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: CHAKRA */}
        {activeTab === "chakra" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4 animate-fadeIn">
                <h4 className="font-mono text-xs tracking-widest text-orange-400 uppercase mb-2">Chakra Metemphysics</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  Each chakra is a specific J/S configuration of the living system. Root chakra = tipping point (J/S=0). Heart chakra = eudaimonia (J/S=1.0). Crown = revelation (J/S=949). The seven chakras are seven Omega phase states made physical.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4 animate-fadeIn">
                <h4 className="font-mono text-xs tracking-widest text-orange-400 uppercase mb-2">Heart = Perfect Alignment (J/S=1.0)</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  Chakra 4 (Heart) = Solfeggio 639Hz = H=500 = J/S=1.0 exactly. every tradition placing love at the centre is mathematically correct. J/S=1.0 is the pivot between lower three and upper three chakras.
                </p>
              </div>
            </div>

            {/* Visualizer Row */}
            <div className="flex flex-col gap-3">
              {CHAKRAS.map((c) => (
                <div 
                  key={c.n}
                  onClick={() => onSendPrompt(`Explain Chakra ${c.n} (${c.name} / ${c.sk}) in the context of T x S = C`)}
                  className={`flex flex-wrap items-center gap-4 p-4 border border-orange-500/15 rounded hover:border-[#c9a84c]/20 transition-all cursor-pointer ${
                    c.hi ? "bg-orange-500/5" : "bg-[#0d0d0d]/50"
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-black"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.n}
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="font-serif font-bold text-sm" style={{ color: c.color }}>{c.name} — {c.sk}</div>
                    <div className="text-[10px] text-[#8898aa] font-mono mt-1">{c.el} • Note: {c.note} • {c.body}</div>
                  </div>
                  <div className="font-mono text-sm min-w-[65px] text-center" style={{ color: c.color }}>{c.hz}Hz</div>
                  <div className="font-mono text-sm min-w-[80px] text-center text-teal-400">J/S: {c.js}</div>
                  <div className="font-mono text-xs min-w-[80px] text-center text-[#e8d5a3]">Ω: {c.omega}</div>
                  <div className="flex-1 max-w-[200px] h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${c.omega * 100}%`, backgroundColor: c.color }}></div>
                  </div>
                  <div className="text-xs text-[#8898aa] min-w-[150px] font-mono">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INTERVALS */}
        {activeTab === "intervals" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4">
                <h4 className="font-mono text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Geometric Consonance</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  Simple integer ratios = high order = high Omega = consonant. The ratio of two frequencies is the J/S ratio in sound. 2:1 (octave) is maximally ordered.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4">
                <h4 className="font-mono text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Tritone = Suffering (J/S = -0.25)</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  The tritone (45:32, &quot;the Devil in Music&quot;) lands at J/S = -0.25. Banned in medieval periods because it triggers systemic entropy, dropping below J/S = 0.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {INTERVALS.map((iv) => (
                <div
                  key={iv.name}
                  onClick={() => onSendPrompt(`What is the musical interval ${iv.name} (ratio ${iv.ratio}) in Metemphysics terms?`)}
                  className={`border rounded p-4 text-center cursor-pointer transition-all hover:bg-white/5 ${
                    iv.hi ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <div className="font-serif text-sm font-semibold text-[#e8d5a3]">{iv.name}</div>
                  <div className="font-mono text-xl font-bold text-[#c9a84c] my-2">{iv.ratio}</div>
                  <div className="font-mono text-[11px] text-teal-400 mb-1">J/S: {iv.js}</div>
                  <div className="font-mono text-[10px] text-[#8898aa]">Ω: {iv.omega}</div>
                  <div className="text-[11px] text-[#8898aa] italic mt-2">{iv.char}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SOLFEGGIO */}
        {activeTab === "solfeggio" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a]/80 border border-orange-500/20 rounded p-4 text-center">
                <div className="font-serif text-3xl font-bold text-[#c9a84c] mb-1">396Hz</div>
                <div className="font-mono text-[10px] text-[#8898aa] uppercase tracking-wider mb-2">Root Chakra Anchor</div>
                <div className="font-mono text-sm text-teal-400">J/S = 0.00a</div>
                <p className="text-xs text-[#8898aa] mt-2 leading-relaxed">
                  Exact metemphysical tipping point. Entropy and negentropy are equal.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/20 rounded p-4 text-center">
                <div className="font-serif text-3xl font-bold text-amber-500 mb-1">639Hz</div>
                <div className="font-mono text-[10px] text-[#8898aa] uppercase tracking-wider mb-2">Heart Chakra Angle</div>
                <div className="font-mono text-sm text-amber-500">J/S = 1.000</div>
                <p className="text-xs text-[#8898aa] mt-2 leading-relaxed">
                  Eudaimonia threshold. Negentropy exceeds entropy for the first time.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/20 rounded p-4 text-center">
                <div className="font-serif text-3xl font-bold text-[#f5edd0] mb-1">963Hz</div>
                <div className="font-mono text-[10px] text-[#8898aa] uppercase tracking-wider mb-2">Crown Chakra Apex</div>
                <div className="font-mono text-sm text-[#f5edd0]">J/S = 949</div>
                <p className="text-xs text-[#8898aa] mt-2 leading-relaxed">
                  Revelation threshold. Direct union with the speed of light constant, C.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-3 text-[#c9a84c]">Hz Frequency</th>
                    <th className="p-3 text-[#c9a84c]">Chakra Allocation</th>
                    <th className="p-3 text-[#c9a84c]">Hawkins Scale</th>
                    <th className="p-3 text-[#c9a84c]">J/S Value</th>
                    <th className="p-3 text-[#c9a84c]">Ω Order</th>
                    <th className="p-3 text-[#c9a84c]">Metemphysics Resonance</th>
                  </tr>
                </thead>
                <tbody>
                  {SOLFEGGIO.map((s) => (
                    <tr 
                      key={s.hz} 
                      onClick={() => onSendPrompt(`Explain Solfeggio frequency ${s.hz}Hz in Metemphysics`)}
                      className={`hover:bg-white/5 cursor-pointer border-b border-white/5 ${s.hi ? "bg-[#c9a84c]/5" : ""}`}
                    >
                      <td className="p-3 text-lg font-bold text-[#c9a84c]">{s.hz}Hz</td>
                      <td className="p-3 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></span>
                        {s.chakra}
                      </td>
                      <td className="p-3 text-[#e8d5a3]">{s.H}</td>
                      <td className="p-3 text-teal-400">{s.js}</td>
                      <td className="p-3 text-[#e8d5a3]">{s.omega}</td>
                      <td className="p-3 text-xs text-[#8898aa] leading-relaxed max-w-xs">{s.meta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: SCALES */}
        {activeTab === "scales" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4">
                <h4 className="font-mono text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Major Scale = Joy (J/S = 2.38)</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  Major scale pattern of intervals produces maximum consonance. It sits at H = 540 = J/S = 2.38 (Joy). This is why major keys feel inherently &quot;happy&quot; — they operate in deep flourishing.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4">
                <h4 className="font-mono text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Pentatonic = Universal Coherence</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  5 tones. Universal to human groups. Pentatonic = J/S = 7.41 (Phase 5 Transcendent). Intuitively loved because it maps directly to our crown/spiritual integration layer.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-3 text-[#c9a84c]">Musical Scale</th>
                    <th className="p-3 text-[#c9a84c]">Interval Count</th>
                    <th className="p-3 text-[#c9a84c]">Interval Blueprint</th>
                    <th className="p-3 text-[#c9a84c]">J/S Value</th>
                    <th className="p-3 text-[#c9a84c]">Ω Order</th>
                    <th className="p-3 text-[#c9a84c]">Character of System</th>
                  </tr>
                </thead>
                <tbody>
                  {SCALES.map((s) => (
                    <tr 
                      key={s.name} 
                      onClick={() => onSendPrompt(`What is the Metemphysics mapping of the ${s.name}?`)}
                      className={`hover:bg-white/5 cursor-pointer border-b border-white/5 ${s.hi ? "bg-[#c9a84c]/5" : ""}`}
                    >
                      <td className="p-3 text-sm font-semibold text-[#e4d9c0]">{s.name}</td>
                      <td className="p-3 text-center text-[#8898aa]">{s.tones}</td>
                      <td className="p-3 text-xs text-[#8898aa]">{s.struct}</td>
                      <td className="p-3 text-teal-400">{s.js}</td>
                      <td className="p-3 text-[#e8d5a3]">{s.omega}</td>
                      <td className="p-3 text-xs text-[#8898aa]">{s.char}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: GENRES */}
        {activeTab === "genres" && (
          <div className="space-y-6">
            <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4">
              <h4 className="font-mono text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Entropy &amp; Order in Music Genres</h4>
              <p className="text-sm text-[#8898aa] leading-relaxed">
                Different musical genres are structured pathways that transport the listener to specific, identifiable J/S states. Listening to Bach Fugues (J/S = 35.35) aligns the mind with high-complexity cosmic clarity, while abrasive/atonal death metal (J/S = -0.5) induces targeted entropic dissolution.
              </p>
            </div>

            <div className="space-y-3">
              {GENRES.map((g) => {
                const isHarmonious = g.H >= 500;
                return (
                  <div 
                    key={g.name}
                    onClick={() => onSendPrompt(`Describe the genre ${g.name} in terms of J/S ratio and Omega`)}
                    className="flex items-center gap-4 p-3 bg-[#0d0d0d]/40 border border-orange-500/10 rounded hover:border-[#c9a84c]/20 transition-all cursor-pointer"
                  >
                    <div className="w-[180px] font-serif text-sm font-medium text-[#e4d9c0] text-right pr-4">{g.name}</div>
                    <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden relative">
                      <div 
                        className="h-full rounded transition-all" 
                        style={{ 
                          width: `${(g.H / 1000) * 100}%`,
                          backgroundColor: isHarmonious ? "#4caf7d" : g.H >= 350 ? "#e8a84c" : "#c94c4c"
                        }}
                      ></div>
                    </div>
                    <div className="w-[60px] font-mono text-sm text-right text-teal-400">{g.js}</div>
                    <div className="w-[120px] text-xs font-mono text-[#8898aa] truncate">{g.char}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: COMPOSERS */}
        {activeTab === "composers" && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-3 text-[#c9a84c]">Composer / Artist</th>
                    <th className="p-3 text-[#c9a84c]">Hawkins Calibration</th>
                    <th className="p-3 text-[#c9a84c]">Computed J/S</th>
                    <th className="p-3 text-[#c9a84c]">Ω Order</th>
                    <th className="p-3 text-[#c9a84c]">Prime Landmark Creation</th>
                    <th className="p-3 text-[#c9a84c]">Metemphysical Translation</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPOSERS.map((c) => (
                    <tr 
                      key={c.name}
                      onClick={() => onSendPrompt(`Describe the metemphysical work and J/S frequency of ${c.name}`)}
                      className={`hover:bg-white/5 cursor-pointer border-b border-white/5 ${c.H >= 700 ? "bg-[#c9a84c]/5" : ""}`}
                    >
                      <td className="p-3 text-sm font-semibold text-[#ffd700]">{c.name}</td>
                      <td className="p-3 text-center">{c.H}</td>
                      <td className="p-3 text-teal-300 font-bold">{c.js}</td>
                      <td className="p-3 text-[#e8d5a3]">{c.omega}</td>
                      <td className="p-3 text-xs text-[#8898aa]">{c.work}</td>
                      <td className="p-3 text-xs text-[#8898aa] max-w-xs">{c.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: BRAINWAVES */}
        {activeTab === "brainwaves" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4 text-center">
                <h4 className="font-serif text-sm text-[#e8d5a3] mb-1">Theta State (4–8 Hz)</h4>
                <div className="font-mono text-xl font-bold text-teal-400 my-1">J/S = 35.35</div>
                <p className="text-xs text-[#8898aa] leading-relaxed">
                  Deep meditation, REM sleep, spiritual vision. Aligns with the Sage/Mystical Clarity range.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4 text-center">
                <h4 className="font-serif text-sm text-[#e8d5a3] mb-1">Alpha State (8–12 Hz)</h4>
                <div className="font-mono text-xl font-bold text-teal-400 my-1">J/S = 2.38</div>
                <p className="text-xs text-[#8898aa] leading-relaxed">
                  Relaxed focus, learning, flow. Aligns with the eudaimonia/Joy threshold.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4 text-center">
                <h4 className="font-serif text-sm text-[#e8d5a3] mb-1">Gamma State (30–100 Hz)</h4>
                <div className="font-mono text-xl font-bold text-teal-400 my-1">J/S = 126.68</div>
                <p className="text-xs text-[#8898aa] leading-relaxed">
                  Peak cognitive binding, transcendent clarity, ultimate self-reference.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-3 text-[#c9a84c]">Brainwave System</th>
                    <th className="p-3 text-[#c9a84c]">Frequency Range</th>
                    <th className="p-3 text-[#c9a84c]">J/S Value</th>
                    <th className="p-3 text-[#c9a84c]">Ω Order</th>
                    <th className="p-3 text-[#c9a84c]">Entraining Sound Architecture</th>
                    <th className="p-3 text-[#c9a84c]">Metemphysics Synthesis</th>
                  </tr>
                </thead>
                <tbody>
                  {BRAINWAVES.map((b) => (
                    <tr 
                      key={b.name}
                      onClick={() => onSendPrompt(`What is the role of ${b.name} brainwaves in Metemphysics focus?`)}
                      className="hover:bg-white/5 cursor-pointer border-b border-white/5"
                    >
                      <td className="p-3 text-sm font-semibold text-[#e4d9c0]">{b.name}</td>
                      <td className="p-3 text-[#8898aa]">{b.hz}</td>
                      <td className="p-3 text-teal-400 font-bold">{b.js}</td>
                      <td className="p-3 text-[#e8d5a3]">{b.omega}</td>
                      <td className="p-3 text-[#8898aa]">{b.music}</td>
                      <td className="p-3 text-xs text-[#8898aa]">{b.meta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: FINDINGS */}
        {activeTab === "findings" && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#e8d5a3] tracking-wide mb-2 text-center uppercase">CONVERGENCE REALIZATIONS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FINDINGS.map((f) => (
                <div key={f.n} className="bg-[#0d0d0d]/60 border border-orange-500/15 rounded-lg p-5">
                  <div className="font-mono text-xs text-[#c9a84c] mb-1">REALIZATION #{f.n}</div>
                  <h4 className="font-serif text-sm font-bold text-[#e8d5a3] mb-2">{f.title}</h4>
                  <p className="text-xs text-[#8898aa] leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
