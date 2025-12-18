<script lang="ts">
	import { onDestroy } from "svelte";
	import * as d3 from "d3";
	import type { GraphNode, GraphLink } from "@/types/graph";
	import { GRAPH_COLORS } from "@/types/graph";

	interface Props {
		nodes?: GraphNode[];
		links?: GraphLink[];
		isWidget?: boolean;
	}

	const { nodes = [], links = [], isWidget = false }: Props = $props();

	let container: HTMLDivElement;
	let width = $state(800);
	let height = $state(600);
	let simulation: d3.Simulation<GraphNode, GraphLink> | null = null;
	let initialized = $state(false);

	const colorMap: Record<number, string> = {
		1: GRAPH_COLORS.post,
		2: GRAPH_COLORS.tag,
		3: GRAPH_COLORS.category,
	};

	function cleanupSimulation() {
		if (simulation) {
			simulation.stop();
			simulation = null;
		}
		if (container) {
			d3.select(container).selectAll("*").remove();
		}
	}

	function initGraph() {
		if (!container || nodes.length === 0) return;

		cleanupSimulation();

		const nodesData = JSON.parse(JSON.stringify(nodes)) as GraphNode[];
		const linksData = JSON.parse(JSON.stringify(links)) as GraphLink[];

		const svg = d3
			.select(container)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [0, 0, width, height])
			.attr("role", "img")
			.attr("aria-label", "Knowledge graph showing relationships between posts, tags and categories")
			.attr("style", "max-width: 100%; height: auto;");

		const g = svg.append("g");

		if (!isWidget) {
			const zoom = d3
				.zoom<SVGSVGElement, unknown>()
				.scaleExtent([0.1, 4])
				.on("zoom", (event) => {
					g.attr("transform", event.transform);
				});
			svg.call(zoom);
		}

		simulation = d3
			.forceSimulation<GraphNode>(nodesData)
			.force(
				"link",
				d3
					.forceLink<GraphNode, GraphLink>(linksData)
					.id((d) => d.id)
					.distance(isWidget ? 40 : 60),
			)
			.force("charge", d3.forceManyBody().strength(isWidget ? -80 : -150))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force(
				"collide",
				d3
					.forceCollide<GraphNode>()
					.radius((d) => d.val + 2)
					.iterations(2),
			);

		const link = g
			.append("g")
			.attr("stroke", "var(--line-color)")
			.attr("stroke-opacity", 0.4)
			.selectAll("line")
			.data(linksData)
			.join("line")
			.attr("stroke-width", (d) => Math.sqrt(d.value));

		const node = g
			.append("g")
			.attr("stroke", "var(--card-bg)")
			.attr("stroke-width", 1.5)
			.selectAll<SVGCircleElement, GraphNode>("circle")
			.data(nodesData)
			.join("circle")
			.attr("r", (d) => d.val)
			.attr("fill", (d) => colorMap[d.group] || "#999")
			.attr("cursor", "pointer")
			.attr("role", "link")
			.attr("tabindex", 0)
			.attr("aria-label", (d) => d.name)
			.on("click", (_, d) => {
				if (d.url) window.location.href = d.url;
			})
			.on("keydown", (event, d) => {
				if ((event.key === "Enter" || event.key === " ") && d.url) {
					event.preventDefault();
					window.location.href = d.url;
				}
			});

		node.append("title").text((d) => d.name);

		const drag = d3
			.drag<SVGCircleElement, GraphNode>()
			.on("start", (event) => {
				if (!event.active && simulation) simulation.alphaTarget(0.3).restart();
				event.subject.fx = event.subject.x;
				event.subject.fy = event.subject.y;
			})
			.on("drag", (event) => {
				event.subject.fx = event.x;
				event.subject.fy = event.y;
			})
			.on("end", (event) => {
				if (!event.active && simulation) simulation.alphaTarget(0);
				event.subject.fx = null;
				event.subject.fy = null;
			});

		node.call(drag);

		if (!isWidget) {
			const text = g
				.append("g")
				.selectAll("text")
				.data(nodesData)
				.join("text")
				.text((d) => d.name)
				.attr("font-size", (d) => `${Math.min(12, d.val * 1.5)}px`)
				.attr("dx", (d) => d.val + 3)
				.attr("dy", 4)
				.attr("fill", "var(--content-text)")
				.attr("pointer-events", "none")
				.style("opacity", 0.85);

			simulation.on("tick", () => {
				link
					.attr("x1", (d) => (d.source as GraphNode).x!)
					.attr("y1", (d) => (d.source as GraphNode).y!)
					.attr("x2", (d) => (d.target as GraphNode).x!)
					.attr("y2", (d) => (d.target as GraphNode).y!);

				node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

				text.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
			});
		} else {
			simulation.on("tick", () => {
				link
					.attr("x1", (d) => (d.source as GraphNode).x!)
					.attr("y1", (d) => (d.source as GraphNode).y!)
					.attr("x2", (d) => (d.target as GraphNode).x!)
					.attr("y2", (d) => (d.target as GraphNode).y!);

				node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
			});
		}

		initialized = true;
	}

	$effect(() => {
		if (container && nodes.length > 0 && width > 0 && height > 0 && !initialized) {
			initGraph();
		}
	});

	onDestroy(() => {
		cleanupSimulation();
	});
</script>

<div
	bind:this={container}
	bind:clientWidth={width}
	bind:clientHeight={height}
	class="w-full h-full overflow-hidden rounded-xl transition-colors duration-300"
	style="min-height: {isWidget ? '220px' : '500px'};"
></div>
