import { useEffect, useRef, useState } from "react";
import { Award, Terminal, Trophy, Sparkles, Star } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { ACHIEVEMENTS } from "../data/content";

export default function Achievements({ audioSynth }) {
  const [counts, setCounts] = useState({ accuracy: 0, participants: 0, topRank: 0 });
  const [cardTilts, setCardTilts] = useState({});
  const sectionRef = useRef(null);

  // Animated number count-up trigger on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let accuracyVal = 0;
          let partVal = 0;
          let rankVal = 0;

          const timer = setInterval(() => {
            accuracyVal = Math.min(99.88, accuracyVal + 3.2);
            partVal = Math.min(400, partVal + 15);
            rankVal = Math.min(40, rankVal + 2);

            setCounts({
              accuracy: accuracyVal.toFixed(2),
              participants: Math.floor(partVal),
              topRank: Math.floor(rankVal),
            });

            if (accuracyVal >= 99.88) clearInterval(timer);
          }, 30);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardMouseMove = (e, title) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -12;
    const ry = (x / rect.width - 0.5) * 12;
    setCardTilts((prev) => ({ ...prev, [title]: { x: rx, y: ry } }));
  };

  const handleCardMouseLeave = (title) => {
    setCardTilts((prev) => ({ ...prev, [title]: { x: 0, y: 0 } }));
  };

  return (
    <section ref={sectionRef} id="achievements" className="relative border-b border-line bg-panel/30 overflow-hidden py-10">
      <SubtleWaves color="#5EEAD4" opacity={0.03} speed={0.003} />
      <SignalDivider variant="calm" color="#5EEAD4" className="pt-6 relative z-10" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <SectionHeader
          eyebrow="Panel // 07"
          title="Recognition, Publications & Milestones"
          description="Taylor & Francis research publication, Samsung Solve for Tomorrow Top 40, and national hackathon podiums."
          color="#5EEAD4"
        />

        {/* Count-Up Metrics Banner */}
        <div className="grid grid-cols-3 gap-4 my-10 p-6 rounded-2xl bg-panel/70 border border-cyan/30 backdrop-blur-md text-center shadow-xl">
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display text-cyan">{counts.accuracy}%</div>
            <div className="text-xs font-mono text-muted mt-1">Research Paper Accuracy</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display text-violet">Top {counts.topRank}</div>
            <div className="text-xs font-mono text-muted mt-1">Samsung Solve for Tomorrow</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display text-amber">{counts.participants}+</div>
            <div className="text-xs font-mono text-muted mt-1">Hack4Health Participants</div>
          </div>
        </div>

        {/* Staggered Achievement Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a, i) => {
            const indexStr = String(i + 1).padStart(2, "0");
            const tilt = cardTilts[a.title] || { x: 0, y: 0 };

            return (
              <div
                key={a.title}
                onMouseMove={(e) => handleCardMouseMove(e, a.title)}
                onMouseLeave={() => handleCardMouseLeave(a.title)}
                onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: "transform 0.15s ease-out",
                }}
                className="group relative flex flex-col justify-between bg-panel/70 backdrop-blur-md border border-line rounded-2xl p-6 transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-panel2 border border-line grid place-items-center shrink-0 text-cyan group-hover:text-amber group-hover:border-amber/40 group-hover:scale-110 transition-all shadow-sm">
                    <Award size={20} />
                  </span>
                  <span className="font-mono text-xs text-cyan/70 font-semibold">
                    [ACH // {indexStr}]
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-ink mb-2 group-hover:text-cyan transition-colors leading-tight">
                    {a.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-body">
                    {a.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-muted font-mono text-[10px] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-cyan">
                    <Sparkles size={11} />
                    Verified Milestone
                  </span>
                  <span className="text-cyan font-bold">STATUS // VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
