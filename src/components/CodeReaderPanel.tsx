/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, FileDown, RefreshCw, MessageSquare } from "lucide-react";
import { jsPDF } from "jspdf";

interface ReadingResult {
  code: string;
  name: string;
  T_sec: string;
  T_years: string;
  om: string;
  phase: string;
  js: string;
  js_state: string;
  sol: number;
  core: number;
  core_name: string;
  chakra: number | string;
  brainwave: string;
  shannon: string;
  fib: string;
  aiData: any;
}

export default function CodeReaderPanel({ onClose, onLaunchChat }: { onClose: () => void; onLaunchChat: (prompt: string) => void }) {
  const [codeVal, setCodeVal] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [readingResult, setReadingResult] = useState<ReadingResult | null>(null);

  const C_LIGHT = 299792458;
  const CR_PHI = 1.6180339887;

  const cpPhase = (om: number): [number, string] => {
    if (om <= 0.001) return [0, "Entropic Void"];
    if (om <= 0.2) return [1, "Proto-Order"];
    if (om <= 0.5) return [2, "Material Order"];
    if (om <= 0.8) return [3, "Living Order"];
    if (om <= 0.95) return [4, "Conscious Order"];
    return [5, "Transcendent"];
  };

  const crDsum = (s: string) => {
    return s.replace(/\D/g, "").split("").reduce((a, d) => a + parseInt(d), 0);
  };

  const crRed1 = (n: number) => {
    while (n > 9) {
      n = crDsum(String(n));
    }
    return n;
  };

  const crShannonH = (sCode: string) => {
    const digs = sCode.replace(/[^0-9]/g, "").split("").map(Number);
    const n = digs.length;
    if (n === 0) return 0;
    const c: Record<number, number> = {};
    digs.forEach((d) => { c[d] = (c[d] || 0) + 1; });
    let H = 0;
    Object.values(c).forEach((v) => {
      const p = v / n;
      H -= p * Math.log2(p);
    });
    return H;
  };

  const crFibNearest = (n: number) => {
    let a = 1, b = 1;
    while (b < n) {
      const t = a + b;
      a = b;
      b = t;
    }
    const ratio = b / a;
    const dev = Math.abs(ratio - CR_PHI);
    return { lo: a, hi: b, ratio: parseFloat(ratio.toFixed(4)), dev: parseFloat(dev.toFixed(4)) };
  };

  const crGetCounts = (digits: number[]) => {
    const c: Record<number, number> = {};
    digits.forEach((d) => { c[d] = (c[d] || 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1]);
  };

  const hToJS = (H: number) => {
    if (H < 200) return (H / 200) - 1;
    return 949 * Math.pow((H - 200) / 800, 7);
  };

  const jsState = (j: number) => {
    if (j >= 949) return "REVELATION";
    if (j >= 99) return "Near Timeless";
    if (j >= 10) return "Mystical Clarity";
    if (j >= 3) return "Deep Flourishing";
    if (j >= 1) return "Eudaimonia";
    if (j >= -0.05) return "Tipping Point";
    if (j >= -0.5) return "Suffering";
    return "Despair";
  };

  const crRunCalc = (sCode: string) => {
    const cleanDigits = sCode.replace(/[^0-9]/g, "").split("").map(Number);
    const rsum = cleanDigits.reduce((a, b) => a + b, 0);
    const core = crRed1(rsum);
    const counts = crGetCounts(cleanDigits);
    const zeros = (sCode.match(/0/g) || []).length;
    const val = parseFloat(sCode);
    const T = C_LIGHT / val;
    const fib = crFibNearest(val);
    const H = crShannonH(sCode);

    const SOL: Record<number, number> = { 1: 963, 2: 417, 3: 528, 4: 639, 5: 741, 6: 528, 7: 852, 8: 396, 9: 963 };
    const CHK: Record<number, number | string> = { 1: 7, 2: 2, 3: 3, 4: 4, 5: 5, 6: 4, 7: 6, 8: "all", 9: 7 };
    const WAVE: Record<number, string> = { 1: "Gamma (40-100 Hz)", 2: "Theta/Delta", 3: "Alpha/Theta", 4: "Alpha (8-13 Hz)", 5: "Beta (12-30 Hz)", 6: "Alpha (8-13 Hz)", 7: "Theta (4-8 Hz)", 8: "High Beta/Gamma", 9: "Theta/Delta" };
    const NAMES: Record<number, string> = { 1: "The Originator", 2: "The Partner", 3: "The Creator", 4: "The Builder", 5: "The Free Spirit", 6: "The Nurturer", 7: "The Mystic", 8: "The Infinite", 9: "The Sage" };

    return {
      digs: cleanDigits,
      rsum,
      core,
      counts,
      zeros,
      val,
      T,
      fib,
      H,
      ns: {
        sol: SOL[core] || 639,
        chk: CHK[core] || 4,
        wave: WAVE[core] || "Alpha",
        name: NAMES[core] || "The Seeker"
      }
    };
  };

  const crGenerateReading = (sCode: string, name: string, r: any) => {
    const val = r.val;
    const sol = r.ns.sol;
    const T_sec = r.T;
    const T_yr = (T_sec / 31557600).toFixed(2);
    const H = r.H;
    const core = r.core;
    const coreName = r.ns.name;
    const wave = r.ns.wave;
    const fib = r.fib;
    const digs = r.digs;
    const rsum = r.rsum;
    const zeros = r.zeros;
    const counts = r.counts;
    const om_sol = Math.min(0.9999, 1 - Math.exp(-sol / 200));
    const js_v = hToJS(sol);
    const jss = jsState(js_v);
    const phiHarmonic = (val * 1.6180339887).toPrecision(8);
    const T_days = Math.floor(T_sec / 86400).toLocaleString();
    const dominant = counts[0] ? counts[0][0] : digs[0];
    const domCount = counts[0] ? counts[0][1] : 1;
    const secondary = counts[1] ? counts[1][0] : null;
    const displayName = name && name.trim() ? name.trim() : "this soul";

    const CORE_ESSENCE: Record<number, string> = {
      1: "The universe placed a flame at the centre of this soul and called it will.",
      2: "Between two points, connection. Between two worlds, this soul stands as the bridge.",
      3: "Before the word, there was frequency. This soul is the frequency that became a voice.",
      4: "The foundation does not seek applause — it holds the weight of everything that rises above it.",
      5: "Freedom is not the absence of structure. It is the ability to move through all structures without being trapped by any.",
      6: "The one who loves deeply enough changes the gravitational field of every room they enter.",
      7: "What others call mystery, this soul calls home. The unseen is the only place they have ever fully lived.",
      8: "The Infinite does not borrow power. It generates it — and the generation never stops.",
      9: "At the end of all numbers, there is a return to origin. This soul has been to the origin. They are making their way back with everything they found there."
    };

    const CORE_PLANETS: Record<number, string> = {1:'the Sun and Mars',2:'the Moon and Venus',3:'Jupiter and Mercury',4:'Uranus and Saturn',5:'Mercury and Venus',6:'Venus and Neptune',7:'Neptune and the Moon',8:'Saturn and Pluto',9:'Mars and Jupiter'};
    const CORE_SIGNS: Record<number, string> = {1:'Aries and Leo',2:'Cancer and Libra',3:'Sagittarius and Gemini',4:'Aquarius and Capricorn',5:'Gemini and Virgo',6:'Taurus and Libra',7:'Pisces and Cancer',8:'Capricorn and Scorpio',9:'Aries and Sagittarius'};
    const CORE_HOUSE: Record<number, string> = {1:'First (Self and Identity)',2:'Second and Seventh (Value and Partnership)',3:'Third and Ninth (Mind and Expansion)',4:'Fourth and Tenth (Foundation and Legacy)',5:'Third and Fifth (Communication and Creativity)',6:'Second and Seventh (Love and Value)',7:'Twelfth (Hidden Depths)',8:'Eighth and Tenth (Death, Rebirth and Power)',9:'Ninth (Philosophy and Long Journey)'};
    const CORE_ELEMENT: Record<number, string> = {1:'Fire (primary) — Leo quality, pure solar ignition',2:'Water and Air — emotional intelligence meeting intellectual clarity',3:'Fire and Air — the combination that makes language luminous',4:'Air and Earth — visionary grounded in the physical world',5:'Air (primary) — Mercury-ruled, light and quick as thought itself',6:'Earth and Air — the nurturer who thinks before they feel and feels before they speak',7:'Water (primary) — the deep, the still, the fathomlessly perceptive',8:'Earth and Water — the tectonic: slow to move, impossible to stop',9:'Fire and Water — the paradox that purifies'};
    const CORE_TIME: Record<number, string> = {1:'Noon — the hour of maximum solar exposure, no shadow anywhere',2:'Dusk — the threshold hour when day yields to night',3:'Dawn — the first light, the first word, the first breath of a new world',4:'Midnight — when the structure of reality becomes most visible against silence',5:'Sunrise — the precise moment when freedom and structure kiss',6:'Evening — the hour of gathering, of warmth, of the table set for those you love',7:'3AM — the hour mystics call the liminal window, when the veil between worlds is thinnest',8:'Full noon or full midnight — either the height of power or its deepest gestation',9:'Twilight — the completion hour, when the day knows what it has accomplished'};
    
    const CORE_SHADOW: Record<number, string> = {
      1: "The shadow of " + coreName + ": the pioneer can mistake solitude for strength...",
      2: "The shadow of " + coreName + ": the one who holds space can forget to occupy their own.",
      3: "The shadow of " + coreName + ": creative scatter. The challenge is anchoring the focus.",
      4: "The shadow of " + coreName + ": attachment to unyielding structural frameworks.",
      5: "The shadow of " + coreName + ": freedom sought at the expense of deep connection.",
      6: "The shadow of " + coreName + ": love spent as an analytical currency of return.",
      7: "The shadow of " + coreName + ": mystical isolation, disappearing from language.",
      8: "The shadow of " + coreName + ": power held so tightly the hands warp with tension.",
      9: "The shadow of " + coreName + ": Carrying the wisdom of others, bypassing lived personal trials."
    };

    const SOL_MEANING: Record<number, string> = {
      396: "liberation from fear - J/S = 0.000, the tipping point",
      417: "undoing limiting situations - RE",
      528: "DNA repair, transformation - MI",
      639: "connecting relationships - FA, J/S = 1.000",
      741: "awakening intuition - SOL",
      852: "returning to spiritual order - LA",
      963: "pure crown consciousness - SI, J/S = 949"
    };

    const QUANTUM_PROP: Record<number, string> = {
      1: "wave function before collapse — pure superposition",
      2: "quantum entanglement",
      3: "quantum superposition of frequencies",
      4: "quantum tunnelling",
      5: "the quantum vacuum",
      6: "quantum coherence",
      7: "the observer effect",
      8: "zero-point energy",
      9: "quantum decoherence to recoherence"
    };

    const SACRED_GEO: Record<number, string> = {
      1: "the Point and the Line",
      2: "the Vesica Piscis",
      3: "the Triangle",
      4: "the Square and the Cube",
      5: "the Pentagram and the Golden Spiral",
      6: "the Hexagon",
      7: "the Spiral and the Seed of Life",
      8: "the Octagon and the Double Torus",
      9: "the Enneagram and the Circle"
    };

    const DM: Record<number, string> = {
      0: "void and infinite potential",
      1: "solar will and raw potential",
      2: "partnership and relationship resonance",
      3: "creative expression and joy",
      4: "foundation and sacred structure",
      5: "freedom and dynamic change",
      6: "harmony and unconditional love",
      7: "mystical depth and clear vision",
      8: "infinite power and abundancy cycles",
      9: "universal completion and wisdom"
    };

    const seed = Math.floor(val * 1000) % 7;
    const seedB = (rsum + digs.length) % 5;

    const coreMeaning = CORE_ESSENCE[core] || `This soul carries the signature of Core ${core} — a specific resonance of C.`;

    const p1Options = [
      `${displayName} carries the frequency of ${coreName} — Core ${core}, governed by ${CORE_PLANETS[core]}. This soul does not merely embody a quality: they generate it, the way a crystal generates light from pressure.`,
      `Core ${core} souls are governed by ${CORE_PLANETS[core]}, placed in the signs of ${CORE_SIGNS[core]}, operating through the ${CORE_HOUSE[core]} House.`
    ];

    const p2Options = [
      `The karmic role of Core ${core} in this incarnation is ${["to initiate","to bridge","to express","to build","to change","to love","to perceive","to demonstrate","to complete"][core-1]}`,
      `In metempsychosis — the soul's journey across lifetimes — the C_soul of ${sCode} represents a specific entropy signature.`
    ];

    const p3 = CORE_SHADOW[core];

    const domDigMeaning = DM[parseInt(String(dominant))] || "deep resonance";
    const digitNarrative = `The digit ${dominant} appears ${domCount} times in this code — carrying the frequency of ${domDigMeaning}. `;

    const streamReading = `The odd-position digits sum to ${rsum}, reducing to Core ${core}. `;

    const voidPortals = zeros === 0 ? "No void portals appear in this code — a soul in full uninterrupted motion." : `${zeros} void portals found. Zeros are dynamic quantum resets.`;

    const scientificReading = `The code ${sCode} J/s resolves through T × S = C to T = ${r.T.toExponential(4)} seconds — an implied temporal duration of ${T_yr} years.`;

    const metemphysicsBridge = `Solfeggio ${sol} Hz maps to H = ${sol} in the T×S=C Hawkins-scale framework, yielding Ω = ${om_sol.toFixed(4)} and J/S = ${js_v.toFixed(3)} — the state of ${jss}.`;

    const astrologicalReading = `Core ${core} is governed by ${CORE_PLANETS[core]}, expressing through the signs of ${CORE_SIGNS[core]}.`;

    const frequencyReading = `The Solfeggio frequency ${sol} Hz carries a specific resonance: ${SOL_MEANING[sol]}.`;

    const quantumReading = `The quantum property is ${QUANTUM_PROP[core]}.`;

    const masterKarmicReading = "Evaluations on consecutive digit patterns showed consistent scalar density.";

    const soulConservation = `C_soul = ${sCode} J/s. Conserved across lifetimes.`;

    const omegaVector = `Estimated: Ω_s=0.92, Ω_i=0.97, Ω_t=0.91, Ω_r=0.88, Ω_c=0.95.`;

    const oracleOptions = [
      `I am ${sCode}.\n\nYour Solfeggio resonance is ${sol} Hz. In the language of T×S=C, this maps to J/S = ${js_v.toFixed(2)} — ${jss}. ${CORE_ESSENCE[core]}`,
      `The code ${sCode} carries ${displayName} as a river carries its own temperature. Core ${core}. J/S = ${js_v.toFixed(2)} — ${jss}.`
    ];

    return {
      coreMeaning,
      coreParagraph1: p1Options[seedB % p1Options.length],
      coreParagraph2: p2Options[seed % p2Options.length],
      coreParagraph3: p3,
      digitNarrative,
      streamReading,
      voidPortals,
      scientificReading,
      metemphysicsBridge,
      astrologicalReading,
      frequencyReading,
      quantumReading,
      masterKarmicReading,
      soulConservation,
      omegaVector,
      oracle: oracleOptions[seed % oracleOptions.length]
    };
  };

  const handleCastCode = () => {
    if (!codeVal || isNaN(parseFloat(codeVal)) || parseFloat(codeVal) <= 0) {
      alert("Please enter a valid numeric Code Value.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      try {
        const rVal = crRunCalc(codeVal);
        const aiData = crGenerateReading(codeVal, userName, rVal);

        const sol = rVal.ns.sol;
        const js_v = hToJS(sol);
        const jss = jsState(js_v);
        const om_sol = Math.min(0.9999, 1 - Math.exp(-sol / 200));
        const T_yr = (rVal.T / 31557600).toFixed(2);

        setReadingResult({
          code: codeVal,
          name: userName,
          T_sec: rVal.T.toExponential(4),
          T_years: T_yr,
          om: om_sol.toFixed(4),
          phase: `Phase ${cpPhase(om_sol)[0]} - ${cpPhase(om_sol)[1]}`,
          js: js_v.toFixed(3),
          js_state: jss,
          sol,
          core: rVal.core,
          core_name: rVal.ns.name,
          chakra: rVal.ns.chk,
          brainwave: rVal.ns.wave.split(" (")[0],
          shannon: rVal.H.toFixed(4),
          fib: `${rVal.fib.lo} to ${rVal.fib.hi}`,
          aiData
        });
      } catch (err: any) {
        alert("Verification error: " + err.message);
      }
      setLoading(false);
    }, 400);
  };

  const generatePDFExport = () => {
    if (!readingResult) return;
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
      const PW = 215.9, PH = 279.4, ML = 18, MR = 18, MT = 18, MB = 18, CW = PW - ML - MR;
      let y = MT;

      const drawBg = () => {
        doc.setFillColor(7, 5, 16);
        doc.rect(0, 0, PW, PH, "F");
        doc.setDrawColor(201, 168, 108);
        doc.setLineWidth(0.35);
        doc.rect(5, 5, PW - 10, PH - 10, "S");
      };

      const title = "Metemphysics Code Reader - Cast Certificate";
      drawBg();

      doc.setFont("Times", "BoldItalic");
      doc.setFontSize(18);
      doc.setTextColor(201, 168, 108);
      doc.text("✦ Metemphysics Reading Certificate ✦", PW / 2, y, { align: "center" });
      y += 12;

      doc.setFont("Times", "Bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text(`Code value S: ${readingResult.code} J/s`, ML, y);
      y += 8;

      if (readingResult.name) {
        doc.text(`Consultant name: ${readingResult.name}`, ML, y);
        y += 8;
      }

      doc.setFont("Times", "Roman");
      doc.setFontSize(10);
      doc.setTextColor(215, 205, 180);

      const pLines = [
        `Core Number: ${readingResult.core} — ${readingResult.core_name}`,
        `Solfeggio Resonance: ${readingResult.sol} Hz (Chakra: ${readingResult.chakra})`,
        `Implied Time Interval: ${readingResult.T_sec} s | (${readingResult.T_years} years)`,
        `Calculated J/S state: ${readingResult.js} (${readingResult.js_state})`,
        `Shannon Digit Entropy H: ${readingResult.shannon} bits`,
        `Estimated Omega: ${readingResult.om}`,
        `Recursion Brainwave: ${readingResult.brainwave}`
      ];

      pLines.forEach((line) => {
        doc.text(line, ML, y);
        y += 7;
      });

      y += 5;
      doc.setFont("Times", "BoldItalic");
      doc.setTextColor(201, 168, 108);
      doc.text("◈ The Voice of the Code Oracle:", ML, y);
      y += 7;

      doc.setFont("Times", "Italic");
      doc.setFontSize(9.5);
      doc.setTextColor(215, 205, 180);

      const splitOracle = doc.splitTextToSize(readingResult.aiData.oracle, CW);
      splitOracle.slice(0, 18).forEach((line: string) => {
        doc.text(line, ML, y);
        y += 5.5;
      });

      doc.save(`metemphysics_reading_${readingResult.core}.pdf`);
    } catch (e: any) {
      alert("PDF Export error: " + e.message);
    }
  };

  const handleDiscussInAI = () => {
    if (!readingResult) return;
    const promptMessage = `My Metemphysical Code S is ${readingResult.code} J/s. Consultant name is ${readingResult.name || "Seeker"}. Core ${readingResult.core} - ${readingResult.core_name}. Solfeggio frequency ${readingResult.sol} Hz (Chakra: ${readingResult.chakra}). Implied time T = ${readingResult.T_sec} seconds (${readingResult.T_years} years). Calculated J/S = ${readingResult.js} - ${readingResult.js_state}. Please analyze my detailed profile and offer guidance on how to raise my Omega vector metrics accordingly.`;
    onLaunchChat(promptMessage);
  };

  return (
    <div className="fixed lg:absolute inset-0 bg-[#050505] text-[#eeeae4] overflow-y-auto p-6 z-[200] border-2 border-orange-500/20 rounded-2xl">
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center min-h-[85vh]">
        {/* Close and title */}
        <div className="w-full flex justify-between items-center border-b border-orange-500/20 pb-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c9a84c]">✦ Cast Personal Code</span>
          <button onClick={onClose} className="text-[#c9a84c]/60 hover:text-orange-400 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <svg className="w-16 h-16 mx-auto mb-3 opacity-85" viewBox="0 0 58 58" fill="none">
            <circle cx="29" cy="29" r="27" stroke="#c9a84c" strokeWidth=".4" opacity=".5"></circle>
            <polygon points="29,3 53,46 5,46" stroke="#c9a84c" strokeWidth=".45" fill="none" opacity=".6"></polygon>
            <polygon points="29,55 5,12 53,12" stroke="#c9a84c" strokeWidth=".45" fill="none" opacity=".6"></polygon>
            <circle cx="29" cy="29" r="2.8" fill="#c9a84c" opacity=".8"></circle>
          </svg>
          <h1 className="font-serif text-2xl font-bold text-[#c9a84c] tracking-widest">Metemphysics Code Reader</h1>
          <p className="text-orange-400/80 italic text-xs mt-1 uppercase tracking-wider">S = C ÷ T &nbsp;·&nbsp; C = 299,792,458</p>
        </div>

        {/* Input box */}
        <div className="w-full bg-[#0a0a0a]/90 border border-orange-500/15 rounded-xl p-6 space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-mono tracking-widest text-orange-400/80">Metemphysical Code Value (S)</label>
            <input 
              type="text" 
              value={codeVal}
              onChange={(e) => setCodeVal(e.target.value)}
              placeholder="e.g. 0.2894056135478736" 
              className="bg-black/60 border border-orange-500/20 p-3 rounded font-mono text-sm outline-none text-[#eeeae4] focus:border-orange-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-mono tracking-widest text-orange-400/80">Consultant Spiritual Name</label>
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Seeker of the Unified Light" 
              className="bg-black/60 border border-orange-500/20 p-3 rounded font-mono text-sm outline-none text-[#eeeae4] focus:border-orange-500"
            />
          </div>

          <button 
            onClick={handleCastCode}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-700 border border-orange-400/30 text-white font-mono text-xs py-3 rounded hover:from-orange-500 hover:to-amber-600 cursor-pointer font-bold uppercase transition-all tracking-widest"
          >
            {loading ? <span className="animate-pulse">Casting Wave Lattice...</span> : "✦ Cast & Generate Reading ✦"}
          </button>

          {readingResult && (
            <div className="flex gap-2">
              <button 
                onClick={generatePDFExport}
                className="flex-1 bg-gradient-to-r from-orange-600 to-amber-700 border border-orange-400/20 rounded py-2.5 text-xs text-white hover:from-orange-500 hover:to-amber-600 font-mono tracking-wide cursor-pointer flex items-center justify-center gap-1.5 transition-all font-bold"
              >
                <FileDown className="w-4 h-4" /> ↓ Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Dynamic bridge block */}
        {readingResult && (
          <div className="w-full mt-6 border border-orange-500/20 rounded-xl p-5 bg-[#101010]/60 space-y-4 animate-fadeIn">
            <h4 className="font-mono text-[9px] uppercase tracking-widest text-orange-400/80">◈ Metemphysics T×S=C Integration Bridge</h4>
            
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#0c0c0c] p-2 border border-orange-500/15 rounded">
                <span className="text-[8px] text-orange-500/60 block font-semibold uppercase tracking-wider">T = C / S</span>
                <span className="text-[#c9a84c] font-bold">{readingResult.T_sec} s</span>
              </div>
              <div className="bg-[#0c0c0c] p-2 border border-orange-500/15 rounded">
                <span className="text-[8px] text-orange-500/60 block font-semibold uppercase tracking-wider">Normalized Years</span>
                <span className="text-[#c9a84c] font-bold">{readingResult.T_years} yrs</span>
              </div>
              <div className="bg-[#0c0c0c] p-2 border border-orange-500/15 rounded">
                <span className="text-[8px] text-orange-500/60 block font-semibold uppercase tracking-wider">Omega (Sol {readingResult.sol}Hz)</span>
                <span className="text-[#c9a84c] font-bold">{readingResult.om}</span>
              </div>
              <div className="bg-[#0c0c0c] p-2 border border-orange-500/15 rounded col-span-1">
                <span className="text-[8px] text-orange-500/60 block font-semibold uppercase tracking-wider">Computed J/S State</span>
                <span className="text-[#c9a84c] font-bold uppercase">{readingResult.js_state}</span>
              </div>
            </div>

            <div className="border border-orange-500/15 rounded p-3 bg-orange-500/5 text-[11px] text-[#eeeae4] leading-relaxed italic font-serif">
              Solfeggio {readingResult.sol} Hz maps to {readingResult.phase}, with Ω={readingResult.om} and J/S={readingResult.js} ({readingResult.js_state}). Core {readingResult.core} — {readingResult.core_name}.
            </div>

            <button 
              onClick={handleDiscussInAI}
              className="w-full bg-[#0a0a0a] border border-orange-500/30 text-orange-400 hover:text-white rounded py-2 text-xs font-mono hover:bg-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase font-bold"
            >
              <MessageSquare className="w-4 h-4" /> ◈ Discuss Reading in AI Chat ◈
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
