import { useEffect } from "react";

// Adds `.is-in` to every `[data-reveal]` element as it enters the viewport.
// The `reveal-ready` class is only set once JS runs, so content is never hidden without it.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
