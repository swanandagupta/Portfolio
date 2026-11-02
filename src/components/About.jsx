import { PROFILE, RESEARCH_INTERESTS } from "../data/content";
import KnowledgeTree from "./KnowledgeTree";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="eyebrow">01 — About</p>
          <h2>
            One problem, <em>several disciplines.</em>
          </h2>
        </header>
        <div className="about__copy" data-reveal>
          <p>{PROFILE.bio}</p>
          <p>{PROFILE.bio2}</p>
        </div>
        <KnowledgeTree />
        <div className="interests" data-reveal>
          <p className="eyebrow">Research interests</p>
          <ul className="chips">
            {RESEARCH_INTERESTS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
