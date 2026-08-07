// A static waveform trace used as a section divider. Each variant encodes a
// different "signal" — calm for narrative sections, spiky for security,
// stepped for research/quantum — so the shape isn't just decoration.
const PATHS = {
  calm: "M0,20 C60,5 120,35 180,20 C240,5 300,35 360,20 C420,5 480,35 540,20 C600,5 660,35 720,20 C780,5 840,35 900,20 C960,5 1020,35 1080,20 C1140,5 1200,35 1260,20 L1440,20",
  spiky:
    "M0,20 L60,20 L80,4 L100,36 L120,20 L200,20 L215,10 L230,30 L245,20 L340,20 L360,4 L380,36 L400,20 L520,20 L535,10 L550,30 L565,20 L680,20 L700,4 L720,36 L740,20 L860,20 L875,10 L890,30 L905,20 L1020,20 L1040,4 L1060,36 L1080,20 L1200,20 L1215,10 L1230,30 L1245,20 L1440,20",
  stepped:
    "M0,20 L100,20 L100,8 L220,8 L220,32 L340,32 L340,14 L460,14 L460,26 L580,26 L580,8 L700,8 L700,32 L820,32 L820,14 L940,14 L940,26 L1060,26 L1060,8 L1180,8 L1180,32 L1300,32 L1300,20 L1440,20",
};

export default function SignalDivider({ variant = "calm", color = "#5EEAD4", className = "" }) {
  const d = PATHS[variant] || PATHS.calm;
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10">
        <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
