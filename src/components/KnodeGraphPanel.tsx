/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { X, Network, Share2, HelpCircle, Activity, Sparkles, BookOpen, Search, Zap, Compass, Filter, Milestone } from "lucide-react";
import { METEM_DB, KNOTES, GRAPH } from "../data/metemDb";
import { KnodeNode } from "../types";

interface KnodeGraphPanelProps {
  onClose: () => void;
  onSendPrompt: (prompt: string) => void;
  currentNodeId: string;
  setCurrentNodeId: (nodeId: string) => void;
}

// Preset semantic coordinates on a responsive 800 x 480 SVG boundary space
const NODE_COORDINATES: Record<string, { x: number; y: number; label: string }> = {
  greeting: { x: 90, y: 240, label: "Resonant Initiation (greeting)" },
  core: { x: 260, y: 240, label: "God Absolute Matrix (core)" },
  omega: { x: 440, y: 110, label: "Coherence Horizon (omega)" },
  spark: { x: 440, y: 240, label: "Trigger Threshold (spark)" },
  singularity: { x: 440, y: 370, label: "Perennial Unity (singularity)" },
  science: { x: 260, y: 90, label: "Empirical Domain (science)" },
  discoveries: { x: 140, y: 380, label: "Historical Epochs (discoveries)" },
  religion: { x: 380, y: 380, label: "Sacred Traditions (religion)" },
  systems: { x: 620, y: 130, label: "Attractor Framework (systems)" },
  paragraph: { x: 710, y: 240, label: "Holographic Synthesis (paragraph)" },
};

