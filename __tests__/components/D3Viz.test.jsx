import { vi, describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import D3Viz from "../../components/D3Viz";

// Chainable proxy: every method call returns the same proxy so d3 selection
// chains like .attr(...).style(...).on(...) work without throwing.
const makeChainable = () => {
  const proxy = new Proxy(
    {},
    {
      get: (_, prop) => {
        if (prop === "then") return undefined; // prevent Promise confusion
        return () => proxy;
      },
    }
  );
  return proxy;
};

const mockSimulation = {
  force: vi.fn().mockReturnThis(),
  on: vi.fn().mockReturnThis(),
  alpha: vi.fn().mockReturnThis(),
  restart: vi.fn(),
  stop: vi.fn(),
};

vi.mock("d3", () => ({
  select: () => makeChainable(),
  forceSimulation: () => mockSimulation,
  forceManyBody: () => makeChainable(),
  forceX: () => makeChainable(),
  forceY: () => makeChainable(),
  forceCollide: () => makeChainable(),
  pointer: () => [0, 0],
}));

describe("D3Viz", () => {
  it("renders an svg element", () => {
    const { container } = render(<D3Viz />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
