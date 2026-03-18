import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "../../components/layout";

// next/head renders into document.head, which jsdom supports
describe("Layout", () => {
  it("renders children", () => {
    render(
      <Layout>
        <p>Hello world</p>
      </Layout>
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("wraps children in a <main> element", () => {
    render(
      <Layout>
        <span>content</span>
      </Layout>
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("applies home-wrapper class when home prop is true", () => {
    render(
      <Layout home>
        <span>content</span>
      </Layout>
    );
    expect(screen.getByRole("main")).toHaveClass("home-wrapper");
  });

  it("does not apply home-wrapper class without home prop", () => {
    render(
      <Layout>
        <span>content</span>
      </Layout>
    );
    expect(screen.getByRole("main")).not.toHaveClass("home-wrapper");
  });
});
