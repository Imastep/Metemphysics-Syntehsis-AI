/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Table, X, Eye } from "lucide-react";

interface ElementData {
  z: number;
  sym: string;
  name: string;
  s: number;
  cat: string;
  col: number;
  row: number;
  phase: string;
  mass: number;
}

const EP_ELEMENTS: ElementData[] = [
  { z: 1, sym: "H", name: "Hydrogen", s: 130.68, cat: "nonmetal", col: 1, row: 1, phase: "Gas", mass: 1.008 },
  { z: 2, sym: "He", name: "Helium", s: 126.15, cat: "noble", col: 18, row: 1, phase: "Gas", mass: 4.003 },
  { z: 3, sym: "Li", name: "Lithium", s: 29.12, cat: "alkali", col: 1, row: 2, phase: "Solid", mass: 6.941 },
  { z: 4, sym: "Be", name: "Beryllium", s: 9.50, cat: "alkaline", col: 2, row: 2, phase: "Solid", mass: 9.012 },
  { z: 5, sym: "B", name: "Boron", s: 5.90, cat: "metalloid", col: 13, row: 2, phase: "Solid", mass: 10.81 },
  { z: 6, sym: "C", name: "Carbon", s: 5.74, cat: "nonmetal", col: 14, row: 2, phase: "Solid", mass: 12.01 },
  { z: 7, sym: "N", name: "Nitrogen", s: 95.80, cat: "nonmetal", col: 15, row: 2, phase: "Gas", mass: 14.01 },
  { z: 8, sym: "O", name: "Oxygen", s: 102.57, cat: "nonmetal", col: 16, row: 2, phase: "Gas", mass: 16.00 },
  { z: 9, sym: "F", name: "Fluorine", s: 101.39, cat: "nonmetal", col: 17, row: 2, phase: "Gas", mass: 19.00 },
  { z: 10, sym: "Ne", name: "Neon", s: 146.33, cat: "noble", col: 18, row: 2, phase: "Gas", mass: 20.18 },
  { z: 11, sym: "Na", name: "Sodium", s: 51.30, cat: "alkali", col: 1, row: 3, phase: "Solid", mass: 22.99 },
  { z: 12, sym: "Mg", name: "Magnesium", s: 32.68, cat: "alkaline", col: 2, row: 3, phase: "Solid", mass: 24.31 },
  { z: 13, sym: "Al", name: "Aluminium", s: 28.33, cat: "post", col: 13, row: 3, phase: "Solid", mass: 26.98 },
  { z: 14, sym: "Si", name: "Silicon", s: 18.83, cat: "metalloid", col: 14, row: 3, phase: "Solid", mass: 28.09 },
  { z: 15, sym: "P", name: "Phosphorus", s: 41.09, cat: "nonmetal", col: 15, row: 3, phase: "Solid", mass: 30.97 },
  { z: 16, sym: "S", name: "Sulfur", s: 32.06, cat: "nonmetal", col: 16, row: 3, phase: "Solid", mass: 32.07 },
  { z: 17, sym: "Cl", name: "Chlorine", s: 111.51, cat: "nonmetal", col: 17, row: 3, phase: "Gas", mass: 35.45 },
  { z: 18, sym: "Ar", name: "Argon", s: 154.85, cat: "noble", col: 18, row: 3, phase: "Gas", mass: 39.95 },
  { z: 19, sym: "K", name: "Potassium", s: 64.68, cat: "alkali", col: 1, row: 4, phase: "Solid", mass: 39.10 },
  { z: 20, sym: "Ca", name: "Calcium", s: 41.59, cat: "alkaline", col: 2, row: 4, phase: "Solid", mass: 40.08 },
  { z: 21, sym: "Sc", name: "Scandium", s: 34.64, cat: "transition", col: 3, row: 4, phase: "Solid", mass: 44.96 },
  { z: 22, sym: "Ti", name: "Titanium", s: 30.72, cat: "transition", col: 4, row: 4, phase: "Solid", mass: 47.87 },
  { z: 23, sym: "V", name: "Vanadium", s: 28.91, cat: "transition", col: 5, row: 4, phase: "Solid", mass: 50.94 },
  { z: 24, sym: "Cr", name: "Chromium", s: 23.77, cat: "transition", col: 6, row: 4, phase: "Solid", mass: 52.00 },
  { z: 25, sym: "Mn", name: "Manganese", s: 32.01, cat: "transition", col: 7, row: 4, phase: "Solid", mass: 54.94 },
  { z: 26, sym: "Fe", name: "Iron", s: 27.32, cat: "transition", col: 8, row: 4, phase: "Solid", mass: 55.85 },
  { z: 27, sym: "Co", name: "Cobalt", s: 30.04, cat: "transition", col: 9, row: 4, phase: "Solid", mass: 58.93 },
  { z: 28, sym: "Ni", name: "Nickel", s: 29.87, cat: "transition", col: 10, row: 4, phase: "Solid", mass: 58.69 },
  { z: 29, sym: "Cu", name: "Copper", s: 33.15, cat: "transition", col: 11, row: 4, phase: "Solid", mass: 63.55 },
  { z: 30, sym: "Zn", name: "Zinc", s: 41.63, cat: "transition", col: 12, row: 4, phase: "Solid", mass: 65.38 },
  { z: 31, sym: "Ga", name: "Gallium", s: 40.83, cat: "post", col: 13, row: 4, phase: "Solid", mass: 69.72 },
  { z: 32, sym: "Ge", name: "Germanium", s: 31.09, cat: "metalloid", col: 14, row: 4, phase: "Solid", mass: 72.63 },
  { z: 33, sym: "As", name: "Arsenic", s: 35.69, cat: "metalloid", col: 15, row: 4, phase: "Solid", mass: 74.92 },
  { z: 34, sym: "Se", name: "Selenium", s: 42.44, cat: "nonmetal", col: 16, row: 4, phase: "Solid", mass: 78.97 },
  { z: 35, sym: "Br", name: "Bromine", s: 152.21, cat: "nonmetal", col: 17, row: 4, phase: "Liquid", mass: 79.90 },
  { z: 36, sym: "Kr", name: "Krypton", s: 164.08, cat: "noble", col: 18, row: 4, phase: "Gas", mass: 83.80 },
  { z: 37, sym: "Rb", name: "Rubidium", s: 76.78, cat: "alkali", col: 1, row: 5, phase: "Solid", mass: 85.47 },
  { z: 38, sym: "Sr", name: "Strontium", s: 52.30, cat: "alkaline", col: 2, row: 5, phase: "Solid", mass: 87.62 },
  { z: 39, sym: "Y", name: "Yttrium", s: 44.43, cat: "transition", col: 3, row: 5, phase: "Solid", mass: 88.91 },
  { z: 40, sym: "Zr", name: "Zirconium", s: 38.99, cat: "transition", col: 4, row: 5, phase: "Solid", mass: 91.22 },
  { z: 41, sym: "Nb", name: "Niobium", s: 36.40, cat: "transition", col: 5, row: 5, phase: "Solid", mass: 92.91 },
  { z: 42, sym: "Mo", name: "Molybdenum", s: 28.66, cat: "transition", col: 6, row: 5, phase: "Solid", mass: 95.95 },
  { z: 43, sym: "Tc", name: "Technetium", s: 33.00, cat: "transition", col: 7, row: 5, phase: "Solid", mass: 98.00 },
  { z: 44, sym: "Ru", name: "Ruthenium", s: 28.53, cat: "transition", col: 8, row: 5, phase: "Solid", mass: 101.07 },
  { z: 45, sym: "Rh", name: "Rhodium", s: 31.54, cat: "transition", col: 9, row: 5, phase: "Solid", mass: 102.91 },
  { z: 46, sym: "Pd", name: "Palladium", s: 37.82, cat: "transition", col: 10, row: 5, phase: "Solid", mass: 106.42 },
  { z: 47, sym: "Ag", name: "Silver", s: 42.55, cat: "transition", col: 11, row: 5, phase: "Solid", mass: 107.87 },
  { z: 48, sym: "Cd", name: "Cadmium", s: 51.76, cat: "transition", col: 12, row: 5, phase: "Solid", mass: 112.41 },
  { z: 49, sym: "In", name: "Indium", s: 57.82, cat: "post", col: 13, row: 5, phase: "Solid", mass: 114.82 },
  { z: 50, sym: "Sn", name: "Tin", s: 51.18, cat: "post", col: 14, row: 5, phase: "Solid", mass: 118.71 },
  { z: 51, sym: "Sb", name: "Antimony", s: 45.52, cat: "metalloid", col: 15, row: 5, phase: "Solid", mass: 121.76 },
  { z: 52, sym: "Te", name: "Tellurium", s: 49.70, cat: "metalloid", col: 16, row: 5, phase: "Solid", mass: 127.60 },
  { z: 53, sym: "I", name: "Iodine", s: 116.14, cat: "nonmetal", col: 17, row: 5, phase: "Solid", mass: 126.90 },
  { z: 54, sym: "Xe", name: "Xenon", s: 169.68, cat: "noble", col: 18, row: 5, phase: "Gas", mass: 131.29 },
  { z: 55, sym: "Cs", name: "Caesium", s: 85.23, cat: "alkali", col: 1, row: 6, phase: "Solid", mass: 132.91 },
  { z: 56, sym: "Ba", name: "Barium", s: 62.48, cat: "alkaline", col: 2, row: 6, phase: "Solid", mass: 137.33 },
  { z: 57, sym: "La", name: "Lanthanum", s: 56.90, cat: "lanthanide", col: 4, row: 9, phase: "Solid", mass: 138.91 },
  { z: 58, sym: "Ce", name: "Cerium", s: 72.00, cat: "lanthanide", col: 5, row: 9, phase: "Solid", mass: 140.12 },
  { z: 59, sym: "Pr", name: "Praseodymium", s: 73.93, cat: "lanthanide", col: 6, row: 9, phase: "Solid", mass: 140.91 },
  { z: 60, sym: "Nd", name: "Neodymium", s: 71.09, cat: "lanthanide", col: 7, row: 9, phase: "Solid", mass: 144.24 },
  { z: 61, sym: "Pm", name: "Promethium", s: 71.00, cat: "lanthanide", col: 8, row: 9, phase: "Solid", mass: 145.00 },
  { z: 62, sym: "Sm", name: "Samarium", s: 69.58, cat: "lanthanide", col: 9, row: 9, phase: "Solid", mass: 150.36 },
  { z: 63, sym: "Eu", name: "Europium", s: 80.79, cat: "lanthanide", col: 10, row: 9, phase: "Solid", mass: 151.96 },
  { z: 64, sym: "Gd", name: "Gadolinium", s: 68.07, cat: "lanthanide", col: 11, row: 9, phase: "Solid", mass: 157.25 },
  { z: 65, sym: "Tb", name: "Terbium", s: 73.21, cat: "lanthanide", col: 12, row: 9, phase: "Solid", mass: 158.93 },
  { z: 66, sym: "Dy", name: "Dysprosium", s: 74.77, cat: "lanthanide", col: 13, row: 9, phase: "Solid", mass: 162.50 },
  { z: 67, sym: "Ho", name: "Holmium", s: 75.02, cat: "lanthanide", col: 14, row: 9, phase: "Solid", mass: 164.93 },
  { z: 68, sym: "Er", name: "Erbium", s: 73.18, cat: "lanthanide", col: 15, row: 9, phase: "Solid", mass: 167.26 },
  { z: 69, sym: "Tm", name: "Thulium", s: 74.01, cat: "lanthanide", col: 16, row: 9, phase: "Solid", mass: 168.93 },
  { z: 70, sym: "Yb", name: "Ytterbium", s: 59.87, cat: "lanthanide", col: 17, row: 9, phase: "Solid", mass: 173.04 },
  { z: 71, sym: "Lu", name: "Lutetium", s: 50.96, cat: "lanthanide", col: 18, row: 9, phase: "Solid", mass: 174.97 },
  { z: 72, sym: "Hf", name: "Hafnium", s: 43.56, cat: "transition", col: 4, row: 6, phase: "Solid", mass: 178.49 },
  { z: 73, sym: "Ta", name: "Tantalum", s: 41.47, cat: "transition", col: 5, row: 6, phase: "Solid", mass: 180.95 },
  { z: 74, sym: "W", name: "Tungsten", s: 32.64, cat: "transition", col: 6, row: 6, phase: "Solid", mass: 183.84 },
  { z: 75, sym: "Re", name: "Rhenium", s: 36.86, cat: "transition", col: 7, row: 6, phase: "Solid", mass: 186.21 },
  { z: 76, sym: "Os", name: "Osmium", s: 32.64, cat: "transition", col: 8, row: 6, phase: "Solid", mass: 190.23 },
  { z: 77, sym: "Ir", name: "Iridium", s: 35.48, cat: "transition", col: 9, row: 6, phase: "Solid", mass: 192.22 },
  { z: 78, sym: "Pt", name: "Platinum", s: 41.63, cat: "transition", col: 10, row: 6, phase: "Solid", mass: 195.08 },
  { z: 79, sym: "Au", name: "Gold", s: 47.49, cat: "transition", col: 11, row: 6, phase: "Solid", mass: 196.97 },
  { z: 80, sym: "Hg", name: "Mercury", s: 76.02, cat: "transition", col: 12, row: 6, phase: "Liquid", mass: 200.59 },
  { z: 81, sym: "Tl", name: "Thallium", s: 64.18, cat: "post", col: 13, row: 6, phase: "Solid", mass: 204.38 },
  { z: 82, sym: "Pb", name: "Lead", s: 64.81, cat: "post", col: 14, row: 6, phase: "Solid", mass: 207.20 },
  { z: 83, sym: "Bi", name: "Bismuth", s: 56.74, cat: "post", col: 15, row: 6, phase: "Solid", mass: 208.98 },
  { z: 84, sym: "Po", name: "Polonium", s: 62.00, cat: "post", col: 16, row: 6, phase: "Solid", mass: 209.00 },
  { z: 85, sym: "At", name: "Astatine", s: 59.00, cat: "metalloid", col: 17, row: 6, phase: "Solid", mass: 210.00 },
  { z: 86, sym: "Rn", name: "Radon", s: 176.23, cat: "noble", col: 18, row: 6, phase: "Gas", mass: 222.00 },
  { z: 87, sym: "Fr", name: "Francium", s: 95.40, cat: "alkali", col: 1, row: 7, phase: "Solid", mass: 223.00 },
  { z: 88, sym: "Ra", name: "Radium", s: 71.00, cat: "alkaline", col: 2, row: 7, phase: "Solid", mass: 226.00 },
  { z: 89, sym: "Ac", name: "Actinium", s: 56.50, cat: "actinide", col: 4, row: 10, phase: "Solid", mass: 227.00 },
  { z: 90, sym: "Th", name: "Thorium", s: 53.39, cat: "actinide", col: 5, row: 10, phase: "Solid", mass: 232.04 },
  { z: 91, sym: "Pa", name: "Protactinium", s: 51.88, cat: "actinide", col: 6, row: 10, phase: "Solid", mass: 231.04 },
  { z: 92, sym: "U", name: "Uranium", s: 50.20, cat: "actinide", col: 7, row: 10, phase: "Solid", mass: 238.03 },
  { z: 93, sym: "Np", name: "Neptunium", s: 50.46, cat: "actinide", col: 8, row: 10, phase: "Solid", mass: 237.00 },
  { z: 94, sym: "Pu", name: "Plutonium", s: 54.46, cat: "actinide", col: 9, row: 10, phase: "Solid", mass: 244.00 },
  { z: 95, sym: "Am", name: "Americium", s: 55.40, cat: "actinide", col: 10, row: 10, phase: "Solid", mass: 243.00 },
  { z: 96, sym: "Cm", name: "Curium", s: 56.00, cat: "actinide", col: 11, row: 10, phase: "Solid", mass: 247.00 },
  { z: 97, sym: "Bk", name: "Berkelium", s: 57.00, cat: "actinide", col: 12, row: 10, phase: "Solid", mass: 247.00 },
  { z: 98, sym: "Cf", name: "Californium", s: 58.00, cat: "actinide", col: 13, row: 10, phase: "Solid", mass: 251.00 },
  { z: 99, sym: "Es", name: "Einsteinium", s: 59.00, cat: "actinide", col: 14, row: 10, phase: "Solid", mass: 252.00 },
  { z: 100, sym: "Fm", name: "Fermium", s: 60.00, cat: "actinide", col: 15, row: 10, phase: "Solid", mass: 257.00 },
  { z: 101, sym: "Md", name: "Mendelevium", s: 62.00, cat: "actinide", col: 16, row: 10, phase: "Solid", mass: 258.00 },
  { z: 102, sym: "No", name: "Nobelium", s: 64.00, cat: "actinide", col: 17, row: 10, phase: "Solid", mass: 259.00 },
  { z: 103, sym: "Lr", name: "Lawrencium", s: 66.00, cat: "actinide", col: 18, row: 10, phase: "Solid", mass: 262.00 },
  { z: 104, sym: "Rf", name: "Rutherfordium", s: 68.00, cat: "transition", col: 4, row: 7, phase: "Solid", mass: 267.00 },
  { z: 105, sym: "Db", name: "Dubnium", s: 70.00, cat: "transition", col: 5, row: 7, phase: "Solid", mass: 270.00 },
  { z: 106, sym: "Sg", name: "Seaborgium", s: 72.00, cat: "transition", col: 6, row: 7, phase: "Solid", mass: 271.00 },
  { z: 107, sym: "Bh", name: "Bohrium", s: 74.00, cat: "transition", col: 7, row: 7, phase: "Solid", mass: 270.00 },
  { z: 108, sym: "Hs", name: "Hassium", s: 76.00, cat: "transition", col: 8, row: 7, phase: "Solid", mass: 277.00 },
  { z: 109, sym: "Mt", name: "Meitnerium", s: 78.00, cat: "unknown", col: 9, row: 7, phase: "Solid", mass: 278.00 },
  { z: 110, sym: "Ds", name: "Darmstadtium", s: 80.00, cat: "unknown", col: 10, row: 7, phase: "Solid", mass: 281.00 },
  { z: 111, sym: "Rg", name: "Roentgenium", s: 82.00, cat: "unknown", col: 11, row: 7, phase: "Solid", mass: 282.00 },
  { z: 112, sym: "Cn", name: "Copernicium", s: 84.00, cat: "transition", col: 12, row: 7, phase: "Solid", mass: 285.00 },
  { z: 113, sym: "Nh", name: "Nihonium", s: 86.00, cat: "unknown", col: 13, row: 7, phase: "Solid", mass: 286.00 },
  { z: 114, sym: "Fl", name: "Flerovium", s: 88.00, cat: "unknown", col: 14, row: 7, phase: "Solid", mass: 289.00 },
  { z: 115, sym: "Mc", name: "Moscovium", s: 90.00, cat: "unknown", col: 15, row: 7, phase: "Solid", mass: 290.00 },
  { z: 116, sym: "Lv", name: "Livermorium", s: 92.00, cat: "unknown", col: 16, row: 7, phase: "Solid", mass: 293.00 },
  { z: 117, sym: "Ts", name: "Tennessine", s: 94.00, cat: "unknown", col: 17, row: 7, phase: "Solid", mass: 294.00 },
  { z: 118, sym: "Og", name: "Oganesson", s: 180.00, cat: "noble", col: 18, row: 7, phase: "Gas?", mass: 294.00 }
];

