import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, Check, Loader2, Mail, Copy, Sparkles, MessageSquare } from "lucide-react";
import SignalDivider from "./SignalDivider";
import SubtleWaves from "./SubtleWaves";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PROFILE } from "../data/content";

export default function Contact({ audioSynth }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [typingPulse, setTypingPulse] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTypingPulse((prev) => (prev + 1) % 100);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Valid email is required";
    if (!formData.message.trim()) errs.message = "Message cannot be empty";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (audioSynth?.playClick) audioSynth.playClick();
    setFormStatus("sending");

    setTimeout(() => {
      setFormStatus("success");
      if (audioSynth?.playUnlock) audioSynth.playUnlock();

      setTimeout(() => {
        setFormStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3500);
    }, 1500);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("swanandagupta@gmail.com");
    setCopiedEmail(true);
    if (audioSynth?.playClick) audioSynth.playClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-base py-16">
      {/* Background Lights Reacting to Typing */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at 70% 50%, rgba(94, 234, 212, ${
            0.05 + (typingPulse % 5) * 0.02
          }), rgba(167, 139, 250, 0.03) 50%, transparent 80%)`,
        }}
      />

      <SubtleWaves color="#5EEAD4" opacity={0.03} />
      <SignalDivider variant="stepped" color="#5EEAD4" className="pt-6 relative z-10" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Panel // 08 · Get In Touch</span>
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink tracking-tight">
              Let's Talk Signal.
            </h2>

            <p className="text-muted leading-relaxed text-base font-body">
              Open to high-impact engineering roles, AI & security research collaborations, and full-stack architecture projects.
            </p>

            {/* Email Quick Copy Box */}
            <div
              onClick={copyEmailToClipboard}
              onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
              className="p-4 rounded-2xl bg-panel/80 border border-line hover:border-cyan/50 backdrop-blur-md flex items-center justify-between cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan/15 text-cyan group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-muted block uppercase tracking-wider">Direct Email</span>
                  <span className="text-sm font-mono text-ink font-semibold group-hover:text-cyan transition-colors">
                    swanandagupta@gmail.com
                  </span>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-panel2 text-cyan font-mono text-xs flex items-center gap-1">
                {copiedEmail ? <Check className="h-4 w-4 text-cyan" /> : <Copy className="h-4 w-4" />}
                <span className="hidden sm:inline">{copiedEmail ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Social CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={PROFILE.links.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan text-base font-semibold text-xs font-mono uppercase tracking-wider shadow-[0_0_16px_rgba(94,234,212,0.4)] hover:brightness-110 active:scale-95 transition-all"
              >
                <LinkedinIcon size={16} />
                LinkedIn
                <ArrowUpRight size={14} />
              </a>

              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => audioSynth?.playHover && audioSynth.playHover()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line text-ink text-xs font-mono uppercase tracking-wider bg-panel2/60 hover:border-cyan/50 hover:text-cyan active:scale-95 transition-all"
              >
                <GithubIcon size={16} />
                GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-panel/80 border border-line/80 backdrop-blur-md shadow-2xl space-y-5 hover:border-cyan/40 transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-cyan uppercase tracking-wider mb-2">
                <MessageSquare className="h-4 w-4" />
                <span>Interactive Transmission Terminal</span>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className={`w-full px-4 py-3 rounded-xl bg-base border text-ink font-body text-sm focus:outline-none transition-all ${
                    errors.name ? "border-rose-500" : "border-line focus:border-cyan focus:shadow-[0_0_12px_rgba(94,234,212,0.3)]"
                  }`}
                />
                {errors.name && <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="e.g. sarah@cyber.io"
                  className={`w-full px-4 py-3 rounded-xl bg-base border text-ink font-body text-sm focus:outline-none transition-all ${
                    errors.email ? "border-rose-500" : "border-line focus:border-cyan focus:shadow-[0_0_12px_rgba(94,234,212,0.3)]"
                  }`}
                />
                {errors.email && <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.email}</span>}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">Message Signal</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Share details about your team, research project, or engineering initiative..."
                  className={`w-full px-4 py-3 rounded-xl bg-base border text-ink font-body text-sm focus:outline-none transition-all ${
                    errors.message ? "border-rose-500" : "border-line focus:border-cyan focus:shadow-[0_0_12px_rgba(94,234,212,0.3)]"
                  }`}
                />
                {errors.message && <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.message}</span>}
              </div>

              {/* Morphing Submit Button */}
              <button
                type="submit"
                disabled={formStatus !== "idle"}
                className={`w-full py-4 rounded-xl font-mono text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                  formStatus === "success"
                    ? "bg-emerald-500 text-ink shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    : formStatus === "sending"
                    ? "bg-cyan/50 text-base cursor-not-allowed"
                    : "bg-cyan text-base shadow-[0_0_20px_rgba(94,234,212,0.4)] hover:brightness-110 active:scale-[0.99]"
                }`}
              >
                {formStatus === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Encrypting & Transmitting Signal...</span>
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <Check className="h-5 w-5 text-ink" />
                    <span>Transmission Transmitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Signal Transmission</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
