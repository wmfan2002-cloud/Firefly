import type * as d3 from "d3";

export interface GraphNode extends d3.SimulationNodeDatum {
	id: string;
	group: number; // 1: Post, 2: Tag, 3: Category
	name: string;
	url: string;
	val: number;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
	source: string | GraphNode;
	target: string | GraphNode;
	value: number;
}

export const GRAPH_COLORS = {
	post: "var(--primary)",
	tag: "#10b981",
	category: "#f59e0b",
} as const;
