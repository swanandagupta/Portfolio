import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SKILLS } from "../data/content";

// Hanging spheres. Each category hangs from a string; opening one grows it, from its hang point, into a larger
// organic shape with its skills inside. One open at a time. Positions are computed from the container width so
// phones get a two-column hang with no overlap, and the open shape is always clamped inside the container.

const D = 136; // collapsed diameter
const DESKTOP_LENGTHS = [70, 130, 48, 112, 82, 140, 58];
const NARROW_LENGTHS = [44, 84];
const LIME = new Set([1, 4]); // a couple of limelight accents

function computeLayout(W, n) {
  const wide = W >= 900;
  const cols = wide ? n : W >= 560 ? 3 : 2;
  const pad = wide ? 0 : 0;
  const rowH = wide ? 0 : 84 + D + 34;
  const items = SKILLS.map((s, i) => {
    const row = wide ? 0 : Math.floor(i / cols);
    const col = wide ? i : i % cols;
    const L = wide ? DESKTOP_LENGTHS[i % DESKTOP_LENGTHS.length] : NARROW_LENGTHS[(row + col) % 2];
    return { cx: pad + ((W - pad * 2) * (col + 0.5)) / cols, top: row * rowH, L };
  });
  const rows = wide ? 1 : Math.ceil(n / cols);
  const S = Math.min(W - 16, wide ? 380 : 340);
  const base = wide ? 140 + D + 40 : rows * rowH;
  return { items, wide, rows, rowH, S, base };
}

export default function Skills() {
  const hangRef = useRef(null);
  const shapes = useRef({});
  const [W, setW] = useState(0);
  const [open, setOpen] = useState(null);
  const [pinned, setPinned] = useState(false); // opened by click/tap/keyboard: stays open until toggled off

  useLayoutEffect(() => {
    const el = hangRef.current;
    setW(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout = useMemo(() => (W ? computeLayout(W, SKILLS.length) : null), [W]);

  // keep an opened sphere fully on screen on phones
  useEffect(() => {
    if (open === null) return;
    const t = setTimeout(() => shapes.current[open]?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 650);
    return () => clearTimeout(t);
  }, [open]);

  const onKey = (e) => {
    if (e.key === "Escape" && open !== null) {
      const id = open;
      setOpen(null);
      setPinned(false);
      shapes.current[id]?.querySelector("button")?.focus();
    }
  };

  let height = layout?.base ?? 320;
  if (layout && open !== null) {
    const it = layout.items[open];
    height = Math.max(height, it.top + it.L + layout.S + 36);
  }

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="eyebrow">04 — Toolkit</p>
          <h2>
            What I work <em>with.</em>
          </h2>
        </header>
        <div className="hang" ref={hangRef} style={{ height }} onKeyDown={onKey} data-reveal>
          {layout && (
            <>
              {Array.from({ length: layout.rows }, (_, r) => (
                <i key={r} className="hang__rail" style={{ top: r * layout.rowH }} aria-hidden="true" />
              ))}
              {SKILLS.map((g, i) => {
                const it = layout.items[i];
                const isOpen = open === i;
                const S = layout.S;
                const openLeft = Math.max(8, Math.min(it.cx - S / 2, W - S - 8)) - it.cx;
                const size = isOpen ? S : D;
                const listId = `orb-${i}`;
                return (
                  <div
                    key={g.label}
                    className={"orb" + (isOpen ? " is-open" : "") + (LIME.has(i) ? " orb--lime" : "")}
                    style={{ left: it.cx, top: it.top, "--dur": `${7 + (i % 4) * 1.6}s`, "--delay": `${-i * 1.3}s`, "--dir": i % 2 ? 1 : -1 }}
                  >
                    <span className="orb__string" style={{ height: it.L }} aria-hidden="true" />
                    <span className="orb__knot" aria-hidden="true" />
                    <div
                      ref={(el) => (shapes.current[i] = el)}
                      className="orb__shape"
                      style={{ left: isOpen ? openLeft : -D / 2, top: it.L, width: size, height: size }}
                      onPointerEnter={(e) => {
                        if (e.pointerType === "mouse" && !pinned) setOpen(i);
                      }}
                      onPointerLeave={(e) => {
                        if (e.pointerType === "mouse" && !pinned) setOpen((cur) => (cur === i ? null : cur));
                      }}
                    >
                      <span className="orb__glow" aria-hidden="true" />
                      <span className="orb__name">{g.label}</span>
                      <ul className="orb__skills" id={listId} aria-hidden={!isOpen}>
                        {g.items.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        className="orb__btn"
                        aria-expanded={isOpen}
                        aria-controls={listId}
                        aria-label={`${g.label}, ${g.items.length} skills`}
                        onClick={() => {
                          if (isOpen && pinned) {
                            setOpen(null);
                            setPinned(false);
                          } else {
                            setOpen(i);
                            setPinned(true);
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
