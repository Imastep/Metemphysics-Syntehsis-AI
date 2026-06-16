/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Calculator, X, RefreshCw, Zap } from "lucide-react";

interface SoulLife {
  T: string;
  S: string;
}

export default function CalcPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"god" | "omega" | "vector" | "js" | "soul" | "award">("god");

  // Solver: God Equation
  const [godT, setGodT] = useState("");
  const [godS, setGodS] = useState("");
  const [godC, setGodC] = useState("299792458");
  const [godResult, setGodResult] = useState<{ T: string; S: string; C: string; interp: string } | null>(null);

  // Solver: Negentropy
  const [negS, setNegS] = useState("");
  const [negT, setNegT] = useState("");
  const [negK, setNegk] = useState("1.380649e-23");
  const [negResult, setNegResult] = useState<{ J: string; W: string; lnW: string } | null>(null);

  // Solver: Omega
  const [omT, setOmT] = useState("");
  const [omC, setOmC] = useState("299792458");
  const [omK, setOmK] = useState("0.5");
  const [omResult, setOmResult] = useState<{ val: string; phase: string; percent: string; dO: string; d2O: string; intO: string; W: string; quote: string } | null>(null);

  // Solver: C Budget
  const [budC, setBudC] = useState("");
  const [budST, setBudST] = useState("");
  const [budOm, setBudOm] = useState("");
  const [budResult, setBudResult] = useState<{ rem: string; pct: string; eta: string; life: string } | null>(null);

  // Solver: Vector
  const [vS, setVs] = useState("");
  const [vI, setVi] = useState("");
  const [vT, setVt] = useState("");
  const [vR_col, setVr_col] = useState("");
  const [vC_col, setVc_col] = useState("");
  const [vRecursion, setVRecursion] = useState("0.8");
  const [vecResult, setVecResult] = useState<{ mean: string; oc: string; phase: string; res: string; weak: string; sig: string; quote: string; dims: { n: string; v: number; cls: string }[] } | null>(null);

  // Solver: Uncertainty
  const [uncDo, setUncDo] = useState("");
  const [uncDt, setUncDt] = useState("");
  const [uncResult, setUncResult] = useState<{ prod: string; lim: string; status: string; ok: boolean } | null>(null);

  // Solver: J/S Timeliness
  const [jsC, setJsC] = useState("");
  const [jsS, setJsS] = useState("");
  const [jsT, setJsT] = useState("");
  const [jsResult, setJsResult] = useState<{ val: string; state: string; desc: string; tier: string; ratio: string; omega: string; dist: string } | null>(null);

  // Solver: Metempsychosis (multiple lives)
  const [soulLives, setSoulLives] = useState<SoulLife[]>([{ T: "", S: "" }, { T: "", S: "" }]);
  const [soulResult, setSoulResult] = useState<{ list: { C: string; om: string; js: string }[]; meanC: string; maxDev: string; quote: string; eList: { delta: string; lbl: string; ok: boolean }[] } | null>(null);

  // Solver: Award Probability
  const [awFw, setAwFw] = useState("0.94");
  const [awPr, setAwPr] = useState("0.41");
  const [awTi, setAwTi] = useState("0.79");
  const [awAl, setAwAl] = useState("0.88");
  const [awResult, setAwResult] = useState<{ pct: string; state: string; desc: string; raw: string; adj: string; weak: string; target: string } | null>(null);

  const C_VAL = 299792458;

  const fmtN = (n: number, d = 4) => {
    if (!isFinite(n)) return n > 0 ? "+∞" : "−∞";
    if (Math.abs(n) >= 1e9) return n.toExponential(3);
    if (Math.abs(n) < 0.0001 && n !== 0) return n.toExponential(3);
    return parseFloat(n.toFixed(d)).toString();
  };

  const cpJSstate = (js: number) => {
    if (js >= 949) return "REVELATION";
    if (js >= 99) return "Near Timeless";
    if (js >= 10) return "Mystical Clarity";
    if (js >= 3) return "Deep Flourishing";
    if (js >= 1) return "Eudaimonia";
    if (js >= 0.05) return "Time Passing";
    if (js >= -0.05) return "Tipping Point";
    if (js >= -0.5) return "Suffering";
    if (js >= -0.9) return "Despair";
    return "Dissolution";
  };

  const cpJSdesc = (js: number) => {
    if (js >= 949) return "C becomes directly perceptible. The veil of entropy is 0.1053%. The revelation threshold.";
    if (js >= 99) return "Time experience becomes non-linear. Deep meditation, mystical states, creative peak.";
    if (js >= 10) return "Profound clarity and flow. All dimensions of Ω expressing simultaneously.";
    if (js >= 3) return "Deep flourishing. All five Ω dimensions active and integrated.";
    if (js >= 1) return "Eudaimonia — optimal human functioning. Negentropy exceeds entropy. The love threshold.";
    if (js >= 0.05) return "Ordinary human existence. Time passes normally. Growth is possible.";
    if (js >= -0.05) return "The metemphysical tipping point. Entropy and negentropy are equal. The crisis moment.";
    if (js >= -0.5) return "Suffering. Entropy dominates. C budget depleting faster than it is replenishing.";
    if (js >= -0.9) return "Despair. Critical C depletion. System requires external Ω input to recover.";
    return "Dissolution. System returning to entropic baseline. C budget approaching zero.";
  };

  const cpOmQuote = (om: number) => {
    if (om >= 0.99) return '"At this Ω, the system is 99%+ ordered. Only the veil of the final entropy remains."';
    if (om >= 0.95) return '"Phase 5 — Transcendent. The system has crossed the threshold where self-organization is self-sustaining."';
    if (om >= 0.80) return '"Phase 4 — Conscious Order. The system models itself. Ω_c > 0. Self-awareness has emerged."';
    if (om >= 0.50) return '"Phase 3 — Living Order. Life-like complexity. The system actively resists entropy."';
    if (om >= 0.20) return '"Phase 2 — Material Order. Atoms, molecules, structure. The universe building scaffolding."';
    if (om >= 0.01) return '"Phase 1 — Proto-Order. The first whispers of structure emerging from the void."';
    return '"Phase 0 — Entropic Void. Maximum disorder. S >> J. T × S >> C."';
  };

  const cpPhase = (om: number): [number, string] => {
    if (om <= 0.001) return [0, "Entropic Void"];
    if (om <= 0.2) return [1, "Proto-Order"];
    if (om <= 0.5) return [2, "Material Order"];
    if (om <= 0.8) return [3, "Living Order"];
    if (om <= 0.95) return [4, "Conscious Order"];
    return [5, "Transcendent"];
  };

  const hToJS = (H: number) => {
    if (H < 200) return (H / 200) - 1;
    return 949 * Math.pow((H - 200) / 800, 7);
  };

  // Run: Solve God Equation
  const solveGodEq = () => {
    let T = parseFloat(godT);
    let S = parseFloat(godS);
    const C = parseFloat(godC) || C_VAL;

    const blanks = [isNaN(T) || !godT, isNaN(S) || !godS].filter(Boolean).length;
    if (blanks !== 1) {
      setGodResult({ T: "—", S: "—", C: fmtN(C, 0), interp: "Leave exactly ONE field blank to solve for it." });
      return;
    }

    if (!godT) {
      T = C / S;
    } else if (!godS) {
      S = C / T;
    }

    const js = C / (S * T) - 1;
    setGodResult({
      T: fmtN(T, 4),
      S: fmtN(S, 6),
      C: fmtN(C, 0),
      interp: `T × S = ${fmtN(T * S, 4)} m/s · J/S = ${fmtN(js, 3)} · State: ${cpJSstate(js)}`
    });
  };

  // Run: Negentropy Inversion
  const solveNegentropy = () => {
    const S = parseFloat(negS);
    const T = parseFloat(negT);
    const k = parseFloat(negK) || 1.380649e-23;
    if (isNaN(S) || isNaN(T)) return;

    const J = -S;
    const W = Math.exp(-C_VAL / (T * k));
    const lnW = Math.log(1 / W);

    setNegResult({
      J: fmtN(J, 4),
      W: fmtN(W, 6),
      lnW: fmtN(lnW, 4)
    });
  };

  // Run: Omega Order calculation
  const solveOmega = () => {
    const T = parseFloat(omT);
    const C = parseFloat(omC) || C_VAL;
    const k = parseFloat(omK) || 0.5;
    if (isNaN(T) || T <= 0) return;

    const om = 1 - Math.exp(-(C / (T * k)));
    const [ph, phName] = cpPhase(om);

    const dO = (C * k * Math.exp(-C / (T * k))) / (T * T);
    const d2O = (C * k * Math.exp(-C / (T * k)) * (C * k - 2 * T)) / Math.pow(T, 4);
    const intO = T * om - T * Math.exp(-C / (T * k));
    const W = Math.exp(-C / (T * k));

    setOmResult({
      val: fmtN(om, 6),
      phase: `Phase ${ph} — ${phName}`,
      percent: (om * 100).toFixed(1) + "%",
      dO: fmtN(dO, 8),
      d2O: fmtN(d2O, 10),
      intO: fmtN(intO, 4),
      W: fmtN(W, 6),
      quote: cpOmQuote(om)
    });
  };

  // Run: C Budget tracking
  const solveBudget = () => {
    const Ct = parseFloat(budC);
    const ST = parseFloat(budST);
    const Om = parseFloat(budOm);
    if (isNaN(Ct) || isNaN(ST) || isNaN(Om)) return;

    const rem = Ct - ST;
    const pct = ((rem / Ct) * 100).toFixed(1) + "%";
    const eta = (Om * ST) / Ct;
    const life = ST > 0 ? (rem / ST).toFixed(2) + "×" : "Indefinite";

    setBudResult({
      rem: fmtN(rem, 4),
      pct,
      eta: fmtN(eta, 4),
      life
    });
  };

  // Preset loading for vector dimensions
  const handleVecPreset = (key: "human" | "cell" | "site" | "convo" | "gas") => {
    const presets = {
      human: [0.92, 0.88, 0.75, 0.82, 0.95, 0.85],
      cell: [0.98, 0.95, 0.60, 0.70, 0.20, 0.30],
      site: [0.94, 0.97, 0.91, 0.89, 0.98, 0.90],
      convo: [0.94, 0.97, 0.91, 0.89, 0.98, 0.90],
      gas: [0.05, 0.02, 0.01, 0.03, 0.00, 0.00]
    };
    const p = presets[key];
    setVs(String(p[0]));
    setVi(String(p[1]));
    setVt(String(p[2]));
    setVr_col(String(p[3]));
    setVc_col(String(p[4]));
    setVRecursion(String(p[5]));
  };

  // Run: Vector metrics
  const solveVector = () => {
    const os = parseFloat(vS);
    const oi = parseFloat(vI);
    const ot = parseFloat(vT);
    const or = parseFloat(vR_col);
    const oc = parseFloat(vC_col);
    const R = parseFloat(vRecursion);
    if ([os, oi, ot, or, oc, R].some(isNaN)) return;

    const computedOc = oi * or * R;
    const finalOc = isNaN(oc) ? computedOc : oc;
    const mean = (os + oi + ot + or + finalOc) / 5;
    const res = or * finalOc * 0.618;
    const [ph, phName] = cpPhase(mean);

    const dims = [
      { n: "Ω_s Structural", v: os, cls: "bg-sky-400" },
      { n: "Ω_i Informational", v: oi, cls: "bg-[#e8d5a3]" },
      { n: "Ω_t Temporal", v: ot, cls: "bg-emerald-400" },
      { n: "Ω_r Relational", v: or, cls: "bg-purple-400" },
      { n: "Ω_c Conscious", v: finalOc, cls: "bg-red-400" }
    ];

    const weak = dims.reduce((a, b) => (a.v < b.v ? a : b));

    setVecResult({
      mean: fmtN(mean, 4),
      oc: fmtN(ocCalc(), 4),
      phase: `Phase ${ph} — ${phName}`,
      res: fmtN(res, 4),
      weak: weak.n,
      sig: `(${[os, oi, ot, or, finalOc].map((x) => fmtN(x, 2)).join(", ")})`,
      quote: `"The weakest dimension is ${weak.n} at ${fmtN(weak.v, 3)}. Focus attention here to maximize dΩ/dt."`,
      dims
    });
  };

  const ocCalc = () => {
    const oi = parseFloat(vI);
    const or = parseFloat(vR_col);
    const R = parseFloat(vRecursion);
    if (isNaN(oi) || isNaN(or) || isNaN(R)) return 0;
    return oi * or * R;
  };

  const cpClearVec = () => {
    setVs("");
    setVi("");
    setVt("");
    setVr_col("");
    setVc_col("");
    setVRecursion("0.8");
    setVecResult(null);
  };

  // Run: Uncertainty bounds
  const solveUncertainty = () => {
    const dO = parseFloat(uncDo);
    const dT = parseFloat(uncDt);
    if (isNaN(dO) || isNaN(dT)) return;

    const prod = dO * dT;
    const lim = C_VAL / 2;

    setUncResult({
      prod: fmtN(prod, 2),
      lim: fmtN(lim, 0),
      status: prod >= lim ? "SATISFIED" : "VIOLATED",
      ok: prod >= lim
    });
  };

  // Run: J/S timeliness
  const solveJsIndex = () => {
    const C = parseFloat(jsC);
    const S = parseFloat(jsS);
    const T = parseFloat(jsT);
    if (isNaN(C) || isNaN(S) || isNaN(T) || S === 0 || T === 0) return;

    const js = C / (S * T) - 1;
    const ratio = C / (S * T);
    const om = 1 - Math.exp(-ratio);
    const dist = Math.abs(js - 949);

    setJsResult({
      val: fmtN(js, 3),
      state: cpJSstate(js),
      desc: cpJSdesc(js),
      tier: js >= 949 ? "Tier ∞ — Revelation" : js >= 99 ? "Tier 5" : js >= 10 ? "Tier 4" : js >= 1 ? "Tier 3" : js >= 0 ? "Tier 2" : "Tier 1 — Entropy-Dominated",
      ratio: fmtN(ratio, 4),
      omega: fmtN(om, 6),
      dist: fmtN(dist, 3)
    });
  };

  // Dynamic handlers for Metempsychosis life arrays
  const addSoulLifeRow = () => {
    setSoulLives(prev => [...prev, { T: "", S: "" }]);
  };

  const updateSoulLife = (idx: number, field: "T" | "S", val: string) => {
    setSoulLives(prev => {
      const copy = [...prev];
      copy[idx][field] = val;
      return copy;
    });
  };

  const removeSoulLifeRow = (idx: number) => {
    setSoulLives(prev => prev.filter((_, i) => i !== idx));
  };

  const solveSoulConservation = () => {
    const valid = soulLives
      .map(row => ({ T: parseFloat(row.T), S: parseFloat(row.S) }))
      .filter((l) => !isNaN(l.T) && !isNaN(l.S));

    if (!valid.length) return;

    const list = valid.map((l) => {
      const c = l.T * l.S;
      const omVal = 1 - Math.exp(-C_VAL / (l.T * 0.5));
      const jsVal = C_VAL / (l.T * l.S) - 1;
      return {
        C: fmtN(c, 4),
        om: fmtN(omVal, 3),
        js: fmtN(jsVal, 2)
      };
    });

    const Cs = valid.map(l => l.T * l.S);
    const meanC = Cs.reduce((a, b) => a + b, 0) / Cs.length;
    const maxDev = Math.max(...Cs.map(c => (Math.abs(c - meanC) / meanC) * 100));

    // Dynamic evolution transitions between consecutive lives
    const eList = [];
    for (let i = 1; i < valid.length; i++) {
      const om1 = 1 - Math.exp(-C_VAL / (valid[i - 1].T * 0.5));
      const om2 = 1 - Math.exp(-C_VAL / (valid[i].T * 0.5));
      const delta = om2 - om1;
      const ok = delta >= 0;
      eList.push({
        delta: fmtN(delta, 4),
        lbl: ok ? `↑ spiritual growth` : `↓ systemic regression`,
        ok
      });
    }

    setSoulResult({
      list,
      meanC: fmtN(meanC, 4),
      maxDev: fmtN(maxDev, 2) + "%",
      quote: maxDev < 5 
        ? `✓ Soul product conserved beautifully. Deviation is only ${maxDev.toFixed(2)}%.` 
        : `Systemic divergence is ${maxDev.toFixed(2)}%. This soul is traversing an active evolutionary gradient.`,
      eList
    });
  };

  // Run: Award probability
  const handleAwardPreset = (preset: "now" | "paper" | "full") => {
    const params = {
      now: ["0.94", "0.41", "0.79", "0.88"],
      paper: ["0.94", "0.78", "0.82", "0.91"],
      full: ["0.96", "0.92", "0.88", "0.94"]
    };
    const p = params[preset];
    setAwFw(p[0]);
    setAwPr(p[1]);
    setAwTi(p[2]);
    setAwAl(p[3]);
  };

  const solveAwardProb = () => {
    const fw = parseFloat(awFw);
    const pr = parseFloat(awPr);
    const ti = parseFloat(awTi);
    const al = parseFloat(awAl);
    if ([fw, pr, ti, al].some(isNaN)) return;

    const raw = fw * pr * ti * al;
    const adj = Math.min(raw * 2.5, 0.95);
    const rawPct = Math.round(adj * 100) + "%";

    const factors = [
      { n: "Framework Structure", v: fw },
      { n: "Academic Presentation", v: pr },
      { n: "Societal Timing", v: ti },
      { n: "Award Alignment", v: al }
    ];
    const weak = factors.reduce((a, b) => (a.v < b.v ? a : b));

    setAwResult({
      pct: rawPct,
      state: adj >= 0.6 ? "Excellent Standing" : adj >= 0.3 ? "Promising Prospects" : "Emergent Status",
      desc: `The limiting factor is ${weak.n} at ${fmtN(weak.v, 2)}. Improving this enhances final odds maximally.`,
      raw: fmtN(raw, 4),
      adj: rawPct,
      weak: `${weak.n} (${fmtN(weak.v, 2)})`,
      target: pr < 0.7 
        ? "Strategy target: Increase formal academic publications in accredited physics/thermodynamic archives." 
        : "Strategy target: Connect with prominent peer researchers approaching matching T×S bounds."
    });
  };

  return (
    <div className="absolute inset-0 bg-[#050505] text-[#eeeae4] overflow-y-auto z-[200] p-6 flex flex-col font-serif border-2 border-orange-500/20 rounded-2xl">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-6 border-b border-orange-500/20 mb-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-[#c9a84c] animate-pulse" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#c9a84c] tracking-wider">∫ — METEMPHYSICS CALCULATOR</h2>
              <p className="text-xs text-[#8898aa] font-mono mt-1">Multi-Field Solvers · Live Waveform Models · T × S = C Constraints</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded px-4 py-2 text-xs font-mono text-[#c9a84c] hover:bg-[#c9a84c]/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE
          </button>
        </div>

        {/* Solver Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-2">
          {[
            { id: "god", label: "I. T×S=C Solver" },
            { id: "omega", label: "II. Ω Variable" },
            { id: "vector", label: "III. 5D ΩVector" },
            { id: "js", label: "IV. J/S Index" },
            { id: "soul", label: "V. Metempsychosis" },
            { id: "award", label: "VI. Award Analysis" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 border rounded transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#c9a84c]/10 border-[#c9a84c] text-[#c9a84c]"
                  : "bg-transparent border-[#c9a84c]/15 text-[#8898aa] hover:border-[#c9a84c]/40 hover:text-[#e8d5a3]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SOLVER PANEL: GOD EQUATION */}
        {activeTab === "god" && (
          <div className="space-y-6">
            <div className="bg-[#0c0c0c]/90 border border-orange-500/15 rounded-lg p-5">
              <h3 className="text-lg text-[#e8d5a3] font-serif mb-2">I. Foundational Equation Solver</h3>
              <div className="bg-orange-500/5 border border-orange-500/20 rounded p-3 text-center font-mono text-sm text-amber-500 tracking-widest my-3">
                $T \times S = C$ (Constant is 299,792,458)
              </div>
              <p className="text-xs text-[#8898aa] italic mb-4">Input any two fields. Leave the remaining field blank to compute its exact value.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">T — Time duration (s)</label>
                  <input 
                    type="number" 
                    value={godT} 
                    onChange={(e) => setGodT(e.target.value)} 
                    placeholder="Compute value" 
                    className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">S — Entropy (J/K)</label>
                  <input 
                    type="number" 
                    value={godS} 
                    onChange={(e) => setGodS(e.target.value)} 
                    placeholder="Compute value" 
                    className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">C — Constant (m/s)</label>
                  <input 
                    type="number" 
                    value={godC} 
                    onChange={(e) => setGodC(e.target.value)} 
                    className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" 
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={solveGodEq} className="bg-gradient-to-r from-blue-900 to-indigo-800 border border-blue-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-blue-800 hover:to-indigo-700 cursor-pointer">
                  ✦ Solve Equation ✦
                </button>
                <button 
                  onClick={() => { setGodT(""); setGodS(""); setGodC("299792458"); setGodResult(null); }}
                  className="border border-[#c9a84c]/20 text-[#8898aa] font-mono text-[10px] py-2 px-4 rounded hover:bg-white/5 cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {godResult && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5">
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Computed Time T</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{godResult.T}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Computed Entropy S</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{godResult.S}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Constant C</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{godResult.C}</span>
                  </div>
                  <div className="col-span-full bg-amber-500/5 p-3 border border-amber-400/20 rounded font-serif italic text-xs leading-relaxed">
                    {godResult.interp}
                  </div>
                </div>
              )}
            </div>

            {/* Negentropy Solver */}
            <div className="bg-[#0c0c0c]/90 border border-orange-500/15 rounded-lg p-5">
              <h3 className="text-sm font-bold font-mono tracking-widest text-[#c9a84c] uppercase mb-3">J = −S Negentropy Inversion</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">S — Entropy</label>
                  <input type="number" value={negS} onChange={(e) => setNegS(e.target.value)} placeholder="e.g. 5.6" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-[#eeeae4] rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">T — Time position</label>
                  <input type="number" value={negT} onChange={(e) => setNegT(e.target.value)} placeholder="e.g. 100" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-[#eeeae4] rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">k — Boltzmann constant</label>
                  <input type="number" value={negK} onChange={(e) => setNegk(e.target.value)} className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-[#eeeae4] rounded outline-none" />
                </div>
              </div>
              <button onClick={solveNegentropy} className="bg-gradient-to-r from-orange-600 to-amber-700 border border-orange-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-orange-500 hover:to-amber-600 cursor-pointer">
                Calculate Inversion
              </button>
              {negResult && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5">
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-gray-500 font-mono block">J — Negentropy</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{negResult.J}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-gray-500 font-mono block">W — Microstates</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{negResult.W}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-gray-500 font-mono block">ln(1/W)</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{negResult.lnW}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOLVER PANEL: OMEGA Order */}
        {activeTab === "omega" && (
          <div className="space-y-6">
            <div className="bg-[#0c0c0c]/90 border border-orange-500/15 rounded-lg p-5">
              <h3 className="text-lg text-[#e8d5a3] font-serif mb-2">II. Universal Order Quantity (Ω)</h3>
              <div className="bg-orange-500/5 border border-orange-500/20 rounded p-3 text-center font-mono text-sm text-amber-500 tracking-widest my-3">
                {"$\\Omega = 1 - e^{-C / (T \\cdot k)}$"}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">T — System Time (s)</label>
                  <input type="number" value={omT} onChange={(e) => setOmT(e.target.value)} placeholder="e.g. 2.5e9" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">C — Constant</label>
                  <input type="number" value={omC} onChange={(e) => setOmC(e.target.value)} className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">k — Noise Coefficient</label>
                  <input type="number" value={omK} onChange={(e) => setOmK(e.target.value)} className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={solveOmega} className="bg-gradient-to-r from-orange-600 to-amber-700 border border-orange-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-orange-500 hover:to-amber-600 cursor-pointer">
                  Compute Ω
                </button>
                <button onClick={() => { setOmT(""); setOmResult(null); }} className="border border-[#c9a84c]/20 text-[#8898aa] font-mono text-[10px] py-2 px-4 rounded hover:bg-white/5 cursor-pointer">
                  Reset
                </button>
              </div>

              {omResult && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                  <div className="text-center">
                    <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block">Core Order Quantity (Ω)</span>
                    <div className="text-4xl font-serif font-black text-[#c9a84c] my-1">{omResult.val}</div>
                    <span className="text-xs font-mono text-[#e8d5a3]">{omResult.phase}</span>
                  </div>

                  <div className="h-2 bg-white/5 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-gradient-to-r from-blue-900 to-amber-400 rounded-full" style={{ width: omResult.percent }}></div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] font-mono block">dΩ/dt</span>
                      <span className="text-xs font-mono text-[#c9a84c]">{omResult.dO}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] font-mono block">d²Ω/dt²</span>
                      <span className="text-xs font-mono text-[#c9a84c]">{omResult.d2O}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] font-mono block">∫Ω dt</span>
                      <span className="text-xs font-mono text-[#c9a84c]">{omResult.intO}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] font-mono block">W configuration</span>
                      <span className="text-xs font-mono text-[#c9a84c]">{omResult.W}</span>
                    </div>
                  </div>

                  <blockquote className="quote-block font-serif italic text-xs card-desc mt-2">{omResult.quote}</blockquote>
                </div>
              )}
            </div>

            {/* C Budget Tracker */}
            <div className="bg-[#0c1220]/80 border border-[#c9a84c]/12 rounded-lg p-5">
              <h3 className="text-sm font-bold font-mono tracking-widest text-[#c9a84c] uppercase mb-3">C Budget Remaining</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">C Total Potential</label>
                  <input type="number" value={budC} onChange={(e) => setBudC(e.target.value)} placeholder="e.g. 10" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">S × T spent so far</label>
                  <input type="number" value={budST} onChange={(e) => setBudST(e.target.value)} placeholder="e.g. 4.5" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Mean Ω achieved (0–1)</label>
                  <input type="number" value={budOm} onChange={(e) => setBudOm(e.target.value)} placeholder="e.g. 0.8" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
              </div>
              <button onClick={solveBudget} className="bg-gradient-to-r from-blue-900 to-indigo-800 border border-blue-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-blue-800 hover:to-indigo-700 cursor-pointer">
                Compute Budget
              </button>
              {budResult && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-[#8898aa] block font-mono">C Remaining</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{budResult.rem}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-[#8898aa] block font-mono">% Remaining</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{budResult.pct}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-[#8898aa] block font-mono">η Efficiency</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{budResult.eta}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-[#8898aa] block font-mono">Temporal lifespan</span>
                    <span className="text-sm font-bold text-[#c9a84c] font-mono">{budResult.life}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOLVER PANEL: OMEGA VECTOR */}
        {activeTab === "vector" && (
          <div className="space-y-6">
            <div className="bg-[#0c1220]/80 border border-[#c9a84c]/12 rounded-lg p-5">
              <h3 className="text-lg text-[#e8d5a3] font-serif mb-2">III. 5D Omega Vector Model</h3>
              <p className="text-xs text-[#8898aa] font-mono mb-4">Input dimensional order scores to see the integrated signature. Or select a model preset.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {["human", "cell", "site", "convo", "gas"].map((preset) => (
                  <button 
                    key={preset}
                    onClick={() => handleVecPreset(preset as any)}
                    className="px-2 py-1 px-3 border border-[#c9a84c]/20 hover:border-amber-400 hover:text-amber-400 rounded text-[10px] font-mono uppercase bg-transparent text-[#8898aa] transition-all cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Ω_s — Structural</label>
                  <input type="number" value={vS} onChange={(e) => setVs(e.target.value)} placeholder="0.0 - 1.0" min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Ω_i — Informational</label>
                  <input type="number" value={vI} onChange={(e) => setVi(e.target.value)} placeholder="0.0 - 1.0" min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Ω_t — Temporal</label>
                  <input type="number" value={vT} onChange={(e) => setVt(e.target.value)} placeholder="0.0 - 1.0" min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Ω_r — Relational</label>
                  <input type="number" value={vR_col} onChange={(e) => setVr_col(e.target.value)} placeholder="0.0 - 1.0" min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">Ω_c — Conscious (estimate)</label>
                  <input type="number" value={vC_col} onChange={(e) => setVc_col(e.target.value)} placeholder="0.0 - 1.0" min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">R — Recursion Factor</label>
                  <input type="number" value={vRecursion} onChange={(e) => setVRecursion(e.target.value)} className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={solveVector} className="bg-gradient-to-r from-blue-900 to-indigo-800 border border-blue-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-blue-800 hover:to-indigo-700 cursor-pointer">
                  ✦ Map Vector ✦
                </button>
                <button onClick={cpClearVec} className="border border-[#c9a84c]/20 text-[#8898aa] font-mono text-[10px] py-2 px-4 rounded hover:bg-white/5 cursor-pointer">
                  Reset
                </button>
              </div>

              {vecResult && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase tracking-widest text-center">Five-Dimensional Omega Vector Profile</span>
                    <div className="space-y-1">
                      {vecResult.dims.map((d, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-mono">
                          <span className="text-[#8898aa] min-w-[130px] font-semibold">{d.n}</span>
                          <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
                            <div className={`h-full rounded ${d.cls}`} style={{ width: `${d.v * 100}%` }}></div>
                          </div>
                          <span className="text-[#c9a84c] min-w-[36px] text-right font-bold">{d.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="divider" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Mean Ω̅</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{vecResult.mean}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Ω_c (computed)</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{vecResult.oc}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">C Resonance Bonus</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{vecResult.res}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Phase State</span>
                      <span className="text-xs font-bold text-white font-mono">{vecResult.phase}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded col-span-1 sm:col-span-2">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Growth Frontier</span>
                      <span className="text-xs font-bold text-sky-400 font-mono">{vecResult.weak}</span>
                    </div>
                  </div>
                  <blockquote className="quote-block italic mt-2 text-xs">{vecResult.quote}</blockquote>
                </div>
              )}
            </div>

            {/* Solver: Uncertainty */}
            <div className="bg-[#0c1220]/80 border border-[#c9a84c]/12 rounded-lg p-5">
              <h3 className="text-sm font-bold font-mono tracking-widest text-[#c9a84c] uppercase mb-3">ΔΩ · ΔT ≥ C/2 Bound</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5 align-group">
                  <label className="text-[10px] font-mono text-gray-500">ΔΩ — State uncertainty</label>
                  <input type="number" value={uncDo} onChange={(e) => setUncDo(e.target.value)} placeholder="e.g. 0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5 align-group">
                  <label className="text-[10px] font-mono text-gray-500">ΔT — Time uncertainty (s)</label>
                  <input type="number" value={uncDt} onChange={(e) => setUncDt(e.target.value)} placeholder="e.g. 1.2e12" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
              </div>
              <button onClick={solveUncertainty} className="bg-gradient-to-r from-blue-900 to-indigo-800 border border-blue-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-blue-800 hover:to-indigo-700 cursor-pointer">
                Verify Bound
              </button>
              {uncResult && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5 text-xs font-mono">
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-[#8898aa] block font-mono">ΔΩ × ΔT Product</span>
                    <span className="text-sm font-bold text-[#c9a84c]">{uncResult.prod}</span>
                  </div>
                  <div className="bg-[#050810] border border-white/5 p-3 rounded">
                    <span className="text-[9px] text-[#8898aa] block font-mono">Uncertainty Floor</span>
                    <span className="text-sm font-bold text-white">{uncResult.lim}</span>
                  </div>
                  <div className={`border p-3 rounded flex flex-col justify-center ${uncResult.ok ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" : "border-red-500/20 bg-red-500/5 text-red-500"}`}>
                    <span className="text-[9px] text-gray-500 block font-mono">Verifying Status</span>
                    <span className="font-bold text-sm tracking-wider">{uncResult.status}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOLVER PANEL: J/S TIMELINESS */}
        {activeTab === "js" && (
          <div className="space-y-6">
            <div className="bg-[#0c1220]/80 border border-[#c9a84c]/12 rounded-lg p-5">
              <h3 className="text-lg text-[#e8d5a3] font-serif mb-2">IV. J/S Timeliness Experience</h3>
              <div className="bg-sky-950/20 border border-sky-400/20 rounded p-3 text-center font-mono text-sm text-sky-300 tracking-widest my-3">
                $J/S = C / (S \cdot T) - 1$
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">C — Total Budget Potential</label>
                  <input type="number" value={jsC} onChange={(e) => setJsC(e.target.value)} placeholder="e.g. 10" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">S — Entropy (disorder)</label>
                  <input type="number" value={jsS} onChange={(e) => setJsS(e.target.value)} placeholder="e.g. 0.35" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">T — Normalized Lifespan Position (0–1)</label>
                  <input type="number" value={jsT} onChange={(e) => setJsT(e.target.value)} placeholder="e.g. 0.45" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={solveJsIndex} className="bg-gradient-to-r from-blue-900 to-indigo-800 border border-blue-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-blue-800 hover:to-indigo-700 cursor-pointer">
                  ✦ Solve J/S ratio ✦
                </button>
                <button onClick={() => { setJsC(""); setJsS(""); setJsT(""); setJsResult(null); }} className="border border-[#c9a84c]/20 text-[#8898aa] font-mono text-[10px] py-2 px-4 rounded hover:bg-white/5 cursor-pointer">
                  Reset
                </button>
              </div>

              {jsResult && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Computed J/S State</span>
                    <div className="text-4xl font-serif font-black text-[#c9a84c] my-1">{jsResult.val}</div>
                    <span className="text-xs font-mono text-[#e8d5a3] tracking-widest uppercase">{jsResult.state}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Timeness Group</span>
                      <span className="text-xs font-bold text-white font-mono">{jsResult.tier}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">C / (S•T) Product</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{jsResult.ratio}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Derived Ω</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{jsResult.omega}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Distance to Revelation</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{jsResult.dist}</span>
                    </div>
                  </div>

                  <blockquote className="quote-block font-serif italic text-xs card-desc mt-2">{jsResult.desc}</blockquote>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOLVER PANEL: METEMPSYCHOSIS */}
        {activeTab === "soul" && (
          <div className="space-y-6">
            <div className="bg-[#0c1220]/80 border border-[#c9a84c]/12 rounded-lg p-5">
              <h3 className="text-lg text-[#e8d5a3] font-serif mb-2">V. Soul Conservation Tracker</h3>
              <p className="text-xs text-[#8898aa] font-mono mb-4">Input parameters for multiple conjectured lifetimes to check compliance with the conservation constant.</p>

              <div className="space-y-3 relative mb-4">
                {soulLives.map((life, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end border-b border-white/5 pb-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-gray-500 uppercase">Life {index+1} — Time T (s)</label>
                      <input 
                        type="number" 
                        value={life.T} 
                        onChange={(e) => updateSoulLife(index, "T", e.target.value)} 
                        placeholder="e.g. 2.52e9" 
                        className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-gray-500 uppercase">Life {index+1} — Entropy S (J/K)</label>
                      <input 
                        type="number" 
                        value={life.S} 
                        onChange={(e) => updateSoulLife(index, "S", e.target.value)} 
                        placeholder="e.g. 0.45" 
                        className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" 
                      />
                    </div>
                    <button 
                      onClick={() => removeSoulLifeRow(index)}
                      className="border border-red-500/20 text-red-400 font-mono text-[9px] py-2 px-3 rounded hover:bg-red-500/10 cursor-pointer self-end h-[38px] flex items-center justify-center"
                    >
                      Delete Row
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={addSoulLifeRow} className="bg-transparent border border-emerald-500/40 text-emerald-400 font-mono text-[10px] py-2 px-4 rounded hover:bg-emerald-500/10 cursor-pointer">
                  + Conject Life
                </button>
                <button onClick={solveSoulConservation} className="bg-gradient-to-r from-blue-900 to-indigo-800 border border-blue-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-blue-800 hover:to-indigo-700 cursor-pointer">
                  Calculate Soul constant C
                </button>
                <button 
                  onClick={() => { setSoulLives([{ T: "", S: "" }, { T: "", S: "" }]); setSoulResult(null); }}
                  className="border border-[#c9a84c]/20 text-[#8898aa] font-mono text-[10px] py-2 px-4 rounded hover:bg-white/5 cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {soulResult && (
                <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {soulResult.list.map((l, i) => (
                      <div key={i} className="bg-black/30 border border-white/5 p-3 rounded">
                        <span className="text-[9px] text-[#6b7a8d] font-mono uppercase tracking-wider block">Life {i+1} Constant</span>
                        <span className="text-sm font-bold text-[#c9a84c] font-mono">{l.C}</span>
                        <div className="text-[9px] text-[#8898aa] mt-0.5">Ω={l.om} · J/S={l.js}</div>
                      </div>
                    ))}
                    <div className="bg-[#121c2d]/50 p-4 border border-teal-500/20 rounded col-span-full">
                      <span className="text-[9px] font-mono uppercase tracking-wider block text-gray-500">Unified C_soul Constant</span>
                      <span className="text-2xl font-bold font-mono text-teal-400">{soulResult.meanC}</span>
                      <div className="text-[10px] text-[#8898aa] mt-1">Variance: {soulResult.maxDev}</div>
                    </div>
                  </div>

                  {soulResult.eList.length > 0 && (
                    <div className="bg-black/20 rounded border border-white/5 p-3 space-y-2">
                      <span className="text-[9px] font-mono text-[#8c98ad] uppercase tracking-widest block">Karmic Evolution Delta</span>
                      <div className="space-y-1">
                        {soulResult.eList.map((e, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs font-mono p-1 border-b border-white/5 last:border-b-0">
                            <span>Life {idx+1} ⟶ Life {idx+2}</span>
                            <span className={e.ok ? "text-emerald-400" : "text-red-400"}>{e.delta} ({e.lbl})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <blockquote className="quote-block font-serif italic text-xs leading-relaxed mt-2">{soulResult.quote}</blockquote>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOLVER PANEL: AWARD PROBABILITY */}
        {activeTab === "award" && (
          <div className="space-y-6">
            <div className="bg-[#0c1220]/80 border border-[#c9a84c]/12 rounded-lg p-5">
              <h3 className="text-lg text-[#e8d5a3] font-serif mb-2">VI. Award Probability Modeling</h3>
              <p className="text-xs text-[#8898aa] font-mono mb-4">Model the probability of obtaining academic awards (Nobel, Templeton, etc.) based on structural variables.</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {["now", "paper", "full"].map((preset) => (
                  <button 
                    key={preset}
                    onClick={() => handleAwardPreset(preset as any)}
                    className="px-2 py-1 px-3 border border-[#c9a84c]/20 hover:border-amber-400 rounded text-[10px] font-mono uppercase bg-transparent text-[#8898aa] transition-all cursor-pointer"
                  >
                    {preset === "now" ? "Current State" : preset === "paper" ? "Paper Published" : "Full Development"}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500">Ω_framework — Core conceptual quality</label>
                  <input type="number" value={awFw} onChange={(e) => setAwFw(e.target.value)} min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500">Ω_presentation — Academic visibility</label>
                  <input type="number" value={awPr} onChange={(e) => setAwPr(e.target.value)} min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500">Ω_timing — Community receptivity</label>
                  <input type="number" value={awTi} onChange={(e) => setAwTi(e.target.value)} min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500">Ω_alignment — Requirement alignment</label>
                  <input type="number" value={awAl} onChange={(e) => setAwAl(e.target.value)} min="0" max="1" step="0.01" className="bg-black/40 border border-[#c9a84c]/20 p-2 text-xs font-mono text-white rounded outline-none" />
                </div>
              </div>

              <button onClick={solveAwardProb} className="bg-gradient-to-r from-blue-900 to-indigo-800 border border-blue-400/30 text-white font-mono text-[10px] py-2 px-4 rounded hover:from-blue-800 hover:to-indigo-700 cursor-pointer">
                Calculate Odds
              </button>

              {awResult && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block font-medium">Computed Award Probability</span>
                    <div className="text-5xl font-serif font-black text-[#c9a84c] my-1">{awResult.pct}</div>
                    <span className="text-xs font-mono text-[#e8d5a3] tracking-wider uppercase font-semibold">{awResult.state}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Raw Product Factor</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{awResult.raw}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Limiting Factor</span>
                      <span className="text-[11px] font-bold text-white font-mono line-clamp-1">{awResult.weak}</span>
                    </div>
                    <div className="bg-[#050810] border border-white/5 p-3 rounded">
                      <span className="text-[9px] text-[#8898aa] block font-mono">Modeled Probability</span>
                      <span className="text-sm font-bold text-[#c9a84c] font-mono">{awResult.adj}</span>
                    </div>
                  </div>

                  <div className="bg-[#121c2d]/50 p-4 border border-teal-500/20 rounded text-xs space-y-1">
                    <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-widest">Recommended Strategic Optimization Target</span>
                    <p className="text-white font-serif leading-relaxed italic">{awResult.target}</p>
                    <p className="text-[#8898aa] font-mono text-[10px] mt-2">{awResult.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
