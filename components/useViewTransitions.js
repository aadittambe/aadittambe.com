import { useEffect } from "react";
import Router from "next/router";

const useViewTransitions = () => {
  useEffect(() => {
    if (typeof document.startViewTransition !== "function") return;

    const router = Router.router;
    if (typeof router?.change !== "function") return;

    const change = router.change;
    let inFlight = false;

    router.change = function (...args) {
      // Redirects re-enter change() mid-navigation; those and reduced-motion
      // users get a plain, untransitioned route change.
      if (
        inFlight ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return change.apply(this, args);
      }

      inFlight = true;
      let changed;
      const transition = document.startViewTransition(() => {
        // Resolving this promise is what tells the browser the new page is
        // painted and it can capture the incoming snapshot. change() settles
        // after React has committed, which is exactly that moment.
        changed = change.apply(this, args);
        return changed;
      });
      transition.finished
        .catch(() => {}) // a skipped transition isn't a navigation failure
        .finally(() => {
          inFlight = false;
        });

      // Hand callers back change()'s own promise, result and rejection alike.
      return transition.updateCallbackDone.catch(() => {}).then(() => changed);
    };

    return () => {
      delete router.change; // restores the prototype method
    };
  }, []);
};

export default useViewTransitions;
