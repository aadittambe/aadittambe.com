import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/Site developed by Aadit Tambe/)).toBeInTheDocument();
  });

  it("renders the source code link", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Source code" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/aadittambe/aadittambe.com");
  });

  describe("with NEXT_PUBLIC_MODIFIED_DATE set", () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_MODIFIED_DATE = "1/15/2025";
    });

    afterEach(() => {
      delete process.env.NEXT_PUBLIC_MODIFIED_DATE;
    });

    it("shows a last updated date", () => {
      render(<Footer />);
      expect(screen.getByText(/Last updated/)).toBeInTheDocument();
    });
  });

  describe("without NEXT_PUBLIC_MODIFIED_DATE", () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_MODIFIED_DATE;
    });

    it("does not show a last updated date", () => {
      render(<Footer />);
      expect(screen.queryByText(/Last updated/)).not.toBeInTheDocument();
    });
  });
});
