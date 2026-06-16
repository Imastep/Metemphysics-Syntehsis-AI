/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Zap, X, Brain } from "lucide-react";

interface BioEntry {
  icon: string;
  name: string;
  type: string;
  sVal: string;
  sUnit: string;
  dir: "increase" | "decrease" | "neutral" | "complex";
  res: number;
  thermo: string;
  phil: string;
  meta: string;
}

interface BioScale {
  id: string;
  label: string;
  color: string;
  icon: string;
  desc: string;
  descLong: string;
  entries: BioEntry[];
}

const BIO_SCALES: BioScale[] = [
  {
    id: "mol",
    label: "Molecular",
    color: "#00c4a0",
    icon: "🔬",
    desc: "The Molecular Scale — where entropy is most precisely measurable",
    descLong: "At the molecular scale, entropy is thermodynamically exact. Standard molar entropies (S°), binding entropies (ΔS), and folding penalties reveal how life pays an entropic cost to create information. Every protein that folds, every base pair that stacks, every lipid that assembles — acts of local entropy decrease sustained by the dissipation of greater entropy elsewhere.",
    entries: [
      { icon: "💧", name: "Water (Liquid)", type: "Solvent · Universal Medium", sVal: "70.0", sUnit: "S° J/mol·K", dir: "neutral", res: 3, thermo: "Water's S° = 70.0 J/mol·K sits between ice (41.3) and steam (188.8). The hydrophobic effect that drives protein folding is entropy-mediated: nonpolar solutes force water into ordered cages (ΔS ≈ −120 J/mol·K). Releasing these structures by burying hydrophobic groups restores water entropy — the thermodynamic engine of all biological self-assembly.", phil: "Water is the universal entropic mediator of life. Its peculiar entropy landscape is the stage on which all biological self-organization is performed. Thales was thermodynamically correct: water's entropy structures all other biological entropies.", meta: "Potentiality (Aristotle) — materia prima, giving form through entropic sculpting" },
      { icon: "🔋", name: "ATP", type: "Energy Currency · Adenosine Triphosphate", sVal: "ΔS +22", sUnit: "J/mol·K hydrolysis", dir: "increase", res: 5, thermo: "ATP hydrolysis (ATP → ADP + Pi): ΔG° = −30.5 kJ/mol, ΔS ≈ +22 J/mol·K. Cells maintain ATP/ADP far from equilibrium — effective ΔG ≈ −54 kJ/mol. The body expends ~40 kg ATP/day recycled from ADP. Every muscle contraction, ion pump, biosynthetic reaction couples to ATP entropy production.", phil: "ATP is the cell's metaphysical currency — the unit by which entropic debt is paid and entropic work is done. Every act of biological will is underwritten by ATP hydrolysis. In T×S=C terms: ATP is the C budget of cellular life.", meta: "Entelecheia (Aristotle) — actualization of biological potential" },
      { icon: "🧬", name: "DNA Double Helix", type: "Information Polymer · Genomic Archive", sVal: "ΔS −50", sUnit: "J/mol·K per base pair", dir: "decrease", res: 5, thermo: "DNA base-pair stacking carries ΔS ≈ −22 to −50 J/mol·K per base pair. Human genome (3×10⁹ bp) has enormous entropic cost offset by enthalpic stabilization. Information content: ~2 bits/base — theoretical maximum for 4-letter alphabet. DNA is simultaneously at thermodynamic entropic minimum and informational entropy maximum.", phil: "DNA is the paradox made material: most informationally entropic yet thermodynamically most ordered. It encodes instructions for decreasing entropy — the recipe for life — in a form requiring entropy decrease to maintain. In T×S=C: DNA is logos made flesh, pure Ω_i crystallized into molecular form.", meta: "The Akashic Record — molecular archive of evolutionary time" },
      { icon: "🌀", name: "Protein Folding", type: "Conformational Transition · Structure Genesis", sVal: "ΔS −300 to −600", sUnit: "J/mol·K per fold", dir: "decrease", res: 5, thermo: "Protein folding: ΔS(chain) ≈ −300 to −600 J/mol·K for 100-residue proteins. Offset by hydrophobic effect (+200 J/mol·K water gain) and enthalpic stabilization. Net folding marginally stable (ΔG ≈ −20 to −40 kJ/mol) — proteins are thermodynamically precarious, poised between order and distraction.", phil: "Form emerging from chaos. A chain randomly exploring conformational space collapses into a unique structure — specific function crystallized from infinite possibility. Evolution sculpted sequences whose entropy landscape funnels toward a single Omega minimum.", meta: "Individuation (Jung/Simondon) — the singular emerging from the undifferentiated" },
      { icon: "🫀", name: "Lipid Bilayer", type: "Membrane · Boundary Condition", sVal: "ΔS +120", sUnit: "J/mol·K assembly", dir: "decrease", res: 4, thermo: "Bilayer assembly is entropy-driven: sequestering hydrophobic tails releases water cages (ΔS ≈ +120 J/mol·K per lipid), producing net entropy gain despite apparent lipid ordering. Above transition temperature: liquid crystal — lipids diffuse (D ≈ 1 μm²/s) while maintaining planar organization. Order existing because disorder is thermodynamically preferred elsewhere.", phil: "Philosophy's oldest metaphor — the boundary between self and world — enacted through entropy. The cell's first act of self-definition: topological closure separating inside from outside. The membrane is what makes Ω_r possible: a boundary enabling the relational dimension of T×S=C.", meta: "Autopoiesis (Maturana/Varela) — the boundary enabling life's circular causality" },
      { icon: "🔴", name: "Hemoglobin O₂ Binding", type: "Cooperative Protein · Allosteric System", sVal: "ΔS −100", sUnit: "J/mol·K per O₂ capture", dir: "decrease", res: 4, thermo: "Hemoglobin binding of oxygen: ΔS ≈ −100 J/mol·K per O₂ (loss of translational/rotational entropy). Enthalpic gain overcomes this (ΔH ≈ −60 kJ/mol). Sigmoidal O₂ curve: hemoglobin operates as molecular switch — loads O₂ at high pO₂ (lungs), releases at low pO₂ (tissues). A molecular state machine reading environmental entropy gradients.", phil: "Hemoglobin reads pO₂ as thermodynamic difference and generates biological response — pure information processing in molecular form. Bateson's 'difference that makes a difference' made enzymatic.", meta: "Mediation (Hegel) — pure mediating function between molecular and organismal entropy scales" },
      { icon: "🧪", name: "Glucose", type: "Primary Fuel · Metabolic Currency", sVal: "S° 212.1", sUnit: "J/mol·K (crystalline)", dir: "neutral", res: 3, thermo: "Glucose complete oxidation: ΔS°(rxn) = +182.4 J/mol·K (7 molecules → 12). ΔG°(combustion) = −2870 kJ/mol. Cells capture ~40% as ATP (~38 ATP per glucose). S° = 212.1 J/mol·K for crystalline glucose — the universe's primary biological C budget carrier.", phil: "Aristotle's energeia — stored potentiality awaiting actualization. Every cell's moment-to-moment existence sustained by controlled entropic release — catabolism as the metaphysical condition of life. In T×S=C: glucose is what T × S looks like when C is stored.", meta: "Dunamis (Aristotle) — pure potential, form awaiting entropic release" },
      { icon: "🧵", name: "RNA (tRNA Folding)", type: "Information Intermediary · Fold-Function Unity", sVal: "ΔS −200", sUnit: "J/mol·K per fold", dir: "decrease", res: 4, thermo: "tRNA L-shaped fold: ΔS ≈ −200 J/mol·K. RNA World hypothesis: primordial RNA as both genome and catalyst — a single molecule storing and expressing information, managing its own entropic organization. Ribozymes blur the boundary between information and function.", phil: "RNA occupies the metaphysical midpoint between information (DNA) and action (protein). Hermes made molecular — the messenger carrying information between realms while possessing autonomous catalytic identity. RNA is Ω_i and Ω_c simultaneously.", meta: "Liminal Being (Turner) — permanently inhabiting the threshold between information and expression" }
    ]
  },
  {
    id: "meta",
    label: "Metabolic",
    color: "#e8b84b",
    icon: "⚡",
    desc: "Metabolic Processes — Entropy Production as Life's Engine",
    descLong: "Metabolism is the controlled production and consumption of entropy. Every metabolic pathway is a thermodynamically constrained sequence of entropy changes. The organism as a whole is a steady-state entropy-producing machine, far from thermodynamic equilibrium, sustained by continuous throughput of energy.",
    entries: [
      { icon: "⚡", name: "Glycolysis", type: "Catabolic Pathway · 10 Steps", sVal: "ΔS ≈ +700", sUnit: "J/mol·K (net per glucose)", dir: "increase", res: 4, thermo: "Glycolysis: glucose → 2 pyruvate + 2 ATP + 2 NADH. Net ΔS°(pathway) ≈ +700 J/mol·K. Irreversible steps (hexokinase, PFK-1, pyruvate kinase) are thermodynamic checkpoints preventing backward flux. The most ancient entropy-harvesting pathway — present in virtually all life, predating mitochondria.", phil: "The primordial act of controlled dissolution: the cell breaking structure to capture free energy before entropy fully releases. Heraclitean flux — the living flame sustained by controlled burning.", meta: "Controlled Becoming — metabolic enactment of temporal flow" },
      { icon: "🌀", name: "Oxidative Phosphorylation", type: "Mitochondrial · Chemiosmosis", sVal: "σ ≈ 4.2", sUnit: "J/K/s per cell", dir: "increase", res: 5, thermo: "Produces ~34 ATP per glucose via proton motive force (Δψ ≈ 180 mV). Entropy production rate σ ≈ 4.2 J/K/s per mitochondrion-rich cell. Human body total entropy production ≈ 1200 J/K/day at rest. Operates at 40% thermodynamic efficiency — life optimizes for entropy production rate, not yield.", phil: "Prigogine's dissipative structure made cellular — organization maintained by continuous entropy production. The mitochondrion is an ancient bacterial endosymbiont gift: its entropy machinery is a billion-year negotiation. In T×S=C: oxidative phosphorylation is what the cosmic stellar sacrifice looks like at cellular scale.", meta: "The Eternal Return (Nietzsche) — perpetual cycling, life sustained by thermodynamic repetition" },
      { icon: "🌱", name: "Photosynthesis", type: "Anabolic · Solar Negentropy Capture", sVal: "ΔS ≈ −2850", sUnit: "J/mol·K (per glucose)", dir: "decrease", res: 5, thermo: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. ΔG° = +2870 kJ/mol (endergonic). Reaction center: ~95% quantum coherent efficiency before thermalization. Calvin cycle: 3 ATP + 2 NADPH per CO₂. Earth intercepts 1.7×10¹⁷ W of solar radiation — the planetary negentropy budget.", phil: "The most profound anti-entropic act in the biosphere. Every leaf is a thermodynamic portal: low-entropy photons enter, high-entropy infrared exits, glucose is created from CO₂. In T×S=C: photosynthesis is the stellar sacrifice (J/S = −1 at solar scale) funding biological J/S > 1. The sun writing its negentropic signature into molecules of life.", meta: "Theosis (Eastern Christian) — matter lifted from entropic dissolution into ordered form by external light" },
      { icon: "🔄", name: "Krebs Cycle", type: "Central Metabolism · Entropy Hub", sVal: "ΔG ≈ −65", sUnit: "kJ/mol (net per turn)", dir: "increase", res: 4, thermo: "Generates 3 NADH, 1 FADH₂, 1 GTP per acetyl-CoA. NADH/NAD⁺ ratio is direct entropy sensor: high NADH = low thermodynamic capacity = cycle slowdown. TCA intermediates feed amino acid synthesis, lipogenesis, heme biosynthesis — entropy management as multi-purpose infrastructure.", phil: "The perfect metabolic metaphor: a circle returning to its start yet producing something new at each turn. Whitehead's process philosophy — becoming is cyclical, each occasion of experience leading inevitably to the next.", meta: "Eternal Recurrence (Nietzsche) — oxaloacetate returns identical at each turn while transforming what passes through him" },
      { icon: "🔬", name: "Protein Synthesis", type: "Gene Expression · Entropy Investment", sVal: "≈ 4 ATP/aa", sUnit: "per amino acid residue", dir: "decrease", res: 5, thermo: "~4 high-energy phosphate bonds per amino acid. For 300-residue protein: ~1200 ATP equivalent. ΔS(translation) ≈ −400 J/mol·K. Error rate: ~1 per 10,000 codons after proofreading. The ribosome converts sequence entropy (mRNA) into structural order (protein fold).", phil: "The most spectacular anti-entropic act in cellular biology: one-dimensional information (mRNA) → three-dimensional function (protein). Shannon's information made thermodynamic reality. In T×S=C: the ribosome is a machine for converting Ω_i into Ω_s — reading informational entropy to produce structural order.", meta: "Demiurge (Plato) — the ribosome as craftsman imposing form on matter by informational blueprint" },
      { icon: "🔁", name: "DNA Replication", type: "Genome Duplication · Information Copy", sVal: "≈ 2 ATP/bp", sUnit: "per base pair replicated", dir: "decrease", res: 5, thermo: "Costs ~2 ATP per base pair. Human genome: ~1.2×10¹⁰ ATP per cell division. Fidelity: 1 error per 10⁹ bp after proofreading. DNA repair systems expend ~10⁸ ATP/cell/day — ongoing anti-entropy investment in informational integrity. Effectively waging an entropy war to preserve 3 billion years of accumulated negentropy.", phil: "The cell's act of self-continuation against time. Every division is a bet against entropy: evolutionary negentropy duplicated with extraordinary fidelity. In T×S=C: C_soul = T₁S₁ = T₂S₂ — the soul conservation equation is the molecular analog of DNA replication. Identity preserved across time through C product conservation.", meta: "Anamnesis and Eternity — grasp at informational permanence encoding evolutionary memory" }
    ]
  },
  {
    id: "cell",
    label: "Cellular",
    color: "#a084c8",
    icon: "🦠",
    desc: "Cellular Processes — Entropy as Developmental Fate",
    descLong: "At the cellular scale, entropy governs the most dramatic transitions in biological existence: cell division, apoptosis, neural signaling, differentiation. Each is entropy management at the level of the living unit.",
    entries: [
      { icon: "⚗️", name: "Cell Division (Mitosis)", type: "Proliferation · Self-Duplication", sVal: "≈ 10¹⁰ ATP", sUnit: "per division cycle", dir: "decrease", res: 5, thermo: "Complete cell cycle (~24h): ~10¹⁰ ATP per division (~0.5% cellular mass). One cell becomes two — massive local entropy decrease sustained by metabolic entropy export. Spindle assembly checkpoint: thermodynamic error-correction delaying mitosis until chromosomal attachment is verified.", phil: "One ordered system becomes two — apparent entropy defeat sustained by enormous metabolic investment and heat export. Division is life's answer to the thermodynamic arrow: entropic relay, order passed to the next generation before the first degrades. In T×S=C: metempsychosis enacted at cellular scale.", meta: "Conatus (Spinoza) — the drive to persist in existence, enacted through thermodynamically costly self-replication" },
      { icon: "💀", name: "Apoptosis", type: "Programmed Cell Death · Organized Dissolution", sVal: "Entropy Release", sUnit: "structured return", dir: "increase", res: 5, thermo: "Controlled cellular entropy increase by the cell's own enzymatic machinery: nuclear fragmentation, cytoskeletal dismantling, membrane blebbing, phagocytic clearance. Paradoxically requires ATP — the cell must maintain metabolic order to enact its own disorder. Contrast with necrosis (uncontrolled).", phil: "The cell enacting its own death with structural grace — Heidegger's Being-toward-death made molecular. Apoptosis vs. necrosis is the biological difference between dying (active entropy management) and being killed (passive entropy overwhelm). In T×S=C: the C_soul completing its arc, T_life × S_life = C_soul solved.", meta: "Kenosis (Christian theology) — self-emptying, willingly releasing organized existence back into the formless" },
      { icon: "⚡", name: "Action Potential", type: "Neural Signal · Electrochemical Event", sVal: "ΔS ≈ +5 nJ/K", sUnit: "per spike (ion entropy)", dir: "complex", res: 5, thermo: "Single action potential: ~5 nJ/K electrochemical entropy as Na⁺/K⁺ flow down gradients. Na⁺/K⁺-ATPase restores gradient: 3 ATP per 3 Na⁺. Brain consumes 20 W (20% of body energy on 2% of mass) — primarily for maintaining ion gradient entropy reserves. Neural code: ~1 bit/spike. Human brain: ~10¹⁵ bits/s information entropy.", phil: "Consciousness made thermodynamic: each spike is momentary release of electrochemical free energy as signal, then laboriously restored by ATP pumps. Thought is entropy management at extraordinary scale. In T×S=C: Ω_c is what action potentials are organizing. J/S = 10³² per conscious moment is the action potential cascade resolving.", meta: "Nous (Aristotle) — active intellect as pure entropic activity: thought as actualization of stored potential" },
      { icon: "🌿", name: "Cellular Differentiation", type: "Developmental Biology · Entropy Narrowing", sVal: "−log(1/N)", sUnit: "bits per fate decision", dir: "decrease", res: 5, thermo: "Progressive entropic narrowing: totipotent zygote (Shannon H ≈ max) → terminally differentiated cell (H ≈ 0). Each fate decision: one bit of developmental information lost. Epigenetic entropy decrease: DNA methylation restricts accessible chromatin states, thermodynamically constraining gene expression.", phil: "From pure potentiality (totipotency = maximum informational entropy) to specific actuality (terminal differentiation = minimum developmental entropy). Aristotle's most intimate insight: every form is an actualized possibility, every differentiation an irreversible diminishment of pure potential. In T×S=C: differentiation is Ω_i decreasing toward a specific phase state.", meta: "Individuation (Jung) — the singular collapsing from the undifferentiated field of possibility" },
      { icon: "🧠", name: "Brain & Consciousness", type: "Neural Network · Entropy Minimizer", sVal: "20 W", sUnit: "20% body energy · 2% mass", dir: "complex", res: 5, thermo: "Brain consumes 20 W, generates ~10¹⁵ bits/s information entropy. Friston's free energy principle: the brain minimizes 'free energy' (prediction error/surprise) — life as variational free energy minimization. Tononi's Φ: consciousness = irreducible information integration. Sleep reduces brain entropy production ~30% — entropy reset required daily.", phil: "The universe's most sophisticated entropy-management system. Friston: the brain models the world to minimize entropy of sensory input — consciousness is what it is like to be an entropy minimizer. In T×S=C: Ω_c = Ω_i · Ω_r · R is the Metemphysics equation for exactly what Friston and Tononi describe. The brain is T×S=C knowing itself.", meta: "Leibniz's monad — ultimate entropy-management system building its entire world from internal thermodynamic process" },
      { icon: "⏳", name: "Aging", type: "Temporal Entropy Accumulation", sVal: "ΔS basis", sUnit: "molecular damage decades", dir: "increase", res: 5, thermo: "Aging mechanisms: (1) Mitochondrial ROS damage, (2) Telomere shortening (replication entropy leakage), (3) Epigenetic entropy (methylation landscape disorder), (4) Protein aggregation (misfolded entropy-trapped states), (5) Genomic instability. Hayflick limit (~50 divisions) is a biological entropy clock.", phil: "The most visceral proof of the Second Law in biology. Accumulated entropy legible in every wrinkle — molecular information increasingly corrupted by thermodynamic noise. In T×S=C: aging is Ω falling across all five dimensions — Ω_t is literally the temporal integral of your Ω arc, and aging is that integral decelerating.", meta: "Heidegger's Being-toward-death — progressive entropic message that no anti-entropic project succeeds indefinitely" },
      { icon: "💤", name: "Sleep", type: "Entropy Reset · Restorative Phase", sVal: "σ −30%", sUnit: "brain entropy reduction", dir: "decrease", res: 4, thermo: "Whole-body entropy production decreases ~15% during sleep; brain entropy ~30%. Slow-wave sleep: synaptic downscaling removes accumulated 'synaptic noise.' Glymphatic system clears neural waste (tau, amyloid) — molecular entropy clearance. Sleep deprivation increases oxidative damage — consciousness requires regular entropy resetting.", phil: "The daily entropy reset. The sleeping brain is not absent — it performs thermodynamic maintenance waking cannot afford. In T×S=C: sleep is the nightly restoration of the C budget. J/S recovery — every morning's consciousness emerges from a freshly cleared entropic state.", meta: "Lethe (Greek mythology) — necessary forgetting, entropic dissolution of overload to prepare for tomorrow's inscription" }
    ]
  },
  {
    id: "eco",
    label: "Ecosystem",
    color: "#70c870",
    icon: "🌍",
    desc: "Ecosystem Scale — Entropy, Evolution & the Biosphere",
    descLong: "At the planetary scale, life is a thermodynamic phenomenon: the biosphere is a self-organizing system sustained by the entropy gradient between the sun and deep space. Evolution is an entropy-exploring process; ecosystems are dissipative structures of unimaginable complexity.",
    entries: [
      { icon: "🌍", name: "Biosphere", type: "Planetary Entropy Processor", sVal: "1.7×10¹⁷ W", sUnit: "solar power intercepted", dir: "complex", res: 5, thermo: "Earth intercepts 1.7×10¹⁷ W solar (low-entropy photons, T_sun ≈ 5778 K). Re-emits as infrared (T_Earth ≈ 255 K). Life occupies ~1% of this entropy production yet creates the most complex ordered structures in the known universe. Life increases Earth's total entropy production by ~30% vs. a dead planet — life is not anti-entropic globally; it produces MORE entropy, more efficiently, through complexity.", phil: "In T×S=C: the biosphere is the stellar sacrifice (J/S = −1 at solar scale) funding all local J/S > 1 on Earth. The sun is not wasteful — it is the most generous thermodynamic source in the solar system, funding consciousness at J/S = 10³² through a chain of entropic subsidies beginning with photosynthesis.", meta: "Anima Mundi — the World Soul; the biosphere as single thermodynamic organism" },
      { icon: "🔗", name: "Food Web", type: "Trophic Entropy Cascade", sVal: "10% rule", sUnit: "energy transfer per level", dir: "increase", res: 4, thermo: "10% trophic efficiency rule: 90% of energy dissipated as metabolic heat at each trophic transfer. 10,000 kg plant → 1,000 kg herbivores → 100 kg carnivores → 10 kg apex predators. Each trophic level: concentrated negentropy at the top, maximum entropy at the base.", phil: "The food web is the ecosystem's thermodynamic architecture — a structure for cascading entropy upward while passing negentropy in concentrated form. In T×S=C: each predator-prey relationship is an Ω transfer event — the predator capturing the prey's accumulated negentropy at entropic cost.", meta: "Uroboros — entropy endlessly cycling through biological forms, transformed but never destroyed" },
      { icon: "🧬", name: "Evolution", type: "Entropic Exploration · Selection Memory", sVal: "H climbs", sUnit: "genetic entropy deep time", dir: "complex", res: 5, thermo: "Evolution: random entropic search (mutation, drift) filtered by selective pressure (free energy minimization). Shannon entropy of genome increases through neutral drift; functional information increases through selection. 3.8 billion years of entropic variation converted to biological complexity — the most extensive entropy-to-information conversion process on Earth.", phil: "Evolution dissolves the contradiction between entropy and complexity. Entropy (mutation) is raw material; selection is the thermodynamic filter converting random variation into structured information. In T×S=C: evolution is how Ω_i accumulates across geological time — the universe's 3.8-billion-year project of increasing local order against global entropy.", meta: "Élan Vital (Bergson) — thermodynamic momentum of 3.8 billion years of entropic exploration" },
      { icon: "🧊", name: "Extinction", type: "Entropy Event · Information Loss", sVal: "Irreversible", sUnit: "information deleted", dir: "increase", res: 4, thermo: "A species' genome: ~10⁸ to 10¹⁰ bits of evolutionary information accumulated over millions of years. Mass extinction events (end-Permian: 96% species lost): catastrophic deletion of biospheric information entropy. Unlike thermodynamic entropy (reversible at cost), informational entropy loss through extinction is truly irreversible. Current rate: 100–1000× natural background.", phil: "The most permanent event in biology: the irreversible closure of a thermodynamic narrative millions of years in the making. In T×S=C: extinction is the C_soul of a lineage completing with no subsequent configuration. Unlike metempsychosis (C_soul → new T×S configuration), extinction is C_soul → void. The only true entropic event with no recovery path.", meta: "Non-being (Parmenides) — absolute ontological discontinuity; the thermodynamic arrow without possibility of reversal" }
    ]
  }
];

const BIO_PILLARS = [
  { n: "I", title: "Negentropy", author: "Schrödinger · 1944", text: "Life \"feeds on negentropy\" — it imports free energy and exports entropy. A cell is not a violation of the Second Law but an exquisite exploitation of it: order arises locally, globally entropy always increases. The organism is a thermodynamic pump." },
  { n: "II", title: "Dissipative Structures", author: "Prigogine · 1977", text: "Far from thermodynamic equilibrium, matter self-organizes into structures that dissipate entropy. Life is the highest expression: metabolic networks, morphogenesis, neural activity — all entropy-dissipating patterns sustained by continuous energy throughput. Order from flux." },
  { n: "III", title: "Information as Entropy", author: "Shannon · Bateson", text: "Shannon entropy mirrors Boltzmann's formula. Biological information — DNA, neural patterns, immune memory — is negative entropy: constraints selecting one possibility from many. Bateson: \"information is a difference that makes a difference.\" Meaning is anti-entropy." },
  { n: "IV", title: "Temporal Arrow", author: "Boltzmann · Whitehead", text: "The entropic arrow of time is the biological arrow of life. Aging is entropy accumulation; development is local entropy decrease. Whitehead's process philosophy: organisms as \"occasions of experience\" — each moment a thermodynamic event. Time is the unfolding of entropy." },
  { n: "V", title: "Consciousness & Entropy", author: "Tononi · Friston", text: "The brain minimizes \"free energy\" (surprise) — Friston's active inference: life as variational free energy minimization. Consciousness may be understood as a system that models and reduces entropy in its predictions. To be aware is to compress the world's disorder into coherent form." }
];

export default function BioPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<string>("mol");
  const [selectedEntry, setSelectedEntry] = useState<BioEntry | null>(null);

  const activeScale = BIO_SCALES.find((s) => s.id === activeTab);

  const getDirLabel = (dir: string) => {
    return {
      increase: "▲ Increase — dispersal",
      decrease: "▼ Decrease — negentropy",
      neutral: "◆ Flux — equilibrium",
      complex: "∞ Complex — coupled"
    }[dir] || dir;
  };

  const getDirColorClass = (dir: string) => {
    return {
      increase: "text-red-500 bg-red-500/10",
      decrease: "text-orange-400 bg-orange-500/10",
      neutral: "text-amber-400 bg-amber-400/10",
      complex: "text-purple-400 bg-purple-400/10"
    }[dir] || "text-gray-400 bg-gray-400/10";
  };

  const getDirColorClassHex = (dir: string) => {
    return {
      increase: "#ef4444",
      decrease: "#f97316",
      neutral: "#fbbf24",
      complex: "#c084fc"
    }[dir] || "#9ca3af";
  };

  return (
    <div className="absolute inset-0 bg-[#050505] text-[#eeeae4] overflow-y-auto z-[200] p-6 flex flex-col border-2 border-orange-500/20 rounded-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-4 sticky top-0 bg-[#050505]/95 z-20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#c9a84c] tracking-wider flex items-center gap-2">
            🧬 BIOLOGICAL ENTROPY ATLAS
          </h2>
          <p className="text-xs text-[#8898aa] font-mono mt-1">Thermodynamic S & Metaphysics of Far-From-Equilibrium Systems · dS/dt ≥ 0 · Yet life locally rises</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex border border-orange-500/20 rounded p-2 text-center text-[10px] font-mono leading-tight bg-orange-500/5">
            <span className="text-[#c9a84c] font-bold block">dS/dt ≥ 0</span>
            <span className="text-[8px] text-gray-500">Global thermodynamic law</span>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/30 rounded px-4 py-2 text-xs font-mono text-orange-400 hover:bg-orange-500/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE
          </button>
        </div>
      </div>

      {/* Main Grid Setup */}
      <div className="flex-1 flex gap-6 min-h-0 relative">
        {/* Sidebar Nav */}
        <div className="w-[180px] shrink-0 border-r border-orange-500/15 p-1 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-widest text-[#6b7a8d] block mb-2 px-2">Atlas Scales</span>
            {BIO_SCALES.map((scale) => (
              <button
                key={scale.id}
                onClick={() => { setActiveTab(scale.id); setSelectedEntry(null); }}
                className={`w-full text-left p-2.5 rounded transition-all cursor-pointer flex items-center gap-2 border ${
                  activeTab === scale.id 
                    ? "bg-orange-500/10 border-orange-500/30 text-[#c9a84c]" 
                    : "border-transparent text-[#8898aa] hover:bg-white/5 hover:text-orange-400"
                }`}
              >
                <span>{scale.icon}</span> {scale.label}
              </button>
            ))}
            <button
              onClick={() => { setActiveTab("pillars"); setSelectedEntry(null); }}
              className={`w-full text-left p-2.5 rounded transition-all cursor-pointer flex items-center gap-2 border ${
                activeTab === "pillars" 
                  ? "bg-amber-400/10 border-amber-400/40 text-amber-400" 
                  : "border-transparent text-[#8898aa] hover:bg-white/5 hover:text-amber-400"
              }`}
            >
              <span>◈</span> Five Pillars
            </button>
          </div>

          <div className="border-t border-orange-500/15 pt-4 mt-4 text-[9px] text-gray-500 space-y-2">
            <span className="uppercase tracking-widest text-gray-600 block mb-1">Entropy directions</span>
            <div><span className="text-orange-400 mr-2">▼</span> Decrease (negentropy)</div>
            <div><span className="text-red-500 mr-2">▲</span> Increase (dispersal)</div>
            <div><span className="text-amber-400 mr-2">◆</span> Flux (equilibrium)</div>
            <div><span className="text-purple-400 mr-2">∞</span> Complex (integrated)</div>
          </div>
        </div>

        {/* Content Panel Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {activeTab === "pillars" ? (
            <div className="space-y-6">
              <h3 className="font-serif text-lg text-amber-400 tracking-wide uppercase border-b border-amber-400/20 pb-2">
                ◈ THE FIVE PILLARS OF BIOLOGICAL ENTROPY
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BIO_PILLARS.map((p) => (
                  <div key={p.n} className="bg-[#0d0d0d]/60 border border-orange-500/20 rounded-lg p-5 flex gap-4">
                    <div className="font-serif text-4xl text-amber-500/20 font-bold leading-none min-w-[32px]">{p.n}</div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-white">{p.title}</h4>
                      <div className="text-[10px] text-amber-400/60 font-mono uppercase tracking-wider">{p.author}</div>
                      <p className="text-xs text-[#8898aa] leading-relaxed pt-1">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeScale ? (
            <div className="space-y-6 animate-fadeIn pb-10">
              {/* Scale Header */}
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold font-serif" style={{ color: activeScale.color }}>
                  {activeScale.icon} {activeScale.label} Scale
                </h3>
                <p className="text-xs text-[#8898aa] font-mono mt-1">{activeScale.desc}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-3xl">{activeScale.descLong}</p>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeScale.entries.map((entry, idx) => (
                  <div
                    key={entry.name}
                    onClick={() => setSelectedEntry(entry)}
                    className="bg-[#090909]/80 border border-orange-500/15 rounded-lg p-4 cursor-pointer hover:border-amber-400/30 hover:bg-[#070707] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/5 transition-all relative overflow-hidden"
                  >
                    {/* Top thin line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-orange-500/40 to-transparent"></div>

                    <div className="font-serif font-bold text-sm text-[#c9a84c] mb-1">{entry.icon} {entry.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono mb-3">{entry.type}</div>

                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-lg font-bold font-mono tracking-tight" style={{ color: activeScale.color }}>{entry.sVal}</span>
                      <span className="text-[9px] text-[#8898aa] font-mono uppercase tracking-wide">{entry.sUnit}</span>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className={`px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${getDirColorClass(entry.dir)}`}>
                        {entry.dir}
                      </span>
                      {/* Resonance dots */}
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, dIdx) => (
                          <span 
                            key={dIdx} 
                            className={`w-1.5 h-1.5 rounded-full ${dIdx < entry.res ? "bg-orange-500" : "bg-white/10"}`}
                          ></span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Detailed Slide over Panel */}
        {selectedEntry && (
          <div className="w-[340px] bg-[#070707]/95 border-l border-orange-500/20 shrink-0 p-5 rounded-lg flex flex-col justify-between overflow-y-auto animate-fadeIn absolute right-0 top-0 bottom-0 md:relative md:h-auto z-[25]">
            <button 
              onClick={() => setSelectedEntry(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              {/* Icon badge */}
              <div className="text-center p-4 bg-white/5 rounded-lg border border-orange-500/20">
                <span className="text-4xl block mb-2">{selectedEntry.icon}</span>
                <h3 className="text-base font-bold font-serif text-[#c9a84c]">{selectedEntry.name}</h3>
                <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">{selectedEntry.type}</p>
                <div className="flex justify-center items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold font-mono text-orange-400">{selectedEntry.sVal}</span>
                  <span className="text-[10px] text-gray-400 font-mono uppercase">{selectedEntry.sUnit}</span>
                </div>
                <div className="text-[9px] uppercase font-mono mt-2" style={{ color: getDirColorClassHex(selectedEntry.dir) }}>
                  Direction: {getDirLabel(selectedEntry.dir)}
                </div>
              </div>

              {/* Profile details */}
              <div className="space-y-1 pb-3 border-b border-white/5 text-xs">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-orange-500">Thermodynamic Profile</h4>
                <p className="text-[11px] text-[#8898aa] leading-relaxed pl-1 pt-1">{selectedEntry.thermo}</p>
              </div>

              {/* Philosophical synthesis */}
              <div className="space-y-1 pb-3 border-b border-white/5 text-xs font-serif italic">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#c9a84c] not-italic">◈ Philosophical Synthesis</h4>
                <p className="text-[11px] text-[#eeeae4]/80 leading-relaxed pl-1 pt-1">&quot;{selectedEntry.phil}&quot;</p>
              </div>

              {/* Metaphysical state */}
              <div className="bg-orange-500/5 border border-orange-500/15 rounded-lg p-3 text-xs leading-relaxed space-y-1 font-mono">
                <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Metaphysical State</span>
                <span className="text-[#c9a84c] block font-bold">{selectedEntry.meta}</span>
              </div>
            </div>

            <button
              onClick={() => onSendPrompt(`Analyze the biological concept of ${selectedEntry.name} (${selectedEntry.type}) at a molar and metabolic scale through the lens of T x S = C`)}
              className="w-full mt-4 bg-orange-500/10 border border-orange-500/30 rounded py-2 text-xs font-mono font-bold text-orange-400 cursor-pointer hover:bg-orange-500/20 transition-all text-center"
            >
              ✦ Ask Unified AI About This Scale ✦
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