const EP_CAT_COLORS: Record<string, string> = {
  alkali: "#e05c3a", alkaline: "#d4843e", transition: "#4a8fa8",
  post: "#5c8a5c", metalloid: "#7b6fa0", nonmetal: "#4a8f7a",
  noble: "#3a6ea8", lanthanide: "#8a5c5c", actinide: "#6a5c7a", unknown: "#4a4a4a"
};

const EP_META: Record<string, string> = {
  alkali: "Alkali metals carry moderate-to-high entropy yet are violently reactive — restrained chaos, potential energy seeking release. The 'hungry' souls of the table: never satisfied in isolation, always reaching toward combination.",
  alkaline: "Alkaline earths sit at remarkably low entropy — Be at 9.5 J/mol·K approaches theoretical crystalline perfection. The Doric columns of matter: stability, order, the Platonic ideal of the solid state. Ω → 1.",
  transition: "Transition metals occupy the middle realm — entropy reflects complexity without chaos. Multiple oxidation states, d-orbital electrons, catalytic prowess: the alchemist's metals. Mid-range Ω.",
  post: "Post-transition metals blend crystalline order with increasing electronic complexity. Their moderately rising S° reflects the beginning of dissolution — solids becoming more flexible and communicative.",
  metalloid: "Metalloids exist in ontological twilight — neither fully metal nor nonmetal. Silicon at 18.83 anchors the digital age. The borderland is where entropy becomes highly philosophical.",
  nonmetal: "Nonmetals span the widest entropic range — from carbon's crystalline 5.74 to diatomic gas entropies above 100. Carbon (C=5.74) is life's low-entropy chassis.",
  noble: "Noble gases hold the highest standard entropies — isolated, complete, maximally dispersed. Anaximander's apeiron or the Taoist void: full in themselves, needing nothing. Maximum S, Ω → 0.",
  lanthanide: "Lanthanides form a hidden inner world — 4f electron sequence of subtle energetic distinctions. Their similar entropies suggest parallel states like Leibniz's monads.",
  actinide: "Actinides embody temporal entropy — radioactive decay means their very being is entropic process. The table's time-keepers: matter continuously becoming energy.",
  unknown: "Synthetic superheavy elements exist for microseconds — their estimated entropies are philosophical projections. The outer limit where quantum uncertainty and decay blur identity."
};

