import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import Router from "next/router";
import useViewTransitions from "../../components/useViewTransitions";

vi.mock("next/router", () => ({ default: { router: null } }));

// Stand-in for Next's internal router. change() is a prototype method, like
// the real one, so the hook's `delete router.change` cleanup is exercised too.
class FakeRouter {
  constructor(impl) {
    this.calls = [];
    this.impl = impl;
  }
  change(...args) {
    this.calls.push(args);
    return this.impl();
  }
}

// Resolves only when the test says the new page has committed, mirroring how
// the real change() settles after React commits.
const deferred = () => {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  return { promise, resolve };
};

let startViewTransition;
let reduceMotion;

const makeRouter = (impl) => {
  Router.router = new FakeRouter(impl);
  return Router.router;
};

beforeEach(() => {
  reduceMotion = false;
  Router.router = null;

  window.matchMedia = (query) => ({
    matches: query.includes("reduce") && reduceMotion,
    addEventListener() {},
    removeEventListener() {},
  });

  // Stub of the real API: capture, run the callback, cross-fade when it settles.
  startViewTransition = vi.fn((callback) => {
    const updateCallbackDone = Promise.resolve().then(callback);
    return {
      updateCallbackDone,
      finished: updateCallbackDone.then(
        () => {},
        () => {},
      ),
    };
  });
  document.startViewTransition = startViewTransition;
});

afterEach(() => {
  delete document.startViewTransition;
});

describe("useViewTransitions", () => {
  it("runs the route change inside a view transition", async () => {
    const commit = deferred();
    const router = makeRouter(() => commit.promise);
    renderHook(() => useViewTransitions());

    const navigation = router.change("pushState", "/projects", "/projects", {});
    await Promise.resolve();

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    // Arguments must reach the real change() untouched.
    expect(router.calls).toEqual([["pushState", "/projects", "/projects", {}]]);

    commit.resolve(true);
    await expect(navigation).resolves.toBe(true);
  });

  it("does not start a nested transition for a redirect", async () => {
    const commit = deferred();
    const router = makeRouter(() => commit.promise);
    renderHook(() => useViewTransitions());

    const outer = router.change("pushState", "/a", "/a", {});
    await Promise.resolve();
    router.change("replaceState", "/b", "/b", {});

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(router.calls).toHaveLength(2);

    commit.resolve(true);
    await outer;
  });

  it("navigates plainly when the user prefers reduced motion", async () => {
    reduceMotion = true;
    const router = makeRouter(() => Promise.resolve(true));
    renderHook(() => useViewTransitions());

    await expect(router.change("pushState", "/blog", "/blog", {})).resolves.toBe(
      true,
    );
    expect(startViewTransition).not.toHaveBeenCalled();
  });

  it("surfaces a failed route change to the caller", async () => {
    const cancelled = Object.assign(new Error("cancelled"), {
      cancelled: true,
    });
    const router = makeRouter(() => Promise.reject(cancelled));
    renderHook(() => useViewTransitions());

    await expect(
      router.change("pushState", "/nope", "/nope", {}),
    ).rejects.toThrow("cancelled");
  });

  it("restores the original change() on unmount", () => {
    const router = makeRouter(() => Promise.resolve(true));
    const { unmount } = renderHook(() => useViewTransitions());

    expect(Object.hasOwn(router, "change")).toBe(true);
    unmount();
    expect(Object.hasOwn(router, "change")).toBe(false);
  });

  // The hook wraps a Next internal. If an upgrade renames it the transition
  // would silently stop happening, so pin the assumption here.
  it("wraps a method Next's real router still has", async () => {
    const { default: NextRouter } = await vi.importActual(
      "next/dist/shared/lib/router/router",
    );
    expect(typeof NextRouter.prototype.change).toBe("function");
  });

  it("leaves the router alone where view transitions are unsupported", () => {
    delete document.startViewTransition;
    const router = makeRouter(() => Promise.resolve(true));
    renderHook(() => useViewTransitions());

    expect(Object.hasOwn(router, "change")).toBe(false);
  });
});
