/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScienceItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  concepts: string[];
  summary: string;
  confidence: number;
  related: string[];
  sourceType: string;
  displayOrder: number;
  omegaVal?: string;
}

export interface ScienceData {
  items: ScienceItem[];
}

export interface METEM_DB_Type {
  science: ScienceItem[];
  religions: ScienceItem[];
  discoveries: ScienceItem[];
  systems: ScienceItem[];
  formulas: ScienceItem[];
}

export class KnodeNode {
  id: string;
  patterns: string[];
  style: string;
  concepts: string[];
  transitions: string[];
  priority: number;
  template: string;
  handler: ((msg: string) => string | null) | null;

  constructor({ id, patterns = [], style = "neutral", concepts = [], transitions = [], priority = 1, template = "", handler = null }: {
    id: string;
    patterns?: string[];
    style?: string;
    concepts?: string[];
    transitions?: string[];
    priority?: number;
    template?: string;
    handler?: ((msg: string) => string | null) | null;
  }) {
    this.id = id;
    this.patterns = patterns;
    this.style = style;
    this.concepts = concepts;
    this.transitions = transitions;
    this.priority = priority;
    this.template = template;
    this.handler = handler;
  }
}

export class KnodeGraph {
  nodes: Map<string, KnodeNode>;

  constructor(nodes: KnodeNode[] = []) {
    this.nodes = new Map(nodes.map(n => [n.id, n]));
  }

  score(text: string, node: KnodeNode, currentId: string | null = null): number {
    const t = (text || "").toLowerCase();
    let s = 0;
    for (const p of node.patterns) {
      if (t.includes(p.toLowerCase())) s += 3;
    }
    for (const c of node.concepts) {
      if (t.includes(c.toLowerCase())) s += 1.5;
    }
    s += node.priority * 0.25;
    if (currentId && this.nodes.get(currentId) && this.nodes.get(currentId)!.transitions.includes(node.id)) {
      s += 2;
    }
    return s;
  }

  route(text: string, currentId: string | null = null): KnodeNode | null {
    const candidates = [...this.nodes.values()].filter(n => {
      if (!currentId) return true;
      const current = this.nodes.get(currentId);
      return current ? current.transitions.includes(n.id) || n.id === currentId : true;
    });

    const ranked = candidates
      .map(n => ({ node: n, score: this.score(text, n, currentId) }))
      .sort((a, b) => b.score - a.score);

    return ranked[0] && ranked[0].score > 0 ? ranked[0].node : null;
  }
}