export default function EntropyPanel({ onClose, onSendPrompt }: { onClose: () => void; onSendPrompt: (p: string) => void }) {
  const [viewMode, setViewMode] = useState<"table" | "list">("table");
  const [sortBy, setSortBy] = useState<"z" | "entropy-asc" | "entropy-desc" | "cat">("z");
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  const getSPct = (s: number) => {
    return Math.min(100, Math.max(2, ((s - 4) / 176) * 100));
  };

  const epEntropyRank = (s: number) => {
    if (s < 15) return "Near-zero — Logos";
    if (s < 35) return "Low — Ordered solid";
    if (s < 65) return "Moderate — Structured";
    if (s < 100) return "Elevated — Approaching fluidity";
    if (s < 140) return "High — Gaseous freedom";
    return "Maximal — Apeiron";
  };

  const getSortedElements = () => {
    const list = [...EP_ELEMENTS];
    if (sortBy === "z") return list.sort((a, b) => a.z - b.z);
    if (sortBy === "entropy-asc") return list.sort((a, b) => a.s - b.s);
    if (sortBy === "entropy-desc") return list.sort((a, b) => b.s - a.s);
    if (sortBy === "cat") return list.sort((a, b) => a.cat.localeCompare(b.cat));
    return list;
  };

  return (
    <div className="fixed lg:absolute inset-0 bg-[#050505] text-[#eeeae4] overflow-y-auto z-[200] p-6 flex flex-col border-2 border-orange-500/20 rounded-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-4 sticky top-0 bg-[#050505]/95 z-20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-orange-400 tracking-wider flex items-center gap-2">
            <Table className="w-6 h-6 animate-pulse" /> Σ — THE S° ELEMENT TABLE
          </h2>
          <p className="text-xs text-[#8898aa] font-mono mt-1">Standard Molar Entropy · S° (J mol⁻¹ K⁻¹ at 298 K) · S = k_B ln Ω</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button 
              onClick={() => { setViewMode("table"); setSortBy("z"); }} 
              className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-all border ${viewMode === "table" ? "bg-orange-500/10 border-orange-500/40 text-orange-400 font-bold" : "border-orange-500/10 text-gray-400 hover:border-orange-500/30 hover:text-white"}`}
            >
              Periodic Grid
            </button>
            <button 
              onClick={() => setViewMode("list")} 
              className={`px-3 py-1.5 text-xs font-mono rounded cursor-pointer transition-all border ${viewMode === "list" ? "bg-orange-500/10 border-orange-500/40 text-orange-400 font-bold" : "border-orange-500/10 text-gray-400 hover:border-orange-500/30 hover:text-white"}`}
            >
              List Ledger
            </button>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/30 rounded px-4 py-2 text-xs font-mono text-orange-400 hover:bg-orange-500/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE
          </button>
        </div>
      </div>

      {/* Sorting Navigation for List View */}
      {viewMode === "list" && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-[#8898aa] font-mono self-center mr-2">Sort Ledger:</span>
          {[
            { id: "z", label: "Atomic Z" },
            { id: "entropy-asc", label: "S° Low → High" },
            { id: "entropy-desc", label: "S° High → Low" },
            { id: "cat", label: "Category" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSortBy(item.id as any)}
              className={`px-3 py-1 text-[10px] font-mono border rounded transition-all cursor-pointer ${
                sortBy === item.id 
                  ? "bg-orange-500/15 border-orange-500/50 text-orange-400 font-bold" 
                  : "border-orange-500/15 text-[#8898aa] hover:border-orange-500/30"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Legend Block */}
      <div className="flex items-center gap-4 flex-wrap pb-3 mb-6 border-b border-white/5 font-mono text-[9px] tracking-wider text-[#8898aa]">
        <span>Category:</span>
        <span style={{ color: "#e05c3a" }}>● Alkali</span>
        <span style={{ color: "#d4843e" }}>● Alkaline Earth</span>
        <span style={{ color: "#4a8fa8" }}>● Transition</span>
        <span style={{ color: "#5c8a5c" }}>● Post-Transition</span>
        <span style={{ color: "#7b6fa0" }}>● Metalloid</span>
        <span style={{ color: "#4a8f7a" }}>● Nonmetal</span>
        <span style={{ color: "#3a6ea8" }}>● Noble Gas</span>
        <span style={{ color: "#8a5c5c" }}>● Lanthanide</span>
        <span style={{ color: "#6a5c7a" }}>● Actinide</span>
        <span className="ml-auto text-orange-400 hidden sm:inline">💡 Click any element cell to inspect molecular dimensions</span>
      </div>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex gap-6 min-h-0 relative">
        <div className="flex-1 overflow-x-auto min-h-0 p-1">
          {viewMode === "table" ? (
            <div 
              className="grid gap-1 min-w-[980px]"
              style={{
                gridTemplateColumns: "repeat(18, minmax(50px, 1fr))",
                gridTemplateRows: "repeat(10, 62px) 16px"
              }}
            >
              {/* Elements grid mapping */}
              {EP_ELEMENTS.map((el) => {
                const color = EP_CAT_COLORS[el.cat] || "#555";
                const barWidth = getSPct(el.s);

                return (
                  <div
                    key={el.z}
                    onClick={() => setSelectedElement(el)}
                    className="bg-[#0c0c0c]/90 border border-orange-500/15 rounded p-2 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:scale-108 hover:z-10 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all group"
                    style={{ gridColumn: el.col, gridRow: el.row }}
                  >
                    <div className="text-[7.5px] text-white/35 font-mono">{el.z}</div>
                    <div className="text-center text-lg font-bold group-hover:scale-110 transition-all" style={{ color }}>{el.sym}</div>
                    <div className="text-[6.5px] text-white/45 text-center truncate">{el.name}</div>
                    <div className="text-[7.5px] text-white/50 font-mono text-center">{el.s.toFixed(1)}</div>
                    <div 
                      className="absolute bottom-0 left-0 h-[2px] transition-all opacity-70"
                      style={{ width: `${barWidth}%`, backgroundColor: color }}
                    ></div>
                  </div>
                );
              })}

              {/* Lanthanide & Actinide inline guides */}
              <div 
                className="bg-[#0e0e0e]/45 border border-dashed border-orange-500/10 rounded flex items-center justify-center text-[7px] text-[#8a5c5c]/60 font-mono"
                style={{ gridColumn: 3, gridRow: 6 }}
              >
                La–Lu *
              </div>
              <div 
                className="bg-[#0e0e0e]/45 border border-dashed border-orange-500/10 rounded flex items-center justify-center text-[7px] text-[#6a5c7a]/60 font-mono"
                style={{ gridColumn: 3, gridRow: 7 }}
              >
                Ac–Lr **
              </div>

              {/* Spacing alignment elements */}
              <div className="col-span-full h-2.5" style={{ gridRow: 8 }}></div>
              <div 
                className="flex items-center justify-center font-mono text-[7px] text-white/20 border-r border-white/5 pr-2"
                style={{ gridColumn: "1 / 3", gridRow: 9 }}
              >
                * Lanthanides
              </div>
              <div 
                className="flex items-center justify-center font-mono text-[7px] text-white/20 border-r border-white/5 pr-2"
                style={{ gridColumn: "1 / 3", gridRow: 10 }}
              >
                ** Actinides
              </div>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[500px] border border-orange-500/15 rounded bg-[#080808]/50">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead className="sticky top-0 bg-[#050505] border-b border-orange-500/20">
                  <tr>
                    <th className="p-3">Z</th>
                    <th className="p-3">Symbol</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">S° (J/mol·K)</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Phase State</th>
                    <th className="p-3">Complexity Rank</th>
                    <th className="p-3">Mass u</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedElements().map((el) => {
                    const catColor = EP_CAT_COLORS[el.cat] || "#555";
                    return (
                      <tr 
                        key={el.z}
                        onClick={() => setSelectedElement(el)}
                        className="hover:bg-white/5 border-b border-white/5 cursor-pointer"
                      >
                        <td className="p-3 text-white/40">{el.z}</td>
                        <td className="p-3 font-bold text-sm" style={{ color: catColor }}>{el.sym}</td>
                        <td className="p-3 font-serif font-medium">{el.name}</td>
                        <td className="p-3 font-bold text-amber-300">
                          {el.s.toFixed(2)}
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-1.5 w-16">
                            <div className="h-full" style={{ width: `${getSPct(el.s)}%`, backgroundColor: catColor }}></div>
                          </div>
                        </td>
                        <td className="p-3 text-[10px]" style={{ color: catColor }}>{el.cat}</td>
                        <td className="p-3 text-white/50">{el.phase}</td>
                        <td className="p-3 text-white/50">{epEntropyRank(el.s)}</td>
                        <td className="p-3 text-white/40">{el.mass}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Scale Slider View */}
          <div className="mt-6 border-t border-white/5 pt-4">
            <h4 className="font-mono text-xs text-[#8898aa] uppercase tracking-wider mb-2">Standard Molar Entropy Spectrum</h4>
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-900 via-amber-700 to-amber-200"></div>
            <div className="flex justify-between font-mono text-[9px] text-[#6b7a8d] mt-2">
              <span>5.74 J/mol·K — Carbon (Crystalline Logos)</span>
              <span>180.00 J/mol·K — Oganesson (Maximal Gaseous Apeiron)</span>
            </div>
          </div>
        </div>

        {/* Detailed Side over Panel */}
        {selectedElement && (
          <div className="w-[320px] bg-[#070707]/95 border-l border-orange-500/20 shrink-0 p-5 rounded-lg flex flex-col justify-between overflow-y-auto animate-fadeIn absolute right-0 top-0 bottom-0 md:relative md:h-auto">
            <button 
              onClick={() => setSelectedElement(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              {/* Symbol Badge */}
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10" style={{ borderColor: `${EP_CAT_COLORS[selectedElement.cat]}30` }}>
                <span className="font-mono text-[10px] text-white/40">ATOMIC Z = {selectedElement.z}</span>
                <h3 className="text-4xl font-bold font-serif my-2" style={{ color: EP_CAT_COLORS[selectedElement.cat] }}>{selectedElement.sym}</h3>
                <p className="text-sm font-serif font-medium text-white/80">{selectedElement.name}</p>
                <div className="font-mono text-lg font-bold text-amber-300 mt-2">{selectedElement.s.toFixed(2)}</div>
                <div className="text-[8px] text-[#6b7a8d] uppercase tracking-widest font-mono">S° J/mol·K at 298K</div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-[#101010]/60 p-2 rounded">
                  <span className="text-[9px] text-[#6b7a8d] block font-semibold uppercase tracking-wider">Atomic Mass</span>
                  <span className="text-[#e8d5a3] font-bold">{selectedElement.mass} u</span>
                </div>
                <div className="bg-[#101010]/60 p-2 rounded">
                  <span className="text-[9px] text-[#6b7a8d] block font-semibold uppercase tracking-wider">Natural Phase</span>
                  <span className="text-white">{selectedElement.phase}</span>
                </div>
                <div className="bg-[#101010]/60 p-2 rounded col-span-2">
                  <span className="text-[9px] text-[#6b7a8d] block font-semibold uppercase tracking-wider">Entropy Category</span>
                  <span style={{ color: EP_CAT_COLORS[selectedElement.cat] }} className="font-bold uppercase tracking-wider">{selectedElement.cat}</span>
                </div>
              </div>

              {/* Details text */}
              <div className="space-y-2">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-orange-400 font-bold">Thermodynamic Profile</h4>
                <p className="text-[11px] text-[#8898aa] leading-relaxed italic border-l border-orange-500/20 pl-2">
                  {EP_META[selectedElement.cat]}
                </p>
              </div>

              {/* T x S = C calculation result */}
              <div className="bg-[#121212]/40 border border-orange-500/10 rounded p-3 text-xs leading-relaxed space-y-1">
                <div className="font-mono text-[9px] uppercase tracking-widest text-orange-400 font-bold mb-1">T × S = C Reading</div>
                <div className="text-white/80">
                  {selectedElement.sym} has standard entropy of <strong className="text-orange-300 font-bold">{selectedElement.s.toFixed(2)} J/mol·K</strong>.
                </div>
                <div className="text-[#8898aa] mt-1 text-[11px]">
                  {selectedElement.s < 15 ? (
                    `At near-zero entropy, ${selectedElement.name} embodies pristine crystalline Logos. Life chose Carbon (C=5.74) for biological frameworks because low S° translates to maximum structural fidelity.`
                  ) : selectedElement.s > 140 ? (
                    `At maximal entropy, ${selectedElement.name} represents the cosmic gaseous Apeiron, where structure dissolves into pure boundless potentiality.`
                  ) : (
                    `Operating in the middle chemical zone, ${selectedElement.name} balances structure and change. It is ideal for physical transmutations.`
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => onSendPrompt(`Analyze the chemical element ${selectedElement.name} (${selectedElement.sym}, entropy S° = ${selectedElement.s} J/mol·K) using the Metemphysics framework`)}
              className="w-full mt-4 bg-orange-500/10 border border-orange-500/30 rounded py-2 text-xs font-mono font-bold text-orange-400 cursor-pointer hover:bg-orange-500/20 transition-all text-center"
            >
              ✦ Ask Unified AI About {selectedElement.sym} ✦
            </button>
          </div>
        )}
      </div>

      {/* Meta blocks description footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-orange-500/[0.03] border border-orange-500/15 rounded font-serif">
        <div>
          <h5 className="font-serif text-sm font-bold text-orange-400 mb-1">Low S° — Logos</h5>
          <p className="text-[11px] text-[#8898aa] leading-relaxed italic">
            Elements with low entropy (Be, C, B) embody concentrated form — crystalline order, absolute informational density. Minimum entropic noise, Ω → 1.
          </p>
        </div>
        <div>
          <h5 className="font-serif text-sm font-bold text-orange-400 mb-1">Rising S° — Becoming</h5>
          <p className="text-[11px] text-[#8898aa] leading-relaxed italic">
            Transition metals carry moderate entropy — structured yet highly dynamic. The stage of chemical reactions, bonding, and catalytic transformation. Mid-range Ω.
          </p>
        </div>
        <div>
          <h5 className="font-serif text-sm font-bold text-orange-400 mb-1">High S° — Eros</h5>
          <p className="text-[11px] text-[#8898aa] leading-relaxed italic">
            Gaseous elements approach entropic freedom. S° rises as matter forgets its tight physical confinement, reaching beyond bounded limits toward the infinite.
          </p>
        </div>
        <div>
          <h5 className="font-serif text-sm font-bold text-orange-400 mb-1">Maximum S° — Apeiron</h5>
          <p className="text-[11px] text-[#8898aa] leading-relaxed italic">
            Noble gases: complete, completely unreactive, maximally dispersed. Anaximander's apeiron: the boundless, prior to differentiation. Entropy as pure void. Ω → 0.
          </p>
        </div>
      </div>
    </div>
  );
}
