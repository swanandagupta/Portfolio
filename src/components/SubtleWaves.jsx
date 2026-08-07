import { useEffect, useRef } from "react";

export default function SubtleWaves({ color = "#5EEAD4", speed = 0.005, opacity = 0.03 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf;
    let t = Math.random() * 100; // randomize phase start
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawWave = (phase, amp, freq, colorVal, lineWidth, alpha) => {
      ctx.beginPath();
      ctx.strokeStyle = colorVal;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lineWidth;
      
      const mid = height / 2;
      const step = 8;
      
      for (let x = 0; x <= width; x += step) {
        const nx = x / width;
        // Wave equation with edge tapering
        const y = mid + Math.sin(nx * Math.PI * freq + phase) * amp * Math.sin(nx * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw 2 slow overlaying waves with slightly different frequencies and speeds
      drawWave(t, height * 0.25, 2.5, color, 1.2, opacity);
      drawWave(t * 0.7 + 10, height * 0.2, 4, color, 0.8, opacity * 0.6);
      
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += speed;
      render();
      raf = requestAnimationFrame(loop);
    };

    resize();
    render();

    if (!reduceMotion) {
      loop();
    }

    const onResize = () => {
      resize();
      render();
    };
    
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [color, speed, opacity]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
    </div>
  );
}
