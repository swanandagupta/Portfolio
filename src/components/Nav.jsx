import { useState } from "react";
import { Menu, X, Volume2, VolumeX, Terminal, Sparkles } from "lucide-react";
import { NAV_LINKS } from "../data/content";

export default function Nav({ activeSection, audioSynth, onOpenTerminal }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e, href) => {
    if (audioSynth?.playClick) audioSynth.playClick();
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-3 inset-x-0 z-40 px-4 transition-all duration-300">
      <nav className="max-w-5xl mx-auto h-14 rounded-full bg-panel/75 backdrop-blur-md border border-line/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-2 font-display font-bold text-ink tracking-tight hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-cyan/15 border border-cyan/40 grid place-items-center text-cyan font-mono text-xs shadow-[0_0_12px_rgba(94,234,212,0.3)]">
            SG
          </div>
          <span className="hidden sm:inline text-sm font-semibold tracking-wide">
            Swananda<span className="text-cyan">.gupta</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted bg-panel2/60 p-1 rounded-full border border-line/50">
          {NAV_LINKS.map((link) => {
            const linkId = link.href.replace("#", "");
            const isActive = activeSection === linkId;

            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                  className={`px-3 py-1.5 rounded-full block transition-colors duration-200 ${
                    isActive ? "text-ink font-semibold" : "hover:text-cyan"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-cyan/20 border border-cyan/40 shadow-[0_0_12px_rgba(94,234,212,0.3)] -z-10 animate-fade-in" />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Actions (Audio + Terminal + Contact) */}
        <div className="flex items-center gap-2">
          {/* Audio Synth Ambient Toggle */}
          <button
            onClick={() => audioSynth?.toggleMute()}
            className={`p-2 rounded-full border transition-all duration-200 ${
              !audioSynth?.isMuted
                ? "bg-cyan/20 border-cyan text-cyan shadow-[0_0_12px_rgba(94,234,212,0.4)]"
                : "bg-panel2 border-line text-muted hover:text-ink"
            }`}
            title={audioSynth?.isMuted ? "Enable Ambient Audio & FX" : "Mute Audio"}
            aria-label="Toggle Ambient Audio"
          >
            {!audioSynth?.isMuted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Terminal CLI Trigger */}
          <button
            onClick={() => {
              if (audioSynth?.playClick) audioSynth.playClick();
              onOpenTerminal();
            }}
            className="px-3 py-1.5 rounded-full bg-panel2 border border-line hover:border-cyan/50 text-cyan text-[11px] font-mono flex items-center gap-1.5 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(94,234,212,0.2)]"
            title="Open Developer Terminal CLI (Ctrl+K / 'hello')"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hidden lg:inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-cyan text-[#080C16] font-bold text-xs font-mono tracking-wider hover:bg-cyan/90 transition-all shadow-[0_0_16px_rgba(94,234,212,0.4)]"
          >
            Contact
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full text-ink hover:bg-panel2"
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto rounded-2xl bg-panel/95 backdrop-blur-xl border border-line p-5 shadow-2xl animate-fade-in">
          <ul className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block py-2 px-3 rounded-lg hover:bg-panel2 hover:text-cyan transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
