import { PROFILE } from "../data/content";
import { asset } from "../lib";
import { ArrowDown } from "./Icons";
import Waves from "./Waves";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap">
        <div className="hero__stage">
          <Waves side="top" className="waves--top" />
          <div className="hero__row">
            <div className="hero__photo">
              <div className="hero__photo-clip">
                <img
                  src={asset("images/profile.webp")}
                  alt="Portrait of Swananda Gupta"
                  width="840"
                  height="1008"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <i className="hero__photo-dot" aria-hidden="true" />
            </div>
            <h1 className="hero__name" aria-label="Swananda Gupta">
              <span>Swananda</span>
              <span>Gupta</span>
            </h1>
          </div>
          <Waves side="bottom" className="waves--bottom" />
          <span className="hero__perch" data-cat-perch aria-hidden="true" />
        </div>
        <div className="hero__intro">
          <p>{PROFILE.positioning}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              See selected work <ArrowDown />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
