import { ArrowUp, Terminal, Sparkles } from "lucide-react";

export default function Footer({ onOpenTerminal, audioSynth }) {
  const scrollToTop = () => {
    if (audioSynth?.playClick) audioSynth.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line bg-panel2/60 backdrop-blur-md relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-cyan/15 border border-cyan/40 grid place-items-center text-cyan font-mono text-xs shadow-[0_0_10px_rgba(94,234,212,0.3)]">
            SG
          </div>
          <div>
            <p className="font-mono text-xs text-ink font-semibold">Swananda Gupta</p>
            <p className="font-mono text-[10px] text-muted">Reading Signals — From Brainwaves to Network Traffic</p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-muted">
          <button
            onClick={() => {
              if (audioSynth?.playClick) audioSynth.playClick();
              onOpenTerminal();
            }}
            className="hover:text-cyan transition-colors flex items-center gap-1"
          >
            <Terminal className="h-3.5 w-3.5 text-cyan" />
            <span>Terminal CLI</span>
          </button>

          <span className="text-line">|</span>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-line hover:border-cyan hover:text-cyan hover:bg-cyan/10 transition-all flex items-center gap-1"
            title="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