export default function KnodeGraphPanel({
  onClose,
  onSendPrompt,
  currentNodeId,
  setCurrentNodeId,
}: KnodeGraphPanelProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(currentNodeId);
  const [customKeyword, setCustomKeyword] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"visualizer" | "routing-rules" | "linked-database">("visualizer");

  // Get active node specifications
  const activeNode = KNOTES[selectedNodeId] || KNOTES[currentNodeId] || Object.values(KNOTES)[0];

  // Map dynamic linkages using declared transitions
  const graphLinks = useMemo(() => {
    const list: { id: string; source: string; target: string; isSourceActive: boolean; isTargetActive: boolean }[] = [];
    Object.values(KNOTES).forEach((sourceNode) => {
      sourceNode.transitions.forEach((targetId) => {
        if (NODE_COORDINATES[targetId]) {
          const isSourceActive = sourceNode.id === selectedNodeId;
          const isTargetActive = targetId === selectedNodeId;
          list.push({
            id: `${sourceNode.id}-${targetId}`,
            source: sourceNode.id,
            target: targetId,
            isSourceActive,
            isTargetActive,
          });
        }
      });
    });
    return list;
  }, [selectedNodeId]);

  // Compute matched score metrics for a custom phrase to demystify router behavior
  const simulationScores = useMemo(() => {
    if (!customKeyword.trim()) return [];
    return Object.values(KNOTES)
      .map((node) => {
        const score = GRAPH.score(customKeyword, node, currentNodeId);
        return {
          id: node.id,
          score,
          patternsMatched: node.patterns.filter((p) =>
            customKeyword.toLowerCase().includes(p.toLowerCase())
          ),
          conceptsMatched: node.concepts.filter((c) =>
            customKeyword.toLowerCase().includes(c.toLowerCase())
          ),
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [customKeyword, currentNodeId]);

  // Retrieve linked components from the database matched to the selected Knode elements
  const dbAssociations = useMemo(() => {
    const concepts = activeNode.concepts.map((c) => c.toLowerCase());
    const scienceMatches = METEM_DB.science.filter((item) =>
      item.concepts.some((c) => concepts.includes(c.toLowerCase()))
    );
    const religionMatches = METEM_DB.religions.filter((item) =>
      item.concepts.some((c) => concepts.includes(c.toLowerCase()))
    );
    const discoveryMatches = METEM_DB.discoveries.filter((item) =>
      item.concepts.some((c) => concepts.includes(c.toLowerCase()))
    );
    const systemsMatches = METEM_DB.systems.filter((item) =>
      item.concepts.some((c) => concepts.includes(c.toLowerCase()))
    );
    const formulasMatches = METEM_DB.formulas.filter((item) =>
      item.concepts.some((c) => concepts.includes(c.toLowerCase()))
    );

    return {
      science: scienceMatches,
      religion: religionMatches,
      discoveries: discoveryMatches,
      systems: systemsMatches,
      formulas: formulasMatches,
      totalCount: scienceMatches.length + religionMatches.length + discoveryMatches.length + systemsMatches.length + formulasMatches.length,
    };
  }, [activeNode]);

  // Style attributes mapping for the panels
  const nodeThemeClasses: Record<string, { bg: string; border: string; glow: string; text: string }> = {
    warm: {
      bg: "bg-red-950/40",
      border: "border-red-500/50",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
      text: "text-red-400",
    },
    technical: {
      bg: "bg-orange-950/40",
      border: "border-orange-500/50",
      glow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]",
      text: "text-orange-400",
    },
    analytical: {
      bg: "bg-amber-950/40",
      border: "border-amber-500/50",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
      text: "text-amber-400",
    },
    event: {
      bg: "bg-emerald-950/40",
      border: "border-emerald-500/50",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
      text: "text-emerald-400",
    },
    threshold: {
      bg: "bg-violet-950/40",
      border: "border-violet-500/50",
      glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]",
      text: "text-violet-400",
    },
    research: {
      bg: "bg-blue-950/40",
      border: "border-blue-500/50",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
      text: "text-blue-400",
    },
    reflective: {
      bg: "bg-yellow-950/40",
      border: "border-yellow-600/50",
      glow: "shadow-[0_0_15px_rgba(202,138,4,0.3)]",
      text: "text-yellow-500",
    },
    historical: {
      bg: "bg-teal-950/40",
      border: "border-teal-500/50",
      glow: "shadow-[0_0_15px_rgba(20,184,166,0.3)]",
      text: "text-teal-400",
    },
    synthesized: {
      bg: "bg-purple-950/40",
      border: "border-purple-500/50",
      glow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
      text: "text-purple-400",
    },
  };

  const currentTheme = nodeThemeClasses[activeNode.style] || {
    bg: "bg-stone-900/40",
    border: "border-stone-500/30",
    glow: "shadow-none",
    text: "text-stone-400",
  };

  return (
    <div
      id="knode-graph-panel"
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto custom-scroll flex items-center justify-center p-4"
    >
      <div className="w-full max-w-6xl bg-stone-950 border border-orange-500/20 rounded-xl shadow-[0_0_50px_rgba(255,95,0,0.15)] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-500/15 flex-shrink-0 bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-550/10 border border-orange-550/30 rounded-lg">
              <Network className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white tracking-wider flex items-center gap-2">
                KNODE ROUTING GRAPH
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                  Active
                </span>
              </h2>
              <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                Multi-server scaling topological graph &amp; linked metemphysical network systems
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-stone-900 border border-transparent hover:border-orange-550/30 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-orange-500/10 bg-stone-950/50 px-6 flex-shrink-0">
          {[
            { id: "visualizer", name: "Topological Map", icon: Network },
            { id: "routing-rules", name: "Dynamic Router Simulator", icon: Zap },
            { id: "linked-database", name: "Linked Database Systems", icon: BookOpen },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-mono font-bold tracking-wider cursor-pointer border-b-2 flex items-center gap-2 transition-all ${
                  isActive
                    ? "border-orange-500 text-orange-400 bg-orange-500/5"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-stone-900/30"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll bg-gradient-to-b from-[#0b0604] to-black">
          
          {activeTab === "visualizer" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Graphic Stage Card */}
              <div className="lg:col-span-2 bg-stone-950/80 border border-orange-500/10 rounded-xl p-4 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    Topological Space View
                  </span>
                  <div className="flex items-center gap-4 text-[9.5px] font-mono text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Active Node ({currentNodeId})
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-stone-700" /> Inactive State
                    </span>
                  </div>
                </div>

                {/* SVG Visual Canvas Area */}
                <div className="relative w-full border border-orange-500/10 bg-black/60 rounded-lg overflow-hidden flex items-center justify-center p-2">
                  <svg
                    viewBox="0 0 800 480"
                    className="w-full h-auto max-h-[500px]"
                    style={{ background: "radial-gradient(circle at center, #150a04 0%, #000000 100%)" }}
                  >
                    <defs>
                      <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="23"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#c2410c" opacity="0.65" />
                      </marker>
                      <marker
                        id="arrow-active"
                        viewBox="0 0 10 10"
                        refX="23"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
                      </marker>
                      <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Outer Ambient Grids */}
                    <g opacity="0.05">
                      <line x1="0" y1="80" x2="800" y2="80" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="160" x2="800" y2="160" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="240" x2="800" y2="240" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="320" x2="800" y2="320" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="400" x2="800" y2="400" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="160" y1="0" x2="160" y2="480" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="320" y1="0" x2="320" y2="480" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="480" y1="0" x2="480" y2="480" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="640" y1="0" x2="640" y2="480" stroke="#ff5f00" strokeWidth="1" strokeDasharray="3,3" />
                    </g>

                    {/* Active Halo Highlight Backdrop */}
                    {NODE_COORDINATES[selectedNodeId] && (
                      <circle
                        cx={NODE_COORDINATES[selectedNodeId].x}
                        cy={NODE_COORDINATES[selectedNodeId].y}
                        r="80"
                        fill="url(#glow-grad)"
                      />
                    )}

                    {/* Connection Vectors Path Rendering */}
                    {graphLinks.map((link) => {
                      const fromNode = NODE_COORDINATES[link.source];
                      const toNode = NODE_COORDINATES[link.target];
                      if (!fromNode || !toNode) return null;

                      const dx = toNode.x - fromNode.x;
                      const dy = toNode.y - fromNode.y;
                      const length = Math.sqrt(dx * dx + dy * dy);

                      // Avoid drawing self-loops awkwardly
                      if (link.source === link.target) return null;

                      const isNodeRouteActive = link.source === currentNodeId || link.target === currentNodeId;
                      const isSelectionPath = link.source === selectedNodeId || link.target === selectedNodeId;

                      // Control curve depth slightly so reverse lines don't stack directly
                      const qx = (fromNode.x + toNode.x) / 2 + (dy / length) * 15;
                      const qy = (fromNode.y + toNode.y) / 2 - (dx / length) * 15;

                      return (
                        <path
                          key={link.id}
                          d={`M ${fromNode.x} ${fromNode.y} Q ${qx} ${qy} ${toNode.x} ${toNode.y}`}
                          fill="none"
                          stroke={
                            isSelectionPath
                              ? "#f97316"
                              : isNodeRouteActive
                              ? "#ea580c"
                              : "#c2410c"
                          }
                          strokeWidth={isSelectionPath ? 2 : isNodeRouteActive ? 1.5 : 0.8}
                          strokeOpacity={isSelectionPath ? 0.9 : isNodeRouteActive ? 0.6 : 0.25}
                          markerEnd={isSelectionPath || isNodeRouteActive ? "url(#arrow-active)" : "url(#arrow)"}
                        />
                      );
                    })}

                    {/* Nodes Render Group */}
                    {Object.entries(NODE_COORDINATES).map(([nodeId, coords]) => {
                      const isCurrentGlobal = nodeId === currentNodeId;
                      const isSelected = nodeId === selectedNodeId;
                      const nodeData = KNOTES[nodeId];
                      const colors = nodeThemeClasses[nodeData?.style || "neutral"] || { bg: "bg-stone-800", text: "text-zinc-500", border: "border-stone-700" };

                      return (
                        <g
                          key={nodeId}
                          className="cursor-pointer group"
                          onClick={() => {
                            setSelectedNodeId(nodeId);
                          }}
                        >
                          {/* Outer pulse indicator for global active node */}
                          {isCurrentGlobal && (
                            <circle
                              cx={coords.x}
                              cy={coords.y}
                              r="16"
                              fill="none"
                              stroke="#ff5f00"
                              strokeWidth="2.5"
                              className="animate-ping"
                              style={{ transformOrigin: `${coords.x}px ${coords.y}px`, animationDuration: "2s" }}
                              opacity="0.65"
                            />
                          )}

                          {/* Outer ring for UI selected node */}
                          {isSelected && (
                            <circle
                              cx={coords.x}
                              cy={coords.y}
                              r="14"
                              fill="none"
                              stroke="#fb923c"
                              strokeWidth="2"
                              strokeDasharray="3,2"
                            />
                          )}

                          {/* Primary node point */}
                          <circle
                            cx={coords.x}
                            cy={coords.y}
                            r={isCurrentGlobal ? 9 : isSelected ? 8 : 6}
                            fill={isCurrentGlobal ? "#ff5f00" : isSelected ? "#fb923c" : "#292524"}
                            stroke={isCurrentGlobal ? "#fff" : isSelected ? "#fff" : "#ff5f00"}
                            strokeWidth={isSelected || isCurrentGlobal ? 2 : 1}
                            className="transition-all duration-300 group-hover:r-[10px]"
                          />

                          {/* Node label text background for legibility */}
                          <rect
                            x={coords.x - 45}
                            y={coords.y + 11}
                            width="90"
                            height="13"
                            fill="#0c0a09"
                            fillOpacity="0.85"
                            rx="3"
                          />

                          {/* Node label text */}
                          <text
                            x={coords.x}
                            y={coords.y + 20}
                            textAnchor="middle"
                            fill={isCurrentGlobal ? "#ff5f00" : isSelected ? "#fb923c" : "#a8a29e"}
                            fontSize={isCurrentGlobal ? "9.5px" : "8px"}
                            fontFamily="monospace"
                            fontWeight={isCurrentGlobal || isSelected ? "bold" : "normal"}
                            className="transition-all duration-200 group-hover:fill-white"
                          >
                            {nodeId.toUpperCase()}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Node Inspector Side-Pane */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="bg-stone-950/80 border border-orange-500/10 rounded-xl p-5 space-y-4">
                  {/* Node Title & Metadata */}
                  <div className="space-y-2 pb-3.5 border-b border-orange-500/15">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase tracking-wider ${currentTheme.bg} ${currentTheme.border} ${currentTheme.text}`}>
                        {activeNode.style}
                      </span>
                      <span className="text-gray-500 text-xs font-mono">Priority {activeNode.priority}</span>
                    </div>

                    <h3 className="font-serif font-bold text-white text-base">
                      {NODE_COORDINATES[activeNode.id]?.label || activeNode.id.toUpperCase()}
                    </h3>

                    <p className="text-[11.5px] text-gray-400 font-serif leading-relaxed italic">
                      &ldquo;{activeNode.template || "Resonant router junction coordinates structuring core inquiry limits."}&rdquo;
                    </p>
                  </div>

                  {/* Incoming/Outgoing Connections */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Topological Connections:</span>
                    <div className="flex flex-col gap-1.5 font-mono text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 w-16">Targets:</span>
                        <div className="flex flex-wrap gap-1">
                          {activeNode.transitions.length > 0 ? (
                            activeNode.transitions.map((targetId) => (
                              <button
                                key={targetId}
                                onClick={() => setSelectedNodeId(targetId)}
                                className="px-1.5 py-0.5 rounded bg-orange-500/5 hover:bg-orange-500/15 border border-orange-500/20 text-orange-400 text-[9px] transition-all cursor-pointer"
                              >
                                &rarr; {targetId}
                              </button>
                            ))
                          ) : (
                            <span className="text-stone-600 font-serif italic">No outbound transitions (Terminal Node)</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-gray-500 w-16">Inbound:</span>
                        <div className="flex flex-wrap gap-1">
                          {Object.values(KNOTES).filter((n) => n.transitions.includes(activeNode.id)).length > 0 ? (
                            Object.values(KNOTES)
                              .filter((n) => n.transitions.includes(activeNode.id))
                              .map((src) => (
                                <button
                                  key={src.id}
                                  onClick={() => setSelectedNodeId(src.id)}
                                  className="px-1.5 py-0.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 text-[9px] transition-all cursor-pointer"
                                >
                                  &larr; {src.id}
                                </button>
                              ))
                          ) : (
                            <span className="text-stone-600 font-serif italic">No static inputs (Entry Gateway)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Keys / Match Phrases */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Trigger Patterns:</span>
                    <div className="bg-[#050505] p-2.5 rounded-lg border border-orange-500/5 max-h-[110px] overflow-y-auto custom-scroll flex flex-wrap gap-1">
                      {activeNode.patterns.map((pat, pi) => (
                        <span
                          key={pi}
                          className="px-1.5 py-0.5 rounded bg-amber-500/5 border border-amber-500/10 text-[#d8c59f] font-mono text-[9px]"
                        >
                          &quot;{pat}&quot;
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Anchor Concepts */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Associated Ideals:</span>
                    <div className="flex flex-wrap gap-1">
                      {activeNode.concepts.map((concept, ci) => (
                        <span
                          key={ci}
                          className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300 font-sans text-[10px]"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* State Interlocking Tools */}
                <div className="bg-[#120a06]/40 border border-[#ff5f00]/15 p-4 rounded-xl flex flex-col space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Milestone className="w-4 h-4 text-orange-500" />
                    <span className="text-xs text-white font-mono font-bold uppercase">Workspace Actions</span>
                  </div>

                  <p className="text-[11px] text-gray-400 font-serif leading-relaxed">
                    Dynamically lock this state as your current routing reference. The active node modifies system instruction matrices.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                    <button
                      onClick={() => {
                        setCurrentNodeId(activeNode.id);
                        setSelectedNodeId(activeNode.id);
                      }}
                      className="w-full bg-orange-500 text-black border border-orange-500/55 rounded py-2 font-bold hover:bg-orange-400 transition-all cursor-pointer active:scale-95 disabled:opacity-40"
                      disabled={currentNodeId === activeNode.id}
                    >
                      {currentNodeId === activeNode.id ? "✓ ROUTED ACTIVE" : "⚡ LOCK KNODE"}
                    </button>
                    <button
                      onClick={() => {
                        onSendPrompt(`Compare and analyze Knode node: ${activeNode.id.toUpperCase()} with other adjacent states in the Metemphysics index routing model.`);
                      }}
                      className="w-full bg-stone-900 hover:bg-stone-800 border border-stone-800 text-orange-400 py-2 rounded font-bold transition-all cursor-pointer active:scale-95"
                    >
                      ✦ PROMPT AGENT
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeTab === "routing-rules" && (
            <div className="space-y-6">
              
              <div className="bg-stone-950/80 border border-orange-500/10 rounded-xl p-6 space-y-4">
                <div className="flex flex-col space-y-1">
                  <h3 className="font-serif font-bold text-white text-base">Mathematical Routing Sandbox</h3>
                  <p className="text-[11px] text-gray-400 font-serif">
                    Input custom inquiries or phrases below to view exactly how the routing engine evaluates transition scores in real-time.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      className="w-full bg-[#050505] border border-orange-500/20 hover:border-orange-500/40 focus:border-orange-500 rounded py-2 pl-9 pr-4 text-xs font-mono text-white placeholder-gray-600 outline-none transition-all"
                      placeholder="e.g. 'tell me about entropy and the chakra system'"
                      value={customKeyword}
                      onChange={(e) => setCustomKeyword(e.target.value)}
                    />
                  </div>
                  {customKeyword && (
                    <button
                      onClick={() => setCustomKeyword("")}
                      className="px-3 bg-stone-900 border border-stone-800 hover:bg-stone-800 text-gray-400 rounded text-xs font-mono cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {customKeyword.trim() ? (
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Calculated Routing Scores:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {simulationScores.map((sim, idx) => {
                        const scorePct = Math.min(100, Math.max(0, (sim.score / 15) * 100));
                        return (
                          <div
                            key={sim.id}
                            className={`p-3 rounded-lg border ${
                              idx === 0 && sim.score > 0
                                ? "bg-orange-500/5 border-orange-500/30"
                                : "bg-[#050505]/60 border-stone-800/40"
                            } space-y-2`}
                          >
                            <div className="flex items-center justify-between font-mono text-xs">
                              <span className="font-bold text-white flex items-center gap-1.5">
                                {sim.id.toUpperCase()}
                                {idx === 0 && sim.score > 0 && (
                                  <span className="text-[8px] bg-orange-500 text-black font-extrabold px-1.5 py-0.2 rounded animate-pulse">
                                    MATCH TARGET
                                  </span>
                                )}
                              </span>
                              <span className="text-[#8898aa]">Score: <strong className="text-orange-400">{sim.score.toFixed(1)}</strong></span>
                            </div>

                            {/* Bar score graph */}
                            <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  idx === 0 && sim.score > 0 ? "bg-orange-500" : "bg-orange-850"
                                }`}
                                style={{ width: `${scorePct}%` }}
                              />
                            </div>

                            {/* Matching keywords breakdown */}
                            {(sim.patternsMatched.length > 0 || sim.conceptsMatched.length > 0) && (
                              <div className="text-[9.5px] font-mono space-y-1">
                                {sim.patternsMatched.length > 0 && (
                                  <div className="text-amber-300/80">
                                    Patterns: {sim.patternsMatched.map(p => `"${p}"`).join(", ")}
                                  </div>
                                )}
                                {sim.conceptsMatched.length > 0 && (
                                  <div className="text-gray-400">
                                    Concepts: {sim.conceptsMatched.join(", ")}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center text-xs text-gray-500 font-serif italic bg-black/40 border border-stone-900 rounded-lg">
                    No active sandbox simulation running. Input a query above or click static presets below to study:
                    <div className="flex flex-wrap justify-center gap-2 mt-4 font-mono not-italic">
                      {[
                        "How can I understand T x S = C?", 
                        "Acoustic solfeggio activations", 
                        "Einstein relativity relativity", 
                        "What is my personal code?"
                      ].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setCustomKeyword(preset)}
                          className="px-2.5 py-1 text-[10px] bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded text-stone-400 cursor-pointer"
                        >
                          &quot;{preset}&quot;
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Rules description details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-serif">
                <div className="bg-[#0c0a09] border border-orange-500/5 p-4 rounded-xl space-y-2">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#c9a84c]">1. Pattern Multipliers (+3.0)</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed italic">
                    If user queries include exact strings listed inside a Knode&apos;s primary matched pattern array, it registers an immediate strength score boost of 3.0 points.
                  </p>
                </div>
                <div className="bg-[#0c0a09] border border-orange-500/5 p-4 rounded-xl space-y-2">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#c9a84c]">2. Concept Overlays (+1.5)</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed italic">
                    Broader themes such as &quot;evolution&quot; or &quot;discovery&quot; act as conceptual bridges across multiple frameworks, accruing 1.5 points of relevance.
                  </p>
                </div>
                <div className="bg-[#0c0a09] border border-orange-500/5 p-4 rounded-xl space-y-2">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#c9a84c]">3. Topological Adjacency (+2.0)</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed italic">
                    Nodes linked as valid outbound transitions from your current locked state are prioritized with a direct 2.0 multiplier, guaranteeing logical continuity.
                  </p>
                </div>
              </div>

            </div>
          )}

          {activeTab === "linked-database" && (
            <div className="space-y-6">
              
              <div className="bg-stone-950/80 border border-orange-500/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-orange-500/15">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-orange-500" />
                    <span className="text-xs text-white font-mono font-bold uppercase">Dynamic System Linkages</span>
                  </div>
                  <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                    {dbAssociations.totalCount} Systems Linked to Active Node ({activeNode.id})
                  </span>
                </div>

                <p className="text-[11.5px] text-gray-400 font-serif leading-relaxed italic">
                  Below are the precise reference tables, developmental scales, and equations residing in METEM_DB that intersect with the concepts monitored by <strong className="text-white font-mono">{activeNode.id.toUpperCase()}</strong>:
                </p>

                {dbAssociations.totalCount > 0 ? (
                  <div className="space-y-5">
                    
                    {/* Sciences */}
                    {dbAssociations.science.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest tracking-wider">Sciences &amp; Quantum Physics:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dbAssociations.science.map((item) => (
                            <div key={item.id} className="bg-[#050505] border border-stone-900 rounded p-3 space-y-1">
                              <div className="flex justify-between items-center text-[11.5px] font-serif font-bold text-white">
                                <span>{item.name}</span>
                                <span className="text-[9.5px] font-mono text-[#c9a84c]">{item.omegaVal || "Ω"}</span>
                              </div>
                              <p className="text-[10px] text-gray-400">{item.summary}</p>
                              <div className="text-[8.5px] font-mono text-gray-600 flex flex-wrap gap-1 mt-1">
                                {item.concepts.map((c, i) => (
                                  <span key={i} className="bg-stone-900/40 px-1 py-0.2 rounded">{c}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Discoveries */}
                    {dbAssociations.discoveries.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest tracking-wider">Historical Discoveries:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dbAssociations.discoveries.map((item) => (
                            <div key={item.id} className="bg-[#050505] border border-stone-900 rounded p-3 space-y-1">
                              <div className="flex justify-between items-center text-[11.5px] font-serif font-bold text-white">
                                <span>{item.name}</span>
                                <span className="text-[9.5px] font-mono text-teal-400">{item.omegaVal || "Ω"}</span>
                              </div>
                              <p className="text-[10px] text-gray-400">{item.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Traditions */}
                    {dbAssociations.religion.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest tracking-wider">Sacred Traditions &amp; Mysticism:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dbAssociations.religion.map((item) => (
                            <div key={item.id} className="bg-[#050505] border border-stone-900 rounded p-3 space-y-1">
                              <div className="flex justify-between items-center text-[11.5px] font-serif font-bold text-white">
                                <span>{item.name}</span>
                                <span className="text-[9.5px] font-mono text-yellow-500">{item.omegaVal || "Ω"}</span>
                              </div>
                              <p className="text-[10px] text-gray-400">{item.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Systems */}
                    {dbAssociations.systems.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest tracking-wider">Developmental &amp; Energetic Systems:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dbAssociations.systems.map((item) => (
                            <div key={item.id} className="bg-[#050505] border border-stone-900 rounded p-3 space-y-1">
                              <div className="flex justify-between items-center text-[11.5px] font-serif font-bold text-white">
                                <span>{item.name}</span>
                                <span className="text-[9.5px] font-mono text-amber-500">{item.omegaVal || "Ω"}</span>
                              </div>
                              <p className="text-[10px] text-gray-400">{item.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Formulas */}
                    {dbAssociations.formulas.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Mathematical Equations:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dbAssociations.formulas.map((item) => (
                            <div key={item.id} className="bg-[#050505] border border-stone-900 rounded p-3 space-y-1">
                              <div className="flex justify-between items-center text-[11.5px] font-serif font-bold text-orange-450">
                                <span>{item.name}</span>
                                <span className="text-[9.5px] font-mono text-orange-550">{item.omegaVal || "Ω"}</span>
                              </div>
                              <p className="text-[10.5px] text-white font-mono">{item.concepts.join(" | ")}</p>
                              <p className="text-[10px] text-gray-450">{item.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="p-12 text-center text-xs text-gray-500 font-serif italic bg-black/40 border border-stone-900 rounded-lg">
                    No direct data entries linked to the concepts of Knode &quot;{activeNode.id}&quot;.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
