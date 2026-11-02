import { useEffect, useRef } from "react";

// Builds a repeating sine ribbon. Two periods are drawn so a -50% translate loops seamlessly.
function ribbon(w, h, amp, periods, phase) {
  const pts = [];
  const steps = periods * 2 * 40;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    const t = (i / steps) * Math.PI * 2 * periods * 2;
    const y = h / 2 + Math.sin(t + phase) * amp + Math.sin(t * 2 + phase * 1.7) * amp * 0.3;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}

const LAYERS = [
  { amp: 26, periods: 2, phase: 0, dur: 38, cls: "w-a" },
  { amp: 20, periods: 3, phase: 1.3, dur: 29, cls: "w-b" },
  { amp: 30, periods: 1, phase: 2.6, dur: 47, cls: "w-c" },
  { amp: 14, periods: 4, phase: 4.1, dur: 23, cls: "w-lime" },
];

// Four stacked ribbons. `side` shifts the phase so the strip above and below the name differ.
export default function Waves({ side = "top", className = "" }) {
  const ref = useRef(null);

  // Pause when off-screen so the compositor does no work while the hero isn't visible.
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-paused", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const off = side === "top" ? 0 : 1.9;
  return (
    <div ref={ref} className={"waves " + className} aria-hidden="true">
      {LAYERS.map((l, i) => (
        <svg
          key={i}
          className={"wave " + l.cls}
          style={{ animationDuration: `${l.dur}s`, animationDirection: (i + (side === "top" ? 0 : 1)) % 2 ? "reverse" : "normal" }}
          viewBox="0 0 2400 100"
          preserveAspectRatio="none"
        >
          <path d={ribbon(2400, 100, l.amp, l.periods, l.phase + off)} />
        </svg>
      ))}
    </div>
  );
}
