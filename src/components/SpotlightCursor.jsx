import React, { useEffect, useState, useRef } from "react";
import { useMousePosition } from "../hooks/useMousePosition";

export default function SpotlightCursor() {
  const mouse = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-interactive]") ||
        target.closest(".interactive-card")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Spawn trail particles when mouse moves with high velocity
  useEffect(() => {
    if (mouse.speed > 0.8) {
      setTrails((prev) => [
        ...prev.slice(-12),
        {
          id: Math.random(),
          x: mouse.x,
          y: mouse.y,
          size: Math.max(3, Math.min(10, mouse.speed * 2)),
          opacity: 0.6,
        },
      ]);
    }
  }, [mouse.x, mouse.y, mouse.speed]);

  // Fade trails out over time
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((t) => ({ ...t, opacity: t.opacity - 0.08 }))
          .filter((t) => t.opacity > 0.05)
      );
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Hide on devices without precise pointer (touchscreens)
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Background Soft Spotlight Follower */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500"
        style={{
          background: `radial-gradient(650px circle at ${mouse.x}px ${mouse.y}px, rgba(94, 234, 212, 0.06), rgba(167, 139, 250, 0.03) 40%, transparent 80%)`,
        }}
      />

      {/* Particle Glow Trail */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="pointer-events-none fixed z-50 rounded-full bg-cyan blur-[1px]"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            width: `${t.size}px`,
            height: `${t.size}px`,
            transform: "translate(-50%, -50%)",
            opacity: t.opacity,
            transition: "opacity 0.2s linear",
          }}
        />
      ))}

      {/* Main Magnetic Cursor Ring */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-cyan/60 transition-transform duration-75 ease-out"
        style={{
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
          width: isHovered ? "48px" : isClicking ? "24px" : "32px",
          height: isHovered ? "48px" : isClicking ? "24px" : "32px",
          transform: "translate(-50%, -50%)",
          boxShadow: isHovered
            ? "0 0 20px rgba(94, 234, 212, 0.4), inset 0 0 10px rgba(167, 139, 250, 0.3)"
            : "0 0 10px rgba(94, 234, 212, 0.2)",
          borderColor: isHovered ? "#5EEAD4" : "rgba(94, 234, 212, 0.5)",
          backgroundColor: isClicking ? "rgba(94, 234, 212, 0.25)" : "transparent",
        }}
      />

      {/* Inner Precision Cursor Dot */}
      <div
        className="pointer-events-none fixed z-50 h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#5EEAD4]"
        style={{
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
