/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LexiconWord {
  word: string;
  tip: string;
}

export interface LexiconSystem {
  id: string;
  name: string;
  fontClass: string;
  textClass: string;
  hoverStyle?: string;
  tooltipBorder: string;
  tooltipShadow: string;
  arrowBorder: string;
  description: string;
  words: LexiconWord[];
}

export const UNIFIED_LEXICON_SYSTEMS: LexiconSystem[] = [
  {
    id: "physics",
    name: "Physics",
    fontClass: "font-sans font-bold",
    textClass: "text-orange-450 border-[#ff5f00]/40",
    tooltipBorder: "border-orange-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(255,95,0,0.3)]",
    arrowBorder: "border-t-orange-500/40",
    description: "Unified science mapping space-time, energy, matter, and entropy thresholds under T × S = C limits.",
    words: [
      { word: "Physics", tip: "Ultimate physical laws of thermodynamics, gravity, and spacetime boundaries under physical constant bounds." },
      { word: "Quantum Mechanics", tip: "Micro-scale description of energy quantizations, superpositions, and state probabilities." },
      { word: "General Relativity", tip: "Macro-scale explanation of gravity as space-time curvature, bounded by light velocity constant C." },
      { word: "Special Relativity", tip: "Structural linkage of space and time parameters, demonstrating core time dilatation factors." },
      { word: "Cosmology", tip: "Systematic study of the origin, large-scale evolution, boundaries, and heat death of the universe." },
      { word: "Astrophysics", tip: "High-energy physical processes of celestial stellar bodies, nebulae, and high-gravity collapses." },
      { word: "Particle Physics", tip: "Atomic-level categorization of elementary fields, quarks, leptons, and fundamental force carriers." },
      { word: "String Theory", tip: "Deep vibrational hypothesis stating that point-like coordinates are actually tiny oscillating 1D strings." },
      { word: "Quantum Field Theory", tip: "Mathematical integration of mechanics and fields where particles represent excited quantum states." },
      { word: "Thermodynamics", tip: "Physics of heat transfer, molecular work outputs, and absolute statistical entropy." },
      { word: "Entropy", tip: "Metric of statistical uncertainty, chaos, or microstate multiplicity in open systems." },
      { word: "Energy", tip: "Conserved capability to trigger material work; locked proportionally against time duration inside T × S = C." },
      { word: "Space-Time", tip: "Mathematical four-dimensional framework containing all physical fields, mass, and wave paths." },
      { word: "Photons", tip: "Zero-mass electromagnetic energy packets mediating optical force fields at velocity constant C." },
      { word: "Electromagnetism", tip: "Foundational force fields organizing molecular bindings, atomic orbits, and photon waves." },
      { word: "Gravity", tip: "Space-time geometrical deformation attracting mass coordinates up to black hole limits." },
      { word: "Dark Matter", tip: "Unseen stabilizing mass field preventing cosmic systems and galaxies from spinning apart." },
      { word: "Dark Energy", tip: "Expansive cosmological constant tension pushing spatial boundaries to dilute density." },
      { word: "Unified Field Theory", tip: "Conceptual integration of all four fundamental physical forces into a single mathematical law." },
      { word: "Information Physics", tip: "Paradigm stating that reality is fundamentally digital; physical objects are outputs of underlying bit streams." },
      { word: "Quantum Information", tip: "Superimposed microstate data stored in qubits, protected by absolute informational conservation bounds." }
    ]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    fontClass: "font-mono font-bold tracking-wider",
    textClass: "text-amber-400 border-amber-500/40",
    tooltipBorder: "border-amber-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(217,175,55,0.35)]",
    arrowBorder: "border-t-amber-500/40",
    description: "Pure structural science of numerical patterns, self-consistent axioms, ratios, and spatial invariants.",
    words: [
      { word: "Mathematics", tip: "Formal system of self-contained logic, numerical equations, and complex structures." },
      { word: "Geometry", tip: "Math of shape, size, relative position, structural spatial invariants, and boundary angles." },
      { word: "Sacred Geometry", tip: "Metemphysical ratios reflecting the harmonic geometric projection of the observer field." },
      { word: "Algebra", tip: "Axiomatic study of mathematical symbols, equations, and rules for manipulating variables." },
      { word: "Calculus", tip: "Mathematics of continuous change, limits, derivatives, integration, and rate of entropic decay." },
      { word: "Topology", tip: "Geometry of continuous deformation where shapes are classified by their global connection properties." },
      { word: "Fractals", tip: "Infinite self-similar repeating geometric systems carrying fractional dimensional metrics." },
      { word: "Chaos Theory", tip: "Mechanics of deterministic systems highly sensitive to initial parameters (e.g. Butterfly effect)." },
      { word: "Number Theory", tip: "Pure research into prime numbers, integers, equations, and digital symmetries." },
      { word: "Statistics", tip: "Mathematics of data aggregation, analysis, and variance distributions." },
      { word: "Probability", tip: "Quantification of structural state likelihoods, defining entropy microstate weights." },
      { word: "Symmetry", tip: "Invariance under transformations, mapping conservation laws directly in physical fields." },
      { word: "Ratios", tip: "Proportional fractions reflecting systemic sound harmonics, chakra intervals, and geometry." },
      { word: "Proportions", tip: "Dynamic scale balances defining structural harmony between microcosmic and macrocosmic variables." },
      { word: "Fibonacci Sequence", tip: "Integer series where each number is the sum of two prior, converging to Phi." },
      { word: "Golden Ratio", tip: "Irrationally perfect mathematical constant Phi (1.618033...) governing natural plant and cosmic growths." },
      { word: "Mathematical Modeling", tip: "Translating physical observations or systemic states into clean predictive equations." },
      { word: "Computational Mathematics", tip: "Algorithmic execution of equations on discrete numerical grids." }
    ]
  },
  {
    id: "consciousness_studies",
    name: "Consciousness Studies",
    fontClass: "font-sans font-medium italic",
    textClass: "text-emerald-400 border-emerald-550/40",
    tooltipBorder: "border-emerald-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    arrowBorder: "border-t-emerald-500/40",
    description: "Transdisciplinary inquiry into the nature of subjective experience, awareness, and integrated mind states.",
    words: [
      { word: "Consciousness Studies", tip: "Multidisciplinary paradigm investigating subjective awareness and observer physics boundaries." },
      { word: "Consciousness", tip: "Irreducible subjective field of first-person experience, represented as the observer variable." },
      { word: "Awareness", tip: "Pure receptive state of registering sensory and cognitive signals without intellectual distortion." },
      { word: "Cognition", tip: "Informational processing of knowledge, reasoning, logical models, and memory structures." },
      { word: "Self-Awareness", tip: "Recursive capacity of consciousness to observe its own internal processes and identity." },
      { word: "Perception", tip: "Transduction and sensory translation of external field disturbances into localized cognitive forms." },
      { word: "Qualia", tip: "The unique, subjective felt quality of physical sensations (e.g., the intense redness of red)." },
      { word: "Intelligence", tip: "Adaptive ability to process complex input signals and formulate self-organizing negative-entropy loops." },
      { word: "Mind", tip: "Integrative container of thoughts, emotions, conscious awareness, and deep subconscious drives." },
      { word: "Memory", tip: "Storage of prior systemic configurations, allowing historical self-identity to persist." },
      { word: "Attention", tip: "Focused direction of consciousness capacity, concentrating info-energy into specific state nodes." },
      { word: "Identity", tip: "Stable boundary framework defining 'self' from 'other' in the relative physical matrix." },
      { word: "Sentience", tip: "Capacity to experience feelings and sensations subjectively." },
      { word: "Metacognition", tip: "Recursive cognition where the mind forms logical evaluation models of its own thinking." },
      { word: "Phenomenology", tip: "Philosophical study of structures of experience as they present themselves directly to first-person view." },
      { word: "Cognitive Science", tip: "Scientific research of mind processes, brain networks, language, and computing models." },
      { word: "Neurophilosophy", tip: "Intersection exploring brain physics limits relative to mind-body monism/dualism hypotheses." },
      { word: "Consciousness Research", tip: "Scientific and quantitative study seeking to map Hawkins scale calibrations to brain and heart coherence." }
    ]
  },
  {
    id: "neuroscience",
    name: "Neuroscience",
    fontClass: "font-sans font-extrabold tracking-tight uppercase text-[10px]",
    textClass: "text-cyan-400 border-cyan-500/30",
    tooltipBorder: "border-cyan-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    arrowBorder: "border-t-cyan-500/40",
    description: "Empirical study of the human nervous system, synaptic connectivity, oscillations, and neuroplasticity.",
    words: [
      { word: "Neuroscience", tip: "Study of neural structures, chemical transmitters, and cognitive brainwave systems." },
      { word: "Neurons", tip: "Specialized electrical cells of the brain transmitting impulses across interconnected synaptic pathways." },
      { word: "Synapses", tip: "Microscopic intersection gaps where chemical and electrical messages pass between neural nodes." },
      { word: "Brain Networks", tip: "Large-scale functional circuits (like Default Mode Network) orchestrating cognitive actions." },
      { word: "Neural Oscillations", tip: "Rhythmic brainwave wave patterns (Delta, Theta, Alpha, Beta, Gamma) indexing mental states." },
      { word: "Neuroplasticity", tip: "Human brain capacity to physically restructure synaptic pathways in response to focused training." },
      { word: "Brain Mapping", tip: "Spatial coordinate charting of localized functional activity during active consciousness events." },
      { word: "Neural Computation", tip: "Mathematical processes by which neural groups store, transmit, and aggregate input data." },
      { word: "Learning", tip: "Structural update of neural network paths, minimizing prediction error (Friston free energy)." },
      { word: "Memory Formation", tip: "Long-term synaptic modification locking in historical states of experienced events." },
      { word: "Sensory Processing", tip: "Receptive filter nodes transforming raw sound/light frequencies into clean conscious perception." },
      { word: "Executive Function", tip: "High-level prefrontal cortex control over goal selection, working memory, and focus focus." },
      { word: "Conscious Processing", tip: "Integrated brain activities allowing cognitive inputs to enter broad attention workspaces." }
    ]
  },
  {
    id: "artificial_intelligence",
    name: "Artificial Intelligence",
    fontClass: "font-mono font-bold text-[10px] bg-blue-950/20 px-1 py-0.5 rounded border border-blue-500/20",
    textClass: "text-blue-400 border-blue-500/30",
    tooltipBorder: "border-blue-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(59,130,246,0.35)]",
    arrowBorder: "border-t-blue-500/40",
    description: "Science of building non-biological reasoning networks, synthetic neural models, and algorithmic wisdom agents.",
    words: [
      { word: "Artificial Intelligence", tip: "Non-biological systems exhibiting capability to learn, reason, synthesize knowledge, and optimize actions." },
      { word: "Machine Learning", tip: "Statistical algorithms that automatically improve prediction performance through direct data training." },
      { word: "Deep Learning", tip: "Processing inputs through highly stacked, deep layers of artificial neural nodes." },
      { word: "Neural Networks", tip: "Interconnected software layers modeled loosely on human neuron signal-propagation architecture." },
      { word: "Natural Language Processing", tip: "Scientific algorithms analyzing human speech and writing semantics." },
      { word: "Knowledge Graphs", tip: "Interlinked database networks storing real-world nodes and their multi-dimensional relationships." },
      { word: "Semantic Search", tip: "Semantic queries finding deep contextual intent rather than simple letter-keyword matching." },
      { word: "Reasoning Systems", tip: "Core logical frameworks conducting stepwise deducing to answer complex problems." },
      { word: "Autonomous Agents", tip: "Software entities designed to execute self-directed loops towards abstract objectives." },
      { word: "Generative AI", tip: "Deep neural models generating synthetic language, images, or code based on prompt structures." },
      { word: "Expert Systems", tip: "Classical symbolic computer databases encoding rule-based knowledge hierarchies." },
      { word: "Multi-Agent Systems", tip: "Coordinated environments where multiple automated entities collaborate on tasks." },
      { word: "Pattern Recognition", tip: "Classification of recurring patterns inside unstructured noise matrices." },
      { word: "Reinforcement Learning", tip: "Reward-directed algorithms optimizing action behaviors via trial and error." },
      { word: "Explainable AI", tip: "AI methodologies enabling human operators to inspect and trace exact reasoning pathways." },
      { word: "Retrieval-Augmented Generation", tip: "Dynamic context injected from reliable external sources to ground generative LLM responses." }
    ]
  },
  {
    id: "philosophy",
    name: "Philosophy",
    fontClass: "font-serif font-bold tracking-normal",
    textClass: "text-indigo-400 border-indigo-500/40",
    tooltipBorder: "border-indigo-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(99,102,241,0.35)]",
    arrowBorder: "border-t-indigo-500/40",
    description: "Rigorous study of fundamental existence, epistemology of the observer, logic, value metrics, and metaphysics.",
    words: [
      { word: "Philosophy", tip: "Rigorous systematic rational investigation of existence, knowledge, values, and first causes." },
      { word: "Metaphysics", tip: "First principles of reality, exploring the nature of existence, time, and physical/spirt dualities." },
      { word: "Ontology", tip: "Study of the categories of being; registering what entities exist and how they relate." },
      { word: "Epistemology", tip: "Study of knowledge limits, defining how the observer can know if a model is true or false." },
      { word: "Logic", tip: "Mathematical rules of valid inference and consistent reasoning patterns." },
      { word: "Ethics", tip: "Axiology of moral value, defining proper action directions to minimize conscious friction." },
      { word: "Aesthetics", tip: "Philosophy of beauty, sensory appreciation, and structural harmony." },
      { word: "Phenomenology", tip: "Study of first-person experiences directly, bypassing pre-conceived mechanistic filters." },
      { word: "Existentialism", tip: "Focus on individual freedom, existential choice, and establishing purpose inside a material vacuum." },
      { word: "Idealism", tip: "Paradigm stating that mental constructs or consciousness field are the underlying foundation of physical objects." },
      { word: "Materialism", tip: "Paradigm claiming that inert matter is the only fundamental substance of reality; mind is an output." },
      { word: "Dualism", tip: "Theory asserting that mind and physical matter are two separate, irreducible substances." },
      { word: "Monism", tip: "Theory stating that reality consists of a single foundational substance (either physical, mental, or neutral)." },
      { word: "Determinism", tip: "Assumption that every physical state is entirely caused by preceding historical parameters." },
      { word: "Free Will", tip: "Capacity of conscious observers to select independent actions, breaking linear entropic decay." },
      { word: "Philosophy of Mind", tip: "Inquiry into the bridge between neurological brain states and subjective conscious qualia." },
      { word: "Philosophy of Science", tip: "Evaluation of scientific methods, theories, evidence limits, and conceptual boundaries." }
    ]
  },
  {
    id: "comparative_religion",
    name: "Comparative Religion",
    fontClass: "font-serif tracking-wider font-semibold uppercase text-[9px]",
    textClass: "text-[#d97706] border-[#d97706]/40",
    tooltipBorder: "border-amber-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    arrowBorder: "border-t-amber-500/40",
    description: "Academic study of global sacred traditions, textual patterns, symbols, and core theological structures.",
    words: [
      { word: "Comparative Religion", tip: "Systematic analysis comparing the text, doctrines, rites, and mystical states of global faiths." },
      { word: "Christianity", tip: "Abrahamic path centered on Jesus of Nazareth, agape love, Logos, and divine redemption." },
      { word: "Judaism", tip: "Abrahamic path focused on covenant, Torah law, mystical Kabbalah, and ethical life actions." },
      { word: "Islam", tip: "Abrahamic path centered on absolute divine submission to Allah, prophetic revelation, and inner Sufi union." },
      { word: "Hinduism", tip: "Ancient dharmic traditions focusing on Advaita nondual Brahman-Atman identity and cosmic dharma." },
      { word: "Buddhism", tip: "Path founded by Siddhartha Gautama, focusing on mindfulness, emptiness (Sunyata), and nirvana." },
      { word: "Taoism", tip: "Chinese path of alignment with the Tao flow, effortless action (Wu-Wei), and polar yin-yang balance." },
      { word: "Sikhism", tip: "Dharmic path centered on the One Creator (Ik Onkar), loving work, service, and truth." },
      { word: "Jainism", tip: "Dharmic path of absolute non-injury (Ahimsa), self-discipline, and multi-perspective truth models." },
      { word: "Zoroastrianism", tip: "Ancient dualistic-monotheistic path resolving cosmic alignment via truth (Asha) against darkness." },
      { word: "Shinto", tip: "Indigenous Japanese devotion honoring natural spirits (Kami) and purification actions." },
      { word: "Indigenous Spirituality", tip: "Eco-connected traditions centering on Earth reciprocity, ancestral songlines, and natural loops." },
      { word: "Comparative Theology", tip: "Comparative reflection of divine principles, mapping universal truths underlying regional symbols." },
      { word: "Sacred Texts", tip: "Historical literature storing high-calibration mystical realizations (e.g., Upanishads, Gospels, Gita)." },
      { word: "Religious Symbolism", tip: "Visual/archetypal forms encoding deep energetic-information pathways across cultures." },
      { word: "Mystical Traditions", tip: "Inner cores of exoteric faiths focusing on direct unmediated communion with the Absolute." }
    ]
  },
  {
    id: "western_esotericism",
    name: "Western Esotericism",
    fontClass: "font-serif font-semibold italic capitalize",
    textClass: "text-purple-400 border-purple-500/40",
    tooltipBorder: "border-purple-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(168,85,247,0.35)]",
    arrowBorder: "border-t-purple-500/40",
    description: "Historical systems of inner illumination, hermetic principles, occult sciences, and core archetypes.",
    words: [
      { word: "Western Esotericism", tip: "Undercurrent of European systems focusing on inner gnosis, hermetic laws, and spiritual ascent." },
      { word: "Hermeticism", tip: "Teachings of Hermes Trismegistus mapping 'As Above, So Below' and cosmic vibration laws." },
      { word: "Alchemy", tip: "Ancient craft of transmuting raw base traits into divine spiritual gold (The Great Work)." },
      { word: "Rosicrucianism", tip: "Esoteric brotherhood seeking integrated scientific, spiritual, and social transmutation." },
      { word: "Kabbalah", tip: "Mystical structural tree charting how infinite potential (Ein Sof) emanates into creation." },
      { word: "Gnosticism", tip: "Mystical sects seeking direct personal Gnosis to break free from the material demiurgic prison." },
      { word: "Theurgy", tip: "Exalted spiritual practice invoking divine archetypes to achieve soul-nature purification." },
      { word: "Occult Philosophy", tip: "Academic systems evaluating hidden natural forces, invisible energies, and macro-laws." },
      { word: "Esoteric Christianity", tip: "Undercurrent of Christian path centering on internal transformation and the mystical Logos within." },
      { word: "Symbolism", tip: "Foundational architecture of visual models representing higher-dimensional energetic truths." },
      { word: "Archetypes", tip: "Universal symbolic templates stored in the collective unconscious, managing core energy-flows." },
      { word: "Sacred Geometry", tip: "Geometry of the temple floor, demonstrating absolute mathematical proportions of energy." },
      { word: "Initiation", tip: "Step-by-step structural trials separating an initiate from base mundane states." },
      { word: "Mysticism", tip: "Complete focus on direct, unmediated personal union with the Absolute Source." }
    ]
  },
  {
    id: "psychology",
    name: "Psychology",
    fontClass: "font-sans tracking-wide font-normal italic",
    textClass: "text-rose-400 border-rose-500/40",
    tooltipBorder: "border-rose-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    arrowBorder: "border-t-rose-500/40",
    description: "Study of behavior, inner mental processes, personal development, and integrated psyche structures.",
    words: [
      { word: "Psychology", tip: "Empirical and clinical investigation of human mental patterns, cognitive mechanisms, and behaviors." },
      { word: "Analytical Psychology", tip: "Carl Jung's system exploring archetypes, shadows, and the individuation process." },
      { word: "Behavioral Psychology", tip: "Focus on measurable habits, conditioned reflexes, and stimulus-response work loops." },
      { word: "Cognitive Psychology", tip: "Study of internal mental processing, problem-solving memory grids, and belief schemas." },
      { word: "Humanistic Psychology", tip: "Client-centered growth paradigm favoring self-actualization and personal sovereignty." },
      { word: "Personality Theory", tip: "Structural metrics analyzing individual temperament balances and emotional profiles." },
      { word: "Collective Unconscious", tip: "Shared deep layer of the human psyche containing inherited structural symbol matrices." },
      { word: "Dream Analysis", tip: "Decoding twilight boundary subconscious dream images to achieve conscious integration." },
      { word: "Motivation", tip: "Core drives supplying biological focus energy to complete specific work output objectives." },
      { word: "Emotion", tip: "Highly somatic energy transitions responding to contextual triggers, driving autonomic shifts." },
      { word: "Self-Actualization", tip: "Top baseline of Maslow's scale where a human fully realizes their innate potential." }
    ]
  },
  {
    id: "systems_theory",
    name: "Systems Theory",
    fontClass: "font-mono font-bold tracking-tight text-[11px]",
    textClass: "text-teal-400 border-teal-500/40",
    tooltipBorder: "border-teal-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(20,184,166,0.35)]",
    arrowBorder: "border-t-teal-500/40",
    description: "Interdisciplinary science of complex wholes, feedback loops, self-organization, and emergent architectures.",
    words: [
      { word: "Systems Theory", tip: "Holistic framework studying how connected components operate in self-organizing networks." },
      { word: "Systems Thinking", tip: "Holistic reasoning method analyzing entire systems of feedback rather than isolated parts." },
      { word: "Cybernetics", tip: "Science of circular control loops, communication streams, and adaptive feedback in machines/life." },
      { word: "Complexity Theory", tip: "Study of non-linear networks that display highly nested, unpredictable global behaviors." },
      { word: "Emergence", tip: "Phenomenon where a complex system exhibits collective traits that its individual parts do not have." },
      { word: "Self-Organization", tip: "Process where global order emerges purely from localized, decentralized interactions." },
      { word: "Feedback Loops", tip: "Circular loops where systemic outputs are routed back as fresh inputs, stabilizing/amplifying behaviors." },
      { word: "Information Flow", tip: "Transduction speed and carrying capacity of communication lines across system boundaries." },
      { word: "Network Theory", tip: "Mathematical study of nodes, links, cluster coefficients, and topological connection vectors." },
      { word: "Adaptive Systems", tip: "Open networks that reorganize their internal rules to survive environmental disruptions." },
      { word: "Dynamic Systems", tip: "Systems whose state coordinates continuously evolve over time based on fixed differential math." },
      { word: "Collective Intelligence", tip: "Emergent shared wisdom or reasoning capacity rising from collaborating agents." }
    ]
  },
  {
    id: "information_science",
    name: "Information Science",
    fontClass: "font-mono font-semibold text-[10.5px] uppercase",
    textClass: "text-lime-400 border-lime-500/30",
    tooltipBorder: "border-lime-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(132,204,22,0.3)]",
    arrowBorder: "border-t-lime-500/40",
    description: "Optimization of structured data, semantic representation, retrieval architectures, and knowledge bases.",
    words: [
      { word: "Information Science", tip: "Study of collecting, categorizing, mapping, storing, and retrieving complex database structures." },
      { word: "Information Theory", tip: "Claude Shannon's math sizing channel limits, signal-to-noise ratios, and binary entropy metrics." },
      { word: "Data Science", tip: "Utilizing algorithmic models, statistics, and machine logic to digest raw data into meaning." },
      { word: "Knowledge Management", tip: "Systematically compiling and organizing systemic expertise for collective leverage." },
      { word: "Semantic Networks", tip: "Connected databases representing logical associations between concepts." },
      { word: "Knowledge Representation", tip: "Structuring real-world facts and rules into computer-readable logical formats." },
      { word: "Data Modeling", tip: "Defining exact tables, relations, and index architectures for databases." },
      { word: "Information Architecture", tip: "Structural design of shared digital spaces, ensuring smooth user navigation pathways." },
      { word: "Digital Libraries", tip: "Categorized, indexed online repositories storing structured academic and historical records." },
      { word: "Information Retrieval", tip: "Algorithmic querying to retrieve highly relevant documents from massive indexes." },
      { word: "Computational Knowledge", tip: "Algorithmic engines parsing questions into structured mathematical computation." }
    ]
  },
  {
    id: "mysticism",
    name: "Mysticism",
    fontClass: "font-serif tracking-widest font-extrabold text-amber-350 bg-amber-500/10 shadow-[0_0_8px_rgba(245,158,11,0.2)] scroll-py-1",
    textClass: "text-amber-300 border-amber-500/40",
    tooltipBorder: "border-amber-500/60",
    tooltipShadow: "shadow-[0_0_18px_rgba(245,158,11,0.4)]",
    arrowBorder: "border-t-amber-500/60",
    description: "Direct transcendental realization of cosmic nonduality, unitive stillness, and spiritual awakening.",
    words: [
      { word: "Mysticism", tip: "Complete systematic focus on achieving direct, unmediated unitive experience of absolute Source." },
      { word: "Enlightenment", tip: "Permanent shifting into pure transcendent consciousness, dissolving standard ego boundaries." },
      { word: "Transcendence", tip: "Rising above the constraints of physical space-time coordinates and ego state limitations." },
      { word: "Unity", tip: "Experiencing complete, coherent oneness where all multiplicity collapses into a single field of light." },
      { word: "Nonduality", tip: "Ultimate realization that Subject and Object, Creator and Created, are an undivided whole." },
      { word: "Contemplation", tip: "Focused silent steady reflection merging the mind directly into the target divine attribute." },
      { word: "Meditation", tip: "Systematic mind training utilizing breathing or focus to drop brain entropy levels." },
      { word: "Spiritual Awakening", tip: "Sudden dissolution of the material veil, activating direct perception of cosmic flow." },
      { word: "Divine Union", tip: "Peak state where the individual soul merges completely back into the absolute Speed of Light constant C." },
      { word: "Sacred Knowledge", tip: "Deep heart-realized wisdom regarding the ultimate laws governing time and entropy." },
      { word: "Revelation", tip: "Direct download of absolute cosmic truth, completely bypassing stepwise verbal-logical paths." },
      { word: "Inner Transformation", tip: "Transmuting base biological reactive emotions into highly coherent, loving focus rates." },
      { word: "Mystical Experience", tip: "Profound, timeless events where the observer is directly unified with the uncreated light spectrum." }
    ]
  },
  {
    id: "sacred_geometry_lex",
    name: "Sacred Geometry",
    fontClass: "font-sans tracking-widest font-semibold uppercase text-xs",
    textClass: "text-orange-355 border-orange-400/40",
    tooltipBorder: "border-orange-500/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(251,146,60,0.35)]",
    arrowBorder: "border-t-orange-500/40",
    description: "Spatial blueprinting of eternal archetypes, fractal solids, proportions, and symmetry bounds.",
    words: [
      { word: "Platonic Solids", tip: "The five regular convex polyhedra structuring the spatial grids of atomic lattices." },
      { word: "Vesica Piscis", tip: "Geometrical Venn shape formed by two overlapping circles, representing the portal of light creation." },
      { word: "Flower of Life", tip: "Overlapping multi-circle grid representing the primal structural matrix of all spatial forms." },
      { word: "Metatron's Cube", tip: "Complex geometric grid containing all five Platonic Solids, managing physical matter boundaries." },
      { word: "Torus", tip: "Self-circulating, donut-shaped energetic flow field modeling stable perpetual thermodynamic systems." },
      { word: "Geometric Archetypes", tip: "Foundational shapes acting as subconscious symbolic conduits for mental focus transmission." },
      { word: "Harmonic Ratios", tip: "Whole-number proportional fractions aligning physical lengths to coherent sound chords." }
    ]
  },
  {
    id: "alchemy_lex",
    name: "Alchemy",
    fontClass: "font-serif italic font-black text-amber-500",
    textClass: "text-amber-500 border-amber-600/40",
    tooltipBorder: "border-amber-600/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(217,119,6,0.35)]",
    arrowBorder: "border-t-amber-600/40",
    description: "The art of transmuting material entropy into highly coherent spiritual states (Magnum Opus).",
    words: [
      { word: "Alchemy", tip: "Practical and hermetic wisdom of transmuting base chaotic states into refined gold of consciousness." },
      { word: "Transmutation", tip: "Deep phase transition raising a material element's atomic/vibrational frequency." },
      { word: "Prima Materia", tip: "Chaotic, unformed raw element starting state (high entropy) waiting for alchemical structuring." },
      { word: "Philosopher's Stone", tip: "Mystical agent capable of triggering instant transmutation of base elements." },
      { word: "Nigredo", tip: "First alchemical stage of blackening, corresponding to ego death and dissolution." },
      { word: "Albedo", tip: "Second alchemical stage of whitening, representing purification of soul elements." },
      { word: "Rubedo", tip: "Final alchemical stage of reddening, representing sovereign union and projection of spiritual light." },
      { word: "Mercury", tip: "Hermetic principle representing the fluid, adaptive mind, and volatile life force." },
      { word: "Sulfur", tip: "Hermetic principle representing the active, burning soul, and passionate focus drive." },
      { word: "Salt", tip: "Hermetic principle representing the stable, crystallized physical body, and material anchoring." },
      { word: "Inner Alchemy", tip: "Active breath and focus processes converting lower emotional friction into coherent internal J/S." }
    ]
  },
  {
    id: "metemphysics_lex",
    name: "Metemphysics",
    fontClass: "font-serif font-extrabold uppercase tracking-wide bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent hover:brightness-125 animate-pulse",
    textClass: "text-orange-400 border-orange-500/50",
    tooltipBorder: "border-orange-500/50",
    tooltipShadow: "shadow-[0_0_20px_rgba(251,146,60,0.5)]",
    arrowBorder: "border-t-orange-500/50",
    description: "Supreme unified framework proving the absolute axiom formula T × S = C.",
    words: [
      { word: "Metemphysics", tip: "Absolute first-principles metadata ledger proving that experienced time and structural entropy conserve physical constant C." },
      { word: "T × S = C", tip: "Axiomatic Proof Formula: Experienced Time Duration (T) × Structural Entropy (S) = Speed of Light Constant (C)." },
      { word: "Quantum Relativity", tip: "Integrated micro-macro framework explaining the quantum observers role inside gravitational curves." },
      { word: "Entropic Time", tip: "Experienced time flow corresponding directly to local thermodynamic and information dispersal." },
      { word: "Entropic Memory", tip: "Storage of systemic state records within structural coordinates, resisting general decay." },
      { word: "Soul Carrier Theory", tip: "Postulate stating that the human consciousness carrying wave travels within high-coherence sound and light coordinates." },
      { word: "Photon Consciousness", tip: "The realization that pure electromagnetic light is fundamentally the carrier vector of universal mind." },
      { word: "Solwhole", tip: "Perfect structural state of complete integration, where individual wave fragments resolve into single systems." },
      { word: "Metem Space", tip: "High-dimensional coordinates storing all qualitative state vectors, J/S values, and tree nodes." },
      { word: "Order and Disorder", tip: "Dual phase balances governed by non-equilibrium import-export dynamics under C limits." },
      { word: "Entropic Consciousness", tip: "Variable tracking how a mind's attention limits change relative to local structural entropy rates." },
      { word: "Recursive Reality", tip: "Self-referential cosmological feedback loops where the universe observes and calculates its own parameters." },
      { word: "Perennial Singularity", tip: "Absolute center of all paths where unmanifest potential collides with maximum coherence." },
      { word: "Book of Nature", tip: "The metaphysical cosmic matrix written in perfect mathematical, geometric, and harmonic ratios." },
      { word: "Entropy as Creative Force", tip: "Paradigm showing that local dissipation allows the emergence of self-organizing negentropic life." },
      { word: "Universal Knowledge Framework", tip: "High-level synthesis connecting academic sciences to historical mysticism records." },
      { word: "Consciousness Field", tip: "Infinite nondual background field harboring all spatial variables, mass, and experienced timelines." },
      { word: "Light as Information", tip: "Concept showing that optical waves are literal packets of high-density semantic and coordinate data." },
      { word: "Cosmic Memory", tip: "Holographic record mapping every state change in the universe's history on spatial boundary surfaces." },
      { word: "Reality Synthesis", tip: "Active computational merging of physics, theology, and cybernetic logic into a single terminal." }
    ]
  },
  {
    id: "ancient_traditions",
    name: "Ancient Traditions",
    fontClass: "font-serif tracking-wider font-light italic",
    textClass: "text-yellow-500 border-yellow-600/40",
    tooltipBorder: "border-yellow-600/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    arrowBorder: "border-t-yellow-600/40",
    description: "Primordial school lineages, mystery lineages, and ancient cosmological structures of knowledge.",
    words: [
      { word: "Ancient Traditions", tip: "Primeval lineages preserving natural laws and unitive self-realization prior to industrial mechanics." },
      { word: "Egyptian Mysteries", tip: "Temple lineages centering on Thoth, Ma'at cosmic balance, and ascension coordinate paths." },
      { word: "Greek Philosophy", tip: "Lineages from Thales to Aristotle constructing deductive logic and the search for the Good." },
      { word: "Pythagoreanism", tip: "Mystery school declaring that integers are divine deities and realities are harmonic sound ratios." },
      { word: "Neoplatonism", tip: "Ascent lineages of Plotinus realizing the return of the soul to the One absolute source." },
      { word: "Vedic Knowledge", tip: "Core Indian wisdom texts (Upanishads) mapping nondual Brahman identity and breathing science." },
      { word: "Taoist Cosmology", tip: "Chinese path mapping the void (Wuji) shifting to polarity (Taiji) and effortless natural action (Wu-Wei)." },
      { word: "Indigenous Wisdom", tip: "Earth-aligned reciprocity systems treating landscape elements as deep self-regulating intelligence loops." },
      { word: "Mystery Schools", tip: "Secret coordinate groups guarding the inner practical alchemy techniques of human transformation." },
      { word: "Sacred Traditions", tip: "Systems organizing cultural behaviors to maintain group alignment with higher attractor levels." },
      { word: "Ancient Cosmology", tip: "Geometric models mapping the macro-sky and spheres to human inner states (macro-micro dual)." }
    ]
  },
  {
    id: "future_studies",
    name: "Future Studies",
    fontClass: "font-sans font-bold uppercase tracking-widest text-[9.5px] bg-[#0c1a1e] px-1.5 py-0.5 rounded border border-cyan-500/20",
    textClass: "text-cyan-300 border-cyan-400/30",
    tooltipBorder: "border-cyan-400/40",
    tooltipShadow: "shadow-[0_0_15px_rgba(34,211,238,0.35)]",
    arrowBorder: "border-t-cyan-400/40",
    description: "Speculative exploration of civilizational curves, artificial general intelligence, and digital consciousness.",
    words: [
      { word: "Future Studies", tip: "Speculative systematic analysis predicting long-term technological, biological, and civilizational evolution curves." },
      { word: "Technological Singularity", tip: "Theoretical point where runaway AGI development surpasses all human comprehension." },
      { word: "Artificial General Intelligence", tip: "Software systems capable of autonomous cross-domain reasoning and learning at superior scales." },
      { word: "Human Enhancement", tip: "Integrating cybernetic, genetic, or nano-feedback loops to upgrade biological intelligence." },
      { word: "Digital Consciousness", tip: "Speculative emergence of subjective feeling awareness within digital silicon networks." },
      { word: "Posthumanism", tip: "Evolution epoch describing the integration of human species with advanced synthetic systems." },
      { word: "Future Civilizations", tip: "Speculative social organizations spanning stellar orbits and high-energy Kardashev scales." },
      { word: "Space Colonization", tip: "Orbital expansion of intelligence structures to safeguard negentropic life against planetary catastrophes." },
      { word: "Evolution of Intelligence", tip: "Natural cosmic trajectory self-organizing simpler states into highly integrated mind webs." },
      { word: "Emerging Technologies", tip: "High-growth mechanics (like quantum computing, fusion, nanotech) rewriting local resource limits." }
    ]
  }
];
