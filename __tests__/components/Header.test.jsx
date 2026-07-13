import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

const mockUseRouter = vi.fn();

vi.mock("next/router", () => ({ useRouter: () => mockUseRouter() }));
vi.mock("next/link", () => ({
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

describe("Header", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ route: "/" });
  });

  it("renders all nav links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("marks Home as active on the root route", () => {
    render(<Header />);
    expect(screen.getByText("Home").closest("li")).toHaveClass("active");
    expect(screen.getByText("Projects").closest("li")).not.toHaveClass("active");
  });

  it("marks Projects as active on /projects", () => {
    mockUseRouter.mockReturnValue({ route: "/projects" });
    render(<Header />);
    expect(screen.getByText("Projects").closest("li")).toHaveClass("active");
    expect(screen.getByText("Home").closest("li")).not.toHaveClass("active");
  });

  it("marks Projects as active on a project detail page", () => {
    mockUseRouter.mockReturnValue({ route: "/projects/[slug]" });
    render(<Header />);
    expect(screen.getByText("Projects").closest("li")).toHaveClass("active");
    expect(screen.getByText("Home").closest("li")).not.toHaveClass("active");
  });

  it("shows a Blog link and marks it active on a blog route", () => {
    mockUseRouter.mockReturnValue({ route: "/blog/some-post" });
    render(<Header />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Blog").closest("li")).toHaveClass("active");
  });

  it("marks Blog active on a blog detail page", () => {
    mockUseRouter.mockReturnValue({ route: "/blog/[slug]" });
    render(<Header />);
    expect(screen.getByText("Blog").closest("li")).toHaveClass("active");
  });

  it("hides the Blog link outside the blog section", () => {
    mockUseRouter.mockReturnValue({ route: "/projects/[slug]" });
    render(<Header />);
    expect(screen.queryByText("Blog")).not.toBeInTheDocument();
  });

  it("does not mark Home active on nested routes", () => {
    for (const route of ["/projects", "/projects/[slug]", "/blog/[slug]"]) {
      mockUseRouter.mockReturnValue({ route });
      const { unmount } = render(<Header />);
      expect(screen.getByText("Home").closest("li")).not.toHaveClass("active");
      unmount();
    }
  });
});
