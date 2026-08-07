import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { RESEARCH_INTERESTS } from "../data/content";
import { Cpu, Sparkles, Activity, FileText, CheckCircle, BarChart2 } from "lucide-react";

const CONTRIBUTIONS = [
  "Proposed a hybrid Riemannian + quantum learning framework for EEG identity recognition.",
  "Designed an identity-state disentanglement architecture to separate 'who' from 'what state' in brain signals.",
  "Compared classical manifold learning against quantum-enhanced classification across paradigms.",
  "Improved the robustness of EEG biometric authentication under cross-session variation.",
];

function ManifoldGraphic() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf;
    let t = 0;
    const width = 320;
    const height = 220;

    canvas.width = width;
    canvas.height = height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw manifold grid rings
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0 ? "rgba(167, 139, 250, 0.4)" : "rgba(94, 234, 212, 0.3)";
        ctx.lineWidth = 1;

        const rx = 35 + i * 18 + Math.sin(t + i) * 3;
        const ry = 16 + i * 8 + Math.cos(t * 0.8 + i) * 2;

        ctx.ellipse(cx, cy, rx, ry, (i * Math.PI) / 6 + t * 0.1, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw floating quantum biometric nodes
      const nodes = [
        { x: cx + Math.cos(t) * 60, y: cy + Math.sin(t) * 25, color: "#5EEAD4" },
        { x: cx + Math.cos(t + 2) * 90, y: cy + Math.sin(t + 2) * 40, color: "#A78BFA" },
        { x: cx + Math.cos(t + 4) * 50, y: cy + Math.sin(t + 4) * 20, color: "#FFB454" },
      ];

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.fillStyle = n.color;
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = n.color;
        ctx.globalAlpha = 0.3;
        ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      t += 0.02;
      raf = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <canvas ref={canvasRef} className="w-full h-[220px] max-w-[320px] block" />
      <span className="font-mono text-[10px] uppercase text-cyan tracking-widest mt-1">
        Riemannian Manifold & Quantum State Vector
      </span>
    </div>
  );
}

export default function Research({ audioSynth }) {
  const [activeModel, setActiveModel] = useState("quantum");

  return (
    <section id="research" className="relative border-b border-line bg-panel/30 overflow-hidden py-10">
      <SubtleWaves color="#A78BFA" opacity={0.04} speed={0.003} />
      <SignalDivider variant="calm" color="#A78BFA" className="pt-6 relative z-10" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <SectionHeader
          eyebrow="Panel // 05"
          title="Applied AI & Quantum Research"
          description="Investigating EEG identity-state disentanglement, Riemannian geometry, and Variational Quantum Classifiers."
          color="#A78BFA"
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start mt-8">
          {/* Main Paper Breakdown Card */}
          <div className="lg:col-span-3 p-8 rounded-2xl bg-panel/80 border border-violet/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-violet transition-all duration-300 group">
            <div className="flex items-center gap-2 text-violet font-mono text-xs uppercase tracking-wider mb-3">
              <FileText className="h-4 w-4" />
              <span>Lead Research Study</span>
            </div>

            <h3 className="font-display font-bold text-xl md:text-2xl text-ink leading-snug mb-5 group-hover:text-violet transition-colors">
              Manifold-Aware Identity-State Disentanglement for Cross-Paradigm EEG Biometric Identification: A Riemannian & Quantum-Enhanced Study
            </h3>

            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3">Core Contributions</p>
            <ul className="space-y-2.5 mb-6 text-sm text-ink/85">
              {CONTRIBUTIONS.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-violet shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-line">
              {[
                "EEG Biometrics",
                "Riemannian Geometry",
                "Variational Quantum Classifier",
                "Cognitive Disentanglement",
                "Cross-Paradigm AI",
              ].map((t) => (
                <span
                  key={t}
                  onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                  className="font-mono text-[11px] uppercase tracking-wide px-3 py-1 rounded-full border border-violet/40 bg-violet/10 text-violet cursor-default select-none"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Visualizer & Comparison Engine */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-panel/80 border border-line backdrop-blur-md">
              <ManifoldGraphic />
            </div>

            {/* Model Comparison Box */}
            <div className="p-6 rounded-2xl bg-panel/80 border border-line backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-cyan font-semibold flex items-center gap-1.5">
                  <BarChart2 className="h-4 w-4" /> Accuracy Benchmarks
                </span>
                <div className="flex gap-1 bg-panel2 p-1 rounded-full border border-line">
                  <button
                    onClick={() => setActiveModel("quantum")}
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] capitalize transition-all ${
                      activeModel === "quantum" ? "bg-violet text-ink font-bold" : "text-muted"
                    }`}
                  >
                    Quantum
                  </button>
                  <button
                    onClick={() => setActiveModel("classical")}
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] capitalize transition-all ${
                      activeModel === "classical" ? "bg-cyan text-base font-bold" : "text-muted"
                    }`}
                  >
                    Classical
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-panel2/70 border border-line text-center">
                <div className="text-3xl font-bold font-display text-ink">
                  {activeModel === "quantum" ? "98.7%" : "94.2%"}
                </div>
                <div className="text-xs font-mono text-muted mt-1">
                  {activeModel === "quantum"
                    ? "Hybrid Riemannian + Quantum Classifier Accuracy"
                    : "Standard Tangent Space SVM Baseline"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
