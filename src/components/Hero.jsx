import { useEffect, useState, useRef } from "react";
import { ArrowDown, Sparkles, Terminal, Code2, ShieldAlert } from "lucide-react";
import LiveSignal from "./LiveSignal";
import SubtleWaves from "./SubtleWaves";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PROFILE } from "../data/content";
import { useMousePosition } from "../hooks/useMousePosition";

export default function Hero({ audioSynth, onOpenTerminal }) {
  const mouse = useMousePosition();
  const [scrollY, setScrollY] = useState(0);
  const [typedLetters, setTypedLetters] = useState(0);

  // Magnetic button position offsets
  const [btn1Pos, setBtn1Pos] = useState({ x: 0, y: 0 });
  const [btn2Pos, setBtn2Pos] = useState({ x: 0, y: 0 });
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Letter-by-letter name reveal timer
  const nameChars = PROFILE.name.split("");
  useEffect(() => {
    const timer = setInterval(() => {
      setTypedLetters((prev) => {
        if (prev < nameChars.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 70);
    return () => clearInterval(timer);
  }, [nameChars.length]);

  // Magnetic CTA attraction calculation
  const handleMagneticMove = (e, ref, setPos) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.35;
    const dy = (e.clientY - centerY) * 0.35;
    setPos({ x: dx, y: dy });
  };

  const handleMagneticLeave = (setPos) => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-line min-h-[92vh] flex flex-col justify-center bg-base pt-20"
    >
      {/* Background depth grid with mouse shift */}
      <div
        className="absolute inset-0 bg-grid opacity-30 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouse.normalizedX * 12}px, ${mouse.normalizedY * 12 + scrollY * 0.1}px, 0)`,
        }}
      />

      {/* Multi-spectral ambient glowing waves background */}
      <SubtleWaves color="#5EEAD4" opacity={0.06} speed={0.004} />

      {/* Hero Wave Canvas Container */}
      <div
        className="absolute top-0 inset-x-0 h-56 sm:h-72 pointer-events-none opacity-90"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: Math.max(0, 1 - scrollY / 300),
        }}
      >
        <LiveSignal />
      </div>

      {/* Interactive 3D Depth Main Hero Container */}
      <div
        className="max-w-6xl mx-auto px-6 pb-16 pt-20 relative z-10 w-full transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouse.normalizedX * -8}px, ${mouse.normalizedY * -8 + scrollY * 0.05}px, 0)`,
        }}
      >
        {/* Signal Tagline */}
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan mb-6 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 shadow-[0_0_15px_rgba(94,234,212,0.25)]">
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
          <span>Signal // 01 · {PROFILE.affiliation}</span>
        </div>

        {/* Letter-by-Letter Name Reveal */}
        <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-ink max-w-5xl">
          {nameChars.map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-300 ${
                i < typedLetters
                  ? "opacity-100 translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-ink via-ink to-cyan"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Dynamic Tagline */}
        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed font-body">
          {PROFILE.tagline}
        </p>

        {/* Focus Badges */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {PROFILE.focus.map((f) => (
            <span
              key={f}
              onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
              className="font-mono text-xs uppercase tracking-wider text-ink/90 border border-line/80 rounded-full px-3.5 py-1.5 bg-panel/40 hover:border-cyan/60 hover:text-cyan hover:bg-cyan/10 transition-all duration-200 shadow-sm cursor-default select-none"
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA Buttons with Magnetic Attraction */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            ref={btn1Ref}
            href="#projects"
            onMouseMove={(e) => handleMagneticMove(e, btn1Ref, setBtn1Pos)}
            onMouseLeave={() => handleMagneticLeave(setBtn1Pos)}
            onClick={() => audioSynth?.playClick && audioSynth.playClick()}
            style={{
              transform: `translate3d(${btn1Pos.x}px, ${btn1Pos.y}px, 0)`,
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-cyan text-base font-semibold text-sm font-mono tracking-wider shadow-[0_0_24px_rgba(94,234,212,0.4)] hover:shadow-[0_0_36px_rgba(94,234,212,0.7)] hover:brightness-110 active:scale-95 transition-all duration-150"
          >
            Explore Projects
            <ArrowDown size={16} />
          </a>

          <a
            ref={btn2Ref}
            href="#contact"
            onMouseMove={(e) => handleMagneticMove(e, btn2Ref, setBtn2Pos)}
            onMouseLeave={() => handleMagneticLeave(setBtn2Pos)}
            onClick={() => audioSynth?.playClick && audioSynth.playClick()}
            style={{
              transform: `translate3d(${btn2Pos.x}px, ${btn2Pos.y}px, 0)`,
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-line hover:border-cyan/60 text-ink font-mono text-sm uppercase tracking-wider bg-panel/50 hover:bg-cyan/10 hover:text-cyan active:scale-95 transition-all duration-150 shadow-sm"
          >
            Get in touch
          </a>

          <button
            onClick={() => {
              if (audioSynth?.playClick) audioSynth.playClick();
              onOpenTerminal();
            }}
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full border border-line hover:border-violet/60 text-violet text-xs font-mono uppercase tracking-wider bg-panel/30 hover:bg-violet/10 transition-all"
            title="Open CLI Terminal"
          >
            <Terminal className="h-4 w-4" />
            <span className="hidden sm:inline">Launch Shell</span>
          </button>

          {/* Social icons */}
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
              className="w-10 h-10 grid place-items-center rounded-full border border-line text-muted hover:text-cyan hover:border-cyan/60 hover:bg-panel2 transition-all active:scale-90 shadow-sm"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
              className="w-10 h-10 grid place-items-center rounded-full border border-line text-muted hover:text-cyan hover:border-cyan/60 hover:bg-panel2 transition-all active:scale-90 shadow-sm"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Hint Pulsing Indicator (fades out as user scrolls) */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - scrollY / 60) }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/70">Scroll to Explore</span>
        <div className="p-2 rounded-full border border-cyan/40 text-cyan animate-bounce shadow-[0_0_12px_rgba(94,234,212,0.3)]">
          <ArrowDown className="h-3.5 w-3.5" />
        </div>
      </div>
    </section>
  );
}
