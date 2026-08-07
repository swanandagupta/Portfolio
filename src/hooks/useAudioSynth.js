import { useState, useRef, useEffect, useCallback } from "react";

export function useAudioSynth() {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);
  const ambientOscRef = useRef(null);
  const ambientGainRef = useRef(null);

  const initAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const toggleMute = useCallback(() => {
    initAudioCtx();
    setIsMuted((prev) => !prev);
  }, [initAudioCtx]);

  // Ambient sub-drone sound synthesizer
  useEffect(() => {
    if (isMuted || !audioCtxRef.current) {
      if (ambientGainRef.current && audioCtxRef.current) {
        ambientGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
      return;
    }

    try {
      const ctx = audioCtxRef.current;
      if (!ambientOscRef.current) {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(110.5, ctx.currentTime); // Slight detuned harmonic

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setTargetAtTime(0.04, ctx.currentTime, 0.5);

        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc2.start();

        ambientOscRef.current = osc;
        ambientGainRef.current = gain;
      } else {
        ambientGainRef.current.gain.setTargetAtTime(0.04, ctx.currentTime, 0.5);
      }
    } catch (e) {
      console.warn("Web Audio ambient drone initialized gracefully", e);
    }
  }, [isMuted]);

  // Microinteraction sound triggers
  const playClick = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // ignore web audio autoplay policies if uninitialized
    }
  }, [isMuted]);

  const playHover = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }, [isMuted]);

  const playUnlock = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.setValueAtTime(0.06, now + idx * 0.06 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.26);
      });
    } catch (e) {}
  }, [isMuted]);

  return {
    isMuted,
    toggleMute,
    playClick,
    playHover,
    playUnlock,
    initAudioCtx,
  };
}
