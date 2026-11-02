import { useEffect, useRef } from "react";

const SECTIONS = ["top", "about", "experience", "projects", "skills", "recognition", "contact"];
const GROUND = 111 / 114; // paws touch the ground at this fraction of the sprite height
const EASE_OUT = "cubic-bezier(0.25, 0.6, 0.3, 1)";

// One rig, one drawing, always the same plump cat. Sitting is the drawn pose; standing lifts the whole upper body
// (head, torso, haunches, tail) 14 units while the four legs unfold underneath it, so the leg length never changes,
// only how much of it shows. Walking only moves limbs, bobs the body and leans it into the direction of travel.
function Leg({ cls, x }) {
  return (
    <g className={`leg ${cls}`} style={{ "--lx": `${x}px` }}>
      <g className="leg-fx">
        <path className="seg" d={`M${x} 78 L${x} 97`} />
        <ellipse className="paw" cx={x} cy="100.4" rx="8.6" ry="4.8" />
      </g>
    </g>
  );
}

function CatSvg() {
  return (
    <svg className="cat__svg" viewBox="0 -6 120 114" focusable="false">
      <g className="k-sway">
        <Leg cls="hl" x={38} />
        <Leg cls="hr" x={82} />

        <g className="k-up">
          <g className="k-wad">
            <g className="k-bob">
              <g className="tail-fx">
                <g className="tail-a">
                  <path className="seg tail-seg" d="M82 93 C96 96 104 86 101 75" />
                  <g className="tail-b">
                    <path className="seg tail-seg" d="M101 75 C99 70 102 65 107 68" />
                  </g>
                </g>
              </g>

              <ellipse className="c-body" cx="34" cy="90" rx="12.5" ry="11.5" />
              <ellipse className="c-body" cx="86" cy="90" rx="12.5" ry="11.5" />
              <ellipse className="c-body" cx="60" cy="80" rx="29" ry="21.5" />
              <ellipse className="c-belly" cx="60" cy="88" rx="16" ry="12" />

              <g className="k-head">
                <g className="k-head-fx">
                  <g className="k-ear k-ear-l">
                    <path className="c-ear" d="M36 42 L32 15 L56 29 Z" />
                    <path className="c-ear-in" d="M38.5 35 L36 21 L49 29 Z" />
                  </g>
                  <g className="k-ear k-ear-r">
                    <path className="c-ear" d="M84 42 L88 15 L64 29 Z" />
                    <path className="c-ear-in" d="M81.5 35 L84 21 L71 29 Z" />
                  </g>
                  <ellipse className="c-body" cx="60" cy="50" rx="29" ry="25" />
                  <ellipse className="c-body" cx="37" cy="58" rx="10.5" ry="9.5" />
                  <ellipse className="c-body" cx="83" cy="58" rx="10.5" ry="9.5" />
                  <g className="k-face">
                    <g className="k-eyes">
                      <ellipse className="c-eye" cx="49" cy="52" rx="5.3" ry="6.5" />
                      <ellipse className="c-eye" cx="71" cy="52" rx="5.3" ry="6.5" />
                      <circle className="c-glint" cx="51" cy="49.4" r="2" />
                      <circle className="c-glint" cx="73" cy="49.4" r="2" />
                      <circle className="c-glint c-glint-s" cx="47.4" cy="55.4" r="0.9" />
                      <circle className="c-glint c-glint-s" cx="69.4" cy="55.4" r="0.9" />
                    </g>
                    <path className="c-nose" d="M57.2 59.4 Q60 58.2 62.8 59.4 Q62.4 61.4 60 62.6 Q57.6 61.4 57.2 59.4 Z" />
                    <path className="c-mouth" d="M60 62.6 V64.6 M60 64.6 Q57.4 67.6 54.4 65.4 M60 64.6 Q62.6 67.6 65.6 65.4" />
                    <path className="c-whisk" d="M41 60 L22 56 M41 63 L21 63.5 M42 66 L24 71 M79 60 L98 56 M79 63 L99 63.5 M78 66 L96 71" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        <Leg cls="fl" x={49} />
        <Leg cls="fr" x={71} />
      </g>
    </svg>
  );
}

