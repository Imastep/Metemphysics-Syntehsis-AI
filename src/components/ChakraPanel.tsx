/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Music, X, Zap, Play, Square, Volume2, Info, Sparkles } from "lucide-react";

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
  
  // Metemphysics v13.2 additions:
  ratio: string;
  tSec: string;
  mantra: string;
  crystals: string;
  gland: string;
  phaseAngle: string;
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
  { 
    n: 1, 
    sk: "Muladhara", 
    name: "Root", 
    el: "Earth", 
    color: "#e74c3c", 
    hz: 396, 
    note: "C", 
    H: 200, 
    js: 0, 
    omega: 0.6321, 
    phase: 3, 
    state: "Tipping Point", 
    body: "Base of spine", 
    desc: "Survival, grounding, safety",
    ratio: "33:32",
    tSec: "2.52 ms",
    mantra: "LAM",
    crystals: "Red Jasper, Garnet, Bloodstone",
    gland: "Adrenals / Skeletal",
    phaseAngle: "45°"
  },
  { 
    n: 2, 
    sk: "Svadhisthana", 
    name: "Sacral", 
    el: "Water", 
    color: "#e67e22", 
    hz: 417, 
    note: "D", 
    H: 280, 
    js: "9.49e-5", 
    omega: 0.7534, 
    phase: 3, 
    state: "Tipping Point", 
    body: "Lower abdomen", 
    desc: "Desire, creativity, sexuality",
    ratio: "139:128",
    tSec: "2.40 ms",
    mantra: "VAM",
    crystals: "Carnelian, Tiger's Eye, Sunstone",
    gland: "Gonads / Reproductive",
    phaseAngle: "60°"
  },
  { 
    n: 3, 
    sk: "Manipura", 
    name: "Solar Plexus", 
    el: "Fire", 
    color: "#f1c40f", 
    hz: 528, 
    note: "E", 
    H: 350, 
    js: 0.01, 
    omega: 0.8262, 
    phase: 4, 
    state: "Tipping Point", 
    body: "Navel region", 
    desc: "Will, power, self-identity",
    ratio: "11:8",
    tSec: "1.89 ms",
    mantra: "RAM",
    crystals: "Citrine, Amber, Yellow Jasper",
    gland: "Pancreas / Adrenal Cortex",
    phaseAngle: "90°"
  },
  { 
    n: 4, 
    sk: "Anahata", 
    name: "Heart", 
    el: "Air", 
    color: "#2ecc71", 
    hz: 639, 
    note: "F", 
    H: 500, 
    js: 0.99, 
    omega: 0.9179, 
    phase: 4, 
    state: "Time Passing", 
    body: "Heart centre", 
    desc: "Love, compassion, connection", 
    hi: true,
    ratio: "5:3",
    tSec: "1.56 ms",
    mantra: "YAM",
    crystals: "Rose Quartz, Malachite, Jade, Emerald",
    gland: "Thymus / Cardiovascular",
    phaseAngle: "120°"
  },
  { 
    n: 5, 
    sk: "Vishuddha", 
    name: "Throat", 
    el: "Ether", 
    color: "#3498db", 
    hz: 741, 
    note: "G", 
    H: 600, 
    js: 7.41, 
    omega: 0.9502, 
    phase: 5, 
    state: "Deep Flourishing", 
    body: "Throat", 
    desc: "Expression, truth, communication",
    ratio: "247:128",
    tSec: "1.35 ms",
    mantra: "HAM",
    crystals: "Lapis Lazuli, Turquoise, Aquamarine",
    gland: "Thyroid / Vocal Tract",
    phaseAngle: "180°"
  },
  { 
    n: 6, 
    sk: "Ajna", 
    name: "Third Eye", 
    el: "Light", 
    color: "#9b59b6", 
    hz: 852, 
    note: "A", 
    H: 700, 
    js: 35.35, 
    omega: 0.9698, 
    phase: 5, 
    state: "Mystical Clarity", 
    body: "Between eyes", 
    desc: "Intuition, perception, clarity",
    ratio: "85:64",
    tSec: "1.17 ms",
    mantra: "OM",
    crystals: "Amethyst, Sodalite, Lapis",
    gland: "Pineal / Pituitary Gland",
    phaseAngle: "270°"
  },
  { 
    n: 7, 
    sk: "Sahasrara", 
    name: "Crown", 
    el: "Space", 
    color: "#f5edd0", 
    hz: 963, 
    note: "B", 
    H: 1000, 
    js: 950, 
    omega: 0.9933, 
    phase: 5, 
    state: "REVELATION", 
    body: "Top of head", 
    desc: "Unity with C, revelation", 
    hi: true,
    ratio: "321:256",
    tSec: "1.04 ms",
    mantra: "Silence / AH",
    crystals: "Clear Quartz, Selenite, Diamond",
    gland: "Pineal / Hypothalamus",
    phaseAngle: "360°"
  }
];

