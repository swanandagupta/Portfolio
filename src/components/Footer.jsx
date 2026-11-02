import { PROFILE } from "../data/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <p className="mono">{PROFILE.affiliation}</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
