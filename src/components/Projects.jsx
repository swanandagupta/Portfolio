import { useState } from "react";
import { PROJECTS } from "../data/content";
import { DOMAIN_LABEL, asset } from "../lib";
import { ArrowUpRight } from "./Icons";
import Lightbox from "./Lightbox";

const FILTERS = [{ id: "all", label: "All" }, ...Object.entries(DOMAIN_LABEL).map(([id, label]) => ({ id, label }))];

function Project({ p, index, open, onToggle, onView }) {
  const [seen, setSeen] = useState(false);
  const id = `proj-${p.id}`;
  const toggle = () => {
    setSeen(true);
    onToggle();
  };
  return (
    <li className="proj" data-reveal>
      <button type="button" className="proj__head" aria-expanded={open} aria-controls={id} onClick={toggle}>
        <span className="proj__num mono">{String(index + 1).padStart(2, "0")}</span>
        <span className="proj__title">
          <strong>{p.title}</strong>
          <span className="mono">{p.category}</span>
        </span>
        <span className="proj__impact">{p.impact}</span>
        <span className="plus" aria-hidden="true" />
      </button>
      <div id={id} className={"collapse" + (open ? " is-open" : "")}>
        <div className="collapse__inner proj__body">
          <div className="proj__main">
            <p className="proj__motivation">{p.motivation}</p>
            <h4 className="eyebrow">What I built</h4>
            <ul className="bullets">
              {p.implementation.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <a className="link-arrow" href={p.github} target="_blank" rel="noreferrer">
              View on GitHub <ArrowUpRight />
            </a>
          </div>
          <aside className="proj__aside">
            <h4 className="eyebrow">Stack</h4>
            <dl className="stack">
              {Object.entries(p.techStack).map(([group, items]) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd>{items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </aside>
          {(seen || open) && (
            <figure className="arch">
              <figcaption className="eyebrow">System architecture</figcaption>
              <button
                type="button"
                className="arch__btn"
                style={{ maxWidth: p.architectureSize[0] }}
                aria-label={`Enlarge: ${p.title} system architecture diagram`}
                onClick={() =>
                  onView({
                    src: p.architectureImage,
                    alt: `${p.title} system architecture diagram`,
                    caption: `${p.title} · System architecture`,
                    diagram: true,
                  })
                }
              >
                <img
                  src={asset(p.architectureImage)}
                  alt={`${p.title} system architecture diagram`}
                  width={p.architectureSize[0]}
                  height={p.architectureSize[1]}
                  decoding="async"
                />
              </button>
            </figure>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const shown = PROJECTS.filter((p) => filter === "all" || p.domain === filter);

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="eyebrow">03 — Selected work</p>
          <h2>
            Systems that <em>sense, decide, act.</em>
          </h2>
        </header>
        <div className="filters" role="group" aria-label="Filter projects by domain" data-reveal>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={"filter" + (filter === f.id ? " is-on" : "")}
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setOpenId(null);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ol className="proj-list">
          {shown.map((p, i) => (
            <Project
              key={p.id}
              p={p}
              index={i}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
              onView={setViewing}
            />
          ))}
        </ol>
      </div>
      {viewing && <Lightbox item={viewing} onClose={() => setViewing(null)} />}
    </section>
  );
}