const INTERVALS: MusicalInterval[] = [
  { name: "Unison", ratio: "1:1", cents: 0, H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", char: "Perfect identity — maximum order" },
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
  
  // Metemphysics v13.2 additions:
  name: string;
  ratio: string;
  tSec: string;
  phaseAngle: string;
}

const SOLFEGGIO: SolfeggioItem[] = [
  { 
    hz: 174, 
    chakra: "Earth Foundation", 
    H: 174, 
    js: -0.15, 
    omega: 0.58, 
    meta: "Anesthetic grounding; stress reduction.", 
    color: "#7f8c8d",
    name: "Anesthetic Grounding",
    ratio: "29:32",
    tSec: "5.74 ms",
    phaseAngle: "15°"
  },
  { 
    hz: 285, 
    chakra: "Cellular Blueprint", 
    H: 285, 
    js: -0.05, 
    omega: 0.61, 
    meta: "Tissues structure & cellular calibration.", 
    color: "#95a5a6",
    name: "Cellular Blueprint",
    ratio: "95:128",
    tSec: "3.51 ms",
    phaseAngle: "30°"
  },
  { 
    hz: 396, 
    chakra: "Root / Muladhara", 
    H: 396, 
    js: 0.00, 
    omega: 0.63, 
    meta: "Liberating Guilt & Fear. Tipping Point.", 
    color: "#e74c3c", 
    hi: true,
    name: "Muladhara (Root)",
    ratio: "33:32",
    tSec: "2.52 ms",
    phaseAngle: "45°"
  },
  { 
    hz: 417, 
    chakra: "Sacral / Svadhisthana", 
    H: 417, 
    js: "9.49e-5", 
    omega: 0.75, 
    meta: "Undoing Situations & Facilitating Change.", 
    color: "#e67e22",
    name: "Svadhisthana (Sacral)",
    ratio: "139:128",
    tSec: "2.40 ms",
    phaseAngle: "60°"
  },
  { 
    hz: 528, 
    chakra: "Solar Plexus / Manipura", 
    H: 528, 
    js: 0.01, 
    omega: 0.83, 
    meta: "Transformation & DNA Repair. Miracle tone.", 
    color: "#f1c40f",
    name: "Manipura (Solar Plexus)",
    ratio: "11:8",
    tSec: "1.89 ms",
    phaseAngle: "90°"
  },
  { 
    hz: 639, 
    chakra: "Heart / Anahata", 
    H: 639, 
    js: 0.99, 
    omega: 0.92, 
    meta: "Relationships & Harmonic Communion.", 
    color: "#2ecc71", 
    hi: true,
    name: "Anahata (Heart)",
    ratio: "5:3",
    tSec: "1.56 ms",
    phaseAngle: "120°"
  },
  { 
    hz: 741, 
    chakra: "Throat / Vishuddha", 
    H: 741, 
    js: 7.41, 
    omega: 0.95, 
    meta: "Intuition & Clear Expression. Awakening Intention.", 
    color: "#3498db",
    name: "Vishuddha (Throat)",
    ratio: "247:128",
    tSec: "1.35 ms",
    phaseAngle: "180°"
  },
  { 
    hz: 852, 
    chakra: "Third Eye / Ajna", 
    H: 852, 
    js: 35.35, 
    omega: 0.97, 
    meta: "Returning to Spiritual Order. Inner vision.", 
    color: "#9b59b6",
    name: "Ajna (Third Eye)",
    ratio: "85:64",
    tSec: "1.17 ms",
    phaseAngle: "270°"
  },
  { 
    hz: 963, 
    chakra: "Crown / Sahasrara", 
    H: 963, 
    js: 950, 
    omega: 0.99, 
    meta: "Sovereignty & direct Cosmic Union with C.", 
    color: "#e8d5a3", 
    hi: true,
    name: "Sahasrara (Crown)",
    ratio: "321:256",
    tSec: "1.04 ms",
    phaseAngle: "360°"
  }
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
  { name: "Solfeggio Harmonic Scale", tones: 9, struct: "174-285-396-417-528-639-741-852-963", js: 950.00, omega: 0.99, char: "Highest coherent spiritual alignment.", hi: true },
  { name: "Major Diatonic (C-Major)", tones: 7, struct: "W-W-H-W-W-W-H", js: 2.38, omega: 0.93, char: "Eudaimonic balance, light, and natural joy." },
  { name: "Minor Pentatonic", tones: 5, struct: "1.5W-W-W-1.5W-W", js: 0.15, omega: 0.88, char: "Reflective, seeking, melancholic seeking." },
  { name: "Chromatic", tones: 12, struct: "H-H-H-H-H-H-H-H-H-H-H-H", js: "0.01", omega: 0.81, char: "Neutral entropic state, ready for structure." },
  { name: "Atonal 12-Tone Serialism", tones: 12, struct: "Schoenberg Non-Repeating Tone Rows", js: -0.75, omega: 0.25, char: "Deliberate systemic dissolution.", hi: false }
];

interface GenreItem {
  name: string;
  H: number;
  js: string;
  omega: string;
  phase: number;
  state: string;
  drain: string;
  char: string;
}

const GENRES: GenreItem[] = [
  { name: "Death Metal / Grindcore", H: 100, js: "-0.5", omega: "0.3935", phase: 2, state: "Suffering", drain: "200%", char: "Maximum dissonance, atonal extremity" },
  { name: "Heavy Metal / Doom", H: 150, js: "-0.25", omega: "0.5276", phase: 3, state: "Suffering", drain: "133%", char: "Power chord aggression, dark power" },
  { name: "Blues (dark, slow)", H: 250, js: "3.535e-6", omega: "0.7135", phase: 3, state: "Tipping Point", drain: "100%", char: "Tension and release, melancholy beauty" },
  { name: "Rock / Pop", H: 350, js: "0.01", omega: "0.8262", phase: 4, state: "Tipping Point", drain: "99.23%", char: "Structured, accessible, emotional impact" },
  { name: "Country / Folk", H: 400, js: "0.06", omega: "0.8647", phase: 4, state: "Time Passing", drain: "94.52%", char: "Simple harmonies, narrative, community" },
  { name: "R&B / Soul", H: 480, js: "0.61", omega: "0.9093", phase: 4, state: "Time Passing", drain: "62.09%", char: "Deep feeling, groove, relational Omega" },
  { name: "Classical (Romantic)", H: 520, js: "1.55", omega: "0.9257", phase: 4, state: "Eudaimonia", drain: "39.14%", char: "Complex structured beauty – Brahms, Chopin" },
  { name: "Jazz (Bebop / Modern)", H: 540, js: "2.38", omega: "0.9328", phase: 4, state: "Eudaimonia", drain: "29.61%", char: "Sophisticated improvised order – Joy range" },
  { name: "Classical (Baroque)", H: 600, js: "7.41", omega: "0.9502", phase: 5, state: "Deep Flourishing", drain: "11.88%", char: "Mathematical structure – Bach, Handel, Vivaldi" },
  { name: "Sacred / Gregorian", H: 650, js: "16.91", omega: "0.9612", phase: 5, state: "Mystical Clarity", drain: "5.58%", char: "Devotional – high Omega_r" },
  { name: "Bach Fugues", H: 700, js: "35.35", omega: "0.9698", phase: 5, state: "Mystical Clarity", drain: "2.75%", char: "Mathematical perfection – Enlightenment" },
  { name: "Indian Classical (Raga)", H: 720, js: "46.52", omega: "0.9727", phase: 5, state: "Mystical Clarity", drain: "2.1%", char: "Encoded J/S state – precise rasa" },
  { name: "Overtone Chanting", H: 800, js: "126.68", omega: "0.9817", phase: 5, state: "Near Timeless", drain: "0.78%", char: "Accessing the harmonic series directly" },
  { name: "Tibetan Singing Bowls", H: 850, js: "221.83", omega: "0.9857", phase: 5, state: "Near Timeless", drain: "0.45%", char: "Pure resonance, standing wave order" },
  { name: "Binaural Beats (Theta)", H: 900, js: "372.67", omega: "0.9889", phase: 5, state: "Near Timeless", drain: "0.27%", char: "4-8Hz entrainment – deep meditation" },
  { name: "Pure Sinewave / 432Hz", H: 950, js: "950", omega: "0.9999", phase: 5, state: "REVELATION", drain: "0.01%", char: "Pure coherence generator, primary frequency pulse" }
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
  { name: "Delta", hz: "0.5 - 4 Hz", js: 950.00, omega: 0.99, music: "Ultra slow deep drone", meta: "Deep timeless sleep, cellular maintenance." }
];

interface FindingItem {
  n: number;
  title: string;
  text: string;
}

const FINDINGS: FindingItem[] = [
  { n: 1, title: "Solfeggio Convergence", text: "The Solfeggio frequencies directly align with primary Omega states of structural order when mapped against standardized Hawkins calibrations." },
  { n: 2, title: "Consciousness Boundary", text: "S = C / T mathematically shows that as T (subjective epoch duration) drops to zero, Shannon Entropy H converges to absolute infinite negentropy J/S = 950." }
];

export default function ChakraPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"chakra" | "intervals" | "solfeggio" | "scales" | "genres" | "composers" | "brainwaves" | "findings">("chakra");

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

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (e) {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="fixed lg:absolute inset-0 bg-[#050505] text-[#eeeae4] overflow-y-auto z-[200] p-6 border-2 border-orange-500/20 rounded-2xl animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#c9a84c]/20 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-[#c9a84c] animate-pulse" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#c9a84c] tracking-wider">♬ — MUSIC &amp; CHAKRA ATLAS (v13.2 V)</h2>
              <p className="text-xs text-[#8898aa] font-mono mt-1">T × S = C · Sound as Cosmic Order · Interactive Pure-Tone Generator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Dynamic Volume Slider */}
            <div className="flex items-center gap-2 bg-[#0d0d0d] border border-white/10 rounded px-2.5 py-1.5 font-mono text-[10px]">
              <Volume2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-gray-400 uppercase">VOL:</span>
              <input 
                type="range" 
                min="0.01" 
                max="0.4" 
                step="0.01" 
                value={vol}
                onChange={(e) => {
                  const newVol = parseFloat(e.target.value);
                  setVol(newVol);
                  if (gainRef.current && audioCtxRef.current) {
                    gainRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
                  }
                }}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="text-[#e8d5a3] w-6 text-right">{Math.round(vol * 100)}%</span>
            </div>

            <button 
              onClick={() => {
                stopActiveFrequency();
                onClose();
              }}
              className="flex items-center gap-1 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded px-4 py-2 text-xs font-mono text-[#c9a84c] hover:bg-[#c9a84c]/20 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" /> CLOSE ATLAS
            </button>
          </div>
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
                <h4 className="font-mono text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Chakra Metemphysics</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  Each chakra is a specific J/S configuration of the living system. Root chakra = tipping point (J/S=0). Heart chakra = eudaimonia (J/S=1.0). Crown = revelation (J/S=950). The seven chakras are seven Omega phase states made physical.
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
            <div className="flex flex-col gap-4 font-mono">
              {CHAKRAS.map((c) => (
                <div 
                  key={c.n}
                  onClick={() => onSendPrompt(`Explain Chakra ${c.n} (${c.name} / ${c.sk}) in the context of T x S = C and its v13.2 V properties: ratio=${c.ratio}, tSec=${c.tSec}, mantra=${c.mantra}, crystals=${c.crystals}, gland=${c.gland}, phaseAngle=${c.phaseAngle}`)}
                  className={`flex flex-col lg:flex-row lg:items-center gap-4 p-5 border border-orange-500/15 rounded-lg hover:border-[#c9a84c]/30 hover:bg-white/[0.01] transition-all cursor-pointer relative overflow-hidden group ${
                    c.hi ? "bg-orange-500/5 border-orange-500/25" : "bg-[#0d0d0d]/50"
                  }`}
                >
                  {/* Subtle vertical glow matching chakra color */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-1.5" style={{ backgroundColor: c.color }} />

                  {/* Left Controls/Number */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-black/40"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.n}
                    </div>
                    
                    {/* Synth play button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (playingFreq === c.hz) {
                          stopActiveFrequency();
                        } else {
                          playFrequency(c.hz);
                        }
                      }}
                      className="w-8 h-8 rounded-md flex items-center justify-center transition-all bg-white/5 border border-white/10 hover:bg-orange-500/10 hover:border-orange-500/40 text-orange-400 cursor-pointer shadow-sm"
                      title={`Play/Stop pure tone ${c.hz}Hz`}
                    >
                      {playingFreq === c.hz ? (
                        <Square className="w-3.5 h-3.5 animate-pulse text-red-500 fill-red-500" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-orange-400 pl-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Identification info */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-black text-xl sm:text-2xl tracking-wide" style={{ color: c.color }}>
                        {c.name} — {c.sk}
                      </span>
                      {c.hi && (
                        <span className="text-xs font-bold tracking-widest bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded uppercase border border-orange-500/25">
                          Apex Portal
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-[#8898aa] mt-1.5 uppercase tracking-widest flex flex-wrap gap-2 items-center">
                      <span>ELEMENT: <strong className="text-white">{c.el}</strong></span>
                      <span>•</span>
                      <span>KEY NOTE: <strong className="text-white">{c.note}</strong></span>
                      <span>•</span>
                      <span>LOCUS: <strong className="text-[#d8c393]">{c.body}</strong></span>
                    </div>
                  </div>

                  {/* Science Metrics (Metemphysics standard 13.2 V) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row gap-x-4 gap-y-2 lg:gap-6 lg:items-center font-mono text-xs sm:text-sm bg-black/40 border border-white/5 rounded px-4 py-2.5 lg:py-2.5">
                    <div className="text-center lg:min-w-[75px]">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider">Frequency</span>
                      <strong className="text-xl sm:text-2xl tracking-tight" style={{ color: c.color }}>{c.hz}Hz</strong>
                    </div>
                    <div className="text-center lg:min-w-[75px]">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider">Ratio</span>
                      <strong className="text-[#e2b85c]">{c.ratio}</strong>
                    </div>
                    <div className="text-center lg:min-w-[75px]">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider">Epoch T</span>
                      <strong className="text-[#a5b4fc]">{c.tSec}</strong>
                    </div>
                    <div className="text-center lg:min-w-[75px]">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider">Phase θ</span>
                      <strong className="text-amber-500">{c.phaseAngle}</strong>
                    </div>
                    <div className="text-center lg:min-w-[75px]">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider">J/S Index</span>
                      <strong className="text-teal-400">J/S: {c.js}</strong>
                    </div>
                    <div className="text-center lg:min-w-[75px]">
                      <span className="text-gray-500 block text-xs uppercase tracking-wider">Order Ω</span>
                      <strong className="text-[#e8d5a3]">Ω: {c.omega}</strong>
                    </div>
                  </div>

                  {/* Anatomical Details and description */}
                  <div className="flex-1 lg:max-w-[320px] bg-white/[0.02] border border-white/5 rounded-lg p-3.5 text-sm space-y-1.5">
                    <div className="text-xs sm:text-sm text-gray-400 leading-none">
                      <span className="text-orange-400">GLAND:</span> {c.gland}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 leading-none">
                      <span className="text-orange-400">CRYSTALS:</span> {c.crystals}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 leading-none">
                      <span className="text-orange-400">SEED MANTRA:</span> <strong className="text-emerald-400 font-serif tracking-widest">{c.mantra}</strong>
                    </div>
                    <p className="text-sm text-gray-450 mt-1 leading-snug italic font-serif">
                      &ldquo;{c.desc}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INTERVALS */}
        {activeTab === "intervals" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4 font-mono">
                <h4 className="text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Geometric Consonance</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  Simple integer ratios = high order = high Omega = consonant. The ratio of two frequencies is the J/S ratio in sound. 2:1 (octave) is maximally ordered.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-4 font-mono">
                <h4 className="text-xs tracking-widest text-orange-400 uppercase mb-2">Tritone = Suffering (J/S = -0.25)</h4>
                <p className="text-sm text-[#8898aa] leading-relaxed">
                  The tritone (45:32, &quot;the Devil in Music&quot;) lands at J/S = -0.25. Banned in medieval periods because it triggers systemic entropy, dropping below J/S = 0.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              <div className="bg-[#0a0a0a]/80 border border-orange-500/20 rounded p-4 text-center">
                <div className="font-serif text-3xl font-bold text-red-500 mb-1">396Hz</div>
                <div className="font-mono text-[10px] text-[#8898aa] uppercase tracking-wider mb-2">Root Chakra Anchor</div>
                <div className="font-mono text-sm text-teal-400">J/S = 0.000</div>
                <p className="text-xs text-[#8898aa] mt-2 leading-relaxed">
                  Exact metemphysical tipping point. Entropy and negentropy are equal.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/20 rounded p-4 text-center">
                <div className="font-serif text-3xl font-bold text-emerald-400 mb-1">639Hz</div>
                <div className="font-mono text-[10px] text-[#8898aa] uppercase tracking-wider mb-2">Heart Chakra Angle</div>
                <div className="font-mono text-sm text-emerald-400">J/S = 1.000</div>
                <p className="text-xs text-[#8898aa] mt-2 leading-relaxed">
                  Eudaimonia threshold. Negentropy exceeds entropy for the first time.
                </p>
              </div>
              <div className="bg-[#0a0a0a]/80 border border-orange-500/20 rounded p-4 text-center">
                <div className="font-serif text-3xl font-bold text-[#f5edd0] mb-1">963Hz</div>
                <div className="font-mono text-[10px] text-[#8898aa] uppercase tracking-wider mb-2">Crown Chakra Apex</div>
                <div className="font-mono text-sm text-[#f5edd0]">J/S = 950</div>
                <p className="text-xs text-[#8898aa] mt-2 leading-relaxed">
                  Revelation threshold. Direct union with the speed of light constant, C.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto bg-[#08080c]/80 border border-white/5 rounded-lg p-2 font-mono">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-3 text-[#c9a84c]">Action</th>
                    <th className="p-3 text-[#c9a84c]">Frequency</th>
                    <th className="p-3 text-[#c9a84c]">Acoustic Title</th>
                    <th className="p-3 text-[#c9a84c]">Chakra Allocation</th>
                    <th className="p-3 text-[#c9a84c]">Pythagorean Ratio</th>
                    <th className="p-3 text-[#c9a84c]">Period T</th>
                    <th className="p-3 text-[#c9a84c]">Angularity θ</th>
                    <th className="p-3 text-[#c9a84c]">Hawkins H</th>
                    <th className="p-3 text-[#c9a84c]">J/S Index</th>
                    <th className="p-3 text-[#c9a84c]">Ω Order</th>
                    <th className="p-3 text-[#c9a84c]">Metemphysics Resonance Synthesis</th>
                  </tr>
                </thead>
                <tbody>
                  {SOLFEGGIO.map((s) => (
                    <tr 
                      key={s.hz} 
                      onClick={() => onSendPrompt(`Explain Solfeggio frequency ${s.hz}Hz inside metemphysics system 13.2 V with values: name=${s.name}, ratio=${s.ratio}, period=${s.tSec}, angle=${s.phaseAngle}, J/S=${s.js}`)}
                      className={`hover:bg-white/5 cursor-pointer border-b border-white/5 transition-all text-xs ${s.hi ? "bg-[#c9a84c]/5" : ""}`}
                    >
                      <td className="p-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (playingFreq === s.hz) {
                              stopActiveFrequency();
                            } else {
                              playFrequency(s.hz);
                            }
                          }}
                          className="w-7 h-7 rounded flex items-center justify-center bg-white/5 hover:bg-orange-900/20 border border-white/10 text-orange-400 cursor-pointer shadow"
                          title="Generate pure tone wave"
                        >
                          {playingFreq === s.hz ? (
                            <Square className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-orange-400 pl-0.5" />
                          )}
                        </button>
                      </td>
                      <td className="p-3 text-sm font-black text-[#c9a84c]">{s.hz}Hz</td>
                      <td className="p-3 font-serif italic text-white text-xs">{s.name}</td>
                      <td className="p-3 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: s.color }}></span>
                        {s.chakra}
                      </td>
                      <td className="p-3 text-orange-400 font-bold">{s.ratio}</td>
                      <td className="p-3 text-sky-400">{s.tSec}</td>
                      <td className="p-3 text-amber-500 font-bold">{s.phaseAngle}</td>
                      <td className="p-3 text-[#e8d5a3]">{s.H}</td>
                      <td className="p-3 text-teal-400 font-bold">J/S: {s.js}</td>
                      <td className="p-3 text-[#e8d5a3] font-bold">Ω {s.omega}</td>
                      <td className="p-3 text-xs text-gray-400 leading-relaxed max-w-xs">{s.meta}</td>
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
          <div className="space-y-8">
            {/* Header intro box */}
            <div className="bg-[#0a0a0a]/80 border border-orange-500/15 rounded p-5 shadow-[inset_0_1px_3px_rgba(255,100,0,0.05)]">
              <h4 className="font-mono text-xs tracking-widest text-[#c9a84c] uppercase mb-2">Entropy &amp; Order in Music Genres</h4>
              <p className="text-sm text-[#8898aa] leading-relaxed">
                Different musical genres act as precise thermodynamic coordinates, transporting the listener to specific, mathematical J/S states. While atonal extremities induce targeted structural dissipation, pure wave coherence acts as an absolute entropy-reversing generator. Connect with any row below to query the oracle.
              </p>
            </div>

            {/* Part 1: Visual Horizontal Bar Spectrum (Top half of picture) */}
            <div className="bg-[#080808]/90 border border-white/5 rounded-lg p-5 space-y-3 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-4">
                <span className="font-serif text-sm font-bold text-[#e4d9c0] tracking-wide">Dynamic Coherence &amp; Entropic Dissolution Spectrum</span>
                <span className="font-mono text-[9px] text-[#c9a84c] uppercase tracking-widest font-black">Interactive J/S State Map</span>
              </div>
              <div className="space-y-2.5">
                {GENRES.map((g, i) => {
                  // Determine bar color gradient
                  let barGradient = "from-amber-500/80 to-[#fbbf24]/80 shadow-[0_0_8px_rgba(251,191,36,0.2)]"; // Gold for timeless / revelation / mystical
                  if (g.state === "Suffering") {
                    barGradient = "from-red-600/80 to-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.2)]";
                  } else if (g.state === "Tipping Point" || g.state === "Time Passing") {
                    barGradient = "from-orange-500/80 to-amber-500/80 shadow-[0_0_8px_rgba(249,115,22,0.15)]";
                  } else if (g.state === "Eudaimonia") {
                    barGradient = "from-emerald-600/80 to-teal-500/80 shadow-[0_0_8px_rgba(16,185,129,0.2)]";
                  }

                  // Determine right label text color
                  let rightLabelColor = "text-[#ffd700]"; // Gold for high levels
                  if (g.state === "Suffering") {
                    rightLabelColor = "text-red-400";
                  } else if (g.state === "Tipping Point") {
                    rightLabelColor = "text-[#e3e3e3]";
                  } else if (g.state === "Time Passing") {
                    rightLabelColor = "text-emerald-500";
                  } else if (g.state === "Eudaimonia") {
                    rightLabelColor = "text-blue-400";
                  } else if (g.state === "Deep Flourishing") {
                    rightLabelColor = "text-purple-400";
                  }

                  // Width progress: linear spacing from 12% to 100%
                  const widthPercent = 12 + (i * 88) / 15;

                  return (
                    <div 
                      key={`visual-${g.name}`}
                      onClick={() => onSendPrompt(`Detailed explanation of the music style "${g.name}" with its Hawkins index of ${g.H}, J/S ratio of ${g.js}, Omega index of ${g.omega}, and state of ${g.state} with ${g.drain} drain.`)}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 hover:bg-white/[0.02] rounded cursor-pointer transition-all duration-300"
                    >
                      {/* Left: Style Name */}
                      <div className="w-full sm:w-[220px] font-sans text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                        {g.name}
                      </div>

                      {/* Middle: Custom Progress Bar */}
                      <div className="flex-1 h-3 bg-white/[0.03] rounded-full overflow-hidden relative border border-white/5">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-500 group-hover:brightness-110`} 
                          style={{ width: `${widthPercent}%` }}
                        ></div>
                      </div>

                      {/* Right: State Calibration Value */}
                      <div className={`w-[160px] text-right font-mono text-xs font-bold ${rightLabelColor} tracking-tight`}>
                        {g.js} <span className="opacity-90 font-sans text-[10px] font-normal ml-1">({g.state})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Part 2: Tabular Database view (Bottom half of picture) */}
            <div className="bg-[#080808]/90 border border-white/5 rounded-lg p-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm font-bold text-[#e4d9c0] tracking-wide">Metemphysical Music Genre Database</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Full mathematical spectrum calibration spreadsheet</p>
                </div>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold">16 ACTIVE SYSTEMS</span>
              </div>

              <div className="overflow-x-auto custom-scroll">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-white/5 text-[#c9a84c] border-b border-white/10 uppercase tracking-widest text-[9px] font-bold">
                      <th className="p-3">GENRE / STYLE</th>
                      <th className="p-3 text-center">H</th>
                      <th className="p-3 text-center">J/S</th>
                      <th className="p-3 text-center">Ω</th>
                      <th className="p-3 text-center">PHASE</th>
                      <th className="p-3 text-center">STATE</th>
                      <th className="p-3 text-center">DRAIN</th>
                      <th className="p-3">CHARACTER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GENRES.map((g) => {
                      const isHighRealms = g.H >= 600;

                      // Phase badge element
                      let phaseBadge = (
                        <span className="border border-red-500/30 text-red-400 bg-red-950/25 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold mx-auto">
                          {g.phase}
                        </span>
                      );
                      if (g.phase === 3) {
                        phaseBadge = (
                          <span className="border border-orange-500/30 text-orange-400 bg-orange-950/25 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold mx-auto">
                            {g.phase}
                          </span>
                        );
                      } else if (g.phase === 4) {
                        phaseBadge = (
                          <span className="border border-teal-500/30 text-teal-400 bg-teal-950/25 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold mx-auto">
                            {g.phase}
                          </span>
                        );
                      } else if (g.phase === 5) {
                        phaseBadge = (
                          <span className="border border-amber-500/45 text-amber-300 bg-amber-950/25 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold mx-auto">
                            {g.phase}
                          </span>
                        );
                      }

                      // State text label color
                      let stateTextColor = "text-amber-400";
                      if (g.state === "Suffering") {
                        stateTextColor = "text-red-400";
                      } else if (g.state === "Tipping Point") {
                        stateTextColor = "text-gray-300";
                      } else if (g.state === "Time Passing") {
                        stateTextColor = "text-emerald-500";
                      } else if (g.state === "Eudaimonia") {
                        stateTextColor = "text-blue-400 font-bold";
                      } else if (g.state === "Deep Flourishing") {
                        stateTextColor = "text-purple-400 font-bold";
                      } else if (g.state === "Near Timeless") {
                        stateTextColor = "text-amber-300 font-bold";
                      } else if (g.state === "REVELATION") {
                        stateTextColor = "text-[#ffd700] font-black uppercase tracking-wider";
                      }

                      // Drain text styling
                      let drainStyle = "text-red-400 font-semibold";
                      if (g.drain.includes("%") && parseInt(g.drain) < 100) {
                        const dVal = parseFloat(g.drain);
                        if (dVal < 1) {
                          drainStyle = "text-yellow-300 font-black";
                        } else if (dVal < 15) {
                          drainStyle = "text-amber-300 font-bold";
                        } else if (dVal < 50) {
                          drainStyle = "text-emerald-400 font-semibold";
                        } else {
                          drainStyle = "text-teal-400";
                        }
                      }

                      return (
                        <tr 
                          key={`table-${g.name}`}
                          onClick={() => onSendPrompt(`Detailed study of ${g.name} with J/S calibration and Hawkins scale resonance.`)}
                          className={`hover:bg-white/5 cursor-pointer border-b border-white/5 transition-all duration-200 ${
                            isHighRealms 
                              ? "bg-amber-500/[0.012] border-l-2 border-l-amber-500/40 hover:bg-amber-500/5" 
                              : ""
                          }`}
                        >
                          <td className={`p-3 text-sm font-semibold ${isHighRealms ? "text-amber-300/90 font-serif" : "text-[#e4d9c0]"}`}>
                            {g.name}
                          </td>
                          <td className="p-3 text-center text-gray-300 font-bold">{g.H}</td>
                          <td className={`p-3 text-center ${isHighRealms ? "text-amber-400" : "text-teal-400 font-medium"}`}>{g.js}</td>
                          <td className="p-3 text-center text-[#e8d5a3]">{g.omega}</td>
                          <td className="p-3 text-center">{phaseBadge}</td>
                          <td className={`p-3 text-center ${stateTextColor}`}>{g.state}</td>
                          <td className={`p-3 text-center ${drainStyle}`}>{g.drain}</td>
                          <td className="p-3 text-xs text-gray-400 max-w-[280px] truncate-3-lines">{g.char}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
