import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const data = require("../data/content.json");

const Header = (props) => {
  const router = useRouter();
  const page = router.route.replaceAll("/", "");
  const [activeLink, setActiveLink] = useState(page === "" ? "home" : page);

  useEffect(() => {
    if (activeLink.includes("blog")) {
      setActiveLink("blog");
    }
  }, [activeLink]);

  const svgRef = useRef(null);

  // useEffect(() => {
  //   if (page === "colophon") {
  //     setActiveLink(null);
  //   }
  // }, [page]);

  useEffect(() => {
    let simulation;
    (async () => {
      const d3 = await import("d3");

      const vizEl = document.getElementById("viz");
      const width = vizEl ? vizEl.offsetWidth : 0;
      const height = 150;
      const strength = 0.05;

      const nodes = data.stories.map((d) => ({
        radius:
          width < 300
            ? d.storyType.split(" ").length * 3 + 6
            : d.storyType.split(" ").length * 3 + 8,
        type: d.storyType.split(" "),
      }));

      // Initialize positions to avoid sweeping from the origin.
      nodes.forEach((n) => {
        n.x = Math.random() * width;
        n.y = Math.random() * height;
      });

      const root = nodes[0];
      root.radius = 0;
      // Start root at the center and fix it initially.
      root.fx = width / 2;
      root.fy = height / 2;

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      function getColor(t) {
        if (t === "development") {
          return "#fd7f6f";
        } else if (t === "graphics") {
          return "#7eb0d5";
        } else if (t === "app") {
          return "#b2e061";
        } else if (t === "docs") {
          return "#ffb55a";
        } else if (t === "data") {
          return "#ffee65";
        } else if (t === "reporting") {
          return "#fdcce5";
        } else {
          return "blue";
        }
      }

      function ticked() {
        svg
          .selectAll("circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y);
      }

      simulation = d3
        .forceSimulation(nodes)
        .force(
          "charge",
          d3.forceManyBody().strength((d, i) => (i ? 0 : -250)),
        )
        .force("x", d3.forceX(width / 2).strength(strength))
        .force("y", d3.forceY(height / 2).strength(strength))
        .force(
          "collision",
          d3.forceCollide().radius((d) => d.radius),
        )
        .on("tick", ticked);

      svg
        .selectAll("circle")
        .data(nodes.slice(1))
        .join("circle")
        .attr("r", (d) => d.radius)
        .attr("opacity", 0.7)
        .attr("fill", (d, i) => getColor(d.type[0]));

      svg.on("mousemove", function (event) {
        const p1 = d3.pointer(event, this);
        root.fx = p1[0];
        root.fy = p1[1];
        simulation.alphaTarget(0.3).restart();
      });
    })();

    return () => {
      if (simulation) simulation.stop();
    };
  }, []);

  return (
    <header>
      <div id="viz">
        <svg ref={svgRef}></svg>
      </div>
      <nav role="navigation">
        <ul>
          <li id="nav-home" className={activeLink === "home" ? "active" : ""}>
            <Link href="/" onClick={() => setActiveLink("home")}>
              Home
            </Link>
          </li>
          <li
            id="nav-experience"
            className={activeLink === "projects" ? "active" : ""}
          >
            <Link href="/projects" onClick={() => setActiveLink("projects")}>
              Projects
            </Link>
          </li>
          <li
            id="nav-resume"
            className={activeLink === "resume" ? "active" : ""}
          >
            <Link href="/resume" onClick={() => setActiveLink("resume")}>
              Resume
            </Link>
          </li>
          <li
            id="nav-contact"
            className={activeLink === "contact" ? "active" : ""}
          >
            <Link href="/contact" onClick={() => setActiveLink("contact")}>
              Contact
            </Link>
          </li>
          {activeLink === "blog" && (
            <li
              id="nav-blog"
              className={activeLink.includes("blog") ? "active" : ""}
            >
              <Link href="/blog" onClick={() => setActiveLink("blog")}>
                Blog
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
