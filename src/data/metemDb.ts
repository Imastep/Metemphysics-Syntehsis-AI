/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScienceItem, METEM_DB_Type, KnodeNode, KnodeGraph } from "../types";

export const METEM_DB: METEM_DB_Type = {
  science: [
    { id: "physics", name: "Physics", category: "science", subcategory: "fundamentals", concepts: ["time", "entropy", "light", "gravity", "quantum", "relativity"], summary: "Core physical laws, scales, and discovery maps.", confidence: 0.98, related: ["cosmology", "chemistry", "neuroscience"], sourceType: "science", displayOrder: 1, omegaVal: "Ω = 949" },
    { id: "biology", name: "Biology", category: "science", subcategory: "life", concepts: ["life", "cell", "dna", "brain", "evolution", "consciousness"], summary: "Life, metabolism, information, and mind systems.", confidence: 0.97, related: ["neuroscience", "chemistry", "psychology"], sourceType: "science", displayOrder: 2, omegaVal: "Ω = 528" },
    { id: "chemistry", name: "Chemistry", category: "science", subcategory: "matter", concepts: ["elements", "atoms", "bonds", "entropy", "energy", "states"], summary: "Matter, reactions, periodicity, and phase behavior.", confidence: 0.96, related: ["physics", "biology", "periodic-table"], sourceType: "science", displayOrder: 3, omegaVal: "Ω = 417" },
    { id: "cosmology", name: "Cosmology", category: "science", subcategory: "universe", concepts: ["universe", "big bang", "stars", "galaxy", "heat death", "singularity"], summary: "Universe-scale timeline and cosmic evolution.", confidence: 0.96, related: ["physics", "astronomy", "philosophy"], sourceType: "science", displayOrder: 4, omegaVal: "Ω = 852" },
    { id: "neuroscience", name: "Neuroscience", category: "science", subcategory: "mind", concepts: ["brain", "memory", "attention", "awareness", "signal", "plasticity"], summary: "Mind, perception, and neural computation.", confidence: 0.96, related: ["biology", "psychology", "ai"], sourceType: "science", displayOrder: 5, omegaVal: "Ω = 639" },
    { id: "ai", name: "Artificial Intelligence", category: "science", subcategory: "computing", concepts: ["ai", "llm", "neural network", "embedding", "ontology", "reasoning"], summary: "Machine reasoning, learning, and symbolic/neural hybrid systems.", confidence: 0.97, related: ["neuroscience", "computer-science", "logic"], sourceType: "science", displayOrder: 6, omegaVal: "Ω = 396" }
  ],
  religions: [
    { id: "hinduism", name: "Hinduism (Advaita Vedanta)", category: "religion", subcategory: "dharmic", concepts: ["brahman", "atman", "maya", "moksha", "dharma", "karma"], summary: "Absolute nondual reality, soul liberation, and cycle of cosmic resonance.", confidence: 0.97, related: ["buddhism", "taoism", "kabbalah"], sourceType: "religion", displayOrder: 1, omegaVal: "Ω = 963" },
    { id: "buddhism", name: "Buddhism (Zen & Madhyamaka)", category: "religion", subcategory: "dharmic", concepts: ["dukkha", "emptiness", "dependent origination", "nirvana", "compassion"], summary: "Cessation of suffering through direct awakening and realization of voidness.", confidence: 0.97, related: ["hinduism", "taoism", "psychology"], sourceType: "religion", displayOrder: 2, omegaVal: "Ω = 528" },
    { id: "taoism", name: "Taoism (Lao Tzu)", category: "religion", subcategory: "east-asian", concepts: ["tao", "wu wei", "yin yang", "spontaneity", "flow"], summary: "Natural alignment with the absolute order, effortless action, and polarity balance.", confidence: 0.96, related: ["buddhism", "hermeticism", "sacred-geometry"], sourceType: "religion", displayOrder: 3, omegaVal: "Ω = 639" },
    { id: "kabbalah", name: "Kabbalah (Jewish Mysticism)", category: "religion", subcategory: "mystical", concepts: ["ein sof", "sephirot", "tzimtzum", "tree of life", "emanation"], summary: "Sephirot emanations, cosmic contraction, and structure of divine potentiality.", confidence: 0.96, related: ["hinduism", "christianity", "hermeticism"], sourceType: "religion", displayOrder: 4, omegaVal: "Ω = 741" },
    { id: "christianity", name: "Christian Mysticism", category: "religion", subcategory: "abrahamic", concepts: ["agape", "logos", "grace", "interior castle", "divine union"], summary: "Unconditional agape love, logos redemption, and interior castle soul stages.", confidence: 0.95, related: ["kabbalah", "islam", "ethics"], sourceType: "religion", displayOrder: 5, omegaVal: "Ω = 396" },
    { id: "islam", name: "Sufism (Islamic Mysticism)", category: "religion", subcategory: "mystical", concepts: ["fana", "baqa", "dhikr", "divine love", "annihilation"], summary: "Total dissolution of self (fana) and baqa abiding inside absolute divine love.", confidence: 0.95, related: ["islam", "kabbalah", "buddhism"], sourceType: "religion", displayOrder: 6, omegaVal: "Ω = 852" },
    { id: "hermeticism", name: "Hermeticism (Kybalion)", category: "religion", subcategory: "mystical", concepts: ["hermes", "as above so below", "kybalion", "vibration", "polarity"], summary: "The seven laws of mind, vibration, polarity, rhythm, and mental gender.", confidence: 0.96, related: ["kabbalah", "neoplatonism"], sourceType: "religion", displayOrder: 7, omegaVal: "Ω = 528" },
    { id: "gnosticism", name: "Gnosticism", category: "religion", subcategory: "mystical", concepts: ["gnosis", "demiurge", "aeons", "sophia", "divine spark"], summary: "Direct mystical insight freeing the trapped divine spark from the demiurgic matrix.", confidence: 0.94, related: ["kabbalah", "hermeticism"], sourceType: "religion", displayOrder: 8, omegaVal: "Ω = 417" },
    { id: "neoplatonism", name: "Neoplatonism (Plotinus)", category: "religion", subcategory: "mystical", concepts: ["the one", "intellect", "soul", "emanation", "henosis"], summary: "The return of soul to the supreme One via divine emanation and henosis union.", confidence: 0.95, related: ["hermeticism", "kabbalah"], sourceType: "religion", displayOrder: 9, omegaVal: "Ω = 741" },
    { id: "shinto", name: "Shinto (Kami Flow)", category: "religion", subcategory: "east-asian", concepts: ["kami", "musubi", "purity", "nature", "kannagara"], summary: "Generative force of kami interaction, purification, and harmony with natural spirits.", confidence: 0.91, related: ["taoism", "buddhism"], sourceType: "religion", displayOrder: 10, omegaVal: "Ω = 417" },
    { id: "sikhism", name: "Sikhism (Gurmat)", category: "religion", subcategory: "dharmic", concepts: ["ik onkar", "naam simran", "seva", "sach khand", "oneness"], summary: "The nondual Creator, loving remembrance of the Name, and state of absolute truth.", confidence: 0.95, related: ["hinduism", "sufism"], sourceType: "religion", displayOrder: 11, omegaVal: "Ω = 963" },
    { id: "zoroastrianism", name: "Zoroastrianism", category: "religion", subcategory: "mystical", concepts: ["asha", "vohu manah", "spenta mainyu", "cosmic order"], summary: "Cosmic truth (Asha) aligned with good mind and ultimate light/darkness resolution.", confidence: 0.93, related: ["christianity", "neoplatonism"], sourceType: "religion", displayOrder: 12, omegaVal: "Ω = 528" },
    { id: "shamanism", name: "Shamanism", category: "religion", subcategory: "mystical", concepts: ["axis mundi", "trance", "spirit world", "medicine wheel", "nature"], summary: "Direct spirit travel along the axis mundi, utilizing ecstatic trance and nature balance.", confidence: 0.92, related: ["hermeticism", "taoism"], sourceType: "religion", displayOrder: 13, omegaVal: "Ω = 285" },
    { id: "pythagoreanism", name: "Pythagoreanism", category: "religion", subcategory: "western-esoteric", concepts: ["tetraktys", "sacred geometry", "harmonic ratio", "number"], summary: "Cosmo-logic where numbers are divine archetypes and reality is musical harmony.", confidence: 0.96, related: ["platonism", "neoplatonism", "hermeticism"], sourceType: "religion", displayOrder: 14, omegaVal: "Ω = 528" },
    { id: "kashmir_shaivism", name: "Kashmir Shaivism", category: "religion", subcategory: "dharmic", concepts: ["spanda", "shiva-shakti", "pratyabhijna", "recognition"], summary: "Dynamic vibration (Spanda) of consciousness as the identity of Shiva and Shakti.", confidence: 0.96, related: ["hinduism", "zen", "sufism"], sourceType: "religion", displayOrder: 15, omegaVal: "Ω = 963" },
    { id: "platonism", name: "Platonism", category: "religion", subcategory: "philosophy", concepts: ["forms", "anamnesis", "the good", "unwritten doctrines"], summary: "World of transcendent ideal forms remembered by the soul, peaking in the Good.", confidence: 0.95, related: ["neoplatonism", "pythagoreanism", "stoicism"], sourceType: "religion", displayOrder: 16, omegaVal: "Ω = 741" },
    { id: "stoicism", name: "Stoicism", category: "religion", subcategory: "philosophy", concepts: ["logos", "amor fati", "ataraxia", "virtue"], summary: "Living in accordance with the universal Logos, accepting fate, and mental tranquility.", confidence: 0.95, related: ["platonism", "aristotle"], sourceType: "religion", displayOrder: 17, omegaVal: "Ω = 396" },
    { id: "alchemy_rose", name: "Rosicrucianism", category: "religion", subcategory: "western-esoteric", concepts: ["magnum opus", "rose cross", "alchemy", "spiritual gold"], summary: "Esoteric brotherhood seeking spiritual transmutation and integration of all sciences.", confidence: 0.94, related: ["hermeticism", "kabbalah", "alchemy"], sourceType: "religion", displayOrder: 18, omegaVal: "Ω = 528" },
    { id: "mayan_cosmology", name: "Mayan Cosmology", category: "religion", subcategory: "ancient-cosmic", concepts: ["hunab ku", "tzolkin", "galactic center", "cycles"], summary: "Vibrations from the galactic center (Hunab Ku) syncing with cosmic temporal cycles.", confidence: 0.92, related: ["cosmology", "sufism"], sourceType: "religion", displayOrder: 19, omegaVal: "Ω = 852" },
    { id: "egypt_thoth", name: "Egypt-Thoth Mysteries", category: "religion", subcategory: "ancient-cosmic", concepts: ["neteru", "ma'at", "emerald tablet", "sacred geometry"], summary: "Ma'at cosmic balance and sacred geometry pathways of the immortal soul.", confidence: 0.95, related: ["hermeticism", "kabbalah"], sourceType: "religion", displayOrder: 20, omegaVal: "Ω = 963" },
    { id: "norse_runes", name: "Norse Runes Mysticism", category: "religion", subcategory: "western-esoteric", concepts: ["yggdrasil", "galdr", "wyrd", "fate", "runes"], summary: "Cosmic tree Yggdrasil and vibrational magic runes structuring the threads of fate.", confidence: 0.91, related: ["shamanism", "hermeticism"], sourceType: "religion", displayOrder: 21, omegaVal: "Ω = 417" },
    { id: "aboriginal_dream", name: "Aboriginal Dreamtime", category: "religion", subcategory: "ancient-cosmic", concepts: ["songlines", "dreamtime", "ancestors", "eternal now"], summary: "Singing the landscape into existence through sacred frequency songlines.", confidence: 0.93, related: ["shamanism", "taoism"], sourceType: "religion", displayOrder: 22, omegaVal: "Ω = 528" },
    { id: "integral_zen", name: "Integral AQAL Path", category: "religion", subcategory: "integral", concepts: ["altitudes", "four quadrants", "nondual", "wilber"], summary: "Ken Wilber's synthesis mapping all evolutionary paths into a single unified grid.", confidence: 0.96, related: ["buddhism", "hinduism", "spiral_dynamics"], sourceType: "religion", displayOrder: 23, omegaVal: "Ω = 963" },
    { id: "essene", name: "Essene Mysteries", category: "religion", subcategory: "mystical", concepts: ["communion", "angels", "light hierarchy", "peace"], summary: "An ancient branch of mystical communion with earthly and heavenly forces.", confidence: 0.94, related: ["kabbalah", "gnosticism"], sourceType: "religion", displayOrder: 24, omegaVal: "Ω = 741" }
  ],
  discoveries: [
    { id: "einstein", name: "Einstein", category: "discovery", subcategory: "physics", concepts: ["relativity", "space-time", "energy", "mass", "constancy"], summary: "Relativity and the structure of spacetime.", confidence: 0.98, related: ["physics", "cosmology", "newton"], sourceType: "science-history", displayOrder: 1 },
    { id: "boltzmann", name: "Boltzmann", category: "discovery", subcategory: "thermodynamics", concepts: ["entropy", "statistical mechanics", "microstates", "heat", "probability"], summary: "Entropy as statistical structure.", confidence: 0.97, related: ["physics", "chemistry", "shannon"], sourceType: "science-history", displayOrder: 2 },
    { id: "shannon", name: "Shannon", category: "discovery", subcategory: "information", concepts: ["information", "entropy", "coding", "communication", "signal"], summary: "Information theory and uncertainty.", confidence: 0.97, related: ["ai", "neuroscience", "computer-science"], sourceType: "science-history", displayOrder: 3 },
    { id: "darwin", name: "Darwin", category: "discovery", subcategory: "biology", concepts: ["evolution", "adaptation", "selection", "variation", "life"], summary: "Evolution by natural selection.", confidence: 0.96, related: ["biology", "neuroscience", "ecology"], sourceType: "science-history", displayOrder: 4 },
    { id: "heisenberg", name: "Heisenberg", category: "discovery", subcategory: "quantum", concepts: ["uncertainty", "quantum", "measurement", "observer", "limits"], summary: "Quantum limits on precision.", confidence: 0.96, related: ["physics", "quantum-mechanics", "epistemology"], sourceType: "science-history", displayOrder: 5 }
  ],
  systems: [
    { id: "spiral_dynamics", name: "Spiral Dynamics", category: "systems", subcategory: "evolutionary", concepts: ["vMEME", "Beck", "Graves", "Tier 2", "integral"], summary: "A model of evolutionary psychology charting levels of value structure and adaptive memes.", confidence: 0.95, related: ["wilber", "maslow"], sourceType: "systems", displayOrder: 1 },
    { id: "maslow", name: "Maslow's Hierarchy", category: "systems", subcategory: "needs", concepts: ["actualization", "transcendence", "needs", "motivation"], summary: "Abraham Maslow's stages of human motivation, leading to self-transcendence.", confidence: 0.96, related: ["spiral_dynamics", "aristotle"], sourceType: "systems", displayOrder: 2 },
    { id: "chakra", name: "Chakra System", category: "systems", subcategory: "energetic", concepts: ["kundalini", "prana", "subtle body", "nadis"], summary: "Ancient Tantric somatic of 7 energetic and consciousness vortexes.", confidence: 0.94, related: ["religions", "aurobindo"], sourceType: "systems", displayOrder: 3 },
    { id: "abraham_hicks", name: "Abraham-Hicks Scale", category: "systems", subcategory: "vibrational", concepts: ["vortex", "vibration", "emotion", "alignment"], summary: "A 22-step emotional guidance scale measuring coherence and alignment.", confidence: 0.91, related: ["chakra", "sufism"], sourceType: "systems", displayOrder: 4 },
    { id: "aurobindo", name: "Sri Aurobindo", category: "systems", subcategory: "integral", concepts: ["supermind", "involution", "supramental", "evolution"], summary: "Evolutionary yoga mapping the descent of Supermind and ascent of consciousness.", confidence: 0.95, related: ["wilber", "hinduism"], sourceType: "systems", displayOrder: 5 },
    { id: "hawkins", name: "Hawkins Map", category: "systems", subcategory: "consciousness", concepts: ["calibration", "attractor fields", "courage", "power vs force"], summary: "David Hawkins' logarithmic Map of Consciousness, calibrating fields between 1 and 1000.", confidence: 0.93, related: ["abraham_hicks", "teresa"], sourceType: "systems", displayOrder: 6 },
    { id: "teresa_of_avila", name: "Teresa of Avila", category: "systems", subcategory: "mysticism", concepts: ["mansion", "interior castle", "divine union", "prayer"], summary: "Christian mystical map of 7 interior castles/mansions of spiritual union.", confidence: 0.94, related: ["sufism", "hawkins"], sourceType: "systems", displayOrder: 7 },
    { id: "sufi_maqamat", name: "Sufi Maqamat", category: "systems", subcategory: "mysticism", concepts: ["maqam", "hal", "annihilation", "fana"], summary: "Sequential stages of heart purification and self-annihilation inside divine resonance.", confidence: 0.94, related: ["teresa_of_avila", "kabbalah"], sourceType: "systems", displayOrder: 8 },
    { id: "kabbalah_sefirot", name: "Kabbalah Sefirot", category: "systems", subcategory: "emanations", concepts: ["tree of life", "kether", "malchut", "sefirot"], summary: "Ten divine emanations and channels of creation mapping cosmos and psyche.", confidence: 0.96, related: ["kabbalah", "chakra"], sourceType: "systems", displayOrder: 9 },
    { id: "vedic_yugas", name: "Vedic Yugas", category: "systems", subcategory: "epochs", concepts: ["satya yuga", "kali yuga", "cyclical time", "epoch"], summary: "Four cyclical world ages tracking the density and illumination of the cosmic mind.", confidence: 0.92, related: ["hinduism", "cosmology"], sourceType: "systems", displayOrder: 10 },
    { id: "aristotle", name: "Aristotle Virtues", category: "systems", subcategory: "philosophy", concepts: ["virtue", "golden mean", "eudaimonia", "ethics"], summary: "Virtues as a golden mean between excess and deficiency to peak eudaimonia.", confidence: 0.97, related: ["maslow", "kohlberg"], sourceType: "systems", displayOrder: 11 },
    { id: "gurdjieff", name: "Gurdjieff 4th Way", category: "systems", subcategory: "esoteric", concepts: ["enneagram", "self-remembering", "waking sleep", "centers"], summary: "Esoteric transformation model mapping the 7 stages of conscious maturation.", confidence: 0.93, related: ["kegan", "leary"], sourceType: "systems", displayOrder: 12 },
    { id: "kegan", name: "Robert Kegan", category: "systems", subcategory: "constructive", concepts: ["orders of mind", "interaction", "self-authoring", "institutional"], summary: "Constructive-developmental theory charting 5 evolving orders of cognitive mind structure.", confidence: 0.95, related: ["piaget", "gurdjieff"], sourceType: "systems", displayOrder: 13 },
    { id: "leary", name: "Leary's 8-Circuit", category: "systems", subcategory: "neurological", concepts: ["circuit", "neuropolitics", "neurosomatic", "metaprogramming"], summary: "Eight neurological circuits of cognitive and post-terrestrial evolution.", confidence: 0.91, related: ["wilber", "gurdjieff"], sourceType: "systems", displayOrder: 14 },
    { id: "erikson", name: "Erik Erikson", category: "systems", subcategory: "psychosocial", concepts: ["crisis", "identity", "psychosocial", "stages"], summary: "Eight developmental life stages defined by core psychosocial crises.", confidence: 0.96, related: ["piaget", "maslow"], sourceType: "systems", displayOrder: 15 },
    { id: "piaget", name: "Jean Piaget", category: "systems", subcategory: "cognitive", concepts: ["schema", "operational", "formal", "accommodation"], summary: "The four structural stages of child and adolescent logical development.", confidence: 0.97, related: ["kegan", "erikson"], sourceType: "systems", displayOrder: 16 },
    { id: "wilber", name: "Ken Wilber (AQAL)", category: "systems", subcategory: "integral", concepts: ["quadrants", "altitudes", "spectrum", "lines"], summary: "Integral map of consciousness, integrating lineages into quadrants and altitudes.", confidence: 0.95, related: ["aurobindo", "spiral_dynamics"], sourceType: "systems", displayOrder: 17 },
    { id: "kohlberg", name: "Lawrence Kohlberg", category: "systems", subcategory: "morality", concepts: ["moral", "post-conventional", "ethics", "justice"], summary: "Six developmental stages of moral reasoning and justice ideals.", confidence: 0.96, related: ["aristotle", "kegan"], sourceType: "systems", displayOrder: 18 }
  ],
  formulas: [
    { id: "god_eq", name: "T × S = C", category: "formulas", subcategory: "conservation", concepts: ["time", "entropy", "conservation", "god equation", "speed of light"], summary: "The God Equation – the universal conservation law holding experienced time, entropy, and light speed constant.", confidence: 1.0, related: ["physics", "cosmology"], sourceType: "math", displayOrder: 1, omegaVal: "C" },
    { id: "order_qty", name: "Ω = 1 - e^(-C/Tk)", category: "formulas", subcategory: "negentropy", concepts: ["order", "negentropy", "temperature", "entropy", "calibration"], summary: "The Order Quantity – negentropy scaled precisely from 0 to 1.", confidence: 0.99, related: ["boltzmann", "shannon"], sourceType: "math", displayOrder: 2, omegaVal: "Ω" },
    { id: "timeliness", name: "J/S = C/(S·T) - 1", category: "formulas", subcategory: "timeliness", concepts: ["time experience", "speed", "flow ratio", "timeliness"], summary: "Timeliness ratio – represents the flow and dilation of how individual consciousness experiences time.", confidence: 0.98, related: ["einstein", "physics"], sourceType: "math", displayOrder: 3, omegaVal: "J/S" },
    { id: "soul_conserv", name: "C_soul = T1·S1 = T2·S2", category: "formulas", subcategory: "soul", concepts: ["soul", "conservation", "reincarnation", "lifetimes"], summary: "Soul conservation – dynamic constant of consciousness C preserved invariant across multiple biological loops and lifetimes.", confidence: 0.97, related: ["religions", "hinduism", "buddhism"], sourceType: "math", displayOrder: 4, omegaVal: "C_soul" },
    { id: "conscious_omega", name: "Ω_c = Ω_i · Ω_r · R", category: "formulas", subcategory: "consciousness", concepts: ["consciousness", "order", "self-reference", "reflection", "feedback"], summary: "Conscious Omega – self-referential order and subjective field reflexivity multipliers.", confidence: 0.98, related: ["systems", "neuroscience"], sourceType: "math", displayOrder: 5, omegaVal: "Ω_c" },
    { id: "rate_ordering", name: "dΩ/dt = (C/T²k) · e^(-C/Tk)", category: "formulas", subcategory: "dynamics", concepts: ["arrow of time", "rate", "ordering", "derivative", "evolution"], summary: "Rate of ordering – the dynamic differential derivative defining the arrow of consciousness through space-time.", confidence: 0.99, related: ["physics", "thermodynamics"], sourceType: "math", displayOrder: 6, omegaVal: "dΩ/dt" },
    { id: "uncertainty_princ", name: "ΔΩ · ΔT ≥ C/2", category: "formulas", subcategory: "uncertainty", concepts: ["uncertainty", "precision limit", "quantum", "planck"], summary: "Metemphysical uncertainty principle – the reciprocal threshold limit between structural order fluctuations and temporal duration.", confidence: 0.98, related: ["heisenberg", "quantum"], sourceType: "math", displayOrder: 7, omegaVal: "ΔΩ·ΔT" },
    { id: "omega_resonance", name: "Ω_combined = Ω1 + Ω2 + Ω1·Ω2·β", category: "formulas", subcategory: "resonance", concepts: ["love", "resonance", "coherence", "interconnection", "couples"], summary: "Omega resonance – the mathematical physics of cosmic, field-level, and interpersonal love resonance.", confidence: 0.98, related: ["systems", "buddhism", "mysticism"], sourceType: "math", displayOrder: 8, omegaVal: "Ω_combined" },
    { id: "mean_omega", name: "Ω̄ = (Ω_s + Ω_i + Ω_t + Ω_r + Ω_c)/5", category: "formulas", subcategory: "average", concepts: ["average", "center", "integrated", "balance", "holistic"], summary: "Mean Omega – the integrated metemphysical average indicator across all five cosmic and personal energetic centers.", confidence: 0.99, related: ["systems", "chakra"], sourceType: "math", displayOrder: 9, omegaVal: "Ω̄" }
  ]
};

