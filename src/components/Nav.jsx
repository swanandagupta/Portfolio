import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <a className="nav__mark" href="#top" aria-label="Swananda Gupta, back to top" onClick={() => setOpen(false)}>
        S<span>.</span>G
      </a>
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nav__toggle-label">{open ? "Close" : "Menu"}</span>
        <span className="nav__toggle-bars" aria-hidden="true" />
      </button>
      <nav id="site-menu" className={"nav__menu" + (open ? " is-open" : "")} aria-label="Primary">
        <ul>
          {NAV_LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? "is-active" : ""}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="nav__num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
