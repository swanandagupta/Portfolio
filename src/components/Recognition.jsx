import { useState } from "react";
import { ACHIEVEMENTS } from "../data/content";
import { asset } from "../lib";
import Lightbox from "./Lightbox";

export default function Recognition() {
  const [viewing, setViewing] = useState(null);

  return (
    <section id="recognition" className="section">
      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="eyebrow">05 — Recognition</p>
          <h2>
            Competitions, papers &amp; <em>community.</em>
          </h2>
        </header>

        <ul className="rec-list">
          {ACHIEVEMENTS.map((a) => (
            <li className="rec" key={a.title} data-reveal>
              <div className="rec__text">
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
              <div className="rec__imgs" data-n={a.images.length}>
                {a.images.map((img, i) => {
                  const alt = `${a.title}, photo ${i + 1} of ${a.images.length}`;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      className="shot"
                      style={{ "--r": (img.w / img.h).toFixed(3) }}
                      aria-label={`Enlarge: ${alt}`}
                      onClick={() => setViewing({ src: img.src, alt, caption: a.title })}
                    >
                      <img src={asset(img.src)} alt="" width={img.w} height={img.h} loading="lazy" decoding="async" />
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

      </div>
      {viewing && <Lightbox item={viewing} onClose={() => setViewing(null)} />}
    </section>
  );
}
