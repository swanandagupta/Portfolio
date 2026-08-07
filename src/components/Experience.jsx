import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { DOMAIN, EXPERIENCE } from "../data/content";
import { Briefcase, Calendar, Building2, CheckCircle, Filter, FileText, ExternalLink } from "lucide-react";

export default function Experience({ audioSynth }) {
  const timelineRef = useRef(null);
  const [scrollFillPercent, setScrollFillPercent] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("all");

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height;
      const currentDist = windowHeight / 2 - rect.top;
      const pct = Math.min(100, Math.max(0, (currentDist / totalDist) * 100));
      setScrollFillPercent(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredRoles = EXPERIENCE.filter(
    (role) => selectedDomain === "all" || role.domain === selectedDomain
  );

  return (
    <section id="experience" className="relative border-b border-line bg-panel/30 overflow-hidden py-10">
      <SubtleWaves color="#FFB454" opacity={0.03} speed={0.003} />
      <SignalDivider variant="spiky" color="#5EEAD4" className="pt-6 relative z-10" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Panel // 03"
            title="Experience & Operations History"
            description="From state cyber operations & SIEM log triage to quantum biometric research and enterprise architecture."
            color="#FFB454"
          />

          {/* Domain Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-panel2/80 p-1.5 rounded-full border border-line shrink-0">
            <span className="text-[11px] font-mono text-muted px-2.5 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filter:
            </span>
            {["all", "security", "research", "software"].map((dom) => (
              <button
                key={dom}
                onClick={() => {
                  if (audioSynth?.playClick) audioSynth.playClick();
                  setSelectedDomain(dom);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all duration-200 ${
                  selectedDomain === dom
                    ? "bg-cyan text-[#080C16] font-bold shadow-[0_0_12px_rgba(94,234,212,0.4)]"
                    : "text-muted hover:text-ink hover:bg-panel"
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container with Dynamic Progress Beam */}
        <div ref={timelineRef} className="relative ml-2 md:ml-8 pl-6 md:pl-10">
          {/* Background vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-line/80" />

          {/* Scroll-driven filling laser line */}
          <div
            className="absolute left-0 top-2 w-0.5 bg-gradient-to-b from-cyan via-violet to-amber shadow-[0_0_12px_#5EEAD4] transition-all duration-150 ease-out"
            style={{ height: `${scrollFillPercent}%` }}
          />

          <ol className="space-y-12">
            {filteredRoles.map((role, i) => {
              const d = DOMAIN[role.domain];
              return (
                <li key={i} className="relative group">
                  {/* Timeline Node Point */}
                  <span
                    className="absolute -left-[31px] md:-left-[47px] top-6 w-5 h-5 rounded-full border-2 border-base grid place-items-center transition-all duration-300 group-hover:scale-125 z-20 shadow-[0_0_12px_rgba(94,234,212,0.4)]"
                    style={{ backgroundColor: d.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-base" />
                  </span>

                  {/* Experience Card */}
                  <div
                    className="p-6 md:p-7 rounded-2xl bg-panel/70 border border-line/80 backdrop-blur-md transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group/card"
                    style={{ borderLeftColor: d.color, borderLeftWidth: 4 }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md border uppercase tracking-wider"
                          style={{
                            backgroundColor: d.color + "18",
                            borderColor: d.color + "44",
                            color: d.color,
                          }}
                        >
                          {d.name}
                        </span>
                        <span className="font-mono text-xs text-muted flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5" />
                          {role.org}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-cyan/90 flex items-center gap-1 bg-panel2/60 px-3 py-1 rounded-full border border-line">
                        <Calendar className="h-3 w-3" />
                        {role.period}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl md:text-2xl text-ink group-hover/card:text-cyan transition-colors mb-2">
                      {role.role}
                    </h3>
                    <p className="text-ink/90 leading-relaxed mb-4 text-sm md:text-base font-body">
                      {role.summary}
                    </p>

                    {/* Detailed Highlights */}
                    <ul className="space-y-2 mb-6 text-xs md:text-sm text-muted">
                      {role.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="h-4 w-4 text-cyan/70 shrink-0 mt-0.5" />
                          <span className="leading-relaxed text-ink/80">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges & Certificate Link (Bottom Right Corner) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line/60">
                      <div className="flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                            className="font-mono text-[11px] uppercase tracking-wide px-3 py-1 rounded-full border bg-panel2/40 hover:bg-panel2 transition-colors cursor-default select-none"
                            style={{ borderColor: d.color + "40", color: d.color }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Right Certificate PDF Link Button */}
                      {role.certificate && (
                        <a
                          href={role.certificate}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cyan/40 bg-cyan/10 hover:bg-cyan text-cyan hover:text-panel font-mono text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_12px_rgba(94,234,212,0.25)] hover:shadow-[0_0_18px_rgba(94,234,212,0.5)] shrink-0 ml-auto"
                          title="View Verification Certificate PDF"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View Certificate</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
