import { PROFILE } from "../data/content";
import KnowledgeTree from "./KnowledgeTree";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about">
        <div className="about__left">
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
        </div>
        <KnowledgeTree />
      </div>
    </section>
  );
}
