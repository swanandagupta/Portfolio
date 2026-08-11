import { useEffect, useRef, useState } from "react";
import { Award, Trophy, ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { ACHIEVEMENTS } from "../data/content";

// Reusable Interactive Achievement Gallery Modal Lightbox
function AchievementImagesModal({ title, images, onClose, audioSynth }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Prevent background page scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard controls: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        handlePrev();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length]);

  const handlePrev = () => {
    if (audioSynth?.playClick) audioSynth.playClick();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (audioSynth?.playClick) audioSynth.playClick();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-base/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-panel border border-cyan/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-panel2 border-b border-line flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Trophy className="h-5 w-5 text-amber shrink-0" />
            <h3 className="font-display font-bold text-lg text-ink truncate max-w-md md:max-w-xl">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-panel border border-line text-muted hover:text-ink hover:bg-line transition-colors"
            title="Close Gallery (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Center Large Image Stage */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 min-h-[300px] sm:min-h-[420px] bg-panel2/40 overflow-hidden">
          {/* Navigation Previous Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 z-10 p-2.5 rounded-full bg-panel/80 border border-line text-muted hover:text-cyan hover:border-cyan/50 hover:bg-panel transition-all shadow-lg active:scale-90 backdrop-blur-md cursor-pointer"
              title="Previous Image (Left Arrow)"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Active Large Image Display */}
          <img
            src={images[currentIndex]}
            alt={`${title} Proof Image ${currentIndex + 1}`}
            className="max-w-full max-h-[62vh] object-contain rounded-xl shadow-2xl transition-opacity duration-200"
          />

          {/* Navigation Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 z-10 p-2.5 rounded-full bg-panel/80 border border-line text-muted hover:text-cyan hover:border-cyan/50 hover:bg-panel transition-all shadow-lg active:scale-90 backdrop-blur-md cursor-pointer"
              title="Next Image (Right Arrow)"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Modal Footer & Image Counter */}
        <div className="px-6 py-3 bg-panel2 border-t border-line flex items-center justify-between shrink-0 font-mono text-xs text-muted">
          <span className="hidden sm:inline text-[11px]">
            Use Left / Right Arrow keys to navigate · Esc to close
          </span>
          <span className="font-semibold text-cyan mx-auto sm:mx-0">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Achievements({ audioSynth }) {
  const [counts, setCounts] = useState({ accuracy: 0, participants: 0, topRank: 0 });
  const [cardTilts, setCardTilts] = useState({});
  const [selectedGallery, setSelectedGallery] = useState(null);
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

  const openGallery = (a) => {
    if (Array.isArray(a.images) && a.images.length > 0) {
      if (audioSynth?.playClick) audioSynth.playClick();
      setSelectedGallery({ title: a.title, images: a.images });
    }
  };

  return (
    <section ref={sectionRef} id="achievements" className="relative border-b border-line bg-panel/30 overflow-hidden py-10">
      <SubtleWaves color="#5EEAD4" opacity={0.03} speed={0.003} />
      <SignalDivider variant="calm" color="#5EEAD4" className="pt-6 relative z-10" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <SectionHeader
          eyebrow="Panel // 07"
          title="Recognition, Publications & Milestones"
          description="Taylor & Francis research publication, AniGaMathon victory, Samsung Solve for Tomorrow Top 40, and national hackathon podiums."
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
            const hasImages = Array.isArray(a.images) && a.images.length > 0;

            return (
              <div
                key={a.title}
                onClick={() => hasImages && openGallery(a)}
                onMouseMove={(e) => handleCardMouseMove(e, a.title)}
                onMouseLeave={() => handleCardMouseLeave(a.title)}
                onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: "transform 0.15s ease-out",
                }}
                className={`group relative flex flex-col justify-between bg-panel/70 backdrop-blur-md border border-line rounded-2xl p-6 transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] ${
                  hasImages ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-panel2 border border-line grid place-items-center shrink-0 text-cyan group-hover:text-amber group-hover:border-amber/40 group-hover:scale-110 transition-all shadow-sm">
                    <Award size={20} />
                  </span>
                  <span className="font-mono text-xs text-cyan/70 font-semibold">
                    [ACH // {indexStr}]
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-ink mb-2 group-hover:text-cyan transition-colors leading-tight">
                      {a.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-body mb-3">
                      {a.description}
                    </p>
                  </div>

                  {/* View Images → Action Link directly below description */}
                  {hasImages && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openGallery(a);
                        }}
                        className="inline-flex items-center gap-1.5 text-cyan hover:text-cyan/80 font-mono text-xs font-semibold group/btn transition-colors cursor-pointer py-1"
                      >
                        <span>View Images</span>
                        <span className="transition-transform duration-200 group-hover/btn:translate-x-1 font-bold">
                          →
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Images Lightbox Gallery Modal */}
      {selectedGallery && (
        <AchievementImagesModal
          title={selectedGallery.title}
          images={selectedGallery.images}
          onClose={() => setSelectedGallery(null)}
          audioSynth={audioSynth}
        />
      )}
    </section>
  );
}
