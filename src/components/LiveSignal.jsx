import { useEffect, useRef } from "react";

// The hero's signature element: a live composite waveform, standing in for
// all the signals in her work — EEG traces, network telemetry, sensor feeds.
export default function LiveSignal() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf;
    let t = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawLine = (phase, amp, freq, color, lineWidth, opacity) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = lineWidth;
      const mid = height / 2;
      const step = 4;
      for (let x = 0; x <= width; x += step) {
        const nx = x / width;
        const y =
          mid +
          Math.sin(nx * Math.PI * freq + phase) * amp * Math.sin(nx * Math.PI); // taper edges
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawLine(t * 0.6, height * 0.14, 5, "#A78BFA", 1, 0.35);
      drawLine(t * 0.9 + 1, height * 0.22, 3, "#5EEAD4", 1.5, 0.55);
      drawLine(t * 1.3 + 2, height * 0.1, 8, "#FFB454", 1, 0.25);
      drawLine(t * 0.9 + 1, height * 0.28, 1.5, "#5EEAD4", 2, 0.9);
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 0.012;
      render();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) {
      render();
    } else {
      loop();
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
