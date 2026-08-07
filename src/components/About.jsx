import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { COMPETENCIES, PROFILE } from "../data/content";
import { Brain, ShieldCheck, Cpu, Code, Sparkles, Activity, Layers } from "lucide-react";
import { useMousePosition } from "../hooks/useMousePosition";

export default function About({ audioSynth }) {
  const containerRef = useRef(null);
  const mouse = useMousePosition();
  const [activeTab, setActiveTab] = useState("narrative");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const cardRef = useRef(null);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -12;
    const ry = (x / rect.width - 0.5) * 12;
    setTilt({ x: rx, y: ry });
  };

  const handleCardMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section ref={containerRef} id="about" className="relative border-b border-line overflow-hidden bg-base/80 py-8">
      <SubtleWaves color="#A78BFA" opacity={0.03} speed={0.003} />
      <SignalDivider variant="calm" color="#5EEAD4" className="pt-6 relative z-10" />

      {/* Floating particles element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-cyan/40 animate-ping" />
        <div className="absolute bottom-1/3 right-12 w-3 h-3 rounded-full bg-violet/30 animate-pulse" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-amber/40 animate-bounce" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <SectionHeader eyebrow="Panel // 02" title="Architecting Systems That Read Signals" color="#5EEAD4" />

        <div className="grid lg:grid-cols-12 gap-8 mt-10">
          {/* Left Column: Interactive 3D Avatar Profile Card */}
          <div className="lg:col-span-5">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative p-6 rounded-2xl bg-panel/70 border border-line/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-cyan/50 transition-all duration-300 overflow-hidden"
            >
              {/* Radial ambient halo behind avatar */}
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-cyan/15 blur-3xl pointer-events-none group-hover:bg-cyan/25 transition-all" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-violet/15 blur-3xl pointer-events-none group-hover:bg-violet/25 transition-all" />

              {/* Status Header Badge */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-line">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan"></span>
                  </span>
                  <span className="font-mono text-xs text-cyan uppercase tracking-wider">Node Active</span>
                </div>
                <span className="font-mono text-[11px] text-muted">VIT Chennai ’26</span>
              </div>

              {/* Bio summary */}
              <h3 className="font-display text-xl font-bold text-ink tracking-tight mb-2">
                Swananda Gupta
              </h3>
              <p className="text-xs font-mono text-cyan/90 mb-4">{PROFILE.affiliation}</p>

              {/* Reactive Micro-Illustrations */}
              <div className="grid grid-cols-3 gap-3 my-6">
                {[
                  { icon: Brain, label: "Quantum & EEG", color: "text-violet", bg: "bg-violet/10 border-violet/30" },
                  { icon: ShieldCheck, label: "Cyber & SIEM", color: "text-cyan", bg: "bg-cyan/10 border-cyan/30" },
                  { icon: Cpu, label: "Enterprise AI", color: "text-amber", bg: "bg-amber/10 border-amber/30" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                    className={`p-3 rounded-xl border ${item.bg} flex flex-col items-center justify-center text-center group/icon hover:scale-105 transition-transform duration-200 cursor-default`}
                  >
                    <item.icon className={`h-6 w-6 ${item.color} group-hover/icon:rotate-12 transition-transform duration-300`} />
                    <span className="text-[10px] font-mono text-ink/80 mt-2 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-panel2/60 border border-line text-xs font-mono text-muted space-y-2">
                <div className="flex justify-between">
                  <span>Current Focus:</span>
                  <span className="text-cyan font-semibold">Riemannian Quantum Biometrics</span>
                </div>
                <div className="flex justify-between">
                  <span>SOC Experience:</span>
                  <span className="text-ink">IBM QRadar SIEM @ MH Cyber</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scroll Narrative & Interactive Competency Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="p-7 rounded-2xl bg-panel/40 border border-line/70 backdrop-blur-sm space-y-5 hover:border-cyan/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Engineering Philosophy</span>
              </div>

              <p className="text-base sm:text-lg text-ink/90 leading-relaxed font-body">
                {PROFILE.bio}
              </p>

              <div className="pt-4 border-t border-line/60">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
                  Core Competencies & Domain Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {COMPETENCIES.map((c) => (
                    <span
                      key={c}
                      onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                      className="text-xs font-mono text-ink/80 bg-panel2/80 border border-line hover:border-cyan/50 hover:text-cyan rounded-full px-3.5 py-1.5 transition-all duration-150 cursor-default select-none shadow-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
