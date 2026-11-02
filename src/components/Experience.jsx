import { useState } from "react";
import { EXPERIENCE, CERTIFICATES } from "../data/content";
import { DOMAIN_LABEL, asset } from "../lib";
import Lightbox from "./Lightbox";

function Row({ item, index, onView }) {
  const [open, setOpen] = useState(index === 0);
  const id = `exp-${index}`;
  const cert = item.certificate ? CERTIFICATES.find((c) => c.ref === item.certificate) : null;
  return (
    <li className="xp" data-reveal>
      <button type="button" className="xp__head" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="xp__period mono">{item.period}</span>
        <span className="xp__title">
          <strong>{item.role}</strong>
          <span>{item.org}</span>
        </span>
        <span className="xp__domain mono">{DOMAIN_LABEL[item.domain]}</span>
        <span className="plus" aria-hidden="true" />
      </button>
      <div id={id} className={"collapse" + (open ? " is-open" : "")}>
        <div className="collapse__inner">
          <p className="xp__summary">{item.summary}</p>
          <ul className="bullets">
            {item.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <ul className="chips">
            {item.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {cert && (
            <figure className="xp-cert">
              <button
                type="button"
                className="cert"
                tabIndex={open ? 0 : -1}
                aria-label={`Enlarge: certificate for ${item.role}, ${cert.issuer}`}
                onClick={() =>
                  onView({
                    src: cert.src,
                    alt: `Certificate: ${cert.title}, ${cert.issuer}`,
                    caption: `${cert.title} · ${cert.issuer}`,
                    pdf: cert.pdf,
                  })
                }
              >
                <img src={asset(cert.src)} alt="" width={cert.w} height={cert.h} loading="lazy" decoding="async" />
              </button>
              <figcaption className="xp-cert__cap">
                <strong>{cert.title}</strong>
                <span className="mono">{cert.issuer}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  const [viewing, setViewing] = useState(null);
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="eyebrow">02 — Experience</p>
          <h2>
            Internships &amp; <em>research.</em>
          </h2>
        </header>
        <ol className="xp-list">
          {EXPERIENCE.map((e, i) => (
            <Row key={e.role + e.org} item={e} index={i} onView={setViewing} />
          ))}
        </ol>
      </div>
      {viewing && <Lightbox item={viewing} onClose={() => setViewing(null)} />}
    </section>
  );
}