// Persistent companion. One component, one SVG, never remounted. A small state machine owns every change:
//   hero-sitting / sitting / grooming / standing / walking-down / walking-up /
//   fallback-transition / fallback-sitting / arriving
// It sits beside the hero name, stands and walks to each section's heading as it becomes active (entering from
// above when scrolling down, from below when scrolling up), and keeps walking alongside the page through areas
// with no heading. After a 1s pause there it walks to the bottom-right corner and waits. Only one sequence runs
// at a time (`seq` invalidates stale ones).
export default function Cat() {
  const cat = useRef(null);

  useEffect(() => {
    const el = cat.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 699px)");
    let active = "top";
    let prev = "top";
    let lock = null; // section id a nav click is heading to
    let seq = 0;
    let busy = false;
    let perched = false; // resting in the corner
    let trailing = false; // walking alongside the page while no heading is in view
    let trailX = 0;
    let trailVp = 0;
    let wantRecheck = false;
    let visible = true;
    let disposed = false;
    let raf = 0;
    let pinRaf = 0;
    let lockTimer = 0;
    let trailTimer = 0;
    const timers = new Set();

    const set = (k, v) => {
      el.dataset[k] = v;
    };
    const sleep = (ms) =>
      new Promise((res) => {
        const t = setTimeout(() => {
          timers.delete(t);
          res();
        }, ms);
        timers.add(t);
      });
    const stopAll = () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };

    const navH = () => document.querySelector(".nav")?.offsetHeight ?? 64;
    const here = () => {
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return { x: m.m41, y: m.m42 };
    };
    const setPos = (p, ms = 0, ease = "linear") => {
      el.style.transition = ms ? `transform ${ms}ms ${ease}` : "none";
      el.style.transform = `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0)`;
    };
    const inView = (p) =>
      p.y + el.offsetHeight > scrollY && p.y < scrollY + innerHeight && p.x > -el.offsetWidth && p.x < innerWidth;
    // bottom-right corner of the viewport (document coordinates, re-pinned on scroll)
    const cornerPos = () => ({
      x: document.documentElement.clientWidth - el.offsetWidth - (mobile.matches ? 8 : 16),
      y: scrollY + innerHeight - (mobile.matches ? 10 : 16) - el.offsetHeight * GROUND,
    });

    // ── where the cat should sit for a section ──
    const target = (id) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const vw = document.documentElement.clientWidth;
      const clampX = (x) => Math.max(4, Math.min(x, vw - w - 4));
      const fromGround = (ground) => ground - h * GROUND;
      const docPos = (r, dy = 0) => ({ left: r.left + scrollX, right: r.right + scrollX, top: r.top + scrollY - dy, bottom: r.bottom + scrollY - dy });
      const restingShift = (node) => {
        const t = getComputedStyle(node).transform;
        return !t || t === "none" ? 0 : new DOMMatrixReadOnly(t).m42;
      };

      if (id === "top") {
        // beside the name when there is room, otherwise on the right end of the wave strip under it
        const name = document.querySelector(".hero__name");
        if (name) {
          const range = document.createRange();
          range.selectNodeContents(name);
          // the name is two stacked lines: sit after the last one ("Gupta"), below the first name
          const lines = [...range.getClientRects()].filter((q) => q.width > 1);
          const r = lines[lines.length - 1] || range.getBoundingClientRect();
          const font = parseFloat(getComputedStyle(name).fontSize);
          // a cat taller than the last line must not sit under the longer first line
          const prevRight = Math.max(0, ...lines.slice(0, -1).map((q) => q.right));
          let x = r.right + 20;
          if (h * GROUND + font * 0.16 > r.height * 0.95 && prevRight > x - 4) x = prevRight + 20;
          if (x + w + 8 <= vw) return { x: x + scrollX, y: fromGround(r.bottom + scrollY - font * 0.16) };
        }
        const perch = document.querySelector("[data-cat-perch]");
        if (!perch) return null;
        const r = docPos(perch.getBoundingClientRect());
        return { x: clampX(r.right - w), y: fromGround(r.bottom) };
      }
      const section = document.getElementById(id);
      const head = section?.querySelector(".section__head");
      const h2 = head?.querySelector("h2");
      if (!head || !h2) return null;
      const dy = restingShift(head);

      const range = document.createRange();
      range.selectNodeContents(h2);
      const rects = [...range.getClientRects()].filter((r) => r.width > 1);
      if (rects.length) {
        const last = rects[rects.length - 1];
        const font = parseFloat(getComputedStyle(h2).fontSize);
        const prevRight = Math.max(0, ...rects.filter((r) => r.bottom < last.top + 2).map((r) => r.right));
        let x = last.right + 16;
        const need = h * GROUND + font * 0.2;
        if (need > last.height * 0.95 && prevRight > x - 4) x = prevRight + 16;
        if (x + w + 8 <= vw) return { x, y: fromGround(last.bottom + scrollY - dy - font * 0.2) };
      }
      const eyebrow = head.querySelector(".eyebrow");
      const hr = docPos(head.getBoundingClientRect(), dy);
      const er = eyebrow ? docPos(eyebrow.getBoundingClientRect(), dy) : hr;
      return { x: clampX(hr.right - w), y: fromGround(er.bottom + 2) };
    };

    // heading position, or "no suitable heading" when it has scrolled up out of view
    const resolve = (id, byNav) => {
      const t = target(id);
      if (!t) return null;
      if (!byNav && t.y + el.offsetHeight * GROUND < scrollY + navH() + 4) return { pos: t, away: true };
      return { pos: t, away: false };
    };

    // ── sitting: stays settled, then after 3s of inactivity washes its face, then settles again ──
    const idle = async (run, state) => {
      set("pose", "sit");
      set("gait", "");
      set("groom", "");
      set("state", state);
      if (reduced.matches) return;
      let n = 0;
      await sleep(3000);
      while (run === seq) {
        if (visible && !document.hidden) {
          set("state", "grooming");
          set("groom", n % 3 === 2 ? "far" : "near"); // now and then the other paw
          await sleep(3800);
          if (run !== seq) return;
          set("groom", "");
          set("state", state);
          n++;
        }
        await sleep(3500 + Math.random() * 3500);
      }
    };

    // ── the walk: stand, walk at full stride, slow down, arrive and sit ──
    const travel = async (to, dir, byNav, fallback) => {
      const run = ++seq;
      stopAll();
      clearTimeout(trailTimer);
      busy = true;
      trailing = false;
      perched = false;
      set("groom", "");

      if (reduced.matches) {
        setPos(to);
        perched = fallback;
        busy = false;
        idle(run, fallback ? "fallback-sitting" : active === "top" ? "hero-sitting" : "sitting");
        return;
      }

      // get up (from wherever it is)
      const cur = here();
      el.style.transition = "none";
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      if (el.dataset.pose !== "stand") {
        set("gait", "");
        set("state", "standing");
        set("pose", "stand");
        await sleep(850);
        if (run !== seq) return;
      }

      // walk from the current spot if both ends are on screen, otherwise enter from off-screen
      const h = el.offsetHeight;
      const vw = document.documentElement.clientWidth;
      let from = here();
      if (!(inView(from) && inView(to))) {
        const sx = Math.min(to.x + (mobile.matches ? 40 : 110), vw - el.offsetWidth - 4);
        const cap = byNav ? 420 : mobile.matches ? 260 : 380;
        const sy =
          dir === "down"
            ? Math.max(to.y - cap, byNav ? -1e9 : scrollY - h - 8)
            : Math.min(to.y + cap, byNav ? 1e9 : scrollY + innerHeight + 8);
        from = { x: Math.max(4, sx), y: sy };
        setPos(from);
      }

      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      const ddx = to.x - from.x;
      set("dir", ddx > 8 ? "r" : ddx < -8 ? "l" : ""); // lean into the direction of travel, never a flip
      const speed = mobile.matches ? 160 : 210; // px per second
      const total = Math.min(4200, Math.max(1100, (dist / speed) * 1000));
      const c1 = 560;
      const c2 = 880;
      const n1 = Math.max(1, Math.round((total * 0.78) / c1));
      const n2 = Math.max(1, Math.round((total * 0.22) / c2));
      const wp = { x: from.x + (to.x - from.x) * 0.82, y: from.y + (to.y - from.y) * 0.82 };

      // full-speed stretch
      set("state", fallback ? "fallback-transition" : dir === "down" ? "walking-down" : "walking-up");
      el.style.setProperty("--cyc", `${c1}ms`);
      el.style.setProperty("--n", n1);
      void el.offsetWidth;
      set("gait", "walk");
      setPos(wp, n1 * c1, "linear");
      await sleep(n1 * c1);
      if (run !== seq) return;

      // slowing down: calmer strides, ease-out travel, the last full stride lands all four paws
      set("state", "arriving");
      set("gait", "");
      void el.offsetWidth;
      el.style.setProperty("--cyc", `${c2}ms`);
      el.style.setProperty("--n", n2);
      set("gait", "slow");
      setPos(to, n2 * c2, EASE_OUT);
      await sleep(n2 * c2);
      if (run !== seq) return;

      set("gait", "");
      set("dir", "");
      set("pose", "sit");
      await sleep(1000);
      if (run !== seq) return;

      perched = fallback;
      const fresh = fallback ? cornerPos() : target(active);
      if (fresh && Math.hypot(fresh.x - to.x, fresh.y - to.y) > 3) setPos(fresh);
      busy = false;
      idle(run, fallback ? "fallback-sitting" : active === "top" ? "hero-sitting" : "sitting");
      if (wantRecheck) recheck();
    };

    const goTo = (id, byNav = false) => {
      const r = resolve(id, byNav);
      if (!r) return;
      const dir = SECTIONS.indexOf(id) >= SECTIONS.indexOf(prev) ? "down" : "up";
      prev = id;
      active = id;
      wantRecheck = false;
      if (r.away) {
        enterTrail(dir);
        return;
      }
      travel(r.pos, dir, byNav, false);
    };

    // No heading in view: keep walking in place beside the page edge while the user scrolls;
    // after a 1s pause, walk to the bottom-right corner and sit there.
    function enterTrail(dir) {
      seq++;
      stopAll();
      busy = false;
      perched = false;
      trailing = true;
      wantRecheck = false;
      const p = here();
      trailX = Math.min(Math.max(4, p.x), document.documentElement.clientWidth - el.offsetWidth - 4);
      trailVp = Math.max(navH() + 8, Math.min(p.y - scrollY, innerHeight - el.offsetHeight - 16));
      set("groom", "");
      set("dir", "");
      set("pose", "stand");
      set("state", dir === "up" ? "walking-up" : "walking-down");
      el.style.setProperty("--cyc", "560ms");
      el.style.setProperty("--n", "infinite");
      void el.offsetWidth;
      set("gait", "walk");
      setPos({ x: trailX, y: scrollY + trailVp }, 300, "ease-out");
      armTrailTimer();
    }
    function armTrailTimer() {
      clearTimeout(trailTimer);
      trailTimer = setTimeout(() => {
        if (!trailing || disposed) return;
        trailing = false;
        travel(cornerPos(), "up", false, true);
      }, 1000);
    }

    // heading scrolled out of view -> trail, then corner; heading back in view -> walk to it
    function recheck() {
      if (disposed || lock !== null) return;
      if (busy) {
        wantRecheck = true;
        return;
      }
      wantRecheck = false;
      const r = resolve(active, false);
      if (!r) return;
      if (r.away) {
        if (!perched && !trailing) enterTrail("down");
      } else if (perched || trailing) {
        goTo(active);
      }
    }

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (busy || trailing) return;
        const t = perched ? cornerPos() : target(active);
        if (t) setPos(t);
      });
    };

    const sectionAtLine = () => {
      const line = innerHeight * 0.45;
      for (const id of SECTIONS) {
        const s = document.getElementById(id);
        if (!s) continue;
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) return id;
      }
      return active;
    };

    const release = () => {
      if (lock === null) return;
      lock = null;
      const id = sectionAtLine();
      if (id !== active) goTo(id);
      else recheck();
    };

    // manual scrolling: a thin band at ~45% of the viewport decides the active section
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && lock === null && e.target.id !== active) goTo(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -54% 0px" }
    );
    // the active heading leaving / entering the viewport (below the nav) decides trail vs. heading
    const headIo = new IntersectionObserver(() => recheck(), { rootMargin: `-${navH()}px 0px 0px 0px` });
    SECTIONS.forEach((id) => {
      const s = document.getElementById(id);
      if (!s) return;
      io.observe(s);
      const node = id === "top" ? s.querySelector(".hero__name") : s.querySelector(".section__head h2");
      if (node) headIo.observe(node);
    });

    // nav clicks: head straight for the destination and ignore sections scrolled past on the way
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!SECTIONS.includes(id)) return;
      lock = id;
      trailing = false;
      clearTimeout(trailTimer);
      if (id !== active || perched) goTo(id, true);
      clearTimeout(lockTimer);
      lockTimer = setTimeout(release, 1800);
    };
    const onScroll = () => {
      if (trailing) {
        cancelAnimationFrame(pinRaf);
        pinRaf = requestAnimationFrame(() => setPos({ x: trailX, y: scrollY + trailVp }));
        armTrailTimer();
      } else if (perched && !busy) {
        cancelAnimationFrame(pinRaf);
        pinRaf = requestAnimationFrame(() => setPos(cornerPos()));
      }
      if (lock === null) return;
      clearTimeout(lockTimer);
      lockTimer = setTimeout(release, 160);
    };
    document.addEventListener("click", onClick, true);
    addEventListener("scrollend", release);
    addEventListener("scroll", onScroll, { passive: true });

    // pause decorative motion while off-screen or in a background tab
    const vis = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      el.classList.toggle("is-away", !visible);
    });
    vis.observe(el);
    const onHidden = () => el.classList.toggle("is-away", document.hidden || !visible);
    document.addEventListener("visibilitychange", onHidden);

    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    addEventListener("resize", schedule);

    document.fonts.ready.then(() => {
      if (disposed) return;
      active = prev = sectionAtLine();
      const r = resolve(active, false);
      if (!r) return;
      setPos(r.away ? cornerPos() : r.pos);
      perched = r.away;
      set("pose", "sit");
      requestAnimationFrame(() => el.classList.add("is-ready"));
      idle(++seq, perched ? "fallback-sitting" : active === "top" ? "hero-sitting" : "sitting");
    });

    return () => {
      disposed = true;
      seq++;
      stopAll();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pinRaf);
      clearTimeout(lockTimer);
      clearTimeout(trailTimer);
      io.disconnect();
      headIo.disconnect();
      vis.disconnect();
      ro.disconnect();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onHidden);
      removeEventListener("scrollend", release);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="cat-layer" aria-hidden="true">
      <div className="cat" ref={cat} data-pose="sit" data-state="hero-sitting" data-gait="" data-dir="" data-groom="">
        <CatSvg />
      </div>
    </div>
  );
}
