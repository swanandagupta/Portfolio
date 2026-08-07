import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

export default function JourneyProgress() {
  const { scrollProgress, activeSection } = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top glowing laser line */}
      <div className="h-[3px] w-full bg-panel/40 backdrop-blur-sm relative">
        <div
          className="h-full bg-gradient-to-r from-cyan via-violet to-amber transition-all duration-150 ease-out shadow-[0_0_12px_rgba(94,234,212,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
        {/* Leading glowing pulse dot */}
        {scrollProgress > 1 && scrollProgress < 99 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_10px_#5EEAD4] -translate-x-1/2 transition-all duration-150"
            style={{ left: `${scrollProgress}%` }}
          />
        )}
      </div>
    </div>
  );
}