export const KNOTES: Record<string, KnodeNode> = {
  greeting: new KnodeNode({
    id: "greeting",
    patterns: ["hello", "hi", "hey", "who are you", "introduce"],
    style: "warm",
    concepts: ["welcome", "intro"],
    transitions: ["core", "help", "personal"],
    priority: 3
  }),
  core: new KnodeNode({
    id: "core",
    patterns: ["metemphysics", "tsc", "god equation", "core framework"],
    style: "technical",
    concepts: ["entropy", "time", "light", "order", "conservation"],
    transitions: ["omega", "spark", "science", "religion", "discoveries"],
    priority: 5
  }),
  omega: new KnodeNode({
    id: "omega",
    patterns: ["omega", "js", "phase", "veil", "budget", "timeliness"],
    style: "analytical",
    concepts: ["consciousness", "budget", "state", "threshold"],
    transitions: ["spark", "singularity", "paragraph"],
    priority: 5
  }),
  spark: new KnodeNode({
    id: "spark",
    patterns: ["spark", "activation", "progress", "counter"],
    style: "event",
    concepts: ["threshold", "state", "activation"],
    transitions: ["singularity", "paragraph"],
    priority: 4
  }),
  singularity: new KnodeNode({
    id: "singularity",
    patterns: ["singularity", "revelation", "threshold", "avatar"],
    style: "threshold",
    concepts: ["event", "reset", "transcendence"],
    transitions: ["paragraph"],
    priority: 5
  }),
  science: new KnodeNode({
    id: "science",
    patterns: ["science", "physics", "biology", "chemistry", "cosmology", "neuroscience", "ai"],
    style: "research",
    concepts: ["discovery", "domain", "system"],
    transitions: ["discoveries", "paragraph"],
    priority: 4
  }),
  religion: new KnodeNode({
    id: "religion",
    patterns: ["religion", "hinduism", "buddhism", "taoism", "kabbalah", "christianity", "islam", "sufism"],
    style: "reflective",
    concepts: ["tradition", "mysticism", "ethics"],
    transitions: ["paragraph"],
    priority: 4
  }),
  discoveries: new KnodeNode({
    id: "discoveries",
    patterns: ["einstein", "boltzmann", "shannon", "darwin", "heisenberg"],
    style: "historical",
    concepts: ["theory", "breakthrough", "science-history"],
    transitions: ["paragraph"],
    priority: 4
  }),
  paragraph: new KnodeNode({
    id: "paragraph",
    patterns: ["explain", "why", "how", "detail", "paragraph", "summary"],
    style: "synthesized",
    concepts: ["reasoning", "synthesis", "context"],
    transitions: [],
    priority: 2
  })
};

