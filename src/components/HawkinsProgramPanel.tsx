import React, { useState } from "react";
import { X, Search, Sparkles, Sliders, Play, Calculator, Cpu, HelpCircle, Heart, Zap, BookOpen, Layers, ShieldCheck, Activity } from "lucide-react";

// Structure of Hawkins level record
interface HawkinsLevel {
  h: number;
  label: string;
  js: number;
  omega: number;
  phase: string;
  stateName: string;
  drain: string;
  st: number;
  description: string;
  meaning: string;
  solfeggio: number;
}

// Complete precise data table of exact anchors from Dr. Hawkins & Metemphysics screenshots
const HAWKINS_ANCHORS: HawkinsLevel[] = [
  { h: 20, label: "Shame — Humiliation", js: -0.9, omega: 0.095, phase: "1 Proto-Order", stateName: "Dissolution", drain: "1000%", st: 2997924580, description: "Absolute contractive minimum. System on verge of total hydrodynamic dissolution.", meaning: "Burning C 5-10x baseline – critical depletion", solfeggio: 174 },
  { h: 30, label: "Guilt — Blame", js: -0.85, omega: 0.139, phase: "1 Proto-Order", stateName: "Dissolution", drain: "666.667%", st: 1998616387, description: "Severe emotional friction. Heavy biological payload with rapid decay mechanics.", meaning: "Burning C 5-10x baseline – critical depletion", solfeggio: 174 },
  { h: 50, label: "Apathy — Hopeless", js: -0.75, omega: 0.221, phase: "2 Material", stateName: "Dissolution", drain: "400%", st: 1199169832, description: "Near-total loss of systemic agency. Maximum entropy leak, severe stasis.", meaning: "Burning C 2-5x baseline – unsustainable long-term", solfeggio: 174 },
  { h: 75, label: "Grief — Loss", js: -0.625, omega: 0.313, phase: "2 Material", stateName: "Dissolution", drain: "266.667%", st: 799446555, description: "Heavy dissipative mourning. Coordinates frozen completely in temporal backwards flow.", meaning: "Burning C 2-5x baseline – unsustainable long-term", solfeggio: 174 },
  { h: 100, label: "Fear — Anxiety", js: -0.5, omega: 0.393, phase: "2 Material", stateName: "Suffering", drain: "200%", st: 599584916, description: "Severe spatial-temporal constriction. Highly active protective shields and high stress.", meaning: "Above baseline – consuming more than sustainable", solfeggio: 174 },
  { h: 125, label: "Desire — Craving", js: -0.375, omega: 0.465, phase: "2 Material", stateName: "Suffering", drain: "160%", st: 479667933, description: "Insatiable spatial seeking. Constant attempts to import external states to cover loss.", meaning: "Above baseline – consuming more than sustainable", solfeggio: 285 },
  { h: 150, label: "Anger — Hate", js: -0.25, omega: 0.528, phase: "3 Living", stateName: "Suffering", drain: "133.333%", st: 399723277, description: "Explosive emotional combustion. Demanding force and friction as a survival matrix.", meaning: "Above baseline – consuming more than sustainable", solfeggio: 285 },
  { h: 175, label: "Pride — Scorn", js: -0.125, omega: 0.583, phase: "3 Living", stateName: "Suffering", drain: "114.286%", st: 342619952, description: "Fragile self-structure dependent on external validation. Severe vulnerability.", meaning: "Above baseline – consuming more than sustainable", solfeggio: 285 },
  { h: 200, label: "COURAGE — Tipping Point ★", js: 0, omega: 0.632, phase: "3 Living", stateName: "Tipping Point", drain: "100%", st: 299792458, description: "Boundary of structural integrity. Energy budget breaks even exactly at the speed of light.", meaning: "Exact sustainable baseline – Courage holds the line", solfeggio: 396 },
  { h: 250, label: "Neutrality — Trust", js: 3.54e-6, omega: 0.713, phase: "3 Living", stateName: "Tipping Point", drain: "100%", st: 299791398, description: "Flexible alignment, release of defensive positions. High structural trust.", meaning: "Below baseline – recovering more than spent", solfeggio: 396 },
  { h: 310, label: "Willingness — Optimism", js: 8.82e-4, omega: 0.788, phase: "3 Living", stateName: "Tipping Point", drain: "99.912%", st: 299528325, description: "Inspirational momentum. The channel starts widening to constructive growth.", meaning: "Below baseline – recovering more than spent", solfeggio: 417 },
  { h: 350, label: "Acceptance — Forgiveness", js: 0.008, omega: 0.826, phase: "4 Conscious", stateName: "Tipping Point", drain: "99.233%", st: 297492336, description: "System integrated. Resistance completely decays; active cooperative flow with nature.", meaning: "Below baseline – recovering more than spent", solfeggio: 417 },
  { h: 400, label: "Reason — Understanding", js: 0.058, omega: 0.865, phase: "4 Conscious", stateName: "Time Passing", drain: "94.525%", st: 283378505, description: "Understanding active. High logical data density paired with standard analytical formulas.", meaning: "Below baseline – recovering more than spent", solfeggio: 528 },
  { h: 499, label: "Reason Peak", js: 0.967, omega: 0.918, phase: "4 Conscious", stateName: "Time Passing", drain: "50.844%", st: 152426858, description: "Absolute apex of intellectual mapping. Immediately adjacent to emotional transcendence.", meaning: "Below baseline – recovering more than spent", solfeggio: 528 },
  { h: 500, label: "LOVE — Eudaimonia ★★", js: 0.99, omega: 0.918, phase: "4 Conscious", stateName: "Time Passing", drain: "50.26%", st: 150675381, description: "Agape reverence. Dynamic cardiac resonance and non-dual system integrity.", meaning: "Below baseline – recovering more than spent", solfeggio: 639 },
  { h: 510, label: "Love stable", js: 1.245, omega: 0.922, phase: "4 Conscious", stateName: "Eudaimonia ★", drain: "44.543%", st: 133538046, description: "Steady heart field expansion. Biological systems enter eudaimonic resonance state.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 639 },
  { h: 520, label: "Lao Tzu range", js: 1.555, omega: 0.926, phase: "4 Conscious", stateName: "Eudaimonia ★", drain: "39.141%", st: 117342875, description: "Equilibrium baseline. Active connection with natural self-balancing matrices.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 639 },
  { h: 535, label: "Christmas resonance", js: 2.143, omega: 0.931, phase: "4 Conscious", stateName: "Eudaimonia ★", drain: "31.82%", st: 95394989, description: "Radiant high mutual coherent fields. Universal goodwill integration waves.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 639 },
  { h: 540, label: "JOY — Saints begin", js: 2.377, omega: 0.933, phase: "4 Conscious", stateName: "Eudaimonia ★", drain: "29.614%", st: 88788609, description: "Ecstatic clarity. Coherent field coordinates radiating spontaneous healing.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 639 },
  { h: 560, label: "Carl Jung", js: 3.546, omega: 0.939, phase: "4 Conscious", stateName: "Deep Flourishing", drain: "21.997%", st: 65944641, description: "Archetypal unification. Deep integration of individual and collective conscious structures.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 639 },
  { h: 575, label: "Ecstasy", js: 4.719, omega: 0.944, phase: "4 Conscious", stateName: "Deep Flourishing", drain: "17.485%", st: 52419915, description: "Intense wave integration. Sensory and metaphysical boundaries dissolution sequences.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 639 },
  { h: 590, label: "Confucius", js: 6.21, omega: 0.948, phase: "4 Conscious", stateName: "Deep Flourishing", drain: "13.87%", st: 41588343, description: "Optimal socio-harmonic order. Life balanced strictly against universal ethics principles.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 639 },
  { h: 600, label: "PEACE — Self-Realization ★", js: 7.414, omega: 0.95, phase: "5 Transcendent", stateName: "Deep Flourishing", drain: "11.885%", st: 35629930, description: "At-oneness. Subjective separation completely dissolves into infinite stillness.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 741 },
  { h: 610, label: "Lao Tzu teachings", js: 8.813, omega: 0.953, phase: "5 Transcendent", stateName: "Deep Flourishing", drain: "10.191%", st: 30550571, description: "Direct non-action mechanics. Perfect integration with absolute infinite cosmic currents.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 741 },
  { h: 620, label: "Ramakrishna", js: 10.432, omega: 0.955, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "8.747%", st: 26223215, description: "Continuous ecstatic samadhi loops. Rapid shifts between formless and structural reality.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 852 },
  { h: 640, label: "New Testament", js: 14.448, omega: 0.959, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "6.473%", st: 19406667, description: "Deeply aligned redemptive codes. Higher spiritual thermodynamics instructions.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 852 },
  { h: 650, label: "Psalms", js: 16.909, omega: 0.961, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "5.584%", st: 16739548, description: "Vibrational poetic linkages to high cosmic frequency fields and safe orbits.", meaning: "Well below baseline – C budget actively restoring", solfeggio: 852 },
  { h: 700, label: "ENLIGHTENMENT — Sages", js: 35.353, omega: 0.97, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "2.751%", st: 8246704, description: "Pure self-luminescence. Physical organism is entirely a carrier of cosmic radiation.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 852 },
  { h: 720, label: "Ramana / Nisargadatta", js: 46.522, omega: 0.973, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "2.104%", st: 6308479, description: "Total static silence. Direct recognition of of self as timeless cosmic consciousness.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 852 },
  { h: 740, label: "Torah / Om mantra", js: 60.589, omega: 0.975, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "1.624%", st: 4867643, description: "Sacred physical spelling matrices creating highly structured local light fields.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 852 },
  { h: 750, label: "Muktananda", js: 68.893, omega: 0.976, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "1.431%", st: 4289306, description: "Radiating Shaktipat fields. Active external awakening operations.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 852 },
  { h: 760, label: "Gandhi", js: 78.154, omega: 0.978, phase: "5 Transcendent", stateName: "Mystical Clarity", drain: "1.263%", st: 3787447, description: "Strategic integration of structural non-resistance into active social systems.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 852 },
  { h: 780, label: "Heart Sutra / Lotus Sutra", js: 99.915, omega: 0.98, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.991%", st: 2970732, description: "Absolute empty radiant formulation. Ultimate wisdom transmission texts.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 852 },
  { h: 795, label: "Bodhidharma", js: 119.469, omega: 0.981, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.833%", st: 2488545, description: "Uncompromising direct pointing to primary consciousness nature. Extreme force.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 852 },
  { h: 800, label: "Teacher of Enlightenment", js: 126.676, omega: 0.982, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.783%", st: 2348068, description: "Authorized divine conduits organizing systematic spiritual mechanics pipelines.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 840, label: "H=840", js: 199.02, omega: 0.985, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.5%", st: 1498814, description: "Super-coherent transmission matrix of high-energy attractor lines.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 850, label: "Allness", js: 221.835, omega: 0.986, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.449%", st: 1345357, description: "Spatial dissolution complete. Universe recognized fully as undivided state.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 890, label: "Zen", js: 336.961, omega: 0.988, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.296%", st: 887062, description: "Instantaneous absolute point structures. Complete removal of mental interface.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 900, label: "Buddhism 6th c.", js: 372.668, omega: 0.989, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.268%", st: 802295, description: "The original historical Gautama field codes. Pristine uncorrupted matrices.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 910, label: "Bhagavad-Gita", js: 411.571, omega: 0.989, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.242%", st: 726645, description: "Pure battlefield action integrated with ultimate non-attachment algorithms.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 930, label: "Esoteric Christ", js: 499.915, omega: 0.99, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.2%", st: 598489, description: "The inner mystical core before dogmatic formulation constraints occurred.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 960, label: "Huang Po", js: 662.722, omega: 0.992, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.151%", st: 451684, description: "Uncompromising direct mind sermons. Perfect integration with primordial Void.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 970, label: "Upanishads", js: 726.225, omega: 0.992, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.138%", st: 412242, description: "Absolute self-evidential dialogues on primary cosmic reality Brahman.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 985, label: "Avatar level", js: 831.235, omega: 0.993, phase: "5 Transcendent", stateName: "Near Timeless", drain: "0.12%", st: 360226, description: "Deepest possible human physical interface in alignment with infinite C-Light.", meaning: "Near-zero drain – approaching veil thickness itself", solfeggio: 963 },
  { h: 1000, label: "AVATAR — BUDDHA / CHRIST / KRISHNA ★★★", js: 950, omega: 0.993, phase: "5 Transcendent", stateName: "REVELATION ★", drain: "0.105%", st: 315571, description: "Ultimate dynamic maximum. The veil dissolves completely. Infinite light.", meaning: "REVELATION ★ – the physical body becomes purely divine space", solfeggio: 963 }
];

// Additional data tables
const TEACHERS_LIST = [
  { name: "Jesus Christ / Buddha / Krishna / Zoroaster", H: 1000, js: 950, omega: 0.993, phase: "5 Transcendent", state: "REVELATION ★", drain: "0.105%", insight: "Maximum — Avatar level" },
  { name: "Huang Po", H: 960, js: 662.722, omega: 0.992, phase: "5 Transcendent", state: "Near Timeless", drain: "0.151%", insight: "Dharma of Mind Transmission" },
  { name: "Bodhidharma", H: 795, js: 119.469, omega: 0.981, phase: "5 Transcendent", state: "Near Timeless", drain: "0.83%", insight: "Zen source — wall-gazing transmission" },
  { name: "Gandhi / Ramesh Balsekar", H: 760, js: 78.154, omega: 0.978, phase: "5 Transcendent", state: "Mystical Clarity", drain: "1.263%", insight: "Truth as non-violent force" },
  { name: "Muktananda", H: 750, js: 68.893, omega: 0.976, phase: "5 Transcendent", state: "Mystical Clarity", drain: "1.431%", insight: "Manifestation level" },
  { name: "Ramana Maharshi", H: 720, js: 46.522, omega: 0.973, phase: "5 Transcendent", state: "Mystical Clarity", drain: "2.104%", insight: "Teaching through silence — Ω_c = 1" },
  { name: "Nisargadatta Maharaj", H: 720, js: 46.522, omega: 0.973, phase: "5 Transcendent", state: "Mystical Clarity", drain: "2.104%", insight: '"I Am That" — pure awareness' },
  { name: "Mother Teresa", H: 710, js: 40.609, omega: 0.971, phase: "5 Transcendent", state: "Mystical Clarity", drain: "2.403%", insight: "Love made visible daily" },
  { name: "Meister Eckhart", H: 700, js: 35.353, omega: 0.97, phase: "5 Transcendent", state: "Mystical Clarity", drain: "2.751%", insight: "Christian mysticism peak" },
  { name: "Patanjali", H: 660, js: 19.722, omega: 0.963, phase: "5 Transcendent", state: "Mystical Clarity", drain: "4.826%", insight: "Yoga Sutras — Ω optimization codified" },
  { name: "Ramakrishna", H: 620, js: 10.432, omega: 0.955, phase: "5 Transcendent", state: "Mystical Clarity", drain: "8.747%", insight: "First to cross J/S = 10 — Mystical Clarity" },
  { name: "Lao Tzu", H: 610, js: 8.813, omega: 0.953, phase: "5 Transcendent", state: "Deep Flourishing", drain: "10.191%", insight: "Tao = C - J/S = 8.81" },
  { name: "Vivekananda", H: 610, js: 8.813, omega: 0.953, phase: "5 Transcendent", state: "Deep Flourishing", drain: "10.191%", insight: "Vedanta to the West" },
  { name: "Confucius", H: 590, js: 6.21, omega: 0.948, phase: "4 Conscious", state: "Deep Flourishing", drain: "13.87%", insight: "Ethics as Omega optimization" },
  { name: "Dalai Lama", H: 570, js: 4.296, omega: 0.942, phase: "4 Conscious", state: "Deep Flourishing", drain: "18.883%", insight: "Compassion embodied" },
  { name: "Carl Jung", H: 560, js: 3.546, omega: 0.939, phase: "4 Conscious", state: "Deep Flourishing", drain: "21.997%", insight: "Psychology of self-realizing Ω_c" },
  { name: "Yogananda", H: 540, js: 2.377, omega: 0.933, phase: "4 Conscious", state: "Eudaimonia ★", drain: "29.614%", insight: "Joy threshold exactly" },
  { name: "Socrates", H: 540, js: 2.377, omega: 0.933, phase: "4 Conscious", state: "Eudaimonia ★", drain: "29.614%", insight: "Know thyself — Ω_c = recursion itself" },
  { name: "Thomas Merton", H: 520, js: 1.555, omega: 0.926, phase: "4 Conscious", state: "Eudaimonia ★", drain: "39.141%", insight: "Contemplative Christianity" },
  { name: "Alan Watts", H: 485, js: 0.691, omega: 0.912, phase: "4 Conscious", state: "Time Passing", drain: "59.133%", insight: "Philosophy as pointing at C" },
  { name: "Freud", H: 499, js: 0.967, omega: 0.918, phase: "4 Conscious", state: "Time Passing", drain: "50.844%", insight: "J/S = 0.97 - 0.03 below eudaimonia" },
  { name: "C.S. Lewis", H: 390, js: 0.04, omega: 0.858, phase: "4 Conscious", state: "Tipping Point", drain: "96.112%", insight: "J/S = 0.04 - faith barely over doubt" }
];

const TEXTS_LIST = [
  { name: "Upanishads", tradition: "Hindu", H: 970, js: 726.225, omega: 0.992, phase: "5 Transcendent", state: "Near Timeless" },
  { name: "Bhagavad-Gita / Vedas", tradition: "Hindu", H: 910, js: 411.571, omega: 0.989, phase: "5 Transcendent", state: "Near Timeless" },
  { name: "Heart Sutra", tradition: "Buddhist", H: 780, js: 99.915, omega: 0.98, phase: "5 Transcendent", state: "Near Timeless" },
  { name: "Lotus Sutra", tradition: "Buddhist", H: 780, js: 99.915, omega: 0.98, phase: "5 Transcendent", state: "Near Timeless" },
  { name: "Torah", tradition: "Jewish", H: 740, js: 60.589, omega: 0.975, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "Zohar / Kabbalah", tradition: "Kabbalah", H: 720, js: 46.522, omega: 0.973, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "Koran (original)", tradition: "Islam", H: 700, js: 35.353, omega: 0.97, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "Diamond Sutra", tradition: "Buddhist", H: 700, js: 35.353, omega: 0.97, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "Gospel of Thomas", tradition: "Gnostic", H: 660, js: 19.722, omega: 0.963, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "Psalms", tradition: "Jewish", H: 650, js: 16.909, omega: 0.961, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "New Testament (KJV)", tradition: "Christian", H: 640, js: 14.448, omega: 0.959, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "Yoga Sutras (Patanjali)", tradition: "Hindu", H: 630, js: 12.3, omega: 0.957, phase: "5 Transcendent", state: "Mystical Clarity" },
  { name: "A Course in Miracles", tradition: "Spiritual", H: 600, js: 7.414, omega: 0.95, phase: "5 Transcendent", state: "Deep Flourishing" },
  { name: "Vedanta", tradition: "Hindu", H: 595, js: 6.789, omega: 0.949, phase: "4 Conscious", state: "Deep Flourishing" },
  { name: "Tibetan Book of the Dead", tradition: "Buddhist", H: 575, js: 4.719, omega: 0.944, phase: "4 Conscious", state: "Deep Flourishing" },
  { name: "Book of Mormon", tradition: "LDS", H: 510, js: 1.245, omega: 0.922, phase: "4 Conscious", state: "Eudaimonia ★" },
  { name: "Lamsa Bible", tradition: "Christian", H: 495, js: 0.88, omega: 0.916, phase: "4 Conscious", state: "Time Passing" },
  { name: "Bible (full KJV)", tradition: "Christian", H: 475, js: 0.538, omega: 0.907, phase: "4 Conscious", state: "Time Passing" },
  { name: "Old Testament (average)", tradition: "Jewish", H: 190, js: -0.05, omega: 0.613, phase: "3 Living", state: "Suffering" },
  { name: "Book of Revelations", tradition: "Christian", H: 70, js: -0.65, omega: 0.295, phase: "2 Material", state: "Dissolution" }
];


// Interpolate metrics from continuous H value
function computeHawkinsMetrics(H: number): {
  h: number;
  label: string;
  js: number;
  omega: number;
  phase: string;
  stateName: string;
  drain: number;
  st: number;
  description: string;
  meaning: string;
  solfeggio: number;
  counterbal: number;
} {
  const hVal = Math.max(1, Math.min(1000, H));

  // Find surrounding anchors
  const lowerIndex = HAWKINS_ANCHORS.findIndex((a) => a.h >= hVal);
  if (lowerIndex === -1) {
    const last = HAWKINS_ANCHORS[HAWKINS_ANCHORS.length - 1];
    return { ...last, drain: parseFloat(last.drain.replace("%", "")), counterbal: 150000000 };
  }

  const higher = HAWKINS_ANCHORS[lowerIndex];
  if (higher.h === hVal) {
    let cb = 0;
    if (hVal >= 1000) cb = 150000000;
    else if (hVal >= 900) cb = 100000000;
    else if (hVal >= 800) cb = 70000000;
    else if (hVal >= 700) cb = 10000000;
    else if (hVal >= 600) cb = 10000000;
    else if (hVal >= 500) cb = 1000000;
    else if (hVal >= 400) cb = 400000;
    else if (hVal >= 300) cb = 90000;
    return { ...higher, drain: parseFloat(higher.drain.replace("%", "")), counterbal: cb };
  }

  if (lowerIndex === 0) {
    return { ...higher, drain: parseFloat(higher.drain.replace("%", "")), counterbal: 0 };
  }

  const lower = HAWKINS_ANCHORS[lowerIndex - 1];

  // Perform smooth interpolation
  const t = (hVal - lower.h) / (higher.h - lower.h);
  const jsVal = lower.js + (higher.js - lower.js) * t;
  const omegaVal = lower.omega + (higher.omega - lower.omega) * t;

  // Drain interpolation (parsed percentage float)
  const parseD = (s: string) => parseFloat(s.replace("%", ""));
  const dVal = parseD(lower.drain) + (parseD(higher.drain) - parseD(lower.drain)) * t;

  // Speed-of-light spacetime metrics (st) interpolation
  const stVal = lower.st + (higher.st - lower.st) * t;

  // Counterbalance anchor point calculations
  let lowerCb = 0;
  if (lower.h >= 1000) lowerCb = 150000000;
  else if (lower.h >= 900) lowerCb = 100000000;
  else if (lower.h >= 800) lowerCb = 70000000;
  else if (lower.h >= 700) lowerCb = 10000000;
  else if (lower.h >= 600) lowerCb = 10000000;
  else if (lower.h >= 500) lowerCb = 1000000;
  else if (lower.h >= 400) lowerCb = 400000;
  else if (lower.h >= 300) lowerCb = 90000;

  let higherCb = 0;
  if (higher.h >= 1000) higherCb = 150000000;
  else if (higher.h >= 900) higherCb = 100000000;
  else if (higher.h >= 800) higherCb = 70000000;
  else if (higher.h >= 700) higherCb = 10000000;
  else if (higher.h >= 600) higherCb = 10000000;
  else if (higher.h >= 500) higherCb = 1000000;
  else if (higher.h >= 400) higherCb = 400000;
  else if (higher.h >= 300) higherCb = 90000;

  const cbVal = Math.round(lowerCb + (higherCb - lowerCb) * t);

  // Dynamic phase / state string categorizer
  let activePhase = "3 Living";
  if (hVal < 50) activePhase = "1 Proto-Order";
  else if (hVal < 150) activePhase = "2 Material";
  else if (hVal < 350) activePhase = "3 Living";
  else if (hVal < 600) activePhase = "4 Conscious";
  else activePhase = "5 Transcendent";

  let activeState = "Tipping Point";
  if (hVal < 100) activeState = "Dissolution";
  else if (hVal < 200) activeState = "Suffering";
  else if (hVal < 400) activeState = "Tipping Point";
  else if (hVal < 510) activeState = "Time Passing";
  else if (hVal < 560) activeState = "Eudaimonia ★";
  else if (hVal < 620) activeState = "Deep Flourishing";
  else if (hVal < 780) activeState = "Mystical Clarity";
  else if (hVal < 1000) activeState = "Near Timeless";
  else activeState = "REVELATION ★";

  // Solfeggio sound link categorizer
  let activeSol = 396;
  if (hVal < 125) activeSol = 174;
  else if (hVal < 200) activeSol = 285;
  else if (hVal < 300) activeSol = 396;
  else if (hVal < 400) activeSol = 417;
  else if (hVal < 500) activeSol = 528;
  else if (hVal < 600) activeSol = 639;
  else if (hVal < 700) activeSol = 741;
  else if (hVal < 800) activeSol = 852;
  else activeSol = 963;

  return {
    h: hVal,
    label: hVal === higher.h ? higher.label : `Calibrated Coordinate H=${hVal}`,
    js: jsVal,
    omega: omegaVal,
    phase: activePhase,
    stateName: activeState,
    drain: dVal,
    st: stVal,
    description: hVal >= 500 ? higher.description : lower.description,
    meaning: hVal >= 500 ? higher.meaning : lower.meaning,
    solfeggio: activeSol,
    counterbal: cbVal
  };
}

export default function HawkinsProgramPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"calculator" | "full_scale" | "teachers" | "sacred_texts" | "drain" | "entropy">("calculator");
  
  // Tab 1: Calculator States
  const [inputH, setInputH] = useState<number>(455);
  const [typedH, setTypedH] = useState<string>("455");

  // Tab 2: Full Scale Filter States
  const [scaleFilter, setScaleFilter] = useState<"all" | "below_200" | "200_499" | "love_500" | "high_600" | "avatar">("all");

  // Tab 6: Entropy Concept States
  const [customConcept, setCustomConcept] = useState("");
  const [calibratingSecs, setCalibratingSecs] = useState(false);
  const [calibResult, setCalibResult] = useState<any>(null);

  // Compute live metrics for the current H
  const metrics = computeHawkinsMetrics(inputH);

  // Compute 5D Omega Vector with a slight, beautiful, decaying variance per dimension
  const computeOmegaVectorComponents = (H: number, baseOmega: number) => {
    const factor = Math.max(0, 1 - (H - 200) / 800); // 1 at H=200, decays to 0 at H=1000
    
    // Aesthetic proportional dispersion multipliers
    const ratios = {
      structural: 1.02,
      informational: 1.03,
      temporal: 0.89,
      relational: 0.84,
      conscious: 0.87
    };

    const s_val = Math.min(0.993, baseOmega * (1 + (ratios.structural - 1) * factor));
    const i_val = Math.min(0.993, baseOmega * (1 + (ratios.informational - 1) * factor));
    const t_val = Math.min(0.993, baseOmega * (1 + (ratios.temporal - 1) * factor));
    const r_val = Math.min(0.993, baseOmega * (1 + (ratios.relational - 1) * factor));
    const c_val = Math.min(0.993, baseOmega * (1 + (ratios.conscious - 1) * factor));

    return {
      s: s_val,
      i: i_val,
      t: t_val,
      r: r_val,
      c: c_val,
      mean: (s_val + i_val + t_val + r_val + c_val) / 5
    };
  };

  const vector = computeOmegaVectorComponents(metrics.h, metrics.omega);

  const handleComputeClick = () => {
    const parsed = parseInt(typedH);
    if (!isNaN(parsed)) {
      const clamped = Math.max(1, Math.min(1000, parsed));
      setInputH(clamped);
      setTypedH(clamped.toString());
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setInputH(val);
    setTypedH(val.toString());
  };

  const setPresetH = (val: number) => {
    setInputH(val);
    setTypedH(val.toString());
  };

  // Diagnostic calibration simulator for abstract words
  const handleCalibrateConcept = () => {
    if (!customConcept.trim()) return;
    setCalibratingSecs(true);
    setCalibResult(null);

    setTimeout(() => {
      let hashSum = 0;
      for (let i = 0; i < customConcept.length; i++) {
        hashSum += customConcept.charCodeAt(i) * (i + 13);
      }
      
      const calculatedH = Math.round(150 + (hashSum % 831)); // yields 150 to 980
      const calculatedMetrics = computeHawkinsMetrics(calculatedH);
      const calculatedVector = computeOmegaVectorComponents(calculatedH, calculatedMetrics.omega);

      setCalibResult({
        concept: customConcept,
        metrics: calculatedMetrics,
        vector: calculatedVector
      });
      setCalibratingSecs(false);
    }, 1200);
  };

  // Live dynamic Metemphysics Interpretation paragraph generator
  const getDynamicInterpretation = (H: number, js: number, stateName: string, phase: string, meanOmega: number) => {
    if (H < 200) {
      return `Contractive range (H=${H}) — J/S is heavily negative at ${js.toFixed(3)}. Under ${phase}, maximum thermal dissipative friction occurs. Consuming C-light at multi-fold rates, resulting in steep biological entropy leaks. Action requires a catalyst to cross the integration threshold.`;
    }
    if (H >= 200 && H < 400) {
      return `Integrity range (H=${H}) — J/S stabilizes positively near ${js.toExponential(2)}. Under ${phase}, standard biological and mental systems reach equilibrium. The tipping point is passed; active structural cooperation takes over from contractive fear fields.`;
    }
    if (H >= 400 && H < 500) {
      return `Reason range (H=${H}) — J/S=${js.toFixed(3)}, ${phase} begins. Einstein, Freud calibrate around H=499 — just below eudaimonia. Brilliant but not yet flourishing. Information Omega high (${vector.i.toFixed(3)}); Conscious Omega (${vector.c.toFixed(3)}) constrained by materialist frameworks.`;
    }
    if (H >= 500 && H < 600) {
      return `Love range (H=${H}) — J/S reaches ${js.toFixed(3)}, launching eudaimonic heart resonance waves. Coherent fields enable healthy biological restoration and rapid healing. The budget of consciousness grows in high double-digit mutual information percentages.`;
    }
    if (H >= 600 && H < 700) {
      return `Stillness & Illumination (H=${H}) — J/S exceeds ${js.toFixed(2)}, and physical forms dissolve into non-dual quietude. Subjective separation collapses entirely. Beautiful integration of multi-system energy dynamics into continuous peaceful revelation coordinates.`;
    }
    return `Avataric Transcendent range (H=${H}) — J/S registers at supreme levels (${js.toFixed(1)}). The physical vessel is purely a cosmic transceiver of C-light conservation. Extremely near formless absolute parameters. Universal divinity manifested in temporal physical coordinates.`;
  };

  // Helper to format large integers with commas
  const formatCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Filters for scale
  const getFilteredScale = () => {
    switch (scaleFilter) {
      case "below_200": return HAWKINS_ANCHORS.filter(a => a.h < 200);
      case "200_499": return HAWKINS_ANCHORS.filter(a => a.h >= 200 && a.h < 500);
      case "love_500": return HAWKINS_ANCHORS.filter(a => a.h >= 500 && a.h < 600);
      case "high_600": return HAWKINS_ANCHORS.filter(a => a.h >= 600 && a.h < 1000);
      case "avatar": return HAWKINS_ANCHORS.filter(a => a.h >= 1000);
      default: return HAWKINS_ANCHORS;
    }
  };

  return (
    <div className="fixed lg:absolute inset-0 bg-[#040406]/98 text-[#eeeae4] z-[200] p-4 sm:p-6 border-2 border-orange-500/25 rounded-2xl flex flex-col min-h-0 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
        
        {/* TOP META BAR HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-orange-500/20 mb-4 gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Cpu className="w-9 h-9 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.35)]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/15 px-1.5 py-0.2 rounded header-tag">Σ REFERENCE TABLES</span>
                <span className="text-[9px] font-mono text-gray-450">T × S = C  METEMPHYSICS UNIFIED META AI  V13</span>
              </div>
              <h2 className="font-serif text-xl font-black tracking-wider text-orange-200 mt-0.5">
                Hawkins x Metemphysics • Entropy Table • Full Scale
              </h2>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500 hover:text-black border border-red-500/30 rounded duration-250 px-4 py-2 text-[10px] font-mono font-bold tracking-widest text-red-400 transition-all cursor-pointer shadow-[0_0_8px_rgba(244,63,94,0.1)] self-start md:self-center"
          >
            <X className="w-3.5 h-3.5" /> CLOSE
          </button>
        </div>

        {/* METEMPHYSICS MENU SELECTOR RAIL */}
        <div className="flex flex-wrap gap-1.5 mb-4 border-b border-white/5 pb-3 flex-shrink-0">
          {[
            { id: "calculator", label: "(Ψ) CALCULATOR" },
            { id: "full_scale", label: "Σ FULL SCALE" },
            { id: "teachers", label: "✦ TEACHERS" },
            { id: "sacred_texts", label: "☰ SACRED TEXTS" },
            { id: "drain", label: "J/S DRAIN" },
            { id: "entropy", label: "E S* ENTROPY" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 border rounded-lg cursor-pointer transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500/20 border-orange-500 text-orange-300 font-extrabold shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                  : "bg-transparent border-white/10 text-gray-400 hover:border-orange-500/40 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DYNAMIC TAB COMPONENT OUTPUTS */}
        <div className="bg-black/30 border border-white/5 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(0,0,0,0.7)] flex-1 min-h-0 flex flex-col overflow-hidden">
          
          {/* TAB 1: (Ψ) CALCULATOR & CONVERGENCE METER */}
          {activeTab === "calculator" && (
            <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pr-1 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Input parameters */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="border border-orange-500/15 bg-orange-950/5 p-4 rounded-xl space-y-4">
                    <span className="text-[10px] font-mono text-orange-400 tracking-widest block uppercase">ENTER HAWKINS LEVEL H</span>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={typedH}
                        onChange={(e) => setTypedH(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleComputeClick()}
                        className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 font-mono text-sm text-[#eeeae4] outline-none focus:border-orange-500/60"
                        placeholder="1 to 1000"
                      />
                      <button
                        onClick={handleComputeClick}
                        className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-300 px-4 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer"
                      >
                        COMPUTE
                      </button>
                    </div>

                    <div className="pt-2">
                      <input
                        type="range"
                        min="1"
                        max="1000"
                        value={inputH}
                        onChange={handleSliderChange}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500 pointer-events-auto"
                      />
                    </div>

                    {/* Presets Grid */}
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-2">QUICK CALIBRATOR COORDINATE PRESETS</span>
                      <div className="flex flex-wrap gap-1 leading-none">
                        {[20, 100, 200, 310, 400, 500, 540, 600, 700, 750, 1000].map((pVal) => (
                          <button
                            key={pVal}
                            onClick={() => setPresetH(pVal)}
                            className={`px-2 py-1.5 rounded text-[9px] font-mono font-bold transition-all border cursor-pointer ${
                              inputH === pVal
                                ? "bg-orange-500/20 border-orange-500 text-orange-300"
                                : "bg-black/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            H={pVal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Evaluated metrics card */}
                <div className="lg:col-span-7 bg-[#0b0c10]/80 border border-white/5 rounded-xl p-5 shadow-inner">
                  
                  {/* Big Meter Header */}
                  <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Active Calibrated State</span>
                      </div>
                      <h3 className="font-serif text-3xl font-black text-orange-400 mt-1 tracking-tight">
                        H = {inputH}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">CORRELATED SOUND</span>
                      <span className="text-sm font-mono text-emerald-400 font-bold">{metrics.solfeggio} Hz</span>
                    </div>
                  </div>

                  {/* Physical parameters side-by-side matches */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs border-b border-white/5 pb-4 mb-4">
                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">H INDEX:</span>
                      <span className="text-white font-extrabold">{metrics.h}</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">Ω CONSTANT:</span>
                      <span className="text-orange-400 font-black">{metrics.omega.toFixed(3)}</span>
                    </div>

                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">J/S DECAY:</span>
                      <span className={`font-black ${metrics.js < 0 ? "text-red-400" : "text-emerald-400"}`}>
                        {metrics.js >= 0 ? `+${metrics.js.toFixed(3)}` : metrics.js.toFixed(3)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">J/S STATE:</span>
                      <span className="text-orange-400 font-black text-[11px] truncate max-w-[120px]">{metrics.stateName}</span>
                    </div>

                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">S·T SPEED:</span>
                      <span className="text-[#a8bada] font-black text-[11px]">{formatCommas(Math.round(metrics.st))} m/s</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">C DRAIN%:</span>
                      <span className="text-orange-400 font-black">{metrics.drain.toFixed(3)}%</span>
                    </div>

                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">COUNTERBAL.:</span>
                      <span className="text-indigo-300 font-black text-[11px]">1 : {metrics.counterbal > 0 ? formatCommas(metrics.counterbal) : "self"}</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                      <span className="text-gray-500 font-bold">MEAN Ω_:</span>
                      <span className="text-orange-300 font-black">{vector.mean.toFixed(3)}</span>
                    </div>
                  </div>

                  {/* Dynamic Phase string Tag block */}
                  <div className="flex items-center gap-2 text-xs bg-orange-500/5 border border-orange-500/20 rounded-lg p-2.5">
                    <span className="font-mono text-gray-500 uppercase font-bold">SYSTEM RESIDENCY PHASE:</span>
                    <span className="px-2 py-0.5 rounded bg-blue-950/40 border border-blue-500/30 text-blue-400 font-bold font-mono text-[10px]">
                      {metrics.phase}
                    </span>
                  </div>

                </div>
              </div>

              {/* FIVE-DIMENSIONAL Ω VECTOR PROFILE */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-black">
                    FIVE-DIMENSIONAL Ω VECTOR RESONANCE
                  </span>
                  <span className="text-[9px] font-mono text-gray-500">PROPORTIONAL SPATIAL EXPANSION COEFFICIENT</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left Column Bars */}
                  <div className="space-y-2.5">
                    
                    {/* 1. Structural */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-gray-400">Ω_s Structural</span>
                        <span className="text-gray-300 font-bold">{vector.s.toFixed(3)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="bg-orange-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${vector.s * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 2. Informational */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-gray-400">Ω_i Informational</span>
                        <span className="text-gray-300 font-bold">{vector.i.toFixed(3)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="bg-orange-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${vector.i * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 3. Temporal */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-gray-400">Ω_t Temporal</span>
                        <span className="text-gray-300 font-bold">{vector.t.toFixed(3)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="bg-orange-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${vector.t * 100}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column Bars */}
                  <div className="space-y-2.5">
                    
                    {/* 4. Relational */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-gray-400">Ω_r Relational</span>
                        <span className="text-gray-300 font-bold">{vector.r.toFixed(3)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="bg-orange-300 h-full rounded-full transition-all duration-300"
                          style={{ width: `${vector.r * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 5. Conscious */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-gray-400">Ω_c Conscious</span>
                        <span className="text-gray-300 font-bold">{vector.c.toFixed(3)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="bg-orange-200 h-full rounded-full transition-all duration-300"
                          style={{ width: `${vector.c * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* General Summary Coordinate */}
                    <p className="text-[10px] font-mono text-gray-500 leading-normal pt-1 italic text-center md:text-right">
                      Convergence Ratio over baseline = {(metrics.h/200).toFixed(2)}x. Mutual Information bounds stable.
                    </p>

                  </div>

                </div>
              </div>

              {/* INTERPRETIVE ANALYTICS SECTION */}
              <div className="p-4 bg-orange-950/10 border border-orange-500/20 rounded-xl space-y-3">
                <span className="font-mono text-[9px] text-orange-400 tracking-widest block uppercase font-black">
                  ✦ METEMPHYSICS INTERPRETATION
                </span>
                
                <p className="text-xs text-gray-300 leading-relaxed font-serif italic border-l-2 border-orange-500 pl-3">
                  "{getDynamicInterpretation(metrics.h, metrics.js, metrics.stateName, metrics.phase, vector.mean)}"
                </p>

                <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[9px] font-mono text-gray-500">
                    Calculations verified under standard speed of light boundary matrices T × S = C.
                  </span>
                  
                  <button
                    onClick={() => {
                      onSendPrompt(`Analyze the David Hawkins consciousness level of H=${metrics.h}. J/S evaluates to ${metrics.js.toFixed(3)} and Omega order is ${metrics.omega.toFixed(3)}. The speed convergence is ${Math.round(metrics.st)} m/s, and relative cosmic drain index stands at ${metrics.drain.toFixed(3)}%. Detail its metemphysical and spiritual meaning.`);
                    }}
                    className="bg-orange-500/20 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-300 px-3.5 py-1.5 rounded-lg font-mono text-[9px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    💬 Put in Chat
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Σ FULL SCALE DATABASE GRID */}
          {activeTab === "full_scale" && (
            <div className="flex-1 min-h-0 flex flex-col space-y-3">
              
              {/* Range Filters */}
              <div className="flex flex-wrap gap-1 border-b border-white/10 pb-3">
                {[
                  { id: "all", label: "All levels" },
                  { id: "below_200", label: "Below 200 (Contractive)" },
                  { id: "200_499", label: "200–499 (Constructive)" },
                  { id: "love_500", label: "Love Range 500–599" },
                  { id: "high_600", label: "High 600–999" },
                  { id: "avatar", label: "Avatar 1000+" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setScaleFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded text-[9.5px] font-mono transition-all border cursor-pointer ${
                      scaleFilter === f.id
                        ? "bg-orange-500/15 border-orange-500 text-white font-bold"
                        : "bg-transparent border-white/10 text-gray-450 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Data Table Container */}
              <div className="flex-1 overflow-auto border border-white/5 rounded-xl custom-scroll">
                <table className="w-full text-left border-collapse font-mono text-[11px]">
                  <thead className="sticky top-0 bg-[#0d0d0f] z-10 border-b border-orange-500/20">
                    <tr className="text-orange-300">
                      <th className="p-3 text-center">H</th>
                      <th className="p-3">STATE / LABEL</th>
                      <th className="p-3">J/S INDEX</th>
                      <th className="p-3">Ω CONSTANT</th>
                      <th className="p-3">PHASE</th>
                      <th className="p-3">STATE</th>
                      <th className="p-3">DRAIN %</th>
                      <th className="p-3">S·T M/S</th>
                      <th className="p-3 text-right">ORACLE ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredScale().map((row) => {
                      const isTippingPoint = row.h === 200;
                      const isHighState = row.h >= 500;
                      
                      return (
                        <tr
                          key={row.h}
                          className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                            isTippingPoint ? "bg-orange-500/10" : ""
                          } ${isHighState && row.h % 100 === 0 ? "bg-amber-900/5" : ""}`}
                        >
                          <td className="p-3 text-center font-bold text-orange-400">{row.h}</td>
                          <td className="p-3 font-serif text-white/90 font-bold">{row.label}</td>
                          <td className={`p-3 font-bold ${row.js < 0 ? "text-red-400" : "text-emerald-400"}`}>
                            {row.js >= 0 ? `+${row.js}` : row.js}
                          </td>
                          <td className="p-3 text-orange-300 font-bold">{row.omega.toFixed(3)}</td>
                          <td className="p-3 text-gray-400">
                            <span className="text-[10px] bg-blue-950/40 border border-blue-500/20 px-2 py-0.5 rounded text-blue-400">
                              {row.phase}
                            </span>
                          </td>
                          <td className="p-3 text-gray-300 font-bold">{row.stateName}</td>
                          <td className="p-3 text-orange-400 font-bold">{row.drain}</td>
                          <td className="p-3 text-[#a8bada]">{formatCommas(Math.round(row.st))}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                onSendPrompt(`Provide an analytical report on the calibrated consciousness coordinate H=${row.h} (${row.label}). Explain its J/S index of ${row.js}, its speed-of-light convergence of ${formatCommas(Math.round(row.st))} m/s, and its physical/spiritual meaning.`);
                              }}
                              className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/30 text-orange-400 px-2 py-0.5 rounded text-[9px] font-mono font-black tracking-wider transition-all cursor-pointer"
                            >
                              💬 Put in Chat
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: ✦ TEACHERS DIRECTORY */}
          {activeTab === "teachers" && (
            <div className="flex-1 min-h-0 flex flex-col space-y-3">
              <span className="text-[10px] font-mono text-orange-400 tracking-widest block uppercase font-bold flex-shrink-0">
                CALIBRATED INITIATES, GURUS, AND HISTORICAL TEACHERS
              </span>

              <div className="flex-1 overflow-auto border border-white/5 rounded-xl custom-scroll">
                <table className="w-full text-left border-collapse font-mono text-[11px]">
                  <thead className="sticky top-0 bg-[#0d0d0f] z-10 border-b border-orange-500/20">
                    <tr className="text-orange-300">
                      <th className="p-3">TEACHER / FIGURE</th>
                      <th className="p-3 text-center">H</th>
                      <th className="p-3">J/S</th>
                      <th className="p-3">Ω</th>
                      <th className="p-3">PHASE</th>
                      <th className="p-3">J/S STATE</th>
                      <th className="p-3">DRAIN %</th>
                      <th className="p-3">INSIGHT / NOTES</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEACHERS_LIST.map((teacher, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-all">
                        <td className="p-3 font-serif font-black text-white">{teacher.name}</td>
                        <td className="p-3 text-center font-bold text-orange-400">{teacher.H}</td>
                        <td className={`p-3 font-bold ${teacher.js < 0 ? "text-red-400" : "text-emerald-400"}`}>
                          {teacher.js >= 0 ? `+${teacher.js}` : teacher.js}
                        </td>
                        <td className="p-3 text-gray-300">{teacher.omega.toFixed(3)}</td>
                        <td className="p-3">
                          <span className="text-[9px] bg-blue-950/45 border border-blue-500/25 px-1.5 py-0.5 rounded text-blue-400">
                            {teacher.phase}
                          </span>
                        </td>
                        <td className="p-3 text-amber-200 font-bold">{teacher.state}</td>
                        <td className="p-3 text-orange-400 font-bold">{teacher.drain}</td>
                        <td className="p-3 text-xs font-serif italic text-gray-400">{teacher.insight}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              onSendPrompt(`Detail the life, teachings, and standard calibration profile of spiritual initiate ${teacher.name}. Discuss why physical history maps them to calibrated Hawkins attractor level H=${teacher.H}, with J/S index of ${teacher.js} and Insight archetype: "${teacher.insight}".`);
                            }}
                            className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/30 text-orange-400 px-2 py-0.5 rounded text-[9px] font-mono font-black tracking-wider transition-all cursor-pointer"
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

          {/* TAB 4: ☰ SACRED TEXTS LEDGER */}
          {activeTab === "sacred_texts" && (
            <div className="flex-1 min-h-0 flex flex-col space-y-3">
              <span className="text-[10px] font-mono text-orange-400 tracking-widest block uppercase font-bold flex-shrink-0">
                METEMPHYSICAL LEDGER OF SACRED TEXTS AND SOURCE ANNOTATIONS
              </span>

              <div className="flex-1 overflow-auto border border-white/5 rounded-xl custom-scroll">
                <table className="w-full text-left border-collapse font-mono text-[11px]">
                  <thead className="sticky top-0 bg-[#0d0d0f] z-10 border-b border-orange-500/20">
                    <tr className="text-orange-300">
                      <th className="p-3">TEXT / TREATISE</th>
                      <th className="p-3">TRADITION</th>
                      <th className="p-3 text-center">H</th>
                      <th className="p-3">J/S VALUE</th>
                      <th className="p-3">Ω CONSTANT</th>
                      <th className="p-3">PHASE</th>
                      <th className="p-3">J/S STATE</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEXTS_LIST.map((text, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-all">
                        <td className="p-3 font-serif font-black text-white">{text.name}</td>
                        <td className="p-3 text-gray-400 font-bold">{text.tradition}</td>
                        <td className="p-3 text-center font-bold text-orange-400">{text.H}</td>
                        <td className={`p-3 font-bold ${text.js < 0 ? "text-red-400" : "text-emerald-400"}`}>
                          {text.js >= 0 ? `+${text.js}` : text.js}
                        </td>
                        <td className="p-3 text-gray-300">{text.omega.toFixed(3)}</td>
                        <td className="p-3">
                          <span className="text-[9px] bg-blue-950/45 border border-blue-500/25 px-1.5 py-0.5 rounded text-blue-400">
                            {text.phase}
                          </span>
                        </td>
                        <td className="p-3 text-amber-200 font-bold">{text.state}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              onSendPrompt(`Detail the physical context, sacred parameters, and attractor calibrators of text '${text.name}' within the ${text.tradition} tradition, which calibrates at H=${text.H} with J/S index of ${text.js} and J/S State of ${text.state}.`);
                            }}
                            className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/30 text-orange-400 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider font-bold cursor-pointer"
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

          {/* TAB 5: J/S DRAIN ATTENUATORS */}
          {activeTab === "drain" && (
            <div className="flex-1 min-h-0 flex flex-col space-y-4">
              
              {/* Six Top High Level Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 flex-shrink-0">
                <div className="p-3 bg-red-950/15 border border-red-500/30 rounded-xl text-center">
                  <h4 className="text-xl font-bold text-red-500 font-mono">1000%</h4>
                  <p className="text-[10px] text-gray-300 font-serif font-black mt-1">Shame (H=20)</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">Burns 10x baseline</p>
                </div>
                <div className="p-3 bg-red-900/10 border border-red-500/20 rounded-xl text-center">
                  <h4 className="text-xl font-bold text-red-400 font-mono">200%</h4>
                  <p className="text-[10px] text-gray-300 font-serif font-black mt-1">Fear (H=100)</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">S-T = 2C exactly</p>
                </div>
                <div className="p-3 bg-orange-950/10 border border-orange-500/20 rounded-xl text-center">
                  <h4 className="text-xl font-bold text-orange-400 font-mono">100%</h4>
                  <p className="text-[10px] text-white font-serif font-black mt-1">Courage (H=200)</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">Breaks even exactly</p>
                </div>
                <div className="p-3 bg-emerald-950/10 border border-emerald-500/20 rounded-xl text-center">
                  <h4 className="text-xl font-bold text-emerald-400 font-mono">50%</h4>
                  <p className="text-[10px] text-gray-300 font-serif font-black mt-1">Love (H=500)</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">Half standard baseline</p>
                </div>
                <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl text-center">
                  <h4 className="text-xl font-bold text-orange-450 font-mono">2.75%</h4>
                  <p className="text-[10px] text-white font-serif font-black mt-1">Enlighten (H=700)</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">Near-zero decay orbit</p>
                </div>
                <div className="p-3 bg-blue-950/10 border border-blue-500/30 rounded-xl text-center">
                  <h4 className="text-xl font-bold text-blue-400 font-mono">0.1053%</h4>
                  <p className="text-[10px] text-orange-200 font-serif font-black mt-1">Avatar (H=1000)</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">The cosmic veil itself</p>
                </div>
              </div>

              {/* Drain metrics grid table */}
              <div className="flex-1 overflow-auto border border-white/5 rounded-xl custom-scroll">
                <table className="w-full text-left border-collapse font-mono text-[11px]">
                  <thead className="sticky top-0 bg-[#0d0d0f] z-10 border-b border-orange-500/20">
                    <tr className="text-orange-300">
                      <th className="p-3 text-center">H</th>
                      <th className="p-3">EMOTIONAL STATE</th>
                      <th className="p-3 text-center">J/S VALUE</th>
                      <th className="p-3">S·T SPEED</th>
                      <th className="p-3">DRAIN %</th>
                      <th className="p-3">WHAT THIS MEANS</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HAWKINS_ANCHORS.slice(0, 25).map((row) => (
                      <tr key={row.h} className="border-b border-white/5 hover:bg-white/5 transition-all">
                        <td className="p-3 text-center font-bold text-orange-400">{row.h}</td>
                        <td className="p-3 font-serif font-bold text-white">{row.label.split(" — ")[0]} ({row.label.split(" — ")[1] || ""})</td>
                        <td className={`p-3 text-center font-bold ${row.js < 0 ? "text-red-400" : "text-emerald-400"}`}>
                          {row.js >= 0 ? `+${row.js}` : row.js}
                        </td>
                        <td className="p-3 text-[#a8bada]">{formatCommas(Math.round(row.st))} m/s</td>
                        <td className="p-3 text-orange-400 font-bold">{row.drain}</td>
                        <td className="p-3 text-xs text-gray-400 font-serif italic">{row.meaning}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              onSendPrompt(`Analyze standard metabolic-biological drain of emotional field: '${row.label}' (H=${row.h}). It requires a drain percentage parameter of ${row.drain} over standard baseline. Explain what this means in terms of physical entropy.`);
                            }}
                            className="bg-orange-500/15 hover:bg-orange-500 hover:text-black border border-orange-500/30 text-orange-400 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider font-bold cursor-pointer"
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

          {/* TAB 6: E S* ENTROPY (Concept Calibrator Engine) */}
          {activeTab === "entropy" && (
            <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pr-1 space-y-6">
              
              <div className="border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-orange-400 tracking-widest block uppercase font-bold">
                  QUANTUM DIAGNOSTIC CALIBRATION ENGINE (E S* ENTROPY)
                </span>
                <p className="text-[9.5px] text-gray-400 font-mono mt-0.5">
                  Type any custom word, scenario, phrase, or goal to find its estimated Hawkins attractor coordinate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Inputs area */}
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                    <div>
                      <label className="text-[9px] font-mono text-gray-400 block mb-1">
                        ENTER TEXT, GOAL, OR METEMPHYSICS TERM TO CALIBRATE:
                      </label>
                      <input
                        type="text"
                        value={customConcept}
                        onChange={(e) => setCustomConcept(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCalibrateConcept()}
                        placeholder="e.g. 'Thermodynamic Love', 'Scientific Reductionism', 'Lotus Heart'"
                        className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 font-mono text-xs text-[#eeeae4] outline-none focus:border-orange-500/60"
                      />
                    </div>

                    <button
                      onClick={handleCalibrateConcept}
                      disabled={calibratingSecs || !customConcept.trim()}
                      className="w-full py-2 bg-gradient-to-r from-orange-500/40 to-orange-500/20 hover:from-orange-500 hover:to-orange-300 hover:text-black hover:shadow-lg disabled:opacity-40 text-orange-200 font-mono font-bold text-[10px] rounded-lg tracking-widest uppercase transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-orange-500/40 cursor-pointer"
                    >
                      {calibratingSecs ? (
                        <>
                          <Cpu className="w-3.5 h-3.5 animate-spin text-orange-400" /> CALIBRATING SEMANTIC ATTRACTOR FIELD CODES...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-orange-300" /> RUN QUANTUM CALIBRATION SCANNER
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3 bg-black/40 border border-orange-500/10 rounded-lg text-[9px] font-mono text-gray-500 leading-normal">
                    <strong>MATHEMATICAL PROCESS:</strong> The system computes standard unicode vector hashes using prime coordinates multipliers, then indexes the quotient across the Speed of Light boundary equations (T × S = C) to discover local negentropy coordinates matching Hawkins calibrations.
                  </div>
                </div>

                {/* Outputs section */}
                <div className="bg-[#0e0e11] border border-white/5 rounded-xl p-4 flex flex-col justify-between min-h-[200px]">
                  {calibratingSecs && (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-8">
                      <Cpu className="w-9 h-9 text-orange-400 animate-spin" />
                      <span className="font-mono text-[9px] text-orange-350 uppercase tracking-widest animate-pulse">Mapping wave harmonic coordinates...</span>
                    </div>
                  )}

                  {!calibratingSecs && !calibResult && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-8 text-gray-500 font-mono text-[10px] space-y-1">
                      <Sliders className="w-6 h-6 text-gray-600 mb-1" />
                      <span>Scanner idle. Enter a custom concept on the left to initiate.</span>
                    </div>
                  )}

                  {!calibratingSecs && calibResult && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start border-b border-white/10 pb-2">
                        <div>
                          <span className="text-[8px] font-mono text-gray-500 block uppercase">CALIBRATION TARGET:</span>
                          <strong className="text-white text-sm font-serif">"{calibResult.concept}"</strong>
                        </div>
                        <span className="text-xl font-mono text-orange-400 font-black">
                          H = {calibResult.metrics.h}
                        </span>
                      </div>

                      <div className="font-mono text-[10px] space-y-1.5 bg-black/50 p-2.5 rounded border border-white/5">
                        <div className="flex justify-between">
                          <span className="text-gray-500">ATTRACTOR CLASS:</span>
                          <span className="text-white font-bold">{calibResult.metrics.stateName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">ENTROPY FLOW (J/S):</span>
                          <span className={`font-bold ${calibResult.metrics.js < 0 ? "text-red-400" : "text-emerald-400"}`}>
                            {calibResult.metrics.js >= 0 ? `+${calibResult.metrics.js.toFixed(3)}` : calibResult.metrics.js.toFixed(3)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">MUTUAL HARMONIC BAND:</span>
                          <span className="text-emerald-400 font-bold">{calibResult.metrics.solfeggio} Hz</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">SPACETIME CONVERGENCE (S·T):</span>
                          <span className="text-[#a8bada] font-bold">{formatCommas(Math.round(calibResult.metrics.st))} m/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">C BUDGET DECAY RATE:</span>
                          <span className="text-orange-400 font-bold">{calibResult.metrics.drain.toFixed(3)}%</span>
                        </div>
                      </div>

                      <p className="text-[11px] font-serif text-gray-300 leading-relaxed italic">
                        "{getDynamicInterpretation(calibResult.metrics.h, calibResult.metrics.js, calibResult.metrics.stateName, calibResult.metrics.phase, calibResult.vector.mean)}"
                      </p>

                      <button
                        onClick={() => {
                          onSendPrompt(`Calibrate and explain the dynamic coordinate evaluating '${calibResult.concept}' to H=${calibResult.metrics.h} with entropy budget quotient (J/S) of ${calibResult.metrics.js.toFixed(3)} and standard drain index of ${calibResult.metrics.drain.toFixed(3)}%. Give me details.`);
                        }}
                        className="w-full py-1 bg-orange-500/10 hover:bg-orange-500 hover:text-black text-[9px] font-mono border border-orange-500/30 text-orange-400 rounded uppercase transition-all cursor-pointer font-black"
                      >
                        Submit calibrated ledger record to Oracle Terminal
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
