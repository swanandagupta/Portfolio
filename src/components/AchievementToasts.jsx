import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Trophy, CheckCircle2, ShieldCheck, Cpu, Code2, Terminal, X } from "lucide-react";

export default function AchievementToasts({ activeSection, audioSynth, terminalOpen }) {
  const [toasts, setToasts] = useState([]);
  const unlockedSet = useRef(new Set());

  const triggerAchievement = (id, title, desc, icon) => {
    if (unlockedSet.current.has(id)) return;
    unlockedSet.current.add(id);

    const newToast = {
      id,
      title,
      desc,
      icon,
      timestamp: Date.now(),
    };

    setToasts((prev) => [newToast, ...prev].slice(0, 3));
    if (audioSynth?.playUnlock) {
      audioSynth.playUnlock();
    }

    // Auto dismiss after 4.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Trigger achievements based on navigation/scroll state
  useEffect(() => {
    // Initial welcome toast
    const timer = setTimeout(() => {
      triggerAchievement(
        "welcome",
        "Signal Initialized",
        "Welcome to Swananda's interactive portfolio experience",
        Sparkles
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeSection === "about") {
      triggerAchievement("about_explore", "Research Explorer", "Explored Swananda's research & engineering background", Cpu);
    } else if (activeSection === "experience") {
      triggerAchievement("soc_analyst", "SOC & Systems Desk", "Inspected Maharashtra Cyber SIEM & L&T enterprise history", ShieldCheck);
    } else if (activeSection === "projects") {
      triggerAchievement("projects_unlocked", "AI & Cyber Systems", "Discovered autonomous agents & city digital twins", Code2);
    } else if (activeSection === "skills") {
      triggerAchievement("constellation_master", "Star Constellation", "Activated interactive technology network", Sparkles);
    } else if (activeSection === "achievements") {
      triggerAchievement("awards_viewed", "Publication & Awards", "Taylor & Francis paper & Samsung SFT Top 40", Trophy);
    }
  }, [activeSection]);

  useEffect(() => {
    if (terminalOpen) {
      triggerAchievement("terminal_unlocked", "Secret Terminal Unlocked", "Accessed developer CLI shell (try typing 'help')", Terminal);
    }
  }, [terminalOpen]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const IconComponent = toast.icon || CheckCircle2;
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-panel/90 backdrop-blur-md border border-cyan/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 animate-slide-in hover:border-cyan"
          >
            <div className="p-2 rounded-lg bg-cyan/15 text-cyan shrink-0">
              <IconComponent className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-cyan uppercase">
                  Achievement Unlocked
                </span>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-muted hover:text-ink transition-colors"
                  aria-label="Close notification"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <h4 className="text-sm font-semibold font-display text-ink mt-0.5">{toast.title}</h4>
              <p className="text-xs text-muted leading-relaxed mt-0.5">{toast.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
