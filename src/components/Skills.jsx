import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { SKILLS } from "../data/content";

export default function Skills() {
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      setOffsetY((elementCenter - viewportCenter) * 0.05);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} id="skills" className="relative border-b border-line bg-base overflow-hidden">
      <SubtleWaves color="#FFB454" opacity={0.03} />
      <SignalDivider variant="spiky" color="#FFB454" className="pt-6 relative z-10" />
      
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div style={{ transform: `translateY(${offsetY}px)` }} className="transition-transform duration-100 ease-out">
          <SectionHeader eyebrow="Panel // Skills" title="What I work with" color="#FFB454" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {SKILLS.map((group) => (
            <div 
              key={group.label} 
              className="bg-panel border border-line rounded-xl p-6 transition-all duration-300 hover:border-cyan/40 interactive-card interactive-card-amber"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-amber mb-4 select-none">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-sm text-ink/80 bg-panel2 border border-line rounded-md px-2.5 py-1 hover:border-cyan/50 hover:text-cyan transition-colors select-none cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
