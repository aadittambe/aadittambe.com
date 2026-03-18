import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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

const NAV_LINKS = [
  { href: "/", label: "Home", key: "home" },
  { href: "/projects", label: "Projects", key: "projects" },
  { href: "/resume", label: "Resume", key: "resume" },
  { href: "/contact", label: "Contact", key: "contact" },
];

const Header = () => {
  const router = useRouter();
  const svgRef = useRef(null);

  const page = router.route.replace(/\//g, "");
  const activeLink =
    page === "" ? "home" : page.startsWith("blog") ? "blog" : page;

  useEffect(() => {
    let simulation;

    (async () => {
      const d3 = await import("d3");

      const width = svgRef.current?.parentElement?.offsetWidth ?? 0;
      const height = 150;

      const anchorX = width - width / 3;

      const nodes = data.stories.map((d) => {
        const type = d.storyType.split(" ");
        return {
          radius: type.length * 3 + 4,
          type,
          x: anchorX + (Math.random() - 0.5) * (width / 2),
          y: Math.random() * height,
        };
      });

      const root = nodes[0];
      root.radius = 0;
      root.fx = anchorX;
      root.fy = height / 2;

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", `${height}px`);

      // Clear previous renders (guards against React StrictMode double-invoke)
      svg.selectAll("*").remove();

      const defs = svg.append("defs");

      defs
        .append("filter")
        .attr("id", "btn-blur")
        .append("feGaussianBlur")
        .attr("stdDeviation", 3);

      defs
        .append("clipPath")
        .attr("id", "btn-clip")
        .append("circle")
        .attr("cx", anchorX)
        .attr("cy", height / 2)
        .attr("r", 17);

      const visibleNodes = nodes.slice(1);

      svg
        .selectAll("circle.node")
        .data(visibleNodes)
        .join("circle")
        .attr("class", "node")
        .attr("r", (d) => d.radius)
        .attr("fill", (d) => getColor(d.type[0]));

      svg
        .append("g")
        .attr("clip-path", "url(#btn-clip)")
        .attr("filter", "url(#btn-blur)")
        .selectAll("circle.node-blur")
        .data(visibleNodes)
        .join("circle")
        .attr("class", "node-blur")
        .attr("r", (d) => d.radius)
        .attr("fill", (d) => getColor(d.type[0]));

      const isDark = () => document.documentElement.dataset.theme === "dark";
      const themeIcon = () => (isDark() ? "☀️" : "🌘");

      const btn = svg
        .append("g")
        .attr("transform", `translate(${anchorX}, ${height / 2})`)
        .attr("cursor", "pointer")
        .attr("class", "center-btn")
        .attr("role", "button")
        .attr("tabindex", "0")
        .attr(
          "aria-label",
          isDark() ? "Switch to light mode" : "Switch to dark mode",
        );

      function toggleTheme() {
        document.documentElement.dataset.theme = isDark() ? "light" : "dark";
        btn.select("text").text(themeIcon());
        btn.attr(
          "aria-label",
          isDark() ? "Switch to light mode" : "Switch to dark mode",
        );
      }

      btn.on("click", toggleTheme).on("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleTheme();
        }
      });

      btn
        .append("circle")
        .attr("r", 18)
        .attr("fill", "transparent")
        .attr("stroke", "var(--site-text)")
        .attr("stroke-width", 1.5);

      btn
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", "16px")
        .attr("pointer-events", "none")
        .text(themeIcon());

      simulation = d3
        .forceSimulation(nodes)
        .force(
          "charge",
          d3.forceManyBody().strength((_, i) => (i ? 0 : -250)),
        )
        .force("x", d3.forceX(anchorX).strength(0.09))
        .force("y", d3.forceY(height / 2).strength(0.09))
        .force(
          "collision",
          d3.forceCollide().radius((d) => d.radius),
        )
        .on("tick", () => {
          svg
            .selectAll("circle.node, circle.node-blur")
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
          root.fx = anchorX;
          root.fy = height / 2;
          simulation.alpha(0.3).restart();
        });
    })();

    return () => simulation?.stop();
  }, []);

  return (
    <header className="site-header">
      <div className="viz">
        <svg ref={svgRef} />
      </div>

      <nav role="navigation">
        <ul>
          {NAV_LINKS.map(({ href, label, key }) => (
            <li key={key} className={activeLink === key ? "active" : ""}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
          {activeLink === "blog" && (
            <li className="active">
              <Link href="/blog">Blog</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