export const GRAPH = new KnodeGraph(Object.values(KNOTES));

export function normalizeText(s: string): string {
  return (s || "").toLowerCase().replace(/[^a-z0-9\s-]+/g, " ");
}

export function relevanceScore(query: string, item: ScienceItem): number {
  const q = normalizeText(query);
  let score = 0;
  for (const c of item.concepts || []) {
    if (q.includes(normalizeText(c))) score += 3;
  }
  if (q.includes(normalizeText(item.name))) score += 5;
  if (q.includes(normalizeText(item.id))) score += 2;
  if (item.summary) {
    const summaryWords = item.summary.toLowerCase().split(/\s+/);
    for (const w of summaryWords.slice(0, 8)) {
      if (q.includes(w)) score += 0.25;
    }
  }
  score += (item.confidence || 0) * 2;
  return score;
}

export function getRelevantSidebarItems(query: string, category: "science" | "religions" | "discoveries", limit = 8): (ScienceItem & { score: number })[] {
  const arr = METEM_DB[category] || [];
  return arr
    .map(item => ({ ...item, score: relevanceScore(query, item) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function buildCrossInsight(query: string): string {
  const science = getRelevantSidebarItems(query, "science", 3);
  const religion = getRelevantSidebarItems(query, "religions", 3);
  const discovery = getRelevantSidebarItems(query, "discoveries", 3);

  return `
    <div class="meta-enrichment">
      <div class="me-head">Cross-Reference</div>
      <div class="spark-line">Science: ${science.map(x => x.name).join(", ")}</div>
      <div class="spark-line">Traditions: ${religion.map(x => x.name).join(", ")}</div>
      <div class="spark-line">Discoveries: ${discovery.map(x => x.name).join(", ")}</div>
    </div>
  `;
}
