import { useEffect, useRef } from "react";

const data = require("../data/content.json");

const NODE_VARS = {
  development: "var(--node-development)",
  graphics: "var(--node-graphics)",
  app: "var(--node-app)",
  docs: "var(--node-docs)",
  data: "var(--node-data)",
  reporting: "var(--node-reporting)",
};

const getColor = (type) => NODE_VARS[type] ?? "var(--node-default)";

const D3Viz = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    let simulation;

    (async () => {
      const d3 = await import("d3");

      const width = svgRef.current?.parentElement?.offsetWidth ?? 0;
      const height = 72;

      const padX = 20;
      const padY = 15;
      const usableW = width - 2 * padX;
      const usableH = height - 2 * padY;

      const nodes = data.stories.map((d) => {
        const type = d.storyType.split(" ");
        return {
          radius: width > 500 ? type.length * 2 + 7 : type.length * 2 + 6,
          type,
        };
      });

      const root = nodes[0];
      root.radius = 0;
      root.fx = -1000;
      root.fy = -1000;

      nodes.slice(1).forEach((d) => {
        d.homeX = padX + Math.random() * usableW;
        d.homeY = padY + Math.random() * usableH;
        d.x = d.homeX;
        d.y = d.homeY;
      });

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", `${height}px`);

      svg.selectAll("*").remove();

      const visibleNodes = nodes.slice(1);

      svg
        .selectAll("circle.node")
        .data(visibleNodes)
        .join("circle")
        .attr("class", "node")
        .attr("r", (d) => d.radius)
        .attr("fill", (d) => getColor(d.type[0]));

      simulation = d3
        .forceSimulation(nodes)
        .force(
          "charge",
          d3.forceManyBody().strength((_, i) => (i ? 2 : -80)),
        )
        .force("x", d3.forceX((d) => d.homeX ?? 0).strength(0.1))
        .force("y", d3.forceY((d) => d.homeY ?? 0).strength(0.1))
        .force(
          "collision",
          d3.forceCollide().radius((d) => d.radius),
        )
        .on("tick", () => {
          svg
            .selectAll("circle.node")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y);
        });

      svg
        .on("mousemove", function (event) {
          const [x, y] = d3.pointer(event, this);
          root.fx = x;
          root.fy = y;
          simulation.alpha(0.3).restart();
        })
        .on("mouseleave", () => {
          root.fx = -1000;
          root.fy = -1000;
          simulation.alpha(0.3).restart();
        });
    })();

    return () => simulation?.stop();
  }, []);

  return <svg ref={svgRef} style={{ width: "100%", height: "72px" }} />;
};

export default D3Viz;
