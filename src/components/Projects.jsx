import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Maximize2,
  X,
  BookOpen,
  Layers,
  Sparkles,
  CheckCircle,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Image as ImageIcon,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { GithubIcon } from "./Icons";
import { DOMAIN, PROJECTS } from "../data/content";

// Clean Fullscreen Architecture Image Lightbox Preview (No Zooming or Panning)
function ArchitectureImagePreview({ imageSrc, title, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base/95 backdrop-blur-2xl p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl flex flex-col items-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="w-full flex items-center justify-between px-4 py-3 bg-panel2/90 rounded-2xl border border-line">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan" />
            <span className="font-mono text-xs font-semibold text-ink uppercase tracking-wider">
              Architecture Blueprint // {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-panel border border-line text-muted hover:text-rose-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Responsive Image Display */}
        <div className="w-full flex items-center justify-center p-2 rounded-2xl bg-panel2/50 border border-line/60">
          <img
            src={imageSrc}
            alt={`${title} System Architecture`}
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default function Projects({ audioSynth }) {
  const scrollContainerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Independent Horizontal Carousel Scroll Handler
  const handleWheel = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtLeft = container.scrollLeft <= 0;
    const isAtRight = container.scrollLeft >= container.scrollWidth - container.clientWidth - 4;

    if ((e.deltaY > 0 && !isAtRight) || (e.deltaY < 0 && !isAtLeft)) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  const scrollByAmount = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollDelta = container.clientWidth * 0.75;
    const targetScroll = direction === "right" ? scrollDelta : -scrollDelta;

    container.scrollBy({ left: targetScroll, behavior: "smooth" });
    if (audioSynth?.playClick) audioSynth.playClick();
  };

  const openProjectModal = (p) => {
    if (audioSynth?.playClick) audioSynth.playClick();
    setSelectedProject(p);
    setActiveStepIndex(null);
  };

  // Navigate to Previous / Next Project inside the Case Study Modal
  const navigateProject = (direction) => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0) nextIndex = PROJECTS.length - 1;
    if (nextIndex >= PROJECTS.length) nextIndex = 0;

    if (audioSynth?.playClick) audioSynth.playClick();
    setSelectedProject(PROJECTS[nextIndex]);
    setActiveStepIndex(null);
  };

  // Helper to extract top 4-5 tech chips for compact project cards
  const getTechChips = (techStack) => {
    if (!techStack) return [];
    const allTechs = Object.values(techStack).flat();
    return allTechs.slice(0, 4);
  };

  return (
    <section
      id="projects"
      className="relative border-b border-line bg-base overflow-hidden pt-28 pb-16 scroll-mt-28"
    >
      <SubtleWaves color="#A78BFA" opacity={0.03} speed={0.003} />

      {/* Header Container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Panel // 04"
          title="Engineering Case Studies"
          description="Use your mouse wheel or swipe horizontally to explore projects — click any card for architecture & implementation."
          color="#A78BFA"
        />

        {/* Scroll Control Arrows */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scrollByAmount("left")}
            className="p-2.5 rounded-full bg-panel2 border border-line text-muted hover:text-cyan hover:border-cyan/50 transition-all shadow-sm active:scale-90"
            title="Scroll Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            className="p-2.5 rounded-full bg-panel2 border border-line text-muted hover:text-cyan hover:border-cyan/50 transition-all shadow-sm active:scale-90"
            title="Scroll Right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Full-Width Fluid Responsive Horizontal Carousel Region */}
      <div className="w-full max-w-[1400px] mx-auto relative group">
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden py-4 px-4 sm:px-8 lg:px-12 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none w-full scroll-px-4 sm:scroll-px-8 lg:scroll-px-12"
        >
          {PROJECTS.map((p) => {
            const d = DOMAIN[p.domain] || { color: "#A78BFA" };
            const techChips = getTechChips(p.techStack);

            return (
              <div
                key={p.title}
                onClick={() => openProjectModal(p)}
                onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                style={{
                  borderTopColor: d.color,
                  borderTopWidth: 3,
                }}
                className="snap-start group/card block w-[82vw] sm:w-[calc(50vw-2.5rem)] lg:w-[calc(33.333vw-2.5rem)] xl:w-[calc(25vw-2.5rem)] min-w-[270px] max-w-[370px] shrink-0 bg-panel/85 backdrop-blur-xl border border-line/80 rounded-2xl p-6 transition-all duration-300 hover:border-cyan/60 hover:shadow-[0_12px_30px_rgba(94,234,212,0.15)] hover:-translate-y-1 select-none cursor-pointer relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-bold text-lg text-ink group-hover/card:text-cyan transition-colors">
                      {p.title}
                    </h3>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 font-semibold"
                      style={{ backgroundColor: d.color + "18", borderColor: d.color + "44", color: d.color }}
                    >
                      {p.category}
                    </span>
                  </div>

                  {/* One-Line Description */}
                  <p className="text-xs text-ink/85 leading-relaxed mb-4 line-clamp-2 h-[36px] overflow-hidden font-body">
                    {p.motivation}
                  </p>

                  {/* 3-5 Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-panel2 border border-line/70 text-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-4 font-mono text-[11px] font-semibold" style={{ color: d.color }}>
                    <Activity size={13} />
                    <span>{p.impact}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-line text-xs font-mono text-cyan">
                    <span className="flex items-center gap-1 font-semibold group-hover/card:underline">
                      View Case Study
                    </span>
                    <Maximize2 className="h-3.5 w-3.5 group-hover/card:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Trailing End Spacer to prevent last card edge clipping */}
          <div className="w-2 sm:w-6 shrink-0 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* Redesigned Technical Case Study Fullscreen Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-base/92 backdrop-blur-2xl animate-fade-in">
          <div className="w-full max-w-6xl bg-panel border border-cyan/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header with Previous/Next Navigation */}
            <div className="px-6 py-4 bg-panel2 border-b border-line flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs uppercase px-2.5 py-1 rounded border font-semibold"
                  style={{
                    backgroundColor: (DOMAIN[selectedProject.domain]?.color || "#A78BFA") + "20",
                    borderColor: (DOMAIN[selectedProject.domain]?.color || "#A78BFA") + "50",
                    color: DOMAIN[selectedProject.domain]?.color || "#A78BFA",
                  }}
                >
                  {selectedProject.category}
                </span>
                <h2 className="font-display text-xl font-bold text-ink">{selectedProject.title}</h2>
              </div>

              {/* Navigation & Close Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateProject("prev")}
                  className="px-3 py-1.5 rounded-lg bg-panel border border-line text-muted hover:text-cyan hover:border-cyan/40 text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Previous Case Study"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={() => navigateProject("next")}
                  className="px-3 py-1.5 rounded-lg bg-panel border border-line text-muted hover:text-cyan hover:border-cyan/40 text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Next Case Study"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-line transition-colors ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Stream */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-10 flex-1 text-ink font-body">
              {/* 1. Motivation Section */}
              <div className="space-y-3 relative">
                <div className="flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                  <Sparkles className="h-4 w-4" />
                  <span>1. Motivation</span>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-ink leading-snug">
                  {selectedProject.motivation}
                </h3>
                <div className="h-[2px] w-28 bg-gradient-to-r from-cyan via-violet to-transparent rounded-full shadow-[0_0_8px_#5EEAD4]" />
              </div>

              {/* 2. Research Inspiration Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-violet font-mono text-xs uppercase tracking-wider font-semibold">
                  <BookOpen className="h-4 w-4" />
                  <span>2. Research Inspiration</span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {selectedProject.papers?.map((paper, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                      className="p-4 rounded-xl bg-panel2/70 border border-line hover:border-violet/60 hover:shadow-[0_8px_24px_rgba(167,139,250,0.15)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default"
                    >
                      <div>
                        <div className="text-[11px] font-mono text-violet font-semibold mb-2">
                          <span>{paper.year}</span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-ink leading-snug mb-1">
                          {paper.title}
                        </h4>
                        <p className="text-[11px] font-mono text-muted mb-3">{paper.authors}</p>
                        <p className="text-xs text-ink/80 leading-relaxed font-body italic border-t border-line/50 pt-2">
                          "{paper.contribution}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Technical Implementation Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                  <Layers className="h-4 w-4" />
                  <span>3. Implementation Timeline</span>
                </div>

                <div className="relative border-l border-line/80 ml-3 pl-6 space-y-3">
                  {selectedProject.implementation?.map((step, idx) => {
                    const isActive = activeStepIndex === idx;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => {
                          setActiveStepIndex(idx);
                          audioSynth?.playHover && audioSynth.playHover();
                        }}
                        onMouseLeave={() => setActiveStepIndex(null)}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-cyan/10 border-cyan text-ink scale-[1.01] shadow-[0_0_15px_rgba(94,234,212,0.2)]"
                            : activeStepIndex !== null
                            ? "bg-panel2/40 border-line/40 opacity-50"
                            : "bg-panel2/60 border-line text-ink/90 hover:border-cyan/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-mono text-xs text-cyan mb-1 font-semibold">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Stage {String(idx + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{step}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4 & 5. Side-by-Side Row: Architecture Image (~70%) & Tech Stack (~30%) */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                {/* 4. Architecture Image Column (~70% Width) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber font-mono text-xs uppercase tracking-wider font-semibold">
                      <Cpu className="h-4 w-4" />
                      <span>4. System Architecture</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted">Click image for Fullscreen</span>
                  </div>

                  <div
                    onClick={() => setPreviewImage(selectedProject.architectureImage)}
                    className="relative rounded-2xl bg-panel2/80 border border-line/80 p-3 hover:border-amber/60 transition-all cursor-pointer group shadow-2xl overflow-hidden"
                  >
                    <img
                      src={selectedProject.architectureImage}
                      alt={`${selectedProject.title} Architecture`}
                      className="w-full h-auto max-h-[460px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-base/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-mono text-xs font-bold text-cyan bg-panel/70 backdrop-blur-xs">
                      <ImageIcon className="h-4 w-4" /> Click for Fullscreen Preview
                    </div>
                  </div>
                </div>

                {/* 5. Tech Stack Column (~30% Width) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2 text-violet font-mono text-xs uppercase tracking-wider font-semibold">
                    <Wrench className="h-4 w-4" />
                    <span>5. Tech Stack</span>
                  </div>

                  <div className="space-y-3.5 bg-panel2/60 p-4 rounded-2xl border border-line/80">
                    {selectedProject.techStack &&
                      Object.entries(selectedProject.techStack).map(([category, items]) => (
                        <div key={category} className="space-y-1.5">
                          <h5 className="font-mono text-[10px] uppercase tracking-wider text-violet font-semibold">
                            {category}
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((tech) => (
                              <span
                                key={tech}
                                className="font-mono text-[11px] px-2.5 py-1 rounded bg-panel border border-line text-ink font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* 6. GitHub Repository Section */}
              {selectedProject.github && (
                <div className="pt-6 border-t border-line flex flex-col items-center justify-center text-center space-y-4">
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">
                    Source Code &amp; Documentation Repository
                  </span>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan text-panel font-bold text-sm font-mono tracking-wider shadow-[0_0_24px_rgba(94,234,212,0.4)] hover:shadow-[0_0_36px_rgba(94,234,212,0.7)] hover:brightness-110 active:scale-95 transition-all duration-200"
                  >
                    <GithubIcon size={20} />
                    <span>View GitHub Repository</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Architecture Image Preview */}
      {previewImage && (
        <ArchitectureImagePreview
          imageSrc={previewImage}
          title={selectedProject?.title}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </section>
  );
}
