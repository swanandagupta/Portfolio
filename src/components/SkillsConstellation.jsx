import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { SKILLS } from "../data/content";
import { Sparkles, Cpu, Shield, Database, Code, Cloud } from "lucide-react";

export default function SkillsConstellation({ audioSynth }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const canvasRef = useRef(null);

  // Grouped Skill Nodes with coordinates for the Constellation graph
  const nodes = [
    // Programming
    { id: "Python", category: "Programming Languages", x: 180, y: 120, icon: "🐍" },
    { id: "Java", category: "Programming Languages", x: 120, y: 180, icon: "☕" },
    { id: "C++", category: "Programming Languages", x: 240, y: 180, icon: "⚡" },
    { id: "JavaScript", category: "Programming Languages", x: 190, y: 250, icon: "JS" },
    { id: "C#", category: "Programming Languages", x: 260, y: 260, icon: "C#" },

    // AI & Machine Learning
    { id: "PyTorch", category: "AI & Machine Learning", x: 420, y: 110, icon: "🔥" },
    { id: "Deep Learning", category: "AI & Machine Learning", x: 490, y: 170, icon: "🧠" },
    { id: "Quantum ML", category: "AI & Machine Learning", x: 420, y: 220, icon: "⚛️" },
    { id: "Scikit-learn", category: "AI & Machine Learning", x: 520, y: 240, icon: "📊" },
    { id: "Computer Vision", category: "AI & Machine Learning", x: 460, y: 290, icon: "👁️" },

    // Cybersecurity
    { id: "IBM QRadar", category: "Cybersecurity", x: 700, y: 120, icon: "🛡️" },
    { id: "SIEM", category: "Cybersecurity", x: 640, y: 180, icon: "🔒" },
    { id: "MITRE ATT&CK", category: "Cybersecurity", x: 740, y: 200, icon: "🎯" },
    { id: "Incident Triage", category: "Cybersecurity", x: 670, y: 260, icon: "🚨" },

    // Frameworks & Web
    { id: "React", category: "Frameworks & Libraries", x: 300, y: 340, icon: "⚛️" },
    { id: "ASP.NET Core", category: "Frameworks & Libraries", x: 200, y: 350, icon: "🌐" },
    { id: "FastAPI", category: "Cloud & Development", x: 380, y: 370, icon: "⚡" },
    { id: "Tailwind CSS", category: "Frameworks & Libraries", x: 280, y: 410, icon: "🎨" },

    // Databases & Cloud
    { id: "SQL Server", category: "Databases", x: 550, y: 350, icon: "🛢️" },
    { id: "MongoDB", category: "Databases", x: 620, y: 390, icon: "🍃" },
    { id: "AWS", category: "Cloud & Development", x: 700, y: 350, icon: "☁️" },
  ];

  // Vector links connecting technologies into a constellation
  const connections = [
    ["Python", "PyTorch"],
    ["Python", "Scikit-learn"],
    ["Python", "FastAPI"],
    ["Python", "Computer Vision"],
    ["PyTorch", "Deep Learning"],
    ["PyTorch", "Quantum ML"],
    ["IBM QRadar", "SIEM"],
    ["SIEM", "MITRE ATT&CK"],
    ["SIEM", "Incident Triage"],
    ["C#", "ASP.NET Core"],
    ["ASP.NET Core", "SQL Server"],
    ["JavaScript", "React"],
    ["React", "Tailwind CSS"],
    ["React", "FastAPI"],
    ["SQL Server", "MongoDB"],
    ["FastAPI", "AWS"],
    ["Quantum ML", "Deep Learning"],
  ];

  // Canvas render loop for animated connecting constellation lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf;
    let pulsePhase = 0;
    const width = 850;
    const height = 480;

    canvas.width = width;
    canvas.height = height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background connecting lines
      connections.forEach(([sourceId, targetId]) => {
        const source = nodes.find((n) => n.id === sourceId);
        const target = nodes.find((n) => n.id === targetId);

        if (source && target) {
          const isConnectedToHover =
            hoveredSkill === source.id ||
            hoveredSkill === target.id ||
            (hoveredSkill &&
              connections.some(
                ([s, t]) =>
                  (s === hoveredSkill && (t === source.id || t === target.id)) ||
                  (t === hoveredSkill && (s === source.id || s === target.id))
              ));

          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);

          if (isConnectedToHover) {
            ctx.strokeStyle = "#5EEAD4";
            ctx.lineWidth = 2.5;
            ctx.shadowColor = "#5EEAD4";
            ctx.shadowBlur = 10;
          } else {
            ctx.strokeStyle = "rgba(36, 47, 73, 0.6)";
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
          }

          ctx.stroke();

          // Animated energy signal particle along connected line
          if (isConnectedToHover) {
            const progress = (pulsePhase % 100) / 100;
            const px = source.x + (target.x - source.x) * progress;
            const py = source.y + (target.y - source.y) * progress;

            ctx.beginPath();
            ctx.fillStyle = "#A78BFA";
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      pulsePhase += 1.5;
      raf = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, [hoveredSkill]);

  return (
    <section id="skills" className="relative border-b border-line bg-panel/30 overflow-hidden py-10">
      <SubtleWaves color="#5EEAD4" opacity={0.03} speed={0.003} />
      <SignalDivider variant="calm" color="#5EEAD4" className="pt-6 relative z-10" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="Panel // 06"
            title="Interactive Technology Constellation"
            description="Hover over nodes to illuminate connected skill vectors and neural pipelines."
            color="#5EEAD4"
          />

          {/* Category Filter Switcher */}
          <div className="flex flex-wrap gap-2 bg-panel2/80 p-1.5 rounded-full border border-line">
            {["All", "Programming Languages", "AI & Machine Learning", "Cybersecurity", "Frameworks & Libraries"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (audioSynth?.playClick) audioSynth.playClick();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    activeCategory === cat
                      ? "bg-cyan text-[#080C16] font-bold shadow-[0_0_12px_rgba(94,234,212,0.4)]"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {cat === "Programming Languages" ? "Languages" : cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Constellation Visual Canvas Container */}
        <div className="relative w-full max-w-[880px] mx-auto h-[480px] rounded-2xl bg-panel/70 border border-line/80 backdrop-blur-md p-4 overflow-hidden shadow-2xl">
          {/* Canvas for connecting lines */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 w-full h-full" />

          {/* Interactive Skill Nodes */}
          {nodes.map((node) => {
            const isMatchCat = activeCategory === "All" || node.category === activeCategory;
            const isHovered = hoveredSkill === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => {
                  setHoveredSkill(node.id);
                  if (audioSynth?.playHover) audioSynth.playHover();
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  left: `${(node.x / 850) * 100}%`,
                  top: `${(node.y / 480) * 100}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none ${
                  isHovered
                    ? "bg-cyan/20 border-cyan text-cyan scale-110 shadow-[0_0_20px_#5EEAD4]"
                    : isMatchCat
                    ? "bg-panel2/90 border-line/80 text-ink/90 hover:border-cyan/50"
                    : "bg-panel/40 border-line/40 text-muted/40 scale-90"
                }`}
              >
                <span className="text-xs">{node.icon}</span>
                <span className="font-mono text-xs font-medium tracking-wide">{node.id}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
