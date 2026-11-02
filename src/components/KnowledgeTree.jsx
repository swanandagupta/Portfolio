import { useEffect, useState } from "react";
import { KNOWLEDGE_TREE } from "../data/content";

// A simple cartoon tree: a forked tan trunk carrying five scalloped foliage clusters.
// Text and clusters come from KNOWLEDGE_TREE (src/data/content.js); geometry lives here.
// Wide canopy on tablet/desktop, a compact two-column canopy on phones so the type stays readable.

const TONES = [
  { fill: "#5C7F47", ring: "#8FAE6B" },
  { fill: "#6A8A3A", ring: "#A8BE63" },
  { fill: "#4F7A54", ring: "#86AD76" },
  { fill: "#66803C", ring: "#9DB45E" },
  { fill: "#547A44", ring: "#8DB07A" },
];
const LINE = "#24391f"; // foliage outline
const TAN = "#C9A074";
const TAN_LINE = "#3a2718";

const rng = (seed) => {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};

function wrapWords(words, max, sep) {
  const lines = [];
  let line = "";
  words.forEach((w) => {
    const next = line ? line + sep + w : w;
    if (next.length > max && line) {
      lines.push(line);
      line = w;
    } else line = next;
  });
  if (line) lines.push(line);
  return lines;
}

function Cluster({ data, tone, cx, cy, rx, ry, seed, titleSize, itemSize, titleMax, itemMax }) {
  const r = rng(seed);
  const n = 12;
  const bumps = Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n + (r() - 0.5) * 0.3;
    return {
      x: cx + Math.cos(a) * rx * 0.82,
      y: cy + Math.sin(a) * ry * 0.8,
      rad: ry * (0.34 + r() * 0.1),
      fill: i % 3 === 0 ? tone.ring : tone.fill,
    };
  });
  const titleLines = wrapWords(data.title.split(" "), titleMax, " ");
  const itemLines = wrapWords(data.items, itemMax, " · ");
  const tLH = titleSize * 1.12;
  const iLH = itemSize * 1.42;
  const total = titleLines.length * tLH + 8 + itemLines.length * iLH;
  const y0 = cy - total / 2 + titleSize * 0.85;
  return (
    <g>
      {/* outline pass, then fill pass on top: one scalloped silhouette with a single outer line */}
      <g stroke={LINE} strokeWidth="6" strokeLinejoin="round">
        {bumps.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.rad} fill={LINE} />
        ))}
        <ellipse cx={cx} cy={cy} rx={rx * 0.9} ry={ry * 0.86} fill={LINE} />
      </g>
      {bumps.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.rad} fill={c.fill} />
      ))}
      <ellipse cx={cx} cy={cy} rx={rx * 0.9} ry={ry * 0.86} fill={tone.fill} />
      <g aria-hidden="true" textAnchor="middle">
        {titleLines.map((l, i) => (
          <text key={l} x={cx} y={y0 + i * tLH} className="tree__title" style={{ fontSize: titleSize }}>
            {l}
          </text>
        ))}
        {itemLines.map((l, i) => (
          <text key={l} x={cx} y={y0 + titleLines.length * tLH + 8 + i * iLH} className="tree__items" style={{ fontSize: itemSize }}>
            {l}
          </text>
        ))}
      </g>
    </g>
  );
}

const WIDE = {
  box: [1024, 750],
  vbX: -12,
  vbY: -34,
  clusters: [
    [215, 190, 172, 112],
    [505, 120, 190, 112],
    [800, 215, 172, 112],
    [290, 395, 160, 98],
    [730, 405, 160, 98],
  ],
  order: [3, 4, 0, 2, 1],
  // flared trunk forking into branches (tan strokes with a dark edge)
  trunkBody: "M455 545 C470 600 458 650 412 698 L588 698 C542 650 530 600 545 545 Z",
  trunkEdges: ["M455 545 C470 600 458 650 412 698", "M545 545 C530 600 542 650 588 698"],
  bark: ["M490 590 C486 620 492 650 486 680", "M520 600 C524 630 518 655 524 684"],
  branches: [
    ["M498 575 C470 500 360 380 262 280", 24],
    ["M502 575 C500 440 502 300 505 190", 26],
    ["M506 575 C560 500 680 400 770 300", 24],
    ["M492 595 C450 560 380 520 322 480", 18],
    ["M512 595 C570 560 650 520 706 485", 18],
  ],
  fonts: [29, 18, 16, 26],
  maxW: 1400,
};
const NARROW = {
  box: [384, 628],
  vbX: -12,
  vbY: -18,
  clusters: [
    [96, 95, 94, 80],
    [264, 95, 94, 80],
    [96, 245, 94, 80],
    [264, 245, 94, 80],
    [180, 392, 94, 80],
  ],
  order: [0, 1, 2, 3, 4],
  trunkBody: "M160 462 C172 510 170 550 140 604 L220 604 C190 550 188 510 200 462 Z",
  trunkEdges: ["M160 462 C172 510 170 550 140 604", "M200 462 C188 510 190 550 220 604"],
  bark: ["M176 505 C174 530 178 556 174 586", "M190 512 C192 536 188 560 192 590"],
  branches: [
    ["M178 482 C120 430 70 330 70 200", 14],
    ["M182 482 C240 430 290 330 290 200", 14],
    ["M176 484 C140 450 110 380 100 300", 14],
    ["M184 484 C220 450 250 380 260 300", 14],
    ["M180 484 C180 460 180 440 180 420", 14],
  ],
  fonts: [17, 12.5, 13, 19],
  maxW: 430,
};

function useNarrow() {
  const [narrow, setNarrow] = useState(() => (typeof matchMedia === "function" ? matchMedia("(max-width: 699px)").matches : false));
  useEffect(() => {
    const mq = matchMedia("(max-width: 699px)");
    const on = () => setNarrow(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

export default function KnowledgeTree() {
  const narrow = useNarrow();
  const L = narrow ? NARROW : WIDE;
  const [titleSize, itemSize, titleMax, itemMax] = L.fonts;
  const label = "Knowledge tree: " + KNOWLEDGE_TREE.map((k) => `${k.title} (${k.items.join(", ")})`).join("; ");

  return (
    <figure className="tree" style={{ maxWidth: L.maxW }} data-reveal>
      <svg viewBox={`${L.vbX ?? 0} ${L.vbY ?? 0} ${L.box[0]} ${L.box[1]}`} role="img" aria-label={label} className="tree__svg">
        {L.branches.map(([d, w], i) => (
          <g key={i} fill="none" strokeLinecap="round">
            <path d={d} stroke={TAN_LINE} strokeWidth={w + 6} />
            <path d={d} stroke={TAN} strokeWidth={w} />
          </g>
        ))}
        <path d={L.trunkBody} fill={TAN} />
        {L.trunkEdges.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={TAN_LINE} strokeWidth="5" strokeLinecap="round" />
        ))}
        {L.bark.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={TAN_LINE} strokeWidth="3" strokeLinecap="round" />
        ))}
        {L.order.map((idx) => {
          const [cx, cy, rx, ry] = L.clusters[idx];
          return (
            <Cluster
              key={KNOWLEDGE_TREE[idx].id}
              data={KNOWLEDGE_TREE[idx]}
              tone={TONES[idx]}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              seed={101 + idx * 37}
              titleSize={titleSize}
              itemSize={itemSize}
              titleMax={titleMax}
              itemMax={itemMax}
            />
          );
        })}
      </svg>
    </figure>
  );
}
