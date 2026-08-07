import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Research from "./components/Research";
import SkillsConstellation from "./components/SkillsConstellation";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import SpotlightCursor from "./components/SpotlightCursor";
import JourneyProgress from "./components/JourneyProgress";
import AchievementToasts from "./components/AchievementToasts";
import TerminalDrawer from "./components/TerminalDrawer";

import { useScrollProgress } from "./hooks/useScrollProgress";
import { useAudioSynth } from "./hooks/useAudioSynth";
import { useEasterEgg } from "./hooks/useEasterEgg";

export default function App() {
  const { activeSection } = useScrollProgress();
  const audioSynth = useAudioSynth();
  const { terminalOpen, openTerminal, closeTerminal } = useEasterEgg();

  return (
    <div className="min-h-screen bg-base font-body text-ink selection:bg-cyan selection:text-[#080C16] relative overflow-x-hidden">
      {/* Precision Spotlight & Particle Glow Cursor */}
      <SpotlightCursor />

      {/* Top Journey Progress Line */}
      <JourneyProgress />

      {/* Gamified Achievement Toast Manager */}
      <AchievementToasts activeSection={activeSection} audioSynth={audioSynth} terminalOpen={terminalOpen} />

      {/* Developer Terminal CLI Drawer */}
      <TerminalDrawer isOpen={terminalOpen} onClose={closeTerminal} audioSynth={audioSynth} />

      {/* Floating Glass Navbar */}
      <Nav activeSection={activeSection} audioSynth={audioSynth} onOpenTerminal={openTerminal} />

      {/* Main Experience Stream */}
      <main>
        <Hero audioSynth={audioSynth} onOpenTerminal={openTerminal} />
        <About audioSynth={audioSynth} />
        <Experience audioSynth={audioSynth} />
        <Projects audioSynth={audioSynth} />
        <Research audioSynth={audioSynth} />
        <SkillsConstellation audioSynth={audioSynth} />
        <Achievements audioSynth={audioSynth} />
        <Contact audioSynth={audioSynth} />
      </main>

      {/* Sleek Footer */}
      <Footer onOpenTerminal={openTerminal} audioSynth={audioSynth} />
    </div>
  );
}
