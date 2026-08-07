import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, CornerDownLeft, Sparkles, Shield, Cpu, ExternalLink } from "lucide-react";

export default function TerminalDrawer({ isOpen, onClose, audioSynth }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "SYSTEM INITIALIZED v3.6 // SWANANDA GUPTA PORTFOLIO CLI\nType 'help' for available commands or 'matrix' for cyber visual mode.",
    },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (audioSynth?.playClick) audioSynth.playClick();

    const newHistory = [...history, { type: "user", text: `swananda@cyber-node:~$ ${input}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  help        - Show command reference
  about       - Display background & research focus
  projects    - List featured engineering & AI projects
  skills      - Show technical competencies & stack
  experience  - View internship & research history
  contact     - Display email & social endpoints
  sudo        - Request elevated admin privileges
  matrix      - Trigger cyber grid visual burst
  clear       - Wipe terminal history`,
        });
        break;
      case "about":
        newHistory.push({
          type: "output",
          text: "SWANANDA GUPTA — CSE Undergraduate @ VIT Chennai.\nFocus: AI/ML, Quantum Machine Learning, EEG Biometrics, Security & Enterprise Software.\nReading signals from brainwaves to network traffic.",
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          text: `PROJECT MATRIX:
1. SOC Copilot (Security) — AI threat investigation & SIEM analyst copilot.
2. Auto-Pentesting Agentic AI (Security) — Autonomous LLM agent web vulnerability scanner.
3. Streeva (Research) — City Digital Twin & AI safety routing framework.
4. SecureSphere (Security) — ML Intrusion Detection System trained on CICIDS 2019.
5. Smart Environmental Monitoring (IoT) — ESP32 anomaly detection platform.`,
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: "LANGUAGES: Python, Java, C, C++, C#, SQL, JavaScript\nFRAMEWORKS: React, ASP.NET Core, FastAPI, PyTorch, Scikit-learn, OpenCV\nCYBER & AI: IBM QRadar SIEM, Quantum ML, Riemannian Geometry, MITRE ATT&CK",
        });
        break;
      case "experience":
        newHistory.push({
          type: "output",
          text: `EXPERIENCE LOG:
[2026-Present] Research Intern — VIT (EEG Biometrics & Variational Quantum Classifier)
[Jun 2026-Jul 2026] SOC Analyst Intern — Maharashtra Cyber HQ (IBM QRadar SIEM & CERT)
[Oct 2024-Aug 2025] Web/Game Intern — CSIR (Adaptive learning & cognitive interfaces)
[May 2025-Jul 2025] Software Intern — Larsen & Toubro (ASP.NET Core Onion Architecture)`,
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: "LINKEDIN: linkedin.com/in/swananda-gupta-107a36323/\nGITHUB: github.com/swanandagupta\nEMAIL: swanandagupta@gmail.com",
        });
        break;
      case "sudo":
        newHistory.push({
          type: "accent",
          text: "[ACCESS GRANTED] User swananda elevated to System Architect. All security parameters optimized.",
        });
        break;
      case "matrix":
        newHistory.push({
          type: "cyan",
          text: "01010011 01010111 01000001 01001110 01000001 01001110 01000100 01000001\nCYBER MATRIX SIGNAL ENGAGED. Neural link synchronized.",
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "whoami":
        newHistory.push({
          type: "output",
          text: "You are an exploratory recruiter/engineer discovering Swananda Gupta's digital portfolio.",
        });
        break;
      default:
        newHistory.push({
          type: "error",
          text: `Command not recognized: '${cmd}'. Type 'help' for command manual.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-base/80 backdrop-blur-md transition-opacity animate-fade-in">
      <div
        className="w-full max-w-xl bg-panel border-l border-cyan/40 shadow-2xl flex flex-col h-full font-mono text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-panel2 border-b border-line">
          <div className="flex items-center gap-2 text-cyan">
            <Terminal className="h-4 w-4" />
            <span className="font-semibold text-xs tracking-wider uppercase text-ink">
              Swananda Shell — v3.6
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted hover:text-cyan hover:bg-line transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* History Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs leading-relaxed text-ink/90">
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === "user" ? (
                <div className="text-cyan font-semibold">{item.text}</div>
              ) : item.type === "accent" ? (
                <div className="text-amber bg-amber/10 p-2 rounded border border-amber/30">
                  {item.text}
                </div>
              ) : item.type === "cyan" ? (
                <div className="text-cyan bg-cyan/10 p-2 rounded border border-cyan/30">
                  {item.text}
                </div>
              ) : item.type === "error" ? (
                <div className="text-rose-400">{item.text}</div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-muted">{item.text}</pre>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Form */}
        <form onSubmit={handleCommand} className="p-3 bg-panel2 border-t border-line flex items-center gap-2">
          <span className="text-cyan font-semibold">swananda@cyber:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type command..."
            className="flex-1 bg-transparent text-ink font-mono text-xs focus:outline-none placeholder:text-muted/50"
          />
          <button type="submit" className="p-1.5 rounded text-cyan hover:bg-cyan/20 transition-colors">
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
