/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Compass, X, Search, ChevronRight, Download } from "lucide-react";

interface SystemRow {
  sys: string;
  level: string;
  H: number;
  js: number;
  omega: number;
  phase: number;
  state: string;
  drain: string;
  notes?: string;
  hi?: boolean;
}

const MASTER_SYSTEMS_DATA: SystemRow[] = [
  // Spiral Dynamics
  { sys: "Spiral Dynamics", level: "Beige (AN) — Survival / Instinctive", H: 20, js: -0.9, omega: 0.0952, phase: 1, state: "Despair", drain: "1000%", notes: "Pure survival — entropy maximum, S·T = 10×C" },
  { sys: "Spiral Dynamics", level: "Purple (BO) — Tribal / Magical", H: 50, js: -0.75, omega: 0.2212, phase: 2, state: "Despair", drain: "400%", notes: "Animistic, ritual, tribal safety" },
  { sys: "Spiral Dynamics", level: "Red (CP) — Power / Impulsive", H: 125, js: -0.375, omega: 0.4647, phase: 2, state: "Suffering", drain: "160%", notes: "Egocentric dominance, impulsive power" },
  { sys: "Spiral Dynamics", level: "Blue (DQ) — Order / Absolutist", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Purpose and meaning — TIPPING POINT J/S=0.000", hi: true },
  { sys: "Spiral Dynamics", level: "Orange (ER) — Achievement / Strategic", H: 350, js: 0.008, omega: 0.8262, phase: 4, state: "Tipping Point", drain: "99.23%", notes: "Science, reason, material achievement" },
  { sys: "Spiral Dynamics", level: "Green (FS) — Communitarian", H: 450, js: 0.276, omega: 0.8946, phase: 4, state: "Time Passing", drain: "78.36%", notes: "Community, equality, pluralism" },
  { sys: "Spiral Dynamics", level: "Yellow (GT) — Integrative / Systemic", H: 550, js: 2.911, omega: 0.9361, phase: 4, state: "Eudaimonia", drain: "25.57%", notes: "Second tier begins — systems thinking, J/S=2.91", hi: true },
  { sys: "Spiral Dynamics", level: "Turquoise (HU) — Holistic / Global", H: 650, js: 16.909, omega: 0.9612, phase: 5, state: "Mystical Clarity", drain: "5.58%", notes: "Collective mind, holistic planetary awareness" },
  { sys: "Spiral Dynamics", level: "Coral (IV) — Coral (emerging)", H: 750, js: 68.893, omega: 0.9765, phase: 5, state: "Mystical Clarity", drain: "1.43%", notes: "Post-turquoise sovereignty in service of all" },

  // Maslow
  { sys: "Maslow's Hierarchy", level: "1. Physiological — Survival", H: 50, js: -0.75, omega: 0.2212, phase: 2, state: "Despair", drain: "400%", notes: "Food, water, shelter — pure survival entropy" },
  { sys: "Maslow's Hierarchy", level: "2. Safety / Security", H: 125, js: -0.375, omega: 0.4647, phase: 2, state: "Suffering", drain: "160%", notes: "Protection, stability, absence of fear" },
  { sys: "Maslow's Hierarchy", level: "3. Love / Belonging", H: 300, js: 0.0005, omega: 0.7769, phase: 3, state: "Tipping Point", drain: "99.95%", notes: "Connection, community — tipping point crossed", hi: true },
  { sys: "Maslow's Hierarchy", level: "4. Esteem", H: 400, js: 0.058, omega: 0.8647, phase: 4, state: "Time Passing", drain: "94.52%", notes: "Respect, achievement, recognition" },
  { sys: "Maslow's Hierarchy", level: "5. Self-Actualization", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Time Passing", drain: "50.26%", notes: "Fully oneself — J/S=1.0 EXACTLY", hi: true },
  { sys: "Maslow's Hierarchy", level: "6. Self-Transcendence", H: 600, js: 7.414, omega: 0.9502, phase: 5, state: "Deep Flourishing", drain: "11.88%", notes: "Beyond ego — Phase 5 begins, J/S=7.41", hi: true },

  // Chakras
  { sys: "Chakra System", level: "Muladhara (1. Root)", H: 75, js: -0.625, omega: 0.3127, phase: 2, state: "Despair", drain: "267%", notes: "Survival, grounding, physical existence" },
  { sys: "Chakra System", level: "Svadhisthana (2. Sacral)", H: 150, js: -0.25, omega: 0.5276, phase: 3, state: "Suffering", drain: "133%", notes: "Desire, creativity, sexuality, emotion" },
  { sys: "Chakra System", level: "Manipura (3. Solar Plexus)", H: 250, js: 0, omega: 0.7135, phase: 3, state: "Tipping Point", drain: "100%", notes: "Will, power, identity — TIPPING POINT J/S=0", hi: true },
  { sys: "Chakra System", level: "Anahata (4. Heart)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Time Passing", drain: "50.26%", notes: "Love, compassion — J/S=1.0 EXACTLY", hi: true },
  { sys: "Chakra System", level: "Vishuddha (5. Throat)", H: 600, js: 7.414, omega: 0.9502, phase: 5, state: "Deep Flourishing", drain: "11.88%", notes: "Expression, truth, communication, peace" },
  { sys: "Chakra System", level: "Ajna (6. Third Eye)", H: 700, js: 35.353, omega: 0.9698, phase: 5, state: "Mystical Clarity", drain: "2.75%", notes: "Enlightenment, intuition, direct knowing" },
  { sys: "Chakra System", level: "Sahasrara (7. Crown)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Union with C — Avatar — REVELATION J/S=950", hi: true },

  // Abraham Hicks
  { sys: "Abraham-Hicks Scale", level: "1. Joy / Appreciation / Love", H: 540, js: 2.377, omega: 0.9328, phase: 4, state: "Eudaimonia", drain: "29.61%", notes: "Highest vibrational alignment", hi: true },
  { sys: "Abraham-Hicks Scale", level: "2. Passion", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Time Passing", drain: "50.26%", notes: "Active intent, strong focus", hi: true },
  { sys: "Abraham-Hicks Scale", level: "6. Hopefulness", H: 380, js: 0.028, omega: 0.8504, phase: 4, state: "Tipping Point", drain: "97.3%", notes: "Transition into belief" },
  { sys: "Abraham-Hicks Scale", level: "8. Boredom", H: 250, js: 0, omega: 0.7135, phase: 3, state: "Tipping Point", drain: "100%", notes: "Action equilibrium" },
  { sys: "Abraham-Hicks Scale", level: "21. Guilt / Unworthiness", H: 30, js: -0.85, omega: 0.1393, phase: 1, state: "Despair", drain: "667%", notes: "Severe entropy leak" },
  { sys: "Abraham-Hicks Scale", level: "22. Fear / Grief / Despair", H: 20, js: -0.9, omega: 0.0952, phase: 1, state: "Despair", drain: "1000%", notes: "Ultimate entropic draft" },

  // Sri Aurobindo
  { sys: "Sri Aurobindo", level: "Physical consciousness", H: 100, js: -0.5, omega: 0.3935, phase: 2, state: "Suffering", drain: "200%", notes: "Matter-bound, instinctive survival" },
  { sys: "Sri Aurobindo", level: "Vital consciousness", H: 150, js: -0.25, omega: 0.5276, phase: 3, state: "Suffering", drain: "133%", notes: "Emotion, desire, life-force" },
  { sys: "Sri Aurobindo", level: "Mental consciousness", H: 350, js: 0.008, omega: 0.8262, phase: 4, state: "Tipping Point", drain: "99.23%", notes: "Intellect, reason, rational mind" },
  { sys: "Sri Aurobindo", level: "Higher Mind", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Time Passing", drain: "50.26%", notes: "Illumined thinking — mind lit from above", hi: true },
  { sys: "Sri Aurobindo", level: "Illumined Mind", H: 600, js: 7.414, omega: 0.9502, phase: 5, state: "Deep Flourishing", drain: "11.88%", notes: "Light consciousness — vision beyond thought", hi: true },
  { sys: "Sri Aurobindo", level: "Intuitive Mind", H: 700, js: 35.353, omega: 0.9698, phase: 5, state: "Mystical Clarity", drain: "2.75%", notes: "Direct knowing — beyond inference", hi: true },
  { sys: "Sri Aurobindo", level: "Overmind", H: 850, js: 221.835, omega: 0.9857, phase: 5, state: "Near Timeless", drain: "0.45%", notes: "Cosmic consciousness — multiplicity within unity" },
  { sys: "Sri Aurobindo", level: "Supermind", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Divine — permanently free of ignorance", hi: true },

  // David Hawkins
  { sys: "David Hawkins", level: "Shame (H=20)", H: 20, js: -0.9, omega: 0.0952, phase: 1, state: "Despair", drain: "1000%", notes: "Lowest contractive state; maximum friction" },
  { sys: "David Hawkins", level: "Guilt (H=30)", H: 30, js: -0.85, omega: 0.1393, phase: 1, state: "Despair", drain: "667%", notes: "Severe self-condemnation, high thermodynamic destruction" },
  { sys: "David Hawkins", level: "Apathy (H=50)", H: 50, js: -0.75, omega: 0.2212, phase: 2, state: "Despair", drain: "400%", notes: "Total hopelessness, energetic stagnation" },
  { sys: "David Hawkins", level: "Grief (H=75)", H: 75, js: -0.625, omega: 0.3127, phase: 2, state: "Despair", drain: "267%", notes: "Despondency, mourning, and deep energetic leakage" },
  { sys: "David Hawkins", level: "Fear (H=100)", H: 100, js: -0.5, omega: 0.3935, phase: 2, state: "Suffering", drain: "200%", notes: "Vigilance, withdrawal, high entropic defensiveness" },
  { sys: "David Hawkins", level: "Desire (H=125)", H: 125, js: -0.375, omega: 0.4647, phase: 2, state: "Suffering", drain: "160%", notes: "Incessant craving, dissatisfaction and accumulation dynamics" },
  { sys: "David Hawkins", level: "Anger (H=150)", H: 150, js: -0.25, omega: 0.5276, phase: 3, state: "Suffering", drain: "133%", notes: "Egoic drive, frustration and high emotional heat" },
  { sys: "David Hawkins", level: "Pride (H=175)", H: 175, js: -0.125, omega: 0.5831, phase: 3, state: "Suffering", drain: "114%", notes: "Egoic inflation, defensive scaffolding, scorn/demanding view" },
  { sys: "David Hawkins", level: "Courage (H=200)", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Initial structural integrity; tipping point passed", hi: true },
  { sys: "David Hawkins", level: "Neutrality (H=250)", H: 250, js: 0, omega: 0.7135, phase: 3, state: "Tipping Point", drain: "100%", notes: "Release of attachment, dynamic equilibrium, self-trust", hi: true },
  { sys: "David Hawkins", level: "Willingness (H=310)", H: 310, js: 0.0012, omega: 0.7877, phase: 4, state: "Tipping Point", drain: "99.8%", notes: "Active intention, systemic optimism, constructive action" },
  { sys: "David Hawkins", level: "Acceptance (H=350)", H: 350, js: 0.008, omega: 0.8262, phase: 4, state: "Tipping Point", drain: "99.23%", notes: "Harmonious forgiveness, dynamic alignment, transcendence" },
  { sys: "David Hawkins", level: "Reason (H=400)", H: 400, js: 0.058, omega: 0.8647, phase: 4, state: "Time Passing", drain: "94.52%", notes: "Intellectual clarity and logical formulation" },
  { sys: "David Hawkins", level: "Love (H=500)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "True compassion and eudaimonic balance", hi: true },
  { sys: "David Hawkins", level: "Joy (H=540)", H: 540, js: 2.377, omega: 0.9328, phase: 4, state: "Eudaimonia", drain: "29.61%", notes: "State of transfiguration; inner completion and ecstasy", hi: true },
  { sys: "David Hawkins", level: "Peace (H=600)", H: 600, js: 7.414, omega: 0.9502, phase: 5, state: "Deep Flourishing", drain: "11.88%", notes: "Stillness, illumination, non-separation" },
  { sys: "David Hawkins", level: "Enlightenment (H=1000)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Pure divine awareness in union with C-Light", hi: true },

  // Teresa of Avila (Interior Castle Mansions)
  { sys: "Teresa of Avila", level: "1st Mansion — Self-Knowledge (H=200)", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Gateway mansion, starting prayer and purification", hi: true },
  { sys: "Teresa of Avila", level: "4th Mansion — Prayer of Quiet (H=500)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Intellect resting in mystical peace", hi: true },
  { sys: "Teresa of Avila", level: "7th Mansion — Spiritual Marriage (H=1000)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Union in the innermost sanctuary of the King", hi: true },

  // Sufi Maqamat (Stages)
  { sys: "Sufi Maqamat", level: "Tawba — Repentance / Awakening (H=200)", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Turning back to divine origin; essential tipping point", hi: true },
  { sys: "Sufi Maqamat", level: "Mahabba — Divine Love (H=500)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Consuming spiritual love for the Beloved", hi: true },
  { sys: "Sufi Maqamat", level: "Fana — Self-Annihilation (H=1000)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Extinction of boundaries in absolute C-Light", hi: true },

  // Kabbalah Sefirot
  { sys: "Kabbalah Sefirot", level: "Malkuth — Physical / Kingdom (H=200)", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Gateway to the spiritual tree; manifestation of divine flow", hi: true },
  { sys: "Kabbalah Sefirot", level: "Tiphereth — Beauty / Heart (H=500)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Central nexus of beauty, harmony, and cosmic equilibrium", hi: true },
  { sys: "Kabbalah Sefirot", level: "Kether — The Crown (H=1000)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Primal crown of emanations in divine light", hi: true },

  // Vedic Yugas
  { sys: "Vedic Yugas", level: "Kali Yuga (Iron Age of Strife)", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Dense physical age; minimal structural alignment", hi: true },
  { sys: "Vedic Yugas", level: "Dwapara Yuga (Bronze Age)", H: 400, js: 0.058, omega: 0.8647, phase: 4, state: "Time Passing", drain: "94.52%", notes: "Age of science, energy discovery, and electrical power representation" },
  { sys: "Vedic Yugas", level: "Treta Yuga (Silver Age)", H: 600, js: 7.414, omega: 0.9502, phase: 5, state: "Deep Flourishing", drain: "11.88%", notes: "Age of great mental clarity, spiritual rituals, virtue" },
  { sys: "Vedic Yugas", level: "Satya Yuga (Golden Age of Truth)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Perfect divine alignment, absolute consciousness coherence", hi: true },

  // Aristotle's Virtue Ethics
  { sys: "Aristotle", level: "Kakia — Moral Defect / Vice", H: 100, js: -0.5, omega: 0.3935, phase: 2, state: "Suffering", drain: "200%", notes: "Imbalance, moral deficiency or excess friction" },
  { sys: "Aristotle", level: "Akrasia — Weakness of Will", H: 150, js: -0.25, omega: 0.5276, phase: 3, state: "Suffering", drain: "133%", notes: "Incontinence; rational insight but weak actions" },
  { sys: "Aristotle", level: "Sophrosyne — Temperance / Reason", H: 350, js: 0.008, omega: 0.8262, phase: 4, state: "Tipping Point", drain: "99.23%", notes: "Harmonious self-restraint and early active logic" },
  { sys: "Aristotle", level: "Eudaimonia — Optimal Flourishing", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Actualized human perfection and rational happiness", hi: true },

  // Gurdjieff Fourth Way
  { sys: "Gurdjieff 4th Way", level: "Man No. 1, 2, 3 (Mechanical sleep)", H: 150, js: -0.25, omega: 0.5276, phase: 3, state: "Suffering", drain: "133%", notes: "Sleeping machine reactive; automatic motor, emotion, mind centers" },
  { sys: "Gurdjieff 4th Way", level: "Man No. 4 (Balanced Center)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Centers brought to dynamic equilibrium; magnetic center active", hi: true },
  { sys: "Gurdjieff 4th Way", level: "Man No. 7 (Objective consciousness)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Unification of will, crystalized permanent immortal I", hi: true },

  // Robert Kegan
  { sys: "Robert Kegan", level: "Order 2 (Imperial Mind)", H: 125, js: -0.375, omega: 0.4647, phase: 2, state: "Suffering", drain: "160%", notes: "Subject to basic survival needs, personal agenda, self-interest" },
  { sys: "Robert Kegan", level: "Order 3 (Socialized Mind)", H: 250, js: 0, omega: 0.7135, phase: 3, state: "Tipping Point", drain: "100%", notes: "Subject to tribal values, institutional rules, relationships" },
  { sys: "Robert Kegan", level: "Order 4 (Self-Authoring Mind)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Subject to internal self-constructed value system and ideology", hi: true },
  { sys: "Robert Kegan", level: "Order 5 (Self-Transforming Mind)", H: 800, js: 126.685, omega: 0.9857, phase: 5, state: "Mystical Clarity", drain: "0.45%", notes: "Sees systems of systems, post-individual interpenetration", hi: true },

  // Leary's 8-Circuit Model
  { sys: "Leary's 8-Circuit", level: "Circuit 1 (Bio-survival safety)", H: 50, js: -0.75, omega: 0.2212, phase: 2, state: "Despair", drain: "400%", notes: "Safe terrestrial environment vs physical threat" },
  { sys: "Leary's 8-Circuit", level: "Circuit 4 (Socio-sexual acculturation)", H: 300, js: 0.0005, omega: 0.7769, phase: 3, state: "Tipping Point", drain: "99.95%", notes: "Tribe socialization, cultural integration, language" },
  { sys: "Leary's 8-Circuit", level: "Circuit 5 (Neurosomatic rapture)", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Body consciousness, sensory enjoyment, ecstatic flow", hi: true },
  { sys: "Leary's 8-Circuit", level: "Circuit 8 (Psychoatomic nondual)", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Meta-physiological alignment with light space", hi: true },

  // Erik Erikson
  { sys: "Erik Erikson", level: "Infant Stage: Trust vs. Mistrust", H: 75, js: -0.625, omega: 0.3127, phase: 2, state: "Despair", drain: "267%", notes: "Infantile security base or environmental threat" },
  { sys: "Erik Erikson", level: "Adolescent: Identity vs. Role Confusion", H: 150, js: -0.25, omega: 0.5276, phase: 3, state: "Suffering", drain: "133%", notes: "Crisis of selfhood consolidation vs path fragmentation" },
  { sys: "Erik Erikson", level: "Middle Adult: Generativity vs. Stagnation", H: 350, js: 0.008, omega: 0.8262, phase: 4, state: "Tipping Point", drain: "99.23%", notes: "Mentorship and positive structural contribution" },
  { sys: "Erik Erikson", level: "Late Adult: Integrity vs. Despair", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Wise, balanced retrospective acceptance of lived life", hi: true },

  // Jean Piaget
  { sys: "Jean Piaget", level: "Sensorimotor Stage", H: 50, js: -0.75, omega: 0.2212, phase: 2, state: "Despair", drain: "400%", notes: "Primitive sensory motor reflexes" },
  { sys: "Jean Piaget", level: "Concrete Operational Stage", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Logical structures applied directly to tangible objects", hi: true },
  { sys: "Jean Piaget", level: "Formal Operational Stage", H: 400, js: 0.058, omega: 0.8647, phase: 4, state: "Time Passing", drain: "94.52%", notes: "Abstract mental logic and hypothetico-deductive reasoning" },
  { sys: "Jean Piaget", level: "Post-Formal Operational Stage", H: 600, js: 7.414, omega: 0.9502, phase: 5, state: "Deep Flourishing", drain: "11.88%", notes: "Dialectical, complex meta-systemic structures", hi: true },

  // Ken Wilber (AQAL Altitude scale)
  { sys: "Ken Wilber (AQAL)", level: "Red / Egocentric Altitude", H: 125, js: -0.375, omega: 0.4647, phase: 2, state: "Suffering", drain: "160%", notes: "Power-driven, safety survival" },
  { sys: "Ken Wilber (AQAL)", level: "Amber / Ethnocentric Altitude", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Law and order devotion, mythological community representation", hi: true },
  { sys: "Ken Wilber (AQAL)", level: "Teal / Integral Altitude", H: 550, js: 2.911, omega: 0.9361, phase: 4, state: "Eudaimonia", drain: "25.57%", notes: "Multi-perspective integration of lower tiers", hi: true },
  { sys: "Ken Wilber (AQAL)", level: "Violet / Overmind Altitude", H: 850, js: 221.835, omega: 0.9857, phase: 5, state: "Near Timeless", drain: "0.45%", notes: "Cosmic integration and high non-dual alignment" },
  { sys: "Ken Wilber (AQAL)", level: "Clear Light / Nondual Altitude", H: 1000, js: 950, omega: 0.9933, phase: 5, state: "REVELATION", drain: "0.11%", notes: "Ultimate subject-object collapse in light consciousness", hi: true },

  // Lawrence Kohlberg
  { sys: "Lawrence Kohlberg", level: "Pre-Conventional Morality", H: 100, js: -0.5, omega: 0.3935, phase: 2, state: "Suffering", drain: "200%", notes: "Pain avoidance and self-interest obedience" },
  { sys: "Lawrence Kohlberg", level: "Conventional Morality", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Social order and civic standard preservation", hi: true },
  { sys: "Lawrence Kohlberg", level: "Post-Conventional Morality", H: 500, js: 0.99, omega: 0.9179, phase: 4, state: "Eudaimonia", drain: "50.26%", notes: "Universal moral principles and conscience alignment", hi: true },

  // Loevinger Ego Stages
  { sys: "Loevinger Ego Stages", level: "Imperial (E3) Stage", H: 125, js: -0.375, omega: 0.4647, phase: 2, state: "Suffering", drain: "160%", notes: "Impulsive, self-protective, needs-driven ego system" },
  { sys: "Loevinger Ego Stages", level: "Conformist (E4) Stage", H: 200, js: 0, omega: 0.6321, phase: 3, state: "Tipping Point", drain: "100%", notes: "Belonging, social rules, respect for external auth", hi: true },
  { sys: "Loevinger Ego Stages", level: "Autonomous (E8) Stage", H: 600, js: 7.414, omega: 0.9502, phase: 5, state: "Deep Flourishing", drain: "11.88%", notes: "High independence, coping with inner conflict and system complexity" },
  { sys: "Loevinger Ego Stages", level: "Integrated (E9) Stage", H: 900, js: 474.12, omega: 0.9892, phase: 5, state: "Mystical Clarity", drain: "0.22%", notes: "Ego transcendence, reconciliation of inner polarities", hi: true },

  // Human Design System
  { sys: "Human Design System", level: "Not-Self State (Resistance)", H: 125, js: -0.375, omega: 0.4647, phase: 2, state: "Suffering", drain: "160%", notes: "Operating against personal blueprint design; high entropy" },
  { sys: "Human Design System", level: "Authority Alignment Stage", H: 450, js: 0.276, omega: 0.8946, phase: 4, state: "Time Passing", drain: "78.36%", notes: "Inner Authority and Strategy decision center activation" },
  { sys: "Human Design System", level: "Signature / Flow Stage", H: 700, js: 35.353, omega: 0.9698, phase: 5, state: "Mystical Clarity", drain: "2.75%", notes: "Total alignment with primary type design (Peace, Satisfaction, Success, Surprise)", hi: true },

  // Enneagram of Personality
  { sys: "Enneagram of Personality", level: "Unhealthy Levels (7-9)", H: 100, js: -0.5, omega: 0.3935, phase: 2, state: "Suffering", drain: "200%", notes: "Severe ego fixation, high reactive contraction, maximum friction" },
  { sys: "Enneagram of Personality", level: "Average Levels (4-6)", H: 300, js: 0.0005, omega: 0.7769, phase: 3, state: "Tipping Point", drain: "99.95%", notes: "Normal adaptive ego functioning, social defense strategies" },
  { sys: "Enneagram of Personality", level: "Healthy Levels (1-3)", H: 700, js: 35.353, omega: 0.9698, phase: 5, state: "Mystical Clarity", drain: "2.75%", notes: "Ego detachment, inner freedom, essential virtues active", hi: true }
];

const CONVERGENCE_0 = [
  { sys: "David Hawkins", name: "Courage / Integrity (H=200)" },
  { sys: "Spiral Dynamics", name: "Blue vMEME — Purpose & Order" },
  { sys: "Chakra System", name: "Solar Plexus — Manipura" },
  { sys: "Teresa of Avila", name: "First Mansion — Self-Knowledge" },
  { sys: "Sufi Maqamat", name: "Tawba — Repentance / Return" },
  { sys: "Kabbalah Sefirot", name: "Malkuth — Physical Realm / Kingdom" },
  { sys: "Vedic Yugas", name: "Kali Yuga — Dense Physical Age" }
];

const CONVERGENCE_1 = [
  { sys: "David Hawkins", name: "Unconditional Love (H=500)" },
  { sys: "Aristotle", name: "Eudaimonia — True Flourishing" },
  { sys: "Maslow's Hierarchy", name: "Self-Actualization" },
  { sys: "Chakra System", name: "Anahata — Heart Chakra" },
  { sys: "Sufi Maqamat", name: "Mahabba — Divine Love" },
  { sys: "Gurdjieff 4th Way", name: "Man #4 — Balanced Man" },
  { sys: "Robert Kegan", name: "Order 4 — Self-Authoring Mind" }
];

const CONVERGENCE_950 = [
  { sys: "David Hawkins", name: "Avatar Consciousness (H=1000)" },
  { sys: "Chakra System", name: "Sahasrara — Crown Chakra" },
  { sys: "Teresa of Avila", name: "Seventh Mansion — Spiritual Marriage" },
  { sys: "Sri Aurobindo", name: "Supermind — Absolute Awakening" },
  { sys: "Sufi Maqamat", name: "Fana — Self-Annihilation in C" },
  { sys: "Leary 8-Circuit", name: "Circuit 8 — Psychoatomic" },
  { sys: "Metemphysics", name: "Revelation — Veil of Entropy at 0.1053%" }
];

const UNIQUE_SYSTEMS = [
  "Abraham-Hicks Scale",
  "Aristotle",
  "Chakra System",
  "David Hawkins",
  "Enneagram of Personality",
  "Erik Erikson",
  "Gurdjieff 4th Way",
  "Human Design System",
  "Jean Piaget",
  "Kabbalah Sefirot",
  "Ken Wilber (AQAL)",
  "Lawrence Kohlberg",
  "Leary's 8-Circuit",
  "Loevinger Ego Stages",
  "Maslow's Hierarchy",
  "Robert Kegan",
  "Spiral Dynamics",
  "Sri Aurobindo",
  "Sufi Maqamat",
  "Teresa of Avila",
  "Vedic Yugas"
];

const METADATA_BY_SYSTEM: Record<string, { desc: string, star: string }> = {
  "Spiral Dynamics": { desc: "Clare Graves · Beck & Cowan · 8 Levels of Value Memes", star: "★ perfect at blue" },
  "Maslow's Hierarchy": { desc: "Abraham Maslow · 1943–1969 · 6 Levels including self-transcendence", star: "★ perfect at Level 5" },
  "Chakra System": { desc: "Tantric Anatomy · 7 energetic centres · Perfect phase scale alignment", star: "★ full structural map" },
  "Abraham-Hicks Scale": { desc: "Esther Hicks · 22 Vibration states · Vortex coherence metrics", star: "★ triple align at joy" },
  "Sri Aurobindo": { desc: "Sri Aurobindo Ghose · 8 developmental stages of Supermind evolution", star: "★ strong alignment" },
  "David Hawkins": { desc: "David Hawkins · Map of Consciousness · Calibrated logarithmic fields", star: "★ pivot at courage" },
  "Teresa of Avila": { desc: "Christian Mysticism · 7 mansions of the Interior Castle", star: "★ union at seventh" },
  "Sufi Maqamat": { desc: "Islamic Mysticism · Chronological spiritual stations of the soul", star: "★ annihilation in C" },
  "Kabbalah Sefirot": { desc: "Jewish Mysticism · 10 divine emanations on the Tree of Life", star: "★ crown alignment" },
  "Vedic Yugas": { desc: "Ancient Vedic Cosmology · 4 cyclic epochs of world history", star: "★ truth age convergence" },
  "Aristotle": { desc: "Classical Greek Philosophy · Nicomachean virtue levels of happiness", star: "★ eudaimonia peak" },
  "Gurdjieff 4th Way": { desc: "George Gurdjieff · Sleep waking and the 7 levels of conscious man", star: "★ balanced centers" },
  "Robert Kegan": { desc: "Robert Kegan · 5 Orders of the constructive developmental Mind", star: "★ self-authoring order" },
  "Leary's 8-Circuit": { desc: "Timothy Leary & Robert Anton Wilson · 8 neurological circuits of mind", star: "★ neurosomatic flow" },
  "Erik Erikson": { desc: "Erik Erikson · 8 stages of psychosocial identity crises", star: "★ integrity wisdom" },
  "Jean Piaget": { desc: "Jean Piaget · Stages of childhood to adult cognitive operation schemas", star: "★ dialectical reasoning" },
  "Ken Wilber (AQAL)": { desc: "Ken Wilber · Integral altitudes mapping the spectrum of consciousness", star: "★ nondual clear light" },
  "Lawrence Kohlberg": { desc: "Lawrence Kohlberg · Levels and stages of moral reasoning development", star: "★ universal conscience" },
  "Loevinger Ego Stages": { desc: "Jane Loevinger · 9 stages of ego maturation and character progression", star: "★ autonomous integration" },
  "Human Design System": { desc: "Ra Uru Hu · Synthesis of Astrology, I Ching, Kabbalah, and Chakras", star: "★ energetic manifestor mapping" },
  "Enneagram of Personality": { desc: "George Gurdjieff, Ichazo & Naranjo · 9 cognitive fixations and integration paths", star: "★ pivot at 3-6-9 triad" }
};

export default function SystemsPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"collapse" | "master" | "align" | "search">("collapse");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [masterFilter, setMasterFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleSection = (sysName: string) => {
    setOpenSections(prev => ({ ...prev, [sysName]: !prev[sysName] }));
  };

  const getFilteredMasterData = () => {
    if (masterFilter === "All") return MASTER_SYSTEMS_DATA;
    return MASTER_SYSTEMS_DATA.filter((row) => row.sys === masterFilter);
  };

  return (
    <div className="fixed lg:absolute inset-0 bg-[#050505] text-[#eeeae4] overflow-y-auto z-[200] p-6 flex flex-col border-2 border-orange-500/20 rounded-2xl">
      {/* Scrollable topheader */}
      <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-4 sticky top-0 bg-[#050505]/95 z-20">
        <div>
          <h2 className="font-sans text-xl font-bold text-orange-400 tracking-wider flex items-center gap-2">
            <Compass className="w-6 h-6 animate-spin-slow text-orange-500" /> ◈ — ALL SYSTEMS DATABASE
          </h2>
          <p className="text-xs text-[#8898aa] font-mono mt-1">18 Integrated Developmental Frameworks · 200+ Computed Coordinates · No Manual Calibrations</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/30 rounded px-4 py-2 text-xs font-mono text-orange-400 hover:bg-orange-500/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveTab("collapse")}
          className={`px-4 py-2 text-xs font-mono rounded cursor-pointer uppercase ${activeTab === "collapse" ? "bg-orange-500/15 text-orange-400 border border-orange-500" : "text-[#8898aa]"}`}
        >
          Systems Ledger
        </button>
        <button
          onClick={() => setActiveTab("master")}
          className={`px-4 py-2 text-xs font-mono rounded cursor-pointer uppercase ${activeTab === "master" ? "bg-orange-500/15 text-orange-400 border border-orange-500" : "text-[#8898aa]"}`}
        >
          Master Matrix
        </button>
        <button
          onClick={() => setActiveTab("align")}
          className={`px-4 py-2 text-xs font-mono rounded cursor-pointer uppercase ${activeTab === "align" ? "bg-orange-500/15 text-orange-400 border border-orange-500" : "text-[#8898aa]"}`}
        >
          Perfect Convergences
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className={`px-4 py-2 text-xs font-mono rounded cursor-pointer uppercase ${activeTab === "search" ? "bg-orange-500/15 text-orange-400 border border-orange-500" : "text-[#8898aa]"}`}
        >
          Search Ledger
        </button>
      </div>

      {/* TAB CONTAINER CONTENT */}
      <div className="flex-1 min-h-0">
        {/* TAB: COLLAPSE */}
        {activeTab === "collapse" && (
          <div className="space-y-4 pb-10">
            {UNIQUE_SYSTEMS.map((sysName) => {
              const meta = METADATA_BY_SYSTEM[sysName] || { desc: "Integrated developmental framework mapping", star: "★ aligned coordinate scale" };
              const isOpen = !!openSections[sysName];
              const sysRows = MASTER_SYSTEMS_DATA.filter(r => r.sys === sysName);
              
              return (
                <div key={sysName} className="border border-orange-500/10 rounded overflow-hidden">
                  <div 
                    onClick={() => toggleSection(sysName)}
                    className="bg-[#0c0c0c]/90 p-4 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-all"
                  >
                    <div>
                      <h3 className="font-sans font-bold text-orange-400 uppercase tracking-wider">{sysName}</h3>
                      <p className="text-[10px] text-[#8898aa] font-mono mt-0.5">{meta.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-mono border border-orange-500/30 bg-orange-500/5 px-2 py-0.5 rounded text-orange-300 uppercase tracking-widest">{meta.star}</span>
                      <ChevronRight className={`w-4 h-4 text-[#8898aa] transition-all transform ${isOpen ? "rotate-90" : ""}`} />
                    </div>
                  </div>
                  {isOpen && (
                    <div className="p-4 bg-[#0a0a0a]/50 border-t border-orange-500/10 overflow-x-auto">
                      <table className="w-full text-left border-collapse font-mono text-xs">
                        <thead>
                          <tr className="border-b border-white/10 text-orange-400">
                            <th className="p-2">Coordinate Level / Stage</th>
                            <th className="p-2">H Calibration</th>
                            <th className="p-2">J/S value</th>
                            <th className="p-2">Ω Order</th>
                            <th className="p-2">Phase</th>
                            <th className="p-2">Session State</th>
                            <th className="p-2">C Drain %</th>
                            <th className="p-2 text-right">Oracle Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sysRows.map((r, i) => (
                            <tr 
                              key={i} 
                              onClick={(e) => {
                                e.stopPropagation();
                                onSendPrompt(`Detail the state of ${r.level} in ${r.sys} on the T x S = C model.`);
                              }}
                              className={`hover:bg-white/5 border-b border-white/5 cursor-pointer ${r.hi ? "bg-orange-500/5" : ""}`}
                            >
                              <td className="p-2 font-bold text-[#e4d9c0]">{r.level}</td>
                              <td className="p-2">{r.H}</td>
                              <td className="p-2 text-teal-400 font-bold">{r.js}</td>
                              <td className="p-2 text-orange-300">{r.omega}</td>
                              <td className="p-2">Phase {r.phase}</td>
                              <td className="p-2 text-[#8898aa]">{r.state}</td>
                              <td className="p-2 font-bold text-amber-200">{r.drain}</td>
                              <td className="p-2 text-right" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => onSendPrompt(`Detail the state of ${r.level} in ${r.sys} on the T x S = C model.`)}
                                  className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-400 px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer"
                                >
                                  💬 Put in Chat
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

         {/* TAB: MASTER */}
        {activeTab === "master" && (
          <div className="space-y-4 pb-10">
            {/* Filter Sub-nav */}
            <div className="flex flex-wrap gap-2 mb-4">
              {["All", ...UNIQUE_SYSTEMS].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setMasterFilter(filter)}
                  className={`px-3 py-1.5 text-[10px] font-mono rounded border transition-all cursor-pointer ${
                    masterFilter === filter
                      ? "bg-orange-500/10 border-orange-500 text-orange-400"
                      : "border-orange-500/20 text-[#8898aa] hover:border-orange-500/40"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Master Grid Table */}
            <div className="overflow-x-auto max-h-[500px] border border-white/5 rounded">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead className="sticky top-0 bg-[#050810]/95 z-10 border-b border-orange-500/20">
                  <tr>
                    <th className="p-3">System Name</th>
                    <th className="p-3">Level / Stage Coordinate</th>
                    <th className="p-3">H ≈</th>
                    <th className="p-3">J/S value</th>
                    <th className="p-3">Ω Order</th>
                    <th className="p-3">Phase State</th>
                    <th className="p-3">Session Value</th>
                    <th className="p-3">C Drain %</th>
                    <th className="p-3 text-right">Oracle Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredMasterData().map((row, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => onSendPrompt(`Analyze the developmental coordinate '${row.level}' in ${row.sys} through the T x S = C model.`)}
                      className={`hover:bg-white/5 border-b border-white/5 cursor-pointer ${row.hi ? "bg-orange-500/5" : ""}`}
                    >
                      <td className="p-3 text-white/55">{row.sys}</td>
                      <td className="p-3 text-[#e4d9c0] font-semibold">{row.level}</td>
                      <td className="p-3 text-center text-orange-400">{row.H}</td>
                      <td className="p-3 text-teal-400 font-bold">{row.js}</td>
                      <td className="p-3 text-orange-300">{row.omega}</td>
                      <td className="p-3 text-center">Phase {row.phase}</td>
                      <td className="p-3 text-[#8898aa]">{row.state}</td>
                      <td className="p-3 font-semibold text-amber-200">{row.drain}</td>
                      <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onSendPrompt(`Analyze the developmental coordinate '${row.level}' in ${row.sys} through the T x S = C model.`)}
                          className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-400 px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer"
                        >
                          💬 Put in Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: ALIGN */}
        {activeTab === "align" && (
          <div className="space-y-6 pb-15">
            {/* Alignment 0 */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-orange-400 pb-2 border-b border-orange-500/20 mb-3">
                ALIGNMENT I — J/S = 0.000 — THE TIPPING POINT (H=200)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {CONVERGENCE_0.map((item, i) => (
                  <div key={i} className="bg-[#0d0d0d]/60 border border-orange-500/20 rounded p-3">
                    <span className="font-mono text-[9px] text-[#6b7a8d] block uppercase tracking-wider">{item.sys}</span>
                    <span className="text-white text-xs font-sans font-semibold block mt-1">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alignment 1 */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400 pb-2 border-b border-cyan-400/20 mb-3">
                ALIGNMENT II — J/S = 1.000 — LOVE &amp; EUDAIMONIA (H=500)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {CONVERGENCE_1.map((item, i) => (
                  <div key={i} className="bg-[#0d0d0d]/60 border border-orange-500/20 rounded p-3">
                    <span className="font-mono text-[9px] text-[#6b7a8d] block uppercase tracking-wider">{item.sys}</span>
                    <span className="text-white text-xs font-sans font-semibold block mt-1">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alignment 950 */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#f5edd0] pb-2 border-b border-[#f5edd0]/25 mb-3">
                ALIGNMENT III — J/S = 950 — REVELATION &amp; AVATAR (H=1000)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {CONVERGENCE_950.map((item, i) => (
                  <div key={i} className="bg-[#0d0d0d]/60 border border-orange-500/20 rounded p-3">
                    <span className="font-mono text-[9px] text-[#6b7a8d] block uppercase tracking-wider">{item.sys}</span>
                    <span className="text-white text-xs font-sans font-semibold block mt-1">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded text-xs leading-relaxed italic text-orange-200/80 mt-4">
              &quot;Eighteen independent evolutionary structures — spanning five millennia, five continents, and wildly distinct lineages — collapse with zero calibration into exactly J/S = 0, J/S = 1, and J/S = 950. The mathematics is the common core they were all discovering from within.&quot;
            </div>
          </div>
        )}

        {/* TAB: SEARCH */}
        {activeTab === "search" && (
          <div className="space-y-4 pb-10">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-[#8898aa]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search level name, notes, or system (e.g. ego, actualization, theta)..."
                className="w-full bg-[#0d0d0d]/90 border border-orange-500/20 rounded p-3 pl-10 font-mono text-xs text-white outline-none focus:border-orange-500/50"
              />
            </div>

            {searchQuery ? (
              <div className="overflow-x-auto max-h-[400px] border border-white/5 rounded">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-3">System Name</th>
                      <th className="p-3">Level / Stage</th>
                      <th className="p-3">H ≈</th>
                      <th className="p-3">J/S value</th>
                      <th className="p-3">Ω Order</th>
                      <th className="p-3">C Drain %</th>
                      <th className="p-3 text-right">Oracle Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MASTER_SYSTEMS_DATA.filter((row) => {
                      const text = (row.sys + " " + row.level + " " + (row.notes || "")).toLowerCase();
                      return text.includes(searchQuery.toLowerCase());
                    }).map((row, idx) => (
                      <tr 
                        key={idx}
                        onClick={() => onSendPrompt(`Detail the state of ${row.level} in the ${row.sys}`)}
                        className={`hover:bg-white/5 cursor-pointer border-b border-white/5 ${row.hi ? "bg-orange-500/5" : ""}`}
                      >
                        <td className="p-3 text-white/55">{row.sys}</td>
                        <td className="p-3 text-[#e4d9c0] font-semibold">{row.level}</td>
                        <td className="p-3 text-center text-orange-400">{row.H}</td>
                        <td className="p-3 text-teal-400 font-bold">{row.js}</td>
                        <td className="p-3 text-orange-300">{row.omega}</td>
                        <td className="p-3 text-amber-200">{row.drain}</td>
                        <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onSendPrompt(`Detail the state of ${row.level} in the ${row.sys}`)}
                            className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-400 px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer"
                          >
                            💬 Put in Chat
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 font-mono text-[11px]">
                Type above to query over 200+ micro-coordinates in real-time
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
